var qn = Object.defineProperty;
var Bn = (e, t, r) => t in e ? qn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var b = (e, t, r) => (Bn(e, typeof t != "symbol" ? t + "" : t, r), r);
import { resolveComponent as q, openBlock as A, createBlock as Ee, withCtx as K, renderSlot as Ve, createTextVNode as Ae, createCommentVNode as Te, toDisplayString as $, createElementBlock as se, normalizeProps as zn, guardReactiveProps as Gn, createElementVNode as B, reactive as H, createVNode as Fe, normalizeClass as Jn, mergeProps as tt, defineComponent as br, withModifiers as Zn, Fragment as _s, renderList as Kn, ref as ir } from "vue";
const G = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [s, n] of t)
    r[s] = n;
  return r;
}, Qn = {
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
}, Xn = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function ei(e, t, r, s, n, i) {
  const a = q("o-button");
  return A(), Ee(a, { disabled: r.loading }, {
    default: K(() => [
      r.loading ? Te("", !0) : Ve(e.$slots, "default", { key: 0 }, () => [
        Ae("Submit")
      ]),
      r.loading && r.text ? Ve(e.$slots, "loading", { key: 1 }, () => [
        Ae($(r.text), 1)
      ]) : Te("", !0),
      r.loading ? (A(), se("i", Xn)) : Te("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const ti = /* @__PURE__ */ G(Qn, [["render", ei]]), ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ti
}, Symbol.toStringTag, { value: "Module" })), si = {
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
}, ni = /* @__PURE__ */ B("ul", null, [
  /* @__PURE__ */ B("li")
], -1);
function ii(e, t, r, s, n, i) {
  return Ve(e.$slots, "default", zn(Gn({ add: i.add, remove: i.remove, items: n.items })), () => [
    ni
  ]);
}
const ai = /* @__PURE__ */ G(si, [["render", ii]]), oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ai
}, Symbol.toStringTag, { value: "Module" }));
class I {
  constructor() {
    b(this, "state", H({
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
    return new I();
  }
}
const li = {
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
      state: new I()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, ui = { class: "bg-white p-6" }, ci = { class: "title" }, di = { class: "mb-6" }, fi = {
  class: "buttons",
  role: "group"
};
function hi(e, t, r, s, n, i) {
  const a = q("wyxos-button"), o = q("o-modal");
  return A(), Ee(o, {
    active: !0,
    onClose: t[2] || (t[2] = (u) => e.$emit("close", { action: !1 }))
  }, {
    default: K(() => [
      B("section", ui, [
        B("article", null, [
          B("header", null, [
            B("h3", ci, $(r.title), 1)
          ]),
          B("p", di, $(r.message), 1),
          B("footer", fi, [
            Fe(a, {
              disabled: s.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
            }, {
              default: K(() => [
                Ae($(r.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            Fe(a, {
              class: Jn([{ [r.confirmType]: !0 }, "button"]),
              loading: s.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (u) => i.proceed())
            }, {
              default: K(() => [
                Ae($(r.confirmText), 1)
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
const mi = /* @__PURE__ */ G(li, [["render", hi]]), yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mi
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var gs;
function h() {
  return gs.apply(null, arguments);
}
function pi(e) {
  gs = e;
}
function ne(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Ne(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function M(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Sr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (M(e, t))
      return !1;
  return !0;
}
function j(e) {
  return e === void 0;
}
function Se(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function ot(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function ws(e, t) {
  var r = [], s, n = e.length;
  for (s = 0; s < n; ++s)
    r.push(t(e[s], s));
  return r;
}
function Me(e, t) {
  for (var r in t)
    M(t, r) && (e[r] = t[r]);
  return M(t, "toString") && (e.toString = t.toString), M(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ce(e, t, r, s) {
  return Hs(e, t, r, s, !0).utc();
}
function _i() {
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
  return e._pf == null && (e._pf = _i()), e._pf;
}
var ar;
Array.prototype.some ? ar = Array.prototype.some : ar = function(e) {
  var t = Object(this), r = t.length >>> 0, s;
  for (s = 0; s < r; s++)
    if (s in t && e.call(this, t[s], s, t))
      return !0;
  return !1;
};
function Or(e) {
  if (e._isValid == null) {
    var t = g(e), r = ar.call(t.parsedDateParts, function(n) {
      return n != null;
    }), s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && r);
    if (e._strict && (s = s && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = s;
    else
      return s;
  }
  return e._isValid;
}
function Rt(e) {
  var t = ce(NaN);
  return e != null ? Me(g(t), e) : g(t).userInvalidated = !0, t;
}
var Jr = h.momentProperties = [], Zt = !1;
function kr(e, t) {
  var r, s, n, i = Jr.length;
  if (j(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), j(t._i) || (e._i = t._i), j(t._f) || (e._f = t._f), j(t._l) || (e._l = t._l), j(t._strict) || (e._strict = t._strict), j(t._tzm) || (e._tzm = t._tzm), j(t._isUTC) || (e._isUTC = t._isUTC), j(t._offset) || (e._offset = t._offset), j(t._pf) || (e._pf = g(t)), j(t._locale) || (e._locale = t._locale), i > 0)
    for (r = 0; r < i; r++)
      s = Jr[r], n = t[s], j(n) || (e[s] = n);
  return e;
}
function lt(e) {
  kr(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), Zt === !1 && (Zt = !0, h.updateOffset(this), Zt = !1);
}
function ie(e) {
  return e instanceof lt || e != null && e._isAMomentObject != null;
}
function bs(e) {
  h.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function X(e, t) {
  var r = !0;
  return Me(function() {
    if (h.deprecationHandler != null && h.deprecationHandler(null, e), r) {
      var s = [], n, i, a, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (n = "", typeof arguments[i] == "object") {
          n += `
[` + i + "] ";
          for (a in arguments[0])
            M(arguments[0], a) && (n += a + ": " + arguments[0][a] + ", ");
          n = n.slice(0, -2);
        } else
          n = arguments[i];
        s.push(n);
      }
      bs(
        e + `
Arguments: ` + Array.prototype.slice.call(s).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var Zr = {};
function Ss(e, t) {
  h.deprecationHandler != null && h.deprecationHandler(e, t), Zr[e] || (bs(t), Zr[e] = !0);
}
h.suppressDeprecationWarnings = !1;
h.deprecationHandler = null;
function de(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function gi(e) {
  var t, r;
  for (r in e)
    M(e, r) && (t = e[r], de(t) ? this[r] = t : this["_" + r] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function or(e, t) {
  var r = Me({}, e), s;
  for (s in t)
    M(t, s) && (Ne(e[s]) && Ne(t[s]) ? (r[s] = {}, Me(r[s], e[s]), Me(r[s], t[s])) : t[s] != null ? r[s] = t[s] : delete r[s]);
  for (s in e)
    M(e, s) && !M(t, s) && Ne(e[s]) && (r[s] = Me({}, r[s]));
  return r;
}
function Dr(e) {
  e != null && this.set(e);
}
var lr;
Object.keys ? lr = Object.keys : lr = function(e) {
  var t, r = [];
  for (t in e)
    M(e, t) && r.push(t);
  return r;
};
var wi = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function bi(e, t, r) {
  var s = this._calendar[e] || this._calendar.sameElse;
  return de(s) ? s.call(t, r) : s;
}
function ue(e, t, r) {
  var s = "" + Math.abs(e), n = t - s.length, i = e >= 0;
  return (i ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, n)).toString().substr(1) + s;
}
var Mr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, mt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Kt = {}, Ie = {};
function p(e, t, r, s) {
  var n = s;
  typeof s == "string" && (n = function() {
    return this[s]();
  }), e && (Ie[e] = n), t && (Ie[t[0]] = function() {
    return ue(n.apply(this, arguments), t[1], t[2]);
  }), r && (Ie[r] = function() {
    return this.localeData().ordinal(
      n.apply(this, arguments),
      e
    );
  });
}
function Si(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Oi(e) {
  var t = e.match(Mr), r, s;
  for (r = 0, s = t.length; r < s; r++)
    Ie[t[r]] ? t[r] = Ie[t[r]] : t[r] = Si(t[r]);
  return function(n) {
    var i = "", a;
    for (a = 0; a < s; a++)
      i += de(t[a]) ? t[a].call(n, e) : t[a];
    return i;
  };
}
function _t(e, t) {
  return e.isValid() ? (t = Os(t, e.localeData()), Kt[t] = Kt[t] || Oi(t), Kt[t](e)) : e.localeData().invalidDate();
}
function Os(e, t) {
  var r = 5;
  function s(n) {
    return t.longDateFormat(n) || n;
  }
  for (mt.lastIndex = 0; r >= 0 && mt.test(e); )
    e = e.replace(
      mt,
      s
    ), mt.lastIndex = 0, r -= 1;
  return e;
}
var ki = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Di(e) {
  var t = this._longDateFormat[e], r = this._longDateFormat[e.toUpperCase()];
  return t || !r ? t : (this._longDateFormat[e] = r.match(Mr).map(function(s) {
    return s === "MMMM" || s === "MM" || s === "DD" || s === "dddd" ? s.slice(1) : s;
  }).join(""), this._longDateFormat[e]);
}
var Mi = "Invalid date";
function vi() {
  return this._invalidDate;
}
var Ti = "%d", xi = /\d{1,2}/;
function Fi(e) {
  return this._ordinal.replace("%d", e);
}
var Ei = {
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
function Ri(e, t, r, s) {
  var n = this._relativeTime[r];
  return de(n) ? n(e, t, r, s) : n.replace(/%d/i, e);
}
function Pi(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return de(r) ? r(t) : r.replace(/%s/i, t);
}
var Xe = {};
function W(e, t) {
  var r = e.toLowerCase();
  Xe[r] = Xe[r + "s"] = Xe[t] = e;
}
function ee(e) {
  return typeof e == "string" ? Xe[e] || Xe[e.toLowerCase()] : void 0;
}
function vr(e) {
  var t = {}, r, s;
  for (s in e)
    M(e, s) && (r = ee(s), r && (t[r] = e[s]));
  return t;
}
var ks = {};
function U(e, t) {
  ks[e] = t;
}
function Yi(e) {
  var t = [], r;
  for (r in e)
    M(e, r) && t.push({ unit: r, priority: ks[r] });
  return t.sort(function(s, n) {
    return s.priority - n.priority;
  }), t;
}
function Pt(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function Z(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function w(e) {
  var t = +e, r = 0;
  return t !== 0 && isFinite(t) && (r = Z(t)), r;
}
function Be(e, t) {
  return function(r) {
    return r != null ? (Ds(this, e, r), h.updateOffset(this, t), this) : Dt(this, e);
  };
}
function Dt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Ds(e, t, r) {
  e.isValid() && !isNaN(r) && (t === "FullYear" && Pt(e.year()) && e.month() === 1 && e.date() === 29 ? (r = w(r), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    r,
    e.month(),
    Wt(r, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function Ni(e) {
  return e = ee(e), de(this[e]) ? this[e]() : this;
}
function Ai(e, t) {
  if (typeof e == "object") {
    e = vr(e);
    var r = Yi(e), s, n = r.length;
    for (s = 0; s < n; s++)
      this[r[s].unit](e[r[s].unit]);
  } else if (e = ee(e), de(this[e]))
    return this[e](t);
  return this;
}
var Ms = /\d/, J = /\d\d/, vs = /\d{3}/, Tr = /\d{4}/, Yt = /[+-]?\d{6}/, E = /\d\d?/, Ts = /\d\d\d\d?/, xs = /\d\d\d\d\d\d?/, Nt = /\d{1,3}/, xr = /\d{1,4}/, At = /[+-]?\d{1,6}/, ze = /\d+/, Ct = /[+-]?\d+/, Ci = /Z|[+-]\d\d:?\d\d/gi, Lt = /Z|[+-]\d\d(?::?\d\d)?/gi, Li = /[+-]?\d+(\.\d{1,3})?/, ut = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Mt;
Mt = {};
function y(e, t, r) {
  Mt[e] = de(t) ? t : function(s, n) {
    return s && r ? r : t;
  };
}
function Wi(e, t) {
  return M(Mt, e) ? Mt[e](t._strict, t._locale) : new RegExp(Ui(e));
}
function Ui(e) {
  return z(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, r, s, n, i) {
        return r || s || n || i;
      }
    )
  );
}
function z(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var ur = {};
function T(e, t) {
  var r, s = t, n;
  for (typeof e == "string" && (e = [e]), Se(t) && (s = function(i, a) {
    a[t] = w(i);
  }), n = e.length, r = 0; r < n; r++)
    ur[e[r]] = s;
}
function ct(e, t) {
  T(e, function(r, s, n, i) {
    n._w = n._w || {}, t(r, n._w, n, i);
  });
}
function ji(e, t, r) {
  t != null && M(ur, e) && ur[e](t, r._a, r, e);
}
var L = 0, _e = 1, oe = 2, N = 3, re = 4, ge = 5, Ye = 6, Ii = 7, $i = 8;
function Hi(e, t) {
  return (e % t + t) % t;
}
var P;
Array.prototype.indexOf ? P = Array.prototype.indexOf : P = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function Wt(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var r = Hi(t, 12);
  return e += (t - r) / 12, r === 1 ? Pt(e) ? 29 : 28 : 31 - r % 7 % 2;
}
p("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
p("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
p("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
W("month", "M");
U("month", 8);
y("M", E);
y("MM", E, J);
y("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
y("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
T(["M", "MM"], function(e, t) {
  t[_e] = w(e) - 1;
});
T(["MMM", "MMMM"], function(e, t, r, s) {
  var n = r._locale.monthsParse(e, s, r._strict);
  n != null ? t[_e] = n : g(r).invalidMonth = e;
});
var Vi = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Fs = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Es = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, qi = ut, Bi = ut;
function zi(e, t) {
  return e ? ne(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Es).test(t) ? "format" : "standalone"][e.month()] : ne(this._months) ? this._months : this._months.standalone;
}
function Gi(e, t) {
  return e ? ne(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Es.test(t) ? "format" : "standalone"][e.month()] : ne(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Ji(e, t, r) {
  var s, n, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s)
      i = ce([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[s] = this.months(i, "").toLocaleLowerCase();
  return r ? t === "MMM" ? (n = P.call(this._shortMonthsParse, a), n !== -1 ? n : null) : (n = P.call(this._longMonthsParse, a), n !== -1 ? n : null) : t === "MMM" ? (n = P.call(this._shortMonthsParse, a), n !== -1 ? n : (n = P.call(this._longMonthsParse, a), n !== -1 ? n : null)) : (n = P.call(this._longMonthsParse, a), n !== -1 ? n : (n = P.call(this._shortMonthsParse, a), n !== -1 ? n : null));
}
function Zi(e, t, r) {
  var s, n, i;
  if (this._monthsParseExact)
    return Ji.call(this, e, t, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
    if (n = ce([2e3, s]), r && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp(
      "^" + this.months(n, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[s] = new RegExp(
      "^" + this.monthsShort(n, "").replace(".", "") + "$",
      "i"
    )), !r && !this._monthsParse[s] && (i = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[s] = new RegExp(i.replace(".", ""), "i")), r && t === "MMMM" && this._longMonthsParse[s].test(e))
      return s;
    if (r && t === "MMM" && this._shortMonthsParse[s].test(e))
      return s;
    if (!r && this._monthsParse[s].test(e))
      return s;
  }
}
function Rs(e, t) {
  var r;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = w(t);
    else if (t = e.localeData().monthsParse(t), !Se(t))
      return e;
  }
  return r = Math.min(e.date(), Wt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e;
}
function Ps(e) {
  return e != null ? (Rs(this, e), h.updateOffset(this, !0), this) : Dt(this, "Month");
}
function Ki() {
  return Wt(this.year(), this.month());
}
function Qi(e) {
  return this._monthsParseExact ? (M(this, "_monthsRegex") || Ys.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (M(this, "_monthsShortRegex") || (this._monthsShortRegex = qi), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Xi(e) {
  return this._monthsParseExact ? (M(this, "_monthsRegex") || Ys.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (M(this, "_monthsRegex") || (this._monthsRegex = Bi), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Ys() {
  function e(a, o) {
    return o.length - a.length;
  }
  var t = [], r = [], s = [], n, i;
  for (n = 0; n < 12; n++)
    i = ce([2e3, n]), t.push(this.monthsShort(i, "")), r.push(this.months(i, "")), s.push(this.months(i, "")), s.push(this.monthsShort(i, ""));
  for (t.sort(e), r.sort(e), s.sort(e), n = 0; n < 12; n++)
    t[n] = z(t[n]), r[n] = z(r[n]);
  for (n = 0; n < 24; n++)
    s[n] = z(s[n]);
  this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
p("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? ue(e, 4) : "+" + e;
});
p(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
p(0, ["YYYY", 4], 0, "year");
p(0, ["YYYYY", 5], 0, "year");
p(0, ["YYYYYY", 6, !0], 0, "year");
W("year", "y");
U("year", 1);
y("Y", Ct);
y("YY", E, J);
y("YYYY", xr, Tr);
y("YYYYY", At, Yt);
y("YYYYYY", At, Yt);
T(["YYYYY", "YYYYYY"], L);
T("YYYY", function(e, t) {
  t[L] = e.length === 2 ? h.parseTwoDigitYear(e) : w(e);
});
T("YY", function(e, t) {
  t[L] = h.parseTwoDigitYear(e);
});
T("Y", function(e, t) {
  t[L] = parseInt(e, 10);
});
function et(e) {
  return Pt(e) ? 366 : 365;
}
h.parseTwoDigitYear = function(e) {
  return w(e) + (w(e) > 68 ? 1900 : 2e3);
};
var Ns = Be("FullYear", !0);
function ea() {
  return Pt(this.year());
}
function ta(e, t, r, s, n, i, a) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, r, s, n, i, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, r, s, n, i, a), o;
}
function rt(e) {
  var t, r;
  return e < 100 && e >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function vt(e, t, r) {
  var s = 7 + t - r, n = (7 + rt(e, 0, s).getUTCDay() - t) % 7;
  return -n + s - 1;
}
function As(e, t, r, s, n) {
  var i = (7 + r - s) % 7, a = vt(e, s, n), o = 1 + 7 * (t - 1) + i + a, u, l;
  return o <= 0 ? (u = e - 1, l = et(u) + o) : o > et(e) ? (u = e + 1, l = o - et(e)) : (u = e, l = o), {
    year: u,
    dayOfYear: l
  };
}
function st(e, t, r) {
  var s = vt(e.year(), t, r), n = Math.floor((e.dayOfYear() - s - 1) / 7) + 1, i, a;
  return n < 1 ? (a = e.year() - 1, i = n + we(a, t, r)) : n > we(e.year(), t, r) ? (i = n - we(e.year(), t, r), a = e.year() + 1) : (a = e.year(), i = n), {
    week: i,
    year: a
  };
}
function we(e, t, r) {
  var s = vt(e, t, r), n = vt(e + 1, t, r);
  return (et(e) - s + n) / 7;
}
p("w", ["ww", 2], "wo", "week");
p("W", ["WW", 2], "Wo", "isoWeek");
W("week", "w");
W("isoWeek", "W");
U("week", 5);
U("isoWeek", 5);
y("w", E);
y("ww", E, J);
y("W", E);
y("WW", E, J);
ct(
  ["w", "ww", "W", "WW"],
  function(e, t, r, s) {
    t[s.substr(0, 1)] = w(e);
  }
);
function ra(e) {
  return st(e, this._week.dow, this._week.doy).week;
}
var sa = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function na() {
  return this._week.dow;
}
function ia() {
  return this._week.doy;
}
function aa(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function oa(e) {
  var t = st(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
p("d", 0, "do", "day");
p("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
p("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
p("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
p("e", 0, 0, "weekday");
p("E", 0, 0, "isoWeekday");
W("day", "d");
W("weekday", "e");
W("isoWeekday", "E");
U("day", 11);
U("weekday", 11);
U("isoWeekday", 11);
y("d", E);
y("e", E);
y("E", E);
y("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
y("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
y("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
ct(["dd", "ddd", "dddd"], function(e, t, r, s) {
  var n = r._locale.weekdaysParse(e, s, r._strict);
  n != null ? t.d = n : g(r).invalidWeekday = e;
});
ct(["d", "e", "E"], function(e, t, r, s) {
  t[s] = w(e);
});
function la(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function ua(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Fr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var ca = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Cs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), da = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), fa = ut, ha = ut, ma = ut;
function ya(e, t) {
  var r = ne(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Fr(r, this._week.dow) : e ? r[e.day()] : r;
}
function pa(e) {
  return e === !0 ? Fr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function _a(e) {
  return e === !0 ? Fr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function ga(e, t, r) {
  var s, n, i, a = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s)
      i = ce([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(i, "").toLocaleLowerCase();
  return r ? t === "dddd" ? (n = P.call(this._weekdaysParse, a), n !== -1 ? n : null) : t === "ddd" ? (n = P.call(this._shortWeekdaysParse, a), n !== -1 ? n : null) : (n = P.call(this._minWeekdaysParse, a), n !== -1 ? n : null) : t === "dddd" ? (n = P.call(this._weekdaysParse, a), n !== -1 || (n = P.call(this._shortWeekdaysParse, a), n !== -1) ? n : (n = P.call(this._minWeekdaysParse, a), n !== -1 ? n : null)) : t === "ddd" ? (n = P.call(this._shortWeekdaysParse, a), n !== -1 || (n = P.call(this._weekdaysParse, a), n !== -1) ? n : (n = P.call(this._minWeekdaysParse, a), n !== -1 ? n : null)) : (n = P.call(this._minWeekdaysParse, a), n !== -1 || (n = P.call(this._weekdaysParse, a), n !== -1) ? n : (n = P.call(this._shortWeekdaysParse, a), n !== -1 ? n : null));
}
function wa(e, t, r) {
  var s, n, i;
  if (this._weekdaysParseExact)
    return ga.call(this, e, t, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
    if (n = ce([2e3, 1]).day(s), r && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp(
      "^" + this.weekdays(n, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysShort(n, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysMin(n, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[s] || (i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[s] = new RegExp(i.replace(".", ""), "i")), r && t === "dddd" && this._fullWeekdaysParse[s].test(e))
      return s;
    if (r && t === "ddd" && this._shortWeekdaysParse[s].test(e))
      return s;
    if (r && t === "dd" && this._minWeekdaysParse[s].test(e))
      return s;
    if (!r && this._weekdaysParse[s].test(e))
      return s;
  }
}
function ba(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = la(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Sa(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Oa(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = ua(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function ka(e) {
  return this._weekdaysParseExact ? (M(this, "_weekdaysRegex") || Er.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (M(this, "_weekdaysRegex") || (this._weekdaysRegex = fa), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Da(e) {
  return this._weekdaysParseExact ? (M(this, "_weekdaysRegex") || Er.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (M(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = ha), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Ma(e) {
  return this._weekdaysParseExact ? (M(this, "_weekdaysRegex") || Er.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (M(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = ma), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Er() {
  function e(d, m) {
    return m.length - d.length;
  }
  var t = [], r = [], s = [], n = [], i, a, o, u, l;
  for (i = 0; i < 7; i++)
    a = ce([2e3, 1]).day(i), o = z(this.weekdaysMin(a, "")), u = z(this.weekdaysShort(a, "")), l = z(this.weekdays(a, "")), t.push(o), r.push(u), s.push(l), n.push(o), n.push(u), n.push(l);
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
function Rr() {
  return this.hours() % 12 || 12;
}
function va() {
  return this.hours() || 24;
}
p("H", ["HH", 2], 0, "hour");
p("h", ["hh", 2], 0, Rr);
p("k", ["kk", 2], 0, va);
p("hmm", 0, 0, function() {
  return "" + Rr.apply(this) + ue(this.minutes(), 2);
});
p("hmmss", 0, 0, function() {
  return "" + Rr.apply(this) + ue(this.minutes(), 2) + ue(this.seconds(), 2);
});
p("Hmm", 0, 0, function() {
  return "" + this.hours() + ue(this.minutes(), 2);
});
p("Hmmss", 0, 0, function() {
  return "" + this.hours() + ue(this.minutes(), 2) + ue(this.seconds(), 2);
});
function Ls(e, t) {
  p(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
Ls("a", !0);
Ls("A", !1);
W("hour", "h");
U("hour", 13);
function Ws(e, t) {
  return t._meridiemParse;
}
y("a", Ws);
y("A", Ws);
y("H", E);
y("h", E);
y("k", E);
y("HH", E, J);
y("hh", E, J);
y("kk", E, J);
y("hmm", Ts);
y("hmmss", xs);
y("Hmm", Ts);
y("Hmmss", xs);
T(["H", "HH"], N);
T(["k", "kk"], function(e, t, r) {
  var s = w(e);
  t[N] = s === 24 ? 0 : s;
});
T(["a", "A"], function(e, t, r) {
  r._isPm = r._locale.isPM(e), r._meridiem = e;
});
T(["h", "hh"], function(e, t, r) {
  t[N] = w(e), g(r).bigHour = !0;
});
T("hmm", function(e, t, r) {
  var s = e.length - 2;
  t[N] = w(e.substr(0, s)), t[re] = w(e.substr(s)), g(r).bigHour = !0;
});
T("hmmss", function(e, t, r) {
  var s = e.length - 4, n = e.length - 2;
  t[N] = w(e.substr(0, s)), t[re] = w(e.substr(s, 2)), t[ge] = w(e.substr(n)), g(r).bigHour = !0;
});
T("Hmm", function(e, t, r) {
  var s = e.length - 2;
  t[N] = w(e.substr(0, s)), t[re] = w(e.substr(s));
});
T("Hmmss", function(e, t, r) {
  var s = e.length - 4, n = e.length - 2;
  t[N] = w(e.substr(0, s)), t[re] = w(e.substr(s, 2)), t[ge] = w(e.substr(n));
});
function Ta(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var xa = /[ap]\.?m?\.?/i, Fa = Be("Hours", !0);
function Ea(e, t, r) {
  return e > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var Us = {
  calendar: wi,
  longDateFormat: ki,
  invalidDate: Mi,
  ordinal: Ti,
  dayOfMonthOrdinalParse: xi,
  relativeTime: Ei,
  months: Vi,
  monthsShort: Fs,
  week: sa,
  weekdays: ca,
  weekdaysMin: da,
  weekdaysShort: Cs,
  meridiemParse: xa
}, R = {}, Je = {}, nt;
function Ra(e, t) {
  var r, s = Math.min(e.length, t.length);
  for (r = 0; r < s; r += 1)
    if (e[r] !== t[r])
      return r;
  return s;
}
function Kr(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Pa(e) {
  for (var t = 0, r, s, n, i; t < e.length; ) {
    for (i = Kr(e[t]).split("-"), r = i.length, s = Kr(e[t + 1]), s = s ? s.split("-") : null; r > 0; ) {
      if (n = Ut(i.slice(0, r).join("-")), n)
        return n;
      if (s && s.length >= r && Ra(i, s) >= r - 1)
        break;
      r--;
    }
    t++;
  }
  return nt;
}
function Ya(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Ut(e) {
  var t = null, r;
  if (R[e] === void 0 && typeof module < "u" && module && module.exports && Ya(e))
    try {
      t = nt._abbr, r = require, r("./locale/" + e), xe(t);
    } catch {
      R[e] = null;
    }
  return R[e];
}
function xe(e, t) {
  var r;
  return e && (j(t) ? r = Oe(e) : r = Pr(e, t), r ? nt = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), nt._abbr;
}
function Pr(e, t) {
  if (t !== null) {
    var r, s = Us;
    if (t.abbr = e, R[e] != null)
      Ss(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), s = R[e]._config;
    else if (t.parentLocale != null)
      if (R[t.parentLocale] != null)
        s = R[t.parentLocale]._config;
      else if (r = Ut(t.parentLocale), r != null)
        s = r._config;
      else
        return Je[t.parentLocale] || (Je[t.parentLocale] = []), Je[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return R[e] = new Dr(or(s, t)), Je[e] && Je[e].forEach(function(n) {
      Pr(n.name, n.config);
    }), xe(e), R[e];
  } else
    return delete R[e], null;
}
function Na(e, t) {
  if (t != null) {
    var r, s, n = Us;
    R[e] != null && R[e].parentLocale != null ? R[e].set(or(R[e]._config, t)) : (s = Ut(e), s != null && (n = s._config), t = or(n, t), s == null && (t.abbr = e), r = new Dr(t), r.parentLocale = R[e], R[e] = r), xe(e);
  } else
    R[e] != null && (R[e].parentLocale != null ? (R[e] = R[e].parentLocale, e === xe() && xe(e)) : R[e] != null && delete R[e]);
  return R[e];
}
function Oe(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return nt;
  if (!ne(e)) {
    if (t = Ut(e), t)
      return t;
    e = [e];
  }
  return Pa(e);
}
function Aa() {
  return lr(R);
}
function Yr(e) {
  var t, r = e._a;
  return r && g(e).overflow === -2 && (t = r[_e] < 0 || r[_e] > 11 ? _e : r[oe] < 1 || r[oe] > Wt(r[L], r[_e]) ? oe : r[N] < 0 || r[N] > 24 || r[N] === 24 && (r[re] !== 0 || r[ge] !== 0 || r[Ye] !== 0) ? N : r[re] < 0 || r[re] > 59 ? re : r[ge] < 0 || r[ge] > 59 ? ge : r[Ye] < 0 || r[Ye] > 999 ? Ye : -1, g(e)._overflowDayOfYear && (t < L || t > oe) && (t = oe), g(e)._overflowWeeks && t === -1 && (t = Ii), g(e)._overflowWeekday && t === -1 && (t = $i), g(e).overflow = t), e;
}
var Ca = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, La = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Wa = /Z|[+-]\d\d(?::?\d\d)?/, yt = [
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
], Qt = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], Ua = /^\/?Date\((-?\d+)/i, ja = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Ia = {
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
function js(e) {
  var t, r, s = e._i, n = Ca.exec(s) || La.exec(s), i, a, o, u, l = yt.length, d = Qt.length;
  if (n) {
    for (g(e).iso = !0, t = 0, r = l; t < r; t++)
      if (yt[t][1].exec(n[1])) {
        a = yt[t][0], i = yt[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (n[3]) {
      for (t = 0, r = d; t < r; t++)
        if (Qt[t][1].exec(n[3])) {
          o = (n[2] || " ") + Qt[t][0];
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
    if (n[4])
      if (Wa.exec(n[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (u || ""), Ar(e);
  } else
    e._isValid = !1;
}
function $a(e, t, r, s, n, i) {
  var a = [
    Ha(e),
    Fs.indexOf(t),
    parseInt(r, 10),
    parseInt(s, 10),
    parseInt(n, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function Ha(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Va(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function qa(e, t, r) {
  if (e) {
    var s = Cs.indexOf(e), n = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (s !== n)
      return g(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function Ba(e, t, r) {
  if (e)
    return Ia[e];
  if (t)
    return 0;
  var s = parseInt(r, 10), n = s % 100, i = (s - n) / 100;
  return i * 60 + n;
}
function Is(e) {
  var t = ja.exec(Va(e._i)), r;
  if (t) {
    if (r = $a(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !qa(t[1], r, e))
      return;
    e._a = r, e._tzm = Ba(t[8], t[9], t[10]), e._d = rt.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), g(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function za(e) {
  var t = Ua.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (js(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Is(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : h.createFromInputFallback(e);
}
h.createFromInputFallback = X(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Ue(e, t, r) {
  return e ?? t ?? r;
}
function Ga(e) {
  var t = new Date(h.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Nr(e) {
  var t, r, s = [], n, i, a;
  if (!e._d) {
    for (n = Ga(e), e._w && e._a[oe] == null && e._a[_e] == null && Ja(e), e._dayOfYear != null && (a = Ue(e._a[L], n[L]), (e._dayOfYear > et(a) || e._dayOfYear === 0) && (g(e)._overflowDayOfYear = !0), r = rt(a, 0, e._dayOfYear), e._a[_e] = r.getUTCMonth(), e._a[oe] = r.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = s[t] = n[t];
    for (; t < 7; t++)
      e._a[t] = s[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[N] === 24 && e._a[re] === 0 && e._a[ge] === 0 && e._a[Ye] === 0 && (e._nextDay = !0, e._a[N] = 0), e._d = (e._useUTC ? rt : ta).apply(
      null,
      s
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[N] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (g(e).weekdayMismatch = !0);
  }
}
function Ja(e) {
  var t, r, s, n, i, a, o, u, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, r = Ue(
    t.GG,
    e._a[L],
    st(F(), 1, 4).year
  ), s = Ue(t.W, 1), n = Ue(t.E, 1), (n < 1 || n > 7) && (u = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = st(F(), i, a), r = Ue(t.gg, e._a[L], l.year), s = Ue(t.w, l.week), t.d != null ? (n = t.d, (n < 0 || n > 6) && (u = !0)) : t.e != null ? (n = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : n = i), s < 1 || s > we(r, i, a) ? g(e)._overflowWeeks = !0 : u != null ? g(e)._overflowWeekday = !0 : (o = As(r, s, n, i, a), e._a[L] = o.year, e._dayOfYear = o.dayOfYear);
}
h.ISO_8601 = function() {
};
h.RFC_2822 = function() {
};
function Ar(e) {
  if (e._f === h.ISO_8601) {
    js(e);
    return;
  }
  if (e._f === h.RFC_2822) {
    Is(e);
    return;
  }
  e._a = [], g(e).empty = !0;
  var t = "" + e._i, r, s, n, i, a, o = t.length, u = 0, l, d;
  for (n = Os(e._f, e._locale).match(Mr) || [], d = n.length, r = 0; r < d; r++)
    i = n[r], s = (t.match(Wi(i, e)) || [])[0], s && (a = t.substr(0, t.indexOf(s)), a.length > 0 && g(e).unusedInput.push(a), t = t.slice(
      t.indexOf(s) + s.length
    ), u += s.length), Ie[i] ? (s ? g(e).empty = !1 : g(e).unusedTokens.push(i), ji(i, s, e)) : e._strict && !s && g(e).unusedTokens.push(i);
  g(e).charsLeftOver = o - u, t.length > 0 && g(e).unusedInput.push(t), e._a[N] <= 12 && g(e).bigHour === !0 && e._a[N] > 0 && (g(e).bigHour = void 0), g(e).parsedDateParts = e._a.slice(0), g(e).meridiem = e._meridiem, e._a[N] = Za(
    e._locale,
    e._a[N],
    e._meridiem
  ), l = g(e).era, l !== null && (e._a[L] = e._locale.erasConvertYear(l, e._a[L])), Nr(e), Yr(e);
}
function Za(e, t, r) {
  var s;
  return r == null ? t : e.meridiemHour != null ? e.meridiemHour(t, r) : (e.isPM != null && (s = e.isPM(r), s && t < 12 && (t += 12), !s && t === 12 && (t = 0)), t);
}
function Ka(e) {
  var t, r, s, n, i, a, o = !1, u = e._f.length;
  if (u === 0) {
    g(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (n = 0; n < u; n++)
    i = 0, a = !1, t = kr({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[n], Ar(t), Or(t) && (a = !0), i += g(t).charsLeftOver, i += g(t).unusedTokens.length * 10, g(t).score = i, o ? i < s && (s = i, r = t) : (s == null || i < s || a) && (s = i, r = t, a && (o = !0));
  Me(e, r || t);
}
function Qa(e) {
  if (!e._d) {
    var t = vr(e._i), r = t.day === void 0 ? t.date : t.day;
    e._a = ws(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function(s) {
        return s && parseInt(s, 10);
      }
    ), Nr(e);
  }
}
function Xa(e) {
  var t = new lt(Yr($s(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function $s(e) {
  var t = e._i, r = e._f;
  return e._locale = e._locale || Oe(e._l), t === null || r === void 0 && t === "" ? Rt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), ie(t) ? new lt(Yr(t)) : (ot(t) ? e._d = t : ne(r) ? Ka(e) : r ? Ar(e) : eo(e), Or(e) || (e._d = null), e));
}
function eo(e) {
  var t = e._i;
  j(t) ? e._d = new Date(h.now()) : ot(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? za(e) : ne(t) ? (e._a = ws(t.slice(0), function(r) {
    return parseInt(r, 10);
  }), Nr(e)) : Ne(t) ? Qa(e) : Se(t) ? e._d = new Date(t) : h.createFromInputFallback(e);
}
function Hs(e, t, r, s, n) {
  var i = {};
  return (t === !0 || t === !1) && (s = t, t = void 0), (r === !0 || r === !1) && (s = r, r = void 0), (Ne(e) && Sr(e) || ne(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = n, i._l = r, i._i = e, i._f = t, i._strict = s, Xa(i);
}
function F(e, t, r, s) {
  return Hs(e, t, r, s, !1);
}
var to = X(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = F.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Rt();
  }
), ro = X(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = F.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Rt();
  }
);
function Vs(e, t) {
  var r, s;
  if (t.length === 1 && ne(t[0]) && (t = t[0]), !t.length)
    return F();
  for (r = t[0], s = 1; s < t.length; ++s)
    (!t[s].isValid() || t[s][e](r)) && (r = t[s]);
  return r;
}
function so() {
  var e = [].slice.call(arguments, 0);
  return Vs("isBefore", e);
}
function no() {
  var e = [].slice.call(arguments, 0);
  return Vs("isAfter", e);
}
var io = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Ze = [
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
function ao(e) {
  var t, r = !1, s, n = Ze.length;
  for (t in e)
    if (M(e, t) && !(P.call(Ze, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (s = 0; s < n; ++s)
    if (e[Ze[s]]) {
      if (r)
        return !1;
      parseFloat(e[Ze[s]]) !== w(e[Ze[s]]) && (r = !0);
    }
  return !0;
}
function oo() {
  return this._isValid;
}
function lo() {
  return ae(NaN);
}
function jt(e) {
  var t = vr(e), r = t.year || 0, s = t.quarter || 0, n = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, d = t.millisecond || 0;
  this._isValid = ao(t), this._milliseconds = +d + l * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +n + s * 3 + r * 12, this._data = {}, this._locale = Oe(), this._bubble();
}
function gt(e) {
  return e instanceof jt;
}
function cr(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function uo(e, t, r) {
  var s = Math.min(e.length, t.length), n = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < s; a++)
    (r && e[a] !== t[a] || !r && w(e[a]) !== w(t[a])) && i++;
  return i + n;
}
function qs(e, t) {
  p(e, 0, 0, function() {
    var r = this.utcOffset(), s = "+";
    return r < 0 && (r = -r, s = "-"), s + ue(~~(r / 60), 2) + t + ue(~~r % 60, 2);
  });
}
qs("Z", ":");
qs("ZZ", "");
y("Z", Lt);
y("ZZ", Lt);
T(["Z", "ZZ"], function(e, t, r) {
  r._useUTC = !0, r._tzm = Cr(Lt, e);
});
var co = /([\+\-]|\d\d)/gi;
function Cr(e, t) {
  var r = (t || "").match(e), s, n, i;
  return r === null ? null : (s = r[r.length - 1] || [], n = (s + "").match(co) || ["-", 0, 0], i = +(n[1] * 60) + w(n[2]), i === 0 ? 0 : n[0] === "+" ? i : -i);
}
function Lr(e, t) {
  var r, s;
  return t._isUTC ? (r = t.clone(), s = (ie(e) || ot(e) ? e.valueOf() : F(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + s), h.updateOffset(r, !1), r) : F(e).local();
}
function dr(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
h.updateOffset = function() {
};
function fo(e, t, r) {
  var s = this._offset || 0, n;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Cr(Lt, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !r && (e = e * 60);
    return !this._isUTC && t && (n = dr(this)), this._offset = e, this._isUTC = !0, n != null && this.add(n, "m"), s !== e && (!t || this._changeInProgress ? Gs(
      this,
      ae(e - s, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, h.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? s : dr(this);
}
function ho(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function mo(e) {
  return this.utcOffset(0, e);
}
function yo(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(dr(this), "m")), this;
}
function po() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Cr(Ci, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function _o(e) {
  return this.isValid() ? (e = e ? F(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function go() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function wo() {
  if (!j(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return kr(e, this), e = $s(e), e._a ? (t = e._isUTC ? ce(e._a) : F(e._a), this._isDSTShifted = this.isValid() && uo(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function bo() {
  return this.isValid() ? !this._isUTC : !1;
}
function So() {
  return this.isValid() ? this._isUTC : !1;
}
function Bs() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Oo = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, ko = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ae(e, t) {
  var r = e, s = null, n, i, a;
  return gt(e) ? r = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : Se(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (s = Oo.exec(e)) ? (n = s[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: w(s[oe]) * n,
    h: w(s[N]) * n,
    m: w(s[re]) * n,
    s: w(s[ge]) * n,
    ms: w(cr(s[Ye] * 1e3)) * n
    // the millisecond decimal point is included in the match
  }) : (s = ko.exec(e)) ? (n = s[1] === "-" ? -1 : 1, r = {
    y: Re(s[2], n),
    M: Re(s[3], n),
    w: Re(s[4], n),
    d: Re(s[5], n),
    h: Re(s[6], n),
    m: Re(s[7], n),
    s: Re(s[8], n)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (a = Do(
    F(r.from),
    F(r.to)
  ), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new jt(r), gt(e) && M(e, "_locale") && (i._locale = e._locale), gt(e) && M(e, "_isValid") && (i._isValid = e._isValid), i;
}
ae.fn = jt.prototype;
ae.invalid = lo;
function Re(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function Qr(e, t) {
  var r = {};
  return r.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r;
}
function Do(e, t) {
  var r;
  return e.isValid() && t.isValid() ? (t = Lr(t, e), e.isBefore(t) ? r = Qr(e, t) : (r = Qr(t, e), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function zs(e, t) {
  return function(r, s) {
    var n, i;
    return s !== null && !isNaN(+s) && (Ss(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = r, r = s, s = i), n = ae(r, s), Gs(this, n, e), this;
  };
}
function Gs(e, t, r, s) {
  var n = t._milliseconds, i = cr(t._days), a = cr(t._months);
  e.isValid() && (s = s ?? !0, a && Rs(e, Dt(e, "Month") + a * r), i && Ds(e, "Date", Dt(e, "Date") + i * r), n && e._d.setTime(e._d.valueOf() + n * r), s && h.updateOffset(e, i || a));
}
var Mo = zs(1, "add"), vo = zs(-1, "subtract");
function Js(e) {
  return typeof e == "string" || e instanceof String;
}
function To(e) {
  return ie(e) || ot(e) || Js(e) || Se(e) || Fo(e) || xo(e) || e === null || e === void 0;
}
function xo(e) {
  var t = Ne(e) && !Sr(e), r = !1, s = [
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
  ], n, i, a = s.length;
  for (n = 0; n < a; n += 1)
    i = s[n], r = r || M(e, i);
  return t && r;
}
function Fo(e) {
  var t = ne(e), r = !1;
  return t && (r = e.filter(function(s) {
    return !Se(s) && Js(e);
  }).length === 0), t && r;
}
function Eo(e) {
  var t = Ne(e) && !Sr(e), r = !1, s = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], n, i;
  for (n = 0; n < s.length; n += 1)
    i = s[n], r = r || M(e, i);
  return t && r;
}
function Ro(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function Po(e, t) {
  arguments.length === 1 && (arguments[0] ? To(arguments[0]) ? (e = arguments[0], t = void 0) : Eo(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var r = e || F(), s = Lr(r, this).startOf("day"), n = h.calendarFormat(this, s) || "sameElse", i = t && (de(t[n]) ? t[n].call(this, r) : t[n]);
  return this.format(
    i || this.localeData().calendar(n, this, F(r))
  );
}
function Yo() {
  return new lt(this);
}
function No(e, t) {
  var r = ie(e) ? e : F(e);
  return this.isValid() && r.isValid() ? (t = ee(t) || "millisecond", t === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function Ao(e, t) {
  var r = ie(e) ? e : F(e);
  return this.isValid() && r.isValid() ? (t = ee(t) || "millisecond", t === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf()) : !1;
}
function Co(e, t, r, s) {
  var n = ie(e) ? e : F(e), i = ie(t) ? t : F(t);
  return this.isValid() && n.isValid() && i.isValid() ? (s = s || "()", (s[0] === "(" ? this.isAfter(n, r) : !this.isBefore(n, r)) && (s[1] === ")" ? this.isBefore(i, r) : !this.isAfter(i, r))) : !1;
}
function Lo(e, t) {
  var r = ie(e) ? e : F(e), s;
  return this.isValid() && r.isValid() ? (t = ee(t) || "millisecond", t === "millisecond" ? this.valueOf() === r.valueOf() : (s = r.valueOf(), this.clone().startOf(t).valueOf() <= s && s <= this.clone().endOf(t).valueOf())) : !1;
}
function Wo(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function Uo(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function jo(e, t, r) {
  var s, n, i;
  if (!this.isValid())
    return NaN;
  if (s = Lr(e, this), !s.isValid())
    return NaN;
  switch (n = (s.utcOffset() - this.utcOffset()) * 6e4, t = ee(t), t) {
    case "year":
      i = wt(this, s) / 12;
      break;
    case "month":
      i = wt(this, s);
      break;
    case "quarter":
      i = wt(this, s) / 3;
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
      i = (this - s - n) / 864e5;
      break;
    case "week":
      i = (this - s - n) / 6048e5;
      break;
    default:
      i = this - s;
  }
  return r ? i : Z(i);
}
function wt(e, t) {
  if (e.date() < t.date())
    return -wt(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), s = e.clone().add(r, "months"), n, i;
  return t - s < 0 ? (n = e.clone().add(r - 1, "months"), i = (t - s) / (s - n)) : (n = e.clone().add(r + 1, "months"), i = (t - s) / (n - s)), -(r + i) || 0;
}
h.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
h.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Io() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function $o(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? _t(
    r,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : de(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", _t(r, "Z")) : _t(
    r,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function Ho() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", r, s, n, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), r = "[" + e + '("]', s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", n = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(r + s + n + i);
}
function Vo(e) {
  e || (e = this.isUtc() ? h.defaultFormatUtc : h.defaultFormat);
  var t = _t(this, e);
  return this.localeData().postformat(t);
}
function qo(e, t) {
  return this.isValid() && (ie(e) && e.isValid() || F(e).isValid()) ? ae({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Bo(e) {
  return this.from(F(), e);
}
function zo(e, t) {
  return this.isValid() && (ie(e) && e.isValid() || F(e).isValid()) ? ae({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Go(e) {
  return this.to(F(), e);
}
function Zs(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = Oe(e), t != null && (this._locale = t), this);
}
var Ks = X(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Qs() {
  return this._locale;
}
var Tt = 1e3, $e = 60 * Tt, xt = 60 * $e, Xs = (365 * 400 + 97) * 24 * xt;
function He(e, t) {
  return (e % t + t) % t;
}
function en(e, t, r) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, r) - Xs : new Date(e, t, r).valueOf();
}
function tn(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - Xs : Date.UTC(e, t, r);
}
function Jo(e) {
  var t, r;
  if (e = ee(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? tn : en, e) {
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
        t + (this._isUTC ? 0 : this.utcOffset() * $e),
        xt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= He(t, $e);
      break;
    case "second":
      t = this._d.valueOf(), t -= He(t, Tt);
      break;
  }
  return this._d.setTime(t), h.updateOffset(this, !0), this;
}
function Zo(e) {
  var t, r;
  if (e = ee(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? tn : en, e) {
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
      t = this._d.valueOf(), t += xt - He(
        t + (this._isUTC ? 0 : this.utcOffset() * $e),
        xt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += $e - He(t, $e) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Tt - He(t, Tt) - 1;
      break;
  }
  return this._d.setTime(t), h.updateOffset(this, !0), this;
}
function Ko() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Qo() {
  return Math.floor(this.valueOf() / 1e3);
}
function Xo() {
  return new Date(this.valueOf());
}
function el() {
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
function tl() {
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
function rl() {
  return this.isValid() ? this.toISOString() : null;
}
function sl() {
  return Or(this);
}
function nl() {
  return Me({}, g(this));
}
function il() {
  return g(this).overflow;
}
function al() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
p("N", 0, 0, "eraAbbr");
p("NN", 0, 0, "eraAbbr");
p("NNN", 0, 0, "eraAbbr");
p("NNNN", 0, 0, "eraName");
p("NNNNN", 0, 0, "eraNarrow");
p("y", ["y", 1], "yo", "eraYear");
p("y", ["yy", 2], 0, "eraYear");
p("y", ["yyy", 3], 0, "eraYear");
p("y", ["yyyy", 4], 0, "eraYear");
y("N", Wr);
y("NN", Wr);
y("NNN", Wr);
y("NNNN", _l);
y("NNNNN", gl);
T(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, r, s) {
    var n = r._locale.erasParse(e, s, r._strict);
    n ? g(r).era = n : g(r).invalidEra = e;
  }
);
y("y", ze);
y("yy", ze);
y("yyy", ze);
y("yyyy", ze);
y("yo", wl);
T(["y", "yy", "yyy", "yyyy"], L);
T(["yo"], function(e, t, r, s) {
  var n;
  r._locale._eraYearOrdinalRegex && (n = e.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? t[L] = r._locale.eraYearOrdinalParse(e, n) : t[L] = parseInt(e, 10);
});
function ol(e, t) {
  var r, s, n, i = this._eras || Oe("en")._eras;
  for (r = 0, s = i.length; r < s; ++r) {
    switch (typeof i[r].since) {
      case "string":
        n = h(i[r].since).startOf("day"), i[r].since = n.valueOf();
        break;
    }
    switch (typeof i[r].until) {
      case "undefined":
        i[r].until = 1 / 0;
        break;
      case "string":
        n = h(i[r].until).startOf("day").valueOf(), i[r].until = n.valueOf();
        break;
    }
  }
  return i;
}
function ll(e, t, r) {
  var s, n, i = this.eras(), a, o, u;
  for (e = e.toUpperCase(), s = 0, n = i.length; s < n; ++s)
    if (a = i[s].name.toUpperCase(), o = i[s].abbr.toUpperCase(), u = i[s].narrow.toUpperCase(), r)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return i[s];
          break;
        case "NNNN":
          if (a === e)
            return i[s];
          break;
        case "NNNNN":
          if (u === e)
            return i[s];
          break;
      }
    else if ([a, o, u].indexOf(e) >= 0)
      return i[s];
}
function ul(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0 ? h(e.since).year() : h(e.since).year() + (t - e.offset) * r;
}
function cl() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].name;
  return "";
}
function dl() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].narrow;
  return "";
}
function fl() {
  var e, t, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return s[e].abbr;
  return "";
}
function hl() {
  var e, t, r, s, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (r = n[e].since <= n[e].until ? 1 : -1, s = this.clone().startOf("day").valueOf(), n[e].since <= s && s <= n[e].until || n[e].until <= s && s <= n[e].since)
      return (this.year() - h(n[e].since).year()) * r + n[e].offset;
  return this.year();
}
function ml(e) {
  return M(this, "_erasNameRegex") || Ur.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function yl(e) {
  return M(this, "_erasAbbrRegex") || Ur.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function pl(e) {
  return M(this, "_erasNarrowRegex") || Ur.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Wr(e, t) {
  return t.erasAbbrRegex(e);
}
function _l(e, t) {
  return t.erasNameRegex(e);
}
function gl(e, t) {
  return t.erasNarrowRegex(e);
}
function wl(e, t) {
  return t._eraYearOrdinalRegex || ze;
}
function Ur() {
  var e = [], t = [], r = [], s = [], n, i, a = this.eras();
  for (n = 0, i = a.length; n < i; ++n)
    t.push(z(a[n].name)), e.push(z(a[n].abbr)), r.push(z(a[n].narrow)), s.push(z(a[n].name)), s.push(z(a[n].abbr)), s.push(z(a[n].narrow));
  this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
p(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
p(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function It(e, t) {
  p(0, [e, e.length], 0, t);
}
It("gggg", "weekYear");
It("ggggg", "weekYear");
It("GGGG", "isoWeekYear");
It("GGGGG", "isoWeekYear");
W("weekYear", "gg");
W("isoWeekYear", "GG");
U("weekYear", 1);
U("isoWeekYear", 1);
y("G", Ct);
y("g", Ct);
y("GG", E, J);
y("gg", E, J);
y("GGGG", xr, Tr);
y("gggg", xr, Tr);
y("GGGGG", At, Yt);
y("ggggg", At, Yt);
ct(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, r, s) {
    t[s.substr(0, 2)] = w(e);
  }
);
ct(["gg", "GG"], function(e, t, r, s) {
  t[s] = h.parseTwoDigitYear(e);
});
function bl(e) {
  return rn.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Sl(e) {
  return rn.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Ol() {
  return we(this.year(), 1, 4);
}
function kl() {
  return we(this.isoWeekYear(), 1, 4);
}
function Dl() {
  var e = this.localeData()._week;
  return we(this.year(), e.dow, e.doy);
}
function Ml() {
  var e = this.localeData()._week;
  return we(this.weekYear(), e.dow, e.doy);
}
function rn(e, t, r, s, n) {
  var i;
  return e == null ? st(this, s, n).year : (i = we(e, s, n), t > i && (t = i), vl.call(this, e, t, r, s, n));
}
function vl(e, t, r, s, n) {
  var i = As(e, t, r, s, n), a = rt(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
p("Q", 0, "Qo", "quarter");
W("quarter", "Q");
U("quarter", 7);
y("Q", Ms);
T("Q", function(e, t) {
  t[_e] = (w(e) - 1) * 3;
});
function Tl(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
p("D", ["DD", 2], "Do", "date");
W("date", "D");
U("date", 9);
y("D", E);
y("DD", E, J);
y("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
T(["D", "DD"], oe);
T("Do", function(e, t) {
  t[oe] = w(e.match(E)[0]);
});
var sn = Be("Date", !0);
p("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
W("dayOfYear", "DDD");
U("dayOfYear", 4);
y("DDD", Nt);
y("DDDD", vs);
T(["DDD", "DDDD"], function(e, t, r) {
  r._dayOfYear = w(e);
});
function xl(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
p("m", ["mm", 2], 0, "minute");
W("minute", "m");
U("minute", 14);
y("m", E);
y("mm", E, J);
T(["m", "mm"], re);
var Fl = Be("Minutes", !1);
p("s", ["ss", 2], 0, "second");
W("second", "s");
U("second", 15);
y("s", E);
y("ss", E, J);
T(["s", "ss"], ge);
var El = Be("Seconds", !1);
p("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
p(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
p(0, ["SSS", 3], 0, "millisecond");
p(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
p(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
p(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
p(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
p(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
p(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
W("millisecond", "ms");
U("millisecond", 16);
y("S", Nt, Ms);
y("SS", Nt, J);
y("SSS", Nt, vs);
var ve, nn;
for (ve = "SSSS"; ve.length <= 9; ve += "S")
  y(ve, ze);
function Rl(e, t) {
  t[Ye] = w(("0." + e) * 1e3);
}
for (ve = "S"; ve.length <= 9; ve += "S")
  T(ve, Rl);
nn = Be("Milliseconds", !1);
p("z", 0, 0, "zoneAbbr");
p("zz", 0, 0, "zoneName");
function Pl() {
  return this._isUTC ? "UTC" : "";
}
function Yl() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var f = lt.prototype;
f.add = Mo;
f.calendar = Po;
f.clone = Yo;
f.diff = jo;
f.endOf = Zo;
f.format = Vo;
f.from = qo;
f.fromNow = Bo;
f.to = zo;
f.toNow = Go;
f.get = Ni;
f.invalidAt = il;
f.isAfter = No;
f.isBefore = Ao;
f.isBetween = Co;
f.isSame = Lo;
f.isSameOrAfter = Wo;
f.isSameOrBefore = Uo;
f.isValid = sl;
f.lang = Ks;
f.locale = Zs;
f.localeData = Qs;
f.max = ro;
f.min = to;
f.parsingFlags = nl;
f.set = Ai;
f.startOf = Jo;
f.subtract = vo;
f.toArray = el;
f.toObject = tl;
f.toDate = Xo;
f.toISOString = $o;
f.inspect = Ho;
typeof Symbol < "u" && Symbol.for != null && (f[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
f.toJSON = rl;
f.toString = Io;
f.unix = Qo;
f.valueOf = Ko;
f.creationData = al;
f.eraName = cl;
f.eraNarrow = dl;
f.eraAbbr = fl;
f.eraYear = hl;
f.year = Ns;
f.isLeapYear = ea;
f.weekYear = bl;
f.isoWeekYear = Sl;
f.quarter = f.quarters = Tl;
f.month = Ps;
f.daysInMonth = Ki;
f.week = f.weeks = aa;
f.isoWeek = f.isoWeeks = oa;
f.weeksInYear = Dl;
f.weeksInWeekYear = Ml;
f.isoWeeksInYear = Ol;
f.isoWeeksInISOWeekYear = kl;
f.date = sn;
f.day = f.days = ba;
f.weekday = Sa;
f.isoWeekday = Oa;
f.dayOfYear = xl;
f.hour = f.hours = Fa;
f.minute = f.minutes = Fl;
f.second = f.seconds = El;
f.millisecond = f.milliseconds = nn;
f.utcOffset = fo;
f.utc = mo;
f.local = yo;
f.parseZone = po;
f.hasAlignedHourOffset = _o;
f.isDST = go;
f.isLocal = bo;
f.isUtcOffset = So;
f.isUtc = Bs;
f.isUTC = Bs;
f.zoneAbbr = Pl;
f.zoneName = Yl;
f.dates = X(
  "dates accessor is deprecated. Use date instead.",
  sn
);
f.months = X(
  "months accessor is deprecated. Use month instead",
  Ps
);
f.years = X(
  "years accessor is deprecated. Use year instead",
  Ns
);
f.zone = X(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  ho
);
f.isDSTShifted = X(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  wo
);
function Nl(e) {
  return F(e * 1e3);
}
function Al() {
  return F.apply(null, arguments).parseZone();
}
function an(e) {
  return e;
}
var v = Dr.prototype;
v.calendar = bi;
v.longDateFormat = Di;
v.invalidDate = vi;
v.ordinal = Fi;
v.preparse = an;
v.postformat = an;
v.relativeTime = Ri;
v.pastFuture = Pi;
v.set = gi;
v.eras = ol;
v.erasParse = ll;
v.erasConvertYear = ul;
v.erasAbbrRegex = yl;
v.erasNameRegex = ml;
v.erasNarrowRegex = pl;
v.months = zi;
v.monthsShort = Gi;
v.monthsParse = Zi;
v.monthsRegex = Xi;
v.monthsShortRegex = Qi;
v.week = ra;
v.firstDayOfYear = ia;
v.firstDayOfWeek = na;
v.weekdays = ya;
v.weekdaysMin = _a;
v.weekdaysShort = pa;
v.weekdaysParse = wa;
v.weekdaysRegex = ka;
v.weekdaysShortRegex = Da;
v.weekdaysMinRegex = Ma;
v.isPM = Ta;
v.meridiem = Ea;
function Ft(e, t, r, s) {
  var n = Oe(), i = ce().set(s, t);
  return n[r](i, e);
}
function on(e, t, r) {
  if (Se(e) && (t = e, e = void 0), e = e || "", t != null)
    return Ft(e, t, r, "month");
  var s, n = [];
  for (s = 0; s < 12; s++)
    n[s] = Ft(e, s, r, "month");
  return n;
}
function jr(e, t, r, s) {
  typeof e == "boolean" ? (Se(t) && (r = t, t = void 0), t = t || "") : (t = e, r = t, e = !1, Se(t) && (r = t, t = void 0), t = t || "");
  var n = Oe(), i = e ? n._week.dow : 0, a, o = [];
  if (r != null)
    return Ft(t, (r + i) % 7, s, "day");
  for (a = 0; a < 7; a++)
    o[a] = Ft(t, (a + i) % 7, s, "day");
  return o;
}
function Cl(e, t) {
  return on(e, t, "months");
}
function Ll(e, t) {
  return on(e, t, "monthsShort");
}
function Wl(e, t, r) {
  return jr(e, t, r, "weekdays");
}
function Ul(e, t, r) {
  return jr(e, t, r, "weekdaysShort");
}
function jl(e, t, r) {
  return jr(e, t, r, "weekdaysMin");
}
xe("en", {
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
h.lang = X(
  "moment.lang is deprecated. Use moment.locale instead.",
  xe
);
h.langData = X(
  "moment.langData is deprecated. Use moment.localeData instead.",
  Oe
);
var me = Math.abs;
function Il() {
  var e = this._data;
  return this._milliseconds = me(this._milliseconds), this._days = me(this._days), this._months = me(this._months), e.milliseconds = me(e.milliseconds), e.seconds = me(e.seconds), e.minutes = me(e.minutes), e.hours = me(e.hours), e.months = me(e.months), e.years = me(e.years), this;
}
function ln(e, t, r, s) {
  var n = ae(t, r);
  return e._milliseconds += s * n._milliseconds, e._days += s * n._days, e._months += s * n._months, e._bubble();
}
function $l(e, t) {
  return ln(this, e, t, 1);
}
function Hl(e, t) {
  return ln(this, e, t, -1);
}
function Xr(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Vl() {
  var e = this._milliseconds, t = this._days, r = this._months, s = this._data, n, i, a, o, u;
  return e >= 0 && t >= 0 && r >= 0 || e <= 0 && t <= 0 && r <= 0 || (e += Xr(fr(r) + t) * 864e5, t = 0, r = 0), s.milliseconds = e % 1e3, n = Z(e / 1e3), s.seconds = n % 60, i = Z(n / 60), s.minutes = i % 60, a = Z(i / 60), s.hours = a % 24, t += Z(a / 24), u = Z(un(t)), r += u, t -= Xr(fr(u)), o = Z(r / 12), r %= 12, s.days = t, s.months = r, s.years = o, this;
}
function un(e) {
  return e * 4800 / 146097;
}
function fr(e) {
  return e * 146097 / 4800;
}
function ql(e) {
  if (!this.isValid())
    return NaN;
  var t, r, s = this._milliseconds;
  if (e = ee(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + s / 864e5, r = this._months + un(t), e) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (t = this._days + Math.round(fr(this._months)), e) {
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
function Bl() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + w(this._months / 12) * 31536e6 : NaN;
}
function ke(e) {
  return function() {
    return this.as(e);
  };
}
var zl = ke("ms"), Gl = ke("s"), Jl = ke("m"), Zl = ke("h"), Kl = ke("d"), Ql = ke("w"), Xl = ke("M"), eu = ke("Q"), tu = ke("y");
function ru() {
  return ae(this);
}
function su(e) {
  return e = ee(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ce(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var nu = Ce("milliseconds"), iu = Ce("seconds"), au = Ce("minutes"), ou = Ce("hours"), lu = Ce("days"), uu = Ce("months"), cu = Ce("years");
function du() {
  return Z(this.days() / 7);
}
var ye = Math.round, je = {
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
function fu(e, t, r, s, n) {
  return n.relativeTime(t || 1, !!r, e, s);
}
function hu(e, t, r, s) {
  var n = ae(e).abs(), i = ye(n.as("s")), a = ye(n.as("m")), o = ye(n.as("h")), u = ye(n.as("d")), l = ye(n.as("M")), d = ye(n.as("w")), m = ye(n.as("y")), k = i <= r.ss && ["s", i] || i < r.s && ["ss", i] || a <= 1 && ["m"] || a < r.m && ["mm", a] || o <= 1 && ["h"] || o < r.h && ["hh", o] || u <= 1 && ["d"] || u < r.d && ["dd", u];
  return r.w != null && (k = k || d <= 1 && ["w"] || d < r.w && ["ww", d]), k = k || l <= 1 && ["M"] || l < r.M && ["MM", l] || m <= 1 && ["y"] || ["yy", m], k[2] = t, k[3] = +e > 0, k[4] = s, fu.apply(null, k);
}
function mu(e) {
  return e === void 0 ? ye : typeof e == "function" ? (ye = e, !0) : !1;
}
function yu(e, t) {
  return je[e] === void 0 ? !1 : t === void 0 ? je[e] : (je[e] = t, e === "s" && (je.ss = t - 1), !0);
}
function pu(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, s = je, n, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (r = e), typeof t == "object" && (s = Object.assign({}, je, t), t.s != null && t.ss == null && (s.ss = t.s - 1)), n = this.localeData(), i = hu(this, !r, s, n), r && (i = n.pastFuture(+this, i)), n.postformat(i);
}
var Xt = Math.abs;
function We(e) {
  return (e > 0) - (e < 0) || +e;
}
function $t() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = Xt(this._milliseconds) / 1e3, t = Xt(this._days), r = Xt(this._months), s, n, i, a, o = this.asSeconds(), u, l, d, m;
  return o ? (s = Z(e / 60), n = Z(s / 60), e %= 60, s %= 60, i = Z(r / 12), r %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", l = We(this._months) !== We(o) ? "-" : "", d = We(this._days) !== We(o) ? "-" : "", m = We(this._milliseconds) !== We(o) ? "-" : "", u + "P" + (i ? l + i + "Y" : "") + (r ? l + r + "M" : "") + (t ? d + t + "D" : "") + (n || s || e ? "T" : "") + (n ? m + n + "H" : "") + (s ? m + s + "M" : "") + (e ? m + a + "S" : "")) : "P0D";
}
var O = jt.prototype;
O.isValid = oo;
O.abs = Il;
O.add = $l;
O.subtract = Hl;
O.as = ql;
O.asMilliseconds = zl;
O.asSeconds = Gl;
O.asMinutes = Jl;
O.asHours = Zl;
O.asDays = Kl;
O.asWeeks = Ql;
O.asMonths = Xl;
O.asQuarters = eu;
O.asYears = tu;
O.valueOf = Bl;
O._bubble = Vl;
O.clone = ru;
O.get = su;
O.milliseconds = nu;
O.seconds = iu;
O.minutes = au;
O.hours = ou;
O.days = lu;
O.weeks = du;
O.months = uu;
O.years = cu;
O.humanize = pu;
O.toISOString = $t;
O.toString = $t;
O.toJSON = $t;
O.locale = Zs;
O.localeData = Qs;
O.toIsoString = X(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  $t
);
O.lang = Ks;
p("X", 0, 0, "unix");
p("x", 0, 0, "valueOf");
y("x", Ct);
y("X", Li);
T("X", function(e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
T("x", function(e, t, r) {
  r._d = new Date(w(e));
});
//! moment.js
h.version = "2.29.4";
pi(F);
h.fn = f;
h.min = so;
h.max = no;
h.now = io;
h.utc = ce;
h.unix = Nl;
h.months = Cl;
h.isDate = ot;
h.locale = xe;
h.invalid = Rt;
h.duration = ae;
h.isMoment = ie;
h.weekdays = Wl;
h.parseZone = Al;
h.localeData = Oe;
h.isDuration = gt;
h.monthsShort = Ll;
h.weekdaysMin = jl;
h.defineLocale = Pr;
h.updateLocale = Na;
h.locales = Aa;
h.weekdaysShort = Ul;
h.normalizeUnits = ee;
h.relativeTimeRounding = mu;
h.relativeTimeThreshold = yu;
h.calendarFormat = Ro;
h.prototype = f;
h.HTML5_FMT = {
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
function cn(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: _u } = Object.prototype, { getPrototypeOf: Ir } = Object, Ht = ((e) => (t) => {
  const r = _u.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), fe = (e) => (e = e.toLowerCase(), (t) => Ht(t) === e), Vt = (e) => (t) => typeof t === e, { isArray: Ge } = Array, it = Vt("undefined");
function gu(e) {
  return e !== null && !it(e) && e.constructor !== null && !it(e.constructor) && Q(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const dn = fe("ArrayBuffer");
function wu(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && dn(e.buffer), t;
}
const bu = Vt("string"), Q = Vt("function"), fn = Vt("number"), qt = (e) => e !== null && typeof e == "object", Su = (e) => e === !0 || e === !1, bt = (e) => {
  if (Ht(e) !== "object")
    return !1;
  const t = Ir(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Ou = fe("Date"), ku = fe("File"), Du = fe("Blob"), Mu = fe("FileList"), vu = (e) => qt(e) && Q(e.pipe), Tu = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Q(e.append) && ((t = Ht(e)) === "formdata" || // detect form-data instance
  t === "object" && Q(e.toString) && e.toString() === "[object FormData]"));
}, xu = fe("URLSearchParams"), Fu = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function dt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, n;
  if (typeof e != "object" && (e = [e]), Ge(e))
    for (s = 0, n = e.length; s < n; s++)
      t.call(null, e[s], s, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let o;
    for (s = 0; s < a; s++)
      o = i[s], t.call(null, e[o], o, e);
  }
}
function hn(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let s = r.length, n;
  for (; s-- > 0; )
    if (n = r[s], t === n.toLowerCase())
      return n;
  return null;
}
const mn = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), yn = (e) => !it(e) && e !== mn;
function hr() {
  const { caseless: e } = yn(this) && this || {}, t = {}, r = (s, n) => {
    const i = e && hn(t, n) || n;
    bt(t[i]) && bt(s) ? t[i] = hr(t[i], s) : bt(s) ? t[i] = hr({}, s) : Ge(s) ? t[i] = s.slice() : t[i] = s;
  };
  for (let s = 0, n = arguments.length; s < n; s++)
    arguments[s] && dt(arguments[s], r);
  return t;
}
const Eu = (e, t, r, { allOwnKeys: s } = {}) => (dt(t, (n, i) => {
  r && Q(n) ? e[i] = cn(n, r) : e[i] = n;
}, { allOwnKeys: s }), e), Ru = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Pu = (e, t, r, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Yu = (e, t, r, s) => {
  let n, i, a;
  const o = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (n = Object.getOwnPropertyNames(e), i = n.length; i-- > 0; )
      a = n[i], (!s || s(a, e, t)) && !o[a] && (t[a] = e[a], o[a] = !0);
    e = r !== !1 && Ir(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, Nu = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const s = e.indexOf(t, r);
  return s !== -1 && s === r;
}, Au = (e) => {
  if (!e)
    return null;
  if (Ge(e))
    return e;
  let t = e.length;
  if (!fn(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Cu = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ir(Uint8Array)), Lu = (e, t) => {
  const s = (e && e[Symbol.iterator]).call(e);
  let n;
  for (; (n = s.next()) && !n.done; ) {
    const i = n.value;
    t.call(e, i[0], i[1]);
  }
}, Wu = (e, t) => {
  let r;
  const s = [];
  for (; (r = e.exec(t)) !== null; )
    s.push(r);
  return s;
}, Uu = fe("HTMLFormElement"), ju = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, s, n) {
    return s.toUpperCase() + n;
  }
), es = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), Iu = fe("RegExp"), pn = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), s = {};
  dt(r, (n, i) => {
    t(n, i, e) !== !1 && (s[i] = n);
  }), Object.defineProperties(e, s);
}, $u = (e) => {
  pn(e, (t, r) => {
    if (Q(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const s = e[r];
    if (Q(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, Hu = (e, t) => {
  const r = {}, s = (n) => {
    n.forEach((i) => {
      r[i] = !0;
    });
  };
  return Ge(e) ? s(e) : s(String(e).split(t)), r;
}, Vu = () => {
}, qu = (e, t) => (e = +e, Number.isFinite(e) ? e : t), er = "abcdefghijklmnopqrstuvwxyz", ts = "0123456789", _n = {
  DIGIT: ts,
  ALPHA: er,
  ALPHA_DIGIT: er + er.toUpperCase() + ts
}, Bu = (e = 16, t = _n.ALPHA_DIGIT) => {
  let r = "";
  const { length: s } = t;
  for (; e--; )
    r += t[Math.random() * s | 0];
  return r;
};
function zu(e) {
  return !!(e && Q(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Gu = (e) => {
  const t = new Array(10), r = (s, n) => {
    if (qt(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        t[n] = s;
        const i = Ge(s) ? [] : {};
        return dt(s, (a, o) => {
          const u = r(a, n + 1);
          !it(u) && (i[o] = u);
        }), t[n] = void 0, i;
      }
    }
    return s;
  };
  return r(e, 0);
}, Ju = fe("AsyncFunction"), Zu = (e) => e && (qt(e) || Q(e)) && Q(e.then) && Q(e.catch), c = {
  isArray: Ge,
  isArrayBuffer: dn,
  isBuffer: gu,
  isFormData: Tu,
  isArrayBufferView: wu,
  isString: bu,
  isNumber: fn,
  isBoolean: Su,
  isObject: qt,
  isPlainObject: bt,
  isUndefined: it,
  isDate: Ou,
  isFile: ku,
  isBlob: Du,
  isRegExp: Iu,
  isFunction: Q,
  isStream: vu,
  isURLSearchParams: xu,
  isTypedArray: Cu,
  isFileList: Mu,
  forEach: dt,
  merge: hr,
  extend: Eu,
  trim: Fu,
  stripBOM: Ru,
  inherits: Pu,
  toFlatObject: Yu,
  kindOf: Ht,
  kindOfTest: fe,
  endsWith: Nu,
  toArray: Au,
  forEachEntry: Lu,
  matchAll: Wu,
  isHTMLForm: Uu,
  hasOwnProperty: es,
  hasOwnProp: es,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: pn,
  freezeMethods: $u,
  toObjectSet: Hu,
  toCamelCase: ju,
  noop: Vu,
  toFiniteNumber: qu,
  findKey: hn,
  global: mn,
  isContextDefined: yn,
  ALPHABET: _n,
  generateString: Bu,
  isSpecCompliantForm: zu,
  toJSONObject: Gu,
  isAsyncFn: Ju,
  isThenable: Zu
};
function D(e, t, r, s, n) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), s && (this.request = s), n && (this.response = n);
}
c.inherits(D, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: c.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const gn = D.prototype, wn = {};
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
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  wn[e] = { value: e };
});
Object.defineProperties(D, wn);
Object.defineProperty(gn, "isAxiosError", { value: !0 });
D.from = (e, t, r, s, n, i) => {
  const a = Object.create(gn);
  return c.toFlatObject(e, a, function(u) {
    return u !== Error.prototype;
  }, (o) => o !== "isAxiosError"), D.call(a, e.message, t, r, s, n), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
const Ku = null;
function mr(e) {
  return c.isPlainObject(e) || c.isArray(e);
}
function bn(e) {
  return c.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function rs(e, t, r) {
  return e ? e.concat(t).map(function(n, i) {
    return n = bn(n), !r && i ? "[" + n + "]" : n;
  }).join(r ? "." : "") : t;
}
function Qu(e) {
  return c.isArray(e) && !e.some(mr);
}
const Xu = c.toFlatObject(c, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Bt(e, t, r) {
  if (!c.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = c.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(S, he) {
    return !c.isUndefined(he[S]);
  });
  const s = r.metaTokens, n = r.visitor || d, i = r.dots, a = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && c.isSpecCompliantForm(t);
  if (!c.isFunction(n))
    throw new TypeError("visitor must be a function");
  function l(_) {
    if (_ === null)
      return "";
    if (c.isDate(_))
      return _.toISOString();
    if (!u && c.isBlob(_))
      throw new D("Blob is not supported. Use a Buffer instead.");
    return c.isArrayBuffer(_) || c.isTypedArray(_) ? u && typeof Blob == "function" ? new Blob([_]) : Buffer.from(_) : _;
  }
  function d(_, S, he) {
    let te = _;
    if (_ && !he && typeof _ == "object") {
      if (c.endsWith(S, "{}"))
        S = s ? S : S.slice(0, -2), _ = JSON.stringify(_);
      else if (c.isArray(_) && Qu(_) || (c.isFileList(_) || c.endsWith(S, "[]")) && (te = c.toArray(_)))
        return S = bn(S), te.forEach(function(ht, Vn) {
          !(c.isUndefined(ht) || ht === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? rs([S], Vn, i) : a === null ? S : S + "[]",
            l(ht)
          );
        }), !1;
    }
    return mr(_) ? !0 : (t.append(rs(he, S, i), l(_)), !1);
  }
  const m = [], k = Object.assign(Xu, {
    defaultVisitor: d,
    convertValue: l,
    isVisitable: mr
  });
  function x(_, S) {
    if (!c.isUndefined(_)) {
      if (m.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      m.push(_), c.forEach(_, function(te, Le) {
        (!(c.isUndefined(te) || te === null) && n.call(
          t,
          te,
          c.isString(Le) ? Le.trim() : Le,
          S,
          k
        )) === !0 && x(te, S ? S.concat(Le) : [Le]);
      }), m.pop();
    }
  }
  if (!c.isObject(e))
    throw new TypeError("data must be an object");
  return x(e), t;
}
function ss(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function $r(e, t) {
  this._pairs = [], e && Bt(e, this, t);
}
const Sn = $r.prototype;
Sn.append = function(t, r) {
  this._pairs.push([t, r]);
};
Sn.toString = function(t) {
  const r = t ? function(s) {
    return t.call(this, s, ss);
  } : ss;
  return this._pairs.map(function(n) {
    return r(n[0]) + "=" + r(n[1]);
  }, "").join("&");
};
function ec(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function On(e, t, r) {
  if (!t)
    return e;
  const s = r && r.encode || ec, n = r && r.serialize;
  let i;
  if (n ? i = n(t, r) : i = c.isURLSearchParams(t) ? t.toString() : new $r(t, r).toString(s), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class tc {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    c.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const ns = tc, kn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, rc = typeof URLSearchParams < "u" ? URLSearchParams : $r, sc = typeof FormData < "u" ? FormData : null, nc = typeof Blob < "u" ? Blob : null, ic = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), ac = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), le = {
  isBrowser: !0,
  classes: {
    URLSearchParams: rc,
    FormData: sc,
    Blob: nc
  },
  isStandardBrowserEnv: ic,
  isStandardBrowserWebWorkerEnv: ac,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function oc(e, t) {
  return Bt(e, new le.classes.URLSearchParams(), Object.assign({
    visitor: function(r, s, n, i) {
      return le.isNode && c.isBuffer(r) ? (this.append(s, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function lc(e) {
  return c.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function uc(e) {
  const t = {}, r = Object.keys(e);
  let s;
  const n = r.length;
  let i;
  for (s = 0; s < n; s++)
    i = r[s], t[i] = e[i];
  return t;
}
function Dn(e) {
  function t(r, s, n, i) {
    let a = r[i++];
    const o = Number.isFinite(+a), u = i >= r.length;
    return a = !a && c.isArray(n) ? n.length : a, u ? (c.hasOwnProp(n, a) ? n[a] = [n[a], s] : n[a] = s, !o) : ((!n[a] || !c.isObject(n[a])) && (n[a] = []), t(r, s, n[a], i) && c.isArray(n[a]) && (n[a] = uc(n[a])), !o);
  }
  if (c.isFormData(e) && c.isFunction(e.entries)) {
    const r = {};
    return c.forEachEntry(e, (s, n) => {
      t(lc(s), n, r, 0);
    }), r;
  }
  return null;
}
const cc = {
  "Content-Type": void 0
};
function dc(e, t, r) {
  if (c.isString(e))
    try {
      return (t || JSON.parse)(e), c.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (r || JSON.stringify)(e);
}
const zt = {
  transitional: kn,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const s = r.getContentType() || "", n = s.indexOf("application/json") > -1, i = c.isObject(t);
    if (i && c.isHTMLForm(t) && (t = new FormData(t)), c.isFormData(t))
      return n && n ? JSON.stringify(Dn(t)) : t;
    if (c.isArrayBuffer(t) || c.isBuffer(t) || c.isStream(t) || c.isFile(t) || c.isBlob(t))
      return t;
    if (c.isArrayBufferView(t))
      return t.buffer;
    if (c.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let o;
    if (i) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return oc(t, this.formSerializer).toString();
      if ((o = c.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Bt(
          o ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || n ? (r.setContentType("application/json", !1), dc(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || zt.transitional, s = r && r.forcedJSONParsing, n = this.responseType === "json";
    if (t && c.isString(t) && (s && !this.responseType || n)) {
      const a = !(r && r.silentJSONParsing) && n;
      try {
        return JSON.parse(t);
      } catch (o) {
        if (a)
          throw o.name === "SyntaxError" ? D.from(o, D.ERR_BAD_RESPONSE, this, null, this.response) : o;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: le.classes.FormData,
    Blob: le.classes.Blob
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
c.forEach(["delete", "get", "head"], function(t) {
  zt.headers[t] = {};
});
c.forEach(["post", "put", "patch"], function(t) {
  zt.headers[t] = c.merge(cc);
});
const Hr = zt, fc = c.toObjectSet([
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
]), hc = (e) => {
  const t = {};
  let r, s, n;
  return e && e.split(`
`).forEach(function(a) {
    n = a.indexOf(":"), r = a.substring(0, n).trim().toLowerCase(), s = a.substring(n + 1).trim(), !(!r || t[r] && fc[r]) && (r === "set-cookie" ? t[r] ? t[r].push(s) : t[r] = [s] : t[r] = t[r] ? t[r] + ", " + s : s);
  }), t;
}, is = Symbol("internals");
function Ke(e) {
  return e && String(e).trim().toLowerCase();
}
function St(e) {
  return e === !1 || e == null ? e : c.isArray(e) ? e.map(St) : String(e);
}
function mc(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = r.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const yc = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function tr(e, t, r, s, n) {
  if (c.isFunction(s))
    return s.call(this, t, r);
  if (n && (t = r), !!c.isString(t)) {
    if (c.isString(s))
      return t.indexOf(s) !== -1;
    if (c.isRegExp(s))
      return s.test(t);
  }
}
function pc(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, s) => r.toUpperCase() + s);
}
function _c(e, t) {
  const r = c.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + r, {
      value: function(n, i, a) {
        return this[s].call(this, t, n, i, a);
      },
      configurable: !0
    });
  });
}
class Gt {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, s) {
    const n = this;
    function i(o, u, l) {
      const d = Ke(u);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const m = c.findKey(n, d);
      (!m || n[m] === void 0 || l === !0 || l === void 0 && n[m] !== !1) && (n[m || u] = St(o));
    }
    const a = (o, u) => c.forEach(o, (l, d) => i(l, d, u));
    return c.isPlainObject(t) || t instanceof this.constructor ? a(t, r) : c.isString(t) && (t = t.trim()) && !yc(t) ? a(hc(t), r) : t != null && i(r, t, s), this;
  }
  get(t, r) {
    if (t = Ke(t), t) {
      const s = c.findKey(this, t);
      if (s) {
        const n = this[s];
        if (!r)
          return n;
        if (r === !0)
          return mc(n);
        if (c.isFunction(r))
          return r.call(this, n, s);
        if (c.isRegExp(r))
          return r.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = Ke(t), t) {
      const s = c.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!r || tr(this, this[s], s, r)));
    }
    return !1;
  }
  delete(t, r) {
    const s = this;
    let n = !1;
    function i(a) {
      if (a = Ke(a), a) {
        const o = c.findKey(s, a);
        o && (!r || tr(s, s[o], o, r)) && (delete s[o], n = !0);
      }
    }
    return c.isArray(t) ? t.forEach(i) : i(t), n;
  }
  clear(t) {
    const r = Object.keys(this);
    let s = r.length, n = !1;
    for (; s--; ) {
      const i = r[s];
      (!t || tr(this, this[i], i, t, !0)) && (delete this[i], n = !0);
    }
    return n;
  }
  normalize(t) {
    const r = this, s = {};
    return c.forEach(this, (n, i) => {
      const a = c.findKey(s, i);
      if (a) {
        r[a] = St(n), delete r[i];
        return;
      }
      const o = t ? pc(i) : String(i).trim();
      o !== i && delete r[i], r[o] = St(n), s[o] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return c.forEach(this, (s, n) => {
      s != null && s !== !1 && (r[n] = t && c.isArray(s) ? s.join(", ") : s);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const s = new this(t);
    return r.forEach((n) => s.set(n)), s;
  }
  static accessor(t) {
    const s = (this[is] = this[is] = {
      accessors: {}
    }).accessors, n = this.prototype;
    function i(a) {
      const o = Ke(a);
      s[o] || (_c(n, a), s[o] = !0);
    }
    return c.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
Gt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
c.freezeMethods(Gt.prototype);
c.freezeMethods(Gt);
const be = Gt;
function rr(e, t) {
  const r = this || Hr, s = t || r, n = be.from(s.headers);
  let i = s.data;
  return c.forEach(e, function(o) {
    i = o.call(r, i, n.normalize(), t ? t.status : void 0);
  }), n.normalize(), i;
}
function Mn(e) {
  return !!(e && e.__CANCEL__);
}
function ft(e, t, r) {
  D.call(this, e ?? "canceled", D.ERR_CANCELED, t, r), this.name = "CanceledError";
}
c.inherits(ft, D, {
  __CANCEL__: !0
});
function gc(e, t, r) {
  const s = r.config.validateStatus;
  !r.status || !s || s(r.status) ? e(r) : t(new D(
    "Request failed with status code " + r.status,
    [D.ERR_BAD_REQUEST, D.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const wc = le.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(r, s, n, i, a, o) {
        const u = [];
        u.push(r + "=" + encodeURIComponent(s)), c.isNumber(n) && u.push("expires=" + new Date(n).toGMTString()), c.isString(i) && u.push("path=" + i), c.isString(a) && u.push("domain=" + a), o === !0 && u.push("secure"), document.cookie = u.join("; ");
      },
      read: function(r) {
        const s = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
        return s ? decodeURIComponent(s[3]) : null;
      },
      remove: function(r) {
        this.write(r, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function bc(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Sc(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function vn(e, t) {
  return e && !bc(t) ? Sc(e, t) : t;
}
const Oc = le.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
    let s;
    function n(i) {
      let a = i;
      return t && (r.setAttribute("href", a), a = r.href), r.setAttribute("href", a), {
        href: r.href,
        protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
        host: r.host,
        search: r.search ? r.search.replace(/^\?/, "") : "",
        hash: r.hash ? r.hash.replace(/^#/, "") : "",
        hostname: r.hostname,
        port: r.port,
        pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
      };
    }
    return s = n(window.location.href), function(a) {
      const o = c.isString(a) ? n(a) : a;
      return o.protocol === s.protocol && o.host === s.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function kc(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Dc(e, t) {
  e = e || 10;
  const r = new Array(e), s = new Array(e);
  let n = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const l = Date.now(), d = s[i];
    a || (a = l), r[n] = u, s[n] = l;
    let m = i, k = 0;
    for (; m !== n; )
      k += r[m++], m = m % e;
    if (n = (n + 1) % e, n === i && (i = (i + 1) % e), l - a < t)
      return;
    const x = d && l - d;
    return x ? Math.round(k * 1e3 / x) : void 0;
  };
}
function as(e, t) {
  let r = 0;
  const s = Dc(50, 250);
  return (n) => {
    const i = n.loaded, a = n.lengthComputable ? n.total : void 0, o = i - r, u = s(o), l = i <= a;
    r = i;
    const d = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: o,
      rate: u || void 0,
      estimated: u && a && l ? (a - i) / u : void 0,
      event: n
    };
    d[t ? "download" : "upload"] = !0, e(d);
  };
}
const Mc = typeof XMLHttpRequest < "u", vc = Mc && function(e) {
  return new Promise(function(r, s) {
    let n = e.data;
    const i = be.from(e.headers).normalize(), a = e.responseType;
    let o;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(o), e.signal && e.signal.removeEventListener("abort", o);
    }
    c.isFormData(n) && (le.isStandardBrowserEnv || le.isStandardBrowserWebWorkerEnv ? i.setContentType(!1) : i.setContentType("multipart/form-data;", !1));
    let l = new XMLHttpRequest();
    if (e.auth) {
      const x = e.auth.username || "", _ = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(x + ":" + _));
    }
    const d = vn(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), On(d, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
    function m() {
      if (!l)
        return;
      const x = be.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), S = {
        data: !a || a === "text" || a === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: x,
        config: e,
        request: l
      };
      gc(function(te) {
        r(te), u();
      }, function(te) {
        s(te), u();
      }, S), l = null;
    }
    if ("onloadend" in l ? l.onloadend = m : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, l.onabort = function() {
      l && (s(new D("Request aborted", D.ECONNABORTED, e, l)), l = null);
    }, l.onerror = function() {
      s(new D("Network Error", D.ERR_NETWORK, e, l)), l = null;
    }, l.ontimeout = function() {
      let _ = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const S = e.transitional || kn;
      e.timeoutErrorMessage && (_ = e.timeoutErrorMessage), s(new D(
        _,
        S.clarifyTimeoutError ? D.ETIMEDOUT : D.ECONNABORTED,
        e,
        l
      )), l = null;
    }, le.isStandardBrowserEnv) {
      const x = (e.withCredentials || Oc(d)) && e.xsrfCookieName && wc.read(e.xsrfCookieName);
      x && i.set(e.xsrfHeaderName, x);
    }
    n === void 0 && i.setContentType(null), "setRequestHeader" in l && c.forEach(i.toJSON(), function(_, S) {
      l.setRequestHeader(S, _);
    }), c.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), a && a !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", as(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", as(e.onUploadProgress)), (e.cancelToken || e.signal) && (o = (x) => {
      l && (s(!x || x.type ? new ft(null, e, l) : x), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(o), e.signal && (e.signal.aborted ? o() : e.signal.addEventListener("abort", o)));
    const k = kc(d);
    if (k && le.protocols.indexOf(k) === -1) {
      s(new D("Unsupported protocol " + k + ":", D.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(n || null);
  });
}, Ot = {
  http: Ku,
  xhr: vc
};
c.forEach(Ot, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Tc = {
  getAdapter: (e) => {
    e = c.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, s;
    for (let n = 0; n < t && (r = e[n], !(s = c.isString(r) ? Ot[r.toLowerCase()] : r)); n++)
      ;
    if (!s)
      throw s === !1 ? new D(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        c.hasOwnProp(Ot, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!c.isFunction(s))
      throw new TypeError("adapter is not a function");
    return s;
  },
  adapters: Ot
};
function sr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ft(null, e);
}
function os(e) {
  return sr(e), e.headers = be.from(e.headers), e.data = rr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Tc.getAdapter(e.adapter || Hr.adapter)(e).then(function(s) {
    return sr(e), s.data = rr.call(
      e,
      e.transformResponse,
      s
    ), s.headers = be.from(s.headers), s;
  }, function(s) {
    return Mn(s) || (sr(e), s && s.response && (s.response.data = rr.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = be.from(s.response.headers))), Promise.reject(s);
  });
}
const ls = (e) => e instanceof be ? e.toJSON() : e;
function qe(e, t) {
  t = t || {};
  const r = {};
  function s(l, d, m) {
    return c.isPlainObject(l) && c.isPlainObject(d) ? c.merge.call({ caseless: m }, l, d) : c.isPlainObject(d) ? c.merge({}, d) : c.isArray(d) ? d.slice() : d;
  }
  function n(l, d, m) {
    if (c.isUndefined(d)) {
      if (!c.isUndefined(l))
        return s(void 0, l, m);
    } else
      return s(l, d, m);
  }
  function i(l, d) {
    if (!c.isUndefined(d))
      return s(void 0, d);
  }
  function a(l, d) {
    if (c.isUndefined(d)) {
      if (!c.isUndefined(l))
        return s(void 0, l);
    } else
      return s(void 0, d);
  }
  function o(l, d, m) {
    if (m in t)
      return s(l, d);
    if (m in e)
      return s(void 0, l);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: o,
    headers: (l, d) => n(ls(l), ls(d), !0)
  };
  return c.forEach(Object.keys(Object.assign({}, e, t)), function(d) {
    const m = u[d] || n, k = m(e[d], t[d], d);
    c.isUndefined(k) && m !== o || (r[d] = k);
  }), r;
}
const Tn = "1.4.0", Vr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Vr[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const us = {};
Vr.transitional = function(t, r, s) {
  function n(i, a) {
    return "[Axios v" + Tn + "] Transitional option '" + i + "'" + a + (s ? ". " + s : "");
  }
  return (i, a, o) => {
    if (t === !1)
      throw new D(
        n(a, " has been removed" + (r ? " in " + r : "")),
        D.ERR_DEPRECATED
      );
    return r && !us[a] && (us[a] = !0, console.warn(
      n(
        a,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, a, o) : !0;
  };
};
function xc(e, t, r) {
  if (typeof e != "object")
    throw new D("options must be an object", D.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let n = s.length;
  for (; n-- > 0; ) {
    const i = s[n], a = t[i];
    if (a) {
      const o = e[i], u = o === void 0 || a(o, i, e);
      if (u !== !0)
        throw new D("option " + i + " must be " + u, D.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new D("Unknown option " + i, D.ERR_BAD_OPTION);
  }
}
const yr = {
  assertOptions: xc,
  validators: Vr
}, De = yr.validators;
class Et {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new ns(),
      response: new ns()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = qe(this.defaults, r);
    const { transitional: s, paramsSerializer: n, headers: i } = r;
    s !== void 0 && yr.assertOptions(s, {
      silentJSONParsing: De.transitional(De.boolean),
      forcedJSONParsing: De.transitional(De.boolean),
      clarifyTimeoutError: De.transitional(De.boolean)
    }, !1), n != null && (c.isFunction(n) ? r.paramsSerializer = {
      serialize: n
    } : yr.assertOptions(n, {
      encode: De.function,
      serialize: De.function
    }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let a;
    a = i && c.merge(
      i.common,
      i[r.method]
    ), a && c.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (_) => {
        delete i[_];
      }
    ), r.headers = be.concat(a, i);
    const o = [];
    let u = !0;
    this.interceptors.request.forEach(function(S) {
      typeof S.runWhen == "function" && S.runWhen(r) === !1 || (u = u && S.synchronous, o.unshift(S.fulfilled, S.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(S) {
      l.push(S.fulfilled, S.rejected);
    });
    let d, m = 0, k;
    if (!u) {
      const _ = [os.bind(this), void 0];
      for (_.unshift.apply(_, o), _.push.apply(_, l), k = _.length, d = Promise.resolve(r); m < k; )
        d = d.then(_[m++], _[m++]);
      return d;
    }
    k = o.length;
    let x = r;
    for (m = 0; m < k; ) {
      const _ = o[m++], S = o[m++];
      try {
        x = _(x);
      } catch (he) {
        S.call(this, he);
        break;
      }
    }
    try {
      d = os.call(this, x);
    } catch (_) {
      return Promise.reject(_);
    }
    for (m = 0, k = l.length; m < k; )
      d = d.then(l[m++], l[m++]);
    return d;
  }
  getUri(t) {
    t = qe(this.defaults, t);
    const r = vn(t.baseURL, t.url);
    return On(r, t.params, t.paramsSerializer);
  }
}
c.forEach(["delete", "get", "head", "options"], function(t) {
  Et.prototype[t] = function(r, s) {
    return this.request(qe(s || {}, {
      method: t,
      url: r,
      data: (s || {}).data
    }));
  };
});
c.forEach(["post", "put", "patch"], function(t) {
  function r(s) {
    return function(i, a, o) {
      return this.request(qe(o || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  Et.prototype[t] = r(), Et.prototype[t + "Form"] = r(!0);
});
const kt = Et;
class qr {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const s = this;
    this.promise.then((n) => {
      if (!s._listeners)
        return;
      let i = s._listeners.length;
      for (; i-- > 0; )
        s._listeners[i](n);
      s._listeners = null;
    }), this.promise.then = (n) => {
      let i;
      const a = new Promise((o) => {
        s.subscribe(o), i = o;
      }).then(n);
      return a.cancel = function() {
        s.unsubscribe(i);
      }, a;
    }, t(function(i, a, o) {
      s.reason || (s.reason = new ft(i, a, o), r(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new qr(function(n) {
        t = n;
      }),
      cancel: t
    };
  }
}
const Fc = qr;
function Ec(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Rc(e) {
  return c.isObject(e) && e.isAxiosError === !0;
}
const pr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(pr).forEach(([e, t]) => {
  pr[t] = e;
});
const Pc = pr;
function xn(e) {
  const t = new kt(e), r = cn(kt.prototype.request, t);
  return c.extend(r, kt.prototype, t, { allOwnKeys: !0 }), c.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(n) {
    return xn(qe(e, n));
  }, r;
}
const C = xn(Hr);
C.Axios = kt;
C.CanceledError = ft;
C.CancelToken = Fc;
C.isCancel = Mn;
C.VERSION = Tn;
C.toFormData = Bt;
C.AxiosError = D;
C.Cancel = C.CanceledError;
C.all = function(t) {
  return Promise.all(t);
};
C.spread = Ec;
C.isAxiosError = Rc;
C.mergeConfig = qe;
C.AxiosHeaders = be;
C.formToJSON = (e) => Dn(c.isHTMLForm(e) ? new FormData(e) : e);
C.HttpStatusCode = Pc;
C.default = C;
const V = C, Qe = H({
  default: []
});
function at() {
  return {
    createBag(e) {
      Qe[e] = [];
    },
    set(e, t = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      Qe[t] = Object.keys(e.response.data.errors).map((s) => ({
        key: s,
        message: e.response.data.errors[s][0]
      }));
    },
    get(e, t = "default") {
      const r = Qe[t];
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
    clear(e = null, t = "default") {
      if (e) {
        const r = Qe[t];
        if (!r) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const s = r.findIndex((n) => n.key === e);
        r.splice(s, 1);
        return;
      }
      Qe[t] = [];
    }
  };
}
class Jt {
  constructor({
    submitPath: t,
    submitMethod: r = "post",
    loadPath: s = "",
    bag: n = "default",
    form: i = {}
  } = {}) {
    b(this, "loadPath", "");
    b(this, "submitPath", "");
    b(this, "submitMethod", "post");
    b(this, "errors", null);
    b(this, "errorBag", "");
    b(this, "model", H({}));
    b(this, "form", H({}));
    b(this, "original", {});
    b(this, "states", {
      load: new I(),
      submit: new I()
    });
    return this.submitPath = t, this.submitMethod = r, this.loadPath = s, this.errorBag = n, this.errors = at(), this.errors.createBag(this.errorBag), this.setAttributes(i), this.states.load.loaded(), new Proxy(this, {
      get(a, o, u) {
        if (Reflect.has(a, o))
          return Reflect.get(a, o, u);
        if (Reflect.has(a.form, o)) {
          const l = o.split(".");
          if (l.length > 1) {
            let d = a.form;
            for (let m = 0; m < l.length; m++)
              d = d[l[m]];
            return d ?? void 0;
          }
          return Reflect.get(a.form, o);
        }
      },
      set(a, o, u, l) {
        if (Reflect.has(a, o))
          return Reflect.set(a, o, u, l);
        if (Reflect.has(a.form, o)) {
          const d = o.split(".");
          if (d.length > 1) {
            let m = a.form;
            for (let k = 0; k < d.length - 1; k++)
              d[k] in m || (m[d[k]] = {}), m = m[d[k]];
            return m[d[d.length - 1]] === void 0 ? !1 : (m[d[d.length - 1]] = u, !0);
          }
          return Reflect.set(a.form, o, u);
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
    this.errorBag = t || "default", this.errors = at(), this.errors.createBag(this.errorBag);
  }
  setAttributes(t) {
    this.original = t, this.form = H({ ...t });
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
    const n = JSON.parse(JSON.stringify(this.form)), i = r ? r(this.form) : n;
    if (!t)
      return this.handleSubmissionFailure("No url defined.");
    const a = (s == null ? void 0 : s.method) || this.submitMethod || "post";
    try {
      const { data: o } = await V[a](t, i, s);
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
    const { data: r } = await Promise.resolve(t(V, this.form)).catch(
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
    const { data: i } = await V.get(n, {
      params: r
    }).catch((a) => {
      throw this.loadFailed(), a;
    });
    return s && (this.original = i.form), Object.assign(this.form, i.form), i.model && Object.assign(this.model, i.model), this.loaded(), i;
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
const Yc = {
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
      type: Jt,
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
      this.query = e ? h(e, this.submitFormat)._d : null;
    }
  },
  mounted() {
    this.modelValue && (this.query = h(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(e) {
      return e ? h(e).format(this.displayFormat) : null;
    },
    updateQuery() {
      var e;
      this.$emit(
        "update:modelValue",
        this.query ? h(this.query).format(this.submitFormat) : null
      ), (e = this.form) == null || e.clearError(this.name);
    }
  }
};
function Nc(e, t, r, s, n, i) {
  var u;
  const a = q("o-datepicker"), o = q("o-field");
  return A(), Ee(o, tt({ label: r.label }, (u = r.form) == null ? void 0 : u.getError(r.name)), {
    default: K(() => [
      Fe(a, {
        modelValue: n.query,
        "onUpdate:modelValue": [
          t[0] || (t[0] = (l) => n.query = l),
          i.updateQuery
        ],
        "date-formatter": i.dateFormatter
      }, null, 8, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Ac = /* @__PURE__ */ G(Yc, [["render", Nc]]), Cc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ac
}, Symbol.toStringTag, { value: "Module" })), Lc = br({
  name: "WyxosError",
  props: {
    form: {
      type: Jt,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: at()
    };
  }
}), Wc = { key: 0 }, Uc = { key: 1 };
function jc(e, t, r, s, n, i) {
  var a, o;
  return (a = e.form) != null && a.getError(e.name).message ? (A(), se("p", Wc, $(e.form.getError(e.name).message), 1)) : (o = e.errors.get(e.name)) != null && o.message ? (A(), se("p", Uc, $(e.errors.get(e.name).message), 1)) : Te("", !0);
}
const Ic = /* @__PURE__ */ G(Lc, [["render", jc]]), $c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ic
}, Symbol.toStringTag, { value: "Module" })), Hc = {
  name: "WyxosForm",
  props: {
    form: {
      type: Jt,
      required: !0
    }
  },
  emits: ["submit"]
};
function Vc(e, t, r, s, n, i) {
  const a = q("o-loading"), o = q("o-button");
  return A(), se("div", null, [
    r.form.isLoaded ? (A(), se("form", {
      key: 0,
      class: "form",
      onSubmit: t[0] || (t[0] = Zn((u) => e.$emit("submit"), ["prevent"]))
    }, [
      Ve(e.$slots, "default")
    ], 32)) : Te("", !0),
    Fe(a, {
      active: r.form.isLoading
    }, null, 8, ["active"]),
    r.form.isFailure ? (A(), Ee(o, {
      key: 1,
      onClick: t[1] || (t[1] = (u) => r.form.load())
    }, {
      default: K(() => [
        Ae(" An error occurred. Try again? ")
      ]),
      _: 1
    })) : Te("", !0)
  ]);
}
const qc = /* @__PURE__ */ G(Hc, [["render", Vc]]), Bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qc
}, Symbol.toStringTag, { value: "Module" })), zc = {
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
}, Gc = ["width", "height"];
function Jc(e, t, r, s, n, i) {
  return A(), se("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, Gc);
}
const Zc = /* @__PURE__ */ G(zc, [["render", Jc]]), Kc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zc
}, Symbol.toStringTag, { value: "Module" })), Qc = {
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
      errors: at()
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
function Xc(e, t, r, s, n, i) {
  const a = q("o-input"), o = q("o-field");
  return A(), Ee(o, tt({ label: r.label }, { ...s.errors.get(r.name, r.bag), ...i.fieldAttrs }), {
    default: K(() => [
      Fe(a, tt(i.inputAttrs, {
        onInput: t[0] || (t[0] = (u) => s.errors.clear(r.name, r.bag))
      }), null, 16)
    ]),
    _: 1
  }, 16, ["label"]);
}
const ed = /* @__PURE__ */ G(Qc, [["render", Xc]]), td = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ed
}, Symbol.toStringTag, { value: "Module" }));
function Pe(e, t, r = void 0) {
  const s = t.split(".").reduce((n, i) => typeof n < "u" ? n[i] : void 0, e);
  return typeof s < "u" ? s : r;
}
function _r(e) {
  return typeof e < "u" && e !== null ? e : "";
}
function rd(e, t) {
  return e.indexOf(t, e.length - t.length) !== -1;
}
let sd = {
  iconPack: "mdi",
  useHtml5Validation: !0,
  statusIcon: !0,
  transformClasses: void 0
};
const nd = () => sd, cs = (e, t) => _r(e).split(" ").filter((r) => r.length > 0).map((r) => r + t).join(" "), ds = (e) => {
  const r = (e.$options.computed ? Object.keys(e.$options.computed) : []).filter((s) => !rd(s, "Classes")).reduce((s, n) => (s[n] = e[n], s), {});
  return { props: e.$props, data: e.$data, computed: r };
};
br({
  isOruga: !0,
  props: {
    override: Boolean
  },
  methods: {
    computedClass(e, t, r = "") {
      const s = this.$props.override === !0 ? {} : nd(), n = this.$props.override || Pe(s, `${this.$options.configField}.override`, !1), i = Pe(s, `${this.$options.configField}.${e}.override`, n), a = Pe(s, "transformClasses", void 0), o = Pe(s, `${this.$options.configField}.transformClasses`, void 0);
      let u = Pe(s, `${this.$options.configField}.${e}.class`, "") || Pe(s, `${this.$options.configField}.${e}`, ""), l = Pe(this.$props, e);
      Array.isArray(l) && (l = l.join(" ")), t.search("{*}") !== -1 ? t = t.replace(/\{\*\}/g, r) : t = t + r;
      let d = null;
      typeof l == "function" ? (d = ds(this), l = l(r, d)) : l = cs(l, r), typeof u == "function" ? u = u(r, d || ds(this)) : u = cs(u, r);
      let m = `${n && !i || !n && !i ? t : ""} ${_r(u)} ${_r(l)}`.trim().replace(/\s\s+/g, " ");
      return o && (m = o(m)), a && (m = a(m)), m;
    }
  }
});
const Fn = {};
function id(e, t) {
  Fn[e] = t;
}
function En() {
  return { oruga: Fn, addProgrammatic: id };
}
function fs(e, t = {}) {
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
  const s = r[(i = e.response) == null ? void 0 : i.status] || r[500], { oruga: n } = En();
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
const ad = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: e } = await V.post(this.path).catch((t) => {
        if (t.response.status === 401) {
          window.location.href = "/";
          return;
        }
        fs(t);
      }).catch(fs);
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function od(e, t, r, s, n, i) {
  return A(), se("li", null, [
    Ve(e.$slots, "default", { logout: i.logout }, () => [
      B("button", {
        class: "button is-primary",
        onClick: t[0] || (t[0] = (a) => i.logout())
      }, "Sign out")
    ])
  ]);
}
const ld = /* @__PURE__ */ G(ad, [["render", od]]), ud = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ld
}, Symbol.toStringTag, { value: "Module" })), cd = br({
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
}), dd = ["value", "max"], fd = { key: 0 };
function hd(e, t, r, s, n, i) {
  return A(), se(_s, null, [
    B("progress", {
      value: e.value,
      max: e.max
    }, null, 8, dd),
    e.showValue ? (A(), se("span", fd, $(e.value) + " / " + $(e.max), 1)) : Te("", !0)
  ], 64);
}
const md = /* @__PURE__ */ G(cd, [["render", hd]]), yd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: md
}, Symbol.toStringTag, { value: "Module" })), pd = {
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
      state: new I()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, _d = { class: "button-group" };
function gd(e, t, r, s, n, i) {
  const a = q("wyxos-button"), o = q("o-modal");
  return A(), Ee(o, { active: !0 }, {
    default: K(() => [
      B("h2", null, $(r.title), 1),
      B("p", null, $(r.message), 1),
      B("div", _d, [
        Fe(a, {
          disabled: s.state.isLoading,
          "native-type": "button",
          onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
        }, {
          default: K(() => [
            Ae($(r.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        Fe(a, {
          loading: s.state.isLoading,
          "native-type": "button",
          onClick: t[1] || (t[1] = (u) => i.proceed())
        }, {
          default: K(() => [
            Ae($(r.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const wd = /* @__PURE__ */ G(pd, [["render", gd]]), bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wd
}, Symbol.toStringTag, { value: "Module" })), Sd = {
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
      type: Jt,
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
}, Od = ["value"];
function kd(e, t, r, s, n, i) {
  var u;
  const a = q("o-select"), o = q("o-field");
  return A(), Ee(o, tt({ label: r.label }, (u = r.form) == null ? void 0 : u.getError(r.name)), {
    default: K(() => [
      Fe(a, {
        disabled: r.disabled,
        "model-value": r.modelValue,
        name: r.name,
        placeholder: r.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (l) => i.updateValue(l))
      }, {
        default: K(() => [
          Ve(e.$slots, "default", {}, () => [
            r.items ? (A(!0), se(_s, { key: 0 }, Kn(r.items, (l) => (A(), se("option", {
              key: l.value,
              value: l.value
            }, $(l.label), 9, Od))), 128)) : Te("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Dd = /* @__PURE__ */ G(Sd, [["render", kd]]), Md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dd
}, Symbol.toStringTag, { value: "Module" }));
class Br {
  constructor(t = {}) {
    b(this, "state", new I());
    b(this, "result", ir([]));
    b(this, "value", ir(null));
    b(this, "timeout", null);
    b(this, "options", {
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
    return new Br(t);
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
      const s = t || this.options.url, { data: n } = await V.post(`${s}/search`, r || this.options.payload, {
        signal: this.controller.signal
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = n.result, this.state.loaded();
    }, 500);
  }
  async restore(t, r) {
    this.state.loading(), this.reset();
    const s = t || this.options.url, { data: n } = await V.post(`${s}/restore`, r || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), n;
  }
  reset() {
    this.result.value = [];
  }
}
const vd = {
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
      search: Br.create()
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
function Td(e, t, r, s, n, i) {
  const a = q("o-inputitems");
  return A(), Ee(a, tt({
    ref: "tagInput",
    modelValue: n.query,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => n.query = o),
    data: s.search.result.value,
    "allow-autocomplete": ""
  }, e.$attrs, {
    onAdd: t[1] || (t[1] = (o) => i.addedTag(o)),
    onRemove: t[2] || (t[2] = (o) => i.removedTag(o)),
    onTyping: t[3] || (t[3] = (o) => i.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const xd = /* @__PURE__ */ G(vd, [["render", Td]]), Fd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xd
}, Symbol.toStringTag, { value: "Module" }));
class Ed {
  constructor() {
    b(this, "attributes", H({
      user: null
    }));
    b(this, "state", new I());
    return new Proxy(this, {
      get(t, r, s) {
        return Reflect.has(t, r) ? Reflect.get(t, r, s) : r in t.attributes ? t.attributes[r] : null;
      },
      set(t, r, s, n) {
        return Reflect.has(t, r) ? Reflect.set(t, r, s, n) : r in t.attributes ? (t.attributes[r] = s, !0) : null;
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
    this.state.loading(), await V.get("/sanctum/csrf-cookie").catch((r) => {
      throw this.state.failed(), r;
    });
    const { data: t } = await V.get("/api/user");
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
    this.attributes = H({
      user: null
    });
  }
}
const Bd = new Ed(), Rd = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Pd {
  constructor() {
    b(this, "FORMATS", Rd);
  }
  format(t, r, s = "") {
    return t ? h(t).format(r) : s;
  }
}
const zd = new Pd();
class Gd {
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
const Rn = "%[a-f0-9]{2}", hs = new RegExp("(" + Rn + ")|([^%]+?)", "gi"), ms = new RegExp("(" + Rn + ")+", "gi");
function gr(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  t = t || 1;
  const r = e.slice(0, t), s = e.slice(t);
  return Array.prototype.concat.call([], gr(r), gr(s));
}
function Yd(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(hs) || [];
    for (let r = 1; r < t.length; r++)
      e = gr(t, r).join(""), t = e.match(hs) || [];
    return e;
  }
}
function Nd(e) {
  const t = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let r = ms.exec(e);
  for (; r; ) {
    try {
      t[r[0]] = decodeURIComponent(r[0]);
    } catch {
      const n = Yd(r[0]);
      n !== r[0] && (t[r[0]] = n);
    }
    r = ms.exec(e);
  }
  t["%C2"] = "�";
  const s = Object.keys(t);
  for (const n of s)
    e = e.replace(new RegExp(n, "g"), t[n]);
  return e;
}
function Ad(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return Nd(e);
  }
}
function Pn(e, t) {
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
function Cd(e, t) {
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
        const i = e[s];
        t(s, i, e) && Object.defineProperty(r, s, n);
      }
    }
  return r;
}
const Ld = (e) => e == null, Wd = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), wr = Symbol("encodeFragmentIdentifier");
function Ud(e) {
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
function jd(e) {
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
        const i = typeof s == "string" && s.includes(e.arrayFormatSeparator), a = typeof s == "string" && !i && pe(s, e).includes(e.arrayFormatSeparator);
        s = a ? pe(s, e) : s;
        const o = i || a ? s.split(e.arrayFormatSeparator).map((u) => pe(u, e)) : s === null ? s : pe(s, e);
        n[r] = o;
      };
    case "bracket-separator":
      return (r, s, n) => {
        const i = /(\[])$/.test(r);
        if (r = r.replace(/\[]$/, ""), !i) {
          n[r] = s && pe(s, e);
          return;
        }
        const a = s === null ? [] : s.split(e.arrayFormatSeparator).map((o) => pe(o, e));
        if (n[r] === void 0) {
          n[r] = a;
          return;
        }
        n[r] = [...n[r], ...a];
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
function Yn(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function Y(e, t) {
  return t.encode ? t.strict ? Wd(e) : encodeURIComponent(e) : e;
}
function pe(e, t) {
  return t.decode ? Ad(e) : e;
}
function Nn(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? Nn(Object.keys(e)).sort((t, r) => Number(t) - Number(r)).map((t) => e[t]) : e;
}
function An(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function Id(e) {
  let t = "";
  const r = e.indexOf("#");
  return r !== -1 && (t = e.slice(r)), t;
}
function ys(e, t) {
  return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function zr(e) {
  e = An(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function Gr(e, t) {
  t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...t
  }, Yn(t.arrayFormatSeparator);
  const r = jd(t), s = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return s;
  for (const n of e.split("&")) {
    if (n === "")
      continue;
    const i = t.decode ? n.replace(/\+/g, " ") : n;
    let [a, o] = Pn(i, "=");
    a === void 0 && (a = i), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? o : pe(o, t), r(pe(a, t), o, s);
  }
  for (const [n, i] of Object.entries(s))
    if (typeof i == "object" && i !== null)
      for (const [a, o] of Object.entries(i))
        i[a] = ys(o, t);
    else
      s[n] = ys(i, t);
  return t.sort === !1 ? s : (t.sort === !0 ? Object.keys(s).sort() : Object.keys(s).sort(t.sort)).reduce((n, i) => {
    const a = s[i];
    return a && typeof a == "object" && !Array.isArray(a) ? n[i] = Nn(a) : n[i] = a, n;
  }, /* @__PURE__ */ Object.create(null));
}
function Cn(e, t) {
  if (!e)
    return "";
  t = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...t
  }, Yn(t.arrayFormatSeparator);
  const r = (a) => t.skipNull && Ld(e[a]) || t.skipEmptyString && e[a] === "", s = Ud(t), n = {};
  for (const [a, o] of Object.entries(e))
    r(a) || (n[a] = o);
  const i = Object.keys(n);
  return t.sort !== !1 && i.sort(t.sort), i.map((a) => {
    const o = e[a];
    return o === void 0 ? "" : o === null ? Y(a, t) : Array.isArray(o) ? o.length === 0 && t.arrayFormat === "bracket-separator" ? Y(a, t) + "[]" : o.reduce(s(a), []).join("&") : Y(a, t) + "=" + Y(o, t);
  }).filter((a) => a.length > 0).join("&");
}
function Ln(e, t) {
  var n;
  t = {
    decode: !0,
    ...t
  };
  let [r, s] = Pn(e, "#");
  return r === void 0 && (r = e), {
    url: ((n = r == null ? void 0 : r.split("?")) == null ? void 0 : n[0]) ?? "",
    query: Gr(zr(e), t),
    ...t && t.parseFragmentIdentifier && s ? { fragmentIdentifier: pe(s, t) } : {}
  };
}
function Wn(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [wr]: !0,
    ...t
  };
  const r = An(e.url).split("?")[0] || "", s = zr(e.url), n = {
    ...Gr(s, { sort: !1 }),
    ...e.query
  };
  let i = Cn(n, t);
  i && (i = `?${i}`);
  let a = Id(e.url);
  if (e.fragmentIdentifier) {
    const o = new URL(r);
    o.hash = e.fragmentIdentifier, a = t[wr] ? o.hash : `#${e.fragmentIdentifier}`;
  }
  return `${r}${i}${a}`;
}
function Un(e, t, r) {
  r = {
    parseFragmentIdentifier: !0,
    [wr]: !1,
    ...r
  };
  const { url: s, query: n, fragmentIdentifier: i } = Ln(e, r);
  return Wn({
    url: s,
    query: Cd(n, t),
    fragmentIdentifier: i
  }, r);
}
function $d(e, t, r) {
  const s = Array.isArray(t) ? (n) => !t.includes(n) : (n, i) => !t(n, i);
  return Un(e, s, r);
}
const ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: $d,
  extract: zr,
  parse: Gr,
  parseUrl: Ln,
  pick: Un,
  stringify: Cn,
  stringifyUrl: Wn
}, Symbol.toStringTag, { value: "Module" }));
let pt;
class jn {
  constructor() {
    b(this, "api", null);
    b(this, "baseUrl", null);
    b(this, "structure", null);
    b(this, "options", null);
    b(this, "errors", null);
    b(this, "errorBag", "default");
    b(this, "states", {
      load: I.create(),
      fetch: I.create(),
      filter: I.create()
    });
    b(this, "query", H({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    b(this, "params", H({
      page: 1
    }));
    b(this, "state", H({
      isFilterActive: !1
    }));
  }
  get tableConfig() {
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
    const s = new jn();
    if (!t)
      throw Error("Structure of search query required.");
    return s.errors = at(), s.errors.createBag(this.errorBag), s.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (n) => n
      },
      r
    ), s.setParameters(t), s.options.enableSearchUpdate && s.mergeSearch(), s.baseUrl = r.baseUrl, s.api = V.create(r.axios || {}), s;
  }
  setParameters(t) {
    const r = JSON.parse(JSON.stringify(t));
    this.structure = Object.assign({}, r), this.params = H(t);
  }
  mergeSearch() {
    const t = ps.parse(window.location.search, {
      arrayFormat: "bracket"
    });
    t.page && (t.page = Number(t.page)), Object.assign(this.params, this.structure, t);
  }
  async fetch(t, r) {
    this.states.fetch.loading();
    const s = JSON.parse(JSON.stringify(this.params)), n = t || this.baseUrl, { data: i } = await this.api.get(n, {
      params: s,
      cancelToken: r
    }).catch((a) => {
      throw this.states.fetch.failed(), a;
    });
    return this.states.fetch.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), i;
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
      Object.entries(r).filter(([i, a]) => a != null)
    ), n = t + "?" + ps.stringify(s, { arrayFormat: "bracket" });
    window.history.replaceState({}, "", n);
  }
  push(t) {
    this.query.items.push(this.transformItem(t));
  }
  transformItem(t) {
    return this.options.transformItem({
      ...t,
      states: {
        delete: new I(),
        patch: new I()
      }
    });
  }
  async load(t) {
    this.errors.clear(null, this.errorBag), pt && pt.cancel(), pt = V.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let r = null;
    try {
      r = await this.fetch(t, pt.token);
    } catch (s) {
      if (V.isCancel(s)) {
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
    const { data: i } = await this.api.patch(t || this.baseUrl, s).catch((o) => {
      throw o;
    });
    return i.patch && Object.assign(n, i.patch), (await this.fetch()).query.items.length || (this.params.page--, await this.load()), i;
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
  async processRowAndRefreshList({ path: t, props: r, payload: s, state: n, method: i } = {}) {
    const { row: a, index: o } = r;
    s = {
      id: a.id,
      ...s
    };
    let u = a.states[n];
    u || (u = a.states[n] = I.create()), u.loading();
    const { data: l } = await this.api[i](
      t || this.baseUrl,
      s
    ).catch((m) => {
      throw u.failed(), m;
    });
    u.loaded(), l.row && Object.assign(a, l.row);
    const d = await this.fetch();
    if (this.query.items.splice(o, 1), !d.query.items.length)
      return this.params.page--, await this.load(), l;
    if (this.query.items.length < d.query.items.length) {
      const m = d.query.items[d.query.items.length - 1];
      this.push(m);
    }
    return l;
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
class In {
  constructor() {
    b(this, "state", ir(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new In();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class Jd {
  static create(t, r = null, s = null) {
    return r = r || t, {
      value: t,
      label: r
    };
  }
}
class Zd {
  constructor() {
    b(this, "structure", {});
    b(this, "query", H({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    b(this, "params", H({
      page: 1
    }));
    b(this, "router", null);
  }
  static create(t, r = {}, s = {}, n) {
    s = Object.assign(
      { base: "/api/admin", route: `${t}.index` },
      s
    );
    const i = s.base, a = {
      route: s.route,
      index: s.index || `${i}/${t}/index`,
      destroy: `${i}/${t}/destroy`
    }, o = new this();
    return o.options = s, o.structure = r, o.params = Object.assign(o.params, r), o.router = n, o.urls = a, o;
  }
  async fetch(t) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: r } = await V.get(t || this.urls.index, {
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
  async action(t, { row: r, index: s, remove: n, method: i }, a = {}) {
    r.isProcessing = !0;
    const o = {
      id: r.id,
      ...a
    };
    if (i === "delete") {
      const { data: u } = await V.delete(t, {
        data: o
      }).catch((l) => {
        throw r.isProcessing = !1, l;
      });
      r.isProcessing = !1, u.row && Object.assign(r, u.row);
    } else {
      const { data: u } = await V.post(t, o).catch((l) => {
        throw r.isProcessing = !1, l;
      });
      r.isProcessing = !1, u.row && Object.assign(r, u.row);
    }
    if (n) {
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
function Kd(e) {
  const { oruga: t } = En();
  t.notification.open({
    message: e || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class $n {
  constructor(t) {
    b(this, "attributes", H({
      name: null
    }));
    b(this, "callbacks", {});
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
    return new $n(t);
  }
}
const nr = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": ri, "./components/WyxosCollection.vue": oi, "./components/WyxosConfirm.vue": yi, "./components/WyxosDatepicker.vue": Cc, "./components/WyxosError.vue": $c, "./components/WyxosForm.vue": Bc, "./components/WyxosImage.vue": Kc, "./components/WyxosInput.vue": td, "./components/WyxosLogout.vue": ud, "./components/WyxosProgress.vue": yd, "./components/WyxosPrompt.vue": bd, "./components/WyxosSelect.vue": Md, "./components/WyxosTags.vue": Fd }), Hn = {}, Hd = (e) => {
  Object.keys(nr).forEach((t) => {
    const r = nr[t].default.name, s = nr[t].default;
    e.component(r, s), e.component(r.replace("Wyxos", "W"), s), Hn[r] = s;
  });
}, Qd = {
  install: Hd,
  ...Hn
};
export {
  Gd as FileRequest,
  Jt as FormBuilder,
  jn as Listing,
  I as LoadState,
  In as Modal,
  Jd as Option,
  Zd as ResourceList,
  Br as Search,
  $n as Tab,
  ti as WyxosButton,
  ai as WyxosCollection,
  mi as WyxosConfirm,
  Ac as WyxosDatepicker,
  Ic as WyxosError,
  qc as WyxosForm,
  Zc as WyxosImage,
  ed as WyxosInput,
  ld as WyxosLogout,
  md as WyxosProgress,
  wd as WyxosPrompt,
  Dd as WyxosSelect,
  xd as WyxosTags,
  Bd as auth,
  zd as dateRender,
  Qd as default,
  fs as errorHandler,
  Kd as success,
  at as useFormErrors
};
