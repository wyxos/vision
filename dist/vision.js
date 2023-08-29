var ks = Object.defineProperty;
var Ms = (e, t, r) => t in e ? ks(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _ = (e, t, r) => (Ms(e, typeof t != "symbol" ? t + "" : t, r), r);
import { resolveComponent as j, openBlock as F, createBlock as pe, withCtx as H, renderSlot as Ne, createTextVNode as ke, createCommentVNode as ye, toDisplayString as I, createElementBlock as J, normalizeProps as Ds, guardReactiveProps as Ys, createElementVNode as U, reactive as E, createVNode as ge, normalizeClass as _r, mergeProps as je, defineComponent as Rt, withModifiers as xs, Fragment as gr, renderList as Fs, ref as Ue } from "vue";
import T from "axios";
const $ = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [s, a] of t)
    r[s] = a;
  return r;
}, Ts = {
  name: "WyxosButton",
  props: {
    loading: {
      default: !1,
      type: Boolean
    },
    text: {
      type: String,
      default: "Processing..."
    }
  }
}, Ps = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Ns(e, t, r, s, a, i) {
  const n = j("o-button");
  return F(), pe(n, { disabled: r.loading }, {
    default: H(() => [
      r.loading ? ye("", !0) : Ne(e.$slots, "default", { key: 0 }, () => [
        ke("Submit")
      ]),
      r.loading && r.text ? Ne(e.$slots, "loading", { key: 1 }, () => [
        ke(I(r.text), 1)
      ]) : ye("", !0),
      r.loading ? (F(), J("i", Ps)) : ye("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const Ws = /* @__PURE__ */ $(Ts, [["render", Ns]]), Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ws
}, Symbol.toStringTag, { value: "Module" })), Cs = {
  name: "WyxosCollection",
  props: {
    modelValue: {
      required: !0,
      type: Array
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      items: []
    };
  },
  mounted() {
    this.items = this.modelValue;
  },
  methods: {
    add(e) {
      this.items.push(e), this.$emit("update:modelValue", this.items);
    },
    remove(e) {
      this.items.splice(e, 1), this.$emit("update:modelValue", this.items);
    }
  }
}, Ls = /* @__PURE__ */ U("ul", null, [
  /* @__PURE__ */ U("li")
], -1);
function Is(e, t, r, s, a, i) {
  return Ne(e.$slots, "default", Ds(Ys({ add: i.add, remove: i.remove, items: a.items })), () => [
    Ls
  ]);
}
const Es = /* @__PURE__ */ $(Cs, [["render", Is]]), js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Es
}, Symbol.toStringTag, { value: "Module" }));
class L {
  constructor() {
    _(this, "state", E({
      isLoading: !1,
      isLoaded: !1,
      isFailure: !1
    }));
  }
  get isLoading() {
    return this.state.isLoading;
  }
  get isLoaded() {
    return this.state.isLoaded;
  }
  get isFailure() {
    return this.state.isFailure;
  }
  isState(t) {
    return this.state[t];
  }
  loading() {
    Object.assign(this.state, {
      isLoading: !0,
      isLoaded: !1,
      isFailure: !1
    });
  }
  loaded() {
    Object.assign(this.state, {
      isLoading: !1,
      isLoaded: !0,
      isFailure: !1
    });
  }
  failed() {
    Object.assign(this.state, {
      isLoading: !1,
      isLoaded: !1,
      isFailure: !0
    });
  }
  static create() {
    return new L();
  }
}
const Us = {
  name: "WyxosConfirm",
  props: {
    title: {
      type: String,
      default: "Title"
    },
    message: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: ""
    },
    confirmType: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean
    },
    callback: {
      type: Function,
      default: null
    }
  },
  emits: ["close"],
  setup() {
    return {
      state: new L()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, As = { class: "bg-white p-6" }, $s = { class: "title" }, Vs = { class: "mb-6" }, qs = {
  class: "buttons",
  role: "group"
};
function Hs(e, t, r, s, a, i) {
  const n = j("wyxos-button"), o = j("o-modal");
  return F(), pe(o, {
    active: !0,
    onClose: t[2] || (t[2] = (u) => e.$emit("close", { action: !1 }))
  }, {
    default: H(() => [
      U("section", As, [
        U("article", null, [
          U("header", null, [
            U("h3", $s, I(r.title), 1)
          ]),
          U("p", Vs, I(r.message), 1),
          U("footer", qs, [
            ge(n, {
              disabled: s.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
            }, {
              default: H(() => [
                ke(I(r.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            ge(n, {
              class: _r([{ [r.confirmType]: !0 }, "button"]),
              loading: s.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (u) => i.proceed())
            }, {
              default: H(() => [
                ke(I(r.confirmText), 1)
              ]),
              _: 1
            }, 8, ["class", "loading"])
          ])
        ])
      ])
    ]),
    _: 1
  });
}
const Gs = /* @__PURE__ */ $(Us, [["render", Hs]]), zs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gs
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var pr;
function d() {
  return pr.apply(null, arguments);
}
function Bs(e) {
  pr = e;
}
function Z(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Oe(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function w(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ct(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (w(e, t))
      return !1;
  return !0;
}
function C(e) {
  return e === void 0;
}
function ue(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function He(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function wr(e, t) {
  var r = [], s, a = e.length;
  for (s = 0; s < a; ++s)
    r.push(t(e[s], s));
  return r;
}
function fe(e, t) {
  for (var r in t)
    w(t, r) && (e[r] = t[r]);
  return w(t, "toString") && (e.toString = t.toString), w(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function te(e, t, r, s) {
  return Vr(e, t, r, s, !0).utc();
}
function Js() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function m(e) {
  return e._pf == null && (e._pf = Js()), e._pf;
}
var kt;
Array.prototype.some ? kt = Array.prototype.some : kt = function(e) {
  var t = Object(this), r = t.length >>> 0, s;
  for (s = 0; s < r; s++)
    if (s in t && e.call(this, t[s], s, t))
      return !0;
  return !1;
};
function Lt(e) {
  if (e._isValid == null) {
    var t = m(e), r = kt.call(t.parsedDateParts, function(a) {
      return a != null;
    }), s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (s = s && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = s;
    else
      return s;
  }
  return e._isValid;
}
function nt(e) {
  var t = te(NaN);
  return e != null ? fe(m(t), e) : m(t).userInvalidated = !0, t;
}
var ar = d.momentProperties = [], wt = !1;
function It(e, t) {
  var r, s, a, i = ar.length;
  if (C(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), C(t._i) || (e._i = t._i), C(t._f) || (e._f = t._f), C(t._l) || (e._l = t._l), C(t._strict) || (e._strict = t._strict), C(t._tzm) || (e._tzm = t._tzm), C(t._isUTC) || (e._isUTC = t._isUTC), C(t._offset) || (e._offset = t._offset), C(t._pf) || (e._pf = m(t)), C(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      s = ar[r], a = t[s], C(a) || (e[s] = a);
  return e;
}
function Ge(e) {
  It(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), wt === !1 && (wt = !0, d.updateOffset(this), wt = !1);
}
function Q(e) {
  return e instanceof Ge || e != null && e._isAMomentObject != null;
}
function Sr(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function G(e, t) {
  var r = !0;
  return fe(function() {
    if (d.deprecationHandler != null && d.deprecationHandler(null, e), r) {
      var s = [], a, i, n, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (a = "", typeof arguments[i] == "object") {
          a += `
[` + i + "] ";
          for (n in arguments[0])
            w(arguments[0], n) && (a += n + ": " + arguments[0][n] + ", ");
          a = a.slice(0, -2);
        } else
          a = arguments[i];
        s.push(a);
      }
      Sr(
        e + `
Arguments: ` + Array.prototype.slice.call(s).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var ir = {};
function br(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), ir[e] || (Sr(t), ir[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function re(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Zs(e) {
  var t, r;
  for (r in e)
    w(e, r) && (t = e[r], re(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function Mt(e, t) {
  var r = fe({}, e), s;
  for (s in t)
    w(t, s) && (Oe(e[s]) && Oe(t[s]) ? (r[s] = {}, fe(r[s], e[s]), fe(r[s], t[s])) : t[s] != null ? r[s] = t[s] : delete r[s]);
  for (s in e)
    w(e, s) && !w(t, s) && Oe(e[s]) && (r[s] = fe({}, r[s]));
  return r;
}
function Et(e) {
  e != null && this.set(e);
}
var Dt;
Object.keys ? Dt = Object.keys : Dt = function(e) {
  var t, r = [];
  for (t in e)
    w(e, t) && r.push(t);
  return r;
};
var Qs = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Ks(e, t, r) {
  var s = this._calendar[e] || this._calendar.sameElse;
  return re(s) ? s.call(t, r) : s;
}
function ee(e, t, r) {
  var s = "" + Math.abs(e), a = t - s.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + s;
}
var jt = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Je = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, St = {}, Fe = {};
function f(e, t, r, s) {
  var a = s;
  typeof s == "string" && (a = function() {
    return this[s]();
  }), e && (Fe[e] = a), t && (Fe[t[0]] = function() {
    return ee(a.apply(this, arguments), t[1], t[2]);
  }), r && (Fe[r] = function() {
    return this.localeData().ordinal(
      a.apply(this, arguments),
      e
    );
  });
}
function Xs(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function ea(e) {
  var t = e.match(jt), r, s;
  for (r = 0, s = t.length; r < s; r++)
    Fe[t[r]] ? t[r] = Fe[t[r]] : t[r] = Xs(t[r]);
  return function(a) {
    var i = "", n;
    for (n = 0; n < s; n++)
      i += re(t[n]) ? t[n].call(a, e) : t[n];
    return i;
  };
}
function Qe(e, t) {
  return e.isValid() ? (t = vr(t, e.localeData()), St[t] = St[t] || ea(t), St[t](e)) : e.localeData().invalidDate();
}
function vr(e, t) {
  var r = 5;
  function s(a) {
    return t.longDateFormat(a) || a;
  }
  for (Je.lastIndex = 0; r >= 0 && Je.test(e); )
    e = e.replace(
      Je,
      s
    ), Je.lastIndex = 0, r -= 1;
  return e;
}
var ta = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function ra(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(jt).map(function(s) {
    return s === "MMMM" || s === "MM" || s === "DD" || s === "dddd" ? s.slice(1) : s;
  }).join(""), this._longDateFormat[e]);
}
var sa = "Invalid date";
function aa() {
  return this._invalidDate;
}
var ia = "%d", na = /\d{1,2}/;
function oa(e) {
  return this._ordinal.replace("%d", e);
}
var la = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function ua(e, t, r, s) {
  var a = this._relativeTime[r];
  return re(a) ? a(e, t, r, s) : a.replace(/%d/i, e);
}
function da(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return re(r) ? r(t) : r.replace(/%s/i, t);
}
var Ie = {};
function N(e, t) {
  var r = e.toLowerCase();
  Ie[r] = Ie[r + "s"] = Ie[t] = e;
}
function z(e) {
  return typeof e == "string" ? Ie[e] || Ie[e.toLowerCase()] : void 0;
}
function Ut(e) {
  var t = {}, r, s;
  for (s in e)
    w(e, s) && (r = z(s), r && (t[r] = e[s]));
  return t;
}
var Or = {};
function W(e, t) {
  Or[e] = t;
}
function ha(e) {
  var t = [], r;
  for (r in e)
    w(e, r) && t.push({ unit: r, priority: Or[r] });
  return t.sort(function(s, a) {
    return s.priority - a.priority;
  }), t;
}
function ot(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function q(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function g(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = q(t)), r;
}
function We(e, t) {
  return function(r) {
    return r != null ? (kr(this, e, r), d.updateOffset(this, t), this) : et(this, e);
  };
}
function et(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function kr(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && ot(e.year()) && e.month() === 1 && e.date() === 29 ? (r = g(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    ft(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function ca(e) {
  return e = z(e), re(this[e]) ? this[e]() : this;
}
function fa(e, t) {
  if (typeof e == "object") {
    e = Ut(e);
    var r = ha(e), s, a = r.length;
    for (s = 0; s < a; s++)
      this[r[s].unit](e[r[s].unit]);
  } else if (e = z(e), re(this[e]))
    return this[e](t);
  return this;
}
var Mr = /\d/, V = /\d\d/, Dr = /\d{3}/, At = /\d{4}/, lt = /[+-]?\d{6}/, k = /\d\d?/, Yr = /\d\d\d\d?/, xr = /\d\d\d\d\d\d?/, ut = /\d{1,3}/, $t = /\d{1,4}/, dt = /[+-]?\d{1,6}/, Re = /\d+/, ht = /[+-]?\d+/, ma = /Z|[+-]\d\d:?\d\d/gi, ct = /Z|[+-]\d\d(?::?\d\d)?/gi, ya = /[+-]?\d+(\.\d{1,3})?/, ze = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, tt;
tt = {};
function c(e, t, r) {
  tt[e] = re(t) ? t : function(s, a) {
    return s && r ? r : t;
  };
}
function _a(e, t) {
  return w(tt, e) ? tt[e](t._strict, t._locale) : new RegExp(ga(e));
}
function ga(e) {
  return A(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, r, s, a, i) {
        return r || s || a || i;
      }
    )
  );
}
function A(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Yt = {};
function v(e, t) {
  var r, s = t, a;
  for (typeof e == "string" && (e = [e]), ue(t) && (s = function(i, n) {
    n[t] = g(i);
  }), a = e.length, r = 0; r < a; r++)
    Yt[e[r]] = s;
}
function Be(e, t) {
  v(e, function(r, s, a, i) {
    a._w = a._w || {}, t(r, a._w, a, i);
  });
}
function pa(e, t, r) {
  t != null && w(Yt, e) && Yt[e](t, r._a, r, e);
}
var P = 0, ne = 1, X = 2, x = 3, B = 4, oe = 5, ve = 6, wa = 7, Sa = 8;
function ba(e, t) {
  return (e % t + t) % t;
}
var D;
Array.prototype.indexOf ? D = Array.prototype.indexOf : D = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function ft(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = ba(t, 12);
  return e += (t - r) / 12, r === 1 ? ot(e) ? 29 : 28 : 31 - r % 7 % 2;
}
f("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
f("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
f("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
N("month", "M");
W("month", 8);
c("M", k);
c("MM", k, V);
c("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
c("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
v(["M", "MM"], function(e, t) {
  t[ne] = g(e) - 1;
});
v(["MMM", "MMMM"], function(e, t, r, s) {
  var a = r._locale.monthsParse(e, s, r._strict);
  a != null ? t[ne] = a : m(r).invalidMonth = e;
});
var va = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Fr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Tr = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Oa = ze, ka = ze;
function Ma(e, t) {
  return e ? Z(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Tr).test(t) ? "format" : "standalone"][e.month()] : Z(this._months) ? this._months : this._months.standalone;
}
function Da(e, t) {
  return e ? Z(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Tr.test(t) ? "format" : "standalone"][e.month()] : Z(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Ya(e, t, r) {
  var s, a, i, n = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s)
      i = te([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[s] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (a = D.call(this._shortMonthsParse, n), a !== -1 ? a : null) : (a = D.call(this._longMonthsParse, n), a !== -1 ? a : null) : t === "MMM" ? (a = D.call(this._shortMonthsParse, n), a !== -1 ? a : (a = D.call(this._longMonthsParse, n), a !== -1 ? a : null)) : (a = D.call(this._longMonthsParse, n), a !== -1 ? a : (a = D.call(this._shortMonthsParse, n), a !== -1 ? a : null));
}
function xa(e, t, r) {
  var s, a, i;
  if (this._monthsParseExact)
    return Ya.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
    if (a = te([2e3, s]), r && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp(
      "^" + this.months(a, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[s] = new RegExp(
      "^" + this.monthsShort(a, "").replace(".", "") + "$",
      "i"
    )), !r && !this._monthsParse[s] && (i = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[s] = new RegExp(i.replace(".", ""), "i")), r && t === "MMMM" && this._longMonthsParse[s].test(e))
      return s;
    if (r && t === "MMM" && this._shortMonthsParse[s].test(e))
      return s;
    if (!r && this._monthsParse[s].test(e))
      return s;
  }
}
function Pr(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = g(t);
    else if (t = e.localeData().monthsParse(t), !ue(t))
      return e;
  }
  return r = Math.min(e.date(), ft(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function Nr(e) {
  return e != null ? (Pr(this, e), d.updateOffset(this, !0), this) : et(this, "Month");
}
function Fa() {
  return ft(this.year(), this.month());
}
function Ta(e) {
  return this._monthsParseExact ? (w(this, "_monthsRegex") || Wr.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (w(this, "_monthsShortRegex") || (this._monthsShortRegex = Oa), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Pa(e) {
  return this._monthsParseExact ? (w(this, "_monthsRegex") || Wr.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (w(this, "_monthsRegex") || (this._monthsRegex = ka), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Wr() {
  function e(n, o) {
    return o.length - n.length;
  }
  var t = [], r = [], s = [], a, i;
  for (a = 0; a < 12; a++)
    i = te([2e3, a]), t.push(this.monthsShort(i, "")), r.push(this.months(i, "")), s.push(this.months(i, "")), s.push(this.monthsShort(i, ""));
  for (t.sort(e), r.sort(e), s.sort(e), a = 0; a < 12; a++)
    t[a] = A(t[a]), r[a] = A(r[a]);
  for (a = 0; a < 24; a++)
    s[a] = A(s[a]);
  this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
f("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? ee(e, 4) : "+" + e;
});
f(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
f(0, ["YYYY", 4], 0, "year");
f(0, ["YYYYY", 5], 0, "year");
f(0, ["YYYYYY", 6, !0], 0, "year");
N("year", "y");
W("year", 1);
c("Y", ht);
c("YY", k, V);
c("YYYY", $t, At);
c("YYYYY", dt, lt);
c("YYYYYY", dt, lt);
v(["YYYYY", "YYYYYY"], P);
v("YYYY", function(e, t) {
  t[P] = e.length === 2 ? d.parseTwoDigitYear(e) : g(e);
});
v("YY", function(e, t) {
  t[P] = d.parseTwoDigitYear(e);
});
v("Y", function(e, t) {
  t[P] = parseInt(e, 10);
});
function Ee(e) {
  return ot(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return g(e) + (g(e) > 68 ? 1900 : 2e3);
};
var Rr = We("FullYear", !0);
function Na() {
  return ot(this.year());
}
function Wa(e, t, r, s, a, i, n) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, s, a, i, n), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, s, a, i, n), o;
}
function Ae(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function rt(e, t, r) {
  var s = 7 + t - r, a = (7 + Ae(e, 0, s).getUTCDay() - t) % 7;
  return -a + s - 1;
}
function Cr(e, t, r, s, a) {
  var i = (7 + r - s) % 7, n = rt(e, s, a), o = 1 + 7 * (t - 1) + i + n, u, h;
  return o <= 0 ? (u = e - 1, h = Ee(u) + o) : o > Ee(e) ? (u = e + 1, h = o - Ee(e)) : (u = e, h = o), {
    year: u,
    dayOfYear: h
  };
}
function $e(e, t, r) {
  var s = rt(e.year(), t, r), a = Math.floor((e.dayOfYear() - s - 1) / 7) + 1, i, n;
  return a < 1 ? (n = e.year() - 1, i = a + le(n, t, r)) : a > le(e.year(), t, r) ? (i = a - le(e.year(), t, r), n = e.year() + 1) : (n = e.year(), i = a), {
    week: i,
    year: n
  };
}
function le(e, t, r) {
  var s = rt(e, t, r), a = rt(e + 1, t, r);
  return (Ee(e) - s + a) / 7;
}
f("w", ["ww", 2], "wo", "week");
f("W", ["WW", 2], "Wo", "isoWeek");
N("week", "w");
N("isoWeek", "W");
W("week", 5);
W("isoWeek", 5);
c("w", k);
c("ww", k, V);
c("W", k);
c("WW", k, V);
Be(
  ["w", "ww", "W", "WW"],
  function(e, t, r, s) {
    t[s.substr(0, 1)] = g(e);
  }
);
function Ra(e) {
  return $e(e, this._week.dow, this._week.doy).week;
}
var Ca = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function La() {
  return this._week.dow;
}
function Ia() {
  return this._week.doy;
}
function Ea(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function ja(e) {
  var t = $e(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
f("d", 0, "do", "day");
f("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
f("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
f("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
f("e", 0, 0, "weekday");
f("E", 0, 0, "isoWeekday");
N("day", "d");
N("weekday", "e");
N("isoWeekday", "E");
W("day", 11);
W("weekday", 11);
W("isoWeekday", 11);
c("d", k);
c("e", k);
c("E", k);
c("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
c("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
c("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
Be(["dd", "ddd", "dddd"], function(e, t, r, s) {
  var a = r._locale.weekdaysParse(e, s, r._strict);
  a != null ? t.d = a : m(r).invalidWeekday = e;
});
Be(["d", "e", "E"], function(e, t, r, s) {
  t[s] = g(e);
});
function Ua(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function Aa(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Vt(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var $a = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Lr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Va = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), qa = ze, Ha = ze, Ga = ze;
function za(e, t) {
  var r = Z(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Vt(r, this._week.dow) : e ? r[e.day()] : r;
}
function Ba(e) {
  return e === !0 ? Vt(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Ja(e) {
  return e === !0 ? Vt(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Za(e, t, r) {
  var s, a, i, n = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s)
      i = te([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(i, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (a = D.call(this._weekdaysParse, n), a !== -1 ? a : null) : t === "ddd" ? (a = D.call(this._shortWeekdaysParse, n), a !== -1 ? a : null) : (a = D.call(this._minWeekdaysParse, n), a !== -1 ? a : null) : t === "dddd" ? (a = D.call(this._weekdaysParse, n), a !== -1 || (a = D.call(this._shortWeekdaysParse, n), a !== -1) ? a : (a = D.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : t === "ddd" ? (a = D.call(this._shortWeekdaysParse, n), a !== -1 || (a = D.call(this._weekdaysParse, n), a !== -1) ? a : (a = D.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : (a = D.call(this._minWeekdaysParse, n), a !== -1 || (a = D.call(this._weekdaysParse, n), a !== -1) ? a : (a = D.call(this._shortWeekdaysParse, n), a !== -1 ? a : null));
}
function Qa(e, t, r) {
  var s, a, i;
  if (this._weekdaysParseExact)
    return Za.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
    if (a = te([2e3, 1]).day(s), r && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp(
      "^" + this.weekdays(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[s] || (i = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[s] = new RegExp(i.replace(".", ""), "i")), r && t === "dddd" && this._fullWeekdaysParse[s].test(e))
      return s;
    if (r && t === "ddd" && this._shortWeekdaysParse[s].test(e))
      return s;
    if (r && t === "dd" && this._minWeekdaysParse[s].test(e))
      return s;
    if (!r && this._weekdaysParse[s].test(e))
      return s;
  }
}
function Ka(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = Ua(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Xa(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function ei(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = Aa(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function ti(e) {
  return this._weekdaysParseExact ? (w(this, "_weekdaysRegex") || qt.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (w(this, "_weekdaysRegex") || (this._weekdaysRegex = qa), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function ri(e) {
  return this._weekdaysParseExact ? (w(this, "_weekdaysRegex") || qt.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (w(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Ha), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function si(e) {
  return this._weekdaysParseExact ? (w(this, "_weekdaysRegex") || qt.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (w(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ga), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function qt() {
  function e(y, b) {
    return b.length - y.length;
  }
  var t = [], r = [], s = [], a = [], i, n, o, u, h;
  for (i = 0; i < 7; i++)
    n = te([2e3, 1]).day(i), o = A(this.weekdaysMin(n, "")), u = A(this.weekdaysShort(n, "")), h = A(this.weekdays(n, "")), t.push(o), r.push(u), s.push(h), a.push(o), a.push(u), a.push(h);
  t.sort(e), r.sort(e), s.sort(e), a.sort(e), this._weekdaysRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function Ht() {
  return this.hours() % 12 || 12;
}
function ai() {
  return this.hours() || 24;
}
f("H", ["HH", 2], 0, "hour");
f("h", ["hh", 2], 0, Ht);
f("k", ["kk", 2], 0, ai);
f("hmm", 0, 0, function() {
  return "" + Ht.apply(this) + ee(this.minutes(), 2);
});
f("hmmss", 0, 0, function() {
  return "" + Ht.apply(this) + ee(this.minutes(), 2) + ee(this.seconds(), 2);
});
f("Hmm", 0, 0, function() {
  return "" + this.hours() + ee(this.minutes(), 2);
});
f("Hmmss", 0, 0, function() {
  return "" + this.hours() + ee(this.minutes(), 2) + ee(this.seconds(), 2);
});
function Ir(e, t) {
  f(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Ir("a", !0);
Ir("A", !1);
N("hour", "h");
W("hour", 13);
function Er(e, t) {
  return t._meridiemParse;
}
c("a", Er);
c("A", Er);
c("H", k);
c("h", k);
c("k", k);
c("HH", k, V);
c("hh", k, V);
c("kk", k, V);
c("hmm", Yr);
c("hmmss", xr);
c("Hmm", Yr);
c("Hmmss", xr);
v(["H", "HH"], x);
v(["k", "kk"], function(e, t, r) {
  var s = g(e);
  t[x] = s === 24 ? 0 : s;
});
v(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
v(["h", "hh"], function(e, t, r) {
  t[x] = g(e), m(r).bigHour = !0;
});
v("hmm", function(e, t, r) {
  var s = e.length - 2;
  t[x] = g(e.substr(0, s)), t[B] = g(e.substr(s)), m(r).bigHour = !0;
});
v("hmmss", function(e, t, r) {
  var s = e.length - 4, a = e.length - 2;
  t[x] = g(e.substr(0, s)), t[B] = g(e.substr(s, 2)), t[oe] = g(e.substr(a)), m(r).bigHour = !0;
});
v("Hmm", function(e, t, r) {
  var s = e.length - 2;
  t[x] = g(e.substr(0, s)), t[B] = g(e.substr(s));
});
v("Hmmss", function(e, t, r) {
  var s = e.length - 4, a = e.length - 2;
  t[x] = g(e.substr(0, s)), t[B] = g(e.substr(s, 2)), t[oe] = g(e.substr(a));
});
function ii(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var ni = /[ap]\.?m?\.?/i, oi = We("Hours", !0);
function li(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var jr = {
  calendar: Qs,
  longDateFormat: ta,
  invalidDate: sa,
  ordinal: ia,
  dayOfMonthOrdinalParse: na,
  relativeTime: la,
  months: va,
  monthsShort: Fr,
  week: Ca,
  weekdays: $a,
  weekdaysMin: Va,
  weekdaysShort: Lr,
  meridiemParse: ni
}, M = {}, Ce = {}, Ve;
function ui(e, t) {
  var r, s = Math.min(e.length, t.length);
  for (r = 0; r < s; r += 1)
    if (e[r] !== t[r])
      return r;
  return s;
}
function nr(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function di(e) {
  for (var t = 0, r, s, a, i; t < e.length; ) {
    for (i = nr(e[t]).split("-"), r = i.length, s = nr(e[t + 1]), s = s ? s.split("-") : null; r > 0; ) {
      if (a = mt(i.slice(0, r).join("-")), a)
        return a;
      if (s && s.length >= r && ui(i, s) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return Ve;
}
function hi(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function mt(e) {
  var t = null, r;
  if (M[e] === void 0 && typeof module < "u" && module && module.exports && hi(e))
    try {
      t = Ve._abbr, r = require, r("./locale/" + e), _e(t);
    } catch {
      M[e] = null;
    }
  return M[e];
}
function _e(e, t) {
  var r;
  return e && (C(t) ? r = de(e) : r = Gt(e, t), r ? Ve = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), Ve._abbr;
}
function Gt(e, t) {
  if (t !== null) {
    var r, s = jr;
    if (t.abbr = e, M[e] != null)
      br(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), s = M[e]._config;
    else if (t.parentLocale != null)
      if (M[t.parentLocale] != null)
        s = M[t.parentLocale]._config;
      else if (r = mt(t.parentLocale), r != null)
        s = r._config;
      else
        return Ce[t.parentLocale] || (Ce[t.parentLocale] = []), Ce[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return M[e] = new Et(Mt(s, t)), Ce[e] && Ce[e].forEach(function(a) {
      Gt(a.name, a.config);
    }), _e(e), M[e];
  } else
    return delete M[e], null;
}
function ci(e, t) {
  if (t != null) {
    var r, s, a = jr;
    M[e] != null && M[e].parentLocale != null ? M[e].set(Mt(M[e]._config, t)) : (s = mt(e), s != null && (a = s._config), t = Mt(a, t), s == null && (t.abbr = e), r = new Et(t), r.parentLocale = M[e], M[e] = r), _e(e);
  } else
    M[e] != null && (M[e].parentLocale != null ? (M[e] = M[e].parentLocale, e === _e() && _e(e)) : M[e] != null && delete M[e]);
  return M[e];
}
function de(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return Ve;
  if (!Z(e)) {
    if (t = mt(e), t)
      return t;
    e = [e];
  }
  return di(e);
}
function fi() {
  return Dt(M);
}
function zt(e) {
  var t, r = e._a;
  return r && m(e).overflow === -2 && (t = r[ne] < 0 || r[ne] > 11 ? ne : r[X] < 1 || r[X] > ft(r[P], r[ne]) ? X : r[x] < 0 || r[x] > 24 || r[x] === 24 && (r[B] !== 0 || r[oe] !== 0 || r[ve] !== 0) ? x : r[B] < 0 || r[B] > 59 ? B : r[oe] < 0 || r[oe] > 59 ? oe : r[ve] < 0 || r[ve] > 999 ? ve : -1, m(e)._overflowDayOfYear && (t < P || t > X) && (t = X), m(e)._overflowWeeks && t === -1 && (t = wa), m(e)._overflowWeekday && t === -1 && (t = Sa), m(e).overflow = t), e;
}
var mi = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, yi = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, _i = /Z|[+-]\d\d(?::?\d\d)?/, Ze = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], bt = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], gi = /^\/?Date\((-?\d+)/i, pi = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, wi = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function Ur(e) {
  var t, r, s = e._i, a = mi.exec(s) || yi.exec(s), i, n, o, u, h = Ze.length, y = bt.length;
  if (a) {
    for (m(e).iso = !0, t = 0, r = h; t < r; t++)
      if (Ze[t][1].exec(a[1])) {
        n = Ze[t][0], i = Ze[t][2] !== !1;
        break;
      }
    if (n == null) {
      e._isValid = !1;
      return;
    }
    if (a[3]) {
      for (t = 0, r = y; t < r; t++)
        if (bt[t][1].exec(a[3])) {
          o = (a[2] || " ") + bt[t][0];
          break;
        }
      if (o == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!i && o != null) {
      e._isValid = !1;
      return;
    }
    if (a[4])
      if (_i.exec(a[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = n + (o || "") + (u || ""), Jt(e);
  } else
    e._isValid = !1;
}
function Si(e, t, r, s, a, i) {
  var n = [
    bi(e),
    Fr.indexOf(t),
    parseInt(r, 10),
    parseInt(s, 10),
    parseInt(a, 10)
  ];
  return i && n.push(parseInt(i, 10)), n;
}
function bi(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function vi(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Oi(e, t, r) {
  if (e) {
    var s = Lr.indexOf(e), a = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (s !== a)
      return m(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function ki(e, t, r) {
  if (e)
    return wi[e];
  if (t)
    return 0;
  var s = parseInt(r, 10), a = s % 100, i = (s - a) / 100;
  return i * 60 + a;
}
function Ar(e) {
  var t = pi.exec(vi(e._i)), r;
  if (t) {
    if (r = Si(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !Oi(t[1], r, e))
      return;
    e._a = r, e._tzm = ki(t[8], t[9], t[10]), e._d = Ae.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), m(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function Mi(e) {
  var t = gi.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (Ur(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Ar(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : d.createFromInputFallback(e);
}
d.createFromInputFallback = G(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Ye(e, t, r) {
  return e ?? t ?? r;
}
function Di(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Bt(e) {
  var t, r, s = [], a, i, n;
  if (!e._d) {
    for (a = Di(e), e._w && e._a[X] == null && e._a[ne] == null && Yi(e), e._dayOfYear != null && (n = Ye(e._a[P], a[P]), (e._dayOfYear > Ee(n) || e._dayOfYear === 0) && (m(e)._overflowDayOfYear = !0), r = Ae(n, 0, e._dayOfYear), e._a[ne] = r.getUTCMonth(), e._a[X] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = s[t] = a[t];
    for (; t < 7; t++)
      e._a[t] = s[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[x] === 24 && e._a[B] === 0 && e._a[oe] === 0 && e._a[ve] === 0 && (e._nextDay = !0, e._a[x] = 0), e._d = (e._useUTC ? Ae : Wa).apply(
      null,
      s
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[x] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (m(e).weekdayMismatch = !0);
  }
}
function Yi(e) {
  var t, r, s, a, i, n, o, u, h;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, n = 4, r = Ye(
    t.GG,
    e._a[P],
    $e(O(), 1, 4).year
  ), s = Ye(t.W, 1), a = Ye(t.E, 1), (a < 1 || a > 7) && (u = !0)) : (i = e._locale._week.dow, n = e._locale._week.doy, h = $e(O(), i, n), r = Ye(t.gg, e._a[P], h.year), s = Ye(t.w, h.week), t.d != null ? (a = t.d, (a < 0 || a > 6) && (u = !0)) : t.e != null ? (a = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : a = i), s < 1 || s > le(r, i, n) ? m(e)._overflowWeeks = !0 : u != null ? m(e)._overflowWeekday = !0 : (o = Cr(r, s, a, i, n), e._a[P] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Jt(e) {
  if (e._f === d.ISO_8601) {
    Ur(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    Ar(e);
    return;
  }
  e._a = [], m(e).empty = !0;
  var t = "" + e._i, r, s, a, i, n, o = t.length, u = 0, h, y;
  for (a = vr(e._f, e._locale).match(jt) || [], y = a.length, r = 0; r < y; r++)
    i = a[r], s = (t.match(_a(i, e)) || [])[0], s && (n = t.substr(0, t.indexOf(s)), n.length > 0 && m(e).unusedInput.push(n), t = t.slice(
      t.indexOf(s) + s.length
    ), u += s.length), Fe[i] ? (s ? m(e).empty = !1 : m(e).unusedTokens.push(i), pa(i, s, e)) : e._strict && !s && m(e).unusedTokens.push(i);
  m(e).charsLeftOver = o - u, t.length > 0 && m(e).unusedInput.push(t), e._a[x] <= 12 && m(e).bigHour === !0 && e._a[x] > 0 && (m(e).bigHour = void 0), m(e).parsedDateParts = e._a.slice(0), m(e).meridiem = e._meridiem, e._a[x] = xi(
    e._locale,
    e._a[x],
    e._meridiem
  ), h = m(e).era, h !== null && (e._a[P] = e._locale.erasConvertYear(h, e._a[P])), Bt(e), zt(e);
}
function xi(e, t, r) {
  var s;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (s = e.isPM(r), s && t < 12 && (t += 12), !s && t === 12 && (t = 0)), t);
}
function Fi(e) {
  var t, r, s, a, i, n, o = !1, u = e._f.length;
  if (u === 0) {
    m(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (a = 0; a < u; a++)
    i = 0, n = !1, t = It({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[a], Jt(t), Lt(t) && (n = !0), i += m(t).charsLeftOver, i += m(t).unusedTokens.length * 10, m(t).score = i, o ? i < s && (s = i, r = t) : (s == null || i < s || n) && (s = i, r = t, n && (o = !0));
  fe(e, r || t);
}
function Ti(e) {
  if (!e._d) {
    var t = Ut(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = wr(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(s) {
        return s && parseInt(s, 10);
      }
    ), Bt(e);
  }
}
function Pi(e) {
  var t = new Ge(zt($r(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function $r(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || de(e._l), t === null || r === void 0 && t === "" ? nt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), Q(t) ? new Ge(zt(t)) : (He(t) ? e._d = t : Z(r) ? Fi(e) : r ? Jt(e) : Ni(e), Lt(e) || (e._d = null), e));
}
function Ni(e) {
  var t = e._i;
  C(t) ? e._d = new Date(d.now()) : He(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? Mi(e) : Z(t) ? (e._a = wr(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Bt(e)) : Oe(t) ? Ti(e) : ue(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function Vr(e, t, r, s, a) {
  var i = {};
  return (t === !0 || t === !1) && (s = t, t = void 0), (r === !0 || r === !1) && (s = r, r = void 0), (Oe(e) && Ct(e) || Z(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = a, i._l = r, i._i = e, i._f = t, i._strict = s, Pi(i);
}
function O(e, t, r, s) {
  return Vr(e, t, r, s, !1);
}
var Wi = G(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = O.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : nt();
  }
), Ri = G(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = O.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : nt();
  }
);
function qr(e, t) {
  var r, s;
  if (t.length === 1 && Z(t[0]) && (t = t[0]), !t.length)
    return O();
  for (r = t[0], s = 1; s < t.length; ++s)
    (!t[s].isValid() || t[s][e](r)) && (r = t[s]);
  return r;
}
function Ci() {
  var e = [].slice.call(arguments, 0);
  return qr("isBefore", e);
}
function Li() {
  var e = [].slice.call(arguments, 0);
  return qr("isAfter", e);
}
var Ii = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Le = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function Ei(e) {
  var t, r = !1, s, a = Le.length;
  for (t in e)
    if (w(e, t) && !(D.call(Le, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (s = 0; s < a; ++s)
    if (e[Le[s]]) {
      if (r)
        return !1;
      parseFloat(e[Le[s]]) !== g(e[Le[s]]) && (r = !0);
    }
  return !0;
}
function ji() {
  return this._isValid;
}
function Ui() {
  return K(NaN);
}
function yt(e) {
  var t = Ut(e), r = t.year || 0, s = t.quarter || 0, a = t.month || 0, i = t.week || t.isoWeek || 0, n = t.day || 0, o = t.hour || 0, u = t.minute || 0, h = t.second || 0, y = t.millisecond || 0;
  this._isValid = Ei(t), this._milliseconds = +y + h * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +n + i * 7, this._months = +a + s * 3 + r * 12, this._data = {}, this._locale = de(), this._bubble();
}
function Ke(e) {
  return e instanceof yt;
}
function xt(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Ai(e, t, r) {
  var s = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), i = 0, n;
  for (n = 0; n < s; n++)
    (r && e[n] !== t[n] || !r && g(e[n]) !== g(t[n])) && i++;
  return i + a;
}
function Hr(e, t) {
  f(e, 0, 0, function() {
    var r = this.utcOffset(), s = "+";
    return r < 0 && (r = -r, s = "-"), s + ee(~~(r / 60), 2) + t + ee(~~r % 60, 2);
  });
}
Hr("Z", ":");
Hr("ZZ", "");
c("Z", ct);
c("ZZ", ct);
v(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Zt(ct, e);
});
var $i = /([\+\-]|\d\d)/gi;
function Zt(e, t) {
  var r = (t || "").match(e), s, a, i;
  return r === null ? null : (s = r[r.length - 1] || [], a = (s + "").match($i) || ["-", 0, 0], i = +(a[1] * 60) + g(a[2]), i === 0 ? 0 : a[0] === "+" ? i : -i);
}
function Qt(e, t) {
  var r, s;
  return t._isUTC ? (r = t.clone(), s = (Q(e) || He(e) ? e.valueOf() : O(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + s), d.updateOffset(r, !1), r) : O(e).local();
}
function Ft(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function Vi(e, t, r) {
  var s = this._offset || 0, a;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Zt(ct, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (a = Ft(this)), this._offset = e, this._isUTC = !0, a != null && this.add(a, "m"), s !== e && (!t || this._changeInProgress ? Br(
      this,
      K(e - s, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? s : Ft(this);
}
function qi(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Hi(e) {
  return this.utcOffset(0, e);
}
function Gi(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Ft(this), "m")), this;
}
function zi() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Zt(ma, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Bi(e) {
  return this.isValid() ? (e = e ? O(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Ji() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Zi() {
  if (!C(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return It(e, this), e = $r(e), e._a ? (t = e._isUTC ? te(e._a) : O(e._a), this._isDSTShifted = this.isValid() && Ai(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Qi() {
  return this.isValid() ? !this._isUTC : !1;
}
function Ki() {
  return this.isValid() ? this._isUTC : !1;
}
function Gr() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Xi = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, en = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function K(e, t) {
  var r = e, s = null, a, i, n;
  return Ke(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ue(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (s = Xi.exec(e)) ? (a = s[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: g(s[X]) * a,
    h: g(s[x]) * a,
    m: g(s[B]) * a,
    s: g(s[oe]) * a,
    ms: g(xt(s[ve] * 1e3)) * a
    // the millisecond decimal point is included in the match
  }) : (s = en.exec(e)) ? (a = s[1] === "-" ? -1 : 1, r = {
    y: we(s[2], a),
    M: we(s[3], a),
    w: we(s[4], a),
    d: we(s[5], a),
    h: we(s[6], a),
    m: we(s[7], a),
    s: we(s[8], a)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (n = tn(
    O(r.from),
    O(r.to)
  ), r = {}, r.ms = n.milliseconds, r.M = n.months), i = new yt(r), Ke(e) && w(e, "_locale") && (i._locale = e._locale), Ke(e) && w(e, "_isValid") && (i._isValid = e._isValid), i;
}
K.fn = yt.prototype;
K.invalid = Ui;
function we(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function or(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function tn(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Qt(t, e), e.isBefore(t) ? r = or(e, t) : (r = or(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function zr(e, t) {
  return function(r, s) {
    var a, i;
    return s !== null && !isNaN(+s) && (br(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = s, s = i), a = K(r, s), Br(this, a, e), this;
  };
}
function Br(e, t, r, s) {
  var a = t._milliseconds, i = xt(t._days), n = xt(t._months);
  e.isValid() && (s = s ?? !0, n && Pr(e, et(e, "Month") + n * r), i && kr(e, "Date", et(e, "Date") + i * r), a && e._d.setTime(e._d.valueOf() + a * r), s && d.updateOffset(e, i || n));
}
var rn = zr(1, "add"), sn = zr(-1, "subtract");
function Jr(e) {
  return typeof e == "string" || e instanceof String;
}
function an(e) {
  return Q(e) || He(e) || Jr(e) || ue(e) || on(e) || nn(e) || e === null || e === void 0;
}
function nn(e) {
  var t = Oe(e) && !Ct(e), r = !1, s = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], a, i, n = s.length;
  for (a = 0; a < n; a += 1)
    i = s[a], r = r || w(e, i);
  return t && r;
}
function on(e) {
  var t = Z(e), r = !1;
  return t && (r = e.filter(function(s) {
    return !ue(s) && Jr(e);
  }).length === 0), t && r;
}
function ln(e) {
  var t = Oe(e) && !Ct(e), r = !1, s = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], a, i;
  for (a = 0; a < s.length; a += 1)
    i = s[a], r = r || w(e, i);
  return t && r;
}
function un(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function dn(e, t) {
  arguments.length === 1 && (arguments[0] ? an(arguments[0]) ? (e = arguments[0], t = void 0) : ln(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || O(), s = Qt(r, this).startOf("day"), a = d.calendarFormat(this, s) || "sameElse", i = t && (re(t[a]) ? t[a].call(this, r) : t[a]);
  return this.format(
    i || this.localeData().calendar(a, this, O(r))
  );
}
function hn() {
  return new Ge(this);
}
function cn(e, t) {
  var r = Q(e) ? e : O(e);
  return this.isValid() && r.isValid() ? (t = z(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function fn(e, t) {
  var r = Q(e) ? e : O(e);
  return this.isValid() && r.isValid() ? (t = z(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function mn(e, t, r, s) {
  var a = Q(e) ? e : O(e), i = Q(t) ? t : O(t);
  return this.isValid() && a.isValid() && i.isValid() ? (s = s || "()", (s[0] === "(" ? this.isAfter(a, r) : !this.isBefore(a, r)) && (s[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function yn(e, t) {
  var r = Q(e) ? e : O(e), s;
  return this.isValid() && r.isValid() ? (t = z(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (s = r.valueOf(), this.clone().startOf(t).valueOf() <= s && s <= this.clone().endOf(t).valueOf())) : !1;
}
function _n(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function gn(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function pn(e, t, r) {
  var s, a, i;
  if (!this.isValid())
    return NaN;
  if (s = Qt(e, this), !s.isValid())
    return NaN;
  switch (a = (s.utcOffset() - this.utcOffset()) * 6e4, t = z(t), t) {
    case "year":
      i = Xe(this, s) / 12;
      break;
    case "month":
      i = Xe(this, s);
      break;
    case "quarter":
      i = Xe(this, s) / 3;
      break;
    case "second":
      i = (this - s) / 1e3;
      break;
    case "minute":
      i = (this - s) / 6e4;
      break;
    case "hour":
      i = (this - s) / 36e5;
      break;
    case "day":
      i = (this - s - a) / 864e5;
      break;
    case "week":
      i = (this - s - a) / 6048e5;
      break;
    default:
      i = this - s;
  }
  return r ? i : q(i);
}
function Xe(e, t) {
  if (e.date() < t.date())
    return -Xe(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), s = e.clone().add(r, "months"), a, i;
  return t - s < 0 ? (a = e.clone().add(r - 1, "months"), i = (t - s) / (s - a)) : (a = e.clone().add(r + 1, "months"), i = (t - s) / (a - s)), -(r + i) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function wn() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function Sn(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? Qe(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : re(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Qe(r, "Z")) : Qe(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function bn() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, s, a, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", a = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + s + a + i);
}
function vn(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = Qe(this, e);
  return this.localeData().postformat(t);
}
function On(e, t) {
  return this.isValid() && (Q(e) && e.isValid() || O(e).isValid()) ? K({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function kn(e) {
  return this.from(O(), e);
}
function Mn(e, t) {
  return this.isValid() && (Q(e) && e.isValid() || O(e).isValid()) ? K({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Dn(e) {
  return this.to(O(), e);
}
function Zr(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = de(e), t != null && (this._locale = t), this);
}
var Qr = G(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Kr() {
  return this._locale;
}
var st = 1e3, Te = 60 * st, at = 60 * Te, Xr = (365 * 400 + 97) * 24 * at;
function Pe(e, t) {
  return (e % t + t) % t;
}
function es(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - Xr : new Date(e, t, r).valueOf();
}
function ts(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - Xr : Date.UTC(e, t, r);
}
function Yn(e) {
  var t, r;
  if (e = z(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ts : es, e) {
    case "year":
      t = r(this.year(), 0, 1);
      break;
    case "quarter":
      t = r(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = r(this.year(), this.month(), 1);
      break;
    case "week":
      t = r(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = r(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= Pe(
        t + (this._isUTC ? 0 : this.utcOffset() * Te),
        at
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Pe(t, Te);
      break;
    case "second":
      t = this._d.valueOf(), t -= Pe(t, st);
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function xn(e) {
  var t, r;
  if (e = z(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? ts : es, e) {
    case "year":
      t = r(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = r(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = r(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = r(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = r(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += at - Pe(
        t + (this._isUTC ? 0 : this.utcOffset() * Te),
        at
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Te - Pe(t, Te) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += st - Pe(t, st) - 1;
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function Fn() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Tn() {
  return Math.floor(this.valueOf() / 1e3);
}
function Pn() {
  return new Date(this.valueOf());
}
function Nn() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ];
}
function Wn() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  };
}
function Rn() {
  return this.isValid() ? this.toISOString() : null;
}
function Cn() {
  return Lt(this);
}
function Ln() {
  return fe({}, m(this));
}
function In() {
  return m(this).overflow;
}
function En() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
f("N", 0, 0, "eraAbbr");
f("NN", 0, 0, "eraAbbr");
f("NNN", 0, 0, "eraAbbr");
f("NNNN", 0, 0, "eraName");
f("NNNNN", 0, 0, "eraNarrow");
f("y", ["y", 1], "yo", "eraYear");
f("y", ["yy", 2], 0, "eraYear");
f("y", ["yyy", 3], 0, "eraYear");
f("y", ["yyyy", 4], 0, "eraYear");
c("N", Kt);
c("NN", Kt);
c("NNN", Kt);
c("NNNN", Jn);
c("NNNNN", Zn);
v(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, s) {
    var a = r._locale.erasParse(e, s, r._strict);
    a ? m(r).era = a : m(r).invalidEra = e;
  }
);
c("y", Re);
c("yy", Re);
c("yyy", Re);
c("yyyy", Re);
c("yo", Qn);
v(["y", "yy", "yyy", "yyyy"], P);
v(["yo"], function(e, t, r, s) {
  var a;
  r._locale._eraYearOrdinalRegex && (a = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[P] = r._locale.eraYearOrdinalParse(e, a) : t[P] = parseInt(e, 10);
});
function jn(e, t) {
  var r, s, a, i = this._eras || de("en")._eras;
  for (r = 0, s = i.length; r < s; ++r) {
    switch (typeof i[r].since) {
      case "string":
        a = d(i[r].since).startOf("day"), i[r].since = a.valueOf();
        break;
    }
    switch (typeof i[r].until) {
      case "undefined":
        i[r].until = 1 / 0;
        break;
      case "string":
        a = d(i[r].until).startOf("day").valueOf(), i[r].until = a.valueOf();
        break;
    }
  }
  return i;
}
function Un(e, t, r) {
  var s, a, i = this.eras(), n, o, u;
  for (e = e.toUpperCase(), s = 0, a = i.length; s < a; ++s)
    if (n = i[s].name.toUpperCase(), o = i[s].abbr.toUpperCase(), u = i[s].narrow.toUpperCase(), r)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return i[s];
          break;
        case "NNNN":
          if (n === e)
            return i[s];
          break;
        case "NNNNN":
          if (u === e)
            return i[s];
          break;
      }
    else if ([n, o, u].indexOf(e) >= 0)
      return i[s];
}
function An(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? d(e.since).year() : d(e.since).year() + (t - e.offset) * r;
}
function $n() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].name;
  return "";
}
function Vn() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].narrow;
  return "";
}
function qn() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].abbr;
  return "";
}
function Hn() {
  var e, t, r, s, a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (r = a[e].since <= a[e].until ? 1 : -1, s = this.clone().startOf("day").valueOf(), a[e].since <= s && s <= a[e].until || a[e].until <= s && s <= a[e].since)
      return (this.year() - d(a[e].since).year()) * r + a[e].offset;
  return this.year();
}
function Gn(e) {
  return w(this, "_erasNameRegex") || Xt.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function zn(e) {
  return w(this, "_erasAbbrRegex") || Xt.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Bn(e) {
  return w(this, "_erasNarrowRegex") || Xt.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Kt(e, t) {
  return t.erasAbbrRegex(e);
}
function Jn(e, t) {
  return t.erasNameRegex(e);
}
function Zn(e, t) {
  return t.erasNarrowRegex(e);
}
function Qn(e, t) {
  return t._eraYearOrdinalRegex || Re;
}
function Xt() {
  var e = [], t = [], r = [], s = [], a, i, n = this.eras();
  for (a = 0, i = n.length; a < i; ++a)
    t.push(A(n[a].name)), e.push(A(n[a].abbr)), r.push(A(n[a].narrow)), s.push(A(n[a].name)), s.push(A(n[a].abbr)), s.push(A(n[a].narrow));
  this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
f(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
f(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function _t(e, t) {
  f(0, [e, e.length], 0, t);
}
_t("gggg", "weekYear");
_t("ggggg", "weekYear");
_t("GGGG", "isoWeekYear");
_t("GGGGG", "isoWeekYear");
N("weekYear", "gg");
N("isoWeekYear", "GG");
W("weekYear", 1);
W("isoWeekYear", 1);
c("G", ht);
c("g", ht);
c("GG", k, V);
c("gg", k, V);
c("GGGG", $t, At);
c("gggg", $t, At);
c("GGGGG", dt, lt);
c("ggggg", dt, lt);
Be(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, s) {
    t[s.substr(0, 2)] = g(e);
  }
);
Be(["gg", "GG"], function(e, t, r, s) {
  t[s] = d.parseTwoDigitYear(e);
});
function Kn(e) {
  return rs.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Xn(e) {
  return rs.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function eo() {
  return le(this.year(), 1, 4);
}
function to() {
  return le(this.isoWeekYear(), 1, 4);
}
function ro() {
  var e = this.localeData()._week;
  return le(this.year(), e.dow, e.doy);
}
function so() {
  var e = this.localeData()._week;
  return le(this.weekYear(), e.dow, e.doy);
}
function rs(e, t, r, s, a) {
  var i;
  return e == null ? $e(this, s, a).year : (i = le(e, s, a), t > i && (t = i), ao.call(this, e, t, r, s, a));
}
function ao(e, t, r, s, a) {
  var i = Cr(e, t, r, s, a), n = Ae(i.year, 0, i.dayOfYear);
  return this.year(n.getUTCFullYear()), this.month(n.getUTCMonth()), this.date(n.getUTCDate()), this;
}
f("Q", 0, "Qo", "quarter");
N("quarter", "Q");
W("quarter", 7);
c("Q", Mr);
v("Q", function(e, t) {
  t[ne] = (g(e) - 1) * 3;
});
function io(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
f("D", ["DD", 2], "Do", "date");
N("date", "D");
W("date", 9);
c("D", k);
c("DD", k, V);
c("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
v(["D", "DD"], X);
v("Do", function(e, t) {
  t[X] = g(e.match(k)[0]);
});
var ss = We("Date", !0);
f("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
N("dayOfYear", "DDD");
W("dayOfYear", 4);
c("DDD", ut);
c("DDDD", Dr);
v(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = g(e);
});
function no(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
f("m", ["mm", 2], 0, "minute");
N("minute", "m");
W("minute", 14);
c("m", k);
c("mm", k, V);
v(["m", "mm"], B);
var oo = We("Minutes", !1);
f("s", ["ss", 2], 0, "second");
N("second", "s");
W("second", 15);
c("s", k);
c("ss", k, V);
v(["s", "ss"], oe);
var lo = We("Seconds", !1);
f("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
f(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
f(0, ["SSS", 3], 0, "millisecond");
f(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
f(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
f(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
f(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
f(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
f(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
N("millisecond", "ms");
W("millisecond", 16);
c("S", ut, Mr);
c("SS", ut, V);
c("SSS", ut, Dr);
var me, as;
for (me = "SSSS"; me.length <= 9; me += "S")
  c(me, Re);
function uo(e, t) {
  t[ve] = g(("0." + e) * 1e3);
}
for (me = "S"; me.length <= 9; me += "S")
  v(me, uo);
as = We("Milliseconds", !1);
f("z", 0, 0, "zoneAbbr");
f("zz", 0, 0, "zoneName");
function ho() {
  return this._isUTC ? "UTC" : "";
}
function co() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var l = Ge.prototype;
l.add = rn;
l.calendar = dn;
l.clone = hn;
l.diff = pn;
l.endOf = xn;
l.format = vn;
l.from = On;
l.fromNow = kn;
l.to = Mn;
l.toNow = Dn;
l.get = ca;
l.invalidAt = In;
l.isAfter = cn;
l.isBefore = fn;
l.isBetween = mn;
l.isSame = yn;
l.isSameOrAfter = _n;
l.isSameOrBefore = gn;
l.isValid = Cn;
l.lang = Qr;
l.locale = Zr;
l.localeData = Kr;
l.max = Ri;
l.min = Wi;
l.parsingFlags = Ln;
l.set = fa;
l.startOf = Yn;
l.subtract = sn;
l.toArray = Nn;
l.toObject = Wn;
l.toDate = Pn;
l.toISOString = Sn;
l.inspect = bn;
typeof Symbol < "u" && Symbol.for != null && (l[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
l.toJSON = Rn;
l.toString = wn;
l.unix = Tn;
l.valueOf = Fn;
l.creationData = En;
l.eraName = $n;
l.eraNarrow = Vn;
l.eraAbbr = qn;
l.eraYear = Hn;
l.year = Rr;
l.isLeapYear = Na;
l.weekYear = Kn;
l.isoWeekYear = Xn;
l.quarter = l.quarters = io;
l.month = Nr;
l.daysInMonth = Fa;
l.week = l.weeks = Ea;
l.isoWeek = l.isoWeeks = ja;
l.weeksInYear = ro;
l.weeksInWeekYear = so;
l.isoWeeksInYear = eo;
l.isoWeeksInISOWeekYear = to;
l.date = ss;
l.day = l.days = Ka;
l.weekday = Xa;
l.isoWeekday = ei;
l.dayOfYear = no;
l.hour = l.hours = oi;
l.minute = l.minutes = oo;
l.second = l.seconds = lo;
l.millisecond = l.milliseconds = as;
l.utcOffset = Vi;
l.utc = Hi;
l.local = Gi;
l.parseZone = zi;
l.hasAlignedHourOffset = Bi;
l.isDST = Ji;
l.isLocal = Qi;
l.isUtcOffset = Ki;
l.isUtc = Gr;
l.isUTC = Gr;
l.zoneAbbr = ho;
l.zoneName = co;
l.dates = G(
  "dates accessor is deprecated. Use date instead.",
  ss
);
l.months = G(
  "months accessor is deprecated. Use month instead",
  Nr
);
l.years = G(
  "years accessor is deprecated. Use year instead",
  Rr
);
l.zone = G(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  qi
);
l.isDSTShifted = G(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Zi
);
function fo(e) {
  return O(e * 1e3);
}
function mo() {
  return O.apply(null, arguments).parseZone();
}
function is(e) {
  return e;
}
var S = Et.prototype;
S.calendar = Ks;
S.longDateFormat = ra;
S.invalidDate = aa;
S.ordinal = oa;
S.preparse = is;
S.postformat = is;
S.relativeTime = ua;
S.pastFuture = da;
S.set = Zs;
S.eras = jn;
S.erasParse = Un;
S.erasConvertYear = An;
S.erasAbbrRegex = zn;
S.erasNameRegex = Gn;
S.erasNarrowRegex = Bn;
S.months = Ma;
S.monthsShort = Da;
S.monthsParse = xa;
S.monthsRegex = Pa;
S.monthsShortRegex = Ta;
S.week = Ra;
S.firstDayOfYear = Ia;
S.firstDayOfWeek = La;
S.weekdays = za;
S.weekdaysMin = Ja;
S.weekdaysShort = Ba;
S.weekdaysParse = Qa;
S.weekdaysRegex = ti;
S.weekdaysShortRegex = ri;
S.weekdaysMinRegex = si;
S.isPM = ii;
S.meridiem = li;
function it(e, t, r, s) {
  var a = de(), i = te().set(s, t);
  return a[r](i, e);
}
function ns(e, t, r) {
  if (ue(e) && (t = e, e = void 0), e = e || "", t != null)
    return it(e, t, r, "month");
  var s, a = [];
  for (s = 0; s < 12; s++)
    a[s] = it(e, s, r, "month");
  return a;
}
function er(e, t, r, s) {
  typeof e == "boolean" ? (ue(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, ue(t) && (r = t, t = void 0), t = t || "");
  var a = de(), i = e ? a._week.dow : 0, n, o = [];
  if (r != null)
    return it(t, (r + i) % 7, s, "day");
  for (n = 0; n < 7; n++)
    o[n] = it(t, (n + i) % 7, s, "day");
  return o;
}
function yo(e, t) {
  return ns(e, t, "months");
}
function _o(e, t) {
  return ns(e, t, "monthsShort");
}
function go(e, t, r) {
  return er(e, t, r, "weekdays");
}
function po(e, t, r) {
  return er(e, t, r, "weekdaysShort");
}
function wo(e, t, r) {
  return er(e, t, r, "weekdaysMin");
}
_e("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(e) {
    var t = e % 10, r = g(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + r;
  }
});
d.lang = G(
  "moment.lang is deprecated. Use moment.locale instead.",
  _e
);
d.langData = G(
  "moment.langData is deprecated. Use moment.localeData instead.",
  de
);
var se = Math.abs;
function So() {
  var e = this._data;
  return this._milliseconds = se(this._milliseconds), this._days = se(this._days), this._months = se(this._months), e.milliseconds = se(e.milliseconds), e.seconds = se(e.seconds), e.minutes = se(e.minutes), e.hours = se(e.hours), e.months = se(e.months), e.years = se(e.years), this;
}
function os(e, t, r, s) {
  var a = K(t, r);
  return e._milliseconds += s * a._milliseconds, e._days += s * a._days, e._months += s * a._months, e._bubble();
}
function bo(e, t) {
  return os(this, e, t, 1);
}
function vo(e, t) {
  return os(this, e, t, -1);
}
function lr(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Oo() {
  var e = this._milliseconds, t = this._days, r = this._months, s = this._data, a, i, n, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += lr(Tt(r) + t) * 864e5, t = 0, r = 0), s.milliseconds = e % 1e3, a = q(e / 1e3), s.seconds = a % 60, i = q(a / 60), s.minutes = i % 60, n = q(i / 60), s.hours = n % 24, t += q(n / 24), u = q(ls(t)), r += u, t -= lr(Tt(u)), o = q(r / 12), r %= 12, s.days = t, s.months = r, s.years = o, this;
}
function ls(e) {
  return e * 4800 / 146097;
}
function Tt(e) {
  return e * 146097 / 4800;
}
function ko(e) {
  if (!this.isValid())
    return NaN;
  var t, r, s = this._milliseconds;
  if (e = z(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + s / 864e5, r = this._months + ls(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(Tt(this._months)), e) {
      case "week":
        return t / 7 + s / 6048e5;
      case "day":
        return t + s / 864e5;
      case "hour":
        return t * 24 + s / 36e5;
      case "minute":
        return t * 1440 + s / 6e4;
      case "second":
        return t * 86400 + s / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + s;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function Mo() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + g(this._months / 12) * 31536e6 : NaN;
}
function he(e) {
  return function() {
    return this.as(e);
  };
}
var Do = he("ms"), Yo = he("s"), xo = he("m"), Fo = he("h"), To = he("d"), Po = he("w"), No = he("M"), Wo = he("Q"), Ro = he("y");
function Co() {
  return K(this);
}
function Lo(e) {
  return e = z(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Me(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Io = Me("milliseconds"), Eo = Me("seconds"), jo = Me("minutes"), Uo = Me("hours"), Ao = Me("days"), $o = Me("months"), Vo = Me("years");
function qo() {
  return q(this.days() / 7);
}
var ae = Math.round, xe = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function Ho(e, t, r, s, a) {
  return a.relativeTime(t || 1, !!r, e, s);
}
function Go(e, t, r, s) {
  var a = K(e).abs(), i = ae(a.as("s")), n = ae(a.as("m")), o = ae(a.as("h")), u = ae(a.as("d")), h = ae(a.as("M")), y = ae(a.as("w")), b = ae(a.as("y")), R = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || n <= 1 && ["m"] || n < r.m && ["mm", n] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (R = R || y <= 1 && ["w"] || y < r.w && ["ww", y]), R = R || h <= 1 && ["M"] || h < r.M && ["MM", h] || b <= 1 && ["y"] || ["yy", b], R[2] = t, R[3] = +e > 0, R[4] = s, Ho.apply(null, R);
}
function zo(e) {
  return e === void 0 ? ae : typeof e == "function" ? (ae = e, !0) : !1;
}
function Bo(e, t) {
  return xe[e] === void 0 ? !1 : t === void 0 ? xe[e] : (xe[e] = t, e === "s" && (xe.ss = t - 1), !0);
}
function Jo(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, s = xe, a, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (s = Object.assign({}, xe, t), t.s != null && t.ss == null && (s.ss = t.s - 1)), a = this.localeData(), i = Go(this, !r, s, a), r && (i = a.pastFuture(+this, i)), a.postformat(i);
}
var vt = Math.abs;
function De(e) {
  return (e > 0) - (e < 0) || +e;
}
function gt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = vt(this._milliseconds) / 1e3, t = vt(this._days), r = vt(this._months), s, a, i, n, o = this.asSeconds(), u, h, y, b;
  return o ? (s = q(e / 60), a = q(s / 60), e %= 60, s %= 60, i = q(r / 12), r %= 12, n = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", h = De(this._months) !== De(o) ? "-" : "", y = De(this._days) !== De(o) ? "-" : "", b = De(this._milliseconds) !== De(o) ? "-" : "", u + "P" + (i ? h + i + "Y" : "") + (r ? h + r + "M" : "") + (t ? y + t + "D" : "") + (a || s || e ? "T" : "") + (a ? b + a + "H" : "") + (s ? b + s + "M" : "") + (e ? b + n + "S" : "")) : "P0D";
}
var p = yt.prototype;
p.isValid = ji;
p.abs = So;
p.add = bo;
p.subtract = vo;
p.as = ko;
p.asMilliseconds = Do;
p.asSeconds = Yo;
p.asMinutes = xo;
p.asHours = Fo;
p.asDays = To;
p.asWeeks = Po;
p.asMonths = No;
p.asQuarters = Wo;
p.asYears = Ro;
p.valueOf = Mo;
p._bubble = Oo;
p.clone = Co;
p.get = Lo;
p.milliseconds = Io;
p.seconds = Eo;
p.minutes = jo;
p.hours = Uo;
p.days = Ao;
p.weeks = qo;
p.months = $o;
p.years = Vo;
p.humanize = Jo;
p.toISOString = gt;
p.toString = gt;
p.toJSON = gt;
p.locale = Zr;
p.localeData = Kr;
p.toIsoString = G(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  gt
);
p.lang = Qr;
f("X", 0, 0, "unix");
f("x", 0, 0, "valueOf");
c("x", ht);
c("X", ya);
v("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
v("x", function(e, t, r) {
  r._d = new Date(g(e));
});
//! moment.js
d.version = "2.29.4";
Bs(O);
d.fn = l;
d.min = Ci;
d.max = Li;
d.now = Ii;
d.utc = te;
d.unix = fo;
d.months = yo;
d.isDate = He;
d.locale = _e;
d.invalid = nt;
d.duration = K;
d.isMoment = Q;
d.weekdays = go;
d.parseZone = mo;
d.localeData = de;
d.isDuration = Ke;
d.monthsShort = _o;
d.weekdaysMin = wo;
d.defineLocale = Gt;
d.updateLocale = ci;
d.locales = fi;
d.weekdaysShort = po;
d.normalizeUnits = z;
d.relativeTimeRounding = zo;
d.relativeTimeThreshold = Bo;
d.calendarFormat = un;
d.prototype = l;
d.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
const Se = E({
  default: []
});
function qe() {
  return {
    createBag(e) {
      Se[e] || (Se[e] = []);
    },
    set(e, t = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      Se[t] = Object.keys(e.response.data.errors).map((s) => ({
        key: s,
        message: e.response.data.errors[s][0]
      }));
    },
    get(e, t = "default") {
      const r = Se[t];
      if (!r)
        return {
          message: "",
          variant: ""
        };
      const s = r.find(
        (a) => Array.isArray(e) ? e.includes(a.key) : a.key === e
      );
      return s ? {
        message: s.message,
        variant: "danger"
      } : {
        message: "",
        variant: ""
      };
    },
    clear(e = null, t = "default") {
      if (e) {
        const r = Se[t];
        if (!r) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const s = r.findIndex((a) => a.key === e);
        r.splice(s, 1);
        return;
      }
      Se[t] = [];
    },
    all(e = "default") {
      return Se[e];
    }
  };
}
class pt {
  constructor({
    submitPath: t,
    submitMethod: r = "post",
    loadPath: s = "",
    bag: a = "default",
    form: i = {}
  } = {}) {
    _(this, "loadPath", "");
    _(this, "submitPath", "");
    _(this, "submitMethod", "post");
    _(this, "errors", null);
    _(this, "errorBag", "");
    _(this, "model", E({}));
    _(this, "form", E({}));
    _(this, "original", {});
    _(this, "states", {
      load: new L(),
      submit: new L()
    });
    return this.submitPath = t, this.submitMethod = r, this.loadPath = s, this.errorBag = a, this.errors = qe(), this.errors.createBag(this.errorBag), this.setAttributes(i), this.states.load.loaded(), new Proxy(this, {
      get(n, o, u) {
        if (Reflect.has(n, o))
          return Reflect.get(n, o, u);
        if (Reflect.has(n.form, o)) {
          const h = o.split(".");
          if (h.length > 1) {
            let y = n.form;
            for (let b = 0; b < h.length; b++)
              y = y[h[b]];
            return y ?? void 0;
          }
          return Reflect.get(n.form, o);
        }
      },
      set(n, o, u, h) {
        if (Reflect.has(n, o))
          return Reflect.set(n, o, u, h);
        if (Reflect.has(n.form, o)) {
          const y = o.split(".");
          if (y.length > 1) {
            let b = n.form;
            for (let R = 0; R < y.length - 1; R++)
              y[R] in b || (b[y[R]] = {}), b = b[y[R]];
            return b[y[y.length - 1]] === void 0 ? !1 : (b[y[y.length - 1]] = u, !0);
          }
          return Reflect.set(n.form, o, u);
        }
        return !1;
      }
    });
  }
  get isSubmitting() {
    return this.states.submit.isLoading;
  }
  get isSubmitted() {
    return this.states.submit.isLoaded;
  }
  get isSubmitFailed() {
    return this.states.submit.isFailure;
  }
  get isLoading() {
    return this.states.load.isLoading;
  }
  get isLoaded() {
    return this.states.load.isLoaded;
  }
  get isFailure() {
    return this.states.load.isFailure;
  }
  get isDirty() {
    return JSON.stringify(this.original) !== JSON.stringify(this.form);
  }
  static create(t) {
    return new this(t);
  }
  setPath(t) {
    this.submitPath = t;
  }
  setErrors(t) {
    this.errorBag = t || "default", this.errors = qe(), this.errors.createBag(this.errorBag);
  }
  setAttributes(t) {
    this.original = t, this.form = E({ ...t });
  }
  getError(t) {
    return this.errors.get(t, this.errorBag);
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag);
  }
  async submit({ path: t = this.submitPath, formatter: r = null, config: s = {} } = {}, a = null) {
    var u;
    if (typeof t != "string")
      throw new Error("Path must be a string");
    if (r !== null && typeof r != "function")
      throw new Error("Formatter must be a function");
    if (typeof s != "object")
      throw new Error("Config must be an object");
    this.clearErrors(), this.submitting();
    const i = JSON.parse(JSON.stringify(this.form)), n = r ? r(this.form) : i;
    if (!t)
      return this.handleSubmissionFailure("No url defined.");
    const o = (s == null ? void 0 : s.method) || this.submitMethod || "post";
    try {
      const { data: h } = await T[o](t, n, s);
      return console.log("are we here?"), this.clearErrors(), this.submitted(), a ? a(h) : h;
    } catch (h) {
      return console.log("caught error in plugin", h.response.status), ((u = h.response) == null ? void 0 : u.status) === 422 ? (this.handleSubmissionFailure(h), null) : Promise.reject(h);
    }
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(t) {
    this.submitFailed(), this.errors.set(t, this.errorBag);
  }
  async advancedSubmit(t) {
    this.states.submit.loading();
    const { data: r } = await Promise.resolve(t(T, this.form)).catch(
      (s) => {
        throw this.states.submit.failed(), this.errors.set(s, this.errorBag), s;
      }
    );
    return this.states.submit.loaded(), r;
  }
  async load({ path: t = "", params: r = {}, updateOriginal: s = !0 } = {}) {
    this.loading();
    const a = t || this.loadPath;
    if (!a)
      throw this.loadFailed(), Error("Url is not defined for the load method.");
    const { data: i } = await T.get(a, {
      params: r
    }).catch((n) => {
      throw this.loadFailed(), n;
    });
    return s && Object.assign(this.original, i.form), Object.assign(this.form, i.form), i.model && Object.assign(this.model, i.model), this.loaded(), i;
  }
  loading() {
    this.states.load.loading();
  }
  loaded() {
    this.states.load.loaded();
  }
  loadFailed() {
    this.states.load.failed();
  }
  submitting() {
    this.states.submit.loading();
  }
  submitFailed() {
    this.states.submit.failed();
  }
  submitted() {
    this.states.submit.loaded();
  }
  reset() {
    Object.assign(this.form, this.original);
  }
}
const Zo = {
  name: "WyxosDatepicker",
  props: {
    modelValue: {
      required: !0,
      type: [null, String]
    },
    displayFormat: {
      type: String,
      default: "DD/MM/YYYY"
    },
    submitFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    form: {
      type: pt,
      default: null
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      query: null
    };
  },
  watch: {
    modelValue(e) {
      this.query = e ? d(e, this.submitFormat)._d : null;
    }
  },
  mounted() {
    this.modelValue && (this.query = d(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(e) {
      return e ? d(e).format(this.displayFormat) : null;
    },
    updateQuery() {
      var e;
      this.$emit(
        "update:modelValue",
        this.query ? d(this.query).format(this.submitFormat) : null
      ), (e = this.form) == null || e.clearError(this.name);
    }
  }
};
function Qo(e, t, r, s, a, i) {
  var u;
  const n = j("o-datepicker"), o = j("o-field");
  return F(), pe(o, je({ label: r.label }, (u = r.form) == null ? void 0 : u.getError(r.name)), {
    default: H(() => [
      ge(n, je({
        modelValue: a.query,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => a.query = h)
      }, r.options, {
        "date-formatter": i.dateFormatter,
        "onUpdate:modelValue": i.updateQuery
      }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Ko = /* @__PURE__ */ $(Zo, [["render", Qo]]), Xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ko
}, Symbol.toStringTag, { value: "Module" })), el = Rt({
  name: "WyxosError",
  props: {
    form: {
      type: pt,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: qe()
    };
  }
}), tl = { key: 0 }, rl = { key: 1 };
function sl(e, t, r, s, a, i) {
  var n, o;
  return (n = e.form) != null && n.getError(e.name).message ? (F(), J("p", tl, I(e.form.getError(e.name).message), 1)) : (o = e.errors.get(e.name)) != null && o.message ? (F(), J("p", rl, I(e.errors.get(e.name).message), 1)) : ye("", !0);
}
const al = /* @__PURE__ */ $(el, [["render", sl]]), il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: al
}, Symbol.toStringTag, { value: "Module" })), nl = {
  name: "WyxosForm",
  props: {
    form: {
      type: pt,
      required: !0
    }
  },
  emits: ["submit"]
};
function ol(e, t, r, s, a, i) {
  const n = j("o-loading"), o = j("o-button");
  return F(), J("div", null, [
    r.form.isLoaded ? (F(), J("form", {
      key: 0,
      class: "form",
      onSubmit: t[0] || (t[0] = xs((u) => e.$emit("submit"), ["prevent"]))
    }, [
      Ne(e.$slots, "default")
    ], 32)) : ye("", !0),
    ge(n, {
      active: r.form.isLoading
    }, null, 8, ["active"]),
    r.form.isFailure ? (F(), pe(o, {
      key: 1,
      onClick: t[1] || (t[1] = (u) => r.form.load())
    }, {
      default: H(() => [
        ke(" An error occurred. Try again? ")
      ]),
      _: 1
    })) : ye("", !0)
  ]);
}
const ll = /* @__PURE__ */ $(nl, [["render", ol]]), ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ll
}, Symbol.toStringTag, { value: "Module" })), dl = {
  name: "WyxosImage",
  props: {
    src: {
      type: [File, String],
      required: !0
    },
    resize: {
      type: Object,
      default: null
    }
  },
  emits: ["loaded"],
  data() {
    return {
      instance: null,
      width: 0,
      height: 0
    };
  },
  mounted() {
    this.loadImage();
  },
  unmounted() {
    this.instance.onload = null;
  },
  methods: {
    loadImage() {
      return typeof this.src == "object" ? this.loadFile() : this.loadPath();
    },
    loadFile() {
      this.instance = new FileReader(), this.instance.onload = (e) => {
        const t = e.target.result;
        this.$refs.image.src = t, this.width = this.resize ? this.resize.width : t.width, this.height = this.resize ? this.resize.height : t.height, this.$emit("loaded");
      }, this.instance.readAsDataURL(this.src);
    },
    loadPath() {
      this.instance = new Image(), this.instance.onload = () => {
        this.$refs.image.src = this.src, this.width = this.resize ? this.resize.width : this.instance.width, this.height = this.resize ? this.resize.height : this.instance.height, this.$emit("loaded");
      }, this.instance.src = this.src;
    }
  }
}, hl = ["width", "height"];
function cl(e, t, r, s, a, i) {
  return F(), J("img", {
    ref: "image",
    src: "",
    alt: "",
    width: a.width,
    height: a.height
  }, null, 8, hl);
}
const fl = /* @__PURE__ */ $(dl, [["render", cl]]), ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fl
}, Symbol.toStringTag, { value: "Module" })), yl = {
  name: "WyxosInput",
  props: {
    label: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    name: {
      type: String,
      required: !0
    },
    bag: {
      type: String,
      default: () => "default"
    },
    type: {
      type: String,
      default: "text"
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    fieldClass: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    modelValue: {
      type: [String, Number, null],
      default: null
    },
    disabled: {
      type: [Boolean, String],
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      errors: qe()
    };
  },
  methods: {
    onInput(e) {
      this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", e);
    }
  }
};
function _l(e, t, r, s, a, i) {
  const n = j("o-input"), o = j("o-field");
  return F(), pe(o, je({
    label: r.label,
    class: r.fieldClass
  }, { ...s.errors.get(r.name, r.bag) }), {
    default: H(() => [
      ge(n, {
        readonly: r.readonly,
        class: _r(r.inputClass),
        name: r.name,
        type: r.type,
        clearable: r.clearable,
        disabled: r.disabled,
        "model-value": r.modelValue,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => i.onInput(u))
      }, null, 8, ["readonly", "class", "name", "type", "clearable", "disabled", "model-value"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const gl = /* @__PURE__ */ $(yl, [["render", _l]]), pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gl
}, Symbol.toStringTag, { value: "Module" }));
function be(e, t, r = void 0) {
  const s = t.split(".").reduce((a, i) => typeof a < "u" ? a[i] : void 0, e);
  return typeof s < "u" ? s : r;
}
function Pt(e) {
  return typeof e < "u" && e !== null ? e : "";
}
function wl(e, t) {
  return e.indexOf(t, e.length - t.length) !== -1;
}
let Sl = {
  iconPack: "mdi",
  useHtml5Validation: !0,
  statusIcon: !0,
  transformClasses: void 0
};
const bl = () => Sl, ur = (e, t) => Pt(e).split(" ").filter((r) => r.length > 0).map((r) => r + t).join(" "), dr = (e) => {
  const r = (e.$options.computed ? Object.keys(e.$options.computed) : []).filter((s) => !wl(s, "Classes")).reduce((s, a) => (s[a] = e[a], s), {});
  return { props: e.$props, data: e.$data, computed: r };
};
Rt({
  isOruga: !0,
  props: {
    override: Boolean
  },
  methods: {
    computedClass(e, t, r = "") {
      const s = this.$props.override === !0 ? {} : bl(), a = this.$props.override || be(s, `${this.$options.configField}.override`, !1), i = be(s, `${this.$options.configField}.${e}.override`, a), n = be(s, "transformClasses", void 0), o = be(s, `${this.$options.configField}.transformClasses`, void 0);
      let u = be(s, `${this.$options.configField}.${e}.class`, "") || be(s, `${this.$options.configField}.${e}`, ""), h = be(this.$props, e);
      Array.isArray(h) && (h = h.join(" ")), t.search("{*}") !== -1 ? t = t.replace(/\{\*\}/g, r) : t = t + r;
      let y = null;
      typeof h == "function" ? (y = dr(this), h = h(r, y)) : h = ur(h, r), typeof u == "function" ? u = u(r, y || dr(this)) : u = ur(u, r);
      let b = `${a && !i || !a && !i ? t : ""} ${Pt(u)} ${Pt(h)}`.trim().replace(/\s\s+/g, " ");
      return o && (b = o(b)), n && (b = n(b)), b;
    }
  }
});
const us = {};
function vl(e, t) {
  us[e] = t;
}
function ds() {
  return { oruga: us, addProgrammatic: vl };
}
function hr(e, t = {}) {
  var i;
  const r = {
    401: "Authentication required. Please reload the page and sign in.",
    403: "You do not have permission to perform this action.",
    404: "The page or action you are looking for could not be found.",
    419: "Your session has likely expired. Please reload the page and try again.",
    422: "The action attempted was invalid. Please review your input and try again.",
    500: "An unexpected error has occurred. This issue has been reported.",
    503: "The site is currently under maintenance. Please try again later."
  };
  Object.assign(r, t);
  const s = r[(i = e.response) == null ? void 0 : i.status] || r[500], { oruga: a } = ds();
  if (a.notification.open({
    message: s,
    duration: 2500,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), process.env.NODE_ENV === "test")
    console.error("silent error", e);
  else
    throw e;
}
const Ol = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: e } = await T.post(this.path).catch((t) => {
        if (t.response.status === 401) {
          window.location.href = "/";
          return;
        }
        hr(t);
      }).catch(hr);
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function kl(e, t, r, s, a, i) {
  return F(), J("li", null, [
    Ne(e.$slots, "default", { logout: i.logout }, () => [
      U("button", {
        class: "button is-primary",
        onClick: t[0] || (t[0] = (n) => i.logout())
      }, "Sign out")
    ])
  ]);
}
const Ml = /* @__PURE__ */ $(Ol, [["render", kl]]), Dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ml
}, Symbol.toStringTag, { value: "Module" })), Yl = Rt({
  name: "WyxosProgress",
  props: {
    showValue: {
      type: Boolean,
      default: !0
    },
    value: {
      type: Number,
      required: !0
    },
    max: {
      type: Number,
      required: !0
    },
    format: {
      type: String,
      default: "percent"
    }
  }
}), xl = ["value", "max"], Fl = { key: 0 };
function Tl(e, t, r, s, a, i) {
  return F(), J(gr, null, [
    U("progress", {
      value: e.value,
      max: e.max
    }, null, 8, xl),
    e.showValue ? (F(), J("span", Fl, I(e.value) + " / " + I(e.max), 1)) : ye("", !0)
  ], 64);
}
const Pl = /* @__PURE__ */ $(Yl, [["render", Tl]]), Nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pl
}, Symbol.toStringTag, { value: "Module" })), Wl = {
  name: "WyxosPrompt",
  props: {
    title: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    confirmText: {
      type: String,
      default: null
    },
    cancelText: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: !1
    },
    callback: {
      type: Function,
      default: null
    }
  },
  emits: ["close"],
  setup() {
    return {
      state: new L()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Rl = { class: "button-group" };
function Cl(e, t, r, s, a, i) {
  const n = j("wyxos-button"), o = j("o-modal");
  return F(), pe(o, { active: !0 }, {
    default: H(() => [
      U("h2", null, I(r.title), 1),
      U("p", null, I(r.message), 1),
      U("div", Rl, [
        ge(n, {
          disabled: s.state.isLoading,
          "native-type": "button",
          onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
        }, {
          default: H(() => [
            ke(I(r.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        ge(n, {
          loading: s.state.isLoading,
          "native-type": "button",
          onClick: t[1] || (t[1] = (u) => i.proceed())
        }, {
          default: H(() => [
            ke(I(r.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const Ll = /* @__PURE__ */ $(Wl, [["render", Cl]]), Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ll
}, Symbol.toStringTag, { value: "Module" })), El = {
  name: "WyxosSelect",
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    modelValue: {
      type: [null, String, Number],
      required: !0
    },
    form: {
      type: pt,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  },
  emits: ["update:modelValue"],
  methods: {
    updateValue(e) {
      var t;
      (t = this.form) == null || t.clearError(this.name), this.$emit("update:modelValue", e);
    }
  }
}, jl = ["value"];
function Ul(e, t, r, s, a, i) {
  var u;
  const n = j("o-select"), o = j("o-field");
  return F(), pe(o, je({ label: r.label }, (u = r.form) == null ? void 0 : u.getError(r.name)), {
    default: H(() => [
      ge(n, {
        disabled: r.disabled,
        "model-value": r.modelValue,
        name: r.name,
        placeholder: r.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (h) => i.updateValue(h))
      }, {
        default: H(() => [
          Ne(e.$slots, "default", {}, () => [
            r.items ? (F(!0), J(gr, { key: 0 }, Fs(r.items, (h) => (F(), J("option", {
              key: h.value,
              value: h.value
            }, I(h.label), 9, jl))), 128)) : ye("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Al = /* @__PURE__ */ $(El, [["render", Ul]]), $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Al
}, Symbol.toStringTag, { value: "Module" }));
class tr {
  constructor(t = {}) {
    _(this, "state", new L());
    _(this, "result", Ue([]));
    _(this, "value", Ue(null));
    _(this, "timeout", null);
    _(this, "options", {
      url: null,
      payload: null,
      field: null
    });
    Object.assign(this.options, t);
  }
  get getConfig() {
    return {
      data: this.result.value,
      field: this.options.field,
      modelValue: this.value.value
    };
  }
  static create(t) {
    return new tr(t);
  }
  getEvents({ searchPayloadFormatter: t = null } = {}) {
    return {
      "update:model-value": (r) => (this.value.value = r, this.search(t))
    };
  }
  search(t) {
    const r = { value: this.value.value }, s = t ? t(r) : r;
    return this.customSearch({ payload: s });
  }
  async customSearch({ url: t, payload: r }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)), this.controller = new AbortController(), this.timeout = setTimeout(async () => {
      this.state.loading(), this.reset();
      const s = t || this.options.url, { data: a } = await T.post(`${s}/search`, r || this.options.payload, {
        signal: this.controller.signal
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = a.result, this.state.loaded();
    }, 500);
  }
  async restore(t, r) {
    this.state.loading(), this.reset();
    const s = t || this.options.url, { data: a } = await T.post(`${s}/restore`, r || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), a;
  }
  reset() {
    this.result.value = [];
  }
}
const Vl = {
  name: "WyxosTags",
  props: {
    path: {
      type: String,
      required: !0
    },
    modelValue: {
      type: Array,
      required: !0
    },
    formatter: {
      type: Function,
      required: !0
    },
    excludeFormatter: {
      type: Function,
      default: null
    },
    restoreFormatter: {
      type: Function,
      default: (e) => e
    },
    payloadFormatter: {
      type: Function,
      default: (e) => e
    }
  },
  emits: ["update:modelValue", "update:query"],
  setup() {
    return {
      search: tr.create()
    };
  },
  data() {
    return {
      query: [],
      isInternalChange: !1
    };
  },
  watch: {
    modelValue: {
      handler: async function(e, t) {
        this.isInternalChange ? this.isInternalChange = !1 : JSON.stringify(e) !== JSON.stringify(t) && this.restore();
      },
      deep: !0,
      immediate: !1
    }
  },
  async mounted() {
    this.restore();
  },
  methods: {
    async restore() {
      if (this.modelValue && this.modelValue.length) {
        this.isInternalChange = !0;
        const { result: e } = await this.search.restore(
          this.path,
          this.restoreFormatter({
            values: this.modelValue
          })
        );
        this.query = e, this.$emit(
          "update:modelValue",
          this.query.map((t) => this.formatter(t))
        ), this.$emit("update:query", this.query);
      }
    },
    searchTags(e) {
      return this.search.customSearch({
        url: this.path,
        payload: this.payloadFormatter({
          value: e,
          exclude: this.query.map((t) => this.excludeFormatter(t)).filter(Boolean)
        })
      });
    },
    addedTag() {
      this.isInternalChange = !0;
      const e = this.query.map((t) => this.formatter(t));
      this.$emit("update:modelValue", e), this.$emit("update:query", this.query);
    },
    removedTag() {
      this.isInternalChange = !0;
      const e = this.query.map((t) => this.formatter(t));
      this.$emit("update:modelValue", e), this.$emit("update:query", this.query);
    },
    reset() {
      this.isInternalChange = !0, this.query = [], this.$emit("update:modelValue", this.query), this.$emit("update:query", this.query);
    },
    addItem() {
      this.$refs.tagInput.addItem();
    }
  }
};
function ql(e, t, r, s, a, i) {
  const n = j("o-inputitems");
  return F(), pe(n, je({
    ref: "tagInput",
    modelValue: a.query,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => a.query = o),
    data: s.search.result.value,
    "allow-autocomplete": ""
  }, e.$attrs, {
    onAdd: t[1] || (t[1] = (o) => i.addedTag(o)),
    onRemove: t[2] || (t[2] = (o) => i.removedTag(o)),
    onTyping: t[3] || (t[3] = (o) => i.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const Hl = /* @__PURE__ */ $(Vl, [["render", ql]]), Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hl
}, Symbol.toStringTag, { value: "Module" }));
class zl {
  constructor() {
    _(this, "attributes", E({
      user: null
    }));
    _(this, "state", new L());
    return new Proxy(this, {
      get(t, r, s) {
        return Reflect.has(t, r) ? Reflect.get(t, r, s) : r in t.attributes ? t.attributes[r] : null;
      },
      set(t, r, s, a) {
        return Reflect.has(t, r) ? Reflect.set(t, r, s, a) : r in t.attributes ? (t.attributes[r] = s, !0) : null;
      }
    });
  }
  get isLoading() {
    return this.state.isLoading;
  }
  get isLoaded() {
    return this.state.isLoaded;
  }
  get isFailure() {
    return this.state.isFailure;
  }
  get isAuthenticated() {
    return !!this.attributes.user;
  }
  async load() {
    this.state.loading(), await T.get("/sanctum/csrf-cookie").catch((r) => {
      throw this.state.failed(), r;
    });
    const { data: t } = await T.get("/api/user");
    if (!("user" in t))
      throw Error("Instance of user is not defined.");
    Object.keys(t).forEach((r) => {
      this.attributes[r] = t[r];
    }), this.state.loaded();
  }
  getUser() {
    return this.attributes.user;
  }
  reset() {
    this.attributes = E({
      user: null
    });
  }
}
const du = new zl(), Bl = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Jl {
  constructor() {
    _(this, "FORMATS", Bl);
  }
  format(t, r, s = "") {
    return t ? d(t).format(r) : s;
  }
}
const hu = new Jl();
class cu {
  constructor(t) {
    this.data = new FormData(), this.form = t, this.copy = Object.assign({}, JSON.parse(JSON.stringify(t)));
  }
  static build(t, r) {
    return new this(t).files(r).get();
  }
  static callback(t) {
    return (r) => this.build(r, t).get();
  }
  files(t) {
    return t.forEach((r) => {
      typeof r == "object" ? (this.data.append(r.name, r.value), delete this.copy[r.name]) : this.form[r] && (this.data.append(r, this.form[r]), delete this.copy[r]);
    }), this;
  }
  add(t, r) {
    return this.data.append(t, r), this;
  }
  get() {
    return this.data.append("payload", JSON.stringify(this.copy)), this.data;
  }
}
const hs = "%[a-f0-9]{2}", cr = new RegExp("(" + hs + ")|([^%]+?)", "gi"), fr = new RegExp("(" + hs + ")+", "gi");
function Nt(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  t = t || 1;
  const r = e.slice(0, t), s = e.slice(t);
  return Array.prototype.concat.call([], Nt(r), Nt(s));
}
function Zl(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(cr) || [];
    for (let r = 1; r < t.length; r++)
      e = Nt(t, r).join(""), t = e.match(cr) || [];
    return e;
  }
}
function Ql(e) {
  const t = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let r = fr.exec(e);
  for (; r; ) {
    try {
      t[r[0]] = decodeURIComponent(r[0]);
    } catch {
      const a = Zl(r[0]);
      a !== r[0] && (t[r[0]] = a);
    }
    r = fr.exec(e);
  }
  t["%C2"] = "�";
  const s = Object.keys(t);
  for (const a of s)
    e = e.replace(new RegExp(a, "g"), t[a]);
  return e;
}
function Kl(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return Ql(e);
  }
}
function cs(e, t) {
  if (!(typeof e == "string" && typeof t == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (e === "" || t === "")
    return [];
  const r = e.indexOf(t);
  return r === -1 ? [] : [
    e.slice(0, r),
    e.slice(r + t.length)
  ];
}
function Xl(e, t) {
  const r = {};
  if (Array.isArray(t))
    for (const s of t) {
      const a = Object.getOwnPropertyDescriptor(e, s);
      a != null && a.enumerable && Object.defineProperty(r, s, a);
    }
  else
    for (const s of Reflect.ownKeys(e)) {
      const a = Object.getOwnPropertyDescriptor(e, s);
      if (a.enumerable) {
        const i = e[s];
        t(s, i, e) && Object.defineProperty(r, s, a);
      }
    }
  return r;
}
const eu = (e) => e == null, tu = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), Wt = Symbol("encodeFragmentIdentifier");
function ru(e) {
  switch (e.arrayFormat) {
    case "index":
      return (t) => (r, s) => {
        const a = r.length;
        return s === void 0 || e.skipNull && s === null || e.skipEmptyString && s === "" ? r : s === null ? [
          ...r,
          [Y(t, e), "[", a, "]"].join("")
        ] : [
          ...r,
          [Y(t, e), "[", Y(a, e), "]=", Y(s, e)].join("")
        ];
      };
    case "bracket":
      return (t) => (r, s) => s === void 0 || e.skipNull && s === null || e.skipEmptyString && s === "" ? r : s === null ? [
        ...r,
        [Y(t, e), "[]"].join("")
      ] : [
        ...r,
        [Y(t, e), "[]=", Y(s, e)].join("")
      ];
    case "colon-list-separator":
      return (t) => (r, s) => s === void 0 || e.skipNull && s === null || e.skipEmptyString && s === "" ? r : s === null ? [
        ...r,
        [Y(t, e), ":list="].join("")
      ] : [
        ...r,
        [Y(t, e), ":list=", Y(s, e)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (r) => (s, a) => a === void 0 || e.skipNull && a === null || e.skipEmptyString && a === "" ? s : (a = a === null ? "" : a, s.length === 0 ? [[Y(r, e), t, Y(a, e)].join("")] : [[s, Y(a, e)].join(e.arrayFormatSeparator)]);
    }
    default:
      return (t) => (r, s) => s === void 0 || e.skipNull && s === null || e.skipEmptyString && s === "" ? r : s === null ? [
        ...r,
        Y(t, e)
      ] : [
        ...r,
        [Y(t, e), "=", Y(s, e)].join("")
      ];
  }
}
function su(e) {
  let t;
  switch (e.arrayFormat) {
    case "index":
      return (r, s, a) => {
        if (t = /\[(\d*)]$/.exec(r), r = r.replace(/\[\d*]$/, ""), !t) {
          a[r] = s;
          return;
        }
        a[r] === void 0 && (a[r] = {}), a[r][t[1]] = s;
      };
    case "bracket":
      return (r, s, a) => {
        if (t = /(\[])$/.exec(r), r = r.replace(/\[]$/, ""), !t) {
          a[r] = s;
          return;
        }
        if (a[r] === void 0) {
          a[r] = [s];
          return;
        }
        a[r] = [...a[r], s];
      };
    case "colon-list-separator":
      return (r, s, a) => {
        if (t = /(:list)$/.exec(r), r = r.replace(/:list$/, ""), !t) {
          a[r] = s;
          return;
        }
        if (a[r] === void 0) {
          a[r] = [s];
          return;
        }
        a[r] = [...a[r], s];
      };
    case "comma":
    case "separator":
      return (r, s, a) => {
        const i = typeof s == "string" && s.includes(e.arrayFormatSeparator), n = typeof s == "string" && !i && ie(s, e).includes(e.arrayFormatSeparator);
        s = n ? ie(s, e) : s;
        const o = i || n ? s.split(e.arrayFormatSeparator).map((u) => ie(u, e)) : s === null ? s : ie(s, e);
        a[r] = o;
      };
    case "bracket-separator":
      return (r, s, a) => {
        const i = /(\[])$/.test(r);
        if (r = r.replace(/\[]$/, ""), !i) {
          a[r] = s && ie(s, e);
          return;
        }
        const n = s === null ? [] : s.split(e.arrayFormatSeparator).map((o) => ie(o, e));
        if (a[r] === void 0) {
          a[r] = n;
          return;
        }
        a[r] = [...a[r], ...n];
      };
    default:
      return (r, s, a) => {
        if (a[r] === void 0) {
          a[r] = s;
          return;
        }
        a[r] = [...[a[r]].flat(), s];
      };
  }
}
function fs(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function Y(e, t) {
  return t.encode ? t.strict ? tu(e) : encodeURIComponent(e) : e;
}
function ie(e, t) {
  return t.decode ? Kl(e) : e;
}
function ms(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? ms(Object.keys(e)).sort((t, r) => Number(t) - Number(r)).map((t) => e[t]) : e;
}
function ys(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function au(e) {
  let t = "";
  const r = e.indexOf("#");
  return r !== -1 && (t = e.slice(r)), t;
}
function mr(e, t) {
  return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function rr(e) {
  e = ys(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function sr(e, t) {
  t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...t
  }, fs(t.arrayFormatSeparator);
  const r = su(t), s = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return s;
  for (const a of e.split("&")) {
    if (a === "")
      continue;
    const i = t.decode ? a.replace(/\+/g, " ") : a;
    let [n, o] = cs(i, "=");
    n === void 0 && (n = i), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? o : ie(o, t), r(ie(n, t), o, s);
  }
  for (const [a, i] of Object.entries(s))
    if (typeof i == "object" && i !== null)
      for (const [n, o] of Object.entries(i))
        i[n] = mr(o, t);
    else
      s[a] = mr(i, t);
  return t.sort === !1 ? s : (t.sort === !0 ? Object.keys(s).sort() : Object.keys(s).sort(t.sort)).reduce((a, i) => {
    const n = s[i];
    return n && typeof n == "object" && !Array.isArray(n) ? a[i] = ms(n) : a[i] = n, a;
  }, /* @__PURE__ */ Object.create(null));
}
function _s(e, t) {
  if (!e)
    return "";
  t = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...t
  }, fs(t.arrayFormatSeparator);
  const r = (n) => t.skipNull && eu(e[n]) || t.skipEmptyString && e[n] === "", s = ru(t), a = {};
  for (const [n, o] of Object.entries(e))
    r(n) || (a[n] = o);
  const i = Object.keys(a);
  return t.sort !== !1 && i.sort(t.sort), i.map((n) => {
    const o = e[n];
    return o === void 0 ? "" : o === null ? Y(n, t) : Array.isArray(o) ? o.length === 0 && t.arrayFormat === "bracket-separator" ? Y(n, t) + "[]" : o.reduce(s(n), []).join("&") : Y(n, t) + "=" + Y(o, t);
  }).filter((n) => n.length > 0).join("&");
}
function gs(e, t) {
  var a;
  t = {
    decode: !0,
    ...t
  };
  let [r, s] = cs(e, "#");
  return r === void 0 && (r = e), {
    url: ((a = r == null ? void 0 : r.split("?")) == null ? void 0 : a[0]) ?? "",
    query: sr(rr(e), t),
    ...t && t.parseFragmentIdentifier && s ? { fragmentIdentifier: ie(s, t) } : {}
  };
}
function ps(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [Wt]: !0,
    ...t
  };
  const r = ys(e.url).split("?")[0] || "", s = rr(e.url), a = {
    ...sr(s, { sort: !1 }),
    ...e.query
  };
  let i = _s(a, t);
  i && (i = `?${i}`);
  let n = au(e.url);
  if (e.fragmentIdentifier) {
    const o = new URL(r);
    o.hash = e.fragmentIdentifier, n = t[Wt] ? o.hash : `#${e.fragmentIdentifier}`;
  }
  return `${r}${i}${n}`;
}
function ws(e, t, r) {
  r = {
    parseFragmentIdentifier: !0,
    [Wt]: !1,
    ...r
  };
  const { url: s, query: a, fragmentIdentifier: i } = gs(e, r);
  return ps({
    url: s,
    query: Xl(a, t),
    fragmentIdentifier: i
  }, r);
}
function iu(e, t, r) {
  const s = Array.isArray(t) ? (a) => !t.includes(a) : (a, i) => !t(a, i);
  return ws(e, s, r);
}
const yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: iu,
  extract: rr,
  parse: sr,
  parseUrl: gs,
  pick: ws,
  stringify: _s,
  stringifyUrl: ps
}, Symbol.toStringTag, { value: "Module" }));
let ce;
class Ss {
  constructor() {
    _(this, "api", null);
    _(this, "baseUrl", null);
    _(this, "structure", null);
    _(this, "options", null);
    _(this, "errors", null);
    _(this, "errorBag", "default");
    _(this, "states", {
      load: L.create(),
      fetch: L.create(),
      filter: L.create()
    });
    _(this, "query", E({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    _(this, "params", E({
      page: 1
    }));
    _(this, "state", E({
      isFilterActive: !1
    }));
  }
  get config() {
    return {
      data: this.query.items,
      total: this.query.total,
      currentPage: this.params.page,
      perPage: this.query.perPage,
      loading: this.isLoading,
      paginated: !0,
      backendPagination: !0,
      striped: !0
    };
  }
  get events() {
    return {
      pageChange: (t) => this.onPageChange(t)
    };
  }
  get isLoading() {
    return this.states.fetch.isLoading;
  }
  get isLoaded() {
    return this.states.fetch.isLoaded;
  }
  get isFailure() {
    return this.states.fetch.isFailure;
  }
  get isFilterLoading() {
    return this.states.filter.isLoading;
  }
  get isFilterActive() {
    return this.state.isFilterActive;
  }
  static create(t, r) {
    if (!r)
      throw Error("Listing options have not been provided.");
    const s = new Ss();
    if (!t)
      throw Error("Structure of search query required.");
    return s.errors = qe(), s.errors.createBag(this.errorBag), s.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (a) => a
      },
      r
    ), s.setParameters(t), s.options.enableSearchUpdate && s.mergeSearch(), s.baseUrl = r.baseUrl, s.api = T.create(r.axios || {}), s;
  }
  setParameters(t) {
    const r = JSON.parse(JSON.stringify(t));
    this.structure = Object.assign({}, r), this.params = E(t);
  }
  mergeSearch() {
    const t = yr.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    t.page && (t.page = Number(t.page)), Object.assign(this.params, this.structure, t);
  }
  async fetch(t, r) {
    this.states.fetch.loading();
    const s = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl;
    try {
      const { data: i } = await this.api.get(a, {
        params: s,
        cancelToken: r
      });
      return this.states.fetch.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), i;
    } catch {
      this.states.fetch.failed();
    }
  }
  async reload(t) {
    const { data: r } = await this.api.get(t || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.params))
    });
    return Object.assign(this.query, r.query, {
      items: r.query.items.map((s) => this.transformItem(s))
    }), r;
  }
  refreshUrl() {
    const t = window.location.href.replace(/\?.*/, ""), r = JSON.parse(JSON.stringify(this.params)), s = Object.fromEntries(
      Object.entries(r).filter(([i, n]) => n != null)
    ), a = t + "?" + yr.stringify(s, { arrayFormat: "bracket" });
    window.history.pushState({}, "", a);
  }
  push(t) {
    this.query.items.push(this.transformItem(t));
  }
  transformItem(t) {
    return this.options.transformItem({
      ...t,
      states: {
        delete: new L(),
        patch: new L()
      }
    });
  }
  async load(t) {
    this.errors.clear(null, this.errorBag), ce && ce.cancel(), ce = T.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let r = null;
    try {
      this.states.fetch.loading();
      const s = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl, i = await this.api.get(a, {
        params: s,
        cancelToken: ce.token
      }).catch((n) => {
        throw this.states.fetch.failed(), n;
      });
      if (this.states.fetch.loaded(), r = i.data, this.states.fetch.loaded(), !r || !r.query || !r.query.items)
        throw this.states.fetch.failed(), Error("Response format is invalid.");
      return Object.assign(this.query, r.query, {
        items: r.query.items.map((n) => this.transformItem(n))
      }), r;
    } catch (s) {
      if (T.isCancel(s))
        this.states.fetch.loaded(), console.error("Request cancelled");
      else
        throw this.states.fetch.failed(), this.errors.set(s, this.errorBag), s;
    }
  }
  onPageChange(t) {
    return this.params.page = t, this.load();
  }
  async patch({ path: t, props: r, payload: s } = {}) {
    const { row: a } = r;
    s = {
      id: a.id,
      ...s
    };
    const { data: i } = await this.api.patch(t || this.baseUrl, s).catch((o) => {
      throw o;
    });
    return i.patch && Object.assign(a, i.patch), (await this.fetch()).query.items.length || (this.params.page--, await this.load()), i;
  }
  async delete(t) {
    return this.processRowAndRefreshList({
      ...t,
      method: "delete",
      state: "delete"
    });
  }
  async restore(t) {
    return this.processRowAndRefreshList({
      ...t,
      method: "patch",
      state: "restore"
    });
  }
  async processRowAndRefreshList({ path: t, props: r, payload: s, state: a, method: i } = {}) {
    const { row: n, index: o } = r;
    s = {
      id: n.id,
      ...s
    };
    let u = n.states[a];
    u || (u = n.states[a] = L.create()), u.loading();
    const { data: h } = await this.api[i](
      t || this.baseUrl,
      s
    ).catch((b) => {
      throw u.failed(), b;
    });
    u.loaded(), h.row && Object.assign(n, h.row);
    const y = await this.fetch();
    if (this.query.items.splice(o, 1), !y.query.items.length)
      return this.params.page--, await this.load(), h;
    if (this.query.items.length < y.query.items.length) {
      const b = y.query.items[y.query.items.length - 1];
      this.push(b);
    }
    return h;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), ce && ce.cancel(), this.states.filter.loading(), this.states.load.loading(), ce = T.CancelToken.source(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let t = null;
    try {
      const r = JSON.parse(JSON.stringify(this.params)), s = this.baseUrl;
      t = (await this.api.get(s, {
        params: r,
        cancelToken: ce.token
      }).catch((i) => {
        throw this.states.filter.failed(), i;
      })).data;
    } catch (r) {
      if (T.isCancel(r)) {
        console.error("Request cancelled");
        return;
      } else
        throw this.states.filter.failed(), this.states.load.failed(), this.errors.set(r, this.errorBag), r;
    }
    if (this.refreshUrl(), !t || !t.query || !t.query.items)
      throw this.states.filter.failed(), Error("Response format is invalid.");
    Object.assign(this.query, t.query, {
      items: t.query.items.map((r) => this.transformItem(r))
    }), this.states.filter.loaded(), this.states.load.loaded(), this.state.isFilterActive = !1;
  }
  showFilter() {
    this.state.isFilterActive = !0;
  }
  cancelFilter() {
    this.state.isFilterActive = !1;
  }
  async resetFilter(t = "url", r = null) {
    t === "url" ? this.mergeSearch() : t === "initial" && (Object.assign(this.params, this.structure), this.refreshUrl()), this.state.isFilterActive = !1, await this.load(r);
  }
  getError(t) {
    return this.errors.get(t, this.errorBag);
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag);
  }
  get isResettable() {
    return JSON.stringify(this.params) !== JSON.stringify(this.structure);
  }
}
class bs {
  constructor() {
    _(this, "state", Ue(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new bs();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class fu {
  static create(t, r = null, s = null) {
    return r = r || t, {
      value: t,
      label: r
    };
  }
}
class mu {
  constructor() {
    _(this, "structure", {});
    _(this, "query", E({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    _(this, "params", E({
      page: 1
    }));
    _(this, "router", null);
  }
  static create(t, r = {}, s = {}, a) {
    s = Object.assign(
      { base: "/api/admin", route: `${t}.index` },
      s
    );
    const i = s.base, n = {
      route: s.route,
      index: s.index || `${i}/${t}/index`,
      destroy: `${i}/${t}/destroy`
    }, o = new this();
    return o.options = s, o.structure = r, o.params = Object.assign(o.params, r), o.router = a, o.urls = n, o;
  }
  async fetch(t) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: r } = await T.get(t || this.urls.index, {
      params: this.params
    }).catch((s) => {
      throw this.query.isLoading = !1, s;
    });
    return await this.router.push({ name: this.urls.route, query: this.params }), this.query.isLoading = !1, this.query.isLoaded = !0, r;
  }
  async load(t) {
    const r = await this.fetch(t);
    return Object.assign(this.query, r.query, {
      items: r.query.items.map((s) => ({
        ...s,
        isProcessing: !1
      }))
    }), r;
  }
  onPageChange(t) {
    return this.params.page = t, this.load();
  }
  async action(t, { row: r, index: s, remove: a, method: i }, n = {}) {
    r.isProcessing = !0;
    const o = {
      id: r.id,
      ...n
    };
    if (i === "delete") {
      const { data: u } = await T.delete(t, {
        data: o
      }).catch((h) => {
        throw r.isProcessing = !1, h;
      });
      r.isProcessing = !1, u.row && Object.assign(r, u.row);
    } else {
      const { data: u } = await T.post(t, o).catch((h) => {
        throw r.isProcessing = !1, h;
      });
      r.isProcessing = !1, u.row && Object.assign(r, u.row);
    }
    if (a) {
      const u = await this.fetch();
      if (this.query.items.splice(s, 1), !u.query.items.length) {
        this.params.page--, await this.load();
        return;
      }
      this.query.items.length < u.query.items.length && this.query.items.push(u.query.items[u.query.items.length - 1]);
    }
  }
  destroy(t, r) {
    return this.action(this.urls.destroy, { ...t, remove: !0 }, r);
  }
  async resetFilter(t = null) {
    Object.assign(this.params, this.structure), this.query.isFilterActive = !1, await this.load(t);
  }
}
class yu {
  constructor(t) {
    _(this, "current", Ue(null));
    _(this, "history", Ue([]));
    _(this, "flow", []);
    this.current.value = t;
  }
  is(t) {
    return this.current.value === t;
  }
  isAny(...t) {
    return !!t.includes(this.current.value);
  }
  setFlow(t) {
    this.flow = t;
  }
  next() {
    const t = this.flow.findIndex((s) => s === this.getCurrent()), r = this.flow[t + 1];
    if (r) {
      this.set(r);
      return;
    }
    throw Error(`No step defined after ${this.getCurrent()}`);
  }
  set(t) {
    this.current.value = t, this.history.value.push(t);
  }
  previous() {
    this.history.value.pop(), this.current.value = this.history.value[this.history.value.length - 1];
  }
  getCurrent() {
    return this.current.value;
  }
  assign(t) {
    Object.assign(this, t);
  }
}
function _u(e) {
  const { oruga: t } = ds();
  t.notification.open({
    message: e || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class vs {
  constructor(t) {
    _(this, "attributes", E({
      name: null
    }));
    _(this, "callbacks", {});
    this.attributes.name = t;
  }
  is(t) {
    return this.attributes.name === t;
  }
  onChange(t) {
    this.callbacks = t;
  }
  activeClass(t, r) {
    return {
      class: this.is(t) ? r : []
    };
  }
  set(t) {
    this.attributes.name = t, this.callbacks[t] && this.callbacks[t]();
  }
  assign(t) {
    Object.assign(this, t);
  }
  static create(t) {
    return new vs(t);
  }
}
const Ot = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Rs, "./components/WyxosCollection.vue": js, "./components/WyxosConfirm.vue": zs, "./components/WyxosDatepicker.vue": Xo, "./components/WyxosError.vue": il, "./components/WyxosForm.vue": ul, "./components/WyxosImage.vue": ml, "./components/WyxosInput.vue": pl, "./components/WyxosLogout.vue": Dl, "./components/WyxosProgress.vue": Nl, "./components/WyxosPrompt.vue": Il, "./components/WyxosSelect.vue": $l, "./components/WyxosTags.vue": Gl }), Os = {}, nu = (e) => {
  Object.keys(Ot).forEach((t) => {
    const r = Ot[t].default.name, s = Ot[t].default;
    e.component(r, s), e.component(r.replace("Wyxos", "W"), s), Os[r] = s;
  });
}, gu = {
  install: nu,
  ...Os
};
export {
  cu as FileRequest,
  pt as FormBuilder,
  Ss as Listing,
  L as LoadState,
  bs as Modal,
  fu as Option,
  mu as ResourceList,
  tr as Search,
  yu as Steps,
  vs as Tab,
  Ws as WyxosButton,
  Es as WyxosCollection,
  Gs as WyxosConfirm,
  Ko as WyxosDatepicker,
  al as WyxosError,
  ll as WyxosForm,
  fl as WyxosImage,
  gl as WyxosInput,
  Ml as WyxosLogout,
  Pl as WyxosProgress,
  Ll as WyxosPrompt,
  Al as WyxosSelect,
  Hl as WyxosTags,
  du as auth,
  hu as dateRender,
  gu as default,
  hr as errorHandler,
  _u as success,
  qe as useFormErrors
};
