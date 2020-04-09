# Orange CI/CD using GitHub Actions

Orange's CI/CD uses GitHub Actions. The pipeline has one entry-point
`.github/action/index.ts`.

Webpack is used to create the action bundle at `.github/action/index.js`.

The command for generating the action bundle is `npm run build-action`

## Development

You can use https://github.com/nektos/act to run and develop the action locally.

You'll have to download an 18GB Docker image as described in act's
documentation.

I'm sorry about how complicated this is.
