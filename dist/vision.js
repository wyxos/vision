var xl = Object.defineProperty;
var Tl = (e, a, t) => a in e ? xl(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t;
var z = (e, a, t) => (Tl(e, typeof a != "symbol" ? a + "" : a, t), t);
import { resolveComponent as Ye, openBlock as w, createBlock as be, withCtx as me, renderSlot as oe, createTextVNode as Be, createCommentVNode as j, toDisplayString as De, createElementBlock as I, normalizeProps as ze, guardReactiveProps as tt, createElementVNode as ue, reactive as at, createVNode as Re, normalizeClass as ke, ref as K, defineComponent as Je, useSlots as ea, toRef as Ta, onMounted as ot, nextTick as mt, onUnmounted as Ba, watch as gt, computed as X, mergeProps as Ee, unref as m, isRef as Un, createSlots as nt, renderList as Fe, resolveDynamicComponent as ja, Teleport as br, Transition as fa, normalizeStyle as yt, Fragment as xe, withModifiers as Zt, h as Pl, render as Qn, useAttrs as Ol, onBeforeUpdate as Dl, withDirectives as Ia, vShow as Ea, withKeys as Ml, getCurrentScope as Sl, onScopeDispose as Al } from "vue";
import _a from "moment";
import Ae from "axios";
import $l, { useOruga as Tn } from "@oruga-ui/oruga-next";
const Ze = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [n, r] of a)
    t[n] = r;
  return t;
}, Rl = {
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
}, Cl = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Fl(e, a, t, n, r, l) {
  const o = Ye("o-button");
  return w(), be(o, { disabled: t.loading }, {
    default: me(() => [
      t.loading ? j("", !0) : oe(e.$slots, "default", { key: 0 }, () => [
        Be("Submit")
      ]),
      t.loading && t.text ? oe(e.$slots, "loading", { key: 1 }, () => [
        Be(De(t.text), 1)
      ]) : j("", !0),
      t.loading ? (w(), I("i", Cl)) : j("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const Yl = /* @__PURE__ */ Ze(Rl, [["render", Fl]]), Nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yl
}, Symbol.toStringTag, { value: "Module" })), Il = {
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
}, El = /* @__PURE__ */ ue("ul", null, [
  /* @__PURE__ */ ue("li")
], -1);
function ql(e, a, t, n, r, l) {
  return oe(e.$slots, "default", ze(tt({ add: l.add, remove: l.remove, items: r.items })), () => [
    El
  ]);
}
const Ll = /* @__PURE__ */ Ze(Il, [["render", ql]]), Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ll
}, Symbol.toStringTag, { value: "Module" }));
class kt {
  constructor() {
    z(this, "state", at({
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
  isState(a) {
    return this.state[a];
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
    return new kt();
  }
}
const Bl = {
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
      state: new kt()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, jl = { class: "bg-white p-6" }, Wl = { class: "title" }, Hl = { class: "mb-6" }, zl = {
  class: "buttons",
  role: "group"
};
function Ul(e, a, t, n, r, l) {
  const o = Ye("wyxos-button"), s = Ye("o-modal");
  return w(), be(s, {
    active: !0,
    onClose: a[2] || (a[2] = (u) => e.$emit("close", { action: !1 }))
  }, {
    default: me(() => [
      ue("section", jl, [
        ue("article", null, [
          ue("header", null, [
            ue("h3", Wl, De(t.title), 1)
          ]),
          ue("p", Hl, De(t.message), 1),
          ue("footer", zl, [
            Re(o, {
              disabled: n.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: a[0] || (a[0] = (u) => e.$emit("close", { action: !1 }))
            }, {
              default: me(() => [
                Be(De(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            Re(o, {
              class: ke([{ [t.confirmType]: !0 }, "button"]),
              loading: n.state.isLoading,
              "native-type": "button",
              onClick: a[1] || (a[1] = (u) => l.proceed())
            }, {
              default: me(() => [
                Be(De(t.confirmText), 1)
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
const Ql = /* @__PURE__ */ Ze(Bl, [["render", Ul]]), Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ql
}, Symbol.toStringTag, { value: "Module" })), Ut = at({
  default: []
});
function oa() {
  return {
    createBag(e) {
      Ut[e] || (Ut[e] = []);
    },
    set(e, a = "default") {
      if (!(e.response && e.response.data && e.response.data.errors))
        throw e;
      Ut[a] = Object.keys(e.response.data.errors).map((n) => ({
        key: n,
        message: e.response.data.errors[n][0]
      }));
    },
    get(e, a = "default") {
      const t = Ut[a];
      if (!t)
        return {
          message: "",
          variant: ""
        };
      const n = t.find(
        (r) => Array.isArray(e) ? e.includes(r.key) : r.key === e
      );
      return n ? {
        message: n.message,
        variant: "danger"
      } : {
        message: "",
        variant: ""
      };
    },
    clear(e = null, a = "default") {
      if (e) {
        const t = Ut[a];
        if (!t) {
          console.warn(`Bag ${a} is not defined.`);
          return;
        }
        const n = t.findIndex((r) => r.key === e);
        t.splice(n, 1);
        return;
      }
      Ut[a] = [];
    },
    all(e = "default") {
      return Ut[e];
    }
  };
}
class Yt {
  constructor(a = {}) {
    z(this, "errors", null);
    z(this, "errorBag", "default");
    z(this, "model", at({}));
    z(this, "form", at({}));
    z(this, "original", {});
    z(this, "states", {
      load: kt.create(),
      submit: kt.create()
    });
    z(this, "paths", {
      load: null,
      submit: null
    });
    // Add an abort controller property
    z(this, "abortController", null);
    z(this, "timeout", null);
    return this.errors = oa(), this.errors.createBag(this.errorBag), this.setAttributes(a), this.loaded(), new Proxy(this, {
      get(t, n, r) {
        if (Reflect.has(t, n))
          return Reflect.get(t, n, r);
        if (Reflect.has(t.form, n)) {
          const l = n.split(".");
          if (l.length > 1) {
            let o = t.form;
            for (let s = 0; s < l.length; s++)
              o = o[l[s]];
            return o ?? void 0;
          }
          return Reflect.get(t.form, n);
        }
      },
      set(t, n, r, l) {
        if (Reflect.has(t, n))
          return Reflect.set(t, n, r, l);
        if (Reflect.has(t.form, n)) {
          const o = n.split(".");
          if (o.length > 1) {
            let s = t.form;
            for (let u = 0; u < o.length - 1; u++)
              o[u] in s || (s[o[u]] = {}), s = s[o[u]];
            return s[o[o.length - 1]] === void 0 ? !1 : (s[o[o.length - 1]] = r, !0);
          }
          return Reflect.set(t.form, n, r);
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
  static create(a) {
    return new this(a);
  }
  setPaths(a = {}) {
    return Object.assign(this.paths, a), this;
  }
  setLoad(a) {
    return this.paths.load = a, this;
  }
  setSubmit(a) {
    return this.paths.submit = a, this;
  }
  setErrors(a) {
    this.errorBag = a || "default", this.errors = oa(), this.errors.createBag(this.errorBag);
  }
  setAttributes(a) {
    this.original = a, this.form = at({ ...a });
  }
  getError(a) {
    return this.errors.get(a, this.errorBag);
  }
  clearError(a) {
    this.errors.clear(a, this.errorBag);
  }
  get(a = null, { formatter: t = null, ...n } = {}) {
    return this.submitRequest("get", a, { formatter: t, ...n });
  }
  post(a = null, { formatter: t = null, ...n } = {}) {
    return this.submitRequest("post", a, { formatter: t, ...n });
  }
  submit(a = null, { formatter: t = null, ...n } = {}) {
    if (a = a || this.paths.submit, !a)
      throw Error("No valid URL defined for submit method.");
    return this.submitRequest("post", a, { formatter: t, ...n });
  }
  delete(a = null, { formatter: t = null, ...n } = {}) {
    return this.submitRequest("delete", a, { formatter: t, ...n });
  }
  put(a = null, { formatter: t = null, ...n } = {}) {
    return this.submitRequest("put", a, { formatter: t, ...n });
  }
  patch(a, { formatter: t = null, ...n } = {}) {
    return this.submitRequest("patch", a, { formatter: t, ...n });
  }
  submitRequest(a, t = null, { formatter: n = null, ...r } = {}) {
    if (t && typeof t != "string")
      throw new Error("Path must be a string");
    if (n !== null && typeof n != "function")
      throw new Error("Formatter must be a function");
    this.abortController && this.abortController.abort(), this.abortController = new AbortController(), r.signal = this.abortController.signal, this.clearErrors(), this.submitting();
    const l = n ? n(this.form) : { ...this.form };
    let o;
    return ["get", "delete"].includes(a) ? (r.params = l, o = Ae[a](t, r)) : o = Ae[a](t, l, r), o.then((s) => (this.abortController = null, this.clearErrors(), this.submitted(), s.data)).catch((s) => (s.name === "AbortError" ? console.log("Request aborted:", s.message) : (this.submitFailed(), this.errors.set(s, this.errorBag)), Promise.reject(s)));
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(a) {
    this.submitFailed(), this.errors.set(a, this.errorBag);
  }
  async advancedSubmit(a) {
    this.states.submit.loading();
    const { data: t } = await Promise.resolve(a(Ae, this.form)).catch(
      (n) => {
        throw this.states.submit.failed(), this.errors.set(n, this.errorBag), n;
      }
    );
    return this.states.submit.loaded(), t;
  }
  async load(a = "", { updateLoading: t = !0, updateOriginal: n = !0, ...r } = {}) {
    this.clearErrors(), this.states.load.loading();
    try {
      const { data: l } = await Ae.get(a || this.paths.load, r);
      return n && Object.assign(this.original, l.form), Object.assign(this.form, l.form), l.model && Object.assign(this.model, l.model), t && this.loaded(), l;
    } catch (l) {
      throw this.states.load.failed(), l;
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
  resetOnly(a) {
    if (!Array.isArray(a))
      throw new Error("The keys should be an array.");
    a.forEach((t) => {
      Object.prototype.hasOwnProperty.call(this.original, t) && (this.form[t] = this.original[t]);
    });
  }
  resetExcept(a) {
    if (!Array.isArray(a))
      throw new Error("The keys should be an array.");
    Object.keys(this.form).forEach((t) => {
      console.log("key", t, !a.includes(t), this.original[t]), a.includes(t) || (this.form[t] = this.original[t]);
    });
  }
  delay(a = 0, t) {
    clearTimeout(this.timeout), this.timeout = setTimeout(t, a);
  }
  toJson() {
    return JSON.parse(JSON.stringify(this.form));
  }
}
function pe(e) {
  const a = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && a === "[object Date]" ? new e.constructor(+e) : typeof e == "number" || a === "[object Number]" || typeof e == "string" || a === "[object String]" ? new Date(e) : /* @__PURE__ */ new Date(NaN);
}
function Me(e, a) {
  return e instanceof Date ? new e.constructor(a) : new Date(a);
}
function wt(e, a) {
  const t = pe(e);
  return isNaN(a) ? Me(e, NaN) : (a && t.setDate(t.getDate() + a), t);
}
function xt(e, a) {
  const t = pe(e);
  if (isNaN(a))
    return Me(e, NaN);
  if (!a)
    return t;
  const n = t.getDate(), r = Me(e, t.getTime());
  r.setMonth(t.getMonth() + a + 1, 0);
  const l = r.getDate();
  return n >= l ? r : (t.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    n
  ), t);
}
function wr(e, a) {
  const {
    years: t = 0,
    months: n = 0,
    weeks: r = 0,
    days: l = 0,
    hours: o = 0,
    minutes: s = 0,
    seconds: u = 0
  } = a, h = pe(e), f = n || t ? xt(h, n + t * 12) : h, p = l || r ? wt(f, l + r * 7) : f, v = s + o * 60, $ = (u + v * 60) * 1e3;
  return Me(e, p.getTime() + $);
}
function Kl(e, a) {
  const t = +pe(e);
  return Me(e, t + a);
}
const _r = 6048e5, Xl = 864e5, Jl = 6e4, kr = 36e5, Zl = 1e3;
function eo(e, a) {
  return Kl(e, a * kr);
}
let to = {};
function ta() {
  return to;
}
function Tt(e, a) {
  var s, u, h, f;
  const t = ta(), n = (a == null ? void 0 : a.weekStartsOn) ?? ((u = (s = a == null ? void 0 : a.locale) == null ? void 0 : s.options) == null ? void 0 : u.weekStartsOn) ?? t.weekStartsOn ?? ((f = (h = t.locale) == null ? void 0 : h.options) == null ? void 0 : f.weekStartsOn) ?? 0, r = pe(e), l = r.getDay(), o = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - o), r.setHours(0, 0, 0, 0), r;
}
function sa(e) {
  return Tt(e, { weekStartsOn: 1 });
}
function xr(e) {
  const a = pe(e), t = a.getFullYear(), n = Me(e, 0);
  n.setFullYear(t + 1, 0, 4), n.setHours(0, 0, 0, 0);
  const r = sa(n), l = Me(e, 0);
  l.setFullYear(t, 0, 4), l.setHours(0, 0, 0, 0);
  const o = sa(l);
  return a.getTime() >= r.getTime() ? t + 1 : a.getTime() >= o.getTime() ? t : t - 1;
}
function Gn(e) {
  const a = pe(e);
  return a.setHours(0, 0, 0, 0), a;
}
function qa(e) {
  const a = pe(e), t = new Date(
    Date.UTC(
      a.getFullYear(),
      a.getMonth(),
      a.getDate(),
      a.getHours(),
      a.getMinutes(),
      a.getSeconds(),
      a.getMilliseconds()
    )
  );
  return t.setUTCFullYear(a.getFullYear()), +e - +t;
}
function Tr(e, a) {
  const t = Gn(e), n = Gn(a), r = +t - qa(t), l = +n - qa(n);
  return Math.round((r - l) / Xl);
}
function ao(e) {
  const a = xr(e), t = Me(e, 0);
  return t.setFullYear(a, 0, 4), t.setHours(0, 0, 0, 0), sa(t);
}
function no(e, a) {
  const t = a * 3;
  return xt(e, t);
}
function Pn(e, a) {
  return xt(e, a * 12);
}
function Kn(e, a) {
  const t = pe(e), n = pe(a), r = t.getTime() - n.getTime();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
function Pr(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ka(e) {
  if (!Pr(e) && typeof e != "number")
    return !1;
  const a = pe(e);
  return !isNaN(Number(a));
}
function Xn(e) {
  const a = pe(e);
  return Math.trunc(a.getMonth() / 3) + 1;
}
function ro(e, a) {
  const t = pe(e), n = pe(a);
  return t.getFullYear() - n.getFullYear();
}
function lo(e, a) {
  const t = pe(e), n = pe(a), r = Kn(t, n), l = Math.abs(ro(t, n));
  t.setFullYear(1584), n.setFullYear(1584);
  const o = Kn(t, n) === -r, s = r * (l - +o);
  return s === 0 ? 0 : s;
}
function Or(e, a) {
  const t = pe(e.start), n = pe(e.end);
  let r = +t > +n;
  const l = r ? +t : +n, o = r ? n : t;
  o.setHours(0, 0, 0, 0);
  let s = (a == null ? void 0 : a.step) ?? 1;
  if (!s)
    return [];
  s < 0 && (s = -s, r = !r);
  const u = [];
  for (; +o <= l; )
    u.push(pe(o)), o.setDate(o.getDate() + s), o.setHours(0, 0, 0, 0);
  return r ? u.reverse() : u;
}
function Kt(e) {
  const a = pe(e), t = a.getMonth(), n = t - t % 3;
  return a.setMonth(n, 1), a.setHours(0, 0, 0, 0), a;
}
function oo(e, a) {
  const t = pe(e.start), n = pe(e.end);
  let r = +t > +n;
  const l = r ? +Kt(t) : +Kt(n);
  let o = Kt(r ? n : t), s = (a == null ? void 0 : a.step) ?? 1;
  if (!s)
    return [];
  s < 0 && (s = -s, r = !r);
  const u = [];
  for (; +o <= l; )
    u.push(pe(o)), o = no(o, s);
  return r ? u.reverse() : u;
}
function so(e) {
  const a = pe(e);
  return a.setDate(1), a.setHours(0, 0, 0, 0), a;
}
function Dr(e) {
  const a = pe(e), t = a.getFullYear();
  return a.setFullYear(t + 1, 0, 0), a.setHours(23, 59, 59, 999), a;
}
function Pa(e) {
  const a = pe(e), t = Me(e, 0);
  return t.setFullYear(a.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function Mr(e, a) {
  var s, u, h, f;
  const t = ta(), n = (a == null ? void 0 : a.weekStartsOn) ?? ((u = (s = a == null ? void 0 : a.locale) == null ? void 0 : s.options) == null ? void 0 : u.weekStartsOn) ?? t.weekStartsOn ?? ((f = (h = t.locale) == null ? void 0 : h.options) == null ? void 0 : f.weekStartsOn) ?? 0, r = pe(e), l = r.getDay(), o = (l < n ? -7 : 0) + 6 - (l - n);
  return r.setDate(r.getDate() + o), r.setHours(23, 59, 59, 999), r;
}
function Jn(e) {
  const a = pe(e), t = a.getMonth(), n = t - t % 3 + 3;
  return a.setMonth(n, 0), a.setHours(23, 59, 59, 999), a;
}
const io = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, uo = (e, a, t) => {
  let n;
  const r = io[e];
  return typeof r == "string" ? n = r : a === 1 ? n = r.one : n = r.other.replace("{{count}}", a.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + n : n + " ago" : n;
};
function nn(e) {
  return (a = {}) => {
    const t = a.width ? String(a.width) : e.defaultWidth;
    return e.formats[t] || e.formats[e.defaultWidth];
  };
}
const co = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, mo = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, fo = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, po = {
  date: nn({
    formats: co,
    defaultWidth: "full"
  }),
  time: nn({
    formats: mo,
    defaultWidth: "full"
  }),
  dateTime: nn({
    formats: fo,
    defaultWidth: "full"
  })
}, ho = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, vo = (e, a, t, n) => ho[e];
function ga(e) {
  return (a, t) => {
    const n = t != null && t.context ? String(t.context) : "standalone";
    let r;
    if (n === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, s = t != null && t.width ? String(t.width) : o;
      r = e.formattingValues[s] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, s = t != null && t.width ? String(t.width) : e.defaultWidth;
      r = e.values[s] || e.values[o];
    }
    const l = e.argumentCallback ? e.argumentCallback(a) : a;
    return r[l];
  };
}
const yo = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, go = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, bo = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, wo = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, _o = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, ko = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, xo = (e, a) => {
  const t = Number(e), n = t % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return t + "st";
      case 2:
        return t + "nd";
      case 3:
        return t + "rd";
    }
  return t + "th";
}, To = {
  ordinalNumber: xo,
  era: ga({
    values: yo,
    defaultWidth: "wide"
  }),
  quarter: ga({
    values: go,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: ga({
    values: bo,
    defaultWidth: "wide"
  }),
  day: ga({
    values: wo,
    defaultWidth: "wide"
  }),
  dayPeriod: ga({
    values: _o,
    defaultWidth: "wide",
    formattingValues: ko,
    defaultFormattingWidth: "wide"
  })
};
function ba(e) {
  return (a, t = {}) => {
    const n = t.width, r = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], l = a.match(r);
    if (!l)
      return null;
    const o = l[0], s = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], u = Array.isArray(s) ? Oo(s, (p) => p.test(o)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      Po(s, (p) => p.test(o))
    );
    let h;
    h = e.valueCallback ? e.valueCallback(u) : u, h = t.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      t.valueCallback(h)
    ) : h;
    const f = a.slice(o.length);
    return { value: h, rest: f };
  };
}
function Po(e, a) {
  for (const t in e)
    if (Object.prototype.hasOwnProperty.call(e, t) && a(e[t]))
      return t;
}
function Oo(e, a) {
  for (let t = 0; t < e.length; t++)
    if (a(e[t]))
      return t;
}
function Do(e) {
  return (a, t = {}) => {
    const n = a.match(e.matchPattern);
    if (!n)
      return null;
    const r = n[0], l = a.match(e.parsePattern);
    if (!l)
      return null;
    let o = e.valueCallback ? e.valueCallback(l[0]) : l[0];
    o = t.valueCallback ? t.valueCallback(o) : o;
    const s = a.slice(r.length);
    return { value: o, rest: s };
  };
}
const Mo = /^(\d+)(th|st|nd|rd)?/i, So = /\d+/i, Ao = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, $o = {
  any: [/^b/i, /^(a|c)/i]
}, Ro = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Co = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Fo = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Yo = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, No = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Io = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Eo = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, qo = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Lo = {
  ordinalNumber: Do({
    matchPattern: Mo,
    parsePattern: So,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: ba({
    matchPatterns: Ao,
    defaultMatchWidth: "wide",
    parsePatterns: $o,
    defaultParseWidth: "any"
  }),
  quarter: ba({
    matchPatterns: Ro,
    defaultMatchWidth: "wide",
    parsePatterns: Co,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: ba({
    matchPatterns: Fo,
    defaultMatchWidth: "wide",
    parsePatterns: Yo,
    defaultParseWidth: "any"
  }),
  day: ba({
    matchPatterns: No,
    defaultMatchWidth: "wide",
    parsePatterns: Io,
    defaultParseWidth: "any"
  }),
  dayPeriod: ba({
    matchPatterns: Eo,
    defaultMatchWidth: "any",
    parsePatterns: qo,
    defaultParseWidth: "any"
  })
}, Sr = {
  code: "en-US",
  formatDistance: uo,
  formatLong: po,
  formatRelative: vo,
  localize: To,
  match: Lo,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Vo(e) {
  const a = pe(e);
  return Tr(a, Pa(a)) + 1;
}
function On(e) {
  const a = pe(e), t = +sa(a) - +ao(a);
  return Math.round(t / _r) + 1;
}
function Dn(e, a) {
  var f, p, v, g;
  const t = pe(e), n = t.getFullYear(), r = ta(), l = (a == null ? void 0 : a.firstWeekContainsDate) ?? ((p = (f = a == null ? void 0 : a.locale) == null ? void 0 : f.options) == null ? void 0 : p.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((g = (v = r.locale) == null ? void 0 : v.options) == null ? void 0 : g.firstWeekContainsDate) ?? 1, o = Me(e, 0);
  o.setFullYear(n + 1, 0, l), o.setHours(0, 0, 0, 0);
  const s = Tt(o, a), u = Me(e, 0);
  u.setFullYear(n, 0, l), u.setHours(0, 0, 0, 0);
  const h = Tt(u, a);
  return t.getTime() >= s.getTime() ? n + 1 : t.getTime() >= h.getTime() ? n : n - 1;
}
function Bo(e, a) {
  var s, u, h, f;
  const t = ta(), n = (a == null ? void 0 : a.firstWeekContainsDate) ?? ((u = (s = a == null ? void 0 : a.locale) == null ? void 0 : s.options) == null ? void 0 : u.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((f = (h = t.locale) == null ? void 0 : h.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, r = Dn(e, a), l = Me(e, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Tt(l, a);
}
function Mn(e, a) {
  const t = pe(e), n = +Tt(t, a) - +Bo(t, a);
  return Math.round(n / _r) + 1;
}
function $e(e, a) {
  const t = e < 0 ? "-" : "", n = Math.abs(e).toString().padStart(a, "0");
  return t + n;
}
const Et = {
  // Year
  y(e, a) {
    const t = e.getFullYear(), n = t > 0 ? t : 1 - t;
    return $e(a === "yy" ? n % 100 : n, a.length);
  },
  // Month
  M(e, a) {
    const t = e.getMonth();
    return a === "M" ? String(t + 1) : $e(t + 1, 2);
  },
  // Day of the month
  d(e, a) {
    return $e(e.getDate(), a.length);
  },
  // AM or PM
  a(e, a) {
    const t = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (a) {
      case "a":
      case "aa":
        return t.toUpperCase();
      case "aaa":
        return t;
      case "aaaaa":
        return t[0];
      case "aaaa":
      default:
        return t === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, a) {
    return $e(e.getHours() % 12 || 12, a.length);
  },
  // Hour [0-23]
  H(e, a) {
    return $e(e.getHours(), a.length);
  },
  // Minute
  m(e, a) {
    return $e(e.getMinutes(), a.length);
  },
  // Second
  s(e, a) {
    return $e(e.getSeconds(), a.length);
  },
  // Fraction of second
  S(e, a) {
    const t = a.length, n = e.getMilliseconds(), r = Math.trunc(
      n * Math.pow(10, t - 3)
    );
    return $e(r, a.length);
  }
}, aa = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Zn = {
  // Era
  G: function(e, a, t) {
    const n = e.getFullYear() > 0 ? 1 : 0;
    switch (a) {
      case "G":
      case "GG":
      case "GGG":
        return t.era(n, { width: "abbreviated" });
      case "GGGGG":
        return t.era(n, { width: "narrow" });
      case "GGGG":
      default:
        return t.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(e, a, t) {
    if (a === "yo") {
      const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
      return t.ordinalNumber(r, { unit: "year" });
    }
    return Et.y(e, a);
  },
  // Local week-numbering year
  Y: function(e, a, t, n) {
    const r = Dn(e, n), l = r > 0 ? r : 1 - r;
    if (a === "YY") {
      const o = l % 100;
      return $e(o, 2);
    }
    return a === "Yo" ? t.ordinalNumber(l, { unit: "year" }) : $e(l, a.length);
  },
  // ISO week-numbering year
  R: function(e, a) {
    const t = xr(e);
    return $e(t, a.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, a) {
    const t = e.getFullYear();
    return $e(t, a.length);
  },
  // Quarter
  Q: function(e, a, t) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (a) {
      case "Q":
        return String(n);
      case "QQ":
        return $e(n, 2);
      case "Qo":
        return t.ordinalNumber(n, { unit: "quarter" });
      case "QQQ":
        return t.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return t.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return t.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, a, t) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (a) {
      case "q":
        return String(n);
      case "qq":
        return $e(n, 2);
      case "qo":
        return t.ordinalNumber(n, { unit: "quarter" });
      case "qqq":
        return t.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return t.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return t.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, a, t) {
    const n = e.getMonth();
    switch (a) {
      case "M":
      case "MM":
        return Et.M(e, a);
      case "Mo":
        return t.ordinalNumber(n + 1, { unit: "month" });
      case "MMM":
        return t.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return t.month(n, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return t.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, a, t) {
    const n = e.getMonth();
    switch (a) {
      case "L":
        return String(n + 1);
      case "LL":
        return $e(n + 1, 2);
      case "Lo":
        return t.ordinalNumber(n + 1, { unit: "month" });
      case "LLL":
        return t.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return t.month(n, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return t.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, a, t, n) {
    const r = Mn(e, n);
    return a === "wo" ? t.ordinalNumber(r, { unit: "week" }) : $e(r, a.length);
  },
  // ISO week of year
  I: function(e, a, t) {
    const n = On(e);
    return a === "Io" ? t.ordinalNumber(n, { unit: "week" }) : $e(n, a.length);
  },
  // Day of the month
  d: function(e, a, t) {
    return a === "do" ? t.ordinalNumber(e.getDate(), { unit: "date" }) : Et.d(e, a);
  },
  // Day of year
  D: function(e, a, t) {
    const n = Vo(e);
    return a === "Do" ? t.ordinalNumber(n, { unit: "dayOfYear" }) : $e(n, a.length);
  },
  // Day of week
  E: function(e, a, t) {
    const n = e.getDay();
    switch (a) {
      case "E":
      case "EE":
      case "EEE":
        return t.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return t.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return t.day(n, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return t.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, a, t, n) {
    const r = e.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (a) {
      case "e":
        return String(l);
      case "ee":
        return $e(l, 2);
      case "eo":
        return t.ordinalNumber(l, { unit: "day" });
      case "eee":
        return t.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return t.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return t.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return t.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, a, t, n) {
    const r = e.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (a) {
      case "c":
        return String(l);
      case "cc":
        return $e(l, a.length);
      case "co":
        return t.ordinalNumber(l, { unit: "day" });
      case "ccc":
        return t.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return t.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return t.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return t.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, a, t) {
    const n = e.getDay(), r = n === 0 ? 7 : n;
    switch (a) {
      case "i":
        return String(r);
      case "ii":
        return $e(r, a.length);
      case "io":
        return t.ordinalNumber(r, { unit: "day" });
      case "iii":
        return t.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return t.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return t.day(n, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return t.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, a, t) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (a) {
      case "a":
      case "aa":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, a, t) {
    const n = e.getHours();
    let r;
    switch (n === 12 ? r = aa.noon : n === 0 ? r = aa.midnight : r = n / 12 >= 1 ? "pm" : "am", a) {
      case "b":
      case "bb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, a, t) {
    const n = e.getHours();
    let r;
    switch (n >= 17 ? r = aa.evening : n >= 12 ? r = aa.afternoon : n >= 4 ? r = aa.morning : r = aa.night, a) {
      case "B":
      case "BB":
      case "BBB":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, a, t) {
    if (a === "ho") {
      let n = e.getHours() % 12;
      return n === 0 && (n = 12), t.ordinalNumber(n, { unit: "hour" });
    }
    return Et.h(e, a);
  },
  // Hour [0-23]
  H: function(e, a, t) {
    return a === "Ho" ? t.ordinalNumber(e.getHours(), { unit: "hour" }) : Et.H(e, a);
  },
  // Hour [0-11]
  K: function(e, a, t) {
    const n = e.getHours() % 12;
    return a === "Ko" ? t.ordinalNumber(n, { unit: "hour" }) : $e(n, a.length);
  },
  // Hour [1-24]
  k: function(e, a, t) {
    let n = e.getHours();
    return n === 0 && (n = 24), a === "ko" ? t.ordinalNumber(n, { unit: "hour" }) : $e(n, a.length);
  },
  // Minute
  m: function(e, a, t) {
    return a === "mo" ? t.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Et.m(e, a);
  },
  // Second
  s: function(e, a, t) {
    return a === "so" ? t.ordinalNumber(e.getSeconds(), { unit: "second" }) : Et.s(e, a);
  },
  // Fraction of second
  S: function(e, a) {
    return Et.S(e, a);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, a, t) {
    const n = e.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (a) {
      case "X":
        return tr(n);
      case "XXXX":
      case "XX":
        return Qt(n);
      case "XXXXX":
      case "XXX":
      default:
        return Qt(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, a, t) {
    const n = e.getTimezoneOffset();
    switch (a) {
      case "x":
        return tr(n);
      case "xxxx":
      case "xx":
        return Qt(n);
      case "xxxxx":
      case "xxx":
      default:
        return Qt(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, a, t) {
    const n = e.getTimezoneOffset();
    switch (a) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + er(n, ":");
      case "OOOO":
      default:
        return "GMT" + Qt(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, a, t) {
    const n = e.getTimezoneOffset();
    switch (a) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + er(n, ":");
      case "zzzz":
      default:
        return "GMT" + Qt(n, ":");
    }
  },
  // Seconds timestamp
  t: function(e, a, t) {
    const n = Math.trunc(e.getTime() / 1e3);
    return $e(n, a.length);
  },
  // Milliseconds timestamp
  T: function(e, a, t) {
    const n = e.getTime();
    return $e(n, a.length);
  }
};
function er(e, a = "") {
  const t = e > 0 ? "-" : "+", n = Math.abs(e), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? t + String(r) : t + String(r) + a + $e(l, 2);
}
function tr(e, a) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + $e(Math.abs(e) / 60, 2) : Qt(e, a);
}
function Qt(e, a = "") {
  const t = e > 0 ? "-" : "+", n = Math.abs(e), r = $e(Math.trunc(n / 60), 2), l = $e(n % 60, 2);
  return t + r + a + l;
}
const ar = (e, a) => {
  switch (e) {
    case "P":
      return a.date({ width: "short" });
    case "PP":
      return a.date({ width: "medium" });
    case "PPP":
      return a.date({ width: "long" });
    case "PPPP":
    default:
      return a.date({ width: "full" });
  }
}, Ar = (e, a) => {
  switch (e) {
    case "p":
      return a.time({ width: "short" });
    case "pp":
      return a.time({ width: "medium" });
    case "ppp":
      return a.time({ width: "long" });
    case "pppp":
    default:
      return a.time({ width: "full" });
  }
}, jo = (e, a) => {
  const t = e.match(/(P+)(p+)?/) || [], n = t[1], r = t[2];
  if (!r)
    return ar(e, a);
  let l;
  switch (n) {
    case "P":
      l = a.dateTime({ width: "short" });
      break;
    case "PP":
      l = a.dateTime({ width: "medium" });
      break;
    case "PPP":
      l = a.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      l = a.dateTime({ width: "full" });
      break;
  }
  return l.replace("{{date}}", ar(n, a)).replace("{{time}}", Ar(r, a));
}, vn = {
  p: Ar,
  P: jo
}, Wo = /^D+$/, Ho = /^Y+$/, zo = ["D", "DD", "YY", "YYYY"];
function $r(e) {
  return Wo.test(e);
}
function Rr(e) {
  return Ho.test(e);
}
function yn(e, a, t) {
  const n = Uo(e, a, t);
  if (console.warn(n), zo.includes(e))
    throw new RangeError(n);
}
function Uo(e, a, t) {
  const n = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${a}\`) for formatting ${n} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Qo = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Go = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ko = /^'([^]*?)'?$/, Xo = /''/g, Jo = /[a-zA-Z]/;
function At(e, a, t) {
  var f, p, v, g, $, P, U, V;
  const n = ta(), r = (t == null ? void 0 : t.locale) ?? n.locale ?? Sr, l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((p = (f = t == null ? void 0 : t.locale) == null ? void 0 : f.options) == null ? void 0 : p.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((g = (v = n.locale) == null ? void 0 : v.options) == null ? void 0 : g.firstWeekContainsDate) ?? 1, o = (t == null ? void 0 : t.weekStartsOn) ?? ((P = ($ = t == null ? void 0 : t.locale) == null ? void 0 : $.options) == null ? void 0 : P.weekStartsOn) ?? n.weekStartsOn ?? ((V = (U = n.locale) == null ? void 0 : U.options) == null ? void 0 : V.weekStartsOn) ?? 0, s = pe(e);
  if (!ka(s))
    throw new RangeError("Invalid time value");
  let u = a.match(Go).map((B) => {
    const O = B[0];
    if (O === "p" || O === "P") {
      const H = vn[O];
      return H(B, r.formatLong);
    }
    return B;
  }).join("").match(Qo).map((B) => {
    if (B === "''")
      return { isToken: !1, value: "'" };
    const O = B[0];
    if (O === "'")
      return { isToken: !1, value: Zo(B) };
    if (Zn[O])
      return { isToken: !0, value: B };
    if (O.match(Jo))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + O + "`"
      );
    return { isToken: !1, value: B };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(s, u));
  const h = {
    firstWeekContainsDate: l,
    weekStartsOn: o,
    locale: r
  };
  return u.map((B) => {
    if (!B.isToken)
      return B.value;
    const O = B.value;
    (!(t != null && t.useAdditionalWeekYearTokens) && Rr(O) || !(t != null && t.useAdditionalDayOfYearTokens) && $r(O)) && yn(O, a, String(e));
    const H = Zn[O[0]];
    return H(s, O, r.localize, h);
  }).join("");
}
function Zo(e) {
  const a = e.match(Ko);
  return a ? a[1].replace(Xo, "'") : e;
}
function es(e) {
  return pe(e).getDay();
}
function ts(e) {
  const a = pe(e), t = a.getFullYear(), n = a.getMonth(), r = Me(e, 0);
  return r.setFullYear(t, n + 1, 0), r.setHours(0, 0, 0, 0), r.getDate();
}
function as() {
  return Object.assign({}, ta());
}
function Ft(e) {
  return pe(e).getHours();
}
function ns(e) {
  let t = pe(e).getDay();
  return t === 0 && (t = 7), t;
}
function jt(e) {
  return pe(e).getMinutes();
}
function Pe(e) {
  return pe(e).getMonth();
}
function ia(e) {
  return pe(e).getSeconds();
}
function we(e) {
  return pe(e).getFullYear();
}
function ua(e, a) {
  const t = pe(e), n = pe(a);
  return t.getTime() > n.getTime();
}
function Oa(e, a) {
  const t = pe(e), n = pe(a);
  return +t < +n;
}
function la(e, a) {
  const t = pe(e), n = pe(a);
  return +t == +n;
}
function rs(e, a) {
  const t = a instanceof Date ? Me(a, 0) : new a(0);
  return t.setFullYear(
    e.getFullYear(),
    e.getMonth(),
    e.getDate()
  ), t.setHours(
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  ), t;
}
const ls = 10;
class Cr {
  constructor() {
    z(this, "subPriority", 0);
  }
  validate(a, t) {
    return !0;
  }
}
class os extends Cr {
  constructor(a, t, n, r, l) {
    super(), this.value = a, this.validateValue = t, this.setValue = n, this.priority = r, l && (this.subPriority = l);
  }
  validate(a, t) {
    return this.validateValue(a, this.value, t);
  }
  set(a, t, n) {
    return this.setValue(a, t, this.value, n);
  }
}
class ss extends Cr {
  constructor() {
    super(...arguments);
    z(this, "priority", ls);
    z(this, "subPriority", -1);
  }
  set(t, n) {
    return n.timestampIsSet ? t : Me(t, rs(t, Date));
  }
}
class Se {
  run(a, t, n, r) {
    const l = this.parse(a, t, n, r);
    return l ? {
      setter: new os(
        l.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: l.rest
    } : null;
  }
  validate(a, t, n) {
    return !0;
  }
}
class is extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 140);
    z(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "G":
      case "GG":
      case "GGG":
        return r.era(t, { width: "abbreviated" }) || r.era(t, { width: "narrow" });
      case "GGGGG":
        return r.era(t, { width: "narrow" });
      case "GGGG":
      default:
        return r.era(t, { width: "wide" }) || r.era(t, { width: "abbreviated" }) || r.era(t, { width: "narrow" });
    }
  }
  set(t, n, r) {
    return n.era = r, t.setFullYear(r, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
const Ue = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, Dt = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function Qe(e, a) {
  return e && {
    value: a(e.value),
    rest: e.rest
  };
}
function Le(e, a) {
  const t = a.match(e);
  return t ? {
    value: parseInt(t[0], 10),
    rest: a.slice(t[0].length)
  } : null;
}
function Mt(e, a) {
  const t = a.match(e);
  if (!t)
    return null;
  if (t[0] === "Z")
    return {
      value: 0,
      rest: a.slice(1)
    };
  const n = t[1] === "+" ? 1 : -1, r = t[2] ? parseInt(t[2], 10) : 0, l = t[3] ? parseInt(t[3], 10) : 0, o = t[5] ? parseInt(t[5], 10) : 0;
  return {
    value: n * (r * kr + l * Jl + o * Zl),
    rest: a.slice(t[0].length)
  };
}
function Fr(e) {
  return Le(Ue.anyDigitsSigned, e);
}
function je(e, a) {
  switch (e) {
    case 1:
      return Le(Ue.singleDigit, a);
    case 2:
      return Le(Ue.twoDigits, a);
    case 3:
      return Le(Ue.threeDigits, a);
    case 4:
      return Le(Ue.fourDigits, a);
    default:
      return Le(new RegExp("^\\d{1," + e + "}"), a);
  }
}
function La(e, a) {
  switch (e) {
    case 1:
      return Le(Ue.singleDigitSigned, a);
    case 2:
      return Le(Ue.twoDigitsSigned, a);
    case 3:
      return Le(Ue.threeDigitsSigned, a);
    case 4:
      return Le(Ue.fourDigitsSigned, a);
    default:
      return Le(new RegExp("^-?\\d{1," + e + "}"), a);
  }
}
function Sn(e) {
  switch (e) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function Yr(e, a) {
  const t = a > 0, n = t ? a : 1 - a;
  let r;
  if (n <= 50)
    r = e || 100;
  else {
    const l = n + 50, o = Math.trunc(l / 100) * 100, s = e >= l % 100;
    r = e + o - (s ? 100 : 0);
  }
  return t ? r : 1 - r;
}
function Nr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
class us extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 130);
    z(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(t, n, r) {
    const l = (o) => ({
      year: o,
      isTwoDigitYear: n === "yy"
    });
    switch (n) {
      case "y":
        return Qe(je(4, t), l);
      case "yo":
        return Qe(
          r.ordinalNumber(t, {
            unit: "year"
          }),
          l
        );
      default:
        return Qe(je(n.length, t), l);
    }
  }
  validate(t, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(t, n, r) {
    const l = t.getFullYear();
    if (r.isTwoDigitYear) {
      const s = Yr(
        r.year,
        l
      );
      return t.setFullYear(s, 0, 1), t.setHours(0, 0, 0, 0), t;
    }
    const o = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return t.setFullYear(o, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class ds extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 130);
    z(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    const l = (o) => ({
      year: o,
      isTwoDigitYear: n === "YY"
    });
    switch (n) {
      case "Y":
        return Qe(je(4, t), l);
      case "Yo":
        return Qe(
          r.ordinalNumber(t, {
            unit: "year"
          }),
          l
        );
      default:
        return Qe(je(n.length, t), l);
    }
  }
  validate(t, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(t, n, r, l) {
    const o = Dn(t, l);
    if (r.isTwoDigitYear) {
      const u = Yr(
        r.year,
        o
      );
      return t.setFullYear(
        u,
        0,
        l.firstWeekContainsDate
      ), t.setHours(0, 0, 0, 0), Tt(t, l);
    }
    const s = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return t.setFullYear(s, 0, l.firstWeekContainsDate), t.setHours(0, 0, 0, 0), Tt(t, l);
  }
}
class cs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 130);
    z(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n) {
    return La(n === "R" ? 4 : n.length, t);
  }
  set(t, n, r) {
    const l = Me(t, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), sa(l);
  }
}
class ms extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 130);
    z(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(t, n) {
    return La(n === "u" ? 4 : n.length, t);
  }
  set(t, n, r) {
    return t.setFullYear(r, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class fs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 120);
    z(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    switch (n) {
      case "Q":
      case "QQ":
        return je(n.length, t);
      case "Qo":
        return r.ordinalNumber(t, { unit: "quarter" });
      case "QQQ":
        return r.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQQ":
        return r.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return r.quarter(t, {
          width: "wide",
          context: "formatting"
        }) || r.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 4;
  }
  set(t, n, r) {
    return t.setMonth((r - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class ps extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 120);
    z(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    switch (n) {
      case "q":
      case "qq":
        return je(n.length, t);
      case "qo":
        return r.ordinalNumber(t, { unit: "quarter" });
      case "qqq":
        return r.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqqq":
        return r.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return r.quarter(t, {
          width: "wide",
          context: "standalone"
        }) || r.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 4;
  }
  set(t, n, r) {
    return t.setMonth((r - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class hs extends Se {
  constructor() {
    super(...arguments);
    z(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    z(this, "priority", 110);
  }
  parse(t, n, r) {
    const l = (o) => o - 1;
    switch (n) {
      case "M":
        return Qe(
          Le(Ue.month, t),
          l
        );
      case "MM":
        return Qe(je(2, t), l);
      case "Mo":
        return Qe(
          r.ordinalNumber(t, {
            unit: "month"
          }),
          l
        );
      case "MMM":
        return r.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(t, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return r.month(t, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return r.month(t, { width: "wide", context: "formatting" }) || r.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 11;
  }
  set(t, n, r) {
    return t.setMonth(r, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class vs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 110);
    z(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    const l = (o) => o - 1;
    switch (n) {
      case "L":
        return Qe(
          Le(Ue.month, t),
          l
        );
      case "LL":
        return Qe(je(2, t), l);
      case "Lo":
        return Qe(
          r.ordinalNumber(t, {
            unit: "month"
          }),
          l
        );
      case "LLL":
        return r.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(t, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return r.month(t, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return r.month(t, { width: "wide", context: "standalone" }) || r.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 11;
  }
  set(t, n, r) {
    return t.setMonth(r, 1), t.setHours(0, 0, 0, 0), t;
  }
}
function ys(e, a, t) {
  const n = pe(e), r = Mn(n, t) - a;
  return n.setDate(n.getDate() - r * 7), n;
}
class gs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 100);
    z(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    switch (n) {
      case "w":
        return Le(Ue.week, t);
      case "wo":
        return r.ordinalNumber(t, { unit: "week" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 53;
  }
  set(t, n, r, l) {
    return Tt(ys(t, r, l), l);
  }
}
function bs(e, a) {
  const t = pe(e), n = On(t) - a;
  return t.setDate(t.getDate() - n * 7), t;
}
class ws extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 100);
    z(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    switch (n) {
      case "I":
        return Le(Ue.week, t);
      case "Io":
        return r.ordinalNumber(t, { unit: "week" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 53;
  }
  set(t, n, r) {
    return sa(bs(t, r));
  }
}
const _s = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ks = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
class xs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 90);
    z(this, "subPriority", 1);
    z(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    switch (n) {
      case "d":
        return Le(Ue.date, t);
      case "do":
        return r.ordinalNumber(t, { unit: "date" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    const r = t.getFullYear(), l = Nr(r), o = t.getMonth();
    return l ? n >= 1 && n <= ks[o] : n >= 1 && n <= _s[o];
  }
  set(t, n, r) {
    return t.setDate(r), t.setHours(0, 0, 0, 0), t;
  }
}
class Ts extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 90);
    z(this, "subpriority", 1);
    z(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    switch (n) {
      case "D":
      case "DD":
        return Le(Ue.dayOfYear, t);
      case "Do":
        return r.ordinalNumber(t, { unit: "date" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    const r = t.getFullYear();
    return Nr(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(t, n, r) {
    return t.setMonth(0, r), t.setHours(0, 0, 0, 0), t;
  }
}
function An(e, a, t) {
  var p, v, g, $;
  const n = ta(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((v = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : v.weekStartsOn) ?? n.weekStartsOn ?? (($ = (g = n.locale) == null ? void 0 : g.options) == null ? void 0 : $.weekStartsOn) ?? 0, l = pe(e), o = l.getDay(), u = (a % 7 + 7) % 7, h = 7 - r, f = a < 0 || a > 6 ? a - (o + h) % 7 : (u + h) % 7 - (o + h) % 7;
  return wt(l, f);
}
class Ps extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 90);
    z(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "E":
      case "EE":
      case "EEE":
        return r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return r.day(t, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return r.day(t, { width: "wide", context: "formatting" }) || r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 6;
  }
  set(t, n, r, l) {
    return t = An(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
class Os extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 90);
    z(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r, l) {
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (n) {
      case "e":
      case "ee":
        return Qe(je(n.length, t), o);
      case "eo":
        return Qe(
          r.ordinalNumber(t, {
            unit: "day"
          }),
          o
        );
      case "eee":
        return r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      case "eeeee":
        return r.day(t, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return r.day(t, { width: "wide", context: "formatting" }) || r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 6;
  }
  set(t, n, r, l) {
    return t = An(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
class Ds extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 90);
    z(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(t, n, r, l) {
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (n) {
      case "c":
      case "cc":
        return Qe(je(n.length, t), o);
      case "co":
        return Qe(
          r.ordinalNumber(t, {
            unit: "day"
          }),
          o
        );
      case "ccc":
        return r.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(t, { width: "short", context: "standalone" }) || r.day(t, { width: "narrow", context: "standalone" });
      case "ccccc":
        return r.day(t, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return r.day(t, { width: "short", context: "standalone" }) || r.day(t, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return r.day(t, { width: "wide", context: "standalone" }) || r.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(t, { width: "short", context: "standalone" }) || r.day(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 6;
  }
  set(t, n, r, l) {
    return t = An(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
function Ms(e, a) {
  const t = pe(e), n = ns(t), r = a - n;
  return wt(t, r);
}
class Ss extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 90);
    z(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, n, r) {
    const l = (o) => o === 0 ? 7 : o;
    switch (n) {
      case "i":
      case "ii":
        return je(n.length, t);
      case "io":
        return r.ordinalNumber(t, { unit: "day" });
      case "iii":
        return Qe(
          r.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(t, {
            width: "short",
            context: "formatting"
          }) || r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiii":
        return Qe(
          r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiiii":
        return Qe(
          r.day(t, {
            width: "short",
            context: "formatting"
          }) || r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiii":
      default:
        return Qe(
          r.day(t, {
            width: "wide",
            context: "formatting"
          }) || r.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(t, {
            width: "short",
            context: "formatting"
          }) || r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 7;
  }
  set(t, n, r) {
    return t = Ms(t, r), t.setHours(0, 0, 0, 0), t;
  }
}
class As extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 80);
    z(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "a":
      case "aa":
      case "aaa":
        return r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, n, r) {
    return t.setHours(Sn(r), 0, 0, 0), t;
  }
}
class $s extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 80);
    z(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "b":
      case "bb":
      case "bbb":
        return r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, n, r) {
    return t.setHours(Sn(r), 0, 0, 0), t;
  }
}
class Rs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 80);
    z(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, n, r) {
    return t.setHours(Sn(r), 0, 0, 0), t;
  }
}
class Cs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 70);
    z(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "h":
        return Le(Ue.hour12h, t);
      case "ho":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 12;
  }
  set(t, n, r) {
    const l = t.getHours() >= 12;
    return l && r < 12 ? t.setHours(r + 12, 0, 0, 0) : !l && r === 12 ? t.setHours(0, 0, 0, 0) : t.setHours(r, 0, 0, 0), t;
  }
}
class Fs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 70);
    z(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "H":
        return Le(Ue.hour23h, t);
      case "Ho":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 23;
  }
  set(t, n, r) {
    return t.setHours(r, 0, 0, 0), t;
  }
}
class Ys extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 70);
    z(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "K":
        return Le(Ue.hour11h, t);
      case "Ko":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 11;
  }
  set(t, n, r) {
    return t.getHours() >= 12 && r < 12 ? t.setHours(r + 12, 0, 0, 0) : t.setHours(r, 0, 0, 0), t;
  }
}
class Ns extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 70);
    z(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "k":
        return Le(Ue.hour24h, t);
      case "ko":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 24;
  }
  set(t, n, r) {
    const l = r <= 24 ? r % 24 : r;
    return t.setHours(l, 0, 0, 0), t;
  }
}
class Is extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 60);
    z(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "m":
        return Le(Ue.minute, t);
      case "mo":
        return r.ordinalNumber(t, { unit: "minute" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 59;
  }
  set(t, n, r) {
    return t.setMinutes(r, 0, 0), t;
  }
}
class Es extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 50);
    z(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "s":
        return Le(Ue.second, t);
      case "so":
        return r.ordinalNumber(t, { unit: "second" });
      default:
        return je(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 59;
  }
  set(t, n, r) {
    return t.setSeconds(r, 0), t;
  }
}
class qs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 30);
    z(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return Qe(je(n.length, t), r);
  }
  set(t, n, r) {
    return t.setMilliseconds(r), t;
  }
}
class Ls extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 10);
    z(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(t, n) {
    switch (n) {
      case "X":
        return Mt(
          Dt.basicOptionalMinutes,
          t
        );
      case "XX":
        return Mt(Dt.basic, t);
      case "XXXX":
        return Mt(
          Dt.basicOptionalSeconds,
          t
        );
      case "XXXXX":
        return Mt(
          Dt.extendedOptionalSeconds,
          t
        );
      case "XXX":
      default:
        return Mt(Dt.extended, t);
    }
  }
  set(t, n, r) {
    return n.timestampIsSet ? t : Me(
      t,
      t.getTime() - qa(t) - r
    );
  }
}
class Vs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 10);
    z(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(t, n) {
    switch (n) {
      case "x":
        return Mt(
          Dt.basicOptionalMinutes,
          t
        );
      case "xx":
        return Mt(Dt.basic, t);
      case "xxxx":
        return Mt(
          Dt.basicOptionalSeconds,
          t
        );
      case "xxxxx":
        return Mt(
          Dt.extendedOptionalSeconds,
          t
        );
      case "xxx":
      default:
        return Mt(Dt.extended, t);
    }
  }
  set(t, n, r) {
    return n.timestampIsSet ? t : Me(
      t,
      t.getTime() - qa(t) - r
    );
  }
}
class Bs extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 40);
    z(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return Fr(t);
  }
  set(t, n, r) {
    return [Me(t, r * 1e3), { timestampIsSet: !0 }];
  }
}
class js extends Se {
  constructor() {
    super(...arguments);
    z(this, "priority", 20);
    z(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return Fr(t);
  }
  set(t, n, r) {
    return [Me(t, r), { timestampIsSet: !0 }];
  }
}
const Ws = {
  G: new is(),
  y: new us(),
  Y: new ds(),
  R: new cs(),
  u: new ms(),
  Q: new fs(),
  q: new ps(),
  M: new hs(),
  L: new vs(),
  w: new gs(),
  I: new ws(),
  d: new xs(),
  D: new Ts(),
  E: new Ps(),
  e: new Os(),
  c: new Ds(),
  i: new Ss(),
  a: new As(),
  b: new $s(),
  B: new Rs(),
  h: new Cs(),
  H: new Fs(),
  K: new Ys(),
  k: new Ns(),
  m: new Is(),
  s: new Es(),
  S: new qs(),
  X: new Ls(),
  x: new Vs(),
  t: new Bs(),
  T: new js()
}, Hs = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, zs = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Us = /^'([^]*?)'?$/, Qs = /''/g, Gs = /\S/, Ks = /[a-zA-Z]/;
function gn(e, a, t, n) {
  var P, U, V, B, O, H, re, Y;
  const r = as(), l = (n == null ? void 0 : n.locale) ?? r.locale ?? Sr, o = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((U = (P = n == null ? void 0 : n.locale) == null ? void 0 : P.options) == null ? void 0 : U.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((B = (V = r.locale) == null ? void 0 : V.options) == null ? void 0 : B.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((H = (O = n == null ? void 0 : n.locale) == null ? void 0 : O.options) == null ? void 0 : H.weekStartsOn) ?? r.weekStartsOn ?? ((Y = (re = r.locale) == null ? void 0 : re.options) == null ? void 0 : Y.weekStartsOn) ?? 0;
  if (a === "")
    return e === "" ? pe(t) : Me(t, NaN);
  const u = {
    firstWeekContainsDate: o,
    weekStartsOn: s,
    locale: l
  }, h = [new ss()], f = a.match(zs).map((T) => {
    const G = T[0];
    if (G in vn) {
      const q = vn[G];
      return q(T, l.formatLong);
    }
    return T;
  }).join("").match(Hs), p = [];
  for (let T of f) {
    !(n != null && n.useAdditionalWeekYearTokens) && Rr(T) && yn(T, a, e), !(n != null && n.useAdditionalDayOfYearTokens) && $r(T) && yn(T, a, e);
    const G = T[0], q = Ws[G];
    if (q) {
      const { incompatibleTokens: F } = q;
      if (Array.isArray(F)) {
        const fe = p.find(
          (he) => F.includes(he.token) || he.token === G
        );
        if (fe)
          throw new RangeError(
            `The format string mustn't contain \`${fe.fullToken}\` and \`${T}\` at the same time`
          );
      } else if (q.incompatibleTokens === "*" && p.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${T}\` and any other token at the same time`
        );
      p.push({ token: G, fullToken: T });
      const ie = q.run(
        e,
        T,
        l.match,
        u
      );
      if (!ie)
        return Me(t, NaN);
      h.push(ie.setter), e = ie.rest;
    } else {
      if (G.match(Ks))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + G + "`"
        );
      if (T === "''" ? T = "'" : G === "'" && (T = Xs(T)), e.indexOf(T) === 0)
        e = e.slice(T.length);
      else
        return Me(t, NaN);
    }
  }
  if (e.length > 0 && Gs.test(e))
    return Me(t, NaN);
  const v = h.map((T) => T.priority).sort((T, G) => G - T).filter((T, G, q) => q.indexOf(T) === G).map(
    (T) => h.filter((G) => G.priority === T).sort((G, q) => q.subPriority - G.subPriority)
  ).map((T) => T[0]);
  let g = pe(t);
  if (isNaN(g.getTime()))
    return Me(t, NaN);
  const $ = {};
  for (const T of v) {
    if (!T.validate(g, u))
      return Me(t, NaN);
    const G = T.set(g, $, u);
    Array.isArray(G) ? (g = G[0], Object.assign($, G[1])) : g = G;
  }
  return Me(t, g);
}
function Xs(e) {
  return e.match(Us)[1].replace(Qs, "'");
}
function nr(e, a) {
  const t = Kt(e), n = Kt(a);
  return +t == +n;
}
function Js(e, a) {
  return wt(e, -a);
}
function Ir(e, a) {
  const t = pe(e), n = t.getFullYear(), r = t.getDate(), l = Me(e, 0);
  l.setFullYear(n, a, 15), l.setHours(0, 0, 0, 0);
  const o = ts(l);
  return t.setMonth(a, Math.min(r, o)), t;
}
function Ce(e, a) {
  let t = pe(e);
  return isNaN(+t) ? Me(e, NaN) : (a.year != null && t.setFullYear(a.year), a.month != null && (t = Ir(t, a.month)), a.date != null && t.setDate(a.date), a.hours != null && t.setHours(a.hours), a.minutes != null && t.setMinutes(a.minutes), a.seconds != null && t.setSeconds(a.seconds), a.milliseconds != null && t.setMilliseconds(a.milliseconds), t);
}
function Zs(e, a) {
  const t = pe(e);
  return t.setHours(a), t;
}
function Er(e, a) {
  const t = pe(e);
  return t.setMilliseconds(a), t;
}
function ei(e, a) {
  const t = pe(e);
  return t.setMinutes(a), t;
}
function qr(e, a) {
  const t = pe(e);
  return t.setSeconds(a), t;
}
function St(e, a) {
  const t = pe(e);
  return isNaN(+t) ? Me(e, NaN) : (t.setFullYear(a), t);
}
function da(e, a) {
  return xt(e, -a);
}
function ti(e, a) {
  const {
    years: t = 0,
    months: n = 0,
    weeks: r = 0,
    days: l = 0,
    hours: o = 0,
    minutes: s = 0,
    seconds: u = 0
  } = a, h = da(e, n + t * 12), f = Js(h, l + r * 7), p = s + o * 60, g = (u + p * 60) * 1e3;
  return Me(e, f.getTime() - g);
}
function Lr(e, a) {
  return Pn(e, -a);
}
function pa() {
  const e = Ol();
  return w(), I(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img",
      ...e
    },
    [
      ue("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      ue("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      ue("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      ue("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
pa.compatConfig = {
  MODE: 3
};
function Vr() {
  return w(), I(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      ue("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      ue("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Vr.compatConfig = {
  MODE: 3
};
function $n() {
  return w(), I(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      ue("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
$n.compatConfig = {
  MODE: 3
};
function Rn() {
  return w(), I(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      ue("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
Rn.compatConfig = {
  MODE: 3
};
function Cn() {
  return w(), I(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      ue("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      ue("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
Cn.compatConfig = {
  MODE: 3
};
function Fn() {
  return w(), I(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      ue("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Fn.compatConfig = {
  MODE: 3
};
function Yn() {
  return w(), I(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      ue("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Yn.compatConfig = {
  MODE: 3
};
const ct = (e, a) => a ? new Date(e.toLocaleString("en-US", { timeZone: a })) : new Date(e), Nn = (e, a, t) => bn(e, a, t) || Q(), ai = (e, a, t) => {
  const n = a.dateInTz ? ct(new Date(e), a.dateInTz) : Q(e);
  return t ? dt(n, !0) : n;
}, bn = (e, a, t) => {
  if (!e)
    return null;
  const n = t ? dt(Q(e), !0) : Q(e);
  return a ? a.exactMatch ? ai(e, a, t) : ct(n, a.timezone) : n;
}, ni = (e) => {
  if (!e)
    return 0;
  const a = /* @__PURE__ */ new Date(), t = new Date(a.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(a.toLocaleString("en-US", { timeZone: e })), r = n.getTimezoneOffset() / 60;
  return (+t - +n) / (1e3 * 60 * 60) - r;
};
var bt = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e))(bt || {}), Gt = /* @__PURE__ */ ((e) => (e.top = "top", e.bottom = "bottom", e))(Gt || {}), Xt = /* @__PURE__ */ ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Xt || {}), lt = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(lt || {});
const ri = ["timestamp", "date", "iso"];
var it = /* @__PURE__ */ ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(it || {}), Ie = /* @__PURE__ */ ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Ie || {});
function rr(e) {
  return (a) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${a}T00:00:00+00:00`)).slice(0, 2);
}
function li(e) {
  return (a) => At(ct(/* @__PURE__ */ new Date(`2017-01-0${a}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
const oi = (e, a, t) => {
  const n = [1, 2, 3, 4, 5, 6, 7];
  let r;
  if (e !== null)
    try {
      r = n.map(li(e));
    } catch {
      r = n.map(rr(a));
    }
  else
    r = n.map(rr(a));
  const l = r.slice(0, t), o = r.slice(t + 1, r.length);
  return [r[t]].concat(...o).concat(...l);
}, In = (e, a, t) => {
  const n = [];
  for (let r = +e[0]; r <= +e[1]; r++)
    n.push({ value: +r, text: Hr(r, a) });
  return t ? n.reverse() : n;
}, Br = (e, a, t) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => {
    const o = l < 10 ? `0${l}` : l;
    return /* @__PURE__ */ new Date(`2017-${o}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const l = t === "long" ? "LLLL" : "LLL";
      return n.map((o, s) => {
        const u = At(ct(o, "UTC"), l, { locale: e });
        return {
          text: u.charAt(0).toUpperCase() + u.substring(1),
          value: s
        };
      });
    } catch {
    }
  const r = new Intl.DateTimeFormat(a, { month: t, timeZone: "UTC" });
  return n.map((l, o) => {
    const s = r.format(l);
    return {
      text: s.charAt(0).toUpperCase() + s.substring(1),
      value: o
    };
  });
}, si = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e], Xe = (e) => {
  const a = m(e);
  return a != null && a.$el ? a == null ? void 0 : a.$el : a;
}, ii = (e) => ({ type: "dot", ...e ?? {} }), jr = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : !1, En = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
}, et = (e) => e, lr = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e, or = (e) => e === null, Wr = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
}, ui = (e) => {
  const a = [], t = (n) => n.filter((r) => r);
  for (let n = 0; n < e.length; n += 3) {
    const r = [e[n], e[n + 1], e[n + 2]];
    a.push(t(r));
  }
  return a;
}, Da = (e, a, t) => {
  const n = t != null, r = a != null;
  if (!n && !r)
    return !1;
  const l = +t, o = +a;
  return n && r ? +e > l || +e < o : n ? +e > l : r ? +e < o : !1;
}, ca = (e, a) => ui(e).map((t) => t.map((n) => {
  const { active: r, disabled: l, isBetween: o, highlighted: s } = a(n);
  return {
    ...n,
    active: r,
    disabled: l,
    className: {
      dp__overlay_cell_active: r,
      dp__overlay_cell: !r,
      dp__overlay_cell_disabled: l,
      dp__overlay_cell_pad: !0,
      dp__overlay_cell_active_disabled: l && r,
      dp__cell_in_between: o,
      "dp--highlighted": s
    }
  };
})), Vt = (e, a, t = !1) => {
  e && a.allowStopPropagation && (t && e.stopImmediatePropagation(), e.stopPropagation());
}, di = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function ci(e, a) {
  let t = [...document.querySelectorAll(di())];
  t = t.filter((r) => !e.contains(r) || r.hasAttribute("data-datepicker-instance"));
  const n = t.indexOf(e);
  if (n >= 0 && (a ? n - 1 >= 0 : n + 1 <= t.length))
    return t[n + (a ? -1 : 1)];
}
const wn = (e, a) => e == null ? void 0 : e.querySelector(`[data-dp-element="${a}"]`), Hr = (e, a) => new Intl.NumberFormat(a, { useGrouping: !1, style: "decimal" }).format(e), qn = (e) => At(e, "dd-MM-yyyy"), rn = (e) => Array.isArray(e), Va = (e, a) => a.get(qn(e)), mi = (e, a) => e ? a ? a instanceof Map ? !!Va(e, a) : a(Q(e)) : !1 : !0, ut = (e, a, t = !1, n) => {
  if (e.key === Ie.enter || e.key === Ie.space)
    return t && e.preventDefault(), a();
  if (n)
    return n(e);
}, sr = () => ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].some(
  (e) => navigator.userAgent.includes(e)
) || navigator.userAgent.includes("Mac") && "ontouchend" in document, ir = (e, a, t, n, r, l) => {
  const o = gn(e, a.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: l });
  return ka(o) && Pr(o) ? n || r ? o : Ce(o, {
    hours: +t.hours,
    minutes: +(t == null ? void 0 : t.minutes),
    seconds: +(t == null ? void 0 : t.seconds),
    milliseconds: 0
  }) : null;
}, fi = (e, a, t, n, r, l) => {
  const o = Array.isArray(t) ? t[0] : t;
  if (typeof a == "string")
    return ir(e, a, o, n, r, l);
  if (Array.isArray(a)) {
    let s = null;
    for (const u of a)
      if (s = ir(e, u, o, n, r, l), s)
        break;
    return s;
  }
  return typeof a == "function" ? a(e) : null;
}, Q = (e) => e ? new Date(e) : /* @__PURE__ */ new Date(), pi = (e, a, t) => {
  if (a) {
    const r = (e.getMonth() + 1).toString().padStart(2, "0"), l = e.getDate().toString().padStart(2, "0"), o = e.getHours().toString().padStart(2, "0"), s = e.getMinutes().toString().padStart(2, "0"), u = t ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${r}-${l}T${o}:${s}:${u}.000Z`;
  }
  const n = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(n).toISOString();
}, dt = (e, a) => {
  const t = Q(JSON.parse(JSON.stringify(e))), n = Ce(t, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return a ? so(n) : n;
}, Bt = (e, a, t, n) => {
  let r = e ? Q(e) : Q();
  return (a || a === 0) && (r = Zs(r, +a)), (t || t === 0) && (r = ei(r, +t)), (n || n === 0) && (r = qr(r, +n)), Er(r, 0);
}, Ve = (e, a) => !e || !a ? !1 : Oa(dt(e), dt(a)), Oe = (e, a) => !e || !a ? !1 : la(dt(e), dt(a)), He = (e, a) => !e || !a ? !1 : ua(dt(e), dt(a)), Wa = (e, a, t) => e != null && e[0] && e != null && e[1] ? He(t, e[0]) && Ve(t, e[1]) : e != null && e[0] && a ? He(t, e[0]) && Ve(t, a) || Ve(t, e[0]) && He(t, a) : !1, _t = (e) => {
  const a = Ce(new Date(e), { date: 1 });
  return dt(a);
}, ln = (e, a, t) => a && (t || t === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((n) => n === a ? [n, t] : [n, isNaN(+e[n]) ? void 0 : +e[n]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
}, Jt = (e) => ({
  hours: Ft(e),
  minutes: jt(e),
  seconds: ia(e)
}), zr = (e, a) => {
  if (a) {
    const t = we(Q(a));
    if (t > e)
      return 12;
    if (t === e)
      return Pe(Q(a));
  }
}, Ur = (e, a) => {
  if (a) {
    const t = we(Q(a));
    return t < e ? -1 : t === e ? Pe(Q(a)) : void 0;
  }
}, ma = (e) => {
  if (e)
    return we(Q(e));
}, Qr = (e, a) => {
  const t = He(e, a) ? a : e, n = He(a, e) ? a : e;
  return Or({ start: t, end: n });
}, hi = (e) => {
  const a = xt(e, 1);
  return { month: Pe(a), year: we(a) };
}, $t = (e, a) => {
  const t = Tt(e, { weekStartsOn: +a }), n = Mr(e, { weekStartsOn: +a });
  return [t, n];
}, Gr = (e, a) => {
  const t = {
    hours: Ft(Q()),
    minutes: jt(Q()),
    seconds: a ? ia(Q()) : 0
  };
  return Object.assign(t, e);
}, Lt = (e, a, t) => [Ce(Q(e), { date: 1 }), Ce(Q(), { month: a, year: t, date: 1 })], Ct = (e, a, t) => {
  let n = e ? Q(e) : Q();
  return (a || a === 0) && (n = Ir(n, a)), t && (n = St(n, t)), n;
}, Kr = (e, a, t, n, r) => {
  if (!n || r && !a || !r && !t)
    return !1;
  const l = r ? xt(e, 1) : da(e, 1), o = [Pe(l), we(l)];
  return r ? !yi(...o, a) : !vi(...o, t);
}, vi = (e, a, t) => Ve(...Lt(t, e, a)) || Oe(...Lt(t, e, a)), yi = (e, a, t) => He(...Lt(t, e, a)) || Oe(...Lt(t, e, a)), Xr = (e, a, t, n, r, l, o) => {
  if (typeof a == "function" && !o)
    return a(e);
  const s = t ? { locale: t } : void 0;
  return Array.isArray(e) ? `${At(e[0], l, s)}${r && !e[1] ? "" : n}${e[1] ? At(e[1], l, s) : ""}` : At(e, l, s);
}, na = (e) => {
  if (e)
    return null;
  throw new Error(En.prop("partial-range"));
}, Fa = (e, a) => {
  if (a)
    return e();
  throw new Error(En.prop("range"));
}, _n = (e) => Array.isArray(e) ? ka(e[0]) && (e[1] ? ka(e[1]) : !0) : e ? ka(e) : !1, gi = (e, a) => Ce(a ?? Q(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
}), on = (e, a, t, n) => {
  if (!e)
    return !0;
  if (n) {
    const r = t === "max" ? Oa(e, a) : ua(e, a), l = { seconds: 0, milliseconds: 0 };
    return r || la(Ce(e, l), Ce(a, l));
  }
  return t === "max" ? e.getTime() <= a.getTime() : e.getTime() >= a.getTime();
}, sn = (e, a, t) => e ? gi(e, a) : Q(t ?? a), ur = (e, a, t, n, r) => {
  if (Array.isArray(n)) {
    const o = sn(e, n[0], a), s = sn(e, n[1], a);
    return on(n[0], o, t, !!a) && on(n[1], s, t, !!a) && r;
  }
  const l = sn(e, n, a);
  return on(n, l, t, !!a) && r;
}, un = (e) => Ce(Q(), Jt(e)), bi = (e, a) => e instanceof Map ? Array.from(e.values()).filter((t) => we(Q(t)) === a).map((t) => Pe(t)) : [], Jr = (e, a, t) => typeof e == "function" ? e({ month: a, year: t }) : !!e.months.find((n) => n.month === a && n.year === t), Ln = (e, a) => typeof e == "function" ? e(a) : e.years.includes(a), Zr = (e) => At(e, "yyyy-MM-dd"), wa = at({
  menuFocused: !1,
  shiftKeyInMenu: !1
}), el = () => {
  const e = (t) => {
    wa.menuFocused = t;
  }, a = (t) => {
    wa.shiftKeyInMenu !== t && (wa.shiftKeyInMenu = t);
  };
  return {
    control: X(() => ({ shiftKeyInMenu: wa.shiftKeyInMenu, menuFocused: wa.menuFocused })),
    setMenuFocused: e,
    setShiftKey: a
  };
}, Ne = at({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
}), dn = K(null), Ya = K(!1), cn = K(!1), mn = K(!1), fn = K(!1), rt = K(0), We = K(0), Wt = () => {
  const e = X(() => Ya.value ? [...Ne.selectionGrid, Ne.actionRow].filter((p) => p.length) : cn.value ? [
    ...Ne.timePicker[0],
    ...Ne.timePicker[1],
    fn.value ? [] : [dn.value],
    Ne.actionRow
  ].filter((p) => p.length) : mn.value ? [...Ne.monthPicker, Ne.actionRow] : [Ne.monthYear, ...Ne.calendar, Ne.time, Ne.actionRow].filter((p) => p.length)), a = (p) => {
    rt.value = p ? rt.value + 1 : rt.value - 1;
    let v = null;
    e.value[We.value] && (v = e.value[We.value][rt.value]), !v && e.value[We.value + (p ? 1 : -1)] ? (We.value = We.value + (p ? 1 : -1), rt.value = p ? 0 : e.value[We.value].length - 1) : v || (rt.value = p ? rt.value - 1 : rt.value + 1);
  }, t = (p) => {
    We.value === 0 && !p || We.value === e.value.length && p || (We.value = p ? We.value + 1 : We.value - 1, e.value[We.value] ? e.value[We.value] && !e.value[We.value][rt.value] && rt.value !== 0 && (rt.value = e.value[We.value].length - 1) : We.value = p ? We.value - 1 : We.value + 1);
  }, n = (p) => {
    let v = null;
    e.value[We.value] && (v = e.value[We.value][rt.value]), v ? v.focus({ preventScroll: !Ya.value }) : rt.value = p ? rt.value - 1 : rt.value + 1;
  }, r = () => {
    a(!0), n(!0);
  }, l = () => {
    a(!1), n(!1);
  }, o = () => {
    t(!1), n(!0);
  }, s = () => {
    t(!0), n(!0);
  }, u = (p, v) => {
    Ne[v] = p;
  }, h = (p, v) => {
    Ne[v] = p;
  }, f = () => {
    rt.value = 0, We.value = 0;
  };
  return {
    buildMatrix: u,
    buildMultiLevelMatrix: h,
    setTimePickerBackRef: (p) => {
      dn.value = p;
    },
    setSelectionGrid: (p) => {
      Ya.value = p, f(), p || (Ne.selectionGrid = []);
    },
    setTimePicker: (p, v = !1) => {
      cn.value = p, fn.value = v, f(), p || (Ne.timePicker[0] = [], Ne.timePicker[1] = []);
    },
    setTimePickerElements: (p, v = 0) => {
      Ne.timePicker[v] = p;
    },
    arrowRight: r,
    arrowLeft: l,
    arrowUp: o,
    arrowDown: s,
    clearArrowNav: () => {
      Ne.monthYear = [], Ne.calendar = [], Ne.time = [], Ne.actionRow = [], Ne.selectionGrid = [], Ne.timePicker[0] = [], Ne.timePicker[1] = [], Ya.value = !1, cn.value = !1, fn.value = !1, mn.value = !1, f(), dn.value = null;
    },
    setMonthPicker: (p) => {
      mn.value = p, f();
    },
    refSets: Ne
    // exposed for testing
  };
}, dr = (e) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e ?? {}
}), wi = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (a) => `Increment ${a}`,
  decrementValue: (a) => `Decrement ${a}`,
  openTpOverlay: (a) => `Open ${a} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: void 0,
  weekDay: void 0,
  clearInput: "Clear value",
  calendarIcon: "Calendar icon",
  timePicker: "Time picker",
  monthPicker: (a) => `Month picker${a ? " overlay" : ""}`,
  yearPicker: (a) => `Year picker${a ? " overlay" : ""}`,
  timeOverlay: (a) => `${a} overlay`,
  ...e ?? {}
}), cr = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0, _i = (e) => {
  const a = typeof e == "object" && e, t = {
    static: !0,
    solo: !1
  };
  if (!e)
    return { ...t, count: cr(!1) };
  const n = a ? e : {}, r = a ? n.count ?? !0 : e, l = cr(r);
  return Object.assign(t, n, { count: l });
}, ki = (e, a, t) => e || (typeof t == "string" ? t : a), xi = (e) => typeof e == "boolean" ? e ? dr({}) : !1 : dr(e), Ti = (e) => {
  const a = {
    enterSubmit: !0,
    tabSubmit: !0,
    openMenu: "open",
    selectOnFocus: !1,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...a, ...e ?? {}, enabled: !0 } : { ...a, enabled: e };
}, Pi = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
}), Oi = (e) => ({
  showSelect: !0,
  showCancel: !0,
  showNow: !1,
  showPreview: !0,
  ...e ?? {}
}), Di = (e) => {
  const a = { input: !1 };
  return typeof e == "object" ? { ...a, ...e ?? {}, enabled: !0 } : {
    enabled: e,
    ...a
  };
}, Mi = (e) => ({ allowStopPropagation: !0, closeOnScroll: !1, modeHeight: 255, allowPreventDefault: !1, closeOnClearValue: !0, closeOnAutoApply: !0, noSwipe: !1, keepActionRow: !1, onClickOutside: void 0, tabOutClosesMenu: !0, arrowLeft: void 0, keepViewOnOffsetClick: !1, timeArrowHoldThreshold: 0, shadowDom: !1, ...e ?? {} }), Si = (e) => {
  const a = {
    dates: Array.isArray(e) ? e.map((t) => Q(t)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: !1 }
  };
  return typeof e == "function" ? e : { ...a, ...e ?? {} };
}, Ai = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? !1
} : {
  type: e,
  hideOnOffsetDates: !1
}, $i = (e) => {
  const a = {
    noDisabledRange: !1,
    showLastInRange: !0,
    minMaxRawRange: !1,
    partialRange: !0,
    disableTimeRangeValidation: !1,
    maxRange: void 0,
    minRange: void 0,
    autoRange: void 0,
    fixedStart: !1,
    fixedEnd: !1
  };
  return typeof e == "object" ? { enabled: !0, ...a, ...e } : {
    enabled: e,
    ...a
  };
}, Ri = (e) => e ? typeof e == "string" ? {
  timezone: e,
  exactMatch: !1,
  dateInTz: void 0,
  emitTimezone: void 0,
  convertModel: !0
} : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? !1,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: e.emitTimezone ?? void 0,
  convertModel: e.convertModel ?? !0
} : { timezone: void 0, exactMatch: !1, emitTimezone: void 0 }, pn = (e, a, t) => new Map(
  e.map((n) => {
    const r = Nn(n, a, t);
    return [qn(r), r];
  })
), Ci = (e, a) => e.length ? new Map(
  e.map((t) => {
    const n = Nn(t.date, a);
    return [qn(n), t];
  })
) : null, Fi = (e) => {
  var a;
  return {
    minDate: bn(e.minDate, e.timezone, e.isSpecific),
    maxDate: bn(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: rn(e.disabledDates) ? pn(e.disabledDates, e.timezone, e.isSpecific) : e.disabledDates,
    allowedDates: rn(e.allowedDates) ? pn(e.allowedDates, e.timezone, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && rn((a = e.highlight) == null ? void 0 : a.dates) ? pn(e.highlight.dates, e.timezone) : e.highlight,
    markers: Ci(e.markers, e.timezone)
  };
}, Yi = (e) => typeof e == "boolean" ? { enabled: e, dragSelect: !0, limit: null } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? !0
}, Ni = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((a) => {
      const t = a, n = e[t], r = typeof e[t] == "string" ? { [n]: !0 } : Object.fromEntries(n.map((l) => [l, !0]));
      return [a, r];
    })
  )
}), qe = (e) => {
  const a = () => {
    const Y = e.enableSeconds ? ":ss" : "", T = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${T}${Y}` : `hh${T}${Y} aa`;
  }, t = () => {
    var Y;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? a() : e.weekPicker ? `${((Y = U.value) == null ? void 0 : Y.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${a()}` : "MM/dd/yyyy";
  }, n = (Y) => Gr(Y, e.enableSeconds), r = () => H.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [n(e.startTime[0]), n(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? n(e.startTime) : null, l = X(() => _i(e.multiCalendars)), o = X(() => r()), s = X(() => wi(e.ariaLabels)), u = X(() => Pi(e.filters)), h = X(() => xi(e.transitions)), f = X(() => Oi(e.actionRow)), p = X(
    () => ki(e.previewFormat, e.format, t())
  ), v = X(() => Ti(e.textInput)), g = X(() => Di(e.inline)), $ = X(() => Mi(e.config)), P = X(() => Si(e.highlight)), U = X(() => Ai(e.weekNumbers)), V = X(() => Ri(e.timezone)), B = X(() => Yi(e.multiDates)), O = X(
    () => Fi({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: P.value,
      markers: e.markers,
      timezone: V.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), H = X(() => $i(e.range)), re = X(() => Ni(e.ui));
  return {
    defaultedTransitions: h,
    defaultedMultiCalendars: l,
    defaultedStartTime: o,
    defaultedAriaLabels: s,
    defaultedFilters: u,
    defaultedActionRow: f,
    defaultedPreviewFormat: p,
    defaultedTextInput: v,
    defaultedInline: g,
    defaultedConfig: $,
    defaultedHighlight: P,
    defaultedWeekNumbers: U,
    defaultedRange: H,
    propDates: O,
    defaultedTz: V,
    defaultedMultiDates: B,
    defaultedUI: re,
    getDefaultPattern: t,
    getDefaultStartTime: r
  };
}, Ii = (e, a, t) => {
  const n = K(), { defaultedTextInput: r, defaultedRange: l, defaultedTz: o, defaultedMultiDates: s, getDefaultPattern: u } = qe(a), h = K(""), f = Ta(a, "format"), p = Ta(a, "formatLocale");
  gt(
    n,
    () => {
      typeof a.onInternalModelChange == "function" && e("internal-model-change", n.value, L(!0));
    },
    { deep: !0 }
  ), gt(l, (c, le) => {
    c.enabled !== le.enabled && (n.value = null);
  }), gt(f, () => {
    se();
  });
  const v = (c) => o.value.timezone && o.value.convertModel ? ct(c, o.value.timezone) : c, g = (c) => {
    if (o.value.timezone && o.value.convertModel) {
      const le = ni(o.value.timezone);
      return eo(c, le);
    }
    return c;
  }, $ = (c, le, ge = !1) => Xr(
    c,
    a.format,
    a.formatLocale,
    r.value.rangeSeparator,
    a.modelAuto,
    le ?? u(),
    ge
  ), P = (c) => c ? a.modelType ? ne(c) : {
    hours: Ft(c),
    minutes: jt(c),
    seconds: a.enableSeconds ? ia(c) : 0
  } : null, U = (c) => a.modelType ? ne(c) : { month: Pe(c), year: we(c) }, V = (c) => Array.isArray(c) ? s.value.enabled ? c.map((le) => B(le, St(Q(), le))) : Fa(
    () => [
      St(Q(), c[0]),
      c[1] ? St(Q(), c[1]) : na(l.value.partialRange)
    ],
    l.value.enabled
  ) : St(Q(), +c), B = (c, le) => (typeof c == "string" || typeof c == "number") && a.modelType ? N(c) : le, O = (c) => Array.isArray(c) ? [
    B(
      c[0],
      Bt(null, +c[0].hours, +c[0].minutes, c[0].seconds)
    ),
    B(
      c[1],
      Bt(null, +c[1].hours, +c[1].minutes, c[1].seconds)
    )
  ] : B(c, Bt(null, c.hours, c.minutes, c.seconds)), H = (c) => {
    const le = Ce(Q(), { date: 1 });
    return Array.isArray(c) ? s.value.enabled ? c.map((ge) => B(ge, Ct(le, +ge.month, +ge.year))) : Fa(
      () => [
        B(c[0], Ct(le, +c[0].month, +c[0].year)),
        B(
          c[1],
          c[1] ? Ct(le, +c[1].month, +c[1].year) : na(l.value.partialRange)
        )
      ],
      l.value.enabled
    ) : B(c, Ct(le, +c.month, +c.year));
  }, re = (c) => {
    if (Array.isArray(c))
      return c.map((le) => N(le));
    throw new Error(En.dateArr("multi-dates"));
  }, Y = (c) => {
    if (Array.isArray(c) && l.value.enabled) {
      const le = c[0], ge = c[1];
      return [
        Q(Array.isArray(le) ? le[0] : null),
        Q(Array.isArray(ge) ? ge[0] : null)
      ];
    }
    return Q(c[0]);
  }, T = (c) => a.modelAuto ? Array.isArray(c) ? [N(c[0]), N(c[1])] : a.autoApply ? [N(c)] : [N(c), null] : Array.isArray(c) ? Fa(
    () => c[1] ? [
      N(c[0]),
      c[1] ? N(c[1]) : na(l.value.partialRange)
    ] : [N(c[0])],
    l.value.enabled
  ) : N(c), G = () => {
    Array.isArray(n.value) && l.value.enabled && n.value.length === 1 && n.value.push(na(l.value.partialRange));
  }, q = () => {
    const c = n.value;
    return [
      ne(c[0]),
      c[1] ? ne(c[1]) : na(l.value.partialRange)
    ];
  }, F = () => n.value[1] ? q() : ne(et(n.value[0])), ie = () => (n.value || []).map((c) => ne(c)), fe = (c = !1) => (c || G(), a.modelAuto ? F() : s.value.enabled ? ie() : Array.isArray(n.value) ? Fa(() => q(), l.value.enabled) : ne(et(n.value))), he = (c) => !c || Array.isArray(c) && !c.length ? null : a.timePicker ? O(et(c)) : a.monthPicker ? H(et(c)) : a.yearPicker ? V(et(c)) : s.value.enabled ? re(et(c)) : a.weekPicker ? Y(et(c)) : T(et(c)), _ = (c) => {
    const le = he(c);
    _n(et(le)) ? (n.value = et(le), se()) : (n.value = null, h.value = "");
  }, S = () => {
    const c = (le) => At(le, r.value.format);
    return `${c(n.value[0])} ${r.value.rangeSeparator} ${n.value[1] ? c(n.value[1]) : ""}`;
  }, k = () => t.value && n.value ? Array.isArray(n.value) ? S() : At(n.value, r.value.format) : $(n.value), E = () => n.value ? s.value.enabled ? n.value.map((c) => $(c)).join("; ") : r.value.enabled && typeof r.value.format == "string" ? k() : $(n.value) : "", se = () => {
    !a.format || typeof a.format == "string" || r.value.enabled && typeof r.value.format == "string" ? h.value = E() : h.value = a.format(n.value);
  }, N = (c) => {
    if (a.utc) {
      const le = new Date(c);
      return a.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return a.modelType ? ri.includes(a.modelType) ? v(new Date(c)) : a.modelType === "format" && (typeof a.format == "string" || !a.format) ? v(
      gn(c, u(), /* @__PURE__ */ new Date(), { locale: p.value })
    ) : v(
      gn(c, a.modelType, /* @__PURE__ */ new Date(), { locale: p.value })
    ) : v(new Date(c));
  }, ne = (c) => c ? a.utc ? pi(c, a.utc === "preserve", a.enableSeconds) : a.modelType ? a.modelType === "timestamp" ? +g(c) : a.modelType === "iso" ? g(c).toISOString() : a.modelType === "format" && (typeof a.format == "string" || !a.format) ? $(g(c)) : $(g(c), a.modelType, !0) : g(c) : "", ye = (c, le = !1, ge = !1) => {
    if (ge)
      return c;
    if (e("update:model-value", c), o.value.emitTimezone && le) {
      const Ge = Array.isArray(c) ? c.map((A) => ct(et(A), o.value.emitTimezone)) : ct(et(c), o.value.emitTimezone);
      e("update:model-timezone-value", Ge);
    }
  }, y = (c) => Array.isArray(n.value) ? s.value.enabled ? n.value.map((le) => c(le)) : [
    c(n.value[0]),
    n.value[1] ? c(n.value[1]) : na(l.value.partialRange)
  ] : c(et(n.value)), b = () => {
    if (Array.isArray(n.value)) {
      const c = $t(n.value[0], a.weekStart), le = n.value[1] ? $t(n.value[1], a.weekStart) : [];
      return [c.map((ge) => Q(ge)), le.map((ge) => Q(ge))];
    }
    return $t(n.value, a.weekStart).map((c) => Q(c));
  }, i = (c, le) => ye(et(y(c)), !1, le), M = (c) => {
    const le = b();
    return c ? le : e("update:model-value", b());
  }, L = (c = !1) => (c || se(), a.monthPicker ? i(U, c) : a.timePicker ? i(P, c) : a.yearPicker ? i(we, c) : a.weekPicker ? M(c) : ye(fe(c), !0, c));
  return {
    inputValue: h,
    internalModelValue: n,
    checkBeforeEmit: () => n.value ? l.value.enabled ? l.value.partialRange ? n.value.length >= 1 : n.value.length === 2 : !!n.value : !1,
    parseExternalModelValue: _,
    formatInputValue: se,
    emitModelValue: L
  };
}, Ei = (e, a) => {
  const { defaultedFilters: t, propDates: n } = qe(e), { validateMonthYearInRange: r } = Ht(e), l = (f, p) => {
    let v = f;
    return t.value.months.includes(Pe(v)) ? (v = p ? xt(f, 1) : da(f, 1), l(v, p)) : v;
  }, o = (f, p) => {
    let v = f;
    return t.value.years.includes(we(v)) ? (v = p ? Pn(f, 1) : Lr(f, 1), o(v, p)) : v;
  }, s = (f, p = !1) => {
    const v = Ce(Q(), { month: e.month, year: e.year });
    let g = f ? xt(v, 1) : da(v, 1);
    e.disableYearSelect && (g = St(g, e.year));
    let $ = Pe(g), P = we(g);
    t.value.months.includes($) && (g = l(g, f), $ = Pe(g), P = we(g)), t.value.years.includes(P) && (g = o(g, f), P = we(g)), r($, P, f, e.preventMinMaxNavigation) && u($, P, p);
  }, u = (f, p, v) => {
    a("update-month-year", { month: f, year: p, fromNav: v });
  }, h = X(() => (f) => Kr(
    Ce(Q(), { month: e.month, year: e.year }),
    n.value.maxDate,
    n.value.minDate,
    e.preventMinMaxNavigation,
    f
  ));
  return { handleMonthYearChange: s, isDisabled: h, updateMonthYear: u };
}, Ha = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: !1 },
  format: {
    type: [String, Function],
    default: () => null
  },
  autoPosition: { type: Boolean, default: !0 },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: !0 },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: !1 },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: [String, Object], default: null },
  vertical: { type: Boolean, default: !1 },
  disableMonthYearSelect: { type: Boolean, default: !1 },
  disableYearSelect: { type: Boolean, default: !1 },
  dayClass: {
    type: Function,
    default: null
  },
  yearRange: { type: Array, default: () => [1900, 2100] },
  enableTimePicker: { type: Boolean, default: !0 },
  autoApply: { type: Boolean, default: !1 },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: !1 },
  noToday: { type: Boolean, default: !1 },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: null },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  escClose: { type: Boolean, default: !0 },
  spaceConfirm: { type: Boolean, default: !0 },
  monthChangeOnArrows: { type: Boolean, default: !0 },
  presetDates: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: !1 },
  preventMinMaxNavigation: { type: Boolean, default: !1 },
  reverseYears: { type: Boolean, default: !1 },
  weekPicker: { type: Boolean, default: !1 },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: !1 },
  highlight: {
    type: [Function, Object],
    default: null
  },
  teleport: { type: [Boolean, String, Object], default: null },
  teleportCenter: { type: Boolean, default: !1 },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function, Object],
    default: null
  },
  monthChangeOnScroll: { type: [Boolean, String], default: !0 },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: !1 },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: !1 },
  modelAuto: { type: Boolean, default: !1 },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: [Object, Boolean], default: !1 },
  ignoreTimeValidation: { type: Boolean, default: !1 },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: !1 },
  clearable: { type: Boolean, default: !0 },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: !1 },
  autocomplete: { type: String, default: "off" },
  timePicker: { type: Boolean, default: !1 },
  enableSeconds: { type: Boolean, default: !1 },
  is24: { type: Boolean, default: !0 },
  noHoursOverlay: { type: Boolean, default: !1 },
  noMinutesOverlay: { type: Boolean, default: !1 },
  noSecondsOverlay: { type: Boolean, default: !1 },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: [Boolean, Object], default: !1 },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: !1 },
  readonly: { type: Boolean, default: !1 },
  inline: { type: [Boolean, Object], default: !1 },
  textInput: { type: [Boolean, Object], default: !1 },
  sixWeeks: { type: [Boolean, String], default: !1 },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: !1 },
  disabledTimes: { type: [Function, Array], default: void 0 },
  timePickerInline: { type: Boolean, default: !1 },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: !1 },
  yearFirst: { type: Boolean, default: !1 },
  loading: { type: Boolean, default: !1 },
  onInternalModelChange: { type: [Function, Object], default: null },
  enableMinutes: { type: Boolean, default: !0 },
  ui: { type: Object, default: () => ({}) }
}, Pt = {
  ...Ha,
  shadow: { type: Boolean, default: !1 },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: !1 },
  collapse: { type: Boolean, default: !1 },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) },
  isTextInputDate: { type: Boolean, default: !1 }
}, qi = ["title"], Li = ["disabled"], Vi = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: !1 },
    calendarWidth: { type: Number, default: 0 },
    ...Pt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: a }) {
    const t = a, n = e, {
      defaultedActionRow: r,
      defaultedPreviewFormat: l,
      defaultedMultiCalendars: o,
      defaultedTextInput: s,
      defaultedInline: u,
      defaultedRange: h,
      defaultedMultiDates: f
    } = qe(n), { isTimeValid: p, isMonthValid: v } = Ht(n), { buildMatrix: g } = Wt(), $ = K(null), P = K(null), U = K(!1), V = K({}), B = K(null), O = K(null);
    ot(() => {
      n.arrowNavigation && g([Xe($), Xe(P)], "actionRow"), H(), window.addEventListener("resize", H);
    }), Ba(() => {
      window.removeEventListener("resize", H);
    });
    const H = () => {
      U.value = !1, setTimeout(() => {
        var _, S;
        const k = (_ = B.value) == null ? void 0 : _.getBoundingClientRect(), E = (S = O.value) == null ? void 0 : S.getBoundingClientRect();
        k && E && (V.value.maxWidth = `${E.width - k.width - 20}px`), U.value = !0;
      }, 0);
    }, re = X(() => h.value.enabled && !h.value.partialRange && n.internalModelValue ? n.internalModelValue.length === 2 : !0), Y = X(
      () => !p.value(n.internalModelValue) || !v.value(n.internalModelValue) || !re.value
    ), T = () => {
      const _ = l.value;
      return n.timePicker || n.monthPicker, _(et(n.internalModelValue));
    }, G = () => {
      const _ = n.internalModelValue;
      return o.value.count > 0 ? `${q(_[0])} - ${q(_[1])}` : [q(_[0]), q(_[1])];
    }, q = (_) => Xr(
      _,
      l.value,
      n.formatLocale,
      s.value.rangeSeparator,
      n.modelAuto,
      l.value
    ), F = X(() => !n.internalModelValue || !n.menuMount ? "" : typeof l.value == "string" ? Array.isArray(n.internalModelValue) ? n.internalModelValue.length === 2 && n.internalModelValue[1] ? G() : f.value.enabled ? n.internalModelValue.map((_) => `${q(_)}`) : n.modelAuto ? `${q(n.internalModelValue[0])}` : `${q(n.internalModelValue[0])} -` : q(n.internalModelValue) : T()), ie = () => f.value.enabled ? "; " : " - ", fe = X(
      () => Array.isArray(F.value) ? F.value.join(ie()) : F.value
    ), he = () => {
      p.value(n.internalModelValue) && v.value(n.internalModelValue) && re.value ? t("select-date") : t("invalid-select");
    };
    return (_, S) => (w(), I("div", {
      ref_key: "actionRowRef",
      ref: O,
      class: "dp__action_row"
    }, [
      _.$slots["action-row"] ? oe(_.$slots, "action-row", ze(Ee({ key: 0 }, {
        internalModelValue: _.internalModelValue,
        disabled: Y.value,
        selectDate: () => _.$emit("select-date"),
        closePicker: () => _.$emit("close-picker")
      }))) : (w(), I(xe, { key: 1 }, [
        m(r).showPreview ? (w(), I("div", {
          key: 0,
          class: "dp__selection_preview",
          title: fe.value,
          style: yt(V.value)
        }, [
          _.$slots["action-preview"] && U.value ? oe(_.$slots, "action-preview", {
            key: 0,
            value: _.internalModelValue
          }) : j("", !0),
          !_.$slots["action-preview"] && U.value ? (w(), I(xe, { key: 1 }, [
            Be(De(fe.value), 1)
          ], 64)) : j("", !0)
        ], 12, qi)) : j("", !0),
        ue("div", {
          ref_key: "actionBtnContainer",
          ref: B,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          _.$slots["action-buttons"] ? oe(_.$slots, "action-buttons", {
            key: 0,
            value: _.internalModelValue
          }) : j("", !0),
          _.$slots["action-buttons"] ? j("", !0) : (w(), I(xe, { key: 1 }, [
            !m(u).enabled && m(r).showCancel ? (w(), I("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: $,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: S[0] || (S[0] = (k) => _.$emit("close-picker")),
              onKeydown: S[1] || (S[1] = (k) => m(ut)(k, () => _.$emit("close-picker")))
            }, De(_.cancelText), 545)) : j("", !0),
            m(r).showNow ? (w(), I("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: S[2] || (S[2] = (k) => _.$emit("select-now")),
              onKeydown: S[3] || (S[3] = (k) => m(ut)(k, () => _.$emit("select-now")))
            }, De(_.nowButtonLabel), 33)) : j("", !0),
            m(r).showSelect ? (w(), I("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: P,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: Y.value,
              "data-test": "select-button",
              onKeydown: S[4] || (S[4] = (k) => m(ut)(k, () => he())),
              onClick: he
            }, De(_.selectText), 41, Li)) : j("", !0)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
}), Bi = ["role", "aria-label", "tabindex"], ji = { class: "dp__selection_grid_header" }, Wi = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"], Hi = ["aria-label"], Ma = /* @__PURE__ */ Je({
  __name: "SelectionOverlay",
  props: {
    items: {},
    type: {},
    isLast: { type: Boolean },
    arrowNavigation: { type: Boolean },
    skipButtonRef: { type: Boolean },
    headerRefs: {},
    hideNavigation: {},
    escClose: { type: Boolean },
    useRelative: { type: Boolean },
    height: {},
    textInput: { type: [Boolean, Object] },
    config: {},
    noOverlayFocus: { type: Boolean },
    focusValue: {},
    menuWrapRef: {},
    ariaLabels: {},
    overlayLabel: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: a, emit: t }) {
    const { setSelectionGrid: n, buildMultiLevelMatrix: r, setMonthPicker: l } = Wt(), o = t, s = e, { defaultedAriaLabels: u, defaultedTextInput: h, defaultedConfig: f } = qe(
      s
    ), { hideNavigationButtons: p } = Qa(), v = K(!1), g = K(null), $ = K(null), P = K([]), U = K(), V = K(null), B = K(0), O = K(null);
    Dl(() => {
      g.value = null;
    }), ot(() => {
      mt().then(() => ie()), s.noOverlayFocus || re(), H(!0);
    }), Ba(() => H(!1));
    const H = (y) => {
      var b;
      s.arrowNavigation && ((b = s.headerRefs) != null && b.length ? l(y) : n(y));
    }, re = () => {
      var y;
      const b = Xe($);
      b && (h.value.enabled || (g.value ? (y = g.value) == null || y.focus({ preventScroll: !0 }) : b.focus({ preventScroll: !0 })), v.value = b.clientHeight < b.scrollHeight);
    }, Y = X(
      () => ({
        dp__overlay: !0,
        "dp--overlay-absolute": !s.useRelative,
        "dp--overlay-relative": s.useRelative
      })
    ), T = X(
      () => s.useRelative ? { height: `${s.height}px`, width: "var(--dp-menu-min-width)" } : void 0
    ), G = X(() => ({
      dp__overlay_col: !0
    })), q = X(
      () => ({
        dp__btn: !0,
        dp__button: !0,
        dp__overlay_action: !0,
        dp__over_action_scroll: v.value,
        dp__button_bottom: s.isLast
      })
    ), F = X(() => {
      var y, b;
      return {
        dp__overlay_container: !0,
        dp__container_flex: ((y = s.items) == null ? void 0 : y.length) <= 6,
        dp__container_block: ((b = s.items) == null ? void 0 : b.length) > 6
      };
    });
    gt(
      () => s.items,
      () => ie(!1),
      { deep: !0 }
    );
    const ie = (y = !0) => {
      mt().then(() => {
        const b = Xe(g), i = Xe($), M = Xe(V), L = Xe(O), c = M ? M.getBoundingClientRect().height : 0;
        i && (i.getBoundingClientRect().height ? B.value = i.getBoundingClientRect().height - c : B.value = f.value.modeHeight - c), b && L && y && (L.scrollTop = b.offsetTop - L.offsetTop - (B.value / 2 - b.getBoundingClientRect().height) - c);
      });
    }, fe = (y) => {
      y.disabled || o("selected", y.value);
    }, he = () => {
      o("toggle"), o("reset-flow");
    }, _ = () => {
      s.escClose && he();
    }, S = (y, b, i, M) => {
      y && ((b.active || b.value === s.focusValue) && (g.value = y), s.arrowNavigation && (Array.isArray(P.value[i]) ? P.value[i][M] = y : P.value[i] = [y], k()));
    }, k = () => {
      var y, b;
      const i = (y = s.headerRefs) != null && y.length ? [s.headerRefs].concat(P.value) : P.value.concat([s.skipButtonRef ? [] : [V.value]]);
      r(et(i), (b = s.headerRefs) != null && b.length ? "monthPicker" : "selectionGrid");
    }, E = (y) => {
      s.arrowNavigation || Vt(y, f.value, !0);
    }, se = (y) => {
      U.value = y, o("hover-value", y);
    }, N = () => {
      if (he(), !s.isLast) {
        const y = wn(s.menuWrapRef ?? null, "action-row");
        if (y) {
          const b = Wr(y);
          b == null || b.focus();
        }
      }
    }, ne = (y) => {
      switch (y.key) {
        case Ie.esc:
          return _();
        case Ie.arrowLeft:
          return E(y);
        case Ie.arrowRight:
          return E(y);
        case Ie.arrowUp:
          return E(y);
        case Ie.arrowDown:
          return E(y);
        default:
          return;
      }
    }, ye = (y) => {
      if (y.key === Ie.enter)
        return he();
      if (y.key === Ie.tab)
        return N();
    };
    return a({ focusGrid: re }), (y, b) => {
      var i;
      return w(), I("div", {
        ref_key: "gridWrapRef",
        ref: $,
        class: ke(Y.value),
        style: yt(T.value),
        role: y.useRelative ? void 0 : "dialog",
        "aria-label": y.overlayLabel,
        tabindex: y.useRelative ? void 0 : "0",
        onKeydown: ne,
        onClick: b[0] || (b[0] = Zt(() => {
        }, ["prevent"]))
      }, [
        ue("div", {
          ref_key: "containerRef",
          ref: O,
          class: ke(F.value),
          style: yt({ "--dp-overlay-height": `${B.value}px` }),
          role: "grid"
        }, [
          ue("div", ji, [
            oe(y.$slots, "header")
          ]),
          y.$slots.overlay ? oe(y.$slots, "overlay", { key: 0 }) : (w(!0), I(xe, { key: 1 }, Fe(y.items, (M, L) => (w(), I("div", {
            key: L,
            class: ke(["dp__overlay_row", { dp__flex_row: y.items.length >= 3 }]),
            role: "row"
          }, [
            (w(!0), I(xe, null, Fe(M, (c, le) => (w(), I("div", {
              key: c.value,
              ref_for: !0,
              ref: (ge) => S(ge, c, L, le),
              role: "gridcell",
              class: ke(G.value),
              "aria-selected": c.active || void 0,
              "aria-disabled": c.disabled || void 0,
              tabindex: "0",
              "data-test": c.text,
              onClick: Zt((ge) => fe(c), ["prevent"]),
              onKeydown: (ge) => m(ut)(ge, () => fe(c), !0),
              onMouseover: (ge) => se(c.value)
            }, [
              ue("div", {
                class: ke(c.className)
              }, [
                y.$slots.item ? oe(y.$slots, "item", {
                  key: 0,
                  item: c
                }) : j("", !0),
                y.$slots.item ? j("", !0) : (w(), I(xe, { key: 1 }, [
                  Be(De(c.text), 1)
                ], 64))
              ], 2)
            ], 42, Wi))), 128))
          ], 2))), 128))
        ], 6),
        y.$slots["button-icon"] ? Ia((w(), I("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: V,
          type: "button",
          "aria-label": (i = m(u)) == null ? void 0 : i.toggleOverlay,
          class: ke(q.value),
          tabindex: "0",
          onClick: he,
          onKeydown: ye
        }, [
          oe(y.$slots, "button-icon")
        ], 42, Hi)), [
          [Ea, !m(p)(y.hideNavigation, y.type)]
        ]) : j("", !0)
      ], 46, Bi);
    };
  }
}), za = /* @__PURE__ */ Je({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const a = e, t = X(
      () => a.multiCalendars > 0 ? [...Array(a.multiCalendars).keys()] : [0]
    ), n = X(() => ({
      dp__instance_calendar: a.multiCalendars > 0
    }));
    return (r, l) => (w(), I("div", {
      class: ke({
        dp__menu_inner: !r.stretch,
        "dp--menu--inner-stretched": r.stretch,
        dp__flex_display: r.multiCalendars > 0,
        "dp--flex-display-collapsed": r.collapse
      })
    }, [
      (w(!0), I(xe, null, Fe(t.value, (o, s) => (w(), I("div", {
        key: o,
        class: ke(n.value)
      }, [
        oe(r.$slots, "default", {
          instance: o,
          index: s
        })
      ], 2))), 128))
    ], 2));
  }
}), zi = ["data-dp-element", "aria-label", "aria-disabled"], xa = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: a }) {
    const t = a, n = K(null);
    return ot(() => t("set-ref", n)), (r, l) => (w(), I("button", {
      ref_key: "elRef",
      ref: n,
      type: "button",
      "data-dp-element": r.elName,
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": r.ariaLabel,
      "aria-disabled": r.disabled || void 0,
      onClick: l[0] || (l[0] = (o) => r.$emit("activate")),
      onKeydown: l[1] || (l[1] = (o) => m(ut)(o, () => r.$emit("activate"), !0))
    }, [
      ue("span", {
        class: ke(["dp__inner_nav", { dp__inner_nav_disabled: r.disabled }])
      }, [
        oe(r.$slots, "default")
      ], 2)
    ], 40, zi));
  }
}), Ui = ["aria-label", "data-test"], tl = /* @__PURE__ */ Je({
  __name: "YearModePicker",
  props: {
    ...Pt,
    showYearPicker: { type: Boolean, default: !1 },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => !1 }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: a }) {
    const t = a, n = e, { showRightIcon: r, showLeftIcon: l } = Qa(), { defaultedConfig: o, defaultedMultiCalendars: s, defaultedAriaLabels: u, defaultedTransitions: h, defaultedUI: f } = qe(n), { showTransition: p, transitionName: v } = Sa(h), g = K(!1), $ = (V = !1, B) => {
      g.value = !g.value, t("toggle-year-picker", { flow: V, show: B });
    }, P = (V) => {
      g.value = !1, t("year-select", V);
    }, U = (V = !1) => {
      t("handle-year", V);
    };
    return (V, B) => {
      var O, H, re, Y, T;
      return w(), I(xe, null, [
        ue("div", {
          class: ke(["dp--year-mode-picker", { "dp--hidden-el": g.value }])
        }, [
          m(l)(m(s), e.instance) ? (w(), be(xa, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (O = m(u)) == null ? void 0 : O.prevYear,
            disabled: e.isDisabled(!1),
            class: ke((H = m(f)) == null ? void 0 : H.navBtnPrev),
            onActivate: B[0] || (B[0] = (G) => U(!1))
          }, {
            default: me(() => [
              V.$slots["arrow-left"] ? oe(V.$slots, "arrow-left", { key: 0 }) : j("", !0),
              V.$slots["arrow-left"] ? j("", !0) : (w(), be(m($n), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : j("", !0),
          ue("button", {
            ref: "mpYearButtonRef",
            class: "dp__btn dp--year-select",
            type: "button",
            "aria-label": `${e.year}-${(re = m(u)) == null ? void 0 : re.openYearsOverlay}`,
            "data-test": `year-mode-btn-${e.instance}`,
            onClick: B[1] || (B[1] = () => $(!1)),
            onKeydown: B[2] || (B[2] = Ml(() => $(!1), ["enter"]))
          }, [
            V.$slots.year ? oe(V.$slots, "year", {
              key: 0,
              year: e.year
            }) : j("", !0),
            V.$slots.year ? j("", !0) : (w(), I(xe, { key: 1 }, [
              Be(De(e.year), 1)
            ], 64))
          ], 40, Ui),
          m(r)(m(s), e.instance) ? (w(), be(xa, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (Y = m(u)) == null ? void 0 : Y.nextYear,
            disabled: e.isDisabled(!0),
            class: ke((T = m(f)) == null ? void 0 : T.navBtnNext),
            onActivate: B[3] || (B[3] = (G) => U(!0))
          }, {
            default: me(() => [
              V.$slots["arrow-right"] ? oe(V.$slots, "arrow-right", { key: 0 }) : j("", !0),
              V.$slots["arrow-right"] ? j("", !0) : (w(), be(m(Rn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : j("", !0)
        ], 2),
        Re(fa, {
          name: m(v)(e.showYearPicker),
          css: m(p)
        }, {
          default: me(() => {
            var G, q;
            return [
              e.showYearPicker ? (w(), be(Ma, {
                key: 0,
                items: e.items,
                "text-input": V.textInput,
                "esc-close": V.escClose,
                config: V.config,
                "is-last": V.autoApply && !m(o).keepActionRow,
                "hide-navigation": V.hideNavigation,
                "aria-labels": V.ariaLabels,
                "overlay-label": (q = (G = m(u)) == null ? void 0 : G.yearPicker) == null ? void 0 : q.call(G, !0),
                type: "year",
                onToggle: $,
                onSelected: B[4] || (B[4] = (F) => P(F))
              }, nt({
                "button-icon": me(() => [
                  V.$slots["calendar-icon"] ? oe(V.$slots, "calendar-icon", { key: 0 }) : j("", !0),
                  V.$slots["calendar-icon"] ? j("", !0) : (w(), be(m(pa), { key: 1 }))
                ]),
                _: 2
              }, [
                V.$slots["year-overlay-value"] ? {
                  name: "item",
                  fn: me(({ item: F }) => [
                    oe(V.$slots, "year-overlay-value", {
                      text: F.text,
                      value: F.value
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels", "overlay-label"])) : j("", !0)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ], 64);
    };
  }
}), Vn = (e, a, t) => {
  if (a.value && Array.isArray(a.value))
    if (a.value.some((n) => Oe(e, n))) {
      const n = a.value.filter((r) => !Oe(r, e));
      a.value = n.length ? n : null;
    } else
      (t && +t > a.value.length || !t) && a.value.push(e);
  else
    a.value = [e];
}, Bn = (e, a, t) => {
  let n = e.value ? e.value.slice() : [];
  return n.length === 2 && n[1] !== null && (n = []), n.length ? Ve(a, n[0]) ? (n.unshift(a), t("range-start", n[0]), t("range-start", n[1])) : (n[1] = a, t("range-end", a)) : (n = [a], t("range-start", a)), n;
}, Ua = (e, a, t, n) => {
  e && (e[0] && e[1] && t && a("auto-apply"), e[0] && !e[1] && n && t && a("auto-apply"));
}, al = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((a) => ct(Q(a), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = ct(Q(e.value), e.timezone));
}, nl = (e, a, t, n) => Array.isArray(a.value) && (a.value.length === 2 || a.value.length === 1 && n.value.partialRange) ? n.value.fixedStart && (He(e, a.value[0]) || Oe(e, a.value[0])) ? [a.value[0], e] : n.value.fixedEnd && (Ve(e, a.value[1]) || Oe(e, a.value[1])) ? [e, a.value[1]] : (t("invalid-fixed-range", e), a.value) : [], rl = ({
  multiCalendars: e,
  range: a,
  highlight: t,
  propDates: n,
  calendars: r,
  modelValue: l,
  props: o,
  filters: s,
  year: u,
  month: h,
  emit: f
}) => {
  const p = X(() => In(o.yearRange, o.locale, o.reverseYears)), v = K([!1]), g = X(() => (F, ie) => {
    const fe = Ce(_t(/* @__PURE__ */ new Date()), {
      month: h.value(F),
      year: u.value(F)
    }), he = ie ? Dr(fe) : Pa(fe);
    return Kr(
      he,
      n.value.maxDate,
      n.value.minDate,
      o.preventMinMaxNavigation,
      ie
    );
  }), $ = () => Array.isArray(l.value) && e.value.solo && l.value[1], P = () => {
    for (let F = 0; F < e.value.count; F++)
      if (F === 0)
        r.value[F] = r.value[0];
      else if (F === e.value.count - 1 && $())
        r.value[F] = {
          month: Pe(l.value[1]),
          year: we(l.value[1])
        };
      else {
        const ie = Ce(Q(), r.value[F - 1]);
        r.value[F] = { month: Pe(ie), year: we(Pn(ie, 1)) };
      }
  }, U = (F) => {
    if (!F)
      return P();
    const ie = Ce(Q(), r.value[F]);
    return r.value[0].year = we(Lr(ie, e.value.count - 1)), P();
  }, V = (F, ie) => {
    const fe = lo(ie, F);
    return a.value.showLastInRange && fe > 1 ? ie : F;
  }, B = (F) => o.focusStartDate || e.value.solo ? F[0] : F[1] ? V(F[0], F[1]) : F[0], O = () => {
    if (l.value) {
      const F = Array.isArray(l.value) ? B(l.value) : l.value;
      r.value[0] = { month: Pe(F), year: we(F) };
    }
  }, H = () => {
    O(), e.value.count && P();
  };
  gt(l, (F, ie) => {
    o.isTextInputDate && JSON.stringify(F ?? {}) !== JSON.stringify(ie ?? {}) && H();
  }), ot(() => {
    H();
  });
  const re = (F, ie) => {
    r.value[ie].year = F, f("update-month-year", { instance: ie, year: F, month: r.value[ie].month }), e.value.count && !e.value.solo && U(ie);
  }, Y = X(() => (F) => ca(p.value, (ie) => {
    var fe;
    const he = u.value(F) === ie.value, _ = Da(
      ie.value,
      ma(n.value.minDate),
      ma(n.value.maxDate)
    ) || ((fe = s.value.years) == null ? void 0 : fe.includes(u.value(F))), S = Ln(t.value, ie.value);
    return { active: he, disabled: _, highlighted: S };
  })), T = (F, ie) => {
    re(F, ie), q(ie);
  }, G = (F, ie = !1) => {
    if (!g.value(F, ie)) {
      const fe = ie ? u.value(F) + 1 : u.value(F) - 1;
      re(fe, F);
    }
  }, q = (F, ie = !1, fe) => {
    ie || f("reset-flow"), fe !== void 0 ? v.value[F] = fe : v.value[F] = !v.value[F], v.value[F] ? f("overlay-toggle", { open: !0, overlay: lt.year }) : (f("overlay-closed"), f("overlay-toggle", { open: !1, overlay: lt.year }));
  };
  return {
    isDisabled: g,
    groupedYears: Y,
    showYearPicker: v,
    selectYear: re,
    toggleYearPicker: q,
    handleYearSelect: T,
    handleYear: G
  };
}, Qi = (e, a) => {
  const {
    defaultedMultiCalendars: t,
    defaultedAriaLabels: n,
    defaultedTransitions: r,
    defaultedConfig: l,
    defaultedRange: o,
    defaultedHighlight: s,
    propDates: u,
    defaultedTz: h,
    defaultedFilters: f,
    defaultedMultiDates: p
  } = qe(e), v = () => {
    e.isTextInputDate && H(we(Q(e.startDate)), 0);
  }, { modelValue: g, year: $, month: P, calendars: U } = Aa(e, a, v), V = X(() => Br(e.formatLocale, e.locale, e.monthNameFormat)), B = K(null), { checkMinMaxRange: O } = Ht(e), {
    selectYear: H,
    groupedYears: re,
    showYearPicker: Y,
    toggleYearPicker: T,
    handleYearSelect: G,
    handleYear: q,
    isDisabled: F
  } = rl({
    modelValue: g,
    multiCalendars: t,
    range: o,
    highlight: s,
    calendars: U,
    year: $,
    propDates: u,
    month: P,
    filters: f,
    props: e,
    emit: a
  });
  ot(() => {
    e.startDate && (g.value && e.focusStartDate || !g.value) && H(we(Q(e.startDate)), 0);
  });
  const ie = (i) => i ? { month: Pe(i), year: we(i) } : { month: null, year: null }, fe = () => g.value ? Array.isArray(g.value) ? g.value.map((i) => ie(i)) : ie(g.value) : ie(), he = (i, M) => {
    const L = U.value[i], c = fe();
    return Array.isArray(c) ? c.some((le) => le.year === (L == null ? void 0 : L.year) && le.month === M) : (L == null ? void 0 : L.year) === c.year && M === c.month;
  }, _ = (i, M, L) => {
    var c, le;
    const ge = fe();
    return Array.isArray(ge) ? $.value(M) === ((c = ge[L]) == null ? void 0 : c.year) && i === ((le = ge[L]) == null ? void 0 : le.month) : !1;
  }, S = (i, M) => {
    if (o.value.enabled) {
      const L = fe();
      if (Array.isArray(g.value) && Array.isArray(L)) {
        const c = _(i, M, 0) || _(i, M, 1), le = Ct(_t(Q()), i, $.value(M));
        return Wa(g.value, B.value, le) && !c;
      }
      return !1;
    }
    return !1;
  }, k = X(() => (i) => ca(V.value, (M) => {
    var L;
    const c = he(i, M.value), le = Da(
      M.value,
      zr($.value(i), u.value.minDate),
      Ur($.value(i), u.value.maxDate)
    ) || bi(u.value.disabledDates, $.value(i)).includes(M.value) || ((L = f.value.months) == null ? void 0 : L.includes(M.value)), ge = S(M.value, i), Ge = Jr(s.value, M.value, $.value(i));
    return { active: c, disabled: le, isBetween: ge, highlighted: Ge };
  })), E = (i, M) => Ct(_t(Q()), i, $.value(M)), se = (i, M) => {
    const L = g.value ? g.value : _t(/* @__PURE__ */ new Date());
    g.value = Ct(L, i, $.value(M)), a("auto-apply"), a("update-flow-step");
  }, N = (i, M) => {
    const L = E(i, M);
    o.value.fixedEnd || o.value.fixedStart ? g.value = nl(L, g, a, o) : g.value ? O(L, g.value) && (g.value = Bn(g, E(i, M), a)) : g.value = [E(i, M)], mt().then(() => {
      Ua(g.value, a, e.autoApply, e.modelAuto);
    });
  }, ne = (i, M) => {
    Vn(E(i, M), g, p.value.limit), a("auto-apply", !0);
  }, ye = (i, M) => (U.value[M].month = i, b(M, U.value[M].year, i), p.value.enabled ? ne(i, M) : o.value.enabled ? N(i, M) : se(i, M)), y = (i, M) => {
    H(i, M), b(M, i, null);
  }, b = (i, M, L) => {
    let c = L;
    if (!c && c !== 0) {
      const le = fe();
      c = Array.isArray(le) ? le[i].month : le.month;
    }
    a("update-month-year", { instance: i, year: M, month: c });
  };
  return {
    groupedMonths: k,
    groupedYears: re,
    year: $,
    isDisabled: F,
    defaultedMultiCalendars: t,
    defaultedAriaLabels: n,
    defaultedTransitions: r,
    defaultedConfig: l,
    showYearPicker: Y,
    modelValue: g,
    presetDate: (i, M) => {
      al({
        value: i,
        modelValue: g,
        range: o.value.enabled,
        timezone: M ? void 0 : h.value.timezone
      }), a("auto-apply");
    },
    setHoverDate: (i, M) => {
      B.value = E(i, M);
    },
    selectMonth: ye,
    selectYear: y,
    toggleYearPicker: T,
    handleYearSelect: G,
    handleYear: q,
    getModelMonthYear: fe
  };
}, Gi = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...Pt
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year",
    "update-flow-step",
    "mount",
    "invalid-fixed-range",
    "overlay-toggle"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = ea(), l = pt(r, "yearMode"), o = e;
    ot(() => {
      o.shadow || n("mount", null);
    });
    const {
      groupedMonths: s,
      groupedYears: u,
      year: h,
      isDisabled: f,
      defaultedMultiCalendars: p,
      defaultedConfig: v,
      showYearPicker: g,
      modelValue: $,
      presetDate: P,
      setHoverDate: U,
      selectMonth: V,
      selectYear: B,
      toggleYearPicker: O,
      handleYearSelect: H,
      handleYear: re,
      getModelMonthYear: Y
    } = Qi(o, n);
    return a({ getSidebarProps: () => ({
      modelValue: $,
      year: h,
      getModelMonthYear: Y,
      selectMonth: V,
      selectYear: B,
      handleYear: re
    }), presetDate: P, toggleYearPicker: (T) => O(0, T) }), (T, G) => (w(), be(za, {
      "multi-calendars": m(p).count,
      collapse: T.collapse,
      stretch: ""
    }, {
      default: me(({ instance: q }) => [
        T.$slots["top-extra"] ? oe(T.$slots, "top-extra", {
          key: 0,
          value: T.internalModelValue
        }) : j("", !0),
        T.$slots["month-year"] ? oe(T.$slots, "month-year", ze(Ee({ key: 1 }, {
          year: m(h),
          months: m(s)(q),
          years: m(u)(q),
          selectMonth: m(V),
          selectYear: m(B),
          instance: q
        }))) : (w(), be(Ma, {
          key: 2,
          items: m(s)(q),
          "arrow-navigation": T.arrowNavigation,
          "is-last": T.autoApply && !m(v).keepActionRow,
          "esc-close": T.escClose,
          height: m(v).modeHeight,
          config: T.config,
          "no-overlay-focus": !!(T.noOverlayFocus || T.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (F) => m(V)(F, q),
          onHoverValue: (F) => m(U)(F, q)
        }, nt({
          header: me(() => [
            Re(tl, Ee(T.$props, {
              items: m(u)(q),
              instance: q,
              "show-year-picker": m(g)[q],
              year: m(h)(q),
              "is-disabled": (F) => m(f)(q, F),
              onHandleYear: (F) => m(re)(q, F),
              onYearSelect: (F) => m(H)(F, q),
              onToggleYearPicker: (F) => m(O)(q, F == null ? void 0 : F.flow, F == null ? void 0 : F.show)
            }), nt({ _: 2 }, [
              Fe(m(l), (F, ie) => ({
                name: F,
                fn: me((fe) => [
                  oe(T.$slots, F, ze(tt(fe)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          T.$slots["month-overlay-value"] ? {
            name: "item",
            fn: me(({ item: F }) => [
              oe(T.$slots, "month-overlay-value", {
                text: F.text,
                value: F.value
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
}), Ki = (e, a) => {
  const t = () => {
    e.isTextInputDate && (f.value = we(Q(e.startDate)));
  }, { modelValue: n } = Aa(e, a, t), r = K(null), { defaultedHighlight: l, defaultedMultiDates: o, defaultedFilters: s, defaultedRange: u, propDates: h } = qe(e), f = K();
  ot(() => {
    e.startDate && (n.value && e.focusStartDate || !n.value) && (f.value = we(Q(e.startDate)));
  });
  const p = (P) => Array.isArray(n.value) ? n.value.some((U) => we(U) === P) : n.value ? we(n.value) === P : !1, v = (P) => u.value.enabled && Array.isArray(n.value) ? Wa(n.value, r.value, $(P)) : !1, g = X(() => ca(In(e.yearRange, e.locale, e.reverseYears), (P) => {
    const U = p(P.value), V = Da(
      P.value,
      ma(h.value.minDate),
      ma(h.value.maxDate)
    ) || s.value.years.includes(P.value), B = v(P.value) && !U, O = Ln(l.value, P.value);
    return { active: U, disabled: V, isBetween: B, highlighted: O };
  })), $ = (P) => St(_t(Pa(/* @__PURE__ */ new Date())), P);
  return {
    groupedYears: g,
    modelValue: n,
    focusYear: f,
    setHoverValue: (P) => {
      r.value = St(_t(/* @__PURE__ */ new Date()), P);
    },
    selectYear: (P) => {
      var U;
      if (a("update-month-year", { instance: 0, year: P }), o.value.enabled)
        return n.value ? Array.isArray(n.value) && (((U = n.value) == null ? void 0 : U.map((V) => we(V))).includes(P) ? n.value = n.value.filter((V) => we(V) !== P) : n.value.push(St(dt(Q()), P))) : n.value = [St(dt(Pa(Q())), P)], a("auto-apply", !0);
      u.value.enabled ? (n.value = Bn(n, $(P), a), mt().then(() => {
        Ua(n.value, a, e.autoApply, e.modelAuto);
      })) : (n.value = $(P), a("auto-apply"));
    }
  };
}, Xi = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...Pt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, { groupedYears: l, modelValue: o, focusYear: s, selectYear: u, setHoverValue: h } = Ki(r, n), { defaultedConfig: f } = qe(r);
    return a({ getSidebarProps: () => ({
      modelValue: o,
      selectYear: u
    }) }), (p, v) => (w(), I("div", null, [
      p.$slots["top-extra"] ? oe(p.$slots, "top-extra", {
        key: 0,
        value: p.internalModelValue
      }) : j("", !0),
      p.$slots["month-year"] ? oe(p.$slots, "month-year", ze(Ee({ key: 1 }, {
        years: m(l),
        selectYear: m(u)
      }))) : (w(), be(Ma, {
        key: 2,
        items: m(l),
        "is-last": p.autoApply && !m(f).keepActionRow,
        height: m(f).modeHeight,
        config: p.config,
        "no-overlay-focus": !!(p.noOverlayFocus || p.textInput),
        "focus-value": m(s),
        type: "year",
        "use-relative": "",
        onSelected: m(u),
        onHoverValue: m(h)
      }, nt({ _: 2 }, [
        p.$slots["year-overlay-value"] ? {
          name: "item",
          fn: me(({ item: g }) => [
            oe(p.$slots, "year-overlay-value", {
              text: g.text,
              value: g.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
}), Ji = {
  key: 0,
  class: "dp__time_input"
}, Zi = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"], eu = /* @__PURE__ */ ue("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), tu = /* @__PURE__ */ ue("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1), au = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"], nu = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"], ru = /* @__PURE__ */ ue("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), lu = /* @__PURE__ */ ue("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1), ou = { key: 0 }, su = ["aria-label"], iu = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: { type: Function, default: () => !1 },
    ...Pt
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed",
    "overlay-opened",
    "am-pm-change"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, { setTimePickerElements: l, setTimePickerBackRef: o } = Wt(), { defaultedAriaLabels: s, defaultedTransitions: u, defaultedFilters: h, defaultedConfig: f, defaultedRange: p } = qe(r), { transitionName: v, showTransition: g } = Sa(u), $ = at({
      hours: !1,
      minutes: !1,
      seconds: !1
    }), P = K("AM"), U = K(null), V = K([]), B = K(), O = K(!1);
    ot(() => {
      n("mounted");
    });
    const H = (d) => Ce(/* @__PURE__ */ new Date(), {
      hours: d.hours,
      minutes: d.minutes,
      seconds: r.enableSeconds ? d.seconds : 0,
      milliseconds: 0
    }), re = X(
      () => (d) => E(d, r[d]) || T(d, r[d])
    ), Y = X(() => ({ hours: r.hours, minutes: r.minutes, seconds: r.seconds })), T = (d, W) => p.value.enabled && !p.value.disableTimeRangeValidation ? !r.validateTime(d, W) : !1, G = (d, W) => {
      if (p.value.enabled && !p.value.disableTimeRangeValidation) {
        const ee = W ? +r[`${d}Increment`] : -+r[`${d}Increment`], C = r[d] + ee;
        return !r.validateTime(d, C);
      }
      return !1;
    }, q = X(() => (d) => !y(+r[d] + +r[`${d}Increment`], d) || G(d, !0)), F = X(() => (d) => !y(+r[d] - +r[`${d}Increment`], d) || G(d, !1)), ie = (d, W) => wr(Ce(Q(), d), W), fe = (d, W) => ti(Ce(Q(), d), W), he = X(
      () => ({
        dp__time_col: !0,
        dp__time_col_block: !r.timePickerInline,
        dp__time_col_reg_block: !r.enableSeconds && r.is24 && !r.timePickerInline,
        dp__time_col_reg_inline: !r.enableSeconds && r.is24 && r.timePickerInline,
        dp__time_col_reg_with_button: !r.enableSeconds && !r.is24,
        dp__time_col_sec: r.enableSeconds && r.is24,
        dp__time_col_sec_with_button: r.enableSeconds && !r.is24
      })
    ), _ = X(() => {
      const d = [{ type: "hours" }];
      return r.enableMinutes && d.push({ type: "", separator: !0 }, {
        type: "minutes"
      }), r.enableSeconds && d.push({ type: "", separator: !0 }, {
        type: "seconds"
      }), d;
    }), S = X(() => _.value.filter((d) => !d.separator)), k = X(() => (d) => {
      if (d === "hours") {
        const W = le(+r.hours);
        return { text: W < 10 ? `0${W}` : `${W}`, value: W };
      }
      return { text: r[d] < 10 ? `0${r[d]}` : `${r[d]}`, value: r[d] };
    }), E = (d, W) => {
      var ee;
      if (!r.disabledTimesConfig)
        return !1;
      const C = r.disabledTimesConfig(r.order, d === "hours" ? W : void 0);
      return C[d] ? !!((ee = C[d]) != null && ee.includes(W)) : !0;
    }, se = (d, W) => W !== "hours" || P.value === "AM" ? d : d + 12, N = (d) => {
      const W = r.is24 ? 24 : 12, ee = d === "hours" ? W : 60, C = +r[`${d}GridIncrement`], _e = d === "hours" && !r.is24 ? C : 0, D = [];
      for (let J = _e; J < ee; J += C)
        D.push({ value: r.is24 ? J : se(J, d), text: J < 10 ? `0${J}` : `${J}` });
      return d === "hours" && !r.is24 && D.unshift({ value: P.value === "PM" ? 12 : 0, text: "12" }), ca(D, (J) => ({ active: !1, disabled: h.value.times[d].includes(J.value) || !y(J.value, d) || E(d, J.value) || T(d, J.value) }));
    }, ne = (d) => d >= 0 ? d : 59, ye = (d) => d >= 0 ? d : 23, y = (d, W) => {
      const ee = r.minTime ? H(ln(r.minTime)) : null, C = r.maxTime ? H(ln(r.maxTime)) : null, _e = H(
        ln(
          Y.value,
          W,
          W === "minutes" || W === "seconds" ? ne(d) : ye(d)
        )
      );
      return ee && C ? (Oa(_e, C) || la(_e, C)) && (ua(_e, ee) || la(_e, ee)) : ee ? ua(_e, ee) || la(_e, ee) : C ? Oa(_e, C) || la(_e, C) : !0;
    }, b = (d) => r[`no${d[0].toUpperCase() + d.slice(1)}Overlay`], i = (d) => {
      b(d) || ($[d] = !$[d], $[d] ? (O.value = !0, n("overlay-opened", d)) : (O.value = !1, n("overlay-closed", d)));
    }, M = (d) => d === "hours" ? Ft : d === "minutes" ? jt : ia, L = () => {
      B.value && clearTimeout(B.value);
    }, c = (d, W = !0, ee) => {
      const C = W ? ie : fe, _e = W ? +r[`${d}Increment`] : -+r[`${d}Increment`];
      y(+r[d] + _e, d) && n(
        `update:${d}`,
        M(d)(C({ [d]: +r[d] }, { [d]: +r[`${d}Increment`] }))
      ), !(ee != null && ee.keyboard) && f.value.timeArrowHoldThreshold && (B.value = setTimeout(() => {
        c(d, W);
      }, f.value.timeArrowHoldThreshold));
    }, le = (d) => r.is24 ? d : (d >= 12 ? P.value = "PM" : P.value = "AM", si(d)), ge = () => {
      P.value === "PM" ? (P.value = "AM", n("update:hours", r.hours - 12)) : (P.value = "PM", n("update:hours", r.hours + 12)), n("am-pm-change", P.value);
    }, Ge = (d) => {
      $[d] = !0;
    }, A = (d, W, ee) => {
      if (d && r.arrowNavigation) {
        Array.isArray(V.value[W]) ? V.value[W][ee] = d : V.value[W] = [d];
        const C = V.value.reduce(
          (_e, D) => D.map((J, ce) => [..._e[ce] || [], D[ce]]),
          []
        );
        o(r.closeTimePickerBtn), U.value && (C[1] = C[1].concat(U.value)), l(C, r.order);
      }
    }, Z = (d, W) => (i(d), n(`update:${d}`, W));
    return a({ openChildCmp: Ge }), (d, W) => {
      var ee;
      return d.disabled ? j("", !0) : (w(), I("div", Ji, [
        (w(!0), I(xe, null, Fe(_.value, (C, _e) => {
          var D, J, ce;
          return w(), I("div", {
            key: _e,
            class: ke(he.value)
          }, [
            C.separator ? (w(), I(xe, { key: 0 }, [
              O.value ? j("", !0) : (w(), I(xe, { key: 0 }, [
                Be(":")
              ], 64))
            ], 64)) : (w(), I(xe, { key: 1 }, [
              ue("button", {
                ref_for: !0,
                ref: (Te) => A(Te, _e, 0),
                type: "button",
                class: ke({
                  dp__btn: !0,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_top: d.timePickerInline,
                  dp__inc_dec_button_disabled: q.value(C.type),
                  "dp--hidden-el": O.value
                }),
                "data-test": `${C.type}-time-inc-btn-${r.order}`,
                "aria-label": (D = m(s)) == null ? void 0 : D.incrementValue(C.type),
                tabindex: "0",
                onKeydown: (Te) => m(ut)(Te, () => c(C.type, !0, { keyboard: !0 }), !0),
                onClick: (Te) => m(f).timeArrowHoldThreshold ? void 0 : c(C.type, !0),
                onMousedown: (Te) => m(f).timeArrowHoldThreshold ? c(C.type, !0) : void 0,
                onMouseup: L
              }, [
                r.timePickerInline ? (w(), I(xe, { key: 1 }, [
                  d.$slots["tp-inline-arrow-up"] ? oe(d.$slots, "tp-inline-arrow-up", { key: 0 }) : (w(), I(xe, { key: 1 }, [
                    eu,
                    tu
                  ], 64))
                ], 64)) : (w(), I(xe, { key: 0 }, [
                  d.$slots["arrow-up"] ? oe(d.$slots, "arrow-up", { key: 0 }) : j("", !0),
                  d.$slots["arrow-up"] ? j("", !0) : (w(), be(m(Fn), { key: 1 }))
                ], 64))
              ], 42, Zi),
              ue("button", {
                ref_for: !0,
                ref: (Te) => A(Te, _e, 1),
                type: "button",
                "aria-label": `${k.value(C.type).text}-${(J = m(s)) == null ? void 0 : J.openTpOverlay(C.type)}`,
                class: ke({
                  dp__time_display: !0,
                  dp__time_display_block: !d.timePickerInline,
                  dp__time_display_inline: d.timePickerInline,
                  "dp--time-invalid": re.value(C.type),
                  "dp--time-overlay-btn": !re.value(C.type),
                  "dp--hidden-el": O.value
                }),
                disabled: b(C.type),
                tabindex: "0",
                "data-test": `${C.type}-toggle-overlay-btn-${r.order}`,
                onKeydown: (Te) => m(ut)(Te, () => i(C.type), !0),
                onClick: (Te) => i(C.type)
              }, [
                d.$slots[C.type] ? oe(d.$slots, C.type, {
                  key: 0,
                  text: k.value(C.type).text,
                  value: k.value(C.type).value
                }) : j("", !0),
                d.$slots[C.type] ? j("", !0) : (w(), I(xe, { key: 1 }, [
                  Be(De(k.value(C.type).text), 1)
                ], 64))
              ], 42, au),
              ue("button", {
                ref_for: !0,
                ref: (Te) => A(Te, _e, 2),
                type: "button",
                class: ke({
                  dp__btn: !0,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_bottom: d.timePickerInline,
                  dp__inc_dec_button_disabled: F.value(C.type),
                  "dp--hidden-el": O.value
                }),
                "data-test": `${C.type}-time-dec-btn-${r.order}`,
                "aria-label": (ce = m(s)) == null ? void 0 : ce.decrementValue(C.type),
                tabindex: "0",
                onKeydown: (Te) => m(ut)(Te, () => c(C.type, !1, { keyboard: !0 }), !0),
                onClick: (Te) => m(f).timeArrowHoldThreshold ? void 0 : c(C.type, !1),
                onMousedown: (Te) => m(f).timeArrowHoldThreshold ? c(C.type, !1) : void 0,
                onMouseup: L
              }, [
                r.timePickerInline ? (w(), I(xe, { key: 1 }, [
                  d.$slots["tp-inline-arrow-down"] ? oe(d.$slots, "tp-inline-arrow-down", { key: 0 }) : (w(), I(xe, { key: 1 }, [
                    ru,
                    lu
                  ], 64))
                ], 64)) : (w(), I(xe, { key: 0 }, [
                  d.$slots["arrow-down"] ? oe(d.$slots, "arrow-down", { key: 0 }) : j("", !0),
                  d.$slots["arrow-down"] ? j("", !0) : (w(), be(m(Yn), { key: 1 }))
                ], 64))
              ], 42, nu)
            ], 64))
          ], 2);
        }), 128)),
        d.is24 ? j("", !0) : (w(), I("div", ou, [
          d.$slots["am-pm-button"] ? oe(d.$slots, "am-pm-button", {
            key: 0,
            toggle: ge,
            value: P.value
          }) : j("", !0),
          d.$slots["am-pm-button"] ? j("", !0) : (w(), I("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: U,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (ee = m(s)) == null ? void 0 : ee.amPmButton,
            tabindex: "0",
            onClick: ge,
            onKeydown: W[0] || (W[0] = (C) => m(ut)(C, () => ge(), !0))
          }, De(P.value), 41, su))
        ])),
        (w(!0), I(xe, null, Fe(S.value, (C, _e) => (w(), be(fa, {
          key: _e,
          name: m(v)($[C.type]),
          css: m(g)
        }, {
          default: me(() => {
            var D, J;
            return [
              $[C.type] ? (w(), be(Ma, {
                key: 0,
                items: N(C.type),
                "is-last": d.autoApply && !m(f).keepActionRow,
                "esc-close": d.escClose,
                type: C.type,
                "text-input": d.textInput,
                config: d.config,
                "arrow-navigation": d.arrowNavigation,
                "aria-labels": d.ariaLabels,
                "overlay-label": (J = (D = m(s)).timeOverlay) == null ? void 0 : J.call(D, C.type),
                onSelected: (ce) => Z(C.type, ce),
                onToggle: (ce) => i(C.type),
                onResetFlow: W[1] || (W[1] = (ce) => d.$emit("reset-flow"))
              }, nt({
                "button-icon": me(() => [
                  d.$slots["clock-icon"] ? oe(d.$slots, "clock-icon", { key: 0 }) : j("", !0),
                  d.$slots["clock-icon"] ? j("", !0) : (w(), be(ja(d.timePickerInline ? m(pa) : m(Cn)), { key: 1 }))
                ]),
                _: 2
              }, [
                d.$slots[`${C.type}-overlay-value`] ? {
                  name: "item",
                  fn: me(({ item: ce }) => [
                    oe(d.$slots, `${C.type}-overlay-value`, {
                      text: ce.text,
                      value: ce.value
                    })
                  ]),
                  key: "0"
                } : void 0,
                d.$slots[`${C.type}-overlay-header`] ? {
                  name: "header",
                  fn: me(() => [
                    oe(d.$slots, `${C.type}-overlay-header`, {
                      toggle: () => i(C.type)
                    })
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : j("", !0)
            ];
          }),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
}), uu = { class: "dp--tp-wrap" }, du = ["aria-label", "tabindex"], cu = ["role", "aria-label", "tabindex"], mu = ["aria-label"], ll = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: {
      type: Function,
      default: () => !1
    },
    ...Pt
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, { buildMatrix: l, setTimePicker: o } = Wt(), s = ea(), { defaultedTransitions: u, defaultedAriaLabels: h, defaultedTextInput: f, defaultedConfig: p, defaultedRange: v } = qe(r), { transitionName: g, showTransition: $ } = Sa(u), { hideNavigationButtons: P } = Qa(), U = K(null), V = K(null), B = K([]), O = K(null), H = K(!1);
    ot(() => {
      n("mount"), !r.timePicker && r.arrowNavigation ? l([Xe(U.value)], "time") : o(!0, r.timePicker);
    });
    const re = X(() => v.value.enabled && r.modelAuto ? jr(r.internalModelValue) : !0), Y = K(!1), T = (N) => ({
      hours: Array.isArray(r.hours) ? r.hours[N] : r.hours,
      minutes: Array.isArray(r.minutes) ? r.minutes[N] : r.minutes,
      seconds: Array.isArray(r.seconds) ? r.seconds[N] : r.seconds
    }), G = X(() => {
      const N = [];
      if (v.value.enabled)
        for (let ne = 0; ne < 2; ne++)
          N.push(T(ne));
      else
        N.push(T(0));
      return N;
    }), q = (N, ne = !1, ye = "") => {
      ne || n("reset-flow"), Y.value = N, n(N ? "overlay-opened" : "overlay-closed", lt.time), r.arrowNavigation && o(N), mt(() => {
        ye !== "" && B.value[0] && B.value[0].openChildCmp(ye);
      });
    }, F = X(() => ({
      dp__btn: !0,
      dp__button: !0,
      dp__button_bottom: r.autoApply && !p.value.keepActionRow
    })), ie = pt(s, "timePicker"), fe = (N, ne, ye) => v.value.enabled ? ne === 0 ? [N, G.value[1][ye]] : [G.value[0][ye], N] : N, he = (N) => {
      n("update:hours", N);
    }, _ = (N) => {
      n("update:minutes", N);
    }, S = (N) => {
      n("update:seconds", N);
    }, k = () => {
      if (O.value && !f.value.enabled && !r.noOverlayFocus) {
        const N = Wr(O.value);
        N && N.focus({ preventScroll: !0 });
      }
    }, E = (N) => {
      H.value = !1, n("overlay-closed", N);
    }, se = (N) => {
      H.value = !0, n("overlay-opened", N);
    };
    return a({ toggleTimePicker: q }), (N, ne) => {
      var ye;
      return w(), I("div", uu, [
        !N.timePicker && !N.timePickerInline ? Ia((w(), I("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: U,
          type: "button",
          class: ke({ ...F.value, "dp--hidden-el": Y.value }),
          "aria-label": (ye = m(h)) == null ? void 0 : ye.openTimePicker,
          tabindex: N.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: ne[0] || (ne[0] = (y) => m(ut)(y, () => q(!0))),
          onClick: ne[1] || (ne[1] = (y) => q(!0))
        }, [
          N.$slots["clock-icon"] ? oe(N.$slots, "clock-icon", { key: 0 }) : j("", !0),
          N.$slots["clock-icon"] ? j("", !0) : (w(), be(m(Cn), { key: 1 }))
        ], 42, du)), [
          [Ea, !m(P)(N.hideNavigation, "time")]
        ]) : j("", !0),
        Re(fa, {
          name: m(g)(Y.value),
          css: m($) && !N.timePickerInline
        }, {
          default: me(() => {
            var y, b;
            return [
              Y.value || N.timePicker || N.timePickerInline ? (w(), I("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: O,
                role: N.timePickerInline ? void 0 : "dialog",
                class: ke({
                  dp__overlay: !N.timePickerInline,
                  "dp--overlay-absolute": !r.timePicker && !N.timePickerInline,
                  "dp--overlay-relative": r.timePicker
                }),
                style: yt(N.timePicker ? { height: `${m(p).modeHeight}px` } : void 0),
                "aria-label": (y = m(h)) == null ? void 0 : y.timePicker,
                tabindex: N.timePickerInline ? void 0 : 0
              }, [
                ue("div", {
                  class: ke(
                    N.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  N.$slots["time-picker-overlay"] ? oe(N.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: he,
                    setMinutes: _,
                    setSeconds: S
                  }) : j("", !0),
                  N.$slots["time-picker-overlay"] ? j("", !0) : (w(), I("div", {
                    key: 1,
                    class: ke(N.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (w(!0), I(xe, null, Fe(G.value, (i, M) => Ia((w(), be(iu, Ee({
                      key: M,
                      ref_for: !0
                    }, {
                      ...N.$props,
                      order: M,
                      hours: i.hours,
                      minutes: i.minutes,
                      seconds: i.seconds,
                      closeTimePickerBtn: V.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: M === 0 ? m(v).fixedStart : m(v).fixedEnd
                    }, {
                      ref_for: !0,
                      ref_key: "timeInputRefs",
                      ref: B,
                      "validate-time": (L, c) => e.validateTime(L, fe(c, M, L)),
                      "onUpdate:hours": (L) => he(fe(L, M, "hours")),
                      "onUpdate:minutes": (L) => _(fe(L, M, "minutes")),
                      "onUpdate:seconds": (L) => S(fe(L, M, "seconds")),
                      onMounted: k,
                      onOverlayClosed: E,
                      onOverlayOpened: se,
                      onAmPmChange: ne[2] || (ne[2] = (L) => N.$emit("am-pm-change", L))
                    }), nt({ _: 2 }, [
                      Fe(m(ie), (L, c) => ({
                        name: L,
                        fn: me((le) => [
                          oe(N.$slots, L, Ee({ ref_for: !0 }, le))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [Ea, M === 0 ? !0 : re.value]
                    ])), 128))
                  ], 2)),
                  !N.timePicker && !N.timePickerInline ? Ia((w(), I("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: V,
                    type: "button",
                    class: ke({ ...F.value, "dp--hidden-el": H.value }),
                    "aria-label": (b = m(h)) == null ? void 0 : b.closeTimePicker,
                    tabindex: "0",
                    onKeydown: ne[3] || (ne[3] = (i) => m(ut)(i, () => q(!1))),
                    onClick: ne[4] || (ne[4] = (i) => q(!1))
                  }, [
                    N.$slots["calendar-icon"] ? oe(N.$slots, "calendar-icon", { key: 0 }) : j("", !0),
                    N.$slots["calendar-icon"] ? j("", !0) : (w(), be(m(pa), { key: 1 }))
                  ], 42, mu)), [
                    [Ea, !m(P)(N.hideNavigation, "time")]
                  ]) : j("", !0)
                ], 2)
              ], 14, cu)) : j("", !0)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
}), ol = (e, a, t, n) => {
  const { defaultedRange: r } = qe(e), l = (O, H) => Array.isArray(a[O]) ? a[O][H] : a[O], o = (O) => e.enableSeconds ? Array.isArray(a.seconds) ? a.seconds[O] : a.seconds : 0, s = (O, H) => O ? H !== void 0 ? Bt(O, l("hours", H), l("minutes", H), o(H)) : Bt(O, a.hours, a.minutes, o()) : qr(Q(), o(H)), u = (O, H) => {
    a[O] = H;
  }, h = X(() => e.modelAuto && r.value.enabled ? Array.isArray(t.value) ? t.value.length > 1 : !1 : r.value.enabled), f = (O, H) => {
    const re = Object.fromEntries(
      Object.keys(a).map((Y) => Y === O ? [Y, H] : [Y, a[Y]].slice())
    );
    if (h.value && !r.value.disableTimeRangeValidation) {
      const Y = (G) => t.value ? Bt(
        t.value[G],
        re.hours[G],
        re.minutes[G],
        re.seconds[G]
      ) : null, T = (G) => Er(t.value[G], 0);
      return !(Oe(Y(0), Y(1)) && (ua(Y(0), T(1)) || Oa(Y(1), T(0))));
    }
    return !0;
  }, p = (O, H) => {
    f(O, H) && (u(O, H), n && n());
  }, v = (O) => {
    p("hours", O);
  }, g = (O) => {
    p("minutes", O);
  }, $ = (O) => {
    p("seconds", O);
  }, P = (O, H, re, Y) => {
    H && v(O), !H && !re && g(O), re && $(O), t.value && Y(t.value);
  }, U = (O) => {
    if (O) {
      const H = Array.isArray(O), re = H ? [+O[0].hours, +O[1].hours] : +O.hours, Y = H ? [+O[0].minutes, +O[1].minutes] : +O.minutes, T = H ? [+O[0].seconds, +O[1].seconds] : +O.seconds;
      u("hours", re), u("minutes", Y), e.enableSeconds && u("seconds", T);
    }
  }, V = (O, H) => {
    const re = {
      hours: Array.isArray(a.hours) ? a.hours[O] : a.hours,
      disabledArr: []
    };
    return (H || H === 0) && (re.hours = H), Array.isArray(e.disabledTimes) && (re.disabledArr = r.value.enabled && Array.isArray(e.disabledTimes[O]) ? e.disabledTimes[O] : e.disabledTimes), re;
  }, B = X(() => (O, H) => {
    var re;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: Y, hours: T } = V(O, H), G = Y.filter((q) => +q.hours === T);
      return ((re = G[0]) == null ? void 0 : re.minutes) === "*" ? { hours: [T], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (G == null ? void 0 : G.map((q) => +q.minutes)) ?? [],
        seconds: (G == null ? void 0 : G.map((q) => q.seconds ? +q.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: u,
    updateHours: v,
    updateMinutes: g,
    updateSeconds: $,
    getSetDateTime: s,
    updateTimeValues: P,
    getSecondsValue: o,
    assignStartTime: U,
    validateTime: f,
    disabledTimesConfig: B
  };
}, fu = (e, a) => {
  const t = () => {
    e.isTextInputDate && H();
  }, { modelValue: n, time: r } = Aa(e, a, t), { defaultedStartTime: l, defaultedRange: o, defaultedTz: s } = qe(e), { updateTimeValues: u, getSetDateTime: h, setTime: f, assignStartTime: p, disabledTimesConfig: v, validateTime: g } = ol(e, r, n, $);
  function $() {
    a("update-flow-step");
  }
  const P = (Y) => {
    const { hours: T, minutes: G, seconds: q } = Y;
    return { hours: +T, minutes: +G, seconds: q ? +q : 0 };
  }, U = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const T = P(e.startTime[0]), G = P(e.startTime[1]);
        return [Ce(Q(), T), Ce(Q(), G)];
      }
      const Y = P(e.startTime);
      return Ce(Q(), Y);
    }
    return o.value.enabled ? [null, null] : null;
  }, V = () => {
    if (o.value.enabled) {
      const [Y, T] = U();
      n.value = [
        ct(h(Y, 0), s.value.timezone),
        ct(h(T, 1), s.value.timezone)
      ];
    } else
      n.value = ct(h(U()), s.value.timezone);
  }, B = (Y) => Array.isArray(Y) ? [Jt(Q(Y[0])), Jt(Q(Y[1]))] : [Jt(Y ?? Q())], O = (Y, T, G) => {
    f("hours", Y), f("minutes", T), f("seconds", e.enableSeconds ? G : 0);
  }, H = () => {
    const [Y, T] = B(n.value);
    return o.value.enabled ? O(
      [Y.hours, T.hours],
      [Y.minutes, T.minutes],
      [Y.seconds, T.seconds]
    ) : O(Y.hours, Y.minutes, Y.seconds);
  };
  ot(() => {
    if (!e.shadow)
      return p(l.value), n.value ? H() : V();
  });
  const re = () => {
    Array.isArray(n.value) ? n.value = n.value.map((Y, T) => Y && h(Y, T)) : n.value = h(n.value), a("time-update");
  };
  return {
    modelValue: n,
    time: r,
    disabledTimesConfig: v,
    updateTime: (Y, T = !0, G = !1) => {
      u(Y, T, G, re);
    },
    validateTime: g
  };
}, pu = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...Pt
  },
  emits: [
    "update:internal-model-value",
    "time-update",
    "am-pm-change",
    "mount",
    "reset-flow",
    "update-flow-step",
    "overlay-toggle"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, l = ea(), o = pt(l, "timePicker"), s = K(null), { time: u, modelValue: h, disabledTimesConfig: f, updateTime: p, validateTime: v } = fu(r, n);
    return ot(() => {
      r.shadow || n("mount", null);
    }), a({ getSidebarProps: () => ({
      modelValue: h,
      time: u,
      updateTime: p
    }), toggleTimePicker: (g, $ = !1, P = "") => {
      var U;
      (U = s.value) == null || U.toggleTimePicker(g, $, P);
    } }), (g, $) => (w(), be(za, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: me(() => [
        Re(ll, Ee({
          ref_key: "tpRef",
          ref: s
        }, g.$props, {
          hours: m(u).hours,
          minutes: m(u).minutes,
          seconds: m(u).seconds,
          "internal-model-value": g.internalModelValue,
          "disabled-times-config": m(f),
          "validate-time": m(v),
          "onUpdate:hours": $[0] || ($[0] = (P) => m(p)(P)),
          "onUpdate:minutes": $[1] || ($[1] = (P) => m(p)(P, !1)),
          "onUpdate:seconds": $[2] || ($[2] = (P) => m(p)(P, !1, !0)),
          onAmPmChange: $[3] || ($[3] = (P) => g.$emit("am-pm-change", P)),
          onResetFlow: $[4] || ($[4] = (P) => g.$emit("reset-flow")),
          onOverlayClosed: $[5] || ($[5] = (P) => g.$emit("overlay-toggle", { open: !1, overlay: P })),
          onOverlayOpened: $[6] || ($[6] = (P) => g.$emit("overlay-toggle", { open: !0, overlay: P }))
        }), nt({ _: 2 }, [
          Fe(m(o), (P, U) => ({
            name: P,
            fn: me((V) => [
              oe(g.$slots, P, ze(tt(V)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
}), hu = { class: "dp--header-wrap" }, vu = {
  key: 0,
  class: "dp__month_year_wrap"
}, yu = { key: 0 }, gu = { class: "dp__month_year_wrap" }, bu = ["data-dp-element", "aria-label", "data-test", "onClick", "onKeydown"], wu = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "DpHeader",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    ...Pt
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, {
      defaultedTransitions: l,
      defaultedAriaLabels: o,
      defaultedMultiCalendars: s,
      defaultedFilters: u,
      defaultedConfig: h,
      defaultedHighlight: f,
      propDates: p,
      defaultedUI: v
    } = qe(r), { transitionName: g, showTransition: $ } = Sa(l), { buildMatrix: P } = Wt(), { handleMonthYearChange: U, isDisabled: V, updateMonthYear: B } = Ei(r, n), { showLeftIcon: O, showRightIcon: H } = Qa(), re = K(!1), Y = K(!1), T = K(!1), G = K([null, null, null, null]);
    ot(() => {
      n("mount");
    });
    const q = (b) => ({
      get: () => r[b],
      set: (i) => {
        const M = b === bt.month ? bt.year : bt.month;
        n("update-month-year", { [b]: i, [M]: r[M] }), b === bt.month ? E(!0) : se(!0);
      }
    }), F = X(q(bt.month)), ie = X(q(bt.year)), fe = X(() => (b) => ({
      month: r.month,
      year: r.year,
      items: b === bt.month ? r.months : r.years,
      instance: r.instance,
      updateMonthYear: B,
      toggle: b === bt.month ? E : se
    })), he = X(() => r.months.find((i) => i.value === r.month) || { text: "", value: 0 }), _ = X(() => ca(r.months, (b) => {
      const i = r.month === b.value, M = Da(
        b.value,
        zr(r.year, p.value.minDate),
        Ur(r.year, p.value.maxDate)
      ) || u.value.months.includes(b.value), L = Jr(f.value, b.value, r.year);
      return { active: i, disabled: M, highlighted: L };
    })), S = X(() => ca(r.years, (b) => {
      const i = r.year === b.value, M = Da(
        b.value,
        ma(p.value.minDate),
        ma(p.value.maxDate)
      ) || u.value.years.includes(b.value), L = Ln(f.value, b.value);
      return { active: i, disabled: M, highlighted: L };
    })), k = (b, i, M) => {
      M !== void 0 ? b.value = M : b.value = !b.value, b.value ? (T.value = !0, n("overlay-opened", i)) : (T.value = !1, n("overlay-closed", i));
    }, E = (b = !1, i) => {
      N(b), k(re, lt.month, i);
    }, se = (b = !1, i) => {
      N(b), k(Y, lt.year, i);
    }, N = (b) => {
      b || n("reset-flow");
    }, ne = (b, i) => {
      r.arrowNavigation && (G.value[i] = Xe(b), P(G.value, "monthYear"));
    }, ye = X(() => {
      var b, i, M, L, c, le;
      return [
        {
          type: bt.month,
          index: 1,
          toggle: E,
          modelValue: F.value,
          updateModelValue: (ge) => F.value = ge,
          text: he.value.text,
          showSelectionGrid: re.value,
          items: _.value,
          ariaLabel: (b = o.value) == null ? void 0 : b.openMonthsOverlay,
          overlayLabel: ((M = (i = o.value).monthPicker) == null ? void 0 : M.call(i, !0)) ?? void 0
        },
        {
          type: bt.year,
          index: 2,
          toggle: se,
          modelValue: ie.value,
          updateModelValue: (ge) => ie.value = ge,
          text: Hr(r.year, r.locale),
          showSelectionGrid: Y.value,
          items: S.value,
          ariaLabel: (L = o.value) == null ? void 0 : L.openYearsOverlay,
          overlayLabel: ((le = (c = o.value).yearPicker) == null ? void 0 : le.call(c, !0)) ?? void 0
        }
      ];
    }), y = X(() => r.disableYearSelect ? [ye.value[0]] : r.yearFirst ? [...ye.value].reverse() : ye.value);
    return a({
      toggleMonthPicker: E,
      toggleYearPicker: se,
      handleMonthYearChange: U
    }), (b, i) => {
      var M, L, c, le, ge, Ge;
      return w(), I("div", hu, [
        b.$slots["month-year"] ? (w(), I("div", vu, [
          oe(b.$slots, "month-year", ze(tt({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: m(B), handleMonthYearChange: m(U), instance: e.instance })))
        ])) : (w(), I(xe, { key: 1 }, [
          b.$slots["top-extra"] ? (w(), I("div", yu, [
            oe(b.$slots, "top-extra", { value: b.internalModelValue })
          ])) : j("", !0),
          ue("div", gu, [
            m(O)(m(s), e.instance) && !b.vertical ? (w(), be(xa, {
              key: 0,
              "aria-label": (M = m(o)) == null ? void 0 : M.prevMonth,
              disabled: m(V)(!1),
              class: ke((L = m(v)) == null ? void 0 : L.navBtnPrev),
              "el-name": "action-prev",
              onActivate: i[0] || (i[0] = (A) => m(U)(!1, !0)),
              onSetRef: i[1] || (i[1] = (A) => ne(A, 0))
            }, {
              default: me(() => [
                b.$slots["arrow-left"] ? oe(b.$slots, "arrow-left", { key: 0 }) : j("", !0),
                b.$slots["arrow-left"] ? j("", !0) : (w(), be(m($n), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : j("", !0),
            ue("div", {
              class: ke(["dp__month_year_wrap", {
                dp__year_disable_select: b.disableYearSelect
              }])
            }, [
              (w(!0), I(xe, null, Fe(y.value, (A, Z) => (w(), I(xe, {
                key: A.type
              }, [
                ue("button", {
                  ref_for: !0,
                  ref: (d) => ne(d, Z + 1),
                  type: "button",
                  "data-dp-element": `overlay-${A.type}`,
                  class: ke(["dp__btn dp__month_year_select", { "dp--hidden-el": T.value }]),
                  "aria-label": `${A.text}-${A.ariaLabel}`,
                  "data-test": `${A.type}-toggle-overlay-${e.instance}`,
                  onClick: A.toggle,
                  onKeydown: (d) => m(ut)(d, () => A.toggle(), !0)
                }, [
                  b.$slots[A.type] ? oe(b.$slots, A.type, {
                    key: 0,
                    text: A.text,
                    value: r[A.type]
                  }) : j("", !0),
                  b.$slots[A.type] ? j("", !0) : (w(), I(xe, { key: 1 }, [
                    Be(De(A.text), 1)
                  ], 64))
                ], 42, bu),
                Re(fa, {
                  name: m(g)(A.showSelectionGrid),
                  css: m($)
                }, {
                  default: me(() => [
                    A.showSelectionGrid ? (w(), be(Ma, {
                      key: 0,
                      items: A.items,
                      "arrow-navigation": b.arrowNavigation,
                      "hide-navigation": b.hideNavigation,
                      "is-last": b.autoApply && !m(h).keepActionRow,
                      "skip-button-ref": !1,
                      config: b.config,
                      type: A.type,
                      "header-refs": [],
                      "esc-close": b.escClose,
                      "menu-wrap-ref": b.menuWrapRef,
                      "text-input": b.textInput,
                      "aria-labels": b.ariaLabels,
                      "overlay-label": A.overlayLabel,
                      onSelected: A.updateModelValue,
                      onToggle: A.toggle
                    }, nt({
                      "button-icon": me(() => [
                        b.$slots["calendar-icon"] ? oe(b.$slots, "calendar-icon", { key: 0 }) : j("", !0),
                        b.$slots["calendar-icon"] ? j("", !0) : (w(), be(m(pa), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      b.$slots[`${A.type}-overlay-value`] ? {
                        name: "item",
                        fn: me(({ item: d }) => [
                          oe(b.$slots, `${A.type}-overlay-value`, {
                            text: d.text,
                            value: d.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      b.$slots[`${A.type}-overlay`] ? {
                        name: "overlay",
                        fn: me(() => [
                          oe(b.$slots, `${A.type}-overlay`, Ee({ ref_for: !0 }, fe.value(A.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      b.$slots[`${A.type}-overlay-header`] ? {
                        name: "header",
                        fn: me(() => [
                          oe(b.$slots, `${A.type}-overlay-header`, {
                            toggle: A.toggle
                          })
                        ]),
                        key: "2"
                      } : void 0
                    ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : j("", !0)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ], 64))), 128))
            ], 2),
            m(O)(m(s), e.instance) && b.vertical ? (w(), be(xa, {
              key: 1,
              "aria-label": (c = m(o)) == null ? void 0 : c.prevMonth,
              "el-name": "action-prev",
              disabled: m(V)(!1),
              class: ke((le = m(v)) == null ? void 0 : le.navBtnPrev),
              onActivate: i[2] || (i[2] = (A) => m(U)(!1, !0))
            }, {
              default: me(() => [
                b.$slots["arrow-up"] ? oe(b.$slots, "arrow-up", { key: 0 }) : j("", !0),
                b.$slots["arrow-up"] ? j("", !0) : (w(), be(m(Fn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : j("", !0),
            m(H)(m(s), e.instance) ? (w(), be(xa, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: m(V)(!0),
              "aria-label": (ge = m(o)) == null ? void 0 : ge.nextMonth,
              class: ke((Ge = m(v)) == null ? void 0 : Ge.navBtnNext),
              onActivate: i[3] || (i[3] = (A) => m(U)(!0, !0)),
              onSetRef: i[4] || (i[4] = (A) => ne(A, b.disableYearSelect ? 2 : 3))
            }, {
              default: me(() => [
                b.$slots[b.vertical ? "arrow-down" : "arrow-right"] ? oe(b.$slots, b.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : j("", !0),
                b.$slots[b.vertical ? "arrow-down" : "arrow-right"] ? j("", !0) : (w(), be(ja(b.vertical ? m(Yn) : m(Rn)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : j("", !0)
          ])
        ], 64))
      ]);
    };
  }
}), _u = {
  class: "dp__calendar_header",
  role: "row"
}, ku = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
}, xu = ["aria-label"], Tu = /* @__PURE__ */ ue("div", { class: "dp__calendar_header_separator" }, null, -1), Pu = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
}, Ou = { class: "dp__cell_inner" }, Du = ["id", "aria-pressed", "aria-disabled", "aria-label", "data-test", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"], Mu = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...Pt
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, { buildMultiLevelMatrix: l } = Wt(), {
      defaultedTransitions: o,
      defaultedConfig: s,
      defaultedAriaLabels: u,
      defaultedMultiCalendars: h,
      defaultedWeekNumbers: f,
      defaultedMultiDates: p,
      defaultedUI: v
    } = qe(r), g = K(null), $ = K({
      bottom: "",
      left: "",
      transform: ""
    }), P = K([]), U = K(null), V = K(!0), B = K(""), O = K({ startX: 0, endX: 0, startY: 0, endY: 0 }), H = K([]), re = K({ left: "50%" }), Y = K(!1), T = X(() => r.calendar ? r.calendar(r.mappedDates) : r.mappedDates), G = X(() => r.dayNames ? Array.isArray(r.dayNames) ? r.dayNames : r.dayNames(r.locale, +r.weekStart) : oi(r.formatLocale, r.locale, +r.weekStart));
    ot(() => {
      n("mount", { cmp: "calendar", refs: P }), s.value.noSwipe || U.value && (U.value.addEventListener("touchstart", ne, { passive: !1 }), U.value.addEventListener("touchend", ye, { passive: !1 }), U.value.addEventListener("touchmove", y, { passive: !1 })), r.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", M, { passive: !1 });
    });
    const q = (A) => A ? r.vertical ? "vNext" : "next" : r.vertical ? "vPrevious" : "previous", F = (A, Z) => {
      if (r.transitions) {
        const d = dt(Ct(Q(), r.month, r.year));
        B.value = He(dt(Ct(Q(), A, Z)), d) ? o.value[q(!0)] : o.value[q(!1)], V.value = !1, mt(() => {
          V.value = !0;
        });
      }
    }, ie = X(
      () => ({
        ...v.value.calendar ?? {}
      })
    ), fe = X(() => (A) => {
      const Z = ii(A);
      return {
        dp__marker_dot: Z.type === "dot",
        dp__marker_line: Z.type === "line"
      };
    }), he = X(() => (A) => Oe(A, g.value)), _ = X(() => ({
      dp__calendar: !0,
      dp__calendar_next: h.value.count > 0 && r.instance !== 0
    })), S = X(() => (A) => r.hideOffsetDates ? A.current : !0), k = async (A, Z) => {
      const { width: d, height: W } = A.getBoundingClientRect();
      g.value = Z.value;
      let ee = { left: `${d / 2}px` }, C = -50;
      if (await mt(), H.value[0]) {
        const { left: _e, width: D } = H.value[0].getBoundingClientRect();
        _e < 0 && (ee = { left: "0" }, C = 0, re.value.left = `${d / 2}px`), window.innerWidth < _e + D && (ee = { right: "0" }, C = 0, re.value.left = `${D - d / 2}px`);
      }
      $.value = {
        bottom: `${W}px`,
        ...ee,
        transform: `translateX(${C}%)`
      };
    }, E = async (A, Z, d) => {
      var W, ee, C;
      const _e = Xe(P.value[Z][d]);
      _e && ((W = A.marker) != null && W.customPosition && (C = (ee = A.marker) == null ? void 0 : ee.tooltip) != null && C.length ? $.value = A.marker.customPosition(_e) : await k(_e, A), n("tooltip-open", A.marker));
    }, se = async (A, Z, d) => {
      var W, ee;
      if (Y.value && p.value.enabled && p.value.dragSelect)
        return n("select-date", A);
      n("set-hover-date", A), (ee = (W = A.marker) == null ? void 0 : W.tooltip) != null && ee.length && await E(A, Z, d);
    }, N = (A) => {
      g.value && (g.value = null, $.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), n("tooltip-close", A.marker));
    }, ne = (A) => {
      O.value.startX = A.changedTouches[0].screenX, O.value.startY = A.changedTouches[0].screenY;
    }, ye = (A) => {
      O.value.endX = A.changedTouches[0].screenX, O.value.endY = A.changedTouches[0].screenY, b();
    }, y = (A) => {
      r.vertical && !r.inline && A.preventDefault();
    }, b = () => {
      const A = r.vertical ? "Y" : "X";
      Math.abs(O.value[`start${A}`] - O.value[`end${A}`]) > 10 && n("handle-swipe", O.value[`start${A}`] > O.value[`end${A}`] ? "right" : "left");
    }, i = (A, Z, d) => {
      A && (Array.isArray(P.value[Z]) ? P.value[Z][d] = A : P.value[Z] = [A]), r.arrowNavigation && l(P.value, "calendar");
    }, M = (A) => {
      r.monthChangeOnScroll && (A.preventDefault(), n("handle-scroll", A));
    }, L = (A) => f.value.type === "local" ? Mn(A.value, { weekStartsOn: +r.weekStart }) : f.value.type === "iso" ? On(A.value) : typeof f.value.type == "function" ? f.value.type(A.value) : "", c = (A) => {
      const Z = A[0];
      return f.value.hideOnOffsetDates ? A.some((d) => d.current) ? L(Z) : "" : L(Z);
    }, le = (A, Z, d = !0) => {
      d && sr() || !d && !sr() || p.value.enabled || (Vt(A, s.value), n("select-date", Z));
    }, ge = (A) => {
      Vt(A, s.value);
    }, Ge = (A) => {
      p.value.enabled && p.value.dragSelect ? (Y.value = !0, n("select-date", A)) : p.value.enabled && n("select-date", A);
    };
    return a({ triggerTransition: F }), (A, Z) => (w(), I("div", {
      class: ke(_.value)
    }, [
      ue("div", {
        ref_key: "calendarWrapRef",
        ref: U,
        class: ke(ie.value),
        role: "grid"
      }, [
        ue("div", _u, [
          A.weekNumbers ? (w(), I("div", ku, De(A.weekNumName), 1)) : j("", !0),
          (w(!0), I(xe, null, Fe(G.value, (d, W) => {
            var ee, C;
            return w(), I("div", {
              key: W,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test": "calendar-header",
              "aria-label": (C = (ee = m(u)) == null ? void 0 : ee.weekDay) == null ? void 0 : C.call(ee, W)
            }, [
              A.$slots["calendar-header"] ? oe(A.$slots, "calendar-header", {
                key: 0,
                day: d,
                index: W
              }) : j("", !0),
              A.$slots["calendar-header"] ? j("", !0) : (w(), I(xe, { key: 1 }, [
                Be(De(d), 1)
              ], 64))
            ], 8, xu);
          }), 128))
        ]),
        Tu,
        Re(fa, {
          name: B.value,
          css: !!A.transitions
        }, {
          default: me(() => [
            V.value ? (w(), I("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: Z[1] || (Z[1] = (d) => Y.value = !1)
            }, [
              (w(!0), I(xe, null, Fe(T.value, (d, W) => (w(), I("div", {
                key: W,
                class: "dp__calendar_row",
                role: "row"
              }, [
                A.weekNumbers ? (w(), I("div", Pu, [
                  ue("div", Ou, De(c(d.days)), 1)
                ])) : j("", !0),
                (w(!0), I(xe, null, Fe(d.days, (ee, C) => {
                  var _e, D, J;
                  return w(), I("div", {
                    id: m(Zr)(ee.value),
                    ref_for: !0,
                    ref: (ce) => i(ce, W, C),
                    key: C + W,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (ee.classData.dp__active_date || ee.classData.dp__range_start || ee.classData.dp__range_start) ?? void 0,
                    "aria-disabled": ee.classData.dp__cell_disabled || void 0,
                    "aria-label": (D = (_e = m(u)) == null ? void 0 : _e.day) == null ? void 0 : D.call(_e, ee),
                    tabindex: "0",
                    "data-test": ee.value,
                    onClick: Zt((ce) => le(ce, ee), ["prevent"]),
                    onTouchend: (ce) => le(ce, ee, !1),
                    onKeydown: (ce) => m(ut)(ce, () => A.$emit("select-date", ee)),
                    onMouseenter: (ce) => se(ee, W, C),
                    onMouseleave: (ce) => N(ee),
                    onMousedown: (ce) => Ge(ee),
                    onMouseup: Z[0] || (Z[0] = (ce) => Y.value = !1)
                  }, [
                    ue("div", {
                      class: ke(["dp__cell_inner", ee.classData])
                    }, [
                      A.$slots.day && S.value(ee) ? oe(A.$slots, "day", {
                        key: 0,
                        day: +ee.text,
                        date: ee.value
                      }) : j("", !0),
                      A.$slots.day ? j("", !0) : (w(), I(xe, { key: 1 }, [
                        Be(De(ee.text), 1)
                      ], 64)),
                      ee.marker && S.value(ee) ? (w(), I(xe, { key: 2 }, [
                        A.$slots.marker ? oe(A.$slots, "marker", {
                          key: 0,
                          marker: ee.marker,
                          day: +ee.text,
                          date: ee.value
                        }) : (w(), I("div", {
                          key: 1,
                          class: ke(fe.value(ee.marker)),
                          style: yt(ee.marker.color ? { backgroundColor: ee.marker.color } : {})
                        }, null, 6))
                      ], 64)) : j("", !0),
                      he.value(ee.value) ? (w(), I("div", {
                        key: 3,
                        ref_for: !0,
                        ref_key: "activeTooltip",
                        ref: H,
                        class: "dp__marker_tooltip",
                        style: yt($.value)
                      }, [
                        (J = ee.marker) != null && J.tooltip ? (w(), I("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: ge
                        }, [
                          (w(!0), I(xe, null, Fe(ee.marker.tooltip, (ce, Te) => (w(), I("div", {
                            key: Te,
                            class: "dp__tooltip_text"
                          }, [
                            A.$slots["marker-tooltip"] ? oe(A.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: ce,
                              day: ee.value
                            }) : j("", !0),
                            A.$slots["marker-tooltip"] ? j("", !0) : (w(), I(xe, { key: 1 }, [
                              ue("div", {
                                class: "dp__tooltip_mark",
                                style: yt(ce.color ? { backgroundColor: ce.color } : {})
                              }, null, 4),
                              ue("div", null, De(ce.text), 1)
                            ], 64))
                          ]))), 128)),
                          ue("div", {
                            class: "dp__arrow_bottom_tp",
                            style: yt(re.value)
                          }, null, 4)
                        ])) : j("", !0)
                      ], 4)) : j("", !0)
                    ], 2)
                  ], 40, Du);
                }), 128))
              ]))), 128))
            ], 32)) : j("", !0)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ], 2)
    ], 2));
  }
}), mr = (e) => Array.isArray(e), Su = (e, a, t, n) => {
  const r = K([]), l = K(/* @__PURE__ */ new Date()), o = K(), s = () => ne(e.isTextInputDate), { modelValue: u, calendars: h, time: f, today: p } = Aa(e, a, s), {
    defaultedMultiCalendars: v,
    defaultedStartTime: g,
    defaultedRange: $,
    defaultedConfig: P,
    defaultedTz: U,
    propDates: V,
    defaultedMultiDates: B
  } = qe(e), { validateMonthYearInRange: O, isDisabled: H, isDateRangeAllowed: re, checkMinMaxRange: Y } = Ht(e), { updateTimeValues: T, getSetDateTime: G, setTime: q, assignStartTime: F, validateTime: ie, disabledTimesConfig: fe } = ol(e, f, u, n), he = X(
    () => (x) => h.value[x] ? h.value[x].month : 0
  ), _ = X(
    () => (x) => h.value[x] ? h.value[x].year : 0
  ), S = (x) => !P.value.keepViewOnOffsetClick || x ? !0 : !o.value, k = (x, ae, R, te = !1) => {
    var de, st;
    S(te) && (h.value[x] || (h.value[x] = { month: 0, year: 0 }), h.value[x].month = or(ae) ? (de = h.value[x]) == null ? void 0 : de.month : ae, h.value[x].year = or(R) ? (st = h.value[x]) == null ? void 0 : st.year : R);
  }, E = () => {
    e.autoApply && a("select-date");
  };
  ot(() => {
    e.shadow || (u.value || (A(), g.value && F(g.value)), ne(!0), e.focusStartDate && e.startDate && A());
  });
  const se = X(() => {
    var x;
    return (x = e.flow) != null && x.length && !e.partialFlow ? e.flowStep === e.flow.length : !0;
  }), N = () => {
    e.autoApply && se.value && a("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : !1);
  }, ne = (x = !1) => {
    if (u.value)
      return Array.isArray(u.value) ? (r.value = u.value, c(x)) : b(u.value, x);
    if (v.value.count && x && !e.startDate)
      return y(Q(), x);
  }, ye = () => Array.isArray(u.value) && $.value.enabled ? Pe(u.value[0]) === Pe(u.value[1] ?? u.value[0]) : !1, y = (x = /* @__PURE__ */ new Date(), ae = !1) => {
    if ((!v.value.count || !v.value.static || ae) && k(0, Pe(x), we(x)), v.value.count && (!v.value.solo || !u.value || ye()))
      for (let R = 1; R < v.value.count; R++) {
        const te = Ce(Q(), { month: he.value(R - 1), year: _.value(R - 1) }), de = wr(te, { months: 1 });
        h.value[R] = { month: Pe(de), year: we(de) };
      }
  }, b = (x, ae) => {
    y(x), q("hours", Ft(x)), q("minutes", jt(x)), q("seconds", ia(x)), v.value.count && ae && Ge();
  }, i = (x) => {
    if (v.value.count) {
      if (v.value.solo)
        return 0;
      const ae = Pe(x[0]), R = Pe(x[1]);
      return Math.abs(R - ae) < v.value.count ? 0 : 1;
    }
    return 1;
  }, M = (x, ae) => {
    x[1] && $.value.showLastInRange ? y(x[i(x)], ae) : y(x[0], ae);
    const R = (te, de) => [
      te(x[0]),
      x[1] ? te(x[1]) : f[de][1]
    ];
    q("hours", R(Ft, "hours")), q("minutes", R(jt, "minutes")), q("seconds", R(ia, "seconds"));
  }, L = (x, ae) => {
    if (($.value.enabled || e.weekPicker) && !B.value.enabled)
      return M(x, ae);
    if (B.value.enabled && ae) {
      const R = x[x.length - 1];
      return b(R, ae);
    }
  }, c = (x) => {
    const ae = u.value;
    L(ae, x), v.value.count && v.value.solo && Ge();
  }, le = (x, ae) => {
    const R = Ce(Q(), { month: he.value(ae), year: _.value(ae) }), te = x < 0 ? xt(R, 1) : da(R, 1);
    O(Pe(te), we(te), x < 0, e.preventMinMaxNavigation) && (k(ae, Pe(te), we(te)), a("update-month-year", { instance: ae, month: Pe(te), year: we(te) }), v.value.count && !v.value.solo && ge(ae), t());
  }, ge = (x) => {
    for (let ae = x - 1; ae >= 0; ae--) {
      const R = da(Ce(Q(), { month: he.value(ae + 1), year: _.value(ae + 1) }), 1);
      k(ae, Pe(R), we(R));
    }
    for (let ae = x + 1; ae <= v.value.count - 1; ae++) {
      const R = xt(Ce(Q(), { month: he.value(ae - 1), year: _.value(ae - 1) }), 1);
      k(ae, Pe(R), we(R));
    }
  }, Ge = () => {
    if (Array.isArray(u.value) && u.value.length === 2) {
      const x = Q(
        Q(u.value[1] ? u.value[1] : xt(u.value[0], 1))
      ), [ae, R] = [Pe(u.value[0]), we(u.value[0])], [te, de] = [Pe(u.value[1]), we(u.value[1])];
      (ae !== te || ae === te && R !== de) && v.value.solo && k(1, Pe(x), we(x));
    } else
      u.value && !Array.isArray(u.value) && (k(0, Pe(u.value), we(u.value)), y(Q()));
  }, A = () => {
    e.startDate && (k(0, Pe(Q(e.startDate)), we(Q(e.startDate))), v.value.count && ge(0));
  }, Z = (x, ae) => {
    if (e.monthChangeOnScroll) {
      const R = (/* @__PURE__ */ new Date()).getTime() - l.value.getTime(), te = Math.abs(x.deltaY);
      let de = 500;
      te > 1 && (de = 100), te > 100 && (de = 0), R > de && (l.value = /* @__PURE__ */ new Date(), le(e.monthChangeOnScroll !== "inverse" ? -x.deltaY : x.deltaY, ae));
    }
  }, d = (x, ae, R = !1) => {
    e.monthChangeOnArrows && e.vertical === R && W(x, ae);
  }, W = (x, ae) => {
    le(x === "right" ? -1 : 1, ae);
  }, ee = (x) => {
    if (V.value.markers)
      return Va(x.value, V.value.markers);
  }, C = (x, ae) => {
    switch (e.sixWeeks === !0 ? "append" : e.sixWeeks) {
      case "prepend":
        return [!0, !1];
      case "center":
        return [x == 0, !0];
      case "fair":
        return [x == 0 || ae > x, !0];
      case "append":
        return [!1, !1];
      default:
        return [!1, !1];
    }
  }, _e = (x, ae, R, te) => {
    if (e.sixWeeks && x.length < 6) {
      const de = 6 - x.length, st = (ae.getDay() + 7 - te) % 7, vt = 6 - (R.getDay() + 7 - te) % 7, [zt, Ca] = C(st, vt);
      for (let ya = 1; ya <= de; ya++)
        if (Ca ? !!(ya % 2) == zt : zt) {
          const It = x[0].days[0], an = D(wt(It.value, -7), Pe(ae));
          x.unshift({ days: an });
        } else {
          const It = x[x.length - 1], an = It.days[It.days.length - 1], kl = D(wt(an.value, 1), Pe(ae));
          x.push({ days: kl });
        }
    }
    return x;
  }, D = (x, ae) => {
    const R = Q(x), te = [];
    for (let de = 0; de < 7; de++) {
      const st = wt(R, de), vt = Pe(st) !== ae;
      te.push({
        text: e.hideOffsetDates && vt ? "" : st.getDate(),
        value: st,
        current: !vt,
        classData: {}
      });
    }
    return te;
  }, J = (x, ae) => {
    const R = [], te = new Date(ae, x), de = new Date(ae, x + 1, 0), st = e.weekStart, vt = Tt(te, { weekStartsOn: st }), zt = (Ca) => {
      const ya = D(Ca, x);
      if (R.push({ days: ya }), !R[R.length - 1].days.some(
        (It) => Oe(dt(It.value), dt(de))
      )) {
        const It = wt(Ca, 7);
        zt(It);
      }
    };
    return zt(vt), _e(R, te, de, st);
  }, ce = (x) => {
    const ae = Bt(Q(x.value), f.hours, f.minutes, ft());
    a("date-update", ae), B.value.enabled ? Vn(ae, u, B.value.limit) : u.value = ae, n(), mt().then(() => {
      N();
    });
  }, Te = (x) => $.value.noDisabledRange ? Qr(r.value[0], x).some((ae) => H(ae)) : !1, ht = () => {
    r.value = u.value ? u.value.slice() : [], r.value.length === 2 && !($.value.fixedStart || $.value.fixedEnd) && (r.value = []);
  }, ve = (x, ae) => {
    const R = [
      Q(x.value),
      wt(Q(x.value), +$.value.autoRange)
    ];
    re(R) ? (ae && Nt(x.value), r.value = R) : a("invalid-date", x.value);
  }, Nt = (x) => {
    const ae = Pe(Q(x)), R = we(Q(x));
    if (k(0, ae, R), v.value.count > 0)
      for (let te = 1; te < v.value.count; te++) {
        const de = hi(
          Ce(Q(x), { year: _.value(te - 1), month: he.value(te - 1) })
        );
        k(te, de.month, de.year);
      }
  }, Ot = (x) => {
    if (Te(x.value) || !Y(x.value, u.value, $.value.fixedStart ? 0 : 1))
      return a("invalid-date", x.value);
    r.value = nl(Q(x.value), u, a, $);
  }, ha = (x, ae) => {
    if (ht(), $.value.autoRange)
      return ve(x, ae);
    if ($.value.fixedStart || $.value.fixedEnd)
      return Ot(x);
    r.value[0] ? Y(Q(x.value), u.value) && !Te(x.value) ? Ve(Q(x.value), Q(r.value[0])) ? (r.value.unshift(Q(x.value)), a("range-end", r.value[0])) : (r.value[1] = Q(x.value), a("range-end", r.value[1])) : (e.autoApply && a("auto-apply-invalid", x.value), a("invalid-date", x.value)) : (r.value[0] = Q(x.value), a("range-start", r.value[0]));
  }, ft = (x = !0) => e.enableSeconds ? Array.isArray(f.seconds) ? x ? f.seconds[0] : f.seconds[1] : f.seconds : 0, va = (x) => {
    r.value[x] = Bt(
      r.value[x],
      f.hours[x],
      f.minutes[x],
      ft(x !== 1)
    );
  }, Ga = () => {
    var x, ae;
    r.value[0] && r.value[1] && +((x = r.value) == null ? void 0 : x[0]) > +((ae = r.value) == null ? void 0 : ae[1]) && (r.value.reverse(), a("range-start", r.value[0]), a("range-end", r.value[1]));
  }, Ra = () => {
    r.value.length && (r.value[0] && !r.value[1] ? va(0) : (va(0), va(1), n()), Ga(), u.value = r.value.slice(), Ua(r.value, a, e.autoApply, e.modelAuto));
  }, Ka = (x, ae = !1) => {
    if (H(x.value) || !x.current && e.hideOffsetDates)
      return a("invalid-date", x.value);
    if (o.value = JSON.parse(JSON.stringify(x)), !$.value.enabled)
      return ce(x);
    mr(f.hours) && mr(f.minutes) && !B.value.enabled && (ha(x, ae), Ra());
  }, Xa = (x, ae) => {
    var R;
    k(x, ae.month, ae.year, !0), v.value.count && !v.value.solo && ge(x), a("update-month-year", { instance: x, month: ae.month, year: ae.year }), t(v.value.solo ? x : void 0);
    const te = (R = e.flow) != null && R.length ? e.flow[e.flowStep] : void 0;
    !ae.fromNav && (te === lt.month || te === lt.year) && n();
  }, Ja = (x, ae) => {
    al({
      value: x,
      modelValue: u,
      range: $.value.enabled,
      timezone: ae ? void 0 : U.value.timezone
    }), E(), e.multiCalendars && mt().then(() => ne(!0));
  }, Za = () => {
    const x = Nn(Q(), U.value);
    $.value.enabled ? u.value && Array.isArray(u.value) && u.value[0] ? u.value = Ve(x, u.value[0]) ? [x, u.value[0]] : [u.value[0], x] : u.value = [x] : u.value = x, E();
  }, en = () => {
    if (Array.isArray(u.value))
      if (B.value.enabled) {
        const x = tn();
        u.value[u.value.length - 1] = G(x);
      } else
        u.value = u.value.map((x, ae) => x && G(x, ae));
    else
      u.value = G(u.value);
    a("time-update");
  }, tn = () => Array.isArray(u.value) && u.value.length ? u.value[u.value.length - 1] : null;
  return {
    calendars: h,
    modelValue: u,
    month: he,
    year: _,
    time: f,
    disabledTimesConfig: fe,
    today: p,
    validateTime: ie,
    getCalendarDays: J,
    getMarker: ee,
    handleScroll: Z,
    handleSwipe: W,
    handleArrow: d,
    selectDate: Ka,
    updateMonthYear: Xa,
    presetDate: Ja,
    selectCurrentDate: Za,
    updateTime: (x, ae = !0, R = !1) => {
      T(x, ae, R, en);
    },
    assignMonthAndYear: y
  };
}, Au = { key: 0 }, $u = /* @__PURE__ */ Je({
  __name: "DatePicker",
  props: {
    ...Pt
  },
  emits: [
    "tooltip-open",
    "tooltip-close",
    "mount",
    "update:internal-model-value",
    "update-flow-step",
    "reset-flow",
    "auto-apply",
    "focus-menu",
    "select-date",
    "range-start",
    "range-end",
    "invalid-fixed-range",
    "time-update",
    "am-pm-change",
    "time-picker-open",
    "time-picker-close",
    "recalculate-position",
    "update-month-year",
    "auto-apply-invalid",
    "date-update",
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, {
      calendars: l,
      month: o,
      year: s,
      modelValue: u,
      time: h,
      disabledTimesConfig: f,
      today: p,
      validateTime: v,
      getCalendarDays: g,
      getMarker: $,
      handleArrow: P,
      handleScroll: U,
      handleSwipe: V,
      selectDate: B,
      updateMonthYear: O,
      presetDate: H,
      selectCurrentDate: re,
      updateTime: Y,
      assignMonthAndYear: T
    } = Su(r, n, ye, y), G = ea(), { setHoverDate: q, getDayClassData: F, clearHoverDate: ie } = Qu(u, r), { defaultedMultiCalendars: fe } = qe(r), he = K([]), _ = K([]), S = K(null), k = pt(G, "calendar"), E = pt(G, "monthYear"), se = pt(G, "timePicker"), N = (Z) => {
      r.shadow || n("mount", Z);
    };
    gt(
      l,
      () => {
        r.shadow || setTimeout(() => {
          n("recalculate-position");
        }, 0);
      },
      { deep: !0 }
    ), gt(
      fe,
      (Z, d) => {
        Z.count - d.count > 0 && T();
      },
      { deep: !0 }
    );
    const ne = X(() => (Z) => g(o.value(Z), s.value(Z)).map((d) => ({
      ...d,
      days: d.days.map((W) => (W.marker = $(W), W.classData = F(W), W))
    })));
    function ye(Z) {
      var d;
      Z || Z === 0 ? (d = _.value[Z]) == null || d.triggerTransition(o.value(Z), s.value(Z)) : _.value.forEach((W, ee) => W.triggerTransition(o.value(ee), s.value(ee)));
    }
    function y() {
      n("update-flow-step");
    }
    const b = (Z, d = !1) => {
      B(Z, d), r.spaceConfirm && n("select-date");
    }, i = (Z, d, W = 0) => {
      var ee;
      (ee = he.value[W]) == null || ee.toggleMonthPicker(Z, d);
    }, M = (Z, d, W = 0) => {
      var ee;
      (ee = he.value[W]) == null || ee.toggleYearPicker(Z, d);
    }, L = (Z, d, W) => {
      var ee;
      (ee = S.value) == null || ee.toggleTimePicker(Z, d, W);
    }, c = (Z, d) => {
      var W;
      if (!r.range) {
        const ee = u.value ? u.value : p, C = d ? new Date(d) : ee, _e = Z ? Tt(C, { weekStartsOn: 1 }) : Mr(C, { weekStartsOn: 1 });
        B({
          value: _e,
          current: Pe(C) === o.value(0),
          text: "",
          classData: {}
        }), (W = document.getElementById(Zr(_e))) == null || W.focus();
      }
    }, le = (Z) => {
      var d;
      (d = he.value[0]) == null || d.handleMonthYearChange(Z, !0);
    }, ge = (Z) => {
      O(0, { month: o.value(0), year: s.value(0) + (Z ? 1 : -1), fromNav: !0 });
    }, Ge = (Z, d) => {
      Z === lt.time && n(`time-picker-${d ? "open" : "close"}`), n("overlay-toggle", { open: d, overlay: Z });
    }, A = (Z) => {
      n("overlay-toggle", { open: !1, overlay: Z }), n("focus-menu");
    };
    return a({
      clearHoverDate: ie,
      presetDate: H,
      selectCurrentDate: re,
      toggleMonthPicker: i,
      toggleYearPicker: M,
      toggleTimePicker: L,
      handleArrow: P,
      updateMonthYear: O,
      getSidebarProps: () => ({
        modelValue: u,
        month: o,
        year: s,
        time: h,
        updateTime: Y,
        updateMonthYear: O,
        selectDate: B,
        presetDate: H
      }),
      changeMonth: le,
      changeYear: ge,
      selectWeekDate: c
    }), (Z, d) => (w(), I(xe, null, [
      Re(za, {
        "multi-calendars": m(fe).count,
        collapse: Z.collapse
      }, {
        default: me(({ instance: W, index: ee }) => [
          Z.disableMonthYearSelect ? j("", !0) : (w(), be(wu, Ee({
            key: 0,
            ref: (C) => {
              C && (he.value[ee] = C);
            },
            months: m(Br)(Z.formatLocale, Z.locale, Z.monthNameFormat),
            years: m(In)(Z.yearRange, Z.locale, Z.reverseYears),
            month: m(o)(W),
            year: m(s)(W),
            instance: W
          }, Z.$props, {
            onMount: d[0] || (d[0] = (C) => N(m(Xt).header)),
            onResetFlow: d[1] || (d[1] = (C) => Z.$emit("reset-flow")),
            onUpdateMonthYear: (C) => m(O)(W, C),
            onOverlayClosed: A,
            onOverlayOpened: d[2] || (d[2] = (C) => Z.$emit("overlay-toggle", { open: !0, overlay: C }))
          }), nt({ _: 2 }, [
            Fe(m(E), (C, _e) => ({
              name: C,
              fn: me((D) => [
                oe(Z.$slots, C, ze(tt(D)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          Re(Mu, Ee({
            ref: (C) => {
              C && (_.value[ee] = C);
            },
            "mapped-dates": ne.value(W),
            month: m(o)(W),
            year: m(s)(W),
            instance: W
          }, Z.$props, {
            onSelectDate: (C) => m(B)(C, W !== 1),
            onHandleSpace: (C) => b(C, W !== 1),
            onSetHoverDate: d[3] || (d[3] = (C) => m(q)(C)),
            onHandleScroll: (C) => m(U)(C, W),
            onHandleSwipe: (C) => m(V)(C, W),
            onMount: d[4] || (d[4] = (C) => N(m(Xt).calendar)),
            onResetFlow: d[5] || (d[5] = (C) => Z.$emit("reset-flow")),
            onTooltipOpen: d[6] || (d[6] = (C) => Z.$emit("tooltip-open", C)),
            onTooltipClose: d[7] || (d[7] = (C) => Z.$emit("tooltip-close", C))
          }), nt({ _: 2 }, [
            Fe(m(k), (C, _e) => ({
              name: C,
              fn: me((D) => [
                oe(Z.$slots, C, ze(tt({ ...D })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      Z.enableTimePicker ? (w(), I("div", Au, [
        Z.$slots["time-picker"] ? oe(Z.$slots, "time-picker", ze(Ee({ key: 0 }, { time: m(h), updateTime: m(Y) }))) : (w(), be(ll, Ee({
          key: 1,
          ref_key: "timePickerRef",
          ref: S
        }, Z.$props, {
          hours: m(h).hours,
          minutes: m(h).minutes,
          seconds: m(h).seconds,
          "internal-model-value": Z.internalModelValue,
          "disabled-times-config": m(f),
          "validate-time": m(v),
          onMount: d[8] || (d[8] = (W) => N(m(Xt).timePicker)),
          "onUpdate:hours": d[9] || (d[9] = (W) => m(Y)(W)),
          "onUpdate:minutes": d[10] || (d[10] = (W) => m(Y)(W, !1)),
          "onUpdate:seconds": d[11] || (d[11] = (W) => m(Y)(W, !1, !0)),
          onResetFlow: d[12] || (d[12] = (W) => Z.$emit("reset-flow")),
          onOverlayClosed: d[13] || (d[13] = (W) => Ge(W, !1)),
          onOverlayOpened: d[14] || (d[14] = (W) => Ge(W, !0)),
          onAmPmChange: d[15] || (d[15] = (W) => Z.$emit("am-pm-change", W))
        }), nt({ _: 2 }, [
          Fe(m(se), (W, ee) => ({
            name: W,
            fn: me((C) => [
              oe(Z.$slots, W, ze(tt(C)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : j("", !0)
    ], 64));
  }
}), Ru = (e, a) => {
  const t = K(), {
    defaultedMultiCalendars: n,
    defaultedConfig: r,
    defaultedHighlight: l,
    defaultedRange: o,
    propDates: s,
    defaultedFilters: u,
    defaultedMultiDates: h
  } = qe(e), { modelValue: f, year: p, month: v, calendars: g } = Aa(e, a), { isDisabled: $ } = Ht(e), { selectYear: P, groupedYears: U, showYearPicker: V, isDisabled: B, toggleYearPicker: O, handleYearSelect: H, handleYear: re } = rl({
    modelValue: f,
    multiCalendars: n,
    range: o,
    highlight: l,
    calendars: g,
    propDates: s,
    month: v,
    year: p,
    filters: u,
    props: e,
    emit: a
  }), Y = (S, k) => [S, k].map((E) => At(E, "MMMM", { locale: e.formatLocale })).join("-"), T = X(() => (S) => f.value ? Array.isArray(f.value) ? f.value.some((k) => nr(S, k)) : nr(f.value, S) : !1), G = (S) => {
    if (o.value.enabled) {
      if (Array.isArray(f.value)) {
        const k = Oe(S, f.value[0]) || Oe(S, f.value[1]);
        return Wa(f.value, t.value, S) && !k;
      }
      return !1;
    }
    return !1;
  }, q = (S, k) => S.quarter === Xn(k) && S.year === we(k), F = (S) => typeof l.value == "function" ? l.value({ quarter: Xn(S), year: we(S) }) : !!l.value.quarters.find((k) => q(k, S)), ie = X(() => (S) => {
    const k = Ce(/* @__PURE__ */ new Date(), { year: p.value(S) });
    return oo({
      start: Pa(k),
      end: Dr(k)
    }).map((E) => {
      const se = Kt(E), N = Jn(E), ne = $(E), ye = G(se), y = F(se);
      return {
        text: Y(se, N),
        value: se,
        active: T.value(se),
        highlighted: y,
        disabled: ne,
        isBetween: ye
      };
    });
  }), fe = (S) => {
    Vn(S, f, h.value.limit), a("auto-apply", !0);
  }, he = (S) => {
    f.value = Bn(f, S, a), Ua(f.value, a, e.autoApply, e.modelAuto);
  }, _ = (S) => {
    f.value = S, a("auto-apply");
  };
  return {
    defaultedConfig: r,
    defaultedMultiCalendars: n,
    groupedYears: U,
    year: p,
    isDisabled: B,
    quarters: ie,
    showYearPicker: V,
    modelValue: f,
    setHoverDate: (S) => {
      t.value = S;
    },
    selectYear: P,
    selectQuarter: (S, k, E) => {
      if (!E)
        return g.value[k].month = Pe(Jn(S)), h.value.enabled ? fe(S) : o.value.enabled ? he(S) : _(S);
    },
    toggleYearPicker: O,
    handleYearSelect: H,
    handleYear: re
  };
}, Cu = { class: "dp--quarter-items" }, Fu = ["data-test", "disabled", "onClick", "onMouseover"], Yu = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...Pt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end",
    "overlay-toggle",
    "update-month-year"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, l = ea(), o = pt(l, "yearMode"), {
      defaultedMultiCalendars: s,
      defaultedConfig: u,
      groupedYears: h,
      year: f,
      isDisabled: p,
      quarters: v,
      modelValue: g,
      showYearPicker: $,
      setHoverDate: P,
      selectQuarter: U,
      toggleYearPicker: V,
      handleYearSelect: B,
      handleYear: O
    } = Ru(r, n);
    return a({ getSidebarProps: () => ({
      modelValue: g,
      year: f,
      selectQuarter: U,
      handleYearSelect: B,
      handleYear: O
    }) }), (H, re) => (w(), be(za, {
      "multi-calendars": m(s).count,
      collapse: H.collapse,
      stretch: ""
    }, {
      default: me(({ instance: Y }) => [
        ue("div", {
          class: "dp-quarter-picker-wrap",
          style: yt({ minHeight: `${m(u).modeHeight}px` })
        }, [
          H.$slots["top-extra"] ? oe(H.$slots, "top-extra", {
            key: 0,
            value: H.internalModelValue
          }) : j("", !0),
          ue("div", null, [
            Re(tl, Ee(H.$props, {
              items: m(h)(Y),
              instance: Y,
              "show-year-picker": m($)[Y],
              year: m(f)(Y),
              "is-disabled": (T) => m(p)(Y, T),
              onHandleYear: (T) => m(O)(Y, T),
              onYearSelect: (T) => m(B)(T, Y),
              onToggleYearPicker: (T) => m(V)(Y, T == null ? void 0 : T.flow, T == null ? void 0 : T.show)
            }), nt({ _: 2 }, [
              Fe(m(o), (T, G) => ({
                name: T,
                fn: me((q) => [
                  oe(H.$slots, T, ze(tt(q)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          ue("div", Cu, [
            (w(!0), I(xe, null, Fe(m(v)(Y), (T, G) => (w(), I("div", { key: G }, [
              ue("button", {
                type: "button",
                class: ke(["dp--qr-btn", {
                  "dp--qr-btn-active": T.active,
                  "dp--qr-btn-between": T.isBetween,
                  "dp--qr-btn-disabled": T.disabled,
                  "dp--highlighted": T.highlighted
                }]),
                "data-test": T.value,
                disabled: T.disabled,
                onClick: (q) => m(U)(T.value, Y, T.disabled),
                onMouseover: (q) => m(P)(T.value)
              }, [
                H.$slots.quarter ? oe(H.$slots, "quarter", {
                  key: 0,
                  value: T.value,
                  text: T.text
                }) : (w(), I(xe, { key: 1 }, [
                  Be(De(T.text), 1)
                ], 64))
              ], 42, Fu)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
}), Nu = ["id", "tabindex", "role", "aria-label"], Iu = {
  key: 0,
  class: "dp--menu-load-container"
}, Eu = /* @__PURE__ */ ue("span", { class: "dp--menu-loader" }, null, -1), qu = [
  Eu
], Lu = {
  key: 1,
  class: "dp--menu-header"
}, Vu = {
  key: 0,
  class: "dp__sidebar_left"
}, Bu = ["data-test", "onClick", "onKeydown"], ju = {
  key: 2,
  class: "dp__sidebar_right"
}, Wu = {
  key: 3,
  class: "dp__action_extra"
}, fr = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...Ha,
    shadow: { type: Boolean, default: !1 },
    openOnTop: { type: Boolean, default: !1 },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: !1 },
    collapse: { type: Boolean, default: !1 },
    getInputRect: { type: Function, default: () => ({}) },
    isTextInputDate: { type: Boolean, default: !1 }
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "auto-apply-invalid",
    "date-update",
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, l = K(null), o = X(() => {
      const { openOnTop: D, ...J } = r;
      return {
        ...J,
        flowStep: q.value,
        collapse: r.collapse,
        noOverlayFocus: r.noOverlayFocus,
        menuWrapRef: l.value
      };
    }), { setMenuFocused: s, setShiftKey: u, control: h } = el(), f = ea(), { defaultedTextInput: p, defaultedInline: v, defaultedConfig: g, defaultedUI: $ } = qe(r), P = K(null), U = K(0), V = K(null), B = K(!1), O = K(null);
    ot(() => {
      if (!r.shadow) {
        B.value = !0, H(), window.addEventListener("resize", H);
        const D = Xe(l);
        if (D && !p.value.enabled && !v.value.enabled && (s(!0), k()), D) {
          const J = (ce) => {
            g.value.allowPreventDefault && ce.preventDefault(), Vt(ce, g.value, !0);
          };
          D.addEventListener("pointerdown", J), D.addEventListener("mousedown", J);
        }
      }
    }), Ba(() => {
      window.removeEventListener("resize", H);
    });
    const H = () => {
      const D = Xe(V);
      D && (U.value = D.getBoundingClientRect().width);
    }, { arrowRight: re, arrowLeft: Y, arrowDown: T, arrowUp: G } = Wt(), { flowStep: q, updateFlowStep: F, childMount: ie, resetFlow: fe, handleFlow: he } = Gu(r, n, O), _ = X(() => r.monthPicker ? Gi : r.yearPicker ? Xi : r.timePicker ? pu : r.quarterPicker ? Yu : $u), S = X(() => {
      var D;
      if (g.value.arrowLeft)
        return g.value.arrowLeft;
      const J = (D = l.value) == null ? void 0 : D.getBoundingClientRect(), ce = r.getInputRect();
      return (ce == null ? void 0 : ce.width) < (U == null ? void 0 : U.value) && (ce == null ? void 0 : ce.left) <= ((J == null ? void 0 : J.left) ?? 0) ? `${(ce == null ? void 0 : ce.width) / 2}px` : (ce == null ? void 0 : ce.right) >= ((J == null ? void 0 : J.right) ?? 0) && (ce == null ? void 0 : ce.width) < (U == null ? void 0 : U.value) ? `${(U == null ? void 0 : U.value) - (ce == null ? void 0 : ce.width) / 2}px` : "50%";
    }), k = () => {
      const D = Xe(l);
      D && D.focus({ preventScroll: !0 });
    }, E = X(() => {
      var D;
      return ((D = O.value) == null ? void 0 : D.getSidebarProps()) || {};
    }), se = () => {
      r.openOnTop && n("recalculate-position");
    }, N = pt(f, "action"), ne = X(() => r.monthPicker || r.yearPicker ? pt(f, "monthYear") : r.timePicker ? pt(f, "timePicker") : pt(f, "shared")), ye = X(() => r.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), y = X(() => ({
      dp__menu_disabled: r.disabled,
      dp__menu_readonly: r.readonly,
      "dp-menu-loading": r.loading
    })), b = X(
      () => ({
        dp__menu: !0,
        dp__menu_index: !v.value.enabled,
        dp__relative: v.value.enabled,
        ...$.value.menu ?? {}
      })
    ), i = (D) => {
      Vt(D, g.value, !0);
    }, M = () => {
      r.escClose && n("close-picker");
    }, L = (D) => {
      if (r.arrowNavigation) {
        if (D === it.up)
          return G();
        if (D === it.down)
          return T();
        if (D === it.left)
          return Y();
        if (D === it.right)
          return re();
      } else
        D === it.left || D === it.up ? A("handleArrow", it.left, 0, D === it.up) : A("handleArrow", it.right, 0, D === it.down);
    }, c = (D) => {
      u(D.shiftKey), !r.disableMonthYearSelect && D.code === Ie.tab && D.target.classList.contains("dp__menu") && h.value.shiftKeyInMenu && (D.preventDefault(), Vt(D, g.value, !0), n("close-picker"));
    }, le = () => {
      k(), n("time-picker-close");
    }, ge = (D) => {
      var J, ce, Te;
      (J = O.value) == null || J.toggleTimePicker(!1, !1), (ce = O.value) == null || ce.toggleMonthPicker(!1, !1, D), (Te = O.value) == null || Te.toggleYearPicker(!1, !1, D);
    }, Ge = (D, J = 0) => {
      var ce, Te, ht;
      return D === "month" ? (ce = O.value) == null ? void 0 : ce.toggleMonthPicker(!1, !0, J) : D === "year" ? (Te = O.value) == null ? void 0 : Te.toggleYearPicker(!1, !0, J) : D === "time" ? (ht = O.value) == null ? void 0 : ht.toggleTimePicker(!0, !1) : ge(J);
    }, A = (D, ...J) => {
      var ce, Te;
      (ce = O.value) != null && ce[D] && ((Te = O.value) == null || Te[D](...J));
    }, Z = () => {
      A("selectCurrentDate");
    }, d = (D, J) => {
      A("presetDate", D, J);
    }, W = () => {
      A("clearHoverDate");
    }, ee = (D, J) => {
      A("updateMonthYear", D, J);
    }, C = (D, J) => {
      D.preventDefault(), L(J);
    }, _e = (D) => {
      var J, ce, Te;
      if (c(D), D.key === Ie.home || D.key === Ie.end)
        return A(
          "selectWeekDate",
          D.key === Ie.home,
          D.target.getAttribute("id")
        );
      switch ((D.key === Ie.pageUp || D.key === Ie.pageDown) && (D.shiftKey ? (A("changeYear", D.key === Ie.pageUp), (J = wn(l.value, "overlay-year")) == null || J.focus()) : (A("changeMonth", D.key === Ie.pageUp), (ce = wn(l.value, D.key === Ie.pageUp ? "action-prev" : "action-next")) == null || ce.focus()), D.target.getAttribute("id") && ((Te = l.value) == null || Te.focus({ preventScroll: !0 }))), D.key) {
        case Ie.esc:
          return M();
        case Ie.arrowLeft:
          return C(D, it.left);
        case Ie.arrowRight:
          return C(D, it.right);
        case Ie.arrowUp:
          return C(D, it.up);
        case Ie.arrowDown:
          return C(D, it.down);
        default:
          return;
      }
    };
    return a({
      updateMonthYear: ee,
      switchView: Ge,
      handleFlow: he
    }), (D, J) => {
      var ce, Te, ht;
      return w(), I("div", {
        id: D.uid ? `dp-menu-${D.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: l,
        tabindex: m(v).enabled ? void 0 : "0",
        role: m(v).enabled ? void 0 : "dialog",
        "aria-label": (ce = D.ariaLabels) == null ? void 0 : ce.menu,
        class: ke(b.value),
        style: yt({ "--dp-arrow-left": S.value }),
        onMouseleave: W,
        onClick: i,
        onKeydown: _e
      }, [
        (D.disabled || D.readonly) && m(v).enabled || D.loading ? (w(), I("div", {
          key: 0,
          class: ke(y.value)
        }, [
          D.loading ? (w(), I("div", Iu, qu)) : j("", !0)
        ], 2)) : j("", !0),
        D.$slots["menu-header"] ? (w(), I("div", Lu, [
          oe(D.$slots, "menu-header")
        ])) : j("", !0),
        !m(v).enabled && !D.teleportCenter ? (w(), I("div", {
          key: 2,
          class: ke(ye.value)
        }, null, 2)) : j("", !0),
        ue("div", {
          ref_key: "innerMenuRef",
          ref: V,
          class: ke({
            dp__menu_content_wrapper: ((Te = D.presetDates) == null ? void 0 : Te.length) || !!D.$slots["left-sidebar"] || !!D.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((ht = D.presetDates) == null ? void 0 : ht.length) || !!D.$slots["left-sidebar"] || !!D.$slots["right-sidebar"])
          }),
          style: yt({ "--dp-menu-width": `${U.value}px` })
        }, [
          D.$slots["left-sidebar"] ? (w(), I("div", Vu, [
            oe(D.$slots, "left-sidebar", ze(tt(E.value)))
          ])) : j("", !0),
          D.presetDates.length ? (w(), I("div", {
            key: 1,
            class: ke({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": !0 })
          }, [
            (w(!0), I(xe, null, Fe(D.presetDates, (ve, Nt) => (w(), I(xe, { key: Nt }, [
              ve.slot ? oe(D.$slots, ve.slot, {
                key: 0,
                presetDate: d,
                label: ve.label,
                value: ve.value
              }) : (w(), I("button", {
                key: 1,
                type: "button",
                style: yt(ve.style || {}),
                class: ke(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": ve.testId ?? void 0,
                onClick: Zt((Ot) => d(ve.value, ve.noTz), ["prevent"]),
                onKeydown: (Ot) => m(ut)(Ot, () => d(ve.value, ve.noTz), !0)
              }, De(ve.label), 47, Bu))
            ], 64))), 128))
          ], 2)) : j("", !0),
          ue("div", {
            ref_key: "calendarWrapperRef",
            ref: P,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (w(), be(ja(_.value), Ee({
              ref_key: "dynCmpRef",
              ref: O
            }, o.value, {
              "flow-step": m(q),
              onMount: m(ie),
              onUpdateFlowStep: m(F),
              onResetFlow: m(fe),
              onFocusMenu: k,
              onSelectDate: J[0] || (J[0] = (ve) => D.$emit("select-date")),
              onDateUpdate: J[1] || (J[1] = (ve) => D.$emit("date-update", ve)),
              onTooltipOpen: J[2] || (J[2] = (ve) => D.$emit("tooltip-open", ve)),
              onTooltipClose: J[3] || (J[3] = (ve) => D.$emit("tooltip-close", ve)),
              onAutoApply: J[4] || (J[4] = (ve) => D.$emit("auto-apply", ve)),
              onRangeStart: J[5] || (J[5] = (ve) => D.$emit("range-start", ve)),
              onRangeEnd: J[6] || (J[6] = (ve) => D.$emit("range-end", ve)),
              onInvalidFixedRange: J[7] || (J[7] = (ve) => D.$emit("invalid-fixed-range", ve)),
              onTimeUpdate: J[8] || (J[8] = (ve) => D.$emit("time-update")),
              onAmPmChange: J[9] || (J[9] = (ve) => D.$emit("am-pm-change", ve)),
              onTimePickerOpen: J[10] || (J[10] = (ve) => D.$emit("time-picker-open", ve)),
              onTimePickerClose: le,
              onRecalculatePosition: se,
              onUpdateMonthYear: J[11] || (J[11] = (ve) => D.$emit("update-month-year", ve)),
              onAutoApplyInvalid: J[12] || (J[12] = (ve) => D.$emit("auto-apply-invalid", ve)),
              onInvalidDate: J[13] || (J[13] = (ve) => D.$emit("invalid-date", ve)),
              onOverlayToggle: J[14] || (J[14] = (ve) => D.$emit("overlay-toggle", ve)),
              "onUpdate:internalModelValue": J[15] || (J[15] = (ve) => D.$emit("update:internal-model-value", ve))
            }), nt({ _: 2 }, [
              Fe(ne.value, (ve, Nt) => ({
                name: ve,
                fn: me((Ot) => [
                  oe(D.$slots, ve, ze(tt({ ...Ot })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          D.$slots["right-sidebar"] ? (w(), I("div", ju, [
            oe(D.$slots, "right-sidebar", ze(tt(E.value)))
          ])) : j("", !0),
          D.$slots["action-extra"] ? (w(), I("div", Wu, [
            D.$slots["action-extra"] ? oe(D.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: Z
            }) : j("", !0)
          ])) : j("", !0)
        ], 6),
        !D.autoApply || m(g).keepActionRow ? (w(), be(Vi, Ee({
          key: 3,
          "menu-mount": B.value
        }, o.value, {
          "calendar-width": U.value,
          onClosePicker: J[16] || (J[16] = (ve) => D.$emit("close-picker")),
          onSelectDate: J[17] || (J[17] = (ve) => D.$emit("select-date")),
          onInvalidSelect: J[18] || (J[18] = (ve) => D.$emit("invalid-select")),
          onSelectNow: Z
        }), nt({ _: 2 }, [
          Fe(m(N), (ve, Nt) => ({
            name: ve,
            fn: me((Ot) => [
              oe(D.$slots, ve, ze(tt({ ...Ot })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : j("", !0)
      ], 46, Nu);
    };
  }
});
var ra = /* @__PURE__ */ ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(ra || {});
const Hu = ({
  menuRef: e,
  menuRefInner: a,
  inputRef: t,
  pickerWrapperRef: n,
  inline: r,
  emit: l,
  props: o,
  slots: s
}) => {
  const { defaultedConfig: u } = qe(o), h = K({}), f = K(!1), p = K({
    top: "0",
    left: "0"
  }), v = K(!1), g = Ta(o, "teleportCenter");
  gt(g, () => {
    p.value = JSON.parse(JSON.stringify({})), re();
  });
  const $ = (k) => {
    if (o.teleport) {
      const E = k.getBoundingClientRect();
      return {
        left: E.left + window.scrollX,
        top: E.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, P = (k, E) => {
    p.value.left = `${k + E - h.value.width}px`;
  }, U = (k) => {
    p.value.left = `${k}px`;
  }, V = (k, E) => {
    o.position === ra.left && U(k), o.position === ra.right && P(k, E), o.position === ra.center && (p.value.left = `${k + E / 2 - h.value.width / 2}px`);
  }, B = (k) => {
    const { width: E, height: se } = k.getBoundingClientRect(), { top: N, left: ne } = o.altPosition ? o.altPosition(k) : $(k);
    return { top: +N, left: +ne, width: E, height: se };
  }, O = () => {
    p.value.left = "50%", p.value.top = "50%", p.value.transform = "translate(-50%, -50%)", p.value.position = "fixed", delete p.value.opacity;
  }, H = () => {
    const k = Xe(t), { top: E, left: se, transform: N } = o.altPosition(k);
    p.value = { top: `${E}px`, left: `${se}px`, transform: N ?? "" };
  }, re = (k = !0) => {
    var E;
    if (!r.value.enabled) {
      if (g.value)
        return O();
      if (o.altPosition !== null)
        return H();
      if (k) {
        const se = o.teleport ? (E = a.value) == null ? void 0 : E.$el : e.value;
        se && (h.value = se.getBoundingClientRect()), l("recalculate-position");
      }
      return fe();
    }
  }, Y = ({ inputEl: k, left: E, width: se }) => {
    window.screen.width > 768 && !f.value && V(E, se), q(k);
  }, T = (k) => {
    const { top: E, left: se, height: N, width: ne } = B(k);
    p.value.top = `${N + E + +o.offset}px`, v.value = !1, f.value || (p.value.left = `${se + ne / 2 - h.value.width / 2}px`), Y({ inputEl: k, left: se, width: ne });
  }, G = (k) => {
    const { top: E, left: se, width: N } = B(k);
    p.value.top = `${E - +o.offset - h.value.height}px`, v.value = !0, Y({ inputEl: k, left: se, width: N });
  }, q = (k) => {
    if (o.autoPosition) {
      const { left: E, width: se } = B(k), { left: N, right: ne } = h.value;
      if (!f.value) {
        if (Math.abs(N) !== Math.abs(ne)) {
          if (N <= 0)
            return f.value = !0, U(E);
          if (ne >= document.documentElement.clientWidth)
            return f.value = !0, P(E, se);
        }
        return V(E, se);
      }
    }
  }, F = () => {
    const k = Xe(t);
    if (k) {
      const { height: E } = h.value, { top: se, height: N } = k.getBoundingClientRect(), ne = window.innerHeight - se - N, ye = se;
      return E <= ne ? Gt.bottom : E > ne && E <= ye ? Gt.top : ne >= ye ? Gt.bottom : Gt.top;
    }
    return Gt.bottom;
  }, ie = (k) => F() === Gt.bottom ? T(k) : G(k), fe = () => {
    const k = Xe(t);
    if (k)
      return o.autoPosition ? ie(k) : T(k);
  }, he = function(k) {
    if (k) {
      const E = k.scrollHeight > k.clientHeight, se = window.getComputedStyle(k).overflowY.indexOf("hidden") !== -1;
      return E && !se;
    }
    return !0;
  }, _ = function(k) {
    return !k || k === document.body || k.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : he(k) ? k : _(
      k.assignedSlot && u.value.shadowDom ? k.assignedSlot.parentNode : k.parentNode
    );
  }, S = (k) => {
    if (k)
      switch (o.position) {
        case ra.left:
          return { left: 0, transform: "translateX(0)" };
        case ra.right:
          return { left: `${k.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${k.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: v,
    menuStyle: p,
    xCorrect: f,
    setMenuPosition: re,
    getScrollableParent: _,
    shadowRender: (k, E) => {
      var se, N, ne;
      const ye = document.createElement("div"), y = (se = Xe(t)) == null ? void 0 : se.getBoundingClientRect();
      ye.setAttribute("id", "dp--temp-container");
      const b = (N = n.value) != null && N.clientWidth ? n.value : document.body;
      b.append(ye);
      const i = S(y), M = u.value.shadowDom ? Object.keys(s).filter(
        (c) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(c)
      ) : Object.keys(s), L = Pl(
        k,
        {
          ...E,
          shadow: !0,
          style: { opacity: 0, position: "absolute", ...i }
        },
        Object.fromEntries(M.map((c) => [c, s[c]]))
      );
      Qn(L, ye), h.value = (ne = L.el) == null ? void 0 : ne.getBoundingClientRect(), Qn(null, ye), b.removeChild(ye);
    }
  };
}, qt = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared", "year-mode"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "year-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay-header", use: ["month-year", "shared"] },
  { name: "year-overlay-header", use: ["month-year", "shared"] },
  { name: "hours-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "hours-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "hours", use: ["calendar", "time", "shared"] },
  { name: "minutes", use: ["calendar", "time", "shared"] },
  { name: "month", use: ["calendar", "month-year", "shared"] },
  { name: "year", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "action-buttons", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar", "shared"] },
  { name: "marker-tooltip", use: ["calendar", "shared"] },
  { name: "action-extra", use: ["menu"] },
  { name: "time-picker-overlay", use: ["calendar", "time", "shared"] },
  { name: "am-pm-button", use: ["calendar", "time", "shared"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year", "shared"] },
  { name: "time-picker", use: ["menu", "shared"] },
  { name: "action-row", use: ["action"] },
  { name: "marker", use: ["calendar", "shared"] },
  { name: "quarter", use: ["shared"] },
  { name: "top-extra", use: ["shared", "month-year"] },
  { name: "tp-inline-arrow-up", use: ["shared", "time"] },
  { name: "tp-inline-arrow-down", use: ["shared", "time"] },
  { name: "menu-header", use: ["menu"] }
], zu = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }], Uu = {
  all: () => qt,
  monthYear: () => qt.filter((e) => e.use.includes("month-year")),
  input: () => zu,
  timePicker: () => qt.filter((e) => e.use.includes("time")),
  action: () => qt.filter((e) => e.use.includes("action")),
  calendar: () => qt.filter((e) => e.use.includes("calendar")),
  menu: () => qt.filter((e) => e.use.includes("menu")),
  shared: () => qt.filter((e) => e.use.includes("shared")),
  yearMode: () => qt.filter((e) => e.use.includes("year-mode"))
}, pt = (e, a, t) => {
  const n = [];
  return Uu[a]().forEach((r) => {
    e[r.name] && n.push(r.name);
  }), t != null && t.length && t.forEach((r) => {
    r.slot && n.push(r.slot);
  }), n;
}, Sa = (e) => {
  const a = X(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), t = X(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: a, showTransition: !!e.value, menuTransition: t };
}, Aa = (e, a, t) => {
  const { defaultedRange: n, defaultedTz: r } = qe(e), l = Q(ct(Q(), r.value.timezone)), o = K([{ month: Pe(l), year: we(l) }]), s = (v) => {
    const g = {
      hours: Ft(l),
      minutes: jt(l),
      seconds: 0
    };
    return n.value.enabled ? [g[v], g[v]] : g[v];
  }, u = at({
    hours: s("hours"),
    minutes: s("minutes"),
    seconds: s("seconds")
  });
  gt(
    n,
    (v, g) => {
      v.enabled !== g.enabled && (u.hours = s("hours"), u.minutes = s("minutes"), u.seconds = s("seconds"));
    },
    { deep: !0 }
  );
  const h = X({
    get: () => e.internalModelValue,
    set: (v) => {
      !e.readonly && !e.disabled && a("update:internal-model-value", v);
    }
  }), f = X(
    () => (v) => o.value[v] ? o.value[v].month : 0
  ), p = X(
    () => (v) => o.value[v] ? o.value[v].year : 0
  );
  return gt(
    h,
    (v, g) => {
      t && JSON.stringify(v ?? {}) !== JSON.stringify(g ?? {}) && t();
    },
    { deep: !0 }
  ), {
    calendars: o,
    time: u,
    modelValue: h,
    month: f,
    year: p,
    today: l
  };
}, Qu = (e, a) => {
  const {
    defaultedMultiCalendars: t,
    defaultedMultiDates: n,
    defaultedUI: r,
    defaultedHighlight: l,
    defaultedTz: o,
    propDates: s,
    defaultedRange: u
  } = qe(a), { isDisabled: h } = Ht(a), f = K(null), p = K(ct(/* @__PURE__ */ new Date(), o.value.timezone)), v = (i) => {
    !i.current && a.hideOffsetDates || (f.value = i.value);
  }, g = () => {
    f.value = null;
  }, $ = (i) => Array.isArray(e.value) && u.value.enabled && e.value[0] && f.value ? i ? He(f.value, e.value[0]) : Ve(f.value, e.value[0]) : !0, P = (i, M) => {
    const L = () => e.value ? M ? e.value[0] || null : e.value[1] : null, c = e.value && Array.isArray(e.value) ? L() : null;
    return Oe(Q(i.value), c);
  }, U = (i) => {
    const M = Array.isArray(e.value) ? e.value[0] : null;
    return i ? !Ve(f.value ?? null, M) : !0;
  }, V = (i, M = !0) => (u.value.enabled || a.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? a.hideOffsetDates && !i.current ? !1 : Oe(Q(i.value), e.value[M ? 0 : 1]) : u.value.enabled ? P(i, M) && U(M) || Oe(i.value, Array.isArray(e.value) ? e.value[0] : null) && $(M) : !1, B = (i, M) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const L = Oe(i.value, f.value);
      return M ? He(e.value[0], i.value) && L : Ve(e.value[0], i.value) && L;
    }
    return !1;
  }, O = (i) => !e.value || a.hideOffsetDates && !i.current ? !1 : u.value.enabled ? a.modelAuto && Array.isArray(e.value) ? Oe(i.value, e.value[0] ? e.value[0] : p.value) : !1 : n.value.enabled && Array.isArray(e.value) ? e.value.some((M) => Oe(M, i.value)) : Oe(i.value, e.value ? e.value : p.value), H = (i) => {
    if (u.value.autoRange || a.weekPicker) {
      if (f.value) {
        if (a.hideOffsetDates && !i.current)
          return !1;
        const M = wt(f.value, +u.value.autoRange), L = $t(Q(f.value), a.weekStart);
        return a.weekPicker ? Oe(L[1], Q(i.value)) : Oe(M, Q(i.value));
      }
      return !1;
    }
    return !1;
  }, re = (i) => {
    if (u.value.autoRange || a.weekPicker) {
      if (f.value) {
        const M = wt(f.value, +u.value.autoRange);
        if (a.hideOffsetDates && !i.current)
          return !1;
        const L = $t(Q(f.value), a.weekStart);
        return a.weekPicker ? He(i.value, L[0]) && Ve(i.value, L[1]) : He(i.value, f.value) && Ve(i.value, M);
      }
      return !1;
    }
    return !1;
  }, Y = (i) => {
    if (u.value.autoRange || a.weekPicker) {
      if (f.value) {
        if (a.hideOffsetDates && !i.current)
          return !1;
        const M = $t(Q(f.value), a.weekStart);
        return a.weekPicker ? Oe(M[0], i.value) : Oe(f.value, i.value);
      }
      return !1;
    }
    return !1;
  }, T = (i) => Wa(e.value, f.value, i.value), G = () => a.modelAuto && Array.isArray(a.internalModelValue) ? !!a.internalModelValue[0] : !1, q = () => a.modelAuto ? jr(a.internalModelValue) : !0, F = (i) => {
    if (a.weekPicker)
      return !1;
    const M = u.value.enabled ? !V(i) && !V(i, !1) : !0;
    return !h(i.value) && !O(i) && !(!i.current && a.hideOffsetDates) && M;
  }, ie = (i) => u.value.enabled ? a.modelAuto ? G() && O(i) : !1 : O(i), fe = (i) => l.value ? mi(i.value, s.value.highlight) : !1, he = (i) => {
    const M = h(i.value);
    return M && (typeof l.value == "function" ? !l.value(i.value, M) : !l.value.options.highlightDisabled);
  }, _ = (i) => {
    var M;
    return typeof l.value == "function" ? l.value(i.value) : (M = l.value.weekdays) == null ? void 0 : M.includes(i.value.getDay());
  }, S = (i) => (u.value.enabled || a.weekPicker) && (!(t.value.count > 0) || i.current) && q() && !(!i.current && a.hideOffsetDates) && !O(i) ? T(i) : !1, k = (i) => {
    const { isRangeStart: M, isRangeEnd: L } = ne(i), c = u.value.enabled ? M || L : !1;
    return {
      dp__cell_offset: !i.current,
      dp__pointer: !a.disabled && !(!i.current && a.hideOffsetDates) && !h(i.value),
      dp__cell_disabled: h(i.value),
      dp__cell_highlight: !he(i) && (fe(i) || _(i)) && !ie(i) && !c && !Y(i) && !(S(i) && a.weekPicker) && !L,
      dp__cell_highlight_active: !he(i) && (fe(i) || _(i)) && ie(i),
      dp__today: !a.noToday && Oe(i.value, p.value) && i.current,
      "dp--past": Ve(i.value, p.value),
      "dp--future": He(i.value, p.value)
    };
  }, E = (i) => ({
    dp__active_date: ie(i),
    dp__date_hover: F(i)
  }), se = (i) => {
    if (e.value && !Array.isArray(e.value)) {
      const M = $t(e.value, a.weekStart);
      return {
        ...y(i),
        dp__range_start: Oe(M[0], i.value),
        dp__range_end: Oe(M[1], i.value),
        dp__range_between_week: He(i.value, M[0]) && Ve(i.value, M[1])
      };
    }
    return {
      ...y(i)
    };
  }, N = (i) => {
    if (e.value && Array.isArray(e.value)) {
      const M = $t(e.value[0], a.weekStart), L = e.value[1] ? $t(e.value[1], a.weekStart) : [];
      return {
        ...y(i),
        dp__range_start: Oe(M[0], i.value) || Oe(L[0], i.value),
        dp__range_end: Oe(M[1], i.value) || Oe(L[1], i.value),
        dp__range_between_week: He(i.value, M[0]) && Ve(i.value, M[1]) || He(i.value, L[0]) && Ve(i.value, L[1]),
        dp__range_between: He(i.value, M[1]) && Ve(i.value, L[0])
      };
    }
    return {
      ...y(i)
    };
  }, ne = (i) => {
    const M = t.value.count > 0 ? i.current && V(i) && q() : V(i) && q(), L = t.value.count > 0 ? i.current && V(i, !1) && q() : V(i, !1) && q();
    return { isRangeStart: M, isRangeEnd: L };
  }, ye = (i) => {
    const { isRangeStart: M, isRangeEnd: L } = ne(i);
    return {
      dp__range_start: M,
      dp__range_end: L,
      dp__range_between: S(i),
      dp__date_hover: Oe(i.value, f.value) && !M && !L && !a.weekPicker,
      dp__date_hover_start: B(i, !0),
      dp__date_hover_end: B(i, !1)
    };
  }, y = (i) => ({
    ...ye(i),
    dp__cell_auto_range: re(i),
    dp__cell_auto_range_start: Y(i),
    dp__cell_auto_range_end: H(i)
  }), b = (i) => u.value.enabled ? u.value.autoRange ? y(i) : a.modelAuto ? { ...E(i), ...ye(i) } : a.weekPicker ? N(i) : ye(i) : a.weekPicker ? se(i) : E(i);
  return {
    setHoverDate: v,
    clearHoverDate: g,
    getDayClassData: (i) => a.hideOffsetDates && !i.current ? {} : {
      ...k(i),
      ...b(i),
      [a.dayClass ? a.dayClass(i.value, a.internalModelValue) : ""]: !0,
      ...r.value.calendarCell ?? {}
    }
  };
}, Ht = (e) => {
  const { defaultedFilters: a, defaultedRange: t, propDates: n, defaultedMultiDates: r } = qe(e), l = (_) => n.value.disabledDates ? typeof n.value.disabledDates == "function" ? n.value.disabledDates(Q(_)) : !!Va(_, n.value.disabledDates) : !1, o = (_) => n.value.maxDate ? e.yearPicker ? we(_) > we(n.value.maxDate) : He(_, n.value.maxDate) : !1, s = (_) => n.value.minDate ? e.yearPicker ? we(_) < we(n.value.minDate) : Ve(_, n.value.minDate) : !1, u = (_) => {
    const S = o(_), k = s(_), E = l(_), se = a.value.months.map((b) => +b).includes(Pe(_)), N = e.disabledWeekDays.length ? e.disabledWeekDays.some((b) => +b === es(_)) : !1, ne = g(_), ye = we(_), y = ye < +e.yearRange[0] || ye > +e.yearRange[1];
    return !(S || k || E || se || y || N || ne);
  }, h = (_, S) => Ve(...Lt(n.value.minDate, _, S)) || Oe(...Lt(n.value.minDate, _, S)), f = (_, S) => He(...Lt(n.value.maxDate, _, S)) || Oe(...Lt(n.value.maxDate, _, S)), p = (_, S, k) => {
    let E = !1;
    return n.value.maxDate && k && f(_, S) && (E = !0), n.value.minDate && !k && h(_, S) && (E = !0), E;
  }, v = (_, S, k, E) => {
    let se = !1;
    return E && (n.value.minDate || n.value.maxDate) ? n.value.minDate && n.value.maxDate ? se = p(_, S, k) : (n.value.minDate && h(_, S) || n.value.maxDate && f(_, S)) && (se = !0) : se = !0, se;
  }, g = (_) => Array.isArray(n.value.allowedDates) && !n.value.allowedDates.length ? !0 : n.value.allowedDates ? !Va(_, n.value.allowedDates) : !1, $ = (_) => !u(_), P = (_) => t.value.noDisabledRange ? !Or({ start: _[0], end: _[1] }).some((S) => $(S)) : !0, U = (_) => {
    if (_) {
      const S = we(_);
      return S >= +e.yearRange[0] && S <= e.yearRange[1];
    }
    return !0;
  }, V = (_, S) => !!(Array.isArray(_) && _[S] && (t.value.maxRange || t.value.minRange) && U(_[S])), B = (_, S, k = 0) => {
    if (V(S, k) && U(_)) {
      const E = Tr(_, S[k]), se = Qr(S[k], _), N = se.length === 1 ? 0 : se.filter((ye) => $(ye)).length, ne = Math.abs(E) - (t.value.minMaxRawRange ? 0 : N);
      if (t.value.minRange && t.value.maxRange)
        return ne >= +t.value.minRange && ne <= +t.value.maxRange;
      if (t.value.minRange)
        return ne >= +t.value.minRange;
      if (t.value.maxRange)
        return ne <= +t.value.maxRange;
    }
    return !0;
  }, O = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, H = (_) => Array.isArray(_) ? [_[0] ? un(_[0]) : null, _[1] ? un(_[1]) : null] : un(_), re = (_, S, k) => _.find(
    (E) => +E.hours === Ft(S) && E.minutes === "*" ? !0 : +E.minutes === jt(S) && +E.hours === Ft(S)
  ) && k, Y = (_, S, k) => {
    const [E, se] = _, [N, ne] = S;
    return !re(E, N, k) && !re(se, ne, k) && k;
  }, T = (_, S) => {
    const k = Array.isArray(S) ? S : [S];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? Y(e.disabledTimes, k, _) : !k.some((E) => re(e.disabledTimes, E, _)) : _;
  }, G = (_, S) => {
    const k = Array.isArray(S) ? [Jt(S[0]), S[1] ? Jt(S[1]) : void 0] : Jt(S), E = !e.disabledTimes(k);
    return _ && E;
  }, q = (_, S) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? T(S, _) : G(S, _) : S, F = (_) => {
    let S = !0;
    if (!_ || O())
      return !0;
    const k = !n.value.minDate && !n.value.maxDate ? H(_) : _;
    return (e.maxTime || n.value.maxDate) && (S = ur(
      e.maxTime,
      n.value.maxDate,
      "max",
      et(k),
      S
    )), (e.minTime || n.value.minDate) && (S = ur(
      e.minTime,
      n.value.minDate,
      "min",
      et(k),
      S
    )), q(_, S);
  }, ie = (_) => {
    if (!e.monthPicker)
      return !0;
    let S = !0;
    const k = Q(_t(_));
    if (n.value.minDate && n.value.maxDate) {
      const E = Q(_t(n.value.minDate)), se = Q(_t(n.value.maxDate));
      return He(k, E) && Ve(k, se) || Oe(k, E) || Oe(k, se);
    }
    if (n.value.minDate) {
      const E = Q(_t(n.value.minDate));
      S = He(k, E) || Oe(k, E);
    }
    if (n.value.maxDate) {
      const E = Q(_t(n.value.maxDate));
      S = Ve(k, E) || Oe(k, E);
    }
    return S;
  }, fe = X(() => (_) => !e.enableTimePicker || e.ignoreTimeValidation ? !0 : F(_)), he = X(() => (_) => e.monthPicker ? Array.isArray(_) && (t.value.enabled || r.value.enabled) ? !_.filter((S) => !ie(S)).length : ie(_) : !0);
  return {
    isDisabled: $,
    validateDate: u,
    validateMonthYearInRange: v,
    isDateRangeAllowed: P,
    checkMinMaxRange: B,
    isValidTime: F,
    isTimeValid: fe,
    isMonthValid: he
  };
}, Qa = () => {
  const e = X(() => (n, r) => n == null ? void 0 : n.includes(r)), a = X(() => (n, r) => n.count ? n.solo ? !0 : r === 0 : !0), t = X(() => (n, r) => n.count ? n.solo ? !0 : r === n.count - 1 : !0);
  return { hideNavigationButtons: e, showLeftIcon: a, showRightIcon: t };
}, Gu = (e, a, t) => {
  const n = K(0), r = at({
    [Xt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Xt.calendar]: !1,
    [Xt.header]: !1
  }), l = X(() => e.monthPicker || e.timePicker), o = (p) => {
    var v;
    if ((v = e.flow) != null && v.length) {
      if (!p && l.value)
        return f();
      r[p] = !0, Object.keys(r).filter((g) => !r[g]).length || f();
    }
  }, s = () => {
    var p, v;
    (p = e.flow) != null && p.length && n.value !== -1 && (n.value += 1, a("flow-step", n.value), f()), ((v = e.flow) == null ? void 0 : v.length) === n.value && mt().then(() => u());
  }, u = () => {
    n.value = -1;
  }, h = (p, v, ...g) => {
    var $, P;
    e.flow[n.value] === p && t.value && ((P = ($ = t.value)[v]) == null || P.call($, ...g));
  }, f = (p = 0) => {
    p && (n.value += p), h(lt.month, "toggleMonthPicker", !0), h(lt.year, "toggleYearPicker", !0), h(lt.calendar, "toggleTimePicker", !1, !0), h(lt.time, "toggleTimePicker", !0, !0);
    const v = e.flow[n.value];
    (v === lt.hours || v === lt.minutes || v === lt.seconds) && h(v, "toggleTimePicker", !0, !0, v);
  };
  return { childMount: o, updateFlowStep: s, resetFlow: u, handleFlow: f, flowStep: n };
}, Ku = {
  key: 1,
  class: "dp__input_wrap"
}, Xu = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-disabled", "aria-invalid"], Ju = {
  key: 2,
  class: "dp--clear-btn"
}, Zu = ["aria-label"], ed = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: !1 },
    inputValue: { type: String, default: "" },
    ...Ha
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur",
    "real-blur",
    "text-input"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, {
      defaultedTextInput: l,
      defaultedAriaLabels: o,
      defaultedInline: s,
      defaultedConfig: u,
      defaultedRange: h,
      defaultedMultiDates: f,
      defaultedUI: p,
      getDefaultPattern: v,
      getDefaultStartTime: g
    } = qe(r), { checkMinMaxRange: $ } = Ht(r), P = K(), U = K(null), V = K(!1), B = K(!1), O = K(!1), H = K(null), re = X(
      () => ({
        dp__pointer: !r.disabled && !r.readonly && !l.value.enabled,
        dp__disabled: r.disabled,
        dp__input_readonly: !l.value.enabled,
        dp__input: !0,
        dp__input_icon_pad: !r.hideInputIcon,
        dp__input_valid: typeof r.state == "boolean" ? r.state : !1,
        dp__input_invalid: typeof r.state == "boolean" ? !r.state : !1,
        dp__input_focus: V.value || r.isMenuOpen,
        dp__input_reg: !l.value.enabled,
        ...p.value.input ?? {}
      })
    ), Y = () => {
      n("set-input-date", null), r.clearable && r.autoApply && (n("set-empty-date"), P.value = null);
    }, T = (y) => {
      const b = g();
      return fi(
        y,
        l.value.format ?? v(),
        b ?? Gr({}, r.enableSeconds),
        r.inputValue,
        O.value,
        r.formatLocale
      );
    }, G = (y) => {
      const { rangeSeparator: b } = l.value, [i, M] = y.split(`${b}`);
      if (i) {
        const L = T(i.trim()), c = M ? T(M.trim()) : null;
        if (ua(L, c))
          return;
        const le = L && c ? [L, c] : [L];
        $(c, le, 0) && (P.value = L ? le : null);
      }
    }, q = () => {
      O.value = !0;
    }, F = (y) => {
      if (h.value.enabled)
        G(y);
      else if (f.value.enabled) {
        const b = y.split(";");
        P.value = b.map((i) => T(i.trim())).filter((i) => i);
      } else
        P.value = T(y);
    }, ie = (y) => {
      var b;
      const i = typeof y == "string" ? y : (b = y.target) == null ? void 0 : b.value;
      i !== "" ? (l.value.openMenu && !r.isMenuOpen && n("open"), F(i), n("set-input-date", P.value)) : Y(), O.value = !1, n("update:input-value", i), n("text-input", y, P.value);
    }, fe = (y) => {
      l.value.enabled ? (F(y.target.value), l.value.enterSubmit && _n(P.value) && r.inputValue !== "" ? (n("set-input-date", P.value, !0), P.value = null) : l.value.enterSubmit && r.inputValue === "" && (P.value = null, n("clear"))) : S(y);
    }, he = (y, b) => {
      var i;
      H.value && b && !B.value && (y.preventDefault(), B.value = !0, (i = H.value) == null || i.focus()), l.value.enabled && l.value.tabSubmit && F(y.target.value), l.value.tabSubmit && _n(P.value) && r.inputValue !== "" ? (n("set-input-date", P.value, !0, !0), P.value = null) : l.value.tabSubmit && r.inputValue === "" && (P.value = null, n("clear", !0));
    }, _ = () => {
      V.value = !0, n("focus"), mt().then(() => {
        var y;
        l.value.enabled && l.value.selectOnFocus && ((y = U.value) == null || y.select());
      });
    }, S = (y) => {
      if (y.preventDefault(), Vt(y, u.value, !0), l.value.enabled && l.value.openMenu && !s.value.input) {
        if (l.value.openMenu === "open" && !r.isMenuOpen)
          return n("open");
        if (l.value.openMenu === "toggle")
          return n("toggle");
      } else
        l.value.enabled || n("toggle");
    }, k = () => {
      n("real-blur"), V.value = !1, (!r.isMenuOpen || s.value.enabled && s.value.input) && n("blur"), r.autoApply && l.value.enabled && P.value && !r.isMenuOpen && (n("set-input-date", P.value), n("select-date"), P.value = null);
    }, E = (y) => {
      Vt(y, u.value, !0), n("clear");
    }, se = (y, b) => {
      if (y.key === "Tab" && he(y, b), y.key === "Enter" && fe(y), !l.value.enabled) {
        if (y.code === "Tab")
          return;
        y.preventDefault();
      }
    }, N = () => {
      var y;
      (y = U.value) == null || y.focus({ preventScroll: !0 });
    }, ne = (y) => {
      P.value = y;
    }, ye = (y) => {
      y.key === Ie.tab && (B.value = !1, he(y));
    };
    return a({
      focusInput: N,
      setParsedDate: ne
    }), (y, b) => {
      var i, M;
      return w(), I("div", { onClick: S }, [
        y.$slots.trigger && !y.$slots["dp-input"] && !m(s).enabled ? oe(y.$slots, "trigger", { key: 0 }) : j("", !0),
        !y.$slots.trigger && (!m(s).enabled || m(s).input) ? (w(), I("div", Ku, [
          y.$slots["dp-input"] && !y.$slots.trigger && (!m(s).enabled || m(s).enabled && m(s).input) ? oe(y.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: ie,
            onEnter: fe,
            onTab: he,
            onClear: E,
            onBlur: k,
            onKeypress: se,
            onPaste: q,
            onFocus: _,
            openMenu: () => y.$emit("open"),
            closeMenu: () => y.$emit("close"),
            toggleMenu: () => y.$emit("toggle")
          }) : j("", !0),
          y.$slots["dp-input"] ? j("", !0) : (w(), I("input", {
            key: 1,
            id: y.uid ? `dp-input-${y.uid}` : void 0,
            ref_key: "inputRef",
            ref: U,
            "data-test": "dp-input",
            name: y.name,
            class: ke(re.value),
            inputmode: m(l).enabled ? "text" : "none",
            placeholder: y.placeholder,
            disabled: y.disabled,
            readonly: y.readonly,
            required: y.required,
            value: e.inputValue,
            autocomplete: y.autocomplete,
            "aria-disabled": y.disabled || void 0,
            "aria-invalid": y.state === !1 ? !0 : void 0,
            onInput: ie,
            onBlur: k,
            onFocus: _,
            onKeypress: se,
            onKeydown: b[0] || (b[0] = (L) => se(L, !0)),
            onPaste: q
          }, null, 42, Xu)),
          ue("div", {
            onClick: b[3] || (b[3] = (L) => n("toggle"))
          }, [
            y.$slots["input-icon"] && !y.hideInputIcon ? (w(), I("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: b[1] || (b[1] = (L) => n("toggle"))
            }, [
              oe(y.$slots, "input-icon")
            ])) : j("", !0),
            !y.$slots["input-icon"] && !y.hideInputIcon && !y.$slots["dp-input"] ? (w(), be(m(pa), {
              key: 1,
              "aria-label": (i = m(o)) == null ? void 0 : i.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: b[2] || (b[2] = (L) => n("toggle"))
            }, null, 8, ["aria-label"])) : j("", !0)
          ]),
          y.$slots["clear-icon"] && e.inputValue && y.clearable && !y.disabled && !y.readonly ? (w(), I("span", Ju, [
            oe(y.$slots, "clear-icon", { clear: E })
          ])) : j("", !0),
          y.clearable && !y.$slots["clear-icon"] && e.inputValue && !y.disabled && !y.readonly ? (w(), I("button", {
            key: 3,
            ref_key: "clearBtnRef",
            ref: H,
            "aria-label": (M = m(o)) == null ? void 0 : M.clearInput,
            class: "dp--clear-btn",
            type: "button",
            onBlur: b[4] || (b[4] = (L) => B.value = !1),
            onKeydown: b[5] || (b[5] = (L) => m(ut)(L, () => E(L), !0, ye)),
            onClick: b[6] || (b[6] = Zt((L) => E(L), ["prevent"]))
          }, [
            Re(m(Vr), {
              class: "dp__input_icons",
              "data-test": "clear-icon"
            })
          ], 40, Zu)) : j("", !0)
        ])) : j("", !0)
      ]);
    };
  }
}), td = typeof window < "u" ? window : void 0, hn = () => {
}, ad = (e) => Sl() ? (Al(e), !0) : !1, nd = (e, a, t, n) => {
  if (!e)
    return hn;
  let r = hn;
  const l = gt(
    () => m(e),
    (s) => {
      r(), s && (s.addEventListener(a, t, n), r = () => {
        s.removeEventListener(a, t, n), r = hn;
      });
    },
    { immediate: !0, flush: "post" }
  ), o = () => {
    l(), r();
  };
  return ad(o), o;
}, rd = (e, a, t, n = {}) => {
  const { window: r = td, event: l = "pointerdown" } = n;
  return r ? nd(r, l, (o) => {
    const s = Xe(e), u = Xe(a);
    !s || !u || s === o.target || o.composedPath().includes(s) || o.composedPath().includes(u) || t(o);
  }, { passive: !0 }) : void 0;
}, ld = /* @__PURE__ */ Je({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...Ha
  },
  emits: [
    "update:model-value",
    "update:model-timezone-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "date-update",
    "invalid-date",
    "overlay-toggle",
    "text-input"
  ],
  setup(e, { expose: a, emit: t }) {
    const n = t, r = e, l = ea(), o = K(!1), s = Ta(r, "modelValue"), u = Ta(r, "timezone"), h = K(null), f = K(null), p = K(null), v = K(!1), g = K(null), $ = K(!1), P = K(!1), U = K(!1), V = K(!1), { setMenuFocused: B, setShiftKey: O } = el(), { clearArrowNav: H } = Wt(), { validateDate: re, isValidTime: Y } = Ht(r), {
      defaultedTransitions: T,
      defaultedTextInput: G,
      defaultedInline: q,
      defaultedConfig: F,
      defaultedRange: ie,
      defaultedMultiDates: fe
    } = qe(r), { menuTransition: he, showTransition: _ } = Sa(T);
    ot(() => {
      M(r.modelValue), mt().then(() => {
        if (!q.value.enabled) {
          const R = ye(g.value);
          R == null || R.addEventListener("scroll", ee), window == null || window.addEventListener("resize", C);
        }
      }), q.value.enabled && (o.value = !0), window == null || window.addEventListener("keyup", _e), window == null || window.addEventListener("keydown", D);
    }), Ba(() => {
      if (!q.value.enabled) {
        const R = ye(g.value);
        R == null || R.removeEventListener("scroll", ee), window == null || window.removeEventListener("resize", C);
      }
      window == null || window.removeEventListener("keyup", _e), window == null || window.removeEventListener("keydown", D);
    });
    const S = pt(l, "all", r.presetDates), k = pt(l, "input");
    gt(
      [s, u],
      () => {
        M(s.value);
      },
      { deep: !0 }
    );
    const { openOnTop: E, menuStyle: se, xCorrect: N, setMenuPosition: ne, getScrollableParent: ye, shadowRender: y } = Hu({
      menuRef: h,
      menuRefInner: f,
      inputRef: p,
      pickerWrapperRef: g,
      inline: q,
      emit: n,
      props: r,
      slots: l
    }), {
      inputValue: b,
      internalModelValue: i,
      parseExternalModelValue: M,
      emitModelValue: L,
      formatInputValue: c,
      checkBeforeEmit: le
    } = Ii(n, r, v), ge = X(
      () => ({
        dp__main: !0,
        dp__theme_dark: r.dark,
        dp__theme_light: !r.dark,
        dp__flex_display: q.value.enabled,
        "dp--flex-display-collapsed": U.value,
        dp__flex_display_with_input: q.value.input
      })
    ), Ge = X(() => r.dark ? "dp__theme_dark" : "dp__theme_light"), A = X(() => r.teleport ? {
      to: typeof r.teleport == "boolean" ? "body" : r.teleport,
      disabled: !r.teleport || q.value.enabled
    } : {}), Z = X(() => ({ class: "dp__outer_menu_wrap" })), d = X(() => q.value.enabled && (r.timePicker || r.monthPicker || r.yearPicker || r.quarterPicker)), W = () => {
      var R, te;
      return (te = (R = p.value) == null ? void 0 : R.$el) == null ? void 0 : te.getBoundingClientRect();
    }, ee = () => {
      o.value && (F.value.closeOnScroll ? ft() : ne());
    }, C = () => {
      var R;
      o.value && ne();
      const te = (R = f.value) == null ? void 0 : R.$el.getBoundingClientRect().width;
      U.value = document.body.offsetWidth <= te;
    }, _e = (R) => {
      R.key === "Tab" && !q.value.enabled && !r.teleport && F.value.tabOutClosesMenu && (g.value.contains(document.activeElement) || ft()), P.value = R.shiftKey;
    }, D = (R) => {
      P.value = R.shiftKey;
    }, J = () => {
      !r.disabled && !r.readonly && (y(fr, r), ne(!1), o.value = !0, o.value && n("open"), o.value || ha(), M(r.modelValue));
    }, ce = () => {
      var R;
      b.value = "", ha(), (R = p.value) == null || R.setParsedDate(null), n("update:model-value", null), n("update:model-timezone-value", null), n("cleared"), F.value.closeOnClearValue && ft();
    }, Te = () => {
      const R = i.value;
      return !R || !Array.isArray(R) && re(R) ? !0 : Array.isArray(R) ? fe.value.enabled || R.length === 2 && re(R[0]) && re(R[1]) ? !0 : ie.value.partialRange && !r.timePicker ? re(R[0]) : !1 : !1;
    }, ht = () => {
      le() && Te() ? (L(), ft()) : n("invalid-select", i.value);
    }, ve = (R) => {
      Nt(), L(), F.value.closeOnAutoApply && !R && ft();
    }, Nt = () => {
      p.value && G.value.enabled && p.value.setParsedDate(i.value);
    }, Ot = (R = !1) => {
      r.autoApply && Y(i.value) && Te() && (ie.value.enabled && Array.isArray(i.value) ? (ie.value.partialRange || i.value.length === 2) && ve(R) : ve(R));
    }, ha = () => {
      G.value.enabled || (i.value = null);
    }, ft = () => {
      q.value.enabled || (o.value && (o.value = !1, N.value = !1, B(!1), O(!1), H(), n("closed"), b.value && M(s.value)), ha(), n("blur"));
    }, va = (R, te, de = !1) => {
      if (!R) {
        i.value = null;
        return;
      }
      const st = Array.isArray(R) ? !R.some((zt) => !re(zt)) : re(R), vt = Y(R);
      st && vt && (V.value = !0, i.value = R, te && ($.value = de, ht(), n("text-submit")), mt().then(() => {
        V.value = !1;
      }));
    }, Ga = () => {
      r.autoApply && Y(i.value) && L(), Nt();
    }, Ra = () => o.value ? ft() : J(), Ka = (R) => {
      i.value = R;
    }, Xa = () => {
      G.value.enabled && (v.value = !0, c()), n("focus");
    }, Ja = () => {
      if (G.value.enabled && (v.value = !1, M(r.modelValue), $.value)) {
        const R = ci(g.value, P.value);
        R == null || R.focus();
      }
      n("blur");
    }, Za = (R) => {
      f.value && f.value.updateMonthYear(0, {
        month: lr(R.month),
        year: lr(R.year)
      });
    }, en = (R) => {
      M(R ?? r.modelValue);
    }, tn = (R, te) => {
      var de;
      (de = f.value) == null || de.switchView(R, te);
    }, x = (R) => F.value.onClickOutside ? F.value.onClickOutside(R) : ft(), ae = (R = 0) => {
      var te;
      (te = f.value) == null || te.handleFlow(R);
    };
    return rd(h, p, () => x(Te)), a({
      closeMenu: ft,
      selectDate: ht,
      clearValue: ce,
      openMenu: J,
      onScroll: ee,
      formatInputValue: c,
      // exposed for testing purposes
      updateInternalModelValue: Ka,
      // modify internal modelValue
      setMonthYear: Za,
      parseModel: en,
      switchView: tn,
      toggleMenu: Ra,
      handleFlow: ae,
      dpWrapMenuRef: h
    }), (R, te) => (w(), I("div", {
      ref_key: "pickerWrapperRef",
      ref: g,
      class: ke(ge.value),
      "data-datepicker-instance": ""
    }, [
      Re(ed, Ee({
        ref_key: "inputRef",
        ref: p,
        "input-value": m(b),
        "onUpdate:inputValue": te[0] || (te[0] = (de) => Un(b) ? b.value = de : null),
        "is-menu-open": o.value
      }, R.$props, {
        onClear: ce,
        onOpen: J,
        onSetInputDate: va,
        onSetEmptyDate: m(L),
        onSelectDate: ht,
        onToggle: Ra,
        onClose: ft,
        onFocus: Xa,
        onBlur: Ja,
        onRealBlur: te[1] || (te[1] = (de) => v.value = !1),
        onTextInput: te[2] || (te[2] = (de) => R.$emit("text-input", de))
      }), nt({ _: 2 }, [
        Fe(m(k), (de, st) => ({
          name: de,
          fn: me((vt) => [
            oe(R.$slots, de, ze(tt(vt)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (w(), be(ja(R.teleport ? br : "div"), ze(tt(A.value)), {
        default: me(() => [
          Re(fa, {
            name: m(he)(m(E)),
            css: m(_) && !m(q).enabled
          }, {
            default: me(() => [
              o.value ? (w(), I("div", Ee({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: h
              }, Z.value, {
                class: { "dp--menu-wrapper": !m(q).enabled },
                style: m(q).enabled ? void 0 : m(se)
              }), [
                Re(fr, Ee({
                  ref_key: "dpMenuRef",
                  ref: f
                }, R.$props, {
                  "internal-model-value": m(i),
                  "onUpdate:internalModelValue": te[3] || (te[3] = (de) => Un(i) ? i.value = de : null),
                  class: { [Ge.value]: !0, "dp--menu-wrapper": R.teleport },
                  "open-on-top": m(E),
                  "no-overlay-focus": d.value,
                  collapse: U.value,
                  "get-input-rect": W,
                  "is-text-input-date": V.value,
                  onClosePicker: ft,
                  onSelectDate: ht,
                  onAutoApply: Ot,
                  onTimeUpdate: Ga,
                  onFlowStep: te[4] || (te[4] = (de) => R.$emit("flow-step", de)),
                  onUpdateMonthYear: te[5] || (te[5] = (de) => R.$emit("update-month-year", de)),
                  onInvalidSelect: te[6] || (te[6] = (de) => R.$emit("invalid-select", m(i))),
                  onAutoApplyInvalid: te[7] || (te[7] = (de) => R.$emit("invalid-select", de)),
                  onInvalidFixedRange: te[8] || (te[8] = (de) => R.$emit("invalid-fixed-range", de)),
                  onRecalculatePosition: m(ne),
                  onTooltipOpen: te[9] || (te[9] = (de) => R.$emit("tooltip-open", de)),
                  onTooltipClose: te[10] || (te[10] = (de) => R.$emit("tooltip-close", de)),
                  onTimePickerOpen: te[11] || (te[11] = (de) => R.$emit("time-picker-open", de)),
                  onTimePickerClose: te[12] || (te[12] = (de) => R.$emit("time-picker-close", de)),
                  onAmPmChange: te[13] || (te[13] = (de) => R.$emit("am-pm-change", de)),
                  onRangeStart: te[14] || (te[14] = (de) => R.$emit("range-start", de)),
                  onRangeEnd: te[15] || (te[15] = (de) => R.$emit("range-end", de)),
                  onDateUpdate: te[16] || (te[16] = (de) => R.$emit("date-update", de)),
                  onInvalidDate: te[17] || (te[17] = (de) => R.$emit("invalid-date", de)),
                  onOverlayToggle: te[18] || (te[18] = (de) => R.$emit("overlay-toggle", de))
                }), nt({ _: 2 }, [
                  Fe(m(S), (de, st) => ({
                    name: de,
                    fn: me((vt) => [
                      oe(R.$slots, de, ze(tt({ ...vt })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "is-text-input-date", "onRecalculatePosition"])
              ], 16)) : j("", !0)
            ]),
            _: 3
          }, 8, ["name", "css"])
        ]),
        _: 3
      }, 16))
    ], 2));
  }
}), jn = /* @__PURE__ */ (() => {
  const e = ld;
  return e.install = (a) => {
    a.component("Vue3DatePicker", e);
  }, e;
})(), od = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(od).forEach(([e, a]) => {
  e !== "default" && (jn[e] = a);
});
const sd = {
  name: "WyxosDatepicker",
  components: {
    VueDatePicker: jn
  },
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
      type: Yt,
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
  computed: {
    mergedOptions() {
      return {
        enableTimePicker: !1,
        autoApply: !0,
        ...this.options
      };
    }
  },
  watch: {
    modelValue: {
      handler(e) {
        this.query = e ? _a(e, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = _a(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(e) {
      return e ? _a(e).format(this.displayFormat) : null;
    },
    updateQuery() {
      var e;
      this.$emit(
        "update:modelValue",
        this.query ? _a(this.query).format(this.submitFormat) : null
      ), (e = this.form) == null || e.clearError(this.name);
    }
  }
};
function id(e, a, t, n, r, l) {
  var u;
  const o = Ye("VueDatePicker"), s = Ye("o-field");
  return w(), be(s, Ee({ label: t.label }, (u = t.form) == null ? void 0 : u.getError(t.name)), {
    default: me(() => [
      Re(o, Ee({
        modelValue: r.query,
        "onUpdate:modelValue": a[0] || (a[0] = (h) => r.query = h)
      }, l.mergedOptions, { "onUpdate:modelValue": l.updateQuery }), null, 16, ["modelValue", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const ud = /* @__PURE__ */ Ze(sd, [["render", id]]), dd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ud
}, Symbol.toStringTag, { value: "Module" })), cd = Je({
  name: "WyxosError",
  props: {
    form: {
      type: Yt,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: oa()
    };
  }
}), md = { key: 0 }, fd = { key: 1 };
function pd(e, a, t, n, r, l) {
  var o, s;
  return (o = e.form) != null && o.getError(e.name).message ? (w(), I("p", md, De(e.form.getError(e.name).message), 1)) : (s = e.errors.get(e.name)) != null && s.message ? (w(), I("p", fd, De(e.errors.get(e.name).message), 1)) : j("", !0);
}
const hd = /* @__PURE__ */ Ze(cd, [["render", pd]]), vd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hd
}, Symbol.toStringTag, { value: "Module" })), sl = "%[a-f0-9]{2}", pr = new RegExp("(" + sl + ")|([^%]+?)", "gi"), hr = new RegExp("(" + sl + ")+", "gi");
function kn(e, a) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  a = a || 1;
  const t = e.slice(0, a), n = e.slice(a);
  return Array.prototype.concat.call([], kn(t), kn(n));
}
function yd(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let a = e.match(pr) || [];
    for (let t = 1; t < a.length; t++)
      e = kn(a, t).join(""), a = e.match(pr) || [];
    return e;
  }
}
function gd(e) {
  const a = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = hr.exec(e);
  for (; t; ) {
    try {
      a[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const r = yd(t[0]);
      r !== t[0] && (a[t[0]] = r);
    }
    t = hr.exec(e);
  }
  a["%C2"] = "�";
  const n = Object.keys(a);
  for (const r of n)
    e = e.replace(new RegExp(r, "g"), a[r]);
  return e;
}
function bd(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return decodeURIComponent(e);
  } catch {
    return gd(e);
  }
}
function il(e, a) {
  if (!(typeof e == "string" && typeof a == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (e === "" || a === "")
    return [];
  const t = e.indexOf(a);
  return t === -1 ? [] : [
    e.slice(0, t),
    e.slice(t + a.length)
  ];
}
function wd(e, a) {
  const t = {};
  if (Array.isArray(a))
    for (const n of a) {
      const r = Object.getOwnPropertyDescriptor(e, n);
      r != null && r.enumerable && Object.defineProperty(t, n, r);
    }
  else
    for (const n of Reflect.ownKeys(e)) {
      const r = Object.getOwnPropertyDescriptor(e, n);
      if (r.enumerable) {
        const l = e[n];
        a(n, l, e) && Object.defineProperty(t, n, r);
      }
    }
  return t;
}
const _d = (e) => e == null, kd = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (a) => `%${a.charCodeAt(0).toString(16).toUpperCase()}`), xn = Symbol("encodeFragmentIdentifier");
function xd(e) {
  switch (e.arrayFormat) {
    case "index":
      return (a) => (t, n) => {
        const r = t.length;
        return n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? t : n === null ? [
          ...t,
          [Ke(a, e), "[", r, "]"].join("")
        ] : [
          ...t,
          [Ke(a, e), "[", Ke(r, e), "]=", Ke(n, e)].join("")
        ];
      };
    case "bracket":
      return (a) => (t, n) => n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [Ke(a, e), "[]"].join("")
      ] : [
        ...t,
        [Ke(a, e), "[]=", Ke(n, e)].join("")
      ];
    case "colon-list-separator":
      return (a) => (t, n) => n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [Ke(a, e), ":list="].join("")
      ] : [
        ...t,
        [Ke(a, e), ":list=", Ke(n, e)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const a = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (n, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? n : (r = r === null ? "" : r, n.length === 0 ? [[Ke(t, e), a, Ke(r, e)].join("")] : [[n, Ke(r, e)].join(e.arrayFormatSeparator)]);
    }
    default:
      return (a) => (t, n) => n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        Ke(a, e)
      ] : [
        ...t,
        [Ke(a, e), "=", Ke(n, e)].join("")
      ];
  }
}
function Td(e) {
  let a;
  switch (e.arrayFormat) {
    case "index":
      return (t, n, r) => {
        if (a = /\[(\d*)]$/.exec(t), t = t.replace(/\[\d*]$/, ""), !a) {
          r[t] = n;
          return;
        }
        r[t] === void 0 && (r[t] = {}), r[t][a[1]] = n;
      };
    case "bracket":
      return (t, n, r) => {
        if (a = /(\[])$/.exec(t), t = t.replace(/\[]$/, ""), !a) {
          r[t] = n;
          return;
        }
        if (r[t] === void 0) {
          r[t] = [n];
          return;
        }
        r[t] = [...r[t], n];
      };
    case "colon-list-separator":
      return (t, n, r) => {
        if (a = /(:list)$/.exec(t), t = t.replace(/:list$/, ""), !a) {
          r[t] = n;
          return;
        }
        if (r[t] === void 0) {
          r[t] = [n];
          return;
        }
        r[t] = [...r[t], n];
      };
    case "comma":
    case "separator":
      return (t, n, r) => {
        const l = typeof n == "string" && n.includes(e.arrayFormatSeparator), o = typeof n == "string" && !l && Rt(n, e).includes(e.arrayFormatSeparator);
        n = o ? Rt(n, e) : n;
        const s = l || o ? n.split(e.arrayFormatSeparator).map((u) => Rt(u, e)) : n === null ? n : Rt(n, e);
        r[t] = s;
      };
    case "bracket-separator":
      return (t, n, r) => {
        const l = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !l) {
          r[t] = n && Rt(n, e);
          return;
        }
        const o = n === null ? [] : n.split(e.arrayFormatSeparator).map((s) => Rt(s, e));
        if (r[t] === void 0) {
          r[t] = o;
          return;
        }
        r[t] = [...r[t], ...o];
      };
    default:
      return (t, n, r) => {
        if (r[t] === void 0) {
          r[t] = n;
          return;
        }
        r[t] = [...[r[t]].flat(), n];
      };
  }
}
function ul(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function Ke(e, a) {
  return a.encode ? a.strict ? kd(e) : encodeURIComponent(e) : e;
}
function Rt(e, a) {
  return a.decode ? bd(e) : e;
}
function dl(e) {
  return Array.isArray(e) ? e.sort() : typeof e == "object" ? dl(Object.keys(e)).sort((a, t) => Number(a) - Number(t)).map((a) => e[a]) : e;
}
function cl(e) {
  const a = e.indexOf("#");
  return a !== -1 && (e = e.slice(0, a)), e;
}
function Pd(e) {
  let a = "";
  const t = e.indexOf("#");
  return t !== -1 && (a = e.slice(t)), a;
}
function vr(e, a) {
  return a.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : a.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
}
function Wn(e) {
  e = cl(e);
  const a = e.indexOf("?");
  return a === -1 ? "" : e.slice(a + 1);
}
function Hn(e, a) {
  a = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...a
  }, ul(a.arrayFormatSeparator);
  const t = Td(a), n = /* @__PURE__ */ Object.create(null);
  if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
    return n;
  for (const r of e.split("&")) {
    if (r === "")
      continue;
    const l = a.decode ? r.replace(/\+/g, " ") : r;
    let [o, s] = il(l, "=");
    o === void 0 && (o = l), s = s === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(a.arrayFormat) ? s : Rt(s, a), t(Rt(o, a), s, n);
  }
  for (const [r, l] of Object.entries(n))
    if (typeof l == "object" && l !== null)
      for (const [o, s] of Object.entries(l))
        l[o] = vr(s, a);
    else
      n[r] = vr(l, a);
  return a.sort === !1 ? n : (a.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(a.sort)).reduce((r, l) => {
    const o = n[l];
    return r[l] = o && typeof o == "object" && !Array.isArray(o) ? dl(o) : o, r;
  }, /* @__PURE__ */ Object.create(null));
}
function ml(e, a) {
  if (!e)
    return "";
  a = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...a
  }, ul(a.arrayFormatSeparator);
  const t = (o) => a.skipNull && _d(e[o]) || a.skipEmptyString && e[o] === "", n = xd(a), r = {};
  for (const [o, s] of Object.entries(e))
    t(o) || (r[o] = s);
  const l = Object.keys(r);
  return a.sort !== !1 && l.sort(a.sort), l.map((o) => {
    const s = e[o];
    return s === void 0 ? "" : s === null ? Ke(o, a) : Array.isArray(s) ? s.length === 0 && a.arrayFormat === "bracket-separator" ? Ke(o, a) + "[]" : s.reduce(n(o), []).join("&") : Ke(o, a) + "=" + Ke(s, a);
  }).filter((o) => o.length > 0).join("&");
}
function fl(e, a) {
  var r;
  a = {
    decode: !0,
    ...a
  };
  let [t, n] = il(e, "#");
  return t === void 0 && (t = e), {
    url: ((r = t == null ? void 0 : t.split("?")) == null ? void 0 : r[0]) ?? "",
    query: Hn(Wn(e), a),
    ...a && a.parseFragmentIdentifier && n ? { fragmentIdentifier: Rt(n, a) } : {}
  };
}
function pl(e, a) {
  a = {
    encode: !0,
    strict: !0,
    [xn]: !0,
    ...a
  };
  const t = cl(e.url).split("?")[0] || "", n = Wn(e.url), r = {
    ...Hn(n, { sort: !1 }),
    ...e.query
  };
  let l = ml(r, a);
  l && (l = `?${l}`);
  let o = Pd(e.url);
  if (e.fragmentIdentifier) {
    const s = new URL(t);
    s.hash = e.fragmentIdentifier, o = a[xn] ? s.hash : `#${e.fragmentIdentifier}`;
  }
  return `${t}${l}${o}`;
}
function hl(e, a, t) {
  t = {
    parseFragmentIdentifier: !0,
    [xn]: !1,
    ...t
  };
  const { url: n, query: r, fragmentIdentifier: l } = fl(e, t);
  return pl({
    url: n,
    query: wd(r, a),
    fragmentIdentifier: l
  }, t);
}
function Od(e, a, t) {
  const n = Array.isArray(a) ? (r) => !a.includes(r) : (r, l) => !a(r, l);
  return hl(e, n, t);
}
const yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Od,
  extract: Wn,
  parse: Hn,
  parseUrl: fl,
  pick: hl,
  stringify: ml,
  stringifyUrl: pl
}, Symbol.toStringTag, { value: "Module" }));
let Na = null;
class $a {
  constructor() {
    z(this, "cancelTokenSource", null);
    z(this, "api", null);
    z(this, "baseUrl", null);
    z(this, "structure", null);
    z(this, "options", null);
    z(this, "errors", null);
    z(this, "errorBag", "listing");
    z(this, "globalCancel", !0);
    z(this, "attributes", at({
      query: {
        items: [],
        showing: 0,
        perPage: 0,
        total: 0
      },
      params: {
        page: 1
      },
      state: {
        list: null,
        filter: null
      }
    }));
    return new Proxy(this, {
      get(a, t, n) {
        if (Reflect.has(a, t))
          return Reflect.get(a, t, n);
        if (Reflect.has(a.attributes, t)) {
          const r = t.split(".");
          if (r.length > 1) {
            let l = a.attributes;
            for (let o = 0; o < r.length; o++)
              l = l[r[o]];
            return l ?? void 0;
          }
          return Reflect.get(a.attributes, t);
        }
      },
      set(a, t, n, r) {
        if (Reflect.has(a, t))
          return Reflect.set(a, t, n, r);
        if (Reflect.has(a.attributes, t)) {
          const l = t.split(".");
          if (l.length > 1) {
            let o = a.form;
            for (let s = 0; s < l.length - 1; s++)
              l[s] in o || (o[l[s]] = {}), o = o[l[s]];
            return o[l[l.length - 1]] === void 0 ? !1 : (o[l[l.length - 1]] = n, !0);
          }
          return Reflect.set(a.attributes, t, n);
        }
        return !1;
      }
    });
  }
  get config() {
    return {
      data: this.attributes.query.items,
      total: this.attributes.query.total,
      currentPage: this.attributes.params.page,
      perPage: this.attributes.query.perPage,
      loading: this.isLoading,
      paginated: !0,
      backendPagination: !0,
      striped: !0
    };
  }
  get events() {
    return {
      pageChange: (a) => this.onPageChange(a)
    };
  }
  get isFilterActive() {
    return this.attributes.state.filter;
  }
  get isEmpty() {
    return this.isLoaded && this.attributes.query.items.length === 0;
  }
  get isDirty() {
    return JSON.stringify(this.structure) !== JSON.stringify(this.attributes.params);
  }
  get isSearchEmpty() {
    return this.isLoaded && this.isDirty && this.attributes.query.items.length === 0;
  }
  get isResettable() {
    return JSON.stringify(this.attributes.params) !== JSON.stringify(this.structure);
  }
  get isLoaded() {
    return this.attributes.state.list === "loaded";
  }
  get isLoading() {
    return this.attributes.state.list === "loading";
  }
  get isFailure() {
    return this.attributes.state.list === "failed";
  }
  static create(a = {}, t = {}) {
    const n = new $a();
    return n.errors = oa(), n.errors.createBag(n.errorBag), n.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (r) => r
      },
      t
    ), n.setParameters(a), n.options.enableSearchUpdate && n.mergeSearch(), n.baseUrl = t.baseUrl, n;
  }
  setUrl(a) {
    return this.baseUrl = a, this;
  }
  setRouterInstance(a) {
    return this.options.router = a, this;
  }
  setParameters(a) {
    const t = JSON.parse(JSON.stringify(a));
    this.structure = Object.assign({}, t), this.attributes.params = at(a);
  }
  mergeSearch() {
    const a = yr.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    a.page && (a.page = Number(a.page)), Object.assign(this.attributes.params, this.structure, a);
  }
  // Retrieves the list without affecting the load state.
  async fetch(a, t) {
    const n = JSON.parse(JSON.stringify(this.attributes.params)), r = a || this.baseUrl, { data: l } = await Ae.get(r, {
      params: n,
      cancelToken: t
    });
    return l;
  }
  async reload(a) {
    const { data: t } = await Ae.get(a || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.attributes.params))
    });
    return Object.assign(this.attributes.query, t.query, {
      items: t.query.items.map((n) => this.transformItem(n))
    }), t;
  }
  refreshUrl() {
    const a = window.location.href.replace(/\?.*/, ""), t = JSON.parse(JSON.stringify(this.attributes.params)), n = Object.fromEntries(
      Object.entries(t).filter(([l, o]) => o != null)
    ), r = a + "?" + yr.stringify(n, { arrayFormat: "bracket" });
    if (this.options.router) {
      const l = this.options.router.currentRoute.path;
      this.options.router.push({
        path: l,
        query: { ...this.options.router.currentRoute.query, ...t }
      });
    } else
      window.history.pushState({}, "", r);
  }
  push(a) {
    this.attributes.query.items.push(this.transformItem(a));
  }
  transformItem(a) {
    return this.options.transformItem({
      ...a,
      states: {
        delete: new kt(),
        patch: new kt()
      }
    });
  }
  async load(a) {
    this.errors.clear(null, this.errorBag), this.globalCancel ? (Na && Na.cancel(), Na = Ae.CancelToken.source()) : (this.cancelTokenSource && this.cancelTokenSource.cancel(), this.cancelTokenSource = Ae.CancelToken.source()), this.loading(), this.attributes.query.items = [], this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let t = null;
    try {
      const n = JSON.parse(JSON.stringify(this.attributes.params)), r = a || this.baseUrl;
      if (t = (await Ae.get(r, {
        params: n,
        cancelToken: this.globalCancel ? Na.token : this.cancelTokenSource.token
      }).catch((o) => {
        throw this.failed(), o;
      })).data, !t || !t.query || !t.query.items)
        throw this.failed(), Error("Response format is invalid.");
      return this.loaded(), Object.assign(this.attributes.query, t.query, {
        items: t.query.items.map((o) => this.transformItem(o))
      }), t;
    } catch (n) {
      if (Ae.isCancel(n))
        this.loaded(), console.error("Request cancelled");
      else
        throw this.failed(), this.errors.set(n, this.errorBag), n;
    }
  }
  onPageChange(a) {
    return this.attributes.params.page = a, this.options.router ? Promise.resolve().then(() => {
      this.refreshUrl();
    }) : this.load().then(() => {
      this.refreshUrl();
    });
  }
  onQueryUpdate(a, t, n) {
    a.path === t.path && a.fullPath !== t.fullPath && this.load(), n();
  }
  async patch({ path: a, props: t, payload: n } = {}) {
    const { row: r } = t;
    n = {
      id: r.id,
      ...n
    };
    const { data: l } = await Ae.patch(a || this.baseUrl, n).catch((s) => {
      throw s;
    });
    return l.patch && Object.assign(r, l.patch), (await this.fetch()).query.items.length || (this.attributes.params.page--, await this.load()), l;
  }
  async destroy(a, { props: t, data: n, config: r, method: l = "delete" }) {
    let o;
    const { index: s, row: u } = t;
    u.isProcessing = !0, l === "delete" ? o = await Ae.delete(a, r) : l === "post" && (o = await Ae.post(a, n, r));
    const h = await this.fetch();
    if (h.query.items.find((g) => g.id === u.id))
      return u.isProcessing = !1, o.data;
    this.attributes.query.items.splice(s, 1);
    const p = this.attributes.query.items.map((g) => g.id);
    return h.query.items.filter(
      (g) => !p.includes(g.id)
    ).forEach((g) => this.attributes.query.items.push(g)), o.data;
  }
  async update(a, { props: t, data: n, config: r, method: l = "patch" }) {
    let o;
    const { index: s, row: u } = t;
    u.isProcessing = !0, l === "patch" ? o = await Ae.patch(a, r) : l === "post" && (o = await Ae.post(a, n, r));
    const h = await this.fetch(), f = h.query.items.find((g) => g.id === u.id);
    if (f)
      return u.isProcessing = !1, Object.assign(u, f), o.data;
    this.attributes.query.items.splice(s, 1);
    const p = this.attributes.query.items.map((g) => g.id);
    return h.query.items.filter(
      (g) => !p.includes(g.id)
    ).forEach((g) => this.attributes.query.items.push(g)), o.data;
  }
  async delete(a) {
    return this.processRowAndRefreshList({
      ...a,
      method: "delete",
      state: "delete"
    });
  }
  async restore(a) {
    return this.processRowAndRefreshList({
      ...a,
      method: "patch",
      state: "restore"
    });
  }
  async processRowAndRefreshList({ path: a, props: t, payload: n, state: r, method: l } = {}) {
    const { row: o, index: s } = t;
    n = {
      id: o.id,
      ...n
    };
    let u = o.states[r];
    u || (u = o.states[r] = kt.create()), u.loading();
    const { data: h } = await Ae[l](a || this.baseUrl, n).catch(
      (p) => {
        throw u.failed(), p;
      }
    );
    u.loaded(), h.row && Object.assign(o, h.row);
    const f = await this.fetch();
    if (this.attributes.query.items.splice(s, 1), !f.query.items.length)
      return this.attributes.params.page--, await this.load(), h;
    if (this.attributes.query.items.length < f.query.items.length) {
      const p = f.query.items[f.query.items.length - 1];
      this.push(p);
    }
    return h;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.loading(), this.cancelTokenSource = Ae.CancelToken.source(), this.attributes.query.items = [], this.attributes.params.page = 1, this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let a = null;
    try {
      const t = JSON.parse(JSON.stringify(this.attributes.params)), n = this.baseUrl;
      a = (await Ae.get(n, {
        params: t,
        cancelToken: this.cancelTokenSource.token
      }).catch((l) => {
        throw this.failed(), l;
      })).data;
    } catch (t) {
      if (Ae.isCancel(t)) {
        console.error("Request cancelled");
        return;
      } else
        throw this.failed(), this.errors.set(t, this.errorBag), t;
    }
    if (this.refreshUrl(), !a || !a.query || !a.query.items)
      throw this.failed(), Error("Response format is invalid.");
    Object.assign(this.attributes.query, a.query, {
      items: a.query.items.map((t) => this.transformItem(t))
    }), await mt(), this.loaded(), this.hideFilter();
  }
  showFilter() {
    this.attributes.state.filter = !0;
  }
  hideFilter() {
    this.attributes.state.filter = !1;
  }
  cancelFilter() {
    this.mergeSearch(), this.attributes.state.filter = !1;
  }
  resetFilter(a = null) {
    return Object.assign(this.attributes.params, this.structure), this.refreshUrl(), this.attributes.state.filter = !1, this.load(a);
  }
  getError(a) {
    return this.errors.get(a, this.errorBag);
  }
  clearError(a) {
    this.errors.clear(a, this.errorBag);
  }
  loaded() {
    this.attributes.state.list = "loaded";
  }
  loading() {
    this.attributes.state.list = "loading";
  }
  failed() {
    this.attributes.state.list = "failed";
  }
}
const Dd = {
  name: "WyxosForm",
  props: {
    form: {
      type: Yt,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: $a,
      default: null
    },
    reset: {
      type: [Boolean, Function],
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
      if (this.submit ? await this.submit(this.form) : await this.form.submit(), this.reset && (typeof this.reset == "function" ? this.reset() : this.form.reset()), this.$emit("submitted"), this.listing)
        return this.listing.reload();
    }
  }
};
function Md(e, a, t, n, r, l) {
  const o = Ye("o-loading"), s = Ye("o-button");
  return t.form.isLoaded ? (w(), I("form", {
    key: 0,
    class: ke(t.formClass),
    onSubmit: a[0] || (a[0] = Zt((u) => l.handle(), ["prevent"]))
  }, [
    oe(e.$slots, "default")
  ], 34)) : t.form.isLoading ? (w(), be(o, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (w(), be(s, {
    key: 2,
    onClick: a[1] || (a[1] = (u) => t.form.load())
  }, {
    default: me(() => [
      Be(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : j("", !0);
}
const Sd = /* @__PURE__ */ Ze(Dd, [["render", Md]]), Ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sd
}, Symbol.toStringTag, { value: "Module" })), $d = {
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
        const a = e.target.result;
        this.$refs.image.src = a, this.width = this.resize ? this.resize.width : a.width, this.height = this.resize ? this.resize.height : a.height, this.$emit("loaded");
      }, this.instance.readAsDataURL(this.src);
    },
    loadPath() {
      this.instance = new Image(), this.instance.onload = () => {
        this.$refs.image.src = this.src, this.width = this.resize ? this.resize.width : this.instance.width, this.height = this.resize ? this.resize.height : this.instance.height, this.$emit("loaded");
      }, this.instance.src = this.src;
    }
  }
}, Rd = ["width", "height"];
function Cd(e, a, t, n, r, l) {
  return w(), I("img", {
    ref: "image",
    src: "",
    alt: "",
    width: r.width,
    height: r.height
  }, null, 8, Rd);
}
const Fd = /* @__PURE__ */ Ze($d, [["render", Cd]]), Yd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fd
}, Symbol.toStringTag, { value: "Module" })), Nd = {
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
      type: Yt,
      default: null
    },
    disabled: {
      type: [Boolean, String],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    passwordReveal: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      errors: oa()
    };
  },
  computed: {
    getError() {
      if (this.name)
        return this.form ? this.form.getError(this.name) : this.errors.get(this.name, this.bag);
    }
  },
  methods: {
    onInput(e) {
      this.form ? this.form.clearError(this.name) : this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", e);
    }
  }
};
function Id(e, a, t, n, r, l) {
  const o = Ye("o-input"), s = Ye("o-field");
  return w(), be(s, Ee({
    class: t.fieldClass,
    label: t.label
  }, l.getError), {
    default: me(() => [
      Re(o, {
        class: ke(t.inputClass),
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        "password-reveal": t.passwordReveal,
        placeholder: t.placeholder,
        readonly: t.readonly,
        "root-class": t.inputRootClass,
        type: t.type,
        "onUpdate:modelValue": a[0] || (a[0] = (u) => l.onInput(u))
      }, null, 8, ["class", "clearable", "disabled", "model-value", "name", "password-reveal", "placeholder", "readonly", "root-class", "type"])
    ]),
    _: 1
  }, 16, ["class", "label"]);
}
const Ed = /* @__PURE__ */ Ze(Nd, [["render", Id]]), qd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ed
}, Symbol.toStringTag, { value: "Module" })), Ld = {
  name: "WyxosListing",
  props: {
    listing: {
      type: $a,
      required: !0
    }
  },
  computed: {
    allPropsAndEvents() {
      return {
        ...this.listing.config,
        ...Object.keys(this.listing.events).reduce((e, a) => (e[`on${a.charAt(0).toUpperCase() + a.slice(1)}`] = this.listing.events[a], e), {})
      };
    }
  }
}, Vd = { key: 0 }, Bd = { key: 1 }, jd = { key: 2 };
function Wd(e, a, t, n, r, l) {
  const o = Ye("o-table");
  return w(), be(o, ze(tt(l.allPropsAndEvents)), nt({
    empty: me(() => [
      t.listing.isEmpty ? (w(), I("p", Vd, "No records found.")) : j("", !0),
      t.listing.isSearchEmpty ? (w(), I("p", Bd, " No results for your query. Please adjust your search and try again. ")) : j("", !0),
      t.listing.isFailure ? (w(), I("p", jd, " Failure to load the list. Try again or reload the page. ")) : j("", !0)
    ]),
    _: 2
  }, [
    Fe(e.$slots, (s, u) => ({
      name: u,
      fn: me((h) => [
        oe(e.$slots, u, ze(tt(h)))
      ])
    }))
  ]), 1040);
}
const Hd = /* @__PURE__ */ Ze(Ld, [["render", Wd]]), zd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hd
}, Symbol.toStringTag, { value: "Module" })), Ud = {
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
      type: Yt,
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
      errors: oa()
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
function Qd(e, a, t, n, r, l) {
  const o = Ye("o-input"), s = Ye("o-field");
  return w(), be(s, Ee({
    label: t.label,
    class: t.fieldClass
  }, { ...l.getError() }), {
    default: me(() => [
      Re(o, {
        readonly: t.readonly,
        class: ke(t.inputClass),
        "root-class": t.inputRootClass,
        name: t.name,
        type: t.type,
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": a[0] || (a[0] = (u) => l.onInput(u))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const Gd = /* @__PURE__ */ Ze(Ud, [["render", Qd]]), Kd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gd
}, Symbol.toStringTag, { value: "Module" })), Xd = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: e } = await Ae.post(this.path).catch((a) => {
        throw a.response.status === 401 && (window.location.href = "/"), a;
      });
      window.location.href = (e == null ? void 0 : e.redirect) || "/";
    }
  }
};
function Jd(e, a, t, n, r, l) {
  return oe(e.$slots, "default", { logout: l.logout }, () => [
    ue("button", {
      class: "button is-primary",
      onClick: a[0] || (a[0] = (o) => l.logout())
    }, "Sign out")
  ]);
}
const Zd = /* @__PURE__ */ Ze(Xd, [["render", Jd]]), ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zd
}, Symbol.toStringTag, { value: "Module" })), tc = Je({
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
}), ac = ["value", "max"], nc = { key: 0 };
function rc(e, a, t, n, r, l) {
  return w(), I(xe, null, [
    ue("progress", {
      value: e.value,
      max: e.max
    }, null, 8, ac),
    e.showValue ? (w(), I("span", nc, De(e.value) + " / " + De(e.max), 1)) : j("", !0)
  ], 64);
}
const lc = /* @__PURE__ */ Ze(tc, [["render", rc]]), oc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lc
}, Symbol.toStringTag, { value: "Module" })), sc = {
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
      state: new kt()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((e) => {
        throw this.state.failed(), e;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, ic = { class: "flex gap-6" };
function uc(e, a, t, n, r, l) {
  const o = Ye("wyxos-button"), s = Ye("o-modal");
  return w(), be(s, {
    active: !0,
    onBlur: a[2] || (a[2] = (u) => e.$emit("close", { action: !1 }))
  }, {
    default: me(() => [
      ue("h2", null, De(t.title), 1),
      ue("p", null, De(t.message), 1),
      ue("div", ic, [
        Re(o, {
          disabled: n.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: a[0] || (a[0] = (u) => e.$emit("close", { action: !1 }))
        }, {
          default: me(() => [
            Be(De(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        Re(o, {
          loading: n.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: a[1] || (a[1] = (u) => l.proceed())
        }, {
          default: me(() => [
            Be(De(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const vl = /* @__PURE__ */ Ze(sc, [["render", uc]]), dc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vl
}, Symbol.toStringTag, { value: "Module" })), cc = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: $a,
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
      destroy: Yt.create()
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
}, mc = /* @__PURE__ */ ue("i", { class: "fas fa-trash" }, null, -1), fc = { class: "content p-6" }, pc = /* @__PURE__ */ ue("h3", { class: "title" }, "Delete", -1), hc = /* @__PURE__ */ ue("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), vc = { class: "buttons flex gap-6 justify-end" };
function yc(e, a, t, n, r, l) {
  const o = Ye("o-button"), s = Ye("w-button"), u = Ye("o-modal");
  return w(), be(s, {
    class: "button is-danger",
    onClick: a[3] || (a[3] = (h) => l.onRemove())
  }, {
    default: me(() => [
      oe(e.$slots, "button", {}, () => [
        mc
      ]),
      r.isVisible ? (w(), be(br, {
        key: 0,
        to: "body"
      }, [
        Re(u, {
          active: r.isVisible,
          "onUpdate:active": a[2] || (a[2] = (h) => r.isVisible = h)
        }, {
          default: me(() => [
            ue("div", fc, [
              oe(e.$slots, "title", {}, () => [
                pc
              ]),
              oe(e.$slots, "message", {}, () => [
                hc
              ]),
              ue("div", vc, [
                Re(o, {
                  class: "button is-secondary",
                  onClick: a[0] || (a[0] = (h) => r.isVisible = !1)
                }, {
                  default: me(() => [
                    Be("Cancel ")
                  ]),
                  _: 1
                }),
                Re(s, {
                  loading: n.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: a[1] || (a[1] = (h) => l.remove())
                }, {
                  default: me(() => [
                    oe(e.$slots, "confirm", {}, () => [
                      Be("Confirm")
                    ])
                  ]),
                  _: 3
                }, 8, ["loading"])
              ])
            ])
          ]),
          _: 3
        }, 8, ["active"])
      ])) : j("", !0)
    ]),
    _: 3
  });
}
const gc = /* @__PURE__ */ Ze(cc, [["render", yc]]), bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gc
}, Symbol.toStringTag, { value: "Module" })), wc = {
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
      type: Yt,
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
      var a;
      (a = this.form) == null || a.clearError(this.name), this.$emit("update:modelValue", e);
    }
  }
}, _c = ["value"];
function kc(e, a, t, n, r, l) {
  var u;
  const o = Ye("o-select"), s = Ye("o-field");
  return w(), be(s, Ee({ label: t.label }, (u = t.form) == null ? void 0 : u.getError(t.name)), {
    default: me(() => [
      Re(o, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": a[0] || (a[0] = (h) => l.updateValue(h))
      }, {
        default: me(() => [
          oe(e.$slots, "default", {}, () => [
            t.items ? (w(!0), I(xe, { key: 0 }, Fe(t.items, (h) => (w(), I("option", {
              key: h.value,
              value: h.value
            }, De(h.label), 9, _c))), 128)) : j("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const xc = /* @__PURE__ */ Ze(wc, [["render", kc]]), Tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xc
}, Symbol.toStringTag, { value: "Module" })), Pc = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: Yt.create({
        email: null,
        password: null
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
}, Oc = { class: "bg-white p-6" }, Dc = /* @__PURE__ */ ue("h2", { class: "title" }, "Session Expired", -1), Mc = /* @__PURE__ */ ue("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Sc = { class: "buttons" };
function Ac(e, a, t, n, r, l) {
  const o = Ye("wyxos-input"), s = Ye("w-button"), u = Ye("o-modal");
  return w(), be(u, { active: !0 }, {
    default: me(() => [
      ue("div", Oc, [
        Dc,
        Mc,
        ue("form", {
          onSubmit: a[3] || (a[3] = Zt((...h) => l.proceed && l.proceed(...h), ["prevent"]))
        }, [
          Re(o, {
            modelValue: n.login.email,
            "onUpdate:modelValue": a[0] || (a[0] = (h) => n.login.email = h),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          Re(o, {
            modelValue: n.login.password,
            "onUpdate:modelValue": a[1] || (a[1] = (h) => n.login.password = h),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          ue("div", Sc, [
            Re(s, {
              class: "button is-danger",
              disabled: n.login.isSubmitting,
              onClick: a[2] || (a[2] = (h) => l.onLogout())
            }, {
              default: me(() => [
                Be(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            Re(s, {
              class: "button is-primary",
              "native-type": "submit",
              loading: n.login.isSubmitting
            }, {
              default: me(() => [
                Be(" Login ")
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
const yl = /* @__PURE__ */ Ze(Pc, [["render", Ac]]), $c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yl
}, Symbol.toStringTag, { value: "Module" })), Rc = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: Yt,
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
}, Cc = { key: 0 }, Fc = { key: 1 }, Yc = /* @__PURE__ */ ue("i", { class: "fas fa-spinner fa-spin" }, null, -1), Nc = { key: 2 }, Ic = { key: 3 };
function Ec(e, a, t, n, r, l) {
  const o = Ye("o-button");
  return w(), be(o, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: me(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (w(), I("span", Cc, De(r.mergedLabels.submit), 1)) : j("", !0),
      t.form.isSubmitting ? (w(), I("span", Fc, [
        Be(De(r.mergedLabels.submitting) + " ", 1),
        Yc
      ])) : j("", !0),
      t.form.isSubmitted ? (w(), I("span", Nc, De(r.mergedLabels.submitted), 1)) : j("", !0),
      t.form.isSubmitFailed ? (w(), I("span", Ic, De(r.mergedLabels.failed), 1)) : j("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const qc = /* @__PURE__ */ Ze(Rc, [["render", Ec]]), Lc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qc
}, Symbol.toStringTag, { value: "Module" }));
class zn {
  constructor(a = {}) {
    z(this, "state", new kt());
    z(this, "result", K([]));
    z(this, "value", K(null));
    z(this, "timeout", null);
    z(this, "options", {
      url: null,
      payload: null,
      field: null
    });
    Object.assign(this.options, a);
  }
  get getConfig() {
    return {
      data: this.result.value,
      field: this.options.field,
      modelValue: this.value.value
    };
  }
  static create(a) {
    return new zn(a);
  }
  getEvents({ searchPayloadFormatter: a = null } = {}) {
    return {
      "update:model-value": (t) => (this.value.value = t, this.search(a))
    };
  }
  search(a) {
    const t = { value: this.value.value }, n = a ? a(t) : t;
    return this.customSearch({ payload: n });
  }
  async customSearch({ url: a, payload: t }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)), this.controller = new AbortController(), this.timeout = setTimeout(async () => {
      this.state.loading(), this.reset();
      const n = a || this.options.url, { data: r } = await Ae.post(`${n}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((l) => {
        throw this.state.failed(), l;
      });
      this.result.value = r.result, this.state.loaded();
    }, 500);
  }
  async restore(a, t) {
    this.state.loading(), this.reset();
    const n = a || this.options.url, { data: r } = await Ae.post(`${n}/restore`, t || this.options.payload).catch((l) => {
      throw this.state.failed(), l;
    });
    return this.state.loaded(), r;
  }
  reset() {
    this.result.value = [];
  }
}
const Vc = {
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
    },
    openOnFocus: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "update:query", "change"],
  setup() {
    return {
      search: zn.create()
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
      handler: async function(e, a) {
        this.isInternalChange ? this.isInternalChange = !1 : JSON.stringify(e) !== JSON.stringify(a) && this.restore();
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
          this.query.map((a) => this.formatter(a))
        ), this.$emit("update:query", this.query);
      }
    },
    onTagSearch(e) {
      return this.search.customSearch({
        url: this.path,
        payload: this.payloadFormatter({
          value: e,
          exclude: this.query.map((a) => this.excludeFormatter(a)).filter(Boolean)
        })
      });
    },
    onTagAdded() {
      this.isInternalChange = !0;
      const e = this.query.map((a) => this.formatter(a));
      this.$emit("update:modelValue", e), this.$emit("update:query", this.query), this.$emit("change");
    },
    onTagRemoved() {
      this.isInternalChange = !0;
      const e = this.query.map((a) => this.formatter(a));
      this.$emit("update:modelValue", e), this.$emit("update:query", this.query), this.$emit("change");
    },
    reset() {
      this.isInternalChange = !0, this.query = [], this.$emit("update:modelValue", this.query), this.$emit("update:query", this.query);
    },
    addItem() {
      this.$refs.tagInput.addItem();
    },
    focus() {
      console.log(this.openOnFocus), this.openOnFocus && this.onTagSearch("");
    }
  }
};
function Bc(e, a, t, n, r, l) {
  const o = Ye("o-taginput");
  return w(), be(o, Ee({
    ref: "tagInput",
    modelValue: r.query,
    "onUpdate:modelValue": a[0] || (a[0] = (s) => r.query = s),
    data: n.search.result.value,
    "open-on-focus": t.openOnFocus,
    "allow-autocomplete": ""
  }, e.$attrs, {
    onAdd: a[1] || (a[1] = (s) => l.onTagAdded(s)),
    onFocus: a[2] || (a[2] = (s) => l.onTagSearch("")),
    onRemove: a[3] || (a[3] = (s) => l.onTagRemoved(s)),
    onTyping: a[4] || (a[4] = (s) => l.onTagSearch(s))
  }), null, 16, ["modelValue", "data", "open-on-focus"]);
}
const jc = /* @__PURE__ */ Ze(Vc, [["render", Bc]]), Wc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jc
}, Symbol.toStringTag, { value: "Module" })), Hc = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, zc = { class: "bg-white p-6" }, Uc = /* @__PURE__ */ ue("h2", { class: "title" }, "Session expired", -1), Qc = /* @__PURE__ */ ue("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Gc = { class: "buttons" };
function Kc(e, a, t, n, r, l) {
  const o = Ye("w-button"), s = Ye("o-modal");
  return w(), be(s, { active: !0 }, {
    default: me(() => [
      ue("div", zc, [
        Uc,
        Qc,
        ue("div", Gc, [
          Re(o, {
            class: "button is-primary",
            onClick: a[0] || (a[0] = (u) => e.$emit("close", { action: !0 }))
          }, {
            default: me(() => [
              Be(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const gl = /* @__PURE__ */ Ze(Hc, [["render", Kc]]), Xc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gl
}, Symbol.toStringTag, { value: "Module" }));
class um {
  constructor(a) {
    this.data = new FormData(), this.form = a, this.copy = Object.assign({}, JSON.parse(JSON.stringify(a)));
  }
  static build(a, t) {
    return new this(a).files(t).get();
  }
  static callback(a) {
    return (t) => this.build(t, a).get();
  }
  files(a) {
    return a.forEach((t) => {
      typeof t == "object" ? (this.data.append(t.name, t.value), delete this.copy[t.name]) : this.form[t] && (this.data.append(t, this.form[t]), delete this.copy[t]);
    }), this;
  }
  add(a, t) {
    return this.data.append(a, t), this;
  }
  get() {
    return this.data.append("payload", JSON.stringify(this.copy)), this.data;
  }
}
class bl {
  constructor() {
    z(this, "state", K(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new bl();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class dm {
  static create(a, t = null, n = null) {
    return t = t || a, {
      value: a,
      label: t
    };
  }
}
class cm {
  constructor() {
    z(this, "structure", {});
    z(this, "query", at({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    z(this, "params", at({
      page: 1
    }));
    z(this, "router", null);
  }
  static create(a, t = {}, n = {}, r) {
    n = Object.assign(
      { base: "/api/admin", route: `${a}.index` },
      n
    );
    const l = n.base, o = {
      route: n.route,
      index: n.index || `${l}/${a}/index`,
      destroy: `${l}/${a}/destroy`
    }, s = new this();
    return s.options = n, s.structure = t, s.params = Object.assign(s.params, t), s.router = r, s.urls = o, s;
  }
  async fetch(a) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: t } = await Ae.get(a || this.urls.index, {
      params: this.params
    }).catch((n) => {
      throw this.query.isLoading = !1, n;
    });
    return await this.router.push({ name: this.urls.route, query: this.params }), this.query.isLoading = !1, this.query.isLoaded = !0, t;
  }
  async load(a) {
    const t = await this.fetch(a);
    return Object.assign(this.query, t.query, {
      items: t.query.items.map((n) => ({
        ...n,
        isProcessing: !1
      }))
    }), t;
  }
  onPageChange(a) {
    return this.params.page = a, this.load();
  }
  async action(a, { row: t, index: n, remove: r, method: l }, o = {}) {
    t.isProcessing = !0;
    const s = {
      id: t.id,
      ...o
    };
    if (l === "delete") {
      const { data: u } = await Ae.delete(a, {
        data: s
      }).catch((h) => {
        throw t.isProcessing = !1, h;
      });
      t.isProcessing = !1, u.row && Object.assign(t, u.row);
    } else {
      const { data: u } = await Ae.post(a, s).catch((h) => {
        throw t.isProcessing = !1, h;
      });
      t.isProcessing = !1, u.row && Object.assign(t, u.row);
    }
    if (r) {
      const u = await this.fetch();
      if (this.query.items.splice(n, 1), !u.query.items.length) {
        this.params.page--, await this.load();
        return;
      }
      this.query.items.length < u.query.items.length && this.query.items.push(u.query.items[u.query.items.length - 1]);
    }
  }
  destroy(a, t) {
    return this.action(this.urls.destroy, { ...a, remove: !0 }, t);
  }
  async resetFilter(a = null) {
    Object.assign(this.params, this.structure), this.query.isFilterActive = !1, await this.load(a);
  }
}
class mm {
  constructor(a) {
    z(this, "current", K(null));
    z(this, "history", K([]));
    z(this, "flow", []);
    this.current.value = a;
  }
  is(a) {
    return this.current.value === a;
  }
  isAny(...a) {
    return !!a.includes(this.current.value);
  }
  setFlow(a) {
    this.flow = a;
  }
  next() {
    const a = this.flow.findIndex((n) => n === this.getCurrent()), t = this.flow[a + 1];
    if (t) {
      this.set(t);
      return;
    }
    throw Error(`No step defined after ${this.getCurrent()}`);
  }
  set(a) {
    this.current.value = a, this.history.value.push(a);
  }
  previous() {
    this.history.value.pop(), this.current.value = this.history.value[this.history.value.length - 1];
  }
  getCurrent() {
    return this.current.value;
  }
  assign(a) {
    Object.assign(this, a);
  }
}
class wl {
  constructor(a) {
    z(this, "attributes", at({
      name: null
    }));
    z(this, "callbacks", {});
    this.attributes.name = a;
  }
  is(a) {
    return this.attributes.name === a;
  }
  onChange(a) {
    this.callbacks = a;
  }
  activeClass(a, t) {
    return {
      class: this.is(a) ? t : []
    };
  }
  set(a) {
    this.attributes.name = a, this.callbacks[a] && this.callbacks[a]();
  }
  assign(a) {
    Object.assign(this, a);
  }
  static create(a) {
    return new wl(a);
  }
}
class Jc {
  constructor() {
    z(this, "attributes", at({
      user: null
    }));
    z(this, "state", new kt());
    return new Proxy(this, {
      get(a, t, n) {
        return Reflect.has(a, t) ? Reflect.get(a, t, n) : t in a.attributes ? a.attributes[t] : null;
      },
      set(a, t, n, r) {
        return !Reflect.has(a, t) && !(t in a.attributes) ? (Reflect.set(a, t, n, r), !0) : t in a.attributes ? (a.attributes[t] = n, !0) : Reflect.set(a, t, n, r);
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
    this.loading(), await Ae.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: a } = await Ae.get("/api/user");
    if (!("user" in a))
      throw Error("Instance of user is not defined.");
    Object.keys(a).forEach((t) => {
      this.attributes[t] = a[t];
    }), this.loaded();
  }
  loading() {
    return this.state.loading();
  }
  loaded() {
    return this.state.loaded();
  }
  failed() {
    return this.state.failed();
  }
  reset() {
    this.attributes = at({
      user: null
    }), this.state.reset();
  }
}
const fm = new Jc();
async function pm(e = {}) {
  return (await Tn().modal.open({
    component: vl,
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
const Zc = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class em {
  constructor() {
    z(this, "FORMATS", Zc);
  }
  format(a, t, n = "") {
    return a ? _a(a).format(t) : n;
  }
}
const hm = new em();
async function tm(e, a) {
  var l, o, s, u, h, f;
  if ((e == null ? void 0 : e.code) === "ERR_CANCELED")
    return Promise.reject(e);
  const t = {
    401: "Authentication required. Please reload the page and sign in.",
    403: "You do not have permission to perform this action.",
    404: "The page or action you are looking for could not be found.",
    419: "Your session has likely expired. Try again or reload the page.",
    422: "The action attempted was invalid. Please review your input and try again.",
    500: "An unexpected error has occurred. This issue has been reported.",
    503: "The site is currently under maintenance. Please try again later."
  };
  Object.assign(t, (a == null ? void 0 : a.messages) || {});
  const n = t[(l = e.response) == null ? void 0 : l.status] || t[500], r = Tn();
  if (r.notification.open({
    message: n,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((o = e.response) == null ? void 0 : o.status) === 419) {
    r.modal.open({
      component: ((s = a.components) == null ? void 0 : s.TokenExpired) || gl,
      trapFocus: !0,
      closable: !1
    });
    const v = (await Ae.get("/heartbeat")).data.csrfToken;
    Ae.defaults.headers.common["X-CSRF-TOKEN"] = v;
  }
  return ((u = e.response) == null ? void 0 : u.status) === 401 && r.modal.open({
    component: ((h = a.components) == null ? void 0 : h.SessionExpired) || yl,
    trapFocus: !0,
    closable: !1
  }), ((f = e.response) == null ? void 0 : f.status) === 422 && new Promise((p) => setTimeout(p, 500)).then(() => {
    const p = document.querySelector(".o-field__label-danger");
    p && p.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(e);
}
function vm(e) {
  Tn().notification.open({
    message: e || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function am(e) {
  Ae.interceptors.response.use(null, (a) => tm(a, e));
}
const gr = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Nl, "./components/WyxosCollection.vue": Vl, "./components/WyxosConfirm.vue": Gl, "./components/WyxosDatepicker.vue": dd, "./components/WyxosError.vue": vd, "./components/WyxosForm.vue": Ad, "./components/WyxosImage.vue": Yd, "./components/WyxosInput.vue": qd, "./components/WyxosListing.vue": zd, "./components/WyxosLiveInput.vue": Kd, "./components/WyxosLogout.vue": ec, "./components/WyxosProgress.vue": oc, "./components/WyxosPrompt.vue": dc, "./components/WyxosRemove.vue": bc, "./components/WyxosSelect.vue": Tc, "./components/WyxosSessionExpired.vue": $c, "./components/WyxosSubmit.vue": Lc, "./components/WyxosTags.vue": Wc, "./components/WyxosTokenExpired.vue": Xc }), _l = {}, nm = (e, a = {}) => {
  a = { vision: {}, oruga: {}, use: { oruga: !0 }, ...a }, a.use.oruga && e.use($l, a.oruga), Object.keys(gr).forEach((t) => {
    const n = gr[t];
    if (n && n.default) {
      const r = n.default, l = r.name;
      l ? (e.component(l, r), e.component(l.replace("Wyxos", "W"), r), _l[l] = r) : console.error(`Component in '${t}' does not have a name property`);
    } else
      console.error(`Could not load component from '${t}'`);
  }), e.config.globalProperties.$v = {
    to: (t, n) => ({
      name: t,
      params: n
    })
  }, am(a);
}, ym = {
  install: nm,
  ..._l
};
export {
  um as FileRequest,
  Yt as FormBuilder,
  $a as Listing,
  kt as LoadState,
  bl as Modal,
  dm as Option,
  cm as ResourceList,
  zn as Search,
  mm as Steps,
  wl as Tab,
  Yl as WyxosButton,
  Ll as WyxosCollection,
  Ql as WyxosConfirm,
  ud as WyxosDatepicker,
  hd as WyxosError,
  Sd as WyxosForm,
  Fd as WyxosImage,
  Ed as WyxosInput,
  Hd as WyxosListing,
  Gd as WyxosLiveInput,
  Zd as WyxosLogout,
  lc as WyxosProgress,
  vl as WyxosPrompt,
  gc as WyxosRemove,
  xc as WyxosSelect,
  yl as WyxosSessionExpired,
  qc as WyxosSubmit,
  jc as WyxosTags,
  gl as WyxosTokenExpired,
  fm as auth,
  pm as confirm,
  hm as dateRender,
  ym as default,
  tm as errorHandler,
  vm as success,
  oa as useFormErrors
};
//# sourceMappingURL=vision.js.map
