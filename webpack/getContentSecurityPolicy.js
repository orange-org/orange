const getIsDevelopment = require("./getIsDevelopment");

const isDevelopment = getIsDevelopment();

module.exports = () =>
  [
    // This is needed for Material UI to be able to inline itself
    // I looked into using a nonce or a hash but that didn't make sense.
    // See https://github.com/orange-org/orange/issues/1
    ["style-src-elem", "'unsafe-inline'"],
    [
      "connect-src",
      isDevelopment
        ? // These are needed for hot module replacement during development
          "http: ws: file:"
        : // For production, prohibit all outbound connections
          "'none'",
    ],
    // Allow scripts and images loaded from the same location as index.html
    ["script-src-elem", "'self'"],
    ["img-src", "'self'"],
    ["font-src", "'self'"],

    // Completely disallow the following
    ["child-src", "'none'"],
    ["frame-src", "'none'"],
    ["manifest-src", "'none'"],
    ["media-src", "'none'"],
    ["object-src", "'none'"],

    // Allow unsafe eval during development for hot module replacement
    ["script-src", isDevelopment ? "'unsafe-eval'" : "'none'"],
    ["script-src-attr", "'none'"],
    ["style-src", "'none'"],
    ["style-src-attr", isDevelopment ? "'self'" : "'none'"],
    ["worker-src", "'none'"],
    ["base-uri", "'none'"],
    ["form-action", "'none'"],
    ["navigate-to", "'none'"],
  ].reduce(
    (previousValue, [directive, source]) =>
      `${previousValue}${directive} ${source};`,
    "",
  );
