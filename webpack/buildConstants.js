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
const rendererTs = `${renderer}/renderer.ts`;
const artifacts = "artifacts";
const artifactsWebpack = `${artifacts}/webpack`;
const artifactsWebpackMain = `${artifactsWebpack}/main`;
const artifactsWebpackRenderer = `${artifactsWebpack}/renderer`;
const rendererIndexHtml = `${renderer}/index.html`;
const packageJson = "package.json";
const artifactsWebpackPackageJson = `${artifactsWebpack}/${packageJson}`;
const bin = `${src}/bin`;
const binPlatform = (platform, arch) => `${platform}-${arch}`;
const btcd = (platform, arch) => `${bin}/${binPlatform(platform, arch)}/btcd`;
const artifactsWebpackBin = `${artifactsWebpack}/bin`;
const artifactsWebpackBinPlatform = (platform, arch) =>
  `${artifactsWebpackBin}/${binPlatform(platform, arch)}`;
const artifactsWebpackBinPlatformBtcd = (platform, arch) =>
  `${artifactsWebpackBinPlatform(platform, arch)}/btcd`;

module.exports = {
  src,
  main,
  mainTs,
  preloadTs,
  renderer,
  rendererTs,
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
};
