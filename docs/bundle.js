(function () {
	'use strict';

	var n$3,
	    l$3,
	    u$3,
	    t$3,
	    o$4,
	    r$3,
	    f$3,
	    e$4 = {},
	    c$3 = [],
	    s$3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

	function a$3(n, l) {
	  for (var u in l) n[u] = l[u];

	  return n;
	}

	function h$2(n) {
	  var l = n.parentNode;
	  l && l.removeChild(n);
	}

	function v$2(l, u, i) {
	  var t,
	      o,
	      r,
	      f = {};

	  for (r in u) "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

	  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n$3.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
	  return y$2(l, f, t, o, null);
	}

	function y$2(n, i, t, o, r) {
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
	    __v: null == r ? ++u$3 : r
	  };
	  return null == r && null != l$3.vnode && l$3.vnode(f), f;
	}

	function d$2(n) {
	  return n.children;
	}

	function _$2(n, l) {
	  this.props = n, this.context = l;
	}

	function k$2(n, l) {
	  if (null == l) return n.__ ? k$2(n.__, n.__.__k.indexOf(n) + 1) : null;

	  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

	  return "function" == typeof n.type ? k$2(n) : null;
	}

	function b$2(n) {
	  var l, u;

	  if (null != (n = n.__) && null != n.__c) {
	    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
	      n.__e = n.__c.base = u.__e;
	      break;
	    }

	    return b$2(n);
	  }
	}

	function m$2(n) {
	  (!n.__d && (n.__d = !0) && t$3.push(n) && !g$3.__r++ || r$3 !== l$3.debounceRendering) && ((r$3 = l$3.debounceRendering) || o$4)(g$3);
	}

	function g$3() {
	  for (var n; g$3.__r = t$3.length;) n = t$3.sort(function (n, l) {
	    return n.__v.__b - l.__v.__b;
	  }), t$3 = [], n.some(function (n) {
	    var l, u, i, t, o, r;
	    n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = a$3({}, t)).__v = t.__v + 1, j$3(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? k$2(t) : o, t.__h), z$2(u, t), t.__e != o && b$2(t)));
	  });
	}

	function w$3(n, l, u, i, t, o, r, f, s, a) {
	  var h,
	      v,
	      p,
	      _,
	      b,
	      m,
	      g,
	      w = i && i.__k || c$3,
	      A = w.length;

	  for (u.__k = [], h = 0; h < l.length; h++) if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? y$2(null, _, null, null, _) : Array.isArray(_) ? y$2(d$2, {
	    children: _
	  }, null, null, null) : _.__b > 0 ? y$2(_.type, _.props, _.key, null, _.__v) : _)) {
	    if (_.__ = u, _.__b = u.__b + 1, null === (p = w[h]) || p && _.key == p.key && _.type === p.type) w[h] = void 0;else for (v = 0; v < A; v++) {
	      if ((p = w[v]) && _.key == p.key && _.type === p.type) {
	        w[v] = void 0;
	        break;
	      }

	      p = null;
	    }
	    j$3(n, _, p = p || e$4, t, o, r, f, s, a), b = _.__e, (v = _.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, _), g.push(v, _.__c || b, _)), null != b ? (null == m && (m = b), "function" == typeof _.type && _.__k === p.__k ? _.__d = s = x$2(_, s, n) : s = P$2(n, _, p, w, b, s), "function" == typeof u.type && (u.__d = s)) : s && p.__e == s && s.parentNode != n && (s = k$2(p));
	  }

	  for (u.__e = m, h = A; h--;) null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = k$2(i, h + 1)), N$1(w[h], w[h]));

	  if (g) for (h = 0; h < g.length; h++) M$3(g[h], g[++h], g[++h]);
	}

	function x$2(n, l, u) {
	  for (var i, t = n.__k, o = 0; t && o < t.length; o++) (i = t[o]) && (i.__ = n, l = "function" == typeof i.type ? x$2(i, l, u) : P$2(u, i, i, t, i.__e, l));

	  return l;
	}

	function A$2(n, l) {
	  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
	    A$2(n, l);
	  }) : l.push(n)), l;
	}

	function P$2(n, l, u, i, t, o) {
	  var r, f, e;
	  if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
	    for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;

	    n.insertBefore(t, o), r = o;
	  }
	  return void 0 !== r ? r : t.nextSibling;
	}

	function C$2(n, l, u, i, t) {
	  var o;

	  for (o in u) "children" === o || "key" === o || o in l || H$2(n, o, null, u[o], i);

	  for (o in l) t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || H$2(n, o, l[o], u[o], i);
	}

	function $$2(n, l, u) {
	  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s$3.test(l) ? u : u + "px";
	}

	function H$2(n, l, u, i, t) {
	  var o;

	  n: if ("style" === l) {
	    if ("string" == typeof u) n.style.cssText = u;else {
	      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || $$2(n.style, l, "");
	      if (u) for (l in u) i && u[l] === i[l] || $$2(n.style, l, u[l]);
	    }
	  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? T$3 : I$2, o) : n.removeEventListener(l, o ? T$3 : I$2, o);else if ("dangerouslySetInnerHTML" !== l) {
	    if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
	      n[l] = null == u ? "" : u;
	      break n;
	    } catch (n) {}
	    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
	  }
	}

	function I$2(n) {
	  this.l[n.type + !1](l$3.event ? l$3.event(n) : n);
	}

	function T$3(n) {
	  this.l[n.type + !0](l$3.event ? l$3.event(n) : n);
	}

	function j$3(n, u, i, t, o, r, f, e, c) {
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
	      P,
	      C,
	      $ = u.type;
	  if (void 0 !== u.constructor) return null;
	  null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (s = l$3.__b) && s(u);

	  try {
	    n: if ("function" == typeof $) {
	      if (m = u.props, g = (s = $.contextType) && t[s.__c], x = s ? g ? g.props.value : s.__ : t, i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in $ && $.prototype.render ? u.__c = h = new $(m, x) : (u.__c = h = new _$2(m, x), h.constructor = $, h.render = O$1), g && g.sub(h), h.props = m, h.state || (h.state = {}), h.context = x, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != $.getDerivedStateFromProps && (h.__s == h.state && (h.__s = a$3({}, h.__s)), a$3(h.__s, $.getDerivedStateFromProps(m, h.__s))), y = h.props, p = h.state, v) null == $.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);else {
	        if (null == $.getDerivedStateFromProps && m !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, x), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, x) || u.__v === i.__v) {
	          h.props = m, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
	            n && (n.__ = u);
	          }), h.__h.length && f.push(h);
	          break n;
	        }

	        null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, x), null != h.componentDidUpdate && h.__h.push(function () {
	          h.componentDidUpdate(y, p, k);
	        });
	      }
	      if (h.context = x, h.props = m, h.__v = u, h.__P = n, A = l$3.__r, P = 0, "prototype" in $ && $.prototype.render) h.state = h.__s, h.__d = !1, A && A(u), s = h.render(h.props, h.state, h.context);else do {
	        h.__d = !1, A && A(u), s = h.render(h.props, h.state, h.context), h.state = h.__s;
	      } while (h.__d && ++P < 25);
	      h.state = h.__s, null != h.getChildContext && (t = a$3(a$3({}, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, p)), C = null != s && s.type === d$2 && null == s.key ? s.props.children : s, w$3(n, Array.isArray(C) ? C : [C], u, i, t, o, r, f, e, c), h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
	    } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L$2(i.__e, u, i, t, o, r, f, c);

	    (s = l$3.diffed) && s(u);
	  } catch (n) {
	    u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l$3.__e(n, u, i);
	  }
	}

	function z$2(n, u) {
	  l$3.__c && l$3.__c(u, n), n.some(function (u) {
	    try {
	      n = u.__h, u.__h = [], n.some(function (n) {
	        n.call(u);
	      });
	    } catch (n) {
	      l$3.__e(n, u.__v);
	    }
	  });
	}

	function L$2(l, u, i, t, o, r, f, c) {
	  var s,
	      a,
	      v,
	      y = i.props,
	      p = u.props,
	      d = u.type,
	      _ = 0;
	  if ("svg" === d && (o = !0), null != r) for (; _ < r.length; _++) if ((s = r[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
	    l = s, r[_] = null;
	    break;
	  }

	  if (null == l) {
	    if (null === d) return document.createTextNode(p);
	    l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), r = null, c = !1;
	  }

	  if (null === d) y === p || c && l.data === p || (l.data = p);else {
	    if (r = r && n$3.call(l.childNodes), a = (y = i.props || e$4).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c) {
	      if (null != r) for (y = {}, _ = 0; _ < l.attributes.length; _++) y[l.attributes[_].name] = l.attributes[_].value;
	      (v || a) && (v && (a && v.__html == a.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
	    }

	    if (C$2(l, p, y, o, c), v) u.__k = [];else if (_ = u.props.children, w$3(l, Array.isArray(_) ? _ : [_], u, i, t, o && "foreignObject" !== d, r, f, r ? r[0] : i.__k && k$2(i, 0), c), null != r) for (_ = r.length; _--;) null != r[_] && h$2(r[_]);
	    c || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && H$2(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && H$2(l, "checked", _, y.checked, !1));
	  }
	  return l;
	}

	function M$3(n, u, i) {
	  try {
	    "function" == typeof n ? n(u) : n.current = u;
	  } catch (n) {
	    l$3.__e(n, i);
	  }
	}

	function N$1(n, u, i) {
	  var t, o;

	  if (l$3.unmount && l$3.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M$3(t, null, u)), null != (t = n.__c)) {
	    if (t.componentWillUnmount) try {
	      t.componentWillUnmount();
	    } catch (n) {
	      l$3.__e(n, u);
	    }
	    t.base = t.__P = null;
	  }

	  if (t = n.__k) for (o = 0; o < t.length; o++) t[o] && N$1(t[o], u, "function" != typeof n.type);
	  i || null == n.__e || h$2(n.__e), n.__e = n.__d = void 0;
	}

	function O$1(n, l, u) {
	  return this.constructor(n, u);
	}

	function S$1(u, i, t) {
	  var o, r, f;
	  l$3.__ && l$3.__(u, i), r = (o = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], j$3(i, u = (!o && t || i).__k = v$2(d$2, null, [u]), r || e$4, e$4, void 0 !== i.ownerSVGElement, !o && t ? [t] : r ? null : i.firstChild ? n$3.call(i.childNodes) : null, f, !o && t ? t : r ? r.__e : i.firstChild, o), z$2(f, u);
	}

	function B(l, u, i) {
	  var t,
	      o,
	      r,
	      f = a$3({}, l.props);

	  for (r in u) "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

	  return arguments.length > 2 && (f.children = arguments.length > 3 ? n$3.call(arguments, 2) : i), y$2(l.type, f, t || l.key, o || l.ref, null);
	}

	function D$1(n, l) {
	  var u = {
	    __c: l = "__cC" + f$3++,
	    __: n,
	    Consumer: function (n, l) {
	      return n.children(l);
	    },
	    Provider: function (n) {
	      var u, i;
	      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
	        return i;
	      }, this.shouldComponentUpdate = function (n) {
	        this.props.value !== n.value && u.some(m$2);
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

	n$3 = c$3.slice, l$3 = {
	  __e: function (n, l, u, i) {
	    for (var t, o, r; l = l.__;) if ((t = l.__c) && !t.__) try {
	      if ((o = t.constructor) && null != o.getDerivedStateFromError && (t.setState(o.getDerivedStateFromError(n)), r = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), r = t.__d), r) return t.__E = t;
	    } catch (l) {
	      n = l;
	    }

	    throw n;
	  }
	}, u$3 = 0, _$2.prototype.setState = function (n, l) {
	  var u;
	  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a$3({}, this.state), "function" == typeof n && (n = n(a$3({}, u), this.props)), n && a$3(u, n), null != n && this.__v && (l && this.__h.push(l), m$2(this));
	}, _$2.prototype.forceUpdate = function (n) {
	  this.__v && (this.__e = !0, n && this.__h.push(n), m$2(this));
	}, _$2.prototype.render = d$2, t$3 = [], o$4 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g$3.__r = 0, f$3 = 0;

	var o$3 = 0;

	function e$3(_, e, n, t, f) {
	  var l,
	      s,
	      u = {};

	  for (s in e) "ref" == s ? l = e[s] : u[s] = e[s];

	  var a = {
	    type: _,
	    props: u,
	    key: n,
	    ref: l,
	    __k: null,
	    __: null,
	    __b: 0,
	    __e: null,
	    __d: void 0,
	    __c: null,
	    __h: null,
	    constructor: void 0,
	    __v: --o$3,
	    __source: f,
	    __self: t
	  };
	  if ("function" == typeof _ && (l = _.defaultProps)) for (s in l) void 0 === u[s] && (u[s] = l[s]);
	  return l$3.vnode && l$3.vnode(a), a;
	}

	var t$2,
	    u$2,
	    r$2,
	    o$2,
	    i$2 = 0,
	    c$2 = [],
	    f$2 = [],
	    e$2 = l$3.__b,
	    a$2 = l$3.__r,
	    v$1 = l$3.diffed,
	    l$2 = l$3.__c,
	    m$1 = l$3.unmount;

	function p$2(t, r) {
	  l$3.__h && l$3.__h(u$2, t, i$2 || r), i$2 = 0;
	  var o = u$2.__H || (u$2.__H = {
	    __: [],
	    __h: []
	  });
	  return t >= o.__.length && o.__.push({
	    __V: f$2
	  }), o.__[t];
	}

	function y$1(n) {
	  return i$2 = 1, d$1(z$1, n);
	}

	function d$1(n, r, o) {
	  var i = p$2(t$2++, 2);
	  return i.t = n, i.__c || (i.__ = [o ? o(r) : z$1(void 0, r), function (n) {
	    var t = i.t(i.__[0], n);
	    i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
	  }], i.__c = u$2), i.__;
	}

	function _$1(r, o) {
	  var i = p$2(t$2++, 3);
	  !l$3.__s && w$2(i.__H, o) && (i.__ = r, i.u = o, u$2.__H.__h.push(i));
	}

	function h$1(r, o) {
	  var i = p$2(t$2++, 4);
	  !l$3.__s && w$2(i.__H, o) && (i.__ = r, i.u = o, u$2.__h.push(i));
	}

	function s$2(n) {
	  return i$2 = 5, F(function () {
	    return {
	      current: n
	    };
	  }, []);
	}

	function F(n, u) {
	  var r = p$2(t$2++, 7);
	  return w$2(r.__H, u) ? (r.__V = n(), r.u = u, r.__h = n, r.__V) : r.__;
	}

	function T$2(n, t) {
	  return i$2 = 8, F(function () {
	    return n;
	  }, t);
	}

	function q$1(n) {
	  var r = u$2.context[n.__c],
	      o = p$2(t$2++, 9);
	  return o.c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u$2)), r.props.value) : n.__;
	}

	function b$1() {
	  for (var t; t = c$2.shift();) if (t.__P) try {
	    t.__H.__h.forEach(j$2), t.__H.__h.forEach(k$1), t.__H.__h = [];
	  } catch (u) {
	    t.__H.__h = [], l$3.__e(u, t.__v);
	  }
	}

	l$3.__b = function (n) {
	  u$2 = null, e$2 && e$2(n);
	}, l$3.__r = function (n) {
	  a$2 && a$2(n), t$2 = 0;
	  var o = (u$2 = n.__c).__H;
	  o && (r$2 === u$2 ? (o.__h = [], u$2.__h = [], o.__.forEach(function (n) {
	    n.__V = f$2, n.u = void 0;
	  })) : (o.__h.forEach(j$2), o.__h.forEach(k$1), o.__h = [])), r$2 = u$2;
	}, l$3.diffed = function (t) {
	  v$1 && v$1(t);
	  var i = t.__c;
	  i && i.__H && (i.__H.__h.length && (1 !== c$2.push(i) && o$2 === l$3.requestAnimationFrame || ((o$2 = l$3.requestAnimationFrame) || function (n) {
	    var t,
	        u = function () {
	      clearTimeout(r), g$2 && cancelAnimationFrame(t), setTimeout(n);
	    },
	        r = setTimeout(u, 100);

	    g$2 && (t = requestAnimationFrame(u));
	  })(b$1)), i.__H.__.forEach(function (n) {
	    n.u && (n.__H = n.u), n.__V !== f$2 && (n.__ = n.__V), n.u = void 0, n.__V = f$2;
	  })), r$2 = u$2 = null;
	}, l$3.__c = function (t, u) {
	  u.some(function (t) {
	    try {
	      t.__h.forEach(j$2), t.__h = t.__h.filter(function (n) {
	        return !n.__ || k$1(n);
	      });
	    } catch (r) {
	      u.some(function (n) {
	        n.__h && (n.__h = []);
	      }), u = [], l$3.__e(r, t.__v);
	    }
	  }), l$2 && l$2(t, u);
	}, l$3.unmount = function (t) {
	  m$1 && m$1(t);
	  var u,
	      r = t.__c;
	  r && r.__H && (r.__H.__.forEach(function (n) {
	    try {
	      j$2(n);
	    } catch (n) {
	      u = n;
	    }
	  }), u && l$3.__e(u, r.__v));
	};
	var g$2 = "function" == typeof requestAnimationFrame;

	function j$2(n) {
	  var t = u$2,
	      r = n.__c;
	  "function" == typeof r && (n.__c = void 0, r()), u$2 = t;
	}

	function k$1(n) {
	  var t = u$2;
	  n.__c = n.__(), u$2 = t;
	}

	function w$2(n, t) {
	  return !n || n.length !== t.length || t.some(function (t, u) {
	    return t !== n[u];
	  });
	}

	function z$1(n, t) {
	  return "function" == typeof t ? t(n) : t;
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

	function getDocument(element) {
	  var _ref, _ref2, _element$ownerDocumen;

	  return (_ref = (_ref2 = (_element$ownerDocumen = element === null || element === void 0 ? void 0 : element.ownerDocument) !== null && _element$ownerDocumen !== void 0 ? _element$ownerDocumen : document) !== null && _ref2 !== void 0 ? _ref2 : window.document) !== null && _ref !== void 0 ? _ref : globalThis.document;
	}

	/**
	 * Debug hook.
	 *
	 * Given a value or set of values, emits a console error if any of them change from one render to the next.
	 *
	 * Eventually, when useEvent lands, we hopefully won't need this.
	 */

	function useEnsureStability(parentHookName) {
	  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    values[_key - 1] = arguments[_key];
	  }

	  useHelper(values.length, 0);
	  values.forEach(useHelper);
	  return;

	  function useHelper(value, index) {
	    // Make sure that the provided functions are perfectly stable across renders
	    const helperToEnsureStability = s$2(value);
	    const shownError = s$2(false);

	    if (helperToEnsureStability.current != value) {
	      if (!shownError.current) {
	        /* eslint-disable no-debugger */
	        debugger;
	        console.error(`The hook ${parentHookName} requires some or all of its arguments remain stable across each render; please check the ${index}-indexed argument.`);
	        shownError.current = true;
	      }
	    }
	  }
	}
	/**
	 * Similar to `useState`, but for values that aren't "render-important" &ndash; updates don't cause a re-render and so the value shouldn't be used during render (though it certainly can, at least by re-rendering again).
	 *
	 * To compensate for this, you should pass a `useEffect`-esque callback that is run whenever the value changes.  Just like `useEffect`, this callback can return a cleanup function that's run before the value changes.  If you would like to re-render when the value changes (or, say, when the value meets some criteria), this is where you'll want to put in a call to a `setState` function.
	 *
	 * To summarize, it's like a `useState`-`useEffect` mashup:
	 *
	 * 1. It's like `useState`, except this version of `setState` doesn't re-render the whole component
	 * 2. It's like `useState`, except you can run a function when the value changes that optionally returns a cleanup function
	 * 3. It's like `useEffect`, except you trigger the effect function "remotely" instead of it running after rendering
	 * 4. It's like `useEffect`, except the single "dependency" is based on your calls to `setState`
	 *
	 * Note that while calling `setState` doesn't cause any re-renders, you can do that within your `onChange` function, called whenever the value changes via that `setState`.
	 *
	 * @param onChange The "effect" function to run when the value changes. Effectively the same as `useEffect`'s "effect" function.  MUST BE STABLE, either because it has no dependencies, or because it's from useStableCallback, but this will mean you cannot use getState or setState during render.
	 * @param getInitialValue If provided, the effect will be invoked once with this value on mount. MUST BE STABLE, either because it has no dependencies, or because it's from useStableCallback, but this will mean you cannot use getState or setState during render.
	 * @returns
	 */

	function usePassiveState(onChange, getInitialValue) {
	  const valueRef = s$2(Unset$1);
	  const warningRef = s$2(false);
	  const cleanupCallbackRef = s$2(undefined); // Make sure that the provided functions are perfectly stable across renders

	  useEnsureStability("usePassiveState", onChange, getInitialValue); // Shared between "dependency changed" and "component unmounted".

	  const onShouldCleanUp = T$2(() => {
	    const cleanupCallback = cleanupCallbackRef.current;
	    if (cleanupCallback) cleanupCallback();
	  }, []); // There are a couple places where we'd like to use our initial
	  // value in place of having no value at all yet.
	  // This is the shared code for that, used on mount and whenever
	  // getValue is called.

	  const tryEnsureValue = T$2(() => {
	    if (valueRef.current === Unset$1 && getInitialValue != undefined) {
	      try {
	        var _onChange;

	        const initialValue = getInitialValue();
	        valueRef.current = initialValue;
	        cleanupCallbackRef.current = (_onChange = onChange === null || onChange === void 0 ? void 0 : onChange(initialValue, undefined)) !== null && _onChange !== void 0 ? _onChange : undefined;
	      } catch (ex) {// Exceptions are intentional to allow bailout (without exposing the Unset symbol)
	      }
	    }
	  }, [
	    /* getInitialValue and onChange intentionally omitted */
	  ]);
	  const getValue = T$2(() => {
	    if (warningRef.current) console.warn("During onChange, prefer using the (value, prevValue) arguments instead of getValue -- it's ambiguous as to if you're asking for the old or new value at this point in time for this component."); // The first time we call getValue, if we haven't been given a value yet,
	    // (and we were given an initial value to use)
	    // return the initial value instead of nothing.

	    if (valueRef.current === Unset$1) tryEnsureValue();
	    return valueRef.current === Unset$1 ? undefined : valueRef.current;
	  }, []);
	  h$1(() => {
	    // Make sure we've run our effect at least once on mount.
	    // (If we have an initial value, of course)
	    tryEnsureValue();
	  }, []); // The actual code the user calls to (possibly) run a new effect.

	  const setValue = T$2(arg => {
	    const prevDep = valueRef.current === Unset$1 ? undefined : getValue();
	    const dep = arg instanceof Function ? arg(prevDep) : arg;

	    if (dep !== valueRef.current) {
	      var _onChange2;

	      // Indicate to the user that they shouldn't call getValue during onChange
	      warningRef.current = true; // Call any registerd cleanup function

	      onShouldCleanUp();
	      cleanupCallbackRef.current = (_onChange2 = onChange === null || onChange === void 0 ? void 0 : onChange(dep, prevDep)) !== null && _onChange2 !== void 0 ? _onChange2 : undefined;
	      valueRef.current = dep; // Allow the user to normally call getValue again

	      warningRef.current = false;
	    }
	  }, []);
	  return [getValue, setValue];
	}
	const Unset$1 = Symbol(); // Easy constants for getInitialValue

	function returnTrue() {
	  return true;
	}
	function returnFalse$1() {
	  return false;
	}
	function returnNull$3() {
	  return null;
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
	    const ret = v$2(d$2, {}, lhs, rhs);
	    return ret;
	  }
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
	    const lhsClasses = clsx(lhsClass, lhsClassName).split(" ");
	    const rhsClasses = clsx(rhsClass, rhsClassName).split(" ");
	    const allClasses = new Set([...Array.from(lhsClasses), ...Array.from(rhsClasses)]);
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
	  } else {
	    /* eslint-disable no-debugger */
	    debugger;
	    console.assert(false, "Unknown ref type found that was neither a RefCallback nor a RefObject");
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
	    const combined = T$2(current => {
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

	function styleStringToObject(style) {
	  // TODO: This sucks D:
	  return Object.fromEntries(style.split(";").map(statement => statement.split(":")));
	}
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
	        style: styleStringToObject(lhs === null || lhs === void 0 ? void 0 : lhs.style)
	      }, rhs);
	      if (typeof (rhs === null || rhs === void 0 ? void 0 : rhs.style) == "string") return useMergedStyles(lhs, {
	        style: styleStringToObject(rhs === null || rhs === void 0 ? void 0 : rhs.style)
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

	let log = console.warn;
	/**
	 * Given two sets of props, merges them and returns the result.
	 *
	 * The hook is aware of and can intelligently merge `className`, `class`, `style`, `ref`, and all event handlers.
	 * @param lhs2
	 * @param rhs2
	 * @returns
	 */

	function useMergedProps() {
	  return function (lhsAll, rhsAll) {
	    // First, separate the props we were given into two groups:
	    // lhsAll and rhsAll contain all the props we were given, and
	    // lhsMisc and rhsMisc contain all props *except* for the easy ones
	    // like className and style that we already know how to merge.
	    const {
	      children: _lhsChildren,
	      class: _lhsClass,
	      className: _lhsClassName,
	      style: _lhsStyle,
	      ref: _lhsRef,
	      ...lhsMisc
	    } = lhsAll;
	    const {
	      children: _rhsChildren,
	      class: _rhsClass,
	      className: _rhsClassName,
	      style: _rhsStyle,
	      ref: _rhsRef,
	      ...rhsMisc
	    } = rhsAll;
	    const ret = { ...lhsMisc,
	      ref: useMergedRefs()(lhsAll, rhsAll),
	      style: useMergedStyles(lhsAll, rhsAll),
	      className: useMergedClasses(lhsAll, rhsAll),
	      children: useMergedChildren(lhsAll, rhsAll)
	    };
	    if (ret.ref === undefined) delete ret.ref;
	    if (ret.style === undefined) delete ret.style;
	    if (ret.className === undefined) delete ret.className;
	    if (ret.children === undefined) delete ret.children; // Now, do *everything* else
	    // Merge every remaining existing entry in lhs with what we've already put in ret.
	    //const lhsEntries = Object.entries(lhs) as [keyof T, T[keyof T]][];

	    const rhsEntries = Object.entries(rhsMisc);

	    for (const [rhsKey, rhsValue] of rhsEntries) {
	      const lhsValue = lhsMisc[rhsKey];

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
	          (_log = log) === null || _log === void 0 ? void 0 : _log(`The prop "${typeof rhsKey == "symbol" ? "<symbol>" : rhsKey}" cannot simultaneously be the values ${lhsValue} and ${rhsValue}. One must be chosen outside of useMergedProps.`);
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
	  return function () {
	    const lv = lhs(...arguments);
	    const rv = rhs(...arguments);
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

	function returnNull$2() {
	  return null;
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


	function useRefElement(args) {
	  const {
	    onElementChange,
	    onMount,
	    onUnmount
	  } = args !== null && args !== void 0 ? args : {};
	  useEnsureStability("useRefElement", onElementChange, onMount, onUnmount); // Called (indirectly) by the ref that the element receives.

	  const handler = T$2((e, prevValue) => {
	    onElementChange === null || onElementChange === void 0 ? void 0 : onElementChange(e, prevValue);
	    if (prevValue) onUnmount === null || onUnmount === void 0 ? void 0 : onUnmount(prevValue);
	    if (e) onMount === null || onMount === void 0 ? void 0 : onMount(e);
	  }, []); // Let us store the actual (reference to) the element we capture

	  const [getElement, setElement] = usePassiveState(handler, returnNull$2); // Create a RefCallback that's fired when mounted 
	  // and that notifies us of our element when we have it

	  const myRef = T$2(e => {
	    if (e) setElement(() => e);
	  }, []);
	  const useRefElementProps = T$2(props => useMergedProps()({
	    ref: myRef
	  }, props), []); // Return both the element and the hook that modifies 
	  // the props and allows us to actually find the element

	  return {
	    useRefElementProps,
	    getElement
	  };
	}

	function useElementSize(_ref) {
	  let {
	    getObserveBox,
	    onSizeChange
	  } = _ref;
	  useEnsureStability("useElementSize", getObserveBox, onSizeChange);
	  const [getSize, setSize] = usePassiveState(onSizeChange, returnNull$3);
	  const currentObserveBox = s$2(undefined);
	  const needANewObserver = T$2((element, observeBox) => {
	    if (element) {
	      const document = getDocument(element);
	      const window = document.defaultView;

	      const handleUpdate = () => {
	        if (element.isConnected) {
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
	        }
	      };

	      if (window && "ResizeObserver" in window) {
	        const observer = new ResizeObserver(_entries => {
	          handleUpdate();
	        });
	        observer.observe(element, {
	          box: observeBox
	        });
	        return () => observer.disconnect();
	      } else {
	        document.addEventListener("resize", handleUpdate, {
	          passive: true
	        });
	        return () => document.removeEventListener("resize", handleUpdate);
	      }
	    }
	  }, []);
	  const {
	    getElement,
	    useRefElementProps
	  } = useRefElement({
	    onElementChange: T$2(e => needANewObserver(e, getObserveBox === null || getObserveBox === void 0 ? void 0 : getObserveBox()), [])
	  });
	  _$1(() => {
	    if (getObserveBox) {
	      if (currentObserveBox.current !== getObserveBox()) needANewObserver(getElement(), getObserveBox());
	    }
	  });
	  return {
	    getElement,
	    getSize,
	    useElementSizeProps: useRefElementProps
	  };
	}

	function capitalize$1(str) {
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


	function useLogicalDirection(_ref) {
	  let {
	    onLogicalDirectionChange
	  } = _ref;
	  useEnsureStability("useLogicalDirection", onLogicalDirectionChange);
	  const [getComputedStyles, setComputedStyles] = usePassiveState(null, returnNull$3);
	  const {
	    getElement,
	    useRefElementProps
	  } = useRefElement({
	    onElementChange: T$2(element => {
	      if (element) {
	        setComputedStyles(window.getComputedStyle(element));
	      }
	    }, [])
	  }); // TODO: There's no way to refresh which writing mode we have once mounted.
	  //   A. There's no way to watch for CSS style changes
	  //   B. Calling getComputedStyle after every render for every element gets expensive fast and
	  //   C. Is not necessary for most use cases that will never switch writing-mode within a single component
	  //      (Those that do will need to mount and unmount the component that uses it)
	  //
	  // As a solution, here's a cheap workaround that checks when the element's size has changed,
	  // and if so, tests if the writing mode has changed too.
	  //
	  // This will work for at least some number of cases, but a better solution is still needed.

	  const {
	    useElementSizeProps
	  } = useElementSize({
	    onSizeChange: T$2(_ => onLogicalDirectionChange === null || onLogicalDirectionChange === void 0 ? void 0 : onLogicalDirectionChange(getLogicalDirectionInfo()), [])
	  });
	  const getLogicalDirectionInfo = T$2(() => {
	    const computedStyles = getComputedStyles();

	    if (computedStyles) {
	      const w = computedStyles.writingMode;
	      let d = computedStyles.direction;
	      const t = computedStyles.textOrientation;
	      if (t == "upright") d = "ltr";
	      return { ...WritingModes[w || "horizontal-tb"][d || "ltr"]
	      };
	    }

	    return null;
	  }, []); //const [getLogicalDirectionInfo, setLogicalDirectionInfo] = usePassiveState<LogicalDirectionInfo>(onLogicalDirectionChange);

	  const convertToLogicalOrientation = T$2((elementOrientation, direction) => {
	    var _direction, _direction2;

	    (_direction = direction) !== null && _direction !== void 0 ? _direction : direction = getLogicalDirectionInfo();
	    if (((_direction2 = direction) === null || _direction2 === void 0 ? void 0 : _direction2.inlineOrientation) === elementOrientation) return "inline";
	    return "block";
	  }, []);
	  const convertToPhysicalSide = T$2((side, direction) => {
	    var _direction3, _direction$blockDirec, _direction4, _direction$blockDirec2, _direction5, _direction$inlineDire, _direction6, _direction$inlineDire2, _direction7;

	    (_direction3 = direction) !== null && _direction3 !== void 0 ? _direction3 : direction = getLogicalDirectionInfo();

	    switch (side) {
	      case "block-start":
	        return M$2[((_direction$blockDirec = (_direction4 = direction) === null || _direction4 === void 0 ? void 0 : _direction4.blockDirection) !== null && _direction$blockDirec !== void 0 ? _direction$blockDirec : "ttb")[0]];

	      case "block-end":
	        return M$2[((_direction$blockDirec2 = (_direction5 = direction) === null || _direction5 === void 0 ? void 0 : _direction5.blockDirection) !== null && _direction$blockDirec2 !== void 0 ? _direction$blockDirec2 : "ttb")[2]];

	      case "inline-start":
	        return M$2[((_direction$inlineDire = (_direction6 = direction) === null || _direction6 === void 0 ? void 0 : _direction6.inlineDirection) !== null && _direction$inlineDire !== void 0 ? _direction$inlineDire : "ltr")[0]];

	      case "inline-end":
	        return M$2[((_direction$inlineDire2 = (_direction7 = direction) === null || _direction7 === void 0 ? void 0 : _direction7.inlineDirection) !== null && _direction$inlineDire2 !== void 0 ? _direction$inlineDire2 : "ltr")[2]];
	    }
	  }, []);
	  const convertToLogicalSide = T$2((side, direction) => {
	    var _direction8, _direction9, _direction10;

	    (_direction8 = direction) !== null && _direction8 !== void 0 ? _direction8 : direction = getLogicalDirectionInfo();

	    if (((_direction9 = direction) === null || _direction9 === void 0 ? void 0 : _direction9.inlineOrientation) === "vertical") {
	      switch (side) {
	        case "top":
	          return direction.inlineDirection === "ttb" ? "inline-start" : "inline-end";

	        case "bottom":
	          return direction.inlineDirection === "btt" ? "inline-start" : "inline-end";

	        case "left":
	          return direction.blockDirection === "ltr" ? "block-start" : "block-end";

	        case "right":
	          return direction.blockDirection === "rtl" ? "block-start" : "block-end";
	      }
	    } else if (((_direction10 = direction) === null || _direction10 === void 0 ? void 0 : _direction10.inlineOrientation) === "horizontal") {
	      switch (side) {
	        case "top":
	          return direction.blockDirection === "ttb" ? "block-start" : "block-end";

	        case "bottom":
	          return direction.blockDirection === "btt" ? "block-start" : "block-end";

	        case "left":
	          return direction.inlineDirection === "ltr" ? "inline-start" : "inline-end";

	        case "right":
	          return direction.inlineDirection === "rtl" ? "inline-start" : "inline-end";
	      }
	    }
	    /* eslint-disable no-debugger */


	    debugger;
	    console.assert(false);
	    return "inline-start";
	  }, []);
	  const convertToPhysicalOrientation = T$2((elementOrientation, direction) => {
	    var _direction11;

	    (_direction11 = direction) !== null && _direction11 !== void 0 ? _direction11 : direction = getLogicalDirectionInfo();

	    if (elementOrientation == "inline") {
	      var _direction12;

	      if (((_direction12 = direction) === null || _direction12 === void 0 ? void 0 : _direction12.inlineOrientation) == "horizontal") return "horizontal";
	      return "vertical";
	    } else {
	      var _direction13;

	      if (((_direction13 = direction) === null || _direction13 === void 0 ? void 0 : _direction13.blockOrientation) == "vertical") return "vertical";
	      return "horizontal";
	    }
	  }, []);
	  const convertElementSize = T$2((elementSize, direction) => {
	    var _direction14;

	    (_direction14 = direction) !== null && _direction14 !== void 0 ? _direction14 : direction = getLogicalDirectionInfo();

	    if (direction) {
	      const {
	        inlineSize,
	        blockSize,
	        inlineDirection,
	        blockDirection
	      } = direction; // Size is relatively simple

	      const clientInlineSize = elementSize[`client${capitalize$1(inlineSize)}`];
	      const clientBlockSize = elementSize[`client${capitalize$1(blockSize)}`];
	      const offsetInlineSize = elementSize[`offset${capitalize$1(inlineSize)}`];
	      const offsetBlockSize = elementSize[`offset${capitalize$1(blockSize)}`];
	      const scrollInlineSize = elementSize[`scroll${capitalize$1(inlineSize)}`];
	      const scrollBlockSize = elementSize[`scroll${capitalize$1(blockSize)}`];
	      const f1 = getPhysicalLeftTop(inlineDirection);
	      const f2 = getPhysicalRightBottom(inlineDirection);
	      const f3 = getPhysicalLeftTop(blockDirection);
	      const f4 = getPhysicalRightBottom(blockDirection);
	      const clientInlineInset = elementSize[`client${capitalize$1(f1)}`] + (!f2 ? 0 : elementSize[`client${capitalize$1(f2)}`]);
	      const scrollInlineInset = elementSize[`scroll${capitalize$1(f1)}`] + (!f2 ? 0 : elementSize[`scroll${capitalize$1(f2)}`]);
	      const offsetInlineInset = elementSize[`offset${capitalize$1(f1)}`] == undefined ? undefined : elementSize[`offset${capitalize$1(f1)}`] + (!f2 ? 0 : elementSize[`offset${capitalize$1(f2)}`]);
	      const clientBlockInset = elementSize[`client${capitalize$1(f3)}`] + (!f4 ? 0 : elementSize[`client${capitalize$1(f4)}`]);
	      const scrollBlockInset = elementSize[`scroll${capitalize$1(f3)}`] + (!f4 ? 0 : elementSize[`scroll${capitalize$1(f4)}`]);
	      const offsetBlockInset = elementSize[`offset${capitalize$1(f3)}`] == undefined ? undefined : elementSize[`offset${capitalize$1(f3)}`] + (!f4 ? 0 : elementSize[`offset${capitalize$1(f4)}`]);
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
	  }, []);
	  return {
	    useLogicalDirectionProps: T$2(props => useRefElementProps(useElementSizeProps(props)), []),
	    getElement,
	    getLogicalDirectionInfo,
	    convertToLogicalSize: convertElementSize,
	    convertToLogicalOrientation,
	    convertToPhysicalOrientation,
	    convertToLogicalSide,
	    convertToPhysicalSide
	  };
	} // Position requires us to sometimes use one property (like `left`)
	// or sometimes two (like `left` + `width`)

	function getPhysicalLeftTop(dir) {
	  if (dir === "ltr" || dir == "rtl") return "left";
	  return "top";
	}

	function getPhysicalRightBottom(dir) {
	  if (dir === "rtl") return "width";
	  if (dir === "btt") return "height";
	  return null;
	} // Helper for extracting info from "ltr", "ttb", etc.


	const M$2 = {
	  t: "top",
	  b: "bottom",
	  l: "left",
	  r: "right"
	};
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
	 * Slightly enhanced version of `useState` that includes a getter that remains constant
	 * (i.e. you can use it in `useEffect` and friends without it being a dependency).
	 *
	 * @param initialState
	 * @returns
	 */

	function useState(initialState) {
	  // We keep both, but overrride the `setState` functionality
	  const [state, setStateP] = y$1(initialState);
	  const ref = s$2(state); // Hijack the normal setter function 
	  // to also set our ref to the new value

	  const setState = T$2(value => {
	    if (typeof value === "function") {
	      const callback = value;
	      setStateP(prevValue => {
	        const nextValue = callback(prevValue);
	        ref.current = nextValue;
	        return nextValue;
	      });
	    } else {
	      ref.current = value;
	      setStateP(value);
	    }
	  }, []);

	  const getState = () => {
	    return ref.current;
	  };

	  console.assert(ref.current === state || typeof state === "number" && isNaN(state));
	  return [state, setState, getState];
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

	function useRandomId() {
	  let {
	    prefix
	  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  const [randomId, setRandomId] = useState(() => generateRandomId(prefix));
	  const [_watchPrefixUpdates, setWatchPrefixUpdates, getWatchPrefixUpdates] = useState(false);
	  h$1(() => {
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
	  const useReferencedIdProps = T$2(function useReferencedIdProps(idPropName) {
	    const ret = function (_ref) {
	      var _ref2, _ref3;

	      let {
	        [idPropName]: givenId,
	        ...props
	      } = _ref;
	      const usedId2 = (_ref2 = (_ref3 = givenId !== null && givenId !== void 0 ? givenId : usedId) !== null && _ref3 !== void 0 ? _ref3 : randomId) !== null && _ref2 !== void 0 ? _ref2 : undefined;
	      if (idPropName === "id") setUsedId(usedId2);
	      return useMergedProps()({
	        [idPropName]: usedId2
	      }, props);
	    };

	    return ret;
	  }, [usedId, randomId]);
	  const useRandomIdProps = T$2(function useRandomIdProps(p) {
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

	const previousInputs = new Map();
	const toRun = new Map(); // TODO: Whether this goes in options.diffed or options._commit
	// is a post-suspense question.
	// Right now, using options._commit has the problem of running
	// *after* refs are applied, but we need to come before even that
	// so `ref={someStableFunction}` works.
	// 
	// Also it's private.
	//
	// ...
	// Well, useEvent or whatever is finally, finally 4 years later finally here
	// which is cool and means we won't need this at all soon.
	// So for now we'll stick with diff to prevent any weirdness with
	// commit being private and all.

	const commitName = "diffed";
	const originalCommit = l$3[commitName];

	const newCommit = function () {
	  for (const [id, effectInfo] of toRun) {
	    const oldInputs = previousInputs.get(id);

	    if (argsChanged(oldInputs, effectInfo.inputs)) {
	      var _effectInfo$cleanup;

	      (_effectInfo$cleanup = effectInfo.cleanup) === null || _effectInfo$cleanup === void 0 ? void 0 : _effectInfo$cleanup.call(effectInfo);
	      effectInfo.cleanup = effectInfo.effect();
	      previousInputs.set(id, effectInfo.inputs);
	    }
	  }

	  toRun.clear();

	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  originalCommit === null || originalCommit === void 0 ? void 0 : originalCommit(...args);
	};

	l$3[commitName] = newCommit;
	/**
	 * Semi-private function to allow stable callbacks even within `useLayoutEffect` and ref assignment.
	 *
	 * Every render, we send the arguments to be evaluated after diffing has completed,
	 * which happens before.
	 *
	 * @param effect
	 * @param inputs
	 */

	function useBeforeLayoutEffect(effect, inputs) {
	  /*(() => {
	      const cleanup = useRef<void | (() => void) | null>(null);
	      const prevArgsRef = useRef<Inputs>(null!);
	      if (argsChanged(inputs, prevArgsRef.current)) {
	          prevArgsRef.current = inputs!;
	          if (cleanup.current)
	              cleanup.current();
	          cleanup.current = effect();
	      }
	  })();*/
	  const [id] = y$1(() => generateRandomId());
	  toRun.set(id, {
	    effect,
	    inputs,
	    cleanup: null
	  });
	  _$1(() => {
	    return () => {
	      toRun.delete(id);
	      previousInputs.delete(id);
	    };
	  }, [id]);
	}

	function argsChanged(oldArgs, newArgs) {
	  return !!(!oldArgs || oldArgs.length !== (newArgs === null || newArgs === void 0 ? void 0 : newArgs.length) || newArgs !== null && newArgs !== void 0 && newArgs.some((arg, index) => arg !== oldArgs[index]));
	}

	const Unset = Symbol("unset");
	/**
	 * Given an input value, returns a constant getter function that can be used
	 * inside of `useEffect` and friends without including it in the dependency array.
	 *
	 * This uses `options.diffed` in order to run before everything, even
	 * ref assignment. This means this getter is safe to use anywhere ***except the render phase***.
	 *
	 * @param value
	 * @returns
	 */

	function useStableGetter(value) {
	  const ref = s$2(Unset);
	  useBeforeLayoutEffect(() => {
	    ref.current = value;
	  }, [value]);
	  return T$2(() => {
	    if (ref.current === Unset) {
	      throw new Error('Value retrieved from useStableGetter() cannot be called during render.');
	    }

	    return ref.current;
	  }, []);
	}

	/**
	 * Alternate useCallback() which always returns the same (wrapped) function reference
	 * so that it can be excluded from the dependency arrays of `useEffect` and friends.
	 *
	 * Do not use during the render phase!  `useLayoutEffect` is fine though.
	 */

	function useStableCallback(fn) {
	  const currentCallbackGetter = useStableGetter(fn);
	  return T$2(function () {
	    return currentCallbackGetter()(...arguments);
	  }, []);
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$2 = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */

	var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root$2 = freeGlobal$2 || freeSelf$1 || Function('return this')();

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */

	var now = function () {
	  return root$2.Date.now();
	};

	/** Used to match a single whitespace character. */
	var reWhitespace = /\s/;
	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	 * character of `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the index of the last non-whitespace character.
	 */

	function trimmedEndIndex(string) {
	  var index = string.length;

	  while (index-- && reWhitespace.test(string.charAt(index))) {}

	  return index;
	}

	/** Used to match leading whitespace. */

	var reTrimStart = /^\s+/;
	/**
	 * The base implementation of `_.trim`.
	 *
	 * @private
	 * @param {string} string The string to trim.
	 * @returns {string} Returns the trimmed string.
	 */

	function baseTrim(string) {
	  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
	}

	/** Built-in value references. */

	var Symbol$5 = root$2.Symbol;

	/** Used for built-in method references. */

	var objectProto$3 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$1 = objectProto$3.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$3 = objectProto$3.toString;
	/** Built-in value references. */

	var symToStringTag$3 = Symbol$5 ? Symbol$5.toStringTag : undefined;
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */

	function getRawTag$2(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag$3),
	      tag = value[symToStringTag$3];

	  try {
	    value[symToStringTag$3] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$3.call(value);

	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$3] = tag;
	    } else {
	      delete value[symToStringTag$3];
	    }
	  }

	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$2 = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$2 = objectProto$2.toString;
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */

	function objectToString$2(value) {
	  return nativeObjectToString$2.call(value);
	}

	/** `Object#toString` result references. */

	var nullTag$1 = '[object Null]',
	    undefinedTag$1 = '[object Undefined]';
	/** Built-in value references. */

	var symToStringTag$2 = Symbol$5 ? Symbol$5.toStringTag : undefined;
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	function baseGetTag$2(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag$1 : nullTag$1;
	  }

	  return symToStringTag$2 && symToStringTag$2 in Object(value) ? getRawTag$2(value) : objectToString$2(value);
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$2(value) {
	  return value != null && typeof value == 'object';
	}

	/** `Object#toString` result references. */

	var symbolTag$1 = '[object Symbol]';
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */

	function isSymbol$2(value) {
	  return typeof value == 'symbol' || isObjectLike$2(value) && baseGetTag$2(value) == symbolTag$1;
	}

	/** Used as references for various `Number` constants. */

	var NAN = 0 / 0;
	/** Used to detect bad signed hexadecimal string values. */

	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */

	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */

	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */

	var freeParseInt = parseInt;
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */

	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }

	  if (isSymbol$2(value)) {
	    return NAN;
	  }

	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }

	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }

	  value = baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	/** Error message constants. */

	var FUNC_ERROR_TEXT$1 = 'Expected a function';
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeMax = Math.max,
	    nativeMin = Math.min;
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */

	function debounce$1(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }

	  wait = toNumber(wait) || 0;

	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time; // Start the timer for the trailing edge.

	    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;
	    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.

	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }

	  function timerExpired() {
	    var time = now();

	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    } // Restart the timer.


	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.

	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }

	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }

	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }

	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }

	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }

	    return result;
	  }

	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/** Error message constants. */

	var FUNC_ERROR_TEXT = 'Expected a function';
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */

	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  return debounce$1(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	function identity$2() {
	  for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
	    t[_key] = arguments[_key];
	  }

	  return t;
	}

	function useThrottled(callback, wait, options) {
	  const throttled = F(() => {
	    return callback ? throttle(callback, wait, options) : null;
	  }, [callback, wait, options === null || options === void 0 ? void 0 : options.leading, options === null || options === void 0 ? void 0 : options.trailing]);
	  _$1(() => {
	    return () => throttled === null || throttled === void 0 ? void 0 : throttled.cancel();
	  }, [throttled]);
	  return throttled;
	}
	function useDebounced(callback, wait, options) {
	  const debounced = F(() => {
	    return callback ? debounce$1(callback, wait, options) : null;
	  }, [callback, wait, options === null || options === void 0 ? void 0 : options.leading, options === null || options === void 0 ? void 0 : options.maxWait, options === null || options === void 0 ? void 0 : options.trailing]);
	  _$1(() => {
	    return () => debounced === null || debounced === void 0 ? void 0 : debounced.cancel();
	  }, [debounced]);
	  return debounced;
	}
	/**
	 * Given an async function, returns a function that's suitable for non-async APIs,
	 * along with other information about the current run's status.
	 *
	 * See also `useAsyncHandler` for a version that's specialized for DOM event handlers.
	 *
	 * When called multiple times in quick succession, (i.e. before the handler has finished),
	 * this works like Lodash's `throttle` function with the `wait` option always
	 * set to however long the handler takes to complete. A second call to the sync function will be
	 * throttled until the first call has finished. The return value of the function is the result
	 * of the previous invocation, or `undefined` on the first call.
	 *
	 * The handler is only ever delayed if one is currently running, so, e.g. for iOS touch events the
	 * first call happens in the same event handler (which means things like calls to `element.focus()`
	 * will work as intended, since that fails when the event is "split up")
	 *
	 * Finally, because the sync handler may be invoked on a delay, any property references on the arguments
	 * provided might be stale by the time it's actually invoked (e.g. accessing `event.currentTarget.checked`
	 * is not stable across time because it's a "live" value -- you almost always want the value that it
	 * had at the original time the handler was called). The `capture` option allows you to save that kind of
	 * dynamic data at the time it runs; the `AP` and `SP` type parameters likewise control
	 * the parameters the async handler and sync handler expect respectively.
	 *
	 */

	function useAsync(asyncHandler, options) {
	  var _capture, _ref;

	  /* eslint-disable prefer-const */
	  let {
	    throttle,
	    debounce,
	    capture
	  } = options !== null && options !== void 0 ? options : {};
	  (_capture = capture) !== null && _capture !== void 0 ? _capture : capture = identity$2; // We keep, like, a lot of render-state, but it only ever triggers a re-render
	  // when we start/stop an async action.
	  // Keep track of this for the caller's sake -- we don't really care.

	  const [currentType, setCurrentType] = useState(null);
	  const [runCount, setRunCount] = useState(0);
	  const [settleCount, setSettleCount] = useState(0);
	  const [resolveCount, setResolveCount] = useState(0);
	  const [rejectCount, setRejectCount] = useState(0); // Things related to current execution
	  // Because we can both return and throw undefined, 
	  // we need separate state to track their existance too.

	  const [pending, setPending, getPending] = useState(false);
	  const [result, setResult, getResult] = useState(undefined);
	  const [error, setError, _getError] = useState(undefined);
	  const [hasError, setHasError, _getHasError] = useState(false);
	  const [hasResult, setHasResult, _getHasResult] = useState(false); // We implement our own throttling behavior in regards to waiting until the async handler finishes.
	  // These two passive state variables keep track of that, automatically queueing/dequeuing the next handler.

	  const [getQueued, setQueued] = usePassiveState(null, returnNull$3); // The actual sync handler.
	  // Capture/transform the given parameters if applicable,
	  // then run further logic that's debounced/throttled

	  const captureArgsAndExecuteDebouncedHandler = useStableCallback(function onNewExecuteRequest() {
	    console.log("captureArgsAndExecuteDebouncedHandler"); // Capture the arguments we were given.
	    // We might use them immediately, or we might store them to `queued`,
	    // but in either case we do need the captured value.

	    const captured = capture(...arguments); // This is all logic that deals with the captured value instead of the raw arguments.
	    // It's called in two separate circumstances,
	    // and has the debounce/throttle logic already applied

	    return executeHandlerWithDebounce(getPending(), ...captured);
	  }); // This is the logic that runs when the handler is *just* about to start.
	  // This function itself is further transformed to be throttled/debounced if requested,
	  // so this might not be called immediately after 

	  const executeHandlerWithoutDebounce = useStableCallback(function onNewExecuteRequest2(enqueue) {
	    const onThen = value => {
	      console.log("executeHandlerWithoutDebounce.onThen");
	      setResult(value);
	      setHasResult(true);
	      setHasError(false);
	      setResolveCount(r => ++r);
	    };

	    const onCatch = ex => {
	      console.log("executeHandlerWithoutDebounce.onCatch");
	      setError(ex);
	      setHasError(true);
	      setHasResult(false);
	      setRejectCount(r => ++r);
	    };

	    const onFinally = () => {
	      const queued = getQueued();
	      setSettleCount(s => ++s);

	      if (queued) {
	        console.log("executeHandlerWithoutDebounce.onFinally (queued)");
	        setQueued(null);
	        executeHandlerWithDebounce(false, ...queued);
	      } else {
	        console.log("executeHandlerWithoutDebounce.onFinally (empty)");
	        setPending(false);
	      }
	    };

	    for (var _len2 = arguments.length, newArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      newArgs[_key2 - 1] = arguments[_key2];
	    }

	    if (!enqueue) {
	      console.log("executeHandlerWithoutDebounce (immediate)"); // Nothing is pending at the moment, so we can run our function immediately.

	      setRunCount(r => ++r);
	      setPending(true);
	      const result = asyncHandler === null || asyncHandler === void 0 ? void 0 : asyncHandler(...newArgs);
	      const isPromise = result != null && typeof result == "object" && "then" in result;

	      if (result == null || !isPromise) {
	        // It's synchronous and returned successfully.
	        // Bail out early.
	        onThen(result);
	        onFinally();
	        setCurrentType("sync");
	      } else {
	        result.then(onThen).catch(onCatch).finally(onFinally);
	        setCurrentType("async");
	      }
	    } else {
	      console.log("executeHandlerWithoutDebounce (pending)"); // When we're still running a previous handler,
	      // just set ourselves as the next one to run and quit early.
	      // Nothing more to do.

	      setQueued(newArgs);
	    }

	    return getResult();
	  });
	  const executeHandlerWithT = useThrottled(!throttle ? null : executeHandlerWithoutDebounce, throttle !== null && throttle !== void 0 ? throttle : 0);
	  const executeHandlerWithD = useDebounced(!debounce ? null : executeHandlerWithT !== null && executeHandlerWithT !== void 0 ? executeHandlerWithT : executeHandlerWithoutDebounce, debounce !== null && debounce !== void 0 ? debounce : 0);
	  const executeHandlerWithDebounce = (_ref = executeHandlerWithD !== null && executeHandlerWithD !== void 0 ? executeHandlerWithD : executeHandlerWithT) !== null && _ref !== void 0 ? _ref : executeHandlerWithoutDebounce;
	  const flushDebouncedPromise = useStableCallback(() => {
	    if (executeHandlerWithDebounce && "flush" in executeHandlerWithDebounce) executeHandlerWithDebounce.flush();
	  });
	  return {
	    syncHandler: captureArgsAndExecuteDebouncedHandler,
	    currentType,
	    pending,
	    result,
	    error,
	    hasError,
	    hasResult,
	    resolveCount,
	    rejectCount,
	    settleCount,
	    callCount: runCount,
	    flushDebouncedPromise
	  };
	}

	/**
	 * Given an asyncronous event handler, returns a syncronous one that works on the DOM,
	 * along with some other information related to the current state.
	 * Does not modify any props.
	 *
	 * Note that because the handler you provide may be called with a delay, and
	 * because the value of, e.g., an `<input>` element will likely be stale by the
	 * time the delay is over, a `capture` function is necessary in order to
	 * capture the relevant information from the DOM. Any other simple event data,
	 * like `mouseX` or `shiftKey` can stay on the event itself and don't
	 * need to be captured &ndash; it's never stale.
	 *
	 * ```tsx
	 * const asyncOnInput = async (value: number, e: Event) => {
	 *     [...] // Ex. send to a server and setState when done
	 * };
	 * const {
	 *     // A sync version of asyncOnInput
	 *     syncHandler,
	 *     // True while the handler is running
	 *     pending,
	 *     // The error thrown, if any
	 *     error,
	 *     // Show this value while the operation's pending
	 *     currentCapture,
	 *     // And others, see `UseAsyncHandlerReturnType`
	 *     ...rest
	 * } = useAsyncHandler<HTMLInputElement>()(asyncOnInput, {
	 *     // Pass in the capture function that saves event data
	 *     // from being stale.
	 *     capture: e => {
	 *         // `capture` can have side-effects because
	 *         // it's called exactly once per invocation
	 *         e.preventDefault();
	 *
	 *         // Save this value so that it's never stale
	 *         return e.currentTarget.valueAsNumber;
	 *     }
	 * });
	 *
	 * const onInput = pending? null : syncHandler;
	 * ```
	 *
	 * The handler is automatically throttled to only run one at a time.
	 * If the handler is called, and then before it finishes, is called again,
	 * it will be put on hold until the current one finishes, at which point
	 * the second one will run.  If the handler is called a third time before
	 * the first has finished, it will *replace* the second, so only the most
	 * recently called iteration of the handler will run.
	 *
	 *
	 * You may optionally *also* specify debounce and throttle parameters that wait until the
	 * syncronous handler has not been called for the specified number of
	 * milliseconds, at which point we *actually* run the asyncronous handler
	 * according to the logic in the previous paragraph. This is in
	 * *addition* to throttling the handler, and does not replace that behavior.
	 *
	 * @see useAsync A more general version of this hook that can work with any type of handler, not just DOM event handlers.
	 */

	function useAsyncHandler(asyncHandler, _ref) {
	  let {
	    capture: originalCapture,
	    ...restAsyncOptions
	  } = _ref;
	  // We need to differentiate between "nothing captured yet" and "`undefined` was captured"
	  const [currentCapture, setCurrentCapture, getCurrentCapture] = useState(undefined);
	  const [hasCapture, setHasCapture] = useState(false); // Wrap around the normal `useAsync` `capture` function to also
	  // keep track of the last value the user actually input.
	  // 
	  // Without this there's no way to re-render the control with
	  // it being both controlled and also having the "correct" value,
	  // and at any rate also protects against sudden exceptions reverting
	  // your change out from under you.

	  const capture = useStableCallback(e => {
	    const captured = originalCapture(e);
	    setCurrentCapture(captured);
	    setHasCapture(true);
	    return [captured, e];
	  });
	  return {
	    getCurrentCapture,
	    currentCapture,
	    hasCapture,
	    ...useAsync(asyncHandler, {
	      capture,
	      ...restAsyncOptions
	    })
	  };
	}

	/**
	 * Wrap the native `useEffect` to add arguments
	 * that allow accessing the previous value as the first argument,
	 * as well as the changes that caused the hook to be called as the second argument.
	 *
	 * @param effect
	 * @param inputs
	 * @param impl You can choose whether to use `useEffect` or `useLayoutEffect` by
	 * passing one of them as this argument. By default, it's `useEffect`.
	 */

	function useEffect(effect, inputs) {
	  let impl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _$1;
	  const prevInputs = s$2(undefined);

	  const effect2 = () => {
	    const changes = [];

	    if (inputs && prevInputs.current) {
	      for (let i = 0; i < Math.max(prevInputs.current.length, inputs.length); ++i) {
	        if (prevInputs.current[i] != inputs[i]) changes[i] = {
	          from: prevInputs.current[i],
	          to: inputs[i]
	        };
	      }
	    }

	    const ret = effect(prevInputs.current, changes);
	    prevInputs.current = inputs;
	    return ret;
	  };

	  impl(effect2, inputs);
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
	  return useEffect(effect, inputs, h$1);
	}

	function useTimeout(_ref) {
	  let {
	    timeout,
	    callback,
	    triggerIndex
	  } = _ref;
	  const stableCallback = useStableCallback(() => {
	    startTimeRef.current = null;
	    callback();
	  });
	  const getTimeout = useStableGetter(timeout); // Set any time we start timeout.
	  // Unset any time the timeout completes

	  const startTimeRef = s$2(null);
	  const timeoutIsNull = timeout == null; // Any time the triggerIndex changes (including on mount)
	  // restart the timeout.  The timeout does NOT reset
	  // when the duration or callback changes, only triggerIndex.

	  _$1(() => {
	    if (!timeoutIsNull) {
	      const timeout = getTimeout();
	      console.assert(timeoutIsNull == (timeout == null));

	      if (timeout != null) {
	        startTimeRef.current = +new Date();
	        const handle = setTimeout(stableCallback, timeout);
	        return () => clearTimeout(handle);
	      }
	    }
	  }, [triggerIndex, timeoutIsNull]);
	  const getElapsedTime = T$2(() => {
	    var _startTimeRef$current;

	    return +new Date() - +((_startTimeRef$current = startTimeRef.current) !== null && _startTimeRef$current !== void 0 ? _startTimeRef$current : new Date());
	  }, []);
	  const getRemainingTime = T$2(() => {
	    const timeout = getTimeout();
	    return timeout == null ? null : Math.max(0, timeout - getElapsedTime());
	  }, []);
	  return {
	    getElapsedTime,
	    getRemainingTime
	  };
	}

	/**
	 * When used in tandem with `useRovingTabIndex`, allows control of
	 * the tabbable index with the arrow keys.
	 *
	 * @see useListNavigation, which packages everything up together.
	 */

	function useLinearNavigation(_ref) {
	  var _navigationDirection;

	  let {
	    index,
	    navigateToFirst,
	    navigateToLast,
	    navigateToNext,
	    navigateToPrev,
	    managedChildren,
	    navigationDirection,
	    disableArrowKeys,
	    disableHomeEndKeys
	  } = _ref;
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
	  }, [index, childCount, navigateToFirst, navigateToLast]);
	  const {
	    getLogicalDirectionInfo,
	    useLogicalDirectionProps
	  } = useLogicalDirection({});

	  const onKeyDown = e => {
	    // Not handled by typeahead (i.e. assume this is a keyboard shortcut)
	    if (e.ctrlKey || e.metaKey) return;
	    const info = getLogicalDirectionInfo();
	    const allowsBlockNavigation = navigationDirection == "block" || navigationDirection == "either";
	    const allowsInlineNavigation = navigationDirection == "inline" || navigationDirection == "either";

	    switch (e.key) {
	      case "ArrowUp":
	        {
	          const propName = (info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? "blockDirection" : "inlineDirection";
	          const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? allowsBlockNavigation : allowsInlineNavigation);

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
	          const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? allowsBlockNavigation : allowsInlineNavigation);

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
	          const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? allowsInlineNavigation : allowsBlockNavigation);

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
	          const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? allowsInlineNavigation : allowsBlockNavigation);

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
	        if (!disableHomeEndKeys) {
	          navigateToFirst();
	          e.preventDefault();
	          e.stopPropagation();
	        }

	        break;

	      case "End":
	        if (!disableHomeEndKeys) {
	          navigateToLast();
	          e.preventDefault();
	          e.stopPropagation();
	        }

	        break;
	    }
	  };

	  return {
	    useLinearNavigationProps: T$2(props => {
	      return useLogicalDirectionProps(useMergedProps()({
	        onKeyDown
	      }, props));
	    }, [])
	  };
	}
	/**
	 * Allows for the selection of a managed child by typing the given text associated with it.
	 *
	 * @see useListNavigation, which packages everything up together.
	 */

	function useTypeaheadNavigation(_ref2) {
	  let {
	    collator,
	    getIndex,
	    typeaheadTimeout,
	    setIndex
	  } = _ref2;
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
	  const sortedTypeaheadInfo = s$2([]);
	  const [invalidTypeahead, setInvalidTypeahead] = useState(false); // Handle typeahead for input method editors as well
	  // Essentially, when active, ignore further keys 
	  // because we're waiting for a CompositionEnd event

	  const [, setImeActive, getImeActive] = useState(false); // Because composition events fire *after* keydown events 
	  // (but within the same task, which, TODO, could be browser-dependent),
	  // we can use this to keep track of which event we're listening for on the first keydown.

	  const [nextTypeaheadChar, setNextTypeaheadChar] = useState(null);
	  useLayoutEffect(() => {
	    if (nextTypeaheadChar !== null) {
	      setCurrentTypeahead(typeahead => (typeahead !== null && typeahead !== void 0 ? typeahead : "") + nextTypeaheadChar);
	      setNextTypeaheadChar(null);
	    }
	  }, [nextTypeaheadChar]);
	  const comparatorShared = useStableCallback((safeLhs, safeRhs) => {
	    var _safeRhs$toLowerCase;

	    let compare; // For the purposes of typeahead, only compare a string of the same size as our currently typed string.
	    // By normalizing them first, we ensure this byte-by-byte handling of raw character data works out okay.

	    safeLhs = safeLhs.normalize("NFD");
	    safeRhs = safeRhs.normalize("NFD");
	    if (collator) compare = collator.compare(safeLhs, safeRhs);else compare = safeLhs.toLowerCase().localeCompare((_safeRhs$toLowerCase = safeRhs.toLowerCase()) !== null && _safeRhs$toLowerCase !== void 0 ? _safeRhs$toLowerCase : "");
	    return compare;
	  });
	  const insertingComparator = useStableCallback((lhs, rhs) => {
	    if (typeof lhs === "string" && typeof rhs.text === "string") {
	      return comparatorShared(lhs, rhs.text);
	    }

	    return lhs - rhs;
	  });
	  const typeaheadComparator = useStableCallback((lhs, rhs) => {
	    if (typeof lhs === "string" && typeof rhs.text === "string") {
	      // During typeahead, all strings longer than ours should be truncated
	      // so that they're all considered equally by that point.
	      return comparatorShared(lhs, rhs.text.substring(0, lhs.length));
	    }

	    return lhs - rhs;
	  });
	  const useTypeaheadNavigationProps = T$2(function (_ref3) {
	    let { ...props
	    } = _ref3;

	    const onCompositionStart = _e => {
	      setImeActive(true);
	    };

	    const onCompositionEnd = e => {
	      setNextTypeaheadChar(e.data);
	      setImeActive(false);
	    };

	    const onKeyDown = e => {
	      const imeActive = getImeActive();
	      const key = e.key; // Not handled by typeahead (i.e. assume this is a keyboard shortcut)

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

	    return useMergedProps()({
	      onKeyDown,
	      onCompositionStart,
	      onCompositionEnd
	    }, props);
	  }, []); // Handle changes in typeahead that cause changes to the tabbable index

	  _$1(() => {
	    if (currentTypeahead && sortedTypeaheadInfo.current.length) {
	      const sortedTypeaheadIndex = binarySearch(sortedTypeaheadInfo.current, currentTypeahead, typeaheadComparator);

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

	        while (i >= 0 && typeaheadComparator(currentTypeahead, sortedTypeaheadInfo.current[i]) == 0) {
	          updateBestFit(sortedTypeaheadInfo.current[i].unsortedIndex);
	          --i;
	        }

	        i = sortedTypeaheadIndex;

	        while (i < sortedTypeaheadInfo.current.length && typeaheadComparator(currentTypeahead, sortedTypeaheadInfo.current[i]) == 0) {
	          updateBestFit(sortedTypeaheadInfo.current[i].unsortedIndex);
	          ++i;
	        }

	        if (lowestUnsortedIndexNext !== null) setIndex(sortedTypeaheadInfo.current[lowestSortedIndexNext].unsortedIndex);else if (lowestUnsortedIndexAll !== null) setIndex(sortedTypeaheadInfo.current[lowestSortedIndexAll].unsortedIndex);
	      }
	    }
	  }, [currentTypeahead]);
	  const useTypeaheadNavigationChild = T$2(_ref4 => {
	    let {
	      text,
	      ...i
	    } = _ref4;
	    _$1(() => {
	      if (text) {
	        // Find where to insert this item.
	        // Because all index values should be unique, the returned sortedIndex
	        // should always refer to a new location (i.e. be negative)                
	        const sortedIndex = binarySearch(sortedTypeaheadInfo.current, text, insertingComparator);
	        console.assert(sortedIndex < 0 || insertingComparator(sortedTypeaheadInfo.current[sortedIndex].text, {
	          unsortedIndex: i.index,
	          text
	        }) == 0);

	        if (sortedIndex < 0) {
	          sortedTypeaheadInfo.current.splice(-sortedIndex - 1, 0, {
	            text,
	            unsortedIndex: i.index
	          });
	        } else {
	          sortedTypeaheadInfo.current.splice(sortedIndex, 0, {
	            text,
	            unsortedIndex: i.index
	          });
	        }

	        return () => {
	          // When unmounting, find where we were and remove ourselves.
	          // Again, we should always find ourselves because there should be no duplicate values if each index is unique.
	          const sortedIndex = binarySearch(sortedTypeaheadInfo.current, text, insertingComparator);
	          console.assert(sortedIndex < 0 || insertingComparator(sortedTypeaheadInfo.current[sortedIndex].text, {
	            unsortedIndex: i.index,
	            text
	          }) == 0);

	          if (sortedIndex >= 0) {
	            sortedTypeaheadInfo.current.splice(sortedIndex, 1);
	          }
	        };
	      }
	    }, [text]);
	    return {};
	  }, []);
	  return {
	    useTypeaheadNavigationChild,
	    useTypeaheadNavigationProps,
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
	  let firstIndex = 0;
	  let lastIndex = array.length - 1;

	  while (firstIndex <= lastIndex) {
	    const testIndex = lastIndex + firstIndex >> 1;
	    const comparisonResult = comparator(wanted, array[testIndex]);

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
	  const [_childUpdateIndex, setChildUpdateIndex] = useState(0);
	  const [totalChildrenMounted, setTotalChildrenMounted, getTotalChildrenMounted] = useState(0);
	  const [totalChildrenUnounted, setTotalChildrenUnounted, _getTotalChildrenUnounted] = useState(0);
	  const childrenCurrentlyMounted = totalChildrenMounted - totalChildrenUnounted;
	  const managedChildren = s$2([]
	  /** TODO: Any problems caused by using an array when it should be an object? */
	  );
	  const mountedChildren = s$2([]);
	  const mountOrder = s$2(new Map());
	  const indicesByElement = s$2(new Map());
	  const deletedIndices = s$2(new Set()); // Used to keep track of indices that have "over-mounted" and by how much.
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

	  const overmountCount = s$2(new Map());
	  const getMountIndex = T$2(index => {
	    return mountOrder.current.get(index);
	  }, []);
	  const useManagedChild = T$2(info => {
	    const {
	      getElement,
	      useRefElementProps
	    } = useRefElement({
	      onElementChange: T$2(element => {
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
	      }, [])
	    });
	    useLayoutEffect(() => {
	      const index = getTotalChildrenMounted();
	      mountOrder.current.set(info.index, index);
	      mountedChildren.current[index] = info;
	      setTotalChildrenMounted(t => ++t);
	      return () => {
	        mountOrder.current.delete(info.index);
	        mountedChildren.current[index] = null;
	        setTotalChildrenUnounted(t => ++t);
	      };
	    }, [info.index]); // Any time our child props change, make that information available generally.
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
	 * While it will be called once for every child on mount, after that setFlag
	 * is guaranteed to only be called once on activation and once on deactivation,
	 * so it's generally safe to put side effects inside if necessary.
	 * It's also safe to make it non-stable.
	 *
	 * @param activatedIndex What index the current selected (etc.) child is
	 * @param length How many children exist (as managedChildren.length)
	 * @param setFlag A function that probably looks like (i, flag) => managedChildren[i].setActive(flag)
	 * @param useEffect Which version of useEffect to use. Default is `useLayoutEffect`.
	 */

	function useChildFlag(_ref) {
	  var _useEffect;

	  let {
	    activatedIndex,
	    closestFit,
	    managedChildren,
	    setChildFlag,
	    getChildFlag,
	    useEffect
	  } = _ref;
	  (_useEffect = useEffect) !== null && _useEffect !== void 0 ? _useEffect : useEffect = useLayoutEffect;
	  if (closestFit) console.assert(typeof activatedIndex == "number" || activatedIndex == null); // Whenever we re-render, make sure that any children that have mounted
	  // have their flags properly set.  We know it's unset if it was null,
	  // in which case we just set it to true or false.
	  //
	  // And, I mean, as long as we're already iterating through every child
	  // on every render to check for newly mounted children, might as well
	  // just handle changed in the activatedIndex here too.

	  useEffect(() => {
	    // TODO: We have limited information about when a child mounts or unmounts
	    // and so we don't know where to look for any null entries that need changing.
	    // We know when activatedIndex changes and what it was, but not much else.
	    // Looping over every child *works*, and it's not an expensive loop by any means,
	    // but, like, eugh.
	    // Also, before we do anything, see if we need to "correct" activatedIndex.
	    // It could be pointing to a child that doesn't exist, and if closestFit is given,
	    // we need to adjust activatedIndex to point to a valid child.
	    if (typeof activatedIndex == "number" && Array.isArray(managedChildren) && managedChildren[activatedIndex] == null) {
	      // Oh dear. Are we actively correcting this?
	      if (closestFit) {
	        // Oh dear.
	        // Search up and down the list of children for any that actually exist.
	        let searchHigh = activatedIndex + 1;
	        let searchLow = activatedIndex - 1;

	        while (searchLow >= 0 && managedChildren[searchLow] == null || searchHigh < managedChildren.length && managedChildren[searchHigh] == null) {
	          ++searchHigh;
	          --searchLow;
	        }

	        if (searchLow >= 0 && managedChildren[searchLow] != null) {
	          activatedIndex = searchLow;
	        } else if (searchHigh < managedChildren.length && managedChildren[searchHigh] != null) {
	          activatedIndex = searchHigh;
	        } // Now that we've done that, if any valid children exist, we've reset activatedIndex to point to it instead.
	        // Now we'll fall through to the for loop set and unset our flags based on this "corrected" value.
	        //
	        // We don't correct it or save it anywhere because we'd very much like to return to it
	        // if the child remounts itself.

	      }
	    }

	    if (Array.isArray(managedChildren)) {
	      for (let i = 0; i < managedChildren.length; ++i) {
	        const shouldBeSet = i == activatedIndex;

	        if (getChildFlag(i) != shouldBeSet) {
	          setChildFlag(i, shouldBeSet);
	        }
	      }
	    } else {
	      Object.entries(managedChildren).forEach(_ref2 => {
	        let [i, _info] = _ref2;
	        const shouldBeSet = i == activatedIndex;

	        if (getChildFlag(i) != shouldBeSet) {
	          setChildFlag(i, shouldBeSet);
	        }
	      });
	    }
	  });
	}

	/**
	 * Returns a function that will, when called, force the component
	 * that uses this hook to re-render itself.
	 *
	 * It's a bit smelly, so best to use sparingly.
	 */

	function useForceUpdate() {
	  const [, set] = y$1(0);
	  return s$2(() => set(i => ++i)).current;
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
	 * `shouldFocusOnChange` should return true if focus is
	 * contained within whatever element contains the roving tab index.
	 * Generally as simple as the following:
	 * ```
	 * const [focusedInner, setFocusedInner] = useState(false);
	 * const { useHasFocusProps } = useHasFocus<ParentElement>({ setFocusedInner });
	 * const focusOnChange = (focusedInner != false);
	 * ```
	 * It's not included here because `useRovingTabIndex` doesn't know
	 * anything about the container element, only children elements.
	 * And just as well! Children should be allowed at the root,
	 * regardless of if it's the whole app or just a given component.
	 */

	function useRovingTabIndex(_ref) {
	  let {
	    shouldFocusOnChange: foc,
	    tabbableIndex
	  } = _ref;
	  const getShouldFocusOnChange = useStableGetter(foc);
	  const getTabbableIndex = useStableGetter(tabbableIndex); // Call the hook that allows us to collect information from children who provide it

	  const {
	    managedChildren,
	    childCount,
	    useManagedChild,
	    indicesByElement,
	    ...rest
	  } = useChildManager(); // Any time the tabbable index changes,
	  // notify the previous child that it's no longer tabbable,
	  // and notify the next child that is allowed to be tabbed to.

	  useChildFlag({
	    activatedIndex: tabbableIndex,
	    managedChildren,
	    closestFit: true,
	    setChildFlag: (index, tabbable) => {
	      var _managedChildren$inde;

	      if (index != null) (_managedChildren$inde = managedChildren[index]) === null || _managedChildren$inde === void 0 ? void 0 : _managedChildren$inde.setTabbable(tabbable);
	    },
	    getChildFlag: index => {
	      var _managedChildren$inde2, _managedChildren$inde3;

	      return (_managedChildren$inde2 = (_managedChildren$inde3 = managedChildren[index]) === null || _managedChildren$inde3 === void 0 ? void 0 : _managedChildren$inde3.getTabbable()) !== null && _managedChildren$inde2 !== void 0 ? _managedChildren$inde2 : null;
	    }
	  });
	  const useRovingTabIndexChild = T$2(info => {
	    const [rrafIndex, setRrafIndex] = useState(1);
	    const rerenderAndFocus = T$2(() => {
	      setRrafIndex(i => ++i);
	    }, []);
	    const [tabbable, setTabbable, getTabbable] = useState(null);
	    const newInfo = { ...info,
	      rerenderAndFocus,
	      setTabbable: T$2(tabbable => {
	        setTabbable(tabbable);
	      }, []),
	      getTabbable
	    };
	    const {
	      getElement,
	      useManagedChildProps
	    } = useManagedChild(newInfo);
	    _$1(() => {
	      const element = getElement();

	      if (tabbable) {
	        const shouldFocusOnChange = getShouldFocusOnChange()();

	        if (shouldFocusOnChange && "focus" in element) {
	          requestAnimationFrame(() => {
	            queueMicrotask(() => {
	              element.focus();
	            });
	          });
	        }
	      }
	    }, [tabbable, rrafIndex]);

	    function useRovingTabIndexSiblingProps(_ref2) {
	      let {
	        tabIndex,
	        ...props
	      } = _ref2;

	      if (tabIndex == null) {
	        if (tabbable) tabIndex = 0;else tabIndex = -1;
	      }

	      return useMergedProps()({
	        tabIndex
	      }, props);
	    }

	    function useRovingTabIndexChildProps(_ref3) {
	      let {
	        tabIndex,
	        ...props
	      } = _ref3;

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
	    focusCurrent: T$2(() => {
	      var _getTabbableIndex;

	      if (managedChildren[(_getTabbableIndex = getTabbableIndex()) !== null && _getTabbableIndex !== void 0 ? _getTabbableIndex : 0].getTabbable()) {
	        var _managedChildren, _getTabbableIndex2;

	        (_managedChildren = managedChildren[(_getTabbableIndex2 = getTabbableIndex()) !== null && _getTabbableIndex2 !== void 0 ? _getTabbableIndex2 : 0]) === null || _managedChildren === void 0 ? void 0 : _managedChildren.rerenderAndFocus();
	      } else {
	        var _getTabbableIndex3;

	        // For whatever reason, the previously tabbable child
	        // is no longer tabbable without us knowing about it.
	        // Maybe it unmounted?
	        // Either way, try to find the newly-selected child.
	        // (I don't think this code path has ever been run)

	        /* eslint-disable no-debugger */
	        debugger;
	        let i = (_getTabbableIndex3 = getTabbableIndex()) !== null && _getTabbableIndex3 !== void 0 ? _getTabbableIndex3 : 0;
	        let j = i + 1;

	        while (i >= 0) {
	          var _getTabbableIndex4;

	          --i;

	          if (managedChildren[(_getTabbableIndex4 = getTabbableIndex()) !== null && _getTabbableIndex4 !== void 0 ? _getTabbableIndex4 : 0].getTabbable()) {
	            var _managedChildren2, _getTabbableIndex5;

	            (_managedChildren2 = managedChildren[(_getTabbableIndex5 = getTabbableIndex()) !== null && _getTabbableIndex5 !== void 0 ? _getTabbableIndex5 : 0]) === null || _managedChildren2 === void 0 ? void 0 : _managedChildren2.rerenderAndFocus();
	            return;
	          }
	        }

	        while (j < managedChildren.length) {
	          var _getTabbableIndex6;

	          ++j;

	          if (managedChildren[(_getTabbableIndex6 = getTabbableIndex()) !== null && _getTabbableIndex6 !== void 0 ? _getTabbableIndex6 : 0].getTabbable()) {
	            var _managedChildren3, _getTabbableIndex7;

	            (_managedChildren3 = managedChildren[(_getTabbableIndex7 = getTabbableIndex()) !== null && _getTabbableIndex7 !== void 0 ? _getTabbableIndex7 : 0]) === null || _managedChildren3 === void 0 ? void 0 : _managedChildren3.rerenderAndFocus();
	            return;
	          }
	        }
	      }
	    }, []),
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


	function useListNavigation(_ref) {
	  var _indexMangler, _indexDemangler, _keyNavigation, _getTabbableIndex;

	  let {
	    initialIndex,
	    shouldFocusOnChange,
	    collator,
	    keyNavigation,
	    indexMangler,
	    indexDemangler
	  } = _ref;
	  (_indexMangler = indexMangler) !== null && _indexMangler !== void 0 ? _indexMangler : indexMangler = identity$1;
	  (_indexDemangler = indexDemangler) !== null && _indexDemangler !== void 0 ? _indexDemangler : indexDemangler = identity$1;
	  (_keyNavigation = keyNavigation) !== null && _keyNavigation !== void 0 ? _keyNavigation : keyNavigation = "either";
	  useEnsureStability("useListNavigation", indexMangler, indexDemangler); // Keep track of three things related to the currently tabbable element's index:
	  // What it is, and whether, when we render this component and it's changed, to also focus the element that was made tabbable.

	  const [tabbableIndex, setTabbableIndex, getTabbableIndex] = useState(initialIndex === undefined ? 0 : initialIndex);
	  const {
	    managedChildren,
	    indicesByElement,
	    useRovingTabIndexChild,
	    focusCurrent,
	    ...rest
	  } = useRovingTabIndex({
	    shouldFocusOnChange,
	    tabbableIndex
	  });
	  /*const navigateToIndex = useCallback((i: number | null) => { setTabbableIndex(i); }, []);
	  const navigateToFirst = useCallback(() => { tryNavigateToIndex(managedChildren,) setTabbableIndex(indexMangler!(0)); }, []);
	  const navigateToLast = useCallback(() => { setTabbableIndex(indexMangler!(managedChildren.length - 1)); }, []);
	  const navigateToPrev = useCallback(() => { setTabbableIndex(i => indexMangler!(indexDemangler!(i ?? 0) - 1)) }, [indexDemangler, indexMangler]);
	  const navigateToNext = useCallback(() => { setTabbableIndex(i => indexMangler!(indexDemangler!(i ?? 0) + 1)) }, [indexDemangler, indexMangler]);
	  */

	  const navigateToIndex = T$2(i => {
	    var _indexMangler2, _indexDemangler2;

	    setTabbableIndex(i == null ? null : tryNavigateToIndex(managedChildren, 0, i, 1, (_indexMangler2 = indexMangler) !== null && _indexMangler2 !== void 0 ? _indexMangler2 : identity$1, (_indexDemangler2 = indexDemangler) !== null && _indexDemangler2 !== void 0 ? _indexDemangler2 : identity$1));
	  }, []);
	  const navigateToFirst = T$2(() => {
	    var _indexMangler3, _indexDemangler3;

	    setTabbableIndex(tryNavigateToIndex(managedChildren, 0, 0, 1, (_indexMangler3 = indexMangler) !== null && _indexMangler3 !== void 0 ? _indexMangler3 : identity$1, (_indexDemangler3 = indexDemangler) !== null && _indexDemangler3 !== void 0 ? _indexDemangler3 : identity$1));
	  }, []);
	  const navigateToLast = T$2(() => {
	    var _indexMangler4, _indexDemangler4;

	    setTabbableIndex(tryNavigateToIndex(managedChildren, managedChildren.length, managedChildren.length, -1, (_indexMangler4 = indexMangler) !== null && _indexMangler4 !== void 0 ? _indexMangler4 : identity$1, (_indexDemangler4 = indexDemangler) !== null && _indexDemangler4 !== void 0 ? _indexDemangler4 : identity$1));
	  }, []);
	  const navigateToPrev = T$2(() => {
	    setTabbableIndex(c => {
	      var _indexMangler5, _indexDemangler5;

	      return tryNavigateToIndex(managedChildren, c !== null && c !== void 0 ? c : 0, (c !== null && c !== void 0 ? c : 0) - 1, -1, (_indexMangler5 = indexMangler) !== null && _indexMangler5 !== void 0 ? _indexMangler5 : identity$1, (_indexDemangler5 = indexDemangler) !== null && _indexDemangler5 !== void 0 ? _indexDemangler5 : identity$1);
	    });
	  }, []);
	  const navigateToNext = T$2(() => {
	    setTabbableIndex(c => {
	      var _indexMangler6, _indexDemangler6;

	      return tryNavigateToIndex(managedChildren, c !== null && c !== void 0 ? c : 0, (c !== null && c !== void 0 ? c : 0) + 1, 1, (_indexMangler6 = indexMangler) !== null && _indexMangler6 !== void 0 ? _indexMangler6 : identity$1, (_indexDemangler6 = indexDemangler) !== null && _indexDemangler6 !== void 0 ? _indexDemangler6 : identity$1);
	    });
	  }, []);
	  const setIndex = T$2(index => {
	    setTabbableIndex(index);
	  }, []);
	  const {
	    currentTypeahead,
	    invalidTypeahead,
	    useTypeaheadNavigationChild,
	    useTypeaheadNavigationProps
	  } = useTypeaheadNavigation({
	    collator,
	    getIndex: getTabbableIndex,
	    setIndex,
	    typeaheadTimeout: 1000
	  });
	  const {
	    useLinearNavigationProps
	  } = useLinearNavigation({
	    navigationDirection: keyNavigation,
	    index: (_getTabbableIndex = getTabbableIndex()) !== null && _getTabbableIndex !== void 0 ? _getTabbableIndex : 0,
	    managedChildren,
	    navigateToPrev,
	    navigateToNext,
	    navigateToFirst,
	    navigateToLast
	  });
	  const useListNavigationProps = T$2(props => {
	    return useLinearNavigationProps(useTypeaheadNavigationProps(props));
	  }, [useLinearNavigationProps, useTypeaheadNavigationProps]);
	  const useListNavigationChild = T$2(info => {
	    useTypeaheadNavigationChild(info); //const { useLinearNavigationChildProps } = useLinearNavigationChild(info as I);


	    const {
	      useRovingTabIndexChildProps,
	      useRovingTabIndexSiblingProps,
	      tabbable
	    } = useRovingTabIndexChild(info);

	    const useListNavigationChildProps = function (_ref2) {
	      let { ...props
	      } = _ref2;
	      return useMergedProps()(useRovingTabIndexChildProps({
	        onClick: roveToSelf,
	        hidden: info.hidden
	      }), props);
	    };

	    const roveToSelf = T$2(() => {
	      navigateToIndex(info.index);
	    }, []);
	    return {
	      useListNavigationChildProps,
	      useListNavigationSiblingProps: useRovingTabIndexSiblingProps,
	      tabbable
	    };
	  }, [useTypeaheadNavigationChild, useRovingTabIndexChild, navigateToIndex]);
	  return {
	    useListNavigationChild,
	    useListNavigationProps,
	    currentTypeahead,
	    invalidTypeahead,
	    tabbableIndex,
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
	function tryNavigateToIndex(managedCells, initial, target, searchDirection, indexMangler, indexDemangler) {
	  function helper() {
	    if (searchDirection === -1) {
	      while (target >= 0 && (managedCells[target] == null || !!((_managedCells$target = managedCells[target]) !== null && _managedCells$target !== void 0 && _managedCells$target.hidden))) {
	        var _managedCells$target;

	        target = indexMangler(indexDemangler(target) - 1);
	      }

	      return target < 0 ? initial : target;
	    } else if (searchDirection === 1) {
	      while (target < managedCells.length && managedCells[target] == null || !!((_managedCells$target2 = managedCells[target]) !== null && _managedCells$target2 !== void 0 && _managedCells$target2.hidden)) {
	        var _managedCells$target2;

	        target = indexMangler(indexDemangler(target) + 1);
	      }

	      return target >= managedCells.length ? initial : target;
	    } else {
	      return initial;
	    }
	  }

	  return helper();
	}

	function identity(t) {
	  return t;
	}

	function useGridNavigation(_ref) {
	  var _indexMangler, _indexDemangler, _getCurrentRow;

	  let {
	    shouldFocusOnChange,
	    indexMangler,
	    indexDemangler
	  } = _ref;
	  (_indexMangler = indexMangler) !== null && _indexMangler !== void 0 ? _indexMangler : indexMangler = identity;
	  (_indexDemangler = indexDemangler) !== null && _indexDemangler !== void 0 ? _indexDemangler : indexDemangler = identity;
	  const getFocusCellOnRowChange = useStableCallback(shouldFocusOnChange); // Keep track of our currently tabbable row and column.
	  // These are mangled, and so relative to the DOM order, not component order.
	  // Any operations done on these numbers need to be demangled first,
	  // otherwise they'll be incorrect.

	  const [currentRow, setCurrentRow2, getCurrentRow] = useState(0);
	  const [currentColumn, setCurrentColumn2, getCurrentColumn] = useState(0); // Functions used for navigating to different rows.
	  // Each row has its own useRovingTabIndex -- if it's not the 
	  // current row, then all of its children are non-tabbable.
	  // Otherwise, it is tabbable, with the tabbable cell being currentColumn.
	  // This happens automatically when these functions are called.

	  const navigateToFirstRow = T$2(() => {
	    setCurrentRow2(c => tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, 0, 1, indexMangler, indexDemangler));
	  }, [indexMangler, indexDemangler]);
	  const navigateToLastRow = T$2(() => {
	    setCurrentRow2(c => tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, managedRows.length - 1, -1, indexMangler, indexDemangler));
	  }, [indexMangler, indexDemangler]);
	  const navigateToPrevRow = T$2(() => {
	    setCurrentRow2(c => {
	      return tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, indexMangler(Math.max(0, indexDemangler(c !== null && c !== void 0 ? c : 0) - 1)), -1, indexMangler, indexDemangler);
	    });
	  }, [indexMangler, indexDemangler]);
	  const navigateToNextRow = T$2(() => {
	    setCurrentRow2(c => {
	      return tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, indexMangler(Math.min(managedRows.length - 1, indexDemangler(c !== null && c !== void 0 ? c : 0) + 1)), 1, indexMangler, indexDemangler);
	    });
	  }, [indexMangler, indexDemangler]); // Track child rows and manage keyboard navigation among them.

	  const {
	    childCount,
	    managedChildren: managedRows,
	    useManagedChild: useManagedRow
	  } = useChildManager();
	  const {
	    useLinearNavigationProps: useLinearNavigationRowProps
	  } = useLinearNavigation({
	    managedChildren: managedRows,
	    index: indexMangler((_getCurrentRow = getCurrentRow()) !== null && _getCurrentRow !== void 0 ? _getCurrentRow : 0),
	    navigateToFirst: navigateToFirstRow,
	    navigateToLast: navigateToLastRow,
	    navigateToNext: navigateToNextRow,
	    navigateToPrev: navigateToPrevRow,
	    navigationDirection: "block"
	  }); // Actually handle notifying the relevant rows when they
	  // change from untabbable to tabbable or vice-versa.

	  useChildFlag({
	    activatedIndex: currentRow,
	    managedChildren: managedRows,
	    setChildFlag: (index, tabbable) => {
	      var _managedRows$index;

	      (_managedRows$index = managedRows[index]) === null || _managedRows$index === void 0 ? void 0 : _managedRows$index.setIsTabbableRow(tabbable);
	    },
	    getChildFlag: index => {
	      var _managedRows$index$ge, _managedRows$index2;

	      return (_managedRows$index$ge = (_managedRows$index2 = managedRows[index]) === null || _managedRows$index2 === void 0 ? void 0 : _managedRows$index2.getIsTabbableRow()) !== null && _managedRows$index$ge !== void 0 ? _managedRows$index$ge : null;
	    },
	    useEffect: useEffect
	  });
	  /**
	   * Optional, but provides typeahead for each column in the table.
	   */

	  const useGridNavigationColumn = T$2(() => {
	    const {
	      currentTypeahead,
	      invalidTypeahead,
	      useTypeaheadNavigationChild
	    } = useTypeaheadNavigation({
	      getIndex: getCurrentRow,
	      setIndex: setCurrentRow2
	    });
	    const useGridNavigationColumnChild = T$2(_ref2 => {
	      let {
	        index: rowIndex,
	        text,
	        hidden
	      } = _ref2;
	      useTypeaheadNavigationChild({
	        index: rowIndex,
	        text: hidden ? null : text
	      });
	    }, [useTypeaheadNavigationChild]);
	    return {
	      useGridNavigationColumnChild,
	      currentTypeahead,
	      invalidTypeahead
	    };
	  }, []); // Last thing before we return -- here's the hook for individual rows and their cells.

	  const useGridNavigationRow = T$2(_ref3 => {
	    let {
	      index: rowIndex,
	      hidden,
	      ...info
	    } = _ref3;
	    // When we change the current column, we send that information
	    // to the parent via setState, but that doesn't do anything
	    // for us.  The parent doesn't ever manage rows' cells for them.
	    // 
	    // So to get us to also update alongside the parent,
	    // we just use forceUpdate.
	    // We could also keep a copy of, like, "what this row thinks
	    // the current column is" that *should* always be kept in-
	    // sync with "getCurrentColumn()" as a state variable,
	    // but it *just* being used for that is arguably *more* confusing.
	    //
	    // Basically, information regarding the currently selected column
	    // "belongs" to *both* this row and the parent, conceptually,
	    // but for cleanliness' sake, just one of them gets it,
	    // and the other is manually updated whenever it changes.
	    const forceUpdate = useForceUpdate(); // "Shortcut" for any given row to know that it should or should not
	    // consider one of its cells tabbable.  Also used to determine
	    // if a change to the current selected cell should also
	    // trigger focusing that cell.

	    const [isTabbableRow, setIsTabbableRow, getIsTabbableRow] = useState(null); // If we're not the tabbable row, then for the purposes of tabIndex
	    // calculations, we don't have a tabbable child cell.

	    const currentColumn = isTabbableRow ? getCurrentColumn() : null; // Track child cells and manage keyboard navigation among them.

	    const {
	      managedChildren: managedCells,
	      useRovingTabIndexChild: useRovingTabIndexCell,
	      childCount: cellCount
	    } = useRovingTabIndex({
	      shouldFocusOnChange: T$2(() => {
	        return !!getFocusCellOnRowChange() && !!getIsTabbableRow();
	      }, []),
	      tabbableIndex: currentColumn
	    }); // More navigation stuff

	    const navigateToFirstColumn = T$2(() => {
	      setCurrentColumn2(tryNavigateToIndex(managedCells, 0, 0, 1, identity, identity));
	      forceUpdate();
	    }, []);
	    const navigateToLastColumn = T$2(() => {
	      setCurrentColumn2(tryNavigateToIndex(managedCells, managedCells.length, managedCells.length, -1, identity, identity));
	      forceUpdate();
	    }, []);
	    const navigateToPrevColumn = T$2(() => {
	      setCurrentColumn2(c => {
	        return tryNavigateToIndex(managedCells, c, c - 1, -1, identity, identity);
	      });
	      forceUpdate();
	    }, []);
	    const navigateToNextColumn = T$2(() => {
	      setCurrentColumn2(c => {
	        return tryNavigateToIndex(managedCells, c, c + 1, 1, identity, identity);
	      });
	      forceUpdate();
	    }, []);
	    const {
	      useLinearNavigationProps: useLinearNavigationCellProps
	    } = useLinearNavigation({
	      managedChildren: managedCells,
	      navigationDirection: "inline",
	      index: currentColumn !== null && currentColumn !== void 0 ? currentColumn : 0,
	      disableHomeEndKeys: true,
	      navigateToFirst: navigateToFirstColumn,
	      navigateToLast: navigateToLastColumn,
	      navigateToPrev: navigateToPrevColumn,
	      navigateToNext: navigateToNextColumn
	    }); // Notify the relevant child cells when they should/should not be tabbable

	    useChildFlag({
	      activatedIndex: currentColumn,
	      managedChildren: managedCells,
	      setChildFlag: (cellIndex, cellIsTabbable) => {
	        if (cellIndex != null && managedCells[cellIndex]) {
	          managedCells[cellIndex].setTabbable(cellIsTabbable);
	          if (cellIsTabbable) managedCells[cellIndex].rerenderAndFocus();
	        }
	      },
	      getChildFlag: cellIndex => {
	        var _managedCells$cellInd, _managedCells$cellInd2;

	        return (_managedCells$cellInd = (_managedCells$cellInd2 = managedCells[cellIndex]) === null || _managedCells$cellInd2 === void 0 ? void 0 : _managedCells$cellInd2.getTabbable()) !== null && _managedCells$cellInd !== void 0 ? _managedCells$cellInd : null;
	      },
	      useEffect
	    }); // Any time we become the currently tabbable row,
	    // make sure that we're in a valid cell, and shift left/right if not to find one.
	    // TODO: Seems kinda janky? Is there no cleaner way to accomplish this,
	    // especially since it's similar to other code?

	    useEffect(() => {
	      if (isTabbableRow) {
	        let cellIndex = getCurrentColumn();

	        while (cellIndex >= 0 && managedCells[cellIndex] == null) {
	          --cellIndex;
	        }

	        if (cellIndex < 0) {
	          cellIndex = getCurrentColumn();

	          while (cellIndex < managedCells.length && managedCells[cellIndex] == null) {
	            ++cellIndex;
	          }

	          if (cellIndex == managedCells.length) cellIndex = getCurrentColumn();
	        }

	        if (cellIndex != getCurrentColumn()) setCurrentColumn2(cellIndex);
	      }
	    }, [isTabbableRow]);
	    const {
	      useManagedChildProps: useManagedRowProps
	    } = useManagedRow({
	      index: rowIndex,
	      setIsTabbableRow,
	      getIsTabbableRow: getIsTabbableRow,
	      hidden,
	      ...info
	    }); //const { useLinearNavigationChildProps: useLinearNavigationChildRowProps } = useLinearNavigationChildRow(info as IR)

	    const useGridNavigationRowProps = T$2(props => useManagedRowProps(useLinearNavigationCellProps(useMergedProps()({
	      hidden: !!hidden,
	      "data-index": rowIndex
	    }, props))), [useManagedRowProps, !!hidden]);
	    const getRowIndex = useStableGetter(rowIndex);
	    const useGridNavigationCell = T$2(info => {
	      const getTabbable = useStableCallback(() => tabbable);
	      const {
	        tabbable,
	        useRovingTabIndexChildProps
	      } = useRovingTabIndexCell({ ...info,
	        getTabbable
	      }); //const { useLinearNavigationChildProps: useLinearNavigationChildCellProps } = useLinearNavigationChildCell(info as IC);
	      // Any time we interact with this cell, set it to be
	      // our "currently tabbable" cell, regardless of
	      // any previously selected row/column.
	      //
	      // TODO: Mouseup/down might be preferable,
	      // but it doesn't fire on label elements here?????

	      const onClick = T$2(() => {
	        setCurrentRow2(getRowIndex());
	        setCurrentColumn2(info.index);
	      }, [info.index]);
	      const useGridNavigationCellProps = T$2(props => useRovingTabIndexChildProps(useMergedProps()({
	        onClick
	      }, props)), [useRovingTabIndexChildProps]);
	      return {
	        tabbable,
	        useGridNavigationCellProps
	      };
	    }, []);
	    return {
	      currentColumn,
	      useGridNavigationRowProps,
	      useGridNavigationCell,
	      cellCount,
	      isTabbableRow,
	      managedCells: managedCells
	    };
	  }, [useManagedRow, indexDemangler, indexMangler]);
	  return {
	    useGridNavigationProps: useLinearNavigationRowProps,
	    useGridNavigationRow,
	    useGridNavigationColumn,
	    rowCount: childCount,
	    cellIndex: currentColumn,
	    rowIndex: currentRow,
	    managedRows
	  };
	}

	D$1(null);

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
	  _$1(() => {
	    if (stableHandler) {
	      target.addEventListener(type, stableHandler, options);
	      return () => target.removeEventListener(type, stableHandler, options);
	    }
	  }, [target, type, stableHandler]);
	}

	const activeElementUpdaters = new Map();
	const lastActiveElementUpdaters = new Map();
	const windowFocusedUpdaters = new Map();
	const windowsFocusedUpdaters = new Map();

	function forEachUpdater(window, map, value) {
	  for (const [otherWindow, updaters] of map) {
	    if (window === otherWindow) {
	      for (const updater of updaters) {
	        updater === null || updater === void 0 ? void 0 : updater(value);
	      }
	    }
	  }
	}

	function focusout(e) {
	  const window = e.target.ownerDocument.defaultView;

	  if (e.relatedTarget == null) {
	    forEachUpdater(window, activeElementUpdaters, null);
	  }
	}

	function focusin(e) {
	  const window = e.target.ownerDocument.defaultView;
	  const currentlyFocusedElement = e.target;
	  forEachUpdater(window, activeElementUpdaters, currentlyFocusedElement);
	  forEachUpdater(window, lastActiveElementUpdaters, currentlyFocusedElement);
	}

	function windowFocus(e) {
	  const window = e.target instanceof Window ? e.target : e.currentTarget instanceof Window ? e.currentTarget : e.target.ownerDocument.defaultView;
	  windowsFocusedUpdaters.set(window, true);
	  forEachUpdater(window, windowFocusedUpdaters, true);
	}

	function windowBlur(e) {
	  const window = e.target instanceof Window ? e.target : e.currentTarget instanceof Window ? e.currentTarget : e.target.ownerDocument.defaultView;
	  windowsFocusedUpdaters.set(window, false);
	  forEachUpdater(window, windowFocusedUpdaters, false);
	}
	/**
	 * Allows you to inspect which element in the `document` currently has focus, which was most recently focused if none are currently, and whether or not the window has focus by returning the following functions:
	 * * `getActiveElement()`
	 * * `getLastActiveElement()`
	 * * `getWindowFocused()`
	 *
	 * (The document's body receiving focus, like it does when you click on an empty area, is counted as no element having focus for all intents and purposes)
	 *
	 * This is a passive hook, so by default it returns getter functions that report this information but the component will not re-render by default when the active element changes.
	 *
	 * If you need the component to re-render when the active element changes, use the `on*Change` arguments to set some state on your end.
	 */


	function useActiveElement(_ref) {
	  let {
	    onActiveElementChange,
	    onLastActiveElementChange,
	    onWindowFocusedChange,
	    onMount,
	    onUnmount,
	    onMountChange
	  } = _ref;
	  useEnsureStability("useActiveElement", onActiveElementChange, onLastActiveElementChange, onWindowFocusedChange, onMountChange, onMount, onUnmount);
	  const {
	    getElement,
	    useRefElementProps
	  } = useRefElement({
	    onMount,
	    onUnmount,
	    onElementChange: T$2((element, prevValue) => {
	      onMountChange === null || onMountChange === void 0 ? void 0 : onMountChange(element, prevValue);

	      if (element) {
	        var _activeElementUpdater, _activeElementUpdater2, _activeElementUpdater3, _lastActiveElementUpd, _windowFocusedUpdater;

	        const document = element.ownerDocument;
	        const window = document === null || document === void 0 ? void 0 : document.defaultView;

	        if (((_activeElementUpdater = (_activeElementUpdater2 = activeElementUpdaters.get(window)) === null || _activeElementUpdater2 === void 0 ? void 0 : _activeElementUpdater2.size) !== null && _activeElementUpdater !== void 0 ? _activeElementUpdater : 0) === 0) {
	          document === null || document === void 0 ? void 0 : document.addEventListener("focusin", focusin, {
	            passive: true
	          });
	          document === null || document === void 0 ? void 0 : document.addEventListener("focusout", focusout, {
	            passive: true
	          });
	          window === null || window === void 0 ? void 0 : window.addEventListener("focus", windowFocus, {
	            passive: true
	          });
	          window === null || window === void 0 ? void 0 : window.addEventListener("blur", windowBlur, {
	            passive: true
	          });
	        } // Add them even if they're undefined to more easily
	        // manage the ">0 means don't add handlers" logic.


	        const localActiveElementUpdaters = (_activeElementUpdater3 = activeElementUpdaters.get(window)) !== null && _activeElementUpdater3 !== void 0 ? _activeElementUpdater3 : new Set();
	        const localLastActiveElementUpdaters = (_lastActiveElementUpd = lastActiveElementUpdaters.get(window)) !== null && _lastActiveElementUpd !== void 0 ? _lastActiveElementUpd : new Set();
	        const localWindowFocusedUpdaters = (_windowFocusedUpdater = windowFocusedUpdaters.get(window)) !== null && _windowFocusedUpdater !== void 0 ? _windowFocusedUpdater : new Set();
	        localActiveElementUpdaters.add(setActiveElement);
	        localLastActiveElementUpdaters.add(setLastActiveElement);
	        localWindowFocusedUpdaters.add(setWindowFocused);
	        activeElementUpdaters.set(window, localActiveElementUpdaters);
	        lastActiveElementUpdaters.set(window, localLastActiveElementUpdaters);
	        windowFocusedUpdaters.set(window, localWindowFocusedUpdaters);
	        return () => {
	          activeElementUpdaters.get(window).delete(setActiveElement);
	          lastActiveElementUpdaters.get(window).delete(setLastActiveElement);
	          windowFocusedUpdaters.get(window).delete(setWindowFocused);

	          if (activeElementUpdaters.size === 0) {
	            document === null || document === void 0 ? void 0 : document.removeEventListener("focusin", focusin);
	            document === null || document === void 0 ? void 0 : document.removeEventListener("focusout", focusout);
	            window === null || window === void 0 ? void 0 : window.removeEventListener("focus", windowFocus);
	            window === null || window === void 0 ? void 0 : window.removeEventListener("blur", windowBlur);
	          }
	        };
	      }
	    }, [])
	  });
	  const [getActiveElement, setActiveElement] = usePassiveState(onActiveElementChange, returnNull$3);
	  const [getLastActiveElement, setLastActiveElement] = usePassiveState(onLastActiveElementChange, returnNull$3);
	  const [getWindowFocused, setWindowFocused] = usePassiveState(onWindowFocusedChange, returnTrue);
	  return {
	    getElement,
	    useActiveElementProps: useRefElementProps,
	    getActiveElement,
	    getLastActiveElement,
	    getWindowFocused
	  };
	}

	function useHasFocus(_ref) {
	  let {
	    onFocusedChanged,
	    onFocusedInnerChanged,
	    onLastFocusedChanged,
	    onLastFocusedInnerChanged,
	    onLastActiveElementChange,
	    onActiveElementChange,
	    onWindowFocusedChange
	  } = _ref;
	  useEnsureStability("useHasFocus", onFocusedChanged, onFocusedInnerChanged, onLastFocusedChanged, onLastFocusedInnerChanged, onLastActiveElementChange, onActiveElementChange, onWindowFocusedChange);
	  const [getFocused, setFocused] = usePassiveState(onFocusedChanged, returnFalse$1);
	  const [getFocusedInner, setFocusedInner] = usePassiveState(onFocusedInnerChanged, returnFalse$1);
	  const [getLastFocused, setLastFocused] = usePassiveState(onLastFocusedChanged, returnFalse$1);
	  const [getLastFocusedInner, setLastFocusedInner] = usePassiveState(onLastFocusedInnerChanged, returnFalse$1);
	  const {
	    getActiveElement,
	    getLastActiveElement,
	    getWindowFocused,
	    useActiveElementProps,
	    getElement
	  } = useActiveElement({
	    onActiveElementChange: T$2((activeElement, prevActiveElement) => {
	      const selfElement = getElement();
	      const focused = selfElement != null && selfElement == activeElement;
	      const focusedInner = !!(selfElement !== null && selfElement !== void 0 && selfElement.contains(activeElement));
	      setFocused(focused);
	      setFocusedInner(focusedInner);
	      onActiveElementChange === null || onActiveElementChange === void 0 ? void 0 : onActiveElementChange(activeElement, prevActiveElement);
	    }, []),
	    onLastActiveElementChange: T$2((lastActiveElement, prevLastActiveElement) => {
	      const selfElement = getElement();
	      const focused = selfElement != null && selfElement == lastActiveElement;
	      const focusedInner = !!(selfElement !== null && selfElement !== void 0 && selfElement.contains(lastActiveElement));
	      setLastFocused(focused);
	      setLastFocusedInner(focusedInner);
	      onLastActiveElementChange === null || onLastActiveElementChange === void 0 ? void 0 : onLastActiveElementChange(lastActiveElement, prevLastActiveElement);
	    }, []),
	    onWindowFocusedChange
	  });
	  const useHasFocusProps = T$2(props => {
	    return useActiveElementProps(props);
	  }, [useActiveElementProps]);
	  return {
	    useHasFocusProps,
	    getElement,
	    getFocused,
	    getFocusedInner,
	    getLastFocused,
	    getLastFocusedInner,
	    getActiveElement,
	    getLastActiveElement,
	    getWindowFocused
	  };
	}

	function getFromLocalStorage() {
	  return function (key) {
	    let converter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse;

	    try {
	      const item = localStorage.getItem(key);
	      if (!item) return undefined;
	      return converter(item);
	    } catch (e) {
	      /* eslint-disable no-debugger */
	      debugger;
	      return undefined;
	    }
	  };
	}
	function storeToLocalStorage() {
	  return function (key, value) {
	    let converter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : JSON.stringify;

	    try {
	      localStorage.setItem(key, converter(value));
	    } catch (e) {
	      /* eslint-disable no-debugger */
	      debugger;
	    }
	  };
	}

	/**
	 * Hook that allows for the **direct descendant** children of this component to be re-ordered and sorted.
	 *
	 * Besides the prop-modifying hook that's returned, the `sort` function that's returned will
	 * sort all children according to their value from the `getValue` argument you pass in.
	 *
	 * If you want to perform some re-ordering operation that's *not* a sort, you can manually
	 * re-map each child's position using `mangleMap` and `demangleMap`, which convert between
	 * sorted and unsorted index positions.
	 *
	 * Again, unlike some other hooks, **these children must be direct descendants**. This is because
	 * the prop-modifying hook inspects the given children, then re-creates them with new `key`s.
	 * Because keys are given special treatment and a child has no way of modifying its own key
	 * there's no other time or place this can happen other than exactly within the parent component's render function.
	 */

	function useSortableChildren(_ref) {
	  let {
	    getIndex,
	    getValue,
	    compare: userCompare
	  } = _ref;
	  const compare = userCompare !== null && userCompare !== void 0 ? userCompare : defaultCompare; // These are used to keep track of a mapping between unsorted index <---> sorted index.
	  // These are needed for navigation with the arrow keys.

	  const mangleMap = s$2(new Map());
	  const demangleMap = s$2(new Map());
	  const indexMangler = T$2(n => {
	    var _mangleMap$current$ge;

	    return (_mangleMap$current$ge = mangleMap.current.get(n)) !== null && _mangleMap$current$ge !== void 0 ? _mangleMap$current$ge : n;
	  }, []);
	  const indexDemangler = T$2(n => {
	    var _demangleMap$current$;

	    return (_demangleMap$current$ = demangleMap.current.get(n)) !== null && _demangleMap$current$ !== void 0 ? _demangleMap$current$ : n;
	  }, []); // The sort function needs to be able to update whoever has all the sortable children.
	  // Because that might not be the consumer of *this* hook directly (e.g. a table uses
	  // this hook, but it's tbody that actually needs updating), we need to remotely
	  // get and set a forceUpdate function.

	  const [getForceUpdate, setForceUpdate] = usePassiveState(null, returnNull$1); // The actual sort function.

	  const sort = T$2(function (managedRows, direction) {
	    var _getForceUpdate;

	    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    const sortedRows = managedRows.slice().sort((lhsRow, rhsRow) => {
	      const lhsValue = getValue(lhsRow, ...args);
	      const rhsValue = getValue(rhsRow, ...args);
	      const result = compare(lhsValue, rhsValue); // lhsRow.getManagedCells()?.[column]?.value, rhsRow.getManagedCells()?.[column]?.value);

	      if (direction[0] == "d") return -result;
	      return result;
	    }); // Update our sorted <--> unsorted indices map 
	    // and rerender the whole table, basically

	    for (let indexAsSorted = 0; indexAsSorted < sortedRows.length; ++indexAsSorted) {
	      const indexAsUnsorted = sortedRows[indexAsSorted].index;
	      mangleMap.current.set(indexAsSorted, indexAsUnsorted);
	      demangleMap.current.set(indexAsUnsorted, indexAsSorted);
	    }

	    (_getForceUpdate = getForceUpdate()) === null || _getForceUpdate === void 0 ? void 0 : _getForceUpdate();
	  }, [
	    /* Must remain stable */
	  ]);
	  const useSortableProps = T$2(_ref2 => {
	    let {
	      children,
	      ...props
	    } = _ref2;
	    const forceUpdate = useForceUpdate();
	    h$1(() => {
	      setForceUpdate(_prev => forceUpdate);
	    }, [forceUpdate]);
	    return useMergedProps()({
	      role: "rowgroup",
	      children: children.slice().sort((lhs, rhs) => {
	        var _ref3, _demangleMap$current$2, _ref4, _demangleMap$current$3;

	        return ((_ref3 = (_demangleMap$current$2 = demangleMap.current.get(getIndex(lhs.props))) !== null && _demangleMap$current$2 !== void 0 ? _demangleMap$current$2 : getIndex(lhs.props)) !== null && _ref3 !== void 0 ? _ref3 : 0) - ((_ref4 = (_demangleMap$current$3 = demangleMap.current.get(getIndex(rhs.props))) !== null && _demangleMap$current$3 !== void 0 ? _demangleMap$current$3 : getIndex(rhs.props)) !== null && _ref4 !== void 0 ? _ref4 : 0);
	      }).map(child => v$2(child.type, { ...child.props,
	        key: getIndex(child.props)
	      }))
	    }, props);
	  }, []);
	  return {
	    useSortableProps,
	    sort,
	    indexMangler,
	    indexDemangler,
	    mangleMap,
	    demangleMap
	  };
	}

	function defaultCompare(lhs, rhs) {
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

	function returnNull$1() {
	  return null;
	}

	/*!
	* tabbable 5.3.3
	* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
	*/
	var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
	var NoElement = typeof Element === 'undefined';
	var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
	  return element.getRootNode();
	} : function (element) {
	  return element.ownerDocument;
	};

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

	var isZeroArea = function isZeroArea(node) {
	  var _node$getBoundingClie = node.getBoundingClientRect(),
	      width = _node$getBoundingClie.width,
	      height = _node$getBoundingClie.height;

	  return width === 0 && height === 0;
	};

	var isHidden = function isHidden(node, _ref) {
	  var displayCheck = _ref.displayCheck,
	      getShadowRoot = _ref.getShadowRoot; // NOTE: visibility will be `undefined` if node is detached from the document
	  //  (see notes about this further down), which means we will consider it visible
	  //  (this is legacy behavior from a very long way back)
	  // NOTE: we check this regardless of `displayCheck="none"` because this is a
	  //  _visibility_ check, not a _display_ check

	  if (getComputedStyle(node).visibility === 'hidden') {
	    return true;
	  }

	  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
	  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

	  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
	    return true;
	  } // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
	  //  (but NOT _the_ document; see second 'If' comment below for more).
	  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
	  //  is attached, and the one we need to check if it's in the document or not (because the
	  //  shadow, and all nodes it contains, is never considered in the document since shadows
	  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
	  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
	  //  visibility, including all the nodes it contains). The host could be any normal node,
	  //  or a custom element (i.e. web component). Either way, that's the one that is considered
	  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
	  //  tested).
	  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
	  //  document (per the docs) and while it's a Document-type object, that document does not
	  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
	  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
	  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
	  //  node is actually detached.


	  var nodeRootHost = getRootNode(node).host;
	  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);

	  if (!displayCheck || displayCheck === 'full') {
	    if (typeof getShadowRoot === 'function') {
	      // figure out if we should consider the node to be in an undisclosed shadow and use the
	      //  'non-zero-area' fallback
	      var originalNode = node;

	      while (node) {
	        var parentElement = node.parentElement;
	        var rootNode = getRootNode(node);

	        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
	        ) {
	          // node has an undisclosed shadow which means we can only treat it as a black box, so we
	          //  fall back to a non-zero-area test
	          return isZeroArea(node);
	        } else if (node.assignedSlot) {
	          // iterate up slot
	          node = node.assignedSlot;
	        } else if (!parentElement && rootNode !== node.ownerDocument) {
	          // cross shadow boundary
	          node = rootNode.host;
	        } else {
	          // iterate up normal dom
	          node = parentElement;
	        }
	      }

	      node = originalNode;
	    } // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
	    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
	    //  it might be a falsy value, which means shadow DOM support is disabled
	    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
	    //  now we can just test to see if it would normally be visible or not, provided it's
	    //  attached to the main document.
	    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
	    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.


	    if (nodeIsAttached) {
	      // this works wherever the node is: if there's at least one client rect, it's
	      //  somehow displayed; it also covers the CSS 'display: contents' case where the
	      //  node itself is hidden in place of its contents; and there's no need to search
	      //  up the hierarchy either
	      return !node.getClientRects().length;
	    } // Else, the node isn't attached to the document, which means the `getClientRects()`
	    //  API will __always__ return zero rects (this can happen, for example, if React
	    //  is used to render nodes onto a detached tree, as confirmed in this thread:
	    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
	    //
	    // It also means that even window.getComputedStyle(node).display will return `undefined`
	    //  because styles are only computed for nodes that are in the document.
	    //
	    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
	    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
	    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
	    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
	    //  considering __everything__ to be visible because of the innability to determine styles.

	  } else if (displayCheck === 'non-zero-area') {
	    // NOTE: Even though this tests that the node's client rect is non-zero to determine
	    //  whether it's displayed, and that a detached node will __always__ have a zero-area
	    //  client rect, we don't special-case for whether the node is attached or not. In
	    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
	    //  times, and that includes attached or not.
	    return isZeroArea(node);
	  } // visible, as far as we can tell, or per current `displayCheck` mode


	  return false;
	}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
	//  unless they are in the _first_ <legend> element of the top-most disabled
	//  fieldset


	var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
	  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
	    var parentNode = node.parentElement; // check if `node` is contained in a disabled <fieldset>

	    while (parentNode) {
	      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
	        // look for the first <legend> among the children of the disabled <fieldset>
	        for (var i = 0; i < parentNode.children.length; i++) {
	          var child = parentNode.children.item(i); // when the first <legend> (in document order) is found

	          if (child.tagName === 'LEGEND') {
	            // if its parent <fieldset> is not nested in another disabled <fieldset>,
	            // return whether `node` is a descendant of its first <legend>
	            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
	          }
	        } // the disabled <fieldset> containing `node` has no <legend>


	        return true;
	      }

	      parentNode = parentNode.parentElement;
	    }
	  } // else, node's tabbable/focusable state should not be affected by a fieldset's
	  //  enabled/disabled state


	  return false;
	};

	var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
	  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
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

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	(function (module, exports) {
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
	         * @param {!HTMLElement} rootElement The HTMLElement at the root of the inert subtree.
	         * @param {!InertManager} inertManager The global singleton InertManager object.
	         */
	        function InertRoot(rootElement, inertManager) {
	          _classCallCheck(this, InertRoot);
	          /** @type {!InertManager} */


	          this._inertManager = inertManager;
	          /** @type {!HTMLElement} */

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
	            /** @type {!HTMLElement} */
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
	           * @param {!HTMLElement} node
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
	              /** @type {!HTMLElement} */
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
	              /** @type {!HTMLElement} */
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
	            /** @type {!HTMLElement} */
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
	         * @param {!HTMLElement} root
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
	                  /** @type {!HTMLElement} */
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
	       * @param {(function (!HTMLElement))=} callback Callback to be called for each element traversed,
	       *     before descending into child nodes.
	       * @param {?ShadowRoot=} shadowRootAncestor The nearest ShadowRoot ancestor, if any.
	       */


	      function composedTreeWalk(node, callback, shadowRootAncestor) {
	        if (node.nodeType == Node.ELEMENT_NODE) {
	          var element =
	          /** @type {!HTMLElement} */
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

	      if (!HTMLElement.prototype.hasOwnProperty('inert')) {
	        /** @type {!InertManager} */
	        var inertManager = new InertManager(document);
	        Object.defineProperty(HTMLElement.prototype, 'inert', {
	          enumerable: true,

	          /** @this {!HTMLElement} */
	          get: function get() {
	            return this.hasAttribute('inert');
	          },

	          /** @this {!HTMLElement} */
	          set: function set(inert) {
	            inertManager.setInert(this, inert);
	          }
	        });
	      }
	    })();
	  });
	})();

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

	function blockingElements() {
	  return getDocument().$blockingElements;
	}
	/**
	 * Allows an element to trap focus by applying the "inert" attribute to all sibling, aunt, and uncle nodes.
	 *
	 * Automatically handles consecutive calls with a loosely applied stack operation
	 * (specifically via `blockingElements`, with a small polyfill because I'm not sure how long
	 * it'll take to find its way into the spec, if ever)
	 * @param target
	 */


	function useBlockingElement(enabled, getTarget) {
	  const stableGetTarget = useStableCallback(getTarget);
	  /**
	   * Push/pop the element from the blockingElements stack.
	   */

	  h$1(() => {
	    const target = stableGetTarget();

	    if (enabled) {
	      // Sometimes blockingElements will fail if, for example,
	      // the target element isn't connected to document.body.
	      // This is rare, but it's better to fail silently with weird tabbing behavior
	      // than to crash the entire application.
	      try {
	        blockingElements().push(target);
	        return () => {
	          blockingElements().remove(target);
	        };
	      } catch (ex) {
	        // Well, semi-silently.
	        console.error(ex);
	      }
	    }
	  }, [enabled]);
	}
	function getTopElement() {
	  return blockingElements().top;
	}

	const elementsToRestoreFocusTo = new Map();
	function useFocusTrap(_ref) {
	  let {
	    trapActive
	  } = _ref;
	  const handleActiveChange = T$2((trapActive, element) => {
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
	  }, []);
	  const {
	    getLastActiveElement,
	    useActiveElementProps,
	    getElement
	  } = useActiveElement({
	    onMountChange: useStableCallback(element => handleActiveChange(trapActive, element))
	  }); // When the trap becomes active, before we let the blockingElements hook run,
	  // keep track of whatever's currently focused and save it.

	  h$1(() => {
	    const element = getElement();

	    if (trapActive && element) {
	      var _getLastActiveElement;

	      const document = getDocument(element); // Save the currently focused element
	      // to whatever's currently at the top of the stack

	      elementsToRestoreFocusTo.set(getTopElement(), (_getLastActiveElement = getLastActiveElement()) !== null && _getLastActiveElement !== void 0 ? _getLastActiveElement : document.body);
	    }
	  }, [trapActive]);
	  useBlockingElement(trapActive, getElement);
	  /**
	   * Any time we activate or deactivate the trap,
	   * change focus to something else (something in
	   * the trap if it's active, or whatever we've
	   * tracked in elementsToRestoreFocusTo if not)
	   */

	  h$1(() => {
	    handleActiveChange(trapActive, getElement());
	  }, [trapActive]);

	  const useFocusTrapProps = props => {
	    const p1 = useActiveElementProps(props);
	    const p2 = {
	      "aria-modal": trapActive ? "true" : undefined
	    };
	    return useMergedProps()(p1, p2);
	  };

	  return {
	    useFocusTrapProps,
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

	function useMutationObserver(options) {
	  var _attributeFilter;

	  /* eslint-disable prefer-const */
	  let {
	    attributeFilter,
	    subtree,
	    onChildList,
	    characterDataOldValue,
	    onCharacterData,
	    onAttributes,
	    attributeOldValue
	  } = options || {};
	  if (typeof attributeFilter === "string") attributeFilter = [attributeFilter];
	  const attributeKey = (_attributeFilter = attributeFilter) === null || _attributeFilter === void 0 ? void 0 : _attributeFilter.join(";");
	  const attributes = !!onAttributes;
	  const characterData = !!onCharacterData;
	  const childList = !!onChildList;
	  const stableOnChildList = useStableCallback(onChildList !== null && onChildList !== void 0 ? onChildList : () => {});
	  const stableOnCharacterData = useStableCallback(onCharacterData !== null && onCharacterData !== void 0 ? onCharacterData : () => {});
	  const stableOnAttributes = useStableCallback(onAttributes !== null && onAttributes !== void 0 ? onAttributes : () => {});
	  const [_getMo, setMo] = usePassiveState(useStableCallback(observer => {
	    const element = getElement();

	    if (element && observer && (!!attributeKey || !!characterData || !!childList)) {
	      observer.observe(element, {
	        attributeFilter: attributeFilter,
	        attributeOldValue,
	        attributes,
	        characterData,
	        characterDataOldValue,
	        childList,
	        subtree
	      });
	      return () => observer.disconnect();
	    }
	  }), returnNull$3);
	  const onNeedMutationObserverReset = T$2(element => {
	    if (element) {
	      queueMicrotask(() => {
	        setMo(new MutationObserver(a => {
	          for (const mutation of a) {
	            switch (mutation.type) {
	              case "childList":
	                stableOnChildList(mutation);
	                break;

	              case "attributes":
	                stableOnAttributes(mutation);
	                break;

	              case "characterData":
	                stableOnCharacterData(mutation);
	                break;
	            }
	          }
	        }));
	      });
	    }
	  }, []);
	  _$1(() => {
	    onNeedMutationObserverReset(getElement());
	  }, [attributeKey, attributeOldValue, characterDataOldValue, subtree]);
	  const {
	    getElement,
	    useRefElementProps: useMutationObserverProps
	  } = useRefElement({
	    onElementChange: onNeedMutationObserverReset
	  });
	  return {
	    useMutationObserverProps,
	    getElement
	  };
	}

	const EventDetail = Symbol("event-detail");
	function enhanceEvent(e, detail) {
	  const event = e;
	  event[EventDetail] = detail;
	  return event;
	}

	let pulse = "vibrate" in navigator ? () => navigator.vibrate(10) : () => {};

	function excludes(target, exclude) {
	  if (exclude !== null && exclude !== void 0 && exclude[target]) return true;
	  return false;
	}
	/**
	 * selection.containsNode doesn't account for selection.isCollapsed,
	 * so here's a workaround for that.
	 *
	 * We also only look for the selection end to only catch the
	 * essense of a non-existant "selectionstop" event.
	 *
	 * @param element
	 * @returns
	 */


	function nodeSelectedTextLength(element) {
	  if (element && element instanceof Node) {
	    const selection = window.getSelection();

	    for (let i = 0; i < ((_selection$rangeCount = selection === null || selection === void 0 ? void 0 : selection.rangeCount) !== null && _selection$rangeCount !== void 0 ? _selection$rangeCount : 0); ++i) {
	      var _selection$rangeCount;

	      const range = selection.getRangeAt(i);

	      if (element.contains(range.endContainer) && !(selection !== null && selection !== void 0 && selection.isCollapsed)) {
	        return selection.toString().length;
	      }
	    }
	  }

	  return 0;
	}
	/**
	 * Adds the necessary event handlers to create a "press"-like event for
	 * buttons and anything else that's "click/tap/press/touch"-able.
	 *
	 * Notably, the following cases are covered:
	 * * The target element is properly focused, even on iOS Safari (*especially* on iOS Safari)
	 * * Double-clicks won't select text.
	 * * Conversely, manually selecting text won't invoke a press.
	 * * Keyboard events &mdash; `enter` immediately invokes the handler, while `space` invokes it on keyup.
	 * * Haptic feedback (on, like, the one browser combination that supports it &mdash; this can be disabled app-wide with `setButtonVibrate`)
	 *
	 * In addition, when the CSS `:active` pseudo-class would apply to a normal button
	 * (i.e. when holding the spacebar or during mousedown), `{ "data-pseudo-active": "true" }`
	 * is added to the props.  You can either let it pass through and style it through new CSS,
	 * or inspect the returned props for it and add e.g. an `.active` class for existing CSS
	 *
	 * @param onClickSync
	 * @param exclude Whether the polyfill shouldn't apply (can specify for specific interactions)
	 */


	function usePressEventHandlers(onClickSync, exclude) {
	  const {
	    useRefElementProps,
	    getElement
	  } = useRefElement({}); // A button can be activated in multiple ways, so on the off chance
	  // that multiple are triggered at once, we only *actually* register
	  // a press once all of our "on" signals have turned back to "off".
	  // We approximate this by just incrementing when active, and
	  // decrementing when deactivated.
	  //
	  // As an emergency failsafe, when the element looses focus,
	  // this is reset back to 0.

	  const [active, setActive, getActive] = useState(0); // If we the current text selection changes to include this element
	  // DURING e.g. a mousedown, then we don't want the mouseup to "count", as it were,
	  // because its only purpose was selecting text, not clicking buttons.
	  //
	  // To catch this, any time the text selection includes us while in the middle
	  // of a click, this flag is set, which cancels the activation of a press.
	  // The flag is reset any time the selection is empty or the button is
	  // no longer active.

	  const [textSelectedDuringActivationStartTime, setTextSelectedDuringActivationStartTime] = useState(null);
	  useGlobalHandler(document, "selectionchange", _ => {
	    setTextSelectedDuringActivationStartTime(prev => nodeSelectedTextLength(getElement()) == 0 ? null : prev != null ? prev : new Date());
	  });
	  useEffect(() => {
	    if (active == 0) setTextSelectedDuringActivationStartTime(null);
	  }, [active == 0]);
	  const onActiveStart = useStableCallback(_ => {
	    setActive(a => ++a);
	  });
	  const onActiveStop = useStableCallback(e => {
	    setActive(a => Math.max(0, --a));
	    const currentTime = new Date();
	    const timeDifference = textSelectedDuringActivationStartTime == null ? null : +currentTime - +textSelectedDuringActivationStartTime; // If we're selecting text (heuristically determined by selecting for longer than 1/4 a second, or more than 2 characters)
	    // then this isn't a press event.
	    // TODO: This should measure glyphs instead of characters.

	    if (timeDifference && timeDifference > 250 || nodeSelectedTextLength(getElement()) >= 2) {
	      e.preventDefault();
	      return;
	    }

	    if (getActive() <= 0) {
	      handlePress(e);
	    }
	  });
	  const handlePress = useStableCallback(e => {
	    if (onClickSync) {
	      // Note: The element is focused here because of iOS Safari.
	      //
	      // It's always iOS Safari.
	      //
	      // iOS Safari (tested on 12) downright refuses to allow 
	      // elements to be manually focused UNLESS it happens within
	      // an event handler like this.  It also doesn't focus
	      // buttons by default when clicked, tapped, etc.
	      //
	      // If it becomes problematic that button-likes explicitly become
	      // focused when they are pressed, then an alternative solution for
	      // the question of "how do menu buttons keep their menus open"
	      // and other focus-related nonsense needs to be figured out.
	      //
	      // For iOS Safari.
	      //
	      const element = getElement();
	      if (element && "focus" in element) element === null || element === void 0 ? void 0 : element.focus(); // Whatever the browser was going to do with this event,
	      // forget it. We're turning it into a "press" event.

	      e.preventDefault(); // Also stop anyone else from listening to this event,
	      // since we're explicitly handling it.
	      // (Notably, this allows labels to wrap inputs, with them
	      // both having press event handlers, without double-firing)

	      e.stopPropagation(); // Haptic feedback for this press event

	      pulse(); // Actually call our handler.

	      onClickSync(e);
	    }
	  });
	  const onMouseDown = excludes("click", exclude) ? undefined : e => {
	    // Stop double clicks from selecting text in an component that's *supposed* to be acting like a button,
	    // but also don't prevent the user from selecting that text manually if they really want to
	    // (which user-select: none would do, but cancelling a double click on mouseDown doesn't)
	    if (e.detail > 1) e.preventDefault();
	    if (e.button === 0) onActiveStart(e);
	  };
	  const onMouseUp = excludes("click", exclude) ? undefined : e => {
	    if (e.button === 0 && active > 0) onActiveStop(e);
	  };

	  const onBlur = _ => {
	    setActive(0);
	  };

	  const onMouseLeave = excludes("click", exclude) ? undefined : onBlur;
	  const onKeyDown = excludes("space", exclude) && excludes("enter", exclude) ? undefined : e => {
	    if (e.key == " " && onClickSync && !excludes("space", exclude)) {
	      // We don't actually activate it on a space keydown
	      // but we do preventDefault to stop the page from scrolling.
	      onActiveStart(e);
	      e.preventDefault();
	    }

	    if (e.key == "Enter" && !excludes("enter", exclude)) {
	      e.preventDefault();
	      onActiveStart(e);
	      onActiveStop(e);
	    }
	  };
	  const onKeyUp = excludes("space", exclude) ? undefined : e => {
	    if (e.key == " " && !excludes("space", exclude)) onActiveStop(e);
	  };

	  const onClick = e => {
	    e.preventDefault();

	    if (e.detail > 1) {
	      e.stopImmediatePropagation();
	      e.stopPropagation();
	    }
	  };

	  return props => useRefElementProps(useMergedProps()({
	    onKeyDown,
	    onKeyUp,
	    onBlur,
	    onMouseDown,
	    onMouseUp,
	    onMouseLeave,
	    onClick,
	    style: textSelectedDuringActivationStartTime != null ? {
	      cursor: "text"
	    } : undefined,
	    ...{
	      "data-pseudo-active": active && textSelectedDuringActivationStartTime == null ? "true" : undefined
	    }
	  }, props));
	}
	function useAriaButton(_ref) {
	  let {
	    tag,
	    pressed,
	    onPress
	  } = _ref;

	  function useAriaButtonProps(_ref2) {
	    let {
	      "aria-pressed": ariaPressed,
	      tabIndex,
	      role,
	      ...p
	    } = _ref2;
	    const props = usePressEventHandlers(e => onPress === null || onPress === void 0 ? void 0 : onPress(enhanceEvent(e, {
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

	function useAriaAccordion(_ref) {
	  let {
	    expandedIndex,
	    setExpandedIndex
	  } = _ref;
	  const [lastFocusedIndex, setLastFocusedIndex, _getLastFocusedIndex] = useState(null);
	  const [_currentFocusedIndex, setCurrentFocusedIndex, getCurrentFocusedIndex] = useState(null);
	  const stableSetExpandedIndex = useStableCallback(setExpandedIndex !== null && setExpandedIndex !== void 0 ? setExpandedIndex : () => {});
	  const {
	    managedChildren: managedAccordionSections,
	    useManagedChild: useManagedChildSection
	  } = useChildManager();
	  const navigateToFirst = T$2(() => {
	    setLastFocusedIndex(0);
	  }, []);
	  const navigateToLast = T$2(() => {
	    setLastFocusedIndex(managedAccordionSections.length - 1);
	  }, []);
	  const navigateToPrev = T$2(() => {
	    setLastFocusedIndex(i => (i !== null && i !== void 0 ? i : 0) - 1);
	  }, []);
	  const navigateToNext = T$2(() => {
	    setLastFocusedIndex(i => (i !== null && i !== void 0 ? i : 0) + 1);
	  }, []);
	  const {
	    useLinearNavigationProps
	  } = useLinearNavigation({
	    managedChildren: managedAccordionSections,
	    navigationDirection: "block",
	    index: lastFocusedIndex !== null && lastFocusedIndex !== void 0 ? lastFocusedIndex : 0,
	    navigateToFirst,
	    navigateToLast,
	    navigateToPrev,
	    navigateToNext
	  });
	  useChildFlag({
	    activatedIndex: expandedIndex,
	    managedChildren: managedAccordionSections,
	    setChildFlag: (i, open) => {
	      var _managedAccordionSect;

	      return (_managedAccordionSect = managedAccordionSections[i]) === null || _managedAccordionSect === void 0 ? void 0 : _managedAccordionSect.setOpenFromParent(open);
	    },
	    getChildFlag: i => {
	      var _managedAccordionSect2, _managedAccordionSect3;

	      return (_managedAccordionSect2 = (_managedAccordionSect3 = managedAccordionSections[i]) === null || _managedAccordionSect3 === void 0 ? void 0 : _managedAccordionSect3.getOpenFromParent()) !== null && _managedAccordionSect2 !== void 0 ? _managedAccordionSect2 : null;
	    }
	  });
	  useChildFlag({
	    activatedIndex: lastFocusedIndex,
	    managedChildren: managedAccordionSections,
	    setChildFlag: (i, open) => open && managedAccordionSections[i].focus(),
	    getChildFlag: _ => false
	  });
	  const useAriaAccordionSection = T$2(args => {
	    var _ref2, _args$open;

	    const index = args.index;
	    const [openFromParent, setOpenFromParent, getOpenFromParent] = useState(null);
	    const {
	      useRandomIdProps: useBodyRandomIdProps,
	      useReferencedIdProps: useReferencedBodyIdProps
	    } = useRandomId({
	      prefix: "aria-accordion-section-body-"
	    });
	    const {
	      useRandomIdProps: useHeadRandomIdProps,
	      useReferencedIdProps: useReferencedHeadIdProps
	    } = useRandomId({
	      prefix: "aria-accordion-section-header-"
	    });
	    const open = (_ref2 = (_args$open = args.open) !== null && _args$open !== void 0 ? _args$open : openFromParent) !== null && _ref2 !== void 0 ? _ref2 : null; // TODO: Convert to use useManagedChild so that this hook 
	    // is stable without (directly) depending on the open state.

	    const useAriaAccordionSectionHeader = T$2(function useAriaAccordionSectionHeader(_ref3) {
	      const {
	        getElement,
	        useHasFocusProps
	      } = useHasFocus({
	        onFocusedChanged: T$2(focused => {
	          if (focused) setCurrentFocusedIndex(index);else setCurrentFocusedIndex(oldIndex => oldIndex === index ? null : index);
	        }, [])
	      });
	      const focus = T$2(() => {
	        var _getElement;

	        if (getCurrentFocusedIndex() != null) (_getElement = getElement()) === null || _getElement === void 0 ? void 0 : _getElement.focus();
	      }, []);
	      const {
	        useManagedChildProps
	      } = useManagedChildSection({
	        index,
	        open,
	        setOpenFromParent,
	        getOpenFromParent,
	        focus
	      });

	      function useAriaAccordionSectionHeaderProps(_ref4) {
	        let {
	          ["aria-expanded"]: ariaExpanded,
	          ["aria-disabled"]: ariaDisabled,
	          ...props
	        } = _ref4;

	        const onFocus = () => {
	          setLastFocusedIndex(args.index);
	        };

	        const onClick = () => {
	          if (getOpenFromParent()) stableSetExpandedIndex(null);else stableSetExpandedIndex(args.index);
	        };

	        const retB = useMergedProps()({
	          tabIndex: 0
	        }, usePressEventHandlers(onClick, undefined)(props));
	        const ret3 = useMergedProps()(useHeadRandomIdProps(useReferencedBodyIdProps("aria-controls")({
	          "aria-expanded": ariaExpanded !== null && ariaExpanded !== void 0 ? ariaExpanded : (!!open).toString(),
	          "aria-disabled": ariaDisabled !== null && ariaDisabled !== void 0 ? ariaDisabled : open ? "true" : undefined,
	          ...useHasFocusProps(useManagedChildProps(retB))
	        })), {
	          onFocus
	        });
	        return useLinearNavigationProps(ret3);
	      }

	      return {
	        useAriaAccordionSectionHeaderProps
	      };
	    }, [useLinearNavigationProps, index, open]);
	    const useAriaAccordionSectionBody = T$2(function useAriaAccordionSectionBody() {
	      function useAriaAccordionSectionBodyProps(_ref5) {
	        let {
	          role,
	          ...props
	        } = _ref5;
	        const ret1 = useReferencedHeadIdProps("aria-labelledby")({
	          role: role !== null && role !== void 0 ? role : "region",
	          ...props
	        });
	        const ret2 = useBodyRandomIdProps(ret1);
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
	  }, [useLinearNavigationProps]);
	  return {
	    useAriaAccordionSection,
	    managedChildren: managedAccordionSections
	  };
	}

	/**
	 * Adds an ID and "aria-labelledby" for two elements, an "input" element and a "label" element.
	 *
	 * Returns the `useReferencedIdProps` hooks if you need to also add other ID-referencing attributes, like `for`
	 *
	 * @see useInputLabel
	 */

	function useGenericLabel() {
	  let {
	    labelPrefix,
	    inputPrefix,
	    backupText
	  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	    labelPrefix: "label-",
	    inputPrefix: "input-"
	  };
	  const [labelElement, setLabelElement] = y$1(null);
	  const [inputElement, setInputElement] = y$1(null);
	  const {
	    getElement: getLabelElement,
	    useRefElementProps: useLabelRefElementProps
	  } = useRefElement({
	    onElementChange: setLabelElement
	  });
	  const {
	    getElement: getInputElement,
	    useRefElementProps: useInputRefElementProps
	  } = useRefElement({
	    onElementChange: setInputElement
	  });
	  const {
	    useRandomIdProps: useLabelRandomIdProps,
	    id: labelId,
	    useReferencedIdProps: useReferencedLabelIdProps
	  } = useRandomId({
	    prefix: labelPrefix
	  });
	  const {
	    useRandomIdProps: useInputRandomIdProps,
	    id: inputId,
	    useReferencedIdProps: useReferencedInputIdProps
	  } = useRandomId({
	    prefix: inputPrefix
	  });
	  const labelHasMounted = !!labelElement;
	  const useGenericLabelLabel = T$2(function useGenericLabelLabel() {
	    return {
	      useGenericLabelLabelProps: props => {
	        return useLabelRandomIdProps(useLabelRefElementProps(props));
	      }
	    };
	  }, []);
	  const useGenericLabelInput = T$2(function useGenericLabelInput() {
	    return {
	      useGenericLabelInputProps: _ref => {
	        var _ref2;

	        let {
	          "aria-labelledby": ariaLabelledby,
	          "aria-label": ariaLabel,
	          ...props
	        } = _ref;
	        console.assert(!ariaLabelledby);
	        return useInputRandomIdProps(useReferencedLabelIdProps("aria-labelledby")(useInputRefElementProps(useMergedProps()({
	          "aria-label": (_ref2 = !labelHasMounted ? backupText : ariaLabel) !== null && _ref2 !== void 0 ? _ref2 : ariaLabel
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

	function useInputLabel() {
	  let {
	    labelPrefix,
	    inputPrefix
	  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	    labelPrefix: "label-",
	    inputPrefix: "input-"
	  };
	  const {
	    useGenericLabelInput,
	    useGenericLabelLabel,
	    useReferencedInputIdProps,
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
	  const useInputLabelLabel = T$2(function useInputLabelLabel(_ref3) {
	    let {
	      tag
	    } = _ref3;
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
	  const useInputLabelInput = T$2(function useInputLabelInput() {
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


	function useCheckboxLike(_ref4) {
	  let {
	    checked,
	    disabled,
	    labelPosition,
	    onInput,
	    role
	  } = _ref4;
	  const stableOnInput = useStableCallback(e => {
	    e.preventDefault();
	    onInput === null || onInput === void 0 ? void 0 : onInput(e);
	  });
	  const {
	    useInputLabelInput: useILInput,
	    useInputLabelLabel: useILLabel,
	    getLabelElement,
	    getInputElement
	  } = useInputLabel({
	    labelPrefix: "aria-checkbox-label-",
	    inputPrefix: "aria-checkbox-input-"
	  });
	  const useCheckboxLikeInputElement = T$2(function useCheckboxInputElement(_ref5) {
	    let {
	      tag
	    } = _ref5;
	    const {
	      useInputLabelInputProps: useILInputProps
	    } = useILInput();
	    const {
	      useRefElementProps,
	      getElement
	    } = useRefElement({}); // onClick and onChange are a bit messy, so we need to
	    // *always* make sure that the visible state is correct
	    // after all the event dust settles.
	    // See https://github.com/preactjs/preact/issues/2745,
	    // and https://github.com/preactjs/preact/issues/1899#issuecomment-525690194

	    _$1(() => {
	      const element = getElement();

	      if (element && tag == "input") {
	        element.checked = checked;
	      }
	    }, [tag, checked]);
	    return {
	      getInputElement: getElement,
	      useCheckboxLikeInputElementProps
	    };

	    function useCheckboxLikeInputElementProps(_ref6) {
	      let { ...p0
	      } = _ref6;
	      // For some reason, Chrome won't fire onInput events for radio buttons that are tabIndex=-1??
	      // Needs investigating, but onInput works fine in Firefox
	      // TODO
	      let props = usePressEventHandlers(disabled || !handlesInput(tag, labelPosition, "input-element") ? undefined : stableOnInput, undefined)({});
	      if (tag == "input") props.onInput = e => e.preventDefault();
	      props = useRefElementProps(useILInputProps(props));

	      if (labelPosition == "wrapping") {
	        // Because the wrapped label handles all interactions,
	        // we need to make sure this element can't be interacted with
	        // even if it's an input element.
	        props.inert = true;
	        props.tabIndex = -1;

	        props.onFocus = _ => getLabelElement().focus();
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
	  const useCheckboxLikeLabelElement = T$2(function useCheckboxLabelElement(_ref7) {
	    let {
	      tag
	    } = _ref7;
	    const {
	      useInputLabelLabelProps: useILLabelProps
	    } = useILLabel({
	      tag
	    });

	    function useCheckboxLikeLabelElementProps(_ref8) {
	      let { ...p0
	      } = _ref8;
	      const newProps = usePressEventHandlers(disabled || !handlesInput(tag, labelPosition, "label-element") ? undefined : stableOnInput, undefined)({});

	      if (labelPosition == "wrapping") {
	        if (p0.tabIndex == null) newProps.tabIndex = 0;
	        if (p0.role == null) newProps.role = role;
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

	function useAriaCheckbox(_ref) {
	  let {
	    labelPosition,
	    checked,
	    onInput,
	    disabled
	  } = _ref;

	  const onInputEnhanced = e => onInput === null || onInput === void 0 ? void 0 : onInput(enhanceEvent(e, {
	    checked: !checked
	  }));

	  const {
	    useCheckboxLikeInputElement,
	    useCheckboxLikeLabelElement
	  } = useCheckboxLike({
	    checked: !!checked,
	    labelPosition,
	    role: "checkbox",
	    disabled,
	    onInput: onInputEnhanced
	  });
	  const useCheckboxInputElement = T$2(function useCheckboxInputElement(_ref2) {
	    let {
	      tag
	    } = _ref2;
	    const {
	      getInputElement,
	      useCheckboxLikeInputElementProps
	    } = useCheckboxLikeInputElement({
	      tag
	    });
	    const isMixed = checked == "mixed";
	    _$1(() => {
	      const inputElement = getInputElement();

	      if (inputElement && tag === "input") {
	        inputElement.indeterminate = isMixed;
	      }
	    }, [isMixed, tag]);
	    return {
	      useCheckboxInputElementProps
	    };

	    function useCheckboxInputElementProps(_ref3) {
	      var _props$checked;

	      let { ...p0
	      } = _ref3;
	      const props = useCheckboxLikeInputElementProps(p0);
	      (_props$checked = props.checked) !== null && _props$checked !== void 0 ? _props$checked : props.checked = !!checked;
	      if (tag == "input") props.type = "checkbox";
	      return props;
	    }
	  }, [useCheckboxLikeInputElement, checked, labelPosition, disabled]);
	  const useCheckboxLabelElement = T$2(function useCheckboxLabelElement(_ref4) {
	    let {
	      tag
	    } = _ref4;
	    const {
	      useCheckboxLikeLabelElementProps
	    } = useCheckboxLikeLabelElement({
	      tag
	    });

	    function useCheckboxLabelElementProps(_ref5) {
	      let { ...props
	      } = _ref5;
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

	function useSoftDismiss(_ref) {
	  let {
	    onClose,
	    getElements
	  } = _ref;
	  const stableOnClose = useStableCallback(onClose);
	  const stableGetElements = useStableCallback(getElements);
	  const getOpen = useStableGetter(open);
	  const onBackdropClick = T$2(function onBackdropClick(e) {
	    var _getElement;

	    const document = (_getElement = getElement()) === null || _getElement === void 0 ? void 0 : _getElement.ownerDocument; // Basically, "was this event fired on the root-most element, or at least an element not contained by the modal?"
	    // Either could be how the browser handles these sorts of "interacting with nothing" events.

	    if (e.target == (document === null || document === void 0 ? void 0 : document.documentElement)) {
	      stableOnClose("backdrop");
	    }

	    let elements = stableGetElements();

	    if (elements && e.target instanceof Element) {
	      if (!Array.isArray(elements)) elements = [elements];
	      let foundInsideClick = false;

	      for (const element of elements) {
	        if (element.contains(e.target)) {
	          foundInsideClick = true;
	          break;
	        }
	      }

	      if (!foundInsideClick) onClose("backdrop");
	    }
	  }, []);
	  const {
	    useActiveElementProps,
	    getElement
	  } = useActiveElement({
	    onLastActiveElementChange: T$2(newElement => {
	      let validFocusableElements = stableGetElements();

	      if (validFocusableElements) {
	        if (!Array.isArray(validFocusableElements)) validFocusableElements = [validFocusableElements];

	        for (const focusable of validFocusableElements) {
	          if (focusable !== null && focusable !== void 0 && focusable.contains(newElement)) return;
	        }
	      }

	      onClose("lost-focus");
	    }, [])
	  });
	  const {
	    useRefElementProps
	  } = useRefElement({
	    onElementChange: T$2(e => {
	      const document = e === null || e === void 0 ? void 0 : e.ownerDocument;
	      const window = document === null || document === void 0 ? void 0 : document.defaultView; // Since everything else is inert, we listen for captured clicks on the window
	      // (we don't use onClick since that doesn't fire when clicked on empty/inert areas)
	      // Note: We need a *separate* touch event on mobile Safari, because
	      // it doesn't let click events bubble or be captured from traditionally non-interactive elements,
	      // but touch events work as expected.

	      const mouseDown = e => {
	        if (getOpen()) onBackdropClick(e);
	      };

	      const touchStart = e => {
	        if (getOpen()) onBackdropClick(e);
	      };

	      const keyDown = e => {
	        if (e.key === "Escape") {
	          stableOnClose("escape");
	        }
	      };

	      window === null || window === void 0 ? void 0 : window.addEventListener("mousedown", mouseDown, {
	        capture: true
	      });
	      window === null || window === void 0 ? void 0 : window.addEventListener("touchstart", touchStart, {
	        capture: true
	      });
	      window === null || window === void 0 ? void 0 : window.addEventListener("keydown", keyDown);
	      return () => {
	        window === null || window === void 0 ? void 0 : window.removeEventListener("mousedown", mouseDown);
	        window === null || window === void 0 ? void 0 : window.removeEventListener("touchstart", touchStart);
	        window === null || window === void 0 ? void 0 : window.removeEventListener("keydown", keyDown);
	      };
	    }, [])
	  });
	  return {
	    useSoftDismissProps: T$2(props => useActiveElementProps(useRefElementProps(props)), [useActiveElementProps, useRefElementProps])
	  };
	}
	/**
	 * A generic modal hook, used by modal dialogs, but can also
	 * be used by anything that's modal with a backdrop.
	 * @param param0
	 * @returns
	 */

	function useModal(_ref2) {
	  let {
	    open,
	    onClose
	  } = _ref2;
	  const stableOnClose = useStableCallback(onClose);
	  const [modalDescribedByBody, setModalDescribedByBody] = useState(false);
	  useHideScroll(open);
	  const {
	    useRandomIdProps: useModalIdProps
	  } = useRandomId({
	    prefix: "aria-modal-"
	  });
	  const {
	    useRandomIdProps: useBodyIdProps,
	    useReferencedIdProps: useBodyReferencingIdProps
	  } = useRandomId({
	    prefix: "aria-modal-body-"
	  });
	  const {
	    useRandomIdProps: useTitleIdProps,
	    useReferencedIdProps: useTitleReferencingIdProps
	  } = useRandomId({
	    prefix: "aria-modal-title-"
	  });
	  const {
	    useRefElementProps: useModalRefElement,
	    getElement: getModalElement
	  } = useRefElement({});
	  const {
	    useSoftDismissProps
	  } = useSoftDismiss({
	    onClose: stableOnClose,
	    getElements: getModalElement
	  });
	  const useModalBackdrop = T$2(function useModalBackdrop() {
	    function useModalBackdropProps(props) {
	      return useMergedProps()({
	        onPointerUp: () => stableOnClose("backdrop")
	      }, props);
	    }

	    return {
	      useModalBackdropProps
	    };
	  }, []);

	  const useModalProps = function (_ref3) {
	    let {
	      "aria-modal": ariaModal,
	      role,
	      ...p0
	    } = _ref3;
	    console.assert(!ariaModal);
	    const {
	      useFocusTrapProps
	    } = useFocusTrap({
	      trapActive: open
	    });
	    const p1 = useTitleReferencingIdProps("aria-labelledby")(p0);
	    const p2 = useModalIdProps(p1);
	    const pFinal = useBodyReferencingIdProps("aria-describedby")(p2);
	    return useFocusTrapProps(useSoftDismissProps(useMergedProps()(useModalRefElement({
	      role: role || "dialog"
	    }), modalDescribedByBody ? pFinal : p2)));
	  };

	  const useModalTitle = T$2(function useModalTitle() {
	    const useModalTitleProps = function (props) {
	      return useTitleIdProps(props);
	    };

	    return {
	      useModalTitleProps
	    };
	  }, []);
	  const useModalBody = T$2(function useModalBody(_ref4) {
	    let {
	      descriptive
	    } = _ref4;
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
	  const [getScrollbarWidth, setScrollbarWidth] = usePassiveState(null);
	  const [getScrollbarHeight, setScrollbarHeight] = usePassiveState(null);
	  _$1(() => {
	    if (hideScroll) {
	      // When scrolling is resumed, we'll need to restore the original scroll positions
	      // so we need to keep this information around
	      const originalScrollTop = document.documentElement.scrollTop;
	      const originalScrollLeft = document.documentElement.scrollLeft; // Measure the width of the page (minus the scrollbar)

	      const widthWithScrollBar = document.documentElement.scrollWidth;
	      const heightWithScrollBar = document.documentElement.scrollHeight; // Apply a class that hides the scrollbar.

	      document.documentElement.classList.add("document-scroll-hidden"); // In case multiple things are locking scroll, keep track of how many are doing that
	      // (just add 1 on enable, subtract 1 on disable)

	      document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") + 1).toString(); // Measure the new width without a scrollbar 
	      // so we can take the difference as the scrollbar width.

	      const widthWithoutScrollBar = document.documentElement.scrollWidth;
	      const heightWithoutScrollBar = document.documentElement.scrollHeight;
	      let scrollbarWidth = widthWithoutScrollBar - widthWithScrollBar;
	      let scrollbarHeight = heightWithoutScrollBar - heightWithScrollBar; // Failsafe -- if this measuring trick does something unexpected, just ignore it

	      if (scrollbarWidth > 80) scrollbarWidth = 0;
	      if (scrollbarHeight > 80) scrollbarHeight = 0; // Make our measurements available as CSS properties for general use

	      document.documentElement.style.setProperty("--root-scrollbar-width", `${scrollbarWidth}px`);
	      document.documentElement.style.setProperty("--root-scrollbar-height", `${scrollbarHeight}px`);
	      document.documentElement.style.setProperty("--root-scrollstop-top", `${originalScrollTop}px`);
	      document.documentElement.style.setProperty("--root-scrollstop-left", `${originalScrollLeft}px`);
	      setScrollbarWidth(scrollbarWidth);
	      setScrollbarHeight(scrollbarHeight);
	      return () => {
	        // Undo all the things we just did
	        document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") - 1).toString();

	        if (document.documentElement.dataset["scrollHiders"] == "0") {
	          // If we were the last scroll-locking thing to stop, then remove the class that stops scrolling.
	          document.documentElement.removeAttribute("data-scroll-hiders");
	          document.documentElement.classList.remove("document-scroll-hidden"); // Also, restore the original scroll position
	          // We do this by forcing the scroll behavior to not be smooth
	          // (it's instant if nothing is set to smooth, https://www.w3.org/TR/cssom-view/#scrolling),
	          // scrolling, then restoring the original scroll behavior 
	          // (which was probably already auto anyway, but just to be safe)

	          const originalScrollBehavior = document.documentElement.style.scrollBehavior;
	          document.documentElement.style.scrollBehavior = "auto";
	          document.documentElement.scrollTo({
	            top: originalScrollTop,
	            left: originalScrollLeft,
	            behavior: "auto"
	          });
	          document.documentElement.style.scrollBehavior = originalScrollBehavior;
	        }
	      };
	    }
	  }, [hideScroll]);
	  return {
	    getScrollbarWidth,
	    getScrollbarHeight
	  };
	}

	function useAriaDialog(_ref) {
	  let {
	    open,
	    onClose
	  } = _ref;
	  // TODO: Differences between dialog and modal go here, presumably.
	  // Non-modal dialogs need to be able to be repositioned, etc.
	  const {
	    useModalBackdrop,
	    useModalBody,
	    useModalProps,
	    useModalTitle
	  } = useModal({
	    open,
	    onClose
	  });
	  const useDialogBackdrop = T$2(() => {
	    const {
	      useModalBackdropProps
	    } = useModalBackdrop();
	    return {
	      useDialogBackdropProps: useModalBackdropProps
	    };
	  }, [useModalBackdrop]);
	  const useDialogBody = T$2(_ref2 => {
	    let {
	      descriptive
	    } = _ref2;
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
	  const useDialogTitle = T$2(() => {
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

	function useDrawer(_ref) {
	  let {
	    open,
	    onClose
	  } = _ref;
	  // TODO: Drawers are not always modal.
	  const {
	    useModalBackdrop,
	    useModalBody,
	    useModalProps,
	    useModalTitle
	  } = useModal({
	    open,
	    onClose
	  });
	  const useDrawerBackdrop = T$2(() => {
	    const {
	      useModalBackdropProps
	    } = useModalBackdrop();
	    return {
	      useDrawerBackdropProps: useModalBackdropProps
	    };
	  }, [useModalBackdrop]);
	  const useDrawerBody = T$2(_ref2 => {
	    let {
	      descriptive
	    } = _ref2;
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
	  const useDrawerTitle = T$2(() => {
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

	function useAriaListboxSingle(_ref) {
	  let {
	    selectedIndex,
	    onSelect,
	    selectionMode,
	    ...args
	  } = _ref;
	  const [anyItemsFocused, setAnyItemsFocused, getAnyItemsFocused] = useState(false);
	  const {
	    useGenericLabelInput,
	    useGenericLabelLabel,
	    getInputElement
	  } = useGenericLabel({
	    labelPrefix: "aria-listbox-label-",
	    inputPrefix: "aria-listbox-"
	  });
	  const {
	    useListNavigationChild,
	    useListNavigationProps,
	    navigateToIndex,
	    managedChildren,
	    tabbableIndex,
	    focusCurrent,
	    currentTypeahead,
	    invalidTypeahead
	  } = useListNavigation({ ...args,
	    shouldFocusOnChange: getAnyItemsFocused
	  });
	  const {
	    useGenericLabelInputProps
	  } = useGenericLabelInput();
	  const stableOnSelect = useStableCallback(onSelect !== null && onSelect !== void 0 ? onSelect : () => {}); // Track whether the currently focused element is a child of the list box parent element.
	  // When it's not, we reset the tabbable index back to the currently selected element.

	  const {
	    useActiveElementProps
	  } = useActiveElement({
	    onActiveElementChange: T$2(activeElement => {
	      var _getInputElement;

	      return setAnyItemsFocused(!!((_getInputElement = getInputElement()) !== null && _getInputElement !== void 0 && _getInputElement.contains(activeElement)));
	    }, [])
	  });
	  _$1(() => {
	    if (!anyItemsFocused) navigateToIndex(selectedIndex);
	  }, [anyItemsFocused, selectedIndex, navigateToIndex]);
	  useChildFlag({
	    activatedIndex: selectedIndex,
	    managedChildren,
	    setChildFlag: (i, selected) => {
	      var _managedChildren$i;

	      return (_managedChildren$i = managedChildren[i]) === null || _managedChildren$i === void 0 ? void 0 : _managedChildren$i.setSelected(selected);
	    },
	    getChildFlag: i => {
	      var _managedChildren$i$ge, _managedChildren$i2;

	      return (_managedChildren$i$ge = (_managedChildren$i2 = managedChildren[i]) === null || _managedChildren$i2 === void 0 ? void 0 : _managedChildren$i2.getSelected()) !== null && _managedChildren$i$ge !== void 0 ? _managedChildren$i$ge : null;
	    }
	  });
	  useLayoutEffect(() => {
	    navigateToIndex(selectedIndex);
	  }, [selectedIndex, managedChildren.length]);
	  const childCount = managedChildren.length;
	  const useListboxSingleItem = T$2(info => {
	    const [selected, setSelected, getSelected] = useState(null);
	    const {
	      tabbable,
	      useListNavigationChildProps
	    } = useListNavigationChild({
	      setSelected,
	      getSelected,
	      ...info
	    });
	    const {
	      getElement,
	      useRefElementProps
	    } = useRefElement({});
	    const index = info.index;
	    _$1(() => {
	      const element = getElement();

	      if (element && tabbable && selectionMode == "focus") {
	        stableOnSelect === null || stableOnSelect === void 0 ? void 0 : stableOnSelect({
	          target: element,
	          currentTarget: element,
	          [EventDetail]: {
	            selectedIndex: index
	          }
	        });
	      }
	    }, [tabbable, selectionMode, index]);
	    return {
	      useListboxSingleItemProps,
	      tabbable,
	      selected,
	      getSelected
	    };

	    function useListboxSingleItemProps(props) {
	      const newProps = usePressEventHandlers(info.disabled ? null : e => {
	        navigateToIndex(info.index);
	        const element = getElement();
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
	      props["aria-selected"] = (selected !== null && selected !== void 0 ? selected : false).toString();
	      if (info.disabled) props["aria-disabled"] = "true";
	      return useListNavigationChildProps(useMergedProps()(newProps, useRefElementProps(props)));
	    }
	  }, [useListNavigationChild, selectionMode, childCount]);
	  const useListboxSingleLabel = T$2(function useListboxSingleLabel() {
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
	    invalidTypeahead,
	    managedChildren
	  };

	  function useListboxSingleProps(props) {
	    props.role = "listbox";
	    return useListNavigationProps(useGenericLabelInputProps(useActiveElementProps(props)));
	  }
	}

	function useAriaListboxMulti(_ref) {
	  let { ...args
	  } = _ref;
	  const {
	    useHasFocusProps,
	    getFocusedInner
	  } = useHasFocus({});
	  const {
	    useGenericLabelInput,
	    useGenericLabelLabel
	  } = useGenericLabel({
	    labelPrefix: "aria-listbox-label-",
	    inputPrefix: "aria-listbox-"
	  });
	  const {
	    useListNavigationChild,
	    useListNavigationProps,
	    navigateToIndex,
	    managedChildren,
	    currentTypeahead,
	    focusCurrent,
	    tabbableIndex,
	    invalidTypeahead
	  } = useListNavigation({ ...args,
	    shouldFocusOnChange: getFocusedInner
	  });
	  const {
	    useGenericLabelInputProps
	  } = useGenericLabelInput();
	  const childCount = managedChildren.length;
	  const [, setShiftHeld, getShiftHeld] = useState(false);
	  const typeaheadInProgress = !!currentTypeahead;
	  _$1(() => {
	    for (let i = 0; i < childCount; ++i) {
	      managedChildren[i].setTypeaheadInProgress(typeaheadInProgress);
	    }
	  }, [typeaheadInProgress, childCount]);
	  const useListboxMultiItem = T$2(info => {
	    var _info$onSelect;

	    const selected = info.selected;
	    const [typeaheadInProgress, setTypeaheadInProgress] = useState(false);
	    const getSelected = useStableGetter(selected);
	    const {
	      useRefElementProps,
	      getElement
	    } = useRefElement({});
	    const stableOnSelect = useStableCallback((_info$onSelect = info.onSelect) !== null && _info$onSelect !== void 0 ? _info$onSelect : () => {});
	    const {
	      tabbable,
	      useListNavigationChildProps
	    } = useListNavigationChild({ ...info,
	      setTypeaheadInProgress
	    });
	    useLayoutEffect(() => {
	      const element = getElement();

	      if (element && getShiftHeld()) {
	        stableOnSelect === null || stableOnSelect === void 0 ? void 0 : stableOnSelect({
	          target: element,
	          currentTarget: element,
	          [EventDetail]: {
	            selected: true
	          }
	        });
	      }
	    }, [tabbable]);
	    return {
	      useListboxMultiItemProps,
	      tabbable
	    };

	    function useListboxMultiItemProps(props) {
	      const newProps = usePressEventHandlers(info.disabled ? null : e => {
	        navigateToIndex(info.index);
	        stableOnSelect === null || stableOnSelect === void 0 ? void 0 : stableOnSelect({ ...e,
	          [EventDetail]: {
	            selected: !getSelected()
	          }
	        });
	        e.preventDefault();
	      }, {
	        space: typeaheadInProgress ? "exclude" : undefined
	      })({});
	      props.role = "option";
	      props["aria-setsize"] = childCount.toString();
	      props["aria-posinset"] = (info.index + 1).toString();
	      props["aria-selected"] = (tabbable !== null && tabbable !== void 0 ? tabbable : false).toString();
	      if (info.disabled) props["aria-disabled"] = "true";
	      return useRefElementProps(useListNavigationChildProps(useMergedProps()(newProps, props)));
	    }
	  }, [useListNavigationChild, childCount, typeaheadInProgress]);
	  const useListboxMultiLabel = T$2(function useListboxMultiLabel() {
	    function useListboxMultiLabelProps(props) {
	      const {
	        useGenericLabelLabelProps
	      } = useGenericLabelLabel();
	      return useGenericLabelLabelProps(props);
	    }

	    return {
	      useListboxMultiLabelProps
	    };
	  }, [useGenericLabelLabel]);
	  return {
	    useListboxMultiItem,
	    useListboxMultiProps,
	    useListboxMultiLabel,
	    tabbableIndex,
	    currentTypeahead,
	    invalidTypeahead,
	    focus: focusCurrent,
	    managedChildren
	  };

	  function useListboxMultiProps(props) {
	    props.role = "listbox";
	    props["aria-multiselectable"] = "true";
	    return useListNavigationProps(useHasFocusProps(useGenericLabelInputProps(useMergedProps()({
	      onKeyDown,
	      onKeyUp,
	      onFocusOut
	    }, props))));
	  }

	  function onKeyDown(e) {
	    if (e.key == "Shift") setShiftHeld(true);
	  }

	  function onKeyUp(e) {
	    if (e.key == "Shift") setShiftHeld(false);
	  }

	  function onFocusOut(_) {
	    setShiftHeld(false);
	  }
	}

	/**
	 * A menu is a popup control that contains a list of menu items, and that's it.
	 * It has very well-defined logic for managing those items as the menu's state changes.
	 *
	 * A MenuBase is just the "popup" part without the "list of menu items" part. It can
	 * (really, must) have interactive controls, but these controls are allowed to be more
	 * free-form. This means that, like a dialog, you must tell this hook
	 * where within the popup to send focus when opened (for a menu it's just the first
	 * menu item, but with custom content you'll need to provide this).
	 *
	 */

	function useMenuBase(_ref) {
	  let {
	    sendFocusWithinMenu,
	    ...args
	  } = _ref;
	  const getSendFocusWithinMenu = useStableGetter(sendFocusWithinMenu);
	  const [focusTrapActive, setFocusTrapActive] = useState(null);
	  const onClose = args.onClose;
	  const onOpen = args.onOpen;
	  const menubar = args.menubar;
	  const open = menubar ? true : args.open;
	  const stableOnClose = useStableCallback(onClose !== null && onClose !== void 0 ? onClose : () => {});
	  const getOpen = useStableGetter(open); // TODO: It's awkward that the button focus props are out here where we don't have its type,
	  // but focus management is super sensitive, and even waiting for a useLayoutEffect to sync state here
	  // would be too late, so it would look like there's a moment between menu focus lost and button focus gained
	  // where nothing is focused. 

	  const {
	    useHasFocusProps: useMenuBaseHasFocusProps,
	    getLastFocusedInner: getMenuBaseLastFocusedInner
	  } = useHasFocus({
	    /*onLastFocusedInnerChanged: onMenuOrButtonLostLastFocus*/
	  });
	  const {
	    useHasFocusProps: useButtonHasFocusProps,
	    getLastFocusedInner: getMenuBaseButtonLastFocusedInner
	  } = useHasFocus({
	    /*onLastFocusedInnerChanged: onMenuOrButtonLostLastFocus*/
	  });
	  const [, setOpenerElement, getOpenerElement] = useState(null);
	  const {
	    useRandomIdProps: useMenuBaseIdProps,
	    useReferencedIdProps: useMenuBaseIdReferencingProps
	  } = useRandomId({
	    prefix: "aria-menu-"
	  });
	  const {
	    getElement: getButtonElement,
	    useRefElementProps: useButtonRefElementProps
	  } = useRefElement({
	    onElementChange: setOpenerElement
	  });
	  const {
	    getElement: getMenuElement,
	    useRefElementProps: useMenuBaseRefElementProps
	  } = useRefElement({});
	  const {
	    useSoftDismissProps
	  } = useSoftDismiss({
	    onClose: stableOnClose,
	    getElements: () => [getButtonElement(), getMenuElement()]
	  });
	  _$1(() => {
	    setFocusTrapActive(open);
	  }, [open]);
	  const useMenuBaseProps = T$2(props => {
	    function onKeyDown(e) {
	      if (e.key == "Escape" && getOpen()) {
	        stableOnClose();
	        e.stopPropagation();
	        e.stopImmediatePropagation();
	        e.preventDefault();
	      }
	    }

	    return useSoftDismissProps(useMenuBaseHasFocusProps(useMenuBaseRefElementProps(useMenuBaseIdProps(useMergedProps()({
	      onKeyDown
	    }, props)))));
	  }, [useSoftDismissProps, useMenuBaseHasFocusProps, useMenuBaseRefElementProps, useMenuBaseIdProps]);
	  const useMenuBaseButtonProps = T$2(props => {
	    return useButtonRefElementProps(useButtonHasFocusProps(useMenuBaseIdReferencingProps("aria-controls")(props)));
	  }, [useButtonHasFocusProps, useButtonRefElementProps, useMenuBaseIdReferencingProps]);
	  _$1(() => {
	    const sendFocusWithinMenu = getSendFocusWithinMenu();

	    if (focusTrapActive) {
	      sendFocusWithinMenu === null || sendFocusWithinMenu === void 0 ? void 0 : sendFocusWithinMenu();
	    } else if (focusTrapActive === false) {
	      var _getOpenerElement;

	      if (getMenuBaseLastFocusedInner()) (_getOpenerElement = getOpenerElement()) === null || _getOpenerElement === void 0 ? void 0 : _getOpenerElement.focus({
	        preventScroll: true
	      });
	    } else ;
	  }, [focusTrapActive]);
	  return {
	    useMenuSentinel: T$2(() => {
	      const {
	        useSentinelProps: useMenuSentinelProps,
	        ...rest
	      } = useFocusSentinel({
	        open,
	        onClose: onClose !== null && onClose !== void 0 ? onClose : () => {},
	        sendFocusWithinMenu
	      });
	      return {
	        useMenuSentinelProps,
	        ...rest
	      };
	    }, [open, onClose, sendFocusWithinMenu]),
	    focusTrapActive,
	    useMenuBaseProps,
	    useMenuBaseButtonProps,
	    getMenuBaseLastFocusedInner,
	    getMenuBaseButtonLastFocusedInner,
	    open,
	    onOpen,
	    onClose
	  };
	} // A focus sentinal is a hidden but focusable element that comes at the start or end 
	// of the out-of-place-focusable component that, when activated or focused over, closes the component
	// (if focused within 100ms of the open prop changing, instead of
	// closing, focusing the sentinel immediately asks it to focus itself).
	// This exists for things like menus which can have focus but also need a way to return
	// to whatever out-of-place parent they came from when naturally tabbed out of (as opposed
	// to dialogs which loop back around when tabbed out of). While mouse users can click out of a menu
	// and keyboard users can escape to close a menu, screen readers and other input methods 
	// that don't use those two would become stuck.

	function useFocusSentinel(_ref2) {
	  let {
	    open,
	    onClose,
	    sendFocusWithinMenu
	  } = _ref2;
	  const getSendFocusWithinMenu = useStableGetter(sendFocusWithinMenu);
	  const stableOnClose = useStableCallback(onClose);
	  const [firstSentinelIsActive, setFirstSentinelIsActive] = useState(false);
	  useTimeout({
	    callback: () => {
	      setFirstSentinelIsActive(open);
	    },
	    timeout: 100,
	    triggerIndex: `${open}-${firstSentinelIsActive}`
	  });
	  const onFocus = firstSentinelIsActive ? () => stableOnClose() : () => {
	    var _getSendFocusWithinMe;

	    return (_getSendFocusWithinMe = getSendFocusWithinMenu()) === null || _getSendFocusWithinMe === void 0 ? void 0 : _getSendFocusWithinMe();
	  };

	  const onClick = () => stableOnClose();

	  return {
	    useSentinelProps: function (p) {
	      return useMergedProps()({
	        onFocus,
	        onClick
	      }, p);
	    }
	  };
	}
	function useAriaMenu(_ref3) {
	  let {
	    collator,
	    keyNavigation,
	    noTypeahead,
	    noWrap,
	    typeaheadTimeout,
	    ...args
	  } = _ref3;
	  const {
	    managedChildren,
	    useListNavigationChild,
	    useListNavigationProps,
	    tabbableIndex,
	    focusCurrent: focusMenu,
	    currentTypeahead,
	    invalidTypeahead
	  } = useListNavigation({
	    collator,
	    keyNavigation,
	    noTypeahead,
	    noWrap,
	    typeaheadTimeout,
	    shouldFocusOnChange: T$2(() => getMenuBaseLastFocusedInner() || getMenuBaseButtonLastFocusedInner(), [])
	  });
	  const {
	    useMenuSentinel,
	    useMenuBaseButtonProps,
	    useMenuBaseProps,
	    getMenuBaseButtonLastFocusedInner,
	    getMenuBaseLastFocusedInner,
	    open,
	    onOpen,
	    onClose
	  } = useMenuBase({ ...args,
	    sendFocusWithinMenu: focusMenu !== null && focusMenu !== void 0 ? focusMenu : () => {}
	  });
	  const useMenuButton = T$2(_ref4 => {
	    return {
	      useMenuButtonProps: function (p) {
	        const props = useMenuBaseButtonProps(p);
	        props["aria-haspopup"] = "menu";
	        props["aria-expanded"] = open ? "true" : undefined;
	        return props;
	      }
	    };
	  }, [open, onClose, onOpen, useMenuBaseButtonProps]);
	  const useMenuItem = T$2(args => {
	    const {
	      useListNavigationChildProps
	    } = useListNavigationChild(args);

	    function useMenuItemProps(_ref5) {
	      let { ...props
	      } = _ref5;
	      props.role = "menuitem";
	      return useMergedProps()({}, useListNavigationChildProps(props));
	    }

	    return {
	      useMenuItemProps
	    };
	  }, []);

	  function useMenuProps(_ref6) {
	    let { ...props
	    } = _ref6;
	    props.role = "menu";
	    return useMenuBaseProps(useListNavigationProps(props));
	  }

	  return {
	    useMenuProps,
	    useMenuButton,
	    useMenuItem,
	    useMenuSentinel,
	    //useMenuSubmenuItem,
	    focusMenu,
	    currentTypeahead,
	    invalidTypeahead,
	    tabbableIndex,
	    managedChildren
	  };
	}

	function useAriaTabs(_ref) {
	  let {
	    selectionMode,
	    selectedIndex,
	    onSelect,
	    orientation: logicalOrientation,
	    ...args
	  } = _ref;
	  const {
	    useHasFocusProps: useTabListHasFocusProps,
	    getFocusedInner: getTabListFocusedInner
	  } = useHasFocus({});
	  const [physicalOrientation, setPhysicalOrientation] = useState("horizontal");
	  const {
	    convertToPhysicalOrientation,
	    useLogicalDirectionProps
	  } = useLogicalDirection({
	    onLogicalDirectionChange: T$2(logicalDirectionInfo => setPhysicalOrientation(convertToPhysicalOrientation(logicalOrientation, logicalDirectionInfo)), [])
	  }); //const { useRandomIdProps: useTabListIdProps, useReferencedIdProps: useReferencedTabListId } = useRandomId({ prefix: "aria-tab-list-" });

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
	    useListNavigationProps,
	    tabbableIndex,
	    invalidTypeahead,
	    currentTypeahead,
	    focusCurrent
	  } = useListNavigation({ ...args,
	    shouldFocusOnChange: getTabListFocusedInner,
	    keyNavigation: logicalOrientation
	  });
	  const {
	    managedChildren: managedPanels,
	    useManagedChild: useManagedTabPanel
	  } = useChildManager();
	  const childCount = managedTabs.length;
	  useLayoutEffect(() => {
	    for (const child of managedTabs) child.setSelectionMode(selectionMode);
	  }, [selectionMode]);
	  useChildFlag({
	    activatedIndex: selectedIndex,
	    managedChildren: managedTabs,
	    setChildFlag: (i, selected) => {
	      var _managedTabs$i;

	      return (_managedTabs$i = managedTabs[i]) === null || _managedTabs$i === void 0 ? void 0 : _managedTabs$i.setSelected(selected);
	    },
	    getChildFlag: i => {
	      var _managedTabs$i2;

	      return (_managedTabs$i2 = managedTabs[i]) === null || _managedTabs$i2 === void 0 ? void 0 : _managedTabs$i2.getSelected();
	    }
	  });
	  useChildFlag({
	    activatedIndex: selectedIndex,
	    managedChildren: managedPanels,
	    setChildFlag: (i, visible) => {
	      var _managedPanels$i;

	      return (_managedPanels$i = managedPanels[i]) === null || _managedPanels$i === void 0 ? void 0 : _managedPanels$i.setVisible(visible);
	    },
	    getChildFlag: i => {
	      var _managedPanels$i2;

	      return (_managedPanels$i2 = managedPanels[i]) === null || _managedPanels$i2 === void 0 ? void 0 : _managedPanels$i2.getVisible();
	    }
	  });
	  useLayoutEffect(_prev => {
	    if (selectedIndex != null && selectionMode == "activate") {
	      // TODO: We need to wait a moment so that the tab panel we want to focus
	      // is actually visible (i.e. we need to wait for the child to re-render itself).
	      // We could, alternatively, signal to the child that it should focus itself
	      // the next time it renders itself as visible,
	      // which might be better?
	      queueMicrotask(() => {
	        var _managedPanels$select;

	        (_managedPanels$select = managedPanels[selectedIndex]) === null || _managedPanels$select === void 0 ? void 0 : _managedPanels$select.focus();
	      });
	    }
	  }, [childCount, selectedIndex, selectionMode]);
	  const useTab = T$2(function useTab(info) {
	    const [selectionModeL, setSelectionModeL] = useState(selectionMode);
	    const {
	      useRefElementProps,
	      getElement
	    } = useRefElement({});
	    const [tabPanelId, setTabPanelId] = useState(undefined);
	    const {
	      useRandomIdProps: useTabIdProps,
	      id: tabId
	    } = useRandomId({
	      prefix: "aria-tab-"
	    });
	    const [selected, setSelected, getSelected] = useState(null);
	    const {
	      tabbable,
	      useListNavigationChildProps
	    } = useListNavigationChild({
	      setSelected,
	      getSelected,
	      tabId,
	      setTabPanelId,
	      setSelectionMode: setSelectionModeL,
	      ...info
	    });
	    const getIndex = useStableGetter(info.index);
	    _$1(() => {
	      const element = getElement();

	      if (tabbable && selectionModeL == "focus") {
	        onSelect({
	          target: element,
	          currentTarget: element,
	          [EventDetail]: {
	            selectedIndex: getIndex()
	          }
	        });
	      }
	    }, [tabbable, selectionMode]);
	    _$1(() => {
	      var _managedPanels$info$i;

	      (_managedPanels$info$i = managedPanels[info.index]) === null || _managedPanels$info$i === void 0 ? void 0 : _managedPanels$info$i.setTabId(tabId);
	    }, [tabId, info.index]);

	    function useTabProps(_ref2) {
	      let { ...props
	      } = _ref2;
	      const newProps = usePressEventHandlers(e => {
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
	  const useTabPanel = T$2(function usePanel(info) {
	    //const [shouldFocus, setShouldFocus] = useState(false);
	    const [, setTabId] = useState(undefined);
	    const [visible, setVisible, getVisible] = useState(null);
	    const {
	      useRandomIdProps: usePanelIdProps,
	      id: tabPanelId
	    } = useRandomId({
	      prefix: "aria-tab-panel-"
	    });
	    const {
	      useManagedChildProps,
	      getElement
	    } = useManagedTabPanel({ ...info,
	      tabPanelId,
	      setTabId,
	      focus,
	      setVisible: setVisible,
	      getVisible: getVisible
	    });

	    function focus() {
	      const element = getElement();

	      if (element && getTabListFocusedInner()) {
	        element === null || element === void 0 ? void 0 : element.focus({
	          preventScroll: true
	        });
	      }
	    }

	    _$1(() => {
	      var _managedTabs$info$ind;

	      (_managedTabs$info$ind = managedTabs[info.index]) === null || _managedTabs$info$ind === void 0 ? void 0 : _managedTabs$info$ind.setTabPanelId(tabPanelId);
	    }, [tabPanelId, info.index]);

	    function useTabPanelProps(_ref3) {
	      var _managedTabs$info$ind2, _props$tabIndex;

	      let { ...props
	      } = _ref3;
	      props["aria-labelledby"] = (_managedTabs$info$ind2 = managedTabs[info.index]) === null || _managedTabs$info$ind2 === void 0 ? void 0 : _managedTabs$info$ind2.tabId;
	      props.role = "tabpanel";
	      (_props$tabIndex = props.tabIndex) !== null && _props$tabIndex !== void 0 ? _props$tabIndex : props.tabIndex = -1; // Make sure the tab panel is tabbable.

	      return useMergedProps()({}, usePanelIdProps(useManagedChildProps(props)));
	    }

	    return {
	      useTabPanelProps,
	      visible
	    };
	  }, []);
	  const useTabsList = T$2(function useTabList() {
	    function useTabListProps(_ref4) {
	      let { ...props
	      } = _ref4;
	      props.role = "tablist";
	      props["aria-orientation"] = physicalOrientation;
	      return useReferencedTabLabelId("aria-labelledby")(useTabListHasFocusProps(useLogicalDirectionProps(useListNavigationProps(props))));
	    }

	    return {
	      useTabListProps
	    };
	  }, [useListNavigationProps, physicalOrientation]);
	  const useTabsLabel = T$2(function useTabsLabel() {
	    function useTabsLabelProps(_ref5) {
	      let { ...props
	      } = _ref5;
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
	    invalidTypeahead,
	    managedPanels,
	    managedTabs
	  };
	}

	function returnFalse() {
	  return false;
	}

	function useAriaTooltip(_ref) {
	  var _mouseoverDelay, _mouseoutDelay, _focusDelay;

	  let {
	    mouseoverDelay,
	    mouseoutDelay,
	    focusDelay
	  } = _ref;
	  (_mouseoverDelay = mouseoverDelay) !== null && _mouseoverDelay !== void 0 ? _mouseoverDelay : mouseoverDelay = 400;
	  (_mouseoutDelay = mouseoutDelay) !== null && _mouseoutDelay !== void 0 ? _mouseoutDelay : mouseoutDelay = 40;
	  (_focusDelay = focusDelay) !== null && _focusDelay !== void 0 ? _focusDelay : focusDelay = 1; // The escape key should close tooltips, but do nothing else.
	  // (i.e. closing a tooltip in a dialog MUST NOT close the dialog too)
	  // TODO: Tooltips are, effectively, always the topmost component,
	  // so we can just have them listen to and swallow all "Escape"
	  // key presses before anyone else. For a more general popup,
	  // or a tooltip in a tooltip (!!) a different solution would be needed.

	  useGlobalHandler(document, "keydown", e => {
	    if (getOpen() && e.key === "Escape" && !e.defaultPrevented) {
	      e.preventDefault();
	      e.stopImmediatePropagation();
	      setOpen(false);
	      setTriggerHoverDelayCorrected(false);
	      setTooltipHoverDelayCorrected(false);
	      setTriggerFocusedDelayCorrected(false);
	      setTooltipFocusedDelayCorrected(false);
	    }
	  }, {
	    capture: true
	  });
	  const [open, setOpen, getOpen] = useState(false);
	  const {
	    useRandomIdProps: useTooltipIdProps,
	    useReferencedIdProps: useTooltipIdReferencingProps
	  } = useRandomId({
	    prefix: "aria-tooltip-"
	  });
	  const [, setTriggerFocused] = usePassiveState(useStableCallback(focused => {
	    const delay = focused ? focusDelay : 1;

	    if (delay != null && isFinite(delay)) {
	      const handle = setTimeout(() => setTriggerFocusedDelayCorrected(focused), focused ? focusDelay : 1);
	      return () => clearTimeout(handle);
	    }
	  }), returnFalse);
	  const [, setTooltipFocused] = usePassiveState(useStableCallback(focused => {
	    const delay = focused ? focusDelay : 1;

	    if (delay != null && isFinite(delay)) {
	      const handle = setTimeout(() => setTooltipFocusedDelayCorrected(focused), delay);
	      return () => clearTimeout(handle);
	    }
	  }), returnFalse);
	  const [, setTriggerHover] = usePassiveState(useStableCallback(hovering => {
	    const delay = hovering ? mouseoverDelay : mouseoutDelay;

	    if (delay != null && isFinite(delay)) {
	      const handle = setTimeout(() => setTriggerHoverDelayCorrected(hovering), delay);
	      return () => clearTimeout(handle);
	    }
	  }), returnFalse);
	  const [, setTooltipHover] = usePassiveState(useStableCallback(hovering => {
	    const delay = hovering ? mouseoverDelay : mouseoutDelay;

	    if (delay != null && isFinite(delay)) {
	      const handle = setTimeout(() => setTooltipHoverDelayCorrected(hovering), delay);
	      return () => clearTimeout(handle);
	    }
	  }), returnFalse);
	  const [triggerFocusedDelayCorrected, setTriggerFocusedDelayCorrected] = useState(false);
	  const [triggerHoverDelayCorrected, setTriggerHoverDelayCorrected] = useState(false);
	  const [tooltipFocusedDelayCorrected, setTooltipFocusedDelayCorrected] = useState(false);
	  const [tooltipHoverDelayCorrected, setTooltipHoverDelayCorrected] = useState(false);
	  _$1(() => {
	    setOpen(triggerFocusedDelayCorrected || triggerHoverDelayCorrected || tooltipFocusedDelayCorrected || tooltipHoverDelayCorrected);
	  }, [triggerFocusedDelayCorrected || triggerHoverDelayCorrected || tooltipFocusedDelayCorrected || tooltipHoverDelayCorrected]);
	  const useTooltipTrigger = T$2(function useTooltipTrigger() {
	    useGlobalHandler(document, "pointermove", e => {
	      var _getElement;

	      const target = e.target;
	      setTriggerHover(target == getElement() || !!((_getElement = getElement()) !== null && _getElement !== void 0 && _getElement.contains(target)));
	    }, {
	      capture: true
	    });

	    function onTouchEnd(e) {
	      e.target.focus();
	    }

	    const {
	      useHasFocusProps,
	      getElement
	    } = useHasFocus({
	      onFocusedInnerChanged: setTriggerFocused
	    });

	    function useTooltipTriggerProps(_ref2) {
	      var _props$tabIndex;

	      let { ...props
	      } = _ref2;
	      // Note: Though it's important to make sure that focusing activates a tooltip,
	      // it's perfectly reasonable that a child element will be the one that's focused,
	      // not this one, so we don't set tabIndex=0
	      (_props$tabIndex = props.tabIndex) !== null && _props$tabIndex !== void 0 ? _props$tabIndex : props.tabIndex = -1;
	      return useTooltipIdReferencingProps("aria-describedby")(useHasFocusProps(useMergedProps()({
	        onTouchEnd
	      }, props)));
	    }

	    return {
	      useTooltipTriggerProps
	    };
	  }, [useTooltipIdReferencingProps]);
	  const useTooltip = T$2(function useTooltip() {
	    const {
	      useHasFocusProps,
	      getElement
	    } = useHasFocus({
	      onFocusedInnerChanged: setTooltipFocused
	    });
	    useGlobalHandler(document, "pointermove", e => {
	      var _getElement2;

	      const target = e.target;
	      setTooltipHover(target == getElement() || !!((_getElement2 = getElement()) !== null && _getElement2 !== void 0 && _getElement2.contains(target)));
	    }, {
	      capture: true
	    });

	    function useTooltipProps(_ref3) {
	      let { ...props
	      } = _ref3;
	      return useTooltipIdProps(useHasFocusProps(useMergedProps()({}, props)));
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

	function useAriaRadioGroup(_ref) {
	  let {
	    name,
	    selectedValue,
	    onInput
	  } = _ref;
	  const {
	    getElement: getRadioGroupParentElement,
	    useRefElementProps
	  } = useRefElement({}); //const getSelectedIndex = useCallback((selectedValue: V) => { return byName.current.get(selectedValue) ?? 0 }, [])

	  const [selectedIndex, setSelectedIndex] = useState(0);
	  const byName = s$2(new Map());
	  const stableOnInput = useStableCallback(onInput);
	  const [anyRadiosFocused, setAnyRadiosFocused, getAnyRadiosFocused] = useState(false);
	  const {
	    managedChildren,
	    useListNavigationChild,
	    useListNavigationProps,
	    navigateToIndex,
	    tabbableIndex,
	    focusCurrent,
	    currentTypeahead,
	    invalidTypeahead
	  } = useListNavigation({
	    shouldFocusOnChange: getAnyRadiosFocused
	  }); // Track whether the currently focused element is a child of the radio group parent element.
	  // When it's not, we reset the tabbable index back to the currently selected element.

	  const {
	    useActiveElementProps
	  } = useActiveElement({
	    onActiveElementChange: T$2(activeElement => {
	      var _getRadioGroupParentE;

	      return setAnyRadiosFocused(!!((_getRadioGroupParentE = getRadioGroupParentElement()) !== null && _getRadioGroupParentE !== void 0 && _getRadioGroupParentE.contains(activeElement)));
	    }, [])
	  });
	  _$1(() => {
	    if (!anyRadiosFocused) navigateToIndex(selectedIndex !== null && selectedIndex !== void 0 ? selectedIndex : 0);
	  }, [anyRadiosFocused, selectedIndex, navigateToIndex]);
	  const useRadioGroupProps = T$2(_ref2 => {
	    let { ...props
	    } = _ref2;
	    props.role = "radiogroup";
	    return useListNavigationProps(useRefElementProps(useActiveElementProps(props)));
	  }, [useRefElementProps, useActiveElementProps]);
	  const correctedIndex = selectedIndex == null || selectedIndex < 0 || selectedIndex >= managedChildren.length ? null : selectedIndex;
	  useChildFlag({
	    activatedIndex: correctedIndex,
	    managedChildren,
	    setChildFlag: (i, checked) => {
	      var _managedChildren$i;

	      return (_managedChildren$i = managedChildren[i]) === null || _managedChildren$i === void 0 ? void 0 : _managedChildren$i.setChecked(checked);
	    },
	    getChildFlag: i => {
	      var _managedChildren$i$ge, _managedChildren$i2;

	      return (_managedChildren$i$ge = (_managedChildren$i2 = managedChildren[i]) === null || _managedChildren$i2 === void 0 ? void 0 : _managedChildren$i2.getChecked()) !== null && _managedChildren$i$ge !== void 0 ? _managedChildren$i$ge : false;
	    }
	  });
	  _$1(() => {
	    const selectedIndex = byName.current.get(selectedValue);
	    setSelectedIndex(selectedIndex !== null && selectedIndex !== void 0 ? selectedIndex : null);
	  }, [byName, selectedValue]);
	  const useRadio = T$2(function useAriaRadio(_ref3) {
	    let {
	      value,
	      index,
	      text,
	      disabled,
	      labelPosition,
	      ...rest
	    } = _ref3;
	    const [checked, setChecked, getChecked] = useState(null);
	    const onInput = T$2(e => {
	      stableOnInput(enhanceEvent(e, {
	        selectedValue: value
	      }));
	    }, [stableOnInput, value, index]);
	    const {
	      useCheckboxLikeInputElement,
	      useCheckboxLikeLabelElement
	    } = useCheckboxLike({
	      checked: checked !== null && checked !== void 0 ? checked : false,
	      disabled,
	      labelPosition,
	      onInput,
	      role: "radio"
	    });
	    h$1(() => {
	      byName.current.set(value, index);
	      return () => {
	        byName.current.delete(value);
	      };
	    }, [byName, value, index]);
	    const {
	      tabbable,
	      useListNavigationChildProps
	    } = useListNavigationChild({
	      index,
	      setChecked,
	      getChecked,
	      text,
	      ...rest
	    });

	    const useRadioInput = _ref4 => {
	      let {
	        tag
	      } = _ref4;

	      const useRadioInputProps = props => {
	        if (tag == "input") {
	          props.name = name;
	          props.checked = checked !== null && checked !== void 0 ? checked : false;
	          props.type = "radio";
	        } else {
	          props["aria-checked"] = (checked !== null && checked !== void 0 ? checked : false).toString();
	        }

	        const propsIfInputHandlesFocus = useListNavigationChildProps(props);
	        const {
	          useCheckboxLikeInputElementProps
	        } = useCheckboxLikeInputElement({
	          tag
	        });
	        return useMergedProps()(useCheckboxLikeInputElementProps({}), labelPosition == "separate" ? propsIfInputHandlesFocus : props);
	      };

	      return {
	        useRadioInputProps
	      };
	    };

	    const useRadioLabel = T$2(_ref5 => {
	      let {
	        tag
	      } = _ref5;

	      const useRadioLabelProps = props => {
	        const {
	          useCheckboxLikeLabelElementProps
	        } = useCheckboxLikeLabelElement({
	          tag
	        });
	        const propsIfLabelHandlesFocus = useListNavigationChildProps(props);
	        return useCheckboxLikeLabelElementProps(useMergedProps()({}, labelPosition == "wrapping" ? propsIfLabelHandlesFocus : props));
	      };

	      return {
	        useRadioLabelProps
	      };
	    }, [useCheckboxLikeLabelElement]);
	    return {
	      useRadioInput,
	      useRadioLabel,
	      checked: checked !== null && checked !== void 0 ? checked : false,
	      tabbable: tabbable !== null && tabbable !== void 0 ? tabbable : false
	    };
	  }, [byName, useListNavigationChild]);
	  return {
	    useRadio,
	    useRadioGroupProps,
	    managedChildren,
	    selectedIndex,
	    tabbableIndex,
	    focusRadio: focusCurrent,
	    currentTypeahead,
	    invalidTypeahead,
	    anyRadiosFocused
	  };
	}

	function useAriaSlider(_ref) {
	  let {
	    max: maxParent,
	    min: minParent
	  } = _ref;
	  const {
	    useManagedChild
	  } = useChildManager();
	  const useAriaSliderThumb = T$2(function useAriaSliderThumb(_ref2) {
	    let {
	      index,
	      onValueChange,
	      value,
	      valueText,
	      tag,
	      min: minOverride,
	      max: maxOverride,
	      ..._
	    } = _ref2;
	    const [minParentCopy, setMinParentCopy] = y$1(minParent);
	    const [maxParentCopy, setMaxParentCopy] = y$1(maxParent);
	    const {
	      getElement,
	      useManagedChildProps
	    } = useManagedChild({
	      index,
	      setMin: setMinParentCopy,
	      setMax: setMaxParentCopy
	    });
	    const min = minOverride !== null && minOverride !== void 0 ? minOverride : minParentCopy;
	    const max = maxOverride !== null && maxOverride !== void 0 ? maxOverride : maxParentCopy;
	    return {
	      getElement,
	      useAriaSliderThumbProps,
	      min,
	      max
	    };

	    function useAriaSliderThumbProps(props) {
	      let newProps = tag == "input" ? {
	        min,
	        max,
	        value,
	        type: "range"
	      } : {
	        "aria-valuemax": `${max}`,
	        "aria-valuemin": `${min}`
	      };
	      newProps = { ...newProps,
	        "aria-valuetext": valueText,
	        style: {
	          "--range-value": `${value}`,
	          "--range-value-text": `${valueText}`
	        }
	      };

	      if (tag == "input") {
	        newProps.onInput = e => {
	          onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange({
	            currentTarget: e.currentTarget,
	            target: e.target,
	            [EventDetail]: {
	              value: e.currentTarget.valueAsNumber
	            }
	          });
	        };
	      } else {
	        throw new Error("Unimplemented");
	      }

	      return useManagedChildProps(useMergedProps()(newProps, props));
	    }
	  }, []);
	  return {
	    useAriaSliderThumb
	  };
	}

	function useToasts(_ref) {
	  // "Pointer" to whatever index toast is currently being shown.
	  // E.g. it's 0 when the first toast is shown, then when dismissed, it becomes 1.
	  // When the second toast is shown, it stays at 1 until dismissed, when it then becomes 2, etc.
	  // Because toasts can potentially be dismissed out of order, this represents the "oldest" toast that still hasn't been dismissed,
	  // even if "younger" ones have.
	  const [activeToastIndex, setActiveToastIndex, getActiveToastIndex] = useState(-1);
	  const [politeness, setPoliteness] = useState("polite");
	  const {
	    getElement,
	    useRefElementProps
	  } = useRefElement({});
	  const {
	    mountedChildren: toastQueue,
	    useManagedChild,
	    getMountIndex
	  } = useChildManager(); // Any time a new toast mounts, update our bottommostToastIndex to point to it if necessary
	  // ("necessary" just meaning if it's the first toast ever or all prior toasts have been dismissed)

	  const onAnyToastMounted = T$2(_index => {
	    let bottom = getActiveToastIndex();

	    while (bottom < toastQueue.length && (bottom < 0 || (_toastQueue$bottom = toastQueue[bottom]) !== null && _toastQueue$bottom !== void 0 && _toastQueue$bottom.dismissed)) {
	      var _toastQueue$bottom;

	      ++bottom;
	    }

	    setActiveToastIndex(bottom);
	  }, [setActiveToastIndex]); // Any time a toast is dismissed, update our bottommostToastIndex to point to the next toast in the queue, if one exists.

	  const onAnyToastDismissed = T$2(index => {
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

	  useChildFlag({
	    activatedIndex: activeToastIndex,
	    managedChildren: toastQueue,
	    setChildFlag: (i, set) => {
	      var _toastQueue$i;

	      if (set) console.assert(i <= getActiveToastIndex());
	      (_toastQueue$i = toastQueue[i]) === null || _toastQueue$i === void 0 ? void 0 : _toastQueue$i.setStatus(prev => prev === "dismissed" ? "dismissed" : set ? "active" : i < getActiveToastIndex() ? "dismissed" : "pending");
	    },
	    getChildFlag: i => {
	      var _toastQueue$i2;

	      return ((_toastQueue$i2 = toastQueue[i]) === null || _toastQueue$i2 === void 0 ? void 0 : _toastQueue$i2.getStatus()) === "active";
	    }
	  });
	  const useToast = T$2(_ref2 => {
	    let {
	      politeness,
	      timeout
	    } = _ref2;
	    const [status, setStatus, getStatus] = useState("pending");
	    const dismissed = status === "dismissed";
	    const dismiss = T$2(() => {
	      setStatus("dismissed");
	    }, []);
	    const [mouseOver, setMouseOver] = useState(false);
	    useGlobalHandler(document, "pointermove", e => {
	      setMouseOver(e.target.contains(getElement()));
	    });
	    const {
	      randomId: toastId
	    } = useRandomId({
	      prefix: "toast-"
	    });
	    h$1(() => {
	      setPoliteness(politeness !== null && politeness !== void 0 ? politeness : "polite");
	    }, [politeness]);
	    const focus = T$2(() => {
	      const element = getElement();

	      if (element) {
	        const firstFocusable = findFirstFocusable(element);
	        firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
	      }
	    }, []);
	    const {
	      useManagedChildProps,
	      getElement
	    } = useManagedChild({
	      dismissed,
	      index: toastId,
	      setStatus,
	      getStatus,
	      focus
	    });
	    const isActive = status === "active";
	    const [triggerIndex, setTriggerIndex] = useState(1);
	    const resetDismissTimer = T$2(() => {
	      setTriggerIndex(i => ++i);
	    }, []);
	    _$1(() => {
	      onAnyToastMounted(getMountIndex(toastId));
	    }, []);
	    _$1(() => {
	      if (dismissed) onAnyToastDismissed(getMountIndex(toastId));
	    }, [dismissed]);
	    useTimeout({
	      timeout: timeout == null || mouseOver ? null : isFinite(timeout) ? timeout : timeout > 0 ? null : 0,
	      callback: () => {
	        if (isActive) setStatus("dismissed");
	      },
	      triggerIndex: isActive ? triggerIndex : false
	    });
	    return {
	      status,
	      getStatus,
	      dismiss,
	      resetDismissTimer,
	      useToastProps: function (_ref3) {
	        let { ...props
	        } = _ref3;
	        return useMergedProps()(useManagedChildProps({}), props);
	      }
	    };
	  }, []);

	  function useToastContainerProps(_ref4) {
	    var _ref5;

	    let {
	      role,
	      "aria-live": ariaLive,
	      "aria-relevant": ariaRelevant,
	      ...props
	    } = _ref4;
	    return useMergedProps()(useRefElementProps({
	      class: "toasts-container",
	      role: role || "status",
	      "aria-live": (_ref5 = politeness !== null && politeness !== void 0 ? politeness : ariaLive) !== null && _ref5 !== void 0 ? _ref5 : "polite",
	      "aria-relevant": ariaRelevant !== null && ariaRelevant !== void 0 ? ariaRelevant : "additions"
	    }), props);
	  }

	  return {
	    useToast,
	    useToastContainerProps
	  };
	}

	// so it can be used with, like, lists and junk too
	// but just getting to this point in the first place was *exhausting*.
	//
	// Please be aware that table rows must be *direct descendants* of

	function useTable(_ref) {
	  // Only used by the sorting function, nothing else
	  const [, setBodyRows, getBodyRows] = useState(null);
	  const {
	    indexDemangler,
	    indexMangler,
	    sort: originalSort,
	    useSortableProps
	  } = useSortableChildren({
	    getValue: T$2((row, column) => {
	      var _row$getManagedCells, _row$getManagedCells$;

	      return (_row$getManagedCells = row.getManagedCells()) === null || _row$getManagedCells === void 0 ? void 0 : (_row$getManagedCells$ = _row$getManagedCells[column]) === null || _row$getManagedCells$ === void 0 ? void 0 : _row$getManagedCells$.value;
	    }, []),
	    getIndex: T$2(row => {
	      return row.index;
	    }, [])
	  }); // This is the index of the currently sorted column('s header cell that was clicked to sort it).
	  // This is used by all the header cells to know when to reset their "sort mode" back to its initial state.

	  const [sortedColumn, setSortedColumn, getSortedColumn] = useState(null);
	  const [, setSortedDirection, getSortedDirection] = useState(null);
	  const {
	    useManagedChild: useManagedHeaderCellChild,
	    managedChildren: managedHeaderCells
	  } = useChildManager(); // When we sort the table, we need to manually update each table component
	  // A little bit ugly, but it gets the job done.

	  const {
	    useManagedChild: useManagedTableSection,
	    managedChildren: managedTableSections
	  } = useChildManager(); // Used for navigation to determine when focus should follow the selected cell

	  const {
	    useHasFocusProps,
	    getFocusedInner
	  } = useHasFocus({}); // Wrap the "useSortable" sort function to also set some internal state
	  // regarding which column is sorted and in what direction.

	  const sort = T$2((column, direction) => {
	    setSortedColumn(column);
	    setSortedDirection(direction);
	    originalSort(getBodyRows(), direction, column);
	  }, [
	    /* Must remain stable */
	  ]);
	  const useTableSection = T$2(_ref2 => {
	    let {
	      location
	    } = _ref2;
	    const {
	      useManagedChildProps
	    } = useManagedTableSection({
	      index: location,
	      forceUpdate: useForceUpdate()
	    });
	    const {
	      useGridNavigationRow,
	      useGridNavigationProps,
	      managedRows
	    } = useGridNavigation({
	      shouldFocusOnChange: getFocusedInner,
	      indexMangler,
	      indexDemangler
	    });
	    const useTableSectionProps = T$2(props => {
	      return useGridNavigationProps(useManagedChildProps(useMergedProps()({
	        role: "rowgroup"
	      }, props)));
	    }, [useGridNavigationProps, useManagedChildProps]);
	    /**
	     *
	     * IMPORTANT NOTE ABOUT COMPONENTS USING THIS HOOK!!
	     *
	     * The rowIndex prop that you pass to your custom TableRow component
	     * *must* be named "rowIndex" and *must* be, e.g., 0 for the header
	     * row, 1 for the first body row, etc.
	     *
	     * Your custom TableRow component must also be the *direct*
	     * child of whatever implements your TableHead, TableBody, and
	     * TableFoot components.
	     *
	     */

	    const useTableRow = T$2(_ref3 => {
	      let {
	        index: rowIndexAsUnsorted,
	        location,
	        hidden
	      } = _ref3;
	      // This is used by the sort function to update this row when everything's shuffled.
	      const [rowIndexAsSorted, setRowIndexAsSorted, getRowIndexAsSorted] = useState(null);
	      const getManagedCells = useStableCallback(() => managedCells);
	      const {
	        useGridNavigationCell,
	        useGridNavigationRowProps,
	        managedCells
	      } = useGridNavigationRow({
	        index: rowIndexAsUnsorted,
	        getManagedCells,
	        hidden,
	        ...{
	          rowIndexAsSorted: getRowIndexAsSorted()
	        },
	        getRowIndexAsSorted,
	        setRowIndexAsSorted,
	        location
	      }); // Not public -- just the shared code between header cells and body cells

	      const useTableCellShared = T$2(_ref4 => {
	        let {
	          index,
	          value
	        } = _ref4;
	        const {
	          useGridNavigationCellProps
	        } = useGridNavigationCell({
	          index,
	          value
	        });
	        const {
	          getElement: getCellElement,
	          useRefElementProps: useCellRefElementProps
	        } = useRefElement({});

	        function useTableCellProps(_ref5) {
	          let {
	            role,
	            ...props
	          } = _ref5;
	          return useCellRefElementProps(useMergedProps()({
	            role: role || "gridcell"
	          }, props));
	        }

	        function useTableCellDelegateProps(props) {
	          // Escape hatch for table cells with editable controls, like a text box:
	          // Any time we're in a table cell's control and we press ESC or F2,
	          // we eject focus back out to the actual table cell itself, which will
	          // allow navigation of the grid again.
	          function onKeyDown(e) {
	            if (e.key == "Escape" || e.key == "F2") {
	              const cell = getCellElement();

	              if (document.activeElement != cell) {
	                e.stopPropagation();
	                e.preventDefault();

	                if (cell && "focus" in cell) {
	                  // Make absolutely sure this cell is focusable
	                  // (tabIndex can't be null, apparently, so what else would it be other than -1?
	                  // How is "not tabbable" represented in the DOM?)
	                  if (cell.tabIndex !== 0) cell.tabIndex = -1;
	                  cell.focus();
	                }
	              }
	            }
	          }

	          return useGridNavigationCellProps(useMergedProps()({
	            onKeyDown
	          }, props));
	        }

	        return {
	          useTableCellProps,
	          useTableCellDelegateProps
	        };
	      }, []);
	      const useTableHeadCell = T$2(_ref6 => {
	        let {
	          index: columnIndex,
	          unsortable
	        } = _ref6;
	        const {
	          useTableCellDelegateProps,
	          useTableCellProps
	        } = useTableCellShared({
	          index: columnIndex,
	          value: ""
	        }); // This is mostly all just in regards to
	        // handling the "sort-on-click" interaction.

	        const [sortDirection, setSortDirection, getSortDirection] = useState(null);
	        const [isTheSortedColumn, setIsTheSortedColumn] = useState(false);
	        const random = s$2(generateRandomId());
	        const {
	          useManagedChildProps
	        } = useManagedHeaderCellChild({
	          index: random.current,
	          setSortedColumn: T$2(c => {
	            setIsTheSortedColumn(c === columnIndex);
	          }, [columnIndex])
	        });
	        _$1(() => {
	          if (!isTheSortedColumn) setSortDirection(null);
	        }, [isTheSortedColumn]);
	        const onSortClick = T$2(() => {
	          let nextSortDirection = getSortDirection();
	          if (nextSortDirection === "ascending") nextSortDirection = "descending";else nextSortDirection = "ascending";
	          setSortDirection(nextSortDirection);
	          sort(columnIndex, nextSortDirection);
	        }, []);

	        const useTableHeadCellProps = props => {
	          const m = useTableCellProps(usePressEventHandlers(unsortable ? null : onSortClick, undefined)(useMergedProps()({
	            role: "columnheader"
	          }, props)));
	          return useManagedChildProps(m);
	        };

	        return {
	          useTableHeadCellProps,
	          useTableHeadCellDelegateProps: useTableCellDelegateProps,
	          sortDirection
	        };
	      }, []);
	      const useTableCell = T$2(_ref7 => {
	        let {
	          index,
	          value
	        } = _ref7;
	        const {
	          useTableCellDelegateProps,
	          useTableCellProps
	        } = useTableCellShared({
	          index,
	          value
	        });
	        return {
	          useTableCellProps,
	          useTableCellDelegateProps
	        };
	      }, []);

	      function useTableRowProps(_ref8) {
	        let {
	          role,
	          ...props
	        } = _ref8;
	        return useGridNavigationRowProps(useMergedProps()({
	          role: role || "row"
	        }, props));
	      }

	      return {
	        useTableCell,
	        useTableRowProps,
	        useTableHeadCell,
	        rowIndexAsSorted,
	        rowIndexAsUnsorted
	      };
	    }, []);
	    return {
	      useTableSectionProps,
	      useTableSectionRow: useTableRow,
	      managedRows
	    };
	  }, []);
	  const useTableHead = T$2(() => {
	    // Used to track if we tried to render any rows before they've been
	    // given their "true" index to display (their sorted index).
	    // This is true for all rows initially on mount, but especially true
	    // when the table has been pre-sorted and then a new row is
	    // added on top of that afterwards. 
	    const [hasUnsortedRows, setHasUnsortedRows] = useState(false);
	    _$1(() => {
	      if (hasUnsortedRows) {
	        var _getSortedColumn, _getSortedDirection;

	        sort((_getSortedColumn = getSortedColumn()) !== null && _getSortedColumn !== void 0 ? _getSortedColumn : 0, (_getSortedDirection = getSortedDirection()) !== null && _getSortedDirection !== void 0 ? _getSortedDirection : "ascending");
	        setHasUnsortedRows(false);
	      }
	    }, [hasUnsortedRows]);
	    const {
	      useTableSectionRow: useTableHeadRow,
	      useTableSectionProps
	    } = useTableSection({
	      location: "head"
	    });
	    return {
	      useTableHeadRow,
	      useTableHeadProps: useTableSectionProps
	    };
	  }, [useTableSection]);
	  const useTableBody = T$2(() => {
	    const {
	      useTableSectionRow: useTableBodyRow,
	      useTableSectionProps,
	      managedRows
	    } = useTableSection({
	      location: "body"
	    });
	    const useTableBodyProps = T$2(_ref9 => {
	      let {
	        children,
	        ...props
	      } = _ref9;
	      return useSortableProps(useTableSectionProps(useMergedProps()({
	        role: "rowgroup",
	        children: children
	      }, props)));
	    }, [useTableSectionProps]);
	    _$1(() => {
	      setBodyRows(_prev => managedRows);
	    }, [managedRows]);
	    return {
	      useTableBodyRow: useTableBodyRow,
	      useTableBodyProps
	    };
	  }, []);
	  const useTableFoot = T$2(() => {
	    const {
	      useTableSectionRow: useTableFootRow,
	      useTableSectionProps
	    } = useTableSection({
	      location: "head"
	    });
	    return {
	      useTableFootRow,
	      useTableFootProps: useTableSectionProps
	    };
	  }, [useTableSection]); // Whenever any given header cell requests a sort, it sets itself here, in the table,
	  // as the "sortedColumn" column.  We then, as the parent table, let all the other
	  // header rows know who is the "sortedColumn" column so that they can un-style themselves.

	  _$1(() => {
	    if (sortedColumn != null) {
	      Object.entries(managedHeaderCells).forEach(_ref10 => {
	        let [_index, cell] = _ref10;
	        cell.setSortedColumn(sortedColumn);
	      });
	    }
	  }, [sortedColumn]); // Tables need a role of "grid" in order to be considered 
	  // "interactive content" like a text box that passes through
	  // keyboard inputs.

	  function useTableProps(_ref11) {
	    let {
	      role,
	      ...props
	    } = _ref11;
	    return useHasFocusProps(useMergedProps()({
	      role: role || "grid"
	    }, props));
	  }

	  return {
	    useTableProps,
	    useTableHead,
	    useTableBody,
	    useTableFoot,
	    managedTableSections
	  };
	}

	function C$1(n, t) {
	  for (var e in t) n[e] = t[e];

	  return n;
	}

	function S(n, t) {
	  for (var e in n) if ("__source" !== e && !(e in t)) return !0;

	  for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;

	  return !1;
	}

	function E(n) {
	  this.props = n;
	}

	function g$1(n, t) {
	  function e(n) {
	    var e = this.props.ref,
	        r = e == n.ref;
	    return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : S(this.props, n);
	  }

	  function r(t) {
	    return this.shouldComponentUpdate = e, v$2(n, t);
	  }

	  return r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
	}

	(E.prototype = new _$2()).isPureReactComponent = !0, E.prototype.shouldComponentUpdate = function (n, t) {
	  return S(this.props, n) || S(this.state, t);
	};
	var w$1 = l$3.__b;

	l$3.__b = function (n) {
	  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), w$1 && w$1(n);
	};

	var R = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;

	function x$1(n) {
	  function t(t) {
	    var e = C$1({}, t);
	    return delete e.ref, n(e, t.ref || null);
	  }

	  return t.$$typeof = R, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
	}

	var A$1 = l$3.__e;

	l$3.__e = function (n, t, e, r) {
	  if (n.then) for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), u.__c(n, t);
	  A$1(n, t, e, r);
	};

	var O = l$3.unmount;

	function L$1() {
	  this.__u = 0, this.t = null, this.__b = null;
	}

	function U(n) {
	  var t = n.__.__c;
	  return t && t.__e && t.__e(n);
	}

	function M$1() {
	  this.u = null, this.o = null;
	}

	l$3.unmount = function (n) {
	  var t = n.__c;
	  t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), O && O(n);
	}, (L$1.prototype = new _$2()).__c = function (n, t) {
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
	}, L$1.prototype.componentWillUnmount = function () {
	  this.t = [];
	}, L$1.prototype.render = function (n, t) {
	  if (this.__b) {
	    if (this.__v.__k) {
	      var e = document.createElement("div"),
	          r = this.__v.__k[0].__c;

	      this.__v.__k[0] = function n(t, e, r) {
	        return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function (n) {
	          "function" == typeof n.__c && n.__c();
	        }), t.__c.__H = null), null != (t = C$1({}, t)).__c && (t.__c.__P === r && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function (t) {
	          return n(t, e, r);
	        })), t;
	      }(this.__b, e, r.__O = r.__P);
	    }

	    this.__b = null;
	  }

	  var u = t.__e && v$2(d$2, null, n.fallback);
	  return u && (u.__h = null), [v$2(d$2, null, t.__e ? null : n.children), u];
	};

	var T$1 = function (n, t, e) {
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

	function I$1(n) {
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
	  }), S$1(v$2(D, {
	    context: t.context
	  }, n.__v), t.l)) : t.l && t.componentWillUnmount();
	}

	function W(n, t) {
	  var e = v$2(I$1, {
	    __v: n,
	    i: t
	  });
	  return e.containerInfo = t, e;
	}

	(M$1.prototype = new _$2()).__e = function (n) {
	  var t = this,
	      e = U(t.__v),
	      r = t.o.get(n);
	  return r[0]++, function (u) {
	    var o = function () {
	      t.props.revealOrder ? (r.push(u), T$1(t, n, r)) : u();
	    };

	    e ? e(o) : o();
	  };
	}, M$1.prototype.render = function (n) {
	  this.u = null, this.o = new Map();
	  var t = A$2(n.children);
	  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

	  for (var e = t.length; e--;) this.o.set(t[e], this.u = [1, 0, this.u]);

	  return n.children;
	}, M$1.prototype.componentDidUpdate = M$1.prototype.componentDidMount = function () {
	  var n = this;
	  this.o.forEach(function (t, e) {
	    T$1(n, e, t);
	  });
	};

	var P$1 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
	    V = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|shape|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
	    $$1 = "undefined" != typeof document,
	    j$1 = function (n) {
	  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n);
	};

	_$2.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (n) {
	  Object.defineProperty(_$2.prototype, n, {
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
	var H$1 = l$3.event;

	function Z() {}

	function Y() {
	  return this.cancelBubble;
	}

	function q() {
	  return this.defaultPrevented;
	}

	l$3.event = function (n) {
	  return H$1 && (n = H$1(n)), n.persist = Z, n.isPropagationStopped = Y, n.isDefaultPrevented = q, n.nativeEvent = n;
	};

	var J = {
	  configurable: !0,
	  get: function () {
	    return this.class;
	  }
	},
	    K = l$3.vnode;

	l$3.vnode = function (n) {
	  var t = n.type,
	      e = n.props,
	      r = e;

	  if ("string" == typeof t) {
	    var u = -1 === t.indexOf("-");

	    for (var o in r = {}, e) {
	      var i = e[o];
	      $$1 && "children" === o && "noscript" === t || "value" === o && "defaultValue" in e && null == i || ("defaultValue" === o && "value" in e && null == e.value ? o = "value" : "download" === o && !0 === i ? i = "" : /ondoubleclick/i.test(o) ? o = "ondblclick" : /^onchange(textarea|input)/i.test(o + t) && !j$1(e.type) ? o = "oninput" : /^onfocus$/i.test(o) ? o = "onfocusin" : /^onblur$/i.test(o) ? o = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o) ? o = o.toLowerCase() : u && V.test(o) ? o = o.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === i && (i = void 0), /^oninput$/i.test(o) && (o = o.toLowerCase(), r[o] && (o = "oninputCapture")), r[o] = i);
	    }

	    "select" == t && r.multiple && Array.isArray(r.value) && (r.value = A$2(e.children).forEach(function (n) {
	      n.props.selected = -1 != r.value.indexOf(n.props.value);
	    })), "select" == t && null != r.defaultValue && (r.value = A$2(e.children).forEach(function (n) {
	      n.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(n.props.value) : r.defaultValue == n.props.value;
	    })), n.props = r, e.class != e.className && (J.enumerable = "className" in e, null != e.className && (r.class = e.className), Object.defineProperty(r, "className", J));
	  }

	  n.$$typeof = P$1, K && K(n);
	};

	var Q = l$3.__r;

	l$3.__r = function (n) {
	  Q && Q(n), n.__c;
	};

	/**
	 * Shortcut for preact/compat's `forwardRef` that auto-assumes some things that are useful for forwarding refs to `HTMLElements` specifically.
	 * Namely it involves de-gunking the type system by letting us return *generic* function and playing nice with React. In all other respects, it acts like `forwardRef`.
	 */

	function forwardElementRef$1(Component) {
	  const ForwardedComponent = x$1(Component);
	  return ForwardedComponent;
	}

	function getClassName(classBase, show, phase) {
	  if (phase) return `${classBase || "transition"}-${show}-${phase}`;else return `${classBase || "transition"}-${show}`;
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


	function useCreateTransitionableProps(_ref, otherProps) {
	  var _classBase;

	  let {
	    measure,
	    animateOnMount,
	    classBase,
	    onTransitionUpdate,
	    exitVisibility,
	    duration,
	    show,
	    ref
	  } = _ref;
	  (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
	  const {
	    getElement,
	    useRefElementProps
	  } = useRefElement({});
	  const [phase, setPhase] = y$1(animateOnMount ? "init" : null);
	  const [direction, setDirection] = y$1(show == null ? null : show ? "enter" : "exit");
	  const [surfaceWidth, setSurfaceWidth] = y$1(null);
	  const [surfaceHeight, setSurfaceHeight] = y$1(null);
	  const [surfaceX, setSurfaceX] = y$1(null);
	  const [surfaceY, setSurfaceY] = y$1(null);
	  const [transitioningWidth, setTransitioningWidth] = y$1(null);
	  const [transitioningHeight, setTransitioningHeight] = y$1(null);
	  const [transitioningX, setTransitioningX] = y$1(null);
	  const [transitioningY, setTransitioningY] = y$1(null);
	  const [logicalDirectionInfo, setLogicalDirectionInfo] = y$1(null);
	  const {
	    getLogicalDirectionInfo,
	    useLogicalDirectionProps
	  } = useLogicalDirection({
	    onLogicalDirectionChange: setLogicalDirectionInfo
	  });
	  const onTransitionUpdateRef = s$2(onTransitionUpdate);
	  const phaseRef = s$2(phase);
	  const directionRef = s$2(direction);
	  const durationRef = s$2(duration);
	  const tooEarlyTimeoutRef = s$2(null);
	  const tooEarlyValueRef = s$2(true);
	  const tooLateTimeoutRef = s$2(null);
	  const onTransitionEnd = T$2(e => {
	    if (e.target === getElement() && tooEarlyValueRef.current == false) {
	      setPhase("finalize");
	    }
	  }, []);
	  h$1(() => {
	    onTransitionUpdateRef.current = onTransitionUpdate;
	  }, [onTransitionUpdate]);
	  h$1(() => {
	    phaseRef.current = phase;
	  }, [phase]);
	  h$1(() => {
	    directionRef.current = direction;
	  }, [direction]);
	  h$1(() => {
	    durationRef.current = duration;
	  }, [duration]);
	  h$1(() => {
	    var _onTransitionUpdateRe;

	    if (direction && phase) (_onTransitionUpdateRe = onTransitionUpdateRef.current) === null || _onTransitionUpdateRe === void 0 ? void 0 : _onTransitionUpdateRe.call(onTransitionUpdateRef, direction, phase);
	  }, [direction, phase]); // Every time the phase changes to "transition", add our transition timeout timeouts
	  // to catch any time onTransitionEnd fails to report for whatever reason to be safe

	  h$1(() => {
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
	  }, [phase]); // Any time "show" changes, update our direction and phase.
	  // In addition, measure the size of the element if requested.

	  h$1(() => {
	    const element = getElement();

	    if (element && show != null) {
	      const previousPhase = phaseRef.current; // Swap our direction

	      if (show) setDirection("enter");else setDirection("exit");
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
	  }, [show, measure, classBase]); // Any time the phase changes to init, immediately before the screen is painted,
	  // change the phase to "transition" and re-render ().

	  h$1(() => {
	    const element = getElement();

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
	  }, [phase, measure]);
	  const inlineDirection = logicalDirectionInfo === null || logicalDirectionInfo === void 0 ? void 0 : logicalDirectionInfo.inlineDirection;
	  const blockDirection = logicalDirectionInfo === null || logicalDirectionInfo === void 0 ? void 0 : logicalDirectionInfo.blockDirection;
	  const writingModeIsHorizontal = inlineDirection == "rtl" || inlineDirection == "ltr";
	  const surfaceInlineInset = writingModeIsHorizontal ? surfaceX : surfaceY;
	  const surfaceBlockInset = writingModeIsHorizontal ? surfaceY : surfaceX;
	  const surfaceInlineSize = writingModeIsHorizontal ? surfaceWidth : surfaceHeight;
	  const surfaceBlockSize = writingModeIsHorizontal ? surfaceHeight : surfaceWidth;
	  const transitioningInlineInset = writingModeIsHorizontal ? transitioningX : transitioningY;
	  const transitioningBlockInset = writingModeIsHorizontal ? transitioningY : transitioningX;
	  const transitioningInlineSize = writingModeIsHorizontal ? transitioningWidth : transitioningHeight;
	  const transitioningBlockSize = writingModeIsHorizontal ? transitioningHeight : transitioningWidth;
	  let almostDone = useRefElementProps(useLogicalDirectionProps({
	    ref,
	    style: removeEmpty({
	      [`--${classBase}-duration`]: duration ? `${duration}ms` : undefined,
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
	      "aria-hidden": show ? undefined : "true"
	    },
	    className: clsx(direction && getClassName(classBase, direction), direction && phase && getClassName(classBase, direction, phase), exitVisibility == "removed" && `${classBase}-removed-on-exit`, exitVisibility == "visible" && `${classBase}-visible-on-exit`, `${classBase}-inline-direction-${inlineDirection !== null && inlineDirection !== void 0 ? inlineDirection : "ltr"}`, `${classBase}-block-direction-${blockDirection !== null && blockDirection !== void 0 ? blockDirection : "ttb"}`)
	  }));
	  return useMergedProps()(almostDone, otherProps);
	}

	function removeEmpty(obj) {
	  return Object.fromEntries(Object.entries(obj).filter(_ref2 => {
	    let [_, v] = _ref2;
	    return v != null;
	  }));
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
	 * @example `<Transitionable show={show} {...useCreateFadeProps(...)}><div>{children}</div></Transitionable>`
	 * @example `<Transitionable show={show}><div {...useCreateFadeProps(...)}>{children}</div></Transitionable>`
	 */


	const Transitionable = forwardElementRef$1(function Transition(_ref3, r) {
	  let {
	    children: child,
	    duration,
	    classBase,
	    measure,
	    exitVisibility,
	    show,
	    onTransitionUpdate,
	    animateOnMount,
	    childMountBehavior,
	    ...props
	  } = _ref3;
	  const [hasShownOnce, setHasShownOnce] = y$1(false);
	  const shouldSetHasShownOnce = hasShownOnce === false && childMountBehavior === "mount-on-show" && show === true;
	  _$1(() => {
	    if (shouldSetHasShownOnce) setHasShownOnce(true);
	  }, [shouldSetHasShownOnce]);
	  if (childMountBehavior === "mount-when-showing" && !show) child = v$2("div", null);
	  if (childMountBehavior === "mount-on-show" && !show && hasShownOnce === false) child = v$2("div", null);

	  if (!childIsVNode(child)) {
	    throw new Error("A Transitionable component must have exactly one component child (e.g. a <div>, but not \"a string\").");
	  }

	  const transitionProps = useCreateTransitionableProps({
	    classBase,
	    duration,
	    measure,
	    show,
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

	function useCreateClipProps(_ref, otherProps) {
	  var _classBase, _ref2, _ref3, _ref4, _ref5;

	  let {
	    classBase,
	    clipOrigin,
	    clipOriginInline,
	    clipOriginBlock,
	    clipMin,
	    clipMinInline,
	    clipMinBlock
	  } = _ref;
	  (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
	  return useMergedProps()({
	    className: clsx(`${classBase}-clip`),
	    classBase,
	    style: {
	      [`--${classBase}-clip-origin-inline`]: (_ref2 = clipOriginInline !== null && clipOriginInline !== void 0 ? clipOriginInline : clipOrigin) !== null && _ref2 !== void 0 ? _ref2 : 0.5,
	      [`--${classBase}-clip-origin-block`]: (_ref3 = clipOriginBlock !== null && clipOriginBlock !== void 0 ? clipOriginBlock : clipOrigin) !== null && _ref3 !== void 0 ? _ref3 : 0,
	      [`--${classBase}-clip-min-inline`]: (_ref4 = clipMinInline !== null && clipMinInline !== void 0 ? clipMinInline : clipMin) !== null && _ref4 !== void 0 ? _ref4 : 1,
	      [`--${classBase}-clip-min-block`]: (_ref5 = clipMinBlock !== null && clipMinBlock !== void 0 ? clipMinBlock : clipMin) !== null && _ref5 !== void 0 ? _ref5 : 0
	    }
	  }, otherProps);
	}
	const Clip = forwardElementRef$1(function Clip(_ref6, ref) {
	  let {
	    classBase,
	    clipOrigin,
	    clipOriginInline,
	    clipOriginBlock,
	    clipMin,
	    clipMinInline,
	    clipMinBlock,
	    show,
	    ...rest
	  } = _ref6;
	  return v$2(Transitionable, {
	    show: show,
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

	function useCreateFadeProps(_ref, otherProps) {
	  var _classBase;

	  let {
	    classBase,
	    fadeMin,
	    fadeMax
	  } = _ref;
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

	const Fade = forwardElementRef$1(function Fade(_ref2, ref) {
	  let {
	    classBase,
	    fadeMin,
	    fadeMax,
	    show,
	    ...rest
	  } = _ref2;
	  return v$2(Transitionable, {
	    show: show,
	    ...useCreateFadeProps({
	      classBase,
	      fadeMin,
	      fadeMax
	    }, { ...rest,
	      ref
	    })
	  });
	});

	const ClipFade = forwardElementRef$1(function ClipFade(_ref, ref) {
	  let {
	    classBase,
	    fadeMin,
	    fadeMax,
	    show,
	    ...rest
	  } = _ref;
	  return v$2(Clip, {
	    show: show,
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

	function useCreateCollapseProps(_ref, otherProps) {
	  var _classBase;

	  let {
	    classBase,
	    minBlockSize
	  } = _ref;
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

	const Collapse = forwardElementRef$1(function Collapse(_ref2, ref) {
	  let {
	    classBase,
	    show,
	    minBlockSize,
	    ...rest
	  } = _ref2;
	  return v$2(Transitionable, {
	    show: show,
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

	forwardElementRef$1(function CollapseFade(_ref, ref) {
	  let {
	    classBase,
	    fadeMin,
	    fadeMax,
	    show,
	    ...rest
	  } = _ref;
	  return v$2(Collapse, {
	    show: show,
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

	function useCreateSlideProps(_ref, otherProps) {
	  var _classBase, _slideTargetInline, _slideTargetBlock, _slideTargetInline2, _slideTargetBlock2;

	  let {
	    classBase,
	    slideTargetInline,
	    slideTargetBlock
	  } = _ref;
	  (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
	  const lastValidTargetInline = s$2((_slideTargetInline = slideTargetInline) !== null && _slideTargetInline !== void 0 ? _slideTargetInline : 1);
	  const lastValidTargetBlock = s$2((_slideTargetBlock = slideTargetBlock) !== null && _slideTargetBlock !== void 0 ? _slideTargetBlock : 0);
	  _$1(() => {
	    if (slideTargetInline) lastValidTargetInline.current = slideTargetInline;
	  }, [slideTargetInline]);
	  _$1(() => {
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

	const Slide = forwardElementRef$1(function Slide(_ref2, ref) {
	  let {
	    classBase,
	    slideTargetInline,
	    slideTargetBlock,
	    show,
	    ...rest
	  } = _ref2;
	  return v$2(Transitionable, {
	    show: show,
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

	const SlideFade = forwardElementRef$1(function SlideFade(_ref, ref) {
	  let {
	    classBase,
	    fadeMin,
	    fadeMax,
	    show,
	    ...rest
	  } = _ref;
	  return v$2(Slide, {
	    show: show,
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

	function useCreateZoomProps(_ref, otherProps) {
	  var _classBase, _ref2, _ref3, _ref4, _ref5;

	  let {
	    classBase,
	    zoomOrigin,
	    zoomOriginInline,
	    zoomOriginBlock,
	    zoomMin,
	    zoomMinInline,
	    zoomMinBlock
	  } = _ref;
	  (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
	  return useMergedProps()({
	    className: `${classBase}-zoom`,
	    classBase,
	    style: {
	      [`--${classBase}-zoom-origin-inline`]: `${(_ref2 = zoomOriginInline !== null && zoomOriginInline !== void 0 ? zoomOriginInline : zoomOrigin) !== null && _ref2 !== void 0 ? _ref2 : 0.5}`,
	      [`--${classBase}-zoom-origin-block`]: `${(_ref3 = zoomOriginBlock !== null && zoomOriginBlock !== void 0 ? zoomOriginBlock : zoomOrigin) !== null && _ref3 !== void 0 ? _ref3 : 0.5}`,
	      [`--${classBase}-zoom-min-inline`]: `${(_ref4 = zoomMinInline !== null && zoomMinInline !== void 0 ? zoomMinInline : zoomMin) !== null && _ref4 !== void 0 ? _ref4 : 0}`,
	      [`--${classBase}-zoom-min-block`]: `${(_ref5 = zoomMinBlock !== null && zoomMinBlock !== void 0 ? zoomMinBlock : zoomMin) !== null && _ref5 !== void 0 ? _ref5 : 0}`
	    }
	  }, otherProps);
	}
	/**
	 * Wraps a div (etc.) and allows it to transition in/out smoothly with a Zoom effect.
	 * @see `Transitionable` `ZoomFade`
	 */

	const Zoom = forwardElementRef$1(function Zoom(_ref6, ref) {
	  let {
	    classBase,
	    zoomOrigin,
	    zoomOriginInline,
	    zoomOriginBlock,
	    zoomMin,
	    zoomMinInline,
	    zoomMinBlock,
	    show,
	    ...rest
	  } = _ref6;
	  return v$2(Transitionable, {
	    show: show,
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

	const ZoomFade = forwardElementRef$1(function ZoomFade(_ref, ref) {
	  let {
	    classBase,
	    fadeMin,
	    fadeMax,
	    show,
	    ...rest
	  } = _ref;
	  return v$2(Zoom, {
	    show: show,
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

	const SlideZoom = forwardElementRef$1(function SlideZoom(_ref, ref) {
	  let {
	    classBase,
	    zoomMin,
	    zoomMinInline,
	    zoomMinBlock,
	    zoomOrigin,
	    zoomOriginInline,
	    zoomOriginBlock,
	    show,
	    ...rest
	  } = _ref;
	  return v$2(Slide, {
	    show: show,
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

	const SlideZoomFade = forwardElementRef$1(function SlideZoomFade(_ref, ref) {
	  let {
	    classBase,
	    fadeMin,
	    fadeMax,
	    show,
	    ...rest
	  } = _ref;
	  return v$2(SlideZoom, {
	    show: show,
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

	function useCreateFlipProps(_ref, otherProps) {
	  var _classBase, _flipAngleInline, _flipAngleBlock, _flipAngleInline2, _flipAngleBlock2;

	  let {
	    classBase,
	    flipAngleInline,
	    flipAngleBlock,
	    perspective
	  } = _ref;
	  (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
	  const lastValidTargetInline = s$2((_flipAngleInline = flipAngleInline) !== null && _flipAngleInline !== void 0 ? _flipAngleInline : 180);
	  const lastValidTargetBlock = s$2((_flipAngleBlock = flipAngleBlock) !== null && _flipAngleBlock !== void 0 ? _flipAngleBlock : 0);
	  _$1(() => {
	    if (flipAngleInline) lastValidTargetInline.current = flipAngleInline;
	  }, [flipAngleInline]);
	  _$1(() => {
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

	const Flip = forwardElementRef$1(function Flip(_ref2, ref) {
	  let {
	    classBase,
	    flipAngleInline,
	    flipAngleBlock,
	    perspective,
	    show,
	    ...rest
	  } = _ref2;
	  return v$2(Transitionable, {
	    show: show,
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

	function useCreateSwappableProps(_ref, otherProps) {
	  let {
	    inline,
	    classBase
	  } = _ref;
	  return useMergedProps()({
	    className: clsx(`${classBase !== null && classBase !== void 0 ? classBase : "transition"}-swap-container`, inline && `${classBase !== null && classBase !== void 0 ? classBase : "transition"}-swap-container-inline`)
	  }, otherProps);
	}
	/**
	 * Allows a set of child <Transitionable> components to animate in & out in-place. Very useful for, e.g., tab panels.
	 *
	 * You must manage each child `<Transitionable>` component's `show` prop -- this component *does not* manage any sort of state in that regard.
	 *
	 * Like `<Transitionable>`, *this wraps an HTMLElement (or other ref-forwarding component)*. This will be your container that holds each `<Transitionable>` (or component that uses it). Strictly speaking it could be anything, not a `<Transitionable>`, but if it doesnt't transition out then it's just going to be hanging around 100% of the time.
	 *
	 * Long way of saying, if you get a cryptic error with this component, make sure it has a single `<div>` child or something.
	 * @param param0
	 * @returns
	 */

	const Swappable = forwardElementRef$1(function Swappable(_ref2, ref) {
	  var _inline;

	  let {
	    children,
	    classBase,
	    inline,
	    ...p
	  } = _ref2;
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

	var preact = {};

	var n$2,
	    l$1,
	    u$1,
	    t$1,
	    i$1,
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

	function p$1(n) {
	  var l = n.parentNode;
	  l && l.removeChild(n);
	}

	function h(l, u, t) {
	  var i,
	      o,
	      r,
	      f = {};

	  for (r in u) "key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

	  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n$2.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
	  return v(l, f, i, o, null);
	}

	function v(n, t, i, o, r) {
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
	    __v: null == r ? ++u$1 : r
	  };
	  return null == r && null != l$1.vnode && l$1.vnode(f), f;
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
	  (!n.__d && (n.__d = !0) && i$1.push(n) && !b.__r++ || r$1 !== l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(b);
	}

	function b() {
	  for (var n; b.__r = i$1.length;) n = i$1.sort(function (n, l) {
	    return n.__v.__b - l.__v.__b;
	  }), i$1 = [], n.some(function (n) {
	    var l, u, t, i, o, r;
	    n.__d && (o = (i = (l = n).__v).__e, (r = l.__P) && (u = [], (t = a$1({}, i)).__v = i.__v + 1, I(r, i, t, l.__n, void 0 !== r.ownerSVGElement, null != i.__h ? [o] : null, u, null == o ? _(i) : o, i.__h), T(u, i), i.__e != o && k(i)));
	  });
	}

	function m(n, l, u, t, i, o, r, f, s, a) {
	  var p,
	      h,
	      d,
	      k,
	      x,
	      b,
	      m,
	      A = t && t.__k || c$1,
	      P = A.length;

	  for (u.__k = [], p = 0; p < l.length; p++) if (null != (k = u.__k[p] = null == (k = l[p]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(y, {
	    children: k
	  }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
	    if (k.__ = u, k.__b = u.__b + 1, null === (d = A[p]) || d && k.key == d.key && k.type === d.type) A[p] = void 0;else for (h = 0; h < P; h++) {
	      if ((d = A[h]) && k.key == d.key && k.type === d.type) {
	        A[h] = void 0;
	        break;
	      }

	      d = null;
	    }
	    I(n, k, d = d || e$1, i, o, r, f, s, a), x = k.__e, (h = k.ref) && d.ref != h && (m || (m = []), d.ref && m.push(d.ref, null, k), m.push(h, k.__c || x, k)), null != x ? (null == b && (b = x), "function" == typeof k.type && k.__k === d.__k ? k.__d = s = g(k, s, n) : s = w(n, k, d, A, x, s), "function" == typeof u.type && (u.__d = s)) : s && d.__e == s && s.parentNode != n && (s = _(d));
	  }

	  for (u.__e = b, p = P; p--;) null != A[p] && ("function" == typeof u.type && null != A[p].__e && A[p].__e == u.__d && (u.__d = _(t, p + 1)), L(A[p], A[p]));

	  if (m) for (p = 0; p < m.length; p++) z(m[p], m[++p], m[++p]);
	}

	function g(n, l, u) {
	  for (var t, i = n.__k, o = 0; i && o < i.length; o++) (t = i[o]) && (t.__ = n, l = "function" == typeof t.type ? g(t, l, u) : w(u, t, t, i, t.__e, l));

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
	  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s$1.test(l) ? u : u + "px";
	}

	function C(n, l, u, t, i) {
	  var o;

	  n: if ("style" === l) {
	    if ("string" == typeof u) n.style.cssText = u;else {
	      if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || P(n.style, l, "");
	      if (u) for (l in u) t && u[l] === t[l] || P(n.style, l, u[l]);
	    }
	  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? t || n.addEventListener(l, o ? H : $, o) : n.removeEventListener(l, o ? H : $, o);else if ("dangerouslySetInnerHTML" !== l) {
	    if (i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
	      n[l] = null == u ? "" : u;
	      break n;
	    } catch (n) {}
	    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
	  }
	}

	function $(n) {
	  this.l[n.type + !1](l$1.event ? l$1.event(n) : n);
	}

	function H(n) {
	  this.l[n.type + !0](l$1.event ? l$1.event(n) : n);
	}

	function I(n, u, t, i, o, r, f, e, c) {
	  var s,
	      p,
	      h,
	      v,
	      _,
	      k,
	      x,
	      b,
	      g,
	      w,
	      A,
	      P,
	      C,
	      $ = u.type;

	  if (void 0 !== u.constructor) return null;
	  null != t.__h && (c = t.__h, e = u.__e = t.__e, u.__h = null, r = [e]), (s = l$1.__b) && s(u);

	  try {
	    n: if ("function" == typeof $) {
	      if (b = u.props, g = (s = $.contextType) && i[s.__c], w = s ? g ? g.props.value : s.__ : i, t.__c ? x = (p = u.__c = t.__c).__ = p.__E : ("prototype" in $ && $.prototype.render ? u.__c = p = new $(b, w) : (u.__c = p = new d(b, w), p.constructor = $, p.render = M), g && g.sub(p), p.props = b, p.state || (p.state = {}), p.context = w, p.__n = i, h = p.__d = !0, p.__h = []), null == p.__s && (p.__s = p.state), null != $.getDerivedStateFromProps && (p.__s == p.state && (p.__s = a$1({}, p.__s)), a$1(p.__s, $.getDerivedStateFromProps(b, p.__s))), v = p.props, _ = p.state, h) null == $.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), null != p.componentDidMount && p.__h.push(p.componentDidMount);else {
	        if (null == $.getDerivedStateFromProps && b !== v && null != p.componentWillReceiveProps && p.componentWillReceiveProps(b, w), !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(b, p.__s, w) || u.__v === t.__v) {
	          p.props = b, p.state = p.__s, u.__v !== t.__v && (p.__d = !1), p.__v = u, u.__e = t.__e, u.__k = t.__k, u.__k.forEach(function (n) {
	            n && (n.__ = u);
	          }), p.__h.length && f.push(p);
	          break n;
	        }

	        null != p.componentWillUpdate && p.componentWillUpdate(b, p.__s, w), null != p.componentDidUpdate && p.__h.push(function () {
	          p.componentDidUpdate(v, _, k);
	        });
	      }
	      if (p.context = w, p.props = b, p.__v = u, p.__P = n, A = l$1.__r, P = 0, "prototype" in $ && $.prototype.render) p.state = p.__s, p.__d = !1, A && A(u), s = p.render(p.props, p.state, p.context);else do {
	        p.__d = !1, A && A(u), s = p.render(p.props, p.state, p.context), p.state = p.__s;
	      } while (p.__d && ++P < 25);
	      p.state = p.__s, null != p.getChildContext && (i = a$1(a$1({}, i), p.getChildContext())), h || null == p.getSnapshotBeforeUpdate || (k = p.getSnapshotBeforeUpdate(v, _)), C = null != s && s.type === y && null == s.key ? s.props.children : s, m(n, Array.isArray(C) ? C : [C], u, t, i, o, r, f, e, c), p.base = u.__e, u.__h = null, p.__h.length && f.push(p), x && (p.__E = p.__ = null), p.__e = !1;
	    } else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = j(t.__e, u, t, i, o, r, f, c);

	    (s = l$1.diffed) && s(u);
	  } catch (n) {
	    u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l$1.__e(n, u, t);
	  }
	}

	function T(n, u) {
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

	function j(l, u, t, i, o, r, f, c) {
	  var s,
	      a,
	      h,
	      v = t.props,
	      y = u.props,
	      d = u.type,
	      k = 0;
	  if ("svg" === d && (o = !0), null != r) for (; k < r.length; k++) if ((s = r[k]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
	    l = s, r[k] = null;
	    break;
	  }

	  if (null == l) {
	    if (null === d) return document.createTextNode(y);
	    l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, y.is && y), r = null, c = !1;
	  }

	  if (null === d) v === y || c && l.data === y || (l.data = y);else {
	    if (r = r && n$2.call(l.childNodes), a = (v = t.props || e$1).dangerouslySetInnerHTML, h = y.dangerouslySetInnerHTML, !c) {
	      if (null != r) for (v = {}, k = 0; k < l.attributes.length; k++) v[l.attributes[k].name] = l.attributes[k].value;
	      (h || a) && (h && (a && h.__html == a.__html || h.__html === l.innerHTML) || (l.innerHTML = h && h.__html || ""));
	    }

	    if (A(l, y, v, o, c), h) u.__k = [];else if (k = u.props.children, m(l, Array.isArray(k) ? k : [k], u, t, i, o && "foreignObject" !== d, r, f, r ? r[0] : t.__k && _(t, 0), c), null != r) for (k = r.length; k--;) null != r[k] && p$1(r[k]);
	    c || ("value" in y && void 0 !== (k = y.value) && (k !== l.value || "progress" === d && !k || "option" === d && k !== v.value) && C(l, "value", k, v.value, !1), "checked" in y && void 0 !== (k = y.checked) && k !== l.checked && C(l, "checked", k, v.checked, !1));
	  }
	  return l;
	}

	function z(n, u, t) {
	  try {
	    "function" == typeof n ? n(u) : n.current = u;
	  } catch (n) {
	    l$1.__e(n, t);
	  }
	}

	function L(n, u, t) {
	  var i, o;

	  if (l$1.unmount && l$1.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || z(i, null, u)), null != (i = n.__c)) {
	    if (i.componentWillUnmount) try {
	      i.componentWillUnmount();
	    } catch (n) {
	      l$1.__e(n, u);
	    }
	    i.base = i.__P = null;
	  }

	  if (i = n.__k) for (o = 0; o < i.length; o++) i[o] && L(i[o], u, "function" != typeof n.type);
	  t || null == n.__e || p$1(n.__e), n.__e = n.__d = void 0;
	}

	function M(n, l, u) {
	  return this.constructor(n, u);
	}

	function N(u, t, i) {
	  var o, r, f;
	  l$1.__ && l$1.__(u, t), r = (o = "function" == typeof i) ? null : i && i.__k || t.__k, f = [], I(t, u = (!o && i || t).__k = h(y, null, [u]), r || e$1, e$1, void 0 !== t.ownerSVGElement, !o && i ? [i] : r ? null : t.firstChild ? n$2.call(t.childNodes) : null, f, !o && i ? i : r ? r.__e : t.firstChild, o), T(f, u);
	}

	n$2 = c$1.slice, l$1 = {
	  __e: function (n, l, u, t) {
	    for (var i, o, r; l = l.__;) if ((i = l.__c) && !i.__) try {
	      if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(n)), r = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), r = i.__d), r) return i.__E = i;
	    } catch (l) {
	      n = l;
	    }

	    throw n;
	  }
	}, u$1 = 0, t$1 = function (n) {
	  return null != n && void 0 === n.constructor;
	}, d.prototype.setState = function (n, l) {
	  var u;
	  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a$1({}, this.state), "function" == typeof n && (n = n(a$1({}, u), this.props)), n && a$1(u, n), null != n && this.__v && (l && this.__h.push(l), x(this));
	}, d.prototype.forceUpdate = function (n) {
	  this.__v && (this.__e = !0, n && this.__h.push(n), x(this));
	}, d.prototype.render = y, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, f$1 = 0, preact.render = N, preact.hydrate = function n(l, u) {
	  N(l, u, n);
	}, preact.createElement = h, preact.h = h, preact.Fragment = y, preact.createRef = function () {
	  return {
	    current: null
	  };
	}, preact.isValidElement = t$1, preact.Component = d, preact.cloneElement = function (l, u, t) {
	  var i,
	      o,
	      r,
	      f = a$1({}, l.props);

	  for (r in u) "key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];

	  return arguments.length > 2 && (f.children = arguments.length > 3 ? n$2.call(arguments, 2) : t), v(l.type, f, i || l.key, o || l.ref, null);
	}, preact.createContext = function (n, l) {
	  var u = {
	    __c: l = "__cC" + f$1++,
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
	}, preact.toChildArray = function n(l, u) {
	  return u = u || [], null == l || "boolean" == typeof l || (Array.isArray(l) ? l.some(function (l) {
	    n(l, u);
	  }) : u.push(l)), u;
	}, preact.options = l$1;

	var n$1 = preact;
	"undefined" != typeof window && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.8.2", n$1.options, {
	  Fragment: n$1.Fragment,
	  Component: n$1.Component
	});

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

	function c(e) {
	  return "function" == typeof e.type && e.type != n.Fragment;
	}

	function s(n) {
	  for (var e = [n], o = n; null != o.__o;) e.push(o.__o), o = o.__o;

	  return e.reduce(function (n, e) {
	    n += "  in " + t(e);
	    var o = e.__source;
	    return o ? n += " (at " + o.fileName + ":" + o.lineNumber + ")" : i || (i = !0, console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")), n + "\n";
	  }, "");
	}

	var u = "function" == typeof WeakMap,
	    l = n.Component.prototype.setState;

	n.Component.prototype.setState = function (n, e) {
	  return null == this.__v && null == this.state && console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n' + s(a())), l.call(this, n, e);
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

	  var c = e.children;
	  return "<" + o + r + (c && c.length ? ">..</" + o + ">" : " />");
	}

	n.Component.prototype.forceUpdate = function (n) {
	  return null == this.__v ? console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n' + s(a())) : null == this.__P && console.warn('Can\'t call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n' + s(this.__v)), f.call(this, n);
	}, function () {
	  !function () {
	    var e = n.options.__b,
	        t = n.options.diffed,
	        a = n.options.__,
	        i = n.options.vnode,
	        s = n.options.__r;
	    n.options.diffed = function (n) {
	      c(n) && r.pop(), o.pop(), t && t(n);
	    }, n.options.__b = function (n) {
	      c(n) && o.push(n), e && e(n);
	    }, n.options.__ = function (n, e) {
	      r = [], a && a(n, e);
	    }, n.options.vnode = function (n) {
	      n.__o = r.length > 0 ? r[r.length - 1] : null, i && i(n);
	    }, n.options.__r = function (n) {
	      c(n) && r.push(n), s && s(n);
	    };
	  }();
	  var a = !1,
	      i = n.options.__b,
	      l = n.options.diffed,
	      f = n.options.vnode,
	      d = n.options.__e,
	      h = n.options.__,
	      v = n.options.__h,
	      y = u ? {
	    useEffect: new WeakMap(),
	    useLayoutEffect: new WeakMap(),
	    lazyPropTypes: new WeakMap()
	  } : null,
	      m = [];
	  n.options.__e = function (n, e, o, r) {
	    if (e && e.__c && "function" == typeof n.then) {
	      var a = n;
	      n = new Error("Missing Suspense. The throwing component was: " + t(e));

	      for (var i = e; i; i = i.__) if (i.__c && i.__c.__c) {
	        n = a;
	        break;
	      }

	      if (n instanceof Error) throw n;
	    }

	    try {
	      (r = r || {}).componentStack = s(e), d(n, e, o, r), "function" != typeof n.then && setTimeout(function () {
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

	    if (a = !0, void 0 === o) throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + p(n) + "\n\n" + s(n));

	    if (null != o && "object" == typeof o) {
	      if (void 0 !== o.__k && void 0 !== o.__e) throw new Error("Invalid type passed to createElement(): " + o + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + t(n) + " = " + p(o) + ";\n  let vnode = <My" + t(n) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + s(n));
	      throw new Error("Invalid type passed to createElement(): " + (Array.isArray(o) ? "array" : o));
	    }

	    if ("thead" !== o && "tfoot" !== o && "tbody" !== o || "table" === r.type ? "tr" === o && "thead" !== r.type && "tfoot" !== r.type && "tbody" !== r.type && "table" !== r.type ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + p(n) + "\n\n" + s(n)) : "td" === o && "tr" !== r.type ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + p(n) + "\n\n" + s(n)) : "th" === o && "tr" !== r.type && console.error("Improper nesting of table. Your <th> should have a <tr>." + p(n) + "\n\n" + s(n)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + p(n) + "\n\n" + s(n)), void 0 !== n.ref && "function" != typeof n.ref && "object" != typeof n.ref && !("$$typeof" in n)) throw new Error('Component\'s "ref" property should be a function, or an object created by createRef(), but got [' + typeof n.ref + "] instead\n" + p(n) + "\n\n" + s(n));
	    if ("string" == typeof n.type) for (var c in n.props) if ("o" === c[0] && "n" === c[1] && "function" != typeof n.props[c] && null != n.props[c]) throw new Error("Component's \"" + c + '" property should be a function, but got [' + typeof n.props[c] + "] instead\n" + p(n) + "\n\n" + s(n));

	    if ("function" == typeof n.type && n.type.propTypes) {
	      if ("Lazy" === n.type.displayName && y && !y.lazyPropTypes.has(n.type)) {
	        var u = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";

	        try {
	          var l = n.type();
	          y.lazyPropTypes.set(n.type, !0), console.warn(u + "Component wrapped in lazy() is " + t(l));
	        } catch (n) {
	          console.warn(u + "We will log the wrapped component's name once it is loaded.");
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
	        return s(n);
	      });
	    }

	    i && i(n);
	  }, n.options.__h = function (n, e, t) {
	    if (!n || !a) throw new Error("Hook can only be invoked from render methods.");
	    v && v(n, e, t);
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
	        throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + t + "}.\n\n" + s(n));
	      }
	    }), a = !1, l && l(n), null != n.__k) for (var e = [], t = 0; t < n.__k.length; t++) {
	      var o = n.__k[t];

	      if (o && null != o.key) {
	        var r = o.key;

	        if (-1 !== e.indexOf(r)) {
	          console.error('Following component has two or more children with the same key attribute: "' + r + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + p(n) + "\n\n" + s(n));
	          break;
	        }

	        e.push(r);
	      }
	    }
	  };
	}();

	"undefined" != typeof window && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.8.2", l$3, {
	  Fragment: d$2,
	  Component: _$2
	});

	function forwardElementRef(component) {
	  return x$1(component);
	}
	function usePseudoActive(_ref) {
	  let {
	    "data-pseudo-active": active,
	    ...props
	  } = _ref;
	  return useMergedProps()({
	    className: clsx((active == true || active == "true") && "active")
	  }, props);
	}
	const SpinnerDelayContext = D$1(1000);
	function useSpinnerDelay(pending, timeout) {
	  var _ref3;

	  const [showSpinner, setShowSpinner] = useState(false);
	  _$1(() => {
	    if (!pending) {
	      setShowSpinner(false);
	    }
	  }, [pending]);
	  const defaultDelay = q$1(SpinnerDelayContext);
	  useTimeout({
	    timeout: (_ref3 = timeout !== null && timeout !== void 0 ? timeout : defaultDelay) !== null && _ref3 !== void 0 ? _ref3 : 1000,
	    callback: () => {
	      setShowSpinner(pending);
	    },
	    triggerIndex: pending
	  });
	  return showSpinner;
	}
	const DebugUtilContext = D$1(null);
	function useLogRender(type) {
	  var _useContext;

	  if ((_useContext = q$1(DebugUtilContext)) !== null && _useContext !== void 0 && _useContext.logRender.has(type)) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    console.log(...args);
	  }
	}

	const UseAriaAccordionSectionContext = D$1(null);
	const Accordion = g$1(forwardElementRef(function Accordion(_ref, ref) {
	  let {
	    expandedIndex,
	    setExpandedIndex,
	    children,
	    ...props
	  } = _ref;
	  useLogRender("Accordion", `Rendering Accordion`);
	  const {
	    useAriaAccordionSection
	  } = useAriaAccordion({
	    expandedIndex,
	    setExpandedIndex
	  });
	  return e$3("div", { ...useMergedProps()({
	      ref,
	      className: "accordion"
	    }, props),
	    children: e$3(UseAriaAccordionSectionContext.Provider, {
	      value: useAriaAccordionSection,
	      children: children
	    })
	  });
	}));
	const AccordionSection = g$1(forwardElementRef(function AccordionSection(_ref2, ref) {
	  var _Transition, _headerLevel;

	  let {
	    index,
	    open,
	    header,
	    headerLevel,
	    children,
	    Transition,
	    ...props
	  } = _ref2;
	  useLogRender("AccordionSection", `Rendering AccordionSection #${index}`);
	  const useAriaAccordionSection = q$1(UseAriaAccordionSectionContext);
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
	    children: e$3("button", { ...headerButtonProps,
	      children: header
	    })
	  };
	  const headerJsx = headerLevel >= 1 && headerLevel <= 6 ? v$2(`h${headerLevel}`, headerProps) : v$2("div", useMergedProps()(headerProps, {
	    role: "heading",
	    "aria-level": `${headerLevel}`
	  }));
	  return e$3("div", { ...{
	      ref,
	      class: "accordion-item"
	    },
	    children: [headerJsx, e$3(Transition, {
	      show: expanded,
	      ...useAriaAccordionSectionBodyProps(useMergedProps()(props, {
	        class: ""
	      })),
	      children: e$3("div", {
	        children: e$3("div", {
	          class: clsx("accordion-body", expanded && "elevation-depressed-2", "elevation-body-surface"),
	          children: children
	        })
	      })
	    })]
	  });
	}));

	// presumably because the number of elements changes. 
	// (and in really weird ways -- changing the animation speed in the console fixes it until you put it back at 100% speed???).
	// Assuming that's the case, it's easier to just take care of the element count on page load.

	let gimmickCount = 8;

	(() => {
	  var _getFromLocalStorage;

	  let lastSet = (_getFromLocalStorage = getFromLocalStorage()("circular-progress-gimmick-last-set", str => new Date(str))) !== null && _getFromLocalStorage !== void 0 ? _getFromLocalStorage : new Date(1970, 0, 1);
	  const daysSinceLastGimmickSet = Math.floor((+new Date() - +lastSet) / 1000 / 60 / 60 / (24 - 5));

	  if (daysSinceLastGimmickSet > 0) {
	    let newCount = 4 + Math.round(Math.random() * 2 + Math.random() * 2);
	    gimmickCount = newCount;
	    storeToLocalStorage()("circular-progress-gimmick-last-set", new Date(), d => d.toISOString());
	    storeToLocalStorage()("circular-progress-gimmick-count", gimmickCount, JSON.stringify);
	  } else {
	    var _getFromLocalStorage2;

	    gimmickCount = (_getFromLocalStorage2 = getFromLocalStorage()("circular-progress-gimmick-count", JSON.parse)) !== null && _getFromLocalStorage2 !== void 0 ? _getFromLocalStorage2 : 8;
	  }
	})(); // TODO: useChildManager


	function useAriaProgressBar(_ref) {
	  let {
	    tag,
	    max,
	    value,
	    valueText
	  } = _ref;
	  //const { inputId, labelId, useGenericLabelInput, useGenericLabelLabel, useReferencedInputIdProps, useReferencedLabelIdProps } = useGenericLabel({ inputPrefix: "progressbar-", labelPrefix: "progressbar-reference-" });
	  const {
	    id: progressBarId,
	    getId,
	    useRandomIdProps,
	    useReferencedIdProps
	  } = useRandomId({
	    prefix: "progressbar-"
	  });

	  function useProgressProps(_ref2) {
	    let {
	      "aria-valuemax": ariaValueMax,
	      "aria-valuenow": ariaValueNow,
	      "aria-valuetext": ariaValueText,
	      role,
	      ...p
	    } = _ref2;
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

	  const useReferencedElement = T$2(function useReferencedElement() {
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
	const ProgressAsChildContext = D$1(undefined);
	const ProgressMaxContext = D$1(undefined);
	const ProgressValueContext = D$1(undefined);
	const ProgressValueTextContext = D$1(undefined);
	/**
	 * A progress bar can either take its value & max arguments directly,
	 * or have them provided by a parent via varions Context objects.
	 *
	 * Props will be prioritized over context if both are given.
	 * @param param0
	 * @returns
	 */

	g$1(forwardElementRef(function ProgressLinear(_ref3, ref) {
	  let {
	    colorVariant,
	    max: maxProp,
	    value: valueProp,
	    valueText: valueTextProp,
	    striped,
	    variant,
	    ...rest
	  } = _ref3;
	  let value = q$1(ProgressValueContext);
	  let max = q$1(ProgressMaxContext);
	  let valueText = q$1(ProgressValueTextContext);
	  if (value === undefined) value = valueProp;
	  if (max === undefined) max = maxProp;
	  if (valueText === undefined) valueText = valueTextProp;
	  const provideParentWithHook = q$1(ProgressAsChildContext);
	  const {
	    useProgressProps,
	    useReferencedElement
	  } = useAriaProgressBar({
	    value,
	    valueText,
	    max,
	    tag: "progress"
	  });
	  h$1(() => {
	    provideParentWithHook === null || provideParentWithHook === void 0 ? void 0 : provideParentWithHook(useReferencedElement);
	  }, [useReferencedElement, provideParentWithHook]);
	  return e$3("div", { ...useMergedProps()({
	      ref,
	      className: clsx("progress", `bg-${colorVariant !== null && colorVariant !== void 0 ? colorVariant : "primary"}`)
	    }, rest),
	    children: e$3("progress", { ...useProgressProps({
	        className: "progress-bar"
	      })
	    })
	  });
	})); // :)

	new Date().getDate() % 2;

	function Check() {
	  return e$3("i", {
	    class: "bi bi-check"
	  });
	}

	function Cross() {
	  return e$3("i", {
	    class: "bi bi-x"
	  });
	}

	const ProgressCircular = forwardElementRef(function (_ref4, ref) {
	  var _loadingLabel, _childrenPosition, _children, _children2, _children$type, _children3;

	  let {
	    loadingLabel,
	    spinnerTimeout,
	    mode,
	    colorFill,
	    childrenPosition,
	    children,
	    colorVariant,
	    ...p
	  } = _ref4;
	  (_loadingLabel = loadingLabel) !== null && _loadingLabel !== void 0 ? _loadingLabel : loadingLabel = "Operation pending";
	  const {
	    useProgressProps,
	    useReferencedElement
	  } = useAriaProgressBar({
	    value: null,
	    valueText: loadingLabel,
	    max: 1,
	    tag: "span"
	  }); //useLayoutEffect(() => { provideParentWithHook?.(useReferencedElement) }, [useReferencedElement, provideParentWithHook])

	  const [delay, setDelay] = useState(`-${Math.random() * 30}s`);
	  const {
	    useReferencedProps
	  } = useReferencedElement();
	  const showSpinner = useSpinnerDelay(mode === "pending", spinnerTimeout); //const [spinnerShowCount, setSpinnerShowCount] = useState(0);
	  //useEffect(() => { setSpinnerShowCount(s => ++s) }, [showSpinner]);

	  _$1(() => {
	    setShownStatusLongEnough(false);
	  }, [mode]);
	  const [shownStatusLongEnough, setShownStatusLongEnough] = useState(false);
	  useTimeout({
	    callback: () => {
	      if (mode == "failed" || mode == "succeeded") setShownStatusLongEnough(true);
	    },
	    timeout: 1000,
	    triggerIndex: mode
	  }); // This is used to ensure that the "success" icon
	  // is only shown immediately after a failure has occurred.

	  const [previousSettledMode, setPreviousSettledMode, getPreviousSettledMode] = useState("pending");
	  const [succeededAfterFailure, setSucceededAfterFailure, getSucceededAfterFailure] = useState(false);
	  _$1(() => {
	    if (getSucceededAfterFailure()) setSucceededAfterFailure(false);

	    if (mode == "succeeded") {
	      if (getPreviousSettledMode() == "failed") {
	        setSucceededAfterFailure(true);
	      }

	      setPreviousSettledMode(mode);
	    } else if (mode == "failed") {
	      setPreviousSettledMode("failed");
	    }
	  }, [mode]);
	  (_childrenPosition = childrenPosition) !== null && _childrenPosition !== void 0 ? _childrenPosition : childrenPosition = "after";
	  if (children && (typeof children != "object" || !("type" in children))) children = e$3("span", {
	    children: children
	  });
	  let progressProps = useMergedProps()({
	    ref,
	    className: clsx("circular-progress-container")
	  }, useProgressProps(useMergedProps()({
	    "aria-hidden": `${mode != "pending"}`
	  }, p)));
	  progressProps = useMergedProps()(progressProps, childrenPosition === "merged" ? { ...((_children = children) === null || _children === void 0 ? void 0 : _children.props),
	    ref: (_children2 = children) === null || _children2 === void 0 ? void 0 : _children2.ref
	  } : {});
	  let progressVnodeType = childrenPosition === "merged" ? (_children$type = (_children3 = children) === null || _children3 === void 0 ? void 0 : _children3.type) !== null && _children$type !== void 0 ? _children$type : "span" : "span";
	  const progressElement = v$2(progressVnodeType, progressProps, e$3(d$2, {
	    children: [mode === "pending" && !!loadingLabel && e$3("span", {
	      role: "alert",
	      "aria-live": "assertive",
	      class: "visually-hidden",
	      children: loadingLabel
	    }), mode !== null && e$3(Swappable, {
	      inline: true,
	      children: e$3("span", {
	        className: "circular-progress-swappable",
	        children: [e$3(Fade, {
	          show: mode === "pending" && showSpinner,
	          exitVisibility: "removed",
	          children: e$3("span", {
	            style: {
	              "--count": gimmickCount,
	              "--delay": delay
	            },
	            className: clsx("circular-progress", colorVariant ? `circular-progress-${colorVariant}` : undefined, colorFill == "foreground" && "inverse-fill", colorFill === "foreground-only" && "no-fill"),
	            children: Array.from(function* () {
	              for (let i = 0; i < gimmickCount; ++i) yield e$3("span", {
	                class: clsx("circular-progress-ball-origin", `circular-progress-ball-origin-${i}`),
	                children: e$3("span", {
	                  class: "circular-progress-ball"
	                })
	              });
	            }())
	          })
	        }), e$3(Fade, {
	          show: !shownStatusLongEnough && mode === "succeeded" && succeededAfterFailure,
	          children: e$3("span", {
	            class: "circular-progress-succeeded",
	            children: e$3(Check, {})
	          })
	        }), e$3(Fade, {
	          show: !shownStatusLongEnough && mode === "failed",
	          children: e$3("span", {
	            class: "circular-progress-failed",
	            children: e$3(Cross, {})
	          })
	        })]
	      })
	    })]
	  }));
	  return e$3(d$2, {
	    children: [childrenPosition == "before" && progressElement, children && v$2(children.type, useMergedProps()({
	      children: childrenPosition === "child" ? progressElement : undefined,
	      ref: children.ref
	    }, useReferencedProps(children.props))), childrenPosition == "after" && progressElement]
	  });
	});

	const UseButtonGroupChild = D$1(null);
	const DefaultFillStyleContext = D$1("fill");
	const DefaultColorStyleContext = D$1("primary");
	const DefaultDropdownDirectionContext = D$1(null);
	const DefaultSizeContext = D$1("md");
	const DefaultDisabledContext = D$1(false);
	const ProvideDefaultButtonFill = g$1(function ProvideDefaultButtonFill(_ref) {
	  let {
	    value,
	    children
	  } = _ref;
	  return e$3(DefaultFillStyleContext.Provider, {
	    value: value,
	    children: children
	  });
	});
	const ProvideDefaultButtonColor = g$1(function ProvideDefaultButtonColor(_ref2) {
	  let {
	    value,
	    children
	  } = _ref2;
	  return e$3(DefaultColorStyleContext.Provider, {
	    value: value,
	    children: children
	  });
	});
	const ProvideDefaultButtonSize = g$1(function ProvideDefaultButtonSize(_ref3) {
	  let {
	    value,
	    children
	  } = _ref3;
	  return e$3(DefaultSizeContext.Provider, {
	    value: value,
	    children: children
	  });
	});
	const ProvideDefaultButtonDisabled = g$1(function ProvideDefaultButtonDisabled(_ref4) {
	  let {
	    value,
	    children
	  } = _ref4;
	  return e$3(DefaultDisabledContext.Provider, {
	    value: value,
	    children: children
	  });
	});
	const ProvideDefaultButtonDropdownDirection = g$1(function ProvideDefaultButtonDropdownDirection(_ref5) {
	  let {
	    value,
	    children
	  } = _ref5;
	  return e$3(DefaultDropdownDirectionContext.Provider, {
	    value: value,
	    children: children
	  });
	});
	function useButtonFillVariant(providedValue) {
	  const defaultFill = q$1(DefaultFillStyleContext);
	  return providedValue !== null && providedValue !== void 0 ? providedValue : defaultFill;
	}
	function useButtonColorVariant(providedValue) {
	  const defaultColor = q$1(DefaultColorStyleContext);
	  return providedValue !== null && providedValue !== void 0 ? providedValue : defaultColor;
	}
	function useButtonSize(providedValue) {
	  const defaultSize = q$1(DefaultSizeContext);
	  return providedValue !== null && providedValue !== void 0 ? providedValue : defaultSize;
	}
	function useButtonDisabled(providedValue) {
	  const defaultDisabled = q$1(DefaultDisabledContext);
	  return providedValue !== null && providedValue !== void 0 ? providedValue : defaultDisabled;
	}
	function useButtonDropdownDirection(providedValue) {
	  const defaultDirection = q$1(DefaultDropdownDirectionContext);
	  return providedValue !== null && providedValue !== void 0 ? providedValue : defaultDirection;
	}
	function useButtonStyles(p, tag) {
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

	  const useButtonStylesProps = _ref6 => {
	    let {
	      children,
	      ...props
	    } = _ref6;
	    return useMergedProps()({
	      type: tag === "button" ? "button" : undefined,
	      "aria-disabled": disabled ? "true" : undefined,
	      className: clsx(disabled && "disabled", "btn", `btn-${fillVariant == "outline" ? `outline-` : ``}${colorVariant}`, `btn-${size}`, disabled && "disabled"),
	      children: e$3("span", {
	        class: "btn-text-contents",
	        children: children
	      })
	    }, props);
	  };

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

	  if (((_p$tag = p.tag) === null || _p$tag === void 0 ? void 0 : _p$tag.toLowerCase()) === "a" || !!p.href) return e$3(AnchorButton, {
	    ref: ref,
	    ...p
	  });else if (p.pressed != null) return e$3(ToggleButton, {
	    ref: ref,
	    ...p
	  });else return e$3(ButtonButton, {
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
	  }, "a");
	  disabled = buttonStyleInfo.disabled;
	  colorVariant = buttonStyleInfo.colorVariant;
	  size = buttonStyleInfo.size;
	  fillVariant = buttonStyleInfo.fillVariant;
	  const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
	  return e$3("a", { ...usePseudoActive(useButtonStylesProps({ ...props,
	      ref
	    }))
	  });
	});
	const ButtonButton = forwardElementRef(function ButtonButton(p, ref) {
	  let {
	    dropdownVariant,
	    dropdownDirection,
	    colorVariant,
	    size,
	    fillVariant,
	    disabled,
	    debounce,
	    spinnerTimeout,
	    onPress: onPressAsync,
	    children,
	    ...props
	  } = p;
	  dropdownDirection = useButtonDropdownDirection(dropdownDirection);

	  if (dropdownDirection) {
	    var _dropdownVariant;

	    if (children) (_dropdownVariant = dropdownVariant) !== null && _dropdownVariant !== void 0 ? _dropdownVariant : dropdownVariant = "combined";else dropdownVariant = "separate";
	  }

	  const {
	    syncHandler,
	    pending,
	    settleCount,
	    hasError
	  } = useAsyncHandler(onPressAsync !== null && onPressAsync !== void 0 ? onPressAsync : null, {
	    debounce,
	    capture: T$2(() => {
	      return undefined;
	    }, [])
	  });
	  disabled || (disabled = pending);
	  const onPress = pending ? undefined : syncHandler;
	  const {
	    useAriaButtonProps
	  } = useAriaButton({
	    tag: "button",
	    onPress
	  });
	  const buttonStyleInfo = useButtonStyles({
	    colorVariant,
	    size,
	    fillVariant,
	    disabled
	  }, "button");
	  disabled = buttonStyleInfo.disabled;
	  colorVariant = buttonStyleInfo.colorVariant;
	  size = buttonStyleInfo.size;
	  fillVariant = buttonStyleInfo.fillVariant;
	  const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps; // Bootstrap why are you like this?

	  if (dropdownVariant == "combined") children = e$3(d$2, {
	    children: [" ", children, " "]
	  });
	  return e$3(ProgressCircular, {
	    spinnerTimeout: spinnerTimeout,
	    mode: hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null,
	    childrenPosition: "child",
	    colorFill: fillVariant == "fill" ? "foreground" : "background",
	    children: e$3("button", { ...usePseudoActive(useButtonStylesProps(useMergedProps()({
	        type: "button",
	        className: clsx(pending && "pending active", disabled && "disabled", dropdownVariant && `dropdown-toggle`, dropdownDirection == "inline-start" && "dropstart", dropdownDirection == "inline-end" && "dropend", dropdownDirection == "block-start" && "dropup", // TODO, don't really want to add logical direction testing for *every* button :/
	        dropdownDirection == "block-end" && "dropdown", dropdownVariant === "separate" && `dropdown-toggle-split`)
	      }, useAriaButtonProps({ ...props,
	        children,
	        onPress,
	        ref
	      }))))
	    })
	  });
	});
	const ToggleButton = forwardElementRef(function ToggleButton(p, ref) {
	  let {
	    colorVariant,
	    size,
	    disabled,
	    pressed,
	    debounce,
	    onPressToggle: onPressAsync,
	    showAsyncSuccess,
	    ...props
	  } = p;
	  !!q$1(UseButtonGroupChild);
	  const getPressed = useStableGetter(pressed);
	  const {
	    syncHandler,
	    pending,
	    hasError,
	    settleCount,
	    hasCapture,
	    currentCapture
	  } = useAsyncHandler(onPressAsync !== null && onPressAsync !== void 0 ? onPressAsync : null, {
	    debounce,
	    capture: T$2(() => {
	      return !getPressed();
	    }, [])
	  });
	  if (hasCapture && pending) pressed = !!currentCapture;
	  disabled || (disabled = pending);
	  const fillVariant = pressed ? "fill" : "outline";
	  const onPress = pending ? undefined : syncHandler;
	  const {
	    useAriaButtonProps
	  } = useAriaButton({
	    tag: "button",
	    pressed,
	    onPress
	  });
	  const buttonStyleInfo = useButtonStyles({
	    colorVariant,
	    size,
	    fillVariant,
	    disabled
	  }, "button");
	  disabled = buttonStyleInfo.disabled;
	  colorVariant = buttonStyleInfo.colorVariant;
	  size = buttonStyleInfo.size;
	  const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
	  return e$3(ProgressCircular, {
	    mode: hasError ? "failed" : pending ? "pending" : settleCount && showAsyncSuccess ? "succeeded" : null,
	    childrenPosition: "child",
	    colorFill: fillVariant == "fill" ? "foreground" : "background",
	    children: e$3("button", { ...usePseudoActive(useAriaButtonProps(useButtonStylesProps({ ...useMergedProps()({
	          className: clsx("toggle-button", disabled && "disabled", pressed && "active", pending && "pending"),
	          ref
	        }, props)
	      })))
	    })
	  });
	});
	const Button = forwardElementRef(ButtonR);

	const ButtonGroup = g$1(forwardElementRef(function ButtonGroup(p, ref) {
	  var _logicalOrientation;

	  useLogRender("ButtonGroup", `Rendering ButtonGroup`); // Styling props

	  let {
	    colorVariant,
	    fillVariant,
	    size,
	    disabled,
	    selectedIndex,
	    wrap,
	    orientation: logicalOrientation,
	    children,
	    ...p3
	  } = p;
	  (_logicalOrientation = logicalOrientation) !== null && _logicalOrientation !== void 0 ? _logicalOrientation : logicalOrientation = "inline";
	  const {
	    useHasFocusProps,
	    getFocusedInner
	  } = useHasFocus({});
	  const {
	    indicesByElement,
	    managedChildren,
	    useListNavigationProps,
	    useListNavigationChild,
	    navigateToIndex,
	    childCount
	  } = useListNavigation({
	    shouldFocusOnChange: getFocusedInner,
	    keyNavigation: logicalOrientation
	  });
	  const [physicalOrientation, setPhysicalOrientation] = useState("horizontal");
	  const {
	    getLogicalDirectionInfo,
	    convertToPhysicalOrientation,
	    useLogicalDirectionProps
	  } = useLogicalDirection({
	    onLogicalDirectionChange: T$2(logicalDirectionInfo => setPhysicalOrientation(convertToPhysicalOrientation(logicalOrientation, logicalDirectionInfo)), [])
	  });
	  _$1(() => {
	    if (selectedIndex != null) navigateToIndex(selectedIndex);
	  }, [selectedIndex]); // Build new DOM props to merge based off the styling props

	  colorVariant = useButtonColorVariant(colorVariant);
	  size = useButtonSize(size);
	  fillVariant = useButtonFillVariant(fillVariant);
	  disabled = useButtonDisabled(disabled);
	  const outerDomProps = useListNavigationProps(useLogicalDirectionProps(useHasFocusProps(useMergedProps()({
	    ref,
	    class: "btn-group-aria-gridrow"
	  }, p3))));
	  const innerDomProps = {
	    role: "toolbar",
	    disabled,
	    className: clsx("btn-group", wrap && "wrap", physicalOrientation == "vertical" && "btn-group-vertical")
	  }; // Remaining props, forwarded onto the DOM
	  //const domProps =newDomProps, p3));

	  outerDomProps["data-child-count"] = `${childCount}`;
	  return e$3(UseButtonGroupChild.Provider, {
	    value: useListNavigationChild,
	    children: e$3(ProvideDefaultButtonColor, {
	      value: colorVariant,
	      children: e$3(ProvideDefaultButtonFill, {
	        value: fillVariant,
	        children: e$3(ProvideDefaultButtonSize, {
	          value: size,
	          children: e$3(ProvideDefaultButtonDisabled, {
	            value: disabled,
	            children: e$3("div", { ...outerDomProps,
	              children: e$3("div", { ...innerDomProps,
	                children: children
	              })
	            })
	          })
	        })
	      })
	    })
	  });
	}));
	const ButtonGroupChild = g$1(forwardElementRef(function ButtonGroupChild1(_ref, ref) {
	  let {
	    index,
	    tabIndex,
	    ...buttonProps
	  } = _ref;
	  useLogRender("ButtonGroupChild", `Rendering ButtonGroupChild #${index}`); // This is more-or-less forced to be a separate component because of the index prop.
	  // It would be really nice to find a way to make that implicit based on DOM location,
	  // specifically for small things like button groups...

	  const useButtonGroupChild = q$1(UseButtonGroupChild);
	  const {
	    tabbable,
	    useListNavigationChildProps,
	    useListNavigationSiblingProps
	  } = useButtonGroupChild({
	    index,
	    text: null
	  });
	  const p = useListNavigationChildProps(useMergedProps()({
	    ref
	  }, { ...buttonProps
	  }));
	  if (tabIndex != null) p.tabIndex = p;
	  return e$3(Button, { ...p
	  });
	}));

	e$3(Button, {
	  pressed: true,
	  onPress: p => console.log(p)
	});

	const baseId = generateRandomId("render-portal-container-");
	const BodyPortalClassContext = D$1("");
	const BodyPortalRootContext = D$1(() => document.getElementById(baseId));
	g$1(function SetBodyPortalClass(_ref) {
	  let {
	    className,
	    children
	  } = _ref;
	  return e$3(BodyPortalClassContext.Provider, {
	    value: className,
	    children: children
	  });
	});

	function useBodyPortalRoot() {
	  const valueFromContext = q$1(BodyPortalRootContext);
	  let container = null; // Prefer using a container provided via context, if one's available.

	  if (valueFromContext) container = valueFromContext(); // If not, try to use the default body portal

	  if (!container) container = document.getElementById(baseId); // If we haven't created the default body portal yet, do so.

	  if (!container) {
	    container = document.createElement("div");
	    container.id = baseId;
	    container.className = "body-portal-container";
	    document.body.appendChild(container);
	  }

	  return container;
	}

	function BodyPortalRoot(_ref2) {
	  let {
	    children
	  } = _ref2;
	  const [element, setElement, getElement] = useState(null);
	  const {
	    useRefElementProps
	  } = useRefElement({
	    onElementChange: setElement
	  });
	  return e$3(BodyPortalRootContext.Provider, {
	    value: T$2(() => {
	      var _getElement$parentEle, _getElement;

	      return (_getElement$parentEle = (_getElement = getElement()) === null || _getElement === void 0 ? void 0 : _getElement.parentElement) !== null && _getElement$parentEle !== void 0 ? _getElement$parentEle : null;
	    }, []),
	    children: [children, e$3("div", { ...useRefElementProps({
	        hidden: true
	      })
	    })]
	  });
	}
	function BodyPortal(_ref3) {
	  let {
	    children
	  } = _ref3;
	  const id = s$2(null);
	  const [portalElement, setPortalElement] = useState(null);
	  const bodyPortalClass = q$1(BodyPortalClassContext);
	  const container = useBodyPortalRoot();
	  _$1(() => {
	    if (id.current == null) {
	      id.current = generateRandomId();
	    }

	    let element = document.getElementById(id.current);

	    if (!element) {
	      element = document.createElement("div");
	      element.className = `body-portal ${bodyPortalClass}`;
	      element.id = id.current;
	      container.appendChild(element);
	    }

	    setPortalElement(element);
	    return () => {
	      var _element;

	      return document.contains(element) ? (_element = element) === null || _element === void 0 ? void 0 : _element.remove() : undefined;
	    };
	  }, [container, bodyPortalClass]);
	  if (portalElement) return W(children, portalElement);else return null;
	}

	const DialogControlled = g$1(forwardElementRef(function DialogControlled(_ref, ref) {
	  var _onClose, _align;

	  let {
	    maxWidth,
	    fullscreen,
	    align,
	    onClose,
	    open,
	    descriptive,
	    title,
	    footer,
	    Transition,
	    children,
	    ...rest
	  } = _ref;
	  onClose = (_onClose = onClose) !== null && _onClose !== void 0 ? _onClose : () => {};
	  const {
	    useDialogBackdrop,
	    useDialogBody,
	    useDialogProps,
	    useDialogTitle
	  } = useAriaDialog({
	    open: open !== null && open !== void 0 ? open : false,
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

	  if (!Transition) {
	    Transition = Clip;
	    rest.clipOriginBlock = 0;
	  }

	  (_align = align) !== null && _align !== void 0 ? _align : align = "center";
	  return e$3(BodyPortal, {
	    children: e$3(CloseDialogContext.Provider, {
	      value: useStableCallback(() => {
	        var _onClose2;

	        return (_onClose2 = onClose) === null || _onClose2 === void 0 ? void 0 : _onClose2(undefined);
	      }),
	      children: e$3("div", {
	        class: "modal-portal-container",
	        children: e$3("div", { ...useDialogProps({
	            class: clsx("modal"),
	            style: {
	              display: "block"
	            }
	          }),
	          children: [e$3(Transition, { ...{
	              ref,
	              show: open,
	              ...rest
	            },
	            children: e$3("div", { ...{
	                class: clsx("modal-dialog modal-dialog-scrollable", align == "center" ? "modal-dialog-centered" : "", maxWidth && `modal-${maxWidth}`, fullscreen === true ? "modal-fullscreen" : fullscreen ? `modal-fullscreen-${fullscreen}` : "")
	              },
	              children: e$3(BodyPortalRoot, {
	                children: e$3(Fade, {
	                  show: open,
	                  children: e$3("div", {
	                    class: clsx("modal-content elevation-body-surface elevation-raised-6", align == "fill" ? "modal-content-fill" : ""),
	                    children: [title != null && e$3("div", { ...useDialogTitleProps({
	                        class: "modal-header"
	                      }),
	                      children: e$3("h1", {
	                        class: "modal-title",
	                        children: title
	                      })
	                    }), e$3("div", { ...useDialogBodyProps({
	                        class: "modal-body"
	                      }),
	                      children: children
	                    }), footer != null && e$3("div", {
	                      class: "modal-footer",
	                      children: footer
	                    })]
	                  })
	                })
	              })
	            })
	          }), e$3("div", { ...useDialogBackdropProps({
	              class: clsx("modal-backdrop backdrop-filter-transition", open ? "transition-enter-finalize" : "transition-exit-finalize")
	            })
	          })]
	        })
	      })
	    })
	  });
	}));
	const DialogUncontrolled = g$1(forwardElementRef(function DialogUncontrolled(_ref2, ref) {
	  let {
	    provideShow,
	    modal,
	    ...props
	  } = _ref2;
	  const [state, setState, getState] = useState(null);
	  const show = T$2(async () => {
	    const state = getState();

	    if (!state) {
	      let resolve;
	      let reject;
	      let promise = new Promise((res, rej) => {
	        resolve = res;
	        reject = rej;
	      }).finally(() => {
	        setState(prev => null);
	      });
	      setState({
	        promise,
	        resolve,
	        reject
	      });
	      return promise;
	    } else {
	      return Promise.reject("This dialog is already being shown");
	    }
	  }, []);
	  const onClose = T$2(reason => {
	    var _getState2;

	    if (reason) {
	      if (!modal) {
	        var _getState;

	        (_getState = getState()) === null || _getState === void 0 ? void 0 : _getState.resolve(); //getState()?.reject(reason);

	        return;
	      }
	    }

	    (_getState2 = getState()) === null || _getState2 === void 0 ? void 0 : _getState2.resolve();
	  }, [modal]);
	  _$1(() => provideShow === null || provideShow === void 0 ? void 0 : provideShow(prev => show), [provideShow, show]);
	  return e$3(DialogControlled, { ...props,
	    open: !!state,
	    onClose: onClose
	  });
	}));
	const Dialog = g$1(forwardElementRef(function Dialog(props, ref) {
	  if (props.provideShow) return e$3(DialogUncontrolled, { ...props,
	    ref: ref
	  });
	  if (props.onClose) return e$3(DialogControlled, { ...props,
	    ref: ref
	  });else return e$3(DialogUncontrolled, { ...props,
	    ref: ref
	  });
	}));
	const PushDialogContext = D$1(null);
	const CloseDialogContext = D$1(null);
	const UpdateDialogContext = D$1(null);
	const DefaultDialogTimeout = D$1(5000);
	function DialogsProvider(_ref3) {
	  let {
	    children,
	    defaultTimeout
	  } = _ref3;
	  const [pushDialog, setPushDialog] = useState(null);
	  const [updateDialog, setUpdateDialog] = useState(null);
	  const pushDialogStable = useStableCallback(dialog => {
	    var _pushDialog;

	    return (_pushDialog = pushDialog === null || pushDialog === void 0 ? void 0 : pushDialog(dialog)) !== null && _pushDialog !== void 0 ? _pushDialog : Promise.reject();
	  });
	  const updateDialogStable = useStableCallback((index, dialog) => {
	    return updateDialog === null || updateDialog === void 0 ? void 0 : updateDialog(index, dialog);
	  });
	  return e$3(d$2, {
	    children: e$3(DefaultDialogTimeout.Provider, {
	      value: defaultTimeout !== null && defaultTimeout !== void 0 ? defaultTimeout : 5000,
	      children: [e$3(DialogsProviderHelper, {
	        setPushDialog: setPushDialog,
	        setUpdateDialog: setUpdateDialog
	      }), pushDialog && updateDialog && e$3(PushDialogContext.Provider, {
	        value: pushDialogStable,
	        children: e$3(UpdateDialogContext.Provider, {
	          value: updateDialogStable,
	          children: children
	        })
	      })]
	    })
	  });
	}
	/**
	 * Returns a function that immediately displays the given JSX Dialog element and returns a promise when it closes.
	 *
	 * In general it's assumed that you're using an uncontrolled dialog, so you do not need to supply `open` or `onClose` props.
	 */

	function usePushDialog() {
	  const pushDialog = q$1(PushDialogContext);
	  return pushDialog;
	}
	/**
	 * Returns a function that can be used to close whatever dialog the component that uses the hook is in. *Primarily for use in uncontrolled dialogs*, but can be used anywhere.
	 *
	 * The function is stable across all renders (but cannot be called *during* render).
	 */

	function useCloseDialog() {
	  const closeDialog = q$1(CloseDialogContext);
	  return closeDialog;
	}
	/**
	 * A specialized button that closes the dialog it's contained in when clicked. In all other regards, a normal button that does normal button things.
	 *
	 * This is most useful for uncontrolled dialogs, but can be used anywhere.
	 */

	g$1(forwardElementRef(function CloseDialogButton(props, ref) {
	  return e$3(Button, { ...useMergedProps()(props, {
	      ref,
	      onPress: useCloseDialog()
	    })
	  });
	})); // Extracted to a separate component to avoid rerendering all non-dialog children

	function DialogsProviderHelper(_ref4) {
	  let {
	    setPushDialog,
	    setUpdateDialog
	  } = _ref4;
	  const [children, setChildren, getChildren] = useState(new Map());
	  const pushDialog = T$2(dialog => {
	    const randomKey = generateRandomId();
	    let resolve;
	    let reject;
	    const promise = new Promise((res, rej) => {
	      resolve = res;
	      reject = rej;
	    });
	    let show;

	    const provideShow = s => {
	      show = s(show);
	      show().then(resolve).catch(reject);
	    };

	    const clonedDialogProps = {
	      provideShow
	    };
	    setChildren(prev => {
	      let ret = new Map(prev);
	      const clonedDialog = B(dialog, { ...clonedDialogProps,
	        key: randomKey
	      });
	      ret.set(promise, {
	        key: randomKey,
	        promise,
	        resolve,
	        reject,
	        children: clonedDialog
	      });
	      return ret;
	    });
	    return promise;
	  }, []);
	  const updateDialog = T$2((index, dialog) => {
	    const info = getChildren().get(index);
	    console.assert(!!info);

	    if (info) {
	      setChildren(prev => {
	        let newChildren = new Map(prev);
	        newChildren.set(index, { ...info,
	          children: B(dialog, {
	            key: info.key
	          })
	        });
	        return newChildren;
	      });
	      return index;
	    }
	  }, []);
	  h$1(() => {
	    setPushDialog(_ => pushDialog);
	  }, [pushDialog]);
	  h$1(() => {
	    setUpdateDialog(_ => updateDialog);
	  }, [updateDialog]);
	  return e$3(BodyPortal, {
	    children: e$3(DialogsContainerChildrenContext.Provider, {
	      value: children,
	      children: e$3(DialogsContainer, {})
	    })
	  });
	}

	const DialogsContainerChildrenContext = D$1(new Map());

	function DialogsContainer(props) {
	  const children = q$1(DialogsContainerChildrenContext);
	  return e$3("div", { ...useMergedProps()({}, props),
	    children: Array.from(children).map(_ref5 => {
	      let [key, {
	        children
	      }] = _ref5;
	      return children;
	    })
	  });
	}

	const Drawer = g$1(forwardElementRef(function Drawer(_ref, ref) {
	  var _TransitionProps;

	  let {
	    onClose,
	    open,
	    descriptive,
	    title,
	    closeButton,
	    Transition,
	    TransitionProps,
	    children,
	    ...rest
	  } = _ref;
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
	  (_TransitionProps = TransitionProps) !== null && _TransitionProps !== void 0 ? _TransitionProps : TransitionProps = {};

	  if (!Transition) {
	    Transition = Slide;
	    TransitionProps.slideTargetInline = -1;
	  }

	  return e$3(BodyPortal, {
	    children: e$3("div", { ...rest,
	      ref: ref,
	      children: [e$3(Fade, {
	        show: open,
	        children: e$3("div", { ...useDrawerBackdropProps({
	            class: "offcanvas-backdrop backdrop-filter-transition"
	          })
	        })
	      }), e$3(Transition, { ...{
	          show: open,
	          ...TransitionProps
	        },
	        children: e$3("div", { ...useDrawerProps({
	            class: "offcanvas offcanvas-start elevation-raised-5 elevation-body-surface",
	            tabindex: -1
	          }),
	          children: [e$3("div", {
	            class: "offcanvas-header",
	            children: [e$3("h5", { ...useDrawerTitleProps({
	                class: "offcanvas-title"
	              }),
	              children: "Drawer"
	            }), closeButton !== null && closeButton !== void 0 ? closeButton : e$3(Button, {
	              tag: "button",
	              class: "btn-close text-reset",
	              "aria-label": "Close",
	              onPress: () => onClose("escape")
	            })]
	          }), e$3("div", { ...useDrawerBodyProps({
	              class: "offcanvas-body"
	            }),
	            children: children
	          })]
	        })
	      })]
	    })
	  });
	}));

	const UseCheckboxGroupChildContext = D$1(null);
	const InInputGroupContext = D$1(false);
	const InInputGridContext = D$1(0);
	const DefaultInputSize = D$1(null);

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
	  const capture = T$2(event => {
	    let ret;

	    switch (type) {
	      case "text":
	      case "textarea":
	      case "numeric":
	        ret = max$1(min$1(event.currentTarget.value, min2), max2);
	        break;

	      case "number":
	        ret = max$1(min$1(event.currentTarget.valueAsNumber, min2), max2);
	        break;
	    }

	    if (typeof ret === "number" && isNaN(ret)) {
	      ret = null;
	    }

	    return ret;
	  }, [type]);
	  const uncapture = T$2(value => {
	    switch (type) {
	      case "text":
	      case "textarea":
	      case "numeric":
	        return value;

	      case "number":
	        if (value != null) return `${value}`;
	        return "";
	    }
	  }, [type]);
	  return {
	    capture,
	    uncapture
	  };
	}

	const InputGrid = g$1(forwardElementRef(function InputGrid(_ref, ref) {
	  let {
	    tag,
	    children,
	    columns,
	    ...props
	  } = _ref;
	  return v$2(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
	    class: "input-grid",
	    style: columns ? {
	      "--input-grid-columns": columns
	    } : {},
	    ref
	  }, props), e$3(InInputGridContext.Provider, {
	    value: q$1(InInputGridContext) + 1,
	    children: children
	  }));
	}));
	/**
	 * An InputGroup, that puts an Input and its Label together, visually, into one component.
	 *
	 * All Input-type components automatically detect when they're in an InputGroup and render different accordingly.
	 */

	const InputGroup = g$1(forwardElementRef(function InputGroup(_ref2, ref) {
	  let {
	    children,
	    size,
	    colSpan,
	    tag,
	    ...props
	  } = _ref2;
	  return v$2(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
	    class: clsx("input-group", size && size != "md" && `input-group-${size}`, colSpan && `input-grid-span-${colSpan}`),
	    ref
	  }, props), e$3(InInputGroupContext.Provider, {
	    value: true,
	    children: e$3(DefaultInputSize.Provider, {
	      value: size,
	      children: children
	    })
	  }));
	}));
	/**
	 * Not generally needed, since most input components come with labels that do this for you.
	 *
	 * That being said, if you just need a static block of text not hooked up to any input element, this is your component.
	 */

	const InputGroupText = forwardElementRef(function InputGroupText(_ref3, ref) {
	  let {
	    tag,
	    children,
	    disabled,
	    ...props
	  } = _ref3;
	  return v$2(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
	    class: clsx(disabled && "disabled", "input-group-text"),
	    ref
	  }, props), children);
	});

	const FocusModeContext = D$1("keyboard");
	/**
	 * Returns whether it's more likely that the user is currently
	 * navigating with the keyboard or mouse.
	 *
	 * **FOR VISUAL EFFECTS ONLY.** There should be no actual logic
	 * that depends on this very rough heuristic. Tooltips, for example,
	 * use this to determine whether to show on focus (which otherwise
	 * only happens for focusable-but-not-tabbable elements)
	 */

	function useFocusMode() {
	  return q$1(FocusModeContext);
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

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

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
	      scaleX = round(rect.width) / offsetWidth || 1;
	    }

	    if (offsetHeight > 0) {
	      scaleY = round(rect.height) / offsetHeight || 1;
	    }
	  }

	  return {
	    width: rect.width / scaleX,
	    height: rect.height / scaleY,
	    top: rect.top / scaleY,
	    right: rect.right / scaleX,
	    bottom: rect.bottom / scaleY,
	    left: rect.left / scaleX,
	    x: rect.left / scaleX,
	    y: rect.top / scaleY
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

	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }

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

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
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
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
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
	      roundOffsets = _ref2.roundOffsets,
	      isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	      x = _offsets$x === void 0 ? 0 : _offsets$x,
	      _offsets$y = offsets.y,
	      y = _offsets$y === void 0 ? 0 : _offsets$y;

	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref3.x;
	  y = _ref3.y;
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
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref4.x;
	  y = _ref4.y;

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref5) {
	  var state = _ref5.state,
	      options = _ref5.options;
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
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
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
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
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
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var _offsetModifierState$;

	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
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
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _offsetModifierState$2;

	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _len = altAxis === 'y' ? 'height' : 'width';

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
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
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
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

	function returnNull() {
	  return null;
	}

	function usePopperApi(_ref) {
	  var _useArrow;

	  let {
	    updating,
	    align,
	    side,
	    useArrow,
	    followMouse,
	    skidding,
	    distance,
	    paddingTop,
	    paddingBottom,
	    paddingLeft,
	    paddingRight,
	    childSelector
	  } = _ref;
	  const [popperInstance, setPopperInstance, getPopperInstance] = useState(null);
	  const [usedSide, setUsedSide] = useState(side);
	  const [logicalDirection, setLogicalDirection] = useState(null);
	  const {
	    useLogicalDirectionProps,
	    convertToLogicalSide,
	    convertToPhysicalSide
	  } = useLogicalDirection({
	    onLogicalDirectionChange: setLogicalDirection
	  });
	  _$1(() => {
	    resetPopperInstance(getSourceElement(), getPopperElement());
	  }, [side, align, skidding, distance, paddingTop, paddingBottom, paddingLeft, paddingRight, logicalDirection]);
	  (_useArrow = useArrow) !== null && _useArrow !== void 0 ? _useArrow : useArrow = false;
	  const [getFocusedElement, setFocusedElement] = usePassiveState(null, returnNull);
	  useActiveElement({
	    onLastActiveElementChange: T$2(activeElement => {
	      var _getSourceElement;

	      if ((_getSourceElement = getSourceElement()) !== null && _getSourceElement !== void 0 && _getSourceElement.contains(activeElement)) {
	        setFocusedElement(activeElement);
	        setMouseX(null);
	        setMouseY(null);
	      } else {
	        setFocusedElement(null);
	        if (followMouse) setPositionPreference("mouse");
	      }
	    }, [])
	  });
	  const [getPositionPreference, setPositionPreference] = usePassiveState(null, T$2(() => "element", [])); //const [getHasMouseover, setHasMouseover] = usePassiveState(null, () => false);

	  const [getMouseX, setMouseX] = usePassiveState(T$2(() => {
	    var _getPopperInstance;

	    return void ((_getPopperInstance = getPopperInstance()) === null || _getPopperInstance === void 0 ? void 0 : _getPopperInstance.update());
	  }, []), returnNull);
	  const [getMouseY, setMouseY] = usePassiveState(T$2(() => {
	    var _getPopperInstance2;

	    return void ((_getPopperInstance2 = getPopperInstance()) === null || _getPopperInstance2 === void 0 ? void 0 : _getPopperInstance2.update());
	  }, []), returnNull);
	  const resetPopperInstance = T$2((sourceElement, popperElement) => {
	    if (sourceElement && popperElement) {
	      const onFirstUpdate = () => {};

	      const strategy = "absolute";
	      let placement; // = logicalToPlacement(logicalDirection!, inlinePosition, blockPosition, positionBlock);
	      // TODO: There's probably a better way to do this...

	      switch (side) {
	        case "block-start":
	          {
	            placement = `${(logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.blockOrientation) === "vertical" ? logicalDirection.blockDirection === "ttb" ? "top" : "bottom" : (logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.blockDirection) === "ltr" ? "left" : "right"}`;
	            break;
	          }

	        case "block-end":
	          {
	            placement = `${(logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.blockOrientation) === "vertical" ? logicalDirection.blockDirection === "ttb" ? "bottom" : "top" : (logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.blockDirection) === "ltr" ? "right" : "left"}`;
	            break;
	          }

	        case "inline-start":
	          {
	            placement = `${(logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.inlineOrientation) === "horizontal" ? logicalDirection.inlineDirection === "ltr" ? "left" : "right" : (logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.inlineDirection) === "ttb" ? "top" : "bottom"}`;
	            break;
	          }

	        case "inline-end":
	          {
	            placement = `${(logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.inlineOrientation) === "horizontal" ? logicalDirection.inlineDirection === "ltr" ? "right" : "left" : (logicalDirection === null || logicalDirection === void 0 ? void 0 : logicalDirection.inlineDirection) === "ttb" ? "bottom" : "top"}`;
	            break;
	          }
	      }

	      if (align === "center") placement = `${placement}`;else placement = `${placement}-${align}`;
	      const virtualElement = {
	        getBoundingClientRect: () => {
	          var _focusedElement$getBo, _sourceElement, _baseRect$x, _baseRect$y, _baseRect$width, _baseRect$height;

	          const focusedElement = getFocusedElement();
	          let sourceElement = getSourceElement();
	          if (childSelector && sourceElement) sourceElement = childSelector(sourceElement);
	          let baseRect = focusedElement ? (_focusedElement$getBo = focusedElement.getBoundingClientRect) === null || _focusedElement$getBo === void 0 ? void 0 : _focusedElement$getBo.call(focusedElement) : (_sourceElement = sourceElement) === null || _sourceElement === void 0 ? void 0 : _sourceElement.getBoundingClientRect();
	          let x = (_baseRect$x = baseRect === null || baseRect === void 0 ? void 0 : baseRect.x) !== null && _baseRect$x !== void 0 ? _baseRect$x : 0;
	          let y = (_baseRect$y = baseRect === null || baseRect === void 0 ? void 0 : baseRect.y) !== null && _baseRect$y !== void 0 ? _baseRect$y : 0;
	          let width = (_baseRect$width = baseRect === null || baseRect === void 0 ? void 0 : baseRect.width) !== null && _baseRect$width !== void 0 ? _baseRect$width : 0;
	          let height = (_baseRect$height = baseRect === null || baseRect === void 0 ? void 0 : baseRect.height) !== null && _baseRect$height !== void 0 ? _baseRect$height : 0;
	          let mouseX = getMouseX();
	          let mouseY = getMouseY();

	          if (followMouse && getPositionPreference() == "mouse") {
	            var _baseRect$x2, _baseRect$y2, _baseRect$x3, _baseRect$width2, _baseRect$y3, _baseRect$height2;

	            if (mouseX == null || mouseY == null) {
	              switch (align) {
	                case "start":
	                  mouseX = x;
	                  mouseY = y;
	                  break;

	                case "center":
	                  mouseX = x + width / 2;
	                  mouseY = y + height / 2;
	                  break;

	                case "end":
	                  mouseX = x + width;
	                  mouseY = y + height;
	                  break;
	              }
	            }

	            if (side === "block-start" || side === "block-end") {
	              width = 0;
	              x = mouseX;
	            } else if (side === "inline-start" || side === "inline-end") {
	              height = 0;
	              y = mouseY;
	            } // Clamp


	            x = Math.max((_baseRect$x2 = baseRect === null || baseRect === void 0 ? void 0 : baseRect.x) !== null && _baseRect$x2 !== void 0 ? _baseRect$x2 : 0, x);
	            y = Math.max((_baseRect$y2 = baseRect === null || baseRect === void 0 ? void 0 : baseRect.y) !== null && _baseRect$y2 !== void 0 ? _baseRect$y2 : 0, y);
	            x = Math.min(((_baseRect$x3 = baseRect === null || baseRect === void 0 ? void 0 : baseRect.x) !== null && _baseRect$x3 !== void 0 ? _baseRect$x3 : 0) + ((_baseRect$width2 = baseRect === null || baseRect === void 0 ? void 0 : baseRect.width) !== null && _baseRect$width2 !== void 0 ? _baseRect$width2 : 0), x);
	            y = Math.min(((_baseRect$y3 = baseRect === null || baseRect === void 0 ? void 0 : baseRect.y) !== null && _baseRect$y3 !== void 0 ? _baseRect$y3 : 0) + ((_baseRect$height2 = baseRect === null || baseRect === void 0 ? void 0 : baseRect.height) !== null && _baseRect$height2 !== void 0 ? _baseRect$height2 : 0), y);
	          } else {
	            if (align === "center" && focusedElement) {
	              if (side === "block-start" || side === "block-end") {
	                x = x + width / 2;
	                width = 0;
	              } else if (side === "inline-start" || side === "inline-end") {
	                y = y + height / 2;
	                height = 0;
	              }
	            }
	          }

	          return DOMRectReadOnly.fromRect({
	            x,
	            y,
	            width,
	            height
	          });
	        }
	      };
	      setPopperInstance(createPopper(virtualElement, popperElement, {
	        modifiers: [{
	          name: "flip",
	          options: {}
	        }, {
	          name: 'arrow',
	          options: {
	            element: getArrowElement(),
	            padding: 8
	          }
	        }, {
	          name: 'offset',
	          options: {
	            offset: [skidding !== null && skidding !== void 0 ? skidding : 0, distance !== null && distance !== void 0 ? distance : useArrow ? 10 : 0]
	          }
	        }, {
	          name: "preventOverflow",
	          options: {
	            padding: {
	              bottom: paddingBottom !== null && paddingBottom !== void 0 ? paddingBottom : 0,
	              top: paddingTop !== null && paddingTop !== void 0 ? paddingTop : 0,
	              left: paddingLeft !== null && paddingLeft !== void 0 ? paddingLeft : 0,
	              right: paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0
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
	  }, [followMouse, useArrow, side, align, skidding, distance, paddingTop, paddingBottom, paddingLeft, paddingRight, logicalDirection, childSelector]);
	  const [hasAllElements, setHasAllElements] = useState(false);
	  _$1(() => {
	    if (hasAllElements) resetPopperInstance(getSourceElement(), getPopperElement());
	  }, [hasAllElements]);
	  const [getAllElements, setAllElements] = usePassiveState(T$2(_ref2 => {
	    let {
	      sourceElement,
	      popperElement
	    } = _ref2;

	    if (sourceElement && popperElement) {
	      setHasAllElements(true);
	    }
	  }, []), T$2(() => ({
	    sourceElement: null,
	    popperElement: null
	  }), []));
	  const {
	    getElement: getSourceElement,
	    useRefElementProps: useSourceElementRefProps
	  } = useRefElement({
	    onElementChange: T$2(e => setAllElements(elements => ({ ...elements,
	      sourceElement: e
	    })), [])
	  });
	  const {
	    getElement: getPopperElement,
	    useRefElementProps: usePopperElementRefProps
	  } = useRefElement({
	    onElementChange: T$2(e => setAllElements(elements => ({ ...elements,
	      popperElement: e
	    })), [])
	  });
	  const {
	    getElement: getArrowElement,
	    useRefElementProps: useArrowElementRefProps
	  } = useRefElement({});
	  const [sourceStyle, setSourceStyle] = useState(null);
	  const [sourceAttributes, setSourceAttributes] = useState({});
	  const [popperStyle, setPopperStyle] = useState(null);
	  const [popperAttributes, setPopperAttributes] = useState({});
	  const [arrowStyle, setArrowStyle] = useState(null);
	  const [arrowAttributes, setArrowAttributes] = useState({});
	  _$1(() => {
	    if (updating) {
	      let rafHandle = 0;

	      function raf() {
	        var _ref3, _getPopperInstance3;

	        let p = (_ref3 = closed ? Promise.resolve() : (_getPopperInstance3 = getPopperInstance()) === null || _getPopperInstance3 === void 0 ? void 0 : _getPopperInstance3.update()) !== null && _ref3 !== void 0 ? _ref3 : Promise.resolve();
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
	  const updateStateModifier = F(() => {
	    let modifier = {
	      name: "updateState",
	      enabled: true,
	      phase: "write",
	      fn: _ref4 => {
	        let {
	          state,
	          options,
	          name,
	          instance
	        } = _ref4;
	        let usedPlacement = state.placement;
	        if (usedPlacement.includes("-")) usedPlacement = usedPlacement.substr(0, usedPlacement.indexOf("-"));
	        setUsedSide(convertToLogicalSide(usedPlacement));
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

	  function usePopperSource() {
	    function usePopperSourceProps(props) {
	      let style = { ...sourceStyle
	      };
	      return useSourceElementRefProps(useMergedProps()(sourceAttributes, useMergedProps()({
	        style,
	        onMouseMove: !followMouse ? undefined : e => {
	          const {
	            clientX,
	            clientY
	          } = e;
	          setMouseX(clientX);
	          setMouseY(clientY);
	          setPositionPreference("mouse");
	        }
	      }, useLogicalDirectionProps(props))));
	    }

	    return {
	      usePopperSourceProps
	    };
	  }

	  function usePopperPopup(_ref5) {
	    let {
	      open
	    } = _ref5;

	    function usePopperPopupProps(props) {
	      let style = { ...popperStyle,
	        pointerEvents: open ? undefined : "none"
	      };
	      return useMergedProps()(usePopperElementRefProps({
	        style
	      }), props);
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

	  const axis = side.substring(0, side.indexOf('-'));
	  const axisPosition = side.substring(side.indexOf('-') + 1);
	  const usedAxis = usedSide.substring(0, side.indexOf('-'));
	  const usedAxisPosition = usedSide.substring(side.indexOf('-') + 1);
	  let usedSideSwapsAxes = usedAxis !== axis;
	  let usedSideFlipsAxis = axisPosition !== usedAxisPosition;
	  /**
	   * Given a set of props to pass to a Transition component,
	   * and a list of prop names that should be adjusted when the Popper flips,
	   * swaps and flips the original prop names and their values around to match what the Popper is showing.
	   *
	   * Not all props need flipping, some just need swapping
	   * (swapping is when an axis changes like "inline" to "block", flipping is when a position changes like "start" to "end").
	   * If a property just needs swapping, set `flipFunction` to null. Otherwise,
	   * it should be a function along the lines of `n => -n`, `n => 1-n`, etc.
	   *
	   *
	   * @param originalProps
	   * @param affectedProps
	   * @returns
	   */

	  const flipTransformProps = (originalProps, affectedProps) => {
	    const props = { ...originalProps
	    };

	    for (const {
	      inline,
	      block,
	      flipFunction
	    } of affectedProps) {
	      if (flipFunction) flip(props, inline, block, flipFunction);
	      swap(props, inline, block);
	    }

	    return props;

	    function flip(props, inlinePropName, blockPropName, flipFunction) {
	      if (usedSideFlipsAxis) {
	        if (axis === "inline") {
	          if (props[inlinePropName] != null) props[inlinePropName] = flipFunction(props[inlinePropName]);
	        } else {
	          if (props[blockPropName] != null) props[blockPropName] = flipFunction(props[blockPropName]);
	        }
	      }
	    }

	    function swap(props, inlinePropName, blockPropName) {
	      if (usedSideSwapsAxes) {
	        const v1 = props[inlinePropName];
	        const v2 = props[blockPropName];
	        props[inlinePropName] = v2;
	        props[blockPropName] = v1;
	      }
	    }
	  };

	  return {
	    usePopperSource,
	    usePopperPopup,
	    usePopperArrow,
	    flipTransformProps,
	    usedSide,
	    usedAxis,
	    usedAxisPosition,
	    logicalDirection
	  };
	}
	function getDefaultFlips(Transition) {
	  const FlipAngle = {
	    inline: "flipAngleInline",
	    block: "flipAngleBlock",
	    flipFunction: n => -n
	  };
	  const SlideTarget = {
	    inline: "slideTargetInline",
	    block: "slideTargetBlock",
	    flipFunction: n => -n
	  };
	  const ClipOrigin = {
	    inline: "clipOriginInline",
	    block: "clipOriginBlock",
	    flipFunction: n => 1 - n
	  };
	  const ClipMin = {
	    inline: "clipMinInline",
	    block: "clipMinBlock",
	    flipFunction: null
	  };
	  const ZoomMin = {
	    inline: "zoomMinInline",
	    block: "zoomMinBlock",
	    flipFunction: null
	  };
	  const ZoomOrigin = {
	    inline: "zoomOriginInline",
	    block: "zoomOriginBlock",
	    flipFunction: n => 1 - n
	  };

	  switch (Transition) {
	    case Zoom:
	    case ZoomFade:
	      return [ZoomMin, ZoomOrigin];

	    case Clip:
	    case ClipFade:
	      return [ClipMin, ClipOrigin];

	    case Slide:
	    case SlideFade:
	      return [SlideTarget];

	    case SlideZoom:
	    case SlideZoomFade:
	      return [SlideTarget, ZoomMin, ZoomOrigin];

	    case Flip:
	      return [FlipAngle];

	    default:
	      console.warn(`An unknown Transition was provided without also providing TransitionPropFlips, so this Popper component will not animate its transitions properly when flipped.`);
	      return [];
	  }
	} //type T = HTMLDivElement["style"];

	function useShouldUpdatePopper(open) {
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
	  let onInteraction = T$2(() => {
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
	  return {
	    shouldUpdate: !!updatingForABit,
	    onInteraction
	  };
	}

	const Tooltip = g$1(forwardElementRef(function Tooltip(_ref, ref) {
	  var _side, _align, _TransitionProps, _TransitionPropFlips, _TransitionProps2;

	  let {
	    children,
	    childSelector,
	    side,
	    align,
	    tooltip,
	    forceOpen,
	    Transition,
	    TransitionProps,
	    TransitionPropFlips,
	    mouseoverDelay,
	    mouseoutDelay,
	    focusDelay,
	    ...restAnchorProps
	  } = _ref;
	  (_side = side) !== null && _side !== void 0 ? _side : side = "block-start";
	  (_align = align) !== null && _align !== void 0 ? _align : align = "center";
	  const focusMode = useFocusMode();
	  let {
	    getIsOpen,
	    isOpen,
	    useTooltip,
	    useTooltipTrigger
	  } = useAriaTooltip({
	    mouseoverDelay,
	    mouseoutDelay,
	    focusDelay: focusMode === "mouse" ? Infinity : undefined
	  }); // TODO: This is probably the most benign mutation during render issue ever
	  // It's just used to preserve the last shown value when the tooltip is fading out because `tooltip` is null.

	  const lastUsedTooltipRef = s$2(tooltip);
	  lastUsedTooltipRef.current = tooltip || lastUsedTooltipRef.current;
	  isOpen || (isOpen = !!forceOpen);
	  isOpen && (isOpen = !!tooltip);
	  let cloneable;

	  if (typeof children === "string" || typeof children === "number" || typeof children == "boolean" || typeof children === "bigint") {
	    cloneable = e$3("span", {
	      children: children
	    });
	  } else if (Array.isArray(children)) {
	    cloneable = e$3("span", {
	      children: children
	    });
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
	  } = useShouldUpdatePopper(isOpen);
	  const {
	    useElementSizeProps
	  } = useElementSize({
	    onSizeChange: useStableCallback(onInteraction !== null && onInteraction !== void 0 ? onInteraction : () => {})
	  });
	  const {
	    logicalDirection,
	    usePopperArrow,
	    usePopperPopup,
	    usePopperSource,
	    flipTransformProps
	  } = usePopperApi({
	    updating: shouldUpdate,
	    side,
	    align,
	    useArrow: true,
	    followMouse: true,
	    childSelector
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
	  } = usePopperSource(); // Set up the default transition if none was provided

	  (_TransitionProps = TransitionProps) !== null && _TransitionProps !== void 0 ? _TransitionProps : TransitionProps = {};

	  if (Transition == undefined) {
	    const sideIsBlock = side.startsWith("block");
	    const sideIsInline = !sideIsBlock;
	    const sideIsStart = side.endsWith("start");
	    Transition = ZoomFade;
	    TransitionProps[`zoomOrigin${sideIsInline ? "Block" : "Inline"}`] = 0.5;
	    TransitionProps[`zoomOrigin${sideIsBlock ? "Block" : "Inline"}`] = sideIsStart ? 1 : 0;
	    TransitionProps.zoomMin = 0.85;
	  }

	  (_TransitionPropFlips = TransitionPropFlips) !== null && _TransitionPropFlips !== void 0 ? _TransitionPropFlips : TransitionPropFlips = getDefaultFlips(Transition);
	  TransitionProps = flipTransformProps((_TransitionProps2 = TransitionProps) !== null && _TransitionProps2 !== void 0 ? _TransitionProps2 : {}, TransitionPropFlips);
	  let anchorProps = cloneable.props;
	  anchorProps = useTooltipTriggerProps(useElementSizeProps(usePopperSourceProps(anchorProps)));
	  anchorProps = useMergedProps()(anchorProps, {
	    ref: cloneable.ref,
	    class: "tooltip-anchor"
	  });
	  anchorProps = useMergedProps()(anchorProps, {
	    ref
	  });
	  anchorProps = useMergedProps()(anchorProps, restAnchorProps); // TODO: It's required for this to be exitVisibility="hidden" for transforms to work?
	  // Probably an issue in the Transition element itself because it's not browser-specific but it's a little weird

	  return e$3(d$2, {
	    children: [B(cloneable, anchorProps), e$3(BodyPortal, {
	      children: e$3("div", { ...usePopperPopupProps({
	          class: "tooltip-wrapper"
	        }),
	        children: e$3(Transition, { ...TransitionProps,
	          show: isOpen,
	          onTransitionUpdate: onInteraction,
	          exitVisibility: "hidden",
	          children: e$3("div", { ...useTooltipProps(useMergedProps()({
	              class: "tooltip show",
	              role: "tooltip"
	            }, {})),
	            children: [e$3("div", { ...usePopperArrowProps({
	                class: "popper-arrow"
	              })
	            }), e$3("div", {
	              class: "tooltip-inner",
	              children: tooltip || lastUsedTooltipRef.current
	            })]
	          })
	        })
	      })
	    })]
	  });
	}));

	/**
	 * A Checkbox-Like is a checkbox, radio button, switch, etc.
	 *
	 * It has an input element, a label value, and a position for that label (e.g. "after", "tooltip", etc.).
	 *
	 * It displays itself differently depending on if it's within an InputGroup or not.
	 *
	 * It can also display an async state.
	 */

	function CheckboxLike(_ref) {
	  var _labelPosition;

	  let {
	    labelPosition,
	    currentHandlerType,
	    asyncState,
	    inputProps,
	    labelProps,
	    wrapperProps,
	    label,
	    disabled,
	    type,
	    inline
	  } = _ref;
	  (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "end";
	  const inInputGroup = !!q$1(InInputGroupContext);
	  !!q$1(InInputGridContext);
	  let stringLabel = `${label}`;

	  if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
	    console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
	  } //if (labelPosition == "hidden" || labelPosition == "tooltip")
	  //    label = null;


	  let temp = useMergedProps()({
	    "aria-label": stringLabel
	  }, inputProps);
	  if (inInputGroup) inputProps = temp;

	  if (labelPosition == "button") {
	    return e$3(ButtonCheckboxLike, {
	      disabled: disabled,
	      asyncState: asyncState,
	      currentHandlerType: currentHandlerType,
	      label: label,
	      inputProps: inputProps,
	      labelProps: labelProps
	    });
	  } else if (inInputGroup) {
	    return e$3(InputGroupCheckboxLike, {
	      type: type,
	      labelPosition: labelPosition,
	      disabled: disabled,
	      asyncState: asyncState,
	      currentHandlerType: currentHandlerType,
	      label: label,
	      inputProps: inputProps,
	      labelProps: labelProps
	    });
	  } else {
	    return e$3(NormalCheckboxLike, {
	      labelPosition: labelPosition,
	      disabled: disabled,
	      inline: inline,
	      asyncState: asyncState,
	      currentHandlerType: currentHandlerType,
	      label: label,
	      inputProps: inputProps,
	      labelProps: labelProps,
	      wrapperProps: wrapperProps
	    });
	  }
	}

	function ButtonCheckboxLike(_ref2) {
	  var _ref3;

	  let {
	    inputProps,
	    labelProps,
	    label,
	    asyncState,
	    currentHandlerType,
	    disabled
	  } = _ref2;
	  const buttonColor = useButtonColorVariant() || "primary";
	  return e$3(d$2, {
	    children: [e$3("input", { ...useMergedProps()({
	        class: clsx("btn-check", disabled && "disabled")
	      }, inputProps)
	    }), e$3(ProgressCircular, {
	      childrenPosition: "child",
	      colorFill: "foreground-only",
	      mode: (_ref3 = currentHandlerType === "async" ? asyncState : null) !== null && _ref3 !== void 0 ? _ref3 : null,
	      colorVariant: "info",
	      children: e$3("label", { ...useMergedProps()({
	          class: clsx("btn", `btn-${buttonColor}`, disabled && disabled, inputProps.checked && "active"),
	          children: e$3("span", {
	            class: "btn-text-contents",
	            children: label
	          })
	        }, labelProps)
	      })
	    })]
	  });
	}

	function CheckboxLikeOnly(_ref4) {
	  var _ref5;

	  let {
	    label,
	    inputProps,
	    asyncState,
	    currentHandlerType,
	    disabled,
	    labelPosition
	  } = _ref4;

	  let inputElement = e$3("input", { ...useMergedProps()({
	      class: clsx("form-check-input", disabled && "disabled")
	    }, inputProps)
	  });

	  inputElement = e$3(Tooltip, {
	    tooltip: labelPosition == "tooltip" ? label : null,
	    children: inputElement
	  });
	  inputElement = e$3(ProgressCircular, {
	    childrenPosition: "after",
	    colorFill: "foreground-only",
	    mode: (_ref5 = currentHandlerType === "async" ? asyncState : null) !== null && _ref5 !== void 0 ? _ref5 : null,
	    colorVariant: "info",
	    children: inputElement
	  });
	  return inputElement;
	}

	function InputGroupCheckboxLike(_ref6) {
	  let {
	    inputProps,
	    labelProps,
	    label,
	    asyncState,
	    currentHandlerType,
	    disabled,
	    labelPosition,
	    type
	  } = _ref6;

	  let labelElement = e$3(InputGroupText, {
	    tag: "label",
	    ...useMergedProps()({
	      class: clsx("input-group-text", disabled && "disabled"),
	      children: label
	    }, labelProps)
	  });

	  labelElement = label != null && (labelPosition == "start" || labelPosition == "end") && labelElement || null;
	  return e$3(d$2, {
	    children: [labelPosition == "start" && labelElement, e$3(InputGroupText, {
	      tag: "div",
	      disabled: disabled,
	      class: clsx(type == "switch" ? "form-switch" : null),
	      children: e$3(CheckboxLikeOnly, {
	        labelPosition: labelPosition,
	        disabled: disabled,
	        inputProps: inputProps,
	        label: label,
	        asyncState: asyncState,
	        currentHandlerType: currentHandlerType
	      })
	    }), labelPosition == "end" && labelElement]
	  });
	}

	function NormalCheckboxLike(_ref7) {
	  let {
	    inputProps,
	    labelProps,
	    wrapperProps,
	    label,
	    asyncState,
	    currentHandlerType,
	    disabled,
	    labelPosition,
	    inline
	  } = _ref7;

	  const labelElement = (labelPosition == "start" || labelPosition == "end") && e$3("label", { ...useMergedProps()({
	      class: clsx("form-check-label", disabled && "disabled"),
	      children: label
	    }, labelProps)
	  });

	  return e$3("div", { ...useMergedProps()({
	      class: clsx("form-check", disabled && "disabled", inline && "form-check-inline")
	    }, wrapperProps),
	    children: [labelPosition == "start" && labelElement, e$3(CheckboxLikeOnly, {
	      disabled: disabled,
	      inputProps: inputProps,
	      labelPosition: labelPosition,
	      label: label,
	      asyncState: asyncState,
	      currentHandlerType: currentHandlerType
	    }), labelPosition == "end" && labelElement]
	  });
	}

	function capture$2(e) {
	  return e[EventDetail].checked;
	}
	/**
	 * TODO: When inside an InputGroup, Checkboxes don't forward any properties or refs because there's no one DOM element to attach to.
	 *
	 * Probably need separate `inputRef` & `labelRef` properties for that,
	 * but given there's also no easy way to forward props to just them a solution like that feels incomplete.
	 */


	const Checkbox = g$1(forwardElementRef(function Checkbox(_ref, ref) {
	  var _disabled;

	  let {
	    checked,
	    tristate,
	    disabled,
	    inline,
	    onCheck: onCheckedAsync,
	    labelPosition,
	    children: label,
	    tabIndex,
	    ...props
	  } = _ref;
	  const inInputGroup = q$1(InInputGroupContext);
	  const {
	    syncHandler,
	    pending,
	    hasError,
	    settleCount,
	    hasCapture,
	    currentCapture,
	    currentType
	  } = useAsyncHandler((newCheckedValue, event) => {
	    if (tristate) {
	      if (checked == false) return onCheckedAsync === null || onCheckedAsync === void 0 ? void 0 : onCheckedAsync("mixed", event);else if (checked === "mixed") return onCheckedAsync === null || onCheckedAsync === void 0 ? void 0 : onCheckedAsync(true, event);else return onCheckedAsync === null || onCheckedAsync === void 0 ? void 0 : onCheckedAsync(false, event);
	    } else {
	      return onCheckedAsync === null || onCheckedAsync === void 0 ? void 0 : onCheckedAsync(newCheckedValue, event);
	    }
	  }, {
	    capture: capture$2
	  });
	  disabled || (disabled = pending);
	  const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
	  const onChecked = syncHandler;
	  const {
	    useCheckboxInputElement,
	    useCheckboxLabelElement
	  } = useAriaCheckbox({
	    checked: pending ? currentCapture : checked === "indeterminate" ? "mixed" : checked,
	    disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
	    onInput: onChecked,
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
	  }); //const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });

	  let baseInputProps = {
	    ref: ref,
	    className: clsx(pending && "pending", inInputGroup && "mt-0"),
	    tabIndex: tabIndex !== null && tabIndex !== void 0 ? tabIndex : 0
	  };
	  let baseLabelProps = {
	    class: clsx(pending && "pending")
	  };
	  return e$3(CheckboxLike, {
	    type: "check",
	    disabled: disabled,
	    asyncState: asyncState,
	    currentHandlerType: currentType,
	    labelPosition: labelPosition,
	    inputProps: useCheckboxInputElementProps(baseInputProps),
	    labelProps: useCheckboxLabelElementProps(baseLabelProps),
	    inline: inline !== null && inline !== void 0 ? inline : false,
	    wrapperProps: useMergedProps()({}, props),
	    label: label
	  });
	}));
	forwardElementRef(function OptionallyInputGroup(_ref2, ref) {
	  let {
	    tag,
	    children,
	    isInput,
	    isTooltip,
	    ...props
	  } = _ref2;
	  const inInputGroup = q$1(InInputGroupContext);
	  const inInputGrid = !!q$1(InInputGridContext);
	  props = { ...props,
	    ref
	  };
	  props = useMergedProps()(props, (!inInputGroup || isTooltip) && !tag ? children.props : {});

	  if (!inInputGroup || isTooltip) {
	    if (tag) return v$2(tag, props, children);else return B(children, props);
	  } // If we're in an InputGrid's InputGroup, then create a 
	  // new child that's, CSS-wise, the "true" input.
	  // The other one is used for its border styles and relative positioning.


	  if (inInputGrid && isInput) children = e$3("div", { ...useMergedProps()(props, {
	      className: "input-group-text"
	    }),
	    children: children
	  });
	  return e$3(InputGroupText, {
	    tag: tag !== null && tag !== void 0 ? tag : "div",
	    ...useMergedProps()({
	      className: clsx(isInput && inInputGrid && "faux-input-group-text")
	    }, props),
	    children: children
	  });
	});

	/**
	 * Utility function for a parent that quickly needs the text content of its children,
	 * ideally as the `children` prop, but will fall back to a mutation observer if necessary.
	 *
	 * Returns the text content, and the modified props to use for the parent.
	 *
	 * @param props
	 * @returns
	 */

	function useChildrenTextProps(props) {
	  const children = props.children;
	  const childrenNotStringable = !childrenIsStringable(children);
	  const [text, setText] = useState(() => childrenNotStringable ? null : childrenToString(children));
	  const onElementUpdate = T$2(element => {
	    if (childrenNotStringable) {
	      var _element$textContent;

	      setText(((_element$textContent = element === null || element === void 0 ? void 0 : element.textContent) !== null && _element$textContent !== void 0 ? _element$textContent : "").trim());
	    }
	  }, [childrenNotStringable]);
	  const {
	    useRefElementProps,
	    getElement
	  } = useRefElement({
	    onElementChange: onElementUpdate
	  });
	  const {
	    useMutationObserverProps
	  } = useMutationObserver(childrenNotStringable ? {
	    subtree: true,
	    onCharacterData: info => onElementUpdate(getElement())
	  } : null);
	  _$1(() => {
	    if (!childrenNotStringable) {
	      setText(childrenToString(children));
	    }
	  }, [childrenNotStringable, childrenNotStringable ? null : children]);
	  return {
	    childrenText: text,
	    props: useMutationObserverProps(useRefElementProps(props))
	  };
	}

	function childrenToString(children) {
	  if (children == null) return "";else if (Array.isArray(children)) return children.map(child => childrenToString(child)).join("");else if (typeof children == "string") return children;else if (typeof children == "boolean") return "";
	  return `${children}`;
	}

	function childrenIsStringable(children) {
	  if (children == null) return true;else if (Array.isArray(children)) {
	    for (let child of children) {
	      if (!childrenIsStringable(child)) return false;
	    }

	    return true;
	  } else if (typeof children === "string") return true;else if (typeof children === "number") return true;else if (typeof children === "bigint") return true;else if (typeof children === "boolean") return true;
	  return false;
	}

	D$1(null);
	D$1(false);
	D$1(null);
	/**
	 * This is a child checkbox of a `CheckboxGroup`.
	 *
	 * Effectively the only differences to a normal `Checkbox` are
	 * the addition of an `index` prop and the fact that your
	 * onCheck must be able to handle "mixed" as a value, which can
	 * occur if the child is set to be mixed, unset by the parent
	 * checkbox, and then "restored" by the parent checkbox a few
	 * clicks later.
	 *
	 * @param param0
	 * @returns
	 */

	g$1(forwardElementRef(function CheckboxGroupChild(p, ref) {
	  var _id;

	  let {
	    childrenText,
	    props: {
	      index,
	      checked,
	      onCheck,
	      id,
	      ...props
	    }
	  } = useChildrenTextProps({ ...p,
	    ref
	  });
	  checked || (checked = false);
	  const randomId = generateRandomId("cbc-");
	  (_id = id) !== null && _id !== void 0 ? _id : id = randomId;
	  const useCheckboxGroupChild = q$1(UseCheckboxGroupChildContext);

	  let setChecked = checked => {
	    return onCheck(checked, null);
	  };

	  const {
	    tabbable,
	    useCheckboxGroupChildProps
	  } = useCheckboxGroupChild({
	    index,
	    checked: checked,
	    text: childrenText,
	    id,
	    setChecked
	  });
	  return e$3(Checkbox, { ...useCheckboxGroupChildProps({
	      id,
	      ...props
	    }),
	    onCheck: onCheck,
	    checked: checked
	  });
	}));

	const knownNames = new Set();
	const CurrentHandlerTypeContext = D$1("sync");
	const RadioGroupContext = D$1(null);
	const RadioGroup = g$1(forwardElementRef(function RadioGroup(_ref, ref) {
	  var _name;

	  let {
	    children,
	    name,
	    selectedValue,
	    label,
	    labelPosition,
	    onValueChange: onInputAsync
	  } = _ref;
	  const {
	    syncHandler,
	    pending,
	    hasError,
	    settleCount,
	    currentCapture,
	    currentType
	  } = useAsyncHandler(onInputAsync, {
	    capture: e => e[EventDetail].selectedValue
	  });
	  const onInput = syncHandler;
	  const {
	    randomId: backupName
	  } = useRandomId({
	    prefix: "radio-"
	  });
	  (_name = name) !== null && _name !== void 0 ? _name : name = backupName;
	  const {
	    useRadio,
	    useRadioGroupProps,
	    managedChildren,
	    selectedIndex
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


	  useEffect(() => {
	    if (knownNames.has(name)) {
	      console.error(`Multiple radio groups with the name "${name}" exist on the same page at the same time!`);
	    }

	    knownNames.add(name);
	    return () => knownNames.delete(name);
	  }, [name]); //useChildFlag(selectedIndex, managedChildren.length, (index, isSelected) =>{ managedChildren[index]?.setAsyncState(isSelected? (hasError? "failed" : pending? "pending" :  "succeeded") : null )});
	  // Any time the selected index changes, let the previous radio button know that it shouldn't be displaying a spinner (if it was).

	  const currentCheckboxPendingState = hasError ? "failed" : pending ? "pending" : "succeeded";
	  useEffect(prev => {
	    if (prev) {
	      var _managedChildren$prev;

	      const [prevSelectedIndex] = prev;
	      if (prevSelectedIndex != null && prevSelectedIndex >= 0 && prevSelectedIndex < managedChildren.length) (_managedChildren$prev = managedChildren[prevSelectedIndex]) === null || _managedChildren$prev === void 0 ? void 0 : _managedChildren$prev.setAsyncState(null);
	    }
	  }, [selectedIndex]);
	  useEffect(() => {
	    var _managedChildren$sele;

	    if (selectedIndex != null && selectedIndex >= 0 && selectedIndex < managedChildren.length) (_managedChildren$sele = managedChildren[selectedIndex]) === null || _managedChildren$sele === void 0 ? void 0 : _managedChildren$sele.setAsyncState(currentCheckboxPendingState);
	  }, [selectedIndex, currentCheckboxPendingState]); // useChildFlag(pending ? capturedIndex : null, managedChildren.length, useCallback((index, isCaptured) => managedChildren[index].setPending(isCaptured? "in" : false), []));

	  const {
	    useGenericLabelLabel,
	    useGenericLabelInput,
	    useReferencedInputIdProps
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

	  let labelJsx = e$3("label", { ...useGenericLabelLabelProps(useReferencedInputIdProps("for")({
	      children: label
	    }))
	  });

	  let groupJsx = e$3("div", { ...useGenericLabelInputProps(useRadioGroupProps({
	      ref,
	      "aria-label": labelPosition === "hidden" ? stringLabel : undefined
	    })),
	    children: children
	  });

	  return e$3(CurrentHandlerTypeContext.Provider, {
	    value: currentType !== null && currentType !== void 0 ? currentType : "sync",
	    children: e$3(RadioGroupContext.Provider, {
	      value: useRadio,
	      children: [labelPosition == "start" && labelJsx, groupJsx, labelPosition == "end" && labelJsx]
	    })
	  });
	}));

	const Radio = g$1(forwardElementRef(function Radio(_ref2, ref) {
	  var _disabled;

	  let {
	    disabled,
	    inline,
	    children: label,
	    index,
	    value,
	    labelPosition,
	    ...rest
	  } = _ref2;
	  const currentHandlerType = q$1(CurrentHandlerTypeContext);
	  const [asyncState, setAsyncState] = useState(null);
	  disabled || (disabled = asyncState === "pending");
	  const useAriaRadio = q$1(RadioGroupContext);
	  const {
	    useRadioInput,
	    useRadioLabel
	  } = useAriaRadio({
	    disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
	    labelPosition: "separate",
	    index,
	    text: null,
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
	  return e$3(CheckboxLike, {
	    type: "radio",
	    disabled: disabled,
	    asyncState: asyncState,
	    currentHandlerType: currentHandlerType,
	    labelPosition: labelPosition,
	    inputProps: useRadioInputProps({
	      ref,
	      type: "radio",
	      className: clsx()
	    }),
	    labelProps: useRadioLabelProps({
	      class: clsx()
	    }),
	    wrapperProps: useMergedProps()({
	      class: ""
	    }, rest),
	    inline: inline !== null && inline !== void 0 ? inline : false,
	    label: label
	  });
	}));

	function capture$1(e) {
	  return e[EventDetail].checked;
	}
	/**
	 * @see Checkbox
	 * @param ref
	 * @returns
	 */


	const Switch = g$1(forwardElementRef(function Switch(_ref, ref) {
	  var _ref2, _disabled;

	  let {
	    checked,
	    disabled,
	    inline,
	    onCheck: onInputAsync,
	    children: label,
	    labelPosition,
	    tabIndex,
	    ...rest
	  } = _ref;
	  const {
	    syncHandler,
	    pending,
	    hasError,
	    settleCount,
	    hasCapture,
	    currentCapture,
	    currentType
	  } = useAsyncHandler(onInputAsync !== null && onInputAsync !== void 0 ? onInputAsync : null, {
	    capture: capture$1
	  });
	  disabled || (disabled = pending);
	  const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
	  const onChecked = syncHandler;
	  const {
	    useCheckboxInputElement: useSwitchInputElement,
	    useCheckboxLabelElement: useSwitchLabelElement
	  } = useAriaCheckbox({
	    checked: (_ref2 = pending ? currentCapture : checked) !== null && _ref2 !== void 0 ? _ref2 : false,
	    disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
	    onInput: onChecked,
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
	  }); //const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });

	  return e$3(CheckboxLike, {
	    type: "switch",
	    disabled: disabled,
	    asyncState: asyncState,
	    currentHandlerType: currentType,
	    labelPosition: labelPosition,
	    inputProps: useSwitchInputElementProps({
	      ref: ref,
	      class: clsx(),
	      tabIndex: tabIndex !== null && tabIndex !== void 0 ? tabIndex : 0
	    }),
	    labelProps: useSwitchLabelElementProps({
	      class: clsx()
	    }),
	    wrapperProps: useMergedProps()({
	      class: "form-switch"
	    }, rest),
	    inline: inline !== null && inline !== void 0 ? inline : false,
	    label: label
	  });
	})); // Note: Slightly different from the others
	// (^^^^ I'm really glad I left that there)

	forwardElementRef(function OptionallyInputGroup(_ref3, ref) {
	  let {
	    tag,
	    isInput,
	    isTooltip,
	    children,
	    ...props
	  } = _ref3;
	  const inInputGroup = q$1(InInputGroupContext);
	  const inInputGrid = q$1(InInputGridContext);
	  props = { ...props,
	    ref
	  };
	  if (!inInputGroup || isTooltip) return v$2(tag !== null && tag !== void 0 ? tag : d$2, props, children);
	  if (inInputGrid && isInput) children = e$3("div", { ...useMergedProps()(props, {
	      children,
	      className: clsx(isInput && inInputGrid && "form-switch", "input-group-text")
	    })
	  });
	  return e$3(InputGroupText, {
	    tag: tag !== null && tag !== void 0 ? tag : "div",
	    ...useMergedProps()({
	      children,
	      className: clsx("input-group-text", isInput && !inInputGrid && "form-switch", isInput && inInputGrid && "faux-input-group-text")
	    }, props)
	  });
	});

	function return0() {
	  return 0;
	}

	function UnlabelledInputR(p, ref) {
	  var _disabledVariant, _ref;

	  let {
	    type,
	    disabled,
	    value,
	    onValueChange: onInputAsync,
	    disabledVariant,
	    readOnly,
	    spinnerTimeout,
	    prefix,
	    suffix,
	    sizeClass,
	    debounce,
	    ...p2
	  } = p;
	  let {
	    nonNullable,
	    ...p3
	  } = p2;
	  let nullable = !nonNullable;
	  const props = p3;
	  (_disabledVariant = disabledVariant) !== null && _disabledVariant !== void 0 ? _disabledVariant : disabledVariant = "soft";
	  const [focusedInner, setFocusedInner, getFocusedInner] = useState(false);
	  const {
	    capture,
	    uncapture
	  } = useInputCaptures(type, props.min, props.max);
	  const {
	    useHasFocusProps
	  } = useHasFocus({
	    onFocusedInnerChanged: setFocusedInner,
	    onFocusedChanged: T$2(focused => {
	      if (!focused) setLRImpatience(0);
	    }, [])
	  });
	  const {
	    syncHandler,
	    currentCapture,
	    pending,
	    hasError,
	    settleCount,
	    flushDebouncedPromise,
	    currentType,
	    ...asyncInfo
	  } = useAsyncHandler(onInputAsync !== null && onInputAsync !== void 0 ? onInputAsync : null, {
	    capture: useStableCallback(e => {
	      const ret = capture(e);

	      if (ret == null) {
	        if (nullable) return ret;else return value;
	      } else {
	        return ret;
	      }
	    }),
	    debounce: debounce !== null && debounce !== void 0 ? debounce : type === "text" ? 1500 : undefined
	  });
	  if (!focusedInner && pending) disabled = true;
	  const onInputIfValid = disabled ? null : syncHandler;

	  const onInput = e => {
	    const target = e.currentTarget;
	    return onInputIfValid === null || onInputIfValid === void 0 ? void 0 : onInputIfValid.bind(target)(e);
	  }; // Until a better solution to "can't measure where the cursor is in input type=number" is found
	  // use this to keep track of if the user is hammering left/right trying to escape the text field 
	  // within a larger arrowkey-based navigation system. 


	  const [getLRImpatience, setLRImpatience] = usePassiveState(null, return0);
	  setInterval(() => {
	    if (getLRImpatience() == 0) {
	      setLRImpatience(prev => {
	        if (prev == null) prev = 0;else if (prev < 0) ++prev;else if (prev > 0) --prev;
	        return prev;
	      });
	    }
	  }, 1000);

	  const onKeyDown = e => {
	    if (e.currentTarget.type == "number") {
	      let prevValue = e.currentTarget.value;
	      let nextValue = null;
	      let arrowType = null;

	      switch (e.key) {
	        case "ArrowUp":
	          try {
	            e.currentTarget.stepUp();
	          } catch (ex) {
	            debugger;
	          }

	          nextValue = e.currentTarget.value;
	          e.currentTarget.value = prevValue;
	          arrowType = "vert";
	          break;

	        case "ArrowDown":
	          try {
	            e.currentTarget.stepDown();
	          } catch (ex) {
	            debugger;
	          }

	          nextValue = e.currentTarget.value;
	          e.currentTarget.value = prevValue;
	          arrowType = "vert";
	          break;

	        case "ArrowLeft":
	          setLRImpatience(prev => Math.max(-e.currentTarget.value.length + 1, (prev !== null && prev !== void 0 ? prev : 0) - 1));
	          arrowType = "horiz";
	          break;

	        case "ArrowRight":
	          setLRImpatience(prev => Math.min(e.currentTarget.value.length + 1, (prev !== null && prev !== void 0 ? prev : 0) + 1));
	          arrowType = "horiz";
	          break;
	      }

	      if (arrowType === "vert") {
	        // Only prevent anyone else from reacting to this event
	        // if this key press actually changed the value.
	        if (prevValue != nextValue) {
	          e.stopPropagation();
	        }
	      }

	      if (arrowType === "horiz") {
	        // No way to detect if we're at the start or end of the input element,
	        // unfortunately, at least when the type is number....
	        //
	        // So instead, we track the number of times the user has
	        // hammered the Left/Right arrows recently
	        // and if it's more than it takes to type the current value,
	        // as an escape we let the event through.
	        //
	        // This is mostly to prevent frustration, but
	        // TODO: really need a proper aria re-implementation of a number
	        // field as a text field (on non-mobile only??).
	        if (Math.abs(getLRImpatience()) <= e.currentTarget.value.length) e.stopPropagation();
	      }
	    }
	  };

	  const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
	  const onBlur = flushDebouncedPromise;
	  q$1(InInputGridContext);
	  const extraProps = type === "numeric" ? {
	    inputMode: "numeric",
	    pattern: "[0-9]*"
	  } : {};

	  if (type === "numeric") {
	    type = "text";
	  } // When typing numbers, they'll "autocorrect" to their
	  // most natural represented form when the input re-renders.
	  //
	  // This is a problem when typing, e.g., "-5", because
	  // when the user is typing character-by-character, 
	  // the closest number to "-" is "NaN", which makes it
	  // impossible to enter "-5" with the "-" as the first character.
	  //
	  // To fix this, we render the <input> as completely uncontrolled,
	  // and manually update the value during useEffect. If the value
	  // is null, whether it's because of valid or invalid user input,
	  // we'll just not update the value property on the element. We'll
	  // just leave it as it was last entered. Any time the value
	  // is NOT null, then we will take over again.
	  //
	  // TODO: Entering extremely large/small numbers is still rough.
	  //
	  // NOTE: When valueAsNumber is NaN, value is "".  That means
	  // that it's *NOT* possible to store the partially typed
	  // value anywhere -- it's completely hidden away.


	  const v = (_ref = pending || focusedInner || hasError ? currentCapture : undefined) !== null && _ref !== void 0 ? _ref : uncapture(value);
	  const {
	    getElement,
	    useRefElementProps
	  } = useRefElement({});
	  _$1(() => {
	    const element = getElement();

	    if (element) {
	      if (!focusedInner && v != null) {
	        element.value = `${v}`;
	      }
	    }
	  }, [focusedInner, v]);
	  let measure;

	  if (type == "number") {
	    measure = "0".repeat(v.toString().length);
	  } else {
	    measure = v || e$3(d$2, {
	      children: "\u00A0"
	    });
	  }

	  const inputProps = useRefElementProps(useHasFocusProps(useMergedProps()(props, {
	    "aria-disabled": disabled ? "true" : undefined,
	    onKeyDown,
	    ref,
	    readOnly: readOnly || disabled && disabledVariant === "soft",
	    disabled: disabled && disabledVariant === "hard",
	    onBlur,
	    class: clsx("form-control", "faux-form-control-inner", disabled && "disabled", "form-control", sizeClass),
	    type: type == "textarea" ? undefined : type,
	    onInput,
	    ...extraProps
	  })));
	  return e$3(d$2, {
	    children: [prefix && e$3("span", {
	      class: "form-control-prefix",
	      children: prefix
	    }), e$3("span", {
	      class: clsx("form-control", "faux-form-control-measure", "form-control", sizeClass),
	      children: e$3("span", {
	        children: [measure, currentType == "async" ? e$3("span", {
	          class: "d-inline-block user-select-none",
	          style: {
	            width: "2em"
	          }
	        }) : null]
	      })
	    }), e$3("label", {
	      class: clsx("form-control form-control-input-container", sizeClass),
	      children: e$3(ProgressCircular, {
	        spinnerTimeout: spinnerTimeout !== null && spinnerTimeout !== void 0 ? spinnerTimeout : 10,
	        mode: currentType === "async" ? asyncState : null,
	        childrenPosition: "after",
	        colorVariant: "info",
	        children: v$2(type == "textarea" ? "textarea" : "input", inputProps)
	      })
	    }), suffix && e$3("span", {
	      class: "form-control-suffix",
	      children: suffix
	    })]
	  });
	}

	const UnlabelledInput = forwardElementRef(UnlabelledInputR);
	const Input = g$1(forwardElementRef(function Input(_ref2, ref) {
	  var _labelPosition, _size, _size2;

	  let {
	    children,
	    value,
	    width,
	    readOnly,
	    labelPosition,
	    placeholder,
	    disabled,
	    disabledVariant,
	    size,
	    className,
	    prefix,
	    suffix,
	    debounce,
	    class: classs,
	    ...props
	  } = _ref2;
	  (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "start";
	  let parentSize = q$1(DefaultInputSize);
	  (_size = size) !== null && _size !== void 0 ? _size : size = parentSize !== null && parentSize !== void 0 ? parentSize : "md";
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
	  const isInInputGroup = q$1(InInputGroupContext);
	  q$1(InInputGridContext);
	  let stringLabel = `${children}`;

	  if (children != null && (labelPosition === "hidden" || labelPosition === "placeholder")) {
	    if (!["string", "number", "boolean"].includes(typeof children)) console.error(`Hidden labels require a string-based label for the aria-label attribute.`);else {
	      props["aria-label"] = stringLabel;
	      if (placeholder == null && labelPosition === "placeholder") placeholder = stringLabel;
	    }
	  }

	  const IC = disabled && disabledVariant === "text" ? InputGroupText : UnlabelledInput;

	  const labelJsx = e$3("label", { ...useInputLabelLabelProps({
	      class: clsx(disabledVariant !== "text" && disabled && "disabled", isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "")
	    }),
	    children: children
	  });

	  const sizeClass = size != "md" && `form-control-${size}`;

	  let inputJsx = e$3(IC, { ...useInputLabelInputProps(useMergedProps()({
	      children: IC === InputGroupText ? value : undefined,
	      value: undefined,
	      placeholder: IC === InputGroupText ? undefined : placeholder,
	      disabled: IC === InputGroupText ? undefined : disabled,
	      disabledVariant: IC === InputGroupText ? undefined : disabledVariant,
	      readOnly: IC === InputGroupText ? undefined : readOnly,
	      debounce: IC === InputGroupText ? undefined : debounce,
	      className: clsx(IC === InputGroupText ? "form-control" : undefined, sizeClass)
	    }, props)),
	    ...(IC === InputGroupText ? {} : {
	      sizeClass,
	      prefix: prefix,
	      suffix: suffix
	    }),
	    ...{
	      ref
	    },
	    ...{
	      [IC == InputGroupText ? "children" : "value"]: value
	    },
	    children: IC == InputGroupText ? value : undefined
	  });

	  const isEmpty = true ; //if (isInInputGrid) {

	  if (!(disabled && disabledVariant === "text")) {
	    inputJsx = e$3("div", {
	      class: clsx(labelPosition != "floating" && classs, labelPosition != "floating" && className, "form-control", "faux-form-control-outer", "elevation-depressed-2", "elevation-body-surface", //"focusable-within",
	      sizeClass, !isEmpty , disabled && disabledVariant !== "text" && "disabled"),
	      style: width !== null && width !== void 0 && width.endsWith("ch") ? {
	        "--form-control-width": width !== null && width !== void 0 ? width : "20ch"
	      } : width ? {
	        width
	      } : undefined,
	      children: inputJsx
	    });
	  } // }


	  if (labelPosition == "tooltip") inputJsx = e$3(Tooltip, {
	    tooltip: labelJsx,
	    children: inputJsx
	  });
	  return e$3(ProvideDefaultButtonSize, {
	    value: (_size2 = size) !== null && _size2 !== void 0 ? _size2 : "md",
	    children: labelPosition !== "floating" ? e$3(d$2, {
	      children: [labelPosition === "start" && labelJsx, inputJsx, labelPosition === "end" && labelJsx]
	    }) : e$3("div", {
	      class: clsx("form-floating", labelPosition == "floating" && classs, labelPosition === "floating" && className),
	      children: inputJsx
	    })
	  });
	}));

	/**
	 * Very simple, easy responsive grid that guarantees each column is the minimum size.
	 *
	 * Use leftover to control what happens when there's more space than minimally required.
	 * * "fill" to have each element expand equally to fill the remaining space
	 * * "shrink" to keep as many elements on one line as possible
	 *
	 * Easy one-liners all around here!
	 */

	const GridResponsive = g$1(forwardElementRef(function ResponsiveGrid(_ref, ref) {
	  var _children$props$child, _children$props;

	  let {
	    tag,
	    minWidth,
	    leftover,
	    children,
	    ...props
	  } = _ref;
	  const mergedProps = useMergedProps()({
	    className: "responsive-grid",
	    style: minWidth ? {
	      "--grid-min-width": `${minWidth}`,
	      "--grid-auto-behavior": leftover ? `auto-${leftover == "shrink" ? "fit" : leftover}` : ""
	    } : {},
	    ref
	  }, props);
	  const passthroughProps = useMergedProps()(mergedProps, (_children$props$child = children === null || children === void 0 ? void 0 : (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children) !== null && _children$props$child !== void 0 ? _children$props$child : {});
	  if (tag === "passthrough") return B(children, passthroughProps);else return v$2(tag !== null && tag !== void 0 ? tag : "div", mergedProps, children);
	}));
	/**
	 * Very simple, easy static grid that guarantees the number of columns is displayed,
	 * no matter how janky it looks.
	 */

	const GridStatic = g$1(forwardElementRef(function ResponsiveGrid(_ref2, ref) {
	  var _children$props$child2, _children$props2;

	  let {
	    tag,
	    columns,
	    children,
	    ...props
	  } = _ref2;
	  const mergedProps = useMergedProps()({
	    className: "static-grid",
	    style: typeof columns === "string" ? {
	      "--static-grid-columns": columns
	    } : {
	      "--grid-column-count": columns
	    },
	    ref
	  }, props);
	  const passthroughProps = useMergedProps()(mergedProps, (_children$props$child2 = children === null || children === void 0 ? void 0 : (_children$props2 = children.props) === null || _children$props2 === void 0 ? void 0 : _children$props2.children) !== null && _children$props$child2 !== void 0 ? _children$props$child2 : {});
	  if (tag === "passthrough") return B(children, passthroughProps);else return v$2(tag !== null && tag !== void 0 ? tag : "div", mergedProps, children);
	}));

	/**
	 * Autocomplete access to the most common Bootstrap utility classes.
	 *
	 * Not necessary to use by any means -- just a reminder about what can be used when.
	 */
	const UtilityClasses = {
	  position: {
	    relative: 'position-relative',
	    static: 'position-static',
	    absolute: 'position-absolute',
	    fixed: 'position-fixed',
	    sticky: 'position-sticky'
	  },
	  display: {
	    none: 'd-none',
	    flex: 'd-flex',
	    inlineFlex: 'd-inline-flex',
	    inline: 'd-inline',
	    inlineBlock: 'd-inline-block',
	    block: 'd-block',
	    grid: 'd-grid',
	    table: 'd-table',
	    tableRow: 'd-table-row',
	    tableCell: 'd-table-cell'
	  },
	  flex: {
	    parent: {
	      direction: {
	        row: 'flex-row',
	        rowReverse: 'flex-row-reverse',
	        column: 'flex-column',
	        columnReverse: 'flex-column-reverse'
	      },
	      justify: {
	        start: 'justify-content-start',
	        end: 'justify-content-end',
	        center: 'justify-content-center',
	        between: 'justify-content-between',
	        around: 'justify-content-around',
	        evenly: 'justify-content-evenly'
	      },
	      align: {
	        start: 'align-items-start',
	        end: 'align-items-end',
	        center: 'align-items-center',
	        baseline: 'align-items-baseline',
	        stretch: 'align-items-stretch '
	      }
	    },
	    children: {
	      align: {
	        start: 'align-self-start',
	        end: 'align-self-end',
	        center: 'align-self-center',
	        baseline: 'align-self-baseline',
	        stretch: 'align-self-stretch '
	      },
	      wrap: {
	        wrap: 'flex-wrap',
	        nowrap: 'flex-nowrap',
	        wrapReverse: 'flex-wrap-reverse'
	      }
	    }
	  },
	  userSelect: {
	    all: 'user-select-all',
	    auto: 'user-select-auto',
	    none: 'user-select-none'
	  },
	  pointerEvents: {
	    none: 'pe-none',
	    auto: 'pe-auto'
	  },
	  overflow: {
	    auto: 'overflow-auto',
	    hidden: 'overflow-hidden',
	    visible: 'overflow-visible',
	    scroll: 'overflow-scroll'
	  },
	  text: {
	    align: {
	      start: 'text-start',
	      center: 'text-center',
	      end: 'text-end'
	    },
	    wrapping: {
	      wrap: 'text-wrap',
	      nowrap: 'text-nowrap',
	      break: 'text-break',
	      truncate: 'text-truncate'
	    },
	    transform: {
	      uppercase: 'text-uppercase',
	      lowercase: 'text-lowercase',
	      capitalize: 'text-capitalize'
	    },
	    decoration: {
	      none: 'text-decoration-none',
	      underline: 'text-decoration-underline',
	      lineThrough: 'text-decoration-line-through'
	    }
	  }
	};

	const ListStatic = g$1(forwardElementRef(function ListStatic(props, ref) {
	  const {
	    tag,
	    label,
	    inline,
	    flush,
	    labelPosition,
	    ...domProps
	  } = props;
	  let labelVnode = typeof label == "string" ? e$3("label", {
	    children: label
	  }) : label;
	  return e$3(d$2, {
	    children: [labelPosition === "start" && labelVnode, v$2(tag !== null && tag !== void 0 ? tag : "ul", useMergedProps()({
	      class: clsx("list-group", flush && "list-group-flush", inline && UtilityClasses.display.inline),
	      ref,
	      "aria-hidden": labelPosition === "hidden" ? label : undefined
	    }, domProps)), labelPosition === "end" && labelVnode]
	  });
	}));
	const ListItemStatic = g$1(forwardElementRef(function ListItemStatic(props, ref) {
	  const {
	    children,
	    badge,
	    iconStart,
	    iconEnd,
	    disabled,
	    ...domProps
	  } = { ...props,
	    ref
	  };
	  return e$3("li", { ...usePseudoActive(useMergedProps()({
	      children: e$3("span", {
	        class: clsx("list-item-text-contents", !!badge && "with-badge", !!iconStart && "with-start", !!(badge || iconEnd) && "with-end"),
	        children: [iconStart && e$3("span", {
	          class: "list-item-text-contents-start-icon",
	          children: iconStart
	        }), children, badge && e$3("span", {
	          class: "list-item-text-contents-badge",
	          children: badge
	        }), iconEnd && e$3("span", {
	          className: "list-item-text-contents-end-icon",
	          children: iconEnd
	        })]
	      }),
	      class: clsx("list-group-item list-group-item-multiline", disabled && "disabled text-muted")
	    }, domProps))
	  });
	}));

	const UseListboxMultiItemContext = D$1(null);
	const ListMulti = g$1(forwardElementRef(function ListMulti(props, ref) {
	  var _labelPosition;

	  useLogRender("ListMulti", `Rendering ListMulti`);
	  let {
	    collator,
	    keyNavigation,
	    noTypeahead,
	    noWrap,
	    typeaheadTimeout,
	    tag,
	    select,
	    label,
	    labelPosition,
	    ...domProps
	  } = props; //const { useSyncHandler } = useAsyncHandler({ capture: (e: any) => e[EventDetail].selectedIndex as number });

	  const {
	    useListboxMultiItem,
	    useListboxMultiLabel,
	    useListboxMultiProps,
	    currentTypeahead,
	    focus,
	    invalidTypeahead,
	    tabbableIndex
	  } = useAriaListboxMulti({
	    typeaheadTimeout,
	    noWrap,
	    noTypeahead,
	    keyNavigation,
	    collator
	  });
	  const {
	    useListboxMultiLabelProps
	  } = useListboxMultiLabel();
	  (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "start";
	  let labelProps = typeof label == "string" ? {} : label.props;
	  let clonedLabel = labelPosition != "hidden" ? B(typeof label == "string" ? e$3("label", {
	    children: label
	  }) : label, useListboxMultiLabelProps(labelProps)) : label;
	  console.assert(!(labelPosition == "hidden" && typeof label != "string"));
	  return e$3(UseListboxMultiItemContext.Provider, {
	    value: useListboxMultiItem,
	    children: e$3(ListStatic, {
	      tag: tag,
	      labelPosition: labelPosition,
	      label: clonedLabel,
	      ...useMergedProps()({
	        class: "list-group",
	        ref,
	        "aria-hidden": labelPosition === "hidden" ? label : undefined
	      }, useListboxMultiProps(domProps))
	    })
	  });
	}));
	const ListItemMulti = g$1(forwardElementRef(function ListItemMulti(p, ref) {
	  var _ref;

	  const {
	    childrenText,
	    props: {
	      index,
	      selected,
	      disabled,
	      children,
	      onSelectChange: onSelectAsync,
	      ...domProps
	    }
	  } = useChildrenTextProps({ ...p,
	    ref
	  });
	  useLogRender("ListMulti", `Rendering ListMultiItem #${index}`);
	  const useListItemMulti = q$1(UseListboxMultiItemContext);
	  console.assert(!!useListItemMulti, "ListItemMulti is being used outside of a multi-select list. Did you mean to use a different kind of list, or a different kind of list item?");
	  const {
	    syncHandler,
	    pending,
	    currentCapture,
	    hasError,
	    resolveCount
	  } = useAsyncHandler(onSelectAsync, {
	    capture: e => e[EventDetail].selected
	  });
	  const onSelectSync = disabled ? null : syncHandler;
	  const {
	    tabbable,
	    useListboxMultiItemProps
	  } = useListItemMulti({
	    index,
	    text: childrenText,
	    tag: "li",
	    selected: (_ref = currentCapture !== null && currentCapture !== void 0 ? currentCapture : selected) !== null && _ref !== void 0 ? _ref : false,
	    onSelect: onSelectSync !== null && onSelectSync !== void 0 ? onSelectSync : undefined,
	    disabled
	  });
	  return e$3(ProgressCircular, {
	    childrenPosition: "child",
	    mode: pending ? "pending" : hasError ? "failed" : resolveCount ? "succeeded" : null,
	    colorVariant: "info",
	    children: e$3(ListItemStatic, { ...usePseudoActive(useMergedProps()({
	        disabled,
	        class: clsx("list-group-item-action", selected && "active", pending && "pending")
	      }, useListboxMultiItemProps(domProps))),
	      children: children
	    })
	  });
	}));

	const UseListboxSingleItemContext = D$1(null);
	const ListSingle = g$1(forwardElementRef(function ListSingle(props, ref) {
	  var _labelPosition;

	  useLogRender("ListSingle", `Rendering ListSingle`);
	  let {
	    onSelectChange: onSelectAsync,
	    selectedIndex,
	    selectionMode,
	    collator,
	    keyNavigation,
	    noTypeahead,
	    noWrap,
	    typeaheadTimeout,
	    tag,
	    select,
	    labelPosition,
	    label,
	    ...domProps
	  } = props;
	  const {
	    syncHandler,
	    pending,
	    currentCapture
	  } = useAsyncHandler(onSelectAsync, {
	    capture: e => e[EventDetail].selectedIndex
	  });
	  const onSelect = syncHandler;
	  const {
	    useListboxSingleItem,
	    useListboxSingleLabel,
	    useListboxSingleProps,
	    managedChildren
	  } = useAriaListboxSingle({
	    onSelect,
	    selectedIndex: selectedIndex,
	    selectionMode: selectionMode !== null && selectionMode !== void 0 ? selectionMode : "activate",
	    typeaheadTimeout,
	    noWrap,
	    noTypeahead,
	    keyNavigation,
	    collator
	  });
	  const {
	    useListboxSingleLabelProps
	  } = useListboxSingleLabel();
	  useChildFlag({
	    activatedIndex: pending ? currentCapture : null,
	    managedChildren,
	    getChildFlag: T$2(i => managedChildren[i].getPending(), []),
	    setChildFlag: T$2((i, set) => managedChildren[i].setPending(set), [])
	  });
	  (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "start";
	  let labelProps = typeof label == "string" ? {} : label.props;
	  let clonedLabel = labelPosition != "hidden" ? B(typeof label == "string" ? e$3("label", {
	    children: label
	  }) : label, useListboxSingleLabelProps(labelProps)) : label;
	  console.assert(!(labelPosition == "hidden" && typeof label != "string"));
	  return e$3(UseListboxSingleItemContext.Provider, {
	    value: useListboxSingleItem,
	    children: e$3(ListStatic, {
	      tag: tag,
	      labelPosition: labelPosition,
	      label: clonedLabel,
	      ...useMergedProps()({
	        class: "list-group",
	        ref,
	        "aria-hidden": labelPosition === "hidden" ? label : undefined
	      }, useListboxSingleProps(domProps))
	    })
	  });
	}));
	const ListItemSingle = g$1(forwardElementRef(function ListItemSingle(p, ref) {
	  let {
	    childrenText,
	    props: {
	      index,
	      hidden,
	      disabled,
	      children,
	      ...domProps
	    }
	  } = useChildrenTextProps({ ...p,
	    ref
	  });
	  useLogRender("ListSingle", `Rendering ListSingleItem #${index}`);
	  const [pending, setPending, getPending] = useState(false);
	  const useListItemSingle = q$1(UseListboxSingleItemContext);
	  console.assert(!!useListItemSingle, "ListItemSingle is being used outside of a single-select list. Did you mean to use a different kind of list, or a different kind of list item?");
	  const {
	    getSelected,
	    tabbable,
	    selected,
	    useListboxSingleItemProps
	  } = useListItemSingle({
	    index,
	    text: childrenText,
	    tag: "li",
	    setPending,
	    getPending,
	    hidden,
	    disabled
	  });
	  return e$3(ProgressCircular, {
	    childrenPosition: "child",
	    mode: pending ? "pending" : null,
	    colorVariant: "info",
	    children: e$3(ListItemStatic, { ...usePseudoActive(useMergedProps()({
	        disabled,
	        class: clsx("list-group-item-action", selected && "active", pending && "pending")
	      }, useListboxSingleItemProps(domProps))),
	      children: children
	    })
	  });
	}));

	const ListActionableChildContext = D$1(null);
	const ListActionable = g$1(forwardElementRef(function ListActionable(props, ref) {
	  const {
	    useHasFocusProps,
	    getFocusedInner
	  } = useHasFocus({});
	  const {
	    indicesByElement,
	    managedChildren,
	    useListNavigationProps,
	    useListNavigationChild,
	    navigateToIndex,
	    childCount
	  } = useListNavigation({
	    shouldFocusOnChange: getFocusedInner,
	    keyNavigation: "block"
	  });
	  const listStaticProps = useHasFocusProps(useListNavigationProps(props));
	  return e$3(ListActionableChildContext.Provider, {
	    value: useListNavigationChild,
	    children: e$3(ListStatic, {
	      role: childCount ? "toolbar" : undefined,
	      ...listStaticProps
	    })
	  });
	}));
	const ListItemActionable = g$1(forwardElementRef(function ListItemActionable(props, ref) {
	  const {
	    childrenText,
	    props: {
	      onPress: onPressAsync,
	      index,
	      hidden,
	      children,
	      ...domPropsWithoutPress
	    }
	  } = useChildrenTextProps({ ...props,
	    ref
	  });
	  const useListNavigationChild = q$1(ListActionableChildContext);
	  const {
	    useListNavigationChildProps
	  } = useListNavigationChild({
	    index,
	    text: childrenText,
	    hidden
	  });
	  const {
	    pending,
	    hasError,
	    syncHandler
	  } = useAsyncHandler(onPressAsync, {
	    capture: returnVoid
	  });
	  const domProps = useMergedProps()({
	    className: clsx("list-group-item-action", pending && "pending")
	  }, useListNavigationChildProps(usePressEventHandlers(props.disabled || pending ? undefined : syncHandler, undefined)(domPropsWithoutPress)));
	  return e$3(ProgressCircular, {
	    childrenPosition: "child",
	    mode: pending ? "pending" : null,
	    colorVariant: "info",
	    children: e$3(ListItemStatic, { ...domProps,
	      children: children
	    })
	  });
	}));

	function returnVoid() {
	  return undefined;
	}

	function isSingleProps(props) {
	  return props.select == "single" || props.onSelectChange != null;
	}

	function isMultiProps(props) {
	  return props.select == "multi";
	}

	function isSingleItemProps(props) {
	  return props.index != null && !isActionableItemProps(props);
	}

	function isMultiItemProps(props) {
	  return props.onSelectChange != null;
	}

	function isActionableItemProps(props) {
	  return props.onPress != null;
	}

	const List = g$1(forwardElementRef(function List(props, ref) {
	  if (isSingleProps(props)) return e$3(ListSingle, { ...props,
	    ref: ref
	  });else if (isMultiProps(props)) return e$3(ListMulti, { ...props,
	    ref: ref
	  }); // There's no meaningful distinction between an actionable list and a static one
	  // (on the outside at least)
	  // but also there's no harm in just always assuming an actionable list.
	  // It doesn't cost much to not use the list navigation after all.

	  return e$3(ListActionable, { ...props,
	    ref: ref
	  });
	}));
	g$1(forwardElementRef(function ListItem(props, ref) {
	  if (isSingleItemProps(props)) return e$3(ListItemSingle, { ...props,
	    ref: ref
	  });else if (isMultiItemProps(props)) return e$3(ListItemMulti, { ...props,
	    ref: ref
	  });else if (isActionableItemProps(props)) return e$3(ListItemActionable, { ...props,
	    ref: ref
	  });else return e$3(ListItemStatic, { ...props,
	    ref: ref
	  });
	}));

	const HasTypeaheadContext = D$1(false);
	const OnCloseContext = D$1(undefined);
	const UseMenuItemContext = D$1(null);

	function MenuU(_ref, ref) {
	  var _side, _align, _TransitionProps, _TransitionPropFlips, _TransitionProps2;

	  let {
	    anchor,
	    anchorEventName,
	    anchorTag,
	    children,
	    tag,
	    side,
	    align,
	    Transition,
	    TransitionProps,
	    TransitionPropFlips,
	    forceOpen,
	    ...restAnchorProps
	  } = _ref;
	  useLogRender("Menu", `Rendering Menu`);
	  (_side = side) !== null && _side !== void 0 ? _side : side = "block-end";
	  (_align = align) !== null && _align !== void 0 ? _align : align = "start";
	  let [open, setOpen] = useState(!!forceOpen);
	  open || (open = !!forceOpen);
	  const onClose = T$2(() => setOpen(false), []);

	  const onOpen = () => setOpen(true);

	  const {
	    shouldUpdate: updatingForABit,
	    onInteraction
	  } = useShouldUpdatePopper(open);
	  const {
	    useElementSizeProps
	  } = useElementSize({
	    onSizeChange: useStableCallback(onInteraction !== null && onInteraction !== void 0 ? onInteraction : () => {})
	  });
	  const {
	    useHasFocusProps,
	    getFocusedInner: getMenuHasFocusInner
	  } = useHasFocus({});
	  const {
	    usePopperArrow,
	    usePopperPopup,
	    usePopperSource,
	    logicalDirection,
	    flipTransformProps
	  } = usePopperApi({
	    align,
	    side,
	    updating: updatingForABit
	  });
	  let {
	    useMenuButton,
	    useMenuItem,
	    useMenuProps,
	    focusMenu,
	    useMenuSentinel,
	    currentTypeahead,
	    invalidTypeahead
	  } = useAriaMenu({
	    shouldFocusOnChange: getMenuHasFocusInner,
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
	  usePopperArrow();
	  const {
	    useMenuSentinelProps: useFirstMenuSentinelProps
	  } = useMenuSentinel();
	  const {
	    useMenuSentinelProps: useSecondMenuSentinelProps
	  } = useMenuSentinel(); // Set up the default transition if none was provided

	  (_TransitionProps = TransitionProps) !== null && _TransitionProps !== void 0 ? _TransitionProps : TransitionProps = {};

	  if (Transition == undefined) {
	    const sideIsBlock = side.startsWith("block");
	    const sideIsInline = !sideIsBlock;
	    const sideIsStart = side.endsWith("start");
	    Transition = ZoomFade;
	    TransitionProps[`zoomOrigin${sideIsInline ? "Block" : "Inline"}`] = 0.5;
	    TransitionProps[`zoomOrigin${sideIsBlock ? "Block" : "Inline"}`] = sideIsStart ? 1 : 0;
	    TransitionProps.zoomMin = 0.85;
	  }

	  (_TransitionPropFlips = TransitionPropFlips) !== null && _TransitionPropFlips !== void 0 ? _TransitionPropFlips : TransitionPropFlips = getDefaultFlips(Transition);

	  const onAnchorClick = () => setOpen(open => !open);

	  if (currentTypeahead && invalidTypeahead) currentTypeahead = e$3(d$2, {
	    children: [currentTypeahead, " ", e$3("i", {
	      class: "bi bi-backspace"
	    })]
	  });
	  let anchorProps = anchor.props;
	  anchorProps = useMenuButtonProps(useElementSizeProps(usePopperSourceProps(anchorProps)));
	  anchorProps = useMergedProps()(anchorProps, {
	    ref: anchor.ref
	  });
	  anchorProps = useMergedProps()(anchorProps, {
	    ref
	  });
	  anchorProps = useMergedProps()(anchorProps, {
	    [anchorEventName !== null && anchorEventName !== void 0 ? anchorEventName : "onPress"]: onAnchorClick,
	    ref: anchor.ref,
	    class: `${open ? "active" : ""}`
	  });
	  anchorProps = useMergedProps()(anchorProps, restAnchorProps);
	  return e$3(d$2, {
	    children: e$3(HasTypeaheadContext.Provider, {
	      value: !!currentTypeahead,
	      children: e$3(OnCloseContext.Provider, {
	        value: onClose,
	        children: e$3(UseMenuItemContext.Provider, {
	          value: useMenuItem,
	          children: [e$3(ProvideDefaultButtonDropdownDirection, {
	            value: side,
	            children: B(anchor, anchorProps)
	          }), e$3(BodyPortal, {
	            children: e$3("div", { ...usePopperPopupProps({
	                class: "dropdown-menu-popper"
	              }),
	              children: e$3(Tooltip, {
	                tooltip: currentTypeahead || null,
	                side: "inline-end",
	                align: "center",
	                children: e$3(Transition, { ...useMenuProps(flipTransformProps((_TransitionProps2 = TransitionProps) !== null && _TransitionProps2 !== void 0 ? _TransitionProps2 : {}, TransitionPropFlips)),
	                  show: open,
	                  onTransitionUpdate: onInteraction,
	                  exitVisibility: "hidden",
	                  children: e$3("div", { ...useHasFocusProps({
	                      className: clsx("typeahead-tooltip", invalidTypeahead ? "text-danger" : undefined)
	                    }),
	                    children: [e$3("button", { ...useFirstMenuSentinelProps({
	                        className: "visually-hidden"
	                      }),
	                      children: "Close menu"
	                    }), v$2(tag !== null && tag !== void 0 ? tag : "ul", {
	                      children,
	                      className: "dropdown-menu elevation-raised-4 elevation-body-surface"
	                    }), e$3("button", { ...useSecondMenuSentinelProps({
	                        className: "visually-hidden"
	                      }),
	                      children: "Close menu"
	                    })]
	                  })
	                })
	              })
	            })
	          })]
	        })
	      })
	    })
	  });
	}

	function MenuItemU(p, ref) {
	  let {
	    childrenText,
	    props: {
	      children,
	      disabled,
	      onPress: onPressAsync,
	      index,
	      iconStart,
	      iconEnd,
	      badge,
	      ...rest
	    }
	  } = useChildrenTextProps({ ...p,
	    ref
	  });
	  useLogRender("MenuItem", `Rendering MenuItem`);
	  const useMenuItem = q$1(UseMenuItemContext);
	  const hasTypeahead = q$1(HasTypeaheadContext);
	  const isInteractive = onPressAsync != null;
	  const {
	    useMenuItemProps
	  } = useMenuItem({
	    index,
	    text: childrenText
	  });
	  const onClose = q$1(OnCloseContext);
	  const {
	    syncHandler,
	    pending,
	    settleCount,
	    hasError
	  } = useAsyncHandler(onPressAsync ? () => {
	    var _onPressAsync;

	    return onPressAsync === null || onPressAsync === void 0 ? void 0 : (_onPressAsync = onPressAsync()) === null || _onPressAsync === void 0 ? void 0 : _onPressAsync.then(() => onClose === null || onClose === void 0 ? void 0 : onClose());
	  } : null, {
	    capture: T$2(() => {
	      return undefined;
	    }, [])
	  });
	  disabled || (disabled = pending);
	  const onPress = disabled || !onPressAsync ? null : syncHandler;
	  const newProps = useMenuItemProps(useMergedProps()(rest, {
	    ref,
	    class: clsx(onPressAsync ? "dropdown-item" : "dropdown-item-text", "dropdown-multiline", !!badge && "with-badge", !!iconStart && "with-start", !!(badge || iconEnd) && "with-end", disabled && "disabled", pending && "pending"),
	    "aria-disabled": disabled ? "true" : undefined
	  }));
	  const buttonProps = usePseudoActive(usePressEventHandlers(disabled ? null : onPress, hasTypeahead ? {
	    space: "exclude"
	  } : undefined)(newProps));

	  const childrenWithIcons = e$3(d$2, {
	    children: [iconStart && e$3("span", {
	      class: "dropdown-item-start-icon",
	      children: iconStart
	    }), children, badge && e$3("span", {
	      class: "dropdown-item-badge",
	      children: badge
	    }), iconEnd && e$3("span", {
	      className: "dropdown-item-end-icon",
	      children: iconEnd
	    })]
	  });

	  if (isInteractive) {
	    return e$3("li", {
	      children: e$3(ProgressCircular, {
	        mode: hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null,
	        childrenPosition: "child",
	        colorFill: "foreground-only",
	        colorVariant: "info",
	        children: e$3("button", { ...buttonProps,
	          children: childrenWithIcons
	        })
	      })
	    });
	  } else {
	    return e$3("li", { ...newProps,
	      children: childrenWithIcons
	    });
	  }
	}

	const Menu = g$1(forwardElementRef(MenuU));
	const MenuItem = g$1(forwardElementRef(MenuItemU));

	const UseTabContext = D$1(null);
	const UseTabPanelContext = D$1(null);
	const Tabs = g$1(forwardElementRef(function Tabs(_ref, ref) {
	  var _orientation;

	  let {
	    onSelect: onSelectAsync,
	    orientation,
	    selectedIndex,
	    selectionMode,
	    children,
	    visualVariant,
	    ...props
	  } = _ref;

	  const capture = e => {
	    return e[EventDetail].selectedIndex;
	  };

	  (_orientation = orientation) !== null && _orientation !== void 0 ? _orientation : orientation = "inline";
	  const {
	    syncHandler
	  } = useAsyncHandler(onSelectAsync, {
	    capture: capture
	  });
	  const onSelect = syncHandler;
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
	  return e$3("div", {
	    class: clsx("tabs-container", `tabs-orientation-${orientation}`),
	    children: [e$3(UseTabContext.Provider, {
	      value: useTab,
	      children: B(children[0], useTabListProps({
	        className: clsx("nav", visualVariant == "pills" ? "nav-pills" : "nav-tabs")
	      }), children[0].props.children)
	    }), e$3(UseTabPanelContext.Provider, {
	      value: useTabPanel,
	      children: e$3(Swappable, {
	        children: e$3("div", { ...useMergedProps()({
	            className: "tab-content elevation-depressed-3 elevation-body-surface"
	          }, { ...props,
	            ref
	          }),
	          children: [...children.slice(1)]
	        })
	      })
	    })]
	  });
	}));
	const Tab = g$1(forwardElementRef(function Tab(_ref2, ref) {
	  let {
	    index,
	    children,
	    ...props
	  } = _ref2;
	  const useTabContext = q$1(UseTabContext);
	  const {
	    useTabProps,
	    selected
	  } = useTabContext({
	    index,
	    text: null,
	    tag: "button"
	  });
	  return e$3("li", {
	    className: "nav-item",
	    role: "presentation",
	    children: e$3("button", { ...useTabProps(useMergedProps()({
	        ref,
	        class: clsx(`nav-link`, selected && `active`)
	      }, props)),
	      children: children
	    })
	  });
	}));
	const TabPanel = g$1(forwardElementRef(function TabPanel(_ref3, ref) {
	  var _TransitionProps;

	  let {
	    index,
	    children,
	    Transition,
	    TransitionProps,
	    ...rest
	  } = _ref3;
	  const useTabPanel = q$1(UseTabPanelContext);
	  const {
	    useTabPanelProps,
	    visible
	  } = useTabPanel({
	    index
	  });
	  (_TransitionProps = TransitionProps) !== null && _TransitionProps !== void 0 ? _TransitionProps : TransitionProps = {};

	  if (!Transition) {
	    Transition = SlideFade;
	    TransitionProps.slideTargetInline = -1;
	    TransitionProps.zoomMin = 0.85;
	  }

	  return v$2(Transition, useMergedProps()(TransitionProps, useTabPanelProps({
	    ref,
	    show: visible,
	    children,
	    ...rest
	  })));
	}));

	const PushToastContext = D$1(null);
	const UpdateToastContext = D$1(null);
	const DefaultToastTimeout = D$1(5000);
	function ToastsProvider(_ref) {
	  let {
	    children,
	    defaultTimeout
	  } = _ref;
	  const [pushToast, setPushToast] = useState(null);
	  const [updateToast, setUpdateToast] = useState(null);
	  const pushToastStable = useStableCallback(toast => {
	    var _pushToast;

	    return (_pushToast = pushToast === null || pushToast === void 0 ? void 0 : pushToast(toast)) !== null && _pushToast !== void 0 ? _pushToast : -1;
	  });
	  const updateToastStable = useStableCallback((index, toast) => {
	    return updateToast === null || updateToast === void 0 ? void 0 : updateToast(index, toast);
	  });
	  return e$3(d$2, {
	    children: e$3(DefaultToastTimeout.Provider, {
	      value: defaultTimeout !== null && defaultTimeout !== void 0 ? defaultTimeout : 5000,
	      children: [e$3(ToastsProviderHelper, {
	        setPushToast: setPushToast,
	        setUpdateToast: setUpdateToast
	      }), pushToast && updateToast && e$3(PushToastContext.Provider, {
	        value: pushToastStable,
	        children: e$3(UpdateToastContext.Provider, {
	          value: updateToastStable,
	          children: children
	        })
	      })]
	    })
	  });
	}
	function usePushToast() {
	  const pushToast = q$1(PushToastContext);
	  return pushToast;
	}

	function ToastsProviderHelper(_ref2) {
	  let {
	    setPushToast,
	    setUpdateToast
	  } = _ref2;
	  const [children, setChildren, getChildren] = useState([]);
	  const pushToast = T$2(toast => {
	    const randomKey = generateRandomId();
	    let index = getChildren().length;
	    setChildren(prev => [...prev, B(toast, {
	      key: randomKey
	    })]);
	    return index;
	  }, []);
	  const updateToast = T$2((index, toast) => {
	    var _getChildren$index;

	    const key = (_getChildren$index = getChildren()[index]) === null || _getChildren$index === void 0 ? void 0 : _getChildren$index.key;
	    console.assert(key);

	    if (key) {
	      setChildren(prev => {
	        let newChildren = prev.slice();
	        newChildren.splice(index, 1, B(toast, {
	          key: key
	        }));
	        return newChildren;
	      });
	      return index;
	    }
	  }, []);
	  h$1(() => {
	    setPushToast(_ => pushToast);
	  }, [pushToast]);
	  h$1(() => {
	    setUpdateToast(_ => updateToast);
	  }, [updateToast]);
	  return e$3(BodyPortal, {
	    children: e$3(ToastsContainerChildrenContext.Provider, {
	      value: children,
	      children: e$3(ToastsContainer, {})
	    })
	  });
	}

	const ToastsContainerChildrenContext = D$1([]);
	const UseToastContext = D$1(null);

	function ToastsContainer(props) {
	  const children = q$1(ToastsContainerChildrenContext);
	  const {
	    useToast,
	    useToastContainerProps
	  } = useToasts();
	  const [theme, setTheme] = useState(oppositeTheme());
	  _$1(() => {
	    const mo = new MutationObserver(info => {
	      for (let i of info) {
	        if (i.attributeName === "class") {
	          setTheme(oppositeTheme());
	        }
	      }
	    });
	    mo.observe(document.documentElement, {
	      attributeFilter: ["class"]
	    });
	    return () => mo.disconnect();
	  }, []);
	  return e$3(UseToastContext.Provider, {
	    value: useToast,
	    children: e$3("div", { ...useToastContainerProps(useMergedProps()({
	        className: `set-theme ${theme}`
	      }, props)),
	      children: children
	    })
	  });
	}

	function oppositeTheme() {
	  if (document.documentElement.classList.contains("theme-dark")) return "theme-light";else if (document.documentElement.classList.contains("theme-light")) return "theme-dark";else return "";
	}

	const ToastDismissContext = D$1(null);
	function Toast(_ref3) {
	  let {
	    timeout,
	    politeness,
	    colorVariant,
	    children
	  } = _ref3;
	  const useToast = q$1(UseToastContext);
	  const defaultTimeout = q$1(DefaultToastTimeout);
	  const {
	    useToastProps,
	    dismiss,
	    status
	  } = useToast({
	    timeout: timeout !== null && timeout !== void 0 ? timeout : defaultTimeout,
	    politeness
	  });
	  const show = status != "dismissed";
	  return e$3(ToastDismissContext.Provider, {
	    value: dismiss,
	    children: e$3(SlideFade, {
	      show: show,
	      slideTargetInline: 1,
	      animateOnMount: show,
	      exitVisibility: "removed",
	      children: e$3("div", { ...useToastProps({
	          class: clsx("toast show", colorVariant && `text-bg-${colorVariant}`)
	        }),
	        children: e$3("div", {
	          class: "d-flex",
	          children: [e$3("div", {
	            class: "toast-body",
	            children: children
	          }), e$3(Button, {
	            class: "btn-close me-2 m-auto",
	            "aria-label": "Dismiss alert",
	            onPress: dismiss
	          })]
	        })
	      })
	    })
	  });
	}

	const Card = g$1(forwardElementRef(function Card(p, ref) {
	  let {
	    children,
	    ...props
	  } = p;
	  return e$3("div", { ...useMergedProps()({
	      ref,
	      className: "card elevation-raised-1 elevation-body-surface"
	    }, props),
	    children: children
	  });
	}));

	function CardElement2(_ref, ref) {
	  let {
	    children,
	    ...p
	  } = _ref;

	  switch (p.type) {
	    default:
	    case "paragraph":
	      {
	        const {
	          type,
	          ...props
	        } = p;
	        return e$3(CardBody, { ...props,
	          ref: ref,
	          children: e$3(CardText, {
	            children: children
	          })
	        });
	      }

	    case "footer":
	      {
	        const {
	          type,
	          ...props
	        } = p;
	        return e$3(CardFooter, { ...props,
	          ref: ref,
	          children: children
	        });
	      }

	    case "subtitle":
	      {
	        const {
	          type,
	          tag,
	          ...props
	        } = p;
	        return e$3(CardSubtitle, {
	          tag: tag,
	          ...useMergedProps()({
	            className: "card-body"
	          }, props),
	          ref: ref,
	          children: children
	        });
	      }

	    case "title":
	      {
	        const {
	          type,
	          tag,
	          ...props
	        } = p;
	        return e$3(CardTitle, {
	          tag: tag,
	          ...useMergedProps()({
	            className: "card-body"
	          }, props),
	          ref: ref,
	          children: children
	        });
	      }

	    case "image":
	      {
	        const {
	          type,
	          src,
	          ...props
	        } = p;
	        return e$3(CardImage, {
	          src: src,
	          position: "both",
	          ...props,
	          ref: ref,
	          children: children
	        });
	      }

	    case "flush":
	      {
	        const {
	          tag,
	          ...props
	        } = p;
	        return v$2(tag, props, children);
	      }
	  }
	}

	const CardElement = g$1(forwardElementRef(CardElement2));
	const CardImage = g$1(forwardElementRef(function CardImage(p, ref) {
	  const {
	    position,
	    ...props
	  } = p;
	  return e$3("img", { ...useMergedProps()(props, {
	      ref,
	      className: `card-img${position == "both" ? "" : `-${position}`}`
	    })
	  });
	}));
	const CardBody = g$1(forwardElementRef(function CardBody(props, ref) {
	  return e$3("div", { ...useMergedProps()(props, {
	      ref,
	      className: "card-body"
	    })
	  });
	}));
	const CardFooter = g$1(forwardElementRef(function CardHeader(props, ref) {
	  return e$3("div", { ...useMergedProps()(props, {
	      ref,
	      className: "card"
	    })
	  });
	}));
	const CardTitle = g$1(forwardElementRef(function CardTitle(p, ref) {
	  const {
	    tag,
	    ...props
	  } = p;
	  return v$2(tag !== null && tag !== void 0 ? tag : "h5", useMergedProps()(props, {
	    ref,
	    className: "card-title"
	  }));
	}));
	const CardSubtitle = g$1(forwardElementRef(function CardSubtitle(p, ref) {
	  const {
	    tag,
	    ...props
	  } = p;
	  return v$2(tag !== null && tag !== void 0 ? tag : "h5", useMergedProps()(props, {
	    ref,
	    className: clsx("card-subtitle", "mb-2", "text-muted")
	  }));
	}));
	const CardText = g$1(forwardElementRef(function CardText(props, ref) {
	  return e$3("div", { ...useMergedProps()(props, {
	      ref,
	      className: "card-text"
	    })
	  });
	}));
	g$1(forwardElementRef(function CardHeader(props, ref) {
	  return e$3("div", { ...useMergedProps()(props, {
	      ref,
	      className: "card-header"
	    })
	  });
	}));

	function DemoButtons() {
	    const [buttonsFill, setButtonsFill] = useState("outline");
	    const [buttonsSize, setButtonsSize] = useState("md");
	    const [buttonsColor, setButtonsColor] = useState("primary");
	    const [buttonsDisabled, setButtonsDisabled] = useState(false);
	    const [toggleOn, setToggleOn] = useState(false);
	    const [asyncTimeout, setAsyncTimeout] = useState(3000);
	    const [usesAsync, setUsesAsync] = useState(true);
	    const [asyncFails, setAsyncFails] = useState(false);
	    const [usesLinkButton, setUsesLinkButton] = useState(true);
	    const pushToast = usePushToast();
	    const onPressSync = () => void (pushToast(e$3(Toast, { children: "Button was clicked" })));
	    const onPressAsync = async () => {
	        await sleep$6(asyncTimeout ?? 0);
	        if (asyncFails)
	            throw new Error("Button operation failed.");
	        else
	            onPressSync();
	    };
	    const onPress = usesAsync ? onPressAsync : onPressSync;
	    const onToggleInputAsync = async (b) => {
	        await sleep$6(asyncTimeout ?? 0);
	        if (asyncFails)
	            throw new Error("Button operation failed.");
	        else
	            setToggleOn(b);
	    };
	    const onToggleInput = usesAsync ? onToggleInputAsync : setToggleOn;
	    return (e$3(ProvideDefaultButtonFill, { value: buttonsFill, children: e$3(ProvideDefaultButtonSize, { value: buttonsSize, children: e$3(ProvideDefaultButtonColor, { value: buttonsColor, children: e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Buttons" }), e$3(CardElement, { children: e$3(Button, { onPress: onPress, children: "I'm a button" }) }), e$3(CardElement, { children: ["A ", e$3("code", { children: "Button" }), " is a ", e$3("code", { children: "Button" }), " is a ", e$3("code", { children: "Button" }), " \u2013 you can click, tap, or Space-key it to activate it and do something.  If the given action is asynchronous, then the button will disable itself and display a spinner during the operation."] }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Async inputs" }), e$3(CardElement, { children: ["The ", e$3("code", { children: "onPress" }), " event handler for buttons can be sync or async, and they will react appropriately if the operation takes long enough.", e$3(InputGrid, { children: [e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setUsesAsync, checked: usesAsync, labelPosition: "start", children: "Use async handler" }) }), e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync, children: "Async handler rejects" }) }), e$3(InputGroup, { children: e$3(Input, { width: "8ch", disabled: !usesAsync, type: "number", onValueChange: setAsyncTimeout, value: asyncTimeout, children: "Async timeout" }) })] })] }), e$3(CardElement, { children: e$3(Button, { onPress: onPress, children: "Click me" }) }), e$3(CardElement, { type: "paragraph", children: e$3("code", { children: `const onPress = ${usesAsync ? `async ` : ""}() => { ${usesAsync ? `await sleep(${asyncTimeout}); ` : ""}pushToast(<Toast ... />); }
<Button onPress={onPress}>Click me</Button>` }) }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Color, fill, & size" }), e$3(CardElement, { type: "paragraph", children: ["Buttons can be styled in different sizes, colors, and fill styles. You can provide a global default with ", e$3("code", { children: "Context" }), " objects, like ", e$3("code", { children: "<ProvideDefaultButtonFill>" }), "."] }), e$3(CardElement, { children: "All the normal Bootstrap colors are provided, albeit with adjustments to outlined buttons to ensure correct contrast ratios on the theme's body BG color.  Additionally, besides the `light` and `dark` colors, `subtle` and `contrast` are available as colors to use that simply map onto `light` or `dark` depending on the body BG color." }), e$3(CardElement, { children: e$3(ButtonGroup, { children: [e$3(ButtonGroupChild, { index: 0, onPressToggle: () => setButtonsSize("sm"), pressed: buttonsSize === "sm", children: "Small" }), e$3(ButtonGroupChild, { index: 1, onPressToggle: () => setButtonsSize("md"), pressed: buttonsSize === "md", children: "Medium" }), e$3(ButtonGroupChild, { index: 2, onPressToggle: () => setButtonsSize("lg"), pressed: buttonsSize === "lg", children: "Large" })] }) }), e$3(CardElement, { children: e$3(ButtonGroup, { children: [e$3(ButtonGroupChild, { index: 0, onPressToggle: () => setButtonsFill("fill"), pressed: buttonsFill === "fill", children: "Fill" }), e$3(ButtonGroupChild, { index: 1, onPressToggle: () => setButtonsFill("outline"), pressed: buttonsFill === "outline", children: "Outline" })] }) }), e$3(CardElement, { children: e$3(Checkbox, { checked: !!buttonsDisabled, onCheck: setButtonsDisabled, children: "Disabled" }) }), e$3(CardElement, { children: e$3(ButtonGroup, { wrap: true, children: [e$3(ButtonGroupChild, { index: 0, colorVariant: "primary", pressed: buttonsColor == "primary", onPressToggle: () => setButtonsColor("primary"), children: "Primary" }), e$3(ButtonGroupChild, { index: 1, colorVariant: "secondary", pressed: buttonsColor == "secondary", onPressToggle: () => setButtonsColor("secondary"), children: "Secondary" }), e$3(ButtonGroupChild, { index: 2, colorVariant: "success", pressed: buttonsColor == "success", onPressToggle: () => setButtonsColor("success"), children: "Success" }), e$3(ButtonGroupChild, { index: 3, colorVariant: "warning", pressed: buttonsColor == "warning", onPressToggle: () => setButtonsColor("warning"), children: "Warning" }), e$3(ButtonGroupChild, { index: 4, colorVariant: "danger", pressed: buttonsColor == "danger", onPressToggle: () => setButtonsColor("danger"), children: "Danger" }), e$3(ButtonGroupChild, { index: 5, colorVariant: "info", pressed: buttonsColor == "info", onPressToggle: () => setButtonsColor("info"), children: "Info" }), e$3(ButtonGroupChild, { index: 6, colorVariant: "light", pressed: buttonsColor == "light", onPressToggle: () => setButtonsColor("light"), children: "Light" }), e$3(ButtonGroupChild, { index: 7, colorVariant: "dark", pressed: buttonsColor == "dark", onPressToggle: () => setButtonsColor("dark"), children: "Dark" }), e$3(ButtonGroupChild, { index: 8, colorVariant: "contrast", pressed: buttonsColor == "contrast", onPressToggle: () => setButtonsColor("contrast"), children: "Contrast" }), e$3(ButtonGroupChild, { index: 9, colorVariant: "subtle", pressed: buttonsColor == "subtle", onPressToggle: () => setButtonsColor("subtle"), children: "Subtle" })] }) }), e$3(CardElement, { children: e$3(Button, { onPress: onPress, disabled: buttonsDisabled, children: [buttonsFill === "fill" ? "Filled" : "Outlined", " ", buttonsColor, " button"] }) }), e$3(CardElement, { children: e$3("code", { children: `<Button fillVariant="${buttonsFill}" colorVariant="${buttonsColor}">Variant button</Button>` }) }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Link buttons" }), e$3(CardElement, { children: ["A link can be styled as a button while retaining native link functionality (middle clicks, etc.). These buttons have no ", e$3("code", { children: "onPress" }), " handler, instead taking ", e$3("code", { children: "href" }), " and the other ", e$3("code", { children: "<a>" }), " props."] }), e$3(CardElement, { children: ["A ", e$3("code", { children: "<Button>" }), " will use an anchor link internally if you provide it with an ", e$3("code", { children: "href" }), " prop, or optionally setting the ", e$3("code", { children: "tag" }), " prop to ", e$3("code", { children: "a" }), ".", e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setUsesLinkButton, checked: usesLinkButton, labelPosition: "start", children: "Use link button" }) })] }), e$3(CardElement, { children: usesLinkButton ? e$3(Button, { disabled: buttonsDisabled, target: "_blank", href: "https://www.example.com", fillVariant: buttonsFill, children: ["example.com ", e$3("i", { class: "bi bi-box-arrow-up-right" })] }) : e$3(Button, { onPress: onPress, disabled: buttonsDisabled, fillVariant: buttonsFill, children: "Regular button" }) }), e$3(CardElement, { type: "paragraph", children: e$3("code", { children: usesLinkButton ? `<Button href="https://www.example.com">Link button</Button>` : `<Button onPress={onPress}>Regular button</Button>` }) }), e$3(CardElement, { children: "Keep in mind that styling a link as a button can cause confusion even while being completely compliant (\"\uD83E\uDDD1\u200D\uD83D\uDCBB click on the link\" \"\uD83D\uDE16 what link??\"), so be sure to use with a decent amount of caution." }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Toggle buttons" }), e$3(CardElement, { children: ["If given a ", e$3("code", { children: "pressed" }), " prop, a button will become a toggle button, with an off/on state.  It will style itself as outlined when unpressed, and filled when pressed, so they are best used in groups."] }), e$3(CardElement, { children: e$3(Button, { pressed: toggleOn, onPressToggle: onToggleInput, disabled: buttonsDisabled, children: "Toggle button" }) }), e$3(CardElement, { type: "paragraph", children: e$3("code", { children: `<Button pressed={pressed} onPressToggle={onInput}>Toggle button</Button>` }) }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Button Groups" }), e$3(CardElement, { children: ["A ", e$3("code", { children: "<ButtonGroup>" }), " can be used to group a set of ", e$3("code", { children: "<ButtonGroupChild>" }), " (which is the exact same as a ", e$3("code", { children: "<Button>" }), ", but with an ", e$3("code", { children: "index" }), " prop). This gives them keyboard navigation abilities."] }), e$3(CardElement, { children: e$3(ButtonGroup, { wrap: true, children: [e$3(ButtonGroupChild, { index: 0, disabled: buttonsDisabled, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress, children: "First button" }), e$3(ButtonGroupChild, { index: 1, disabled: buttonsDisabled, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress, children: "Second button" }), e$3(ButtonGroupChild, { index: 2, disabled: buttonsDisabled, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress, children: "Third button" }), e$3(ButtonGroupChild, { index: 3, disabled: buttonsDisabled, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress, children: "Fourth button" })] }) }), e$3(CardElement, { type: "paragraph", children: e$3("code", { children: `<ButtonGroup wrap>
    <ButtonGroupChild index={0}>First button</ButtonGroupChild>
    <ButtonGroupChild index={1}>Second button</ButtonGroupChild>
    <ButtonGroupChild index={2}>Third button</ButtonGroupChild>
    <ButtonGroupChild index={3}>Fourth button</ButtonGroupChild>
    <ButtonGroupChild index={4}>Fifth button</ButtonGroupChild>
    <ButtonGroupChild index={5}>Sixth button</ButtonGroupChild>
    <ButtonGroupChild index={6}>Seventh button</ButtonGroupChild>
    <ButtonGroupChild index={7}>Eighth button</ButtonGroupChild>
</ButtonGroup>` }) })] }) }) }) }) }));
	}
	async function sleep$6(arg0) {
	    return new Promise(resolve => setTimeout(resolve, arg0));
	}

	function DemoChecks() {
	    const [asyncFails, setAsyncFails] = useState(false);
	    const [asyncTimeout, setAsyncTimeout] = useState(3000);
	    const [usesAsync, setUsesAsync] = useState(true);
	    const [tristate, setTristate] = useState(false);
	    const [demoChecked, setDemoChecked] = useState(false);
	    const [demoRadio, setDemoRadio] = useState(0);
	    const [radioCount, setRadioCount] = useState(3);
	    const [disabled, setDisabled] = useState(false);
	    const [labelPosition, setLabelPosition] = useState("end");
	    const asyncCheckboxInput = T$2(async (checked) => {
	        await sleep$5(asyncTimeout ?? 0);
	        if (asyncFails)
	            throw new Error("Attempt to change checkbox & radio failed");
	        setDemoChecked(checked);
	    }, [asyncTimeout, asyncFails]);
	    const asyncRadioInput = T$2(async (value) => {
	        await sleep$5(asyncTimeout ?? 0);
	        if (asyncFails)
	            throw new Error("Attempt to change radio failed");
	        setDemoRadio(value);
	    }, [asyncTimeout, asyncFails]);
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Checkboxes, switches, & radios" }), e$3(CardElement, { children: e$3(Checkbox, { checked: demoChecked, tristate: tristate, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked, children: "I'm a checkbox" }) }), e$3(CardElement, { children: ["Several components related to on/off togglable form-like selection controls are provided:", e$3("ul", { children: [e$3("li", { children: e$3("code", { children: "Checkbox" }) }), e$3("li", { children: e$3("code", { children: "Switch" }) }), e$3("li", { children: e$3("code", { children: "RadioGroup" }) }), e$3("li", { children: e$3("code", { children: "CheckboxGroup" }) })] }), e$3("code", { children: "Checkbox" }), " and ", e$3("code", { children: "Switch" }), " work as you'd expect, though ", e$3("code", { children: "Checkbox" }), "comes with a ", e$3("code", { children: "tristate" }), " prop that no other toggle has. ", e$3("code", { children: "RadioGroup" }), " is a parent around a set of ", e$3("code", { children: "Radio" }), " components that communicate with each other. The children ", e$3("code", { children: "Radio" }), " components can be any descendant of the parent ", e$3("code", { children: "RadioGroup" }), " \u2013 the DOM structure ", e$3("em", { children: "does not" }), " matter beyond requiring they be somewhere descendant. ", e$3("code", { children: "CheckboxGroup" }), " works similarly to ", e$3("code", { children: "RadioGroup" }), " in that way."] }), e$3(CardElement, { children: ["See Also: Single Select lists for an alternative to ", e$3("code", { children: "RadioGroup" }), ", and Multi Select lists for an alternative to ", e$3("code", { children: "CheckboxGroup" }), "."] }), e$3(CardElement, { children: "Like other components, the event handlers can be sync or async, and when disabled, all inputs remain focusable so that they can still be announced by screen readers, have tooltips via mouseover, etc." }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Checkbox" }), e$3(CardElement, { children: e$3(Checkbox, { disabled: disabled, checked: demoChecked, tristate: tristate, labelPosition: labelPosition, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked, children: "Checkbox" }) }), e$3(CardElement, { children: ["The ", e$3("code", { children: "checked" }), " prop can be ", e$3("code", { children: "true" }), ", ", e$3("code", { children: "false" }), ", or ", e$3("code", { children: "mixed" }), ". The ", e$3("code", { children: "onCheck" }), " event fires when the user initiates a change."] }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Switch" }), e$3(CardElement, { children: e$3(Switch, { disabled: disabled, checked: demoChecked, labelPosition: labelPosition, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked, children: "Switch" }) }), e$3(CardElement, { children: ["In terms of props (not use-case), largely identical to a ", e$3("code", { children: "Checkbox" }), ", though it cannot have a ", e$3("code", { children: "mixed" }), " state."] }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Radio group" }), e$3(CardElement, { children: e$3(RadioGroup, { name: "radio-demo-0", selectedValue: demoRadio, onValueChange: usesAsync ? asyncRadioInput : setDemoRadio, children: Array.from(function* () {
	                            for (let i = 0; i < (radioCount ?? 0); ++i) {
	                                yield e$3(Radio, { disabled: disabled, labelPosition: labelPosition, index: i, value: i, children: ["Radio #", i + 1] }, i);
	                            }
	                        }()) }) }), e$3(CardElement, { children: ["The individual ", e$3("code", { children: "RadioButton" }), "s ", e$3("strong", { children: "do not" }), " accept a ", e$3("code", { children: "checked" }), " prop; instead, the parent ", e$3("code", { children: "RadioGroup" }), " accepts a ", e$3("code", { children: "selectedValue" }), ". Similarly, the ", e$3("code", { children: "onValueChange" }), " event handler lives on that parent ", e$3("code", { children: "RadioGroup" }), ". The individual child ", e$3("code", { children: "Radio" }), "s can be, e.g., marked as ", e$3("code", { children: "disabled" }), ", styled, etc. but all the logic happens with the parent."] }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Demos" }), e$3(CardElement, { children: e$3(InputGrid, { children: [e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setUsesAsync, checked: usesAsync, labelPosition: "start", children: "Async event handler" }) }), e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync, children: "Async handler rejects" }) }), e$3(InputGroup, { children: e$3(Input, { disabled: !usesAsync, type: "number", onValueChange: setAsyncTimeout, value: asyncTimeout, children: "Async timeout" }) }), e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setTristate, checked: tristate, labelPosition: "start", children: "Tri-state checkbox" }) }), e$3(InputGroup, { children: e$3(Input, { type: "number", onValueChange: setRadioCount, value: radioCount, children: "# of radio buttons" }) }), e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setDisabled, checked: disabled, labelPosition: "start", children: "Inputs disabled" }) }), e$3(RadioGroup, { name: "radio-demo-6", selectedValue: labelPosition, onValueChange: setLabelPosition, children: [e$3(InputGroup, { children: e$3(Radio, { index: 0, value: "start", labelPosition: "start", children: "Label before" }) }), e$3(InputGroup, { children: e$3(Radio, { index: 1, value: "end", labelPosition: "start", children: "Label after" }) }), e$3(InputGroup, { children: e$3(Radio, { index: 2, value: "hidden", labelPosition: "start", children: "Label hidden" }) }), e$3(InputGroup, { children: e$3(Radio, { index: 3, value: "tooltip", labelPosition: "start", children: "Tooltip label" }) }), e$3(InputGroup, { children: e$3(Radio, { index: 4, value: "button", labelPosition: "start", children: "Button" }) })] })] }) }), e$3(GridStatic, { columns: 2, children: [e$3(CardElement, { children: [e$3(Checkbox, { disabled: disabled, checked: demoChecked, tristate: tristate, labelPosition: labelPosition, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked, children: "Checkbox" }), e$3(Switch, { disabled: disabled, checked: demoChecked, labelPosition: labelPosition, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked, children: "Switch" }), e$3(RadioGroup, { name: "radio-demo-1a", selectedValue: demoRadio, onValueChange: usesAsync ? asyncRadioInput : setDemoRadio, children: Array.from(function* () {
	                                        for (let i = 0; i < (radioCount ?? 0); ++i) {
	                                            yield e$3(Radio, { disabled: disabled, labelPosition: labelPosition, index: i, value: i, children: ["Radio #", i + 1] }, i);
	                                        }
	                                    }()) })] }), e$3(CardElement, { children: e$3(InputGrid, { children: [e$3(InputGroup, { children: e$3(Checkbox, { disabled: disabled, labelPosition: labelPosition, checked: demoChecked, tristate: tristate, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked, children: "Checkbox" }) }), e$3(InputGroup, { children: e$3(Switch, { disabled: disabled, labelPosition: labelPosition, checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked, children: "Switch" }) }), e$3(RadioGroup, { name: "radio-demo-1b", selectedValue: demoRadio, onValueChange: usesAsync ? asyncRadioInput : setDemoRadio, children: Array.from(function* () {
	                                            for (let i = 0; i < (radioCount ?? 0); ++i) {
	                                                yield e$3(InputGroup, { children: e$3(Radio, { disabled: disabled, labelPosition: labelPosition, index: i, value: i, children: ["Radio #", i + 1] }, i) });
	                                            }
	                                        }()) })] }) }), e$3(CardElement, {})] }), e$3(CardElement, { type: "paragraph", children: e$3("code", { children: `<Checkbox checked={checked} tristate={tristate} onCheck={setChecked}>Checkbox</Checkbox>
<Switch checked={checked} onCheck={onInput}>Switch</Switch>
<RadioGroup name="radio-demo-1" selectedValue={value} onValueChange={setValue}>
<Radio index={0} value="value1">Radio #1</Radio>
<Radio index={1} value="value2">Radio #2</Radio>
<Radio index={2} value="value3">Radio #3</Radio>
</RadioGroup>` }) })] }) }));
	}
	async function sleep$5(arg0) {
	    return new Promise(resolve => setTimeout(resolve, arg0));
	}

	function DemoDialogs() {
	    const [show, setShow] = useState(null);
	    useState("start");
	    useState("block-end");
	    useState(false);
	    useState(3000);
	    useState(true);
	    useState(false);
	    useState(true);
	    useState(true);
	    const pushDialog = usePushDialog();
	    const onPressAsync = () => pushDialog(e$3(Dialog, { descriptive: false, children: "Dialog item was clicked" }));
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Dialogs" }), e$3(CardElement, { children: e$3(Button, { onPress: () => pushDialog(e$3(Dialog, { descriptive: false, children: "This is a dialog!" })), children: "Open a dialog" }) }), e$3(CardElement, { children: [e$3("code", { children: "<Dialog>" }), "s are a way to show the user (read: force the user to at least skim) some amount of information or other content. They can either be controlled or uncontrolled; controlled ", e$3("code", { children: "<Dialog>" }), "s take ", e$3("code", { children: "open" }), " and ", e$3("code", { children: "onClose" }), " props, while uncontrolled ", e$3("code", { children: "<Dialog>" }), "s give you a ", e$3("code", { children: "async show()" }), " function to call, or can be used from ", e$3("code", { children: "useShowDialog" }), "."] }), e$3(CardElement, { children: e$3(Button, { onPress: onPressAsync, children: e$3("code", { children: "usePushDialog" }) }) }), e$3(CardElement, { children: [e$3(Button, { onPress: show ?? undefined, children: e$3("code", { children: ["<Dialog provideShow=", "{provideShow}", " />"] }) }), e$3(Dialog, { descriptive: false, provideShow: setShow, children: "This is a dialog" })] }), e$3(CardElement, { children: ["The easiest way to use them is via the ", e$3("code", { children: "useShowDialog" }), " hook. Pass the returned ", e$3("code", { children: "showDialog" }), " function a ", e$3("code", { children: "<Dialog>" }), " and it will be shown on the screen, with the function returning a promise that resolves when ", e$3("code", { children: "onClose" }), " would be called (if you pass your own ", e$3("code", { children: "onClose" }), " you will override this behavior which can be used if you need to prevent the dialog from closing when clicking the backdrop; use a ", e$3("code", { children: "<CloseDialogButton>" }), " or within your own component pass ", e$3("code", { children: "useCloseDialog" }), "'s returned function to close the dialog during your own ", e$3("code", { children: "onClose" }), ")."] }), e$3(CardElement, { children: "All components that use Portals to position themselves on the body will reposition themselves with the dialog as their parent instead, ensuring they still work as expected." }), e$3(CardElement, { children: e$3(Button, { onPress: () => pushDialog(e$3(Dialog, { descriptive: false, children: "This is a dialog!" })), children: "Open a dialog" }) })] }) }));
	}

	const Icon = g$1(forwardElementRef(function Icon(_ref, ref2) {
	  let {
	    label,
	    tooltip,
	    role,
	    "aria-label": ariaLabel,
	    children,
	    ref: ref3,
	    ...props
	  } = _ref;
	  const iconProps = useMergedProps()(props, {
	    class: "icon",
	    [children.type === "img" ? "alt" : "aria-label"]: ariaLabel || (label !== null && label !== void 0 ? label : undefined),
	    role: role || (label ? "img" : "presentation"),
	    ref: useMergedRefs()({
	      ref: ref2
	    }, {
	      ref: ref3
	    })
	  });
	  const iconElement = B(children, useMergedProps()(children.props, iconProps)); //<i {...props} role={label? "img" : "presentation"} aria-label={ariaLabel || (label ?? undefined)} ref={ref} />;

	  if (tooltip) return e$3(Tooltip, {
	    tooltip: tooltip,
	    children: iconElement
	  });
	  return iconElement;
	}));

	/**
	 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
	 *
	 *
	 */

	const FontIcon = g$1(forwardElementRef(function FontIcon(props, ref) {
	  return e$3(Icon, { ...props,
	    ref: ref,
	    children: e$3("i", {
	      class: "font-icon"
	    })
	  });
	}));

	/**
	 * Specialization of a FontIcon to display any given Bootstrap icon.
	 */

	const BootstrapIcon = g$1(forwardElementRef(function BootstrapIcon(_ref, ref) {
	  let {
	    icon,
	    label,
	    tooltip,
	    ...props
	  } = _ref;
	  // Merge our custom CSS class with any additional classes that were passed in to this component
	  const mergedProps = useMergedProps()({
	    class: `bi bi-${icon}`
	  }, props); // Render the actual FontIcon

	  return e$3(FontIcon, { ...mergedProps,
	    label: label,
	    tooltip: tooltip,
	    ref: ref
	  });
	})); // Probably a better way to get all these names

	function DemoInputs() {
	    const [asyncFails, setAsyncFails] = useState(false);
	    const [asyncTimeout, setAsyncTimeout] = useState(3000);
	    const [usesAsync, setUsesAsync] = useState(true);
	    const [text, setText] = useState("");
	    const [number, setNumber] = useState(0);
	    const [size, setSize] = useState("md");
	    const asyncTextInput = T$2(async (text) => {
	        await sleep$4(asyncTimeout ?? 0);
	        if (asyncFails)
	            throw new Error("Attempt to change text failed");
	        setText(text);
	    }, [asyncTimeout, asyncFails]);
	    const asyncNumberInput = T$2(async (value) => {
	        await sleep$4(asyncTimeout ?? 0);
	        if (asyncFails)
	            throw new Error("Attempt to change number failed");
	        setNumber(value);
	    }, [asyncTimeout, asyncFails]);
	    const [prefix, setPrefix] = useState(null);
	    const [suffix, setSuffix] = useState(null);
	    const onTextInput = usesAsync ? asyncTextInput : setText;
	    const onNumberInput = usesAsync ? asyncNumberInput : setNumber;
	    const p = (prefix == "icon" ? e$3(BootstrapIcon, { icon: "pencil", label: "Edit" }) : prefix == "button" ? e$3(Button, { colorVariant: "subtle", children: e$3(BootstrapIcon, { icon: "pencil", label: "Edit" }) }) : null);
	    const s = (suffix == "icon" ? e$3(BootstrapIcon, { icon: "check", label: "Correct" }) : suffix == "button" ? e$3(Button, { colorVariant: "subtle", children: e$3(BootstrapIcon, { icon: "check", label: "Correct" }) }) : null);
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Text boxes" }), e$3(CardElement, { children: e$3("div", { class: "position-relative", children: e$3(Input, { type: "text", value: text, onValueChange: onTextInput, children: "I'm a text box" }) }) }), e$3(CardElement, { children: [e$3("code", { children: "<Input>" }), " components allow for inputting text, numbers, etc. and asyncronously saving it somewhere else as it's being typed."] }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Async inputs" }), e$3(CardElement, { children: ["The ", e$3("code", { children: "onInput" }), " event handler for all types of inputs can be sync or async.", e$3(InputGrid, { children: [e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setUsesAsync, checked: usesAsync, labelPosition: "start", children: "Async event handler" }) }), e$3(InputGroup, { children: e$3(Checkbox, { onCheck: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync, children: "Async handler rejects" }) }), e$3(InputGroup, { children: e$3(Input, { disabled: !usesAsync, type: "number", onValueChange: setAsyncTimeout, value: asyncTimeout, prefix: p, suffix: s, children: "Async timeout" }) })] })] }), e$3(CardElement, { children: [e$3("div", { class: "position-relative", children: e$3(Input, { type: "text", value: text, onValueChange: onTextInput, prefix: p, suffix: s, children: "Text-based input" }) }), e$3("div", { class: "position-relative", children: e$3(Input, { type: "number", value: number, onValueChange: onNumberInput, prefix: p, suffix: s, min: -5, children: "Number-based input" }) }), e$3("div", { class: "position-relative", children: e$3(Input, { type: "textarea", value: text, onValueChange: onTextInput, prefix: p, suffix: s, rows: 5, children: "Textarea" }) })] }), e$3(CardElement, { type: "paragraph", children: e$3("code", { children: `<Input type="text" value={text} onInput={onTextInput}>Text-based input</Input>
<Input type="number" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input>` }) }), e$3(CardElement, { children: "Icons or other content can be placed at the start or end of the input:" }), e$3(CardElement, { children: [e$3(ButtonGroup, { children: [e$3(ButtonGroupChild, { pressed: prefix == null, onPressToggle: () => setPrefix(null), index: 0, children: "No prefix" }), e$3(ButtonGroupChild, { pressed: prefix == "icon", onPressToggle: () => setPrefix("icon"), index: 1, children: "Icon" }), e$3(ButtonGroupChild, { pressed: prefix == "button", onPressToggle: () => setPrefix("button"), index: 2, children: "Button" })] }), e$3(ButtonGroup, { children: [e$3(ButtonGroupChild, { pressed: suffix == null, onPressToggle: () => setSuffix(null), index: 0, children: "No prefix" }), e$3(ButtonGroupChild, { pressed: suffix == "icon", onPressToggle: () => setSuffix("icon"), index: 1, children: "Icon" }), e$3(ButtonGroupChild, { pressed: suffix == "button", onPressToggle: () => setSuffix("button"), index: 2, children: "Button" })] })] }), e$3(CardElement, { type: "paragraph", children: ["When placed in an ", e$3("code", { children: "<InputGroup>" }), ", the styling will be significantly different:"] }), e$3(CardElement, { children: e$3(ButtonGroup, { children: [e$3(ButtonGroupChild, { index: 0, pressed: size == "sm", onPressToggle: e => setSize("sm"), children: "Small" }), e$3(ButtonGroupChild, { index: 1, pressed: size == "md", onPressToggle: e => setSize("md"), children: "Medium" }), e$3(ButtonGroupChild, { index: 2, pressed: size == "lg", onPressToggle: e => setSize("lg"), children: "Large" })] }) }), e$3(CardElement, { children: e$3(InputGrid, { children: [e$3(InputGroup, { size: size, children: e$3(Input, { type: "text", value: text, onValueChange: onTextInput, prefix: p, suffix: s, children: "Text-based input" }) }), e$3(InputGroup, { size: size, children: e$3(Input, { type: "number", value: number, onValueChange: onNumberInput, prefix: p, suffix: s, min: -5, children: "Number-based input" }) }), e$3(InputGroup, { size: size, children: e$3(Input, { type: "textarea", value: text, onValueChange: onTextInput, prefix: p, suffix: s, rows: 5, children: "Textarea" }) })] }) }), e$3(CardElement, { type: "paragraph", children: e$3("code", { children: `<InputGrid>
    <InputGroup size={size}><Input type="text" value={text} onInput={onTextInput}>Text-based input</Input></InputGroup>
    <InputGroup size={size}><Input type="number" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input></InputGroup>
</InputGrid>` }) })] }) }));
	}
	async function sleep$4(arg0) {
	    return new Promise(resolve => setTimeout(resolve, arg0));
	}

	function DemoLayout() {
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Layout" }), e$3(CardElement, { children: "A number of utility components and CSS classes are provided to make it easier to create quick and dirty layouts." }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Simple grids" }), e$3(CardElement, { children: ["Two different grid components are provided for two separate use cases:", e$3("ul", { children: [e$3("li", { children: ["<", e$3("code", { children: "GridResponsive" }), ">, which takes a minimum column size and fits as many columns as possible given that constraint"] }), e$3("li", { children: ["<", e$3("code", { children: "GridStatic" }), ">, which takes a minimum column count and fits that many columns in no matter the resulting size and/or jankiness"] })] })] }), e$3(CardElement, { type: "subtitle", tag: "h3", children: [e$3("code", { children: "<InputGroup>" }), " & ", e$3("code", { children: "<InputGrid>" })] }), e$3(CardElement, { children: ["All input types, from checkboxes to number inputs, can be placed within an ", e$3("code", { children: "<InputGrid>" }), " to give an alternate styling to the default \"free floating\" style."] }), e$3("div", { style: { display: "contents", "--static-grid-columns": "10em auto" }, children: [e$3(CardElement, { children: ["With an ", e$3("code", { children: "<InputGroup>" }), ":", e$3(GridStatic, { columns: 2, children: [e$3(InputGroup, { children: e$3(Checkbox, { disabled: true, checked: true, labelPosition: "start", children: "Checkbox" }) }), e$3("code", { children: `<InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>` })] })] }), e$3(CardElement, { children: ["Without an ", e$3("code", { children: "<InputGroup>" }), ":", e$3(GridStatic, { columns: 2, children: [e$3(Checkbox, { disabled: true, checked: true, labelPosition: "start", children: "Checkbox" }), e$3("code", { children: `<Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox>` })] })] })] }), e$3(CardElement, { children: ["In addition, to help with alignment, a set of ", e$3("code", { children: "InputGroup" }), "s can also be placed within an ", e$3("code", { children: "InputGrid" }), " to manage simple cases.", e$3("code", { children: `<InputGrid>
    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
    {...}
</InputGrid>` })] }), e$3(CardElement, { children: ["With an ", e$3("code", { children: "<InputGrid>" }), ":", e$3(InputGrid, { children: [e$3(InputGroup, { children: e$3(Checkbox, { disabled: true, checked: true, labelPosition: "start", children: "Checkbox" }) }), e$3(InputGroup, { children: e$3(Checkbox, { disabled: true, checked: true, labelPosition: "start", children: "Another checkbox" }) }), e$3(InputGroup, { children: e$3(Input, { disabled: true, onValueChange: () => { }, type: "number", value: 0, children: "Numeric input" }) })] })] }), e$3(CardElement, { children: ["Without an ", e$3("code", { children: "<InputGrid>" }), ":", e$3(InputGroup, { children: e$3(Checkbox, { disabled: true, checked: true, labelPosition: "start", children: "Checkbox" }) }), e$3(InputGroup, { children: e$3(Checkbox, { disabled: true, checked: true, labelPosition: "start", children: "Another checkbox" }) }), e$3(InputGroup, { children: e$3(Input, { disabled: true, onValueChange: () => { }, type: "number", value: 0, children: "Numeric input" }) })] })] }) }));
	}

	const Badge = g$1(forwardElementRef(function Badge(_ref, ref) {
	  let {
	    colorVariant,
	    roundedPill,
	    label,
	    ...props
	  } = _ref;
	  return e$3("span", { ...useMergedProps()({
	      ref,
	      "aria-label": label,
	      className: clsx("badge", roundedPill && "rounded-pill", `bg-${colorVariant !== null && colorVariant !== void 0 ? colorVariant : "secondary"}`)
	    }, props)
	  });
	}));

	function DemoLists() {
	    const [selectedIndex, setSelectedIndex] = useState(0);
	    useState("outline");
	    useState("md");
	    useState(false);
	    const [lines, setLines] = useState(1);
	    const [selectedMulti, setSelectedMulti] = useState(new Set());
	    const [asyncTimeout, setAsyncTimeout] = useState(3000);
	    useState(true);
	    const [asyncFails, setAsyncFails] = useState(false);
	    useState(true);
	    const pushToast = usePushToast();
	    const onPressSync = () => void (pushToast(e$3(Toast, { children: "List item was clicked" })));
	    const onPressAsync = async () => {
	        await sleep$3(asyncTimeout ?? 0);
	        if (asyncFails)
	            throw new Error("List operation failed.");
	        else
	            onPressSync();
	    };
	    function makeListItemLines(index) {
	        if (lines === 1)
	            return e$3("span", { children: ["List Item #", index + 1] });
	        return e$3(d$2, { children: Array.from((function* () {
	                for (let i = 0; i < lines; ++i) {
	                    if (i == 0)
	                        yield e$3("span", { class: "h4", children: ["List Item #", index + 1] });
	                    else
	                        yield e$3("span", { children: ["This is line #", i + 1] });
	                }
	            })()) });
	    }
	    function makeListItems(maker) {
	        return e$3(d$2, { children: Array.from((function* () {
	                for (let i = 0; i < 5; ++i) {
	                    yield maker(i);
	                }
	            })()) });
	    }
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Lists" }), e$3(CardElement, { children: e$3(List, { label: "Demo list", selectedIndex: selectedIndex, onSelectChange: setSelectedIndex, children: makeListItems(index => e$3(ListItemSingle, { index: index, disabled: index == 3, children: makeListItemLines(index) })) }) }), e$3(CardElement, { children: ["A list is a way to provide a large number of selectable options in a way that's distinct from, say, a list of checkboxes or radio buttons. Lists can be ", e$3("strong", { children: "single-select" }), ", ", e$3("strong", { children: "multi-select" }), ", or ", e$3("strong", { children: "static" }), " (no selection, display only)."] }), e$3(CardElement, { children: ["All list types can have as many lines as needed; each e.g. ", e$3("code", { children: "<span>" }), " will create a new line. Format them however you like (i.e. making some larger or smaller, tinted different colors, etc.)", e$3(InputGroup, { children: e$3(Input, { type: "number", nonNullable: true, value: lines, onValueChange: setLines, children: "# of lines" }) })] }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Single select" }), e$3(CardElement, { children: ["For single-select lists, you provide the parent ", e$3("code", { children: "<List>" }), " with ", e$3("code", { children: "selectedIndex" }), " and ", e$3("code", { children: "onSelect" }), " props that control which ", e$3("code", { children: "<ListItemSingle>" }), " is the selected one."] }), e$3(CardElement, { children: ["As with most components, the ", e$3("code", { children: "onSelect" }), " prop can be an async function."] }), e$3(CardElement, { children: e$3(List, { label: "Single-select list demo", selectedIndex: selectedIndex, onSelectChange: async (i) => { await sleep$3(2000); setSelectedIndex(i); }, children: makeListItems(index => e$3(ListItemSingle, { index: index, disabled: index == 3, children: makeListItemLines(index) })) }) }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Multi select" }), e$3(CardElement, { children: ["Multi-select lists have a ", e$3("code", { children: "selected" }), " prop on each individual ", e$3("code", { children: "<ListItemMulti>" }), "."] }), e$3(CardElement, { children: ["As with most components, the ", e$3("code", { children: "onSelect" }), " prop can be an async function."] }), e$3(CardElement, { children: e$3(List, { label: "Multi-select list demo", select: "multi", children: makeListItems(index => e$3(ListItemMulti, { index: index, selected: selectedMulti.has(index), disabled: index == 3, onSelectChange: async (selected) => {
	                                await sleep$3(2000);
	                                setSelectedMulti(prev => {
	                                    let ret = new Set(Array.from(prev));
	                                    if (selected)
	                                        ret.add(index);
	                                    else
	                                        ret.delete(index);
	                                    return ret;
	                                });
	                            }, children: makeListItemLines(index) })) }) }), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Static lists" }), e$3(CardElement, { children: "All lists share the same basic styling of a static list, so all of these options can also be used on single- and multi-select lists." }), e$3(CardElement, { children: ["You can add an icon at the righthand side with ", e$3("code", { children: "iconEnd" }), ":"] }), e$3(CardElement, { children: e$3(List, { label: "List with icons at the end", children: makeListItems(index => e$3(ListItemActionable, { index: index, onPress: onPressAsync, disabled: index == 3, iconEnd: e$3(BootstrapIcon, { icon: "star", label: null }), children: makeListItemLines(index) })) }) }), e$3(CardElement, { children: ["Or an icon on the left with ", e$3("code", { children: "iconStart" }), ", or a badge at the top-right with ", e$3("code", { children: "badge" }), ":"] }), e$3(CardElement, { children: e$3(List, { label: "List with icons at the start and badges", children: makeListItems(index => e$3(ListItemActionable, { index: index, onPress: onPressSync, disabled: index == 3, badge: e$3(Badge, { label: `Example value`, children: Math.floor(Math.abs(Math.sin((index + 7) * 7) * 20)) }), iconStart: e$3(BootstrapIcon, { icon: "star", label: null }), children: makeListItemLines(index) })) }) }), e$3(CardElement, { children: ["All these will properly align themselves no matter how many lines the list item has. Keep in mind that a list's contents are always read out as one long string to screen readers, so not only should they ", e$3("em", { children: "not" }), " contain interactive content (beyond itself being selectable), any additional content, should be kept as terse as possible to avoid repeated content when reading each item one at a time."] })] }) }));
	}
	async function sleep$3(arg0) {
	    return new Promise(resolve => setTimeout(resolve, arg0));
	}

	function DemoMenus() {
	    const [align, setAlign] = useState("start");
	    const [side, setSide] = useState("block-end");
	    useState(false);
	    const [asyncTimeout, setAsyncTimeout] = useState(3000);
	    useState(true);
	    const [asyncFails, setAsyncFails] = useState(false);
	    useState(true);
	    const [forceOpen, setForceOpen] = useState(true);
	    const pushToast = usePushToast();
	    const onPressSync = () => pushToast(e$3(Toast, { children: "Menu item was clicked" }));
	    const onPressAsync = async () => {
	        await sleep$2(asyncTimeout);
	        if (asyncFails)
	            throw new Error("Button operation failed.");
	        else
	            onPressSync();
	    };
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Menus" }), e$3(CardElement, { children: e$3(Menu, { anchor: e$3(Button, { children: "I'm a menu" }), children: [e$3(MenuItem, { index: 0, onPress: onPressAsync, children: "A: Item 1" }), e$3(MenuItem, { index: 1, onPress: onPressAsync, children: "B: Item 2" }), e$3(MenuItem, { index: 2, onPress: onPressAsync, children: "C: Item 3" }), e$3(MenuItem, { index: 3, children: "I'm static" })] }) }), e$3(CardElement, { children: [e$3("code", { children: "<Menu>" }), "s are effectively popup ", e$3("code", { children: "<List>" }), "s. This gives them all the usual list stuff like keyboard navigation (either with the arrow keys or by typing the text content of the ", e$3("code", { children: "<MenuItem>" }), "), ", e$3(Tooltip, { side: "block-end", mouseoverDelay: 0, tooltip: "Just like this tooltip", children: ["with the popup logic handled by ", e$3("a", { href: "https://popper.js.org/", children: "Popper" })] }), "."] }), e$3(CardElement, { children: e$3("code", { children: `<Menu anchor={<Button>I'm a menu</Button>}>
    <MenuItem index={0} onPress={onPress}>A: Item 1</MenuItem>
    <MenuItem index={1} onPress={onPress}>B: Item 2</MenuItem>
    <MenuItem index={2} onPress={onPress}>C: Item 3</MenuItem>
    <MenuItem index={3}>I'm static</MenuItem>
</Menu>` }) }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Structure" }), e$3(CardElement, { children: ["A ", e$3("code", { children: "<Menu>" }), " requires both a selection of ", e$3("code", { children: "<MenuItem>" }), "s and also an ", e$3("code", { children: "anchor" }), ", provided by the prop of the same name.  By default, it's assumed that this will be a component that acceps an ", e$3("code", { children: "onPress" }), " event handler, like ", e$3("code", { children: "<Button>" }), "s do.  If you need to use a different event handler (such as ", e$3("code", { children: "onClick" }), ", if your menu isn't tied to a ", e$3("code", { children: "<Button>" }), "), you can pass the name of the prop to use instead to ", e$3("code", { children: "<anchorEventName>" })] }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Positioning" }), e$3(CardElement, { type: "paragraph", children: ["A menu's position is, by default, at the start of the line and the bottom of the block (the bottom left corner for this writing mode). You can manipulate this with the ", e$3("code", { children: "side" }), " and ", e$3("code", { children: "align" }), " props."] }), e$3(CardElement, { type: "paragraph", children: "The menu will also automatically flip when reaching the edge of the viewport." }), e$3(CardElement, { children: [e$3(RadioGroup, { label: "Alignment", labelPosition: "start", name: "menu-demo-1-align", selectedValue: align, onValueChange: setAlign, children: e$3(InputGrid, { children: [e$3(InputGroup, { children: e$3(Radio, { index: 0, value: "start", children: "Start" }) }), e$3(InputGroup, { children: e$3(Radio, { index: 1, value: "end", children: "End" }) })] }) }), e$3(InputGroup, { children: e$3(Checkbox, { checked: forceOpen, onCheck: setForceOpen, children: "Keep menu open" }) })] }), e$3(CardElement, { children: e$3(GridStatic, { columns: 3, children: [e$3("div", {}), e$3(Button, { colorVariant: "secondary", pressed: side === "block-start", onPressToggle: (pressed) => void (pressed && setSide("block-start")), children: "Block start" }), e$3("div", {}), e$3(Button, { colorVariant: "secondary", pressed: side === "inline-start", onPressToggle: (pressed) => void (pressed && setSide("inline-start")), children: "Inline start" }), e$3(Menu, { anchor: e$3(Button, { dropdownVariant: "combined", children: "Anchored menu" }), side: side, align: align, forceOpen: forceOpen, children: [e$3(MenuItem, { index: 0, onPress: onPressAsync, children: "A: Item 1" }), e$3(MenuItem, { index: 1, onPress: onPressAsync, children: "B: Item 2" }), e$3(MenuItem, { index: 2, onPress: onPressAsync, children: "C: Item 3" }), e$3(MenuItem, { index: 3, children: "I'm static" })] }), e$3(Button, { colorVariant: "secondary", pressed: side === "inline-end", onPressToggle: (pressed) => void (pressed && setSide("inline-end")), children: "Inline end" }), e$3("div", {}), e$3(Button, { colorVariant: "secondary", pressed: side === "block-end", onPressToggle: (pressed) => void (pressed && setSide("block-end")), children: "Block end" }), e$3("div", {})] }) }), e$3(CardElement, { children: e$3("code", { children: `<Menu anchor={<Button>Menu</Button>} side="${side}" align="${align}">
    {...}
</Menu>` }) }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "List-likes" }), e$3(CardElement, { tag: "div", children: ["Menu items inherit the same ", e$3("code", { children: "iconBefore" }), ", ", e$3("code", { children: "iconAfter" }), ", ", e$3("code", { children: "badge" }), ", and multiple line support from the various list item types."] }), e$3(CardElement, { children: e$3(Menu, { anchor: e$3(Button, { dropdownVariant: "combined", children: "Fancy menu items" }), side: side, align: align, children: [e$3(MenuItem, { index: 0, onPress: onPressAsync, iconStart: e$3(BootstrapIcon, { icon: "pencil", label: null }), children: [e$3("span", { class: "h5", children: "A: Item 1" }), e$3("span", { children: "Line #2" })] }), e$3(MenuItem, { index: 1, onPress: onPressAsync, iconStart: e$3(BootstrapIcon, { icon: "pencil", label: null }), children: [e$3("span", { class: "h5", children: "B: Item 2" }), e$3("span", { children: "Line #2" })] }), e$3(MenuItem, { index: 2, onPress: onPressAsync, iconStart: e$3(BootstrapIcon, { icon: "pencil", label: null }), children: [e$3("span", { class: "h5", children: "C: Item 3" }), e$3("span", { children: "Line #2" })] }), e$3(MenuItem, { index: 3, children: "I'm still static" })] }) }), e$3("hr", {}), e$3(CardElement, { type: "subtitle", tag: "h3", children: "Transitions" }), e$3(CardElement, { tag: "div", children: ["By default, ", e$3("code", { children: "<Menu>" }), "s use a ", e$3("code", { children: "<ZoomFade>" }), " as their transition. This can be customized by doing the following:", e$3("ul", { children: [e$3("li", { children: ["Provide a ", e$3("code", { children: "Transition" }), " prop."] }), e$3("li", { children: ["The ", e$3("code", { children: "<Menu>" }), " now accepts the same props as the transition component you passed in, with some key differences:"] }), e$3("li", { children: ["Any props that this ", e$3("code", { children: "Transition" }), " takes with both inline and block components, like ", e$3("code", { children: "fooInline" }), " and ", e$3("code", { children: "fooBlock" }), ", are now replaced with ", e$3("code", { children: "fooDynamic" }), ", which is relative to the location of the anchor to the menu."] }), e$3("li", { children: ["The menu will, based on the position of the anchor and current position of the menu, turn ", e$3("code", { children: "fooDynamic" }), " into ", e$3("code", { children: "fooInline" }), " or ", e$3("code", { children: "fooBlock" }), ", optionally negated (", e$3("code", { children: "1 - fooDynamic" }), ") if the menu is flipped because it's near the edge of the viewport."] })] })] })] }) }));
	}
	async function sleep$2(arg0) {
	    return new Promise(resolve => setTimeout(resolve, arg0));
	}

	const RangeThumbContext = D$1(null);
	const DebounceContext = D$1(false);
	const GetValueTextContext = D$1(null);
	const GetListContext = D$1("");
	const StepContext = D$1(1);
	const SnapContext = D$1("discrete");
	const DisabledContext = D$1(false);
	const OrientationContext = D$1("inline");
	const Range = g$1(forwardElementRef(function Range(_ref, ref) {
	  var _id, _step, _ref2;

	  let {
	    max,
	    min,
	    debounce,
	    hideTicks,
	    hideTickValues,
	    orientation,
	    children,
	    getValueText,
	    getTooltipText,
	    value,
	    onValueChange,
	    step,
	    snap,
	    label,
	    disabled,
	    ...rest
	  } = _ref;
	  const {
	    useAriaSliderThumb
	  } = useAriaSlider({
	    min,
	    max
	  });
	  let id = F(generateRandomId, []);
	  (_id = id) !== null && _id !== void 0 ? _id : id = "";
	  (_step = step) !== null && _step !== void 0 ? _step : step = "any";
	  let tickCount = step == "any" ? Infinity : Math.ceil(1 + (max - min) / step);
	  return e$3(RangeThumbContext.Provider, {
	    value: useAriaSliderThumb,
	    children: e$3(DebounceContext.Provider, {
	      value: debounce !== null && debounce !== void 0 ? debounce : false,
	      children: e$3(GetValueTextContext.Provider, {
	        value: (_ref2 = getTooltipText !== null && getTooltipText !== void 0 ? getTooltipText : getValueText) !== null && _ref2 !== void 0 ? _ref2 : defaultGetValueText,
	        children: e$3(GetListContext.Provider, {
	          value: id,
	          children: e$3(StepContext.Provider, {
	            value: step,
	            children: e$3(SnapContext.Provider, {
	              value: snap !== null && snap !== void 0 ? snap : "discrete",
	              children: e$3(DisabledContext.Provider, {
	                value: disabled !== null && disabled !== void 0 ? disabled : false,
	                children: e$3(OrientationContext.Provider, {
	                  value: orientation !== null && orientation !== void 0 ? orientation : "inline",
	                  children: v$2(label ? "label" : "div", useMergedProps()({
	                    class: clsx("form-range-container", orientation == "block" && "form-range-vertical"),
	                    ref,
	                    style: isFinite(tickCount) ? {
	                      "--form-range-tick-count": tickCount
	                    } : undefined
	                  }, rest), label && e$3("div", {
	                    class: "form-range-label",
	                    children: label
	                  }), children !== null && children !== void 0 ? children : e$3(RangeThumb, {
	                    index: 0,
	                    min: min,
	                    max: max,
	                    value: value !== null && value !== void 0 ? value : 0,
	                    onValueChange: onValueChange,
	                    label: label !== null && label !== void 0 ? label : ""
	                  }), e$3("div", {
	                    class: "form-range-track-background"
	                  }), e$3(GetValueTextContext.Provider, {
	                    value: getValueText !== null && getValueText !== void 0 ? getValueText : defaultGetValueText,
	                    children: e$3(RangeTicks, {
	                      min: min,
	                      max: max,
	                      step: step,
	                      id: id,
	                      hideTickValues: hideTickValues
	                    })
	                  }))
	                })
	              })
	            })
	          })
	        })
	      })
	    })
	  });
	}));

	function defaultGetValueText(number) {
	  return `${number}`;
	}

	const RangeTicks = g$1(function RangeTicks(_ref3) {
	  var _hideTickValues;

	  let {
	    step,
	    min,
	    max,
	    id,
	    hideTickValues
	  } = _ref3;
	  if (step == "any") return null;
	  (_hideTickValues = hideTickValues) !== null && _hideTickValues !== void 0 ? _hideTickValues : hideTickValues = "auto";
	  const getValueText = q$1(GetValueTextContext);
	  let children = [];

	  for (let i = min; i <= max; i += step) {
	    const atEnds = i == min || i + step > max;
	    const valuePercent = (i - min) / (max - min);
	    let shouldHide = hideTickValues == "auto" ? !atEnds : hideTickValues;
	    children.push(e$3("option", {
	      value: i,
	      class: clsx("form-range-tick", shouldHide && "form-range-tick-only"),
	      style: {
	        "--form-range-tick-percent": `${valuePercent * 100}%`
	      },
	      children: shouldHide ? null : getValueText(i)
	    }, i));
	  }

	  return e$3("datalist", {
	    id: id,
	    class: clsx("form-range-ticks"),
	    children: [...children]
	  });
	});
	const RangeThumb = g$1(forwardElementRef(function RangeThumb(_ref4, ref) {
	  var _useContext;

	  let {
	    index,
	    value,
	    max,
	    min,
	    onValueChange: onValueChangeAsync,
	    disabled
	  } = _ref4;
	  const debounceSetting = q$1(DebounceContext);
	  const {
	    syncHandler,
	    pending,
	    hasError,
	    currentCapture
	  } = useAsyncHandler(onValueChangeAsync !== null && onValueChangeAsync !== void 0 ? onValueChangeAsync : null, {
	    capture,
	    debounce: debounceSetting == true ? 1500 : debounceSetting != false ? debounceSetting : undefined
	  });
	  const onValueChangeSync = syncHandler; // as UseAriaSliderThumbArguments<HTMLInputElement>["onValueChange"];

	  value = currentCapture !== null && currentCapture !== void 0 ? currentCapture : value;
	  const getValueText = q$1(GetValueTextContext);
	  const valueText = F(() => {
	    var _getValueText;

	    return (_getValueText = getValueText === null || getValueText === void 0 ? void 0 : getValueText(value)) !== null && _getValueText !== void 0 ? _getValueText : value == null ? "" : `${value}`;
	  }, [value, getValueText]);
	  const orientation = q$1(OrientationContext);
	  let parentDisabled = q$1(DisabledContext);
	  disabled || (disabled = parentDisabled);
	  const [inputHasFocus, setInputHasFocus] = y$1(false);
	  const {
	    useHasFocusProps
	  } = useHasFocus({
	    onFocusedChanged: setInputHasFocus
	  });
	  let usedStep = (_useContext = q$1(StepContext)) !== null && _useContext !== void 0 ? _useContext : 1;
	  let userStep = usedStep;
	  const [lastSnappedValue, setLastSnappedValue] = y$1(null);
	  const [forceSnap, setForceSnap] = y$1(false);
	  const snap = q$1(SnapContext); //const [snap, setSnap] = useState<boolean | null>(null);

	  if (snap == "continuous" && !forceSnap) usedStep = "any";
	  /*if (snap === false)
	      step = "any";
	  if (snap === true && step == "any")
	      step = 1;*/

	  const snapTimeout = s$2(-1);

	  function onValueChange(e) {
	    const newValue = e[EventDetail].value;

	    if (userStep != "any") {
	      let closestStep = Math.round(newValue / userStep) * userStep;
	      let distanceToStep = Math.abs(closestStep - newValue);
	      let distanceToLastSnap = lastSnappedValue == null ? null : Math.abs(lastSnappedValue - newValue);

	      if (distanceToLastSnap != null && distanceToLastSnap >= userStep) {
	        setForceSnap(false);
	        setLastSnappedValue(null);
	      }

	      if (distanceToStep <= 0.125 && closestStep != lastSnappedValue) {
	        setLastSnappedValue(closestStep);
	        setForceSnap(true);
	        if (snapTimeout.current > 0) clearTimeout(snapTimeout.current);
	        snapTimeout.current = setTimeout(() => {
	          setForceSnap(false);
	        }, 750);
	        e[EventDetail].value = closestStep;
	      }
	    }

	    return onValueChangeSync === null || onValueChangeSync === void 0 ? void 0 : onValueChangeSync(e);
	  }

	  const {
	    getElement,
	    useAriaSliderThumbProps,
	    min: usedMin,
	    max: usedMax
	  } = q$1(RangeThumbContext)({
	    tag: "input",
	    value: value,
	    valueText,
	    index,
	    max,
	    min,
	    onValueChange
	  });
	  const valuePercent = (value - usedMin) / (usedMax - usedMin);
	  const clampedValuePercent = Math.max(0, Math.min(1, valuePercent));
	  return e$3(d$2, {
	    children: [e$3(Tooltip, {
	      side: orientation == "inline" ? "block-end" : "inline-end",
	      forceOpen: inputHasFocus,
	      tooltip: `${valueText}`,
	      childSelector: T$2(function (e) {
	        return e.nextElementSibling.firstElementChild;
	      }, []),
	      children: e$3("input", { ...useAriaSliderThumbProps(useHasFocusProps({
	          ref,
	          ...{
	            orient: orientation == "block" ? "vertical" : undefined
	          },
	          class: clsx("form-range", orientation == "block" && "form-range-vertical"),
	          disabled,
	          tabIndex: 0,
	          step: usedStep,
	          list: q$1(GetListContext)
	        }))
	      })
	    }), e$3("div", {
	      class: "form-range-tooltip-container",
	      children: e$3("div", {
	        class: "form-range-tooltip-root",
	        style: {
	          "--range-value": `${valuePercent}`
	        }
	      })
	    }), e$3("div", {
	      class: "form-range-track-fill-background",
	      style: {
	        "--form-range-value-percent": clampedValuePercent
	      }
	    })]
	  });
	}));

	function capture(e) {
	  return e[EventDetail].value;
	}

	function DemoRanges() {
	    const [min, setMin] = useState(0);
	    const [max, setMax] = useState(10);
	    const [step, setStep] = useState(1);
	    const [snap, setSnap] = useState("discrete");
	    const [vt, setVt] = useState(false);
	    const [value, setValue] = useState(0);
	    const getValueText = T$2((n) => { return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.round(n)]; }, []);
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Ranges" }), e$3(CardElement, { children: e$3(Range, { label: "Test range", step: step, snap: snap, min: min, max: max, value: value, onValueChange: setValue, getValueText: vt ? getValueText : undefined }) }), e$3(CardElement, { children: "A range allows for selection of a number between some minimum and maximum values. Ranges can optionally have a step value that determines which numbers within the [min, max] range are acceptable, and this can be optional, allowing a continuous selection of values with only an initial snap to those preferred values." }), e$3(CardElement, { children: ["The ", e$3("code", { children: "snap" }), " prop can be set to either ", e$3("code", { children: "\"discrete\"" }), " (default) or ", e$3("code", { children: "\"continuous\"" }), ". The former allows selection ", e$3("em", { children: "only" }), " of values that match the ", e$3("code", { children: "step" }), " prop. The latter will ", e$3("em", { children: "prefer" }), " selection of those values, but will allow any number within the range."] }), e$3(CardElement, { children: ["The range is linear by default, but you can use the ", e$3("code", { children: "getValueText" }), " prop to show other number scales, such as logarithmic scales, text-based scales, etc. The ", e$3("code", { children: "getTooltipText" }), " prop is similar, defaulting to whatever", e$3("code", { children: "getValueText" }), " is, and is the value displayed by the tooltip itself (", e$3("code", { children: "getValueText" }), " is used by the tick markers and assistive technologies)."] }), e$3(CardElement, { children: [e$3(ButtonGroup, { children: [e$3(ButtonGroupChild, { index: 0, pressed: snap == "discrete", onPressToggle: p => { p && setSnap("discrete"); }, children: "Discrete" }), e$3(ButtonGroupChild, { index: 1, pressed: snap == "continuous", onPressToggle: p => { p && setSnap("continuous"); }, children: "Continuous" })] }), e$3(Input, { type: "number", min: 1, value: step, onValueChange: setStep, nonNullable: true, children: "Step" }), e$3(Checkbox, { checked: vt, onCheck: setVt, children: "Use text label instead" })] })] }) }));
	}

	const TableHeadContext = D$1(null);
	const TableBodyContext = D$1(null);
	const TableFootContext = D$1(null);
	const TableRowContext = D$1(null);
	D$1([]);
	const Table = g$1(forwardElementRef(function Table(_ref, ref) {
	  let {
	    children,
	    small,
	    striped,
	    hoverable,
	    border,
	    variant,
	    borderColor,
	    ...props
	  } = _ref;
	  useLogRender("Table", `Rendering Table`);
	  const {
	    useTableProps,
	    useTableHead,
	    useTableBody,
	    useTableFoot,
	    managedTableSections
	  } = useTable();
	  return e$3("table", { ...useTableProps(useMergedProps()({
	      ref,
	      className: clsx("table", small && "table-sm", striped && "table-striped", hoverable && "table-hover", border === "all" && "table-bordered", border === "none" && "table-borderless", variant && `table-${variant}`, borderColor && `border-${borderColor}`)
	    }, props)),
	    children: e$3(TableHeadContext.Provider, {
	      value: useTableHead,
	      children: e$3(TableBodyContext.Provider, {
	        value: useTableBody,
	        children: e$3(TableFootContext.Provider, {
	          value: useTableFoot,
	          children: children
	        })
	      })
	    })
	  });
	}));
	const CellLocationContext = D$1(null);
	const TableSectionImpl = g$1(forwardElementRef(function TableSectionImpl(_ref2, ref) {
	  let {
	    tag,
	    children,
	    ...props
	  } = _ref2;
	  return v$2(tag, { ...props,
	    ref,
	    children: Array.isArray(children) ? children : [children]
	  });
	}));
	/*
	const TableSection = memo(forwardElementRef(function TableSection<E extends HTMLTableSectionElement>({ location, tag, ...props }: TableSectionProps<E>, ref: Ref<E>) {
	    const useTableSection = useContext(TableSectionContext);
	    const { useTableRow, useTableSectionProps } = useTableSection({ location });

	    return (
	        <TableRowContext.Provider value={useTableRow}>
	            <TableSectionImpl tag={tag} {...useTableSectionProps({ ...props as any, ref: ref as Ref<HTMLTableSectionElement> })} />
	        </TableRowContext.Provider>);
	}))*/

	const TableHead = g$1(forwardElementRef(function TableHead(_ref3, ref) {
	  let {
	    variant,
	    ...props
	  } = _ref3;
	  useLogRender("TableHead", `Rendering TableHead`);
	  const [showShadow, setShowShadow] = useState(false);
	  const {
	    useTableHeadProps,
	    useTableHeadRow
	  } = q$1(TableHeadContext)();
	  const {
	    getElement,
	    useRefElementProps
	  } = useRefElement({});
	  useGlobalHandler(window.document, "scroll", e => {
	    var _getElement;

	    return setShowShadow(!!((_getElement = getElement()) !== null && _getElement !== void 0 && _getElement.offsetTop));
	  }, {
	    passive: true,
	    capture: true
	  });
	  return e$3(CellLocationContext.Provider, {
	    value: "head",
	    children: e$3(TableRowContext.Provider, {
	      value: useTableHeadRow,
	      children: e$3(TableSectionImpl, {
	        tag: "thead",
	        ...useRefElementProps(useMergedProps()(useTableHeadProps({
	          ref,
	          className: clsx("elevation-body-surface", showShadow && "floating", variant && `table-${variant}`)
	        }), props))
	      })
	    })
	  });
	}));
	const TableBody = g$1(forwardElementRef(function TableBody(_ref4, ref) {
	  let {
	    children,
	    variant,
	    ...props
	  } = _ref4;
	  useLogRender("TableBody", `Rendering TableBody`);
	  const {
	    useTableBodyProps,
	    useTableBodyRow
	  } = q$1(TableBodyContext)();
	  return e$3(CellLocationContext.Provider, {
	    value: "body",
	    children: e$3(TableRowContext.Provider, {
	      value: useTableBodyRow,
	      children: e$3(TableSectionImpl, {
	        tag: "tbody",
	        ...useMergedProps()(useTableBodyProps({
	          ref,
	          children,
	          className: clsx(variant && `table-${variant}`)
	        }), props)
	      })
	    })
	  });
	}));
	g$1(forwardElementRef(function TableFoot(_ref5, ref) {
	  let {
	    children,
	    variant,
	    ...props
	  } = _ref5;
	  useLogRender("TableFoot", `Rendering TableFoot`);
	  const {
	    useTableFootProps,
	    useTableFootRow
	  } = q$1(TableFootContext)();
	  return e$3(CellLocationContext.Provider, {
	    value: "foot",
	    children: e$3(TableRowContext.Provider, {
	      value: useTableFootRow,
	      children: e$3(TableSectionImpl, {
	        tag: "tfoot",
	        ...useMergedProps()(useTableFootProps({
	          ref,
	          children: Array.isArray(children) ? children : [children],
	          className: clsx(variant && `table-${variant}`)
	        }), props)
	      })
	    })
	  });
	}));
	const TableCellContext = D$1(null);
	const TableHeadCellContext = D$1(null);
	const TableRow = g$1(forwardElementRef(function TableRow(_ref6, ref) {
	  let {
	    children,
	    index: indexAsUnsorted,
	    variant,
	    hidden: hiddenAsUnsorted,
	    ...props
	  } = _ref6;
	  useLogRender("TableRow", `Rendering TableRow #${indexAsUnsorted}, ${hiddenAsUnsorted}`);
	  const location = q$1(CellLocationContext);
	  const useTableRow = q$1(TableRowContext);
	  const {
	    useTableCell,
	    useTableHeadCell,
	    useTableRowProps
	  } = useTableRow({
	    index: indexAsUnsorted,
	    location,
	    hidden: !!hiddenAsUnsorted
	  });
	  const rowProps = useTableRowProps({ ...useMergedProps()({
	      children,
	      ref,
	      className: clsx(variant && `table-${variant}`)
	    }, props)
	  });
	  return e$3(TableCellContext.Provider, {
	    value: useTableCell,
	    children: e$3(TableHeadCellContext.Provider, {
	      value: useTableHeadCell,
	      children: e$3("tr", { ...rowProps
	      })
	    })
	  });
	}));
	const TableCell = g$1(forwardElementRef(function TableCell(_ref7, ref) {
	  let {
	    value: valueAsUnsorted,
	    colSpan,
	    children,
	    index: columnIndex,
	    variant,
	    focus,
	    active,
	    ...props
	  } = _ref7;

	  if (valueAsUnsorted == undefined) {
	    if (["string", "number", "bigint"].includes(typeof children)) {
	      valueAsUnsorted = children;
	    } else {
	      valueAsUnsorted = "";
	    }
	  }

	  const useTableCell = q$1(TableCellContext);
	  const {
	    useTableCellDelegateProps,
	    useTableCellProps
	  } = useTableCell({
	    index: columnIndex,
	    value: valueAsUnsorted
	  });
	  const childrenReceiveFocus = focus != "cell" && !!children && typeof children == "object" && "type" in children && children.type !== d$2;
	  const displayValue = children !== null && children !== void 0 ? children : valueAsUnsorted;
	  const cellProps = useTableCellProps({
	    ref,
	    colSpan,
	    className: clsx(variant && `table-${variant}`)
	  });

	  if (childrenReceiveFocus) {
	    const p1 = useMergedProps()(useTableCellDelegateProps({}), props);
	    return e$3("td", { ...cellProps,
	      children: B(children, useMergedProps()(p1, children.props), children.props.children)
	    });
	  } else {
	    const p2 = useMergedProps()(useTableCellDelegateProps(cellProps), props);
	    return e$3("td", { ...p2,
	      children: stringify(displayValue)
	    });
	  }
	}));
	const TableHeaderCell = g$1(forwardElementRef(function TableHeaderCell(_ref8, ref) {
	  let {
	    index: columnIndex,
	    focus,
	    children,
	    variant,
	    active,
	    unsortable,
	    ...props
	  } = _ref8;
	  const useTableHeadCell = q$1(TableHeadCellContext);
	  const {
	    useTableHeadCellDelegateProps,
	    useTableHeadCellProps,
	    sortDirection
	  } = useTableHeadCell({
	    tag: "th",
	    index: columnIndex
	  });
	  const childrenReceiveFocus = focus != "cell" && !!children && typeof children == "object" && "type" in children && children.type !== d$2;
	  const {
	    hovering,
	    useIsHoveringProps
	  } = useIsHovering();
	  const cellProps = useTableHeadCellProps(useIsHoveringProps(useMergedProps()({
	    ref,
	    role: "columnheader",
	    className: clsx(variant && `table-${variant}`, unsortable && "unsortable")
	  }, props)));

	  const sortIcon = e$3(Swappable, {
	    children: e$3("div", { ...{
	        class: clsx("table-sort-icon-container")
	      },
	      children: [e$3(Flip, {
	        flipAngleInline: 180,
	        show: sortDirection == "descending",
	        children: e$3("div", {
	          class: "bi bi-sort-up"
	        })
	      }), e$3(Flip, {
	        flipAngleInline: 180,
	        show: hovering && sortDirection == null || sortDirection == "ascending",
	        children: e$3("div", {
	          class: "bi bi-sort-down-alt"
	        })
	      })]
	    })
	  });

	  if (childrenReceiveFocus) {
	    const p1 = useMergedProps()(useTableHeadCellDelegateProps({}), props);
	    return e$3("th", { ...cellProps,
	      children: e$3("div", {
	        class: "th-spacing",
	        children: [B(children, useMergedProps()(p1, children.props), children.props.children), sortIcon]
	      })
	    });
	  } else {
	    const p2 = useMergedProps()(useTableHeadCellDelegateProps(cellProps), props);
	    return e$3("th", { ...p2,
	      children: e$3("div", {
	        class: "th-spacing",
	        children: [children, sortIcon]
	      })
	    });
	  }
	}));

	function useIsHovering() {
	  const [hovering, setHovering] = useState(false);
	  const onMouseEnter = T$2(() => {
	    setHovering(true);
	  }, []);
	  const onMouseLeave = T$2(() => {
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
	const formatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" });
	const RandomRow = g$1(function RandomRow({ index, unsortedRowIndex, filterEvens }) {
	    console.log(`RandomRow ${index}, ${unsortedRowIndex}`);
	    const i = index;
	    const w = RandomWords$1[i];
	    const [n, setN] = useState((i + 0) ** 2);
	    const d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (n ?? 0) * 7);
	    const [checked, setChecked] = useState(false);
	    const onInput = T$2(async (checked) => {
	        await sleep$1(2000);
	        setChecked(checked);
	    }, []);
	    return (e$3(TableRow, { hidden: filterEvens && (((n ?? 0) & 1) == 0), index: index, children: [e$3(TableCell, { index: 0, value: n, colSpan: !w ? 2 : undefined, children: e$3(Input, { type: "number", width: "4ch", value: n, onValueChange: setN, labelPosition: "hidden", min: 0, children: "Numeric input" }) }), w && e$3(TableCell, { index: 1, value: w }), e$3(TableCell, { index: 2, value: d, children: formatter.format(d) }), e$3(TableCell, { index: 3, value: checked, children: e$3(Checkbox, { checked: checked, onCheck: onInput, labelPosition: "hidden", children: "Demo table checkbox" }) })] }));
	});
	function DemoTable() {
	    const [rowCount, setRowCount] = useState(5);
	    const [filterEvens, setFilterEvens] = useState(false);
	    return (e$3("div", { class: "demo", children: e$3(Card, { children: [e$3(CardElement, { type: "title", tag: "h2", children: "Table" }), e$3(CardElement, { children: ["Tables allow for automatic display, navigation, sorting, and filtering of data. All data is provided by the children and you ", e$3("strong", { children: "don't need to provide a data structure" }), " to the parent ", e$3("code", { children: "Table" }), " element, and by default all columns are user-sortable."] }), e$3(CardElement, { children: ["Sorting and filtering are done by examining each ", e$3("code", { children: "TableCell" }), "'s child (or ", e$3("code", { children: "value" }), " prop, with ", e$3("code", { children: "value" }), " taking precidence). If the child of the ", e$3("code", { children: "TableCell" }), " is a simple number or string (and no ", e$3("code", { children: "value" }), " prop is provided), then that value will be used for sorting. If it's not a string (and again, if no ", e$3("code", { children: "value" }), " prop is provided), then it will be sorted as if its contents were just an empty string, so it's almost always beneficial to provide the ", e$3("code", { children: "value" }), " prop just in case."] }), e$3(CardElement, { children: ["A ", e$3("code", { children: "TableCell" }), " contain any content, including arbitrary HTML and other components. In terms of focus management (i.e. how using the arrow keys works within a table), a ", e$3("code", { children: "TableCell" }), " that just contains a simple string or number will focus itself when tabbed to, but a ", e$3("code", { children: "TableCell" }), " that contains other components ", e$3("strong", { children: "will delegate focus to its children instead" }), ":", e$3("code", { children: `// The table cell itself will receive focus:
<TableCell>Text</TableCell>
<TableCell>0</TableCell>
<TableCell><>Text</></TableCell> // Fragments are treated as text for these purposes

// When tabbing to the TableCell, the <p> or <Input> will receive focus:
<TableCell><p>Text</p></TableCell>
<TableCell><Input type="..." {...} /></TableCell>

// ❌ The cell will try to focus the child but it'll never receive the message!
<TableCell>{(props) => <p>text</p>}</TableCell>

// ✅ The cell can properly delegate all duties to the child DIV.
<TableCell>{forwardRef((props, ref) => <p ref={ref} {...props}>text</p>)}</TableCell>` })] }), e$3(CardElement, { children: ["Finally, your rows ", e$3("em", { children: "must" }), " be ", e$3("em", { children: "direct descendants" }), " of ", e$3("code", { children: "TableBody" }), " (and ", e$3("code", { children: "TableHead" }), " and ", e$3("code", { children: "TableFoot" }), ") so that it can properly call ", e$3("code", { children: "createElement" }), " with the expected results when sorting. It's okay if each row you provide is a wrapper component around a single ", e$3("code", { children: "TableRow" }), "\u2014the \"direct descendant\" doesn't need to be specifically a ", e$3("code", { children: "TableRow" }), " component\u2014it's just that the ", e$3("code", { children: "TableBody" }), " (etc.) needs ", e$3("em", { children: "specifically" }), " an array of children whose individual ", e$3("code", { children: "key" }), " props can be manipulated."] }), e$3(CardElement, { children: [e$3(Input, { type: "number", value: rowCount, min: 0, max: 999, onValueChange: setRowCount, children: "Row count" }), e$3(Checkbox, { checked: filterEvens, onCheck: setFilterEvens, children: "Filter out even numbers" })] }), e$3(CardElement, { children: e$3(Table, { children: [e$3(TableHead, { children: e$3(TableRow, { hidden: false, index: 0, children: [e$3(TableHeaderCell, { index: 0, children: "Number" }), e$3(TableHeaderCell, { index: 1, children: "String" }), e$3(TableHeaderCell, { index: 2, children: "Date" }), e$3(TableHeaderCell, { index: 3, children: "Checkbox" })] }) }), e$3(TableBody, { ...{ "data-test": filterEvens }, children: Array.from(function* () {
	                                    for (let i = 0; i < (rowCount ?? 0); ++i) {
	                                        yield e$3(RandomRow, { index: i, filterEvens: filterEvens }, i);
	                                        /*<TableRow index={1 + i}>
	                                        <TableCell index={0} value={i} />
	                                        <TableCell index={1} value={RandomWords[i]} />
	                                        <TableCell index={2} value={new Date()} />
	                                    </TableRow>*/
	                                        //
	                                    }
	                                }()) })] }) }), e$3(CardElement, { children: e$3("code", { children: `<Table>
    <TableHead>
        <TableRow index={0}>
            <TableHeaderCell index={0}>Number</TableHeaderCell>
            <TableHeaderCell index={1}>String</TableHeaderCell>
            <TableHeaderCell index={2}>Date</TableHeaderCell>
            <TableHeaderCell index={3}>Checkbox</TableHeaderCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow index={1}>
            <TableCell index={0} value={n} />
            <TableCell index={1} value={RandomWords[index]} />
            <TableCell index={2} value={d}>{d.toLocaleString()}</TableCell>
            <TableCell index={3} value={checked}>
                <Checkbox checked={checked} onInput={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>
            </TableCell>
        </TableRow>

        <TableRow index={2} />
        <TableRow index={3} hidden />
        <TableRow index={4} />
        <TableRow index={5} />

    </TableBody>
    <TableFoot>
        <ACustomTableRow index={6} />
    </TableFoot>
</Table>` }) })] }) }));
	}
	async function sleep$1(arg0) {
	    return new Promise(resolve => setTimeout(resolve, arg0));
	}

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	var _freeGlobal = freeGlobal$1;

	var freeGlobal = _freeGlobal;
	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root$1 = freeGlobal || freeSelf || Function('return this')();
	var _root = root$1;

	var root = _root;
	/** Built-in value references. */

	var Symbol$4 = root.Symbol;
	var _Symbol = Symbol$4;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */

	function arrayMap$1(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }

	  return result;
	}

	var _arrayMap = arrayMap$1;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray$1 = Array.isArray;
	var isArray_1 = isArray$1;

	var Symbol$3 = _Symbol;
	/** Used for built-in method references. */

	var objectProto$1 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty = objectProto$1.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$1 = objectProto$1.toString;
	/** Built-in value references. */

	var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */

	function getRawTag$1(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];

	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$1.call(value);

	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }

	  return result;
	}

	var _getRawTag = getRawTag$1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString = objectProto.toString;
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */

	function objectToString$1(value) {
	  return nativeObjectToString.call(value);
	}

	var _objectToString = objectToString$1;

	var Symbol$2 = _Symbol,
	    getRawTag = _getRawTag,
	    objectToString = _objectToString;
	/** `Object#toString` result references. */

	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	/** Built-in value references. */

	var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	function baseGetTag$1(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }

	  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}

	var _baseGetTag = baseGetTag$1;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	function isObjectLike$1(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike$1;

	var baseGetTag = _baseGetTag,
	    isObjectLike = isObjectLike_1;
	/** `Object#toString` result references. */

	var symbolTag = '[object Symbol]';
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */

	function isSymbol$1(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
	}

	var isSymbol_1 = isSymbol$1;

	var Symbol$1 = _Symbol,
	    arrayMap = _arrayMap,
	    isArray = isArray_1,
	    isSymbol = isSymbol_1;
	/** Used as references for various `Number` constants. */

	var INFINITY = 1 / 0;
	/** Used to convert symbols to primitives and strings. */

	var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */

	function baseToString$1(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }

	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString$1) + '';
	  }

	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }

	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	var _baseToString = baseToString$1;

	var baseToString = _baseToString;
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */

	function toString$2(value) {
	  return value == null ? '' : baseToString(value);
	}

	var toString_1 = toString$2;

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */

	function baseSlice$1(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }

	  end = end > length ? length : end;

	  if (end < 0) {
	    end += length;
	  }

	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;
	  var result = Array(length);

	  while (++index < length) {
	    result[index] = array[index + start];
	  }

	  return result;
	}

	var _baseSlice = baseSlice$1;

	var baseSlice = _baseSlice;
	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */

	function castSlice$1(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return !start && end >= length ? array : baseSlice(array, start, end);
	}

	var _castSlice = castSlice$1;

	/** Used to compose unicode character classes. */
	var rsAstralRange$1 = '\\ud800-\\udfff',
	    rsComboMarksRange$1 = '\\u0300-\\u036f',
	    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
	    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
	    rsVarRange$1 = '\\ufe0e\\ufe0f';
	/** Used to compose unicode capture groups. */

	var rsZWJ$1 = '\\u200d';
	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

	var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + ']');
	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */

	function hasUnicode$2(string) {
	  return reHasUnicode.test(string);
	}

	var _hasUnicode = hasUnicode$2;

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */

	function asciiToArray$1(string) {
	  return string.split('');
	}

	var _asciiToArray = asciiToArray$1;

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';
	/** Used to compose unicode capture groups. */

	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';
	/** Used to compose unicode regexes. */

	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */

	function unicodeToArray$1(string) {
	  return string.match(reUnicode) || [];
	}

	var _unicodeToArray = unicodeToArray$1;

	var asciiToArray = _asciiToArray,
	    hasUnicode$1 = _hasUnicode,
	    unicodeToArray = _unicodeToArray;
	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */

	function stringToArray$1(string) {
	  return hasUnicode$1(string) ? unicodeToArray(string) : asciiToArray(string);
	}

	var _stringToArray = stringToArray$1;

	var castSlice = _castSlice,
	    hasUnicode = _hasUnicode,
	    stringToArray = _stringToArray,
	    toString$1 = toString_1;
	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */

	function createCaseFirst$1(methodName) {
	  return function (string) {
	    string = toString$1(string);
	    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
	    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
	    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
	    return chr[methodName]() + trailing;
	  };
	}

	var _createCaseFirst = createCaseFirst$1;

	var createCaseFirst = _createCaseFirst;
	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */

	var upperFirst$1 = createCaseFirst('toUpperCase');
	var upperFirst_1 = upperFirst$1;

	var toString = toString_1,
	    upperFirst = upperFirst_1;
	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */

	function capitalize(string) {
	  return upperFirst(toString(string).toLowerCase());
	}

	var capitalize_1 = capitalize;

	const RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");
	g$1(({ setActive, active, depth }) => {
	    return (e$3(d$2, { children: [e$3("button", { children: "Button 1" }), e$3("button", { children: "Button 2" }), e$3("button", { children: "Button 3" }), e$3("label", { children: ["Active: ", e$3("input", { type: "checkbox", checked: active, onInput: e => { e.preventDefault(); setActive(e.currentTarget.checked); } })] })] }));
	});
	const DemoDialog = g$1(() => {
	    const onClose = (() => setOpen(false));
	    const [open, setOpen] = useState(false);
	    return (e$3("div", { class: "demo", children: [e$3(Tooltip, { tooltip: "Open dialog", children: e$3(InputGroup, { children: e$3(Checkbox, { checked: open, onCheck: setOpen, children: "Open dialog" }) }) }), e$3(Dialog, { open: open, onClose: onClose, descriptive: false, title: "Dialog Title", footer: e$3("button", { onClick: onClose, children: "Close" }), children: [e$3("p", { tabIndex: -1, children: "Dialog body content" }), e$3(DemoMenus, {}), e$3("p", { children: RandomWords.join(" ") }), e$3("p", { children: RandomWords.join(" ") }), e$3("p", { children: RandomWords.join(" ") }), e$3("p", { children: RandomWords.join(" ") }), e$3("p", { children: RandomWords.join(" ") })] })] }));
	});
	const DemoDrawer = g$1(() => {
	    const onClose = (() => setOpen(false));
	    let [open, setOpen] = useState(false);
	    //open = true;
	    return (e$3("div", { class: "demo", children: [e$3(Checkbox, { checked: open, onCheck: setOpen, children: "Open Drawer" }), e$3(Drawer, { open: open, onClose: onClose, descriptive: false, title: "Dialog Title", children: [e$3("p", { tabIndex: -1, children: "Dialog body content" }), e$3("p", { children: RandomWords.join(" ") }), e$3("p", { children: RandomWords.join(" ") }), e$3("p", { children: RandomWords.join(" ") })] })] }));
	});
	const DemoMenu = g$1(() => {
	    return (e$3("div", { class: "demo", children: e$3(Menu, { Transition: ZoomFade, tag: "ul", anchor: e$3(Button, { dropdownVariant: "combined", children: "Open menu" }), children: [e$3(MenuItem, { index: 0, children: "AItem #1" }), e$3(MenuItem, { index: 1, children: "BItem #2" }), e$3(MenuItem, { index: 2, children: "CItem #3" }), e$3(MenuItem, { index: 3, children: "DItem #4" })] }) }));
	});
	const DemoTabs = g$1(() => {
	    const [selectedIndex, setSelectedIndex] = useState(0);
	    const [selectionMode, setSelectionMode] = useState("activate");
	    return (e$3("div", { class: "demo", children: e$3("div", { children: e$3(Tabs, { orientation: "block", onSelect: setSelectedIndex, selectedIndex: selectedIndex, selectionMode: selectionMode, children: [e$3("ol", { children: [e$3(Tab, { index: 0, children: "Tab #1" }), e$3(Tab, { index: 1, children: "Tab #2" }), e$3(Tab, { index: 2, children: "Tab #3" })] }), e$3(TabPanel, { index: 0, children: e$3("div", { children: RandomWords.slice(0, Math.floor((1 / 3) * RandomWords.length)).join(" ") }) }), e$3(TabPanel, { index: 1, children: e$3("div", { children: RandomWords.slice(0, Math.floor((2 / 3) * RandomWords.length)).join(" ") }) }), e$3(TabPanel, { index: 2, children: e$3("div", { children: RandomWords.slice(0, Math.floor((3 / 3) * RandomWords.length)).join(" ") }) })] }) }) }));
	});
	g$1(() => {
	    const { useTooltip, useTooltipTrigger, isOpen } = useAriaTooltip({});
	    const { useTooltipProps } = useTooltip();
	    const { useTooltipTriggerProps } = useTooltipTrigger();
	    return (e$3("div", { class: "demo", children: e$3("p", { children: ["This is a paragraph with a ", e$3("span", { ...useTooltipTriggerProps({}), children: "tooltip right here." }), e$3("span", { ...useTooltipProps({ hidden: !isOpen }), children: "This is the tooltip content." })] }) }));
	});
	async function sleep(ms) {
	    await new Promise(resolve => setTimeout(resolve, ms));
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
	const DemoAccordion = g$1(() => {
	    const [expandedIndex, setExpandedIndex] = useState(-1);
	    return (e$3("div", { class: "demo", children: e$3("div", { children: e$3(Accordion, { expandedIndex: expandedIndex, setExpandedIndex: setExpandedIndex, children: [e$3(AccordionSection, { index: 0, header: "Accordion Item #1", children: e$3("div", { children: [e$3("strong", { children: "This is the 1st item's accordion body." }), " It is visible by default, You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ", e$3("code", { children: "AccordionSection" }), "."] }) }), e$3(AccordionSection, { index: 1, header: "Accordion Item #2", children: e$3("div", { children: [e$3("strong", { children: "This is the 2nd item's accordion body." }), " It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ", e$3("code", { children: "AccordionSection" }), "."] }) }), e$3(AccordionSection, { index: 2, header: "Accordion Item #3", children: e$3("div", { children: [e$3("strong", { children: "This is the 3rd item's accordion body." }), " It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ", e$3("code", { children: "AccordionSection" }), "."] }) })] }) }) }));
	});
	const DemoList = g$1(() => {
	    const [index, setIndex] = useState(0);
	    return (e$3("div", { class: "demo", children: ["Selected: ", index, e$3(ListSingle, { label: "Example list", select: "single", onSelectChange: setIndex, selectedIndex: index, selectionMode: "activate", tag: "ul", children: [e$3(ListItemSingle, { index: 0, children: "Primary" }), e$3(ListItemSingle, { index: 1, children: "Secondary" }), e$3(ListItemSingle, { index: 2, children: "Success" }), e$3(ListItemSingle, { index: 3, children: "Warning" }), e$3(ListItemSingle, { index: 4, children: "Danger" }), e$3(ListItemSingle, { index: 5, children: "Info" }), e$3(ListItemSingle, { index: 6, children: "Light" }), e$3(ListItemSingle, { index: 7, children: "Dark" }), e$3(ListItemSingle, { index: 8, children: "Link" })] })] }));
	});
	const DemoInput = g$1(() => {
	    const [text, setText] = useState("");
	    const [radioValue, setRadioValue] = useState("");
	    const onInput1 = T$2(async (value) => {
	        await sleep(5000);
	        setText(value);
	    }, [setRadioValue]);
	    const onInput2 = T$2(async (value) => {
	        await sleep(5000);
	        setRadioValue(value);
	    }, [setRadioValue]);
	    return (e$3("div", { class: "demo", children: [e$3(InputGroup, { children: e$3(Input, { type: "text", onValueChange: onInput1, value: text, width: "100%", children: "Test input" }) }), e$3(RadioGroup, { selectedValue: radioValue, name: "demo-radio", onValueChange: onInput2, children: [e$3(InputGroup, { children: e$3(Radio, { index: 0, value: "ARadio" }) }), e$3(InputGroup, { children: e$3(Radio, { index: 1, value: "BRadio" }) }), e$3(InputGroup, { children: e$3(Radio, { index: 2, value: "CRadio" }) })] })] }));
	});
	function changeThemes(fromTheme, toTheme) {
	    //const fromTheme = (toTheme === "theme-dark" ? "theme-light" : "theme-dark");
	    document.getElementById(toTheme).media = "all";
	    if (fromTheme)
	        document.getElementById(fromTheme).media = "screen and (max-width: 1px)";
	}
	const AllThemes = [
	    "cerulean",
	    "cosmo",
	    "cyborg",
	    "darkly",
	    "flatly",
	    "journal",
	    "litera",
	    "lumen",
	    "lux",
	    "materia",
	    "minty",
	    "morph",
	    "pulse",
	    "quartz",
	    "regent",
	    "sandstone",
	    "simplex",
	    "sketchy",
	    "slate",
	    "solar",
	    "spacelab",
	    "superhero",
	    "united",
	    "vapor",
	    "yeti",
	    "zephyr",
	];
	const Component = () => {
	    const [theme, setTheme] = useState("theme-default-bootstrap");
	    const [themeName, setThemeName] = useState("Bootstrap");
	    useLayoutEffect((prevArgs) => changeThemes((prevArgs ?? [])[0], theme), [theme]);
	    return e$3(d$2, { children: [e$3(Menu, { TransitionProps: { maxHeight: "70vh", overflow: "auto" }, anchor: e$3(Button, { dropdownVariant: "combined", style: { position: "fixed", insetBlockStart: "0.5em", insetInlineEnd: "0.5em", zIndex: 9999999 }, spinnerTimeout: 999999999, children: ["Theme: ", themeName] }), children: [e$3(MenuItem, { index: 0, onPress: async () => { setTheme(`theme-default-bootstrap`); setThemeName("Bootstrap"); }, children: "Bootstrap" }), e$3(MenuItem, { index: 1, onPress: async () => { setTheme(`theme-light`); setThemeName("Light"); }, children: "Light" }), e$3(MenuItem, { index: 2, onPress: async () => { setTheme(`theme-dark`); setThemeName("Dark"); }, children: "Dark" }), e$3(ListItemStatic, { children: [e$3("a", { href: "https://bootswatch.com/", children: "Bootswatch themes" }), e$3("small", { children: "(Not thoroughly tested)" })] }), AllThemes.map((theme, index) => e$3(MenuItem, { index: index + 3, onPress: async () => { setTheme(`theme-${theme}`); setThemeName(capitalize_1(theme)); }, children: capitalize_1(theme) }))] }), e$3(GridResponsive, { minWidth: "35em", children: e$3(DebugUtilContext.Provider, { value: F(() => ({ logRender: new Set(["Table", "TableHead", "TableBody", "TableRow", "TableCell"]) }), []), children: e$3(ToastsProvider, { children: e$3(DialogsProvider, { children: [e$3(DemoRanges, {}), e$3(DemoTable, {}), e$3(DemoLists, {}), e$3(DemoMenus, {}), e$3(DemoDialogs, {}), e$3(DemoButtons, {}), e$3(DemoChecks, {}), e$3(DemoInputs, {}), e$3(DemoLayout, {}), e$3(DemoAccordion, {}), e$3(DemoDialog, {}), e$3(DemoDrawer, {}), e$3(DemoInput, {}), e$3(DemoList, {}), e$3(DemoTabs, {}), e$3(DemoMenu, {})] }) }) }) })] });
	};
	requestAnimationFrame(() => {
	    S$1(e$3(Component, {}), document.getElementById("root"));
	});

})();
//# sourceMappingURL=bundle.js.map
