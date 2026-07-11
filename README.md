# theleo.zone

This is a Hugo site. Run it locally with `./scripts/dev.sh`. Push to `main` to have it republish at https://theleo.zone

## Project structure

- `content/` contains pages and page bundles that Hugo renders through the site templates.
- `static/<route>/` contains self-contained, plain-HTML microsites. Keep each microsite's `index.html` and private CSS, JavaScript, fonts, and images together in the directory that matches its public route.
- `static/img/` and `static/fonts/` contain assets shared across multiple pages.
- `assets/` contains source assets that Hugo processes, such as the main Sass stylesheets.
- `layouts/` contains the Hugo templates, partials, and shortcodes.

For example, microsite ewniah (everything served below `/ewniah/`) lives in `static/ewniah/`. Prefer relative references such as `./style.css` and `./img/example.png` inside a microsite so its dependencies remain local and obvious.
