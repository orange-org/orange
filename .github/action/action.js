!(function(e) {
  var t = {};
  function r(i) {
    if (t[i]) return t[i].exports;
    var n = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function(e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (r.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (r.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var n in e)
          r.d(
            i,
            n,
            function(t) {
              return e[t];
            }.bind(null, n),
          );
      return i;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 115));
})([
  function(e, t, r) {
    "use strict";
    var i = r(6),
      n = "undefined" == typeof navigator,
      o = { e: {} },
      s,
      a =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : void 0 !== this
          ? this
          : null;
    function p() {
      try {
        var e = s;
        return (s = null), e.apply(this, arguments);
      } catch (e) {
        return (o.e = e), o;
      }
    }
    function u(e) {
      return (s = e), p;
    }
    var c = function(e, t) {
      var r = {}.hasOwnProperty;
      function i() {
        for (var i in ((this.constructor = e),
        (this.constructor$ = t),
        t.prototype))
          r.call(t.prototype, i) &&
            "$" !== i.charAt(i.length - 1) &&
            (this[i + "$"] = t.prototype[i]);
      }
      return (i.prototype = t.prototype), (e.prototype = new i()), e.prototype;
    };
    function d(e) {
      return (
        null == e ||
        !0 === e ||
        !1 === e ||
        "string" == typeof e ||
        "number" == typeof e
      );
    }
    function l(e) {
      return "function" == typeof e || ("object" == typeof e && null !== e);
    }
    function g(e) {
      return d(e) ? new Error(k(e)) : e;
    }
    function m(e, t) {
      var r,
        i = e.length,
        n = new Array(i + 1);
      for (r = 0; r < i; ++r) n[r] = e[r];
      return (n[r] = t), n;
    }
    function h(e, t, r) {
      if (!i.isES5) return {}.hasOwnProperty.call(e, t) ? e[t] : void 0;
      var n = Object.getOwnPropertyDescriptor(e, t);
      return null != n
        ? null == n.get && null == n.set
          ? n.value
          : r
        : void 0;
    }
    function y(e, t, r) {
      if (d(e)) return e;
      var n = { value: r, configurable: !0, enumerable: !1, writable: !0 };
      return i.defineProperty(e, t, n), e;
    }
    function f(e) {
      throw e;
    }
    var _ = (function() {
        var e = [Array.prototype, Object.prototype, Function.prototype],
          t = function(t) {
            for (var r = 0; r < e.length; ++r) if (e[r] === t) return !0;
            return !1;
          };
        if (i.isES5) {
          var r = Object.getOwnPropertyNames;
          return function(e) {
            for (var n = [], o = Object.create(null); null != e && !t(e); ) {
              var s;
              try {
                s = r(e);
              } catch (e) {
                return n;
              }
              for (var a = 0; a < s.length; ++a) {
                var p = s[a];
                if (!o[p]) {
                  o[p] = !0;
                  var u = Object.getOwnPropertyDescriptor(e, p);
                  null != u && null == u.get && null == u.set && n.push(p);
                }
              }
              e = i.getPrototypeOf(e);
            }
            return n;
          };
        }
        var n = {}.hasOwnProperty;
        return function(r) {
          if (t(r)) return [];
          var i = [];
          e: for (var o in r)
            if (n.call(r, o)) i.push(o);
            else {
              for (var s = 0; s < e.length; ++s)
                if (n.call(e[s], o)) continue e;
              i.push(o);
            }
          return i;
        };
      })(),
      b = /this\s*\.\s*\S+\s*=/;
    function v(e) {
      try {
        if ("function" == typeof e) {
          var t = i.names(e.prototype),
            r = i.isES5 && t.length > 1,
            n = t.length > 0 && !(1 === t.length && "constructor" === t[0]),
            o = b.test(e + "") && i.names(e).length > 0;
          if (r || n || o) return !0;
        }
        return !1;
      } catch (e) {
        return !1;
      }
    }
    function w(e) {
      function t() {}
      t.prototype = e;
      var r = new t();
      function i() {
        return typeof r.foo;
      }
      return i(), i(), e;
    }
    var q = /^[a-z$_][a-z$_0-9]*$/i;
    function E(e) {
      return q.test(e);
    }
    function T(e, t, r) {
      for (var i = new Array(e), n = 0; n < e; ++n) i[n] = t + n + r;
      return i;
    }
    function k(e) {
      try {
        return e + "";
      } catch (e) {
        return "[no string representation]";
      }
    }
    function j(e) {
      return (
        e instanceof Error ||
        (null !== e &&
          "object" == typeof e &&
          "string" == typeof e.message &&
          "string" == typeof e.name)
      );
    }
    function P(e) {
      try {
        y(e, "isOperational", !0);
      } catch (e) {}
    }
    function C(e) {
      return (
        null != e &&
        (e instanceof Error.__BluebirdErrorTypes__.OperationalError ||
          !0 === e.isOperational)
      );
    }
    function O(e) {
      return j(e) && i.propertyIsWritable(e, "stack");
    }
    var S =
      "stack" in new Error()
        ? function(e) {
            return O(e) ? e : new Error(k(e));
          }
        : function(e) {
            if (O(e)) return e;
            try {
              throw new Error(k(e));
            } catch (e) {
              return e;
            }
          };
    function A(e) {
      return {}.toString.call(e);
    }
    function x(e, t, r) {
      for (var n = i.names(e), o = 0; o < n.length; ++o) {
        var s = n[o];
        if (r(s))
          try {
            i.defineProperty(t, s, i.getDescriptor(e, s));
          } catch (e) {}
      }
    }
    var R = function(e) {
      return i.isArray(e) ? e : null;
    };
    if ("undefined" != typeof Symbol && Symbol.iterator) {
      var F =
        "function" == typeof Array.from
          ? function(e) {
              return Array.from(e);
            }
          : function(e) {
              for (
                var t, r = [], i = e[Symbol.iterator]();
                !(t = i.next()).done;

              )
                r.push(t.value);
              return r;
            };
      R = function(e) {
        return i.isArray(e)
          ? e
          : null != e && "function" == typeof e[Symbol.iterator]
          ? F(e)
          : null;
      };
    }
    var G =
        "undefined" != typeof process &&
        "[object process]" === A(process).toLowerCase(),
      D = "undefined" != typeof process && void 0 !== process.env,
      L;
    function U(e) {
      return D ? process.env[e] : void 0;
    }
    function I() {
      if ("function" == typeof Promise)
        try {
          if ("[object Promise]" === A(new Promise(function() {})))
            return Promise;
        } catch (e) {}
    }
    function $(e, t) {
      if (null === e || "function" != typeof t || t === L) return t;
      null !== e.domain && (t = e.domain.bind(t));
      var r = e.async;
      if (null !== r) {
        var i = t;
        t = function() {
          for (
            var e = arguments.length + 2, t = new Array(e), n = 2;
            n < e;
            ++n
          )
            t[n] = arguments[n - 2];
          return (t[0] = i), (t[1] = this), r.runInAsyncScope.apply(r, t);
        };
      }
      return t;
    }
    var B = {
        setReflectHandler: function(e) {
          L = e;
        },
        isClass: v,
        isIdentifier: E,
        inheritedDataKeys: _,
        getDataPropertyOrDefault: h,
        thrower: f,
        isArray: i.isArray,
        asArray: R,
        notEnumerableProp: y,
        isPrimitive: d,
        isObject: l,
        isError: j,
        canEvaluate: n,
        errorObj: o,
        tryCatch: u,
        inherits: c,
        withAppended: m,
        maybeWrapAsError: g,
        toFastProperties: w,
        filledRange: T,
        toString: k,
        canAttachTrace: O,
        ensureErrorObject: S,
        originatesFromRejection: C,
        markAsOriginatingFromRejection: P,
        classString: A,
        copyDescriptors: x,
        isNode: G,
        hasEnvVariables: D,
        env: U,
        global: a,
        getNativePromise: I,
        contextBind: $,
      },
      H;
    (B.isRecentNode =
      B.isNode &&
      (process.versions && process.versions.node
        ? (H = process.versions.node.split(".").map(Number))
        : process.version && (H = process.version.split(".").map(Number)),
      (0 === H[0] && H[1] > 10) || H[0] > 0)),
      (B.nodeSupportsAsyncResource =
        B.isNode &&
        (function() {
          var e = !1;
          try {
            e =
              "function" ==
              typeof r(17).AsyncResource.prototype.runInAsyncScope;
          } catch (t) {
            e = !1;
          }
          return e;
        })()),
      B.isNode && B.toFastProperties(process);
    try {
      throw new Error();
    } catch (e) {
      B.lastLineError = e;
    }
    e.exports = B;
  },
  function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "Deprecation", function() {
        return i;
      });
    class i extends Error {
      constructor(e) {
        super(e),
          Error.captureStackTrace &&
            Error.captureStackTrace(this, this.constructor),
          (this.name = "Deprecation");
      }
    }
  },
  function(e, t) {
    e.exports = require("stream");
  },
  function(e, t, r) {
    "use strict";
    var i,
      n,
      o = r(6),
      s = o.freeze,
      a = r(0),
      p = a.inherits,
      u = a.notEnumerableProp;
    function c(e, t) {
      function r(i) {
        if (!(this instanceof r)) return new r(i);
        u(this, "message", "string" == typeof i ? i : t),
          u(this, "name", e),
          Error.captureStackTrace
            ? Error.captureStackTrace(this, this.constructor)
            : Error.call(this);
      }
      return p(r, Error), r;
    }
    var d = c("Warning", "warning"),
      l = c("CancellationError", "cancellation error"),
      g = c("TimeoutError", "timeout error"),
      m = c("AggregateError", "aggregate error");
    try {
      (i = TypeError), (n = RangeError);
    } catch (e) {
      (i = c("TypeError", "type error")), (n = c("RangeError", "range error"));
    }
    for (
      var h = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(
          " ",
        ),
        y = 0;
      y < h.length;
      ++y
    )
      "function" == typeof Array.prototype[h[y]] &&
        (m.prototype[h[y]] = Array.prototype[h[y]]);
    o.defineProperty(m.prototype, "length", {
      value: 0,
      configurable: !1,
      writable: !0,
      enumerable: !0,
    }),
      (m.prototype.isOperational = !0);
    var f = 0;
    function _(e) {
      if (!(this instanceof _)) return new _(e);
      u(this, "name", "OperationalError"),
        u(this, "message", e),
        (this.cause = e),
        (this.isOperational = !0),
        e instanceof Error
          ? (u(this, "message", e.message), u(this, "stack", e.stack))
          : Error.captureStackTrace &&
            Error.captureStackTrace(this, this.constructor);
    }
    (m.prototype.toString = function() {
      var e = Array(4 * f + 1).join(" "),
        t = "\n" + e + "AggregateError of:\n";
      f++, (e = Array(4 * f + 1).join(" "));
      for (var r = 0; r < this.length; ++r) {
        for (
          var i = this[r] === this ? "[Circular AggregateError]" : this[r] + "",
            n = i.split("\n"),
            o = 0;
          o < n.length;
          ++o
        )
          n[o] = e + n[o];
        t += (i = n.join("\n")) + "\n";
      }
      return f--, t;
    }),
      p(_, Error);
    var b = Error.__BluebirdErrorTypes__;
    b ||
      ((b = s({
        CancellationError: l,
        TimeoutError: g,
        OperationalError: _,
        RejectionError: _,
        AggregateError: m,
      })),
      o.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: b,
        writable: !1,
        enumerable: !1,
        configurable: !1,
      })),
      (e.exports = {
        Error: Error,
        TypeError: i,
        RangeError: n,
        CancellationError: b.CancellationError,
        OperationalError: b.OperationalError,
        TimeoutError: b.TimeoutError,
        AggregateError: b.AggregateError,
        Warning: d,
      });
  },
  function(e, t, r) {
    var i = r(66);
    function n(e) {
      var t = function() {
        return t.called
          ? t.value
          : ((t.called = !0), (t.value = e.apply(this, arguments)));
      };
      return (t.called = !1), t;
    }
    function o(e) {
      var t = function() {
          if (t.called) throw new Error(t.onceError);
          return (t.called = !0), (t.value = e.apply(this, arguments));
        },
        r = e.name || "Function wrapped with `once`";
      return (
        (t.onceError = r + " shouldn't be called more than once"),
        (t.called = !1),
        t
      );
    }
    (e.exports = i(n)),
      (e.exports.strict = i(o)),
      (n.proto = n(function() {
        Object.defineProperty(Function.prototype, "once", {
          value: function() {
            return n(this);
          },
          configurable: !0,
        }),
          Object.defineProperty(Function.prototype, "onceStrict", {
            value: function() {
              return o(this);
            },
            configurable: !0,
          });
      }));
  },
  function(e, t) {
    e.exports = require("zlib");
  },
  function(e, t) {
    var r = (function() {
      "use strict";
      return void 0 === this;
    })();
    if (r)
      e.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: r,
        propertyIsWritable: function(e, t) {
          var r = Object.getOwnPropertyDescriptor(e, t);
          return !(r && !r.writable && !r.set);
        },
      };
    else {
      var i = {}.hasOwnProperty,
        n = {}.toString,
        o = {}.constructor.prototype,
        s = function(e) {
          var t = [];
          for (var r in e) i.call(e, r) && t.push(r);
          return t;
        };
      e.exports = {
        isArray: function(e) {
          try {
            return "[object Array]" === n.call(e);
          } catch (e) {
            return !1;
          }
        },
        keys: s,
        names: s,
        defineProperty: function(e, t, r) {
          return (e[t] = r.value), e;
        },
        getDescriptor: function(e, t) {
          return { value: e[t] };
        },
        freeze: function(e) {
          return e;
        },
        getPrototypeOf: function(e) {
          try {
            return Object(e).constructor.prototype;
          } catch (e) {
            return o;
          }
        },
        isES5: r,
        propertyIsWritable: function() {
          return !0;
        },
      };
    }
  },
  function(e, t) {
    e.exports = require("url");
  },
  function(e, t, r) {
    "use strict";
    var i =
        (this && this.__awaiter) ||
        function(e, t, r, i) {
          return new (r || (r = Promise))(function(n, o) {
            function s(e) {
              try {
                p(i.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                p(i.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function p(e) {
              var t;
              e.done
                ? n(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function(e) {
                        e(t);
                      })).then(s, a);
            }
            p((i = i.apply(e, t || [])).next());
          });
        },
      n =
        (this && this.__importStar) ||
        function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return (t.default = e), t;
        };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = r(34),
      s = n(r(12)),
      a = n(r(13));
    var p;
    function u(e) {
      o.issue("error", e);
    }
    function c(e) {
      o.issue("group", e);
    }
    function d() {
      o.issue("endgroup");
    }
    !(function(e) {
      (e[(e.Success = 0)] = "Success"), (e[(e.Failure = 1)] = "Failure");
    })((p = t.ExitCode || (t.ExitCode = {}))),
      (t.exportVariable = function(e, t) {
        (process.env[e] = t), o.issueCommand("set-env", { name: e }, t);
      }),
      (t.setSecret = function(e) {
        o.issueCommand("add-mask", {}, e);
      }),
      (t.addPath = function(e) {
        o.issueCommand("add-path", {}, e),
          (process.env.PATH = `${e}${a.delimiter}${process.env.PATH}`);
      }),
      (t.getInput = function(e, t) {
        const r =
          process.env[`INPUT_${e.replace(/ /g, "_").toUpperCase()}`] || "";
        if (t && t.required && !r)
          throw new Error(`Input required and not supplied: ${e}`);
        return r.trim();
      }),
      (t.setOutput = function(e, t) {
        o.issueCommand("set-output", { name: e }, t);
      }),
      (t.setFailed = function(e) {
        (process.exitCode = p.Failure), u(e);
      }),
      (t.isDebug = function() {
        return "1" === process.env.RUNNER_DEBUG;
      }),
      (t.debug = function(e) {
        o.issueCommand("debug", {}, e);
      }),
      (t.error = u),
      (t.warning = function(e) {
        o.issue("warning", e);
      }),
      (t.info = function(e) {
        process.stdout.write(e + s.EOL);
      }),
      (t.startGroup = c),
      (t.endGroup = d),
      (t.group = function(e, t) {
        return i(this, void 0, void 0, function*() {
          let r;
          c(e);
          try {
            r = yield t();
          } finally {
            d();
          }
          return r;
        });
      }),
      (t.saveState = function(e, t) {
        o.issueCommand("save-state", { name: e }, t);
      }),
      (t.getState = function(e) {
        return process.env[`STATE_${e}`] || "";
      });
  },
  function(e, t) {
    e.exports = function(e) {
      if (r[e]) return;
      console.warn(`DEPRECATED (@octokit/rest): ${e}`), (r[e] = 1);
    };
    const r = {};
  },
  function(e, t) {
    e.exports = function(e) {
      e = e.link || e.headers.link || "";
      const t = {};
      return (
        e.replace(/<([^>]*)>;\s*rel="([\w]*)"/g, (e, r, i) => {
          t[i] = r;
        }),
        t
      );
    };
  },
  function(e, t) {
    e.exports = require("http");
  },
  function(e, t) {
    e.exports = require("os");
  },
  function(e, t) {
    e.exports = require("path");
  },
  function(e, t, r) {
    e.exports = function(e, t, r, a) {
      i(
        `octokit.get${r.charAt(0).toUpperCase() +
          r.slice(
            1,
          )}Page() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`,
      );
      const p = n(t)[r];
      if (!p) {
        const e = new o(`No ${r} page found`, 404);
        return Promise.reject(e);
      }
      const u = { url: p, headers: s(t, a) };
      return e.request(u);
    };
    const i = r(9),
      n = r(10),
      o = r(98);
    function s(e, t) {
      const r = e.headers && e.headers["x-github-media-type"];
      return (
        !r ||
          (t && t.accept) ||
          ((t = t || {}).accept =
            "application/vnd." +
            r.replace("; param=", ".").replace("; format=", "+")),
        t
      );
    }
  },
  function(e, t) {
    e.exports = require("https");
  },
  function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "RequestError", function() {
        return s;
      });
    var i = r(1),
      n = r(4);
    const o = r.n(n)()(e => console.warn(e));
    class s extends Error {
      constructor(e, t, r) {
        super(e),
          Error.captureStackTrace &&
            Error.captureStackTrace(this, this.constructor),
          (this.name = "HttpError"),
          (this.status = t),
          Object.defineProperty(this, "code", {
            get: () => (
              o(
                new i.Deprecation(
                  "[@octokit/request-error] `error.code` is deprecated, use `error.status`.",
                ),
              ),
              t
            ),
          }),
          (this.headers = r.headers || {});
        const n = Object.assign({}, r.request);
        r.request.headers.authorization &&
          (n.headers = Object.assign({}, r.request.headers, {
            authorization: r.request.headers.authorization.replace(
              / .*$/,
              " [REDACTED]",
            ),
          })),
          (n.url = n.url
            .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]")
            .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]")),
          (this.request = n);
      }
    }
  },
  function(e, t) {
    e.exports = require("async_hooks");
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e) {
      var t = r(0),
        i = r(6).keys,
        n = t.tryCatch,
        o = t.errorObj;
      return function(r, s, a) {
        return function(p) {
          var u = a._boundValue();
          e: for (var c = 0; c < r.length; ++c) {
            var d = r[c];
            if (d === Error || (null != d && d.prototype instanceof Error)) {
              if (p instanceof d) return n(s).call(u, p);
            } else if ("function" == typeof d) {
              var l = n(d).call(u, p);
              if (l === o) return l;
              if (l) return n(s).call(u, p);
            } else if (t.isObject(p)) {
              for (var g = i(d), m = 0; m < g.length; ++m) {
                var h = g[m];
                if (d[h] != p[h]) continue e;
              }
              return n(s).call(u, p);
            }
          }
          return e;
        };
      };
    };
  },
  function(e, t, r) {
    "use strict";
    var i = r(0),
      n = i.maybeWrapAsError,
      o = r(3).OperationalError,
      s = r(6);
    var a = /^(?:name|message|stack|cause)$/;
    function p(e) {
      var t;
      if (
        (function(e) {
          return e instanceof Error && s.getPrototypeOf(e) === Error.prototype;
        })(e)
      ) {
        ((t = new o(e)).name = e.name),
          (t.message = e.message),
          (t.stack = e.stack);
        for (var r = s.keys(e), n = 0; n < r.length; ++n) {
          var p = r[n];
          a.test(p) || (t[p] = e[p]);
        }
        return t;
      }
      return i.markAsOriginatingFromRejection(e), e;
    }
    e.exports = function(e, t) {
      return function(r, i) {
        if (null !== e) {
          if (r) {
            var o = p(n(r));
            e._attachExtraTrace(o), e._reject(o);
          } else if (t) {
            for (
              var s = arguments.length,
                a = new Array(Math.max(s - 1, 0)),
                u = 1;
              u < s;
              ++u
            )
              a[u - 1] = arguments[u];
            e._fulfill(a);
          } else e._fulfill(i);
          e = null;
        }
      };
    };
  },
  function(e, t, r) {
    "use strict";
    function i() {
      try {
        return navigator.userAgent;
      } catch (e) {
        return "<environment unknown>";
      }
    }
    r.r(t),
      r.d(t, "getUserAgent", function() {
        return i;
      });
  },
  function(e, t, r) {
    e.exports = function(e) {
      const t = i.bind(null, e || []);
      return (t.plugin = n.bind(null, e || [])), t;
    };
    const i = r(71),
      n = r(78);
  },
  function(e, t) {
    e.exports = function(e) {
      return new Buffer(e).toString("base64");
    };
  },
  function(e, t, r) {
    e.exports = function(e) {
      if (/^(basic|bearer|token) /i.test(e)) return e;
      try {
        if (n.test(i(e))) return `basic ${e}`;
      } catch (e) {}
      if (3 === e.split(/\./).length) return `bearer ${e}`;
      return `token ${e}`;
    };
    const i = r(82),
      n = /^[\w-]+:/;
  },
  function(e, t) {
    e.exports = require("fs");
  },
  function(e, t) {
    e.exports = require("events");
  },
  function(e, t) {
    e.exports = require("assert");
  },
  function(e, t) {
    e.exports = require("util");
  },
  function(e, t) {
    e.exports = require("child_process");
  },
  function(e, t, r) {
    "use strict";
    var i,
      n =
        (this && this.__awaiter) ||
        function(e, t, r, i) {
          return new (r || (r = Promise))(function(n, o) {
            function s(e) {
              try {
                p(i.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                p(i.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function p(e) {
              var t;
              e.done
                ? n(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function(e) {
                        e(t);
                      })).then(s, a);
            }
            p((i = i.apply(e, t || [])).next());
          });
        };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = r(26),
      s = r(24),
      a = r(13);
    function p(e) {
      return (
        (1 & e.mode) > 0 ||
        ((8 & e.mode) > 0 && e.gid === process.getgid()) ||
        ((64 & e.mode) > 0 && e.uid === process.getuid())
      );
    }
    (i = s.promises),
      (t.chmod = i.chmod),
      (t.copyFile = i.copyFile),
      (t.lstat = i.lstat),
      (t.mkdir = i.mkdir),
      (t.readdir = i.readdir),
      (t.readlink = i.readlink),
      (t.rename = i.rename),
      (t.rmdir = i.rmdir),
      (t.stat = i.stat),
      (t.symlink = i.symlink),
      (t.unlink = i.unlink),
      (t.IS_WINDOWS = "win32" === process.platform),
      (t.exists = function(e) {
        return n(this, void 0, void 0, function*() {
          try {
            yield t.stat(e);
          } catch (e) {
            if ("ENOENT" === e.code) return !1;
            throw e;
          }
          return !0;
        });
      }),
      (t.isDirectory = function(e, r = !1) {
        return n(this, void 0, void 0, function*() {
          return (r ? yield t.stat(e) : yield t.lstat(e)).isDirectory();
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
      (t.mkdirP = function e(r, i = 1e3, s = 1) {
        return n(this, void 0, void 0, function*() {
          if (
            (o.ok(r, "a path argument must be provided"),
            (r = a.resolve(r)),
            s >= i)
          )
            return t.mkdir(r);
          try {
            return void (yield t.mkdir(r));
          } catch (n) {
            switch (n.code) {
              case "ENOENT":
                return yield e(a.dirname(r), i, s + 1), void (yield t.mkdir(r));
              default: {
                let e;
                try {
                  e = yield t.stat(r);
                } catch (e) {
                  throw n;
                }
                if (!e.isDirectory()) throw n;
              }
            }
          }
        });
      }),
      (t.tryGetExecutablePath = function(e, r) {
        return n(this, void 0, void 0, function*() {
          let i = void 0;
          try {
            i = yield t.stat(e);
          } catch (t) {
            "ENOENT" !== t.code &&
              console.log(
                `Unexpected error attempting to determine if executable file exists '${e}': ${t}`,
              );
          }
          if (i && i.isFile())
            if (t.IS_WINDOWS) {
              const t = a.extname(e).toUpperCase();
              if (r.some(e => e.toUpperCase() === t)) return e;
            } else if (p(i)) return e;
          const n = e;
          for (const o of r) {
            (e = n + o), (i = void 0);
            try {
              i = yield t.stat(e);
            } catch (t) {
              "ENOENT" !== t.code &&
                console.log(
                  `Unexpected error attempting to determine if executable file exists '${e}': ${t}`,
                );
            }
            if (i && i.isFile()) {
              if (t.IS_WINDOWS) {
                try {
                  const r = a.dirname(e),
                    i = a.basename(e).toUpperCase();
                  for (const n of yield t.readdir(r))
                    if (i === n.toUpperCase()) {
                      e = a.join(r, n);
                      break;
                    }
                } catch (t) {
                  console.log(
                    `Unexpected error attempting to determine the actual case of the file '${e}': ${t}`,
                  );
                }
                return e;
              }
              if (p(i)) return e;
            }
          }
          return "";
        });
      });
  },
  function(e, t, r) {
    "use strict";
    /*!
     * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     */
    function i(e) {
      return (
        !0 ==
          (null != (t = e) &&
            "object" == typeof t &&
            !1 === Array.isArray(t)) &&
        "[object Object]" === Object.prototype.toString.call(e)
      );
      /*!
       * isobject <https://github.com/jonschlinkert/isobject>
       *
       * Copyright (c) 2014-2017, Jon Schlinkert.
       * Released under the MIT License.
       */
      var t;
    }
    function n(e, t) {
      const r = Object.assign({}, e);
      return (
        Object.keys(t).forEach(o => {
          var s, a, p;
          !1 !== i((s = t[o])) &&
          "function" == typeof (a = s.constructor) &&
          !1 !== i((p = a.prototype)) &&
          !1 !== p.hasOwnProperty("isPrototypeOf")
            ? o in e
              ? (r[o] = n(e[o], t[o]))
              : Object.assign(r, { [o]: t[o] })
            : Object.assign(r, { [o]: t[o] });
        }),
        r
      );
    }
    function o(e, t, r) {
      if ("string" == typeof t) {
        let [e, i] = t.split(" ");
        r = Object.assign(i ? { method: e, url: i } : { url: e }, r);
      } else r = Object.assign({}, t);
      var i;
      r.headers = (i = r.headers)
        ? Object.keys(i).reduce((e, t) => ((e[t.toLowerCase()] = i[t]), e), {})
        : {};
      const o = n(e || {}, r);
      return (
        e &&
          e.mediaType.previews.length &&
          (o.mediaType.previews = e.mediaType.previews
            .filter(e => !o.mediaType.previews.includes(e))
            .concat(o.mediaType.previews)),
        (o.mediaType.previews = o.mediaType.previews.map(e =>
          e.replace(/-preview/, ""),
        )),
        o
      );
    }
    r.r(t),
      r.d(t, "request", function() {
        return ye;
      });
    const s = /\{[^}]+\}/g;
    function a(e) {
      return e.replace(/^\W+|\W+$/g, "").split(/,/);
    }
    function p(e, t) {
      return Object.keys(e)
        .filter(e => !t.includes(e))
        .reduce((t, r) => ((t[r] = e[r]), t), {});
    }
    function u(e) {
      return e
        .split(/(%[0-9A-Fa-f]{2})/g)
        .map(function(e) {
          return (
            /%[0-9A-Fa-f]/.test(e) ||
              (e = encodeURI(e)
                .replace(/%5B/g, "[")
                .replace(/%5D/g, "]")),
            e
          );
        })
        .join("");
    }
    function c(e) {
      return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
        return (
          "%" +
          e
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()
        );
      });
    }
    function d(e, t, r) {
      return (t = "+" === e || "#" === e ? u(t) : c(t)), r ? c(r) + "=" + t : t;
    }
    function l(e) {
      return null != e;
    }
    function g(e) {
      return ";" === e || "&" === e || "?" === e;
    }
    function m(e, t) {
      var r = ["+", "#", ".", "/", ";", "?", "&"];
      return e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(e, i, n) {
        if (i) {
          let e = "";
          const n = [];
          if (
            (-1 !== r.indexOf(i.charAt(0)) &&
              ((e = i.charAt(0)), (i = i.substr(1))),
            i.split(/,/g).forEach(function(r) {
              var i = /([^:\*]*)(?::(\d+)|(\*))?/.exec(r);
              n.push(
                (function(e, t, r, i) {
                  var n = e[r],
                    o = [];
                  if (l(n) && "" !== n)
                    if (
                      "string" == typeof n ||
                      "number" == typeof n ||
                      "boolean" == typeof n
                    )
                      (n = n.toString()),
                        i && "*" !== i && (n = n.substring(0, parseInt(i, 10))),
                        o.push(d(t, n, g(t) ? r : ""));
                    else if ("*" === i)
                      Array.isArray(n)
                        ? n.filter(l).forEach(function(e) {
                            o.push(d(t, e, g(t) ? r : ""));
                          })
                        : Object.keys(n).forEach(function(e) {
                            l(n[e]) && o.push(d(t, n[e], e));
                          });
                    else {
                      const e = [];
                      Array.isArray(n)
                        ? n.filter(l).forEach(function(r) {
                            e.push(d(t, r));
                          })
                        : Object.keys(n).forEach(function(r) {
                            l(n[r]) &&
                              (e.push(c(r)), e.push(d(t, n[r].toString())));
                          }),
                        g(t)
                          ? o.push(c(r) + "=" + e.join(","))
                          : 0 !== e.length && o.push(e.join(","));
                    }
                  else
                    ";" === t
                      ? l(n) && o.push(c(r))
                      : "" !== n || ("&" !== t && "?" !== t)
                      ? "" === n && o.push("")
                      : o.push(c(r) + "=");
                  return o;
                })(t, e, i[1], i[2] || i[3]),
              );
            }),
            e && "+" !== e)
          ) {
            var o = ",";
            return (
              "?" === e ? (o = "&") : "#" !== e && (o = e),
              (0 !== n.length ? e : "") + n.join(o)
            );
          }
          return n.join(",");
        }
        return u(n);
      });
    }
    function h(e) {
      let t,
        r = e.method.toUpperCase(),
        i = (e.url || "/").replace(/:([a-z]\w+)/g, "{+$1}"),
        n = Object.assign({}, e.headers),
        o = p(e, [
          "method",
          "baseUrl",
          "url",
          "headers",
          "request",
          "mediaType",
        ]);
      const u = (function(e) {
        const t = e.match(s);
        return t ? t.map(a).reduce((e, t) => e.concat(t), []) : [];
      })(i);
      var c;
      (i = ((c = i), { expand: m.bind(null, c) }).expand(o)),
        /^http/.test(i) || (i = e.baseUrl + i);
      const d = p(
        o,
        Object.keys(e)
          .filter(e => u.includes(e))
          .concat("baseUrl"),
      );
      if (
        !/application\/octet-stream/i.test(n.accept) &&
        (e.mediaType.format &&
          (n.accept = n.accept
            .split(/,/)
            .map(t =>
              t.replace(
                /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
                `application/vnd$1$2.${e.mediaType.format}`,
              ),
            )
            .join(",")),
        e.mediaType.previews.length)
      ) {
        const t = n.accept.match(/[\w-]+(?=-preview)/g) || [];
        n.accept = t
          .concat(e.mediaType.previews)
          .map(
            t =>
              `application/vnd.github.${t}-preview${
                e.mediaType.format ? `.${e.mediaType.format}` : "+json"
              }`,
          )
          .join(",");
      }
      return (
        ["GET", "HEAD"].includes(r)
          ? (i = (function(e, t) {
              const r = /\?/.test(e) ? "&" : "?",
                i = Object.keys(t);
              return 0 === i.length
                ? e
                : e +
                    r +
                    i
                      .map(e =>
                        "q" === e
                          ? "q=" +
                            t.q
                              .split("+")
                              .map(encodeURIComponent)
                              .join("+")
                          : `${e}=${encodeURIComponent(t[e])}`,
                      )
                      .join("&");
            })(i, d))
          : "data" in d
          ? (t = d.data)
          : Object.keys(d).length
          ? (t = d)
          : (n["content-length"] = 0),
        n["content-type"] ||
          void 0 === t ||
          (n["content-type"] = "application/json; charset=utf-8"),
        ["PATCH", "PUT"].includes(r) && void 0 === t && (t = ""),
        Object.assign(
          { method: r, url: i, headers: n },
          void 0 !== t ? { body: t } : null,
          e.request ? { request: e.request } : null,
        )
      );
    }
    function y(e, t, r) {
      return h(o(e, t, r));
    }
    const f = (function e(t, r) {
      const i = o(t, r),
        n = y.bind(null, i);
      return Object.assign(n, {
        DEFAULTS: i,
        defaults: e.bind(null, i),
        merge: o.bind(null, i),
        parse: h,
      });
    })(null, {
      method: "GET",
      baseUrl: "https://api.github.com",
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": `octokit-endpoint.js/6.0.0 ${(function() {
          try {
            return navigator.userAgent;
          } catch (e) {
            return "<environment undetectable>";
          }
        })()}`,
      },
      mediaType: { format: "", previews: [] },
    });
    /*!
     * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     */
    function _(e) {
      return (
        !0 ==
          (null != (t = e) &&
            "object" == typeof t &&
            !1 === Array.isArray(t)) &&
        "[object Object]" === Object.prototype.toString.call(e)
      );
      /*!
       * isobject <https://github.com/jonschlinkert/isobject>
       *
       * Copyright (c) 2014-2017, Jon Schlinkert.
       * Released under the MIT License.
       */
      var t;
    }
    var b = r(2),
      v = r(11),
      w = r(7),
      q = r(15),
      E = r(5);
    const T = b.Readable,
      k = Symbol("buffer"),
      j = Symbol("type");
    class P {
      constructor() {
        this[j] = "";
        const e = arguments[0],
          t = arguments[1],
          r = [];
        let i = 0;
        if (e) {
          const t = e,
            n = Number(t.length);
          for (let e = 0; e < n; e++) {
            const n = t[e];
            let o;
            (o =
              n instanceof Buffer
                ? n
                : ArrayBuffer.isView(n)
                ? Buffer.from(n.buffer, n.byteOffset, n.byteLength)
                : n instanceof ArrayBuffer
                ? Buffer.from(n)
                : n instanceof P
                ? n[k]
                : Buffer.from("string" == typeof n ? n : String(n))),
              (i += o.length),
              r.push(o);
          }
        }
        this[k] = Buffer.concat(r);
        let n = t && void 0 !== t.type && String(t.type).toLowerCase();
        n && !/[^\u0020-\u007E]/.test(n) && (this[j] = n);
      }
      get size() {
        return this[k].length;
      }
      get type() {
        return this[j];
      }
      text() {
        return Promise.resolve(this[k].toString());
      }
      arrayBuffer() {
        const e = this[k],
          t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
        return Promise.resolve(t);
      }
      stream() {
        const e = new T();
        return (e._read = function() {}), e.push(this[k]), e.push(null), e;
      }
      toString() {
        return "[object Blob]";
      }
      slice() {
        const e = this.size,
          t = arguments[0],
          r = arguments[1];
        let i, n;
        (i = void 0 === t ? 0 : t < 0 ? Math.max(e + t, 0) : Math.min(t, e)),
          (n = void 0 === r ? e : r < 0 ? Math.max(e + r, 0) : Math.min(r, e));
        const o = Math.max(n - i, 0),
          s = this[k].slice(i, i + o),
          a = new P([], { type: arguments[2] });
        return (a[k] = s), a;
      }
    }
    function C(e, t, r) {
      Error.call(this, e),
        (this.message = e),
        (this.type = t),
        r && (this.code = this.errno = r.code),
        Error.captureStackTrace(this, this.constructor);
    }
    let O;
    Object.defineProperties(P.prototype, {
      size: { enumerable: !0 },
      type: { enumerable: !0 },
      slice: { enumerable: !0 },
    }),
      Object.defineProperty(P.prototype, Symbol.toStringTag, {
        value: "Blob",
        writable: !1,
        enumerable: !1,
        configurable: !0,
      }),
      (C.prototype = Object.create(Error.prototype)),
      (C.prototype.constructor = C),
      (C.prototype.name = "FetchError");
    try {
      O = require("encoding").convert;
    } catch (e) {}
    const S = Symbol("Body internals"),
      A = b.PassThrough;
    function x(e) {
      var t = this,
        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        i = r.size;
      let n = void 0 === i ? 0 : i;
      var o = r.timeout;
      let s = void 0 === o ? 0 : o;
      null == e
        ? (e = null)
        : F(e)
        ? (e = Buffer.from(e.toString()))
        : G(e) ||
          Buffer.isBuffer(e) ||
          ("[object ArrayBuffer]" === Object.prototype.toString.call(e)
            ? (e = Buffer.from(e))
            : ArrayBuffer.isView(e)
            ? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
            : e instanceof b || (e = Buffer.from(String(e)))),
        (this[S] = { body: e, disturbed: !1, error: null }),
        (this.size = n),
        (this.timeout = s),
        e instanceof b &&
          e.on("error", function(e) {
            const r =
              "AbortError" === e.name
                ? e
                : new C(
                    `Invalid response body while trying to fetch ${t.url}: ${e.message}`,
                    "system",
                    e,
                  );
            t[S].error = r;
          });
    }
    function R() {
      var e = this;
      if (this[S].disturbed)
        return x.Promise.reject(
          new TypeError(`body used already for: ${this.url}`),
        );
      if (((this[S].disturbed = !0), this[S].error))
        return x.Promise.reject(this[S].error);
      let t = this.body;
      if (null === t) return x.Promise.resolve(Buffer.alloc(0));
      if ((G(t) && (t = t.stream()), Buffer.isBuffer(t)))
        return x.Promise.resolve(t);
      if (!(t instanceof b)) return x.Promise.resolve(Buffer.alloc(0));
      let r = [],
        i = 0,
        n = !1;
      return new x.Promise(function(o, s) {
        let a;
        e.timeout &&
          (a = setTimeout(function() {
            (n = !0),
              s(
                new C(
                  `Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,
                  "body-timeout",
                ),
              );
          }, e.timeout)),
          t.on("error", function(t) {
            "AbortError" === t.name
              ? ((n = !0), s(t))
              : s(
                  new C(
                    `Invalid response body while trying to fetch ${e.url}: ${t.message}`,
                    "system",
                    t,
                  ),
                );
          }),
          t.on("data", function(t) {
            if (!n && null !== t) {
              if (e.size && i + t.length > e.size)
                return (
                  (n = !0),
                  void s(
                    new C(
                      `content size at ${e.url} over limit: ${e.size}`,
                      "max-size",
                    ),
                  )
                );
              (i += t.length), r.push(t);
            }
          }),
          t.on("end", function() {
            if (!n) {
              clearTimeout(a);
              try {
                o(Buffer.concat(r, i));
              } catch (t) {
                s(
                  new C(
                    `Could not create Buffer from response body for ${e.url}: ${t.message}`,
                    "system",
                    t,
                  ),
                );
              }
            }
          });
      });
    }
    function F(e) {
      return (
        "object" == typeof e &&
        "function" == typeof e.append &&
        "function" == typeof e.delete &&
        "function" == typeof e.get &&
        "function" == typeof e.getAll &&
        "function" == typeof e.has &&
        "function" == typeof e.set &&
        ("URLSearchParams" === e.constructor.name ||
          "[object URLSearchParams]" === Object.prototype.toString.call(e) ||
          "function" == typeof e.sort)
      );
    }
    function G(e) {
      return (
        "object" == typeof e &&
        "function" == typeof e.arrayBuffer &&
        "string" == typeof e.type &&
        "function" == typeof e.stream &&
        "function" == typeof e.constructor &&
        "string" == typeof e.constructor.name &&
        /^(Blob|File)$/.test(e.constructor.name) &&
        /^(Blob|File)$/.test(e[Symbol.toStringTag])
      );
    }
    function D(e) {
      let t,
        r,
        i = e.body;
      if (e.bodyUsed) throw new Error("cannot clone body after it is used");
      return (
        i instanceof b &&
          "function" != typeof i.getBoundary &&
          ((t = new A()),
          (r = new A()),
          i.pipe(t),
          i.pipe(r),
          (e[S].body = t),
          (i = r)),
        i
      );
    }
    function L(e) {
      return null === e
        ? null
        : "string" == typeof e
        ? "text/plain;charset=UTF-8"
        : F(e)
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : G(e)
        ? e.type || null
        : Buffer.isBuffer(e) ||
          "[object ArrayBuffer]" === Object.prototype.toString.call(e) ||
          ArrayBuffer.isView(e)
        ? null
        : "function" == typeof e.getBoundary
        ? `multipart/form-data;boundary=${e.getBoundary()}`
        : e instanceof b
        ? null
        : "text/plain;charset=UTF-8";
    }
    function U(e) {
      const t = e.body;
      return null === t
        ? 0
        : G(t)
        ? t.size
        : Buffer.isBuffer(t)
        ? t.length
        : t &&
          "function" == typeof t.getLengthSync &&
          ((t._lengthRetrievers && 0 == t._lengthRetrievers.length) ||
            (t.hasKnownLength && t.hasKnownLength()))
        ? t.getLengthSync()
        : null;
    }
    (x.prototype = {
      get body() {
        return this[S].body;
      },
      get bodyUsed() {
        return this[S].disturbed;
      },
      arrayBuffer() {
        return R.call(this).then(function(e) {
          return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
        });
      },
      blob() {
        let e = (this.headers && this.headers.get("content-type")) || "";
        return R.call(this).then(function(t) {
          return Object.assign(new P([], { type: e.toLowerCase() }), {
            [k]: t,
          });
        });
      },
      json() {
        var e = this;
        return R.call(this).then(function(t) {
          try {
            return JSON.parse(t.toString());
          } catch (t) {
            return x.Promise.reject(
              new C(
                `invalid json response body at ${e.url} reason: ${t.message}`,
                "invalid-json",
              ),
            );
          }
        });
      },
      text() {
        return R.call(this).then(function(e) {
          return e.toString();
        });
      },
      buffer() {
        return R.call(this);
      },
      textConverted() {
        var e = this;
        return R.call(this).then(function(t) {
          return (function(e, t) {
            if ("function" != typeof O)
              throw new Error(
                "The package `encoding` must be installed to use the textConverted() function",
              );
            const r = t.get("content-type");
            let i,
              n,
              o = "utf-8";
            r && (i = /charset=([^;]*)/i.exec(r));
            (n = e.slice(0, 1024).toString()),
              !i && n && (i = /<meta.+?charset=(['"])(.+?)\1/i.exec(n));
            !i &&
              n &&
              ((i = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(
                n,
              )),
              i && (i = /charset=(.*)/i.exec(i.pop())));
            !i && n && (i = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(n));
            i &&
              ((o = i.pop()),
              ("gb2312" !== o && "gbk" !== o) || (o = "gb18030"));
            return O(e, "UTF-8", o).toString();
          })(t, e.headers);
        });
      },
    }),
      Object.defineProperties(x.prototype, {
        body: { enumerable: !0 },
        bodyUsed: { enumerable: !0 },
        arrayBuffer: { enumerable: !0 },
        blob: { enumerable: !0 },
        json: { enumerable: !0 },
        text: { enumerable: !0 },
      }),
      (x.mixIn = function(e) {
        for (const t of Object.getOwnPropertyNames(x.prototype))
          if (!(t in e)) {
            const r = Object.getOwnPropertyDescriptor(x.prototype, t);
            Object.defineProperty(e, t, r);
          }
      }),
      (x.Promise = global.Promise);
    const I = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,
      $ = /[^\t\x20-\x7e\x80-\xff]/;
    function B(e) {
      if (((e = `${e}`), I.test(e) || "" === e))
        throw new TypeError(`${e} is not a legal HTTP header name`);
    }
    function H(e) {
      if (((e = `${e}`), $.test(e)))
        throw new TypeError(`${e} is not a legal HTTP header value`);
    }
    function N(e, t) {
      t = t.toLowerCase();
      for (const r in e) if (r.toLowerCase() === t) return r;
    }
    const M = Symbol("map");
    class z {
      constructor() {
        let e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : void 0;
        if (((this[M] = Object.create(null)), e instanceof z)) {
          const t = e.raw(),
            r = Object.keys(t);
          for (const e of r) for (const r of t[e]) this.append(e, r);
        } else if (null == e);
        else {
          if ("object" != typeof e)
            throw new TypeError("Provided initializer must be an object");
          {
            const t = e[Symbol.iterator];
            if (null != t) {
              if ("function" != typeof t)
                throw new TypeError("Header pairs must be iterable");
              const r = [];
              for (const t of e) {
                if (
                  "object" != typeof t ||
                  "function" != typeof t[Symbol.iterator]
                )
                  throw new TypeError("Each header pair must be iterable");
                r.push(Array.from(t));
              }
              for (const e of r) {
                if (2 !== e.length)
                  throw new TypeError(
                    "Each header pair must be a name/value tuple",
                  );
                this.append(e[0], e[1]);
              }
            } else
              for (const t of Object.keys(e)) {
                const r = e[t];
                this.append(t, r);
              }
          }
        }
      }
      get(e) {
        B((e = `${e}`));
        const t = N(this[M], e);
        return void 0 === t ? null : this[M][t].join(", ");
      }
      forEach(e) {
        let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : void 0,
          r = V(this),
          i = 0;
        for (; i < r.length; ) {
          var n = r[i];
          const o = n[0],
            s = n[1];
          e.call(t, s, o, this), (r = V(this)), i++;
        }
      }
      set(e, t) {
        (t = `${t}`), B((e = `${e}`)), H(t);
        const r = N(this[M], e);
        this[M][void 0 !== r ? r : e] = [t];
      }
      append(e, t) {
        (t = `${t}`), B((e = `${e}`)), H(t);
        const r = N(this[M], e);
        void 0 !== r ? this[M][r].push(t) : (this[M][e] = [t]);
      }
      has(e) {
        return B((e = `${e}`)), void 0 !== N(this[M], e);
      }
      delete(e) {
        B((e = `${e}`));
        const t = N(this[M], e);
        void 0 !== t && delete this[M][t];
      }
      raw() {
        return this[M];
      }
      keys() {
        return J(this, "key");
      }
      values() {
        return J(this, "value");
      }
      [Symbol.iterator]() {
        return J(this, "key+value");
      }
    }
    function V(e) {
      let t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "key+value";
      const r = Object.keys(e[M]).sort();
      return r.map(
        "key" === t
          ? function(e) {
              return e.toLowerCase();
            }
          : "value" === t
          ? function(t) {
              return e[M][t].join(", ");
            }
          : function(t) {
              return [t.toLowerCase(), e[M][t].join(", ")];
            },
      );
    }
    (z.prototype.entries = z.prototype[Symbol.iterator]),
      Object.defineProperty(z.prototype, Symbol.toStringTag, {
        value: "Headers",
        writable: !1,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperties(z.prototype, {
        get: { enumerable: !0 },
        forEach: { enumerable: !0 },
        set: { enumerable: !0 },
        append: { enumerable: !0 },
        has: { enumerable: !0 },
        delete: { enumerable: !0 },
        keys: { enumerable: !0 },
        values: { enumerable: !0 },
        entries: { enumerable: !0 },
      });
    const W = Symbol("internal");
    function J(e, t) {
      const r = Object.create(Q);
      return (r[W] = { target: e, kind: t, index: 0 }), r;
    }
    const Q = Object.setPrototypeOf(
      {
        next() {
          if (!this || Object.getPrototypeOf(this) !== Q)
            throw new TypeError("Value of `this` is not a HeadersIterator");
          var e = this[W];
          const t = e.target,
            r = e.kind,
            i = e.index,
            n = V(t, r);
          return i >= n.length
            ? { value: void 0, done: !0 }
            : ((this[W].index = i + 1), { value: n[i], done: !1 });
        },
      },
      Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())),
    );
    function K(e) {
      const t = Object.assign({ __proto__: null }, e[M]),
        r = N(e[M], "Host");
      return void 0 !== r && (t[r] = t[r][0]), t;
    }
    Object.defineProperty(Q, Symbol.toStringTag, {
      value: "HeadersIterator",
      writable: !1,
      enumerable: !1,
      configurable: !0,
    });
    const X = Symbol("Response internals"),
      Y = v.STATUS_CODES;
    class Z {
      constructor() {
        let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : null,
          t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        x.call(this, e, t);
        const r = t.status || 200,
          i = new z(t.headers);
        if (null != e && !i.has("Content-Type")) {
          const t = L(e);
          t && i.append("Content-Type", t);
        }
        this[X] = {
          url: t.url,
          status: r,
          statusText: t.statusText || Y[r],
          headers: i,
          counter: t.counter,
        };
      }
      get url() {
        return this[X].url || "";
      }
      get status() {
        return this[X].status;
      }
      get ok() {
        return this[X].status >= 200 && this[X].status < 300;
      }
      get redirected() {
        return this[X].counter > 0;
      }
      get statusText() {
        return this[X].statusText;
      }
      get headers() {
        return this[X].headers;
      }
      clone() {
        return new Z(D(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
        });
      }
    }
    x.mixIn(Z.prototype),
      Object.defineProperties(Z.prototype, {
        url: { enumerable: !0 },
        status: { enumerable: !0 },
        ok: { enumerable: !0 },
        redirected: { enumerable: !0 },
        statusText: { enumerable: !0 },
        headers: { enumerable: !0 },
        clone: { enumerable: !0 },
      }),
      Object.defineProperty(Z.prototype, Symbol.toStringTag, {
        value: "Response",
        writable: !1,
        enumerable: !1,
        configurable: !0,
      });
    const ee = Symbol("Request internals"),
      te = w.parse,
      re = w.format,
      ie = "destroy" in b.Readable.prototype;
    function ne(e) {
      return "object" == typeof e && "object" == typeof e[ee];
    }
    class oe {
      constructor(e) {
        let t,
          r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        ne(e)
          ? (t = te(e.url))
          : ((t = e && e.href ? te(e.href) : te(`${e}`)), (e = {}));
        let i = r.method || e.method || "GET";
        if (
          ((i = i.toUpperCase()),
          (null != r.body || (ne(e) && null !== e.body)) &&
            ("GET" === i || "HEAD" === i))
        )
          throw new TypeError("Request with GET/HEAD method cannot have body");
        let n =
          null != r.body ? r.body : ne(e) && null !== e.body ? D(e) : null;
        x.call(this, n, {
          timeout: r.timeout || e.timeout || 0,
          size: r.size || e.size || 0,
        });
        const o = new z(r.headers || e.headers || {});
        if (null != n && !o.has("Content-Type")) {
          const e = L(n);
          e && o.append("Content-Type", e);
        }
        let s = ne(e) ? e.signal : null;
        if (
          ("signal" in r && (s = r.signal),
          null != s &&
            !(function(e) {
              const t = e && "object" == typeof e && Object.getPrototypeOf(e);
              return !(!t || "AbortSignal" !== t.constructor.name);
            })(s))
        )
          throw new TypeError(
            "Expected signal to be an instanceof AbortSignal",
          );
        (this[ee] = {
          method: i,
          redirect: r.redirect || e.redirect || "follow",
          headers: o,
          parsedURL: t,
          signal: s,
        }),
          (this.follow =
            void 0 !== r.follow
              ? r.follow
              : void 0 !== e.follow
              ? e.follow
              : 20),
          (this.compress =
            void 0 !== r.compress
              ? r.compress
              : void 0 === e.compress || e.compress),
          (this.counter = r.counter || e.counter || 0),
          (this.agent = r.agent || e.agent);
      }
      get method() {
        return this[ee].method;
      }
      get url() {
        return re(this[ee].parsedURL);
      }
      get headers() {
        return this[ee].headers;
      }
      get redirect() {
        return this[ee].redirect;
      }
      get signal() {
        return this[ee].signal;
      }
      clone() {
        return new oe(this);
      }
    }
    function se(e) {
      Error.call(this, e),
        (this.type = "aborted"),
        (this.message = e),
        Error.captureStackTrace(this, this.constructor);
    }
    x.mixIn(oe.prototype),
      Object.defineProperty(oe.prototype, Symbol.toStringTag, {
        value: "Request",
        writable: !1,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperties(oe.prototype, {
        method: { enumerable: !0 },
        url: { enumerable: !0 },
        headers: { enumerable: !0 },
        redirect: { enumerable: !0 },
        clone: { enumerable: !0 },
        signal: { enumerable: !0 },
      }),
      (se.prototype = Object.create(Error.prototype)),
      (se.prototype.constructor = se),
      (se.prototype.name = "AbortError");
    const ae = b.PassThrough,
      pe = w.resolve;
    function ue(e, t) {
      if (!ue.Promise)
        throw new Error(
          "native promise missing, set fetch.Promise to your favorite alternative",
        );
      return (
        (x.Promise = ue.Promise),
        new ue.Promise(function(r, i) {
          const n = new oe(e, t),
            o = (function(e) {
              const t = e[ee].parsedURL,
                r = new z(e[ee].headers);
              if (
                (r.has("Accept") || r.set("Accept", "*/*"),
                !t.protocol || !t.hostname)
              )
                throw new TypeError("Only absolute URLs are supported");
              if (!/^https?:$/.test(t.protocol))
                throw new TypeError("Only HTTP(S) protocols are supported");
              if (e.signal && e.body instanceof b.Readable && !ie)
                throw new Error(
                  "Cancellation of streamed requests with AbortSignal is not supported in node < 8",
                );
              let i = null;
              if (
                (null == e.body && /^(POST|PUT)$/i.test(e.method) && (i = "0"),
                null != e.body)
              ) {
                const t = U(e);
                "number" == typeof t && (i = String(t));
              }
              i && r.set("Content-Length", i),
                r.has("User-Agent") ||
                  r.set(
                    "User-Agent",
                    "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
                  ),
                e.compress &&
                  !r.has("Accept-Encoding") &&
                  r.set("Accept-Encoding", "gzip,deflate");
              let n = e.agent;
              return (
                "function" == typeof n && (n = n(t)),
                r.has("Connection") || n || r.set("Connection", "close"),
                Object.assign({}, t, {
                  method: e.method,
                  headers: K(r),
                  agent: n,
                })
              );
            })(n),
            s = ("https:" === o.protocol ? q : v).request,
            a = n.signal;
          let p = null;
          const u = function() {
            let e = new se("The user aborted a request.");
            i(e),
              n.body && n.body instanceof b.Readable && n.body.destroy(e),
              p && p.body && p.body.emit("error", e);
          };
          if (a && a.aborted) return void u();
          const c = function() {
              u(), g();
            },
            d = s(o);
          let l;
          function g() {
            d.abort(), a && a.removeEventListener("abort", c), clearTimeout(l);
          }
          a && a.addEventListener("abort", c),
            n.timeout &&
              d.once("socket", function(e) {
                l = setTimeout(function() {
                  i(new C(`network timeout at: ${n.url}`, "request-timeout")),
                    g();
                }, n.timeout);
              }),
            d.on("error", function(e) {
              i(
                new C(
                  `request to ${n.url} failed, reason: ${e.message}`,
                  "system",
                  e,
                ),
              ),
                g();
            }),
            d.on("response", function(e) {
              clearTimeout(l);
              const t = (function(e) {
                const t = new z();
                for (const r of Object.keys(e))
                  if (!I.test(r))
                    if (Array.isArray(e[r]))
                      for (const i of e[r])
                        $.test(i) ||
                          (void 0 === t[M][r]
                            ? (t[M][r] = [i])
                            : t[M][r].push(i));
                    else $.test(e[r]) || (t[M][r] = [e[r]]);
                return t;
              })(e.headers);
              if (ue.isRedirect(e.statusCode)) {
                const o = t.get("Location"),
                  s = null === o ? null : pe(n.url, o);
                switch (n.redirect) {
                  case "error":
                    return (
                      i(
                        new C(
                          `redirect mode is set to error: ${n.url}`,
                          "no-redirect",
                        ),
                      ),
                      void g()
                    );
                  case "manual":
                    if (null !== s)
                      try {
                        t.set("Location", s);
                      } catch (e) {
                        i(e);
                      }
                    break;
                  case "follow":
                    if (null === s) break;
                    if (n.counter >= n.follow)
                      return (
                        i(
                          new C(
                            `maximum redirect reached at: ${n.url}`,
                            "max-redirect",
                          ),
                        ),
                        void g()
                      );
                    const o = {
                      headers: new z(n.headers),
                      follow: n.follow,
                      counter: n.counter + 1,
                      agent: n.agent,
                      compress: n.compress,
                      method: n.method,
                      body: n.body,
                      signal: n.signal,
                      timeout: n.timeout,
                    };
                    return 303 !== e.statusCode && n.body && null === U(n)
                      ? (i(
                          new C(
                            "Cannot follow redirect with body being a readable stream",
                            "unsupported-redirect",
                          ),
                        ),
                        void g())
                      : ((303 !== e.statusCode &&
                          ((301 !== e.statusCode && 302 !== e.statusCode) ||
                            "POST" !== n.method)) ||
                          ((o.method = "GET"),
                          (o.body = void 0),
                          o.headers.delete("content-length")),
                        r(ue(new oe(s, o))),
                        void g());
                }
              }
              e.once("end", function() {
                a && a.removeEventListener("abort", c);
              });
              let o = e.pipe(new ae());
              const s = {
                  url: n.url,
                  status: e.statusCode,
                  statusText: e.statusMessage,
                  headers: t,
                  size: n.size,
                  timeout: n.timeout,
                  counter: n.counter,
                },
                u = t.get("Content-Encoding");
              if (
                !n.compress ||
                "HEAD" === n.method ||
                null === u ||
                204 === e.statusCode ||
                304 === e.statusCode
              )
                return (p = new Z(o, s)), void r(p);
              const d = { flush: E.Z_SYNC_FLUSH, finishFlush: E.Z_SYNC_FLUSH };
              if ("gzip" == u || "x-gzip" == u)
                return (
                  (o = o.pipe(E.createGunzip(d))), (p = new Z(o, s)), void r(p)
                );
              if ("deflate" != u && "x-deflate" != u) {
                if ("br" == u && "function" == typeof E.createBrotliDecompress)
                  return (
                    (o = o.pipe(E.createBrotliDecompress())),
                    (p = new Z(o, s)),
                    void r(p)
                  );
                (p = new Z(o, s)), r(p);
              } else {
                e.pipe(new ae()).once("data", function(e) {
                  (o =
                    8 == (15 & e[0])
                      ? o.pipe(E.createInflate())
                      : o.pipe(E.createInflateRaw())),
                    (p = new Z(o, s)),
                    r(p);
                });
              }
            }),
            (function(e, t) {
              const r = t.body;
              null === r
                ? e.end()
                : G(r)
                ? r.stream().pipe(e)
                : Buffer.isBuffer(r)
                ? (e.write(r), e.end())
                : r.pipe(e);
            })(d, n);
        })
      );
    }
    (ue.isRedirect = function(e) {
      return 301 === e || 302 === e || 303 === e || 307 === e || 308 === e;
    }),
      (ue.Promise = global.Promise);
    var ce = ue,
      de = r(1),
      le = r(4);
    const ge = r.n(le)()(e => console.warn(e));
    class me extends Error {
      constructor(e, t, r) {
        super(e),
          Error.captureStackTrace &&
            Error.captureStackTrace(this, this.constructor),
          (this.name = "HttpError"),
          (this.status = t),
          Object.defineProperty(this, "code", {
            get: () => (
              ge(
                new de.Deprecation(
                  "[@octokit/request-error] `error.code` is deprecated, use `error.status`.",
                ),
              ),
              t
            ),
          }),
          (this.headers = r.headers || {});
        const i = Object.assign({}, r.request);
        r.request.headers.authorization &&
          (i.headers = Object.assign({}, r.request.headers, {
            authorization: r.request.headers.authorization.replace(
              / .*$/,
              " [REDACTED]",
            ),
          })),
          (i.url = i.url
            .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]")
            .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]")),
          (this.request = i);
      }
    }
    function he(e) {
      var t, r, i;
      ((!1 !== _((t = e.body)) &&
        "function" == typeof (r = t.constructor) &&
        !1 !== _((i = r.prototype)) &&
        !1 !== i.hasOwnProperty("isPrototypeOf")) ||
        Array.isArray(e.body)) &&
        (e.body = JSON.stringify(e.body));
      let n,
        o,
        s = {};
      return ((e.request && e.request.fetch) || ce)(
        e.url,
        Object.assign(
          {
            method: e.method,
            body: e.body,
            headers: e.headers,
            redirect: e.redirect,
          },
          e.request,
        ),
      )
        .then(t => {
          (o = t.url), (n = t.status);
          for (const e of t.headers) s[e[0]] = e[1];
          if (204 === n || 205 === n) return;
          if ("HEAD" === e.method) {
            if (n < 400) return;
            throw new me(t.statusText, n, { headers: s, request: e });
          }
          if (304 === n)
            throw new me("Not modified", n, { headers: s, request: e });
          if (n >= 400)
            return t.text().then(t => {
              const r = new me(t, n, { headers: s, request: e });
              try {
                let e = JSON.parse(r.message);
                Object.assign(r, e);
                let t = e.errors;
                r.message = r.message + ": " + t.map(JSON.stringify).join(", ");
              } catch (e) {}
              throw r;
            });
          const r = t.headers.get("content-type");
          return /application\/json/.test(r)
            ? t.json()
            : !r || /^text\/|charset=utf-8$/.test(r)
            ? t.text()
            : (function(e) {
                return e.arrayBuffer();
              })(t);
        })
        .then(e => ({ status: n, url: o, headers: s, data: e }))
        .catch(t => {
          if (t instanceof me) throw t;
          throw new me(t.message, 500, { headers: s, request: e });
        });
    }
    const ye = (function e(t, r) {
      const i = t.defaults(r);
      return Object.assign(
        function(t, r) {
          const n = i.merge(t, r);
          if (!n.request || !n.request.hook) return he(i.parse(n));
          const o = (e, t) => he(i.parse(i.merge(e, t)));
          return (
            Object.assign(o, { endpoint: i, defaults: e.bind(null, i) }),
            n.request.hook(o, n)
          );
        },
        { endpoint: i, defaults: e.bind(null, i) },
      );
    })(f, {
      headers: {
        "user-agent": `octokit-request.js/5.3.4 ${(function() {
          try {
            return navigator.userAgent;
          } catch (e) {
            return "<environment undetectable>";
          }
        })()}`,
      },
    });
  },
  function(e, t, r) {
    "use strict";
    var i;
    "undefined" != typeof Promise && (i = Promise);
    var n = r(35)();
    (n.noConflict = function() {
      try {
        Promise === n && (Promise = i);
      } catch (e) {}
      return n;
    }),
      (e.exports = n);
  },
  function(e, t, r) {
    "use strict";
    var i =
      (this && this.__importStar) ||
      function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return (t.default = e), t;
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = r(65),
      o = r(67),
      s = i(r(106)),
      a = i(r(107));
    (o.Octokit.prototype = new o.Octokit()), (t.context = new s.Context());
    class p extends o.Octokit {
      constructor(e, t) {
        super(p.getOctokitOptions(p.disambiguate(e, t))),
          (this.graphql = p.getGraphQL(p.disambiguate(e, t)));
      }
      static disambiguate(e, t) {
        return [
          "string" == typeof e ? e : "",
          "object" == typeof e ? e : t || {},
        ];
      }
      static getOctokitOptions(e) {
        const t = e[0],
          r = Object.assign({}, e[1]),
          i = p.getAuthString(t, r);
        i && (r.auth = i);
        const n = p.getProxyAgent(r);
        return (
          n &&
            ((r.request = r.request ? Object.assign({}, r.request) : {}),
            (r.request.agent = n)),
          r
        );
      }
      static getGraphQL(e) {
        const t = {},
          r = e[0],
          i = e[1],
          o = this.getAuthString(r, i);
        o && (t.headers = { authorization: o });
        const s = p.getProxyAgent(i);
        return s && (t.request = { agent: s }), n.graphql.defaults(t);
      }
      static getAuthString(e, t) {
        if (!e && !t.auth)
          throw new Error("Parameter token or opts.auth is required");
        if (e && t.auth)
          throw new Error(
            "Parameters token and opts.auth may not both be specified",
          );
        return "string" == typeof t.auth ? t.auth : `token ${e}`;
      }
      static getProxyAgent(e) {
        var t;
        if (!(null === (t = e.request) || void 0 === t ? void 0 : t.agent)) {
          const e = "https://api.github.com";
          if (a.getProxyUrl(e)) {
            return new a.HttpClient().getAgent(e);
          }
        }
      }
    }
    t.GitHub = p;
  },
  function(e, t, r) {
    "use strict";
    var i =
      (this && this.__awaiter) ||
      function(e, t, r, i) {
        return new (r || (r = Promise))(function(n, o) {
          function s(e) {
            try {
              p(i.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              p(i.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function p(e) {
            var t;
            e.done
              ? n(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function(e) {
                      e(t);
                    })).then(s, a);
          }
          p((i = i.apply(e, t || [])).next());
        });
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = r(113);
    t.exec = function(e, t, r) {
      return i(this, void 0, void 0, function*() {
        const i = n.argStringToArray(e);
        if (0 === i.length)
          throw new Error("Parameter 'commandLine' cannot be null or empty.");
        const o = i[0];
        return (
          (t = i.slice(1).concat(t || [])), new n.ToolRunner(o, t, r).exec()
        );
      });
    };
  },
  function(e, t, r) {
    "use strict";
    var i =
      (this && this.__importStar) ||
      function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return (t.default = e), t;
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = i(r(12));
    function o(e, t, r) {
      const i = new s(e, t, r);
      process.stdout.write(i.toString() + n.EOL);
    }
    (t.issueCommand = o),
      (t.issue = function(e, t = "") {
        o(e, {}, t);
      });
    class s {
      constructor(e, t, r) {
        e || (e = "missing.command"),
          (this.command = e),
          (this.properties = t),
          (this.message = r);
      }
      toString() {
        let e = "::" + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          e += " ";
          let r = !0;
          for (const i in this.properties)
            if (this.properties.hasOwnProperty(i)) {
              const n = this.properties[i];
              n &&
                (r ? (r = !1) : (e += ","),
                (e += `${i}=${((t = n),
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
  function(e, t, r) {
    "use strict";
    e.exports = function() {
      var t = function() {
          return new f(
            "circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n",
          );
        },
        i = function() {
          return new x.PromiseInspection(this._target());
        },
        n = function(e) {
          return x.reject(new f(e));
        };
      function o() {}
      var s = {},
        a = r(0);
      a.setReflectHandler(i);
      var p = function() {
          var e = process.domain;
          return void 0 === e ? null : e;
        },
        u = function() {
          return { domain: p(), async: null };
        },
        c =
          a.isNode && a.nodeSupportsAsyncResource ? r(17).AsyncResource : null,
        d = function() {
          return { domain: p(), async: new c("Bluebird::Promise") };
        },
        l = a.isNode
          ? u
          : function() {
              return null;
            };
      a.notEnumerableProp(x, "_getContext", l);
      var g = r(6),
        m = r(36),
        h = new m();
      g.defineProperty(x, "_async", { value: h });
      var y = r(3),
        f = (x.TypeError = y.TypeError);
      x.RangeError = y.RangeError;
      var _ = (x.CancellationError = y.CancellationError);
      (x.TimeoutError = y.TimeoutError),
        (x.OperationalError = y.OperationalError),
        (x.RejectionError = y.OperationalError),
        (x.AggregateError = y.AggregateError);
      var b = function() {},
        v = {},
        w = {},
        q = r(39)(x, b),
        E = r(40)(x, b, q, n, o),
        T = r(41)(x),
        k = T.create,
        j = r(42)(
          x,
          T,
          function() {
            (l = d), a.notEnumerableProp(x, "_getContext", d);
          },
          function() {
            (l = u), a.notEnumerableProp(x, "_getContext", u);
          },
        ),
        P = (j.CapturedTrace, r(43)(x, q, w)),
        C = r(18)(w),
        O = r(19),
        S = a.errorObj,
        A = a.tryCatch;
      function x(e) {
        e !== b &&
          (function(e, t) {
            if (null == e || e.constructor !== x)
              throw new f(
                "the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n",
              );
            if ("function" != typeof t)
              throw new f("expecting a function but got " + a.classString(t));
          })(this, e),
          (this._bitField = 0),
          (this._fulfillmentHandler0 = void 0),
          (this._rejectionHandler0 = void 0),
          (this._promise0 = void 0),
          (this._receiver0 = void 0),
          this._resolveFromExecutor(e),
          this._promiseCreated(),
          this._fireEvent("promiseCreated", this);
      }
      function R(e) {
        this.promise._resolveCallback(e);
      }
      function F(e) {
        this.promise._rejectCallback(e, !1);
      }
      function G(e) {
        var t = new x(b);
        (t._fulfillmentHandler0 = e),
          (t._rejectionHandler0 = e),
          (t._promise0 = e),
          (t._receiver0 = e);
      }
      return (
        (x.prototype.toString = function() {
          return "[object Promise]";
        }),
        (x.prototype.caught = x.prototype.catch = function(e) {
          var t = arguments.length;
          if (t > 1) {
            var r,
              i = new Array(t - 1),
              o = 0;
            for (r = 0; r < t - 1; ++r) {
              var s = arguments[r];
              if (!a.isObject(s))
                return n(
                  "Catch statement predicate: expecting an object but got " +
                    a.classString(s),
                );
              i[o++] = s;
            }
            if (((i.length = o), "function" != typeof (e = arguments[r])))
              throw new f(
                "The last argument to .catch() must be a function, got " +
                  a.toString(e),
              );
            return this.then(void 0, C(i, e, this));
          }
          return this.then(void 0, e);
        }),
        (x.prototype.reflect = function() {
          return this._then(i, i, void 0, this, void 0);
        }),
        (x.prototype.then = function(e, t) {
          if (
            j.warnings() &&
            arguments.length > 0 &&
            "function" != typeof e &&
            "function" != typeof t
          ) {
            var r =
              ".then() only accepts functions but was passed: " +
              a.classString(e);
            arguments.length > 1 && (r += ", " + a.classString(t)),
              this._warn(r);
          }
          return this._then(e, t, void 0, void 0, void 0);
        }),
        (x.prototype.done = function(e, t) {
          this._then(e, t, void 0, void 0, void 0)._setIsFinal();
        }),
        (x.prototype.spread = function(e) {
          return "function" != typeof e
            ? n("expecting a function but got " + a.classString(e))
            : this.all()._then(e, void 0, void 0, v, void 0);
        }),
        (x.prototype.toJSON = function() {
          var e = {
            isFulfilled: !1,
            isRejected: !1,
            fulfillmentValue: void 0,
            rejectionReason: void 0,
          };
          return (
            this.isFulfilled()
              ? ((e.fulfillmentValue = this.value()), (e.isFulfilled = !0))
              : this.isRejected() &&
                ((e.rejectionReason = this.reason()), (e.isRejected = !0)),
            e
          );
        }),
        (x.prototype.all = function() {
          return (
            arguments.length > 0 &&
              this._warn(
                ".all() was passed arguments but it does not take any",
              ),
            new E(this).promise()
          );
        }),
        (x.prototype.error = function(e) {
          return this.caught(a.originatesFromRejection, e);
        }),
        (x.getNewLibraryCopy = e.exports),
        (x.is = function(e) {
          return e instanceof x;
        }),
        (x.fromNode = x.fromCallback = function(e) {
          var t = new x(b);
          t._captureStackTrace();
          var r = arguments.length > 1 && !!Object(arguments[1]).multiArgs,
            i = A(e)(O(t, r));
          return (
            i === S && t._rejectCallback(i.e, !0),
            t._isFateSealed() || t._setAsyncGuaranteed(),
            t
          );
        }),
        (x.all = function(e) {
          return new E(e).promise();
        }),
        (x.cast = function(e) {
          var t = q(e);
          return (
            t instanceof x ||
              ((t = new x(b))._captureStackTrace(),
              t._setFulfilled(),
              (t._rejectionHandler0 = e)),
            t
          );
        }),
        (x.resolve = x.fulfilled = x.cast),
        (x.reject = x.rejected = function(e) {
          var t = new x(b);
          return t._captureStackTrace(), t._rejectCallback(e, !0), t;
        }),
        (x.setScheduler = function(e) {
          if ("function" != typeof e)
            throw new f("expecting a function but got " + a.classString(e));
          return h.setScheduler(e);
        }),
        (x.prototype._then = function(e, t, r, i, n) {
          var o = void 0 !== n,
            s = o ? n : new x(b),
            p = this._target(),
            u = p._bitField;
          o ||
            (s._propagateFrom(this, 3),
            s._captureStackTrace(),
            void 0 === i &&
              0 != (2097152 & this._bitField) &&
              (i =
                0 != (50397184 & u)
                  ? this._boundValue()
                  : p === this
                  ? void 0
                  : this._boundTo),
            this._fireEvent("promiseChained", this, s));
          var c = l();
          if (0 != (50397184 & u)) {
            var d,
              g,
              m = p._settlePromiseCtx;
            0 != (33554432 & u)
              ? ((g = p._rejectionHandler0), (d = e))
              : 0 != (16777216 & u)
              ? ((g = p._fulfillmentHandler0),
                (d = t),
                p._unsetRejectionIsUnhandled())
              : ((m = p._settlePromiseLateCancellationObserver),
                (g = new _("late cancellation observer")),
                p._attachExtraTrace(g),
                (d = t)),
              h.invoke(m, p, {
                handler: a.contextBind(c, d),
                promise: s,
                receiver: i,
                value: g,
              });
          } else p._addCallbacks(e, t, s, i, c);
          return s;
        }),
        (x.prototype._length = function() {
          return 65535 & this._bitField;
        }),
        (x.prototype._isFateSealed = function() {
          return 0 != (117506048 & this._bitField);
        }),
        (x.prototype._isFollowing = function() {
          return 67108864 == (67108864 & this._bitField);
        }),
        (x.prototype._setLength = function(e) {
          this._bitField = (-65536 & this._bitField) | (65535 & e);
        }),
        (x.prototype._setFulfilled = function() {
          (this._bitField = 33554432 | this._bitField),
            this._fireEvent("promiseFulfilled", this);
        }),
        (x.prototype._setRejected = function() {
          (this._bitField = 16777216 | this._bitField),
            this._fireEvent("promiseRejected", this);
        }),
        (x.prototype._setFollowing = function() {
          (this._bitField = 67108864 | this._bitField),
            this._fireEvent("promiseResolved", this);
        }),
        (x.prototype._setIsFinal = function() {
          this._bitField = 4194304 | this._bitField;
        }),
        (x.prototype._isFinal = function() {
          return (4194304 & this._bitField) > 0;
        }),
        (x.prototype._unsetCancelled = function() {
          this._bitField = -65537 & this._bitField;
        }),
        (x.prototype._setCancelled = function() {
          (this._bitField = 65536 | this._bitField),
            this._fireEvent("promiseCancelled", this);
        }),
        (x.prototype._setWillBeCancelled = function() {
          this._bitField = 8388608 | this._bitField;
        }),
        (x.prototype._setAsyncGuaranteed = function() {
          if (!h.hasCustomScheduler()) {
            var e = this._bitField;
            this._bitField = e | (((536870912 & e) >> 2) ^ 134217728);
          }
        }),
        (x.prototype._setNoAsyncGuarantee = function() {
          this._bitField = -134217729 & (536870912 | this._bitField);
        }),
        (x.prototype._receiverAt = function(e) {
          var t = 0 === e ? this._receiver0 : this[4 * e - 4 + 3];
          if (t !== s)
            return void 0 === t && this._isBound() ? this._boundValue() : t;
        }),
        (x.prototype._promiseAt = function(e) {
          return this[4 * e - 4 + 2];
        }),
        (x.prototype._fulfillmentHandlerAt = function(e) {
          return this[4 * e - 4 + 0];
        }),
        (x.prototype._rejectionHandlerAt = function(e) {
          return this[4 * e - 4 + 1];
        }),
        (x.prototype._boundValue = function() {}),
        (x.prototype._migrateCallback0 = function(e) {
          e._bitField;
          var t = e._fulfillmentHandler0,
            r = e._rejectionHandler0,
            i = e._promise0,
            n = e._receiverAt(0);
          void 0 === n && (n = s), this._addCallbacks(t, r, i, n, null);
        }),
        (x.prototype._migrateCallbackAt = function(e, t) {
          var r = e._fulfillmentHandlerAt(t),
            i = e._rejectionHandlerAt(t),
            n = e._promiseAt(t),
            o = e._receiverAt(t);
          void 0 === o && (o = s), this._addCallbacks(r, i, n, o, null);
        }),
        (x.prototype._addCallbacks = function(e, t, r, i, n) {
          var o = this._length();
          if ((o >= 65531 && ((o = 0), this._setLength(0)), 0 === o))
            (this._promise0 = r),
              (this._receiver0 = i),
              "function" == typeof e &&
                (this._fulfillmentHandler0 = a.contextBind(n, e)),
              "function" == typeof t &&
                (this._rejectionHandler0 = a.contextBind(n, t));
          else {
            var s = 4 * o - 4;
            (this[s + 2] = r),
              (this[s + 3] = i),
              "function" == typeof e && (this[s + 0] = a.contextBind(n, e)),
              "function" == typeof t && (this[s + 1] = a.contextBind(n, t));
          }
          return this._setLength(o + 1), o;
        }),
        (x.prototype._proxy = function(e, t) {
          this._addCallbacks(void 0, void 0, t, e, null);
        }),
        (x.prototype._resolveCallback = function(e, r) {
          if (0 == (117506048 & this._bitField)) {
            if (e === this) return this._rejectCallback(t(), !1);
            var i = q(e, this);
            if (!(i instanceof x)) return this._fulfill(e);
            r && this._propagateFrom(i, 2);
            var n = i._target();
            if (n !== this) {
              var o = n._bitField;
              if (0 == (50397184 & o)) {
                var s = this._length();
                s > 0 && n._migrateCallback0(this);
                for (var a = 1; a < s; ++a) n._migrateCallbackAt(this, a);
                this._setFollowing(), this._setLength(0), this._setFollowee(i);
              } else if (0 != (33554432 & o)) this._fulfill(n._value());
              else if (0 != (16777216 & o)) this._reject(n._reason());
              else {
                var p = new _("late cancellation observer");
                n._attachExtraTrace(p), this._reject(p);
              }
            } else this._reject(t());
          }
        }),
        (x.prototype._rejectCallback = function(e, t, r) {
          var i = a.ensureErrorObject(e),
            n = i === e;
          if (!n && !r && j.warnings()) {
            var o =
              "a promise was rejected with a non-error: " + a.classString(e);
            this._warn(o, !0);
          }
          this._attachExtraTrace(i, !!t && n), this._reject(e);
        }),
        (x.prototype._resolveFromExecutor = function(e) {
          if (e !== b) {
            var t = this;
            this._captureStackTrace(), this._pushContext();
            var r = !0,
              i = this._execute(
                e,
                function(e) {
                  t._resolveCallback(e);
                },
                function(e) {
                  t._rejectCallback(e, r);
                },
              );
            (r = !1),
              this._popContext(),
              void 0 !== i && t._rejectCallback(i, !0);
          }
        }),
        (x.prototype._settlePromiseFromHandler = function(e, t, r, i) {
          var n = i._bitField;
          if (0 == (65536 & n)) {
            var o;
            i._pushContext(),
              t === v
                ? r && "number" == typeof r.length
                  ? (o = A(e).apply(this._boundValue(), r))
                  : ((o = S).e = new f(
                      "cannot .spread() a non-array: " + a.classString(r),
                    ))
                : (o = A(e).call(t, r));
            var s = i._popContext();
            0 == (65536 & (n = i._bitField)) &&
              (o === w
                ? i._reject(r)
                : o === S
                ? i._rejectCallback(o.e, !1)
                : (j.checkForgottenReturns(o, s, "", i, this),
                  i._resolveCallback(o)));
          }
        }),
        (x.prototype._target = function() {
          for (var e = this; e._isFollowing(); ) e = e._followee();
          return e;
        }),
        (x.prototype._followee = function() {
          return this._rejectionHandler0;
        }),
        (x.prototype._setFollowee = function(e) {
          this._rejectionHandler0 = e;
        }),
        (x.prototype._settlePromise = function(e, t, r, n) {
          var s = e instanceof x,
            a = this._bitField,
            p = 0 != (134217728 & a);
          0 != (65536 & a)
            ? (s && e._invokeInternalOnCancel(),
              r instanceof P && r.isFinallyHandler()
                ? ((r.cancelPromise = e),
                  A(t).call(r, n) === S && e._reject(S.e))
                : t === i
                ? e._fulfill(i.call(r))
                : r instanceof o
                ? r._promiseCancelled(e)
                : s || e instanceof E
                ? e._cancel()
                : r.cancel())
            : "function" == typeof t
            ? s
              ? (p && e._setAsyncGuaranteed(),
                this._settlePromiseFromHandler(t, r, n, e))
              : t.call(r, n, e)
            : r instanceof o
            ? r._isResolved() ||
              (0 != (33554432 & a)
                ? r._promiseFulfilled(n, e)
                : r._promiseRejected(n, e))
            : s &&
              (p && e._setAsyncGuaranteed(),
              0 != (33554432 & a) ? e._fulfill(n) : e._reject(n));
        }),
        (x.prototype._settlePromiseLateCancellationObserver = function(e) {
          var t = e.handler,
            r = e.promise,
            i = e.receiver,
            n = e.value;
          "function" == typeof t
            ? r instanceof x
              ? this._settlePromiseFromHandler(t, i, n, r)
              : t.call(i, n, r)
            : r instanceof x && r._reject(n);
        }),
        (x.prototype._settlePromiseCtx = function(e) {
          this._settlePromise(e.promise, e.handler, e.receiver, e.value);
        }),
        (x.prototype._settlePromise0 = function(e, t, r) {
          var i = this._promise0,
            n = this._receiverAt(0);
          (this._promise0 = void 0),
            (this._receiver0 = void 0),
            this._settlePromise(i, e, n, t);
        }),
        (x.prototype._clearCallbackDataAtIndex = function(e) {
          var t = 4 * e - 4;
          this[t + 2] = this[t + 3] = this[t + 0] = this[t + 1] = void 0;
        }),
        (x.prototype._fulfill = function(e) {
          var r = this._bitField;
          if (!((117506048 & r) >>> 16)) {
            if (e === this) {
              var i = t();
              return this._attachExtraTrace(i), this._reject(i);
            }
            this._setFulfilled(),
              (this._rejectionHandler0 = e),
              (65535 & r) > 0 &&
                (0 != (134217728 & r)
                  ? this._settlePromises()
                  : h.settlePromises(this),
                this._dereferenceTrace());
          }
        }),
        (x.prototype._reject = function(e) {
          var t = this._bitField;
          if (!((117506048 & t) >>> 16)) {
            if (
              (this._setRejected(),
              (this._fulfillmentHandler0 = e),
              this._isFinal())
            )
              return h.fatalError(e, a.isNode);
            (65535 & t) > 0
              ? h.settlePromises(this)
              : this._ensurePossibleRejectionHandled();
          }
        }),
        (x.prototype._fulfillPromises = function(e, t) {
          for (var r = 1; r < e; r++) {
            var i = this._fulfillmentHandlerAt(r),
              n = this._promiseAt(r),
              o = this._receiverAt(r);
            this._clearCallbackDataAtIndex(r), this._settlePromise(n, i, o, t);
          }
        }),
        (x.prototype._rejectPromises = function(e, t) {
          for (var r = 1; r < e; r++) {
            var i = this._rejectionHandlerAt(r),
              n = this._promiseAt(r),
              o = this._receiverAt(r);
            this._clearCallbackDataAtIndex(r), this._settlePromise(n, i, o, t);
          }
        }),
        (x.prototype._settlePromises = function() {
          var e = this._bitField,
            t = 65535 & e;
          if (t > 0) {
            if (0 != (16842752 & e)) {
              var r = this._fulfillmentHandler0;
              this._settlePromise0(this._rejectionHandler0, r, e),
                this._rejectPromises(t, r);
            } else {
              var i = this._rejectionHandler0;
              this._settlePromise0(this._fulfillmentHandler0, i, e),
                this._fulfillPromises(t, i);
            }
            this._setLength(0);
          }
          this._clearCancellationData();
        }),
        (x.prototype._settledValue = function() {
          var e = this._bitField;
          return 0 != (33554432 & e)
            ? this._rejectionHandler0
            : 0 != (16777216 & e)
            ? this._fulfillmentHandler0
            : void 0;
        }),
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          g.defineProperty(x.prototype, Symbol.toStringTag, {
            get: function() {
              return "Object";
            },
          }),
        (x.defer = x.pending = function() {
          return (
            j.deprecated("Promise.defer", "new Promise"),
            { promise: new x(b), resolve: R, reject: F }
          );
        }),
        a.notEnumerableProp(x, "_makeSelfResolutionError", t),
        r(44)(x, b, q, n, j),
        r(45)(x, b, q, j),
        r(46)(x, E, n, j),
        r(47)(x),
        r(48)(x),
        r(49)(x, E, q, b, h),
        (x.Promise = x),
        (x.version = "3.7.2"),
        r(50)(x),
        r(51)(x, n, b, q, o, j),
        r(52)(x, E, n, q, b, j),
        r(53)(x),
        r(54)(x, b),
        r(55)(x, E, q, n),
        r(56)(x, b, q, n),
        r(57)(x, E, n, q, b, j),
        r(58)(x, E, j),
        r(59)(x, E, n),
        r(60)(x, b, j),
        r(61)(x, n, q, k, b, j),
        r(62)(x),
        r(63)(x, b),
        r(64)(x, b),
        a.toFastProperties(x),
        a.toFastProperties(x.prototype),
        G({ a: 1 }),
        G({ b: 2 }),
        G({ c: 3 }),
        G(1),
        G(function() {}),
        G(void 0),
        G(!1),
        G(new x(b)),
        j.setBounds(m.firstLineError, a.lastLineError),
        x
      );
    };
  },
  function(e, t, r) {
    "use strict";
    var i;
    try {
      throw new Error();
    } catch (e) {
      i = e;
    }
    var n = r(37),
      o = r(38);
    function s() {
      (this._customScheduler = !1),
        (this._isTickUsed = !1),
        (this._lateQueue = new o(16)),
        (this._normalQueue = new o(16)),
        (this._haveDrainedQueues = !1);
      var e = this;
      (this.drainQueues = function() {
        e._drainQueues();
      }),
        (this._schedule = n);
    }
    function a(e) {
      for (; e.length() > 0; ) p(e);
    }
    function p(e) {
      var t = e.shift();
      if ("function" != typeof t) t._settlePromises();
      else {
        var r = e.shift(),
          i = e.shift();
        t.call(r, i);
      }
    }
    (s.prototype.setScheduler = function(e) {
      var t = this._schedule;
      return (this._schedule = e), (this._customScheduler = !0), t;
    }),
      (s.prototype.hasCustomScheduler = function() {
        return this._customScheduler;
      }),
      (s.prototype.haveItemsQueued = function() {
        return this._isTickUsed || this._haveDrainedQueues;
      }),
      (s.prototype.fatalError = function(e, t) {
        t
          ? (process.stderr.write(
              "Fatal " + (e instanceof Error ? e.stack : e) + "\n",
            ),
            process.exit(2))
          : this.throwLater(e);
      }),
      (s.prototype.throwLater = function(e, t) {
        if (
          (1 === arguments.length &&
            ((t = e),
            (e = function() {
              throw t;
            })),
          "undefined" != typeof setTimeout)
        )
          setTimeout(function() {
            e(t);
          }, 0);
        else
          try {
            this._schedule(function() {
              e(t);
            });
          } catch (e) {
            throw new Error(
              "No async scheduler available\n\n    See http://goo.gl/MqrFmX\n",
            );
          }
      }),
      (s.prototype.invokeLater = function(e, t, r) {
        this._lateQueue.push(e, t, r), this._queueTick();
      }),
      (s.prototype.invoke = function(e, t, r) {
        this._normalQueue.push(e, t, r), this._queueTick();
      }),
      (s.prototype.settlePromises = function(e) {
        this._normalQueue._pushOne(e), this._queueTick();
      }),
      (s.prototype._drainQueues = function() {
        a(this._normalQueue),
          this._reset(),
          (this._haveDrainedQueues = !0),
          a(this._lateQueue);
      }),
      (s.prototype._queueTick = function() {
        this._isTickUsed ||
          ((this._isTickUsed = !0), this._schedule(this.drainQueues));
      }),
      (s.prototype._reset = function() {
        this._isTickUsed = !1;
      }),
      (e.exports = s),
      (e.exports.firstLineError = i);
  },
  function(e, t, r) {
    "use strict";
    var i,
      n = r(0),
      o = n.getNativePromise();
    if (n.isNode && "undefined" == typeof MutationObserver) {
      var s = global.setImmediate,
        a = process.nextTick;
      i = n.isRecentNode
        ? function(e) {
            s.call(global, e);
          }
        : function(e) {
            a.call(process, e);
          };
    } else if ("function" == typeof o && "function" == typeof o.resolve) {
      var p = o.resolve();
      i = function(e) {
        p.then(e);
      };
    } else
      i =
        "undefined" == typeof MutationObserver ||
        ("undefined" != typeof window &&
          window.navigator &&
          (window.navigator.standalone || window.cordova)) ||
        !("classList" in document.documentElement)
          ? "undefined" != typeof setImmediate
            ? function(e) {
                setImmediate(e);
              }
            : "undefined" != typeof setTimeout
            ? function(e) {
                setTimeout(e, 0);
              }
            : function() {
                throw new Error(
                  "No async scheduler available\n\n    See http://goo.gl/MqrFmX\n",
                );
              }
          : (function() {
              var e = document.createElement("div"),
                t = { attributes: !0 },
                r = !1,
                i = document.createElement("div");
              new MutationObserver(function() {
                e.classList.toggle("foo"), (r = !1);
              }).observe(i, t);
              return function(n) {
                var o = new MutationObserver(function() {
                  o.disconnect(), n();
                });
                o.observe(e, t), r || ((r = !0), i.classList.toggle("foo"));
              };
            })();
    e.exports = i;
  },
  function(e, t, r) {
    "use strict";
    function i(e) {
      (this._capacity = e), (this._length = 0), (this._front = 0);
    }
    (i.prototype._willBeOverCapacity = function(e) {
      return this._capacity < e;
    }),
      (i.prototype._pushOne = function(e) {
        var t = this.length();
        this._checkCapacity(t + 1),
          (this[(this._front + t) & (this._capacity - 1)] = e),
          (this._length = t + 1);
      }),
      (i.prototype.push = function(e, t, r) {
        var i = this.length() + 3;
        if (this._willBeOverCapacity(i))
          return this._pushOne(e), this._pushOne(t), void this._pushOne(r);
        var n = this._front + i - 3;
        this._checkCapacity(i);
        var o = this._capacity - 1;
        (this[(n + 0) & o] = e),
          (this[(n + 1) & o] = t),
          (this[(n + 2) & o] = r),
          (this._length = i);
      }),
      (i.prototype.shift = function() {
        var e = this._front,
          t = this[e];
        return (
          (this[e] = void 0),
          (this._front = (e + 1) & (this._capacity - 1)),
          this._length--,
          t
        );
      }),
      (i.prototype.length = function() {
        return this._length;
      }),
      (i.prototype._checkCapacity = function(e) {
        this._capacity < e && this._resizeTo(this._capacity << 1);
      }),
      (i.prototype._resizeTo = function(e) {
        var t = this._capacity;
        (this._capacity = e),
          (function(e, t, r, i, n) {
            for (var o = 0; o < n; ++o)
              (r[o + i] = e[o + t]), (e[o + t] = void 0);
          })(this, 0, this, t, (this._front + this._length) & (t - 1));
      }),
      (e.exports = i);
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t) {
      var i = r(0),
        n = i.errorObj,
        o = i.isObject;
      var s = {}.hasOwnProperty;
      return function(r, a) {
        if (o(r)) {
          if (r instanceof e) return r;
          var p = (function(e) {
            try {
              return (function(e) {
                return e.then;
              })(e);
            } catch (e) {
              return (n.e = e), n;
            }
          })(r);
          if (p === n) {
            a && a._pushContext();
            var u = e.reject(p.e);
            return a && a._popContext(), u;
          }
          if ("function" == typeof p) {
            if (
              (function(e) {
                try {
                  return s.call(e, "_promise0");
                } catch (e) {
                  return !1;
                }
              })(r)
            ) {
              u = new e(t);
              return r._then(u._fulfill, u._reject, void 0, u, null), u;
            }
            return (function(r, o, s) {
              var a = new e(t),
                p = a;
              s && s._pushContext();
              a._captureStackTrace(), s && s._popContext();
              var u = i.tryCatch(o).call(
                r,
                function(e) {
                  if (!a) return;
                  a._resolveCallback(e), (a = null);
                },
                function(e) {
                  if (!a) return;
                  a._rejectCallback(e, !1, !0), (a = null);
                },
              );
              !1, a && u === n && (a._rejectCallback(u.e, !0, !0), (a = null));
              return p;
            })(r, p, a);
          }
        }
        return r;
      };
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n, o) {
      var s = r(0);
      s.isArray;
      function a(r) {
        var i = (this._promise = new e(t));
        r instanceof e &&
          (i._propagateFrom(r, 3), r.suppressUnhandledRejections()),
          i._setOnCancel(this),
          (this._values = r),
          (this._length = 0),
          (this._totalResolved = 0),
          this._init(void 0, -2);
      }
      return (
        s.inherits(a, o),
        (a.prototype.length = function() {
          return this._length;
        }),
        (a.prototype.promise = function() {
          return this._promise;
        }),
        (a.prototype._init = function t(r, o) {
          var a = i(this._values, this._promise);
          if (a instanceof e) {
            var p = (a = a._target())._bitField;
            if (((this._values = a), 0 == (50397184 & p)))
              return (
                this._promise._setAsyncGuaranteed(),
                a._then(t, this._reject, void 0, this, o)
              );
            if (0 == (33554432 & p))
              return 0 != (16777216 & p)
                ? this._reject(a._reason())
                : this._cancel();
            a = a._value();
          }
          if (null !== (a = s.asArray(a)))
            0 !== a.length
              ? this._iterate(a)
              : -5 === o
              ? this._resolveEmptyArray()
              : this._resolve(
                  (function(e) {
                    switch (e) {
                      case -2:
                        return [];
                      case -3:
                        return {};
                      case -6:
                        return new Map();
                    }
                  })(o),
                );
          else {
            var u = n(
              "expecting an array or an iterable object but got " +
                s.classString(a),
            ).reason();
            this._promise._rejectCallback(u, !1);
          }
        }),
        (a.prototype._iterate = function(t) {
          var r = this.getActualLength(t.length);
          (this._length = r),
            (this._values = this.shouldCopyValues()
              ? new Array(r)
              : this._values);
          for (var n = this._promise, o = !1, s = null, a = 0; a < r; ++a) {
            var p = i(t[a], n);
            (s = p instanceof e ? (p = p._target())._bitField : null),
              o
                ? null !== s && p.suppressUnhandledRejections()
                : null !== s
                ? 0 == (50397184 & s)
                  ? (p._proxy(this, a), (this._values[a] = p))
                  : (o =
                      0 != (33554432 & s)
                        ? this._promiseFulfilled(p._value(), a)
                        : 0 != (16777216 & s)
                        ? this._promiseRejected(p._reason(), a)
                        : this._promiseCancelled(a))
                : (o = this._promiseFulfilled(p, a));
          }
          o || n._setAsyncGuaranteed();
        }),
        (a.prototype._isResolved = function() {
          return null === this._values;
        }),
        (a.prototype._resolve = function(e) {
          (this._values = null), this._promise._fulfill(e);
        }),
        (a.prototype._cancel = function() {
          !this._isResolved() &&
            this._promise._isCancellable() &&
            ((this._values = null), this._promise._cancel());
        }),
        (a.prototype._reject = function(e) {
          (this._values = null), this._promise._rejectCallback(e, !1);
        }),
        (a.prototype._promiseFulfilled = function(e, t) {
          return (
            (this._values[t] = e),
            ++this._totalResolved >= this._length &&
              (this._resolve(this._values), !0)
          );
        }),
        (a.prototype._promiseCancelled = function() {
          return this._cancel(), !0;
        }),
        (a.prototype._promiseRejected = function(e) {
          return this._totalResolved++, this._reject(e), !0;
        }),
        (a.prototype._resultCancelled = function() {
          if (!this._isResolved()) {
            var t = this._values;
            if ((this._cancel(), t instanceof e)) t.cancel();
            else
              for (var r = 0; r < t.length; ++r)
                t[r] instanceof e && t[r].cancel();
          }
        }),
        (a.prototype.shouldCopyValues = function() {
          return !0;
        }),
        (a.prototype.getActualLength = function(e) {
          return e;
        }),
        a
      );
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e) {
      var t = !1,
        r = [];
      function i() {
        this._trace = new i.CapturedTrace(n());
      }
      function n() {
        var e = r.length - 1;
        if (e >= 0) return r[e];
      }
      return (
        (e.prototype._promiseCreated = function() {}),
        (e.prototype._pushContext = function() {}),
        (e.prototype._popContext = function() {
          return null;
        }),
        (e._peekContext = e.prototype._peekContext = function() {}),
        (i.prototype._pushContext = function() {
          void 0 !== this._trace &&
            ((this._trace._promiseCreated = null), r.push(this._trace));
        }),
        (i.prototype._popContext = function() {
          if (void 0 !== this._trace) {
            var e = r.pop(),
              t = e._promiseCreated;
            return (e._promiseCreated = null), t;
          }
          return null;
        }),
        (i.CapturedTrace = null),
        (i.create = function() {
          if (t) return new i();
        }),
        (i.deactivateLongStackTraces = function() {}),
        (i.activateLongStackTraces = function() {
          var r = e.prototype._pushContext,
            o = e.prototype._popContext,
            s = e._peekContext,
            a = e.prototype._peekContext,
            p = e.prototype._promiseCreated;
          (i.deactivateLongStackTraces = function() {
            (e.prototype._pushContext = r),
              (e.prototype._popContext = o),
              (e._peekContext = s),
              (e.prototype._peekContext = a),
              (e.prototype._promiseCreated = p),
              (t = !1);
          }),
            (t = !0),
            (e.prototype._pushContext = i.prototype._pushContext),
            (e.prototype._popContext = i.prototype._popContext),
            (e._peekContext = e.prototype._peekContext = n),
            (e.prototype._promiseCreated = function() {
              var e = this._peekContext();
              e && null == e._promiseCreated && (e._promiseCreated = this);
            });
        }),
        i
      );
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n) {
      var o,
        s,
        a,
        p,
        u = e._async,
        c = r(3).Warning,
        d = r(0),
        l = r(6),
        g = d.canAttachTrace,
        m = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
        h = /\((?:timers\.js):\d+:\d+\)/,
        y = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
        f = null,
        _ = null,
        b = !1,
        v = !(
          0 == d.env("BLUEBIRD_DEBUG") ||
          (!d.env("BLUEBIRD_DEBUG") && "development" !== d.env("NODE_ENV"))
        ),
        w = !(
          0 == d.env("BLUEBIRD_WARNINGS") ||
          (!v && !d.env("BLUEBIRD_WARNINGS"))
        ),
        q = !(
          0 == d.env("BLUEBIRD_LONG_STACK_TRACES") ||
          (!v && !d.env("BLUEBIRD_LONG_STACK_TRACES"))
        ),
        E =
          0 != d.env("BLUEBIRD_W_FORGOTTEN_RETURN") &&
          (w || !!d.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
      !(function() {
        var t = [];
        function r() {
          for (var e = 0; e < t.length; ++e) t[e]._notifyUnhandledRejection();
          i();
        }
        function i() {
          t.length = 0;
        }
        (p = function(e) {
          t.push(e), setTimeout(r, 1);
        }),
          l.defineProperty(e, "_unhandledRejectionCheck", { value: r }),
          l.defineProperty(e, "_unhandledRejectionClear", { value: i });
      })(),
        (e.prototype.suppressUnhandledRejections = function() {
          var e = this._target();
          e._bitField = (-1048577 & e._bitField) | 524288;
        }),
        (e.prototype._ensurePossibleRejectionHandled = function() {
          0 == (524288 & this._bitField) &&
            (this._setRejectionIsUnhandled(), p(this));
        }),
        (e.prototype._notifyUnhandledRejectionIsHandled = function() {
          W("rejectionHandled", o, void 0, this);
        }),
        (e.prototype._setReturnedNonUndefined = function() {
          this._bitField = 268435456 | this._bitField;
        }),
        (e.prototype._returnedNonUndefined = function() {
          return 0 != (268435456 & this._bitField);
        }),
        (e.prototype._notifyUnhandledRejection = function() {
          if (this._isRejectionUnhandled()) {
            var e = this._settledValue();
            this._setUnhandledRejectionIsNotified(),
              W("unhandledRejection", s, e, this);
          }
        }),
        (e.prototype._setUnhandledRejectionIsNotified = function() {
          this._bitField = 262144 | this._bitField;
        }),
        (e.prototype._unsetUnhandledRejectionIsNotified = function() {
          this._bitField = -262145 & this._bitField;
        }),
        (e.prototype._isUnhandledRejectionNotified = function() {
          return (262144 & this._bitField) > 0;
        }),
        (e.prototype._setRejectionIsUnhandled = function() {
          this._bitField = 1048576 | this._bitField;
        }),
        (e.prototype._unsetRejectionIsUnhandled = function() {
          (this._bitField = -1048577 & this._bitField),
            this._isUnhandledRejectionNotified() &&
              (this._unsetUnhandledRejectionIsNotified(),
              this._notifyUnhandledRejectionIsHandled());
        }),
        (e.prototype._isRejectionUnhandled = function() {
          return (1048576 & this._bitField) > 0;
        }),
        (e.prototype._warn = function(e, t, r) {
          return N(e, t, r || this);
        }),
        (e.onPossiblyUnhandledRejection = function(t) {
          var r = e._getContext();
          s = d.contextBind(r, t);
        }),
        (e.onUnhandledRejectionHandled = function(t) {
          var r = e._getContext();
          o = d.contextBind(r, t);
        });
      var T = function() {};
      (e.longStackTraces = function() {
        if (u.haveItemsQueued() && !te.longStackTraces)
          throw new Error(
            "cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n",
          );
        if (!te.longStackTraces && Q()) {
          var r = e.prototype._captureStackTrace,
            i = e.prototype._attachExtraTrace,
            n = e.prototype._dereferenceTrace;
          (te.longStackTraces = !0),
            (T = function() {
              if (u.haveItemsQueued() && !te.longStackTraces)
                throw new Error(
                  "cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n",
                );
              (e.prototype._captureStackTrace = r),
                (e.prototype._attachExtraTrace = i),
                (e.prototype._dereferenceTrace = n),
                t.deactivateLongStackTraces(),
                (te.longStackTraces = !1);
            }),
            (e.prototype._captureStackTrace = $),
            (e.prototype._attachExtraTrace = B),
            (e.prototype._dereferenceTrace = H),
            t.activateLongStackTraces();
        }
      }),
        (e.hasLongStackTraces = function() {
          return te.longStackTraces && Q();
        });
      var k = {
          unhandledrejection: {
            before: function() {
              var e = d.global.onunhandledrejection;
              return (d.global.onunhandledrejection = null), e;
            },
            after: function(e) {
              d.global.onunhandledrejection = e;
            },
          },
          rejectionhandled: {
            before: function() {
              var e = d.global.onrejectionhandled;
              return (d.global.onrejectionhandled = null), e;
            },
            after: function(e) {
              d.global.onrejectionhandled = e;
            },
          },
        },
        j = (function() {
          var e = function(e, t) {
            if (!e) return !d.global.dispatchEvent(t);
            var r;
            try {
              return (r = e.before()), !d.global.dispatchEvent(t);
            } finally {
              e.after(r);
            }
          };
          try {
            if ("function" == typeof CustomEvent) {
              var t = new CustomEvent("CustomEvent");
              return (
                d.global.dispatchEvent(t),
                function(t, r) {
                  t = t.toLowerCase();
                  var i = new CustomEvent(t, { detail: r, cancelable: !0 });
                  return (
                    l.defineProperty(i, "promise", { value: r.promise }),
                    l.defineProperty(i, "reason", { value: r.reason }),
                    e(k[t], i)
                  );
                }
              );
            }
            if ("function" == typeof Event) {
              t = new Event("CustomEvent");
              return (
                d.global.dispatchEvent(t),
                function(t, r) {
                  t = t.toLowerCase();
                  var i = new Event(t, { cancelable: !0 });
                  return (
                    (i.detail = r),
                    l.defineProperty(i, "promise", { value: r.promise }),
                    l.defineProperty(i, "reason", { value: r.reason }),
                    e(k[t], i)
                  );
                }
              );
            }
            return (
              (t = document.createEvent("CustomEvent")).initCustomEvent(
                "testingtheevent",
                !1,
                !0,
                {},
              ),
              d.global.dispatchEvent(t),
              function(t, r) {
                t = t.toLowerCase();
                var i = document.createEvent("CustomEvent");
                return i.initCustomEvent(t, !1, !0, r), e(k[t], i);
              }
            );
          } catch (e) {}
          return function() {
            return !1;
          };
        })(),
        P = d.isNode
          ? function() {
              return process.emit.apply(process, arguments);
            }
          : d.global
          ? function(e) {
              var t = "on" + e.toLowerCase(),
                r = d.global[t];
              return (
                !!r && (r.apply(d.global, [].slice.call(arguments, 1)), !0)
              );
            }
          : function() {
              return !1;
            };
      function C(e, t) {
        return { promise: t };
      }
      var O = {
          promiseCreated: C,
          promiseFulfilled: C,
          promiseRejected: C,
          promiseResolved: C,
          promiseCancelled: C,
          promiseChained: function(e, t, r) {
            return { promise: t, child: r };
          },
          warning: function(e, t) {
            return { warning: t };
          },
          unhandledRejection: function(e, t, r) {
            return { reason: t, promise: r };
          },
          rejectionHandled: C,
        },
        S = function(e) {
          var t = !1;
          try {
            t = P.apply(null, arguments);
          } catch (e) {
            u.throwLater(e), (t = !0);
          }
          var r = !1;
          try {
            r = j(e, O[e].apply(null, arguments));
          } catch (e) {
            u.throwLater(e), (r = !0);
          }
          return r || t;
        };
      function A() {
        return !1;
      }
      function x(e, t, r) {
        var i = this;
        try {
          e(t, r, function(e) {
            if ("function" != typeof e)
              throw new TypeError(
                "onCancel must be a function, got: " + d.toString(e),
              );
            i._attachCancellationCallback(e);
          });
        } catch (e) {
          return e;
        }
      }
      function R(e) {
        if (!this._isCancellable()) return this;
        var t = this._onCancel();
        void 0 !== t
          ? d.isArray(t)
            ? t.push(e)
            : this._setOnCancel([t, e])
          : this._setOnCancel(e);
      }
      function F() {
        return this._onCancelField;
      }
      function G(e) {
        this._onCancelField = e;
      }
      function D() {
        (this._cancellationParent = void 0), (this._onCancelField = void 0);
      }
      function L(e, t) {
        if (0 != (1 & t)) {
          this._cancellationParent = e;
          var r = e._branchesRemainingToCancel;
          void 0 === r && (r = 0), (e._branchesRemainingToCancel = r + 1);
        }
        0 != (2 & t) && e._isBound() && this._setBoundTo(e._boundTo);
      }
      (e.config = function(t) {
        if (
          ("longStackTraces" in (t = Object(t)) &&
            (t.longStackTraces
              ? e.longStackTraces()
              : !t.longStackTraces && e.hasLongStackTraces() && T()),
          "warnings" in t)
        ) {
          var r = t.warnings;
          (te.warnings = !!r),
            (E = te.warnings),
            d.isObject(r) &&
              "wForgottenReturn" in r &&
              (E = !!r.wForgottenReturn);
        }
        if ("cancellation" in t && t.cancellation && !te.cancellation) {
          if (u.haveItemsQueued())
            throw new Error(
              "cannot enable cancellation after promises are in use",
            );
          (e.prototype._clearCancellationData = D),
            (e.prototype._propagateFrom = L),
            (e.prototype._onCancel = F),
            (e.prototype._setOnCancel = G),
            (e.prototype._attachCancellationCallback = R),
            (e.prototype._execute = x),
            (U = L),
            (te.cancellation = !0);
        }
        if (
          ("monitoring" in t &&
            (t.monitoring && !te.monitoring
              ? ((te.monitoring = !0), (e.prototype._fireEvent = S))
              : !t.monitoring &&
                te.monitoring &&
                ((te.monitoring = !1), (e.prototype._fireEvent = A))),
          "asyncHooks" in t && d.nodeSupportsAsyncResource)
        ) {
          var o = te.asyncHooks,
            s = !!t.asyncHooks;
          o !== s && ((te.asyncHooks = s), s ? i() : n());
        }
        return e;
      }),
        (e.prototype._fireEvent = A),
        (e.prototype._execute = function(e, t, r) {
          try {
            e(t, r);
          } catch (e) {
            return e;
          }
        }),
        (e.prototype._onCancel = function() {}),
        (e.prototype._setOnCancel = function(e) {}),
        (e.prototype._attachCancellationCallback = function(e) {}),
        (e.prototype._captureStackTrace = function() {}),
        (e.prototype._attachExtraTrace = function() {}),
        (e.prototype._dereferenceTrace = function() {}),
        (e.prototype._clearCancellationData = function() {}),
        (e.prototype._propagateFrom = function(e, t) {});
      var U = function(e, t) {
        0 != (2 & t) && e._isBound() && this._setBoundTo(e._boundTo);
      };
      function I() {
        var t = this._boundTo;
        return void 0 !== t && t instanceof e
          ? t.isFulfilled()
            ? t.value()
            : void 0
          : t;
      }
      function $() {
        this._trace = new Z(this._peekContext());
      }
      function B(e, t) {
        if (g(e)) {
          var r = this._trace;
          if ((void 0 !== r && t && (r = r._parent), void 0 !== r))
            r.attachExtraTrace(e);
          else if (!e.__stackCleaned__) {
            var i = z(e);
            d.notEnumerableProp(
              e,
              "stack",
              i.message + "\n" + i.stack.join("\n"),
            ),
              d.notEnumerableProp(e, "__stackCleaned__", !0);
          }
        }
      }
      function H() {
        this._trace = void 0;
      }
      function N(t, r, i) {
        if (te.warnings) {
          var n,
            o = new c(t);
          if (r) i._attachExtraTrace(o);
          else if (te.longStackTraces && (n = e._peekContext()))
            n.attachExtraTrace(o);
          else {
            var s = z(o);
            o.stack = s.message + "\n" + s.stack.join("\n");
          }
          S("warning", o) || V(o, "", !0);
        }
      }
      function M(e) {
        for (var t = [], r = 0; r < e.length; ++r) {
          var i = e[r],
            n = "    (No stack trace)" === i || f.test(i),
            o = n && K(i);
          n && !o && (b && " " !== i.charAt(0) && (i = "    " + i), t.push(i));
        }
        return t;
      }
      function z(e) {
        var t = e.stack,
          r = e.toString();
        return (
          (t =
            "string" == typeof t && t.length > 0
              ? (function(e) {
                  for (
                    var t = e.stack.replace(/\s+$/g, "").split("\n"), r = 0;
                    r < t.length;
                    ++r
                  ) {
                    var i = t[r];
                    if ("    (No stack trace)" === i || f.test(i)) break;
                  }
                  return (
                    r > 0 && "SyntaxError" != e.name && (t = t.slice(r)), t
                  );
                })(e)
              : ["    (No stack trace)"]),
          { message: r, stack: "SyntaxError" == e.name ? t : M(t) }
        );
      }
      function V(e, t, r) {
        if ("undefined" != typeof console) {
          var i;
          if (d.isObject(e)) {
            var n = e.stack;
            i = t + _(n, e);
          } else i = t + String(e);
          "function" == typeof a
            ? a(i, r)
            : ("function" != typeof console.log &&
                "object" != typeof console.log) ||
              console.log(i);
        }
      }
      function W(e, t, r, i) {
        var n = !1;
        try {
          "function" == typeof t &&
            ((n = !0), "rejectionHandled" === e ? t(i) : t(r, i));
        } catch (e) {
          u.throwLater(e);
        }
        "unhandledRejection" === e
          ? S(e, r, i) || n || V(r, "Unhandled rejection ")
          : S(e, i);
      }
      function J(e) {
        var t;
        if ("function" == typeof e)
          t = "[function " + (e.name || "anonymous") + "]";
        else {
          t =
            e && "function" == typeof e.toString ? e.toString() : d.toString(e);
          if (/\[object [a-zA-Z0-9$_]+\]/.test(t))
            try {
              t = JSON.stringify(e);
            } catch (e) {}
          0 === t.length && (t = "(empty array)");
        }
        return (
          "(<" +
          (function(e) {
            if (e.length < 41) return e;
            return e.substr(0, 38) + "...";
          })(t) +
          ">, no stack trace)"
        );
      }
      function Q() {
        return "function" == typeof ee;
      }
      var K = function() {
          return !1;
        },
        X = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
      function Y(e) {
        var t = e.match(X);
        if (t) return { fileName: t[1], line: parseInt(t[2], 10) };
      }
      function Z(e) {
        (this._parent = e), (this._promisesCreated = 0);
        var t = (this._length = 1 + (void 0 === e ? 0 : e._length));
        ee(this, Z), t > 32 && this.uncycle();
      }
      d.inherits(Z, Error),
        (t.CapturedTrace = Z),
        (Z.prototype.uncycle = function() {
          var e = this._length;
          if (!(e < 2)) {
            for (var t = [], r = {}, i = 0, n = this; void 0 !== n; ++i)
              t.push(n), (n = n._parent);
            for (i = (e = this._length = i) - 1; i >= 0; --i) {
              var o = t[i].stack;
              void 0 === r[o] && (r[o] = i);
            }
            for (i = 0; i < e; ++i) {
              var s = r[t[i].stack];
              if (void 0 !== s && s !== i) {
                s > 0 && ((t[s - 1]._parent = void 0), (t[s - 1]._length = 1)),
                  (t[i]._parent = void 0),
                  (t[i]._length = 1);
                var a = i > 0 ? t[i - 1] : this;
                s < e - 1
                  ? ((a._parent = t[s + 1]),
                    a._parent.uncycle(),
                    (a._length = a._parent._length + 1))
                  : ((a._parent = void 0), (a._length = 1));
                for (var p = a._length + 1, u = i - 2; u >= 0; --u)
                  (t[u]._length = p), p++;
                return;
              }
            }
          }
        }),
        (Z.prototype.attachExtraTrace = function(e) {
          if (!e.__stackCleaned__) {
            this.uncycle();
            for (
              var t = z(e), r = t.message, i = [t.stack], n = this;
              void 0 !== n;

            )
              i.push(M(n.stack.split("\n"))), (n = n._parent);
            !(function(e) {
              for (var t = e[0], r = 1; r < e.length; ++r) {
                for (
                  var i = e[r],
                    n = t.length - 1,
                    o = t[n],
                    s = -1,
                    a = i.length - 1;
                  a >= 0;
                  --a
                )
                  if (i[a] === o) {
                    s = a;
                    break;
                  }
                for (a = s; a >= 0; --a) {
                  var p = i[a];
                  if (t[n] !== p) break;
                  t.pop(), n--;
                }
                t = i;
              }
            })(i),
              (function(e) {
                for (var t = 0; t < e.length; ++t)
                  (0 === e[t].length ||
                    (t + 1 < e.length && e[t][0] === e[t + 1][0])) &&
                    (e.splice(t, 1), t--);
              })(i),
              d.notEnumerableProp(
                e,
                "stack",
                (function(e, t) {
                  for (var r = 0; r < t.length - 1; ++r)
                    t[r].push("From previous event:"), (t[r] = t[r].join("\n"));
                  return (
                    r < t.length && (t[r] = t[r].join("\n")),
                    e + "\n" + t.join("\n")
                  );
                })(r, i),
              ),
              d.notEnumerableProp(e, "__stackCleaned__", !0);
          }
        });
      var ee = (function() {
        var e = /^\s*at\s*/,
          t = function(e, t) {
            return "string" == typeof e
              ? e
              : void 0 !== t.name && void 0 !== t.message
              ? t.toString()
              : J(t);
          };
        if (
          "number" == typeof Error.stackTraceLimit &&
          "function" == typeof Error.captureStackTrace
        ) {
          (Error.stackTraceLimit += 6), (f = e), (_ = t);
          var r = Error.captureStackTrace;
          return (
            (K = function(e) {
              return m.test(e);
            }),
            function(e, t) {
              (Error.stackTraceLimit += 6),
                r(e, t),
                (Error.stackTraceLimit -= 6);
            }
          );
        }
        var i,
          n = new Error();
        if (
          "string" == typeof n.stack &&
          n.stack.split("\n")[0].indexOf("stackDetection@") >= 0
        )
          return (
            (f = /@/),
            (_ = t),
            (b = !0),
            function(e) {
              e.stack = new Error().stack;
            }
          );
        try {
          throw new Error();
        } catch (e) {
          i = "stack" in e;
        }
        return !("stack" in n) && i && "number" == typeof Error.stackTraceLimit
          ? ((f = e),
            (_ = t),
            function(e) {
              Error.stackTraceLimit += 6;
              try {
                throw new Error();
              } catch (t) {
                e.stack = t.stack;
              }
              Error.stackTraceLimit -= 6;
            })
          : ((_ = function(e, t) {
              return "string" == typeof e
                ? e
                : ("object" != typeof t && "function" != typeof t) ||
                  void 0 === t.name ||
                  void 0 === t.message
                ? J(t)
                : t.toString();
            }),
            null);
      })();
      "undefined" != typeof console &&
        void 0 !== console.warn &&
        ((a = function(e) {
          console.warn(e);
        }),
        d.isNode && process.stderr.isTTY
          ? (a = function(e, t) {
              var r = t ? "[33m" : "[31m";
              console.warn(r + e + "[0m\n");
            })
          : d.isNode ||
            "string" != typeof new Error().stack ||
            (a = function(e, t) {
              console.warn("%c" + e, t ? "color: darkorange" : "color: red");
            }));
      var te = {
        warnings: w,
        longStackTraces: !1,
        cancellation: !1,
        monitoring: !1,
        asyncHooks: !1,
      };
      return (
        q && e.longStackTraces(),
        {
          asyncHooks: function() {
            return te.asyncHooks;
          },
          longStackTraces: function() {
            return te.longStackTraces;
          },
          warnings: function() {
            return te.warnings;
          },
          cancellation: function() {
            return te.cancellation;
          },
          monitoring: function() {
            return te.monitoring;
          },
          propagateFromFunction: function() {
            return U;
          },
          boundValueFunction: function() {
            return I;
          },
          checkForgottenReturns: function(e, t, r, i, n) {
            if (void 0 === e && null !== t && E) {
              if (void 0 !== n && n._returnedNonUndefined()) return;
              if (0 == (65535 & i._bitField)) return;
              r && (r += " ");
              var o = "",
                s = "";
              if (t._trace) {
                for (
                  var a = t._trace.stack.split("\n"),
                    p = M(a),
                    u = p.length - 1;
                  u >= 0;
                  --u
                ) {
                  var c = p[u];
                  if (!h.test(c)) {
                    var d = c.match(y);
                    d && (o = "at " + d[1] + ":" + d[2] + ":" + d[3] + " ");
                    break;
                  }
                }
                if (p.length > 0) {
                  var l = p[0];
                  for (u = 0; u < a.length; ++u)
                    if (a[u] === l) {
                      u > 0 && (s = "\n" + a[u - 1]);
                      break;
                    }
                }
              }
              var g =
                "a promise was created in a " +
                r +
                "handler " +
                o +
                "but was not returned from it, see http://goo.gl/rRqMUw" +
                s;
              i._warn(g, !0, t);
            }
          },
          setBounds: function(e, t) {
            if (Q()) {
              for (
                var r,
                  i,
                  n = (e.stack || "").split("\n"),
                  o = (t.stack || "").split("\n"),
                  s = -1,
                  a = -1,
                  p = 0;
                p < n.length;
                ++p
              ) {
                if ((u = Y(n[p]))) {
                  (r = u.fileName), (s = u.line);
                  break;
                }
              }
              for (p = 0; p < o.length; ++p) {
                var u;
                if ((u = Y(o[p]))) {
                  (i = u.fileName), (a = u.line);
                  break;
                }
              }
              s < 0 ||
                a < 0 ||
                !r ||
                !i ||
                r !== i ||
                s >= a ||
                (K = function(e) {
                  if (m.test(e)) return !0;
                  var t = Y(e);
                  return !!(
                    t &&
                    t.fileName === r &&
                    s <= t.line &&
                    t.line <= a
                  );
                });
            }
          },
          warn: N,
          deprecated: function(e, t) {
            var r =
              e + " is deprecated and will be removed in a future version.";
            return t && (r += " Use " + t + " instead."), N(r);
          },
          CapturedTrace: Z,
          fireDomEvent: j,
          fireGlobalEvent: P,
        }
      );
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i) {
      var n = r(0),
        o = e.CancellationError,
        s = n.errorObj,
        a = r(18)(i);
      function p(e, t, r) {
        (this.promise = e),
          (this.type = t),
          (this.handler = r),
          (this.called = !1),
          (this.cancelPromise = null);
      }
      function u(e) {
        this.finallyHandler = e;
      }
      function c(e, t) {
        return (
          null != e.cancelPromise &&
          (arguments.length > 1
            ? e.cancelPromise._reject(t)
            : e.cancelPromise._cancel(),
          (e.cancelPromise = null),
          !0)
        );
      }
      function d() {
        return g.call(this, this.promise._target()._settledValue());
      }
      function l(e) {
        if (!c(this, e)) return (s.e = e), s;
      }
      function g(r) {
        var n = this.promise,
          a = this.handler;
        if (!this.called) {
          this.called = !0;
          var p = this.isFinallyHandler()
            ? a.call(n._boundValue())
            : a.call(n._boundValue(), r);
          if (p === i) return p;
          if (void 0 !== p) {
            n._setReturnedNonUndefined();
            var g = t(p, n);
            if (g instanceof e) {
              if (null != this.cancelPromise) {
                if (g._isCancelled()) {
                  var m = new o("late cancellation observer");
                  return n._attachExtraTrace(m), (s.e = m), s;
                }
                g.isPending() && g._attachCancellationCallback(new u(this));
              }
              return g._then(d, l, void 0, this, void 0);
            }
          }
        }
        return n.isRejected() ? (c(this), (s.e = r), s) : (c(this), r);
      }
      return (
        (p.prototype.isFinallyHandler = function() {
          return 0 === this.type;
        }),
        (u.prototype._resultCancelled = function() {
          c(this.finallyHandler);
        }),
        (e.prototype._passThrough = function(e, t, r, i) {
          return "function" != typeof e
            ? this.then()
            : this._then(r, i, void 0, new p(this, t, e), void 0);
        }),
        (e.prototype.lastly = e.prototype.finally = function(e) {
          return this._passThrough(e, 0, g, g);
        }),
        (e.prototype.tap = function(e) {
          return this._passThrough(e, 1, g);
        }),
        (e.prototype.tapCatch = function(t) {
          var r = arguments.length;
          if (1 === r) return this._passThrough(t, 1, void 0, g);
          var i,
            o = new Array(r - 1),
            s = 0;
          for (i = 0; i < r - 1; ++i) {
            var p = arguments[i];
            if (!n.isObject(p))
              return e.reject(
                new TypeError(
                  "tapCatch statement predicate: expecting an object but got " +
                    n.classString(p),
                ),
              );
            o[s++] = p;
          }
          o.length = s;
          var u = arguments[i];
          return this._passThrough(a(o, u, this), 1, void 0, g);
        }),
        p
      );
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n, o) {
      var s = r(0),
        a = s.tryCatch;
      (e.method = function(r) {
        if ("function" != typeof r)
          throw new e.TypeError(
            "expecting a function but got " + s.classString(r),
          );
        return function() {
          var i = new e(t);
          i._captureStackTrace(), i._pushContext();
          var n = a(r).apply(this, arguments),
            s = i._popContext();
          return (
            o.checkForgottenReturns(n, s, "Promise.method", i),
            i._resolveFromSyncValue(n),
            i
          );
        };
      }),
        (e.attempt = e.try = function(r) {
          if ("function" != typeof r)
            return n("expecting a function but got " + s.classString(r));
          var i,
            p = new e(t);
          if (
            (p._captureStackTrace(), p._pushContext(), arguments.length > 1)
          ) {
            o.deprecated("calling Promise.try with more than 1 argument");
            var u = arguments[1],
              c = arguments[2];
            i = s.isArray(u) ? a(r).apply(c, u) : a(r).call(c, u);
          } else i = a(r)();
          var d = p._popContext();
          return (
            o.checkForgottenReturns(i, d, "Promise.try", p),
            p._resolveFromSyncValue(i),
            p
          );
        }),
        (e.prototype._resolveFromSyncValue = function(e) {
          e === s.errorObj
            ? this._rejectCallback(e.e, !1)
            : this._resolveCallback(e, !0);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, r, i) {
      var n = !1,
        o = function(e, t) {
          this._reject(t);
        },
        s = function(e, t) {
          (t.promiseRejectionQueued = !0),
            t.bindingPromise._then(o, o, null, this, e);
        },
        a = function(e, t) {
          0 == (50397184 & this._bitField) && this._resolveCallback(t.target);
        },
        p = function(e, t) {
          t.promiseRejectionQueued || this._reject(e);
        };
      (e.prototype.bind = function(o) {
        n ||
          ((n = !0),
          (e.prototype._propagateFrom = i.propagateFromFunction()),
          (e.prototype._boundValue = i.boundValueFunction()));
        var u = r(o),
          c = new e(t);
        c._propagateFrom(this, 1);
        var d = this._target();
        if ((c._setBoundTo(u), u instanceof e)) {
          var l = {
            promiseRejectionQueued: !1,
            promise: c,
            target: d,
            bindingPromise: u,
          };
          d._then(t, s, void 0, c, l),
            u._then(a, p, void 0, c, l),
            c._setOnCancel(u);
        } else c._resolveCallback(d);
        return c;
      }),
        (e.prototype._setBoundTo = function(e) {
          void 0 !== e
            ? ((this._bitField = 2097152 | this._bitField), (this._boundTo = e))
            : (this._bitField = -2097153 & this._bitField);
        }),
        (e.prototype._isBound = function() {
          return 2097152 == (2097152 & this._bitField);
        }),
        (e.bind = function(t, r) {
          return e.resolve(r).bind(t);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n) {
      var o = r(0),
        s = o.tryCatch,
        a = o.errorObj,
        p = e._async;
      (e.prototype.break = e.prototype.cancel = function() {
        if (!n.cancellation()) return this._warn("cancellation is disabled");
        for (var e = this, t = e; e._isCancellable(); ) {
          if (!e._cancelBy(t)) {
            t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
            break;
          }
          var r = e._cancellationParent;
          if (null == r || !r._isCancellable()) {
            e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
            break;
          }
          e._isFollowing() && e._followee().cancel(),
            e._setWillBeCancelled(),
            (t = e),
            (e = r);
        }
      }),
        (e.prototype._branchHasCancelled = function() {
          this._branchesRemainingToCancel--;
        }),
        (e.prototype._enoughBranchesHaveCancelled = function() {
          return (
            void 0 === this._branchesRemainingToCancel ||
            this._branchesRemainingToCancel <= 0
          );
        }),
        (e.prototype._cancelBy = function(e) {
          return e === this
            ? ((this._branchesRemainingToCancel = 0),
              this._invokeOnCancel(),
              !0)
            : (this._branchHasCancelled(),
              !!this._enoughBranchesHaveCancelled() &&
                (this._invokeOnCancel(), !0));
        }),
        (e.prototype._cancelBranched = function() {
          this._enoughBranchesHaveCancelled() && this._cancel();
        }),
        (e.prototype._cancel = function() {
          this._isCancellable() &&
            (this._setCancelled(),
            p.invoke(this._cancelPromises, this, void 0));
        }),
        (e.prototype._cancelPromises = function() {
          this._length() > 0 && this._settlePromises();
        }),
        (e.prototype._unsetOnCancel = function() {
          this._onCancelField = void 0;
        }),
        (e.prototype._isCancellable = function() {
          return this.isPending() && !this._isCancelled();
        }),
        (e.prototype.isCancellable = function() {
          return this.isPending() && !this.isCancelled();
        }),
        (e.prototype._doInvokeOnCancel = function(e, t) {
          if (o.isArray(e))
            for (var r = 0; r < e.length; ++r) this._doInvokeOnCancel(e[r], t);
          else if (void 0 !== e)
            if ("function" == typeof e) {
              if (!t) {
                var i = s(e).call(this._boundValue());
                i === a && (this._attachExtraTrace(i.e), p.throwLater(i.e));
              }
            } else e._resultCancelled(this);
        }),
        (e.prototype._invokeOnCancel = function() {
          var e = this._onCancel();
          this._unsetOnCancel(), p.invoke(this._doInvokeOnCancel, this, e);
        }),
        (e.prototype._invokeInternalOnCancel = function() {
          this._isCancellable() &&
            (this._doInvokeOnCancel(this._onCancel(), !0),
            this._unsetOnCancel());
        }),
        (e.prototype._resultCancelled = function() {
          this.cancel();
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e) {
      function t() {
        return this.value;
      }
      function r() {
        throw this.reason;
      }
      (e.prototype.return = e.prototype.thenReturn = function(r) {
        return (
          r instanceof e && r.suppressUnhandledRejections(),
          this._then(t, void 0, void 0, { value: r }, void 0)
        );
      }),
        (e.prototype.throw = e.prototype.thenThrow = function(e) {
          return this._then(r, void 0, void 0, { reason: e }, void 0);
        }),
        (e.prototype.catchThrow = function(e) {
          if (arguments.length <= 1)
            return this._then(void 0, r, void 0, { reason: e }, void 0);
          var t = arguments[1],
            i = function() {
              throw t;
            };
          return this.caught(e, i);
        }),
        (e.prototype.catchReturn = function(r) {
          if (arguments.length <= 1)
            return (
              r instanceof e && r.suppressUnhandledRejections(),
              this._then(void 0, t, void 0, { value: r }, void 0)
            );
          var i = arguments[1];
          i instanceof e && i.suppressUnhandledRejections();
          var n = function() {
            return i;
          };
          return this.caught(r, n);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e) {
      function t(e) {
        void 0 !== e
          ? ((e = e._target()),
            (this._bitField = e._bitField),
            (this._settledValueField = e._isFateSealed()
              ? e._settledValue()
              : void 0))
          : ((this._bitField = 0), (this._settledValueField = void 0));
      }
      t.prototype._settledValue = function() {
        return this._settledValueField;
      };
      var r = (t.prototype.value = function() {
          if (!this.isFulfilled())
            throw new TypeError(
              "cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n",
            );
          return this._settledValue();
        }),
        i = (t.prototype.error = t.prototype.reason = function() {
          if (!this.isRejected())
            throw new TypeError(
              "cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n",
            );
          return this._settledValue();
        }),
        n = (t.prototype.isFulfilled = function() {
          return 0 != (33554432 & this._bitField);
        }),
        o = (t.prototype.isRejected = function() {
          return 0 != (16777216 & this._bitField);
        }),
        s = (t.prototype.isPending = function() {
          return 0 == (50397184 & this._bitField);
        }),
        a = (t.prototype.isResolved = function() {
          return 0 != (50331648 & this._bitField);
        });
      (t.prototype.isCancelled = function() {
        return 0 != (8454144 & this._bitField);
      }),
        (e.prototype.__isCancelled = function() {
          return 65536 == (65536 & this._bitField);
        }),
        (e.prototype._isCancelled = function() {
          return this._target().__isCancelled();
        }),
        (e.prototype.isCancelled = function() {
          return 0 != (8454144 & this._target()._bitField);
        }),
        (e.prototype.isPending = function() {
          return s.call(this._target());
        }),
        (e.prototype.isRejected = function() {
          return o.call(this._target());
        }),
        (e.prototype.isFulfilled = function() {
          return n.call(this._target());
        }),
        (e.prototype.isResolved = function() {
          return a.call(this._target());
        }),
        (e.prototype.value = function() {
          return r.call(this._target());
        }),
        (e.prototype.reason = function() {
          var e = this._target();
          return e._unsetRejectionIsUnhandled(), i.call(e);
        }),
        (e.prototype._value = function() {
          return this._settledValue();
        }),
        (e.prototype._reason = function() {
          return this._unsetRejectionIsUnhandled(), this._settledValue();
        }),
        (e.PromiseInspection = t);
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n, o) {
      var s,
        a = r(0),
        p = a.canEvaluate,
        u = a.tryCatch,
        c = a.errorObj;
      if (p) {
        for (
          var d = function(e) {
              return new Function(
                "value",
                "holder",
                "                             \n            'use strict';                                                    \n            holder.pIndex = value;                                           \n            holder.checkFulfillment(this);                                   \n            ".replace(
                  /Index/g,
                  e,
                ),
              );
            },
            l = function(e) {
              return new Function(
                "promise",
                "holder",
                "                           \n            'use strict';                                                    \n            holder.pIndex = promise;                                         \n            ".replace(
                  /Index/g,
                  e,
                ),
              );
            },
            g = function(t) {
              for (var r = new Array(t), i = 0; i < r.length; ++i)
                r[i] = "this.p" + (i + 1);
              var n = r.join(" = ") + " = null;",
                s =
                  "var promise;\n" +
                  r
                    .map(function(e) {
                      return (
                        "                                                         \n                promise = " +
                        e +
                        ";                                      \n                if (promise instanceof Promise) {                            \n                    promise.cancel();                                        \n                }                                                            \n            "
                      );
                    })
                    .join("\n"),
                a = r.join(", "),
                p = "Holder$" + t,
                d =
                  "return function(tryCatch, errorObj, Promise, async) {    \n            'use strict';                                                    \n            function [TheName](fn) {                                         \n                [TheProperties]                                              \n                this.fn = fn;                                                \n                this.asyncNeeded = true;                                     \n                this.now = 0;                                                \n            }                                                                \n                                                                             \n            [TheName].prototype._callFunction = function(promise) {          \n                promise._pushContext();                                      \n                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n                promise._popContext();                                       \n                if (ret === errorObj) {                                      \n                    promise._rejectCallback(ret.e, false);                   \n                } else {                                                     \n                    promise._resolveCallback(ret);                           \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype.checkFulfillment = function(promise) {       \n                var now = ++this.now;                                        \n                if (now === [TheTotal]) {                                    \n                    if (this.asyncNeeded) {                                  \n                        async.invoke(this._callFunction, this, promise);     \n                    } else {                                                 \n                        this._callFunction(promise);                         \n                    }                                                        \n                                                                             \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype._resultCancelled = function() {              \n                [CancellationCode]                                           \n            };                                                               \n                                                                             \n            return [TheName];                                                \n        }(tryCatch, errorObj, Promise, async);                               \n        ";
              return (
                (d = d
                  .replace(/\[TheName\]/g, p)
                  .replace(/\[TheTotal\]/g, t)
                  .replace(/\[ThePassedArguments\]/g, a)
                  .replace(/\[TheProperties\]/g, n)
                  .replace(/\[CancellationCode\]/g, s)),
                new Function("tryCatch", "errorObj", "Promise", "async", d)(
                  u,
                  c,
                  e,
                  o,
                )
              );
            },
            m = [],
            h = [],
            y = [],
            f = 0;
          f < 8;
          ++f
        )
          m.push(g(f + 1)), h.push(d(f + 1)), y.push(l(f + 1));
        s = function(e) {
          this._reject(e);
        };
      }
      e.join = function() {
        var r,
          o = arguments.length - 1;
        if (
          o > 0 &&
          "function" == typeof arguments[o] &&
          ((r = arguments[o]), o <= 8 && p)
        ) {
          (q = new e(n))._captureStackTrace();
          for (var u = m[o - 1], c = new u(r), d = h, l = 0; l < o; ++l) {
            var g = i(arguments[l], q);
            if (g instanceof e) {
              var f = (g = g._target())._bitField;
              0 == (50397184 & f)
                ? (g._then(d[l], s, void 0, q, c),
                  y[l](g, c),
                  (c.asyncNeeded = !1))
                : 0 != (33554432 & f)
                ? d[l].call(q, g._value(), c)
                : 0 != (16777216 & f)
                ? q._reject(g._reason())
                : q._cancel();
            } else d[l].call(q, g, c);
          }
          if (!q._isFateSealed()) {
            if (c.asyncNeeded) {
              var _ = e._getContext();
              c.fn = a.contextBind(_, c.fn);
            }
            q._setAsyncGuaranteed(), q._setOnCancel(c);
          }
          return q;
        }
        for (var b = arguments.length, v = new Array(b), w = 0; w < b; ++w)
          v[w] = arguments[w];
        r && v.pop();
        var q = new t(v).promise();
        return void 0 !== r ? q.spread(r) : q;
      };
    };
  },
  function(e, t, r) {
    "use strict";
    var i = Object.create;
    if (i) {
      var n = i(null),
        o = i(null);
      n[" size"] = o[" size"] = 0;
    }
    e.exports = function(e) {
      var t,
        i,
        s = r(0),
        a = s.canEvaluate,
        p = s.isIdentifier,
        u = function(e) {
          return new Function(
            "ensureMethod",
            "                                    \n        return function(obj) {                                               \n            'use strict'                                                     \n            var len = this.length;                                           \n            ensureMethod(obj, 'methodName');                                 \n            switch(len) {                                                    \n                case 1: return obj.methodName(this[0]);                      \n                case 2: return obj.methodName(this[0], this[1]);             \n                case 3: return obj.methodName(this[0], this[1], this[2]);    \n                case 0: return obj.methodName();                             \n                default:                                                     \n                    return obj.methodName.apply(obj, this);                  \n            }                                                                \n        };                                                                   \n        ".replace(
              /methodName/g,
              e,
            ),
          )(l);
        },
        c = function(e) {
          return new Function(
            "obj",
            "                                             \n        'use strict';                                                        \n        return obj.propertyName;                                             \n        ".replace(
              "propertyName",
              e,
            ),
          );
        },
        d = function(e, t, r) {
          var i = r[e];
          if ("function" != typeof i) {
            if (!p(e)) return null;
            if (((i = t(e)), (r[e] = i), r[" size"]++, r[" size"] > 512)) {
              for (var n = Object.keys(r), o = 0; o < 256; ++o) delete r[n[o]];
              r[" size"] = n.length - 256;
            }
          }
          return i;
        };
      function l(t, r) {
        var i;
        if ((null != t && (i = t[r]), "function" != typeof i)) {
          var n =
            "Object " +
            s.classString(t) +
            " has no method '" +
            s.toString(r) +
            "'";
          throw new e.TypeError(n);
        }
        return i;
      }
      function g(e) {
        return l(e, this.pop()).apply(e, this);
      }
      function m(e) {
        return e[this];
      }
      function h(e) {
        var t = +this;
        return t < 0 && (t = Math.max(0, t + e.length)), e[t];
      }
      (t = function(e) {
        return d(e, u, n);
      }),
        (i = function(e) {
          return d(e, c, o);
        }),
        (e.prototype.call = function(e) {
          for (
            var r = arguments.length, i = new Array(Math.max(r - 1, 0)), n = 1;
            n < r;
            ++n
          )
            i[n - 1] = arguments[n];
          if (a) {
            var o = t(e);
            if (null !== o) return this._then(o, void 0, void 0, i, void 0);
          }
          return i.push(e), this._then(g, void 0, void 0, i, void 0);
        }),
        (e.prototype.get = function(e) {
          var t;
          if ("number" == typeof e) t = h;
          else if (a) {
            var r = i(e);
            t = null !== r ? r : m;
          } else t = m;
          return this._then(t, void 0, void 0, e, void 0);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n, o, s) {
      var a = r(3).TypeError,
        p = r(0),
        u = p.errorObj,
        c = p.tryCatch,
        d = [];
      function l(t, r, n, o) {
        if (s.cancellation()) {
          var a = new e(i),
            p = (this._finallyPromise = new e(i));
          (this._promise = a.lastly(function() {
            return p;
          })),
            a._captureStackTrace(),
            a._setOnCancel(this);
        } else {
          (this._promise = new e(i))._captureStackTrace();
        }
        (this._stack = o),
          (this._generatorFunction = t),
          (this._receiver = r),
          (this._generator = void 0),
          (this._yieldHandlers = "function" == typeof n ? [n].concat(d) : d),
          (this._yieldedPromise = null),
          (this._cancellationPhase = !1);
      }
      p.inherits(l, o),
        (l.prototype._isResolved = function() {
          return null === this._promise;
        }),
        (l.prototype._cleanup = function() {
          (this._promise = this._generator = null),
            s.cancellation() &&
              null !== this._finallyPromise &&
              (this._finallyPromise._fulfill(), (this._finallyPromise = null));
        }),
        (l.prototype._promiseCancelled = function() {
          if (!this._isResolved()) {
            var t;
            if (void 0 !== this._generator.return)
              this._promise._pushContext(),
                (t = c(this._generator.return).call(this._generator, void 0)),
                this._promise._popContext();
            else {
              var r = new e.CancellationError("generator .return() sentinel");
              (e.coroutine.returnSentinel = r),
                this._promise._attachExtraTrace(r),
                this._promise._pushContext(),
                (t = c(this._generator.throw).call(this._generator, r)),
                this._promise._popContext();
            }
            (this._cancellationPhase = !0),
              (this._yieldedPromise = null),
              this._continue(t);
          }
        }),
        (l.prototype._promiseFulfilled = function(e) {
          (this._yieldedPromise = null), this._promise._pushContext();
          var t = c(this._generator.next).call(this._generator, e);
          this._promise._popContext(), this._continue(t);
        }),
        (l.prototype._promiseRejected = function(e) {
          (this._yieldedPromise = null),
            this._promise._attachExtraTrace(e),
            this._promise._pushContext();
          var t = c(this._generator.throw).call(this._generator, e);
          this._promise._popContext(), this._continue(t);
        }),
        (l.prototype._resultCancelled = function() {
          if (this._yieldedPromise instanceof e) {
            var t = this._yieldedPromise;
            (this._yieldedPromise = null), t.cancel();
          }
        }),
        (l.prototype.promise = function() {
          return this._promise;
        }),
        (l.prototype._run = function() {
          (this._generator = this._generatorFunction.call(this._receiver)),
            (this._receiver = this._generatorFunction = void 0),
            this._promiseFulfilled(void 0);
        }),
        (l.prototype._continue = function(t) {
          var r = this._promise;
          if (t === u)
            return (
              this._cleanup(),
              this._cancellationPhase ? r.cancel() : r._rejectCallback(t.e, !1)
            );
          var i = t.value;
          if (!0 === t.done)
            return (
              this._cleanup(),
              this._cancellationPhase ? r.cancel() : r._resolveCallback(i)
            );
          var o = n(i, this._promise);
          if (
            o instanceof e ||
            null !==
              (o = (function(t, r, i) {
                for (var o = 0; o < r.length; ++o) {
                  i._pushContext();
                  var s = c(r[o])(t);
                  if ((i._popContext(), s === u)) {
                    i._pushContext();
                    var a = e.reject(u.e);
                    return i._popContext(), a;
                  }
                  var p = n(s, i);
                  if (p instanceof e) return p;
                }
                return null;
              })(o, this._yieldHandlers, this._promise))
          ) {
            var s = (o = o._target())._bitField;
            0 == (50397184 & s)
              ? ((this._yieldedPromise = o), o._proxy(this, null))
              : 0 != (33554432 & s)
              ? e._async.invoke(this._promiseFulfilled, this, o._value())
              : 0 != (16777216 & s)
              ? e._async.invoke(this._promiseRejected, this, o._reason())
              : this._promiseCancelled();
          } else
            this._promiseRejected(
              new a(
                "A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace(
                  "%s",
                  String(i),
                ) +
                  "From coroutine:\n" +
                  this._stack
                    .split("\n")
                    .slice(1, -7)
                    .join("\n"),
              ),
            );
        }),
        (e.coroutine = function(e, t) {
          if ("function" != typeof e)
            throw new a(
              "generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n",
            );
          var r = Object(t).yieldHandler,
            i = l,
            n = new Error().stack;
          return function() {
            var t = e.apply(this, arguments),
              o = new i(void 0, void 0, r, n),
              s = o.promise();
            return (o._generator = t), o._promiseFulfilled(void 0), s;
          };
        }),
        (e.coroutine.addYieldHandler = function(e) {
          if ("function" != typeof e)
            throw new a("expecting a function but got " + p.classString(e));
          d.push(e);
        }),
        (e.spawn = function(r) {
          if (
            (s.deprecated("Promise.spawn()", "Promise.coroutine()"),
            "function" != typeof r)
          )
            return t(
              "generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n",
            );
          var i = new l(r, this),
            n = i.promise();
          return i._run(e.spawn), n;
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n, o, s) {
      var a = r(0),
        p = a.tryCatch,
        u = a.errorObj,
        c = e._async;
      function d(t, r, i, n) {
        this.constructor$(t), this._promise._captureStackTrace();
        var s = e._getContext();
        if (
          ((this._callback = a.contextBind(s, r)),
          (this._preservedValues = n === o ? new Array(this.length()) : null),
          (this._limit = i),
          (this._inFlight = 0),
          (this._queue = []),
          c.invoke(this._asyncInit, this, void 0),
          a.isArray(t))
        )
          for (var p = 0; p < t.length; ++p) {
            var u = t[p];
            u instanceof e && u.suppressUnhandledRejections();
          }
      }
      function l(t, r, n, o) {
        if ("function" != typeof r)
          return i("expecting a function but got " + a.classString(r));
        var s = 0;
        if (void 0 !== n) {
          if ("object" != typeof n || null === n)
            return e.reject(
              new TypeError(
                "options argument must be an object but it is " +
                  a.classString(n),
              ),
            );
          if ("number" != typeof n.concurrency)
            return e.reject(
              new TypeError(
                "'concurrency' must be a number but it is " +
                  a.classString(n.concurrency),
              ),
            );
          s = n.concurrency;
        }
        return new d(
          t,
          r,
          (s = "number" == typeof s && isFinite(s) && s >= 1 ? s : 0),
          o,
        ).promise();
      }
      a.inherits(d, t),
        (d.prototype._asyncInit = function() {
          this._init$(void 0, -2);
        }),
        (d.prototype._init = function() {}),
        (d.prototype._promiseFulfilled = function(t, r) {
          var i = this._values,
            o = this.length(),
            a = this._preservedValues,
            c = this._limit;
          if (r < 0) {
            if (
              ((i[(r = -1 * r - 1)] = t),
              c >= 1 &&
                (this._inFlight--, this._drainQueue(), this._isResolved()))
            )
              return !0;
          } else {
            if (c >= 1 && this._inFlight >= c)
              return (i[r] = t), this._queue.push(r), !1;
            null !== a && (a[r] = t);
            var d = this._promise,
              l = this._callback,
              g = d._boundValue();
            d._pushContext();
            var m = p(l).call(g, t, r, o),
              h = d._popContext();
            if (
              (s.checkForgottenReturns(
                m,
                h,
                null !== a ? "Promise.filter" : "Promise.map",
                d,
              ),
              m === u)
            )
              return this._reject(m.e), !0;
            var y = n(m, this._promise);
            if (y instanceof e) {
              var f = (y = y._target())._bitField;
              if (0 == (50397184 & f))
                return (
                  c >= 1 && this._inFlight++,
                  (i[r] = y),
                  y._proxy(this, -1 * (r + 1)),
                  !1
                );
              if (0 == (33554432 & f))
                return 0 != (16777216 & f)
                  ? (this._reject(y._reason()), !0)
                  : (this._cancel(), !0);
              m = y._value();
            }
            i[r] = m;
          }
          return (
            ++this._totalResolved >= o &&
            (null !== a ? this._filter(i, a) : this._resolve(i), !0)
          );
        }),
        (d.prototype._drainQueue = function() {
          for (
            var e = this._queue, t = this._limit, r = this._values;
            e.length > 0 && this._inFlight < t;

          ) {
            if (this._isResolved()) return;
            var i = e.pop();
            this._promiseFulfilled(r[i], i);
          }
        }),
        (d.prototype._filter = function(e, t) {
          for (var r = t.length, i = new Array(r), n = 0, o = 0; o < r; ++o)
            e[o] && (i[n++] = t[o]);
          (i.length = n), this._resolve(i);
        }),
        (d.prototype.preservedValues = function() {
          return this._preservedValues;
        }),
        (e.prototype.map = function(e, t) {
          return l(this, e, t, null);
        }),
        (e.map = function(e, t, r, i) {
          return l(e, t, r, i);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e) {
      var t = r(0),
        i = e._async,
        n = t.tryCatch,
        o = t.errorObj;
      function s(e, r) {
        if (!t.isArray(e)) return a.call(this, e, r);
        var s = n(r).apply(this._boundValue(), [null].concat(e));
        s === o && i.throwLater(s.e);
      }
      function a(e, t) {
        var r = this._boundValue(),
          s = void 0 === e ? n(t).call(r, null) : n(t).call(r, null, e);
        s === o && i.throwLater(s.e);
      }
      function p(e, t) {
        if (!e) {
          var r = new Error(e + "");
          (r.cause = e), (e = r);
        }
        var s = n(t).call(this._boundValue(), e);
        s === o && i.throwLater(s.e);
      }
      e.prototype.asCallback = e.prototype.nodeify = function(e, t) {
        if ("function" == typeof e) {
          var r = a;
          void 0 !== t && Object(t).spread && (r = s),
            this._then(r, p, void 0, this, e);
        }
        return this;
      };
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t) {
      var i = {},
        n = r(0),
        o = r(19),
        s = n.withAppended,
        a = n.maybeWrapAsError,
        p = n.canEvaluate,
        u = r(3).TypeError,
        c = { __isPromisified__: !0 },
        d = new RegExp(
          "^(?:" +
            [
              "arity",
              "length",
              "name",
              "arguments",
              "caller",
              "callee",
              "prototype",
              "__isPromisified__",
            ].join("|") +
            ")$",
        ),
        l = function(e) {
          return (
            n.isIdentifier(e) && "_" !== e.charAt(0) && "constructor" !== e
          );
        };
      function g(e) {
        return !d.test(e);
      }
      function m(e) {
        try {
          return !0 === e.__isPromisified__;
        } catch (e) {
          return !1;
        }
      }
      function h(e, t, r) {
        var i = n.getDataPropertyOrDefault(e, t + r, c);
        return !!i && m(i);
      }
      function y(e, t, r, i) {
        for (var o = n.inheritedDataKeys(e), s = [], a = 0; a < o.length; ++a) {
          var p = o[a],
            c = e[p],
            d = i === l || l(p);
          "function" != typeof c ||
            m(c) ||
            h(e, p, t) ||
            !i(p, c, e, d) ||
            s.push(p, c);
        }
        return (
          (function(e, t, r) {
            for (var i = 0; i < e.length; i += 2) {
              var n = e[i];
              if (r.test(n))
                for (var o = n.replace(r, ""), s = 0; s < e.length; s += 2)
                  if (e[s] === o)
                    throw new u(
                      "Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace(
                        "%s",
                        t,
                      ),
                    );
            }
          })(s, t, r),
          s
        );
      }
      var f = p
        ? function(r, p, u, c, d, l) {
            var g = Math.max(
                0,
                (function(e) {
                  return "number" == typeof e.length
                    ? Math.max(Math.min(e.length, 1024), 0)
                    : 0;
                })(c) - 1,
              ),
              m = (function(e) {
                for (
                  var t = [e], r = Math.max(0, e - 1 - 3), i = e - 1;
                  i >= r;
                  --i
                )
                  t.push(i);
                for (i = e + 1; i <= 3; ++i) t.push(i);
                return t;
              })(g),
              h = "string" == typeof r || p === i;
            function y(e) {
              var t,
                r = ((t = e), n.filledRange(t, "_arg", "")).join(", "),
                i = e > 0 ? ", " : "";
              return (h
                ? "ret = callback.call(this, {{args}}, nodeback); break;\n"
                : void 0 === p
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n"
              )
                .replace("{{args}}", r)
                .replace(", ", i);
            }
            var f =
                "string" == typeof r
                  ? "this != null ? this['" + r + "'] : fn"
                  : "fn",
              _ =
                "'use strict';                                                \n        var ret = function (Parameters) {                                    \n            'use strict';                                                    \n            var len = arguments.length;                                      \n            var promise = new Promise(INTERNAL);                             \n            promise._captureStackTrace();                                    \n            var nodeback = nodebackForPromise(promise, " +
                l +
                ");   \n            var ret;                                                         \n            var callback = tryCatch([GetFunctionCode]);                      \n            switch(len) {                                                    \n                [CodeForSwitchCase]                                          \n            }                                                                \n            if (ret === errorObj) {                                          \n                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n            }                                                                \n            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n            return promise;                                                  \n        };                                                                   \n        notEnumerableProp(ret, '__isPromisified__', true);                   \n        return ret;                                                          \n    "
                  .replace(
                    "[CodeForSwitchCase]",
                    (function() {
                      for (var e = "", t = 0; t < m.length; ++t)
                        e += "case " + m[t] + ":" + y(m[t]);
                      return (e += "                                                             \n        default:                                                             \n            var args = new Array(len + 1);                                   \n            var i = 0;                                                       \n            for (var i = 0; i < len; ++i) {                                  \n               args[i] = arguments[i];                                       \n            }                                                                \n            args[i] = nodeback;                                              \n            [CodeForCall]                                                    \n            break;                                                           \n        ".replace(
                        "[CodeForCall]",
                        h
                          ? "ret = callback.apply(this, args);\n"
                          : "ret = callback.apply(receiver, args);\n",
                      ));
                    })(),
                  )
                  .replace("[GetFunctionCode]", f);
            return (
              (_ = _.replace(
                "Parameters",
                (function(e) {
                  return n.filledRange(Math.max(e, 3), "_arg", "");
                })(g),
              )),
              new Function(
                "Promise",
                "fn",
                "receiver",
                "withAppended",
                "maybeWrapAsError",
                "nodebackForPromise",
                "tryCatch",
                "errorObj",
                "notEnumerableProp",
                "INTERNAL",
                _,
              )(
                e,
                c,
                p,
                s,
                a,
                o,
                n.tryCatch,
                n.errorObj,
                n.notEnumerableProp,
                t,
              )
            );
          }
        : function(r, p, u, c, d, l) {
            var g = (function() {
                return this;
              })(),
              m = r;
            function h() {
              var n = p;
              p === i && (n = this);
              var u = new e(t);
              u._captureStackTrace();
              var c = "string" == typeof m && this !== g ? this[m] : r,
                d = o(u, l);
              try {
                c.apply(n, s(arguments, d));
              } catch (e) {
                u._rejectCallback(a(e), !0, !0);
              }
              return u._isFateSealed() || u._setAsyncGuaranteed(), u;
            }
            return (
              "string" == typeof m && (r = c),
              n.notEnumerableProp(h, "__isPromisified__", !0),
              h
            );
          };
      function _(e, t, r, o, s) {
        for (
          var a = new RegExp(t.replace(/([$])/, "\\$") + "$"),
            p = y(e, t, a, r),
            u = 0,
            c = p.length;
          u < c;
          u += 2
        ) {
          var d = p[u],
            l = p[u + 1],
            g = d + t;
          if (o === f) e[g] = f(d, i, d, l, t, s);
          else {
            var m = o(l, function() {
              return f(d, i, d, l, t, s);
            });
            n.notEnumerableProp(m, "__isPromisified__", !0), (e[g] = m);
          }
        }
        return n.toFastProperties(e), e;
      }
      (e.promisify = function(e, t) {
        if ("function" != typeof e)
          throw new u("expecting a function but got " + n.classString(e));
        if (m(e)) return e;
        var r = (function(e, t, r) {
          return f(e, t, void 0, e, null, r);
        })(
          e,
          void 0 === (t = Object(t)).context ? i : t.context,
          !!t.multiArgs,
        );
        return n.copyDescriptors(e, r, g), r;
      }),
        (e.promisifyAll = function(e, t) {
          if ("function" != typeof e && "object" != typeof e)
            throw new u(
              "the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n",
            );
          var r = !!(t = Object(t)).multiArgs,
            i = t.suffix;
          "string" != typeof i && (i = "Async");
          var o = t.filter;
          "function" != typeof o && (o = l);
          var s = t.promisifier;
          if (("function" != typeof s && (s = f), !n.isIdentifier(i)))
            throw new RangeError(
              "suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n",
            );
          for (var a = n.inheritedDataKeys(e), p = 0; p < a.length; ++p) {
            var c = e[a[p]];
            "constructor" !== a[p] &&
              n.isClass(c) &&
              (_(c.prototype, i, o, s, r), _(c, i, o, s, r));
          }
          return _(e, i, o, s, r);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n) {
      var o,
        s = r(0),
        a = s.isObject,
        p = r(6);
      "function" == typeof Map && (o = Map);
      var u = (function() {
        var e = 0,
          t = 0;
        function r(r, i) {
          (this[e] = r), (this[e + t] = i), e++;
        }
        return function(i) {
          (t = i.size), (e = 0);
          var n = new Array(2 * i.size);
          return i.forEach(r, n), n;
        };
      })();
      function c(e) {
        var t,
          r = !1;
        if (void 0 !== o && e instanceof o) (t = u(e)), (r = !0);
        else {
          var i = p.keys(e),
            n = i.length;
          t = new Array(2 * n);
          for (var s = 0; s < n; ++s) {
            var a = i[s];
            (t[s] = e[a]), (t[s + n] = a);
          }
        }
        this.constructor$(t),
          (this._isMap = r),
          this._init$(void 0, r ? -6 : -3);
      }
      function d(t) {
        var r,
          o = i(t);
        return a(o)
          ? ((r =
              o instanceof e
                ? o._then(e.props, void 0, void 0, void 0, void 0)
                : new c(o).promise()),
            o instanceof e && r._propagateFrom(o, 2),
            r)
          : n(
              "cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n",
            );
      }
      s.inherits(c, t),
        (c.prototype._init = function() {}),
        (c.prototype._promiseFulfilled = function(e, t) {
          if (((this._values[t] = e), ++this._totalResolved >= this._length)) {
            var r;
            if (this._isMap)
              r = (function(e) {
                for (
                  var t = new o(), r = (e.length / 2) | 0, i = 0;
                  i < r;
                  ++i
                ) {
                  var n = e[r + i],
                    s = e[i];
                  t.set(n, s);
                }
                return t;
              })(this._values);
            else {
              r = {};
              for (var i = this.length(), n = 0, s = this.length(); n < s; ++n)
                r[this._values[n + i]] = this._values[n];
            }
            return this._resolve(r), !0;
          }
          return !1;
        }),
        (c.prototype.shouldCopyValues = function() {
          return !1;
        }),
        (c.prototype.getActualLength = function(e) {
          return e >> 1;
        }),
        (e.prototype.props = function() {
          return d(this);
        }),
        (e.props = function(e) {
          return d(e);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n) {
      var o = r(0);
      function s(r, a) {
        var p,
          u = i(r);
        if (u instanceof e)
          return (p = u).then(function(e) {
            return s(e, p);
          });
        if (null === (r = o.asArray(r)))
          return n(
            "expecting an array or an iterable object but got " +
              o.classString(r),
          );
        var c = new e(t);
        void 0 !== a && c._propagateFrom(a, 3);
        for (
          var d = c._fulfill, l = c._reject, g = 0, m = r.length;
          g < m;
          ++g
        ) {
          var h = r[g];
          (void 0 !== h || g in r) && e.cast(h)._then(d, l, void 0, c, null);
        }
        return c;
      }
      (e.race = function(e) {
        return s(e, void 0);
      }),
        (e.prototype.race = function() {
          return s(this, void 0);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n, o, s) {
      var a = r(0),
        p = a.tryCatch;
      function u(t, r, i, n) {
        this.constructor$(t);
        var s = e._getContext();
        (this._fn = a.contextBind(s, r)),
          void 0 !== i && (i = e.resolve(i))._attachCancellationCallback(this),
          (this._initialValue = i),
          (this._currentCancellable = null),
          (this._eachValues =
            n === o ? Array(this._length) : 0 === n ? null : void 0),
          this._promise._captureStackTrace(),
          this._init$(void 0, -5);
      }
      function c(e, t) {
        this.isFulfilled() ? t._resolve(e) : t._reject(e);
      }
      function d(e, t, r, n) {
        return "function" != typeof t
          ? i("expecting a function but got " + a.classString(t))
          : new u(e, t, r, n).promise();
      }
      function l(t) {
        (this.accum = t), this.array._gotAccum(t);
        var r = n(this.value, this.array._promise);
        return r instanceof e
          ? ((this.array._currentCancellable = r),
            r._then(g, void 0, void 0, this, void 0))
          : g.call(this, r);
      }
      function g(t) {
        var r,
          i = this.array,
          n = i._promise,
          o = p(i._fn);
        n._pushContext(),
          (r =
            void 0 !== i._eachValues
              ? o.call(n._boundValue(), t, this.index, this.length)
              : o.call(
                  n._boundValue(),
                  this.accum,
                  t,
                  this.index,
                  this.length,
                )) instanceof e && (i._currentCancellable = r);
        var a = n._popContext();
        return (
          s.checkForgottenReturns(
            r,
            a,
            void 0 !== i._eachValues ? "Promise.each" : "Promise.reduce",
            n,
          ),
          r
        );
      }
      a.inherits(u, t),
        (u.prototype._gotAccum = function(e) {
          void 0 !== this._eachValues &&
            null !== this._eachValues &&
            e !== o &&
            this._eachValues.push(e);
        }),
        (u.prototype._eachComplete = function(e) {
          return (
            null !== this._eachValues && this._eachValues.push(e),
            this._eachValues
          );
        }),
        (u.prototype._init = function() {}),
        (u.prototype._resolveEmptyArray = function() {
          this._resolve(
            void 0 !== this._eachValues ? this._eachValues : this._initialValue,
          );
        }),
        (u.prototype.shouldCopyValues = function() {
          return !1;
        }),
        (u.prototype._resolve = function(e) {
          this._promise._resolveCallback(e), (this._values = null);
        }),
        (u.prototype._resultCancelled = function(t) {
          if (t === this._initialValue) return this._cancel();
          this._isResolved() ||
            (this._resultCancelled$(),
            this._currentCancellable instanceof e &&
              this._currentCancellable.cancel(),
            this._initialValue instanceof e && this._initialValue.cancel());
        }),
        (u.prototype._iterate = function(t) {
          var r, i;
          this._values = t;
          var n = t.length;
          void 0 !== this._initialValue
            ? ((r = this._initialValue), (i = 0))
            : ((r = e.resolve(t[0])), (i = 1)),
            (this._currentCancellable = r);
          for (var o = i; o < n; ++o) {
            var s = t[o];
            s instanceof e && s.suppressUnhandledRejections();
          }
          if (!r.isRejected())
            for (; i < n; ++i) {
              var a = {
                accum: null,
                value: t[i],
                index: i,
                length: n,
                array: this,
              };
              (r = r._then(l, void 0, void 0, a, void 0)),
                0 == (127 & i) && r._setNoAsyncGuarantee();
            }
          void 0 !== this._eachValues &&
            (r = r._then(this._eachComplete, void 0, void 0, this, void 0)),
            r._then(c, c, void 0, r, this);
        }),
        (e.prototype.reduce = function(e, t) {
          return d(this, e, t, null);
        }),
        (e.reduce = function(e, t, r, i) {
          return d(e, t, r, i);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i) {
      var n = e.PromiseInspection;
      function o(e) {
        this.constructor$(e);
      }
      r(0).inherits(o, t),
        (o.prototype._promiseResolved = function(e, t) {
          return (
            (this._values[e] = t),
            ++this._totalResolved >= this._length &&
              (this._resolve(this._values), !0)
          );
        }),
        (o.prototype._promiseFulfilled = function(e, t) {
          var r = new n();
          return (
            (r._bitField = 33554432),
            (r._settledValueField = e),
            this._promiseResolved(t, r)
          );
        }),
        (o.prototype._promiseRejected = function(e, t) {
          var r = new n();
          return (
            (r._bitField = 16777216),
            (r._settledValueField = e),
            this._promiseResolved(t, r)
          );
        }),
        (e.settle = function(e) {
          return i.deprecated(".settle()", ".reflect()"), new o(e).promise();
        }),
        (e.allSettled = function(e) {
          return new o(e).promise();
        }),
        (e.prototype.settle = function() {
          return e.settle(this);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i) {
      var n = r(0),
        o = r(3).RangeError,
        s = r(3).AggregateError,
        a = n.isArray,
        p = {};
      function u(e) {
        this.constructor$(e),
          (this._howMany = 0),
          (this._unwrap = !1),
          (this._initialized = !1);
      }
      function c(e, t) {
        if ((0 | t) !== t || t < 0)
          return i(
            "expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n",
          );
        var r = new u(e),
          n = r.promise();
        return r.setHowMany(t), r.init(), n;
      }
      n.inherits(u, t),
        (u.prototype._init = function() {
          if (this._initialized)
            if (0 !== this._howMany) {
              this._init$(void 0, -5);
              var e = a(this._values);
              !this._isResolved() &&
                e &&
                this._howMany > this._canPossiblyFulfill() &&
                this._reject(this._getRangeError(this.length()));
            } else this._resolve([]);
        }),
        (u.prototype.init = function() {
          (this._initialized = !0), this._init();
        }),
        (u.prototype.setUnwrap = function() {
          this._unwrap = !0;
        }),
        (u.prototype.howMany = function() {
          return this._howMany;
        }),
        (u.prototype.setHowMany = function(e) {
          this._howMany = e;
        }),
        (u.prototype._promiseFulfilled = function(e) {
          return (
            this._addFulfilled(e),
            this._fulfilled() === this.howMany() &&
              ((this._values.length = this.howMany()),
              1 === this.howMany() && this._unwrap
                ? this._resolve(this._values[0])
                : this._resolve(this._values),
              !0)
          );
        }),
        (u.prototype._promiseRejected = function(e) {
          return this._addRejected(e), this._checkOutcome();
        }),
        (u.prototype._promiseCancelled = function() {
          return this._values instanceof e || null == this._values
            ? this._cancel()
            : (this._addRejected(p), this._checkOutcome());
        }),
        (u.prototype._checkOutcome = function() {
          if (this.howMany() > this._canPossiblyFulfill()) {
            for (
              var e = new s(), t = this.length();
              t < this._values.length;
              ++t
            )
              this._values[t] !== p && e.push(this._values[t]);
            return e.length > 0 ? this._reject(e) : this._cancel(), !0;
          }
          return !1;
        }),
        (u.prototype._fulfilled = function() {
          return this._totalResolved;
        }),
        (u.prototype._rejected = function() {
          return this._values.length - this.length();
        }),
        (u.prototype._addRejected = function(e) {
          this._values.push(e);
        }),
        (u.prototype._addFulfilled = function(e) {
          this._values[this._totalResolved++] = e;
        }),
        (u.prototype._canPossiblyFulfill = function() {
          return this.length() - this._rejected();
        }),
        (u.prototype._getRangeError = function(e) {
          var t =
            "Input array must contain at least " +
            this._howMany +
            " items but contains only " +
            e +
            " items";
          return new o(t);
        }),
        (u.prototype._resolveEmptyArray = function() {
          this._reject(this._getRangeError(0));
        }),
        (e.some = function(e, t) {
          return c(e, t);
        }),
        (e.prototype.some = function(e) {
          return c(this, e);
        }),
        (e._SomePromiseArray = u);
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i) {
      var n = r(0),
        o = e.TimeoutError;
      function s(e) {
        this.handle = e;
      }
      s.prototype._resultCancelled = function() {
        clearTimeout(this.handle);
      };
      var a = function(e) {
          return p(+this).thenReturn(e);
        },
        p = (e.delay = function(r, n) {
          var o, p;
          return (
            void 0 !== n
              ? ((o = e.resolve(n)._then(a, null, null, r, void 0)),
                i.cancellation() && n instanceof e && o._setOnCancel(n))
              : ((o = new e(t)),
                (p = setTimeout(function() {
                  o._fulfill();
                }, +r)),
                i.cancellation() && o._setOnCancel(new s(p)),
                o._captureStackTrace()),
            o._setAsyncGuaranteed(),
            o
          );
        });
      e.prototype.delay = function(e) {
        return p(e, this);
      };
      function u(e) {
        return clearTimeout(this.handle), e;
      }
      function c(e) {
        throw (clearTimeout(this.handle), e);
      }
      e.prototype.timeout = function(e, t) {
        var r, a;
        e = +e;
        var p = new s(
          setTimeout(function() {
            r.isPending() &&
              (function(e, t, r) {
                var i;
                (i =
                  "string" != typeof t
                    ? t instanceof Error
                      ? t
                      : new o("operation timed out")
                    : new o(t)),
                  n.markAsOriginatingFromRejection(i),
                  e._attachExtraTrace(i),
                  e._reject(i),
                  null != r && r.cancel();
              })(r, t, a);
          }, e),
        );
        return (
          i.cancellation()
            ? ((a = this.then()),
              (r = a._then(u, c, void 0, p, void 0))._setOnCancel(p))
            : (r = this._then(u, c, void 0, p, void 0)),
          r
        );
      };
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t, i, n, o, s) {
      var a = r(0),
        p = r(3).TypeError,
        u = r(0).inherits,
        c = a.errorObj,
        d = a.tryCatch,
        l = {};
      function g(e) {
        setTimeout(function() {
          throw e;
        }, 0);
      }
      function m(t, r) {
        var n = 0,
          s = t.length,
          a = new e(o);
        return (
          (function o() {
            if (n >= s) return a._fulfill();
            var p = (function(e) {
              var t = i(e);
              return (
                t !== e &&
                  "function" == typeof e._isDisposable &&
                  "function" == typeof e._getDisposer &&
                  e._isDisposable() &&
                  t._setDisposable(e._getDisposer()),
                t
              );
            })(t[n++]);
            if (p instanceof e && p._isDisposable()) {
              try {
                p = i(p._getDisposer().tryDispose(r), t.promise);
              } catch (e) {
                return g(e);
              }
              if (p instanceof e) return p._then(o, g, null, null, null);
            }
            o();
          })(),
          a
        );
      }
      function h(e, t, r) {
        (this._data = e), (this._promise = t), (this._context = r);
      }
      function y(e, t, r) {
        this.constructor$(e, t, r);
      }
      function f(e) {
        return h.isDisposer(e)
          ? (this.resources[this.index]._setDisposable(e), e.promise())
          : e;
      }
      function _(e) {
        (this.length = e), (this.promise = null), (this[e - 1] = null);
      }
      (h.prototype.data = function() {
        return this._data;
      }),
        (h.prototype.promise = function() {
          return this._promise;
        }),
        (h.prototype.resource = function() {
          return this.promise().isFulfilled() ? this.promise().value() : l;
        }),
        (h.prototype.tryDispose = function(e) {
          var t = this.resource(),
            r = this._context;
          void 0 !== r && r._pushContext();
          var i = t !== l ? this.doDispose(t, e) : null;
          return (
            void 0 !== r && r._popContext(),
            this._promise._unsetDisposable(),
            (this._data = null),
            i
          );
        }),
        (h.isDisposer = function(e) {
          return (
            null != e &&
            "function" == typeof e.resource &&
            "function" == typeof e.tryDispose
          );
        }),
        u(y, h),
        (y.prototype.doDispose = function(e, t) {
          return this.data().call(e, e, t);
        }),
        (_.prototype._resultCancelled = function() {
          for (var t = this.length, r = 0; r < t; ++r) {
            var i = this[r];
            i instanceof e && i.cancel();
          }
        }),
        (e.using = function() {
          var r = arguments.length;
          if (r < 2)
            return t("you must pass at least 2 arguments to Promise.using");
          var n,
            o = arguments[r - 1];
          if ("function" != typeof o)
            return t("expecting a function but got " + a.classString(o));
          var p = !0;
          2 === r && Array.isArray(arguments[0])
            ? ((r = (n = arguments[0]).length), (p = !1))
            : ((n = arguments), r--);
          for (var u = new _(r), l = 0; l < r; ++l) {
            var g = n[l];
            if (h.isDisposer(g)) {
              var y = g;
              (g = g.promise())._setDisposable(y);
            } else {
              var b = i(g);
              b instanceof e &&
                (g = b._then(
                  f,
                  null,
                  null,
                  { resources: u, index: l },
                  void 0,
                ));
            }
            u[l] = g;
          }
          var v = new Array(u.length);
          for (l = 0; l < v.length; ++l) v[l] = e.resolve(u[l]).reflect();
          var w = e.all(v).then(function(e) {
              for (var t = 0; t < e.length; ++t) {
                var r = e[t];
                if (r.isRejected()) return (c.e = r.error()), c;
                if (!r.isFulfilled()) return void w.cancel();
                e[t] = r.value();
              }
              q._pushContext(), (o = d(o));
              var i = p ? o.apply(void 0, e) : o(e),
                n = q._popContext();
              return s.checkForgottenReturns(i, n, "Promise.using", q), i;
            }),
            q = w.lastly(function() {
              var t = new e.PromiseInspection(w);
              return m(u, t);
            });
          return (u.promise = q), q._setOnCancel(u), q;
        }),
        (e.prototype._setDisposable = function(e) {
          (this._bitField = 131072 | this._bitField), (this._disposer = e);
        }),
        (e.prototype._isDisposable = function() {
          return (131072 & this._bitField) > 0;
        }),
        (e.prototype._getDisposer = function() {
          return this._disposer;
        }),
        (e.prototype._unsetDisposable = function() {
          (this._bitField = -131073 & this._bitField),
            (this._disposer = void 0);
        }),
        (e.prototype.disposer = function(e) {
          if ("function" == typeof e) return new y(e, this, n());
          throw new p();
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e) {
      var t = e._SomePromiseArray;
      function r(e) {
        var r = new t(e),
          i = r.promise();
        return r.setHowMany(1), r.setUnwrap(), r.init(), i;
      }
      (e.any = function(e) {
        return r(e);
      }),
        (e.prototype.any = function() {
          return r(this);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t) {
      var r = e.reduce,
        i = e.all;
      function n() {
        return i(this);
      }
      (e.prototype.each = function(e) {
        return r(this, e, t, 0)._then(n, void 0, void 0, this, void 0);
      }),
        (e.prototype.mapSeries = function(e) {
          return r(this, e, t, t);
        }),
        (e.each = function(e, i) {
          return r(e, i, t, 0)._then(n, void 0, void 0, e, void 0);
        }),
        (e.mapSeries = function(e, i) {
          return r(e, i, t, t);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t) {
      var r = e.map;
      (e.prototype.filter = function(e, i) {
        return r(this, e, i, t);
      }),
        (e.filter = function(e, i, n) {
          return r(e, i, n, t);
        });
    };
  },
  function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = r(30),
      n = r(20);
    class o extends Error {
      constructor(e, t) {
        super(t.data.errors[0].message),
          Object.assign(this, t.data),
          (this.name = "GraphqlError"),
          (this.request = e),
          Error.captureStackTrace &&
            Error.captureStackTrace(this, this.constructor);
      }
    }
    const s = ["method", "baseUrl", "url", "headers", "request", "query"];
    function a(e, t) {
      const r = e.defaults(t);
      return Object.assign(
        (e, t) =>
          (function(e, t, r) {
            r = r = "string" == typeof t ? Object.assign({ query: t }, r) : t;
            const i = Object.keys(r).reduce(
              (e, t) =>
                s.includes(t)
                  ? ((e[t] = r[t]), e)
                  : (e.variables || (e.variables = {}),
                    (e.variables[t] = r[t]),
                    e),
              {},
            );
            return e(i).then(e => {
              if (e.data.errors) throw new o(i, { data: e.data });
              return e.data.data;
            });
          })(r, e, t),
        { defaults: a.bind(null, r), endpoint: i.request.endpoint },
      );
    }
    const p = a(i.request, {
      headers: { "user-agent": `octokit-graphql.js/4.3.1 ${n.getUserAgent()}` },
      method: "POST",
      url: "/graphql",
    });
    (t.graphql = p),
      (t.withCustomRequest = function(e) {
        return a(e, { method: "POST", url: "/graphql" });
      });
  },
  function(e, t) {
    e.exports = function e(t, r) {
      if (t && r) return e(t)(r);
      if ("function" != typeof t) throw new TypeError("need wrapper function");
      return (
        Object.keys(t).forEach(function(e) {
          i[e] = t[e];
        }),
        i
      );
      function i() {
        for (var e = new Array(arguments.length), r = 0; r < e.length; r++)
          e[r] = arguments[r];
        var i = t.apply(this, e),
          n = e[e.length - 1];
        return (
          "function" == typeof i &&
            i !== n &&
            Object.keys(n).forEach(function(e) {
              i[e] = n[e];
            }),
          i
        );
      }
    };
  },
  function(e, t, r) {
    const { requestLog: i } = r(68),
      { restEndpointMethods: n } = r(69),
      o = r(70),
      s = [r(79), r(85), i, r(90), n, r(92), r(96)],
      a = o.plugin(s);
    const p = Object.assign(
      function(e) {
        return (
          (e && e.log && e.log.warn ? e.log.warn : console.warn)(
            '[@octokit/rest] `const Octokit = require("@octokit/rest")` is deprecated. Use `const { Octokit } = require("@octokit/rest")` instead',
          ),
          new a(e)
        );
      },
      { Octokit: a },
    );
    Object.keys(a).forEach(e => {
      a.hasOwnProperty(e) && (p[e] = a[e]);
    }),
      (e.exports = p);
  },
  function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "requestLog", function() {
        return i;
      });
    function i(e) {
      e.hook.wrap("request", (t, r) => {
        e.log.debug("request", r);
        const i = Date.now(),
          n = e.request.endpoint.parse(r),
          o = n.url.replace(r.baseUrl, "");
        return t(r)
          .then(
            t => (
              e.log.info(
                `${n.method} ${o} - ${t.status} in ${Date.now() - i}ms`,
              ),
              t
            ),
          )
          .catch(t => {
            throw (e.log.info(
              `${n.method} ${o} - ${t.status} in ${Date.now() - i}ms`,
            ),
            t);
          });
      });
    }
    i.VERSION = "1.0.0";
  },
  function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "restEndpointMethods", function() {
        return a;
      });
    var i = r(1),
      n = {
        actions: {
          cancelWorkflowRun: {
            method: "POST",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              run_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runs/:run_id/cancel",
          },
          createOrUpdateSecretForRepo: {
            method: "PUT",
            params: {
              encrypted_value: { type: "string" },
              key_id: { type: "string" },
              name: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/secrets/:name",
          },
          createRegistrationToken: {
            method: "POST",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/runners/registration-token",
          },
          createRemoveToken: {
            method: "POST",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/runners/remove-token",
          },
          deleteArtifact: {
            method: "DELETE",
            params: {
              artifact_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/artifacts/:artifact_id",
          },
          deleteSecretFromRepo: {
            method: "DELETE",
            params: {
              name: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/secrets/:name",
          },
          downloadArtifact: {
            method: "GET",
            params: {
              archive_format: { required: !0, type: "string" },
              artifact_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/actions/artifacts/:artifact_id/:archive_format",
          },
          getArtifact: {
            method: "GET",
            params: {
              artifact_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/artifacts/:artifact_id",
          },
          getPublicKey: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/secrets/public-key",
          },
          getSecret: {
            method: "GET",
            params: {
              name: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/secrets/:name",
          },
          getSelfHostedRunner: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              runner_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runners/:runner_id",
          },
          getWorkflow: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              workflow_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/workflows/:workflow_id",
          },
          getWorkflowJob: {
            method: "GET",
            params: {
              job_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/jobs/:job_id",
          },
          getWorkflowRun: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              run_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runs/:run_id",
          },
          listDownloadsForSelfHostedRunnerApplication: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/runners/downloads",
          },
          listJobsForWorkflowRun: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              run_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runs/:run_id/jobs",
          },
          listRepoWorkflowRuns: {
            method: "GET",
            params: {
              actor: { type: "string" },
              branch: { type: "string" },
              event: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              status: {
                enum: ["completed", "status", "conclusion"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/actions/runs",
          },
          listRepoWorkflows: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/workflows",
          },
          listSecretsForRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/secrets",
          },
          listSelfHostedRunnersForRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/runners",
          },
          listWorkflowJobLogs: {
            method: "GET",
            params: {
              job_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/actions/jobs/:job_id/logs",
          },
          listWorkflowRunArtifacts: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              run_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runs/:run_id/artifacts",
          },
          listWorkflowRunLogs: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              run_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runs/:run_id/logs",
          },
          listWorkflowRuns: {
            method: "GET",
            params: {
              actor: { type: "string" },
              branch: { type: "string" },
              event: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              status: {
                enum: ["completed", "status", "conclusion"],
                type: "string",
              },
              workflow_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/workflows/:workflow_id/runs",
          },
          reRunWorkflow: {
            method: "POST",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              run_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runs/:run_id/rerun",
          },
          removeSelfHostedRunner: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              runner_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/actions/runners/:runner_id",
          },
        },
        activity: {
          checkStarringRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/user/starred/:owner/:repo",
          },
          deleteRepoSubscription: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/subscription",
          },
          deleteThreadSubscription: {
            method: "DELETE",
            params: { thread_id: { required: !0, type: "integer" } },
            url: "/notifications/threads/:thread_id/subscription",
          },
          getRepoSubscription: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/subscription",
          },
          getThread: {
            method: "GET",
            params: { thread_id: { required: !0, type: "integer" } },
            url: "/notifications/threads/:thread_id",
          },
          getThreadSubscription: {
            method: "GET",
            params: { thread_id: { required: !0, type: "integer" } },
            url: "/notifications/threads/:thread_id/subscription",
          },
          listEventsForOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/events/orgs/:org",
          },
          listEventsForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/events",
          },
          listFeeds: { method: "GET", params: {}, url: "/feeds" },
          listNotifications: {
            method: "GET",
            params: {
              all: { type: "boolean" },
              before: { type: "string" },
              page: { type: "integer" },
              participating: { type: "boolean" },
              per_page: { type: "integer" },
              since: { type: "string" },
            },
            url: "/notifications",
          },
          listNotificationsForRepo: {
            method: "GET",
            params: {
              all: { type: "boolean" },
              before: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              participating: { type: "boolean" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              since: { type: "string" },
            },
            url: "/repos/:owner/:repo/notifications",
          },
          listPublicEvents: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/events",
          },
          listPublicEventsForOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/events",
          },
          listPublicEventsForRepoNetwork: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/networks/:owner/:repo/events",
          },
          listPublicEventsForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/events/public",
          },
          listReceivedEventsForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/received_events",
          },
          listReceivedPublicEventsForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/received_events/public",
          },
          listRepoEvents: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/events",
          },
          listReposStarredByAuthenticatedUser: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              sort: { enum: ["created", "updated"], type: "string" },
            },
            url: "/user/starred",
          },
          listReposStarredByUser: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              sort: { enum: ["created", "updated"], type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/starred",
          },
          listReposWatchedByUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/subscriptions",
          },
          listStargazersForRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/stargazers",
          },
          listWatchedReposForAuthenticatedUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/subscriptions",
          },
          listWatchersForRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/subscribers",
          },
          markAsRead: {
            method: "PUT",
            params: { last_read_at: { type: "string" } },
            url: "/notifications",
          },
          markNotificationsAsReadForRepo: {
            method: "PUT",
            params: {
              last_read_at: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/notifications",
          },
          markThreadAsRead: {
            method: "PATCH",
            params: { thread_id: { required: !0, type: "integer" } },
            url: "/notifications/threads/:thread_id",
          },
          setRepoSubscription: {
            method: "PUT",
            params: {
              ignored: { type: "boolean" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              subscribed: { type: "boolean" },
            },
            url: "/repos/:owner/:repo/subscription",
          },
          setThreadSubscription: {
            method: "PUT",
            params: {
              ignored: { type: "boolean" },
              thread_id: { required: !0, type: "integer" },
            },
            url: "/notifications/threads/:thread_id/subscription",
          },
          starRepo: {
            method: "PUT",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/user/starred/:owner/:repo",
          },
          unstarRepo: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/user/starred/:owner/:repo",
          },
        },
        apps: {
          addRepoToInstallation: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "PUT",
            params: {
              installation_id: { required: !0, type: "integer" },
              repository_id: { required: !0, type: "integer" },
            },
            url:
              "/user/installations/:installation_id/repositories/:repository_id",
          },
          checkAccountIsAssociatedWithAny: {
            method: "GET",
            params: { account_id: { required: !0, type: "integer" } },
            url: "/marketplace_listing/accounts/:account_id",
          },
          checkAccountIsAssociatedWithAnyStubbed: {
            method: "GET",
            params: { account_id: { required: !0, type: "integer" } },
            url: "/marketplace_listing/stubbed/accounts/:account_id",
          },
          checkAuthorization: {
            deprecated:
              "octokit.apps.checkAuthorization() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#check-an-authorization",
            method: "GET",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/tokens/:access_token",
          },
          checkToken: {
            headers: {
              accept: "application/vnd.github.doctor-strange-preview+json",
            },
            method: "POST",
            params: {
              access_token: { type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/token",
          },
          createContentAttachment: {
            headers: { accept: "application/vnd.github.corsair-preview+json" },
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              content_reference_id: { required: !0, type: "integer" },
              title: { required: !0, type: "string" },
            },
            url: "/content_references/:content_reference_id/attachments",
          },
          createFromManifest: {
            headers: { accept: "application/vnd.github.fury-preview+json" },
            method: "POST",
            params: { code: { required: !0, type: "string" } },
            url: "/app-manifests/:code/conversions",
          },
          createInstallationToken: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "POST",
            params: {
              installation_id: { required: !0, type: "integer" },
              permissions: { type: "object" },
              repository_ids: { type: "integer[]" },
            },
            url: "/app/installations/:installation_id/access_tokens",
          },
          deleteAuthorization: {
            headers: {
              accept: "application/vnd.github.doctor-strange-preview+json",
            },
            method: "DELETE",
            params: {
              access_token: { type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/grant",
          },
          deleteInstallation: {
            headers: {
              accept:
                "application/vnd.github.gambit-preview+json,application/vnd.github.machine-man-preview+json",
            },
            method: "DELETE",
            params: { installation_id: { required: !0, type: "integer" } },
            url: "/app/installations/:installation_id",
          },
          deleteToken: {
            headers: {
              accept: "application/vnd.github.doctor-strange-preview+json",
            },
            method: "DELETE",
            params: {
              access_token: { type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/token",
          },
          findOrgInstallation: {
            deprecated:
              "octokit.apps.findOrgInstallation() has been renamed to octokit.apps.getOrgInstallation() (2019-04-10)",
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: { org: { required: !0, type: "string" } },
            url: "/orgs/:org/installation",
          },
          findRepoInstallation: {
            deprecated:
              "octokit.apps.findRepoInstallation() has been renamed to octokit.apps.getRepoInstallation() (2019-04-10)",
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/installation",
          },
          findUserInstallation: {
            deprecated:
              "octokit.apps.findUserInstallation() has been renamed to octokit.apps.getUserInstallation() (2019-04-10)",
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: { username: { required: !0, type: "string" } },
            url: "/users/:username/installation",
          },
          getAuthenticated: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {},
            url: "/app",
          },
          getBySlug: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: { app_slug: { required: !0, type: "string" } },
            url: "/apps/:app_slug",
          },
          getInstallation: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: { installation_id: { required: !0, type: "integer" } },
            url: "/app/installations/:installation_id",
          },
          getOrgInstallation: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: { org: { required: !0, type: "string" } },
            url: "/orgs/:org/installation",
          },
          getRepoInstallation: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/installation",
          },
          getUserInstallation: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: { username: { required: !0, type: "string" } },
            url: "/users/:username/installation",
          },
          listAccountsUserOrOrgOnPlan: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              plan_id: { required: !0, type: "integer" },
              sort: { enum: ["created", "updated"], type: "string" },
            },
            url: "/marketplace_listing/plans/:plan_id/accounts",
          },
          listAccountsUserOrOrgOnPlanStubbed: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              plan_id: { required: !0, type: "integer" },
              sort: { enum: ["created", "updated"], type: "string" },
            },
            url: "/marketplace_listing/stubbed/plans/:plan_id/accounts",
          },
          listInstallationReposForAuthenticatedUser: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {
              installation_id: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/installations/:installation_id/repositories",
          },
          listInstallations: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/app/installations",
          },
          listInstallationsForAuthenticatedUser: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/installations",
          },
          listMarketplacePurchasesForAuthenticatedUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/marketplace_purchases",
          },
          listMarketplacePurchasesForAuthenticatedUserStubbed: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/marketplace_purchases/stubbed",
          },
          listPlans: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/marketplace_listing/plans",
          },
          listPlansStubbed: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/marketplace_listing/stubbed/plans",
          },
          listRepos: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/installation/repositories",
          },
          removeRepoFromInstallation: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "DELETE",
            params: {
              installation_id: { required: !0, type: "integer" },
              repository_id: { required: !0, type: "integer" },
            },
            url:
              "/user/installations/:installation_id/repositories/:repository_id",
          },
          resetAuthorization: {
            deprecated:
              "octokit.apps.resetAuthorization() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#reset-an-authorization",
            method: "POST",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/tokens/:access_token",
          },
          resetToken: {
            headers: {
              accept: "application/vnd.github.doctor-strange-preview+json",
            },
            method: "PATCH",
            params: {
              access_token: { type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/token",
          },
          revokeAuthorizationForApplication: {
            deprecated:
              "octokit.apps.revokeAuthorizationForApplication() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#revoke-an-authorization-for-an-application",
            method: "DELETE",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/tokens/:access_token",
          },
          revokeGrantForApplication: {
            deprecated:
              "octokit.apps.revokeGrantForApplication() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#revoke-a-grant-for-an-application",
            method: "DELETE",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/grants/:access_token",
          },
          revokeInstallationToken: {
            headers: { accept: "application/vnd.github.gambit-preview+json" },
            method: "DELETE",
            params: {},
            url: "/installation/token",
          },
        },
        checks: {
          create: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "POST",
            params: {
              actions: { type: "object[]" },
              "actions[].description": { required: !0, type: "string" },
              "actions[].identifier": { required: !0, type: "string" },
              "actions[].label": { required: !0, type: "string" },
              completed_at: { type: "string" },
              conclusion: {
                enum: [
                  "success",
                  "failure",
                  "neutral",
                  "cancelled",
                  "timed_out",
                  "action_required",
                ],
                type: "string",
              },
              details_url: { type: "string" },
              external_id: { type: "string" },
              head_sha: { required: !0, type: "string" },
              name: { required: !0, type: "string" },
              output: { type: "object" },
              "output.annotations": { type: "object[]" },
              "output.annotations[].annotation_level": {
                enum: ["notice", "warning", "failure"],
                required: !0,
                type: "string",
              },
              "output.annotations[].end_column": { type: "integer" },
              "output.annotations[].end_line": {
                required: !0,
                type: "integer",
              },
              "output.annotations[].message": { required: !0, type: "string" },
              "output.annotations[].path": { required: !0, type: "string" },
              "output.annotations[].raw_details": { type: "string" },
              "output.annotations[].start_column": { type: "integer" },
              "output.annotations[].start_line": {
                required: !0,
                type: "integer",
              },
              "output.annotations[].title": { type: "string" },
              "output.images": { type: "object[]" },
              "output.images[].alt": { required: !0, type: "string" },
              "output.images[].caption": { type: "string" },
              "output.images[].image_url": { required: !0, type: "string" },
              "output.summary": { required: !0, type: "string" },
              "output.text": { type: "string" },
              "output.title": { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              started_at: { type: "string" },
              status: {
                enum: ["queued", "in_progress", "completed"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/check-runs",
          },
          createSuite: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "POST",
            params: {
              head_sha: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/check-suites",
          },
          get: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "GET",
            params: {
              check_run_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/check-runs/:check_run_id",
          },
          getSuite: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "GET",
            params: {
              check_suite_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/check-suites/:check_suite_id",
          },
          listAnnotations: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "GET",
            params: {
              check_run_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/check-runs/:check_run_id/annotations",
          },
          listForRef: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "GET",
            params: {
              check_name: { type: "string" },
              filter: { enum: ["latest", "all"], type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              status: {
                enum: ["queued", "in_progress", "completed"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/commits/:ref/check-runs",
          },
          listForSuite: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "GET",
            params: {
              check_name: { type: "string" },
              check_suite_id: { required: !0, type: "integer" },
              filter: { enum: ["latest", "all"], type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              status: {
                enum: ["queued", "in_progress", "completed"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/check-suites/:check_suite_id/check-runs",
          },
          listSuitesForRef: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "GET",
            params: {
              app_id: { type: "integer" },
              check_name: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:ref/check-suites",
          },
          rerequestSuite: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "POST",
            params: {
              check_suite_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/check-suites/:check_suite_id/rerequest",
          },
          setSuitesPreferences: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "PATCH",
            params: {
              auto_trigger_checks: { type: "object[]" },
              "auto_trigger_checks[].app_id": { required: !0, type: "integer" },
              "auto_trigger_checks[].setting": {
                required: !0,
                type: "boolean",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/check-suites/preferences",
          },
          update: {
            headers: { accept: "application/vnd.github.antiope-preview+json" },
            method: "PATCH",
            params: {
              actions: { type: "object[]" },
              "actions[].description": { required: !0, type: "string" },
              "actions[].identifier": { required: !0, type: "string" },
              "actions[].label": { required: !0, type: "string" },
              check_run_id: { required: !0, type: "integer" },
              completed_at: { type: "string" },
              conclusion: {
                enum: [
                  "success",
                  "failure",
                  "neutral",
                  "cancelled",
                  "timed_out",
                  "action_required",
                ],
                type: "string",
              },
              details_url: { type: "string" },
              external_id: { type: "string" },
              name: { type: "string" },
              output: { type: "object" },
              "output.annotations": { type: "object[]" },
              "output.annotations[].annotation_level": {
                enum: ["notice", "warning", "failure"],
                required: !0,
                type: "string",
              },
              "output.annotations[].end_column": { type: "integer" },
              "output.annotations[].end_line": {
                required: !0,
                type: "integer",
              },
              "output.annotations[].message": { required: !0, type: "string" },
              "output.annotations[].path": { required: !0, type: "string" },
              "output.annotations[].raw_details": { type: "string" },
              "output.annotations[].start_column": { type: "integer" },
              "output.annotations[].start_line": {
                required: !0,
                type: "integer",
              },
              "output.annotations[].title": { type: "string" },
              "output.images": { type: "object[]" },
              "output.images[].alt": { required: !0, type: "string" },
              "output.images[].caption": { type: "string" },
              "output.images[].image_url": { required: !0, type: "string" },
              "output.summary": { required: !0, type: "string" },
              "output.text": { type: "string" },
              "output.title": { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              started_at: { type: "string" },
              status: {
                enum: ["queued", "in_progress", "completed"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/check-runs/:check_run_id",
          },
        },
        codesOfConduct: {
          getConductCode: {
            headers: {
              accept: "application/vnd.github.scarlet-witch-preview+json",
            },
            method: "GET",
            params: { key: { required: !0, type: "string" } },
            url: "/codes_of_conduct/:key",
          },
          getForRepo: {
            headers: {
              accept: "application/vnd.github.scarlet-witch-preview+json",
            },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/community/code_of_conduct",
          },
          listConductCodes: {
            headers: {
              accept: "application/vnd.github.scarlet-witch-preview+json",
            },
            method: "GET",
            params: {},
            url: "/codes_of_conduct",
          },
        },
        emojis: { get: { method: "GET", params: {}, url: "/emojis" } },
        gists: {
          checkIsStarred: {
            method: "GET",
            params: { gist_id: { required: !0, type: "string" } },
            url: "/gists/:gist_id/star",
          },
          create: {
            method: "POST",
            params: {
              description: { type: "string" },
              files: { required: !0, type: "object" },
              "files.content": { type: "string" },
              public: { type: "boolean" },
            },
            url: "/gists",
          },
          createComment: {
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              gist_id: { required: !0, type: "string" },
            },
            url: "/gists/:gist_id/comments",
          },
          delete: {
            method: "DELETE",
            params: { gist_id: { required: !0, type: "string" } },
            url: "/gists/:gist_id",
          },
          deleteComment: {
            method: "DELETE",
            params: {
              comment_id: { required: !0, type: "integer" },
              gist_id: { required: !0, type: "string" },
            },
            url: "/gists/:gist_id/comments/:comment_id",
          },
          fork: {
            method: "POST",
            params: { gist_id: { required: !0, type: "string" } },
            url: "/gists/:gist_id/forks",
          },
          get: {
            method: "GET",
            params: { gist_id: { required: !0, type: "string" } },
            url: "/gists/:gist_id",
          },
          getComment: {
            method: "GET",
            params: {
              comment_id: { required: !0, type: "integer" },
              gist_id: { required: !0, type: "string" },
            },
            url: "/gists/:gist_id/comments/:comment_id",
          },
          getRevision: {
            method: "GET",
            params: {
              gist_id: { required: !0, type: "string" },
              sha: { required: !0, type: "string" },
            },
            url: "/gists/:gist_id/:sha",
          },
          list: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
            },
            url: "/gists",
          },
          listComments: {
            method: "GET",
            params: {
              gist_id: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/gists/:gist_id/comments",
          },
          listCommits: {
            method: "GET",
            params: {
              gist_id: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/gists/:gist_id/commits",
          },
          listForks: {
            method: "GET",
            params: {
              gist_id: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/gists/:gist_id/forks",
          },
          listPublic: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
            },
            url: "/gists/public",
          },
          listPublicForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/gists",
          },
          listStarred: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
            },
            url: "/gists/starred",
          },
          star: {
            method: "PUT",
            params: { gist_id: { required: !0, type: "string" } },
            url: "/gists/:gist_id/star",
          },
          unstar: {
            method: "DELETE",
            params: { gist_id: { required: !0, type: "string" } },
            url: "/gists/:gist_id/star",
          },
          update: {
            method: "PATCH",
            params: {
              description: { type: "string" },
              files: { type: "object" },
              "files.content": { type: "string" },
              "files.filename": { type: "string" },
              gist_id: { required: !0, type: "string" },
            },
            url: "/gists/:gist_id",
          },
          updateComment: {
            method: "PATCH",
            params: {
              body: { required: !0, type: "string" },
              comment_id: { required: !0, type: "integer" },
              gist_id: { required: !0, type: "string" },
            },
            url: "/gists/:gist_id/comments/:comment_id",
          },
        },
        git: {
          createBlob: {
            method: "POST",
            params: {
              content: { required: !0, type: "string" },
              encoding: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/blobs",
          },
          createCommit: {
            method: "POST",
            params: {
              author: { type: "object" },
              "author.date": { type: "string" },
              "author.email": { type: "string" },
              "author.name": { type: "string" },
              committer: { type: "object" },
              "committer.date": { type: "string" },
              "committer.email": { type: "string" },
              "committer.name": { type: "string" },
              message: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              parents: { required: !0, type: "string[]" },
              repo: { required: !0, type: "string" },
              signature: { type: "string" },
              tree: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/commits",
          },
          createRef: {
            method: "POST",
            params: {
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/refs",
          },
          createTag: {
            method: "POST",
            params: {
              message: { required: !0, type: "string" },
              object: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              tag: { required: !0, type: "string" },
              tagger: { type: "object" },
              "tagger.date": { type: "string" },
              "tagger.email": { type: "string" },
              "tagger.name": { type: "string" },
              type: {
                enum: ["commit", "tree", "blob"],
                required: !0,
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/git/tags",
          },
          createTree: {
            method: "POST",
            params: {
              base_tree: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              tree: { required: !0, type: "object[]" },
              "tree[].content": { type: "string" },
              "tree[].mode": {
                enum: ["100644", "100755", "040000", "160000", "120000"],
                type: "string",
              },
              "tree[].path": { type: "string" },
              "tree[].sha": { allowNull: !0, type: "string" },
              "tree[].type": {
                enum: ["blob", "tree", "commit"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/git/trees",
          },
          deleteRef: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/refs/:ref",
          },
          getBlob: {
            method: "GET",
            params: {
              file_sha: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/blobs/:file_sha",
          },
          getCommit: {
            method: "GET",
            params: {
              commit_sha: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/commits/:commit_sha",
          },
          getRef: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/ref/:ref",
          },
          getTag: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              tag_sha: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/tags/:tag_sha",
          },
          getTree: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              recursive: { enum: ["1"], type: "integer" },
              repo: { required: !0, type: "string" },
              tree_sha: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/trees/:tree_sha",
          },
          listMatchingRefs: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/matching-refs/:ref",
          },
          listRefs: {
            method: "GET",
            params: {
              namespace: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/refs/:namespace",
          },
          updateRef: {
            method: "PATCH",
            params: {
              force: { type: "boolean" },
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/git/refs/:ref",
          },
        },
        gitignore: {
          getTemplate: {
            method: "GET",
            params: { name: { required: !0, type: "string" } },
            url: "/gitignore/templates/:name",
          },
          listTemplates: {
            method: "GET",
            params: {},
            url: "/gitignore/templates",
          },
        },
        interactions: {
          addOrUpdateRestrictionsForOrg: {
            headers: { accept: "application/vnd.github.sombra-preview+json" },
            method: "PUT",
            params: {
              limit: {
                enum: [
                  "existing_users",
                  "contributors_only",
                  "collaborators_only",
                ],
                required: !0,
                type: "string",
              },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/interaction-limits",
          },
          addOrUpdateRestrictionsForRepo: {
            headers: { accept: "application/vnd.github.sombra-preview+json" },
            method: "PUT",
            params: {
              limit: {
                enum: [
                  "existing_users",
                  "contributors_only",
                  "collaborators_only",
                ],
                required: !0,
                type: "string",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/interaction-limits",
          },
          getRestrictionsForOrg: {
            headers: { accept: "application/vnd.github.sombra-preview+json" },
            method: "GET",
            params: { org: { required: !0, type: "string" } },
            url: "/orgs/:org/interaction-limits",
          },
          getRestrictionsForRepo: {
            headers: { accept: "application/vnd.github.sombra-preview+json" },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/interaction-limits",
          },
          removeRestrictionsForOrg: {
            headers: { accept: "application/vnd.github.sombra-preview+json" },
            method: "DELETE",
            params: { org: { required: !0, type: "string" } },
            url: "/orgs/:org/interaction-limits",
          },
          removeRestrictionsForRepo: {
            headers: { accept: "application/vnd.github.sombra-preview+json" },
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/interaction-limits",
          },
        },
        issues: {
          addAssignees: {
            method: "POST",
            params: {
              assignees: { type: "string[]" },
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/assignees",
          },
          addLabels: {
            method: "POST",
            params: {
              issue_number: { required: !0, type: "integer" },
              labels: { required: !0, type: "string[]" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/labels",
          },
          checkAssignee: {
            method: "GET",
            params: {
              assignee: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/assignees/:assignee",
          },
          create: {
            method: "POST",
            params: {
              assignee: { type: "string" },
              assignees: { type: "string[]" },
              body: { type: "string" },
              labels: { type: "string[]" },
              milestone: { type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              title: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues",
          },
          createComment: {
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/comments",
          },
          createLabel: {
            method: "POST",
            params: {
              color: { required: !0, type: "string" },
              description: { type: "string" },
              name: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/labels",
          },
          createMilestone: {
            method: "POST",
            params: {
              description: { type: "string" },
              due_on: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              state: { enum: ["open", "closed"], type: "string" },
              title: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/milestones",
          },
          deleteComment: {
            method: "DELETE",
            params: {
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/comments/:comment_id",
          },
          deleteLabel: {
            method: "DELETE",
            params: {
              name: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/labels/:name",
          },
          deleteMilestone: {
            method: "DELETE",
            params: {
              milestone_number: { required: !0, type: "integer" },
              number: {
                alias: "milestone_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/milestones/:milestone_number",
          },
          get: {
            method: "GET",
            params: {
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number",
          },
          getComment: {
            method: "GET",
            params: {
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/comments/:comment_id",
          },
          getEvent: {
            method: "GET",
            params: {
              event_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/events/:event_id",
          },
          getLabel: {
            method: "GET",
            params: {
              name: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/labels/:name",
          },
          getMilestone: {
            method: "GET",
            params: {
              milestone_number: { required: !0, type: "integer" },
              number: {
                alias: "milestone_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/milestones/:milestone_number",
          },
          list: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              filter: {
                enum: ["assigned", "created", "mentioned", "subscribed", "all"],
                type: "string",
              },
              labels: { type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
              sort: {
                enum: ["created", "updated", "comments"],
                type: "string",
              },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/issues",
          },
          listAssignees: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/assignees",
          },
          listComments: {
            method: "GET",
            params: {
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              since: { type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/comments",
          },
          listCommentsForRepo: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              since: { type: "string" },
              sort: { enum: ["created", "updated"], type: "string" },
            },
            url: "/repos/:owner/:repo/issues/comments",
          },
          listEvents: {
            method: "GET",
            params: {
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/events",
          },
          listEventsForRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/events",
          },
          listEventsForTimeline: {
            headers: {
              accept: "application/vnd.github.mockingbird-preview+json",
            },
            method: "GET",
            params: {
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/timeline",
          },
          listForAuthenticatedUser: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              filter: {
                enum: ["assigned", "created", "mentioned", "subscribed", "all"],
                type: "string",
              },
              labels: { type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
              sort: {
                enum: ["created", "updated", "comments"],
                type: "string",
              },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/user/issues",
          },
          listForOrg: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              filter: {
                enum: ["assigned", "created", "mentioned", "subscribed", "all"],
                type: "string",
              },
              labels: { type: "string" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
              sort: {
                enum: ["created", "updated", "comments"],
                type: "string",
              },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/orgs/:org/issues",
          },
          listForRepo: {
            method: "GET",
            params: {
              assignee: { type: "string" },
              creator: { type: "string" },
              direction: { enum: ["asc", "desc"], type: "string" },
              labels: { type: "string" },
              mentioned: { type: "string" },
              milestone: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              since: { type: "string" },
              sort: {
                enum: ["created", "updated", "comments"],
                type: "string",
              },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/repos/:owner/:repo/issues",
          },
          listLabelsForMilestone: {
            method: "GET",
            params: {
              milestone_number: { required: !0, type: "integer" },
              number: {
                alias: "milestone_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/milestones/:milestone_number/labels",
          },
          listLabelsForRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/labels",
          },
          listLabelsOnIssue: {
            method: "GET",
            params: {
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/labels",
          },
          listMilestonesForRepo: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              sort: { enum: ["due_on", "completeness"], type: "string" },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/repos/:owner/:repo/milestones",
          },
          lock: {
            method: "PUT",
            params: {
              issue_number: { required: !0, type: "integer" },
              lock_reason: {
                enum: ["off-topic", "too heated", "resolved", "spam"],
                type: "string",
              },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/lock",
          },
          removeAssignees: {
            method: "DELETE",
            params: {
              assignees: { type: "string[]" },
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/assignees",
          },
          removeLabel: {
            method: "DELETE",
            params: {
              issue_number: { required: !0, type: "integer" },
              name: { required: !0, type: "string" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/labels/:name",
          },
          removeLabels: {
            method: "DELETE",
            params: {
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/labels",
          },
          replaceLabels: {
            method: "PUT",
            params: {
              issue_number: { required: !0, type: "integer" },
              labels: { type: "string[]" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/labels",
          },
          unlock: {
            method: "DELETE",
            params: {
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/lock",
          },
          update: {
            method: "PATCH",
            params: {
              assignee: { type: "string" },
              assignees: { type: "string[]" },
              body: { type: "string" },
              issue_number: { required: !0, type: "integer" },
              labels: { type: "string[]" },
              milestone: { allowNull: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              state: { enum: ["open", "closed"], type: "string" },
              title: { type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number",
          },
          updateComment: {
            method: "PATCH",
            params: {
              body: { required: !0, type: "string" },
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/comments/:comment_id",
          },
          updateLabel: {
            method: "PATCH",
            params: {
              color: { type: "string" },
              current_name: { required: !0, type: "string" },
              description: { type: "string" },
              name: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/labels/:current_name",
          },
          updateMilestone: {
            method: "PATCH",
            params: {
              description: { type: "string" },
              due_on: { type: "string" },
              milestone_number: { required: !0, type: "integer" },
              number: {
                alias: "milestone_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              state: { enum: ["open", "closed"], type: "string" },
              title: { type: "string" },
            },
            url: "/repos/:owner/:repo/milestones/:milestone_number",
          },
        },
        licenses: {
          get: {
            method: "GET",
            params: { license: { required: !0, type: "string" } },
            url: "/licenses/:license",
          },
          getForRepo: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/license",
          },
          list: {
            deprecated:
              "octokit.licenses.list() has been renamed to octokit.licenses.listCommonlyUsed() (2019-03-05)",
            method: "GET",
            params: {},
            url: "/licenses",
          },
          listCommonlyUsed: { method: "GET", params: {}, url: "/licenses" },
        },
        markdown: {
          render: {
            method: "POST",
            params: {
              context: { type: "string" },
              mode: { enum: ["markdown", "gfm"], type: "string" },
              text: { required: !0, type: "string" },
            },
            url: "/markdown",
          },
          renderRaw: {
            headers: { "content-type": "text/plain; charset=utf-8" },
            method: "POST",
            params: { data: { mapTo: "data", required: !0, type: "string" } },
            url: "/markdown/raw",
          },
        },
        meta: { get: { method: "GET", params: {}, url: "/meta" } },
        migrations: {
          cancelImport: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/import",
          },
          deleteArchiveForAuthenticatedUser: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "DELETE",
            params: { migration_id: { required: !0, type: "integer" } },
            url: "/user/migrations/:migration_id/archive",
          },
          deleteArchiveForOrg: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "DELETE",
            params: {
              migration_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/migrations/:migration_id/archive",
          },
          downloadArchiveForOrg: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: {
              migration_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/migrations/:migration_id/archive",
          },
          getArchiveForAuthenticatedUser: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: { migration_id: { required: !0, type: "integer" } },
            url: "/user/migrations/:migration_id/archive",
          },
          getArchiveForOrg: {
            deprecated:
              "octokit.migrations.getArchiveForOrg() has been renamed to octokit.migrations.downloadArchiveForOrg() (2020-01-27)",
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: {
              migration_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/migrations/:migration_id/archive",
          },
          getCommitAuthors: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              since: { type: "string" },
            },
            url: "/repos/:owner/:repo/import/authors",
          },
          getImportProgress: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/import",
          },
          getLargeFiles: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/import/large_files",
          },
          getStatusForAuthenticatedUser: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: { migration_id: { required: !0, type: "integer" } },
            url: "/user/migrations/:migration_id",
          },
          getStatusForOrg: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: {
              migration_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/migrations/:migration_id",
          },
          listForAuthenticatedUser: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/migrations",
          },
          listForOrg: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/migrations",
          },
          listReposForOrg: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: {
              migration_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/migrations/:migration_id/repositories",
          },
          listReposForUser: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "GET",
            params: {
              migration_id: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/:migration_id/repositories",
          },
          mapCommitAuthor: {
            method: "PATCH",
            params: {
              author_id: { required: !0, type: "integer" },
              email: { type: "string" },
              name: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/import/authors/:author_id",
          },
          setLfsPreference: {
            method: "PATCH",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              use_lfs: {
                enum: ["opt_in", "opt_out"],
                required: !0,
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/import/lfs",
          },
          startForAuthenticatedUser: {
            method: "POST",
            params: {
              exclude_attachments: { type: "boolean" },
              lock_repositories: { type: "boolean" },
              repositories: { required: !0, type: "string[]" },
            },
            url: "/user/migrations",
          },
          startForOrg: {
            method: "POST",
            params: {
              exclude_attachments: { type: "boolean" },
              lock_repositories: { type: "boolean" },
              org: { required: !0, type: "string" },
              repositories: { required: !0, type: "string[]" },
            },
            url: "/orgs/:org/migrations",
          },
          startImport: {
            method: "PUT",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              tfvc_project: { type: "string" },
              vcs: {
                enum: ["subversion", "git", "mercurial", "tfvc"],
                type: "string",
              },
              vcs_password: { type: "string" },
              vcs_url: { required: !0, type: "string" },
              vcs_username: { type: "string" },
            },
            url: "/repos/:owner/:repo/import",
          },
          unlockRepoForAuthenticatedUser: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "DELETE",
            params: {
              migration_id: { required: !0, type: "integer" },
              repo_name: { required: !0, type: "string" },
            },
            url: "/user/migrations/:migration_id/repos/:repo_name/lock",
          },
          unlockRepoForOrg: {
            headers: {
              accept: "application/vnd.github.wyandotte-preview+json",
            },
            method: "DELETE",
            params: {
              migration_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              repo_name: { required: !0, type: "string" },
            },
            url: "/orgs/:org/migrations/:migration_id/repos/:repo_name/lock",
          },
          updateImport: {
            method: "PATCH",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              vcs_password: { type: "string" },
              vcs_username: { type: "string" },
            },
            url: "/repos/:owner/:repo/import",
          },
        },
        oauthAuthorizations: {
          checkAuthorization: {
            deprecated:
              "octokit.oauthAuthorizations.checkAuthorization() has been renamed to octokit.apps.checkAuthorization() (2019-11-05)",
            method: "GET",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/tokens/:access_token",
          },
          createAuthorization: {
            deprecated:
              "octokit.oauthAuthorizations.createAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization",
            method: "POST",
            params: {
              client_id: { type: "string" },
              client_secret: { type: "string" },
              fingerprint: { type: "string" },
              note: { required: !0, type: "string" },
              note_url: { type: "string" },
              scopes: { type: "string[]" },
            },
            url: "/authorizations",
          },
          deleteAuthorization: {
            deprecated:
              "octokit.oauthAuthorizations.deleteAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-an-authorization",
            method: "DELETE",
            params: { authorization_id: { required: !0, type: "integer" } },
            url: "/authorizations/:authorization_id",
          },
          deleteGrant: {
            deprecated:
              "octokit.oauthAuthorizations.deleteGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-a-grant",
            method: "DELETE",
            params: { grant_id: { required: !0, type: "integer" } },
            url: "/applications/grants/:grant_id",
          },
          getAuthorization: {
            deprecated:
              "octokit.oauthAuthorizations.getAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-authorization",
            method: "GET",
            params: { authorization_id: { required: !0, type: "integer" } },
            url: "/authorizations/:authorization_id",
          },
          getGrant: {
            deprecated:
              "octokit.oauthAuthorizations.getGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-grant",
            method: "GET",
            params: { grant_id: { required: !0, type: "integer" } },
            url: "/applications/grants/:grant_id",
          },
          getOrCreateAuthorizationForApp: {
            deprecated:
              "octokit.oauthAuthorizations.getOrCreateAuthorizationForApp() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app",
            method: "PUT",
            params: {
              client_id: { required: !0, type: "string" },
              client_secret: { required: !0, type: "string" },
              fingerprint: { type: "string" },
              note: { type: "string" },
              note_url: { type: "string" },
              scopes: { type: "string[]" },
            },
            url: "/authorizations/clients/:client_id",
          },
          getOrCreateAuthorizationForAppAndFingerprint: {
            deprecated:
              "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app-and-fingerprint",
            method: "PUT",
            params: {
              client_id: { required: !0, type: "string" },
              client_secret: { required: !0, type: "string" },
              fingerprint: { required: !0, type: "string" },
              note: { type: "string" },
              note_url: { type: "string" },
              scopes: { type: "string[]" },
            },
            url: "/authorizations/clients/:client_id/:fingerprint",
          },
          getOrCreateAuthorizationForAppFingerprint: {
            deprecated:
              "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppFingerprint() has been renamed to octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() (2018-12-27)",
            method: "PUT",
            params: {
              client_id: { required: !0, type: "string" },
              client_secret: { required: !0, type: "string" },
              fingerprint: { required: !0, type: "string" },
              note: { type: "string" },
              note_url: { type: "string" },
              scopes: { type: "string[]" },
            },
            url: "/authorizations/clients/:client_id/:fingerprint",
          },
          listAuthorizations: {
            deprecated:
              "octokit.oauthAuthorizations.listAuthorizations() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-authorizations",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/authorizations",
          },
          listGrants: {
            deprecated:
              "octokit.oauthAuthorizations.listGrants() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-grants",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/applications/grants",
          },
          resetAuthorization: {
            deprecated:
              "octokit.oauthAuthorizations.resetAuthorization() has been renamed to octokit.apps.resetAuthorization() (2019-11-05)",
            method: "POST",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/tokens/:access_token",
          },
          revokeAuthorizationForApplication: {
            deprecated:
              "octokit.oauthAuthorizations.revokeAuthorizationForApplication() has been renamed to octokit.apps.revokeAuthorizationForApplication() (2019-11-05)",
            method: "DELETE",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/tokens/:access_token",
          },
          revokeGrantForApplication: {
            deprecated:
              "octokit.oauthAuthorizations.revokeGrantForApplication() has been renamed to octokit.apps.revokeGrantForApplication() (2019-11-05)",
            method: "DELETE",
            params: {
              access_token: { required: !0, type: "string" },
              client_id: { required: !0, type: "string" },
            },
            url: "/applications/:client_id/grants/:access_token",
          },
          updateAuthorization: {
            deprecated:
              "octokit.oauthAuthorizations.updateAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#update-an-existing-authorization",
            method: "PATCH",
            params: {
              add_scopes: { type: "string[]" },
              authorization_id: { required: !0, type: "integer" },
              fingerprint: { type: "string" },
              note: { type: "string" },
              note_url: { type: "string" },
              remove_scopes: { type: "string[]" },
              scopes: { type: "string[]" },
            },
            url: "/authorizations/:authorization_id",
          },
        },
        orgs: {
          addOrUpdateMembership: {
            method: "PUT",
            params: {
              org: { required: !0, type: "string" },
              role: { enum: ["admin", "member"], type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/memberships/:username",
          },
          blockUser: {
            method: "PUT",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/blocks/:username",
          },
          checkBlockedUser: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/blocks/:username",
          },
          checkMembership: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/members/:username",
          },
          checkPublicMembership: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/public_members/:username",
          },
          concealMembership: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/public_members/:username",
          },
          convertMemberToOutsideCollaborator: {
            method: "PUT",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/outside_collaborators/:username",
          },
          createHook: {
            method: "POST",
            params: {
              active: { type: "boolean" },
              config: { required: !0, type: "object" },
              "config.content_type": { type: "string" },
              "config.insecure_ssl": { type: "string" },
              "config.secret": { type: "string" },
              "config.url": { required: !0, type: "string" },
              events: { type: "string[]" },
              name: { required: !0, type: "string" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/hooks",
          },
          createInvitation: {
            method: "POST",
            params: {
              email: { type: "string" },
              invitee_id: { type: "integer" },
              org: { required: !0, type: "string" },
              role: {
                enum: ["admin", "direct_member", "billing_manager"],
                type: "string",
              },
              team_ids: { type: "integer[]" },
            },
            url: "/orgs/:org/invitations",
          },
          deleteHook: {
            method: "DELETE",
            params: {
              hook_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/hooks/:hook_id",
          },
          get: {
            method: "GET",
            params: { org: { required: !0, type: "string" } },
            url: "/orgs/:org",
          },
          getHook: {
            method: "GET",
            params: {
              hook_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/hooks/:hook_id",
          },
          getMembership: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/memberships/:username",
          },
          getMembershipForAuthenticatedUser: {
            method: "GET",
            params: { org: { required: !0, type: "string" } },
            url: "/user/memberships/orgs/:org",
          },
          list: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "integer" },
            },
            url: "/organizations",
          },
          listBlockedUsers: {
            method: "GET",
            params: { org: { required: !0, type: "string" } },
            url: "/orgs/:org/blocks",
          },
          listForAuthenticatedUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/orgs",
          },
          listForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/orgs",
          },
          listHooks: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/hooks",
          },
          listInstallations: {
            headers: {
              accept: "application/vnd.github.machine-man-preview+json",
            },
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/installations",
          },
          listInvitationTeams: {
            method: "GET",
            params: {
              invitation_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/invitations/:invitation_id/teams",
          },
          listMembers: {
            method: "GET",
            params: {
              filter: { enum: ["2fa_disabled", "all"], type: "string" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              role: { enum: ["all", "admin", "member"], type: "string" },
            },
            url: "/orgs/:org/members",
          },
          listMemberships: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              state: { enum: ["active", "pending"], type: "string" },
            },
            url: "/user/memberships/orgs",
          },
          listOutsideCollaborators: {
            method: "GET",
            params: {
              filter: { enum: ["2fa_disabled", "all"], type: "string" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/outside_collaborators",
          },
          listPendingInvitations: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/invitations",
          },
          listPublicMembers: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/public_members",
          },
          pingHook: {
            method: "POST",
            params: {
              hook_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/hooks/:hook_id/pings",
          },
          publicizeMembership: {
            method: "PUT",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/public_members/:username",
          },
          removeMember: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/members/:username",
          },
          removeMembership: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/memberships/:username",
          },
          removeOutsideCollaborator: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/outside_collaborators/:username",
          },
          unblockUser: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/blocks/:username",
          },
          update: {
            method: "PATCH",
            params: {
              billing_email: { type: "string" },
              company: { type: "string" },
              default_repository_permission: {
                enum: ["read", "write", "admin", "none"],
                type: "string",
              },
              description: { type: "string" },
              email: { type: "string" },
              has_organization_projects: { type: "boolean" },
              has_repository_projects: { type: "boolean" },
              location: { type: "string" },
              members_allowed_repository_creation_type: {
                enum: ["all", "private", "none"],
                type: "string",
              },
              members_can_create_internal_repositories: { type: "boolean" },
              members_can_create_private_repositories: { type: "boolean" },
              members_can_create_public_repositories: { type: "boolean" },
              members_can_create_repositories: { type: "boolean" },
              name: { type: "string" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org",
          },
          updateHook: {
            method: "PATCH",
            params: {
              active: { type: "boolean" },
              config: { type: "object" },
              "config.content_type": { type: "string" },
              "config.insecure_ssl": { type: "string" },
              "config.secret": { type: "string" },
              "config.url": { required: !0, type: "string" },
              events: { type: "string[]" },
              hook_id: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/hooks/:hook_id",
          },
          updateMembership: {
            method: "PATCH",
            params: {
              org: { required: !0, type: "string" },
              state: { enum: ["active"], required: !0, type: "string" },
            },
            url: "/user/memberships/orgs/:org",
          },
        },
        projects: {
          addCollaborator: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "PUT",
            params: {
              permission: { enum: ["read", "write", "admin"], type: "string" },
              project_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/projects/:project_id/collaborators/:username",
          },
          createCard: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "POST",
            params: {
              column_id: { required: !0, type: "integer" },
              content_id: { type: "integer" },
              content_type: { type: "string" },
              note: { type: "string" },
            },
            url: "/projects/columns/:column_id/cards",
          },
          createColumn: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "POST",
            params: {
              name: { required: !0, type: "string" },
              project_id: { required: !0, type: "integer" },
            },
            url: "/projects/:project_id/columns",
          },
          createForAuthenticatedUser: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "POST",
            params: {
              body: { type: "string" },
              name: { required: !0, type: "string" },
            },
            url: "/user/projects",
          },
          createForOrg: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "POST",
            params: {
              body: { type: "string" },
              name: { required: !0, type: "string" },
              org: { required: !0, type: "string" },
            },
            url: "/orgs/:org/projects",
          },
          createForRepo: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "POST",
            params: {
              body: { type: "string" },
              name: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/projects",
          },
          delete: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "DELETE",
            params: { project_id: { required: !0, type: "integer" } },
            url: "/projects/:project_id",
          },
          deleteCard: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "DELETE",
            params: { card_id: { required: !0, type: "integer" } },
            url: "/projects/columns/cards/:card_id",
          },
          deleteColumn: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "DELETE",
            params: { column_id: { required: !0, type: "integer" } },
            url: "/projects/columns/:column_id",
          },
          get: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: { project_id: { required: !0, type: "integer" } },
            url: "/projects/:project_id",
          },
          getCard: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: { card_id: { required: !0, type: "integer" } },
            url: "/projects/columns/cards/:card_id",
          },
          getColumn: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: { column_id: { required: !0, type: "integer" } },
            url: "/projects/columns/:column_id",
          },
          listCards: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              archived_state: {
                enum: ["all", "archived", "not_archived"],
                type: "string",
              },
              column_id: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/projects/columns/:column_id/cards",
          },
          listCollaborators: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              affiliation: {
                enum: ["outside", "direct", "all"],
                type: "string",
              },
              page: { type: "integer" },
              per_page: { type: "integer" },
              project_id: { required: !0, type: "integer" },
            },
            url: "/projects/:project_id/collaborators",
          },
          listColumns: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              project_id: { required: !0, type: "integer" },
            },
            url: "/projects/:project_id/columns",
          },
          listForOrg: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/orgs/:org/projects",
          },
          listForRepo: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/repos/:owner/:repo/projects",
          },
          listForUser: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              state: { enum: ["open", "closed", "all"], type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/projects",
          },
          moveCard: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "POST",
            params: {
              card_id: { required: !0, type: "integer" },
              column_id: { type: "integer" },
              position: {
                required: !0,
                type: "string",
                validation: "^(top|bottom|after:\\d+)$",
              },
            },
            url: "/projects/columns/cards/:card_id/moves",
          },
          moveColumn: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "POST",
            params: {
              column_id: { required: !0, type: "integer" },
              position: {
                required: !0,
                type: "string",
                validation: "^(first|last|after:\\d+)$",
              },
            },
            url: "/projects/columns/:column_id/moves",
          },
          removeCollaborator: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "DELETE",
            params: {
              project_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/projects/:project_id/collaborators/:username",
          },
          reviewUserPermissionLevel: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              project_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/projects/:project_id/collaborators/:username/permission",
          },
          update: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "PATCH",
            params: {
              body: { type: "string" },
              name: { type: "string" },
              organization_permission: { type: "string" },
              private: { type: "boolean" },
              project_id: { required: !0, type: "integer" },
              state: { enum: ["open", "closed"], type: "string" },
            },
            url: "/projects/:project_id",
          },
          updateCard: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "PATCH",
            params: {
              archived: { type: "boolean" },
              card_id: { required: !0, type: "integer" },
              note: { type: "string" },
            },
            url: "/projects/columns/cards/:card_id",
          },
          updateColumn: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "PATCH",
            params: {
              column_id: { required: !0, type: "integer" },
              name: { required: !0, type: "string" },
            },
            url: "/projects/columns/:column_id",
          },
        },
        pulls: {
          checkIfMerged: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/merge",
          },
          create: {
            method: "POST",
            params: {
              base: { required: !0, type: "string" },
              body: { type: "string" },
              draft: { type: "boolean" },
              head: { required: !0, type: "string" },
              maintainer_can_modify: { type: "boolean" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              title: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls",
          },
          createComment: {
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              commit_id: { required: !0, type: "string" },
              in_reply_to: {
                deprecated: !0,
                description:
                  "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
                type: "integer",
              },
              line: { type: "integer" },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              path: { required: !0, type: "string" },
              position: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              side: { enum: ["LEFT", "RIGHT"], type: "string" },
              start_line: { type: "integer" },
              start_side: { enum: ["LEFT", "RIGHT", "side"], type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/comments",
          },
          createCommentReply: {
            deprecated:
              "octokit.pulls.createCommentReply() has been renamed to octokit.pulls.createComment() (2019-09-09)",
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              commit_id: { required: !0, type: "string" },
              in_reply_to: {
                deprecated: !0,
                description:
                  "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
                type: "integer",
              },
              line: { type: "integer" },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              path: { required: !0, type: "string" },
              position: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              side: { enum: ["LEFT", "RIGHT"], type: "string" },
              start_line: { type: "integer" },
              start_side: { enum: ["LEFT", "RIGHT", "side"], type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/comments",
          },
          createFromIssue: {
            deprecated:
              "octokit.pulls.createFromIssue() is deprecated, see https://developer.github.com/v3/pulls/#create-a-pull-request",
            method: "POST",
            params: {
              base: { required: !0, type: "string" },
              draft: { type: "boolean" },
              head: { required: !0, type: "string" },
              issue: { required: !0, type: "integer" },
              maintainer_can_modify: { type: "boolean" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls",
          },
          createReview: {
            method: "POST",
            params: {
              body: { type: "string" },
              comments: { type: "object[]" },
              "comments[].body": { required: !0, type: "string" },
              "comments[].path": { required: !0, type: "string" },
              "comments[].position": { required: !0, type: "integer" },
              commit_id: { type: "string" },
              event: {
                enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
                type: "string",
              },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/reviews",
          },
          createReviewCommentReply: {
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/pulls/:pull_number/comments/:comment_id/replies",
          },
          createReviewRequest: {
            method: "POST",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              reviewers: { type: "string[]" },
              team_reviewers: { type: "string[]" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers",
          },
          deleteComment: {
            method: "DELETE",
            params: {
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/comments/:comment_id",
          },
          deletePendingReview: {
            method: "DELETE",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              review_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id",
          },
          deleteReviewRequest: {
            method: "DELETE",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              reviewers: { type: "string[]" },
              team_reviewers: { type: "string[]" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers",
          },
          dismissReview: {
            method: "PUT",
            params: {
              message: { required: !0, type: "string" },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              review_id: { required: !0, type: "integer" },
            },
            url:
              "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/dismissals",
          },
          get: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number",
          },
          getComment: {
            method: "GET",
            params: {
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/comments/:comment_id",
          },
          getCommentsForReview: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              review_id: { required: !0, type: "integer" },
            },
            url:
              "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/comments",
          },
          getReview: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              review_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id",
          },
          list: {
            method: "GET",
            params: {
              base: { type: "string" },
              direction: { enum: ["asc", "desc"], type: "string" },
              head: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              sort: {
                enum: ["created", "updated", "popularity", "long-running"],
                type: "string",
              },
              state: { enum: ["open", "closed", "all"], type: "string" },
            },
            url: "/repos/:owner/:repo/pulls",
          },
          listComments: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              since: { type: "string" },
              sort: { enum: ["created", "updated"], type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/comments",
          },
          listCommentsForRepo: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              since: { type: "string" },
              sort: { enum: ["created", "updated"], type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/comments",
          },
          listCommits: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/commits",
          },
          listFiles: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/files",
          },
          listReviewRequests: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers",
          },
          listReviews: {
            method: "GET",
            params: {
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/reviews",
          },
          merge: {
            method: "PUT",
            params: {
              commit_message: { type: "string" },
              commit_title: { type: "string" },
              merge_method: {
                enum: ["merge", "squash", "rebase"],
                type: "string",
              },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              sha: { type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/merge",
          },
          submitReview: {
            method: "POST",
            params: {
              body: { type: "string" },
              event: {
                enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
                required: !0,
                type: "string",
              },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              review_id: { required: !0, type: "integer" },
            },
            url:
              "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/events",
          },
          update: {
            method: "PATCH",
            params: {
              base: { type: "string" },
              body: { type: "string" },
              maintainer_can_modify: { type: "boolean" },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              state: { enum: ["open", "closed"], type: "string" },
              title: { type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number",
          },
          updateBranch: {
            headers: { accept: "application/vnd.github.lydian-preview+json" },
            method: "PUT",
            params: {
              expected_head_sha: { type: "string" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/update-branch",
          },
          updateComment: {
            method: "PATCH",
            params: {
              body: { required: !0, type: "string" },
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/comments/:comment_id",
          },
          updateReview: {
            method: "PUT",
            params: {
              body: { required: !0, type: "string" },
              number: { alias: "pull_number", deprecated: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              pull_number: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              review_id: { required: !0, type: "integer" },
            },
            url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id",
          },
        },
        rateLimit: { get: { method: "GET", params: {}, url: "/rate_limit" } },
        reactions: {
          createForCommitComment: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              comment_id: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/comments/:comment_id/reactions",
          },
          createForIssue: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/reactions",
          },
          createForIssueComment: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              comment_id: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions",
          },
          createForPullRequestReviewComment: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              comment_id: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions",
          },
          createForTeamDiscussion: {
            deprecated:
              "octokit.reactions.createForTeamDiscussion() has been renamed to octokit.reactions.createForTeamDiscussionLegacy() (2020-01-16)",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/reactions",
          },
          createForTeamDiscussionComment: {
            deprecated:
              "octokit.reactions.createForTeamDiscussionComment() has been renamed to octokit.reactions.createForTeamDiscussionCommentLegacy() (2020-01-16)",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              comment_number: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions",
          },
          createForTeamDiscussionCommentInOrg: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              comment_number: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number/reactions",
          },
          createForTeamDiscussionCommentLegacy: {
            deprecated:
              "octokit.reactions.createForTeamDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/reactions/#create-reaction-for-a-team-discussion-comment-legacy",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              comment_number: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions",
          },
          createForTeamDiscussionInOrg: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/reactions",
          },
          createForTeamDiscussionLegacy: {
            deprecated:
              "octokit.reactions.createForTeamDiscussionLegacy() is deprecated, see https://developer.github.com/v3/reactions/#create-reaction-for-a-team-discussion-legacy",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "POST",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                required: !0,
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/reactions",
          },
          delete: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "DELETE",
            params: { reaction_id: { required: !0, type: "integer" } },
            url: "/reactions/:reaction_id",
          },
          listForCommitComment: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              comment_id: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/comments/:comment_id/reactions",
          },
          listForIssue: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              issue_number: { required: !0, type: "integer" },
              number: {
                alias: "issue_number",
                deprecated: !0,
                type: "integer",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/:issue_number/reactions",
          },
          listForIssueComment: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              comment_id: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions",
          },
          listForPullRequestReviewComment: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              comment_id: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions",
          },
          listForTeamDiscussion: {
            deprecated:
              "octokit.reactions.listForTeamDiscussion() has been renamed to octokit.reactions.listForTeamDiscussionLegacy() (2020-01-16)",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/reactions",
          },
          listForTeamDiscussionComment: {
            deprecated:
              "octokit.reactions.listForTeamDiscussionComment() has been renamed to octokit.reactions.listForTeamDiscussionCommentLegacy() (2020-01-16)",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              comment_number: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions",
          },
          listForTeamDiscussionCommentInOrg: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              comment_number: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number/reactions",
          },
          listForTeamDiscussionCommentLegacy: {
            deprecated:
              "octokit.reactions.listForTeamDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/reactions/#list-reactions-for-a-team-discussion-comment-legacy",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              comment_number: { required: !0, type: "integer" },
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions",
          },
          listForTeamDiscussionInOrg: {
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/reactions",
          },
          listForTeamDiscussionLegacy: {
            deprecated:
              "octokit.reactions.listForTeamDiscussionLegacy() is deprecated, see https://developer.github.com/v3/reactions/#list-reactions-for-a-team-discussion-legacy",
            headers: {
              accept: "application/vnd.github.squirrel-girl-preview+json",
            },
            method: "GET",
            params: {
              content: {
                enum: [
                  "+1",
                  "-1",
                  "laugh",
                  "confused",
                  "heart",
                  "hooray",
                  "rocket",
                  "eyes",
                ],
                type: "string",
              },
              discussion_number: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/reactions",
          },
        },
        repos: {
          acceptInvitation: {
            method: "PATCH",
            params: { invitation_id: { required: !0, type: "integer" } },
            url: "/user/repository_invitations/:invitation_id",
          },
          addCollaborator: {
            method: "PUT",
            params: {
              owner: { required: !0, type: "string" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              repo: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/collaborators/:username",
          },
          addDeployKey: {
            method: "POST",
            params: {
              key: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              read_only: { type: "boolean" },
              repo: { required: !0, type: "string" },
              title: { type: "string" },
            },
            url: "/repos/:owner/:repo/keys",
          },
          addProtectedBranchAdminEnforcement: {
            method: "POST",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/enforce_admins",
          },
          addProtectedBranchAppRestrictions: {
            method: "POST",
            params: {
              apps: { mapTo: "data", required: !0, type: "string[]" },
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps",
          },
          addProtectedBranchRequiredSignatures: {
            headers: { accept: "application/vnd.github.zzzax-preview+json" },
            method: "POST",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_signatures",
          },
          addProtectedBranchRequiredStatusChecksContexts: {
            method: "POST",
            params: {
              branch: { required: !0, type: "string" },
              contexts: { mapTo: "data", required: !0, type: "string[]" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts",
          },
          addProtectedBranchTeamRestrictions: {
            method: "POST",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              teams: { mapTo: "data", required: !0, type: "string[]" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams",
          },
          addProtectedBranchUserRestrictions: {
            method: "POST",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              users: { mapTo: "data", required: !0, type: "string[]" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/users",
          },
          checkCollaborator: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/collaborators/:username",
          },
          checkVulnerabilityAlerts: {
            headers: { accept: "application/vnd.github.dorian-preview+json" },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/vulnerability-alerts",
          },
          compareCommits: {
            method: "GET",
            params: {
              base: { required: !0, type: "string" },
              head: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/compare/:base...:head",
          },
          createCommitComment: {
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              commit_sha: { required: !0, type: "string" },
              line: { type: "integer" },
              owner: { required: !0, type: "string" },
              path: { type: "string" },
              position: { type: "integer" },
              repo: { required: !0, type: "string" },
              sha: { alias: "commit_sha", deprecated: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:commit_sha/comments",
          },
          createDeployment: {
            method: "POST",
            params: {
              auto_merge: { type: "boolean" },
              description: { type: "string" },
              environment: { type: "string" },
              owner: { required: !0, type: "string" },
              payload: { type: "string" },
              production_environment: { type: "boolean" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              required_contexts: { type: "string[]" },
              task: { type: "string" },
              transient_environment: { type: "boolean" },
            },
            url: "/repos/:owner/:repo/deployments",
          },
          createDeploymentStatus: {
            method: "POST",
            params: {
              auto_inactive: { type: "boolean" },
              deployment_id: { required: !0, type: "integer" },
              description: { type: "string" },
              environment: {
                enum: ["production", "staging", "qa"],
                type: "string",
              },
              environment_url: { type: "string" },
              log_url: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              state: {
                enum: [
                  "error",
                  "failure",
                  "inactive",
                  "in_progress",
                  "queued",
                  "pending",
                  "success",
                ],
                required: !0,
                type: "string",
              },
              target_url: { type: "string" },
            },
            url: "/repos/:owner/:repo/deployments/:deployment_id/statuses",
          },
          createDispatchEvent: {
            method: "POST",
            params: {
              client_payload: { type: "object" },
              event_type: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/dispatches",
          },
          createFile: {
            deprecated:
              "octokit.repos.createFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
            method: "PUT",
            params: {
              author: { type: "object" },
              "author.email": { required: !0, type: "string" },
              "author.name": { required: !0, type: "string" },
              branch: { type: "string" },
              committer: { type: "object" },
              "committer.email": { required: !0, type: "string" },
              "committer.name": { required: !0, type: "string" },
              content: { required: !0, type: "string" },
              message: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              path: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { type: "string" },
            },
            url: "/repos/:owner/:repo/contents/:path",
          },
          createForAuthenticatedUser: {
            method: "POST",
            params: {
              allow_merge_commit: { type: "boolean" },
              allow_rebase_merge: { type: "boolean" },
              allow_squash_merge: { type: "boolean" },
              auto_init: { type: "boolean" },
              delete_branch_on_merge: { type: "boolean" },
              description: { type: "string" },
              gitignore_template: { type: "string" },
              has_issues: { type: "boolean" },
              has_projects: { type: "boolean" },
              has_wiki: { type: "boolean" },
              homepage: { type: "string" },
              is_template: { type: "boolean" },
              license_template: { type: "string" },
              name: { required: !0, type: "string" },
              private: { type: "boolean" },
              team_id: { type: "integer" },
              visibility: {
                enum: ["public", "private", "visibility", "internal"],
                type: "string",
              },
            },
            url: "/user/repos",
          },
          createFork: {
            method: "POST",
            params: {
              organization: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/forks",
          },
          createHook: {
            method: "POST",
            params: {
              active: { type: "boolean" },
              config: { required: !0, type: "object" },
              "config.content_type": { type: "string" },
              "config.insecure_ssl": { type: "string" },
              "config.secret": { type: "string" },
              "config.url": { required: !0, type: "string" },
              events: { type: "string[]" },
              name: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/hooks",
          },
          createInOrg: {
            method: "POST",
            params: {
              allow_merge_commit: { type: "boolean" },
              allow_rebase_merge: { type: "boolean" },
              allow_squash_merge: { type: "boolean" },
              auto_init: { type: "boolean" },
              delete_branch_on_merge: { type: "boolean" },
              description: { type: "string" },
              gitignore_template: { type: "string" },
              has_issues: { type: "boolean" },
              has_projects: { type: "boolean" },
              has_wiki: { type: "boolean" },
              homepage: { type: "string" },
              is_template: { type: "boolean" },
              license_template: { type: "string" },
              name: { required: !0, type: "string" },
              org: { required: !0, type: "string" },
              private: { type: "boolean" },
              team_id: { type: "integer" },
              visibility: {
                enum: ["public", "private", "visibility", "internal"],
                type: "string",
              },
            },
            url: "/orgs/:org/repos",
          },
          createOrUpdateFile: {
            method: "PUT",
            params: {
              author: { type: "object" },
              "author.email": { required: !0, type: "string" },
              "author.name": { required: !0, type: "string" },
              branch: { type: "string" },
              committer: { type: "object" },
              "committer.email": { required: !0, type: "string" },
              "committer.name": { required: !0, type: "string" },
              content: { required: !0, type: "string" },
              message: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              path: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { type: "string" },
            },
            url: "/repos/:owner/:repo/contents/:path",
          },
          createRelease: {
            method: "POST",
            params: {
              body: { type: "string" },
              draft: { type: "boolean" },
              name: { type: "string" },
              owner: { required: !0, type: "string" },
              prerelease: { type: "boolean" },
              repo: { required: !0, type: "string" },
              tag_name: { required: !0, type: "string" },
              target_commitish: { type: "string" },
            },
            url: "/repos/:owner/:repo/releases",
          },
          createStatus: {
            method: "POST",
            params: {
              context: { type: "string" },
              description: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { required: !0, type: "string" },
              state: {
                enum: ["error", "failure", "pending", "success"],
                required: !0,
                type: "string",
              },
              target_url: { type: "string" },
            },
            url: "/repos/:owner/:repo/statuses/:sha",
          },
          createUsingTemplate: {
            headers: { accept: "application/vnd.github.baptiste-preview+json" },
            method: "POST",
            params: {
              description: { type: "string" },
              name: { required: !0, type: "string" },
              owner: { type: "string" },
              private: { type: "boolean" },
              template_owner: { required: !0, type: "string" },
              template_repo: { required: !0, type: "string" },
            },
            url: "/repos/:template_owner/:template_repo/generate",
          },
          declineInvitation: {
            method: "DELETE",
            params: { invitation_id: { required: !0, type: "integer" } },
            url: "/user/repository_invitations/:invitation_id",
          },
          delete: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo",
          },
          deleteCommitComment: {
            method: "DELETE",
            params: {
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/comments/:comment_id",
          },
          deleteDownload: {
            method: "DELETE",
            params: {
              download_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/downloads/:download_id",
          },
          deleteFile: {
            method: "DELETE",
            params: {
              author: { type: "object" },
              "author.email": { type: "string" },
              "author.name": { type: "string" },
              branch: { type: "string" },
              committer: { type: "object" },
              "committer.email": { type: "string" },
              "committer.name": { type: "string" },
              message: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              path: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/contents/:path",
          },
          deleteHook: {
            method: "DELETE",
            params: {
              hook_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/hooks/:hook_id",
          },
          deleteInvitation: {
            method: "DELETE",
            params: {
              invitation_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/invitations/:invitation_id",
          },
          deleteRelease: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              release_id: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/:release_id",
          },
          deleteReleaseAsset: {
            method: "DELETE",
            params: {
              asset_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/assets/:asset_id",
          },
          disableAutomatedSecurityFixes: {
            headers: { accept: "application/vnd.github.london-preview+json" },
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/automated-security-fixes",
          },
          disablePagesSite: {
            headers: {
              accept: "application/vnd.github.switcheroo-preview+json",
            },
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pages",
          },
          disableVulnerabilityAlerts: {
            headers: { accept: "application/vnd.github.dorian-preview+json" },
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/vulnerability-alerts",
          },
          enableAutomatedSecurityFixes: {
            headers: { accept: "application/vnd.github.london-preview+json" },
            method: "PUT",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/automated-security-fixes",
          },
          enablePagesSite: {
            headers: {
              accept: "application/vnd.github.switcheroo-preview+json",
            },
            method: "POST",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              source: { type: "object" },
              "source.branch": { enum: ["master", "gh-pages"], type: "string" },
              "source.path": { type: "string" },
            },
            url: "/repos/:owner/:repo/pages",
          },
          enableVulnerabilityAlerts: {
            headers: { accept: "application/vnd.github.dorian-preview+json" },
            method: "PUT",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/vulnerability-alerts",
          },
          get: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo",
          },
          getAppsWithAccessToProtectedBranch: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps",
          },
          getArchiveLink: {
            method: "GET",
            params: {
              archive_format: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/:archive_format/:ref",
          },
          getBranch: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/branches/:branch",
          },
          getBranchProtection: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/branches/:branch/protection",
          },
          getClones: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              per: { enum: ["day", "week"], type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/traffic/clones",
          },
          getCodeFrequencyStats: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/stats/code_frequency",
          },
          getCollaboratorPermissionLevel: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/collaborators/:username/permission",
          },
          getCombinedStatusForRef: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:ref/status",
          },
          getCommit: {
            method: "GET",
            params: {
              commit_sha: { alias: "ref", deprecated: !0, type: "string" },
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { alias: "ref", deprecated: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:ref",
          },
          getCommitActivityStats: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/stats/commit_activity",
          },
          getCommitComment: {
            method: "GET",
            params: {
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/comments/:comment_id",
          },
          getCommitRefSha: {
            deprecated:
              "octokit.repos.getCommitRefSha() is deprecated, see https://developer.github.com/v3/repos/commits/#get-a-single-commit",
            headers: { accept: "application/vnd.github.v3.sha" },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:ref",
          },
          getContents: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              path: { required: !0, type: "string" },
              ref: { type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/contents/:path",
          },
          getContributorsStats: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/stats/contributors",
          },
          getDeployKey: {
            method: "GET",
            params: {
              key_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/keys/:key_id",
          },
          getDeployment: {
            method: "GET",
            params: {
              deployment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/deployments/:deployment_id",
          },
          getDeploymentStatus: {
            method: "GET",
            params: {
              deployment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              status_id: { required: !0, type: "integer" },
            },
            url:
              "/repos/:owner/:repo/deployments/:deployment_id/statuses/:status_id",
          },
          getDownload: {
            method: "GET",
            params: {
              download_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/downloads/:download_id",
          },
          getHook: {
            method: "GET",
            params: {
              hook_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/hooks/:hook_id",
          },
          getLatestPagesBuild: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pages/builds/latest",
          },
          getLatestRelease: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/latest",
          },
          getPages: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pages",
          },
          getPagesBuild: {
            method: "GET",
            params: {
              build_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pages/builds/:build_id",
          },
          getParticipationStats: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/stats/participation",
          },
          getProtectedBranchAdminEnforcement: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/enforce_admins",
          },
          getProtectedBranchPullRequestReviewEnforcement: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews",
          },
          getProtectedBranchRequiredSignatures: {
            headers: { accept: "application/vnd.github.zzzax-preview+json" },
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_signatures",
          },
          getProtectedBranchRequiredStatusChecks: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_status_checks",
          },
          getProtectedBranchRestrictions: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/branches/:branch/protection/restrictions",
          },
          getPunchCardStats: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/stats/punch_card",
          },
          getReadme: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              ref: { type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/readme",
          },
          getRelease: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              release_id: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/:release_id",
          },
          getReleaseAsset: {
            method: "GET",
            params: {
              asset_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/assets/:asset_id",
          },
          getReleaseByTag: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              tag: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/tags/:tag",
          },
          getTeamsWithAccessToProtectedBranch: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams",
          },
          getTopPaths: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/traffic/popular/paths",
          },
          getTopReferrers: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/traffic/popular/referrers",
          },
          getUsersWithAccessToProtectedBranch: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/users",
          },
          getViews: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              per: { enum: ["day", "week"], type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/traffic/views",
          },
          list: {
            method: "GET",
            params: {
              affiliation: { type: "string" },
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              sort: {
                enum: ["created", "updated", "pushed", "full_name"],
                type: "string",
              },
              type: {
                enum: ["all", "owner", "public", "private", "member"],
                type: "string",
              },
              visibility: {
                enum: ["all", "public", "private"],
                type: "string",
              },
            },
            url: "/user/repos",
          },
          listAppsWithAccessToProtectedBranch: {
            deprecated:
              "octokit.repos.listAppsWithAccessToProtectedBranch() has been renamed to octokit.repos.getAppsWithAccessToProtectedBranch() (2019-09-13)",
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps",
          },
          listAssetsForRelease: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              release_id: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/:release_id/assets",
          },
          listBranches: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              protected: { type: "boolean" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/branches",
          },
          listBranchesForHeadCommit: {
            headers: { accept: "application/vnd.github.groot-preview+json" },
            method: "GET",
            params: {
              commit_sha: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:commit_sha/branches-where-head",
          },
          listCollaborators: {
            method: "GET",
            params: {
              affiliation: {
                enum: ["outside", "direct", "all"],
                type: "string",
              },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/collaborators",
          },
          listCommentsForCommit: {
            method: "GET",
            params: {
              commit_sha: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              ref: { alias: "commit_sha", deprecated: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:commit_sha/comments",
          },
          listCommitComments: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/comments",
          },
          listCommits: {
            method: "GET",
            params: {
              author: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              path: { type: "string" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              sha: { type: "string" },
              since: { type: "string" },
              until: { type: "string" },
            },
            url: "/repos/:owner/:repo/commits",
          },
          listContributors: {
            method: "GET",
            params: {
              anon: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/contributors",
          },
          listDeployKeys: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/keys",
          },
          listDeploymentStatuses: {
            method: "GET",
            params: {
              deployment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/deployments/:deployment_id/statuses",
          },
          listDeployments: {
            method: "GET",
            params: {
              environment: { type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              ref: { type: "string" },
              repo: { required: !0, type: "string" },
              sha: { type: "string" },
              task: { type: "string" },
            },
            url: "/repos/:owner/:repo/deployments",
          },
          listDownloads: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/downloads",
          },
          listForOrg: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              sort: {
                enum: ["created", "updated", "pushed", "full_name"],
                type: "string",
              },
              type: {
                enum: [
                  "all",
                  "public",
                  "private",
                  "forks",
                  "sources",
                  "member",
                  "internal",
                ],
                type: "string",
              },
            },
            url: "/orgs/:org/repos",
          },
          listForUser: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              sort: {
                enum: ["created", "updated", "pushed", "full_name"],
                type: "string",
              },
              type: { enum: ["all", "owner", "member"], type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/repos",
          },
          listForks: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
              sort: {
                enum: ["newest", "oldest", "stargazers"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/forks",
          },
          listHooks: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/hooks",
          },
          listInvitations: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/invitations",
          },
          listInvitationsForAuthenticatedUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/repository_invitations",
          },
          listLanguages: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/languages",
          },
          listPagesBuilds: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pages/builds",
          },
          listProtectedBranchRequiredStatusChecksContexts: {
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts",
          },
          listProtectedBranchTeamRestrictions: {
            deprecated:
              "octokit.repos.listProtectedBranchTeamRestrictions() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-09)",
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams",
          },
          listProtectedBranchUserRestrictions: {
            deprecated:
              "octokit.repos.listProtectedBranchUserRestrictions() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-09)",
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/users",
          },
          listPublic: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "integer" },
            },
            url: "/repositories",
          },
          listPullRequestsAssociatedWithCommit: {
            headers: { accept: "application/vnd.github.groot-preview+json" },
            method: "GET",
            params: {
              commit_sha: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:commit_sha/pulls",
          },
          listReleases: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases",
          },
          listStatusesForRef: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              ref: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/commits/:ref/statuses",
          },
          listTags: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/tags",
          },
          listTeams: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/teams",
          },
          listTeamsWithAccessToProtectedBranch: {
            deprecated:
              "octokit.repos.listTeamsWithAccessToProtectedBranch() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-13)",
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams",
          },
          listTopics: {
            headers: { accept: "application/vnd.github.mercy-preview+json" },
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/topics",
          },
          listUsersWithAccessToProtectedBranch: {
            deprecated:
              "octokit.repos.listUsersWithAccessToProtectedBranch() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-13)",
            method: "GET",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/users",
          },
          merge: {
            method: "POST",
            params: {
              base: { required: !0, type: "string" },
              commit_message: { type: "string" },
              head: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/merges",
          },
          pingHook: {
            method: "POST",
            params: {
              hook_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/hooks/:hook_id/pings",
          },
          removeBranchProtection: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/branches/:branch/protection",
          },
          removeCollaborator: {
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/collaborators/:username",
          },
          removeDeployKey: {
            method: "DELETE",
            params: {
              key_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/keys/:key_id",
          },
          removeProtectedBranchAdminEnforcement: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/enforce_admins",
          },
          removeProtectedBranchAppRestrictions: {
            method: "DELETE",
            params: {
              apps: { mapTo: "data", required: !0, type: "string[]" },
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps",
          },
          removeProtectedBranchPullRequestReviewEnforcement: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews",
          },
          removeProtectedBranchRequiredSignatures: {
            headers: { accept: "application/vnd.github.zzzax-preview+json" },
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_signatures",
          },
          removeProtectedBranchRequiredStatusChecks: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_status_checks",
          },
          removeProtectedBranchRequiredStatusChecksContexts: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              contexts: { mapTo: "data", required: !0, type: "string[]" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts",
          },
          removeProtectedBranchRestrictions: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/branches/:branch/protection/restrictions",
          },
          removeProtectedBranchTeamRestrictions: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              teams: { mapTo: "data", required: !0, type: "string[]" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams",
          },
          removeProtectedBranchUserRestrictions: {
            method: "DELETE",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              users: { mapTo: "data", required: !0, type: "string[]" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/users",
          },
          replaceProtectedBranchAppRestrictions: {
            method: "PUT",
            params: {
              apps: { mapTo: "data", required: !0, type: "string[]" },
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps",
          },
          replaceProtectedBranchRequiredStatusChecksContexts: {
            method: "PUT",
            params: {
              branch: { required: !0, type: "string" },
              contexts: { mapTo: "data", required: !0, type: "string[]" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts",
          },
          replaceProtectedBranchTeamRestrictions: {
            method: "PUT",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              teams: { mapTo: "data", required: !0, type: "string[]" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams",
          },
          replaceProtectedBranchUserRestrictions: {
            method: "PUT",
            params: {
              branch: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              users: { mapTo: "data", required: !0, type: "string[]" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/restrictions/users",
          },
          replaceTopics: {
            headers: { accept: "application/vnd.github.mercy-preview+json" },
            method: "PUT",
            params: {
              names: { required: !0, type: "string[]" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/topics",
          },
          requestPageBuild: {
            method: "POST",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/pages/builds",
          },
          retrieveCommunityProfileMetrics: {
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/community/profile",
          },
          testPushHook: {
            method: "POST",
            params: {
              hook_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/hooks/:hook_id/tests",
          },
          transfer: {
            method: "POST",
            params: {
              new_owner: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              team_ids: { type: "integer[]" },
            },
            url: "/repos/:owner/:repo/transfer",
          },
          update: {
            method: "PATCH",
            params: {
              allow_merge_commit: { type: "boolean" },
              allow_rebase_merge: { type: "boolean" },
              allow_squash_merge: { type: "boolean" },
              archived: { type: "boolean" },
              default_branch: { type: "string" },
              delete_branch_on_merge: { type: "boolean" },
              description: { type: "string" },
              has_issues: { type: "boolean" },
              has_projects: { type: "boolean" },
              has_wiki: { type: "boolean" },
              homepage: { type: "string" },
              is_template: { type: "boolean" },
              name: { type: "string" },
              owner: { required: !0, type: "string" },
              private: { type: "boolean" },
              repo: { required: !0, type: "string" },
              visibility: {
                enum: ["public", "private", "visibility", "internal"],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo",
          },
          updateBranchProtection: {
            method: "PUT",
            params: {
              allow_deletions: { type: "boolean" },
              allow_force_pushes: { allowNull: !0, type: "boolean" },
              branch: { required: !0, type: "string" },
              enforce_admins: { allowNull: !0, required: !0, type: "boolean" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              required_linear_history: { type: "boolean" },
              required_pull_request_reviews: {
                allowNull: !0,
                required: !0,
                type: "object",
              },
              "required_pull_request_reviews.dismiss_stale_reviews": {
                type: "boolean",
              },
              "required_pull_request_reviews.dismissal_restrictions": {
                type: "object",
              },
              "required_pull_request_reviews.dismissal_restrictions.teams": {
                type: "string[]",
              },
              "required_pull_request_reviews.dismissal_restrictions.users": {
                type: "string[]",
              },
              "required_pull_request_reviews.require_code_owner_reviews": {
                type: "boolean",
              },
              "required_pull_request_reviews.required_approving_review_count": {
                type: "integer",
              },
              required_status_checks: {
                allowNull: !0,
                required: !0,
                type: "object",
              },
              "required_status_checks.contexts": {
                required: !0,
                type: "string[]",
              },
              "required_status_checks.strict": {
                required: !0,
                type: "boolean",
              },
              restrictions: { allowNull: !0, required: !0, type: "object" },
              "restrictions.apps": { type: "string[]" },
              "restrictions.teams": { required: !0, type: "string[]" },
              "restrictions.users": { required: !0, type: "string[]" },
            },
            url: "/repos/:owner/:repo/branches/:branch/protection",
          },
          updateCommitComment: {
            method: "PATCH",
            params: {
              body: { required: !0, type: "string" },
              comment_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/comments/:comment_id",
          },
          updateFile: {
            deprecated:
              "octokit.repos.updateFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
            method: "PUT",
            params: {
              author: { type: "object" },
              "author.email": { required: !0, type: "string" },
              "author.name": { required: !0, type: "string" },
              branch: { type: "string" },
              committer: { type: "object" },
              "committer.email": { required: !0, type: "string" },
              "committer.name": { required: !0, type: "string" },
              content: { required: !0, type: "string" },
              message: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              path: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              sha: { type: "string" },
            },
            url: "/repos/:owner/:repo/contents/:path",
          },
          updateHook: {
            method: "PATCH",
            params: {
              active: { type: "boolean" },
              add_events: { type: "string[]" },
              config: { type: "object" },
              "config.content_type": { type: "string" },
              "config.insecure_ssl": { type: "string" },
              "config.secret": { type: "string" },
              "config.url": { required: !0, type: "string" },
              events: { type: "string[]" },
              hook_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              remove_events: { type: "string[]" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/hooks/:hook_id",
          },
          updateInformationAboutPagesSite: {
            method: "PUT",
            params: {
              cname: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              source: {
                enum: ['"gh-pages"', '"master"', '"master /docs"'],
                type: "string",
              },
            },
            url: "/repos/:owner/:repo/pages",
          },
          updateInvitation: {
            method: "PATCH",
            params: {
              invitation_id: { required: !0, type: "integer" },
              owner: { required: !0, type: "string" },
              permissions: { enum: ["read", "write", "admin"], type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/invitations/:invitation_id",
          },
          updateProtectedBranchPullRequestReviewEnforcement: {
            method: "PATCH",
            params: {
              branch: { required: !0, type: "string" },
              dismiss_stale_reviews: { type: "boolean" },
              dismissal_restrictions: { type: "object" },
              "dismissal_restrictions.teams": { type: "string[]" },
              "dismissal_restrictions.users": { type: "string[]" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              require_code_owner_reviews: { type: "boolean" },
              required_approving_review_count: { type: "integer" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews",
          },
          updateProtectedBranchRequiredStatusChecks: {
            method: "PATCH",
            params: {
              branch: { required: !0, type: "string" },
              contexts: { type: "string[]" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              strict: { type: "boolean" },
            },
            url:
              "/repos/:owner/:repo/branches/:branch/protection/required_status_checks",
          },
          updateRelease: {
            method: "PATCH",
            params: {
              body: { type: "string" },
              draft: { type: "boolean" },
              name: { type: "string" },
              owner: { required: !0, type: "string" },
              prerelease: { type: "boolean" },
              release_id: { required: !0, type: "integer" },
              repo: { required: !0, type: "string" },
              tag_name: { type: "string" },
              target_commitish: { type: "string" },
            },
            url: "/repos/:owner/:repo/releases/:release_id",
          },
          updateReleaseAsset: {
            method: "PATCH",
            params: {
              asset_id: { required: !0, type: "integer" },
              label: { type: "string" },
              name: { type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
            },
            url: "/repos/:owner/:repo/releases/assets/:asset_id",
          },
          uploadReleaseAsset: {
            method: "POST",
            params: {
              data: { mapTo: "data", required: !0, type: "string | object" },
              file: { alias: "data", deprecated: !0, type: "string | object" },
              headers: { required: !0, type: "object" },
              "headers.content-length": { required: !0, type: "integer" },
              "headers.content-type": { required: !0, type: "string" },
              label: { type: "string" },
              name: { required: !0, type: "string" },
              url: { required: !0, type: "string" },
            },
            url: ":url",
          },
        },
        search: {
          code: {
            method: "GET",
            params: {
              order: { enum: ["desc", "asc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              q: { required: !0, type: "string" },
              sort: { enum: ["indexed"], type: "string" },
            },
            url: "/search/code",
          },
          commits: {
            headers: { accept: "application/vnd.github.cloak-preview+json" },
            method: "GET",
            params: {
              order: { enum: ["desc", "asc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              q: { required: !0, type: "string" },
              sort: { enum: ["author-date", "committer-date"], type: "string" },
            },
            url: "/search/commits",
          },
          issues: {
            deprecated:
              "octokit.search.issues() has been renamed to octokit.search.issuesAndPullRequests() (2018-12-27)",
            method: "GET",
            params: {
              order: { enum: ["desc", "asc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              q: { required: !0, type: "string" },
              sort: {
                enum: [
                  "comments",
                  "reactions",
                  "reactions-+1",
                  "reactions--1",
                  "reactions-smile",
                  "reactions-thinking_face",
                  "reactions-heart",
                  "reactions-tada",
                  "interactions",
                  "created",
                  "updated",
                ],
                type: "string",
              },
            },
            url: "/search/issues",
          },
          issuesAndPullRequests: {
            method: "GET",
            params: {
              order: { enum: ["desc", "asc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              q: { required: !0, type: "string" },
              sort: {
                enum: [
                  "comments",
                  "reactions",
                  "reactions-+1",
                  "reactions--1",
                  "reactions-smile",
                  "reactions-thinking_face",
                  "reactions-heart",
                  "reactions-tada",
                  "interactions",
                  "created",
                  "updated",
                ],
                type: "string",
              },
            },
            url: "/search/issues",
          },
          labels: {
            method: "GET",
            params: {
              order: { enum: ["desc", "asc"], type: "string" },
              q: { required: !0, type: "string" },
              repository_id: { required: !0, type: "integer" },
              sort: { enum: ["created", "updated"], type: "string" },
            },
            url: "/search/labels",
          },
          repos: {
            method: "GET",
            params: {
              order: { enum: ["desc", "asc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              q: { required: !0, type: "string" },
              sort: {
                enum: ["stars", "forks", "help-wanted-issues", "updated"],
                type: "string",
              },
            },
            url: "/search/repositories",
          },
          topics: {
            method: "GET",
            params: { q: { required: !0, type: "string" } },
            url: "/search/topics",
          },
          users: {
            method: "GET",
            params: {
              order: { enum: ["desc", "asc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              q: { required: !0, type: "string" },
              sort: {
                enum: ["followers", "repositories", "joined"],
                type: "string",
              },
            },
            url: "/search/users",
          },
        },
        teams: {
          addMember: {
            deprecated:
              "octokit.teams.addMember() has been renamed to octokit.teams.addMemberLegacy() (2020-01-16)",
            method: "PUT",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/members/:username",
          },
          addMemberLegacy: {
            deprecated:
              "octokit.teams.addMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#add-team-member-legacy",
            method: "PUT",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/members/:username",
          },
          addOrUpdateMembership: {
            deprecated:
              "octokit.teams.addOrUpdateMembership() has been renamed to octokit.teams.addOrUpdateMembershipLegacy() (2020-01-16)",
            method: "PUT",
            params: {
              role: { enum: ["member", "maintainer"], type: "string" },
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/memberships/:username",
          },
          addOrUpdateMembershipInOrg: {
            method: "PUT",
            params: {
              org: { required: !0, type: "string" },
              role: { enum: ["member", "maintainer"], type: "string" },
              team_slug: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/memberships/:username",
          },
          addOrUpdateMembershipLegacy: {
            deprecated:
              "octokit.teams.addOrUpdateMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#add-or-update-team-membership-legacy",
            method: "PUT",
            params: {
              role: { enum: ["member", "maintainer"], type: "string" },
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/memberships/:username",
          },
          addOrUpdateProject: {
            deprecated:
              "octokit.teams.addOrUpdateProject() has been renamed to octokit.teams.addOrUpdateProjectLegacy() (2020-01-16)",
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "PUT",
            params: {
              permission: { enum: ["read", "write", "admin"], type: "string" },
              project_id: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects/:project_id",
          },
          addOrUpdateProjectInOrg: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "PUT",
            params: {
              org: { required: !0, type: "string" },
              permission: { enum: ["read", "write", "admin"], type: "string" },
              project_id: { required: !0, type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/projects/:project_id",
          },
          addOrUpdateProjectLegacy: {
            deprecated:
              "octokit.teams.addOrUpdateProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#add-or-update-team-project-legacy",
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "PUT",
            params: {
              permission: { enum: ["read", "write", "admin"], type: "string" },
              project_id: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects/:project_id",
          },
          addOrUpdateRepo: {
            deprecated:
              "octokit.teams.addOrUpdateRepo() has been renamed to octokit.teams.addOrUpdateRepoLegacy() (2020-01-16)",
            method: "PUT",
            params: {
              owner: { required: !0, type: "string" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              repo: { required: !0, type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos/:owner/:repo",
          },
          addOrUpdateRepoInOrg: {
            method: "PUT",
            params: {
              org: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              repo: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo",
          },
          addOrUpdateRepoLegacy: {
            deprecated:
              "octokit.teams.addOrUpdateRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#add-or-update-team-repository-legacy",
            method: "PUT",
            params: {
              owner: { required: !0, type: "string" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              repo: { required: !0, type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos/:owner/:repo",
          },
          checkManagesRepo: {
            deprecated:
              "octokit.teams.checkManagesRepo() has been renamed to octokit.teams.checkManagesRepoLegacy() (2020-01-16)",
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos/:owner/:repo",
          },
          checkManagesRepoInOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo",
          },
          checkManagesRepoLegacy: {
            deprecated:
              "octokit.teams.checkManagesRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#check-if-a-team-manages-a-repository-legacy",
            method: "GET",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos/:owner/:repo",
          },
          create: {
            method: "POST",
            params: {
              description: { type: "string" },
              maintainers: { type: "string[]" },
              name: { required: !0, type: "string" },
              org: { required: !0, type: "string" },
              parent_team_id: { type: "integer" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              privacy: { enum: ["secret", "closed"], type: "string" },
              repo_names: { type: "string[]" },
            },
            url: "/orgs/:org/teams",
          },
          createDiscussion: {
            deprecated:
              "octokit.teams.createDiscussion() has been renamed to octokit.teams.createDiscussionLegacy() (2020-01-16)",
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              private: { type: "boolean" },
              team_id: { required: !0, type: "integer" },
              title: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/discussions",
          },
          createDiscussionComment: {
            deprecated:
              "octokit.teams.createDiscussionComment() has been renamed to octokit.teams.createDiscussionCommentLegacy() (2020-01-16)",
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/comments",
          },
          createDiscussionCommentInOrg: {
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments",
          },
          createDiscussionCommentLegacy: {
            deprecated:
              "octokit.teams.createDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#create-a-comment-legacy",
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/comments",
          },
          createDiscussionInOrg: {
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              org: { required: !0, type: "string" },
              private: { type: "boolean" },
              team_slug: { required: !0, type: "string" },
              title: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/discussions",
          },
          createDiscussionLegacy: {
            deprecated:
              "octokit.teams.createDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#create-a-discussion-legacy",
            method: "POST",
            params: {
              body: { required: !0, type: "string" },
              private: { type: "boolean" },
              team_id: { required: !0, type: "integer" },
              title: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/discussions",
          },
          delete: {
            deprecated:
              "octokit.teams.delete() has been renamed to octokit.teams.deleteLegacy() (2020-01-16)",
            method: "DELETE",
            params: { team_id: { required: !0, type: "integer" } },
            url: "/teams/:team_id",
          },
          deleteDiscussion: {
            deprecated:
              "octokit.teams.deleteDiscussion() has been renamed to octokit.teams.deleteDiscussionLegacy() (2020-01-16)",
            method: "DELETE",
            params: {
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number",
          },
          deleteDiscussionComment: {
            deprecated:
              "octokit.teams.deleteDiscussionComment() has been renamed to octokit.teams.deleteDiscussionCommentLegacy() (2020-01-16)",
            method: "DELETE",
            params: {
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number",
          },
          deleteDiscussionCommentInOrg: {
            method: "DELETE",
            params: {
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number",
          },
          deleteDiscussionCommentLegacy: {
            deprecated:
              "octokit.teams.deleteDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#delete-a-comment-legacy",
            method: "DELETE",
            params: {
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number",
          },
          deleteDiscussionInOrg: {
            method: "DELETE",
            params: {
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number",
          },
          deleteDiscussionLegacy: {
            deprecated:
              "octokit.teams.deleteDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#delete-a-discussion-legacy",
            method: "DELETE",
            params: {
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number",
          },
          deleteInOrg: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug",
          },
          deleteLegacy: {
            deprecated:
              "octokit.teams.deleteLegacy() is deprecated, see https://developer.github.com/v3/teams/#delete-team-legacy",
            method: "DELETE",
            params: { team_id: { required: !0, type: "integer" } },
            url: "/teams/:team_id",
          },
          get: {
            deprecated:
              "octokit.teams.get() has been renamed to octokit.teams.getLegacy() (2020-01-16)",
            method: "GET",
            params: { team_id: { required: !0, type: "integer" } },
            url: "/teams/:team_id",
          },
          getByName: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug",
          },
          getDiscussion: {
            deprecated:
              "octokit.teams.getDiscussion() has been renamed to octokit.teams.getDiscussionLegacy() (2020-01-16)",
            method: "GET",
            params: {
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number",
          },
          getDiscussionComment: {
            deprecated:
              "octokit.teams.getDiscussionComment() has been renamed to octokit.teams.getDiscussionCommentLegacy() (2020-01-16)",
            method: "GET",
            params: {
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number",
          },
          getDiscussionCommentInOrg: {
            method: "GET",
            params: {
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number",
          },
          getDiscussionCommentLegacy: {
            deprecated:
              "octokit.teams.getDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#get-a-single-comment-legacy",
            method: "GET",
            params: {
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number",
          },
          getDiscussionInOrg: {
            method: "GET",
            params: {
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number",
          },
          getDiscussionLegacy: {
            deprecated:
              "octokit.teams.getDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#get-a-single-discussion-legacy",
            method: "GET",
            params: {
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number",
          },
          getLegacy: {
            deprecated:
              "octokit.teams.getLegacy() is deprecated, see https://developer.github.com/v3/teams/#get-team-legacy",
            method: "GET",
            params: { team_id: { required: !0, type: "integer" } },
            url: "/teams/:team_id",
          },
          getMember: {
            deprecated:
              "octokit.teams.getMember() has been renamed to octokit.teams.getMemberLegacy() (2020-01-16)",
            method: "GET",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/members/:username",
          },
          getMemberLegacy: {
            deprecated:
              "octokit.teams.getMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#get-team-member-legacy",
            method: "GET",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/members/:username",
          },
          getMembership: {
            deprecated:
              "octokit.teams.getMembership() has been renamed to octokit.teams.getMembershipLegacy() (2020-01-16)",
            method: "GET",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/memberships/:username",
          },
          getMembershipInOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/memberships/:username",
          },
          getMembershipLegacy: {
            deprecated:
              "octokit.teams.getMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#get-team-membership-legacy",
            method: "GET",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/memberships/:username",
          },
          list: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/orgs/:org/teams",
          },
          listChild: {
            deprecated:
              "octokit.teams.listChild() has been renamed to octokit.teams.listChildLegacy() (2020-01-16)",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/teams",
          },
          listChildInOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/teams",
          },
          listChildLegacy: {
            deprecated:
              "octokit.teams.listChildLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-child-teams-legacy",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/teams",
          },
          listDiscussionComments: {
            deprecated:
              "octokit.teams.listDiscussionComments() has been renamed to octokit.teams.listDiscussionCommentsLegacy() (2020-01-16)",
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              discussion_number: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/comments",
          },
          listDiscussionCommentsInOrg: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments",
          },
          listDiscussionCommentsLegacy: {
            deprecated:
              "octokit.teams.listDiscussionCommentsLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#list-comments-legacy",
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              discussion_number: { required: !0, type: "integer" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions/:discussion_number/comments",
          },
          listDiscussions: {
            deprecated:
              "octokit.teams.listDiscussions() has been renamed to octokit.teams.listDiscussionsLegacy() (2020-01-16)",
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions",
          },
          listDiscussionsInOrg: {
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/discussions",
          },
          listDiscussionsLegacy: {
            deprecated:
              "octokit.teams.listDiscussionsLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#list-discussions-legacy",
            method: "GET",
            params: {
              direction: { enum: ["asc", "desc"], type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/discussions",
          },
          listForAuthenticatedUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/teams",
          },
          listMembers: {
            deprecated:
              "octokit.teams.listMembers() has been renamed to octokit.teams.listMembersLegacy() (2020-01-16)",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              role: { enum: ["member", "maintainer", "all"], type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/members",
          },
          listMembersInOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              role: { enum: ["member", "maintainer", "all"], type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/members",
          },
          listMembersLegacy: {
            deprecated:
              "octokit.teams.listMembersLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#list-team-members-legacy",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              role: { enum: ["member", "maintainer", "all"], type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/members",
          },
          listPendingInvitations: {
            deprecated:
              "octokit.teams.listPendingInvitations() has been renamed to octokit.teams.listPendingInvitationsLegacy() (2020-01-16)",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/invitations",
          },
          listPendingInvitationsInOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/invitations",
          },
          listPendingInvitationsLegacy: {
            deprecated:
              "octokit.teams.listPendingInvitationsLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#list-pending-team-invitations-legacy",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/invitations",
          },
          listProjects: {
            deprecated:
              "octokit.teams.listProjects() has been renamed to octokit.teams.listProjectsLegacy() (2020-01-16)",
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects",
          },
          listProjectsInOrg: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/projects",
          },
          listProjectsLegacy: {
            deprecated:
              "octokit.teams.listProjectsLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-team-projects-legacy",
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects",
          },
          listRepos: {
            deprecated:
              "octokit.teams.listRepos() has been renamed to octokit.teams.listReposLegacy() (2020-01-16)",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos",
          },
          listReposInOrg: {
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/repos",
          },
          listReposLegacy: {
            deprecated:
              "octokit.teams.listReposLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-team-repos-legacy",
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos",
          },
          removeMember: {
            deprecated:
              "octokit.teams.removeMember() has been renamed to octokit.teams.removeMemberLegacy() (2020-01-16)",
            method: "DELETE",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/members/:username",
          },
          removeMemberLegacy: {
            deprecated:
              "octokit.teams.removeMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#remove-team-member-legacy",
            method: "DELETE",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/members/:username",
          },
          removeMembership: {
            deprecated:
              "octokit.teams.removeMembership() has been renamed to octokit.teams.removeMembershipLegacy() (2020-01-16)",
            method: "DELETE",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/memberships/:username",
          },
          removeMembershipInOrg: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/memberships/:username",
          },
          removeMembershipLegacy: {
            deprecated:
              "octokit.teams.removeMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#remove-team-membership-legacy",
            method: "DELETE",
            params: {
              team_id: { required: !0, type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/teams/:team_id/memberships/:username",
          },
          removeProject: {
            deprecated:
              "octokit.teams.removeProject() has been renamed to octokit.teams.removeProjectLegacy() (2020-01-16)",
            method: "DELETE",
            params: {
              project_id: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects/:project_id",
          },
          removeProjectInOrg: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              project_id: { required: !0, type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/projects/:project_id",
          },
          removeProjectLegacy: {
            deprecated:
              "octokit.teams.removeProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#remove-team-project-legacy",
            method: "DELETE",
            params: {
              project_id: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects/:project_id",
          },
          removeRepo: {
            deprecated:
              "octokit.teams.removeRepo() has been renamed to octokit.teams.removeRepoLegacy() (2020-01-16)",
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos/:owner/:repo",
          },
          removeRepoInOrg: {
            method: "DELETE",
            params: {
              org: { required: !0, type: "string" },
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo",
          },
          removeRepoLegacy: {
            deprecated:
              "octokit.teams.removeRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#remove-team-repository-legacy",
            method: "DELETE",
            params: {
              owner: { required: !0, type: "string" },
              repo: { required: !0, type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/repos/:owner/:repo",
          },
          reviewProject: {
            deprecated:
              "octokit.teams.reviewProject() has been renamed to octokit.teams.reviewProjectLegacy() (2020-01-16)",
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              project_id: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects/:project_id",
          },
          reviewProjectInOrg: {
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              org: { required: !0, type: "string" },
              project_id: { required: !0, type: "integer" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/projects/:project_id",
          },
          reviewProjectLegacy: {
            deprecated:
              "octokit.teams.reviewProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#review-a-team-project-legacy",
            headers: { accept: "application/vnd.github.inertia-preview+json" },
            method: "GET",
            params: {
              project_id: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id/projects/:project_id",
          },
          update: {
            deprecated:
              "octokit.teams.update() has been renamed to octokit.teams.updateLegacy() (2020-01-16)",
            method: "PATCH",
            params: {
              description: { type: "string" },
              name: { required: !0, type: "string" },
              parent_team_id: { type: "integer" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              privacy: { enum: ["secret", "closed"], type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id",
          },
          updateDiscussion: {
            deprecated:
              "octokit.teams.updateDiscussion() has been renamed to octokit.teams.updateDiscussionLegacy() (2020-01-16)",
            method: "PATCH",
            params: {
              body: { type: "string" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
              title: { type: "string" },
            },
            url: "/teams/:team_id/discussions/:discussion_number",
          },
          updateDiscussionComment: {
            deprecated:
              "octokit.teams.updateDiscussionComment() has been renamed to octokit.teams.updateDiscussionCommentLegacy() (2020-01-16)",
            method: "PATCH",
            params: {
              body: { required: !0, type: "string" },
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number",
          },
          updateDiscussionCommentInOrg: {
            method: "PATCH",
            params: {
              body: { required: !0, type: "string" },
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url:
              "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number",
          },
          updateDiscussionCommentLegacy: {
            deprecated:
              "octokit.teams.updateDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#edit-a-comment-legacy",
            method: "PATCH",
            params: {
              body: { required: !0, type: "string" },
              comment_number: { required: !0, type: "integer" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
            },
            url:
              "/teams/:team_id/discussions/:discussion_number/comments/:comment_number",
          },
          updateDiscussionInOrg: {
            method: "PATCH",
            params: {
              body: { type: "string" },
              discussion_number: { required: !0, type: "integer" },
              org: { required: !0, type: "string" },
              team_slug: { required: !0, type: "string" },
              title: { type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number",
          },
          updateDiscussionLegacy: {
            deprecated:
              "octokit.teams.updateDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#edit-a-discussion-legacy",
            method: "PATCH",
            params: {
              body: { type: "string" },
              discussion_number: { required: !0, type: "integer" },
              team_id: { required: !0, type: "integer" },
              title: { type: "string" },
            },
            url: "/teams/:team_id/discussions/:discussion_number",
          },
          updateInOrg: {
            method: "PATCH",
            params: {
              description: { type: "string" },
              name: { required: !0, type: "string" },
              org: { required: !0, type: "string" },
              parent_team_id: { type: "integer" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              privacy: { enum: ["secret", "closed"], type: "string" },
              team_slug: { required: !0, type: "string" },
            },
            url: "/orgs/:org/teams/:team_slug",
          },
          updateLegacy: {
            deprecated:
              "octokit.teams.updateLegacy() is deprecated, see https://developer.github.com/v3/teams/#edit-team-legacy",
            method: "PATCH",
            params: {
              description: { type: "string" },
              name: { required: !0, type: "string" },
              parent_team_id: { type: "integer" },
              permission: { enum: ["pull", "push", "admin"], type: "string" },
              privacy: { enum: ["secret", "closed"], type: "string" },
              team_id: { required: !0, type: "integer" },
            },
            url: "/teams/:team_id",
          },
        },
        users: {
          addEmails: {
            method: "POST",
            params: { emails: { required: !0, type: "string[]" } },
            url: "/user/emails",
          },
          block: {
            method: "PUT",
            params: { username: { required: !0, type: "string" } },
            url: "/user/blocks/:username",
          },
          checkBlocked: {
            method: "GET",
            params: { username: { required: !0, type: "string" } },
            url: "/user/blocks/:username",
          },
          checkFollowing: {
            method: "GET",
            params: { username: { required: !0, type: "string" } },
            url: "/user/following/:username",
          },
          checkFollowingForUser: {
            method: "GET",
            params: {
              target_user: { required: !0, type: "string" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/following/:target_user",
          },
          createGpgKey: {
            method: "POST",
            params: { armored_public_key: { type: "string" } },
            url: "/user/gpg_keys",
          },
          createPublicKey: {
            method: "POST",
            params: { key: { type: "string" }, title: { type: "string" } },
            url: "/user/keys",
          },
          deleteEmails: {
            method: "DELETE",
            params: { emails: { required: !0, type: "string[]" } },
            url: "/user/emails",
          },
          deleteGpgKey: {
            method: "DELETE",
            params: { gpg_key_id: { required: !0, type: "integer" } },
            url: "/user/gpg_keys/:gpg_key_id",
          },
          deletePublicKey: {
            method: "DELETE",
            params: { key_id: { required: !0, type: "integer" } },
            url: "/user/keys/:key_id",
          },
          follow: {
            method: "PUT",
            params: { username: { required: !0, type: "string" } },
            url: "/user/following/:username",
          },
          getAuthenticated: { method: "GET", params: {}, url: "/user" },
          getByUsername: {
            method: "GET",
            params: { username: { required: !0, type: "string" } },
            url: "/users/:username",
          },
          getContextForUser: {
            method: "GET",
            params: {
              subject_id: { type: "string" },
              subject_type: {
                enum: ["organization", "repository", "issue", "pull_request"],
                type: "string",
              },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/hovercard",
          },
          getGpgKey: {
            method: "GET",
            params: { gpg_key_id: { required: !0, type: "integer" } },
            url: "/user/gpg_keys/:gpg_key_id",
          },
          getPublicKey: {
            method: "GET",
            params: { key_id: { required: !0, type: "integer" } },
            url: "/user/keys/:key_id",
          },
          list: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              since: { type: "string" },
            },
            url: "/users",
          },
          listBlocked: { method: "GET", params: {}, url: "/user/blocks" },
          listEmails: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/emails",
          },
          listFollowersForAuthenticatedUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/followers",
          },
          listFollowersForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/followers",
          },
          listFollowingForAuthenticatedUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/following",
          },
          listFollowingForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/following",
          },
          listGpgKeys: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/gpg_keys",
          },
          listGpgKeysForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/gpg_keys",
          },
          listPublicEmails: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/public_emails",
          },
          listPublicKeys: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
            },
            url: "/user/keys",
          },
          listPublicKeysForUser: {
            method: "GET",
            params: {
              page: { type: "integer" },
              per_page: { type: "integer" },
              username: { required: !0, type: "string" },
            },
            url: "/users/:username/keys",
          },
          togglePrimaryEmailVisibility: {
            method: "PATCH",
            params: {
              email: { required: !0, type: "string" },
              visibility: { required: !0, type: "string" },
            },
            url: "/user/email/visibility",
          },
          unblock: {
            method: "DELETE",
            params: { username: { required: !0, type: "string" } },
            url: "/user/blocks/:username",
          },
          unfollow: {
            method: "DELETE",
            params: { username: { required: !0, type: "string" } },
            url: "/user/following/:username",
          },
          updateAuthenticated: {
            method: "PATCH",
            params: {
              bio: { type: "string" },
              blog: { type: "string" },
              company: { type: "string" },
              email: { type: "string" },
              hireable: { type: "boolean" },
              location: { type: "string" },
              name: { type: "string" },
            },
            url: "/user",
          },
        },
      };
    function o(e, t) {
      Object.keys(t).forEach(r => {
        e[r] || (e[r] = {}),
          Object.keys(t[r]).forEach(n => {
            const o = t[r][n],
              a = ["method", "url", "headers"].reduce(
                (e, t) => (void 0 !== o[t] && (e[t] = o[t]), e),
                {},
              );
            a.request = { validate: o.params };
            let p = e.request.defaults(a);
            if (Object.keys(o.params || {}).find(e => o.params[e].deprecated)) {
              const t = s.bind(null, e, o);
              (p = t(e.request.defaults(a), `.${r}.${n}()`)),
                (p.endpoint = t(p.endpoint, `.${r}.${n}.endpoint()`)),
                (p.endpoint.merge = t(
                  p.endpoint.merge,
                  `.${r}.${n}.endpoint.merge()`,
                ));
            }
            o.deprecated
              ? (e[r][n] = Object.assign(function() {
                  return (
                    e.log.warn(
                      new i.Deprecation(`[@octokit/rest] ${o.deprecated}`),
                    ),
                    (e[r][n] = p),
                    p.apply(null, arguments)
                  );
                }, p))
              : (e[r][n] = p);
          });
      });
    }
    function s(e, t, r, n) {
      const o = o => (
        (o = Object.assign({}, o)),
        Object.keys(o).forEach(r => {
          if (t.params[r] && t.params[r].deprecated) {
            const s = t.params[r].alias;
            e.log.warn(
              new i.Deprecation(
                `[@octokit/rest] "${r}" parameter is deprecated for "${n}". Use "${s}" instead`,
              ),
            ),
              s in o || (o[s] = o[r]),
              delete o[r];
          }
        }),
        r(o)
      );
      return (
        Object.keys(r).forEach(e => {
          o[e] = r[e];
        }),
        o
      );
    }
    function a(e) {
      return (
        (e.registerEndpoints = o.bind(null, e)),
        o(e, n),
        [
          ["gitdata", "git"],
          ["authorization", "oauthAuthorizations"],
          ["pullRequests", "pulls"],
        ].forEach(([t, r]) => {
          Object.defineProperty(e, t, {
            get: () => (
              e.log.warn(
                new i.Deprecation(
                  `[@octokit/plugin-rest-endpoint-methods] "octokit.${t}.*" methods are deprecated, use "octokit.${r}.*" instead`,
                ),
              ),
              e[r]
            ),
          });
        }),
        {}
      );
    }
    a.VERSION = "2.4.0";
  },
  function(e, t, r) {
    const i = r(21);
    e.exports = i();
  },
  function(e, t, r) {
    e.exports = function(e, t) {
      t = t || {};
      const r = new n.Collection(),
        s = Object.assign(
          {
            debug: () => {},
            info: () => {},
            warn: console.warn,
            error: console.error,
          },
          t && t.log,
        ),
        a = { hook: r, log: s, request: i.defaults(o(t, s, r)) };
      return e.forEach(e => e(a, t)), a;
    };
    const { request: i } = r(30),
      n = r(72),
      o = r(76);
  },
  function(e, t, r) {
    var i = r(73),
      n = r(74),
      o = r(75),
      s = Function.bind,
      a = s.bind(s);
    function p(e, t, r) {
      var i = a(o, null).apply(null, r ? [t, r] : [t]);
      (e.api = { remove: i }),
        (e.remove = i),
        ["before", "error", "after", "wrap"].forEach(function(i) {
          var o = r ? [t, i, r] : [t, i];
          e[i] = e.api[i] = a(n, null).apply(null, o);
        });
    }
    function u() {
      var e = { registry: {} },
        t = i.bind(null, e);
      return p(t, e), t;
    }
    var c = !1;
    function d() {
      return (
        c ||
          (console.warn(
            '[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4',
          ),
          (c = !0)),
        u()
      );
    }
    (d.Singular = function() {
      var e = { registry: {} },
        t = i.bind(null, e, "h");
      return p(t, e, "h"), t;
    }.bind()),
      (d.Collection = u.bind()),
      (e.exports = d),
      (e.exports.Hook = d),
      (e.exports.Singular = d.Singular),
      (e.exports.Collection = d.Collection);
  },
  function(e, t) {
    e.exports = function e(t, r, i, n) {
      if ("function" != typeof i)
        throw new Error("method for before hook must be a function");
      n || (n = {});
      if (Array.isArray(r))
        return r.reverse().reduce(function(r, i) {
          return e.bind(null, t, i, r, n);
        }, i)();
      return Promise.resolve().then(function() {
        return t.registry[r]
          ? t.registry[r].reduce(function(e, t) {
              return t.hook.bind(null, e, n);
            }, i)()
          : i(n);
      });
    };
  },
  function(e, t) {
    e.exports = function(e, t, r, i) {
      var n = i;
      e.registry[r] || (e.registry[r] = []);
      "before" === t &&
        (i = function(e, t) {
          return Promise.resolve()
            .then(n.bind(null, t))
            .then(e.bind(null, t));
        });
      "after" === t &&
        (i = function(e, t) {
          var r;
          return Promise.resolve()
            .then(e.bind(null, t))
            .then(function(e) {
              return n((r = e), t);
            })
            .then(function() {
              return r;
            });
        });
      "error" === t &&
        (i = function(e, t) {
          return Promise.resolve()
            .then(e.bind(null, t))
            .catch(function(e) {
              return n(e, t);
            });
        });
      e.registry[r].push({ hook: i, orig: n });
    };
  },
  function(e, t) {
    e.exports = function(e, t, r) {
      if (!e.registry[t]) return;
      var i = e.registry[t]
        .map(function(e) {
          return e.orig;
        })
        .indexOf(r);
      if (-1 === i) return;
      e.registry[t].splice(i, 1);
    };
  },
  function(e, t, r) {
    e.exports = function(e, t, r) {
      e.headers &&
        (e.headers = Object.keys(e.headers).reduce(
          (t, r) => ((t[r.toLowerCase()] = e.headers[r]), t),
          {},
        ));
      const o = {
        headers: e.headers || {},
        request: e.request || {},
        mediaType: { previews: [], format: "" },
      };
      e.baseUrl && (o.baseUrl = e.baseUrl);
      e.userAgent && (o.headers["user-agent"] = e.userAgent);
      e.previews && (o.mediaType.previews = e.previews);
      e.timeZone && (o.headers["time-zone"] = e.timeZone);
      e.timeout &&
        (a(
          t,
          new i(
            "[@octokit/rest] new Octokit({timeout}) is deprecated. Use {request: {timeout}} instead. See https://github.com/octokit/request.js#request",
          ),
        ),
        (o.request.timeout = e.timeout));
      e.agent &&
        (p(
          t,
          new i(
            "[@octokit/rest] new Octokit({agent}) is deprecated. Use {request: {agent}} instead. See https://github.com/octokit/request.js#request",
          ),
        ),
        (o.request.agent = e.agent));
      e.headers &&
        u(
          t,
          new i(
            "[@octokit/rest] new Octokit({headers}) is deprecated. Use {userAgent, previews} instead. See https://github.com/octokit/request.js#request",
          ),
        );
      const c = o.headers["user-agent"],
        d = `octokit.js/${s.version} ${n()}`;
      return (
        (o.headers["user-agent"] = [c, d].filter(Boolean).join(" ")),
        (o.request.hook = r.bind(null, "request")),
        o
      );
    };
    const { Deprecation: i } = r(1),
      { getUserAgent: n } = r(20),
      o = r(4),
      s = r(77),
      a = o((e, t) => e.warn(t)),
      p = o((e, t) => e.warn(t)),
      u = o((e, t) => e.warn(t));
  },
  function(e) {
    e.exports = JSON.parse(
      '{"_from":"@octokit/rest@^16.43.1","_id":"@octokit/rest@16.43.1","_inBundle":false,"_integrity":"sha512-gfFKwRT/wFxq5qlNjnW2dh+qh74XgTQ2B179UX5K1HYCluioWj8Ndbgqw2PVqa1NnVJkGHp2ovMpVn/DImlmkw==","_location":"/@octokit/rest","_phantomChildren":{"@octokit/types":"2.8.0","deprecation":"2.3.1","once":"1.4.0"},"_requested":{"type":"range","registry":true,"raw":"@octokit/rest@^16.43.1","name":"@octokit/rest","escapedName":"@octokit%2frest","scope":"@octokit","rawSpec":"^16.43.1","saveSpec":null,"fetchSpec":"^16.43.1"},"_requiredBy":["/@actions/github"],"_resolved":"https://registry.npmjs.org/@octokit/rest/-/rest-16.43.1.tgz","_shasum":"3b11e7d1b1ac2bbeeb23b08a17df0b20947eda6b","_spec":"@octokit/rest@^16.43.1","_where":"/Users/mk/Code/github/orange-org/orange/node_modules/@actions/github","author":{"name":"Gregor Martynus","url":"https://github.com/gr2m"},"bugs":{"url":"https://github.com/octokit/rest.js/issues"},"bundleDependencies":false,"bundlesize":[{"path":"./dist/octokit-rest.min.js.gz","maxSize":"33 kB"}],"contributors":[{"name":"Mike de Boer","email":"info@mikedeboer.nl"},{"name":"Fabian Jakobs","email":"fabian@c9.io"},{"name":"Joe Gallo","email":"joe@brassafrax.com"},{"name":"Gregor Martynus","url":"https://github.com/gr2m"}],"dependencies":{"@octokit/auth-token":"^2.4.0","@octokit/plugin-paginate-rest":"^1.1.1","@octokit/plugin-request-log":"^1.0.0","@octokit/plugin-rest-endpoint-methods":"2.4.0","@octokit/request":"^5.2.0","@octokit/request-error":"^1.0.2","atob-lite":"^2.0.0","before-after-hook":"^2.0.0","btoa-lite":"^1.0.0","deprecation":"^2.0.0","lodash.get":"^4.4.2","lodash.set":"^4.3.2","lodash.uniq":"^4.5.0","octokit-pagination-methods":"^1.1.0","once":"^1.4.0","universal-user-agent":"^4.0.0"},"deprecated":false,"description":"GitHub REST API client for Node.js","devDependencies":{"@gimenete/type-writer":"^0.1.3","@octokit/auth":"^1.1.1","@octokit/fixtures-server":"^5.0.6","@octokit/graphql":"^4.2.0","@types/node":"^13.1.0","bundlesize":"^0.18.0","chai":"^4.1.2","compression-webpack-plugin":"^3.1.0","cypress":"^3.0.0","glob":"^7.1.2","http-proxy-agent":"^4.0.0","lodash.camelcase":"^4.3.0","lodash.merge":"^4.6.1","lodash.upperfirst":"^4.3.1","lolex":"^5.1.2","mkdirp":"^1.0.0","mocha":"^7.0.1","mustache":"^4.0.0","nock":"^11.3.3","npm-run-all":"^4.1.2","nyc":"^15.0.0","prettier":"^1.14.2","proxy":"^1.0.0","semantic-release":"^17.0.0","sinon":"^8.0.0","sinon-chai":"^3.0.0","sort-keys":"^4.0.0","string-to-arraybuffer":"^1.0.0","string-to-jsdoc-comment":"^1.0.0","typescript":"^3.3.1","webpack":"^4.0.0","webpack-bundle-analyzer":"^3.0.0","webpack-cli":"^3.0.0"},"files":["index.js","index.d.ts","lib","plugins"],"homepage":"https://github.com/octokit/rest.js#readme","keywords":["octokit","github","rest","api-client"],"license":"MIT","name":"@octokit/rest","nyc":{"ignore":["test"]},"publishConfig":{"access":"public"},"release":{"publish":["@semantic-release/npm",{"path":"@semantic-release/github","assets":["dist/*","!dist/*.map.gz"]}]},"repository":{"type":"git","url":"git+https://github.com/octokit/rest.js.git"},"scripts":{"build":"npm-run-all build:*","build:browser":"npm-run-all build:browser:*","build:browser:development":"webpack --mode development --entry . --output-library=Octokit --output=./dist/octokit-rest.js --profile --json > dist/bundle-stats.json","build:browser:production":"webpack --mode production --entry . --plugin=compression-webpack-plugin --output-library=Octokit --output-path=./dist --output-filename=octokit-rest.min.js --devtool source-map","build:ts":"npm run -s update-endpoints:typescript","coverage":"nyc report --reporter=html && open coverage/index.html","generate-bundle-report":"webpack-bundle-analyzer dist/bundle-stats.json --mode=static --no-open --report dist/bundle-report.html","lint":"prettier --check \'{lib,plugins,scripts,test}/**/*.{js,json,ts}\' \'docs/*.{js,json}\' \'docs/src/**/*\' index.js README.md package.json","lint:fix":"prettier --write \'{lib,plugins,scripts,test}/**/*.{js,json,ts}\' \'docs/*.{js,json}\' \'docs/src/**/*\' index.js README.md package.json","postvalidate:ts":"tsc --noEmit --target es6 test/typescript-validate.ts","prebuild:browser":"mkdirp dist/","pretest":"npm run -s lint","prevalidate:ts":"npm run -s build:ts","start-fixtures-server":"octokit-fixtures-server","test":"nyc mocha test/mocha-node-setup.js \\"test/*/**/*-test.js\\"","test:browser":"cypress run --browser chrome","update-endpoints":"npm-run-all update-endpoints:*","update-endpoints:fetch-json":"node scripts/update-endpoints/fetch-json","update-endpoints:typescript":"node scripts/update-endpoints/typescript","validate:ts":"tsc --target es6 --noImplicitAny index.d.ts"},"types":"index.d.ts","version":"16.43.1"}',
    );
  },
  function(e, t, r) {
    e.exports = function(e, t) {
      return i(e.includes(t) ? e : e.concat(t));
    };
    const i = r(21);
  },
  function(e, t, r) {
    e.exports = function(e, t) {
      if (t.authStrategy) {
        const r = t.authStrategy(t.auth);
        return e.hook.wrap("request", r.hook), void (e.auth = r);
      }
      if (!t.auth)
        return void (e.auth = () =>
          Promise.resolve({ type: "unauthenticated" }));
      const r = "string" == typeof t.auth && /^basic/.test(u(t.auth));
      if ("string" == typeof t.auth && !r) {
        const r = i(t.auth);
        return e.hook.wrap("request", r.hook), void (e.auth = r);
      }
      const [o, l] = r
        ? [
            c,
            'Setting the "new Octokit({ auth })" option to a Basic Auth string is deprecated. Use https://github.com/octokit/auth-basic.js instead. See (https://octokit.github.io/rest.js/#authentication)',
          ]
        : [
            d,
            'Setting the "new Octokit({ auth })" option to an object without also setting the "authStrategy" option is deprecated and will be removed in v17. See (https://octokit.github.io/rest.js/#authentication)',
          ];
      o(e.log, new n("[@octokit/rest] " + l)),
        (e.auth = () => Promise.resolve({ type: "deprecated", message: l })),
        p(t.auth);
      const g = { octokit: e, auth: t.auth };
      e.hook.before("request", s.bind(null, g)),
        e.hook.error("request", a.bind(null, g));
    };
    const { createTokenAuth: i } = r(80),
      { Deprecation: n } = r(1),
      o = r(4),
      s = r(81),
      a = r(83),
      p = r(84),
      u = r(23),
      c = o((e, t) => e.warn(t)),
      d = o((e, t) => e.warn(t));
  },
  function(e, t, r) {
    "use strict";
    async function i(e) {
      const t =
        3 === e.split(/\./).length
          ? "app"
          : /^v\d+\./.test(e)
          ? "installation"
          : "oauth";
      return { type: "token", token: e, tokenType: t };
    }
    async function n(e, t, r, i) {
      const n = t.endpoint.merge(r, i);
      return (
        (n.headers.authorization = (function(e) {
          return 3 === e.split(/\./).length ? `bearer ${e}` : `token ${e}`;
        })(e)),
        t(n)
      );
    }
    r.r(t),
      r.d(t, "createTokenAuth", function() {
        return o;
      });
    const o = function(e) {
      if (!e)
        throw new Error(
          "[@octokit/auth-token] No token passed to createTokenAuth",
        );
      if ("string" != typeof e)
        throw new Error(
          "[@octokit/auth-token] Token passed to createTokenAuth is not a string",
        );
      return (
        (e = e.replace(/^(token|bearer) +/i, "")),
        Object.assign(i.bind(null, e), { hook: n.bind(null, e) })
      );
    };
  },
  function(e, t, r) {
    e.exports = function(e, t) {
      if ("string" == typeof e.auth)
        return void (t.headers.authorization = n(e.auth));
      if (e.auth.username) {
        const r = i(`${e.auth.username}:${e.auth.password}`);
        return (
          (t.headers.authorization = `Basic ${r}`),
          void (e.otp && (t.headers["x-github-otp"] = e.otp))
        );
      }
      if (e.auth.clientId) {
        if (/\/applications\/:?[\w_]+\/tokens\/:?[\w_]+($|\?)/.test(t.url)) {
          const r = i(`${e.auth.clientId}:${e.auth.clientSecret}`);
          return void (t.headers.authorization = `Basic ${r}`);
        }
        return (
          (t.url += -1 === t.url.indexOf("?") ? "?" : "&"),
          void (t.url += `client_id=${e.auth.clientId}&client_secret=${e.auth.clientSecret}`)
        );
      }
      return Promise.resolve()
        .then(() => e.auth())
        .then(e => {
          t.headers.authorization = n(e);
        });
    };
    const i = r(22),
      n = r(23);
  },
  function(e, t) {
    e.exports = function(e) {
      return Buffer.from(e, "base64").toString("binary");
    };
  },
  function(e, t, r) {
    e.exports = function(e, t, r) {
      if (!t.headers) throw t;
      const n = /required/.test(t.headers["x-github-otp"] || "");
      if (401 !== t.status || !n) throw t;
      if (
        401 === t.status &&
        n &&
        t.request &&
        t.request.headers["x-github-otp"]
      ) {
        if (!e.otp)
          throw new i(
            "Invalid one-time password for two-factor authentication",
            401,
            { headers: t.headers, request: r },
          );
        delete e.otp;
      }
      if ("function" != typeof e.auth.on2fa)
        throw new i(
          "2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication",
          401,
          { headers: t.headers, request: r },
        );
      return Promise.resolve()
        .then(() => e.auth.on2fa())
        .then(t => {
          const i = Object.assign(r, {
            headers: Object.assign(r.headers, { "x-github-otp": t }),
          });
          return e.octokit.request(i).then(r => ((e.otp = t), r));
        });
    };
    const { RequestError: i } = r(16);
  },
  function(e, t) {
    e.exports = function(e) {
      if ("string" == typeof e) return;
      if ("function" == typeof e) return;
      if (e.username && e.password) return;
      if (e.clientId && e.clientSecret) return;
      throw new Error(`Invalid "auth" option: ${JSON.stringify(e)}`);
    };
  },
  function(e, t, r) {
    e.exports = function(e, t) {
      if (t.auth)
        return void (e.authenticate = () => {
          n(
            e.log,
            new i(
              '[@octokit/rest] octokit.authenticate() is deprecated and has no effect when "auth" option is set on Octokit constructor',
            ),
          );
        });
      const r = { octokit: e, auth: !1 };
      (e.authenticate = o.bind(null, r)),
        e.hook.before("request", s.bind(null, r)),
        e.hook.error("request", a.bind(null, r));
    };
    const { Deprecation: i } = r(1),
      n = r(4)((e, t) => e.warn(t)),
      o = r(86),
      s = r(87),
      a = r(89);
  },
  function(e, t, r) {
    e.exports = function(e, t) {
      if (
        (n(
          e.octokit.log,
          new i(
            '[@octokit/rest] octokit.authenticate() is deprecated. Use "auth" constructor option instead.',
          ),
        ),
        !t)
      )
        return void (e.auth = !1);
      switch (t.type) {
        case "basic":
          if (!t.username || !t.password)
            throw new Error(
              "Basic authentication requires both a username and password to be set",
            );
          break;
        case "oauth":
          if (!(t.token || (t.key && t.secret)))
            throw new Error(
              "OAuth2 authentication requires a token or key & secret to be set",
            );
          break;
        case "token":
        case "app":
          if (!t.token)
            throw new Error("Token authentication requires a token to be set");
          break;
        default:
          throw new Error(
            "Invalid authentication type, must be 'basic', 'oauth', 'token' or 'app'",
          );
      }
      e.auth = t;
    };
    const { Deprecation: i } = r(1),
      n = r(4)((e, t) => e.warn(t));
  },
  function(e, t, r) {
    e.exports = function(e, t) {
      if (!e.auth.type) return;
      if ("basic" === e.auth.type) {
        const r = i(`${e.auth.username}:${e.auth.password}`);
        return void (t.headers.authorization = `Basic ${r}`);
      }
      if ("token" === e.auth.type)
        return void (t.headers.authorization = `token ${e.auth.token}`);
      if ("app" === e.auth.type) {
        t.headers.authorization = `Bearer ${e.auth.token}`;
        const r = t.headers.accept
          .split(",")
          .concat("application/vnd.github.machine-man-preview+json");
        return void (t.headers.accept = n(r)
          .filter(Boolean)
          .join(","));
      }
      if (((t.url += -1 === t.url.indexOf("?") ? "?" : "&"), e.auth.token))
        return void (t.url += `access_token=${encodeURIComponent(
          e.auth.token,
        )}`);
      const r = encodeURIComponent(e.auth.key),
        o = encodeURIComponent(e.auth.secret);
      t.url += `client_id=${r}&client_secret=${o}`;
    };
    const i = r(22),
      n = r(88);
  },
  function(e, t) {
    var r = /^\[object .+?Constructor\]$/,
      i =
        "object" == typeof global &&
        global &&
        global.Object === Object &&
        global,
      n = "object" == typeof self && self && self.Object === Object && self,
      o = i || n || Function("return this")();
    function s(e, t) {
      return (
        !!(e ? e.length : 0) &&
        (function(e, t, r) {
          if (t != t)
            return (function(e, t, r, i) {
              var n = e.length,
                o = r + (i ? 1 : -1);
              for (; i ? o-- : ++o < n; ) if (t(e[o], o, e)) return o;
              return -1;
            })(e, p, r);
          var i = r - 1,
            n = e.length;
          for (; ++i < n; ) if (e[i] === t) return i;
          return -1;
        })(e, t, 0) > -1
      );
    }
    function a(e, t, r) {
      for (var i = -1, n = e ? e.length : 0; ++i < n; )
        if (r(t, e[i])) return !0;
      return !1;
    }
    function p(e) {
      return e != e;
    }
    function u(e, t) {
      return e.has(t);
    }
    function c(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function(e) {
          r[++t] = e;
        }),
        r
      );
    }
    var d,
      l = Array.prototype,
      g = Function.prototype,
      m = Object.prototype,
      h = o["__core-js_shared__"],
      y = (d = /[^.]+$/.exec((h && h.keys && h.keys.IE_PROTO) || ""))
        ? "Symbol(src)_1." + d
        : "",
      f = g.toString,
      _ = m.hasOwnProperty,
      b = m.toString,
      v = RegExp(
        "^" +
          f
            .call(_)
            .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?",
            ) +
          "$",
      ),
      w = l.splice,
      q = R(o, "Map"),
      E = R(o, "Set"),
      T = R(Object, "create");
    function k(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function j(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function P(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function C(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.__data__ = new P(); ++t < r; ) this.add(e[t]);
    }
    function O(e, t) {
      for (var r, i, n = e.length; n--; )
        if ((r = e[n][0]) === (i = t) || (r != r && i != i)) return n;
      return -1;
    }
    function S(e) {
      return (
        !(!F(e) || ((t = e), y && y in t)) &&
        ((function(e) {
          var t = F(e) ? b.call(e) : "";
          return "[object Function]" == t || "[object GeneratorFunction]" == t;
        })(e) ||
        (function(e) {
          var t = !1;
          if (null != e && "function" != typeof e.toString)
            try {
              t = !!(e + "");
            } catch (e) {}
          return t;
        })(e)
          ? v
          : r
        ).test(
          (function(e) {
            if (null != e) {
              try {
                return f.call(e);
              } catch (e) {}
              try {
                return e + "";
              } catch (e) {}
            }
            return "";
          })(e),
        )
      );
      var t;
    }
    (k.prototype.clear = function() {
      this.__data__ = T ? T(null) : {};
    }),
      (k.prototype.delete = function(e) {
        return this.has(e) && delete this.__data__[e];
      }),
      (k.prototype.get = function(e) {
        var t = this.__data__;
        if (T) {
          var r = t[e];
          return "__lodash_hash_undefined__" === r ? void 0 : r;
        }
        return _.call(t, e) ? t[e] : void 0;
      }),
      (k.prototype.has = function(e) {
        var t = this.__data__;
        return T ? void 0 !== t[e] : _.call(t, e);
      }),
      (k.prototype.set = function(e, t) {
        return (
          (this.__data__[e] =
            T && void 0 === t ? "__lodash_hash_undefined__" : t),
          this
        );
      }),
      (j.prototype.clear = function() {
        this.__data__ = [];
      }),
      (j.prototype.delete = function(e) {
        var t = this.__data__,
          r = O(t, e);
        return !(r < 0) && (r == t.length - 1 ? t.pop() : w.call(t, r, 1), !0);
      }),
      (j.prototype.get = function(e) {
        var t = this.__data__,
          r = O(t, e);
        return r < 0 ? void 0 : t[r][1];
      }),
      (j.prototype.has = function(e) {
        return O(this.__data__, e) > -1;
      }),
      (j.prototype.set = function(e, t) {
        var r = this.__data__,
          i = O(r, e);
        return i < 0 ? r.push([e, t]) : (r[i][1] = t), this;
      }),
      (P.prototype.clear = function() {
        this.__data__ = { hash: new k(), map: new (q || j)(), string: new k() };
      }),
      (P.prototype.delete = function(e) {
        return x(this, e).delete(e);
      }),
      (P.prototype.get = function(e) {
        return x(this, e).get(e);
      }),
      (P.prototype.has = function(e) {
        return x(this, e).has(e);
      }),
      (P.prototype.set = function(e, t) {
        return x(this, e).set(e, t), this;
      }),
      (C.prototype.add = C.prototype.push = function(e) {
        return this.__data__.set(e, "__lodash_hash_undefined__"), this;
      }),
      (C.prototype.has = function(e) {
        return this.__data__.has(e);
      });
    var A =
      E && 1 / c(new E([, -0]))[1] == 1 / 0
        ? function(e) {
            return new E(e);
          }
        : function() {};
    function x(e, t) {
      var r,
        i,
        n = e.__data__;
      return ("string" == (i = typeof (r = t)) ||
      "number" == i ||
      "symbol" == i ||
      "boolean" == i
      ? "__proto__" !== r
      : null === r)
        ? n["string" == typeof t ? "string" : "hash"]
        : n.map;
    }
    function R(e, t) {
      var r = (function(e, t) {
        return null == e ? void 0 : e[t];
      })(e, t);
      return S(r) ? r : void 0;
    }
    function F(e) {
      var t = typeof e;
      return !!e && ("object" == t || "function" == t);
    }
    e.exports = function(e) {
      return e && e.length
        ? (function(e, t, r) {
            var i = -1,
              n = s,
              o = e.length,
              p = !0,
              d = [],
              l = d;
            if (r) (p = !1), (n = a);
            else if (o >= 200) {
              var g = t ? null : A(e);
              if (g) return c(g);
              (p = !1), (n = u), (l = new C());
            } else l = t ? [] : d;
            e: for (; ++i < o; ) {
              var m = e[i],
                h = t ? t(m) : m;
              if (((m = r || 0 !== m ? m : 0), p && h == h)) {
                for (var y = l.length; y--; ) if (l[y] === h) continue e;
                t && l.push(h), d.push(m);
              } else n(l, h, r) || (l !== d && l.push(h), d.push(m));
            }
            return d;
          })(e)
        : [];
    };
  },
  function(e, t, r) {
    e.exports = function(e, t, r) {
      if (!t.headers) throw t;
      const n = /required/.test(t.headers["x-github-otp"] || "");
      if (401 !== t.status || !n) throw t;
      if (
        401 === t.status &&
        n &&
        t.request &&
        t.request.headers["x-github-otp"]
      )
        throw new i(
          "Invalid one-time password for two-factor authentication",
          401,
          { headers: t.headers, request: r },
        );
      if ("function" != typeof e.auth.on2fa)
        throw new i(
          "2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication",
          401,
          { headers: t.headers, request: r },
        );
      return Promise.resolve()
        .then(() => e.auth.on2fa())
        .then(t => {
          const i = Object.assign(r, {
            headers: Object.assign({ "x-github-otp": t }, r.headers),
          });
          return e.octokit.request(i);
        });
    };
    const { RequestError: i } = r(16);
  },
  function(e, t, r) {
    e.exports = function(e) {
      Object.assign(e, i(e));
    };
    const { paginateRest: i } = r(91);
  },
  function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "paginateRest", function() {
        return s;
      });
    const i = [
      /^\/search\//,
      /^\/repos\/[^/]+\/[^/]+\/commits\/[^/]+\/(check-runs|check-suites)([^/]|$)/,
      /^\/installation\/repositories([^/]|$)/,
      /^\/user\/installations([^/]|$)/,
      /^\/repos\/[^/]+\/[^/]+\/actions\/secrets([^/]|$)/,
      /^\/repos\/[^/]+\/[^/]+\/actions\/workflows(\/[^/]+\/runs)?([^/]|$)/,
      /^\/repos\/[^/]+\/[^/]+\/actions\/runs(\/[^/]+\/(artifacts|jobs))?([^/]|$)/,
    ];
    function n(e, t, r) {
      const n = e.request.endpoint(t, r),
        o = n.method,
        s = n.headers;
      let a = n.url;
      return {
        [Symbol.asyncIterator]: () => ({
          next: () =>
            a
              ? e.request({ method: o, url: a, headers: s }).then(
                  t => (
                    (function(e, t, r) {
                      const n = t.replace(
                        e.request.endpoint.DEFAULTS.baseUrl,
                        "",
                      );
                      if (!i.find(e => e.test(n))) return;
                      const o = r.data.incomplete_results,
                        s = r.data.repository_selection,
                        a = r.data.total_count;
                      delete r.data.incomplete_results,
                        delete r.data.repository_selection,
                        delete r.data.total_count;
                      const p = Object.keys(r.data)[0],
                        u = r.data[p];
                      (r.data = u),
                        void 0 !== o && (r.data.incomplete_results = o),
                        void 0 !== s && (r.data.repository_selection = s),
                        (r.data.total_count = a),
                        Object.defineProperty(r.data, p, {
                          get: () => (
                            e.log.warn(
                              `[@octokit/paginate-rest] "response.data.${p}" is deprecated for "GET ${n}". Get the results directly from "response.data"`,
                            ),
                            Array.from(u)
                          ),
                        });
                    })(e, a, t),
                    (a = ((t.headers.link || "").match(
                      /<([^>]+)>;\s*rel="next"/,
                    ) || [])[1]),
                    { value: t }
                  ),
                )
              : Promise.resolve({ done: !0 }),
        }),
      };
    }
    function o(e, t, r, i) {
      return (
        "function" == typeof r && ((i = r), (r = void 0)),
        (function e(t, r, i, n) {
          return i.next().then(o => {
            if (o.done) return r;
            let s = !1;
            return (
              (r = r.concat(
                n
                  ? n(o.value, function() {
                      s = !0;
                    })
                  : o.value.data,
              )),
              s ? r : e(t, r, i, n)
            );
          });
        })(e, [], n(e, t, r)[Symbol.asyncIterator](), i)
      );
    }
    function s(e) {
      return {
        paginate: Object.assign(o.bind(null, e), { iterator: n.bind(null, e) }),
      };
    }
    s.VERSION = "1.1.2";
  },
  function(e, t, r) {
    e.exports = function(e) {
      e.hook.before("request", i.bind(null, e));
    };
    const i = r(93);
  },
  function(e, t, r) {
    "use strict";
    e.exports = function(e, t) {
      if (!t.request.validate) return;
      const { validate: r } = t.request;
      return (
        Object.keys(r).forEach(e => {
          const s = n(r, e),
            a = s.type;
          let p,
            u,
            c = !0,
            d = !1;
          /\./.test(e) &&
            ((p = e.replace(/\.[^.]+$/, "")),
            (d = "[]" === p.slice(-2)),
            d && (p = p.slice(0, -2)),
            (u = n(t, p)),
            (c = "headers" === p || ("object" == typeof u && null !== u))),
            (d
              ? (n(t, p) || []).map(t => t[e.split(/\./).pop()])
              : [n(t, e)]
            ).forEach((r, n) => {
              const p = void 0 !== r,
                u = null === r,
                l = d ? e.replace(/\[\]/, `[${n}]`) : e;
              if ((s.required || p) && c && (!s.allowNull || !u)) {
                if (!s.allowNull && u)
                  throw new i(`'${l}' cannot be null`, 400, { request: t });
                if (s.required && !p)
                  throw new i(
                    `Empty value for parameter '${l}': ${JSON.stringify(r)}`,
                    400,
                    { request: t },
                  );
                if ("integer" === a) {
                  const e = r;
                  if (((r = parseInt(r, 10)), isNaN(r)))
                    throw new i(
                      `Invalid value for parameter '${l}': ${JSON.stringify(
                        e,
                      )} is NaN`,
                      400,
                      { request: t },
                    );
                }
                if (s.enum && -1 === s.enum.indexOf(String(r)))
                  throw new i(
                    `Invalid value for parameter '${l}': ${JSON.stringify(r)}`,
                    400,
                    { request: t },
                  );
                if (s.validation) {
                  if (!new RegExp(s.validation).test(r))
                    throw new i(
                      `Invalid value for parameter '${l}': ${JSON.stringify(
                        r,
                      )}`,
                      400,
                      { request: t },
                    );
                }
                if ("object" === a && "string" == typeof r)
                  try {
                    r = JSON.parse(r);
                  } catch (e) {
                    throw new i(
                      `JSON parse error of value for parameter '${l}': ${JSON.stringify(
                        r,
                      )}`,
                      400,
                      { request: t },
                    );
                  }
                o(t, s.mapTo || l, r);
              }
            });
        }),
        t
      );
    };
    const { RequestError: i } = r(16),
      n = r(94),
      o = r(95);
  },
  function(e, t) {
    var r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      i = /^\w*$/,
      n = /^\./,
      o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      s = /\\(\\)?/g,
      a = /^\[object .+?Constructor\]$/,
      p =
        "object" == typeof global &&
        global &&
        global.Object === Object &&
        global,
      u = "object" == typeof self && self && self.Object === Object && self,
      c = p || u || Function("return this")();
    var d,
      l = Array.prototype,
      g = Function.prototype,
      m = Object.prototype,
      h = c["__core-js_shared__"],
      y = (d = /[^.]+$/.exec((h && h.keys && h.keys.IE_PROTO) || ""))
        ? "Symbol(src)_1." + d
        : "",
      f = g.toString,
      _ = m.hasOwnProperty,
      b = m.toString,
      v = RegExp(
        "^" +
          f
            .call(_)
            .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?",
            ) +
          "$",
      ),
      w = c.Symbol,
      q = l.splice,
      E = F(c, "Map"),
      T = F(Object, "create"),
      k = w ? w.prototype : void 0,
      j = k ? k.toString : void 0;
    function P(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function C(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function O(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function S(e, t) {
      for (var r, i, n = e.length; n--; )
        if ((r = e[n][0]) === (i = t) || (r != r && i != i)) return n;
      return -1;
    }
    function A(e, t) {
      for (
        var n,
          o = 0,
          s = (t = (function(e, t) {
            if (U(e)) return !1;
            var n = typeof e;
            if (
              "number" == n ||
              "symbol" == n ||
              "boolean" == n ||
              null == e ||
              $(e)
            )
              return !0;
            return i.test(e) || !r.test(e) || (null != t && (e in Object(t)));
          })(t, e)
            ? [t]
            : U((n = t))
            ? n
            : G(n)).length;
        null != e && o < s;

      )
        e = e[D(t[o++])];
      return o && o == s ? e : void 0;
    }
    function x(e) {
      return (
        !(!I(e) || ((t = e), y && y in t)) &&
        ((function(e) {
          var t = I(e) ? b.call(e) : "";
          return "[object Function]" == t || "[object GeneratorFunction]" == t;
        })(e) ||
        (function(e) {
          var t = !1;
          if (null != e && "function" != typeof e.toString)
            try {
              t = !!(e + "");
            } catch (e) {}
          return t;
        })(e)
          ? v
          : a
        ).test(
          (function(e) {
            if (null != e) {
              try {
                return f.call(e);
              } catch (e) {}
              try {
                return e + "";
              } catch (e) {}
            }
            return "";
          })(e),
        )
      );
      var t;
    }
    function R(e, t) {
      var r,
        i,
        n = e.__data__;
      return ("string" == (i = typeof (r = t)) ||
      "number" == i ||
      "symbol" == i ||
      "boolean" == i
      ? "__proto__" !== r
      : null === r)
        ? n["string" == typeof t ? "string" : "hash"]
        : n.map;
    }
    function F(e, t) {
      var r = (function(e, t) {
        return null == e ? void 0 : e[t];
      })(e, t);
      return x(r) ? r : void 0;
    }
    (P.prototype.clear = function() {
      this.__data__ = T ? T(null) : {};
    }),
      (P.prototype.delete = function(e) {
        return this.has(e) && delete this.__data__[e];
      }),
      (P.prototype.get = function(e) {
        var t = this.__data__;
        if (T) {
          var r = t[e];
          return "__lodash_hash_undefined__" === r ? void 0 : r;
        }
        return _.call(t, e) ? t[e] : void 0;
      }),
      (P.prototype.has = function(e) {
        var t = this.__data__;
        return T ? void 0 !== t[e] : _.call(t, e);
      }),
      (P.prototype.set = function(e, t) {
        return (
          (this.__data__[e] =
            T && void 0 === t ? "__lodash_hash_undefined__" : t),
          this
        );
      }),
      (C.prototype.clear = function() {
        this.__data__ = [];
      }),
      (C.prototype.delete = function(e) {
        var t = this.__data__,
          r = S(t, e);
        return !(r < 0) && (r == t.length - 1 ? t.pop() : q.call(t, r, 1), !0);
      }),
      (C.prototype.get = function(e) {
        var t = this.__data__,
          r = S(t, e);
        return r < 0 ? void 0 : t[r][1];
      }),
      (C.prototype.has = function(e) {
        return S(this.__data__, e) > -1;
      }),
      (C.prototype.set = function(e, t) {
        var r = this.__data__,
          i = S(r, e);
        return i < 0 ? r.push([e, t]) : (r[i][1] = t), this;
      }),
      (O.prototype.clear = function() {
        this.__data__ = { hash: new P(), map: new (E || C)(), string: new P() };
      }),
      (O.prototype.delete = function(e) {
        return R(this, e).delete(e);
      }),
      (O.prototype.get = function(e) {
        return R(this, e).get(e);
      }),
      (O.prototype.has = function(e) {
        return R(this, e).has(e);
      }),
      (O.prototype.set = function(e, t) {
        return R(this, e).set(e, t), this;
      });
    var G = L(function(e) {
      var t;
      e =
        null == (t = e)
          ? ""
          : (function(e) {
              if ("string" == typeof e) return e;
              if ($(e)) return j ? j.call(e) : "";
              var t = e + "";
              return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
            })(t);
      var r = [];
      return (
        n.test(e) && r.push(""),
        e.replace(o, function(e, t, i, n) {
          r.push(i ? n.replace(s, "$1") : t || e);
        }),
        r
      );
    });
    function D(e) {
      if ("string" == typeof e || $(e)) return e;
      var t = e + "";
      return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
    }
    function L(e, t) {
      if ("function" != typeof e || (t && "function" != typeof t))
        throw new TypeError("Expected a function");
      var r = function() {
        var i = arguments,
          n = t ? t.apply(this, i) : i[0],
          o = r.cache;
        if (o.has(n)) return o.get(n);
        var s = e.apply(this, i);
        return (r.cache = o.set(n, s)), s;
      };
      return (r.cache = new (L.Cache || O)()), r;
    }
    L.Cache = O;
    var U = Array.isArray;
    function I(e) {
      var t = typeof e;
      return !!e && ("object" == t || "function" == t);
    }
    function $(e) {
      return (
        "symbol" == typeof e ||
        ((function(e) {
          return !!e && "object" == typeof e;
        })(e) &&
          "[object Symbol]" == b.call(e))
      );
    }
    e.exports = function(e, t, r) {
      var i = null == e ? void 0 : A(e, t);
      return void 0 === i ? r : i;
    };
  },
  function(e, t) {
    var r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      i = /^\w*$/,
      n = /^\./,
      o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      s = /\\(\\)?/g,
      a = /^\[object .+?Constructor\]$/,
      p = /^(?:0|[1-9]\d*)$/,
      u =
        "object" == typeof global &&
        global &&
        global.Object === Object &&
        global,
      c = "object" == typeof self && self && self.Object === Object && self,
      d = u || c || Function("return this")();
    var l,
      g = Array.prototype,
      m = Function.prototype,
      h = Object.prototype,
      y = d["__core-js_shared__"],
      f = (l = /[^.]+$/.exec((y && y.keys && y.keys.IE_PROTO) || ""))
        ? "Symbol(src)_1." + l
        : "",
      _ = m.toString,
      b = h.hasOwnProperty,
      v = h.toString,
      w = RegExp(
        "^" +
          _.call(b)
            .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?",
            ) +
          "$",
      ),
      q = d.Symbol,
      E = g.splice,
      T = D(d, "Map"),
      k = D(Object, "create"),
      j = q ? q.prototype : void 0,
      P = j ? j.toString : void 0;
    function C(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function O(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function S(e) {
      var t = -1,
        r = e ? e.length : 0;
      for (this.clear(); ++t < r; ) {
        var i = e[t];
        this.set(i[0], i[1]);
      }
    }
    function A(e, t, r) {
      var i = e[t];
      (b.call(e, t) && B(i, r) && (void 0 !== r || t in e)) || (e[t] = r);
    }
    function x(e, t) {
      for (var r = e.length; r--; ) if (B(e[r][0], t)) return r;
      return -1;
    }
    function R(e) {
      return (
        !(!N(e) || ((t = e), f && f in t)) &&
        ((function(e) {
          var t = N(e) ? v.call(e) : "";
          return "[object Function]" == t || "[object GeneratorFunction]" == t;
        })(e) ||
        (function(e) {
          var t = !1;
          if (null != e && "function" != typeof e.toString)
            try {
              t = !!(e + "");
            } catch (e) {}
          return t;
        })(e)
          ? w
          : a
        ).test(
          (function(e) {
            if (null != e) {
              try {
                return _.call(e);
              } catch (e) {}
              try {
                return e + "";
              } catch (e) {}
            }
            return "";
          })(e),
        )
      );
      var t;
    }
    function F(e, t, n, o) {
      if (!N(e)) return e;
      for (
        var s = -1,
          a = (t = (function(e, t) {
            if (H(e)) return !1;
            var n = typeof e;
            if (
              "number" == n ||
              "symbol" == n ||
              "boolean" == n ||
              null == e ||
              M(e)
            )
              return !0;
            return i.test(e) || !r.test(e) || (null != t && (e in Object(t)));
          })(t, e)
            ? [t]
            : (function(e) {
                return H(e) ? e : U(e);
              })(t)).length,
          p = a - 1,
          u = e;
        null != u && ++s < a;

      ) {
        var c = I(t[s]),
          d = n;
        if (s != p) {
          var l = u[c];
          void 0 === (d = o ? o(l, c, u) : void 0) &&
            (d = N(l) ? l : L(t[s + 1]) ? [] : {});
        }
        A(u, c, d), (u = u[c]);
      }
      return e;
    }
    function G(e, t) {
      var r,
        i,
        n = e.__data__;
      return ("string" == (i = typeof (r = t)) ||
      "number" == i ||
      "symbol" == i ||
      "boolean" == i
      ? "__proto__" !== r
      : null === r)
        ? n["string" == typeof t ? "string" : "hash"]
        : n.map;
    }
    function D(e, t) {
      var r = (function(e, t) {
        return null == e ? void 0 : e[t];
      })(e, t);
      return R(r) ? r : void 0;
    }
    function L(e, t) {
      return (
        !!(t = null == t ? 9007199254740991 : t) &&
        ("number" == typeof e || p.test(e)) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
      );
    }
    (C.prototype.clear = function() {
      this.__data__ = k ? k(null) : {};
    }),
      (C.prototype.delete = function(e) {
        return this.has(e) && delete this.__data__[e];
      }),
      (C.prototype.get = function(e) {
        var t = this.__data__;
        if (k) {
          var r = t[e];
          return "__lodash_hash_undefined__" === r ? void 0 : r;
        }
        return b.call(t, e) ? t[e] : void 0;
      }),
      (C.prototype.has = function(e) {
        var t = this.__data__;
        return k ? void 0 !== t[e] : b.call(t, e);
      }),
      (C.prototype.set = function(e, t) {
        return (
          (this.__data__[e] =
            k && void 0 === t ? "__lodash_hash_undefined__" : t),
          this
        );
      }),
      (O.prototype.clear = function() {
        this.__data__ = [];
      }),
      (O.prototype.delete = function(e) {
        var t = this.__data__,
          r = x(t, e);
        return !(r < 0) && (r == t.length - 1 ? t.pop() : E.call(t, r, 1), !0);
      }),
      (O.prototype.get = function(e) {
        var t = this.__data__,
          r = x(t, e);
        return r < 0 ? void 0 : t[r][1];
      }),
      (O.prototype.has = function(e) {
        return x(this.__data__, e) > -1;
      }),
      (O.prototype.set = function(e, t) {
        var r = this.__data__,
          i = x(r, e);
        return i < 0 ? r.push([e, t]) : (r[i][1] = t), this;
      }),
      (S.prototype.clear = function() {
        this.__data__ = { hash: new C(), map: new (T || O)(), string: new C() };
      }),
      (S.prototype.delete = function(e) {
        return G(this, e).delete(e);
      }),
      (S.prototype.get = function(e) {
        return G(this, e).get(e);
      }),
      (S.prototype.has = function(e) {
        return G(this, e).has(e);
      }),
      (S.prototype.set = function(e, t) {
        return G(this, e).set(e, t), this;
      });
    var U = $(function(e) {
      var t;
      e =
        null == (t = e)
          ? ""
          : (function(e) {
              if ("string" == typeof e) return e;
              if (M(e)) return P ? P.call(e) : "";
              var t = e + "";
              return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
            })(t);
      var r = [];
      return (
        n.test(e) && r.push(""),
        e.replace(o, function(e, t, i, n) {
          r.push(i ? n.replace(s, "$1") : t || e);
        }),
        r
      );
    });
    function I(e) {
      if ("string" == typeof e || M(e)) return e;
      var t = e + "";
      return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
    }
    function $(e, t) {
      if ("function" != typeof e || (t && "function" != typeof t))
        throw new TypeError("Expected a function");
      var r = function() {
        var i = arguments,
          n = t ? t.apply(this, i) : i[0],
          o = r.cache;
        if (o.has(n)) return o.get(n);
        var s = e.apply(this, i);
        return (r.cache = o.set(n, s)), s;
      };
      return (r.cache = new ($.Cache || S)()), r;
    }
    function B(e, t) {
      return e === t || (e != e && t != t);
    }
    $.Cache = S;
    var H = Array.isArray;
    function N(e) {
      var t = typeof e;
      return !!e && ("object" == t || "function" == t);
    }
    function M(e) {
      return (
        "symbol" == typeof e ||
        ((function(e) {
          return !!e && "object" == typeof e;
        })(e) &&
          "[object Symbol]" == v.call(e))
      );
    }
    e.exports = function(e, t, r) {
      return null == e ? e : F(e, t, r);
    };
  },
  function(e, t, r) {
    e.exports = function(e) {
      (e.getFirstPage = r(97).bind(null, e)),
        (e.getLastPage = r(99).bind(null, e)),
        (e.getNextPage = r(100).bind(null, e)),
        (e.getPreviousPage = r(101).bind(null, e)),
        (e.hasFirstPage = r(102)),
        (e.hasLastPage = r(103)),
        (e.hasNextPage = r(104)),
        (e.hasPreviousPage = r(105));
    };
  },
  function(e, t, r) {
    e.exports = function(e, t, r) {
      return i(e, t, "first", r);
    };
    const i = r(14);
  },
  function(e, t) {
    e.exports = class extends Error {
      constructor(e, t, r) {
        super(e),
          Error.captureStackTrace &&
            Error.captureStackTrace(this, this.constructor),
          (this.name = "HttpError"),
          (this.code = t),
          (this.headers = r);
      }
    };
  },
  function(e, t, r) {
    e.exports = function(e, t, r) {
      return i(e, t, "last", r);
    };
    const i = r(14);
  },
  function(e, t, r) {
    e.exports = function(e, t, r) {
      return i(e, t, "next", r);
    };
    const i = r(14);
  },
  function(e, t, r) {
    e.exports = function(e, t, r) {
      return i(e, t, "prev", r);
    };
    const i = r(14);
  },
  function(e, t, r) {
    e.exports = function(e) {
      return (
        i(
          "octokit.hasFirstPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.",
        ),
        n(e).first
      );
    };
    const i = r(9),
      n = r(10);
  },
  function(e, t, r) {
    e.exports = function(e) {
      return (
        i(
          "octokit.hasLastPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.",
        ),
        n(e).last
      );
    };
    const i = r(9),
      n = r(10);
  },
  function(e, t, r) {
    e.exports = function(e) {
      return (
        i(
          "octokit.hasNextPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.",
        ),
        n(e).next
      );
    };
    const i = r(9),
      n = r(10);
  },
  function(e, t, r) {
    e.exports = function(e) {
      return (
        i(
          "octokit.hasPreviousPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.",
        ),
        n(e).prev
      );
    };
    const i = r(9),
      n = r(10);
  },
  function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    const i = r(24),
      n = r(12);
    t.Context = class {
      constructor() {
        if (((this.payload = {}), process.env.GITHUB_EVENT_PATH))
          if (i.existsSync(process.env.GITHUB_EVENT_PATH))
            this.payload = JSON.parse(
              i.readFileSync(process.env.GITHUB_EVENT_PATH, {
                encoding: "utf8",
              }),
            );
          else {
            const e = process.env.GITHUB_EVENT_PATH;
            process.stdout.write(
              `GITHUB_EVENT_PATH ${e} does not exist${n.EOL}`,
            );
          }
        (this.eventName = process.env.GITHUB_EVENT_NAME),
          (this.sha = process.env.GITHUB_SHA),
          (this.ref = process.env.GITHUB_REF),
          (this.workflow = process.env.GITHUB_WORKFLOW),
          (this.action = process.env.GITHUB_ACTION),
          (this.actor = process.env.GITHUB_ACTOR);
      }
      get issue() {
        const e = this.payload;
        return Object.assign(Object.assign({}, this.repo), {
          number: (e.issue || e.pull_request || e).number,
        });
      }
      get repo() {
        if (process.env.GITHUB_REPOSITORY) {
          const [e, t] = process.env.GITHUB_REPOSITORY.split("/");
          return { owner: e, repo: t };
        }
        if (this.payload.repository)
          return {
            owner: this.payload.repository.owner.login,
            repo: this.payload.repository.name,
          };
        throw new Error(
          "context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'",
        );
      }
    };
  },
  function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    const i = r(7),
      n = r(11),
      o = r(15),
      s = r(108);
    let a;
    var p, u, c;
    !(function(e) {
      (e[(e.OK = 200)] = "OK"),
        (e[(e.MultipleChoices = 300)] = "MultipleChoices"),
        (e[(e.MovedPermanently = 301)] = "MovedPermanently"),
        (e[(e.ResourceMoved = 302)] = "ResourceMoved"),
        (e[(e.SeeOther = 303)] = "SeeOther"),
        (e[(e.NotModified = 304)] = "NotModified"),
        (e[(e.UseProxy = 305)] = "UseProxy"),
        (e[(e.SwitchProxy = 306)] = "SwitchProxy"),
        (e[(e.TemporaryRedirect = 307)] = "TemporaryRedirect"),
        (e[(e.PermanentRedirect = 308)] = "PermanentRedirect"),
        (e[(e.BadRequest = 400)] = "BadRequest"),
        (e[(e.Unauthorized = 401)] = "Unauthorized"),
        (e[(e.PaymentRequired = 402)] = "PaymentRequired"),
        (e[(e.Forbidden = 403)] = "Forbidden"),
        (e[(e.NotFound = 404)] = "NotFound"),
        (e[(e.MethodNotAllowed = 405)] = "MethodNotAllowed"),
        (e[(e.NotAcceptable = 406)] = "NotAcceptable"),
        (e[(e.ProxyAuthenticationRequired = 407)] =
          "ProxyAuthenticationRequired"),
        (e[(e.RequestTimeout = 408)] = "RequestTimeout"),
        (e[(e.Conflict = 409)] = "Conflict"),
        (e[(e.Gone = 410)] = "Gone"),
        (e[(e.TooManyRequests = 429)] = "TooManyRequests"),
        (e[(e.InternalServerError = 500)] = "InternalServerError"),
        (e[(e.NotImplemented = 501)] = "NotImplemented"),
        (e[(e.BadGateway = 502)] = "BadGateway"),
        (e[(e.ServiceUnavailable = 503)] = "ServiceUnavailable"),
        (e[(e.GatewayTimeout = 504)] = "GatewayTimeout");
    })((p = t.HttpCodes || (t.HttpCodes = {}))),
      (function(e) {
        (e.Accept = "accept"), (e.ContentType = "content-type");
      })((u = t.Headers || (t.Headers = {}))),
      (function(e) {
        e.ApplicationJson = "application/json";
      })((c = t.MediaTypes || (t.MediaTypes = {}))),
      (t.getProxyUrl = function(e) {
        let t = s.getProxyUrl(i.parse(e));
        return t ? t.href : "";
      });
    const d = [
        p.MovedPermanently,
        p.ResourceMoved,
        p.SeeOther,
        p.TemporaryRedirect,
        p.PermanentRedirect,
      ],
      l = [p.BadGateway, p.ServiceUnavailable, p.GatewayTimeout],
      g = ["OPTIONS", "GET", "DELETE", "HEAD"];
    class m {
      constructor(e) {
        this.message = e;
      }
      readBody() {
        return new Promise(async (e, t) => {
          let r = Buffer.alloc(0);
          this.message.on("data", e => {
            r = Buffer.concat([r, e]);
          }),
            this.message.on("end", () => {
              e(r.toString());
            });
        });
      }
    }
    (t.HttpClientResponse = m),
      (t.isHttps = function(e) {
        return "https:" === i.parse(e).protocol;
      });
    class h {
      constructor(e, t, r) {
        (this._ignoreSslError = !1),
          (this._allowRedirects = !0),
          (this._allowRedirectDowngrade = !1),
          (this._maxRedirects = 50),
          (this._allowRetries = !1),
          (this._maxRetries = 1),
          (this._keepAlive = !1),
          (this._disposed = !1),
          (this.userAgent = e),
          (this.handlers = t || []),
          (this.requestOptions = r),
          r &&
            (null != r.ignoreSslError &&
              (this._ignoreSslError = r.ignoreSslError),
            (this._socketTimeout = r.socketTimeout),
            null != r.allowRedirects &&
              (this._allowRedirects = r.allowRedirects),
            null != r.allowRedirectDowngrade &&
              (this._allowRedirectDowngrade = r.allowRedirectDowngrade),
            null != r.maxRedirects &&
              (this._maxRedirects = Math.max(r.maxRedirects, 0)),
            null != r.keepAlive && (this._keepAlive = r.keepAlive),
            null != r.allowRetries && (this._allowRetries = r.allowRetries),
            null != r.maxRetries && (this._maxRetries = r.maxRetries));
      }
      options(e, t) {
        return this.request("OPTIONS", e, null, t || {});
      }
      get(e, t) {
        return this.request("GET", e, null, t || {});
      }
      del(e, t) {
        return this.request("DELETE", e, null, t || {});
      }
      post(e, t, r) {
        return this.request("POST", e, t, r || {});
      }
      patch(e, t, r) {
        return this.request("PATCH", e, t, r || {});
      }
      put(e, t, r) {
        return this.request("PUT", e, t, r || {});
      }
      head(e, t) {
        return this.request("HEAD", e, null, t || {});
      }
      sendStream(e, t, r, i) {
        return this.request(e, t, r, i);
      }
      async getJson(e, t = {}) {
        t[u.Accept] = this._getExistingOrDefaultHeader(
          t,
          u.Accept,
          c.ApplicationJson,
        );
        let r = await this.get(e, t);
        return this._processResponse(r, this.requestOptions);
      }
      async postJson(e, t, r = {}) {
        let i = JSON.stringify(t, null, 2);
        (r[u.Accept] = this._getExistingOrDefaultHeader(
          r,
          u.Accept,
          c.ApplicationJson,
        )),
          (r[u.ContentType] = this._getExistingOrDefaultHeader(
            r,
            u.ContentType,
            c.ApplicationJson,
          ));
        let n = await this.post(e, i, r);
        return this._processResponse(n, this.requestOptions);
      }
      async putJson(e, t, r = {}) {
        let i = JSON.stringify(t, null, 2);
        (r[u.Accept] = this._getExistingOrDefaultHeader(
          r,
          u.Accept,
          c.ApplicationJson,
        )),
          (r[u.ContentType] = this._getExistingOrDefaultHeader(
            r,
            u.ContentType,
            c.ApplicationJson,
          ));
        let n = await this.put(e, i, r);
        return this._processResponse(n, this.requestOptions);
      }
      async patchJson(e, t, r = {}) {
        let i = JSON.stringify(t, null, 2);
        (r[u.Accept] = this._getExistingOrDefaultHeader(
          r,
          u.Accept,
          c.ApplicationJson,
        )),
          (r[u.ContentType] = this._getExistingOrDefaultHeader(
            r,
            u.ContentType,
            c.ApplicationJson,
          ));
        let n = await this.patch(e, i, r);
        return this._processResponse(n, this.requestOptions);
      }
      async request(e, t, r, n) {
        if (this._disposed)
          throw new Error("Client has already been disposed.");
        let o,
          s = i.parse(t),
          a = this._prepareRequest(e, s, n),
          u =
            this._allowRetries && -1 != g.indexOf(e) ? this._maxRetries + 1 : 1,
          c = 0;
        for (; c < u; ) {
          if (
            ((o = await this.requestRaw(a, r)),
            o && o.message && o.message.statusCode === p.Unauthorized)
          ) {
            let e;
            for (let t = 0; t < this.handlers.length; t++)
              if (this.handlers[t].canHandleAuthentication(o)) {
                e = this.handlers[t];
                break;
              }
            return e ? e.handleAuthentication(this, a, r) : o;
          }
          let t = this._maxRedirects;
          for (
            ;
            -1 != d.indexOf(o.message.statusCode) &&
            this._allowRedirects &&
            t > 0;

          ) {
            const p = o.message.headers.location;
            if (!p) break;
            let u = i.parse(p);
            if (
              "https:" == s.protocol &&
              s.protocol != u.protocol &&
              !this._allowRedirectDowngrade
            )
              throw new Error(
                "Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.",
              );
            await o.readBody(),
              (a = this._prepareRequest(e, u, n)),
              (o = await this.requestRaw(a, r)),
              t--;
          }
          if (-1 == l.indexOf(o.message.statusCode)) return o;
          (c += 1),
            c < u &&
              (await o.readBody(), await this._performExponentialBackoff(c));
        }
        return o;
      }
      dispose() {
        this._agent && this._agent.destroy(), (this._disposed = !0);
      }
      requestRaw(e, t) {
        return new Promise((r, i) => {
          this.requestRawWithCallback(e, t, function(e, t) {
            e && i(e), r(t);
          });
        });
      }
      requestRawWithCallback(e, t, r) {
        let i;
        "string" == typeof t &&
          (e.options.headers["Content-Length"] = Buffer.byteLength(t, "utf8"));
        let n = !1,
          o = (e, t) => {
            n || ((n = !0), r(e, t));
          },
          s = e.httpModule.request(e.options, e => {
            let t = new m(e);
            o(null, t);
          });
        s.on("socket", e => {
          i = e;
        }),
          s.setTimeout(this._socketTimeout || 18e4, () => {
            i && i.end(),
              o(new Error("Request timeout: " + e.options.path), null);
          }),
          s.on("error", function(e) {
            o(e, null);
          }),
          t && "string" == typeof t && s.write(t, "utf8"),
          t && "string" != typeof t
            ? (t.on("close", function() {
                s.end();
              }),
              t.pipe(s))
            : s.end();
      }
      getAgent(e) {
        let t = i.parse(e);
        return this._getAgent(t);
      }
      _prepareRequest(e, t, r) {
        const i = {};
        i.parsedUrl = t;
        const s = "https:" === i.parsedUrl.protocol;
        i.httpModule = s ? o : n;
        const a = s ? 443 : 80;
        return (
          (i.options = {}),
          (i.options.host = i.parsedUrl.hostname),
          (i.options.port = i.parsedUrl.port ? parseInt(i.parsedUrl.port) : a),
          (i.options.path =
            (i.parsedUrl.pathname || "") + (i.parsedUrl.search || "")),
          (i.options.method = e),
          (i.options.headers = this._mergeHeaders(r)),
          null != this.userAgent &&
            (i.options.headers["user-agent"] = this.userAgent),
          (i.options.agent = this._getAgent(i.parsedUrl)),
          this.handlers &&
            this.handlers.forEach(e => {
              e.prepareRequest(i.options);
            }),
          i
        );
      }
      _mergeHeaders(e) {
        const t = e =>
          Object.keys(e).reduce((t, r) => ((t[r.toLowerCase()] = e[r]), t), {});
        return this.requestOptions && this.requestOptions.headers
          ? Object.assign({}, t(this.requestOptions.headers), t(e))
          : t(e || {});
      }
      _getExistingOrDefaultHeader(e, t, r) {
        let i;
        var n;
        return (
          this.requestOptions &&
            this.requestOptions.headers &&
            (i = ((n = this.requestOptions.headers),
            Object.keys(n).reduce(
              (e, t) => ((e[t.toLowerCase()] = n[t]), e),
              {},
            ))[t]),
          e[t] || i || r
        );
      }
      _getAgent(e) {
        let t,
          i = s.getProxyUrl(e),
          p = i && i.hostname;
        if (
          (this._keepAlive && p && (t = this._proxyAgent),
          this._keepAlive && !p && (t = this._agent),
          t)
        )
          return t;
        const u = "https:" === e.protocol;
        let c = 100;
        if (
          (this.requestOptions &&
            (c = this.requestOptions.maxSockets || n.globalAgent.maxSockets),
          p)
        ) {
          a || (a = r(109));
          const e = {
            maxSockets: c,
            keepAlive: this._keepAlive,
            proxy: { proxyAuth: i.auth, host: i.hostname, port: i.port },
          };
          let n;
          const o = "https:" === i.protocol;
          (n = u
            ? o
              ? a.httpsOverHttps
              : a.httpsOverHttp
            : o
            ? a.httpOverHttps
            : a.httpOverHttp),
            (t = n(e)),
            (this._proxyAgent = t);
        }
        if (this._keepAlive && !t) {
          const e = { keepAlive: this._keepAlive, maxSockets: c };
          (t = u ? new o.Agent(e) : new n.Agent(e)), (this._agent = t);
        }
        return (
          t || (t = u ? o.globalAgent : n.globalAgent),
          u &&
            this._ignoreSslError &&
            (t.options = Object.assign(t.options || {}, {
              rejectUnauthorized: !1,
            })),
          t
        );
      }
      _performExponentialBackoff(e) {
        e = Math.min(10, e);
        const t = 5 * Math.pow(2, e);
        return new Promise(e => setTimeout(() => e(), t));
      }
      static dateTimeDeserializer(e, t) {
        if ("string" == typeof t) {
          let e = new Date(t);
          if (!isNaN(e.valueOf())) return e;
        }
        return t;
      }
      async _processResponse(e, t) {
        return new Promise(async (r, i) => {
          const n = e.message.statusCode,
            o = { statusCode: n, result: null, headers: {} };
          let s, a;
          n == p.NotFound && r(o);
          try {
            (a = await e.readBody()),
              a &&
                a.length > 0 &&
                ((s =
                  t && t.deserializeDates
                    ? JSON.parse(a, h.dateTimeDeserializer)
                    : JSON.parse(a)),
                (o.result = s)),
              (o.headers = e.message.headers);
          } catch (e) {}
          if (n > 299) {
            let e;
            e =
              s && s.message
                ? s.message
                : a && a.length > 0
                ? a
                : "Failed request: (" + n + ")";
            let t = new Error(e);
            (t.statusCode = n), o.result && (t.result = o.result), i(t);
          } else r(o);
        });
      }
    }
    t.HttpClient = h;
  },
  function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    const i = r(7);
    function n(e) {
      if (!e.hostname) return !1;
      let t,
        r = process.env.no_proxy || process.env.NO_PROXY || "";
      if (!r) return !1;
      e.port
        ? (t = Number(e.port))
        : "http:" === e.protocol
        ? (t = 80)
        : "https:" === e.protocol && (t = 443);
      let i = [e.hostname.toUpperCase()];
      "number" == typeof t && i.push(`${i[0]}:${t}`);
      for (let e of r
        .split(",")
        .map(e => e.trim().toUpperCase())
        .filter(e => e))
        if (i.some(t => t === e)) return !0;
      return !1;
    }
    (t.getProxyUrl = function(e) {
      let t,
        r,
        o = "https:" === e.protocol;
      return (
        n(e) ||
          ((r = o
            ? process.env.https_proxy || process.env.HTTPS_PROXY
            : process.env.http_proxy || process.env.HTTP_PROXY),
          r && (t = i.parse(r))),
        t
      );
    }),
      (t.checkBypass = n);
  },
  function(e, t, r) {
    e.exports = r(110);
  },
  function(e, t, r) {
    "use strict";
    r(111);
    var i,
      n = r(112),
      o = r(11),
      s = r(15),
      a = r(25),
      p = (r(26), r(27));
    function u(e) {
      var t = this;
      (t.options = e || {}),
        (t.proxyOptions = t.options.proxy || {}),
        (t.maxSockets = t.options.maxSockets || o.Agent.defaultMaxSockets),
        (t.requests = []),
        (t.sockets = []),
        t.on("free", function(e, r, i, n) {
          for (var o = d(r, i, n), s = 0, a = t.requests.length; s < a; ++s) {
            var p = t.requests[s];
            if (p.host === o.host && p.port === o.port)
              return t.requests.splice(s, 1), void p.request.onSocket(e);
          }
          e.destroy(), t.removeSocket(e);
        });
    }
    function c(e, t) {
      var r = this;
      u.prototype.createSocket.call(r, e, function(i) {
        var o = e.request.getHeader("host"),
          s = l({}, r.options, {
            socket: i,
            servername: o ? o.replace(/:.*$/, "") : e.host,
          }),
          a = n.connect(0, s);
        (r.sockets[r.sockets.indexOf(i)] = a), t(a);
      });
    }
    function d(e, t, r) {
      return "string" == typeof e ? { host: e, port: t, localAddress: r } : e;
    }
    function l(e) {
      for (var t = 1, r = arguments.length; t < r; ++t) {
        var i = arguments[t];
        if ("object" == typeof i)
          for (var n = Object.keys(i), o = 0, s = n.length; o < s; ++o) {
            var a = n[o];
            void 0 !== i[a] && (e[a] = i[a]);
          }
      }
      return e;
    }
    (t.httpOverHttp = function(e) {
      var t = new u(e);
      return (t.request = o.request), t;
    }),
      (t.httpsOverHttp = function(e) {
        var t = new u(e);
        return (
          (t.request = o.request),
          (t.createSocket = c),
          (t.defaultPort = 443),
          t
        );
      }),
      (t.httpOverHttps = function(e) {
        var t = new u(e);
        return (t.request = s.request), t;
      }),
      (t.httpsOverHttps = function(e) {
        var t = new u(e);
        return (
          (t.request = s.request),
          (t.createSocket = c),
          (t.defaultPort = 443),
          t
        );
      }),
      p.inherits(u, a.EventEmitter),
      (u.prototype.addRequest = function(e, t, r, i) {
        var n = this,
          o = l({ request: e }, n.options, d(t, r, i));
        n.sockets.length >= this.maxSockets
          ? n.requests.push(o)
          : n.createSocket(o, function(t) {
              function r() {
                n.emit("free", t, o);
              }
              function i(e) {
                n.removeSocket(t),
                  t.removeListener("free", r),
                  t.removeListener("close", i),
                  t.removeListener("agentRemove", i);
              }
              t.on("free", r),
                t.on("close", i),
                t.on("agentRemove", i),
                e.onSocket(t);
            });
      }),
      (u.prototype.createSocket = function(e, t) {
        var r = this,
          n = {};
        r.sockets.push(n);
        var o = l({}, r.proxyOptions, {
          method: "CONNECT",
          path: e.host + ":" + e.port,
          agent: !1,
          headers: { host: e.host + ":" + e.port },
        });
        e.localAddress && (o.localAddress = e.localAddress),
          o.proxyAuth &&
            ((o.headers = o.headers || {}),
            (o.headers["Proxy-Authorization"] =
              "Basic " + new Buffer(o.proxyAuth).toString("base64"))),
          i("making CONNECT request");
        var s = r.request(o);
        function a(o, a, p) {
          var u;
          return (
            s.removeAllListeners(),
            a.removeAllListeners(),
            200 !== o.statusCode
              ? (i(
                  "tunneling socket could not be established, statusCode=%d",
                  o.statusCode,
                ),
                a.destroy(),
                ((u = new Error(
                  "tunneling socket could not be established, statusCode=" +
                    o.statusCode,
                )).code = "ECONNRESET"),
                e.request.emit("error", u),
                void r.removeSocket(n))
              : p.length > 0
              ? (i("got illegal response body from proxy"),
                a.destroy(),
                ((u = new Error("got illegal response body from proxy")).code =
                  "ECONNRESET"),
                e.request.emit("error", u),
                void r.removeSocket(n))
              : (i("tunneling connection has established"),
                (r.sockets[r.sockets.indexOf(n)] = a),
                t(a))
          );
        }
        (s.useChunkedEncodingByDefault = !1),
          s.once("response", function(e) {
            e.upgrade = !0;
          }),
          s.once("upgrade", function(e, t, r) {
            process.nextTick(function() {
              a(e, t, r);
            });
          }),
          s.once("connect", a),
          s.once("error", function(t) {
            s.removeAllListeners(),
              i(
                "tunneling socket could not be established, cause=%s\n",
                t.message,
                t.stack,
              );
            var o = new Error(
              "tunneling socket could not be established, cause=" + t.message,
            );
            (o.code = "ECONNRESET"),
              e.request.emit("error", o),
              r.removeSocket(n);
          }),
          s.end();
      }),
      (u.prototype.removeSocket = function(e) {
        var t = this.sockets.indexOf(e);
        if (-1 !== t) {
          this.sockets.splice(t, 1);
          var r = this.requests.shift();
          r &&
            this.createSocket(r, function(e) {
              r.request.onSocket(e);
            });
        }
      }),
      (i =
        process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)
          ? function() {
              var e = Array.prototype.slice.call(arguments);
              "string" == typeof e[0]
                ? (e[0] = "TUNNEL: " + e[0])
                : e.unshift("TUNNEL:"),
                console.error.apply(console, e);
            }
          : function() {}),
      (t.debug = i);
  },
  function(e, t) {
    e.exports = require("net");
  },
  function(e, t) {
    e.exports = require("tls");
  },
  function(e, t, r) {
    "use strict";
    var i =
      (this && this.__awaiter) ||
      function(e, t, r, i) {
        return new (r || (r = Promise))(function(n, o) {
          function s(e) {
            try {
              p(i.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              p(i.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function p(e) {
            var t;
            e.done
              ? n(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function(e) {
                      e(t);
                    })).then(s, a);
          }
          p((i = i.apply(e, t || [])).next());
        });
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = r(12),
      o = r(25),
      s = r(28),
      a = r(13),
      p = r(114),
      u = r(29),
      c = "win32" === process.platform;
    class d extends o.EventEmitter {
      constructor(e, t, r) {
        if ((super(), !e))
          throw new Error("Parameter 'toolPath' cannot be null or empty.");
        (this.toolPath = e), (this.args = t || []), (this.options = r || {});
      }
      _debug(e) {
        this.options.listeners &&
          this.options.listeners.debug &&
          this.options.listeners.debug(e);
      }
      _getCommandString(e, t) {
        const r = this._getSpawnFileName(),
          i = this._getSpawnArgs(e);
        let n = t ? "" : "[command]";
        if (c)
          if (this._isCmdFile()) {
            n += r;
            for (const e of i) n += ` ${e}`;
          } else if (e.windowsVerbatimArguments) {
            n += `"${r}"`;
            for (const e of i) n += ` ${e}`;
          } else {
            n += this._windowsQuoteCmdArg(r);
            for (const e of i) n += ` ${this._windowsQuoteCmdArg(e)}`;
          }
        else {
          n += r;
          for (const e of i) n += ` ${e}`;
        }
        return n;
      }
      _processLineBuffer(e, t, r) {
        try {
          let i = t + e.toString(),
            o = i.indexOf(n.EOL);
          for (; o > -1; ) {
            r(i.substring(0, o)),
              (i = i.substring(o + n.EOL.length)),
              (o = i.indexOf(n.EOL));
          }
          t = i;
        } catch (e) {
          this._debug(`error processing line. Failed with error ${e}`);
        }
      }
      _getSpawnFileName() {
        return c && this._isCmdFile()
          ? process.env.COMSPEC || "cmd.exe"
          : this.toolPath;
      }
      _getSpawnArgs(e) {
        if (c && this._isCmdFile()) {
          let t = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
          for (const r of this.args)
            (t += " "),
              (t += e.windowsVerbatimArguments
                ? r
                : this._windowsQuoteCmdArg(r));
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
        let r = !1;
        for (const i of e)
          if (t.some(e => e === i)) {
            r = !0;
            break;
          }
        if (!r) return e;
        let i = '"',
          n = !0;
        for (let t = e.length; t > 0; t--)
          (i += e[t - 1]),
            n && "\\" === e[t - 1]
              ? (i += "\\")
              : '"' === e[t - 1]
              ? ((n = !0), (i += '"'))
              : (n = !1);
        return (
          (i += '"'),
          i
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
          r = !0;
        for (let i = e.length; i > 0; i--)
          (t += e[i - 1]),
            r && "\\" === e[i - 1]
              ? (t += "\\")
              : '"' === e[i - 1]
              ? ((r = !0), (t += "\\"))
              : (r = !1);
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
        const r = {};
        return (
          (r.cwd = e.cwd),
          (r.env = e.env),
          (r.windowsVerbatimArguments =
            e.windowsVerbatimArguments || this._isCmdFile()),
          e.windowsVerbatimArguments && (r.argv0 = `"${t}"`),
          r
        );
      }
      exec() {
        return i(this, void 0, void 0, function*() {
          return (
            !u.isRooted(this.toolPath) &&
              (this.toolPath.includes("/") ||
                (c && this.toolPath.includes("\\"))) &&
              (this.toolPath = a.resolve(
                process.cwd(),
                this.options.cwd || process.cwd(),
                this.toolPath,
              )),
            (this.toolPath = yield p.which(this.toolPath, !0)),
            new Promise((e, t) => {
              this._debug(`exec tool: ${this.toolPath}`),
                this._debug("arguments:");
              for (const e of this.args) this._debug(`   ${e}`);
              const r = this._cloneExecOptions(this.options);
              !r.silent &&
                r.outStream &&
                r.outStream.write(this._getCommandString(r) + n.EOL);
              const i = new l(r, this.toolPath);
              i.on("debug", e => {
                this._debug(e);
              });
              const o = this._getSpawnFileName(),
                a = s.spawn(
                  o,
                  this._getSpawnArgs(r),
                  this._getSpawnOptions(this.options, o),
                );
              a.stdout &&
                a.stdout.on("data", e => {
                  this.options.listeners &&
                    this.options.listeners.stdout &&
                    this.options.listeners.stdout(e),
                    !r.silent && r.outStream && r.outStream.write(e),
                    this._processLineBuffer(e, "", e => {
                      this.options.listeners &&
                        this.options.listeners.stdline &&
                        this.options.listeners.stdline(e);
                    });
                });
              a.stderr &&
                a.stderr.on("data", e => {
                  if (
                    ((i.processStderr = !0),
                    this.options.listeners &&
                      this.options.listeners.stderr &&
                      this.options.listeners.stderr(e),
                    !r.silent && r.errStream && r.outStream)
                  ) {
                    (r.failOnStdErr ? r.errStream : r.outStream).write(e);
                  }
                  this._processLineBuffer(e, "", e => {
                    this.options.listeners &&
                      this.options.listeners.errline &&
                      this.options.listeners.errline(e);
                  });
                }),
                a.on("error", e => {
                  (i.processError = e.message),
                    (i.processExited = !0),
                    (i.processClosed = !0),
                    i.CheckComplete();
                }),
                a.on("exit", e => {
                  (i.processExitCode = e),
                    (i.processExited = !0),
                    this._debug(
                      `Exit code ${e} received from tool '${this.toolPath}'`,
                    ),
                    i.CheckComplete();
                }),
                a.on("close", e => {
                  (i.processExitCode = e),
                    (i.processExited = !0),
                    (i.processClosed = !0),
                    this._debug(
                      `STDIO streams have closed for tool '${this.toolPath}'`,
                    ),
                    i.CheckComplete();
                }),
                i.on("done", (r, i) => {
                  "".length > 0 && this.emit("stdline", ""),
                    "".length > 0 && this.emit("errline", ""),
                    a.removeAllListeners(),
                    r ? t(r) : e(i);
                });
            })
          );
        });
      }
    }
    (t.ToolRunner = d),
      (t.argStringToArray = function(e) {
        const t = [];
        let r = !1,
          i = !1,
          n = "";
        function o(e) {
          i && '"' !== e && (n += "\\"), (n += e), (i = !1);
        }
        for (let s = 0; s < e.length; s++) {
          const a = e.charAt(s);
          '"' !== a
            ? "\\" === a && i
              ? o(a)
              : "\\" === a && r
              ? (i = !0)
              : " " !== a || r
              ? o(a)
              : n.length > 0 && (t.push(n), (n = ""))
            : i
            ? o(a)
            : (r = !r);
        }
        return n.length > 0 && t.push(n.trim()), t;
      });
    class l extends o.EventEmitter {
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
              (this.timeout = setTimeout(l.HandleTimeout, this.delay, this)));
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
  function(e, t, r) {
    "use strict";
    var i =
      (this && this.__awaiter) ||
      function(e, t, r, i) {
        return new (r || (r = Promise))(function(n, o) {
          function s(e) {
            try {
              p(i.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              p(i.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function p(e) {
            var t;
            e.done
              ? n(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function(e) {
                      e(t);
                    })).then(s, a);
          }
          p((i = i.apply(e, t || [])).next());
        });
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = r(28),
      o = r(13),
      s = r(27),
      a = r(29),
      p = s.promisify(n.exec);
    function u(e) {
      return i(this, void 0, void 0, function*() {
        if (a.IS_WINDOWS) {
          try {
            (yield a.isDirectory(e, !0))
              ? yield p(`rd /s /q "${e}"`)
              : yield p(`del /f /a "${e}"`);
          } catch (e) {
            if ("ENOENT" !== e.code) throw e;
          }
          try {
            yield a.unlink(e);
          } catch (e) {
            if ("ENOENT" !== e.code) throw e;
          }
        } else {
          let t = !1;
          try {
            t = yield a.isDirectory(e);
          } catch (e) {
            if ("ENOENT" !== e.code) throw e;
            return;
          }
          t ? yield p(`rm -rf "${e}"`) : yield a.unlink(e);
        }
      });
    }
    function c(e) {
      return i(this, void 0, void 0, function*() {
        yield a.mkdirP(e);
      });
    }
    function d(e, t, r) {
      return i(this, void 0, void 0, function*() {
        if ((yield a.lstat(e)).isSymbolicLink()) {
          try {
            yield a.lstat(t), yield a.unlink(t);
          } catch (e) {
            "EPERM" === e.code && (yield a.chmod(t, "0666"), yield a.unlink(t));
          }
          const r = yield a.readlink(e);
          yield a.symlink(r, t, a.IS_WINDOWS ? "junction" : null);
        } else ((yield a.exists(t)) && !r) || (yield a.copyFile(e, t));
      });
    }
    (t.cp = function(e, t, r = {}) {
      return i(this, void 0, void 0, function*() {
        const { force: n, recursive: s } = (function(e) {
            const t = null == e.force || e.force,
              r = Boolean(e.recursive);
            return { force: t, recursive: r };
          })(r),
          p = (yield a.exists(t)) ? yield a.stat(t) : null;
        if (p && p.isFile() && !n) return;
        const u = p && p.isDirectory() ? o.join(t, o.basename(e)) : t;
        if (!(yield a.exists(e)))
          throw new Error(`no such file or directory: ${e}`);
        if ((yield a.stat(e)).isDirectory()) {
          if (!s)
            throw new Error(
              `Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`,
            );
          yield (function e(t, r, n, o) {
            return i(this, void 0, void 0, function*() {
              if (n >= 255) return;
              n++, yield c(r);
              const i = yield a.readdir(t);
              for (const s of i) {
                const i = `${t}/${s}`,
                  p = `${r}/${s}`;
                (yield a.lstat(i)).isDirectory()
                  ? yield e(i, p, n, o)
                  : yield d(i, p, o);
              }
              yield a.chmod(r, (yield a.stat(t)).mode);
            });
          })(e, u, 0, n);
        } else {
          if ("" === o.relative(e, u))
            throw new Error(`'${u}' and '${e}' are the same file`);
          yield d(e, u, n);
        }
      });
    }),
      (t.mv = function(e, t, r = {}) {
        return i(this, void 0, void 0, function*() {
          if (yield a.exists(t)) {
            let i = !0;
            if (
              ((yield a.isDirectory(t)) &&
                ((t = o.join(t, o.basename(e))), (i = yield a.exists(t))),
              i)
            ) {
              if (null != r.force && !r.force)
                throw new Error("Destination already exists");
              yield u(t);
            }
          }
          yield c(o.dirname(t)), yield a.rename(e, t);
        });
      }),
      (t.rmRF = u),
      (t.mkdirP = c),
      (t.which = function e(t, r) {
        return i(this, void 0, void 0, function*() {
          if (!t) throw new Error("parameter 'tool' is required");
          if (r) {
            if (!(yield e(t, !1)))
              throw a.IS_WINDOWS
                ? new Error(
                    `Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`,
                  )
                : new Error(
                    `Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`,
                  );
          }
          try {
            const e = [];
            if (a.IS_WINDOWS && process.env.PATHEXT)
              for (const t of process.env.PATHEXT.split(o.delimiter))
                t && e.push(t);
            if (a.isRooted(t)) {
              const r = yield a.tryGetExecutablePath(t, e);
              return r || "";
            }
            if (t.includes("/") || (a.IS_WINDOWS && t.includes("\\")))
              return "";
            const r = [];
            if (process.env.PATH)
              for (const e of process.env.PATH.split(o.delimiter))
                e && r.push(e);
            for (const i of r) {
              const r = yield a.tryGetExecutablePath(i + o.sep + t, e);
              if (r) return r;
            }
            return "";
          } catch (e) {
            throw new Error(`which failed with message ${e.message}`);
          }
        });
      });
  },
  function(e, t, r) {
    "use strict";
    r.r(t);
    var i = r(8),
      n = r(31),
      o = (r(32), r(33));
    n.try(async function() {
      const e = i.getInput("commandz"),
        t = i.getInput("ref");
      if ((console.log("ref", t), e))
        return await (async (e, t) => {
          (await Object(o.exec)(e, null, { ignoreReturnCode: !0 })) > 0 &&
            i.setFailed(t);
        })(e, `\`${e}\` failed!`);
    }).catch(i.debug);
  },
]);
