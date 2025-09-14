# Color Controversy React App

This directory contains the built React app from `color-controversy/react-frontend`.

## Updating this React App

To update the React app files in this Hugo site:

```bash
cd color-controversy/react-frontend

npm run build

cp -r build/* ../the-leo-zone/static/colorcontroversy/
```

The React app will then be available at `https://theleo.zone/colorcontroversy/` when deployed.
