var Dr = Object.defineProperty;
var Yr = (e, t, s) => t in e ? Dr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var y = (e, t, s) => (Yr(e, typeof t != "symbol" ? t + "" : t, s), s);
import { resolveComponent as O, openBlock as p, createBlock as j, withCtx as M, renderSlot as K, createTextVNode as G, createCommentVNode as C, toDisplayString as N, createElementBlock as L, normalizeProps as Mt, guardReactiveProps as Dt, createElementVNode as S, reactive as H, createVNode as E, normalizeClass as ot, mergeProps as Re, defineComponent as gs, Fragment as Et, withModifiers as ps, createSlots as xr, renderList as bs, Teleport as Tr, ref as Ve } from "vue";
import P from "axios";
import Fr, { useProgrammatic as It } from "@oruga-ui/oruga-next";
const R = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, a] of t)
    s[r] = a;
  return s;
}, Pr = {
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
}, Wr = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Rr(e, t, s, r, a, i) {
  const n = O("o-button");
  return p(), j(n, { disabled: s.loading }, {
    default: M(() => [
      s.loading ? C("", !0) : K(e.$slots, "default", { key: 0 }, () => [
        G("Submit")
      ]),
      s.loading && s.text ? K(e.$slots, "loading", { key: 1 }, () => [
        G(N(s.text), 1)
      ]) : C("", !0),
      s.loading ? (p(), L("i", Wr)) : C("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const Nr = /* @__PURE__ */ R(Pr, [["render", Rr]]), Cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nr
}, Symbol.toStringTag, { value: "Module" })), Lr = {
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
}, Er = /* @__PURE__ */ S("ul", null, [
  /* @__PURE__ */ S("li")
], -1);
function Ir(e, t, s, r, a, i) {
  return K(e.$slots, "default", Mt(Dt({ add: i.add, remove: i.remove, items: a.items })), () => [
    Er
  ]);
}
const jr = /* @__PURE__ */ R(Lr, [["render", Ir]]), Ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jr
}, Symbol.toStringTag, { value: "Module" }));
class q {
  constructor() {
    y(this, "state", H({
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
  reset() {
    Object.assign(this.state, {
      isLoading: !1,
      isLoaded: !1,
      isFailure: !1
    });
  }
  static create() {
    return new q();
  }
}
const Vr = {
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
      state: new q()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, $r = { class: "bg-white p-6" }, Ar = { class: "title" }, qr = { class: "mb-6" }, Hr = {
  class: "buttons",
  role: "group"
};
function zr(e, t, s, r, a, i) {
  const n = O("wyxos-button"), o = O("o-modal");
  return p(), j(o, {
    active: !0,
    onClose: t[2] || (t[2] = (l) => e.$emit("close", { action: !1 }))
  }, {
    default: M(() => [
      S("section", $r, [
        S("article", null, [
          S("header", null, [
            S("h3", Ar, N(s.title), 1)
          ]),
          S("p", qr, N(s.message), 1),
          S("footer", Hr, [
            E(n, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (l) => e.$emit("close", { action: !1 }))
            }, {
              default: M(() => [
                G(N(s.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            E(n, {
              class: ot([{ [s.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (l) => i.proceed())
            }, {
              default: M(() => [
                G(N(s.confirmText), 1)
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
const Gr = /* @__PURE__ */ R(Vr, [["render", zr]]), Br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gr
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var ws;
function d() {
  return ws.apply(null, arguments);
}
function Jr(e) {
  ws = e;
}
function ee(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Me(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function b(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function jt(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (b(e, t))
      return !1;
  return !0;
}
function A(e) {
  return e === void 0;
}
function fe(e) {
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
function be(e, t) {
  for (var s in t)
    b(t, s) && (e[s] = t[s]);
  return b(t, "toString") && (e.toString = t.toString), b(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ie(e, t, s, r) {
  return Hs(e, t, s, r, !0).utc();
}
function Zr() {
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
  return e._pf == null && (e._pf = Zr()), e._pf;
}
var Yt;
Array.prototype.some ? Yt = Array.prototype.some : Yt = function(e) {
  var t = Object(this), s = t.length >>> 0, r;
  for (r = 0; r < s; r++)
    if (r in t && e.call(this, t[r], r, t))
      return !0;
  return !1;
};
function Ut(e) {
  if (e._isValid == null) {
    var t = m(e), s = Yt.call(t.parsedDateParts, function(a) {
      return a != null;
    }), r = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && s);
    if (e._strict && (r = r && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = r;
    else
      return r;
  }
  return e._isValid;
}
function lt(e) {
  var t = ie(NaN);
  return e != null ? be(m(t), e) : m(t).userInvalidated = !0, t;
}
var ls = d.momentProperties = [], wt = !1;
function Vt(e, t) {
  var s, r, a, i = ls.length;
  if (A(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), A(t._i) || (e._i = t._i), A(t._f) || (e._f = t._f), A(t._l) || (e._l = t._l), A(t._strict) || (e._strict = t._strict), A(t._tzm) || (e._tzm = t._tzm), A(t._isUTC) || (e._isUTC = t._isUTC), A(t._offset) || (e._offset = t._offset), A(t._pf) || (e._pf = m(t)), A(t._locale) || (e._locale = t._locale), i > 0)
    for (s = 0; s < i; s++)
      r = ls[s], a = t[r], A(a) || (e[r] = a);
  return e;
}
function ze(e) {
  Vt(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), wt === !1 && (wt = !0, d.updateOffset(this), wt = !1);
}
function te(e) {
  return e instanceof ze || e != null && e._isAMomentObject != null;
}
function vs(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Z(e, t) {
  var s = !0;
  return be(function() {
    if (d.deprecationHandler != null && d.deprecationHandler(null, e), s) {
      var r = [], a, i, n, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (a = "", typeof arguments[i] == "object") {
          a += `
[` + i + "] ";
          for (n in arguments[0])
            b(arguments[0], n) && (a += n + ": " + arguments[0][n] + ", ");
          a = a.slice(0, -2);
        } else
          a = arguments[i];
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
var us = {};
function ks(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), us[e] || (vs(t), us[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function ne(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Qr(e) {
  var t, s;
  for (s in e)
    b(e, s) && (t = e[s], ne(t) ? this[s] = t : this["_" + s] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function xt(e, t) {
  var s = be({}, e), r;
  for (r in t)
    b(t, r) && (Me(e[r]) && Me(t[r]) ? (s[r] = {}, be(s[r], e[r]), be(s[r], t[r])) : t[r] != null ? s[r] = t[r] : delete s[r]);
  for (r in e)
    b(e, r) && !b(t, r) && Me(e[r]) && (s[r] = be({}, s[r]));
  return s;
}
function $t(e) {
  e != null && this.set(e);
}
var Tt;
Object.keys ? Tt = Object.keys : Tt = function(e) {
  var t, s = [];
  for (t in e)
    b(e, t) && s.push(t);
  return s;
};
var Kr = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Xr(e, t, s) {
  var r = this._calendar[e] || this._calendar.sameElse;
  return ne(r) ? r.call(t, s) : r;
}
function ae(e, t, s) {
  var r = "" + Math.abs(e), a = t - r.length, i = e >= 0;
  return (i ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + r;
}
var At = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Ze = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, St = {}, Fe = {};
function f(e, t, s, r) {
  var a = r;
  typeof r == "string" && (a = function() {
    return this[r]();
  }), e && (Fe[e] = a), t && (Fe[t[0]] = function() {
    return ae(a.apply(this, arguments), t[1], t[2]);
  }), s && (Fe[s] = function() {
    return this.localeData().ordinal(
      a.apply(this, arguments),
      e
    );
  });
}
function ea(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function ta(e) {
  var t = e.match(At), s, r;
  for (s = 0, r = t.length; s < r; s++)
    Fe[t[s]] ? t[s] = Fe[t[s]] : t[s] = ea(t[s]);
  return function(a) {
    var i = "", n;
    for (n = 0; n < r; n++)
      i += ne(t[n]) ? t[n].call(a, e) : t[n];
    return i;
  };
}
function Ke(e, t) {
  return e.isValid() ? (t = Os(t, e.localeData()), St[t] = St[t] || ta(t), St[t](e)) : e.localeData().invalidDate();
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
var sa = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function ra(e) {
  var t = this._longDateFormat[e], s = this._longDateFormat[e.toUpperCase()];
  return t || !s ? t : (this._longDateFormat[e] = s.match(At).map(function(r) {
    return r === "MMMM" || r === "MM" || r === "DD" || r === "dddd" ? r.slice(1) : r;
  }).join(""), this._longDateFormat[e]);
}
var aa = "Invalid date";
function ia() {
  return this._invalidDate;
}
var na = "%d", oa = /\d{1,2}/;
function la(e) {
  return this._ordinal.replace("%d", e);
}
var ua = {
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
function da(e, t, s, r) {
  var a = this._relativeTime[s];
  return ne(a) ? a(e, t, s, r) : a.replace(/%d/i, e);
}
function ca(e, t) {
  var s = this._relativeTime[e > 0 ? "future" : "past"];
  return ne(s) ? s(t) : s.replace(/%s/i, t);
}
var je = {};
function U(e, t) {
  var s = e.toLowerCase();
  je[s] = je[s + "s"] = je[t] = e;
}
function Q(e) {
  return typeof e == "string" ? je[e] || je[e.toLowerCase()] : void 0;
}
function qt(e) {
  var t = {}, s, r;
  for (r in e)
    b(e, r) && (s = Q(r), s && (t[s] = e[r]));
  return t;
}
var Ms = {};
function V(e, t) {
  Ms[e] = t;
}
function ha(e) {
  var t = [], s;
  for (s in e)
    b(e, s) && t.push({ unit: s, priority: Ms[s] });
  return t.sort(function(r, a) {
    return r.priority - a.priority;
  }), t;
}
function ut(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function J(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function _(e) {
  var t = +e, s = 0;
  return t !== 0 && isFinite(t) && (s = J(t)), s;
}
function Ce(e, t) {
  return function(s) {
    return s != null ? (Ds(this, e, s), d.updateOffset(this, t), this) : tt(this, e);
  };
}
function tt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Ds(e, t, s) {
  e.isValid() && !isNaN(s) && (t === "FullYear" && ut(e.year()) && e.month() === 1 && e.date() === 29 ? (s = _(s), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    s,
    e.month(),
    yt(s, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](s));
}
function fa(e) {
  return e = Q(e), ne(this[e]) ? this[e]() : this;
}
function ma(e, t) {
  if (typeof e == "object") {
    e = qt(e);
    var s = ha(e), r, a = s.length;
    for (r = 0; r < a; r++)
      this[s[r].unit](e[s[r].unit]);
  } else if (e = Q(e), ne(this[e]))
    return this[e](t);
  return this;
}
var Ys = /\d/, B = /\d\d/, xs = /\d{3}/, Ht = /\d{4}/, dt = /[+-]?\d{6}/, Y = /\d\d?/, Ts = /\d\d\d\d?/, Fs = /\d\d\d\d\d\d?/, ct = /\d{1,3}/, zt = /\d{1,4}/, ht = /[+-]?\d{1,6}/, Le = /\d+/, ft = /[+-]?\d+/, ya = /Z|[+-]\d\d:?\d\d/gi, mt = /Z|[+-]\d\d(?::?\d\d)?/gi, _a = /[+-]?\d+(\.\d{1,3})?/, Ge = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, st;
st = {};
function c(e, t, s) {
  st[e] = ne(t) ? t : function(r, a) {
    return r && s ? s : t;
  };
}
function ga(e, t) {
  return b(st, e) ? st[e](t._strict, t._locale) : new RegExp(pa(e));
}
function pa(e) {
  return z(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, s, r, a, i) {
        return s || r || a || i;
      }
    )
  );
}
function z(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Ft = {};
function v(e, t) {
  var s, r = t, a;
  for (typeof e == "string" && (e = [e]), fe(t) && (r = function(i, n) {
    n[t] = _(i);
  }), a = e.length, s = 0; s < a; s++)
    Ft[e[s]] = r;
}
function Be(e, t) {
  v(e, function(s, r, a, i) {
    a._w = a._w || {}, t(s, a._w, a, i);
  });
}
function ba(e, t, s) {
  t != null && b(Ft, e) && Ft[e](t, s._a, s, e);
}
var I = 0, de = 1, re = 2, W = 3, X = 4, ce = 5, Oe = 6, wa = 7, Sa = 8;
function va(e, t) {
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
function yt(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var s = va(t, 12);
  return e += (t - s) / 12, s === 1 ? ut(e) ? 29 : 28 : 31 - s % 7 % 2;
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
U("month", "M");
V("month", 8);
c("M", Y);
c("MM", Y, B);
c("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
c("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
v(["M", "MM"], function(e, t) {
  t[de] = _(e) - 1;
});
v(["MMM", "MMMM"], function(e, t, s, r) {
  var a = s._locale.monthsParse(e, r, s._strict);
  a != null ? t[de] = a : m(s).invalidMonth = e;
});
var ka = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ps = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Ws = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Oa = Ge, Ma = Ge;
function Da(e, t) {
  return e ? ee(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ws).test(t) ? "format" : "standalone"][e.month()] : ee(this._months) ? this._months : this._months.standalone;
}
function Ya(e, t) {
  return e ? ee(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ws.test(t) ? "format" : "standalone"][e.month()] : ee(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function xa(e, t, s) {
  var r, a, i, n = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r)
      i = ie([2e3, r]), this._shortMonthsParse[r] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[r] = this.months(i, "").toLocaleLowerCase();
  return s ? t === "MMM" ? (a = T.call(this._shortMonthsParse, n), a !== -1 ? a : null) : (a = T.call(this._longMonthsParse, n), a !== -1 ? a : null) : t === "MMM" ? (a = T.call(this._shortMonthsParse, n), a !== -1 ? a : (a = T.call(this._longMonthsParse, n), a !== -1 ? a : null)) : (a = T.call(this._longMonthsParse, n), a !== -1 ? a : (a = T.call(this._shortMonthsParse, n), a !== -1 ? a : null));
}
function Ta(e, t, s) {
  var r, a, i;
  if (this._monthsParseExact)
    return xa.call(this, e, t, s);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++) {
    if (a = ie([2e3, r]), s && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp(
      "^" + this.months(a, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[r] = new RegExp(
      "^" + this.monthsShort(a, "").replace(".", "") + "$",
      "i"
    )), !s && !this._monthsParse[r] && (i = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[r] = new RegExp(i.replace(".", ""), "i")), s && t === "MMMM" && this._longMonthsParse[r].test(e))
      return r;
    if (s && t === "MMM" && this._shortMonthsParse[r].test(e))
      return r;
    if (!s && this._monthsParse[r].test(e))
      return r;
  }
}
function Rs(e, t) {
  var s;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = _(t);
    else if (t = e.localeData().monthsParse(t), !fe(t))
      return e;
  }
  return s = Math.min(e.date(), yt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, s), e;
}
function Ns(e) {
  return e != null ? (Rs(this, e), d.updateOffset(this, !0), this) : tt(this, "Month");
}
function Fa() {
  return yt(this.year(), this.month());
}
function Pa(e) {
  return this._monthsParseExact ? (b(this, "_monthsRegex") || Cs.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (b(this, "_monthsShortRegex") || (this._monthsShortRegex = Oa), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Wa(e) {
  return this._monthsParseExact ? (b(this, "_monthsRegex") || Cs.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (b(this, "_monthsRegex") || (this._monthsRegex = Ma), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Cs() {
  function e(n, o) {
    return o.length - n.length;
  }
  var t = [], s = [], r = [], a, i;
  for (a = 0; a < 12; a++)
    i = ie([2e3, a]), t.push(this.monthsShort(i, "")), s.push(this.months(i, "")), r.push(this.months(i, "")), r.push(this.monthsShort(i, ""));
  for (t.sort(e), s.sort(e), r.sort(e), a = 0; a < 12; a++)
    t[a] = z(t[a]), s[a] = z(s[a]);
  for (a = 0; a < 24; a++)
    r[a] = z(r[a]);
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
  return e <= 9999 ? ae(e, 4) : "+" + e;
});
f(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
f(0, ["YYYY", 4], 0, "year");
f(0, ["YYYYY", 5], 0, "year");
f(0, ["YYYYYY", 6, !0], 0, "year");
U("year", "y");
V("year", 1);
c("Y", ft);
c("YY", Y, B);
c("YYYY", zt, Ht);
c("YYYYY", ht, dt);
c("YYYYYY", ht, dt);
v(["YYYYY", "YYYYYY"], I);
v("YYYY", function(e, t) {
  t[I] = e.length === 2 ? d.parseTwoDigitYear(e) : _(e);
});
v("YY", function(e, t) {
  t[I] = d.parseTwoDigitYear(e);
});
v("Y", function(e, t) {
  t[I] = parseInt(e, 10);
});
function Ue(e) {
  return ut(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return _(e) + (_(e) > 68 ? 1900 : 2e3);
};
var Ls = Ce("FullYear", !0);
function Ra() {
  return ut(this.year());
}
function Na(e, t, s, r, a, i, n) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, s, r, a, i, n), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, s, r, a, i, n), o;
}
function $e(e) {
  var t, s;
  return e < 100 && e >= 0 ? (s = Array.prototype.slice.call(arguments), s[0] = e + 400, t = new Date(Date.UTC.apply(null, s)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function rt(e, t, s) {
  var r = 7 + t - s, a = (7 + $e(e, 0, r).getUTCDay() - t) % 7;
  return -a + r - 1;
}
function Es(e, t, s, r, a) {
  var i = (7 + s - r) % 7, n = rt(e, r, a), o = 1 + 7 * (t - 1) + i + n, l, h;
  return o <= 0 ? (l = e - 1, h = Ue(l) + o) : o > Ue(e) ? (l = e + 1, h = o - Ue(e)) : (l = e, h = o), {
    year: l,
    dayOfYear: h
  };
}
function Ae(e, t, s) {
  var r = rt(e.year(), t, s), a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1, i, n;
  return a < 1 ? (n = e.year() - 1, i = a + he(n, t, s)) : a > he(e.year(), t, s) ? (i = a - he(e.year(), t, s), n = e.year() + 1) : (n = e.year(), i = a), {
    week: i,
    year: n
  };
}
function he(e, t, s) {
  var r = rt(e, t, s), a = rt(e + 1, t, s);
  return (Ue(e) - r + a) / 7;
}
f("w", ["ww", 2], "wo", "week");
f("W", ["WW", 2], "Wo", "isoWeek");
U("week", "w");
U("isoWeek", "W");
V("week", 5);
V("isoWeek", 5);
c("w", Y);
c("ww", Y, B);
c("W", Y);
c("WW", Y, B);
Be(
  ["w", "ww", "W", "WW"],
  function(e, t, s, r) {
    t[r.substr(0, 1)] = _(e);
  }
);
function Ca(e) {
  return Ae(e, this._week.dow, this._week.doy).week;
}
var La = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function Ea() {
  return this._week.dow;
}
function Ia() {
  return this._week.doy;
}
function ja(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Ua(e) {
  var t = Ae(this, 1, 4).week;
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
U("day", "d");
U("weekday", "e");
U("isoWeekday", "E");
V("day", 11);
V("weekday", 11);
V("isoWeekday", 11);
c("d", Y);
c("e", Y);
c("E", Y);
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
  t[r] = _(e);
});
function Va(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function $a(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Gt(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Aa = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Is = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), qa = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Ha = Ge, za = Ge, Ga = Ge;
function Ba(e, t) {
  var s = ee(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? Gt(s, this._week.dow) : e ? s[e.day()] : s;
}
function Ja(e) {
  return e === !0 ? Gt(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Za(e) {
  return e === !0 ? Gt(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Qa(e, t, s) {
  var r, a, i, n = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], r = 0; r < 7; ++r)
      i = ie([2e3, 1]).day(r), this._minWeekdaysParse[r] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[r] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[r] = this.weekdays(i, "").toLocaleLowerCase();
  return s ? t === "dddd" ? (a = T.call(this._weekdaysParse, n), a !== -1 ? a : null) : t === "ddd" ? (a = T.call(this._shortWeekdaysParse, n), a !== -1 ? a : null) : (a = T.call(this._minWeekdaysParse, n), a !== -1 ? a : null) : t === "dddd" ? (a = T.call(this._weekdaysParse, n), a !== -1 || (a = T.call(this._shortWeekdaysParse, n), a !== -1) ? a : (a = T.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : t === "ddd" ? (a = T.call(this._shortWeekdaysParse, n), a !== -1 || (a = T.call(this._weekdaysParse, n), a !== -1) ? a : (a = T.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : (a = T.call(this._minWeekdaysParse, n), a !== -1 || (a = T.call(this._weekdaysParse, n), a !== -1) ? a : (a = T.call(this._shortWeekdaysParse, n), a !== -1 ? a : null));
}
function Ka(e, t, s) {
  var r, a, i;
  if (this._weekdaysParseExact)
    return Qa.call(this, e, t, s);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), r = 0; r < 7; r++) {
    if (a = ie([2e3, 1]).day(r), s && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp(
      "^" + this.weekdays(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[r] || (i = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[r] = new RegExp(i.replace(".", ""), "i")), s && t === "dddd" && this._fullWeekdaysParse[r].test(e))
      return r;
    if (s && t === "ddd" && this._shortWeekdaysParse[r].test(e))
      return r;
    if (s && t === "dd" && this._minWeekdaysParse[r].test(e))
      return r;
    if (!s && this._weekdaysParse[r].test(e))
      return r;
  }
}
function Xa(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = Va(e, this.localeData()), this.add(e - t, "d")) : t;
}
function ei(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function ti(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = $a(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function si(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || Bt.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (b(this, "_weekdaysRegex") || (this._weekdaysRegex = Ha), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function ri(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || Bt.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (b(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = za), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function ai(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || Bt.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (b(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ga), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Bt() {
  function e(k, $) {
    return $.length - k.length;
  }
  var t = [], s = [], r = [], a = [], i, n, o, l, h;
  for (i = 0; i < 7; i++)
    n = ie([2e3, 1]).day(i), o = z(this.weekdaysMin(n, "")), l = z(this.weekdaysShort(n, "")), h = z(this.weekdays(n, "")), t.push(o), s.push(l), r.push(h), a.push(o), a.push(l), a.push(h);
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
function Jt() {
  return this.hours() % 12 || 12;
}
function ii() {
  return this.hours() || 24;
}
f("H", ["HH", 2], 0, "hour");
f("h", ["hh", 2], 0, Jt);
f("k", ["kk", 2], 0, ii);
f("hmm", 0, 0, function() {
  return "" + Jt.apply(this) + ae(this.minutes(), 2);
});
f("hmmss", 0, 0, function() {
  return "" + Jt.apply(this) + ae(this.minutes(), 2) + ae(this.seconds(), 2);
});
f("Hmm", 0, 0, function() {
  return "" + this.hours() + ae(this.minutes(), 2);
});
f("Hmmss", 0, 0, function() {
  return "" + this.hours() + ae(this.minutes(), 2) + ae(this.seconds(), 2);
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
U("hour", "h");
V("hour", 13);
function Us(e, t) {
  return t._meridiemParse;
}
c("a", Us);
c("A", Us);
c("H", Y);
c("h", Y);
c("k", Y);
c("HH", Y, B);
c("hh", Y, B);
c("kk", Y, B);
c("hmm", Ts);
c("hmmss", Fs);
c("Hmm", Ts);
c("Hmmss", Fs);
v(["H", "HH"], W);
v(["k", "kk"], function(e, t, s) {
  var r = _(e);
  t[W] = r === 24 ? 0 : r;
});
v(["a", "A"], function(e, t, s) {
  s._isPm = s._locale.isPM(e), s._meridiem = e;
});
v(["h", "hh"], function(e, t, s) {
  t[W] = _(e), m(s).bigHour = !0;
});
v("hmm", function(e, t, s) {
  var r = e.length - 2;
  t[W] = _(e.substr(0, r)), t[X] = _(e.substr(r)), m(s).bigHour = !0;
});
v("hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[W] = _(e.substr(0, r)), t[X] = _(e.substr(r, 2)), t[ce] = _(e.substr(a)), m(s).bigHour = !0;
});
v("Hmm", function(e, t, s) {
  var r = e.length - 2;
  t[W] = _(e.substr(0, r)), t[X] = _(e.substr(r));
});
v("Hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[W] = _(e.substr(0, r)), t[X] = _(e.substr(r, 2)), t[ce] = _(e.substr(a));
});
function ni(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var oi = /[ap]\.?m?\.?/i, li = Ce("Hours", !0);
function ui(e, t, s) {
  return e > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
}
var Vs = {
  calendar: Kr,
  longDateFormat: sa,
  invalidDate: aa,
  ordinal: na,
  dayOfMonthOrdinalParse: oa,
  relativeTime: ua,
  months: ka,
  monthsShort: Ps,
  week: La,
  weekdays: Aa,
  weekdaysMin: qa,
  weekdaysShort: Is,
  meridiemParse: oi
}, x = {}, Ee = {}, qe;
function di(e, t) {
  var s, r = Math.min(e.length, t.length);
  for (s = 0; s < r; s += 1)
    if (e[s] !== t[s])
      return s;
  return r;
}
function ds(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function ci(e) {
  for (var t = 0, s, r, a, i; t < e.length; ) {
    for (i = ds(e[t]).split("-"), s = i.length, r = ds(e[t + 1]), r = r ? r.split("-") : null; s > 0; ) {
      if (a = _t(i.slice(0, s).join("-")), a)
        return a;
      if (r && r.length >= s && di(i, r) >= s - 1)
        break;
      s--;
    }
    t++;
  }
  return qe;
}
function hi(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function _t(e) {
  var t = null, s;
  if (x[e] === void 0 && typeof module < "u" && module && module.exports && hi(e))
    try {
      t = qe._abbr, s = require, s("./locale/" + e), Se(t);
    } catch {
      x[e] = null;
    }
  return x[e];
}
function Se(e, t) {
  var s;
  return e && (A(t) ? s = me(e) : s = Zt(e, t), s ? qe = s : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), qe._abbr;
}
function Zt(e, t) {
  if (t !== null) {
    var s, r = Vs;
    if (t.abbr = e, x[e] != null)
      ks(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), r = x[e]._config;
    else if (t.parentLocale != null)
      if (x[t.parentLocale] != null)
        r = x[t.parentLocale]._config;
      else if (s = _t(t.parentLocale), s != null)
        r = s._config;
      else
        return Ee[t.parentLocale] || (Ee[t.parentLocale] = []), Ee[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return x[e] = new $t(xt(r, t)), Ee[e] && Ee[e].forEach(function(a) {
      Zt(a.name, a.config);
    }), Se(e), x[e];
  } else
    return delete x[e], null;
}
function fi(e, t) {
  if (t != null) {
    var s, r, a = Vs;
    x[e] != null && x[e].parentLocale != null ? x[e].set(xt(x[e]._config, t)) : (r = _t(e), r != null && (a = r._config), t = xt(a, t), r == null && (t.abbr = e), s = new $t(t), s.parentLocale = x[e], x[e] = s), Se(e);
  } else
    x[e] != null && (x[e].parentLocale != null ? (x[e] = x[e].parentLocale, e === Se() && Se(e)) : x[e] != null && delete x[e]);
  return x[e];
}
function me(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return qe;
  if (!ee(e)) {
    if (t = _t(e), t)
      return t;
    e = [e];
  }
  return ci(e);
}
function mi() {
  return Tt(x);
}
function Qt(e) {
  var t, s = e._a;
  return s && m(e).overflow === -2 && (t = s[de] < 0 || s[de] > 11 ? de : s[re] < 1 || s[re] > yt(s[I], s[de]) ? re : s[W] < 0 || s[W] > 24 || s[W] === 24 && (s[X] !== 0 || s[ce] !== 0 || s[Oe] !== 0) ? W : s[X] < 0 || s[X] > 59 ? X : s[ce] < 0 || s[ce] > 59 ? ce : s[Oe] < 0 || s[Oe] > 999 ? Oe : -1, m(e)._overflowDayOfYear && (t < I || t > re) && (t = re), m(e)._overflowWeeks && t === -1 && (t = wa), m(e)._overflowWeekday && t === -1 && (t = Sa), m(e).overflow = t), e;
}
var yi = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, _i = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gi = /Z|[+-]\d\d(?::?\d\d)?/, Qe = [
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
], vt = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], pi = /^\/?Date\((-?\d+)/i, bi = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, wi = {
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
  var t, s, r = e._i, a = yi.exec(r) || _i.exec(r), i, n, o, l, h = Qe.length, k = vt.length;
  if (a) {
    for (m(e).iso = !0, t = 0, s = h; t < s; t++)
      if (Qe[t][1].exec(a[1])) {
        n = Qe[t][0], i = Qe[t][2] !== !1;
        break;
      }
    if (n == null) {
      e._isValid = !1;
      return;
    }
    if (a[3]) {
      for (t = 0, s = k; t < s; t++)
        if (vt[t][1].exec(a[3])) {
          o = (a[2] || " ") + vt[t][0];
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
      if (gi.exec(a[4]))
        l = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = n + (o || "") + (l || ""), Xt(e);
  } else
    e._isValid = !1;
}
function Si(e, t, s, r, a, i) {
  var n = [
    vi(e),
    Ps.indexOf(t),
    parseInt(s, 10),
    parseInt(r, 10),
    parseInt(a, 10)
  ];
  return i && n.push(parseInt(i, 10)), n;
}
function vi(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function ki(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Oi(e, t, s) {
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
function Mi(e, t, s) {
  if (e)
    return wi[e];
  if (t)
    return 0;
  var r = parseInt(s, 10), a = r % 100, i = (r - a) / 100;
  return i * 60 + a;
}
function As(e) {
  var t = bi.exec(ki(e._i)), s;
  if (t) {
    if (s = Si(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !Oi(t[1], s, e))
      return;
    e._a = s, e._tzm = Mi(t[8], t[9], t[10]), e._d = $e.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), m(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function Di(e) {
  var t = pi.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if ($s(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (As(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : d.createFromInputFallback(e);
}
d.createFromInputFallback = Z(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function xe(e, t, s) {
  return e ?? t ?? s;
}
function Yi(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Kt(e) {
  var t, s, r = [], a, i, n;
  if (!e._d) {
    for (a = Yi(e), e._w && e._a[re] == null && e._a[de] == null && xi(e), e._dayOfYear != null && (n = xe(e._a[I], a[I]), (e._dayOfYear > Ue(n) || e._dayOfYear === 0) && (m(e)._overflowDayOfYear = !0), s = $e(n, 0, e._dayOfYear), e._a[de] = s.getUTCMonth(), e._a[re] = s.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = r[t] = a[t];
    for (; t < 7; t++)
      e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[W] === 24 && e._a[X] === 0 && e._a[ce] === 0 && e._a[Oe] === 0 && (e._nextDay = !0, e._a[W] = 0), e._d = (e._useUTC ? $e : Na).apply(
      null,
      r
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[W] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (m(e).weekdayMismatch = !0);
  }
}
function xi(e) {
  var t, s, r, a, i, n, o, l, h;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, n = 4, s = xe(
    t.GG,
    e._a[I],
    Ae(D(), 1, 4).year
  ), r = xe(t.W, 1), a = xe(t.E, 1), (a < 1 || a > 7) && (l = !0)) : (i = e._locale._week.dow, n = e._locale._week.doy, h = Ae(D(), i, n), s = xe(t.gg, e._a[I], h.year), r = xe(t.w, h.week), t.d != null ? (a = t.d, (a < 0 || a > 6) && (l = !0)) : t.e != null ? (a = t.e + i, (t.e < 0 || t.e > 6) && (l = !0)) : a = i), r < 1 || r > he(s, i, n) ? m(e)._overflowWeeks = !0 : l != null ? m(e)._overflowWeekday = !0 : (o = Es(s, r, a, i, n), e._a[I] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Xt(e) {
  if (e._f === d.ISO_8601) {
    $s(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    As(e);
    return;
  }
  e._a = [], m(e).empty = !0;
  var t = "" + e._i, s, r, a, i, n, o = t.length, l = 0, h, k;
  for (a = Os(e._f, e._locale).match(At) || [], k = a.length, s = 0; s < k; s++)
    i = a[s], r = (t.match(ga(i, e)) || [])[0], r && (n = t.substr(0, t.indexOf(r)), n.length > 0 && m(e).unusedInput.push(n), t = t.slice(
      t.indexOf(r) + r.length
    ), l += r.length), Fe[i] ? (r ? m(e).empty = !1 : m(e).unusedTokens.push(i), ba(i, r, e)) : e._strict && !r && m(e).unusedTokens.push(i);
  m(e).charsLeftOver = o - l, t.length > 0 && m(e).unusedInput.push(t), e._a[W] <= 12 && m(e).bigHour === !0 && e._a[W] > 0 && (m(e).bigHour = void 0), m(e).parsedDateParts = e._a.slice(0), m(e).meridiem = e._meridiem, e._a[W] = Ti(
    e._locale,
    e._a[W],
    e._meridiem
  ), h = m(e).era, h !== null && (e._a[I] = e._locale.erasConvertYear(h, e._a[I])), Kt(e), Qt(e);
}
function Ti(e, t, s) {
  var r;
  return s == null ? t : e.meridiemHour != null ? e.meridiemHour(t, s) : (e.isPM != null && (r = e.isPM(s), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function Fi(e) {
  var t, s, r, a, i, n, o = !1, l = e._f.length;
  if (l === 0) {
    m(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (a = 0; a < l; a++)
    i = 0, n = !1, t = Vt({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[a], Xt(t), Ut(t) && (n = !0), i += m(t).charsLeftOver, i += m(t).unusedTokens.length * 10, m(t).score = i, o ? i < r && (r = i, s = t) : (r == null || i < r || n) && (r = i, s = t, n && (o = !0));
  be(e, s || t);
}
function Pi(e) {
  if (!e._d) {
    var t = qt(e._i), s = t.day === void 0 ? t.date : t.day;
    e._a = Ss(
      [t.year, t.month, s, t.hour, t.minute, t.second, t.millisecond],
      function(r) {
        return r && parseInt(r, 10);
      }
    ), Kt(e);
  }
}
function Wi(e) {
  var t = new ze(Qt(qs(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function qs(e) {
  var t = e._i, s = e._f;
  return e._locale = e._locale || me(e._l), t === null || s === void 0 && t === "" ? lt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), te(t) ? new ze(Qt(t)) : (He(t) ? e._d = t : ee(s) ? Fi(e) : s ? Xt(e) : Ri(e), Ut(e) || (e._d = null), e));
}
function Ri(e) {
  var t = e._i;
  A(t) ? e._d = new Date(d.now()) : He(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? Di(e) : ee(t) ? (e._a = Ss(t.slice(0), function(s) {
    return parseInt(s, 10);
  }), Kt(e)) : Me(t) ? Pi(e) : fe(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function Hs(e, t, s, r, a) {
  var i = {};
  return (t === !0 || t === !1) && (r = t, t = void 0), (s === !0 || s === !1) && (r = s, s = void 0), (Me(e) && jt(e) || ee(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = a, i._l = s, i._i = e, i._f = t, i._strict = r, Wi(i);
}
function D(e, t, s, r) {
  return Hs(e, t, s, r, !1);
}
var Ni = Z(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = D.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : lt();
  }
), Ci = Z(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = D.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : lt();
  }
);
function zs(e, t) {
  var s, r;
  if (t.length === 1 && ee(t[0]) && (t = t[0]), !t.length)
    return D();
  for (s = t[0], r = 1; r < t.length; ++r)
    (!t[r].isValid() || t[r][e](s)) && (s = t[r]);
  return s;
}
function Li() {
  var e = [].slice.call(arguments, 0);
  return zs("isBefore", e);
}
function Ei() {
  var e = [].slice.call(arguments, 0);
  return zs("isAfter", e);
}
var Ii = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Ie = [
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
function ji(e) {
  var t, s = !1, r, a = Ie.length;
  for (t in e)
    if (b(e, t) && !(T.call(Ie, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (r = 0; r < a; ++r)
    if (e[Ie[r]]) {
      if (s)
        return !1;
      parseFloat(e[Ie[r]]) !== _(e[Ie[r]]) && (s = !0);
    }
  return !0;
}
function Ui() {
  return this._isValid;
}
function Vi() {
  return se(NaN);
}
function gt(e) {
  var t = qt(e), s = t.year || 0, r = t.quarter || 0, a = t.month || 0, i = t.week || t.isoWeek || 0, n = t.day || 0, o = t.hour || 0, l = t.minute || 0, h = t.second || 0, k = t.millisecond || 0;
  this._isValid = ji(t), this._milliseconds = +k + h * 1e3 + // 1000
  l * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +n + i * 7, this._months = +a + r * 3 + s * 12, this._data = {}, this._locale = me(), this._bubble();
}
function Xe(e) {
  return e instanceof gt;
}
function Pt(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function $i(e, t, s) {
  var r = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), i = 0, n;
  for (n = 0; n < r; n++)
    (s && e[n] !== t[n] || !s && _(e[n]) !== _(t[n])) && i++;
  return i + a;
}
function Gs(e, t) {
  f(e, 0, 0, function() {
    var s = this.utcOffset(), r = "+";
    return s < 0 && (s = -s, r = "-"), r + ae(~~(s / 60), 2) + t + ae(~~s % 60, 2);
  });
}
Gs("Z", ":");
Gs("ZZ", "");
c("Z", mt);
c("ZZ", mt);
v(["Z", "ZZ"], function(e, t, s) {
  s._useUTC = !0, s._tzm = es(mt, e);
});
var Ai = /([\+\-]|\d\d)/gi;
function es(e, t) {
  var s = (t || "").match(e), r, a, i;
  return s === null ? null : (r = s[s.length - 1] || [], a = (r + "").match(Ai) || ["-", 0, 0], i = +(a[1] * 60) + _(a[2]), i === 0 ? 0 : a[0] === "+" ? i : -i);
}
function ts(e, t) {
  var s, r;
  return t._isUTC ? (s = t.clone(), r = (te(e) || He(e) ? e.valueOf() : D(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + r), d.updateOffset(s, !1), s) : D(e).local();
}
function Wt(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function qi(e, t, s) {
  var r = this._offset || 0, a;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = es(mt, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !s && (e = e * 60);
    return !this._isUTC && t && (a = Wt(this)), this._offset = e, this._isUTC = !0, a != null && this.add(a, "m"), r !== e && (!t || this._changeInProgress ? Zs(
      this,
      se(e - r, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? r : Wt(this);
}
function Hi(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function zi(e) {
  return this.utcOffset(0, e);
}
function Gi(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Wt(this), "m")), this;
}
function Bi() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = es(ya, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Ji(e) {
  return this.isValid() ? (e = e ? D(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Zi() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Qi() {
  if (!A(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Vt(e, this), e = qs(e), e._a ? (t = e._isUTC ? ie(e._a) : D(e._a), this._isDSTShifted = this.isValid() && $i(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Ki() {
  return this.isValid() ? !this._isUTC : !1;
}
function Xi() {
  return this.isValid() ? this._isUTC : !1;
}
function Bs() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var en = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, tn = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function se(e, t) {
  var s = e, r = null, a, i, n;
  return Xe(e) ? s = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : fe(e) || !isNaN(+e) ? (s = {}, t ? s[t] = +e : s.milliseconds = +e) : (r = en.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: 0,
    d: _(r[re]) * a,
    h: _(r[W]) * a,
    m: _(r[X]) * a,
    s: _(r[ce]) * a,
    ms: _(Pt(r[Oe] * 1e3)) * a
    // the millisecond decimal point is included in the match
  }) : (r = tn.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: ve(r[2], a),
    M: ve(r[3], a),
    w: ve(r[4], a),
    d: ve(r[5], a),
    h: ve(r[6], a),
    m: ve(r[7], a),
    s: ve(r[8], a)
  }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (n = sn(
    D(s.from),
    D(s.to)
  ), s = {}, s.ms = n.milliseconds, s.M = n.months), i = new gt(s), Xe(e) && b(e, "_locale") && (i._locale = e._locale), Xe(e) && b(e, "_isValid") && (i._isValid = e._isValid), i;
}
se.fn = gt.prototype;
se.invalid = Vi;
function ve(e, t) {
  var s = e && parseFloat(e.replace(",", "."));
  return (isNaN(s) ? 0 : s) * t;
}
function cs(e, t) {
  var s = {};
  return s.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(s.months, "M").isAfter(t) && --s.months, s.milliseconds = +t - +e.clone().add(s.months, "M"), s;
}
function sn(e, t) {
  var s;
  return e.isValid() && t.isValid() ? (t = ts(t, e), e.isBefore(t) ? s = cs(e, t) : (s = cs(t, e), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
}
function Js(e, t) {
  return function(s, r) {
    var a, i;
    return r !== null && !isNaN(+r) && (ks(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = s, s = r, r = i), a = se(s, r), Zs(this, a, e), this;
  };
}
function Zs(e, t, s, r) {
  var a = t._milliseconds, i = Pt(t._days), n = Pt(t._months);
  e.isValid() && (r = r ?? !0, n && Rs(e, tt(e, "Month") + n * s), i && Ds(e, "Date", tt(e, "Date") + i * s), a && e._d.setTime(e._d.valueOf() + a * s), r && d.updateOffset(e, i || n));
}
var rn = Js(1, "add"), an = Js(-1, "subtract");
function Qs(e) {
  return typeof e == "string" || e instanceof String;
}
function nn(e) {
  return te(e) || He(e) || Qs(e) || fe(e) || ln(e) || on(e) || e === null || e === void 0;
}
function on(e) {
  var t = Me(e) && !jt(e), s = !1, r = [
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
  ], a, i, n = r.length;
  for (a = 0; a < n; a += 1)
    i = r[a], s = s || b(e, i);
  return t && s;
}
function ln(e) {
  var t = ee(e), s = !1;
  return t && (s = e.filter(function(r) {
    return !fe(r) && Qs(e);
  }).length === 0), t && s;
}
function un(e) {
  var t = Me(e) && !jt(e), s = !1, r = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], a, i;
  for (a = 0; a < r.length; a += 1)
    i = r[a], s = s || b(e, i);
  return t && s;
}
function dn(e, t) {
  var s = e.diff(t, "days", !0);
  return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
}
function cn(e, t) {
  arguments.length === 1 && (arguments[0] ? nn(arguments[0]) ? (e = arguments[0], t = void 0) : un(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var s = e || D(), r = ts(s, this).startOf("day"), a = d.calendarFormat(this, r) || "sameElse", i = t && (ne(t[a]) ? t[a].call(this, s) : t[a]);
  return this.format(
    i || this.localeData().calendar(a, this, D(s))
  );
}
function hn() {
  return new ze(this);
}
function fn(e, t) {
  var s = te(e) ? e : D(e);
  return this.isValid() && s.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function mn(e, t) {
  var s = te(e) ? e : D(e);
  return this.isValid() && s.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(t).valueOf() < s.valueOf()) : !1;
}
function yn(e, t, s, r) {
  var a = te(e) ? e : D(e), i = te(t) ? t : D(t);
  return this.isValid() && a.isValid() && i.isValid() ? (r = r || "()", (r[0] === "(" ? this.isAfter(a, s) : !this.isBefore(a, s)) && (r[1] === ")" ? this.isBefore(i, s) : !this.isAfter(i, s))) : !1;
}
function _n(e, t) {
  var s = te(e) ? e : D(e), r;
  return this.isValid() && s.isValid() ? (t = Q(t) || "millisecond", t === "millisecond" ? this.valueOf() === s.valueOf() : (r = s.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf())) : !1;
}
function gn(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function pn(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function bn(e, t, s) {
  var r, a, i;
  if (!this.isValid())
    return NaN;
  if (r = ts(e, this), !r.isValid())
    return NaN;
  switch (a = (r.utcOffset() - this.utcOffset()) * 6e4, t = Q(t), t) {
    case "year":
      i = et(this, r) / 12;
      break;
    case "month":
      i = et(this, r);
      break;
    case "quarter":
      i = et(this, r) / 3;
      break;
    case "second":
      i = (this - r) / 1e3;
      break;
    case "minute":
      i = (this - r) / 6e4;
      break;
    case "hour":
      i = (this - r) / 36e5;
      break;
    case "day":
      i = (this - r - a) / 864e5;
      break;
    case "week":
      i = (this - r - a) / 6048e5;
      break;
    default:
      i = this - r;
  }
  return s ? i : J(i);
}
function et(e, t) {
  if (e.date() < t.date())
    return -et(t, e);
  var s = (t.year() - e.year()) * 12 + (t.month() - e.month()), r = e.clone().add(s, "months"), a, i;
  return t - r < 0 ? (a = e.clone().add(s - 1, "months"), i = (t - r) / (r - a)) : (a = e.clone().add(s + 1, "months"), i = (t - r) / (a - r)), -(s + i) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function wn() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function Sn(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, s = t ? this.clone().utc() : this;
  return s.year() < 0 || s.year() > 9999 ? Ke(
    s,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ne(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Ke(s, "Z")) : Ke(
    s,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function vn() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", s, r, a, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), s = "[" + e + '("]', r = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", a = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(s + r + a + i);
}
function kn(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = Ke(this, e);
  return this.localeData().postformat(t);
}
function On(e, t) {
  return this.isValid() && (te(e) && e.isValid() || D(e).isValid()) ? se({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Mn(e) {
  return this.from(D(), e);
}
function Dn(e, t) {
  return this.isValid() && (te(e) && e.isValid() || D(e).isValid()) ? se({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Yn(e) {
  return this.to(D(), e);
}
function Ks(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = me(e), t != null && (this._locale = t), this);
}
var Xs = Z(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function er() {
  return this._locale;
}
var at = 1e3, Pe = 60 * at, it = 60 * Pe, tr = (365 * 400 + 97) * 24 * it;
function We(e, t) {
  return (e % t + t) % t;
}
function sr(e, t, s) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, s) - tr : new Date(e, t, s).valueOf();
}
function rr(e, t, s) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, s) - tr : Date.UTC(e, t, s);
}
function xn(e) {
  var t, s;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
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
      t = this._d.valueOf(), t -= We(
        t + (this._isUTC ? 0 : this.utcOffset() * Pe),
        it
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= We(t, Pe);
      break;
    case "second":
      t = this._d.valueOf(), t -= We(t, at);
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function Tn(e) {
  var t, s;
  if (e = Q(e), e === void 0 || e === "millisecond" || !this.isValid())
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
      t = this._d.valueOf(), t += it - We(
        t + (this._isUTC ? 0 : this.utcOffset() * Pe),
        it
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Pe - We(t, Pe) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += at - We(t, at) - 1;
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function Fn() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Pn() {
  return Math.floor(this.valueOf() / 1e3);
}
function Wn() {
  return new Date(this.valueOf());
}
function Rn() {
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
function Nn() {
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
function Cn() {
  return this.isValid() ? this.toISOString() : null;
}
function Ln() {
  return Ut(this);
}
function En() {
  return be({}, m(this));
}
function In() {
  return m(this).overflow;
}
function jn() {
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
c("N", ss);
c("NN", ss);
c("NNN", ss);
c("NNNN", Zn);
c("NNNNN", Qn);
v(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, s, r) {
    var a = s._locale.erasParse(e, r, s._strict);
    a ? m(s).era = a : m(s).invalidEra = e;
  }
);
c("y", Le);
c("yy", Le);
c("yyy", Le);
c("yyyy", Le);
c("yo", Kn);
v(["y", "yy", "yyy", "yyyy"], I);
v(["yo"], function(e, t, s, r) {
  var a;
  s._locale._eraYearOrdinalRegex && (a = e.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? t[I] = s._locale.eraYearOrdinalParse(e, a) : t[I] = parseInt(e, 10);
});
function Un(e, t) {
  var s, r, a, i = this._eras || me("en")._eras;
  for (s = 0, r = i.length; s < r; ++s) {
    switch (typeof i[s].since) {
      case "string":
        a = d(i[s].since).startOf("day"), i[s].since = a.valueOf();
        break;
    }
    switch (typeof i[s].until) {
      case "undefined":
        i[s].until = 1 / 0;
        break;
      case "string":
        a = d(i[s].until).startOf("day").valueOf(), i[s].until = a.valueOf();
        break;
    }
  }
  return i;
}
function Vn(e, t, s) {
  var r, a, i = this.eras(), n, o, l;
  for (e = e.toUpperCase(), r = 0, a = i.length; r < a; ++r)
    if (n = i[r].name.toUpperCase(), o = i[r].abbr.toUpperCase(), l = i[r].narrow.toUpperCase(), s)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return i[r];
          break;
        case "NNNN":
          if (n === e)
            return i[r];
          break;
        case "NNNNN":
          if (l === e)
            return i[r];
          break;
      }
    else if ([n, o, l].indexOf(e) >= 0)
      return i[r];
}
function $n(e, t) {
  var s = e.since <= e.until ? 1 : -1;
  return t === void 0 ? d(e.since).year() : d(e.since).year() + (t - e.offset) * s;
}
function An() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].name;
  return "";
}
function qn() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].narrow;
  return "";
}
function Hn() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].abbr;
  return "";
}
function zn() {
  var e, t, s, r, a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (s = a[e].since <= a[e].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), a[e].since <= r && r <= a[e].until || a[e].until <= r && r <= a[e].since)
      return (this.year() - d(a[e].since).year()) * s + a[e].offset;
  return this.year();
}
function Gn(e) {
  return b(this, "_erasNameRegex") || rs.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Bn(e) {
  return b(this, "_erasAbbrRegex") || rs.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Jn(e) {
  return b(this, "_erasNarrowRegex") || rs.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function ss(e, t) {
  return t.erasAbbrRegex(e);
}
function Zn(e, t) {
  return t.erasNameRegex(e);
}
function Qn(e, t) {
  return t.erasNarrowRegex(e);
}
function Kn(e, t) {
  return t._eraYearOrdinalRegex || Le;
}
function rs() {
  var e = [], t = [], s = [], r = [], a, i, n = this.eras();
  for (a = 0, i = n.length; a < i; ++a)
    t.push(z(n[a].name)), e.push(z(n[a].abbr)), s.push(z(n[a].narrow)), r.push(z(n[a].name)), r.push(z(n[a].abbr)), r.push(z(n[a].narrow));
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
function pt(e, t) {
  f(0, [e, e.length], 0, t);
}
pt("gggg", "weekYear");
pt("ggggg", "weekYear");
pt("GGGG", "isoWeekYear");
pt("GGGGG", "isoWeekYear");
U("weekYear", "gg");
U("isoWeekYear", "GG");
V("weekYear", 1);
V("isoWeekYear", 1);
c("G", ft);
c("g", ft);
c("GG", Y, B);
c("gg", Y, B);
c("GGGG", zt, Ht);
c("gggg", zt, Ht);
c("GGGGG", ht, dt);
c("ggggg", ht, dt);
Be(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, s, r) {
    t[r.substr(0, 2)] = _(e);
  }
);
Be(["gg", "GG"], function(e, t, s, r) {
  t[r] = d.parseTwoDigitYear(e);
});
function Xn(e) {
  return ar.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function eo(e) {
  return ar.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function to() {
  return he(this.year(), 1, 4);
}
function so() {
  return he(this.isoWeekYear(), 1, 4);
}
function ro() {
  var e = this.localeData()._week;
  return he(this.year(), e.dow, e.doy);
}
function ao() {
  var e = this.localeData()._week;
  return he(this.weekYear(), e.dow, e.doy);
}
function ar(e, t, s, r, a) {
  var i;
  return e == null ? Ae(this, r, a).year : (i = he(e, r, a), t > i && (t = i), io.call(this, e, t, s, r, a));
}
function io(e, t, s, r, a) {
  var i = Es(e, t, s, r, a), n = $e(i.year, 0, i.dayOfYear);
  return this.year(n.getUTCFullYear()), this.month(n.getUTCMonth()), this.date(n.getUTCDate()), this;
}
f("Q", 0, "Qo", "quarter");
U("quarter", "Q");
V("quarter", 7);
c("Q", Ys);
v("Q", function(e, t) {
  t[de] = (_(e) - 1) * 3;
});
function no(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
f("D", ["DD", 2], "Do", "date");
U("date", "D");
V("date", 9);
c("D", Y);
c("DD", Y, B);
c("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
v(["D", "DD"], re);
v("Do", function(e, t) {
  t[re] = _(e.match(Y)[0]);
});
var ir = Ce("Date", !0);
f("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
U("dayOfYear", "DDD");
V("dayOfYear", 4);
c("DDD", ct);
c("DDDD", xs);
v(["DDD", "DDDD"], function(e, t, s) {
  s._dayOfYear = _(e);
});
function oo(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
f("m", ["mm", 2], 0, "minute");
U("minute", "m");
V("minute", 14);
c("m", Y);
c("mm", Y, B);
v(["m", "mm"], X);
var lo = Ce("Minutes", !1);
f("s", ["ss", 2], 0, "second");
U("second", "s");
V("second", 15);
c("s", Y);
c("ss", Y, B);
v(["s", "ss"], ce);
var uo = Ce("Seconds", !1);
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
U("millisecond", "ms");
V("millisecond", 16);
c("S", ct, Ys);
c("SS", ct, B);
c("SSS", ct, xs);
var we, nr;
for (we = "SSSS"; we.length <= 9; we += "S")
  c(we, Le);
function co(e, t) {
  t[Oe] = _(("0." + e) * 1e3);
}
for (we = "S"; we.length <= 9; we += "S")
  v(we, co);
nr = Ce("Milliseconds", !1);
f("z", 0, 0, "zoneAbbr");
f("zz", 0, 0, "zoneName");
function ho() {
  return this._isUTC ? "UTC" : "";
}
function fo() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var u = ze.prototype;
u.add = rn;
u.calendar = cn;
u.clone = hn;
u.diff = bn;
u.endOf = Tn;
u.format = kn;
u.from = On;
u.fromNow = Mn;
u.to = Dn;
u.toNow = Yn;
u.get = fa;
u.invalidAt = In;
u.isAfter = fn;
u.isBefore = mn;
u.isBetween = yn;
u.isSame = _n;
u.isSameOrAfter = gn;
u.isSameOrBefore = pn;
u.isValid = Ln;
u.lang = Xs;
u.locale = Ks;
u.localeData = er;
u.max = Ci;
u.min = Ni;
u.parsingFlags = En;
u.set = ma;
u.startOf = xn;
u.subtract = an;
u.toArray = Rn;
u.toObject = Nn;
u.toDate = Wn;
u.toISOString = Sn;
u.inspect = vn;
typeof Symbol < "u" && Symbol.for != null && (u[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
u.toJSON = Cn;
u.toString = wn;
u.unix = Pn;
u.valueOf = Fn;
u.creationData = jn;
u.eraName = An;
u.eraNarrow = qn;
u.eraAbbr = Hn;
u.eraYear = zn;
u.year = Ls;
u.isLeapYear = Ra;
u.weekYear = Xn;
u.isoWeekYear = eo;
u.quarter = u.quarters = no;
u.month = Ns;
u.daysInMonth = Fa;
u.week = u.weeks = ja;
u.isoWeek = u.isoWeeks = Ua;
u.weeksInYear = ro;
u.weeksInWeekYear = ao;
u.isoWeeksInYear = to;
u.isoWeeksInISOWeekYear = so;
u.date = ir;
u.day = u.days = Xa;
u.weekday = ei;
u.isoWeekday = ti;
u.dayOfYear = oo;
u.hour = u.hours = li;
u.minute = u.minutes = lo;
u.second = u.seconds = uo;
u.millisecond = u.milliseconds = nr;
u.utcOffset = qi;
u.utc = zi;
u.local = Gi;
u.parseZone = Bi;
u.hasAlignedHourOffset = Ji;
u.isDST = Zi;
u.isLocal = Ki;
u.isUtcOffset = Xi;
u.isUtc = Bs;
u.isUTC = Bs;
u.zoneAbbr = ho;
u.zoneName = fo;
u.dates = Z(
  "dates accessor is deprecated. Use date instead.",
  ir
);
u.months = Z(
  "months accessor is deprecated. Use month instead",
  Ns
);
u.years = Z(
  "years accessor is deprecated. Use year instead",
  Ls
);
u.zone = Z(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Hi
);
u.isDSTShifted = Z(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Qi
);
function mo(e) {
  return D(e * 1e3);
}
function yo() {
  return D.apply(null, arguments).parseZone();
}
function or(e) {
  return e;
}
var w = $t.prototype;
w.calendar = Xr;
w.longDateFormat = ra;
w.invalidDate = ia;
w.ordinal = la;
w.preparse = or;
w.postformat = or;
w.relativeTime = da;
w.pastFuture = ca;
w.set = Qr;
w.eras = Un;
w.erasParse = Vn;
w.erasConvertYear = $n;
w.erasAbbrRegex = Bn;
w.erasNameRegex = Gn;
w.erasNarrowRegex = Jn;
w.months = Da;
w.monthsShort = Ya;
w.monthsParse = Ta;
w.monthsRegex = Wa;
w.monthsShortRegex = Pa;
w.week = Ca;
w.firstDayOfYear = Ia;
w.firstDayOfWeek = Ea;
w.weekdays = Ba;
w.weekdaysMin = Za;
w.weekdaysShort = Ja;
w.weekdaysParse = Ka;
w.weekdaysRegex = si;
w.weekdaysShortRegex = ri;
w.weekdaysMinRegex = ai;
w.isPM = ni;
w.meridiem = ui;
function nt(e, t, s, r) {
  var a = me(), i = ie().set(r, t);
  return a[s](i, e);
}
function lr(e, t, s) {
  if (fe(e) && (t = e, e = void 0), e = e || "", t != null)
    return nt(e, t, s, "month");
  var r, a = [];
  for (r = 0; r < 12; r++)
    a[r] = nt(e, r, s, "month");
  return a;
}
function as(e, t, s, r) {
  typeof e == "boolean" ? (fe(t) && (s = t, t = void 0), t = t || "") : (t = e, s = t, e = !1, fe(t) && (s = t, t = void 0), t = t || "");
  var a = me(), i = e ? a._week.dow : 0, n, o = [];
  if (s != null)
    return nt(t, (s + i) % 7, r, "day");
  for (n = 0; n < 7; n++)
    o[n] = nt(t, (n + i) % 7, r, "day");
  return o;
}
function _o(e, t) {
  return lr(e, t, "months");
}
function go(e, t) {
  return lr(e, t, "monthsShort");
}
function po(e, t, s) {
  return as(e, t, s, "weekdays");
}
function bo(e, t, s) {
  return as(e, t, s, "weekdaysShort");
}
function wo(e, t, s) {
  return as(e, t, s, "weekdaysMin");
}
Se("en", {
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
    var t = e % 10, s = _(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + s;
  }
});
d.lang = Z(
  "moment.lang is deprecated. Use moment.locale instead.",
  Se
);
d.langData = Z(
  "moment.langData is deprecated. Use moment.localeData instead.",
  me
);
var oe = Math.abs;
function So() {
  var e = this._data;
  return this._milliseconds = oe(this._milliseconds), this._days = oe(this._days), this._months = oe(this._months), e.milliseconds = oe(e.milliseconds), e.seconds = oe(e.seconds), e.minutes = oe(e.minutes), e.hours = oe(e.hours), e.months = oe(e.months), e.years = oe(e.years), this;
}
function ur(e, t, s, r) {
  var a = se(t, s);
  return e._milliseconds += r * a._milliseconds, e._days += r * a._days, e._months += r * a._months, e._bubble();
}
function vo(e, t) {
  return ur(this, e, t, 1);
}
function ko(e, t) {
  return ur(this, e, t, -1);
}
function hs(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Oo() {
  var e = this._milliseconds, t = this._days, s = this._months, r = this._data, a, i, n, o, l;
  return e >= 0 && t >= 0 && s >= 0 || e <= 0 && t <= 0 && s <= 0 || (e += hs(Rt(s) + t) * 864e5, t = 0, s = 0), r.milliseconds = e % 1e3, a = J(e / 1e3), r.seconds = a % 60, i = J(a / 60), r.minutes = i % 60, n = J(i / 60), r.hours = n % 24, t += J(n / 24), l = J(dr(t)), s += l, t -= hs(Rt(l)), o = J(s / 12), s %= 12, r.days = t, r.months = s, r.years = o, this;
}
function dr(e) {
  return e * 4800 / 146097;
}
function Rt(e) {
  return e * 146097 / 4800;
}
function Mo(e) {
  if (!this.isValid())
    return NaN;
  var t, s, r = this._milliseconds;
  if (e = Q(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + r / 864e5, s = this._months + dr(t), e) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (t = this._days + Math.round(Rt(this._months)), e) {
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
function Do() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + _(this._months / 12) * 31536e6 : NaN;
}
function ye(e) {
  return function() {
    return this.as(e);
  };
}
var Yo = ye("ms"), xo = ye("s"), To = ye("m"), Fo = ye("h"), Po = ye("d"), Wo = ye("w"), Ro = ye("M"), No = ye("Q"), Co = ye("y");
function Lo() {
  return se(this);
}
function Eo(e) {
  return e = Q(e), this.isValid() ? this[e + "s"]() : NaN;
}
function De(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Io = De("milliseconds"), jo = De("seconds"), Uo = De("minutes"), Vo = De("hours"), $o = De("days"), Ao = De("months"), qo = De("years");
function Ho() {
  return J(this.days() / 7);
}
var le = Math.round, Te = {
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
function zo(e, t, s, r, a) {
  return a.relativeTime(t || 1, !!s, e, r);
}
function Go(e, t, s, r) {
  var a = se(e).abs(), i = le(a.as("s")), n = le(a.as("m")), o = le(a.as("h")), l = le(a.as("d")), h = le(a.as("M")), k = le(a.as("w")), $ = le(a.as("y")), ge = i <= s.ss && ["s", i] || i < s.s && ["ss", i] || n <= 1 && ["m"] || n < s.m && ["mm", n] || o <= 1 && ["h"] || o < s.h && ["hh", o] || l <= 1 && ["d"] || l < s.d && ["dd", l];
  return s.w != null && (ge = ge || k <= 1 && ["w"] || k < s.w && ["ww", k]), ge = ge || h <= 1 && ["M"] || h < s.M && ["MM", h] || $ <= 1 && ["y"] || ["yy", $], ge[2] = t, ge[3] = +e > 0, ge[4] = r, zo.apply(null, ge);
}
function Bo(e) {
  return e === void 0 ? le : typeof e == "function" ? (le = e, !0) : !1;
}
function Jo(e, t) {
  return Te[e] === void 0 ? !1 : t === void 0 ? Te[e] : (Te[e] = t, e === "s" && (Te.ss = t - 1), !0);
}
function Zo(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var s = !1, r = Te, a, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (s = e), typeof t == "object" && (r = Object.assign({}, Te, t), t.s != null && t.ss == null && (r.ss = t.s - 1)), a = this.localeData(), i = Go(this, !s, r, a), s && (i = a.pastFuture(+this, i)), a.postformat(i);
}
var kt = Math.abs;
function Ye(e) {
  return (e > 0) - (e < 0) || +e;
}
function bt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = kt(this._milliseconds) / 1e3, t = kt(this._days), s = kt(this._months), r, a, i, n, o = this.asSeconds(), l, h, k, $;
  return o ? (r = J(e / 60), a = J(r / 60), e %= 60, r %= 60, i = J(s / 12), s %= 12, n = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", l = o < 0 ? "-" : "", h = Ye(this._months) !== Ye(o) ? "-" : "", k = Ye(this._days) !== Ye(o) ? "-" : "", $ = Ye(this._milliseconds) !== Ye(o) ? "-" : "", l + "P" + (i ? h + i + "Y" : "") + (s ? h + s + "M" : "") + (t ? k + t + "D" : "") + (a || r || e ? "T" : "") + (a ? $ + a + "H" : "") + (r ? $ + r + "M" : "") + (e ? $ + n + "S" : "")) : "P0D";
}
var g = gt.prototype;
g.isValid = Ui;
g.abs = So;
g.add = vo;
g.subtract = ko;
g.as = Mo;
g.asMilliseconds = Yo;
g.asSeconds = xo;
g.asMinutes = To;
g.asHours = Fo;
g.asDays = Po;
g.asWeeks = Wo;
g.asMonths = Ro;
g.asQuarters = No;
g.asYears = Co;
g.valueOf = Do;
g._bubble = Oo;
g.clone = Lo;
g.get = Eo;
g.milliseconds = Io;
g.seconds = jo;
g.minutes = Uo;
g.hours = Vo;
g.days = $o;
g.weeks = Ho;
g.months = Ao;
g.years = qo;
g.humanize = Zo;
g.toISOString = bt;
g.toString = bt;
g.toJSON = bt;
g.locale = Ks;
g.localeData = er;
g.toIsoString = Z(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  bt
);
g.lang = Xs;
f("X", 0, 0, "unix");
f("x", 0, 0, "valueOf");
c("x", ft);
c("X", _a);
v("X", function(e, t, s) {
  s._d = new Date(parseFloat(e) * 1e3);
});
v("x", function(e, t, s) {
  s._d = new Date(_(e));
});
//! moment.js
d.version = "2.29.4";
Jr(D);
d.fn = u;
d.min = Li;
d.max = Ei;
d.now = Ii;
d.utc = ie;
d.unix = mo;
d.months = _o;
d.isDate = He;
d.locale = Se;
d.invalid = lt;
d.duration = se;
d.isMoment = te;
d.weekdays = po;
d.parseZone = yo;
d.localeData = me;
d.isDuration = Xe;
d.monthsShort = go;
d.weekdaysMin = wo;
d.defineLocale = Zt;
d.updateLocale = fi;
d.locales = mi;
d.weekdaysShort = bo;
d.normalizeUnits = Q;
d.relativeTimeRounding = Bo;
d.relativeTimeThreshold = Jo;
d.calendarFormat = dn;
d.prototype = u;
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
const ke = H({
  default: []
});
function Ne() {
  return {
    createBag(e) {
      ke[e] || (ke[e] = []);
    },
    set(e, t = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      ke[t] = Object.keys(e.response.data.errors).map((r) => ({
        key: r,
        message: e.response.data.errors[r][0]
      }));
    },
    get(e, t = "default") {
      const s = ke[t];
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
        const s = ke[t];
        if (!s) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const r = s.findIndex((a) => a.key === e);
        s.splice(r, 1);
        return;
      }
      ke[t] = [];
    },
    all(e = "default") {
      return ke[e];
    }
  };
}
class _e {
  constructor(t = {}) {
    y(this, "errors", null);
    y(this, "errorBag", "default");
    y(this, "model", H({}));
    y(this, "form", H({}));
    y(this, "original", {});
    y(this, "states", {
      load: q.create(),
      submit: q.create()
    });
    y(this, "paths", {
      load: null,
      submit: null
    });
    // Add an abort controller property
    y(this, "abortController", null);
    return this.errors = Ne(), this.errors.createBag(this.errorBag), this.setAttributes(t), this.loaded(), new Proxy(this, {
      get(s, r, a) {
        if (Reflect.has(s, r))
          return Reflect.get(s, r, a);
        if (Reflect.has(s.form, r)) {
          const i = r.split(".");
          if (i.length > 1) {
            let n = s.form;
            for (let o = 0; o < i.length; o++)
              n = n[i[o]];
            return n ?? void 0;
          }
          return Reflect.get(s.form, r);
        }
      },
      set(s, r, a, i) {
        if (Reflect.has(s, r))
          return Reflect.set(s, r, a, i);
        if (Reflect.has(s.form, r)) {
          const n = r.split(".");
          if (n.length > 1) {
            let o = s.form;
            for (let l = 0; l < n.length - 1; l++)
              n[l] in o || (o[n[l]] = {}), o = o[n[l]];
            return o[n[n.length - 1]] === void 0 ? !1 : (o[n[n.length - 1]] = a, !0);
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
  setLoad(t) {
    return this.paths.load = t, this;
  }
  setSubmit(t) {
    return this.paths.submit = t, this;
  }
  setErrors(t) {
    this.errorBag = t || "default", this.errors = Ne(), this.errors.createBag(this.errorBag);
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
  get(t = null, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("get", t, { formatter: s, ...r });
  }
  post(t = null, { formatter: s = null, ...r } = {}) {
    return this.submitRequest("post", t, { formatter: s, ...r });
  }
  submit(t = null, { formatter: s = null, ...r } = {}) {
    if (t = t || this.paths.submit, !t)
      throw Error("No valid URL defined for submit method.");
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
  submitRequest(t, s = null, { formatter: r = null, ...a } = {}) {
    if (s && typeof s != "string")
      throw new Error("Path must be a string");
    if (r !== null && typeof r != "function")
      throw new Error("Formatter must be a function");
    this.abortController && this.abortController.abort(), this.abortController = new AbortController(), a.signal = this.abortController.signal, this.clearErrors(), this.submitting();
    const i = r ? r(this.form) : { ...this.form };
    let n;
    return ["get", "delete"].includes(t) ? (a.params = i, n = P[t](s, a)) : n = P[t](s, i, a), n.then((o) => (this.abortController = null, this.clearErrors(), this.submitted(), setTimeout(() => this.states.submit.reset(), 2e3), o.data)).catch((o) => (o.name === "AbortError" ? console.log("Request aborted:", o.message) : (this.submitFailed(), this.errors.set(o, this.errorBag)), Promise.reject(o)));
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(t) {
    this.submitFailed(), this.errors.set(t, this.errorBag);
  }
  async advancedSubmit(t) {
    this.states.submit.loading();
    const { data: s } = await Promise.resolve(t(P, this.form)).catch(
      (r) => {
        throw this.states.submit.failed(), this.errors.set(r, this.errorBag), r;
      }
    );
    return this.states.submit.loaded(), s;
  }
  async load(t = "", { updateLoading: s = !0, updateOriginal: r = !0, ...a } = {}) {
    this.states.load.loading();
    try {
      const { data: i } = await P.get(t || this.paths.load, a);
      return r && Object.assign(this.original, i.form), Object.assign(this.form, i.form), i.model && Object.assign(this.model, i.model), s && this.loaded(), i;
    } catch (i) {
      throw this.states.load.failed(), i;
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
const Qo = {
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
      type: _e,
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
function Ko(e, t, s, r, a, i) {
  var l;
  const n = O("o-datepicker"), o = O("o-field");
  return p(), j(o, Re({ label: s.label }, (l = s.form) == null ? void 0 : l.getError(s.name)), {
    default: M(() => [
      E(n, Re({
        modelValue: a.query,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => a.query = h)
      }, s.options, {
        "date-formatter": i.dateFormatter,
        "onUpdate:modelValue": i.updateQuery
      }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Xo = /* @__PURE__ */ R(Qo, [["render", Ko]]), el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xo
}, Symbol.toStringTag, { value: "Module" })), tl = gs({
  name: "WyxosError",
  props: {
    form: {
      type: _e,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: Ne()
    };
  }
}), sl = { key: 0 }, rl = { key: 1 };
function al(e, t, s, r, a, i) {
  var n, o;
  return (n = e.form) != null && n.getError(e.name).message ? (p(), L("p", sl, N(e.form.getError(e.name).message), 1)) : (o = e.errors.get(e.name)) != null && o.message ? (p(), L("p", rl, N(e.errors.get(e.name).message), 1)) : C("", !0);
}
const il = /* @__PURE__ */ R(tl, [["render", al]]), nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" })), cr = "%[a-f0-9]{2}", fs = new RegExp("(" + cr + ")|([^%]+?)", "gi"), ms = new RegExp("(" + cr + ")+", "gi");
function Nt(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  t = t || 1;
  const s = e.slice(0, t), r = e.slice(t);
  return Array.prototype.concat.call([], Nt(s), Nt(r));
}
function ol(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(fs) || [];
    for (let s = 1; s < t.length; s++)
      e = Nt(t, s).join(""), t = e.match(fs) || [];
    return e;
  }
}
function ll(e) {
  const t = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let s = ms.exec(e);
  for (; s; ) {
    try {
      t[s[0]] = decodeURIComponent(s[0]);
    } catch {
      const a = ol(s[0]);
      a !== s[0] && (t[s[0]] = a);
    }
    s = ms.exec(e);
  }
  t["%C2"] = "�";
  const r = Object.keys(t);
  for (const a of r)
    e = e.replace(new RegExp(a, "g"), t[a]);
  return e;
}
function ul(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return ll(e);
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
function dl(e, t) {
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
        const i = e[r];
        t(r, i, e) && Object.defineProperty(s, r, a);
      }
    }
  return s;
}
const cl = (e) => e == null, hl = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), Ct = Symbol("encodeFragmentIdentifier");
function fl(e) {
  switch (e.arrayFormat) {
    case "index":
      return (t) => (s, r) => {
        const a = s.length;
        return r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
          ...s,
          [F(t, e), "[", a, "]"].join("")
        ] : [
          ...s,
          [F(t, e), "[", F(a, e), "]=", F(r, e)].join("")
        ];
      };
    case "bracket":
      return (t) => (s, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
        ...s,
        [F(t, e), "[]"].join("")
      ] : [
        ...s,
        [F(t, e), "[]=", F(r, e)].join("")
      ];
    case "colon-list-separator":
      return (t) => (s, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
        ...s,
        [F(t, e), ":list="].join("")
      ] : [
        ...s,
        [F(t, e), ":list=", F(r, e)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (s) => (r, a) => a === void 0 || e.skipNull && a === null || e.skipEmptyString && a === "" ? r : (a = a === null ? "" : a, r.length === 0 ? [[F(s, e), t, F(a, e)].join("")] : [[r, F(a, e)].join(e.arrayFormatSeparator)]);
    }
    default:
      return (t) => (s, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? s : r === null ? [
        ...s,
        F(t, e)
      ] : [
        ...s,
        [F(t, e), "=", F(r, e)].join("")
      ];
  }
}
function ml(e) {
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
        const i = typeof r == "string" && r.includes(e.arrayFormatSeparator), n = typeof r == "string" && !i && ue(r, e).includes(e.arrayFormatSeparator);
        r = n ? ue(r, e) : r;
        const o = i || n ? r.split(e.arrayFormatSeparator).map((l) => ue(l, e)) : r === null ? r : ue(r, e);
        a[s] = o;
      };
    case "bracket-separator":
      return (s, r, a) => {
        const i = /(\[])$/.test(s);
        if (s = s.replace(/\[]$/, ""), !i) {
          a[s] = r && ue(r, e);
          return;
        }
        const n = r === null ? [] : r.split(e.arrayFormatSeparator).map((o) => ue(o, e));
        if (a[s] === void 0) {
          a[s] = n;
          return;
        }
        a[s] = [...a[s], ...n];
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
function F(e, t) {
  return t.encode ? t.strict ? hl(e) : encodeURIComponent(e) : e;
}
function ue(e, t) {
  return t.decode ? ul(e) : e;
}
function mr(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? mr(Object.keys(e)).sort((t, s) => Number(t) - Number(s)).map((t) => e[t]) : e;
}
function yr(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function yl(e) {
  let t = "";
  const s = e.indexOf("#");
  return s !== -1 && (t = e.slice(s)), t;
}
function ys(e, t) {
  return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function is(e) {
  e = yr(e);
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
  }, fr(t.arrayFormatSeparator);
  const s = ml(t), r = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return r;
  for (const a of e.split("&")) {
    if (a === "")
      continue;
    const i = t.decode ? a.replace(/\+/g, " ") : a;
    let [n, o] = hr(i, "=");
    n === void 0 && (n = i), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? o : ue(o, t), s(ue(n, t), o, r);
  }
  for (const [a, i] of Object.entries(r))
    if (typeof i == "object" && i !== null)
      for (const [n, o] of Object.entries(i))
        i[n] = ys(o, t);
    else
      r[a] = ys(i, t);
  return t.sort === !1 ? r : (t.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(t.sort)).reduce((a, i) => {
    const n = r[i];
    return n && typeof n == "object" && !Array.isArray(n) ? a[i] = mr(n) : a[i] = n, a;
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
  const s = (n) => t.skipNull && cl(e[n]) || t.skipEmptyString && e[n] === "", r = fl(t), a = {};
  for (const [n, o] of Object.entries(e))
    s(n) || (a[n] = o);
  const i = Object.keys(a);
  return t.sort !== !1 && i.sort(t.sort), i.map((n) => {
    const o = e[n];
    return o === void 0 ? "" : o === null ? F(n, t) : Array.isArray(o) ? o.length === 0 && t.arrayFormat === "bracket-separator" ? F(n, t) + "[]" : o.reduce(r(n), []).join("&") : F(n, t) + "=" + F(o, t);
  }).filter((n) => n.length > 0).join("&");
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
    query: ns(is(e), t),
    ...t && t.parseFragmentIdentifier && r ? { fragmentIdentifier: ue(r, t) } : {}
  };
}
function pr(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [Ct]: !0,
    ...t
  };
  const s = yr(e.url).split("?")[0] || "", r = is(e.url), a = {
    ...ns(r, { sort: !1 }),
    ...e.query
  };
  let i = _r(a, t);
  i && (i = `?${i}`);
  let n = yl(e.url);
  if (e.fragmentIdentifier) {
    const o = new URL(s);
    o.hash = e.fragmentIdentifier, n = t[Ct] ? o.hash : `#${e.fragmentIdentifier}`;
  }
  return `${s}${i}${n}`;
}
function br(e, t, s) {
  s = {
    parseFragmentIdentifier: !0,
    [Ct]: !1,
    ...s
  };
  const { url: r, query: a, fragmentIdentifier: i } = gr(e, s);
  return pr({
    url: r,
    query: dl(a, t),
    fragmentIdentifier: i
  }, s);
}
function _l(e, t, s) {
  const r = Array.isArray(t) ? (a) => !t.includes(a) : (a, i) => !t(a, i);
  return br(e, r, s);
}
const _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: _l,
  extract: is,
  parse: ns,
  parseUrl: gr,
  pick: br,
  stringify: _r,
  stringifyUrl: pr
}, Symbol.toStringTag, { value: "Module" }));
let pe;
class Je {
  constructor() {
    y(this, "api", null);
    y(this, "baseUrl", null);
    y(this, "structure", null);
    y(this, "options", null);
    y(this, "errors", null);
    y(this, "errorBag", "default");
    y(this, "states", {
      load: q.create(),
      fetch: q.create(),
      filter: q.create()
    });
    y(this, "query", H({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    y(this, "params", H({
      page: 1
    }));
    y(this, "state", H({
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
  get isEmpty() {
    return this.isLoaded && this.query.items.length === 0;
  }
  get isDirty() {
    return JSON.stringify(this.structure) !== JSON.stringify(this.params);
  }
  get isSearchEmpty() {
    return this.isLoaded && this.isDirty && this.query.items.length === 0;
  }
  setUrl(t) {
    return this.baseUrl = t, this;
  }
  static create(t = {}, s = {}) {
    const r = new Je();
    return r.errors = Ne(), r.errors.createBag(this.errorBag), r.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (a) => a
      },
      s
    ), r.setParameters(t), r.options.enableSearchUpdate && r.mergeSearch(), r.baseUrl = s.baseUrl, r.api = P.create(s.axios || {}), r;
  }
  setParameters(t) {
    const s = JSON.parse(JSON.stringify(t));
    this.structure = Object.assign({}, s), this.params = H(t);
  }
  mergeSearch() {
    const t = _s.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    t.page && (t.page = Number(t.page)), Object.assign(this.params, this.structure, t);
  }
  async fetch(t, s) {
    this.states.fetch.loading();
    const r = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl;
    try {
      const { data: i } = await this.api.get(a, {
        params: r,
        cancelToken: s
      });
      return this.states.fetch.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), i;
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
      Object.entries(s).filter(([i, n]) => n != null)
    ), a = t + "?" + _s.stringify(r, { arrayFormat: "bracket" });
    window.history.pushState({}, "", a);
  }
  push(t) {
    this.query.items.push(this.transformItem(t));
  }
  transformItem(t) {
    return this.options.transformItem({
      ...t,
      states: {
        delete: new q(),
        patch: new q()
      }
    });
  }
  async load(t) {
    this.errors.clear(null, this.errorBag), pe && pe.cancel(), pe = P.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let s = null;
    try {
      this.states.fetch.loading();
      const r = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl, i = await this.api.get(a, {
        params: r,
        cancelToken: pe.token
      }).catch((n) => {
        throw this.states.fetch.failed(), n;
      });
      if (this.states.fetch.loaded(), s = i.data, this.states.fetch.loaded(), !s || !s.query || !s.query.items)
        throw this.states.fetch.failed(), Error("Response format is invalid.");
      return Object.assign(this.query, s.query, {
        items: s.query.items.map((n) => this.transformItem(n))
      }), s;
    } catch (r) {
      if (P.isCancel(r))
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
    const { data: i } = await this.api.patch(t || this.baseUrl, r).catch((o) => {
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
  async processRowAndRefreshList({ path: t, props: s, payload: r, state: a, method: i } = {}) {
    const { row: n, index: o } = s;
    r = {
      id: n.id,
      ...r
    };
    let l = n.states[a];
    l || (l = n.states[a] = q.create()), l.loading();
    const { data: h } = await this.api[i](
      t || this.baseUrl,
      r
    ).catch(($) => {
      throw l.failed(), $;
    });
    l.loaded(), h.row && Object.assign(n, h.row);
    const k = await this.fetch();
    if (this.query.items.splice(o, 1), !k.query.items.length)
      return this.params.page--, await this.load(), h;
    if (this.query.items.length < k.query.items.length) {
      const $ = k.query.items[k.query.items.length - 1];
      this.push($);
    }
    return h;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), pe && pe.cancel(), this.states.filter.loading(), this.states.load.loading(), pe = P.CancelToken.source(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let t = null;
    try {
      const s = JSON.parse(JSON.stringify(this.params)), r = this.baseUrl;
      t = (await this.api.get(r, {
        params: s,
        cancelToken: pe.token
      }).catch((i) => {
        throw this.states.filter.failed(), i;
      })).data;
    } catch (s) {
      if (P.isCancel(s)) {
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
const gl = {
  name: "WyxosForm",
  props: {
    form: {
      type: _e,
      required: !0
    },
    submit: {
      type: Function,
      default: null
    },
    listing: {
      type: Je,
      default: null
    },
    reset: {
      type: Boolean,
      default: !1
    },
    formClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  emits: ["submitted"],
  methods: {
    async handle() {
      if (this.submit ? await this.submit(this.form) : await this.form.submit(), this.reset && this.form.reset(), this.$emit("submitted"), this.listing)
        return this.listing.reload();
    }
  }
};
function pl(e, t, s, r, a, i) {
  const n = O("o-loading"), o = O("o-button");
  return p(), L(Et, null, [
    s.form.isLoaded ? (p(), L("form", {
      key: 0,
      class: ot(s.formClass),
      onSubmit: t[0] || (t[0] = ps((l) => i.handle(), ["prevent"]))
    }, [
      K(e.$slots, "default")
    ], 34)) : C("", !0),
    s.form.isLoading ? (p(), j(n, {
      key: 1,
      active: !0
    })) : C("", !0),
    s.form.isFailure ? (p(), j(o, {
      key: 2,
      onClick: t[1] || (t[1] = (l) => s.form.load())
    }, {
      default: M(() => [
        G(" Error. Retry or refresh. ")
      ]),
      _: 1
    })) : C("", !0)
  ], 64);
}
const bl = /* @__PURE__ */ R(gl, [["render", pl]]), wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bl
}, Symbol.toStringTag, { value: "Module" })), Sl = {
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
}, vl = ["width", "height"];
function kl(e, t, s, r, a, i) {
  return p(), L("img", {
    ref: "image",
    src: "",
    alt: "",
    width: a.width,
    height: a.height
  }, null, 8, vl);
}
const Ol = /* @__PURE__ */ R(Sl, [["render", kl]]), Ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ol
}, Symbol.toStringTag, { value: "Module" })), Dl = {
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
      type: _e,
      default: null
    },
    disabled: {
      type: [Boolean, String],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      errors: Ne()
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
function Yl(e, t, s, r, a, i) {
  const n = O("o-input"), o = O("o-field");
  return p(), j(o, Re({
    label: s.label,
    class: s.fieldClass
  }, { ...i.getError() }), {
    default: M(() => [
      E(n, {
        readonly: s.readonly,
        class: ot(s.inputClass),
        "root-class": s.inputRootClass,
        name: s.name,
        type: s.type,
        clearable: s.clearable,
        disabled: s.disabled,
        "model-value": s.modelValue,
        placeholder: s.placeholder,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => i.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const xl = /* @__PURE__ */ R(Dl, [["render", Yl]]), Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xl
}, Symbol.toStringTag, { value: "Module" })), Fl = {
  name: "WyxosListing",
  props: {
    listing: {
      type: Je,
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
}, Pl = { key: 0 }, Wl = { key: 1 }, Rl = { key: 2 };
function Nl(e, t, s, r, a, i) {
  const n = O("o-table");
  return p(), j(n, Mt(Dt(i.allPropsAndEvents)), xr({
    empty: M(() => [
      s.listing.isEmpty ? (p(), L("p", Pl, "No records found.")) : C("", !0),
      s.listing.isSearchEmpty ? (p(), L("p", Wl, " No results for your query. Please adjust your search and try again. ")) : C("", !0),
      s.listing.isFailure ? (p(), L("p", Rl, " Failure to load the list. Try again or reload the page. ")) : C("", !0)
    ]),
    _: 2
  }, [
    bs(e.$slots, (o, l) => ({
      name: l,
      fn: M((h) => [
        K(e.$slots, l, Mt(Dt(h)))
      ])
    }))
  ]), 1040);
}
const Cl = /* @__PURE__ */ R(Fl, [["render", Nl]]), Ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cl
}, Symbol.toStringTag, { value: "Module" })), El = {
  name: "WyxosLiveInput",
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
      type: _e,
      default: null
    },
    disabled: {
      type: [Boolean, String],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      errors: Ne()
    };
  },
  methods: {
    onInput(e) {
      if (!this.name) {
        this.$emit("update:modelValue", e);
        return;
      }
      if (this.form)
        return this.form.clearError(this.name), this.form.submit(null, {
          formatter: () => ({ field: this.name, value: e })
        });
      this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", e);
    },
    getError() {
      if (this.name)
        return this.form ? this.form.getError(this.name) : this.errors.get(this.name);
    }
  }
};
function Il(e, t, s, r, a, i) {
  const n = O("o-input"), o = O("o-field");
  return p(), j(o, Re({
    label: s.label,
    class: s.fieldClass
  }, { ...i.getError() }), {
    default: M(() => [
      E(n, {
        readonly: s.readonly,
        class: ot(s.inputClass),
        "root-class": s.inputRootClass,
        name: s.name,
        type: s.type,
        clearable: s.clearable,
        disabled: s.disabled,
        "model-value": s.modelValue,
        placeholder: s.placeholder,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => i.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const jl = /* @__PURE__ */ R(El, [["render", Il]]), Ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jl
}, Symbol.toStringTag, { value: "Module" })), Vl = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: _e.create({
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
      await this.login.submit("/login"), this.$emit("close", { action: !0 });
    },
    onLogout() {
      window.location.href = "/";
    }
  }
}, $l = { class: "bg-white p-6" }, Al = /* @__PURE__ */ S("h2", { class: "title" }, "Session Expired", -1), ql = /* @__PURE__ */ S("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Hl = { class: "buttons" };
function zl(e, t, s, r, a, i) {
  const n = O("wyxos-input"), o = O("w-button"), l = O("o-modal");
  return p(), j(l, { active: !0 }, {
    default: M(() => [
      S("div", $l, [
        Al,
        ql,
        S("form", {
          onSubmit: t[3] || (t[3] = ps((...h) => i.proceed && i.proceed(...h), ["prevent"]))
        }, [
          E(n, {
            modelValue: r.login.email,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => r.login.email = h),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          E(n, {
            modelValue: r.login.password,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => r.login.password = h),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          S("div", Hl, [
            E(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: t[2] || (t[2] = (h) => i.onLogout())
            }, {
              default: M(() => [
                G(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            E(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: M(() => [
                G(" Login ")
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
const wr = /* @__PURE__ */ R(Vl, [["render", zl]]), Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wr
}, Symbol.toStringTag, { value: "Module" })), Bl = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, Jl = { class: "bg-white p-6" }, Zl = /* @__PURE__ */ S("h2", { class: "title" }, "Session expired", -1), Ql = /* @__PURE__ */ S("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Kl = { class: "buttons" };
function Xl(e, t, s, r, a, i) {
  const n = O("w-button"), o = O("o-modal");
  return p(), j(o, { active: !0 }, {
    default: M(() => [
      S("div", Jl, [
        Zl,
        Ql,
        S("div", Kl, [
          E(n, {
            class: "button is-primary",
            onClick: t[0] || (t[0] = (l) => e.$emit("close", { action: !0 }))
          }, {
            default: M(() => [
              G(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const Sr = /* @__PURE__ */ R(Bl, [["render", Xl]]), eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sr
}, Symbol.toStringTag, { value: "Module" }));
async function Lt(e, t) {
  var i, n, o, l, h;
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
  const r = s[(i = e.response) == null ? void 0 : i.status] || s[500], { oruga: a } = It();
  if (a.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((n = e.response) == null ? void 0 : n.status) === 419) {
    a.modal.open({
      component: Sr,
      trapFocus: !0,
      closable: !1
    });
    const $ = (await P.get("/heartbeat")).data.csrfToken;
    P.defaults.headers.common["X-CSRF-TOKEN"] = $;
  }
  return ((o = e.response) == null ? void 0 : o.status) === 401 && a.modal.open({
    component: ((l = t.components) == null ? void 0 : l.SessionExpired) || wr,
    trapFocus: !0,
    closable: !1
  }), ((h = e.response) == null ? void 0 : h.status) === 422 && new Promise((k) => setTimeout(k, 500)).then(() => {
    const k = document.querySelector(".o-field__label-danger");
    k && k.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(e);
}
const tu = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: e } = await P.post(this.path).catch((t) => {
        if (t.response.status === 401) {
          window.location.href = "/";
          return;
        }
        Lt(t);
      }).catch(Lt);
      console.log("data", e), window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function su(e, t, s, r, a, i) {
  return K(e.$slots, "default", { logout: i.logout }, () => [
    S("button", {
      class: "button is-primary",
      onClick: t[0] || (t[0] = (n) => i.logout())
    }, "Sign out")
  ]);
}
const ru = /* @__PURE__ */ R(tu, [["render", su]]), au = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ru
}, Symbol.toStringTag, { value: "Module" })), iu = gs({
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
}), nu = ["value", "max"], ou = { key: 0 };
function lu(e, t, s, r, a, i) {
  return p(), L(Et, null, [
    S("progress", {
      value: e.value,
      max: e.max
    }, null, 8, nu),
    e.showValue ? (p(), L("span", ou, N(e.value) + " / " + N(e.max), 1)) : C("", !0)
  ], 64);
}
const uu = /* @__PURE__ */ R(iu, [["render", lu]]), du = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: uu
}, Symbol.toStringTag, { value: "Module" })), cu = {
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
      state: new q()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, hu = { class: "flex gap-6" };
function fu(e, t, s, r, a, i) {
  const n = O("wyxos-button"), o = O("o-modal");
  return p(), j(o, {
    active: !0,
    onBlur: t[2] || (t[2] = (l) => e.$emit("close", { action: !1 }))
  }, {
    default: M(() => [
      S("h2", null, N(s.title), 1),
      S("p", null, N(s.message), 1),
      S("div", hu, [
        E(n, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: t[0] || (t[0] = (l) => e.$emit("close", { action: !1 }))
        }, {
          default: M(() => [
            G(N(s.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        E(n, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: t[1] || (t[1] = (l) => i.proceed())
        }, {
          default: M(() => [
            G(N(s.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const vr = /* @__PURE__ */ R(cu, [["render", fu]]), mu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vr
}, Symbol.toStringTag, { value: "Module" })), yu = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: Je,
      default: null
    },
    route: {
      type: String,
      required: !0
    }
  },
  emits: ["removed", "failed"],
  setup() {
    return {
      destroy: _e.create()
    };
  },
  data() {
    return {
      isVisible: !1
    };
  },
  methods: {
    async onRemove() {
      this.isVisible = !0;
    },
    remove() {
      this.destroy.delete(this.route).then(() => {
        this.$emit("removed"), this.listing && this.listing.reload(), this.isVisible = !1;
      }).catch(() => {
        this.$emit("failed");
      });
    }
  }
}, _u = /* @__PURE__ */ S("i", { class: "fas fa-trash" }, null, -1), gu = { class: "content p-6" }, pu = /* @__PURE__ */ S("h3", { class: "title" }, "Delete", -1), bu = /* @__PURE__ */ S("p", { class: "mb-4" }, "Are you sur you want to delete this record?", -1), wu = { class: "buttons flex gap-6 justify-end" };
function Su(e, t, s, r, a, i) {
  const n = O("o-button"), o = O("w-button"), l = O("o-modal");
  return p(), j(o, {
    class: "button is-danger",
    onClick: t[3] || (t[3] = (h) => i.onRemove())
  }, {
    default: M(() => [
      K(e.$slots, "button", {}, () => [
        _u
      ]),
      a.isVisible ? (p(), j(Tr, {
        key: 0,
        to: "body"
      }, [
        E(l, {
          active: a.isVisible,
          "onUpdate:active": t[2] || (t[2] = (h) => a.isVisible = h)
        }, {
          default: M(() => [
            S("div", gu, [
              K(e.$slots, "title", {}, () => [
                pu
              ]),
              K(e.$slots, "message", {}, () => [
                bu
              ]),
              S("div", wu, [
                E(n, {
                  class: "button is-secondary",
                  onClick: t[0] || (t[0] = (h) => a.isVisible = !1)
                }, {
                  default: M(() => [
                    G("Cancel")
                  ]),
                  _: 1
                }),
                E(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: t[1] || (t[1] = (h) => i.remove())
                }, {
                  default: M(() => [
                    K(e.$slots, "confirm", {}, () => [
                      G("Confirm")
                    ])
                  ]),
                  _: 3
                }, 8, ["loading"])
              ])
            ])
          ]),
          _: 3
        }, 8, ["active"])
      ])) : C("", !0)
    ]),
    _: 3
  });
}
const vu = /* @__PURE__ */ R(yu, [["render", Su]]), ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vu
}, Symbol.toStringTag, { value: "Module" })), Ou = {
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
      type: _e,
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
}, Mu = ["value"];
function Du(e, t, s, r, a, i) {
  var l;
  const n = O("o-select"), o = O("o-field");
  return p(), j(o, Re({ label: s.label }, (l = s.form) == null ? void 0 : l.getError(s.name)), {
    default: M(() => [
      E(n, {
        disabled: s.disabled,
        "model-value": s.modelValue,
        name: s.name,
        placeholder: s.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (h) => i.updateValue(h))
      }, {
        default: M(() => [
          K(e.$slots, "default", {}, () => [
            s.items ? (p(!0), L(Et, { key: 0 }, bs(s.items, (h) => (p(), L("option", {
              key: h.value,
              value: h.value
            }, N(h.label), 9, Mu))), 128)) : C("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Yu = /* @__PURE__ */ R(Ou, [["render", Du]]), xu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yu
}, Symbol.toStringTag, { value: "Module" })), Tu = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: _e,
      required: !0
    },
    labels: {
      type: Object,
      default() {
        return {
          submit: "Submit",
          submitting: "Processing",
          submitted: "Complete",
          failed: "Retry"
        };
      }
    }
  },
  data() {
    return {
      mergedLabels: {
        submit: "Submit",
        submitting: "Processing",
        submitted: "Complete",
        failed: "Retry"
      }
    };
  },
  watch: {
    labels: {
      deep: !0,
      handler(e) {
        this.mergedLabels = { ...this.mergedLabels, ...e };
      }
    }
  },
  created() {
    this.mergedLabels = { ...this.mergedLabels, ...this.labels };
  }
}, Fu = { key: 0 }, Pu = { key: 1 }, Wu = /* @__PURE__ */ S("i", { class: "fas fa-spinner fa-spin" }, null, -1), Ru = { key: 2 }, Nu = { key: 3 };
function Cu(e, t, s, r, a, i) {
  const n = O("o-button");
  return p(), j(n, {
    disabled: !!(s.form.isSubmitting || s.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: M(() => [
      !s.form.isSubmitted && !s.form.isSubmitting && !s.form.isSubmitFailed ? (p(), L("span", Fu, N(a.mergedLabels.submit), 1)) : C("", !0),
      s.form.isSubmitting ? (p(), L("span", Pu, [
        G(N(a.mergedLabels.submitting) + " ", 1),
        Wu
      ])) : C("", !0),
      s.form.isSubmitted ? (p(), L("span", Ru, N(a.mergedLabels.submitted), 1)) : C("", !0),
      s.form.isSubmitFailed ? (p(), L("span", Nu, N(a.mergedLabels.failed), 1)) : C("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Lu = /* @__PURE__ */ R(Tu, [["render", Cu]]), Eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lu
}, Symbol.toStringTag, { value: "Module" }));
class os {
  constructor(t = {}) {
    y(this, "state", new q());
    y(this, "result", Ve([]));
    y(this, "value", Ve(null));
    y(this, "timeout", null);
    y(this, "options", {
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
    return new os(t);
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
      const r = t || this.options.url, { data: a } = await P.post(`${r}/search`, s || this.options.payload, {
        signal: this.controller.signal
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = a.result, this.state.loaded();
    }, 500);
  }
  async restore(t, s) {
    this.state.loading(), this.reset();
    const r = t || this.options.url, { data: a } = await P.post(`${r}/restore`, s || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), a;
  }
  reset() {
    this.result.value = [];
  }
}
const Iu = {
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
      search: os.create()
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
function ju(e, t, s, r, a, i) {
  const n = O("o-inputitems");
  return p(), j(n, Re({
    ref: "tagInput",
    modelValue: a.query,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => a.query = o),
    data: r.search.result.value,
    "allow-autocomplete": ""
  }, e.$attrs, {
    onAdd: t[1] || (t[1] = (o) => i.addedTag(o)),
    onRemove: t[2] || (t[2] = (o) => i.removedTag(o)),
    onTyping: t[3] || (t[3] = (o) => i.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const Uu = /* @__PURE__ */ R(Iu, [["render", ju]]), Vu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Uu
}, Symbol.toStringTag, { value: "Module" }));
class $u {
  constructor() {
    y(this, "attributes", H({
      user: null
    }));
    y(this, "state", new q());
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
    this.state.loading(), await P.get("/sanctum/csrf-cookie").catch((s) => {
      throw this.state.failed(), s;
    });
    const { data: t } = await P.get("/api/user");
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
    this.attributes = H({
      user: null
    });
  }
}
const Qu = new $u();
async function Ku(e = {}) {
  const { oruga: t } = It();
  return (await t.modal.open({
    component: vr,
    props: Object.assign(
      {
        title: "Confirm",
        message: "Are you sure you want proceed?",
        confirmText: "Yes",
        cancelText: "Cancel"
      },
      e
    ),
    trapFocus: !0
  }).promise).action;
}
const Au = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class qu {
  constructor() {
    y(this, "FORMATS", Au);
  }
  format(t, s, r = "") {
    return t ? d(t).format(s) : r;
  }
}
const Xu = new qu();
class ed {
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
class kr {
  constructor() {
    y(this, "state", Ve(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new kr();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class td {
  static create(t, s = null, r = null) {
    return s = s || t, {
      value: t,
      label: s
    };
  }
}
class sd {
  constructor() {
    y(this, "structure", {});
    y(this, "query", H({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    y(this, "params", H({
      page: 1
    }));
    y(this, "router", null);
  }
  static create(t, s = {}, r = {}, a) {
    r = Object.assign(
      { base: "/api/admin", route: `${t}.index` },
      r
    );
    const i = r.base, n = {
      route: r.route,
      index: r.index || `${i}/${t}/index`,
      destroy: `${i}/${t}/destroy`
    }, o = new this();
    return o.options = r, o.structure = s, o.params = Object.assign(o.params, s), o.router = a, o.urls = n, o;
  }
  async fetch(t) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: s } = await P.get(t || this.urls.index, {
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
  async action(t, { row: s, index: r, remove: a, method: i }, n = {}) {
    s.isProcessing = !0;
    const o = {
      id: s.id,
      ...n
    };
    if (i === "delete") {
      const { data: l } = await P.delete(t, {
        data: o
      }).catch((h) => {
        throw s.isProcessing = !1, h;
      });
      s.isProcessing = !1, l.row && Object.assign(s, l.row);
    } else {
      const { data: l } = await P.post(t, o).catch((h) => {
        throw s.isProcessing = !1, h;
      });
      s.isProcessing = !1, l.row && Object.assign(s, l.row);
    }
    if (a) {
      const l = await this.fetch();
      if (this.query.items.splice(r, 1), !l.query.items.length) {
        this.params.page--, await this.load();
        return;
      }
      this.query.items.length < l.query.items.length && this.query.items.push(l.query.items[l.query.items.length - 1]);
    }
  }
  destroy(t, s) {
    return this.action(this.urls.destroy, { ...t, remove: !0 }, s);
  }
  async resetFilter(t = null) {
    Object.assign(this.params, this.structure), this.query.isFilterActive = !1, await this.load(t);
  }
}
class rd {
  constructor(t) {
    y(this, "current", Ve(null));
    y(this, "history", Ve([]));
    y(this, "flow", []);
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
function ad(e) {
  const { oruga: t } = It();
  t.notification.open({
    message: e || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class Or {
  constructor(t) {
    y(this, "attributes", H({
      name: null
    }));
    y(this, "callbacks", {});
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
    return new Or(t);
  }
}
function Hu(e) {
  P.interceptors.response.use(null, (t) => Lt(t, e));
}
const Ot = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Cr, "./components/WyxosCollection.vue": Ur, "./components/WyxosConfirm.vue": Br, "./components/WyxosDatepicker.vue": el, "./components/WyxosError.vue": nl, "./components/WyxosForm.vue": wl, "./components/WyxosImage.vue": Ml, "./components/WyxosInput.vue": Tl, "./components/WyxosListing.vue": Ll, "./components/WyxosLiveInput.vue": Ul, "./components/WyxosLogout.vue": au, "./components/WyxosProgress.vue": du, "./components/WyxosPrompt.vue": mu, "./components/WyxosRemove.vue": ku, "./components/WyxosSelect.vue": xu, "./components/WyxosSessionExpired.vue": Gl, "./components/WyxosSubmit.vue": Eu, "./components/WyxosTags.vue": Vu, "./components/WyxosTokenExpired.vue": eu }), Mr = {}, zu = (e, t = { vision: {}, oruga: {} }) => {
  e.use(Fr, t.oruga), Object.keys(Ot).forEach((s) => {
    const r = Ot[s].default.name, a = Ot[s].default;
    e.component(r, a), e.component(r.replace("Wyxos", "W"), a), Mr[r] = a;
  }), e.config.globalProperties.$v = {
    to: (s, r) => ({
      name: s,
      params: r
    })
  }, Hu(t);
}, id = {
  install: zu,
  ...Mr
};
export {
  ed as FileRequest,
  _e as FormBuilder,
  Je as Listing,
  q as LoadState,
  kr as Modal,
  td as Option,
  sd as ResourceList,
  os as Search,
  rd as Steps,
  Or as Tab,
  Nr as WyxosButton,
  jr as WyxosCollection,
  Gr as WyxosConfirm,
  Xo as WyxosDatepicker,
  il as WyxosError,
  bl as WyxosForm,
  Ol as WyxosImage,
  xl as WyxosInput,
  Cl as WyxosListing,
  jl as WyxosLiveInput,
  ru as WyxosLogout,
  uu as WyxosProgress,
  vr as WyxosPrompt,
  vu as WyxosRemove,
  Yu as WyxosSelect,
  wr as WyxosSessionExpired,
  Lu as WyxosSubmit,
  Uu as WyxosTags,
  Sr as WyxosTokenExpired,
  Qu as auth,
  Ku as confirm,
  Xu as dateRender,
  id as default,
  Lt as errorHandler,
  ad as success,
  Ne as useFormErrors
};
