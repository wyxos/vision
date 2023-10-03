var Mr = Object.defineProperty;
var Dr = (e, t, s) => t in e ? Mr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var _ = (e, t, s) => (Dr(e, typeof t != "symbol" ? t + "" : t, s), s);
import T from "axios";
import { reactive as V, resolveComponent as F, openBlock as S, createBlock as X, withCtx as N, createElementBlock as R, toDisplayString as W, createCommentVNode as J, createTextVNode as he, createElementVNode as D, renderSlot as qe, normalizeProps as Ot, guardReactiveProps as Mt, createVNode as q, normalizeClass as ms, mergeProps as Ie, defineComponent as ys, withModifiers as _s, createSlots as Yr, renderList as gs, Fragment as ps, ref as je } from "vue";
import xr, { useProgrammatic as bs } from "@oruga-ui/oruga-next";
const we = V({
  default: []
});
function Ue() {
  return {
    createBag(e) {
      we[e] || (we[e] = []);
    },
    set(e, t = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      we[t] = Object.keys(e.response.data.errors).map((r) => ({
        key: r,
        message: e.response.data.errors[r][0]
      }));
    },
    get(e, t = "default") {
      const s = we[t];
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
        const s = we[t];
        if (!s) {
          console.warn(`Bag ${t} is not defined.`);
          return;
        }
        const r = s.findIndex((a) => a.key === e);
        s.splice(r, 1);
        return;
      }
      we[t] = [];
    },
    all(e = "default") {
      return we[e];
    }
  };
}
class A {
  constructor() {
    _(this, "state", V({
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
    return new A();
  }
}
class Oe {
  constructor(t = {}) {
    _(this, "errors", null);
    _(this, "errorBag", "default");
    _(this, "model", V({}));
    _(this, "form", V({}));
    _(this, "original", {});
    _(this, "states", {
      load: A.create(),
      submit: A.create()
    });
    _(this, "paths", {
      load: null,
      submit: null
    });
    return this.errors = Ue(), this.errors.createBag(this.errorBag), this.setAttributes(t), this.loaded(), new Proxy(this, {
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
            for (let u = 0; u < n.length - 1; u++)
              n[u] in o || (o[n[u]] = {}), o = o[n[u]];
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
  setSubmit(t) {
    return this.paths.submit = t, this;
  }
  setErrors(t) {
    this.errorBag = t || "default", this.errors = Ue(), this.errors.createBag(this.errorBag);
  }
  setAttributes(t) {
    this.original = t, this.form = V({ ...t });
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
      throw Error("No valid URL defined for submti method.");
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
    this.clearErrors(), this.submitting();
    const i = r ? r(this.form) : { ...this.form };
    let n;
    return ["get", "delete"].includes(t) ? (a.params = i, n = T[t](s, a)) : n = T[t](s, i, a), n.then((o) => (this.clearErrors(), this.submitted(), setTimeout(() => this.states.submit.reset(), 2e3), o.data)).catch((o) => (this.submitFailed(), this.errors.set(o, this.errorBag), Promise.reject(o)));
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
      const { data: i } = await T.get(t || this.paths.load, a);
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
const C = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, a] of t)
    s[r] = a;
  return s;
}, Tr = {
  name: "WyxosButton",
  props: {
    form: {
      type: Oe,
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
}, Fr = { key: 0 }, Pr = { key: 1 }, Nr = /* @__PURE__ */ D("i", { class: "fas fa-spinner fa-spin" }, null, -1), Wr = { key: 2 }, Rr = { key: 3 };
function Lr(e, t, s, r, a, i) {
  const n = F("o-button");
  return S(), X(n, {
    disabled: !!(s.form.isSubmitting || s.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: N(() => [
      !s.form.isSubmitted && !s.form.isSubmitting && !s.form.isSubmitFailed ? (S(), R("span", Fr, W(a.mergedLabels.submit), 1)) : J("", !0),
      s.form.isSubmitting ? (S(), R("span", Pr, [
        he(W(a.mergedLabels.submitting) + " ", 1),
        Nr
      ])) : J("", !0),
      s.form.isSubmitted ? (S(), R("span", Wr, W(a.mergedLabels.submitted), 1)) : J("", !0),
      s.form.isSubmitFailed ? (S(), R("span", Rr, W(a.mergedLabels.failed), 1)) : J("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Cr = /* @__PURE__ */ C(Tr, [["render", Lr]]), Er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cr
}, Symbol.toStringTag, { value: "Module" })), Ir = {
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
}, jr = /* @__PURE__ */ D("ul", null, [
  /* @__PURE__ */ D("li")
], -1);
function Ur(e, t, s, r, a, i) {
  return qe(e.$slots, "default", Ot(Mt({ add: i.add, remove: i.remove, items: a.items })), () => [
    jr
  ]);
}
const Ar = /* @__PURE__ */ C(Ir, [["render", Ur]]), Vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ar
}, Symbol.toStringTag, { value: "Module" })), $r = {
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
      state: new A()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, qr = { class: "bg-white p-6" }, Hr = { class: "title" }, zr = { class: "mb-6" }, Gr = {
  class: "buttons",
  role: "group"
};
function Br(e, t, s, r, a, i) {
  const n = F("wyxos-button"), o = F("o-modal");
  return S(), X(o, {
    active: !0,
    onClose: t[2] || (t[2] = (u) => e.$emit("close", { action: !1 }))
  }, {
    default: N(() => [
      D("section", qr, [
        D("article", null, [
          D("header", null, [
            D("h3", Hr, W(s.title), 1)
          ]),
          D("p", zr, W(s.message), 1),
          D("footer", Gr, [
            q(n, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
            }, {
              default: N(() => [
                he(W(s.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            q(n, {
              class: ms([{ [s.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: t[1] || (t[1] = (u) => i.proceed())
            }, {
              default: N(() => [
                he(W(s.confirmText), 1)
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
const Jr = /* @__PURE__ */ C($r, [["render", Br]]), Zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jr
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
function Qr(e) {
  ws = e;
}
function Q(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function ke(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function p(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ct(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (p(e, t))
      return !1;
  return !0;
}
function U(e) {
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
function ge(e, t) {
  for (var s in t)
    p(t, s) && (e[s] = t[s]);
  return p(t, "toString") && (e.toString = t.toString), p(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function re(e, t, s, r) {
  return Hs(e, t, s, r, !0).utc();
}
function Kr() {
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
  return e._pf == null && (e._pf = Kr()), e._pf;
}
var Dt;
Array.prototype.some ? Dt = Array.prototype.some : Dt = function(e) {
  var t = Object(this), s = t.length >>> 0, r;
  for (r = 0; r < s; r++)
    if (r in t && e.call(this, t[r], r, t))
      return !0;
  return !1;
};
function Et(e) {
  if (e._isValid == null) {
    var t = m(e), s = Dt.call(t.parsedDateParts, function(a) {
      return a != null;
    }), r = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && s);
    if (e._strict && (r = r && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = r;
    else
      return r;
  }
  return e._isValid;
}
function nt(e) {
  var t = re(NaN);
  return e != null ? ge(m(t), e) : m(t).userInvalidated = !0, t;
}
var is = d.momentProperties = [], bt = !1;
function It(e, t) {
  var s, r, a, i = is.length;
  if (U(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), U(t._i) || (e._i = t._i), U(t._f) || (e._f = t._f), U(t._l) || (e._l = t._l), U(t._strict) || (e._strict = t._strict), U(t._tzm) || (e._tzm = t._tzm), U(t._isUTC) || (e._isUTC = t._isUTC), U(t._offset) || (e._offset = t._offset), U(t._pf) || (e._pf = m(t)), U(t._locale) || (e._locale = t._locale), i > 0)
    for (s = 0; s < i; s++)
      r = is[s], a = t[r], U(a) || (e[r] = a);
  return e;
}
function ze(e) {
  It(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), bt === !1 && (bt = !0, d.updateOffset(this), bt = !1);
}
function K(e) {
  return e instanceof ze || e != null && e._isAMomentObject != null;
}
function vs(e) {
  d.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function G(e, t) {
  var s = !0;
  return ge(function() {
    if (d.deprecationHandler != null && d.deprecationHandler(null, e), s) {
      var r = [], a, i, n, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (a = "", typeof arguments[i] == "object") {
          a += `
[` + i + "] ";
          for (n in arguments[0])
            p(arguments[0], n) && (a += n + ": " + arguments[0][n] + ", ");
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
var ns = {};
function ks(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t), ns[e] || (vs(t), ns[e] = !0);
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function ae(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Xr(e) {
  var t, s;
  for (s in e)
    p(e, s) && (t = e[s], ae(t) ? this[s] = t : this["_" + s] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function Yt(e, t) {
  var s = ge({}, e), r;
  for (r in t)
    p(t, r) && (ke(e[r]) && ke(t[r]) ? (s[r] = {}, ge(s[r], e[r]), ge(s[r], t[r])) : t[r] != null ? s[r] = t[r] : delete s[r]);
  for (r in e)
    p(e, r) && !p(t, r) && ke(e[r]) && (s[r] = ge({}, s[r]));
  return s;
}
function jt(e) {
  e != null && this.set(e);
}
var xt;
Object.keys ? xt = Object.keys : xt = function(e) {
  var t, s = [];
  for (t in e)
    p(e, t) && s.push(t);
  return s;
};
var ea = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function ta(e, t, s) {
  var r = this._calendar[e] || this._calendar.sameElse;
  return ae(r) ? r.call(t, s) : r;
}
function se(e, t, s) {
  var r = "" + Math.abs(e), a = t - r.length, i = e >= 0;
  return (i ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + r;
}
var Ut = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Je = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, wt = {}, Te = {};
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
function sa(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function ra(e) {
  var t = e.match(Ut), s, r;
  for (s = 0, r = t.length; s < r; s++)
    Te[t[s]] ? t[s] = Te[t[s]] : t[s] = sa(t[s]);
  return function(a) {
    var i = "", n;
    for (n = 0; n < r; n++)
      i += ae(t[n]) ? t[n].call(a, e) : t[n];
    return i;
  };
}
function Qe(e, t) {
  return e.isValid() ? (t = Os(t, e.localeData()), wt[t] = wt[t] || ra(t), wt[t](e)) : e.localeData().invalidDate();
}
function Os(e, t) {
  var s = 5;
  function r(a) {
    return t.longDateFormat(a) || a;
  }
  for (Je.lastIndex = 0; s >= 0 && Je.test(e); )
    e = e.replace(
      Je,
      r
    ), Je.lastIndex = 0, s -= 1;
  return e;
}
var aa = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function ia(e) {
  var t = this._longDateFormat[e], s = this._longDateFormat[e.toUpperCase()];
  return t || !s ? t : (this._longDateFormat[e] = s.match(Ut).map(function(r) {
    return r === "MMMM" || r === "MM" || r === "DD" || r === "dddd" ? r.slice(1) : r;
  }).join(""), this._longDateFormat[e]);
}
var na = "Invalid date";
function oa() {
  return this._invalidDate;
}
var la = "%d", ua = /\d{1,2}/;
function da(e) {
  return this._ordinal.replace("%d", e);
}
var ha = {
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
function ca(e, t, s, r) {
  var a = this._relativeTime[s];
  return ae(a) ? a(e, t, s, r) : a.replace(/%d/i, e);
}
function fa(e, t) {
  var s = this._relativeTime[e > 0 ? "future" : "past"];
  return ae(s) ? s(t) : s.replace(/%s/i, t);
}
var Ce = {};
function E(e, t) {
  var s = e.toLowerCase();
  Ce[s] = Ce[s + "s"] = Ce[t] = e;
}
function B(e) {
  return typeof e == "string" ? Ce[e] || Ce[e.toLowerCase()] : void 0;
}
function At(e) {
  var t = {}, s, r;
  for (r in e)
    p(e, r) && (s = B(r), s && (t[s] = e[r]));
  return t;
}
var Ms = {};
function I(e, t) {
  Ms[e] = t;
}
function ma(e) {
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
function z(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function y(e) {
  var t = +e, s = 0;
  return t !== 0 && isFinite(t) && (s = z(t)), s;
}
function Ne(e, t) {
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
function ya(e) {
  return e = B(e), ae(this[e]) ? this[e]() : this;
}
function _a(e, t) {
  if (typeof e == "object") {
    e = At(e);
    var s = ma(e), r, a = s.length;
    for (r = 0; r < a; r++)
      this[s[r].unit](e[s[r].unit]);
  } else if (e = B(e), ae(this[e]))
    return this[e](t);
  return this;
}
var Ys = /\d/, H = /\d\d/, xs = /\d{3}/, Vt = /\d{4}/, lt = /[+-]?\d{6}/, O = /\d\d?/, Ts = /\d\d\d\d?/, Fs = /\d\d\d\d\d\d?/, ut = /\d{1,3}/, $t = /\d{1,4}/, dt = /[+-]?\d{1,6}/, We = /\d+/, ht = /[+-]?\d+/, ga = /Z|[+-]\d\d:?\d\d/gi, ct = /Z|[+-]\d\d(?::?\d\d)?/gi, pa = /[+-]?\d+(\.\d{1,3})?/, Ge = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, tt;
tt = {};
function h(e, t, s) {
  tt[e] = ae(t) ? t : function(r, a) {
    return r && s ? s : t;
  };
}
function ba(e, t) {
  return p(tt, e) ? tt[e](t._strict, t._locale) : new RegExp(wa(e));
}
function wa(e) {
  return $(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, s, r, a, i) {
        return s || r || a || i;
      }
    )
  );
}
function $(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Tt = {};
function w(e, t) {
  var s, r = t, a;
  for (typeof e == "string" && (e = [e]), ce(t) && (r = function(i, n) {
    n[t] = y(i);
  }), a = e.length, s = 0; s < a; s++)
    Tt[e[s]] = r;
}
function Be(e, t) {
  w(e, function(s, r, a, i) {
    a._w = a._w || {}, t(s, a._w, a, i);
  });
}
function Sa(e, t, s) {
  t != null && p(Tt, e) && Tt[e](t, s._a, s, e);
}
var L = 0, le = 1, te = 2, P = 3, Z = 4, ue = 5, ve = 6, va = 7, ka = 8;
function Oa(e, t) {
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
  var s = Oa(t, 12);
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
E("month", "M");
I("month", 8);
h("M", O);
h("MM", O, H);
h("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
h("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
w(["M", "MM"], function(e, t) {
  t[le] = y(e) - 1;
});
w(["MMM", "MMMM"], function(e, t, s, r) {
  var a = s._locale.monthsParse(e, r, s._strict);
  a != null ? t[le] = a : m(s).invalidMonth = e;
});
var Ma = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ps = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Ns = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Da = Ge, Ya = Ge;
function xa(e, t) {
  return e ? Q(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ns).test(t) ? "format" : "standalone"][e.month()] : Q(this._months) ? this._months : this._months.standalone;
}
function Ta(e, t) {
  return e ? Q(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ns.test(t) ? "format" : "standalone"][e.month()] : Q(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Fa(e, t, s) {
  var r, a, i, n = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r)
      i = re([2e3, r]), this._shortMonthsParse[r] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[r] = this.months(i, "").toLocaleLowerCase();
  return s ? t === "MMM" ? (a = Y.call(this._shortMonthsParse, n), a !== -1 ? a : null) : (a = Y.call(this._longMonthsParse, n), a !== -1 ? a : null) : t === "MMM" ? (a = Y.call(this._shortMonthsParse, n), a !== -1 ? a : (a = Y.call(this._longMonthsParse, n), a !== -1 ? a : null)) : (a = Y.call(this._longMonthsParse, n), a !== -1 ? a : (a = Y.call(this._shortMonthsParse, n), a !== -1 ? a : null));
}
function Pa(e, t, s) {
  var r, a, i;
  if (this._monthsParseExact)
    return Fa.call(this, e, t, s);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++) {
    if (a = re([2e3, r]), s && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp(
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
function Ws(e, t) {
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
  return e != null ? (Ws(this, e), d.updateOffset(this, !0), this) : et(this, "Month");
}
function Na() {
  return ft(this.year(), this.month());
}
function Wa(e) {
  return this._monthsParseExact ? (p(this, "_monthsRegex") || Ls.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (p(this, "_monthsShortRegex") || (this._monthsShortRegex = Da), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Ra(e) {
  return this._monthsParseExact ? (p(this, "_monthsRegex") || Ls.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (p(this, "_monthsRegex") || (this._monthsRegex = Ya), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Ls() {
  function e(n, o) {
    return o.length - n.length;
  }
  var t = [], s = [], r = [], a, i;
  for (a = 0; a < 12; a++)
    i = re([2e3, a]), t.push(this.monthsShort(i, "")), s.push(this.months(i, "")), r.push(this.months(i, "")), r.push(this.monthsShort(i, ""));
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
E("year", "y");
I("year", 1);
h("Y", ht);
h("YY", O, H);
h("YYYY", $t, Vt);
h("YYYYY", dt, lt);
h("YYYYYY", dt, lt);
w(["YYYYY", "YYYYYY"], L);
w("YYYY", function(e, t) {
  t[L] = e.length === 2 ? d.parseTwoDigitYear(e) : y(e);
});
w("YY", function(e, t) {
  t[L] = d.parseTwoDigitYear(e);
});
w("Y", function(e, t) {
  t[L] = parseInt(e, 10);
});
function Ee(e) {
  return ot(e) ? 366 : 365;
}
d.parseTwoDigitYear = function(e) {
  return y(e) + (y(e) > 68 ? 1900 : 2e3);
};
var Cs = Ne("FullYear", !0);
function La() {
  return ot(this.year());
}
function Ca(e, t, s, r, a, i, n) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, s, r, a, i, n), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, s, r, a, i, n), o;
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
  var i = (7 + s - r) % 7, n = st(e, r, a), o = 1 + 7 * (t - 1) + i + n, u, c;
  return o <= 0 ? (u = e - 1, c = Ee(u) + o) : o > Ee(e) ? (u = e + 1, c = o - Ee(e)) : (u = e, c = o), {
    year: u,
    dayOfYear: c
  };
}
function Ve(e, t, s) {
  var r = st(e.year(), t, s), a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1, i, n;
  return a < 1 ? (n = e.year() - 1, i = a + de(n, t, s)) : a > de(e.year(), t, s) ? (i = a - de(e.year(), t, s), n = e.year() + 1) : (n = e.year(), i = a), {
    week: i,
    year: n
  };
}
function de(e, t, s) {
  var r = st(e, t, s), a = st(e + 1, t, s);
  return (Ee(e) - r + a) / 7;
}
f("w", ["ww", 2], "wo", "week");
f("W", ["WW", 2], "Wo", "isoWeek");
E("week", "w");
E("isoWeek", "W");
I("week", 5);
I("isoWeek", 5);
h("w", O);
h("ww", O, H);
h("W", O);
h("WW", O, H);
Be(
  ["w", "ww", "W", "WW"],
  function(e, t, s, r) {
    t[r.substr(0, 1)] = y(e);
  }
);
function Ea(e) {
  return Ve(e, this._week.dow, this._week.doy).week;
}
var Ia = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function ja() {
  return this._week.dow;
}
function Ua() {
  return this._week.doy;
}
function Aa(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Va(e) {
  var t = Ve(this, 1, 4).week;
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
E("day", "d");
E("weekday", "e");
E("isoWeekday", "E");
I("day", 11);
I("weekday", 11);
I("isoWeekday", 11);
h("d", O);
h("e", O);
h("E", O);
h("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
h("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
h("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
Be(["dd", "ddd", "dddd"], function(e, t, s, r) {
  var a = s._locale.weekdaysParse(e, r, s._strict);
  a != null ? t.d = a : m(s).invalidWeekday = e;
});
Be(["d", "e", "E"], function(e, t, s, r) {
  t[r] = y(e);
});
function $a(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function qa(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function qt(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Ha = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Is = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), za = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Ga = Ge, Ba = Ge, Ja = Ge;
function Za(e, t) {
  var s = Q(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? qt(s, this._week.dow) : e ? s[e.day()] : s;
}
function Qa(e) {
  return e === !0 ? qt(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Ka(e) {
  return e === !0 ? qt(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Xa(e, t, s) {
  var r, a, i, n = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], r = 0; r < 7; ++r)
      i = re([2e3, 1]).day(r), this._minWeekdaysParse[r] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[r] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[r] = this.weekdays(i, "").toLocaleLowerCase();
  return s ? t === "dddd" ? (a = Y.call(this._weekdaysParse, n), a !== -1 ? a : null) : t === "ddd" ? (a = Y.call(this._shortWeekdaysParse, n), a !== -1 ? a : null) : (a = Y.call(this._minWeekdaysParse, n), a !== -1 ? a : null) : t === "dddd" ? (a = Y.call(this._weekdaysParse, n), a !== -1 || (a = Y.call(this._shortWeekdaysParse, n), a !== -1) ? a : (a = Y.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : t === "ddd" ? (a = Y.call(this._shortWeekdaysParse, n), a !== -1 || (a = Y.call(this._weekdaysParse, n), a !== -1) ? a : (a = Y.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : (a = Y.call(this._minWeekdaysParse, n), a !== -1 || (a = Y.call(this._weekdaysParse, n), a !== -1) ? a : (a = Y.call(this._shortWeekdaysParse, n), a !== -1 ? a : null));
}
function ei(e, t, s) {
  var r, a, i;
  if (this._weekdaysParseExact)
    return Xa.call(this, e, t, s);
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
function ti(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = $a(e, this.localeData()), this.add(e - t, "d")) : t;
}
function si(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function ri(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = qa(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function ai(e) {
  return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || Ht.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (p(this, "_weekdaysRegex") || (this._weekdaysRegex = Ga), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function ii(e) {
  return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || Ht.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (p(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Ba), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function ni(e) {
  return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || Ht.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (p(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ja), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Ht() {
  function e(v, j) {
    return j.length - v.length;
  }
  var t = [], s = [], r = [], a = [], i, n, o, u, c;
  for (i = 0; i < 7; i++)
    n = re([2e3, 1]).day(i), o = $(this.weekdaysMin(n, "")), u = $(this.weekdaysShort(n, "")), c = $(this.weekdays(n, "")), t.push(o), s.push(u), r.push(c), a.push(o), a.push(u), a.push(c);
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
function zt() {
  return this.hours() % 12 || 12;
}
function oi() {
  return this.hours() || 24;
}
f("H", ["HH", 2], 0, "hour");
f("h", ["hh", 2], 0, zt);
f("k", ["kk", 2], 0, oi);
f("hmm", 0, 0, function() {
  return "" + zt.apply(this) + se(this.minutes(), 2);
});
f("hmmss", 0, 0, function() {
  return "" + zt.apply(this) + se(this.minutes(), 2) + se(this.seconds(), 2);
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
E("hour", "h");
I("hour", 13);
function Us(e, t) {
  return t._meridiemParse;
}
h("a", Us);
h("A", Us);
h("H", O);
h("h", O);
h("k", O);
h("HH", O, H);
h("hh", O, H);
h("kk", O, H);
h("hmm", Ts);
h("hmmss", Fs);
h("Hmm", Ts);
h("Hmmss", Fs);
w(["H", "HH"], P);
w(["k", "kk"], function(e, t, s) {
  var r = y(e);
  t[P] = r === 24 ? 0 : r;
});
w(["a", "A"], function(e, t, s) {
  s._isPm = s._locale.isPM(e), s._meridiem = e;
});
w(["h", "hh"], function(e, t, s) {
  t[P] = y(e), m(s).bigHour = !0;
});
w("hmm", function(e, t, s) {
  var r = e.length - 2;
  t[P] = y(e.substr(0, r)), t[Z] = y(e.substr(r)), m(s).bigHour = !0;
});
w("hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[P] = y(e.substr(0, r)), t[Z] = y(e.substr(r, 2)), t[ue] = y(e.substr(a)), m(s).bigHour = !0;
});
w("Hmm", function(e, t, s) {
  var r = e.length - 2;
  t[P] = y(e.substr(0, r)), t[Z] = y(e.substr(r));
});
w("Hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[P] = y(e.substr(0, r)), t[Z] = y(e.substr(r, 2)), t[ue] = y(e.substr(a));
});
function li(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var ui = /[ap]\.?m?\.?/i, di = Ne("Hours", !0);
function hi(e, t, s) {
  return e > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
}
var As = {
  calendar: ea,
  longDateFormat: aa,
  invalidDate: na,
  ordinal: la,
  dayOfMonthOrdinalParse: ua,
  relativeTime: ha,
  months: Ma,
  monthsShort: Ps,
  week: Ia,
  weekdays: Ha,
  weekdaysMin: za,
  weekdaysShort: Is,
  meridiemParse: ui
}, M = {}, Re = {}, $e;
function ci(e, t) {
  var s, r = Math.min(e.length, t.length);
  for (s = 0; s < r; s += 1)
    if (e[s] !== t[s])
      return s;
  return r;
}
function os(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function fi(e) {
  for (var t = 0, s, r, a, i; t < e.length; ) {
    for (i = os(e[t]).split("-"), s = i.length, r = os(e[t + 1]), r = r ? r.split("-") : null; s > 0; ) {
      if (a = mt(i.slice(0, s).join("-")), a)
        return a;
      if (r && r.length >= s && ci(i, r) >= s - 1)
        break;
      s--;
    }
    t++;
  }
  return $e;
}
function mi(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function mt(e) {
  var t = null, s;
  if (M[e] === void 0 && typeof module < "u" && module && module.exports && mi(e))
    try {
      t = $e._abbr, s = require, s("./locale/" + e), be(t);
    } catch {
      M[e] = null;
    }
  return M[e];
}
function be(e, t) {
  var s;
  return e && (U(t) ? s = fe(e) : s = Gt(e, t), s ? $e = s : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), $e._abbr;
}
function Gt(e, t) {
  if (t !== null) {
    var s, r = As;
    if (t.abbr = e, M[e] != null)
      ks(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), r = M[e]._config;
    else if (t.parentLocale != null)
      if (M[t.parentLocale] != null)
        r = M[t.parentLocale]._config;
      else if (s = mt(t.parentLocale), s != null)
        r = s._config;
      else
        return Re[t.parentLocale] || (Re[t.parentLocale] = []), Re[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return M[e] = new jt(Yt(r, t)), Re[e] && Re[e].forEach(function(a) {
      Gt(a.name, a.config);
    }), be(e), M[e];
  } else
    return delete M[e], null;
}
function yi(e, t) {
  if (t != null) {
    var s, r, a = As;
    M[e] != null && M[e].parentLocale != null ? M[e].set(Yt(M[e]._config, t)) : (r = mt(e), r != null && (a = r._config), t = Yt(a, t), r == null && (t.abbr = e), s = new jt(t), s.parentLocale = M[e], M[e] = s), be(e);
  } else
    M[e] != null && (M[e].parentLocale != null ? (M[e] = M[e].parentLocale, e === be() && be(e)) : M[e] != null && delete M[e]);
  return M[e];
}
function fe(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return $e;
  if (!Q(e)) {
    if (t = mt(e), t)
      return t;
    e = [e];
  }
  return fi(e);
}
function _i() {
  return xt(M);
}
function Bt(e) {
  var t, s = e._a;
  return s && m(e).overflow === -2 && (t = s[le] < 0 || s[le] > 11 ? le : s[te] < 1 || s[te] > ft(s[L], s[le]) ? te : s[P] < 0 || s[P] > 24 || s[P] === 24 && (s[Z] !== 0 || s[ue] !== 0 || s[ve] !== 0) ? P : s[Z] < 0 || s[Z] > 59 ? Z : s[ue] < 0 || s[ue] > 59 ? ue : s[ve] < 0 || s[ve] > 999 ? ve : -1, m(e)._overflowDayOfYear && (t < L || t > te) && (t = te), m(e)._overflowWeeks && t === -1 && (t = va), m(e)._overflowWeekday && t === -1 && (t = ka), m(e).overflow = t), e;
}
var gi = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, pi = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, bi = /Z|[+-]\d\d(?::?\d\d)?/, Ze = [
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
], St = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], wi = /^\/?Date\((-?\d+)/i, Si = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, vi = {
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
function Vs(e) {
  var t, s, r = e._i, a = gi.exec(r) || pi.exec(r), i, n, o, u, c = Ze.length, v = St.length;
  if (a) {
    for (m(e).iso = !0, t = 0, s = c; t < s; t++)
      if (Ze[t][1].exec(a[1])) {
        n = Ze[t][0], i = Ze[t][2] !== !1;
        break;
      }
    if (n == null) {
      e._isValid = !1;
      return;
    }
    if (a[3]) {
      for (t = 0, s = v; t < s; t++)
        if (St[t][1].exec(a[3])) {
          o = (a[2] || " ") + St[t][0];
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
      if (bi.exec(a[4]))
        u = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = n + (o || "") + (u || ""), Zt(e);
  } else
    e._isValid = !1;
}
function ki(e, t, s, r, a, i) {
  var n = [
    Oi(e),
    Ps.indexOf(t),
    parseInt(s, 10),
    parseInt(r, 10),
    parseInt(a, 10)
  ];
  return i && n.push(parseInt(i, 10)), n;
}
function Oi(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Mi(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Di(e, t, s) {
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
function Yi(e, t, s) {
  if (e)
    return vi[e];
  if (t)
    return 0;
  var r = parseInt(s, 10), a = r % 100, i = (r - a) / 100;
  return i * 60 + a;
}
function $s(e) {
  var t = Si.exec(Mi(e._i)), s;
  if (t) {
    if (s = ki(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !Di(t[1], s, e))
      return;
    e._a = s, e._tzm = Yi(t[8], t[9], t[10]), e._d = Ae.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), m(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function xi(e) {
  var t = wi.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (Vs(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if ($s(e), e._isValid === !1)
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
function Ye(e, t, s) {
  return e ?? t ?? s;
}
function Ti(e) {
  var t = new Date(d.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Jt(e) {
  var t, s, r = [], a, i, n;
  if (!e._d) {
    for (a = Ti(e), e._w && e._a[te] == null && e._a[le] == null && Fi(e), e._dayOfYear != null && (n = Ye(e._a[L], a[L]), (e._dayOfYear > Ee(n) || e._dayOfYear === 0) && (m(e)._overflowDayOfYear = !0), s = Ae(n, 0, e._dayOfYear), e._a[le] = s.getUTCMonth(), e._a[te] = s.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = r[t] = a[t];
    for (; t < 7; t++)
      e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[P] === 24 && e._a[Z] === 0 && e._a[ue] === 0 && e._a[ve] === 0 && (e._nextDay = !0, e._a[P] = 0), e._d = (e._useUTC ? Ae : Ca).apply(
      null,
      r
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[P] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (m(e).weekdayMismatch = !0);
  }
}
function Fi(e) {
  var t, s, r, a, i, n, o, u, c;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, n = 4, s = Ye(
    t.GG,
    e._a[L],
    Ve(k(), 1, 4).year
  ), r = Ye(t.W, 1), a = Ye(t.E, 1), (a < 1 || a > 7) && (u = !0)) : (i = e._locale._week.dow, n = e._locale._week.doy, c = Ve(k(), i, n), s = Ye(t.gg, e._a[L], c.year), r = Ye(t.w, c.week), t.d != null ? (a = t.d, (a < 0 || a > 6) && (u = !0)) : t.e != null ? (a = t.e + i, (t.e < 0 || t.e > 6) && (u = !0)) : a = i), r < 1 || r > de(s, i, n) ? m(e)._overflowWeeks = !0 : u != null ? m(e)._overflowWeekday = !0 : (o = Es(s, r, a, i, n), e._a[L] = o.year, e._dayOfYear = o.dayOfYear);
}
d.ISO_8601 = function() {
};
d.RFC_2822 = function() {
};
function Zt(e) {
  if (e._f === d.ISO_8601) {
    Vs(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    $s(e);
    return;
  }
  e._a = [], m(e).empty = !0;
  var t = "" + e._i, s, r, a, i, n, o = t.length, u = 0, c, v;
  for (a = Os(e._f, e._locale).match(Ut) || [], v = a.length, s = 0; s < v; s++)
    i = a[s], r = (t.match(ba(i, e)) || [])[0], r && (n = t.substr(0, t.indexOf(r)), n.length > 0 && m(e).unusedInput.push(n), t = t.slice(
      t.indexOf(r) + r.length
    ), u += r.length), Te[i] ? (r ? m(e).empty = !1 : m(e).unusedTokens.push(i), Sa(i, r, e)) : e._strict && !r && m(e).unusedTokens.push(i);
  m(e).charsLeftOver = o - u, t.length > 0 && m(e).unusedInput.push(t), e._a[P] <= 12 && m(e).bigHour === !0 && e._a[P] > 0 && (m(e).bigHour = void 0), m(e).parsedDateParts = e._a.slice(0), m(e).meridiem = e._meridiem, e._a[P] = Pi(
    e._locale,
    e._a[P],
    e._meridiem
  ), c = m(e).era, c !== null && (e._a[L] = e._locale.erasConvertYear(c, e._a[L])), Jt(e), Bt(e);
}
function Pi(e, t, s) {
  var r;
  return s == null ? t : e.meridiemHour != null ? e.meridiemHour(t, s) : (e.isPM != null && (r = e.isPM(s), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function Ni(e) {
  var t, s, r, a, i, n, o = !1, u = e._f.length;
  if (u === 0) {
    m(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (a = 0; a < u; a++)
    i = 0, n = !1, t = It({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[a], Zt(t), Et(t) && (n = !0), i += m(t).charsLeftOver, i += m(t).unusedTokens.length * 10, m(t).score = i, o ? i < r && (r = i, s = t) : (r == null || i < r || n) && (r = i, s = t, n && (o = !0));
  ge(e, s || t);
}
function Wi(e) {
  if (!e._d) {
    var t = At(e._i), s = t.day === void 0 ? t.date : t.day;
    e._a = Ss(
      [t.year, t.month, s, t.hour, t.minute, t.second, t.millisecond],
      function(r) {
        return r && parseInt(r, 10);
      }
    ), Jt(e);
  }
}
function Ri(e) {
  var t = new ze(Bt(qs(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function qs(e) {
  var t = e._i, s = e._f;
  return e._locale = e._locale || fe(e._l), t === null || s === void 0 && t === "" ? nt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), K(t) ? new ze(Bt(t)) : (He(t) ? e._d = t : Q(s) ? Ni(e) : s ? Zt(e) : Li(e), Et(e) || (e._d = null), e));
}
function Li(e) {
  var t = e._i;
  U(t) ? e._d = new Date(d.now()) : He(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? xi(e) : Q(t) ? (e._a = Ss(t.slice(0), function(s) {
    return parseInt(s, 10);
  }), Jt(e)) : ke(t) ? Wi(e) : ce(t) ? e._d = new Date(t) : d.createFromInputFallback(e);
}
function Hs(e, t, s, r, a) {
  var i = {};
  return (t === !0 || t === !1) && (r = t, t = void 0), (s === !0 || s === !1) && (r = s, s = void 0), (ke(e) && Ct(e) || Q(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = a, i._l = s, i._i = e, i._f = t, i._strict = r, Ri(i);
}
function k(e, t, s, r) {
  return Hs(e, t, s, r, !1);
}
var Ci = G(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = k.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : nt();
  }
), Ei = G(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = k.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : nt();
  }
);
function zs(e, t) {
  var s, r;
  if (t.length === 1 && Q(t[0]) && (t = t[0]), !t.length)
    return k();
  for (s = t[0], r = 1; r < t.length; ++r)
    (!t[r].isValid() || t[r][e](s)) && (s = t[r]);
  return s;
}
function Ii() {
  var e = [].slice.call(arguments, 0);
  return zs("isBefore", e);
}
function ji() {
  var e = [].slice.call(arguments, 0);
  return zs("isAfter", e);
}
var Ui = function() {
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
function Ai(e) {
  var t, s = !1, r, a = Le.length;
  for (t in e)
    if (p(e, t) && !(Y.call(Le, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (r = 0; r < a; ++r)
    if (e[Le[r]]) {
      if (s)
        return !1;
      parseFloat(e[Le[r]]) !== y(e[Le[r]]) && (s = !0);
    }
  return !0;
}
function Vi() {
  return this._isValid;
}
function $i() {
  return ee(NaN);
}
function yt(e) {
  var t = At(e), s = t.year || 0, r = t.quarter || 0, a = t.month || 0, i = t.week || t.isoWeek || 0, n = t.day || 0, o = t.hour || 0, u = t.minute || 0, c = t.second || 0, v = t.millisecond || 0;
  this._isValid = Ai(t), this._milliseconds = +v + c * 1e3 + // 1000
  u * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +n + i * 7, this._months = +a + r * 3 + s * 12, this._data = {}, this._locale = fe(), this._bubble();
}
function Ke(e) {
  return e instanceof yt;
}
function Ft(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function qi(e, t, s) {
  var r = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), i = 0, n;
  for (n = 0; n < r; n++)
    (s && e[n] !== t[n] || !s && y(e[n]) !== y(t[n])) && i++;
  return i + a;
}
function Gs(e, t) {
  f(e, 0, 0, function() {
    var s = this.utcOffset(), r = "+";
    return s < 0 && (s = -s, r = "-"), r + se(~~(s / 60), 2) + t + se(~~s % 60, 2);
  });
}
Gs("Z", ":");
Gs("ZZ", "");
h("Z", ct);
h("ZZ", ct);
w(["Z", "ZZ"], function(e, t, s) {
  s._useUTC = !0, s._tzm = Qt(ct, e);
});
var Hi = /([\+\-]|\d\d)/gi;
function Qt(e, t) {
  var s = (t || "").match(e), r, a, i;
  return s === null ? null : (r = s[s.length - 1] || [], a = (r + "").match(Hi) || ["-", 0, 0], i = +(a[1] * 60) + y(a[2]), i === 0 ? 0 : a[0] === "+" ? i : -i);
}
function Kt(e, t) {
  var s, r;
  return t._isUTC ? (s = t.clone(), r = (K(e) || He(e) ? e.valueOf() : k(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + r), d.updateOffset(s, !1), s) : k(e).local();
}
function Pt(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function() {
};
function zi(e, t, s) {
  var r = this._offset || 0, a;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Qt(ct, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !s && (e = e * 60);
    return !this._isUTC && t && (a = Pt(this)), this._offset = e, this._isUTC = !0, a != null && this.add(a, "m"), r !== e && (!t || this._changeInProgress ? Zs(
      this,
      ee(e - r, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, d.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? r : Pt(this);
}
function Gi(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Bi(e) {
  return this.utcOffset(0, e);
}
function Ji(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Pt(this), "m")), this;
}
function Zi() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Qt(ga, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Qi(e) {
  return this.isValid() ? (e = e ? k(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Ki() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Xi() {
  if (!U(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return It(e, this), e = qs(e), e._a ? (t = e._isUTC ? re(e._a) : k(e._a), this._isDSTShifted = this.isValid() && qi(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function en() {
  return this.isValid() ? !this._isUTC : !1;
}
function tn() {
  return this.isValid() ? this._isUTC : !1;
}
function Bs() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var sn = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, rn = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ee(e, t) {
  var s = e, r = null, a, i, n;
  return Ke(e) ? s = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ce(e) || !isNaN(+e) ? (s = {}, t ? s[t] = +e : s.milliseconds = +e) : (r = sn.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: 0,
    d: y(r[te]) * a,
    h: y(r[P]) * a,
    m: y(r[Z]) * a,
    s: y(r[ue]) * a,
    ms: y(Ft(r[ve] * 1e3)) * a
    // the millisecond decimal point is included in the match
  }) : (r = rn.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: Se(r[2], a),
    M: Se(r[3], a),
    w: Se(r[4], a),
    d: Se(r[5], a),
    h: Se(r[6], a),
    m: Se(r[7], a),
    s: Se(r[8], a)
  }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (n = an(
    k(s.from),
    k(s.to)
  ), s = {}, s.ms = n.milliseconds, s.M = n.months), i = new yt(s), Ke(e) && p(e, "_locale") && (i._locale = e._locale), Ke(e) && p(e, "_isValid") && (i._isValid = e._isValid), i;
}
ee.fn = yt.prototype;
ee.invalid = $i;
function Se(e, t) {
  var s = e && parseFloat(e.replace(",", "."));
  return (isNaN(s) ? 0 : s) * t;
}
function ls(e, t) {
  var s = {};
  return s.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(s.months, "M").isAfter(t) && --s.months, s.milliseconds = +t - +e.clone().add(s.months, "M"), s;
}
function an(e, t) {
  var s;
  return e.isValid() && t.isValid() ? (t = Kt(t, e), e.isBefore(t) ? s = ls(e, t) : (s = ls(t, e), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
}
function Js(e, t) {
  return function(s, r) {
    var a, i;
    return r !== null && !isNaN(+r) && (ks(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = s, s = r, r = i), a = ee(s, r), Zs(this, a, e), this;
  };
}
function Zs(e, t, s, r) {
  var a = t._milliseconds, i = Ft(t._days), n = Ft(t._months);
  e.isValid() && (r = r ?? !0, n && Ws(e, et(e, "Month") + n * s), i && Ds(e, "Date", et(e, "Date") + i * s), a && e._d.setTime(e._d.valueOf() + a * s), r && d.updateOffset(e, i || n));
}
var nn = Js(1, "add"), on = Js(-1, "subtract");
function Qs(e) {
  return typeof e == "string" || e instanceof String;
}
function ln(e) {
  return K(e) || He(e) || Qs(e) || ce(e) || dn(e) || un(e) || e === null || e === void 0;
}
function un(e) {
  var t = ke(e) && !Ct(e), s = !1, r = [
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
    i = r[a], s = s || p(e, i);
  return t && s;
}
function dn(e) {
  var t = Q(e), s = !1;
  return t && (s = e.filter(function(r) {
    return !ce(r) && Qs(e);
  }).length === 0), t && s;
}
function hn(e) {
  var t = ke(e) && !Ct(e), s = !1, r = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], a, i;
  for (a = 0; a < r.length; a += 1)
    i = r[a], s = s || p(e, i);
  return t && s;
}
function cn(e, t) {
  var s = e.diff(t, "days", !0);
  return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
}
function fn(e, t) {
  arguments.length === 1 && (arguments[0] ? ln(arguments[0]) ? (e = arguments[0], t = void 0) : hn(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var s = e || k(), r = Kt(s, this).startOf("day"), a = d.calendarFormat(this, r) || "sameElse", i = t && (ae(t[a]) ? t[a].call(this, s) : t[a]);
  return this.format(
    i || this.localeData().calendar(a, this, k(s))
  );
}
function mn() {
  return new ze(this);
}
function yn(e, t) {
  var s = K(e) ? e : k(e);
  return this.isValid() && s.isValid() ? (t = B(t) || "millisecond", t === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function _n(e, t) {
  var s = K(e) ? e : k(e);
  return this.isValid() && s.isValid() ? (t = B(t) || "millisecond", t === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(t).valueOf() < s.valueOf()) : !1;
}
function gn(e, t, s, r) {
  var a = K(e) ? e : k(e), i = K(t) ? t : k(t);
  return this.isValid() && a.isValid() && i.isValid() ? (r = r || "()", (r[0] === "(" ? this.isAfter(a, s) : !this.isBefore(a, s)) && (r[1] === ")" ? this.isBefore(i, s) : !this.isAfter(i, s))) : !1;
}
function pn(e, t) {
  var s = K(e) ? e : k(e), r;
  return this.isValid() && s.isValid() ? (t = B(t) || "millisecond", t === "millisecond" ? this.valueOf() === s.valueOf() : (r = s.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf())) : !1;
}
function bn(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function wn(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Sn(e, t, s) {
  var r, a, i;
  if (!this.isValid())
    return NaN;
  if (r = Kt(e, this), !r.isValid())
    return NaN;
  switch (a = (r.utcOffset() - this.utcOffset()) * 6e4, t = B(t), t) {
    case "year":
      i = Xe(this, r) / 12;
      break;
    case "month":
      i = Xe(this, r);
      break;
    case "quarter":
      i = Xe(this, r) / 3;
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
  return s ? i : z(i);
}
function Xe(e, t) {
  if (e.date() < t.date())
    return -Xe(t, e);
  var s = (t.year() - e.year()) * 12 + (t.month() - e.month()), r = e.clone().add(s, "months"), a, i;
  return t - r < 0 ? (a = e.clone().add(s - 1, "months"), i = (t - r) / (r - a)) : (a = e.clone().add(s + 1, "months"), i = (t - r) / (a - r)), -(s + i) || 0;
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function vn() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function kn(e) {
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
function On() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", s, r, a, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), s = "[" + e + '("]', r = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", a = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(s + r + a + i);
}
function Mn(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = Qe(this, e);
  return this.localeData().postformat(t);
}
function Dn(e, t) {
  return this.isValid() && (K(e) && e.isValid() || k(e).isValid()) ? ee({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Yn(e) {
  return this.from(k(), e);
}
function xn(e, t) {
  return this.isValid() && (K(e) && e.isValid() || k(e).isValid()) ? ee({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function Tn(e) {
  return this.to(k(), e);
}
function Ks(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = fe(e), t != null && (this._locale = t), this);
}
var Xs = G(
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
function Fn(e) {
  var t, s;
  if (e = B(e), e === void 0 || e === "millisecond" || !this.isValid())
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
function Pn(e) {
  var t, s;
  if (e = B(e), e === void 0 || e === "millisecond" || !this.isValid())
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
function Nn() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function Wn() {
  return Math.floor(this.valueOf() / 1e3);
}
function Rn() {
  return new Date(this.valueOf());
}
function Ln() {
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
function Cn() {
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
function En() {
  return this.isValid() ? this.toISOString() : null;
}
function In() {
  return Et(this);
}
function jn() {
  return ge({}, m(this));
}
function Un() {
  return m(this).overflow;
}
function An() {
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
h("N", Xt);
h("NN", Xt);
h("NNN", Xt);
h("NNNN", Kn);
h("NNNNN", Xn);
w(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, s, r) {
    var a = s._locale.erasParse(e, r, s._strict);
    a ? m(s).era = a : m(s).invalidEra = e;
  }
);
h("y", We);
h("yy", We);
h("yyy", We);
h("yyyy", We);
h("yo", eo);
w(["y", "yy", "yyy", "yyyy"], L);
w(["yo"], function(e, t, s, r) {
  var a;
  s._locale._eraYearOrdinalRegex && (a = e.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? t[L] = s._locale.eraYearOrdinalParse(e, a) : t[L] = parseInt(e, 10);
});
function Vn(e, t) {
  var s, r, a, i = this._eras || fe("en")._eras;
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
function $n(e, t, s) {
  var r, a, i = this.eras(), n, o, u;
  for (e = e.toUpperCase(), r = 0, a = i.length; r < a; ++r)
    if (n = i[r].name.toUpperCase(), o = i[r].abbr.toUpperCase(), u = i[r].narrow.toUpperCase(), s)
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
          if (u === e)
            return i[r];
          break;
      }
    else if ([n, o, u].indexOf(e) >= 0)
      return i[r];
}
function qn(e, t) {
  var s = e.since <= e.until ? 1 : -1;
  return t === void 0 ? d(e.since).year() : d(e.since).year() + (t - e.offset) * s;
}
function Hn() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].name;
  return "";
}
function zn() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].narrow;
  return "";
}
function Gn() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].abbr;
  return "";
}
function Bn() {
  var e, t, s, r, a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (s = a[e].since <= a[e].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), a[e].since <= r && r <= a[e].until || a[e].until <= r && r <= a[e].since)
      return (this.year() - d(a[e].since).year()) * s + a[e].offset;
  return this.year();
}
function Jn(e) {
  return p(this, "_erasNameRegex") || es.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Zn(e) {
  return p(this, "_erasAbbrRegex") || es.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Qn(e) {
  return p(this, "_erasNarrowRegex") || es.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Xt(e, t) {
  return t.erasAbbrRegex(e);
}
function Kn(e, t) {
  return t.erasNameRegex(e);
}
function Xn(e, t) {
  return t.erasNarrowRegex(e);
}
function eo(e, t) {
  return t._eraYearOrdinalRegex || We;
}
function es() {
  var e = [], t = [], s = [], r = [], a, i, n = this.eras();
  for (a = 0, i = n.length; a < i; ++a)
    t.push($(n[a].name)), e.push($(n[a].abbr)), s.push($(n[a].narrow)), r.push($(n[a].name)), r.push($(n[a].abbr)), r.push($(n[a].narrow));
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
E("weekYear", "gg");
E("isoWeekYear", "GG");
I("weekYear", 1);
I("isoWeekYear", 1);
h("G", ht);
h("g", ht);
h("GG", O, H);
h("gg", O, H);
h("GGGG", $t, Vt);
h("gggg", $t, Vt);
h("GGGGG", dt, lt);
h("ggggg", dt, lt);
Be(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, s, r) {
    t[r.substr(0, 2)] = y(e);
  }
);
Be(["gg", "GG"], function(e, t, s, r) {
  t[r] = d.parseTwoDigitYear(e);
});
function to(e) {
  return ar.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function so(e) {
  return ar.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function ro() {
  return de(this.year(), 1, 4);
}
function ao() {
  return de(this.isoWeekYear(), 1, 4);
}
function io() {
  var e = this.localeData()._week;
  return de(this.year(), e.dow, e.doy);
}
function no() {
  var e = this.localeData()._week;
  return de(this.weekYear(), e.dow, e.doy);
}
function ar(e, t, s, r, a) {
  var i;
  return e == null ? Ve(this, r, a).year : (i = de(e, r, a), t > i && (t = i), oo.call(this, e, t, s, r, a));
}
function oo(e, t, s, r, a) {
  var i = Es(e, t, s, r, a), n = Ae(i.year, 0, i.dayOfYear);
  return this.year(n.getUTCFullYear()), this.month(n.getUTCMonth()), this.date(n.getUTCDate()), this;
}
f("Q", 0, "Qo", "quarter");
E("quarter", "Q");
I("quarter", 7);
h("Q", Ys);
w("Q", function(e, t) {
  t[le] = (y(e) - 1) * 3;
});
function lo(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
f("D", ["DD", 2], "Do", "date");
E("date", "D");
I("date", 9);
h("D", O);
h("DD", O, H);
h("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
w(["D", "DD"], te);
w("Do", function(e, t) {
  t[te] = y(e.match(O)[0]);
});
var ir = Ne("Date", !0);
f("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
E("dayOfYear", "DDD");
I("dayOfYear", 4);
h("DDD", ut);
h("DDDD", xs);
w(["DDD", "DDDD"], function(e, t, s) {
  s._dayOfYear = y(e);
});
function uo(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
f("m", ["mm", 2], 0, "minute");
E("minute", "m");
I("minute", 14);
h("m", O);
h("mm", O, H);
w(["m", "mm"], Z);
var ho = Ne("Minutes", !1);
f("s", ["ss", 2], 0, "second");
E("second", "s");
I("second", 15);
h("s", O);
h("ss", O, H);
w(["s", "ss"], ue);
var co = Ne("Seconds", !1);
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
E("millisecond", "ms");
I("millisecond", 16);
h("S", ut, Ys);
h("SS", ut, H);
h("SSS", ut, xs);
var pe, nr;
for (pe = "SSSS"; pe.length <= 9; pe += "S")
  h(pe, We);
function fo(e, t) {
  t[ve] = y(("0." + e) * 1e3);
}
for (pe = "S"; pe.length <= 9; pe += "S")
  w(pe, fo);
nr = Ne("Milliseconds", !1);
f("z", 0, 0, "zoneAbbr");
f("zz", 0, 0, "zoneName");
function mo() {
  return this._isUTC ? "UTC" : "";
}
function yo() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var l = ze.prototype;
l.add = nn;
l.calendar = fn;
l.clone = mn;
l.diff = Sn;
l.endOf = Pn;
l.format = Mn;
l.from = Dn;
l.fromNow = Yn;
l.to = xn;
l.toNow = Tn;
l.get = ya;
l.invalidAt = Un;
l.isAfter = yn;
l.isBefore = _n;
l.isBetween = gn;
l.isSame = pn;
l.isSameOrAfter = bn;
l.isSameOrBefore = wn;
l.isValid = In;
l.lang = Xs;
l.locale = Ks;
l.localeData = er;
l.max = Ei;
l.min = Ci;
l.parsingFlags = jn;
l.set = _a;
l.startOf = Fn;
l.subtract = on;
l.toArray = Ln;
l.toObject = Cn;
l.toDate = Rn;
l.toISOString = kn;
l.inspect = On;
typeof Symbol < "u" && Symbol.for != null && (l[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
l.toJSON = En;
l.toString = vn;
l.unix = Wn;
l.valueOf = Nn;
l.creationData = An;
l.eraName = Hn;
l.eraNarrow = zn;
l.eraAbbr = Gn;
l.eraYear = Bn;
l.year = Cs;
l.isLeapYear = La;
l.weekYear = to;
l.isoWeekYear = so;
l.quarter = l.quarters = lo;
l.month = Rs;
l.daysInMonth = Na;
l.week = l.weeks = Aa;
l.isoWeek = l.isoWeeks = Va;
l.weeksInYear = io;
l.weeksInWeekYear = no;
l.isoWeeksInYear = ro;
l.isoWeeksInISOWeekYear = ao;
l.date = ir;
l.day = l.days = ti;
l.weekday = si;
l.isoWeekday = ri;
l.dayOfYear = uo;
l.hour = l.hours = di;
l.minute = l.minutes = ho;
l.second = l.seconds = co;
l.millisecond = l.milliseconds = nr;
l.utcOffset = zi;
l.utc = Bi;
l.local = Ji;
l.parseZone = Zi;
l.hasAlignedHourOffset = Qi;
l.isDST = Ki;
l.isLocal = en;
l.isUtcOffset = tn;
l.isUtc = Bs;
l.isUTC = Bs;
l.zoneAbbr = mo;
l.zoneName = yo;
l.dates = G(
  "dates accessor is deprecated. Use date instead.",
  ir
);
l.months = G(
  "months accessor is deprecated. Use month instead",
  Rs
);
l.years = G(
  "years accessor is deprecated. Use year instead",
  Cs
);
l.zone = G(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Gi
);
l.isDSTShifted = G(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Xi
);
function _o(e) {
  return k(e * 1e3);
}
function go() {
  return k.apply(null, arguments).parseZone();
}
function or(e) {
  return e;
}
var b = jt.prototype;
b.calendar = ta;
b.longDateFormat = ia;
b.invalidDate = oa;
b.ordinal = da;
b.preparse = or;
b.postformat = or;
b.relativeTime = ca;
b.pastFuture = fa;
b.set = Xr;
b.eras = Vn;
b.erasParse = $n;
b.erasConvertYear = qn;
b.erasAbbrRegex = Zn;
b.erasNameRegex = Jn;
b.erasNarrowRegex = Qn;
b.months = xa;
b.monthsShort = Ta;
b.monthsParse = Pa;
b.monthsRegex = Ra;
b.monthsShortRegex = Wa;
b.week = Ea;
b.firstDayOfYear = Ua;
b.firstDayOfWeek = ja;
b.weekdays = Za;
b.weekdaysMin = Ka;
b.weekdaysShort = Qa;
b.weekdaysParse = ei;
b.weekdaysRegex = ai;
b.weekdaysShortRegex = ii;
b.weekdaysMinRegex = ni;
b.isPM = li;
b.meridiem = hi;
function it(e, t, s, r) {
  var a = fe(), i = re().set(r, t);
  return a[s](i, e);
}
function lr(e, t, s) {
  if (ce(e) && (t = e, e = void 0), e = e || "", t != null)
    return it(e, t, s, "month");
  var r, a = [];
  for (r = 0; r < 12; r++)
    a[r] = it(e, r, s, "month");
  return a;
}
function ts(e, t, s, r) {
  typeof e == "boolean" ? (ce(t) && (s = t, t = void 0), t = t || "") : (t = e, s = t, e = !1, ce(t) && (s = t, t = void 0), t = t || "");
  var a = fe(), i = e ? a._week.dow : 0, n, o = [];
  if (s != null)
    return it(t, (s + i) % 7, r, "day");
  for (n = 0; n < 7; n++)
    o[n] = it(t, (n + i) % 7, r, "day");
  return o;
}
function po(e, t) {
  return lr(e, t, "months");
}
function bo(e, t) {
  return lr(e, t, "monthsShort");
}
function wo(e, t, s) {
  return ts(e, t, s, "weekdays");
}
function So(e, t, s) {
  return ts(e, t, s, "weekdaysShort");
}
function vo(e, t, s) {
  return ts(e, t, s, "weekdaysMin");
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
    var t = e % 10, s = y(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + s;
  }
});
d.lang = G(
  "moment.lang is deprecated. Use moment.locale instead.",
  be
);
d.langData = G(
  "moment.langData is deprecated. Use moment.localeData instead.",
  fe
);
var ie = Math.abs;
function ko() {
  var e = this._data;
  return this._milliseconds = ie(this._milliseconds), this._days = ie(this._days), this._months = ie(this._months), e.milliseconds = ie(e.milliseconds), e.seconds = ie(e.seconds), e.minutes = ie(e.minutes), e.hours = ie(e.hours), e.months = ie(e.months), e.years = ie(e.years), this;
}
function ur(e, t, s, r) {
  var a = ee(t, s);
  return e._milliseconds += r * a._milliseconds, e._days += r * a._days, e._months += r * a._months, e._bubble();
}
function Oo(e, t) {
  return ur(this, e, t, 1);
}
function Mo(e, t) {
  return ur(this, e, t, -1);
}
function us(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Do() {
  var e = this._milliseconds, t = this._days, s = this._months, r = this._data, a, i, n, o, u;
  return e >= 0 && t >= 0 && s >= 0 || e <= 0 && t <= 0 && s <= 0 || (e += us(Nt(s) + t) * 864e5, t = 0, s = 0), r.milliseconds = e % 1e3, a = z(e / 1e3), r.seconds = a % 60, i = z(a / 60), r.minutes = i % 60, n = z(i / 60), r.hours = n % 24, t += z(n / 24), u = z(dr(t)), s += u, t -= us(Nt(u)), o = z(s / 12), s %= 12, r.days = t, r.months = s, r.years = o, this;
}
function dr(e) {
  return e * 4800 / 146097;
}
function Nt(e) {
  return e * 146097 / 4800;
}
function Yo(e) {
  if (!this.isValid())
    return NaN;
  var t, s, r = this._milliseconds;
  if (e = B(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + r / 864e5, s = this._months + dr(t), e) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (t = this._days + Math.round(Nt(this._months)), e) {
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
function xo() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + y(this._months / 12) * 31536e6 : NaN;
}
function me(e) {
  return function() {
    return this.as(e);
  };
}
var To = me("ms"), Fo = me("s"), Po = me("m"), No = me("h"), Wo = me("d"), Ro = me("w"), Lo = me("M"), Co = me("Q"), Eo = me("y");
function Io() {
  return ee(this);
}
function jo(e) {
  return e = B(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Me(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Uo = Me("milliseconds"), Ao = Me("seconds"), Vo = Me("minutes"), $o = Me("hours"), qo = Me("days"), Ho = Me("months"), zo = Me("years");
function Go() {
  return z(this.days() / 7);
}
var ne = Math.round, xe = {
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
function Bo(e, t, s, r, a) {
  return a.relativeTime(t || 1, !!s, e, r);
}
function Jo(e, t, s, r) {
  var a = ee(e).abs(), i = ne(a.as("s")), n = ne(a.as("m")), o = ne(a.as("h")), u = ne(a.as("d")), c = ne(a.as("M")), v = ne(a.as("w")), j = ne(a.as("y")), ye = i <= s.ss && ["s", i] || i < s.s && ["ss", i] || n <= 1 && ["m"] || n < s.m && ["mm", n] || o <= 1 && ["h"] || o < s.h && ["hh", o] || u <= 1 && ["d"] || u < s.d && ["dd", u];
  return s.w != null && (ye = ye || v <= 1 && ["w"] || v < s.w && ["ww", v]), ye = ye || c <= 1 && ["M"] || c < s.M && ["MM", c] || j <= 1 && ["y"] || ["yy", j], ye[2] = t, ye[3] = +e > 0, ye[4] = r, Bo.apply(null, ye);
}
function Zo(e) {
  return e === void 0 ? ne : typeof e == "function" ? (ne = e, !0) : !1;
}
function Qo(e, t) {
  return xe[e] === void 0 ? !1 : t === void 0 ? xe[e] : (xe[e] = t, e === "s" && (xe.ss = t - 1), !0);
}
function Ko(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var s = !1, r = xe, a, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (s = e), typeof t == "object" && (r = Object.assign({}, xe, t), t.s != null && t.ss == null && (r.ss = t.s - 1)), a = this.localeData(), i = Jo(this, !s, r, a), s && (i = a.pastFuture(+this, i)), a.postformat(i);
}
var vt = Math.abs;
function De(e) {
  return (e > 0) - (e < 0) || +e;
}
function gt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = vt(this._milliseconds) / 1e3, t = vt(this._days), s = vt(this._months), r, a, i, n, o = this.asSeconds(), u, c, v, j;
  return o ? (r = z(e / 60), a = z(r / 60), e %= 60, r %= 60, i = z(s / 12), s %= 12, n = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", u = o < 0 ? "-" : "", c = De(this._months) !== De(o) ? "-" : "", v = De(this._days) !== De(o) ? "-" : "", j = De(this._milliseconds) !== De(o) ? "-" : "", u + "P" + (i ? c + i + "Y" : "") + (s ? c + s + "M" : "") + (t ? v + t + "D" : "") + (a || r || e ? "T" : "") + (a ? j + a + "H" : "") + (r ? j + r + "M" : "") + (e ? j + n + "S" : "")) : "P0D";
}
var g = yt.prototype;
g.isValid = Vi;
g.abs = ko;
g.add = Oo;
g.subtract = Mo;
g.as = Yo;
g.asMilliseconds = To;
g.asSeconds = Fo;
g.asMinutes = Po;
g.asHours = No;
g.asDays = Wo;
g.asWeeks = Ro;
g.asMonths = Lo;
g.asQuarters = Co;
g.asYears = Eo;
g.valueOf = xo;
g._bubble = Do;
g.clone = Io;
g.get = jo;
g.milliseconds = Uo;
g.seconds = Ao;
g.minutes = Vo;
g.hours = $o;
g.days = qo;
g.weeks = Go;
g.months = Ho;
g.years = zo;
g.humanize = Ko;
g.toISOString = gt;
g.toString = gt;
g.toJSON = gt;
g.locale = Ks;
g.localeData = er;
g.toIsoString = G(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  gt
);
g.lang = Xs;
f("X", 0, 0, "unix");
f("x", 0, 0, "valueOf");
h("x", ht);
h("X", pa);
w("X", function(e, t, s) {
  s._d = new Date(parseFloat(e) * 1e3);
});
w("x", function(e, t, s) {
  s._d = new Date(y(e));
});
//! moment.js
d.version = "2.29.4";
Qr(k);
d.fn = l;
d.min = Ii;
d.max = ji;
d.now = Ui;
d.utc = re;
d.unix = _o;
d.months = po;
d.isDate = He;
d.locale = be;
d.invalid = nt;
d.duration = ee;
d.isMoment = K;
d.weekdays = wo;
d.parseZone = go;
d.localeData = fe;
d.isDuration = Ke;
d.monthsShort = bo;
d.weekdaysMin = vo;
d.defineLocale = Gt;
d.updateLocale = yi;
d.locales = _i;
d.weekdaysShort = So;
d.normalizeUnits = B;
d.relativeTimeRounding = Zo;
d.relativeTimeThreshold = Qo;
d.calendarFormat = cn;
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
const Xo = {
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
      type: Oe,
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
function el(e, t, s, r, a, i) {
  var u;
  const n = F("o-datepicker"), o = F("o-field");
  return S(), X(o, Ie({ label: s.label }, (u = s.form) == null ? void 0 : u.getError(s.name)), {
    default: N(() => [
      q(n, Ie({
        modelValue: a.query,
        "onUpdate:modelValue": t[0] || (t[0] = (c) => a.query = c)
      }, s.options, {
        "date-formatter": i.dateFormatter,
        "onUpdate:modelValue": i.updateQuery
      }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const tl = /* @__PURE__ */ C(Xo, [["render", el]]), sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tl
}, Symbol.toStringTag, { value: "Module" })), rl = ys({
  name: "WyxosError",
  props: {
    form: {
      type: Oe,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: Ue()
    };
  }
}), al = { key: 0 }, il = { key: 1 };
function nl(e, t, s, r, a, i) {
  var n, o;
  return (n = e.form) != null && n.getError(e.name).message ? (S(), R("p", al, W(e.form.getError(e.name).message), 1)) : (o = e.errors.get(e.name)) != null && o.message ? (S(), R("p", il, W(e.errors.get(e.name).message), 1)) : J("", !0);
}
const ol = /* @__PURE__ */ C(rl, [["render", nl]]), ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ol
}, Symbol.toStringTag, { value: "Module" })), hr = "%[a-f0-9]{2}", ds = new RegExp("(" + hr + ")|([^%]+?)", "gi"), hs = new RegExp("(" + hr + ")+", "gi");
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
function ul(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(ds) || [];
    for (let s = 1; s < t.length; s++)
      e = Wt(t, s).join(""), t = e.match(ds) || [];
    return e;
  }
}
function dl(e) {
  const t = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let s = hs.exec(e);
  for (; s; ) {
    try {
      t[s[0]] = decodeURIComponent(s[0]);
    } catch {
      const a = ul(s[0]);
      a !== s[0] && (t[s[0]] = a);
    }
    s = hs.exec(e);
  }
  t["%C2"] = "�";
  const r = Object.keys(t);
  for (const a of r)
    e = e.replace(new RegExp(a, "g"), t[a]);
  return e;
}
function hl(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return dl(e);
  }
}
function cr(e, t) {
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
function cl(e, t) {
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
const fl = (e) => e == null, ml = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), Rt = Symbol("encodeFragmentIdentifier");
function yl(e) {
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
function _l(e) {
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
        const i = typeof r == "string" && r.includes(e.arrayFormatSeparator), n = typeof r == "string" && !i && oe(r, e).includes(e.arrayFormatSeparator);
        r = n ? oe(r, e) : r;
        const o = i || n ? r.split(e.arrayFormatSeparator).map((u) => oe(u, e)) : r === null ? r : oe(r, e);
        a[s] = o;
      };
    case "bracket-separator":
      return (s, r, a) => {
        const i = /(\[])$/.test(s);
        if (s = s.replace(/\[]$/, ""), !i) {
          a[s] = r && oe(r, e);
          return;
        }
        const n = r === null ? [] : r.split(e.arrayFormatSeparator).map((o) => oe(o, e));
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
function x(e, t) {
  return t.encode ? t.strict ? ml(e) : encodeURIComponent(e) : e;
}
function oe(e, t) {
  return t.decode ? hl(e) : e;
}
function mr(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? mr(Object.keys(e)).sort((t, s) => Number(t) - Number(s)).map((t) => e[t]) : e;
}
function yr(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function gl(e) {
  let t = "";
  const s = e.indexOf("#");
  return s !== -1 && (t = e.slice(s)), t;
}
function cs(e, t) {
  return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function ss(e) {
  e = yr(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function rs(e, t) {
  t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...t
  }, fr(t.arrayFormatSeparator);
  const s = _l(t), r = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return r;
  for (const a of e.split("&")) {
    if (a === "")
      continue;
    const i = t.decode ? a.replace(/\+/g, " ") : a;
    let [n, o] = cr(i, "=");
    n === void 0 && (n = i), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? o : oe(o, t), s(oe(n, t), o, r);
  }
  for (const [a, i] of Object.entries(r))
    if (typeof i == "object" && i !== null)
      for (const [n, o] of Object.entries(i))
        i[n] = cs(o, t);
    else
      r[a] = cs(i, t);
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
  const s = (n) => t.skipNull && fl(e[n]) || t.skipEmptyString && e[n] === "", r = yl(t), a = {};
  for (const [n, o] of Object.entries(e))
    s(n) || (a[n] = o);
  const i = Object.keys(a);
  return t.sort !== !1 && i.sort(t.sort), i.map((n) => {
    const o = e[n];
    return o === void 0 ? "" : o === null ? x(n, t) : Array.isArray(o) ? o.length === 0 && t.arrayFormat === "bracket-separator" ? x(n, t) + "[]" : o.reduce(r(n), []).join("&") : x(n, t) + "=" + x(o, t);
  }).filter((n) => n.length > 0).join("&");
}
function gr(e, t) {
  var a;
  t = {
    decode: !0,
    ...t
  };
  let [s, r] = cr(e, "#");
  return s === void 0 && (s = e), {
    url: ((a = s == null ? void 0 : s.split("?")) == null ? void 0 : a[0]) ?? "",
    query: rs(ss(e), t),
    ...t && t.parseFragmentIdentifier && r ? { fragmentIdentifier: oe(r, t) } : {}
  };
}
function pr(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [Rt]: !0,
    ...t
  };
  const s = yr(e.url).split("?")[0] || "", r = ss(e.url), a = {
    ...rs(r, { sort: !1 }),
    ...e.query
  };
  let i = _r(a, t);
  i && (i = `?${i}`);
  let n = gl(e.url);
  if (e.fragmentIdentifier) {
    const o = new URL(s);
    o.hash = e.fragmentIdentifier, n = t[Rt] ? o.hash : `#${e.fragmentIdentifier}`;
  }
  return `${s}${i}${n}`;
}
function br(e, t, s) {
  s = {
    parseFragmentIdentifier: !0,
    [Rt]: !1,
    ...s
  };
  const { url: r, query: a, fragmentIdentifier: i } = gr(e, s);
  return pr({
    url: r,
    query: cl(a, t),
    fragmentIdentifier: i
  }, s);
}
function pl(e, t, s) {
  const r = Array.isArray(t) ? (a) => !t.includes(a) : (a, i) => !t(a, i);
  return br(e, r, s);
}
const fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: pl,
  extract: ss,
  parse: rs,
  parseUrl: gr,
  pick: br,
  stringify: _r,
  stringifyUrl: pr
}, Symbol.toStringTag, { value: "Module" }));
let _e;
class pt {
  constructor() {
    _(this, "api", null);
    _(this, "baseUrl", null);
    _(this, "structure", null);
    _(this, "options", null);
    _(this, "errors", null);
    _(this, "errorBag", "default");
    _(this, "states", {
      load: A.create(),
      fetch: A.create(),
      filter: A.create()
    });
    _(this, "query", V({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    _(this, "params", V({
      page: 1
    }));
    _(this, "state", V({
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
    const r = new pt();
    return r.errors = Ue(), r.errors.createBag(this.errorBag), r.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (a) => a
      },
      s
    ), r.setParameters(t), r.options.enableSearchUpdate && r.mergeSearch(), r.baseUrl = s.baseUrl, r.api = T.create(s.axios || {}), r;
  }
  setParameters(t) {
    const s = JSON.parse(JSON.stringify(t));
    this.structure = Object.assign({}, s), this.params = V(t);
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
        delete: new A(),
        patch: new A()
      }
    });
  }
  async load(t) {
    this.errors.clear(null, this.errorBag), _e && _e.cancel(), _e = T.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let s = null;
    try {
      this.states.fetch.loading();
      const r = JSON.parse(JSON.stringify(this.params)), a = t || this.baseUrl, i = await this.api.get(a, {
        params: r,
        cancelToken: _e.token
      }).catch((n) => {
        throw this.states.fetch.failed(), n;
      });
      if (this.states.fetch.loaded(), s = i.data, this.states.fetch.loaded(), !s || !s.query || !s.query.items)
        throw this.states.fetch.failed(), Error("Response format is invalid.");
      return Object.assign(this.query, s.query, {
        items: s.query.items.map((n) => this.transformItem(n))
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
    let u = n.states[a];
    u || (u = n.states[a] = A.create()), u.loading();
    const { data: c } = await this.api[i](
      t || this.baseUrl,
      r
    ).catch((j) => {
      throw u.failed(), j;
    });
    u.loaded(), c.row && Object.assign(n, c.row);
    const v = await this.fetch();
    if (this.query.items.splice(o, 1), !v.query.items.length)
      return this.params.page--, await this.load(), c;
    if (this.query.items.length < v.query.items.length) {
      const j = v.query.items[v.query.items.length - 1];
      this.push(j);
    }
    return c;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), _e && _e.cancel(), this.states.filter.loading(), this.states.load.loading(), _e = T.CancelToken.source(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let t = null;
    try {
      const s = JSON.parse(JSON.stringify(this.params)), r = this.baseUrl;
      t = (await this.api.get(r, {
        params: s,
        cancelToken: _e.token
      }).catch((i) => {
        throw this.states.filter.failed(), i;
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
const bl = {
  name: "WyxosForm",
  props: {
    form: {
      type: Oe,
      required: !0
    },
    submit: {
      type: Function,
      default: null
    },
    listing: {
      type: pt,
      default: null
    },
    reset: {
      type: Boolean,
      default: !1
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
function wl(e, t, s, r, a, i) {
  const n = F("o-loading"), o = F("o-button");
  return S(), R("div", null, [
    s.form.isLoaded ? (S(), R("form", {
      key: 0,
      onSubmit: t[0] || (t[0] = _s((u) => i.handle(), ["prevent"]))
    }, [
      qe(e.$slots, "default")
    ], 32)) : J("", !0),
    q(n, {
      active: s.form.isLoading
    }, null, 8, ["active"]),
    s.form.isFailure ? (S(), X(o, {
      key: 1,
      onClick: t[1] || (t[1] = (u) => s.form.load())
    }, {
      default: N(() => [
        he(" An error occurred. Try again? ")
      ]),
      _: 1
    })) : J("", !0)
  ]);
}
const Sl = /* @__PURE__ */ C(bl, [["render", wl]]), vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sl
}, Symbol.toStringTag, { value: "Module" })), kl = {
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
}, Ol = ["width", "height"];
function Ml(e, t, s, r, a, i) {
  return S(), R("img", {
    ref: "image",
    src: "",
    alt: "",
    width: a.width,
    height: a.height
  }, null, 8, Ol);
}
const Dl = /* @__PURE__ */ C(kl, [["render", Ml]]), Yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dl
}, Symbol.toStringTag, { value: "Module" })), xl = {
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
      type: Oe,
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
      errors: Ue()
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
function Tl(e, t, s, r, a, i) {
  const n = F("o-input"), o = F("o-field");
  return S(), X(o, Ie({
    label: s.label,
    class: s.fieldClass
  }, { ...i.getError() }), {
    default: N(() => [
      q(n, {
        readonly: s.readonly,
        class: ms(s.inputClass),
        "root-class": s.inputRootClass,
        name: s.name,
        type: s.type,
        clearable: s.clearable,
        disabled: s.disabled,
        "model-value": s.modelValue,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => i.onInput(u))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const Fl = /* @__PURE__ */ C(xl, [["render", Tl]]), Pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fl
}, Symbol.toStringTag, { value: "Module" })), Nl = {
  name: "WyxosListing",
  props: {
    listing: {
      type: pt,
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
}, Wl = { key: 0 }, Rl = { key: 1 };
function Ll(e, t, s, r, a, i) {
  const n = F("o-table");
  return S(), X(n, Ot(Mt(i.allPropsAndEvents)), Yr({
    empty: N(() => [
      s.listing.isEmpty ? (S(), R("p", Wl, "No records found.")) : J("", !0),
      s.listing.isSearchEmpty ? (S(), R("p", Rl, " No results for your query. Please adjust your search and try again. ")) : J("", !0)
    ]),
    _: 2
  }, [
    gs(e.$slots, (o, u) => ({
      name: u,
      fn: N((c) => [
        qe(e.$slots, u, Ot(Mt(c)))
      ])
    }))
  ]), 1040);
}
const Cl = /* @__PURE__ */ C(Nl, [["render", Ll]]), El = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cl
}, Symbol.toStringTag, { value: "Module" })), Il = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: Oe.create({
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
}, jl = { class: "bg-white p-6" }, Ul = /* @__PURE__ */ D("h2", { class: "title" }, "Session Expired", -1), Al = /* @__PURE__ */ D("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Vl = { class: "buttons" };
function $l(e, t, s, r, a, i) {
  const n = F("wyxos-input"), o = F("w-button"), u = F("o-modal");
  return S(), X(u, { active: !0 }, {
    default: N(() => [
      D("div", jl, [
        Ul,
        Al,
        D("form", {
          onSubmit: t[3] || (t[3] = _s((...c) => i.proceed && i.proceed(...c), ["prevent"]))
        }, [
          q(n, {
            modelValue: r.login.email,
            "onUpdate:modelValue": t[0] || (t[0] = (c) => r.login.email = c),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          q(n, {
            modelValue: r.login.password,
            "onUpdate:modelValue": t[1] || (t[1] = (c) => r.login.password = c),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          D("div", Vl, [
            q(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: t[2] || (t[2] = (c) => i.onLogout())
            }, {
              default: N(() => [
                he(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            q(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: N(() => [
                he(" Login ")
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
const wr = /* @__PURE__ */ C(Il, [["render", $l]]), ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wr
}, Symbol.toStringTag, { value: "Module" })), Hl = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, zl = { class: "bg-white p-6" }, Gl = /* @__PURE__ */ D("h2", { class: "title" }, "Session expired", -1), Bl = /* @__PURE__ */ D("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Jl = { class: "buttons" };
function Zl(e, t, s, r, a, i) {
  const n = F("w-button"), o = F("o-modal");
  return S(), X(o, { active: !0 }, {
    default: N(() => [
      D("div", zl, [
        Gl,
        Bl,
        D("div", Jl, [
          q(n, {
            class: "button is-primary",
            onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !0 }))
          }, {
            default: N(() => [
              he(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const Sr = /* @__PURE__ */ C(Hl, [["render", Zl]]), Ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sr
}, Symbol.toStringTag, { value: "Module" }));
async function Lt(e, t) {
  var i, n, o, u, c;
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
  const r = s[(i = e.response) == null ? void 0 : i.status] || s[500], { oruga: a } = bs();
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
    const j = (await T.get("/heartbeat")).data.csrfToken;
    T.defaults.headers.common["X-CSRF-TOKEN"] = j;
  }
  return ((o = e.response) == null ? void 0 : o.status) === 401 && a.modal.open({
    component: ((u = t.components) == null ? void 0 : u.SessionExpired) || wr,
    trapFocus: !0,
    closable: !1
  }), ((c = e.response) == null ? void 0 : c.status) === 422 && new Promise((v) => setTimeout(v, 500)).then(() => {
    const v = document.querySelector(".o-field__label-danger");
    v && v.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(e);
}
const Kl = {
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
        Lt(t);
      }).catch(Lt);
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function Xl(e, t, s, r, a, i) {
  return S(), R("li", null, [
    qe(e.$slots, "default", { logout: i.logout }, () => [
      D("button", {
        class: "button is-primary",
        onClick: t[0] || (t[0] = (n) => i.logout())
      }, "Sign out")
    ])
  ]);
}
const eu = /* @__PURE__ */ C(Kl, [["render", Xl]]), tu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eu
}, Symbol.toStringTag, { value: "Module" })), su = ys({
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
}), ru = ["value", "max"], au = { key: 0 };
function iu(e, t, s, r, a, i) {
  return S(), R(ps, null, [
    D("progress", {
      value: e.value,
      max: e.max
    }, null, 8, ru),
    e.showValue ? (S(), R("span", au, W(e.value) + " / " + W(e.max), 1)) : J("", !0)
  ], 64);
}
const nu = /* @__PURE__ */ C(su, [["render", iu]]), ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nu
}, Symbol.toStringTag, { value: "Module" })), lu = {
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
      state: new A()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, uu = { class: "button-group" };
function du(e, t, s, r, a, i) {
  const n = F("wyxos-button"), o = F("o-modal");
  return S(), X(o, { active: !0 }, {
    default: N(() => [
      D("h2", null, W(s.title), 1),
      D("p", null, W(s.message), 1),
      D("div", uu, [
        q(n, {
          disabled: r.state.isLoading,
          "native-type": "button",
          onClick: t[0] || (t[0] = (u) => e.$emit("close", { action: !1 }))
        }, {
          default: N(() => [
            he(W(s.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        q(n, {
          loading: r.state.isLoading,
          "native-type": "button",
          onClick: t[1] || (t[1] = (u) => i.proceed())
        }, {
          default: N(() => [
            he(W(s.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const hu = /* @__PURE__ */ C(lu, [["render", du]]), cu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hu
}, Symbol.toStringTag, { value: "Module" })), fu = {
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
      type: Oe,
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
}, mu = ["value"];
function yu(e, t, s, r, a, i) {
  var u;
  const n = F("o-select"), o = F("o-field");
  return S(), X(o, Ie({ label: s.label }, (u = s.form) == null ? void 0 : u.getError(s.name)), {
    default: N(() => [
      q(n, {
        disabled: s.disabled,
        "model-value": s.modelValue,
        name: s.name,
        placeholder: s.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": t[0] || (t[0] = (c) => i.updateValue(c))
      }, {
        default: N(() => [
          qe(e.$slots, "default", {}, () => [
            s.items ? (S(!0), R(ps, { key: 0 }, gs(s.items, (c) => (S(), R("option", {
              key: c.value,
              value: c.value
            }, W(c.label), 9, mu))), 128)) : J("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const _u = /* @__PURE__ */ C(fu, [["render", yu]]), gu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _u
}, Symbol.toStringTag, { value: "Module" }));
class as {
  constructor(t = {}) {
    _(this, "state", new A());
    _(this, "result", je([]));
    _(this, "value", je(null));
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
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = a.result, this.state.loaded();
    }, 500);
  }
  async restore(t, s) {
    this.state.loading(), this.reset();
    const r = t || this.options.url, { data: a } = await T.post(`${r}/restore`, s || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), a;
  }
  reset() {
    this.result.value = [];
  }
}
const pu = {
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
function bu(e, t, s, r, a, i) {
  const n = F("o-inputitems");
  return S(), X(n, Ie({
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
const wu = /* @__PURE__ */ C(pu, [["render", bu]]), Su = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wu
}, Symbol.toStringTag, { value: "Module" }));
class vu {
  constructor() {
    _(this, "attributes", V({
      user: null
    }));
    _(this, "state", new A());
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
    this.attributes = V({
      user: null
    });
  }
}
const Pu = new vu(), ku = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Ou {
  constructor() {
    _(this, "FORMATS", ku);
  }
  format(t, s, r = "") {
    return t ? d(t).format(s) : r;
  }
}
const Nu = new Ou();
class Wu {
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
    _(this, "state", je(!1));
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
class Ru {
  static create(t, s = null, r = null) {
    return s = s || t, {
      value: t,
      label: s
    };
  }
}
class Lu {
  constructor() {
    _(this, "structure", {});
    _(this, "query", V({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    _(this, "params", V({
      page: 1
    }));
    _(this, "router", null);
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
  async action(t, { row: s, index: r, remove: a, method: i }, n = {}) {
    s.isProcessing = !0;
    const o = {
      id: s.id,
      ...n
    };
    if (i === "delete") {
      const { data: u } = await T.delete(t, {
        data: o
      }).catch((c) => {
        throw s.isProcessing = !1, c;
      });
      s.isProcessing = !1, u.row && Object.assign(s, u.row);
    } else {
      const { data: u } = await T.post(t, o).catch((c) => {
        throw s.isProcessing = !1, c;
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
class Cu {
  constructor(t) {
    _(this, "current", je(null));
    _(this, "history", je([]));
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
function Eu(e) {
  const { oruga: t } = bs();
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
    _(this, "attributes", V({
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
function Mu(e) {
  T.interceptors.response.use(null, (t) => Lt(t, e));
}
const kt = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Er, "./components/WyxosCollection.vue": Vr, "./components/WyxosConfirm.vue": Zr, "./components/WyxosDatepicker.vue": sl, "./components/WyxosError.vue": ll, "./components/WyxosForm.vue": vl, "./components/WyxosImage.vue": Yl, "./components/WyxosInput.vue": Pl, "./components/WyxosListing.vue": El, "./components/WyxosLogout.vue": tu, "./components/WyxosProgress.vue": ou, "./components/WyxosPrompt.vue": cu, "./components/WyxosSelect.vue": gu, "./components/WyxosSessionExpired.vue": ql, "./components/WyxosTags.vue": Su, "./components/WyxosTokenExpired.vue": Ql }), Or = {}, Du = (e, t = { vision: {}, oruga: {} }) => {
  e.use(xr, t.oruga), Object.keys(kt).forEach((s) => {
    const r = kt[s].default.name, a = kt[s].default;
    e.component(r, a), e.component(r.replace("Wyxos", "W"), a), Or[r] = a;
  }), Mu(t);
}, Iu = {
  install: Du,
  ...Or
};
export {
  Wu as FileRequest,
  Oe as FormBuilder,
  pt as Listing,
  A as LoadState,
  vr as Modal,
  Ru as Option,
  Lu as ResourceList,
  as as Search,
  Cu as Steps,
  kr as Tab,
  Cr as WyxosButton,
  Ar as WyxosCollection,
  Jr as WyxosConfirm,
  tl as WyxosDatepicker,
  ol as WyxosError,
  Sl as WyxosForm,
  Dl as WyxosImage,
  Fl as WyxosInput,
  Cl as WyxosListing,
  eu as WyxosLogout,
  nu as WyxosProgress,
  hu as WyxosPrompt,
  _u as WyxosSelect,
  wr as WyxosSessionExpired,
  wu as WyxosTags,
  Sr as WyxosTokenExpired,
  Pu as auth,
  Nu as dateRender,
  Iu as default,
  Lt as errorHandler,
  Eu as success,
  Ue as useFormErrors
};
