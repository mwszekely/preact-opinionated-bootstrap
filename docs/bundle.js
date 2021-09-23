(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var preact = createCommonjsModule(function (module, exports) {
      var n,
          l,
          u,
          t,
          i,
          o,
          r,
          f,
          e = {},
          c = [],
          s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

      function a(n, l) {
        for (var u in l) n[u] = l[u];

        return n;
      }

      function p(n) {
        var l = n.parentNode;
        l && l.removeChild(n);
      }

      function v(l, u, t) {
        var i,
            o,
            r,
            f = {};

        for (r in u) "key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

        if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
        return h(l, f, i, o, null);
      }

      function h(n, t, i, o, r) {
        var f = {
          type: n,
          props: t,
          key: i,
          ref: o,
          __k: null,
          __: null,
          __b: 0,
          __e: null,
          __d: void 0,
          __c: null,
          __h: null,
          constructor: void 0,
          __v: null == r ? ++u : r
        };
        return null != l.vnode && l.vnode(f), f;
      }

      function y(n) {
        return n.children;
      }

      function d(n, l) {
        this.props = n, this.context = l;
      }

      function _(n, l) {
        if (null == l) return n.__ ? _(n.__, n.__.__k.indexOf(n) + 1) : null;

        for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

        return "function" == typeof n.type ? _(n) : null;
      }

      function k(n) {
        var l, u;

        if (null != (n = n.__) && null != n.__c) {
          for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
          }

          return k(n);
        }
      }

      function x(n) {
        (!n.__d && (n.__d = !0) && i.push(n) && !b.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(b);
      }

      function b() {
        for (var n; b.__r = i.length;) n = i.sort(function (n, l) {
          return n.__v.__b - l.__v.__b;
        }), i = [], n.some(function (n) {
          var l, u, t, i, o, r;
          n.__d && (o = (i = (l = n).__v).__e, (r = l.__P) && (u = [], (t = a({}, i)).__v = i.__v + 1, I(r, i, t, l.__n, void 0 !== r.ownerSVGElement, null != i.__h ? [o] : null, u, null == o ? _(i) : o, i.__h), T(u, i), i.__e != o && k(i)));
        });
      }

      function m(n, l, u, t, i, o, r, f, s, a) {
        var p,
            v,
            d,
            k,
            x,
            b,
            m,
            A = t && t.__k || c,
            P = A.length;

        for (u.__k = [], p = 0; p < l.length; p++) if (null != (k = u.__k[p] = null == (k = l[p]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? h(null, k, null, null, k) : Array.isArray(k) ? h(y, {
          children: k
        }, null, null, null) : k.__b > 0 ? h(k.type, k.props, k.key, null, k.__v) : k)) {
          if (k.__ = u, k.__b = u.__b + 1, null === (d = A[p]) || d && k.key == d.key && k.type === d.type) A[p] = void 0;else for (v = 0; v < P; v++) {
            if ((d = A[v]) && k.key == d.key && k.type === d.type) {
              A[v] = void 0;
              break;
            }

            d = null;
          }
          I(n, k, d = d || e, i, o, r, f, s, a), x = k.__e, (v = k.ref) && d.ref != v && (m || (m = []), d.ref && m.push(d.ref, null, k), m.push(v, k.__c || x, k)), null != x ? (null == b && (b = x), "function" == typeof k.type && null != k.__k && k.__k === d.__k ? k.__d = s = g(k, s, n) : s = w(n, k, d, A, x, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && d.__e == s && s.parentNode != n && (s = _(d));
        }

        for (u.__e = b, p = P; p--;) null != A[p] && ("function" == typeof u.type && null != A[p].__e && A[p].__e == u.__d && (u.__d = _(t, p + 1)), L(A[p], A[p]));

        if (m) for (p = 0; p < m.length; p++) z(m[p], m[++p], m[++p]);
      }

      function g(n, l, u) {
        var t, i;

        for (t = 0; t < n.__k.length; t++) (i = n.__k[t]) && (i.__ = n, l = "function" == typeof i.type ? g(i, l, u) : w(u, i, i, n.__k, i.__e, l));

        return l;
      }

      function w(n, l, u, t, i, o) {
        var r, f, e;
        if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || i != o || null == i.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(i), r = null;else {
          for (f = o, e = 0; (f = f.nextSibling) && e < t.length; e += 2) if (f == i) break n;

          n.insertBefore(i, o), r = o;
        }
        return void 0 !== r ? r : i.nextSibling;
      }

      function A(n, l, u, t, i) {
        var o;

        for (o in u) "children" === o || "key" === o || o in l || C(n, o, null, u[o], t);

        for (o in l) i && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], t);
      }

      function P(n, l, u) {
        "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s.test(l) ? u : u + "px";
      }

      function C(n, l, u, t, i) {
        var o;

        n: if ("style" === l) {
          if ("string" == typeof u) n.style.cssText = u;else {
            if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || P(n.style, l, "");
            if (u) for (l in u) t && u[l] === t[l] || P(n.style, l, u[l]);
          }
        } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? t || n.addEventListener(l, o ? H : $, o) : n.removeEventListener(l, o ? H : $, o);else if ("dangerouslySetInnerHTML" !== l) {
          if (i) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
          } catch (n) {}
          "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
        }
      }

      function $(n) {
        this.l[n.type + !1](l.event ? l.event(n) : n);
      }

      function H(n) {
        this.l[n.type + !0](l.event ? l.event(n) : n);
      }

      function I(n, u, t, i, o, r, f, e, c) {
        var s,
            p,
            v,
            h,
            _,
            k,
            x,
            b,
            g,
            w,
            A,
            P = u.type;

        if (void 0 !== u.constructor) return null;
        null != t.__h && (c = t.__h, e = u.__e = t.__e, u.__h = null, r = [e]), (s = l.__b) && s(u);

        try {
          n: if ("function" == typeof P) {
            if (b = u.props, g = (s = P.contextType) && i[s.__c], w = s ? g ? g.props.value : s.__ : i, t.__c ? x = (p = u.__c = t.__c).__ = p.__E : ("prototype" in P && P.prototype.render ? u.__c = p = new P(b, w) : (u.__c = p = new d(b, w), p.constructor = P, p.render = M), g && g.sub(p), p.props = b, p.state || (p.state = {}), p.context = w, p.__n = i, v = p.__d = !0, p.__h = []), null == p.__s && (p.__s = p.state), null != P.getDerivedStateFromProps && (p.__s == p.state && (p.__s = a({}, p.__s)), a(p.__s, P.getDerivedStateFromProps(b, p.__s))), h = p.props, _ = p.state, v) null == P.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), null != p.componentDidMount && p.__h.push(p.componentDidMount);else {
              if (null == P.getDerivedStateFromProps && b !== h && null != p.componentWillReceiveProps && p.componentWillReceiveProps(b, w), !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(b, p.__s, w) || u.__v === t.__v) {
                p.props = b, p.state = p.__s, u.__v !== t.__v && (p.__d = !1), p.__v = u, u.__e = t.__e, u.__k = t.__k, u.__k.forEach(function (n) {
                  n && (n.__ = u);
                }), p.__h.length && f.push(p);
                break n;
              }

              null != p.componentWillUpdate && p.componentWillUpdate(b, p.__s, w), null != p.componentDidUpdate && p.__h.push(function () {
                p.componentDidUpdate(h, _, k);
              });
            }
            p.context = w, p.props = b, p.state = p.__s, (s = l.__r) && s(u), p.__d = !1, p.__v = u, p.__P = n, s = p.render(p.props, p.state, p.context), p.state = p.__s, null != p.getChildContext && (i = a(a({}, i), p.getChildContext())), v || null == p.getSnapshotBeforeUpdate || (k = p.getSnapshotBeforeUpdate(h, _)), A = null != s && s.type === y && null == s.key ? s.props.children : s, m(n, Array.isArray(A) ? A : [A], u, t, i, o, r, f, e, c), p.base = u.__e, u.__h = null, p.__h.length && f.push(p), x && (p.__E = p.__ = null), p.__e = !1;
          } else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = j(t.__e, u, t, i, o, r, f, c);

          (s = l.diffed) && s(u);
        } catch (n) {
          u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l.__e(n, u, t);
        }
      }

      function T(n, u) {
        l.__c && l.__c(u, n), n.some(function (u) {
          try {
            n = u.__h, u.__h = [], n.some(function (n) {
              n.call(u);
            });
          } catch (n) {
            l.__e(n, u.__v);
          }
        });
      }

      function j(l, u, t, i, o, r, f, c) {
        var s,
            a,
            v,
            h = t.props,
            y = u.props,
            d = u.type,
            k = 0;
        if ("svg" === d && (o = !0), null != r) for (; k < r.length; k++) if ((s = r[k]) && (s === l || (d ? s.localName == d : 3 == s.nodeType))) {
          l = s, r[k] = null;
          break;
        }

        if (null == l) {
          if (null === d) return document.createTextNode(y);
          l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, y.is && y), r = null, c = !1;
        }

        if (null === d) h === y || c && l.data === y || (l.data = y);else {
          if (r = r && n.call(l.childNodes), a = (h = t.props || e).dangerouslySetInnerHTML, v = y.dangerouslySetInnerHTML, !c) {
            if (null != r) for (h = {}, k = 0; k < l.attributes.length; k++) h[l.attributes[k].name] = l.attributes[k].value;
            (v || a) && (v && (a && v.__html == a.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
          }

          if (A(l, y, h, o, c), v) u.__k = [];else if (k = u.props.children, m(l, Array.isArray(k) ? k : [k], u, t, i, o && "foreignObject" !== d, r, f, r ? r[0] : t.__k && _(t, 0), c), null != r) for (k = r.length; k--;) null != r[k] && p(r[k]);
          c || ("value" in y && void 0 !== (k = y.value) && (k !== l.value || "progress" === d && !k) && C(l, "value", k, h.value, !1), "checked" in y && void 0 !== (k = y.checked) && k !== l.checked && C(l, "checked", k, h.checked, !1));
        }
        return l;
      }

      function z(n, u, t) {
        try {
          "function" == typeof n ? n(u) : n.current = u;
        } catch (n) {
          l.__e(n, t);
        }
      }

      function L(n, u, t) {
        var i, o;

        if (l.unmount && l.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || z(i, null, u)), null != (i = n.__c)) {
          if (i.componentWillUnmount) try {
            i.componentWillUnmount();
          } catch (n) {
            l.__e(n, u);
          }
          i.base = i.__P = null;
        }

        if (i = n.__k) for (o = 0; o < i.length; o++) i[o] && L(i[o], u, "function" != typeof n.type);
        t || null == n.__e || p(n.__e), n.__e = n.__d = void 0;
      }

      function M(n, l, u) {
        return this.constructor(n, u);
      }

      function N(u, t, i) {
        var o, r, f;
        l.__ && l.__(u, t), r = (o = "function" == typeof i) ? null : i && i.__k || t.__k, f = [], I(t, u = (!o && i || t).__k = v(y, null, [u]), r || e, e, void 0 !== t.ownerSVGElement, !o && i ? [i] : r ? null : t.firstChild ? n.call(t.childNodes) : null, f, !o && i ? i : r ? r.__e : t.firstChild, o), T(f, u);
      }

      n = c.slice, l = {
        __e: function (n, l) {
          for (var u, t, i; l = l.__;) if ((u = l.__c) && !u.__) try {
            if ((t = u.constructor) && null != t.getDerivedStateFromError && (u.setState(t.getDerivedStateFromError(n)), i = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), i = u.__d), i) return u.__E = u;
          } catch (l) {
            n = l;
          }

          throw n;
        }
      }, u = 0, t = function (n) {
        return null != n && void 0 === n.constructor;
      }, d.prototype.setState = function (n, l) {
        var u;
        u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n && (n = n(a({}, u), this.props)), n && a(u, n), null != n && this.__v && (l && this.__h.push(l), x(this));
      }, d.prototype.forceUpdate = function (n) {
        this.__v && (this.__e = !0, n && this.__h.push(n), x(this));
      }, d.prototype.render = y, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, f = 0, exports.render = N, exports.hydrate = function n(l, u) {
        N(l, u, n);
      }, exports.createElement = v, exports.h = v, exports.Fragment = y, exports.createRef = function () {
        return {
          current: null
        };
      }, exports.isValidElement = t, exports.Component = d, exports.cloneElement = function (l, u, t) {
        var i,
            o,
            r,
            f = a({}, l.props);

        for (r in u) "key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

        return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : t), h(l.type, f, i || l.key, o || l.ref, null);
      }, exports.createContext = function (n, l) {
        var u = {
          __c: l = "__cC" + f++,
          __: n,
          Consumer: function (n, l) {
            return n.children(l);
          },
          Provider: function (n) {
            var u, t;
            return this.getChildContext || (u = [], (t = {})[l] = this, this.getChildContext = function () {
              return t;
            }, this.shouldComponentUpdate = function (n) {
              this.props.value !== n.value && u.some(x);
            }, this.sub = function (n) {
              u.push(n);
              var l = n.componentWillUnmount;

              n.componentWillUnmount = function () {
                u.splice(u.indexOf(n), 1), l && l.call(n);
              };
            }), n.children;
          }
        };
        return u.Provider.__ = u.Consumer.contextType = u;
      }, exports.toChildArray = function n(l, u) {
        return u = u || [], null == l || "boolean" == typeof l || (Array.isArray(l) ? l.some(function (l) {
          n(l, u);
        }) : u.push(l)), u;
      }, exports.options = l;
    });

    createCommonjsModule(function (module, exports) {
      "undefined" != typeof window && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.5.14", preact.options, {
        Fragment: preact.Fragment,
        Component: preact.Component
      }), exports.addHookName = function (e, o) {
        return preact.options.__a && preact.options.__a(o), e;
      };
    });

    createCommonjsModule(function (module, exports) {
      var n = preact;
      var e = {};

      function t(e) {
        return e.type === n.Fragment ? "Fragment" : "function" == typeof e.type ? e.type.displayName || e.type.name : "string" == typeof e.type ? e.type : "#text";
      }

      var o = [],
          r = [];

      function a() {
        return o.length > 0 ? o[o.length - 1] : null;
      }

      var i = !1;

      function s(e) {
        return "function" == typeof e.type && e.type != n.Fragment;
      }

      function c(n) {
        for (var e = [n], o = n; null != o.__o;) e.push(o.__o), o = o.__o;

        return e.reduce(function (n, e) {
          n += "  in " + t(e);
          var o = e.__source;
          return o ? n += " (at " + o.fileName + ":" + o.lineNumber + ")" : i || (i = !0, console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")), n + "\n";
        }, "");
      }

      var l = "function" == typeof WeakMap,
          u = n.Component.prototype.setState;

      n.Component.prototype.setState = function (n, e) {
        return null == this.__v ? null == this.state && console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n' + c(a())) : null == this.__P && console.warn('Can\'t call "this.setState" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n' + c(this.__v)), u.call(this, n, e);
      };

      var f = n.Component.prototype.forceUpdate;

      function p(n) {
        var e = n.props,
            o = t(n),
            r = "";

        for (var a in e) if (e.hasOwnProperty(a) && "children" !== a) {
          var i = e[a];
          "function" == typeof i && (i = "function " + (i.displayName || i.name) + "() {}"), i = Object(i) !== i || i.toString ? i + "" : Object.prototype.toString.call(i), r += " " + a + "=" + JSON.stringify(i);
        }

        var s = e.children;
        return "<" + o + r + (s && s.length ? ">..</" + o + ">" : " />");
      }

      n.Component.prototype.forceUpdate = function (n) {
        return null == this.__v ? console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n' + c(a())) : null == this.__P && console.warn('Can\'t call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n' + c(this.__v)), f.call(this, n);
      }, function () {
        !function () {
          var e = n.options.__b,
              t = n.options.diffed,
              a = n.options.__,
              i = n.options.vnode,
              c = n.options.__r;
          n.options.diffed = function (n) {
            s(n) && r.pop(), o.pop(), t && t(n);
          }, n.options.__b = function (n) {
            s(n) && o.push(n), e && e(n);
          }, n.options.__ = function (n, e) {
            r = [], a && a(n, e);
          }, n.options.vnode = function (n) {
            n.__o = r.length > 0 ? r[r.length - 1] : null, i && i(n);
          }, n.options.__r = function (n) {
            s(n) && r.push(n), c && c(n);
          };
        }();
        var a = !1,
            i = n.options.__b,
            u = n.options.diffed,
            f = n.options.vnode,
            d = n.options.__e,
            h = n.options.__,
            y = n.options.__h,
            v = l ? {
          useEffect: new WeakMap(),
          useLayoutEffect: new WeakMap(),
          lazyPropTypes: new WeakMap()
        } : null,
            m = [];
        n.options.__e = function (n, e, o) {
          if (e && e.__c && "function" == typeof n.then) {
            var r = n;
            n = new Error("Missing Suspense. The throwing component was: " + t(e));

            for (var a = e; a; a = a.__) if (a.__c && a.__c.__c) {
              n = r;
              break;
            }

            if (n instanceof Error) throw n;
          }

          try {
            d(n, e, o), "function" != typeof n.then && setTimeout(function () {
              throw n;
            });
          } catch (n) {
            throw n;
          }
        }, n.options.__ = function (n, e) {
          if (!e) throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");
          var o;

          switch (e.nodeType) {
            case 1:
            case 11:
            case 9:
              o = !0;
              break;

            default:
              o = !1;
          }

          if (!o) {
            var r = t(n);
            throw new Error("Expected a valid HTML node as a second argument to render.\tReceived " + e + " instead: render(<" + r + " />, " + e + ");");
          }

          h && h(n, e);
        }, n.options.__b = function (n) {
          var o = n.type,
              r = function n(e) {
            return e ? "function" == typeof e.type ? n(e.__) : e : {};
          }(n.__);

          if (a = !0, void 0 === o) throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + p(n) + "\n\n" + c(n));

          if (null != o && "object" == typeof o) {
            if (void 0 !== o.__k && void 0 !== o.__e) throw new Error("Invalid type passed to createElement(): " + o + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + t(n) + " = " + p(o) + ";\n  let vnode = <My" + t(n) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + c(n));
            throw new Error("Invalid type passed to createElement(): " + (Array.isArray(o) ? "array" : o));
          }

          if ("thead" !== o && "tfoot" !== o && "tbody" !== o || "table" === r.type ? "tr" === o && "thead" !== r.type && "tfoot" !== r.type && "tbody" !== r.type && "table" !== r.type ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + p(n) + "\n\n" + c(n)) : "td" === o && "tr" !== r.type ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + p(n) + "\n\n" + c(n)) : "th" === o && "tr" !== r.type && console.error("Improper nesting of table. Your <th> should have a <tr>." + p(n) + "\n\n" + c(n)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + p(n) + "\n\n" + c(n)), void 0 !== n.ref && "function" != typeof n.ref && "object" != typeof n.ref && !("$$typeof" in n)) throw new Error('Component\'s "ref" property should be a function, or an object created by createRef(), but got [' + typeof n.ref + "] instead\n" + p(n) + "\n\n" + c(n));
          if ("string" == typeof n.type) for (var s in n.props) if ("o" === s[0] && "n" === s[1] && "function" != typeof n.props[s] && null != n.props[s]) throw new Error("Component's \"" + s + '" property should be a function, but got [' + typeof n.props[s] + "] instead\n" + p(n) + "\n\n" + c(n));

          if ("function" == typeof n.type && n.type.propTypes) {
            if ("Lazy" === n.type.displayName && v && !v.lazyPropTypes.has(n.type)) {
              var l = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";

              try {
                var u = n.type();
                v.lazyPropTypes.set(n.type, !0), console.warn(l + "Component wrapped in lazy() is " + t(u));
              } catch (n) {
                console.warn(l + "We will log the wrapped component's name once it is loaded.");
              }
            }

            var f = n.props;
            n.type.__f && delete (f = function (n, e) {
              for (var t in e) n[t] = e[t];

              return n;
            }({}, f)).ref, function (n, t, o, r, a) {
              Object.keys(n).forEach(function (o) {
                var i;

                try {
                  i = n[o](t, o, r, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (n) {
                  i = n;
                }

                !i || i.message in e || (e[i.message] = !0, console.error("Failed prop type: " + i.message + (a && "\n" + a() || "")));
              });
            }(n.type.propTypes, f, 0, t(n), function () {
              return c(n);
            });
          }

          i && i(n);
        }, n.options.__h = function (n, e, t) {
          if (!n || !a) throw new Error("Hook can only be invoked from render methods.");
          y && y(n, e, t);
        };

        var b = function (n, e) {
          return {
            get: function () {
              var t = "get" + n + e;
              m && m.indexOf(t) < 0 && (m.push(t), console.warn("getting vnode." + n + " is deprecated, " + e));
            },
            set: function () {
              var t = "set" + n + e;
              m && m.indexOf(t) < 0 && (m.push(t), console.warn("setting vnode." + n + " is not allowed, " + e));
            }
          };
        },
            w = {
          nodeName: b("nodeName", "use vnode.type"),
          attributes: b("attributes", "use vnode.props"),
          children: b("children", "use vnode.props.children")
        },
            g = Object.create({}, w);

        n.options.vnode = function (n) {
          var e = n.props;

          if (null !== n.type && null != e && ("__source" in e || "__self" in e)) {
            var t = n.props = {};

            for (var o in e) {
              var r = e[o];
              "__source" === o ? n.__source = r : "__self" === o ? n.__self = r : t[o] = r;
            }
          }

          n.__proto__ = g, f && f(n);
        }, n.options.diffed = function (n) {
          if (n.__k && n.__k.forEach(function (e) {
            if (e && void 0 === e.type) {
              delete e.__, delete e.__b;
              var t = Object.keys(e).join(",");
              throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + t + "}.\n\n" + c(n));
            }
          }), a = !1, u && u(n), null != n.__k) for (var e = [], t = 0; t < n.__k.length; t++) {
            var o = n.__k[t];

            if (o && null != o.key) {
              var r = o.key;

              if (-1 !== e.indexOf(r)) {
                console.error('Following component has two or more children with the same key attribute: "' + r + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + p(n) + "\n\n" + c(n));
                break;
              }

              e.push(r);
            }
          }
        };
      }(), exports.resetPropWarnings = function () {
        e = {};
      };
    });

    var n,
        l$1,
        u$1,
        t$1,
        o$1,
        r$1,
        f$1,
        e$1 = {},
        c$1 = [],
        s$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

    function a$1(n, l) {
      for (var u in l) n[u] = l[u];

      return n;
    }

    function h$1(n) {
      var l = n.parentNode;
      l && l.removeChild(n);
    }

    function v$1(l, u, i) {
      var t,
          o,
          r,
          f = {};

      for (r in u) "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

      if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
      return y$1(l, f, t, o, null);
    }

    function y$1(n, i, t, o, r) {
      var f = {
        type: n,
        props: i,
        key: t,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == r ? ++u$1 : r
      };
      return null != l$1.vnode && l$1.vnode(f), f;
    }

    function d$1(n) {
      return n.children;
    }

    function _$1(n, l) {
      this.props = n, this.context = l;
    }

    function k$1(n, l) {
      if (null == l) return n.__ ? k$1(n.__, n.__.__k.indexOf(n) + 1) : null;

      for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

      return "function" == typeof n.type ? k$1(n) : null;
    }

    function b$1(n) {
      var l, u;

      if (null != (n = n.__) && null != n.__c) {
        for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
          n.__e = n.__c.base = u.__e;
          break;
        }

        return b$1(n);
      }
    }

    function m$1(n) {
      (!n.__d && (n.__d = !0) && t$1.push(n) && !g$2.__r++ || r$1 !== l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(g$2);
    }

    function g$2() {
      for (var n; g$2.__r = t$1.length;) n = t$1.sort(function (n, l) {
        return n.__v.__b - l.__v.__b;
      }), t$1 = [], n.some(function (n) {
        var l, u, i, t, o, r;
        n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = a$1({}, t)).__v = t.__v + 1, j$2(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? k$1(t) : o, t.__h), z(u, t), t.__e != o && b$1(t)));
      });
    }

    function w$2(n, l, u, i, t, o, r, f, s, a) {
      var h,
          v,
          p,
          _,
          b,
          m,
          g,
          w = i && i.__k || c$1,
          A = w.length;

      for (u.__k = [], h = 0; h < l.length; h++) if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? y$1(null, _, null, null, _) : Array.isArray(_) ? y$1(d$1, {
        children: _
      }, null, null, null) : _.__b > 0 ? y$1(_.type, _.props, _.key, null, _.__v) : _)) {
        if (_.__ = u, _.__b = u.__b + 1, null === (p = w[h]) || p && _.key == p.key && _.type === p.type) w[h] = void 0;else for (v = 0; v < A; v++) {
          if ((p = w[v]) && _.key == p.key && _.type === p.type) {
            w[v] = void 0;
            break;
          }

          p = null;
        }
        j$2(n, _, p = p || e$1, t, o, r, f, s, a), b = _.__e, (v = _.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, _), g.push(v, _.__c || b, _)), null != b ? (null == m && (m = b), "function" == typeof _.type && null != _.__k && _.__k === p.__k ? _.__d = s = x$2(_, s, n) : s = P$1(n, _, p, w, b, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && p.__e == s && s.parentNode != n && (s = k$1(p));
      }

      for (u.__e = m, h = A; h--;) null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = k$1(i, h + 1)), N(w[h], w[h]));

      if (g) for (h = 0; h < g.length; h++) M$1(g[h], g[++h], g[++h]);
    }

    function x$2(n, l, u) {
      var i, t;

      for (i = 0; i < n.__k.length; i++) (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? x$2(t, l, u) : P$1(u, t, t, n.__k, t.__e, l));

      return l;
    }

    function A$2(n, l) {
      return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
        A$2(n, l);
      }) : l.push(n)), l;
    }

    function P$1(n, l, u, i, t, o) {
      var r, f, e;
      if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
        for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;

        n.insertBefore(t, o), r = o;
      }
      return void 0 !== r ? r : t.nextSibling;
    }

    function C$1(n, l, u, i, t) {
      var o;

      for (o in u) "children" === o || "key" === o || o in l || H$1(n, o, null, u[o], i);

      for (o in l) t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || H$1(n, o, l[o], u[o], i);
    }

    function $$1(n, l, u) {
      "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s$1.test(l) ? u : u + "px";
    }

    function H$1(n, l, u, i, t) {
      var o;

      n: if ("style" === l) {
        if ("string" == typeof u) n.style.cssText = u;else {
          if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || $$1(n.style, l, "");
          if (u) for (l in u) i && u[l] === i[l] || $$1(n.style, l, u[l]);
        }
      } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? T$1 : I$1, o) : n.removeEventListener(l, o ? T$1 : I$1, o);else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
          n[l] = null == u ? "" : u;
          break n;
        } catch (n) {}
        "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
      }
    }

    function I$1(n) {
      this.l[n.type + !1](l$1.event ? l$1.event(n) : n);
    }

    function T$1(n) {
      this.l[n.type + !0](l$1.event ? l$1.event(n) : n);
    }

    function j$2(n, u, i, t, o, r, f, e, c) {
      var s,
          h,
          v,
          y,
          p,
          k,
          b,
          m,
          g,
          x,
          A,
          P = u.type;
      if (void 0 !== u.constructor) return null;
      null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (s = l$1.__b) && s(u);

      try {
        n: if ("function" == typeof P) {
          if (m = u.props, g = (s = P.contextType) && t[s.__c], x = s ? g ? g.props.value : s.__ : t, i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(m, x) : (u.__c = h = new _$1(m, x), h.constructor = P, h.render = O$1), g && g.sub(h), h.props = m, h.state || (h.state = {}), h.context = x, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = a$1({}, h.__s)), a$1(h.__s, P.getDerivedStateFromProps(m, h.__s))), y = h.props, p = h.state, v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);else {
            if (null == P.getDerivedStateFromProps && m !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, x), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, x) || u.__v === i.__v) {
              h.props = m, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
                n && (n.__ = u);
              }), h.__h.length && f.push(h);
              break n;
            }

            null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, x), null != h.componentDidUpdate && h.__h.push(function () {
              h.componentDidUpdate(y, p, k);
            });
          }
          h.context = x, h.props = m, h.state = h.__s, (s = l$1.__r) && s(u), h.__d = !1, h.__v = u, h.__P = n, s = h.render(h.props, h.state, h.context), h.state = h.__s, null != h.getChildContext && (t = a$1(a$1({}, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, p)), A = null != s && s.type === d$1 && null == s.key ? s.props.children : s, w$2(n, Array.isArray(A) ? A : [A], u, i, t, o, r, f, e, c), h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
        } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L$1(i.__e, u, i, t, o, r, f, c);

        (s = l$1.diffed) && s(u);
      } catch (n) {
        u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l$1.__e(n, u, i);
      }
    }

    function z(n, u) {
      l$1.__c && l$1.__c(u, n), n.some(function (u) {
        try {
          n = u.__h, u.__h = [], n.some(function (n) {
            n.call(u);
          });
        } catch (n) {
          l$1.__e(n, u.__v);
        }
      });
    }

    function L$1(l, u, i, t, o, r, f, c) {
      var s,
          a,
          v,
          y = i.props,
          p = u.props,
          d = u.type,
          _ = 0;
      if ("svg" === d && (o = !0), null != r) for (; _ < r.length; _++) if ((s = r[_]) && (s === l || (d ? s.localName == d : 3 == s.nodeType))) {
        l = s, r[_] = null;
        break;
      }

      if (null == l) {
        if (null === d) return document.createTextNode(p);
        l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), r = null, c = !1;
      }

      if (null === d) y === p || c && l.data === p || (l.data = p);else {
        if (r = r && n.call(l.childNodes), a = (y = i.props || e$1).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c) {
          if (null != r) for (y = {}, _ = 0; _ < l.attributes.length; _++) y[l.attributes[_].name] = l.attributes[_].value;
          (v || a) && (v && (a && v.__html == a.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
        }

        if (C$1(l, p, y, o, c), v) u.__k = [];else if (_ = u.props.children, w$2(l, Array.isArray(_) ? _ : [_], u, i, t, o && "foreignObject" !== d, r, f, r ? r[0] : i.__k && k$1(i, 0), c), null != r) for (_ = r.length; _--;) null != r[_] && h$1(r[_]);
        c || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_) && H$1(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && H$1(l, "checked", _, y.checked, !1));
      }
      return l;
    }

    function M$1(n, u, i) {
      try {
        "function" == typeof n ? n(u) : n.current = u;
      } catch (n) {
        l$1.__e(n, i);
      }
    }

    function N(n, u, i) {
      var t, o;

      if (l$1.unmount && l$1.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M$1(t, null, u)), null != (t = n.__c)) {
        if (t.componentWillUnmount) try {
          t.componentWillUnmount();
        } catch (n) {
          l$1.__e(n, u);
        }
        t.base = t.__P = null;
      }

      if (t = n.__k) for (o = 0; o < t.length; o++) t[o] && N(t[o], u, "function" != typeof n.type);
      i || null == n.__e || h$1(n.__e), n.__e = n.__d = void 0;
    }

    function O$1(n, l, u) {
      return this.constructor(n, u);
    }

    function S$1(u, i, t) {
      var o, r, f;
      l$1.__ && l$1.__(u, i), r = (o = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], j$2(i, u = (!o && t || i).__k = v$1(d$1, null, [u]), r || e$1, e$1, void 0 !== i.ownerSVGElement, !o && t ? [t] : r ? null : i.firstChild ? n.call(i.childNodes) : null, f, !o && t ? t : r ? r.__e : i.firstChild, o), z(f, u);
    }

    function B(l, u, i) {
      var t,
          o,
          r,
          f = a$1({}, l.props);

      for (r in u) "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

      return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), y$1(l.type, f, t || l.key, o || l.ref, null);
    }

    function D$1(n, l) {
      var u = {
        __c: l = "__cC" + f$1++,
        __: n,
        Consumer: function (n, l) {
          return n.children(l);
        },
        Provider: function (n) {
          var u, i;
          return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
            return i;
          }, this.shouldComponentUpdate = function (n) {
            this.props.value !== n.value && u.some(m$1);
          }, this.sub = function (n) {
            u.push(n);
            var l = n.componentWillUnmount;

            n.componentWillUnmount = function () {
              u.splice(u.indexOf(n), 1), l && l.call(n);
            };
          }), n.children;
        }
      };
      return u.Provider.__ = u.Consumer.contextType = u;
    }

    n = c$1.slice, l$1 = {
      __e: function (n, l) {
        for (var u, i, t; l = l.__;) if ((u = l.__c) && !u.__) try {
          if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
        } catch (l) {
          n = l;
        }

        throw n;
      }
    }, u$1 = 0, _$1.prototype.setState = function (n, l) {
      var u;
      u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a$1({}, this.state), "function" == typeof n && (n = n(a$1({}, u), this.props)), n && a$1(u, n), null != n && this.__v && (l && this.__h.push(l), m$1(this));
    }, _$1.prototype.forceUpdate = function (n) {
      this.__v && (this.__e = !0, n && this.__h.push(n), m$1(this));
    }, _$1.prototype.render = d$1, t$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g$2.__r = 0, f$1 = 0;

    "undefined" != typeof window && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.5.14", l$1, {
      Fragment: d$1,
      Component: _$1
    });

    var t,
        u,
        r,
        o = 0,
        i = [],
        c = l$1.__b,
        f = l$1.__r,
        e = l$1.diffed,
        a = l$1.__c,
        v = l$1.unmount;

    function m(t, r) {
      l$1.__h && l$1.__h(u, t, o || r), o = 0;
      var i = u.__H || (u.__H = {
        __: [],
        __h: []
      });
      return t >= i.__.length && i.__.push({}), i.__[t];
    }

    function l(n) {
      return o = 1, p(w$1, n);
    }

    function p(n, r, o) {
      var i = m(t++, 2);
      return i.t = n, i.__c || (i.__ = [o ? o(r) : w$1(void 0, r), function (n) {
        var t = i.t(i.__[0], n);
        i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
      }], i.__c = u), i.__;
    }

    function y(r, o) {
      var i = m(t++, 3);
      !l$1.__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__H.__h.push(i));
    }

    function h(r, o) {
      var i = m(t++, 4);
      !l$1.__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__h.push(i));
    }

    function s(n) {
      return o = 5, d(function () {
        return {
          current: n
        };
      }, []);
    }

    function _(n, t, u) {
      o = 6, h(function () {
        "function" == typeof n ? n(t()) : n && (n.current = t());
      }, null == u ? u : u.concat(n));
    }

    function d(n, u) {
      var r = m(t++, 7);
      return k(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
    }

    function A$1(n, t) {
      return o = 8, d(function () {
        return n;
      }, t);
    }

    function F(n) {
      var r = u.context[n.__c],
          o = m(t++, 9);
      return o.c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u)), r.props.value) : n.__;
    }

    function x$1() {
      i.forEach(function (t) {
        if (t.__P) try {
          t.__H.__h.forEach(g$1), t.__H.__h.forEach(j$1), t.__H.__h = [];
        } catch (u) {
          t.__H.__h = [], l$1.__e(u, t.__v);
        }
      }), i = [];
    }

    l$1.__b = function (n) {
      u = null, c && c(n);
    }, l$1.__r = function (n) {
      f && f(n), t = 0;
      var r = (u = n.__c).__H;
      r && (r.__h.forEach(g$1), r.__h.forEach(j$1), r.__h = []);
    }, l$1.diffed = function (t) {
      e && e(t);
      var o = t.__c;
      o && o.__H && o.__H.__h.length && (1 !== i.push(o) && r === l$1.requestAnimationFrame || ((r = l$1.requestAnimationFrame) || function (n) {
        var t,
            u = function () {
          clearTimeout(r), b && cancelAnimationFrame(t), setTimeout(n);
        },
            r = setTimeout(u, 100);

        b && (t = requestAnimationFrame(u));
      })(x$1)), u = void 0;
    }, l$1.__c = function (t, u) {
      u.some(function (t) {
        try {
          t.__h.forEach(g$1), t.__h = t.__h.filter(function (n) {
            return !n.__ || j$1(n);
          });
        } catch (r) {
          u.some(function (n) {
            n.__h && (n.__h = []);
          }), u = [], l$1.__e(r, t.__v);
        }
      }), a && a(t, u);
    }, l$1.unmount = function (t) {
      v && v(t);
      var u = t.__c;
      if (u && u.__H) try {
        u.__H.__.forEach(g$1);
      } catch (t) {
        l$1.__e(t, u.__v);
      }
    };
    var b = "function" == typeof requestAnimationFrame;

    function g$1(n) {
      var t = u;
      "function" == typeof n.__c && n.__c(), u = t;
    }

    function j$1(n) {
      var t = u;
      n.__c = n.__(), u = t;
    }

    function k(n, t) {
      return !n || n.length !== t.length || t.some(function (t, u) {
        return t !== n[u];
      });
    }

    function w$1(n, t) {
      return "function" == typeof t ? t(n) : t;
    }

    function useMergedChildren(lhsProps, rhsProps) {
      const lhs = lhsProps === null || lhsProps === void 0 ? void 0 : lhsProps.children;
      const rhs = rhsProps === null || rhsProps === void 0 ? void 0 : rhsProps.children;

      if (lhs == null && rhs == null) {
        return undefined;
      } else if (lhs == null) {
        return rhs;
      } else if (rhs == null) {
        return lhs;
      } else {
        let ret = v$1(d$1, {}, lhs, rhs);
        return ret;
      }
    }

    function toVal(mix) {
      var k,
          y,
          str = '';

      if (typeof mix === 'string' || typeof mix === 'number') {
        str += mix;
      } else if (typeof mix === 'object') {
        if (Array.isArray(mix)) {
          for (k = 0; k < mix.length; k++) {
            if (mix[k]) {
              if (y = toVal(mix[k])) {
                str && (str += ' ');
                str += y;
              }
            }
          }
        } else {
          for (k in mix) {
            if (mix[k]) {
              str && (str += ' ');
              str += k;
            }
          }
        }
      }

      return str;
    }

    function clsx () {
      var i = 0,
          tmp,
          x,
          str = '';

      while (i < arguments.length) {
        if (tmp = arguments[i++]) {
          if (x = toVal(tmp)) {
            str && (str += ' ');
            str += x;
          }
        }
      }

      return str;
    }

    /**
     * Given two sets of props, merges their `class` and `className` properties.
     * Duplicate classes are removed (order doesn't matter anyway).
     *
     * @param lhs Classes of the first component
     * @param rhs Classes of the second component
     * @returns A string representing all combined classes from both arguments.
     */

    function useMergedClasses(lhs, rhs) {
      // Note: For the sake of forward compatibility, this function is labelled as
      // a hook, but as it uses no other hooks it technically isn't one.
      return mergeClasses(lhs, rhs);
    }

    function mergeClasses(lhs, rhs) {
      const lhsClass = lhs === null || lhs === void 0 ? void 0 : lhs.class;
      const lhsClassName = lhs === null || lhs === void 0 ? void 0 : lhs.className;
      const rhsClass = rhs === null || rhs === void 0 ? void 0 : rhs.class;
      const rhsClassName = rhs === null || rhs === void 0 ? void 0 : rhs.className;

      if (lhsClass || rhsClass || lhsClassName || rhsClassName) {
        let lhsClasses = clsx(lhsClass, lhsClassName).split(" ");
        let rhsClasses = clsx(rhsClass, rhsClassName).split(" ");
        let allClasses = new Set([...Array.from(lhsClasses), ...Array.from(rhsClasses)]);
        return Array.from(allClasses).join(" ");
      } else {
        return undefined;
      }
    }

    function processRef(instance, ref) {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref != null) {
        ref.current = instance;
      }
    }
    /**
     * Combines two refs into one. This allows a component to both use its own ref *and* forward a ref that was given to it.
     * @param lhs
     * @param rhs
     * @returns
     */


    function useMergedRefs() {
      return function (lhsProps, rhsProps) {
        const lhs = lhsProps === null || lhsProps === void 0 ? void 0 : lhsProps.ref;
        const rhs = rhsProps === null || rhsProps === void 0 ? void 0 : rhsProps.ref;
        let combined = A$1(current => {
          processRef(current, lhs);
          processRef(current, rhs);
        }, [lhs, rhs]);

        if (lhs == null && rhs == null) {
          return undefined;
        } else if (lhs == null) {
          return rhs;
        } else if (rhs == null) {
          return lhs;
        } else {
          return combined;
        }
      };
    }
    /*
    function typetest<P extends h.JSX.HTMLAttributes<HTMLInputElement>>(props: P) {

        const ref: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

        function acceptsRef(ref: Ref<any>) { }
        function acceptsOptionalRef(ref: Ref<any> | undefined) { }

        const c = [
            useMergedRefs<HTMLInputElement>()(undefined, undefined),
            useMergedRefs<HTMLInputElement>()({}, undefined),
            useMergedRefs<HTMLInputElement>()(props, undefined),
            useMergedRefs<HTMLInputElement>()(undefined, props),
            useMergedRefs<HTMLInputElement>()(props, props),
            useMergedRefs<HTMLInputElement>()({ ref }, props),
            useMergedRefs<HTMLInputElement>()({ ref }, { ref: undefined }),
            useMergedRefs<HTMLInputElement>()({ ref: undefined }, { ref }),
            useMergedRefs<HTMLInputElement>()({ ref }, { ref }),
        ] as const;

        /// @ts-expect-error
        acceptsRef(c[0]);
        /// @ts-expect-error
        acceptsRef(c[1]);

        acceptsOptionalRef(c[2]);
        acceptsOptionalRef(c[3]);
        acceptsOptionalRef(c[4]);

        /// @ts-expect-error TODO
        acceptsRef(c[5]);
        acceptsRef(c[6]);
        acceptsRef(c[7]);
        acceptsRef(c[8]);
    }
    */

    /**
     * Merges two style objects, returning the result.
     *
     * @param style The user-given style prop for this component
     * @param obj The CSS properties you want added to the user-given style
     * @returns A CSS object containing the properties of both objects.
     */
    function useMergedStyles(lhs, rhs) {
      var _lhs$style, _rhs$style2;

      // Easy case, when there are no styles to merge return nothing.
      if (!(lhs !== null && lhs !== void 0 && lhs.style) && !(rhs !== null && rhs !== void 0 && rhs.style)) return undefined;

      if (typeof lhs != typeof rhs) {
        // Easy cases, when one is null and the other isn't.
        if (lhs !== null && lhs !== void 0 && lhs.style && !(rhs !== null && rhs !== void 0 && rhs.style)) return lhs.style;
        if (!(lhs !== null && lhs !== void 0 && lhs.style) && rhs !== null && rhs !== void 0 && rhs.style) return rhs.style; // They're both non-null but different types.
        // Convert the string type to an object bag type and run it again.

        if (lhs !== null && lhs !== void 0 && lhs.style && rhs !== null && rhs !== void 0 && rhs.style) {
          // (useMergedStyles isn't a true hook -- this isn't a violation)
          if (typeof (lhs === null || lhs === void 0 ? void 0 : lhs.style) == "string") return useMergedStyles({
            style: Object.fromEntries(lhs === null || lhs === void 0 ? void 0 : lhs.style.split(";").map(statement => statement.split(":")))
          }, rhs);
          if (typeof (rhs === null || rhs === void 0 ? void 0 : rhs.style) == "string") return useMergedStyles(lhs === null || lhs === void 0 ? void 0 : lhs.style, {
            style: Object.fromEntries(lhs === null || lhs === void 0 ? void 0 : lhs.style.split(";").map(statement => statement.split(":")))
          });
        } // Logic???


        return undefined;
      } // They're both strings, just concatenate them.


      if (typeof (lhs === null || lhs === void 0 ? void 0 : lhs.style) == "string") {
        var _rhs$style;

        return `${lhs.style};${(_rhs$style = rhs === null || rhs === void 0 ? void 0 : rhs.style) !== null && _rhs$style !== void 0 ? _rhs$style : ""}`;
      } // They're both objects, just merge them.


      return { ...((_lhs$style = lhs === null || lhs === void 0 ? void 0 : lhs.style) !== null && _lhs$style !== void 0 ? _lhs$style : {}),
        ...((_rhs$style2 = rhs === null || rhs === void 0 ? void 0 : rhs.style) !== null && _rhs$style2 !== void 0 ? _rhs$style2 : {})
      };
    }

    let log = str => {
      debugger;
      /* Intentional */
    };
    /**
     * Given two sets of props, merges them and returns the result.
     *
     * The hook is aware of and can intelligently merge `className`, `class`, `style`, `ref`, and all event handlers.
     * @param lhs2
     * @param rhs2
     * @returns
     */

    function useMergedProps() {
      return function (lhs2, rhs2) {
        // First, put in all the properties that are easy to reason about
        // and all lhs props. We're going to merge in rhs just after.
        const {
          children: lhsChildren,
          class: lhsClass,
          className: lhsClassName,
          style: lhsStyle,
          ref: lhsRef,
          ...lhs
        } = lhs2;
        const {
          children: rhsChildren,
          class: rhsClass,
          className: rhsClassName,
          style: rhsStyle,
          ref: rhsRef,
          ...rhs
        } = rhs2;
        let ret = { ...lhs,
          ref: useMergedRefs()(lhs2, rhs2),
          style: useMergedStyles(lhs2, rhs2),
          className: useMergedClasses(lhs2, rhs2),
          children: useMergedChildren(lhs2, rhs2)
        };
        if (ret.ref === undefined) delete ret.ref;
        if (ret.style === undefined) delete ret.style;
        if (ret.className === undefined) delete ret.className;
        if (ret.children === undefined) delete ret.children; // Now, do *everything* else
        // Merge every remaining existing entry in lhs with what we've already put in ret.
        //const lhsEntries = Object.entries(lhs) as [keyof T, T[keyof T]][];

        const rhsEntries = Object.entries(rhs);

        for (const [rhsKey, rhsValue] of rhsEntries) {
          const lhsValue = lhs[rhsKey];

          if (typeof lhsValue === "function" || typeof rhsValue === "function") {
            // They're both functions that can be merged (or one's a function and the other's null).
            // Not an *easy* case, but a well-defined one.
            const merged = mergeFunctions(lhsValue, rhsValue);
            ret[rhsKey] = merged;
          } else {
            // Uh...we're here because one of them's null, right?
            if (lhsValue == null && rhsValue == null) {
              if (rhsValue === null && lhsValue === undefined) ret[rhsKey] = rhsValue;else ret[rhsKey] = lhsValue;
            }

            if (lhsValue == null) ret[rhsKey] = rhsValue;else if (rhsValue == null) ret[rhsKey] = lhsValue;else if (rhsValue == lhsValue) ; else {
              var _log;

              // Ugh.
              // No good strategies here, just log it if requested
              (_log = log) === null || _log === void 0 ? void 0 : _log(`Could not merge incompatible prop "${rhsKey}" (type: ${typeof rhsValue}, values: [${lhsValue}, ${rhsValue}])`);
              ret[rhsKey] = rhsValue;
            }
          }
        }

        return ret;
      };
    }

    function mergeFunctions(lhs, rhs) {
      if (!lhs) return rhs;
      if (!rhs) return lhs;
      return (...args) => {
        let lv = lhs === null || lhs === void 0 ? void 0 : lhs(...args);
        let rv = rhs === null || rhs === void 0 ? void 0 : rhs(...args);
        if (lv instanceof Promise || rv instanceof Promise) return Promise.all([lv, rv]);
      };
    }
    /*
    function test<P extends h.JSX.HTMLAttributes<HTMLInputElement>>(props: P) {

        const id0: GenericGet<{}, "id", string> = "";
        const id3: GenericGet<{ id: undefined }, "id", string> = undefined;
        const id4: GenericGet<{ id: undefined }, "id", string> = undefined;
        const id5: GenericGet<{ id: undefined }, "id", string> = undefined;
        const id6: GenericGet<{ id: undefined }, "id", string> = undefined;
        //const id2: ZipSingle<string | undefined, string | undefined> = undefined;
        const id1: ZipObject<{ id: undefined }, { id: string }> = { id: undefined };

        type M1 = GenericGet<P, "style", string>;
        type M2 = GenericGet<{}, "style", string>;
        const m1: M1 = "";
        const m2: M1 = undefined;
        /// @ts-expect-error    Because number isn't assignable to string
        const m3: M1 = 0;

        const m4: M2 = "";
        const m5: M2 = undefined;
        /// @ts-expect-error    Because number isn't assignable to string
        const m6: M2 = 0;

        const p1: MergedProps<HTMLInputElement, {}, { id: string }> = useMergedProps<HTMLInputElement>()({}, { id: "string" });
        const p2: MergedProps<HTMLInputElement, { id: undefined }, { id: string }> = useMergedProps<HTMLInputElement>()({ id: undefined }, { id: "string" });
        const p3: MergedProps<HTMLInputElement, { id: undefined }, { id: undefined }> = useMergedProps<HTMLInputElement>()({ id: undefined }, { id: undefined });
        const p4: MergedProps<HTMLInputElement, {}, {}> = useMergedProps<HTMLInputElement>()({}, {});
        const p5 = useMergedProps<HTMLInputElement>()(props, {});
        const p6 = useMergedProps<HTMLInputElement>()(props, { id: undefined });
        const p7 = useMergedProps<HTMLInputElement>()(props, { id: "string" });


        p1.id?.concat("");
        p2.id?.concat("");
        /// @ts-expect-error    id can't be anything but undefined
        p3.id?.concat("");
        /// @ts-expect-error    id can't be anything but undefined
        p4.id?.concat("");


        p5.id?.concat("");
        p6.id?.concat("");
        p7.id?.concat("");

        /// @ts-expect-error    id must contain undefined
        p5.id.concat("");
        /// @ts-expect-error    id must contain undefined
        p6.id.concat("");
        /// @ts-expect-error    id must contain undefined
        p7.id.concat("");


        if (p5.allowFullScreen === undefined) {}
        else if (p5.allowFullScreen === false) {}
        else if (p5.allowFullScreen === true) {}
        else {
            acceptsNever(p5.allowFullScreen);
        }


        if (p6.allowFullScreen === undefined) {}
        else if (p6.allowFullScreen === false) {}
        else if (p6.allowFullScreen === true) {}
        else {
            acceptsNever(p6.allowFullScreen);
        }


        if (p7.allowFullScreen === undefined) {}
        else if (p7.allowFullScreen === false) {}
        else if (p7.allowFullScreen === true) {}
        else {
            acceptsNever(p7.allowFullScreen);
        }


        // Make sure it works recursively
        const r1a = useMergedProps<HTMLInputElement>()({}, p1);
        const r1b = useMergedProps<HTMLInputElement>()(props, p1);
        const r2a = useMergedProps<HTMLInputElement>()({}, p2);
        const r2b = useMergedProps<HTMLInputElement>()(props, p2);
        const r3a = useMergedProps<HTMLInputElement>()({}, p3);
        const r3b = useMergedProps<HTMLInputElement>()(props, p3);
        const r4a = useMergedProps<HTMLInputElement>()({}, p4);
        const r4b = useMergedProps<HTMLInputElement>()(props, p4);
        const r5a = useMergedProps<HTMLInputElement>()({}, p5);
        const r5b = useMergedProps<HTMLInputElement>()(props, p5);
        const r6a = useMergedProps<HTMLInputElement>()({}, p6);
        const r6b = useMergedProps<HTMLInputElement>()(props, p6);
        const r7a = useMergedProps<HTMLInputElement>()({}, p7);
        const r7b = useMergedProps<HTMLInputElement>()(props, p7);


        r1a.id?.concat("");
        r1b.id?.concat("");
        r2a.id?.concat("");
        r2b.id?.concat("");
        // @ts-expect-error    id can't be anything but undefined
        r3a.id?.concat("");
        r3b.id?.concat("");
        /// @ts-expect-error    id can't be anything but undefined
        r4a.id?.concat("");
        r4b.id?.concat("");


        r5a.id?.concat("");
        r5b.id?.concat("");
        r6a.id?.concat("");
        r6b.id?.concat("");
        r7a.id?.concat("");
        r7b.id?.concat("");

        /// @ts-expect-error    id must contain undefined
        r5a.id.concat("");
        /// @ts-expect-error    id must contain undefined
        r5b.id.concat("");
        /// @ts-expect-error    id must contain undefined
        r6a.id.concat("");
        /// @ts-expect-error    id must contain undefined
        r6b.id.concat("");
        /// @ts-expect-error    id must contain undefined
        r7a.id.concat("");
        /// @ts-expect-error    id must contain undefined
        r7b.id.concat("");


        if (r5a.allowFullScreen === undefined) {}
        else if (r5a.allowFullScreen === false) {}
        else if (r5a.allowFullScreen === true) {}
        else {
            acceptsNever(r5a.allowFullScreen);
        }


        if (r5b.allowFullScreen === undefined) {}
        else if (r5b.allowFullScreen === false) {}
        else if (r5b.allowFullScreen === true) {}
        else {
            acceptsNever(r5b.allowFullScreen);
        }


        if (r6a.allowFullScreen === undefined) {}
        else if (r6a.allowFullScreen === false) {}
        else if (r6a.allowFullScreen === true) {}
        else {
            acceptsNever(r6a.allowFullScreen);
        }


        if (r6b.allowFullScreen === undefined) {}
        else if (r6b.allowFullScreen === false) {}
        else if (r6b.allowFullScreen === true) {}
        else {
            acceptsNever(r6b.allowFullScreen);
        }


        if (r7a.allowFullScreen === undefined) {}
        else if (r7a.allowFullScreen === false) {}
        else if (r7a.allowFullScreen === true) {}
        else {
            acceptsNever(r7a.allowFullScreen);
        }


        if (r7b.allowFullScreen === undefined) {}
        else if (r7b.allowFullScreen === false) {}
        else if (r7b.allowFullScreen === true) {}
        else {
            acceptsNever(r7b.allowFullScreen);
        }

    }
    function acceptsNever(n: never) {}
    */

    /**
     * Slightly enhanced version of `useState` that includes a getter that remains constant
     * (i.e. you can use it in `useEffect` and friends without it being a dependency).
     *
     * @param initialState
     * @returns
     */

    function useState(initialState) {
      // We keep both
      const [state, setState] = l(initialState);
      const ref = s(state); // Hijack the normal setter function 
      // to also set our ref to the new value

      const set = A$1(value => {
        if (typeof value === "function") {
          let callback = value;
          setState(prevValue => {
            let nextValue = callback(prevValue);
            ref.current = nextValue;
            return nextValue;
          });
        } else {
          ref.current = value;
          setState(value);
        }
      }, []);

      const get = () => {
        return ref.current;
      };

      console.assert(ref.current === state);
      return [state, set, get];
    }

    /**
     * Allows accessing the element a ref references as soon as it does so.
     * *This hook itself returns a hook*--useRefElementProps modifies the props that you were going to pass to an HTMLElement,
     * adding a RefCallback and merging it with any existing ref that existed on the props.
     *
     * Don't forget to provide the Element as the type argument!
     *
     * @returns The element, and the sub-hook that makes it retrievable.
     */

    function useRefElement() {
      // Let us store the actual (reference to) the element we capture
      const [element, setElement, getElement] = useState(null); // Create a RefCallback that's fired when mounted 
      // and that notifies us of our element when we have it

      const myRef = A$1(e => {
        if (e) setElement(() => e);
      }, []);
      const useRefElementProps = A$1(props => useMergedProps()({
        ref: myRef
      }, props), []); // Return both the element and the hook that modifies 
      // the props and allows us to actually find the element

      return {
        useRefElementProps,
        element,
        getElement
      };
    }

    function useElementSize({
      observeBox
    } = {}) {
      const {
        element,
        useRefElementProps
      } = useRefElement();
      const [size, setSize, getSize] = useState(null);
      y(() => {
        if (element) {
          const handleUpdate = () => {
            const {
              clientWidth,
              scrollWidth,
              offsetWidth,
              clientHeight,
              scrollHeight,
              offsetHeight,
              clientLeft,
              scrollLeft,
              offsetLeft,
              clientTop,
              scrollTop,
              offsetTop
            } = element;
            setSize({
              clientWidth,
              scrollWidth,
              offsetWidth,
              clientHeight,
              scrollHeight,
              offsetHeight,
              clientLeft,
              scrollLeft,
              offsetLeft,
              clientTop,
              scrollTop,
              offsetTop
            });
          };

          if (!("ResizeObserver" in window)) {
            document.addEventListener("resize", handleUpdate, {
              passive: true
            });
            return () => document.removeEventListener("resize", handleUpdate);
          } else {
            const observer = new ResizeObserver(entries => {
              handleUpdate();
            });
            observer.observe(element, {
              box: observeBox
            });
            return () => observer.disconnect();
          }
        }
      }, [element, observeBox]);
      return {
        element,
        elementSize: size,
        getElementSize: getSize,
        useElementSizeProps: useRefElementProps
      };
    }

    function capitalize(str) {
      return str[0].toUpperCase() + str.substr(1);
    }
    /**
     * Inspects the element's style and determines the logical direction that text flows.
     *
     * Certain CSS properties, like `block-size`, respect the current writing mode and text direction.
     * But `transform`, `clip`, etc. don't.
     *
     * This is provided so that CSS properties can consistently use those logical properties.
     *
     * See https://drafts.csswg.org/css-writing-modes/#logical-to-physical
     *
     * @returns An object containing the following functions:
     * * `getLogicalDirection`: retrieves a `LogicalDirectionInfo` representing the current state of the element. (Function is constant between renders)
     * * `convertElementSize`: When used in conjunction with `useElementSize`, allows you to retrieve the logical size of an element instead of the physical size.
     * * `convertToLogicalOrientation`: Based on the current direction, converts "horizontal" or "vertical" to "inline" or "block".
     * * `convertToPhysicalOrientation`:  Based on the current direction, converts "inline" or "block" to "horizontal" or "vertical".
     */


    function useLogicalDirection(element) {
      const [writingMode, setWritingMode] = l(null);
      const [direction, setDirection] = l(null);
      const [textOrientation, setTextOrientation] = l(null);
      const writingModeRef = s(writingMode);
      const directionRef = s(direction);
      const textOrientationRef = s(textOrientation);
      h(() => {
        writingModeRef.current = writingMode;
      }, [writingMode]);
      h(() => {
        directionRef.current = direction;
      }, [direction]);
      h(() => {
        textOrientationRef.current = textOrientation;
      }, [textOrientation]); // TODO: There's no way to refresh which writing mode we have once mounted.
      // If the writing mode changes, the whole component needs to 
      // mount/unmount because (more-or-less in order of importance)
      //   A. There's no way to watch for CSS style changes
      //   B. Calling getComputedStyle after every render for every element gets expensive fast and
      //   C. Is not necessary for 99% of use cases that will never switch writing-mode within a single component
      //      (Those that do will need to mount and unmount the component that uses it)
      //
      // Maybe there could be a context object that can be used to remotely update all components that use this hook?

      h(() => {
        if (element) {
          const computedStyles = window.getComputedStyle(element);
          const w = computedStyles.writingMode;
          const t = computedStyles.textOrientation;
          const d = computedStyles.direction;
          setWritingMode(w || "horizontal-tb");
          setDirection(d || "rtl");
          setTextOrientation(t || "mixed");
        }
      }, [element]);
      const getLogicalDirection = A$1(() => {
        var _direction;

        let writingMode = writingModeRef.current;
        let direction = directionRef.current;
        let textOrientation = textOrientationRef.current;
        if (!writingMode || !direction || !textOrientation) return null;
        if (textOrientation == "upright") direction = "ltr";
        return { ...WritingModes[writingMode !== null && writingMode !== void 0 ? writingMode : "horizontal-tb"][(_direction = direction) !== null && _direction !== void 0 ? _direction : "ltr"]
        };
      }, [writingModeRef, directionRef, textOrientationRef]);
      const convertToLogicalOrientation = A$1((elementOrientation, direction) => {
        var _direction2, _direction3;

        (_direction2 = direction) !== null && _direction2 !== void 0 ? _direction2 : direction = getLogicalDirection();
        if (((_direction3 = direction) === null || _direction3 === void 0 ? void 0 : _direction3.inlineOrientation) === elementOrientation) return "inline";
        return "block";
      }, [getLogicalDirection]);
      const convertToPhysicalOrientation = A$1((elementOrientation, direction) => {
        var _direction4;

        (_direction4 = direction) !== null && _direction4 !== void 0 ? _direction4 : direction = getLogicalDirection();

        if (elementOrientation == "inline") {
          var _direction5;

          if (((_direction5 = direction) === null || _direction5 === void 0 ? void 0 : _direction5.inlineOrientation) == "horizontal") return "horizontal";
          return "vertical";
        } else {
          var _direction6;

          if (((_direction6 = direction) === null || _direction6 === void 0 ? void 0 : _direction6.blockOrientation) == "vertical") return "vertical";
          return "horizontal";
        }
      }, [getLogicalDirection]);
      const convertElementSize = A$1((elementSize, direction) => {
        var _direction7;

        (_direction7 = direction) !== null && _direction7 !== void 0 ? _direction7 : direction = getLogicalDirection();

        if (direction) {
          const {
            inlineSize,
            blockSize,
            inlineDirection,
            blockDirection
          } = direction; // Size is relatively simple

          let clientInlineSize = elementSize[`client${capitalize(inlineSize)}`];
          let clientBlockSize = elementSize[`client${capitalize(blockSize)}`];
          let offsetInlineSize = elementSize[`offset${capitalize(inlineSize)}`];
          let offsetBlockSize = elementSize[`offset${capitalize(blockSize)}`];
          let scrollInlineSize = elementSize[`scroll${capitalize(inlineSize)}`];
          let scrollBlockSize = elementSize[`scroll${capitalize(blockSize)}`]; // Position requires us to sometimes use one property (like `left`)
          // or sometimes two (like `left` + `width`)

          function getPhysicalLeftTop(dir) {
            if (dir === "ltr" || dir == "rtl") return "left";
            return "top";
          }

          function getPhysicalRightBottom(dir) {
            if (dir === "rtl") return "width";
            if (dir === "btt") return "height";
            return null;
          }

          const f1 = getPhysicalLeftTop(inlineDirection);
          const f2 = getPhysicalRightBottom(inlineDirection);
          const f3 = getPhysicalLeftTop(blockDirection);
          const f4 = getPhysicalRightBottom(blockDirection);
          let clientInlineInset = elementSize[`client${capitalize(f1)}`] + (!f2 ? 0 : elementSize[`client${capitalize(f2)}`]);
          let scrollInlineInset = elementSize[`scroll${capitalize(f1)}`] + (!f2 ? 0 : elementSize[`scroll${capitalize(f2)}`]);
          let offsetInlineInset = elementSize[`offset${capitalize(f1)}`] + (!f2 ? 0 : elementSize[`offset${capitalize(f2)}`]);
          let clientBlockInset = elementSize[`client${capitalize(f3)}`] + (!f4 ? 0 : elementSize[`client${capitalize(f4)}`]);
          let scrollBlockInset = elementSize[`scroll${capitalize(f3)}`] + (!f4 ? 0 : elementSize[`scroll${capitalize(f4)}`]);
          let offsetBlockInset = elementSize[`offset${capitalize(f3)}`] + (!f4 ? 0 : elementSize[`offset${capitalize(f4)}`]);
          return {
            clientInlineSize,
            scrollInlineSize,
            offsetInlineSize,
            clientBlockSize,
            scrollBlockSize,
            offsetBlockSize,
            clientInlineInset,
            scrollInlineInset,
            offsetInlineInset,
            clientBlockInset,
            scrollBlockInset,
            offsetBlockInset
          };
        }

        return null;
      }, [getLogicalDirection]);
      return {
        getLogicalDirection,
        convertElementSize,
        convertToLogicalOrientation,
        convertToPhysicalOrientation
      };
    }
    const HorizontalTbLtr = {
      inlineDirection: "ltr",
      blockDirection: "ttb",
      inlineOrientation: "horizontal",
      blockOrientation: "vertical",
      inlineSize: "width",
      blockSize: "height",
      leftRightDirection: "ltr",
      overUnderDirection: "ttb"
    };
    const HorizontalTbRtl = { ...HorizontalTbLtr,
      inlineDirection: "rtl"
    };
    const VerticalRlLtr = {
      inlineDirection: "ttb",
      blockDirection: "rtl",
      inlineOrientation: "vertical",
      blockOrientation: "horizontal",
      inlineSize: "height",
      blockSize: "width",
      leftRightDirection: "ttb",
      overUnderDirection: "rtl"
    };
    const VerticalRlRtl = { ...VerticalRlLtr,
      inlineDirection: "btt"
    };
    const SidewaysRlLtr = { ...VerticalRlLtr
    };
    const SidewaysRlRtl = { ...VerticalRlRtl
    };
    const VerticalLrLtr = { ...VerticalRlLtr,
      blockDirection: "ltr"
    };
    const VerticalLrRtl = { ...VerticalRlRtl,
      blockDirection: "ltr"
    };
    const SidewaysLtLtr = { ...VerticalLrLtr,
      inlineDirection: "btt",
      leftRightDirection: "btt",
      overUnderDirection: "ltr"
    };
    const SidewaysLtRtl = { ...SidewaysLtLtr,
      inlineDirection: "ttb"
    };
    const HorizontalTb = {
      ltr: HorizontalTbLtr,
      rtl: HorizontalTbRtl
    };
    const VerticalRl = {
      ltr: VerticalRlLtr,
      rtl: VerticalRlRtl
    };
    const VerticalLr = {
      ltr: VerticalLrLtr,
      rtl: VerticalLrRtl
    };
    const SidewaysRl = {
      ltr: SidewaysRlLtr,
      rtl: SidewaysRlRtl
    };
    const SidewaysLr = {
      ltr: SidewaysLtLtr,
      rtl: SidewaysLtRtl
    };
    const WritingModes = {
      "horizontal-tb": HorizontalTb,
      "vertical-lr": VerticalLr,
      "vertical-rl": VerticalRl,
      "sideways-lr": SidewaysLr,
      "sideways-rl": SidewaysRl
    };

    /**
     * Given an input value, returns a constant getter function that can be used
     * inside of `useEffect` and friends without including it in the dependency array.
     *
     * Use with caution, and **do not use the getter in useLayoutEffect!!**
     * `setState`'s getter does not have this problem, but then you're using your own state
     * instead of an existing value, which might not always be feasible.
     *
     * Weigh your options, and hopefully one of them gets the job done.
     *
     * @param value
     * @returns
     */

    function useStableGetter(value) {
      const ref = s(value);
      _(ref, () => value);
      return A$1(() => {
        return ref.current;
      }, []);
    }

    /**
     * Alternate useCallback() which always returns the same (wrapped) function reference
     * so that it can be excluded from the dependency arrays of `useEffect` and friends.
     *
     * DO NOT USE THE RESULT IN useLayoutEffect!!
     *
     * TODO: Investigate options.diffed if the useLayoutEffect limitation becomes limitlessly limiting.
     *
     * Source: https://github.com/facebook/react/issues/14099#issuecomment-659298422
     */

    function useStableCallback(fn) {
      const currentCallbackGetter = useStableGetter(fn);
      return A$1((...args) => {
        const currentFunc = currentCallbackGetter();

        if (!currentFunc) {
          throw new Error('Callback retrieved from useStableCallback() cannot be called from useLayoutEffect().');
        }

        return currentFunc(...args);
      }, []);
    }

    /**
     * Wrap the native `useLayoutEffect` to add arguments
     * that allow accessing the previous value as the first argument,
     * as well as the changes that caused the hook to be called as the second argument.
     *
     * @param effect
     * @param inputs
     */

    function useLayoutEffect(effect, inputs) {
      const prevInputs = s(inputs);

      const effect2 = () => {
        let changes = [];

        for (let i = 0; i < Math.max(prevInputs.current.length, inputs.length); ++i) {
          if (prevInputs.current[i] != inputs[i]) changes[i] = {
            from: prevInputs.current[i],
            to: inputs[i]
          };
        }

        const ret = effect(prevInputs.current, changes);
        prevInputs.current = inputs;
        return ret;
      };

      h(effect2, inputs);
    }

    function useTimeout({
      timeout,
      callback,
      triggerIndex
    }) {
      const stableCallback = useStableCallback(callback);
      const getTimeout = useStableGetter(timeout);
      const timeoutIsNull = timeout == null;
      y(() => {
        const timeout = getTimeout();
        console.assert(timeoutIsNull == (timeout == null));

        if (timeout) {
          const handle = setTimeout(stableCallback, timeout);
          return () => clearTimeout(handle);
        }
      }, [triggerIndex, timeoutIsNull]);
    }

    /**
     * Given an asyncronous event handler, returns a syncronous one that works on the DOM,
     * along with some other information related to the current state.
     * Does not modify any props.
     *
     * The handler is automatically throttled to only run one at a time.
     * If the handler is called, and then before it finishes, is called again,
     * it will be put on hold until the current one finishes, at which point
     * the second one will run.  If the handler is called a third time before
     * the first has finished, it will *replace* the second, so only the most
     * recently called iteration of the handler will run.
     *
     * You may optionally *also* specify a debounce parameter that waits until the
     * syncronous handler has not been called for the specified number of
     * milliseconds, at which point we *actually* run the asyncronous handler
     * according to the logic in the previous paragraph. This is in
     * *addition* to throttling the handler, and does not replace that behavior.
     *
     * Note that the parameters to the async handler are slightly different than
     * the sync handler &ndash; the first argument, as decided by you with the
     * `capture` parameter for this hook, is the "saved" information from the
     * event.  For example, the event's currentTarget's `value`, which may have
     * changed by the time the handler is *actually* called.  The second argument
     * is the original event, which might still have some useful fields on it
     * like `mouseX` or something, but is stale at least in regards to the
     * element it references.
     */

    function useAsyncHandler() {
      return function ({
        capture,
        debounce
      }) {
        // Always represents whatever promise is currently being waited on, or null if none.
        const [promise, setPromise, getPromise] = useState(null); // Keep track of how many times we've actually called the async handler

        const [runCount, setRunCount] = useState(0);
        const [resolveCount, setResolveCount] = useState(0);
        const [rejectCount, setRejectCount] = useState(0); // 

        const [currentType, setCurrentType] = useState(null); // If we're set to use a debounce, then when the timeout finishes,
        // the promise from this state object is transferred over to either 
        // the current promise or the pending promise.

        const [debouncedPromiseStarter, setDebouncedPromiseStarter, getDebouncedPromiseStarter] = useState(null); // When we want to start a new promise, we won't allow it to start if one is still running.
        // In that case, we store the promise (or rather, a way to start the promise) in state.

        const [pendingPromiseStarter, setPendingPromiseStarter, getPendingPromiseStarter] = useState(null); // We need to differentiate between `undefined` and "no error has been thrown".

        const [error, setError, getError] = useState(undefined);
        const [hasError, setHasError, getHasError] = useState(false); // Same thing, we need to differentiate between "nothing captured yet" and "`undefined` was captured"

        const [currentCapture, setCurrentCapture, getCurrentCapture] = useState(undefined);
        const [hasCapture, setHasCapture] = useState(false); // When the debounce timer is up (or we manually request the debounce to end)
        // run the normal "please consider running this promise" routine that we would
        // have just run immediately if we weren't debouncing our promises.

        const onDebounceTimeUp = A$1(() => {
          const debouncedPromiseStarter = getDebouncedPromiseStarter();
          if (debouncedPromiseStarter) wantToStartANewPromise(debouncedPromiseStarter);
          setDebouncedPromiseStarter(null);
        }, [wantToStartANewPromise, setDebouncedPromiseStarter]); // Handle the debounce. Logically this happens before the main step as a sort of step 0.
        // Resets the timeout any time the handler was requested to be called again
        // and when it finishes, actually call the handler (or set it as the pending promise)

        useTimeout({
          timeout: debounce !== null && debounce !== void 0 ? debounce : null,
          callback: onDebounceTimeUp,
          triggerIndex: debouncedPromiseStarter
        }); // See if we should set our current promise to be whatever the pending promise is
        // (usually because the current promise finished and became null).

        useLayoutEffect(() => {
          // Our current promise just finished and there's one waiting?
          if (promise == null && pendingPromiseStarter != null) {
            wantToStartANewPromise(pendingPromiseStarter);
            setPendingPromiseStarter(null);
          }
        }, [promise, pendingPromiseStarter]); // Called any time the async handler is about to be called for whatever reason,
        // except for debounce, which comes first, as a sort of "step 0".
        // Handles all the necessary boilerplate related to choosing whether to
        // run or set as pending, resetting state variables, etc.

        function wantToStartANewPromise(startPromise) {
          let alreadyRunningPromise = getPromise() != null; // Boilerplate wrapper around the given promise starter

          let startPromiseWithBoilerplate = () => {
            // When it starts, notify the caller
            setRunCount(r => ++r); // When it completes, notify the caller
            // When it fails, save the error and notify the caller
            // When it settles, reset our state so we can run a pending promise if it exists

            const onThen = () => {
              setResolveCount(c => ++c);
            };

            const onCatch = ex => {
              setError(ex);
              setHasError(true);
              setRejectCount(c => ++c);
            };

            const onFinally = () => {
              setPromise(null);
            }; // Handle the special case where the handler is synchronous


            let result;

            try {
              result = startPromise();

              if (result == undefined) {
                // It's synchronous and returned successfully.
                // Bail out early.
                onThen();
                onFinally();
                setCurrentType("sync");
                return;
              }

              console.assert("then" in result);
            } catch (ex) {
              // It's synchronous (or asynchronous but didn't await anything yet) and threw an error.
              // Bail out early.
              onCatch(ex);
              onFinally();
              setCurrentType("sync");
              return;
            } // The handler is asynchronous


            setCurrentType("async");
            return (async () => {
              await result;
            })().then(onThen).catch(onCatch).finally(onFinally);
          };

          if (!alreadyRunningPromise) {
            // Start the promise immediately, because there wasn't one running already.
            let nextPromise = startPromiseWithBoilerplate();

            if (nextPromise == undefined) ; else {
              setError(undefined);
              setHasError(false);
              setPromise(nextPromise);
            }
          } else {
            // Don't start the promise yet, 
            // and allow it to start in the future instead.
            setPendingPromiseStarter(_ => startPromiseWithBoilerplate);
          }
        }

        let ret = {
          getSyncHandler,
          getCurrentCapture,
          callCount: runCount,
          currentCapture,
          hasCapture,
          pending: promise != null,
          hasError,
          error,
          currentType,
          flushDebouncedPromise: onDebounceTimeUp,
          resolveCount,
          rejectCount,
          settleCount: rejectCount + resolveCount
        };
        return ret;

        function getSyncHandler(asyncHandler) {
          const syncHandler = useStableCallback(function syncHandler(event) {
            if (asyncHandler == null) return; // Get the most significant information from the event at this time,
            // which is necessary since the promise could actually be called much later
            // when the element's value (etc.) has changed.

            const captured = capture(event);
            setCurrentCapture(captured);
            setHasCapture(true);

            const startPromise = () => asyncHandler(captured, event);

            if (debounce == null) {
              wantToStartANewPromise(startPromise);
            } else {
              setDebouncedPromiseStarter(_ => startPromise);
            }
          });
          return asyncHandler == null ? undefined : syncHandler;
        }
      };
    }

    /**
     * When used in tandem with `useRovingTabIndex`, allows control of
     * the tabbable index with the arrow keys.
     *
     * @see useListNavigation, which packages everything up together.
     */

    function useLinearNavigation({
      index,
      navigateToFirst,
      navigateToLast,
      navigateToNext,
      navigateToPrev,
      managedChildren,
      navigationDirection
    }) {
      var _navigationDirection;

      (_navigationDirection = navigationDirection) !== null && _navigationDirection !== void 0 ? _navigationDirection : navigationDirection = "either";
      const childCount = managedChildren.length; // Make sure the tabbable index never escapes the bounds of all available children
      // TODO: Keep track of the original index and keep it, at least until keyboard navigation.

      useLayoutEffect(() => {
        if (index !== null) {
          if (index < 0) {
            navigateToFirst();
          } else if (childCount > 0 && index >= childCount) {
            navigateToLast();
          }
        }
      }, [index, childCount, navigateToFirst, navigateToLast]); // These allow us to manipulate what our current tabbable child is.

      /*const navigateToIndex = useCallback((index: number) => { setIndex(index < 0 ? (managedChildren.length + index) : index); }, []);
      const navigateToNext = useCallback(() => { setIndex((i: number | null) => i === null? null! : i >= managedChildren.length - 1? managedChildren.length - 1 : ++i); }, []);
      const navigateToPrev = useCallback(() => { setIndex((i: number | null) => i === null? null! : i < 0? 0 : --i); }, []);
      const navigateToStart = useCallback(() => { navigateToIndex(0); }, [navigateToIndex]);
      const navigateToEnd = useCallback(() => { navigateToIndex(-1); }, [navigateToIndex]);*/

      const useLinearNavigationChild = A$1(() => {
        var _element$parentElemen;

        const {
          useRefElementProps,
          element
        } = useRefElement(); // Prefer the parent element's direction so that we're not calling getComputedStyle
        // on every single individual child, which is likely redundant.
        // TODO: Does useLogicalDirection need to hold a per-render & per-element cache to make this work?
        // Or does the browser automatically cache the computations until something changes?
        // Given that the values are live, it seems like it should be the latter...

        const {
          convertElementSize,
          getLogicalDirection
        } = useLogicalDirection((_element$parentElemen = element === null || element === void 0 ? void 0 : element.parentElement) !== null && _element$parentElemen !== void 0 ? _element$parentElemen : element);

        const useLinearNavigationChildProps = props => {
          const onKeyDown = e => {
            // Not handled by typeahead (i.e. assume this is a keyboard shortcut)
            if (e.ctrlKey || e.metaKey) return;
            const info = getLogicalDirection();
            let allowsBlockNavigation = navigationDirection == "block" || navigationDirection == "either";
            let allowsInlineNavigation = navigationDirection == "inline" || navigationDirection == "either";

            switch (e.key) {
              case "ArrowUp":
                {
                  const propName = (info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? "blockDirection" : "inlineDirection";
                  const directionAllowed = (info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? allowsBlockNavigation : allowsInlineNavigation;

                  if (directionAllowed) {
                    if ((info === null || info === void 0 ? void 0 : info[propName]) === "btt") {
                      navigateToNext();
                    } else {
                      navigateToPrev();
                    }

                    e.preventDefault();
                    e.stopPropagation();
                  }

                  break;
                }

              case "ArrowDown":
                {
                  const propName = (info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? "blockDirection" : "inlineDirection";
                  const directionAllowed = (info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? allowsBlockNavigation : allowsInlineNavigation;

                  if (directionAllowed) {
                    if ((info === null || info === void 0 ? void 0 : info[propName]) === "btt") {
                      navigateToPrev();
                    } else {
                      navigateToNext();
                    }

                    e.preventDefault();
                    e.stopPropagation();
                  }

                  break;
                }

              case "ArrowLeft":
                {
                  const propName = (info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? "inlineDirection" : "blockDirection";
                  const directionAllowed = (info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? allowsInlineNavigation : allowsBlockNavigation;

                  if (directionAllowed) {
                    if ((info === null || info === void 0 ? void 0 : info[propName]) === "rtl") {
                      navigateToNext();
                    } else {
                      navigateToPrev();
                    }

                    e.preventDefault();
                    e.stopPropagation();
                  }

                  break;
                }

              case "ArrowRight":
                {
                  const propName = (info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? "inlineDirection" : "blockDirection";
                  const directionAllowed = (info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? allowsInlineNavigation : allowsBlockNavigation;

                  if (directionAllowed) {
                    if ((info === null || info === void 0 ? void 0 : info[propName]) === "rtl") {
                      navigateToPrev();
                    } else {
                      navigateToNext();
                    }

                    e.preventDefault();
                    e.stopPropagation();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                  break;
                }

              case "Home":
                navigateToFirst();
                e.preventDefault();
                e.stopPropagation();
                break;

              case "End":
                navigateToLast();
                e.preventDefault();
                e.stopPropagation();
                break;
            }
          };

          return useRefElementProps(useMergedProps()({
            onKeyDown
          }, props));
        };

        return {
          useLinearNavigationChildProps
        };
      }, [navigationDirection, navigateToNext, navigateToPrev, navigateToFirst, navigateToLast]);
      return {
        useLinearNavigationChild
      };
    }
    /**
     * Allows for the selection of a managed child by typing the given text associated with it.
     *
     * @see useListNavigation, which packages everything up together.
     */

    function useTypeaheadNavigation({
      collator,
      getIndex,
      typeaheadTimeout,
      setIndex
    }) {
      // For typeahead, keep track of what our current "search" string is (if we have one)
      // and also clear it every 1000 ms since the last time it changed.
      // Next, keep a mapping of typeahead values to indices for faster searching.
      // And, for the user's sake, let them know when their typeahead can't match anything anymore
      const [currentTypeahead, setCurrentTypeahead, getCurrentTypeahead] = useState(null);
      useTimeout({
        timeout: typeaheadTimeout !== null && typeaheadTimeout !== void 0 ? typeaheadTimeout : 1000,
        callback: () => {
          setCurrentTypeahead(null);
          setInvalidTypeahead(null);
        },
        triggerIndex: currentTypeahead
      });
      const sortedTypeaheadInfo = s([]);
      const [invalidTypeahead, setInvalidTypeahead] = useState(false); // Handle typeahead for input method editors as well
      // Essentially, when active, ignore further keys 
      // because we're waiting for a CompositionEnd event

      const [imeActive, setImeActive, getImeActive] = useState(false); // Because composition events fire *after* keydown events 
      // (but within the same task, which, TODO, could be browser-dependent),
      // we can use this to keep track of which event we're listening for on the first keydown.

      const [nextTypeaheadChar, setNextTypeaheadChar] = useState(null);
      useLayoutEffect(() => {
        if (nextTypeaheadChar !== null) {
          setCurrentTypeahead(typeahead => (typeahead !== null && typeahead !== void 0 ? typeahead : "") + nextTypeaheadChar);
          setNextTypeaheadChar(null);
        }
      }, [nextTypeaheadChar]);
      const comparator = useStableCallback((lhs, rhs) => {
        let compare;

        if (typeof lhs === "string" && typeof rhs.text === "string") {
          var _safeRhs$toLowerCase;

          // For the purposes of typeahead, only compare a string of the same size as our currently typed string.
          // By normalizing them first, we ensure this byte-by-byte handling of raw character data works out okay.
          let safeLhs = lhs.normalize("NFD");
          let safeRhs = rhs.text.normalize("NFD").substr(0, safeLhs.length);
          if (collator) compare = collator.compare(safeLhs, safeRhs);else compare = safeLhs.toLowerCase().localeCompare((_safeRhs$toLowerCase = safeRhs.toLowerCase()) !== null && _safeRhs$toLowerCase !== void 0 ? _safeRhs$toLowerCase : "");
          return compare;
        }

        return lhs - rhs;
      }); // Handle changes in typeahead that cause changes to the tabbable index

      y(() => {
        if (currentTypeahead && sortedTypeaheadInfo.current.length) {
          let sortedTypeaheadIndex = binarySearch(sortedTypeaheadInfo.current, currentTypeahead, comparator);

          if (sortedTypeaheadIndex < 0) {
            // The user has typed an entry that doesn't exist in the list
            // (or more specifically "for which there is no entry that starts with that input")
            setInvalidTypeahead(true);
          } else {
            setInvalidTypeahead(false);
            /*
              We know roughly where, in the sorted array of strings, our next typeahead location is.
              But roughly isn't good enough if there are multiple matches.
              To convert our sorted index to the unsorted index we need, we have to find the first
              element that matches us *and* (if any such exist) is *after* our current selection.
                In other words, the only way typeahead moves backwards relative to our current
              position is if the only other option is behind us.
                It's not specified in WAI-ARIA what to do in that case.  I suppose wrap back to the start?
              Though there's also a case for just going upwards to the nearest to prevent jumpiness.
              But if you're already doing typeahead on an unsorted list, like, jumpiness can't be avoided.
              I dunno. Going back to the start is the simplist though.
                Basically what this does: Starting from where we found ourselves after our binary search,
              scan backwards and forwards through all adjacent entries that also compare equally so that
              we can find the one whose `unsortedIndex` is the lowest amongst all other equal strings
              (and also the lowest `unsortedIndex` yadda yadda except that it comes after us).
                TODO: The binary search starts this off with a solid O(log n), but one-character
              searches are, thanks to pigeonhole principal, eventually guaranteed to become
              O(n*log n). This is annoying but probably not easily solvable? There could be an
              exception for one-character strings, but that's just kicking the can down
              the road. Maybe one or two characters would be good enough though.
            */
            // These are used to keep track of the candidates' positions in both our sorted array and the unsorted DOM.

            let lowestUnsortedIndexAll = null;
            let lowestSortedIndexAll = sortedTypeaheadIndex; // These two are only set for elements that are ahead of us, but the principle's the same otherwise

            let lowestUnsortedIndexNext = null;
            let lowestSortedIndexNext = sortedTypeaheadIndex;

            const updateBestFit = u => {
              var _getIndex;

              if (lowestUnsortedIndexAll == null || u < lowestUnsortedIndexAll) {
                lowestUnsortedIndexAll = u;
                lowestSortedIndexAll = i;
              }

              if ((lowestUnsortedIndexNext == null || u < lowestUnsortedIndexNext) && u > ((_getIndex = getIndex()) !== null && _getIndex !== void 0 ? _getIndex : -Infinity)) {
                lowestUnsortedIndexNext = u;
                lowestSortedIndexNext = i;
              }
            };

            let i = sortedTypeaheadIndex;

            while (i >= 0 && comparator(currentTypeahead, sortedTypeaheadInfo.current[i]) == 0) {
              updateBestFit(sortedTypeaheadInfo.current[i].unsortedIndex);
              --i;
            }

            i = sortedTypeaheadIndex;

            while (i < sortedTypeaheadInfo.current.length && comparator(currentTypeahead, sortedTypeaheadInfo.current[i]) == 0) {
              updateBestFit(sortedTypeaheadInfo.current[i].unsortedIndex);
              ++i;
            }

            if (lowestUnsortedIndexNext !== null) setIndex(sortedTypeaheadInfo.current[lowestSortedIndexNext].unsortedIndex);else if (lowestUnsortedIndexAll !== null) setIndex(sortedTypeaheadInfo.current[lowestSortedIndexAll].unsortedIndex);
          }
        }
      }, [currentTypeahead]);
      const useTypeaheadNavigationChild = A$1(({
        text,
        ...i
      }) => {
        y(() => {
          if (text) {
            // Find where to insert this item.
            // Because all index values should be unique, the returned sortedIndex
            // should always refer to a new location (i.e. be negative)                
            let sortedIndex = binarySearch(sortedTypeaheadInfo.current, text, comparator);
            console.assert(sortedIndex < 0);

            if (sortedIndex < 0) {
              sortedTypeaheadInfo.current.splice(-sortedIndex - 1, 0, {
                text,
                unsortedIndex: i.index
              });
            }

            return () => {
              // When unmounting, find where we were and remove ourselves.
              // Again, we should always find ourselves because there should be no duplicate values if each index is unique.
              let sortedIndex = binarySearch(sortedTypeaheadInfo.current, text, comparator);
              console.assert(sortedIndex >= 0);

              if (sortedIndex >= 0) {
                sortedTypeaheadInfo.current.splice(sortedIndex, 1);
              }
            };
          }
        }, [text]);

        const useTypeaheadNavigationChildProps = function ({ ...props
        }) {
          const {
            useRefElementProps,
            element
          } = useRefElement();

          const onCompositionStart = e => {
            setImeActive(true);
          };

          const onCompositionEnd = e => {
            setNextTypeaheadChar(e.data);
            setImeActive(false);
          };

          const onKeyDown = e => {
            const imeActive = getImeActive();
            let key = e.key; // Not handled by typeahead (i.e. assume this is a keyboard shortcut)

            if (e.ctrlKey || e.metaKey) return;

            if (!imeActive && e.key === "Backspace") {
              // Remove the last character in a way that doesn't split UTF-16 surrogates.
              setCurrentTypeahead(t => t === null ? null : [...t].reverse().slice(1).reverse().join(""));
              e.preventDefault();
              e.stopPropagation();
              return;
            } // The key property represents the typed character OR the "named key attribute" of the key pressed.
            // There's no definite way to tell the difference, but for all intents and purposes
            // there are no one-character names, and there are no non-ASCII-alpha names.
            // Thus, any one-character or non-ASCII value for `key` is *almost certainly* a typed character.


            const isCharacterKey = key.length === 1 || !/^[A-Za-z]/.test(key);

            if (isCharacterKey) {
              var _getCurrentTypeahead;

              if (key == " " && ((_getCurrentTypeahead = getCurrentTypeahead()) !== null && _getCurrentTypeahead !== void 0 ? _getCurrentTypeahead : "").trim().length == 0) ; else {
                e.preventDefault();
                e.stopPropagation(); // Note: Won't be true for the first keydown
                // but will be overwritten before useLayoutEffect is called
                // to actually apply the change

                if (!imeActive) setNextTypeaheadChar(key);
              }
            }
          };

          return useMergedProps()(useRefElementProps({
            onKeyDown,
            onCompositionStart,
            onCompositionEnd
          }), props);
        };

        return {
          useTypeaheadNavigationChildProps
        };
      }, []);
      return {
        useTypeaheadNavigationChild,
        currentTypeahead,
        invalidTypeahead
      };
    }
    /**
     * Your usual binary search implementation.
     *
     * It's used here to quickly find a good spot to start searching for our next typeahead candidate.
     * @param array The array to search through
     * @param wanted The value you'd like to find
     * @param comparator Compares `wanted` with the current value in `array`
     * @returns A non-negative value if `wanted` was found, and a negative number if not.
     * The absolute value of this number, minus one, is where `wanted` *would* be found if it *was* in `array`
     */

    function binarySearch(array, wanted, comparator) {
      var firstIndex = 0;
      var lastIndex = array.length - 1;

      while (firstIndex <= lastIndex) {
        var testIndex = lastIndex + firstIndex >> 1;
        var comparisonResult = comparator(wanted, array[testIndex]);

        if (comparisonResult > 0) {
          firstIndex = testIndex + 1;
        } else if (comparisonResult < 0) {
          lastIndex = testIndex - 1;
        } else {
          return testIndex;
        }
      }

      return -firstIndex - 1;
    }

    /**
     * Allows a parent component to access information about certain
     * child components once they have rendered.
     *
     * This hook is slightly more complicated in that it returns both a
     * prop-modifying hook, but also a hook that each child will need
     * to use: `useManagedChild`.  It's stable across renders, so just
     * toss it into a `Context` so the children can have access to it.
     * This function registers the child with the parent and provides
     * it with any requested information, but doesn't do anything else
     * until it unmounts and retracts that information.
     */

    function useChildManager() {
      // This is blindly updated any time a child mounts or unmounts itself.
      // Used to make sure that any time the array of managed children updates,
      // we also re-render.
      const [childUpdateIndex, setChildUpdateIndex] = useState(0);
      const [totalChildrenMounted, setTotalChildrenMounted, getTotalChildrenMounted] = useState(0);
      const [totalChildrenUnounted, setTotalChildrenUnounted, getTotalChildrenUnounted] = useState(0);
      const childrenCurrentlyMounted = totalChildrenMounted - totalChildrenUnounted;
      const managedChildren = s([]
      /** TODO: Any problems caused by using an array when it should be an object? */
      );
      const mountedChildren = s([]);
      const mountOrder = s(new Map());
      const indicesByElement = s(new Map());
      const deletedIndices = s(new Set()); // Used to keep track of indices that have "over-mounted" and by how much.
      // We need this so that we don't erase saved information when a component
      // "overmounts" over another which then, correctly, switches *itself* to something else.
      // In general, this should only happen when components are swapping between indices.
      // By the time they're done, this map should be all 0s again, at which point
      // it's okay to actually run the unmount code.
      // 
      // TODO: throw a console.assert somewhere to make up for the lost 
      // "are you sure you want to overwrite this child's index!" assertion.
      // Namely, is this map all 0s when the parent element re-renders? 
      // Probably not because of setChildUpdateIndex

      const overmountCount = s(new Map());
      const getMountIndex = A$1(index => {
        return mountOrder.current.get(index);
      }, []);
      const useManagedChild = A$1(info => {
        const {
          element,
          getElement,
          useRefElementProps
        } = useRefElement();
        useLayoutEffect(() => {
          let index = getTotalChildrenMounted();
          mountOrder.current.set(info.index, index);
          mountedChildren.current[index] = info;
          setTotalChildrenMounted(t => ++t);
          return () => {
            mountOrder.current.delete(info.index);
            mountedChildren.current[index] = null;
            setTotalChildrenUnounted(t => ++t);
          };
        }, [info.index]); // As soon as the component mounts, notify the parent and request a rerender.

        useLayoutEffect(([prevElement, prevIndex], changes) => {
          if (element) {
            indicesByElement.current.set(element, info.index);
            deletedIndices.current.delete(info.index);

            if (managedChildren.current[info.index] != undefined) {
              var _overmountCount$curre;

              overmountCount.current.set(info.index, ((_overmountCount$curre = overmountCount.current.get(info.index)) !== null && _overmountCount$curre !== void 0 ? _overmountCount$curre : 0) + 1);
            }

            setChildUpdateIndex(c => ++c);
            managedChildren.current[info.index] = { ...info
            };
            return () => {
              var _overmountCount$curre2;

              setChildUpdateIndex(c => ++c);

              if (((_overmountCount$curre2 = overmountCount.current.get(info.index)) !== null && _overmountCount$curre2 !== void 0 ? _overmountCount$curre2 : 0) > 0) {
                var _overmountCount$curre3;

                overmountCount.current.set(info.index, ((_overmountCount$curre3 = overmountCount.current.get(info.index)) !== null && _overmountCount$curre3 !== void 0 ? _overmountCount$curre3 : 0) - 1);
              } else {
                delete managedChildren.current[info.index];
                deletedIndices.current.add(info.index);

                if (typeof info.index === "number") {
                  while (managedChildren.current.length && managedChildren.current[managedChildren.current.length - 1] === undefined) managedChildren.current.length -= 1;
                }

                indicesByElement.current.delete(element);
              }
            };
          }
        }, [element, info.index]); // Any time our child props change, make that information available generally.
        // *Don't re-render*, otherwise we'd be stuck in an
        // infinite loop every time an anonymous function is passed.
        // It comes in from the props so the child was already updated by it --
        // we don't need the parent to re-render every single child any time
        // "onClick" updates or whatever.  The relevant child already knows,
        // and that's what matters.

        useLayoutEffect(() => {
          if (managedChildren.current[info.index] != undefined) managedChildren.current[info.index] = { ...info
          };
        }, [...Object.entries(info).flat()]);
        return {
          element,
          getElement,
          useManagedChildProps: useRefElementProps
        };
      }, []);
      return {
        useManagedChild,
        childCount: childrenCurrentlyMounted,
        managedChildren: managedChildren.current,
        mountedChildren: mountedChildren.current,
        indicesByElement: indicesByElement.current,
        totalChildrenMounted,
        totalChildrenUnounted,
        getMountIndex,
        deletedIndices: deletedIndices.current
      };
    }
    /**
     * Helper function for letting children know when they are or are not the
     * current selected/expanded/focused/whatever child.
     *
     * Automatically handles when children are mounted & unmounted and such.
     *
     * @param activatedIndex What index the current selected (etc.) child is
     * @param length How many children exist (as managedChildren.length)
     * @param setFlag A function that probably looks like (i, flag) => managedChildren[i].setActive(flag)
     */

    function useChildFlag(activatedIndex, length, setFlag) {
      const [prevActivatedIndex, setPrevActivatedIndex, getPrevActivatedIndex] = useState(null);
      const [prevChildCount, setPrevChildCount, getPrevChildCount] = useState(length); // Any time the number of components changes,
      // reset any initial, possibly incorrect state they might have had, just in case.

      useLayoutEffect(() => {
        const direction = Math.sign(length - getPrevChildCount());

        if (direction !== 0) {
          for (let i = (_getPrevChildCount = getPrevChildCount()) !== null && _getPrevChildCount !== void 0 ? _getPrevChildCount : 0; i != length; i += direction) {
            var _getPrevChildCount;

            setFlag(i, i === activatedIndex);
          }

          setPrevChildCount(length);
        }

        const prevActivatedIndex = getPrevActivatedIndex();

        if (prevActivatedIndex != null && length > 0 && prevActivatedIndex >= length) {
          // The number of children shrank below whatever the currently selected component was.
          // Change the index to the last one still mounted.
          setFlag(length - 1, true); // (No need to unset any of them since they already unmounted themselves)
          // (Also no way to unset them anyway for the same reason)
        }
      }, [setFlag, activatedIndex, length]);
      useLayoutEffect(() => {
        // Deactivate the previously activated component
        const prevActivatedIndex = getPrevActivatedIndex();

        if (prevActivatedIndex != activatedIndex) {
          if (prevActivatedIndex != null && prevActivatedIndex >= 0 && prevActivatedIndex < length) setFlag(prevActivatedIndex, false);
        } // Activate the current component


        if (activatedIndex != null && activatedIndex >= 0 && activatedIndex < length) {
          setFlag(activatedIndex, true);
          setPrevActivatedIndex(activatedIndex);
        }
      }, [setFlag, activatedIndex, length]);
    }

    /**
     * Implements a roving tabindex system where only one "focusable"
     * component in a set is able to receive a tab focus. *Which*
     * of those elements receives focus is determined by you, but it's
     * recommended to offload that logic then to another hook, like
     * `useLinearNavigation`, which lets you change the tabbable
     * element with the arrow keys, `useTypeaheadNavigation`, which
     * lets you change the tabbable index with typeahead, or
     * `useListNavigation` if you just want everything bundled together.
     *
     * Note that the child hook returned by this function must be used
     * by every child that uses this roving tabindex logic.  The
     * prop-modifying hook *that* hook returns should then be used
     * on the child's element, as well as any other elements you'd like
     * to be explicitly made untabbable too.
     *
     * `focusOnChange` should be set to true if focus is
     * contained within whatever element contains the roving tab index.
     * Generally as simple as the following:
     * ```
     * const { focused, focusedInner, useHasFocusProps } = useHasFocus<ParentElement>();
     * const focusOnChange = (focusedInner != false);
     * ```
     * It's not included here because `useRovingTabIndex` doesn't know
     * anything about the container element, only children elements.
     * And just as well! Children should be allowed at the root,
     * regardless of if it's the whole app or just a given component.
     */

    function useRovingTabIndex({
      focusOnChange: foc,
      tabbableIndex
    }) {
      const [rerenderAndFocus, setRerenderAndFocus] = useState(null);
      const getFocusOnChange = useStableGetter(foc);
      const getTabbableIndex = useStableGetter(tabbableIndex);
      s(-Infinity); // Call the hook that allows us to collect information from children who provide it

      const {
        managedChildren,
        childCount,
        useManagedChild,
        indicesByElement,
        ...rest
      } = useChildManager(); // Any time the tabbable index changes,
      // notify the previous child that it's no longer tabbable,
      // and notify the next child that is allowed to be tabbed to.

      useChildFlag(tabbableIndex, childCount, (index, tabbable) => {
        var _managedChildren$inde;

        if (index != null) (_managedChildren$inde = managedChildren[index]) === null || _managedChildren$inde === void 0 ? void 0 : _managedChildren$inde.setTabbable(tabbable);
      });
      A$1(() => {
        if (tabbableIndex != null) managedChildren[tabbableIndex].setTabbable(true);
      }, [tabbableIndex]);
      const useRovingTabIndexChild = A$1(info => {
        const [rrafIndex, setRrafIndex] = useState(1);
        const rerenderAndFocus = A$1(() => {
          setRrafIndex(i => ++i);
        }, []);
        let newInfo = { ...info,
          rerenderAndFocus,
          setTabbable: A$1(tabbable => {
            setTabbable(tabbable);
          }, [])
        };
        const {
          element,
          getElement,
          useManagedChildProps
        } = useManagedChild(newInfo); // TODO: Using getTabbableIndex during render phase on mount

        const [tabbable, setTabbable] = useState(getTabbableIndex() == info.index);
        y(() => {
          if (element && tabbable) {
            setRerenderAndFocus(_ => rerenderAndFocus);

            if (getFocusOnChange() && "focus" in element) {
              requestAnimationFrame(() => {
                queueMicrotask(() => {
                  element.focus();
                });
              });
            }
          }
        }, [element, tabbable, rrafIndex]);

        function useRovingTabIndexSiblingProps({
          tabIndex,
          ...props
        }) {
          if (tabIndex == null) {
            if (tabbable) tabIndex = 0;else tabIndex = -1;
          }

          return useMergedProps()({
            tabIndex
          }, props);
        }

        function useRovingTabIndexChildProps({
          tabIndex,
          ...props
        }) {
          if (tabIndex == null) {
            if (tabbable) tabIndex = 0;else tabIndex = -1;
          }

          return useMergedProps()(useManagedChildProps({
            tabIndex
          }), props);
        }
        return {
          useRovingTabIndexChildProps,
          useRovingTabIndexSiblingProps,
          tabbable
        };
      }, [useManagedChild]);
      return {
        useRovingTabIndexChild,
        childCount,
        managedChildren,
        indicesByElement,
        focusCurrent: rerenderAndFocus,
        ...rest
      };
    }

    function identity$1(t) {
      return t;
    }
    /**
     * Implements proper keyboard navigation for components like listboxes, button groups, menus, etc.
     *
     * In the document order, there will be only one "focused" or "tabbable" element, making it act more like one complete unit in comparison to everything around it.
     * Navigating forwards/backwards can be done with the arrow keys, Home/End keys, or any any text for typeahead to focus the next item that matches.
     */


    function useListNavigation({
      initialIndex,
      focusOnChange,
      collator,
      keyNavigation,
      indexMangler,
      indexDemangler
    }) {
      var _indexMangler, _indexDemangler, _keyNavigation, _getTabbableIndex;

      (_indexMangler = indexMangler) !== null && _indexMangler !== void 0 ? _indexMangler : indexMangler = identity$1;
      (_indexDemangler = indexDemangler) !== null && _indexDemangler !== void 0 ? _indexDemangler : indexDemangler = identity$1;
      (_keyNavigation = keyNavigation) !== null && _keyNavigation !== void 0 ? _keyNavigation : keyNavigation = "either"; // Keep track of three things related to the currently tabbable element's index:
      // What it is, and whether, when we render this component and it's changed, to also focus the element that was made tabbable.

      const [tabbableIndex, setTabbableIndex, getTabbableIndex] = useState(initialIndex === undefined ? 0 : initialIndex);
      const {
        managedChildren,
        indicesByElement,
        useRovingTabIndexChild,
        focusCurrent,
        ...rest
      } = useRovingTabIndex({
        focusOnChange,
        tabbableIndex
      });
      const navigateToIndex = A$1(i => {
        setTabbableIndex(i);
      }, []);
      const navigateToFirst = A$1(() => {
        setTabbableIndex(indexMangler(0));
      }, []);
      const navigateToLast = A$1(() => {
        setTabbableIndex(indexMangler(managedChildren.length - 1));
      }, []);
      const navigateToPrev = A$1(() => {
        setTabbableIndex(i => indexMangler(indexDemangler(i !== null && i !== void 0 ? i : 0) - 1));
      }, [indexDemangler, indexMangler]);
      const navigateToNext = A$1(() => {
        setTabbableIndex(i => indexMangler(indexDemangler(i !== null && i !== void 0 ? i : 0) + 1));
      }, [indexDemangler, indexMangler]);
      const setIndex = A$1(index => {
        setTabbableIndex(index);
      }, []);
      const {
        currentTypeahead,
        invalidTypeahead,
        useTypeaheadNavigationChild
      } = useTypeaheadNavigation({
        collator,
        getIndex: getTabbableIndex,
        setIndex,
        typeaheadTimeout: 1000
      });
      const {
        useLinearNavigationChild
      } = useLinearNavigation({
        navigationDirection: keyNavigation,
        index: (_getTabbableIndex = getTabbableIndex()) !== null && _getTabbableIndex !== void 0 ? _getTabbableIndex : 0,
        managedChildren,
        navigateToPrev,
        navigateToNext,
        navigateToFirst,
        navigateToLast
      });
      const useListNavigationChild = A$1(info => {
        const {
          useTypeaheadNavigationChildProps
        } = useTypeaheadNavigationChild(info);
        const {
          useLinearNavigationChildProps
        } = useLinearNavigationChild();
        const {
          useRovingTabIndexChildProps,
          useRovingTabIndexSiblingProps,
          tabbable
        } = useRovingTabIndexChild(info);

        const useListNavigationChildProps = function ({ ...props
        }) {
          return useMergedProps()(useRovingTabIndexChildProps(useTypeaheadNavigationChildProps(useLinearNavigationChildProps({
            onClick: roveToSelf
          }))), props);
        };

        const roveToSelf = A$1(() => {
          navigateToIndex(info.index);
        }, []);
        return {
          useListNavigationChildProps,
          useListNavigationSiblingProps: useRovingTabIndexSiblingProps,
          tabbable //roveToSelf,
          //element

        };
      }, [useTypeaheadNavigationChild, useLinearNavigationChild, useRovingTabIndexChild, navigateToIndex]);
      return {
        useListNavigationChild,
        currentTypeahead,
        invalidTypeahead,
        tabbableIndex,
        setTabbableIndex,
        managedChildren,
        indicesByElement,
        navigateToIndex,
        navigateToNext,
        navigateToPrev,
        navigateToFirst,
        navigateToLast,
        focusCurrent,
        ...rest
      };
    }

    /**
     *
     * There are several different ways that a focus event can happen.  Assume
     * the following steps happen in order:
     *
     * 1. The page loads.
     *    * Nothing is focused, but `document.activeElement` is `body`.
     *    * No focus events are fired.
     * 2. The window is focused, an unfocusable element is clicked, text is selected, etc.
     *    * The `activeElement` remains as `body`.
     *    * A `focus`/`focusin` event *MIGHT* be fired for `body`. Depending on
     *      the browser, this depends on whether the handler was attached to `window` or `document`.
     *      Probably just best to not rely on it, or listen to `window` focus events directly.
     * 3. A focusable element is clicked, etc.
     *    * The `activeElement` is set to the new element before any event even fires.
     *    * `focusout` and `blur` are *not* fired on `body`.
     *    * `focus` and `focusin` are fired on the new element. `relatedTarget` is null.
     * 4. A focusable element is clicked, etc.
     *    * **The `activeElement` is set to the `body`** before any event even fires.
     *    * `blur` and `focusout` are fired on the old element. `relatedTarget` is the new element.
     *    * The `activeElement` is now set to the new element.
     *    * `focusin` is fired on the new element. `relatedTarget` is the old element.
     * 5. An unfocusable element is clicked, text is selected, etc.
     *    * The `activeElement` is set to `body`.
     *    * `blur` and `focusout` are fired on the old element. `relatedTarget` is null.
     *    * `focusin` is *not* fired on `body`.
     *
     *
     * In summary:
     * 1. Focus events *do* notify us of all changes in focus, but there is no one single comprehensive event that provides us with all available information.
     * 2. `document.activeElement` *is not* always the same as what's being referenced by a focus event. In particular, it may become `body` at any arbitrary time.
     * 3. A `blur` without a `focus` can and will occur. This means it is not possible to solely use `focus` to detect all changes.
     * 4. A `blur` event whose `relatedTarget` is null indicates that there will be no following `focus` event.
     *
     *
     * @param callback
     * @returns
     */

    let currentlyFocusedElement = null;
    let lastFocusedElement = null;

    function getLastFocusedElement() {
      return lastFocusedElement;
    }

    function getCurrentlyFocusedElement() {
      return currentlyFocusedElement;
    }

    const updaters = new Set();

    function focusout(e) {
      if (e.relatedTarget == null) {
        currentlyFocusedElement = null;

        for (let f of updaters) {
          f({
            current: currentlyFocusedElement,
            last: lastFocusedElement,
            windowFocused
          });
        }
      }
    }

    function focusin(e) {
      currentlyFocusedElement = lastFocusedElement = e.target;

      for (let f of updaters) {
        f({
          current: currentlyFocusedElement,
          last: lastFocusedElement,
          windowFocused
        });
      }
    }

    let windowFocused = true;

    function windowFocus() {
      windowFocused = true;

      for (let f of updaters) {
        f({
          current: currentlyFocusedElement,
          last: lastFocusedElement,
          windowFocused
        });
      }
    }

    function windowBlur() {
      windowFocused = false;

      for (let f of updaters) {
        f({
          current: currentlyFocusedElement,
          last: lastFocusedElement,
          windowFocused
        });
      }
    }

    function useActiveElement(filter) {
      const [i, setI] = useState(0);
      h(() => {
        const F = info => {
          if (filter == null || filter(info)) setI(i => ++i);
        };

        if (updaters.size === 0) {
          document.addEventListener("focusin", focusin, {
            passive: true
          });
          document.addEventListener("focusout", focusout, {
            passive: true
          });
          window.addEventListener("focus", windowFocus, {
            passive: true
          });
          window.addEventListener("blur", windowBlur, {
            passive: true
          });
        }

        updaters.add(F);
        return () => {
          updaters.delete(F);

          if (updaters.size === 0) {
            document.removeEventListener("focusin", focusin);
            document.removeEventListener("focusout", focusout);
            window.removeEventListener("focus", windowFocus);
            window.removeEventListener("blur", windowBlur);
          }
        };
      }, [filter]);
      return {
        activeElement: currentlyFocusedElement,
        lastActiveElement: lastFocusedElement,
        getActiveElement: getCurrentlyFocusedElement,
        getLastActiveElement: getLastFocusedElement,
        windowFocused
      };
    }

    function useHasFocus({} = {}) {
      // These are slightly redundant, but any time the focus changes, we need to know if it's "relevant" to us.
      // It's "relevant" if the newly-focused element is a child of us,
      // OR if we're focused and focus moves OUTSIDE of us our our children.
      // Because of that second bit, we need to keep track of where the focus was the last time we checked for the filter.
      const [hasFocus, setHasFocus, getHasFocus] = useState(false);
      const [hasLastFocus, setHasLastFocus, getHasLastFocus] = useState(false);
      const {
        element,
        getElement,
        useRefElementProps
      } = useRefElement();
      const {
        activeElement,
        lastActiveElement
      } = useActiveElement(A$1(({
        current,
        last,
        windowFocused
      }) => {
        // Keep in mind that once we get our element, even if the hook and filter functions
        // don't re-run, the currently-focused element will still be returned below, and,
        // even if it's not us or one of our children, will still be safely filtered out at render time.
        let element = getElement();
        if (!element) return false;
        let hasFocusNow = element.contains(current) || element.contains(last);

        if (hasFocusNow) {
          return true;
        } else {
          let hadFocusBeforeThis = getHasLastFocus() || getHasFocus();

          if (hadFocusBeforeThis) {
            // Return true once, so that useActiveElement will return one instance of a different element having focus.
            // Then, back outside this filter function, we'll know that we're no longer focused.
            return true;
          }

          return false;
        }
      }, [])); // These are primarily used for bookkeeping during the filter function above.

      h(() => {
        var _element$contains;

        setHasFocus((_element$contains = element === null || element === void 0 ? void 0 : element.contains(activeElement)) !== null && _element$contains !== void 0 ? _element$contains : false);
      }, [element, activeElement]);
      h(() => {
        var _element$contains2;

        setHasLastFocus((_element$contains2 = element === null || element === void 0 ? void 0 : element.contains(lastActiveElement)) !== null && _element$contains2 !== void 0 ? _element$contains2 : false);
      }, [element, lastActiveElement]);
      const useHasFocusProps = A$1(props => {
        return useRefElementProps(props);
      }, [useRefElementProps]);
      const focused = d(() => {
        return element == activeElement;
      }, [element, activeElement]);
      const focusedInner = d(() => {
        var _element$contains3;

        return (_element$contains3 = element === null || element === void 0 ? void 0 : element.contains(activeElement)) !== null && _element$contains3 !== void 0 ? _element$contains3 : false;
      }, [element, activeElement]);
      const lastFocused = d(() => {
        return element == lastActiveElement;
      }, [element, lastActiveElement]);
      const lastFocusedInner = d(() => {
        var _element$contains4;

        return (_element$contains4 = element === null || element === void 0 ? void 0 : element.contains(lastActiveElement)) !== null && _element$contains4 !== void 0 ? _element$contains4 : false;
      }, [element, lastActiveElement]);
      return {
        useHasFocusProps,
        focused,
        focusedInner,
        lastFocused,
        lastFocusedInner
      };
    }

    /**
     * Wrap the native `useEffect` to add arguments
     * that allow accessing the previous value as the first argument,
     * as well as the changes that caused the hook to be called as the second argument.
     *
     * @param effect
     * @param inputs
     */

    function useEffect(effect, inputs) {
      const prevInputs = s(inputs);

      const effect2 = () => {
        let changes = [];

        for (let i = 0; i < Math.max(prevInputs.current.length, inputs.length); ++i) {
          if (prevInputs.current[i] != inputs[i]) changes[i] = {
            from: prevInputs.current[i],
            to: inputs[i]
          };
        }

        const ret = effect(prevInputs.current, changes);
        prevInputs.current = inputs;
        return ret;
      };

      y(effect2, inputs);
    }

    function identity(t) {
      return t;
    }

    function useGridNavigation({
      focusOnChange: foc,
      indexMangler,
      indexDemangler
    }) {
      var _indexMangler, _indexDemangler;

      (_indexMangler = indexMangler) !== null && _indexMangler !== void 0 ? _indexMangler : indexMangler = identity;
      (_indexDemangler = indexDemangler) !== null && _indexDemangler !== void 0 ? _indexDemangler : indexDemangler = identity;
      const getFocusCellOnRowChange = useStableGetter(foc);
      const [currentRow, setCurrentRow, getCurrentRow] = useState(0);
      const [lastKnownCellIndex, setLastKnownCellIndex, getLastKnownCellIndex] = useState(0);
      A$1(i => {
        setCurrentRow(indexMangler(i !== null && i !== void 0 ? i : 0));
      }, []);
      const navigateToFirst = A$1(() => {
        setCurrentRow(indexMangler(0));
      }, []);
      const navigateToLast = A$1(() => {
        setCurrentRow(indexMangler(managedChildren.length - 1));
      }, []);
      const navigateToPrev = A$1(() => {
        setCurrentRow(i => indexMangler(indexDemangler(i !== null && i !== void 0 ? i : 0) - 1));
      }, [indexDemangler, indexMangler]);
      const navigateToNext = A$1(() => {
        setCurrentRow(i => indexMangler(indexDemangler(i !== null && i !== void 0 ? i : 0) + 1));
      }, [indexDemangler, indexMangler]);
      const {
        childCount,
        managedChildren,
        indicesByElement,
        getMountIndex,
        mountedChildren,
        totalChildrenMounted,
        totalChildrenUnounted,
        useManagedChild
      } = useChildManager();
      const {
        useLinearNavigationChild
      } = useLinearNavigation({
        managedChildren,
        index: indexMangler(getCurrentRow()),
        navigateToFirst,
        navigateToLast,
        navigateToNext,
        navigateToPrev,
        //getIndex: useCallback(() => { return indexDemangler!(getCurrentRow()); }, [indexDemangler, getCurrentRow]),

        /*setIndex: useCallback((n: number | ((prevN: number) => number)) => { setCurrentRow(prevN => {
            return indexMangler!(typeof n === "function"? n(prevN) : n);
        }); }, [indexMangler, setCurrentRow]),*/
        navigationDirection: "block"
      });
      useChildFlag(currentRow, managedChildren.length, A$1((index, tabbable) => {
        var _managedChildren$inde;

        return (_managedChildren$inde = managedChildren[index]) === null || _managedChildren$inde === void 0 ? void 0 : _managedChildren$inde.setIsTabbableRow(tabbable, lastKnownCellIndex);
      }, [lastKnownCellIndex, managedChildren]));
      const useGridNavigationRow = A$1(({
        index,
        ...info
      }) => {
        //index = indexMangler!(index);
        const {
          useHasFocusProps,
          lastFocusedInner
        } = useHasFocus();
        const [isTabbableRow, setIsTabbableRow] = useState(false); // Besides just being a list nav child, it's also a list nav parent
        // yaaaayyy

        const {
          useListNavigationChild: useListNavigationChild2,
          childCount: cellCount,
          indicesByElement: cellIndicesByElement,
          managedChildren: managedCells,
          navigateToIndex: setCellIndex,
          tabbableIndex: tabbableCell,
          focusCurrent
        } = useListNavigation({
          focusOnChange: isTabbableRow && getFocusCellOnRowChange(),
          keyNavigation: "inline",
          initialIndex: null
        }); // Any time we become the currently tabbable row,
        // make sure the correct cell is selected and focused.
        // Any other time, make sure no cell is tabbable.

        useEffect(() => {
          if (isTabbableRow) {
            let cellIndex = getLastKnownCellIndex();

            while (cellIndex >= 0 && managedCells[cellIndex] == null) {
              --cellIndex;
            }

            if (cellIndex < 0) {
              cellIndex = getLastKnownCellIndex();

              while (cellIndex < managedCells.length && managedCells[cellIndex] == null) {
                ++cellIndex;
              }

              if (cellIndex == managedCells.length) cellIndex = getLastKnownCellIndex();
            }

            setCellIndex(cellIndex);
          } else {
            setCellIndex(null);
          }
        }, [isTabbableRow]); // Any time we become the currently tabbable row,
        // request the component rerender and focus itself.

        useEffect(() => {
          if (isTabbableRow && getFocusCellOnRowChange()) {
            focusCurrent === null || focusCurrent === void 0 ? void 0 : focusCurrent();
          }
        }, [focusCurrent, isTabbableRow]); // Any time the current cell changes 
        // (probably because we interacted with it, thus focusing it, 
        // changing it from null if the row wasn't already focused)
        // make sure that we're the currently tabbable row if we weren't already.

        useLayoutEffect(() => {
          if (tabbableCell !== null) {
            setLastKnownCellIndex(tabbableCell);
            setIsTabbableRow(true);
            setCurrentRow(index);
          }
        }, [index, tabbableCell, setLastKnownCellIndex]);
        const {
          useManagedChildProps
        } = useManagedChild({
          index,
          setIsTabbableRow: A$1((tabbable, newIndex) => {
            if (tabbable) {
              setCellIndex(newIndex);
            }

            setIsTabbableRow(tabbable);
          }, []),
          ...info
        });
        const {
          useLinearNavigationChildProps
        } = useLinearNavigationChild();
        const useGridNavigationRowProps = A$1(props => useManagedChildProps(useLinearNavigationChildProps(useHasFocusProps(props))), [useManagedChildProps]);
        const useGridNavigationCell = A$1(({
          index,
          text,
          ...info
        }) => {
          const {
            tabbable,
            useListNavigationChildProps
          } = useListNavigationChild2({
            text,
            index,
            ...info
          });
          const useGridNavigationCellProps = A$1(props => useListNavigationChildProps(props), [useListNavigationChildProps]);
          return {
            tabbable,
            useGridNavigationCellProps
          };
        }, [useListNavigationChild2]);
        return {
          useGridNavigationRowProps,
          useGridNavigationCell,
          cellCount,
          tabbableCell,
          isTabbableRow,
          managedCells
        };
      }, [setLastKnownCellIndex, useLinearNavigationChild, useManagedChild, indexDemangler, indexMangler]);
      return {
        useGridNavigationRow,
        rowCount: childCount,
        cellIndex: lastKnownCellIndex,
        rowIndex: currentRow,
        managedRows: managedChildren
      };
    }

    /**
     * Allows attaching an event handler to any *non-Preact* element, and removing it when the component using the hook unmounts. The callback does not need to be stable across renders.
     *
     * Due to typing limitations, this function must be called like this:
     *
     * `useEventHandler(element, "input")<InputEvent>(e => {})`
     *
     * The type argument is optional, but narrows down the type from "a union of all events" to whatever you specify, and errors if it doesn't exist.
     *
     * There is a separate version that attaches event handlers to a set of props.
     * It takes different event string types (onEvent vs onevent).
     *
     * @param target A *non-Preact* node to attach the event to.
     * @returns
     * *
     */

    function useGlobalHandler(target, type, handler, options) {
      // Note to self: The typing doesn't improve even if this is split up into a sub-function.
      // No matter what, it seems impossible to get the handler's event object typed perfectly.
      // It seems like it's guaranteed to always be a union of all available tupes.
      // Again, no matter what combination of sub- or sub-sub-functions used.
      let stableHandler = useStableCallback(handler !== null && handler !== void 0 ? handler : () => {});
      if (handler == null) stableHandler = null;
      y(() => {
        if (stableHandler) {
          target.addEventListener(type, stableHandler, options);
          return () => target.removeEventListener(type, stableHandler, options);
        }
      }, [target, type, stableHandler]);
    }

    function getFromLocalStorage() {
      return function (key, converter = JSON.parse) {
        try {
          const item = localStorage.getItem(key);
          if (!item) return undefined;
          return converter(item);
        } catch (e) {
          debugger; // Intentional

          return undefined;
        }
      };
    }
    function storeToLocalStorage() {
      return function (key, value, converter = JSON.stringify) {
        try {
          localStorage.setItem(key, converter(value));
        } catch (e) {
          debugger; // Intentional
        }
      };
    }

    const Table$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

    function base64(value) {
      return Table$1[value];
    }

    function random6Bits() {
      return Math.floor(Math.random() * 0b1000000);
    }

    function random64Bits() {
      return [random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits()];
    }
    /**
     * Returns a randomly-generated ID with an optional prefix.
     * Note that if the prefix is *explicitly* set to "", then
     * IDs that are not valid under HTML4 may be generated. Oh no.
     */


    function generateRandomId(prefix) {
      return `${prefix !== null && prefix !== void 0 ? prefix : "id-"}${random64Bits().map(n => base64(n)).join("")}`;
    }
    /**
     * Returns a hook that modifies a set of props to provide a randomly-generated ID if one was not provided.
     *
     * If you'd like to use the ID in a property that's *not* named `id` (like `for` or `aria-labelledby` or whatnot), `useReferencedIdProps` is also provided.
     *
     * And the randomly-generated id itself is also provided in case you want to handle the logic yourself without `useMergedProps`.
     *
     * Unlike most other `use*Props` hooks, these are mostly stable.
     */

    function useRandomId({
      prefix
    } = {}) {
      const [randomId, setRandomId] = useState(() => generateRandomId(prefix));
      const [watchPrefixUpdates, setWatchPrefixUpdates, getWatchPrefixUpdates] = useState(false);
      h(() => {
        const watchPrefixUpdates = getWatchPrefixUpdates();
        if (watchPrefixUpdates) setRandomId(() => generateRandomId(prefix));
        setWatchPrefixUpdates(true);
      }, [prefix]); // Whatever ID was most recently used by the actual "id" prop.
      // Used so that any ID-referencing props don't need to provide the same value.
      //
      // TODO: This does mean that on the first render, if just the ID is provided,
      // there will be a temporary mismatch, but it's corrected before rendering finishes.
      // Is this okay?

      const [usedId, setUsedId, getUsedId] = useState(undefined);
      const useReferencedIdProps = A$1(function useReferencedIdProps(idPropName) {
        const ret = function ({
          [idPropName]: givenId,
          ...props
        }) {
          var _ref, _ref2;

          const usedId2 = (_ref = (_ref2 = givenId !== null && givenId !== void 0 ? givenId : usedId) !== null && _ref2 !== void 0 ? _ref2 : randomId) !== null && _ref !== void 0 ? _ref : undefined;
          if (idPropName === "id") setUsedId(usedId2);
          return useMergedProps()({
            [idPropName]: usedId2
          }, props);
        };

        return ret;
      }, [usedId, randomId]);
      const useRandomIdProps = A$1(function useRandomIdProps(p) {
        return useReferencedIdProps("id")(p);
      }, [useReferencedIdProps]);
      return {
        randomId,
        id: usedId,
        getId: getUsedId,
        useRandomIdProps,
        useReferencedIdProps
      };
    }

    /*!
    * tabbable 5.2.1
    * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
    */
    var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
    var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    var isInput = function isInput(node) {
      return node.tagName === 'INPUT';
    };

    var isHiddenInput = function isHiddenInput(node) {
      return isInput(node) && node.type === 'hidden';
    };

    var isDetailsWithSummary = function isDetailsWithSummary(node) {
      var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
        return child.tagName === 'SUMMARY';
      });
      return r;
    };

    var isHidden = function isHidden(node, displayCheck) {
      if (getComputedStyle(node).visibility === 'hidden') {
        return true;
      }

      var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
      var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

      if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
        return true;
      }

      if (!displayCheck || displayCheck === 'full') {
        while (node) {
          if (getComputedStyle(node).display === 'none') {
            return true;
          }

          node = node.parentElement;
        }
      } else if (displayCheck === 'non-zero-area') {
        var _node$getBoundingClie = node.getBoundingClientRect(),
            width = _node$getBoundingClie.width,
            height = _node$getBoundingClie.height;

        return width === 0 && height === 0;
      }

      return false;
    }; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
    //  unless they are in the _first_ <legend> element of the top-most disabled
    //  fieldset


    var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
      if (isInput(node) || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA' || node.tagName === 'BUTTON') {
        var parentNode = node.parentElement;

        while (parentNode) {
          if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
            // look for the first <legend> as an immediate child of the disabled
            //  <fieldset>: if the node is in that legend, it'll be enabled even
            //  though the fieldset is disabled; otherwise, the node is in a
            //  secondary/subsequent legend, or somewhere else within the fieldset
            //  (however deep nested) and it'll be disabled
            for (var i = 0; i < parentNode.children.length; i++) {
              var child = parentNode.children.item(i);

              if (child.tagName === 'LEGEND') {
                if (child.contains(node)) {
                  return false;
                } // the node isn't in the first legend (in doc order), so no matter
                //  where it is now, it'll be disabled


                return true;
              }
            } // the node isn't in a legend, so no matter where it is now, it'll be disabled


            return true;
          }

          parentNode = parentNode.parentElement;
        }
      } // else, node's tabbable/focusable state should not be affected by a fieldset's
      //  enabled/disabled state


      return false;
    };

    var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
      if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || // For a details element with a summary, the summary element gets the focus
      isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
      }

      return true;
    };

    var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

    var isFocusable = function isFocusable(node, options) {
      options = options || {};

      if (!node) {
        throw new Error('No node provided');
      }

      if (matches.call(node, focusableCandidateSelector) === false) {
        return false;
      }

      return isNodeMatchingSelectorFocusable(options, node);
    };

    /**
     * @license
     * Copyright 2016 Google Inc. All rights reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    (() => {
      var _a, _b, _c;
      /* Symbols for private properties */


      const _blockingElements = Symbol();

      const _alreadyInertElements = Symbol();

      const _topElParents = Symbol();

      const _siblingsToRestore = Symbol();

      const _parentMO = Symbol();
      /* Symbols for private static methods */


      const _topChanged = Symbol();

      const _swapInertedSibling = Symbol();

      const _inertSiblings = Symbol();

      const _restoreInertedSiblings = Symbol();

      const _getParents = Symbol();

      const _getDistributedChildren = Symbol();

      const _isInertable = Symbol();

      const _handleMutations = Symbol();

      class BlockingElementsImpl {
        constructor() {
          /**
           * The blocking elements.
           */
          this[_a] = [];
          /**
           * Used to keep track of the parents of the top element, from the element
           * itself up to body. When top changes, the old top might have been removed
           * from the document, so we need to memoize the inerted parents' siblings
           * in order to restore their inerteness when top changes.
           */

          this[_b] = [];
          /**
           * Elements that are already inert before the first blocking element is
           * pushed.
           */

          this[_c] = new Set();
        }

        destructor() {
          // Restore original inertness.
          this[_restoreInertedSiblings](this[_topElParents]); // Note we don't want to make these properties nullable on the class,
          // since then we'd need non-null casts in many places. Calling a method on
          // a BlockingElements instance after calling destructor will result in an
          // exception.


          const nullable = this;
          nullable[_blockingElements] = null;
          nullable[_topElParents] = null;
          nullable[_alreadyInertElements] = null;
        }

        get top() {
          const elems = this[_blockingElements];
          return elems[elems.length - 1] || null;
        }

        push(element) {
          if (!element || element === this.top) {
            return;
          } // Remove it from the stack, we'll bring it to the top.


          this.remove(element);

          this[_topChanged](element);

          this[_blockingElements].push(element);
        }

        remove(element) {
          const i = this[_blockingElements].indexOf(element);

          if (i === -1) {
            return false;
          }

          this[_blockingElements].splice(i, 1); // Top changed only if the removed element was the top element.


          if (i === this[_blockingElements].length) {
            this[_topChanged](this.top);
          }

          return true;
        }

        pop() {
          const top = this.top;
          top && this.remove(top);
          return top;
        }

        has(element) {
          return this[_blockingElements].indexOf(element) !== -1;
        }
        /**
         * Sets `inert` to all document elements except the new top element, its
         * parents, and its distributed content.
         */


        [(_a = _blockingElements, _b = _topElParents, _c = _alreadyInertElements, _topChanged)](newTop) {
          const toKeepInert = this[_alreadyInertElements];
          const oldParents = this[_topElParents]; // No new top, reset old top if any.

          if (!newTop) {
            this[_restoreInertedSiblings](oldParents);

            toKeepInert.clear();
            this[_topElParents] = [];
            return;
          }

          const newParents = this[_getParents](newTop); // New top is not contained in the main document!


          if (newParents[newParents.length - 1].parentNode !== document.body) {
            throw Error('Non-connected element cannot be a blocking element');
          } // Cast here because we know we'll call _inertSiblings on newParents
          // below.


          this[_topElParents] = newParents;

          const toSkip = this[_getDistributedChildren](newTop); // No previous top element.


          if (!oldParents.length) {
            this[_inertSiblings](newParents, toSkip, toKeepInert);

            return;
          }

          let i = oldParents.length - 1;
          let j = newParents.length - 1; // Find common parent. Index 0 is the element itself (so stop before it).

          while (i > 0 && j > 0 && oldParents[i] === newParents[j]) {
            i--;
            j--;
          } // If up the parents tree there are 2 elements that are siblings, swap
          // the inerted sibling.


          if (oldParents[i] !== newParents[j]) {
            this[_swapInertedSibling](oldParents[i], newParents[j]);
          } // Restore old parents siblings inertness.


          i > 0 && this[_restoreInertedSiblings](oldParents.slice(0, i)); // Make new parents siblings inert.

          j > 0 && this[_inertSiblings](newParents.slice(0, j), toSkip, null);
        }
        /**
         * Swaps inertness between two sibling elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */


        [_swapInertedSibling](oldInert, newInert) {
          const siblingsToRestore = oldInert[_siblingsToRestore]; // oldInert is not contained in siblings to restore, so we have to check
          // if it's inertable and if already inert.

          if (this[_isInertable](oldInert) && !oldInert.inert) {
            oldInert.inert = true;
            siblingsToRestore.add(oldInert);
          } // If newInert was already between the siblings to restore, it means it is
          // inertable and must be restored.


          if (siblingsToRestore.has(newInert)) {
            newInert.inert = false;
            siblingsToRestore.delete(newInert);
          }

          newInert[_parentMO] = oldInert[_parentMO];
          newInert[_siblingsToRestore] = siblingsToRestore;
          oldInert[_parentMO] = undefined;
          oldInert[_siblingsToRestore] = undefined;
        }
        /**
         * Restores original inertness to the siblings of the elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */


        [_restoreInertedSiblings](elements) {
          for (const element of elements) {
            const mo = element[_parentMO];
            mo.disconnect();
            element[_parentMO] = undefined;
            const siblings = element[_siblingsToRestore];

            for (const sibling of siblings) {
              sibling.inert = false;
            }

            element[_siblingsToRestore] = undefined;
          }
        }
        /**
         * Inerts the siblings of the elements except the elements to skip. Stores
         * the inerted siblings into the element's symbol `_siblingsToRestore`.
         * Pass `toKeepInert` to collect the already inert elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */


        [_inertSiblings](elements, toSkip, toKeepInert) {
          for (const element of elements) {
            // Assume element is not a Document, so it must have a parentNode.
            const parent = element.parentNode;
            const children = parent.children;
            const inertedSiblings = new Set();

            for (let j = 0; j < children.length; j++) {
              const sibling = children[j]; // Skip the input element, if not inertable or to be skipped.

              if (sibling === element || !this[_isInertable](sibling) || toSkip && toSkip.has(sibling)) {
                continue;
              } // Should be collected since already inerted.


              if (toKeepInert && sibling.inert) {
                toKeepInert.add(sibling);
              } else {
                sibling.inert = true;
                inertedSiblings.add(sibling);
              }
            } // Store the siblings that were inerted.


            element[_siblingsToRestore] = inertedSiblings; // Observe only immediate children mutations on the parent.

            const mo = new MutationObserver(this[_handleMutations].bind(this));
            element[_parentMO] = mo;
            let parentToObserve = parent; // If we're using the ShadyDOM polyfill, then our parent could be a
            // shady root, which is an object that acts like a ShadowRoot, but isn't
            // actually a node in the real DOM. Observe the real DOM parent instead.

            const maybeShadyRoot = parentToObserve;

            if (maybeShadyRoot.__shady && maybeShadyRoot.host) {
              parentToObserve = maybeShadyRoot.host;
            }

            mo.observe(parentToObserve, {
              childList: true
            });
          }
        }
        /**
         * Handles newly added/removed nodes by toggling their inertness.
         * It also checks if the current top Blocking Element has been removed,
         * notifying and removing it.
         */


        [_handleMutations](mutations) {
          const parents = this[_topElParents];
          const toKeepInert = this[_alreadyInertElements];

          for (const mutation of mutations) {
            // If the target is a shadowRoot, get its host as we skip shadowRoots when
            // computing _topElParents.
            const target = mutation.target.host || mutation.target;
            const idx = target === document.body ? parents.length : parents.indexOf(target);
            const inertedChild = parents[idx - 1];
            const inertedSiblings = inertedChild[_siblingsToRestore]; // To restore.

            for (let i = 0; i < mutation.removedNodes.length; i++) {
              const sibling = mutation.removedNodes[i];

              if (sibling === inertedChild) {
                console.info('Detected removal of the top Blocking Element.');
                this.pop();
                return;
              }

              if (inertedSiblings.has(sibling)) {
                sibling.inert = false;
                inertedSiblings.delete(sibling);
              }
            } // To inert.


            for (let i = 0; i < mutation.addedNodes.length; i++) {
              const sibling = mutation.addedNodes[i];

              if (!this[_isInertable](sibling)) {
                continue;
              }

              if (toKeepInert && sibling.inert) {
                toKeepInert.add(sibling);
              } else {
                sibling.inert = true;
                inertedSiblings.add(sibling);
              }
            }
          }
        }
        /**
         * Returns if the element is inertable.
         */


        [_isInertable](element) {
          return false === /^(style|template|script)$/.test(element.localName);
        }
        /**
         * Returns the list of newParents of an element, starting from element
         * (included) up to `document.body` (excluded).
         */


        [_getParents](element) {
          const parents = [];
          let current = element; // Stop to body.

          while (current && current !== document.body) {
            // Skip shadow roots.
            if (current.nodeType === Node.ELEMENT_NODE) {
              parents.push(current);
            } // ShadowDom v1


            if (current.assignedSlot) {
              // Collect slots from deepest slot to top.
              while (current = current.assignedSlot) {
                parents.push(current);
              } // Continue the search on the top slot.


              current = parents.pop();
              continue;
            }

            current = current.parentNode || current.host;
          }

          return parents;
        }
        /**
         * Returns the distributed children of the element's shadow root.
         * Returns null if the element doesn't have a shadow root.
         */


        [_getDistributedChildren](element) {
          const shadowRoot = element.shadowRoot;

          if (!shadowRoot) {
            return null;
          }

          const result = new Set();
          let i;
          let j;
          let nodes;
          const slots = shadowRoot.querySelectorAll('slot');

          if (slots.length && slots[0].assignedNodes) {
            for (i = 0; i < slots.length; i++) {
              nodes = slots[i].assignedNodes({
                flatten: true
              });

              for (j = 0; j < nodes.length; j++) {
                if (nodes[j].nodeType === Node.ELEMENT_NODE) {
                  result.add(nodes[j]);
                }
              }
            } // No need to search for <content>.

          }

          return result;
        }

      }

      document.$blockingElements = new BlockingElementsImpl();
    })();

    createCommonjsModule(function (module, exports) {
      (function (global, factory) {
        factory() ;
      })(commonjsGlobal, function () {

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        /**
         * This work is licensed under the W3C Software and Document License
         * (http://www.w3.org/Consortium/Legal/2015/copyright-software-and-document).
         */


        (function () {
          // Return early if we're not running inside of the browser.
          if (typeof window === 'undefined') {
            return;
          } // Convenience function for converting NodeLists.

          /** @type {typeof Array.prototype.slice} */


          var slice = Array.prototype.slice;
          /**
           * IE has a non-standard name for "matches".
           * @type {typeof Element.prototype.matches}
           */

          var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
          /** @type {string} */

          var _focusableElementsString = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object', 'embed', '[contenteditable]'].join(',');
          /**
           * `InertRoot` manages a single inert subtree, i.e. a DOM subtree whose root element has an `inert`
           * attribute.
           *
           * Its main functions are:
           *
           * - to create and maintain a set of managed `InertNode`s, including when mutations occur in the
           *   subtree. The `makeSubtreeUnfocusable()` method handles collecting `InertNode`s via registering
           *   each focusable node in the subtree with the singleton `InertManager` which manages all known
           *   focusable nodes within inert subtrees. `InertManager` ensures that a single `InertNode`
           *   instance exists for each focusable node which has at least one inert root as an ancestor.
           *
           * - to notify all managed `InertNode`s when this subtree stops being inert (i.e. when the `inert`
           *   attribute is removed from the root node). This is handled in the destructor, which calls the
           *   `deregister` method on `InertManager` for each managed inert node.
           */


          var InertRoot = function () {
            /**
             * @param {!Element} rootElement The Element at the root of the inert subtree.
             * @param {!InertManager} inertManager The global singleton InertManager object.
             */
            function InertRoot(rootElement, inertManager) {
              _classCallCheck(this, InertRoot);
              /** @type {!InertManager} */


              this._inertManager = inertManager;
              /** @type {!Element} */

              this._rootElement = rootElement;
              /**
               * @type {!Set<!InertNode>}
               * All managed focusable nodes in this InertRoot's subtree.
               */

              this._managedNodes = new Set(); // Make the subtree hidden from assistive technology

              if (this._rootElement.hasAttribute('aria-hidden')) {
                /** @type {?string} */
                this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden');
              } else {
                this._savedAriaHidden = null;
              }

              this._rootElement.setAttribute('aria-hidden', 'true'); // Make all focusable elements in the subtree unfocusable and add them to _managedNodes


              this._makeSubtreeUnfocusable(this._rootElement); // Watch for:
              // - any additions in the subtree: make them unfocusable too
              // - any removals from the subtree: remove them from this inert root's managed nodes
              // - attribute changes: if `tabindex` is added, or removed from an intrinsically focusable
              //   element, make that node a managed node.


              this._observer = new MutationObserver(this._onMutation.bind(this));

              this._observer.observe(this._rootElement, {
                attributes: true,
                childList: true,
                subtree: true
              });
            }
            /**
             * Call this whenever this object is about to become obsolete.  This unwinds all of the state
             * stored in this object and updates the state of all of the managed nodes.
             */


            _createClass(InertRoot, [{
              key: 'destructor',
              value: function destructor() {
                this._observer.disconnect();

                if (this._rootElement) {
                  if (this._savedAriaHidden !== null) {
                    this._rootElement.setAttribute('aria-hidden', this._savedAriaHidden);
                  } else {
                    this._rootElement.removeAttribute('aria-hidden');
                  }
                }

                this._managedNodes.forEach(function (inertNode) {
                  this._unmanageNode(inertNode.node);
                }, this); // Note we cast the nulls to the ANY type here because:
                // 1) We want the class properties to be declared as non-null, or else we
                //    need even more casts throughout this code. All bets are off if an
                //    instance has been destroyed and a method is called.
                // 2) We don't want to cast "this", because we want type-aware optimizations
                //    to know which properties we're setting.


                this._observer =
                /** @type {?} */
                null;
                this._rootElement =
                /** @type {?} */
                null;
                this._managedNodes =
                /** @type {?} */
                null;
                this._inertManager =
                /** @type {?} */
                null;
              }
              /**
               * @return {!Set<!InertNode>} A copy of this InertRoot's managed nodes set.
               */

            }, {
              key: '_makeSubtreeUnfocusable',

              /**
               * @param {!Node} startNode
               */
              value: function _makeSubtreeUnfocusable(startNode) {
                var _this2 = this;

                composedTreeWalk(startNode, function (node) {
                  return _this2._visitNode(node);
                });
                var activeElement = document.activeElement;

                if (!document.body.contains(startNode)) {
                  // startNode may be in shadow DOM, so find its nearest shadowRoot to get the activeElement.
                  var node = startNode;
                  /** @type {!ShadowRoot|undefined} */

                  var root = undefined;

                  while (node) {
                    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                      root =
                      /** @type {!ShadowRoot} */
                      node;
                      break;
                    }

                    node = node.parentNode;
                  }

                  if (root) {
                    activeElement = root.activeElement;
                  }
                }

                if (startNode.contains(activeElement)) {
                  activeElement.blur(); // In IE11, if an element is already focused, and then set to tabindex=-1
                  // calling blur() will not actually move the focus.
                  // To work around this we call focus() on the body instead.

                  if (activeElement === document.activeElement) {
                    document.body.focus();
                  }
                }
              }
              /**
               * @param {!Node} node
               */

            }, {
              key: '_visitNode',
              value: function _visitNode(node) {
                if (node.nodeType !== Node.ELEMENT_NODE) {
                  return;
                }

                var element =
                /** @type {!Element} */
                node; // If a descendant inert root becomes un-inert, its descendants will still be inert because of
                // this inert root, so all of its managed nodes need to be adopted by this InertRoot.

                if (element !== this._rootElement && element.hasAttribute('inert')) {
                  this._adoptInertRoot(element);
                }

                if (matches.call(element, _focusableElementsString) || element.hasAttribute('tabindex')) {
                  this._manageNode(element);
                }
              }
              /**
               * Register the given node with this InertRoot and with InertManager.
               * @param {!Node} node
               */

            }, {
              key: '_manageNode',
              value: function _manageNode(node) {
                var inertNode = this._inertManager.register(node, this);

                this._managedNodes.add(inertNode);
              }
              /**
               * Unregister the given node with this InertRoot and with InertManager.
               * @param {!Node} node
               */

            }, {
              key: '_unmanageNode',
              value: function _unmanageNode(node) {
                var inertNode = this._inertManager.deregister(node, this);

                if (inertNode) {
                  this._managedNodes['delete'](inertNode);
                }
              }
              /**
               * Unregister the entire subtree starting at `startNode`.
               * @param {!Node} startNode
               */

            }, {
              key: '_unmanageSubtree',
              value: function _unmanageSubtree(startNode) {
                var _this3 = this;

                composedTreeWalk(startNode, function (node) {
                  return _this3._unmanageNode(node);
                });
              }
              /**
               * If a descendant node is found with an `inert` attribute, adopt its managed nodes.
               * @param {!Element} node
               */

            }, {
              key: '_adoptInertRoot',
              value: function _adoptInertRoot(node) {
                var inertSubroot = this._inertManager.getInertRoot(node); // During initialisation this inert root may not have been registered yet,
                // so register it now if need be.


                if (!inertSubroot) {
                  this._inertManager.setInert(node, true);

                  inertSubroot = this._inertManager.getInertRoot(node);
                }

                inertSubroot.managedNodes.forEach(function (savedInertNode) {
                  this._manageNode(savedInertNode.node);
                }, this);
              }
              /**
               * Callback used when mutation observer detects subtree additions, removals, or attribute changes.
               * @param {!Array<!MutationRecord>} records
               * @param {!MutationObserver} self
               */

            }, {
              key: '_onMutation',
              value: function _onMutation(records, self) {
                records.forEach(function (record) {
                  var target =
                  /** @type {!Element} */
                  record.target;

                  if (record.type === 'childList') {
                    // Manage added nodes
                    slice.call(record.addedNodes).forEach(function (node) {
                      this._makeSubtreeUnfocusable(node);
                    }, this); // Un-manage removed nodes

                    slice.call(record.removedNodes).forEach(function (node) {
                      this._unmanageSubtree(node);
                    }, this);
                  } else if (record.type === 'attributes') {
                    if (record.attributeName === 'tabindex') {
                      // Re-initialise inert node if tabindex changes
                      this._manageNode(target);
                    } else if (target !== this._rootElement && record.attributeName === 'inert' && target.hasAttribute('inert')) {
                      // If a new inert root is added, adopt its managed nodes and make sure it knows about the
                      // already managed nodes from this inert subroot.
                      this._adoptInertRoot(target);

                      var inertSubroot = this._inertManager.getInertRoot(target);

                      this._managedNodes.forEach(function (managedNode) {
                        if (target.contains(managedNode.node)) {
                          inertSubroot._manageNode(managedNode.node);
                        }
                      });
                    }
                  }
                }, this);
              }
            }, {
              key: 'managedNodes',
              get: function get() {
                return new Set(this._managedNodes);
              }
              /** @return {boolean} */

            }, {
              key: 'hasSavedAriaHidden',
              get: function get() {
                return this._savedAriaHidden !== null;
              }
              /** @param {?string} ariaHidden */

            }, {
              key: 'savedAriaHidden',
              set: function set(ariaHidden) {
                this._savedAriaHidden = ariaHidden;
              }
              /** @return {?string} */
              ,
              get: function get() {
                return this._savedAriaHidden;
              }
            }]);

            return InertRoot;
          }();
          /**
           * `InertNode` initialises and manages a single inert node.
           * A node is inert if it is a descendant of one or more inert root elements.
           *
           * On construction, `InertNode` saves the existing `tabindex` value for the node, if any, and
           * either removes the `tabindex` attribute or sets it to `-1`, depending on whether the element
           * is intrinsically focusable or not.
           *
           * `InertNode` maintains a set of `InertRoot`s which are descendants of this `InertNode`. When an
           * `InertRoot` is destroyed, and calls `InertManager.deregister()`, the `InertManager` notifies the
           * `InertNode` via `removeInertRoot()`, which in turn destroys the `InertNode` if no `InertRoot`s
           * remain in the set. On destruction, `InertNode` reinstates the stored `tabindex` if one exists,
           * or removes the `tabindex` attribute if the element is intrinsically focusable.
           */


          var InertNode = function () {
            /**
             * @param {!Node} node A focusable element to be made inert.
             * @param {!InertRoot} inertRoot The inert root element associated with this inert node.
             */
            function InertNode(node, inertRoot) {
              _classCallCheck(this, InertNode);
              /** @type {!Node} */


              this._node = node;
              /** @type {boolean} */

              this._overrodeFocusMethod = false;
              /**
               * @type {!Set<!InertRoot>} The set of descendant inert roots.
               *    If and only if this set becomes empty, this node is no longer inert.
               */

              this._inertRoots = new Set([inertRoot]);
              /** @type {?number} */

              this._savedTabIndex = null;
              /** @type {boolean} */

              this._destroyed = false; // Save any prior tabindex info and make this node untabbable

              this.ensureUntabbable();
            }
            /**
             * Call this whenever this object is about to become obsolete.
             * This makes the managed node focusable again and deletes all of the previously stored state.
             */


            _createClass(InertNode, [{
              key: 'destructor',
              value: function destructor() {
                this._throwIfDestroyed();

                if (this._node && this._node.nodeType === Node.ELEMENT_NODE) {
                  var element =
                  /** @type {!Element} */
                  this._node;

                  if (this._savedTabIndex !== null) {
                    element.setAttribute('tabindex', this._savedTabIndex);
                  } else {
                    element.removeAttribute('tabindex');
                  } // Use `delete` to restore native focus method.


                  if (this._overrodeFocusMethod) {
                    delete element.focus;
                  }
                } // See note in InertRoot.destructor for why we cast these nulls to ANY.


                this._node =
                /** @type {?} */
                null;
                this._inertRoots =
                /** @type {?} */
                null;
                this._destroyed = true;
              }
              /**
               * @type {boolean} Whether this object is obsolete because the managed node is no longer inert.
               * If the object has been destroyed, any attempt to access it will cause an exception.
               */

            }, {
              key: '_throwIfDestroyed',

              /**
               * Throw if user tries to access destroyed InertNode.
               */
              value: function _throwIfDestroyed() {
                if (this.destroyed) {
                  throw new Error('Trying to access destroyed InertNode');
                }
              }
              /** @return {boolean} */

            }, {
              key: 'ensureUntabbable',

              /** Save the existing tabindex value and make the node untabbable and unfocusable */
              value: function ensureUntabbable() {
                if (this.node.nodeType !== Node.ELEMENT_NODE) {
                  return;
                }

                var element =
                /** @type {!Element} */
                this.node;

                if (matches.call(element, _focusableElementsString)) {
                  if (
                  /** @type {!HTMLElement} */
                  element.tabIndex === -1 && this.hasSavedTabIndex) {
                    return;
                  }

                  if (element.hasAttribute('tabindex')) {
                    this._savedTabIndex =
                    /** @type {!HTMLElement} */
                    element.tabIndex;
                  }

                  element.setAttribute('tabindex', '-1');

                  if (element.nodeType === Node.ELEMENT_NODE) {
                    element.focus = function () {};

                    this._overrodeFocusMethod = true;
                  }
                } else if (element.hasAttribute('tabindex')) {
                  this._savedTabIndex =
                  /** @type {!HTMLElement} */
                  element.tabIndex;
                  element.removeAttribute('tabindex');
                }
              }
              /**
               * Add another inert root to this inert node's set of managing inert roots.
               * @param {!InertRoot} inertRoot
               */

            }, {
              key: 'addInertRoot',
              value: function addInertRoot(inertRoot) {
                this._throwIfDestroyed();

                this._inertRoots.add(inertRoot);
              }
              /**
               * Remove the given inert root from this inert node's set of managing inert roots.
               * If the set of managing inert roots becomes empty, this node is no longer inert,
               * so the object should be destroyed.
               * @param {!InertRoot} inertRoot
               */

            }, {
              key: 'removeInertRoot',
              value: function removeInertRoot(inertRoot) {
                this._throwIfDestroyed();

                this._inertRoots['delete'](inertRoot);

                if (this._inertRoots.size === 0) {
                  this.destructor();
                }
              }
            }, {
              key: 'destroyed',
              get: function get() {
                return (
                  /** @type {!InertNode} */
                  this._destroyed
                );
              }
            }, {
              key: 'hasSavedTabIndex',
              get: function get() {
                return this._savedTabIndex !== null;
              }
              /** @return {!Node} */

            }, {
              key: 'node',
              get: function get() {
                this._throwIfDestroyed();

                return this._node;
              }
              /** @param {?number} tabIndex */

            }, {
              key: 'savedTabIndex',
              set: function set(tabIndex) {
                this._throwIfDestroyed();

                this._savedTabIndex = tabIndex;
              }
              /** @return {?number} */
              ,
              get: function get() {
                this._throwIfDestroyed();

                return this._savedTabIndex;
              }
            }]);

            return InertNode;
          }();
          /**
           * InertManager is a per-document singleton object which manages all inert roots and nodes.
           *
           * When an element becomes an inert root by having an `inert` attribute set and/or its `inert`
           * property set to `true`, the `setInert` method creates an `InertRoot` object for the element.
           * The `InertRoot` in turn registers itself as managing all of the element's focusable descendant
           * nodes via the `register()` method. The `InertManager` ensures that a single `InertNode` instance
           * is created for each such node, via the `_managedNodes` map.
           */


          var InertManager = function () {
            /**
             * @param {!Document} document
             */
            function InertManager(document) {
              _classCallCheck(this, InertManager);

              if (!document) {
                throw new Error('Missing required argument; InertManager needs to wrap a document.');
              }
              /** @type {!Document} */


              this._document = document;
              /**
               * All managed nodes known to this InertManager. In a map to allow looking up by Node.
               * @type {!Map<!Node, !InertNode>}
               */

              this._managedNodes = new Map();
              /**
               * All inert roots known to this InertManager. In a map to allow looking up by Node.
               * @type {!Map<!Node, !InertRoot>}
               */

              this._inertRoots = new Map();
              /**
               * Observer for mutations on `document.body`.
               * @type {!MutationObserver}
               */

              this._observer = new MutationObserver(this._watchForInert.bind(this)); // Add inert style.

              addInertStyle(document.head || document.body || document.documentElement); // Wait for document to be loaded.

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this));
              } else {
                this._onDocumentLoaded();
              }
            }
            /**
             * Set whether the given element should be an inert root or not.
             * @param {!Element} root
             * @param {boolean} inert
             */


            _createClass(InertManager, [{
              key: 'setInert',
              value: function setInert(root, inert) {
                if (inert) {
                  if (this._inertRoots.has(root)) {
                    // element is already inert
                    return;
                  }

                  var inertRoot = new InertRoot(root, this);
                  root.setAttribute('inert', '');

                  this._inertRoots.set(root, inertRoot); // If not contained in the document, it must be in a shadowRoot.
                  // Ensure inert styles are added there.


                  if (!this._document.body.contains(root)) {
                    var parent = root.parentNode;

                    while (parent) {
                      if (parent.nodeType === 11) {
                        addInertStyle(parent);
                      }

                      parent = parent.parentNode;
                    }
                  }
                } else {
                  if (!this._inertRoots.has(root)) {
                    // element is already non-inert
                    return;
                  }

                  var _inertRoot = this._inertRoots.get(root);

                  _inertRoot.destructor();

                  this._inertRoots['delete'](root);

                  root.removeAttribute('inert');
                }
              }
              /**
               * Get the InertRoot object corresponding to the given inert root element, if any.
               * @param {!Node} element
               * @return {!InertRoot|undefined}
               */

            }, {
              key: 'getInertRoot',
              value: function getInertRoot(element) {
                return this._inertRoots.get(element);
              }
              /**
               * Register the given InertRoot as managing the given node.
               * In the case where the node has a previously existing inert root, this inert root will
               * be added to its set of inert roots.
               * @param {!Node} node
               * @param {!InertRoot} inertRoot
               * @return {!InertNode} inertNode
               */

            }, {
              key: 'register',
              value: function register(node, inertRoot) {
                var inertNode = this._managedNodes.get(node);

                if (inertNode !== undefined) {
                  // node was already in an inert subtree
                  inertNode.addInertRoot(inertRoot);
                } else {
                  inertNode = new InertNode(node, inertRoot);
                }

                this._managedNodes.set(node, inertNode);

                return inertNode;
              }
              /**
               * De-register the given InertRoot as managing the given inert node.
               * Removes the inert root from the InertNode's set of managing inert roots, and remove the inert
               * node from the InertManager's set of managed nodes if it is destroyed.
               * If the node is not currently managed, this is essentially a no-op.
               * @param {!Node} node
               * @param {!InertRoot} inertRoot
               * @return {?InertNode} The potentially destroyed InertNode associated with this node, if any.
               */

            }, {
              key: 'deregister',
              value: function deregister(node, inertRoot) {
                var inertNode = this._managedNodes.get(node);

                if (!inertNode) {
                  return null;
                }

                inertNode.removeInertRoot(inertRoot);

                if (inertNode.destroyed) {
                  this._managedNodes['delete'](node);
                }

                return inertNode;
              }
              /**
               * Callback used when document has finished loading.
               */

            }, {
              key: '_onDocumentLoaded',
              value: function _onDocumentLoaded() {
                // Find all inert roots in document and make them actually inert.
                var inertElements = slice.call(this._document.querySelectorAll('[inert]'));
                inertElements.forEach(function (inertElement) {
                  this.setInert(inertElement, true);
                }, this); // Comment this out to use programmatic API only.

                this._observer.observe(this._document.body || this._document.documentElement, {
                  attributes: true,
                  subtree: true,
                  childList: true
                });
              }
              /**
               * Callback used when mutation observer detects attribute changes.
               * @param {!Array<!MutationRecord>} records
               * @param {!MutationObserver} self
               */

            }, {
              key: '_watchForInert',
              value: function _watchForInert(records, self) {
                var _this = this;

                records.forEach(function (record) {
                  switch (record.type) {
                    case 'childList':
                      slice.call(record.addedNodes).forEach(function (node) {
                        if (node.nodeType !== Node.ELEMENT_NODE) {
                          return;
                        }

                        var inertElements = slice.call(node.querySelectorAll('[inert]'));

                        if (matches.call(node, '[inert]')) {
                          inertElements.unshift(node);
                        }

                        inertElements.forEach(function (inertElement) {
                          this.setInert(inertElement, true);
                        }, _this);
                      }, _this);
                      break;

                    case 'attributes':
                      if (record.attributeName !== 'inert') {
                        return;
                      }

                      var target =
                      /** @type {!Element} */
                      record.target;
                      var inert = target.hasAttribute('inert');

                      _this.setInert(target, inert);

                      break;
                  }
                }, this);
              }
            }]);

            return InertManager;
          }();
          /**
           * Recursively walk the composed tree from |node|.
           * @param {!Node} node
           * @param {(function (!Element))=} callback Callback to be called for each element traversed,
           *     before descending into child nodes.
           * @param {?ShadowRoot=} shadowRootAncestor The nearest ShadowRoot ancestor, if any.
           */


          function composedTreeWalk(node, callback, shadowRootAncestor) {
            if (node.nodeType == Node.ELEMENT_NODE) {
              var element =
              /** @type {!Element} */
              node;

              if (callback) {
                callback(element);
              } // Descend into node:
              // If it has a ShadowRoot, ignore all child elements - these will be picked
              // up by the <content> or <shadow> elements. Descend straight into the
              // ShadowRoot.


              var shadowRoot =
              /** @type {!HTMLElement} */
              element.shadowRoot;

              if (shadowRoot) {
                composedTreeWalk(shadowRoot, callback);
                return;
              } // If it is a <content> element, descend into distributed elements - these
              // are elements from outside the shadow root which are rendered inside the
              // shadow DOM.


              if (element.localName == 'content') {
                var content =
                /** @type {!HTMLContentElement} */
                element; // Verifies if ShadowDom v0 is supported.

                var distributedNodes = content.getDistributedNodes ? content.getDistributedNodes() : [];

                for (var i = 0; i < distributedNodes.length; i++) {
                  composedTreeWalk(distributedNodes[i], callback);
                }

                return;
              } // If it is a <slot> element, descend into assigned nodes - these
              // are elements from outside the shadow root which are rendered inside the
              // shadow DOM.


              if (element.localName == 'slot') {
                var slot =
                /** @type {!HTMLSlotElement} */
                element; // Verify if ShadowDom v1 is supported.

                var _distributedNodes = slot.assignedNodes ? slot.assignedNodes({
                  flatten: true
                }) : [];

                for (var _i = 0; _i < _distributedNodes.length; _i++) {
                  composedTreeWalk(_distributedNodes[_i], callback);
                }

                return;
              }
            } // If it is neither the parent of a ShadowRoot, a <content> element, a <slot>
            // element, nor a <shadow> element recurse normally.


            var child = node.firstChild;

            while (child != null) {
              composedTreeWalk(child, callback);
              child = child.nextSibling;
            }
          }
          /**
           * Adds a style element to the node containing the inert specific styles
           * @param {!Node} node
           */


          function addInertStyle(node) {
            if (node.querySelector('style#inert-style, link#inert-style')) {
              return;
            }

            var style = document.createElement('style');
            style.setAttribute('id', 'inert-style');
            style.textContent = '\n' + '[inert] {\n' + '  pointer-events: none;\n' + '  cursor: default;\n' + '}\n' + '\n' + '[inert], [inert] * {\n' + '  -webkit-user-select: none;\n' + '  -moz-user-select: none;\n' + '  -ms-user-select: none;\n' + '  user-select: none;\n' + '}\n';
            node.appendChild(style);
          }

          if (!Element.prototype.hasOwnProperty('inert')) {
            /** @type {!InertManager} */
            var inertManager = new InertManager(document);
            Object.defineProperty(Element.prototype, 'inert', {
              enumerable: true,

              /** @this {!Element} */
              get: function get() {
                return this.hasAttribute('inert');
              },

              /** @this {!Element} */
              set: function set(inert) {
                inertManager.setInert(this, inert);
              }
            });
          }
        })();
      });
    });

    const blockingElements = document.$blockingElements;
    /**
     * Allows an element to trap focus by applying the "inert" attribute to all sibling, aunt, and uncle nodes.
     *
     * Automatically handles consecutive calls with a loosely applied stack operation
     * (specifically via `blockingElements`, with a small polyfill because I'm not sure how long
     * it'll take to find its way into the spec, if ever)
     * @param target
     */

    function useBlockingElement(target) {
      /**
       * Push/pop the element from the blockingElements stack.
       */
      h(() => {
        if (target) {
          blockingElements.push(target);
          return () => {
            blockingElements.remove(target);
          };
        }
      }, [target]);
    }
    function getTopElement() {
      return blockingElements.top;
    }

    const elementsToRestoreFocusTo = new Map();
    function useFocusTrap({
      trapActive
    }) {
      const {
        element,
        useRefElementProps,
        getElement
      } = useRefElement();
      const {
        getLastActiveElement
      } = useActiveElement(); // When the trap becomes active, before we let the blockingElements hook run,
      // keep track of whatever's currently focused and save it.

      h(() => {
        if (trapActive && element) {
          var _getLastActiveElement;

          // Save the currently focused element
          // to whatever's currently at the top of the stack
          elementsToRestoreFocusTo.set(getTopElement(), (_getLastActiveElement = getLastActiveElement()) !== null && _getLastActiveElement !== void 0 ? _getLastActiveElement : document.body);
        }
      }, [trapActive, element]);
      useBlockingElement(trapActive ? element : null);
      /**
       * Any time we activate or deactivate the trap,
       * change focus to something else (something in
       * the trap if it's active, or whatever we've
       * tracked in elementsToRestoreFocusTo if not)
       */

      h(() => {
        if (trapActive && element) {
          let rafHandle = requestAnimationFrame(() => {
            // TODO: This extra queueMicrotask is needed for
            // ...reasons?
            queueMicrotask(() => {
              var _findFirstFocusable;

              (_findFirstFocusable = findFirstFocusable(element)) === null || _findFirstFocusable === void 0 ? void 0 : _findFirstFocusable.focus();
              rafHandle = 0;
            });
          });
          return () => {
            if (rafHandle) cancelAnimationFrame(rafHandle);
          };
        } else if (element) {
          // Restore the focus to the element
          // that has returned to the top of the stack
          let rafHandle = requestAnimationFrame(() => {
            queueMicrotask(() => {
              var _elementsToRestoreFoc;

              (_elementsToRestoreFoc = elementsToRestoreFocusTo.get(getTopElement())) === null || _elementsToRestoreFoc === void 0 ? void 0 : _elementsToRestoreFoc.focus();
              rafHandle = 0;
            });
          });
          return () => {
            if (rafHandle) cancelAnimationFrame(rafHandle);
          };
        }
      }, [trapActive, element]);

      const useFocusTrapProps = props => {
        return useMergedProps()({
          "aria-modal": trapActive ? "true" : undefined
        }, useRefElementProps(props));
      };

      return {
        useFocusTrapProps,
        element,
        getElement
      };
    }
    /**
     * Returns the first focusable element contained within the given node, or null if none are found.
     * @param element
     * @returns
     */

    function findFirstFocusable(element) {
      const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
        acceptNode: node => node instanceof Element && isFocusable(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      });
      const firstFocusable = treeWalker.firstChild();
      return firstFocusable;
    }

    function useAriaTooltip({
      mouseoverDelay
    }) {
      var _mouseoverDelay;

      (_mouseoverDelay = mouseoverDelay) !== null && _mouseoverDelay !== void 0 ? _mouseoverDelay : mouseoverDelay = 400;
      const [open, setOpen, getOpen] = useState(false);
      const [hasAnyMouseover, setHasAnyMouseover] = useState(false); //const [mouseoverIsValid, setMouseoverIsValid] = useState(false);

      const {
        useRandomIdProps: useTooltipIdProps,
        useReferencedIdProps: useTooltipIdReferencingProps
      } = useRandomId({
        prefix: "aria-tooltip-"
      });
      const {
        focusedInner: triggerFocused,
        useHasFocusProps
      } = useHasFocus();
      const [triggerHasMouseover, setTriggerHasMouseover] = useState(false);
      const [tooltipHasMouseover, setTooltipHasMouseover] = useState(false);
      useTimeout({
        timeout: mouseoverDelay,
        triggerIndex: +triggerHasMouseover + +tooltipHasMouseover,
        callback: () => {
          if (triggerHasMouseover || tooltipHasMouseover) setHasAnyMouseover(true);
        }
      });
      useTimeout({
        timeout: 50,
        triggerIndex: +triggerHasMouseover + +tooltipHasMouseover,
        callback: () => {
          if (!triggerHasMouseover && !tooltipHasMouseover) setHasAnyMouseover(false);
        }
      });
      y(() => {
        setOpen(hasAnyMouseover || triggerFocused);
      }, [hasAnyMouseover, triggerFocused]);
      const useTooltipTrigger = A$1(function useTooltipTrigger() {
        function onPointerEnter(e) {
          setTriggerHasMouseover(true);
        }

        function onPointerLeave(e) {
          setTriggerHasMouseover(false);
        }

        function useTooltipTriggerProps({ ...props
        }) {
          // Note: Though it's important to make sure that focusing activates a tooltip,
          // it's perfectly reasonable that a child element will be the one that's focused,
          // not this one, so we don't set tabIndex=0
          return useTooltipIdReferencingProps("aria-describedby")(useMergedProps()({
            onPointerEnter,
            onPointerLeave
          }, useHasFocusProps(props)));
        }

        return {
          useTooltipTriggerProps
        };
      }, [useTooltipIdReferencingProps]);
      const useTooltip = A$1(function useTooltip() {
        function onPointerEnter(e) {
          setTooltipHasMouseover(true);
        }

        function onPointerLeave(e) {
          setTooltipHasMouseover(false);
        }

        function useTooltipProps({ ...props
        }) {
          props.role = "tooltip";
          return useTooltipIdProps(useMergedProps()({
            onPointerEnter,
            onPointerLeave
          }, props));
        }

        return {
          useTooltipProps
        };
      }, [useTooltipIdProps]);
      return {
        useTooltip,
        useTooltipTrigger,
        isOpen: open,
        getIsOpen: getOpen
      };
    }

    function S(n, t) {
      for (var e in t) n[e] = t[e];

      return n;
    }

    function C(n, t) {
      for (var e in n) if ("__source" !== e && !(e in t)) return !0;

      for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;

      return !1;
    }

    function E(n) {
      this.props = n;
    }

    function g(n, t) {
      function e(n) {
        var e = this.props.ref,
            r = e == n.ref;
        return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : C(this.props, n);
      }

      function r(t) {
        return this.shouldComponentUpdate = e, v$1(n, t);
      }

      return r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
    }

    (E.prototype = new _$1()).isPureReactComponent = !0, E.prototype.shouldComponentUpdate = function (n, t) {
      return C(this.props, n) || C(this.state, t);
    };
    var w = l$1.__b;

    l$1.__b = function (n) {
      n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), w && w(n);
    };

    var R = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;

    function x(n) {
      function t(t, e) {
        var r = S({}, t);
        return delete r.ref, n(r, (e = t.ref || e) && ("object" != typeof e || "current" in e) ? e : null);
      }

      return t.$$typeof = R, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
    }

    var A = l$1.__e;

    l$1.__e = function (n, t, e) {
      if (n.then) for (var r, u = t; u = u.__;) if ((r = u.__c) && r.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), r.__c(n, t);
      A(n, t, e);
    };

    var O = l$1.unmount;

    function L() {
      this.__u = 0, this.t = null, this.__b = null;
    }

    function U(n) {
      var t = n.__.__c;
      return t && t.__e && t.__e(n);
    }

    function M() {
      this.u = null, this.o = null;
    }

    l$1.unmount = function (n) {
      var t = n.__c;
      t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), O && O(n);
    }, (L.prototype = new _$1()).__c = function (n, t) {
      var e = t.__c,
          r = this;
      null == r.t && (r.t = []), r.t.push(e);

      var u = U(r.__v),
          o = !1,
          i = function () {
        o || (o = !0, e.__R = null, u ? u(l) : l());
      };

      e.__R = i;

      var l = function () {
        if (! --r.__u) {
          if (r.state.__e) {
            var n = r.state.__e;

            r.__v.__k[0] = function n(t, e, r) {
              return t && (t.__v = null, t.__k = t.__k && t.__k.map(function (t) {
                return n(t, e, r);
              }), t.__c && t.__c.__P === e && (t.__e && r.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = r)), t;
            }(n, n.__c.__P, n.__c.__O);
          }

          var t;

          for (r.setState({
            __e: r.__b = null
          }); t = r.t.pop();) t.forceUpdate();
        }
      },
          f = !0 === t.__h;

      r.__u++ || f || r.setState({
        __e: r.__b = r.__v.__k[0]
      }), n.then(i, i);
    }, L.prototype.componentWillUnmount = function () {
      this.t = [];
    }, L.prototype.render = function (n, t) {
      if (this.__b) {
        if (this.__v.__k) {
          var e = document.createElement("div"),
              r = this.__v.__k[0].__c;

          this.__v.__k[0] = function n(t, e, r) {
            return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function (n) {
              "function" == typeof n.__c && n.__c();
            }), t.__c.__H = null), null != (t = S({}, t)).__c && (t.__c.__P === r && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function (t) {
              return n(t, e, r);
            })), t;
          }(this.__b, e, r.__O = r.__P);
        }

        this.__b = null;
      }

      var u = t.__e && v$1(d$1, null, n.fallback);
      return u && (u.__h = null), [v$1(d$1, null, t.__e ? null : n.children), u];
    };

    var T = function (n, t, e) {
      if (++e[1] === e[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e;) {
        for (; e.length > 3;) e.pop()();

        if (e[1] < e[0]) break;
        n.u = e = e[2];
      }
    };

    function D(n) {
      return this.getChildContext = function () {
        return n.context;
      }, n.children;
    }

    function I(n) {
      var t = this,
          e = n.i;
      t.componentWillUnmount = function () {
        S$1(null, t.l), t.l = null, t.i = null;
      }, t.i && t.i !== e && t.componentWillUnmount(), n.__v ? (t.l || (t.i = e, t.l = {
        nodeType: 1,
        parentNode: e,
        childNodes: [],
        appendChild: function (n) {
          this.childNodes.push(n), t.i.appendChild(n);
        },
        insertBefore: function (n, e) {
          this.childNodes.push(n), t.i.appendChild(n);
        },
        removeChild: function (n) {
          this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), t.i.removeChild(n);
        }
      }), S$1(v$1(D, {
        context: t.context
      }, n.__v), t.l)) : t.l && t.componentWillUnmount();
    }

    function W(n, t) {
      return v$1(I, {
        __v: n,
        i: t
      });
    }

    (M.prototype = new _$1()).__e = function (n) {
      var t = this,
          e = U(t.__v),
          r = t.o.get(n);
      return r[0]++, function (u) {
        var o = function () {
          t.props.revealOrder ? (r.push(u), T(t, n, r)) : u();
        };

        e ? e(o) : o();
      };
    }, M.prototype.render = function (n) {
      this.u = null, this.o = new Map();
      var t = A$2(n.children);
      n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

      for (var e = t.length; e--;) this.o.set(t[e], this.u = [1, 0, this.u]);

      return n.children;
    }, M.prototype.componentDidUpdate = M.prototype.componentDidMount = function () {
      var n = this;
      this.o.forEach(function (t, e) {
        T(n, e, t);
      });
    };

    var j = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
        P = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
        V = function (n) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n);
    };

    _$1.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (n) {
      Object.defineProperty(_$1.prototype, n, {
        configurable: !0,
        get: function () {
          return this["UNSAFE_" + n];
        },
        set: function (t) {
          Object.defineProperty(this, n, {
            configurable: !0,
            writable: !0,
            value: t
          });
        }
      });
    });
    var H = l$1.event;

    function Z() {}

    function Y() {
      return this.cancelBubble;
    }

    function $() {
      return this.defaultPrevented;
    }

    l$1.event = function (n) {
      return H && (n = H(n)), n.persist = Z, n.isPropagationStopped = Y, n.isDefaultPrevented = $, n.nativeEvent = n;
    };

    var G = {
      configurable: !0,
      get: function () {
        return this.class;
      }
    },
        J = l$1.vnode;

    l$1.vnode = function (n) {
      var t = n.type,
          e = n.props,
          r = e;

      if ("string" == typeof t) {
        for (var u in r = {}, e) {
          var o = e[u];
          "value" === u && "defaultValue" in e && null == o || ("defaultValue" === u && "value" in e && null == e.value ? u = "value" : "download" === u && !0 === o ? o = "" : /ondoubleclick/i.test(u) ? u = "ondblclick" : /^onchange(textarea|input)/i.test(u + t) && !V(e.type) ? u = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(u) ? u = u.toLowerCase() : P.test(u) ? u = u.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === o && (o = void 0), r[u] = o);
        }

        "select" == t && r.multiple && Array.isArray(r.value) && (r.value = A$2(e.children).forEach(function (n) {
          n.props.selected = -1 != r.value.indexOf(n.props.value);
        })), "select" == t && null != r.defaultValue && (r.value = A$2(e.children).forEach(function (n) {
          n.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(n.props.value) : r.defaultValue == n.props.value;
        })), n.props = r;
      }

      t && e.class != e.className && (G.enumerable = "className" in e, null != e.className && (r.class = e.className), Object.defineProperty(r, "className", G)), n.$$typeof = j, J && J(n);
    };

    var K = l$1.__r;

    l$1.__r = function (n) {
      K && K(n);
    };

    /**
     * Shortcut for preact/compat's `forwardRef` that auto-assumes some things that are useful for forwarding refs to `HTMLElements` specifically.
     * Namely it involves de-gunking the type system by letting us return *generic* function and playing nice with React. In all other respects, it acts like `forwardRef`.
     */

    function forwardElementRef$1(Component) {
      const ForwardedComponent = x(Component);
      return ForwardedComponent;
    }

    function getClassName(classBase, open, phase) {
      if (phase) return `${classBase || "transition"}-${open}-${phase}`;else return `${classBase || "transition"}-${open}`;
    }

    function forceReflow(e) {
      // Try really hard to make sure this isn't optimized out by anything.
      // We need it for its document reflow side effect.
      e.getBoundingClientRect();
      return e;
    }
    /**
     * A hook that adds & removes class names in a way that facilitates proper transitions.
     *
     * The first argument contains the props related directly to the transition.
     *
     * The second argument contains any other props you might want merged into the final product (these are not read or manipulated or anything -- it's purely shorthand and can be omitted with `{}` and then your own `useMergedProps`).
     */


    function useCreateTransitionableProps({
      measure,
      animateOnMount,
      classBase,
      onTransitionUpdate,
      exitVisibility,
      duration,
      open,
      ref
    }, otherProps) {
      var _classBase;

      (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
      const {
        element,
        useRefElementProps
      } = useRefElement();
      const [phase, setPhase] = l(animateOnMount ? "init" : null);
      const [direction, setDirection] = l(open == null ? null : open ? "enter" : "exit");
      const [surfaceWidth, setSurfaceWidth] = l(null);
      const [surfaceHeight, setSurfaceHeight] = l(null);
      const [surfaceX, setSurfaceX] = l(null);
      const [surfaceY, setSurfaceY] = l(null);
      const [transitioningWidth, setTransitioningWidth] = l(null);
      const [transitioningHeight, setTransitioningHeight] = l(null);
      const [transitioningX, setTransitioningX] = l(null);
      const [transitioningY, setTransitioningY] = l(null);
      const {
        getLogicalDirection
      } = useLogicalDirection(element);
      const logicalDirection = getLogicalDirection();
      const onTransitionUpdateRef = s(onTransitionUpdate);
      const phaseRef = s(phase);
      const directionRef = s(direction);
      const durationRef = s(duration);
      const tooEarlyTimeoutRef = s(null);
      const tooEarlyValueRef = s(true);
      const tooLateTimeoutRef = s(null);
      const onTransitionEnd = A$1(e => {
        if (e.target === element && tooEarlyValueRef.current == false) {
          setPhase("finalize");
        }
      }, [element]);
      h(() => {
        onTransitionUpdateRef.current = onTransitionUpdate;
      }, [onTransitionUpdate]);
      h(() => {
        phaseRef.current = phase;
      }, [phase]);
      h(() => {
        directionRef.current = direction;
      }, [direction]);
      h(() => {
        durationRef.current = duration;
      }, [duration]);
      h(() => {
        var _onTransitionUpdateRe;

        if (direction && phase) (_onTransitionUpdateRe = onTransitionUpdateRef.current) === null || _onTransitionUpdateRe === void 0 ? void 0 : _onTransitionUpdateRe.call(onTransitionUpdateRef, direction, phase);
      }, [direction, phase]); // Every time the phase changes to "transition", add our transition timeout timeouts
      // to catch any time onTransitionEnd fails to report for whatever reason to be safe

      h(() => {
        if (phase == "transition") {
          var _durationRef$current;

          const timeoutDuration = (_durationRef$current = durationRef.current) !== null && _durationRef$current !== void 0 ? _durationRef$current : 1000;
          tooEarlyTimeoutRef.current = window.setTimeout(() => {
            tooEarlyValueRef.current = false;
            tooEarlyTimeoutRef.current = null;
          }, 50);
          tooLateTimeoutRef.current = window.setTimeout(() => {
            tooEarlyValueRef.current = true;
            tooLateTimeoutRef.current = null;
            setPhase("finalize");
          }, timeoutDuration);
        }

        return () => {
          if (tooEarlyTimeoutRef.current) clearTimeout(tooEarlyTimeoutRef.current);
          if (tooLateTimeoutRef.current) clearTimeout(tooLateTimeoutRef.current);
        };
      }, [phase]); // Any time "open" changes, update our direction and phase.
      // In addition, measure the size of the element if requested.

      h(() => {
        if (element && open != null) {
          const previousPhase = phaseRef.current; // Swap our direction

          if (open) setDirection("enter");else setDirection("exit");
          setPhase(previousPhase === null ? "finalize" : "init");

          if (measure) {
            let currentSizeWithTransition = element.getBoundingClientRect();
            {
              const {
                x,
                y,
                width,
                height
              } = currentSizeWithTransition;
              setTransitioningX(x + "px");
              setTransitioningY(y + "px");
              setTransitioningWidth(width + "px");
              setTransitioningHeight(height + "px");
            }

            if (previousPhase === "finalize") {
              // We're going to be messing with the actual element's class, 
              // so we'll want an easy way to restore it later.
              const backup = element.className;
              element.classList.add(`${classBase}-measure`);
              element.classList.remove(`${classBase}-enter`, `${classBase}-enter-init`, `${classBase}-enter-transition`, `${classBase}-enter-finalize`, `${classBase}-exit`, `${classBase}-exit-init`, `${classBase}-exit-transition`, `${classBase}-exit-finalize`);
              forceReflow(element);
              const sizeWithoutTransition = element.getBoundingClientRect();
              const {
                x,
                y,
                width,
                height
              } = sizeWithoutTransition;
              setSurfaceX(x + "px");
              setSurfaceY(y + "px");
              setSurfaceWidth(width + "px");
              setSurfaceHeight(height + "px");
              element.className = backup;
              forceReflow(element);
            }
          }
        }
      }, [open, element, measure, classBase]); // Any time the phase changes to init, immediately before the screen is painted,
      // change the phase to "transition" and re-render ().

      h(() => {
        if (element && directionRef.current != null) {
          var _classBase2;

          (_classBase2 = classBase) !== null && _classBase2 !== void 0 ? _classBase2 : classBase = "transition";

          if (phase === "init") {
            // Preact just finished rendering init
            // Now set our transition style.
            setPhase("transition");

            if (measure) {
              forceReflow(element);
            }
          }
        }
      }, [phase, measure, element]);
      const inlineDirection = logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.inlineDirection;
      const blockDirection = logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.blockDirection;
      const writingModeIsHorizontal = inlineDirection == "rtl" || inlineDirection == "ltr";
      const surfaceInlineInset = writingModeIsHorizontal ? surfaceX : surfaceY;
      const surfaceBlockInset = writingModeIsHorizontal ? surfaceY : surfaceX;
      const surfaceInlineSize = writingModeIsHorizontal ? surfaceWidth : surfaceHeight;
      const surfaceBlockSize = writingModeIsHorizontal ? surfaceHeight : surfaceWidth;
      const transitioningInlineInset = writingModeIsHorizontal ? transitioningX : transitioningY;
      const transitioningBlockInset = writingModeIsHorizontal ? transitioningY : transitioningX;
      const transitioningInlineSize = writingModeIsHorizontal ? transitioningWidth : transitioningHeight;
      const transitioningBlockSize = writingModeIsHorizontal ? transitioningHeight : transitioningWidth;
      let almostDone = useRefElementProps({
        ref,
        style: removeEmpty({
          [`--${classBase}-duration`]: duration,
          [`--${classBase}-surface-x`]: surfaceX,
          [`--${classBase}-surface-y`]: surfaceY,
          [`--${classBase}-surface-width`]: surfaceWidth,
          [`--${classBase}-surface-height`]: surfaceHeight,
          [`--${classBase}-surface-inline-inset`]: surfaceInlineInset,
          [`--${classBase}-surface-block-inset`]: surfaceBlockInset,
          [`--${classBase}-surface-inline-size`]: surfaceInlineSize,
          [`--${classBase}-surface-block-size`]: surfaceBlockSize,
          [`--${classBase}-transitioning-x`]: transitioningX,
          [`--${classBase}-transitioning-y`]: transitioningY,
          [`--${classBase}-transitioning-width`]: transitioningWidth,
          [`--${classBase}-transitioning-height`]: transitioningHeight,
          [`--${classBase}-transitioning-inline-inset`]: transitioningInlineInset,
          [`--${classBase}-transitioning-block-inset`]: transitioningBlockInset,
          [`--${classBase}-transitioning-inline-size`]: transitioningInlineSize,
          [`--${classBase}-transitioning-block-size`]: transitioningBlockSize
        }),
        onTransitionEnd,
        ...{
          "aria-hidden": open ? undefined : "true"
        },
        className: clsx(direction && getClassName(classBase, direction), direction && phase && getClassName(classBase, direction, phase), exitVisibility == "removed" && `${classBase}-removed-on-exit`, exitVisibility == "visible" && `${classBase}-visible-on-exit`, `${classBase}-inline-direction-${inlineDirection !== null && inlineDirection !== void 0 ? inlineDirection : "ltr"}`, `${classBase}-block-direction-${blockDirection !== null && blockDirection !== void 0 ? blockDirection : "ttb"}`)
      });
      return useMergedProps()(almostDone, otherProps);
    }

    function removeEmpty(obj) {
      return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
    }
    /**
     * A component that *wraps an HTMLElement or other ref-forwarding component* and allows it to use CSS to transition in/out.
     * Combines the props passed to it, the props its child has, and the props needed for the CSS transition, and passes them
     * all to the child element you provide.
     *
     * This is the most general component that others use as a base. By default, this component by itself doesn't actually add any CSS classes that animate anything (like opacity, for example).
     * It adds classes like `transition-enter-finalize`, but you need to provide the additional e.g. `fade` class that reacts to it.
     *
     * Use this if the other, more specialized Transition components don't fit your needs.
     *
     * @example `<Transitionable open={open} {...useCreateFadeProps(...)}><div>{children}</div></Transitionable>`
     * @example `<Transitionable open={open}><div {...useCreateFadeProps(...)}>{children}</div></Transitionable>`
     */


    const Transitionable = forwardElementRef$1(function Transition({
      children: child,
      duration,
      classBase,
      measure,
      exitVisibility,
      open,
      onTransitionUpdate,
      animateOnMount,
      ...props
    }, r) {
      if (!childIsVNode(child)) {
        throw new Error("A Transitionable component must have exactly one component child (e.g. a <div>, but not \"a string\").");
      }

      const transitionProps = useCreateTransitionableProps({
        classBase,
        duration,
        measure,
        open,
        animateOnMount,
        onTransitionUpdate,
        ref: r,
        exitVisibility
      }, props);
      const mergedWithChildren = useMergedProps()(transitionProps, { ...child.props,
        ref: child.ref
      });
      return B(child, mergedWithChildren);
    });

    function childIsVNode(child) {
      if (!child) return false;

      if (Array.isArray(child)) {
        return false;
      }

      if (typeof child != "object") return false;
      return "props" in child;
    }

    /**
     * Creates a set of props that implement a Clip transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
     * Be sure to merge these returned props with whatever the user passed in.
     */

    function useCreateClipProps({
      classBase,
      clipOrigin,
      clipOriginInline,
      clipOriginBlock,
      clipMin,
      clipMinInline,
      clipMinBlock
    }, otherProps) {
      var _classBase, _ref, _ref2, _ref3, _ref4;

      (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
      return useMergedProps()({
        className: clsx(`${classBase}-clip`),
        classBase,
        style: {
          [`--${classBase}-clip-origin-inline`]: (_ref = clipOriginInline !== null && clipOriginInline !== void 0 ? clipOriginInline : clipOrigin) !== null && _ref !== void 0 ? _ref : 0.5,
          [`--${classBase}-clip-origin-block`]: (_ref2 = clipOriginBlock !== null && clipOriginBlock !== void 0 ? clipOriginBlock : clipOrigin) !== null && _ref2 !== void 0 ? _ref2 : 0,
          [`--${classBase}-clip-min-inline`]: (_ref3 = clipMinInline !== null && clipMinInline !== void 0 ? clipMinInline : clipMin) !== null && _ref3 !== void 0 ? _ref3 : 1,
          [`--${classBase}-clip-min-block`]: (_ref4 = clipMinBlock !== null && clipMinBlock !== void 0 ? clipMinBlock : clipMin) !== null && _ref4 !== void 0 ? _ref4 : 0
        }
      }, otherProps);
    }
    const Clip = forwardElementRef$1(function Clip({
      classBase,
      clipOrigin,
      clipOriginInline,
      clipOriginBlock,
      clipMin,
      clipMinInline,
      clipMinBlock,
      open,
      ...rest
    }, ref) {
      return v$1(Transitionable, {
        open: open,
        ...useCreateClipProps({
          classBase,
          clipOrigin,
          clipOriginInline,
          clipOriginBlock,
          clipMin,
          clipMinInline,
          clipMinBlock
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Creates a set of props that implement a Fade transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
     * Be sure to merge these returned props with whatever the user passed in.
     */

    function useCreateFadeProps({
      classBase,
      fadeMin,
      fadeMax
    }, otherProps) {
      var _classBase;

      (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
      return useMergedProps()({
        className: `${classBase}-fade`,
        classBase,
        style: {
          [`--${classBase}-fade-min`]: fadeMin !== null && fadeMin !== void 0 ? fadeMin : 0,
          [`--${classBase}-fade-max`]: fadeMax !== null && fadeMax !== void 0 ? fadeMax : 1
        }
      }, otherProps);
    }
    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with a Fade effect.
     *
     * Note that while it is absolutely possible to wrap another transition with `<Fade>`,
     * there will be some duplicate code run as two `<Transitionable>` components end up operating on the same element.
     * It's generally recommended to either use the components that include a combined fade effect,
     * or just directly a `<Transitionable>` on your own.
     *
     * @see `Transitionable`
     */

    const Fade = forwardElementRef$1(function Fade({
      classBase,
      fadeMin,
      fadeMax,
      open,
      ...rest
    }, ref) {
      return v$1(Transitionable, {
        open: open,
        ...useCreateFadeProps({
          classBase,
          fadeMin,
          fadeMax
        }, { ...rest,
          ref
        })
      });
    });

    const ClipFade = forwardElementRef$1(function ClipFade({
      classBase,
      fadeMin,
      fadeMax,
      open,
      ...rest
    }, ref) {
      return v$1(Clip, {
        open: open,
        ...useCreateFadeProps({
          classBase,
          fadeMin,
          fadeMax
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Creates a set of props that implement a Zoom transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
     * Be sure to merge these returned props with whatever the user passed in.
     *
     * IMPORTANT: If used outside of a `<Collapse />`, you must include the `measure` prop on the `<Transitionable>` that you use.
     *
     * @example <Transitionable measure {...useCreateCollapseProps(...)} />
     */

    function useCreateCollapseProps({
      classBase,
      minBlockSize
    }, otherProps) {
      var _classBase;

      (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
      return useMergedProps()({
        classBase,
        measure: true,
        className: `${classBase}-collapse`,
        style: {
          [`--${classBase}-collapse-min-block`]: minBlockSize !== null && minBlockSize !== void 0 ? minBlockSize : 0
        }
      }, otherProps);
    }
    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with a Collapse effect.
     *
     * *Important*: This component is *not* efficient for the browser to animate!
     * Make sure you do testing on lower power devices, or prefer a lighter
     * alternative, like `<Clip>`.
     *
     * @see `Transitionable`
     */

    const Collapse = forwardElementRef$1(function Collapse({
      classBase,
      open,
      minBlockSize,
      ...rest
    }, ref) {
      return v$1(Transitionable, {
        open: open,
        ...useCreateCollapseProps({
          classBase,
          minBlockSize
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with both Collapse and Fade effects.
     *
     * @see `Transitionable` `Collapse` `Fade`
     */

    forwardElementRef$1(function CollapseFade({
      classBase,
      fadeMin,
      fadeMax,
      open,
      ...rest
    }, ref) {
      return v$1(Collapse, {
        open: open,
        ...useCreateFadeProps({
          classBase,
          fadeMin,
          fadeMax
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Creates a set of props that implement a Slide transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
     */

    function useCreateSlideProps({
      classBase,
      slideTargetInline,
      slideTargetBlock
    }, otherProps) {
      var _classBase, _slideTargetInline, _slideTargetBlock, _slideTargetInline2, _slideTargetBlock2;

      (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
      const lastValidTargetInline = s((_slideTargetInline = slideTargetInline) !== null && _slideTargetInline !== void 0 ? _slideTargetInline : 1);
      const lastValidTargetBlock = s((_slideTargetBlock = slideTargetBlock) !== null && _slideTargetBlock !== void 0 ? _slideTargetBlock : 0);
      y(() => {
        if (slideTargetInline) lastValidTargetInline.current = slideTargetInline;
      }, [slideTargetInline]);
      y(() => {
        if (slideTargetBlock) lastValidTargetBlock.current = slideTargetBlock;
      }, [slideTargetBlock]);
      if (slideTargetInline == 0) slideTargetInline = lastValidTargetInline.current;
      if (slideTargetBlock == 0) slideTargetBlock = lastValidTargetBlock.current;
      return useMergedProps()({
        className: `${classBase}-slide`,
        classBase,
        style: {
          [`--${classBase}-slide-target-inline`]: `${(_slideTargetInline2 = slideTargetInline) !== null && _slideTargetInline2 !== void 0 ? _slideTargetInline2 : 0}`,
          [`--${classBase}-slide-target-block`]: `${(_slideTargetBlock2 = slideTargetBlock) !== null && _slideTargetBlock2 !== void 0 ? _slideTargetBlock2 : 0}`
        }
      }, otherProps);
    }
    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with a Slide effect.
     *
     * Provide the direction the element will travel in with `slideInline` and `slideBlock`,
     * with `1` being `100%` of the element's width or height.
     *
     * A value of `0` is handled specially, effectively meaning "use the last non-zero value",
     * which allows for convenient setups inside of a `SwapContainer`
     * (`slideInline={index - selectedIndex}` or similar.)
     *
     * @see `Transitionable`
     */

    const Slide = forwardElementRef$1(function Slide({
      classBase,
      slideTargetInline,
      slideTargetBlock,
      open,
      ...rest
    }, ref) {
      return v$1(Transitionable, {
        open: open,
        ...useCreateSlideProps({
          classBase,
          slideTargetInline,
          slideTargetBlock
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with both Slide and Fade effects.
     *
     * `slideInline={(index - selectedIndex) / 10}` would make the element look like it fades out before it travels to its target destination.
     *
     * @see `Transitionable` `Zoom`
     */

    const SlideFade = forwardElementRef$1(function SlideFade({
      classBase,
      fadeMin,
      fadeMax,
      open,
      ...rest
    }, ref) {
      return v$1(Slide, {
        open: open,
        ...useCreateFadeProps({
          classBase,
          fadeMin,
          fadeMax
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Creates a set of props that implement a Zoom transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
     */

    function useCreateZoomProps({
      classBase,
      zoomOrigin,
      zoomOriginInline,
      zoomOriginBlock,
      zoomMin,
      zoomMinInline,
      zoomMinBlock
    }, otherProps) {
      var _classBase, _ref, _ref2, _ref3, _ref4;

      (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
      return useMergedProps()({
        className: `${classBase}-zoom`,
        classBase,
        style: {
          [`--${classBase}-zoom-origin-inline`]: `${(_ref = zoomOriginInline !== null && zoomOriginInline !== void 0 ? zoomOriginInline : zoomOrigin) !== null && _ref !== void 0 ? _ref : 0.5}`,
          [`--${classBase}-zoom-origin-block`]: `${(_ref2 = zoomOriginBlock !== null && zoomOriginBlock !== void 0 ? zoomOriginBlock : zoomOrigin) !== null && _ref2 !== void 0 ? _ref2 : 0.5}`,
          [`--${classBase}-zoom-min-inline`]: `${(_ref3 = zoomMinInline !== null && zoomMinInline !== void 0 ? zoomMinInline : zoomMin) !== null && _ref3 !== void 0 ? _ref3 : 0}`,
          [`--${classBase}-zoom-min-block`]: `${(_ref4 = zoomMinBlock !== null && zoomMinBlock !== void 0 ? zoomMinBlock : zoomMin) !== null && _ref4 !== void 0 ? _ref4 : 0}`
        }
      }, otherProps);
    }
    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with a Zoom effect.
     * @see `Transitionable` `ZoomFade`
     */

    const Zoom = forwardElementRef$1(function Zoom({
      classBase,
      zoomOrigin,
      zoomOriginInline,
      zoomOriginBlock,
      zoomMin,
      zoomMinInline,
      zoomMinBlock,
      open,
      ...rest
    }, ref) {
      return v$1(Transitionable, {
        open: open,
        ...useCreateZoomProps({
          classBase,
          zoomOrigin,
          zoomOriginInline,
          zoomOriginBlock,
          zoomMin,
          zoomMinInline,
          zoomMinBlock
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with both Zoom and Fade effects.
     *
     * This is an ideal time to use the minimum size Zoom properties.
     *
     * @see `Transitionable` `Zoom`
     */

    const ZoomFade = forwardElementRef$1(function ZoomFade({
      classBase,
      fadeMin,
      fadeMax,
      open,
      ...rest
    }, ref) {
      return v$1(Zoom, {
        open: open,
        ...useCreateFadeProps({
          classBase,
          fadeMin,
          fadeMax
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with both Slide and Zoom effects.
     *
     * Probably best combined with `useCreateFadeProps` (or just using a `SlideZoomFade`?).
     *
     * @see `Transitionable` `SlideFadeZoom` `Zoom` `Fade`
     */

    const SlideZoom = forwardElementRef$1(function SlideZoom({
      classBase,
      zoomMin,
      zoomMinInline,
      zoomMinBlock,
      zoomOrigin,
      zoomOriginInline,
      zoomOriginBlock,
      open,
      ...rest
    }, ref) {
      return v$1(Slide, {
        open: open,
        ...useCreateZoomProps({
          classBase,
          zoomMin,
          zoomMinInline,
          zoomMinBlock,
          zoomOrigin,
          zoomOriginInline,
          zoomOriginBlock
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with Zoom, Slide, and Fade effects.
     *
     * Note that this is basically just shorthand for some prop creation and prop merging functions.
     *
     * @see `Transitionable` `Slide` `Zoom` `Fade`
     */

    forwardElementRef$1(function SlideZoomFade({
      classBase,
      fadeMin,
      fadeMax,
      open,
      ...rest
    }, ref) {
      return v$1(SlideZoom, {
        open: open,
        ...useCreateFadeProps({
          classBase,
          fadeMin,
          fadeMax
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Creates a set of props that implement a Flip transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
     */

    function useCreateFlipProps({
      classBase,
      flipAngleInline,
      flipAngleBlock,
      perspective
    }, otherProps) {
      var _classBase, _flipAngleInline, _flipAngleBlock, _flipAngleInline2, _flipAngleBlock2;

      (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
      const lastValidTargetInline = s((_flipAngleInline = flipAngleInline) !== null && _flipAngleInline !== void 0 ? _flipAngleInline : 180);
      const lastValidTargetBlock = s((_flipAngleBlock = flipAngleBlock) !== null && _flipAngleBlock !== void 0 ? _flipAngleBlock : 0);
      y(() => {
        if (flipAngleInline) lastValidTargetInline.current = flipAngleInline;
      }, [flipAngleInline]);
      y(() => {
        if (flipAngleBlock) lastValidTargetBlock.current = flipAngleBlock;
      }, [flipAngleBlock]);
      if (flipAngleInline == 0) flipAngleInline = lastValidTargetInline.current;
      if (flipAngleBlock == 0) flipAngleBlock = lastValidTargetBlock.current;
      return useMergedProps()({
        className: `${classBase}-flip`,
        classBase,
        style: {
          [`--${classBase}-flip-angle-inline`]: `${(_flipAngleInline2 = flipAngleInline) !== null && _flipAngleInline2 !== void 0 ? _flipAngleInline2 : 0}deg`,
          [`--${classBase}-flip-angle-block`]: `${(_flipAngleBlock2 = flipAngleBlock) !== null && _flipAngleBlock2 !== void 0 ? _flipAngleBlock2 : 0}deg`,
          [`--${classBase}-perspective`]: `${perspective !== null && perspective !== void 0 ? perspective : 800}px`
        }
      }, otherProps);
    }
    /**
     * Wraps a div (etc.) and allows it to transition in/out smoothly with a Flip effect.
     *
     * Provide the direction the element will travel in with `flipInline` and `flipBlock`,
     * with `1` being `100%` of the element's width or height.
     *
     * A value of `0` is handled specially, effectively meaning "use the last non-zero value",
     * which allows for convenient setups inside of a `SwapContainer`
     * (`flipInline={index - selectedIndex}` or similar.)
     *
     * @see `Transitionable`
     */

    const Flip = forwardElementRef$1(function Flip({
      classBase,
      flipAngleInline,
      flipAngleBlock,
      perspective,
      open,
      ...rest
    }, ref) {
      return v$1(Transitionable, {
        open: open,
        ...useCreateFlipProps({
          classBase,
          flipAngleInline,
          flipAngleBlock,
          perspective
        }, { ...rest,
          ref
        })
      });
    });

    /**
     * Creates a set of props that implement a swap container.
     * Be sure to merge these returned props with whatever the user passed in.
     */

    function useCreateSwappableProps({
      inline,
      classBase
    }, otherProps) {
      return useMergedProps()({
        className: clsx(`${classBase !== null && classBase !== void 0 ? classBase : "transition"}-swap-container`, inline && `${classBase !== null && classBase !== void 0 ? classBase : "transition"}-swap-container-inline`)
      }, otherProps);
    }
    /**
     * Allows a set of child <Transitionable> components to animate in & out in-place. Very useful for, e.g., tab panels.
     *
     * You must manage each child `<Transitionable>` component's `open` prop -- this component *does not* manage any sort of state in that regard.
     *
     * Like `<Transitionable>`, *this wraps an HTMLElement (or other ref-forwarding component)*. This will be your container that holds each `<Transitionable>` (or component that uses it). Strictly speaking it could be anything, not a `<Transitionable>`, but if it doesnt't transition out then it's just going to be hanging around 100% of the time.
     *
     * Long way of saying, if you get a cryptic error with this component, make sure it has a single `<div>` child or something.
     * @param param0
     * @returns
     */

    const Swappable = forwardElementRef$1(function Swappable({
      children,
      classBase,
      inline,
      ...p
    }, ref) {
      var _inline;

      (_inline = inline) !== null && _inline !== void 0 ? _inline : inline = typeof children.type === "string" && inlineElements.has(children.type);
      const transitionProps = useCreateSwappableProps({
        classBase,
        inline
      }, { ...p,
        ref
      });
      const mergedWithChildren = useMergedProps()(transitionProps, children.props);
      return B(children, mergedWithChildren);
    }); // If "inline" isn't explicitly provided, we try to implicitly do it based on the child's tag.
    // Not perfect, but it's not supposed to be. `inline` is for perfect.

    const inlineElements = new Set(["a", "abbr", "acronym", "audio", "b", "bdi", "bdo", "big", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "label", "map", "mark", "meter", "noscript", "object", "output", "picture", "progress", "q", "ruby", "s", "samp", "script", "select", "slot", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "tt", "var", "video", "wbr"]);

    const EventDetail = Symbol("event-detail");
    function enhanceEvent(e, detail) {
      let event = e;
      event[EventDetail] = detail;
      return event;
    }

    let pulse = "vibrate" in navigator ? () => navigator.vibrate(10) : () => {};

    function excludes(tag, target, exclude) {
      if (exclude !== null && exclude !== void 0 && exclude[target]) return true;
      if (target === "space" || target === "enter") return tag == "button";
      return false;
    }
    /**
     * Easy way to "polyfill" button-like interactions onto, e.g., a div.
     *
     * Adds click, space on keyDown, and enter on keyUp, as well as haptic
     * feedback via a momentary vibration pulse when there's an onClick handler provided
     * (this can be disabled app-wide with `setButtonVibrate`).
     *
     * In addition, when the CSS `:active` pseudo-class would apply to a normal button
     * (i.e. when holding the spacebar or during mousedown), `{ "data-pseudo-active": "true" }`
     * is added to the props.  You can either let it pass through and style it through new CSS,
     * or inspect the returned props for it and add e.g. an `.active` class for existing CSS
     *
     * @param onClick
     * @param exclude Whether the polyfill should apply (can specify for specific interactions)
     */


    function useButtonLikeEventHandlers(tag, onClickSync, exclude) {
      const [active, setActive] = useState(false);
      const onKeyUp = excludes(tag, "space", exclude) ? undefined : e => {
        if (e.key == " " && onClickSync) {
          e.preventDefault();
          onClickSync(e);
          setActive(false);
        }
      };
      const onMouseDown = excludes(tag, "click", exclude) ? undefined : e => {
        if (e.button === 0) setActive(true);
      };
      const onMouseUp = excludes(tag, "click", exclude) ? undefined : e => {
        if (active) {
          if (e.button === 0) {
            setActive(false);

            if (onClickSync) {
              pulse();
              onClickSync(e);
            }
          }

          onBlur(e);
        }
      };

      const onBlur = e => {
        setActive(false);
      };

      const onMouseOut = excludes(tag, "click", exclude) ? undefined : onBlur;
      const onKeyDown = excludes(tag, "space", exclude) && excludes(tag, "enter", exclude) ? undefined : e => {
        if (e.key == " " && onClickSync && !excludes(tag, "space", exclude)) {
          // We don't actually activate it on a space keydown
          // but we do preventDefault to stop the page from scrolling.
          setActive(true);
          e.preventDefault();
        }

        if (e.key == "Enter" && onClickSync && !excludes(tag, "enter", exclude)) {
          e.preventDefault();
          onClickSync(e);
        }
      };
      return props => useMergedProps()({
        onKeyDown,
        onKeyUp,
        onBlur,
        onMouseDown,
        onMouseUp,
        onMouseOut,
        ...{
          "data-pseudo-active": active ? "true" : undefined
        }
      }, props);
    }
    function useAriaButton({
      tag,
      pressed,
      onClick
    }) {
      function useAriaButtonProps({
        "aria-pressed": ariaPressed,
        tabIndex,
        role,
        ...p
      }) {
        const props = useButtonLikeEventHandlers(tag, e => onClick === null || onClick === void 0 ? void 0 : onClick(enhanceEvent(e, {
          pressed: pressed == null ? null : !pressed
        })), undefined)(p);
        const buttonProps = {
          role,
          tabIndex,
          "aria-pressed": ariaPressed !== null && ariaPressed !== void 0 ? ariaPressed : pressed === true ? "true" : pressed === false ? "false" : undefined
        };
        const divProps = { ...buttonProps,
          tabIndex: tabIndex !== null && tabIndex !== void 0 ? tabIndex : 0,
          role: role !== null && role !== void 0 ? role : "button"
        };
        const anchorProps = { ...divProps
        };

        switch (tag) {
          case "button":
            return useMergedProps()(buttonProps, props);

          case "a":
            return useMergedProps()(anchorProps, props);

          default:
            return useMergedProps()(divProps, props);
        }
      }

      return {
        useAriaButtonProps
      };
    }

    function useAriaAccordion({
      expandedIndex,
      setExpandedIndex
    }) {
      const [lastFocusedIndex, setLastFocusedIndex, getLastFocusedIndex] = useState(0);
      const stableSetExpandedIndex = useStableCallback(setExpandedIndex !== null && setExpandedIndex !== void 0 ? setExpandedIndex : () => {});
      const {
        managedChildren: managedAccordionSections,
        useManagedChild: useManagedChildSection
      } = useChildManager();
      const {
        useLinearNavigationChild
      } = useLinearNavigation({
        managedChildren: managedAccordionSections,
        navigationDirection: "block",
        getIndex: getLastFocusedIndex,
        setIndex: setLastFocusedIndex
      }); // Any time list management changes the focused index, manually focus the child
      // TODO: Can this be cut?

      useLayoutEffect(() => {
        var _managedAccordionSect;

        if (lastFocusedIndex != null && lastFocusedIndex >= 0) (_managedAccordionSect = managedAccordionSections[lastFocusedIndex]) === null || _managedAccordionSect === void 0 ? void 0 : _managedAccordionSect.focus();
      }, [lastFocusedIndex]);
      useChildFlag(expandedIndex, managedAccordionSections.length, (i, open) => {
        var _managedAccordionSect2;

        return (_managedAccordionSect2 = managedAccordionSections[i]) === null || _managedAccordionSect2 === void 0 ? void 0 : _managedAccordionSect2.setOpenFromParent(open);
      });
      const useAriaAccordionSection = A$1(args => {
        var _ref, _args$open;

        const [openFromParent, setOpenFromParent, getOpenFromParent] = useState(null);
        const {
          randomId: bodyRandomId,
          useRandomIdProps: useBodyRandomIdProps,
          useReferencedIdProps: useReferencedBodyIdProps
        } = useRandomId({
          prefix: "aria-accordion-section-body-"
        });
        const {
          randomId: headRandomId,
          useRandomIdProps: useHeadRandomIdProps,
          useReferencedIdProps: useReferencedHeadIdProps
        } = useRandomId({
          prefix: "aria-accordion-section-header-"
        });
        let open = (_ref = (_args$open = args.open) !== null && _args$open !== void 0 ? _args$open : openFromParent) !== null && _ref !== void 0 ? _ref : null; // TODO: Convert to use useManagedChild so that this hook 
        // is stable without (directly) depending on the open state.

        const useAriaAccordionSectionHeader = A$1(function useAriaAccordionSectionHeader({
          tag
        }) {
          const {
            useRefElementProps,
            element
          } = useRefElement();
          const focus = A$1(() => {
            element === null || element === void 0 ? void 0 : element.focus();
          }, [element]);
          const {
            useManagedChildProps
          } = useManagedChildSection({
            index: args.index,
            open: open,
            setOpenFromParent,
            focus
          });
          const {
            useLinearNavigationChildProps
          } = useLinearNavigationChild();

          function useAriaAccordionSectionHeaderProps({
            ["aria-expanded"]: ariaExpanded,
            ["aria-disabled"]: ariaDisabled,
            ...props
          }) {
            const onFocus = () => {
              setLastFocusedIndex(args.index);
            };

            let onClick = () => {
              if (getOpenFromParent()) stableSetExpandedIndex(null);else stableSetExpandedIndex(args.index);
            };

            let retB = useMergedProps()({
              tabIndex: 0
            }, useButtonLikeEventHandlers(tag, onClick, undefined)(props));
            let ret3 = useMergedProps()(useHeadRandomIdProps(useReferencedBodyIdProps("aria-controls")({
              "aria-expanded": ariaExpanded !== null && ariaExpanded !== void 0 ? ariaExpanded : (!!open).toString(),
              "aria-disabled": ariaDisabled !== null && ariaDisabled !== void 0 ? ariaDisabled : open ? "true" : undefined,
              ...useRefElementProps(useManagedChildProps(retB))
            })), {
              onFocus
            });
            return useLinearNavigationChildProps(ret3);
          }
          return {
            useAriaAccordionSectionHeaderProps
          };
        }, [open]);
        const useAriaAccordionSectionBody = A$1(function useAriaAccordionSectionBody() {
          function useAriaAccordionSectionBodyProps({
            role,
            ...props
          }) {
            let ret1 = useReferencedHeadIdProps("aria-labelledby")({
              role: role !== null && role !== void 0 ? role : "region",
              ...props
            });
            let ret2 = useBodyRandomIdProps(ret1);
            return ret2;
          }
          return {
            useAriaAccordionSectionBodyProps
          };
        }, []);
        return {
          expanded: open,
          useAriaAccordionSectionHeader,
          useAriaAccordionSectionBody
        };
      }, [useLinearNavigationChild]);
      return {
        useAriaAccordionSection
      };
    }

    /**
     * Adds an ID and "aria-labelledby" for two elements, an "input" element and a "label" element.
     *
     * Returns the `useReferencedIdProps` hooks if you need to also add other ID-referencing attributes, like `for`
     *
     * @see useInputLabel
     */

    function useGenericLabel({
      labelPrefix,
      inputPrefix,
      backupText
    } = {
      labelPrefix: "label-",
      inputPrefix: "input-"
    }) {
      const {
        element: labelElement,
        getElement: getLabelElement,
        useRefElementProps: useLabelRefElementProps
      } = useRefElement();
      const {
        element: inputElement,
        getElement: getInputElement,
        useRefElementProps: useInputRefElementProps
      } = useRefElement();
      const {
        useRandomIdProps: useLabelRandomIdProps,
        id: labelId,
        randomId: labelRandomId,
        useReferencedIdProps: useReferencedLabelIdProps
      } = useRandomId({
        prefix: labelPrefix
      });
      const {
        useRandomIdProps: useInputRandomIdProps,
        id: inputId,
        randomId: inputRandomId,
        useReferencedIdProps: useReferencedInputIdProps
      } = useRandomId({
        prefix: inputPrefix
      });
      const labelHasMounted = !!labelElement;
      const useGenericLabelLabel = A$1(function useGenericLabelLabel() {
        return {
          useGenericLabelLabelProps: props => {
            return useLabelRandomIdProps(useLabelRefElementProps(props));
          }
        };
      }, []);
      const useGenericLabelInput = A$1(function useGenericLabelInput() {
        return {
          useGenericLabelInputProps: ({
            "aria-labelledby": ariaLabelledby,
            "aria-label": ariaLabel,
            ...props
          }) => {
            var _ref;

            return useInputRandomIdProps(useReferencedLabelIdProps("aria-labelledby")(useInputRefElementProps(useMergedProps()({
              "aria-label": (_ref = !labelHasMounted ? backupText : ariaLabel) !== null && _ref !== void 0 ? _ref : ariaLabel
            }, props))));
          }
        };
      }, [labelHasMounted]);
      return {
        useGenericLabelInput,
        useGenericLabelLabel,
        useReferencedLabelIdProps,
        useReferencedInputIdProps,
        labelId,
        inputId,
        labelElement,
        inputElement,
        getLabelElement,
        getInputElement
      };
    }
    /**
     * Handles the attributes `id`, `for`, and `aria-labelledby` for to related elements.
     *
     * It's assumed that the label is an `HTMLLabelElement`, and the input is something for which
     * the `for` attribute can reference.
     *
     */

    function useInputLabel({
      labelPrefix,
      inputPrefix
    } = {
      labelPrefix: "label-",
      inputPrefix: "input-"
    }) {
      const {
        useGenericLabelInput,
        useGenericLabelLabel,
        useReferencedInputIdProps,
        useReferencedLabelIdProps,
        inputId,
        labelId,
        inputElement,
        getInputElement,
        labelElement,
        getLabelElement
      } = useGenericLabel({
        labelPrefix,
        inputPrefix
      });
      const useInputLabelLabel = A$1(function useInputLabelLabel({
        tag
      }) {
        const {
          useGenericLabelLabelProps
        } = useGenericLabelLabel();
        return {
          useInputLabelLabelProps(props) {
            const withFor = useReferencedInputIdProps("for")(props);
            const withoutFor = props;
            return useGenericLabelLabelProps(tag == "label" ? withFor : withoutFor);
          }

        };
      }, [useGenericLabelInput]);
      const useInputLabelInput = A$1(function useInputLabelInput() {
        const {
          useGenericLabelInputProps
        } = useGenericLabelInput();
        return {
          useInputLabelInputProps(props) {
            return useGenericLabelInputProps(props);
          }

        };
      }, [useGenericLabelLabel]);
      return {
        useInputLabelLabel,
        useInputLabelInput,
        labelId,
        inputId,
        inputElement,
        labelElement,
        getInputElement,
        getLabelElement
      };
    }

    const handlesInput = (tag, labelPosition, which) => {
      if (labelPosition === "separate") {
        if (which === "input-element") return true;else if (which === "label-element") return tag != "input";
      } else if (labelPosition === "wrapping") {
        if (which === "input-element") return false;
        if (which == "label-element") return true;
      }
    };
    /**
     * Handles label type (wrapping or separate) for checkboxes, radios, switches, etc.
     * @param param0
     * @returns
     */


    function useCheckboxLike({
      checked,
      disabled,
      labelPosition,
      onInput,
      role
    }) {
      const stableOnInput = useStableCallback(e => {
        e.preventDefault();
        onInput === null || onInput === void 0 ? void 0 : onInput(e);
      });
      const {
        inputId,
        labelId,
        useInputLabelInput: useILInput,
        useInputLabelLabel: useILLabel,
        getLabelElement,
        getInputElement
      } = useInputLabel({
        labelPrefix: "aria-checkbox-label-",
        inputPrefix: "aria-checkbox-input-"
      });
      const useCheckboxLikeInputElement = A$1(function useCheckboxInputElement({
        tag
      }) {
        const {
          useInputLabelInputProps: useILInputProps
        } = useILInput();
        const {
          element,
          useRefElementProps
        } = useRefElement(); // onClick and onChange are a bit messy, so we need to
        // *always* make sure that the visible state is correct
        // after all the event dust settles.
        // See https://github.com/preactjs/preact/issues/2745,
        // and https://github.com/preactjs/preact/issues/1899#issuecomment-525690194

        y(() => {
          if (element && tag == "input") {
            element.checked = checked;
          }
        }, [tag, element, checked]);
        return {
          inputElement: element,
          useCheckboxLikeInputElementProps
        };

        function useCheckboxLikeInputElementProps({ ...p0
        }) {
          // For some reason, Chrome won't fire onInput events for radio buttons that are tabIndex=-1??
          // Needs investigating, but onInput works fine in Firefox
          // TODO
          let props = useButtonLikeEventHandlers(tag, disabled || !handlesInput(tag, labelPosition, "input-element") ? undefined : stableOnInput, undefined)({});
          if (tag == "input") props.onInput = e => e.preventDefault();
          props = useRefElementProps(useILInputProps(props));

          if (labelPosition == "wrapping") {
            // Because the wrapped label handles all interactions,
            // we need to make sure this element can't be interacted with
            // even if it's an input element.
            props.inert = true;
            props.tabIndex = -1;

            props.onFocus = e => getLabelElement().focus();
          } else {
            if (tag === "input") {
              props.checked = checked;
            } else {
              props.role = role;
              props.tabIndex = 0;
              props["aria-checked"] = checked ? "true" : undefined;
            }

            props["aria-disabled"] = disabled.toString();
          } // Make sure that label clicks can't affect the checkbox while it's disabled


          props.onClick = disabled ? e => {
            e.preventDefault();
          } : props.onClick;
          return useMergedProps()(p0, props);
        }
      }, [useILInput, role, labelPosition, disabled, checked]);
      const useCheckboxLikeLabelElement = A$1(function useCheckboxLabelElement({
        tag
      }) {
        const {
          useInputLabelLabelProps: useILLabelProps
        } = useILLabel({
          tag
        });

        function useCheckboxLikeLabelElementProps({ ...p0
        }) {
          let newProps = useButtonLikeEventHandlers("div", disabled || !handlesInput(tag, labelPosition, "label-element") ? undefined : stableOnInput, undefined)({});

          if (labelPosition == "wrapping") {
            newProps.tabIndex = 0;
            newProps.role = role;
            newProps["aria-disabled"] = disabled.toString();
            newProps["aria-checked"] = checked.toString();
          } // Just make sure that label clicks can't affect the checkbox while it's disabled


          newProps.onClick = disabled ? e => {
            e.preventDefault();
          } : newProps.onClick;
          return useMergedProps()(newProps, useILLabelProps(p0));
        }

        return {
          useCheckboxLikeLabelElementProps
        };
      }, [useILLabel, disabled, checked, role, labelPosition]);
      return {
        useCheckboxLikeInputElement,
        useCheckboxLikeLabelElement,
        getLabelElement,
        getInputElement
      };
    }

    function useAriaCheckbox({
      labelPosition,
      checked,
      onInput,
      disabled
    }) {
      const onInputEnhanced = e => onInput === null || onInput === void 0 ? void 0 : onInput(enhanceEvent(e, {
        checked: !checked
      }));

      const {
        getInputElement,
        getLabelElement,
        useCheckboxLikeInputElement,
        useCheckboxLikeLabelElement
      } = useCheckboxLike({
        checked: !!checked,
        labelPosition,
        role: "checkbox",
        disabled,
        onInput: onInputEnhanced
      });
      const useCheckboxInputElement = A$1(function useCheckboxInputElement({
        tag
      }) {
        const {
          inputElement,
          useCheckboxLikeInputElementProps
        } = useCheckboxLikeInputElement({
          tag
        });
        const isMixed = checked == "mixed";
        y(() => {
          if (inputElement && tag === "input") {
            inputElement.indeterminate = isMixed;
          }
        }, [inputElement, isMixed, tag]);
        return {
          useCheckboxInputElementProps
        };

        function useCheckboxInputElementProps({ ...p0
        }) {
          var _props$checked;

          let props = useCheckboxLikeInputElementProps(p0);
          (_props$checked = props.checked) !== null && _props$checked !== void 0 ? _props$checked : props.checked = !!checked;
          if (tag == "input") props.type = "checkbox";
          return props;
        }
      }, [useCheckboxLikeInputElement, checked, labelPosition, disabled]);
      const useCheckboxLabelElement = A$1(function useCheckboxLabelElement({
        tag
      }) {
        const {
          useCheckboxLikeLabelElementProps
        } = useCheckboxLikeLabelElement({
          tag
        });

        function useCheckboxLabelElementProps({ ...props
        }) {
          return useCheckboxLikeLabelElementProps(props);
        }
        return {
          useCheckboxLabelElementProps
        };
      }, [useCheckboxLikeLabelElement, disabled, labelPosition]);
      return {
        useCheckboxInputElement,
        useCheckboxLabelElement
      };
    }

    /**
     * Adds event handlers for a modal-like soft-dismiss interaction.
     *
     * That is, any clicks or taps outside of the given component,
     * or any time the Escape key is pressed within the component,
     * (with various browser oddities regarding clicks on blank or inert areas handled)
     * the component will request to close itself.
     *
     * Of course, if you don't do anything in the `onClose` function,
     * it won't be a soft dismiss anymore.
     *
     * @param param0
     * @returns
     */

    function useSoftDismiss({
      onClose
    }) {
      const {
        element,
        useRefElementProps
      } = useRefElement();

      function onBackdropClick(e) {
        // Basically, "was this event fired on the root-most element, or at least an element not contained by the modal?"
        // Either could be how the browser handles these sorts of "interacting with nothing" events.
        if (e.target == document.documentElement || !(element && e.target instanceof Element && element instanceof Element && element.contains(e.target))) {
          onClose("backdrop");
        }
      } // Since everything else is inert, we listen for captured clicks on the window
      // (we don't use onClick since that doesn't fire when clicked on empty/inert areas)
      // Note: We need a *separate* touch event on mobile Safari, because
      // it doesn't let click events bubble or be captured from traditionally non-interactive elements,
      // but touch events work as expected.


      useGlobalHandler(window, "mousedown", !open ? null : onBackdropClick, {
        capture: true
      });
      useGlobalHandler(window, "touchstart", !open ? null : onBackdropClick, {
        capture: true
      });

      const onKeyDown = e => {
        if (e.key === "Escape") {
          onClose("escape");
        }
      };

      return {
        useSoftDismissProps: props => useMergedProps()(useRefElementProps({
          onKeyDown
        }), props)
      };
    }
    /**
     * A generic modal hook, used by modal dialogs, but can also
     * be used by anything that's modal with a backdrop.
     * @param param0
     * @returns
     */

    function useAriaModal({
      open,
      onClose
    }) {
      const stableOnClose = useStableCallback(onClose);
      const [modalDescribedByBody, setModalDescribedByBody] = useState(false);
      useHideScroll(open);
      const {
        id: modalId,
        useRandomIdProps: useModalIdProps,
        useReferencedIdProps: useModalReferencingIdProps
      } = useRandomId({
        prefix: "aria-modal-"
      });
      const {
        id: bodyId,
        useRandomIdProps: useBodyIdProps,
        useReferencedIdProps: useBodyReferencingIdProps
      } = useRandomId({
        prefix: "aria-modal-body-"
      });
      const {
        id: titleId,
        useRandomIdProps: useTitleIdProps,
        useReferencedIdProps: useTitleReferencingIdProps
      } = useRandomId({
        prefix: "aria-modal-title-"
      });
      const {
        useSoftDismissProps
      } = useSoftDismiss({
        onClose: stableOnClose
      });
      const useModalBackdrop = A$1(function useModalBackdrop() {
        function useModalBackdropProps(props) {
          return useMergedProps()({
            onPointerUp: () => stableOnClose("backdrop")
          }, props);
        }

        return {
          useModalBackdropProps
        };
      }, []);

      const useModalProps = function ({
        "aria-modal": ariaModal,
        role,
        ...p0
      }) {
        const {
          useFocusTrapProps
        } = useFocusTrap({
          trapActive: open
        });
        const p1 = useTitleReferencingIdProps("aria-labelledby")(p0);
        const p2 = useModalIdProps(p1);
        const pFinal = useBodyReferencingIdProps("aria-describedby")(p2);
        return useFocusTrapProps(useMergedProps()(useSoftDismissProps({
          role: "dialog"
        }), modalDescribedByBody ? pFinal : p2));
      };

      const useModalTitle = A$1(function useModalTitle() {
        const useModalTitleProps = function (props) {
          return useTitleIdProps(props);
        };

        return {
          useModalTitleProps
        };
      }, []);
      const useModalBody = A$1(function useModalBody({
        descriptive
      }) {
        setModalDescribedByBody(descriptive);

        const useModalBodyProps = function (props) {
          return useBodyIdProps(props);
        };

        return {
          useModalBodyProps
        };
      }, []);
      return {
        useModalProps,
        useModalTitle,
        useModalBody,
        useModalBackdrop
      };
    }
    /**
     * Allows for hiding the scroll bar of the root HTML element
     * without shifting the layout of the page more than adding a fow pixels
     * of padding to the root element if necessary.
     * @param hideScroll
     */

    function useHideScroll(hideScroll) {
      const [scrollbarWidth, setScrollbarWidth, getScrollbarWidth] = useState(null);
      y(() => {
        if (hideScroll) {
          let widthWithScrollBar = document.documentElement.scrollWidth;
          document.documentElement.classList.add("document-scroll-hidden");
          document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") + 1).toString();
          let widthWithoutScrollBar = document.documentElement.scrollWidth;
          let scrollbarWidth = widthWithoutScrollBar - widthWithScrollBar; // Failsafe -- if this measuring trick does something unexpected, just ignore it

          if (scrollbarWidth > 80) scrollbarWidth = 0;
          document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
          setScrollbarWidth(scrollbarWidth);
          return () => {
            document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") - 1).toString();

            if (document.documentElement.dataset["scrollHiders"] == "0") {
              document.documentElement.removeAttribute("data-scroll-hiders");
              document.documentElement.classList.remove("document-scroll-hidden");
            }
          };
        }
      }, [hideScroll]);
      return {
        scrollbarWidth,
        getScrollbarWidth
      };
    }

    function useAriaDialog({
      open,
      onClose
    }) {
      // TODO: Differences between dialog and modal go here, presumably.
      // Non-modal dialogs need to be able to be repositioned, etc.
      const {
        useModalBackdrop,
        useModalBody,
        useModalProps,
        useModalTitle
      } = useAriaModal({
        open,
        onClose
      });
      const useDialogBackdrop = A$1(() => {
        const {
          useModalBackdropProps
        } = useModalBackdrop();
        return {
          useDialogBackdropProps: useModalBackdropProps
        };
      }, [useModalBackdrop]);
      const useDialogBody = A$1(({
        descriptive
      }) => {
        const {
          useModalBodyProps
        } = useModalBody({
          descriptive
        });
        return {
          useDialogBodyProps: useModalBodyProps
        };
      }, [useModalBackdrop]);
      const useDialogProps = useModalProps;
      const useDialogTitle = A$1(() => {
        const {
          useModalTitleProps
        } = useModalTitle();
        return {
          useDialogTitleProps: useModalTitleProps
        };
      }, [useModalTitle]);
      return {
        useDialogProps,
        useDialogTitle,
        useDialogBody,
        useDialogBackdrop
      };
    }

    function useDrawer({
      open,
      onClose
    }) {
      // TODO: Drawers are not always modal.
      const {
        useModalBackdrop,
        useModalBody,
        useModalProps,
        useModalTitle
      } = useAriaModal({
        open,
        onClose
      });
      const useDrawerBackdrop = A$1(() => {
        const {
          useModalBackdropProps
        } = useModalBackdrop();
        return {
          useDrawerBackdropProps: useModalBackdropProps
        };
      }, [useModalBackdrop]);
      const useDrawerBody = A$1(({
        descriptive
      }) => {
        const {
          useModalBodyProps
        } = useModalBody({
          descriptive
        });
        return {
          useDrawerBodyProps: useModalBodyProps
        };
      }, [useModalBackdrop]);
      const useDrawerProps = useModalProps;
      const useDrawerTitle = A$1(() => {
        const {
          useModalTitleProps
        } = useModalTitle();
        return {
          useDrawerTitleProps: useModalTitleProps
        };
      }, [useModalTitle]);
      return {
        useDrawerProps,
        useDrawerTitle,
        useDrawerBody,
        useDrawerBackdrop
      };
    }

    function useAriaListboxSingle({
      selectedIndex,
      onSelect,
      selectionMode,
      ...args
    }) {
      const {
        lastFocusedInner,
        useHasFocusProps
      } = useHasFocus();
      const {
        useGenericLabelInput,
        useGenericLabelLabel,
        useReferencedInputIdProps,
        useReferencedLabelIdProps,
        inputElement
      } = useGenericLabel({
        labelPrefix: "aria-listbox-label-",
        inputPrefix: "aria-listbox-"
      });
      const {
        useListNavigationChild,
        navigateToIndex,
        managedChildren,
        setTabbableIndex,
        tabbableIndex,
        focusCurrent,
        currentTypeahead,
        invalidTypeahead
      } = useListNavigation({ ...args,
        focusOnChange: lastFocusedInner
      });
      const {
        useGenericLabelInputProps
      } = useGenericLabelInput();
      const stableOnSelect = useStableCallback(onSelect !== null && onSelect !== void 0 ? onSelect : () => {});
      useChildFlag(selectedIndex, managedChildren.length, (i, selected) => {
        var _managedChildren$i;

        return (_managedChildren$i = managedChildren[i]) === null || _managedChildren$i === void 0 ? void 0 : _managedChildren$i.setSelected(selected);
      });
      useLayoutEffect(([]) => {
        navigateToIndex(selectedIndex);
      }, [selectedIndex, managedChildren.length]);
      const childCount = managedChildren.length;
      const {
        lastActiveElement
      } = useActiveElement();
      let anyRadiosFocused = !!(inputElement !== null && inputElement !== void 0 && inputElement.contains(lastActiveElement));
      y(() => {
        if (!anyRadiosFocused) setTabbableIndex(selectedIndex);
      }, [anyRadiosFocused, selectedIndex, setTabbableIndex]);
      const useListboxSingleItem = A$1(info => {
        const [selected, setSelected, getSelected] = useState(false);
        const {
          tabbable,
          useListNavigationSiblingProps,
          useListNavigationChildProps
        } = useListNavigationChild({
          setSelected,
          ...info
        });
        const {
          element,
          useRefElementProps
        } = useRefElement();
        const index = info.index;
        y(() => {
          if (element && tabbable && selectionMode == "focus") {
            stableOnSelect === null || stableOnSelect === void 0 ? void 0 : stableOnSelect({
              target: element,
              currentTarget: element,
              [EventDetail]: {
                selectedIndex: index
              }
            });
          }
        }, [element, tabbable, selectionMode, index]);
        return {
          useListboxSingleItemProps,
          tabbable,
          selected,
          getSelected
        };

        function useListboxSingleItemProps(props) {
          const newProps = useButtonLikeEventHandlers(info.tag, e => {
            navigateToIndex(info.index);
            if (element) stableOnSelect === null || stableOnSelect === void 0 ? void 0 : stableOnSelect({
              target: element,
              currentTarget: element,
              [EventDetail]: {
                selectedIndex: index
              }
            });
            e.preventDefault();
          }, undefined)({});
          props.role = "option";
          props["aria-setsize"] = childCount.toString();
          props["aria-posinset"] = (info.index + 1).toString();
          props["aria-selected"] = selected.toString();
          return useListNavigationChildProps(useMergedProps()(newProps, useRefElementProps(props)));
        }
      }, [useListNavigationChild, selectionMode, childCount]);
      const useListboxSingleLabel = A$1(function useListboxSingleLabel() {
        function useListboxSingleLabelProps(props) {
          const {
            useGenericLabelLabelProps
          } = useGenericLabelLabel();
          useGenericLabelLabelProps(props);
        }

        return {
          useListboxSingleLabelProps
        };
      }, [useGenericLabelLabel]);
      return {
        useListboxSingleItem,
        useListboxSingleProps,
        useListboxSingleLabel,
        tabbableIndex,
        focus: focusCurrent,
        currentTypeahead,
        invalidTypeahead
      };

      function useListboxSingleProps(props) {
        props.role = "listbox";
        return useHasFocusProps(useGenericLabelInputProps(props));
      }
    }

    function useAriaMenu({
      collator,
      keyNavigation,
      noTypeahead,
      noWrap,
      typeaheadTimeout,
      ...args
    }) {
      const [focusTrapActive, setFocusTrapActive] = l(null);
      let onClose = args.onClose;
      let onOpen = args.onOpen;
      let menubar = args.menubar;
      let open = menubar ? true : args.open;
      const stableOnClose = useStableCallback(onClose !== null && onClose !== void 0 ? onClose : () => {}); // TODO: It's awkward that the button focus props are out here where we don't have its type,
      // but focus management is super sensitive, and even waiting for a useLayoutEffect to sync state here
      // would be too late, so it would look like there's a moment between menu focus lost and button focus gained
      // where nothing is focused. 

      const {
        focusedInner: menuHasFocus,
        useHasFocusProps: useMenuHasFocusProps
      } = useHasFocus();
      const {
        focusedInner: buttonHasFocus,
        useHasFocusProps: useButtonHasFocusProps
      } = useHasFocus();
      const {
        activeElement,
        lastActiveElement,
        windowFocused
      } = useActiveElement();
      const {
        managedChildren,
        useListNavigationChild,
        tabbableIndex,
        focusCurrent: focusMenu
      } = useListNavigation({
        collator,
        keyNavigation,
        noTypeahead,
        noWrap,
        typeaheadTimeout,
        focusOnChange: menuHasFocus || buttonHasFocus
      });
      const {
        useRandomIdProps: useMenuIdProps,
        useReferencedIdProps: useMenuIdReferencingProps
      } = useRandomId({
        prefix: "aria-menu-"
      });
      const [openerElement, setOpenerElement] = l(null);
      const {
        useSoftDismissProps
      } = useSoftDismiss({
        onClose: stableOnClose
      });
      y(() => {
        setFocusTrapActive(open);
      }, [open]);
      const focusMenuStable = useStableCallback(focusMenu !== null && focusMenu !== void 0 ? focusMenu : () => {});
      y(() => {
        if (focusTrapActive) {
          focusMenuStable === null || focusMenuStable === void 0 ? void 0 : focusMenuStable();
        } else if (focusTrapActive === false) {
          openerElement === null || openerElement === void 0 ? void 0 : openerElement.focus();
        } else ;
      }, [focusTrapActive]); // Focus management is really finicky, and there's always going to be 
      // an edge case where nothing's focused for two consecutive frames 
      // on iOS or whatever, which would immediately close the menu 
      // any time it's been opened. So any time it *looks* like we should close,
      // try waiting 100ms. If it's still true then, then yeah, we should close.

      let shouldClose = focusTrapActive && windowFocused && !menuHasFocus && !buttonHasFocus;
      useTimeout({
        timeout: 100,
        callback: () => {
          if (shouldClose) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
          }
        },
        triggerIndex: `${shouldClose}`
      }); // A menu sentinal is a hidden but focusable element that comes at the start or end of the element
      // that, when activated or focused over, closes the menu.
      // (if focused within 100ms of the open prop changing, instead of
      // closing the menu, focusing the sentinel immediately asks the menu to focus itself).
      // This exists because while mouse users can click out of a menu
      // and keyboard users can escape to close the menu,
      // screen readers and other input methods that don't use those two become stuck.

      const useMenuSentinel = A$1(() => {
        const [firstSentinelIsActive, setFirstSentinelIsActive] = l(false);
        useTimeout({
          callback: () => {
            setFirstSentinelIsActive(open);
          },
          timeout: 100,
          triggerIndex: `${firstSentinelIsActive}`
        });
        const onFocus = firstSentinelIsActive ? () => stableOnClose() : () => focusMenu === null || focusMenu === void 0 ? void 0 : focusMenu();

        const onClick = () => stableOnClose();

        return {
          useMenuSentinelProps: function (p) {
            return useMergedProps()({
              onFocus,
              onClick
            }, p);
          }
        };
      }, [focusMenu, open]);
      const useMenuButton = A$1(({
        tag
      }) => {
        const {
          element,
          getElement,
          useRefElementProps
        } = useRefElement();
        useLayoutEffect(() => {
          setOpenerElement(element);
        }, [element]);
        return {
          useMenuButtonProps: function (p) {
            let props = useRefElementProps(useMergedProps()({
              onClick: () => {
                return open ? onClose === null || onClose === void 0 ? void 0 : onClose() : onOpen === null || onOpen === void 0 ? void 0 : onOpen();
              }
            }, useMenuIdReferencingProps("aria-controls")(useButtonHasFocusProps(p))));
            props["aria-haspopup"] = "menu";
            props["aria-expanded"] = open ? "true" : undefined;
            return props;
          }
        };
      }, [open, onClose, onOpen, useMenuIdReferencingProps]);
      const useMenuSubmenuItem = A$1(args => {
        const {
          useMenuProps,
          useMenuButton
        } = useAriaMenu(args);
        const {
          useMenuButtonProps
        } = useMenuButton({
          tag: "li"
        });
        const {
          element,
          getElement,
          useRefElementProps
        } = useRefElement();
        useLayoutEffect(() => {
          setOpenerElement(element);
        }, [element]);
        return {
          element,
          getElement,
          useMenuProps,
          useMenuSubmenuItemProps: function ({ ...props
          }) {
            props.role = "menuitem";
            return useRefElementProps(useMenuButtonProps(useMenuIdReferencingProps("aria-controls")(props)));
          }
        };
      }, []);
      const useMenuItem = A$1(args => {
        const {
          useListNavigationChildProps
        } = useListNavigationChild(args); // const { getSyncHandler, ...asyncInfo } = useAsyncHandler<E>()({ capture: _ => void (0) });
        // const onClick = getSyncHandler(asyncInfo.pending ? null : (args.onClick ?? null));

        const onClick = args.onClick;

        function useMenuItemProps({ ...props
        }) {
          props.role = "menuitem";
          return useMergedProps()({
            onClick
          }, useListNavigationChildProps(props));
        }

        return {
          useMenuItemProps
        };
      }, []);
      const useMenuItemCheckbox = A$1(args => {
        //const { getSyncHandler, ...asyncInfo } = useAsyncHandler<E>()({ capture: _ => !args.checked });
        //const onClick = getSyncHandler(asyncInfo.pending ? null : args.onChange);
        const onClick = e => args.onChange(enhanceEvent(e, {
          checked: !args.checked
        }));

        function useMenuItemProps({ ...props
        }) {
          props.role = "menuitemcheckbox";
          return useMergedProps()({
            onClick
          }, props);
        }

        return {
          useMenuItemProps
        };
      }, []);

      function useMenuProps({ ...props
      }) {
        props.role = "menu";

        function onKeyDown(e) {
          if (e.key == "Escape" && onClose) {
            onClose();
          }
        }

        return useMenuIdProps(useMenuHasFocusProps(useMergedProps()({
          onKeyDown
        }, useSoftDismissProps(props))));
      }

      return {
        useMenuProps,
        useMenuButton,
        useMenuItem,
        useMenuSentinel,
        useMenuItemCheckbox,
        useMenuSubmenuItem,
        focusMenu
      };
    }

    function useAriaTabs({
      selectionMode,
      selectedIndex,
      onSelect,
      orientation: logicalOrientation,
      ...args
    }) {
      const {
        useHasFocusProps: useTabListHasFocusProps,
        focusedInner: tabListFocused
      } = useHasFocus();
      const {
        element: listElement,
        useRefElementProps
      } = useRefElement();
      const {
        getLogicalDirection,
        convertToPhysicalOrientation
      } = useLogicalDirection(listElement);
      const physicalOrientation = convertToPhysicalOrientation(logicalOrientation);
      useRandomId({
        prefix: "aria-tab-list-"
      });
      const {
        useRandomIdProps: useTabLabelIdProps,
        useReferencedIdProps: useReferencedTabLabelId
      } = useRandomId({
        prefix: "aria-tab-label-"
      });
      const {
        managedChildren: managedTabs,
        navigateToIndex,
        useListNavigationChild,
        tabbableIndex,
        invalidTypeahead,
        currentTypeahead,
        focusCurrent
      } = useListNavigation({ ...args,
        focusOnChange: tabListFocused,
        keyNavigation: logicalOrientation
      });
      const {
        managedChildren: managedPanels,
        useManagedChild: useManagedTabPanel
      } = useChildManager();
      useStableCallback(onSelect);
      const childCount = managedTabs.length;
      useLayoutEffect(() => {
        for (let child of managedTabs) child.setSelectionMode(selectionMode);
      }, [selectionMode]);
      useChildFlag(selectedIndex, managedTabs.length, (i, selected) => {
        var _managedTabs$i;

        return (_managedTabs$i = managedTabs[i]) === null || _managedTabs$i === void 0 ? void 0 : _managedTabs$i.setSelected(selected);
      });
      useChildFlag(selectedIndex, managedPanels.length, (i, visible) => {
        var _managedPanels$i;

        return (_managedPanels$i = managedPanels[i]) === null || _managedPanels$i === void 0 ? void 0 : _managedPanels$i.setVisible(visible);
      });
      useLayoutEffect(([prevChildCount, prevSelectedIndex]) => {
        if (selectedIndex != null && selectionMode == "activate") {
          var _managedPanels$select;

          (_managedPanels$select = managedPanels[selectedIndex]) === null || _managedPanels$select === void 0 ? void 0 : _managedPanels$select.focus();
        }
      }, [childCount, selectedIndex, selectionMode]);
      const getTabListIsFocused = useStableGetter(tabListFocused);
      const useTab = A$1(function useTab(info) {
        //const [selectedTabId, setSelectedTabId, getSelectedTabId] = useState<string | undefined>(undefined);
        const [selectionModeL, setSelectionModeL] = useState(selectionMode);
        const {
          element,
          useRefElementProps
        } = useRefElement();
        const [tabPanelId, setTabPanelId] = useState(undefined);
        const {
          useRandomIdProps: useTabIdProps,
          id: tabId,
          getId: getTabId
        } = useRandomId({
          prefix: "aria-tab-"
        });
        const [selected, setSelected, getSelected] = useState(null);
        const {
          tabbable,
          useListNavigationChildProps,
          useListNavigationSiblingProps
        } = useListNavigationChild({ ...info,
          setSelected,
          tabId,
          setTabPanelId,
          setSelectionMode: setSelectionModeL
        });
        const getIndex = useStableGetter(info.index); // const { getSyncHandler, ...asyncInfo } = useAsyncHandler<Element>()({ capture: (e: unknown) => info.index });
        // const onSelect = getSyncHandler(asyncInfo.pending? null : (stableAsyncOnSelect ?? null));

        y(() => {
          if (tabbable && selectionModeL == "focus") {
            onSelect({
              target: element,
              currentTarget: element,
              [EventDetail]: {
                selectedIndex: getIndex()
              }
            });
          }
        }, [tabbable, selectionModeL, element]);
        y(() => {
          var _managedPanels$info$i;

          (_managedPanels$info$i = managedPanels[info.index]) === null || _managedPanels$info$i === void 0 ? void 0 : _managedPanels$info$i.setTabId(tabId);
        }, [tabId, info.index]);
        /*useEffect(() => {
            if (selected)
                setSelectedTabId(tabId);
        }, [selected, tabId])*/

        function useTabProps({ ...props
        }) {
          const newProps = useButtonLikeEventHandlers(info.tag, e => {
            navigateToIndex(info.index);
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(enhanceEvent(e, {
              selectedIndex: getIndex()
            }));
            e.preventDefault();
          }, undefined)(props);
          newProps.role = "tab";
          newProps["aria-selected"] = (selected !== null && selected !== void 0 ? selected : false).toString();
          newProps["aria-controls"] = tabPanelId;
          return useMergedProps()({}, useTabIdProps(useListNavigationChildProps(useRefElementProps(newProps))));
        }

        return {
          useTabProps,
          selected
        };
      }, []);
      const useTabPanel = A$1(function usePanel(info) {
        //const [selectedTabPanelId, setSelectedTabPanelId, getSelectedTabPanelId] = useState<string | undefined>(undefined);
        const [shouldFocus, setShouldFocus] = useState(false);
        const [tabId, setTabId] = useState(undefined);
        const [selected, setSelected, getSelected] = useState(null);
        const {
          useRandomIdProps: usePanelIdProps,
          useReferencedIdProps: useReferencedPanelId,
          id: tabPanelId
        } = useRandomId({
          prefix: "aria-tab-panel-"
        });
        const {
          element,
          useManagedChildProps
        } = useManagedTabPanel({ ...info,
          tabPanelId,
          setTabId,
          focus,
          setVisible: setSelected
        });

        function focus() {
          if (getTabListIsFocused()) {
            setShouldFocus(true);
          }
        }

        y(() => {
          if (shouldFocus) {
            element === null || element === void 0 ? void 0 : element.focus();
            setShouldFocus(false);
          }
        }, [element, shouldFocus]);
        y(() => {
          var _managedTabs$info$ind;

          (_managedTabs$info$ind = managedTabs[info.index]) === null || _managedTabs$info$ind === void 0 ? void 0 : _managedTabs$info$ind.setTabPanelId(tabPanelId);
        }, [tabPanelId, info.index]);

        function useTabPanelProps({ ...props
        }) {
          var _managedTabs$info$ind2, _props$tabIndex;

          props["aria-labelledby"] = (_managedTabs$info$ind2 = managedTabs[info.index]) === null || _managedTabs$info$ind2 === void 0 ? void 0 : _managedTabs$info$ind2.tabId;
          props.role = "tabpanel";
          (_props$tabIndex = props.tabIndex) !== null && _props$tabIndex !== void 0 ? _props$tabIndex : props.tabIndex = -1; // Make sure the tab panel is tabbable.

          return useMergedProps()({}, usePanelIdProps(useManagedChildProps(props)));
        }

        return {
          useTabPanelProps,
          selected
        };
      }, []);
      const useTabsList = A$1(function useTabList() {
        function useTabListProps({ ...props
        }) {
          props.role = "tablist";
          props["aria-orientation"] = physicalOrientation;
          return useReferencedTabLabelId("aria-labelledby")(useTabListHasFocusProps(useRefElementProps(props)));
        }

        return {
          useTabListProps
        };
      }, [physicalOrientation]);
      const useTabsLabel = A$1(function useTabsLabel() {
        function useTabsLabelProps({ ...props
        }) {
          return useTabLabelIdProps(props);
        }

        return {
          useTabsLabelProps
        };
      }, []);
      return {
        useTab,
        useTabPanel,
        useTabsList,
        useTabsLabel,
        tabbableIndex,
        focusTabList: focusCurrent,
        currentTypeahead,
        invalidTypeahead
      };
    }

    function useAriaRadioGroup({
      name,
      selectedValue,
      onInput
    }) {
      const {
        element,
        useRefElementProps
      } = useRefElement();
      const [selectedIndex, setSelectedIndex, getSelectedIndex] = useState(null);
      const byName = s(new Map());
      const stableOnInput = useStableCallback(onInput);
      const {
        useHasFocusProps,
        lastFocusedInner
      } = useHasFocus();
      const {
        managedChildren,
        useListNavigationChild,
        setTabbableIndex,
        tabbableIndex,
        focusCurrent,
        currentTypeahead,
        invalidTypeahead
      } = useListNavigation({
        focusOnChange: lastFocusedInner
      });
      const useRadioGroupProps = A$1(({ ...props
      }) => {
        props.role = "radiogroup";
        return useRefElementProps(useHasFocusProps(props));
      }, [useHasFocusProps, useRefElementProps]);
      useChildFlag(selectedIndex, managedChildren.length, (i, checked) => {
        var _managedChildren$i;

        return (_managedChildren$i = managedChildren[i]) === null || _managedChildren$i === void 0 ? void 0 : _managedChildren$i.setChecked(checked);
      });
      const {
        lastActiveElement
      } = useActiveElement();
      let anyRadiosFocused = !!(element !== null && element !== void 0 && element.contains(lastActiveElement));
      y(() => {
        if (!anyRadiosFocused && selectedIndex != null) setTabbableIndex(selectedIndex);
      }, [anyRadiosFocused, selectedIndex, setTabbableIndex]);
      y(() => {
        getSelectedIndex();
        let newIndex = byName.current.get(selectedValue);
        setSelectedIndex(newIndex);
      }, [selectedValue]);
      const useRadio = A$1(function useAriaRadio({
        value,
        index,
        text,
        disabled,
        labelPosition,
        ...rest
      }) {
        const [checked, setChecked] = useState(false);
        const onInput = A$1(e => {
          stableOnInput(enhanceEvent(e, {
            selectedValue: value
          }));
        }, [stableOnInput, value, index]);
        const {
          getInputElement,
          getLabelElement,
          useCheckboxLikeInputElement,
          useCheckboxLikeLabelElement
        } = useCheckboxLike({
          checked,
          disabled,
          labelPosition,
          onInput,
          role: "radio"
        }); //const {} = useCheckboxLikeInputElement({  })

        const byName2 = byName.current;
        h(() => {
          console.assert(!byName2.has(value));
          byName2.set(value, index);
          return () => {
            byName2.delete(value);
          };
        }, [value, index]);
        const {
          tabbable,
          useListNavigationChildProps,
          useListNavigationSiblingProps
        } = useListNavigationChild({
          index,
          setChecked,
          text,
          ...rest
        });

        const useRadioInput = ({
          tag
        }) => {
          const useRadioInputProps = props => {
            if (tag == "input") {
              props.name = name;
              props.checked = checked;
            } else {
              props["aria-checked"] = checked.toString();
            }

            const {
              useCheckboxLikeInputElementProps
            } = useCheckboxLikeInputElement({
              tag
            });
            return useMergedProps()(useListNavigationChildProps(useCheckboxLikeInputElementProps({})), props);
          };

          return {
            useRadioInputProps
          };
        };

        const useRadioLabel = A$1(({
          tag
        }) => {
          const useRadioLabelProps = props => {
            const {
              useCheckboxLikeLabelElementProps
            } = useCheckboxLikeLabelElement({
              tag
            });
            return useCheckboxLikeLabelElementProps(useMergedProps()({}, props));
          };

          return {
            useRadioLabelProps
          };
        }, [useCheckboxLikeLabelElement]);
        return {
          useRadioInput,
          useRadioLabel
        };
      }, [byName, useListNavigationChild]);
      return {
        useRadio,
        useRadioGroupProps,
        managedChildren,
        getIndex: A$1(value => {
          return byName.current.get(value);
        }, [byName]),
        tabbableIndex,
        focusRadio: focusCurrent,
        currentTypeahead,
        invalidTypeahead
      };
    }

    function useToasts({}) {
      // "Pointer" to whatever index toast is currently being shown.
      // E.g. it's 0 when the first toast is shown, then when dismissed, it becomes 1.
      // When the second toast is shown, it stays at 1 until dismissed, when it then becomes 2, etc.
      // Because toasts can potentially be dismissed out of order, this represents the "oldest" toast that still hasn't been dismissed,
      // even if "younger" ones have.
      const [activeToastIndex, setActiveToastIndex, getActiveToastIndex] = useState(-1);
      const [politeness, setPoliteness] = useState("polite");
      const {
        element,
        getElement,
        useRefElementProps
      } = useRefElement();
      const {
        indicesByElement,
        managedChildren,
        mountedChildren: toastQueue,
        useManagedChild,
        getMountIndex
      } = useChildManager(); // Any time a new toast mounts, update our bottommostToastIndex to point to it if necessary
      // ("necessary" just meaning if it's the first toast ever or all prior toasts have been dismissed)

      const onAnyToastMounted = A$1(index => {
        let bottom = getActiveToastIndex();

        while (bottom < toastQueue.length && (bottom < 0 || (_toastQueue$bottom = toastQueue[bottom]) !== null && _toastQueue$bottom !== void 0 && _toastQueue$bottom.dismissed)) {
          var _toastQueue$bottom;

          ++bottom;
        }

        setActiveToastIndex(bottom);
      }, [setActiveToastIndex]); // Any time a toast is dismissed, update our bottommostToastIndex to point to the next toast in the queue, if one exists.

      const onAnyToastDismissed = A$1(index => {
        var _getElement, _toastQueue$bottom3;

        let bottom = getActiveToastIndex();

        while (bottom < toastQueue.length && (bottom < 0 || bottom === index || (_toastQueue$bottom2 = toastQueue[bottom]) !== null && _toastQueue$bottom2 !== void 0 && _toastQueue$bottom2.dismissed)) {
          var _toastQueue$bottom2;

          ++bottom;
        }

        setActiveToastIndex(bottom);
        if ((_getElement = getElement()) !== null && _getElement !== void 0 && _getElement.contains(document.activeElement)) (_toastQueue$bottom3 = toastQueue[bottom]) === null || _toastQueue$bottom3 === void 0 ? void 0 : _toastQueue$bottom3.focus();
      }, [setActiveToastIndex]); // Any time the index pointing to the currently-showing toast changes,
      // update the relevant children and let them know that they're now either active or dismissed.

      useChildFlag(activeToastIndex, toastQueue.length, (i, set) => {
        var _toastQueue$i;

        if (set) console.assert(i <= getActiveToastIndex());
        (_toastQueue$i = toastQueue[i]) === null || _toastQueue$i === void 0 ? void 0 : _toastQueue$i.setStatus(set ? "active" : i < getActiveToastIndex() ? "dismissed" : "pending");
      });
      const useToast = A$1(({
        politeness,
        timeout
      }) => {
        const [status, setStatus, getStatus] = useState("pending");
        const dismissed = status === "dismissed";
        const dismiss = A$1(() => {
          setStatus("dismissed");
        }, []);
        const {
          randomId: toastId
        } = useRandomId({
          prefix: "toast-"
        }); //const [toastId, setToastId] = useState(() => generateRandomId("toast-"));

        h(() => {
          setPoliteness(politeness !== null && politeness !== void 0 ? politeness : "polite");
        }, [politeness]);
        const focus = A$1(() => {
          const element = getElement();

          if (element) {
            const firstFocusable = findFirstFocusable(element);
            firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
          }
        }, []);
        const {
          element,
          useManagedChildProps,
          getElement
        } = useManagedChild({
          dismissed,
          index: toastId,
          setStatus,
          focus
        });
        const isActive = status === "active";
        y(() => {
          onAnyToastMounted(getMountIndex(toastId));
        }, []);
        y(() => {
          if (dismissed) onAnyToastDismissed(getMountIndex(toastId));
        }, [dismissed]);
        useTimeout({
          timeout,
          callback: () => {
            if (isActive) setStatus("dismissed");
          },
          triggerIndex: isActive
        });
        return {
          status,
          getStatus,
          dismiss,
          useToastProps: function ({ ...props
          }) {
            return useMergedProps()(useManagedChildProps({}), props);
          }
        };
      }, []);

      function useToastContainerProps({
        role,
        "aria-live": ariaLive,
        "aria-relevant": ariaRelevant,
        ...props
      }) {
        var _ref;

        return useMergedProps()(useRefElementProps({
          class: "toasts-container",
          role: "status",
          "aria-live": (_ref = politeness !== null && politeness !== void 0 ? politeness : ariaLive) !== null && _ref !== void 0 ? _ref : "polite",
          "aria-relevant": ariaRelevant !== null && ariaRelevant !== void 0 ? ariaRelevant : "additions"
        }), props);
      }

      return {
        useToast,
        useToastContainerProps
      };
    }

    function forwardElementRef(component) {
      return x(component);
    }
    function usePseudoActive({
      "data-pseudo-active": active,
      ...props
    }) {
      return useMergedProps()({
        className: clsx((active == true || active == "true") && "active")
      }, props);
    }
    const SpinnerDelayContext = D$1(1000);
    function useSpinnerDelay(pending, timeout) {
      var _ref;

      const [showSpinner, setShowSpinner] = useState(false);
      y(() => {
        if (!pending) {
          setShowSpinner(false);
        }
      }, [pending]);
      const defaultDelay = F(SpinnerDelayContext);
      useTimeout({
        timeout: (_ref = timeout !== null && timeout !== void 0 ? timeout : defaultDelay) !== null && _ref !== void 0 ? _ref : 1000,
        callback: () => {
          setShowSpinner(pending);
        },
        triggerIndex: pending
      });
      return showSpinner;
    }

    const UseAriaAccordionSectionContext = D$1(null);
    const Accordion = forwardElementRef(function Accordion({
      expandedIndex,
      setExpandedIndex,
      children,
      ...props
    }, ref) {
      const {
        useAriaAccordionSection
      } = useAriaAccordion({
        expandedIndex,
        setExpandedIndex
      });
      return v$1("div", { ...useMergedProps()({
          ref,
          className: "accordian"
        }, props)
      }, v$1(UseAriaAccordionSectionContext.Provider, {
        value: useAriaAccordionSection
      }, children));
    });
    const AccordionSection = forwardElementRef(function AccordionSection({
      index,
      open,
      header,
      headerLevel,
      children,
      Transition,
      ...props
    }, ref) {
      var _Transition, _headerLevel;

      const useAriaAccordionSection = F(UseAriaAccordionSectionContext);
      const {
        expanded,
        useAriaAccordionSectionHeader,
        useAriaAccordionSectionBody
      } = useAriaAccordionSection({
        index,
        open
      });
      const {
        useAriaAccordionSectionHeaderProps
      } = useAriaAccordionSectionHeader({
        tag: "button"
      });
      const {
        useAriaAccordionSectionBodyProps
      } = useAriaAccordionSectionBody();
      (_Transition = Transition) !== null && _Transition !== void 0 ? _Transition : Transition = Collapse;
      (_headerLevel = headerLevel) !== null && _headerLevel !== void 0 ? _headerLevel : headerLevel = 2;
      const headerButtonProps = useAriaAccordionSectionHeaderProps({
        type: "button",
        class: clsx("accordion-button", !expanded ? " collapsed" : "")
      });
      const headerProps = {
        class: "accordion-header",
        children: v$1("button", { ...headerButtonProps
        }, header)
      };
      const headerJsx = headerLevel >= 1 && headerLevel <= 6 ? v$1(`h${headerLevel}`, headerProps) : v$1("div", useMergedProps()(headerProps, {
        role: "heading",
        "aria-level": `${headerLevel}`
      }));
      return v$1("div", { ...{
          ref,
          class: "accordion-item"
        }
      }, headerJsx, v$1(Transition, {
        open: expanded,
        ...useAriaAccordionSectionBodyProps(useMergedProps()(props, {
          class: ""
        }))
      }, v$1("div", null, v$1("div", {
        class: "accordion-body"
      }, children))));
    });

    // resumably because the number of elements changes. 
    // (and in really weird ways -- changing the animation speed in the console fixes it until you put it back at 100% speed???).
    // Assuming that's the case, it's easier to just take care of the element count on page load.

    let gimmickCount = 8;

    (() => {
      var _getFromLocalStorage;

      let lastSet = (_getFromLocalStorage = getFromLocalStorage()("circular-progress-gimmick-last-set", str => new Date(str))) !== null && _getFromLocalStorage !== void 0 ? _getFromLocalStorage : new Date(1970, 0, 1);
      const daysSinceLastGimmickSet = Math.floor((+new Date() - +lastSet) / 1000 / 60 / 60 / 24);

      if (daysSinceLastGimmickSet > 0) {
        let newCount = 4 + Math.round(Math.random() * 2 + Math.random() * 2);
        gimmickCount = newCount;
        storeToLocalStorage()("circular-progress-gimmick-last-set", new Date(), d => d.toISOString());
        storeToLocalStorage()("circular-progress-gimmick-count", gimmickCount, JSON.stringify);
      } else {
        var _getFromLocalStorage2;

        gimmickCount = (_getFromLocalStorage2 = getFromLocalStorage()("circular-progress-gimmick-count", JSON.parse)) !== null && _getFromLocalStorage2 !== void 0 ? _getFromLocalStorage2 : 8;
      }
    })();

    function useAriaProgressBar({
      tag,
      max,
      value,
      valueText
    }) {
      //const { inputId, labelId, useGenericLabelInput, useGenericLabelLabel, useReferencedInputIdProps, useReferencedLabelIdProps } = useGenericLabel({ inputPrefix: "progressbar-", labelPrefix: "progressbar-reference-" });
      const {
        id: progressBarId,
        getId,
        useRandomIdProps,
        useReferencedIdProps
      } = useRandomId({
        prefix: "progressbar-"
      });

      function useProgressProps({
        "aria-valuemax": ariaValueMax,
        "aria-valuenow": ariaValueNow,
        "aria-valuetext": ariaValueText,
        role,
        ...p
      }) {
        const extraProps = tag === "progress" ? {
          max,
          value: value !== null && value !== void 0 ? value : undefined,
          "aria-valuemin": "0",
          "aria-valuenow": value == null ? undefined : `${value}`
        } : {
          "aria-valuemin": "0",
          "aria-valuemax": max == null ? undefined : `${max}`,
          "aria-valuetext": valueText == null ? undefined : `${valueText}`,
          "aria-valuenow": value == null ? undefined : `${value}`,
          role: "progressbar"
        };
        return useRandomIdProps(useMergedProps()(extraProps, p));
      }

      const useReferencedElement = A$1(function useReferencedElement() {
        function useReferencedProps(props) {
          return useReferencedIdProps("aria-controls")(props);
        }

        return {
          useReferencedProps
        };
      }, [useReferencedIdProps]);
      return {
        useProgressProps,
        useReferencedElement
      };
    }
    D$1(undefined);
    D$1(undefined);
    D$1(undefined);
    D$1(undefined);

    new Date().getDate() % 2;

    function Check() {
      return v$1("i", {
        class: "bi bi-check"
      });
    }

    function Cross() {
      return v$1("i", {
        class: "bi bi-x"
      });
    }

    const ProgressCircular = forwardElementRef(function ({
      loadingLabel,
      spinnerTimeout,
      mode,
      colorFill,
      childrenPosition,
      children,
      color,
      ...p
    }, ref) {
      var _loadingLabel, _childrenPosition;

      (_loadingLabel = loadingLabel) !== null && _loadingLabel !== void 0 ? _loadingLabel : loadingLabel = "Operation pending";
      const {
        useProgressProps,
        useReferencedElement
      } = useAriaProgressBar({
        value: null,
        valueText: loadingLabel,
        max: 1,
        tag: "div"
      }); //useLayoutEffect(() => { provideParentWithHook?.(useReferencedElement) }, [useReferencedElement, provideParentWithHook])

      const {
        useReferencedProps
      } = useReferencedElement();
      const showSpinner = useSpinnerDelay(mode === "pending", spinnerTimeout); //const [spinnerShowCount, setSpinnerShowCount] = useState(0);
      //useEffect(() => { setSpinnerShowCount(s => ++s) }, [showSpinner]);

      y(() => {
        setShownStatusLongEnough(false);
      }, [mode]);
      const [shownStatusLongEnough, setShownStatusLongEnough] = useState(false);
      useTimeout({
        callback: () => {
          if (mode == "failed" || mode == "succeeded") setShownStatusLongEnough(true);
        },
        timeout: 1000,
        triggerIndex: mode
      });
      const progressProps = useProgressProps({
        "aria-hidden": `${mode != "pending"}`
      });
      const progressElement = v$1("div", { ...useMergedProps()({
          ref,
          className: clsx("circular-progress-container")
        }, useMergedProps()(progressProps, p))
      }, mode === "pending" && !!loadingLabel && v$1("div", {
        role: "alert",
        "aria-live": "assertive",
        class: "visually-hidden"
      }, loadingLabel), v$1(Swappable, null, v$1("div", {
        className: "circular-progress-swappable"
      }, v$1(Fade, {
        open: mode === "pending" && showSpinner,
        exitVisibility: "removed"
      }, v$1("div", {
        style: {
          "--count": gimmickCount
        },
        className: clsx("circular-progress", color ? `circular-progress-${color}` : undefined, colorFill == "foreground" && "inverse-fill", colorFill === "foreground-only" && "no-fill")
      }, Array.from(function* () {
        for (let i = 0; i < gimmickCount; ++i) yield v$1("div", {
          class: clsx("circular-progress-ball-origin", `circular-progress-ball-origin-${i}`)
        }, v$1("div", {
          class: "circular-progress-ball"
        }));
      }()))), v$1(Fade, {
        open: !shownStatusLongEnough && mode === "succeeded"
      }, v$1("div", {
        class: "circular-progress-succeeded"
      }, v$1(Check, null))), v$1(Fade, {
        open: !shownStatusLongEnough && mode === "failed"
      }, v$1("div", {
        class: "circular-progress-failed"
      }, v$1(Cross, null))))));
      (_childrenPosition = childrenPosition) !== null && _childrenPosition !== void 0 ? _childrenPosition : childrenPosition = "after";
      return v$1(d$1, null, childrenPosition == "before" && progressElement, children && v$1(children.type, useMergedProps()({
        children: childrenPosition === "child" ? progressElement : undefined,
        ref: children.ref
      }, useReferencedProps(children.props))), childrenPosition == "after" && progressElement);
    });

    const UseButtonGroupChild = D$1(null);
    const DefaultFillStyleContext = D$1("fill");
    const DefaultColorStyleContext = D$1("primary");
    const DefaultSizeContext = D$1("md");
    const DefaultDisabledContext = D$1(false);
    const ProvideDefaultButtonFill = g(function ProvideDefaultButtonFill({
      value,
      children
    }) {
      return v$1(DefaultFillStyleContext.Provider, {
        value: value
      }, children);
    });
    const ProvideDefaultButtonColor = g(function ProvideDefaultButtonColor({
      value,
      children
    }) {
      return v$1(DefaultColorStyleContext.Provider, {
        value: value
      }, children);
    });
    const ProvideDefaultButtonSize = g(function ProvideDefaultButtonSize({
      value,
      children
    }) {
      return v$1(DefaultSizeContext.Provider, {
        value: value
      }, children);
    });
    const ProvideDefaultButtonDisabled = g(function ProvideDefaultButtonDisabled({
      value,
      children
    }) {
      return v$1(DefaultDisabledContext.Provider, {
        value: value
      }, children);
    });
    function useButtonFillVariant(providedValue) {
      const defaultFill = F(DefaultFillStyleContext);
      return providedValue !== null && providedValue !== void 0 ? providedValue : defaultFill;
    }
    function useButtonColorVariant(providedValue) {
      const defaultColor = F(DefaultColorStyleContext);
      return providedValue !== null && providedValue !== void 0 ? providedValue : defaultColor;
    }
    function useButtonSize(providedValue) {
      const defaultSize = F(DefaultSizeContext);
      return providedValue !== null && providedValue !== void 0 ? providedValue : defaultSize;
    }
    function useButtonDisabled(providedValue) {
      const defaultDisabled = F(DefaultDisabledContext);
      return providedValue !== null && providedValue !== void 0 ? providedValue : defaultDisabled;
    }
    function useButtonStyles(p) {
      let {
        colorVariant,
        size,
        fillVariant,
        disabled
      } = p;
      colorVariant = useButtonColorVariant(colorVariant);
      size = useButtonSize(size);
      fillVariant = useButtonFillVariant(fillVariant);
      disabled = useButtonDisabled(disabled);

      const useButtonStylesProps = props => useMergedProps()({
        "aria-disabled": disabled ? "true" : undefined,
        className: clsx(disabled && "disabled", "btn", `btn-${fillVariant == "outline" ? `outline-` : ``}${colorVariant}`, `btn-${size}`, disabled && "disabled")
      }, props);

      return {
        colorVariant,
        size,
        fillVariant,
        disabled,
        useButtonStylesProps
      };
    }

    function ButtonR(p, ref) {
      var _p$tag;

      if (((_p$tag = p.tag) === null || _p$tag === void 0 ? void 0 : _p$tag.toLowerCase()) === "a" || !!p.href) return v$1(AnchorButton, {
        ref: ref,
        ...p
      });else if (p.pressed != null) return v$1(ToggleButton, {
        ref: ref,
        ...p
      });else return v$1(ButtonButton, {
        ref: ref,
        ...p
      });
    }

    const AnchorButton = forwardElementRef(function AnchorButton(p, ref) {
      let {
        colorVariant,
        size,
        fillVariant,
        disabled,
        ...props
      } = p;
      const buttonStyleInfo = useButtonStyles({
        colorVariant,
        size,
        fillVariant,
        disabled
      });
      disabled = buttonStyleInfo.disabled;
      colorVariant = buttonStyleInfo.colorVariant;
      size = buttonStyleInfo.size;
      fillVariant = buttonStyleInfo.fillVariant;
      const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
      return v$1("a", { ...useButtonStylesProps({ ...props,
          ref
        })
      });
    });
    const ButtonButton = forwardElementRef(function ButtonButton(p, ref) {
      let {
        colorVariant,
        size,
        fillVariant,
        disabled,
        debounce,
        showAsyncSuccess,
        onClick: onClickAsync,
        ...props
      } = p;
      const {
        getSyncHandler,
        pending,
        settleCount,
        hasError
      } = useAsyncHandler()({
        debounce,
        capture: A$1(() => {
          return undefined;
        }, [])
      });
      disabled || (disabled = pending);
      const {
        useAriaButtonProps
      } = useAriaButton({
        tag: "button"
      });
      const buttonStyleInfo = useButtonStyles({
        colorVariant,
        size,
        fillVariant,
        disabled
      });
      disabled = buttonStyleInfo.disabled;
      colorVariant = buttonStyleInfo.colorVariant;
      size = buttonStyleInfo.size;
      fillVariant = buttonStyleInfo.fillVariant;
      const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
      const onClick = getSyncHandler(pending ? null : onClickAsync);
      return v$1(ProgressCircular, {
        mode: hasError ? "failed" : pending ? "pending" : settleCount && showAsyncSuccess ? "succeeded" : null,
        childrenPosition: "child",
        colorFill: fillVariant == "fill" ? "foreground" : "background"
      }, v$1("button", { ...useAriaButtonProps(useButtonStylesProps(useMergedProps()({
          className: clsx(pending && "pending active", disabled && "disabled")
        }, { ...props,
          onClick,
          ref
        })))
      }));
    });
    const ToggleButton = forwardElementRef(function ToggleButton(p, ref) {
      let {
        colorVariant,
        size,
        disabled,
        pressed,
        debounce,
        onInput: onPressAsync,
        showAsyncSuccess,
        ...props
      } = p;
      const fillVariant = pressed ? "fill" : "outline";
      const inButtonGroup = !!F(UseButtonGroupChild);
      const getPressed = useStableGetter(pressed);
      const {
        getSyncHandler,
        pending,
        hasError,
        settleCount,
        hasCapture,
        currentCapture
      } = useAsyncHandler()({
        debounce,
        capture: A$1(() => {
          return !getPressed();
        }, [])
      });
      disabled || (disabled = pending);
      if (hasCapture && pending) pressed = currentCapture;
      const {
        useAriaButtonProps
      } = useAriaButton({
        tag: "button",
        pressed
      });
      const buttonStyleInfo = useButtonStyles({
        colorVariant,
        size,
        fillVariant,
        disabled
      });
      disabled = buttonStyleInfo.disabled;
      colorVariant = buttonStyleInfo.colorVariant;
      size = buttonStyleInfo.size;
      const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
      const onClick = getSyncHandler(pending ? null : onPressAsync);
      return v$1(ProgressCircular, {
        mode: hasError ? "failed" : pending ? "pending" : settleCount && showAsyncSuccess ? "succeeded" : null,
        childrenPosition: "child",
        colorFill: fillVariant == "fill" ? "foreground" : "background"
      }, v$1("button", { ...useAriaButtonProps(useButtonStylesProps({ ...useMergedProps()({
            className: clsx("toggle-button", (pending || inButtonGroup && pressed) && "active"),
            onClick,
            ref
          }, props)
        }))
      }));
    });
    const Button = forwardElementRef(ButtonR);

    const ButtonGroup = forwardElementRef(function ButtonGroup(p, ref) {
      const {
        lastFocusedInner,
        useHasFocusProps
      } = useHasFocus();
      const {
        indicesByElement,
        managedChildren,
        useListNavigationChild,
        navigateToIndex,
        childCount
      } = useListNavigation({
        focusOnChange: lastFocusedInner
      }); // Styling props

      let {
        colorVariant,
        fillVariant,
        size,
        disabled,
        selectedIndex,
        wrap,
        children,
        ...p3
      } = p;
      y(() => {
        if (selectedIndex != null) navigateToIndex(selectedIndex);
      }, [selectedIndex]); // Build new DOM props to merge based off the styling props

      colorVariant = useButtonColorVariant(colorVariant);
      size = useButtonSize(size);
      fillVariant = useButtonFillVariant(fillVariant);
      disabled = useButtonDisabled(disabled);
      const outerDomProps = useHasFocusProps(useMergedProps()({
        ref,
        role: "grid",
        class: "btn-group-aria-gridrow"
      }, p3));
      const innerDomProps = {
        role: "gridrow",
        disabled,
        className: clsx("btn-group", wrap && "wrap")
      }; // Remaining props, forwarded onto the DOM
      //const domProps =newDomProps, p3));

      outerDomProps["data-child-count"] = `${childCount}`;
      return v$1(UseButtonGroupChild.Provider, {
        value: useListNavigationChild
      }, v$1(ProvideDefaultButtonColor, {
        value: colorVariant
      }, v$1(ProvideDefaultButtonFill, {
        value: fillVariant
      }, v$1(ProvideDefaultButtonSize, {
        value: size
      }, v$1(ProvideDefaultButtonDisabled, {
        value: disabled
      }, v$1("div", { ...outerDomProps
      }, v$1("div", { ...innerDomProps
      }, children)))))));
    });
    const ButtonGroupChild = forwardElementRef(function ButtonGroupChild1({
      index,
      ...buttonProps
    }, ref) {
      // This is more-or-less forced to be a separate component because of the index prop.
      // It would be really nice to find a way to make that implicit based on DOM location,
      // specifically for small things like button groups...
      const useButtonGroupChild = F(UseButtonGroupChild);
      const {
        tabbable,
        useListNavigationChildProps,
        useListNavigationSiblingProps
      } = useButtonGroupChild({
        index,
        text: null
      }); // TODO: It's kinda fragile here how the sync onClick of listNavigation 
      // and the async onClick of button are mixing.

      const p = useListNavigationChildProps({
        ref,
        role: "gridcell",
        ...buttonProps
      });
      return v$1(Button, { ...p
      });
    });

    const baseId = generateRandomId("render-portal-container-");
    function BodyPortal({
      children
    }) {
      const id = s(null);
      const [portalElement, setPortalElement] = l(null);
      y(() => {
        if (id.current == null) {
          id.current = generateRandomId();
        }

        let container = document.getElementById(baseId);

        if (!container) {
          container = document.createElement("div");
          container.id = baseId;
          container.className = "body-portal-container";
          document.body.appendChild(container);
        }

        let element = document.getElementById(id.current);

        if (!element) {
          element = document.createElement("div");
          element.className = "body-portal";
          element.id = id.current;
          container.appendChild(element);
        }

        setPortalElement(element);
        return () => document.removeChild(element);
      }, []);
      if (portalElement) return W(children, portalElement);else return null;
    }

    const Dialog = forwardElementRef(function Dialog({
      onClose,
      open,
      descriptive,
      title,
      footer,
      Transition,
      children,
      ...rest
    }, ref) {
      const {
        useDialogBackdrop,
        useDialogBody,
        useDialogProps,
        useDialogTitle
      } = useAriaDialog({
        open,
        onClose
      });
      const {
        useDialogBackdropProps
      } = useDialogBackdrop();
      const {
        useDialogBodyProps
      } = useDialogBody({
        descriptive
      });
      const {
        useDialogTitleProps
      } = useDialogTitle();
      return v$1(BodyPortal, null, v$1("div", {
        class: "modal-portal-container"
      }, v$1(Fade, {
        open: open
      }, v$1("div", { ...useDialogBackdropProps({
          class: "modal-backdrop  backdrop-filter-transition"
        })
      })), v$1(Transition, { ...{
          ref,
          open,
          ...rest
        }
      }, v$1("div", { ...useDialogProps({
          class: "modal-dialog modal-dialog-scrollable"
        })
      }, v$1("div", {
        class: "modal-content "
      }, title != null && v$1("div", { ...useDialogTitleProps({
          class: "modal-header"
        })
      }, v$1("h1", {
        class: "modal-title"
      }, title)), v$1("div", { ...useDialogBodyProps({
          class: "modal-body"
        })
      }, children), footer != null && v$1("div", {
        class: "modal-footer"
      }, footer))))));
    });

    function Drawer({
      onClose,
      open,
      descriptive,
      title,
      footer,
      Transition,
      children,
      ...rest
    }) {
      const {
        useDrawerBackdrop,
        useDrawerBody,
        useDrawerProps,
        useDrawerTitle
      } = useDrawer({
        open,
        onClose
      });
      const {
        useDrawerBackdropProps
      } = useDrawerBackdrop();
      const {
        useDrawerBodyProps
      } = useDrawerBody({
        descriptive
      });
      const {
        useDrawerTitleProps
      } = useDrawerTitle();
      return v$1(BodyPortal, null, v$1("div", null, v$1(Fade, {
        open: open
      }, v$1("div", { ...useDrawerBackdropProps({
          class: "offcanvas-backdrop backdrop-filter-transition"
        })
      })), v$1(Transition, { ...{
          open,
          ...rest
        }
      }, v$1("div", { ...useDrawerProps({
          class: "offcanvas offcanvas-start",
          tabindex: -1
        })
      }, v$1("div", {
        class: "offcanvas-header"
      }, v$1("h5", { ...useDrawerTitleProps({
          class: "offcanvas-title"
        })
      }, "Drawer"), v$1(Button, {
        tag: "button",
        class: "btn-close text-reset",
        "aria-label": "Close",
        onClick: () => onClose("escape")
      })), v$1("div", { ...useDrawerBodyProps({
          class: "offcanvas-body"
        })
      }, children)))));
    }

    const InInputGroupContext = D$1(false);
    const InInputGridContext = D$1(0);

    function max$1(value, max) {
      if (max == null) return value;
      if (value > max) return max;
      return value;
    }

    function min$1(value, min) {
      if (min == null) return value;
      if (value < min) return min;
      return value;
    }
    /*
    export function useInputCaptures<T>(type: "text", min2: string, max2: string):
    export function useInputCaptures<T>(type: "text" | "number", min2: number, max2: number)
    export function useInputCaptures<T>(type: "text" | "number", min2: T, max2: T)*/


    function useInputCaptures(type, min2, max2) {
      const capture = A$1(event => {
        switch (type) {
          case "text":
            return max$1(min$1(event.currentTarget.value, min2), max2);

          case "number":
            return max$1(min$1(event.currentTarget.valueAsNumber, min2), max2);
        }
      }, [type]);
      const uncapture = A$1(value => {
        switch (type) {
          case "text":
            return value;

          case "number":
            return `${value}`;
        }
      }, [type]);
      return {
        capture,
        uncapture
      };
    }

    const InputGrid = forwardElementRef(function InputGrid({
      tag,
      children,
      ...props
    }, ref) {
      return v$1(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
        class: "input-grid",
        ref
      }, props), v$1(InInputGridContext.Provider, {
        value: F(InInputGridContext) + 1
      }, children));
    });
    /**
     * An InputGroup, that puts an Input and its Label together, visually, into one component.
     *
     * All Input-type components automatically detect when they're in an InputGroup and render different accordingly.
     */

    const InputGroup = forwardElementRef(function InputGroup({
      children,
      tag,
      ...props
    }, ref) {
      return v$1(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
        class: "input-group",
        ref
      }, props), v$1(InInputGroupContext.Provider, {
        value: true
      }, children));
    });
    /**
     * Not generally needed, since most input components come with labels that do this for you.
     *
     * That being said, if you just need a static block of text not hooked up to any input element, this is your component.
     */

    const InputGroupText = forwardElementRef(function InputGroupText({
      tag,
      children,
      disabled,
      ...props
    }, ref) {
      /*
          return (
              cloneElement(children,
                  useMergedProps<any>()({ class: "input-group", ref }, children.props),
                  <InInputGroupContext.Provider value={true}>
                      {children}
                  </InInputGroupContext.Provider>
              )
          );*/

      /*const inInputGrid = !!useContext(InInputGridContext);
      if (inInputGrid) {
          children = <div class="form-control faux-form-control">{children}</div>
      }*/
      return v$1(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
        class: clsx(disabled && "disabled", "input-group-text"),
        ref
      }, props), children);
    });

    function UnlabelledInput({
      type,
      disabled,
      value,
      onInput: onInputAsync,
      ...props
    }) {
      const {
        capture,
        uncapture
      } = useInputCaptures(type, props.min, props.max);
      const {
        focusedInner,
        useHasFocusProps
      } = useHasFocus();
      const {
        getSyncHandler,
        currentCapture,
        pending,
        hasError,
        settleCount,
        flushDebouncedPromise,
        currentType,
        ...asyncInfo
      } = useAsyncHandler()({
        capture,
        debounce: type === "text" ? 1500 : undefined
      });
      const onInput = getSyncHandler(disabled ? null : onInputAsync);
      const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
      const onBlur = flushDebouncedPromise;
      return v$1(ProgressCircular, {
        spinnerTimeout: 10,
        mode: currentType === "async" ? asyncState : null,
        childrenPosition: "after",
        color: "info"
      }, v$1("input", { ...useHasFocusProps(useMergedProps()(props, {
          "aria-disabled": disabled ? "true" : undefined,
          readOnly: disabled,
          onBlur,
          class: clsx(`form-control`, disabled && "disabled", pending && "with-end-icon"),
          type,
          value: pending || focusedInner ? currentCapture : uncapture(value),
          onInput
        }))
      }));
    }

    function Input({
      children,
      width,
      labelPosition,
      ...props
    }) {
      var _labelPosition;

      (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "start";
      const {
        inputId,
        labelId,
        useInputLabelInput,
        useInputLabelLabel
      } = useInputLabel({
        inputPrefix: "input-",
        labelPrefix: "input-label-"
      });
      const {
        useInputLabelInputProps
      } = useInputLabelInput();
      const {
        useInputLabelLabelProps
      } = useInputLabelLabel({
        tag: "label"
      });
      const isInInputGroup = F(InInputGroupContext);
      const isInInputGrid = F(InInputGridContext);
      let stringLabel = `${children}`;

      if (children != null && labelPosition === "hidden") {
        if (!["string", "number", "boolean"].includes(typeof children)) console.error(`Hidden labels require a string-based label for the aria-label attribute.`);else props["aria-label"] = stringLabel;
      }

      const labelJsx = v$1("label", { ...useInputLabelLabelProps({
          class: clsx(props.disabled && "disabled", isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "")
        })
      }, children);
      let inputJsx = v$1(UnlabelledInput, { ...useInputLabelInputProps(props)
      });

      if (isInInputGrid) {
        inputJsx = v$1("div", {
          class: "form-control faux-form-control",
          style: width !== null && width !== void 0 && width.endsWith("ch") ? {
            "--form-control-width": width !== null && width !== void 0 ? width : "20ch"
          } : width ? {
            width
          } : undefined
        }, inputJsx);
      }

      const inputWithLabel = v$1(d$1, null, labelPosition === "start" && labelJsx, inputJsx, (labelPosition === "end" || labelPosition == "floating") && labelJsx);
      if (labelPosition !== "floating") return inputWithLabel;else return v$1("div", {
        class: "form-floating"
      }, inputJsx);
    }

    function capture(e) {
      return e[EventDetail].checked;
    }
    /**
     * TODO: When inside an InputGroup, Checkboxes don't forward any properties or refs because there's no one DOM element to attach to.
     *
     * Probably need separate `inputRef` & `labelRef` properties for that,
     * but given there's also no easy way to forward props to just them a solution like that feels incomplete.
     */


    const Checkbox = forwardElementRef(function Checkbox({
      checked,
      disabled,
      onInput: onInputAsync,
      labelPosition,
      children: label,
      ...props
    }, ref) {
      var _labelPosition, _disabled;

      (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "end";
      const {
        getSyncHandler,
        pending,
        hasError,
        settleCount,
        hasCapture,
        currentCapture,
        currentType
      } = useAsyncHandler()({
        capture
      });
      disabled || (disabled = pending);
      const onInput = getSyncHandler(onInputAsync);
      const {
        useCheckboxInputElement,
        useCheckboxLabelElement
      } = useAriaCheckbox({
        checked: pending ? currentCapture : checked === "indeterminate" ? "mixed" : checked,
        disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
        onInput,
        labelPosition: "separate"
      });
      const {
        useCheckboxInputElementProps
      } = useCheckboxInputElement({
        tag: "input"
      });
      const {
        useCheckboxLabelElementProps
      } = useCheckboxLabelElement({
        tag: "label"
      });
      const inInputGroup = F(InInputGroupContext);
      let stringLabel = `${label}`;

      if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
      }

      const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
      const p = useMergedProps()(props, useCheckboxInputElementProps({
        ref,
        type: "checkbox",
        className: clsx("form-check-input", pending && "pending", disabled && "disabled", inInputGroup && "mt-0"),
        "aria-label": labelPosition === "hidden" ? stringLabel : undefined
      }));
      const inputElement = v$1(OptionallyInputGroup$1, {
        isInput: true,
        tag: inInputGroup ? "label" : null,
        tabIndex: -1,
        disabled: disabled
      }, v$1(ProgressCircular, {
        childrenPosition: "after",
        colorFill: "foreground-only",
        mode: currentType === "async" ? asyncState : null,
        color: "info"
      }, v$1("input", { ...p
      })));
      const p2 = { ...useCheckboxLabelElementProps({
          className: clsx(pending && "pending", disabled && "disabled", "form-check-label"),
          "aria-hidden": "true"
        })
      };
      const labelElement = v$1(d$1, null, label != null && v$1(OptionallyInputGroup$1, {
        isInput: false,
        tag: "label",
        ...p2
      }, label));
      const ret = v$1(d$1, null, labelPosition == "start" && labelElement, inputElement, labelPosition == "end" && labelElement);
      if (!inInputGroup) return v$1("div", { ...useMergedProps()({}, {
          class: "form-check"
        })
      }, ret);
      return ret;
    });
    D$1(null);
    D$1(null);
    function OptionallyInputGroup$1({
      tag,
      children,
      isInput,
      ...props
    }) {
      const inInputGroup = F(InInputGroupContext);
      const inInputGrid = !!F(InInputGridContext);
      if (!inInputGroup) return v$1(tag !== null && tag !== void 0 ? tag : d$1, props, children); // If we're in an InputGrid's InputGroup, then create a 
      // new child that's, CSS-wise, the "true" input.
      // The other one is used for its border styles and relative positioning.

      if (inInputGrid && isInput) children = v$1("div", {
        className: "input-group-text"
      }, children);
      return v$1(InputGroupText, {
        tag: tag !== null && tag !== void 0 ? tag : "div",
        ...useMergedProps()({
          className: clsx(isInput && inInputGrid && "faux-input-group-text")
        }, props)
      }, children);
    }

    /**
     * @see Checkbox
     * @param ref
     * @returns
     */

    function Switch({
      checked,
      disabled,
      onInput: onInputAsync,
      children: label,
      labelPosition,
      ...rest
    }, ref) {
      var _labelPosition, _disabled;

      (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "end";
      const {
        getSyncHandler,
        pending,
        currentType,
        hasError,
        settleCount,
        currentCapture
      } = useAsyncHandler()({
        capture: e => e[EventDetail].checked
      });
      const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
      disabled || (disabled = pending);
      const onInput = getSyncHandler(onInputAsync);
      const {
        useCheckboxInputElement: useSwitchInputElement,
        useCheckboxLabelElement: useSwitchLabelElement
      } = useAriaCheckbox({
        checked: pending ? currentCapture : checked,
        disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
        onInput,
        labelPosition: "separate"
      });
      const {
        useCheckboxInputElementProps: useSwitchInputElementProps
      } = useSwitchInputElement({
        tag: "input"
      });
      const {
        useCheckboxLabelElementProps: useSwitchLabelElementProps
      } = useSwitchLabelElement({
        tag: "label"
      });
      const inInputGroup = F(InInputGroupContext);
      let stringLabel = `${label}`;

      if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
      }

      const inputElement = v$1(OptionallyInputGroup, {
        tag: inInputGroup ? "label" : null,
        disabled: disabled,
        tabIndex: -1,
        isInput: true
      }, v$1(ProgressCircular, {
        childrenPosition: "after",
        colorFill: "foreground-only",
        mode: currentType === "async" ? asyncState : null,
        color: "info"
      }, v$1("input", { ...useSwitchInputElementProps({
          type: "checkbox",
          className: clsx(pending && "pending", "form-check-input", disabled && "disabled"),
          "aria-label": labelPosition === "hidden" ? stringLabel : undefined
        })
      })));
      const p2 = { ...useSwitchLabelElementProps({
          className: clsx(pending && "pending", "form-check-label", disabled && "disabled"),
          "aria-hidden": "true"
        })
      };
      const labelElement = v$1(d$1, null, label != null && v$1(OptionallyInputGroup, {
        tag: "label",
        isInput: false,
        ...p2
      }, label));
      const ret = v$1(d$1, null, labelPosition == "start" && labelElement, inputElement, labelPosition == "end" && labelElement);
      if (!inInputGroup) return v$1("div", { ...useMergedProps()(rest, {
          ref,
          class: "form-check form-switch"
        })
      }, ret);
      return ret;
    } // Note: Slightly different from the others
    // (^^^^ I'm really glad I left that there)

    function OptionallyInputGroup({
      tag,
      isInput,
      children,
      ...props
    }) {
      const inInputGroup = F(InInputGroupContext);
      const inInputGrid = F(InInputGridContext);
      if (!inInputGroup) return v$1(tag !== null && tag !== void 0 ? tag : d$1, props, children);
      if (inInputGrid && isInput) children = v$1("div", {
        className: clsx(isInput && inInputGrid && "form-switch", "input-group-text")
      }, children);
      return v$1(InputGroupText, {
        tag: tag !== null && tag !== void 0 ? tag : "div",
        ...useMergedProps()({
          className: clsx("input-group-text", isInput && !inInputGrid && "form-switch", isInput && inInputGrid && "faux-input-group-text")
        }, props)
      }, children);
    }

    const knownNames = new Set();
    const CurrentHandlerTypeContext = D$1("sync");
    const RadioGroupContext = D$1(null);
    function RadioGroup({
      children,
      name,
      selectedValue,
      label,
      labelPosition,
      onInput: onInputAsync
    }) {
      const {
        getSyncHandler,
        pending,
        hasError,
        settleCount,
        currentCapture,
        currentType
      } = useAsyncHandler()({
        capture: e => e[EventDetail].selectedValue
      });
      const onInput = getSyncHandler(onInputAsync);
      const {
        useRadio,
        useRadioGroupProps,
        managedChildren,
        getIndex
      } = useAriaRadioGroup({
        name,
        selectedValue: pending ? currentCapture : selectedValue,
        onInput: onInput
      });
      let stringLabel = undefined;

      if (labelPosition === "hidden") {
        if (label != null && !["string", "number", "boolean"].includes(typeof label)) {
          console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        } else {
          stringLabel = `${label}`;
        }
      } // Debugging check -- multiple groups with the same name can cause weird glitches from native radio selection behavior.


      y(() => {
        if (knownNames.has(name)) {
          console.error(`Multiple radio groups with the name "${name}" exist on the same page at the same time!`);
        }

        knownNames.add(name);
        return () => knownNames.delete(name);
      }, [name]);
      const selectedIndex = getIndex(currentCapture !== null && currentCapture !== void 0 ? currentCapture : selectedValue); //const capturedIndex = getIndex(currentCapture!);

      useChildFlag(selectedIndex, managedChildren.length, (index, isSelected) => {
        var _managedChildren$inde;

        return (_managedChildren$inde = managedChildren[index]) === null || _managedChildren$inde === void 0 ? void 0 : _managedChildren$inde.setAsyncState(isSelected ? hasError ? "failed" : pending ? "pending" : "succeeded" : null);
      }); // useChildFlag(pending ? capturedIndex : null, managedChildren.length, useCallback((index, isCaptured) => managedChildren[index].setPending(isCaptured? "in" : false), []));

      const {
        useGenericLabelLabel,
        useGenericLabelInput
      } = useGenericLabel({
        inputPrefix: "aria-radiogroup",
        labelPrefix: "aria-radiogroup-label",
        backupText: stringLabel
      });
      const {
        useGenericLabelInputProps
      } = useGenericLabelInput();
      const {
        useGenericLabelLabelProps
      } = useGenericLabelLabel();
      let labelJsx = v$1("div", { ...useGenericLabelLabelProps({})
      });
      let groupJsx = v$1("div", { ...useGenericLabelInputProps(useRadioGroupProps({
          "aria-label": labelPosition === "hidden" ? stringLabel : undefined
        }))
      }, children);
      return v$1(CurrentHandlerTypeContext.Provider, {
        value: currentType !== null && currentType !== void 0 ? currentType : "sync"
      }, v$1(RadioGroupContext.Provider, {
        value: useRadio
      }, labelPosition == "start" && labelJsx, groupJsx, labelPosition == "end" && labelJsx));
    }
    function Radio({
      disabled,
      children: label,
      index,
      value,
      labelPosition
    }) {
      var _labelPosition, _disabled, _label;

      const useAriaRadio = F(RadioGroupContext);
      (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "end";
      const text = null;
      const currentHandlerType = F(CurrentHandlerTypeContext);
      const [asyncState, setAsyncState] = useState(null);
      disabled || (disabled = asyncState === "pending");
      const {
        useRadioInput,
        useRadioLabel
      } = useAriaRadio({
        disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
        labelPosition: "separate",
        index,
        text,
        value,
        setAsyncState
      });
      const {
        useRadioInputProps
      } = useRadioInput({
        tag: "input"
      });
      const {
        useRadioLabelProps
      } = useRadioLabel({
        tag: "label"
      });
      const inInputGroup = F(InInputGroupContext);
      (_label = label) !== null && _label !== void 0 ? _label : label = value;
      let stringLabel = `${label}`;

      if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
      }

      const inputElement = v$1(OptionallyInputGroup$1, {
        isInput: true,
        tag: inInputGroup ? "label" : null,
        disabled: disabled,
        tabIndex: -1
      }, v$1(ProgressCircular, {
        childrenPosition: "after",
        colorFill: "foreground-only",
        mode: currentHandlerType == "async" ? asyncState : null,
        color: "info"
      }, v$1("input", { ...useRadioInputProps({
          type: "radio",
          className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-input"),
          "aria-label": labelPosition === "hidden" ? stringLabel : undefined
        })
      })));
      const labelElement = v$1(d$1, null, label != null && v$1(OptionallyInputGroup$1, {
        isInput: false,
        tag: "label",
        ...useRadioLabelProps({
          className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-label"),
          "aria-hidden": "true"
        })
      }, label));
      const ret = v$1(d$1, null, labelPosition == "start" && labelElement, inputElement, labelPosition == "end" && labelElement);
      if (!inInputGroup) return v$1("div", {
        class: "form-check"
      }, ret);
      return ret;
    }

    /**
     * Very simple, easy responsive grid that guarantees each column is the minimum size.
     *
     * Easy one-liners all around here!
     */

    const GridResponsive = forwardElementRef(function ResponsiveGrid({
      tag,
      minWidth,
      children,
      ...props
    }, ref) {
      return v$1(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
        className: "responsive-grid",
        style: minWidth ? {
          "--grid-min-width": `${minWidth}`
        } : {},
        ref
      }, props), children);
    });
    /**
     * Very simple, easy static grid that guarantees the number of columns is displayed,
     * no matter how janky it looks.
     */

    forwardElementRef(function ResponsiveGrid({
      tag,
      columns,
      children,
      ...props
    }, ref) {
      return v$1(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
        className: "static-grid",
        style: typeof columns === "string" ? {
          "--static-grid-columns": columns
        } : {
          "--grid-column-count": columns
        },
        ref
      }, props), children);
    });

    const UseListboxSingleItemContext = D$1(null);
    function ListSingle(props, ref) {
      const {
        onSelect: onSelectAsync,
        selectedIndex,
        selectionMode,
        collator,
        keyNavigation,
        noTypeahead,
        noWrap,
        typeaheadTimeout,
        tag,
        select,
        ...domProps
      } = props;
      const {
        getSyncHandler
      } = useAsyncHandler()({
        capture: e => e[EventDetail].selectedIndex
      });
      const onSelect = getSyncHandler(onSelectAsync);
      const {
        useListboxSingleItem,
        useListboxSingleLabel,
        useListboxSingleProps
      } = useAriaListboxSingle({
        onSelect,
        selectedIndex,
        selectionMode,
        typeaheadTimeout,
        noWrap,
        noTypeahead,
        keyNavigation,
        collator
      });
      return v$1(UseListboxSingleItemContext.Provider, {
        value: useListboxSingleItem
      }, v$1(tag, useMergedProps()({
        class: "list-group",
        ref
      }, useListboxSingleProps(domProps))));
    }
    function ListItemSingle(props, ref) {
      const useListItemSingle = F(UseListboxSingleItemContext);
      const {
        index,
        ...domProps
      } = { ...props,
        ref
      };
      const [text, setText] = useState(null);
      const {
        useRefElementProps,
        element
      } = useRefElement();
      h(() => {
        if (element) setText(element.innerText);
      }, [element]);
      const {
        getSelected,
        tabbable,
        selected,
        useListboxSingleItemProps
      } = useListItemSingle({
        index,
        text,
        tag: "li"
      });
      return v$1("li", { ...usePseudoActive(useMergedProps()({
          class: clsx("list-group-item", "list-group-item-action", selected && "active")
        }, useListboxSingleItemProps(useRefElementProps(domProps))))
      });
    }

    var _globalThis$process, _globalThis$process2, _globalThis$process2$, _globalThis$process$e, _globalThis$process$e2;

    (_globalThis$process = globalThis.process) !== null && _globalThis$process !== void 0 ? _globalThis$process : globalThis.process = {};
    (_globalThis$process2$ = (_globalThis$process2 = globalThis.process).env) !== null && _globalThis$process2$ !== void 0 ? _globalThis$process2$ : _globalThis$process2.env = {};
    (_globalThis$process$e2 = (_globalThis$process$e = globalThis.process.env).NODE_ENV) !== null && _globalThis$process$e2 !== void 0 ? _globalThis$process$e2 : _globalThis$process$e.NODE_ENV = "development";

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    var round$1 = Math.round;
    function getBoundingClientRect(element, includeScale) {
      if (includeScale === void 0) {
        includeScale = false;
      }

      var rect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;

      if (isHTMLElement(element) && includeScale) {
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
        // Fallback to 1 in case both values are `0`

        if (offsetWidth > 0) {
          scaleX = rect.width / offsetWidth || 1;
        }

        if (offsetHeight > 0) {
          scaleY = rect.height / offsetHeight || 1;
        }
      }

      return {
        width: round$1(rect.width / scaleX),
        height: round$1(rect.height / scaleY),
        top: round$1(rect.top / scaleY),
        right: round$1(rect.right / scaleX),
        bottom: round$1(rect.bottom / scaleY),
        left: round$1(rect.left / scaleX),
        x: round$1(rect.left / scaleX),
        y: round$1(rect.top / scaleY)
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


      return false;
    }

    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
      var isIE = navigator.userAgent.indexOf('Trident') !== -1;

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (process.env.NODE_ENV !== "production") {
        if (!isHTMLElement(arrowElement)) {
          console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {
        if (process.env.NODE_ENV !== "production") {
          console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
        }

        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(round(x * dpr) / dpr) || 0,
        y: round(round(y * dpr) / dpr) || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets;

      var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
          _ref3$x = _ref3.x,
          x = _ref3$x === void 0 ? 0 : _ref3$x,
          _ref3$y = _ref3.y,
          y = _ref3$y === void 0 ? 0 : _ref3$y;

      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom; // $FlowFixMe[prop-missing]

          y -= offsetParent[heightProp] - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right; // $FlowFixMe[prop-missing]

          x -= offsetParent[widthProp] - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref4) {
      var state = _ref4.state,
          options = _ref4.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

      if (process.env.NODE_ENV !== "production") {
        var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

        if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
          return transitionProperty.indexOf(property) >= 0;
        })) {
          console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
        }
      }

      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getViewportRect(element) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
      // can be obscured underneath it.
      // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
      // if it isn't open, so if this isn't available, the popper will be detected
      // to overflow the bottom of the screen too early.

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent

        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element) {
      var rect = getBoundingClientRect(element);
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;

        if (process.env.NODE_ENV !== "production") {
          console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
        }
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name; // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step

      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis || checkAltAxis) {
        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
        var max$1 = popperOffsets[mainAxis] - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
        var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

        if (checkMainAxis) {
          var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
          popperOffsets[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset;
        }

        if (checkAltAxis) {
          var _mainSide = mainAxis === 'x' ? top : left;

          var _altSide = mainAxis === 'x' ? bottom : right;

          var _offset = popperOffsets[altAxis];

          var _min = _offset + overflow[_mainSide];

          var _max = _offset - overflow[_altSide];

          var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

          popperOffsets[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = rect.width / element.offsetWidth || 1;
      var scaleY = rect.height / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function format(str) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return [].concat(args).reduce(function (p, c) {
        return p.replace(/%s/, c);
      }, str);
    }

    var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
    function validateModifiers(modifiers) {
      modifiers.forEach(function (modifier) {
        [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
        .filter(function (value, index, self) {
          return self.indexOf(value) === index;
        }).forEach(function (key) {
          switch (key) {
            case 'name':
              if (typeof modifier.name !== 'string') {
                console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
              }

              break;

            case 'enabled':
              if (typeof modifier.enabled !== 'boolean') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
              }

              break;

            case 'phase':
              if (modifierPhases.indexOf(modifier.phase) < 0) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
              }

              break;

            case 'fn':
              if (typeof modifier.fn !== 'function') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
              }

              break;

            case 'effect':
              if (modifier.effect != null && typeof modifier.effect !== 'function') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
              }

              break;

            case 'requires':
              if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
              }

              break;

            case 'requiresIfExists':
              if (!Array.isArray(modifier.requiresIfExists)) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
              }

              break;

            case 'options':
            case 'data':
              break;

            default:
              console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
                return "\"" + s + "\"";
              }).join(', ') + "; but \"" + key + "\" was provided.");
          }

          modifier.requires && modifier.requires.forEach(function (requirement) {
            if (modifiers.find(function (mod) {
              return mod.name === requirement;
            }) == null) {
              console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
            }
          });
        });
      });
    }

    function uniqueBy(arr, fn) {
      var identifiers = new Set();
      return arr.filter(function (item) {
        var identifier = fn(item);

        if (!identifiers.has(identifier)) {
          identifiers.add(identifier);
          return true;
        }
      });
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
    var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned
            // if one of the modifiers is invalid for any reason

            if (process.env.NODE_ENV !== "production") {
              var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
                var name = _ref.name;
                return name;
              });
              validateModifiers(modifiers);

              if (getBasePlacement(state.options.placement) === auto) {
                var flipModifier = state.orderedModifiers.find(function (_ref2) {
                  var name = _ref2.name;
                  return name === 'flip';
                });

                if (!flipModifier) {
                  console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
                }
              }

              var _getComputedStyle = getComputedStyle$1(popper),
                  marginTop = _getComputedStyle.marginTop,
                  marginRight = _getComputedStyle.marginRight,
                  marginBottom = _getComputedStyle.marginBottom,
                  marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
              // cause bugs with positioning, so we'll warn the consumer


              if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
                return parseFloat(margin);
              })) {
                console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
              }
            }

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {
              if (process.env.NODE_ENV !== "production") {
                console.error(INVALID_ELEMENT_ERROR);
              }

              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });
            var __debug_loops__ = 0;

            for (var index = 0; index < state.orderedModifiers.length; index++) {
              if (process.env.NODE_ENV !== "production") {
                __debug_loops__ += 1;

                if (__debug_loops__ > 100) {
                  console.error(INFINITE_LOOP_ERROR);
                  break;
                }
              }

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
                _ref3$options = _ref3.options,
                options = _ref3$options === void 0 ? {} : _ref3$options,
                effect = _ref3.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    function usePopperApi({
      updating,
      position,
      skidding,
      distance,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    }) {
      const [popperInstance, setPopperInstance, getPopperInstance] = useState(null);
      const [usedPlacement, setUsedPlacement] = useState(null);
      const {
        element: sourceElement,
        getElement: getSourceElement,
        useRefElementProps: useSourceElementRefProps
      } = useRefElement();
      const {
        element: popperElement,
        getElement: getPopperElement,
        useRefElementProps: usePopperElementRefProps
      } = useRefElement();
      const {
        element: arrowElement,
        getElement: getArrowElement,
        useRefElementProps: useArrowElementRefProps
      } = useRefElement();
      const [sourceStyle, setSourceStyle] = useState(null);
      const [sourceAttributes, setSourceAttributes] = useState({});
      const [popperStyle, setPopperStyle] = useState(null);
      const [popperAttributes, setPopperAttributes] = useState({});
      const [arrowStyle, setArrowStyle] = useState(null);
      const [arrowAttributes, setArrowAttributes] = useState({});
      y(() => {
        if (updating) {
          let rafHandle = 0;

          function raf() {
            var _ref, _getPopperInstance;

            let p = (_ref = closed ? Promise.resolve() : (_getPopperInstance = getPopperInstance()) === null || _getPopperInstance === void 0 ? void 0 : _getPopperInstance.update()) !== null && _ref !== void 0 ? _ref : Promise.resolve();
            p.then(_ => {
              if (rafHandle != 0) {
                rafHandle = requestAnimationFrame(raf);
              }
            });
          }

          rafHandle = requestAnimationFrame(raf);
          return () => {
            cancelAnimationFrame(rafHandle); // Single-threaded languages are nice sometimes.

            rafHandle = 0;
          };
        }
      }, [updating]);
      const updateStateModifier = d(() => {
        let modifier = {
          name: "updateState",
          enabled: true,
          phase: "write",
          fn: ({
            state,
            options,
            name,
            instance
          }) => {
            let usedPlacement = state.placement;
            if (usedPlacement.includes("-")) usedPlacement = usedPlacement.substr(0, usedPlacement.indexOf("-"));
            setUsedPlacement(usedPlacement);
            if (state.styles.reference) setSourceStyle(state.styles.reference);
            if (state.attributes.reference) setSourceAttributes(state.attributes.reference);
            if (state.styles.popper) setPopperStyle(state.styles.popper);
            if (state.attributes.popper) setPopperAttributes(state.attributes.popper);
            if (state.styles.arrow) setArrowStyle(state.styles.arrow);
            if (state.attributes.arrow) setArrowAttributes(state.attributes.arrow);
          },
          requires: ["computeStyles", "flip"]
        };
        return modifier;
      }, []);
      const {
        convertElementSize,
        getLogicalDirection
      } = useLogicalDirection(sourceElement);
      y(() => {
        if (sourceElement && popperElement) {
          const onFirstUpdate = () => {};

          const strategy = "absolute";
          let placement = logicalToPlacement(getLogicalDirection(), position);
          setPopperInstance(createPopper(sourceElement, popperElement, {
            modifiers: [{
              name: "flip",
              options: {}
            }, {
              name: "preventOverflow",
              options: {
                padding: {
                  bottom: paddingBottom,
                  top: paddingTop,
                  left: paddingLeft,
                  right: paddingRight
                }
              }
            }, updateStateModifier, {
              name: 'eventListeners',
              enabled: false
            }, {
              name: "applyStyles",
              enabled: false
            }],
            onFirstUpdate,
            placement,
            strategy
          }));
        }
      }, [sourceElement, popperElement, position, skidding, distance, paddingTop, paddingBottom, paddingLeft, paddingRight]);

      function usePopperSource() {
        function usePopperSourceProps(props) {
          let style = { ...sourceStyle
          };
          return useMergedProps()(sourceAttributes, useMergedProps()({
            style
          }, useSourceElementRefProps(props)));
        }

        return {
          usePopperSourceProps
        };
      }

      function usePopperPopup({
        open
      }) {
        function usePopperPopupProps(props) {
          let style = { ...popperStyle,
            pointerEvents: open ? undefined : "none"
          };
          return useMergedProps()(popperAttributes, useMergedProps()({
            style
          }, usePopperElementRefProps(props)));
        }

        return {
          usePopperPopupProps
        };
      }

      function usePopperArrow() {
        function usePopperArrowProps(props) {
          let style = { ...arrowStyle
          };
          return useMergedProps()(popperAttributes, useMergedProps()({
            style
          }, useArrowElementRefProps(props)));
        }

        return {
          usePopperArrowProps
        };
      }

      return {
        usePopperSource,
        usePopperPopup,
        usePopperArrow,
        usedPlacement,
        getLogicalDirection
      };
    }
    function placementToLogical(logicalDirection, placement) {
      const {
        blockDirection,
        blockOrientation,
        inlineDirection,
        inlineOrientation
      } = logicalDirection;
      let logical;

      switch (`${inlineDirection}-${blockDirection},${placement}`) {
        // There's a pattern, and it could be coded as a pattern
        case "ltr-ttb,top":
          logical = "block-start";
          break;

        case "ltr-btt,bottom":
          logical = "block-start";
          break;

        case "rtl-ttb,top":
          logical = "block-start";
          break;

        case "rtl-btt,bottom":
          logical = "block-start";
          break;

        case "ttb-ltr,left":
          logical = "block-start";
          break;

        case "btt-ltr,right":
          logical = "block-start";
          break;

        case "ttb-rtl,left":
          logical = "block-start";
          break;

        case "btt-rtl,right":
          logical = "block-start";
          break;

        case "ltr-ttb,bottom":
          logical = "block-end";
          break;

        case "rtl-ttb,bottom":
          logical = "block-end";
          break;

        case "ltr-btt,top":
          logical = "block-end";
          break;

        case "rtl-btt,top":
          logical = "block-end";
          break;

        case "ttb-ltr,right":
          logical = "block-end";
          break;

        case "ttb-rtl,right":
          logical = "block-end";
          break;

        case "btt-ltr,left":
          logical = "block-end";
          break;

        case "btt-rtl,left":
          logical = "block-end";
          break;

        case "ttb-ltr,top":
          logical = "inline-start";
          break;

        case "ttb-rtl,top":
          logical = "inline-start";
          break;

        case "btt-ltr,bottom":
          logical = "inline-start";
          break;

        case "btt-rtl,bottom":
          logical = "inline-start";
          break;

        case "ltr-ttb,left":
          logical = "inline-start";
          break;

        case "rtl-ttb,left":
          logical = "inline-start";
          break;

        case "ltr-btt,right":
          logical = "inline-start";
          break;

        case "rtl-btt,right":
          logical = "inline-start";
          break;

        case "ttb-ltr,bottom":
          logical = "inline-end";
          break;

        case "ttb-rtl,bottom":
          logical = "inline-end";
          break;

        case "btt-ltr,top":
          logical = "inline-end";
          break;

        case "btt-rtl,top":
          logical = "inline-end";
          break;

        case "ltr-ttb,right":
          logical = "inline-end";
          break;

        case "rtl-ttb,right":
          logical = "inline-end";
          break;

        case "ltr-btt,left":
          logical = "inline-end";
          break;

        case "rtl-btt,left":
          logical = "inline-end";
          break;
        // Shouldn't happen, but here for type correctness.

        case "ttb-ttb,bottom":
        case "ttb-ttb,top":
        case "btt-btt,bottom":
        case "btt-btt,top":
        case "ltr-ltr,bottom":
        case "ltr-ltr,top":
        case "rtl-rtl,bottom":
        case "rtl-rtl,top":
        case "ttb-btt,bottom":
        case "btt-ttb,top":
        case "btt-ttb,bottom":
        case "ttb-btt,top":
        case "ltr-rtl,bottom":
        case "rtl-ltr,top":
        case "rtl-ltr,bottom":
        case "ltr-rtl,top":
        case "ttb-ttb,right":
        case "ttb-ttb,left":
        case "btt-btt,right":
        case "btt-btt,left":
        case "ltr-ltr,right":
        case "ltr-ltr,left":
        case "rtl-rtl,right":
        case "rtl-rtl,left":
        case "ttb-btt,right":
        case "btt-ttb,left":
        case "btt-ttb,right":
        case "ttb-btt,left":
        case "ltr-rtl,right":
        case "rtl-ltr,left":
        case "rtl-ltr,right":
        case "ltr-rtl,left":
          debugger;
          logical = logical;
          break;
      }

      return logical;
    }
    function logicalToPlacement(logicalDirection, position) {
      let placement;
      const {
        blockDirection,
        blockOrientation,
        inlineDirection,
        inlineOrientation
      } = logicalDirection;

      if (position === "block-start" || position == "block-end") {
        switch (`${position}-${blockDirection}`) {
          case "block-start-ttb":
            placement = "top";
            break;

          case "block-end-btt":
            placement = "top";
            break;

          case "block-start-btt":
            placement = "bottom";
            break;

          case "block-end-ttb":
            placement = "bottom";
            break;

          case "block-start-ltr":
            placement = "left";
            break;

          case "block-end-rtl":
            placement = "left";
            break;

          case "block-end-ltr":
            placement = "right";
            break;

          case "block-start-rtl":
            placement = "right";
            break;

          default:
            placement = "bottom";
            break;
        }
      } else {
        switch (`${position}-${inlineDirection}`) {
          case "inline-start-ltr":
            placement = "left";
            break;

          case "inline-end-rtl":
            placement = "left";
            break;

          case "inline-end-ltr":
            placement = "right";
            break;

          case "inline-start-rtl":
            placement = "right";
            break;

          case "inline-start-ttb":
            placement = "top";
            break;

          case "inline-end-btt":
            placement = "top";
            break;

          case "inline-end-ttb":
            placement = "bottom";
            break;

          case "inline-start-btt":
            placement = "bottom";
            break;

          default:
            placement = "right";
            break;
        }
      }

      return placement;
    }
    function useShouldUpdatePopper(open, elementSize) {
      // Since scroll events are asynchronous, especially on iOS devices,
      // just manually adjust the position of the popper for a bit
      // any time basically any user interaction happens.
      const [updatingForABit, setUpdatingForABit] = useState(0);
      useTimeout({
        callback: () => {
          setUpdatingForABit(0);
        },
        timeout: 100,
        triggerIndex: updatingForABit
      });
      let onInteraction = A$1(() => {
        setUpdatingForABit(u => ++u);
      }, [closed]);
      if (!open) onInteraction = null;
      useGlobalHandler(document, "keydown", onInteraction, {
        passive: true,
        capture: true
      });
      useGlobalHandler(window, "click", onInteraction, {
        passive: true,
        capture: true
      });
      useGlobalHandler(window, "scroll", open ? onInteraction : null, {
        passive: true,
        capture: true
      });
      useGlobalHandler(window, "pointermove", open ? onInteraction : null, {
        passive: true,
        capture: true
      });
      useGlobalHandler(window, "resize", open ? onInteraction : null, {
        passive: true,
        capture: true
      });
      y(() => {
        var _onInteraction;

        (_onInteraction = onInteraction) === null || _onInteraction === void 0 ? void 0 : _onInteraction();
      }, Object.values(elementSize !== null && elementSize !== void 0 ? elementSize : {}));
      return {
        shouldUpdate: !!updatingForABit,
        onInteraction
      };
    }
    /**
     * Handle the e.g. zoomOriginDynamic props, to turn them into zoomOriginInline or zoomOriginBlock as appropriate.
     * TODO: Right now, all *Dynamic props are just handled as 1 - prop. Some probably need to be -1 * prop though.
     */

    function fixProps(logicalDirection, requestedPlacement, usedPlacement, props) {
      let logicalSnake = placementToLogical(logicalDirection, usedPlacement);
      let propAxis;
      let reverse;

      switch (logicalSnake) {
        case "block-start":
          propAxis = "Block";
          reverse = requestedPlacement == "block-end";
          break;

        case "block-end":
          propAxis = "Block";
          reverse = requestedPlacement == "block-start";
          break;

        case "inline-start":
          propAxis = "Inline";
          reverse = requestedPlacement == "inline-end";
          break;

        case "inline-end":
          propAxis = "Inline";
          reverse = requestedPlacement == "inline-start";
          break;
      }

      let newProps = { ...props
      };

      for (let propName in props) {
        if (propName.endsWith("Dynamic") && typeof props[propName] === "number") {
          let newPropName = `${propName.substr(0, propName.indexOf("Dynamic"))}${propAxis}`;
          newProps[newPropName] = !reverse ? newProps[propName] : 1 - newProps[propName];
          delete newProps[propName];
        }
      }

      return newProps;
    }

    const OnCloseContext = D$1(undefined);
    const UseMenuItemContext = D$1(null);
    function Menu({
      anchor,
      anchorTag,
      children,
      tag,
      Transition,
      ...rest
    }) {
      const [open, setOpen] = useState(false);
      const onClose = A$1(() => setOpen(false), []);

      const onOpen = () => setOpen(true);

      const {
        useElementSizeProps,
        elementSize
      } = useElementSize();
      const {
        shouldUpdate: updatingForABit,
        onInteraction
      } = useShouldUpdatePopper(open, elementSize);
      const {
        usePopperArrow,
        usePopperPopup,
        usePopperSource,
        usedPlacement,
        getLogicalDirection
      } = usePopperApi({
        position: "block-end",
        updating: updatingForABit
      });
      const {
        useMenuButton,
        useMenuItem,
        useMenuItemCheckbox,
        useMenuProps,
        useMenuSubmenuItem,
        focusMenu
      } = useAriaMenu({
        open,
        onClose,
        onOpen
      });
      const {
        useMenuButtonProps
      } = useMenuButton({
        tag: anchorTag !== null && anchorTag !== void 0 ? anchorTag : "button"
      });
      const {
        usePopperSourceProps
      } = usePopperSource();
      const {
        usePopperPopupProps
      } = usePopperPopup({
        open
      });
      const {
        usePopperArrowProps
      } = usePopperArrow();
      /*const [sentinelFocused, setSentinelFocused] = useState(false);
      useTimeout({ callback: () => { if (sentinelFocused) onClose(); setSentinelFocused(false); }, timeout: 1000, triggerIndex: sentinelFocused.toString() })*/

      const [firstSentinelIsActive, setFirstSentinelIsActive] = useState(false);
      useTimeout({
        callback: () => {
          setFirstSentinelIsActive(open);
        },
        timeout: 100,
        triggerIndex: `${firstSentinelIsActive}`
      });
      const menuChildren = v$1(d$1, null, v$1("div", { ...usePopperArrowProps({})
      }), v$1("button", {
        className: "visually-hidden",
        onFocus: !firstSentinelIsActive ? () => focusMenu === null || focusMenu === void 0 ? void 0 : focusMenu() : () => onClose(),
        onClick: onClose
      }, "Close menu"), children, v$1("button", {
        className: "visually-hidden",
        onFocus: onClose,
        onClick: onClose
      }, "Close menu"));
      const logicalDirection = getLogicalDirection();
      if (logicalDirection && usedPlacement) rest = fixProps(logicalDirection, "block-end", usedPlacement, rest);
      return v$1(d$1, null, v$1(OnCloseContext.Provider, {
        value: onClose
      }, v$1(UseMenuItemContext.Provider, {
        value: useMenuItem
      }, B(anchor, useMergedProps()(useElementSizeProps({
        ref: anchor.ref,
        class: `dropdown-toggle ${open ? "active" : ""}`
      }), usePopperSourceProps(useMenuButtonProps(anchor.props)))), v$1(BodyPortal, null, v$1("div", { ...usePopperPopupProps({
          class: "dropdown-menu-popper"
        })
      }, v$1(Transition, { ...useMenuProps(rest),
        open: open,
        onTransitionUpdate: onInteraction,
        exitVisibility: "hidden"
      }, v$1("div", null, v$1(tag, {
        children: menuChildren,
        className: "dropdown-menu"
      }))))))));
    }
    function MenuItem({
      children,
      index,
      ...rest
    }) {
      const useMenuItem = F(UseMenuItemContext);
      const [text, setText] = useState(null);
      const {
        useRefElementProps,
        element
      } = useRefElement();
      h(() => {
        if (element) setText(element.innerText);
      }, [element]);
      const {
        useMenuItemProps
      } = useMenuItem({
        index,
        text
      });
      return v$1("li", null, v$1("button", { ...useMenuItemProps(useRefElementProps(useMergedProps()(rest, {
          class: "dropdown-item"
        })))
      }, children));
    }

    const UseTabContext = D$1(null);
    const UseTabPanelContext = D$1(null);
    function Tabs({
      onSelect: onSelectAsync,
      orientation,
      selectedIndex,
      selectionMode,
      tag,
      children,
      visualVariant,
      ...props
    }) {
      var _orientation;

      const capture = e => {
        return e[EventDetail].selectedIndex;
      };

      (_orientation = orientation) !== null && _orientation !== void 0 ? _orientation : orientation = "inline";
      const {
        getSyncHandler
      } = useAsyncHandler()({
        capture: capture
      });
      const onSelect = getSyncHandler(onSelectAsync);
      const {
        useTab,
        useTabPanel,
        useTabsLabel,
        useTabsList
      } = useAriaTabs({
        onSelect,
        selectedIndex,
        selectionMode,
        orientation
      });
      const {
        useTabListProps
      } = useTabsList();
      return v$1("div", {
        class: clsx("tabs-container", `tabs-orientation-${orientation}`)
      }, v$1(UseTabContext.Provider, {
        value: useTab
      }, B(children[0], useTabListProps(useMergedProps()({
        className: clsx("nav", visualVariant == "pills" ? "nav-pills" : "nav-tabs")
      }, { ...props
      })), children[0].props.children)), v$1(UseTabPanelContext.Provider, {
        value: useTabPanel
      }, v$1(Swappable, null, v$1("div", {
        class: "tab-content"
      }, children.slice(1)))));
    }
    function Tab({
      index,
      children,
      ...props
    }) {
      const useTabContext = F(UseTabContext);
      const {
        useTabProps,
        selected
      } = useTabContext({
        index,
        text: null,
        tag: "button"
      });
      return v$1("li", {
        className: "nav-item",
        role: "presentation"
      }, v$1("button", { ...useTabProps(useMergedProps()({
          class: clsx(`nav-link`, selected && `active`)
        }, props))
      }, children));
    }
    function TabPanel({
      index,
      children,
      Transition,
      ...rest
    }) {
      const useTabPanel = F(UseTabPanelContext);
      const {
        useTabPanelProps,
        selected
      } = useTabPanel({
        index
      });
      return v$1(Transition, useTabPanelProps({
        class: "",
        open: selected,
        children,
        ...rest
      }));
    }

    const PushToastContext = D$1(null);
    const DefaultToastTimeout = D$1(5000);
    function ToastsProvider({
      children,
      defaultTimeout
    }) {
      const [pushToast, setPushToast] = useState(null);
      const pushToastStable = useStableCallback(toast => {
        pushToast === null || pushToast === void 0 ? void 0 : pushToast(toast);
      });
      return v$1(d$1, null, v$1(DefaultToastTimeout.Provider, {
        value: defaultTimeout !== null && defaultTimeout !== void 0 ? defaultTimeout : 5000
      }, v$1(ToastsProviderHelper, {
        setPushToast: setPushToast
      }), pushToast && v$1(PushToastContext.Provider, {
        value: pushToastStable
      }, children)));
    }
    function usePushToast() {
      const pushToast = F(PushToastContext);
      return pushToast;
    } // Extracted to a separate component to avoid rerendering all non-toast children

    function ToastsProviderHelper({
      setPushToast
    }) {
      const [children, setChildren] = useState([]);
      const pushToast = A$1(toast => {
        const randomKey = generateRandomId();
        setChildren(prev => [...prev, B(toast, {
          key: randomKey
        })]);
      }, []);
      h(() => {
        setPushToast(_ => pushToast);
      }, [pushToast]);
      return v$1(BodyPortal, null, v$1(ToastsContainerChildrenContext.Provider, {
        value: children
      }, v$1(ToastsContainer, null)));
    }

    const ToastsContainerChildrenContext = D$1([]);
    const UseToastContext = D$1(null);

    function ToastsContainer(props) {
      const children = F(ToastsContainerChildrenContext);
      const {
        useToast,
        useToastContainerProps
      } = useToasts(props);
      return v$1(UseToastContext.Provider, {
        value: useToast
      }, v$1("div", { ...useToastContainerProps(props)
      }, children));
    }

    const ToastDismissContext = D$1(null);
    function Toast({
      timeout,
      politeness,
      children
    }) {
      const useToast = F(UseToastContext);
      const defaultTimeout = F(DefaultToastTimeout);
      const {
        useToastProps,
        dismiss,
        status
      } = useToast({
        timeout: timeout !== null && timeout !== void 0 ? timeout : defaultTimeout,
        politeness
      });
      return v$1(ToastDismissContext.Provider, {
        value: dismiss
      }, v$1(SlideFade, {
        open: status != "dismissed",
        slideTargetInline: 1,
        animateOnMount: true,
        exitVisibility: "removed"
      }, v$1("div", { ...useToastProps({
          class: "toast show"
        })
      }, v$1("div", {
        class: "d-flex"
      }, v$1("div", {
        class: "toast-body"
      }, children), v$1(Button, {
        class: "btn-close me-2 m-auto",
        "aria-label": "Dismiss alert",
        onClick: dismiss
      })))));
    }
    /*
    export function ToastHeader({ children }: { children: ComponentChildren }) {
        return (
            <div class="toast-header">
                <div class="me-auto">
                    {children}
                </div>
                <Button class="btn-close" aria-label="Close" />
            </div>
        )
    }*/

    function Tooltip({
      children,
      position,
      tooltip,
      Transition,
      mouseoverDelay,
      ...rest
    }) {
      const {
        getIsOpen,
        isOpen,
        useTooltip,
        useTooltipTrigger
      } = useAriaTooltip({
        mouseoverDelay
      });
      const {
        useElementSizeProps,
        elementSize
      } = useElementSize();
      let cloneable;

      if (typeof children === "string" || typeof children === "number" || typeof children == "boolean" || typeof children === "bigint") {
        cloneable = v$1("span", null, children);
      } else if (Array.isArray(children)) {
        cloneable = v$1("span", null, children);
      } else {
        cloneable = children;
      }

      const {
        useTooltipProps
      } = useTooltip();
      const {
        useTooltipTriggerProps
      } = useTooltipTrigger();
      const {
        shouldUpdate,
        onInteraction
      } = useShouldUpdatePopper(isOpen, elementSize);
      const {
        getLogicalDirection,
        usePopperArrow,
        usePopperPopup,
        usePopperSource,
        usedPlacement
      } = usePopperApi({
        updating: shouldUpdate,
        position
      });
      const {
        usePopperPopupProps
      } = usePopperPopup({
        open: isOpen
      });
      const {
        usePopperArrowProps
      } = usePopperArrow();
      const {
        usePopperSourceProps
      } = usePopperSource();
      const logicalDirection = getLogicalDirection();
      if (logicalDirection && usedPlacement) rest = fixProps(logicalDirection, "block-end", usedPlacement, rest); // TODO: It's required for this to be exitVisibility="hidden" for transforms to work?
      // Probably an issue in the Transition element itself because it's not browser-specific but it's a little weird

      return v$1(d$1, null, B(cloneable, useMergedProps()({
        ref: cloneable.ref
      }, useTooltipTriggerProps(useElementSizeProps(usePopperSourceProps(cloneable.props))))), v$1(BodyPortal, null, v$1("div", { ...usePopperPopupProps({
          class: "tooltip-wrapper"
        })
      }, v$1(Transition, { ...rest,
        open: isOpen,
        onTransitionUpdate: onInteraction,
        exitVisibility: "hidden"
      }, v$1("div", { ...useTooltipProps(useMergedProps()({
          class: "tooltip show",
          role: "tooltip"
        }, {}))
      }, v$1("div", { ...usePopperArrowProps({
          class: "tooltip-arrow"
        })
      }), v$1("div", {
        class: "tooltip-inner"
      }, tooltip))))));
    }

    const Card = forwardElementRef(function Card(p, ref) {
      let {
        children,
        ...props
      } = p;
      return v$1("div", { ...useMergedProps()({
          ref,
          className: "card"
        }, props)
      }, children);
    });

    function CardElement2({
      children,
      ...p
    }, ref) {
      switch (p.type) {
        default:
        case "paragraph":
          {
            const {
              type,
              ...props
            } = p;
            return v$1(CardBody, { ...props,
              ref: ref
            }, v$1(CardText, null, children));
          }

        case "footer":
          {
            const {
              type,
              ...props
            } = p;
            return v$1(CardFooter, { ...props,
              ref: ref
            }, children);
          }

        case "subtitle":
          {
            const {
              type,
              tag,
              ...props
            } = p;
            return v$1(CardBody, { ...props,
              ref: ref
            }, v$1(CardSubtitle, {
              tag: tag
            }, children));
          }

        case "title":
          {
            const {
              type,
              tag,
              ...props
            } = p;
            return v$1(CardBody, { ...props,
              ref: ref
            }, v$1(CardTitle, {
              tag: tag
            }, children));
          }

        case "image":
          {
            const {
              type,
              src,
              ...props
            } = p;
            return v$1(CardImage, {
              src: src,
              position: "both",
              ...props,
              ref: ref
            }, children);
          }

        case "flush":
          {
            const {
              tag,
              ...props
            } = p;
            return v$1(tag, props, children);
          }
      }
    }

    const CardElement = forwardElementRef(CardElement2);
    const CardImage = forwardElementRef(function CardImage(p, ref) {
      const {
        position,
        ...props
      } = p;
      return v$1("img", { ...useMergedProps()(props, {
          ref,
          className: `card-img${position == "both" ? "" : `-${position}`}`
        })
      });
    });
    const CardBody = forwardElementRef(function CardBody(props, ref) {
      return v$1("div", { ...useMergedProps()(props, {
          ref,
          className: "card-body"
        })
      });
    });
    const CardFooter = forwardElementRef(function CardHeader(props, ref) {
      return v$1("div", { ...useMergedProps()(props, {
          ref,
          className: "card"
        })
      });
    });
    const CardTitle = forwardElementRef(function CardTitle(p, ref) {
      const {
        tag,
        ...props
      } = p;
      return v$1(tag !== null && tag !== void 0 ? tag : "h5", useMergedProps()(props, {
        ref,
        className: "card-title"
      }));
    });
    const CardSubtitle = forwardElementRef(function CardSubtitle(p, ref) {
      const {
        tag,
        ...props
      } = p;
      return v$1(tag !== null && tag !== void 0 ? tag : "h5", useMergedProps()(props, {
        ref,
        className: clsx("card-subtitle", "mb-2", "text-muted")
      }));
    });
    const CardText = forwardElementRef(function CardText(props, ref) {
      return v$1("div", { ...useMergedProps()(props, {
          ref,
          className: "card-text"
        })
      });
    });
    forwardElementRef(function CardHeader(props, ref) {
      return v$1("div", { ...useMergedProps()(props, {
          ref,
          className: "card-header"
        })
      });
    });
    v$1(CardElement, {
      type: "title",
      tag: "h1",
      children: "",
      class: ""
    });

    function DemoButtons() {
        var _this = this;
        var _a = useState("outline"), buttonsFill = _a[0], setButtonsFill = _a[1];
        var _b = useState("md"), buttonsSize = _b[0];
        var _c = useState("primary"), buttonsColor = _c[0], setButtonsColor = _c[1];
        var _d = useState(false), toggleOn = _d[0], setToggleOn = _d[1];
        var _e = useState(3000), asyncTimeout = _e[0], setAsyncTimeout = _e[1];
        var _f = useState(true), usesAsync = _f[0], setUsesAsync = _f[1];
        var _g = useState(false), asyncFails = _g[0], setAsyncFails = _g[1];
        var _h = useState(true), usesLinkButton = _h[0], setUsesLinkButton = _h[1];
        var pushToast = usePushToast();
        var onClickSync = function () { return pushToast(v$1(Toast, null, "Button was clicked")); };
        var onClickAsync = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep$4(asyncTimeout)];
                    case 1:
                        _a.sent();
                        if (asyncFails)
                            throw new Error("Button operation failed.");
                        else
                            onClickSync();
                        return [2 /*return*/];
                }
            });
        }); };
        var onClick = usesAsync ? onClickAsync : onClickSync;
        var onToggleInputAsync = function (b) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep$4(asyncTimeout)];
                    case 1:
                        _a.sent();
                        if (asyncFails)
                            throw new Error("Button operation failed.");
                        else
                            setToggleOn(b);
                        return [2 /*return*/];
                }
            });
        }); };
        var onToggleInput = usesAsync ? onToggleInputAsync : setToggleOn;
        return (v$1(ProvideDefaultButtonFill, { value: buttonsFill },
            v$1(ProvideDefaultButtonSize, { value: buttonsSize },
                v$1(ProvideDefaultButtonColor, { value: buttonsColor },
                    v$1("div", { class: "demo" },
                        v$1(Card, null,
                            v$1(CardElement, { type: "title", tag: "h2" }, "Buttons"),
                            v$1(CardElement, null,
                                v$1(Button, { onClick: onClick }, "I'm a button")),
                            v$1(CardElement, null,
                                "A ",
                                v$1("code", null, "Button"),
                                " is a ",
                                v$1("code", null, "Button"),
                                " is a ",
                                v$1("code", null, "Button"),
                                " \u2013 you can click, tap, or Space-key it to activate it and do something.  If the given action is asynchronous, then the button will disable itself and display a spinner during the operation."),
                            v$1(CardElement, { type: "subtitle", tag: "h3" }, "Async inputs"),
                            v$1(CardElement, null,
                                "The ",
                                v$1("code", null, "onClick"),
                                " event handler for buttons can be sync or async, and they will react appropriately if the operation takes long enough.",
                                v$1(InputGrid, null,
                                    v$1(InputGroup, null,
                                        v$1(Checkbox, { onInput: setUsesAsync, checked: usesAsync, labelPosition: "start" }, "Use async handler")),
                                    v$1(InputGroup, null,
                                        v$1(Checkbox, { onInput: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync }, "Async handler rejects")),
                                    v$1(InputGroup, null,
                                        v$1(Input, { width: "8ch", disabled: !usesAsync, type: "number", onInput: setAsyncTimeout, value: asyncTimeout }, "Async timeout")))),
                            v$1(CardElement, null,
                                v$1(Button, { onClick: onClick }, "Click me")),
                            v$1(CardElement, { type: "paragraph" },
                                v$1("code", null, "const onClick = " + (usesAsync ? "async " : "") + "() => { " + (usesAsync ? "await sleep(" + asyncTimeout + "); " : "") + "pushToast(<Toast ... />); }\n<Button onClick={onClick}>Click me</Button>")),
                            v$1("hr", null),
                            v$1(CardElement, { type: "subtitle", tag: "h3" }, "Color & fill"),
                            v$1(CardElement, { type: "paragraph" },
                                "Buttons can be styled in different colors and fill styles. You can provide a global default with ",
                                v$1("code", null, "Context"),
                                " objects, like ",
                                v$1("code", null, "<ProvideDefaultButtonFill>"),
                                "."),
                            v$1(CardElement, null,
                                "All outline styles have extra CSS applied to make them have correct contrast ratios on the default body background, partially because toggle buttons don't allow their ",
                                v$1("code", null, "fill"),
                                " to be controlled."),
                            v$1(CardElement, null,
                                v$1(ButtonGroup, null,
                                    v$1(ButtonGroupChild, { index: 0, onInput: function () { return setButtonsFill("fill"); }, pressed: buttonsFill === "fill", colorVariant: "primary" }, "Fill"),
                                    v$1(ButtonGroupChild, { index: 1, onInput: function () { return setButtonsFill("outline"); }, pressed: buttonsFill === "outline", colorVariant: "primary" }, "Outline"))),
                            v$1(CardElement, null,
                                v$1(ButtonGroup, { wrap: true },
                                    v$1(ButtonGroupChild, { index: 0, colorVariant: "primary", pressed: buttonsColor == "primary", onInput: function () { return setButtonsColor("primary"); } }, "Primary"),
                                    v$1(ButtonGroupChild, { index: 1, colorVariant: "secondary", pressed: buttonsColor == "secondary", onInput: function () { return setButtonsColor("secondary"); } }, "Secondary"),
                                    v$1(ButtonGroupChild, { index: 2, colorVariant: "success", pressed: buttonsColor == "success", onInput: function () { return setButtonsColor("success"); } }, "Success"),
                                    v$1(ButtonGroupChild, { index: 3, colorVariant: "warning", pressed: buttonsColor == "warning", onInput: function () { return setButtonsColor("warning"); } }, "Warning"),
                                    v$1(ButtonGroupChild, { index: 4, colorVariant: "danger", pressed: buttonsColor == "danger", onInput: function () { return setButtonsColor("danger"); } }, "Danger"),
                                    v$1(ButtonGroupChild, { index: 5, colorVariant: "info", pressed: buttonsColor == "info", onInput: function () { return setButtonsColor("info"); } }, "Info"),
                                    v$1(ButtonGroupChild, { index: 6, colorVariant: "light", pressed: buttonsColor == "light", onInput: function () { return setButtonsColor("light"); } }, "Light"),
                                    v$1(ButtonGroupChild, { index: 7, colorVariant: "dark", pressed: buttonsColor == "dark", onInput: function () { return setButtonsColor("dark"); } }, "Dark"))),
                            v$1(CardElement, null,
                                v$1(Button, { onClick: onClick },
                                    buttonsFill === "fill" ? "Filled" : "Outlined",
                                    " ",
                                    buttonsColor,
                                    " button")),
                            v$1(CardElement, null,
                                v$1("code", null, "<Button fillVariant=\"" + buttonsFill + "\" colorVariant=\"" + buttonsColor + "\">Variant button</Button>")),
                            v$1("hr", null),
                            v$1(CardElement, { type: "subtitle", tag: "h3" }, "Link buttons"),
                            v$1(CardElement, null,
                                "A link can be styled as a button while retaining native link functionality (middle clicks, etc.). These buttons have no ",
                                v$1("code", null, "onClick"),
                                " handler, instead taking ",
                                v$1("code", null, "href"),
                                " and the other ",
                                v$1("code", null, "<a>"),
                                " props."),
                            v$1(CardElement, null,
                                "A ",
                                v$1("code", null, "<Button>"),
                                " will use an anchor link internally if you provide it with an ",
                                v$1("code", null, "href"),
                                " prop, or optionally setting the ",
                                v$1("code", null, "tag"),
                                " prop to ",
                                v$1("code", null, "a"),
                                ".",
                                v$1(InputGroup, null,
                                    v$1(Checkbox, { onInput: setUsesLinkButton, checked: usesLinkButton, labelPosition: "start" }, "Use link button"))),
                            v$1(CardElement, null, usesLinkButton ? v$1(Button, { target: "_blank", href: "https://www.example.com" },
                                "example.com ",
                                v$1("i", { class: "bi bi-box-arrow-up-right" })) : v$1(Button, { onClick: onClick }, "Regular button")),
                            v$1(CardElement, { type: "paragraph" },
                                v$1("code", null, usesLinkButton ? "<Button href=\"https://www.example.com\">Link button</Button>" : "<Button onClick={onClick}>Regular button</Button>")),
                            v$1("hr", null),
                            v$1(CardElement, { type: "subtitle", tag: "h3" }, "Toggle buttons"),
                            v$1(CardElement, null,
                                "If given a ",
                                v$1("code", null, "pressed"),
                                " prop, a button will become a toggle button, with an off/on state.  It will style itself as outlined when unpressed, and filled when pressed, so they are best used in groups."),
                            v$1(CardElement, null,
                                v$1(Button, { pressed: toggleOn, onInput: onToggleInput }, "Toggle button")),
                            v$1(CardElement, { type: "paragraph" },
                                v$1("code", null, "<Button pressed={pressed} onInput={onInput}>Toggle button</Button>")),
                            v$1("hr", null),
                            v$1(CardElement, { type: "subtitle", tag: "h3" }, "Button Groups"),
                            v$1(CardElement, null,
                                "A ",
                                v$1("code", null, "<ButtonGroup>"),
                                " can be used to group a set of ",
                                v$1("code", null, "<ButtonGroupChild>"),
                                " (which is the exact same as a ",
                                v$1("code", null, "<Button>"),
                                ", but with an ",
                                v$1("code", null, "index"),
                                " prop). This gives them keyboard navigation abilities."),
                            v$1(CardElement, null,
                                v$1(ButtonGroup, { wrap: true },
                                    v$1(ButtonGroupChild, { index: 0, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "First button"),
                                    v$1(ButtonGroupChild, { index: 1, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "Second button"),
                                    v$1(ButtonGroupChild, { index: 2, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "Third button"),
                                    v$1(ButtonGroupChild, { index: 3, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "Fourth button"),
                                    v$1(ButtonGroupChild, { index: 4, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "Fifth button"),
                                    v$1(ButtonGroupChild, { index: 5, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "Sixth button"),
                                    v$1(ButtonGroupChild, { index: 6, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "Seventh button"),
                                    v$1(ButtonGroupChild, { index: 7, fillVariant: buttonsFill, colorVariant: buttonsColor, onClick: onClick }, "Eighth button"))),
                            v$1(CardElement, { type: "paragraph" },
                                v$1("code", null, "<ButtonGroup wrap>\n    <ButtonGroupChild index={0}>First button</ButtonGroupChild>\n    <ButtonGroupChild index={1}>Second button</ButtonGroupChild>\n    <ButtonGroupChild index={2}>Third button</ButtonGroupChild>\n    <ButtonGroupChild index={3}>Fourth button</ButtonGroupChild>\n    <ButtonGroupChild index={4}>Fifth button</ButtonGroupChild>\n    <ButtonGroupChild index={5}>Sixth button</ButtonGroupChild>\n    <ButtonGroupChild index={6}>Seventh button</ButtonGroupChild>\n    <ButtonGroupChild index={7}>Eighth button</ButtonGroupChild>\n</ButtonGroup>"))))))));
    }
    function sleep$4(arg0) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, arg0); })];
            });
        });
    }

    function DemoChecks() {
        var _this = this;
        var _a = useState(false), asyncFails = _a[0], setAsyncFails = _a[1];
        var _b = useState(3000), asyncTimeout = _b[0], setAsyncTimeout = _b[1];
        var _c = useState(true), usesAsync = _c[0], setUsesAsync = _c[1];
        var _d = useState(false), demoChecked = _d[0], setDemoChecked = _d[1];
        var _e = useState(0), demoRadio = _e[0], setDemoRadio = _e[1];
        var _f = useState(3), radioCount = _f[0], setRadioCount = _f[1];
        var _g = useState(false), disabled = _g[0], setDisabled = _g[1];
        var _h = useState("end"), labelPosition = _h[0], setLabelPosition = _h[1];
        var asyncCheckboxInput = A$1(function (checked) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep$3(asyncTimeout)];
                    case 1:
                        _a.sent();
                        if (asyncFails)
                            throw new Error("Attempt to change checkbox & radio failed");
                        setDemoChecked(checked);
                        return [2 /*return*/];
                }
            });
        }); }, [asyncTimeout, asyncFails]);
        var asyncRadioInput = A$1(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep$3(asyncTimeout)];
                    case 1:
                        _a.sent();
                        if (asyncFails)
                            throw new Error("Attempt to change radio failed");
                        setDemoRadio(value);
                        return [2 /*return*/];
                }
            });
        }); }, [asyncTimeout, asyncFails]);
        return (v$1("div", { class: "demo" },
            v$1(Card, null,
                v$1(CardElement, { type: "title", tag: "h2" }, "Checkboxes, switches, & radios"),
                v$1(CardElement, null,
                    v$1(Checkbox, { checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "I'm a checkbox")),
                v$1(CardElement, null,
                    "Several components related to on/off togglable form-like selection controls are provided:",
                    v$1("ul", null,
                        v$1("li", null,
                            v$1("code", null, "Checkbox")),
                        v$1("li", null,
                            v$1("code", null, "Switch")),
                        v$1("li", null,
                            v$1("code", null, "Radio")),
                        v$1("li", null,
                            v$1("code", null, "Checkbox Group"))),
                    v$1("code", null, "Checkbox"),
                    " and ",
                    v$1("code", null, "Switch"),
                    " work as you'd expect. ",
                    v$1("code", null, "RadioGroup"),
                    " is a parent around a set of ",
                    v$1("code", null, "Radio"),
                    " components that communicate with each other. The children ",
                    v$1("code", null, "Radio"),
                    " components can be any descendant of the parent ",
                    v$1("code", null, "RadioGroup"),
                    " \u2013 the DOM structure ",
                    v$1("em", null, "does not"),
                    " matter beyond requiring they be somewhere descendant. ",
                    v$1("code", null, "CheckboxGroup"),
                    " works similarly to ",
                    v$1("code", null, "RadioGroup"),
                    " in that way."),
                v$1(CardElement, null,
                    "See Also: Single Select lists for an alternative to ",
                    v$1("code", null, "RadioGroup"),
                    ", and Multi Select lists for an alternative to ",
                    v$1("code", null, "CheckboxGroup"),
                    "."),
                v$1(CardElement, { type: "subtitle", tag: "h3" }, "Async inputs"),
                v$1(CardElement, null,
                    "The ",
                    v$1("code", null, "onInput"),
                    " event handler for all types of inputs can be sync or async.",
                    v$1(InputGrid, null,
                        v$1(InputGroup, null,
                            v$1(Checkbox, { onInput: setUsesAsync, checked: usesAsync, labelPosition: "start" }, "Async event handler")),
                        v$1(InputGroup, null,
                            v$1(Checkbox, { onInput: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync }, "Async handler rejects")),
                        v$1(InputGroup, null,
                            v$1(Input, { disabled: !usesAsync, type: "number", onInput: setAsyncTimeout, value: asyncTimeout }, "Async timeout")),
                        v$1(InputGroup, null,
                            v$1(Input, { type: "number", onInput: setRadioCount, value: radioCount }, "# of radio buttons")))),
                v$1(CardElement, null,
                    v$1(Checkbox, { checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox"),
                    v$1(Switch, { checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
                v$1(CardElement, null,
                    v$1(RadioGroup, { name: "radio-demo-1", selectedValue: demoRadio, onInput: usesAsync ? asyncRadioInput : setDemoRadio }, Array.from(function () {
                        var i;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < radioCount)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, v$1(Radio, { index: i, value: i, key: i },
                                            "Radio #",
                                            i + 1)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    ++i;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }()))),
                v$1(CardElement, { type: "paragraph" },
                    v$1("code", null, "<Checkbox checked={checked} onInput={setChecked}>Checkbox</Checkbox>\n<Switch checked={checked} onInput={onInput}>Switch</Switch>\n<RadioGroup name=\"radio-demo-1\" selectedValue={value} onInput={setValue}>\n<Radio index={0} value=\"value1\">Radio #1</Radio>\n<Radio index={1} value=\"value2\">Radio #2</Radio>\n<Radio index={2} value=\"value3\">Radio #3</Radio>\n</RadioGroup>")),
                v$1("hr", null),
                v$1(CardElement, { type: "subtitle", tag: "h3" }, "Disabling"),
                v$1(CardElement, null,
                    "When disabled, all inputs remain focusable so that they can still be announced by screen readers, have tooltips via mouseover, etc.",
                    v$1(InputGroup, null,
                        v$1(Checkbox, { onInput: setDisabled, checked: disabled, labelPosition: "start" }, "Inputs disabled"))),
                v$1(CardElement, null,
                    v$1(Checkbox, { disabled: disabled, checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox "),
                    v$1(Switch, { disabled: disabled, checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
                v$1(CardElement, null,
                    v$1(RadioGroup, { name: "radio-demo-2", selectedValue: demoRadio, onInput: usesAsync ? asyncRadioInput : setDemoRadio },
                        v$1(Radio, { disabled: disabled, index: 0, value: 0 }, "Radio #1"),
                        v$1(Radio, { disabled: disabled, index: 1, value: 1 }, "Radio #2"),
                        v$1(Radio, { disabled: disabled, index: 2, value: 2 }, "Radio #3"))),
                v$1("hr", null),
                v$1(CardElement, { type: "subtitle", tag: "h3" },
                    v$1("code", null, "InputGroup"),
                    " styling"),
                v$1(CardElement, { type: "paragraph" },
                    "An ",
                    v$1("code", null, "<InputGroup>"),
                    " can be used to significantly change the styling of input components. The inputs and their labels will style themselves or automatically wrap themselves in ",
                    v$1("code", null, "<InputGroupText>"),
                    " as appropriate."),
                v$1(CardElement, null,
                    v$1(InputGrid, null,
                        v$1(InputGroup, null,
                            v$1(Checkbox, { checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox")),
                        v$1(InputGroup, null,
                            v$1(Switch, { checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
                        v$1(RadioGroup, { name: "radio-demo-5", selectedValue: demoRadio, onInput: usesAsync ? asyncRadioInput : setDemoRadio },
                            v$1(InputGroup, null,
                                v$1(Radio, { index: 0, value: 0 }, "Radio #1")),
                            v$1(InputGroup, null,
                                v$1(Radio, { index: 1, value: 1 }, "Radio #2")),
                            v$1(InputGroup, null,
                                v$1(Radio, { index: 2, value: 2 }, "Radio #3"))))),
                v$1(CardElement, { type: "paragraph" },
                    v$1("code", null, "<InputGroup>\n    <Checkbox checked={checked} onInput={setChecked}>Checkbox</Checkbox>\n</InputGroup>\n<InputGroup>\n    <Switch checked={checked} onInput={onInput}>Switch</Switch>\n</InputGroup>\n<RadioGroup name=\"radio-demo-5\" selectedValue={value} onInput={setValue}>\n    <InputGroup>\n        <Radio index={0} value=\"value1\" labelPosition=\"start\">Radio #1</Radio>\n        <Radio index={1} value=\"value2\" labelPosition=\"hidden\">Radio #2</Radio>\n        <Radio index={2} value=\"value3\" labelPosition=\"end\">Radio #3</Radio>\n    </InputGroup>\n</RadioGroup>")),
                v$1("hr", null),
                v$1(CardElement, { type: "subtitle", tag: "h3" }, "Labels"),
                v$1(CardElement, null,
                    "By default, the label is positioned after the checkbox, radio, or switch.  You can change this with ",
                    v$1("code", null, "labelPosition"),
                    "."),
                v$1(CardElement, null,
                    "Note that the ",
                    v$1("code", null, "start"),
                    " label position only has any visual effect while in an ",
                    v$1("code", null, "InputGroup"),
                    ", as Bootstrap places \"naked\" checkboxes and such in the margin area before the label no matter what order they come in the DOM."),
                v$1(CardElement, null,
                    v$1(RadioGroup, { name: "radio-demo-6", selectedValue: labelPosition, onInput: setLabelPosition, labelPosition: labelPosition },
                        v$1(Radio, { labelPosition: labelPosition, index: 0, value: "start" }, "Before"),
                        v$1(Radio, { labelPosition: labelPosition, index: 1, value: "end" }, "After"),
                        v$1(Radio, { labelPosition: labelPosition, index: 2, value: "hidden" }, "Hidden (still announced verbally)"))),
                v$1(CardElement, null,
                    v$1(InputGrid, null,
                        v$1(InputGroup, null,
                            v$1(Checkbox, { labelPosition: labelPosition, checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox")),
                        v$1(InputGroup, null,
                            v$1(Switch, { labelPosition: labelPosition, checked: demoChecked, onInput: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
                        v$1(RadioGroup, { name: "radio-demo-7", selectedValue: demoRadio, onInput: usesAsync ? asyncRadioInput : setDemoRadio },
                            v$1(InputGroup, null,
                                v$1(Radio, { labelPosition: labelPosition, index: 0, value: 0 }, "Radio #1")),
                            v$1(InputGroup, null,
                                v$1(Radio, { labelPosition: labelPosition, index: 1, value: 1 }, "Radio #2")),
                            v$1(InputGroup, null,
                                v$1(Radio, { labelPosition: labelPosition, index: 2, value: 2 }, "Radio #3"))))))));
    }
    function sleep$3(arg0) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, arg0); })];
            });
        });
    }

    function DemoInputs() {
        var _this = this;
        var _a = useState(false), asyncFails = _a[0], setAsyncFails = _a[1];
        var _b = useState(3000), asyncTimeout = _b[0], setAsyncTimeout = _b[1];
        var _c = useState(true), usesAsync = _c[0], setUsesAsync = _c[1];
        var _d = useState(""), text = _d[0], setText = _d[1];
        var _e = useState(0), number = _e[0], setNumber = _e[1];
        var asyncTextInput = A$1(function (text) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep$2(asyncTimeout)];
                    case 1:
                        _a.sent();
                        if (asyncFails)
                            throw new Error("Attempt to change text failed");
                        setText(text);
                        return [2 /*return*/];
                }
            });
        }); }, [asyncTimeout, asyncFails]);
        var asyncNumberInput = A$1(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep$2(asyncTimeout)];
                    case 1:
                        _a.sent();
                        if (asyncFails)
                            throw new Error("Attempt to change number failed");
                        setNumber(value);
                        return [2 /*return*/];
                }
            });
        }); }, [asyncTimeout, asyncFails]);
        var onTextInput = usesAsync ? asyncTextInput : setText;
        var onNumberInput = usesAsync ? asyncNumberInput : setNumber;
        return (v$1("div", { class: "demo" },
            v$1(Card, null,
                v$1(CardElement, { type: "title", tag: "h2" }, "Text boxes"),
                v$1(CardElement, null,
                    v$1("div", { class: "position-relative" },
                        v$1(Input, { type: "text", value: text, onInput: onTextInput }, "I'm a text box"))),
                v$1(CardElement, null,
                    v$1("code", null, "<Input>"),
                    " components allow for inputting text, numbers, etc. and asyncronously saving it somewhere else as it's being typed."),
                v$1(CardElement, { type: "subtitle", tag: "h3" }, "Async inputs"),
                v$1(CardElement, null,
                    "The ",
                    v$1("code", null, "onInput"),
                    " event handler for all types of inputs can be sync or async.",
                    v$1(InputGrid, null,
                        v$1(InputGroup, null,
                            v$1(Checkbox, { onInput: setUsesAsync, checked: usesAsync, labelPosition: "start" }, "Async event handler")),
                        v$1(InputGroup, null,
                            v$1(Checkbox, { onInput: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync }, "Async handler rejects")),
                        v$1(InputGroup, null,
                            v$1(Input, { disabled: !usesAsync, type: "number", onInput: setAsyncTimeout, value: asyncTimeout }, "Async timeout")))),
                v$1(CardElement, null,
                    v$1("div", { class: "position-relative" },
                        v$1(Input, { type: "text", value: text, onInput: onTextInput }, "Text-based input")),
                    v$1("div", { class: "position-relative" },
                        v$1(Input, { type: "number", value: number, onInput: onNumberInput, min: -5 }, "Number-based input"))),
                v$1(CardElement, { type: "paragraph" },
                    v$1("code", null, "<Input type=\"text\" value={text} onInput={onTextInput}>Text-based input</Input>\n<Input type=\"number\" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input>")),
                v$1(CardElement, { type: "paragraph" },
                    "When placed in an ",
                    v$1("code", null, "<InputGroup>"),
                    ", the styling will be significantly different:"),
                v$1(CardElement, null,
                    v$1(InputGrid, null,
                        v$1(InputGroup, null,
                            v$1(Input, { type: "text", value: text, onInput: onTextInput }, "Text-based input")),
                        v$1(InputGroup, null,
                            v$1(Input, { type: "number", value: number, onInput: onNumberInput, min: -5 }, "Number-based input")))),
                v$1(CardElement, { type: "paragraph" },
                    v$1("code", null, "<InputGrid>\n    <InputGroup><Input type=\"text\" value={text} onInput={onTextInput}>Text-based input</Input></InputGroup>\n    <InputGroup><Input type=\"number\" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input></InputGroup>\n</InputGrid>")))));
    }
    function sleep$2(arg0) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, arg0); })];
            });
        });
    }

    function DemoLayout() {
        return (v$1("div", { class: "demo" },
            v$1(Card, null,
                v$1(CardElement, { type: "title", tag: "h2" }, "Layout"),
                v$1(CardElement, null, "Inputs offer various ways that they can b"),
                v$1(CardElement, { type: "subtitle", tag: "h3" },
                    v$1("code", null, "<InputGroup>")),
                v$1(CardElement, null,
                    "All input types, from checkboxes to number inputs, can be placed within an ",
                    v$1("code", null, "<InputGrid>"),
                    " to give an alternate styling to the default \"free floating\" style."),
                v$1(CardElement, null,
                    "In addition, to help with alignment, a set of ",
                    v$1("code", null, "InputGroup"),
                    "s can also be placed within an ",
                    v$1("code", null, "InputGrid"),
                    " to manage simple cases."),
                v$1(CardElement, null,
                    "With an ",
                    v$1("code", null, "<InputGrid>"),
                    ":",
                    v$1(InputGrid, null,
                        v$1(InputGroup, null,
                            v$1(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Checkbox")),
                        v$1(InputGroup, null,
                            v$1(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Another checkbox")),
                        v$1(InputGroup, null,
                            v$1(Input, { disabled: true, onInput: function () { }, type: "number", value: 0 }, "Numeric input")))),
                v$1(CardElement, null,
                    "Without an ",
                    v$1("code", null, "<InputGrid>"),
                    ":",
                    v$1(InputGroup, null,
                        v$1(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Checkbox")),
                    v$1(InputGroup, null,
                        v$1(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Another checkbox")),
                    v$1(InputGroup, null,
                        v$1(Input, { disabled: true, onInput: function () { }, type: "number", value: 0 }, "Numeric input"))),
                v$1(CardElement, { type: "subtitle", tag: "h3" }, "Simple grids"),
                v$1(CardElement, null,
                    "Two different grid components are provided for two separate use cases:",
                    v$1("ul", null,
                        v$1("li", null,
                            "<",
                            v$1("code", null, "GridResponsive"),
                            ">, which takes a minimum column size and fits as many columns as possible given that constraint"),
                        v$1("li", null,
                            "<",
                            v$1("code", null, "GridStatic"),
                            ">, which takes a minimum column count and fits that many columns in no matter the resulting size and/or jankiness"))))));
    }

    D$1(null);
    D$1(null); // This is the hook that rows use for navigation

    D$1(null); // This is the hook that cells use for navigation

    D$1(null);
    D$1(null);
    D$1(null); // This is, internally, what the header cell calls when the user clicks it.
    // The body creates it--it sorts the known rows and updates the children.

    D$1(null); // This is used by the body. It creates the sort handler, but in order
    // to get it to the head, where the clickable header cells are, we need
    // this Context, used by the parent Table, to fascilitate communication.

    D$1(null);
    const LocationPriority = {
      "head": 0,
      "body": 1,
      "foot": 2
    };
    function useTable({}) {
      const [sortedColumn, setSortedColumn] = useState(null);
      const {
        useManagedChild: useManagedHeaderCellChild,
        managedChildren: managedHeaderCells
      } = useChildManager();
      const {
        focusedInner,
        useHasFocusProps
      } = useHasFocus(); // Whenever any given header cell requests a sort, it sets itself here, in the table,
      // as the "sortedColumn" column.  We then, as the parent table, let all the other
      // header rows know who is the "sortedColumn" column so that they can un-style themselves.

      y(() => {
        if (sortedColumn != null) {
          Object.entries(managedHeaderCells).forEach(([index, cell]) => {
            cell.setSortedColumn(sortedColumn);
          });
        }
      }, [sortedColumn]); // This is the one that's used for the button in the table head
      ///const [internalSortHandler, setInternalSortHandler] = useState<null | ((column: number, direction: "ascending" | "descending") => (Promise<void> | void))>(null);

      const mangleMap = s(new Map());
      const demangleMap = s(new Map());
      const indexMangler = A$1(n => {
        var _mangleMap$current$ge;

        return (_mangleMap$current$ge = mangleMap.current.get(n)) !== null && _mangleMap$current$ge !== void 0 ? _mangleMap$current$ge : n;
      }, []);
      const indexDemangler = A$1(n => {
        var _demangleMap$current$;

        return (_demangleMap$current$ = demangleMap.current.get(n)) !== null && _demangleMap$current$ !== void 0 ? _demangleMap$current$ : n;
      }, []);
      const {
        cellIndex,
        rowIndex,
        rowCount,
        useGridNavigationRow,
        managedRows
      } = useGridNavigation({
        focusOnChange: focusedInner,
        indexMangler,
        indexDemangler
      }); //const forceUpdate = useForceUpdate();

      const [i, setI] = useState(0); // This hooks up to internalSortHandler, used by the table head.

      const sort = A$1((column, direction) => {
        let sortedRows = managedRows.slice().sort((lhsRow, rhsRow) => {
          if (lhsRow.location != rhsRow.location) {
            var _LocationPriority$lhs, _LocationPriority$rhs;

            return ((_LocationPriority$lhs = LocationPriority[lhsRow.location]) !== null && _LocationPriority$lhs !== void 0 ? _LocationPriority$lhs : -1) - ((_LocationPriority$rhs = LocationPriority[rhsRow.location]) !== null && _LocationPriority$rhs !== void 0 ? _LocationPriority$rhs : -1);
          } else if (lhsRow.location === "head" || lhsRow.location === "foot") {
            // Rows in the header and footer are never sorted -- they always remain in their position.
            console.assert(rhsRow.location === "head" || rhsRow.location === "foot");
            return lhsRow.index - rhsRow.index;
          } else if (lhsRow.location === "body") {
            var _lhsRow$getManagedCel, _lhsRow$getManagedCel2, _rhsRow$getManagedCel, _rhsRow$getManagedCel2;

            console.assert(rhsRow.location === "body");
            let result = compare((_lhsRow$getManagedCel = lhsRow.getManagedCells()) === null || _lhsRow$getManagedCel === void 0 ? void 0 : (_lhsRow$getManagedCel2 = _lhsRow$getManagedCel[column]) === null || _lhsRow$getManagedCel2 === void 0 ? void 0 : _lhsRow$getManagedCel2.literalValue, (_rhsRow$getManagedCel = rhsRow.getManagedCells()) === null || _rhsRow$getManagedCel === void 0 ? void 0 : (_rhsRow$getManagedCel2 = _rhsRow$getManagedCel[column]) === null || _rhsRow$getManagedCel2 === void 0 ? void 0 : _rhsRow$getManagedCel2.literalValue);
            if (direction[0] == "d") return -result;
          }

          console.assert(false);
          return 0;
        }); // Go through each DOM row in the table

        for (let literalIndex = 0; literalIndex < sortedRows.length; ++literalIndex) {
          // Get the row that should be shown instead of this one
          const overriddenIndex = sortedRows[literalIndex].index; // Let the DOM-based row know that it's showing a different row

          managedRows[literalIndex].setRowIndexAsSorted(overriddenIndex);
          mangleMap.current.set(literalIndex, overriddenIndex);
          demangleMap.current.set(overriddenIndex, literalIndex); //managedRows[literalIndex].overriddenRowIndex = overriddenIndex;
        }

        setSortedColumn(column);
        setI(i => ++i);
      }, [
        /* Must remain stable */
      ]);

      function useTableProps({
        role,
        ...props
      }) {
        return useHasFocusProps(useMergedProps()({
          role: "group"
        }, props));
      }

      const useTableRow = A$1(({
        index: rowIndexAsUnsorted,
        location
      }) => {
        const getManagedCells = useStableCallback(() => managedCells);
        const [rowIndexAsSorted, setRowIndexAsSorted, getRowIndexAsSorted] = useState(rowIndexAsUnsorted);
        const {
          useGridNavigationCell,
          useGridNavigationRowProps,
          cellCount,
          isTabbableRow,
          managedCells,
          tabbableCell
        } = useGridNavigationRow({
          index: rowIndexAsUnsorted,
          getManagedCells,
          getRowIndexAsSorted,
          setRowIndexAsSorted,
          location
        });
        const useTableCellShared = A$1(({
          index: columnIndex,
          literalValue
        }) => {
          const {
            tabbable,
            useGridNavigationCellProps
          } = useGridNavigationCell({
            index: columnIndex,
            literalValue,
            text: null
          });

          function useTableCellProps({
            role,
            ...props
          }) {
            return useGridNavigationCellProps(useMergedProps()({
              role: "gridcell"
            }, props));
          }

          function useTableCellDelegateProps({
            role,
            ...props
          }) {
            return useGridNavigationCellProps(props);
          }

          return {
            useTableCellProps,
            useTableCellDelegateProps
          };
        }, []);
        const useTableHeadCell = A$1(({
          index: columnIndex,
          literalValue,
          unsortable
        }) => {
          const {
            useTableCellDelegateProps,
            useTableCellProps
          } = useTableCellShared({
            index: columnIndex,
            literalValue
          }); // Header cell stuff

          const [sortDirection, setSortDirection, getSortDirection] = useState(null);
          const [isTheSortedColumn, setIsTheSortedColumn] = useState(false);
          const random = s(generateRandomId());
          const {
            element,
            getElement,
            useManagedChildProps
          } = useManagedHeaderCellChild({
            index: random.current,
            setSortedColumn: A$1(c => {
              setIsTheSortedColumn(c === columnIndex);
            }, [columnIndex])
          });
          y(() => {
            if (!isTheSortedColumn) setSortDirection(null);
          }, [isTheSortedColumn]);
          const onSortClick = A$1(() => {
            let nextSortDirection = getSortDirection();
            if (nextSortDirection === "ascending") nextSortDirection = "descending";else nextSortDirection = "ascending";
            setSortDirection(nextSortDirection);
            sort(columnIndex, nextSortDirection);
          }, []);

          function useTableHeadCellProps(props) {
            const m = useTableCellProps(useButtonLikeEventHandlers("th", unsortable ? null : onSortClick, undefined)(useMergedProps()({
              role: "columnheader"
            }, props)));
            return useManagedChildProps(m);
          }

          return {
            useTableHeadCellProps,
            useTableHeadCellDelegateProps: useTableCellDelegateProps,
            sortDirection
          };
        }, []);
        const useTableCell = A$1(({
          index: columnIndex,
          literalValue
        }) => {
          const {
            useTableCellDelegateProps,
            useTableCellProps
          } = useTableCellShared({
            index: columnIndex,
            literalValue
          });
          return {
            useTableCellProps,
            useTableCellDelegateProps
          };
        }, []);

        function useTableRowProps({
          role,
          ...props
        }) {
          return useGridNavigationRowProps(useMergedProps()({
            role: "row"
          }, props));
        }

        return {
          useTableCell,
          useTableRowProps,
          useTableHeadCell
        };
      }, []);
      const useTableHead = A$1(function useTableHead({}) {
        return {
          useTableHeadProps: A$1(props => useMergedProps()({
            role: "rowgroup"
          }, props), [])
        };
      }, []);
      const useTableBody = A$1(function useTableBody({}) {
        return {
          useTableBodyProps: A$1(props => useMergedProps()({
            role: "rowgroup"
          }, props), [])
        };
      }, []);
      const useTableFoot = A$1(function useTableFoot({}) {
        return {
          useTableFootProps: A$1(props => useMergedProps()({
            role: "rowgroup"
          }, props), [])
        };
      }, []);
      return {
        useTableProps,
        useTableHead,
        useTableBody,
        useTableFoot,
        useTableRow,
        managedRows
      };
    }
    const TableHeadContext = D$1(null);
    const TableBodyContext = D$1(null);
    const TableFootContext = D$1(null);
    const TableRowContext = D$1(null);
    const ManagedRowsContext = D$1([]);
    const Table = forwardElementRef(function Table({
      children,
      small,
      striped,
      hoverable,
      border,
      variant,
      borderColor,
      ...props
    }, ref) {
      const {
        useTableProps,
        useTableBody,
        useTableFoot,
        useTableHead,
        useTableRow,
        managedRows
      } = useTable({});
      return v$1("table", { ...useTableProps(useMergedProps()({
          ref,
          className: clsx("table", small && "table-sm", striped && "table-striped", hoverable && "table-hover", border === "all" && "table-bordered", border === "none" && "table-borderless", variant && `table-${variant}`, borderColor && `border-${borderColor}`)
        }, props))
      }, v$1(TableHeadContext.Provider, {
        value: useTableHead
      }, v$1(TableBodyContext.Provider, {
        value: useTableBody
      }, v$1(TableFootContext.Provider, {
        value: useTableFoot
      }, v$1(TableRowContext.Provider, {
        value: useTableRow
      }, v$1(ManagedRowsContext.Provider, {
        value: managedRows
      }, children))))));
    });
    const CellLocationContext = D$1(null);
    const TableHead = forwardElementRef(function TableHead({
      children,
      variant,
      ...props
    }, ref) {
      const useTableHead = F(TableHeadContext);
      const {
        useTableHeadProps
      } = useTableHead({});
      return v$1(CellLocationContext.Provider, {
        value: "head"
      }, v$1("thead", { ...useTableHeadProps(useMergedProps()({
          ref,
          className: clsx(variant && `table-${variant}`)
        }, props))
      }, children));
    });

    function compare(lhs, rhs) {
      return compare1(lhs, rhs);

      function compare3(lhs, rhs) {
        // Coerce strings to numbers if they seem to stay the same when serialized
        if (`${+lhs}` === lhs) lhs = +lhs;
        if (`${+rhs}` === rhs) rhs = +rhs; // At this point, if either argument is a string, turn the other one into one too

        if (typeof lhs === "string") rhs = `${rhs}`;
        if (typeof rhs === "string") lhs = `${lhs}`;
        console.assert(typeof lhs === typeof rhs);
        if (typeof lhs === "string") return lhs.localeCompare(rhs);
        if (typeof lhs === "number") return +lhs - +rhs;
        return 0;
      }

      function compare2(lhs, rhs) {
        if (typeof lhs === "boolean" || lhs instanceof Date) lhs = +lhs;
        if (typeof rhs === "boolean" || rhs instanceof Date) rhs = +rhs;
        return compare3(lhs, rhs);
      }

      function compare1(lhs, rhs) {
        if (lhs == null && rhs == null) {
          // They're both null
          return 0;
        } else if (lhs == null || rhs == null) {
          // One of the two is null -- easy case
          return lhs != null ? 1 : -1;
        }

        return compare2(lhs, rhs);
      }
    }

    const TableBody = forwardElementRef(function TableBody({
      children,
      variant,
      ...props
    }, ref) {
      const useTableBody = F(TableBodyContext);
      const {
        useTableBodyProps
      } = useTableBody({});
      const managedRows = F(ManagedRowsContext);

      function ensortenChild(literalIndex) {
        var _managedRows$literalI, _managedRows$literalI2;

        const sortedIndex = (_managedRows$literalI = (_managedRows$literalI2 = managedRows[literalIndex]) === null || _managedRows$literalI2 === void 0 ? void 0 : _managedRows$literalI2.getRowIndexAsSorted()) !== null && _managedRows$literalI !== void 0 ? _managedRows$literalI : literalIndex;
        const C = children[literalIndex].type;
        const {
          index,
          ...props
        } = children[literalIndex].props;
        let ret = v$1(C, {
          key: sortedIndex,
          index: sortedIndex,
          ...props
        });
        return ret;
      }

      return v$1(CellLocationContext.Provider, {
        value: "body"
      }, v$1("tbody", { ...useTableBodyProps(useMergedProps()({
          ref,
          className: clsx(variant && `table-${variant}`)
        }, props))
      }, v$1(d$1, null, children.map((tableRow, i) => {
        return ensortenChild(i);
      }))));
    });
    forwardElementRef(function TableFoot({
      children,
      variant,
      ...props
    }, ref) {
      const useTableFoot = F(TableFootContext);
      const {
        useTableFootProps
      } = useTableFoot({});
      return v$1(CellLocationContext.Provider, {
        value: "foot"
      }, v$1("tfoot", { ...useTableFootProps(useMergedProps()({
          ref,
          className: clsx(variant && `table-${variant}`)
        }, props))
      }, children));
    });
    const TableCellContext = D$1(null);
    const TableHeadCellContext = D$1(null);
    const TableRow = g(forwardElementRef(function TableRow({
      children,
      index: indexAsUnsorted,
      variant,
      ...props
    }, ref) {
      //const isInTHead = useContext(CellIsInHeaderContext);
      const location = F(CellLocationContext);
      const useTableRow = F(TableRowContext);
      const {
        useTableCell,
        useTableHeadCell,
        useTableRowProps
      } = useTableRow({
        index: indexAsUnsorted,
        location
      });
      const rowProps = {
        children,
        ...useTableRowProps(useMergedProps()({
          ref,
          className: clsx(variant && `table-${variant}`)
        }, props))
      }; //const Provider = !isInTHead ? UseBodyGridNavigationCellContext.Provider : UseHeadGridNavigationCellContext.Provider as typeof UseBodyGridNavigationCellContext["Provider"];

      return v$1(TableCellContext.Provider, {
        value: useTableCell
      }, v$1(TableHeadCellContext.Provider, {
        value: useTableHeadCell
      }, v$1("tr", { ...useTableRowProps(rowProps)
      }, children)));
    }));
    D$1(null);
    const TableCell = g(forwardElementRef(function TableCell({
      value: valueAsUnsorted,
      colSpan,
      children,
      index,
      variant,
      focus,
      active,
      ...props
    }, ref) {
      var _focus;

      (_focus = focus) !== null && _focus !== void 0 ? _focus : focus = "cell";
      const useTableCell = F(TableCellContext);
      const {
        useTableCellDelegateProps,
        useTableCellProps
      } = useTableCell({
        index,
        literalValue: valueAsUnsorted
      });
      const childrenReceiveFocus = children && typeof children != "string" && typeof children != "number" && typeof children != "boolean" && !Array.isArray(children) && children.type !== d$1; //const isFocusbleChildren = 

      const displayValue = children !== null && children !== void 0 ? children : valueAsUnsorted;
      const cellProps = useTableCellProps({
        ref,
        colSpan,
        role: "gridcell",
        className: clsx(variant && `table-${variant}`)
      });

      if (childrenReceiveFocus) {
        const p1 = useMergedProps()(useTableCellDelegateProps({}), props);
        return v$1("td", { ...cellProps
        }, B(children, p1));
      } else {
        const p2 = useMergedProps()(useTableCellDelegateProps(cellProps), props);
        return v$1("td", { ...p2
        }, stringify(displayValue));
      }
    }));
    const TableHeaderCell = forwardElementRef(function TableHeaderCell({
      index,
      focus,
      children,
      variant,
      active,
      unsortable,
      ...props
    }, ref) {
      var _focus2;

      (_focus2 = focus) !== null && _focus2 !== void 0 ? _focus2 : focus = "cell";
      const useTableHeadCell = F(TableHeadCellContext);
      const {
        useTableHeadCellDelegateProps,
        useTableHeadCellProps,
        sortDirection
      } = useTableHeadCell({
        index,
        literalValue: ""
      });
      const {
        hovering,
        useIsHoveringProps
      } = useIsHovering();
      const cellProps = useTableHeadCellProps(useIsHoveringProps(useMergedProps()({
        ref,
        role: "columnheader",
        className: clsx(variant && `table-${variant}`, unsortable && "unsortable")
      }, props)));
      const sortIcon = v$1(Swappable, null, v$1("div", { ...{
          class: clsx("table-sort-icon-container")
        }
      }, v$1(Flip, {
        flipAngleInline: 180,
        open: sortDirection == "descending"
      }, v$1("div", {
        class: "bi bi-sort-up"
      })), v$1(Flip, {
        flipAngleInline: 180,
        open: hovering && sortDirection == null || sortDirection == "ascending"
      }, v$1("div", {
        class: "bi bi-sort-down-alt"
      }))));

      if (focus === "child") {
        return v$1("th", { ...cellProps
        }, v$1("div", {
          class: "th-spacing"
        }, B(children, useTableHeadCellDelegateProps({}), children.props.children), sortIcon));
      } else {
        return v$1("th", { ...useTableHeadCellDelegateProps(cellProps)
        }, v$1("div", {
          class: "th-spacing"
        }, children, sortIcon));
      }
    });

    function useIsHovering() {
      const [hovering, setHovering] = useState(false);
      const onMouseEnter = A$1(() => {
        setHovering(true);
      }, []);
      const onMouseLeave = A$1(() => {
        setHovering(false);
      }, []);
      useGlobalHandler(window, "blur", onMouseLeave);
      return {
        hovering,
        useIsHoveringProps: props => useMergedProps()({
          onMouseEnter,
          onMouseLeave
        }, props)
      };
    }

    function stringify(value) {
      if (value == null) return null;
      if (value instanceof Date || ["boolean", "string", "number"].includes(typeof value)) return `${value}`;
      return value;
    }

    var RandomWords$1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");
    var formatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" });
    function RandomRow(_a) {
        var _this = this;
        var index = _a.index;
        var w = RandomWords$1[index];
        var n = Math.pow((index + 0), 2);
        var d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + n * 7);
        var _b = useState(false), checked = _b[0], setChecked = _b[1];
        var onInput = A$1(function (checked) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep$1(2000)];
                    case 1:
                        _a.sent();
                        setChecked(checked);
                        return [2 /*return*/];
                }
            });
        }); }, [index]);
        return (v$1(TableRow, { index: index },
            v$1(TableCell, { index: 0, value: n, colSpan: !w ? 2 : undefined }),
            w && v$1(TableCell, { index: 1, value: w }),
            v$1(TableCell, { index: 2, value: d }, formatter.format(d)),
            v$1(TableCell, { index: 3, value: checked },
                v$1(Checkbox, { checked: checked, onInput: onInput, labelPosition: "hidden" }, "Demo table checkbox"))));
    }
    function DemoTable() {
        var _a = useState(5), rowCount = _a[0], setRowCount = _a[1];
        return (v$1("div", { class: "demo" },
            v$1(Card, null,
                v$1(CardElement, { type: "title", tag: "h2" }, "Table"),
                v$1(CardElement, null,
                    "Tables allow for automatic display, navigation, and sorting of data.  All data is provided by the children and you don't need to provide a data structure to the parent ",
                    v$1("code", null, "Table"),
                    " element, and by default all columns are sortable."),
                v$1(CardElement, null,
                    "All ",
                    v$1("code", null, "TableCell"),
                    "s must be given a ",
                    v$1("code", null, "value"),
                    " prop that represents its data.  This can be anything from a string to a number to a Date, and it controls how, when that column is sorted, it is compared against its siblings."),
                v$1(CardElement, null,
                    "A ",
                    v$1("code", null, "<TableCell>"),
                    " will, by default, just display its ",
                    v$1("code", null, "value"),
                    ". If you need to show something different, format the value, etc. just pass the value you'd like to show instead as a child.  Children will take priority over ",
                    v$1("code", null, "value"),
                    " in terms of what to display, but sorting will be entirely unaffected by this, relying solely on the ",
                    v$1("code", null, "value"),
                    " prop."),
                v$1(CardElement, null,
                    "However, please note that if you pass a child component to a ",
                    v$1("code", null, "TableCell"),
                    ", it will be put in charge of that cell's navigation and focus management, ",
                    v$1("strong", null, "so it needs to be a component that accepts and forwards onwards all incoming props and refs"),
                    ". (Fragments as an immediate child are an exception and are fine to use)",
                    v$1("code", null, "// The table cell itself will receive focus:\n<TableCell>Text</TableCell>\n<TableCell>0</TableCell>\n<TableCell><>Text</></TableCell>\n\n// The table cell will delegate focus to its contents instead:\n<TableCell><div>Text</div></TableCell>\n<TableCell><Input type=\"...\" {...} /></TableCell>\n\n// \u274C The cell will try to focus the child but it'll never receive the message!\n<TableCell>{(props) => \"text\"}</TableCell>\n\n// \u2705 The cell can properly delegate all duties to the child DIV.\n<TableCell>{forwardRef((p, ref) => <div ref={ref} {...p}>\"text\"</p>)}</TableCell>")),
                v$1(CardElement, null,
                    v$1(Input, { type: "number", value: rowCount, min: 0, max: 255, onInput: setRowCount }, "Row count")),
                v$1(CardElement, null,
                    v$1(Table, null,
                        v$1(TableHead, null,
                            v$1(TableRow, { index: 0 },
                                v$1(TableHeaderCell, { index: 0 }, "Number"),
                                v$1(TableHeaderCell, { index: 1 }, "String"),
                                v$1(TableHeaderCell, { index: 2 }, "Date"),
                                v$1(TableHeaderCell, { index: 3 }, "Checkbox"))),
                        v$1(TableBody, null, Array.from(function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < rowCount)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, v$1(RandomRow, { key: i, index: i })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        ++i;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }())))),
                v$1(CardElement, null,
                    v$1("code", null, "<Table>\n    <TableHead>\n        <TableRow index={0}>\n            <TableHeaderCell index={1}>Number</TableHeaderCell>\n            <TableHeaderCell index={0}>String</TableHeaderCell>\n            <TableHeaderCell index={2}>Date</TableHeaderCell>\n            <TableHeaderCell index={3}>Checkbox</TableHeaderCell>\n        </TableRow>\n    </TableHead>\n    <TableBody>\n\n        <TableRow index={0}>\n            <TableCell index={0} value={RandomWords[index]} />\n            <TableCell index={1} value={n} />\n            <TableCell index={2} value={d}>{d.toLocaleString()}</TableCell>\n            <TableCell index={3} value={checked}>\n                <Checkbox checked={checked} onInput={onInput} labelPosition=\"hidden\">Demo table checkbox</Checkbox>\n            </TableCell>\n        </TableRow>\n\n        <TableRow index={1} />\n        <TableRow index={2} />\n        <TableRow index={3} />\n        <TableRow index={4} />\n\n    </TableBody>\n</Table>")))));
    }
    function sleep$1(arg0) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, arg0); })];
            });
        });
    }

    var RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");
    g(function (_a) {
        var depth = _a.depth;
        var _b = useState(false), active = _b[0], setActive = _b[1];
        var useFocusTrapProps = useFocusTrap({ trapActive: active }).useFocusTrapProps;
        //const { useRovingTabIndexChild, useRovingTabIndexProps } = useRovingTabIndex<HTMLUListElement, RovingTabIndexChildInfo>({ tabbableIndex, focusOnChange: false });
        var divProps = useFocusTrapProps({ ref: undefined, className: "focus-trap-demo" });
        if (depth == 2)
            return v$1("div", null);
        return (v$1("div", { className: "demo" },
            v$1("label", null,
                "Active: ",
                v$1("input", { type: "checkbox", checked: active, onInput: function (e) { e.preventDefault(); setActive(e.currentTarget.checked); } })),
            v$1("div", __assign({}, divProps),
                v$1(DemoUseFocusTrapChild, { active: active, setActive: setActive, depth: depth !== null && depth !== void 0 ? depth : 0 }))));
    });
    var DemoUseFocusTrapChild = g(function (_a) {
        var setActive = _a.setActive, active = _a.active; _a.depth;
        return (v$1(d$1, null,
            v$1("button", null, "Button 1"),
            v$1("button", null, "Button 2"),
            v$1("button", null, "Button 3"),
            v$1("label", null,
                "Active: ",
                v$1("input", { type: "checkbox", checked: active, onInput: function (e) { e.preventDefault(); setActive(e.currentTarget.checked); } }))));
    });
    var DemoDialog = g(function () {
        var onClose = (function () { return setOpen(false); });
        var _a = useState(false), open = _a[0], setOpen = _a[1];
        return (v$1("div", { class: "demo" },
            v$1(Tooltip, { tooltip: "Open dialog", position: "block-start", Transition: ZoomFade, zoomOriginDynamic: 0, zoomMin: 0.85 },
                v$1(InputGroup, null,
                    v$1(Checkbox, { checked: open, onInput: setOpen }, "Open dialog"))),
            v$1(Dialog, { Transition: ClipFade, clipOriginBlock: 0, open: open, onClose: onClose, descriptive: false, title: "Dialog Title", footer: v$1("button", { onClick: onClose }, "Close") },
                v$1("p", { tabIndex: -1 }, "Dialog body content"),
                v$1("p", null, RandomWords.join(" ")),
                v$1("p", null, RandomWords.join(" ")),
                v$1("p", null, RandomWords.join(" ")),
                v$1("p", null, RandomWords.join(" ")),
                v$1("p", null, RandomWords.join(" ")))));
    });
    var DemoDrawer = g(function () {
        var onClose = (function () { return setOpen(false); });
        var _a = useState(false), open = _a[0], setOpen = _a[1];
        //open = true;
        return (v$1("div", { class: "demo" },
            v$1(Checkbox, { checked: open, onInput: setOpen }, "Open Drawer"),
            v$1(Drawer, { Transition: Slide, slideTargetInline: -1, open: open, onClose: onClose, descriptive: false, title: "Dialog Title" },
                v$1("p", { tabIndex: -1 }, "Dialog body content"),
                v$1("p", null, RandomWords.join(" ")),
                v$1("p", null, RandomWords.join(" ")),
                v$1("p", null, RandomWords.join(" ")))));
    });
    var DemoMenu = g(function () {
        return (v$1("div", { class: "demo" },
            v$1(Menu, { Transition: ZoomFade, zoomOriginDynamic: 0, zoomMin: 0.85, tag: "ul", anchor: v$1(Button, null, "Open menu") },
                v$1(MenuItem, { index: 0 }, "AItem #1"),
                v$1(MenuItem, { index: 1 }, "BItem #2"),
                v$1(MenuItem, { index: 2 }, "CItem #3"),
                v$1(MenuItem, { index: 3 }, "DItem #4"))));
    });
    g(function () {
        var _a = useHasFocus(), focused = _a.focused, focusedInner = _a.focusedInner, useHasFocusProps = _a.useHasFocusProps;
        return (v$1("div", { class: "demo" },
            v$1("h2", null, "useHasFocus"),
            v$1("div", __assign({}, useHasFocusProps({ style: { border: "1px solid black" }, tabIndex: 0 })),
                "Outer ",
                v$1("div", { tabIndex: 0, style: { border: "1px solid black" } }, "Inner element")),
            v$1("div", null,
                v$1("ul", null,
                    v$1("li", null,
                        "Strictly focused: ",
                        focused.toString()),
                    v$1("li", null,
                        "Inner focused: ",
                        focusedInner.toString())))));
    });
    var DemoTabs = g(function () {
        var _a = useState(0), selectedIndex = _a[0], setSelectedIndex = _a[1];
        var _b = useState("activate"), selectionMode = _b[0];
        return (v$1("div", { class: "demo" },
            v$1("div", null,
                v$1(Tabs, { orientation: "block", onSelect: setSelectedIndex, selectedIndex: selectedIndex, selectionMode: selectionMode, tag: "ol" },
                    v$1("ol", null,
                        v$1(Tab, { index: 0 }, "Tab #1"),
                        v$1(Tab, { index: 1 }, "Tab #2"),
                        v$1(Tab, { index: 2 }, "Tab #3")),
                    v$1(TabPanel, { index: 0, Transition: ZoomFade, zoomMin: 0.8, zoomOriginBlock: 0 },
                        v$1("div", null, RandomWords.slice(0, Math.floor((1 / 3) * RandomWords.length)).join(" "))),
                    v$1(TabPanel, { index: 1, Transition: ZoomFade, zoomMin: 0.8, zoomOriginBlock: 0 },
                        v$1("div", null, RandomWords.slice(0, Math.floor((2 / 3) * RandomWords.length)).join(" "))),
                    v$1(TabPanel, { index: 2, Transition: ZoomFade, zoomMin: 0.8, zoomOriginBlock: 0 },
                        v$1("div", null, RandomWords.slice(0, Math.floor((3 / 3) * RandomWords.length)).join(" ")))))));
    });
    g(function () {
        var _a = useAriaTooltip({}), useTooltip = _a.useTooltip, useTooltipTrigger = _a.useTooltipTrigger, isOpen = _a.isOpen;
        var useTooltipProps = useTooltip().useTooltipProps;
        var useTooltipTriggerProps = useTooltipTrigger().useTooltipTriggerProps;
        return (v$1("div", { class: "demo" },
            v$1("p", null,
                "This is a paragraph with a ",
                v$1("span", __assign({}, useTooltipTriggerProps({})), "tooltip right here."),
                v$1("span", __assign({}, useTooltipProps({ hidden: !isOpen })), "This is the tooltip content."))));
    });
    function sleep(ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /*
    const DemoButtons = memo(() => {
        const [buttonsFill, setButtonsFill] = useState<"fill" | "outline">("outline");
        const [buttonsSize, setButtonsSize] = useState<"sm" | "md" | "lg">("md");

        const pushToast = usePushToast();
        function onClick(str: string) {
            return async function onClick() {
                await sleep(5000);
                pushToast(<Toast>Button was clicked ({str})</Toast>)
            }
        }

        return (
            <div class="demo">

                <ButtonGroup>
                    <ButtonGroupChild index={0} onClick={() => setButtonsFill("fill")} pressed={buttonsFill === "fill"} colorVariant="primary">Fill</ButtonGroupChild>
                    <ButtonGroupChild index={1} onClick={() => setButtonsFill("outline")} pressed={buttonsFill === "outline"} colorVariant="primary">Outline</ButtonGroupChild>
                </ButtonGroup>

                <ProvideDefaultButtonFill value={buttonsFill}>
                    <ProvideDefaultButtonSize value={buttonsSize}>
                        <ButtonGroup>
                            <ButtonGroupChild onClick={onClick("primary")} index={0} tag="button" colorVariant="primary">Primary</ButtonGroupChild>
                            <ButtonGroupChild onClick={onClick("secondary")} index={1} tag="button" colorVariant="secondary">Secondary</ButtonGroupChild>
                            <ButtonGroupChild onClick={onClick("success")} index={2} tag="button" colorVariant="success">Success</ButtonGroupChild>
                            <ButtonGroupChild onClick={onClick("warning")} index={3} tag="button" colorVariant="warning">Warning</ButtonGroupChild>
                        </ButtonGroup>
                        <ButtonGroup>
                            <ButtonGroupChild onClick={onClick("danger")} index={0} tag="button" colorVariant="danger">Danger</ButtonGroupChild>
                            <ButtonGroupChild onClick={onClick("info")} index={1} tag="button" colorVariant="info">Info</ButtonGroupChild>
                            <ButtonGroupChild onClick={onClick("light")} index={2} tag="button" colorVariant="light">Light</ButtonGroupChild>
                            <ButtonGroupChild onClick={onClick("dark")} index={3} tag="button" colorVariant="dark">Dark</ButtonGroupChild>
                            <ButtonGroupChild tag="a" index={4} href="#" colorVariant="link">Link</ButtonGroupChild>
                        </ButtonGroup>
                    </ProvideDefaultButtonSize>
                </ProvideDefaultButtonFill>
            </div>
        )
    });*/
    var DemoAccordion = g(function () {
        var _a = useState(-1), expandedIndex = _a[0], setExpandedIndex = _a[1];
        return (v$1("div", { class: "demo" },
            v$1("div", null,
                v$1(Accordion, { expandedIndex: expandedIndex, setExpandedIndex: setExpandedIndex },
                    v$1(AccordionSection, { index: 0, header: "Accordion Item #1" },
                        v$1("div", null,
                            v$1("strong", null, "This is the 1st item's accordion body."),
                            " It is visible by default, You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ",
                            v$1("code", null, "AccordionSection"),
                            ".")),
                    v$1(AccordionSection, { index: 1, header: "Accordion Item #2" },
                        v$1("div", null,
                            v$1("strong", null, "This is the 2nd item's accordion body."),
                            " It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ",
                            v$1("code", null, "AccordionSection"),
                            ".")),
                    v$1(AccordionSection, { index: 2, header: "Accordion Item #3" },
                        v$1("div", null,
                            v$1("strong", null, "This is the 3rd item's accordion body."),
                            " It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ",
                            v$1("code", null, "AccordionSection"),
                            "."))))));
    });
    var DemoList = g(function () {
        var _a = useState(0), index = _a[0], setIndex = _a[1];
        return (v$1("div", { class: "demo" },
            "Selected: ",
            index,
            v$1(ListSingle, { select: "single", onSelect: setIndex, selectedIndex: index, selectionMode: "activate", tag: "ul" },
                v$1(ListItemSingle, { index: 0 }, "Primary"),
                v$1(ListItemSingle, { index: 1 }, "Secondary"),
                v$1(ListItemSingle, { index: 2 }, "Success"),
                v$1(ListItemSingle, { index: 3 }, "Warning"),
                v$1(ListItemSingle, { index: 4 }, "Danger"),
                v$1(ListItemSingle, { index: 5 }, "Info"),
                v$1(ListItemSingle, { index: 6 }, "Light"),
                v$1(ListItemSingle, { index: 7 }, "Dark"),
                v$1(ListItemSingle, { index: 8 }, "Link"))));
    });
    var DemoInput = g(function () {
        var _a = useState(""), text = _a[0], setText = _a[1];
        var _b = useState(""), radioValue = _b[0], setRadioValue = _b[1];
        var onInput1 = A$1(function (value) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep(5000)];
                    case 1:
                        _a.sent();
                        setText(value);
                        return [2 /*return*/];
                }
            });
        }); }, [setRadioValue]);
        var onInput2 = A$1(function (value) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep(5000)];
                    case 1:
                        _a.sent();
                        setRadioValue(value);
                        return [2 /*return*/];
                }
            });
        }); }, [setRadioValue]);
        return (v$1("div", { class: "demo" },
            v$1(InputGroup, null,
                v$1(Input, { type: "text", onInput: onInput1, value: text, width: "100%" }, "Test input")),
            v$1(RadioGroup, { selectedValue: radioValue, name: "demo-radio", onInput: onInput2 },
                v$1(InputGroup, null,
                    v$1(Radio, { index: 0, value: "ARadio" })),
                v$1(InputGroup, null,
                    v$1(Radio, { index: 1, value: "BRadio" })),
                v$1(InputGroup, null,
                    v$1(Radio, { index: 2, value: "CRadio" })))));
    });
    var Component = function () {
        return v$1(GridResponsive, { minWidth: "35em" },
            v$1(ToastsProvider, null,
                v$1(DemoTable, null),
                v$1(DemoButtons, null),
                v$1(DemoChecks, null),
                v$1(DemoInputs, null),
                v$1(DemoLayout, null),
                v$1(DemoAccordion, null),
                v$1(DemoDialog, null),
                v$1(DemoDrawer, null),
                v$1(DemoInput, null),
                v$1(DemoList, null),
                v$1(DemoTabs, null),
                v$1(DemoMenu, null)));
    };
    requestAnimationFrame(function () {
        S$1(v$1(Component, null), document.getElementById("root"));
    });

}());
