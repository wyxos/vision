var pa = Object.defineProperty;
var _a = (e, t, r) => t in e ? pa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var v = (e, t, r) => (_a(e, typeof t != "symbol" ? t + "" : t, r), r);
import { resolveComponent as U, openBlock as A, createBlock as De, withCtx as G, renderSlot as ze, createCommentVNode as je, createTextVNode as Re, toDisplayString as ie, createElementBlock as Ee, normalizeProps as ga, guardReactiveProps as wa, createElementVNode as H, reactive as z, createVNode as Oe, normalizeClass as va, mergeProps as ot, withModifiers as Sa, defineComponent as ba, Fragment as Oa, renderList as Da, ref as _r } from "vue";
const se = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [s, n] of t)
    r[s] = n;
  return r;
}, ka = {
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
}, Ma = /* @__PURE__ */ Re("Submit"), xa = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Ta(e, t, r, s, n, a) {
  const i = U("o-button");
  return A(), De(i, { disabled: r.loading }, {
    default: G(() => [
      r.loading ? je("", !0) : ze(e.$slots, "default", { key: 0 }, () => [
        Ma
      ]),
      r.loading && r.text ? ze(e.$slots, "loading", { key: 1 }, () => [
        Re(ie(r.text), 1)
      ]) : je("", !0),
      r.loading ? (A(), Ee("i", xa)) : je("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const Ya = /* @__PURE__ */ se(ka, [["render", Ta]]), Ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ya
}, Symbol.toStringTag, { value: "Module" })), Ea = {
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
}, Fa = /* @__PURE__ */ H("ul", null, [
  /* @__PURE__ */ H("li")
], -1);
function Pa(e, t, r, s, n, a) {
  return ze(e.$slots, "default", ga(wa({ add: a.add, remove: a.remove, items: n.items })), () => [
    Fa
  ]);
}
const Na = /* @__PURE__ */ se(Ea, [["render", Pa]]), Ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Na
}, Symbol.toStringTag, { value: "Module" }));
class W {
  constructor() {
    v(this, "state", z({
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
    return new W();
  }
}
const Aa = {
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
      state: new W()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, La = { class: "bg-white p-6" }, Wa = { class: "title" }, Ua = { class: "mb-6" }, Ia = {
  class: "buttons",
  role: "group"
};
function $a(e, t, r, s, n, a) {
  const i = U("wyxos-button"), o = U("o-modal");
  return A(), De(o, {
    active: !0,
    onClose: t[2] || (t[2] = (l) => e.$emit("close", { action: !1 }))
  }, {
    default: G(() => [
      H("section", La, [
        H("article", null, [
          H("header", null, [
            H("h3", Wa, ie(r.title), 1)
          ]),
          H("p", Ua, ie(r.message), 1),
          H("footer", Ia, [
            Oe(i, {
              disabled: s.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (l) => e.$emit("close", { action: !1 }))
            }, {
              default: G(() => [
                Re(ie(r.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            Oe(i, {
              class: va([{ [r.confirmType]: !0 }, "button"]),
              loading: s.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (l) => a.proceed())
            }, {
              default: G(() => [
                Re(ie(r.confirmText), 1)
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
const ja = /* @__PURE__ */ se(Aa, [["render", $a]]), qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ja
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Bs;
function f() {
  return Bs.apply(null, arguments);
}
function Va(e) {
  Bs = e;
}
function te(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Ye(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function b(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Yr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (b(e, t))
      return !1;
  return !0;
}
function L(e) {
  return e === void 0;
}
function pe(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function ct(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function zs(e, t) {
  var r = [], s, n = e.length;
  for (s = 0; s < n; ++s)
    r.push(t(e[s], s));
  return r;
}
function ve(e, t) {
  for (var r in t)
    b(t, r) && (e[r] = t[r]);
  return b(t, "toString") && (e.toString = t.toString), b(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function le(e, t, r, s) {
  return gn(e, t, r, s, !0).utc();
}
function Ha() {
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
function g(e) {
  return e._pf == null && (e._pf = Ha()), e._pf;
}
var gr;
Array.prototype.some ? gr = Array.prototype.some : gr = function(e) {
  var t = Object(this), r = t.length >>> 0, s;
  for (s = 0; s < r; s++)
    if (s in t && e.call(this, t[s], s, t))
      return !0;
  return !1;
};
function Rr(e) {
  if (e._isValid == null) {
    var t = g(e), r = gr.call(t.parsedDateParts, function(n) {
      return n != null;
    }), s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (s = s && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = s;
    else
      return s;
  }
  return e._isValid;
}
function Et(e) {
  var t = le(NaN);
  return e != null ? ve(g(t), e) : g(t).userInvalidated = !0, t;
}
var fs = f.momentProperties = [], Xt = !1;
function Er(e, t) {
  var r, s, n, a = fs.length;
  if (L(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), L(t._i) || (e._i = t._i), L(t._f) || (e._f = t._f), L(t._l) || (e._l = t._l), L(t._strict) || (e._strict = t._strict), L(t._tzm) || (e._tzm = t._tzm), L(t._isUTC) || (e._isUTC = t._isUTC), L(t._offset) || (e._offset = t._offset), L(t._pf) || (e._pf = g(t)), L(t._locale) || (e._locale = t._locale), a > 0)
    for (r = 0; r < a; r++)
      s = fs[r], n = t[s], L(n) || (e[s] = n);
  return e;
}
function ht(e) {
  Er(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), Xt === !1 && (Xt = !0, f.updateOffset(this), Xt = !1);
}
function re(e) {
  return e instanceof ht || e != null && e._isAMomentObject != null;
}
function Gs(e) {
  f.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Z(e, t) {
  var r = !0;
  return ve(function() {
    if (f.deprecationHandler != null && f.deprecationHandler(null, e), r) {
      var s = [], n, a, i, o = arguments.length;
      for (a = 0; a < o; a++) {
        if (n = "", typeof arguments[a] == "object") {
          n += `
[` + a + "] ";
          for (i in arguments[0])
            b(arguments[0], i) && (n += i + ": " + arguments[0][i] + ", ");
          n = n.slice(0, -2);
        } else
          n = arguments[a];
        s.push(n);
      }
      Gs(
        e + `
Arguments: ` + Array.prototype.slice.call(s).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var cs = {};
function Js(e, t) {
  f.deprecationHandler != null && f.deprecationHandler(e, t), cs[e] || (Gs(t), cs[e] = !0);
}
f.suppressDeprecationWarnings = !1;
f.deprecationHandler = null;
function ue(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Ba(e) {
  var t, r;
  for (r in e)
    b(e, r) && (t = e[r], ue(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function wr(e, t) {
  var r = ve({}, e), s;
  for (s in t)
    b(t, s) && (Ye(e[s]) && Ye(t[s]) ? (r[s] = {}, ve(r[s], e[s]), ve(r[s], t[s])) : t[s] != null ? r[s] = t[s] : delete r[s]);
  for (s in e)
    b(e, s) && !b(t, s) && Ye(e[s]) && (r[s] = ve({}, r[s]));
  return r;
}
function Fr(e) {
  e != null && this.set(e);
}
var vr;
Object.keys ? vr = Object.keys : vr = function(e) {
  var t, r = [];
  for (t in e)
    b(e, t) && r.push(t);
  return r;
};
var za = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Ga(e, t, r) {
  var s = this._calendar[e] || this._calendar.sameElse;
  return ue(s) ? s.call(t, r) : s;
}
function oe(e, t, r) {
  var s = "" + Math.abs(e), n = t - s.length, a = e >= 0;
  return (a ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, n)).toString().substr(1) + s;
}
var Pr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, pt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Kt = {}, qe = {};
function y(e, t, r, s) {
  var n = s;
  typeof s == "string" && (n = function() {
    return this[s]();
  }), e && (qe[e] = n), t && (qe[t[0]] = function() {
    return oe(n.apply(this, arguments), t[1], t[2]);
  }), r && (qe[r] = function() {
    return this.localeData().ordinal(
      n.apply(this, arguments),
      e
    );
  });
}
function Ja(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Za(e) {
  var t = e.match(Pr), r, s;
  for (r = 0, s = t.length; r < s; r++)
    qe[t[r]] ? t[r] = qe[t[r]] : t[r] = Ja(t[r]);
  return function(n) {
    var a = "", i;
    for (i = 0; i < s; i++)
      a += ue(t[i]) ? t[i].call(n, e) : t[i];
    return a;
  };
}
function wt(e, t) {
  return e.isValid() ? (t = Zs(t, e.localeData()), Kt[t] = Kt[t] || Za(t), Kt[t](e)) : e.localeData().invalidDate();
}
function Zs(e, t) {
  var r = 5;
  function s(n) {
    return t.longDateFormat(n) || n;
  }
  for (pt.lastIndex = 0; r >= 0 && pt.test(e); )
    e = e.replace(
      pt,
      s
    ), pt.lastIndex = 0, r -= 1;
  return e;
}
var Qa = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Xa(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Pr).map(function(s) {
    return s === "MMMM" || s === "MM" || s === "DD" || s === "dddd" ? s.slice(1) : s;
  }).join(""), this._longDateFormat[e]);
}
var Ka = "Invalid date";
function ei() {
  return this._invalidDate;
}
var ti = "%d", ri = /\d{1,2}/;
function si(e) {
  return this._ordinal.replace("%d", e);
}
var ni = {
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
function ai(e, t, r, s) {
  var n = this._relativeTime[r];
  return ue(n) ? n(e, t, r, s) : n.replace(/%d/i, e);
}
function ii(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return ue(r) ? r(t) : r.replace(/%s/i, t);
}
var at = {};
function N(e, t) {
  var r = e.toLowerCase();
  at[r] = at[r + "s"] = at[t] = e;
}
function Q(e) {
  return typeof e == "string" ? at[e] || at[e.toLowerCase()] : void 0;
}
function Nr(e) {
  var t = {}, r, s;
  for (s in e)
    b(e, s) && (r = Q(s), r && (t[r] = e[s]));
  return t;
}
var Qs = {};
function C(e, t) {
  Qs[e] = t;
}
function oi(e) {
  var t = [], r;
  for (r in e)
    b(e, r) && t.push({ unit: r, priority: Qs[r] });
  return t.sort(function(s, n) {
    return s.priority - n.priority;
  }), t;
}
function Ft(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function B(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function w(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = B(t)), r;
}
function Ze(e, t) {
  return function(r) {
    return r != null ? (Xs(this, e, r), f.updateOffset(this, t), this) : Dt(this, e);
  };
}
function Dt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Xs(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && Ft(e.year()) && e.month() === 1 && e.date() === 29 ? (r = w(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    Wt(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function li(e) {
  return e = Q(e), ue(this[e]) ? this[e]() : this;
}
function ui(e, t) {
  if (typeof e == "object") {
    e = Nr(e);
    var r = oi(e), s, n = r.length;
    for (s = 0; s < n; s++)
      this[r[s].unit](e[r[s].unit]);
  } else if (e = Q(e), ue(this[e]))
    return this[e](t);
  return this;
}
var Ks = /\d/, q = /\d\d/, en = /\d{3}/, Cr = /\d{4}/, Pt = /[+-]?\d{6}/, M = /\d\d?/, tn = /\d\d\d\d?/, rn = /\d\d\d\d\d\d?/, Nt = /\d{1,3}/, Ar = /\d{1,4}/, Ct = /[+-]?\d{1,6}/, Qe = /\d+/, At = /[+-]?\d+/, di = /Z|[+-]\d\d:?\d\d/gi, Lt = /Z|[+-]\d\d(?::?\d\d)?/gi, fi = /[+-]?\d+(\.\d{1,3})?/, mt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, kt;
kt = {};
function c(e, t, r) {
  kt[e] = ue(t) ? t : function(s, n) {
    return s && r ? r : t;
  };
}
function ci(e, t) {
  return b(kt, e) ? kt[e](t._strict, t._locale) : new RegExp(hi(e));
}
function hi(e) {
  return j(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, r, s, n, a) {
        return r || s || n || a;
      }
    )
  );
}
function j(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Sr = {};
function D(e, t) {
  var r, s = t, n;
  for (typeof e == "string" && (e = [e]), pe(t) && (s = function(a, i) {
    i[t] = w(a);
  }), n = e.length, r = 0; r < n; r++)
    Sr[e[r]] = s;
}
function yt(e, t) {
  D(e, function(r, s, n, a) {
    n._w = n._w || {}, t(r, n._w, n, a);
  });
}
function mi(e, t, r) {
  t != null && b(Sr, e) && Sr[e](t, r._a, r, e);
}
var P = 0, he = 1, ae = 2, R = 3, ee = 4, me = 5, Te = 6, yi = 7, pi = 8;
function _i(e, t) {
  return (e % t + t) % t;
}
var T;
Array.prototype.indexOf ? T = Array.prototype.indexOf : T = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function Wt(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = _i(t, 12);
  return e += (t - r) / 12, r === 1 ? Ft(e) ? 29 : 28 : 31 - r % 7 % 2;
}
y("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
y("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
y("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
N("month", "M");
C("month", 8);
c("M", M);
c("MM", M, q);
c("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
c("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
D(["M", "MM"], function(e, t) {
  t[he] = w(e) - 1;
});
D(["MMM", "MMMM"], function(e, t, r, s) {
  var n = r._locale.monthsParse(e, s, r._strict);
  n != null ? t[he] = n : g(r).invalidMonth = e;
});
var gi = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), sn = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), nn = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, wi = mt, vi = mt;
function Si(e, t) {
  return e ? te(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || nn).test(t) ? "format" : "standalone"][e.month()] : te(this._months) ? this._months : this._months.standalone;
}
function bi(e, t) {
  return e ? te(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[nn.test(t) ? "format" : "standalone"][e.month()] : te(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Oi(e, t, r) {
  var s, n, a, i = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s)
      a = le([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(
        a,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[s] = this.months(a, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (n = T.call(this._shortMonthsParse, i), n !== -1 ? n : null) : (n = T.call(this._longMonthsParse, i), n !== -1 ? n : null) : t === "MMM" ? (n = T.call(this._shortMonthsParse, i), n !== -1 ? n : (n = T.call(this._longMonthsParse, i), n !== -1 ? n : null)) : (n = T.call(this._longMonthsParse, i), n !== -1 ? n : (n = T.call(this._shortMonthsParse, i), n !== -1 ? n : null));
}
function Di(e, t, r) {
  var s, n, a;
  if (this._monthsParseExact)
    return Oi.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
    if (n = le([2e3, s]), r && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp(
      "^" + this.months(n, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[s] = new RegExp(
      "^" + this.monthsShort(n, "").replace(".", "") + "$",
      "i"
    )), !r && !this._monthsParse[s] && (a = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[s] = new RegExp(a.replace(".", ""), "i")), r && t === "MMMM" && this._longMonthsParse[s].test(e))
      return s;
    if (r && t === "MMM" && this._shortMonthsParse[s].test(e))
      return s;
    if (!r && this._monthsParse[s].test(e))
      return s;
  }
}
function an(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = w(t);
    else if (t = e.localeData().monthsParse(t), !pe(t))
      return e;
  }
  return r = Math.min(e.date(), Wt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function on(e) {
  return e != null ? (an(this, e), f.updateOffset(this, !0), this) : Dt(this, "Month");
}
function ki() {
  return Wt(this.year(), this.month());
}
function Mi(e) {
  return this._monthsParseExact ? (b(this, "_monthsRegex") || ln.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (b(this, "_monthsShortRegex") || (this._monthsShortRegex = wi), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function xi(e) {
  return this._monthsParseExact ? (b(this, "_monthsRegex") || ln.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (b(this, "_monthsRegex") || (this._monthsRegex = vi), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function ln() {
  function e(i, o) {
    return o.length - i.length;
  }
  var t = [], r = [], s = [], n, a;
  for (n = 0; n < 12; n++)
    a = le([2e3, n]), t.push(this.monthsShort(a, "")), r.push(this.months(a, "")), s.push(this.months(a, "")), s.push(this.monthsShort(a, ""));
  for (t.sort(e), r.sort(e), s.sort(e), n = 0; n < 12; n++)
    t[n] = j(t[n]), r[n] = j(r[n]);
  for (n = 0; n < 24; n++)
    s[n] = j(s[n]);
  this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
y("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? oe(e, 4) : "+" + e;
});
y(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
y(0, ["YYYY", 4], 0, "year");
y(0, ["YYYYY", 5], 0, "year");
y(0, ["YYYYYY", 6, !0], 0, "year");
N("year", "y");
C("year", 1);
c("Y", At);
c("YY", M, q);
c("YYYY", Ar, Cr);
c("YYYYY", Ct, Pt);
c("YYYYYY", Ct, Pt);
D(["YYYYY", "YYYYYY"], P);
D("YYYY", function(e, t) {
  t[P] = e.length === 2 ? f.parseTwoDigitYear(e) : w(e);
});
D("YY", function(e, t) {
  t[P] = f.parseTwoDigitYear(e);
});
D("Y", function(e, t) {
  t[P] = parseInt(e, 10);
});
function it(e) {
  return Ft(e) ? 366 : 365;
}
f.parseTwoDigitYear = function(e) {
  return w(e) + (w(e) > 68 ? 1900 : 2e3);
};
var un = Ze("FullYear", !0);
function Ti() {
  return Ft(this.year());
}
function Yi(e, t, r, s, n, a, i) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, s, n, a, i), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, s, n, a, i), o;
}
function lt(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function Mt(e, t, r) {
  var s = 7 + t - r, n = (7 + lt(e, 0, s).getUTCDay() - t) % 7;
  return -n + s - 1;
}
function dn(e, t, r, s, n) {
  var a = (7 + r - s) % 7, i = Mt(e, s, n), o = 1 + 7 * (t - 1) + a + i, l, d;
  return o <= 0 ? (l = e - 1, d = it(l) + o) : o > it(e) ? (l = e + 1, d = o - it(e)) : (l = e, d = o), {
    year: l,
    dayOfYear: d
  };
}
function ut(e, t, r) {
  var s = Mt(e.year(), t, r), n = Math.floor((e.dayOfYear() - s - 1) / 7) + 1, a, i;
  return n < 1 ? (i = e.year() - 1, a = n + ye(i, t, r)) : n > ye(e.year(), t, r) ? (a = n - ye(e.year(), t, r), i = e.year() + 1) : (i = e.year(), a = n), {
    week: a,
    year: i
  };
}
function ye(e, t, r) {
  var s = Mt(e, t, r), n = Mt(e + 1, t, r);
  return (it(e) - s + n) / 7;
}
y("w", ["ww", 2], "wo", "week");
y("W", ["WW", 2], "Wo", "isoWeek");
N("week", "w");
N("isoWeek", "W");
C("week", 5);
C("isoWeek", 5);
c("w", M);
c("ww", M, q);
c("W", M);
c("WW", M, q);
yt(
  ["w", "ww", "W", "WW"],
  function(e, t, r, s) {
    t[s.substr(0, 1)] = w(e);
  }
);
function Ri(e) {
  return ut(e, this._week.dow, this._week.doy).week;
}
var Ei = {
  dow: 0,
  doy: 6
};
function Fi() {
  return this._week.dow;
}
function Pi() {
  return this._week.doy;
}
function Ni(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Ci(e) {
  var t = ut(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
y("d", 0, "do", "day");
y("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
y("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
y("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
y("e", 0, 0, "weekday");
y("E", 0, 0, "isoWeekday");
N("day", "d");
N("weekday", "e");
N("isoWeekday", "E");
C("day", 11);
C("weekday", 11);
C("isoWeekday", 11);
c("d", M);
c("e", M);
c("E", M);
c("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
c("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
c("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
yt(["dd", "ddd", "dddd"], function(e, t, r, s) {
  var n = r._locale.weekdaysParse(e, s, r._strict);
  n != null ? t.d = n : g(r).invalidWeekday = e;
});
yt(["d", "e", "E"], function(e, t, r, s) {
  t[s] = w(e);
});
function Ai(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function Li(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Lr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Wi = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), fn = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Ui = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Ii = mt, $i = mt, ji = mt;
function qi(e, t) {
  var r = te(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Lr(r, this._week.dow) : e ? r[e.day()] : r;
}
function Vi(e) {
  return e === !0 ? Lr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Hi(e) {
  return e === !0 ? Lr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Bi(e, t, r) {
  var s, n, a, i = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s)
      a = le([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(
        a,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(
        a,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(a, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (n = T.call(this._weekdaysParse, i), n !== -1 ? n : null) : t === "ddd" ? (n = T.call(this._shortWeekdaysParse, i), n !== -1 ? n : null) : (n = T.call(this._minWeekdaysParse, i), n !== -1 ? n : null) : t === "dddd" ? (n = T.call(this._weekdaysParse, i), n !== -1 || (n = T.call(this._shortWeekdaysParse, i), n !== -1) ? n : (n = T.call(this._minWeekdaysParse, i), n !== -1 ? n : null)) : t === "ddd" ? (n = T.call(this._shortWeekdaysParse, i), n !== -1 || (n = T.call(this._weekdaysParse, i), n !== -1) ? n : (n = T.call(this._minWeekdaysParse, i), n !== -1 ? n : null)) : (n = T.call(this._minWeekdaysParse, i), n !== -1 || (n = T.call(this._weekdaysParse, i), n !== -1) ? n : (n = T.call(this._shortWeekdaysParse, i), n !== -1 ? n : null));
}
function zi(e, t, r) {
  var s, n, a;
  if (this._weekdaysParseExact)
    return Bi.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
    if (n = le([2e3, 1]).day(s), r && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp(
      "^" + this.weekdays(n, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysShort(n, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysMin(n, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[s] || (a = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[s] = new RegExp(a.replace(".", ""), "i")), r && t === "dddd" && this._fullWeekdaysParse[s].test(e))
      return s;
    if (r && t === "ddd" && this._shortWeekdaysParse[s].test(e))
      return s;
    if (r && t === "dd" && this._minWeekdaysParse[s].test(e))
      return s;
    if (!r && this._weekdaysParse[s].test(e))
      return s;
  }
}
function Gi(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = Ai(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Ji(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Zi(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = Li(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Qi(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || Wr.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (b(this, "_weekdaysRegex") || (this._weekdaysRegex = Ii), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Xi(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || Wr.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (b(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = $i), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Ki(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || Wr.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (b(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = ji), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Wr() {
  function e(m, p) {
    return p.length - m.length;
  }
  var t = [], r = [], s = [], n = [], a, i, o, l, d;
  for (a = 0; a < 7; a++)
    i = le([2e3, 1]).day(a), o = j(this.weekdaysMin(i, "")), l = j(this.weekdaysShort(i, "")), d = j(this.weekdays(i, "")), t.push(o), r.push(l), s.push(d), n.push(o), n.push(l), n.push(d);
  t.sort(e), r.sort(e), s.sort(e), n.sort(e), this._weekdaysRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
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
function Ur() {
  return this.hours() % 12 || 12;
}
function eo() {
  return this.hours() || 24;
}
y("H", ["HH", 2], 0, "hour");
y("h", ["hh", 2], 0, Ur);
y("k", ["kk", 2], 0, eo);
y("hmm", 0, 0, function() {
  return "" + Ur.apply(this) + oe(this.minutes(), 2);
});
y("hmmss", 0, 0, function() {
  return "" + Ur.apply(this) + oe(this.minutes(), 2) + oe(this.seconds(), 2);
});
y("Hmm", 0, 0, function() {
  return "" + this.hours() + oe(this.minutes(), 2);
});
y("Hmmss", 0, 0, function() {
  return "" + this.hours() + oe(this.minutes(), 2) + oe(this.seconds(), 2);
});
function cn(e, t) {
  y(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
cn("a", !0);
cn("A", !1);
N("hour", "h");
C("hour", 13);
function hn(e, t) {
  return t._meridiemParse;
}
c("a", hn);
c("A", hn);
c("H", M);
c("h", M);
c("k", M);
c("HH", M, q);
c("hh", M, q);
c("kk", M, q);
c("hmm", tn);
c("hmmss", rn);
c("Hmm", tn);
c("Hmmss", rn);
D(["H", "HH"], R);
D(["k", "kk"], function(e, t, r) {
  var s = w(e);
  t[R] = s === 24 ? 0 : s;
});
D(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
D(["h", "hh"], function(e, t, r) {
  t[R] = w(e), g(r).bigHour = !0;
});
D("hmm", function(e, t, r) {
  var s = e.length - 2;
  t[R] = w(e.substr(0, s)), t[ee] = w(e.substr(s)), g(r).bigHour = !0;
});
D("hmmss", function(e, t, r) {
  var s = e.length - 4, n = e.length - 2;
  t[R] = w(e.substr(0, s)), t[ee] = w(e.substr(s, 2)), t[me] = w(e.substr(n)), g(r).bigHour = !0;
});
D("Hmm", function(e, t, r) {
  var s = e.length - 2;
  t[R] = w(e.substr(0, s)), t[ee] = w(e.substr(s));
});
D("Hmmss", function(e, t, r) {
  var s = e.length - 4, n = e.length - 2;
  t[R] = w(e.substr(0, s)), t[ee] = w(e.substr(s, 2)), t[me] = w(e.substr(n));
});
function to(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var ro = /[ap]\.?m?\.?/i, so = Ze("Hours", !0);
function no(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var mn = {
  calendar: za,
  longDateFormat: Qa,
  invalidDate: Ka,
  ordinal: ti,
  dayOfMonthOrdinalParse: ri,
  relativeTime: ni,
  months: gi,
  monthsShort: sn,
  week: Ei,
  weekdays: Wi,
  weekdaysMin: Ui,
  weekdaysShort: fn,
  meridiemParse: ro
}, x = {}, rt = {}, dt;
function ao(e, t) {
  var r, s = Math.min(e.length, t.length);
  for (r = 0; r < s; r += 1)
    if (e[r] !== t[r])
      return r;
  return s;
}
function hs(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function io(e) {
  for (var t = 0, r, s, n, a; t < e.length; ) {
    for (a = hs(e[t]).split("-"), r = a.length, s = hs(e[t + 1]), s = s ? s.split("-") : null; r > 0; ) {
      if (n = Ut(a.slice(0, r).join("-")), n)
        return n;
      if (s && s.length >= r && ao(a, s) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return dt;
}
function oo(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Ut(e) {
  var t = null, r;
  if (x[e] === void 0 && typeof module < "u" && module && module.exports && oo(e))
    try {
      t = dt._abbr, r = require, r("./locale/" + e), be(t);
    } catch {
      x[e] = null;
    }
  return x[e];
}
function be(e, t) {
  var r;
  return e && (L(t) ? r = _e(e) : r = Ir(e, t), r ? dt = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), dt._abbr;
}
function Ir(e, t) {
  if (t !== null) {
    var r, s = mn;
    if (t.abbr = e, x[e] != null)
      Js(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), s = x[e]._config;
    else if (t.parentLocale != null)
      if (x[t.parentLocale] != null)
        s = x[t.parentLocale]._config;
      else if (r = Ut(t.parentLocale), r != null)
        s = r._config;
      else
        return rt[t.parentLocale] || (rt[t.parentLocale] = []), rt[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return x[e] = new Fr(wr(s, t)), rt[e] && rt[e].forEach(function(n) {
      Ir(n.name, n.config);
    }), be(e), x[e];
  } else
    return delete x[e], null;
}
function lo(e, t) {
  if (t != null) {
    var r, s, n = mn;
    x[e] != null && x[e].parentLocale != null ? x[e].set(wr(x[e]._config, t)) : (s = Ut(e), s != null && (n = s._config), t = wr(n, t), s == null && (t.abbr = e), r = new Fr(t), r.parentLocale = x[e], x[e] = r), be(e);
  } else
    x[e] != null && (x[e].parentLocale != null ? (x[e] = x[e].parentLocale, e === be() && be(e)) : x[e] != null && delete x[e]);
  return x[e];
}
function _e(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return dt;
  if (!te(e)) {
    if (t = Ut(e), t)
      return t;
    e = [e];
  }
  return io(e);
}
function uo() {
  return vr(x);
}
function $r(e) {
  var t, r = e._a;
  return r && g(e).overflow === -2 && (t = r[he] < 0 || r[he] > 11 ? he : r[ae] < 1 || r[ae] > Wt(r[P], r[he]) ? ae : r[R] < 0 || r[R] > 24 || r[R] === 24 && (r[ee] !== 0 || r[me] !== 0 || r[Te] !== 0) ? R : r[ee] < 0 || r[ee] > 59 ? ee : r[me] < 0 || r[me] > 59 ? me : r[Te] < 0 || r[Te] > 999 ? Te : -1, g(e)._overflowDayOfYear && (t < P || t > ae) && (t = ae), g(e)._overflowWeeks && t === -1 && (t = yi), g(e)._overflowWeekday && t === -1 && (t = pi), g(e).overflow = t), e;
}
var fo = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, co = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ho = /Z|[+-]\d\d(?::?\d\d)?/, _t = [
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
], er = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], mo = /^\/?Date\((-?\d+)/i, yo = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, po = {
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
function yn(e) {
  var t, r, s = e._i, n = fo.exec(s) || co.exec(s), a, i, o, l, d = _t.length, m = er.length;
  if (n) {
    for (g(e).iso = !0, t = 0, r = d; t < r; t++)
      if (_t[t][1].exec(n[1])) {
        i = _t[t][0], a = _t[t][2] !== !1;
        break;
      }
    if (i == null) {
      e._isValid = !1;
      return;
    }
    if (n[3]) {
      for (t = 0, r = m; t < r; t++)
        if (er[t][1].exec(n[3])) {
          o = (n[2] || " ") + er[t][0];
          break;
        }
      if (o == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!a && o != null) {
      e._isValid = !1;
      return;
    }
    if (n[4])
      if (ho.exec(n[4]))
        l = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = i + (o || "") + (l || ""), qr(e);
  } else
    e._isValid = !1;
}
function _o(e, t, r, s, n, a) {
  var i = [
    go(e),
    sn.indexOf(t),
    parseInt(r, 10),
    parseInt(s, 10),
    parseInt(n, 10)
  ];
  return a && i.push(parseInt(a, 10)), i;
}
function go(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function wo(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function vo(e, t, r) {
  if (e) {
    var s = fn.indexOf(e), n = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (s !== n)
      return g(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function So(e, t, r) {
  if (e)
    return po[e];
  if (t)
    return 0;
  var s = parseInt(r, 10), n = s % 100, a = (s - n) / 100;
  return a * 60 + n;
}
function pn(e) {
  var t = yo.exec(wo(e._i)), r;
  if (t) {
    if (r = _o(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !vo(t[1], r, e))
      return;
    e._a = r, e._tzm = So(t[8], t[9], t[10]), e._d = lt.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), g(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function bo(e) {
  var t = mo.exec(e._i);
  if (t !== null) {
    e._d = new Date(+t[1]);
    return;
  }
  if (yn(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (pn(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : f.createFromInputFallback(e);
}
f.createFromInputFallback = Z(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Ie(e, t, r) {
  return e != null ? e : t != null ? t : r;
}
function Oo(e) {
  var t = new Date(f.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function jr(e) {
  var t, r, s = [], n, a, i;
  if (!e._d) {
    for (n = Oo(e), e._w && e._a[ae] == null && e._a[he] == null && Do(e), e._dayOfYear != null && (i = Ie(e._a[P], n[P]), (e._dayOfYear > it(i) || e._dayOfYear === 0) && (g(e)._overflowDayOfYear = !0), r = lt(i, 0, e._dayOfYear), e._a[he] = r.getUTCMonth(), e._a[ae] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = s[t] = n[t];
    for (; t < 7; t++)
      e._a[t] = s[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[R] === 24 && e._a[ee] === 0 && e._a[me] === 0 && e._a[Te] === 0 && (e._nextDay = !0, e._a[R] = 0), e._d = (e._useUTC ? lt : Yi).apply(
      null,
      s
    ), a = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[R] = 24), e._w && typeof e._w.d < "u" && e._w.d !== a && (g(e).weekdayMismatch = !0);
  }
}
function Do(e) {
  var t, r, s, n, a, i, o, l, d;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (a = 1, i = 4, r = Ie(
    t.GG,
    e._a[P],
    ut(k(), 1, 4).year
  ), s = Ie(t.W, 1), n = Ie(t.E, 1), (n < 1 || n > 7) && (l = !0)) : (a = e._locale._week.dow, i = e._locale._week.doy, d = ut(k(), a, i), r = Ie(t.gg, e._a[P], d.year), s = Ie(t.w, d.week), t.d != null ? (n = t.d, (n < 0 || n > 6) && (l = !0)) : t.e != null ? (n = t.e + a, (t.e < 0 || t.e > 6) && (l = !0)) : n = a), s < 1 || s > ye(r, a, i) ? g(e)._overflowWeeks = !0 : l != null ? g(e)._overflowWeekday = !0 : (o = dn(r, s, n, a, i), e._a[P] = o.year, e._dayOfYear = o.dayOfYear);
}
f.ISO_8601 = function() {
};
f.RFC_2822 = function() {
};
function qr(e) {
  if (e._f === f.ISO_8601) {
    yn(e);
    return;
  }
  if (e._f === f.RFC_2822) {
    pn(e);
    return;
  }
  e._a = [], g(e).empty = !0;
  var t = "" + e._i, r, s, n, a, i, o = t.length, l = 0, d, m;
  for (n = Zs(e._f, e._locale).match(Pr) || [], m = n.length, r = 0; r < m; r++)
    a = n[r], s = (t.match(ci(a, e)) || [])[0], s && (i = t.substr(0, t.indexOf(s)), i.length > 0 && g(e).unusedInput.push(i), t = t.slice(
      t.indexOf(s) + s.length
    ), l += s.length), qe[a] ? (s ? g(e).empty = !1 : g(e).unusedTokens.push(a), mi(a, s, e)) : e._strict && !s && g(e).unusedTokens.push(a);
  g(e).charsLeftOver = o - l, t.length > 0 && g(e).unusedInput.push(t), e._a[R] <= 12 && g(e).bigHour === !0 && e._a[R] > 0 && (g(e).bigHour = void 0), g(e).parsedDateParts = e._a.slice(0), g(e).meridiem = e._meridiem, e._a[R] = ko(
    e._locale,
    e._a[R],
    e._meridiem
  ), d = g(e).era, d !== null && (e._a[P] = e._locale.erasConvertYear(d, e._a[P])), jr(e), $r(e);
}
function ko(e, t, r) {
  var s;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (s = e.isPM(r), s && t < 12 && (t += 12), !s && t === 12 && (t = 0)), t);
}
function Mo(e) {
  var t, r, s, n, a, i, o = !1, l = e._f.length;
  if (l === 0) {
    g(e).invalidFormat = !0, e._d = new Date(NaN);
    return;
  }
  for (n = 0; n < l; n++)
    a = 0, i = !1, t = Er({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[n], qr(t), Rr(t) && (i = !0), a += g(t).charsLeftOver, a += g(t).unusedTokens.length * 10, g(t).score = a, o ? a < s && (s = a, r = t) : (s == null || a < s || i) && (s = a, r = t, i && (o = !0));
  ve(e, r || t);
}
function xo(e) {
  if (!e._d) {
    var t = Nr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = zs(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(s) {
        return s && parseInt(s, 10);
      }
    ), jr(e);
  }
}
function To(e) {
  var t = new ht($r(_n(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function _n(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || _e(e._l), t === null || r === void 0 && t === "" ? Et({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), re(t) ? new ht($r(t)) : (ct(t) ? e._d = t : te(r) ? Mo(e) : r ? qr(e) : Yo(e), Rr(e) || (e._d = null), e));
}
function Yo(e) {
  var t = e._i;
  L(t) ? e._d = new Date(f.now()) : ct(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? bo(e) : te(t) ? (e._a = zs(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), jr(e)) : Ye(t) ? xo(e) : pe(t) ? e._d = new Date(t) : f.createFromInputFallback(e);
}
function gn(e, t, r, s, n) {
  var a = {};
  return (t === !0 || t === !1) && (s = t, t = void 0), (r === !0 || r === !1) && (s = r, r = void 0), (Ye(e) && Yr(e) || te(e) && e.length === 0) && (e = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = n, a._l = r, a._i = e, a._f = t, a._strict = s, To(a);
}
function k(e, t, r, s) {
  return gn(e, t, r, s, !1);
}
var Ro = Z(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = k.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Et();
  }
), Eo = Z(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = k.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Et();
  }
);
function wn(e, t) {
  var r, s;
  if (t.length === 1 && te(t[0]) && (t = t[0]), !t.length)
    return k();
  for (r = t[0], s = 1; s < t.length; ++s)
    (!t[s].isValid() || t[s][e](r)) && (r = t[s]);
  return r;
}
function Fo() {
  var e = [].slice.call(arguments, 0);
  return wn("isBefore", e);
}
function Po() {
  var e = [].slice.call(arguments, 0);
  return wn("isAfter", e);
}
var No = function() {
  return Date.now ? Date.now() : +new Date();
}, st = [
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
function Co(e) {
  var t, r = !1, s, n = st.length;
  for (t in e)
    if (b(e, t) && !(T.call(st, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (s = 0; s < n; ++s)
    if (e[st[s]]) {
      if (r)
        return !1;
      parseFloat(e[st[s]]) !== w(e[st[s]]) && (r = !0);
    }
  return !0;
}
function Ao() {
  return this._isValid;
}
function Lo() {
  return ne(NaN);
}
function It(e) {
  var t = Nr(e), r = t.year || 0, s = t.quarter || 0, n = t.month || 0, a = t.week || t.isoWeek || 0, i = t.day || 0, o = t.hour || 0, l = t.minute || 0, d = t.second || 0, m = t.millisecond || 0;
  this._isValid = Co(t), this._milliseconds = +m + d * 1e3 + l * 6e4 + o * 1e3 * 60 * 60, this._days = +i + a * 7, this._months = +n + s * 3 + r * 12, this._data = {}, this._locale = _e(), this._bubble();
}
function vt(e) {
  return e instanceof It;
}
function br(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Wo(e, t, r) {
  var s = Math.min(e.length, t.length), n = Math.abs(e.length - t.length), a = 0, i;
  for (i = 0; i < s; i++)
    (r && e[i] !== t[i] || !r && w(e[i]) !== w(t[i])) && a++;
  return a + n;
}
function vn(e, t) {
  y(e, 0, 0, function() {
    var r = this.utcOffset(), s = "+";
    return r < 0 && (r = -r, s = "-"), s + oe(~~(r / 60), 2) + t + oe(~~r % 60, 2);
  });
}
vn("Z", ":");
vn("ZZ", "");
c("Z", Lt);
c("ZZ", Lt);
D(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Vr(Lt, e);
});
var Uo = /([\+\-]|\d\d)/gi;
function Vr(e, t) {
  var r = (t || "").match(e), s, n, a;
  return r === null ? null : (s = r[r.length - 1] || [], n = (s + "").match(Uo) || ["-", 0, 0], a = +(n[1] * 60) + w(n[2]), a === 0 ? 0 : n[0] === "+" ? a : -a);
}
function Hr(e, t) {
  var r, s;
  return t._isUTC ? (r = t.clone(), s = (re(e) || ct(e) ? e.valueOf() : k(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + s), f.updateOffset(r, !1), r) : k(e).local();
}
function Or(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
f.updateOffset = function() {
};
function Io(e, t, r) {
  var s = this._offset || 0, n;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Vr(Lt, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (n = Or(this)), this._offset = e, this._isUTC = !0, n != null && this.add(n, "m"), s !== e && (!t || this._changeInProgress ? On(
      this,
      ne(e - s, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, f.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? s : Or(this);
}
function $o(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function jo(e) {
  return this.utcOffset(0, e);
}
function qo(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Or(this), "m")), this;
}
function Vo() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Vr(di, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Ho(e) {
  return this.isValid() ? (e = e ? k(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Bo() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function zo() {
  if (!L(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Er(e, this), e = _n(e), e._a ? (t = e._isUTC ? le(e._a) : k(e._a), this._isDSTShifted = this.isValid() && Wo(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Go() {
  return this.isValid() ? !this._isUTC : !1;
}
function Jo() {
  return this.isValid() ? this._isUTC : !1;
}
function Sn() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Zo = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Qo = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ne(e, t) {
  var r = e, s = null, n, a, i;
  return vt(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : pe(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (s = Zo.exec(e)) ? (n = s[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: w(s[ae]) * n,
    h: w(s[R]) * n,
    m: w(s[ee]) * n,
    s: w(s[me]) * n,
    ms: w(br(s[Te] * 1e3)) * n
  }) : (s = Qo.exec(e)) ? (n = s[1] === "-" ? -1 : 1, r = {
    y: Me(s[2], n),
    M: Me(s[3], n),
    w: Me(s[4], n),
    d: Me(s[5], n),
    h: Me(s[6], n),
    m: Me(s[7], n),
    s: Me(s[8], n)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (i = Xo(
    k(r.from),
    k(r.to)
  ), r = {}, r.ms = i.milliseconds, r.M = i.months), a = new It(r), vt(e) && b(e, "_locale") && (a._locale = e._locale), vt(e) && b(e, "_isValid") && (a._isValid = e._isValid), a;
}
ne.fn = It.prototype;
ne.invalid = Lo;
function Me(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function ms(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Xo(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Hr(t, e), e.isBefore(t) ? r = ms(e, t) : (r = ms(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function bn(e, t) {
  return function(r, s) {
    var n, a;
    return s !== null && !isNaN(+s) && (Js(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), a = r, r = s, s = a), n = ne(r, s), On(this, n, e), this;
  };
}
function On(e, t, r, s) {
  var n = t._milliseconds, a = br(t._days), i = br(t._months);
  !e.isValid() || (s = s == null ? !0 : s, i && an(e, Dt(e, "Month") + i * r), a && Xs(e, "Date", Dt(e, "Date") + a * r), n && e._d.setTime(e._d.valueOf() + n * r), s && f.updateOffset(e, a || i));
}
var Ko = bn(1, "add"), el = bn(-1, "subtract");
function Dn(e) {
  return typeof e == "string" || e instanceof String;
}
function tl(e) {
  return re(e) || ct(e) || Dn(e) || pe(e) || sl(e) || rl(e) || e === null || e === void 0;
}
function rl(e) {
  var t = Ye(e) && !Yr(e), r = !1, s = [
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
  ], n, a, i = s.length;
  for (n = 0; n < i; n += 1)
    a = s[n], r = r || b(e, a);
  return t && r;
}
function sl(e) {
  var t = te(e), r = !1;
  return t && (r = e.filter(function(s) {
    return !pe(s) && Dn(e);
  }).length === 0), t && r;
}
function nl(e) {
  var t = Ye(e) && !Yr(e), r = !1, s = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], n, a;
  for (n = 0; n < s.length; n += 1)
    a = s[n], r = r || b(e, a);
  return t && r;
}
function al(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function il(e, t) {
  arguments.length === 1 && (arguments[0] ? tl(arguments[0]) ? (e = arguments[0], t = void 0) : nl(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || k(), s = Hr(r, this).startOf("day"), n = f.calendarFormat(this, s) || "sameElse", a = t && (ue(t[n]) ? t[n].call(this, r) : t[n]);
  return this.format(
    a || this.localeData().calendar(n, this, k(r))
  );
}
function ol() {
  return new ht(this);
}
function ll(e, t) {
  var r = re(e) ? e : k(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function ul(e, t) {
  var r = re(e) ? e : k(e);
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function dl(e, t, r, s) {
  var n = re(e) ? e : k(e), a = re(t) ? t : k(t);
  return this.isValid() && n.isValid() && a.isValid() ? (s = s || "()", (s[0] === "(" ? this.isAfter(n, r) : !this.isBefore(n, r)) && (s[1] === ")" ? this.isBefore(a, r) : !this.isAfter(a, r))) : !1;
}
function fl(e, t) {
  var r = re(e) ? e : k(e), s;
  return this.isValid() && r.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (s = r.valueOf(), this.clone().startOf(t).valueOf() <= s && s <= this.clone().endOf(t).valueOf())) : !1;
}
function cl(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function hl(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function ml(e, t, r) {
  var s, n, a;
  if (!this.isValid())
    return NaN;
  if (s = Hr(e, this), !s.isValid())
    return NaN;
  switch (n = (s.utcOffset() - this.utcOffset()) * 6e4, t = Q(t), t) {
    case "year":
      a = St(this, s) / 12;
      break;
    case "month":
      a = St(this, s);
      break;
    case "quarter":
      a = St(this, s) / 3;
      break;
    case "second":
      a = (this - s) / 1e3;
      break;
    case "minute":
      a = (this - s) / 6e4;
      break;
    case "hour":
      a = (this - s) / 36e5;
      break;
    case "day":
      a = (this - s - n) / 864e5;
      break;
    case "week":
      a = (this - s - n) / 6048e5;
      break;
    default:
      a = this - s;
  }
  return r ? a : B(a);
}
function St(e, t) {
  if (e.date() < t.date())
    return -St(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), s = e.clone().add(r, "months"), n, a;
  return t - s < 0 ? (n = e.clone().add(r - 1, "months"), a = (t - s) / (s - n)) : (n = e.clone().add(r + 1, "months"), a = (t - s) / (n - s)), -(r + a) || 0;
}
f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function yl() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function pl(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? wt(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ue(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", wt(r, "Z")) : wt(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function _l() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, s, n, a;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", n = "-MM-DD[T]HH:mm:ss.SSS", a = t + '[")]', this.format(r + s + n + a);
}
function gl(e) {
  e || (e = this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
  var t = wt(this, e);
  return this.localeData().postformat(t);
}
function wl(e, t) {
  return this.isValid() && (re(e) && e.isValid() || k(e).isValid()) ? ne({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function vl(e) {
  return this.from(k(), e);
}
function Sl(e, t) {
  return this.isValid() && (re(e) && e.isValid() || k(e).isValid()) ? ne({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function bl(e) {
  return this.to(k(), e);
}
function kn(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = _e(e), t != null && (this._locale = t), this);
}
var Mn = Z(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function xn() {
  return this._locale;
}
var xt = 1e3, Ve = 60 * xt, Tt = 60 * Ve, Tn = (365 * 400 + 97) * 24 * Tt;
function He(e, t) {
  return (e % t + t) % t;
}
function Yn(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - Tn : new Date(e, t, r).valueOf();
}
function Rn(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - Tn : Date.UTC(e, t, r);
}
function Ol(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Rn : Yn, e) {
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
      t = this._d.valueOf(), t -= He(
        t + (this._isUTC ? 0 : this.utcOffset() * Ve),
        Tt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= He(t, Ve);
      break;
    case "second":
      t = this._d.valueOf(), t -= He(t, xt);
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function Dl(e) {
  var t, r;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Rn : Yn, e) {
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
      t = this._d.valueOf(), t += Tt - He(
        t + (this._isUTC ? 0 : this.utcOffset() * Ve),
        Tt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Ve - He(t, Ve) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += xt - He(t, xt) - 1;
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function kl() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Ml() {
  return Math.floor(this.valueOf() / 1e3);
}
function xl() {
  return new Date(this.valueOf());
}
function Tl() {
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
function Yl() {
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
function Rl() {
  return this.isValid() ? this.toISOString() : null;
}
function El() {
  return Rr(this);
}
function Fl() {
  return ve({}, g(this));
}
function Pl() {
  return g(this).overflow;
}
function Nl() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
y("N", 0, 0, "eraAbbr");
y("NN", 0, 0, "eraAbbr");
y("NNN", 0, 0, "eraAbbr");
y("NNNN", 0, 0, "eraName");
y("NNNNN", 0, 0, "eraNarrow");
y("y", ["y", 1], "yo", "eraYear");
y("y", ["yy", 2], 0, "eraYear");
y("y", ["yyy", 3], 0, "eraYear");
y("y", ["yyyy", 4], 0, "eraYear");
c("N", Br);
c("NN", Br);
c("NNN", Br);
c("NNNN", Hl);
c("NNNNN", Bl);
D(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, s) {
    var n = r._locale.erasParse(e, s, r._strict);
    n ? g(r).era = n : g(r).invalidEra = e;
  }
);
c("y", Qe);
c("yy", Qe);
c("yyy", Qe);
c("yyyy", Qe);
c("yo", zl);
D(["y", "yy", "yyy", "yyyy"], P);
D(["yo"], function(e, t, r, s) {
  var n;
  r._locale._eraYearOrdinalRegex && (n = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[P] = r._locale.eraYearOrdinalParse(e, n) : t[P] = parseInt(e, 10);
});
function Cl(e, t) {
  var r, s, n, a = this._eras || _e("en")._eras;
  for (r = 0, s = a.length; r < s; ++r) {
    switch (typeof a[r].since) {
      case "string":
        n = f(a[r].since).startOf("day"), a[r].since = n.valueOf();
        break;
    }
    switch (typeof a[r].until) {
      case "undefined":
        a[r].until = 1 / 0;
        break;
      case "string":
        n = f(a[r].until).startOf("day").valueOf(), a[r].until = n.valueOf();
        break;
    }
  }
  return a;
}
function Al(e, t, r) {
  var s, n, a = this.eras(), i, o, l;
  for (e = e.toUpperCase(), s = 0, n = a.length; s < n; ++s)
    if (i = a[s].name.toUpperCase(), o = a[s].abbr.toUpperCase(), l = a[s].narrow.toUpperCase(), r)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return a[s];
          break;
        case "NNNN":
          if (i === e)
            return a[s];
          break;
        case "NNNNN":
          if (l === e)
            return a[s];
          break;
      }
    else if ([i, o, l].indexOf(e) >= 0)
      return a[s];
}
function Ll(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? f(e.since).year() : f(e.since).year() + (t - e.offset) * r;
}
function Wl() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].name;
  return "";
}
function Ul() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].narrow;
  return "";
}
function Il() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].abbr;
  return "";
}
function $l() {
  var e, t, r, s, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = n[e].since <= n[e].until ? 1 : -1, s = this.clone().startOf("day").valueOf(), n[e].since <= s && s <= n[e].until || n[e].until <= s && s <= n[e].since)
      return (this.year() - f(n[e].since).year()) * r + n[e].offset;
  return this.year();
}
function jl(e) {
  return b(this, "_erasNameRegex") || zr.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function ql(e) {
  return b(this, "_erasAbbrRegex") || zr.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Vl(e) {
  return b(this, "_erasNarrowRegex") || zr.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Br(e, t) {
  return t.erasAbbrRegex(e);
}
function Hl(e, t) {
  return t.erasNameRegex(e);
}
function Bl(e, t) {
  return t.erasNarrowRegex(e);
}
function zl(e, t) {
  return t._eraYearOrdinalRegex || Qe;
}
function zr() {
  var e = [], t = [], r = [], s = [], n, a, i = this.eras();
  for (n = 0, a = i.length; n < a; ++n)
    t.push(j(i[n].name)), e.push(j(i[n].abbr)), r.push(j(i[n].narrow)), s.push(j(i[n].name)), s.push(j(i[n].abbr)), s.push(j(i[n].narrow));
  this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
y(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
y(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function $t(e, t) {
  y(0, [e, e.length], 0, t);
}
$t("gggg", "weekYear");
$t("ggggg", "weekYear");
$t("GGGG", "isoWeekYear");
$t("GGGGG", "isoWeekYear");
N("weekYear", "gg");
N("isoWeekYear", "GG");
C("weekYear", 1);
C("isoWeekYear", 1);
c("G", At);
c("g", At);
c("GG", M, q);
c("gg", M, q);
c("GGGG", Ar, Cr);
c("gggg", Ar, Cr);
c("GGGGG", Ct, Pt);
c("ggggg", Ct, Pt);
yt(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, s) {
    t[s.substr(0, 2)] = w(e);
  }
);
yt(["gg", "GG"], function(e, t, r, s) {
  t[s] = f.parseTwoDigitYear(e);
});
function Gl(e) {
  return En.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Jl(e) {
  return En.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Zl() {
  return ye(this.year(), 1, 4);
}
function Ql() {
  return ye(this.isoWeekYear(), 1, 4);
}
function Xl() {
  var e = this.localeData()._week;
  return ye(this.year(), e.dow, e.doy);
}
function Kl() {
  var e = this.localeData()._week;
  return ye(this.weekYear(), e.dow, e.doy);
}
function En(e, t, r, s, n) {
  var a;
  return e == null ? ut(this, s, n).year : (a = ye(e, s, n), t > a && (t = a), eu.call(this, e, t, r, s, n));
}
function eu(e, t, r, s, n) {
  var a = dn(e, t, r, s, n), i = lt(a.year, 0, a.dayOfYear);
  return this.year(i.getUTCFullYear()), this.month(i.getUTCMonth()), this.date(i.getUTCDate()), this;
}
y("Q", 0, "Qo", "quarter");
N("quarter", "Q");
C("quarter", 7);
c("Q", Ks);
D("Q", function(e, t) {
  t[he] = (w(e) - 1) * 3;
});
function tu(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
y("D", ["DD", 2], "Do", "date");
N("date", "D");
C("date", 9);
c("D", M);
c("DD", M, q);
c("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
D(["D", "DD"], ae);
D("Do", function(e, t) {
  t[ae] = w(e.match(M)[0]);
});
var Fn = Ze("Date", !0);
y("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
N("dayOfYear", "DDD");
C("dayOfYear", 4);
c("DDD", Nt);
c("DDDD", en);
D(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = w(e);
});
function ru(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
y("m", ["mm", 2], 0, "minute");
N("minute", "m");
C("minute", 14);
c("m", M);
c("mm", M, q);
D(["m", "mm"], ee);
var su = Ze("Minutes", !1);
y("s", ["ss", 2], 0, "second");
N("second", "s");
C("second", 15);
c("s", M);
c("ss", M, q);
D(["s", "ss"], me);
var nu = Ze("Seconds", !1);
y("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
y(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
y(0, ["SSS", 3], 0, "millisecond");
y(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
y(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
y(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
y(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
y(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
y(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
N("millisecond", "ms");
C("millisecond", 16);
c("S", Nt, Ks);
c("SS", Nt, q);
c("SSS", Nt, en);
var Se, Pn;
for (Se = "SSSS"; Se.length <= 9; Se += "S")
  c(Se, Qe);
function au(e, t) {
  t[Te] = w(("0." + e) * 1e3);
}
for (Se = "S"; Se.length <= 9; Se += "S")
  D(Se, au);
Pn = Ze("Milliseconds", !1);
y("z", 0, 0, "zoneAbbr");
y("zz", 0, 0, "zoneName");
function iu() {
  return this._isUTC ? "UTC" : "";
}
function ou() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var u = ht.prototype;
u.add = Ko;
u.calendar = il;
u.clone = ol;
u.diff = ml;
u.endOf = Dl;
u.format = gl;
u.from = wl;
u.fromNow = vl;
u.to = Sl;
u.toNow = bl;
u.get = li;
u.invalidAt = Pl;
u.isAfter = ll;
u.isBefore = ul;
u.isBetween = dl;
u.isSame = fl;
u.isSameOrAfter = cl;
u.isSameOrBefore = hl;
u.isValid = El;
u.lang = Mn;
u.locale = kn;
u.localeData = xn;
u.max = Eo;
u.min = Ro;
u.parsingFlags = Fl;
u.set = ui;
u.startOf = Ol;
u.subtract = el;
u.toArray = Tl;
u.toObject = Yl;
u.toDate = xl;
u.toISOString = pl;
u.inspect = _l;
typeof Symbol < "u" && Symbol.for != null && (u[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
u.toJSON = Rl;
u.toString = yl;
u.unix = Ml;
u.valueOf = kl;
u.creationData = Nl;
u.eraName = Wl;
u.eraNarrow = Ul;
u.eraAbbr = Il;
u.eraYear = $l;
u.year = un;
u.isLeapYear = Ti;
u.weekYear = Gl;
u.isoWeekYear = Jl;
u.quarter = u.quarters = tu;
u.month = on;
u.daysInMonth = ki;
u.week = u.weeks = Ni;
u.isoWeek = u.isoWeeks = Ci;
u.weeksInYear = Xl;
u.weeksInWeekYear = Kl;
u.isoWeeksInYear = Zl;
u.isoWeeksInISOWeekYear = Ql;
u.date = Fn;
u.day = u.days = Gi;
u.weekday = Ji;
u.isoWeekday = Zi;
u.dayOfYear = ru;
u.hour = u.hours = so;
u.minute = u.minutes = su;
u.second = u.seconds = nu;
u.millisecond = u.milliseconds = Pn;
u.utcOffset = Io;
u.utc = jo;
u.local = qo;
u.parseZone = Vo;
u.hasAlignedHourOffset = Ho;
u.isDST = Bo;
u.isLocal = Go;
u.isUtcOffset = Jo;
u.isUtc = Sn;
u.isUTC = Sn;
u.zoneAbbr = iu;
u.zoneName = ou;
u.dates = Z(
  "dates accessor is deprecated. Use date instead.",
  Fn
);
u.months = Z(
  "months accessor is deprecated. Use month instead",
  on
);
u.years = Z(
  "years accessor is deprecated. Use year instead",
  un
);
u.zone = Z(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  $o
);
u.isDSTShifted = Z(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  zo
);
function lu(e) {
  return k(e * 1e3);
}
function uu() {
  return k.apply(null, arguments).parseZone();
}
function Nn(e) {
  return e;
}
var O = Fr.prototype;
O.calendar = Ga;
O.longDateFormat = Xa;
O.invalidDate = ei;
O.ordinal = si;
O.preparse = Nn;
O.postformat = Nn;
O.relativeTime = ai;
O.pastFuture = ii;
O.set = Ba;
O.eras = Cl;
O.erasParse = Al;
O.erasConvertYear = Ll;
O.erasAbbrRegex = ql;
O.erasNameRegex = jl;
O.erasNarrowRegex = Vl;
O.months = Si;
O.monthsShort = bi;
O.monthsParse = Di;
O.monthsRegex = xi;
O.monthsShortRegex = Mi;
O.week = Ri;
O.firstDayOfYear = Pi;
O.firstDayOfWeek = Fi;
O.weekdays = qi;
O.weekdaysMin = Hi;
O.weekdaysShort = Vi;
O.weekdaysParse = zi;
O.weekdaysRegex = Qi;
O.weekdaysShortRegex = Xi;
O.weekdaysMinRegex = Ki;
O.isPM = to;
O.meridiem = no;
function Yt(e, t, r, s) {
  var n = _e(), a = le().set(s, t);
  return n[r](a, e);
}
function Cn(e, t, r) {
  if (pe(e) && (t = e, e = void 0), e = e || "", t != null)
    return Yt(e, t, r, "month");
  var s, n = [];
  for (s = 0; s < 12; s++)
    n[s] = Yt(e, s, r, "month");
  return n;
}
function Gr(e, t, r, s) {
  typeof e == "boolean" ? (pe(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, pe(t) && (r = t, t = void 0), t = t || "");
  var n = _e(), a = e ? n._week.dow : 0, i, o = [];
  if (r != null)
    return Yt(t, (r + a) % 7, s, "day");
  for (i = 0; i < 7; i++)
    o[i] = Yt(t, (i + a) % 7, s, "day");
  return o;
}
function du(e, t) {
  return Cn(e, t, "months");
}
function fu(e, t) {
  return Cn(e, t, "monthsShort");
}
function cu(e, t, r) {
  return Gr(e, t, r, "weekdays");
}
function hu(e, t, r) {
  return Gr(e, t, r, "weekdaysShort");
}
function mu(e, t, r) {
  return Gr(e, t, r, "weekdaysMin");
}
be("en", {
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
    var t = e % 10, r = w(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + r;
  }
});
f.lang = Z(
  "moment.lang is deprecated. Use moment.locale instead.",
  be
);
f.langData = Z(
  "moment.langData is deprecated. Use moment.localeData instead.",
  _e
);
var de = Math.abs;
function yu() {
  var e = this._data;
  return this._milliseconds = de(this._milliseconds), this._days = de(this._days), this._months = de(this._months), e.milliseconds = de(e.milliseconds), e.seconds = de(e.seconds), e.minutes = de(e.minutes), e.hours = de(e.hours), e.months = de(e.months), e.years = de(e.years), this;
}
function An(e, t, r, s) {
  var n = ne(t, r);
  return e._milliseconds += s * n._milliseconds, e._days += s * n._days, e._months += s * n._months, e._bubble();
}
function pu(e, t) {
  return An(this, e, t, 1);
}
function _u(e, t) {
  return An(this, e, t, -1);
}
function ys(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function gu() {
  var e = this._milliseconds, t = this._days, r = this._months, s = this._data, n, a, i, o, l;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += ys(Dr(r) + t) * 864e5, t = 0, r = 0), s.milliseconds = e % 1e3, n = B(e / 1e3), s.seconds = n % 60, a = B(n / 60), s.minutes = a % 60, i = B(a / 60), s.hours = i % 24, t += B(i / 24), l = B(Ln(t)), r += l, t -= ys(Dr(l)), o = B(r / 12), r %= 12, s.days = t, s.months = r, s.years = o, this;
}
function Ln(e) {
  return e * 4800 / 146097;
}
function Dr(e) {
  return e * 146097 / 4800;
}
function wu(e) {
  if (!this.isValid())
    return NaN;
  var t, r, s = this._milliseconds;
  if (e = Q(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + s / 864e5, r = this._months + Ln(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(Dr(this._months)), e) {
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
function vu() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + w(this._months / 12) * 31536e6 : NaN;
}
function ge(e) {
  return function() {
    return this.as(e);
  };
}
var Su = ge("ms"), bu = ge("s"), Ou = ge("m"), Du = ge("h"), ku = ge("d"), Mu = ge("w"), xu = ge("M"), Tu = ge("Q"), Yu = ge("y");
function Ru() {
  return ne(this);
}
function Eu(e) {
  return e = Q(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Fe(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Fu = Fe("milliseconds"), Pu = Fe("seconds"), Nu = Fe("minutes"), Cu = Fe("hours"), Au = Fe("days"), Lu = Fe("months"), Wu = Fe("years");
function Uu() {
  return B(this.days() / 7);
}
var fe = Math.round, $e = {
  ss: 44,
  s: 45,
  m: 45,
  h: 22,
  d: 26,
  w: null,
  M: 11
};
function Iu(e, t, r, s, n) {
  return n.relativeTime(t || 1, !!r, e, s);
}
function $u(e, t, r, s) {
  var n = ne(e).abs(), a = fe(n.as("s")), i = fe(n.as("m")), o = fe(n.as("h")), l = fe(n.as("d")), d = fe(n.as("M")), m = fe(n.as("w")), p = fe(n.as("y")), h = a <= r.ss && ["s", a] || a < r.s && ["ss", a] || i <= 1 && ["m"] || i < r.m && ["mm", i] || o <= 1 && ["h"] || o < r.h && ["hh", o] || l <= 1 && ["d"] || l < r.d && ["dd", l];
  return r.w != null && (h = h || m <= 1 && ["w"] || m < r.w && ["ww", m]), h = h || d <= 1 && ["M"] || d < r.M && ["MM", d] || p <= 1 && ["y"] || ["yy", p], h[2] = t, h[3] = +e > 0, h[4] = s, Iu.apply(null, h);
}
function ju(e) {
  return e === void 0 ? fe : typeof e == "function" ? (fe = e, !0) : !1;
}
function qu(e, t) {
  return $e[e] === void 0 ? !1 : t === void 0 ? $e[e] : ($e[e] = t, e === "s" && ($e.ss = t - 1), !0);
}
function Vu(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, s = $e, n, a;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (s = Object.assign({}, $e, t), t.s != null && t.ss == null && (s.ss = t.s - 1)), n = this.localeData(), a = $u(this, !r, s, n), r && (a = n.pastFuture(+this, a)), n.postformat(a);
}
var tr = Math.abs;
function Le(e) {
  return (e > 0) - (e < 0) || +e;
}
function jt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = tr(this._milliseconds) / 1e3, t = tr(this._days), r = tr(this._months), s, n, a, i, o = this.asSeconds(), l, d, m, p;
  return o ? (s = B(e / 60), n = B(s / 60), e %= 60, s %= 60, a = B(r / 12), r %= 12, i = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", l = o < 0 ? "-" : "", d = Le(this._months) !== Le(o) ? "-" : "", m = Le(this._days) !== Le(o) ? "-" : "", p = Le(this._milliseconds) !== Le(o) ? "-" : "", l + "P" + (a ? d + a + "Y" : "") + (r ? d + r + "M" : "") + (t ? m + t + "D" : "") + (n || s || e ? "T" : "") + (n ? p + n + "H" : "") + (s ? p + s + "M" : "") + (e ? p + i + "S" : "")) : "P0D";
}
var S = It.prototype;
S.isValid = Ao;
S.abs = yu;
S.add = pu;
S.subtract = _u;
S.as = wu;
S.asMilliseconds = Su;
S.asSeconds = bu;
S.asMinutes = Ou;
S.asHours = Du;
S.asDays = ku;
S.asWeeks = Mu;
S.asMonths = xu;
S.asQuarters = Tu;
S.asYears = Yu;
S.valueOf = vu;
S._bubble = gu;
S.clone = Ru;
S.get = Eu;
S.milliseconds = Fu;
S.seconds = Pu;
S.minutes = Nu;
S.hours = Cu;
S.days = Au;
S.weeks = Uu;
S.months = Lu;
S.years = Wu;
S.humanize = Vu;
S.toISOString = jt;
S.toString = jt;
S.toJSON = jt;
S.locale = kn;
S.localeData = xn;
S.toIsoString = Z(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  jt
);
S.lang = Mn;
y("X", 0, 0, "unix");
y("x", 0, 0, "valueOf");
c("x", At);
c("X", fi);
D("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
D("x", function(e, t, r) {
  r._d = new Date(w(e));
});
//! moment.js
f.version = "2.29.4";
Va(k);
f.fn = u;
f.min = Fo;
f.max = Po;
f.now = No;
f.utc = le;
f.unix = lu;
f.months = du;
f.isDate = ct;
f.locale = be;
f.invalid = Et;
f.duration = ne;
f.isMoment = re;
f.weekdays = cu;
f.parseZone = uu;
f.localeData = _e;
f.isDuration = vt;
f.monthsShort = fu;
f.weekdaysMin = mu;
f.defineLocale = Ir;
f.updateLocale = lo;
f.locales = uo;
f.weekdaysShort = hu;
f.normalizeUnits = Q;
f.relativeTimeRounding = ju;
f.relativeTimeThreshold = qu;
f.calendarFormat = al;
f.prototype = u;
f.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM"
};
function Hu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Wn = { exports: {} }, Jr = { exports: {} }, Un = function(t, r) {
  return function() {
    for (var n = new Array(arguments.length), a = 0; a < n.length; a++)
      n[a] = arguments[a];
    return t.apply(r, n);
  };
}, Bu = Un, Zr = Object.prototype.toString, Qr = function(e) {
  return function(t) {
    var r = Zr.call(t);
    return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function Pe(e) {
  return e = e.toLowerCase(), function(r) {
    return Qr(r) === e;
  };
}
function Xr(e) {
  return Array.isArray(e);
}
function Rt(e) {
  return typeof e > "u";
}
function zu(e) {
  return e !== null && !Rt(e) && e.constructor !== null && !Rt(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
var In = Pe("ArrayBuffer");
function Gu(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && In(e.buffer), t;
}
function Ju(e) {
  return typeof e == "string";
}
function Zu(e) {
  return typeof e == "number";
}
function $n(e) {
  return e !== null && typeof e == "object";
}
function bt(e) {
  if (Qr(e) !== "object")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
var Qu = Pe("Date"), Xu = Pe("File"), Ku = Pe("Blob"), ed = Pe("FileList");
function Kr(e) {
  return Zr.call(e) === "[object Function]";
}
function td(e) {
  return $n(e) && Kr(e.pipe);
}
function rd(e) {
  var t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Zr.call(e) === t || Kr(e.toString) && e.toString() === t);
}
var sd = Pe("URLSearchParams");
function nd(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function ad() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function es(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Xr(e))
      for (var r = 0, s = e.length; r < s; r++)
        t.call(null, e[r], r, e);
    else
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && t.call(null, e[n], n, e);
}
function kr() {
  var e = {};
  function t(n, a) {
    bt(e[a]) && bt(n) ? e[a] = kr(e[a], n) : bt(n) ? e[a] = kr({}, n) : Xr(n) ? e[a] = n.slice() : e[a] = n;
  }
  for (var r = 0, s = arguments.length; r < s; r++)
    es(arguments[r], t);
  return e;
}
function id(e, t, r) {
  return es(t, function(n, a) {
    r && typeof n == "function" ? e[a] = Bu(n, r) : e[a] = n;
  }), e;
}
function od(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
function ld(e, t, r, s) {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, r && Object.assign(e.prototype, r);
}
function ud(e, t, r) {
  var s, n, a, i = {};
  t = t || {};
  do {
    for (s = Object.getOwnPropertyNames(e), n = s.length; n-- > 0; )
      a = s[n], i[a] || (t[a] = e[a], i[a] = !0);
    e = Object.getPrototypeOf(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}
function dd(e, t, r) {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  var s = e.indexOf(t, r);
  return s !== -1 && s === r;
}
function fd(e) {
  if (!e)
    return null;
  var t = e.length;
  if (Rt(t))
    return null;
  for (var r = new Array(t); t-- > 0; )
    r[t] = e[t];
  return r;
}
var cd = function(e) {
  return function(t) {
    return e && t instanceof e;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), F = {
  isArray: Xr,
  isArrayBuffer: In,
  isBuffer: zu,
  isFormData: rd,
  isArrayBufferView: Gu,
  isString: Ju,
  isNumber: Zu,
  isObject: $n,
  isPlainObject: bt,
  isUndefined: Rt,
  isDate: Qu,
  isFile: Xu,
  isBlob: Ku,
  isFunction: Kr,
  isStream: td,
  isURLSearchParams: sd,
  isStandardBrowserEnv: ad,
  forEach: es,
  merge: kr,
  extend: id,
  trim: nd,
  stripBOM: od,
  inherits: ld,
  toFlatObject: ud,
  kindOf: Qr,
  kindOfTest: Pe,
  endsWith: dd,
  toArray: fd,
  isTypedArray: cd,
  isFileList: ed
}, We = F;
function ps(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var jn = function(t, r, s) {
  if (!r)
    return t;
  var n;
  if (s)
    n = s(r);
  else if (We.isURLSearchParams(r))
    n = r.toString();
  else {
    var a = [];
    We.forEach(r, function(l, d) {
      l === null || typeof l > "u" || (We.isArray(l) ? d = d + "[]" : l = [l], We.forEach(l, function(p) {
        We.isDate(p) ? p = p.toISOString() : We.isObject(p) && (p = JSON.stringify(p)), a.push(ps(d) + "=" + ps(p));
      }));
    }), n = a.join("&");
  }
  if (n) {
    var i = t.indexOf("#");
    i !== -1 && (t = t.slice(0, i)), t += (t.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return t;
}, hd = F;
function qt() {
  this.handlers = [];
}
qt.prototype.use = function(t, r, s) {
  return this.handlers.push({
    fulfilled: t,
    rejected: r,
    synchronous: s ? s.synchronous : !1,
    runWhen: s ? s.runWhen : null
  }), this.handlers.length - 1;
};
qt.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
qt.prototype.forEach = function(t) {
  hd.forEach(this.handlers, function(s) {
    s !== null && t(s);
  });
};
var md = qt, yd = F, pd = function(t, r) {
  yd.forEach(t, function(n, a) {
    a !== r && a.toUpperCase() === r.toUpperCase() && (t[r] = n, delete t[a]);
  });
}, qn = F;
function Ge(e, t, r, s, n) {
  Error.call(this), this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), s && (this.request = s), n && (this.response = n);
}
qn.inherits(Ge, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var Vn = Ge.prototype, Hn = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(e) {
  Hn[e] = { value: e };
});
Object.defineProperties(Ge, Hn);
Object.defineProperty(Vn, "isAxiosError", { value: !0 });
Ge.from = function(e, t, r, s, n, a) {
  var i = Object.create(Vn);
  return qn.toFlatObject(e, i, function(l) {
    return l !== Error.prototype;
  }), Ge.call(i, e.message, t, r, s, n), i.name = e.name, a && Object.assign(i, a), i;
};
var Xe = Ge, Bn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, K = F;
function _d(e, t) {
  t = t || new FormData();
  var r = [];
  function s(a) {
    return a === null ? "" : K.isDate(a) ? a.toISOString() : K.isArrayBuffer(a) || K.isTypedArray(a) ? typeof Blob == "function" ? new Blob([a]) : Buffer.from(a) : a;
  }
  function n(a, i) {
    if (K.isPlainObject(a) || K.isArray(a)) {
      if (r.indexOf(a) !== -1)
        throw Error("Circular reference detected in " + i);
      r.push(a), K.forEach(a, function(l, d) {
        if (!K.isUndefined(l)) {
          var m = i ? i + "." + d : d, p;
          if (l && !i && typeof l == "object") {
            if (K.endsWith(d, "{}"))
              l = JSON.stringify(l);
            else if (K.endsWith(d, "[]") && (p = K.toArray(l))) {
              p.forEach(function(h) {
                !K.isUndefined(h) && t.append(m, s(h));
              });
              return;
            }
          }
          n(l, m);
        }
      }), r.pop();
    } else
      t.append(i, s(a));
  }
  return n(e), t;
}
var zn = _d, rr, _s;
function gd() {
  if (_s)
    return rr;
  _s = 1;
  var e = Xe;
  return rr = function(r, s, n) {
    var a = n.config.validateStatus;
    !n.status || !a || a(n.status) ? r(n) : s(new e(
      "Request failed with status code " + n.status,
      [e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    ));
  }, rr;
}
var sr, gs;
function wd() {
  if (gs)
    return sr;
  gs = 1;
  var e = F;
  return sr = e.isStandardBrowserEnv() ? function() {
    return {
      write: function(s, n, a, i, o, l) {
        var d = [];
        d.push(s + "=" + encodeURIComponent(n)), e.isNumber(a) && d.push("expires=" + new Date(a).toGMTString()), e.isString(i) && d.push("path=" + i), e.isString(o) && d.push("domain=" + o), l === !0 && d.push("secure"), document.cookie = d.join("; ");
      },
      read: function(s) {
        var n = document.cookie.match(new RegExp("(^|;\\s*)(" + s + ")=([^;]*)"));
        return n ? decodeURIComponent(n[3]) : null;
      },
      remove: function(s) {
        this.write(s, "", Date.now() - 864e5);
      }
    };
  }() : function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }(), sr;
}
var vd = function(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}, Sd = function(t, r) {
  return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
}, bd = vd, Od = Sd, Gn = function(t, r) {
  return t && !bd(r) ? Od(t, r) : r;
}, nr, ws;
function Dd() {
  if (ws)
    return nr;
  ws = 1;
  var e = F, t = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  return nr = function(s) {
    var n = {}, a, i, o;
    return s && e.forEach(s.split(`
`), function(d) {
      if (o = d.indexOf(":"), a = e.trim(d.substr(0, o)).toLowerCase(), i = e.trim(d.substr(o + 1)), a) {
        if (n[a] && t.indexOf(a) >= 0)
          return;
        a === "set-cookie" ? n[a] = (n[a] ? n[a] : []).concat([i]) : n[a] = n[a] ? n[a] + ", " + i : i;
      }
    }), n;
  }, nr;
}
var ar, vs;
function kd() {
  if (vs)
    return ar;
  vs = 1;
  var e = F;
  return ar = e.isStandardBrowserEnv() ? function() {
    var r = /(msie|trident)/i.test(navigator.userAgent), s = document.createElement("a"), n;
    function a(i) {
      var o = i;
      return r && (s.setAttribute("href", o), o = s.href), s.setAttribute("href", o), {
        href: s.href,
        protocol: s.protocol ? s.protocol.replace(/:$/, "") : "",
        host: s.host,
        search: s.search ? s.search.replace(/^\?/, "") : "",
        hash: s.hash ? s.hash.replace(/^#/, "") : "",
        hostname: s.hostname,
        port: s.port,
        pathname: s.pathname.charAt(0) === "/" ? s.pathname : "/" + s.pathname
      };
    }
    return n = a(window.location.href), function(o) {
      var l = e.isString(o) ? a(o) : o;
      return l.protocol === n.protocol && l.host === n.host;
    };
  }() : function() {
    return function() {
      return !0;
    };
  }(), ar;
}
var ir, Ss;
function Vt() {
  if (Ss)
    return ir;
  Ss = 1;
  var e = Xe, t = F;
  function r(s) {
    e.call(this, s == null ? "canceled" : s, e.ERR_CANCELED), this.name = "CanceledError";
  }
  return t.inherits(r, e, {
    __CANCEL__: !0
  }), ir = r, ir;
}
var or, bs;
function Md() {
  return bs || (bs = 1, or = function(t) {
    var r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
    return r && r[1] || "";
  }), or;
}
var lr, Os;
function Ds() {
  if (Os)
    return lr;
  Os = 1;
  var e = F, t = gd(), r = wd(), s = jn, n = Gn, a = Dd(), i = kd(), o = Bn, l = Xe, d = Vt(), m = Md();
  return lr = function(h) {
    return new Promise(function(ca, Ne) {
      var Ke = h.data, et = h.headers, tt = h.responseType, Ce;
      function ls() {
        h.cancelToken && h.cancelToken.unsubscribe(Ce), h.signal && h.signal.removeEventListener("abort", Ce);
      }
      e.isFormData(Ke) && e.isStandardBrowserEnv() && delete et["Content-Type"];
      var _ = new XMLHttpRequest();
      if (h.auth) {
        var ha = h.auth.username || "", ma = h.auth.password ? unescape(encodeURIComponent(h.auth.password)) : "";
        et.Authorization = "Basic " + btoa(ha + ":" + ma);
      }
      var Jt = n(h.baseURL, h.url);
      _.open(h.method.toUpperCase(), s(Jt, h.params, h.paramsSerializer), !0), _.timeout = h.timeout;
      function us() {
        if (!!_) {
          var X = "getAllResponseHeaders" in _ ? a(_.getAllResponseHeaders()) : null, Ae = !tt || tt === "text" || tt === "json" ? _.responseText : _.response, ke = {
            data: Ae,
            status: _.status,
            statusText: _.statusText,
            headers: X,
            config: h,
            request: _
          };
          t(function(Qt) {
            ca(Qt), ls();
          }, function(Qt) {
            Ne(Qt), ls();
          }, ke), _ = null;
        }
      }
      if ("onloadend" in _ ? _.onloadend = us : _.onreadystatechange = function() {
        !_ || _.readyState !== 4 || _.status === 0 && !(_.responseURL && _.responseURL.indexOf("file:") === 0) || setTimeout(us);
      }, _.onabort = function() {
        !_ || (Ne(new l("Request aborted", l.ECONNABORTED, h, _)), _ = null);
      }, _.onerror = function() {
        Ne(new l("Network Error", l.ERR_NETWORK, h, _, _)), _ = null;
      }, _.ontimeout = function() {
        var Ae = h.timeout ? "timeout of " + h.timeout + "ms exceeded" : "timeout exceeded", ke = h.transitional || o;
        h.timeoutErrorMessage && (Ae = h.timeoutErrorMessage), Ne(new l(
          Ae,
          ke.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED,
          h,
          _
        )), _ = null;
      }, e.isStandardBrowserEnv()) {
        var ds = (h.withCredentials || i(Jt)) && h.xsrfCookieName ? r.read(h.xsrfCookieName) : void 0;
        ds && (et[h.xsrfHeaderName] = ds);
      }
      "setRequestHeader" in _ && e.forEach(et, function(Ae, ke) {
        typeof Ke > "u" && ke.toLowerCase() === "content-type" ? delete et[ke] : _.setRequestHeader(ke, Ae);
      }), e.isUndefined(h.withCredentials) || (_.withCredentials = !!h.withCredentials), tt && tt !== "json" && (_.responseType = h.responseType), typeof h.onDownloadProgress == "function" && _.addEventListener("progress", h.onDownloadProgress), typeof h.onUploadProgress == "function" && _.upload && _.upload.addEventListener("progress", h.onUploadProgress), (h.cancelToken || h.signal) && (Ce = function(X) {
        !_ || (Ne(!X || X && X.type ? new d() : X), _.abort(), _ = null);
      }, h.cancelToken && h.cancelToken.subscribe(Ce), h.signal && (h.signal.aborted ? Ce() : h.signal.addEventListener("abort", Ce))), Ke || (Ke = null);
      var Zt = m(Jt);
      if (Zt && ["http", "https", "file"].indexOf(Zt) === -1) {
        Ne(new l("Unsupported protocol " + Zt + ":", l.ERR_BAD_REQUEST, h));
        return;
      }
      _.send(Ke);
    });
  }, lr;
}
var ur, ks;
function xd() {
  return ks || (ks = 1, ur = null), ur;
}
var E = F, Ms = pd, xs = Xe, Td = Bn, Yd = zn, Rd = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function Ts(e, t) {
  !E.isUndefined(e) && E.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function Ed() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = Ds()), e;
}
function Fd(e, t, r) {
  if (E.isString(e))
    try {
      return (t || JSON.parse)(e), E.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (r || JSON.stringify)(e);
}
var Ht = {
  transitional: Td,
  adapter: Ed(),
  transformRequest: [function(t, r) {
    if (Ms(r, "Accept"), Ms(r, "Content-Type"), E.isFormData(t) || E.isArrayBuffer(t) || E.isBuffer(t) || E.isStream(t) || E.isFile(t) || E.isBlob(t))
      return t;
    if (E.isArrayBufferView(t))
      return t.buffer;
    if (E.isURLSearchParams(t))
      return Ts(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString();
    var s = E.isObject(t), n = r && r["Content-Type"], a;
    if ((a = E.isFileList(t)) || s && n === "multipart/form-data") {
      var i = this.env && this.env.FormData;
      return Yd(a ? { "files[]": t } : t, i && new i());
    } else if (s || n === "application/json")
      return Ts(r, "application/json"), Fd(t);
    return t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional || Ht.transitional, s = r && r.silentJSONParsing, n = r && r.forcedJSONParsing, a = !s && this.responseType === "json";
    if (a || n && E.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (i) {
        if (a)
          throw i.name === "SyntaxError" ? xs.from(i, xs.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    return t;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: xd()
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
E.forEach(["delete", "get", "head"], function(t) {
  Ht.headers[t] = {};
});
E.forEach(["post", "put", "patch"], function(t) {
  Ht.headers[t] = E.merge(Rd);
});
var ts = Ht, Pd = F, Nd = ts, Cd = function(t, r, s) {
  var n = this || Nd;
  return Pd.forEach(s, function(i) {
    t = i.call(n, t, r);
  }), t;
}, dr, Ys;
function Jn() {
  return Ys || (Ys = 1, dr = function(t) {
    return !!(t && t.__CANCEL__);
  }), dr;
}
var Rs = F, fr = Cd, Ad = Jn(), Ld = ts, Wd = Vt();
function cr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Wd();
}
var Ud = function(t) {
  cr(t), t.headers = t.headers || {}, t.data = fr.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = Rs.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), Rs.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(n) {
      delete t.headers[n];
    }
  );
  var r = t.adapter || Ld.adapter;
  return r(t).then(function(n) {
    return cr(t), n.data = fr.call(
      t,
      n.data,
      n.headers,
      t.transformResponse
    ), n;
  }, function(n) {
    return Ad(n) || (cr(t), n && n.response && (n.response.data = fr.call(
      t,
      n.response.data,
      n.response.headers,
      t.transformResponse
    ))), Promise.reject(n);
  });
}, $ = F, Zn = function(t, r) {
  r = r || {};
  var s = {};
  function n(m, p) {
    return $.isPlainObject(m) && $.isPlainObject(p) ? $.merge(m, p) : $.isPlainObject(p) ? $.merge({}, p) : $.isArray(p) ? p.slice() : p;
  }
  function a(m) {
    if ($.isUndefined(r[m])) {
      if (!$.isUndefined(t[m]))
        return n(void 0, t[m]);
    } else
      return n(t[m], r[m]);
  }
  function i(m) {
    if (!$.isUndefined(r[m]))
      return n(void 0, r[m]);
  }
  function o(m) {
    if ($.isUndefined(r[m])) {
      if (!$.isUndefined(t[m]))
        return n(void 0, t[m]);
    } else
      return n(void 0, r[m]);
  }
  function l(m) {
    if (m in r)
      return n(t[m], r[m]);
    if (m in t)
      return n(void 0, t[m]);
  }
  var d = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l
  };
  return $.forEach(Object.keys(t).concat(Object.keys(r)), function(p) {
    var h = d[p] || a, V = h(p);
    $.isUndefined(V) && h !== l || (s[p] = V);
  }), s;
}, hr, Es;
function Qn() {
  return Es || (Es = 1, hr = {
    version: "0.27.2"
  }), hr;
}
var Id = Qn().version, we = Xe, rs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  rs[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var Fs = {};
rs.transitional = function(t, r, s) {
  function n(a, i) {
    return "[Axios v" + Id + "] Transitional option '" + a + "'" + i + (s ? ". " + s : "");
  }
  return function(a, i, o) {
    if (t === !1)
      throw new we(
        n(i, " has been removed" + (r ? " in " + r : "")),
        we.ERR_DEPRECATED
      );
    return r && !Fs[i] && (Fs[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, i, o) : !0;
  };
};
function $d(e, t, r) {
  if (typeof e != "object")
    throw new we("options must be an object", we.ERR_BAD_OPTION_VALUE);
  for (var s = Object.keys(e), n = s.length; n-- > 0; ) {
    var a = s[n], i = t[a];
    if (i) {
      var o = e[a], l = o === void 0 || i(o, a, e);
      if (l !== !0)
        throw new we("option " + a + " must be " + l, we.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new we("Unknown option " + a, we.ERR_BAD_OPTION);
  }
}
var jd = {
  assertOptions: $d,
  validators: rs
}, Xn = F, qd = jn, Ps = md, Ns = Ud, Bt = Zn, Vd = Gn, Kn = jd, Ue = Kn.validators;
function Je(e) {
  this.defaults = e, this.interceptors = {
    request: new Ps(),
    response: new Ps()
  };
}
Je.prototype.request = function(t, r) {
  typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Bt(this.defaults, r), r.method ? r.method = r.method.toLowerCase() : this.defaults.method ? r.method = this.defaults.method.toLowerCase() : r.method = "get";
  var s = r.transitional;
  s !== void 0 && Kn.assertOptions(s, {
    silentJSONParsing: Ue.transitional(Ue.boolean),
    forcedJSONParsing: Ue.transitional(Ue.boolean),
    clarifyTimeoutError: Ue.transitional(Ue.boolean)
  }, !1);
  var n = [], a = !0;
  this.interceptors.request.forEach(function(V) {
    typeof V.runWhen == "function" && V.runWhen(r) === !1 || (a = a && V.synchronous, n.unshift(V.fulfilled, V.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function(V) {
    i.push(V.fulfilled, V.rejected);
  });
  var o;
  if (!a) {
    var l = [Ns, void 0];
    for (Array.prototype.unshift.apply(l, n), l = l.concat(i), o = Promise.resolve(r); l.length; )
      o = o.then(l.shift(), l.shift());
    return o;
  }
  for (var d = r; n.length; ) {
    var m = n.shift(), p = n.shift();
    try {
      d = m(d);
    } catch (h) {
      p(h);
      break;
    }
  }
  try {
    o = Ns(d);
  } catch (h) {
    return Promise.reject(h);
  }
  for (; i.length; )
    o = o.then(i.shift(), i.shift());
  return o;
};
Je.prototype.getUri = function(t) {
  t = Bt(this.defaults, t);
  var r = Vd(t.baseURL, t.url);
  return qd(r, t.params, t.paramsSerializer);
};
Xn.forEach(["delete", "get", "head", "options"], function(t) {
  Je.prototype[t] = function(r, s) {
    return this.request(Bt(s || {}, {
      method: t,
      url: r,
      data: (s || {}).data
    }));
  };
});
Xn.forEach(["post", "put", "patch"], function(t) {
  function r(s) {
    return function(a, i, o) {
      return this.request(Bt(o || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  Je.prototype[t] = r(), Je.prototype[t + "Form"] = r(!0);
});
var Hd = Je, mr, Cs;
function Bd() {
  if (Cs)
    return mr;
  Cs = 1;
  var e = Vt();
  function t(r) {
    if (typeof r != "function")
      throw new TypeError("executor must be a function.");
    var s;
    this.promise = new Promise(function(i) {
      s = i;
    });
    var n = this;
    this.promise.then(function(a) {
      if (!!n._listeners) {
        var i, o = n._listeners.length;
        for (i = 0; i < o; i++)
          n._listeners[i](a);
        n._listeners = null;
      }
    }), this.promise.then = function(a) {
      var i, o = new Promise(function(l) {
        n.subscribe(l), i = l;
      }).then(a);
      return o.cancel = function() {
        n.unsubscribe(i);
      }, o;
    }, r(function(i) {
      n.reason || (n.reason = new e(i), s(n.reason));
    });
  }
  return t.prototype.throwIfRequested = function() {
    if (this.reason)
      throw this.reason;
  }, t.prototype.subscribe = function(s) {
    if (this.reason) {
      s(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(s) : this._listeners = [s];
  }, t.prototype.unsubscribe = function(s) {
    if (!!this._listeners) {
      var n = this._listeners.indexOf(s);
      n !== -1 && this._listeners.splice(n, 1);
    }
  }, t.source = function() {
    var s, n = new t(function(i) {
      s = i;
    });
    return {
      token: n,
      cancel: s
    };
  }, mr = t, mr;
}
var yr, As;
function zd() {
  return As || (As = 1, yr = function(t) {
    return function(s) {
      return t.apply(null, s);
    };
  }), yr;
}
var pr, Ls;
function Gd() {
  if (Ls)
    return pr;
  Ls = 1;
  var e = F;
  return pr = function(r) {
    return e.isObject(r) && r.isAxiosError === !0;
  }, pr;
}
var Ws = F, Jd = Un, Ot = Hd, Zd = Zn, Qd = ts;
function ea(e) {
  var t = new Ot(e), r = Jd(Ot.prototype.request, t);
  return Ws.extend(r, Ot.prototype, t), Ws.extend(r, t), r.create = function(n) {
    return ea(Zd(e, n));
  }, r;
}
var I = ea(Qd);
I.Axios = Ot;
I.CanceledError = Vt();
I.CancelToken = Bd();
I.isCancel = Jn();
I.VERSION = Qn().version;
I.toFormData = zn;
I.AxiosError = Xe;
I.Cancel = I.CanceledError;
I.all = function(t) {
  return Promise.all(t);
};
I.spread = zd();
I.isAxiosError = Gd();
Jr.exports = I;
Jr.exports.default = I;
(function(e) {
  e.exports = Jr.exports;
})(Wn);
const J = /* @__PURE__ */ Hu(Wn.exports), nt = z({
  default: []
});
function ft() {
  return {
    createBag(e) {
      nt[e] = [];
    },
    set(e, t = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      nt[t] = Object.keys(e.response.data.errors).map((s) => ({
        key: s,
        message: e.response.data.errors[s][0]
      }));
    },
    get(e, t = "default") {
      const r = nt[t];
      if (!r)
        return {
          message: "",
          variant: ""
        };
      const s = r.find(
        (n) => Array.isArray(e) ? e.includes(n.key) : n.key === e
      );
      return s ? {
        message: s.message,
        variant: "danger"
      } : {
        message: "",
        variant: ""
      };
    },
    clear(e, t = "default") {
      if (e) {
        const r = nt[t];
        if (!r) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const s = r.findIndex((n) => n.key === e);
        r.splice(s, 1);
        return;
      }
      nt[t] = [];
    }
  };
}
class zt {
  constructor({
    submitPath: t,
    submitMethod: r = "post",
    loadPath: s = "",
    bag: n = "default",
    form: a = {}
  } = {}) {
    v(this, "loadPath", "");
    v(this, "submitPath", "");
    v(this, "submitMethod", "post");
    v(this, "errors", null);
    v(this, "errorBag", "");
    v(this, "model", z({}));
    v(this, "form", z({}));
    v(this, "original", {});
    v(this, "states", {
      load: new W(),
      submit: new W()
    });
    return this.submitPath = t, this.submitMethod = r, this.loadPath = s, this.errorBag = n, this.errors = ft(), this.errors.createBag(this.errorBag), this.setAttributes(a), this.states.load.loaded(), new Proxy(this, {
      get(i, o, l) {
        return Reflect.has(i, o) ? Reflect.get(i, o, l) : o in i.form ? i.form[o] : null;
      },
      set(i, o, l, d) {
        return Reflect.has(i, o) ? Reflect.set(i, o, l, d) : o in i.form ? (i.form[o] = l, !0) : null;
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
    this.errorBag = t || "default", this.errors = ft(), this.errors.createBag(this.errorBag);
  }
  setAttributes(t) {
    this.original = t, this.form = z({ ...t });
  }
  getError(t) {
    return this.errors.get(t, this.errorBag);
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag);
  }
  async submit({ path: t = this.submitPath, formatter: r = null, config: s = {} } = {}) {
    if (typeof t != "string")
      throw new Error("Path must be a string");
    if (r !== null && typeof r != "function")
      throw new Error("Formatter must be a function");
    if (typeof s != "object")
      throw new Error("Config must be an object");
    this.clearErrors(), this.submitting();
    const n = JSON.parse(JSON.stringify(this.form)), a = r ? r(this.form) : n;
    if (!t)
      return this.handleSubmissionFailure("No url defined.");
    const i = (s == null ? void 0 : s.method) || this.submitMethod || "post";
    try {
      const { data: o } = await J[i](t, a, s);
      return this.clearErrors(), this.submitted(), o;
    } catch (o) {
      return this.handleSubmissionFailure(o);
    }
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(t) {
    throw this.submitFailed(), this.errors.set(t, this.errorBag), t;
  }
  async advancedSubmit(t) {
    this.states.submit.loading();
    const { data: r } = await Promise.resolve(t(J, this.form)).catch(
      (s) => {
        throw this.states.submit.failed(), this.errors.set(s, this.errorBag), s;
      }
    );
    return this.states.submit.loaded(), r;
  }
  async load({ path: t = "", params: r = {}, updateOriginal: s = !0 } = {}) {
    this.loading();
    const n = t || this.loadPath;
    if (!n)
      throw this.loadFailed(), Error("Url is not defined for the load method.");
    const { data: a } = await J.get(n, {
      params: r
    }).catch((i) => {
      throw this.loadFailed(), i;
    });
    return s && (this.original = a.form), Object.assign(this.form, a.form), a.model && Object.assign(this.model, a.model), this.loaded(), a;
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
const Xd = {
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
      type: zt,
      default: null
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
      this.query = e ? f(e, this.submitFormat)._d : null;
    }
  },
  mounted() {
    this.modelValue && (this.query = f(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(e) {
      return e ? f(e).format(this.displayFormat) : null;
    },
    updateQuery() {
      var e;
      this.$emit(
        "update:modelValue",
        this.query ? f(this.query).format(this.submitFormat) : null
      ), (e = this.form) == null || e.clearError(this.name);
    }
  }
};
function Kd(e, t, r, s, n, a) {
  var l;
  const i = U("o-datepicker"), o = U("o-field");
  return A(), De(o, ot({ label: r.label }, (l = r.form) == null ? void 0 : l.getError(r.name)), {
    default: G(() => [
      Oe(i, {
        modelValue: n.query,
        "onUpdate:modelValue": [
          t[0] || (t[0] = (d) => n.query = d),
          a.updateQuery
        ],
        "date-formatter": a.dateFormatter
      }, null, 8, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const ef = /* @__PURE__ */ se(Xd, [["render", Kd]]), tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ef
}, Symbol.toStringTag, { value: "Module" })), rf = {
  name: "WyxosForm",
  props: {
    form: {
      type: zt,
      required: !0
    }
  },
  emits: ["submit"]
}, sf = /* @__PURE__ */ Re(" An error occurred. Try again? ");
function nf(e, t, r, s, n, a) {
  const i = U("o-loading"), o = U("o-button");
  return A(), Ee("div", null, [
    r.form.isLoaded ? (A(), Ee("form", {
      key: 0,
      class: "form",
      onSubmit: t[0] || (t[0] = Sa((l) => e.$emit("submit"), ["prevent"]))
    }, [
      ze(e.$slots, "default")
    ], 32)) : je("", !0),
    Oe(i, {
      active: r.form.isLoading
    }, null, 8, ["active"]),
    r.form.isFailure ? (A(), De(o, {
      key: 1,
      onClick: t[1] || (t[1] = (l) => r.form.load())
    }, {
      default: G(() => [
        sf
      ]),
      _: 1
    })) : je("", !0)
  ]);
}
const af = /* @__PURE__ */ se(rf, [["render", nf]]), of = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: af
}, Symbol.toStringTag, { value: "Module" })), lf = {
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
}, uf = ["width", "height"];
function df(e, t, r, s, n, a) {
  return A(), Ee("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, uf);
}
const ff = /* @__PURE__ */ se(lf, [["render", df]]), cf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ff
}, Symbol.toStringTag, { value: "Module" })), hf = {
  name: "WyxosInput",
  props: {
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      required: !0
    },
    bag: {
      type: String,
      default: () => "default"
    }
  },
  setup() {
    return {
      errors: ft()
    };
  },
  computed: {
    fieldAttrs() {
      const e = this.$attrs, t = {};
      return Object.keys(e).forEach((r) => {
        /^field-/.test(r) && (t[r.replace(/^field-/, "")] = e[r]);
      }), t;
    },
    inputAttrs() {
      const e = this.$attrs, t = {};
      return Object.keys(e).forEach((r) => {
        /^field-/.test(r) || (t[r] = e[r]);
      }), t;
    }
  }
};
function mf(e, t, r, s, n, a) {
  const i = U("o-input"), o = U("o-field");
  return A(), De(o, ot({ label: r.label }, { ...s.errors.get(r.name, r.bag), ...a.fieldAttrs }), {
    default: G(() => [
      Oe(i, ot(a.inputAttrs, {
        onInput: t[0] || (t[0] = (l) => s.errors.clear(r.name, r.bag))
      }), null, 16)
    ]),
    _: 1
  }, 16, ["label"]);
}
const yf = /* @__PURE__ */ se(hf, [["render", mf]]), pf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yf
}, Symbol.toStringTag, { value: "Module" }));
function xe(e, t, r = void 0) {
  const s = t.split(".").reduce((n, a) => typeof n < "u" ? n[a] : void 0, e);
  return typeof s < "u" ? s : r;
}
function Mr(e) {
  return typeof e < "u" && e !== null ? e : "";
}
function _f(e, t) {
  return e.indexOf(t, e.length - t.length) !== -1;
}
let gf = {
  iconPack: "mdi",
  useHtml5Validation: !0,
  statusIcon: !0,
  transformClasses: void 0
};
const wf = () => gf, Us = (e, t) => Mr(e).split(" ").filter((r) => r.length > 0).map((r) => r + t).join(" "), Is = (e) => {
  const r = (e.$options.computed ? Object.keys(e.$options.computed) : []).filter((s) => !_f(s, "Classes")).reduce((s, n) => (s[n] = e[n], s), {});
  return { props: e.$props, data: e.$data, computed: r };
};
ba({
  isOruga: !0,
  props: {
    override: Boolean
  },
  methods: {
    computedClass(e, t, r = "") {
      const s = this.$props.override === !0 ? {} : wf(), n = this.$props.override || xe(s, `${this.$options.configField}.override`, !1), a = xe(s, `${this.$options.configField}.${e}.override`, n), i = xe(s, "transformClasses", void 0), o = xe(s, `${this.$options.configField}.transformClasses`, void 0);
      let l = xe(s, `${this.$options.configField}.${e}.class`, "") || xe(s, `${this.$options.configField}.${e}`, ""), d = xe(this.$props, e);
      Array.isArray(d) && (d = d.join(" ")), t.search("{*}") !== -1 ? t = t.replace(/\{\*\}/g, r) : t = t + r;
      let m = null;
      typeof d == "function" ? (m = Is(this), d = d(r, m)) : d = Us(d, r), typeof l == "function" ? l = l(r, m || Is(this)) : l = Us(l, r);
      let p = `${n && !a || !n && !a ? t : ""} ${Mr(l)} ${Mr(d)}`.trim().replace(/\s\s+/g, " ");
      return o && (p = o(p)), i && (p = i(p)), p;
    }
  }
});
const ta = {};
function vf(e, t) {
  ta[e] = t;
}
function Sf() {
  return { oruga: ta, addProgrammatic: vf };
}
function $s(e, t = {}) {
  var a;
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
  const s = r[(a = e.response) == null ? void 0 : a.status] || r[500], { oruga: n } = Sf();
  if (n.notification.open({
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
const bf = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: e } = await J.post(this.path).catch((t) => {
        if (t.response.status === 401) {
          window.location.href = "/";
          return;
        }
        $s(t);
      }).catch($s);
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function Of(e, t, r, s, n, a) {
  return A(), Ee("li", null, [
    ze(e.$slots, "default", { logout: a.logout }, () => [
      H("button", {
        class: "button is-primary",
        onClick: t[0] || (t[0] = (i) => a.logout())
      }, "Sign out")
    ])
  ]);
}
const Df = /* @__PURE__ */ se(bf, [["render", Of]]), kf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Df
}, Symbol.toStringTag, { value: "Module" })), Mf = {
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
      state: new W()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, xf = { class: "button-group" };
function Tf(e, t, r, s, n, a) {
  const i = U("wyxos-button"), o = U("o-modal");
  return A(), De(o, { active: !0 }, {
    default: G(() => [
      H("h2", null, ie(r.title), 1),
      H("p", null, ie(r.message), 1),
      H("div", xf, [
        Oe(i, {
          disabled: s.state.isLoading,
          "native-type": "button",
          onClick: t[0] || (t[0] = (l) => e.$emit("close", { action: !1 }))
        }, {
          default: G(() => [
            Re(ie(r.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        Oe(i, {
          loading: s.state.isLoading,
          "native-type": "button",
          onClick: t[1] || (t[1] = (l) => a.proceed())
        }, {
          default: G(() => [
            Re(ie(r.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const Yf = /* @__PURE__ */ se(Mf, [["render", Tf]]), Rf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yf
}, Symbol.toStringTag, { value: "Module" })), Ef = {
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
      type: zt,
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
}, Ff = ["value"];
function Pf(e, t, r, s, n, a) {
  var l;
  const i = U("o-select"), o = U("o-field");
  return A(), De(o, ot({ label: r.label }, (l = r.form) == null ? void 0 : l.getError(r.name)), {
    default: G(() => [
      Oe(i, {
        disabled: r.disabled,
        "model-value": r.modelValue,
        name: r.name,
        placeholder: r.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (d) => a.updateValue(d))
      }, {
        default: G(() => [
          ze(e.$slots, "default", {}, () => [
            r.items ? (A(!0), Ee(Oa, { key: 0 }, Da(r.items, (d) => (A(), Ee("option", {
              key: d.value,
              value: d.value
            }, ie(d.label), 9, Ff))), 128)) : je("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Nf = /* @__PURE__ */ se(Ef, [["render", Pf]]), Cf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nf
}, Symbol.toStringTag, { value: "Module" }));
class Gt {
  constructor(t = {}) {
    v(this, "state", new W());
    v(this, "result", _r([]));
    v(this, "value", _r(null));
    v(this, "timeout", null);
    v(this, "options", {
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
    return new Gt(t);
  }
  getEvents({ searchPayloadFormatter: t = null } = {}) {
    return {
      "update:model-value": (r) => (console.log("triggered", r), this.value.value = r, this.search(t))
    };
  }
  search(t) {
    const r = { value: this.value.value }, s = t ? t(r) : r;
    return this.customSearch({ payload: s });
  }
  async customSearch({ url: t, payload: r }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)), this.controller = new AbortController(), this.timeout = setTimeout(async () => {
      this.state.loading(), this.reset();
      const s = t || this.options.url, { data: n } = await J.post(`${s}/search`, r || this.options.payload, {
        signal: this.controller.signal
      }).catch((a) => {
        throw this.state.failed(), a;
      });
      this.result.value = n.result, this.state.loaded();
    }, 500);
  }
  async restore(t, r) {
    this.state.loading(), this.reset();
    const s = t || this.options.url, { data: n } = await J.post(`${s}/restore`, r || this.options.payload).catch((a) => {
      throw this.state.failed(), a;
    });
    return this.state.loaded(), n;
  }
  reset() {
    this.result.value = [];
  }
}
const Af = {
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
      search: Gt.create()
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
function Lf(e, t, r, s, n, a) {
  const i = U("o-inputitems");
  return A(), De(i, ot({
    ref: "tagInput",
    modelValue: n.query,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => n.query = o),
    data: s.search.result.value,
    "allow-autocomplete": ""
  }, e.$attrs, {
    onAdd: t[1] || (t[1] = (o) => a.addedTag(o)),
    onRemove: t[2] || (t[2] = (o) => a.removedTag(o)),
    onTyping: t[3] || (t[3] = (o) => a.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const Wf = /* @__PURE__ */ se(Af, [["render", Lf]]), Uf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wf
}, Symbol.toStringTag, { value: "Module" }));
class If {
  constructor() {
    v(this, "structure", {});
    v(this, "query", z({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    v(this, "params", z({
      page: 1
    }));
    v(this, "router", null);
  }
  static create(t, r = {}, s = {}, n) {
    s = Object.assign(
      { base: "/api/admin", route: `${t}.index` },
      s
    );
    const a = s.base, i = {
      route: s.route,
      index: s.index || `${a}/${t}/index`,
      destroy: `${a}/${t}/destroy`
    }, o = new this();
    return o.options = s, o.structure = r, o.params = Object.assign(o.params, r), o.router = n, o.urls = i, o;
  }
  async fetch(t) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: r } = await J.get(t || this.urls.index, {
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
  async action(t, { row: r, index: s, remove: n, method: a }, i = {}) {
    r.isProcessing = !0;
    const o = {
      id: r.id,
      ...i
    };
    if (a === "delete") {
      const { data: l } = await J.delete(t, {
        data: o
      }).catch((d) => {
        throw r.isProcessing = !1, d;
      });
      r.isProcessing = !1, l.row && Object.assign(r, l.row);
    } else {
      const { data: l } = await J.post(t, o).catch((d) => {
        throw r.isProcessing = !1, d;
      });
      r.isProcessing = !1, l.row && Object.assign(r, l.row);
    }
    if (n) {
      const l = await this.fetch();
      if (this.query.items.splice(s, 1), !l.query.items.length) {
        this.params.page--, await this.load();
        return;
      }
      this.query.items.length < l.query.items.length && this.query.items.push(l.query.items[l.query.items.length - 1]);
    }
  }
  destroy(t, r) {
    return this.action(this.urls.destroy, { ...t, remove: !0 }, r);
  }
  async resetFilter(t = null) {
    Object.assign(this.params, this.structure), this.query.isFilterActive = !1, await this.load(t);
  }
}
const ra = "%[a-f0-9]{2}", js = new RegExp("(" + ra + ")|([^%]+?)", "gi"), qs = new RegExp("(" + ra + ")+", "gi");
function xr(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  t = t || 1;
  const r = e.slice(0, t), s = e.slice(t);
  return Array.prototype.concat.call([], xr(r), xr(s));
}
function $f(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(js) || [];
    for (let r = 1; r < t.length; r++)
      e = xr(t, r).join(""), t = e.match(js) || [];
    return e;
  }
}
function jf(e) {
  const t = {
    "%FE%FF": "\uFFFD\uFFFD",
    "%FF%FE": "\uFFFD\uFFFD"
  };
  let r = qs.exec(e);
  for (; r; ) {
    try {
      t[r[0]] = decodeURIComponent(r[0]);
    } catch {
      const n = $f(r[0]);
      n !== r[0] && (t[r[0]] = n);
    }
    r = qs.exec(e);
  }
  t["%C2"] = "\uFFFD";
  const s = Object.keys(t);
  for (const n of s)
    e = e.replace(new RegExp(n, "g"), t[n]);
  return e;
}
function qf(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return jf(e);
  }
}
function sa(e, t) {
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
function Vf(e, t) {
  const r = {};
  if (Array.isArray(t))
    for (const s of t) {
      const n = Object.getOwnPropertyDescriptor(e, s);
      n != null && n.enumerable && Object.defineProperty(r, s, n);
    }
  else
    for (const s of Reflect.ownKeys(e)) {
      const n = Object.getOwnPropertyDescriptor(e, s);
      if (n.enumerable) {
        const a = e[s];
        t(s, a, e) && Object.defineProperty(r, s, n);
      }
    }
  return r;
}
const Hf = (e) => e == null, Bf = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), Tr = Symbol("encodeFragmentIdentifier");
function zf(e) {
  switch (e.arrayFormat) {
    case "index":
      return (t) => (r, s) => {
        const n = r.length;
        return s === void 0 || e.skipNull && s === null || e.skipEmptyString && s === "" ? r : s === null ? [
          ...r,
          [Y(t, e), "[", n, "]"].join("")
        ] : [
          ...r,
          [Y(t, e), "[", Y(n, e), "]=", Y(s, e)].join("")
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
      return (r) => (s, n) => n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? s : (n = n === null ? "" : n, s.length === 0 ? [[Y(r, e), t, Y(n, e)].join("")] : [[s, Y(n, e)].join(e.arrayFormatSeparator)]);
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
function Gf(e) {
  let t;
  switch (e.arrayFormat) {
    case "index":
      return (r, s, n) => {
        if (t = /\[(\d*)]$/.exec(r), r = r.replace(/\[\d*]$/, ""), !t) {
          n[r] = s;
          return;
        }
        n[r] === void 0 && (n[r] = {}), n[r][t[1]] = s;
      };
    case "bracket":
      return (r, s, n) => {
        if (t = /(\[])$/.exec(r), r = r.replace(/\[]$/, ""), !t) {
          n[r] = s;
          return;
        }
        if (n[r] === void 0) {
          n[r] = [s];
          return;
        }
        n[r] = [...n[r], s];
      };
    case "colon-list-separator":
      return (r, s, n) => {
        if (t = /(:list)$/.exec(r), r = r.replace(/:list$/, ""), !t) {
          n[r] = s;
          return;
        }
        if (n[r] === void 0) {
          n[r] = [s];
          return;
        }
        n[r] = [...n[r], s];
      };
    case "comma":
    case "separator":
      return (r, s, n) => {
        const a = typeof s == "string" && s.includes(e.arrayFormatSeparator), i = typeof s == "string" && !a && ce(s, e).includes(e.arrayFormatSeparator);
        s = i ? ce(s, e) : s;
        const o = a || i ? s.split(e.arrayFormatSeparator).map((l) => ce(l, e)) : s === null ? s : ce(s, e);
        n[r] = o;
      };
    case "bracket-separator":
      return (r, s, n) => {
        const a = /(\[])$/.test(r);
        if (r = r.replace(/\[]$/, ""), !a) {
          n[r] = s && ce(s, e);
          return;
        }
        const i = s === null ? [] : s.split(e.arrayFormatSeparator).map((o) => ce(o, e));
        if (n[r] === void 0) {
          n[r] = i;
          return;
        }
        n[r] = [...n[r], ...i];
      };
    default:
      return (r, s, n) => {
        if (n[r] === void 0) {
          n[r] = s;
          return;
        }
        n[r] = [...[n[r]].flat(), s];
      };
  }
}
function na(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function Y(e, t) {
  return t.encode ? t.strict ? Bf(e) : encodeURIComponent(e) : e;
}
function ce(e, t) {
  return t.decode ? qf(e) : e;
}
function aa(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? aa(Object.keys(e)).sort((t, r) => Number(t) - Number(r)).map((t) => e[t]) : e;
}
function ia(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function Jf(e) {
  let t = "";
  const r = e.indexOf("#");
  return r !== -1 && (t = e.slice(r)), t;
}
function Vs(e, t) {
  return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function ss(e) {
  e = ia(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function ns(e, t) {
  t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...t
  }, na(t.arrayFormatSeparator);
  const r = Gf(t), s = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return s;
  for (const n of e.split("&")) {
    if (n === "")
      continue;
    const a = t.decode ? n.replace(/\+/g, " ") : n;
    let [i, o] = sa(a, "=");
    i === void 0 && (i = a), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? o : ce(o, t), r(ce(i, t), o, s);
  }
  for (const [n, a] of Object.entries(s))
    if (typeof a == "object" && a !== null)
      for (const [i, o] of Object.entries(a))
        a[i] = Vs(o, t);
    else
      s[n] = Vs(a, t);
  return t.sort === !1 ? s : (t.sort === !0 ? Object.keys(s).sort() : Object.keys(s).sort(t.sort)).reduce((n, a) => {
    const i = s[a];
    return Boolean(i) && typeof i == "object" && !Array.isArray(i) ? n[a] = aa(i) : n[a] = i, n;
  }, /* @__PURE__ */ Object.create(null));
}
function oa(e, t) {
  if (!e)
    return "";
  t = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...t
  }, na(t.arrayFormatSeparator);
  const r = (i) => t.skipNull && Hf(e[i]) || t.skipEmptyString && e[i] === "", s = zf(t), n = {};
  for (const [i, o] of Object.entries(e))
    r(i) || (n[i] = o);
  const a = Object.keys(n);
  return t.sort !== !1 && a.sort(t.sort), a.map((i) => {
    const o = e[i];
    return o === void 0 ? "" : o === null ? Y(i, t) : Array.isArray(o) ? o.length === 0 && t.arrayFormat === "bracket-separator" ? Y(i, t) + "[]" : o.reduce(s(i), []).join("&") : Y(i, t) + "=" + Y(o, t);
  }).filter((i) => i.length > 0).join("&");
}
function la(e, t) {
  var n, a;
  t = {
    decode: !0,
    ...t
  };
  let [r, s] = sa(e, "#");
  return r === void 0 && (r = e), {
    url: (a = (n = r == null ? void 0 : r.split("?")) == null ? void 0 : n[0]) != null ? a : "",
    query: ns(ss(e), t),
    ...t && t.parseFragmentIdentifier && s ? { fragmentIdentifier: ce(s, t) } : {}
  };
}
function ua(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [Tr]: !0,
    ...t
  };
  const r = ia(e.url).split("?")[0] || "", s = ss(e.url), n = {
    ...ns(s, { sort: !1 }),
    ...e.query
  };
  let a = oa(n, t);
  a && (a = `?${a}`);
  let i = Jf(e.url);
  if (e.fragmentIdentifier) {
    const o = new URL(r);
    o.hash = e.fragmentIdentifier, i = t[Tr] ? o.hash : `#${e.fragmentIdentifier}`;
  }
  return `${r}${a}${i}`;
}
function da(e, t, r) {
  r = {
    parseFragmentIdentifier: !0,
    [Tr]: !1,
    ...r
  };
  const { url: s, query: n, fragmentIdentifier: a } = la(e, r);
  return ua({
    url: s,
    query: Vf(n, t),
    fragmentIdentifier: a
  }, r);
}
function Zf(e, t, r) {
  const s = Array.isArray(t) ? (n) => !t.includes(n) : (n, a) => !t(n, a);
  return da(e, s, r);
}
const Hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  extract: ss,
  parse: ns,
  stringify: oa,
  parseUrl: la,
  stringifyUrl: ua,
  pick: da,
  exclude: Zf
}, Symbol.toStringTag, { value: "Module" }));
let gt;
class as {
  constructor() {
    v(this, "api", null);
    v(this, "baseUrl", null);
    v(this, "structure", null);
    v(this, "options", null);
    v(this, "errors", null);
    v(this, "errorBag", "default");
    v(this, "states", {
      load: W.create(),
      fetch: W.create(),
      filter: W.create()
    });
    v(this, "query", z({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    v(this, "params", z({
      page: 1
    }));
    v(this, "state", z({
      isFilterActive: !1
    }));
  }
  get tableConfig() {
    return {
      data: this.query.items,
      total: this.query.total,
      currentPage: this.params.page,
      perPage: this.query.perPage,
      loading: this.isLoading
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
    const s = new as();
    if (!t)
      throw Error("Structure of search query required.");
    return s.errors = ft(), s.errors.createBag(this.errorBag), s.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (n) => n
      },
      r
    ), s.setParameters(t), s.options.enableSearchUpdate && s.mergeSearch(), s.baseUrl = r.baseUrl, s.api = J.create(r.axios || {}), s;
  }
  setParameters(t) {
    const r = JSON.parse(JSON.stringify(t));
    this.structure = Object.assign({}, r), this.params = z(t);
  }
  mergeSearch() {
    const t = Hs.parse(window.location.search, {
      arrayFormat: "bracket"
    });
    t.page && (t.page = Number(t.page)), Object.assign(this.params, this.structure, t);
  }
  async fetch(t, r) {
    this.states.fetch.loading();
    const s = JSON.parse(JSON.stringify(this.params)), n = t || this.baseUrl, { data: a } = await this.api.get(n, {
      params: s,
      cancelToken: r
    }).catch((i) => {
      throw this.states.fetch.failed(), i;
    });
    return this.states.fetch.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), a;
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
      Object.entries(r).filter(([a, i]) => i != null)
    ), n = t + "?" + Hs.stringify(s, { arrayFormat: "bracket" });
    window.history.replaceState({}, "", n);
  }
  push(t) {
    this.query.items.push(this.transformItem(t));
  }
  transformItem(t) {
    return this.options.transformItem({
      ...t,
      states: {
        delete: new W(),
        patch: new W()
      }
    });
  }
  async load(t) {
    this.errors.clear(null, this.errorBag), gt && gt.cancel(), gt = J.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let r = null;
    try {
      r = await this.fetch(t, gt.token);
    } catch (s) {
      if (J.isCancel(s)) {
        console.log("Request cancelled");
        return;
      } else
        throw this.states.fetch.failed(), this.errors.set(s, this.errorBag), s;
    }
    if (this.states.fetch.loaded(), !r || !r.query || !r.query.items)
      throw this.states.fetch.failed(), Error("Response format is invalid.");
    return Object.assign(this.query, r.query, {
      items: r.query.items.map((s) => this.transformItem(s))
    }), r;
  }
  onPageChange(t) {
    return this.params.page = t, this.load();
  }
  async patch({ path: t, props: r, payload: s } = {}) {
    const { row: n } = r;
    s = {
      id: n.id,
      ...s
    };
    const { data: a } = await this.api.patch(t || this.baseUrl, s).catch((o) => {
      throw o;
    });
    return a.patch && Object.assign(n, a.patch), (await this.fetch()).query.items.length || (this.params.page--, await this.load()), a;
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
  async processRowAndRefreshList({ path: t, props: r, payload: s, state: n, method: a } = {}) {
    const { row: i, index: o } = r;
    s = {
      id: i.id,
      ...s
    };
    let l = i.states[n];
    l || (l = i.states[n] = W.create()), l.loading();
    const { data: d } = await this.api[a](
      t || this.baseUrl,
      s
    ).catch((p) => {
      throw l.failed(), p;
    });
    l.loaded(), d.row && Object.assign(i, d.row);
    const m = await this.fetch();
    if (this.query.items.splice(o, 1), !m.query.items.length)
      return this.params.page--, await this.load(), d;
    if (this.query.items.length < m.query.items.length) {
      const p = m.query.items[m.query.items.length - 1];
      this.push(p);
    }
    return d;
  }
  async applyFilter() {
    this.states.filter.loading(), await this.load().catch((t) => {
      throw this.states.filter.failed(), t;
    }), this.states.filter.loaded(), this.state.isFilterActive = !1;
  }
  showFilter() {
    this.state.isFilterActive = !0;
  }
  cancelFilter() {
    this.state.isFilterActive = !1;
  }
  async resetFilter(t = "url", r = null) {
    t === "url" ? this.mergeSearch() : t === "initial" && Object.assign(this.params, this.structure), this.state.isFilterActive = !1, await this.load(r);
  }
  getError(t) {
    return this.errors.get(t, this.errorBag);
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag);
  }
}
const Qf = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Xf {
  constructor() {
    v(this, "FORMATS", Qf);
  }
  format(t, r, s = "") {
    return t ? f(t).format(r) : s;
  }
}
const Kf = new Xf();
class is {
  constructor() {
    v(this, "state", _r(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new is();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class os {
  constructor(t) {
    v(this, "attributes", z({
      name: null
    }));
    v(this, "callbacks", {});
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
    return new os(t);
  }
}
const Be = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Ra, "./components/WyxosCollection.vue": Ca, "./components/WyxosConfirm.vue": qa, "./components/WyxosDatepicker.vue": tf, "./components/WyxosForm.vue": of, "./components/WyxosImage.vue": cf, "./components/WyxosInput.vue": pf, "./components/WyxosLogout.vue": kf, "./components/WyxosPrompt.vue": Rf, "./components/WyxosSelect.vue": Cf, "./components/WyxosTags.vue": Uf }), ec = (e) => {
  Object.keys(Be).forEach((t) => {
    const r = Be[t].default.name, s = Be[t].default;
    e.component(r, s), e.component(r.replace("Wyxos", "W"), s);
  });
}, fa = {};
Object.keys(Be).forEach((e) => {
  fa[Be[e].default.name] = Be[e].default;
});
const sc = {
  Search: Gt,
  FormBuilder: zt,
  ResourceList: If,
  Listing: as,
  LoadState: W,
  Modal: is,
  Tab: os,
  dateRender: Kf,
  useFormErrors: ft,
  ...fa,
  install: ec
};
export {
  zt as FormBuilder,
  as as Listing,
  W as LoadState,
  is as Modal,
  If as ResourceList,
  Gt as Search,
  os as Tab,
  Ya as WyxosButton,
  Na as WyxosCollection,
  ef as WyxosDatepicker,
  af as WyxosForm,
  ff as WyxosImage,
  yf as WyxosInput,
  Yf as WyxosPrompt,
  Wf as WyxosTags,
  Kf as dateRender,
  sc as default,
  ec as install,
  ft as useFormErrors
};
