var zn = Object.defineProperty;
var Gn = (e, t, r) => t in e ? zn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var E = (e, t, r) => (Gn(e, typeof t != "symbol" ? t + "" : t, r), r);
import { resolveComponent as A, openBlock as F, createBlock as ve, withCtx as q, renderSlot as Ve, createCommentVNode as Le, createTextVNode as De, toDisplayString as re, createElementBlock as Me, normalizeProps as Jn, guardReactiveProps as Zn, createElementVNode as V, reactive as tt, createVNode as ge, normalizeClass as Qn, mergeProps as nt, withModifiers as Xn, defineComponent as Kn, Fragment as ea, renderList as ta, ref as es } from "vue";
const K = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [s, n] of t)
    r[s] = n;
  return r;
}, ra = {
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
}, sa = /* @__PURE__ */ De("Submit"), na = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function aa(e, t, r, s, n, a) {
  const i = A("o-button");
  return F(), ve(i, { disabled: r.loading }, {
    default: q(() => [
      r.loading ? Le("", !0) : Ve(e.$slots, "default", { key: 0 }, () => [
        sa
      ]),
      r.loading && r.text ? Ve(e.$slots, "loading", { key: 1 }, () => [
        De(re(r.text), 1)
      ]) : Le("", !0),
      r.loading ? (F(), Me("i", na)) : Le("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const ia = /* @__PURE__ */ K(ra, [["render", aa]]), oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ia
}, Symbol.toStringTag, { value: "Module" })), la = {
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
}, ua = /* @__PURE__ */ V("ul", null, [
  /* @__PURE__ */ V("li")
], -1);
function da(e, t, r, s, n, a) {
  return Ve(e.$slots, "default", Jn(Zn({ add: a.add, remove: a.remove, items: n.items })), () => [
    ua
  ]);
}
const fa = /* @__PURE__ */ K(la, [["render", da]]), ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fa
}, Symbol.toStringTag, { value: "Module" }));
class xe {
  constructor() {
    E(this, "state", tt({
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
    return new xe();
  }
}
const ca = {
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
      state: new xe()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, ma = { class: "bg-white p-6" }, _a = { class: "title" }, ya = { class: "mb-6" }, pa = {
  class: "buttons",
  role: "group"
};
function ga(e, t, r, s, n, a) {
  const i = A("wyxos-button"), o = A("o-modal");
  return F(), ve(o, {
    active: !0,
    onClose: t[2] || (t[2] = (l) => e.$emit("close", { action: !1 }))
  }, {
    default: q(() => [
      V("section", ma, [
        V("article", null, [
          V("header", null, [
            V("h3", _a, re(r.title), 1)
          ]),
          V("p", ya, re(r.message), 1),
          V("footer", pa, [
            ge(i, {
              disabled: s.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (l) => e.$emit("close", { action: !1 }))
            }, {
              default: q(() => [
                De(re(r.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            ge(i, {
              class: Qn([{ [r.confirmType]: !0 }, "button"]),
              loading: s.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (l) => a.proceed())
            }, {
              default: q(() => [
                De(re(r.confirmText), 1)
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
const va = /* @__PURE__ */ K(ca, [["render", ga]]), wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: va
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Ps;
function f() {
  return Ps.apply(null, arguments);
}
function Sa(e) {
  Ps = e;
}
function Q(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function ke(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function S(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Sr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (S(e, t))
      return !1;
  return !0;
}
function W(e) {
  return e === void 0;
}
function fe(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function lt(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Ns(e, t) {
  var r = [], s, n = e.length;
  for (s = 0; s < n; ++s)
    r.push(t(e[s], s));
  return r;
}
function _e(e, t) {
  for (var r in t)
    S(t, r) && (e[r] = t[r]);
  return S(t, "toString") && (e.toString = t.toString), S(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ne(e, t, r, s) {
  return sn(e, t, r, s, !0).utc();
}
function ba() {
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
  return e._pf == null && (e._pf = ba()), e._pf;
}
var fr;
Array.prototype.some ? fr = Array.prototype.some : fr = function(e) {
  var t = Object(this), r = t.length >>> 0, s;
  for (s = 0; s < r; s++)
    if (s in t && e.call(this, t[s], s, t))
      return !0;
  return !1;
};
function br(e) {
  if (e._isValid == null) {
    var t = g(e), r = fr.call(t.parsedDateParts, function(n) {
      return n != null;
    }), s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (s = s && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = s;
    else
      return s;
  }
  return e._isValid;
}
function Mt(e) {
  var t = ne(NaN);
  return e != null ? _e(g(t), e) : g(t).userInvalidated = !0, t;
}
var ts = f.momentProperties = [], qt = !1;
function Or(e, t) {
  var r, s, n, a = ts.length;
  if (W(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), W(t._i) || (e._i = t._i), W(t._f) || (e._f = t._f), W(t._l) || (e._l = t._l), W(t._strict) || (e._strict = t._strict), W(t._tzm) || (e._tzm = t._tzm), W(t._isUTC) || (e._isUTC = t._isUTC), W(t._offset) || (e._offset = t._offset), W(t._pf) || (e._pf = g(t)), W(t._locale) || (e._locale = t._locale), a > 0)
    for (r = 0; r < a; r++)
      s = ts[r], n = t[s], W(n) || (e[s] = n);
  return e;
}
function ut(e) {
  Or(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), qt === !1 && (qt = !0, f.updateOffset(this), qt = !1);
}
function X(e) {
  return e instanceof ut || e != null && e._isAMomentObject != null;
}
function Cs(e) {
  f.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function B(e, t) {
  var r = !0;
  return _e(function() {
    if (f.deprecationHandler != null && f.deprecationHandler(null, e), r) {
      var s = [], n, a, i, o = arguments.length;
      for (a = 0; a < o; a++) {
        if (n = "", typeof arguments[a] == "object") {
          n += `
[` + a + "] ";
          for (i in arguments[0])
            S(arguments[0], i) && (n += i + ": " + arguments[0][i] + ", ");
          n = n.slice(0, -2);
        } else
          n = arguments[a];
        s.push(n);
      }
      Cs(
        e + `
Arguments: ` + Array.prototype.slice.call(s).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var rs = {};
function Fs(e, t) {
  f.deprecationHandler != null && f.deprecationHandler(e, t), rs[e] || (Cs(t), rs[e] = !0);
}
f.suppressDeprecationWarnings = !1;
f.deprecationHandler = null;
function ae(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Oa(e) {
  var t, r;
  for (r in e)
    S(e, r) && (t = e[r], ae(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function hr(e, t) {
  var r = _e({}, e), s;
  for (s in t)
    S(t, s) && (ke(e[s]) && ke(t[s]) ? (r[s] = {}, _e(r[s], e[s]), _e(r[s], t[s])) : t[s] != null ? r[s] = t[s] : delete r[s]);
  for (s in e)
    S(e, s) && !S(t, s) && ke(e[s]) && (r[s] = _e({}, r[s]));
  return r;
}
function kr(e) {
  e != null && this.set(e);
}
var cr;
Object.keys ? cr = Object.keys : cr = function(e) {
  var t, r = [];
  for (t in e)
    S(e, t) && r.push(t);
  return r;
};
var ka = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Da(e, t, r) {
  var s = this._calendar[e] || this._calendar.sameElse;
  return ae(s) ? s.call(t, r) : s;
}
function se(e, t, r) {
  var s = "" + Math.abs(e), n = t - s.length, a = e >= 0;
  return (a ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, n)).toString().substr(1) + s;
}
var Dr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ht = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Bt = {}, Ue = {};
function m(e, t, r, s) {
  var n = s;
  typeof s == "string" && (n = function() {
    return this[s]();
  }), e && (Ue[e] = n), t && (Ue[t[0]] = function() {
    return se(n.apply(this, arguments), t[1], t[2]);
  }), r && (Ue[r] = function() {
    return this.localeData().ordinal(
      n.apply(this, arguments),
      e
    );
  });
}
function Ma(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function xa(e) {
  var t = e.match(Dr), r, s;
  for (r = 0, s = t.length; r < s; r++)
    Ue[t[r]] ? t[r] = Ue[t[r]] : t[r] = Ma(t[r]);
  return function(n) {
    var a = "", i;
    for (i = 0; i < s; i++)
      a += ae(t[i]) ? t[i].call(n, e) : t[i];
    return a;
  };
}
function mt(e, t) {
  return e.isValid() ? (t = Ws(t, e.localeData()), Bt[t] = Bt[t] || xa(t), Bt[t](e)) : e.localeData().invalidDate();
}
function Ws(e, t) {
  var r = 5;
  function s(n) {
    return t.longDateFormat(n) || n;
  }
  for (ht.lastIndex = 0; r >= 0 && ht.test(e); )
    e = e.replace(
      ht,
      s
    ), ht.lastIndex = 0, r -= 1;
  return e;
}
var Ta = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Ya(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Dr).map(function(s) {
    return s === "MMMM" || s === "MM" || s === "DD" || s === "dddd" ? s.slice(1) : s;
  }).join(""), this._longDateFormat[e]);
}
var Ra = "Invalid date";
function Ea() {
  return this._invalidDate;
}
var Pa = "%d", Na = /\d{1,2}/;
function Ca(e) {
  return this._ordinal.replace("%d", e);
}
var Fa = {
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
function Wa(e, t, r, s) {
  var n = this._relativeTime[r];
  return ae(n) ? n(e, t, r, s) : n.replace(/%d/i, e);
}
function Aa(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return ae(r) ? r(t) : r.replace(/%s/i, t);
}
var rt = {};
function N(e, t) {
  var r = e.toLowerCase();
  rt[r] = rt[r + "s"] = rt[t] = e;
}
function z(e) {
  return typeof e == "string" ? rt[e] || rt[e.toLowerCase()] : void 0;
}
function Mr(e) {
  var t = {}, r, s;
  for (s in e)
    S(e, s) && (r = z(s), r && (t[r] = e[s]));
  return t;
}
var As = {};
function C(e, t) {
  As[e] = t;
}
function La(e) {
  var t = [], r;
  for (r in e)
    S(e, r) && t.push({ unit: r, priority: As[r] });
  return t.sort(function(s, n) {
    return s.priority - n.priority;
  }), t;
}
function xt(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function H(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function v(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = H(t)), r;
}
function Be(e, t) {
  return function(r) {
    return r != null ? (Ls(this, e, r), f.updateOffset(this, t), this) : vt(this, e);
  };
}
function vt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Ls(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && xt(e.year()) && e.month() === 1 && e.date() === 29 ? (r = v(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    Nt(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function Ua(e) {
  return e = z(e), ae(this[e]) ? this[e]() : this;
}
function Ia(e, t) {
  if (typeof e == "object") {
    e = Mr(e);
    var r = La(e), s, n = r.length;
    for (s = 0; s < n; s++)
      this[r[s].unit](e[r[s].unit]);
  } else if (e = z(e), ae(this[e]))
    return this[e](t);
  return this;
}
var Us = /\d/, $ = /\d\d/, Is = /\d{3}/, xr = /\d{4}/, Tt = /[+-]?\d{6}/, D = /\d\d?/, $s = /\d\d\d\d?/, js = /\d\d\d\d\d\d?/, Yt = /\d{1,3}/, Tr = /\d{1,4}/, Rt = /[+-]?\d{1,6}/, ze = /\d+/, Et = /[+-]?\d+/, $a = /Z|[+-]\d\d:?\d\d/gi, Pt = /Z|[+-]\d\d(?::?\d\d)?/gi, ja = /[+-]?\d+(\.\d{1,3})?/, dt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, wt;
wt = {};
function h(e, t, r) {
  wt[e] = ae(t) ? t : function(s, n) {
    return s && r ? r : t;
  };
}
function Va(e, t) {
  return S(wt, e) ? wt[e](t._strict, t._locale) : new RegExp(Ha(e));
}
function Ha(e) {
  return I(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, r, s, n, a) {
        return r || s || n || a;
      }
    )
  );
}
function I(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var mr = {};
function O(e, t) {
  var r, s = t, n;
  for (typeof e == "string" && (e = [e]), fe(t) && (s = function(a, i) {
    i[t] = v(a);
  }), n = e.length, r = 0; r < n; r++)
    mr[e[r]] = s;
}
function ft(e, t) {
  O(e, function(r, s, n, a) {
    n._w = n._w || {}, t(r, n._w, n, a);
  });
}
function qa(e, t, r) {
  t != null && S(mr, e) && mr[e](t, r._a, r, e);
}
var P = 0, le = 1, te = 2, T = 3, Z = 4, ue = 5, Oe = 6, Ba = 7, za = 8;
function Ga(e, t) {
  return (e % t + t) % t;
}
var x;
Array.prototype.indexOf ? x = Array.prototype.indexOf : x = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function Nt(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = Ga(t, 12);
  return e += (t - r) / 12, r === 1 ? xt(e) ? 29 : 28 : 31 - r % 7 % 2;
}
m("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
m("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
m("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
N("month", "M");
C("month", 8);
h("M", D);
h("MM", D, $);
h("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
h("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
O(["M", "MM"], function(e, t) {
  t[le] = v(e) - 1;
});
O(["MMM", "MMMM"], function(e, t, r, s) {
  var n = r._locale.monthsParse(e, s, r._strict);
  n != null ? t[le] = n : g(r).invalidMonth = e;
});
var Ja = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Vs = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Hs = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Za = dt, Qa = dt;
function Xa(e, t) {
  return e ? Q(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Hs).test(t) ? "format" : "standalone"][e.month()] : Q(this._months) ? this._months : this._months.standalone;
}
function Ka(e, t) {
  return e ? Q(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Hs.test(t) ? "format" : "standalone"][e.month()] : Q(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function ei(e, t, r) {
  var s, n, a, i = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s)
      a = ne([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(
        a,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[s] = this.months(a, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (n = x.call(this._shortMonthsParse, i), n !== -1 ? n : null) : (n = x.call(this._longMonthsParse, i), n !== -1 ? n : null) : t === "MMM" ? (n = x.call(this._shortMonthsParse, i), n !== -1 ? n : (n = x.call(this._longMonthsParse, i), n !== -1 ? n : null)) : (n = x.call(this._longMonthsParse, i), n !== -1 ? n : (n = x.call(this._shortMonthsParse, i), n !== -1 ? n : null));
}
function ti(e, t, r) {
  var s, n, a;
  if (this._monthsParseExact)
    return ei.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
    if (n = ne([2e3, s]), r && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp(
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
function qs(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = v(t);
    else if (t = e.localeData().monthsParse(t), !fe(t))
      return e;
  }
  return r = Math.min(e.date(), Nt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function Bs(e) {
  return e != null ? (qs(this, e), f.updateOffset(this, !0), this) : vt(this, "Month");
}
function ri() {
  return Nt(this.year(), this.month());
}
function si(e) {
  return this._monthsParseExact ? (S(this, "_monthsRegex") || zs.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (S(this, "_monthsShortRegex") || (this._monthsShortRegex = Za), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function ni(e) {
  return this._monthsParseExact ? (S(this, "_monthsRegex") || zs.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (S(this, "_monthsRegex") || (this._monthsRegex = Qa), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function zs() {
  function e(i, o) {
    return o.length - i.length;
  }
  var t = [], r = [], s = [], n, a;
  for (n = 0; n < 12; n++)
    a = ne([2e3, n]), t.push(this.monthsShort(a, "")), r.push(this.months(a, "")), s.push(this.months(a, "")), s.push(this.monthsShort(a, ""));
  for (t.sort(e), r.sort(e), s.sort(e), n = 0; n < 12; n++)
    t[n] = I(t[n]), r[n] = I(r[n]);
  for (n = 0; n < 24; n++)
    s[n] = I(s[n]);
  this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
m("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? se(e, 4) : "+" + e;
});
m(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
m(0, ["YYYY", 4], 0, "year");
m(0, ["YYYYY", 5], 0, "year");
m(0, ["YYYYYY", 6, !0], 0, "year");
N("year", "y");
C("year", 1);
h("Y", Et);
h("YY", D, $);
h("YYYY", Tr, xr);
h("YYYYY", Rt, Tt);
h("YYYYYY", Rt, Tt);
O(["YYYYY", "YYYYYY"], P);
O("YYYY", function(e, t) {
  t[P] = e.length === 2 ? f.parseTwoDigitYear(e) : v(e);
});
O("YY", function(e, t) {
  t[P] = f.parseTwoDigitYear(e);
});
O("Y", function(e, t) {
  t[P] = parseInt(e, 10);
});
function st(e) {
  return xt(e) ? 366 : 365;
}
f.parseTwoDigitYear = function(e) {
  return v(e) + (v(e) > 68 ? 1900 : 2e3);
};
var Gs = Be("FullYear", !0);
function ai() {
  return xt(this.year());
}
function ii(e, t, r, s, n, a, i) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, s, n, a, i), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, s, n, a, i), o;
}
function at(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function St(e, t, r) {
  var s = 7 + t - r, n = (7 + at(e, 0, s).getUTCDay() - t) % 7;
  return -n + s - 1;
}
function Js(e, t, r, s, n) {
  var a = (7 + r - s) % 7, i = St(e, s, n), o = 1 + 7 * (t - 1) + a + i, l, d;
  return o <= 0 ? (l = e - 1, d = st(l) + o) : o > st(e) ? (l = e + 1, d = o - st(e)) : (l = e, d = o), {
    year: l,
    dayOfYear: d
  };
}
function it(e, t, r) {
  var s = St(e.year(), t, r), n = Math.floor((e.dayOfYear() - s - 1) / 7) + 1, a, i;
  return n < 1 ? (i = e.year() - 1, a = n + de(i, t, r)) : n > de(e.year(), t, r) ? (a = n - de(e.year(), t, r), i = e.year() + 1) : (i = e.year(), a = n), {
    week: a,
    year: i
  };
}
function de(e, t, r) {
  var s = St(e, t, r), n = St(e + 1, t, r);
  return (st(e) - s + n) / 7;
}
m("w", ["ww", 2], "wo", "week");
m("W", ["WW", 2], "Wo", "isoWeek");
N("week", "w");
N("isoWeek", "W");
C("week", 5);
C("isoWeek", 5);
h("w", D);
h("ww", D, $);
h("W", D);
h("WW", D, $);
ft(
  ["w", "ww", "W", "WW"],
  function(e, t, r, s) {
    t[s.substr(0, 1)] = v(e);
  }
);
function oi(e) {
  return it(e, this._week.dow, this._week.doy).week;
}
var li = {
  dow: 0,
  doy: 6
};
function ui() {
  return this._week.dow;
}
function di() {
  return this._week.doy;
}
function fi(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function hi(e) {
  var t = it(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
m("d", 0, "do", "day");
m("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
m("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
m("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
m("e", 0, 0, "weekday");
m("E", 0, 0, "isoWeekday");
N("day", "d");
N("weekday", "e");
N("isoWeekday", "E");
C("day", 11);
C("weekday", 11);
C("isoWeekday", 11);
h("d", D);
h("e", D);
h("E", D);
h("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
h("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
h("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
ft(["dd", "ddd", "dddd"], function(e, t, r, s) {
  var n = r._locale.weekdaysParse(e, s, r._strict);
  n != null ? t.d = n : g(r).invalidWeekday = e;
});
ft(["d", "e", "E"], function(e, t, r, s) {
  t[s] = v(e);
});
function ci(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function mi(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Yr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var _i = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Zs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), yi = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), pi = dt, gi = dt, vi = dt;
function wi(e, t) {
  var r = Q(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Yr(r, this._week.dow) : e ? r[e.day()] : r;
}
function Si(e) {
  return e === !0 ? Yr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function bi(e) {
  return e === !0 ? Yr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Oi(e, t, r) {
  var s, n, a, i = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s)
      a = ne([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(
        a,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(
        a,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(a, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (n = x.call(this._weekdaysParse, i), n !== -1 ? n : null) : t === "ddd" ? (n = x.call(this._shortWeekdaysParse, i), n !== -1 ? n : null) : (n = x.call(this._minWeekdaysParse, i), n !== -1 ? n : null) : t === "dddd" ? (n = x.call(this._weekdaysParse, i), n !== -1 || (n = x.call(this._shortWeekdaysParse, i), n !== -1) ? n : (n = x.call(this._minWeekdaysParse, i), n !== -1 ? n : null)) : t === "ddd" ? (n = x.call(this._shortWeekdaysParse, i), n !== -1 || (n = x.call(this._weekdaysParse, i), n !== -1) ? n : (n = x.call(this._minWeekdaysParse, i), n !== -1 ? n : null)) : (n = x.call(this._minWeekdaysParse, i), n !== -1 || (n = x.call(this._weekdaysParse, i), n !== -1) ? n : (n = x.call(this._shortWeekdaysParse, i), n !== -1 ? n : null));
}
function ki(e, t, r) {
  var s, n, a;
  if (this._weekdaysParseExact)
    return Oi.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
    if (n = ne([2e3, 1]).day(s), r && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp(
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
function Di(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = ci(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Mi(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function xi(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = mi(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Ti(e) {
  return this._weekdaysParseExact ? (S(this, "_weekdaysRegex") || Rr.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (S(this, "_weekdaysRegex") || (this._weekdaysRegex = pi), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Yi(e) {
  return this._weekdaysParseExact ? (S(this, "_weekdaysRegex") || Rr.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (S(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = gi), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Ri(e) {
  return this._weekdaysParseExact ? (S(this, "_weekdaysRegex") || Rr.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (S(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = vi), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Rr() {
  function e(_, y) {
    return y.length - _.length;
  }
  var t = [], r = [], s = [], n = [], a, i, o, l, d;
  for (a = 0; a < 7; a++)
    i = ne([2e3, 1]).day(a), o = I(this.weekdaysMin(i, "")), l = I(this.weekdaysShort(i, "")), d = I(this.weekdays(i, "")), t.push(o), r.push(l), s.push(d), n.push(o), n.push(l), n.push(d);
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
function Er() {
  return this.hours() % 12 || 12;
}
function Ei() {
  return this.hours() || 24;
}
m("H", ["HH", 2], 0, "hour");
m("h", ["hh", 2], 0, Er);
m("k", ["kk", 2], 0, Ei);
m("hmm", 0, 0, function() {
  return "" + Er.apply(this) + se(this.minutes(), 2);
});
m("hmmss", 0, 0, function() {
  return "" + Er.apply(this) + se(this.minutes(), 2) + se(this.seconds(), 2);
});
m("Hmm", 0, 0, function() {
  return "" + this.hours() + se(this.minutes(), 2);
});
m("Hmmss", 0, 0, function() {
  return "" + this.hours() + se(this.minutes(), 2) + se(this.seconds(), 2);
});
function Qs(e, t) {
  m(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Qs("a", !0);
Qs("A", !1);
N("hour", "h");
C("hour", 13);
function Xs(e, t) {
  return t._meridiemParse;
}
h("a", Xs);
h("A", Xs);
h("H", D);
h("h", D);
h("k", D);
h("HH", D, $);
h("hh", D, $);
h("kk", D, $);
h("hmm", $s);
h("hmmss", js);
h("Hmm", $s);
h("Hmmss", js);
O(["H", "HH"], T);
O(["k", "kk"], function(e, t, r) {
  var s = v(e);
  t[T] = s === 24 ? 0 : s;
});
O(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
O(["h", "hh"], function(e, t, r) {
  t[T] = v(e), g(r).bigHour = !0;
});
O("hmm", function(e, t, r) {
  var s = e.length - 2;
  t[T] = v(e.substr(0, s)), t[Z] = v(e.substr(s)), g(r).bigHour = !0;
});
O("hmmss", function(e, t, r) {
  var s = e.length - 4, n = e.length - 2;
  t[T] = v(e.substr(0, s)), t[Z] = v(e.substr(s, 2)), t[ue] = v(e.substr(n)), g(r).bigHour = !0;
});
O("Hmm", function(e, t, r) {
  var s = e.length - 2;
  t[T] = v(e.substr(0, s)), t[Z] = v(e.substr(s));
});
O("Hmmss", function(e, t, r) {
  var s = e.length - 4, n = e.length - 2;
  t[T] = v(e.substr(0, s)), t[Z] = v(e.substr(s, 2)), t[ue] = v(e.substr(n));
});
function Pi(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Ni = /[ap]\.?m?\.?/i, Ci = Be("Hours", !0);
function Fi(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Ks = {
  calendar: ka,
  longDateFormat: Ta,
  invalidDate: Ra,
  ordinal: Pa,
  dayOfMonthOrdinalParse: Na,
  relativeTime: Fa,
  months: Ja,
  monthsShort: Vs,
  week: li,
  weekdays: _i,
  weekdaysMin: yi,
  weekdaysShort: Zs,
  meridiemParse: Ni
}, M = {}, Xe = {}, ot;
function Wi(e, t) {
  var r, s = Math.min(e.length, t.length);
  for (r = 0; r < s; r += 1)
    if (e[r] !== t[r])
      return r;
  return s;
}
function ss(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Ai(e) {
  for (var t = 0, r, s, n, a; t < e.length; ) {
    for (a = ss(e[t]).split("-"), r = a.length, s = ss(e[t + 1]), s = s ? s.split("-") : null; r > 0; ) {
      if (n = Ct(a.slice(0, r).join("-")), n)
        return n;
      if (s && s.length >= r && Wi(a, s) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return ot;
}
function Li(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Ct(e) {
  var t = null, r;
  if (M[e] === void 0 && typeof module < "u" && module && module.exports && Li(e))
    try {
      t = ot._abbr, r = require, r("./locale/" + e), pe(t);
    } catch {
      M[e] = null;
    }
  return M[e];
}
function pe(e, t) {
  var r;
  return e && (W(t) ? r = he(e) : r = Pr(e, t), r ? ot = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), ot._abbr;
}
function Pr(e, t) {
  if (t !== null) {
    var r, s = Ks;
    if (t.abbr = e, M[e] != null)
      Fs(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), s = M[e]._config;
    else if (t.parentLocale != null)
      if (M[t.parentLocale] != null)
        s = M[t.parentLocale]._config;
      else if (r = Ct(t.parentLocale), r != null)
        s = r._config;
      else
        return Xe[t.parentLocale] || (Xe[t.parentLocale] = []), Xe[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return M[e] = new kr(hr(s, t)), Xe[e] && Xe[e].forEach(function(n) {
      Pr(n.name, n.config);
    }), pe(e), M[e];
  } else
    return delete M[e], null;
}
function Ui(e, t) {
  if (t != null) {
    var r, s, n = Ks;
    M[e] != null && M[e].parentLocale != null ? M[e].set(hr(M[e]._config, t)) : (s = Ct(e), s != null && (n = s._config), t = hr(n, t), s == null && (t.abbr = e), r = new kr(t), r.parentLocale = M[e], M[e] = r), pe(e);
  } else
    M[e] != null && (M[e].parentLocale != null ? (M[e] = M[e].parentLocale, e === pe() && pe(e)) : M[e] != null && delete M[e]);
  return M[e];
}
function he(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return ot;
  if (!Q(e)) {
    if (t = Ct(e), t)
      return t;
    e = [e];
  }
  return Ai(e);
}
function Ii() {
  return cr(M);
}
function Nr(e) {
  var t, r = e._a;
  return r && g(e).overflow === -2 && (t = r[le] < 0 || r[le] > 11 ? le : r[te] < 1 || r[te] > Nt(r[P], r[le]) ? te : r[T] < 0 || r[T] > 24 || r[T] === 24 && (r[Z] !== 0 || r[ue] !== 0 || r[Oe] !== 0) ? T : r[Z] < 0 || r[Z] > 59 ? Z : r[ue] < 0 || r[ue] > 59 ? ue : r[Oe] < 0 || r[Oe] > 999 ? Oe : -1, g(e)._overflowDayOfYear && (t < P || t > te) && (t = te), g(e)._overflowWeeks && t === -1 && (t = Ba), g(e)._overflowWeekday && t === -1 && (t = za), g(e).overflow = t), e;
}
var $i = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ji = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Vi = /Z|[+-]\d\d(?::?\d\d)?/, ct = [
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
], zt = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], Hi = /^\/?Date\((-?\d+)/i, qi = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Bi = {
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
function en(e) {
  var t, r, s = e._i, n = $i.exec(s) || ji.exec(s), a, i, o, l, d = ct.length, _ = zt.length;
  if (n) {
    for (g(e).iso = !0, t = 0, r = d; t < r; t++)
      if (ct[t][1].exec(n[1])) {
        i = ct[t][0], a = ct[t][2] !== !1;
        break;
      }
    if (i == null) {
      e._isValid = !1;
      return;
    }
    if (n[3]) {
      for (t = 0, r = _; t < r; t++)
        if (zt[t][1].exec(n[3])) {
          o = (n[2] || " ") + zt[t][0];
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
      if (Vi.exec(n[4]))
        l = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = i + (o || "") + (l || ""), Fr(e);
  } else
    e._isValid = !1;
}
function zi(e, t, r, s, n, a) {
  var i = [
    Gi(e),
    Vs.indexOf(t),
    parseInt(r, 10),
    parseInt(s, 10),
    parseInt(n, 10)
  ];
  return a && i.push(parseInt(a, 10)), i;
}
function Gi(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Ji(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Zi(e, t, r) {
  if (e) {
    var s = Zs.indexOf(e), n = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (s !== n)
      return g(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function Qi(e, t, r) {
  if (e)
    return Bi[e];
  if (t)
    return 0;
  var s = parseInt(r, 10), n = s % 100, a = (s - n) / 100;
  return a * 60 + n;
}
function tn(e) {
  var t = qi.exec(Ji(e._i)), r;
  if (t) {
    if (r = zi(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !Zi(t[1], r, e))
      return;
    e._a = r, e._tzm = Qi(t[8], t[9], t[10]), e._d = at.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), g(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function Xi(e) {
  var t = Hi.exec(e._i);
  if (t !== null) {
    e._d = new Date(+t[1]);
    return;
  }
  if (en(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (tn(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : f.createFromInputFallback(e);
}
f.createFromInputFallback = B(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function We(e, t, r) {
  return e != null ? e : t != null ? t : r;
}
function Ki(e) {
  var t = new Date(f.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Cr(e) {
  var t, r, s = [], n, a, i;
  if (!e._d) {
    for (n = Ki(e), e._w && e._a[te] == null && e._a[le] == null && eo(e), e._dayOfYear != null && (i = We(e._a[P], n[P]), (e._dayOfYear > st(i) || e._dayOfYear === 0) && (g(e)._overflowDayOfYear = !0), r = at(i, 0, e._dayOfYear), e._a[le] = r.getUTCMonth(), e._a[te] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = s[t] = n[t];
    for (; t < 7; t++)
      e._a[t] = s[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[T] === 24 && e._a[Z] === 0 && e._a[ue] === 0 && e._a[Oe] === 0 && (e._nextDay = !0, e._a[T] = 0), e._d = (e._useUTC ? at : ii).apply(
      null,
      s
    ), a = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[T] = 24), e._w && typeof e._w.d < "u" && e._w.d !== a && (g(e).weekdayMismatch = !0);
  }
}
function eo(e) {
  var t, r, s, n, a, i, o, l, d;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (a = 1, i = 4, r = We(
    t.GG,
    e._a[P],
    it(k(), 1, 4).year
  ), s = We(t.W, 1), n = We(t.E, 1), (n < 1 || n > 7) && (l = !0)) : (a = e._locale._week.dow, i = e._locale._week.doy, d = it(k(), a, i), r = We(t.gg, e._a[P], d.year), s = We(t.w, d.week), t.d != null ? (n = t.d, (n < 0 || n > 6) && (l = !0)) : t.e != null ? (n = t.e + a, (t.e < 0 || t.e > 6) && (l = !0)) : n = a), s < 1 || s > de(r, a, i) ? g(e)._overflowWeeks = !0 : l != null ? g(e)._overflowWeekday = !0 : (o = Js(r, s, n, a, i), e._a[P] = o.year, e._dayOfYear = o.dayOfYear);
}
f.ISO_8601 = function() {
};
f.RFC_2822 = function() {
};
function Fr(e) {
  if (e._f === f.ISO_8601) {
    en(e);
    return;
  }
  if (e._f === f.RFC_2822) {
    tn(e);
    return;
  }
  e._a = [], g(e).empty = !0;
  var t = "" + e._i, r, s, n, a, i, o = t.length, l = 0, d, _;
  for (n = Ws(e._f, e._locale).match(Dr) || [], _ = n.length, r = 0; r < _; r++)
    a = n[r], s = (t.match(Va(a, e)) || [])[0], s && (i = t.substr(0, t.indexOf(s)), i.length > 0 && g(e).unusedInput.push(i), t = t.slice(
      t.indexOf(s) + s.length
    ), l += s.length), Ue[a] ? (s ? g(e).empty = !1 : g(e).unusedTokens.push(a), qa(a, s, e)) : e._strict && !s && g(e).unusedTokens.push(a);
  g(e).charsLeftOver = o - l, t.length > 0 && g(e).unusedInput.push(t), e._a[T] <= 12 && g(e).bigHour === !0 && e._a[T] > 0 && (g(e).bigHour = void 0), g(e).parsedDateParts = e._a.slice(0), g(e).meridiem = e._meridiem, e._a[T] = to(
    e._locale,
    e._a[T],
    e._meridiem
  ), d = g(e).era, d !== null && (e._a[P] = e._locale.erasConvertYear(d, e._a[P])), Cr(e), Nr(e);
}
function to(e, t, r) {
  var s;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (s = e.isPM(r), s && t < 12 && (t += 12), !s && t === 12 && (t = 0)), t);
}
function ro(e) {
  var t, r, s, n, a, i, o = !1, l = e._f.length;
  if (l === 0) {
    g(e).invalidFormat = !0, e._d = new Date(NaN);
    return;
  }
  for (n = 0; n < l; n++)
    a = 0, i = !1, t = Or({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[n], Fr(t), br(t) && (i = !0), a += g(t).charsLeftOver, a += g(t).unusedTokens.length * 10, g(t).score = a, o ? a < s && (s = a, r = t) : (s == null || a < s || i) && (s = a, r = t, i && (o = !0));
  _e(e, r || t);
}
function so(e) {
  if (!e._d) {
    var t = Mr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = Ns(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(s) {
        return s && parseInt(s, 10);
      }
    ), Cr(e);
  }
}
function no(e) {
  var t = new ut(Nr(rn(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function rn(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || he(e._l), t === null || r === void 0 && t === "" ? Mt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), X(t) ? new ut(Nr(t)) : (lt(t) ? e._d = t : Q(r) ? ro(e) : r ? Fr(e) : ao(e), br(e) || (e._d = null), e));
}
function ao(e) {
  var t = e._i;
  W(t) ? e._d = new Date(f.now()) : lt(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? Xi(e) : Q(t) ? (e._a = Ns(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Cr(e)) : ke(t) ? so(e) : fe(t) ? e._d = new Date(t) : f.createFromInputFallback(e);
}
function sn(e, t, r, s, n) {
  var a = {};
  return (t === !0 || t === !1) && (s = t, t = void 0), (r === !0 || r === !1) && (s = r, r = void 0), (ke(e) && Sr(e) || Q(e) && e.length === 0) && (e = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = n, a._l = r, a._i = e, a._f = t, a._strict = s, no(a);
}
function k(e, t, r, s) {
  return sn(e, t, r, s, !1);
}
var io = B(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = k.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Mt();
  }
), oo = B(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = k.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Mt();
  }
);
function nn(e, t) {
  var r, s;
  if (t.length === 1 && Q(t[0]) && (t = t[0]), !t.length)
    return k();
  for (r = t[0], s = 1; s < t.length; ++s)
    (!t[s].isValid() || t[s][e](r)) && (r = t[s]);
  return r;
}
function lo() {
  var e = [].slice.call(arguments, 0);
  return nn("isBefore", e);
}
function uo() {
  var e = [].slice.call(arguments, 0);
  return nn("isAfter", e);
}
var fo = function() {
  return Date.now ? Date.now() : +new Date();
}, Ke = [
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
function ho(e) {
  var t, r = !1, s, n = Ke.length;
  for (t in e)
    if (S(e, t) && !(x.call(Ke, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (s = 0; s < n; ++s)
    if (e[Ke[s]]) {
      if (r)
        return !1;
      parseFloat(e[Ke[s]]) !== v(e[Ke[s]]) && (r = !0);
    }
  return !0;
}
function co() {
  return this._isValid;
}
function mo() {
  return ee(NaN);
}
function Ft(e) {
  var t = Mr(e), r = t.year || 0, s = t.quarter || 0, n = t.month || 0, a = t.week || t.isoWeek || 0, i = t.day || 0, o = t.hour || 0, l = t.minute || 0, d = t.second || 0, _ = t.millisecond || 0;
  this._isValid = ho(t), this._milliseconds = +_ + d * 1e3 + l * 6e4 + o * 1e3 * 60 * 60, this._days = +i + a * 7, this._months = +n + s * 3 + r * 12, this._data = {}, this._locale = he(), this._bubble();
}
function _t(e) {
  return e instanceof Ft;
}
function _r(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function _o(e, t, r) {
  var s = Math.min(e.length, t.length), n = Math.abs(e.length - t.length), a = 0, i;
  for (i = 0; i < s; i++)
    (r && e[i] !== t[i] || !r && v(e[i]) !== v(t[i])) && a++;
  return a + n;
}
function an(e, t) {
  m(e, 0, 0, function() {
    var r = this.utcOffset(), s = "+";
    return r < 0 && (r = -r, s = "-"), s + se(~~(r / 60), 2) + t + se(~~r % 60, 2);
  });
}
an("Z", ":");
an("ZZ", "");
h("Z", Pt);
h("ZZ", Pt);
O(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Wr(Pt, e);
});
var yo = /([\+\-]|\d\d)/gi;
function Wr(e, t) {
  var r = (t || "").match(e), s, n, a;
  return r === null ? null : (s = r[r.length - 1] || [], n = (s + "").match(yo) || ["-", 0, 0], a = +(n[1] * 60) + v(n[2]), a === 0 ? 0 : n[0] === "+" ? a : -a);
}
function Ar(e, t) {
  var r, s;
  return t._isUTC ? (r = t.clone(), s = (X(e) || lt(e) ? e.valueOf() : k(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + s), f.updateOffset(r, !1), r) : k(e).local();
}
function yr(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
f.updateOffset = function() {
};
function po(e, t, r) {
  var s = this._offset || 0, n;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Wr(Pt, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (n = yr(this)), this._offset = e, this._isUTC = !0, n != null && this.add(n, "m"), s !== e && (!t || this._changeInProgress ? un(
      this,
      ee(e - s, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, f.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? s : yr(this);
}
function go(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function vo(e) {
  return this.utcOffset(0, e);
}
function wo(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(yr(this), "m")), this;
}
function So() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Wr($a, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function bo(e) {
  return this.isValid() ? (e = e ? k(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Oo() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function ko() {
  if (!W(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Or(e, this), e = rn(e), e._a ? (t = e._isUTC ? ne(e._a) : k(e._a), this._isDSTShifted = this.isValid() && _o(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Do() {
  return this.isValid() ? !this._isUTC : !1;
}
function Mo() {
  return this.isValid() ? this._isUTC : !1;
}
function on() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var xo = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, To = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ee(e, t) {
  var r = e, s = null, n, a, i;
  return _t(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : fe(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (s = xo.exec(e)) ? (n = s[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: v(s[te]) * n,
    h: v(s[T]) * n,
    m: v(s[Z]) * n,
    s: v(s[ue]) * n,
    ms: v(_r(s[Oe] * 1e3)) * n
  }) : (s = To.exec(e)) ? (n = s[1] === "-" ? -1 : 1, r = {
    y: Se(s[2], n),
    M: Se(s[3], n),
    w: Se(s[4], n),
    d: Se(s[5], n),
    h: Se(s[6], n),
    m: Se(s[7], n),
    s: Se(s[8], n)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (i = Yo(
    k(r.from),
    k(r.to)
  ), r = {}, r.ms = i.milliseconds, r.M = i.months), a = new Ft(r), _t(e) && S(e, "_locale") && (a._locale = e._locale), _t(e) && S(e, "_isValid") && (a._isValid = e._isValid), a;
}
ee.fn = Ft.prototype;
ee.invalid = mo;
function Se(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function ns(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Yo(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Ar(t, e), e.isBefore(t) ? r = ns(e, t) : (r = ns(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function ln(e, t) {
  return function(r, s) {
    var n, a;
    return s !== null && !isNaN(+s) && (Fs(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), a = r, r = s, s = a), n = ee(r, s), un(this, n, e), this;
  };
}
function un(e, t, r, s) {
  var n = t._milliseconds, a = _r(t._days), i = _r(t._months);
  !e.isValid() || (s = s == null ? !0 : s, i && qs(e, vt(e, "Month") + i * r), a && Ls(e, "Date", vt(e, "Date") + a * r), n && e._d.setTime(e._d.valueOf() + n * r), s && f.updateOffset(e, a || i));
}
var Ro = ln(1, "add"), Eo = ln(-1, "subtract");
function dn(e) {
  return typeof e == "string" || e instanceof String;
}
function Po(e) {
  return X(e) || lt(e) || dn(e) || fe(e) || Co(e) || No(e) || e === null || e === void 0;
}
function No(e) {
  var t = ke(e) && !Sr(e), r = !1, s = [
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
    a = s[n], r = r || S(e, a);
  return t && r;
}
function Co(e) {
  var t = Q(e), r = !1;
  return t && (r = e.filter(function(s) {
    return !fe(s) && dn(e);
  }).length === 0), t && r;
}
function Fo(e) {
  var t = ke(e) && !Sr(e), r = !1, s = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], n, a;
  for (n = 0; n < s.length; n += 1)
    a = s[n], r = r || S(e, a);
  return t && r;
}
function Wo(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function Ao(e, t) {
  arguments.length === 1 && (arguments[0] ? Po(arguments[0]) ? (e = arguments[0], t = void 0) : Fo(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || k(), s = Ar(r, this).startOf("day"), n = f.calendarFormat(this, s) || "sameElse", a = t && (ae(t[n]) ? t[n].call(this, r) : t[n]);
  return this.format(
    a || this.localeData().calendar(n, this, k(r))
  );
}
function Lo() {
  return new ut(this);
}
function Uo(e, t) {
  var r = X(e) ? e : k(e);
  return this.isValid() && r.isValid() ? (t = z(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Io(e, t) {
  var r = X(e) ? e : k(e);
  return this.isValid() && r.isValid() ? (t = z(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function $o(e, t, r, s) {
  var n = X(e) ? e : k(e), a = X(t) ? t : k(t);
  return this.isValid() && n.isValid() && a.isValid() ? (s = s || "()", (s[0] === "(" ? this.isAfter(n, r) : !this.isBefore(n, r)) && (s[1] === ")" ? this.isBefore(a, r) : !this.isAfter(a, r))) : !1;
}
function jo(e, t) {
  var r = X(e) ? e : k(e), s;
  return this.isValid() && r.isValid() ? (t = z(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (s = r.valueOf(), this.clone().startOf(t).valueOf() <= s && s <= this.clone().endOf(t).valueOf())) : !1;
}
function Vo(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function Ho(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function qo(e, t, r) {
  var s, n, a;
  if (!this.isValid())
    return NaN;
  if (s = Ar(e, this), !s.isValid())
    return NaN;
  switch (n = (s.utcOffset() - this.utcOffset()) * 6e4, t = z(t), t) {
    case "year":
      a = yt(this, s) / 12;
      break;
    case "month":
      a = yt(this, s);
      break;
    case "quarter":
      a = yt(this, s) / 3;
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
  return r ? a : H(a);
}
function yt(e, t) {
  if (e.date() < t.date())
    return -yt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), s = e.clone().add(r, "months"), n, a;
  return t - s < 0 ? (n = e.clone().add(r - 1, "months"), a = (t - s) / (s - n)) : (n = e.clone().add(r + 1, "months"), a = (t - s) / (n - s)), -(r + a) || 0;
}
f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Bo() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function zo(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? mt(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ae(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", mt(r, "Z")) : mt(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function Go() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, s, n, a;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", n = "-MM-DD[T]HH:mm:ss.SSS", a = t + '[")]', this.format(r + s + n + a);
}
function Jo(e) {
  e || (e = this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
  var t = mt(this, e);
  return this.localeData().postformat(t);
}
function Zo(e, t) {
  return this.isValid() && (X(e) && e.isValid() || k(e).isValid()) ? ee({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Qo(e) {
  return this.from(k(), e);
}
function Xo(e, t) {
  return this.isValid() && (X(e) && e.isValid() || k(e).isValid()) ? ee({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Ko(e) {
  return this.to(k(), e);
}
function fn(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = he(e), t != null && (this._locale = t), this);
}
var hn = B(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function cn() {
  return this._locale;
}
var bt = 1e3, Ie = 60 * bt, Ot = 60 * Ie, mn = (365 * 400 + 97) * 24 * Ot;
function $e(e, t) {
  return (e % t + t) % t;
}
function _n(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - mn : new Date(e, t, r).valueOf();
}
function yn(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - mn : Date.UTC(e, t, r);
}
function el(e) {
  var t, r;
  if (e = z(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? yn : _n, e) {
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
      t = this._d.valueOf(), t -= $e(
        t + (this._isUTC ? 0 : this.utcOffset() * Ie),
        Ot
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= $e(t, Ie);
      break;
    case "second":
      t = this._d.valueOf(), t -= $e(t, bt);
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function tl(e) {
  var t, r;
  if (e = z(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? yn : _n, e) {
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
      t = this._d.valueOf(), t += Ot - $e(
        t + (this._isUTC ? 0 : this.utcOffset() * Ie),
        Ot
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Ie - $e(t, Ie) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += bt - $e(t, bt) - 1;
      break;
  }
  return this._d.setTime(t), f.updateOffset(this, !0), this;
}
function rl() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function sl() {
  return Math.floor(this.valueOf() / 1e3);
}
function nl() {
  return new Date(this.valueOf());
}
function al() {
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
function il() {
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
function ol() {
  return this.isValid() ? this.toISOString() : null;
}
function ll() {
  return br(this);
}
function ul() {
  return _e({}, g(this));
}
function dl() {
  return g(this).overflow;
}
function fl() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
m("N", 0, 0, "eraAbbr");
m("NN", 0, 0, "eraAbbr");
m("NNN", 0, 0, "eraAbbr");
m("NNNN", 0, 0, "eraName");
m("NNNNN", 0, 0, "eraNarrow");
m("y", ["y", 1], "yo", "eraYear");
m("y", ["yy", 2], 0, "eraYear");
m("y", ["yyy", 3], 0, "eraYear");
m("y", ["yyyy", 4], 0, "eraYear");
h("N", Lr);
h("NN", Lr);
h("NNN", Lr);
h("NNNN", bl);
h("NNNNN", Ol);
O(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, s) {
    var n = r._locale.erasParse(e, s, r._strict);
    n ? g(r).era = n : g(r).invalidEra = e;
  }
);
h("y", ze);
h("yy", ze);
h("yyy", ze);
h("yyyy", ze);
h("yo", kl);
O(["y", "yy", "yyy", "yyyy"], P);
O(["yo"], function(e, t, r, s) {
  var n;
  r._locale._eraYearOrdinalRegex && (n = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[P] = r._locale.eraYearOrdinalParse(e, n) : t[P] = parseInt(e, 10);
});
function hl(e, t) {
  var r, s, n, a = this._eras || he("en")._eras;
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
function cl(e, t, r) {
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
function ml(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? f(e.since).year() : f(e.since).year() + (t - e.offset) * r;
}
function _l() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].name;
  return "";
}
function yl() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].narrow;
  return "";
}
function pl() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].abbr;
  return "";
}
function gl() {
  var e, t, r, s, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = n[e].since <= n[e].until ? 1 : -1, s = this.clone().startOf("day").valueOf(), n[e].since <= s && s <= n[e].until || n[e].until <= s && s <= n[e].since)
      return (this.year() - f(n[e].since).year()) * r + n[e].offset;
  return this.year();
}
function vl(e) {
  return S(this, "_erasNameRegex") || Ur.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function wl(e) {
  return S(this, "_erasAbbrRegex") || Ur.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Sl(e) {
  return S(this, "_erasNarrowRegex") || Ur.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Lr(e, t) {
  return t.erasAbbrRegex(e);
}
function bl(e, t) {
  return t.erasNameRegex(e);
}
function Ol(e, t) {
  return t.erasNarrowRegex(e);
}
function kl(e, t) {
  return t._eraYearOrdinalRegex || ze;
}
function Ur() {
  var e = [], t = [], r = [], s = [], n, a, i = this.eras();
  for (n = 0, a = i.length; n < a; ++n)
    t.push(I(i[n].name)), e.push(I(i[n].abbr)), r.push(I(i[n].narrow)), s.push(I(i[n].name)), s.push(I(i[n].abbr)), s.push(I(i[n].narrow));
  this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
m(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
m(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function Wt(e, t) {
  m(0, [e, e.length], 0, t);
}
Wt("gggg", "weekYear");
Wt("ggggg", "weekYear");
Wt("GGGG", "isoWeekYear");
Wt("GGGGG", "isoWeekYear");
N("weekYear", "gg");
N("isoWeekYear", "GG");
C("weekYear", 1);
C("isoWeekYear", 1);
h("G", Et);
h("g", Et);
h("GG", D, $);
h("gg", D, $);
h("GGGG", Tr, xr);
h("gggg", Tr, xr);
h("GGGGG", Rt, Tt);
h("ggggg", Rt, Tt);
ft(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, s) {
    t[s.substr(0, 2)] = v(e);
  }
);
ft(["gg", "GG"], function(e, t, r, s) {
  t[s] = f.parseTwoDigitYear(e);
});
function Dl(e) {
  return pn.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Ml(e) {
  return pn.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function xl() {
  return de(this.year(), 1, 4);
}
function Tl() {
  return de(this.isoWeekYear(), 1, 4);
}
function Yl() {
  var e = this.localeData()._week;
  return de(this.year(), e.dow, e.doy);
}
function Rl() {
  var e = this.localeData()._week;
  return de(this.weekYear(), e.dow, e.doy);
}
function pn(e, t, r, s, n) {
  var a;
  return e == null ? it(this, s, n).year : (a = de(e, s, n), t > a && (t = a), El.call(this, e, t, r, s, n));
}
function El(e, t, r, s, n) {
  var a = Js(e, t, r, s, n), i = at(a.year, 0, a.dayOfYear);
  return this.year(i.getUTCFullYear()), this.month(i.getUTCMonth()), this.date(i.getUTCDate()), this;
}
m("Q", 0, "Qo", "quarter");
N("quarter", "Q");
C("quarter", 7);
h("Q", Us);
O("Q", function(e, t) {
  t[le] = (v(e) - 1) * 3;
});
function Pl(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
m("D", ["DD", 2], "Do", "date");
N("date", "D");
C("date", 9);
h("D", D);
h("DD", D, $);
h("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
O(["D", "DD"], te);
O("Do", function(e, t) {
  t[te] = v(e.match(D)[0]);
});
var gn = Be("Date", !0);
m("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
N("dayOfYear", "DDD");
C("dayOfYear", 4);
h("DDD", Yt);
h("DDDD", Is);
O(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = v(e);
});
function Nl(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
m("m", ["mm", 2], 0, "minute");
N("minute", "m");
C("minute", 14);
h("m", D);
h("mm", D, $);
O(["m", "mm"], Z);
var Cl = Be("Minutes", !1);
m("s", ["ss", 2], 0, "second");
N("second", "s");
C("second", 15);
h("s", D);
h("ss", D, $);
O(["s", "ss"], ue);
var Fl = Be("Seconds", !1);
m("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
m(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
m(0, ["SSS", 3], 0, "millisecond");
m(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
m(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
m(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
m(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
m(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
m(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
N("millisecond", "ms");
C("millisecond", 16);
h("S", Yt, Us);
h("SS", Yt, $);
h("SSS", Yt, Is);
var ye, vn;
for (ye = "SSSS"; ye.length <= 9; ye += "S")
  h(ye, ze);
function Wl(e, t) {
  t[Oe] = v(("0." + e) * 1e3);
}
for (ye = "S"; ye.length <= 9; ye += "S")
  O(ye, Wl);
vn = Be("Milliseconds", !1);
m("z", 0, 0, "zoneAbbr");
m("zz", 0, 0, "zoneName");
function Al() {
  return this._isUTC ? "UTC" : "";
}
function Ll() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var u = ut.prototype;
u.add = Ro;
u.calendar = Ao;
u.clone = Lo;
u.diff = qo;
u.endOf = tl;
u.format = Jo;
u.from = Zo;
u.fromNow = Qo;
u.to = Xo;
u.toNow = Ko;
u.get = Ua;
u.invalidAt = dl;
u.isAfter = Uo;
u.isBefore = Io;
u.isBetween = $o;
u.isSame = jo;
u.isSameOrAfter = Vo;
u.isSameOrBefore = Ho;
u.isValid = ll;
u.lang = hn;
u.locale = fn;
u.localeData = cn;
u.max = oo;
u.min = io;
u.parsingFlags = ul;
u.set = Ia;
u.startOf = el;
u.subtract = Eo;
u.toArray = al;
u.toObject = il;
u.toDate = nl;
u.toISOString = zo;
u.inspect = Go;
typeof Symbol < "u" && Symbol.for != null && (u[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
u.toJSON = ol;
u.toString = Bo;
u.unix = sl;
u.valueOf = rl;
u.creationData = fl;
u.eraName = _l;
u.eraNarrow = yl;
u.eraAbbr = pl;
u.eraYear = gl;
u.year = Gs;
u.isLeapYear = ai;
u.weekYear = Dl;
u.isoWeekYear = Ml;
u.quarter = u.quarters = Pl;
u.month = Bs;
u.daysInMonth = ri;
u.week = u.weeks = fi;
u.isoWeek = u.isoWeeks = hi;
u.weeksInYear = Yl;
u.weeksInWeekYear = Rl;
u.isoWeeksInYear = xl;
u.isoWeeksInISOWeekYear = Tl;
u.date = gn;
u.day = u.days = Di;
u.weekday = Mi;
u.isoWeekday = xi;
u.dayOfYear = Nl;
u.hour = u.hours = Ci;
u.minute = u.minutes = Cl;
u.second = u.seconds = Fl;
u.millisecond = u.milliseconds = vn;
u.utcOffset = po;
u.utc = vo;
u.local = wo;
u.parseZone = So;
u.hasAlignedHourOffset = bo;
u.isDST = Oo;
u.isLocal = Do;
u.isUtcOffset = Mo;
u.isUtc = on;
u.isUTC = on;
u.zoneAbbr = Al;
u.zoneName = Ll;
u.dates = B(
  "dates accessor is deprecated. Use date instead.",
  gn
);
u.months = B(
  "months accessor is deprecated. Use month instead",
  Bs
);
u.years = B(
  "years accessor is deprecated. Use year instead",
  Gs
);
u.zone = B(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  go
);
u.isDSTShifted = B(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  ko
);
function Ul(e) {
  return k(e * 1e3);
}
function Il() {
  return k.apply(null, arguments).parseZone();
}
function wn(e) {
  return e;
}
var b = kr.prototype;
b.calendar = Da;
b.longDateFormat = Ya;
b.invalidDate = Ea;
b.ordinal = Ca;
b.preparse = wn;
b.postformat = wn;
b.relativeTime = Wa;
b.pastFuture = Aa;
b.set = Oa;
b.eras = hl;
b.erasParse = cl;
b.erasConvertYear = ml;
b.erasAbbrRegex = wl;
b.erasNameRegex = vl;
b.erasNarrowRegex = Sl;
b.months = Xa;
b.monthsShort = Ka;
b.monthsParse = ti;
b.monthsRegex = ni;
b.monthsShortRegex = si;
b.week = oi;
b.firstDayOfYear = di;
b.firstDayOfWeek = ui;
b.weekdays = wi;
b.weekdaysMin = bi;
b.weekdaysShort = Si;
b.weekdaysParse = ki;
b.weekdaysRegex = Ti;
b.weekdaysShortRegex = Yi;
b.weekdaysMinRegex = Ri;
b.isPM = Pi;
b.meridiem = Fi;
function kt(e, t, r, s) {
  var n = he(), a = ne().set(s, t);
  return n[r](a, e);
}
function Sn(e, t, r) {
  if (fe(e) && (t = e, e = void 0), e = e || "", t != null)
    return kt(e, t, r, "month");
  var s, n = [];
  for (s = 0; s < 12; s++)
    n[s] = kt(e, s, r, "month");
  return n;
}
function Ir(e, t, r, s) {
  typeof e == "boolean" ? (fe(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, fe(t) && (r = t, t = void 0), t = t || "");
  var n = he(), a = e ? n._week.dow : 0, i, o = [];
  if (r != null)
    return kt(t, (r + a) % 7, s, "day");
  for (i = 0; i < 7; i++)
    o[i] = kt(t, (i + a) % 7, s, "day");
  return o;
}
function $l(e, t) {
  return Sn(e, t, "months");
}
function jl(e, t) {
  return Sn(e, t, "monthsShort");
}
function Vl(e, t, r) {
  return Ir(e, t, r, "weekdays");
}
function Hl(e, t, r) {
  return Ir(e, t, r, "weekdaysShort");
}
function ql(e, t, r) {
  return Ir(e, t, r, "weekdaysMin");
}
pe("en", {
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
    var t = e % 10, r = v(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + r;
  }
});
f.lang = B(
  "moment.lang is deprecated. Use moment.locale instead.",
  pe
);
f.langData = B(
  "moment.langData is deprecated. Use moment.localeData instead.",
  he
);
var ie = Math.abs;
function Bl() {
  var e = this._data;
  return this._milliseconds = ie(this._milliseconds), this._days = ie(this._days), this._months = ie(this._months), e.milliseconds = ie(e.milliseconds), e.seconds = ie(e.seconds), e.minutes = ie(e.minutes), e.hours = ie(e.hours), e.months = ie(e.months), e.years = ie(e.years), this;
}
function bn(e, t, r, s) {
  var n = ee(t, r);
  return e._milliseconds += s * n._milliseconds, e._days += s * n._days, e._months += s * n._months, e._bubble();
}
function zl(e, t) {
  return bn(this, e, t, 1);
}
function Gl(e, t) {
  return bn(this, e, t, -1);
}
function as(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Jl() {
  var e = this._milliseconds, t = this._days, r = this._months, s = this._data, n, a, i, o, l;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += as(pr(r) + t) * 864e5, t = 0, r = 0), s.milliseconds = e % 1e3, n = H(e / 1e3), s.seconds = n % 60, a = H(n / 60), s.minutes = a % 60, i = H(a / 60), s.hours = i % 24, t += H(i / 24), l = H(On(t)), r += l, t -= as(pr(l)), o = H(r / 12), r %= 12, s.days = t, s.months = r, s.years = o, this;
}
function On(e) {
  return e * 4800 / 146097;
}
function pr(e) {
  return e * 146097 / 4800;
}
function Zl(e) {
  if (!this.isValid())
    return NaN;
  var t, r, s = this._milliseconds;
  if (e = z(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + s / 864e5, r = this._months + On(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(pr(this._months)), e) {
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
function Ql() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + v(this._months / 12) * 31536e6 : NaN;
}
function ce(e) {
  return function() {
    return this.as(e);
  };
}
var Xl = ce("ms"), Kl = ce("s"), eu = ce("m"), tu = ce("h"), ru = ce("d"), su = ce("w"), nu = ce("M"), au = ce("Q"), iu = ce("y");
function ou() {
  return ee(this);
}
function lu(e) {
  return e = z(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Te(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var uu = Te("milliseconds"), du = Te("seconds"), fu = Te("minutes"), hu = Te("hours"), cu = Te("days"), mu = Te("months"), _u = Te("years");
function yu() {
  return H(this.days() / 7);
}
var oe = Math.round, Ae = {
  ss: 44,
  s: 45,
  m: 45,
  h: 22,
  d: 26,
  w: null,
  M: 11
};
function pu(e, t, r, s, n) {
  return n.relativeTime(t || 1, !!r, e, s);
}
function gu(e, t, r, s) {
  var n = ee(e).abs(), a = oe(n.as("s")), i = oe(n.as("m")), o = oe(n.as("h")), l = oe(n.as("d")), d = oe(n.as("M")), _ = oe(n.as("w")), y = oe(n.as("y")), c = a <= r.ss && ["s", a] || a < r.s && ["ss", a] || i <= 1 && ["m"] || i < r.m && ["mm", i] || o <= 1 && ["h"] || o < r.h && ["hh", o] || l <= 1 && ["d"] || l < r.d && ["dd", l];
  return r.w != null && (c = c || _ <= 1 && ["w"] || _ < r.w && ["ww", _]), c = c || d <= 1 && ["M"] || d < r.M && ["MM", d] || y <= 1 && ["y"] || ["yy", y], c[2] = t, c[3] = +e > 0, c[4] = s, pu.apply(null, c);
}
function vu(e) {
  return e === void 0 ? oe : typeof e == "function" ? (oe = e, !0) : !1;
}
function wu(e, t) {
  return Ae[e] === void 0 ? !1 : t === void 0 ? Ae[e] : (Ae[e] = t, e === "s" && (Ae.ss = t - 1), !0);
}
function Su(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, s = Ae, n, a;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (s = Object.assign({}, Ae, t), t.s != null && t.ss == null && (s.ss = t.s - 1)), n = this.localeData(), a = gu(this, !r, s, n), r && (a = n.pastFuture(+this, a)), n.postformat(a);
}
var Gt = Math.abs;
function Ne(e) {
  return (e > 0) - (e < 0) || +e;
}
function At() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = Gt(this._milliseconds) / 1e3, t = Gt(this._days), r = Gt(this._months), s, n, a, i, o = this.asSeconds(), l, d, _, y;
  return o ? (s = H(e / 60), n = H(s / 60), e %= 60, s %= 60, a = H(r / 12), r %= 12, i = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", l = o < 0 ? "-" : "", d = Ne(this._months) !== Ne(o) ? "-" : "", _ = Ne(this._days) !== Ne(o) ? "-" : "", y = Ne(this._milliseconds) !== Ne(o) ? "-" : "", l + "P" + (a ? d + a + "Y" : "") + (r ? d + r + "M" : "") + (t ? _ + t + "D" : "") + (n || s || e ? "T" : "") + (n ? y + n + "H" : "") + (s ? y + s + "M" : "") + (e ? y + i + "S" : "")) : "P0D";
}
var w = Ft.prototype;
w.isValid = co;
w.abs = Bl;
w.add = zl;
w.subtract = Gl;
w.as = Zl;
w.asMilliseconds = Xl;
w.asSeconds = Kl;
w.asMinutes = eu;
w.asHours = tu;
w.asDays = ru;
w.asWeeks = su;
w.asMonths = nu;
w.asQuarters = au;
w.asYears = iu;
w.valueOf = Ql;
w._bubble = Jl;
w.clone = ou;
w.get = lu;
w.milliseconds = uu;
w.seconds = du;
w.minutes = fu;
w.hours = hu;
w.days = cu;
w.weeks = yu;
w.months = mu;
w.years = _u;
w.humanize = Su;
w.toISOString = At;
w.toString = At;
w.toJSON = At;
w.locale = fn;
w.localeData = cn;
w.toIsoString = B(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  At
);
w.lang = hn;
m("X", 0, 0, "unix");
m("x", 0, 0, "valueOf");
h("x", Et);
h("X", ja);
O("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
O("x", function(e, t, r) {
  r._d = new Date(v(e));
});
//! moment.js
f.version = "2.29.4";
Sa(k);
f.fn = u;
f.min = lo;
f.max = uo;
f.now = fo;
f.utc = ne;
f.unix = Ul;
f.months = $l;
f.isDate = lt;
f.locale = pe;
f.invalid = Mt;
f.duration = ee;
f.isMoment = X;
f.weekdays = Vl;
f.parseZone = Il;
f.localeData = he;
f.isDuration = _t;
f.monthsShort = jl;
f.weekdaysMin = ql;
f.defineLocale = Pr;
f.updateLocale = Ui;
f.locales = Ii;
f.weekdaysShort = Hl;
f.normalizeUnits = z;
f.relativeTimeRounding = vu;
f.relativeTimeThreshold = wu;
f.calendarFormat = Wo;
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
function bu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var kn = { exports: {} }, $r = { exports: {} }, Dn = function(t, r) {
  return function() {
    for (var n = new Array(arguments.length), a = 0; a < n.length; a++)
      n[a] = arguments[a];
    return t.apply(r, n);
  };
}, Ou = Dn, jr = Object.prototype.toString, Vr = function(e) {
  return function(t) {
    var r = jr.call(t);
    return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function Ye(e) {
  return e = e.toLowerCase(), function(r) {
    return Vr(r) === e;
  };
}
function Hr(e) {
  return Array.isArray(e);
}
function Dt(e) {
  return typeof e > "u";
}
function ku(e) {
  return e !== null && !Dt(e) && e.constructor !== null && !Dt(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
var Mn = Ye("ArrayBuffer");
function Du(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Mn(e.buffer), t;
}
function Mu(e) {
  return typeof e == "string";
}
function xu(e) {
  return typeof e == "number";
}
function xn(e) {
  return e !== null && typeof e == "object";
}
function pt(e) {
  if (Vr(e) !== "object")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
var Tu = Ye("Date"), Yu = Ye("File"), Ru = Ye("Blob"), Eu = Ye("FileList");
function qr(e) {
  return jr.call(e) === "[object Function]";
}
function Pu(e) {
  return xn(e) && qr(e.pipe);
}
function Nu(e) {
  var t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || jr.call(e) === t || qr(e.toString) && e.toString() === t);
}
var Cu = Ye("URLSearchParams");
function Fu(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Wu() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Br(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Hr(e))
      for (var r = 0, s = e.length; r < s; r++)
        t.call(null, e[r], r, e);
    else
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && t.call(null, e[n], n, e);
}
function gr() {
  var e = {};
  function t(n, a) {
    pt(e[a]) && pt(n) ? e[a] = gr(e[a], n) : pt(n) ? e[a] = gr({}, n) : Hr(n) ? e[a] = n.slice() : e[a] = n;
  }
  for (var r = 0, s = arguments.length; r < s; r++)
    Br(arguments[r], t);
  return e;
}
function Au(e, t, r) {
  return Br(t, function(n, a) {
    r && typeof n == "function" ? e[a] = Ou(n, r) : e[a] = n;
  }), e;
}
function Lu(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
function Uu(e, t, r, s) {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, r && Object.assign(e.prototype, r);
}
function Iu(e, t, r) {
  var s, n, a, i = {};
  t = t || {};
  do {
    for (s = Object.getOwnPropertyNames(e), n = s.length; n-- > 0; )
      a = s[n], i[a] || (t[a] = e[a], i[a] = !0);
    e = Object.getPrototypeOf(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}
function $u(e, t, r) {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  var s = e.indexOf(t, r);
  return s !== -1 && s === r;
}
function ju(e) {
  if (!e)
    return null;
  var t = e.length;
  if (Dt(t))
    return null;
  for (var r = new Array(t); t-- > 0; )
    r[t] = e[t];
  return r;
}
var Vu = function(e) {
  return function(t) {
    return e && t instanceof e;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), R = {
  isArray: Hr,
  isArrayBuffer: Mn,
  isBuffer: ku,
  isFormData: Nu,
  isArrayBufferView: Du,
  isString: Mu,
  isNumber: xu,
  isObject: xn,
  isPlainObject: pt,
  isUndefined: Dt,
  isDate: Tu,
  isFile: Yu,
  isBlob: Ru,
  isFunction: qr,
  isStream: Pu,
  isURLSearchParams: Cu,
  isStandardBrowserEnv: Wu,
  forEach: Br,
  merge: gr,
  extend: Au,
  trim: Fu,
  stripBOM: Lu,
  inherits: Uu,
  toFlatObject: Iu,
  kindOf: Vr,
  kindOfTest: Ye,
  endsWith: $u,
  toArray: ju,
  isTypedArray: Vu,
  isFileList: Eu
}, Ce = R;
function is(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var Tn = function(t, r, s) {
  if (!r)
    return t;
  var n;
  if (s)
    n = s(r);
  else if (Ce.isURLSearchParams(r))
    n = r.toString();
  else {
    var a = [];
    Ce.forEach(r, function(l, d) {
      l === null || typeof l > "u" || (Ce.isArray(l) ? d = d + "[]" : l = [l], Ce.forEach(l, function(y) {
        Ce.isDate(y) ? y = y.toISOString() : Ce.isObject(y) && (y = JSON.stringify(y)), a.push(is(d) + "=" + is(y));
      }));
    }), n = a.join("&");
  }
  if (n) {
    var i = t.indexOf("#");
    i !== -1 && (t = t.slice(0, i)), t += (t.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return t;
}, Hu = R;
function Lt() {
  this.handlers = [];
}
Lt.prototype.use = function(t, r, s) {
  return this.handlers.push({
    fulfilled: t,
    rejected: r,
    synchronous: s ? s.synchronous : !1,
    runWhen: s ? s.runWhen : null
  }), this.handlers.length - 1;
};
Lt.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
Lt.prototype.forEach = function(t) {
  Hu.forEach(this.handlers, function(s) {
    s !== null && t(s);
  });
};
var qu = Lt, Bu = R, zu = function(t, r) {
  Bu.forEach(t, function(n, a) {
    a !== r && a.toUpperCase() === r.toUpperCase() && (t[r] = n, delete t[a]);
  });
}, Yn = R;
function He(e, t, r, s, n) {
  Error.call(this), this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), s && (this.request = s), n && (this.response = n);
}
Yn.inherits(He, Error, {
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
var Rn = He.prototype, En = {};
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
  En[e] = { value: e };
});
Object.defineProperties(He, En);
Object.defineProperty(Rn, "isAxiosError", { value: !0 });
He.from = function(e, t, r, s, n, a) {
  var i = Object.create(Rn);
  return Yn.toFlatObject(e, i, function(l) {
    return l !== Error.prototype;
  }), He.call(i, e.message, t, r, s, n), i.name = e.name, a && Object.assign(i, a), i;
};
var Ge = He, Pn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, J = R;
function Gu(e, t) {
  t = t || new FormData();
  var r = [];
  function s(a) {
    return a === null ? "" : J.isDate(a) ? a.toISOString() : J.isArrayBuffer(a) || J.isTypedArray(a) ? typeof Blob == "function" ? new Blob([a]) : Buffer.from(a) : a;
  }
  function n(a, i) {
    if (J.isPlainObject(a) || J.isArray(a)) {
      if (r.indexOf(a) !== -1)
        throw Error("Circular reference detected in " + i);
      r.push(a), J.forEach(a, function(l, d) {
        if (!J.isUndefined(l)) {
          var _ = i ? i + "." + d : d, y;
          if (l && !i && typeof l == "object") {
            if (J.endsWith(d, "{}"))
              l = JSON.stringify(l);
            else if (J.endsWith(d, "[]") && (y = J.toArray(l))) {
              y.forEach(function(c) {
                !J.isUndefined(c) && t.append(_, s(c));
              });
              return;
            }
          }
          n(l, _);
        }
      }), r.pop();
    } else
      t.append(i, s(a));
  }
  return n(e), t;
}
var Nn = Gu, Jt, os;
function Ju() {
  if (os)
    return Jt;
  os = 1;
  var e = Ge;
  return Jt = function(r, s, n) {
    var a = n.config.validateStatus;
    !n.status || !a || a(n.status) ? r(n) : s(new e(
      "Request failed with status code " + n.status,
      [e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    ));
  }, Jt;
}
var Zt, ls;
function Zu() {
  if (ls)
    return Zt;
  ls = 1;
  var e = R;
  return Zt = e.isStandardBrowserEnv() ? function() {
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
  }(), Zt;
}
var Qu = function(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}, Xu = function(t, r) {
  return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
}, Ku = Qu, ed = Xu, Cn = function(t, r) {
  return t && !Ku(r) ? ed(t, r) : r;
}, Qt, us;
function td() {
  if (us)
    return Qt;
  us = 1;
  var e = R, t = [
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
  return Qt = function(s) {
    var n = {}, a, i, o;
    return s && e.forEach(s.split(`
`), function(d) {
      if (o = d.indexOf(":"), a = e.trim(d.substr(0, o)).toLowerCase(), i = e.trim(d.substr(o + 1)), a) {
        if (n[a] && t.indexOf(a) >= 0)
          return;
        a === "set-cookie" ? n[a] = (n[a] ? n[a] : []).concat([i]) : n[a] = n[a] ? n[a] + ", " + i : i;
      }
    }), n;
  }, Qt;
}
var Xt, ds;
function rd() {
  if (ds)
    return Xt;
  ds = 1;
  var e = R;
  return Xt = e.isStandardBrowserEnv() ? function() {
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
  }(), Xt;
}
var Kt, fs;
function Ut() {
  if (fs)
    return Kt;
  fs = 1;
  var e = Ge, t = R;
  function r(s) {
    e.call(this, s == null ? "canceled" : s, e.ERR_CANCELED), this.name = "CanceledError";
  }
  return t.inherits(r, e, {
    __CANCEL__: !0
  }), Kt = r, Kt;
}
var er, hs;
function sd() {
  return hs || (hs = 1, er = function(t) {
    var r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
    return r && r[1] || "";
  }), er;
}
var tr, cs;
function ms() {
  if (cs)
    return tr;
  cs = 1;
  var e = R, t = Ju(), r = Zu(), s = Tn, n = Cn, a = td(), i = rd(), o = Pn, l = Ge, d = Ut(), _ = sd();
  return tr = function(c) {
    return new Promise(function(Vn, Re) {
      var Je = c.data, Ze = c.headers, Qe = c.responseType, Ee;
      function Qr() {
        c.cancelToken && c.cancelToken.unsubscribe(Ee), c.signal && c.signal.removeEventListener("abort", Ee);
      }
      e.isFormData(Je) && e.isStandardBrowserEnv() && delete Ze["Content-Type"];
      var p = new XMLHttpRequest();
      if (c.auth) {
        var Hn = c.auth.username || "", qn = c.auth.password ? unescape(encodeURIComponent(c.auth.password)) : "";
        Ze.Authorization = "Basic " + btoa(Hn + ":" + qn);
      }
      var jt = n(c.baseURL, c.url);
      p.open(c.method.toUpperCase(), s(jt, c.params, c.paramsSerializer), !0), p.timeout = c.timeout;
      function Xr() {
        if (!!p) {
          var G = "getAllResponseHeaders" in p ? a(p.getAllResponseHeaders()) : null, Pe = !Qe || Qe === "text" || Qe === "json" ? p.responseText : p.response, we = {
            data: Pe,
            status: p.status,
            statusText: p.statusText,
            headers: G,
            config: c,
            request: p
          };
          t(function(Ht) {
            Vn(Ht), Qr();
          }, function(Ht) {
            Re(Ht), Qr();
          }, we), p = null;
        }
      }
      if ("onloadend" in p ? p.onloadend = Xr : p.onreadystatechange = function() {
        !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(Xr);
      }, p.onabort = function() {
        !p || (Re(new l("Request aborted", l.ECONNABORTED, c, p)), p = null);
      }, p.onerror = function() {
        Re(new l("Network Error", l.ERR_NETWORK, c, p, p)), p = null;
      }, p.ontimeout = function() {
        var Pe = c.timeout ? "timeout of " + c.timeout + "ms exceeded" : "timeout exceeded", we = c.transitional || o;
        c.timeoutErrorMessage && (Pe = c.timeoutErrorMessage), Re(new l(
          Pe,
          we.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED,
          c,
          p
        )), p = null;
      }, e.isStandardBrowserEnv()) {
        var Kr = (c.withCredentials || i(jt)) && c.xsrfCookieName ? r.read(c.xsrfCookieName) : void 0;
        Kr && (Ze[c.xsrfHeaderName] = Kr);
      }
      "setRequestHeader" in p && e.forEach(Ze, function(Pe, we) {
        typeof Je > "u" && we.toLowerCase() === "content-type" ? delete Ze[we] : p.setRequestHeader(we, Pe);
      }), e.isUndefined(c.withCredentials) || (p.withCredentials = !!c.withCredentials), Qe && Qe !== "json" && (p.responseType = c.responseType), typeof c.onDownloadProgress == "function" && p.addEventListener("progress", c.onDownloadProgress), typeof c.onUploadProgress == "function" && p.upload && p.upload.addEventListener("progress", c.onUploadProgress), (c.cancelToken || c.signal) && (Ee = function(G) {
        !p || (Re(!G || G && G.type ? new d() : G), p.abort(), p = null);
      }, c.cancelToken && c.cancelToken.subscribe(Ee), c.signal && (c.signal.aborted ? Ee() : c.signal.addEventListener("abort", Ee))), Je || (Je = null);
      var Vt = _(jt);
      if (Vt && ["http", "https", "file"].indexOf(Vt) === -1) {
        Re(new l("Unsupported protocol " + Vt + ":", l.ERR_BAD_REQUEST, c));
        return;
      }
      p.send(Je);
    });
  }, tr;
}
var rr, _s;
function nd() {
  return _s || (_s = 1, rr = null), rr;
}
var Y = R, ys = zu, ps = Ge, ad = Pn, id = Nn, od = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function gs(e, t) {
  !Y.isUndefined(e) && Y.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function ld() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = ms()), e;
}
function ud(e, t, r) {
  if (Y.isString(e))
    try {
      return (t || JSON.parse)(e), Y.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (r || JSON.stringify)(e);
}
var It = {
  transitional: ad,
  adapter: ld(),
  transformRequest: [function(t, r) {
    if (ys(r, "Accept"), ys(r, "Content-Type"), Y.isFormData(t) || Y.isArrayBuffer(t) || Y.isBuffer(t) || Y.isStream(t) || Y.isFile(t) || Y.isBlob(t))
      return t;
    if (Y.isArrayBufferView(t))
      return t.buffer;
    if (Y.isURLSearchParams(t))
      return gs(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString();
    var s = Y.isObject(t), n = r && r["Content-Type"], a;
    if ((a = Y.isFileList(t)) || s && n === "multipart/form-data") {
      var i = this.env && this.env.FormData;
      return id(a ? { "files[]": t } : t, i && new i());
    } else if (s || n === "application/json")
      return gs(r, "application/json"), ud(t);
    return t;
  }],
  transformResponse: [function(t) {
    var r = this.transitional || It.transitional, s = r && r.silentJSONParsing, n = r && r.forcedJSONParsing, a = !s && this.responseType === "json";
    if (a || n && Y.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (i) {
        if (a)
          throw i.name === "SyntaxError" ? ps.from(i, ps.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    return t;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: nd()
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
Y.forEach(["delete", "get", "head"], function(t) {
  It.headers[t] = {};
});
Y.forEach(["post", "put", "patch"], function(t) {
  It.headers[t] = Y.merge(od);
});
var zr = It, dd = R, fd = zr, hd = function(t, r, s) {
  var n = this || fd;
  return dd.forEach(s, function(i) {
    t = i.call(n, t, r);
  }), t;
}, sr, vs;
function Fn() {
  return vs || (vs = 1, sr = function(t) {
    return !!(t && t.__CANCEL__);
  }), sr;
}
var ws = R, nr = hd, cd = Fn(), md = zr, _d = Ut();
function ar(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new _d();
}
var yd = function(t) {
  ar(t), t.headers = t.headers || {}, t.data = nr.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = ws.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), ws.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(n) {
      delete t.headers[n];
    }
  );
  var r = t.adapter || md.adapter;
  return r(t).then(function(n) {
    return ar(t), n.data = nr.call(
      t,
      n.data,
      n.headers,
      t.transformResponse
    ), n;
  }, function(n) {
    return cd(n) || (ar(t), n && n.response && (n.response.data = nr.call(
      t,
      n.response.data,
      n.response.headers,
      t.transformResponse
    ))), Promise.reject(n);
  });
}, U = R, Wn = function(t, r) {
  r = r || {};
  var s = {};
  function n(_, y) {
    return U.isPlainObject(_) && U.isPlainObject(y) ? U.merge(_, y) : U.isPlainObject(y) ? U.merge({}, y) : U.isArray(y) ? y.slice() : y;
  }
  function a(_) {
    if (U.isUndefined(r[_])) {
      if (!U.isUndefined(t[_]))
        return n(void 0, t[_]);
    } else
      return n(t[_], r[_]);
  }
  function i(_) {
    if (!U.isUndefined(r[_]))
      return n(void 0, r[_]);
  }
  function o(_) {
    if (U.isUndefined(r[_])) {
      if (!U.isUndefined(t[_]))
        return n(void 0, t[_]);
    } else
      return n(void 0, r[_]);
  }
  function l(_) {
    if (_ in r)
      return n(t[_], r[_]);
    if (_ in t)
      return n(void 0, t[_]);
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
  return U.forEach(Object.keys(t).concat(Object.keys(r)), function(y) {
    var c = d[y] || a, j = c(y);
    U.isUndefined(j) && c !== l || (s[y] = j);
  }), s;
}, ir, Ss;
function An() {
  return Ss || (Ss = 1, ir = {
    version: "0.27.2"
  }), ir;
}
var pd = An().version, me = Ge, Gr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  Gr[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var bs = {};
Gr.transitional = function(t, r, s) {
  function n(a, i) {
    return "[Axios v" + pd + "] Transitional option '" + a + "'" + i + (s ? ". " + s : "");
  }
  return function(a, i, o) {
    if (t === !1)
      throw new me(
        n(i, " has been removed" + (r ? " in " + r : "")),
        me.ERR_DEPRECATED
      );
    return r && !bs[i] && (bs[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, i, o) : !0;
  };
};
function gd(e, t, r) {
  if (typeof e != "object")
    throw new me("options must be an object", me.ERR_BAD_OPTION_VALUE);
  for (var s = Object.keys(e), n = s.length; n-- > 0; ) {
    var a = s[n], i = t[a];
    if (i) {
      var o = e[a], l = o === void 0 || i(o, a, e);
      if (l !== !0)
        throw new me("option " + a + " must be " + l, me.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new me("Unknown option " + a, me.ERR_BAD_OPTION);
  }
}
var vd = {
  assertOptions: gd,
  validators: Gr
}, Ln = R, wd = Tn, Os = qu, ks = yd, $t = Wn, Sd = Cn, Un = vd, Fe = Un.validators;
function qe(e) {
  this.defaults = e, this.interceptors = {
    request: new Os(),
    response: new Os()
  };
}
qe.prototype.request = function(t, r) {
  typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = $t(this.defaults, r), r.method ? r.method = r.method.toLowerCase() : this.defaults.method ? r.method = this.defaults.method.toLowerCase() : r.method = "get";
  var s = r.transitional;
  s !== void 0 && Un.assertOptions(s, {
    silentJSONParsing: Fe.transitional(Fe.boolean),
    forcedJSONParsing: Fe.transitional(Fe.boolean),
    clarifyTimeoutError: Fe.transitional(Fe.boolean)
  }, !1);
  var n = [], a = !0;
  this.interceptors.request.forEach(function(j) {
    typeof j.runWhen == "function" && j.runWhen(r) === !1 || (a = a && j.synchronous, n.unshift(j.fulfilled, j.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function(j) {
    i.push(j.fulfilled, j.rejected);
  });
  var o;
  if (!a) {
    var l = [ks, void 0];
    for (Array.prototype.unshift.apply(l, n), l = l.concat(i), o = Promise.resolve(r); l.length; )
      o = o.then(l.shift(), l.shift());
    return o;
  }
  for (var d = r; n.length; ) {
    var _ = n.shift(), y = n.shift();
    try {
      d = _(d);
    } catch (c) {
      y(c);
      break;
    }
  }
  try {
    o = ks(d);
  } catch (c) {
    return Promise.reject(c);
  }
  for (; i.length; )
    o = o.then(i.shift(), i.shift());
  return o;
};
qe.prototype.getUri = function(t) {
  t = $t(this.defaults, t);
  var r = Sd(t.baseURL, t.url);
  return wd(r, t.params, t.paramsSerializer);
};
Ln.forEach(["delete", "get", "head", "options"], function(t) {
  qe.prototype[t] = function(r, s) {
    return this.request($t(s || {}, {
      method: t,
      url: r,
      data: (s || {}).data
    }));
  };
});
Ln.forEach(["post", "put", "patch"], function(t) {
  function r(s) {
    return function(a, i, o) {
      return this.request($t(o || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  qe.prototype[t] = r(), qe.prototype[t + "Form"] = r(!0);
});
var bd = qe, or, Ds;
function Od() {
  if (Ds)
    return or;
  Ds = 1;
  var e = Ut();
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
  }, or = t, or;
}
var lr, Ms;
function kd() {
  return Ms || (Ms = 1, lr = function(t) {
    return function(s) {
      return t.apply(null, s);
    };
  }), lr;
}
var ur, xs;
function Dd() {
  if (xs)
    return ur;
  xs = 1;
  var e = R;
  return ur = function(r) {
    return e.isObject(r) && r.isAxiosError === !0;
  }, ur;
}
var Ts = R, Md = Dn, gt = bd, xd = Wn, Td = zr;
function In(e) {
  var t = new gt(e), r = Md(gt.prototype.request, t);
  return Ts.extend(r, gt.prototype, t), Ts.extend(r, t), r.create = function(n) {
    return In(xd(e, n));
  }, r;
}
var L = In(Td);
L.Axios = gt;
L.CanceledError = Ut();
L.CancelToken = Od();
L.isCancel = Fn();
L.VERSION = An().version;
L.toFormData = Nn;
L.AxiosError = Ge;
L.Cancel = L.CanceledError;
L.all = function(t) {
  return Promise.all(t);
};
L.spread = kd();
L.isAxiosError = Dd();
$r.exports = L;
$r.exports.default = L;
(function(e) {
  e.exports = $r.exports;
})(kn);
const je = /* @__PURE__ */ bu(kn.exports), et = tt({
  default: []
});
function vr() {
  return {
    createBag(e) {
      et[e] = [];
    },
    set(e, t = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      et[t] = Object.keys(e.response.data.errors).map((s) => ({
        key: s,
        message: e.response.data.errors[s][0]
      }));
    },
    get(e, t = "default") {
      const r = et[t];
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
        const r = et[t];
        if (!r) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const s = r.findIndex((n) => n.key === e);
        r.splice(s, 1);
        return;
      }
      et[t] = [];
    }
  };
}
class Jr {
  constructor({
    submitPath: t,
    submitMethod: r = "post",
    loadPath: s = "",
    bag: n = "default",
    form: a = {}
  } = {}) {
    E(this, "loadPath", "");
    E(this, "submitPath", "");
    E(this, "submitMethod", "post");
    E(this, "errors", null);
    E(this, "errorBag", "");
    E(this, "model", tt({}));
    E(this, "form", tt({}));
    E(this, "original", {});
    E(this, "states", {
      load: new xe(),
      submit: new xe()
    });
    return this.submitPath = t, this.submitMethod = r, this.loadPath = s, this.errorBag = n, this.errors = vr(), this.errors.createBag(this.errorBag), this.setAttributes(a), this.states.load.loaded(), new Proxy(this, {
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
    this.errorBag = t || "default", this.errors = vr(), this.errors.createBag(this.errorBag);
  }
  setAttributes(t) {
    this.original = t, this.form = tt({ ...t });
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
      const { data: o } = await je[i](t, a, s);
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
    const { data: r } = await Promise.resolve(t(je, this.form)).catch(
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
    const { data: a } = await je.get(n, {
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
const Yd = {
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
      type: Jr,
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
function Rd(e, t, r, s, n, a) {
  var l;
  const i = A("o-datepicker"), o = A("o-field");
  return F(), ve(o, nt({ label: r.label }, (l = r.form) == null ? void 0 : l.getError(r.name)), {
    default: q(() => [
      ge(i, {
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
const Ed = /* @__PURE__ */ K(Yd, [["render", Rd]]), Pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ed
}, Symbol.toStringTag, { value: "Module" })), Nd = {
  name: "WyxosForm",
  props: {
    form: {
      type: Jr,
      required: !0
    }
  },
  emits: ["submit"]
}, Cd = /* @__PURE__ */ De(" An error occurred. Try again? ");
function Fd(e, t, r, s, n, a) {
  const i = A("o-loading"), o = A("o-button");
  return F(), Me("div", null, [
    r.form.isLoaded ? (F(), Me("form", {
      key: 0,
      class: "form",
      onSubmit: t[0] || (t[0] = Xn((l) => e.$emit("submit"), ["prevent"]))
    }, [
      Ve(e.$slots, "default")
    ], 32)) : Le("", !0),
    ge(i, {
      active: r.form.isLoading
    }, null, 8, ["active"]),
    r.form.isFailure ? (F(), ve(o, {
      key: 1,
      onClick: t[1] || (t[1] = (l) => r.form.load())
    }, {
      default: q(() => [
        Cd
      ]),
      _: 1
    })) : Le("", !0)
  ]);
}
const Wd = /* @__PURE__ */ K(Nd, [["render", Fd]]), Ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wd
}, Symbol.toStringTag, { value: "Module" })), Ld = {
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
}, Ud = ["width", "height"];
function Id(e, t, r, s, n, a) {
  return F(), Me("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, Ud);
}
const $d = /* @__PURE__ */ K(Ld, [["render", Id]]), jd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $d
}, Symbol.toStringTag, { value: "Module" })), Vd = {
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
      errors: vr()
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
function Hd(e, t, r, s, n, a) {
  const i = A("o-input"), o = A("o-field");
  return F(), ve(o, nt({ label: r.label }, { ...s.errors.get(r.name, r.bag), ...a.fieldAttrs }), {
    default: q(() => [
      ge(i, nt(a.inputAttrs, {
        onInput: t[0] || (t[0] = (l) => s.errors.clear(r.name, r.bag))
      }), null, 16)
    ]),
    _: 1
  }, 16, ["label"]);
}
const qd = /* @__PURE__ */ K(Vd, [["render", Hd]]), Bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qd
}, Symbol.toStringTag, { value: "Module" }));
function be(e, t, r = void 0) {
  const s = t.split(".").reduce((n, a) => typeof n < "u" ? n[a] : void 0, e);
  return typeof s < "u" ? s : r;
}
function wr(e) {
  return typeof e < "u" && e !== null ? e : "";
}
function zd(e, t) {
  return e.indexOf(t, e.length - t.length) !== -1;
}
let Gd = {
  iconPack: "mdi",
  useHtml5Validation: !0,
  statusIcon: !0,
  transformClasses: void 0
};
const Jd = () => Gd, Ys = (e, t) => wr(e).split(" ").filter((r) => r.length > 0).map((r) => r + t).join(" "), Rs = (e) => {
  const r = (e.$options.computed ? Object.keys(e.$options.computed) : []).filter((s) => !zd(s, "Classes")).reduce((s, n) => (s[n] = e[n], s), {});
  return { props: e.$props, data: e.$data, computed: r };
};
Kn({
  isOruga: !0,
  props: {
    override: Boolean
  },
  methods: {
    computedClass(e, t, r = "") {
      const s = this.$props.override === !0 ? {} : Jd(), n = this.$props.override || be(s, `${this.$options.configField}.override`, !1), a = be(s, `${this.$options.configField}.${e}.override`, n), i = be(s, "transformClasses", void 0), o = be(s, `${this.$options.configField}.transformClasses`, void 0);
      let l = be(s, `${this.$options.configField}.${e}.class`, "") || be(s, `${this.$options.configField}.${e}`, ""), d = be(this.$props, e);
      Array.isArray(d) && (d = d.join(" ")), t.search("{*}") !== -1 ? t = t.replace(/\{\*\}/g, r) : t = t + r;
      let _ = null;
      typeof d == "function" ? (_ = Rs(this), d = d(r, _)) : d = Ys(d, r), typeof l == "function" ? l = l(r, _ || Rs(this)) : l = Ys(l, r);
      let y = `${n && !a || !n && !a ? t : ""} ${wr(l)} ${wr(d)}`.trim().replace(/\s\s+/g, " ");
      return o && (y = o(y)), i && (y = i(y)), y;
    }
  }
});
const $n = {};
function Zd(e, t) {
  $n[e] = t;
}
function Qd() {
  return { oruga: $n, addProgrammatic: Zd };
}
function Es(e, t = {}) {
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
  const s = r[(a = e.response) == null ? void 0 : a.status] || r[500], { oruga: n } = Qd();
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
const Xd = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: e } = await je.post(this.path).catch((t) => {
        if (t.response.status === 401) {
          window.location.href = "/";
          return;
        }
        Es(t);
      }).catch(Es);
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function Kd(e, t, r, s, n, a) {
  return F(), Me("li", null, [
    Ve(e.$slots, "default", { logout: a.logout }, () => [
      V("button", {
        class: "button is-primary",
        onClick: t[0] || (t[0] = (i) => a.logout())
      }, "Sign out")
    ])
  ]);
}
const ef = /* @__PURE__ */ K(Xd, [["render", Kd]]), tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ef
}, Symbol.toStringTag, { value: "Module" })), rf = {
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
      state: new xe()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, sf = { class: "button-group" };
function nf(e, t, r, s, n, a) {
  const i = A("wyxos-button"), o = A("o-modal");
  return F(), ve(o, { active: !0 }, {
    default: q(() => [
      V("h2", null, re(r.title), 1),
      V("p", null, re(r.message), 1),
      V("div", sf, [
        ge(i, {
          disabled: s.state.isLoading,
          "native-type": "button",
          onClick: t[0] || (t[0] = (l) => e.$emit("close", { action: !1 }))
        }, {
          default: q(() => [
            De(re(r.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        ge(i, {
          loading: s.state.isLoading,
          "native-type": "button",
          onClick: t[1] || (t[1] = (l) => a.proceed())
        }, {
          default: q(() => [
            De(re(r.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const af = /* @__PURE__ */ K(rf, [["render", nf]]), of = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: af
}, Symbol.toStringTag, { value: "Module" })), lf = {
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
      type: Jr,
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
}, uf = ["value"];
function df(e, t, r, s, n, a) {
  var l;
  const i = A("o-select"), o = A("o-field");
  return F(), ve(o, nt({ label: r.label }, (l = r.form) == null ? void 0 : l.getError(r.name)), {
    default: q(() => [
      ge(i, {
        disabled: r.disabled,
        "model-value": r.modelValue,
        name: r.name,
        placeholder: r.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (d) => a.updateValue(d))
      }, {
        default: q(() => [
          Ve(e.$slots, "default", {}, () => [
            r.items ? (F(!0), Me(ea, { key: 0 }, ta(r.items, (d) => (F(), Me("option", {
              key: d.value,
              value: d.value
            }, re(d.label), 9, uf))), 128)) : Le("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const ff = /* @__PURE__ */ K(lf, [["render", df]]), hf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ff
}, Symbol.toStringTag, { value: "Module" }));
class Zr {
  constructor(t = {}) {
    E(this, "state", new xe());
    E(this, "result", es([]));
    E(this, "value", es(null));
    E(this, "timeout", null);
    E(this, "options", {
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
    return new Zr(t);
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
      const s = t || this.options.url, { data: n } = await je.post(`${s}/search`, r || this.options.payload, {
        signal: this.controller.signal
      }).catch((a) => {
        throw this.state.failed(), a;
      });
      this.result.value = n.result, this.state.loaded();
    }, 500);
  }
  async restore(t, r) {
    this.state.loading(), this.reset();
    const s = t || this.options.url, { data: n } = await je.post(`${s}/restore`, r || this.options.payload).catch((a) => {
      throw this.state.failed(), a;
    });
    return this.state.loaded(), n;
  }
  reset() {
    this.result.value = [];
  }
}
const cf = {
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
      search: Zr.create()
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
function mf(e, t, r, s, n, a) {
  const i = A("o-inputitems");
  return F(), ve(i, nt({
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
const _f = /* @__PURE__ */ K(cf, [["render", mf]]), yf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _f
}, Symbol.toStringTag, { value: "Module" })), dr = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": oa, "./components/WyxosCollection.vue": ha, "./components/WyxosConfirm.vue": wa, "./components/WyxosDatepicker.vue": Pd, "./components/WyxosForm.vue": Ad, "./components/WyxosImage.vue": jd, "./components/WyxosInput.vue": Bd, "./components/WyxosLogout.vue": tf, "./components/WyxosPrompt.vue": of, "./components/WyxosSelect.vue": hf, "./components/WyxosTags.vue": yf }), jn = {}, pf = (e) => {
  Object.keys(dr).forEach((t) => {
    const r = dr[t].default.name, s = dr[t].default;
    e.component(r, s), e.component(r.replace("Wyxos", "W"), s), jn[r] = s;
  });
}, wf = {
  install: pf,
  ...jn
};
export {
  wf as default
};
