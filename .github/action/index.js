!(function(e) {
  var t = {};
  function i(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, i), (o.l = !0), o.exports;
  }
  (i.m = e),
    (i.c = t),
    (i.d = function(e, t, r) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (i.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (i.t = function(e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (i.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          i.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o),
          );
      return r;
    }),
    (i.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return i.d(t, "a", t), t;
    }),
    (i.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ""),
    i((i.s = 6));
})([
  function(e, t) {
    e.exports = require("path");
  },
  function(e, t) {
    e.exports = require("os");
  },
  function(e, t, i) {
    "use strict";
    var r =
      (this && this.__awaiter) ||
      function(e, t, i, r) {
        return new (i || (i = Promise))(function(o, n) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              n(e);
            }
          }
          function c(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              n(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof i
                  ? t
                  : new i(function(e) {
                      e(t);
                    })).then(s, c);
          }
          u((r = r.apply(e, t || [])).next());
        });
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = i(8);
    t.exec = function(e, t, i) {
      return r(this, void 0, void 0, function*() {
        const r = o.argStringToArray(e);
        if (0 === r.length)
          throw new Error("Parameter 'commandLine' cannot be null or empty.");
        const n = r[0];
        return (
          (t = r.slice(1).concat(t || [])), new o.ToolRunner(n, t, i).exec()
        );
      });
    };
  },
  function(e, t) {
    e.exports = require("child_process");
  },
  function(e, t, i) {
    "use strict";
    var r,
      o =
        (this && this.__awaiter) ||
        function(e, t, i, r) {
          return new (i || (i = Promise))(function(o, n) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? o(e.value)
                : ((t = e.value),
                  t instanceof i
                    ? t
                    : new i(function(e) {
                        e(t);
                      })).then(s, c);
            }
            u((r = r.apply(e, t || [])).next());
          });
        };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = i(12),
      s = i(13),
      c = i(0);
    function u(e) {
      return (
        (1 & e.mode) > 0 ||
        ((8 & e.mode) > 0 && e.gid === process.getgid()) ||
        ((64 & e.mode) > 0 && e.uid === process.getuid())
      );
    }
    (r = s.promises),
      (t.chmod = r.chmod),
      (t.copyFile = r.copyFile),
      (t.lstat = r.lstat),
      (t.mkdir = r.mkdir),
      (t.readdir = r.readdir),
      (t.readlink = r.readlink),
      (t.rename = r.rename),
      (t.rmdir = r.rmdir),
      (t.stat = r.stat),
      (t.symlink = r.symlink),
      (t.unlink = r.unlink),
      (t.IS_WINDOWS = "win32" === process.platform),
      (t.exists = function(e) {
        return o(this, void 0, void 0, function*() {
          try {
            yield t.stat(e);
          } catch (e) {
            if ("ENOENT" === e.code) return !1;
            throw e;
          }
          return !0;
        });
      }),
      (t.isDirectory = function(e, i = !1) {
        return o(this, void 0, void 0, function*() {
          return (i ? yield t.stat(e) : yield t.lstat(e)).isDirectory();
        });
      }),
      (t.isRooted = function(e) {
        if (
          !(e = (function(e) {
            if (((e = e || ""), t.IS_WINDOWS))
              return (e = e.replace(/\//g, "\\")).replace(/\\\\+/g, "\\");
            return e.replace(/\/\/+/g, "/");
          })(e))
        )
          throw new Error('isRooted() parameter "p" cannot be empty');
        return t.IS_WINDOWS
          ? e.startsWith("\\") || /^[A-Z]:/i.test(e)
          : e.startsWith("/");
      }),
      (t.mkdirP = function e(i, r = 1e3, s = 1) {
        return o(this, void 0, void 0, function*() {
          if (
            (n.ok(i, "a path argument must be provided"),
            (i = c.resolve(i)),
            s >= r)
          )
            return t.mkdir(i);
          try {
            return void (yield t.mkdir(i));
          } catch (o) {
            switch (o.code) {
              case "ENOENT":
                return yield e(c.dirname(i), r, s + 1), void (yield t.mkdir(i));
              default: {
                let e;
                try {
                  e = yield t.stat(i);
                } catch (e) {
                  throw o;
                }
                if (!e.isDirectory()) throw o;
              }
            }
          }
        });
      }),
      (t.tryGetExecutablePath = function(e, i) {
        return o(this, void 0, void 0, function*() {
          let r = void 0;
          try {
            r = yield t.stat(e);
          } catch (t) {
            "ENOENT" !== t.code &&
              console.log(
                `Unexpected error attempting to determine if executable file exists '${e}': ${t}`,
              );
          }
          if (r && r.isFile())
            if (t.IS_WINDOWS) {
              const t = c.extname(e).toUpperCase();
              if (i.some(e => e.toUpperCase() === t)) return e;
            } else if (u(r)) return e;
          const o = e;
          for (const n of i) {
            (e = o + n), (r = void 0);
            try {
              r = yield t.stat(e);
            } catch (t) {
              "ENOENT" !== t.code &&
                console.log(
                  `Unexpected error attempting to determine if executable file exists '${e}': ${t}`,
                );
            }
            if (r && r.isFile()) {
              if (t.IS_WINDOWS) {
                try {
                  const i = c.dirname(e),
                    r = c.basename(e).toUpperCase();
                  for (const o of yield t.readdir(i))
                    if (r === o.toUpperCase()) {
                      e = c.join(i, o);
                      break;
                    }
                } catch (t) {
                  console.log(
                    `Unexpected error attempting to determine the actual case of the file '${e}': ${t}`,
                  );
                }
                return e;
              }
              if (u(r)) return e;
            }
          }
          return "";
        });
      });
  },
  function(e, t, i) {
    "use strict";
    var r =
        (this && this.__awaiter) ||
        function(e, t, i, r) {
          return new (i || (i = Promise))(function(o, n) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? o(e.value)
                : ((t = e.value),
                  t instanceof i
                    ? t
                    : new i(function(e) {
                        e(t);
                      })).then(s, c);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
      o =
        (this && this.__importStar) ||
        function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var i in e) Object.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return (t.default = e), t;
        };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = i(7),
      s = o(i(1)),
      c = o(i(0));
    var u;
    function l(e) {
      n.issue("error", e);
    }
    function a(e) {
      n.issue("group", e);
    }
    function d() {
      n.issue("endgroup");
    }
    !(function(e) {
      (e[(e.Success = 0)] = "Success"), (e[(e.Failure = 1)] = "Failure");
    })((u = t.ExitCode || (t.ExitCode = {}))),
      (t.exportVariable = function(e, t) {
        (process.env[e] = t), n.issueCommand("set-env", { name: e }, t);
      }),
      (t.setSecret = function(e) {
        n.issueCommand("add-mask", {}, e);
      }),
      (t.addPath = function(e) {
        n.issueCommand("add-path", {}, e),
          (process.env.PATH = `${e}${c.delimiter}${process.env.PATH}`);
      }),
      (t.getInput = function(e, t) {
        const i =
          process.env[`INPUT_${e.replace(/ /g, "_").toUpperCase()}`] || "";
        if (t && t.required && !i)
          throw new Error(`Input required and not supplied: ${e}`);
        return i.trim();
      }),
      (t.setOutput = function(e, t) {
        n.issueCommand("set-output", { name: e }, t);
      }),
      (t.setFailed = function(e) {
        (process.exitCode = u.Failure), l(e);
      }),
      (t.isDebug = function() {
        return "1" === process.env.RUNNER_DEBUG;
      }),
      (t.debug = function(e) {
        n.issueCommand("debug", {}, e);
      }),
      (t.error = l),
      (t.warning = function(e) {
        n.issue("warning", e);
      }),
      (t.info = function(e) {
        process.stdout.write(e + s.EOL);
      }),
      (t.startGroup = a),
      (t.endGroup = d),
      (t.group = function(e, t) {
        return r(this, void 0, void 0, function*() {
          let i;
          a(e);
          try {
            i = yield t();
          } finally {
            d();
          }
          return i;
        });
      }),
      (t.saveState = function(e, t) {
        n.issueCommand("save-state", { name: e }, t);
      }),
      (t.getState = function(e) {
        return process.env[`STATE_${e}`] || "";
      });
  },
  function(e, t, i) {
    "use strict";
    i.r(t);
    var r = i(5),
      o = i(2);
    !(async function() {
      r.debug("Im here!"),
        await Object(o.exec)("npm ci", null, { failOnStdErr: !0 }),
        await Object(o.exec)("npm run check:lint", null, { failOnStdErr: !0 });
    })();
  },
  function(e, t, i) {
    "use strict";
    var r =
      (this && this.__importStar) ||
      function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var i in e) Object.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return (t.default = e), t;
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = r(i(1));
    function n(e, t, i) {
      const r = new s(e, t, i);
      process.stdout.write(r.toString() + o.EOL);
    }
    (t.issueCommand = n),
      (t.issue = function(e, t = "") {
        n(e, {}, t);
      });
    class s {
      constructor(e, t, i) {
        e || (e = "missing.command"),
          (this.command = e),
          (this.properties = t),
          (this.message = i);
      }
      toString() {
        let e = "::" + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          e += " ";
          let i = !0;
          for (const r in this.properties)
            if (this.properties.hasOwnProperty(r)) {
              const o = this.properties[r];
              o &&
                (i ? (i = !1) : (e += ","),
                (e += `${r}=${((t = o),
                (t || "")
                  .replace(/%/g, "%25")
                  .replace(/\r/g, "%0D")
                  .replace(/\n/g, "%0A")
                  .replace(/:/g, "%3A")
                  .replace(/,/g, "%2C"))}`));
            }
        }
        var t;
        return (
          (e += `::${(function(e) {
            return (e || "")
              .replace(/%/g, "%25")
              .replace(/\r/g, "%0D")
              .replace(/\n/g, "%0A");
          })(this.message)}`),
          e
        );
      }
    }
  },
  function(e, t, i) {
    "use strict";
    var r =
      (this && this.__awaiter) ||
      function(e, t, i, r) {
        return new (i || (i = Promise))(function(o, n) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              n(e);
            }
          }
          function c(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              n(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof i
                  ? t
                  : new i(function(e) {
                      e(t);
                    })).then(s, c);
          }
          u((r = r.apply(e, t || [])).next());
        });
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = i(1),
      n = i(9),
      s = i(3),
      c = i(0),
      u = i(10),
      l = i(4),
      a = "win32" === process.platform;
    class d extends n.EventEmitter {
      constructor(e, t, i) {
        if ((super(), !e))
          throw new Error("Parameter 'toolPath' cannot be null or empty.");
        (this.toolPath = e), (this.args = t || []), (this.options = i || {});
      }
      _debug(e) {
        this.options.listeners &&
          this.options.listeners.debug &&
          this.options.listeners.debug(e);
      }
      _getCommandString(e, t) {
        const i = this._getSpawnFileName(),
          r = this._getSpawnArgs(e);
        let o = t ? "" : "[command]";
        if (a)
          if (this._isCmdFile()) {
            o += i;
            for (const e of r) o += ` ${e}`;
          } else if (e.windowsVerbatimArguments) {
            o += `"${i}"`;
            for (const e of r) o += ` ${e}`;
          } else {
            o += this._windowsQuoteCmdArg(i);
            for (const e of r) o += ` ${this._windowsQuoteCmdArg(e)}`;
          }
        else {
          o += i;
          for (const e of r) o += ` ${e}`;
        }
        return o;
      }
      _processLineBuffer(e, t, i) {
        try {
          let r = t + e.toString(),
            n = r.indexOf(o.EOL);
          for (; n > -1; ) {
            i(r.substring(0, n)),
              (r = r.substring(n + o.EOL.length)),
              (n = r.indexOf(o.EOL));
          }
          t = r;
        } catch (e) {
          this._debug(`error processing line. Failed with error ${e}`);
        }
      }
      _getSpawnFileName() {
        return a && this._isCmdFile()
          ? process.env.COMSPEC || "cmd.exe"
          : this.toolPath;
      }
      _getSpawnArgs(e) {
        if (a && this._isCmdFile()) {
          let t = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
          for (const i of this.args)
            (t += " "),
              (t += e.windowsVerbatimArguments
                ? i
                : this._windowsQuoteCmdArg(i));
          return (t += '"'), [t];
        }
        return this.args;
      }
      _endsWith(e, t) {
        return e.endsWith(t);
      }
      _isCmdFile() {
        const e = this.toolPath.toUpperCase();
        return this._endsWith(e, ".CMD") || this._endsWith(e, ".BAT");
      }
      _windowsQuoteCmdArg(e) {
        if (!this._isCmdFile()) return this._uvQuoteCmdArg(e);
        if (!e) return '""';
        const t = [
          " ",
          "\t",
          "&",
          "(",
          ")",
          "[",
          "]",
          "{",
          "}",
          "^",
          "=",
          ";",
          "!",
          "'",
          "+",
          ",",
          "`",
          "~",
          "|",
          "<",
          ">",
          '"',
        ];
        let i = !1;
        for (const r of e)
          if (t.some(e => e === r)) {
            i = !0;
            break;
          }
        if (!i) return e;
        let r = '"',
          o = !0;
        for (let t = e.length; t > 0; t--)
          (r += e[t - 1]),
            o && "\\" === e[t - 1]
              ? (r += "\\")
              : '"' === e[t - 1]
              ? ((o = !0), (r += '"'))
              : (o = !1);
        return (
          (r += '"'),
          r
            .split("")
            .reverse()
            .join("")
        );
      }
      _uvQuoteCmdArg(e) {
        if (!e) return '""';
        if (!e.includes(" ") && !e.includes("\t") && !e.includes('"')) return e;
        if (!e.includes('"') && !e.includes("\\")) return `"${e}"`;
        let t = '"',
          i = !0;
        for (let r = e.length; r > 0; r--)
          (t += e[r - 1]),
            i && "\\" === e[r - 1]
              ? (t += "\\")
              : '"' === e[r - 1]
              ? ((i = !0), (t += "\\"))
              : (i = !1);
        return (
          (t += '"'),
          t
            .split("")
            .reverse()
            .join("")
        );
      }
      _cloneExecOptions(e) {
        const t = {
          cwd: (e = e || {}).cwd || process.cwd(),
          env: e.env || process.env,
          silent: e.silent || !1,
          windowsVerbatimArguments: e.windowsVerbatimArguments || !1,
          failOnStdErr: e.failOnStdErr || !1,
          ignoreReturnCode: e.ignoreReturnCode || !1,
          delay: e.delay || 1e4,
        };
        return (
          (t.outStream = e.outStream || process.stdout),
          (t.errStream = e.errStream || process.stderr),
          t
        );
      }
      _getSpawnOptions(e, t) {
        e = e || {};
        const i = {};
        return (
          (i.cwd = e.cwd),
          (i.env = e.env),
          (i.windowsVerbatimArguments =
            e.windowsVerbatimArguments || this._isCmdFile()),
          e.windowsVerbatimArguments && (i.argv0 = `"${t}"`),
          i
        );
      }
      exec() {
        return r(this, void 0, void 0, function*() {
          return (
            !l.isRooted(this.toolPath) &&
              (this.toolPath.includes("/") ||
                (a && this.toolPath.includes("\\"))) &&
              (this.toolPath = c.resolve(
                process.cwd(),
                this.options.cwd || process.cwd(),
                this.toolPath,
              )),
            (this.toolPath = yield u.which(this.toolPath, !0)),
            new Promise((e, t) => {
              this._debug(`exec tool: ${this.toolPath}`),
                this._debug("arguments:");
              for (const e of this.args) this._debug(`   ${e}`);
              const i = this._cloneExecOptions(this.options);
              !i.silent &&
                i.outStream &&
                i.outStream.write(this._getCommandString(i) + o.EOL);
              const r = new h(i, this.toolPath);
              r.on("debug", e => {
                this._debug(e);
              });
              const n = this._getSpawnFileName(),
                c = s.spawn(
                  n,
                  this._getSpawnArgs(i),
                  this._getSpawnOptions(this.options, n),
                );
              c.stdout &&
                c.stdout.on("data", e => {
                  this.options.listeners &&
                    this.options.listeners.stdout &&
                    this.options.listeners.stdout(e),
                    !i.silent && i.outStream && i.outStream.write(e),
                    this._processLineBuffer(e, "", e => {
                      this.options.listeners &&
                        this.options.listeners.stdline &&
                        this.options.listeners.stdline(e);
                    });
                });
              c.stderr &&
                c.stderr.on("data", e => {
                  if (
                    ((r.processStderr = !0),
                    this.options.listeners &&
                      this.options.listeners.stderr &&
                      this.options.listeners.stderr(e),
                    !i.silent && i.errStream && i.outStream)
                  ) {
                    (i.failOnStdErr ? i.errStream : i.outStream).write(e);
                  }
                  this._processLineBuffer(e, "", e => {
                    this.options.listeners &&
                      this.options.listeners.errline &&
                      this.options.listeners.errline(e);
                  });
                }),
                c.on("error", e => {
                  (r.processError = e.message),
                    (r.processExited = !0),
                    (r.processClosed = !0),
                    r.CheckComplete();
                }),
                c.on("exit", e => {
                  (r.processExitCode = e),
                    (r.processExited = !0),
                    this._debug(
                      `Exit code ${e} received from tool '${this.toolPath}'`,
                    ),
                    r.CheckComplete();
                }),
                c.on("close", e => {
                  (r.processExitCode = e),
                    (r.processExited = !0),
                    (r.processClosed = !0),
                    this._debug(
                      `STDIO streams have closed for tool '${this.toolPath}'`,
                    ),
                    r.CheckComplete();
                }),
                r.on("done", (i, r) => {
                  "".length > 0 && this.emit("stdline", ""),
                    "".length > 0 && this.emit("errline", ""),
                    c.removeAllListeners(),
                    i ? t(i) : e(r);
                });
            })
          );
        });
      }
    }
    (t.ToolRunner = d),
      (t.argStringToArray = function(e) {
        const t = [];
        let i = !1,
          r = !1,
          o = "";
        function n(e) {
          r && '"' !== e && (o += "\\"), (o += e), (r = !1);
        }
        for (let s = 0; s < e.length; s++) {
          const c = e.charAt(s);
          '"' !== c
            ? "\\" === c && r
              ? n(c)
              : "\\" === c && i
              ? (r = !0)
              : " " !== c || i
              ? n(c)
              : o.length > 0 && (t.push(o), (o = ""))
            : r
            ? n(c)
            : (i = !i);
        }
        return o.length > 0 && t.push(o.trim()), t;
      });
    class h extends n.EventEmitter {
      constructor(e, t) {
        if (
          (super(),
          (this.processClosed = !1),
          (this.processError = ""),
          (this.processExitCode = 0),
          (this.processExited = !1),
          (this.processStderr = !1),
          (this.delay = 1e4),
          (this.done = !1),
          (this.timeout = null),
          !t)
        )
          throw new Error("toolPath must not be empty");
        (this.options = e),
          (this.toolPath = t),
          e.delay && (this.delay = e.delay);
      }
      CheckComplete() {
        this.done ||
          (this.processClosed
            ? this._setResult()
            : this.processExited &&
              (this.timeout = setTimeout(h.HandleTimeout, this.delay, this)));
      }
      _debug(e) {
        this.emit("debug", e);
      }
      _setResult() {
        let e;
        this.processExited &&
          (this.processError
            ? (e = new Error(
                `There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`,
              ))
            : 0 === this.processExitCode || this.options.ignoreReturnCode
            ? this.processStderr &&
              this.options.failOnStdErr &&
              (e = new Error(
                `The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`,
              ))
            : (e = new Error(
                `The process '${this.toolPath}' failed with exit code ${this.processExitCode}`,
              ))),
          this.timeout && (clearTimeout(this.timeout), (this.timeout = null)),
          (this.done = !0),
          this.emit("done", e, this.processExitCode);
      }
      static HandleTimeout(e) {
        if (!e.done) {
          if (!e.processClosed && e.processExited) {
            const t = `The STDIO streams did not close within ${e.delay /
              1e3} seconds of the exit event from process '${
              e.toolPath
            }'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            e._debug(t);
          }
          e._setResult();
        }
      }
    }
  },
  function(e, t) {
    e.exports = require("events");
  },
  function(e, t, i) {
    "use strict";
    var r =
      (this && this.__awaiter) ||
      function(e, t, i, r) {
        return new (i || (i = Promise))(function(o, n) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              n(e);
            }
          }
          function c(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              n(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof i
                  ? t
                  : new i(function(e) {
                      e(t);
                    })).then(s, c);
          }
          u((r = r.apply(e, t || [])).next());
        });
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = i(3),
      n = i(0),
      s = i(11),
      c = i(4),
      u = s.promisify(o.exec);
    function l(e) {
      return r(this, void 0, void 0, function*() {
        if (c.IS_WINDOWS) {
          try {
            (yield c.isDirectory(e, !0))
              ? yield u(`rd /s /q "${e}"`)
              : yield u(`del /f /a "${e}"`);
          } catch (e) {
            if ("ENOENT" !== e.code) throw e;
          }
          try {
            yield c.unlink(e);
          } catch (e) {
            if ("ENOENT" !== e.code) throw e;
          }
        } else {
          let t = !1;
          try {
            t = yield c.isDirectory(e);
          } catch (e) {
            if ("ENOENT" !== e.code) throw e;
            return;
          }
          t ? yield u(`rm -rf "${e}"`) : yield c.unlink(e);
        }
      });
    }
    function a(e) {
      return r(this, void 0, void 0, function*() {
        yield c.mkdirP(e);
      });
    }
    function d(e, t, i) {
      return r(this, void 0, void 0, function*() {
        if ((yield c.lstat(e)).isSymbolicLink()) {
          try {
            yield c.lstat(t), yield c.unlink(t);
          } catch (e) {
            "EPERM" === e.code && (yield c.chmod(t, "0666"), yield c.unlink(t));
          }
          const i = yield c.readlink(e);
          yield c.symlink(i, t, c.IS_WINDOWS ? "junction" : null);
        } else ((yield c.exists(t)) && !i) || (yield c.copyFile(e, t));
      });
    }
    (t.cp = function(e, t, i = {}) {
      return r(this, void 0, void 0, function*() {
        const { force: o, recursive: s } = (function(e) {
            const t = null == e.force || e.force,
              i = Boolean(e.recursive);
            return { force: t, recursive: i };
          })(i),
          u = (yield c.exists(t)) ? yield c.stat(t) : null;
        if (u && u.isFile() && !o) return;
        const l = u && u.isDirectory() ? n.join(t, n.basename(e)) : t;
        if (!(yield c.exists(e)))
          throw new Error(`no such file or directory: ${e}`);
        if ((yield c.stat(e)).isDirectory()) {
          if (!s)
            throw new Error(
              `Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`,
            );
          yield (function e(t, i, o, n) {
            return r(this, void 0, void 0, function*() {
              if (o >= 255) return;
              o++, yield a(i);
              const r = yield c.readdir(t);
              for (const s of r) {
                const r = `${t}/${s}`,
                  u = `${i}/${s}`;
                (yield c.lstat(r)).isDirectory()
                  ? yield e(r, u, o, n)
                  : yield d(r, u, n);
              }
              yield c.chmod(i, (yield c.stat(t)).mode);
            });
          })(e, l, 0, o);
        } else {
          if ("" === n.relative(e, l))
            throw new Error(`'${l}' and '${e}' are the same file`);
          yield d(e, l, o);
        }
      });
    }),
      (t.mv = function(e, t, i = {}) {
        return r(this, void 0, void 0, function*() {
          if (yield c.exists(t)) {
            let r = !0;
            if (
              ((yield c.isDirectory(t)) &&
                ((t = n.join(t, n.basename(e))), (r = yield c.exists(t))),
              r)
            ) {
              if (null != i.force && !i.force)
                throw new Error("Destination already exists");
              yield l(t);
            }
          }
          yield a(n.dirname(t)), yield c.rename(e, t);
        });
      }),
      (t.rmRF = l),
      (t.mkdirP = a),
      (t.which = function e(t, i) {
        return r(this, void 0, void 0, function*() {
          if (!t) throw new Error("parameter 'tool' is required");
          if (i) {
            if (!(yield e(t, !1)))
              throw c.IS_WINDOWS
                ? new Error(
                    `Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`,
                  )
                : new Error(
                    `Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`,
                  );
          }
          try {
            const e = [];
            if (c.IS_WINDOWS && process.env.PATHEXT)
              for (const t of process.env.PATHEXT.split(n.delimiter))
                t && e.push(t);
            if (c.isRooted(t)) {
              const i = yield c.tryGetExecutablePath(t, e);
              return i || "";
            }
            if (t.includes("/") || (c.IS_WINDOWS && t.includes("\\")))
              return "";
            const i = [];
            if (process.env.PATH)
              for (const e of process.env.PATH.split(n.delimiter))
                e && i.push(e);
            for (const r of i) {
              const i = yield c.tryGetExecutablePath(r + n.sep + t, e);
              if (i) return i;
            }
            return "";
          } catch (e) {
            throw new Error(`which failed with message ${e.message}`);
          }
        });
      });
  },
  function(e, t) {
    e.exports = require("util");
  },
  function(e, t) {
    e.exports = require("assert");
  },
  function(e, t) {
    e.exports = require("fs");
  },
]);
