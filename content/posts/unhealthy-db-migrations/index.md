---
title: "unhealthy database migrations"
date: "2024-02-20"
description: "Running migrated database integration tests with docker compose, by Leo Robinovitch"
---

Often, integration tests follow this pattern:

1. Stand up a docker database container
2. Run migrations against this database container
3. Run the integration tests against this migrated container

This can be done with docker compose as follows, using Postgres and [goose](https://github.com/pressly/goose) as an
example:

`./docker-compose.yaml`

```yaml
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: leo
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: db
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 1s

  postgres-migrations:
    build:
      context: .
      dockerfile: Dockerfile-goose
    volumes:
      - ./migrations:/migrations
    depends_on:
      postgres:
        condition: service_healthy
    command: >
      sh -c " goose -dir /migrations postgres 'host=postgres user=leo password=123 dbname=db' up"
    healthcheck:
      test: ["CMD-SHELL", "exit 1"]
```

A database container with a readiness healthcheck. A migrations container that waits until the database is ready, then
runs the migrations against it.

The odd thing here is the never-successful migrations container healthcheck.

Two things need to be true before you can run integration tests:

- the database container must be ready
- the database migrations must be complete

If these containers are instantiated with `docker compose up -d` and then tests immediately run, the database container
may not be healthy, and even more likely, the migrations may not have completed.

An arbitrary sleep time could be added before tests start, but that's either unreliable or overkill.

An alternative is to run `docker compose up` with the `--wait` flag:

```sh
# --wait  Wait for services to be running|healthy. Implies detached mode.
docker compose up --wait
```

This will block until all containers are running or healthy. Without the failing healthcheck, the migrations container
reports healthy before migrations complete and the `up --wait` doesn't block long enough. Because the migrations
container reports unhealthy until it exits, that means the `up` command will block right until the migrations complete
and the container exits -- no shorter or longer.

So this test file works:

`./test.sh`

```shell
#!/usr/bin/env sh

docker compose up --wait
echo "docker compose up complete"

# the "integration tests"
PGPASSWORD=123 psql -h localhost -p 5432 -U leo -d db -c "SELECT * FROM movies" || echo "failed"

# clean up
docker compose down
```

**But**, if the `set -e` option is added to the test script such that it exits on any non-zero status, this test script
will fail. The `--wait` command exits with status 1 even though `docker-postgres-migrations-1` exits with status 0.

Instead, `docker compose wait` can be used to wait for migrations to complete:

`./test.sh`

```shell
#!/usr/bin/env sh

set -e

docker compose up -d
docker compose wait postgres-migrations
echo "docker compose up complete"

# the "integration tests"
PGPASSWORD=123 psql -h localhost -p 5432 -U leo -d db -c "SELECT * FROM movies" || echo "failed"

# clean up
docker compose down
```

Unfortunately, now the script needs to know the service name `postgres-migrations`. Another option is to keep the
migrations container running just long enough after the migrations have completed that the `up --wait` exits with status
0:

`./test.sh`

```shell
#!/usr/bin/env sh

set -e

docker compose up --wait
echo "docker compose up complete"

# the "integration tests"
PGPASSWORD=123 psql -h localhost -p 5432 -U leo -d db -c "SELECT * FROM movies" || echo "failed"

# clean up
docker compose down
```

`./docker-compose.yaml`

```yaml
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: leo
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: db
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 1s

  postgres-migrations:
    build:
      context: .
      dockerfile: Dockerfile-goose
    volumes:
      - ./migrations:/migrations
    depends_on:
      postgres:
        condition: service_healthy
    command: >
      sh -c " goose -dir /migrations postgres 'host=postgres user=leo password=123 dbname=db' up && touch /tmp/done &&
      sleep 2"
    healthcheck:
      test: ["CMD", "test", "-f", "/tmp/done"]
      interval: 1s
```

A tmp file is created flagging migrations are complete, then the `sleep 2` gives just enough time for the healthcheck to
pass at `interval: 1s`.

Here are the other files I made to experiment with this:

`./Dockerfile-goose`

```docker
FROM golang:alpine as builder
RUN apk add --no-cache git
RUN go install github.com/pressly/goose/v3/cmd/goose@latest
```

`./migrations/20240221040043_run.sql`

```sql
-- +goose Up
-- +goose StatementBegin
SELECT pg_sleep(2);  -- simulate migrations taking longer than they do
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
INSERT INTO movies (title) VALUES ('Woohoo');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS movies;
-- +goose StatementEnd
```

I honestly don't love any of these solutions. There are probably better ways to do this, and if you have any, please let
me know by email at {leo at theleo.zone}.
