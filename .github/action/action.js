!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o),
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 5));
})([
  function(e, t) {
    e.exports = require("@actions/core");
  },
  function(e, t) {
    e.exports = require("@actions/github");
  },
  function(e, t) {
    e.exports = require("bluebird");
  },
  function(e, t) {
    e.exports = require("electron-packager");
  },
  function(e, t) {
    e.exports = require("@actions/exec");
  },
  function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0),
      o = n(2),
      u = n(3),
      a = n(1),
      i = n(4);
    const c = async (e, t) => {
        (await Object(i.exec)(e, null, { ignoreReturnCode: !0 })) > 0 &&
          r.setFailed(t);
      },
      s = /^([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/,
      l = () => {
        const e = (() => {
          const e = a.context.ref;
          return e.substr("refs/tags/".length, e.length);
        })();
        return (t = e), s.test(t) ? e : a.context.sha;
        var t;
      },
      f = {
        "macos-latest": "darwin",
        "ubuntu-latest": "linux",
        "windows-latest": "win32",
      };
    o.try(async function() {
      const e = r.getInput("command");
      return e
        ? await c(e, `\`${e}\` failed!`)
        : "build-packages" === r.getInput("task")
        ? await (async function() {
            console.log("Building source code..."),
              await c("npm run build", "`npm run build` failed");
            const e = r.getInput("os", { required: !0 });
            console.log(`Creating Electron package on ${e}...`),
              await u({
                arch: "x64",
                dir: "artifacts/webpack",
                out: "artifacts/electronPackager",
                icon: "src/assets/orange",
                overwrite: !0,
                platform: f[e],
                prune: !1,
                appVersion: l(),
              });
          })()
        : void 0;
    }).catch(r.debug);
  },
]);
