var Mr = Object.defineProperty;
var Dr = (e, t, s) => t in e ? Mr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var _ = (e, t, s) => (Dr(e, typeof t != "symbol" ? t + "" : t, s), s);
import { resolveComponent as F, openBlock as D, createBlock as K, withCtx as W, renderSlot as Oe, createTextVNode as te, createCommentVNode as pe, toDisplayString as U, createElementBlock as Z, normalizeProps as kt, guardReactiveProps as Ot, createElementVNode as M, reactive as A, createVNode as V, normalizeClass as ms, mergeProps as je, defineComponent as ys, withModifiers as _s, createSlots as Yr, renderList as gs, Fragment as ps, ref as Ue } from "vue";
import T from "axios";
import xr, { useProgrammatic as ws } from "@oruga-ui/oruga-next";
const R = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, a] of t)
    s[r] = a;
  return s;
}, Tr = {
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
}, Fr = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Pr(e, t, s, r, a, n) {
  const i = F("o-button");
  return D(), K(i, { disabled: s.loading }, {
    default: W(() => [
      s.loading ? pe("", !0) : Oe(e.$slots, "default", { key: 0 }, () => [
        te("Submit")
      ]),
      s.loading && s.text ? Oe(e.$slots, "loading", { key: 1 }, () => [
        te(U(s.text), 1)
      ]) : pe("", !0),
      s.loading ? (D(), Z("i", Fr)) : pe("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const Wr = /* @__PURE__ */ R(Tr, [["render", Pr]]), Nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wr
}, Symbol.toStringTag, { value: "Module" })), Rr = {
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
}, Lr = /* @__PURE__ */ M("ul", null, [
  /* @__PURE__ */ M("li")
], -1);
function Cr(e, t, s, r, a, n) {
  return Oe(e.$slots, "default", kt(Ot({ add: n.add, remove: n.remove, items: a.items })), () => [
    Lr
  ]);
}
const Er = /* @__PURE__ */ R(Rr, [["render", Cr]]), Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Er
}, Symbol.toStringTag, { value: "Module" }));
class j {
  constructor() {
    _(this, "state", A({
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
    return new j();
  }
}
const jr = {
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
      state: new j()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Ur = { class: "bg-white p-6" }, Ar = { class: "title" }, $r = { class: "mb-6" }, Vr = {
  class: "buttons",
  role: "group"
};
function qr(e, t, s, r, a, n) {
  const i = F("wyxos-button"), o = F("o-modal");
  return D(), K(o, {
    active: !0,
    onClose: t[2] || (t[2] = (u) => e.$emit("close", { action: !1 }))
  }, {
    default: W(() => [
      M("section", Ur, [
        M("article", null, [
          M("header", null, [
            M("h3", Ar, U(s.title), 1)
          ]),
          M("p", $r, U(s.message), 1),
          M("footer", Vr, [
            V(i, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
            }, {
              default: W(() => [
                te(U(s.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            V(i, {
              class: ms([{ [s.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (u) => n.proceed())
            }, {
              default: W(() => [
                te(U(s.confirmText), 1)
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
const Hr = /* @__PURE__ */ R(jr, [["render", qr]]), zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hr
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var bs;
function d() {
  return bs.apply(null, arguments);
}
function Gr(e) {
  bs = e;
}
function J(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function ke(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function p(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Lt(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (p(e, t))
      return !1;
  return !0;
}
function I(e) {
  return e === void 0;
}
function ce(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function He(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Ss(e, t) {
  var s = [], r, a = e.length;
  for (r = 0; r < a; ++r)
    s.push(t(e[r], r));
  return s;
}
function _e(e, t) {
  for (var s in t)
    p(t, s) && (e[s] = t[s]);
  return p(t, "toString") && (e.toString = t.toString), p(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function re(e, t, s, r) {
  return Hs(e, t, s, r, !0).utc();
}
function Br() {
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
  return e._pf == null && (e._pf = Br()), e._pf;
}
var Mt;
Array.prototype.some ? Mt = Array.prototype.some : Mt = function(e) {
  var t = Object(this), s = t.length >>> 0, r;
  for (r = 0; r < s; r++)
    if (r in t && e.call(this, t[r], r, t))
      return !0;
  return !1;
};
function Ct(e) {
  if (e._isValid == null) {
    var t = m(e), s = Mt.call(t.parsedDateParts, function(a) {
      return a != null;
    }), r = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && s);
    if (e._strict && (r = r && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = r;
    else
      return r;
  }
  return e._isValid;
}
function it(e) {
  var t = re(NaN);
  return e != null ? _e(m(t), e) : m(t).userInvalidated = !0, t;
}
var ns = d.momentProperties = [], pt = !1;
function Et(e, t) {
  var s, r, a, n = ns.length;
  if (I(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), I(t._i) || (e._i = t._i), I(t._f) || (e._f = t._f), I(t._l) || (e._l = t._l), I(t._strict) || (e._strict = t._strict), I(t._tzm) || (e._tzm = t._tzm), I(t._isUTC) || (e._isUTC = t._isUTC), I(t._offset) || (e._offset = t._offset), I(t._pf) || (e._pf = m(t)), I(t._locale) || (e._locale = t._locale), n > 0)
    for (s = 0; s < n; s++)
      r = ns[s], a = t[r], I(a) || (e[r] = a);
  return e;
}
function ze(e) {
  Et(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), pt === !1 && (pt = !0, d.updateOffset(this), pt = !1);
}
function Q(e) {
  return e instanceof ze || e != null && e._isAMomentObject != null;
}
function vs(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function z(e, t) {
  var s = !0;
  return _e(function() {
    if (d.deprecationHandler != null && d.deprecationHandler(null, e), s) {
      var r = [], a, n, i, o = arguments.length;
      for (n = 0; n < o; n++) {
        if (a = "", typeof arguments[n] == "object") {
          a += `
[` + n + "] ";
          for (i in arguments[0])
            p(arguments[0], i) && (a += i + ": " + arguments[0][i] + ", ");
          a = a.slice(0, -2);
        } else
          a = arguments[n];
        r.push(a);
      }
      vs(
        e + `
Arguments: ` + Array.prototype.slice.call(r).join("") + `
` + new Error().stack
      ), s = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var is = {};
function ks(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), is[e] || (vs(t), is[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function ae(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Zr(e) {
  var t, s;
  for (s in e)
    p(e, s) && (t = e[s], ae(t) ? this[s] = t : this["_" + s] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function Dt(e, t) {
  var s = _e({}, e), r;
  for (r in t)
    p(t, r) && (ke(e[r]) && ke(t[r]) ? (s[r] = {}, _e(s[r], e[r]), _e(s[r], t[r])) : t[r] != null ? s[r] = t[r] : delete s[r]);
  for (r in e)
    p(e, r) && !p(t, r) && ke(e[r]) && (s[r] = _e({}, s[r]));
  return s;
}
function It(e) {
  e != null && this.set(e);
}
var Yt;
Object.keys ? Yt = Object.keys : Yt = function(e) {
  var t, s = [];
  for (t in e)
    p(e, t) && s.push(t);
  return s;
};
var Jr = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Qr(e, t, s) {
  var r = this._calendar[e] || this._calendar.sameElse;
  return ae(r) ? r.call(t, s) : r;
}
function se(e, t, s) {
  var r = "" + Math.abs(e), a = t - r.length, n = e >= 0;
  return (n ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + r;
}
var jt = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Ze = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, wt = {}, Te = {};
function f(e, t, s, r) {
  var a = r;
  typeof r == "string" && (a = function() {
    return this[r]();
  }), e && (Te[e] = a), t && (Te[t[0]] = function() {
    return se(a.apply(this, arguments), t[1], t[2]);
  }), s && (Te[s] = function() {
    return this.localeData().ordinal(
      a.apply(this, arguments),
      e
    );
  });
}
function Kr(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Xr(e) {
  var t = e.match(jt), s, r;
  for (s = 0, r = t.length; s < r; s++)
    Te[t[s]] ? t[s] = Te[t[s]] : t[s] = Kr(t[s]);
  return function(a) {
    var n = "", i;
    for (i = 0; i < r; i++)
      n += ae(t[i]) ? t[i].call(a, e) : t[i];
    return n;
  };
}
function Qe(e, t) {
  return e.isValid() ? (t = Os(t, e.localeData()), wt[t] = wt[t] || Xr(t), wt[t](e)) : e.localeData().invalidDate();
}
function Os(e, t) {
  var s = 5;
  function r(a) {
    return t.longDateFormat(a) || a;
  }
  for (Ze.lastIndex = 0; s >= 0 && Ze.test(e); )
    e = e.replace(
      Ze,
      r
    ), Ze.lastIndex = 0, s -= 1;
  return e;
}
var ea = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function ta(e) {
  var t = this._longDateFormat[e], s = this._longDateFormat[e.toUpperCase()];
  return t || !s ? t : (this._longDateFormat[e] = s.match(jt).map(function(r) {
    return r === "MMMM" || r === "MM" || r === "DD" || r === "dddd" ? r.slice(1) : r;
  }).join(""), this._longDateFormat[e]);
}
var sa = "Invalid date";
function ra() {
  return this._invalidDate;
}
var aa = "%d", na = /\d{1,2}/;
function ia(e) {
  return this._ordinal.replace("%d", e);
}
var oa = {
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
function la(e, t, s, r) {
  var a = this._relativeTime[s];
  return ae(a) ? a(e, t, s, r) : a.replace(/%d/i, e);
}
function ua(e, t) {
  var s = this._relativeTime[e > 0 ? "future" : "past"];
  return ae(s) ? s(t) : s.replace(/%s/i, t);
}
var Ee = {};
function L(e, t) {
  var s = e.toLowerCase();
  Ee[s] = Ee[s + "s"] = Ee[t] = e;
}
function G(e) {
  return typeof e == "string" ? Ee[e] || Ee[e.toLowerCase()] : void 0;
}
function Ut(e) {
  var t = {}, s, r;
  for (r in e)
    p(e, r) && (s = G(r), s && (t[s] = e[r]));
  return t;
}
var Ms = {};
function C(e, t) {
  Ms[e] = t;
}
function da(e) {
  var t = [], s;
  for (s in e)
    p(e, s) && t.push({ unit: s, priority: Ms[s] });
  return t.sort(function(r, a) {
    return r.priority - a.priority;
  }), t;
}
function ot(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function H(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function y(e) {
  var t = +e, s = 0;
  return t !== 0 && isFinite(t) && (s = H(t)), s;
}
function We(e, t) {
  return function(s) {
    return s != null ? (Ds(this, e, s), d.updateOffset(this, t), this) : et(this, e);
  };
}
function et(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Ds(e, t, s) {
  e.isValid() && !isNaN(s) && (t === "FullYear" && ot(e.year()) && e.month() === 1 && e.date() === 29 ? (s = y(s), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    s,
    e.month(),
    ft(s, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](s));
}
function ca(e) {
  return e = G(e), ae(this[e]) ? this[e]() : this;
}
function ha(e, t) {
  if (typeof e == "object") {
    e = Ut(e);
    var s = da(e), r, a = s.length;
    for (r = 0; r < a; r++)
      this[s[r].unit](e[s[r].unit]);
  } else if (e = G(e), ae(this[e]))
    return this[e](t);
  return this;
}
var Ys = /\d/, q = /\d\d/, xs = /\d{3}/, At = /\d{4}/, lt = /[+-]?\d{6}/, k = /\d\d?/, Ts = /\d\d\d\d?/, Fs = /\d\d\d\d\d\d?/, ut = /\d{1,3}/, $t = /\d{1,4}/, dt = /[+-]?\d{1,6}/, Ne = /\d+/, ct = /[+-]?\d+/, fa = /Z|[+-]\d\d:?\d\d/gi, ht = /Z|[+-]\d\d(?::?\d\d)?/gi, ma = /[+-]?\d+(\.\d{1,3})?/, Ge = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, tt;
tt = {};
function c(e, t, s) {
  tt[e] = ae(t) ? t : function(r, a) {
    return r && s ? s : t;
  };
}
function ya(e, t) {
  return p(tt, e) ? tt[e](t._strict, t._locale) : new RegExp(_a(e));
}
function _a(e) {
  return $(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, s, r, a, n) {
        return s || r || a || n;
      }
    )
  );
}
function $(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var xt = {};
function b(e, t) {
  var s, r = t, a;
  for (typeof e == "string" && (e = [e]), ce(t) && (r = function(n, i) {
    i[t] = y(n);
  }), a = e.length, s = 0; s < a; s++)
    xt[e[s]] = r;
}
function Be(e, t) {
  b(e, function(s, r, a, n) {
    a._w = a._w || {}, t(s, a._w, a, n);
  });
}
function ga(e, t, s) {
  t != null && p(xt, e) && xt[e](t, s._a, s, e);
}
var N = 0, le = 1, ee = 2, P = 3, B = 4, ue = 5, ve = 6, pa = 7, wa = 8;
function ba(e, t) {
  return (e % t + t) % t;
}
var Y;
Array.prototype.indexOf ? Y = Array.prototype.indexOf : Y = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function ft(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var s = ba(t, 12);
  return e += (t - s) / 12, s === 1 ? ot(e) ? 29 : 28 : 31 - s % 7 % 2;
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
L("month", "M");
C("month", 8);
c("M", k);
c("MM", k, q);
c("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
c("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
b(["M", "MM"], function(e, t) {
  t[le] = y(e) - 1;
});
b(["MMM", "MMMM"], function(e, t, s, r) {
  var a = s._locale.monthsParse(e, r, s._strict);
  a != null ? t[le] = a : m(s).invalidMonth = e;
});
var Sa = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ps = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Ws = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, va = Ge, ka = Ge;
function Oa(e, t) {
  return e ? J(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ws).test(t) ? "format" : "standalone"][e.month()] : J(this._months) ? this._months : this._months.standalone;
}
function Ma(e, t) {
  return e ? J(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ws.test(t) ? "format" : "standalone"][e.month()] : J(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Da(e, t, s) {
  var r, a, n, i = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r)
      n = re([2e3, r]), this._shortMonthsParse[r] = this.monthsShort(
        n,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[r] = this.months(n, "").toLocaleLowerCase();
  return s ? t === "MMM" ? (a = Y.call(this._shortMonthsParse, i), a !== -1 ? a : null) : (a = Y.call(this._longMonthsParse, i), a !== -1 ? a : null) : t === "MMM" ? (a = Y.call(this._shortMonthsParse, i), a !== -1 ? a : (a = Y.call(this._longMonthsParse, i), a !== -1 ? a : null)) : (a = Y.call(this._longMonthsParse, i), a !== -1 ? a : (a = Y.call(this._shortMonthsParse, i), a !== -1 ? a : null));
}
function Ya(e, t, s) {
  var r, a, n;
  if (this._monthsParseExact)
    return Da.call(this, e, t, s);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++) {
    if (a = re([2e3, r]), s && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp(
      "^" + this.months(a, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[r] = new RegExp(
      "^" + this.monthsShort(a, "").replace(".", "") + "$",
      "i"
    )), !s && !this._monthsParse[r] && (n = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[r] = new RegExp(n.replace(".", ""), "i")), s && t === "MMMM" && this._longMonthsParse[r].test(e))
      return r;
    if (s && t === "MMM" && this._shortMonthsParse[r].test(e))
      return r;
    if (!s && this._monthsParse[r].test(e))
      return r;
  }
}
function Ns(e, t) {
  var s;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = y(t);
    else if (t = e.localeData().monthsParse(t), !ce(t))
      return e;
  }
  return s = Math.min(e.date(), ft(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, s), e;
}
function Rs(e) {
  return e != null ? (Ns(this, e), d.updateOffset(this, !0), this) : et(this, "Month");
}
function xa() {
  return ft(this.year(), this.month());
}
function Ta(e) {
  return this._monthsParseExact ? (p(this, "_monthsRegex") || Ls.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (p(this, "_monthsShortRegex") || (this._monthsShortRegex = va), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Fa(e) {
  return this._monthsParseExact ? (p(this, "_monthsRegex") || Ls.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (p(this, "_monthsRegex") || (this._monthsRegex = ka), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Ls() {
  function e(i, o) {
    return o.length - i.length;
  }
  var t = [], s = [], r = [], a, n;
  for (a = 0; a < 12; a++)
    n = re([2e3, a]), t.push(this.monthsShort(n, "")), s.push(this.months(n, "")), r.push(this.months(n, "")), r.push(this.monthsShort(n, ""));
  for (t.sort(e), s.sort(e), r.sort(e), a = 0; a < 12; a++)
    t[a] = $(t[a]), s[a] = $(s[a]);
  for (a = 0; a < 24; a++)
    r[a] = $(r[a]);
  this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
f("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? se(e, 4) : "+" + e;
});
f(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
f(0, ["YYYY", 4], 0, "year");
f(0, ["YYYYY", 5], 0, "year");
f(0, ["YYYYYY", 6, !0], 0, "year");
L("year", "y");
C("year", 1);
c("Y", ct);
c("YY", k, q);
c("YYYY", $t, At);
c("YYYYY", dt, lt);
c("YYYYYY", dt, lt);
b(["YYYYY", "YYYYYY"], N);
b("YYYY", function(e, t) {
  t[N] = e.length === 2 ? d.parseTwoDigitYear(e) : y(e);
});
b("YY", function(e, t) {
  t[N] = d.parseTwoDigitYear(e);
});
b("Y", function(e, t) {
  t[N] = parseInt(e, 10);
});
function Ie(e) {
  return ot(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return y(e) + (y(e) > 68 ? 1900 : 2e3);
};
var Cs = We("FullYear", !0);
function Pa() {
  return ot(this.year());
}
function Wa(e, t, s, r, a, n, i) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, s, r, a, n, i), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, s, r, a, n, i), o;
}
function Ae(e) {
  var t, s;
  return e < 100 && e >= 0 ? (s = Array.prototype.slice.call(arguments), s[0] = e + 400, t = new Date(Date.UTC.apply(null, s)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function st(e, t, s) {
  var r = 7 + t - s, a = (7 + Ae(e, 0, r).getUTCDay() - t) % 7;
  return -a + r - 1;
}
function Es(e, t, s, r, a) {
  var n = (7 + s - r) % 7, i = st(e, r, a), o = 1 + 7 * (t - 1) + n + i, u, h;
  return o <= 0 ? (u = e - 1, h = Ie(u) + o) : o > Ie(e) ? (u = e + 1, h = o - Ie(e)) : (u = e, h = o), {
    year: u,
    dayOfYear: h
  };
}
function $e(e, t, s) {
  var r = st(e.year(), t, s), a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1, n, i;
  return a < 1 ? (i = e.year() - 1, n = a + de(i, t, s)) : a > de(e.year(), t, s) ? (n = a - de(e.year(), t, s), i = e.year() + 1) : (i = e.year(), n = a), {
    week: n,
    year: i
  };
}
function de(e, t, s) {
  var r = st(e, t, s), a = st(e + 1, t, s);
  return (Ie(e) - r + a) / 7;
}
f("w", ["ww", 2], "wo", "week");
f("W", ["WW", 2], "Wo", "isoWeek");
L("week", "w");
L("isoWeek", "W");
C("week", 5);
C("isoWeek", 5);
c("w", k);
c("ww", k, q);
c("W", k);
c("WW", k, q);
Be(
  ["w", "ww", "W", "WW"],
  function(e, t, s, r) {
    t[r.substr(0, 1)] = y(e);
  }
);
function Na(e) {
  return $e(e, this._week.dow, this._week.doy).week;
}
var Ra = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function La() {
  return this._week.dow;
}
function Ca() {
  return this._week.doy;
}
function Ea(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Ia(e) {
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
L("day", "d");
L("weekday", "e");
L("isoWeekday", "E");
C("day", 11);
C("weekday", 11);
C("isoWeekday", 11);
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
Be(["dd", "ddd", "dddd"], function(e, t, s, r) {
  var a = s._locale.weekdaysParse(e, r, s._strict);
  a != null ? t.d = a : m(s).invalidWeekday = e;
});
Be(["d", "e", "E"], function(e, t, s, r) {
  t[r] = y(e);
});
function ja(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function Ua(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Vt(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Aa = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Is = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), $a = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Va = Ge, qa = Ge, Ha = Ge;
function za(e, t) {
  var s = J(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Vt(s, this._week.dow) : e ? s[e.day()] : s;
}
function Ga(e) {
  return e === !0 ? Vt(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Ba(e) {
  return e === !0 ? Vt(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Za(e, t, s) {
  var r, a, n, i = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], r = 0; r < 7; ++r)
      n = re([2e3, 1]).day(r), this._minWeekdaysParse[r] = this.weekdaysMin(
        n,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[r] = this.weekdaysShort(
        n,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[r] = this.weekdays(n, "").toLocaleLowerCase();
  return s ? t === "dddd" ? (a = Y.call(this._weekdaysParse, i), a !== -1 ? a : null) : t === "ddd" ? (a = Y.call(this._shortWeekdaysParse, i), a !== -1 ? a : null) : (a = Y.call(this._minWeekdaysParse, i), a !== -1 ? a : null) : t === "dddd" ? (a = Y.call(this._weekdaysParse, i), a !== -1 || (a = Y.call(this._shortWeekdaysParse, i), a !== -1) ? a : (a = Y.call(this._minWeekdaysParse, i), a !== -1 ? a : null)) : t === "ddd" ? (a = Y.call(this._shortWeekdaysParse, i), a !== -1 || (a = Y.call(this._weekdaysParse, i), a !== -1) ? a : (a = Y.call(this._minWeekdaysParse, i), a !== -1 ? a : null)) : (a = Y.call(this._minWeekdaysParse, i), a !== -1 || (a = Y.call(this._weekdaysParse, i), a !== -1) ? a : (a = Y.call(this._shortWeekdaysParse, i), a !== -1 ? a : null));
}
function Ja(e, t, s) {
  var r, a, n;
  if (this._weekdaysParseExact)
    return Za.call(this, e, t, s);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), r = 0; r < 7; r++) {
    if (a = re([2e3, 1]).day(r), s && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp(
      "^" + this.weekdays(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[r] || (n = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[r] = new RegExp(n.replace(".", ""), "i")), s && t === "dddd" && this._fullWeekdaysParse[r].test(e))
      return r;
    if (s && t === "ddd" && this._shortWeekdaysParse[r].test(e))
      return r;
    if (s && t === "dd" && this._minWeekdaysParse[r].test(e))
      return r;
    if (!s && this._weekdaysParse[r].test(e))
      return r;
  }
}
function Qa(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = ja(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Ka(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Xa(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = Ua(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function en(e) {
  return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || qt.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (p(this, "_weekdaysRegex") || (this._weekdaysRegex = Va), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function tn(e) {
  return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || qt.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (p(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = qa), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function sn(e) {
  return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || qt.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (p(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ha), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function qt() {
  function e(S, E) {
    return E.length - S.length;
  }
  var t = [], s = [], r = [], a = [], n, i, o, u, h;
  for (n = 0; n < 7; n++)
    i = re([2e3, 1]).day(n), o = $(this.weekdaysMin(i, "")), u = $(this.weekdaysShort(i, "")), h = $(this.weekdays(i, "")), t.push(o), s.push(u), r.push(h), a.push(o), a.push(u), a.push(h);
  t.sort(e), s.sort(e), r.sort(e), a.sort(e), this._weekdaysRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function Ht() {
  return this.hours() % 12 || 12;
}
function rn() {
  return this.hours() || 24;
}
f("H", ["HH", 2], 0, "hour");
f("h", ["hh", 2], 0, Ht);
f("k", ["kk", 2], 0, rn);
f("hmm", 0, 0, function() {
  return "" + Ht.apply(this) + se(this.minutes(), 2);
});
f("hmmss", 0, 0, function() {
  return "" + Ht.apply(this) + se(this.minutes(), 2) + se(this.seconds(), 2);
});
f("Hmm", 0, 0, function() {
  return "" + this.hours() + se(this.minutes(), 2);
});
f("Hmmss", 0, 0, function() {
  return "" + this.hours() + se(this.minutes(), 2) + se(this.seconds(), 2);
});
function js(e, t) {
  f(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
js("a", !0);
js("A", !1);
L("hour", "h");
C("hour", 13);
function Us(e, t) {
  return t._meridiemParse;
}
c("a", Us);
c("A", Us);
c("H", k);
c("h", k);
c("k", k);
c("HH", k, q);
c("hh", k, q);
c("kk", k, q);
c("hmm", Ts);
c("hmmss", Fs);
c("Hmm", Ts);
c("Hmmss", Fs);
b(["H", "HH"], P);
b(["k", "kk"], function(e, t, s) {
  var r = y(e);
  t[P] = r === 24 ? 0 : r;
});
b(["a", "A"], function(e, t, s) {
  s._isPm = s._locale.isPM(e), s._meridiem = e;
});
b(["h", "hh"], function(e, t, s) {
  t[P] = y(e), m(s).bigHour = !0;
});
b("hmm", function(e, t, s) {
  var r = e.length - 2;
  t[P] = y(e.substr(0, r)), t[B] = y(e.substr(r)), m(s).bigHour = !0;
});
b("hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[P] = y(e.substr(0, r)), t[B] = y(e.substr(r, 2)), t[ue] = y(e.substr(a)), m(s).bigHour = !0;
});
b("Hmm", function(e, t, s) {
  var r = e.length - 2;
  t[P] = y(e.substr(0, r)), t[B] = y(e.substr(r));
});
b("Hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[P] = y(e.substr(0, r)), t[B] = y(e.substr(r, 2)), t[ue] = y(e.substr(a));
});
function an(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var nn = /[ap]\.?m?\.?/i, on = We("Hours", !0);
function ln(e, t, s) {
  return e > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
}
var As = {
  calendar: Jr,
  longDateFormat: ea,
  invalidDate: sa,
  ordinal: aa,
  dayOfMonthOrdinalParse: na,
  relativeTime: oa,
  months: Sa,
  monthsShort: Ps,
  week: Ra,
  weekdays: Aa,
  weekdaysMin: $a,
  weekdaysShort: Is,
  meridiemParse: nn
}, O = {}, Le = {}, Ve;
function un(e, t) {
  var s, r = Math.min(e.length, t.length);
  for (s = 0; s < r; s += 1)
    if (e[s] !== t[s])
      return s;
  return r;
}
function os(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function dn(e) {
  for (var t = 0, s, r, a, n; t < e.length; ) {
    for (n = os(e[t]).split("-"), s = n.length, r = os(e[t + 1]), r = r ? r.split("-") : null; s > 0; ) {
      if (a = mt(n.slice(0, s).join("-")), a)
        return a;
      if (r && r.length >= s && un(n, r) >= s - 1)
        break;
      s--;
    }
    t++;
  }
  return Ve;
}
function cn(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function mt(e) {
  var t = null, s;
  if (O[e] === void 0 && typeof module < "u" && module && module.exports && cn(e))
    try {
      t = Ve._abbr, s = require, s("./locale/" + e), we(t);
    } catch {
      O[e] = null;
    }
  return O[e];
}
function we(e, t) {
  var s;
  return e && (I(t) ? s = he(e) : s = zt(e, t), s ? Ve = s : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), Ve._abbr;
}
function zt(e, t) {
  if (t !== null) {
    var s, r = As;
    if (t.abbr = e, O[e] != null)
      ks(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), r = O[e]._config;
    else if (t.parentLocale != null)
      if (O[t.parentLocale] != null)
        r = O[t.parentLocale]._config;
      else if (s = mt(t.parentLocale), s != null)
        r = s._config;
      else
        return Le[t.parentLocale] || (Le[t.parentLocale] = []), Le[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return O[e] = new It(Dt(r, t)), Le[e] && Le[e].forEach(function(a) {
      zt(a.name, a.config);
    }), we(e), O[e];
  } else
    return delete O[e], null;
}
function hn(e, t) {
  if (t != null) {
    var s, r, a = As;
    O[e] != null && O[e].parentLocale != null ? O[e].set(Dt(O[e]._config, t)) : (r = mt(e), r != null && (a = r._config), t = Dt(a, t), r == null && (t.abbr = e), s = new It(t), s.parentLocale = O[e], O[e] = s), we(e);
  } else
    O[e] != null && (O[e].parentLocale != null ? (O[e] = O[e].parentLocale, e === we() && we(e)) : O[e] != null && delete O[e]);
  return O[e];
}
function he(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return Ve;
  if (!J(e)) {
    if (t = mt(e), t)
      return t;
    e = [e];
  }
  return dn(e);
}
function fn() {
  return Yt(O);
}
function Gt(e) {
  var t, s = e._a;
  return s && m(e).overflow === -2 && (t = s[le] < 0 || s[le] > 11 ? le : s[ee] < 1 || s[ee] > ft(s[N], s[le]) ? ee : s[P] < 0 || s[P] > 24 || s[P] === 24 && (s[B] !== 0 || s[ue] !== 0 || s[ve] !== 0) ? P : s[B] < 0 || s[B] > 59 ? B : s[ue] < 0 || s[ue] > 59 ? ue : s[ve] < 0 || s[ve] > 999 ? ve : -1, m(e)._overflowDayOfYear && (t < N || t > ee) && (t = ee), m(e)._overflowWeeks && t === -1 && (t = pa), m(e)._overflowWeekday && t === -1 && (t = wa), m(e).overflow = t), e;
}
var mn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, yn = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, _n = /Z|[+-]\d\d(?::?\d\d)?/, Je = [
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
], gn = /^\/?Date\((-?\d+)/i, pn = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, wn = {
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
function $s(e) {
  var t, s, r = e._i, a = mn.exec(r) || yn.exec(r), n, i, o, u, h = Je.length, S = bt.length;
  if (a) {
    for (m(e).iso = !0, t = 0, s = h; t < s; t++)
      if (Je[t][1].exec(a[1])) {
        i = Je[t][0], n = Je[t][2] !== !1;
        break;
      }
    if (i == null) {
      e._isValid = !1;
      return;
    }
    if (a[3]) {
      for (t = 0, s = S; t < s; t++)
        if (bt[t][1].exec(a[3])) {
          o = (a[2] || " ") + bt[t][0];
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
      if (_n.exec(a[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = i + (o || "") + (u || ""), Zt(e);
  } else
    e._isValid = !1;
}
function bn(e, t, s, r, a, n) {
  var i = [
    Sn(e),
    Ps.indexOf(t),
    parseInt(s, 10),
    parseInt(r, 10),
    parseInt(a, 10)
  ];
  return n && i.push(parseInt(n, 10)), i;
}
function Sn(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function vn(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function kn(e, t, s) {
  if (e) {
    var r = Is.indexOf(e), a = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (r !== a)
      return m(s).weekdayMismatch = !0, s._isValid = !1, !1;
  }
  return !0;
}
function On(e, t, s) {
  if (e)
    return wn[e];
  if (t)
    return 0;
  var r = parseInt(s, 10), a = r % 100, n = (r - a) / 100;
  return n * 60 + a;
}
function Vs(e) {
  var t = pn.exec(vn(e._i)), s;
  if (t) {
    if (s = bn(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !kn(t[1], s, e))
      return;
    e._a = s, e._tzm = On(t[8], t[9], t[10]), e._d = Ae.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), m(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function Mn(e) {
  var t = gn.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if ($s(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Vs(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : d.createFromInputFallback(e);
}
d.createFromInputFallback = z(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Ye(e, t, s) {
  return e ?? t ?? s;
}
function Dn(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Bt(e) {
  var t, s, r = [], a, n, i;
  if (!e._d) {
    for (a = Dn(e), e._w && e._a[ee] == null && e._a[le] == null && Yn(e), e._dayOfYear != null && (i = Ye(e._a[N], a[N]), (e._dayOfYear > Ie(i) || e._dayOfYear === 0) && (m(e)._overflowDayOfYear = !0), s = Ae(i, 0, e._dayOfYear), e._a[le] = s.getUTCMonth(), e._a[ee] = s.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = r[t] = a[t];
    for (; t < 7; t++)
      e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[P] === 24 && e._a[B] === 0 && e._a[ue] === 0 && e._a[ve] === 0 && (e._nextDay = !0, e._a[P] = 0), e._d = (e._useUTC ? Ae : Wa).apply(
      null,
      r
    ), n = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[P] = 24), e._w && typeof e._w.d < "u" && e._w.d !== n && (m(e).weekdayMismatch = !0);
  }
}
function Yn(e) {
  var t, s, r, a, n, i, o, u, h;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (n = 1, i = 4, s = Ye(
    t.GG,
    e._a[N],
    $e(v(), 1, 4).year
  ), r = Ye(t.W, 1), a = Ye(t.E, 1), (a < 1 || a > 7) && (u = !0)) : (n = e._locale._week.dow, i = e._locale._week.doy, h = $e(v(), n, i), s = Ye(t.gg, e._a[N], h.year), r = Ye(t.w, h.week), t.d != null ? (a = t.d, (a < 0 || a > 6) && (u = !0)) : t.e != null ? (a = t.e + n, (t.e < 0 || t.e > 6) && (u = !0)) : a = n), r < 1 || r > de(s, n, i) ? m(e)._overflowWeeks = !0 : u != null ? m(e)._overflowWeekday = !0 : (o = Es(s, r, a, n, i), e._a[N] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Zt(e) {
  if (e._f === d.ISO_8601) {
    $s(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    Vs(e);
    return;
  }
  e._a = [], m(e).empty = !0;
  var t = "" + e._i, s, r, a, n, i, o = t.length, u = 0, h, S;
  for (a = Os(e._f, e._locale).match(jt) || [], S = a.length, s = 0; s < S; s++)
    n = a[s], r = (t.match(ya(n, e)) || [])[0], r && (i = t.substr(0, t.indexOf(r)), i.length > 0 && m(e).unusedInput.push(i), t = t.slice(
      t.indexOf(r) + r.length
    ), u += r.length), Te[n] ? (r ? m(e).empty = !1 : m(e).unusedTokens.push(n), ga(n, r, e)) : e._strict && !r && m(e).unusedTokens.push(n);
  m(e).charsLeftOver = o - u, t.length > 0 && m(e).unusedInput.push(t), e._a[P] <= 12 && m(e).bigHour === !0 && e._a[P] > 0 && (m(e).bigHour = void 0), m(e).parsedDateParts = e._a.slice(0), m(e).meridiem = e._meridiem, e._a[P] = xn(
    e._locale,
    e._a[P],
    e._meridiem
  ), h = m(e).era, h !== null && (e._a[N] = e._locale.erasConvertYear(h, e._a[N])), Bt(e), Gt(e);
}
function xn(e, t, s) {
  var r;
  return s == null ? t : e.meridiemHour != null ? e.meridiemHour(t, s) : (e.isPM != null && (r = e.isPM(s), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function Tn(e) {
  var t, s, r, a, n, i, o = !1, u = e._f.length;
  if (u === 0) {
    m(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (a = 0; a < u; a++)
    n = 0, i = !1, t = Et({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[a], Zt(t), Ct(t) && (i = !0), n += m(t).charsLeftOver, n += m(t).unusedTokens.length * 10, m(t).score = n, o ? n < r && (r = n, s = t) : (r == null || n < r || i) && (r = n, s = t, i && (o = !0));
  _e(e, s || t);
}
function Fn(e) {
  if (!e._d) {
    var t = Ut(e._i), s = t.day === void 0 ? t.date : t.day;
    e._a = Ss(
      [t.year, t.month, s, t.hour, t.minute, t.second, t.millisecond],
      function(r) {
        return r && parseInt(r, 10);
      }
    ), Bt(e);
  }
}
function Pn(e) {
  var t = new ze(Gt(qs(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function qs(e) {
  var t = e._i, s = e._f;
  return e._locale = e._locale || he(e._l), t === null || s === void 0 && t === "" ? it({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), Q(t) ? new ze(Gt(t)) : (He(t) ? e._d = t : J(s) ? Tn(e) : s ? Zt(e) : Wn(e), Ct(e) || (e._d = null), e));
}
function Wn(e) {
  var t = e._i;
  I(t) ? e._d = new Date(d.now()) : He(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? Mn(e) : J(t) ? (e._a = Ss(t.slice(0), function(s) {
    return parseInt(s, 10);
  }), Bt(e)) : ke(t) ? Fn(e) : ce(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function Hs(e, t, s, r, a) {
  var n = {};
  return (t === !0 || t === !1) && (r = t, t = void 0), (s === !0 || s === !1) && (r = s, s = void 0), (ke(e) && Lt(e) || J(e) && e.length === 0) && (e = void 0), n._isAMomentObject = !0, n._useUTC = n._isUTC = a, n._l = s, n._i = e, n._f = t, n._strict = r, Pn(n);
}
function v(e, t, s, r) {
  return Hs(e, t, s, r, !1);
}
var Nn = z(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = v.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : it();
  }
), Rn = z(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = v.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : it();
  }
);
function zs(e, t) {
  var s, r;
  if (t.length === 1 && J(t[0]) && (t = t[0]), !t.length)
    return v();
  for (s = t[0], r = 1; r < t.length; ++r)
    (!t[r].isValid() || t[r][e](s)) && (s = t[r]);
  return s;
}
function Ln() {
  var e = [].slice.call(arguments, 0);
  return zs("isBefore", e);
}
function Cn() {
  var e = [].slice.call(arguments, 0);
  return zs("isAfter", e);
}
var En = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Ce = [
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
function In(e) {
  var t, s = !1, r, a = Ce.length;
  for (t in e)
    if (p(e, t) && !(Y.call(Ce, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (r = 0; r < a; ++r)
    if (e[Ce[r]]) {
      if (s)
        return !1;
      parseFloat(e[Ce[r]]) !== y(e[Ce[r]]) && (s = !0);
    }
  return !0;
}
function jn() {
  return this._isValid;
}
function Un() {
  return X(NaN);
}
function yt(e) {
  var t = Ut(e), s = t.year || 0, r = t.quarter || 0, a = t.month || 0, n = t.week || t.isoWeek || 0, i = t.day || 0, o = t.hour || 0, u = t.minute || 0, h = t.second || 0, S = t.millisecond || 0;
  this._isValid = In(t), this._milliseconds = +S + h * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +i + n * 7, this._months = +a + r * 3 + s * 12, this._data = {}, this._locale = he(), this._bubble();
}
function Ke(e) {
  return e instanceof yt;
}
function Tt(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function An(e, t, s) {
  var r = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), n = 0, i;
  for (i = 0; i < r; i++)
    (s && e[i] !== t[i] || !s && y(e[i]) !== y(t[i])) && n++;
  return n + a;
}
function Gs(e, t) {
  f(e, 0, 0, function() {
    var s = this.utcOffset(), r = "+";
    return s < 0 && (s = -s, r = "-"), r + se(~~(s / 60), 2) + t + se(~~s % 60, 2);
  });
}
Gs("Z", ":");
Gs("ZZ", "");
c("Z", ht);
c("ZZ", ht);
b(["Z", "ZZ"], function(e, t, s) {
  s._useUTC = !0, s._tzm = Jt(ht, e);
});
var $n = /([\+\-]|\d\d)/gi;
function Jt(e, t) {
  var s = (t || "").match(e), r, a, n;
  return s === null ? null : (r = s[s.length - 1] || [], a = (r + "").match($n) || ["-", 0, 0], n = +(a[1] * 60) + y(a[2]), n === 0 ? 0 : a[0] === "+" ? n : -n);
}
function Qt(e, t) {
  var s, r;
  return t._isUTC ? (s = t.clone(), r = (Q(e) || He(e) ? e.valueOf() : v(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + r), d.updateOffset(s, !1), s) : v(e).local();
}
function Ft(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function Vn(e, t, s) {
  var r = this._offset || 0, a;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Jt(ht, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !s && (e = e * 60);
    return !this._isUTC && t && (a = Ft(this)), this._offset = e, this._isUTC = !0, a != null && this.add(a, "m"), r !== e && (!t || this._changeInProgress ? Js(
      this,
      X(e - r, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? r : Ft(this);
}
function qn(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Hn(e) {
  return this.utcOffset(0, e);
}
function zn(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Ft(this), "m")), this;
}
function Gn() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Jt(fa, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Bn(e) {
  return this.isValid() ? (e = e ? v(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Zn() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Jn() {
  if (!I(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Et(e, this), e = qs(e), e._a ? (t = e._isUTC ? re(e._a) : v(e._a), this._isDSTShifted = this.isValid() && An(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Qn() {
  return this.isValid() ? !this._isUTC : !1;
}
function Kn() {
  return this.isValid() ? this._isUTC : !1;
}
function Bs() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Xn = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, ei = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function X(e, t) {
  var s = e, r = null, a, n, i;
  return Ke(e) ? s = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ce(e) || !isNaN(+e) ? (s = {}, t ? s[t] = +e : s.milliseconds = +e) : (r = Xn.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: 0,
    d: y(r[ee]) * a,
    h: y(r[P]) * a,
    m: y(r[B]) * a,
    s: y(r[ue]) * a,
    ms: y(Tt(r[ve] * 1e3)) * a
    // the millisecond decimal point is included in the match
  }) : (r = ei.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: be(r[2], a),
    M: be(r[3], a),
    w: be(r[4], a),
    d: be(r[5], a),
    h: be(r[6], a),
    m: be(r[7], a),
    s: be(r[8], a)
  }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (i = ti(
    v(s.from),
    v(s.to)
  ), s = {}, s.ms = i.milliseconds, s.M = i.months), n = new yt(s), Ke(e) && p(e, "_locale") && (n._locale = e._locale), Ke(e) && p(e, "_isValid") && (n._isValid = e._isValid), n;
}
X.fn = yt.prototype;
X.invalid = Un;
function be(e, t) {
  var s = e && parseFloat(e.replace(",", "."));
  return (isNaN(s) ? 0 : s) * t;
}
function ls(e, t) {
  var s = {};
  return s.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(s.months, "M").isAfter(t) && --s.months, s.milliseconds = +t - +e.clone().add(s.months, "M"), s;
}
function ti(e, t) {
  var s;
  return e.isValid() && t.isValid() ? (t = Qt(t, e), e.isBefore(t) ? s = ls(e, t) : (s = ls(t, e), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
}
function Zs(e, t) {
  return function(s, r) {
    var a, n;
    return r !== null && !isNaN(+r) && (ks(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), n = s, s = r, r = n), a = X(s, r), Js(this, a, e), this;
  };
}
function Js(e, t, s, r) {
  var a = t._milliseconds, n = Tt(t._days), i = Tt(t._months);
  e.isValid() && (r = r ?? !0, i && Ns(e, et(e, "Month") + i * s), n && Ds(e, "Date", et(e, "Date") + n * s), a && e._d.setTime(e._d.valueOf() + a * s), r && d.updateOffset(e, n || i));
}
var si = Zs(1, "add"), ri = Zs(-1, "subtract");
function Qs(e) {
  return typeof e == "string" || e instanceof String;
}
function ai(e) {
  return Q(e) || He(e) || Qs(e) || ce(e) || ii(e) || ni(e) || e === null || e === void 0;
}
function ni(e) {
  var t = ke(e) && !Lt(e), s = !1, r = [
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
  ], a, n, i = r.length;
  for (a = 0; a < i; a += 1)
    n = r[a], s = s || p(e, n);
  return t && s;
}
function ii(e) {
  var t = J(e), s = !1;
  return t && (s = e.filter(function(r) {
    return !ce(r) && Qs(e);
  }).length === 0), t && s;
}
function oi(e) {
  var t = ke(e) && !Lt(e), s = !1, r = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], a, n;
  for (a = 0; a < r.length; a += 1)
    n = r[a], s = s || p(e, n);
  return t && s;
}
function li(e, t) {
  var s = e.diff(t, "days", !0);
  return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
}
function ui(e, t) {
  arguments.length === 1 && (arguments[0] ? ai(arguments[0]) ? (e = arguments[0], t = void 0) : oi(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var s = e || v(), r = Qt(s, this).startOf("day"), a = d.calendarFormat(this, r) || "sameElse", n = t && (ae(t[a]) ? t[a].call(this, s) : t[a]);
  return this.format(
    n || this.localeData().calendar(a, this, v(s))
  );
}
function di() {
  return new ze(this);
}
function ci(e, t) {
  var s = Q(e) ? e : v(e);
  return this.isValid() && s.isValid() ? (t = G(t) || "millisecond", t === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function hi(e, t) {
  var s = Q(e) ? e : v(e);
  return this.isValid() && s.isValid() ? (t = G(t) || "millisecond", t === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(t).valueOf() < s.valueOf()) : !1;
}
function fi(e, t, s, r) {
  var a = Q(e) ? e : v(e), n = Q(t) ? t : v(t);
  return this.isValid() && a.isValid() && n.isValid() ? (r = r || "()", (r[0] === "(" ? this.isAfter(a, s) : !this.isBefore(a, s)) && (r[1] === ")" ? this.isBefore(n, s) : !this.isAfter(n, s))) : !1;
}
function mi(e, t) {
  var s = Q(e) ? e : v(e), r;
  return this.isValid() && s.isValid() ? (t = G(t) || "millisecond", t === "millisecond" ? this.valueOf() === s.valueOf() : (r = s.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf())) : !1;
}
function yi(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function _i(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function gi(e, t, s) {
  var r, a, n;
  if (!this.isValid())
    return NaN;
  if (r = Qt(e, this), !r.isValid())
    return NaN;
  switch (a = (r.utcOffset() - this.utcOffset()) * 6e4, t = G(t), t) {
    case "year":
      n = Xe(this, r) / 12;
      break;
    case "month":
      n = Xe(this, r);
      break;
    case "quarter":
      n = Xe(this, r) / 3;
      break;
    case "second":
      n = (this - r) / 1e3;
      break;
    case "minute":
      n = (this - r) / 6e4;
      break;
    case "hour":
      n = (this - r) / 36e5;
      break;
    case "day":
      n = (this - r - a) / 864e5;
      break;
    case "week":
      n = (this - r - a) / 6048e5;
      break;
    default:
      n = this - r;
  }
  return s ? n : H(n);
}
function Xe(e, t) {
  if (e.date() < t.date())
    return -Xe(t, e);
  var s = (t.year() - e.year()) * 12 + (t.month() - e.month()), r = e.clone().add(s, "months"), a, n;
  return t - r < 0 ? (a = e.clone().add(s - 1, "months"), n = (t - r) / (r - a)) : (a = e.clone().add(s + 1, "months"), n = (t - r) / (a - r)), -(s + n) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function pi() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function wi(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, s = t ? this.clone().utc() : this;
  return s.year() < 0 || s.year() > 9999 ? Qe(
    s,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ae(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Qe(s, "Z")) : Qe(
    s,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function bi() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", s, r, a, n;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), s = "[" + e + '("]', r = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", a = "-MM-DD[T]HH:mm:ss.SSS", n = t + '[")]', this.format(s + r + a + n);
}
function Si(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = Qe(this, e);
  return this.localeData().postformat(t);
}
function vi(e, t) {
  return this.isValid() && (Q(e) && e.isValid() || v(e).isValid()) ? X({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function ki(e) {
  return this.from(v(), e);
}
function Oi(e, t) {
  return this.isValid() && (Q(e) && e.isValid() || v(e).isValid()) ? X({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Mi(e) {
  return this.to(v(), e);
}
function Ks(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = he(e), t != null && (this._locale = t), this);
}
var Xs = z(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function er() {
  return this._locale;
}
var rt = 1e3, Fe = 60 * rt, at = 60 * Fe, tr = (365 * 400 + 97) * 24 * at;
function Pe(e, t) {
  return (e % t + t) % t;
}
function sr(e, t, s) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, s) - tr : new Date(e, t, s).valueOf();
}
function rr(e, t, s) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, s) - tr : Date.UTC(e, t, s);
}
function Di(e) {
  var t, s;
  if (e = G(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? rr : sr, e) {
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
      t = this._d.valueOf(), t -= Pe(
        t + (this._isUTC ? 0 : this.utcOffset() * Fe),
        at
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Pe(t, Fe);
      break;
    case "second":
      t = this._d.valueOf(), t -= Pe(t, rt);
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function Yi(e) {
  var t, s;
  if (e = G(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? rr : sr, e) {
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
      t = this._d.valueOf(), t += at - Pe(
        t + (this._isUTC ? 0 : this.utcOffset() * Fe),
        at
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Fe - Pe(t, Fe) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += rt - Pe(t, rt) - 1;
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function xi() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Ti() {
  return Math.floor(this.valueOf() / 1e3);
}
function Fi() {
  return new Date(this.valueOf());
}
function Pi() {
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
function Wi() {
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
function Ni() {
  return this.isValid() ? this.toISOString() : null;
}
function Ri() {
  return Ct(this);
}
function Li() {
  return _e({}, m(this));
}
function Ci() {
  return m(this).overflow;
}
function Ei() {
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
c("NNNN", Bi);
c("NNNNN", Zi);
b(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, s, r) {
    var a = s._locale.erasParse(e, r, s._strict);
    a ? m(s).era = a : m(s).invalidEra = e;
  }
);
c("y", Ne);
c("yy", Ne);
c("yyy", Ne);
c("yyyy", Ne);
c("yo", Ji);
b(["y", "yy", "yyy", "yyyy"], N);
b(["yo"], function(e, t, s, r) {
  var a;
  s._locale._eraYearOrdinalRegex && (a = e.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? t[N] = s._locale.eraYearOrdinalParse(e, a) : t[N] = parseInt(e, 10);
});
function Ii(e, t) {
  var s, r, a, n = this._eras || he("en")._eras;
  for (s = 0, r = n.length; s < r; ++s) {
    switch (typeof n[s].since) {
      case "string":
        a = d(n[s].since).startOf("day"), n[s].since = a.valueOf();
        break;
    }
    switch (typeof n[s].until) {
      case "undefined":
        n[s].until = 1 / 0;
        break;
      case "string":
        a = d(n[s].until).startOf("day").valueOf(), n[s].until = a.valueOf();
        break;
    }
  }
  return n;
}
function ji(e, t, s) {
  var r, a, n = this.eras(), i, o, u;
  for (e = e.toUpperCase(), r = 0, a = n.length; r < a; ++r)
    if (i = n[r].name.toUpperCase(), o = n[r].abbr.toUpperCase(), u = n[r].narrow.toUpperCase(), s)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return n[r];
          break;
        case "NNNN":
          if (i === e)
            return n[r];
          break;
        case "NNNNN":
          if (u === e)
            return n[r];
          break;
      }
    else if ([i, o, u].indexOf(e) >= 0)
      return n[r];
}
function Ui(e, t) {
  var s = e.since <= e.until ? 1 : -1;
  return t === void 0 ? d(e.since).year() : d(e.since).year() + (t - e.offset) * s;
}
function Ai() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].name;
  return "";
}
function $i() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].narrow;
  return "";
}
function Vi() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].abbr;
  return "";
}
function qi() {
  var e, t, s, r, a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (s = a[e].since <= a[e].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), a[e].since <= r && r <= a[e].until || a[e].until <= r && r <= a[e].since)
      return (this.year() - d(a[e].since).year()) * s + a[e].offset;
  return this.year();
}
function Hi(e) {
  return p(this, "_erasNameRegex") || Xt.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function zi(e) {
  return p(this, "_erasAbbrRegex") || Xt.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Gi(e) {
  return p(this, "_erasNarrowRegex") || Xt.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Kt(e, t) {
  return t.erasAbbrRegex(e);
}
function Bi(e, t) {
  return t.erasNameRegex(e);
}
function Zi(e, t) {
  return t.erasNarrowRegex(e);
}
function Ji(e, t) {
  return t._eraYearOrdinalRegex || Ne;
}
function Xt() {
  var e = [], t = [], s = [], r = [], a, n, i = this.eras();
  for (a = 0, n = i.length; a < n; ++a)
    t.push($(i[a].name)), e.push($(i[a].abbr)), s.push($(i[a].narrow)), r.push($(i[a].name)), r.push($(i[a].abbr)), r.push($(i[a].narrow));
  this._erasRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + s.join("|") + ")",
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
L("weekYear", "gg");
L("isoWeekYear", "GG");
C("weekYear", 1);
C("isoWeekYear", 1);
c("G", ct);
c("g", ct);
c("GG", k, q);
c("gg", k, q);
c("GGGG", $t, At);
c("gggg", $t, At);
c("GGGGG", dt, lt);
c("ggggg", dt, lt);
Be(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, s, r) {
    t[r.substr(0, 2)] = y(e);
  }
);
Be(["gg", "GG"], function(e, t, s, r) {
  t[r] = d.parseTwoDigitYear(e);
});
function Qi(e) {
  return ar.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Ki(e) {
  return ar.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Xi() {
  return de(this.year(), 1, 4);
}
function eo() {
  return de(this.isoWeekYear(), 1, 4);
}
function to() {
  var e = this.localeData()._week;
  return de(this.year(), e.dow, e.doy);
}
function so() {
  var e = this.localeData()._week;
  return de(this.weekYear(), e.dow, e.doy);
}
function ar(e, t, s, r, a) {
  var n;
  return e == null ? $e(this, r, a).year : (n = de(e, r, a), t > n && (t = n), ro.call(this, e, t, s, r, a));
}
function ro(e, t, s, r, a) {
  var n = Es(e, t, s, r, a), i = Ae(n.year, 0, n.dayOfYear);
  return this.year(i.getUTCFullYear()), this.month(i.getUTCMonth()), this.date(i.getUTCDate()), this;
}
f("Q", 0, "Qo", "quarter");
L("quarter", "Q");
C("quarter", 7);
c("Q", Ys);
b("Q", function(e, t) {
  t[le] = (y(e) - 1) * 3;
});
function ao(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
f("D", ["DD", 2], "Do", "date");
L("date", "D");
C("date", 9);
c("D", k);
c("DD", k, q);
c("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
b(["D", "DD"], ee);
b("Do", function(e, t) {
  t[ee] = y(e.match(k)[0]);
});
var nr = We("Date", !0);
f("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
L("dayOfYear", "DDD");
C("dayOfYear", 4);
c("DDD", ut);
c("DDDD", xs);
b(["DDD", "DDDD"], function(e, t, s) {
  s._dayOfYear = y(e);
});
function no(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
f("m", ["mm", 2], 0, "minute");
L("minute", "m");
C("minute", 14);
c("m", k);
c("mm", k, q);
b(["m", "mm"], B);
var io = We("Minutes", !1);
f("s", ["ss", 2], 0, "second");
L("second", "s");
C("second", 15);
c("s", k);
c("ss", k, q);
b(["s", "ss"], ue);
var oo = We("Seconds", !1);
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
L("millisecond", "ms");
C("millisecond", 16);
c("S", ut, Ys);
c("SS", ut, q);
c("SSS", ut, xs);
var ge, ir;
for (ge = "SSSS"; ge.length <= 9; ge += "S")
  c(ge, Ne);
function lo(e, t) {
  t[ve] = y(("0." + e) * 1e3);
}
for (ge = "S"; ge.length <= 9; ge += "S")
  b(ge, lo);
ir = We("Milliseconds", !1);
f("z", 0, 0, "zoneAbbr");
f("zz", 0, 0, "zoneName");
function uo() {
  return this._isUTC ? "UTC" : "";
}
function co() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var l = ze.prototype;
l.add = si;
l.calendar = ui;
l.clone = di;
l.diff = gi;
l.endOf = Yi;
l.format = Si;
l.from = vi;
l.fromNow = ki;
l.to = Oi;
l.toNow = Mi;
l.get = ca;
l.invalidAt = Ci;
l.isAfter = ci;
l.isBefore = hi;
l.isBetween = fi;
l.isSame = mi;
l.isSameOrAfter = yi;
l.isSameOrBefore = _i;
l.isValid = Ri;
l.lang = Xs;
l.locale = Ks;
l.localeData = er;
l.max = Rn;
l.min = Nn;
l.parsingFlags = Li;
l.set = ha;
l.startOf = Di;
l.subtract = ri;
l.toArray = Pi;
l.toObject = Wi;
l.toDate = Fi;
l.toISOString = wi;
l.inspect = bi;
typeof Symbol < "u" && Symbol.for != null && (l[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
l.toJSON = Ni;
l.toString = pi;
l.unix = Ti;
l.valueOf = xi;
l.creationData = Ei;
l.eraName = Ai;
l.eraNarrow = $i;
l.eraAbbr = Vi;
l.eraYear = qi;
l.year = Cs;
l.isLeapYear = Pa;
l.weekYear = Qi;
l.isoWeekYear = Ki;
l.quarter = l.quarters = ao;
l.month = Rs;
l.daysInMonth = xa;
l.week = l.weeks = Ea;
l.isoWeek = l.isoWeeks = Ia;
l.weeksInYear = to;
l.weeksInWeekYear = so;
l.isoWeeksInYear = Xi;
l.isoWeeksInISOWeekYear = eo;
l.date = nr;
l.day = l.days = Qa;
l.weekday = Ka;
l.isoWeekday = Xa;
l.dayOfYear = no;
l.hour = l.hours = on;
l.minute = l.minutes = io;
l.second = l.seconds = oo;
l.millisecond = l.milliseconds = ir;
l.utcOffset = Vn;
l.utc = Hn;
l.local = zn;
l.parseZone = Gn;
l.hasAlignedHourOffset = Bn;
l.isDST = Zn;
l.isLocal = Qn;
l.isUtcOffset = Kn;
l.isUtc = Bs;
l.isUTC = Bs;
l.zoneAbbr = uo;
l.zoneName = co;
l.dates = z(
  "dates accessor is deprecated. Use date instead.",
  nr
);
l.months = z(
  "months accessor is deprecated. Use month instead",
  Rs
);
l.years = z(
  "years accessor is deprecated. Use year instead",
  Cs
);
l.zone = z(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  qn
);
l.isDSTShifted = z(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Jn
);
function ho(e) {
  return v(e * 1e3);
}
function fo() {
  return v.apply(null, arguments).parseZone();
}
function or(e) {
  return e;
}
var w = It.prototype;
w.calendar = Qr;
w.longDateFormat = ta;
w.invalidDate = ra;
w.ordinal = ia;
w.preparse = or;
w.postformat = or;
w.relativeTime = la;
w.pastFuture = ua;
w.set = Zr;
w.eras = Ii;
w.erasParse = ji;
w.erasConvertYear = Ui;
w.erasAbbrRegex = zi;
w.erasNameRegex = Hi;
w.erasNarrowRegex = Gi;
w.months = Oa;
w.monthsShort = Ma;
w.monthsParse = Ya;
w.monthsRegex = Fa;
w.monthsShortRegex = Ta;
w.week = Na;
w.firstDayOfYear = Ca;
w.firstDayOfWeek = La;
w.weekdays = za;
w.weekdaysMin = Ba;
w.weekdaysShort = Ga;
w.weekdaysParse = Ja;
w.weekdaysRegex = en;
w.weekdaysShortRegex = tn;
w.weekdaysMinRegex = sn;
w.isPM = an;
w.meridiem = ln;
function nt(e, t, s, r) {
  var a = he(), n = re().set(r, t);
  return a[s](n, e);
}
function lr(e, t, s) {
  if (ce(e) && (t = e, e = void 0), e = e || "", t != null)
    return nt(e, t, s, "month");
  var r, a = [];
  for (r = 0; r < 12; r++)
    a[r] = nt(e, r, s, "month");
  return a;
}
function es(e, t, s, r) {
  typeof e == "boolean" ? (ce(t) && (s = t, t = void 0), t = t || "") : (t = e, s = t, e = !1, ce(t) && (s = t, t = void 0), t = t || "");
  var a = he(), n = e ? a._week.dow : 0, i, o = [];
  if (s != null)
    return nt(t, (s + n) % 7, r, "day");
  for (i = 0; i < 7; i++)
    o[i] = nt(t, (i + n) % 7, r, "day");
  return o;
}
function mo(e, t) {
  return lr(e, t, "months");
}
function yo(e, t) {
  return lr(e, t, "monthsShort");
}
function _o(e, t, s) {
  return es(e, t, s, "weekdays");
}
function go(e, t, s) {
  return es(e, t, s, "weekdaysShort");
}
function po(e, t, s) {
  return es(e, t, s, "weekdaysMin");
}
we("en", {
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
    var t = e % 10, s = y(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + s;
  }
});
d.lang = z(
  "moment.lang is deprecated. Use moment.locale instead.",
  we
);
d.langData = z(
  "moment.langData is deprecated. Use moment.localeData instead.",
  he
);
var ne = Math.abs;
function wo() {
  var e = this._data;
  return this._milliseconds = ne(this._milliseconds), this._days = ne(this._days), this._months = ne(this._months), e.milliseconds = ne(e.milliseconds), e.seconds = ne(e.seconds), e.minutes = ne(e.minutes), e.hours = ne(e.hours), e.months = ne(e.months), e.years = ne(e.years), this;
}
function ur(e, t, s, r) {
  var a = X(t, s);
  return e._milliseconds += r * a._milliseconds, e._days += r * a._days, e._months += r * a._months, e._bubble();
}
function bo(e, t) {
  return ur(this, e, t, 1);
}
function So(e, t) {
  return ur(this, e, t, -1);
}
function us(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function vo() {
  var e = this._milliseconds, t = this._days, s = this._months, r = this._data, a, n, i, o, u;
  return e >= 0 && t >= 0 && s >= 0 || e <= 0 && t <= 0 && s <= 0 || (e += us(Pt(s) + t) * 864e5, t = 0, s = 0), r.milliseconds = e % 1e3, a = H(e / 1e3), r.seconds = a % 60, n = H(a / 60), r.minutes = n % 60, i = H(n / 60), r.hours = i % 24, t += H(i / 24), u = H(dr(t)), s += u, t -= us(Pt(u)), o = H(s / 12), s %= 12, r.days = t, r.months = s, r.years = o, this;
}
function dr(e) {
  return e * 4800 / 146097;
}
function Pt(e) {
  return e * 146097 / 4800;
}
function ko(e) {
  if (!this.isValid())
    return NaN;
  var t, s, r = this._milliseconds;
  if (e = G(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + r / 864e5, s = this._months + dr(t), e) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (t = this._days + Math.round(Pt(this._months)), e) {
      case "week":
        return t / 7 + r / 6048e5;
      case "day":
        return t + r / 864e5;
      case "hour":
        return t * 24 + r / 36e5;
      case "minute":
        return t * 1440 + r / 6e4;
      case "second":
        return t * 86400 + r / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + r;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function Oo() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + y(this._months / 12) * 31536e6 : NaN;
}
function fe(e) {
  return function() {
    return this.as(e);
  };
}
var Mo = fe("ms"), Do = fe("s"), Yo = fe("m"), xo = fe("h"), To = fe("d"), Fo = fe("w"), Po = fe("M"), Wo = fe("Q"), No = fe("y");
function Ro() {
  return X(this);
}
function Lo(e) {
  return e = G(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Me(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Co = Me("milliseconds"), Eo = Me("seconds"), Io = Me("minutes"), jo = Me("hours"), Uo = Me("days"), Ao = Me("months"), $o = Me("years");
function Vo() {
  return H(this.days() / 7);
}
var ie = Math.round, xe = {
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
function qo(e, t, s, r, a) {
  return a.relativeTime(t || 1, !!s, e, r);
}
function Ho(e, t, s, r) {
  var a = X(e).abs(), n = ie(a.as("s")), i = ie(a.as("m")), o = ie(a.as("h")), u = ie(a.as("d")), h = ie(a.as("M")), S = ie(a.as("w")), E = ie(a.as("y")), me = n <= s.ss && ["s", n] || n < s.s && ["ss", n] || i <= 1 && ["m"] || i < s.m && ["mm", i] || o <= 1 && ["h"] || o < s.h && ["hh", o] || u <= 1 && ["d"] || u < s.d && ["dd", u];
  return s.w != null && (me = me || S <= 1 && ["w"] || S < s.w && ["ww", S]), me = me || h <= 1 && ["M"] || h < s.M && ["MM", h] || E <= 1 && ["y"] || ["yy", E], me[2] = t, me[3] = +e > 0, me[4] = r, qo.apply(null, me);
}
function zo(e) {
  return e === void 0 ? ie : typeof e == "function" ? (ie = e, !0) : !1;
}
function Go(e, t) {
  return xe[e] === void 0 ? !1 : t === void 0 ? xe[e] : (xe[e] = t, e === "s" && (xe.ss = t - 1), !0);
}
function Bo(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var s = !1, r = xe, a, n;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (s = e), typeof t == "object" && (r = Object.assign({}, xe, t), t.s != null && t.ss == null && (r.ss = t.s - 1)), a = this.localeData(), n = Ho(this, !s, r, a), s && (n = a.pastFuture(+this, n)), a.postformat(n);
}
var St = Math.abs;
function De(e) {
  return (e > 0) - (e < 0) || +e;
}
function gt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = St(this._milliseconds) / 1e3, t = St(this._days), s = St(this._months), r, a, n, i, o = this.asSeconds(), u, h, S, E;
  return o ? (r = H(e / 60), a = H(r / 60), e %= 60, r %= 60, n = H(s / 12), s %= 12, i = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", h = De(this._months) !== De(o) ? "-" : "", S = De(this._days) !== De(o) ? "-" : "", E = De(this._milliseconds) !== De(o) ? "-" : "", u + "P" + (n ? h + n + "Y" : "") + (s ? h + s + "M" : "") + (t ? S + t + "D" : "") + (a || r || e ? "T" : "") + (a ? E + a + "H" : "") + (r ? E + r + "M" : "") + (e ? E + i + "S" : "")) : "P0D";
}
var g = yt.prototype;
g.isValid = jn;
g.abs = wo;
g.add = bo;
g.subtract = So;
g.as = ko;
g.asMilliseconds = Mo;
g.asSeconds = Do;
g.asMinutes = Yo;
g.asHours = xo;
g.asDays = To;
g.asWeeks = Fo;
g.asMonths = Po;
g.asQuarters = Wo;
g.asYears = No;
g.valueOf = Oo;
g._bubble = vo;
g.clone = Ro;
g.get = Lo;
g.milliseconds = Co;
g.seconds = Eo;
g.minutes = Io;
g.hours = jo;
g.days = Uo;
g.weeks = Vo;
g.months = Ao;
g.years = $o;
g.humanize = Bo;
g.toISOString = gt;
g.toString = gt;
g.toJSON = gt;
g.locale = Ks;
g.localeData = er;
g.toIsoString = z(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  gt
);
g.lang = Xs;
f("X", 0, 0, "unix");
f("x", 0, 0, "valueOf");
c("x", ct);
c("X", ma);
b("X", function(e, t, s) {
  s._d = new Date(parseFloat(e) * 1e3);
});
b("x", function(e, t, s) {
  s._d = new Date(y(e));
});
//! moment.js
d.version = "2.29.4";
Gr(v);
d.fn = l;
d.min = Ln;
d.max = Cn;
d.now = En;
d.utc = re;
d.unix = ho;
d.months = mo;
d.isDate = He;
d.locale = we;
d.invalid = it;
d.duration = X;
d.isMoment = Q;
d.weekdays = _o;
d.parseZone = fo;
d.localeData = he;
d.isDuration = Ke;
d.monthsShort = yo;
d.weekdaysMin = po;
d.defineLocale = zt;
d.updateLocale = hn;
d.locales = fn;
d.weekdaysShort = go;
d.normalizeUnits = G;
d.relativeTimeRounding = zo;
d.relativeTimeThreshold = Go;
d.calendarFormat = li;
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
const Se = A({
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
      Se[t] = Object.keys(e.response.data.errors).map((r) => ({
        key: r,
        message: e.response.data.errors[r][0]
      }));
    },
    get(e, t = "default") {
      const s = Se[t];
      if (!s)
        return {
          message: "",
          variant: ""
        };
      const r = s.find(
        (a) => Array.isArray(e) ? e.includes(a.key) : a.key === e
      );
      return r ? {
        message: r.message,
        variant: "danger"
      } : {
        message: "",
        variant: ""
      };
    },
    clear(e = null, t = "default") {
      if (e) {
        const s = Se[t];
        if (!s) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const r = s.findIndex((a) => a.key === e);
        s.splice(r, 1);
        return;
      }
      Se[t] = [];
    },
    all(e = "default") {
      return Se[e];
    }
  };
}
class Re {
  constructor(t = {}) {
    _(this, "errors", null);
    _(this, "errorBag", "default");
    _(this, "model", A({}));
    _(this, "form", A({}));
    _(this, "original", {});
    _(this, "states", {
      load: j.create(),
      submit: j.create()
    });
    _(this, "paths", {
      load: null,
      submit: null
    });
    return this.errors = qe(), this.errors.createBag(this.errorBag), this.setAttributes(t), this.loaded(), new Proxy(this, {
      get(s, r, a) {
        if (Reflect.has(s, r))
          return Reflect.get(s, r, a);
        if (Reflect.has(s.form, r)) {
          const n = r.split(".");
          if (n.length > 1) {
            let i = s.form;
            for (let o = 0; o < n.length; o++)
              i = i[n[o]];
            return i ?? void 0;
          }
          return Reflect.get(s.form, r);
        }
      },
      set(s, r, a, n) {
        if (Reflect.has(s, r))
          return Reflect.set(s, r, a, n);
        if (Reflect.has(s.form, r)) {
          const i = r.split(".");
          if (i.length > 1) {
            let o = s.form;
            for (let u = 0; u < i.length - 1; u++)
              i[u] in o || (o[i[u]] = {}), o = o[i[u]];
            return o[i[i.length - 1]] === void 0 ? !1 : (o[i[i.length - 1]] = a, !0);
          }
          return Reflect.set(s.form, r, a);
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
  setPaths(t = {}) {
    return Object.assign(this.paths, t), this;
  }
  setErrors(t) {
    this.errorBag = t || "default", this.errors = qe(), this.errors.createBag(this.errorBag);
  }
  setAttributes(t) {
    this.original = t, this.form = A({ ...t });
  }
  getError(t) {
    return this.errors.get(t, this.errorBag);
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag);
  }
  get(t = null, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("get", t, { formatter: s, ...r });
  }
  post(t = null, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("post", t, { formatter: s, ...r });
  }
  submit(t = null, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("post", t, { formatter: s, ...r });
  }
  delete(t = null, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("delete", t, { formatter: s, ...r });
  }
  put(t = null, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("put", t, { formatter: s, ...r });
  }
  patch(t, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("patch", t, { formatter: s, ...r });
  }
  submitRequest(t, s, { formatter: r = null, ...a } = {}) {
    if (!s && typeof s != "string")
      throw new Error("Path must be a string or null");
    if (r !== null && typeof r != "function")
      throw new Error("Formatter must be a function");
    this.clearErrors(), this.submitting();
    const n = r ? r(this.form) : { ...this.form };
    let i;
    return ["get", "delete"].includes(t) ? (a.params = n, i = T[t](s, a)) : i = T[t](s, n, a), i.then((o) => (this.clearErrors(), this.submitted(), o.data)).catch((o) => (this.submitFailed(), this.errors.set(o, this.errorBag), Promise.reject(o)));
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(t) {
    this.submitFailed(), this.errors.set(t, this.errorBag);
  }
  async advancedSubmit(t) {
    this.states.submit.loading();
    const { data: s } = await Promise.resolve(t(T, this.form)).catch(
      (r) => {
        throw this.states.submit.failed(), this.errors.set(r, this.errorBag), r;
      }
    );
    return this.states.submit.loaded(), s;
  }
  async load(t = "", { updateLoading: s = !0, updateOriginal: r = !0, ...a } = {}) {
    this.states.load.loading();
    try {
      const { data: n } = await T.get(t || this.loadPath, a);
      return r && Object.assign(this.original, n.form), Object.assign(this.form, n.form), n.model && Object.assign(this.model, n.model), s && this.loaded(), n;
    } catch (n) {
      throw this.states.load.failed(), n;
    }
  }
  loading() {
    return this.states.load.loading(), this;
  }
  loaded() {
    return this.states.load.loaded(), this;
  }
  loadFailed() {
    return this.states.load.failed(), this;
  }
  submitting() {
    return this.states.submit.loading(), this;
  }
  submitFailed() {
    return this.states.submit.failed(), this;
  }
  submitted() {
    return this.states.submit.loaded(), this;
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
      type: Re,
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
function Jo(e, t, s, r, a, n) {
  var u;
  const i = F("o-datepicker"), o = F("o-field");
  return D(), K(o, je({ label: s.label }, (u = s.form) == null ? void 0 : u.getError(s.name)), {
    default: W(() => [
      V(i, je({
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
const Qo = /* @__PURE__ */ R(Zo, [["render", Jo]]), Ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qo
}, Symbol.toStringTag, { value: "Module" })), Xo = ys({
  name: "WyxosError",
  props: {
    form: {
      type: Re,
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
}), el = { key: 0 }, tl = { key: 1 };
function sl(e, t, s, r, a, n) {
  var i, o;
  return (i = e.form) != null && i.getError(e.name).message ? (D(), Z("p", el, U(e.form.getError(e.name).message), 1)) : (o = e.errors.get(e.name)) != null && o.message ? (D(), Z("p", tl, U(e.errors.get(e.name).message), 1)) : pe("", !0);
}
const rl = /* @__PURE__ */ R(Xo, [["render", sl]]), al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rl
}, Symbol.toStringTag, { value: "Module" })), nl = {
  name: "WyxosForm",
  props: {
    form: {
      type: Re,
      required: !0
    }
  },
  emits: ["submit"]
};
function il(e, t, s, r, a, n) {
  const i = F("o-loading"), o = F("o-button");
  return D(), Z("div", null, [
    s.form.isLoaded ? (D(), Z("form", {
      key: 0,
      class: "form",
      onSubmit: t[0] || (t[0] = _s((u) => e.$emit("submit"), ["prevent"]))
    }, [
      Oe(e.$slots, "default")
    ], 32)) : pe("", !0),
    V(i, {
      active: s.form.isLoading
    }, null, 8, ["active"]),
    s.form.isFailure ? (D(), K(o, {
      key: 1,
      onClick: t[1] || (t[1] = (u) => s.form.load())
    }, {
      default: W(() => [
        te(" An error occurred. Try again? ")
      ]),
      _: 1
    })) : pe("", !0)
  ]);
}
const ol = /* @__PURE__ */ R(nl, [["render", il]]), ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ol
}, Symbol.toStringTag, { value: "Module" })), ul = {
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
}, dl = ["width", "height"];
function cl(e, t, s, r, a, n) {
  return D(), Z("img", {
    ref: "image",
    src: "",
    alt: "",
    width: a.width,
    height: a.height
  }, null, 8, dl);
}
const hl = /* @__PURE__ */ R(ul, [["render", cl]]), fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hl
}, Symbol.toStringTag, { value: "Module" })), ml = {
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
    form: {
      type: Re,
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
      if (!this.name) {
        this.$emit("update:modelValue", e);
        return;
      }
      if (this.form) {
        this.form.clearError(this.name), this.$emit("update:modelValue", e);
        return;
      }
      this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", e);
    },
    getError() {
      if (this.name)
        return this.form ? this.form.getError(this.name) : this.errors.get(this.name);
    }
  }
};
function yl(e, t, s, r, a, n) {
  const i = F("o-input"), o = F("o-field");
  return D(), K(o, je({
    label: s.label,
    class: s.fieldClass
  }, { ...n.getError() }), {
    default: W(() => [
      V(i, {
        readonly: s.readonly,
        class: ms(s.inputClass),
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
const _l = /* @__PURE__ */ R(ml, [["render", yl]]), gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _l
}, Symbol.toStringTag, { value: "Module" })), cr = "%[a-f0-9]{2}", ds = new RegExp("(" + cr + ")|([^%]+?)", "gi"), cs = new RegExp("(" + cr + ")+", "gi");
function Wt(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  t = t || 1;
  const s = e.slice(0, t), r = e.slice(t);
  return Array.prototype.concat.call([], Wt(s), Wt(r));
}
function pl(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(ds) || [];
    for (let s = 1; s < t.length; s++)
      e = Wt(t, s).join(""), t = e.match(ds) || [];
    return e;
  }
}
function wl(e) {
  const t = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let s = cs.exec(e);
  for (; s; ) {
    try {
      t[s[0]] = decodeURIComponent(s[0]);
    } catch {
      const a = pl(s[0]);
      a !== s[0] && (t[s[0]] = a);
    }
    s = cs.exec(e);
  }
  t["%C2"] = "�";
  const r = Object.keys(t);
  for (const a of r)
    e = e.replace(new RegExp(a, "g"), t[a]);
  return e;
}
function bl(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return wl(e);
  }
}
function hr(e, t) {
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
function Sl(e, t) {
  const s = {};
  if (Array.isArray(t))
    for (const r of t) {
      const a = Object.getOwnPropertyDescriptor(e, r);
      a != null && a.enumerable && Object.defineProperty(s, r, a);
    }
  else
    for (const r of Reflect.ownKeys(e)) {
      const a = Object.getOwnPropertyDescriptor(e, r);
      if (a.enumerable) {
        const n = e[r];
        t(r, n, e) && Object.defineProperty(s, r, a);
      }
    }
  return s;
}
const vl = (e) => e == null, kl = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), Nt = Symbol("encodeFragmentIdentifier");
function Ol(e) {
  switch (e.arrayFormat) {
    case "index":
      return (t) => (s, r) => {
        const a = s.length;
        return r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
          ...s,
          [x(t, e), "[", a, "]"].join("")
        ] : [
          ...s,
          [x(t, e), "[", x(a, e), "]=", x(r, e)].join("")
        ];
      };
    case "bracket":
      return (t) => (s, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
        ...s,
        [x(t, e), "[]"].join("")
      ] : [
        ...s,
        [x(t, e), "[]=", x(r, e)].join("")
      ];
    case "colon-list-separator":
      return (t) => (s, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
        ...s,
        [x(t, e), ":list="].join("")
      ] : [
        ...s,
        [x(t, e), ":list=", x(r, e)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (s) => (r, a) => a === void 0 || e.skipNull && a === null || e.skipEmptyString && a === "" ? r : (a = a === null ? "" : a, r.length === 0 ? [[x(s, e), t, x(a, e)].join("")] : [[r, x(a, e)].join(e.arrayFormatSeparator)]);
    }
    default:
      return (t) => (s, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
        ...s,
        x(t, e)
      ] : [
        ...s,
        [x(t, e), "=", x(r, e)].join("")
      ];
  }
}
function Ml(e) {
  let t;
  switch (e.arrayFormat) {
    case "index":
      return (s, r, a) => {
        if (t = /\[(\d*)]$/.exec(s), s = s.replace(/\[\d*]$/, ""), !t) {
          a[s] = r;
          return;
        }
        a[s] === void 0 && (a[s] = {}), a[s][t[1]] = r;
      };
    case "bracket":
      return (s, r, a) => {
        if (t = /(\[])$/.exec(s), s = s.replace(/\[]$/, ""), !t) {
          a[s] = r;
          return;
        }
        if (a[s] === void 0) {
          a[s] = [r];
          return;
        }
        a[s] = [...a[s], r];
      };
    case "colon-list-separator":
      return (s, r, a) => {
        if (t = /(:list)$/.exec(s), s = s.replace(/:list$/, ""), !t) {
          a[s] = r;
          return;
        }
        if (a[s] === void 0) {
          a[s] = [r];
          return;
        }
        a[s] = [...a[s], r];
      };
    case "comma":
    case "separator":
      return (s, r, a) => {
        const n = typeof r == "string" && r.includes(e.arrayFormatSeparator), i = typeof r == "string" && !n && oe(r, e).includes(e.arrayFormatSeparator);
        r = i ? oe(r, e) : r;
        const o = n || i ? r.split(e.arrayFormatSeparator).map((u) => oe(u, e)) : r === null ? r : oe(r, e);
        a[s] = o;
      };
    case "bracket-separator":
      return (s, r, a) => {
        const n = /(\[])$/.test(s);
        if (s = s.replace(/\[]$/, ""), !n) {
          a[s] = r && oe(r, e);
          return;
        }
        const i = r === null ? [] : r.split(e.arrayFormatSeparator).map((o) => oe(o, e));
        if (a[s] === void 0) {
          a[s] = i;
          return;
        }
        a[s] = [...a[s], ...i];
      };
    default:
      return (s, r, a) => {
        if (a[s] === void 0) {
          a[s] = r;
          return;
        }
        a[s] = [...[a[s]].flat(), r];
      };
  }
}
function fr(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function x(e, t) {
  return t.encode ? t.strict ? kl(e) : encodeURIComponent(e) : e;
}
function oe(e, t) {
  return t.decode ? bl(e) : e;
}
function mr(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? mr(Object.keys(e)).sort((t, s) => Number(t) - Number(s)).map((t) => e[t]) : e;
}
function yr(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function Dl(e) {
  let t = "";
  const s = e.indexOf("#");
  return s !== -1 && (t = e.slice(s)), t;
}
function hs(e, t) {
  return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function ts(e) {
  e = yr(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function ss(e, t) {
  t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...t
  }, fr(t.arrayFormatSeparator);
  const s = Ml(t), r = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return r;
  for (const a of e.split("&")) {
    if (a === "")
      continue;
    const n = t.decode ? a.replace(/\+/g, " ") : a;
    let [i, o] = hr(n, "=");
    i === void 0 && (i = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? o : oe(o, t), s(oe(i, t), o, r);
  }
  for (const [a, n] of Object.entries(r))
    if (typeof n == "object" && n !== null)
      for (const [i, o] of Object.entries(n))
        n[i] = hs(o, t);
    else
      r[a] = hs(n, t);
  return t.sort === !1 ? r : (t.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(t.sort)).reduce((a, n) => {
    const i = r[n];
    return i && typeof i == "object" && !Array.isArray(i) ? a[n] = mr(i) : a[n] = i, a;
  }, /* @__PURE__ */ Object.create(null));
}
function _r(e, t) {
  if (!e)
    return "";
  t = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...t
  }, fr(t.arrayFormatSeparator);
  const s = (i) => t.skipNull && vl(e[i]) || t.skipEmptyString && e[i] === "", r = Ol(t), a = {};
  for (const [i, o] of Object.entries(e))
    s(i) || (a[i] = o);
  const n = Object.keys(a);
  return t.sort !== !1 && n.sort(t.sort), n.map((i) => {
    const o = e[i];
    return o === void 0 ? "" : o === null ? x(i, t) : Array.isArray(o) ? o.length === 0 && t.arrayFormat === "bracket-separator" ? x(i, t) + "[]" : o.reduce(r(i), []).join("&") : x(i, t) + "=" + x(o, t);
  }).filter((i) => i.length > 0).join("&");
}
function gr(e, t) {
  var a;
  t = {
    decode: !0,
    ...t
  };
  let [s, r] = hr(e, "#");
  return s === void 0 && (s = e), {
    url: ((a = s == null ? void 0 : s.split("?")) == null ? void 0 : a[0]) ?? "",
    query: ss(ts(e), t),
    ...t && t.parseFragmentIdentifier && r ? { fragmentIdentifier: oe(r, t) } : {}
  };
}
function pr(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [Nt]: !0,
    ...t
  };
  const s = yr(e.url).split("?")[0] || "", r = ts(e.url), a = {
    ...ss(r, { sort: !1 }),
    ...e.query
  };
  let n = _r(a, t);
  n && (n = `?${n}`);
  let i = Dl(e.url);
  if (e.fragmentIdentifier) {
    const o = new URL(s);
    o.hash = e.fragmentIdentifier, i = t[Nt] ? o.hash : `#${e.fragmentIdentifier}`;
  }
  return `${s}${n}${i}`;
}
function wr(e, t, s) {
  s = {
    parseFragmentIdentifier: !0,
    [Nt]: !1,
    ...s
  };
  const { url: r, query: a, fragmentIdentifier: n } = gr(e, s);
  return pr({
    url: r,
    query: Sl(a, t),
    fragmentIdentifier: n
  }, s);
}
function Yl(e, t, s) {
  const r = Array.isArray(t) ? (a) => !t.includes(a) : (a, n) => !t(a, n);
  return wr(e, r, s);
}
const fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Yl,
  extract: ts,
  parse: ss,
  parseUrl: gr,
  pick: wr,
  stringify: _r,
  stringifyUrl: pr
}, Symbol.toStringTag, { value: "Module" }));
let ye;
class rs {
  constructor() {
    _(this, "api", null);
    _(this, "baseUrl", null);
    _(this, "structure", null);
    _(this, "options", null);
    _(this, "errors", null);
    _(this, "errorBag", "default");
    _(this, "states", {
      load: j.create(),
      fetch: j.create(),
      filter: j.create()
    });
    _(this, "query", A({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    _(this, "params", A({
      page: 1
    }));
    _(this, "state", A({
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
    const r = new rs();
    if (!t)
      throw Error("Structure of search query required.");
    return r.errors = qe(), r.errors.createBag(this.errorBag), r.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (a) => a
      },
      s
    ), r.setParameters(t), r.options.enableSearchUpdate && r.mergeSearch(), r.baseUrl = s.baseUrl, r.api = T.create(s.axios || {}), r;
  }
  setParameters(t) {
    const s = JSON.parse(JSON.stringify(t));
    this.structure = Object.assign({}, s), this.params = A(t);
  }
  mergeSearch() {
    const t = fs.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    t.page && (t.page = Number(t.page)), Object.assign(this.params, this.structure, t);
  }
  async fetch(t, s) {
    this.states.fetch.loading();
    const r = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl;
    try {
      const { data: n } = await this.api.get(a, {
        params: r,
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
      items: s.query.items.map((r) => this.transformItem(r))
    }), s;
  }
  refreshUrl() {
    const t = window.location.href.replace(/\?.*/, ""), s = JSON.parse(JSON.stringify(this.params)), r = Object.fromEntries(
      Object.entries(s).filter(([n, i]) => i != null)
    ), a = t + "?" + fs.stringify(r, { arrayFormat: "bracket" });
    window.history.pushState({}, "", a);
  }
  push(t) {
    this.query.items.push(this.transformItem(t));
  }
  transformItem(t) {
    return this.options.transformItem({
      ...t,
      states: {
        delete: new j(),
        patch: new j()
      }
    });
  }
  async load(t) {
    this.errors.clear(null, this.errorBag), ye && ye.cancel(), ye = T.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let s = null;
    try {
      this.states.fetch.loading();
      const r = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl, n = await this.api.get(a, {
        params: r,
        cancelToken: ye.token
      }).catch((i) => {
        throw this.states.fetch.failed(), i;
      });
      if (this.states.fetch.loaded(), s = n.data, this.states.fetch.loaded(), !s || !s.query || !s.query.items)
        throw this.states.fetch.failed(), Error("Response format is invalid.");
      return Object.assign(this.query, s.query, {
        items: s.query.items.map((i) => this.transformItem(i))
      }), s;
    } catch (r) {
      if (T.isCancel(r))
        this.states.fetch.loaded(), console.error("Request cancelled");
      else
        throw this.states.fetch.failed(), this.errors.set(r, this.errorBag), r;
    }
  }
  onPageChange(t) {
    return this.params.page = t, this.load();
  }
  async patch({ path: t, props: s, payload: r } = {}) {
    const { row: a } = s;
    r = {
      id: a.id,
      ...r
    };
    const { data: n } = await this.api.patch(t || this.baseUrl, r).catch((o) => {
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
  async processRowAndRefreshList({ path: t, props: s, payload: r, state: a, method: n } = {}) {
    const { row: i, index: o } = s;
    r = {
      id: i.id,
      ...r
    };
    let u = i.states[a];
    u || (u = i.states[a] = j.create()), u.loading();
    const { data: h } = await this.api[n](
      t || this.baseUrl,
      r
    ).catch((E) => {
      throw u.failed(), E;
    });
    u.loaded(), h.row && Object.assign(i, h.row);
    const S = await this.fetch();
    if (this.query.items.splice(o, 1), !S.query.items.length)
      return this.params.page--, await this.load(), h;
    if (this.query.items.length < S.query.items.length) {
      const E = S.query.items[S.query.items.length - 1];
      this.push(E);
    }
    return h;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), ye && ye.cancel(), this.states.filter.loading(), this.states.load.loading(), ye = T.CancelToken.source(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let t = null;
    try {
      const s = JSON.parse(JSON.stringify(this.params)), r = this.baseUrl;
      t = (await this.api.get(r, {
        params: s,
        cancelToken: ye.token
      }).catch((n) => {
        throw this.states.filter.failed(), n;
      })).data;
    } catch (s) {
      if (T.isCancel(s)) {
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
const xl = {
  name: "WyxosListing",
  props: {
    listing: {
      type: rs,
      required: !0
    }
  },
  computed: {
    allPropsAndEvents() {
      return {
        ...this.listing.config,
        ...Object.keys(this.listing.events).reduce((e, t) => (e[`on${t.charAt(0).toUpperCase() + t.slice(1)}`] = this.listing.events[t], e), {})
      };
    }
  }
};
function Tl(e, t, s, r, a, n) {
  const i = F("o-table");
  return D(), K(i, kt(Ot(n.allPropsAndEvents)), Yr({ _: 2 }, [
    gs(e.$slots, (o, u) => ({
      name: u,
      fn: W((h) => [
        Oe(e.$slots, u, kt(Ot(h)))
      ])
    }))
  ]), 1040);
}
const Fl = /* @__PURE__ */ R(xl, [["render", Tl]]), Pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fl
}, Symbol.toStringTag, { value: "Module" })), Wl = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: Re.create({
        form: {
          email: null,
          password: null
        },
        submitPath: ""
      })
    };
  },
  data() {
    return {
      user: null,
      propertiesCount: 0,
      organisations: []
    };
  },
  methods: {
    async proceed() {
      await this.login.submit(), this.$emit("close", { action: !0 });
    },
    onLogout() {
      window.location.href = "/";
    }
  }
}, Nl = { class: "bg-white p-6" }, Rl = /* @__PURE__ */ M("h2", { class: "title" }, "Session Expired", -1), Ll = /* @__PURE__ */ M("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Cl = { class: "buttons" };
function El(e, t, s, r, a, n) {
  const i = F("wyxos-input"), o = F("w-button"), u = F("o-modal");
  return D(), K(u, { active: !0 }, {
    default: W(() => [
      M("div", Nl, [
        Rl,
        Ll,
        M("form", {
          onSubmit: t[3] || (t[3] = _s((...h) => n.proceed && n.proceed(...h), ["prevent"]))
        }, [
          V(i, {
            modelValue: r.login.email,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => r.login.email = h),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          V(i, {
            modelValue: r.login.password,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => r.login.password = h),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          M("div", Cl, [
            V(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: t[2] || (t[2] = (h) => n.onLogout())
            }, {
              default: W(() => [
                te(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            V(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: W(() => [
                te(" Login ")
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ], 32)
      ])
    ]),
    _: 1
  });
}
const br = /* @__PURE__ */ R(Wl, [["render", El]]), Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: br
}, Symbol.toStringTag, { value: "Module" })), jl = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, Ul = { class: "bg-white p-6" }, Al = /* @__PURE__ */ M("h2", { class: "title" }, "Session expired", -1), $l = /* @__PURE__ */ M("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Vl = { class: "buttons" };
function ql(e, t, s, r, a, n) {
  const i = F("w-button"), o = F("o-modal");
  return D(), K(o, { active: !0 }, {
    default: W(() => [
      M("div", Ul, [
        Al,
        $l,
        M("div", Vl, [
          V(i, {
            class: "button is-primary",
            onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !0 }))
          }, {
            default: W(() => [
              te(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const Sr = /* @__PURE__ */ R(jl, [["render", ql]]), Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sr
}, Symbol.toStringTag, { value: "Module" }));
async function Rt(e, t) {
  var n, i, o, u, h;
  const s = {
    401: "Authentication required. Please reload the page and sign in.",
    403: "You do not have permission to perform this action.",
    404: "The page or action you are looking for could not be found.",
    419: "Your session has likely expired. Try again or reload the page.",
    422: "The action attempted was invalid. Please review your input and try again.",
    500: "An unexpected error has occurred. This issue has been reported.",
    503: "The site is currently under maintenance. Please try again later."
  };
  Object.assign(s, (t == null ? void 0 : t.messages) || {});
  const r = s[(n = e.response) == null ? void 0 : n.status] || s[500], { oruga: a } = ws();
  if (a.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((i = e.response) == null ? void 0 : i.status) === 419) {
    a.modal.open({
      component: Sr,
      trapFocus: !0,
      closable: !1
    });
    const E = (await T.get("/heartbeat")).data.csrfToken;
    T.defaults.headers.common["X-CSRF-TOKEN"] = E;
  }
  return ((o = e.response) == null ? void 0 : o.status) === 401 && a.modal.open({
    component: ((u = t.components) == null ? void 0 : u.SessionExpired) || br,
    trapFocus: !0,
    closable: !1
  }), ((h = e.response) == null ? void 0 : h.status) === 422 && new Promise((S) => setTimeout(S, 500)).then(() => {
    const S = document.querySelector(".o-field__label-danger");
    S && S.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(e);
}
const zl = {
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
        Rt(t);
      }).catch(Rt);
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function Gl(e, t, s, r, a, n) {
  return D(), Z("li", null, [
    Oe(e.$slots, "default", { logout: n.logout }, () => [
      M("button", {
        class: "button is-primary",
        onClick: t[0] || (t[0] = (i) => n.logout())
      }, "Sign out")
    ])
  ]);
}
const Bl = /* @__PURE__ */ R(zl, [["render", Gl]]), Zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bl
}, Symbol.toStringTag, { value: "Module" })), Jl = ys({
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
}), Ql = ["value", "max"], Kl = { key: 0 };
function Xl(e, t, s, r, a, n) {
  return D(), Z(ps, null, [
    M("progress", {
      value: e.value,
      max: e.max
    }, null, 8, Ql),
    e.showValue ? (D(), Z("span", Kl, U(e.value) + " / " + U(e.max), 1)) : pe("", !0)
  ], 64);
}
const eu = /* @__PURE__ */ R(Jl, [["render", Xl]]), tu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eu
}, Symbol.toStringTag, { value: "Module" })), su = {
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
      state: new j()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, ru = { class: "button-group" };
function au(e, t, s, r, a, n) {
  const i = F("wyxos-button"), o = F("o-modal");
  return D(), K(o, { active: !0 }, {
    default: W(() => [
      M("h2", null, U(s.title), 1),
      M("p", null, U(s.message), 1),
      M("div", ru, [
        V(i, {
          disabled: r.state.isLoading,
          "native-type": "button",
          onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
        }, {
          default: W(() => [
            te(U(s.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        V(i, {
          loading: r.state.isLoading,
          "native-type": "button",
          onClick: t[1] || (t[1] = (u) => n.proceed())
        }, {
          default: W(() => [
            te(U(s.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const nu = /* @__PURE__ */ R(su, [["render", au]]), iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nu
}, Symbol.toStringTag, { value: "Module" })), ou = {
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
      type: Re,
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
}, lu = ["value"];
function uu(e, t, s, r, a, n) {
  var u;
  const i = F("o-select"), o = F("o-field");
  return D(), K(o, je({ label: s.label }, (u = s.form) == null ? void 0 : u.getError(s.name)), {
    default: W(() => [
      V(i, {
        disabled: s.disabled,
        "model-value": s.modelValue,
        name: s.name,
        placeholder: s.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (h) => n.updateValue(h))
      }, {
        default: W(() => [
          Oe(e.$slots, "default", {}, () => [
            s.items ? (D(!0), Z(ps, { key: 0 }, gs(s.items, (h) => (D(), Z("option", {
              key: h.value,
              value: h.value
            }, U(h.label), 9, lu))), 128)) : pe("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const du = /* @__PURE__ */ R(ou, [["render", uu]]), cu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: du
}, Symbol.toStringTag, { value: "Module" }));
class as {
  constructor(t = {}) {
    _(this, "state", new j());
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
    return new as(t);
  }
  getEvents({ searchPayloadFormatter: t = null } = {}) {
    return {
      "update:model-value": (s) => (this.value.value = s, this.search(t))
    };
  }
  search(t) {
    const s = { value: this.value.value }, r = t ? t(s) : s;
    return this.customSearch({ payload: r });
  }
  async customSearch({ url: t, payload: s }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)), this.controller = new AbortController(), this.timeout = setTimeout(async () => {
      this.state.loading(), this.reset();
      const r = t || this.options.url, { data: a } = await T.post(`${r}/search`, s || this.options.payload, {
        signal: this.controller.signal
      }).catch((n) => {
        throw this.state.failed(), n;
      });
      this.result.value = a.result, this.state.loaded();
    }, 500);
  }
  async restore(t, s) {
    this.state.loading(), this.reset();
    const r = t || this.options.url, { data: a } = await T.post(`${r}/restore`, s || this.options.payload).catch((n) => {
      throw this.state.failed(), n;
    });
    return this.state.loaded(), a;
  }
  reset() {
    this.result.value = [];
  }
}
const hu = {
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
      search: as.create()
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
function fu(e, t, s, r, a, n) {
  const i = F("o-inputitems");
  return D(), K(i, je({
    ref: "tagInput",
    modelValue: a.query,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => a.query = o),
    data: r.search.result.value,
    "allow-autocomplete": ""
  }, e.$attrs, {
    onAdd: t[1] || (t[1] = (o) => n.addedTag(o)),
    onRemove: t[2] || (t[2] = (o) => n.removedTag(o)),
    onTyping: t[3] || (t[3] = (o) => n.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const mu = /* @__PURE__ */ R(hu, [["render", fu]]), yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mu
}, Symbol.toStringTag, { value: "Module" }));
class _u {
  constructor() {
    _(this, "attributes", A({
      user: null
    }));
    _(this, "state", new j());
    return new Proxy(this, {
      get(t, s, r) {
        return Reflect.has(t, s) ? Reflect.get(t, s, r) : s in t.attributes ? t.attributes[s] : null;
      },
      set(t, s, r, a) {
        return Reflect.has(t, s) ? Reflect.set(t, s, r, a) : s in t.attributes ? (t.attributes[s] = r, !0) : null;
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
    this.state.loading(), await T.get("/sanctum/csrf-cookie").catch((s) => {
      throw this.state.failed(), s;
    });
    const { data: t } = await T.get("/api/user");
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
    this.attributes = A({
      user: null
    });
  }
}
const Mu = new _u(), gu = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class pu {
  constructor() {
    _(this, "FORMATS", gu);
  }
  format(t, s, r = "") {
    return t ? d(t).format(s) : r;
  }
}
const Du = new pu();
class Yu {
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
class vr {
  constructor() {
    _(this, "state", Ue(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new vr();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class xu {
  static create(t, s = null, r = null) {
    return s = s || t, {
      value: t,
      label: s
    };
  }
}
class Tu {
  constructor() {
    _(this, "structure", {});
    _(this, "query", A({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    _(this, "params", A({
      page: 1
    }));
    _(this, "router", null);
  }
  static create(t, s = {}, r = {}, a) {
    r = Object.assign(
      { base: "/api/admin", route: `${t}.index` },
      r
    );
    const n = r.base, i = {
      route: r.route,
      index: r.index || `${n}/${t}/index`,
      destroy: `${n}/${t}/destroy`
    }, o = new this();
    return o.options = r, o.structure = s, o.params = Object.assign(o.params, s), o.router = a, o.urls = i, o;
  }
  async fetch(t) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: s } = await T.get(t || this.urls.index, {
      params: this.params
    }).catch((r) => {
      throw this.query.isLoading = !1, r;
    });
    return await this.router.push({ name: this.urls.route, query: this.params }), this.query.isLoading = !1, this.query.isLoaded = !0, s;
  }
  async load(t) {
    const s = await this.fetch(t);
    return Object.assign(this.query, s.query, {
      items: s.query.items.map((r) => ({
        ...r,
        isProcessing: !1
      }))
    }), s;
  }
  onPageChange(t) {
    return this.params.page = t, this.load();
  }
  async action(t, { row: s, index: r, remove: a, method: n }, i = {}) {
    s.isProcessing = !0;
    const o = {
      id: s.id,
      ...i
    };
    if (n === "delete") {
      const { data: u } = await T.delete(t, {
        data: o
      }).catch((h) => {
        throw s.isProcessing = !1, h;
      });
      s.isProcessing = !1, u.row && Object.assign(s, u.row);
    } else {
      const { data: u } = await T.post(t, o).catch((h) => {
        throw s.isProcessing = !1, h;
      });
      s.isProcessing = !1, u.row && Object.assign(s, u.row);
    }
    if (a) {
      const u = await this.fetch();
      if (this.query.items.splice(r, 1), !u.query.items.length) {
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
class Fu {
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
    const t = this.flow.findIndex((r) => r === this.getCurrent()), s = this.flow[t + 1];
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
function Pu(e) {
  const { oruga: t } = ws();
  t.notification.open({
    message: e || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class kr {
  constructor(t) {
    _(this, "attributes", A({
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
    return new kr(t);
  }
}
function wu(e) {
  T.interceptors.response.use(null, (t) => Rt(t, e));
}
const vt = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Nr, "./components/WyxosCollection.vue": Ir, "./components/WyxosConfirm.vue": zr, "./components/WyxosDatepicker.vue": Ko, "./components/WyxosError.vue": al, "./components/WyxosForm.vue": ll, "./components/WyxosImage.vue": fl, "./components/WyxosInput.vue": gl, "./components/WyxosListing.vue": Pl, "./components/WyxosLogout.vue": Zl, "./components/WyxosProgress.vue": tu, "./components/WyxosPrompt.vue": iu, "./components/WyxosSelect.vue": cu, "./components/WyxosSessionExpired.vue": Il, "./components/WyxosTags.vue": yu, "./components/WyxosTokenExpired.vue": Hl }), Or = {}, bu = (e, t = { vision: {}, oruga: {} }) => {
  e.use(xr, t.oruga), Object.keys(vt).forEach((s) => {
    const r = vt[s].default.name, a = vt[s].default;
    e.component(r, a), e.component(r.replace("Wyxos", "W"), a), Or[r] = a;
  }), wu(t);
}, Wu = {
  install: bu,
  ...Or
};
export {
  Yu as FileRequest,
  Re as FormBuilder,
  rs as Listing,
  j as LoadState,
  vr as Modal,
  xu as Option,
  Tu as ResourceList,
  as as Search,
  Fu as Steps,
  kr as Tab,
  Wr as WyxosButton,
  Er as WyxosCollection,
  Hr as WyxosConfirm,
  Qo as WyxosDatepicker,
  rl as WyxosError,
  ol as WyxosForm,
  hl as WyxosImage,
  _l as WyxosInput,
  Fl as WyxosListing,
  Bl as WyxosLogout,
  eu as WyxosProgress,
  nu as WyxosPrompt,
  du as WyxosSelect,
  br as WyxosSessionExpired,
  mu as WyxosTags,
  Sr as WyxosTokenExpired,
  Mu as auth,
  Du as dateRender,
  Wu as default,
  Rt as errorHandler,
  Pu as success,
  qe as useFormErrors
};
