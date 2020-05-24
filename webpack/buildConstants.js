/**
 * There are a lot of constant values that need to be shared between different
 * files. Values like `src/main`, `artifacts/webpack` and such directories.
 *
 * Instead of repeating these values in the different files, it's better to use
 * these constants because that communicates to the reader the shared nature
 * of these values.
 */
const src = "src";
const main = `${src}/main`;
const mainTs = `${main}/main.ts`;
const preloadTs = `${main}/preload.ts`;
const renderer = `${src}/renderer`;
const rendererTsx = `${renderer}/renderer.tsx`;
const artifacts = "artifacts";
const artifactsWebpack = `${artifacts}/webpack`;
const artifactsWebpackMain = `${artifactsWebpack}/main`;
const artifactsWebpackRenderer = `${artifactsWebpack}/renderer`;
const rendererIndexHtml = `${renderer}/index.html`;
const packageJson = "package.json";
const artifactsWebpackPackageJson = `${artifactsWebpack}/${packageJson}`;
const bin = "bin";
const srcBin = `${src}/bin`;
const binPlatform = (platform, arch) => `${platform}-${arch}`;
const btcd = (platform, arch) => `${bin}/${binPlatform(platform, arch)}/btcd`;
const artifactsWebpackBin = `${artifactsWebpack}/bin`;
const artifactsWebpackBinPlatform = (platform, arch) =>
  `${artifactsWebpackBin}/${binPlatform(platform, arch)}`;

/**
 * @param string platform
 */
const artifactsWebpackBinPlatformBtcd = (platform, arch) =>
  `${artifactsWebpackBinPlatform(platform, arch)}/btcd`;
const certPem = `cert/cert.pem`;
const keyPem = `cert/key.pem`;

module.exports = {
  src,
  srcBin,
  main,
  mainTs,
  preloadTs,
  renderer,
  rendererTsx,
  artifacts,
  artifactsWebpack,
  artifactsWebpackMain,
  artifactsWebpackRenderer,
  rendererIndexHtml,
  packageJson,
  artifactsWebpackPackageJson,
  bin,
  binPlatform,
  btcd,
  artifactsWebpackBinPlatform,
  artifactsWebpackBinPlatformBtcd,
  certPem,
  keyPem,
};
