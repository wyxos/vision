var En = Object.defineProperty;
var Yn = (e, t, s) => t in e ? En(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var B = (e, t, s) => (Yn(e, typeof t != "symbol" ? t + "" : t, s), s);
import { resolveComponent as w, openBlock as l, createBlock as D, withCtx as M, renderSlot as b, createTextVNode as se, createCommentVNode as y, toDisplayString as F, createElementBlock as d, normalizeProps as Hn, guardReactiveProps as Wn, createElementVNode as v, reactive as de, createVNode as O, normalizeClass as c, mergeProps as N, defineComponent as $, withModifiers as T, normalizeStyle as me, Fragment as V, resolveDynamicComponent as qe, withKeys as U, Transition as ye, withDirectives as G, renderList as K, vShow as ee, vModelCheckbox as ra, h as ce, resolveDirective as oa, Comment as zn, Text as _n, vModelSelect as jn, createSlots as js, render as Us, toHandlers as la, vModelRadio as Un, createApp as qn, toHandlerKey as Kn, ref as vt } from "vue";
import ae from "axios";
const fe = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, a] of t)
    s[i] = a;
  return s;
}, Gn = {
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
}, Jn = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Zn(e, t, s, i, a, n) {
  const r = w("o-button");
  return l(), D(r, { disabled: s.loading }, {
    default: M(() => [
      s.loading ? y("", !0) : b(e.$slots, "default", { key: 0 }, () => [
        se("Submit")
      ]),
      s.loading && s.text ? b(e.$slots, "loading", { key: 1 }, () => [
        se(F(s.text), 1)
      ]) : y("", !0),
      s.loading ? (l(), d("i", Jn)) : y("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const Xn = /* @__PURE__ */ fe(Gn, [["render", Zn]]), Qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" })), xn = {
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
}, er = /* @__PURE__ */ v("ul", null, [
  /* @__PURE__ */ v("li")
], -1);
function tr(e, t, s, i, a, n) {
  return b(e.$slots, "default", Hn(Wn({ add: n.add, remove: n.remove, items: a.items })), () => [
    er
  ]);
}
const sr = /* @__PURE__ */ fe(xn, [["render", tr]]), ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sr
}, Symbol.toStringTag, { value: "Module" }));
class ue {
  constructor() {
    B(this, "state", de({
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
    return new ue();
  }
}
const ar = {
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
      state: new ue()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, nr = { class: "bg-white p-6" }, rr = { class: "title" }, or = { class: "mb-6" }, lr = {
  class: "buttons",
  role: "group"
};
function ur(e, t, s, i, a, n) {
  const r = w("wyxos-button"), o = w("o-modal");
  return l(), D(o, {
    active: !0,
    onClose: t[2] || (t[2] = (u) => e.$emit("close", { action: !1 }))
  }, {
    default: M(() => [
      v("section", nr, [
        v("article", null, [
          v("header", null, [
            v("h3", rr, F(s.title), 1)
          ]),
          v("p", or, F(s.message), 1),
          v("footer", lr, [
            O(r, {
              disabled: i.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
            }, {
              default: M(() => [
                se(F(s.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            O(r, {
              class: c([{ [s.confirmType]: !0 }, "button"]),
              loading: i.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (u) => n.proceed())
            }, {
              default: M(() => [
                se(F(s.confirmText), 1)
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
const dr = /* @__PURE__ */ fe(ar, [["render", ur]]), hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dr
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var ua;
function S() {
  return ua.apply(null, arguments);
}
function cr(e) {
  ua = e;
}
function Se(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Xe(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function _(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function qs(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (_(e, t))
      return !1;
  return !0;
}
function le(e) {
  return e === void 0;
}
function Be(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function It(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function da(e, t) {
  var s = [], i, a = e.length;
  for (i = 0; i < a; ++i)
    s.push(t(e[i], i));
  return s;
}
function _e(e, t) {
  for (var s in t)
    _(t, s) && (e[s] = t[s]);
  return _(t, "toString") && (e.toString = t.toString), _(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function Ae(e, t, s, i) {
  return Ra(e, t, s, i, !0).utc();
}
function mr() {
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
function I(e) {
  return e._pf == null && (e._pf = mr()), e._pf;
}
var Vs;
Array.prototype.some ? Vs = Array.prototype.some : Vs = function(e) {
  var t = Object(this), s = t.length >>> 0, i;
  for (i = 0; i < s; i++)
    if (i in t && e.call(this, t[i], i, t))
      return !0;
  return !1;
};
function Ks(e) {
  if (e._isValid == null) {
    var t = I(e), s = Vs.call(t.parsedDateParts, function(a) {
      return a != null;
    }), i = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && s);
    if (e._strict && (i = i && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = i;
    else
      return i;
  }
  return e._isValid;
}
function os(e) {
  var t = Ae(NaN);
  return e != null ? _e(I(t), e) : I(t).userInvalidated = !0, t;
}
var Ni = S.momentProperties = [], Ds = !1;
function Gs(e, t) {
  var s, i, a, n = Ni.length;
  if (le(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), le(t._i) || (e._i = t._i), le(t._f) || (e._f = t._f), le(t._l) || (e._l = t._l), le(t._strict) || (e._strict = t._strict), le(t._tzm) || (e._tzm = t._tzm), le(t._isUTC) || (e._isUTC = t._isUTC), le(t._offset) || (e._offset = t._offset), le(t._pf) || (e._pf = I(t)), le(t._locale) || (e._locale = t._locale), n > 0)
    for (s = 0; s < n; s++)
      i = Ni[s], a = t[i], le(a) || (e[i] = a);
  return e;
}
function Rt(e) {
  Gs(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), Ds === !1 && (Ds = !0, S.updateOffset(this), Ds = !1);
}
function ke(e) {
  return e instanceof Rt || e != null && e._isAMomentObject != null;
}
function ha(e) {
  S.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Ce(e, t) {
  var s = !0;
  return _e(function() {
    if (S.deprecationHandler != null && S.deprecationHandler(null, e), s) {
      var i = [], a, n, r, o = arguments.length;
      for (n = 0; n < o; n++) {
        if (a = "", typeof arguments[n] == "object") {
          a += `
[` + n + "] ";
          for (r in arguments[0])
            _(arguments[0], r) && (a += r + ": " + arguments[0][r] + ", ");
          a = a.slice(0, -2);
        } else
          a = arguments[n];
        i.push(a);
      }
      ha(
        e + `
Arguments: ` + Array.prototype.slice.call(i).join("") + `
` + new Error().stack
      ), s = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var Li = {};
function ca(e, t) {
  S.deprecationHandler != null && S.deprecationHandler(e, t), Li[e] || (ha(t), Li[e] = !0);
}
S.suppressDeprecationWarnings = !1;
S.deprecationHandler = null;
function Me(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function fr(e) {
  var t, s;
  for (s in e)
    _(e, s) && (t = e[s], Me(t) ? this[s] = t : this["_" + s] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function Is(e, t) {
  var s = _e({}, e), i;
  for (i in t)
    _(t, i) && (Xe(e[i]) && Xe(t[i]) ? (s[i] = {}, _e(s[i], e[i]), _e(s[i], t[i])) : t[i] != null ? s[i] = t[i] : delete s[i]);
  for (i in e)
    _(e, i) && !_(t, i) && Xe(e[i]) && (s[i] = _e({}, s[i]));
  return s;
}
function Js(e) {
  e != null && this.set(e);
}
var Rs;
Object.keys ? Rs = Object.keys : Rs = function(e) {
  var t, s = [];
  for (t in e)
    _(e, t) && s.push(t);
  return s;
};
var pr = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function gr(e, t, s) {
  var i = this._calendar[e] || this._calendar.sameElse;
  return Me(i) ? i.call(t, s) : i;
}
function $e(e, t, s) {
  var i = "" + Math.abs(e), a = t - i.length, n = e >= 0;
  return (n ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + i;
}
var Zs = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Lt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Fs = {}, lt = {};
function A(e, t, s, i) {
  var a = i;
  typeof i == "string" && (a = function() {
    return this[i]();
  }), e && (lt[e] = a), t && (lt[t[0]] = function() {
    return $e(a.apply(this, arguments), t[1], t[2]);
  }), s && (lt[s] = function() {
    return this.localeData().ordinal(
      a.apply(this, arguments),
      e
    );
  });
}
function yr(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Cr(e) {
  var t = e.match(Zs), s, i;
  for (s = 0, i = t.length; s < i; s++)
    lt[t[s]] ? t[s] = lt[t[s]] : t[s] = yr(t[s]);
  return function(a) {
    var n = "", r;
    for (r = 0; r < i; r++)
      n += Me(t[r]) ? t[r].call(a, e) : t[r];
    return n;
  };
}
function Ht(e, t) {
  return e.isValid() ? (t = ma(t, e.localeData()), Fs[t] = Fs[t] || Cr(t), Fs[t](e)) : e.localeData().invalidDate();
}
function ma(e, t) {
  var s = 5;
  function i(a) {
    return t.longDateFormat(a) || a;
  }
  for (Lt.lastIndex = 0; s >= 0 && Lt.test(e); )
    e = e.replace(
      Lt,
      i
    ), Lt.lastIndex = 0, s -= 1;
  return e;
}
var br = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function vr(e) {
  var t = this._longDateFormat[e], s = this._longDateFormat[e.toUpperCase()];
  return t || !s ? t : (this._longDateFormat[e] = s.match(Zs).map(function(i) {
    return i === "MMMM" || i === "MM" || i === "DD" || i === "dddd" ? i.slice(1) : i;
  }).join(""), this._longDateFormat[e]);
}
var Sr = "Invalid date";
function kr() {
  return this._invalidDate;
}
var wr = "%d", Dr = /\d{1,2}/;
function Fr(e) {
  return this._ordinal.replace("%d", e);
}
var $r = {
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
function Ar(e, t, s, i) {
  var a = this._relativeTime[s];
  return Me(a) ? a(e, t, s, i) : a.replace(/%d/i, e);
}
function Mr(e, t) {
  var s = this._relativeTime[e > 0 ? "future" : "past"];
  return Me(s) ? s(t) : s.replace(/%s/i, t);
}
var yt = {};
function re(e, t) {
  var s = e.toLowerCase();
  yt[s] = yt[s + "s"] = yt[t] = e;
}
function be(e) {
  return typeof e == "string" ? yt[e] || yt[e.toLowerCase()] : void 0;
}
function Xs(e) {
  var t = {}, s, i;
  for (i in e)
    _(e, i) && (s = be(i), s && (t[s] = e[i]));
  return t;
}
var fa = {};
function oe(e, t) {
  fa[e] = t;
}
function Or(e) {
  var t = [], s;
  for (s in e)
    _(e, s) && t.push({ unit: s, priority: fa[s] });
  return t.sort(function(i, a) {
    return i.priority - a.priority;
  }), t;
}
function ls(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function ge(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function Y(e) {
  var t = +e, s = 0;
  return t !== 0 && isFinite(t) && (s = ge(t)), s;
}
function ct(e, t) {
  return function(s) {
    return s != null ? (pa(this, e, s), S.updateOffset(this, t), this) : Kt(this, e);
  };
}
function Kt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function pa(e, t, s) {
  e.isValid() && !isNaN(s) && (t === "FullYear" && ls(e.year()) && e.month() === 1 && e.date() === 29 ? (s = Y(s), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    s,
    e.month(),
    fs(s, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](s));
}
function Tr(e) {
  return e = be(e), Me(this[e]) ? this[e]() : this;
}
function Pr(e, t) {
  if (typeof e == "object") {
    e = Xs(e);
    var s = Or(e), i, a = s.length;
    for (i = 0; i < a; i++)
      this[s[i].unit](e[s[i].unit]);
  } else if (e = be(e), Me(this[e]))
    return this[e](t);
  return this;
}
var ga = /\d/, pe = /\d\d/, ya = /\d{3}/, Qs = /\d{4}/, us = /[+-]?\d{6}/, Z = /\d\d?/, Ca = /\d\d\d\d?/, ba = /\d\d\d\d\d\d?/, ds = /\d{1,3}/, xs = /\d{1,4}/, hs = /[+-]?\d{1,6}/, mt = /\d+/, cs = /[+-]?\d+/, Vr = /Z|[+-]\d\d:?\d\d/gi, ms = /Z|[+-]\d\d(?::?\d\d)?/gi, Ir = /[+-]?\d+(\.\d{1,3})?/, Bt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Gt;
Gt = {};
function k(e, t, s) {
  Gt[e] = Me(t) ? t : function(i, a) {
    return i && s ? s : t;
  };
}
function Rr(e, t) {
  return _(Gt, e) ? Gt[e](t._strict, t._locale) : new RegExp(Br(e));
}
function Br(e) {
  return he(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, s, i, a, n) {
        return s || i || a || n;
      }
    )
  );
}
function he(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Bs = {};
function q(e, t) {
  var s, i = t, a;
  for (typeof e == "string" && (e = [e]), Be(t) && (i = function(n, r) {
    r[t] = Y(n);
  }), a = e.length, s = 0; s < a; s++)
    Bs[e[s]] = i;
}
function Nt(e, t) {
  q(e, function(s, i, a, n) {
    a._w = a._w || {}, t(s, a._w, a, n);
  });
}
function Nr(e, t, s) {
  t != null && _(Bs, e) && Bs[e](t, s._a, s, e);
}
var ne = 0, Ve = 1, Fe = 2, ie = 3, ve = 4, Ie = 5, Ze = 6, Lr = 7, Er = 8;
function Yr(e, t) {
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
function fs(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var s = Yr(t, 12);
  return e += (t - s) / 12, s === 1 ? ls(e) ? 29 : 28 : 31 - s % 7 % 2;
}
A("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
A("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
A("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
re("month", "M");
oe("month", 8);
k("M", Z);
k("MM", Z, pe);
k("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
k("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
q(["M", "MM"], function(e, t) {
  t[Ve] = Y(e) - 1;
});
q(["MMM", "MMMM"], function(e, t, s, i) {
  var a = s._locale.monthsParse(e, i, s._strict);
  a != null ? t[Ve] = a : I(s).invalidMonth = e;
});
var Hr = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), va = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Sa = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Wr = Bt, zr = Bt;
function _r(e, t) {
  return e ? Se(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Sa).test(t) ? "format" : "standalone"][e.month()] : Se(this._months) ? this._months : this._months.standalone;
}
function jr(e, t) {
  return e ? Se(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Sa.test(t) ? "format" : "standalone"][e.month()] : Se(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Ur(e, t, s) {
  var i, a, n, r = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i)
      n = Ae([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(
        n,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[i] = this.months(n, "").toLocaleLowerCase();
  return s ? t === "MMM" ? (a = x.call(this._shortMonthsParse, r), a !== -1 ? a : null) : (a = x.call(this._longMonthsParse, r), a !== -1 ? a : null) : t === "MMM" ? (a = x.call(this._shortMonthsParse, r), a !== -1 ? a : (a = x.call(this._longMonthsParse, r), a !== -1 ? a : null)) : (a = x.call(this._longMonthsParse, r), a !== -1 ? a : (a = x.call(this._shortMonthsParse, r), a !== -1 ? a : null));
}
function qr(e, t, s) {
  var i, a, n;
  if (this._monthsParseExact)
    return Ur.call(this, e, t, s);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
    if (a = Ae([2e3, i]), s && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp(
      "^" + this.months(a, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[i] = new RegExp(
      "^" + this.monthsShort(a, "").replace(".", "") + "$",
      "i"
    )), !s && !this._monthsParse[i] && (n = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[i] = new RegExp(n.replace(".", ""), "i")), s && t === "MMMM" && this._longMonthsParse[i].test(e))
      return i;
    if (s && t === "MMM" && this._shortMonthsParse[i].test(e))
      return i;
    if (!s && this._monthsParse[i].test(e))
      return i;
  }
}
function ka(e, t) {
  var s;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = Y(t);
    else if (t = e.localeData().monthsParse(t), !Be(t))
      return e;
  }
  return s = Math.min(e.date(), fs(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, s), e;
}
function wa(e) {
  return e != null ? (ka(this, e), S.updateOffset(this, !0), this) : Kt(this, "Month");
}
function Kr() {
  return fs(this.year(), this.month());
}
function Gr(e) {
  return this._monthsParseExact ? (_(this, "_monthsRegex") || Da.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (_(this, "_monthsShortRegex") || (this._monthsShortRegex = Wr), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Jr(e) {
  return this._monthsParseExact ? (_(this, "_monthsRegex") || Da.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (_(this, "_monthsRegex") || (this._monthsRegex = zr), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Da() {
  function e(r, o) {
    return o.length - r.length;
  }
  var t = [], s = [], i = [], a, n;
  for (a = 0; a < 12; a++)
    n = Ae([2e3, a]), t.push(this.monthsShort(n, "")), s.push(this.months(n, "")), i.push(this.months(n, "")), i.push(this.monthsShort(n, ""));
  for (t.sort(e), s.sort(e), i.sort(e), a = 0; a < 12; a++)
    t[a] = he(t[a]), s[a] = he(s[a]);
  for (a = 0; a < 24; a++)
    i[a] = he(i[a]);
  this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
A("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? $e(e, 4) : "+" + e;
});
A(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
A(0, ["YYYY", 4], 0, "year");
A(0, ["YYYYY", 5], 0, "year");
A(0, ["YYYYYY", 6, !0], 0, "year");
re("year", "y");
oe("year", 1);
k("Y", cs);
k("YY", Z, pe);
k("YYYY", xs, Qs);
k("YYYYY", hs, us);
k("YYYYYY", hs, us);
q(["YYYYY", "YYYYYY"], ne);
q("YYYY", function(e, t) {
  t[ne] = e.length === 2 ? S.parseTwoDigitYear(e) : Y(e);
});
q("YY", function(e, t) {
  t[ne] = S.parseTwoDigitYear(e);
});
q("Y", function(e, t) {
  t[ne] = parseInt(e, 10);
});
function Ct(e) {
  return ls(e) ? 366 : 365;
}
S.parseTwoDigitYear = function(e) {
  return Y(e) + (Y(e) > 68 ? 1900 : 2e3);
};
var Fa = ct("FullYear", !0);
function Zr() {
  return ls(this.year());
}
function Xr(e, t, s, i, a, n, r) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, s, i, a, n, r), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, s, i, a, n, r), o;
}
function St(e) {
  var t, s;
  return e < 100 && e >= 0 ? (s = Array.prototype.slice.call(arguments), s[0] = e + 400, t = new Date(Date.UTC.apply(null, s)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function Jt(e, t, s) {
  var i = 7 + t - s, a = (7 + St(e, 0, i).getUTCDay() - t) % 7;
  return -a + i - 1;
}
function $a(e, t, s, i, a) {
  var n = (7 + s - i) % 7, r = Jt(e, i, a), o = 1 + 7 * (t - 1) + n + r, u, h;
  return o <= 0 ? (u = e - 1, h = Ct(u) + o) : o > Ct(e) ? (u = e + 1, h = o - Ct(e)) : (u = e, h = o), {
    year: u,
    dayOfYear: h
  };
}
function kt(e, t, s) {
  var i = Jt(e.year(), t, s), a = Math.floor((e.dayOfYear() - i - 1) / 7) + 1, n, r;
  return a < 1 ? (r = e.year() - 1, n = a + Re(r, t, s)) : a > Re(e.year(), t, s) ? (n = a - Re(e.year(), t, s), r = e.year() + 1) : (r = e.year(), n = a), {
    week: n,
    year: r
  };
}
function Re(e, t, s) {
  var i = Jt(e, t, s), a = Jt(e + 1, t, s);
  return (Ct(e) - i + a) / 7;
}
A("w", ["ww", 2], "wo", "week");
A("W", ["WW", 2], "Wo", "isoWeek");
re("week", "w");
re("isoWeek", "W");
oe("week", 5);
oe("isoWeek", 5);
k("w", Z);
k("ww", Z, pe);
k("W", Z);
k("WW", Z, pe);
Nt(
  ["w", "ww", "W", "WW"],
  function(e, t, s, i) {
    t[i.substr(0, 1)] = Y(e);
  }
);
function Qr(e) {
  return kt(e, this._week.dow, this._week.doy).week;
}
var xr = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function eo() {
  return this._week.dow;
}
function to() {
  return this._week.doy;
}
function so(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function io(e) {
  var t = kt(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
A("d", 0, "do", "day");
A("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
A("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
A("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
A("e", 0, 0, "weekday");
A("E", 0, 0, "isoWeekday");
re("day", "d");
re("weekday", "e");
re("isoWeekday", "E");
oe("day", 11);
oe("weekday", 11);
oe("isoWeekday", 11);
k("d", Z);
k("e", Z);
k("E", Z);
k("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
k("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
k("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
Nt(["dd", "ddd", "dddd"], function(e, t, s, i) {
  var a = s._locale.weekdaysParse(e, i, s._strict);
  a != null ? t.d = a : I(s).invalidWeekday = e;
});
Nt(["d", "e", "E"], function(e, t, s, i) {
  t[i] = Y(e);
});
function ao(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function no(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function ei(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var ro = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Aa = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), oo = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), lo = Bt, uo = Bt, ho = Bt;
function co(e, t) {
  var s = Se(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? ei(s, this._week.dow) : e ? s[e.day()] : s;
}
function mo(e) {
  return e === !0 ? ei(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function fo(e) {
  return e === !0 ? ei(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function po(e, t, s) {
  var i, a, n, r = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i)
      n = Ae([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(
        n,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(
        n,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(n, "").toLocaleLowerCase();
  return s ? t === "dddd" ? (a = x.call(this._weekdaysParse, r), a !== -1 ? a : null) : t === "ddd" ? (a = x.call(this._shortWeekdaysParse, r), a !== -1 ? a : null) : (a = x.call(this._minWeekdaysParse, r), a !== -1 ? a : null) : t === "dddd" ? (a = x.call(this._weekdaysParse, r), a !== -1 || (a = x.call(this._shortWeekdaysParse, r), a !== -1) ? a : (a = x.call(this._minWeekdaysParse, r), a !== -1 ? a : null)) : t === "ddd" ? (a = x.call(this._shortWeekdaysParse, r), a !== -1 || (a = x.call(this._weekdaysParse, r), a !== -1) ? a : (a = x.call(this._minWeekdaysParse, r), a !== -1 ? a : null)) : (a = x.call(this._minWeekdaysParse, r), a !== -1 || (a = x.call(this._weekdaysParse, r), a !== -1) ? a : (a = x.call(this._shortWeekdaysParse, r), a !== -1 ? a : null));
}
function go(e, t, s) {
  var i, a, n;
  if (this._weekdaysParseExact)
    return po.call(this, e, t, s);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
    if (a = Ae([2e3, 1]).day(i), s && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp(
      "^" + this.weekdays(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[i] = new RegExp(
      "^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[i] = new RegExp(
      "^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[i] || (n = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[i] = new RegExp(n.replace(".", ""), "i")), s && t === "dddd" && this._fullWeekdaysParse[i].test(e))
      return i;
    if (s && t === "ddd" && this._shortWeekdaysParse[i].test(e))
      return i;
    if (s && t === "dd" && this._minWeekdaysParse[i].test(e))
      return i;
    if (!s && this._weekdaysParse[i].test(e))
      return i;
  }
}
function yo(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = ao(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Co(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function bo(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = no(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function vo(e) {
  return this._weekdaysParseExact ? (_(this, "_weekdaysRegex") || ti.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (_(this, "_weekdaysRegex") || (this._weekdaysRegex = lo), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function So(e) {
  return this._weekdaysParseExact ? (_(this, "_weekdaysRegex") || ti.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (_(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = uo), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function ko(e) {
  return this._weekdaysParseExact ? (_(this, "_weekdaysRegex") || ti.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (_(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = ho), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function ti() {
  function e(g, R) {
    return R.length - g.length;
  }
  var t = [], s = [], i = [], a = [], n, r, o, u, h;
  for (n = 0; n < 7; n++)
    r = Ae([2e3, 1]).day(n), o = he(this.weekdaysMin(r, "")), u = he(this.weekdaysShort(r, "")), h = he(this.weekdays(r, "")), t.push(o), s.push(u), i.push(h), a.push(o), a.push(u), a.push(h);
  t.sort(e), s.sort(e), i.sort(e), a.sort(e), this._weekdaysRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + i.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function si() {
  return this.hours() % 12 || 12;
}
function wo() {
  return this.hours() || 24;
}
A("H", ["HH", 2], 0, "hour");
A("h", ["hh", 2], 0, si);
A("k", ["kk", 2], 0, wo);
A("hmm", 0, 0, function() {
  return "" + si.apply(this) + $e(this.minutes(), 2);
});
A("hmmss", 0, 0, function() {
  return "" + si.apply(this) + $e(this.minutes(), 2) + $e(this.seconds(), 2);
});
A("Hmm", 0, 0, function() {
  return "" + this.hours() + $e(this.minutes(), 2);
});
A("Hmmss", 0, 0, function() {
  return "" + this.hours() + $e(this.minutes(), 2) + $e(this.seconds(), 2);
});
function Ma(e, t) {
  A(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Ma("a", !0);
Ma("A", !1);
re("hour", "h");
oe("hour", 13);
function Oa(e, t) {
  return t._meridiemParse;
}
k("a", Oa);
k("A", Oa);
k("H", Z);
k("h", Z);
k("k", Z);
k("HH", Z, pe);
k("hh", Z, pe);
k("kk", Z, pe);
k("hmm", Ca);
k("hmmss", ba);
k("Hmm", Ca);
k("Hmmss", ba);
q(["H", "HH"], ie);
q(["k", "kk"], function(e, t, s) {
  var i = Y(e);
  t[ie] = i === 24 ? 0 : i;
});
q(["a", "A"], function(e, t, s) {
  s._isPm = s._locale.isPM(e), s._meridiem = e;
});
q(["h", "hh"], function(e, t, s) {
  t[ie] = Y(e), I(s).bigHour = !0;
});
q("hmm", function(e, t, s) {
  var i = e.length - 2;
  t[ie] = Y(e.substr(0, i)), t[ve] = Y(e.substr(i)), I(s).bigHour = !0;
});
q("hmmss", function(e, t, s) {
  var i = e.length - 4, a = e.length - 2;
  t[ie] = Y(e.substr(0, i)), t[ve] = Y(e.substr(i, 2)), t[Ie] = Y(e.substr(a)), I(s).bigHour = !0;
});
q("Hmm", function(e, t, s) {
  var i = e.length - 2;
  t[ie] = Y(e.substr(0, i)), t[ve] = Y(e.substr(i));
});
q("Hmmss", function(e, t, s) {
  var i = e.length - 4, a = e.length - 2;
  t[ie] = Y(e.substr(0, i)), t[ve] = Y(e.substr(i, 2)), t[Ie] = Y(e.substr(a));
});
function Do(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Fo = /[ap]\.?m?\.?/i, $o = ct("Hours", !0);
function Ao(e, t, s) {
  return e > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
}
var Ta = {
  calendar: pr,
  longDateFormat: br,
  invalidDate: Sr,
  ordinal: wr,
  dayOfMonthOrdinalParse: Dr,
  relativeTime: $r,
  months: Hr,
  monthsShort: va,
  week: xr,
  weekdays: ro,
  weekdaysMin: oo,
  weekdaysShort: Aa,
  meridiemParse: Fo
}, X = {}, pt = {}, wt;
function Mo(e, t) {
  var s, i = Math.min(e.length, t.length);
  for (s = 0; s < i; s += 1)
    if (e[s] !== t[s])
      return s;
  return i;
}
function Ei(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Oo(e) {
  for (var t = 0, s, i, a, n; t < e.length; ) {
    for (n = Ei(e[t]).split("-"), s = n.length, i = Ei(e[t + 1]), i = i ? i.split("-") : null; s > 0; ) {
      if (a = ps(n.slice(0, s).join("-")), a)
        return a;
      if (i && i.length >= s && Mo(n, i) >= s - 1)
        break;
      s--;
    }
    t++;
  }
  return wt;
}
function To(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function ps(e) {
  var t = null, s;
  if (X[e] === void 0 && typeof module < "u" && module && module.exports && To(e))
    try {
      t = wt._abbr, s = require, s("./locale/" + e), Ue(t);
    } catch {
      X[e] = null;
    }
  return X[e];
}
function Ue(e, t) {
  var s;
  return e && (le(t) ? s = Ee(e) : s = ii(e, t), s ? wt = s : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), wt._abbr;
}
function ii(e, t) {
  if (t !== null) {
    var s, i = Ta;
    if (t.abbr = e, X[e] != null)
      ca(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), i = X[e]._config;
    else if (t.parentLocale != null)
      if (X[t.parentLocale] != null)
        i = X[t.parentLocale]._config;
      else if (s = ps(t.parentLocale), s != null)
        i = s._config;
      else
        return pt[t.parentLocale] || (pt[t.parentLocale] = []), pt[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return X[e] = new Js(Is(i, t)), pt[e] && pt[e].forEach(function(a) {
      ii(a.name, a.config);
    }), Ue(e), X[e];
  } else
    return delete X[e], null;
}
function Po(e, t) {
  if (t != null) {
    var s, i, a = Ta;
    X[e] != null && X[e].parentLocale != null ? X[e].set(Is(X[e]._config, t)) : (i = ps(e), i != null && (a = i._config), t = Is(a, t), i == null && (t.abbr = e), s = new Js(t), s.parentLocale = X[e], X[e] = s), Ue(e);
  } else
    X[e] != null && (X[e].parentLocale != null ? (X[e] = X[e].parentLocale, e === Ue() && Ue(e)) : X[e] != null && delete X[e]);
  return X[e];
}
function Ee(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return wt;
  if (!Se(e)) {
    if (t = ps(e), t)
      return t;
    e = [e];
  }
  return Oo(e);
}
function Vo() {
  return Rs(X);
}
function ai(e) {
  var t, s = e._a;
  return s && I(e).overflow === -2 && (t = s[Ve] < 0 || s[Ve] > 11 ? Ve : s[Fe] < 1 || s[Fe] > fs(s[ne], s[Ve]) ? Fe : s[ie] < 0 || s[ie] > 24 || s[ie] === 24 && (s[ve] !== 0 || s[Ie] !== 0 || s[Ze] !== 0) ? ie : s[ve] < 0 || s[ve] > 59 ? ve : s[Ie] < 0 || s[Ie] > 59 ? Ie : s[Ze] < 0 || s[Ze] > 999 ? Ze : -1, I(e)._overflowDayOfYear && (t < ne || t > Fe) && (t = Fe), I(e)._overflowWeeks && t === -1 && (t = Lr), I(e)._overflowWeekday && t === -1 && (t = Er), I(e).overflow = t), e;
}
var Io = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ro = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Bo = /Z|[+-]\d\d(?::?\d\d)?/, Et = [
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
], $s = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], No = /^\/?Date\((-?\d+)/i, Lo = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Eo = {
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
function Pa(e) {
  var t, s, i = e._i, a = Io.exec(i) || Ro.exec(i), n, r, o, u, h = Et.length, g = $s.length;
  if (a) {
    for (I(e).iso = !0, t = 0, s = h; t < s; t++)
      if (Et[t][1].exec(a[1])) {
        r = Et[t][0], n = Et[t][2] !== !1;
        break;
      }
    if (r == null) {
      e._isValid = !1;
      return;
    }
    if (a[3]) {
      for (t = 0, s = g; t < s; t++)
        if ($s[t][1].exec(a[3])) {
          o = (a[2] || " ") + $s[t][0];
          break;
        }
      if (o == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!n && o != null) {
      e._isValid = !1;
      return;
    }
    if (a[4])
      if (Bo.exec(a[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = r + (o || "") + (u || ""), ri(e);
  } else
    e._isValid = !1;
}
function Yo(e, t, s, i, a, n) {
  var r = [
    Ho(e),
    va.indexOf(t),
    parseInt(s, 10),
    parseInt(i, 10),
    parseInt(a, 10)
  ];
  return n && r.push(parseInt(n, 10)), r;
}
function Ho(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Wo(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function zo(e, t, s) {
  if (e) {
    var i = Aa.indexOf(e), a = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (i !== a)
      return I(s).weekdayMismatch = !0, s._isValid = !1, !1;
  }
  return !0;
}
function _o(e, t, s) {
  if (e)
    return Eo[e];
  if (t)
    return 0;
  var i = parseInt(s, 10), a = i % 100, n = (i - a) / 100;
  return n * 60 + a;
}
function Va(e) {
  var t = Lo.exec(Wo(e._i)), s;
  if (t) {
    if (s = Yo(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !zo(t[1], s, e))
      return;
    e._a = s, e._tzm = _o(t[8], t[9], t[10]), e._d = St.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), I(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function jo(e) {
  var t = No.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (Pa(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Va(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : S.createFromInputFallback(e);
}
S.createFromInputFallback = Ce(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function rt(e, t, s) {
  return e ?? t ?? s;
}
function Uo(e) {
  var t = new Date(S.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function ni(e) {
  var t, s, i = [], a, n, r;
  if (!e._d) {
    for (a = Uo(e), e._w && e._a[Fe] == null && e._a[Ve] == null && qo(e), e._dayOfYear != null && (r = rt(e._a[ne], a[ne]), (e._dayOfYear > Ct(r) || e._dayOfYear === 0) && (I(e)._overflowDayOfYear = !0), s = St(r, 0, e._dayOfYear), e._a[Ve] = s.getUTCMonth(), e._a[Fe] = s.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = i[t] = a[t];
    for (; t < 7; t++)
      e._a[t] = i[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[ie] === 24 && e._a[ve] === 0 && e._a[Ie] === 0 && e._a[Ze] === 0 && (e._nextDay = !0, e._a[ie] = 0), e._d = (e._useUTC ? St : Xr).apply(
      null,
      i
    ), n = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[ie] = 24), e._w && typeof e._w.d < "u" && e._w.d !== n && (I(e).weekdayMismatch = !0);
  }
}
function qo(e) {
  var t, s, i, a, n, r, o, u, h;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (n = 1, r = 4, s = rt(
    t.GG,
    e._a[ne],
    kt(J(), 1, 4).year
  ), i = rt(t.W, 1), a = rt(t.E, 1), (a < 1 || a > 7) && (u = !0)) : (n = e._locale._week.dow, r = e._locale._week.doy, h = kt(J(), n, r), s = rt(t.gg, e._a[ne], h.year), i = rt(t.w, h.week), t.d != null ? (a = t.d, (a < 0 || a > 6) && (u = !0)) : t.e != null ? (a = t.e + n, (t.e < 0 || t.e > 6) && (u = !0)) : a = n), i < 1 || i > Re(s, n, r) ? I(e)._overflowWeeks = !0 : u != null ? I(e)._overflowWeekday = !0 : (o = $a(s, i, a, n, r), e._a[ne] = o.year, e._dayOfYear = o.dayOfYear);
}
S.ISO_8601 = function() {
};
S.RFC_2822 = function() {
};
function ri(e) {
  if (e._f === S.ISO_8601) {
    Pa(e);
    return;
  }
  if (e._f === S.RFC_2822) {
    Va(e);
    return;
  }
  e._a = [], I(e).empty = !0;
  var t = "" + e._i, s, i, a, n, r, o = t.length, u = 0, h, g;
  for (a = ma(e._f, e._locale).match(Zs) || [], g = a.length, s = 0; s < g; s++)
    n = a[s], i = (t.match(Rr(n, e)) || [])[0], i && (r = t.substr(0, t.indexOf(i)), r.length > 0 && I(e).unusedInput.push(r), t = t.slice(
      t.indexOf(i) + i.length
    ), u += i.length), lt[n] ? (i ? I(e).empty = !1 : I(e).unusedTokens.push(n), Nr(n, i, e)) : e._strict && !i && I(e).unusedTokens.push(n);
  I(e).charsLeftOver = o - u, t.length > 0 && I(e).unusedInput.push(t), e._a[ie] <= 12 && I(e).bigHour === !0 && e._a[ie] > 0 && (I(e).bigHour = void 0), I(e).parsedDateParts = e._a.slice(0), I(e).meridiem = e._meridiem, e._a[ie] = Ko(
    e._locale,
    e._a[ie],
    e._meridiem
  ), h = I(e).era, h !== null && (e._a[ne] = e._locale.erasConvertYear(h, e._a[ne])), ni(e), ai(e);
}
function Ko(e, t, s) {
  var i;
  return s == null ? t : e.meridiemHour != null ? e.meridiemHour(t, s) : (e.isPM != null && (i = e.isPM(s), i && t < 12 && (t += 12), !i && t === 12 && (t = 0)), t);
}
function Go(e) {
  var t, s, i, a, n, r, o = !1, u = e._f.length;
  if (u === 0) {
    I(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (a = 0; a < u; a++)
    n = 0, r = !1, t = Gs({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[a], ri(t), Ks(t) && (r = !0), n += I(t).charsLeftOver, n += I(t).unusedTokens.length * 10, I(t).score = n, o ? n < i && (i = n, s = t) : (i == null || n < i || r) && (i = n, s = t, r && (o = !0));
  _e(e, s || t);
}
function Jo(e) {
  if (!e._d) {
    var t = Xs(e._i), s = t.day === void 0 ? t.date : t.day;
    e._a = da(
      [t.year, t.month, s, t.hour, t.minute, t.second, t.millisecond],
      function(i) {
        return i && parseInt(i, 10);
      }
    ), ni(e);
  }
}
function Zo(e) {
  var t = new Rt(ai(Ia(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Ia(e) {
  var t = e._i, s = e._f;
  return e._locale = e._locale || Ee(e._l), t === null || s === void 0 && t === "" ? os({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), ke(t) ? new Rt(ai(t)) : (It(t) ? e._d = t : Se(s) ? Go(e) : s ? ri(e) : Xo(e), Ks(e) || (e._d = null), e));
}
function Xo(e) {
  var t = e._i;
  le(t) ? e._d = new Date(S.now()) : It(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? jo(e) : Se(t) ? (e._a = da(t.slice(0), function(s) {
    return parseInt(s, 10);
  }), ni(e)) : Xe(t) ? Jo(e) : Be(t) ? e._d = new Date(t) : S.createFromInputFallback(e);
}
function Ra(e, t, s, i, a) {
  var n = {};
  return (t === !0 || t === !1) && (i = t, t = void 0), (s === !0 || s === !1) && (i = s, s = void 0), (Xe(e) && qs(e) || Se(e) && e.length === 0) && (e = void 0), n._isAMomentObject = !0, n._useUTC = n._isUTC = a, n._l = s, n._i = e, n._f = t, n._strict = i, Zo(n);
}
function J(e, t, s, i) {
  return Ra(e, t, s, i, !1);
}
var Qo = Ce(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = J.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : os();
  }
), xo = Ce(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = J.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : os();
  }
);
function Ba(e, t) {
  var s, i;
  if (t.length === 1 && Se(t[0]) && (t = t[0]), !t.length)
    return J();
  for (s = t[0], i = 1; i < t.length; ++i)
    (!t[i].isValid() || t[i][e](s)) && (s = t[i]);
  return s;
}
function el() {
  var e = [].slice.call(arguments, 0);
  return Ba("isBefore", e);
}
function tl() {
  var e = [].slice.call(arguments, 0);
  return Ba("isAfter", e);
}
var sl = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, gt = [
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
function il(e) {
  var t, s = !1, i, a = gt.length;
  for (t in e)
    if (_(e, t) && !(x.call(gt, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (i = 0; i < a; ++i)
    if (e[gt[i]]) {
      if (s)
        return !1;
      parseFloat(e[gt[i]]) !== Y(e[gt[i]]) && (s = !0);
    }
  return !0;
}
function al() {
  return this._isValid;
}
function nl() {
  return De(NaN);
}
function gs(e) {
  var t = Xs(e), s = t.year || 0, i = t.quarter || 0, a = t.month || 0, n = t.week || t.isoWeek || 0, r = t.day || 0, o = t.hour || 0, u = t.minute || 0, h = t.second || 0, g = t.millisecond || 0;
  this._isValid = il(t), this._milliseconds = +g + h * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +r + n * 7, this._months = +a + i * 3 + s * 12, this._data = {}, this._locale = Ee(), this._bubble();
}
function Wt(e) {
  return e instanceof gs;
}
function Ns(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function rl(e, t, s) {
  var i = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), n = 0, r;
  for (r = 0; r < i; r++)
    (s && e[r] !== t[r] || !s && Y(e[r]) !== Y(t[r])) && n++;
  return n + a;
}
function Na(e, t) {
  A(e, 0, 0, function() {
    var s = this.utcOffset(), i = "+";
    return s < 0 && (s = -s, i = "-"), i + $e(~~(s / 60), 2) + t + $e(~~s % 60, 2);
  });
}
Na("Z", ":");
Na("ZZ", "");
k("Z", ms);
k("ZZ", ms);
q(["Z", "ZZ"], function(e, t, s) {
  s._useUTC = !0, s._tzm = oi(ms, e);
});
var ol = /([\+\-]|\d\d)/gi;
function oi(e, t) {
  var s = (t || "").match(e), i, a, n;
  return s === null ? null : (i = s[s.length - 1] || [], a = (i + "").match(ol) || ["-", 0, 0], n = +(a[1] * 60) + Y(a[2]), n === 0 ? 0 : a[0] === "+" ? n : -n);
}
function li(e, t) {
  var s, i;
  return t._isUTC ? (s = t.clone(), i = (ke(e) || It(e) ? e.valueOf() : J(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + i), S.updateOffset(s, !1), s) : J(e).local();
}
function Ls(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
S.updateOffset = function() {
};
function ll(e, t, s) {
  var i = this._offset || 0, a;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = oi(ms, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !s && (e = e * 60);
    return !this._isUTC && t && (a = Ls(this)), this._offset = e, this._isUTC = !0, a != null && this.add(a, "m"), i !== e && (!t || this._changeInProgress ? Ya(
      this,
      De(e - i, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, S.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? i : Ls(this);
}
function ul(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function dl(e) {
  return this.utcOffset(0, e);
}
function hl(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Ls(this), "m")), this;
}
function cl() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = oi(Vr, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function ml(e) {
  return this.isValid() ? (e = e ? J(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function fl() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function pl() {
  if (!le(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Gs(e, this), e = Ia(e), e._a ? (t = e._isUTC ? Ae(e._a) : J(e._a), this._isDSTShifted = this.isValid() && rl(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function gl() {
  return this.isValid() ? !this._isUTC : !1;
}
function yl() {
  return this.isValid() ? this._isUTC : !1;
}
function La() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Cl = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, bl = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function De(e, t) {
  var s = e, i = null, a, n, r;
  return Wt(e) ? s = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : Be(e) || !isNaN(+e) ? (s = {}, t ? s[t] = +e : s.milliseconds = +e) : (i = Cl.exec(e)) ? (a = i[1] === "-" ? -1 : 1, s = {
    y: 0,
    d: Y(i[Fe]) * a,
    h: Y(i[ie]) * a,
    m: Y(i[ve]) * a,
    s: Y(i[Ie]) * a,
    ms: Y(Ns(i[Ze] * 1e3)) * a
    // the millisecond decimal point is included in the match
  }) : (i = bl.exec(e)) ? (a = i[1] === "-" ? -1 : 1, s = {
    y: Ge(i[2], a),
    M: Ge(i[3], a),
    w: Ge(i[4], a),
    d: Ge(i[5], a),
    h: Ge(i[6], a),
    m: Ge(i[7], a),
    s: Ge(i[8], a)
  }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (r = vl(
    J(s.from),
    J(s.to)
  ), s = {}, s.ms = r.milliseconds, s.M = r.months), n = new gs(s), Wt(e) && _(e, "_locale") && (n._locale = e._locale), Wt(e) && _(e, "_isValid") && (n._isValid = e._isValid), n;
}
De.fn = gs.prototype;
De.invalid = nl;
function Ge(e, t) {
  var s = e && parseFloat(e.replace(",", "."));
  return (isNaN(s) ? 0 : s) * t;
}
function Yi(e, t) {
  var s = {};
  return s.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(s.months, "M").isAfter(t) && --s.months, s.milliseconds = +t - +e.clone().add(s.months, "M"), s;
}
function vl(e, t) {
  var s;
  return e.isValid() && t.isValid() ? (t = li(t, e), e.isBefore(t) ? s = Yi(e, t) : (s = Yi(t, e), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
}
function Ea(e, t) {
  return function(s, i) {
    var a, n;
    return i !== null && !isNaN(+i) && (ca(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), n = s, s = i, i = n), a = De(s, i), Ya(this, a, e), this;
  };
}
function Ya(e, t, s, i) {
  var a = t._milliseconds, n = Ns(t._days), r = Ns(t._months);
  e.isValid() && (i = i ?? !0, r && ka(e, Kt(e, "Month") + r * s), n && pa(e, "Date", Kt(e, "Date") + n * s), a && e._d.setTime(e._d.valueOf() + a * s), i && S.updateOffset(e, n || r));
}
var Sl = Ea(1, "add"), kl = Ea(-1, "subtract");
function Ha(e) {
  return typeof e == "string" || e instanceof String;
}
function wl(e) {
  return ke(e) || It(e) || Ha(e) || Be(e) || Fl(e) || Dl(e) || e === null || e === void 0;
}
function Dl(e) {
  var t = Xe(e) && !qs(e), s = !1, i = [
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
  ], a, n, r = i.length;
  for (a = 0; a < r; a += 1)
    n = i[a], s = s || _(e, n);
  return t && s;
}
function Fl(e) {
  var t = Se(e), s = !1;
  return t && (s = e.filter(function(i) {
    return !Be(i) && Ha(e);
  }).length === 0), t && s;
}
function $l(e) {
  var t = Xe(e) && !qs(e), s = !1, i = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], a, n;
  for (a = 0; a < i.length; a += 1)
    n = i[a], s = s || _(e, n);
  return t && s;
}
function Al(e, t) {
  var s = e.diff(t, "days", !0);
  return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
}
function Ml(e, t) {
  arguments.length === 1 && (arguments[0] ? wl(arguments[0]) ? (e = arguments[0], t = void 0) : $l(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var s = e || J(), i = li(s, this).startOf("day"), a = S.calendarFormat(this, i) || "sameElse", n = t && (Me(t[a]) ? t[a].call(this, s) : t[a]);
  return this.format(
    n || this.localeData().calendar(a, this, J(s))
  );
}
function Ol() {
  return new Rt(this);
}
function Tl(e, t) {
  var s = ke(e) ? e : J(e);
  return this.isValid() && s.isValid() ? (t = be(t) || "millisecond", t === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Pl(e, t) {
  var s = ke(e) ? e : J(e);
  return this.isValid() && s.isValid() ? (t = be(t) || "millisecond", t === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(t).valueOf() < s.valueOf()) : !1;
}
function Vl(e, t, s, i) {
  var a = ke(e) ? e : J(e), n = ke(t) ? t : J(t);
  return this.isValid() && a.isValid() && n.isValid() ? (i = i || "()", (i[0] === "(" ? this.isAfter(a, s) : !this.isBefore(a, s)) && (i[1] === ")" ? this.isBefore(n, s) : !this.isAfter(n, s))) : !1;
}
function Il(e, t) {
  var s = ke(e) ? e : J(e), i;
  return this.isValid() && s.isValid() ? (t = be(t) || "millisecond", t === "millisecond" ? this.valueOf() === s.valueOf() : (i = s.valueOf(), this.clone().startOf(t).valueOf() <= i && i <= this.clone().endOf(t).valueOf())) : !1;
}
function Rl(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function Bl(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Nl(e, t, s) {
  var i, a, n;
  if (!this.isValid())
    return NaN;
  if (i = li(e, this), !i.isValid())
    return NaN;
  switch (a = (i.utcOffset() - this.utcOffset()) * 6e4, t = be(t), t) {
    case "year":
      n = zt(this, i) / 12;
      break;
    case "month":
      n = zt(this, i);
      break;
    case "quarter":
      n = zt(this, i) / 3;
      break;
    case "second":
      n = (this - i) / 1e3;
      break;
    case "minute":
      n = (this - i) / 6e4;
      break;
    case "hour":
      n = (this - i) / 36e5;
      break;
    case "day":
      n = (this - i - a) / 864e5;
      break;
    case "week":
      n = (this - i - a) / 6048e5;
      break;
    default:
      n = this - i;
  }
  return s ? n : ge(n);
}
function zt(e, t) {
  if (e.date() < t.date())
    return -zt(t, e);
  var s = (t.year() - e.year()) * 12 + (t.month() - e.month()), i = e.clone().add(s, "months"), a, n;
  return t - i < 0 ? (a = e.clone().add(s - 1, "months"), n = (t - i) / (i - a)) : (a = e.clone().add(s + 1, "months"), n = (t - i) / (a - i)), -(s + n) || 0;
}
S.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
S.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Ll() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function El(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, s = t ? this.clone().utc() : this;
  return s.year() < 0 || s.year() > 9999 ? Ht(
    s,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : Me(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Ht(s, "Z")) : Ht(
    s,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function Yl() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", s, i, a, n;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), s = "[" + e + '("]', i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", a = "-MM-DD[T]HH:mm:ss.SSS", n = t + '[")]', this.format(s + i + a + n);
}
function Hl(e) {
  e || (e = this.isUtc() ? S.defaultFormatUtc : S.defaultFormat);
  var t = Ht(this, e);
  return this.localeData().postformat(t);
}
function Wl(e, t) {
  return this.isValid() && (ke(e) && e.isValid() || J(e).isValid()) ? De({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function zl(e) {
  return this.from(J(), e);
}
function _l(e, t) {
  return this.isValid() && (ke(e) && e.isValid() || J(e).isValid()) ? De({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function jl(e) {
  return this.to(J(), e);
}
function Wa(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = Ee(e), t != null && (this._locale = t), this);
}
var za = Ce(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function _a() {
  return this._locale;
}
var Zt = 1e3, ut = 60 * Zt, Xt = 60 * ut, ja = (365 * 400 + 97) * 24 * Xt;
function dt(e, t) {
  return (e % t + t) % t;
}
function Ua(e, t, s) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, s) - ja : new Date(e, t, s).valueOf();
}
function qa(e, t, s) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, s) - ja : Date.UTC(e, t, s);
}
function Ul(e) {
  var t, s;
  if (e = be(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? qa : Ua, e) {
    case "year":
      t = s(this.year(), 0, 1);
      break;
    case "quarter":
      t = s(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = s(this.year(), this.month(), 1);
      break;
    case "week":
      t = s(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = s(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= dt(
        t + (this._isUTC ? 0 : this.utcOffset() * ut),
        Xt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= dt(t, ut);
      break;
    case "second":
      t = this._d.valueOf(), t -= dt(t, Zt);
      break;
  }
  return this._d.setTime(t), S.updateOffset(this, !0), this;
}
function ql(e) {
  var t, s;
  if (e = be(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? qa : Ua, e) {
    case "year":
      t = s(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = s(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = s(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = s(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = s(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += Xt - dt(
        t + (this._isUTC ? 0 : this.utcOffset() * ut),
        Xt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += ut - dt(t, ut) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Zt - dt(t, Zt) - 1;
      break;
  }
  return this._d.setTime(t), S.updateOffset(this, !0), this;
}
function Kl() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Gl() {
  return Math.floor(this.valueOf() / 1e3);
}
function Jl() {
  return new Date(this.valueOf());
}
function Zl() {
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
function Xl() {
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
function Ql() {
  return this.isValid() ? this.toISOString() : null;
}
function xl() {
  return Ks(this);
}
function eu() {
  return _e({}, I(this));
}
function tu() {
  return I(this).overflow;
}
function su() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
A("N", 0, 0, "eraAbbr");
A("NN", 0, 0, "eraAbbr");
A("NNN", 0, 0, "eraAbbr");
A("NNNN", 0, 0, "eraName");
A("NNNNN", 0, 0, "eraNarrow");
A("y", ["y", 1], "yo", "eraYear");
A("y", ["yy", 2], 0, "eraYear");
A("y", ["yyy", 3], 0, "eraYear");
A("y", ["yyyy", 4], 0, "eraYear");
k("N", ui);
k("NN", ui);
k("NNN", ui);
k("NNNN", mu);
k("NNNNN", fu);
q(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, s, i) {
    var a = s._locale.erasParse(e, i, s._strict);
    a ? I(s).era = a : I(s).invalidEra = e;
  }
);
k("y", mt);
k("yy", mt);
k("yyy", mt);
k("yyyy", mt);
k("yo", pu);
q(["y", "yy", "yyy", "yyyy"], ne);
q(["yo"], function(e, t, s, i) {
  var a;
  s._locale._eraYearOrdinalRegex && (a = e.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? t[ne] = s._locale.eraYearOrdinalParse(e, a) : t[ne] = parseInt(e, 10);
});
function iu(e, t) {
  var s, i, a, n = this._eras || Ee("en")._eras;
  for (s = 0, i = n.length; s < i; ++s) {
    switch (typeof n[s].since) {
      case "string":
        a = S(n[s].since).startOf("day"), n[s].since = a.valueOf();
        break;
    }
    switch (typeof n[s].until) {
      case "undefined":
        n[s].until = 1 / 0;
        break;
      case "string":
        a = S(n[s].until).startOf("day").valueOf(), n[s].until = a.valueOf();
        break;
    }
  }
  return n;
}
function au(e, t, s) {
  var i, a, n = this.eras(), r, o, u;
  for (e = e.toUpperCase(), i = 0, a = n.length; i < a; ++i)
    if (r = n[i].name.toUpperCase(), o = n[i].abbr.toUpperCase(), u = n[i].narrow.toUpperCase(), s)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return n[i];
          break;
        case "NNNN":
          if (r === e)
            return n[i];
          break;
        case "NNNNN":
          if (u === e)
            return n[i];
          break;
      }
    else if ([r, o, u].indexOf(e) >= 0)
      return n[i];
}
function nu(e, t) {
  var s = e.since <= e.until ? 1 : -1;
  return t === void 0 ? S(e.since).year() : S(e.since).year() + (t - e.offset) * s;
}
function ru() {
  var e, t, s, i = this.localeData().eras();
  for (e = 0, t = i.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), i[e].since <= s && s <= i[e].until || i[e].until <= s && s <= i[e].since)
      return i[e].name;
  return "";
}
function ou() {
  var e, t, s, i = this.localeData().eras();
  for (e = 0, t = i.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), i[e].since <= s && s <= i[e].until || i[e].until <= s && s <= i[e].since)
      return i[e].narrow;
  return "";
}
function lu() {
  var e, t, s, i = this.localeData().eras();
  for (e = 0, t = i.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), i[e].since <= s && s <= i[e].until || i[e].until <= s && s <= i[e].since)
      return i[e].abbr;
  return "";
}
function uu() {
  var e, t, s, i, a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (s = a[e].since <= a[e].until ? 1 : -1, i = this.clone().startOf("day").valueOf(), a[e].since <= i && i <= a[e].until || a[e].until <= i && i <= a[e].since)
      return (this.year() - S(a[e].since).year()) * s + a[e].offset;
  return this.year();
}
function du(e) {
  return _(this, "_erasNameRegex") || di.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function hu(e) {
  return _(this, "_erasAbbrRegex") || di.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function cu(e) {
  return _(this, "_erasNarrowRegex") || di.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function ui(e, t) {
  return t.erasAbbrRegex(e);
}
function mu(e, t) {
  return t.erasNameRegex(e);
}
function fu(e, t) {
  return t.erasNarrowRegex(e);
}
function pu(e, t) {
  return t._eraYearOrdinalRegex || mt;
}
function di() {
  var e = [], t = [], s = [], i = [], a, n, r = this.eras();
  for (a = 0, n = r.length; a < n; ++a)
    t.push(he(r[a].name)), e.push(he(r[a].abbr)), s.push(he(r[a].narrow)), i.push(he(r[a].name)), i.push(he(r[a].abbr)), i.push(he(r[a].narrow));
  this._erasRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  );
}
A(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
A(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function ys(e, t) {
  A(0, [e, e.length], 0, t);
}
ys("gggg", "weekYear");
ys("ggggg", "weekYear");
ys("GGGG", "isoWeekYear");
ys("GGGGG", "isoWeekYear");
re("weekYear", "gg");
re("isoWeekYear", "GG");
oe("weekYear", 1);
oe("isoWeekYear", 1);
k("G", cs);
k("g", cs);
k("GG", Z, pe);
k("gg", Z, pe);
k("GGGG", xs, Qs);
k("gggg", xs, Qs);
k("GGGGG", hs, us);
k("ggggg", hs, us);
Nt(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, s, i) {
    t[i.substr(0, 2)] = Y(e);
  }
);
Nt(["gg", "GG"], function(e, t, s, i) {
  t[i] = S.parseTwoDigitYear(e);
});
function gu(e) {
  return Ka.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function yu(e) {
  return Ka.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Cu() {
  return Re(this.year(), 1, 4);
}
function bu() {
  return Re(this.isoWeekYear(), 1, 4);
}
function vu() {
  var e = this.localeData()._week;
  return Re(this.year(), e.dow, e.doy);
}
function Su() {
  var e = this.localeData()._week;
  return Re(this.weekYear(), e.dow, e.doy);
}
function Ka(e, t, s, i, a) {
  var n;
  return e == null ? kt(this, i, a).year : (n = Re(e, i, a), t > n && (t = n), ku.call(this, e, t, s, i, a));
}
function ku(e, t, s, i, a) {
  var n = $a(e, t, s, i, a), r = St(n.year, 0, n.dayOfYear);
  return this.year(r.getUTCFullYear()), this.month(r.getUTCMonth()), this.date(r.getUTCDate()), this;
}
A("Q", 0, "Qo", "quarter");
re("quarter", "Q");
oe("quarter", 7);
k("Q", ga);
q("Q", function(e, t) {
  t[Ve] = (Y(e) - 1) * 3;
});
function wu(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
A("D", ["DD", 2], "Do", "date");
re("date", "D");
oe("date", 9);
k("D", Z);
k("DD", Z, pe);
k("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
q(["D", "DD"], Fe);
q("Do", function(e, t) {
  t[Fe] = Y(e.match(Z)[0]);
});
var Ga = ct("Date", !0);
A("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
re("dayOfYear", "DDD");
oe("dayOfYear", 4);
k("DDD", ds);
k("DDDD", ya);
q(["DDD", "DDDD"], function(e, t, s) {
  s._dayOfYear = Y(e);
});
function Du(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
A("m", ["mm", 2], 0, "minute");
re("minute", "m");
oe("minute", 14);
k("m", Z);
k("mm", Z, pe);
q(["m", "mm"], ve);
var Fu = ct("Minutes", !1);
A("s", ["ss", 2], 0, "second");
re("second", "s");
oe("second", 15);
k("s", Z);
k("ss", Z, pe);
q(["s", "ss"], Ie);
var $u = ct("Seconds", !1);
A("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
A(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
A(0, ["SSS", 3], 0, "millisecond");
A(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
A(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
A(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
A(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
A(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
A(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
re("millisecond", "ms");
oe("millisecond", 16);
k("S", ds, ga);
k("SS", ds, pe);
k("SSS", ds, ya);
var je, Ja;
for (je = "SSSS"; je.length <= 9; je += "S")
  k(je, mt);
function Au(e, t) {
  t[Ze] = Y(("0." + e) * 1e3);
}
for (je = "S"; je.length <= 9; je += "S")
  q(je, Au);
Ja = ct("Milliseconds", !1);
A("z", 0, 0, "zoneAbbr");
A("zz", 0, 0, "zoneName");
function Mu() {
  return this._isUTC ? "UTC" : "";
}
function Ou() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var C = Rt.prototype;
C.add = Sl;
C.calendar = Ml;
C.clone = Ol;
C.diff = Nl;
C.endOf = ql;
C.format = Hl;
C.from = Wl;
C.fromNow = zl;
C.to = _l;
C.toNow = jl;
C.get = Tr;
C.invalidAt = tu;
C.isAfter = Tl;
C.isBefore = Pl;
C.isBetween = Vl;
C.isSame = Il;
C.isSameOrAfter = Rl;
C.isSameOrBefore = Bl;
C.isValid = xl;
C.lang = za;
C.locale = Wa;
C.localeData = _a;
C.max = xo;
C.min = Qo;
C.parsingFlags = eu;
C.set = Pr;
C.startOf = Ul;
C.subtract = kl;
C.toArray = Zl;
C.toObject = Xl;
C.toDate = Jl;
C.toISOString = El;
C.inspect = Yl;
typeof Symbol < "u" && Symbol.for != null && (C[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
C.toJSON = Ql;
C.toString = Ll;
C.unix = Gl;
C.valueOf = Kl;
C.creationData = su;
C.eraName = ru;
C.eraNarrow = ou;
C.eraAbbr = lu;
C.eraYear = uu;
C.year = Fa;
C.isLeapYear = Zr;
C.weekYear = gu;
C.isoWeekYear = yu;
C.quarter = C.quarters = wu;
C.month = wa;
C.daysInMonth = Kr;
C.week = C.weeks = so;
C.isoWeek = C.isoWeeks = io;
C.weeksInYear = vu;
C.weeksInWeekYear = Su;
C.isoWeeksInYear = Cu;
C.isoWeeksInISOWeekYear = bu;
C.date = Ga;
C.day = C.days = yo;
C.weekday = Co;
C.isoWeekday = bo;
C.dayOfYear = Du;
C.hour = C.hours = $o;
C.minute = C.minutes = Fu;
C.second = C.seconds = $u;
C.millisecond = C.milliseconds = Ja;
C.utcOffset = ll;
C.utc = dl;
C.local = hl;
C.parseZone = cl;
C.hasAlignedHourOffset = ml;
C.isDST = fl;
C.isLocal = gl;
C.isUtcOffset = yl;
C.isUtc = La;
C.isUTC = La;
C.zoneAbbr = Mu;
C.zoneName = Ou;
C.dates = Ce(
  "dates accessor is deprecated. Use date instead.",
  Ga
);
C.months = Ce(
  "months accessor is deprecated. Use month instead",
  wa
);
C.years = Ce(
  "years accessor is deprecated. Use year instead",
  Fa
);
C.zone = Ce(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  ul
);
C.isDSTShifted = Ce(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  pl
);
function Tu(e) {
  return J(e * 1e3);
}
function Pu() {
  return J.apply(null, arguments).parseZone();
}
function Za(e) {
  return e;
}
var j = Js.prototype;
j.calendar = gr;
j.longDateFormat = vr;
j.invalidDate = kr;
j.ordinal = Fr;
j.preparse = Za;
j.postformat = Za;
j.relativeTime = Ar;
j.pastFuture = Mr;
j.set = fr;
j.eras = iu;
j.erasParse = au;
j.erasConvertYear = nu;
j.erasAbbrRegex = hu;
j.erasNameRegex = du;
j.erasNarrowRegex = cu;
j.months = _r;
j.monthsShort = jr;
j.monthsParse = qr;
j.monthsRegex = Jr;
j.monthsShortRegex = Gr;
j.week = Qr;
j.firstDayOfYear = to;
j.firstDayOfWeek = eo;
j.weekdays = co;
j.weekdaysMin = fo;
j.weekdaysShort = mo;
j.weekdaysParse = go;
j.weekdaysRegex = vo;
j.weekdaysShortRegex = So;
j.weekdaysMinRegex = ko;
j.isPM = Do;
j.meridiem = Ao;
function Qt(e, t, s, i) {
  var a = Ee(), n = Ae().set(i, t);
  return a[s](n, e);
}
function Xa(e, t, s) {
  if (Be(e) && (t = e, e = void 0), e = e || "", t != null)
    return Qt(e, t, s, "month");
  var i, a = [];
  for (i = 0; i < 12; i++)
    a[i] = Qt(e, i, s, "month");
  return a;
}
function hi(e, t, s, i) {
  typeof e == "boolean" ? (Be(t) && (s = t, t = void 0), t = t || "") : (t = e, s = t, e = !1, Be(t) && (s = t, t = void 0), t = t || "");
  var a = Ee(), n = e ? a._week.dow : 0, r, o = [];
  if (s != null)
    return Qt(t, (s + n) % 7, i, "day");
  for (r = 0; r < 7; r++)
    o[r] = Qt(t, (r + n) % 7, i, "day");
  return o;
}
function Vu(e, t) {
  return Xa(e, t, "months");
}
function Iu(e, t) {
  return Xa(e, t, "monthsShort");
}
function Ru(e, t, s) {
  return hi(e, t, s, "weekdays");
}
function Bu(e, t, s) {
  return hi(e, t, s, "weekdaysShort");
}
function Nu(e, t, s) {
  return hi(e, t, s, "weekdaysMin");
}
Ue("en", {
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
    var t = e % 10, s = Y(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + s;
  }
});
S.lang = Ce(
  "moment.lang is deprecated. Use moment.locale instead.",
  Ue
);
S.langData = Ce(
  "moment.langData is deprecated. Use moment.localeData instead.",
  Ee
);
var Oe = Math.abs;
function Lu() {
  var e = this._data;
  return this._milliseconds = Oe(this._milliseconds), this._days = Oe(this._days), this._months = Oe(this._months), e.milliseconds = Oe(e.milliseconds), e.seconds = Oe(e.seconds), e.minutes = Oe(e.minutes), e.hours = Oe(e.hours), e.months = Oe(e.months), e.years = Oe(e.years), this;
}
function Qa(e, t, s, i) {
  var a = De(t, s);
  return e._milliseconds += i * a._milliseconds, e._days += i * a._days, e._months += i * a._months, e._bubble();
}
function Eu(e, t) {
  return Qa(this, e, t, 1);
}
function Yu(e, t) {
  return Qa(this, e, t, -1);
}
function Hi(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Hu() {
  var e = this._milliseconds, t = this._days, s = this._months, i = this._data, a, n, r, o, u;
  return e >= 0 && t >= 0 && s >= 0 || e <= 0 && t <= 0 && s <= 0 || (e += Hi(Es(s) + t) * 864e5, t = 0, s = 0), i.milliseconds = e % 1e3, a = ge(e / 1e3), i.seconds = a % 60, n = ge(a / 60), i.minutes = n % 60, r = ge(n / 60), i.hours = r % 24, t += ge(r / 24), u = ge(xa(t)), s += u, t -= Hi(Es(u)), o = ge(s / 12), s %= 12, i.days = t, i.months = s, i.years = o, this;
}
function xa(e) {
  return e * 4800 / 146097;
}
function Es(e) {
  return e * 146097 / 4800;
}
function Wu(e) {
  if (!this.isValid())
    return NaN;
  var t, s, i = this._milliseconds;
  if (e = be(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + i / 864e5, s = this._months + xa(t), e) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (t = this._days + Math.round(Es(this._months)), e) {
      case "week":
        return t / 7 + i / 6048e5;
      case "day":
        return t + i / 864e5;
      case "hour":
        return t * 24 + i / 36e5;
      case "minute":
        return t * 1440 + i / 6e4;
      case "second":
        return t * 86400 + i / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + i;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function zu() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + Y(this._months / 12) * 31536e6 : NaN;
}
function Ye(e) {
  return function() {
    return this.as(e);
  };
}
var _u = Ye("ms"), ju = Ye("s"), Uu = Ye("m"), qu = Ye("h"), Ku = Ye("d"), Gu = Ye("w"), Ju = Ye("M"), Zu = Ye("Q"), Xu = Ye("y");
function Qu() {
  return De(this);
}
function xu(e) {
  return e = be(e), this.isValid() ? this[e + "s"]() : NaN;
}
function st(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var ed = st("milliseconds"), td = st("seconds"), sd = st("minutes"), id = st("hours"), ad = st("days"), nd = st("months"), rd = st("years");
function od() {
  return ge(this.days() / 7);
}
var Te = Math.round, ot = {
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
function ld(e, t, s, i, a) {
  return a.relativeTime(t || 1, !!s, e, i);
}
function ud(e, t, s, i) {
  var a = De(e).abs(), n = Te(a.as("s")), r = Te(a.as("m")), o = Te(a.as("h")), u = Te(a.as("d")), h = Te(a.as("M")), g = Te(a.as("w")), R = Te(a.as("y")), Q = n <= s.ss && ["s", n] || n < s.s && ["ss", n] || r <= 1 && ["m"] || r < s.m && ["mm", r] || o <= 1 && ["h"] || o < s.h && ["hh", o] || u <= 1 && ["d"] || u < s.d && ["dd", u];
  return s.w != null && (Q = Q || g <= 1 && ["w"] || g < s.w && ["ww", g]), Q = Q || h <= 1 && ["M"] || h < s.M && ["MM", h] || R <= 1 && ["y"] || ["yy", R], Q[2] = t, Q[3] = +e > 0, Q[4] = i, ld.apply(null, Q);
}
function dd(e) {
  return e === void 0 ? Te : typeof e == "function" ? (Te = e, !0) : !1;
}
function hd(e, t) {
  return ot[e] === void 0 ? !1 : t === void 0 ? ot[e] : (ot[e] = t, e === "s" && (ot.ss = t - 1), !0);
}
function cd(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var s = !1, i = ot, a, n;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (s = e), typeof t == "object" && (i = Object.assign({}, ot, t), t.s != null && t.ss == null && (i.ss = t.s - 1)), a = this.localeData(), n = ud(this, !s, i, a), s && (n = a.pastFuture(+this, n)), a.postformat(n);
}
var As = Math.abs;
function at(e) {
  return (e > 0) - (e < 0) || +e;
}
function Cs() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = As(this._milliseconds) / 1e3, t = As(this._days), s = As(this._months), i, a, n, r, o = this.asSeconds(), u, h, g, R;
  return o ? (i = ge(e / 60), a = ge(i / 60), e %= 60, i %= 60, n = ge(s / 12), s %= 12, r = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", h = at(this._months) !== at(o) ? "-" : "", g = at(this._days) !== at(o) ? "-" : "", R = at(this._milliseconds) !== at(o) ? "-" : "", u + "P" + (n ? h + n + "Y" : "") + (s ? h + s + "M" : "") + (t ? g + t + "D" : "") + (a || i || e ? "T" : "") + (a ? R + a + "H" : "") + (i ? R + i + "M" : "") + (e ? R + r + "S" : "")) : "P0D";
}
var W = gs.prototype;
W.isValid = al;
W.abs = Lu;
W.add = Eu;
W.subtract = Yu;
W.as = Wu;
W.asMilliseconds = _u;
W.asSeconds = ju;
W.asMinutes = Uu;
W.asHours = qu;
W.asDays = Ku;
W.asWeeks = Gu;
W.asMonths = Ju;
W.asQuarters = Zu;
W.asYears = Xu;
W.valueOf = zu;
W._bubble = Hu;
W.clone = Qu;
W.get = xu;
W.milliseconds = ed;
W.seconds = td;
W.minutes = sd;
W.hours = id;
W.days = ad;
W.weeks = od;
W.months = nd;
W.years = rd;
W.humanize = cd;
W.toISOString = Cs;
W.toString = Cs;
W.toJSON = Cs;
W.locale = Wa;
W.localeData = _a;
W.toIsoString = Ce(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Cs
);
W.lang = za;
A("X", 0, 0, "unix");
A("x", 0, 0, "valueOf");
k("x", cs);
k("X", Ir);
q("X", function(e, t, s) {
  s._d = new Date(parseFloat(e) * 1e3);
});
q("x", function(e, t, s) {
  s._d = new Date(Y(e));
});
//! moment.js
S.version = "2.29.4";
cr(J);
S.fn = C;
S.min = el;
S.max = tl;
S.now = sl;
S.utc = Ae;
S.unix = Tu;
S.months = Vu;
S.isDate = It;
S.locale = Ue;
S.invalid = os;
S.duration = De;
S.isMoment = ke;
S.weekdays = Ru;
S.parseZone = Pu;
S.localeData = Ee;
S.isDuration = Wt;
S.monthsShort = Iu;
S.weekdaysMin = Nu;
S.defineLocale = ii;
S.updateLocale = Po;
S.locales = Vo;
S.weekdaysShort = Bu;
S.normalizeUnits = be;
S.relativeTimeRounding = dd;
S.relativeTimeThreshold = hd;
S.calendarFormat = Al;
S.prototype = C;
S.HTML5_FMT = {
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
const Je = de({
  default: []
});
function Dt() {
  return {
    createBag(e) {
      Je[e] || (Je[e] = []);
    },
    set(e, t = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      Je[t] = Object.keys(e.response.data.errors).map((i) => ({
        key: i,
        message: e.response.data.errors[i][0]
      }));
    },
    get(e, t = "default") {
      const s = Je[t];
      if (!s)
        return {
          message: "",
          variant: ""
        };
      const i = s.find(
        (a) => Array.isArray(e) ? e.includes(a.key) : a.key === e
      );
      return i ? {
        message: i.message,
        variant: "danger"
      } : {
        message: "",
        variant: ""
      };
    },
    clear(e = null, t = "default") {
      if (e) {
        const s = Je[t];
        if (!s) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const i = s.findIndex((a) => a.key === e);
        s.splice(i, 1);
        return;
      }
      Je[t] = [];
    },
    all(e = "default") {
      return Je[e];
    }
  };
}
class bs {
  constructor({
    submitPath: t,
    submitMethod: s = "post",
    loadPath: i = "",
    bag: a = "default",
    form: n = {}
  } = {}) {
    B(this, "loadPath", "");
    B(this, "submitPath", "");
    B(this, "submitMethod", "post");
    B(this, "errors", null);
    B(this, "errorBag", "");
    B(this, "model", de({}));
    B(this, "form", de({}));
    B(this, "original", {});
    B(this, "states", {
      load: new ue(),
      submit: new ue()
    });
    return this.submitPath = t, this.submitMethod = s, this.loadPath = i, this.errorBag = a, this.errors = Dt(), this.errors.createBag(this.errorBag), this.setAttributes(n), this.states.load.loaded(), new Proxy(this, {
      get(r, o, u) {
        if (Reflect.has(r, o))
          return Reflect.get(r, o, u);
        if (Reflect.has(r.form, o)) {
          const h = o.split(".");
          if (h.length > 1) {
            let g = r.form;
            for (let R = 0; R < h.length; R++)
              g = g[h[R]];
            return g ?? void 0;
          }
          return Reflect.get(r.form, o);
        }
      },
      set(r, o, u, h) {
        if (Reflect.has(r, o))
          return Reflect.set(r, o, u, h);
        if (Reflect.has(r.form, o)) {
          const g = o.split(".");
          if (g.length > 1) {
            let R = r.form;
            for (let Q = 0; Q < g.length - 1; Q++)
              g[Q] in R || (R[g[Q]] = {}), R = R[g[Q]];
            return R[g[g.length - 1]] === void 0 ? !1 : (R[g[g.length - 1]] = u, !0);
          }
          return Reflect.set(r.form, o, u);
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
    this.errorBag = t || "default", this.errors = Dt(), this.errors.createBag(this.errorBag);
  }
  setAttributes(t) {
    this.original = t, this.form = de({ ...t });
  }
  getError(t) {
    return this.errors.get(t, this.errorBag);
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag);
  }
  async submit({ path: t = this.submitPath, formatter: s = null, config: i = {} } = {}, a = null) {
    var u;
    if (typeof t != "string")
      throw new Error("Path must be a string");
    if (s !== null && typeof s != "function")
      throw new Error("Formatter must be a function");
    if (typeof i != "object")
      throw new Error("Config must be an object");
    this.clearErrors(), this.submitting();
    const n = JSON.parse(JSON.stringify(this.form)), r = s ? s(this.form) : n;
    if (!t)
      return this.handleSubmissionFailure("No url defined.");
    const o = (i == null ? void 0 : i.method) || this.submitMethod || "post";
    try {
      const { data: h } = await ae[o](t, r, i);
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
    const { data: s } = await Promise.resolve(t(ae, this.form)).catch(
      (i) => {
        throw this.states.submit.failed(), this.errors.set(i, this.errorBag), i;
      }
    );
    return this.states.submit.loaded(), s;
  }
  async load({ path: t = "", params: s = {}, updateOriginal: i = !0 } = {}) {
    this.loading();
    const a = t || this.loadPath;
    if (!a)
      throw this.loadFailed(), Error("Url is not defined for the load method.");
    const { data: n } = await ae.get(a, {
      params: s
    }).catch((r) => {
      throw this.loadFailed(), r;
    });
    return i && Object.assign(this.original, n.form), Object.assign(this.form, n.form), n.model && Object.assign(this.model, n.model), this.loaded(), n;
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
const md = {
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
      type: bs,
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
      this.query = e ? S(e, this.submitFormat)._d : null;
    }
  },
  mounted() {
    this.modelValue && (this.query = S(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(e) {
      return e ? S(e).format(this.displayFormat) : null;
    },
    updateQuery() {
      var e;
      this.$emit(
        "update:modelValue",
        this.query ? S(this.query).format(this.submitFormat) : null
      ), (e = this.form) == null || e.clearError(this.name);
    }
  }
};
function fd(e, t, s, i, a, n) {
  var u;
  const r = w("o-datepicker"), o = w("o-field");
  return l(), D(o, N({ label: s.label }, (u = s.form) == null ? void 0 : u.getError(s.name)), {
    default: M(() => [
      O(r, N({
        modelValue: a.query,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => a.query = h)
      }, s.options, {
        "date-formatter": n.dateFormatter,
        "onUpdate:modelValue": n.updateQuery
      }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const pd = /* @__PURE__ */ fe(md, [["render", fd]]), gd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pd
}, Symbol.toStringTag, { value: "Module" })), yd = $({
  name: "WyxosError",
  props: {
    form: {
      type: bs,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: Dt()
    };
  }
}), Cd = { key: 0 }, bd = { key: 1 };
function vd(e, t, s, i, a, n) {
  var r, o;
  return (r = e.form) != null && r.getError(e.name).message ? (l(), d("p", Cd, F(e.form.getError(e.name).message), 1)) : (o = e.errors.get(e.name)) != null && o.message ? (l(), d("p", bd, F(e.errors.get(e.name).message), 1)) : y("", !0);
}
const Sd = /* @__PURE__ */ fe(yd, [["render", vd]]), kd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sd
}, Symbol.toStringTag, { value: "Module" })), wd = {
  name: "WyxosForm",
  props: {
    form: {
      type: bs,
      required: !0
    }
  },
  emits: ["submit"]
};
function Dd(e, t, s, i, a, n) {
  const r = w("o-loading"), o = w("o-button");
  return l(), d("div", null, [
    s.form.isLoaded ? (l(), d("form", {
      key: 0,
      class: "form",
      onSubmit: t[0] || (t[0] = T((u) => e.$emit("submit"), ["prevent"]))
    }, [
      b(e.$slots, "default")
    ], 32)) : y("", !0),
    O(r, {
      active: s.form.isLoading
    }, null, 8, ["active"]),
    s.form.isFailure ? (l(), D(o, {
      key: 1,
      onClick: t[1] || (t[1] = (u) => s.form.load())
    }, {
      default: M(() => [
        se(" An error occurred. Try again? ")
      ]),
      _: 1
    })) : y("", !0)
  ]);
}
const Fd = /* @__PURE__ */ fe(wd, [["render", Dd]]), $d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fd
}, Symbol.toStringTag, { value: "Module" })), Ad = {
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
}, Md = ["width", "height"];
function Od(e, t, s, i, a, n) {
  return l(), d("img", {
    ref: "image",
    src: "",
    alt: "",
    width: a.width,
    height: a.height
  }, null, 8, Md);
}
const Td = /* @__PURE__ */ fe(Ad, [["render", Od]]), Pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Td
}, Symbol.toStringTag, { value: "Module" })), Vd = {
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
    inputRootClass: {
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
      errors: Dt()
    };
  },
  methods: {
    onInput(e) {
      this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", e);
    }
  }
};
function Id(e, t, s, i, a, n) {
  const r = w("o-input"), o = w("o-field");
  return l(), D(o, N({
    label: s.label,
    class: s.fieldClass
  }, { ...i.errors.get(s.name, s.bag) }), {
    default: M(() => [
      O(r, {
        readonly: s.readonly,
        class: c(s.inputClass),
        "root-class": s.inputRootClass,
        name: s.name,
        type: s.type,
        clearable: s.clearable,
        disabled: s.disabled,
        "model-value": s.modelValue,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => n.onInput(u))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const Rd = /* @__PURE__ */ fe(Vd, [["render", Id]]), Bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rd
}, Symbol.toStringTag, { value: "Module" }));
function Nd(e) {
  return e < 0 ? -1 : e > 0 ? 1 : 0;
}
const Ld = Math.sign || Nd;
function xt(e, t) {
  return (e & t) === t;
}
function _t(e, t) {
  return (e % t + t) % t;
}
function Wi(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function m(e, t, s = void 0) {
  const i = t.split(".").reduce((a, n) => typeof a < "u" ? a[n] : void 0, e);
  return typeof i < "u" ? i : s;
}
function Ms(e, t, s) {
  if (!e)
    return -1;
  if (!s || typeof s != "function")
    return e.indexOf(t);
  for (let i = 0; i < e.length; i++)
    if (s(e[i], t))
      return i;
  return -1;
}
const zi = (e) => typeof e == "object" && !Array.isArray(e), en = (e, t, s = !1) => {
  if (s || !Object.assign) {
    const i = (n) => zi(t[n]) && e !== null && Object.prototype.hasOwnProperty.call(e, n) && zi(e[n]);
    let a;
    return t === null || typeof t > "u" ? a = !1 : a = Object.getOwnPropertyNames(t).map((n) => ({ [n]: i(n) ? en(e[n], t[n], s) : t[n] })).reduce((n, r) => ({ ...n, ...r }), {}), {
      ...e,
      ...a
    };
  } else
    return Object.assign(e, t);
}, ft = en, ze = {
  Android: function() {
    return typeof window < "u" && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return typeof window < "u" && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return typeof window < "u" && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return typeof window < "u" && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return typeof window < "u" && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return ze.Android() || ze.BlackBerry() || ze.iOS() || ze.Opera() || ze.Windows();
  }
};
function Ed() {
  return typeof window < "u" && window.navigator.userAgent.indexOf("AppleWebKit/") !== -1 && window.navigator.userAgent.indexOf("Chrome/") === -1;
}
function it(e) {
  typeof e.remove < "u" ? e.remove() : typeof e.parentNode < "u" && e.parentNode !== null && e.parentNode.removeChild(e);
}
function ci(e) {
  const t = document.createElement("div");
  t.style.position = "absolute", t.style.left = "0px", t.style.top = "0px";
  const s = document.createElement("div");
  return t.appendChild(s), s.appendChild(e), document.body.appendChild(t), t;
}
function Yd(e) {
  return e && e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function Qe(e) {
  return e === void 0 ? null : isNaN(e) ? e : e + "px";
}
function Ys(e) {
  return typeof e < "u" && e !== null ? e : "";
}
function Hd(e, t) {
  return typeof e < "u" && e !== null ? e : t;
}
function Wd(e = void 0, t = "long") {
  const s = [];
  for (let a = 0; a < 12; a++)
    s.push(new Date(2e3, a, 15));
  const i = new Intl.DateTimeFormat(e, {
    month: t
    // timeZone: 'UTC'
  });
  return s.map((a) => i.format(a));
}
function zd(e = void 0, t = 0, s = "narrow") {
  const i = [];
  for (let n = 1, r = 0; r < 7; n++) {
    const o = new Date(2e3, 0, n);
    (o.getDay() === t || r > 0) && (i.push(o), r++);
  }
  const a = new Intl.DateTimeFormat(e, {
    weekday: s
    // timeZone: 'UTC'
  });
  return i.map((n) => a.format(n));
}
function mi(e, t) {
  const s = t.match(e);
  return e.toString().match(/<(.+?)>/g).map((i) => {
    const a = i.match(/<(.+)>/);
    return !a || a.length <= 0 ? null : i.match(/<(.+)>/)[1];
  }).reduce((i, a, n) => (s && s.length > n ? i[a] = s[n + 1] : i[a] = null, i), {});
}
function tn(e, t, s) {
  let i;
  return function() {
    const a = this, n = arguments, r = function() {
      i = null, s || e.apply(a, n);
    }, o = s && !i;
    clearTimeout(i), i = setTimeout(r, t), o && e.apply(a, n);
  };
}
function _d(e, t) {
  return e.indexOf(t, e.length - t.length) !== -1;
}
const _i = (e) => e !== void 0;
function ji(e) {
  return e && e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
let sn = {
  iconPack: "mdi",
  useHtml5Validation: !0,
  statusIcon: !0,
  transformClasses: void 0
};
const an = (e) => {
  sn = e;
}, p = () => sn;
let vs;
const jd = (e) => {
  vs = e;
}, Ud = {
  getOptions: p,
  setOptions(e) {
    an(ft(p(), e, !0));
  }
}, Ui = (e, t) => Ys(e).split(" ").filter((s) => s.length > 0).map((s) => s + t).join(" "), qi = (e) => {
  const s = (e.$options.computed ? Object.keys(e.$options.computed) : []).filter((i) => !_d(i, "Classes")).reduce((i, a) => (i[a] = e[a], i), {});
  return { props: e.$props, data: e.$data, computed: s };
};
var L = $({
  isOruga: !0,
  props: {
    override: Boolean
  },
  methods: {
    computedClass(e, t, s = "") {
      const i = this.$props.override === !0 ? {} : p(), a = this.$props.override || m(i, `${this.$options.configField}.override`, !1), n = m(i, `${this.$options.configField}.${e}.override`, a), r = m(i, "transformClasses", void 0), o = m(i, `${this.$options.configField}.transformClasses`, void 0);
      let u = m(i, `${this.$options.configField}.${e}.class`, "") || m(i, `${this.$options.configField}.${e}`, ""), h = m(this.$props, e);
      Array.isArray(h) && (h = h.join(" ")), t.search("{*}") !== -1 ? t = t.replace(/\{\*\}/g, s) : t = t + s;
      let g = null;
      typeof h == "function" ? (g = qi(this), h = h(s, g)) : h = Ui(h, s), typeof u == "function" ? u = u(s, g || qi(this)) : u = Ui(u, s);
      let R = `${a && !n || !a && !n ? t : ""} ${Ys(u)} ${Ys(h)}`.trim().replace(/\s\s+/g, " ");
      return o && (R = o(R)), r && (R = r(R)), R;
    }
  }
});
const nn = {};
function qd(e, t) {
  nn[e] = t;
}
function fi() {
  return { oruga: nn, addProgrammatic: qd };
}
const Kd = (e, t) => {
  e.use(t);
}, H = (e, t) => {
  e.component(t.name, t);
}, Ss = (e, t, s) => {
  const { oruga: i, addProgrammatic: a } = fi();
  a(t, s), e._context.provides && e._context.provides.oruga || e.provide("oruga", i), e.config.globalProperties.$oruga || (e.config.globalProperties.$oruga = i);
}, Gd = {
  sizes: {
    default: "mdi-24px",
    small: null,
    medium: "mdi-36px",
    large: "mdi-48px"
  },
  iconPrefix: "mdi-"
}, nt = () => {
  const t = m(p(), "iconComponent") ? "" : "fa-";
  return {
    sizes: {
      default: null,
      small: null,
      medium: t + "lg",
      large: t + "2x"
    },
    iconPrefix: t,
    internalIcons: {
      check: "check",
      information: "info-circle",
      alert: "exclamation-triangle",
      "alert-circle": "exclamation-circle",
      "arrow-up": "arrow-up",
      "chevron-right": "angle-right",
      "chevron-left": "angle-left",
      "chevron-down": "angle-down",
      "chevron-up": "angle-up",
      eye: "eye",
      "eye-off": "eye-slash",
      "caret-down": "caret-down",
      "caret-up": "caret-up",
      "close-circle": "times-circle",
      close: "times",
      loading: "circle-notch"
    }
  };
}, Jd = () => {
  let e = {
    mdi: Gd,
    fa: nt(),
    fas: nt(),
    far: nt(),
    fad: nt(),
    fab: nt(),
    fal: nt()
  };
  const t = m(p(), "customIconPacks");
  return t && (e = ft(e, t, !0)), e;
};
var Zd = Jd, z = $({
  name: "OIcon",
  mixins: [L],
  configField: "icon",
  props: {
    /**
     * 	Color of the icon, optional
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: [String, Object],
    /**
     * Icon component name
     */
    component: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    pack: String,
    /**
     * Icon name
     */
    icon: String,
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: String,
    /**
     * Overrides icon font size, optional
     * @values Depends on library: null (smallest), fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize: String,
    /**
     * Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes
     */
    customClass: String,
    /**
     * When true makes icon clickable
     */
    clickable: Boolean,
    /** Enable spin effect on icon */
    spin: Boolean,
    /** Rotation 0-360 */
    rotation: [Number, String],
    /** @ignore */
    both: Boolean,
    rootClass: [String, Function, Array],
    clickableClass: [String, Function, Array],
    spinClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-icon"),
        { [this.computedClass("clickableClass", "o-icon--clickable")]: this.clickable },
        { [this.computedClass("spinClass", "o-icon--spin")]: this.spin },
        { [this.computedClass("sizeClass", "o-icon--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-icon--", this.newVariant)]: this.newVariant }
      ];
    },
    rootStyle() {
      const e = {};
      return this.rotation && (e.transform = `rotate(${this.rotation}deg)`), e;
    },
    iconConfig() {
      return Zd()[this.newPack];
    },
    iconPrefix() {
      return this.iconConfig && this.iconConfig.iconPrefix ? this.iconConfig.iconPrefix : "";
    },
    /**
    * Internal icon name based on the pack.
    * If pack is 'fa', gets the equivalent FA icon name of the MDI,
    * internal icons are always MDI.
    */
    newIcon() {
      return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
    },
    newPack() {
      return this.pack || m(p(), "iconPack", "mdi");
    },
    newVariant() {
      if (!this.variant)
        return;
      let e = "";
      return typeof this.variant == "string" ? e = this.variant : e = Object.keys(this.variant).filter((t) => this.variant[t])[0], e;
    },
    newCustomSize() {
      return this.customSize || this.customSizeByPack;
    },
    customSizeByPack() {
      if (this.iconConfig && this.iconConfig.sizes) {
        if (this.size && this.iconConfig.sizes[this.size] !== void 0)
          return this.iconConfig.sizes[this.size];
        if (this.iconConfig.sizes.default)
          return this.iconConfig.sizes.default;
      }
      return null;
    },
    useIconComponent() {
      if (this.component)
        return this.component;
      const e = m(p(), "iconComponent");
      return e || null;
    }
  },
  methods: {
    /**
    * Equivalent icon name of the MDI.
    */
    getEquivalentIconOf(e) {
      return this.both && this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[e] ? this.iconConfig.internalIcons[e] : e;
    }
  }
});
function Xd(e, t, s, i, a, n) {
  return l(), d(
    "span",
    {
      class: c(e.rootClasses),
      style: me(e.rootStyle)
    },
    [e.useIconComponent ? (l(), d(
      V,
      {
        key: 1
      },
      [y(" custom icon component "), (l(), D(qe(e.useIconComponent), {
        icon: [e.newPack, e.newIcon],
        size: e.newCustomSize,
        class: c([e.customClass])
      }, null, 8, ["icon", "size", "class"]))],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )) : (l(), d(
      "i",
      {
        key: 0,
        class: c([e.newPack, e.newIcon, e.newCustomSize, e.customClass])
      },
      null,
      2
      /* CLASS */
    ))],
    6
    /* CLASS, STYLE */
  );
}
z.render = Xd;
z.__file = "src/components/icon/Icon.vue";
const Qd = typeof window > "u" ? [] : [
  HTMLButtonElement,
  HTMLFieldSetElement,
  HTMLInputElement,
  HTMLObjectElement,
  HTMLOutputElement,
  HTMLSelectElement,
  HTMLTextAreaElement
];
function Ki(e) {
  return Qd.some((t) => e instanceof t) ? e : null;
}
var Ke = $({
  inject: {
    $field: { from: "$field", default: !1 }
  },
  emits: ["blur", "focus"],
  props: {
    /**
     * Makes input full width when inside a grouped or addon field
     */
    expanded: Boolean,
    /**
     * Makes the element rounded
     */
    rounded: Boolean,
    /**
     * Icon name to be added
     */
    icon: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /** Native options to use in HTML5 validation */
    autocomplete: String,
    /** Same as native maxlength, plus character counter */
    maxlength: [Number, String],
    /** Enable html 5 native validation */
    useHtml5Validation: {
      type: Boolean,
      default: () => m(p(), "useHtml5Validation", !0)
    },
    /** Show status icon using field and variant prop */
    statusIcon: {
      type: Boolean,
      default: () => m(p(), "statusIcon", !0)
    },
    /**
     * The message which is shown when a validation error occurs
     */
    validationMessage: String
  },
  data() {
    return {
      isValid: !0,
      isFocused: !1,
      newIconPack: this.iconPack
    };
  },
  computed: {
    parentField() {
      return this.$field;
    },
    /**
     * Get the type prop from parent if it's a Field.
     */
    statusVariant() {
      if (this.parentField && this.parentField.newVariant) {
        if (typeof this.parentField.newVariant == "string")
          return this.parentField.newVariant;
        for (const e in this.parentField.newVariant)
          if (this.parentField.newVariant[e])
            return e;
      }
    },
    /**
     * Get the message prop from parent if it's a Field.
     */
    statusMessage() {
      if (this.parentField)
        return this.parentField.newMessage || this.parentField.hasMessageSlot;
    },
    /**
    * Icon name based on the variant.
    */
    statusVariantIcon() {
      return m(p(), "statusVariantIcon", {
        success: "check",
        danger: "alert-circle",
        info: "information",
        warning: "alert"
      })[this.statusVariant] || "";
    }
  },
  methods: {
    /**
     * Focus method that work dynamically depending on the component.
     */
    focus(e) {
      const t = this.getElement();
      t && this.$nextTick(() => {
        t && t.focus();
      });
    },
    onBlur(e) {
      this.isFocused = !1, this.parentField && (this.parentField.isFocused = !1), this.$emit("blur", e), this.checkHtml5Validity();
    },
    onFocus(e) {
      this.isFocused = !0, this.parentField && (this.parentField.isFocused = !0), this.$emit("focus", e);
    },
    onInvalid(e) {
      this.checkHtml5Validity();
      const t = Ki(e.target);
      if (t && this.parentField && this.useHtml5Validation) {
        e.preventDefault();
        let s = !1;
        if (t.form != null) {
          const i = t.form.elements;
          for (let a = 0; a < i.length; ++a) {
            const n = Ki(i.item(a));
            if (n && n.willValidate && !n.validity.valid) {
              s = t === n;
              break;
            }
          }
        }
        if (s) {
          const i = this.parentField.$el, a = m(p(), "reportInvalidInput");
          if (a instanceof Function)
            a(t, i);
          else {
            const n = i ? i.scrollIntoViewIfNeeded != null : !1;
            t.focus({ preventScroll: n }), n && i.scrollIntoViewIfNeeded();
          }
        }
      }
      this.$emit("invalid", e);
    },
    getElement() {
      let e = this.$refs[this.$elementRef];
      for (; e && e.$elementRef; )
        e = e.$refs[e.$elementRef];
      return e;
    },
    setInvalid() {
      const e = "danger", t = this.validationMessage || this.getElement().validationMessage;
      this.setValidity(e, t);
    },
    setValidity(e, t) {
      this.$nextTick(() => {
        this.parentField && (this.parentField.variant || (this.parentField.newVariant = e), this.parentField.message || (this.parentField.newMessage = t));
      });
    },
    /**
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'danger' type,
     * and error message to parent if it's a Field.
     */
    checkHtml5Validity() {
      if (!this.useHtml5Validation)
        return;
      const e = this.getElement();
      if (e)
        return e.validity.valid ? (this.setValidity(null, null), this.isValid = !0) : (this.setInvalid(), this.isValid = !1), this.isValid;
    },
    syncFilled(e) {
      this.parentField && (this.parentField.isFilled = !!e);
    }
  }
}), we = $({
  name: "OInput",
  components: {
    [z.name]: z
  },
  mixins: [L, Ke],
  configField: "input",
  inheritAttrs: !1,
  emits: ["update:modelValue", "input", "focus", "blur", "invalid", "icon-click", "icon-right-click"],
  props: {
    /** @model */
    modelValue: [Number, String],
    /** Native options to use in HTML5 validation */
    autocomplete: String,
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: String,
    /**
     * 	Adds the reveal password functionality
     */
    passwordReveal: Boolean,
    /**
     * Makes the icon clickable
     */
    iconClickable: Boolean,
    /**
     * Show character counter when maxlength prop is passed
     */
    hasCounter: {
      type: Boolean,
      default: () => m(p(), "input.counter", !1)
    },
    /**
     * Automatically adjust height in textarea
     */
    autosize: {
      type: Boolean,
      default: !1
    },
    /**
     * 	Icon name to be added on the right side
     */
    iconRight: String,
    /**
     * Make the icon right clickable
     */
    iconRightClickable: Boolean,
    /** Variant of right icon */
    iconRightVariant: String,
    /** Add a button/icon to clear the inputed text */
    clearable: {
      type: Boolean,
      default: () => m(p(), "input.clearable", !1)
    },
    rootClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    iconLeftSpaceClass: [String, Function, Array],
    iconRightSpaceClass: [String, Function, Array],
    inputClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    counterClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue,
      newType: this.type,
      // from mixin (ts workaround)
      newAutocomplete: this.autocomplete || m(p(), "input.autocompletete", "off"),
      isPasswordVisible: !1,
      height: "auto"
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-ctrl-input"),
        { [this.computedClass("expandedClass", "o-ctrl-input--expanded")]: this.expanded }
      ];
    },
    inputClasses() {
      return [
        this.computedClass("inputClass", "o-input"),
        { [this.computedClass("roundedClass", "o-input--rounded")]: this.rounded },
        { [this.computedClass("sizeClass", "o-input--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-input--", this.statusVariant || this.variant)]: this.statusVariant || this.variant },
        { [this.computedClass("textareaClass", "o-input__textarea")]: this.type === "textarea" },
        { [this.computedClass("iconLeftSpaceClass", "o-input-iconspace-left")]: this.icon },
        { [this.computedClass("iconRightSpaceClass", "o-input-iconspace-right")]: this.hasIconRight }
      ];
    },
    iconLeftClasses() {
      return [
        this.computedClass("iconLeftClass", "o-input__icon-left")
      ];
    },
    iconRightClasses() {
      return [
        this.computedClass("iconRightClass", "o-input__icon-right")
      ];
    },
    counterClasses() {
      return [
        this.computedClass("counterClass", "o-input__counter")
      ];
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(e) {
        this.newValue = e, this.$emit("update:modelValue", this.newValue), this.syncFilled(this.newValue), !this.isValid && this.checkHtml5Validity();
      }
    },
    hasIconRight() {
      return this.passwordReveal || this.statusIcon && this.statusVariantIcon || this.clearable && this.newValue || this.iconRight;
    },
    rightIcon() {
      return this.passwordReveal ? this.passwordVisibleIcon : this.clearable && this.newValue ? "close-circle" : this.iconRight ? this.iconRight : this.statusVariantIcon;
    },
    rightIconVariant() {
      return this.passwordReveal || this.iconRight ? this.iconRightVariant || this.variant || null : this.statusVariant;
    },
    /**
    * Check if have any message prop from parent if it's a Field.
    */
    hasMessage() {
      return !!this.statusMessage;
    },
    /**
    * Current password-reveal icon name.
    */
    passwordVisibleIcon() {
      return this.isPasswordVisible ? "eye-off" : "eye";
    },
    /**
    * Get value length
    */
    valueLength() {
      return typeof this.computedValue == "string" ? this.computedValue.length : typeof this.computedValue == "number" ? this.computedValue.toString().length : 0;
    },
    /**
    * Computed inline styles for autoresize
    */
    computedStyles() {
      return this.autosize ? {
        resize: "none",
        height: this.height,
        overflow: "hidden"
      } : {};
    },
    $elementRef() {
      return this.type === "textarea" ? "textarea" : "input";
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set internal value.
    */
    modelValue: {
      immediate: !0,
      handler(e) {
        this.newValue = e, this.syncFilled(this.newValue), this.autosize && this.resize();
      }
    },
    type(e) {
      this.newType = e;
    }
  },
  methods: {
    /**
    * Toggle the visibility of a password-reveal input
    * by changing the type and focus the input right away.
    */
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible, this.newType = this.isPasswordVisible ? "text" : "password", this.$nextTick(() => {
        this.focus();
      });
    },
    onInput(e) {
      this.computedValue = e.target.value;
    },
    iconClick(e, t) {
      this.$emit(e, t), this.$nextTick(() => {
        this.focus();
      });
    },
    rightIconClick(e) {
      this.passwordReveal ? this.togglePasswordVisibility() : this.clearable ? this.computedValue = "" : this.iconRightClickable && this.iconClick("icon-right-click", e);
    },
    resize() {
      this.height = "auto", this.$nextTick(() => {
        const e = this.$refs.textarea.scrollHeight;
        this.height = e + "px";
      });
    }
  }
});
const xd = ["type", "autocomplete", "maxlength", "value"], eh = ["maxlength", "value"];
function th(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [e.type !== "textarea" ? (l(), d("input", N({
      key: 0
    }, e.$attrs, {
      ref: "input",
      class: e.inputClasses,
      type: e.newType,
      autocomplete: e.newAutocomplete,
      maxlength: e.maxlength,
      value: e.computedValue,
      onInput: t[0] || (t[0] = (...o) => e.onInput && e.onInput(...o)),
      onBlur: t[1] || (t[1] = (...o) => e.onBlur && e.onBlur(...o)),
      onFocus: t[2] || (t[2] = (...o) => e.onFocus && e.onFocus(...o)),
      onInvalid: t[3] || (t[3] = (...o) => e.onInvalid && e.onInvalid(...o))
    }), null, 16, xd)) : (l(), d("textarea", N({
      key: 1
    }, e.$attrs, {
      ref: "textarea",
      class: e.inputClasses,
      maxlength: e.maxlength,
      value: e.computedValue,
      onInput: t[4] || (t[4] = (...o) => e.onInput && e.onInput(...o)),
      onBlur: t[5] || (t[5] = (...o) => e.onBlur && e.onBlur(...o)),
      onFocus: t[6] || (t[6] = (...o) => e.onFocus && e.onFocus(...o)),
      onInvalid: t[7] || (t[7] = (...o) => e.onInvalid && e.onInvalid(...o)),
      style: e.computedStyles
    }), null, 16, eh)), e.icon ? (l(), D(r, {
      key: 2,
      class: c(e.iconLeftClasses),
      clickable: e.iconClickable,
      icon: e.icon,
      pack: e.iconPack,
      size: e.size,
      onClick: t[8] || (t[8] = (o) => e.iconClick("icon-click", o))
    }, null, 8, ["class", "clickable", "icon", "pack", "size"])) : y("v-if", !0), e.hasIconRight ? (l(), D(r, {
      key: 3,
      class: c(e.iconRightClasses),
      clickable: e.passwordReveal || e.clearable || e.iconRightClickable,
      icon: e.rightIcon,
      pack: e.iconPack,
      size: e.size,
      variant: e.rightIconVariant,
      both: "",
      onClick: e.rightIconClick
    }, null, 8, ["class", "clickable", "icon", "pack", "size", "variant", "onClick"])) : y("v-if", !0), e.maxlength && e.hasCounter && e.isFocused && e.type !== "number" ? (l(), d(
      "small",
      {
        key: 4,
        class: c(e.counterClasses)
      },
      F(e.valueLength) + " / " + F(e.maxlength),
      3
      /* TEXT, CLASS */
    )) : y("v-if", !0)],
    2
    /* CLASS */
  );
}
we.render = th;
we.__file = "src/components/input/Input.vue";
var Ft = $({
  name: "OAutocomplete",
  configField: "autocomplete",
  components: {
    [we.name]: we
  },
  mixins: [L, Ke],
  inheritAttrs: !1,
  emits: ["update:modelValue", "select", "infinite-scroll", "typing", "focus", "blur", "invalid", "icon-click", "icon-right-click"],
  props: {
    /** @model */
    modelValue: [Number, String],
    /** Options / suggestions */
    data: {
      type: Array,
      default: () => []
    },
    /** Native options to use in HTML5 validation */
    autocomplete: String,
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
    field: {
      type: String,
      default: "value"
    },
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: Boolean,
    /** Clear input text on select */
    clearOnSelect: Boolean,
    /** Open dropdown list on focus */
    openOnFocus: Boolean,
    /** Function to format an option to a string for display in the input as alternative to field prop) */
    customFormatter: Function,
    /** Makes the component check if list reached scroll end and emit infinite-scroll event. */
    checkInfiniteScroll: Boolean,
    /** Keep open dropdown list after select */
    keepOpen: Boolean,
    /** Add a button/icon to clear the inputed text */
    clearable: Boolean,
    /** Max height of dropdown content */
    maxHeight: [String, Number],
    /**
     * Position of dropdown
     * @values auto, top, bottom
     */
    menuPosition: {
      type: String,
      default: "auto"
    },
    /** Transition name to apply on dropdown list */
    animation: {
      type: String,
      default: () => m(p(), "autocomplete.animation", "fade")
    },
    /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
    groupField: String,
    /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
    groupOptions: String,
    /** Number of milliseconds to delay before to emit typing event */
    debounceTyping: Number,
    /** Icon name to be added on the right side */
    iconRight: String,
    /** Clickable icon right if exists */
    iconRightClickable: Boolean,
    /** Append autocomplete content to body */
    appendToBody: Boolean,
    /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
    confirmKeys: {
      type: Array,
      default: () => ["Tab", "Enter"]
    },
    /** Input type */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Menu tag name
     */
    menuTag: {
      type: String,
      default: () => m(p(), "autocomplete.menuTag", "div")
    },
    /**
     * Menu item tag name
     */
    itemTag: {
      type: String,
      default: () => m(p(), "autocomplete.itemTag", "div")
    },
    /** Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled */
    selectOnClickOutside: Boolean,
    /** Allows the header in the autocomplete to be selectable */
    selectableHeader: Boolean,
    /** Allows the footer in the autocomplete to be selectable */
    selectableFooter: Boolean,
    rootClass: [String, Function, Array],
    menuClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    menuPositionClass: [String, Function, Array],
    itemClass: [String, Function, Array],
    itemHoverClass: [String, Function, Array],
    itemGroupTitleClass: [String, Function, Array],
    itemEmptyClass: [String, Function, Array],
    itemHeaderClass: [String, Function, Array],
    itemFooterClass: [String, Function, Array],
    inputClasses: {
      type: Object,
      default: () => m(p(), "autocomplete.inputClasses", {})
    }
  },
  data() {
    return {
      selected: null,
      hovered: null,
      headerHovered: null,
      footerHovered: null,
      isActive: !1,
      newValue: this.modelValue,
      ariaAutocomplete: this.keepFirst ? "both" : "list",
      newAutocomplete: this.autocomplete || "off",
      isListInViewportVertically: !0,
      hasFocus: !1,
      itemRefs: [],
      width: void 0,
      bodyEl: void 0
      // Used to append to body
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-acp"),
        { [this.computedClass("expandedClass", "o-acp--expanded")]: this.expanded }
      ];
    },
    menuClasses() {
      return [
        this.computedClass("menuClass", "o-acp__menu"),
        { [this.computedClass("menuPositionClass", "o-acp__menu--", this.newDropdownPosition)]: !this.appendToBody }
      ];
    },
    itemClasses() {
      return [
        this.computedClass("itemClass", "o-acp__item")
      ];
    },
    itemEmptyClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemEmptyClass", "o-acp__item--empty")
      ];
    },
    itemGroupClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemGroupTitleClass", "o-acp__item-group-title")
      ];
    },
    itemHeaderClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemHeaderClass", "o-acp__item-header"),
        { [this.computedClass("itemHoverClass", "o-acp__item--hover")]: this.headerHovered }
      ];
    },
    itemFooterClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemFooterClass", "o-acp__item-footer"),
        { [this.computedClass("itemHoverClass", "o-acp__item--hover")]: this.footerHovered }
      ];
    },
    inputBind() {
      return {
        ...this.$attrs,
        ...this.inputClasses
      };
    },
    computedData() {
      if (this.groupField)
        if (this.groupOptions) {
          const e = [];
          return this.data.forEach((t) => {
            const s = m(t, this.groupField), i = m(t, this.groupOptions);
            e.push({ group: s, items: i });
          }), e;
        } else {
          const e = {};
          this.data.forEach((s) => {
            const i = m(s, this.groupField);
            e[i] || (e[i] = []), e[i].push(s);
          });
          const t = [];
          return Object.keys(this.data).forEach((s) => {
            t.push({ group: s, items: this.data[s] });
          }), t;
        }
      return [{ items: this.data }];
    },
    isEmpty() {
      return this.computedData ? !this.computedData.some((e) => e.items && e.items.length) : !0;
    },
    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList() {
      const e = [];
      if (e.push(this.$refs.input.$el.querySelector("input")), e.push(this.$refs.dropdown), this.$refs.dropdown !== void 0) {
        const t = this.$refs.dropdown.querySelectorAll("*");
        for (const s of t)
          e.push(s);
      }
      return e;
    },
    newDropdownPosition() {
      return this.menuPosition === "top" || this.menuPosition === "auto" && !this.isListInViewportVertically ? "top" : "bottom";
    },
    newIconRight() {
      return this.clearable && this.newValue ? "close-circle" : this.iconRight;
    },
    newIconRightClickable() {
      return this.clearable ? !0 : this.iconRightClickable;
    },
    menuStyle() {
      return {
        maxHeight: Qe(this.maxHeight)
      };
    },
    $elementRef() {
      return "input";
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(e) {
      this.newValue = e;
    },
    /**
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive(e) {
      this.menuPosition === "auto" && (e ? this.calcDropdownInViewportVertical() : setTimeout(() => {
        this.calcDropdownInViewportVertical();
      }, 100));
    },
    /**
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue(e) {
      this.$emit("update:modelValue", e);
      const t = this.getValue(this.selected);
      t && t !== e && this.setSelected(null, !1), this.hasFocus && (!this.openOnFocus || e) && (this.isActive = !!e);
    },
    /**
     * Select first option if "keep-first
     */
    data() {
      if (this.keepFirst)
        this.$nextTick(() => {
          this.isActive ? this.selectFirstOption(this.computedData) : this.setHovered(null);
        });
      else if (this.hovered) {
        const e = this.getValue(this.hovered);
        this.computedData.map((s) => s.items).reduce((s, i) => [...s, ...i], []).some((s) => this.getValue(s) === e) || this.setHovered(null);
      }
    },
    debounceTyping: {
      handler(e) {
        this.debouncedEmitTyping = tn(this.emitTyping, e);
      },
      immediate: !0
    }
  },
  methods: {
    itemOptionClasses(e) {
      return [
        ...this.itemClasses,
        { [this.computedClass("itemHoverClass", "o-acp__item--hover")]: e === this.hovered }
      ];
    },
    /**
     * Set which option is currently hovered.
     */
    setHovered(e) {
      e !== void 0 && (this.hovered = e);
    },
    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected(e, t = !0, s = void 0) {
      if (e !== void 0) {
        if (this.selected = e, this.$emit("select", this.selected, s), this.selected !== null) {
          if (this.clearOnSelect) {
            const i = this.$refs.input;
            i.newValue = "", i.$refs.input.value = "";
          } else
            this.newValue = this.getValue(this.selected);
          this.setHovered(null);
        }
        t && this.$nextTick(() => {
          this.isActive = !1;
        }), this.checkValidity();
      }
    },
    /**
     * Select first option
     */
    selectFirstOption(e) {
      this.$nextTick(() => {
        const t = e.filter((s) => s.items && s.items.length);
        if (t.length) {
          const s = t[0].items[0];
          this.setHovered(s);
        } else
          this.setHovered(null);
      });
    },
    /**
     * Key listener.
     * Select the hovered option.
     */
    keydown(e) {
      const { key: t } = e;
      if (t === "Enter" && e.preventDefault(), (t === "Escape" || t === "Tab") && (this.isActive = !1), this.confirmKeys.indexOf(t) >= 0) {
        t === "," && e.preventDefault();
        const s = !this.keepOpen || t === "Tab";
        if (this.hovered === null) {
          this.checkIfHeaderOrFooterSelected(e, null, s);
          return;
        }
        this.setSelected(this.hovered, s, e);
      }
    },
    selectHeaderOrFoterByClick(e, t) {
      this.checkIfHeaderOrFooterSelected(e, { origin: t });
    },
    /**
     * Check if header or footer was selected.
     */
    checkIfHeaderOrFooterSelected(e, t, s = !0) {
      this.selectableHeader && (this.headerHovered || t && t.origin === "header") && (this.$emit("select-header", e), this.headerHovered = !1, t && this.setHovered(null), s && (this.isActive = !1)), this.selectableFooter && (this.footerHovered || t && t.origin === "header") && (this.$emit("select-footer", e), this.footerHovered = !1, t && this.setHovered(null), s && (this.isActive = !1));
    },
    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside(e) {
      !this.hasFocus && this.whiteList.indexOf(e.target) < 0 && (this.keepFirst && this.hovered && this.selectOnClickOutside ? this.setSelected(this.hovered, !0) : this.isActive = !1);
    },
    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue(e) {
      if (e !== null)
        return typeof this.customFormatter < "u" ? this.customFormatter(e) : typeof e == "object" ? m(e, this.field) : e;
    },
    /**
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll() {
      const e = this.$refs.dropdown, t = this.$slots.footer ? this.$refs.footer.clientHeight : 0;
      e.clientHeight !== e.scrollHeight && e.scrollTop + e.clientHeight + t >= e.scrollHeight && this.$emit("infinite-scroll");
    },
    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      this.$nextTick(() => {
        if (!this.$refs.dropdown)
          return;
        const e = this.$refs.dropdown.getBoundingClientRect();
        this.isListInViewportVertically = e.top >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight), this.appendToBody && this.updateAppendToBody();
      });
    },
    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(e) {
      const t = e === "down" ? 1 : -1;
      if (this.isActive) {
        const s = this.computedData.map((h) => h.items).reduce((h, g) => [...h, ...g], []);
        this.$slots.header && this.selectableHeader && s.unshift(void 0), this.$slots.footer && this.selectableFooter && s.push(void 0);
        let i;
        this.headerHovered ? i = 0 + t : this.footerHovered ? i = s.length - 1 + t : i = s.indexOf(this.hovered) + t, i = i > s.length - 1 ? s.length - 1 : i, i = i < 0 ? 0 : i, this.footerHovered = !1, this.headerHovered = !1, this.setHovered(s[i] !== void 0 ? s[i] : null), this.$slots.footer && this.selectableFooter && i === s.length - 1 && (this.footerHovered = !0), this.$slots.header && this.selectableHeader && i === 0 && (this.headerHovered = !0);
        const a = this.$refs.dropdown;
        let n = this.itemRefs || [];
        this.$slots.header && this.selectableHeader && (n = [this.$refs.header, ...n]), this.$slots.footer && this.selectableFooter && (n = [...n, this.$refs.footer]);
        const r = n[i];
        if (!r)
          return;
        const o = a.scrollTop, u = a.scrollTop + a.clientHeight - r.clientHeight;
        r.offsetTop < o ? a.scrollTop = r.offsetTop : r.offsetTop >= u && (a.scrollTop = r.offsetTop - a.clientHeight + r.clientHeight);
      } else
        this.isActive = !0;
    },
    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused(e) {
      this.getValue(this.selected) === this.newValue && this.$el.querySelector("input").select(), this.openOnFocus && (this.isActive = !0, this.keepFirst && this.selectFirstOption(this.computedData)), this.hasFocus = !0, this.$emit("focus", e);
    },
    /**
    * Blur listener.
    */
    onBlur(e) {
      this.hasFocus = !1, this.$emit("blur", e);
    },
    onInput() {
      const e = this.getValue(this.selected);
      e && e === this.newValue || (this.debounceTyping ? this.debouncedEmitTyping() : this.emitTyping());
    },
    emitTyping() {
      this.$emit("typing", this.newValue), this.checkValidity();
    },
    rightIconClick(e) {
      this.clearable ? (this.newValue = "", this.setSelected(null, !1), this.openOnFocus && this.$refs.input.$el.focus()) : this.$emit("icon-right-click", e);
    },
    checkValidity() {
      this.useHtml5Validation && this.$nextTick(() => {
        this.checkHtml5Validity();
      });
    },
    setItemRef(e) {
      e && this.itemRefs.push(e);
    },
    updateAppendToBody() {
      const e = this.$refs.dropdown, t = this.$refs.input.$el;
      if (e && t) {
        const s = this.$data.bodyEl;
        s.classList.forEach((r) => s.classList.remove(...r.split(" "))), this.rootClasses.forEach((r) => {
          r && (typeof r == "object" ? Object.keys(r).filter((o) => o && r[o]).forEach((o) => s.classList.add(o)) : s.classList.add(...r.split(" ")));
        });
        const i = t.getBoundingClientRect();
        let a = i.top + window.scrollY;
        const n = i.left + window.scrollX;
        this.newDropdownPosition !== "top" ? a += t.clientHeight : a -= e.clientHeight, e.style.position = "absolute", e.style.top = `${a}px`, e.style.left = `${n}px`, e.style.width = `${t.clientWidth}px`, e.style.maxWidth = `${t.clientWidth}px`, e.style.zIndex = "9999";
      }
    }
  },
  created() {
    typeof window < "u" && (document.addEventListener("click", this.clickedOutside), this.menuPosition === "auto" && window.addEventListener("resize", this.calcDropdownInViewportVertical));
  },
  mounted() {
    const e = this.$refs.dropdown;
    this.checkInfiniteScroll && e && e.addEventListener("scroll", this.checkIfReachedTheEndOfScroll), this.appendToBody && (this.$data.bodyEl = ci(e), this.updateAppendToBody());
  },
  beforeUpdate() {
    this.width = this.$refs.input ? this.$refs.input.$el.clientWidth : void 0, this.itemRefs = [];
  },
  beforeUnmount() {
    typeof window < "u" && (document.removeEventListener("click", this.clickedOutside), this.menuPosition === "auto" && window.removeEventListener("resize", this.calcDropdownInViewportVertical)), this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.removeEventListener("scroll", this.checkIfReachedTheEndOfScroll), this.appendToBody && it(this.$data.bodyEl);
  }
});
const sh = ["is"], ih = ["is"], ah = ["is"], nh = {
  key: 1
}, rh = ["is", "onClick"], oh = {
  key: 1
}, lh = ["is"], uh = ["is"];
function dh(e, t, s, i, a, n) {
  const r = w("o-input");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [O(r, N(e.inputBind, {
      modelValue: e.newValue,
      "onUpdate:modelValue": [t[0] || (t[0] = (o) => e.newValue = o), e.onInput],
      ref: "input",
      type: e.type,
      size: e.size,
      rounded: e.rounded,
      icon: e.icon,
      "icon-right": e.newIconRight,
      "icon-right-clickable": e.newIconRightClickable,
      "icon-pack": e.iconPack,
      maxlength: e.maxlength,
      autocomplete: e.newAutocomplete,
      "use-html5-validation": !1,
      "aria-autocomplete": e.ariaAutocomplete,
      expanded: e.expanded,
      onFocus: e.focused,
      onBlur: e.onBlur,
      onInvalid: e.onInvalid,
      onKeydown: [e.keydown, t[1] || (t[1] = U(T((o) => e.keyArrows("up"), ["prevent"]), ["up"])), t[2] || (t[2] = U(T((o) => e.keyArrows("down"), ["prevent"]), ["down"]))],
      onIconRightClick: e.rightIconClick,
      onIconClick: t[3] || (t[3] = (o) => e.$emit("icon-click", o))
    }), null, 16, ["modelValue", "type", "size", "rounded", "icon", "icon-right", "icon-right-clickable", "icon-pack", "maxlength", "autocomplete", "aria-autocomplete", "expanded", "onUpdate:modelValue", "onFocus", "onBlur", "onInvalid", "onKeydown", "onIconRightClick"]), O(ye, {
      name: e.animation,
      persisted: ""
    }, {
      default: M(() => [G(v("div", {
        class: c(e.menuClasses),
        is: e.menuTag,
        style: me(e.menuStyle),
        ref: "dropdown"
      }, [e.$slots.header ? (l(), d("div", {
        key: 0,
        is: e.itemTag,
        ref: "header",
        role: "button",
        tabindex: 0,
        onClick: t[4] || (t[4] = (o) => e.selectHeaderOrFoterByClick(o, "header")),
        class: c(e.itemHeaderClasses)
      }, [b(e.$slots, "header")], 10, ih)) : y("v-if", !0), (l(!0), d(
        V,
        null,
        K(e.computedData, (o, u) => (l(), d(
          V,
          null,
          [o.group ? (l(), d("div", {
            is: e.itemTag,
            key: u + "group",
            class: c(e.itemGroupClasses)
          }, [e.$slots.group ? b(e.$slots, "group", {
            key: 0,
            group: o.group,
            index: u
          }) : (l(), d(
            "span",
            nh,
            F(o.group),
            1
            /* TEXT */
          ))], 10, ah)) : y("v-if", !0), (l(!0), d(
            V,
            null,
            K(o.items, (h, g) => (l(), d("div", {
              key: u + ":" + g,
              is: e.itemTag,
              class: c(e.itemOptionClasses(h)),
              onClick: T((R) => e.setSelected(h, !e.keepOpen, R), ["stop"]),
              ref_for: !0,
              ref: e.setItemRef
            }, [e.$slots.default ? b(e.$slots, "default", {
              key: 0,
              option: h,
              index: g
            }) : (l(), d(
              "span",
              oh,
              F(e.getValue(h)),
              1
              /* TEXT */
            ))], 10, rh))),
            128
            /* KEYED_FRAGMENT */
          ))],
          64
          /* STABLE_FRAGMENT */
        ))),
        256
        /* UNKEYED_FRAGMENT */
      )), e.isEmpty && e.$slots.empty ? (l(), d("div", {
        key: 1,
        is: e.itemTag,
        class: c(e.itemEmptyClasses)
      }, [b(e.$slots, "empty")], 10, lh)) : y("v-if", !0), e.$slots.footer ? (l(), d("div", {
        key: 2,
        is: e.itemTag,
        ref: "footer",
        role: "button",
        tabindex: 0,
        onClick: t[5] || (t[5] = (o) => e.selectHeaderOrFoterByClick(o, "footer")),
        class: c(e.itemFooterClasses)
      }, [b(e.$slots, "footer")], 10, uh)) : y("v-if", !0)], 14, sh), [[ee, e.isActive && (!e.isEmpty || e.$slots.empty || e.$slots.header || e.$slots.footer)]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])],
    2
    /* CLASS */
  );
}
Ft.render = dh;
Ft.__file = "src/components/autocomplete/Autocomplete.vue";
var hh = {
  install(e) {
    H(e, Ft);
  }
}, Ne = $({
  name: "OButton",
  components: {
    [z.name]: z
  },
  configField: "button",
  mixins: [L],
  inheritAttrs: !1,
  props: {
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: String,
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    /**
     * Button label, optional when default slot
     */
    label: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /**
     * Icon name to show on the left
     */
    iconLeft: String,
    /**
     * Icon name to show on the right
     */
    iconRight: String,
    /**
     * Rounded style
     */
    rounded: {
      type: Boolean,
      default: () => m(p(), "button.rounded", !1)
    },
    /**
     * Outlined style
     */
    outlined: Boolean,
    /**
     * Loading style
     */
    loading: Boolean,
    /**
     * Button will be expanded (full-width)
     */
    expanded: Boolean,
    inverted: Boolean,
    /**
     * Button type, like native
     */
    nativeType: {
      type: String,
      default: "button",
      validator: (e) => [
        "button",
        "submit",
        "reset"
      ].indexOf(e) >= 0
    },
    /**
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
      type: String,
      default: "button"
    },
    /**
     * Button will be disabled
     */
    disabled: Boolean,
    /**  @ignore */
    iconBoth: Boolean,
    elementsWrapperClass: [String, Function, Array],
    rootClass: [String, Function, Array],
    outlinedClass: [String, Function, Array],
    loadingClass: [String, Function, Array],
    invertedClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-btn"),
        { [this.computedClass("sizeClass", "o-btn--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-btn--", this.variant)]: this.variant },
        { [this.computedClass("outlinedClass", "o-btn--outlined")]: this.outlined && !this.variant },
        { [this.computedClass("invertedClass", "o-btn--inverted")]: this.inverted && !this.variant },
        { [this.computedClass("outlinedClass", "o-btn--outlined-", this.variant)]: this.outlined && this.variant },
        { [this.computedClass("invertedClass", "o-btn--inverted-", this.variant)]: this.inverted && this.variant },
        { [this.computedClass("expandedClass", "o-btn--expanded")]: this.expanded },
        { [this.computedClass("loadingClass", "o-btn--loading")]: this.loading },
        { [this.computedClass("roundedClass", "o-btn--rounded")]: this.rounded },
        { [this.computedClass("disabledClass", "o-btn--disabled")]: this.disabled }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-btn__label")
      ];
    },
    iconClasses() {
      return [
        this.computedClass("iconClass", "o-btn__icon")
      ];
    },
    iconLeftClasses() {
      return [
        ...this.iconClasses,
        this.computedClass("iconLeftClass", "o-btn__icon-left")
      ];
    },
    iconRightClasses() {
      return [
        ...this.iconClasses,
        this.computedClass("iconRightClass", "o-btn__icon-right")
      ];
    },
    elementsWrapperClasses() {
      return [
        this.computedClass("elementsWrapperClass", "o-btn__wrapper")
      ];
    },
    computedTag() {
      return typeof this.disabled < "u" && this.disabled !== !1 ? "button" : this.tag;
    },
    computedNativeType() {
      return this.tag === "button" || this.tag === "input" ? this.nativeType : null;
    },
    computedDisabled() {
      return this.disabled ? !0 : null;
    }
  }
});
function ch(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), D(qe(e.computedTag), N(e.$attrs, {
    disabled: e.computedDisabled,
    type: e.computedNativeType,
    class: e.rootClasses
  }), {
    default: M(() => [v(
      "span",
      {
        class: c(e.elementsWrapperClasses)
      },
      [e.iconLeft ? (l(), D(r, {
        key: 0,
        pack: e.iconPack,
        icon: e.iconLeft,
        size: e.size,
        both: e.iconBoth,
        class: c(e.iconLeftClasses)
      }, null, 8, ["pack", "icon", "size", "both", "class"])) : y("v-if", !0), e.label || e.$slots.default ? (l(), d(
        "span",
        {
          key: 1,
          class: c(e.labelClasses)
        },
        [b(e.$slots, "default", {}, () => [se(
          F(e.label),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      )) : y("v-if", !0), e.iconRight ? (l(), D(r, {
        key: 2,
        pack: e.iconPack,
        icon: e.iconRight,
        size: e.size,
        both: e.iconBoth,
        class: c(e.iconRightClasses)
      }, null, 8, ["pack", "icon", "size", "both", "class"])) : y("v-if", !0)],
      2
      /* CLASS */
    )]),
    _: 3
    /* FORWARDED */
  }, 16, ["disabled", "type", "class"]);
}
Ne.render = ch;
Ne.__file = "src/components/button/Button.vue";
var mh = {
  install(e) {
    H(e, Ne);
  }
};
const fh = 1, rn = 3, on = rn;
var ln = (e, t = 0) => {
  const s = $({
    provide() {
      return {
        ["o" + e]: this
      };
    }
  });
  return xt(t, fh) && (s.data = function() {
    return {
      childItems: [],
      sequence: 1
    };
  }, s.methods = {
    _registerItem(i) {
      i.index = this.childItems.length, this.childItems.push(i), this.$el && this.$nextTick(() => {
        const a = this.childItems.map((r) => `[data-id="${e}-${r.newValue}"]`).join(","), n = Array.from(this.$el.querySelectorAll(a)).map((r) => r.getAttribute("data-id").replace(`${e}-`, ""));
        this.childItems.forEach((r) => r.index = n.indexOf(`${r.newValue}`));
      });
    },
    _unregisterItem(i) {
      this.childItems = this.childItems.filter((a) => a !== i);
    },
    _nextSequence() {
      return this.sequence++;
    }
  }, xt(t, rn) && (s.computed = {
    /**
     * When items are added/removed sort them according to their position
     */
    sortedItems() {
      return this.childItems.slice().sort((i, a) => i.index - a.index);
    }
  })), s;
};
const un = 1, ph = 2, dn = un;
var hn = (e, t = 0) => {
  const s = $({
    inject: {
      parent: { from: "o" + e }
    },
    created() {
      if (this.newValue = Hd(this.value, this.parent && this.parent._nextSequence()), this.parent)
        this.parent._registerItem(this);
      else if (!xt(t, ph))
        throw new Error("You should wrap " + this.$options.name + " in a " + e);
    },
    beforeUnmount() {
      this.parent && this.parent._unregisterItem(this);
    }
  });
  return xt(t, un) && (s.data = () => ({
    index: null
  })), s;
}, pi = $({
  name: "OCarousel",
  components: {
    [z.name]: z
  },
  configField: "carousel",
  mixins: [ln("carousel", on), L],
  emits: ["update:modelValue", "scroll", "click"],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: () => m(p(), "carousel.interval", 3500)
    },
    hasDrag: {
      type: Boolean,
      default: !0
    },
    autoplay: {
      type: Boolean,
      default: !1
    },
    pauseHover: {
      type: Boolean,
      default: !1
    },
    repeat: {
      type: Boolean,
      default: !1
    },
    indicator: {
      type: Boolean,
      default: !0
    },
    indicatorInside: {
      type: Boolean,
      default: !1
    },
    indicatorMode: {
      type: String,
      default: "click"
    },
    indicatorPosition: {
      type: String,
      default: "bottom"
    },
    indicatorStyle: {
      type: String,
      default: "dots"
    },
    overlay: Boolean,
    itemsToShow: {
      type: Number,
      default: 1
    },
    itemsToList: {
      type: Number,
      default: 1
    },
    asIndicator: Boolean,
    arrow: {
      type: Boolean,
      default: !0
    },
    arrowHover: {
      type: Boolean,
      default: !0
    },
    iconPack: String,
    iconSize: String,
    iconPrev: {
      type: String,
      default: () => m(p(), "carousel.iconPrev", "chevron-left")
    },
    iconNext: {
      type: String,
      default: () => m(p(), "carousel.iconNext", "chevron-right")
    },
    breakpoints: {
      type: Object,
      default: () => ({})
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    sceneClass: [String, Function, Array],
    itemsClass: [String, Function, Array],
    itemsDraggingClass: [String, Function, Array],
    arrowIconClass: [String, Function, Array],
    arrowIconPrevClass: [String, Function, Array],
    arrowIconNextClass: [String, Function, Array],
    indicatorsClass: [String, Function, Array],
    indicatorsInsideClass: [String, Function, Array],
    indicatorsInsidePositionClass: [String, Function, Array],
    indicatorItemClass: [String, Function, Array],
    indicatorItemActiveClass: [String, Function, Array],
    indicatorItemStyleClass: [String, Function, Array]
  },
  data() {
    return {
      activeIndex: this.modelValue,
      scrollIndex: this.modelValue,
      delta: 0,
      dragX: !1,
      hold: 0,
      windowWidth: 0,
      touch: !1,
      observer: null,
      refresh_: 0,
      itemsHovered: !1,
      isPause: !1,
      timer: null
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-car"),
        { [this.computedClass("overlayClass", "o-car__overlay")]: this.overlay }
      ];
    },
    sceneClasses() {
      return [
        this.computedClass("sceneClass", "o-car__scene")
      ];
    },
    itemsClasses() {
      return [
        this.computedClass("itemsClass", "o-car__items"),
        { [this.computedClass("itemsDraggingClass", "o-car__items--dragging")]: this.dragging }
      ];
    },
    arrowIconClasses() {
      return [
        this.computedClass("arrowIconClass", "o-car__arrow__icon")
      ];
    },
    arrowIconPrevClasses() {
      return [
        ...this.arrowIconClasses,
        this.computedClass("arrowIconPrevClass", "o-car__arrow__icon-prev")
      ];
    },
    arrowIconNextClasses() {
      return [
        ...this.arrowIconClasses,
        this.computedClass("arrowIconNextClass", "o-car__arrow__icon-next")
      ];
    },
    indicatorsClasses() {
      return [
        this.computedClass("indicatorsClass", "o-car__indicators"),
        { [this.computedClass("indicatorsInsideClass", "o-car__indicators--inside")]: this.indicatorInside },
        { [this.computedClass("indicatorsInsidePositionClass", "o-car__indicators--inside--", this.indicatorPosition)]: this.indicatorInside && this.indicatorPosition }
      ];
    },
    indicatorClasses() {
      return [
        this.computedClass("indicatorClass", "o-car__indicator")
      ];
    },
    dragging() {
      return this.dragX !== !1;
    },
    itemStyle() {
      return `width: ${this.itemWidth}px;`;
    },
    translation() {
      return -Wi(this.delta + this.scrollIndex * this.itemWidth, 0, (this.childItems.length - this.settings.itemsToShow) * this.itemWidth);
    },
    total() {
      return this.childItems.length - this.settings.itemsToShow;
    },
    indicatorCount() {
      return Math.ceil(this.total / this.settings.itemsToList) + 1;
    },
    indicatorIndex() {
      return Math.ceil(this.scrollIndex / this.settings.itemsToList);
    },
    hasArrows() {
      return this.settings.arrowHover && this.itemsHovered || !this.settings.arrowHover;
    },
    hasPrev() {
      return (this.settings.repeat || this.scrollIndex > 0) && this.hasArrows;
    },
    hasNext() {
      return (this.settings.repeat || this.scrollIndex < this.total) && this.hasArrows;
    },
    breakpointKeys() {
      return Object.keys(this.breakpoints).map(Number).sort((t, s) => s - t);
    },
    settings() {
      let e = this.breakpointKeys.filter((t) => {
        if (this.windowWidth >= t)
          return !0;
      })[0];
      return e ? { ...this.$props, ...this.breakpoints[e] } : this.$props;
    },
    itemWidth() {
      return this.windowWidth ? (this.refresh_, this.$el.getBoundingClientRect().width / this.settings.itemsToShow) : 0;
    }
  },
  watch: {
    /**
     * When v-model is changed set the new active item.
     */
    modelValue(e) {
      e <= this.childItems.length - 1 && (this.activeIndex = e, this.switchTo(e * this.settings.itemsToList, !0));
    },
    /**
     *  When autoplay is changed, start or pause timer accordingly
     */
    autoplay(e) {
      e ? this.startTimer() : this.pauseTimer();
    },
    /**
     *  Since the timer can get paused at the end, if repeat is changed we need to restart it
     */
    repeat(e) {
      e && this.startTimer();
    }
  },
  methods: {
    indicatorItemClasses(e) {
      return [
        this.computedClass("indicatorItemClass", "o-car__indicator__item"),
        { [this.computedClass("indicatorItemActiveClass", "o-car__indicator__item--active")]: this.indicatorIndex === e },
        { [this.computedClass("indicatorItemStyleClass", "o-car__indicator__item--", this.indicatorStyle)]: this.indicatorStyle }
      ];
    },
    getChildItems() {
      return this.childItems;
    },
    onMouseEnter() {
      this.itemsHovered = !0, this.checkPause();
    },
    onMouseLeave() {
      this.itemsHovered = !1, this.startTimer();
    },
    startTimer() {
      !this.autoplay || this.timer || (this.isPause = !1, this.timer = setInterval(() => {
        !this.repeat && this.activeIndex >= this.childItems.length - 1 ? this.pauseTimer() : this.next();
      }, this.interval));
    },
    pauseTimer() {
      this.isPause = !0, this.timer && (clearInterval(this.timer), this.timer = null);
    },
    restartTimer() {
      this.pauseTimer(), this.startTimer();
    },
    checkPause() {
      this.pauseHover && this.autoplay && this.pauseTimer();
    },
    modeChange(e, t) {
      if (this.indicatorMode === e)
        return this.switchTo(t * this.settings.itemsToList);
    },
    resized() {
      this.windowWidth = window.innerWidth;
    },
    switchTo(e, t = this.asIndicator) {
      this.settings.repeat && (e = _t(e, this.total + 1)), e = Wi(e, 0, this.total), this.scrollIndex = e, this.$emit("scroll", this.indicatorIndex), t || (this.activeIndex = Math.ceil(e / this.settings.itemsToList), this.modelValue !== this.activeIndex && this.$emit("update:modelValue", this.activeIndex));
    },
    next() {
      this.switchTo(this.scrollIndex + this.settings.itemsToList);
    },
    prev() {
      this.switchTo(this.scrollIndex - this.settings.itemsToList);
    },
    // handle drag event
    dragStart(e) {
      this.dragging || !this.settings.hasDrag || e.button !== 0 && e.type !== "touchstart" || (this.hold = Date.now(), this.touch = !!e.touches, this.dragX = this.touch ? e.touches[0].clientX : e.clientX, this.touch && this.pauseTimer(), window.addEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove), window.addEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd));
    },
    dragMove(e) {
      if (!this.dragging)
        return;
      const t = e.touches ? (e.changedTouches[0] || e.touches[0]).clientX : e.clientX;
      this.delta = this.dragX - t, e.touches || e.preventDefault();
    },
    dragEnd(e) {
      if (!(!this.dragging && !this.hold)) {
        if (this.hold) {
          const t = Ld(this.delta), s = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15);
          this.switchTo(this.scrollIndex + t * s);
        }
        this.delta = 0, this.dragX = !1, e && e.touches && this.startTimer(), window.removeEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove), window.removeEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd);
      }
    },
    refresh() {
      this.$nextTick(() => {
        this.refresh_++;
      });
    }
  },
  mounted() {
    if (typeof window < "u" && (window.ResizeObserver && (this.observer = new window.ResizeObserver(this.refresh), this.observer.observe(this.$el)), window.addEventListener("resize", this.resized), document.addEventListener("animationend", this.refresh), document.addEventListener("transitionend", this.refresh), document.addEventListener("transitionstart", this.refresh), this.resized(), this.startTimer()), this.$attrs.config)
      throw new Error("The config prop was removed, you need to use v-bind instead");
  },
  beforeUnmount() {
    typeof window < "u" && (window.ResizeObserver && this.observer.disconnect(), window.removeEventListener("resize", this.resized), document.removeEventListener("animationend", this.refresh), document.removeEventListener("transitionend", this.refresh), document.removeEventListener("transitionstart", this.refresh), this.dragEnd(), this.pauseTimer());
  }
});
const gh = ["onMouseover", "onClick"];
function yh(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses),
      onMouseenter: t[2] || (t[2] = (...o) => e.onMouseEnter && e.onMouseEnter(...o)),
      onMouseleave: t[3] || (t[3] = (...o) => e.onMouseLeave && e.onMouseLeave(...o))
    },
    [v(
      "div",
      {
        class: c(e.sceneClasses)
      },
      [v(
        "div",
        {
          onMousedown: t[0] || (t[0] = (...o) => e.dragStart && e.dragStart(...o)),
          onTouchstart: t[1] || (t[1] = (...o) => e.dragStart && e.dragStart(...o)),
          class: c(e.itemsClasses),
          style: me("transform:translateX(" + e.translation + "px)")
        },
        [b(e.$slots, "default")],
        38
        /* CLASS, STYLE, HYDRATE_EVENTS */
      ), b(e.$slots, "arrow", {
        hasPrev: e.hasPrev,
        prev: e.prev,
        hasNext: e.hasNext,
        next: e.next
      }, () => [e.arrow ? (l(), d(
        V,
        {
          key: 0
        },
        [G(O(r, {
          class: c(e.arrowIconPrevClasses),
          onClick: e.prev,
          pack: e.iconPack,
          icon: e.iconPrev,
          size: e.iconSize,
          both: ""
        }, null, 8, ["class", "onClick", "pack", "icon", "size"]), [[ee, e.hasPrev]]), G(O(r, {
          class: c(e.arrowIconNextClasses),
          onClick: e.next,
          pack: e.iconPack,
          icon: e.iconNext,
          size: e.iconSize,
          both: ""
        }, null, 8, ["class", "onClick", "pack", "icon", "size"]), [[ee, e.hasNext]])],
        64
        /* STABLE_FRAGMENT */
      )) : y("v-if", !0)])],
      2
      /* CLASS */
    ), b(e.$slots, "indicators", {
      active: e.activeIndex,
      switchTo: e.switchTo,
      indicatorIndex: e.indicatorIndex
    }, () => [e.getChildItems().length ? (l(), d(
      V,
      {
        key: 0
      },
      [e.indicator && !e.asIndicator ? (l(), d(
        "div",
        {
          key: 0,
          class: c(e.indicatorsClasses)
        },
        [(l(!0), d(
          V,
          null,
          K(e.indicatorCount, (o, u) => (l(), d("a", {
            class: c(e.indicatorClasses),
            onMouseover: (h) => e.modeChange("hover", u),
            onClick: (h) => e.modeChange("click", u),
            key: u
          }, [b(e.$slots, "indicator", {
            i: u
          }, () => [v(
            "span",
            {
              class: c(e.indicatorItemClasses(u))
            },
            null,
            2
            /* CLASS */
          )])], 42, gh))),
          128
          /* KEYED_FRAGMENT */
        ))],
        2
        /* CLASS */
      )) : y("v-if", !0)],
      64
      /* STABLE_FRAGMENT */
    )) : y("v-if", !0)]), e.overlay ? b(e.$slots, "overlay", {
      key: 0
    }) : y("v-if", !0)],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
pi.render = yh;
pi.__file = "src/components/carousel/Carousel.vue";
var gi = $({
  name: "OCarouselItem",
  configField: "carousel",
  mixins: [hn("carousel", dn), L],
  props: {
    itemClass: [String, Function, Array],
    itemActiveClass: [String, Function, Array]
  },
  computed: {
    itemClasses() {
      return [
        this.computedClass("itemClass", "o-car__item"),
        { [this.computedClass("itemActiveClass", "o-car__item--active")]: this.isActive }
      ];
    },
    itemStyle() {
      return `width: ${this.parent.itemWidth}px;`;
    },
    isActive() {
      return this.parent.activeIndex === this.index;
    }
  },
  methods: {
    onClick(e) {
      this.isActive && this.parent.$emit("click", e), this.parent.asIndicator && (this.parent.activeIndex = this.index, this.parent.$emit("update:modelValue", this.index));
    }
  }
});
function Ch(e, t, s, i, a, n) {
  return l(), d(
    "div",
    {
      class: c(e.itemClasses),
      onClick: t[0] || (t[0] = (...r) => e.onClick && e.onClick(...r)),
      style: me(e.itemStyle)
    },
    [b(e.$slots, "default")],
    6
    /* CLASS, STYLE */
  );
}
gi.render = Ch;
gi.__file = "src/components/carousel/CarouselItem.vue";
var bh = {
  install(e) {
    H(e, pi), H(e, gi);
  }
}, cn = $({
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [String, Number, Boolean, Array],
    /**
     * Same as native value
     */
    nativeValue: [String, Number, Boolean, Array],
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
     * Same as native disabled
     */
    disabled: Boolean,
    required: Boolean,
    /**
     * Same as native name
     */
    name: String,
    /**
     * Size of the control, optional
     * @values small, medium, large
     */
    size: String
  },
  data() {
    return {
      newValue: this.modelValue
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(e) {
        this.newValue = e, this.$emit("update:modelValue", this.newValue);
      }
    }
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    modelValue(e) {
      this.newValue = e;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
}), $t = $({
  name: "OCheckbox",
  mixins: [L, cn],
  configField: "checkbox",
  emits: [
    "input"
  ],
  props: {
    /**
     * Same as native indeterminate
     */
    indeterminate: {
      type: Boolean,
      default: !1
    },
    /**
     * Overrides the returned value when it's checked
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: !0
    },
    /**
     * Overrides the returned value when it's not checked
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    /** Accessibility label to establish relationship between the checkbox and control label */
    ariaLabelledby: String,
    /* Same as native autocomplete */
    autocomplete: String,
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    checkedClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkIndeterminateClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  watch: {
    indeterminate: {
      handler(e) {
        this.isIndeterminate = e;
      },
      immediate: !0
    }
  },
  computed: {
    getLabel() {
      return this.$refs.label;
    },
    isChecked() {
      return this.computedValue === this.trueValue || Array.isArray(this.computedValue) && this.computedValue.indexOf(this.nativeValue) !== -1;
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-chk"),
        { [this.computedClass("checkedClass", "o-chk--checked")]: this.isChecked },
        { [this.computedClass("sizeClass", "o-chk--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-chk--disabled")]: this.disabled },
        { [this.computedClass("variantClass", "o-chk--", this.variant)]: this.variant }
      ];
    },
    checkClasses() {
      return [
        this.computedClass("checkClass", "o-chk__check"),
        { [this.computedClass("checkCheckedClass", "o-chk__check--checked")]: this.isChecked },
        { [this.computedClass("checkIndeterminateClass", "o-chk__check--indeterminate")]: this.isIndeterminate }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-chk__label")
      ];
    }
  }
});
const vh = ["disabled", "required", "name", "autocomplete", "value", ".indeterminate", "true-value", "false-value", "aria-labelledby"], Sh = ["id"];
function kh(e, t, s, i, a, n) {
  return l(), d(
    "label",
    {
      class: c(e.rootClasses),
      ref: "label",
      onClick: t[2] || (t[2] = T((...r) => e.focus && e.focus(...r), ["stop"])),
      onKeydown: t[3] || (t[3] = U(T((r) => e.getLabel.click(), ["prevent"]), ["enter"]))
    },
    [G(v("input", N({
      "onUpdate:modelValue": t[0] || (t[0] = (r) => e.computedValue = r),
      type: "checkbox"
    }, e.$attrs, {
      ref: "input",
      onClick: t[1] || (t[1] = T(() => {
      }, ["stop"])),
      class: e.checkClasses,
      disabled: e.disabled,
      required: e.required,
      name: e.name,
      autocomplete: e.autocomplete,
      value: e.nativeValue,
      ".indeterminate": e.indeterminate,
      "true-value": e.trueValue,
      "false-value": e.falseValue,
      "aria-labelledby": e.ariaLabelledby
    }), null, 16, vh), [[ra, e.computedValue]]), v("span", {
      id: e.ariaLabelledby,
      class: c(e.labelClasses)
    }, [b(e.$slots, "default")], 10, Sh)],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
$t.render = kh;
$t.__file = "src/components/checkbox/Checkbox.vue";
var wh = {
  install(e) {
    H(e, $t);
  }
}, mn = $({
  name: "OCollapse",
  mixins: [L],
  configField: "collapse",
  emits: ["update:open", "open", "close"],
  props: {
    /**
     * Whether collapse is open or not, v-model:open to make it two-way binding
     */
    open: {
      type: Boolean,
      default: !0
    },
    /**
     * Custom animation (transition name)
     */
    animation: {
      type: String,
      default: () => m(p(), "collapse.animation", "fade")
    },
    ariaId: {
      type: String,
      default: ""
    },
    /**
     * Trigger position
     * @values top, bottom
     */
    position: {
      type: String,
      default: "top",
      validator: (e) => [
        "top",
        "bottom"
      ].indexOf(e) > -1
    },
    rootClass: [String, Function, Array],
    triggerClass: [String, Function, Array],
    contentClass: [String, Function, Array]
  },
  data() {
    return {
      isOpen: this.open
    };
  },
  watch: {
    open(e) {
      this.isOpen = e;
    }
  },
  methods: {
    /**
    * Toggle and emit events
    */
    toggle() {
      this.isOpen = !this.isOpen, this.$emit("update:open", this.isOpen), this.$emit(this.isOpen ? "open" : "close");
    }
  },
  render() {
    const e = ce("div", {
      class: this.computedClass("triggerClass", "o-clps__trigger"),
      onClick: this.toggle
    }, this.$slots.trigger({ open: this.isOpen })), t = ce(ye, { name: this.animation }, () => G(ce("div", {
      class: this.computedClass("contentClass", "o-clps__content"),
      id: this.ariaId
    }, this.$slots.default()), [[ee, this.isOpen]]));
    return ce("div", { class: this.computedClass("rootClass", "o-clps") }, this.position === "top" ? [e, t] : [t, e]);
  }
});
mn.__file = "src/components/collapse/Collapse.vue";
var Dh = {
  install(e) {
    H(e, mn);
  }
}, He = $({
  props: {
    /**
     * Mobile breakpoint as max-width value
     */
    mobileBreakpoint: String
  },
  data() {
    return {
      matchMediaRef: void 0,
      isMatchMedia: void 0
    };
  },
  methods: {
    onMatchMedia(e) {
      this.isMatchMedia = e.matches;
    }
  },
  created() {
    if (typeof window < "u") {
      let e = this.mobileBreakpoint;
      if (!e) {
        const t = p(), s = m(t, "mobileBreakpoint", "1023px");
        e = m(t, `${this.$options.configField}.mobileBreakpoint`, s);
      }
      this.matchMediaRef = window.matchMedia(`(max-width: ${e})`), this.matchMediaRef ? (this.isMatchMedia = this.matchMediaRef.matches, this.matchMediaRef.addListener(this.onMatchMedia, !1)) : this.isMatchMedia = !1;
    }
  },
  beforeUnmount() {
    typeof window < "u" && this.matchMediaRef && this.matchMediaRef.removeListener(this.checkMatchMedia);
  }
});
const Yt = (e, t = !1) => e ? t ? e.querySelectorAll('*[tabindex="-1"]') : e.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex]:not([tabindex="-1"]),
                                     *[contenteditable]`) : null;
let Hs;
const Fh = (e, { value: t = !0 }) => {
  if (t) {
    let s = Yt(e), i = Yt(e, !0);
    s && s.length > 0 && (Hs = (a) => {
      s = Yt(e), i = Yt(e, !0);
      const n = s[0], r = s[s.length - 1];
      a.target === n && a.shiftKey && a.key === "Tab" ? (a.preventDefault(), r.focus()) : (a.target === r || Array.from(i).indexOf(a.target) >= 0) && !a.shiftKey && a.key === "Tab" && (a.preventDefault(), n.focus());
    }, e.addEventListener("keydown", Hs));
  }
}, $h = (e) => {
  e.removeEventListener("keydown", Hs);
}, Ah = {
  beforeMount: Fh,
  beforeUnmount: $h
};
var fn = Ah, xe = $({
  name: "ODropdown",
  directives: {
    trapFocus: fn
  },
  configField: "dropdown",
  mixins: [L, He],
  provide() {
    return {
      $dropdown: this
    };
  },
  emits: ["update:modelValue", "active-change", "change"],
  props: {
    /** @model */
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: null
    },
    /**
     * Dropdown disabled
     */
    disabled: Boolean,
    /**
     * Dropdown content (items) are shown inline, trigger is removed
     */
    inline: Boolean,
    /**
     * Dropdown content will be scrollable
     */
    scrollable: Boolean,
    /**
     * Max height of dropdown content
     */
    maxHeight: {
      type: [String, Number],
      default: () => m(p(), "dropdown.maxHeight", 200)
    },
    /**
     * Optional, position of the dropdown relative to the trigger
     * @values top-right, top-left, bottom-left
     */
    position: {
      type: String,
      validator: (e) => [
        "top-right",
        "top-left",
        "bottom-left",
        "bottom-right"
      ].indexOf(e) > -1
    },
    /**
     * Dropdown content (items) are shown into a modal on mobile
     */
    mobileModal: {
      type: Boolean,
      default: () => m(p(), "dropdown.mobileModal", !0)
    },
    /**
     * Role attribute to be passed to list container for better accessibility. Use menu only in situations where your dropdown is related to navigation menus
     * @values list, menu, dialog
     */
    ariaRole: {
      type: String,
      validator: (e) => [
        "menu",
        "list",
        "dialog"
      ].indexOf(e) > -1,
      default: null
    },
    /**
     * Custom animation (transition name)
     */
    animation: {
      type: String,
      default: () => m(p(), "dropdown.animation", "fade")
    },
    /**
     * Allows multiple selections
     */
    multiple: Boolean,
    /**
     * Trap focus inside the dropdown.
     */
    trapFocus: {
      type: Boolean,
      default: () => m(p(), "dropdown.trapFocus", !0)
    },
    /**
     * Close dropdown when content is clicked
     */
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    /**
     * Can close dropdown by pressing escape or by clicking outside
     * @values escape, outside
     */
    canClose: {
      type: [Array, Boolean],
      default: !0
    },
    /**
     * Dropdown will be expanded (full-width)
     */
    expanded: Boolean,
    /**
     * Dropdown will be triggered by any events
     * @values click, hover, contextmenu, focus
     */
    triggers: {
      type: Array,
      default: () => ["click"]
    },
    /**
     * Dropdown menu tag name
     */
    menuTag: {
      type: String,
      default: () => m(p(), "dropdown.menuTag", "div")
    },
    /**
     * Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key)
     */
    triggerTabindex: {
      type: Number,
      default: 0
    },
    /**
     * Append dropdown content to body
     */
    appendToBody: Boolean,
    /**
    * @ignore
    */
    appendToBodyCopyParent: Boolean,
    rootClass: [String, Function, Array],
    triggerClass: [String, Function, Array],
    inlineClass: [String, Function, Array],
    menuMobileOverlayClass: [String, Function, Array],
    menuClass: [String, Function, Array],
    menuPositionClass: [String, Function, Array],
    menuActiveClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    expandedClass: [String, Function, Array]
  },
  data() {
    return {
      selected: this.modelValue,
      isActive: !1,
      isHoverable: !1,
      bodyEl: void 0
      // Used to append to body
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-drop"),
        { [this.computedClass("disabledClass", "o-drop--disabled")]: this.disabled },
        { [this.computedClass("expandedClass", "o-drop--expanded")]: this.expanded },
        { [this.computedClass("inlineClass", "o-drop--inline")]: this.inline },
        { [this.computedClass("mobileClass", "o-drop--mobile")]: this.isMobileModal && this.isMatchMedia && !this.hoverable }
      ];
    },
    triggerClasses() {
      return [
        this.computedClass("triggerClass", "o-drop__trigger")
      ];
    },
    menuMobileOverlayClasses() {
      return [
        this.computedClass("menuMobileOverlayClass", "o-drop__overlay")
      ];
    },
    menuClasses() {
      return [
        this.computedClass("menuClass", "o-drop__menu"),
        { [this.computedClass("menuPositionClass", "o-drop__menu--", this.position)]: this.position },
        { [this.computedClass("menuActiveClass", "o-drop__menu--active")]: this.isActive || this.inline }
      ];
    },
    isMobileModal() {
      return this.mobileModal && !this.inline;
    },
    cancelOptions() {
      return typeof this.canClose == "boolean" ? this.canClose ? ["escape", "outside"] : [] : this.canClose;
    },
    menuStyle() {
      return {
        maxHeight: this.scrollable ? Qe(this.maxHeight) : null,
        overflow: this.scrollable ? "auto" : null
      };
    },
    hoverable() {
      return this.triggers.indexOf("hover") >= 0;
    }
  },
  watch: {
    /**
    * When v-model is changed set the new selected item.
    */
    modelValue(e) {
      this.selected = e;
    },
    /**
    * Emit event when isActive value is changed.
    */
    isActive(e) {
      this.$emit("active-change", e), this.appendToBody && this.$nextTick(() => {
        this.updateAppendToBody();
      });
    }
  },
  methods: {
    /**
     * Click listener from DropdownItem.
     *   1. Set new selected item.
     *   2. Emit input event to update the user v-model.
     *   3. Close the dropdown.
     */
    selectItem(e) {
      this.multiple ? (this.selected ? this.selected.indexOf(e) === -1 ? this.selected = [...this.selected, e] : this.selected = this.selected.filter((t) => t !== e) : this.selected = [e], this.$emit("change", this.selected)) : this.selected !== e && (this.selected = e, this.$emit("change", this.selected)), this.$emit("update:modelValue", this.selected), this.multiple || (this.isActive = !this.closeOnClick, this.hoverable && this.closeOnClick && (this.isHoverable = !1));
    },
    /**
    * White-listed items to not close when clicked.
    */
    isInWhiteList(e) {
      if (e === this.$refs.dropdownMenu || e === this.$refs.trigger)
        return !0;
      if (this.$refs.dropdownMenu !== void 0) {
        const t = this.$refs.dropdownMenu.querySelectorAll("*");
        for (const s of t)
          if (e === s)
            return !0;
      }
      if (this.$refs.trigger !== void 0) {
        const t = this.$refs.trigger.querySelectorAll("*");
        for (const s of t)
          if (e === s)
            return !0;
      }
      return !1;
    },
    /**
    * Close dropdown if clicked outside.
    */
    clickedOutside(e) {
      this.cancelOptions.indexOf("outside") < 0 || this.inline || this.isInWhiteList(e.target) || (this.isActive = !1);
    },
    /**
     * Keypress event that is bound to the document
     */
    keyPress({ key: e }) {
      if (this.isActive && (e === "Escape" || e === "Esc")) {
        if (this.cancelOptions.indexOf("escape") < 0)
          return;
        this.isActive = !1;
      }
    },
    onClick() {
      this.triggers.indexOf("click") < 0 || this.toggle();
    },
    onContextMenu() {
      this.triggers.indexOf("contextmenu") < 0 || this.toggle();
    },
    onHover() {
      this.triggers.indexOf("hover") < 0 || (this.isHoverable = !0);
    },
    onFocus() {
      this.triggers.indexOf("focus") < 0 || this.toggle();
    },
    /**
    * Toggle dropdown if it's not disabled.
    */
    toggle() {
      this.disabled || (this.isActive ? this.isActive = !this.isActive : this.$nextTick(() => {
        const e = !this.isActive;
        this.isActive = e, setTimeout(() => this.isActive = e);
      }));
    },
    updateAppendToBody() {
      const e = this.$refs.dropdownMenu, t = this.$refs.trigger;
      if (e && t) {
        const s = this.$data.bodyEl.children[0];
        if (s.classList.forEach((r) => s.classList.remove(...r.split(" "))), this.rootClasses.forEach((r) => {
          r && (typeof r == "object" ? Object.keys(r).filter((o) => o && r[o]).forEach((o) => s.classList.add(o)) : s.classList.add(...r.split(" ")));
        }), this.appendToBodyCopyParent) {
          const r = this.$refs.dropdown.parentNode, o = this.$data.bodyEl;
          o.classList.forEach((u) => o.classList.remove(...u.split(" "))), r.classList.forEach((u) => o.classList.add(...u.split(" ")));
        }
        const i = t.getBoundingClientRect();
        let a = i.top + window.scrollY, n = i.left + window.scrollX;
        !this.position || this.position.indexOf("bottom") >= 0 ? a += t.clientHeight : a -= e.clientHeight, this.position && this.position.indexOf("left") >= 0 && (n -= e.clientWidth - t.clientWidth), e.style.position = "absolute", e.style.top = `${a}px`, e.style.left = `${n}px`, e.style.zIndex = "9999";
      }
    }
  },
  mounted() {
    this.appendToBody && (this.$data.bodyEl = ci(this.$refs.dropdownMenu), this.updateAppendToBody());
  },
  created() {
    typeof window < "u" && (document.addEventListener("click", this.clickedOutside), document.addEventListener("keyup", this.keyPress));
  },
  beforeUnmount() {
    typeof window < "u" && (document.removeEventListener("click", this.clickedOutside), document.removeEventListener("keyup", this.keyPress)), this.appendToBody && it(this.$data.bodyEl);
  }
});
const Mh = ["tabindex"], Oh = ["aria-hidden"], Th = ["is", "aria-hidden", "role", "aria-modal"];
function Ph(e, t, s, i, a, n) {
  const r = oa("trap-focus");
  return l(), d(
    "div",
    {
      ref: "dropdown",
      class: c(e.rootClasses),
      onMouseleave: t[4] || (t[4] = (o) => e.isHoverable = !1)
    },
    [e.inline ? y("v-if", !0) : (l(), d("div", {
      key: 0,
      tabindex: e.disabled ? null : e.triggerTabindex,
      ref: "trigger",
      class: c(e.triggerClasses),
      onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
      onContextmenu: t[1] || (t[1] = T((...o) => e.onContextMenu && e.onContextMenu(...o), ["prevent"])),
      onMouseenter: t[2] || (t[2] = (...o) => e.onHover && e.onHover(...o)),
      onFocusCapture: t[3] || (t[3] = (...o) => e.onFocus && e.onFocus(...o)),
      "aria-haspopup": "true"
    }, [b(e.$slots, "trigger", {
      active: e.isActive
    })], 42, Mh)), O(ye, {
      name: e.animation
    }, {
      default: M(() => [e.isMobileModal ? G((l(), d("div", {
        key: 0,
        class: c(e.menuMobileOverlayClasses),
        "aria-hidden": !e.isActive
      }, null, 10, Oh)), [[ee, e.isActive]]) : y("v-if", !0)]),
      _: 1
      /* STABLE */
    }, 8, ["name"]), O(ye, {
      name: e.animation,
      persisted: ""
    }, {
      default: M(() => [G((l(), d("div", {
        ref: "dropdownMenu",
        is: e.menuTag,
        class: c(e.menuClasses),
        "aria-hidden": !e.isActive,
        role: e.ariaRole,
        "aria-modal": !e.inline,
        style: me(e.menuStyle)
      }, [b(e.$slots, "default")], 14, Th)), [[ee, !e.disabled && (e.isActive || e.isHoverable) || e.inline], [r, e.trapFocus]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
xe.render = Ph;
xe.__file = "src/components/dropdown/Dropdown.vue";
var et = $({
  name: "ODropdownItem",
  mixins: [L],
  configField: "dropdown",
  inject: ["$dropdown"],
  emits: ["click"],
  props: {
    /**
     * The value that will be returned on events and v-model
     */
    value: {
      type: [String, Number, Boolean, Object, Array]
    },
    /**
     * Item is disabled
     */
    disabled: Boolean,
    /**
     * Item is clickable and emit an event
     */
    clickable: {
      type: Boolean,
      default: !0
    },
    /**
     * Dropdown item tag name
     */
    tag: {
      type: String,
      default: () => m(p(), "dropdown.itemTag", "div")
    },
    tabindex: {
      type: [Number, String],
      default: 0
    },
    ariaRole: {
      type: String,
      default: ""
    },
    itemClass: [String, Function, Array],
    itemActiveClass: [String, Function, Array],
    itemDisabledClass: [String, Function, Array]
  },
  computed: {
    parent() {
      return this.$dropdown;
    },
    rootClasses() {
      return [
        this.computedClass("itemClass", "o-drop__item"),
        { [this.computedClass("itemDisabledClass", "o-drop__item--disabled")]: this.parent.disabled || this.disabled },
        { [this.computedClass("itemActiveClass", "o-drop__item--active")]: this.isActive }
      ];
    },
    ariaRoleItem() {
      return this.ariaRole === "menuitem" || this.ariaRole === "listitem" ? this.ariaRole : null;
    },
    isClickable() {
      return !this.parent.disabled && !this.disabled && this.clickable;
    },
    isActive() {
      return this.parent.selected === null ? !1 : this.parent.multiple ? this.parent.selected.indexOf(this.value) >= 0 : this.value === this.parent.selected;
    }
  },
  methods: {
    /**
    * Click listener, select the item.
    */
    selectItem() {
      this.isClickable && (this.parent.selectItem(this.value), this.$emit("click"));
    }
  },
  created() {
    if (!this.parent)
      throw new Error("You should wrap oDropdownItem on a oDropdown");
  }
});
function Vh(e, t, s, i, a, n) {
  return l(), D(qe(e.tag), {
    class: c(e.rootClasses),
    onClick: e.selectItem,
    role: e.ariaRoleItem,
    tabindex: e.tabindex
  }, {
    default: M(() => [b(e.$slots, "default")]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "onClick", "role", "tabindex"]);
}
et.render = Vh;
et.__file = "src/components/dropdown/DropdownItem.vue";
var Ws = $({
  name: "OFieldBody",
  inject: ["$field"],
  configField: "field",
  computed: {
    parent() {
      return this.$field;
    }
  },
  render() {
    let e = !0;
    const t = this.$slots.default(), s = t.length === 1 && Array.isArray(t[0].children) ? t[0].children : t;
    return ce("div", { class: this.parent.bodyHorizontalClasses }, s.map((i) => {
      let a;
      return i.type === zn || i.type === _n ? i : (e && (a = this.parent.newMessage, e = !1), ce(w("OField"), { variant: this.parent.newVariant, message: a }, () => [i]));
    }));
  }
});
Ws.__file = "src/components/field/FieldBody.vue";
var tt = $({
  name: "OField",
  components: {
    [Ws.name]: Ws
  },
  configField: "field",
  mixins: [L, He],
  provide() {
    return {
      $field: this
    };
  },
  inject: {
    $field: { from: "$field", default: !1 }
  },
  props: {
    /**
     * 	Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
     * Field label
     */
    label: String,
    /**
     * Same as native for set on the label
     */
    labelFor: String,
    /**
     * Help message text
     */
    message: String,
    /**
     * Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)
     */
    grouped: Boolean,
    /**
     * Allow controls to fill up multiple lines, making it responsive
     */
    groupMultiline: Boolean,
    /**
     * Group label and control on the same line for horizontal forms
     */
    horizontal: Boolean,
    /**
     * Field automatically attach controls together
     */
    addons: {
      type: Boolean,
      default: !0
    },
    /**
    * Vertical size of input, optional
    * @values small, medium, large
    */
    labelSize: String,
    rootClass: [String, Function, Array],
    horizontalClass: [String, Function, Array],
    groupedClass: [String, Function, Array],
    groupMultilineClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    labelSizeClass: [String, Function, Array],
    labelHorizontalClass: [String, Function, Array],
    bodyClass: [String, Function, Array],
    bodyHorizontalClass: [String, Function, Array],
    addonsClass: [String, Function, Array],
    messageClass: [String, Function, Array],
    variantMessageClass: [String, Function, Array],
    variantLabelClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    focusedClass: [String, Function, Array],
    filledClass: [String, Function, Array]
  },
  data() {
    return {
      newVariant: this.variant,
      newMessage: this.message,
      isFocused: !1,
      isFilled: !1
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-field"),
        { [this.computedClass("horizontalClass", "o-field--horizontal")]: this.horizontal },
        { [this.computedClass("mobileClass", "o-field--mobile")]: this.isMatchMedia },
        { [this.computedClass("focusedClass", "o-field--focused")]: this.isFocused },
        { [this.computedClass("filledClass", "o-field--filled")]: this.isFilled }
      ];
    },
    messageClasses() {
      return [
        this.computedClass("messageClass", "o-field__message"),
        { [this.computedClass("variantMessageClass", "o-field__message-", this.newVariant)]: this.newVariant }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-field__label"),
        { [this.computedClass("labelSizeClass", "o-field__label-", this.labelSize)]: this.labelSize },
        { [this.computedClass("variantLabelClass", "o-field__label-", this.newVariant)]: this.newVariant }
      ];
    },
    labelHorizontalClasses() {
      return [
        this.computedClass("labelHorizontalClass", "o-field__horizontal-label")
      ];
    },
    bodyClasses() {
      return [
        this.computedClass("bodyClass", "o-field__body")
      ];
    },
    bodyHorizontalClasses() {
      return [
        this.computedClass("bodyHorizontalClass", "o-field__horizontal-body")
      ];
    },
    innerFieldClasses() {
      return [
        this.computedClass("rootClass", "o-field"),
        { [this.computedClass("groupMultilineClass", "o-field--grouped-multiline")]: this.groupMultiline },
        { [this.computedClass("groupedClass", "o-field--grouped")]: this.grouped },
        { [this.computedClass("addonsClass", "o-field--addons")]: !this.grouped && this.hasAddons() }
      ];
    },
    parent() {
      return this.$field;
    },
    hasLabelSlot() {
      return this.$slots.label;
    },
    hasMessageSlot() {
      return this.$slots.message;
    },
    hasLabel() {
      return this.label || this.hasLabelSlot;
    },
    hasMessage() {
      return (!this.parent || !this.parent.hasInnerField) && this.newMessage || this.hasMessageSlot;
    },
    hasInnerField() {
      return this.grouped || this.groupMultiline || this.hasAddons();
    }
  },
  watch: {
    /**
    * Set internal variant when prop change.
    */
    variant(e) {
      this.newVariant = e;
    },
    /**
    * Set internal message when prop change.
    */
    message(e) {
      this.newMessage = e;
    },
    /**
    * Set parent message if we use Field in Field.
    */
    newMessage(e) {
      this.parent && this.parent.hasInnerField && (this.parent.variant || (this.parent.newVariant = this.newVariant), this.parent.message || (this.parent.newMessage = e));
    }
  },
  methods: {
    hasAddons() {
      let e = 0;
      const t = this.$slots.default();
      return t && (e = (t.length === 1 && Array.isArray(t[0].children) ? t[0].children : t).reduce((i, a) => a ? i + 1 : i, 0)), e > 1 && this.addons && !this.horizontal;
    }
  }
});
const Ih = ["for"], Rh = ["for"];
function Bh(e, t, s, i, a, n) {
  const r = w("o-field-body");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [e.horizontal ? (l(), d(
      "div",
      {
        key: 0,
        class: c(e.labelHorizontalClasses)
      },
      [e.hasLabel ? (l(), d("label", {
        key: 0,
        for: e.labelFor,
        class: c(e.labelClasses)
      }, [e.hasLabelSlot ? b(e.$slots, "label", {
        key: 0
      }) : (l(), d(
        V,
        {
          key: 1
        },
        [se(
          F(e.label),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))], 10, Ih)) : y("v-if", !0)],
      2
      /* CLASS */
    )) : (l(), d(
      V,
      {
        key: 1
      },
      [e.hasLabel ? (l(), d("label", {
        key: 0,
        for: e.labelFor,
        class: c(e.labelClasses)
      }, [e.hasLabelSlot ? b(e.$slots, "label", {
        key: 0
      }) : (l(), d(
        V,
        {
          key: 1
        },
        [se(
          F(e.label),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))], 10, Rh)) : y("v-if", !0)],
      64
      /* STABLE_FRAGMENT */
    )), e.horizontal ? (l(), D(r, {
      key: 2
    }, {
      default: M(() => [b(e.$slots, "default")]),
      _: 3
      /* FORWARDED */
    })) : e.hasInnerField ? (l(), d(
      "div",
      {
        key: 3,
        class: c(e.bodyClasses)
      },
      [v(
        "div",
        {
          class: c(e.innerFieldClasses)
        },
        [b(e.$slots, "default")],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    )) : b(e.$slots, "default", {
      key: 4
    }), e.hasMessage && !e.horizontal ? (l(), d(
      "p",
      {
        key: 5,
        class: c(e.messageClasses)
      },
      [e.hasMessageSlot ? b(e.$slots, "message", {
        key: 0
      }) : (l(), d(
        V,
        {
          key: 1
        },
        [se(
          F(e.newMessage),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))],
      2
      /* CLASS */
    )) : y("v-if", !0)],
    2
    /* CLASS */
  );
}
tt.render = Bh;
tt.__file = "src/components/field/Field.vue";
var Le = $({
  name: "OSelect",
  components: {
    [z.name]: z
  },
  mixins: [L, Ke],
  configField: "select",
  inheritAttrs: !1,
  emits: ["update:modelValue", "focus", "blur", "invalid"],
  props: {
    /** @model */
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: null
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
      type: String,
      default: () => m(p(), "select.iconPack", void 0)
    },
    /**
     * 	Icon name to be added on the right side
     */
    iconRight: {
      type: String,
      default: () => m(p(), "select.iconRight", void 0)
    },
    /** Text when nothing is selected */
    placeholder: String,
    multiple: Boolean,
    /** Same as native size */
    nativeSize: [String, Number],
    rootClass: [String, Function, Array],
    selectClass: [String, Function, Array],
    iconLeftSpaceClass: [String, Function, Array],
    iconRightSpaceClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    multipleClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    placeholderClass: [String, Function, Array],
    arrowClass: [String, Function, Array]
  },
  data() {
    return {
      selected: this.modelValue
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-ctrl-sel"),
        { [this.computedClass("expandedClass", "o-ctrl-sel--expanded")]: this.expanded }
      ];
    },
    selectClasses() {
      return [
        this.computedClass("selectClass", "o-sel"),
        { [this.computedClass("roundedClass", "o-sel--rounded")]: this.rounded },
        { [this.computedClass("multipleClass", "o-sel--multiple")]: this.multiple },
        { [this.computedClass("sizeClass", "o-sel--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-sel--", this.statusVariant || this.variant)]: this.statusVariant || this.variant },
        { [this.computedClass("iconLeftSpaceClass", "o-sel-iconspace-left")]: this.icon },
        { [this.computedClass("iconRightSpaceClass", "o-sel-iconspace-right")]: this.iconRight },
        { [this.computedClass("placeholderClass", "o-sel--placeholder")]: this.placeholderVisible },
        { [this.computedClass("arrowClass", "o-sel-arrow")]: !this.iconRight && !this.multiple }
      ];
    },
    iconLeftClasses() {
      return [
        this.computedClass("iconLeftClass", "o-sel__icon-left")
      ];
    },
    iconRightClasses() {
      return [
        this.computedClass("iconRightClass", "o-sel__icon-right")
      ];
    },
    placeholderVisible() {
      return this.computedValue === null;
    },
    computedValue: {
      get() {
        return this.selected;
      },
      set(e) {
        this.selected = e, this.$emit("update:modelValue", e), this.syncFilled(this.selected), !this.isValid && this.checkHtml5Validity();
      }
    },
    $elementRef() {
      return "select";
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set the selected option.
    *   2. If it's invalid, validate again.
    */
    modelValue(e) {
      this.selected = e, this.syncFilled(this.selected), !this.isValid && this.checkHtml5Validity();
    }
  }
});
const Nh = ["autocomplete", "multiple", "size"], Lh = {
  key: 0,
  value: null,
  disabled: "",
  hidden: ""
};
function Eh(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [G(v("select", N(e.$attrs, {
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.computedValue = o),
      class: e.selectClasses,
      ref: "select",
      autocomplete: e.autocomplete,
      multiple: e.multiple,
      size: e.nativeSize,
      onBlur: t[1] || (t[1] = (...o) => e.onBlur && e.onBlur(...o)),
      onFocus: t[2] || (t[2] = (...o) => e.onFocus && e.onFocus(...o)),
      onInvalid: t[3] || (t[3] = (...o) => e.onInvalid && e.onInvalid(...o))
    }), [e.placeholder ? (l(), d(
      V,
      {
        key: 0
      },
      [e.placeholderVisible ? (l(), d(
        "option",
        Lh,
        F(e.placeholder),
        1
        /* TEXT */
      )) : y("v-if", !0)],
      64
      /* STABLE_FRAGMENT */
    )) : y("v-if", !0), b(e.$slots, "default")], 16, Nh), [[jn, e.computedValue]]), e.icon ? (l(), D(r, {
      key: 0,
      class: c(e.iconLeftClasses),
      icon: e.icon,
      pack: e.iconPack,
      size: e.size
    }, null, 8, ["class", "icon", "pack", "size"])) : y("v-if", !0), e.iconRight && !e.multiple ? (l(), D(r, {
      key: 1,
      class: c(e.iconRightClasses),
      icon: e.iconRight,
      pack: e.iconPack,
      size: e.size
    }, null, 8, ["class", "icon", "pack", "size"])) : y("v-if", !0)],
    2
    /* CLASS */
  );
}
Le.render = Eh;
Le.__file = "src/components/select/Select.vue";
var es = $({
  name: "ODatepickerTableRow",
  mixins: [L],
  configField: "datepicker",
  inject: {
    $datepicker: { from: "$datepicker", default: !1 }
  },
  emits: ["select", "rangeHoverEndDate", "change-focus"],
  props: {
    selectedDate: {
      type: [Date, Array]
    },
    hoveredDateRange: Array,
    day: {
      type: Number
    },
    week: {
      type: Array,
      required: !0
    },
    month: {
      type: Number,
      required: !0
    },
    showWeekNumber: Boolean,
    minDate: Date,
    maxDate: Date,
    disabled: Boolean,
    unselectableDates: Array,
    unselectableDaysOfWeek: Array,
    selectableDates: Array,
    events: Array,
    indicators: String,
    dateCreator: Function,
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    weekNumberClickable: Boolean,
    range: Boolean,
    multiple: Boolean,
    rulesForFirstWeek: Number,
    firstDayOfWeek: Number,
    tableRowClass: [String, Function, Array],
    tableCellClass: [String, Function, Array],
    tableCellSelectedClass: [String, Function, Array],
    tableCellFirstSelectedClass: [String, Function, Array],
    tableCellWithinSelectedClass: [String, Function, Array],
    tableCellLastSelectedClass: [String, Function, Array],
    tableCellFirstHoveredClass: [String, Function, Array],
    tableCellInvisibleClass: [String, Function, Array],
    tableCellWithinHoveredClass: [String, Function, Array],
    tableCellLastHoveredClass: [String, Function, Array],
    tableCellTodayClass: [String, Function, Array],
    tableCellSelectableClass: [String, Function, Array],
    tableCellUnselectableClass: [String, Function, Array],
    tableCellNearbyClass: [String, Function, Array],
    tableCellEventsClass: [String, Function, Array],
    tableEventClass: [String, Function, Array],
    tableEventIndicatorsClass: [String, Function, Array],
    tableEventsClass: [String, Function, Array],
    tableEventVariantClass: [String, Function, Array]
  },
  computed: {
    tableRowClasses() {
      return [
        this.computedClass("tableRowClass", "o-dpck__table__row")
      ];
    },
    tableCellClasses() {
      return [
        this.computedClass("tableCellClass", "o-dpck__table__cell")
      ];
    },
    tableEventsClasses() {
      return [
        this.computedClass("tableEventsClass", "o-dpck__table__events")
      ];
    },
    hasEvents() {
      return this.events && this.events.length;
    }
  },
  watch: {
    day(e) {
      const t = `day-${this.month}-${e}`;
      this.$nextTick(() => {
        this.$refs[t] && this.$refs[t].length > 0 && this.$refs[t][0] && this.$refs[t][0].focus();
      });
    }
  },
  methods: {
    firstWeekOffset(e, t, s) {
      const i = 7 + t - s;
      return -((7 + new Date(e, 0, i).getDay() - t) % 7) + i - 1;
    },
    daysInYear(e) {
      return this.isLeapYear(e) ? 366 : 365;
    },
    isLeapYear(e) {
      return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
    },
    getSetDayOfYear(e) {
      return Math.round((e.getTime() - new Date(e.getFullYear(), 0, 1).getTime()) / 864e5) + 1;
    },
    weeksInYear(e, t, s) {
      const i = this.firstWeekOffset(e, t, s), a = this.firstWeekOffset(e + 1, t, s);
      return (this.daysInYear(e) - i + a) / 7;
    },
    getWeekNumber(e) {
      const t = this.firstDayOfWeek, s = this.rulesForFirstWeek, i = this.firstWeekOffset(e.getFullYear(), t, s), a = Math.floor((this.getSetDayOfYear(e) - i - 1) / 7) + 1;
      let n, r;
      return a < 1 ? (r = e.getFullYear() - 1, n = a + this.weeksInYear(r, t, s)) : a > this.weeksInYear(e.getFullYear(), t, s) ? (n = a - this.weeksInYear(e.getFullYear(), t, s), r = e.getFullYear() + 1) : (r = e.getFullYear(), n = a), n;
    },
    clickWeekNumber(e) {
      this.weekNumberClickable && this.$datepicker.$emit("week-number-click", e);
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(e) {
      const t = [];
      if (this.minDate && t.push(e >= this.minDate), this.maxDate && t.push(e <= this.maxDate), this.nearbyMonthDays && !this.nearbySelectableMonthDays && t.push(e.getMonth() === this.month), this.selectableDates)
        for (let s = 0; s < this.selectableDates.length; s++) {
          const i = this.selectableDates[s];
          if (e.getDate() === i.getDate() && e.getFullYear() === i.getFullYear() && e.getMonth() === i.getMonth())
            return !0;
          t.push(!1);
        }
      if (this.unselectableDates)
        for (let s = 0; s < this.unselectableDates.length; s++) {
          const i = this.unselectableDates[s];
          t.push(e.getDate() !== i.getDate() || e.getFullYear() !== i.getFullYear() || e.getMonth() !== i.getMonth());
        }
      if (this.unselectableDaysOfWeek)
        for (let s = 0; s < this.unselectableDaysOfWeek.length; s++) {
          const i = this.unselectableDaysOfWeek[s];
          t.push(e.getDay() !== i);
        }
      return t.indexOf(!1) < 0;
    },
    /*
    * Emit select event with chosen date as payload
    */
    emitChosenDate(e) {
      this.disabled || this.selectableDate(e) && this.$emit("select", e);
    },
    eventsDateMatch(e) {
      if (!this.events || !this.events.length)
        return !1;
      const t = [];
      for (let s = 0; s < this.events.length; s++)
        this.events[s].date.getDay() === e.getDay() && t.push(this.events[s]);
      return t.length ? t : !1;
    },
    /*
    * Build cellClasses for cell using validations
    */
    cellClasses(e) {
      function t(i, a, n = !1) {
        return !i || !a || n ? !1 : Array.isArray(a) ? a.some((r) => i.getDate() === r.getDate() && i.getFullYear() === r.getFullYear() && i.getMonth() === r.getMonth()) : i.getDate() === a.getDate() && i.getFullYear() === a.getFullYear() && i.getMonth() === a.getMonth();
      }
      function s(i, a, n = !1) {
        return !Array.isArray(a) || n ? !1 : i > a[0] && i < a[1];
      }
      return [
        ...this.tableCellClasses,
        {
          [this.computedClass("tableCellSelectedClass", "o-dpck__table__cell--selected")]: t(e, this.selectedDate) || s(e, this.selectedDate, this.multiple)
        },
        {
          [this.computedClass("tableCellFirstSelectedClass", "o-dpck__table__cell--first-selected")]: t(e, Array.isArray(this.selectedDate) && this.selectedDate[0], this.multiple)
        },
        {
          [this.computedClass("tableCellWithinSelectedClass", "o-dpck__table__cell--within-selected")]: s(e, this.selectedDate, this.multiple)
        },
        {
          [this.computedClass("tableCellLastSelectedClass", "o-dpck__table__cell--last-selected")]: t(e, Array.isArray(this.selectedDate) && this.selectedDate[1], this.multiple)
        },
        {
          [this.computedClass("tableCellFirstHoveredClass", "o-dpck__table__cell--first-hovered")]: t(e, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0])
        },
        {
          [this.computedClass("tableCellWithinHoveredClass", "o-dpck__table__cell--within-hovered")]: s(e, this.hoveredDateRange)
        },
        {
          [this.computedClass("tableCellLastHoveredClass", "o-dpck__table__cell--last-hovered")]: t(e, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1])
        },
        {
          [this.computedClass("tableCellTodayClass", "o-dpck__table__cell--today")]: t(e, this.dateCreator())
        },
        {
          [this.computedClass("tableCellSelectableClass", "o-dpck__table__cell--selectable")]: this.selectableDate(e) && !this.disabled
        },
        {
          [this.computedClass("tableCellUnselectableClass", "o-dpck__table__cell--unselectable")]: !this.selectableDate(e) || this.disabled
        },
        {
          [this.computedClass("tableCellInvisibleClass", "o-dpck__table__cell--invisible")]: !this.nearbyMonthDays && e.getMonth() !== this.month
        },
        {
          [this.computedClass("tableCellNearbyClass", "o-dpck__table__cell--nearby")]: this.nearbySelectableMonthDays && e.getMonth() !== this.month
        },
        {
          [this.computedClass("tableCellEventsClass", "o-dpck__table__cell--events")]: this.hasEvents
        },
        {
          [this.computedClass("tableCellTodayClass", "o-dpck__table__cell--today")]: t(e, this.dateCreator())
        }
      ];
    },
    eventClasses(e) {
      return [
        this.computedClass("tableEventClass", "o-dpck__table__event"),
        { [this.computedClass("tableEventVariantClass", "o-dpck__table__event--", e.type)]: e.type },
        { [this.computedClass("tableEventIndicatorsClass", "o-dpck__table__event--", this.indicators)]: this.indicators }
      ];
    },
    setRangeHoverEndDate(e) {
      this.range && this.$emit("rangeHoverEndDate", e);
    },
    manageKeydown(e, t) {
      const { key: s } = e;
      let i = !0;
      switch (s) {
        case "Tab": {
          i = !1;
          break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.emitChosenDate(t);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(t, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(t, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(t, -7);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(t, 7);
          break;
        }
      }
      i && e.preventDefault();
    },
    changeFocus(e, t) {
      const s = new Date(e.getTime());
      for (s.setDate(e.getDate() + t); (!this.minDate || s > this.minDate) && (!this.maxDate || s < this.maxDate) && !this.selectableDate(s); )
        s.setDate(e.getDate() + Math.sign(t));
      this.setRangeHoverEndDate(s), this.$emit("change-focus", s);
    }
  }
});
const Yh = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
function Hh(e, t, s, i, a, n) {
  return l(), d(
    "div",
    {
      class: c(e.tableRowClasses)
    },
    [e.showWeekNumber ? (l(), d(
      "a",
      {
        key: 0,
        class: c(e.tableCellClasses),
        style: me({
          cursor: e.weekNumberClickable ? "pointer" : "auto"
        }),
        onClick: t[0] || (t[0] = T((r) => e.clickWeekNumber(e.getWeekNumber(e.week[6])), ["prevent"]))
      },
      [v(
        "span",
        null,
        F(e.getWeekNumber(e.week[6])),
        1
        /* TEXT */
      )],
      6
      /* CLASS, STYLE */
    )) : y("v-if", !0), (l(!0), d(
      V,
      null,
      K(e.week, (r, o) => (l(), d(
        V,
        {
          key: o
        },
        [e.selectableDate(r) && !e.disabled ? (l(), d("a", {
          key: 0,
          ref_for: !0,
          ref: `day-${r.getMonth()}-${r.getDate()}`,
          class: c(e.cellClasses(r)),
          role: "button",
          href: "#",
          disabled: e.disabled,
          onClick: T((u) => e.emitChosenDate(r), ["prevent"]),
          onMouseenter: (u) => e.setRangeHoverEndDate(r),
          onKeydown: (u) => e.manageKeydown(u, r),
          tabindex: e.day === r.getDate() && e.month === r.getMonth() ? null : -1
        }, [v(
          "span",
          null,
          F(r.getDate()),
          1
          /* TEXT */
        ), e.eventsDateMatch(r) ? (l(), d(
          "div",
          {
            key: 0,
            class: c(e.tableEventsClasses)
          },
          [(l(!0), d(
            V,
            null,
            K(e.eventsDateMatch(r), (u, h) => (l(), d(
              "div",
              {
                class: c(e.eventClasses(u)),
                key: h
              },
              null,
              2
              /* CLASS */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))],
          2
          /* CLASS */
        )) : y("v-if", !0)], 42, Yh)) : (l(), d(
          "div",
          {
            key: o,
            class: c(e.cellClasses(r))
          },
          [v(
            "span",
            null,
            F(r.getDate()),
            1
            /* TEXT */
          )],
          2
          /* CLASS */
        ))],
        64
        /* STABLE_FRAGMENT */
      ))),
      128
      /* KEYED_FRAGMENT */
    ))],
    2
    /* CLASS */
  );
}
es.render = Hh;
es.__file = "src/components/datepicker/DatepickerTableRow.vue";
var ts = $({
  name: "ODatepickerTable",
  mixins: [L],
  configField: "datepicker",
  components: {
    [es.name]: es
  },
  emits: ["update:modelValue", "range-start", "range-end", "update:focused"],
  props: {
    modelValue: {
      type: [Date, Array]
    },
    dayNames: Array,
    monthNames: Array,
    firstDayOfWeek: Number,
    events: Array,
    indicators: String,
    minDate: Date,
    maxDate: Date,
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: Array,
    unselectableDaysOfWeek: Array,
    selectableDates: Array,
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    showWeekNumber: Boolean,
    weekNumberClickable: Boolean,
    rulesForFirstWeek: Number,
    range: Boolean,
    multiple: Boolean,
    tableClass: [String, Function, Array],
    tableHeadClass: [String, Function, Array],
    tableHeadCellClass: [String, Function, Array],
    tableBodyClass: [String, Function, Array],
    tableRowClass: [String, Function, Array],
    tableCellClass: [String, Function, Array],
    tableCellSelectedClass: [String, Function, Array],
    tableCellFirstSelectedClass: [String, Function, Array],
    tableCellInvisibleClass: [String, Function, Array],
    tableCellWithinSelectedClass: [String, Function, Array],
    tableCellLastSelectedClass: [String, Function, Array],
    tableCellFirstHoveredClass: [String, Function, Array],
    tableCellWithinHoveredClass: [String, Function, Array],
    tableCellLastHoveredClass: [String, Function, Array],
    tableCellTodayClass: [String, Function, Array],
    tableCellSelectableClass: [String, Function, Array],
    tableCellUnselectableClass: [String, Function, Array],
    tableCellNearbyClass: [String, Function, Array],
    tableCellEventsClass: [String, Function, Array],
    tableEventClass: [String, Function, Array],
    tableEventIndicatorsClass: [String, Function, Array],
    tableEventsClass: [String, Function, Array],
    tableEventVariantClass: [String, Function, Array]
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0
    };
  },
  computed: {
    tableClasses() {
      return [
        this.computedClass("tableClass", "o-dpck__table")
      ];
    },
    tableHeadClasses() {
      return [
        this.computedClass("tableHeadClass", "o-dpck__table__head")
      ];
    },
    tableHeadCellClasses() {
      return [
        this.computedClass("tableHeadCellClass", "o-dpck__table__head-cell"),
        ...this.tableCellClasses
      ];
    },
    tableBodyClasses() {
      return [
        this.computedClass("tableBodyClass", "o-dpck__table__body")
      ];
    },
    tableCellClasses() {
      return [
        this.computedClass("tableCellClass", "o-dpck__table__cell")
      ];
    },
    visibleDayNames() {
      const e = [];
      let t = this.firstDayOfWeek;
      for (; e.length < this.dayNames.length; ) {
        const s = this.dayNames[t % this.dayNames.length];
        e.push(s), t++;
      }
      return this.showWeekNumber && e.unshift(""), e;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisMonth() {
      if (!this.events)
        return [];
      const e = [];
      for (let t = 0; t < this.events.length; t++) {
        let s = this.events[t];
        Object.prototype.hasOwnProperty.call(s, "date") || (s = { date: s }), s.date.getMonth() === this.focused.month && s.date.getFullYear() === this.focused.year && e.push(s);
      }
      return e;
    },
    /*
    * Return array of all weeks in the specified month
    */
    weeksInThisMonth() {
      this.validateFocusedDay();
      const e = this.focused.month, t = this.focused.year, s = [];
      let i = 1;
      for (; s.length < 6; ) {
        const a = this.weekBuilder(i, e, t);
        s.push(a), i += 7;
      }
      return s;
    },
    hoveredDateRange() {
      return this.range ? isNaN(this.selectedEndDate) ? this.hoveredEndDate < this.selectedBeginDate ? [this.hoveredEndDate, this.selectedBeginDate].filter((e) => e !== void 0) : [this.selectedBeginDate, this.hoveredEndDate].filter((e) => e !== void 0) : [] : [];
    }
  },
  methods: {
    /*
    * Emit input event with selected date as payload for v-model in parent
    */
    updateSelectedDate(e) {
      !this.range && !this.multiple ? this.$emit("update:modelValue", e) : this.range ? this.handleSelectRangeDate(e) : this.multiple && this.handleSelectMultipleDates(e);
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(e) {
      this.selectedBeginDate && this.selectedEndDate ? (this.selectedBeginDate = e, this.selectedEndDate = void 0, this.$emit("range-start", e)) : this.selectedBeginDate && !this.selectedEndDate ? (this.selectedBeginDate > e ? (this.selectedEndDate = this.selectedBeginDate, this.selectedBeginDate = e) : this.selectedEndDate = e, this.$emit("range-end", e), this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate])) : (this.selectedBeginDate = e, this.$emit("range-start", e));
    },
    /*
    * If selected date already exists list of selected dates, remove it from the list
    * Otherwise, add date to list of selected dates
    */
    handleSelectMultipleDates(e) {
      let t = this.modelValue;
      t.filter((i) => i.getDate() === e.getDate() && i.getFullYear() === e.getFullYear() && i.getMonth() === e.getMonth()).length ? t = t.filter((i) => i.getDate() !== e.getDate() || i.getFullYear() !== e.getFullYear() || i.getMonth() !== e.getMonth()) : t = [...t, e], this.$emit("update:modelValue", t);
    },
    /*
     * Return array of all days in the week that the startingDate is within
     */
    weekBuilder(e, t, s) {
      const i = new Date(s, t), a = [], n = new Date(s, t, e).getDay(), r = n >= this.firstDayOfWeek ? n - this.firstDayOfWeek : 7 - this.firstDayOfWeek + n;
      let o = 1;
      for (let h = 0; h < r; h++)
        a.unshift(new Date(i.getFullYear(), i.getMonth(), e - o)), o++;
      a.push(new Date(s, t, e));
      let u = 1;
      for (; a.length < 7; )
        a.push(new Date(s, t, e + u)), u++;
      return a;
    },
    validateFocusedDay() {
      const e = new Date(this.focused.year, this.focused.month, this.focused.day);
      if (this.selectableDate(e))
        return;
      let t = 0;
      const s = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
      let i = null;
      for (; !i && ++t < s; ) {
        const a = new Date(this.focused.year, this.focused.month, t);
        if (this.selectableDate(a)) {
          i = e;
          const n = {
            day: a.getDate(),
            month: a.getMonth(),
            year: a.getFullYear()
          };
          this.$emit("update:focused", n);
        }
      }
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(e) {
      const t = [];
      if (this.minDate && t.push(e >= this.minDate), this.maxDate && t.push(e <= this.maxDate), this.nearbyMonthDays && !this.nearbySelectableMonthDays && t.push(e.getMonth() === this.focused.month), this.selectableDates)
        for (let s = 0; s < this.selectableDates.length; s++) {
          const i = this.selectableDates[s];
          if (e.getDate() === i.getDate() && e.getFullYear() === i.getFullYear() && e.getMonth() === i.getMonth())
            return !0;
          t.push(!1);
        }
      if (this.unselectableDates)
        for (let s = 0; s < this.unselectableDates.length; s++) {
          const i = this.unselectableDates[s];
          t.push(e.getDate() !== i.getDate() || e.getFullYear() !== i.getFullYear() || e.getMonth() !== i.getMonth());
        }
      if (this.unselectableDaysOfWeek)
        for (let s = 0; s < this.unselectableDaysOfWeek.length; s++) {
          const i = this.unselectableDaysOfWeek[s];
          t.push(e.getDay() !== i);
        }
      return t.indexOf(!1) < 0;
    },
    eventsInThisWeek(e) {
      return this.eventsInThisMonth.filter((t) => {
        const s = new Date(Date.parse(t.date));
        s.setHours(0, 0, 0, 0);
        const i = s.getTime();
        return e.some((a) => a.getTime() === i);
      });
    },
    setRangeHoverEndDate(e) {
      this.hoveredEndDate = e;
    },
    changeFocus(e) {
      const t = {
        day: e.getDate(),
        month: e.getMonth(),
        year: e.getFullYear()
      };
      this.$emit("update:focused", t);
    }
  }
});
function Wh(e, t, s, i, a, n) {
  const r = w("o-datepicker-table-row");
  return l(), d(
    "section",
    {
      class: c(e.tableClasses)
    },
    [v(
      "header",
      {
        class: c(e.tableHeadClasses)
      },
      [(l(!0), d(
        V,
        null,
        K(e.visibleDayNames, (o, u) => (l(), d(
          "div",
          {
            key: u,
            class: c(e.tableHeadCellClasses)
          },
          [v(
            "span",
            null,
            F(o),
            1
            /* TEXT */
          )],
          2
          /* CLASS */
        ))),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    ), v(
      "div",
      {
        class: c(e.tableBodyClasses)
      },
      [(l(!0), d(
        V,
        null,
        K(e.weeksInThisMonth, (o, u) => (l(), D(r, {
          key: u,
          "selected-date": e.modelValue,
          day: e.focused.day,
          week: o,
          month: e.focused.month,
          "min-date": e.minDate,
          "max-date": e.maxDate,
          disabled: e.disabled,
          "unselectable-dates": e.unselectableDates,
          "unselectable-days-of-week": e.unselectableDaysOfWeek,
          "selectable-dates": e.selectableDates,
          events: e.eventsInThisWeek(o),
          indicators: e.indicators,
          "date-creator": e.dateCreator,
          "nearby-month-days": e.nearbyMonthDays,
          "nearby-selectable-month-days": e.nearbySelectableMonthDays,
          "show-week-number": e.showWeekNumber,
          "week-number-clickable": e.weekNumberClickable,
          "first-day-of-week": e.firstDayOfWeek,
          "rules-for-first-week": e.rulesForFirstWeek,
          range: e.range,
          "hovered-date-range": e.hoveredDateRange,
          multiple: e.multiple,
          "table-row-class": e.tableRowClass,
          "table-cell-class": e.tableCellClass,
          "table-cell-selected-class": e.tableCellSelectedClass,
          "table-cell-first-selected-class": e.tableCellFirstSelectedClass,
          "table-cell-invisible-class": e.tableCellInvisibleClass,
          "table-cell-within-selected-class": e.tableCellWithinSelectedClass,
          "table-cell-last-selected-class": e.tableCellLastSelectedClass,
          "table-cell-first-hovered-class": e.tableCellFirstHoveredClass,
          "table-cell-within-hovered-class": e.tableCellWithinHoveredClass,
          "table-cell-last-hovered-class": e.tableCellLastHoveredClass,
          "table-cell-today-class": e.tableCellTodayClass,
          "table-cell-selectable-class": e.tableCellSelectableClass,
          "table-cell-unselectable-class": e.tableCellUnselectableClass,
          "table-cell-nearby-class": e.tableCellNearbyClass,
          "table-cell-events-class": e.tableCellEventsClass,
          "table-events-class": e.tableEventsClass,
          "table-event-variant-class": e.tableEventVariantClass,
          "table-event-class": e.tableEventClass,
          "table-event-indicators-class": e.tableEventIndicatorsClass,
          onSelect: e.updateSelectedDate,
          onRangeHoverEndDate: e.setRangeHoverEndDate,
          onChangeFocus: e.changeFocus
        }, null, 8, ["selected-date", "day", "week", "month", "min-date", "max-date", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "first-day-of-week", "rules-for-first-week", "range", "hovered-date-range", "multiple", "table-row-class", "table-cell-class", "table-cell-selected-class", "table-cell-first-selected-class", "table-cell-invisible-class", "table-cell-within-selected-class", "table-cell-last-selected-class", "table-cell-first-hovered-class", "table-cell-within-hovered-class", "table-cell-last-hovered-class", "table-cell-today-class", "table-cell-selectable-class", "table-cell-unselectable-class", "table-cell-nearby-class", "table-cell-events-class", "table-events-class", "table-event-variant-class", "table-event-class", "table-event-indicators-class", "onSelect", "onRangeHoverEndDate", "onChangeFocus"]))),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
ts.render = Wh;
ts.__file = "src/components/datepicker/DatepickerTable.vue";
var zh = {
  methods: {
    manageKeydown(e, t) {
      const { key: s } = e;
      let i = !0;
      switch (s) {
        case "Tab": {
          i = !1;
          break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.emitChosenDate(t);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(t, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(t, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(t, -7);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(t, 7);
          break;
        }
      }
      i && e.preventDefault();
    }
  }
}, ss = {
  name: "ODatepickerMonth",
  mixins: [L, zh],
  configField: "datepicker",
  emits: ["update:modelValue", "range-start", "range-end", "updated:focused"],
  props: {
    modelValue: {
      type: [Date, Array]
    },
    monthNames: Array,
    events: Array,
    indicators: String,
    minDate: Date,
    maxDate: Date,
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: [Array, Function],
    unselectableDaysOfWeek: Array,
    selectableDates: [Array, Function],
    range: Boolean,
    multiple: Boolean,
    monthClass: [String, Function, Array],
    monthBodyClass: [String, Function, Array],
    monthTableClass: [String, Function, Array],
    monthCellClass: [String, Function, Array],
    monthCellSelectedClass: [String, Function, Array],
    monthCellFirstSelectedClass: [String, Function, Array],
    monthCellWithinSelectedClass: [String, Function, Array],
    monthCellLastSelectedClass: [String, Function, Array],
    monthCellWithinHoveredRangeClass: [String, Function, Array],
    monthCellFirstHoveredClass: [String, Function, Array],
    monthCellWithinHoveredClass: [String, Function, Array],
    monthCellLastHoveredClass: [String, Function, Array],
    monthCellTodayClass: [String, Function, Array],
    monthCellSelectableClass: [String, Function, Array],
    monthCellUnselectableClass: [String, Function, Array],
    monthCellEventsClass: [String, Function, Array]
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0,
      multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue : []
    };
  },
  computed: {
    monthClasses() {
      return [
        this.computedClass("monthClass", "o-dpck__month")
      ];
    },
    monthBodyClasses() {
      return [
        this.computedClass("monthBodyClass", "o-dpck__month__body")
      ];
    },
    monthTableClasses() {
      return [
        this.computedClass("monthTableClass", "o-dpck__month__table")
      ];
    },
    monthCellClasses() {
      return [
        this.computedClass("monthCellClass", "o-dpck__month__cell")
      ];
    },
    hasEvents() {
      return this.events && this.events.length;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisYear() {
      if (!this.events)
        return [];
      const e = [];
      for (let t = 0; t < this.events.length; t++) {
        let s = this.events[t];
        Object.prototype.hasOwnProperty.call(s, "date") || (s = { date: s }), Object.prototype.hasOwnProperty.call(s, "type") || (s.type = "is-primary"), s.date.getFullYear() === this.focused.year && e.push(s);
      }
      return e;
    },
    monthDates() {
      const e = this.focused.year, t = [];
      for (let s = 0; s < 12; s++) {
        const i = new Date(e, s, 1);
        i.setHours(0, 0, 0, 0), t.push(i);
      }
      return t;
    },
    focusedMonth() {
      return this.focused.month;
    },
    hoveredDateRange() {
      return this.range ? isNaN(this.selectedEndDate) ? this.hoveredEndDate < this.selectedBeginDate ? [this.hoveredEndDate, this.selectedBeginDate].filter(_i) : [this.selectedBeginDate, this.hoveredEndDate].filter(_i) : [] : [];
    }
  },
  watch: {
    focusedMonth(e) {
      const t = `month-${e}`;
      this.$refs[t] && this.$refs[t].length > 0 && this.$nextTick(() => {
        this.$refs[t][0] && this.$refs[t][0].focus();
      });
    }
  },
  methods: {
    selectMultipleDates(e) {
      this.multipleSelectedDates.filter((s) => s.getDate() === e.getDate() && s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()).length ? this.multipleSelectedDates = this.multipleSelectedDates.filter((s) => s.getDate() !== e.getDate() || s.getFullYear() !== e.getFullYear() || s.getMonth() !== e.getMonth()) : this.multipleSelectedDates.push(e), this.$emit("update:modelValue", this.multipleSelectedDates);
    },
    selectableDate(e) {
      const t = [];
      if (this.minDate && t.push(e >= this.minDate), this.maxDate && t.push(e <= this.maxDate), t.push(e.getFullYear() === this.focused.year), this.selectableDates)
        if (typeof this.selectableDates == "function") {
          if (this.selectableDates(e))
            return !0;
          t.push(!1);
        } else
          for (let s = 0; s < this.selectableDates.length; s++) {
            const i = this.selectableDates[s];
            if (e.getFullYear() === i.getFullYear() && e.getMonth() === i.getMonth())
              return !0;
            t.push(!1);
          }
      if (this.unselectableDates)
        if (typeof this.unselectableDates == "function")
          t.push(!this.unselectableDates(e));
        else
          for (let s = 0; s < this.unselectableDates.length; s++) {
            const i = this.unselectableDates[s];
            t.push(e.getFullYear() !== i.getFullYear() || e.getMonth() !== i.getMonth());
          }
      if (this.unselectableDaysOfWeek)
        for (let s = 0; s < this.unselectableDaysOfWeek.length; s++) {
          const i = this.unselectableDaysOfWeek[s];
          t.push(e.getDay() !== i);
        }
      return t.indexOf(!1) < 0;
    },
    eventsDateMatch(e) {
      if (!this.eventsInThisYear.length)
        return !1;
      const t = [];
      for (let s = 0; s < this.eventsInThisYear.length; s++)
        this.eventsInThisYear[s].date.getMonth() === e.getMonth() && t.push(this.events[s]);
      return t.length ? t : !1;
    },
    /*
    * Build cellClasses for cell using validations
    */
    cellClasses(e) {
      function t(a, n, r = !1) {
        return !a || !n || r ? !1 : Array.isArray(n) ? n.some((o) => a.getFullYear() === o.getFullYear() && a.getMonth() === o.getMonth()) : a.getFullYear() === n.getFullYear() && a.getMonth() === n.getMonth();
      }
      function s(a, n, r = !1) {
        return !Array.isArray(n) || r ? !1 : a > n[0] && a < n[1];
      }
      function i(a, n, r = !1) {
        return !Array.isArray(n) || !r ? !1 : n.some((o) => a.getDate() === o.getDate() && a.getFullYear() === o.getFullYear() && a.getMonth() === o.getMonth());
      }
      return [
        ...this.monthCellClasses,
        {
          [this.computedClass("monthCellSelectedClass", "o-dpck__month__cell--selected")]: t(e, this.modelValue, this.multiple) || s(e, this.modelValue, this.multiple) || i(e, this.multipleSelectedDates, this.multiple)
        },
        {
          [this.computedClass("monthCellFirstSelectedClass", "o-dpck__month__cell--first-selected")]: t(e, Array.isArray(this.modelValue) && this.modelValue[0], this.multiple)
        },
        {
          [this.computedClass("monthCellWithinSelectedClass", "o-dpck__month__cell--within-selected")]: s(e, this.modelValue, this.multiple)
        },
        {
          [this.computedClass("monthCellLastSelectedClass", "o-dpck__month__cell--last-selected")]: t(e, Array.isArray(this.modelValue) && this.modelValue[1], this.multiple)
        },
        {
          [this.computedClass("monthCellWithinHoveredRangeClass", "o-dpck__month__cell--within-hovered-range")]: this.hoveredDateRange && this.hoveredDateRange.length === 2 && (t(e, this.hoveredDateRange) || s(e, this.hoveredDateRange))
        },
        {
          [this.computedClass("monthCellFirstHoveredClass", "o-dpck__month__cell--first-hovered")]: t(e, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0])
        },
        {
          [this.computedClass("monthCellWithinHoveredClass", "o-dpck__month__cell--within-hovered")]: s(e, this.hoveredDateRange)
        },
        {
          [this.computedClass("monthCellLastHoveredClass", "o-dpck__month__cell--last-hovered")]: t(e, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1])
        },
        {
          [this.computedClass("monthCellTodayClass", "o-dpck__month__cell--today")]: t(e, this.dateCreator())
        },
        {
          [this.computedClass("monthCellSelectableclass", "o-dpck__month__cell--selectable")]: this.selectableDate(e) && !this.disabled
        },
        {
          [this.computedClass("monthCellUnselectableClass", "o-dpck__month__cell--unselectable")]: !this.selectableDate(e) || this.disabled
        },
        {
          [this.computedClass("monthCellEventsClass", "o-dpck__month__cell--events")]: this.hasEvents
        }
      ];
    },
    /*
     * Emit update:modelValue event with selected date as payload for v-model in parent
     */
    updateSelectedDate(e) {
      !this.range && !this.multiple ? this.emitChosenDate(e) : this.range ? this.handleSelectRangeDate(e) : this.multiple && this.selectMultipleDates(e);
    },
    /*
     * Emit select event with chosen date as payload
     */
    emitChosenDate(e) {
      this.disabled || (this.multiple ? this.selectMultipleDates(e) : this.selectableDate(e) && this.$emit("update:modelValue", e));
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(e) {
      this.disabled || (this.selectedBeginDate && this.selectedEndDate ? (this.selectedBeginDate = e, this.selectedEndDate = void 0, this.$emit("range-start", e)) : this.selectedBeginDate && !this.selectedEndDate ? (this.selectedBeginDate > e ? (this.selectedEndDate = this.selectedBeginDate, this.selectedBeginDate = e) : this.selectedEndDate = e, this.$emit("range-end", e), this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate])) : (this.selectedBeginDate = e, this.$emit("range-start", e)));
    },
    setRangeHoverEndDate(e) {
      this.range && (this.hoveredEndDate = e);
    },
    changeFocus(e, t) {
      const s = e;
      s.setMonth(e.getMonth() + t), this.$emit("update:focused", s);
    }
  }
};
const _h = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"], jh = {
  key: 0,
  class: "events"
};
function Uh(e, t, s, i, a, n) {
  return l(), d(
    "section",
    {
      class: c(n.monthClasses)
    },
    [v(
      "div",
      {
        class: c(n.monthBodyClasses)
      },
      [v(
        "div",
        {
          class: c(n.monthTableClasses)
        },
        [(l(!0), d(
          V,
          null,
          K(n.monthDates, (r, o) => (l(), d(
            V,
            {
              key: o
            },
            [n.selectableDate(r) && !s.disabled ? (l(), d("a", {
              key: 0,
              ref_for: !0,
              ref: `month-${r.getMonth()}`,
              class: c(n.cellClasses(r)),
              role: "button",
              href: "#",
              disabled: s.disabled,
              onClick: T((u) => n.updateSelectedDate(r), ["prevent"]),
              onMouseenter: (u) => n.setRangeHoverEndDate(r),
              onKeydown: T((u) => e.manageKeydown(u, r), ["prevent"]),
              tabindex: s.focused.month === r.getMonth() ? null : -1
            }, [se(
              F(s.monthNames[r.getMonth()]) + " ",
              1
              /* TEXT */
            ), n.eventsDateMatch(r) ? (l(), d("div", jh, [(l(!0), d(
              V,
              null,
              K(n.eventsDateMatch(r), (u, h) => (l(), d(
                "div",
                {
                  class: c(["event", u.type]),
                  key: h
                },
                null,
                2
                /* CLASS */
              ))),
              128
              /* KEYED_FRAGMENT */
            ))])) : y("v-if", !0)], 42, _h)) : (l(), d(
              "div",
              {
                key: 1,
                class: c(n.cellClasses(r))
              },
              F(s.monthNames[r.getMonth()]),
              3
              /* TEXT, CLASS */
            ))],
            64
            /* STABLE_FRAGMENT */
          ))),
          128
          /* KEYED_FRAGMENT */
        ))],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
ss.render = Uh;
ss.__file = "src/components/datepicker/DatepickerMonth.vue";
const qh = (e, t) => {
  const i = (Array.isArray(e) ? e : [e]).map((a) => {
    const n = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 12);
    return t.isTypeMonth ? t.dtfMonth.format(n) : t.dtf.format(n);
  });
  return t.multiple ? i.join(", ") : i.join(" - ");
}, Kh = (e, t) => {
  if (t.dtf.formatToParts && typeof t.dtf.formatToParts == "function") {
    const s = (t.isTypeMonth ? t.dtfMonth : t.dtf).formatToParts(new Date(2e3, 11, 25)).map((a) => a.type === "literal" ? a.value : `((?!=<${a.type}>)\\d+)`).join(""), i = mi(s, e);
    if (i.year && i.year.length === 4 && i.month && i.month <= 12) {
      if (t.isTypeMonth)
        return new Date(i.year, i.month - 1);
      if (i.day && i.day <= 31)
        return new Date(i.year, i.month - 1, i.day, 12);
    }
  }
  if (!t.isTypeMonth)
    return new Date(Date.parse(e));
  if (e) {
    const s = e.split("/"), i = s[0].length === 4 ? s[0] : s[1], a = s[0].length === 2 ? s[0] : s[1];
    if (i && a)
      return new Date(parseInt(i, 10), parseInt(a, 10) - 1, 1, 0, 0, 0, 0);
  }
  return null;
};
var At = $({
  name: "ODatepicker",
  components: {
    [ts.name]: ts,
    [ss.name]: ss,
    [tt.name]: tt,
    [we.name]: we,
    [Le.name]: Le,
    [z.name]: z,
    [xe.name]: xe,
    [et.name]: et
  },
  configField: "datepicker",
  mixins: [L, Ke, He],
  inheritAttrs: !1,
  provide() {
    return {
      $datepicker: this
    };
  },
  emits: ["update:modelValue", "focus", "blur", "invalid", "change-month", "change-year", "range-start", "range-end", "active-change", "icon-right-click"],
  props: {
    modelValue: {
      type: [Date, Array]
    },
    dayNames: {
      type: Array,
      default: () => m(p(), "datepicker.dayNames", void 0)
    },
    monthNames: {
      type: Array,
      default: () => m(p(), "datepicker.monthNames", void 0)
    },
    firstDayOfWeek: {
      type: Number,
      default: () => m(p(), "datepicker.firstDayOfWeek", 0)
    },
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    inline: Boolean,
    minDate: Date,
    maxDate: Date,
    focusedDate: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    unselectableDates: [Array, Function],
    unselectableDaysOfWeek: {
      type: Array,
      default: () => m(p(), "datepicker.unselectableDaysOfWeek", void 0)
    },
    selectableDates: [Array, Function],
    dateFormatter: {
      type: Function,
      default: (e, t) => {
        const s = m(p(), "datepicker.dateFormatter", void 0);
        return typeof s == "function" ? s(e) : qh(e, t);
      }
    },
    dateParser: {
      type: Function,
      default: (e, t) => {
        const s = m(p(), "datepicker.dateParser", void 0);
        return typeof s == "function" ? s(e) : Kh(e, t);
      }
    },
    dateCreator: {
      type: Function,
      default: () => {
        const e = m(p(), "datepicker.dateCreator", void 0);
        return typeof e == "function" ? e() : /* @__PURE__ */ new Date();
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => m(p(), "datepicker.mobileNative", !0)
    },
    position: String,
    iconRight: String,
    iconRightClickable: Boolean,
    events: Array,
    indicators: {
      type: String,
      default: "dots"
    },
    openOnFocus: Boolean,
    iconPrev: {
      type: String,
      default: () => m(p(), "datepicker.iconPrev", "chevron-left")
    },
    iconNext: {
      type: String,
      default: () => m(p(), "datepicker.iconNext", "chevron-right")
    },
    yearsRange: {
      type: Array,
      default: () => m(p(), "datepicker.yearsRange", [-100, 10])
    },
    type: {
      type: String,
      validator: (e) => [
        "month"
      ].indexOf(e) >= 0
    },
    nearbyMonthDays: {
      type: Boolean,
      default: () => m(p(), "datepicker.nearbyMonthDays", !0)
    },
    nearbySelectableMonthDays: {
      type: Boolean,
      default: () => m(p(), "datepicker.nearbySelectableMonthDays", !1)
    },
    showWeekNumber: {
      type: Boolean,
      default: () => m(p(), "datepicker.showWeekNumber", !1)
    },
    weekNumberClickable: {
      type: Boolean,
      default: () => m(p(), "datepicker.weekNumberClickable", !1)
    },
    rulesForFirstWeek: {
      type: Number,
      default: () => 4
    },
    range: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    mobileModal: {
      type: Boolean,
      default: () => m(p(), "datepicker.mobileModal", !0)
    },
    trapFocus: {
      type: Boolean,
      default: () => m(p(), "datepicker.trapFocus", !0)
    },
    locale: {
      type: [String, Array],
      default: () => m(p(), "locale")
    },
    appendToBody: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    boxClass: [String, Function, Array],
    headerClass: [String, Function, Array],
    headerButtonsClass: [String, Function, Array],
    headerButtonsSizeClass: [String, Function, Array],
    prevBtnClass: [String, Function, Array],
    nextBtnClass: [String, Function, Array],
    listsClass: [String, Function, Array],
    footerClass: [String, Function, Array],
    tableClass: [String, Function, Array],
    tableHeadClass: [String, Function, Array],
    tableHeadCellClass: [String, Function, Array],
    tableBodyClass: [String, Function, Array],
    tableRowClass: [String, Function, Array],
    tableCellClass: [String, Function, Array],
    tableCellSelectedClass: [String, Function, Array],
    tableCellFirstSelectedClass: [String, Function, Array],
    tableCellInvisibleClass: [String, Function, Array],
    tableCellWithinSelectedClass: [String, Function, Array],
    tableCellLastSelectedClass: [String, Function, Array],
    tableCellFirstHoveredClass: [String, Function, Array],
    tableCellWithinHoveredClass: [String, Function, Array],
    tableCellLastHoveredClass: [String, Function, Array],
    tableCellTodayClass: [String, Function, Array],
    tableCellSelectableClass: [String, Function, Array],
    tableCellUnselectableClass: [String, Function, Array],
    tableCellNearbyClass: [String, Function, Array],
    tableCellEventsClass: [String, Function, Array],
    tableEventsClass: [String, Function, Array],
    tableEventVariantClass: [String, Function, Array],
    tableEventClass: [String, Function, Array],
    tableEventIndicatorsClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    /* datapickermonth classes */
    monthClass: [String, Function, Array],
    monthBodyClass: [String, Function, Array],
    monthTableClass: [String, Function, Array],
    monthCellClass: [String, Function, Array],
    monthCellSelectedClass: [String, Function, Array],
    monthCellFirstSelectedClass: [String, Function, Array],
    monthCellWithinSelectedClass: [String, Function, Array],
    monthCellLastSelectedClass: [String, Function, Array],
    monthCellWithinHoveredRangeClass: [String, Function, Array],
    monthCellFirstHoveredClass: [String, Function, Array],
    monthCellWithinHoveredClass: [String, Function, Array],
    monthCellLastHoveredClass: [String, Function, Array],
    monthCellTodayClass: [String, Function, Array],
    monthCellSelectableClass: [String, Function, Array],
    monthCellUnselectableClass: [String, Function, Array],
    monthCellEventsClass: [String, Function, Array],
    inputClasses: {
      type: Object,
      default: () => m(p(), "datepicker.inputClasses", {})
    },
    dropdownClasses: {
      type: Object,
      default: () => m(p(), "datepicker.dropdownClasses", {})
    },
    selectListClasses: Object
  },
  data() {
    const e = (Array.isArray(this.modelValue) ? this.modelValue[0] : this.modelValue) || this.focusedDate || this.dateCreator();
    return !this.modelValue && this.maxDate && this.maxDate.getFullYear() < e.getFullYear() && e.setFullYear(this.maxDate.getFullYear()), {
      dateSelected: this.modelValue,
      focusedDateData: {
        day: e.getDate(),
        month: e.getMonth(),
        year: e.getFullYear()
      }
    };
  },
  computed: {
    inputBind() {
      return {
        ...this.$attrs,
        ...this.inputClasses
      };
    },
    dropdownBind() {
      return {
        "root-class": this.computedClass("dropdownClasses.rootClass", "o-dpck__dropdown"),
        ...this.dropdownClasses
      };
    },
    selectListBind() {
      return {
        ...this.selectListClasses
      };
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-dpck"),
        { [this.computedClass("sizeClass", "o-dpck--", this.size)]: this.size },
        { [this.computedClass("mobileClass", "o-dpck--mobile")]: this.isMatchMedia }
      ];
    },
    boxClasses() {
      return [
        this.computedClass("boxClass", "o-dpck__box")
      ];
    },
    headerClasses() {
      return [
        this.computedClass("headerClass", "o-dpck__header")
      ];
    },
    headerButtonsClasses() {
      return [
        this.computedClass("headerButtonsClass", "o-dpck__header__buttons"),
        { [this.computedClass("headerButtonsSizeClass", "o-dpck__header__buttons--", this.size)]: this.size }
      ];
    },
    prevBtnClasses() {
      return [
        this.computedClass("prevBtnClass", "o-dpck__header__previous")
      ];
    },
    nextBtnClasses() {
      return [
        this.computedClass("nextBtnClass", "o-dpck__header__next")
      ];
    },
    listsClasses() {
      return [
        this.computedClass("listsClass", "o-dpck__header__list")
      ];
    },
    footerClasses() {
      return [
        this.computedClass("footerClass", "o-dpck__footer")
      ];
    },
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(e) {
        this.updateInternalState(e), this.multiple || this.togglePicker(!1), this.$emit("update:modelValue", e), this.useHtml5Validation && this.$nextTick(() => {
          this.checkHtml5Validity();
        });
      }
    },
    formattedValue() {
      return this.formatValue(this.computedValue);
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric"
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(
        this.locale
        /*, { timeZone: 'UTC' }*/
      );
    },
    dtfMonth() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "2-digit"
        // timeZone: 'UTC'
      });
    },
    newMonthNames() {
      return Array.isArray(this.monthNames) ? this.monthNames : Wd(this.locale);
    },
    newDayNames() {
      return Array.isArray(this.dayNames) ? this.dayNames : zd(this.locale);
    },
    listOfMonths() {
      let e = 0, t = 12;
      return this.minDate && this.focusedDateData.year === this.minDate.getFullYear() && (e = this.minDate.getMonth()), this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear() && (t = this.maxDate.getMonth()), this.newMonthNames.map((s, i) => ({
        name: s,
        index: i,
        disabled: i < e || i > t
      }));
    },
    /*
     * Returns an array of years for the year dropdown. If earliest/latest
     * dates are set by props, range of years will fall within those dates.
     */
    listOfYears() {
      let e = this.focusedDateData.year + this.yearsRange[1];
      this.maxDate && this.maxDate.getFullYear() < e && (e = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year));
      let t = this.focusedDateData.year + this.yearsRange[0];
      this.minDate && this.minDate.getFullYear() > t && (t = Math.min(this.minDate.getFullYear(), this.focusedDateData.year));
      const s = [];
      for (let i = t; i <= e; i++)
        s.push(i);
      return s.reverse();
    },
    showPrev() {
      if (!this.minDate)
        return !1;
      if (this.isTypeMonth)
        return this.focusedDateData.year <= this.minDate.getFullYear();
      const e = new Date(this.focusedDateData.year, this.focusedDateData.month), t = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
      return e <= t;
    },
    showNext() {
      if (!this.maxDate)
        return !1;
      if (this.isTypeMonth)
        return this.focusedDateData.year >= this.maxDate.getFullYear();
      const e = new Date(this.focusedDateData.year, this.focusedDateData.month), t = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
      return e >= t;
    },
    isMobile() {
      return this.mobileNative && ze.any();
    },
    isTypeMonth() {
      return this.type === "month";
    },
    ariaRole() {
      return this.inline ? void 0 : "dialog";
    },
    $elementRef() {
      return "input";
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(e) {
      this.updateInternalState(e), this.multiple || this.togglePicker(!1);
    },
    focusedDate(e) {
      e && (this.focusedDateData = {
        day: e.getDate(),
        month: e.getMonth(),
        year: e.getFullYear()
      });
    },
    /*
     * Emit input event on month and/or year change
     */
    "focusedDateData.month"(e) {
      this.$emit("change-month", e);
    },
    "focusedDateData.year"(e) {
      this.$emit("change-year", e);
    }
  },
  methods: {
    /*
     * Parse string into date
     */
    onChange(e) {
      const t = this.dateParser(e, this);
      t && (!isNaN(t) || Array.isArray(t) && t.length === 2 && !isNaN(t[0]) && !isNaN(t[1])) ? this.computedValue = t : (this.computedValue = null, this.$refs.input && (this.$refs.input.newValue = this.computedValue));
    },
    /*
     * Format date into string
     */
    formatValue(e) {
      return Array.isArray(e) ? Array.isArray(e) && e.every((s) => !isNaN(s)) ? this.dateFormatter([...e], this) : null : e && !isNaN(e) ? this.dateFormatter(e, this) : null;
    },
    /*
     * Either decrement month by 1 if not January or decrement year by 1
     * and set month to 11 (December) or decrement year when 'month'
     */
    prev() {
      this.disabled || (this.isTypeMonth ? this.focusedDateData.year -= 1 : this.focusedDateData.month > 0 ? this.focusedDateData.month -= 1 : (this.focusedDateData.month = 11, this.focusedDateData.year -= 1));
    },
    /*
     * Either increment month by 1 if not December or increment year by 1
     * and set month to 0 (January) or increment year when 'month'
     */
    next() {
      this.disabled || (this.isTypeMonth ? this.focusedDateData.year += 1 : this.focusedDateData.month < 11 ? this.focusedDateData.month += 1 : (this.focusedDateData.month = 0, this.focusedDateData.year += 1));
    },
    formatNative(e) {
      return this.isTypeMonth ? this.formatYYYYMM(e) : this.formatYYYYMMDD(e);
    },
    /*
     * Format date into string 'YYYY-MM-DD'
     */
    formatYYYYMMDD(e) {
      const t = new Date(e);
      if (e && !isNaN(t.getTime())) {
        const s = t.getFullYear(), i = t.getMonth() + 1, a = t.getDate();
        return s + "-" + ((i < 10 ? "0" : "") + i) + "-" + ((a < 10 ? "0" : "") + a);
      }
      return "";
    },
    /*
     * Format date into string 'YYYY-MM'
     */
    formatYYYYMM(e) {
      const t = new Date(e);
      if (e && !isNaN(t.getTime())) {
        const s = t.getFullYear(), i = t.getMonth() + 1;
        return s + "-" + ((i < 10 ? "0" : "") + i);
      }
      return "";
    },
    /*
     * Parse date from string
     */
    onChangeNativePicker(e) {
      const t = e.target.value, s = t ? t.split("-") : [];
      if (s.length === 3) {
        const i = parseInt(s[0], 10), a = parseInt(s[1]) - 1, n = parseInt(s[2]);
        this.computedValue = new Date(i, a, n);
      } else
        this.computedValue = null;
    },
    updateInternalState(e) {
      if (this.dateSelected === e)
        return;
      const t = Array.isArray(e), s = t ? e.length ? e[e.length - 1] : this.dateCreator() : e || this.dateCreator();
      (!t || t && this.dateSelected && e.length > this.dateSelected.length) && (this.focusedDateData = {
        day: s.getDate(),
        month: s.getMonth(),
        year: s.getFullYear()
      }), this.dateSelected = e;
    },
    /*
     * Toggle datepicker
     */
    togglePicker(e) {
      if (this.$refs.dropdown) {
        const t = typeof e == "boolean" ? e : !this.$refs.dropdown.isActive;
        t ? this.$refs.dropdown.isActive = t : this.closeOnClick && (this.$refs.dropdown.isActive = t);
      }
    },
    /*
     * Call default onFocus method and show datepicker
     */
    handleOnFocus(e) {
      this.onFocus(e), this.openOnFocus && this.togglePicker(!0);
    },
    /*
     * Toggle dropdown
     */
    toggle() {
      if (this.mobileNative && this.isMobile) {
        const e = this.$refs.input.$refs.input;
        e.focus(), e.click();
        return;
      }
      this.$refs.dropdown.toggle();
    },
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick(e) {
      this.$refs.dropdown.isActive && e.stopPropagation();
    },
    /**
     * Keypress event that is bound to the document.
     */
    keyPress({ key: e }) {
      this.$refs.dropdown && this.$refs.dropdown.isActive && (e === "Escape" || e === "Esc") && this.togglePicker(!1);
    },
    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(e) {
      e || this.onBlur(), this.$emit("active-change", e);
    },
    changeFocus(e) {
      this.focusedDateData = {
        day: e.getDate(),
        month: e.getMonth(),
        year: e.getFullYear()
      };
    }
  },
  created() {
    typeof window < "u" && document.addEventListener("keyup", this.keyPress);
  },
  beforeUnmount() {
    typeof window < "u" && document.removeEventListener("keyup", this.keyPress);
  }
});
const Gh = ["aria-label"], Jh = ["aria-label"], Zh = ["value", "disabled"], Xh = ["value"];
function Qh(e, t, s, i, a, n) {
  const r = w("o-input"), o = w("o-icon"), u = w("o-select"), h = w("o-datepicker-table"), g = w("o-datepicker-month"), R = w("o-dropdown-item"), Q = w("o-dropdown");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [!e.isMobile || e.inline ? (l(), D(Q, N({
      key: 0,
      ref: "dropdown"
    }, e.dropdownBind, {
      position: e.position,
      disabled: e.disabled,
      inline: e.inline,
      "mobile-modal": e.mobileModal,
      "trap-focus": e.trapFocus,
      "aria-role": e.ariaRole,
      "aria-modal": !e.inline,
      "trigger-tabindex": -1,
      "append-to-body": e.appendToBody,
      "append-to-body-copy-parent": "",
      onActiveChange: e.onActiveChange
    }), js({
      default: M(() => [O(R, {
        override: "",
        tag: "div",
        "item-class": e.boxClasses,
        disabled: e.disabled,
        clickable: !1
      }, {
        default: M(() => [v(
          "header",
          {
            class: c(e.headerClasses)
          },
          [b(e.$slots, "header", {}, () => [v(
            "div",
            {
              class: c(e.headerButtonsClasses)
            },
            [G(v("a", {
              class: c(e.prevBtnClasses),
              role: "button",
              href: "#",
              "aria-label": e.ariaPreviousLabel,
              onClick: t[3] || (t[3] = T((...f) => e.prev && e.prev(...f), ["prevent"])),
              onKeydown: [t[4] || (t[4] = U(T((...f) => e.prev && e.prev(...f), ["prevent"]), ["enter"])), t[5] || (t[5] = U(T((...f) => e.prev && e.prev(...f), ["prevent"]), ["space"]))]
            }, [O(o, {
              icon: e.iconPrev,
              pack: e.iconPack,
              both: "",
              clickable: ""
            }, null, 8, ["icon", "pack"])], 42, Gh), [[ee, !e.showPrev && !e.disabled]]), G(v("a", {
              class: c(e.nextBtnClasses),
              role: "button",
              href: "#",
              "aria-label": e.ariaNextLabel,
              onClick: t[6] || (t[6] = T((...f) => e.next && e.next(...f), ["prevent"])),
              onKeydown: [t[7] || (t[7] = U(T((...f) => e.next && e.next(...f), ["prevent"]), ["enter"])), t[8] || (t[8] = U(T((...f) => e.next && e.next(...f), ["prevent"]), ["space"]))]
            }, [O(o, {
              icon: e.iconNext,
              pack: e.iconPack,
              both: "",
              clickable: ""
            }, null, 8, ["icon", "pack"])], 42, Jh), [[ee, !e.showNext && !e.disabled]]), v(
              "div",
              {
                class: c(e.listsClasses)
              },
              [e.isTypeMonth ? y("v-if", !0) : (l(), D(u, N({
                key: 0,
                modelValue: e.focusedDateData.month,
                "onUpdate:modelValue": t[9] || (t[9] = (f) => e.focusedDateData.month = f),
                disabled: e.disabled,
                size: e.size
              }, e.selectListBind), {
                default: M(() => [(l(!0), d(
                  V,
                  null,
                  K(e.listOfMonths, (f) => (l(), d("option", {
                    value: f.index,
                    key: f.name,
                    disabled: f.disabled
                  }, F(f.name), 9, Zh))),
                  128
                  /* KEYED_FRAGMENT */
                ))]),
                _: 1
                /* STABLE */
              }, 16, ["modelValue", "disabled", "size"])), O(u, N({
                modelValue: e.focusedDateData.year,
                "onUpdate:modelValue": t[10] || (t[10] = (f) => e.focusedDateData.year = f),
                disabled: e.disabled,
                size: e.size
              }, e.selectListBind), {
                default: M(() => [(l(!0), d(
                  V,
                  null,
                  K(e.listOfYears, (f) => (l(), d("option", {
                    value: f,
                    key: f
                  }, F(f), 9, Xh))),
                  128
                  /* KEYED_FRAGMENT */
                ))]),
                _: 1
                /* STABLE */
              }, 16, ["modelValue", "disabled", "size"])],
              2
              /* CLASS */
            )],
            2
            /* CLASS */
          )])],
          2
          /* CLASS */
        ), b(e.$slots, "table", {}, () => [e.isTypeMonth ? y("v-if", !0) : (l(), D(h, {
          key: 0,
          modelValue: e.computedValue,
          "onUpdate:modelValue": t[11] || (t[11] = (f) => e.computedValue = f),
          "day-names": e.newDayNames,
          "month-names": e.newMonthNames,
          "first-day-of-week": e.firstDayOfWeek,
          "rules-for-first-week": e.rulesForFirstWeek,
          "min-date": e.minDate,
          "max-date": e.maxDate,
          focused: e.focusedDateData,
          disabled: e.disabled,
          "unselectable-dates": e.unselectableDates,
          "unselectable-days-of-week": e.unselectableDaysOfWeek,
          "selectable-dates": e.selectableDates,
          events: e.events,
          indicators: e.indicators,
          "date-creator": e.dateCreator,
          "type-month": e.isTypeMonth,
          "nearby-month-days": e.nearbyMonthDays,
          "nearby-selectable-month-days": e.nearbySelectableMonthDays,
          "show-week-number": e.showWeekNumber,
          "week-number-clickable": e.weekNumberClickable,
          range: e.range,
          multiple: e.multiple,
          "table-class": e.tableClass,
          "table-head-class": e.tableHeadClass,
          "table-head-cell-class": e.tableHeadCellClass,
          "table-body-class": e.tableBodyClass,
          "table-row-class": e.tableRowClass,
          "table-cell-class": e.tableCellClass,
          "table-cell-selected-class": e.tableCellSelectedClass,
          "table-cell-first-selected-class": e.tableCellFirstSelectedClass,
          "table-cell-invisible-class": e.tableCellInvisibleClass,
          "table-cell-within-selected-class": e.tableCellWithinSelectedClass,
          "table-cell-last-selected-class": e.tableCellLastSelectedClass,
          "table-cell-first-hovered-class": e.tableCellFirstHoveredClass,
          "table-cell-within-hovered-class": e.tableCellWithinHoveredClass,
          "table-cell-last-hovered-class": e.tableCellLastHoveredClass,
          "table-cell-today-class": e.tableCellTodayClass,
          "table-cell-selectable-class": e.tableCellSelectableClass,
          "table-cell-unselectable-class": e.tableCellUnselectableClass,
          "table-cell-nearby-class": e.tableCellNearbyClass,
          "table-cell-events-class": e.tableCellEventsClass,
          "table-events-class": e.tableEventsClass,
          "table-event-variant-class": e.tableEventVariantClass,
          "table-event-class": e.tableEventClass,
          "table-event-indicators-class": e.tableEventIndicatorsClass,
          onRangeStart: t[12] || (t[12] = (f) => e.$emit("range-start", f)),
          onRangeEnd: t[13] || (t[13] = (f) => e.$emit("range-end", f)),
          onClose: t[14] || (t[14] = (f) => e.togglePicker(!1)),
          "onUpdate:focused": t[15] || (t[15] = (f) => e.focusedDateData = f)
        }, null, 8, ["modelValue", "day-names", "month-names", "first-day-of-week", "rules-for-first-week", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "type-month", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "range", "multiple", "table-class", "table-head-class", "table-head-cell-class", "table-body-class", "table-row-class", "table-cell-class", "table-cell-selected-class", "table-cell-first-selected-class", "table-cell-invisible-class", "table-cell-within-selected-class", "table-cell-last-selected-class", "table-cell-first-hovered-class", "table-cell-within-hovered-class", "table-cell-last-hovered-class", "table-cell-today-class", "table-cell-selectable-class", "table-cell-unselectable-class", "table-cell-nearby-class", "table-cell-events-class", "table-events-class", "table-event-variant-class", "table-event-class", "table-event-indicators-class"])), e.isTypeMonth ? (l(), D(g, {
          key: 1,
          modelValue: e.computedValue,
          "onUpdate:modelValue": t[16] || (t[16] = (f) => e.computedValue = f),
          "month-names": e.newMonthNames,
          "min-date": e.minDate,
          "max-date": e.maxDate,
          focused: e.focusedDateData,
          disabled: e.disabled,
          "unselectable-dates": e.unselectableDates,
          "unselectable-days-of-week": e.unselectableDaysOfWeek,
          "selectable-dates": e.selectableDates,
          events: e.events,
          indicators: e.indicators,
          "date-creator": e.dateCreator,
          range: e.range,
          multiple: e.multiple,
          "month-class": e.monthClass,
          "month-body-class": e.monthBodyClass,
          "month-table-class": e.monthTableClass,
          "month-cell-class": e.monthCellClass,
          "month-cell-selected-class": e.monthCellSelectedClass,
          "month-cell-first-selected-class": e.monthCellFirstSelectedClass,
          "month-cell-within-selected-class": e.monthCellWithinSelectedClass,
          "month-cell-last-selected-class": e.monthCellLastSelectedClass,
          "month-cell-within-hovered-range-class": e.monthCellWithinHoveredRangeClass,
          "month-cell-first-hovered-class": e.monthCellFirstHoveredClass,
          "month-cell-within-hovered-class": e.monthCellWithinHoveredClass,
          "month-cell-last-hovered-class": e.monthCellLastHoveredClass,
          "month-cell-today-class": e.monthCellTodayClass,
          "month-cell-selectable-class": e.monthCellSelectableClass,
          "month-cell-unselectable-class": e.monthCellUnselectableClass,
          "month-cell-events-class": e.monthCellEventsClass,
          onRangeStart: t[17] || (t[17] = (f) => e.$emit("range-start", f)),
          onRangeEnd: t[18] || (t[18] = (f) => e.$emit("range-end", f)),
          onClose: t[19] || (t[19] = (f) => e.togglePicker(!1)),
          onChangeFocus: e.changeFocus,
          "onUpdate:focused": t[20] || (t[20] = (f) => e.focusedDateData = f)
        }, null, 8, ["modelValue", "month-names", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "range", "multiple", "month-class", "month-body-class", "month-table-class", "month-cell-class", "month-cell-selected-class", "month-cell-first-selected-class", "month-cell-within-selected-class", "month-cell-last-selected-class", "month-cell-within-hovered-range-class", "month-cell-first-hovered-class", "month-cell-within-hovered-class", "month-cell-last-hovered-class", "month-cell-today-class", "month-cell-selectable-class", "month-cell-unselectable-class", "month-cell-events-class", "onChangeFocus"])) : y("v-if", !0)]), e.$slots.footer !== void 0 ? (l(), d(
          "footer",
          {
            key: 0,
            class: c(e.footerClasses)
          },
          [b(e.$slots, "footer")],
          2
          /* CLASS */
        )) : y("v-if", !0)]),
        _: 3
        /* FORWARDED */
      }, 8, ["item-class", "disabled"])]),
      _: 2
      /* DYNAMIC */
    }, [e.inline ? void 0 : {
      name: "trigger",
      fn: M(() => [b(e.$slots, "trigger", {}, () => [O(r, N({
        ref: "input",
        autocomplete: "off",
        "model-value": e.formattedValue,
        expanded: e.expanded,
        placeholder: e.placeholder,
        size: e.size,
        icon: e.icon,
        "icon-right": e.iconRight,
        "icon-right-clickable": e.iconRightClickable,
        "icon-pack": e.iconPack,
        rounded: e.rounded,
        disabled: e.disabled,
        readonly: !e.editable
      }, e.inputBind, {
        "use-html5-validation": !1,
        onClick: e.onInputClick,
        onIconRightClick: t[0] || (t[0] = (f) => e.$emit("icon-right-click")),
        onKeyup: t[1] || (t[1] = U((f) => e.togglePicker(!0), ["enter"])),
        onChange: t[2] || (t[2] = (f) => e.onChange(f.target.value)),
        onFocus: e.handleOnFocus
      }), null, 16, ["model-value", "expanded", "placeholder", "size", "icon", "icon-right", "icon-right-clickable", "icon-pack", "rounded", "disabled", "readonly", "onClick", "onFocus"])])]),
      key: "0"
    }]), 1040, ["position", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "aria-modal", "append-to-body", "onActiveChange"])) : (l(), D(r, N({
      key: 1,
      ref: "input",
      type: e.isTypeMonth ? "month" : "date",
      autocomplete: "off",
      value: e.formatNative(e.computedValue),
      placeholder: e.placeholder,
      size: e.size,
      icon: e.icon,
      "icon-pack": e.iconPack,
      rounded: e.rounded,
      max: e.formatNative(e.maxDate),
      min: e.formatNative(e.minDate),
      disabled: e.disabled,
      readonly: !1
    }, e.$attrs, {
      "use-html5-validation": !1,
      onChange: e.onChangeNativePicker,
      onFocus: e.onFocus,
      onBlur: e.onBlur,
      onInvalid: e.onInvalid
    }), null, 16, ["type", "value", "placeholder", "size", "icon", "icon-pack", "rounded", "max", "min", "disabled", "onChange", "onFocus", "onBlur", "onInvalid"]))],
    2
    /* CLASS */
  );
}
At.render = Qh;
At.__file = "src/components/datepicker/Datepicker.vue";
var xh = {
  install(e) {
    H(e, At);
  }
};
const jt = "AM", Ut = "PM", Gi = "24", qt = "12", ec = (e, t) => t.dtf.format(e), tc = (e, t) => {
  if (e) {
    let s = null;
    if (t.computedValue && !isNaN(t.computedValue) ? s = new Date(t.computedValue) : (s = t.timeCreator(), s.setMilliseconds(0)), t.dtf.formatToParts && typeof t.dtf.formatToParts == "function") {
      const u = t.dtf.formatToParts(s).map((g) => g.type === "literal" ? g.value.replace(/ /g, "\\s?") : g.type === "dayPeriod" ? `((?!=<${g.type}>)(${t.amString}|${t.pmString}|${jt}|${Ut}|${jt.toLowerCase()}|${Ut.toLowerCase()})?)` : `((?!=<${g.type}>)\\d+)`).join(""), h = mi(u, e);
      if (h.hour = h.hour ? parseInt(h.hour, 10) : null, h.minute = h.minute ? parseInt(h.minute, 10) : null, h.second = h.second ? parseInt(h.second, 10) : null, h.hour && h.hour >= 0 && h.hour < 24 && h.minute && h.minute >= 0 && h.minute < 59)
        return h.dayPeriod && (h.dayPeriod.toLowerCase() === t.pmString.toLowerCase() || h.dayPeriod.toLowerCase() === Ut.toLowerCase()) && h.hour < 12 && (h.hour += 12), s.setHours(h.hour), s.setMinutes(h.minute), s.setSeconds(h.second || 0), s;
    }
    let i = !1;
    if (t.hourFormat === qt) {
      const u = e.split(" ");
      e = u[0], i = u[1] === t.amString || u[1] === jt;
    }
    const a = e.split(":");
    let n = parseInt(a[0], 10);
    const r = parseInt(a[1], 10), o = t.enableSeconds ? parseInt(a[2], 10) : 0;
    return isNaN(n) || n < 0 || n > 23 || t.hourFormat === qt && (n < 1 || n > 12) || isNaN(r) || r < 0 || r > 59 ? null : (s.setSeconds(o), s.setMinutes(r), t.hourFormat === qt && (i && n === 12 ? n = 0 : !i && n !== 12 && (n += 12)), s.setHours(n), new Date(s.getTime()));
  }
  return null;
};
var sc = $({
  mixins: [Ke],
  inheritAttrs: !1,
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: Date,
    inline: Boolean,
    minTime: Date,
    maxTime: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    hourFormat: {
      type: String
    },
    incrementHours: {
      type: Number,
      default: 1
    },
    incrementMinutes: {
      type: Number,
      default: 1
    },
    incrementSeconds: {
      type: Number,
      default: 1
    },
    timeFormatter: {
      type: Function,
      default: (e, t) => {
        const s = m(p(), "timepicker.timeFormatter", void 0);
        return typeof s == "function" ? s(e) : ec(e, t);
      }
    },
    timeParser: {
      type: Function,
      default: (e, t) => {
        const s = m(p(), "timepicker.timeParser", void 0);
        return typeof s == "function" ? s(e) : tc(e, t);
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => m(p(), "timepicker.mobileNative", !0)
    },
    timeCreator: {
      type: Function,
      default: () => {
        const e = m(p(), "timepicker.timeCreator", void 0);
        return typeof e == "function" ? e() : /* @__PURE__ */ new Date();
      }
    },
    position: String,
    unselectableTimes: Array,
    openOnFocus: Boolean,
    enableSeconds: Boolean,
    defaultMinutes: Number,
    defaultSeconds: Number,
    appendToBody: Boolean,
    resetOnMeridianChange: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      dateSelected: this.modelValue,
      hoursSelected: null,
      minutesSelected: null,
      secondsSelected: null,
      meridienSelected: null,
      _elementRef: "input"
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(e) {
        this.dateSelected = e, this.$emit("update:modelValue", this.dateSelected);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds ? this.localeOptions.second || "numeric" : void 0,
        // @ts-ignore to update types
        hourCycle: this.isHourFormat24 ? "h23" : "h12"
      });
    },
    newHourFormat() {
      return this.hourFormat || (this.localeOptions.hour12 ? qt : Gi);
    },
    sampleTime() {
      let e = this.timeCreator();
      return e.setHours(10), e.setSeconds(0), e.setMinutes(0), e.setMilliseconds(0), e;
    },
    hourLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts == "function") {
        let e = this.sampleTime;
        const t = this.dtf.formatToParts(e), s = t.find((i, a) => a > 0 && t[a - 1].type === "hour");
        if (s)
          return s.value;
      }
      return ":";
    },
    minuteLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts == "function") {
        let e = this.sampleTime;
        const t = this.dtf.formatToParts(e), s = t.find((i, a) => a > 0 && t[a - 1].type === "minute");
        if (s)
          return s.value;
      }
      return ":";
    },
    secondLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts == "function") {
        let e = this.sampleTime;
        const t = this.dtf.formatToParts(e), s = t.find((i, a) => a > 0 && t[a - 1].type === "second");
        if (s)
          return s.value;
      }
    },
    amString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts == "function") {
        let e = this.sampleTime;
        e.setHours(10);
        const t = this.dtf.formatToParts(e).find((s) => s.type === "dayPeriod");
        if (t)
          return t.value;
      }
      return jt;
    },
    pmString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts == "function") {
        let e = this.sampleTime;
        e.setHours(20);
        const t = this.dtf.formatToParts(e).find((s) => s.type === "dayPeriod");
        if (t)
          return t.value;
      }
      return Ut;
    },
    hours() {
      if (!this.incrementHours || this.incrementHours < 1)
        throw new Error("Hour increment cannot be null or less than 1.");
      const e = [], t = this.isHourFormat24 ? 24 : 12;
      for (let s = 0; s < t; s += this.incrementHours) {
        let i = s, a = i;
        this.isHourFormat24 || (i = s + 1, a = i, this.meridienSelected === this.amString ? i === 12 && (i = 0) : this.meridienSelected === this.pmString && i !== 12 && (i += 12)), e.push({
          label: this.formatNumber(a),
          value: i
        });
      }
      return e;
    },
    minutes() {
      if (!this.incrementMinutes || this.incrementMinutes < 1)
        throw new Error("Minute increment cannot be null or less than 1.");
      const e = [];
      for (let t = 0; t < 60; t += this.incrementMinutes)
        e.push({
          label: this.formatNumber(t, !0),
          value: t
        });
      return e;
    },
    seconds() {
      if (!this.incrementSeconds || this.incrementSeconds < 1)
        throw new Error("Second increment cannot be null or less than 1.");
      const e = [];
      for (let t = 0; t < 60; t += this.incrementSeconds)
        e.push({
          label: this.formatNumber(t, !0),
          value: t
        });
      return e;
    },
    meridiens() {
      return [this.amString, this.pmString];
    },
    isMobile() {
      return this.mobileNative && ze.any();
    },
    isHourFormat24() {
      return this.newHourFormat === Gi;
    }
  },
  watch: {
    hourFormat() {
      this.hoursSelected !== null && (this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString);
    },
    locale() {
      this.value || (this.meridienSelected = this.amString);
    },
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue: {
      handler(e) {
        this.updateInternalState(e), !this.isValid && this.$refs.input.checkHtml5Validity();
      },
      immediate: !0
    }
  },
  methods: {
    onMeridienChange(e) {
      this.hoursSelected !== null && this.resetOnMeridianChange ? (this.hoursSelected = null, this.minutesSelected = null, this.secondsSelected = null, this.computedValue = null) : this.hoursSelected !== null && (e === this.pmString ? this.hoursSelected += 12 : e === this.amString && (this.hoursSelected -= 12)), this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, e);
    },
    onHoursChange(e) {
      !this.minutesSelected && typeof this.defaultMinutes < "u" && (this.minutesSelected = this.defaultMinutes), !this.secondsSelected && typeof this.defaultSeconds < "u" && (this.secondsSelected = this.defaultSeconds), this.updateDateSelected(parseInt(e, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },
    onMinutesChange(e) {
      !this.secondsSelected && this.defaultSeconds && (this.secondsSelected = this.defaultSeconds), this.updateDateSelected(this.hoursSelected, parseInt(e, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },
    onSecondsChange(e) {
      this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(e, 10), this.meridienSelected);
    },
    updateDateSelected(e, t, s, i) {
      if (e != null && t != null && (!this.isHourFormat24 && i !== null || this.isHourFormat24)) {
        let a = null;
        this.computedValue && !isNaN(this.computedValue) ? a = new Date(this.computedValue) : (a = this.timeCreator(), a.setMilliseconds(0)), a.setHours(e), a.setMinutes(t), a.setSeconds(s), isNaN(a.getTime()) || (this.computedValue = new Date(a.getTime()));
      }
    },
    updateInternalState(e) {
      e ? (this.hoursSelected = e.getHours(), this.minutesSelected = e.getMinutes(), this.secondsSelected = e.getSeconds(), this.meridienSelected = e.getHours() >= 12 ? this.pmString : this.amString) : (this.hoursSelected = null, this.minutesSelected = null, this.secondsSelected = null, this.meridienSelected = this.amString), this.dateSelected = e;
    },
    isHourDisabled(e) {
      let t = !1;
      if (this.minTime) {
        const s = this.minTime.getHours(), i = this.minutes.every((a) => this.isMinuteDisabledForHour(e, a.value));
        t = e < s || i;
      }
      if (this.maxTime && !t) {
        const s = this.maxTime.getHours();
        t = e > s;
      }
      return this.unselectableTimes && (t || (this.unselectableTimes.filter((i) => this.enableSeconds && this.secondsSelected !== null ? i.getHours() === e && i.getMinutes() === this.minutesSelected && i.getSeconds() === this.secondsSelected : this.minutesSelected !== null ? i.getHours() === e && i.getMinutes() === this.minutesSelected : !1).length > 0 ? t = !0 : t = this.minutes.every((i) => this.unselectableTimes.filter((a) => a.getHours() === e && a.getMinutes() === i.value).length > 0))), t;
    },
    isMinuteDisabledForHour(e, t) {
      let s = !1;
      if (this.minTime) {
        const i = this.minTime.getHours(), a = this.minTime.getMinutes();
        s = e === i && t < a;
      }
      if (this.maxTime && !s) {
        const i = this.maxTime.getHours(), a = this.maxTime.getMinutes();
        s = e === i && t > a;
      }
      return s;
    },
    isMinuteDisabled(e) {
      let t = !1;
      return this.hoursSelected !== null && (this.isHourDisabled(this.hoursSelected) ? t = !0 : t = this.isMinuteDisabledForHour(this.hoursSelected, e), this.unselectableTimes && (t || (t = this.unselectableTimes.filter((i) => this.enableSeconds && this.secondsSelected !== null ? i.getHours() === this.hoursSelected && i.getMinutes() === e && i.getSeconds() === this.secondsSelected : i.getHours() === this.hoursSelected && i.getMinutes() === e).length > 0))), t;
    },
    isSecondDisabled(e) {
      let t = !1;
      if (this.minutesSelected !== null) {
        if (this.isMinuteDisabled(this.minutesSelected))
          t = !0;
        else {
          if (this.minTime) {
            const s = this.minTime.getHours(), i = this.minTime.getMinutes(), a = this.minTime.getSeconds();
            t = this.hoursSelected === s && this.minutesSelected === i && e < a;
          }
          if (this.maxTime && !t) {
            const s = this.maxTime.getHours(), i = this.maxTime.getMinutes(), a = this.maxTime.getSeconds();
            t = this.hoursSelected === s && this.minutesSelected === i && e > a;
          }
        }
        this.unselectableTimes && (t || (t = this.unselectableTimes.filter((i) => i.getHours() === this.hoursSelected && i.getMinutes() === this.minutesSelected && i.getSeconds() === e).length > 0));
      }
      return t;
    },
    isMeridienDisabled(e) {
      const t = e == "AM" ? 0 : 12;
      for (let s = 0; s < 12; s++)
        if (!this.isHourDisabled(s + t))
          return !1;
      return !0;
    },
    /*
     * Parse string into date
     */
    onChange(e) {
      const t = this.timeParser(e, this);
      this.updateInternalState(t), t && !isNaN(t) ? this.computedValue = t : (this.computedValue = null, this.$refs.input.newValue = this.computedValue);
    },
    /*
     * Toggle timepicker
     */
    toggle(e) {
      this.$refs.dropdown && (this.$refs.dropdown.isActive = typeof e == "boolean" ? e : !this.$refs.dropdown.isActive);
    },
    /*
     * Close timepicker
     */
    close() {
      this.toggle(!1);
    },
    /*
     * Call default onFocus method and show timepicker
     */
    handleOnFocus() {
      this.onFocus(), this.openOnFocus && this.toggle(!0);
    },
    /*
     * Format date into string 'HH-MM-SS'
     */
    formatHHMMSS(e) {
      const t = new Date(e);
      if (e && !isNaN(t.getTime())) {
        const s = t.getHours(), i = t.getMinutes(), a = t.getSeconds();
        return this.formatNumber(s, !0) + ":" + this.formatNumber(i, !0) + ":" + this.formatNumber(a, !0);
      }
      return "";
    },
    /*
     * Parse time from string
     */
    onChangeNativePicker(e) {
      const t = e.target.value;
      if (t) {
        let s = null;
        this.computedValue && !isNaN(this.computedValue) ? s = new Date(this.computedValue) : (s = /* @__PURE__ */ new Date(), s.setMilliseconds(0));
        const i = t.split(":");
        s.setHours(parseInt(i[0], 10)), s.setMinutes(parseInt(i[1], 10)), s.setSeconds(i[2] ? parseInt(i[2], 10) : 0), this.computedValue = new Date(s.getTime());
      } else
        this.computedValue = null;
    },
    formatNumber(e, t) {
      return this.isHourFormat24 || t ? this.pad(e) : e;
    },
    pad(e) {
      return (e < 10 ? "0" : "") + e;
    },
    /*
     * Format date into string
     */
    formatValue(e) {
      return e && !isNaN(e) ? this.timeFormatter(e, this) : null;
    },
    /**
     * Keypress event that is bound to the document.
     */
    keyPress({ key: e }) {
      this.$refs.dropdown && this.$refs.dropdown.isActive && (e === "Escape" || e === "Esc") && this.toggle(!1);
    },
    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(e) {
      e || this.onBlur();
    }
  },
  created() {
    typeof window < "u" && document.addEventListener("keyup", this.keyPress);
  },
  beforeUnmount() {
    typeof window < "u" && document.removeEventListener("keyup", this.keyPress);
  }
}), Mt = $({
  name: "OTimepicker",
  components: {
    [we.name]: we,
    [Le.name]: Le,
    [z.name]: z,
    [xe.name]: xe,
    [et.name]: et
  },
  configField: "timepicker",
  mixins: [L, sc, He],
  inheritAttrs: !1,
  props: {
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    boxClass: [String, Function, Array],
    separatorClass: [String, Function, Array],
    footerClass: [String, Function, Array],
    inputClasses: {
      type: Object,
      default: () => m(p(), "timepicker.inputClasses", {})
    },
    dropdownClasses: {
      type: Object,
      default: () => m(p(), "timepicker.dropdownClasses", {})
    },
    selectClasses: {
      type: Object,
      default: () => m(p(), "timepicker.selectClasses", {})
    }
  },
  emits: ["focus", "blur", "invalid"],
  computed: {
    inputBind() {
      return {
        ...this.$attrs,
        ...this.inputClasses
      };
    },
    dropdownBind() {
      return {
        "root-class": this.computedClass("dropdownClasses.rootClass", "o-tpck__dropdown"),
        ...this.dropdownClasses
      };
    },
    selectBind() {
      return {
        "select-class": this.computedClass("selectClasses.selectClass", "o-tpck__select"),
        "placeholder-class": this.computedClass("selectClasses.placeholderClass", "o-tpck__select-placeholder"),
        ...this.selectClasses
      };
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-tpck"),
        { [this.computedClass("sizeClass", "o-tpck--", this.size)]: this.size },
        { [this.computedClass("mobileClass", "o-tpck--mobile")]: this.isMatchMedia }
      ];
    },
    boxClasses() {
      return [
        this.computedClass("boxClass", "o-tpck__box")
      ];
    },
    separatorClasses() {
      return [
        this.computedClass("separatorClass", "o-tpck__separator")
      ];
    },
    footerClasses() {
      return [
        this.computedClass("footerClass", "o-tpck__footer")
      ];
    },
    nativeStep() {
      return this.enableSeconds ? "1" : null;
    }
  }
});
const ic = ["value", "disabled"], ac = ["value", "disabled"], nc = ["value", "disabled"], rc = ["value", "disabled"];
function oc(e, t, s, i, a, n) {
  const r = w("o-input"), o = w("o-select"), u = w("o-dropdown-item"), h = w("o-dropdown");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [!e.isMobile || e.inline ? (l(), D(h, N({
      key: 0,
      ref: "dropdown"
    }, e.dropdownBind, {
      position: e.position,
      disabled: e.disabled,
      inline: e.inline,
      "append-to-body": e.appendToBody,
      "append-to-body-copy-parent": "",
      onActiveChange: e.onActiveChange
    }), js({
      default: M(() => [O(u, {
        override: "",
        tag: "div",
        "item-class": e.boxClasses,
        disabled: e.disabled,
        clickable: !1
      }, {
        default: M(() => [O(o, N({
          override: ""
        }, e.selectBind, {
          modelValue: e.hoursSelected,
          "onUpdate:modelValue": t[2] || (t[2] = (g) => e.hoursSelected = g),
          onChange: t[3] || (t[3] = (g) => e.onHoursChange(g.target.value)),
          disabled: e.disabled,
          placeholder: "00"
        }), {
          default: M(() => [(l(!0), d(
            V,
            null,
            K(e.hours, (g) => (l(), d("option", {
              value: g.value,
              key: g.value,
              disabled: e.isHourDisabled(g.value)
            }, F(g.label), 9, ic))),
            128
            /* KEYED_FRAGMENT */
          ))]),
          _: 1
          /* STABLE */
        }, 16, ["modelValue", "disabled"]), v(
          "span",
          {
            class: c(e.separatorClasses)
          },
          F(e.hourLiteral),
          3
          /* TEXT, CLASS */
        ), O(o, N({
          override: ""
        }, e.selectBind, {
          modelValue: e.minutesSelected,
          "onUpdate:modelValue": t[4] || (t[4] = (g) => e.minutesSelected = g),
          onChange: t[5] || (t[5] = (g) => e.onMinutesChange(g.target.value)),
          disabled: e.disabled,
          placeholder: "00"
        }), {
          default: M(() => [(l(!0), d(
            V,
            null,
            K(e.minutes, (g) => (l(), d("option", {
              value: g.value,
              key: g.value,
              disabled: e.isMinuteDisabled(g.value)
            }, F(g.label), 9, ac))),
            128
            /* KEYED_FRAGMENT */
          ))]),
          _: 1
          /* STABLE */
        }, 16, ["modelValue", "disabled"]), e.enableSeconds ? (l(), d(
          V,
          {
            key: 0
          },
          [v(
            "span",
            {
              class: c(e.separatorClasses)
            },
            F(e.minuteLiteral),
            3
            /* TEXT, CLASS */
          ), O(o, N({
            override: ""
          }, e.selectBind, {
            modelValue: e.secondsSelected,
            "onUpdate:modelValue": t[6] || (t[6] = (g) => e.secondsSelected = g),
            onChange: t[7] || (t[7] = (g) => e.onSecondsChange(g.target.value)),
            disabled: e.disabled,
            placeholder: "00"
          }), {
            default: M(() => [(l(!0), d(
              V,
              null,
              K(e.seconds, (g) => (l(), d("option", {
                value: g.value,
                key: g.value,
                disabled: e.isSecondDisabled(g.value)
              }, F(g.label), 9, nc))),
              128
              /* KEYED_FRAGMENT */
            ))]),
            _: 1
            /* STABLE */
          }, 16, ["modelValue", "disabled"]), v(
            "span",
            {
              class: c(e.separatorClasses)
            },
            F(e.secondLiteral),
            3
            /* TEXT, CLASS */
          )],
          64
          /* STABLE_FRAGMENT */
        )) : y("v-if", !0), e.isHourFormat24 ? y("v-if", !0) : (l(), D(o, N({
          key: 1,
          override: ""
        }, e.selectBind, {
          modelValue: e.meridienSelected,
          "onUpdate:modelValue": t[8] || (t[8] = (g) => e.meridienSelected = g),
          onChange: t[9] || (t[9] = (g) => e.onMeridienChange(g.target.value)),
          disabled: e.disabled
        }), {
          default: M(() => [(l(!0), d(
            V,
            null,
            K(e.meridiens, (g) => (l(), d("option", {
              value: g,
              key: g,
              disabled: e.isMeridienDisabled(g)
            }, F(g), 9, rc))),
            128
            /* KEYED_FRAGMENT */
          ))]),
          _: 1
          /* STABLE */
        }, 16, ["modelValue", "disabled"])), e.$slots.default !== void 0 ? (l(), d(
          "footer",
          {
            key: 2,
            class: c(e.footerClasses)
          },
          [b(e.$slots, "default")],
          2
          /* CLASS */
        )) : y("v-if", !0)]),
        _: 3
        /* FORWARDED */
      }, 8, ["item-class", "disabled"])]),
      _: 2
      /* DYNAMIC */
    }, [e.inline ? void 0 : {
      name: "trigger",
      fn: M(() => [b(e.$slots, "trigger", {}, () => [O(r, N({
        ref: "input",
        "model-value": e.formatValue(e.computedValue),
        autocomplete: "off",
        placeholder: e.placeholder,
        size: e.size,
        icon: e.icon,
        "icon-pack": e.iconPack,
        disabled: e.disabled,
        readonly: !e.editable,
        rounded: e.rounded
      }, e.inputBind, {
        "use-html5-validation": e.useHtml5Validation,
        onKeyup: t[0] || (t[0] = U((g) => e.toggle(!0), ["enter"])),
        onChange: t[1] || (t[1] = (g) => e.onChange(g.target.value)),
        onFocus: e.handleOnFocus
      }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])])]),
      key: "0"
    }]), 1040, ["position", "disabled", "inline", "append-to-body", "onActiveChange"])) : (l(), D(r, N({
      key: 1,
      ref: "input"
    }, e.inputBind, {
      type: "time",
      step: e.nativeStep,
      autocomplete: "off",
      value: e.formatHHMMSS(e.computedValue),
      placeholder: e.placeholder,
      size: e.size,
      icon: e.icon,
      "icon-pack": e.iconPack,
      rounded: e.rounded,
      max: e.formatHHMMSS(e.maxTime),
      min: e.formatHHMMSS(e.minTime),
      disabled: e.disabled,
      readonly: !1,
      "use-html5-validation": e.useHtml5Validation,
      onChange: t[10] || (t[10] = (g) => e.onChange(g.target.value)),
      onFocus: e.handleOnFocus,
      onBlur: e.onBlur,
      onInvalid: e.onInvalid
    }), null, 16, ["step", "value", "placeholder", "size", "icon", "icon-pack", "rounded", "max", "min", "disabled", "use-html5-validation", "onFocus", "onBlur", "onInvalid"]))],
    2
    /* CLASS */
  );
}
Mt.render = oc;
Mt.__file = "src/components/timepicker/Timepicker.vue";
const Ji = "AM", Zi = "PM";
var yi = $({
  name: "ODatetimepicker",
  components: {
    [At.name]: At,
    [Mt.name]: Mt
  },
  configField: "datetimepicker",
  mixins: [Ke, L],
  inheritAttrs: !1,
  emits: ["update:modelValue", "focus", "blur", "invalid", "change-year", "change-month", "icon-right-click", "active-change"],
  props: {
    modelValue: {
      type: Date
    },
    editable: {
      type: Boolean,
      default: !1
    },
    size: String,
    placeholder: String,
    disabled: Boolean,
    iconRight: String,
    iconRightClickable: Boolean,
    inline: Boolean,
    openOnFocus: Boolean,
    position: String,
    mobileNative: {
      type: Boolean,
      default: !0
    },
    minDatetime: Date,
    maxDatetime: Date,
    datetimeFormatter: {
      type: Function
    },
    datetimeParser: {
      type: Function
    },
    datetimeCreator: {
      type: Function,
      default: (e) => {
        const t = m(p(), "datetimepicker.datetimeCreator", void 0);
        return typeof t == "function" ? t(e) : e;
      }
    },
    datepicker: Object,
    timepicker: Object,
    locale: {
      type: [String, Array],
      default: () => m(p(), "locale")
    },
    appendToBody: Boolean,
    datepickerWrapperClass: [String, Function, Array],
    timepickerWrapperClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue
    };
  },
  computed: {
    datepickerWrapperClasses() {
      return [
        this.computedClass("datepickerWrapperClass", "o-dtpck__date")
      ];
    },
    timepickerWrapperClasses() {
      return [
        this.computedClass("timepickerWrapperClass", "o-dtpck__time")
      ];
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(e) {
        if (e) {
          let t = new Date(e.getTime());
          this.newValue ? (e.getDate() !== this.newValue.getDate() || e.getMonth() !== this.newValue.getMonth() || e.getFullYear() !== this.newValue.getFullYear()) && e.getHours() === 0 && e.getMinutes() === 0 && e.getSeconds() === 0 && t.setHours(this.newValue.getHours(), this.newValue.getMinutes(), this.newValue.getSeconds(), 0) : t = this.datetimeCreator(e), this.minDatetime && t < this.minDatetime ? t = this.minDatetime : this.maxDatetime && t > this.maxDatetime && (t = this.maxDatetime), this.newValue = new Date(t.getTime());
        } else
          this.newValue = e;
        this.$emit("update:modelValue", this.newValue);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds() ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "numeric",
        day: this.localeOptions.day || "numeric",
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds() ? this.localeOptions.second || "numeric" : void 0,
        // @ts-ignore to update types
        hourCycle: this.isHourFormat24() ? "h23" : "h12"
      });
    },
    isMobileNative() {
      return this.mobileNative;
    },
    isMobile() {
      return this.isMobileNative && ze.any();
    },
    minDate() {
      return this.minDatetime ? new Date(this.minDatetime.getFullYear(), this.minDatetime.getMonth(), this.minDatetime.getDate(), 0, 0, 0, 0) : this.datepicker ? this.datepicker.minDate : null;
    },
    maxDate() {
      return this.maxDatetime ? new Date(this.maxDatetime.getFullYear(), this.maxDatetime.getMonth(), this.maxDatetime.getDate(), 0, 0, 0, 0) : this.datepicker ? this.datepicker.maxDate : null;
    },
    // Only enable min/max time if local (not necessarily UTC) date portion matches
    minTime() {
      return !this.minDatetime || this.newValue === null || typeof this.newValue > "u" || this.newValue.getFullYear() != this.minDatetime.getFullYear() || this.newValue.getMonth() != this.minDatetime.getMonth() || this.newValue.getDate() != this.minDatetime.getDate() ? this.timepicker ? this.timepicker.minTime : null : this.minDatetime;
    },
    maxTime() {
      return !this.maxDatetime || this.newValue === null || typeof this.newValue > "u" || this.newValue.getFullYear() != this.maxDatetime.getFullYear() || this.newValue.getMonth() != this.maxDatetime.getMonth() || this.newValue.getDate() != this.maxDatetime.getDate() ? this.timepicker ? this.timepicker.maxTime : null : this.maxDatetime;
    },
    datepickerSize() {
      return this.datepicker && this.datepicker.size ? this.datepicker.size : this.size;
    },
    timepickerSize() {
      return this.timepicker && this.timepicker.size ? this.timepicker.size : this.size;
    },
    timepickerDisabled() {
      return this.timepicker && this.timepicker.disabled ? this.timepicker.disabled : this.disabled;
    }
  },
  watch: {
    modelValue(e) {
      this.newValue = e;
    }
  },
  methods: {
    enableSeconds() {
      return this.$refs.timepicker ? this.$refs.timepicker.enableSeconds : !1;
    },
    isHourFormat24() {
      return this.$refs.timepicker ? this.$refs.timepicker.isHourFormat24 : !this.localeOptions.hour12;
    },
    defaultDatetimeParser(e) {
      const t = m(p(), "datetimepicker.datetimeParser", void 0);
      if (typeof this.datetimeParser == "function")
        return this.datetimeParser(e);
      if (typeof t == "function")
        return t(e);
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts == "function") {
        let s = [Ji, Zi, Ji.toLowerCase(), Zi.toLowerCase()];
        this.$refs.timepicker && (s.push(this.$refs.timepicker.amString), s.push(this.$refs.timepicker.pmString));
        const i = this.dtf.formatToParts(/* @__PURE__ */ new Date()), a = i.map((r, o) => r.type === "literal" ? o + 1 < i.length && i[o + 1].type === "hour" ? "[^\\d]+" : r.value.replace(/ /g, "\\s?") : r.type === "dayPeriod" ? `((?!=<${r.type}>)(${s.join("|")})?)` : `((?!=<${r.type}>)\\d+)`).join(""), n = mi(a, e);
        if (n.year && n.year.length === 4 && n.month && n.month <= 12 && n.day && n.day <= 31 && n.hour && n.hour >= 0 && n.hour < 24 && n.minute && n.minute >= 0 && n.minute <= 59)
          return new Date(n.year, n.month - 1, n.day, n.hour, n.minute, n.second || 0);
      }
      return new Date(Date.parse(e));
    },
    defaultDatetimeFormatter(e) {
      const t = m(p(), "datetimepicker.datetimeFormatter", void 0);
      return typeof this.datetimeFormatter == "function" ? this.datetimeFormatter(e) : typeof t == "function" ? t(e) : this.dtf.format(e);
    },
    /*
    * Parse date from string
    */
    onChangeNativePicker(e) {
      const t = e.target.value, s = t ? t.split(/\D/) : [];
      if (s.length >= 5) {
        const i = parseInt(s[0], 10), a = parseInt(s[1], 10) - 1, n = parseInt(s[2], 10), r = parseInt(s[3], 10), o = parseInt(s[4], 10);
        this.computedValue = new Date(i, a, n, r, o);
      } else
        this.computedValue = null;
    },
    formatNative(e) {
      const t = new Date(e);
      if (e && !isNaN(t.getTime())) {
        const s = t.getFullYear(), i = t.getMonth() + 1, a = t.getDate(), n = t.getHours(), r = t.getMinutes(), o = t.getSeconds();
        return s + "-" + ((i < 10 ? "0" : "") + i) + "-" + ((a < 10 ? "0" : "") + a) + "T" + ((n < 10 ? "0" : "") + n) + ":" + ((r < 10 ? "0" : "") + r) + ":" + ((o < 10 ? "0" : "") + o);
      }
      return "";
    },
    toggle() {
      this.$refs.datepicker.toggle();
    }
  },
  mounted() {
    (!this.isMobile || this.inline) && this.newValue && this.$refs.datepicker.$forceUpdate();
  }
});
function lc(e, t, s, i, a, n) {
  const r = w("o-timepicker"), o = w("o-datepicker"), u = w("o-input");
  return !e.isMobile || e.inline ? (l(), D(o, N({
    key: 0,
    ref: "datepicker",
    modelValue: e.computedValue,
    "onUpdate:modelValue": t[1] || (t[1] = (h) => e.computedValue = h)
  }, e.datepicker, {
    class: e.datepickerWrapperClasses,
    rounded: e.rounded,
    "open-on-focus": e.openOnFocus,
    position: e.position,
    inline: e.inline,
    editable: e.editable,
    expanded: e.expanded,
    "close-on-click": !1,
    "date-formatter": e.defaultDatetimeFormatter,
    "date-parser": e.defaultDatetimeParser,
    "min-date": e.minDate,
    "max-date": e.maxDate,
    icon: e.icon,
    "icon-right": e.iconRight,
    "icon-right-clickable": e.iconRightClickable,
    "icon-pack": e.iconPack,
    size: e.datepickerSize,
    placeholder: e.placeholder,
    range: !1,
    disabled: e.disabled,
    "mobile-native": e.isMobileNative,
    locale: e.locale,
    "append-to-body": e.appendToBody,
    onFocus: e.onFocus,
    onBlur: e.onBlur,
    onActiveChange: t[2] || (t[2] = (h) => e.$emit("active-change", h)),
    onIconRightClick: t[3] || (t[3] = (h) => e.$emit("icon-right-click")),
    onChangeMonth: t[4] || (t[4] = (h) => e.$emit("change-month", h)),
    onChangeYear: t[5] || (t[5] = (h) => e.$emit("change-year", h))
  }), {
    footer: M(() => [v(
      "div",
      {
        class: c(e.timepickerWrapperClasses)
      },
      [O(r, N({
        ref: "timepicker"
      }, e.timepicker, {
        modelValue: e.computedValue,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => e.computedValue = h),
        inline: "",
        editable: e.editable,
        "min-time": e.minTime,
        "max-time": e.maxTime,
        size: e.timepickerSize,
        disabled: e.timepickerDisabled,
        "mobile-native": e.isMobileNative,
        locale: e.locale
      }), null, 16, ["modelValue", "editable", "min-time", "max-time", "size", "disabled", "mobile-native", "locale"])],
      2
      /* CLASS */
    ), e.$slots.footer !== void 0 ? b(e.$slots, "footer", {
      key: 0
    }) : y("v-if", !0)]),
    _: 3
    /* FORWARDED */
  }, 16, ["modelValue", "class", "rounded", "open-on-focus", "position", "inline", "editable", "expanded", "date-formatter", "date-parser", "min-date", "max-date", "icon", "icon-right", "icon-right-clickable", "icon-pack", "size", "placeholder", "disabled", "mobile-native", "locale", "append-to-body", "onFocus", "onBlur"])) : (l(), D(u, N({
    key: 1,
    ref: "input",
    type: "datetime-local",
    autocomplete: "off",
    value: e.formatNative(e.computedValue),
    placeholder: e.placeholder,
    size: e.datepickerSize,
    icon: e.icon,
    "icon-pack": e.iconPack,
    rounded: e.rounded,
    max: e.formatNative(e.maxDate),
    min: e.formatNative(e.minDate),
    disabled: e.disabled,
    readonly: !1
  }, e.$attrs, {
    "use-html5-validation": e.useHtml5Validation,
    onChange: e.onChangeNativePicker,
    onFocus: e.onFocus,
    onBlur: e.onBlur,
    onInvalid: e.onInvalid
  }), null, 16, ["value", "placeholder", "size", "icon", "icon-pack", "rounded", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus", "onBlur", "onInvalid"]));
}
yi.render = lc;
yi.__file = "src/components/datetimepicker/Datetimepicker.vue";
var uc = {
  install(e) {
    H(e, yi);
  }
}, dc = {
  install(e) {
    H(e, xe), H(e, et);
  }
}, hc = {
  install(e) {
    H(e, tt);
  }
}, cc = {
  install(e) {
    H(e, z);
  }
}, mc = {
  install(e) {
    H(e, we);
  }
}, Ci = $({
  name: "OInputitems",
  components: {
    [Ft.name]: Ft,
    [z.name]: z
  },
  mixins: [Ke, L],
  inheritAttrs: !1,
  configField: "inputitems",
  emits: ["update:modelValue", "focus", "blur", "invalid", "add", "remove", "typing", "infinite-scroll", "icon-right-click"],
  props: {
    /** @model */
    modelValue: {
      type: Array,
      default: () => []
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /** Items data */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * Color of the each items, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /** Limits the number of items, plus item counter */
    maxitems: {
      type: [Number, String],
      required: !1
    },
    /** Show counter when maxlength or maxtags props are passed */
    hasCounter: {
      type: Boolean,
      default: () => m(p(), "inputitems.hasCounter", !0)
    },
    /** Property of the object (if data is array of objects) to use as display text */
    field: {
      type: String,
      default: "value"
    },
    /** Add autocomplete feature (if true, any Autocomplete props may be used too) */
    allowAutocomplete: Boolean,
    /**  Property of the object (if data is array of objects) to use as display text of group */
    groupField: String,
    /**  Property of the object (if data is array of objects) to use as key to get items array of each group, optional */
    groupOptions: String,
    /**  Opens a dropdown with choices when the input field is focused */
    openOnFocus: Boolean,
    /** Input will be disabled */
    disabled: Boolean,
    /** Add close/delete button to the item */
    closable: {
      type: Boolean,
      default: () => m(p(), "inputitems.closable", !0)
    },
    /**
     * Array of keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
     * which will add a item when typing (default comma, tab and enter)
     */
    confirmKeys: {
      type: Array,
      default: () => m(p(), "inputitems.confirmKeys", [",", "Tab", "Enter"])
    },
    /** Allow removing last item when pressing given keys, if input is empty */
    removeOnKeys: {
      type: Array,
      default: () => m(p(), "inputitems.removeOnKeys", ["Backspace"])
    },
    /** When autocomplete, it allow to add new items */
    allowNew: Boolean,
    /** Array of chars used to split when pasting a new string */
    onPasteSeparators: {
      type: Array,
      default: () => m(p(), "inputitems.onPasteSeparators", [","])
    },
    /** Function to validate the value of the item before adding */
    beforeAdding: {
      type: Function,
      default: () => !0
    },
    /** Allows adding the same item multiple time */
    allowDuplicates: {
      type: Boolean,
      default: !1
    },
    /** Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event */
    checkInfiniteScroll: {
      type: Boolean,
      default: !1
    },
    /** Function to create a new item to push into v-model (items) */
    createItem: {
      type: Function,
      default: (e) => e
    },
    /** Icon name of close icon on selected item */
    closeIcon: {
      type: String,
      default: () => m(p(), "inputitems.closeIcon", "close")
    },
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: Boolean,
    /** Accessibility label for the close button */
    ariaCloseLabel: String,
    /** Append autocomplete content to body */
    appendToBody: Boolean,
    rootClass: [String, Array, Function],
    expandedClass: [String, Array, Function],
    variantClass: [String, Array, Function],
    closeClass: [String, Array, Function],
    itemClass: [String, Array, Function],
    counterClass: [String, Array, Function],
    autocompleteClasses: {
      type: Object,
      default: () => m(p(), "inputitems.autocompleteClasses", {})
    }
  },
  data() {
    return {
      items: Array.isArray(this.modelValue) ? this.modelValue.slice(0) : this.modelValue || [],
      newItem: "",
      isComposing: !1
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-inputit"),
        { [this.computedClass("expandedClass", "o-inputit--expanded")]: this.expanded }
      ];
    },
    containerClasses() {
      return [
        this.computedClass("containerClass", "o-inputit__container"),
        { [this.computedClass("sizeClass", "o-inputit__container--", this.size)]: this.size }
      ];
    },
    itemClasses() {
      return [
        this.computedClass("itemClass", "o-inputit__item"),
        { [this.computedClass("variantClass", "o-inputit__item--", this.variant)]: this.variant }
      ];
    },
    closeClasses() {
      return [
        this.computedClass("closeClass", "o-inputit__item__close")
      ];
    },
    counterClasses() {
      return [
        this.computedClass("counterClass", "o-inputit__counter")
      ];
    },
    autocompleteBind() {
      return {
        ...this.$attrs,
        "root-class": this.computedClass("autocompleteClasses.rootClass", "o-inputit__autocomplete"),
        "input-classes": {
          "input-class": this.computedClass("autocompleteClasses.inputClasses.inputClass", "o-inputit__input")
        },
        ...this.autocompleteClasses
      };
    },
    valueLength() {
      return this.newItem.trim().length;
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    hasEmptySlot() {
      return !!this.$slots.empty;
    },
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    /**
     * Show the input field if a maxitems hasn't been set or reached.
     */
    hasInput() {
      return this.maxitems == null || this.itemsLength < this.maxitems;
    },
    itemsLength() {
      return this.items.length;
    },
    /**
     * If input has onPasteSeparators prop,
     * returning new RegExp used to split pasted string.
     */
    separatorsAsRegExp() {
      const e = this.onPasteSeparators;
      return e.length ? new RegExp(e.map((t) => t ? t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : null).join("|"), "g") : null;
    },
    $elementRef() {
      return "autocomplete";
    }
  },
  watch: {
    /**
     * When modelValue is changed set internal value.
     */
    modelValue(e) {
      this.items = Array.isArray(e) ? e.slice(0) : e || [];
    },
    hasInput() {
      this.hasInput || this.onBlur();
    }
  },
  methods: {
    addItem(e) {
      const t = e || this.newItem.trim();
      if (t) {
        if (!this.allowAutocomplete) {
          const i = this.separatorsAsRegExp;
          if (i && t.match(i)) {
            t.split(i).map((a) => a.trim()).filter((a) => a.length !== 0).map(this.addItem);
            return;
          }
        }
        (this.allowDuplicates ? !0 : this.items.indexOf(this.createItem(t)) === -1) && this.beforeAdding(t) && (this.items.push(this.createItem(t)), this.$emit("update:modelValue", this.items), this.$emit("add", t));
      }
      requestAnimationFrame(() => {
        this.newItem = "", this.$emit("typing", "");
      });
    },
    getNormalizedItemText(e) {
      return typeof e == "object" && (e = m(e, this.field)), `${e}`;
    },
    customOnBlur(e) {
      this.allowAutocomplete || this.addItem(), this.onBlur(e);
    },
    onSelect(e) {
      e && (this.addItem(e), this.$nextTick(() => {
        this.newItem = "";
      }));
    },
    removeItem(e, t) {
      const s = this.items.splice(e, 1)[0];
      return this.$emit("update:modelValue", this.items), this.$emit("remove", s), t && t.stopPropagation(), this.openOnFocus && this.$refs.autocomplete && this.$refs.autocomplete.focus(), s;
    },
    removeLastItem() {
      this.itemsLength > 0 && this.removeItem(this.itemsLength - 1);
    },
    keydown(e) {
      const { key: t } = e;
      if (this.removeOnKeys.indexOf(t) !== -1 && !this.newItem.length && this.removeLastItem(), !(this.allowAutocomplete && !this.allowNew) && this.confirmKeys.indexOf(t) >= 0) {
        if (t !== "Tab" && e.preventDefault(), t === "Enter" && this.isComposing)
          return;
        this.addItem();
      }
    },
    onTyping(e) {
      this.$emit("typing", e.trim());
    }
  }
});
function fc(e, t, s, i, a, n) {
  const r = w("o-icon"), o = w("o-autocomplete");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [v(
      "div",
      {
        class: c(e.containerClasses),
        onClick: t[5] || (t[5] = (u) => e.hasInput && e.focus(u))
      },
      [b(e.$slots, "selected", {
        items: e.items
      }, () => [(l(!0), d(
        V,
        null,
        K(e.items, (u, h) => (l(), d(
          "span",
          {
            key: e.getNormalizedItemText(u) + h,
            class: c(e.itemClasses)
          },
          [v(
            "span",
            null,
            F(e.getNormalizedItemText(u)),
            1
            /* TEXT */
          ), e.closable ? (l(), D(r, {
            key: 0,
            class: c(e.closeClasses),
            clickable: "",
            both: "",
            pack: e.iconPack,
            icon: e.closeIcon,
            onClick: (g) => e.removeItem(h, g),
            "aria-label": e.ariaCloseLabel
          }, null, 8, ["class", "pack", "icon", "onClick", "aria-label"])) : y("v-if", !0)],
          2
          /* CLASS */
        ))),
        128
        /* KEYED_FRAGMENT */
      ))]), e.hasInput ? (l(), D(o, N({
        key: 0,
        ref: "autocomplete",
        modelValue: e.newItem,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => e.newItem = u)
      }, e.autocompleteBind, {
        data: e.data,
        field: e.field,
        icon: e.icon,
        "icon-pack": e.iconPack,
        maxlength: e.maxlength,
        "has-counter": !1,
        size: e.size,
        disabled: e.disabled,
        autocomplete: e.autocomplete,
        "open-on-focus": e.openOnFocus,
        "keep-first": e.keepFirst,
        "keep-open": e.openOnFocus,
        "group-field": e.groupField,
        "group-options": e.groupOptions,
        "use-html5-validation": e.useHtml5Validation,
        "check-infinite-scroll": e.checkInfiniteScroll,
        "append-to-body": e.appendToBody,
        "confirm-keys": e.confirmKeys,
        onTyping: e.onTyping,
        onFocus: e.onFocus,
        onBlur: e.customOnBlur,
        onInvalid: e.onInvalid,
        onKeydown: e.keydown,
        onCompositionstart: t[1] || (t[1] = (u) => e.isComposing = !0),
        onCompositionend: t[2] || (t[2] = (u) => e.isComposing = !1),
        onSelect: e.onSelect,
        onInfiniteScroll: t[3] || (t[3] = (u) => e.$emit("infinite-scroll", u)),
        onIconRightClick: t[4] || (t[4] = (u) => e.$emit("icon-right-click", u))
      }), js({
        _: 2
        /* DYNAMIC */
      }, [e.hasHeaderSlot ? {
        name: "header",
        fn: M(() => [b(e.$slots, "header")]),
        key: "0"
      } : void 0, e.hasDefaultSlot ? {
        name: "default",
        fn: M((u) => [b(e.$slots, "default", {
          option: u.option,
          index: u.index
        })]),
        key: "1"
      } : void 0, e.hasEmptySlot ? {
        name: "empty",
        fn: M(() => [b(e.$slots, "empty")]),
        key: "2"
      } : void 0, e.hasFooterSlot ? {
        name: "footer",
        fn: M(() => [b(e.$slots, "footer")]),
        key: "3"
      } : void 0]), 1040, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "autocomplete", "open-on-focus", "keep-first", "keep-open", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onInvalid", "onKeydown", "onSelect"])) : y("v-if", !0)],
      2
      /* CLASS */
    ), e.hasCounter && (e.maxitems || e.maxlength) ? (l(), d(
      "small",
      {
        key: 0,
        class: c(e.counterClasses)
      },
      [e.maxlength && e.valueLength > 0 ? (l(), d(
        V,
        {
          key: 0
        },
        [se(
          F(e.valueLength) + " / " + F(e.maxlength),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      )) : e.maxitems ? (l(), d(
        V,
        {
          key: 1
        },
        [se(
          F(e.itemsLength) + " / " + F(e.maxitems),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      )) : y("v-if", !0)],
      2
      /* CLASS */
    )) : y("v-if", !0)],
    2
    /* CLASS */
  );
}
Ci.render = fc;
Ci.__file = "src/components/inputitems/Inputitems.vue";
var pc = {
  install(e) {
    H(e, Ci);
  }
};
const pn = typeof window > "u", gc = pn ? Object : window.HTMLElement, yc = pn ? Object : window.File;
var ht = $({
  name: "OLoading",
  components: {
    [z.name]: z
  },
  mixins: [L],
  configField: "loading",
  emits: ["update:active", "close", "update:full-page"],
  props: {
    /** Whether loading is active or not, use v-model:active to make it two-way binding */
    active: Boolean,
    /** @ignore */
    programmatic: Object,
    /** @ignore */
    promise: Promise,
    container: [Object, Function, gc],
    /** Loader will overlay the full page */
    fullPage: {
      type: Boolean,
      default: !0
    },
    /* Custom animation (transition name) */
    animation: {
      type: String,
      default: () => m(p(), "loading.animation", "fade")
    },
    /** Can close Loading by pressing escape or clicking outside */
    canCancel: {
      type: Boolean,
      default: !1
    },
    /** Callback function to call after user canceled (pressed escape / clicked outside) */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    /** Icon name */
    icon: {
      type: String,
      default: () => m(p(), "loading.icon", "loading")
    },
    /** Enable spin effect on icon */
    iconSpin: {
      type: Boolean,
      default: !0
    },
    iconSize: {
      type: String,
      default: "medium"
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    fullPageClass: [String, Function, Array]
  },
  data() {
    return {
      isActive: this.active || !1,
      displayInFullPage: this.fullPage
    };
  },
  watch: {
    active(e) {
      this.isActive = e;
    },
    fullPage(e) {
      this.displayInFullPage = e;
    }
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-load"),
        { [this.computedClass("fullPageClass", "o-load--fullpage")]: this.displayInFullPage }
      ];
    },
    overlayClasses() {
      return [
        this.computedClass("overlayClass", "o-load__overlay")
      ];
    },
    iconClasses() {
      return [
        this.computedClass("iconClass", "o-load__icon")
      ];
    }
  },
  methods: {
    /**
    * Close the Modal if canCancel.
    */
    cancel(e) {
      !this.canCancel || !this.isActive || this.close({ action: "cancel", method: e });
    },
    /**
    * Emit events, and destroy modal if it's programmatic.
    */
    close() {
      this.onCancel.apply(null, arguments), this.$emit("close"), this.$emit("update:active", !1), this.programmatic && (this.programmatic.instances && this.programmatic.instances.remove(this), this.programmatic.resolve && this.programmatic.resolve.apply(null, arguments), this.isActive = !1, window.requestAnimationFrame(() => {
        it(this.$el);
      }));
    },
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key: e }) {
      (e === "Escape" || e === "Esc") && this.cancel("escape");
    }
  },
  created() {
    typeof window < "u" && document.addEventListener("keyup", this.keyPress);
  },
  mounted() {
    this.programmatic && (this.programmatic.instances && this.programmatic.instances.add(this), this.container ? (this.displayInFullPage = !1, this.$emit("update:full-page", !1), this.container.appendChild(this.$el)) : document.body.appendChild(this.$el), this.isActive = !0);
  },
  beforeUnmount() {
    typeof window < "u" && document.removeEventListener("keyup", this.keyPress);
  }
});
function Cc(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), D(ye, {
    name: e.animation
  }, {
    default: M(() => [e.isActive ? (l(), d(
      "div",
      {
        key: 0,
        class: c(e.rootClasses)
      },
      [v(
        "div",
        {
          class: c(e.overlayClasses),
          onClick: t[0] || (t[0] = (o) => e.cancel("outside"))
        },
        null,
        2
        /* CLASS */
      ), b(e.$slots, "default", {}, () => [O(r, {
        icon: e.icon,
        spin: e.iconSpin,
        size: e.iconSize,
        class: c(e.iconClasses),
        both: ""
      }, null, 8, ["icon", "spin", "size", "class"])])],
      2
      /* CLASS */
    )) : y("v-if", !0)]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
ht.render = Cc;
ht.__file = "src/components/loading/Loading.vue";
class bi {
  constructor() {
    B(this, "entries");
    this.entries = [];
  }
  add(t) {
    this.entries.push(t);
  }
  remove(t) {
    let s = this.entries.indexOf(t);
    this.entries.splice(s, 1);
  }
  walk(t) {
    this.entries = [...this.entries].filter((s) => t(s) !== !0);
  }
}
let gn, Xi = new bi();
const bc = {
  open(e) {
    const s = ft({
      programmatic: { instances: Xi }
    }, e);
    s.promise = new Promise((n, r) => {
      s.programmatic.resolve = n, s.programmatic.reject = r;
    });
    const i = gn || vs, a = O(ht, s);
    return a.appContext = i._context, Us(a, document.createElement("div")), a.component.proxy;
  },
  closeAll() {
    Xi.walk((e) => {
      e.close(...arguments);
    });
  }
};
var vc = {
  install(e) {
    gn = e, H(e, ht), Ss(e, "loading", bc);
  }
}, vi = $({
  name: "OMenu",
  configField: "menu",
  mixins: [L],
  props: {
    accordion: {
      type: Boolean,
      default: !0
    },
    activable: {
      type: Boolean,
      default: !0
    },
    rootClass: [String, Array, Function]
  },
  data() {
    return {
      menuItems: []
    };
  },
  computed: {
    rootClasses() {
      return this.computedClass("rootClass", "o-menu");
    }
  },
  methods: {
    registerMenuItem(e) {
      this.menuItems.push(e);
    },
    resetMenu(e = []) {
      this.menuItems.forEach((t) => {
        e.includes(t) || t.reset();
      });
    }
  },
  provide() {
    return {
      registerMenuItem: this.registerMenuItem,
      resetMenu: this.resetMenu,
      accordion: () => this.accordion,
      activable: () => this.activable
    };
  }
});
function Sc(e, t, s, i, a, n) {
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [b(e.$slots, "default")],
    2
    /* CLASS */
  );
}
vi.render = Sc;
vi.__file = "src/components/menu/Menu.vue";
var Si = $({
  name: "OMenuList",
  configField: "menu",
  mixins: [L],
  props: {
    ariaRole: String,
    label: String,
    icon: String,
    iconPack: String,
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: String,
    listClass: [String, Array, Function],
    listLabelClass: [String, Array, Function]
  },
  computed: {
    listClasses() {
      return this.computedClass("listClass", "o-menu-list");
    },
    labelClasses() {
      return this.computedClass("listLabelClass", "o-menu-label");
    },
    computedAriaRole() {
      return this.ariaRole === "menu" ? this.ariaRole : null;
    }
  }
});
const kc = {
  key: 1
}, wc = ["role"];
function Dc(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), d("div", null, [e.label || e.$slots.label ? (l(), d(
    "div",
    {
      key: 0,
      class: c(e.labelClasses)
    },
    [e.label && e.icon ? (l(), D(r, {
      key: 0,
      icon: e.icon,
      pack: e.iconPack,
      size: e.size
    }, null, 8, ["icon", "pack", "size"])) : y("v-if", !0), e.label ? (l(), d(
      "span",
      kc,
      F(e.label),
      1
      /* TEXT */
    )) : b(e.$slots, "label", {
      key: 2
    })],
    2
    /* CLASS */
  )) : y("v-if", !0), v("ul", {
    class: c(e.listClasses),
    role: e.computedAriaRole
  }, [b(e.$slots, "default")], 10, wc)]);
}
Si.render = Dc;
Si.__file = "src/components/menu/MenuList.vue";
var ki = $({
  name: "OMenuItem",
  mixins: [L],
  configField: "menu",
  inheritAttrs: !1,
  props: {
    label: String,
    active: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    iconPack: String,
    icon: String,
    animation: {
      type: String,
      default: "slide"
    },
    tag: {
      type: String,
      default: "a"
    },
    ariaRole: {
      type: String,
      default: ""
    },
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: String,
    itemClass: [String, Array, Function],
    itemActiveClass: [String, Array, Function],
    itemDisabledClass: [String, Array, Function],
    itemIconTextClass: [String, Array, Function],
    itemSubmenuClass: [String, Array, Function],
    itemWrapperClass: [String, Array, Function]
  },
  data() {
    return {
      newActive: this.active,
      newExpanded: this.expanded
    };
  },
  computed: {
    ariaRoleMenu() {
      return this.ariaRole === "menuitem" ? this.ariaRole : null;
    },
    itemClasses() {
      return {
        [this.computedClass("itemClass", "o-menu-item")]: !0,
        [this.computedClass("itemActiveClass", "o-menu-item--active")]: this.newActive,
        [this.computedClass("itemDisabledClass", "o-menu-item--disabled")]: this.disabled,
        [this.computedClass("itemIconTextClass", "o-menu-item--icon-text")]: this.icon
      };
    },
    submenuClasses() {
      return this.computedClass("itemSubmenuClass", "o-menu-item__submenu");
    },
    wrapperClasses() {
      return this.computedClass("itemWrapperClass", "o-menu-item__wrapper");
    }
  },
  watch: {
    active(e) {
      this.newActive = e;
    },
    expanded(e) {
      this.newExpanded = e;
    }
  },
  methods: {
    handleClick() {
      this.disabled || (this.triggerReset(), this.newExpanded = this.$props.expanded || !this.newExpanded, this.$emit("update:expanded", this.newExpanded), this.activable && (this.newActive = !0, this.$emit("update:active", this.newActive)));
    },
    triggerReset(e) {
      this.triggerParentReset ? this.triggerParentReset(this) : this.resetMenu && this.resetMenu([this, e]);
    },
    reset() {
      (!this.$parent.$data.isMenu || this.$parent.$data.isMenu && this.accordion) && (this.newExpanded = !1, this.$emit("update:expanded", this.newExpanded)), this.activable && (this.newActive = !1, this.$emit("update:active", this.newActive));
    }
  },
  mounted() {
    this.registerMenuItem && this.registerMenuItem(this);
  },
  provide() {
    return {
      triggerParentReset: this.triggerReset
    };
  },
  inject: {
    registerMenuItem: { default: !1 },
    resetMenu: { default: !1 },
    triggerParentReset: { default: !1 },
    accordion: { default: !1 },
    activable: { default: !1 }
  }
});
const Fc = ["role"], $c = {
  key: 1
};
function Ac(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), d("li", {
    role: e.ariaRoleMenu,
    class: c(e.wrapperClasses)
  }, [(l(), D(qe(e.tag), N(e.$attrs, {
    class: e.itemClasses,
    onClick: t[0] || (t[0] = (o) => e.handleClick())
  }), {
    default: M(() => [e.icon ? (l(), D(r, {
      key: 0,
      icon: e.icon,
      pack: e.iconPack,
      size: e.size
    }, null, 8, ["icon", "pack", "size"])) : y("v-if", !0), e.label ? (l(), d(
      "span",
      $c,
      F(e.label),
      1
      /* TEXT */
    )) : b(e.$slots, "label", {
      key: 2,
      expanded: e.newExpanded,
      active: e.newActive
    })]),
    _: 3
    /* FORWARDED */
  }, 16, ["class"])), y(" sub menu items "), e.$slots.default ? (l(), D(ye, {
    key: 0,
    name: e.animation,
    persisted: ""
  }, {
    default: M(() => [G(v(
      "ul",
      {
        class: c(e.submenuClasses)
      },
      [b(e.$slots, "default")],
      2
      /* CLASS */
    ), [[ee, e.newExpanded]])]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"])) : y("v-if", !0)], 10, Fc);
}
ki.render = Ac;
ki.__file = "src/components/menu/MenuItem.vue";
var Mc = {
  install(e) {
    H(e, vi), H(e, Si), H(e, ki);
  }
}, ks = $({
  name: "OModal",
  components: {
    [z.name]: z
  },
  configField: "modal",
  directives: {
    trapFocus: fn
  },
  mixins: [L, He],
  emits: ["update:active", "close"],
  props: {
    /** Whether modal is active or not, use v-model:active to make it two-way binding */
    active: Boolean,
    /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
    component: [Object, Function],
    /** Text content */
    content: String,
    /** @ignore */
    programmatic: Object,
    /** @ignore */
    promise: Promise,
    /** Props to be binded to the injected component */
    props: Object,
    /** Events to be binded to the injected component */
    events: Object,
    /** Width of the Modal */
    width: {
      type: [String, Number],
      default: () => m(p(), "modal.width", 960)
    },
    /** Custom animation (transition name) */
    animation: {
      type: String,
      default: () => m(p(), "modal.animation", "zoom-out")
    },
    /**
     * Can close Modal by clicking 'X', pressing escape or clicking outside
     * @values escape, x, outside, button
     */
    canCancel: {
      type: [Array, Boolean],
      default: () => m(p(), "modal.canCancel", ["escape", "x", "outside", "button"])
    },
    /** Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside) */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    /** Callback function to call after close (programmatically close or user canceled) */
    onClose: {
      type: Function,
      default: () => {
      }
    },
    /**
     * clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts
     * @values keep, clip
     */
    scroll: {
      type: String,
      default: () => m(p(), "modal.scroll", "keep")
    },
    /** Display modal as full screen */
    fullScreen: Boolean,
    /** Trap focus inside the modal. */
    trapFocus: {
      type: Boolean,
      default: () => m(p(), "modal.trapFocus", !0)
    },
    ariaRole: {
      type: String,
      validator: (e) => ["dialog", "alertdialog"].indexOf(e) >= 0
    },
    ariaModal: Boolean,
    ariaLabel: String,
    /** Destroy modal on hide */
    destroyOnHide: {
      type: Boolean,
      default: () => m(p(), "modal.destroyOnHide", !0)
    },
    /** Automatically focus modal when active */
    autoFocus: {
      type: Boolean,
      default: () => m(p(), "modal.autoFocus", !0)
    },
    /** Icon name */
    closeIcon: {
      type: String,
      default: () => m(p(), "modal.closeIcon", "close")
    },
    closeIconSize: {
      type: String,
      default: "medium"
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    closeClass: [String, Function, Array],
    fullScreenClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    scrollClipClass: [String, Function, Array],
    noScrollClass: [String, Function, Array]
  },
  data() {
    return {
      isActive: this.active || !1,
      savedScrollTop: null,
      newWidth: Qe(this.width),
      animating: !this.active,
      destroyed: !this.active
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-modal"),
        { [this.computedClass("mobileClass", "o-modal--mobile")]: this.isMatchMedia }
      ];
    },
    overlayClasses() {
      return [
        this.computedClass("overlayClass", "o-modal__overlay")
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-modal__content"),
        { [this.computedClass("fullScreenClass", "o-modal__content--full-screen")]: this.fullScreen }
      ];
    },
    closeClasses() {
      return [
        this.computedClass("closeClass", "o-modal__close")
      ];
    },
    scrollClass() {
      return this.scroll === "clip" ? this.computedClass("scrollClipClass", "o-clipped") : this.computedClass("noScrollClass", "o-noscroll");
    },
    cancelOptions() {
      return typeof this.canCancel == "boolean" ? this.canCancel ? m(p(), "modal.canCancel", ["escape", "x", "outside", "button"]) : [] : this.canCancel;
    },
    showX() {
      return this.cancelOptions.indexOf("x") >= 0;
    },
    customStyle() {
      return this.fullScreen ? null : { maxWidth: this.newWidth };
    }
  },
  watch: {
    active(e) {
      this.isActive = e;
    },
    isActive(e) {
      e && (this.destroyed = !1), this.handleScroll(), this.$nextTick(() => {
        e && this.$el && this.$el.focus && this.autoFocus && this.$el.focus();
      });
    }
  },
  methods: {
    handleScroll() {
      if (!(typeof window > "u")) {
        if (this.scroll === "clip" && this.scrollClass) {
          this.isActive ? document.documentElement.classList.add(this.scrollClass) : document.documentElement.classList.remove(this.scrollClass);
          return;
        }
        if (this.savedScrollTop = this.savedScrollTop ? this.savedScrollTop : document.documentElement.scrollTop, this.scrollClass && (this.isActive ? document.body.classList.add(this.scrollClass) : document.body.classList.remove(this.scrollClass)), this.isActive) {
          document.body.style.top = `-${this.savedScrollTop}px`;
          return;
        }
        document.documentElement.scrollTop = this.savedScrollTop, document.body.style.top = null, this.savedScrollTop = null;
      }
    },
    /**
    * Close the Modal if canCancel and call the onCancel prop (function).
    */
    cancel(e) {
      this.cancelOptions.indexOf(e) < 0 || (this.onCancel.apply(null, arguments), this.close({ action: "cancel", method: e }));
    },
    /**
    * Emit events, and destroy modal if it's programmatic.
    */
    close() {
      this.isActive = !1, this.destroyOnHide && (this.destroyed = !0), this.$emit("update:active", !1), this.onClose.apply(null, arguments), this.programmatic && (this.programmatic.instances && this.programmatic.instances.remove(this), this.programmatic.resolve && this.programmatic.resolve.apply(null, arguments), window.requestAnimationFrame(() => {
        it(this.$el);
      }));
    },
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key: e }) {
      this.isActive && (e === "Escape" || e === "Esc") && this.cancel("escape");
    },
    /**
    * Transition after-enter hook
    */
    afterEnter() {
      this.animating = !1;
    },
    /**
    * Transition before-leave hook
    */
    beforeLeave() {
      this.animating = !0;
    }
  },
  created() {
    typeof window < "u" && document.addEventListener("keyup", this.keyPress);
  },
  mounted() {
    this.programmatic ? (this.programmatic.instances && this.programmatic.instances.add(this), document.body.appendChild(this.$el), this.isActive = !0) : this.isActive && this.handleScroll();
  },
  beforeUnmount() {
    if (typeof window < "u") {
      document.removeEventListener("keyup", this.keyPress);
      const e = this.savedScrollTop ? this.savedScrollTop : document.documentElement.scrollTop;
      this.scrollClass && (document.body.classList.remove(this.scrollClass), document.documentElement.classList.remove(this.scrollClass)), document.documentElement.scrollTop = e, document.body.style.top = null;
    }
  }
});
const Oc = ["role", "aria-label", "aria-modal"], Tc = {
  key: 1
};
function Pc(e, t, s, i, a, n) {
  const r = w("o-icon"), o = oa("trap-focus");
  return l(), D(ye, {
    name: e.animation,
    onAfterEnter: e.afterEnter,
    onBeforeLeave: e.beforeLeave
  }, {
    default: M(() => [e.destroyed ? y("v-if", !0) : G((l(), d("div", {
      key: 0,
      class: c(e.rootClasses),
      tabindex: -1,
      role: e.ariaRole,
      "aria-label": e.ariaLabel,
      "aria-modal": e.ariaModal
    }, [v(
      "div",
      {
        class: c(e.overlayClasses),
        onClick: t[0] || (t[0] = (u) => e.cancel("outside"))
      },
      null,
      2
      /* CLASS */
    ), v(
      "div",
      {
        class: c(e.contentClasses),
        style: me(e.customStyle)
      },
      [e.component ? (l(), D(qe(e.component), N({
        key: 0
      }, e.props, la(e.events || {}), {
        onClose: e.close
      }), null, 16, ["onClose"])) : e.content ? (l(), d(
        "div",
        Tc,
        F(e.content),
        1
        /* TEXT */
      )) : b(e.$slots, "default", {
        key: 2
      }), e.showX ? G((l(), D(r, {
        key: 3,
        clickable: "",
        both: "",
        class: c(e.closeClasses),
        icon: e.closeIcon,
        size: e.closeIconSize,
        onClick: t[1] || (t[1] = (u) => e.cancel("x"))
      }, null, 8, ["class", "icon", "size"])), [[ee, !e.animating]]) : y("v-if", !0)],
      6
      /* CLASS, STYLE */
    )], 10, Oc)), [[ee, e.isActive], [o, e.trapFocus]])]),
    _: 3
    /* FORWARDED */
  }, 8, ["name", "onAfterEnter", "onBeforeLeave"]);
}
ks.render = Pc;
ks.__file = "src/components/modal/Modal.vue";
let yn, Os = new bi();
const Vc = {
  open(e) {
    let t;
    typeof e == "string" ? t = {
      content: e
    } : t = e;
    const s = {
      programmatic: { instances: Os }
    };
    let i;
    Array.isArray(t.content) && (i = t.content, delete t.content);
    const a = ft(s, t);
    a.promise = new Promise((u, h) => {
      a.programmatic.resolve = u, a.programmatic.reject = h;
    });
    const n = yn || vs, o = O(ks, a, () => i);
    return o.appContext = n._context, Us(o, document.createElement("div")), o.component.proxy;
  },
  closeAll() {
    console.log(Os), Os.walk((e) => {
      e.close(...arguments);
    });
  }
};
var Ic = {
  install(e) {
    yn = e, H(e, ks), Ss(e, "modal", Vc);
  }
}, Rc = $({
  components: {
    [z.name]: z
  },
  props: {
    /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
    active: {
      type: Boolean,
      default: !0
    },
    /** Adds an 'X' button that closes the notification. */
    closable: {
      type: Boolean,
      default: !1
    },
    /** Message text (can contain HTML). */
    message: String,
    /** Type (color) of the notification, optional. */
    type: String,
    /** Adds an icon on the left side depending on the type (or the icon prop if defined). */
    hasIcon: Boolean,
    /** Icon name to use with has-icon. */
    icon: String,
    /** Icon pack to use. */
    iconPack: String,
    /** Icon size */
    iconSize: {
      type: String,
      default: "large"
    },
    /** Hide notification after duration only not programmatic. */
    autoClose: {
      type: Boolean,
      default: !1
    },
    /** Visibility duration in miliseconds. */
    duration: {
      type: Number,
      default: 2e3
    }
  },
  data() {
    return {
      isActive: this.active
    };
  },
  watch: {
    active(e) {
      this.isActive = e;
    },
    isActive(e) {
      e ? this.setAutoClose() : this.timer && clearTimeout(this.timer);
    }
  },
  computed: {
    /**
     * Icon name (MDI) based on type.
     */
    computedIcon() {
      if (this.icon)
        return this.icon;
      switch (this.type) {
        case "info":
          return "information";
        case "success":
          return "check-circle";
        case "warning":
          return "alert";
        case "danger":
          return "alert-circle";
        default:
          return null;
      }
    }
  },
  methods: {
    /**
     * Close the Message and emit events.
     */
    close(...e) {
      this.isActive = !1, this.$emit("close", ...e), this.$emit("update:active", !1);
    },
    /**
     * Set timer to auto close message
     */
    setAutoClose() {
      this.autoClose && (this.timer = setTimeout(() => {
        this.isActive && this.close({ action: "close", method: "timeout" });
      }, this.duration));
    }
  },
  mounted() {
    this.setAutoClose();
  }
}), wi = $({
  name: "ONotification",
  configField: "notification",
  mixins: [L, Rc],
  emits: ["update:active", "close"],
  props: {
    /**
    * Which position the notification will appear when programmatically
    * @values top-right, top, top-left, bottom-right, bottom, bottom-left
    */
    position: String,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],
    /**
     * Label for the close button, to be read by accessibility screenreaders.
     */
    ariaCloseLabel: String,
    /**
     * Size of close icon
     */
    closeIconSize: {
      type: String,
      default: "small"
    },
    /**
     * Custom animation (transition name).
     */
    animation: {
      type: String,
      default: "fade"
    },
    /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
    component: [Object, Function],
    /** Props to be binded to the injected component */
    props: Object,
    /** Events to be binded to the injected component */
    events: {
      type: Object,
      default: () => ({})
    },
    /** Close icon name */
    closeIcon: {
      type: String,
      default: () => m(p(), "notification.closeIcon", "close")
    },
    rootClass: [String, Function, Array],
    closeClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    wrapperClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-notification"),
        { [this.computedClass("variantClass", "o-notification--", this.variant)]: this.variant },
        { [this.computedClass("positionClass", "o-notification--", this.position)]: this.position }
      ];
    },
    wrapperClasses() {
      return [
        this.computedClass("wrapperClass", "o-notification__wrapper")
      ];
    },
    iconClasses() {
      return [
        this.computedClass("iconClass", "o-notification__icon")
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-notification__content")
      ];
    },
    closeClasses() {
      return [
        this.computedClass("closeClass", "o-notification__close")
      ];
    }
  }
});
const Bc = ["aria-label"], Nc = ["innerHTML"];
function Lc(e, t, s, i, a, n) {
  const r = w("o-icon");
  return l(), D(ye, {
    name: e.animation,
    persisted: ""
  }, {
    default: M(() => [G(v(
      "article",
      {
        class: c(e.rootClasses)
      },
      [e.closable ? (l(), d("button", {
        key: 0,
        class: c(e.closeClasses),
        type: "button",
        onClick: t[0] || (t[0] = (o) => e.close({
          action: "close",
          method: "x"
        })),
        "aria-label": e.ariaCloseLabel
      }, [O(r, {
        clickable: "",
        pack: e.iconPack,
        both: "",
        icon: e.closeIcon,
        size: e.closeIconSize
      }, null, 8, ["pack", "icon", "size"])], 10, Bc)) : y("v-if", !0), e.component ? (l(), D(qe(e.component), N({
        key: 1
      }, e.props, la(e.events), {
        onClose: e.close
      }), null, 16, ["onClose"])) : y("v-if", !0), e.$slots.default || e.message ? (l(), d(
        "div",
        {
          key: 2,
          class: c(e.wrapperClasses)
        },
        [e.computedIcon ? (l(), D(r, {
          key: 0,
          icon: e.computedIcon,
          pack: e.iconPack,
          class: c(e.iconClasses),
          both: "",
          size: e.iconSize,
          "aria-hidden": ""
        }, null, 8, ["icon", "pack", "class", "size"])) : y("v-if", !0), v(
          "div",
          {
            class: c(e.contentClasses)
          },
          [e.message ? (l(), d("span", {
            key: 0,
            innerHTML: e.message
          }, null, 8, Nc)) : b(e.$slots, "default", {
            key: 1,
            closeNotification: e.close
          })],
          2
          /* CLASS */
        )],
        2
        /* CLASS */
      )) : y("v-if", !0)],
      2
      /* CLASS */
    ), [[ee, e.isActive]])]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
wi.render = Lc;
wi.__file = "src/components/notification/Notification.vue";
var Ec = {
  props: {
    /** Type (color) of the notification, optional. */
    type: {
      type: String
    },
    /** Message text (can contain HTML). */
    message: [String, Array],
    /** Visibility duration in miliseconds. */
    duration: {
      type: Number,
      default: () => m(p(), "notification.duration", 1e3)
    },
    /** If should queue with others notices (snackbar/toast/notification). */
    queue: {
      type: Boolean,
      default: () => m(p(), "notification.noticeQueue", void 0)
    },
    /** Show the Notification indefinitely until it is dismissed when programmatically. */
    indefinite: {
      type: Boolean,
      default: !1
    },
    /** Which position the notification will appear when programmatically. */
    position: {
      type: String,
      default: "top",
      validator(e) {
        return [
          "top-right",
          "top",
          "top-left",
          "bottom-right",
          "bottom",
          "bottom-left"
        ].indexOf(e) > -1;
      }
    },
    /** DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. */
    container: {
      type: String,
      default: () => m(p(), "notification.containerElement", void 0)
    },
    /** @ignore */
    programmatic: Object,
    /** @ignore */
    promise: Promise,
    /** Callback function to call after close (programmatically close or user canceled) */
    onClose: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      isActive: !1,
      parentTop: null,
      parentBottom: null,
      newDuration: this.duration,
      newContainer: this.container
    };
  },
  computed: {
    correctParent() {
      switch (this.position) {
        case "top-right":
        case "top":
        case "top-left":
          return this.parentTop;
        case "bottom-right":
        case "bottom":
        case "bottom-left":
          return this.parentBottom;
      }
    },
    transition() {
      switch (this.position) {
        case "top-right":
        case "top":
        case "top-left":
          return {
            enter: "fadeInDown",
            leave: "fadeOut"
          };
        case "bottom-right":
        case "bottom":
        case "bottom-left":
          return {
            enter: "fadeInUp",
            leave: "fadeOut"
          };
      }
    }
  },
  methods: {
    shouldQueue() {
      return this.queue ? this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0 : !1;
    },
    close() {
      clearTimeout(this.timer), this.$emit("close"), this.onClose.apply(null, arguments), this.programmatic && (this.programmatic.instances && this.programmatic.instances.remove(this), this.programmatic.resolve && this.programmatic.resolve.apply(null, arguments)), setTimeout(() => {
        this.isActive = !1, it(this.$el);
      }, 150);
    },
    showNotice() {
      this.shouldQueue() && (this.correctParent.innerHTML = ""), this.correctParent.insertAdjacentElement("afterbegin", this.$el), this.isActive = !0, this.indefinite || (this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration));
    },
    setupContainer() {
      if (this.rootClasses() && this.positionClasses("top") && this.positionClasses("bottom")) {
        if (this.parentTop = document.querySelector((this.newContainer ? this.newContainer : "body") + `>.${this.rootClasses().join(".")}.${this.positionClasses("top").join(".")}`), this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : "body") + `>.${this.rootClasses().join(".")}.${this.positionClasses("bottom").join(".")}`), this.parentTop && this.parentBottom)
          return;
        this.parentTop || (this.parentTop = document.createElement("div"), this.parentTop.className = `${this.rootClasses().join(" ")} ${this.positionClasses("top").join(" ")}`), this.parentBottom || (this.parentBottom = document.createElement("div"), this.parentBottom.className = `${this.rootClasses().join(" ")} ${this.positionClasses("bottom").join(" ")}`);
        const e = document.querySelector(this.newContainer) || document.body;
        if (e.appendChild(this.parentTop), e.appendChild(this.parentBottom), this.newContainer) {
          const t = this.noticeCustomContainerClasses();
          t && t.length && t.filter((s) => !!s).forEach((s) => {
            this.parentTop.classList.add(s), this.parentBottom.classList.add(s);
          });
        }
      }
    },
    timeoutCallback() {
      return this.close({ action: "close", method: "timeout" });
    }
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    this.programmatic && this.programmatic.instances && this.programmatic.instances.add(this), this.showNotice();
  }
}, Di = $({
  name: "ONotificationNotice",
  configField: "notification",
  mixins: [L, Ec],
  props: {
    propsNotification: Object,
    noticeClass: [String, Function, Array],
    noticePositionClass: [String, Function, Array],
    noticeCustomContainerClass: [String, Function, Array]
  },
  emits: ["update:active", "close"],
  methods: {
    rootClasses() {
      return [
        this.computedClass("noticeClass", "o-notices")
      ];
    },
    positionClasses(e) {
      return [
        this.computedClass("noticePositionClass", "o-notices--", e)
      ];
    },
    noticeCustomContainerClasses() {
      return [
        this.computedClass("noticeCustomContainerClass", "o-notices__custom-container")
      ];
    },
    timeoutCallback() {
      return this.$refs.notification.close({ action: "close", method: "timeout" });
    }
  }
});
function Yc(e, t, s, i, a, n) {
  const r = w("o-notification");
  return l(), D(r, N(e.propsNotification, {
    ref: "notification",
    onClose: e.close
  }), {
    default: M(() => [b(e.$slots, "default")]),
    _: 3
    /* FORWARDED */
  }, 16, ["onClose"]);
}
Di.render = Yc;
Di.__file = "src/components/notification/NotificationNotice.vue";
let Cn, Qi = new bi();
const Hc = {
  open(e) {
    let t;
    typeof e == "string" ? t = {
      message: e
    } : t = e;
    const s = {
      programmatic: { instances: Qi },
      position: m(p(), "notification.position", "top-right"),
      closable: e.closable || m(p(), "notification.closable", !1)
    };
    let i;
    Array.isArray(t.message) && (i = t.message, delete t.message), t.active = !0;
    const a = ft(s, t);
    a.promise = new Promise((u, h) => {
      a.programmatic.resolve = u, a.programmatic.reject = h;
    });
    const n = Cn || vs;
    a.propsNotification = Object.assign({}, a), a.propsNotification.isActive = !0;
    const o = O(Di, a, () => i);
    return o.appContext = n._context, Us(o, document.createElement("div")), o.component.proxy;
  },
  closeAll() {
    Qi.walk((e) => {
      e.close(...arguments);
    });
  }
};
var Wc = {
  install(e) {
    Cn = e, H(e, wi), Ss(e, "notification", Hc);
  }
}, Ot = $({
  name: "OPaginationButton",
  inject: ["$pagination"],
  configField: "pagination",
  props: {
    page: {
      type: Object,
      required: !0
    },
    tag: {
      type: String,
      default: "a",
      validator: (e) => m(p(), "linkTags", ["a", "button", "input", "router-link", "nuxt-link"]).indexOf(e) >= 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    linkClass: [String, Array, Object],
    linkCurrentClass: [String, Array, Object]
  },
  computed: {
    linkClasses() {
      return [
        this.linkClass || [...this.$pagination.linkClasses],
        this.page.class,
        { [this.linkCurrentClass || this.$pagination.linkCurrentClasses]: this.page.isCurrent }
      ];
    },
    href() {
      return this.tag === "a" ? "#" : "";
    },
    isDisabled() {
      return this.tag === "a" ? null : this.disabled || this.page.disabled;
    }
  }
});
function zc(e, t, s, i, a, n) {
  return l(), D(qe(e.tag), N({
    role: "button",
    href: e.href,
    disabled: e.isDisabled,
    class: e.linkClasses
  }, e.$attrs, {
    onClick: T(e.page.click, ["prevent"]),
    "aria-label": e.page["aria-label"],
    "aria-current": e.page.isCurrent
  }), {
    default: M(() => [b(e.$slots, "default", {}, () => [se(
      F(e.page.number),
      1
      /* TEXT */
    )])]),
    _: 3
    /* FORWARDED */
  }, 16, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]);
}
Ot.render = zc;
Ot.__file = "src/components/pagination/PaginationButton.vue";
var Tt = $({
  name: "OPagination",
  components: {
    [z.name]: z,
    [Ot.name]: Ot
  },
  configField: "pagination",
  mixins: [L, He],
  provide() {
    return {
      $pagination: this
    };
  },
  emits: ["update:active", "change", "update:current"],
  props: {
    /** Total count of items */
    total: Number,
    /** Items count for each page */
    perPage: {
      type: Number,
      default: () => m(p(), "pagination.perPage", 20)
    },
    /** Current page number, use v-model:current to make it two-way binding */
    current: {
      type: Number,
      default: 1
    },
    /** Number of pagination items to show before current page */
    rangeBefore: {
      type: Number,
      default: 1
    },
    /** Number of pagination items to show after current page */
    rangeAfter: {
      type: Number,
      default: 1
    },
    /**
     * Pagination size, optional
     * @values small, medium, large
     */
    size: String,
    /** Simple style */
    simple: Boolean,
    /** Rounded button styles */
    rounded: Boolean,
    /**
     * Buttons order, optional
     * @values centered, right, left
     */
    order: {
      type: String,
      default: () => m(p(), "pagination.order", "right")
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /** Icon to use for previous button */
    iconPrev: {
      type: String,
      default: () => m(p(), "pagination.iconPrev", "chevron-left")
    },
    /** Icon to use for next button */
    iconNext: {
      type: String,
      default: () => m(p(), "pagination.iconNext", "chevron-right")
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    rootClass: [String, Function, Array],
    prevBtnClass: [String, Function, Array],
    nextBtnClass: [String, Function, Array],
    listClass: [String, Function, Array],
    linkClass: [String, Function, Array],
    linkCurrentClass: [String, Function, Array],
    ellipsisClass: [String, Function, Array],
    infoClass: [String, Function, Array],
    orderClass: [String, Function, Array],
    simpleClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    linkDisabledClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    mobileClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-pag"),
        { [this.computedClass("orderClass", "o-pag--", this.order)]: this.order },
        { [this.computedClass("sizeClass", "o-pag--", this.size)]: this.size },
        { [this.computedClass("simpleClass", "o-pag--simple")]: this.simple },
        { [this.computedClass("mobileClass", "o-pag--mobile")]: this.isMatchMedia }
      ];
    },
    prevBtnClasses() {
      return [
        this.computedClass("prevBtnClass", "o-pag__previous"),
        { [this.computedClass("linkDisabledClass", "o-pag__link--disabled")]: !this.hasPrev }
      ];
    },
    nextBtnClasses() {
      return [
        this.computedClass("nextBtnClass", "o-pag__next"),
        { [this.computedClass("linkDisabledClass", "o-pag__link--disabled")]: !this.hasNext }
      ];
    },
    infoClasses() {
      return [
        this.computedClass("infoClass", "o-pag__info")
      ];
    },
    ellipsisClasses() {
      return [
        this.computedClass("ellipsisClass", "o-pag__ellipsis")
      ];
    },
    listClasses() {
      return [
        this.computedClass("listClass", "o-pag__list")
      ];
    },
    linkClasses() {
      return [
        this.computedClass("linkClass", "o-pag__link"),
        { [this.computedClass("roundedClass", "o-pag__link--rounded")]: this.rounded }
      ];
    },
    linkCurrentClasses() {
      return [
        this.computedClass("linkCurrentClass", "o-pag__link--current")
      ];
    },
    beforeCurrent() {
      return parseInt(this.rangeBefore);
    },
    afterCurrent() {
      return parseInt(this.rangeAfter);
    },
    /**
    * Total page size (count).
    */
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
    /**
    * First item of the page (count).
    */
    firstItem() {
      const e = this.current * this.perPage - this.perPage + 1;
      return e >= 0 ? e : 0;
    },
    /**
    * Check if previous button is available.
    */
    hasPrev() {
      return this.current > 1;
    },
    /**
    * Check if first page button should be visible.
    */
    hasFirst() {
      return this.current >= 2 + this.beforeCurrent;
    },
    /**
    * Check if first ellipsis should be visible.
    */
    hasFirstEllipsis() {
      return this.current >= this.beforeCurrent + 4;
    },
    /**
    * Check if last page button should be visible.
    */
    hasLast() {
      return this.current <= this.pageCount - (1 + this.afterCurrent);
    },
    /**
    * Check if last ellipsis should be visible.
    */
    hasLastEllipsis() {
      return this.current < this.pageCount - (2 + this.afterCurrent);
    },
    /**
    * Check if next button is available.
    */
    hasNext() {
      return this.current < this.pageCount;
    },
    /**
    * Get near pages, 1 before and 1 after the current.
    * Also add the click event to the array.
    */
    pagesInRange() {
      if (this.simple)
        return;
      let e = Math.max(1, this.current - this.beforeCurrent);
      e - 1 === 2 && e--;
      let t = Math.min(this.current + this.afterCurrent, this.pageCount);
      this.pageCount - t === 2 && t++;
      const s = [];
      for (let i = e; i <= t; i++)
        s.push(this.getPage(i));
      return s;
    },
    hasDefaultSlot() {
      return this.$slots.default;
    },
    hasPreviousSlot() {
      return this.$slots.previous;
    },
    hasNextSlot() {
      return this.$slots.next;
    }
  },
  watch: {
    /**
    * If current page is trying to be greater than page count, set to last.
    */
    pageCount(e) {
      this.current > e && this.last();
    }
  },
  methods: {
    /**
    * Previous button click listener.
    */
    prev(e) {
      this.changePage(this.current - 1, e);
    },
    /**
    * Next button click listener.
    */
    next(e) {
      this.changePage(this.current + 1, e);
    },
    /**
    * First button click listener.
    */
    first(e) {
      this.changePage(1, e);
    },
    /**
    * Last button click listener.
    */
    last(e) {
      this.changePage(this.pageCount, e);
    },
    changePage(e, t) {
      this.current === e || e < 1 || e > this.pageCount || (this.$emit("change", e), this.$emit("update:current", e), t && t.target && this.$nextTick(() => t.target.focus()));
    },
    getPage(e, t = {}) {
      return {
        number: e,
        isCurrent: this.current === e,
        click: (s) => this.changePage(e, s),
        disabled: t.disabled || !1,
        class: t.class || "",
        "aria-label": t["aria-label"] || this.getAriaPageLabel(e, this.current === e)
      };
    },
    /**
    * Get text for aria-label according to page number.
    */
    getAriaPageLabel(e, t) {
      return this.ariaPageLabel && (!t || !this.ariaCurrentLabel) ? this.ariaPageLabel + " " + e + "." : this.ariaPageLabel && t && this.ariaCurrentLabel ? this.ariaCurrentLabel + ", " + this.ariaPageLabel + " " + e + "." : null;
    }
  }
});
const _c = {
  key: 0
}, jc = {
  key: 1
}, Uc = {
  key: 2
}, qc = {
  key: 3
};
function Kc(e, t, s, i, a, n) {
  const r = w("o-icon"), o = w("o-pagination-button");
  return l(), d(
    "nav",
    {
      class: c(e.rootClasses)
    },
    [e.hasPreviousSlot ? b(e.$slots, "previous", {
      key: 0,
      linkClass: e.linkClasses,
      linkCurrentClass: e.linkCurrentClasses,
      page: e.getPage(e.current - 1, {
        class: e.prevBtnClasses,
        "aria-label": e.ariaPreviousLabel
      })
    }, () => [O(r, {
      icon: e.iconPrev,
      pack: e.iconPack,
      both: "",
      "aria-hidden": "true"
    }, null, 8, ["icon", "pack"])]) : (l(), D(o, {
      key: 1,
      class: c(e.prevBtnClasses),
      linkClass: e.linkClasses,
      linkCurrentClass: e.linkCurrentClasses,
      page: e.getPage(e.current - 1)
    }, {
      default: M(() => [O(r, {
        icon: e.iconPrev,
        pack: e.iconPack,
        both: "",
        "aria-hidden": "true"
      }, null, 8, ["icon", "pack"])]),
      _: 1
      /* STABLE */
    }, 8, ["class", "linkClass", "linkCurrentClass", "page"])), e.hasNextSlot ? b(e.$slots, "next", {
      key: 2,
      linkClass: e.linkClasses,
      linkCurrentClass: e.linkCurrentClasses,
      page: e.getPage(e.current + 1, {
        class: e.nextBtnClasses,
        "aria-label": e.ariaNextLabel
      })
    }, () => [O(r, {
      icon: e.iconNext,
      pack: e.iconPack,
      both: "",
      "aria-hidden": "true"
    }, null, 8, ["icon", "pack"])]) : (l(), D(o, {
      key: 3,
      class: c(e.nextBtnClasses),
      linkClass: e.linkClasses,
      linkCurrentClass: e.linkCurrentClasses,
      page: e.getPage(e.current + 1)
    }, {
      default: M(() => [O(r, {
        icon: e.iconNext,
        pack: e.iconPack,
        both: "",
        "aria-hidden": "true"
      }, null, 8, ["icon", "pack"])]),
      _: 1
      /* STABLE */
    }, 8, ["class", "linkClass", "linkCurrentClass", "page"])), e.simple ? (l(), d(
      "small",
      {
        key: 4,
        class: c(e.infoClasses)
      },
      [e.perPage == 1 ? (l(), d(
        V,
        {
          key: 0
        },
        [se(
          F(e.firstItem) + " / " + F(e.total),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      )) : (l(), d(
        V,
        {
          key: 1
        },
        [se(
          F(e.firstItem) + "-" + F(Math.min(e.current * e.perPage, e.total)) + " / " + F(e.total),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))],
      2
      /* CLASS */
    )) : (l(), d(
      "ul",
      {
        key: 5,
        class: c(e.listClasses)
      },
      [y("First"), e.hasFirst ? (l(), d("li", _c, [e.hasDefaultSlot ? b(e.$slots, "default", {
        key: 0,
        page: e.getPage(1),
        linkClass: e.linkClasses,
        linkCurrentClass: e.linkCurrentClasses
      }) : (l(), D(o, {
        key: 1,
        linkClass: e.linkClasses,
        linkCurrentClass: e.linkCurrentClasses,
        page: e.getPage(1)
      }, null, 8, ["linkClass", "linkCurrentClass", "page"]))])) : y("v-if", !0), e.hasFirstEllipsis ? (l(), d("li", jc, [v(
        "span",
        {
          class: c(e.ellipsisClasses)
        },
        "…",
        2
        /* CLASS */
      )])) : y("v-if", !0), y("Pages"), (l(!0), d(
        V,
        null,
        K(e.pagesInRange, (u) => (l(), d("li", {
          key: u.number
        }, [e.hasDefaultSlot ? b(e.$slots, "default", {
          key: 0,
          page: u,
          linkClass: e.linkClasses,
          linkCurrentClass: e.linkCurrentClasses
        }) : (l(), D(o, {
          key: 1,
          linkClass: e.linkClasses,
          linkCurrentClass: e.linkCurrentClasses,
          page: u
        }, null, 8, ["linkClass", "linkCurrentClass", "page"]))]))),
        128
        /* KEYED_FRAGMENT */
      )), y("Last"), e.hasLastEllipsis ? (l(), d("li", Uc, [v(
        "span",
        {
          class: c(e.ellipsisClasses)
        },
        "…",
        2
        /* CLASS */
      )])) : y("v-if", !0), e.hasLast ? (l(), d("li", qc, [e.hasDefaultSlot ? b(e.$slots, "default", {
        key: 0,
        page: e.getPage(e.pageCount),
        linkClass: e.linkClasses,
        linkCurrentClass: e.linkCurrentClasses
      }) : (l(), D(o, {
        key: 1,
        linkClass: e.linkClasses,
        linkCurrentClass: e.linkCurrentClasses,
        page: e.getPage(e.pageCount)
      }, null, 8, ["linkClass", "linkCurrentClass", "page"]))])) : y("v-if", !0)],
      2
      /* CLASS */
    ))],
    2
    /* CLASS */
  );
}
Tt.render = Kc;
Tt.__file = "src/components/pagination/Pagination.vue";
var Gc = {
  install(e) {
    H(e, Tt), H(e, Ot);
  }
}, Fi = $({
  name: "ORadio",
  mixins: [L, cn],
  configField: "radio",
  emits: [
    "input"
  ],
  props: {
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    getLabel() {
      return this.$refs.label;
    },
    isChecked() {
      return this.modelValue === this.nativeValue;
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-radio"),
        { [this.computedClass("checkedClass", "o-radio--checked")]: this.isChecked },
        { [this.computedClass("sizeClass", "o-radio--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-radio--disabled")]: this.disabled },
        { [this.computedClass("variantClass", "o-radio--", this.variant)]: this.variant }
      ];
    },
    checkClasses() {
      return [
        this.computedClass("checkClass", "o-radio__check"),
        { [this.computedClass("checkCheckedClass", "o-radio__check--checked")]: this.isChecked }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-radio__label")
      ];
    }
  }
});
const Jc = ["disabled", "required", "name", "value"];
function Zc(e, t, s, i, a, n) {
  return l(), d(
    "label",
    {
      class: c(e.rootClasses),
      ref: "label",
      onClick: t[2] || (t[2] = T((...r) => e.focus && e.focus(...r), ["stop"])),
      onKeydown: t[3] || (t[3] = U(T((r) => e.getLabel.click(), ["prevent"]), ["enter"]))
    },
    [G(v("input", {
      "onUpdate:modelValue": t[0] || (t[0] = (r) => e.computedValue = r),
      type: "radio",
      ref: "input",
      onClick: t[1] || (t[1] = T(() => {
      }, ["stop"])),
      class: c(e.checkClasses),
      disabled: e.disabled,
      required: e.required,
      name: e.name,
      value: e.nativeValue
    }, null, 10, Jc), [[Un, e.computedValue]]), v(
      "span",
      {
        class: c(e.labelClasses)
      },
      [b(e.$slots, "default")],
      2
      /* CLASS */
    )],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
Fi.render = Zc;
Fi.__file = "src/components/radio/Radio.vue";
var Xc = {
  install(e) {
    H(e, Fi);
  }
}, Qc = {
  install(e) {
    H(e, Le);
  }
}, bn = $({
  name: "OSkeleton",
  mixins: [L],
  configField: "skeleton",
  props: {
    /** Show or hide loader	 */
    active: {
      type: Boolean,
      default: !0
    },
    /** Show a loading animation */
    animated: {
      type: Boolean,
      default: !0
    },
    /** Custom width */
    width: [Number, String],
    /** Custom height */
    height: [Number, String],
    /** Show a circle shape */
    circle: Boolean,
    /** Rounded style */
    rounded: {
      type: Boolean,
      default: !0
    },
    /** Number of shapes to display */
    count: {
      type: Number,
      default: 1
    },
    /**
     * Skeleton position in relation to the element
     * @values left, centered, right
     */
    position: {
      type: String,
      default: "left",
      validator(e) {
        return [
          "left",
          "centered",
          "right"
        ].indexOf(e) > -1;
      }
    },
    /**
     * Size of skeleton
     * @values small, medium, large
     */
    size: String,
    rootClass: [String, Function, Array],
    animationClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    itemClass: [String, Function, Array],
    itemRoundedClass: [String, Function, Array],
    sizeClass: [String, Function, Array]
  },
  render() {
    if (!this.active)
      return;
    const e = [], t = this.width, s = this.height;
    for (let i = 0; i < this.count; i++)
      e.push(ce("div", {
        class: [
          this.computedClass("itemClass", "o-sklt__item"),
          { [this.computedClass("itemRoundedClass", "o-sklt__item--rounded")]: this.rounded },
          { [this.computedClass("animationClass", "o-sklt__item--animated")]: this.animated },
          { [this.computedClass("sizeClass", "o-sklt__item--", this.size)]: this.size }
        ],
        key: i,
        style: {
          height: Qe(s),
          width: Qe(t),
          borderRadius: this.circle ? "50%" : null
        }
      }));
    return ce("div", {
      class: [
        this.computedClass("rootClass", "o-sklt"),
        { [this.computedClass("positionClass", "o-sklt--", this.position)]: this.position }
      ]
    }, e);
  }
});
bn.__file = "src/components/skeleton/Skeleton.vue";
var xc = {
  install(e) {
    H(e, bn);
  }
}, $i = $({
  name: "OSidebar",
  mixins: [L, He],
  configField: "sidebar",
  emits: ["update:open", "close"],
  props: {
    /** To control the behaviour of the sidebar programmatically, use the v-model:open to make it two-way binding */
    open: Boolean,
    /**
    * Color of the sidebar, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],
    /** Show an overlay like modal */
    overlay: Boolean,
    /**
     * Skeleton position in relation to the window
     * @values fixed, absolute, static
     */
    position: {
      type: String,
      default: () => m(p(), "sidebar.position", "fixed"),
      validator: (e) => [
        "fixed",
        "absolute",
        "static"
      ].indexOf(e) >= 0
    },
    /** Show sidebar in fullheight */
    fullheight: Boolean,
    /** Show sidebar in fullwidth */
    fullwidth: Boolean,
    /** Show the sidebar on right */
    right: Boolean,
    /**
     * Custom layout on mobile
     * @values fullwidth, reduced, hidden
     */
    mobile: {
      type: String,
      validator: (e) => [
        "",
        "fullwidth",
        "reduced",
        "hidden"
      ].indexOf(e) >= 0
    },
    /** Show a small sidebar */
    reduce: Boolean,
    /** Expand sidebar on hover when reduced or mobile is reduce */
    expandOnHover: Boolean,
    /** Expand sidebar on hover with fixed position when reduced or mobile is reduce */
    expandOnHoverFixed: Boolean,
    /**
     * Sidebar cancel options
     * @values true, false, 'escape', 'outside'
     */
    canCancel: {
      type: [Array, Boolean],
      default: () => m(p(), "sidebar.canCancel", ["escape", "outside"])
    },
    /**
     * Callback on cancel
     */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    scroll: {
      type: String,
      default: () => m(p(), "sidebar.scroll", "clip"),
      validator: (e) => [
        "clip",
        "keep"
      ].indexOf(e) >= 0
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    fixedClass: [String, Function, Array],
    staticClass: [String, Function, Array],
    absoluteClass: [String, Function, Array],
    fullheightClass: [String, Function, Array],
    fullwidthClass: [String, Function, Array],
    rightClass: [String, Function, Array],
    reduceClass: [String, Function, Array],
    expandOnHoverClass: [String, Function, Array],
    expandOnHoverFixedClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    scrollClipClass: [String, Function, Array],
    noScrollClass: [String, Function, Array],
    hiddenClass: [String, Function, Array],
    visibleClass: [String, Function, Array]
  },
  data() {
    return {
      isOpen: this.open,
      transitionName: null,
      animating: !0,
      savedScrollTop: null
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-side"),
        { [this.computedClass("mobileClass", "o-side--mobile")]: this.isMatchMedia }
      ];
    },
    overlayClasses() {
      return [
        this.computedClass("overlayClass", "o-side__overlay")
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-side__content"),
        { [this.computedClass("variantClass", "o-side__content--", this.variant)]: this.variant },
        { [this.computedClass("fixedClass", "o-side__content--fixed")]: this.isFixed },
        { [this.computedClass("staticClass", "o-side__content--static")]: this.isStatic },
        { [this.computedClass("absoluteClass", "o-side__content--absolute")]: this.isAbsolute },
        { [this.computedClass("fullheightClass", "o-side__content--fullheight")]: this.fullheight },
        { [this.computedClass("fullwidthClass", "o-side__content--fullwidth")]: this.fullwidth || this.mobile === "fullwidth" && this.isMatchMedia },
        { [this.computedClass("rightClass", "o-side__content--right")]: this.right },
        { [this.computedClass("reduceClass", "o-side__content--mini")]: this.reduce || this.mobile === "reduced" && this.isMatchMedia },
        { [this.computedClass("expandOnHoverClass", "o-side__content--mini-expand")]: this.expandOnHover && this.mobile !== "fullwidth" },
        { [this.computedClass("expandOnHoverFixedClass", "o-side__content--expand-mini-hover-fixed")]: this.expandOnHover && this.expandOnHoverFixed && this.mobile !== "fullwidth" },
        { [this.computedClass("visibleClass", "o-side__content--visible")]: this.isOpen },
        { [this.computedClass("hiddenClass", "o-side__content--hidden")]: !this.isOpen }
      ];
    },
    scrollClass() {
      return this.scroll === "clip" ? this.computedClass("scrollClipClass", "o-clipped") : this.computedClass("noScrollClass", "o-noscroll");
    },
    cancelOptions() {
      return typeof this.canCancel == "boolean" ? this.canCancel ? m(p(), "sidebar.canCancel", ["escape", "outside"]) : [] : this.canCancel;
    },
    isStatic() {
      return this.position === "static";
    },
    isFixed() {
      return this.position === "fixed";
    },
    isAbsolute() {
      return this.position === "absolute";
    },
    hideOnMobile() {
      return this.mobile === "hidden" && this.isMatchMedia;
    }
  },
  watch: {
    open: {
      handler(e) {
        this.isOpen = e, this.overlay && this.handleScroll();
        const t = this.right ? !e : e;
        this.transitionName = t ? "slide-next" : "slide-prev";
      },
      immediate: !0
    }
  },
  methods: {
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key: e }) {
      this.isFixed && this.isOpen && (e === "Escape" || e === "Esc") && this.cancel("escape");
    },
    /**
    * Close the Sidebar if canCancel and call the onCancel prop (function).
    */
    cancel(e) {
      this.cancelOptions.indexOf(e) < 0 || this.isStatic || (this.onCancel.apply(null, arguments), this.close());
    },
    /**
    * Call the onCancel prop (function) and emit events
    */
    close() {
      this.isOpen = !1, this.$emit("close"), this.$emit("update:open", !1);
    },
    /**
     * Close fixed sidebar if clicked outside.
     */
    clickedOutside(e) {
      !this.isFixed || !this.isOpen || this.animating || e.composedPath().includes(this.$refs.sidebarContent) || this.cancel("outside");
    },
    /**
    * Transition before-enter hook
    */
    beforeEnter() {
      this.animating = !0;
    },
    /**
    * Transition after-leave hook
    */
    afterEnter() {
      this.animating = !1;
    },
    handleScroll() {
      if (!(typeof window > "u")) {
        if (this.scroll === "clip" && this.scrollClass) {
          this.open ? document.documentElement.classList.add(this.scrollClass) : document.documentElement.classList.remove(this.scrollClass);
          return;
        }
        if (this.savedScrollTop = this.savedScrollTop ? this.savedScrollTop : document.documentElement.scrollTop, this.scrollClass && (this.open ? document.body.classList.add(this.scrollClass) : document.body.classList.remove(this.scrollClass)), this.open) {
          document.body.style.top = `-${this.savedScrollTop}px`;
          return;
        }
        document.documentElement.scrollTop = this.savedScrollTop, document.body.style.top = null, this.savedScrollTop = null;
      }
    }
  },
  created() {
    typeof window < "u" && (document.addEventListener("keyup", this.keyPress), document.addEventListener("click", this.clickedOutside));
  },
  mounted() {
    typeof window < "u" && (this.isFixed && document.body.appendChild(this.$el), this.overlay && this.open && this.handleScroll());
  },
  beforeUnmount() {
    if (typeof window < "u" && (document.removeEventListener("keyup", this.keyPress), document.removeEventListener("click", this.clickedOutside), this.overlay)) {
      const e = this.savedScrollTop ? this.savedScrollTop : document.documentElement.scrollTop;
      this.scrollClass && (document.body.classList.remove(this.scrollClass), document.documentElement.classList.remove(this.scrollClass)), document.documentElement.scrollTop = e, document.body.style.top = null;
    }
    this.isFixed && it(this.$el);
  }
});
function em(e, t, s, i, a, n) {
  return G((l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [e.overlay && e.isOpen ? (l(), d(
      "div",
      {
        key: 0,
        class: c(e.overlayClasses)
      },
      null,
      2
      /* CLASS */
    )) : y("v-if", !0), O(ye, {
      name: e.transitionName,
      onBeforeEnter: e.beforeEnter,
      onAfterEnter: e.afterEnter,
      persisted: ""
    }, {
      default: M(() => [G(v(
        "div",
        {
          ref: "sidebarContent",
          class: c(e.contentClasses)
        },
        [b(e.$slots, "default")],
        2
        /* CLASS */
      ), [[ee, e.isOpen]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onBeforeEnter", "onAfterEnter"])],
    2
    /* CLASS */
  )), [[ee, !e.hideOnMobile]]);
}
$i.render = em;
$i.__file = "src/components/sidebar/Sidebar.vue";
var tm = {
  install(e) {
    H(e, $i);
  }
};
const Ts = {
  top: "bottom",
  bottom: "top",
  right: "left",
  left: "right"
};
function sm(e, t) {
  const s = Math.max(e.left, t.left), i = Math.min(e.right, t.right), a = Math.max(e.top, t.top), n = Math.min(e.bottom, t.bottom);
  return Math.max(i - s, 0) * Math.max(n - a, 0);
}
const xi = (e) => ({
  top: { x: (e.left + e.right) * 0.5, y: e.top },
  bottom: { x: (e.left + e.right) * 0.5, y: e.bottom },
  left: { x: e.left, y: (e.top + e.bottom) * 0.5 },
  right: { x: e.right, y: (e.top + e.bottom) * 0.5 }
});
var Pt = $({
  name: "OTooltip",
  mixins: [L],
  configField: "tooltip",
  emits: ["open", "close"],
  props: {
    /** Whether tooltip is active or not, use v-model:active to make it two-way binding */
    active: {
      type: Boolean,
      default: !0
    },
    /** Tooltip text */
    label: String,
    /** Tooltip delay before it appears (number in ms) */
    delay: Number,
    /**
     * Tooltip position in relation to the element
     * @values top, bottom, left, right,
     */
    position: {
      type: String,
      default: () => m(p(), "tooltip.position", "top"),
      validator: (e) => [
        "top",
        "bottom",
        "left",
        "right",
        "auto"
      ].indexOf(e) > -1
    },
    /**
     * Tooltip trigger events
     * @values hover, click, focus, contextmenu
     */
    triggers: {
      type: Array,
      default: () => m(p(), "tooltip.triggers", ["hover"])
    },
    /** Tooltip will be always active */
    always: Boolean,
    /** Tooltip will have an animation */
    animated: {
      type: Boolean,
      default: !0
    },
    /** Tooltip default animation */
    animation: {
      type: String,
      default: () => m(p(), "tooltip.animation", "fade")
    },
    /**
     * Tooltip auto close options
     * @values true, false, 'inside', 'outside'
     */
    autoClose: {
      type: [Array, Boolean],
      default: !0
    },
    /** Tooltip will be multilined */
    multiline: Boolean,
    /** Append tooltip content to body */
    appendToBody: Boolean,
    /**
    * Color of the tooltip
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Function, Array],
    rootClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    orderClass: [String, Function, Array],
    triggerClass: [String, Function, Array],
    multilineClass: [String, Function, Array],
    alwaysClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    arrowClass: [String, Function, Array],
    arrowOrderClass: [String, Function, Array]
  },
  data() {
    return {
      isActive: !1,
      triggerStyle: {},
      bodyEl: void 0,
      metrics: null
      // Used for automatic tooltip positioning
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-tip")
      ];
    },
    triggerClasses() {
      return [
        this.computedClass("triggerClass", "o-tip__trigger")
      ];
    },
    arrowClasses() {
      return [
        this.computedClass("arrowClass", "o-tip__arrow"),
        { [this.computedClass("arrowOrderClass", "o-tip__arrow--", this.newPosition)]: this.newPosition },
        { [this.computedClass("variantArrowClass", "o-tip__arrow--", this.variant)]: this.variant }
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-tip__content"),
        { [this.computedClass("orderClass", "o-tip__content--", this.newPosition)]: this.newPosition },
        { [this.computedClass("variantClass", "o-tip__content--", this.variant)]: this.variant },
        { [this.computedClass("multilineClass", "o-tip__content--multiline")]: this.multiline },
        { [this.computedClass("alwaysClass", "o-tip__content--always")]: this.always }
      ];
    },
    newAnimation() {
      return this.animated ? this.animation : void 0;
    },
    newPosition() {
      if (this.position !== "auto")
        return this.position;
      const e = m(p(), "tooltip.position", "top");
      let t = e;
      if (this.metrics != null) {
        let s;
        const i = window.visualViewport;
        i != null ? Ed() ? s = new DOMRect(0, 0, i.width, i.height) : s = new DOMRect(i.offsetLeft, i.offsetTop, i.width, i.height) : s = new DOMRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
        const a = xi(this.metrics.trigger), n = this.metrics.content, r = xi(n), o = (f) => {
          const E = a[f], P = r[Ts[f]];
          return new DOMRect(n.x + (E.x - P.x), n.y + (E.y - P.y), n.width, n.height);
        }, u = Ts[e], h = e === "top" || e === "bottom" ? "left" : "top", g = Ts[h], R = [e, u, h, g];
        let Q = 0;
        for (const f of R) {
          const E = sm(s, o(f));
          E > Q && (Q = E, t = f);
        }
      }
      return t;
    }
  },
  watch: {
    isActive(e) {
      this.$emit(e ? "open" : "close"), e && this.position === "auto" && this.$nextTick(() => {
        this.metrics = {
          content: this.$refs.content.getBoundingClientRect(),
          trigger: this.$refs.trigger.getBoundingClientRect()
        };
      }), e && this.appendToBody && this.updateAppendToBody();
    }
  },
  methods: {
    updateAppendToBody() {
      const e = this.$refs.tooltip, t = this.$refs.trigger;
      if (e && t) {
        const s = this.$data.bodyEl.children[0];
        s.classList.forEach((o) => s.classList.remove(...o.split(" "))), this.$vnode && this.$vnode.data && this.$vnode.data.staticClass && s.classList.add(this.$vnode.data.staticClass), this.rootClasses.forEach((o) => {
          typeof o == "object" ? Object.keys(o).filter((u) => u && o[u]).forEach((u) => s.classList.add(u)) : s.classList.add(...o.split(" "));
        }), s.style.width = `${t.clientWidth}px`, s.style.height = `${t.clientHeight}px`;
        const i = t.getBoundingClientRect(), a = i.top + window.scrollY, n = i.left + window.scrollX, r = this.$data.bodyEl;
        r.style.position = "absolute", r.style.top = `${a}px`, r.style.left = `${n}px`, r.style.zIndex = this.isActive || this.always ? "99" : "-1", this.triggerStyle = { zIndex: this.isActive || this.always ? "100" : void 0 };
      }
    },
    onClick() {
      this.triggers.indexOf("click") < 0 || this.$nextTick(() => {
        setTimeout(() => this.open());
      });
    },
    onHover() {
      this.triggers.indexOf("hover") < 0 || this.open();
    },
    onFocus() {
      this.triggers.indexOf("focus") < 0 || this.open();
    },
    onContextMenu(e) {
      this.triggers.indexOf("contextmenu") < 0 || (e.preventDefault(), this.open());
    },
    open() {
      this.delay ? this.timer = setTimeout(() => {
        this.isActive = !0, this.timer = null;
      }, this.delay) : this.isActive = !0;
    },
    close() {
      typeof this.autoClose == "boolean" && (this.isActive = !this.autoClose), this.autoClose && this.timer && clearTimeout(this.timer);
    },
    /**
    * Close tooltip if clicked outside.
    */
    clickedOutside(e) {
      this.isActive && Array.isArray(this.autoClose) && (this.autoClose.indexOf("outside") >= 0 && (this.isInWhiteList(e.target) || (this.isActive = !1)), this.autoClose.indexOf("inside") >= 0 && this.isInWhiteList(e.target) && (this.isActive = !1));
    },
    /**
     * Keypress event that is bound to the document
     */
    keyPress({ key: e }) {
      this.isActive && (e === "Escape" || e === "Esc") && Array.isArray(this.autoClose) && this.autoClose.indexOf("escape") >= 0 && (this.isActive = !1);
    },
    /**
    * White-listed items to not close when clicked.
    */
    isInWhiteList(e) {
      if (e === this.$refs.content)
        return !0;
      if (this.$refs.content !== void 0) {
        const t = this.$refs.content.querySelectorAll("*");
        for (const s of t)
          if (e === s)
            return !0;
      }
      return !1;
    }
  },
  mounted() {
    this.appendToBody && (this.$data.bodyEl = ci(this.$refs.content), this.updateAppendToBody());
  },
  created() {
    typeof window < "u" && (document.addEventListener("click", this.clickedOutside), document.addEventListener("keyup", this.keyPress));
  },
  beforeUnmount() {
    typeof window < "u" && (document.removeEventListener("click", this.clickedOutside), document.removeEventListener("keyup", this.keyPress)), this.appendToBody && it(this.$data.bodyEl);
  }
});
function im(e, t, s, i, a, n) {
  return l(), d(
    "div",
    {
      ref: "tooltip",
      class: c(e.rootClasses)
    },
    [O(ye, {
      name: e.newAnimation,
      onAfterLeave: t[0] || (t[0] = (r) => e.metrics = null),
      onEnterCancelled: t[1] || (t[1] = (r) => e.metrics = null),
      persisted: ""
    }, {
      default: M(() => [G(v(
        "div",
        {
          ref: "content",
          class: c(e.contentClasses)
        },
        [v(
          "span",
          {
            class: c(e.arrowClasses)
          },
          null,
          2
          /* CLASS */
        ), e.label ? (l(), d(
          V,
          {
            key: 0
          },
          [se(
            F(e.label),
            1
            /* TEXT */
          )],
          64
          /* STABLE_FRAGMENT */
        )) : e.$slots.default ? b(e.$slots, "content", {
          key: 1
        }) : y("v-if", !0)],
        2
        /* CLASS */
      ), [[ee, e.active && (e.isActive || e.always)]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"]), v(
      "div",
      {
        ref: "trigger",
        class: c(e.triggerClasses),
        style: me(e.triggerStyle),
        onClick: t[2] || (t[2] = (...r) => e.onClick && e.onClick(...r)),
        onContextmenu: t[3] || (t[3] = (...r) => e.onContextMenu && e.onContextMenu(...r)),
        onMouseenter: t[4] || (t[4] = (...r) => e.onHover && e.onHover(...r)),
        onFocusCapture: t[5] || (t[5] = (...r) => e.onFocus && e.onFocus(...r)),
        onBlurCapture: t[6] || (t[6] = (...r) => e.close && e.close(...r)),
        onMouseleave: t[7] || (t[7] = (...r) => e.close && e.close(...r))
      },
      [b(e.$slots, "default", {
        ref: "slot"
      })],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    )],
    2
    /* CLASS */
  );
}
Pt.render = im;
Pt.__file = "src/components/tooltip/Tooltip.vue";
var is = $({
  name: "OSliderThumb",
  components: {
    [Pt.name]: Pt
  },
  configField: "slider",
  inheritAttrs: !1,
  inject: ["$slider"],
  emits: ["update:modelValue", "dragstart", "dragend"],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    variant: {
      type: String,
      default: ""
    },
    tooltip: {
      type: Boolean,
      default: !0
    },
    indicator: {
      type: Boolean,
      default: !1
    },
    customFormatter: Function,
    format: {
      type: String,
      default: "raw",
      validator: (e) => [
        "raw",
        "percent"
      ].indexOf(e) >= 0
    },
    locale: {
      type: [String, Array],
      default: () => m(p(), "locale")
    },
    tooltipAlways: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      isFocused: !1,
      dragging: !1,
      startX: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.modelValue
    };
  },
  computed: {
    getSlider() {
      return this.$slider;
    },
    disabled() {
      return this.$parent.disabled;
    },
    max() {
      return this.$parent.max;
    },
    min() {
      return this.$parent.min;
    },
    step() {
      return this.$parent.step;
    },
    precision() {
      return this.$parent.precision;
    },
    currentPosition() {
      return `${(this.modelValue - this.min) / (this.max - this.min) * 100}%`;
    },
    wrapperStyle() {
      return { left: this.currentPosition };
    },
    formattedValue() {
      return typeof this.customFormatter < "u" ? this.customFormatter(this.modelValue) : this.format === "percent" ? new Intl.NumberFormat(this.locale, {
        style: "percent"
      }).format((this.modelValue - this.min) / (this.max - this.min)) : new Intl.NumberFormat(this.locale).format(this.modelValue);
    }
  },
  methods: {
    onFocus() {
      this.isFocused = !0;
    },
    onBlur() {
      this.isFocused = !1;
    },
    onButtonDown(e) {
      this.disabled || (e.preventDefault(), this.onDragStart(e), typeof window < "u" && (document.addEventListener("mousemove", this.onDragging), document.addEventListener("touchmove", this.onDragging), document.addEventListener("mouseup", this.onDragEnd), document.addEventListener("touchend", this.onDragEnd), document.addEventListener("contextmenu", this.onDragEnd)));
    },
    onLeftKeyDown() {
      this.disabled || this.modelvalue === this.min || (this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100, this.setPosition(this.newPosition), this.$parent.emitValue("change"));
    },
    onRightKeyDown() {
      this.disabled || this.modelvalue === this.max || (this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100, this.setPosition(this.newPosition), this.$parent.emitValue("change"));
    },
    onHomeKeyDown() {
      this.disabled || this.modelvalue === this.min || (this.newPosition = 0, this.setPosition(this.newPosition), this.$parent.emitValue("change"));
    },
    onEndKeyDown() {
      this.disabled || this.modelvalue === this.max || (this.newPosition = 100, this.setPosition(this.newPosition), this.$parent.emitValue("change"));
    },
    onDragStart(e) {
      this.dragging = !0, this.$emit("dragstart"), e.type === "touchstart" && (e.clientX = e.touches[0].clientX), this.startX = e.clientX, this.startPosition = parseFloat(this.currentPosition), this.newPosition = this.startPosition;
    },
    onDragging(e) {
      if (this.dragging) {
        e.type === "touchmove" && (e.clientX = e.touches[0].clientX);
        const t = (e.clientX - this.startX) / this.$parent.sliderSize() * 100;
        this.newPosition = this.startPosition + t, this.setPosition(this.newPosition);
      }
    },
    onDragEnd() {
      this.dragging = !1, this.$emit("dragend"), this.modelvalue !== this.oldValue && this.$parent.emitValue("change"), this.setPosition(this.newPosition), typeof window < "u" && (document.removeEventListener("mousemove", this.onDragging), document.removeEventListener("touchmove", this.onDragging), document.removeEventListener("mouseup", this.onDragEnd), document.removeEventListener("touchend", this.onDragEnd), document.removeEventListener("contextmenu", this.onDragEnd));
    },
    setPosition(e) {
      if (e === null || isNaN(e))
        return;
      e < 0 ? e = 0 : e > 100 && (e = 100);
      const t = 100 / ((this.max - this.min) / this.step);
      let i = Math.round(e / t) * t / 100 * (this.max - this.min) + this.min;
      i = parseFloat(i.toFixed(this.precision)), this.$emit("update:modelValue", i), !this.dragging && i !== this.oldValue && (this.oldValue = i);
    }
  }
});
const am = ["tabindex"], nm = {
  key: 0
};
function rm(e, t, s, i, a, n) {
  const r = w("o-tooltip");
  return l(), d(
    "div",
    {
      class: c(e.getSlider.thumbWrapperClasses),
      style: me(e.wrapperStyle)
    },
    [O(r, {
      label: e.formattedValue,
      variant: e.variant,
      always: e.dragging || e.isFocused || e.tooltipAlways,
      active: !e.disabled && e.tooltip
    }, {
      default: M(() => [v("div", N(e.$attrs, {
        class: e.getSlider.thumbClasses,
        tabindex: e.disabled ? null : 0,
        onMousedown: t[0] || (t[0] = (...o) => e.onButtonDown && e.onButtonDown(...o)),
        onTouchstart: t[1] || (t[1] = (...o) => e.onButtonDown && e.onButtonDown(...o)),
        onFocus: t[2] || (t[2] = (...o) => e.onFocus && e.onFocus(...o)),
        onBlur: t[3] || (t[3] = (...o) => e.onBlur && e.onBlur(...o)),
        onKeydown: [t[4] || (t[4] = U(T((...o) => e.onLeftKeyDown && e.onLeftKeyDown(...o), ["prevent"]), ["left"])), t[5] || (t[5] = U(T((...o) => e.onRightKeyDown && e.onRightKeyDown(...o), ["prevent"]), ["right"])), t[6] || (t[6] = U(T((...o) => e.onLeftKeyDown && e.onLeftKeyDown(...o), ["prevent"]), ["down"])), t[7] || (t[7] = U(T((...o) => e.onRightKeyDown && e.onRightKeyDown(...o), ["prevent"]), ["up"])), t[8] || (t[8] = U(T((...o) => e.onHomeKeyDown && e.onHomeKeyDown(...o), ["prevent"]), ["home"])), t[9] || (t[9] = U(T((...o) => e.onEndKeyDown && e.onEndKeyDown(...o), ["prevent"]), ["end"]))]
      }), [e.indicator ? (l(), d(
        "span",
        nm,
        F(e.formattedValue),
        1
        /* TEXT */
      )) : y("v-if", !0)], 16, am)]),
      _: 1
      /* STABLE */
    }, 8, ["label", "variant", "always", "active"])],
    6
    /* CLASS, STYLE */
  );
}
is.render = rm;
is.__file = "src/components/slider/SliderThumb.vue";
var Vt = $({
  name: "OSliderTick",
  mixins: [L],
  configField: "slider",
  inject: ["$slider"],
  props: {
    /** Value of single tick */
    value: {
      variant: Number,
      default: 0
    },
    tickClass: [String, Function, Array],
    tickHiddenClass: [String, Function, Array],
    tickLabelClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("tickClass", "o-slide__tick"),
        { [this.computedClass("tickHiddenClass", "o-slide__tick--hidden")]: this.hidden }
      ];
    },
    tickLabelClasses() {
      return [
        this.computedClass("tickLabelClass", "o-slide__tick-label")
      ];
    },
    position() {
      const e = (this.value - this.$parent.min) / (this.$parent.max - this.$parent.min) * 100;
      return e >= 0 && e <= 100 ? e : 0;
    },
    hidden() {
      return this.value === this.$parent.min || this.value === this.$parent.max;
    },
    tickStyle() {
      return { left: this.position + "%" };
    }
  },
  created() {
    if (!this.$slider)
      throw new Error("You should wrap oSliderTick on a oSlider");
  }
});
function om(e, t, s, i, a, n) {
  return l(), d(
    "div",
    {
      class: c(e.rootClasses),
      style: me(e.tickStyle)
    },
    [e.$slots.default ? (l(), d(
      "span",
      {
        key: 0,
        class: c(e.tickLabelClasses)
      },
      [b(e.$slots, "default")],
      2
      /* CLASS */
    )) : y("v-if", !0)],
    6
    /* CLASS, STYLE */
  );
}
Vt.render = om;
Vt.__file = "src/components/slider/SliderTick.vue";
var Ai = $({
  name: "OSlider",
  components: {
    [is.name]: is,
    [Vt.name]: Vt
  },
  configField: "slider",
  mixins: [L],
  provide() {
    return {
      $slider: this
    };
  },
  emits: ["update:modelValue", "change", "dragging", "dragstart", "dragend"],
  props: {
    /** @model */
    modelValue: {
      type: [Number, Array],
      default: 0
    },
    /** Minimum value */
    min: {
      type: Number,
      default: 0
    },
    /** Maximum  value */
    max: {
      type: Number,
      default: 100
    },
    /** Step interval of ticks */
    step: {
      type: Number,
      default: 1
    },
    /**
     * Color of the slider
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
      type: String
    },
    /**
     * Vertical size of slider, optional
     * @values small, medium, large
     */
    size: String,
    /** Show tick marks */
    ticks: {
      type: Boolean,
      default: !1
    },
    /** Show tooltip when thumb is being dragged */
    tooltip: {
      type: Boolean,
      default: () => m(p(), "slider.tooltip", !0)
    },
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    tooltipVariant: String,
    /** Rounded thumb */
    rounded: {
      type: Boolean,
      default: () => m(p(), "slider.rounded", !1)
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    /** Update v-model only when dragging is finished */
    lazy: {
      type: Boolean,
      default: !1
    },
    /** Function to format the tooltip label for display */
    customFormatter: Function,
    ariaLabel: [String, Array],
    /** Increases slider size on focus */
    biggerSliderFocus: {
      type: Boolean,
      default: !1
    },
    indicator: {
      type: Boolean,
      default: !1
    },
    format: {
      type: String,
      default: "raw",
      validator: (e) => [
        "raw",
        "percent"
      ].indexOf(e) >= 0
    },
    locale: {
      type: [String, Array],
      default: () => m(p(), "locale")
    },
    /** Tooltip displays always */
    tooltipAlways: {
      type: Boolean,
      default: !1
    },
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    trackClass: [String, Function, Array],
    fillClass: [String, Function, Array],
    thumbRoundedClass: [String, Function, Array],
    thumbDraggingClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    thumbWrapperClass: [String, Function, Array],
    thumbClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  data() {
    return {
      value1: null,
      value2: null,
      dragging: !1,
      isRange: !1
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-slide"),
        { [this.computedClass("sizeClass", "o-slide--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-slide--disabled")]: this.disabled }
      ];
    },
    trackClasses() {
      return [
        this.computedClass("trackClass", "o-slide__track")
      ];
    },
    fillClasses() {
      return [
        this.computedClass("fillClass", "o-slide__fill"),
        { [this.computedClass("variantClass", "o-slide__fill--", this.variant)]: this.variant }
      ];
    },
    thumbClasses() {
      return [
        this.computedClass("thumbClass", "o-slide__thumb"),
        { [this.computedClass("thumbDraggingClass", "o-slide__thumb--dragging")]: this.dragging },
        { [this.computedClass("thumbRoundedClass", "o-slide__thumb--rounded")]: this.rounded }
      ];
    },
    thumbWrapperClasses() {
      return [
        this.computedClass("thumbWrapperClass", "o-slide__thumb-wrapper")
      ];
    },
    newTooltipVariant() {
      return this.tooltipVariant ? this.tooltipVariant : this.variant;
    },
    tickValues() {
      if (!this.ticks || this.min > this.max || this.step === 0)
        return [];
      const e = [];
      for (let t = this.min + this.step; t < this.max; t = t + this.step)
        e.push(t);
      return e;
    },
    minValue() {
      return Math.min(this.value1, this.value2);
    },
    maxValue() {
      return Math.max(this.value1, this.value2);
    },
    barSize() {
      return this.isRange ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%` : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`;
    },
    barStart() {
      return this.isRange ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%` : "0%";
    },
    precision() {
      const e = [this.min, this.max, this.step].map((t) => {
        const s = ("" + t).split(".")[1];
        return s ? s.length : 0;
      });
      return Math.max(...e);
    },
    barStyle() {
      return {
        width: this.barSize,
        left: this.barStart
      };
    }
  },
  watch: {
    value1() {
      this.onInternalValueUpdate();
    },
    value2() {
      this.onInternalValueUpdate();
    },
    min() {
      this.setValues(this.value);
    },
    max() {
      this.setValues(this.value);
    },
    /**
    * When v-model is changed set the new active step.
    */
    modelValue(e) {
      this.setValues(e);
    }
  },
  methods: {
    setValues(e) {
      if (!(this.min > this.max))
        if (Array.isArray(e)) {
          this.isRange = !0;
          const t = typeof e[0] != "number" || isNaN(e[0]) ? this.min : Math.min(Math.max(this.min, e[0]), this.max), s = typeof e[1] != "number" || isNaN(e[1]) ? this.max : Math.max(Math.min(this.max, e[1]), this.min);
          this.value1 = this.isThumbReversed ? s : t, this.value2 = this.isThumbReversed ? t : s;
        } else
          this.isRange = !1, this.value1 = isNaN(e) ? this.min : Math.min(this.max, Math.max(this.min, e)), this.value2 = null;
    },
    onInternalValueUpdate() {
      this.isRange && (this.isThumbReversed = this.value1 > this.value2), (!this.lazy || !this.dragging) && this.emitValue("update:modelValue"), this.dragging && this.emitValue("dragging");
    },
    sliderSize() {
      return this.$refs.slider.getBoundingClientRect().width;
    },
    onSliderClick(e) {
      if (this.disabled || this.isTrackClickDisabled)
        return;
      const t = this.$refs.slider.getBoundingClientRect().left, s = (e.clientX - t) / this.sliderSize() * 100, i = this.min + s * (this.max - this.min) / 100, a = Math.abs(i - this.value1);
      if (this.isRange) {
        const n = Math.abs(i - this.value2);
        if (a <= n) {
          if (a < this.step / 2)
            return;
          this.$refs.button1.setPosition(s);
        } else {
          if (n < this.step / 2)
            return;
          this.$refs.button2.setPosition(s);
        }
      } else {
        if (a < this.step / 2)
          return;
        this.$refs.button1.setPosition(s);
      }
      this.emitValue("change");
    },
    onDragStart() {
      this.dragging = !0, this.$emit("dragstart");
    },
    onDragEnd() {
      this.isTrackClickDisabled = !0, setTimeout(() => {
        this.isTrackClickDisabled = !1;
      }, 0), this.dragging = !1, this.$emit("dragend"), this.lazy && this.emitValue("update:modelValue");
    },
    emitValue(e) {
      const t = this.isRange ? [this.minValue, this.maxValue] : this.value1;
      this.$emit(e, t);
    }
  },
  created() {
    this.isThumbReversed = !1, this.isTrackClickDisabled = !1, this.setValues(this.modelValue);
  }
});
function lm(e, t, s, i, a, n) {
  const r = w("o-slider-tick"), o = w("o-slider-thumb");
  return l(), d(
    "div",
    {
      onClick: t[2] || (t[2] = (...u) => e.onSliderClick && e.onSliderClick(...u)),
      class: c(e.rootClasses)
    },
    [v(
      "div",
      {
        class: c(e.trackClasses),
        ref: "slider"
      },
      [v(
        "div",
        {
          class: c(e.fillClasses),
          style: me(e.barStyle)
        },
        null,
        6
        /* CLASS, STYLE */
      ), e.ticks ? (l(!0), d(
        V,
        {
          key: 0
        },
        K(e.tickValues, (u, h) => (l(), D(r, {
          key: h,
          value: u
        }, null, 8, ["value"]))),
        128
        /* KEYED_FRAGMENT */
      )) : y("v-if", !0), b(e.$slots, "default"), O(o, {
        modelValue: e.value1,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => e.value1 = u),
        variant: e.newTooltipVariant,
        tooltip: e.tooltip,
        "custom-formatter": e.customFormatter,
        indicator: e.indicator,
        ref: "button1",
        role: "slider",
        format: e.format,
        locale: e.locale,
        "tooltip-always": e.tooltipAlways,
        "aria-valuenow": e.value1,
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-orientation": "horizontal",
        "aria-label": Array.isArray(e.ariaLabel) ? e.ariaLabel[0] : e.ariaLabel,
        "aria-disabled": e.disabled,
        onDragstart: e.onDragStart,
        onDragend: e.onDragEnd
      }, null, 8, ["modelValue", "variant", "tooltip", "custom-formatter", "indicator", "format", "locale", "tooltip-always", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]), e.isRange ? (l(), D(o, {
        key: 1,
        modelValue: e.value2,
        "onUpdate:modelValue": t[1] || (t[1] = (u) => e.value2 = u),
        variant: e.newTooltipVariant,
        tooltip: e.tooltip,
        "custom-formatter": e.customFormatter,
        indicator: e.indicator,
        ref: "button2",
        role: "slider",
        format: e.format,
        locale: e.locale,
        "tooltip-always": e.tooltipAlways,
        "aria-valuenow": e.value2,
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-orientation": "horizontal",
        "aria-label": Array.isArray(e.ariaLabel) ? e.ariaLabel[1] : "",
        "aria-disabled": e.disabled,
        onDragstart: e.onDragStart,
        onDragend: e.onDragEnd
      }, null, 8, ["modelValue", "variant", "tooltip", "custom-formatter", "indicator", "format", "locale", "tooltip-always", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"])) : y("v-if", !0)],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
Ai.render = lm;
Ai.__file = "src/components/slider/Slider.vue";
var um = {
  install(e) {
    H(e, Ai), H(e, Vt);
  }
}, as = $({
  name: "OSlotComponent",
  props: {
    component: {
      type: Object,
      required: !0
    },
    name: {
      type: String,
      default: "default"
    },
    props: {
      type: Object
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  render() {
    const e = this.component.$slots[this.name](this.props);
    return ce(this.tag, {}, e);
  }
}), vn = (e) => $({
  mixins: [ln(e, on)],
  components: {
    [z.name]: z,
    [as.name]: as
  },
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [String, Number],
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],
    /**
     * Tab size, optional
     * @values small, medium, large
     */
    size: String,
    animated: {
      type: Boolean,
      default: !0
    },
    /** Show tab in vertical layout */
    vertical: {
      type: Boolean,
      default: !1
    },
    /**
     * Position of the tab, optional
     * @values centered, right
     */
    position: String,
    /** Destroy tab on hide */
    destroyOnHide: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      activeId: this.modelValue,
      contentHeight: 0,
      isTransitioning: !1
    };
  },
  computed: {
    activeItem() {
      return this.activeId !== void 0 && this.activeId !== null ? this.childItems.filter((t) => t.newValue === this.activeId)[0] : this.items[0];
    },
    activeIndex() {
      return this.childItems.findIndex((t) => t.newValue === this.activeId);
    },
    items() {
      return this.sortedItems;
    }
  },
  watch: {
    /**
     * When v-model is changed set the new active tab.
     */
    modelValue(t) {
      this.activeId !== t && this.performAction(t);
    }
  },
  methods: {
    /**
    * Child click listener, emit input event and change active child.
    */
    childClick(t) {
      this.activeId !== t.newValue && (this.performAction(t.newValue), this.$emit("update:modelValue", this.activeId));
    },
    /**
     * Select the first 'viable' child, starting at startingIndex and in the direction specified
     * by the boolean parameter forward. In other words, first try to select the child at index
     * startingIndex, and if it is not visible or it is disabled, then go to the index in the
     * specified direction until either returning to startIndex or finding a viable child item.
    */
    clickFirstViableChild(t, s) {
      let i = s ? 1 : -1, a = t;
      for (; a !== this.activeIndex && !(this.childItems[a].visible && !this.childItems[a].disabled); a = _t(a + i, this.childItems.length))
        ;
      this.childClick(this.childItems[a]);
    },
    /**
     * Go to the next item or wrap around
    */
    next() {
      let t = _t(this.activeIndex + 1, this.childItems.length);
      this.clickFirstViableChild(t, !0);
    },
    /**
     * Go to the previous item or wrap around
    */
    prev() {
      let t = _t(this.activeIndex - 1, this.childItems.length);
      this.clickFirstViableChild(t, !1);
    },
    /**
     * Go to the first viable item
    */
    homePressed() {
      this.childItems.length < 1 || this.clickFirstViableChild(0, !0);
    },
    /**
     * Go to the last viable item
    */
    endPressed() {
      this.childItems.length < 1 || this.clickFirstViableChild(this.childItems.length - 1, !1);
    },
    /**
    * Activate next child and deactivate prev child
    */
    performAction(t) {
      const s = this.activeId, i = s != null ? this.childItems.filter((a) => a.newValue === s)[0] : this.items[0];
      this.activeId = t, i && this.activeItem && (i.deactivate(this.activeItem.index), this.activeItem.activate(i.index));
    }
  }
}), Sn = (e) => $({
  mixins: [hn(e, dn)],
  props: {
    /**
     * Item value (it will be used as v-model of wrapper component)
     */
    value: [String, Number],
    /**
     * Item label
     */
    label: String,
    /**
     * Icon on the left
     */
    icon: String,
    /**
     * Icon pack
     */
    iconPack: String,
    /**
     * Show/hide item
     */
    visible: {
      type: Boolean,
      default: !0
    },
    /**
     * Header class of the item
     */
    headerClass: [String, Array, Object]
  },
  data() {
    return {
      transitionName: void 0,
      newValue: this.value
    };
  },
  computed: {
    isActive() {
      return this.parent.activeItem === this;
    },
    elementClasses() {
      return [];
    }
  },
  methods: {
    /**
     * Activate element, alter animation name based on the index.
     */
    activate(t) {
      this.transitionName = this.index < t ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev", this.$emit("activate");
    },
    /**
     * Deactivate element, alter animation name based on the index.
     */
    deactivate(t) {
      this.transitionName = t < this.index ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
    }
  },
  render() {
    if (this.parent.destroyOnHide && (!this.isActive || !this.visible))
      return;
    const t = this.$slots.default ? this.$slots.default() : [], s = G(ce("div", {
      class: this.elementClasses,
      "data-id": `${e}-${this.newValue}`,
      tabindex: this.isActive ? 0 : -1
    }, t), [[ee, this.isActive && this.visible]]);
    return this.parent.animated ? ce(ye, {
      name: this.transitionName,
      onBeforeEnter: () => {
        this.parent.isTransitioning = !0;
      },
      onAfterEnter: () => {
        this.parent.isTransitioning = !1;
      }
    }, () => [s]) : s;
  }
}), Mi = $({
  name: "OSteps",
  components: {
    [Ne.name]: Ne,
    [z.name]: z
  },
  configField: "steps",
  mixins: [L, He, vn("step")],
  props: {
    /**
     * Icon pack to use for the navigation
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /** Icon to use for navigation button */
    iconPrev: {
      type: String,
      default: () => m(p(), "steps.iconPrev", "chevron-left")
    },
    /** Icon to use for navigation button */
    iconNext: {
      type: String,
      default: () => m(p(), "steps.iconNext", "chevron-right")
    },
    /**
     * Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items.
     */
    hasNavigation: {
      type: Boolean,
      default: !0
    },
    /**
     * Step navigation is animated
     */
    animated: {
      type: Boolean,
      default: !0
    },
    /**
     * Position of the marker label, optional
     * @values bottom, right, left
     */
    labelPosition: {
      type: String,
      validator(e) {
        return [
          "bottom",
          "right",
          "left"
        ].indexOf(e) > -1;
      },
      default: "bottom"
    },
    /** Rounded step markers */
    rounded: {
      type: Boolean,
      default: !0
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    verticalClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    stepsClass: [String, Function, Array],
    animatedClass: [String, Function, Array],
    stepMarkerRoundedClass: [String, Function, Array],
    stepDividerClass: [String, Function, Array],
    stepMarkerClass: [String, Function, Array],
    stepContentClass: [String, Function, Array],
    stepContentTransitioningClass: [String, Function, Array],
    stepNavigationClass: [String, Function, Array],
    stepLinkClass: [String, Function, Array],
    stepLinkClickableClass: [String, Function, Array],
    stepLinkLabelClass: [String, Function, Array],
    stepLinkLabelPositionClass: [String, Function, Array],
    mobileClass: [String, Function, Array]
  },
  computed: {
    wrapperClasses() {
      return [
        this.computedClass("rootClass", "o-steps__wrapper"),
        { [this.computedClass("sizeClass", "o-steps--", this.size)]: this.size },
        { [this.computedClass("verticalClass", "o-steps__wrapper-vertical")]: this.vertical },
        { [this.computedClass("positionClass", "o-steps__wrapper-position-", this.position)]: this.position && this.vertical },
        { [this.computedClass("mobileClass", "o-steps--mobile")]: this.isMatchMedia }
      ];
    },
    mainClasses() {
      return [
        this.computedClass("stepsClass", "o-steps"),
        { [this.computedClass("animatedClass", "o-steps--animated")]: this.animated }
      ];
    },
    stepDividerClasses() {
      return [
        this.computedClass("stepDividerClass", "o-steps__divider")
      ];
    },
    stepMarkerClasses() {
      return [
        this.computedClass("stepMarkerClass", "o-steps__marker"),
        { [this.computedClass("stepMarkerRoundedClass", "o-steps__marker--rounded")]: this.rounded }
      ];
    },
    stepContentClasses() {
      return [
        this.computedClass("stepContentClass", "o-steps__content"),
        { [this.computedClass("stepContentTransitioningClass", "o-steps__content-transitioning")]: this.isTransitioning }
      ];
    },
    stepNavigationClasses() {
      return [
        this.computedClass("stepNavigationClass", "o-steps__navigation")
      ];
    },
    stepLinkLabelClasses() {
      return [
        this.computedClass("stepLinkLabelClass", "o-steps__title")
      ];
    },
    // Override mixin implementation to always have a value
    activeItem() {
      return this.childItems.filter((e) => e.newValue === this.activeId)[0] || this.items[0];
    },
    /**
     * Check if previous button is available.
     */
    hasPrev() {
      return !!this.prevItem;
    },
    /**
     * Retrieves the next visible item
     */
    nextItem() {
      let e = null, t = this.activeItem ? this.items.indexOf(this.activeItem) + 1 : 0;
      for (; t < this.items.length; t++)
        if (this.items[t].visible) {
          e = this.items[t];
          break;
        }
      return e;
    },
    /**
     * Retrieves the previous visible item
     */
    prevItem() {
      if (!this.activeItem)
        return null;
      let e = null;
      for (let t = this.items.indexOf(this.activeItem) - 1; t >= 0; t--)
        if (this.items[t].visible) {
          e = this.items[t];
          break;
        }
      return e;
    },
    /**
     * Check if next button is available.
     */
    hasNext() {
      return !!this.nextItem;
    },
    navigationProps() {
      return {
        previous: {
          disabled: !this.hasPrev,
          action: this.prev
        },
        next: {
          disabled: !this.hasNext,
          action: this.next
        }
      };
    }
  },
  methods: {
    stepLinkClasses(e) {
      return [
        this.computedClass("stepLinkClass", "o-steps__link"),
        { [this.computedClass("stepLinkLabelPositionClass", "o-steps__link-label-", this.labelPosition)]: this.labelPosition },
        { [this.computedClass("stepLinkClickableClass", "o-steps__link-clickable")]: this.isItemClickable(e) }
      ];
    },
    /**
     * Return if the step should be clickable or not.
     */
    isItemClickable(e) {
      return e.clickable === void 0 ? e.index < this.activeItem.index : e.clickable;
    },
    /**
     * Previous button click listener.
     */
    prev() {
      this.hasPrev && this.childClick(this.prevItem);
    },
    /**
     * Previous button click listener.
     */
    next() {
      this.hasNext && this.childClick(this.nextItem);
    }
  }
});
const dm = ["onClick"], hm = {
  key: 1
};
function cm(e, t, s, i, a, n) {
  const r = w("o-icon"), o = w("o-button");
  return l(), d(
    "div",
    {
      class: c(e.wrapperClasses)
    },
    [v(
      "nav",
      {
        class: c(e.mainClasses)
      },
      [(l(!0), d(
        V,
        null,
        K(e.items, (u, h) => G((l(), d(
          "div",
          {
            key: u.newValue,
            class: c(u.itemClasses)
          },
          [h > 0 ? (l(), d(
            "span",
            {
              key: 0,
              class: c(e.stepDividerClasses)
            },
            null,
            2
            /* CLASS */
          )) : y("v-if", !0), v("a", {
            class: c(e.stepLinkClasses(u)),
            onClick: (g) => e.isItemClickable(u) && e.childClick(u)
          }, [v(
            "div",
            {
              class: c(e.stepMarkerClasses)
            },
            [u.icon ? (l(), D(r, {
              key: 0,
              icon: u.icon,
              pack: u.iconPack,
              size: e.size
            }, null, 8, ["icon", "pack", "size"])) : u.step ? (l(), d(
              "span",
              hm,
              F(u.step),
              1
              /* TEXT */
            )) : y("v-if", !0)],
            2
            /* CLASS */
          ), v(
            "div",
            {
              class: c(e.stepLinkLabelClasses)
            },
            F(u.label),
            3
            /* TEXT, CLASS */
          )], 10, dm)],
          2
          /* CLASS */
        )), [[ee, u.visible]])),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    ), v(
      "section",
      {
        class: c(e.stepContentClasses)
      },
      [b(e.$slots, "default")],
      2
      /* CLASS */
    ), b(e.$slots, "navigation", {
      previous: e.navigationProps.previous,
      next: e.navigationProps.next
    }, () => [e.hasNavigation ? (l(), d(
      "nav",
      {
        key: 0,
        class: c(e.stepNavigationClasses)
      },
      [O(o, {
        role: "button",
        "icon-left": e.iconPrev,
        "icon-pack": e.iconPack,
        "icon-both": "",
        disabled: e.navigationProps.previous.disabled,
        onClick: T(e.navigationProps.previous.action, ["prevent"]),
        "aria-label": e.ariaPreviousLabel
      }, null, 8, ["icon-left", "icon-pack", "disabled", "onClick", "aria-label"]), O(o, {
        role: "button",
        "icon-left": e.iconNext,
        "icon-pack": e.iconPack,
        "icon-both": "",
        disabled: e.navigationProps.next.disabled,
        onClick: T(e.navigationProps.next.action, ["prevent"]),
        "aria-label": e.ariaNextLabel
      }, null, 8, ["icon-left", "icon-pack", "disabled", "onClick", "aria-label"])],
      2
      /* CLASS */
    )) : y("v-if", !0)])],
    2
    /* CLASS */
  );
}
Mi.render = cm;
Mi.__file = "src/components/steps/Steps.vue";
var kn = $({
  name: "OStepItem",
  mixins: [L, Sn("step")],
  configField: "steps",
  props: {
    /** Step marker content (when there is no icon) */
    step: [String, Number],
    /** Default style for the step, optional This will override parent type. Could be used to set a completed step to "success" for example */
    variant: [String, Object],
    /** Item can be used directly to navigate. If undefined, previous steps are clickable while the others are not */
    clickable: {
      type: Boolean,
      default: void 0
    },
    itemClass: [String, Function, Array],
    itemHeaderClass: [String, Function, Array],
    itemHeaderActiveClass: [String, Function, Array],
    itemHeaderPreviousClass: [String, Function, Array],
    itemHeaderVariantClass: [String, Function, Array]
  },
  computed: {
    elementClasses() {
      return [
        this.computedClass("itemClass", "o-steps__item")
      ];
    },
    itemClasses() {
      return [
        this.headerClass,
        this.computedClass("itemHeaderClass", "o-steps__nav-item"),
        { [this.computedClass("itemHeaderVariantClass", "o-steps__nav-item--", this.variant || this.parent.variant)]: this.variant || this.parent.variant },
        { [this.computedClass("itemHeaderActiveClass", "o-steps__nav-item-active")]: this.isActive },
        { [this.computedClass("itemHeaderPreviousClass", "o-steps__nav-item-previous")]: this.parent.activeItem.index > this.index }
      ];
    }
  }
});
kn.__file = "src/components/steps/StepItem.vue";
var mm = {
  install(e) {
    H(e, Mi), H(e, kn);
  }
}, Oi = $({
  name: "OSwitch",
  mixins: [L],
  configField: "switch",
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [String, Number, Boolean],
    /**
     * Same as native value
     */
    nativeValue: [String, Number, Boolean],
    disabled: Boolean,
    /**
     * Color of the switch, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
    * Color of the switch when is passive, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    passiveVariant: String,
    /** Name attribute on native checkbox */
    name: String,
    required: Boolean,
    /**
     * Vertical size of switch, optional
     * @values small, medium, large
     */
    size: String,
    /**
     * Overrides the returned value when it's checked
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: !0
    },
    /**
     * Overrides the returned value when it's not checked
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    /** Rounded style */
    rounded: {
      type: Boolean,
      default: !0
    },
    /** Label position */
    position: {
      type: String,
      default: "right"
    },
    /** Accessibility label to establish relationship between the switch and control label' */
    ariaLabelledby: String,
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkSwitchClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    elementsWrapperClass: [String, Function, Array],
    passiveVariantClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    inputClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue,
      isMouseDown: !1
    };
  },
  computed: {
    getLabel() {
      return this.$refs.label;
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-switch"),
        { [this.computedClass("sizeClass", "o-switch--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-switch--disabled")]: this.disabled },
        { [this.computedClass("variantClass", "o-switch--", this.variant)]: this.variant },
        { [this.computedClass("positionClass", "o-switch--", this.position)]: this.position },
        { [this.computedClass("passiveVariantClass", "o-switch--", this.passiveVariant + "-passive")]: this.passiveVariant }
      ];
    },
    inputClasses() {
      return [
        this.computedClass("inputClass", "o-switch__input")
      ];
    },
    checkClasses() {
      return [
        this.computedClass("checkClass", "o-switch__check"),
        { [this.computedClass("checkCheckedClass", "o-switch__check--checked")]: this.newValue === this.trueValue },
        { [this.computedClass("roundedClass", "o-switch--rounded")]: this.rounded }
      ];
    },
    checkSwitchClasses() {
      return [
        this.computedClass("checkSwitchClass", "o-switch__check-switch"),
        { [this.computedClass("roundedClass", "o-switch--rounded")]: this.rounded }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-switch__label")
      ];
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(e) {
        this.newValue = e, this.$emit("update:modelValue", this.newValue);
      }
    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    modelValue(e) {
      this.newValue = e;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});
const fm = ["disabled", "name", "required", "value", "true-value", "false-value", "aria-labelledby"], pm = ["id"];
function gm(e, t, s, i, a, n) {
  return l(), d(
    "label",
    {
      class: c(e.rootClasses),
      ref: "label",
      onClick: t[2] || (t[2] = (...r) => e.focus && e.focus(...r)),
      onKeydown: t[3] || (t[3] = U(T((r) => e.getLabel.click(), ["prevent"]), ["enter"])),
      onMousedown: t[4] || (t[4] = (r) => e.isMouseDown = !0),
      onMouseup: t[5] || (t[5] = (r) => e.isMouseDown = !1),
      onMouseout: t[6] || (t[6] = (r) => e.isMouseDown = !1),
      onBlur: t[7] || (t[7] = (r) => e.isMouseDown = !1)
    },
    [G(v("input", {
      "onUpdate:modelValue": t[0] || (t[0] = (r) => e.computedValue = r),
      type: "checkbox",
      ref: "input",
      role: "switch",
      class: c(e.inputClasses),
      onClick: t[1] || (t[1] = T(() => {
      }, ["stop"])),
      disabled: e.disabled,
      name: e.name,
      required: e.required,
      value: e.nativeValue,
      "true-value": e.trueValue,
      "false-value": e.falseValue,
      "aria-labelledby": e.ariaLabelledby
    }, null, 10, fm), [[ra, e.computedValue]]), v(
      "span",
      {
        class: c(e.checkClasses)
      },
      [v(
        "span",
        {
          class: c(e.checkSwitchClasses)
        },
        null,
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    ), v("span", {
      id: e.ariaLabelledby,
      class: c(e.labelClasses)
    }, [b(e.$slots, "default")], 10, pm)],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
Oi.render = gm;
Oi.__file = "src/components/switch/Switch.vue";
var ym = {
  install(e) {
    H(e, Oi);
  }
}, ns = $({
  name: "OTableMobileSort",
  components: {
    [Ne.name]: Ne,
    [Le.name]: Le,
    [z.name]: z,
    [tt.name]: tt
  },
  inject: ["$table"],
  emits: ["sort"],
  props: {
    currentSortColumn: Object,
    columns: Array,
    placeholder: String,
    iconPack: String,
    sortIcon: {
      type: String,
      default: "arrow-up"
    },
    sortIconSize: {
      type: String,
      default: "small"
    },
    isAsc: Boolean
  },
  data() {
    return {
      mobileSort: m(this.currentSortColumn, "newKey"),
      defaultEvent: {
        shiftKey: !0,
        altKey: !0,
        ctrlKey: !0
      },
      ignoreSort: !1
    };
  },
  computed: {
    getTable() {
      return this.$table;
    },
    showPlaceholder() {
      return !this.columns || !this.columns.some((e) => m(e, "newKey") === this.mobileSort);
    },
    sortableColumns() {
      return this.columns ? this.columns.filter((e) => e.sortable) : [];
    },
    isCurrentSort() {
      return m(this.currentSortColumn, "newKey") === this.mobileSort;
    }
  },
  watch: {
    mobileSort(e) {
      if (this.currentSortColumn.newKey === e)
        return;
      const t = this.sortableColumns.filter((s) => m(s, "newKey") === e)[0];
      this.$emit("sort", t, this.defaultEvent);
    },
    currentSortColumn(e) {
      this.mobileSort = m(e, "newKey");
    }
  },
  methods: {
    sort() {
      const e = this.sortableColumns.filter((t) => m(t, "newKey") === this.mobileSort)[0];
      this.$emit("sort", e, this.defaultEvent);
    }
  }
});
const Cm = ["value"];
function bm(e, t, s, i, a, n) {
  const r = w("o-select"), o = w("o-icon"), u = w("o-button"), h = w("o-field");
  return l(), d(
    "div",
    {
      class: c(e.getTable.mobileSortClasses)
    },
    [O(h, null, {
      default: M(() => [O(r, {
        modelValue: e.mobileSort,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => e.mobileSort = g),
        expanded: ""
      }, {
        default: M(() => [e.placeholder ? G((l(), d(
          "option",
          {
            key: 0,
            value: {},
            selected: "",
            disabled: "",
            hidden: ""
          },
          F(e.placeholder),
          513
          /* TEXT, NEED_PATCH */
        )), [[ee, e.showPlaceholder]]) : y("v-if", !0), (l(!0), d(
          V,
          null,
          K(e.sortableColumns, (g, R) => (l(), d("option", {
            key: R,
            value: g.newKey
          }, F(g.label), 9, Cm))),
          128
          /* KEYED_FRAGMENT */
        ))]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]), O(u, {
        onClick: e.sort
      }, {
        default: M(() => [G(O(o, {
          icon: e.sortIcon,
          pack: e.iconPack,
          size: e.sortIconSize,
          both: "",
          rotation: e.isAsc ? 0 : 180
        }, null, 8, ["icon", "pack", "size", "rotation"]), [[ee, e.isCurrentSort]])]),
        _: 1
        /* STABLE */
      }, 8, ["onClick"])]),
      _: 1
      /* STABLE */
    })],
    2
    /* CLASS */
  );
}
ns.render = bm;
ns.__file = "src/components/table/TableMobileSort.vue";
var bt = $({
  name: "OTableColumn",
  inject: ["$table"],
  props: {
    label: String,
    customKey: [String, Number],
    field: String,
    meta: [String, Number, Boolean, Function, Object, Array],
    width: [Number, String],
    numeric: Boolean,
    /**
     * Optional, position of column content
     * @values left, centered, right
     */
    position: {
      type: String,
      validator(e) {
        return [
          "left",
          "centered",
          "right"
        ].indexOf(e) > -1;
      }
    },
    searchable: Boolean,
    sortable: Boolean,
    visible: {
      type: Boolean,
      default: !0
    },
    customSort: Function,
    customSearch: Function,
    sticky: Boolean,
    headerSelectable: Boolean,
    /** Adds native attributes to th :th-attrs="(column)" => ({})" */
    thAttrs: {
      type: Function,
      default: () => ({})
    },
    /** Adds native attributes to td :td-attrs="(row, column)" => ({})" */
    tdAttrs: {
      type: Function,
      default: () => ({})
    },
    subheading: String
  },
  data() {
    return {
      newKey: void 0,
      thAttrsData: {},
      tdAttrsData: []
    };
  },
  computed: {
    style() {
      return {
        width: Qe(this.width)
      };
    },
    hasDefaultSlot() {
      return this.$slots.default;
    },
    hasSearchableSlot() {
      return this.$slots.searchable;
    },
    hasHeaderSlot() {
      return this.$slots.header;
    },
    isHeaderUnselectable() {
      return !this.headerSelectable && this.sortable;
    }
  },
  created() {
    if (!this.$table)
      throw new Error("You should wrap oTableColumn on a oTable");
    this.newKey = this.$table._nextSequence(), this.$table._addColumn(this);
  },
  beforeMount() {
    typeof this.thAttrs < "u" && (this.thAttrsData = this.thAttrs(this));
  },
  beforeUnmount() {
    this.$table._removeColumn(this);
  },
  render() {
    return ce("span", { "data-id": this.newKey }, this.label);
  }
});
bt.__file = "src/components/table/TableColumn.vue";
var rs = $({
  name: "OTablePagination",
  components: {
    [Tt.name]: Tt
  },
  emits: ["update:currentPage", "page-change"],
  props: {
    paginated: Boolean,
    total: Number,
    perPage: Number,
    currentPage: Number,
    paginationSimple: Boolean,
    paginationSize: String,
    rounded: Boolean,
    iconPack: String,
    rootClass: [String, Array, Object],
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String
  },
  data() {
    return {
      newCurrentPage: this.currentPage
    };
  },
  watch: {
    currentPage(e) {
      this.newCurrentPage = e;
    }
  },
  methods: {
    /**
    * Paginator change listener.
    */
    pageChanged(e) {
      this.newCurrentPage = e > 0 ? e : 1, this.$emit("update:currentPage", this.newCurrentPage), this.$emit("page-change", this.newCurrentPage);
    }
  }
});
const vm = {
  key: 0
};
function Sm(e, t, s, i, a, n) {
  const r = w("o-pagination");
  return l(), d(
    "div",
    {
      class: c(e.rootClass)
    },
    [v("div", null, [b(e.$slots, "default")]), v("div", null, [e.paginated ? (l(), d("div", vm, [O(r, {
      "icon-pack": e.iconPack,
      total: e.total,
      "per-page": e.perPage,
      simple: e.paginationSimple,
      size: e.paginationSize,
      current: e.newCurrentPage,
      rounded: e.rounded,
      onChange: e.pageChanged,
      "aria-next-label": e.ariaNextLabel,
      "aria-previous-label": e.ariaPreviousLabel,
      "aria-page-label": e.ariaPageLabel,
      "aria-current-label": e.ariaCurrentLabel
    }, null, 8, ["icon-pack", "total", "per-page", "simple", "size", "current", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])])) : y("v-if", !0)])],
    2
    /* CLASS */
  );
}
rs.render = Sm;
rs.__file = "src/components/table/TablePagination.vue";
var Ti = $({
  name: "OTable",
  components: {
    [Ne.name]: Ne,
    [$t.name]: $t,
    [z.name]: z,
    [we.name]: we,
    [ht.name]: ht,
    [as.name]: as,
    [ns.name]: ns,
    [bt.name]: bt,
    [rs.name]: rs
  },
  mixins: [L, He],
  configField: "table",
  inheritAttrs: !1,
  provide() {
    return {
      $table: this
    };
  },
  emits: [
    "page-change",
    "click",
    "dblclick",
    "contextmenu",
    "check",
    "check-all",
    "update:checkedRows",
    "select",
    "update:selected",
    "filters-change",
    "details-open",
    "details-close",
    "update:openedDetailed",
    "mouseenter",
    "mouseleave",
    "sort",
    "sorting-priority-removed",
    "dragstart",
    "dragend",
    "drop",
    "dragleave",
    "dragover",
    "cell-click",
    "columndragstart",
    "columndragend",
    "columndrop",
    "columndragleave",
    "columndragover",
    "update:currentPage"
  ],
  props: {
    /** Table data */
    data: {
      type: Array,
      default: () => []
    },
    /** Table columns */
    columns: {
      type: Array,
      default: () => []
    },
    /** Border to all cells */
    bordered: Boolean,
    /** Whether table is striped */
    striped: Boolean,
    /** Makes the cells narrower */
    narrowed: Boolean,
    /** Rows are highlighted when hovering */
    hoverable: Boolean,
    /** Loading state */
    loading: Boolean,
    /** Allow row details  */
    detailed: Boolean,
    /** Rows can be checked (multiple) */
    checkable: Boolean,
    /** Show check/uncheck all checkbox in table header when checkable */
    headerCheckable: {
      type: Boolean,
      default: !0
    },
    /**
     * Position of the checkbox (if checkable is true)
     * @values left, right
     */
    checkboxPosition: {
      type: String,
      default: "left",
      validator: (e) => [
        "left",
        "right"
      ].indexOf(e) >= 0
    },
    /** Set which row is selected, use v-model:selected to make it two-way binding */
    selected: Object,
    /** Custom method to verify if a row is selectable, works when is selected. */
    isRowSelectable: {
      type: Function,
      default: () => !0
    },
    /** Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering */
    focusable: Boolean,
    /** Custom method to verify if row is checked, works when is checkable. Useful for backend pagination */
    customIsChecked: Function,
    /** Custom method to verify if a row is checkable, works when is checkable */
    isRowCheckable: {
      type: Function,
      default: () => !0
    },
    /** Set which rows are checked, use v-model:checkedRows to make it two-way binding */
    checkedRows: {
      type: Array,
      default: () => []
    },
    /** Rows appears as cards on mobile (collapse rows) */
    mobileCards: {
      type: Boolean,
      default: () => m(p(), "table.mobileCards", !0)
    },
    /** Sets the default sort column and order — e.g. ['first_name', 'desc']	 */
    defaultSort: [String, Array],
    /**
     * Sets the default sort column direction on the first click
     * @values asc, desc
     */
    defaultSortDirection: {
      type: String,
      default: "asc"
    },
    /** Sets the header sorting icon */
    sortIcon: {
      type: String,
      default: () => m(p(), "table.sortIcon", "arrow-up")
    },
    /**
     * Sets the size of the sorting icon
     * @values small, medium, large
     */
    sortIconSize: {
      type: String,
      default: () => m(p(), "table.sortIconSize", "small")
    },
    /** Adds pagination to the table */
    paginated: Boolean,
    /** Current page of table data (if paginated), use v-model:currentPage to make it two-way binding */
    currentPage: {
      type: Number,
      default: 1
    },
    /** How many rows per page (if paginated) */
    perPage: {
      type: [Number, String],
      default: () => m(p(), "table.perPage", 20)
    },
    /** Allow chevron icon and column to be visible */
    showDetailIcon: {
      type: Boolean,
      default: !0
    },
    /** Icon name of detail action */
    detailIcon: {
      type: String,
      default: "chevron-right"
    },
    /**
     * Pagination position (if paginated)
     * @values bottom, top, bot
     */
    paginationPosition: {
      type: String,
      default: () => m(p(), "table.paginationPosition", "bottom"),
      validator: (e) => [
        "bottom",
        "top",
        "both"
      ].indexOf(e) >= 0
    },
    /** Columns won't be sorted with Javascript, use with sort event to sort in your backend */
    backendSorting: Boolean,
    /** Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend */
    backendFiltering: Boolean,
    /** Add a class to row based on the return */
    rowClass: {
      type: Function,
      default: () => ""
    },
    /** Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) */
    openedDetailed: {
      type: Array,
      default: () => []
    },
    /** Controls the visibility of the trigger that toggles the detailed rows. */
    hasDetailedVisible: {
      type: Function,
      default: () => !0
    },
    /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
    detailKey: {
      type: String,
      default: ""
    },
    /** Custom style on details */
    customDetailRow: {
      type: Boolean,
      default: !1
    },
    /* Transition name to use when toggling row details. */
    detailTransition: {
      type: String,
      default: ""
    },
    /** Rows won't be paginated with Javascript, use with page-change event to paginate in your backend */
    backendPagination: Boolean,
    /** Total number of table data if backend-pagination is enabled */
    total: {
      type: [Number, String],
      default: 0
    },
    /** Icon pack to use */
    iconPack: String,
    /** Text when nothing is selected */
    mobileSortPlaceholder: String,
    /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
    customRowKey: String,
    /** Allows rows to be draggable */
    draggable: {
      type: Boolean,
      default: !1
    },
    /** Allows columns to be draggable */
    draggableColumn: {
      type: Boolean,
      default: !1
    },
    /** Add a horizontal scrollbar when table is too wide */
    scrollable: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    /** Show a sticky table header */
    stickyHeader: Boolean,
    /** Table fixed height */
    height: [Number, String],
    /** Add a native event to filter */
    filtersEvent: {
      type: String,
      default: ""
    },
    /** Filtering debounce time (in milliseconds) */
    debounceSearch: Number,
    /** Show header */
    showHeader: {
      type: Boolean,
      default: () => m(p(), "table.showHeader", !0)
    },
    /** Make the checkbox column sticky when checkable */
    stickyCheckbox: {
      type: Boolean,
      default: !1
    },
    /** Rounded pagination if paginated */
    paginationRounded: Boolean,
    /** Size of pagination if paginated */
    paginationSize: String,
    rootClass: [String, Function, Array],
    tableClass: [String, Function, Array],
    wrapperClass: [String, Function, Array],
    footerClass: [String, Function, Array],
    emptyClass: [String, Function, Array],
    detailedClass: [String, Function, Array],
    borderedClass: [String, Function, Array],
    stripedClass: [String, Function, Array],
    narrowedClass: [String, Function, Array],
    hoverableClass: [String, Function, Array],
    thClass: [String, Function, Array],
    tdClass: [String, Function, Array],
    thPositionClass: [String, Function, Array],
    thStickyClass: [String, Function, Array],
    thCheckboxClass: [String, Function, Array],
    thCurrentSortClass: [String, Function, Array],
    thSortableClass: [String, Function, Array],
    thUnselectableClass: [String, Function, Array],
    thSortIconClass: [String, Function, Array],
    thDetailedClass: [String, Function, Array],
    tdPositionClass: [String, Function, Array],
    tdStickyClass: [String, Function, Array],
    tdCheckboxClass: [String, Function, Array],
    tdDetailedChevronClass: [String, Function, Array],
    trSelectedClass: [String, Function, Array],
    trCheckedClass: [String, Function, Array],
    stickyHeaderClass: [String, Function, Array],
    scrollableClass: [String, Function, Array],
    mobileSortClass: [String, Function, Array],
    paginationWrapperClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    thSubheadingClass: [String, Function, Array]
  },
  data() {
    return {
      visibleDetailRows: this.openedDetailed,
      newData: this.data,
      newDataTotal: this.backendPagination ? this.total : this.data.length,
      newCheckedRows: [...this.checkedRows],
      lastCheckedRowIndex: null,
      newCurrentPage: this.currentPage,
      currentSortColumn: {},
      isAsc: !0,
      filters: {},
      defaultSlots: [],
      firstTimeSort: !0,
      sequence: 1,
      isDraggingRow: !1,
      isDraggingColumn: !1
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checkSort();
    });
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-table__root"),
        { [this.computedClass("mobileClass", "o-table__wrapper--mobile")]: this.isMobile }
      ];
    },
    tableClasses() {
      return [
        this.computedClass("tableClass", "o-table"),
        { [this.computedClass("borderedClass", "o-table--bordered")]: this.bordered },
        { [this.computedClass("stripedClass", "o-table--striped")]: this.striped },
        { [this.computedClass("narrowedClass", "o-table--narrowed")]: this.narrowed },
        { [this.computedClass("hoverableClass", "o-table--hoverable")]: (this.hoverable || this.focusable) && this.visibleData.length },
        { [this.computedClass("emptyClass", "o-table--table__empty")]: !this.visibleData.length }
      ];
    },
    tableWrapperClasses() {
      return [
        this.computedClass("wrapperClass", "o-table__wrapper"),
        { [this.computedClass("stickyHeaderClass", "o-table__wrapper--sticky-header")]: this.stickyHeader },
        { [this.computedClass("scrollableClass", "o-table__wrapper--scrollable")]: this.isScrollable },
        { [this.computedClass("mobileClass", "o-table__wrapper--mobile")]: this.isMobile }
      ];
    },
    footerClasses() {
      return [
        this.computedClass("footerClass", "o-table__footer")
      ];
    },
    thBaseClasses() {
      return [
        this.computedClass("thClass", "o-table__th")
      ];
    },
    tdBaseClasses() {
      return [
        this.computedClass("tdClass", "o-table__td")
      ];
    },
    thCheckboxClasses() {
      return [
        ...this.thBaseClasses,
        this.computedClass("thCheckboxClass", "o-table__th-checkbox")
      ];
    },
    thDetailedClasses() {
      return [
        ...this.thBaseClasses,
        this.computedClass("thDetailedClass", "o-table__th--detailed")
      ];
    },
    thSubheadingClasses() {
      return [
        ...this.thBaseClasses,
        this.computedClass("thSubheadingClass", "o-table__th")
      ];
    },
    tdCheckboxClasses() {
      return [
        ...this.tdBaseClasses,
        this.computedClass("tdCheckboxClass", "o-table__td-checkbox"),
        ...this.thStickyClasses({ sticky: this.stickyCheckbox })
      ];
    },
    detailedClasses() {
      return [
        this.computedClass("detailedClass", "o-table__detail")
      ];
    },
    tdDetailedChevronClasses() {
      return [
        ...this.tdBaseClasses,
        this.computedClass("tdDetailedChevronClass", "o-table__td-chevron")
      ];
    },
    mobileSortClasses() {
      return [
        this.computedClass("mobileSortClass", "o-table__mobile-sort")
      ];
    },
    paginationWrapperClasses() {
      return [
        this.computedClass("paginationWrapperClass", "o-table__pagination")
      ];
    },
    tableWrapperStyle() {
      return {
        height: Qe(this.height)
      };
    },
    /**
    * Splitted data based on the pagination.
    */
    visibleData() {
      if (!this.paginated)
        return this.newData;
      const e = this.newCurrentPage, t = this.perPage;
      if (this.newData.length <= t)
        return this.newData;
      {
        const s = (e - 1) * t, i = s + parseInt(t, 10);
        return this.newData.slice(s, i);
      }
    },
    visibleColumns() {
      return this.newColumns ? this.newColumns.filter((e) => e.visible || e.visible === void 0) : this.newColumns;
    },
    /**
    * Check if all rows in the page are checked.
    */
    isAllChecked() {
      const e = this.visibleData.filter((s) => this.isRowCheckable(s));
      return e.length === 0 ? !1 : !e.some((s) => Ms(this.newCheckedRows, s, this.customIsChecked) < 0);
    },
    /**
    * Check if all rows in the page are checkable.
    */
    isAllUncheckable() {
      return this.visibleData.filter((t) => this.isRowCheckable(t)).length === 0;
    },
    /**
    * Check if has any sortable column.
    */
    hasSortablenewColumns() {
      return this.newColumns.some((e) => e.sortable);
    },
    /**
    * Check if has any searchable column.
    */
    hasSearchablenewColumns() {
      return this.newColumns.some((e) => e.searchable);
    },
    /**
    * Return total column count based if it's checkable or expanded
    */
    columnCount() {
      let e = this.visibleColumns.length;
      return e += this.checkable ? 1 : 0, e += this.detailed && this.showDetailIcon ? 1 : 0, e;
    },
    /**
    * return if detailed row tabled
    * will be with chevron column & icon or not
    */
    showDetailRowIcon() {
      return this.detailed && this.showDetailIcon;
    },
    /**
    * return if scrollable table
    */
    isScrollable() {
      return this.scrollable ? !0 : this.newColumns ? this.newColumns.some((e) => e.sticky) : !1;
    },
    newColumns() {
      return this.columns && this.columns.length ? this.columns.map((e) => {
        const t = O(bt, e, (s) => [ce("span", {}, m(s.row, e.field))]);
        return qn(t).provide("$table", this).mount(document.createElement("div"));
      }) : this.defaultSlots;
    },
    isMobile() {
      return this.mobileCards && this.isMatchMedia;
    },
    hasCustomSubheadings() {
      return this.$slots.subheading ? !0 : this.newColumns.some((e) => e.subheading || e.$slots.subheading);
    },
    canDragRow() {
      return this.draggable && !this.isDraggingColumn;
    },
    canDragColumn() {
      return this.draggableColumn && !this.isDraggingRow;
    }
  },
  watch: {
    /**
    * When data prop change:
    *   1. Update internal value.
    *   2. Filter data if it's not backend-filtered.
    *   3. Sort again if it's not backend-sorted.
    *   4. Set new total if it's not backend-paginated.
    */
    data: {
      handler(e) {
        this.backendFiltering ? this.newData = [...e] : this.newData = e.filter((t) => this.isRowFiltered(t)), this.backendSorting || this.sort(this.currentSortColumn, !0), this.backendPagination || (this.newDataTotal = this.newData.length);
      },
      deep: !0
    },
    visibleColumns: {
      handler() {
        this.processTdAttrs();
      }
    },
    visibleData: {
      handler() {
        this.processTdAttrs();
      }
    },
    /**
    * When Pagination total change, update internal total
    * only if it's backend-paginated.
    */
    total(e) {
      this.backendPagination && (this.newDataTotal = e);
    },
    currentPage(e) {
      this.newCurrentPage = e;
    },
    /**
    * When checkedRows prop change, update internal value without
    * mutating original data.
    */
    checkedRows: {
      handler(e) {
        this.newCheckedRows = [...e];
      },
      deep: !0
    },
    debounceSearch: {
      handler(e) {
        this.debouncedHandleFiltersChange = tn(this.handleFiltersChange, e);
      },
      immediate: !0
    },
    filters: {
      handler(e) {
        this.debounceSearch ? this.debouncedHandleFiltersChange(e) : this.handleFiltersChange(e);
      },
      deep: !0
    },
    /**
    * When the user wants to control the detailed rows via props.
    * Or wants to open the details of certain row with the router for example.
    */
    openedDetailed(e) {
      this.visibleDetailRows = e;
    },
    newCurrentPage(e) {
      this.$emit("update:currentPage", e);
    }
  },
  methods: {
    thClasses(e) {
      return [
        ...this.thBaseClasses,
        ...this.thStickyClasses(e),
        { [this.computedClass("thCurrentSortClass", "o-table__th-current-sort")]: this.currentSortColumn === e },
        { [this.computedClass("thSortableClass", "o-table__th--sortable")]: e.sortable },
        { [this.computedClass("thUnselectableClass", "o-table__th--unselectable")]: e.isHeaderUnselectable },
        { [this.computedClass("thPositionClass", "o-table__th--", e.position)]: e.position }
      ];
    },
    thStickyClasses(e) {
      return [
        { [this.computedClass("thStickyClass", "o-table__th--sticky")]: e.sticky }
      ];
    },
    rowClasses(e, t) {
      return [
        this.rowClass(e, t),
        { [this.computedClass("trSelectedClass", "o-table__tr--selected")]: this.isRowSelected(e, this.selected) },
        { [this.computedClass("trCheckedClass", "o-table__tr--checked")]: this.isRowChecked(e) }
      ];
    },
    thSortIconClasses() {
      return [
        this.computedClass("thSortIconClass", "o-table__th__sort-icon")
      ];
    },
    tdClasses(e, t) {
      return [
        ...this.tdBaseClasses,
        { [this.computedClass("tdPositionClass", "o-table__td--", t.position)]: t.position },
        { [this.computedClass("tdStickyClass", "o-table__td--sticky")]: t.sticky }
      ];
    },
    onFiltersEvent(e) {
      this.$emit(`filters-event-${this.filtersEvent}`, { event: e, filters: this.filters });
    },
    handleFiltersChange(e) {
      this.backendFiltering ? this.$emit("filters-change", e) : (this.newData = this.data.filter((t) => this.isRowFiltered(t)), this.backendPagination || (this.newDataTotal = this.newData.length), this.backendSorting || Object.keys(this.currentSortColumn).length > 0 && this.doSortSingleColumn(this.currentSortColumn));
    },
    /**
    * Sort an array by key without mutating original data.
    * Call the user sort function if it was passed.
    */
    sortBy(e, t, s, i) {
      let a = [];
      return s && typeof s == "function" ? a = [...e].sort((n, r) => s(n, r, i)) : a = [...e].sort((n, r) => {
        let o = m(n, t), u = m(r, t);
        return typeof o == "boolean" && typeof u == "boolean" ? i ? o > u ? 1 : -1 : o > u ? -1 : 1 : !o && o !== 0 ? 1 : !u && u !== 0 ? -1 : o === u ? 0 : (o = typeof o == "string" ? o.toUpperCase() : o, u = typeof u == "string" ? u.toUpperCase() : u, i ? o > u ? 1 : -1 : o > u ? -1 : 1);
      }), a;
    },
    /**
    * Sort the column.
    * Toggle current direction on column if it's sortable
    * and not just updating the prop.
    */
    sort(e, t = !1, s = null) {
      !e || !e.sortable || (t || (this.isAsc = e === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== "desc"), this.firstTimeSort || this.$emit("sort", e.field, this.isAsc ? "asc" : "desc", s), this.backendSorting || this.doSortSingleColumn(e), this.currentSortColumn = e);
    },
    doSortSingleColumn(e) {
      this.newData = this.sortBy(this.newData, e.field, e.customSort, this.isAsc);
    },
    isRowSelected(e, t) {
      return t ? this.customRowKey ? e[this.customRowKey] === t[this.customRowKey] : e === t : !1;
    },
    /**
    * Check if the row is checked (is added to the array).
    */
    isRowChecked(e) {
      return Ms(this.newCheckedRows, e, this.customIsChecked) >= 0;
    },
    /**
    * Remove a checked row from the array.
    */
    removeCheckedRow(e) {
      const t = Ms(this.newCheckedRows, e, this.customIsChecked);
      t >= 0 && this.newCheckedRows.splice(t, 1);
    },
    /**
    * Header checkbox click listener.
    * Add or remove all rows in current page.
    */
    checkAll() {
      const e = this.isAllChecked;
      this.visibleData.forEach((t) => {
        this.isRowCheckable(t) && this.removeCheckedRow(t), e || this.isRowCheckable(t) && this.newCheckedRows.push(t);
      }), this.$emit("check", this.newCheckedRows), this.$emit("check-all", this.newCheckedRows), this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /**
    * Row checkbox click listener.
    */
    checkRow(e, t, s) {
      if (!this.isRowCheckable(e))
        return;
      const i = this.lastCheckedRowIndex;
      this.lastCheckedRowIndex = t, s.shiftKey && i !== null && t !== i ? this.shiftCheckRow(e, t, i) : this.isRowChecked(e) ? this.removeCheckedRow(e) : this.newCheckedRows.push(e), this.$emit("check", this.newCheckedRows, e), this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /**
     * Check row when shift is pressed.
     */
    shiftCheckRow(e, t, s) {
      const i = this.visibleData.slice(Math.min(t, s), Math.max(t, s) + 1), a = !this.isRowChecked(e);
      i.forEach((n) => {
        this.removeCheckedRow(n), a && this.isRowCheckable(n) && this.newCheckedRows.push(n);
      });
    },
    /**
    * Row click listener.
    * Emit all necessary events.
    */
    selectRow(e, t) {
      this.$emit("click", e, t), this.selected !== e && this.isRowSelectable(e) && (this.$emit("select", e, this.selected), this.$emit("update:selected", e));
    },
    /**
    * Toggle to show/hide details slot
    */
    toggleDetails(e) {
      this.isVisibleDetailRow(e) ? (this.closeDetailRow(e), this.$emit("details-close", e)) : (this.openDetailRow(e), this.$emit("details-open", e)), this.$emit("update:openedDetailed", this.visibleDetailRows);
    },
    openDetailRow(e) {
      const t = this.handleDetailKey(e);
      this.visibleDetailRows.push(t);
    },
    closeDetailRow(e) {
      const t = this.handleDetailKey(e), s = this.visibleDetailRows.indexOf(t);
      s >= 0 && this.visibleDetailRows.splice(s, 1);
    },
    isVisibleDetailRow(e) {
      const t = this.handleDetailKey(e);
      return this.visibleDetailRows.indexOf(t) >= 0;
    },
    isActiveDetailRow(e) {
      return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(e);
    },
    isActiveCustomDetailRow(e) {
      return this.detailed && this.customDetailRow && this.isVisibleDetailRow(e);
    },
    isRowFiltered(e) {
      for (const t in this.filters) {
        if (!this.filters[t])
          continue;
        const s = this.filters[t], i = this.newColumns.filter((a) => a.field === t)[0];
        if (i && i.customSearch && typeof i.customSearch == "function") {
          if (!i.customSearch(e, s))
            return !1;
        } else {
          const a = m(e, t);
          if (a == null)
            return !1;
          if (Number.isInteger(a)) {
            if (a !== Number(s))
              return !1;
          } else {
            const n = new RegExp(Yd(s), "i");
            if (Array.isArray(a)) {
              if (!a.some((o) => n.test(ji(o)) || n.test(o)))
                return !1;
            } else if (!n.test(ji(a)) && !n.test(a))
              return !1;
          }
        }
      }
      return !0;
    },
    /**
    * When the detailKey is defined we use the object[detailKey] as index.
    * If not, use the object reference by default.
    */
    handleDetailKey(e) {
      const t = this.detailKey;
      return !t.length || !e ? e : e[t];
    },
    /**
    * Call initSort only first time (For example async data).
    */
    checkSort() {
      if (this.newColumns.length && this.firstTimeSort)
        this.initSort(), this.firstTimeSort = !1;
      else if (this.newColumns.length && Object.keys(this.currentSortColumn).length > 0) {
        for (let e = 0; e < this.newColumns.length; e++)
          if (this.newColumns[e].field === this.currentSortColumn.field) {
            this.currentSortColumn = this.newColumns[e];
            break;
          }
      }
    },
    /**
    * Check if footer slot has custom content.
    */
    hasCustomFooterSlot() {
      if (this.$slots.footer) {
        const e = this.$slots.footer();
        if (e.length > 1)
          return !0;
        const t = e[0].tag;
        if (t !== "th" && t !== "td")
          return !1;
      }
      return !0;
    },
    /**
    * Table arrow keys listener, change selection.
    */
    pressedArrow(e) {
      if (!this.visibleData.length)
        return;
      let t = this.visibleData.indexOf(this.selected) + e;
      t = t < 0 ? 0 : t > this.visibleData.length - 1 ? this.visibleData.length - 1 : t;
      const s = this.visibleData[t];
      if (this.isRowSelectable(s))
        this.selectRow(s);
      else {
        let i = null;
        if (e > 0)
          for (let a = t; a < this.visibleData.length && i === null; a++)
            this.isRowSelectable(this.visibleData[a]) && (i = a);
        else
          for (let a = t; a >= 0 && i === null; a--)
            this.isRowSelectable(this.visibleData[a]) && (i = a);
        i >= 0 && this.selectRow(this.visibleData[i]);
      }
    },
    /**
    * Focus table element if has selected prop.
    */
    focus() {
      this.focusable && this.$el.querySelector("table").focus();
    },
    /**
    * Initial sorted column based on the default-sort prop.
    */
    initSort() {
      if (!this.defaultSort)
        return;
      let e = "", t = this.defaultSortDirection;
      Array.isArray(this.defaultSort) ? (e = this.defaultSort[0], this.defaultSort[1] && (t = this.defaultSort[1])) : e = this.defaultSort;
      const s = this.newColumns.filter((i) => i.field === e)[0];
      s && (this.isAsc = t.toLowerCase() !== "desc", this.sort(s, !0));
    },
    /**
    * Emits drag start event
    */
    handleDragStart(e, t, s) {
      this.draggable && this.$emit("dragstart", { event: e, row: t, index: s });
    },
    /**
    * Emits drag leave event
    */
    handleDragEnd(e, t, s) {
      this.draggable && this.$emit("dragend", { event: e, row: t, index: s });
    },
    /**
    * Emits drop event
    */
    handleDrop(e, t, s) {
      this.draggable && this.$emit("drop", { event: e, row: t, index: s });
    },
    /**
    * Emits drag over event
    */
    handleDragOver(e, t, s) {
      this.draggable && this.$emit("dragover", { event: e, row: t, index: s });
    },
    /**
    * Emits drag leave event
    */
    handleDragLeave(e, t, s) {
      this.draggable && this.$emit("dragleave", { event: e, row: t, index: s });
    },
    /**
    * Emits drag start event (column)
    */
    handleColumnDragStart(e, t, s) {
      this.canDragColumn && (this.isDraggingColumn = !0, this.$emit("columndragstart", { event: e, column: t, index: s }));
    },
    /**
    * Emits drag leave event (column)
    */
    handleColumnDragEnd(e, t, s) {
      this.canDragColumn && (this.isDraggingColumn = !1, this.$emit("columndragend", { event: e, column: t, index: s }));
    },
    /**
    * Emits drop event (column)
    */
    handleColumnDrop(e, t, s) {
      this.canDragColumn && this.$emit("columndrop", { event: e, column: t, index: s });
    },
    /**
    * Emits drag over event (column)
    */
    handleColumnDragOver(e, t, s) {
      this.canDragColumn && this.$emit("columndragover", { event: e, column: t, index: s });
    },
    /**
    * Emits drag leave event (column)
    */
    handleColumnDragLeave(e, t, s) {
      this.canDragColumn && this.$emit("columndragleave", { event: e, column: t, index: s });
    },
    emitEventForRow(e, t, s) {
      return this.$attrs[e] ? this.$emit(e, s, t) : null;
    },
    processTdAttrs() {
      if (this.visibleColumns.length && this.visibleData.length)
        for (let e = 0; e < this.visibleColumns.length; e++) {
          const t = this.visibleColumns[e];
          typeof t.tdAttrs < "u" && this.visibleData.forEach((s, i) => {
            t.tdAttrsData[i] = t.tdAttrs(s, t);
          });
        }
    },
    _addColumn(e) {
      this.defaultSlots.push(e);
      const t = this.$refs.slot;
      t && t.children && this.$nextTick(() => {
        const s = this.defaultSlots.map((a) => `[data-id="${a.newKey}"]`).join(","), i = Array.from(t.querySelectorAll(s)).map((a) => a.getAttribute("data-id"));
        this.defaultSlots = this.defaultSlots.sort((a, n) => i.indexOf(`${a.newKey}`) - i.indexOf(`${n.newKey}`));
      });
    },
    _removeColumn(e) {
      this.defaultSlots = this.defaultSlots.filter((t) => t.newKey !== e.newKey);
    },
    _nextSequence() {
      return this.sequence++;
    }
  }
});
const km = {
  ref: "slot",
  style: {
    display: "none"
  }
}, wm = ["tabindex"], Dm = {
  key: 0
}, Fm = {
  key: 1
}, $m = ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"], Am = {
  key: 1
}, Mm = {
  key: 0
}, Om = {
  key: 1
}, Tm = {
  key: 2
}, Pm = {
  key: 1
}, Vm = {
  key: 1
}, Im = {
  key: 2
}, Rm = ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"], Bm = ["colspan"], Nm = {
  key: 0
}, Lm = ["colspan"], Em = {
  key: 2
}, Ym = ["colspan"];
function Hm(e, t, s, i, a, n) {
  const r = w("o-table-mobile-sort"), o = w("o-table-pagination"), u = w("o-checkbox"), h = w("o-slot-component"), g = w("o-icon"), R = w("o-input"), Q = w("o-loading");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [v(
      "div",
      km,
      [b(e.$slots, "default")],
      512
      /* NEED_PATCH */
    ), e.isMobile && e.hasSortablenewColumns ? (l(), D(r, {
      key: 0,
      "current-sort-column": e.currentSortColumn,
      columns: e.newColumns,
      placeholder: e.mobileSortPlaceholder,
      "icon-pack": e.iconPack,
      "sort-icon": e.sortIcon,
      "sort-icon-size": e.sortIconSize,
      "is-asc": e.isAsc,
      onSort: t[0] || (t[0] = (f, E) => e.sort(f, null, E))
    }, null, 8, ["current-sort-column", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size", "is-asc"])) : y("v-if", !0), e.paginated && (e.paginationPosition === "top" || e.paginationPosition === "both") ? b(e.$slots, "pagination", {
      key: 1
    }, () => [O(o, N(e.$attrs, {
      "per-page": e.perPage,
      paginated: e.paginated,
      total: e.newDataTotal,
      "current-page": e.newCurrentPage,
      "onUpdate:currentPage": t[1] || (t[1] = (f) => e.newCurrentPage = f),
      "root-class": e.paginationWrapperClasses,
      "icon-pack": e.iconPack,
      rounded: e.paginationRounded,
      size: e.paginationSize,
      onPageChange: t[2] || (t[2] = (f) => e.$emit("page-change", f)),
      "aria-next-label": e.ariaNextLabel,
      "aria-previous-label": e.ariaPreviousLabel,
      "aria-page-label": e.ariaPageLabel,
      "aria-current-label": e.ariaCurrentLabel
    }), {
      default: M(() => [b(e.$slots, "top-left")]),
      _: 3
      /* FORWARDED */
    }, 16, ["per-page", "paginated", "total", "current-page", "root-class", "icon-pack", "rounded", "size", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])]) : y("v-if", !0), v(
      "div",
      {
        class: c(e.tableWrapperClasses),
        style: me(e.tableWrapperStyle)
      },
      [v("table", {
        class: c(e.tableClasses),
        tabindex: e.focusable ? 0 : null,
        onKeydown: [t[3] || (t[3] = U(T((f) => e.pressedArrow(-1), ["self", "prevent"]), ["up"])), t[4] || (t[4] = U(T((f) => e.pressedArrow(1), ["self", "prevent"]), ["down"]))]
      }, [e.$slots.caption ? (l(), d("caption", Dm, [b(e.$slots, "caption")])) : y("v-if", !0), e.newColumns.length && e.showHeader ? (l(), d("thead", Fm, [b(e.$slots, "preheader"), v("tr", null, [e.showDetailRowIcon ? (l(), d(
        "th",
        {
          key: 0,
          class: c(e.thDetailedClasses)
        },
        null,
        2
        /* CLASS */
      )) : y("v-if", !0), e.checkable && e.checkboxPosition === "left" ? (l(), d(
        "th",
        {
          key: 1,
          class: c(e.thCheckboxClasses)
        },
        [e.headerCheckable ? (l(), D(u, {
          key: 0,
          autocomplete: "off",
          modelValue: e.isAllChecked,
          disabled: e.isAllUncheckable,
          "onUpdate:modelValue": e.checkAll
        }, null, 8, ["modelValue", "disabled", "onUpdate:modelValue"])) : y("v-if", !0)],
        2
        /* CLASS */
      )) : y("v-if", !0), (l(!0), d(
        V,
        null,
        K(e.visibleColumns, (f, E) => (l(), d("th", N({
          key: f.newKey + ":" + E + "header"
        }, f.thAttrsData, {
          class: e.thClasses(f),
          style: e.isMobile ? {} : f.style,
          onClick: T((P) => e.sort(f, null, P), ["stop"]),
          draggable: e.canDragColumn,
          onDragstart: (P) => e.handleColumnDragStart(P, f, E),
          onDragend: (P) => e.handleColumnDragEnd(P, f, E),
          onDrop: (P) => e.handleColumnDrop(P, f, E),
          onDragover: (P) => e.handleColumnDragOver(P, f, E),
          onDragleave: (P) => e.handleColumnDragLeave(P, f, E)
        }), [f.hasHeaderSlot ? (l(), D(h, {
          key: 0,
          component: f,
          name: "header",
          tag: "span",
          props: {
            column: f,
            index: E
          }
        }, null, 8, ["component", "props"])) : (l(), d("span", Am, [se(
          F(f.label) + " ",
          1
          /* TEXT */
        ), G(v(
          "span",
          {
            class: c(e.thSortIconClasses())
          },
          [O(g, {
            icon: e.sortIcon,
            pack: e.iconPack,
            both: "",
            size: e.sortIconSize,
            rotation: e.isAsc ? 0 : 180
          }, null, 8, ["icon", "pack", "size", "rotation"])],
          2
          /* CLASS */
        ), [[ee, f.sortable && e.currentSortColumn === f]])]))], 16, $m))),
        128
        /* KEYED_FRAGMENT */
      )), e.checkable && e.checkboxPosition === "right" ? (l(), d(
        "th",
        {
          key: 2,
          class: c(e.thCheckboxClasses)
        },
        [e.headerCheckable ? (l(), D(u, {
          key: 0,
          autocomplete: "off",
          modelValue: e.isAllChecked,
          disabled: e.isAllUncheckable,
          "onUpdate:modelValue": e.checkAll
        }, null, 8, ["modelValue", "disabled", "onUpdate:modelValue"])) : y("v-if", !0)],
        2
        /* CLASS */
      )) : y("v-if", !0)]), e.hasSearchablenewColumns ? (l(), d("tr", Mm, [e.showDetailRowIcon ? (l(), d(
        "th",
        {
          key: 0,
          class: c(e.thDetailedClasses)
        },
        null,
        2
        /* CLASS */
      )) : y("v-if", !0), e.checkable && e.checkboxPosition === "left" ? (l(), d("th", Om)) : y("v-if", !0), (l(!0), d(
        V,
        null,
        K(e.visibleColumns, (f, E) => (l(), d(
          "th",
          N({
            key: f.newKey + ":" + E + "searchable"
          }, f.thAttrsData, {
            class: e.thClasses(f),
            style: e.isMobile ? {} : f.style
          }),
          [f.searchable ? (l(), d(
            V,
            {
              key: 0
            },
            [f.hasSearchableSlot ? (l(), D(h, {
              key: 0,
              component: f,
              name: "searchable",
              tag: "span",
              props: {
                column: f,
                filters: e.filters
              }
            }, null, 8, ["component", "props"])) : (l(), D(R, N({
              key: 1,
              [Kn(e.filtersEvent)]: e.onFiltersEvent
            }, {
              modelValue: e.filters[f.field],
              "onUpdate:modelValue": (P) => e.filters[f.field] = P,
              type: f.numeric ? "number" : "text"
            }), null, 16, ["modelValue", "onUpdate:modelValue", "type"]))],
            64
            /* STABLE_FRAGMENT */
          )) : y("v-if", !0)],
          16
          /* FULL_PROPS */
        ))),
        128
        /* KEYED_FRAGMENT */
      )), e.checkable && e.checkboxPosition === "right" ? (l(), d("th", Tm)) : y("v-if", !0)])) : y("v-if", !0), e.hasCustomSubheadings ? (l(), d("tr", Pm, [e.showDetailRowIcon ? (l(), d(
        "th",
        {
          key: 0,
          class: c(e.thDetailedClasses)
        },
        null,
        2
        /* CLASS */
      )) : y("v-if", !0), e.checkable && e.checkboxPosition === "left" ? (l(), d("th", Vm)) : y("v-if", !0), (l(!0), d(
        V,
        null,
        K(e.visibleColumns, (f, E) => (l(), d(
          "th",
          {
            key: f.newKey + ":" + E + "subheading",
            style: me(e.isMobile ? {} : f.style),
            class: c(e.thSubheadingClasses)
          },
          [f.$slots && f.$slots.subheading ? (l(), D(h, {
            key: 0,
            component: f,
            name: "subheading",
            tag: "span",
            props: {
              column: f,
              index: E
            }
          }, null, 8, ["component", "props"])) : (l(), d(
            V,
            {
              key: 1
            },
            [se(
              F(f.subheading),
              1
              /* TEXT */
            )],
            64
            /* STABLE_FRAGMENT */
          ))],
          6
          /* CLASS, STYLE */
        ))),
        128
        /* KEYED_FRAGMENT */
      )), e.checkable && e.checkboxPosition === "right" ? (l(), d("th", Im)) : y("v-if", !0)])) : y("v-if", !0)])) : y("v-if", !0), v("tbody", null, [(l(!0), d(
        V,
        null,
        K(e.visibleData, (f, E) => (l(), d(
          V,
          {
            key: this.customRowKey ? f[this.customRowKey] : E
          },
          [v("tr", {
            class: c(e.rowClasses(f, E)),
            onClick: (P) => e.selectRow(f, E),
            onDblclick: (P) => e.$emit("dblclick", f),
            onMouseenter: (P) => e.emitEventForRow("mouseenter", P, f),
            onMouseleave: (P) => e.emitEventForRow("mouseleave", P, f),
            onContextmenu: (P) => e.$emit("contextmenu", f, P),
            draggable: e.canDragRow,
            onDragstart: (P) => e.handleDragStart(P, f, E),
            onDragend: (P) => e.handleDragEnd(P, f, E),
            onDrop: (P) => e.handleDrop(P, f, E),
            onDragover: (P) => e.handleDragOver(P, f, E),
            onDragleave: (P) => e.handleDragLeave(P, f, E)
          }, [e.showDetailRowIcon ? (l(), d(
            "td",
            {
              key: 0,
              class: c(e.tdDetailedChevronClasses)
            },
            [e.hasDetailedVisible(f) ? (l(), D(g, {
              key: 0,
              icon: e.detailIcon,
              pack: e.iconPack,
              rotation: e.isVisibleDetailRow(f) ? 90 : 0,
              role: "button",
              onClick: T((P) => e.toggleDetails(f), ["stop"]),
              clickable: "",
              both: ""
            }, null, 8, ["icon", "pack", "rotation", "onClick"])) : y("v-if", !0)],
            2
            /* CLASS */
          )) : y("v-if", !0), e.checkable && e.checkboxPosition === "left" ? (l(), d(
            "td",
            {
              key: 1,
              class: c(e.tdCheckboxClasses)
            },
            [O(u, {
              autocomplete: "off",
              disabled: !e.isRowCheckable(f),
              modelValue: e.isRowChecked(f),
              "onUpdate:modelValue": (P) => e.checkRow(f, E, P)
            }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue"])],
            2
            /* CLASS */
          )) : y("v-if", !0), (l(!0), d(
            V,
            null,
            K(e.visibleColumns, (P, ws) => (l(), D(h, N({
              key: P.newKey + E + ":" + ws
            }, P.tdAttrsData[E], {
              component: P,
              name: "default",
              tag: "td",
              class: e.tdClasses(f, P),
              style: e.isMobile ? {} : P.style,
              "data-label": P.label,
              props: {
                row: f,
                column: P,
                index: E,
                colindex: ws,
                toggleDetails: e.toggleDetails
              },
              onClick: (Ln) => e.$emit("cell-click", f, P, E, ws, Ln)
            }), null, 16, ["component", "class", "style", "data-label", "props", "onClick"]))),
            128
            /* KEYED_FRAGMENT */
          )), e.checkable && e.checkboxPosition === "right" ? (l(), d(
            "td",
            {
              key: 2,
              class: c(e.tdCheckboxClasses)
            },
            [O(u, {
              autocomplete: "off",
              disabled: !e.isRowCheckable(f),
              modelValue: e.isRowChecked(f),
              "onUpdate:modelValue": (P) => e.checkRow(f, E, P)
            }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue"])],
            2
            /* CLASS */
          )) : y("v-if", !0)], 42, Rm), O(ye, {
            name: e.detailTransition
          }, {
            default: M(() => [e.isActiveDetailRow(f) ? (l(), d(
              "tr",
              {
                key: (e.customRowKey ? f[e.customRowKey] : E) + "detail",
                class: c(e.detailedClasses)
              },
              [v("td", {
                colspan: e.columnCount
              }, [b(e.$slots, "detail", {
                row: f,
                index: E
              })], 8, Bm)],
              2
              /* CLASS */
            )) : y("v-if", !0)]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["name"]), e.isActiveCustomDetailRow(f) ? b(e.$slots, "detail", {
            key: 0,
            row: f,
            index: E
          }) : y("v-if", !0)],
          64
          /* STABLE_FRAGMENT */
        ))),
        128
        /* KEYED_FRAGMENT */
      )), e.visibleData.length ? y("v-if", !0) : (l(), d("tr", Nm, [v("td", {
        colspan: e.columnCount
      }, [b(e.$slots, "empty")], 8, Lm)]))]), e.$slots.footer ? (l(), d("tfoot", Em, [v(
        "tr",
        {
          class: c(e.footerClasses)
        },
        [e.hasCustomFooterSlot() ? b(e.$slots, "footer", {
          key: 0
        }) : (l(), d("th", {
          key: 1,
          colspan: e.columnCount
        }, [b(e.$slots, "footer")], 8, Ym))],
        2
        /* CLASS */
      )])) : y("v-if", !0)], 42, wm), b(e.$slots, "loading", {}, () => [O(Q, {
        "full-page": !1,
        active: e.loading
      }, null, 8, ["active"])])],
      6
      /* CLASS, STYLE */
    ), e.checkable && e.$slots["bottom-left"] || e.paginated && (e.paginationPosition === "bottom" || e.paginationPosition === "both") ? b(e.$slots, "pagination", {
      key: 2
    }, () => [O(o, N(e.$attrs, {
      "per-page": e.perPage,
      paginated: e.paginated,
      total: e.newDataTotal,
      "current-page": e.newCurrentPage,
      "onUpdate:currentPage": t[5] || (t[5] = (f) => e.newCurrentPage = f),
      "root-class": e.paginationWrapperClasses,
      "icon-pack": e.iconPack,
      rounded: e.paginationRounded,
      size: e.paginationSize,
      onPageChange: t[6] || (t[6] = (f) => e.$emit("page-change", f)),
      "aria-next-label": e.ariaNextLabel,
      "aria-previous-label": e.ariaPreviousLabel,
      "aria-page-label": e.ariaPageLabel,
      "aria-current-label": e.ariaCurrentLabel
    }), {
      default: M(() => [b(e.$slots, "bottom-left")]),
      _: 3
      /* FORWARDED */
    }, 16, ["per-page", "paginated", "total", "current-page", "root-class", "icon-pack", "rounded", "size", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])]) : y("v-if", !0)],
    2
    /* CLASS */
  );
}
Ti.render = Hm;
Ti.__file = "src/components/table/Table.vue";
var Wm = {
  install(e) {
    H(e, Ti), H(e, bt);
  }
}, Pi = $({
  name: "OTabs",
  mixins: [L, vn("tab")],
  configField: "tabs",
  props: {
    /**
     * Tab type
     * @values boxed, toggle
     */
    type: {
      type: String,
      default: "default"
    },
    /**
    * Tabs will be expanded (full-width)
    */
    expanded: Boolean,
    /** Tab will have an animation */
    animated: {
      type: Boolean,
      default: () => m(p(), "tabs.animated", !0)
    },
    /** Show tab items multiline when there is no space */
    multiline: Boolean,
    rootClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    verticalClass: [String, Function, Array],
    multilineClass: [String, Function, Array],
    navTabsClass: [String, Function, Array],
    navSizeClass: [String, Function, Array],
    navPositionClass: [String, Function, Array],
    navTypeClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    transitioningClass: [String, Function, Array],
    tabItemWrapperClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-tabs"),
        { [this.computedClass("positionClass", "o-tabs--", this.position)]: this.position && this.vertical },
        { [this.computedClass("expandedClass", "o-tabs--fullwidth")]: this.expanded },
        { [this.computedClass("verticalClass", "o-tabs--vertical")]: this.vertical },
        { [this.computedClass("multilineClass", "o-tabs--multiline")]: this.multiline }
      ];
    },
    itemWrapperClasses() {
      return [
        this.computedClass("tabItemWrapperClass", "o-tabs__nav-item-wrapper")
      ];
    },
    navClasses() {
      return [
        this.computedClass("navTabsClass", "o-tabs__nav"),
        { [this.computedClass("navSizeClass", "o-tabs__nav--", this.size)]: this.size },
        { [this.computedClass("navPositionClass", "o-tabs__nav--", this.position)]: this.position && !this.vertical },
        { [this.computedClass("navTypeClass", "o-tabs__nav--", this.type)]: this.type }
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-tabs__content"),
        { [this.computedClass("transitioningClass", "o-tabs__content--transitioning")]: this.isTransitioning }
      ];
    }
  }
});
const zm = ["aria-orientation"], _m = ["aria-controls", "aria-selected"];
function jm(e, t, s, i, a, n) {
  const r = w("o-slot-component"), o = w("o-icon");
  return l(), d(
    "div",
    {
      class: c(e.rootClasses)
    },
    [v("nav", {
      class: c(e.navClasses),
      role: "tablist",
      "aria-orientation": e.vertical ? "vertical" : "horizontal"
    }, [b(e.$slots, "start"), (l(!0), d(
      V,
      null,
      K(e.items, (u) => G((l(), d("div", {
        key: u.newValue,
        onKeydown: [t[0] || (t[0] = U(T((...h) => e.prev && e.prev(...h), ["prevent"]), ["left"])), t[1] || (t[1] = U(T((...h) => e.next && e.next(...h), ["prevent"]), ["right"])), t[2] || (t[2] = U(T((...h) => e.prev && e.prev(...h), ["prevent"]), ["up"])), t[3] || (t[3] = U(T((...h) => e.next && e.next(...h), ["prevent"]), ["down"])), t[4] || (t[4] = U(T((...h) => e.homePressed && e.homePressed(...h), ["prevent"]), ["home"])), t[5] || (t[5] = U(T((...h) => e.endPressed && e.endPressed(...h), ["prevent"]), ["end"]))],
        class: c(e.itemWrapperClasses),
        role: "tab",
        "aria-controls": `${u.value}-content`,
        "aria-selected": u.isActive ? "true" : "false"
      }, [u.$slots.header ? (l(), D(r, {
        key: 0,
        component: u,
        tag: u.tag,
        name: "header",
        onClick: (h) => e.childClick(u),
        onKeydown: [U(T(e.prev, ["prevent"]), ["left"]), U(T(e.next, ["prevent"]), ["right"]), U(T(e.prev, ["prevent"]), ["up"]), U(T(e.next, ["prevent"]), ["down"]), U(T(e.homePressed, ["prevent"]), ["home"]), U(T(e.endPressed, ["prevent"]), ["end"])],
        class: c(u.headerClasses)
      }, null, 8, ["component", "tag", "onClick", "onKeydown", "class"])) : (l(), D(qe(u.tag), {
        key: 1,
        onClick: (h) => e.childClick(u),
        class: c(u.headerClasses)
      }, {
        default: M(() => [u.icon ? (l(), D(o, {
          key: 0,
          rootClass: u.headerIconClasses,
          icon: u.icon,
          pack: u.iconPack,
          size: e.size
        }, null, 8, ["rootClass", "icon", "pack", "size"])) : y("v-if", !0), v(
          "span",
          {
            class: c(u.headerTextClasses)
          },
          F(u.label),
          3
          /* TEXT, CLASS */
        )]),
        _: 2
        /* DYNAMIC */
      }, 1032, ["onClick", "class"]))], 42, _m)), [[ee, u.visible]])),
      128
      /* KEYED_FRAGMENT */
    )), b(e.$slots, "end")], 10, zm), v(
      "section",
      {
        class: c(e.contentClasses)
      },
      [b(e.$slots, "default")],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
Pi.render = jm;
Pi.__file = "src/components/tabs/Tabs.vue";
var wn = $({
  name: "OTabItem",
  mixins: [L, Sn("tab")],
  configField: "tabs",
  props: {
    /** Item will be disabled */
    disabled: Boolean,
    /**
     * Tabs item tag name
     */
    tag: {
      type: String,
      default: () => m(p(), "tabs.itemTag", "button")
    },
    itemClass: [String, Function, Array],
    itemHeaderClass: [String, Function, Array],
    itemHeaderActiveClass: [String, Function, Array],
    itemHeaderDisabledClass: [String, Function, Array],
    itemHeaderTypeClass: [String, Function, Array],
    itemHeaderIconClass: [String, Function, Array],
    itemHeaderTextClass: [String, Function, Array]
  },
  computed: {
    elementClasses() {
      return [
        this.computedClass("itemClass", "o-tab-item__content")
      ];
    },
    headerClasses() {
      return [
        this.computedClass("itemHeaderClass", "o-tabs__nav-item"),
        { [this.computedClass("itemHeaderActiveClass", "o-tabs__nav-item-{*}--active", this.parent.type)]: this.isActive },
        { [this.computedClass("itemHeaderDisabledClass", "o-tabs__nav-item-{*}--disabled", this.parent.type)]: this.disabled },
        { [this.computedClass("itemHeaderTypeClass", "o-tabs__nav-item-", this.parent.type)]: this.parent.type }
      ];
    },
    headerIconClasses() {
      return [
        this.computedClass("itemHeaderIconClass", "o-tabs__nav-item-icon")
      ];
    },
    headerTextClasses() {
      return [
        this.computedClass("itemHeaderTextClass", "o-tabs__nav-item-text")
      ];
    }
  }
});
wn.__file = "src/components/tabs/TabItem.vue";
var Um = {
  install(e) {
    H(e, Pi), H(e, wn);
  }
}, qm = {
  install(e) {
    H(e, Mt);
  }
}, Km = {
  install(e) {
    H(e, Pt);
  }
}, Vi = $({
  name: "OUpload",
  mixins: [L, Ke],
  configField: "upload",
  inheritAttrs: !1,
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [Object, yc, Array],
    /** Same as native, also push new item to v-model instead of replacing */
    multiple: Boolean,
    /** Same as native disabled */
    disabled: Boolean,
    /** Same as native accept */
    accept: String,
    /** Accepts drag & drop and change its style */
    dragDrop: Boolean,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: {
      type: String
    },
    /** Replace last chosen files every time (like native file input element) */
    native: {
      type: Boolean,
      default: !1
    },
    /** Upload will be expanded (full-width) */
    expanded: {
      type: Boolean,
      default: !1
    },
    rootClass: [String, Function, Array],
    draggableClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    hoveredClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue,
      dragDropFocus: !1
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-upl"),
        { [this.computedClass("expandedClass", "o-upl--expanded")]: this.expanded },
        { [this.computedClass("disabledClass", "o-upl--disabled")]: this.disabled }
      ];
    },
    draggableClasses() {
      return [
        this.computedClass("draggableClass", "o-upl__draggable"),
        { [this.computedClass("hoveredClass", "o-upl__draggable--hovered")]: !this.variant && this.dragDropFocus },
        { [this.computedClass("variantClass", "o-upl__draggable--hovered-", this.variant)]: this.variant && this.dragDropFocus }
      ];
    },
    $elementRef() {
      return "input";
    }
  },
  watch: {
    /**
     *   When v-model is changed:
     *   1. Set internal value.
     *   2. Reset interna input file value
     *   3. If it's invalid, validate again.
     */
    modelValue(e) {
      this.newValue = e, (!e || Array.isArray(e) && e.length === 0) && (this.$refs.input.value = null), !this.isValid && !this.dragDrop && this.checkHtml5Validity();
    }
  },
  methods: {
    /**
    * Listen change event on input type 'file',
    * emit 'input' event and validate
    */
    onFileChange(e) {
      if (this.disabled)
        return;
      this.dragDrop && this.updateDragDropFocus(!1);
      const t = e.target.files || e.dataTransfer.files;
      if (t.length === 0) {
        if (!this.newValue)
          return;
        this.native && (this.newValue = null);
      } else if (this.multiple) {
        let s = !1;
        (this.native || !this.newValue) && (this.newValue = [], s = !0);
        for (let i = 0; i < t.length; i++) {
          const a = t[i];
          this.checkType(a) && (this.newValue.push(a), s = !0);
        }
        if (!s)
          return;
      } else {
        if (this.dragDrop && t.length !== 1)
          return;
        {
          const s = t[0];
          if (this.checkType(s))
            this.newValue = s;
          else if (this.newValue)
            this.newValue = null, this.clearInput();
          else {
            this.clearInput(), this.checkHtml5Validity();
            return;
          }
        }
      }
      this.$emit("update:modelValue", this.newValue), !this.dragDrop && this.checkHtml5Validity();
    },
    /*
    * Reset file input value
    */
    clearInput() {
      this.$refs.input.value = null;
    },
    /**
    * Listen drag-drop to update internal variable
    */
    updateDragDropFocus(e) {
      this.disabled || (this.dragDropFocus = e);
    },
    /**
    * Check mime type of file
    */
    checkType(e) {
      if (!this.accept)
        return !0;
      const t = this.accept.split(",");
      if (t.length === 0)
        return !0;
      for (let s = 0; s < t.length; s++) {
        const i = t[s].trim();
        if (i) {
          if (i.substring(0, 1) === ".") {
            if (e.name.toLowerCase().slice(-i.length) === i.toLowerCase())
              return !0;
          } else if (e.type.match(i))
            return !0;
        }
      }
      return !1;
    }
  }
});
const Gm = ["multiple", "accept", "disabled"];
function Jm(e, t, s, i, a, n) {
  return l(), d(
    "label",
    {
      class: c(e.rootClasses)
    },
    [e.dragDrop ? (l(), d(
      "div",
      {
        key: 1,
        class: c(e.draggableClasses),
        onMouseenter: t[0] || (t[0] = (r) => e.updateDragDropFocus(!0)),
        onMouseleave: t[1] || (t[1] = (r) => e.updateDragDropFocus(!1)),
        onDragover: t[2] || (t[2] = T((r) => e.updateDragDropFocus(!0), ["prevent"])),
        onDragleave: t[3] || (t[3] = T((r) => e.updateDragDropFocus(!1), ["prevent"])),
        onDragenter: t[4] || (t[4] = T((r) => e.updateDragDropFocus(!0), ["prevent"])),
        onDrop: t[5] || (t[5] = T((...r) => e.onFileChange && e.onFileChange(...r), ["prevent"]))
      },
      [b(e.$slots, "default")],
      34
      /* CLASS, HYDRATE_EVENTS */
    )) : b(e.$slots, "default", {
      key: 0
    }), v("input", N({
      ref: "input",
      type: "file"
    }, e.$attrs, {
      multiple: e.multiple,
      accept: e.accept,
      disabled: e.disabled,
      onChange: t[6] || (t[6] = (...r) => e.onFileChange && e.onFileChange(...r))
    }), null, 16, Gm)],
    2
    /* CLASS */
  );
}
Vi.render = Jm;
Vi.__file = "src/components/upload/Upload.vue";
var Zm = {
  install(e) {
    H(e, Vi);
  }
}, ea = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Autocomplete: hh,
  Button: mh,
  Carousel: bh,
  Checkbox: wh,
  Collapse: Dh,
  Datepicker: xh,
  Datetimepicker: uc,
  Dropdown: dc,
  Field: hc,
  Icon: cc,
  Input: mc,
  Inputitems: pc,
  Loading: vc,
  Menu: Mc,
  Modal: Ic,
  Notification: Wc,
  Pagination: Gc,
  Radio: Xc,
  Select: Qc,
  Skeleton: xc,
  Sidebar: tm,
  Slider: um,
  Steps: mm,
  Switch: ym,
  Table: Wm,
  Tabs: Um,
  Timepicker: qm,
  Tooltip: Km,
  Upload: Zm
});
const Xm = {
  install(e, t = {}) {
    jd(e);
    const s = p();
    an(ft(s, t, !0));
    for (const i in ea)
      Kd(e, ea[i]);
    Ss(e, "config", Ud);
  }
};
function ta(e, t = {}) {
  var n;
  const s = {
    401: "Authentication required. Please reload the page and sign in.",
    403: "You do not have permission to perform this action.",
    404: "The page or action you are looking for could not be found.",
    419: "Your session has likely expired. Please reload the page and try again.",
    422: "The action attempted was invalid. Please review your input and try again.",
    500: "An unexpected error has occurred. This issue has been reported.",
    503: "The site is currently under maintenance. Please try again later."
  };
  Object.assign(s, t);
  const i = s[(n = e.response) == null ? void 0 : n.status] || s[500], { oruga: a } = fi();
  if (a.notification.open({
    message: i,
    duration: 2500,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), process.env.NODE_ENV === "test")
    console.error("silent error", e);
  else
    throw e;
}
const Qm = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: e } = await ae.post(this.path).catch((t) => {
        if (t.response.status === 401) {
          window.location.href = "/";
          return;
        }
        ta(t);
      }).catch(ta);
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function xm(e, t, s, i, a, n) {
  return l(), d("li", null, [
    b(e.$slots, "default", { logout: n.logout }, () => [
      v("button", {
        class: "button is-primary",
        onClick: t[0] || (t[0] = (r) => n.logout())
      }, "Sign out")
    ])
  ]);
}
const ef = /* @__PURE__ */ fe(Qm, [["render", xm]]), tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ef
}, Symbol.toStringTag, { value: "Module" })), sf = $({
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
}), af = ["value", "max"], nf = { key: 0 };
function rf(e, t, s, i, a, n) {
  return l(), d(V, null, [
    v("progress", {
      value: e.value,
      max: e.max
    }, null, 8, af),
    e.showValue ? (l(), d("span", nf, F(e.value) + " / " + F(e.max), 1)) : y("", !0)
  ], 64);
}
const of = /* @__PURE__ */ fe(sf, [["render", rf]]), lf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: of
}, Symbol.toStringTag, { value: "Module" })), uf = {
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
      state: new ue()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, df = { class: "button-group" };
function hf(e, t, s, i, a, n) {
  const r = w("wyxos-button"), o = w("o-modal");
  return l(), D(o, { active: !0 }, {
    default: M(() => [
      v("h2", null, F(s.title), 1),
      v("p", null, F(s.message), 1),
      v("div", df, [
        O(r, {
          disabled: i.state.isLoading,
          "native-type": "button",
          onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
        }, {
          default: M(() => [
            se(F(s.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        O(r, {
          loading: i.state.isLoading,
          "native-type": "button",
          onClick: t[1] || (t[1] = (u) => n.proceed())
        }, {
          default: M(() => [
            se(F(s.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const cf = /* @__PURE__ */ fe(uf, [["render", hf]]), mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cf
}, Symbol.toStringTag, { value: "Module" })), ff = {
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
      type: bs,
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
}, pf = ["value"];
function gf(e, t, s, i, a, n) {
  var u;
  const r = w("o-select"), o = w("o-field");
  return l(), D(o, N({ label: s.label }, (u = s.form) == null ? void 0 : u.getError(s.name)), {
    default: M(() => [
      O(r, {
        disabled: s.disabled,
        "model-value": s.modelValue,
        name: s.name,
        placeholder: s.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (h) => n.updateValue(h))
      }, {
        default: M(() => [
          b(e.$slots, "default", {}, () => [
            s.items ? (l(!0), d(V, { key: 0 }, K(s.items, (h) => (l(), d("option", {
              key: h.value,
              value: h.value
            }, F(h.label), 9, pf))), 128)) : y("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const yf = /* @__PURE__ */ fe(ff, [["render", gf]]), Cf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yf
}, Symbol.toStringTag, { value: "Module" }));
class Ii {
  constructor(t = {}) {
    B(this, "state", new ue());
    B(this, "result", vt([]));
    B(this, "value", vt(null));
    B(this, "timeout", null);
    B(this, "options", {
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
    return new Ii(t);
  }
  getEvents({ searchPayloadFormatter: t = null } = {}) {
    return {
      "update:model-value": (s) => (this.value.value = s, this.search(t))
    };
  }
  search(t) {
    const s = { value: this.value.value }, i = t ? t(s) : s;
    return this.customSearch({ payload: i });
  }
  async customSearch({ url: t, payload: s }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)), this.controller = new AbortController(), this.timeout = setTimeout(async () => {
      this.state.loading(), this.reset();
      const i = t || this.options.url, { data: a } = await ae.post(`${i}/search`, s || this.options.payload, {
        signal: this.controller.signal
      }).catch((n) => {
        throw this.state.failed(), n;
      });
      this.result.value = a.result, this.state.loaded();
    }, 500);
  }
  async restore(t, s) {
    this.state.loading(), this.reset();
    const i = t || this.options.url, { data: a } = await ae.post(`${i}/restore`, s || this.options.payload).catch((n) => {
      throw this.state.failed(), n;
    });
    return this.state.loaded(), a;
  }
  reset() {
    this.result.value = [];
  }
}
const bf = {
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
      search: Ii.create()
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
function vf(e, t, s, i, a, n) {
  const r = w("o-inputitems");
  return l(), D(r, N({
    ref: "tagInput",
    modelValue: a.query,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => a.query = o),
    data: i.search.result.value,
    "allow-autocomplete": ""
  }, e.$attrs, {
    onAdd: t[1] || (t[1] = (o) => n.addedTag(o)),
    onRemove: t[2] || (t[2] = (o) => n.removedTag(o)),
    onTyping: t[3] || (t[3] = (o) => n.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const Sf = /* @__PURE__ */ fe(bf, [["render", vf]]), kf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sf
}, Symbol.toStringTag, { value: "Module" }));
class wf {
  constructor() {
    B(this, "attributes", de({
      user: null
    }));
    B(this, "state", new ue());
    return new Proxy(this, {
      get(t, s, i) {
        return Reflect.has(t, s) ? Reflect.get(t, s, i) : s in t.attributes ? t.attributes[s] : null;
      },
      set(t, s, i, a) {
        return Reflect.has(t, s) ? Reflect.set(t, s, i, a) : s in t.attributes ? (t.attributes[s] = i, !0) : null;
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
    this.state.loading(), await ae.get("/sanctum/csrf-cookie").catch((s) => {
      throw this.state.failed(), s;
    });
    const { data: t } = await ae.get("/api/user");
    if (!("user" in t))
      throw Error("Instance of user is not defined.");
    Object.keys(t).forEach((s) => {
      this.attributes[s] = t[s];
    }), this.state.loaded();
  }
  getUser() {
    return this.attributes.user;
  }
  reset() {
    this.attributes = de({
      user: null
    });
  }
}
const Hf = new wf(), Df = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Ff {
  constructor() {
    B(this, "FORMATS", Df);
  }
  format(t, s, i = "") {
    return t ? S(t).format(s) : i;
  }
}
const Wf = new Ff();
class zf {
  constructor(t) {
    this.data = new FormData(), this.form = t, this.copy = Object.assign({}, JSON.parse(JSON.stringify(t)));
  }
  static build(t, s) {
    return new this(t).files(s).get();
  }
  static callback(t) {
    return (s) => this.build(s, t).get();
  }
  files(t) {
    return t.forEach((s) => {
      typeof s == "object" ? (this.data.append(s.name, s.value), delete this.copy[s.name]) : this.form[s] && (this.data.append(s, this.form[s]), delete this.copy[s]);
    }), this;
  }
  add(t, s) {
    return this.data.append(t, s), this;
  }
  get() {
    return this.data.append("payload", JSON.stringify(this.copy)), this.data;
  }
}
const Dn = "%[a-f0-9]{2}", sa = new RegExp("(" + Dn + ")|([^%]+?)", "gi"), ia = new RegExp("(" + Dn + ")+", "gi");
function zs(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  t = t || 1;
  const s = e.slice(0, t), i = e.slice(t);
  return Array.prototype.concat.call([], zs(s), zs(i));
}
function $f(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(sa) || [];
    for (let s = 1; s < t.length; s++)
      e = zs(t, s).join(""), t = e.match(sa) || [];
    return e;
  }
}
function Af(e) {
  const t = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let s = ia.exec(e);
  for (; s; ) {
    try {
      t[s[0]] = decodeURIComponent(s[0]);
    } catch {
      const a = $f(s[0]);
      a !== s[0] && (t[s[0]] = a);
    }
    s = ia.exec(e);
  }
  t["%C2"] = "�";
  const i = Object.keys(t);
  for (const a of i)
    e = e.replace(new RegExp(a, "g"), t[a]);
  return e;
}
function Mf(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return Af(e);
  }
}
function Fn(e, t) {
  if (!(typeof e == "string" && typeof t == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (e === "" || t === "")
    return [];
  const s = e.indexOf(t);
  return s === -1 ? [] : [
    e.slice(0, s),
    e.slice(s + t.length)
  ];
}
function Of(e, t) {
  const s = {};
  if (Array.isArray(t))
    for (const i of t) {
      const a = Object.getOwnPropertyDescriptor(e, i);
      a != null && a.enumerable && Object.defineProperty(s, i, a);
    }
  else
    for (const i of Reflect.ownKeys(e)) {
      const a = Object.getOwnPropertyDescriptor(e, i);
      if (a.enumerable) {
        const n = e[i];
        t(i, n, e) && Object.defineProperty(s, i, a);
      }
    }
  return s;
}
const Tf = (e) => e == null, Pf = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), _s = Symbol("encodeFragmentIdentifier");
function Vf(e) {
  switch (e.arrayFormat) {
    case "index":
      return (t) => (s, i) => {
        const a = s.length;
        return i === void 0 || e.skipNull && i === null || e.skipEmptyString && i === "" ? s : i === null ? [
          ...s,
          [te(t, e), "[", a, "]"].join("")
        ] : [
          ...s,
          [te(t, e), "[", te(a, e), "]=", te(i, e)].join("")
        ];
      };
    case "bracket":
      return (t) => (s, i) => i === void 0 || e.skipNull && i === null || e.skipEmptyString && i === "" ? s : i === null ? [
        ...s,
        [te(t, e), "[]"].join("")
      ] : [
        ...s,
        [te(t, e), "[]=", te(i, e)].join("")
      ];
    case "colon-list-separator":
      return (t) => (s, i) => i === void 0 || e.skipNull && i === null || e.skipEmptyString && i === "" ? s : i === null ? [
        ...s,
        [te(t, e), ":list="].join("")
      ] : [
        ...s,
        [te(t, e), ":list=", te(i, e)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (s) => (i, a) => a === void 0 || e.skipNull && a === null || e.skipEmptyString && a === "" ? i : (a = a === null ? "" : a, i.length === 0 ? [[te(s, e), t, te(a, e)].join("")] : [[i, te(a, e)].join(e.arrayFormatSeparator)]);
    }
    default:
      return (t) => (s, i) => i === void 0 || e.skipNull && i === null || e.skipEmptyString && i === "" ? s : i === null ? [
        ...s,
        te(t, e)
      ] : [
        ...s,
        [te(t, e), "=", te(i, e)].join("")
      ];
  }
}
function If(e) {
  let t;
  switch (e.arrayFormat) {
    case "index":
      return (s, i, a) => {
        if (t = /\[(\d*)]$/.exec(s), s = s.replace(/\[\d*]$/, ""), !t) {
          a[s] = i;
          return;
        }
        a[s] === void 0 && (a[s] = {}), a[s][t[1]] = i;
      };
    case "bracket":
      return (s, i, a) => {
        if (t = /(\[])$/.exec(s), s = s.replace(/\[]$/, ""), !t) {
          a[s] = i;
          return;
        }
        if (a[s] === void 0) {
          a[s] = [i];
          return;
        }
        a[s] = [...a[s], i];
      };
    case "colon-list-separator":
      return (s, i, a) => {
        if (t = /(:list)$/.exec(s), s = s.replace(/:list$/, ""), !t) {
          a[s] = i;
          return;
        }
        if (a[s] === void 0) {
          a[s] = [i];
          return;
        }
        a[s] = [...a[s], i];
      };
    case "comma":
    case "separator":
      return (s, i, a) => {
        const n = typeof i == "string" && i.includes(e.arrayFormatSeparator), r = typeof i == "string" && !n && Pe(i, e).includes(e.arrayFormatSeparator);
        i = r ? Pe(i, e) : i;
        const o = n || r ? i.split(e.arrayFormatSeparator).map((u) => Pe(u, e)) : i === null ? i : Pe(i, e);
        a[s] = o;
      };
    case "bracket-separator":
      return (s, i, a) => {
        const n = /(\[])$/.test(s);
        if (s = s.replace(/\[]$/, ""), !n) {
          a[s] = i && Pe(i, e);
          return;
        }
        const r = i === null ? [] : i.split(e.arrayFormatSeparator).map((o) => Pe(o, e));
        if (a[s] === void 0) {
          a[s] = r;
          return;
        }
        a[s] = [...a[s], ...r];
      };
    default:
      return (s, i, a) => {
        if (a[s] === void 0) {
          a[s] = i;
          return;
        }
        a[s] = [...[a[s]].flat(), i];
      };
  }
}
function $n(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function te(e, t) {
  return t.encode ? t.strict ? Pf(e) : encodeURIComponent(e) : e;
}
function Pe(e, t) {
  return t.decode ? Mf(e) : e;
}
function An(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? An(Object.keys(e)).sort((t, s) => Number(t) - Number(s)).map((t) => e[t]) : e;
}
function Mn(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function Rf(e) {
  let t = "";
  const s = e.indexOf("#");
  return s !== -1 && (t = e.slice(s)), t;
}
function aa(e, t) {
  return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function Ri(e) {
  e = Mn(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function Bi(e, t) {
  t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...t
  }, $n(t.arrayFormatSeparator);
  const s = If(t), i = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return i;
  for (const a of e.split("&")) {
    if (a === "")
      continue;
    const n = t.decode ? a.replace(/\+/g, " ") : a;
    let [r, o] = Fn(n, "=");
    r === void 0 && (r = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? o : Pe(o, t), s(Pe(r, t), o, i);
  }
  for (const [a, n] of Object.entries(i))
    if (typeof n == "object" && n !== null)
      for (const [r, o] of Object.entries(n))
        n[r] = aa(o, t);
    else
      i[a] = aa(n, t);
  return t.sort === !1 ? i : (t.sort === !0 ? Object.keys(i).sort() : Object.keys(i).sort(t.sort)).reduce((a, n) => {
    const r = i[n];
    return r && typeof r == "object" && !Array.isArray(r) ? a[n] = An(r) : a[n] = r, a;
  }, /* @__PURE__ */ Object.create(null));
}
function On(e, t) {
  if (!e)
    return "";
  t = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...t
  }, $n(t.arrayFormatSeparator);
  const s = (r) => t.skipNull && Tf(e[r]) || t.skipEmptyString && e[r] === "", i = Vf(t), a = {};
  for (const [r, o] of Object.entries(e))
    s(r) || (a[r] = o);
  const n = Object.keys(a);
  return t.sort !== !1 && n.sort(t.sort), n.map((r) => {
    const o = e[r];
    return o === void 0 ? "" : o === null ? te(r, t) : Array.isArray(o) ? o.length === 0 && t.arrayFormat === "bracket-separator" ? te(r, t) + "[]" : o.reduce(i(r), []).join("&") : te(r, t) + "=" + te(o, t);
  }).filter((r) => r.length > 0).join("&");
}
function Tn(e, t) {
  var a;
  t = {
    decode: !0,
    ...t
  };
  let [s, i] = Fn(e, "#");
  return s === void 0 && (s = e), {
    url: ((a = s == null ? void 0 : s.split("?")) == null ? void 0 : a[0]) ?? "",
    query: Bi(Ri(e), t),
    ...t && t.parseFragmentIdentifier && i ? { fragmentIdentifier: Pe(i, t) } : {}
  };
}
function Pn(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [_s]: !0,
    ...t
  };
  const s = Mn(e.url).split("?")[0] || "", i = Ri(e.url), a = {
    ...Bi(i, { sort: !1 }),
    ...e.query
  };
  let n = On(a, t);
  n && (n = `?${n}`);
  let r = Rf(e.url);
  if (e.fragmentIdentifier) {
    const o = new URL(s);
    o.hash = e.fragmentIdentifier, r = t[_s] ? o.hash : `#${e.fragmentIdentifier}`;
  }
  return `${s}${n}${r}`;
}
function Vn(e, t, s) {
  s = {
    parseFragmentIdentifier: !0,
    [_s]: !1,
    ...s
  };
  const { url: i, query: a, fragmentIdentifier: n } = Tn(e, s);
  return Pn({
    url: i,
    query: Of(a, t),
    fragmentIdentifier: n
  }, s);
}
function Bf(e, t, s) {
  const i = Array.isArray(t) ? (a) => !t.includes(a) : (a, n) => !t(a, n);
  return Vn(e, i, s);
}
const na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Bf,
  extract: Ri,
  parse: Bi,
  parseUrl: Tn,
  pick: Vn,
  stringify: On,
  stringifyUrl: Pn
}, Symbol.toStringTag, { value: "Module" }));
let We;
class In {
  constructor() {
    B(this, "api", null);
    B(this, "baseUrl", null);
    B(this, "structure", null);
    B(this, "options", null);
    B(this, "errors", null);
    B(this, "errorBag", "default");
    B(this, "states", {
      load: ue.create(),
      fetch: ue.create(),
      filter: ue.create()
    });
    B(this, "query", de({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    B(this, "params", de({
      page: 1
    }));
    B(this, "state", de({
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
  static create(t, s) {
    if (!s)
      throw Error("Listing options have not been provided.");
    const i = new In();
    if (!t)
      throw Error("Structure of search query required.");
    return i.errors = Dt(), i.errors.createBag(this.errorBag), i.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (a) => a
      },
      s
    ), i.setParameters(t), i.options.enableSearchUpdate && i.mergeSearch(), i.baseUrl = s.baseUrl, i.api = ae.create(s.axios || {}), i;
  }
  setParameters(t) {
    const s = JSON.parse(JSON.stringify(t));
    this.structure = Object.assign({}, s), this.params = de(t);
  }
  mergeSearch() {
    const t = na.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    t.page && (t.page = Number(t.page)), Object.assign(this.params, this.structure, t);
  }
  async fetch(t, s) {
    this.states.fetch.loading();
    const i = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl;
    try {
      const { data: n } = await this.api.get(a, {
        params: i,
        cancelToken: s
      });
      return this.states.fetch.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), n;
    } catch {
      this.states.fetch.failed();
    }
  }
  async reload(t) {
    const { data: s } = await this.api.get(t || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.params))
    });
    return Object.assign(this.query, s.query, {
      items: s.query.items.map((i) => this.transformItem(i))
    }), s;
  }
  refreshUrl() {
    const t = window.location.href.replace(/\?.*/, ""), s = JSON.parse(JSON.stringify(this.params)), i = Object.fromEntries(
      Object.entries(s).filter(([n, r]) => r != null)
    ), a = t + "?" + na.stringify(i, { arrayFormat: "bracket" });
    window.history.pushState({}, "", a);
  }
  push(t) {
    this.query.items.push(this.transformItem(t));
  }
  transformItem(t) {
    return this.options.transformItem({
      ...t,
      states: {
        delete: new ue(),
        patch: new ue()
      }
    });
  }
  async load(t) {
    this.errors.clear(null, this.errorBag), We && We.cancel(), We = ae.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let s = null;
    try {
      this.states.fetch.loading();
      const i = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl, n = await this.api.get(a, {
        params: i,
        cancelToken: We.token
      }).catch((r) => {
        throw this.states.fetch.failed(), r;
      });
      if (this.states.fetch.loaded(), s = n.data, this.states.fetch.loaded(), !s || !s.query || !s.query.items)
        throw this.states.fetch.failed(), Error("Response format is invalid.");
      return Object.assign(this.query, s.query, {
        items: s.query.items.map((r) => this.transformItem(r))
      }), s;
    } catch (i) {
      if (ae.isCancel(i))
        this.states.fetch.loaded(), console.error("Request cancelled");
      else
        throw this.states.fetch.failed(), this.errors.set(i, this.errorBag), i;
    }
  }
  onPageChange(t) {
    return this.params.page = t, this.load();
  }
  async patch({ path: t, props: s, payload: i } = {}) {
    const { row: a } = s;
    i = {
      id: a.id,
      ...i
    };
    const { data: n } = await this.api.patch(t || this.baseUrl, i).catch((o) => {
      throw o;
    });
    return n.patch && Object.assign(a, n.patch), (await this.fetch()).query.items.length || (this.params.page--, await this.load()), n;
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
  async processRowAndRefreshList({ path: t, props: s, payload: i, state: a, method: n } = {}) {
    const { row: r, index: o } = s;
    i = {
      id: r.id,
      ...i
    };
    let u = r.states[a];
    u || (u = r.states[a] = ue.create()), u.loading();
    const { data: h } = await this.api[n](
      t || this.baseUrl,
      i
    ).catch((R) => {
      throw u.failed(), R;
    });
    u.loaded(), h.row && Object.assign(r, h.row);
    const g = await this.fetch();
    if (this.query.items.splice(o, 1), !g.query.items.length)
      return this.params.page--, await this.load(), h;
    if (this.query.items.length < g.query.items.length) {
      const R = g.query.items[g.query.items.length - 1];
      this.push(R);
    }
    return h;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), We && We.cancel(), this.states.filter.loading(), this.states.load.loading(), We = ae.CancelToken.source(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let t = null;
    try {
      const s = JSON.parse(JSON.stringify(this.params)), i = this.baseUrl;
      t = (await this.api.get(i, {
        params: s,
        cancelToken: We.token
      }).catch((n) => {
        throw this.states.filter.failed(), n;
      })).data;
    } catch (s) {
      if (ae.isCancel(s)) {
        console.error("Request cancelled");
        return;
      } else
        throw this.states.filter.failed(), this.states.load.failed(), this.errors.set(s, this.errorBag), s;
    }
    if (this.refreshUrl(), !t || !t.query || !t.query.items)
      throw this.states.filter.failed(), Error("Response format is invalid.");
    Object.assign(this.query, t.query, {
      items: t.query.items.map((s) => this.transformItem(s))
    }), this.states.filter.loaded(), this.states.load.loaded(), this.state.isFilterActive = !1;
  }
  showFilter() {
    this.state.isFilterActive = !0;
  }
  cancelFilter() {
    this.state.isFilterActive = !1;
  }
  async resetFilter(t = "url", s = null) {
    t === "url" ? this.mergeSearch() : t === "initial" && (Object.assign(this.params, this.structure), this.refreshUrl()), this.state.isFilterActive = !1, await this.load(s);
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
class Rn {
  constructor() {
    B(this, "state", vt(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new Rn();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class _f {
  static create(t, s = null, i = null) {
    return s = s || t, {
      value: t,
      label: s
    };
  }
}
class jf {
  constructor() {
    B(this, "structure", {});
    B(this, "query", de({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    B(this, "params", de({
      page: 1
    }));
    B(this, "router", null);
  }
  static create(t, s = {}, i = {}, a) {
    i = Object.assign(
      { base: "/api/admin", route: `${t}.index` },
      i
    );
    const n = i.base, r = {
      route: i.route,
      index: i.index || `${n}/${t}/index`,
      destroy: `${n}/${t}/destroy`
    }, o = new this();
    return o.options = i, o.structure = s, o.params = Object.assign(o.params, s), o.router = a, o.urls = r, o;
  }
  async fetch(t) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: s } = await ae.get(t || this.urls.index, {
      params: this.params
    }).catch((i) => {
      throw this.query.isLoading = !1, i;
    });
    return await this.router.push({ name: this.urls.route, query: this.params }), this.query.isLoading = !1, this.query.isLoaded = !0, s;
  }
  async load(t) {
    const s = await this.fetch(t);
    return Object.assign(this.query, s.query, {
      items: s.query.items.map((i) => ({
        ...i,
        isProcessing: !1
      }))
    }), s;
  }
  onPageChange(t) {
    return this.params.page = t, this.load();
  }
  async action(t, { row: s, index: i, remove: a, method: n }, r = {}) {
    s.isProcessing = !0;
    const o = {
      id: s.id,
      ...r
    };
    if (n === "delete") {
      const { data: u } = await ae.delete(t, {
        data: o
      }).catch((h) => {
        throw s.isProcessing = !1, h;
      });
      s.isProcessing = !1, u.row && Object.assign(s, u.row);
    } else {
      const { data: u } = await ae.post(t, o).catch((h) => {
        throw s.isProcessing = !1, h;
      });
      s.isProcessing = !1, u.row && Object.assign(s, u.row);
    }
    if (a) {
      const u = await this.fetch();
      if (this.query.items.splice(i, 1), !u.query.items.length) {
        this.params.page--, await this.load();
        return;
      }
      this.query.items.length < u.query.items.length && this.query.items.push(u.query.items[u.query.items.length - 1]);
    }
  }
  destroy(t, s) {
    return this.action(this.urls.destroy, { ...t, remove: !0 }, s);
  }
  async resetFilter(t = null) {
    Object.assign(this.params, this.structure), this.query.isFilterActive = !1, await this.load(t);
  }
}
class Uf {
  constructor(t) {
    B(this, "current", vt(null));
    B(this, "history", vt([]));
    B(this, "flow", []);
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
    const t = this.flow.findIndex((i) => i === this.getCurrent()), s = this.flow[t + 1];
    if (s) {
      this.set(s);
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
function qf(e) {
  const { oruga: t } = fi();
  t.notification.open({
    message: e || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class Bn {
  constructor(t) {
    B(this, "attributes", de({
      name: null
    }));
    B(this, "callbacks", {});
    this.attributes.name = t;
  }
  is(t) {
    return this.attributes.name === t;
  }
  onChange(t) {
    this.callbacks = t;
  }
  activeClass(t, s) {
    return {
      class: this.is(t) ? s : []
    };
  }
  set(t) {
    this.attributes.name = t, this.callbacks[t] && this.callbacks[t]();
  }
  assign(t) {
    Object.assign(this, t);
  }
  static create(t) {
    return new Bn(t);
  }
}
const Ps = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Qn, "./components/WyxosCollection.vue": ir, "./components/WyxosConfirm.vue": hr, "./components/WyxosDatepicker.vue": gd, "./components/WyxosError.vue": kd, "./components/WyxosForm.vue": $d, "./components/WyxosImage.vue": Pd, "./components/WyxosInput.vue": Bd, "./components/WyxosLogout.vue": tf, "./components/WyxosProgress.vue": lf, "./components/WyxosPrompt.vue": mf, "./components/WyxosSelect.vue": Cf, "./components/WyxosTags.vue": kf }), Nn = {}, Nf = (e, t = { vision: {}, oruga: {} }) => {
  Xm.install(e, t.oruga), Object.keys(Ps).forEach((s) => {
    const i = Ps[s].default.name, a = Ps[s].default;
    e.component(i, a), e.component(i.replace("Wyxos", "W"), a), Nn[i] = a;
  });
}, Kf = {
  install: Nf,
  ...Nn
};
export {
  zf as FileRequest,
  bs as FormBuilder,
  In as Listing,
  ue as LoadState,
  Rn as Modal,
  _f as Option,
  jf as ResourceList,
  Ii as Search,
  Uf as Steps,
  Bn as Tab,
  Xn as WyxosButton,
  sr as WyxosCollection,
  dr as WyxosConfirm,
  pd as WyxosDatepicker,
  Sd as WyxosError,
  Fd as WyxosForm,
  Td as WyxosImage,
  Rd as WyxosInput,
  ef as WyxosLogout,
  of as WyxosProgress,
  cf as WyxosPrompt,
  yf as WyxosSelect,
  Sf as WyxosTags,
  Hf as auth,
  Wf as dateRender,
  Kf as default,
  ta as errorHandler,
  qf as success,
  Dt as useFormErrors
};
