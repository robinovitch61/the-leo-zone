---
title: "cron: for your health"
date: 2022-03-13
---

I have a standing desk, but rarely stand. I have probably been sitting about 7 hours a day, which is too much! In
the spirit of positive nudges for habit building and taking ownership over my notifications,
I wrote a simple [cron](https://en.wikipedia.org/wiki/Cron) job to remind me to stand up every hour.

Note that this is mac-specific, but a Linux or Windows analog should be fairly easy to implement.

`~/projects/cron/standup.sh`
```shell
#!/usr/bin/env sh

osascript -e 'display alert "Stand up and stretch!"'
```

When run, a popup will be created in the middle of my screen that looks like:
{{< fig src="standup.jpg" width=200 unit=px >}}

In order to run it periodically with cron, I ran `crontab -e`, then add this line to the file:
{{< highlight shell "linenos=false" >}}
0 8-17 * * * ~/projects/cron/standup.sh > /dev/null 2>&1
{{< / highlight >}}

Breakdown:
* `0 8-17 * * *`: Run every hour from 8am to 5pm, every day (I use https://crontab.guru/ to create or parse these schedule expressions)
* `~/projects/cron/standup.sh`: Path to my defined alert script
* `> /dev/null`: Redirect stdout to [/dev/null](https://linuxhint.com/what_is_dev_null/), i.e. discard it
* `2>&1`: Disable cron email by redirecting stderr to the same place as stdout, in this case `/dev/null`
