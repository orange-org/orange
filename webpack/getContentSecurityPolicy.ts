import getIsDevelopment from "./getIsDevelopment";

const isDevelopment = getIsDevelopment();

export default (nonce: string) =>
  [
    ["style-src-elem", `'self' 'nonce-${nonce}'`],
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
    ["style-src", `'self' 'nonce-${nonce}'`],
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
