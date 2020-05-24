/**
 * There are a lot of constant values that need to be shared between different
 * files. Values like `src/main`, `artifacts/webpack` and such directories.
 *
 * Instead of repeating these values in the different files, it's better to use
 * these constants because that communicates to the reader the shared nature
 * of these values.
 */
class BuildConstants {
  src = "src";

  main = `${this.src}/main`;

  mainTs = `${this.main}/main.ts`;

  preloadTs = `${this.main}/preload.ts`;

  renderer = `${this.src}/renderer`;

  rendererTsx = `${this.renderer}/renderer.tsx`;

  artifacts = "artifacts";

  artifactsWebpack = `${this.artifacts}/webpack`;

  artifactsWebpackMain = `${this.artifactsWebpack}/main`;

  artifactsWebpackRenderer = `${this.artifactsWebpack}/renderer`;

  rendererIndexHtml = `${this.renderer}/index.html`;

  packageJson = "package.json";

  artifactsWebpackPackageJson = `${this.artifactsWebpack}/${this.packageJson}`;

  bin = "bin";

  srcBin = `${this.src}/bin`;

  binPlatform = (platform: string, arch: string) => `${platform}-${arch}`;

  btcd = (platform: string, arch: string) =>
    `${this.bin}/${this.binPlatform(platform, arch)}/btcd`;

  artifactsWebpackBin = `${this.artifactsWebpack}/bin`;

  artifactsWebpackBinPlatform = (platform: string, arch: string) =>
    `${this.artifactsWebpackBin}/${this.binPlatform(platform, arch)}`;

  artifactsWebpackBinPlatformBtcd = (platform: string, arch: string) =>
    `${this.artifactsWebpackBinPlatform(platform, arch)}/btcd`;

  certPem = `cert/cert.pem`;

  keyPem = `cert/key.pem`;
}

export const buildConstants = new BuildConstants();
