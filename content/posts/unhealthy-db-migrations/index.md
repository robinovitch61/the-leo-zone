---
title: "unhealthy database migrations"
date: "2024-02-20"
description: "Running migrated database integration tests with docker compose, by Leo Robinovitch"
---

Often, integration tests follow this pattern:

1. Stand up a docker database container
2. Run migrations against this database container
3. Run the integration tests against this migrated container

This can be done with docker-compose as follows, using Postgres and [goose](https://github.com/pressly/goose) as an
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
      interval: 2s

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

If containers are instantiated with:

```sh
# --wait  Wait for services to be running|healthy. Implies detached mode.
docker compose up --wait
```

Now the `up` command blocks until all containers are running or healthy. In this scenario, that means it will wait right
until the migrations complete and the container exits -- no shorter or longer.

Without the failing healthcheck, the migrations container reports healthy before migrations complete and the `up --wait`
doesn't block long enough.

Here are the other files I made to experiment with this:

`./test.sh`

```shell
#!/usr/bin/env sh

docker-compose up --wait
echo "docker-compose up complete"

# the "integration tests"
PGPASSWORD=123 psql -h localhost -p 5432 -U leo -d db -c "SELECT * FROM movies" || echo "failed"

# clean up
docker-compose down
```

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

This is kind of neat. There are probably better ways to do this, and if you have any, please let me know by email at
{leo at theleo.zone}.
