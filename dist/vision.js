var Oe = Object.defineProperty;
var ve = (s, e, t) => e in s ? Oe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var d = (s, e, t) => (ve(s, typeof e != "symbol" ? e + "" : e, t), t);
import { resolveComponent as m, openBlock as c, createBlock as O, withCtx as g, renderSlot as j, createTextVNode as F, createCommentVNode as v, toDisplayString as _, createElementBlock as S, normalizeProps as U, guardReactiveProps as M, createElementVNode as f, reactive as q, createVNode as w, normalizeClass as N, mergeProps as P, defineComponent as re, nextTick as Fe, withModifiers as ie, createSlots as xe, renderList as ne, Fragment as ae, Teleport as qe, ref as I } from "vue";
import k from "moment";
import h from "axios";
import $e, { useOruga as Y } from "@oruga-ui/oruga-next";
const b = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, je = {
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
}, Ce = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Ee(s, e, t, r, i, n) {
  const a = m("o-button");
  return c(), O(a, { disabled: t.loading }, {
    default: g(() => [
      t.loading ? v("", !0) : j(s.$slots, "default", { key: 0 }, () => [
        F("Submit")
      ]),
      t.loading && t.text ? j(s.$slots, "loading", { key: 1 }, () => [
        F(_(t.text), 1)
      ]) : v("", !0),
      t.loading ? (c(), S("i", Ce)) : v("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const Te = /* @__PURE__ */ b(je, [["render", Ee]]), Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Te
}, Symbol.toStringTag, { value: "Module" })), Pe = {
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
    add(s) {
      this.items.push(s), this.$emit("update:modelValue", this.items);
    },
    remove(s) {
      this.items.splice(s, 1), this.$emit("update:modelValue", this.items);
    }
  }
}, Ve = /* @__PURE__ */ f("ul", null, [
  /* @__PURE__ */ f("li")
], -1);
function Le(s, e, t, r, i, n) {
  return j(s.$slots, "default", U(M({ add: n.add, remove: n.remove, items: i.items })), () => [
    Ve
  ]);
}
const ke = /* @__PURE__ */ b(Pe, [["render", Le]]), Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" }));
class C {
  constructor() {
    d(this, "state", q({
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
  isState(e) {
    return this.state[e];
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
    return new C();
  }
}
const Ae = {
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
      state: new C()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, We = { class: "bg-white p-6" }, Ne = { class: "title" }, Be = { class: "mb-6" }, Ue = {
  class: "buttons",
  role: "group"
};
function Me(s, e, t, r, i, n) {
  const a = m("wyxos-button"), o = m("o-modal");
  return c(), O(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      f("section", We, [
        f("article", null, [
          f("header", null, [
            f("h3", Ne, _(t.title), 1)
          ]),
          f("p", Be, _(t.message), 1),
          f("footer", Ue, [
            w(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: g(() => [
                F(_(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            w(a, {
              class: N([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => n.proceed())
            }, {
              default: g(() => [
                F(_(t.confirmText), 1)
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
const De = /* @__PURE__ */ b(Ae, [["render", Me]]), ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), E = q({
  default: []
});
function V() {
  return {
    createBag(s) {
      E[s] || (E[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      E[e] = Object.keys(s.response.data.errors).map((r) => ({
        key: r,
        message: s.response.data.errors[r][0]
      }));
    },
    setOne(s, e, t = "default") {
      const r = E[t];
      if (!r) {
        E[t] = [
          {
            key: s,
            message: e
          }
        ];
        return;
      }
      const i = r.findIndex((n) => n.key === s);
      if (i !== -1) {
        r[i].message = e;
        return;
      }
      r.push({
        key: s,
        message: e
      });
    },
    get(s, e = "default") {
      const t = E[e];
      if (!t)
        return {
          message: "",
          variant: ""
        };
      const r = t.find(
        (i) => Array.isArray(s) ? s.includes(i.key) : i.key === s
      );
      return r ? {
        message: r.message,
        variant: "danger"
      } : {
        message: "",
        variant: ""
      };
    },
    clear(s = null, e = "default") {
      if (console.log("Clearing error", s, "in bag", e, E), s) {
        const t = E[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((i) => i.key === s);
        r !== -1 && t.splice(r, 1);
        return;
      }
      E[e] = [];
    },
    all(s = "default") {
      return E[s];
    }
  };
}
class R {
  constructor(e = {}) {
    d(this, "errors", null);
    d(this, "errorBag", "default");
    d(this, "model", q({}));
    d(this, "form", q({}));
    d(this, "original", {});
    d(this, "states", {
      load: C.create(),
      submit: C.create()
    });
    d(this, "paths", {
      load: null,
      submit: null
    });
    // Add an abort controller property
    d(this, "abortController", null);
    d(this, "timeout", null);
    return this.errors = V(), this.errors.createBag(this.errorBag), this.setAttributes(e), this.loaded(), new Proxy(this, {
      get(t, r, i) {
        if (Reflect.has(t, r))
          return Reflect.get(t, r, i);
        if (Reflect.has(t.form, r)) {
          const n = r.split(".");
          if (n.length > 1) {
            let a = t.form;
            for (let o = 0; o < n.length; o++)
              a = a[n[o]];
            return a ?? void 0;
          }
          return Reflect.get(t.form, r);
        }
      },
      set(t, r, i, n) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, i, n);
        if (Reflect.has(t.form, r)) {
          const a = r.split(".");
          if (a.length > 1) {
            let o = t.form;
            for (let l = 0; l < a.length - 1; l++)
              a[l] in o || (o[a[l]] = {}), o = o[a[l]];
            return o[a[a.length - 1]] === void 0 ? !1 : (o[a[a.length - 1]] = i, !0);
          }
          return Reflect.set(t.form, r, i);
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
  static create(e) {
    return new this(e);
  }
  setPaths(e = {}) {
    return Object.assign(this.paths, e), this;
  }
  setLoad(e) {
    return this.paths.load = e, this;
  }
  setSubmit(e) {
    return this.paths.submit = e, this;
  }
  setErrors(e) {
    this.errorBag = e || "default", this.errors = V(), this.errors.createBag(this.errorBag);
  }
  setAttributes(e) {
    this.original = e, this.form = q({ ...e });
  }
  getError(e) {
    return this.errors.get(e, this.errorBag);
  }
  clearError(e) {
    this.errors.clear(e, this.errorBag);
  }
  get(e = null, { formatter: t = null, ...r } = {}) {
    return this.submitRequest("get", e, { formatter: t, ...r });
  }
  post(e = null, { formatter: t = null, ...r } = {}) {
    return this.submitRequest("post", e, { formatter: t, ...r });
  }
  submit(e = null, { formatter: t = null, ...r } = {}) {
    if (e = e || this.paths.submit, !e)
      throw Error("No valid URL defined for submit method.");
    return this.submitRequest("post", e, { formatter: t, ...r });
  }
  delete(e = null, { formatter: t = null, ...r } = {}) {
    return this.submitRequest("delete", e, { formatter: t, ...r });
  }
  put(e = null, { formatter: t = null, ...r } = {}) {
    return this.submitRequest("put", e, { formatter: t, ...r });
  }
  patch(e, { formatter: t = null, ...r } = {}) {
    return this.submitRequest("patch", e, { formatter: t, ...r });
  }
  submitRequest(e, t = null, { formatter: r = null, ...i } = {}) {
    if (t && typeof t != "string")
      throw new Error("Path must be a string");
    if (r !== null && typeof r != "function")
      throw new Error("Formatter must be a function");
    this.abortController && this.abortController.abort(), this.abortController = new AbortController(), i.signal = this.abortController.signal, this.clearErrors(), this.submitting();
    const n = r ? r(this.form) : { ...this.form };
    let a;
    return ["get", "delete"].includes(e) ? (i.params = n, a = h[e](t, i)) : a = h[e](t, n, i), a.then((o) => (this.abortController = null, this.clearErrors(), this.submitted(), o.data)).catch((o) => (o.name === "AbortError" ? console.log("Request aborted:", o.message) : (this.submitFailed(), this.errors.set(o, this.errorBag)), Promise.reject(o)));
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(e) {
    this.submitFailed(), this.errors.set(e, this.errorBag);
  }
  async advancedSubmit(e) {
    this.states.submit.loading();
    const { data: t } = await Promise.resolve(e(h, this.form)).catch(
      (r) => {
        throw this.states.submit.failed(), this.errors.set(r, this.errorBag), r;
      }
    );
    return this.states.submit.loaded(), t;
  }
  async load(e = "", { updateLoading: t = !0, updateOriginal: r = !0, ...i } = {}) {
    this.clearErrors(), this.states.load.loading();
    try {
      const { data: n } = await h.get(e || this.paths.load, i);
      return r && Object.assign(this.original, n.form), Object.assign(this.form, n.form), n.model && Object.assign(this.model, n.model), t && this.loaded(), n;
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
  resetOnly(e) {
    if (!Array.isArray(e))
      throw new Error("The keys should be an array.");
    e.forEach((t) => {
      Object.prototype.hasOwnProperty.call(this.original, t) && (this.form[t] = this.original[t]);
    });
  }
  resetExcept(e) {
    if (!Array.isArray(e))
      throw new Error("The keys should be an array.");
    Object.keys(this.form).forEach((t) => {
      console.log("key", t, !e.includes(t), this.original[t]), e.includes(t) || (this.form[t] = this.original[t]);
    });
  }
  delay(e = 0, t) {
    clearTimeout(this.timeout), this.timeout = setTimeout(t, e);
  }
  toJson() {
    return JSON.parse(JSON.stringify(this.form));
  }
}
const Ye = {
  name: "WyxosDatepicker",
  // components: {
  //   VueDatePicker
  // },
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
      type: R,
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
      handler(s) {
        this.query = s ? k(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = k(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? k(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? k(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function Je(s, e, t, r, i, n) {
  var l;
  const a = m("o-datepicker"), o = m("o-field");
  return c(), O(o, P({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      w(a, P({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (u) => i.query = u),
        "date-formatter": n.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": n.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const He = /* @__PURE__ */ b(Ye, [["render", Je]]), Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" })), Qe = re({
  name: "WyxosError",
  props: {
    form: {
      type: R,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: V()
    };
  }
}), Xe = { key: 0 }, Ge = { key: 1 };
function Ze(s, e, t, r, i, n) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (c(), S("p", Xe, _(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (c(), S("p", Ge, _(s.errors.get(s.name).message), 1)) : v("", !0);
}
const et = /* @__PURE__ */ b(Qe, [["render", Ze]]), tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), oe = "%[a-f0-9]{2}", G = new RegExp("(" + oe + ")|([^%]+?)", "gi"), Z = new RegExp("(" + oe + ")+", "gi");
function D(s, e) {
  try {
    return [decodeURIComponent(s.join(""))];
  } catch {
  }
  if (s.length === 1)
    return s;
  e = e || 1;
  const t = s.slice(0, e), r = s.slice(e);
  return Array.prototype.concat.call([], D(t), D(r));
}
function st(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(G) || [];
    for (let t = 1; t < e.length; t++)
      s = D(e, t).join(""), e = s.match(G) || [];
    return s;
  }
}
function rt(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = Z.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = st(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = Z.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const i of r)
    s = s.replace(new RegExp(i, "g"), e[i]);
  return s;
}
function it(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return rt(s);
  }
}
function le(s, e) {
  if (!(typeof s == "string" && typeof e == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (s === "" || e === "")
    return [];
  const t = s.indexOf(e);
  return t === -1 ? [] : [
    s.slice(0, t),
    s.slice(t + e.length)
  ];
}
function nt(s, e) {
  const t = {};
  if (Array.isArray(e))
    for (const r of e) {
      const i = Object.getOwnPropertyDescriptor(s, r);
      i != null && i.enumerable && Object.defineProperty(t, r, i);
    }
  else
    for (const r of Reflect.ownKeys(s)) {
      const i = Object.getOwnPropertyDescriptor(s, r);
      if (i.enumerable) {
        const n = s[r];
        e(r, n, s) && Object.defineProperty(t, r, i);
      }
    }
  return t;
}
const at = (s) => s == null, ot = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), z = Symbol("encodeFragmentIdentifier");
function lt(s) {
  switch (s.arrayFormat) {
    case "index":
      return (e) => (t, r) => {
        const i = t.length;
        return r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
          ...t,
          [p(e, s), "[", i, "]"].join("")
        ] : [
          ...t,
          [p(e, s), "[", p(i, s), "]=", p(r, s)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [p(e, s), "[]"].join("")
      ] : [
        ...t,
        [p(e, s), "[]=", p(r, s)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [p(e, s), ":list="].join("")
      ] : [
        ...t,
        [p(e, s), ":list=", p(r, s)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = s.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (r, i) => i === void 0 || s.skipNull && i === null || s.skipEmptyString && i === "" ? r : (i = i === null ? "" : i, r.length === 0 ? [[p(t, s), e, p(i, s)].join("")] : [[r, p(i, s)].join(s.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        p(e, s)
      ] : [
        ...t,
        [p(e, s), "=", p(r, s)].join("")
      ];
  }
}
function ut(s) {
  let e;
  switch (s.arrayFormat) {
    case "index":
      return (t, r, i) => {
        if (e = /\[(\d*)]$/.exec(t), t = t.replace(/\[\d*]$/, ""), !e) {
          i[t] = r;
          return;
        }
        i[t] === void 0 && (i[t] = {}), i[t][e[1]] = r;
      };
    case "bracket":
      return (t, r, i) => {
        if (e = /(\[])$/.exec(t), t = t.replace(/\[]$/, ""), !e) {
          i[t] = r;
          return;
        }
        if (i[t] === void 0) {
          i[t] = [r];
          return;
        }
        i[t] = [...i[t], r];
      };
    case "colon-list-separator":
      return (t, r, i) => {
        if (e = /(:list)$/.exec(t), t = t.replace(/:list$/, ""), !e) {
          i[t] = r;
          return;
        }
        if (i[t] === void 0) {
          i[t] = [r];
          return;
        }
        i[t] = [...i[t], r];
      };
    case "comma":
    case "separator":
      return (t, r, i) => {
        const n = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !n && T(r, s).includes(s.arrayFormatSeparator);
        r = a ? T(r, s) : r;
        const o = n || a ? r.split(s.arrayFormatSeparator).map((l) => T(l, s)) : r === null ? r : T(r, s);
        i[t] = o;
      };
    case "bracket-separator":
      return (t, r, i) => {
        const n = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !n) {
          i[t] = r && T(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => T(o, s));
        if (i[t] === void 0) {
          i[t] = a;
          return;
        }
        i[t] = [...i[t], ...a];
      };
    default:
      return (t, r, i) => {
        if (i[t] === void 0) {
          i[t] = r;
          return;
        }
        i[t] = [...[i[t]].flat(), r];
      };
  }
}
function ue(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function p(s, e) {
  return e.encode ? e.strict ? ot(s) : encodeURIComponent(s) : s;
}
function T(s, e) {
  return e.decode ? it(s) : s;
}
function de(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? de(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function ce(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function dt(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function ee(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function J(s) {
  s = ce(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function H(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, ue(e.arrayFormatSeparator);
  const t = ut(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const n = e.decode ? i.replace(/\+/g, " ") : i;
    let [a, o] = le(n, "=");
    a === void 0 && (a = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : T(o, e), t(T(a, e), o, r);
  }
  for (const [i, n] of Object.entries(r))
    if (typeof n == "object" && n !== null)
      for (const [a, o] of Object.entries(n))
        n[a] = ee(o, e);
    else
      r[i] = ee(n, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((i, n) => {
    const a = r[n];
    return i[n] = a && typeof a == "object" && !Array.isArray(a) ? de(a) : a, i;
  }, /* @__PURE__ */ Object.create(null));
}
function he(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, ue(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && at(s[a]) || e.skipEmptyString && s[a] === "", r = lt(e), i = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (i[a] = o);
  const n = Object.keys(i);
  return e.sort !== !1 && n.sort(e.sort), n.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? p(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? p(a, e) + "[]" : o.reduce(r(a), []).join("&") : p(a, e) + "=" + p(o, e);
  }).filter((a) => a.length > 0).join("&");
}
function fe(s, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = le(s, "#");
  return t === void 0 && (t = s), {
    url: ((i = t == null ? void 0 : t.split("?")) == null ? void 0 : i[0]) ?? "",
    query: H(J(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: T(r, e) } : {}
  };
}
function me(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [z]: !0,
    ...e
  };
  const t = ce(s.url).split("?")[0] || "", r = J(s.url), i = {
    ...H(r, { sort: !1 }),
    ...s.query
  };
  let n = he(i, e);
  n && (n = `?${n}`);
  let a = dt(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[z] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${n}${a}`;
}
function ge(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [z]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: n } = fe(s, t);
  return me({
    url: r,
    query: nt(i, e),
    fragmentIdentifier: n
  }, t);
}
function ct(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, n) => !e(i, n);
  return ge(s, r, t);
}
const te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: ct,
  extract: J,
  parse: H,
  parseUrl: fe,
  pick: ge,
  stringify: he,
  stringifyUrl: me
}, Symbol.toStringTag, { value: "Module" }));
let W = null;
class A {
  constructor() {
    d(this, "cancelTokenSource", null);
    d(this, "api", null);
    d(this, "baseUrl", null);
    d(this, "structure", null);
    d(this, "options", null);
    d(this, "errors", null);
    d(this, "errorBag", "listing");
    d(this, "globalCancel", !0);
    d(this, "attributes", q({
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
      get(e, t, r) {
        if (Reflect.has(e, t))
          return Reflect.get(e, t, r);
        if (Reflect.has(e.attributes, t)) {
          const i = t.split(".");
          if (i.length > 1) {
            let n = e.attributes;
            for (let a = 0; a < i.length; a++)
              n = n[i[a]];
            return n ?? void 0;
          }
          return Reflect.get(e.attributes, t);
        }
      },
      set(e, t, r, i) {
        if (Reflect.has(e, t))
          return Reflect.set(e, t, r, i);
        if (Reflect.has(e.attributes, t)) {
          const n = t.split(".");
          if (n.length > 1) {
            let a = e.form;
            for (let o = 0; o < n.length - 1; o++)
              n[o] in a || (a[n[o]] = {}), a = a[n[o]];
            return a[n[n.length - 1]] === void 0 ? !1 : (a[n[n.length - 1]] = r, !0);
          }
          return Reflect.set(e.attributes, t, r);
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
      pageChange: (e) => this.onPageChange(e)
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
  static create(e = {}, t = {}) {
    const r = new A();
    return r.errors = V(), r.errors.createBag(r.errorBag), r.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (i) => i
      },
      t
    ), r.setParameters(e), r.options.enableSearchUpdate && r.mergeSearch(), r.baseUrl = t.baseUrl, r;
  }
  setUrl(e) {
    return this.baseUrl = e, this;
  }
  setRouterInstance(e) {
    return this.options.router = e, this;
  }
  setParameters(e) {
    const t = JSON.parse(JSON.stringify(e));
    this.structure = Object.assign({}, t), this.attributes.params = q(e);
  }
  mergeSearch() {
    const e = te.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    e.page && (e.page = Number(e.page)), Object.assign(this.attributes.params, this.structure, e);
  }
  // Retrieves the list without affecting the load state.
  async fetch(e, t) {
    const r = JSON.parse(JSON.stringify(this.attributes.params)), i = e || this.baseUrl, { data: n } = await h.get(i, {
      params: r,
      cancelToken: t
    });
    return n;
  }
  async reload(e) {
    const { data: t } = await h.get(e || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.attributes.params))
    });
    return Object.assign(this.attributes.query, t.query, {
      items: t.query.items.map((r) => this.transformItem(r))
    }), t;
  }
  refreshUrl() {
    const e = window.location.href.replace(/\?.*/, ""), t = JSON.parse(JSON.stringify(this.attributes.params)), r = Object.fromEntries(
      Object.entries(t).filter(([n, a]) => a != null)
    ), i = e + "?" + te.stringify(r, { arrayFormat: "bracket" });
    if (this.options.router) {
      const n = this.options.router.currentRoute.path;
      this.options.router.push({
        path: n,
        query: { ...this.options.router.currentRoute.query, ...t }
      });
    } else
      window.history.pushState({}, "", i);
  }
  push(e) {
    this.attributes.query.items.push(this.transformItem(e));
  }
  transformItem(e) {
    return this.options.transformItem({
      ...e,
      states: {
        delete: new C(),
        patch: new C()
      }
    });
  }
  async load(e) {
    this.errors.clear(null, this.errorBag), this.globalCancel ? (W && W.cancel(), W = h.CancelToken.source()) : (this.cancelTokenSource && this.cancelTokenSource.cancel(), this.cancelTokenSource = h.CancelToken.source()), this.loading(), this.attributes.query.items = [], this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let t = null;
    try {
      const r = JSON.parse(JSON.stringify(this.attributes.params)), i = e || this.baseUrl;
      if (t = (await h.get(i, {
        params: r,
        cancelToken: this.globalCancel ? W.token : this.cancelTokenSource.token
      }).catch((a) => {
        throw this.failed(), a;
      })).data, !t || !t.query || !t.query.items)
        throw this.failed(), Error("Response format is invalid.");
      return this.loaded(), Object.assign(this.attributes.query, t.query, {
        items: t.query.items.map((a) => this.transformItem(a))
      }), t;
    } catch (r) {
      if (h.isCancel(r))
        this.loaded(), console.error("Request cancelled");
      else
        throw this.failed(), this.errors.set(r, this.errorBag), r;
    }
  }
  onPageChange(e) {
    return this.attributes.params.page = e, this.options.router ? Promise.resolve().then(() => {
      this.refreshUrl();
    }) : this.load().then(() => {
      this.refreshUrl();
    });
  }
  onQueryUpdate(e, t, r) {
    e.path === t.path && e.fullPath !== t.fullPath && this.load(), r();
  }
  async patch({ path: e, props: t, payload: r } = {}) {
    const { row: i } = t;
    r = {
      id: i.id,
      ...r
    };
    const { data: n } = await h.patch(e || this.baseUrl, r).catch((o) => {
      throw o;
    });
    return n.patch && Object.assign(i, n.patch), (await this.fetch()).query.items.length || (this.attributes.params.page--, await this.load()), n;
  }
  async destroy(e, { props: t, data: r, config: i, method: n = "delete" }) {
    let a;
    const { index: o, row: l } = t;
    l.isProcessing = !0, n === "delete" ? a = await h.delete(e, i) : n === "post" && (a = await h.post(e, r, i));
    const u = await this.fetch();
    if (u.query.items.find((y) => y.id === l.id))
      return l.isProcessing = !1, a.data;
    this.attributes.query.items.splice(o, 1);
    const x = this.attributes.query.items.map((y) => y.id);
    return u.query.items.filter(
      (y) => !x.includes(y.id)
    ).forEach((y) => this.attributes.query.items.push(y)), a.data;
  }
  async update(e, { props: t, data: r, config: i, method: n = "patch" }) {
    let a;
    const { index: o, row: l } = t;
    l.isProcessing = !0, n === "patch" ? a = await h.patch(e, i) : n === "post" && (a = await h.post(e, r, i));
    const u = await this.fetch(), $ = u.query.items.find((y) => y.id === l.id);
    if ($)
      return l.isProcessing = !1, Object.assign(l, $), a.data;
    this.attributes.query.items.splice(o, 1);
    const x = this.attributes.query.items.map((y) => y.id);
    return u.query.items.filter(
      (y) => !x.includes(y.id)
    ).forEach((y) => this.attributes.query.items.push(y)), a.data;
  }
  async delete(e) {
    return this.processRowAndRefreshList({
      ...e,
      method: "delete",
      state: "delete"
    });
  }
  async restore(e) {
    return this.processRowAndRefreshList({
      ...e,
      method: "patch",
      state: "restore"
    });
  }
  async processRowAndRefreshList({ path: e, props: t, payload: r, state: i, method: n } = {}) {
    const { row: a, index: o } = t;
    r = {
      id: a.id,
      ...r
    };
    let l = a.states[i];
    l || (l = a.states[i] = C.create()), l.loading();
    const { data: u } = await h[n](e || this.baseUrl, r).catch(
      (x) => {
        throw l.failed(), x;
      }
    );
    l.loaded(), u.row && Object.assign(a, u.row);
    const $ = await this.fetch();
    if (this.attributes.query.items.splice(o, 1), !$.query.items.length)
      return this.attributes.params.page--, await this.load(), u;
    if (this.attributes.query.items.length < $.query.items.length) {
      const x = $.query.items[$.query.items.length - 1];
      this.push(x);
    }
    return u;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.loading(), this.cancelTokenSource = h.CancelToken.source(), this.attributes.query.items = [], this.attributes.params.page = 1, this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let e = null;
    try {
      const t = JSON.parse(JSON.stringify(this.attributes.params)), r = this.baseUrl;
      e = (await h.get(r, {
        params: t,
        cancelToken: this.cancelTokenSource.token
      }).catch((n) => {
        throw this.failed(), n;
      })).data;
    } catch (t) {
      if (h.isCancel(t)) {
        console.error("Request cancelled");
        return;
      } else
        throw this.failed(), this.errors.set(t, this.errorBag), t;
    }
    if (this.refreshUrl(), !e || !e.query || !e.query.items)
      throw this.failed(), Error("Response format is invalid.");
    Object.assign(this.attributes.query, e.query, {
      items: e.query.items.map((t) => this.transformItem(t))
    }), await Fe(), this.loaded(), this.hideFilter();
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
  resetFilter(e = null) {
    return Object.assign(this.attributes.params, this.structure), this.refreshUrl(), this.attributes.state.filter = !1, this.load(e);
  }
  getError(e) {
    return this.errors.get(e, this.errorBag);
  }
  clearError(e) {
    this.errors.clear(e, this.errorBag);
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
const ht = {
  name: "WyxosForm",
  props: {
    form: {
      type: R,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: A,
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
function ft(s, e, t, r, i, n) {
  const a = m("o-loading"), o = m("o-button");
  return t.form.isLoaded ? (c(), S("form", {
    key: 0,
    class: N(t.formClass),
    onSubmit: e[0] || (e[0] = ie((l) => n.handle(), ["prevent"]))
  }, [
    j(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (c(), O(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (c(), O(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: g(() => [
      F(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : v("", !0);
}
const mt = /* @__PURE__ */ b(ht, [["render", ft]]), gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" })), pt = {
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
      this.instance = new FileReader(), this.instance.onload = (s) => {
        const e = s.target.result;
        this.$refs.image.src = e, this.width = this.resize ? this.resize.width : e.width, this.height = this.resize ? this.resize.height : e.height, this.$emit("loaded");
      }, this.instance.readAsDataURL(this.src);
    },
    loadPath() {
      this.instance = new Image(), this.instance.onload = () => {
        this.$refs.image.src = this.src, this.width = this.resize ? this.resize.width : this.instance.width, this.height = this.resize ? this.resize.height : this.instance.height, this.$emit("loaded");
      }, this.instance.src = this.src;
    }
  }
}, yt = ["width", "height"];
function bt(s, e, t, r, i, n) {
  return c(), S("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, yt);
}
const _t = /* @__PURE__ */ b(pt, [["render", bt]]), St = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _t
}, Symbol.toStringTag, { value: "Module" })), wt = {
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
      type: R,
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
      errors: V()
    };
  },
  computed: {
    getError() {
      if (this.name)
        return this.form ? this.form.getError(this.name) : this.errors.get(this.name, this.bag);
    }
  },
  methods: {
    onInput(s) {
      this.form ? this.form.clearError(this.name) : this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", s);
    }
  }
};
function Ot(s, e, t, r, i, n) {
  const a = m("o-input"), o = m("o-field");
  return c(), O(o, P({
    class: t.fieldClass,
    label: t.label
  }, n.getError), {
    default: g(() => [
      w(a, {
        class: N(t.inputClass),
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        "password-reveal": t.passwordReveal,
        placeholder: t.placeholder,
        readonly: t.readonly,
        "root-class": t.inputRootClass,
        type: t.type,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => n.onInput(l))
      }, null, 8, ["class", "clearable", "disabled", "model-value", "name", "password-reveal", "placeholder", "readonly", "root-class", "type"])
    ]),
    _: 1
  }, 16, ["class", "label"]);
}
const vt = /* @__PURE__ */ b(wt, [["render", Ot]]), Ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vt
}, Symbol.toStringTag, { value: "Module" })), xt = {
  name: "WyxosListing",
  props: {
    listing: {
      type: A,
      required: !0
    }
  },
  computed: {
    allPropsAndEvents() {
      return {
        ...this.listing.config,
        ...Object.keys(this.listing.events).reduce((s, e) => (s[`on${e.charAt(0).toUpperCase() + e.slice(1)}`] = this.listing.events[e], s), {})
      };
    }
  }
}, qt = { key: 0 }, $t = { key: 1 }, jt = { key: 2 };
function Ct(s, e, t, r, i, n) {
  const a = m("o-table");
  return c(), O(a, U(M(n.allPropsAndEvents)), xe({
    empty: g(() => [
      t.listing.isEmpty ? (c(), S("p", qt, "No records found.")) : v("", !0),
      t.listing.isSearchEmpty ? (c(), S("p", $t, " No results for your query. Please adjust your search and try again. ")) : v("", !0),
      t.listing.isFailure ? (c(), S("p", jt, " Failure to load the list. Try again or reload the page. ")) : v("", !0)
    ]),
    _: 2
  }, [
    ne(s.$slots, (o, l) => ({
      name: l,
      fn: g((u) => [
        j(s.$slots, l, U(M(u)))
      ])
    }))
  ]), 1040);
}
const Et = /* @__PURE__ */ b(xt, [["render", Ct]]), Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" })), Rt = {
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
      type: R,
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
      errors: V()
    };
  },
  methods: {
    onInput(s) {
      if (!this.name) {
        this.$emit("update:modelValue", s);
        return;
      }
      if (this.form)
        return this.form.clearError(this.name), this.form.submit(null, {
          formatter: () => ({ field: this.name, value: s })
        });
      this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", s);
    },
    getError() {
      if (this.name)
        return this.form ? this.form.getError(this.name) : this.errors.get(this.name);
    }
  }
};
function Pt(s, e, t, r, i, n) {
  const a = m("o-input"), o = m("o-field");
  return c(), O(o, P({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: g(() => [
      w(a, {
        readonly: t.readonly,
        class: N(t.inputClass),
        "root-class": t.inputRootClass,
        name: t.name,
        type: t.type,
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => n.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const Vt = /* @__PURE__ */ b(Rt, [["render", Pt]]), Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vt
}, Symbol.toStringTag, { value: "Module" })), kt = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await h.post(this.path).catch((e) => {
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function It(s, e, t, r, i, n) {
  return j(s.$slots, "default", { logout: n.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => n.logout())
    }, "Sign out")
  ]);
}
const At = /* @__PURE__ */ b(kt, [["render", It]]), Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: At
}, Symbol.toStringTag, { value: "Module" })), Nt = re({
  name: "WyxosProgress",
  props: {
    showValue: {
      type: Boolean,
      default: !0
    },
    modelValue: {
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
}), Bt = ["max", "value"], Ut = { key: 0 };
function Mt(s, e, t, r, i, n) {
  return c(), S(ae, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, Bt),
    s.showValue ? (c(), S("span", Ut, _(s.modelValue) + " / " + _(s.max), 1)) : v("", !0)
  ], 64);
}
const Dt = /* @__PURE__ */ b(Nt, [["render", Mt]]), zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dt
}, Symbol.toStringTag, { value: "Module" })), Yt = {
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
      state: new C()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Jt = { class: "flex gap-6" };
function Ht(s, e, t, r, i, n) {
  const a = m("wyxos-button"), o = m("o-modal");
  return c(), O(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      f("h2", null, _(t.title), 1),
      f("p", null, _(t.message), 1),
      f("div", Jt, [
        w(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: g(() => [
            F(_(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        w(a, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => n.proceed())
        }, {
          default: g(() => [
            F(_(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const pe = /* @__PURE__ */ b(Yt, [["render", Ht]]), Kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pe
}, Symbol.toStringTag, { value: "Module" })), Qt = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: A,
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
      destroy: R.create()
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
}, Xt = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), Gt = { class: "content p-6" }, Zt = /* @__PURE__ */ f("h3", { class: "title" }, "Delete", -1), es = /* @__PURE__ */ f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), ts = { class: "buttons flex gap-6 justify-end" };
function ss(s, e, t, r, i, n) {
  const a = m("o-button"), o = m("w-button"), l = m("o-modal");
  return c(), O(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (u) => n.onRemove())
  }, {
    default: g(() => [
      j(s.$slots, "button", {}, () => [
        Xt
      ]),
      i.isVisible ? (c(), O(qe, {
        key: 0,
        to: "body"
      }, [
        w(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (u) => i.isVisible = u)
        }, {
          default: g(() => [
            f("div", Gt, [
              j(s.$slots, "title", {}, () => [
                Zt
              ]),
              j(s.$slots, "message", {}, () => [
                es
              ]),
              f("div", ts, [
                w(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (u) => i.isVisible = !1)
                }, {
                  default: g(() => [
                    F("Cancel ")
                  ]),
                  _: 1
                }),
                w(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (u) => n.remove())
                }, {
                  default: g(() => [
                    j(s.$slots, "confirm", {}, () => [
                      F("Confirm")
                    ])
                  ]),
                  _: 3
                }, 8, ["loading"])
              ])
            ])
          ]),
          _: 3
        }, 8, ["active"])
      ])) : v("", !0)
    ]),
    _: 3
  });
}
const rs = /* @__PURE__ */ b(Qt, [["render", ss]]), is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rs
}, Symbol.toStringTag, { value: "Module" })), ns = {
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
      type: R,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  },
  emits: ["update:modelValue"],
  methods: {
    updateValue(s) {
      var e;
      (e = this.form) == null || e.clearError(this.name), this.$emit("update:modelValue", s);
    }
  }
}, as = ["value"];
function os(s, e, t, r, i, n) {
  var l;
  const a = m("o-select"), o = m("o-field");
  return c(), O(o, P({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      w(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (u) => n.updateValue(u))
      }, {
        default: g(() => [
          j(s.$slots, "default", {}, () => [
            t.items ? (c(!0), S(ae, { key: 0 }, ne(t.items, (u) => (c(), S("option", {
              key: u.value,
              value: u.value
            }, _(u.label), 9, as))), 128)) : v("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const ls = /* @__PURE__ */ b(ns, [["render", os]]), us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ls
}, Symbol.toStringTag, { value: "Module" })), ds = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: R.create({
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
}, cs = { class: "bg-white p-6" }, hs = /* @__PURE__ */ f("h2", { class: "title" }, "Session Expired", -1), fs = /* @__PURE__ */ f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), ms = { class: "buttons" };
function gs(s, e, t, r, i, n) {
  const a = m("wyxos-input"), o = m("w-button"), l = m("o-modal");
  return c(), O(l, { active: !0 }, {
    default: g(() => [
      f("div", cs, [
        hs,
        fs,
        f("form", {
          onSubmit: e[3] || (e[3] = ie((...u) => n.proceed && n.proceed(...u), ["prevent"]))
        }, [
          w(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (u) => r.login.email = u),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          w(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (u) => r.login.password = u),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", ms, [
            w(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (u) => n.onLogout())
            }, {
              default: g(() => [
                F(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            w(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: g(() => [
                F(" Login ")
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
const ye = /* @__PURE__ */ b(ds, [["render", gs]]), ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ye
}, Symbol.toStringTag, { value: "Module" })), ys = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: R,
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
      handler(s) {
        this.mergedLabels = { ...this.mergedLabels, ...s };
      }
    }
  },
  created() {
    this.mergedLabels = { ...this.mergedLabels, ...this.labels };
  }
}, bs = { key: 0 }, _s = { key: 1 }, Ss = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin" }, null, -1), ws = { key: 2 }, Os = { key: 3 };
function vs(s, e, t, r, i, n) {
  const a = m("o-button");
  return c(), O(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: g(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), S("span", bs, _(i.mergedLabels.submit), 1)) : v("", !0),
      t.form.isSubmitting ? (c(), S("span", _s, [
        F(_(i.mergedLabels.submitting) + " ", 1),
        Ss
      ])) : v("", !0),
      t.form.isSubmitted ? (c(), S("span", ws, _(i.mergedLabels.submitted), 1)) : v("", !0),
      t.form.isSubmitFailed ? (c(), S("span", Os, _(i.mergedLabels.failed), 1)) : v("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Fs = /* @__PURE__ */ b(ys, [["render", vs]]), xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fs
}, Symbol.toStringTag, { value: "Module" }));
class K {
  constructor(e = {}) {
    d(this, "state", new C());
    d(this, "result", I([]));
    d(this, "value", I(null));
    d(this, "timeout", null);
    d(this, "options", {
      url: null,
      payload: null,
      field: null
    });
    Object.assign(this.options, e);
  }
  get getConfig() {
    return {
      data: this.result.value,
      field: this.options.field,
      modelValue: this.value.value
    };
  }
  static create(e) {
    return new K(e);
  }
  getEvents({ searchPayloadFormatter: e = null } = {}) {
    return {
      "update:model-value": (t) => (this.value.value = t, this.search(e))
    };
  }
  search(e) {
    const t = { value: this.value.value }, r = e ? e(t) : t;
    return this.customSearch({ payload: r });
  }
  async customSearch({ url: e, payload: t }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)), this.controller = new AbortController(), this.timeout = setTimeout(async () => {
      this.state.loading(), this.reset();
      const r = e || this.options.url, { data: i } = await h.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((n) => {
        throw this.state.failed(), n;
      });
      this.result.value = i.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: i } = await h.post(`${r}/restore`, t || this.options.payload).catch((n) => {
      throw this.state.failed(), n;
    });
    return this.state.loaded(), i;
  }
  reset() {
    this.result.value = [];
  }
}
const qs = {
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
      default: (s) => s
    },
    payloadFormatter: {
      type: Function,
      default: (s) => s
    },
    openOnFocus: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "update:query", "change"],
  setup() {
    return {
      search: K.create()
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
      handler: async function(s, e) {
        this.isInternalChange ? this.isInternalChange = !1 : JSON.stringify(s) !== JSON.stringify(e) && this.restore();
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
        const { result: s } = await this.search.restore(
          this.path,
          this.restoreFormatter({
            values: this.modelValue
          })
        );
        this.query = s, this.$emit(
          "update:modelValue",
          this.query.map((e) => this.formatter(e))
        ), this.$emit("update:query", this.query);
      }
    },
    onTagSearch(s) {
      return this.search.customSearch({
        url: this.path,
        payload: this.payloadFormatter({
          value: s,
          exclude: this.query.map((e) => this.excludeFormatter(e)).filter(Boolean)
        })
      });
    },
    onTagAdded() {
      this.isInternalChange = !0;
      const s = this.query.map((e) => this.formatter(e));
      this.$emit("update:modelValue", s), this.$emit("update:query", this.query), this.$emit("change");
    },
    onTagRemoved() {
      this.isInternalChange = !0;
      const s = this.query.map((e) => this.formatter(e));
      this.$emit("update:modelValue", s), this.$emit("update:query", this.query), this.$emit("change");
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
function $s(s, e, t, r, i, n) {
  const a = m("o-taginput");
  return c(), O(a, P({
    ref: "tagInput",
    modelValue: i.query,
    "onUpdate:modelValue": e[0] || (e[0] = (o) => i.query = o),
    data: r.search.result.value,
    "open-on-focus": t.openOnFocus,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (o) => n.onTagAdded(o)),
    onFocus: e[2] || (e[2] = (o) => n.onTagSearch("")),
    onRemove: e[3] || (e[3] = (o) => n.onTagRemoved(o)),
    onTyping: e[4] || (e[4] = (o) => n.onTagSearch(o))
  }), null, 16, ["modelValue", "data", "open-on-focus"]);
}
const js = /* @__PURE__ */ b(qs, [["render", $s]]), Cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: js
}, Symbol.toStringTag, { value: "Module" })), Es = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, Ts = { class: "bg-white p-6" }, Rs = /* @__PURE__ */ f("h2", { class: "title" }, "Session expired", -1), Ps = /* @__PURE__ */ f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Vs = { class: "buttons" };
function Ls(s, e, t, r, i, n) {
  const a = m("w-button"), o = m("o-modal");
  return c(), O(o, { active: !0 }, {
    default: g(() => [
      f("div", Ts, [
        Rs,
        Ps,
        f("div", Vs, [
          w(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: g(() => [
              F(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const be = /* @__PURE__ */ b(Es, [["render", Ls]]), ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: be
}, Symbol.toStringTag, { value: "Module" }));
class Hs {
  constructor(e) {
    this.data = new FormData(), this.form = e, this.copy = Object.assign({}, JSON.parse(JSON.stringify(e)));
  }
  static build(e, t) {
    return new this(e).files(t).get();
  }
  static callback(e) {
    return (t) => this.build(t, e).get();
  }
  files(e) {
    return e.forEach((t) => {
      typeof t == "object" ? (this.data.append(t.name, t.value), delete this.copy[t.name]) : this.form[t] && (this.data.append(t, this.form[t]), delete this.copy[t]);
    }), this;
  }
  add(e, t) {
    return this.data.append(e, t), this;
  }
  get() {
    return this.data.append("payload", JSON.stringify(this.copy)), this.data;
  }
}
class _e {
  constructor() {
    d(this, "state", I(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new _e();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class Ks {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class Qs {
  constructor() {
    d(this, "structure", {});
    d(this, "query", q({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    d(this, "params", q({
      page: 1
    }));
    d(this, "router", null);
  }
  static create(e, t = {}, r = {}, i) {
    r = Object.assign(
      { base: "/api/admin", route: `${e}.index` },
      r
    );
    const n = r.base, a = {
      route: r.route,
      index: r.index || `${n}/${e}/index`,
      destroy: `${n}/${e}/destroy`
    }, o = new this();
    return o.options = r, o.structure = t, o.params = Object.assign(o.params, t), o.router = i, o.urls = a, o;
  }
  async fetch(e) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: t } = await h.get(e || this.urls.index, {
      params: this.params
    }).catch((r) => {
      throw this.query.isLoading = !1, r;
    });
    return await this.router.push({ name: this.urls.route, query: this.params }), this.query.isLoading = !1, this.query.isLoaded = !0, t;
  }
  async load(e) {
    const t = await this.fetch(e);
    return Object.assign(this.query, t.query, {
      items: t.query.items.map((r) => ({
        ...r,
        isProcessing: !1
      }))
    }), t;
  }
  onPageChange(e) {
    return this.params.page = e, this.load();
  }
  async action(e, { row: t, index: r, remove: i, method: n }, a = {}) {
    t.isProcessing = !0;
    const o = {
      id: t.id,
      ...a
    };
    if (n === "delete") {
      const { data: l } = await h.delete(e, {
        data: o
      }).catch((u) => {
        throw t.isProcessing = !1, u;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await h.post(e, o).catch((u) => {
        throw t.isProcessing = !1, u;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    }
    if (i) {
      const l = await this.fetch();
      if (this.query.items.splice(r, 1), !l.query.items.length) {
        this.params.page--, await this.load();
        return;
      }
      this.query.items.length < l.query.items.length && this.query.items.push(l.query.items[l.query.items.length - 1]);
    }
  }
  destroy(e, t) {
    return this.action(this.urls.destroy, { ...e, remove: !0 }, t);
  }
  async resetFilter(e = null) {
    Object.assign(this.params, this.structure), this.query.isFilterActive = !1, await this.load(e);
  }
}
class Xs {
  constructor(e) {
    d(this, "current", I(null));
    d(this, "history", I([]));
    d(this, "flow", []);
    this.current.value = e;
  }
  is(e) {
    return this.current.value === e;
  }
  isAny(...e) {
    return !!e.includes(this.current.value);
  }
  setFlow(e) {
    this.flow = e;
  }
  next() {
    const e = this.flow.findIndex((r) => r === this.getCurrent()), t = this.flow[e + 1];
    if (t) {
      this.set(t);
      return;
    }
    throw Error(`No step defined after ${this.getCurrent()}`);
  }
  set(e) {
    this.current.value = e, this.history.value.push(e);
  }
  previous() {
    this.history.value.pop(), this.current.value = this.history.value[this.history.value.length - 1];
  }
  getCurrent() {
    return this.current.value;
  }
  assign(e) {
    Object.assign(this, e);
  }
}
class Se {
  constructor(e) {
    d(this, "attributes", q({
      name: null
    }));
    d(this, "callbacks", {});
    this.attributes.name = e;
  }
  is(e) {
    return this.attributes.name === e;
  }
  onChange(e) {
    this.callbacks = e;
  }
  activeClass(e, t) {
    return {
      class: this.is(e) ? t : []
    };
  }
  set(e) {
    this.attributes.name = e, this.callbacks[e] && this.callbacks[e]();
  }
  assign(e) {
    Object.assign(this, e);
  }
  static create(e) {
    return new Se(e);
  }
}
class Is {
  constructor() {
    d(this, "attributes", q({
      user: null
    }));
    d(this, "state", new C());
    return new Proxy(this, {
      get(e, t, r) {
        return Reflect.has(e, t) ? Reflect.get(e, t, r) : t in e.attributes ? e.attributes[t] : null;
      },
      set(e, t, r, i) {
        return !Reflect.has(e, t) && !(t in e.attributes) ? (Reflect.set(e, t, r, i), !0) : t in e.attributes ? (e.attributes[t] = r, !0) : Reflect.set(e, t, r, i);
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
    this.loading(), await h.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await h.get("/api/user");
    if (!("user" in e))
      throw Error("Instance of user is not defined.");
    Object.keys(e).forEach((t) => {
      this.attributes[t] = e[t];
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
    this.attributes = q({
      user: null
    }), this.state.reset();
  }
}
const Gs = new Is();
async function Zs(s = {}) {
  return (await Y().modal.open({
    component: pe,
    props: Object.assign(
      {
        title: "Confirm",
        message: "Are you sure you want proceed?",
        confirmText: "Yes",
        cancelText: "Cancel"
      },
      s
    ),
    trapFocus: !0
  }).promise).action;
}
const As = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Ws {
  constructor() {
    d(this, "FORMATS", As);
  }
  format(e, t, r = "") {
    return e ? k(e).format(t) : r;
  }
}
const er = new Ws();
async function Ns(s, e) {
  var n, a, o, l, u, $;
  if ((s == null ? void 0 : s.code) === "ERR_CANCELED")
    return Promise.reject(s);
  const t = {
    401: "Authentication required. Please reload the page and sign in.",
    403: "You do not have permission to perform this action.",
    404: "The page or action you are looking for could not be found.",
    419: "Your session has likely expired. Try again or reload the page.",
    422: "The action attempted was invalid. Please review your input and try again.",
    500: "An unexpected error has occurred. This issue has been reported.",
    503: "The site is currently under maintenance. Please try again later."
  };
  Object.assign(t, (e == null ? void 0 : e.messages) || {});
  const r = t[(n = s.response) == null ? void 0 : n.status] || t[500], i = Y();
  if (i.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((a = s.response) == null ? void 0 : a.status) === 419) {
    i.modal.open({
      component: ((o = e.components) == null ? void 0 : o.TokenExpired) || be,
      trapFocus: !0,
      closable: !1
    });
    const L = (await h.get("/heartbeat")).data.csrfToken;
    h.defaults.headers.common["X-CSRF-TOKEN"] = L;
  }
  return ((l = s.response) == null ? void 0 : l.status) === 401 && i.modal.open({
    component: ((u = e.components) == null ? void 0 : u.SessionExpired) || ye,
    trapFocus: !0,
    closable: !1
  }), (($ = s.response) == null ? void 0 : $.status) === 422 && new Promise((x) => setTimeout(x, 500)).then(() => {
    const x = document.querySelectorAll(".o-field__message-danger"), L = (Q) => {
      const X = Q.getBoundingClientRect(), B = window.getComputedStyle(Q);
      return X.width > 0 && X.height > 0 && B.display !== "none" && B.visibility !== "hidden" && B.opacity !== "0";
    }, y = Array.from(x).find(L);
    y ? (console.log(
      "Scrolling to visible error message element:",
      y
    ), y.closest(".o-field").scrollIntoView({ behavior: "smooth" })) : console.error("Could not find a visible error message element.");
  }), Promise.reject(s);
}
function tr(s) {
  Y().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function Bs(s) {
  h.interceptors.response.use(null, (e) => Ns(e, s));
}
const se = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Re, "./components/WyxosCollection.vue": Ie, "./components/WyxosConfirm.vue": ze, "./components/WyxosDatepicker.vue": Ke, "./components/WyxosError.vue": tt, "./components/WyxosForm.vue": gt, "./components/WyxosImage.vue": St, "./components/WyxosInput.vue": Ft, "./components/WyxosListing.vue": Tt, "./components/WyxosLiveInput.vue": Lt, "./components/WyxosLogout.vue": Wt, "./components/WyxosProgress.vue": zt, "./components/WyxosPrompt.vue": Kt, "./components/WyxosRemove.vue": is, "./components/WyxosSelect.vue": us, "./components/WyxosSessionExpired.vue": ps, "./components/WyxosSubmit.vue": xs, "./components/WyxosTags.vue": Cs, "./components/WyxosTokenExpired.vue": ks }), we = {}, Us = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use($e, e.oruga), Object.keys(se).forEach((t) => {
    const r = se[t];
    if (r && r.default) {
      const i = r.default, n = i.name;
      n ? (s.component(n, i), s.component(n.replace("Wyxos", "W"), i), we[n] = i) : console.error(`Component in '${t}' does not have a name property`);
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Bs(e);
}, sr = {
  install: Us,
  ...we
};
export {
  Hs as FileRequest,
  R as FormBuilder,
  A as Listing,
  C as LoadState,
  _e as Modal,
  Ks as Option,
  Qs as ResourceList,
  K as Search,
  Xs as Steps,
  Se as Tab,
  Te as WyxosButton,
  ke as WyxosCollection,
  De as WyxosConfirm,
  He as WyxosDatepicker,
  et as WyxosError,
  mt as WyxosForm,
  _t as WyxosImage,
  vt as WyxosInput,
  Et as WyxosListing,
  Vt as WyxosLiveInput,
  At as WyxosLogout,
  Dt as WyxosProgress,
  pe as WyxosPrompt,
  rs as WyxosRemove,
  ls as WyxosSelect,
  ye as WyxosSessionExpired,
  Fs as WyxosSubmit,
  js as WyxosTags,
  be as WyxosTokenExpired,
  Gs as auth,
  Zs as confirm,
  er as dateRender,
  sr as default,
  Ns as errorHandler,
  tr as success,
  V as useFormErrors
};
//# sourceMappingURL=vision.js.map
