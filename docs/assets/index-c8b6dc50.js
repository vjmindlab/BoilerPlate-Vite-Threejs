import { F as bn, H as On } from './vision-334c7f5a.js';
(function () {
  const B = document.createElement('link').relList;
  if (B && B.supports && B.supports('modulepreload')) return;
  for (const A of document.querySelectorAll(
    'link[rel="modulepreload"]'
  ))
    st(A);
  new MutationObserver((A) => {
    for (const x of A)
      if (x.type === 'childList')
        for (const q of x.addedNodes)
          q.tagName === 'LINK' && q.rel === 'modulepreload' && st(q);
  }).observe(document, { childList: !0, subtree: !0 });
  function Z(A) {
    const x = {};
    return (
      A.integrity && (x.integrity = A.integrity),
      A.referrerPolicy && (x.referrerPolicy = A.referrerPolicy),
      A.crossOrigin === 'use-credentials'
        ? (x.credentials = 'include')
        : A.crossOrigin === 'anonymous'
        ? (x.credentials = 'omit')
        : (x.credentials = 'same-origin'),
      x
    );
  }
  function st(A) {
    if (A.ep) return;
    A.ep = !0;
    const x = Z(A);
    fetch(A.href, x);
  }
})();
var ct =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  jr = {};
(function () {
  function E(a) {
    var d = 0;
    return function () {
      return d < a.length
        ? { done: !1, value: a[d++] }
        : { done: !0 };
    };
  }
  var B =
    typeof Object.defineProperties == 'function'
      ? Object.defineProperty
      : function (a, d, p) {
          return (
            a == Array.prototype ||
              a == Object.prototype ||
              (a[d] = p.value),
            a
          );
        };
  function Z(a) {
    a = [
      typeof globalThis == 'object' && globalThis,
      a,
      typeof window == 'object' && window,
      typeof self == 'object' && self,
      typeof ct == 'object' && ct,
    ];
    for (var d = 0; d < a.length; ++d) {
      var p = a[d];
      if (p && p.Math == Math) return p;
    }
    throw Error('Cannot find global object');
  }
  var st = Z(this);
  function A(a, d) {
    if (d)
      t: {
        var p = st;
        a = a.split('.');
        for (var y = 0; y < a.length - 1; y++) {
          var O = a[y];
          if (!(O in p)) break t;
          p = p[O];
        }
        (a = a[a.length - 1]),
          (y = p[a]),
          (d = d(y)),
          d != y &&
            d != null &&
            B(p, a, { configurable: !0, writable: !0, value: d });
      }
  }
  function x(a) {
    var d =
      typeof Symbol < 'u' && Symbol.iterator && a[Symbol.iterator];
    return d ? d.call(a) : { next: E(a) };
  }
  var q =
    typeof Object.assign == 'function'
      ? Object.assign
      : function (a, d) {
          for (var p = 1; p < arguments.length; p++) {
            var y = arguments[p];
            if (y)
              for (var O in y)
                Object.prototype.hasOwnProperty.call(y, O) &&
                  (a[O] = y[O]);
          }
          return a;
        };
  A('Object.assign', function (a) {
    return a || q;
  }),
    A('Array.prototype.fill', function (a) {
      return (
        a ||
        function (d, p, y) {
          var O = this.length || 0;
          for (
            0 > p && (p = Math.max(0, O + p)),
              (y == null || y > O) && (y = O),
              y = Number(y),
              0 > y && (y = Math.max(0, O + y)),
              p = Number(p || 0);
            p < y;
            p++
          )
            this[p] = d;
          return this;
        }
      );
    });
  function F(a) {
    return a || Array.prototype.fill;
  }
  A('Int8Array.prototype.fill', F),
    A('Uint8Array.prototype.fill', F),
    A('Uint8ClampedArray.prototype.fill', F),
    A('Int16Array.prototype.fill', F),
    A('Uint16Array.prototype.fill', F),
    A('Int32Array.prototype.fill', F),
    A('Uint32Array.prototype.fill', F),
    A('Float32Array.prototype.fill', F),
    A('Float64Array.prototype.fill', F);
  var Ot = this || self;
  function tt(a, d) {
    a = a.split('.');
    var p = Ot;
    a[0] in p ||
      typeof p.execScript > 'u' ||
      p.execScript('var ' + a[0]);
    for (var y; a.length && (y = a.shift()); )
      a.length || d === void 0
        ? p[y] && p[y] !== Object.prototype[y]
          ? (p = p[y])
          : (p = p[y] = {})
        : (p[y] = d);
  }
  var Wt = {
    color: 'white',
    lineWidth: 4,
    radius: 6,
    visibilityMin: 0.5,
  };
  function et(a) {
    return (
      (a = a || {}), Object.assign({}, Wt, { fillColor: a.color }, a)
    );
  }
  function D(a, d) {
    return a instanceof Function ? a(d) : a;
  }
  function Et(a, d, p) {
    return Math.max(Math.min(d, p), Math.min(Math.max(d, p), a));
  }
  tt('clamp', Et),
    tt('drawLandmarks', function (a, d, p) {
      if (d) {
        (p = et(p)), a.save();
        var y = a.canvas,
          O = 0;
        d = x(d);
        for (var T = d.next(); !T.done; T = d.next())
          if (
            ((T = T.value),
            T !== void 0 &&
              (T.visibility === void 0 ||
                T.visibility > p.visibilityMin))
          ) {
            (a.fillStyle = D(p.fillColor, { index: O, from: T })),
              (a.strokeStyle = D(p.color, { index: O, from: T })),
              (a.lineWidth = D(p.lineWidth, { index: O, from: T }));
            var j = new Path2D();
            j.arc(
              T.x * y.width,
              T.y * y.height,
              D(p.radius, { index: O, from: T }),
              0,
              2 * Math.PI
            ),
              a.fill(j),
              a.stroke(j),
              ++O;
          }
        a.restore();
      }
    }),
    tt('drawConnectors', function (a, d, p, y) {
      if (d && p) {
        (y = et(y)), a.save();
        var O = a.canvas,
          T = 0;
        p = x(p);
        for (var j = p.next(); !j.done; j = p.next()) {
          var k = j.value;
          a.beginPath(),
            (j = d[k[0]]),
            (k = d[k[1]]),
            j &&
              k &&
              (j.visibility === void 0 ||
                j.visibility > y.visibilityMin) &&
              (k.visibility === void 0 ||
                k.visibility > y.visibilityMin) &&
              ((a.strokeStyle = D(y.color, {
                index: T,
                from: j,
                to: k,
              })),
              (a.lineWidth = D(y.lineWidth, {
                index: T,
                from: j,
                to: k,
              })),
              a.moveTo(j.x * O.width, j.y * O.height),
              a.lineTo(k.x * O.width, k.y * O.height)),
            ++T,
            a.stroke();
        }
        a.restore();
      }
    }),
    tt('drawRectangle', function (a, d, p) {
      (p = et(p)), a.save();
      var y = a.canvas;
      a.beginPath(),
        (a.lineWidth = D(p.lineWidth, {})),
        (a.strokeStyle = D(p.color, {})),
        (a.fillStyle = D(p.fillColor, {})),
        a.translate(d.xCenter * y.width, d.yCenter * y.height),
        a.rotate((d.rotation * Math.PI) / 180),
        a.rect(
          (-d.width / 2) * y.width,
          (-d.height / 2) * y.height,
          d.width * y.width,
          d.height * y.height
        ),
        a.translate(-d.xCenter * y.width, -d.yCenter * y.height),
        a.stroke(),
        a.fill(),
        a.restore();
    }),
    tt('lerp', function (a, d, p, y, O) {
      return Et(
        y * (1 - (a - d) / (p - d)) + O * (1 - (p - a) / (p - d)),
        y,
        O
      );
    });
}).call(ct);
var En = {};
(function () {
  var E;
  function B(t) {
    var e = 0;
    return function () {
      return e < t.length
        ? { done: !1, value: t[e++] }
        : { done: !0 };
    };
  }
  var Z =
    typeof Object.defineProperties == 'function'
      ? Object.defineProperty
      : function (t, e, r) {
          return (
            t == Array.prototype ||
              t == Object.prototype ||
              (t[e] = r.value),
            t
          );
        };
  function st(t) {
    t = [
      typeof globalThis == 'object' && globalThis,
      t,
      typeof window == 'object' && window,
      typeof self == 'object' && self,
      typeof ct == 'object' && ct,
    ];
    for (var e = 0; e < t.length; ++e) {
      var r = t[e];
      if (r && r.Math == Math) return r;
    }
    throw Error('Cannot find global object');
  }
  var A = st(this);
  function x(t, e) {
    if (e)
      t: {
        var r = A;
        t = t.split('.');
        for (var n = 0; n < t.length - 1; n++) {
          var i = t[n];
          if (!(i in r)) break t;
          r = r[i];
        }
        (t = t[t.length - 1]),
          (n = r[t]),
          (e = e(n)),
          e != n &&
            e != null &&
            Z(r, t, { configurable: !0, writable: !0, value: e });
      }
  }
  x('Symbol', function (t) {
    function e(u) {
      if (this instanceof e)
        throw new TypeError('Symbol is not a constructor');
      return new r(n + (u || '') + '_' + i++, u);
    }
    function r(u, o) {
      (this.h = u),
        Z(this, 'description', {
          configurable: !0,
          writable: !0,
          value: o,
        });
    }
    if (t) return t;
    r.prototype.toString = function () {
      return this.h;
    };
    var n = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      i = 0;
    return e;
  }),
    x('Symbol.iterator', function (t) {
      if (t) return t;
      t = Symbol('Symbol.iterator');
      for (
        var e =
            'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
              ' '
            ),
          r = 0;
        r < e.length;
        r++
      ) {
        var n = A[e[r]];
        typeof n == 'function' &&
          typeof n.prototype[t] != 'function' &&
          Z(n.prototype, t, {
            configurable: !0,
            writable: !0,
            value: function () {
              return q(B(this));
            },
          });
      }
      return t;
    });
  function q(t) {
    return (
      (t = { next: t }),
      (t[Symbol.iterator] = function () {
        return this;
      }),
      t
    );
  }
  function F(t) {
    var e =
      typeof Symbol < 'u' && Symbol.iterator && t[Symbol.iterator];
    return e ? e.call(t) : { next: B(t) };
  }
  function Ot(t) {
    if (!(t instanceof Array)) {
      t = F(t);
      for (var e, r = []; !(e = t.next()).done; ) r.push(e.value);
      t = r;
    }
    return t;
  }
  var tt =
    typeof Object.assign == 'function'
      ? Object.assign
      : function (t, e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            if (n)
              for (var i in n)
                Object.prototype.hasOwnProperty.call(n, i) &&
                  (t[i] = n[i]);
          }
          return t;
        };
  x('Object.assign', function (t) {
    return t || tt;
  });
  var Wt =
      typeof Object.create == 'function'
        ? Object.create
        : function (t) {
            function e() {}
            return (e.prototype = t), new e();
          },
    et;
  if (typeof Object.setPrototypeOf == 'function')
    et = Object.setPrototypeOf;
  else {
    var D;
    t: {
      var Et = { a: !0 },
        a = {};
      try {
        (a.__proto__ = Et), (D = a.a);
        break t;
      } catch {}
      D = !1;
    }
    et = D
      ? function (t, e) {
          if (((t.__proto__ = e), t.__proto__ !== e))
            throw new TypeError(t + ' is not extensible');
          return t;
        }
      : null;
  }
  var d = et;
  function p(t, e) {
    if (
      ((t.prototype = Wt(e.prototype)),
      (t.prototype.constructor = t),
      d)
    )
      d(t, e);
    else
      for (var r in e)
        if (r != 'prototype')
          if (Object.defineProperties) {
            var n = Object.getOwnPropertyDescriptor(e, r);
            n && Object.defineProperty(t, r, n);
          } else t[r] = e[r];
    t.ya = e.prototype;
  }
  function y() {
    (this.m = !1),
      (this.j = null),
      (this.i = void 0),
      (this.h = 1),
      (this.v = this.s = 0),
      (this.l = null);
  }
  function O(t) {
    if (t.m) throw new TypeError('Generator is already running');
    t.m = !0;
  }
  y.prototype.u = function (t) {
    this.i = t;
  };
  function T(t, e) {
    (t.l = { ma: e, na: !0 }), (t.h = t.s || t.v);
  }
  y.prototype.return = function (t) {
    (this.l = { return: t }), (this.h = this.v);
  };
  function j(t, e, r) {
    return (t.h = r), { value: e };
  }
  function k(t) {
    (this.h = new y()), (this.i = t);
  }
  function Er(t, e) {
    O(t.h);
    var r = t.h.j;
    return r
      ? Ht(
          t,
          'return' in r
            ? r.return
            : function (n) {
                return { value: n, done: !0 };
              },
          e,
          t.h.return
        )
      : (t.h.return(e), ht(t));
  }
  function Ht(t, e, r, n) {
    try {
      var i = e.call(t.h.j, r);
      if (!(i instanceof Object))
        throw new TypeError(
          'Iterator result ' + i + ' is not an object'
        );
      if (!i.done) return (t.h.m = !1), i;
      var u = i.value;
    } catch (o) {
      return (t.h.j = null), T(t.h, o), ht(t);
    }
    return (t.h.j = null), n.call(t.h, u), ht(t);
  }
  function ht(t) {
    for (; t.h.h; )
      try {
        var e = t.i(t.h);
        if (e) return (t.h.m = !1), { value: e.value, done: !1 };
      } catch (r) {
        (t.h.i = void 0), T(t.h, r);
      }
    if (((t.h.m = !1), t.h.l)) {
      if (((e = t.h.l), (t.h.l = null), e.na)) throw e.ma;
      return { value: e.return, done: !0 };
    }
    return { value: void 0, done: !0 };
  }
  function _r(t) {
    (this.next = function (e) {
      return (
        O(t.h),
        t.h.j
          ? (e = Ht(t, t.h.j.next, e, t.h.u))
          : (t.h.u(e), (e = ht(t))),
        e
      );
    }),
      (this.throw = function (e) {
        return (
          O(t.h),
          t.h.j
            ? (e = Ht(t, t.h.j.throw, e, t.h.u))
            : (T(t.h, e), (e = ht(t))),
          e
        );
      }),
      (this.return = function (e) {
        return Er(t, e);
      }),
      (this[Symbol.iterator] = function () {
        return this;
      });
  }
  function Fr(t) {
    function e(n) {
      return t.next(n);
    }
    function r(n) {
      return t.throw(n);
    }
    return new Promise(function (n, i) {
      function u(o) {
        o.done
          ? n(o.value)
          : Promise.resolve(o.value).then(e, r).then(u, i);
      }
      u(t.next());
    });
  }
  function R(t) {
    return Fr(new _r(new k(t)));
  }
  x('Promise', function (t) {
    function e(o) {
      (this.i = 0), (this.j = void 0), (this.h = []), (this.u = !1);
      var s = this.l();
      try {
        o(s.resolve, s.reject);
      } catch (l) {
        s.reject(l);
      }
    }
    function r() {
      this.h = null;
    }
    function n(o) {
      return o instanceof e
        ? o
        : new e(function (s) {
            s(o);
          });
    }
    if (t) return t;
    r.prototype.i = function (o) {
      if (this.h == null) {
        this.h = [];
        var s = this;
        this.j(function () {
          s.m();
        });
      }
      this.h.push(o);
    };
    var i = A.setTimeout;
    (r.prototype.j = function (o) {
      i(o, 0);
    }),
      (r.prototype.m = function () {
        for (; this.h && this.h.length; ) {
          var o = this.h;
          this.h = [];
          for (var s = 0; s < o.length; ++s) {
            var l = o[s];
            o[s] = null;
            try {
              l();
            } catch (f) {
              this.l(f);
            }
          }
        }
        this.h = null;
      }),
      (r.prototype.l = function (o) {
        this.j(function () {
          throw o;
        });
      }),
      (e.prototype.l = function () {
        function o(f) {
          return function (c) {
            l || ((l = !0), f.call(s, c));
          };
        }
        var s = this,
          l = !1;
        return { resolve: o(this.I), reject: o(this.m) };
      }),
      (e.prototype.I = function (o) {
        if (o === this)
          this.m(new TypeError('A Promise cannot resolve to itself'));
        else if (o instanceof e) this.L(o);
        else {
          t: switch (typeof o) {
            case 'object':
              var s = o != null;
              break t;
            case 'function':
              s = !0;
              break t;
            default:
              s = !1;
          }
          s ? this.F(o) : this.s(o);
        }
      }),
      (e.prototype.F = function (o) {
        var s = void 0;
        try {
          s = o.then;
        } catch (l) {
          this.m(l);
          return;
        }
        typeof s == 'function' ? this.M(s, o) : this.s(o);
      }),
      (e.prototype.m = function (o) {
        this.v(2, o);
      }),
      (e.prototype.s = function (o) {
        this.v(1, o);
      }),
      (e.prototype.v = function (o, s) {
        if (this.i != 0)
          throw Error(
            'Cannot settle(' +
              o +
              ', ' +
              s +
              '): Promise already settled in state' +
              this.i
          );
        (this.i = o),
          (this.j = s),
          this.i === 2 && this.K(),
          this.H();
      }),
      (e.prototype.K = function () {
        var o = this;
        i(function () {
          if (o.D()) {
            var s = A.console;
            typeof s < 'u' && s.error(o.j);
          }
        }, 1);
      }),
      (e.prototype.D = function () {
        if (this.u) return !1;
        var o = A.CustomEvent,
          s = A.Event,
          l = A.dispatchEvent;
        return typeof l > 'u'
          ? !0
          : (typeof o == 'function'
              ? (o = new o('unhandledrejection', { cancelable: !0 }))
              : typeof s == 'function'
              ? (o = new s('unhandledrejection', { cancelable: !0 }))
              : ((o = A.document.createEvent('CustomEvent')),
                o.initCustomEvent('unhandledrejection', !1, !0, o)),
            (o.promise = this),
            (o.reason = this.j),
            l(o));
      }),
      (e.prototype.H = function () {
        if (this.h != null) {
          for (var o = 0; o < this.h.length; ++o) u.i(this.h[o]);
          this.h = null;
        }
      });
    var u = new r();
    return (
      (e.prototype.L = function (o) {
        var s = this.l();
        o.T(s.resolve, s.reject);
      }),
      (e.prototype.M = function (o, s) {
        var l = this.l();
        try {
          o.call(s, l.resolve, l.reject);
        } catch (f) {
          l.reject(f);
        }
      }),
      (e.prototype.then = function (o, s) {
        function l(v, h) {
          return typeof v == 'function'
            ? function (g) {
                try {
                  f(v(g));
                } catch (w) {
                  c(w);
                }
              }
            : h;
        }
        var f,
          c,
          m = new e(function (v, h) {
            (f = v), (c = h);
          });
        return this.T(l(o, f), l(s, c)), m;
      }),
      (e.prototype.catch = function (o) {
        return this.then(void 0, o);
      }),
      (e.prototype.T = function (o, s) {
        function l() {
          switch (f.i) {
            case 1:
              o(f.j);
              break;
            case 2:
              s(f.j);
              break;
            default:
              throw Error('Unexpected state: ' + f.i);
          }
        }
        var f = this;
        this.h == null ? u.i(l) : this.h.push(l), (this.u = !0);
      }),
      (e.resolve = n),
      (e.reject = function (o) {
        return new e(function (s, l) {
          l(o);
        });
      }),
      (e.race = function (o) {
        return new e(function (s, l) {
          for (var f = F(o), c = f.next(); !c.done; c = f.next())
            n(c.value).T(s, l);
        });
      }),
      (e.all = function (o) {
        var s = F(o),
          l = s.next();
        return l.done
          ? n([])
          : new e(function (f, c) {
              function m(g) {
                return function (w) {
                  (v[g] = w), h--, h == 0 && f(v);
                };
              }
              var v = [],
                h = 0;
              do
                v.push(void 0),
                  h++,
                  n(l.value).T(m(v.length - 1), c),
                  (l = s.next());
              while (!l.done);
            });
      }),
      e
    );
  });
  function Sr(t, e) {
    t instanceof String && (t += '');
    var r = 0,
      n = !1,
      i = {
        next: function () {
          if (!n && r < t.length) {
            var u = r++;
            return { value: e(u, t[u]), done: !1 };
          }
          return (n = !0), { done: !0, value: void 0 };
        },
      };
    return (
      (i[Symbol.iterator] = function () {
        return i;
      }),
      i
    );
  }
  x('Array.prototype.keys', function (t) {
    return (
      t ||
      function () {
        return Sr(this, function (e) {
          return e;
        });
      }
    );
  }),
    x('Array.prototype.fill', function (t) {
      return (
        t ||
        function (e, r, n) {
          var i = this.length || 0;
          for (
            0 > r && (r = Math.max(0, i + r)),
              (n == null || n > i) && (n = i),
              n = Number(n),
              0 > n && (n = Math.max(0, i + n)),
              r = Number(r || 0);
            r < n;
            r++
          )
            this[r] = e;
          return this;
        }
      );
    });
  function $(t) {
    return t || Array.prototype.fill;
  }
  x('Int8Array.prototype.fill', $),
    x('Uint8Array.prototype.fill', $),
    x('Uint8ClampedArray.prototype.fill', $),
    x('Int16Array.prototype.fill', $),
    x('Uint16Array.prototype.fill', $),
    x('Int32Array.prototype.fill', $),
    x('Uint32Array.prototype.fill', $),
    x('Float32Array.prototype.fill', $),
    x('Float64Array.prototype.fill', $),
    x('Object.is', function (t) {
      return (
        t ||
        function (e, r) {
          return e === r
            ? e !== 0 || 1 / e === 1 / r
            : e !== e && r !== r;
        }
      );
    }),
    x('Array.prototype.includes', function (t) {
      return (
        t ||
        function (e, r) {
          var n = this;
          n instanceof String && (n = String(n));
          var i = n.length;
          for (
            r = r || 0, 0 > r && (r = Math.max(r + i, 0));
            r < i;
            r++
          ) {
            var u = n[r];
            if (u === e || Object.is(u, e)) return !0;
          }
          return !1;
        }
      );
    }),
    x('String.prototype.includes', function (t) {
      return (
        t ||
        function (e, r) {
          if (this == null)
            throw new TypeError(
              "The 'this' value for String.prototype.includes must not be null or undefined"
            );
          if (e instanceof RegExp)
            throw new TypeError(
              'First argument to String.prototype.includes must not be a regular expression'
            );
          return this.indexOf(e, r || 0) !== -1;
        }
      );
    });
  var Gt = this || self;
  function pt(t, e) {
    t = t.split('.');
    var r = Gt;
    t[0] in r ||
      typeof r.execScript > 'u' ||
      r.execScript('var ' + t[0]);
    for (var n; t.length && (n = t.shift()); )
      t.length || e === void 0
        ? r[n] && r[n] !== Object.prototype[n]
          ? (r = r[n])
          : (r = r[n] = {})
        : (r[n] = e);
  }
  function ve(t) {
    var e;
    t: {
      if ((e = Gt.navigator) && (e = e.userAgent)) break t;
      e = '';
    }
    return e.indexOf(t) != -1;
  }
  var Tr = Array.prototype.map
      ? function (t, e) {
          return Array.prototype.map.call(t, e, void 0);
        }
      : function (t, e) {
          for (
            var r = t.length,
              n = Array(r),
              i = typeof t == 'string' ? t.split('') : t,
              u = 0;
            u < r;
            u++
          )
            u in i && (n[u] = e.call(void 0, i[u], u, t));
          return n;
        },
    de = {},
    vt = null;
  function Cr(t) {
    var e = t.length,
      r = (3 * e) / 4;
    r % 3
      ? (r = Math.floor(r))
      : '=.'.indexOf(t[e - 1]) != -1 &&
        (r = '=.'.indexOf(t[e - 2]) != -1 ? r - 2 : r - 1);
    var n = new Uint8Array(r),
      i = 0;
    return (
      Pr(t, function (u) {
        n[i++] = u;
      }),
      i !== r ? n.subarray(0, i) : n
    );
  }
  function Pr(t, e) {
    function r(l) {
      for (; n < t.length; ) {
        var f = t.charAt(n++),
          c = vt[f];
        if (c != null) return c;
        if (!/^[\s\xa0]*$/.test(f))
          throw Error('Unknown base64 encoding at char: ' + f);
      }
      return l;
    }
    ye();
    for (var n = 0; ; ) {
      var i = r(-1),
        u = r(0),
        o = r(64),
        s = r(64);
      if (s === 64 && i === -1) break;
      e((i << 2) | (u >> 4)),
        o != 64 &&
          (e(((u << 4) & 240) | (o >> 2)),
          s != 64 && e(((o << 6) & 192) | s));
    }
  }
  function ye() {
    if (!vt) {
      vt = {};
      for (
        var t =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
              ''
            ),
          e = ['+/=', '+/', '-_=', '-_.', '-_'],
          r = 0;
        5 > r;
        r++
      ) {
        var n = t.concat(e[r].split(''));
        de[r] = n;
        for (var i = 0; i < n.length; i++) {
          var u = n[i];
          vt[u] === void 0 && (vt[u] = i);
        }
      }
    }
  }
  var Vt = typeof Uint8Array < 'u',
    me =
      !(ve('Trident') || ve('MSIE')) && typeof Gt.btoa == 'function';
  function ge(t) {
    if (!me) {
      var e;
      e === void 0 && (e = 0), ye(), (e = de[e]);
      for (
        var r = Array(Math.floor(t.length / 3)),
          n = e[64] || '',
          i = 0,
          u = 0;
        i < t.length - 2;
        i += 3
      ) {
        var o = t[i],
          s = t[i + 1],
          l = t[i + 2],
          f = e[o >> 2];
        (o = e[((o & 3) << 4) | (s >> 4)]),
          (s = e[((s & 15) << 2) | (l >> 6)]),
          (l = e[l & 63]),
          (r[u++] = f + o + s + l);
      }
      switch (((f = 0), (l = n), t.length - i)) {
        case 2:
          (f = t[i + 1]), (l = e[(f & 15) << 2] || n);
        case 1:
          (t = t[i]),
            (r[u] = e[t >> 2] + e[((t & 3) << 4) | (f >> 4)] + l + n);
      }
      return r.join('');
    }
    for (e = ''; 10240 < t.length; )
      (e += String.fromCharCode.apply(null, t.subarray(0, 10240))),
        (t = t.subarray(10240));
    return (e += String.fromCharCode.apply(null, t)), btoa(e);
  }
  var we = RegExp('[-_.]', 'g');
  function Ur(t) {
    switch (t) {
      case '-':
        return '+';
      case '_':
        return '/';
      case '.':
        return '=';
      default:
        return '';
    }
  }
  function Ae(t) {
    if (!me) return Cr(t);
    we.test(t) && (t = t.replace(we, Ur)), (t = atob(t));
    for (var e = new Uint8Array(t.length), r = 0; r < t.length; r++)
      e[r] = t.charCodeAt(r);
    return e;
  }
  var je;
  function zt() {
    return je || (je = new Uint8Array(0));
  }
  var dt = {},
    Mr = typeof Uint8Array.prototype.slice == 'function',
    P = 0,
    N = 0;
  function xe(t) {
    var e = 0 > t;
    t = Math.abs(t);
    var r = t >>> 0;
    (t = Math.floor((t - r) / 4294967296)),
      e &&
        ((r = F(be(r, t))),
        (e = r.next().value),
        (t = r.next().value),
        (r = e)),
      (P = r >>> 0),
      (N = t >>> 0);
  }
  var Rr = typeof BigInt == 'function';
  function be(t, e) {
    return (e = ~e), t ? (t = ~t + 1) : (e += 1), [t, e];
  }
  function Oe(t, e) {
    (this.i = t >>> 0), (this.h = e >>> 0);
  }
  function Ee(t) {
    if (!t) return _e || (_e = new Oe(0, 0));
    if (!/^-?\d+$/.test(t)) return null;
    if (16 > t.length) xe(Number(t));
    else if (Rr)
      (t = BigInt(t)),
        (P = Number(t & BigInt(4294967295)) >>> 0),
        (N = Number((t >> BigInt(32)) & BigInt(4294967295)));
    else {
      var e = +(t[0] === '-');
      N = P = 0;
      for (
        var r = t.length, n = e, i = ((r - e) % 6) + e;
        i <= r;
        n = i, i += 6
      )
        (n = Number(t.slice(n, i))),
          (N *= 1e6),
          (P = 1e6 * P + n),
          4294967296 <= P &&
            ((N += (P / 4294967296) | 0), (P %= 4294967296));
      e &&
        ((e = F(be(P, N))),
        (t = e.next().value),
        (e = e.next().value),
        (P = t),
        (N = e));
    }
    return new Oe(P, N);
  }
  var _e;
  function Fe(t, e) {
    return Error(
      'Invalid wire type: ' + t + ' (at position ' + e + ')'
    );
  }
  function Xt() {
    return Error('Failed to read varint, encoding is invalid.');
  }
  function Se(t, e) {
    return Error(
      'Tried to read past the end of the data ' + e + ' > ' + t
    );
  }
  function rt() {
    throw Error('Invalid UTF8');
  }
  function Te(t, e) {
    return (
      (e = String.fromCharCode.apply(null, e)), t == null ? e : t + e
    );
  }
  var _t = void 0,
    Yt,
    Nr = typeof TextDecoder < 'u',
    Ce,
    Lr = typeof TextEncoder < 'u',
    Pe;
  function Ue(t) {
    if (t !== dt) throw Error('illegal external caller');
  }
  function yt(t, e) {
    if ((Ue(e), (this.V = t), t != null && t.length === 0))
      throw Error(
        'ByteString should be constructed with non-empty values'
      );
  }
  function Kt() {
    return Pe || (Pe = new yt(null, dt));
  }
  function Me(t) {
    Ue(dt);
    var e = t.V;
    return (
      (e =
        e == null || (Vt && e != null && e instanceof Uint8Array)
          ? e
          : typeof e == 'string'
          ? Ae(e)
          : null),
      e == null ? e : (t.V = e)
    );
  }
  function Ir(t) {
    if (typeof t == 'string') return { buffer: Ae(t), C: !1 };
    if (Array.isArray(t)) return { buffer: new Uint8Array(t), C: !1 };
    if (t.constructor === Uint8Array) return { buffer: t, C: !1 };
    if (t.constructor === ArrayBuffer)
      return { buffer: new Uint8Array(t), C: !1 };
    if (t.constructor === yt) return { buffer: Me(t) || zt(), C: !0 };
    if (t instanceof Uint8Array)
      return {
        buffer: new Uint8Array(t.buffer, t.byteOffset, t.byteLength),
        C: !1,
      };
    throw Error(
      'Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers'
    );
  }
  function Re(t, e) {
    (this.i = null),
      (this.m = !1),
      (this.h = this.j = this.l = 0),
      Zt(this, t, e);
  }
  function Zt(t, e, r) {
    (r = r === void 0 ? {} : r),
      (t.S = r.S === void 0 ? !1 : r.S),
      e &&
        ((e = Ir(e)),
        (t.i = e.buffer),
        (t.m = e.C),
        (t.l = 0),
        (t.j = t.i.length),
        (t.h = t.l));
  }
  Re.prototype.reset = function () {
    this.h = this.l;
  };
  function nt(t, e) {
    if (((t.h = e), e > t.j)) throw Se(t.j, e);
  }
  function mt(t) {
    var e = t.i,
      r = t.h,
      n = e[r++],
      i = n & 127;
    if (
      n & 128 &&
      ((n = e[r++]),
      (i |= (n & 127) << 7),
      n & 128 &&
        ((n = e[r++]),
        (i |= (n & 127) << 14),
        n & 128 &&
          ((n = e[r++]),
          (i |= (n & 127) << 21),
          n & 128 &&
            ((n = e[r++]),
            (i |= n << 28),
            n & 128 &&
              e[r++] & 128 &&
              e[r++] & 128 &&
              e[r++] & 128 &&
              e[r++] & 128 &&
              e[r++] & 128))))
    )
      throw Xt();
    return nt(t, r), i;
  }
  function Ne(t, e) {
    if (0 > e)
      throw Error('Tried to read a negative byte length: ' + e);
    var r = t.h,
      n = r + e;
    if (n > t.j) throw Se(e, t.j - r);
    return (t.h = n), r;
  }
  var Le = [];
  function $t() {
    this.h = [];
  }
  ($t.prototype.length = function () {
    return this.h.length;
  }),
    ($t.prototype.end = function () {
      var t = this.h;
      return (this.h = []), t;
    });
  function Ie(t, e, r) {
    for (; 0 < r || 127 < e; )
      t.h.push((e & 127) | 128),
        (e = ((e >>> 7) | (r << 25)) >>> 0),
        (r >>>= 7);
    t.h.push(e);
  }
  function it(t, e) {
    for (; 127 < e; ) t.h.push((e & 127) | 128), (e >>>= 7);
    t.h.push(e);
  }
  function Qt(t, e) {
    if (Le.length) {
      var r = Le.pop();
      Zt(r, t, e), (t = r);
    } else t = new Re(t, e);
    (this.h = t),
      (this.j = this.h.h),
      (this.i = this.l = -1),
      this.setOptions(e);
  }
  (Qt.prototype.setOptions = function (t) {
    (t = t === void 0 ? {} : t),
      (this.ca = t.ca === void 0 ? !1 : t.ca);
  }),
    (Qt.prototype.reset = function () {
      this.h.reset(), (this.j = this.h.h), (this.i = this.l = -1);
    });
  function Be(t) {
    var e = t.h;
    if (e.h == e.j) return !1;
    t.j = t.h.h;
    var r = mt(t.h) >>> 0;
    if (((e = r >>> 3), (r &= 7), !(0 <= r && 5 >= r)))
      throw Fe(r, t.j);
    if (1 > e)
      throw Error(
        'Invalid field number: ' + e + ' (at position ' + t.j + ')'
      );
    return (t.l = e), (t.i = r), !0;
  }
  function Ft(t) {
    switch (t.i) {
      case 0:
        if (t.i != 0) Ft(t);
        else
          t: {
            t = t.h;
            for (var e = t.h, r = e + 10, n = t.i; e < r; )
              if (!(n[e++] & 128)) {
                nt(t, e);
                break t;
              }
            throw Xt();
          }
        break;
      case 1:
        (t = t.h), nt(t, t.h + 8);
        break;
      case 2:
        t.i != 2
          ? Ft(t)
          : ((e = mt(t.h) >>> 0), (t = t.h), nt(t, t.h + e));
        break;
      case 5:
        (t = t.h), nt(t, t.h + 4);
        break;
      case 3:
        e = t.l;
        do {
          if (!Be(t))
            throw Error('Unmatched start-group tag: stream EOF');
          if (t.i == 4) {
            if (t.l != e) throw Error('Unmatched end-group tag');
            break;
          }
          Ft(t);
        } while (1);
        break;
      default:
        throw Fe(t.i, t.j);
    }
  }
  var St = [];
  function Br() {
    (this.j = []), (this.i = 0), (this.h = new $t());
  }
  function lt(t, e) {
    e.length !== 0 && (t.j.push(e), (t.i += e.length));
  }
  function Dr(t, e) {
    if ((e = e.R)) {
      lt(t, t.h.end());
      for (var r = 0; r < e.length; r++) lt(t, Me(e[r]) || zt());
    }
  }
  var Q =
    typeof Symbol == 'function' && typeof Symbol() == 'symbol'
      ? Symbol()
      : void 0;
  function ot(t, e) {
    return Q
      ? (t[Q] |= e)
      : t.A !== void 0
      ? (t.A |= e)
      : (Object.defineProperties(t, {
          A: {
            value: e,
            configurable: !0,
            writable: !0,
            enumerable: !1,
          },
        }),
        e);
  }
  function De(t, e) {
    Q ? t[Q] && (t[Q] &= ~e) : t.A !== void 0 && (t.A &= ~e);
  }
  function C(t) {
    var e;
    return Q ? (e = t[Q]) : (e = t.A), e ?? 0;
  }
  function V(t, e) {
    Q
      ? (t[Q] = e)
      : t.A !== void 0
      ? (t.A = e)
      : Object.defineProperties(t, {
          A: {
            value: e,
            configurable: !0,
            writable: !0,
            enumerable: !1,
          },
        });
  }
  function Jt(t) {
    return ot(t, 1), t;
  }
  function kr(t, e) {
    V(e, (t | 0) & -51);
  }
  function Tt(t, e) {
    V(e, (t | 18) & -41);
  }
  var qt = {};
  function Ct(t) {
    return (
      t !== null &&
      typeof t == 'object' &&
      !Array.isArray(t) &&
      t.constructor === Object
    );
  }
  var gt,
    ke = [];
  V(ke, 23), (gt = Object.freeze(ke));
  function te(t) {
    if (C(t.o) & 2) throw Error('Cannot mutate an immutable Message');
  }
  function ee(t) {
    var e = t.length;
    (e = e ? t[e - 1] : void 0) && Ct(e)
      ? (e.g = 1)
      : ((e = {}), t.push(((e.g = 1), e)));
  }
  function We(t) {
    var e = t.i + t.G;
    return t.B || (t.B = t.o[e] = {});
  }
  function H(t, e) {
    return e === -1
      ? null
      : e >= t.i
      ? t.B
        ? t.B[e]
        : void 0
      : t.o[e + t.G];
  }
  function z(t, e, r, n) {
    te(t), wt(t, e, r, n);
  }
  function wt(t, e, r, n) {
    t.j && (t.j = void 0),
      e >= t.i || n
        ? (We(t)[e] = r)
        : ((t.o[e + t.G] = r), (t = t.B) && e in t && delete t[e]);
  }
  function re(t, e, r, n) {
    var i = H(t, e);
    Array.isArray(i) || (i = gt);
    var u = C(i);
    if ((u & 1 || Jt(i), n))
      u & 2 || ot(i, 2), r & 1 || Object.freeze(i);
    else {
      n = !(r & 2);
      var o = u & 2;
      r & 1 || !o
        ? n && u & 16 && !o && De(i, 16)
        : ((i = Jt(Array.prototype.slice.call(i))), wt(t, e, i));
    }
    return i;
  }
  function ne(t, e) {
    var r = H(t, e),
      n =
        r == null
          ? r
          : typeof r == 'number' ||
            r === 'NaN' ||
            r === 'Infinity' ||
            r === '-Infinity'
          ? Number(r)
          : void 0;
    return n != null && n !== r && wt(t, e, n), n;
  }
  function He(t, e, r, n, i) {
    t.h || (t.h = {});
    var u = t.h[r],
      o = re(t, r, 3, i);
    if (!u) {
      var s = o;
      u = [];
      var l = !!(C(t.o) & 16);
      o = !!(C(s) & 2);
      var f = s;
      !i && o && (s = Array.prototype.slice.call(s));
      for (var c = o, m = 0; m < s.length; m++) {
        var v = s[m],
          h = e,
          g = !1;
        if (
          ((g = g === void 0 ? !1 : g),
          (v = Array.isArray(v) ? new h(v) : g ? new h() : void 0),
          v !== void 0)
        ) {
          h = v.o;
          var w = (g = C(h));
          o && (w |= 2),
            l && (w |= 16),
            w != g && V(h, w),
            (h = w),
            (c = c || !!(2 & h)),
            u.push(v);
        }
      }
      return (
        (t.h[r] = u),
        (l = C(s)),
        (e = l | 33),
        (e = c ? e & -9 : e | 8),
        l != e &&
          ((c = s),
          Object.isFrozen(c) && (c = Array.prototype.slice.call(c)),
          V(c, e),
          (s = c)),
        f !== s && wt(t, r, s),
        (i || (n && o)) && ot(u, 2),
        n && Object.freeze(u),
        u
      );
    }
    return (
      i ||
        ((i = Object.isFrozen(u)),
        n && !i
          ? Object.freeze(u)
          : !n &&
            i &&
            ((u = Array.prototype.slice.call(u)), (t.h[r] = u))),
      u
    );
  }
  function Pt(t, e, r) {
    var n = !!(C(t.o) & 2);
    if (
      ((e = He(t, e, r, n, n)),
      (t = re(t, r, 3, n)),
      !(n || C(t) & 8))
    ) {
      for (n = 0; n < e.length; n++) {
        if (((r = e[n]), C(r.o) & 2)) {
          var i = Ke(r, !1);
          i.j = r;
        } else i = r;
        r !== i && ((e[n] = i), (t[n] = i.o));
      }
      ot(t, 8);
    }
    return e;
  }
  function X(t, e, r) {
    if (r != null && typeof r != 'number')
      throw Error(
        'Value of float/double field must be a number|null|undefined, found ' +
          typeof r +
          ': ' +
          r
      );
    z(t, e, r);
  }
  function Ge(t, e, r, n, i) {
    te(t);
    var u = He(t, r, e, !1, !1);
    return (
      (r = n ?? new r()),
      (t = re(t, e, 2, !1)),
      i != null
        ? (u.splice(i, 0, r), t.splice(i, 0, r.o))
        : (u.push(r), t.push(r.o)),
      r.C() && De(t, 8),
      r
    );
  }
  function Ut(t, e) {
    return t ?? e;
  }
  function Y(t, e, r) {
    return (r = r === void 0 ? 0 : r), Ut(ne(t, e), r);
  }
  var Mt;
  function Wr(t) {
    switch (typeof t) {
      case 'number':
        return isFinite(t) ? t : String(t);
      case 'object':
        if (t)
          if (Array.isArray(t)) {
            if (C(t) & 128)
              return (t = Array.prototype.slice.call(t)), ee(t), t;
          } else {
            if (Vt && t != null && t instanceof Uint8Array)
              return ge(t);
            if (t instanceof yt) {
              var e = t.V;
              return e == null
                ? ''
                : typeof e == 'string'
                ? e
                : (t.V = ge(e));
            }
          }
    }
    return t;
  }
  function Ve(t, e, r, n) {
    if (t != null) {
      if (Array.isArray(t)) t = ie(t, e, r, n !== void 0);
      else if (Ct(t)) {
        var i = {},
          u;
        for (u in t) i[u] = Ve(t[u], e, r, n);
        t = i;
      } else t = e(t, n);
      return t;
    }
  }
  function ie(t, e, r, n) {
    var i = C(t);
    (n = n ? !!(i & 16) : void 0),
      (t = Array.prototype.slice.call(t));
    for (var u = 0; u < t.length; u++) t[u] = Ve(t[u], e, r, n);
    return r(i, t), t;
  }
  function Hr(t) {
    return t.ja === qt ? t.toJSON() : Wr(t);
  }
  function Gr(t, e) {
    t & 128 && ee(e);
  }
  function ze(t, e, r) {
    if (((r = r === void 0 ? Tt : r), t != null)) {
      if (Vt && t instanceof Uint8Array)
        return t.length ? new yt(new Uint8Array(t), dt) : Kt();
      if (Array.isArray(t)) {
        var n = C(t);
        return n & 2
          ? t
          : e && !(n & 32) && (n & 16 || n === 0)
          ? (V(t, n | 2), t)
          : ((t = ie(t, ze, n & 4 ? Tt : r, !0)),
            (e = C(t)),
            e & 4 && e & 2 && Object.freeze(t),
            t);
      }
      return t.ja === qt ? Ye(t) : t;
    }
  }
  function Xe(t, e, r, n, i, u, o) {
    if ((t = t.h && t.h[r])) {
      if (
        ((n = C(t)),
        n & 2
          ? (n = t)
          : ((u = Tr(t, Ye)), Tt(n, u), Object.freeze(u), (n = u)),
        te(e),
        (o = n == null ? gt : Jt([])),
        n != null)
      ) {
        for (u = !!n.length, t = 0; t < n.length; t++) {
          var s = n[t];
          (u = u && !(C(s.o) & 2)), (o[t] = s.o);
        }
        (u = (u ? 8 : 0) | 1),
          (t = C(o)),
          (t & u) !== u &&
            (Object.isFrozen(o) &&
              (o = Array.prototype.slice.call(o)),
            V(o, t | u)),
          e.h || (e.h = {}),
          (e.h[r] = n);
      } else e.h && (e.h[r] = void 0);
      wt(e, r, o, i);
    } else z(e, r, ze(n, u, o), i);
  }
  function Ye(t) {
    return C(t.o) & 2 || ((t = Ke(t, !0)), ot(t.o, 2)), t;
  }
  function Ke(t, e) {
    var r = t.o,
      n = [];
    ot(n, 16);
    var i = t.constructor.h;
    if ((i && n.push(i), (i = t.B), i)) {
      (n.length = r.length), n.fill(void 0, n.length, r.length);
      var u = {};
      n[n.length - 1] = u;
    }
    C(r) & 128 && ee(n),
      (e = e || t.C() ? Tt : kr),
      (u = t.constructor),
      (Mt = n),
      (n = new u(n)),
      (Mt = void 0),
      t.R && (n.R = t.R.slice()),
      (u = !!(C(r) & 16));
    for (var o = i ? r.length - 1 : r.length, s = 0; s < o; s++)
      Xe(t, n, s - t.G, r[s], !1, u, e);
    if (i) for (var l in i) Xe(t, n, +l, i[l], !0, u, e);
    return n;
  }
  function L(t, e, r) {
    t == null && (t = Mt), (Mt = void 0);
    var n = this.constructor.i || 0,
      i = 0 < n,
      u = this.constructor.h,
      o = !1;
    if (t == null) {
      t = u ? [u] : [];
      var s = 48,
        l = !0;
      i && ((n = 0), (s |= 128)), V(t, s);
    } else {
      if (!Array.isArray(t) || (u && u !== t[0])) throw Error();
      var f = (s = ot(t, 0));
      if (
        ((l = (16 & f) !== 0) && ((o = (32 & f) !== 0) || (f |= 32)),
        i)
      ) {
        if (128 & f) n = 0;
        else if (0 < t.length) {
          var c = t[t.length - 1];
          if (Ct(c) && 'g' in c) {
            (n = 0), (f |= 128), delete c.g;
            var m = !0,
              v;
            for (v in c) {
              m = !1;
              break;
            }
            m && t.pop();
          }
        }
      } else if (128 & f) throw Error();
      s !== f && V(t, f);
    }
    (this.G = (u ? 0 : -1) - n), (this.h = void 0), (this.o = t);
    t: {
      if (
        ((u = this.o.length),
        (n = u - 1),
        u && ((u = this.o[n]), Ct(u)))
      ) {
        (this.B = u), (this.i = n - this.G);
        break t;
      }
      e !== void 0 && -1 < e
        ? ((this.i = Math.max(e, n + 1 - this.G)), (this.B = void 0))
        : (this.i = Number.MAX_VALUE);
    }
    if (!i && this.B && 'g' in this.B)
      throw Error(
        'Unexpected "g" flag in sparse object of message that is not a group type.'
      );
    if (r) {
      (e = l && !o && !0), (i = this.i);
      var h;
      for (l = 0; l < r.length; l++)
        (o = r[l]),
          o < i
            ? ((o += this.G), (n = t[o]) ? Ze(n, e) : (t[o] = gt))
            : (h || (h = We(this)),
              (n = h[o]) ? Ze(n, e) : (h[o] = gt));
    }
  }
  (L.prototype.toJSON = function () {
    return ie(this.o, Hr, Gr);
  }),
    (L.prototype.C = function () {
      return !!(C(this.o) & 2);
    });
  function Ze(t, e) {
    if (Array.isArray(t)) {
      var r = C(t),
        n = 1;
      !e || r & 2 || (n |= 16), (r & n) !== n && V(t, r | n);
    }
  }
  (L.prototype.ja = qt),
    (L.prototype.toString = function () {
      return this.o.toString();
    });
  function $e(t, e, r) {
    if (r) {
      var n = {},
        i;
      for (i in r) {
        var u = r[i],
          o = u.qa;
        o ||
          ((n.J = u.wa || u.oa.W),
          u.ia
            ? ((n.aa = er(u.ia)),
              (o = (function (s) {
                return function (l, f, c) {
                  return s.J(l, f, c, s.aa);
                };
              })(n)))
            : u.ka
            ? ((n.Z = rr(u.da.P, u.ka)),
              (o = (function (s) {
                return function (l, f, c) {
                  return s.J(l, f, c, s.Z);
                };
              })(n)))
            : (o = n.J),
          (u.qa = o)),
          o(e, t, u.da),
          (n = { J: n.J, aa: n.aa, Z: n.Z });
      }
    }
    Dr(e, t);
  }
  var Rt = Symbol();
  function Qe(t, e, r) {
    return (
      t[Rt] ||
      (t[Rt] = function (n, i) {
        return e(n, i, r);
      })
    );
  }
  function Je(t) {
    var e = t[Rt];
    if (!e) {
      var r = ue(t);
      (e = function (n, i) {
        return nr(n, i, r);
      }),
        (t[Rt] = e);
    }
    return e;
  }
  function Vr(t) {
    var e = t.ia;
    if (e) return Je(e);
    if ((e = t.va)) return Qe(t.da.P, e, t.ka);
  }
  function zr(t) {
    var e = Vr(t),
      r = t.da,
      n = t.oa.U;
    return e
      ? function (i, u) {
          return n(i, u, r, e);
        }
      : function (i, u) {
          return n(i, u, r);
        };
  }
  function qe(t, e) {
    var r = t[e];
    return (
      typeof r == 'function' &&
        r.length === 0 &&
        ((r = r()), (t[e] = r)),
      Array.isArray(r) &&
      (jt in r ||
        At in r ||
        (0 < r.length && typeof r[0] == 'function'))
        ? r
        : void 0
    );
  }
  function tr(t, e, r, n, i, u) {
    e.P = t[0];
    var o = 1;
    if (t.length > o && typeof t[o] != 'number') {
      var s = t[o++];
      r(e, s);
    }
    for (; o < t.length; ) {
      r = t[o++];
      for (var l = o + 1; l < t.length && typeof t[l] != 'number'; )
        l++;
      switch (((s = t[o++]), (l -= o), l)) {
        case 0:
          n(e, r, s);
          break;
        case 1:
          (l = qe(t, o)) ? (o++, i(e, r, s, l)) : n(e, r, s, t[o++]);
          break;
        case 2:
          (l = o++), (l = qe(t, l)), i(e, r, s, l, t[o++]);
          break;
        case 3:
          u(e, r, s, t[o++], t[o++], t[o++]);
          break;
        case 4:
          u(e, r, s, t[o++], t[o++], t[o++], t[o++]);
          break;
        default:
          throw Error(
            'unexpected number of binary field arguments: ' + l
          );
      }
    }
    return e;
  }
  var Nt = Symbol();
  function er(t) {
    var e = t[Nt];
    if (!e) {
      var r = oe(t);
      (e = function (n, i) {
        return ir(n, i, r);
      }),
        (t[Nt] = e);
    }
    return e;
  }
  function rr(t, e) {
    var r = t[Nt];
    return (
      r ||
        ((r = function (n, i) {
          return $e(n, i, e);
        }),
        (t[Nt] = r)),
      r
    );
  }
  var At = Symbol();
  function Xr(t, e) {
    t.push(e);
  }
  function Yr(t, e, r) {
    t.push(e, r.W);
  }
  function Kr(t, e, r, n) {
    var i = er(n),
      u = oe(n).P,
      o = r.W;
    t.push(e, function (s, l, f) {
      return o(s, l, f, u, i);
    });
  }
  function Zr(t, e, r, n, i, u) {
    var o = rr(n, u),
      s = r.W;
    t.push(e, function (l, f, c) {
      return s(l, f, c, n, o);
    });
  }
  function oe(t) {
    var e = t[At];
    return (
      e ||
      ((e = tr(t, (t[At] = []), Xr, Yr, Kr, Zr)),
      jt in t && At in t && (t.length = 0),
      e)
    );
  }
  var jt = Symbol();
  function $r(t, e) {
    t[0] = e;
  }
  function Qr(t, e, r, n) {
    var i = r.U;
    t[e] = n
      ? function (u, o, s) {
          return i(u, o, s, n);
        }
      : i;
  }
  function Jr(t, e, r, n, i) {
    var u = r.U,
      o = Je(n),
      s = ue(n).P;
    t[e] = function (l, f, c) {
      return u(l, f, c, s, o, i);
    };
  }
  function qr(t, e, r, n, i, u, o) {
    var s = r.U,
      l = Qe(n, i, u);
    t[e] = function (f, c, m) {
      return s(f, c, m, n, l, o);
    };
  }
  function ue(t) {
    var e = t[jt];
    return (
      e ||
      ((e = tr(t, (t[jt] = {}), $r, Qr, Jr, qr)),
      jt in t && At in t && (t.length = 0),
      e)
    );
  }
  function nr(t, e, r) {
    for (; Be(e) && e.i != 4; ) {
      var n = e.l,
        i = r[n];
      if (!i) {
        var u = r[0];
        u && (u = u[n]) && (i = r[n] = zr(u));
      }
      if (!i || !i(e, t, n)) {
        (i = e), (n = t), (u = i.j), Ft(i);
        var o = i;
        if (!o.ca) {
          if (((i = o.h.h - u), (o.h.h = u), (o = o.h), i == 0))
            i = Kt();
          else {
            if (((u = Ne(o, i)), o.S && o.m))
              i = o.i.subarray(u, u + i);
            else {
              o = o.i;
              var s = u;
              (i = u + i),
                (i =
                  s === i
                    ? zt()
                    : Mr
                    ? o.slice(s, i)
                    : new Uint8Array(o.subarray(s, i)));
            }
            i = i.length == 0 ? Kt() : new yt(i, dt);
          }
          (u = n.R) ? u.push(i) : (n.R = [i]);
        }
      }
    }
    return t;
  }
  function ir(t, e, r) {
    for (
      var n = r.length, i = n % 2 == 1, u = i ? 1 : 0;
      u < n;
      u += 2
    )
      (0, r[u + 1])(e, t, r[u]);
    $e(t, e, i ? r[0] : void 0);
  }
  function xt(t, e) {
    return { U: t, W: e };
  }
  var G = xt(
      function (t, e, r) {
        if (t.i !== 5) return !1;
        t = t.h;
        var n = t.i,
          i = t.h,
          u = n[i],
          o = n[i + 1],
          s = n[i + 2];
        return (
          (n = n[i + 3]),
          nt(t, t.h + 4),
          (o = ((u << 0) | (o << 8) | (s << 16) | (n << 24)) >>> 0),
          (t = 2 * (o >> 31) + 1),
          (u = (o >>> 23) & 255),
          (o &= 8388607),
          z(
            e,
            r,
            u == 255
              ? o
                ? NaN
                : (1 / 0) * t
              : u == 0
              ? t * Math.pow(2, -149) * o
              : t * Math.pow(2, u - 150) * (o + Math.pow(2, 23))
          ),
          !0
        );
      },
      function (t, e, r) {
        if (((e = ne(e, r)), e != null)) {
          it(t.h, 8 * r + 5), (t = t.h);
          var n = +e;
          n === 0
            ? 0 < 1 / n
              ? (P = N = 0)
              : ((N = 0), (P = 2147483648))
            : isNaN(n)
            ? ((N = 0), (P = 2147483647))
            : ((n = (r = 0 > n ? -2147483648 : 0) ? -n : n),
              34028234663852886e22 < n
                ? ((N = 0), (P = (r | 2139095040) >>> 0))
                : 11754943508222875e-54 > n
                ? ((n = Math.round(n / Math.pow(2, -149))),
                  (N = 0),
                  (P = (r | n) >>> 0))
                : ((e = Math.floor(Math.log(n) / Math.LN2)),
                  (n *= Math.pow(2, -e)),
                  (n = Math.round(8388608 * n)),
                  16777216 <= n && ++e,
                  (N = 0),
                  (P =
                    (r | ((e + 127) << 23) | (n & 8388607)) >>> 0))),
            (r = P),
            t.h.push((r >>> 0) & 255),
            t.h.push((r >>> 8) & 255),
            t.h.push((r >>> 16) & 255),
            t.h.push((r >>> 24) & 255);
        }
      }
    ),
    tn = xt(
      function (t, e, r) {
        if (t.i !== 0) return !1;
        var n = t.h,
          i = 0,
          u = (t = 0),
          o = n.i,
          s = n.h;
        do {
          var l = o[s++];
          (i |= (l & 127) << u), (u += 7);
        } while (32 > u && l & 128);
        for (
          32 < u && (t |= (l & 127) >> 4), u = 3;
          32 > u && l & 128;
          u += 7
        )
          (l = o[s++]), (t |= (l & 127) << u);
        if ((nt(n, s), 128 > l))
          (n = i >>> 0),
            (l = t >>> 0),
            (t = l & 2147483648) &&
              ((n = (~n + 1) >>> 0),
              (l = ~l >>> 0),
              n == 0 && (l = (l + 1) >>> 0)),
            (n = 4294967296 * l + (n >>> 0));
        else throw Xt();
        return z(e, r, t ? -n : n), !0;
      },
      function (t, e, r) {
        (e = H(e, r)),
          e != null &&
            (typeof e == 'string' && Ee(e),
            e != null &&
              (it(t.h, 8 * r),
              typeof e == 'number'
                ? ((t = t.h), xe(e), Ie(t, P, N))
                : ((r = Ee(e)), Ie(t.h, r.i, r.h))));
      }
    ),
    en = xt(
      function (t, e, r) {
        return t.i !== 0 ? !1 : (z(e, r, mt(t.h)), !0);
      },
      function (t, e, r) {
        if (((e = H(e, r)), e != null && e != null))
          if ((it(t.h, 8 * r), (t = t.h), (r = e), 0 <= r)) it(t, r);
          else {
            for (e = 0; 9 > e; e++)
              t.h.push((r & 127) | 128), (r >>= 7);
            t.h.push(1);
          }
      }
    ),
    or = xt(
      function (t, e, r) {
        if (t.i !== 2) return !1;
        var n = mt(t.h) >>> 0;
        t = t.h;
        var i = Ne(t, n);
        if (((t = t.i), Nr)) {
          var u = t,
            o;
          (o = Yt) ||
            (o = Yt = new TextDecoder('utf-8', { fatal: !0 })),
            (t = i + n),
            (u = i === 0 && t === u.length ? u : u.subarray(i, t));
          try {
            var s = o.decode(u);
          } catch (m) {
            if (_t === void 0) {
              try {
                o.decode(new Uint8Array([128]));
              } catch {}
              try {
                o.decode(new Uint8Array([97])), (_t = !0);
              } catch {
                _t = !1;
              }
            }
            throw (!_t && (Yt = void 0), m);
          }
        } else {
          (s = i), (n = s + n), (i = []);
          for (var l = null, f, c; s < n; )
            (f = t[s++]),
              128 > f
                ? i.push(f)
                : 224 > f
                ? s >= n
                  ? rt()
                  : ((c = t[s++]),
                    194 > f || (c & 192) !== 128
                      ? (s--, rt())
                      : i.push(((f & 31) << 6) | (c & 63)))
                : 240 > f
                ? s >= n - 1
                  ? rt()
                  : ((c = t[s++]),
                    (c & 192) !== 128 ||
                    (f === 224 && 160 > c) ||
                    (f === 237 && 160 <= c) ||
                    ((u = t[s++]) & 192) !== 128
                      ? (s--, rt())
                      : i.push(
                          ((f & 15) << 12) |
                            ((c & 63) << 6) |
                            (u & 63)
                        ))
                : 244 >= f
                ? s >= n - 2
                  ? rt()
                  : ((c = t[s++]),
                    (c & 192) !== 128 ||
                    ((f << 28) + (c - 144)) >> 30 ||
                    ((u = t[s++]) & 192) !== 128 ||
                    ((o = t[s++]) & 192) !== 128
                      ? (s--, rt())
                      : ((f =
                          ((f & 7) << 18) |
                          ((c & 63) << 12) |
                          ((u & 63) << 6) |
                          (o & 63)),
                        (f -= 65536),
                        i.push(
                          ((f >> 10) & 1023) + 55296,
                          (f & 1023) + 56320
                        )))
                : rt(),
              8192 <= i.length && ((l = Te(l, i)), (i.length = 0));
          s = Te(l, i);
        }
        return z(e, r, s), !0;
      },
      function (t, e, r) {
        if (((e = H(e, r)), e != null)) {
          var n = !1;
          if (((n = n === void 0 ? !1 : n), Lr)) {
            if (
              n &&
              /(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(
                e
              )
            )
              throw Error('Found an unpaired surrogate');
            e = (Ce || (Ce = new TextEncoder())).encode(e);
          } else {
            for (
              var i = 0, u = new Uint8Array(3 * e.length), o = 0;
              o < e.length;
              o++
            ) {
              var s = e.charCodeAt(o);
              if (128 > s) u[i++] = s;
              else {
                if (2048 > s) u[i++] = (s >> 6) | 192;
                else {
                  if (55296 <= s && 57343 >= s) {
                    if (56319 >= s && o < e.length) {
                      var l = e.charCodeAt(++o);
                      if (56320 <= l && 57343 >= l) {
                        (s = 1024 * (s - 55296) + l - 56320 + 65536),
                          (u[i++] = (s >> 18) | 240),
                          (u[i++] = ((s >> 12) & 63) | 128),
                          (u[i++] = ((s >> 6) & 63) | 128),
                          (u[i++] = (s & 63) | 128);
                        continue;
                      } else o--;
                    }
                    if (n) throw Error('Found an unpaired surrogate');
                    s = 65533;
                  }
                  (u[i++] = (s >> 12) | 224),
                    (u[i++] = ((s >> 6) & 63) | 128);
                }
                u[i++] = (s & 63) | 128;
              }
            }
            e = i === u.length ? u : u.subarray(0, i);
          }
          it(t.h, 8 * r + 2),
            it(t.h, e.length),
            lt(t, t.h.end()),
            lt(t, e);
        }
      }
    ),
    ur = xt(
      function (t, e, r, n, i) {
        if (t.i !== 2) return !1;
        (e = Ge(e, r, n)), (r = t.h.j), (n = mt(t.h) >>> 0);
        var u = t.h.h + n,
          o = u - r;
        if (
          (0 >= o &&
            ((t.h.j = u),
            i(e, t, void 0, void 0, void 0),
            (o = u - t.h.h)),
          o)
        )
          throw Error(
            'Message parsing ended unexpectedly. Expected to read ' +
              (n +
                ' bytes, instead read ' +
                (n - o) +
                ' bytes, either the data ended unexpectedly or the message misreported its own length')
          );
        return (t.h.h = u), (t.h.j = r), !0;
      },
      function (t, e, r, n, i) {
        if (((e = Pt(e, n, r)), e != null))
          for (n = 0; n < e.length; n++) {
            var u = t;
            it(u.h, 8 * r + 2);
            var o = u.h.end();
            lt(u, o), o.push(u.i), (u = o), i(e[n], t), (o = t);
            var s = u.pop();
            for (s = o.i + o.h.length() - s; 127 < s; )
              u.push((s & 127) | 128), (s >>>= 7), o.i++;
            u.push(s), o.i++;
          }
      }
    );
  function se(t) {
    return function (e, r) {
      t: {
        if (St.length) {
          var n = St.pop();
          n.setOptions(r), Zt(n.h, e, r), (e = n);
        } else e = new Qt(e, r);
        try {
          var i = ue(t),
            u = nr(new i.P(), e, i);
          break t;
        } finally {
          (i = e.h),
            (i.i = null),
            (i.m = !1),
            (i.l = 0),
            (i.j = 0),
            (i.h = 0),
            (i.S = !1),
            (e.l = -1),
            (e.i = -1),
            100 > St.length && St.push(e);
        }
        u = void 0;
      }
      return u;
    };
  }
  function le(t) {
    return function () {
      var e = new Br();
      ir(this, e, oe(t)), lt(e, e.h.end());
      for (
        var r = new Uint8Array(e.i),
          n = e.j,
          i = n.length,
          u = 0,
          o = 0;
        o < i;
        o++
      ) {
        var s = n[o];
        r.set(s, u), (u += s.length);
      }
      return (e.j = [r]), r;
    };
  }
  function ft(t) {
    L.call(this, t);
  }
  p(ft, L);
  var sr = [ft, 1, en, 2, G, 3, or, 4, or];
  ft.prototype.l = le(sr);
  function fe(t) {
    L.call(this, t, -1, rn);
  }
  p(fe, L),
    (fe.prototype.addClassification = function (t, e) {
      return Ge(this, 1, ft, t, e), this;
    });
  var rn = [1],
    lr = se([fe, 1, ur, sr]);
  function at(t) {
    L.call(this, t);
  }
  p(at, L);
  var fr = [at, 1, G, 2, G, 3, G, 4, G, 5, G];
  at.prototype.l = le(fr);
  function ar(t) {
    L.call(this, t, -1, nn);
  }
  p(ar, L);
  var nn = [1],
    cr = se([ar, 1, ur, fr]);
  function Lt(t) {
    L.call(this, t);
  }
  p(Lt, L);
  var hr = [Lt, 1, G, 2, G, 3, G, 4, G, 5, G, 6, tn],
    on = se(hr);
  Lt.prototype.l = le(hr);
  function pr(t, e, r) {
    if (
      ((r = t.createShader(
        r === 0 ? t.VERTEX_SHADER : t.FRAGMENT_SHADER
      )),
      t.shaderSource(r, e),
      t.compileShader(r),
      !t.getShaderParameter(r, t.COMPILE_STATUS))
    )
      throw Error(
        `Could not compile WebGL shader.

` + t.getShaderInfoLog(r)
      );
    return r;
  }
  function vr(t) {
    return Pt(t, ft, 1).map(function (e) {
      var r = H(e, 1);
      return {
        index: r ?? 0,
        score: Y(e, 2),
        label: H(e, 3) != null ? Ut(H(e, 3), '') : void 0,
        displayName: H(e, 4) != null ? Ut(H(e, 4), '') : void 0,
      };
    });
  }
  function dr(t) {
    return {
      x: Y(t, 1),
      y: Y(t, 2),
      z: Y(t, 3),
      visibility: ne(t, 4) != null ? Y(t, 4) : void 0,
    };
  }
  function yr(t) {
    return t.map(function (e) {
      return Pt(cr(e), at, 1).map(dr);
    });
  }
  function ae(t, e) {
    (this.i = t), (this.h = e), (this.m = 0);
  }
  function mr(t, e, r) {
    return (
      un(t, e),
      typeof t.h.canvas.transferToImageBitmap == 'function'
        ? Promise.resolve(t.h.canvas.transferToImageBitmap())
        : r
        ? Promise.resolve(t.h.canvas)
        : typeof createImageBitmap == 'function'
        ? createImageBitmap(t.h.canvas)
        : (t.j === void 0 && (t.j = document.createElement('canvas')),
          new Promise(function (n) {
            (t.j.height = t.h.canvas.height),
              (t.j.width = t.h.canvas.width),
              t.j
                .getContext('2d', {})
                .drawImage(
                  t.h.canvas,
                  0,
                  0,
                  t.h.canvas.width,
                  t.h.canvas.height
                ),
              n(t.j);
          }))
    );
  }
  function un(t, e) {
    var r = t.h;
    if (t.s === void 0) {
      var n = pr(
          r,
          `
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,
          0
        ),
        i = pr(
          r,
          `
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D sampler0;
  void main(){
    gl_FragColor = texture2D(sampler0, vTex);
  }`,
          1
        ),
        u = r.createProgram();
      if (
        (r.attachShader(u, n),
        r.attachShader(u, i),
        r.linkProgram(u),
        !r.getProgramParameter(u, r.LINK_STATUS))
      )
        throw Error(
          `Could not compile WebGL program.

` + r.getProgramInfoLog(u)
        );
      (n = t.s = u),
        r.useProgram(n),
        (i = r.getUniformLocation(n, 'sampler0')),
        (t.l = {
          O: r.getAttribLocation(n, 'aVertex'),
          N: r.getAttribLocation(n, 'aTex'),
          xa: i,
        }),
        (t.v = r.createBuffer()),
        r.bindBuffer(r.ARRAY_BUFFER, t.v),
        r.enableVertexAttribArray(t.l.O),
        r.vertexAttribPointer(t.l.O, 2, r.FLOAT, !1, 0, 0),
        r.bufferData(
          r.ARRAY_BUFFER,
          new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
          r.STATIC_DRAW
        ),
        r.bindBuffer(r.ARRAY_BUFFER, null),
        (t.u = r.createBuffer()),
        r.bindBuffer(r.ARRAY_BUFFER, t.u),
        r.enableVertexAttribArray(t.l.N),
        r.vertexAttribPointer(t.l.N, 2, r.FLOAT, !1, 0, 0),
        r.bufferData(
          r.ARRAY_BUFFER,
          new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]),
          r.STATIC_DRAW
        ),
        r.bindBuffer(r.ARRAY_BUFFER, null),
        r.uniform1i(i, 0);
    }
    (n = t.l),
      r.useProgram(t.s),
      (r.canvas.width = e.width),
      (r.canvas.height = e.height),
      r.viewport(0, 0, e.width, e.height),
      r.activeTexture(r.TEXTURE0),
      t.i.bindTexture2d(e.glName),
      r.enableVertexAttribArray(n.O),
      r.bindBuffer(r.ARRAY_BUFFER, t.v),
      r.vertexAttribPointer(n.O, 2, r.FLOAT, !1, 0, 0),
      r.enableVertexAttribArray(n.N),
      r.bindBuffer(r.ARRAY_BUFFER, t.u),
      r.vertexAttribPointer(n.N, 2, r.FLOAT, !1, 0, 0),
      r.bindFramebuffer(
        r.DRAW_FRAMEBUFFER ? r.DRAW_FRAMEBUFFER : r.FRAMEBUFFER,
        null
      ),
      r.clearColor(0, 0, 0, 0),
      r.clear(r.COLOR_BUFFER_BIT),
      r.colorMask(!0, !0, !0, !0),
      r.drawArrays(r.TRIANGLE_FAN, 0, 4),
      r.disableVertexAttribArray(n.O),
      r.disableVertexAttribArray(n.N),
      r.bindBuffer(r.ARRAY_BUFFER, null),
      t.i.bindTexture2d(0);
  }
  function sn(t) {
    this.h = t;
  }
  var ln = new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9,
    1, 7, 0, 65, 0, 253, 15, 26, 11,
  ]);
  function fn(t, e) {
    return e + t;
  }
  function gr(t, e) {
    window[t] = e;
  }
  function an(t) {
    var e = document.createElement('script');
    return (
      e.setAttribute('src', t),
      e.setAttribute('crossorigin', 'anonymous'),
      new Promise(function (r) {
        e.addEventListener(
          'load',
          function () {
            r();
          },
          !1
        ),
          e.addEventListener(
            'error',
            function () {
              r();
            },
            !1
          ),
          document.body.appendChild(e);
      })
    );
  }
  function cn() {
    return R(function (t) {
      switch (t.h) {
        case 1:
          return (t.s = 2), j(t, WebAssembly.instantiate(ln), 4);
        case 4:
          (t.h = 3), (t.s = 0);
          break;
        case 2:
          return (t.s = 0), (t.l = null), t.return(!1);
        case 3:
          return t.return(!0);
      }
    });
  }
  function ce(t) {
    if (
      ((this.h = t),
      (this.listeners = {}),
      (this.l = {}),
      (this.L = {}),
      (this.s = {}),
      (this.v = {}),
      (this.M = this.u = this.ga = !0),
      (this.I = Promise.resolve()),
      (this.fa = ''),
      (this.D = {}),
      (this.locateFile = (t && t.locateFile) || fn),
      typeof window == 'object')
    )
      var e =
        window.location.pathname
          .toString()
          .substring(
            0,
            window.location.pathname.toString().lastIndexOf('/')
          ) + '/';
    else if (typeof location < 'u')
      e =
        location.pathname
          .toString()
          .substring(
            0,
            location.pathname.toString().lastIndexOf('/')
          ) + '/';
    else
      throw Error(
        'solutions can only be loaded on a web page or in a web worker'
      );
    if (((this.ha = e), t.options)) {
      e = F(Object.keys(t.options));
      for (var r = e.next(); !r.done; r = e.next()) {
        r = r.value;
        var n = t.options[r].default;
        n !== void 0 &&
          (this.l[r] = typeof n == 'function' ? n() : n);
      }
    }
  }
  (E = ce.prototype),
    (E.close = function () {
      return this.j && this.j.delete(), Promise.resolve();
    });
  function hn(t) {
    var e, r, n, i, u, o, s, l, f, c, m;
    return R(function (v) {
      switch (v.h) {
        case 1:
          return t.ga
            ? ((e =
                t.h.files === void 0
                  ? []
                  : typeof t.h.files == 'function'
                  ? t.h.files(t.l)
                  : t.h.files),
              j(v, cn(), 2))
            : v.return();
        case 2:
          if (((r = v.i), typeof window == 'object'))
            return (
              gr('createMediapipeSolutionsWasm', {
                locateFile: t.locateFile,
              }),
              gr('createMediapipeSolutionsPackedAssets', {
                locateFile: t.locateFile,
              }),
              (o = e.filter(function (h) {
                return h.data !== void 0;
              })),
              (s = e.filter(function (h) {
                return h.data === void 0;
              })),
              (l = Promise.all(
                o.map(function (h) {
                  var g = It(t, h.url);
                  if (h.path !== void 0) {
                    var w = h.path;
                    g = g.then(function (S) {
                      return t.overrideFile(w, S), Promise.resolve(S);
                    });
                  }
                  return g;
                })
              )),
              (f = Promise.all(
                s.map(function (h) {
                  return h.simd === void 0 ||
                    (h.simd && r) ||
                    (!h.simd && !r)
                    ? an(t.locateFile(h.url, t.ha))
                    : Promise.resolve();
                })
              ).then(function () {
                var h, g, w;
                return R(function (S) {
                  if (S.h == 1)
                    return (
                      (h = window.createMediapipeSolutionsWasm),
                      (g =
                        window.createMediapipeSolutionsPackedAssets),
                      (w = t),
                      j(S, h(g), 2)
                    );
                  (w.i = S.i), (S.h = 0);
                });
              })),
              (c = (function () {
                return R(function (h) {
                  return (
                    t.h.graph && t.h.graph.url
                      ? (h = j(h, It(t, t.h.graph.url), 0))
                      : ((h.h = 0), (h = void 0)),
                    h
                  );
                });
              })()),
              j(v, Promise.all([f, l, c]), 7)
            );
          if (typeof importScripts != 'function')
            throw Error(
              'solutions can only be loaded on a web page or in a web worker'
            );
          return (
            (n = e
              .filter(function (h) {
                return (
                  h.simd === void 0 ||
                  (h.simd && r) ||
                  (!h.simd && !r)
                );
              })
              .map(function (h) {
                return t.locateFile(h.url, t.ha);
              })),
            importScripts.apply(null, Ot(n)),
            (i = t),
            j(v, createMediapipeSolutionsWasm(Module), 6)
          );
        case 6:
          (i.i = v.i),
            (t.m = new OffscreenCanvas(1, 1)),
            (t.i.canvas = t.m),
            (u = t.i.GL.createContext(t.m, {
              antialias: !1,
              alpha: !1,
              ua: typeof WebGL2RenderingContext < 'u' ? 2 : 1,
            })),
            t.i.GL.makeContextCurrent(u),
            (v.h = 4);
          break;
        case 7:
          if (
            ((t.m = document.createElement('canvas')),
            (m = t.m.getContext('webgl2', {})),
            !m && ((m = t.m.getContext('webgl', {})), !m))
          )
            return (
              alert(
                'Failed to create WebGL canvas context when passing video frame.'
              ),
              v.return()
            );
          (t.K = m),
            (t.i.canvas = t.m),
            t.i.createContext(t.m, !0, !0, {});
        case 4:
          (t.j = new t.i.SolutionWasm()), (t.ga = !1), (v.h = 0);
      }
    });
  }
  function pn(t) {
    var e, r, n, i, u, o, s, l;
    return R(function (f) {
      if (f.h == 1) {
        if (t.h.graph && t.h.graph.url && t.fa === t.h.graph.url)
          return f.return();
        if (((t.u = !0), !t.h.graph || !t.h.graph.url)) {
          f.h = 2;
          return;
        }
        return (t.fa = t.h.graph.url), j(f, It(t, t.h.graph.url), 3);
      }
      for (
        f.h != 2 && ((e = f.i), t.j.loadGraph(e)),
          r = F(Object.keys(t.D)),
          n = r.next();
        !n.done;
        n = r.next()
      )
        (i = n.value), t.j.overrideFile(i, t.D[i]);
      if (((t.D = {}), t.h.listeners))
        for (
          u = F(t.h.listeners), o = u.next();
          !o.done;
          o = u.next()
        )
          (s = o.value), mn(t, s);
      (l = t.l), (t.l = {}), t.setOptions(l), (f.h = 0);
    });
  }
  (E.reset = function () {
    var t = this;
    return R(function (e) {
      t.j && (t.j.reset(), (t.s = {}), (t.v = {})), (e.h = 0);
    });
  }),
    (E.setOptions = function (t, e) {
      var r = this;
      if ((e = e || this.h.options)) {
        for (
          var n = [],
            i = [],
            u = {},
            o = F(Object.keys(t)),
            s = o.next();
          !s.done;
          u = { X: u.X, Y: u.Y }, s = o.next()
        )
          if (((s = s.value), !(s in this.l && this.l[s] === t[s]))) {
            this.l[s] = t[s];
            var l = e[s];
            l !== void 0 &&
              (l.onChange &&
                ((u.X = l.onChange),
                (u.Y = t[s]),
                n.push(
                  (function (f) {
                    return function () {
                      var c;
                      return R(function (m) {
                        if (m.h == 1) return j(m, f.X(f.Y), 2);
                        (c = m.i), c === !0 && (r.u = !0), (m.h = 0);
                      });
                    };
                  })(u)
                )),
              l.graphOptionXref &&
                ((s = Object.assign(
                  {},
                  { calculatorName: '', calculatorIndex: 0 },
                  l.graphOptionXref,
                  {
                    valueNumber: l.type === 1 ? t[s] : 0,
                    valueBoolean: l.type === 0 ? t[s] : !1,
                    valueString: l.type === 2 ? t[s] : '',
                  }
                )),
                i.push(s)));
          }
        (n.length !== 0 || i.length !== 0) &&
          ((this.u = !0),
          (this.H = (this.H === void 0 ? [] : this.H).concat(i)),
          (this.F = (this.F === void 0 ? [] : this.F).concat(n)));
      }
    });
  function vn(t) {
    var e, r, n, i, u, o, s;
    return R(function (l) {
      switch (l.h) {
        case 1:
          if (!t.u) return l.return();
          if (!t.F) {
            l.h = 2;
            break;
          }
          (e = F(t.F)), (r = e.next());
        case 3:
          if (r.done) {
            l.h = 5;
            break;
          }
          return (n = r.value), j(l, n(), 4);
        case 4:
          (r = e.next()), (l.h = 3);
          break;
        case 5:
          t.F = void 0;
        case 2:
          if (t.H) {
            for (
              i = new t.i.GraphOptionChangeRequestList(),
                u = F(t.H),
                o = u.next();
              !o.done;
              o = u.next()
            )
              (s = o.value), i.push_back(s);
            t.j.changeOptions(i), i.delete(), (t.H = void 0);
          }
          (t.u = !1), (l.h = 0);
      }
    });
  }
  E.initialize = function () {
    var t = this;
    return R(function (e) {
      return e.h == 1
        ? j(e, hn(t), 2)
        : e.h != 3
        ? j(e, pn(t), 3)
        : j(e, vn(t), 0);
    });
  };
  function It(t, e) {
    var r, n;
    return R(function (i) {
      return e in t.L
        ? i.return(t.L[e])
        : ((r = t.locateFile(e, '')),
          (n = fetch(r).then(function (u) {
            return u.arrayBuffer();
          })),
          (t.L[e] = n),
          i.return(n));
    });
  }
  (E.overrideFile = function (t, e) {
    this.j ? this.j.overrideFile(t, e) : (this.D[t] = e);
  }),
    (E.clearOverriddenFiles = function () {
      (this.D = {}), this.j && this.j.clearOverriddenFiles();
    }),
    (E.send = function (t, e) {
      var r = this,
        n,
        i,
        u,
        o,
        s,
        l,
        f,
        c,
        m;
      return R(function (v) {
        switch (v.h) {
          case 1:
            return r.h.inputs
              ? ((n = 1e3 * (e ?? performance.now())), j(v, r.I, 2))
              : v.return();
          case 2:
            return j(v, r.initialize(), 3);
          case 3:
            for (
              i = new r.i.PacketDataList(),
                u = F(Object.keys(t)),
                o = u.next();
              !o.done;
              o = u.next()
            )
              if (((s = o.value), (l = r.h.inputs[s]))) {
                t: {
                  var h = t[s];
                  switch (l.type) {
                    case 'video':
                      var g = r.s[l.stream];
                      if (
                        (g ||
                          ((g = new ae(r.i, r.K)),
                          (r.s[l.stream] = g)),
                        g.m === 0 && (g.m = g.i.createTexture()),
                        typeof HTMLVideoElement < 'u' &&
                          h instanceof HTMLVideoElement)
                      )
                        var w = h.videoWidth,
                          S = h.videoHeight;
                      else
                        typeof HTMLImageElement < 'u' &&
                        h instanceof HTMLImageElement
                          ? ((w = h.naturalWidth),
                            (S = h.naturalHeight))
                          : ((w = h.width), (S = h.height));
                      (S = { glName: g.m, width: w, height: S }),
                        (w = g.h),
                        (w.canvas.width = S.width),
                        (w.canvas.height = S.height),
                        w.activeTexture(w.TEXTURE0),
                        g.i.bindTexture2d(g.m),
                        w.texImage2D(
                          w.TEXTURE_2D,
                          0,
                          w.RGBA,
                          w.RGBA,
                          w.UNSIGNED_BYTE,
                          h
                        ),
                        g.i.bindTexture2d(0),
                        (g = S);
                      break t;
                    case 'detections':
                      for (
                        g = r.s[l.stream],
                          g ||
                            ((g = new sn(r.i)), (r.s[l.stream] = g)),
                          g.data ||
                            (g.data = new g.h.DetectionListData()),
                          g.data.reset(h.length),
                          S = 0;
                        S < h.length;
                        ++S
                      ) {
                        w = h[S];
                        var _ = g.data,
                          U = _.setBoundingBox,
                          W = S,
                          I = w.la,
                          b = new Lt();
                        if (
                          (X(b, 1, I.ra),
                          X(b, 2, I.sa),
                          X(b, 3, I.height),
                          X(b, 4, I.width),
                          X(b, 5, I.rotation),
                          z(b, 6, I.pa),
                          (I = b.l()),
                          U.call(_, W, I),
                          w.ea)
                        )
                          for (_ = 0; _ < w.ea.length; ++_) {
                            (b = w.ea[_]),
                              (U = g.data),
                              (W = U.addNormalizedLandmark),
                              (I = S),
                              (b = Object.assign({}, b, {
                                visibility: b.visibility
                                  ? b.visibility
                                  : 0,
                              }));
                            var M = new at();
                            X(M, 1, b.x),
                              X(M, 2, b.y),
                              X(M, 3, b.z),
                              b.visibility && X(M, 4, b.visibility),
                              (b = M.l()),
                              W.call(U, I, b);
                          }
                        if (w.ba)
                          for (_ = 0; _ < w.ba.length; ++_)
                            (U = g.data),
                              (W = U.addClassification),
                              (I = S),
                              (b = w.ba[_]),
                              (M = new ft()),
                              X(M, 2, b.score),
                              b.index && z(M, 1, b.index),
                              b.label && z(M, 3, b.label),
                              b.displayName && z(M, 4, b.displayName),
                              (b = M.l()),
                              W.call(U, I, b);
                      }
                      g = g.data;
                      break t;
                    default:
                      g = {};
                  }
                }
                switch (((f = g), (c = l.stream), l.type)) {
                  case 'video':
                    i.pushTexture2d(
                      Object.assign({}, f, {
                        stream: c,
                        timestamp: n,
                      })
                    );
                    break;
                  case 'detections':
                    (m = f),
                      (m.stream = c),
                      (m.timestamp = n),
                      i.pushDetectionList(m);
                    break;
                  default:
                    throw Error(
                      "Unknown input config type: '" + l.type + "'"
                    );
                }
              }
            return r.j.send(i), j(v, r.I, 4);
          case 4:
            i.delete(), (v.h = 0);
        }
      });
    });
  function dn(t, e, r) {
    var n, i, u, o, s, l, f, c, m, v, h, g, w, S;
    return R(function (_) {
      switch (_.h) {
        case 1:
          if (!r) return _.return(e);
          for (
            n = {}, i = 0, u = F(Object.keys(r)), o = u.next();
            !o.done;
            o = u.next()
          )
            (s = o.value),
              (l = r[s]),
              typeof l != 'string' &&
                l.type === 'texture' &&
                e[l.stream] !== void 0 &&
                ++i;
          1 < i && (t.M = !1),
            (f = F(Object.keys(r))),
            (o = f.next());
        case 2:
          if (o.done) {
            _.h = 4;
            break;
          }
          if (((c = o.value), (m = r[c]), typeof m == 'string'))
            return (w = n), (S = c), j(_, yn(t, c, e[m]), 14);
          if (((v = e[m.stream]), m.type === 'detection_list')) {
            if (v) {
              for (
                var U = v.getRectList(),
                  W = v.getLandmarksList(),
                  I = v.getClassificationsList(),
                  b = [],
                  M = 0;
                M < U.size();
                ++M
              ) {
                var J = on(U.get(M)),
                  gn = Y(J, 1),
                  wn = Y(J, 2),
                  An = Y(J, 3),
                  jn = Y(J, 4),
                  xn = Y(J, 5, 0),
                  Bt = void 0;
                (Bt = Bt === void 0 ? 0 : Bt),
                  (J = {
                    la: {
                      ra: gn,
                      sa: wn,
                      height: An,
                      width: jn,
                      rotation: xn,
                      pa: Ut(H(J, 6), Bt),
                    },
                    ea: Pt(cr(W.get(M)), at, 1).map(dr),
                    ba: vr(lr(I.get(M))),
                  }),
                  b.push(J);
              }
              U = b;
            } else U = [];
            (n[c] = U), (_.h = 7);
            break;
          }
          if (m.type === 'proto_list') {
            if (v) {
              for (U = Array(v.size()), W = 0; W < v.size(); W++)
                U[W] = v.get(W);
              v.delete();
            } else U = [];
            (n[c] = U), (_.h = 7);
            break;
          }
          if (v === void 0) {
            _.h = 3;
            break;
          }
          if (m.type === 'float_list') {
            (n[c] = v), (_.h = 7);
            break;
          }
          if (m.type === 'proto') {
            (n[c] = v), (_.h = 7);
            break;
          }
          if (m.type !== 'texture')
            throw Error(
              "Unknown output config type: '" + m.type + "'"
            );
          return (
            (h = t.v[c]),
            h || ((h = new ae(t.i, t.K)), (t.v[c] = h)),
            j(_, mr(h, v, t.M), 13)
          );
        case 13:
          (g = _.i), (n[c] = g);
        case 7:
          m.transform && n[c] && (n[c] = m.transform(n[c])),
            (_.h = 3);
          break;
        case 14:
          w[S] = _.i;
        case 3:
          (o = f.next()), (_.h = 2);
          break;
        case 4:
          return _.return(n);
      }
    });
  }
  function yn(t, e, r) {
    var n;
    return R(function (i) {
      return typeof r == 'number' ||
        r instanceof Uint8Array ||
        r instanceof t.i.Uint8BlobList
        ? i.return(r)
        : r instanceof t.i.Texture2dDataOut
        ? ((n = t.v[e]),
          n || ((n = new ae(t.i, t.K)), (t.v[e] = n)),
          i.return(mr(n, r, t.M)))
        : i.return(void 0);
    });
  }
  function mn(t, e) {
    for (
      var r = e.name || '$',
        n = [].concat(Ot(e.wants)),
        i = new t.i.StringList(),
        u = F(e.wants),
        o = u.next();
      !o.done;
      o = u.next()
    )
      i.push_back(o.value);
    (u = t.i.PacketListener.implement({
      onResults: function (s) {
        for (var l = {}, f = 0; f < e.wants.length; ++f)
          l[n[f]] = s.get(f);
        var c = t.listeners[r];
        c &&
          (t.I = dn(t, l, e.outs).then(function (m) {
            m = c(m);
            for (var v = 0; v < e.wants.length; ++v) {
              var h = l[n[v]];
              typeof h == 'object' &&
                h.hasOwnProperty &&
                h.hasOwnProperty('delete') &&
                h.delete();
            }
            m && (t.I = m);
          }));
      },
    })),
      t.j.attachMultiListener(i, u),
      i.delete();
  }
  (E.onResults = function (t, e) {
    this.listeners[e || '$'] = t;
  }),
    pt('Solution', ce),
    pt('OptionType', {
      BOOL: 0,
      NUMBER: 1,
      ta: 2,
      0: 'BOOL',
      1: 'NUMBER',
      2: 'STRING',
    });
  function wr(t) {
    return (
      t === void 0 && (t = 0),
      t === 1
        ? 'hand_landmark_full.tflite'
        : 'hand_landmark_lite.tflite'
    );
  }
  function Ar(t) {
    var e = this;
    (t = t || {}),
      (this.h = new ce({
        locateFile: t.locateFile,
        files: function (r) {
          return [
            { url: 'hands_solution_packed_assets_loader.js' },
            { simd: !1, url: 'hands_solution_wasm_bin.js' },
            { simd: !0, url: 'hands_solution_simd_wasm_bin.js' },
            { data: !0, url: wr(r.modelComplexity) },
          ];
        },
        graph: { url: 'hands.binarypb' },
        inputs: {
          image: { type: 'video', stream: 'input_frames_gpu' },
        },
        listeners: [
          {
            wants: [
              'multi_hand_landmarks',
              'multi_hand_world_landmarks',
              'image_transformed',
              'multi_handedness',
            ],
            outs: {
              image: 'image_transformed',
              multiHandLandmarks: {
                type: 'proto_list',
                stream: 'multi_hand_landmarks',
                transform: yr,
              },
              multiHandWorldLandmarks: {
                type: 'proto_list',
                stream: 'multi_hand_world_landmarks',
                transform: yr,
              },
              multiHandedness: {
                type: 'proto_list',
                stream: 'multi_handedness',
                transform: function (r) {
                  return r.map(function (n) {
                    return vr(lr(n))[0];
                  });
                },
              },
            },
          },
        ],
        options: {
          useCpuInference: {
            type: 0,
            graphOptionXref: {
              calculatorType: 'InferenceCalculator',
              fieldName: 'use_cpu_inference',
            },
            default:
              typeof window != 'object' || window.navigator === void 0
                ? !1
                : 'iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod'
                    .split(';')
                    .includes(navigator.platform) ||
                  (navigator.userAgent.includes('Mac') &&
                    'ontouchend' in document),
          },
          selfieMode: {
            type: 0,
            graphOptionXref: {
              calculatorType: 'GlScalerCalculator',
              calculatorIndex: 1,
              fieldName: 'flip_horizontal',
            },
          },
          maxNumHands: {
            type: 1,
            graphOptionXref: {
              calculatorType: 'ConstantSidePacketCalculator',
              calculatorName: 'ConstantSidePacketCalculator',
              fieldName: 'int_value',
            },
          },
          modelComplexity: {
            type: 1,
            graphOptionXref: {
              calculatorType: 'ConstantSidePacketCalculator',
              calculatorName:
                'ConstantSidePacketCalculatorModelComplexity',
              fieldName: 'int_value',
            },
            onChange: function (r) {
              var n, i, u;
              return R(function (o) {
                return o.h == 1
                  ? ((n = wr(r)),
                    (i =
                      'third_party/mediapipe/modules/hand_landmark/' +
                      n),
                    j(o, It(e.h, n), 2))
                  : ((u = o.i), e.h.overrideFile(i, u), o.return(!0));
              });
            },
          },
          minDetectionConfidence: {
            type: 1,
            graphOptionXref: {
              calculatorType: 'TensorsToDetectionsCalculator',
              calculatorName:
                'handlandmarktrackinggpu__palmdetectiongpu__TensorsToDetectionsCalculator',
              fieldName: 'min_score_thresh',
            },
          },
          minTrackingConfidence: {
            type: 1,
            graphOptionXref: {
              calculatorType: 'ThresholdingCalculator',
              calculatorName:
                'handlandmarktrackinggpu__handlandmarkgpu__ThresholdingCalculator',
              fieldName: 'threshold',
            },
          },
        },
      }));
  }
  (E = Ar.prototype),
    (E.close = function () {
      return this.h.close(), Promise.resolve();
    }),
    (E.onResults = function (t) {
      this.h.onResults(t);
    }),
    (E.initialize = function () {
      var t = this;
      return R(function (e) {
        return j(e, t.h.initialize(), 0);
      });
    }),
    (E.reset = function () {
      this.h.reset();
    }),
    (E.send = function (t) {
      var e = this;
      return R(function (r) {
        return j(r, e.h.send(t), 0);
      });
    }),
    (E.setOptions = function (t) {
      this.h.setOptions(t);
    }),
    pt('Hands', Ar),
    pt('HAND_CONNECTIONS', [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [5, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [9, 13],
      [13, 14],
      [14, 15],
      [15, 16],
      [13, 17],
      [0, 17],
      [17, 18],
      [18, 19],
      [19, 20],
    ]),
    pt('VERSION', '0.4.1675469240');
}).call(ct);
const _n = document.getElementById('demos');
let pe,
  Fn = 'VIDEO',
  kt,
  Dt = !1;
const Sn = async () => {
  const E = await bn.forVisionTasks('./wasm');
  (pe = await On.createFromOptions(E, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
      delegate: 'GPU',
    },
    runningMode: Fn,
    numHands: 2,
  })),
    _n.classList.remove('invisible'),
    br();
};
Sn();
const K = document.getElementById('webcam'),
  ut = document.getElementById('output_canvas'),
  bt = ut.getContext('2d'),
  Tn = () => {
    var E;
    return !!(
      !((E = navigator.mediaDevices) === null || E === void 0) &&
      E.getUserMedia
    );
  };
Tn()
  ? ((kt = document.getElementById('webcamButton')),
    kt.addEventListener('click', br))
  : console.warn('getUserMedia() is not supported by your browser');
function br(E) {
  if (!pe) {
    console.log('Wait! objectDetector not loaded yet.');
    return;
  }
  Dt === !0
    ? ((Dt = !1), (kt.innerText = 'ENABLE PREDICTIONS'))
    : ((Dt = !0), (kt.innerText = 'DISABLE PREDICTIONS'));
  const B = { video: !0 };
  navigator.mediaDevices.getUserMedia(B).then((Z) => {
    (K.srcObject = Z), K.addEventListener('loadeddata', Or);
  });
}
let xr = -1,
  he;
console.log(K);
async function Or() {
  (ut.style.width = K.videoWidth),
    (ut.style.height = K.videoHeight),
    (ut.width = K.videoWidth),
    (ut.height = K.videoHeight);
  let E = performance.now();
  if (
    (xr !== K.currentTime &&
      ((xr = K.currentTime), (he = pe.detectForVideo(K, E))),
    bt.save(),
    bt.clearRect(0, 0, ut.width, ut.height),
    he.landmarks)
  )
    for (const B of he.landmarks)
      drawConnectors(bt, B, En.HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 5,
      }),
        drawLandmarks(bt, B, { color: '#FF0000', lineWidth: 2 });
  bt.restore(), Dt === !0 && window.requestAnimationFrame(Or);
}
//# sourceMappingURL=index-c8b6dc50.js.map
