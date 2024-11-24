var xe = Object.defineProperty;
var Fe = (s, e, t) => e in s ? xe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var c = (s, e, t) => Fe(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as k, onMounted as ne, openBlock as d, createElementBlock as y, renderSlot as x, createCommentVNode as v, reactive as j, createElementVNode as f, normalizeProps as D, guardReactiveProps as Y, resolveComponent as g, createBlock as F, withCtx as p, toDisplayString as w, createVNode as O, createTextVNode as $, normalizeClass as B, mergeProps as W, defineComponent as ae, nextTick as qe, withModifiers as oe, createSlots as $e, renderList as le, Fragment as ue, Teleport as je, onUnmounted as Ce } from "vue";
import h from "axios";
import N from "moment";
import Ee, { useOruga as Q } from "@oruga-ui/oruga-next";
const Te = { class: "wyxos-accordion" }, Pe = {
  __name: "WyxosAccordion",
  props: {
    active: {
      type: Boolean,
      required: !1
    }
  },
  setup(s) {
    const e = s, t = k(!1), r = () => {
      t.value = !t.value;
    };
    return ne(() => {
      t.value = e.active;
    }), (i, n) => (d(), y("div", Te, [
      x(i.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? x(i.$slots, "body", { key: 0 }) : v("", !0)
    ]));
  }
}, Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pe
}, Symbol.toStringTag, { value: "Module" })), T = j({
  default: []
});
function I() {
  return {
    createBag(s) {
      T[s] || (T[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      T[e] = Object.keys(s.response.data.errors).map((r) => ({
        key: r,
        message: s.response.data.errors[r][0]
      }));
    },
    setOne(s, e, t = "default") {
      const r = T[t];
      if (!r) {
        T[t] = [
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
      const t = T[e];
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
      if (console.log("Clearing error", s, "in bag", e, T), s) {
        const t = T[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((i) => i.key === s);
        r !== -1 && t.splice(r, 1);
        return;
      }
      T[e] = [];
    },
    all(s = "default") {
      return T[s];
    }
  };
}
class C {
  constructor() {
    c(this, "state", j({
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
class P {
  constructor(e = {}) {
    c(this, "errors", null);
    c(this, "errorBag", "default");
    c(this, "model", j({}));
    c(this, "form", j({}));
    c(this, "original", {});
    c(this, "states", {
      load: C.create(),
      submit: C.create()
    });
    c(this, "paths", {
      load: null,
      submit: null
    });
    // Add an abort controller property
    c(this, "abortController", null);
    c(this, "timeout", null);
    return this.errors = I(), this.errors.createBag(this.errorBag), this.setAttributes(e), this.loaded(), new Proxy(this, {
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
    this.errorBag = e || "default", this.errors = I(), this.errors.createBag(this.errorBag);
  }
  setAttributes(e) {
    this.original = e, this.form = j({ ...e });
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
  async submitRequest(e, t = null, { formatter: r = null, ...i } = {}) {
    if (t && typeof t != "string")
      throw new Error("Path must be a string");
    if (r !== null && typeof r != "function")
      throw new Error("Formatter must be a function");
    this.abortController && this.abortController.abort(), this.abortController = new AbortController(), i.signal = this.abortController.signal, this.clearErrors(), this.submitting(), await new Promise((o) => setTimeout(o, 1e3));
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
const S = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, Le = {
  name: "WyxosButton",
  props: {
    form: {
      type: P,
      default: null
    },
    button: {
      type: String,
      default: "submit"
    }
  }
}, Ve = ["disabled", "type"], ke = { key: 0 }, We = { key: 1 }, Ie = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin ml-4" }, null, -1);
function Ae(s, e, t, r, i, n) {
  return d(), y("button", {
    disabled: t.form.isSubmitting,
    type: t.button
  }, [
    x(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? v("", !0) : (d(), y("span", ke, "Submit")),
      t.form.isSubmitting ? (d(), y("span", We, "Processing")) : v("", !0)
    ]),
    t.form.isSubmitting ? x(s.$slots, "icon", { key: 0 }, () => [
      Ie
    ]) : v("", !0)
  ], 8, Ve);
}
const Ne = /* @__PURE__ */ S(Le, [["render", Ae]]), Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), Ue = {
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
}, Me = /* @__PURE__ */ f("ul", null, [
  /* @__PURE__ */ f("li")
], -1);
function ze(s, e, t, r, i, n) {
  return x(s.$slots, "default", D(Y({ add: n.add, remove: n.remove, items: i.items })), () => [
    Me
  ]);
}
const De = /* @__PURE__ */ S(Ue, [["render", ze]]), Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), Je = {
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
}, Ke = { class: "bg-white p-6" }, He = { class: "title" }, Qe = { class: "mb-6" }, Xe = {
  class: "buttons",
  role: "group"
};
function Ge(s, e, t, r, i, n) {
  const a = g("wyxos-button"), o = g("o-modal");
  return d(), F(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("section", Ke, [
        f("article", null, [
          f("header", null, [
            f("h3", He, w(t.title), 1)
          ]),
          f("p", Qe, w(t.message), 1),
          f("footer", Xe, [
            O(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: p(() => [
                $(w(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            O(a, {
              class: B([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => n.proceed())
            }, {
              default: p(() => [
                $(w(t.confirmText), 1)
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
const Ze = /* @__PURE__ */ S(Je, [["render", Ge]]), et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ze
}, Symbol.toStringTag, { value: "Module" })), tt = {
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
      type: P,
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
        this.query = s ? N(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = N(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? N(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? N(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function st(s, e, t, r, i, n) {
  var l;
  const a = g("o-datepicker"), o = g("o-field");
  return d(), F(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      O(a, W({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (u) => i.query = u),
        "date-formatter": n.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": n.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const rt = /* @__PURE__ */ S(tt, [["render", st]]), it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rt
}, Symbol.toStringTag, { value: "Module" })), nt = ae({
  name: "WyxosError",
  props: {
    form: {
      type: P,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: I()
    };
  }
}), at = {
  key: 0,
  class: "wyxos-error"
}, ot = {
  key: 1,
  class: "wyxos-error"
};
function lt(s, e, t, r, i, n) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (d(), y("span", at, w(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (d(), y("span", ot, w(s.errors.get(s.name).message), 1)) : v("", !0);
}
const ut = /* @__PURE__ */ S(nt, [["render", lt]]), ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ut
}, Symbol.toStringTag, { value: "Module" })), ce = "%[a-f0-9]{2}", ee = new RegExp("(" + ce + ")|([^%]+?)", "gi"), te = new RegExp("(" + ce + ")+", "gi");
function J(s, e) {
  try {
    return [decodeURIComponent(s.join(""))];
  } catch {
  }
  if (s.length === 1)
    return s;
  e = e || 1;
  const t = s.slice(0, e), r = s.slice(e);
  return Array.prototype.concat.call([], J(t), J(r));
}
function dt(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(ee) || [];
    for (let t = 1; t < e.length; t++)
      s = J(e, t).join(""), e = s.match(ee) || [];
    return s;
  }
}
function ht(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = te.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = dt(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = te.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const i of r)
    s = s.replace(new RegExp(i, "g"), e[i]);
  return s;
}
function ft(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return ht(s);
  }
}
function de(s, e) {
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
function mt(s, e) {
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
const gt = (s) => s == null, pt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), K = Symbol("encodeFragmentIdentifier");
function yt(s) {
  switch (s.arrayFormat) {
    case "index":
      return (e) => (t, r) => {
        const i = t.length;
        return r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
          ...t,
          [b(e, s), "[", i, "]"].join("")
        ] : [
          ...t,
          [b(e, s), "[", b(i, s), "]=", b(r, s)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [b(e, s), "[]"].join("")
      ] : [
        ...t,
        [b(e, s), "[]=", b(r, s)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [b(e, s), ":list="].join("")
      ] : [
        ...t,
        [b(e, s), ":list=", b(r, s)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = s.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (r, i) => i === void 0 || s.skipNull && i === null || s.skipEmptyString && i === "" ? r : (i = i === null ? "" : i, r.length === 0 ? [[b(t, s), e, b(i, s)].join("")] : [[r, b(i, s)].join(s.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        b(e, s)
      ] : [
        ...t,
        [b(e, s), "=", b(r, s)].join("")
      ];
  }
}
function bt(s) {
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
        const n = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !n && R(r, s).includes(s.arrayFormatSeparator);
        r = a ? R(r, s) : r;
        const o = n || a ? r.split(s.arrayFormatSeparator).map((l) => R(l, s)) : r === null ? r : R(r, s);
        i[t] = o;
      };
    case "bracket-separator":
      return (t, r, i) => {
        const n = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !n) {
          i[t] = r && R(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => R(o, s));
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
function he(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function b(s, e) {
  return e.encode ? e.strict ? pt(s) : encodeURIComponent(s) : s;
}
function R(s, e) {
  return e.decode ? ft(s) : s;
}
function fe(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? fe(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function me(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function _t(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function se(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function X(s) {
  s = me(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function G(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, he(e.arrayFormatSeparator);
  const t = bt(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const n = e.decode ? i.replace(/\+/g, " ") : i;
    let [a, o] = de(n, "=");
    a === void 0 && (a = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : R(o, e), t(R(a, e), o, r);
  }
  for (const [i, n] of Object.entries(r))
    if (typeof n == "object" && n !== null)
      for (const [a, o] of Object.entries(n))
        n[a] = se(o, e);
    else
      r[i] = se(n, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((i, n) => {
    const a = r[n];
    return i[n] = a && typeof a == "object" && !Array.isArray(a) ? fe(a) : a, i;
  }, /* @__PURE__ */ Object.create(null));
}
function ge(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, he(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && gt(s[a]) || e.skipEmptyString && s[a] === "", r = yt(e), i = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (i[a] = o);
  const n = Object.keys(i);
  return e.sort !== !1 && n.sort(e.sort), n.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? b(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? b(a, e) + "[]" : o.reduce(r(a), []).join("&") : b(a, e) + "=" + b(o, e);
  }).filter((a) => a.length > 0).join("&");
}
function pe(s, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = de(s, "#");
  return t === void 0 && (t = s), {
    url: ((i = t == null ? void 0 : t.split("?")) == null ? void 0 : i[0]) ?? "",
    query: G(X(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: R(r, e) } : {}
  };
}
function ye(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [K]: !0,
    ...e
  };
  const t = me(s.url).split("?")[0] || "", r = X(s.url), i = {
    ...G(r, { sort: !1 }),
    ...s.query
  };
  let n = ge(i, e);
  n && (n = `?${n}`);
  let a = _t(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[K] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${n}${a}`;
}
function be(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [K]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: n } = pe(s, t);
  return ye({
    url: r,
    query: mt(i, e),
    fragmentIdentifier: n
  }, t);
}
function St(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, n) => !e(i, n);
  return be(s, r, t);
}
const re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: St,
  extract: X,
  parse: G,
  parseUrl: pe,
  pick: be,
  stringify: ge,
  stringifyUrl: ye
}, Symbol.toStringTag, { value: "Module" }));
let M = null;
class U {
  constructor() {
    c(this, "cancelTokenSource", null);
    c(this, "api", null);
    c(this, "baseUrl", null);
    c(this, "structure", null);
    c(this, "options", null);
    c(this, "errors", null);
    c(this, "errorBag", "listing");
    c(this, "globalCancel", !0);
    c(this, "attributes", j({
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
    const r = new U();
    return r.errors = I(), r.errors.createBag(r.errorBag), r.options = Object.assign(
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
    this.structure = Object.assign({}, t), this.attributes.params = j(e);
  }
  mergeSearch() {
    const e = re.parse(window.location.search, {
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
    ), i = e + "?" + re.stringify(r, { arrayFormat: "bracket" });
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
    this.errors.clear(null, this.errorBag), this.globalCancel ? (M && M.cancel(), M = h.CancelToken.source()) : (this.cancelTokenSource && this.cancelTokenSource.cancel(), this.cancelTokenSource = h.CancelToken.source()), this.loading(), this.attributes.query.items = [], this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let t = null;
    try {
      const r = JSON.parse(JSON.stringify(this.attributes.params)), i = e || this.baseUrl;
      if (t = (await h.get(i, {
        params: r,
        cancelToken: this.globalCancel ? M.token : this.cancelTokenSource.token
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
    if (u.query.items.find((_) => _.id === l.id))
      return l.isProcessing = !1, a.data;
    this.attributes.query.items.splice(o, 1);
    const m = this.attributes.query.items.map((_) => _.id);
    return u.query.items.filter(
      (_) => !m.includes(_.id)
    ).forEach((_) => this.attributes.query.items.push(_)), a.data;
  }
  async update(e, { props: t, data: r, config: i, method: n = "patch" }) {
    let a;
    const { index: o, row: l } = t;
    l.isProcessing = !0, n === "patch" ? a = await h.patch(e, i) : n === "post" && (a = await h.post(e, r, i));
    const u = await this.fetch(), q = u.query.items.find((_) => _.id === l.id);
    if (q)
      return l.isProcessing = !1, Object.assign(l, q), a.data;
    this.attributes.query.items.splice(o, 1);
    const m = this.attributes.query.items.map((_) => _.id);
    return u.query.items.filter(
      (_) => !m.includes(_.id)
    ).forEach((_) => this.attributes.query.items.push(_)), a.data;
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
      (m) => {
        throw l.failed(), m;
      }
    );
    l.loaded(), u.row && Object.assign(a, u.row);
    const q = await this.fetch();
    if (this.attributes.query.items.splice(o, 1), !q.query.items.length)
      return this.attributes.params.page--, await this.load(), u;
    if (this.attributes.query.items.length < q.query.items.length) {
      const m = q.query.items[q.query.items.length - 1];
      this.push(m);
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
    }), await qe(), this.loaded(), this.hideFilter();
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
const wt = {
  name: "WyxosForm",
  props: {
    form: {
      type: P,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: U,
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
function vt(s, e, t, r, i, n) {
  const a = g("o-loading"), o = g("o-button");
  return t.form.isLoaded ? (d(), y("form", {
    key: 0,
    class: B(t.formClass),
    onSubmit: e[0] || (e[0] = oe((l) => n.handle(), ["prevent"]))
  }, [
    x(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (d(), F(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (d(), F(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: p(() => [
      $(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : v("", !0);
}
const Ot = /* @__PURE__ */ S(wt, [["render", vt]]), xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ot
}, Symbol.toStringTag, { value: "Module" })), Ft = {
  __name: "WyxosIcon",
  props: {
    active: {
      type: Boolean,
      required: !1
    },
    on: {
      type: String,
      required: !1,
      default: "chevron-down"
    },
    off: {
      type: String,
      required: !1,
      default: "chevron-right"
    }
  },
  setup(s) {
    return (e, t) => (d(), y("i", {
      class: B([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ft
}, Symbol.toStringTag, { value: "Module" })), $t = {
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
}, jt = ["width", "height"];
function Ct(s, e, t, r, i, n) {
  return d(), y("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, jt);
}
const Et = /* @__PURE__ */ S($t, [["render", Ct]]), Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" })), Pt = {
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
      type: P,
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
      errors: I()
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
function Rt(s, e, t, r, i, n) {
  const a = g("o-input"), o = g("o-field");
  return d(), F(o, W({
    class: t.fieldClass,
    label: t.label
  }, n.getError), {
    default: p(() => [
      O(a, {
        class: B(t.inputClass),
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
const Lt = /* @__PURE__ */ S(Pt, [["render", Rt]]), Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lt
}, Symbol.toStringTag, { value: "Module" })), kt = {
  name: "WyxosListing",
  props: {
    listing: {
      type: U,
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
}, Wt = { key: 0 }, It = { key: 1 }, At = { key: 2 };
function Nt(s, e, t, r, i, n) {
  const a = g("o-table");
  return d(), F(a, D(Y(n.allPropsAndEvents)), $e({
    empty: p(() => [
      t.listing.isEmpty ? (d(), y("p", Wt, "No records found.")) : v("", !0),
      t.listing.isSearchEmpty ? (d(), y("p", It, " No results for your query. Please adjust your search and try again. ")) : v("", !0),
      t.listing.isFailure ? (d(), y("p", At, " Failure to load the list. Try again or reload the page. ")) : v("", !0)
    ]),
    _: 2
  }, [
    le(s.$slots, (o, l) => ({
      name: l,
      fn: p((u) => [
        x(s.$slots, l, D(Y(u)))
      ])
    }))
  ]), 1040);
}
const Bt = /* @__PURE__ */ S(kt, [["render", Nt]]), Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bt
}, Symbol.toStringTag, { value: "Module" })), Mt = {
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
      type: P,
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
      errors: I()
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
function zt(s, e, t, r, i, n) {
  const a = g("o-input"), o = g("o-field");
  return d(), F(o, W({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: p(() => [
      O(a, {
        readonly: t.readonly,
        class: B(t.inputClass),
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
const Dt = /* @__PURE__ */ S(Mt, [["render", zt]]), Yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dt
}, Symbol.toStringTag, { value: "Module" })), Jt = {
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
function Kt(s, e, t, r, i, n) {
  return x(s.$slots, "default", { logout: n.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => n.logout())
    }, "Sign out")
  ]);
}
const Ht = /* @__PURE__ */ S(Jt, [["render", Kt]]), Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ht
}, Symbol.toStringTag, { value: "Module" })), Xt = ae({
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
}), Gt = ["max", "value"], Zt = { key: 0 };
function es(s, e, t, r, i, n) {
  return d(), y(ue, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, Gt),
    s.showValue ? (d(), y("span", Zt, w(s.modelValue) + " / " + w(s.max), 1)) : v("", !0)
  ], 64);
}
const ts = /* @__PURE__ */ S(Xt, [["render", es]]), ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ts
}, Symbol.toStringTag, { value: "Module" })), rs = {
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
}, is = { class: "flex gap-6" };
function ns(s, e, t, r, i, n) {
  const a = g("wyxos-button"), o = g("o-modal");
  return d(), F(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("h2", null, w(t.title), 1),
      f("p", null, w(t.message), 1),
      f("div", is, [
        O(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: p(() => [
            $(w(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        O(a, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => n.proceed())
        }, {
          default: p(() => [
            $(w(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const _e = /* @__PURE__ */ S(rs, [["render", ns]]), as = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), os = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: U,
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
      destroy: P.create()
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
}, ls = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), us = { class: "content p-6" }, cs = /* @__PURE__ */ f("h3", { class: "title" }, "Delete", -1), ds = /* @__PURE__ */ f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), hs = { class: "buttons flex gap-6 justify-end" };
function fs(s, e, t, r, i, n) {
  const a = g("o-button"), o = g("w-button"), l = g("o-modal");
  return d(), F(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (u) => n.onRemove())
  }, {
    default: p(() => [
      x(s.$slots, "button", {}, () => [
        ls
      ]),
      i.isVisible ? (d(), F(je, {
        key: 0,
        to: "body"
      }, [
        O(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (u) => i.isVisible = u)
        }, {
          default: p(() => [
            f("div", us, [
              x(s.$slots, "title", {}, () => [
                cs
              ]),
              x(s.$slots, "message", {}, () => [
                ds
              ]),
              f("div", hs, [
                O(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (u) => i.isVisible = !1)
                }, {
                  default: p(() => [
                    $("Cancel ")
                  ]),
                  _: 1
                }),
                O(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (u) => n.remove())
                }, {
                  default: p(() => [
                    x(s.$slots, "confirm", {}, () => [
                      $("Confirm")
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
const ms = /* @__PURE__ */ S(os, [["render", fs]]), gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ms
}, Symbol.toStringTag, { value: "Module" })), ps = {
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
      type: P,
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
}, ys = ["value"];
function bs(s, e, t, r, i, n) {
  var l;
  const a = g("o-select"), o = g("o-field");
  return d(), F(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      O(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (u) => n.updateValue(u))
      }, {
        default: p(() => [
          x(s.$slots, "default", {}, () => [
            t.items ? (d(!0), y(ue, { key: 0 }, le(t.items, (u) => (d(), y("option", {
              key: u.value,
              value: u.value
            }, w(u.label), 9, ys))), 128)) : v("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const _s = /* @__PURE__ */ S(ps, [["render", bs]]), Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _s
}, Symbol.toStringTag, { value: "Module" })), ws = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: P.create({
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
}, vs = { class: "bg-white p-6" }, Os = /* @__PURE__ */ f("h2", { class: "title" }, "Session Expired", -1), xs = /* @__PURE__ */ f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Fs = { class: "buttons" };
function qs(s, e, t, r, i, n) {
  const a = g("wyxos-input"), o = g("w-button"), l = g("o-modal");
  return d(), F(l, { active: !0 }, {
    default: p(() => [
      f("div", vs, [
        Os,
        xs,
        f("form", {
          onSubmit: e[3] || (e[3] = oe((...u) => n.proceed && n.proceed(...u), ["prevent"]))
        }, [
          O(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (u) => r.login.email = u),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          O(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (u) => r.login.password = u),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", Fs, [
            O(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (u) => n.onLogout())
            }, {
              default: p(() => [
                $(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            O(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: p(() => [
                $(" Login ")
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
const Se = /* @__PURE__ */ S(ws, [["render", qs]]), $s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se
}, Symbol.toStringTag, { value: "Module" })), js = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: P,
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
}, Cs = { key: 0 }, Es = { key: 1 }, Ts = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin" }, null, -1), Ps = { key: 2 }, Rs = { key: 3 };
function Ls(s, e, t, r, i, n) {
  const a = g("o-button");
  return d(), F(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: p(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (d(), y("span", Cs, w(i.mergedLabels.submit), 1)) : v("", !0),
      t.form.isSubmitting ? (d(), y("span", Es, [
        $(w(i.mergedLabels.submitting) + " ", 1),
        Ts
      ])) : v("", !0),
      t.form.isSubmitted ? (d(), y("span", Ps, w(i.mergedLabels.submitted), 1)) : v("", !0),
      t.form.isSubmitFailed ? (d(), y("span", Rs, w(i.mergedLabels.failed), 1)) : v("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Vs = /* @__PURE__ */ S(js, [["render", Ls]]), ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vs
}, Symbol.toStringTag, { value: "Module" })), Ws = {
  __name: "WyxosTab",
  props: {
    active: {
      type: String,
      required: !0
    },
    hashKey: {
      type: String,
      default: () => `tab-${Math.random().toString(36).slice(2, 11)}`
      // Unique default value
    },
    responsiveResolution: {
      type: Number,
      default: 768
      // Default resolution threshold for mobile or tablet
    }
  },
  emits: ["update:active"],
  setup(s, { emit: e }) {
    const t = s, r = e, i = () => {
      const m = window.location.hash.replace("#", ""), E = new URLSearchParams(m);
      return Object.fromEntries(E.entries());
    }, n = (m, E) => {
      const _ = window.location.hash.replace("#", ""), L = new URLSearchParams(_);
      L.set(m, E), window.location.hash = L.toString();
    }, a = k(i()[t.hashKey] || t.active), o = k(!1), l = (m) => o.value ? !0 : m === a.value, u = () => {
      o.value = window.innerWidth <= t.responsiveResolution;
    }, q = (m) => {
      a.value = m, r("update:active", m), n(t.hashKey, m);
    };
    return ne(() => {
      window.addEventListener("hashchange", () => {
        const m = i();
        m[t.hashKey] && (a.value = m[t.hashKey]);
      }), u(), window.addEventListener("resize", u);
    }), Ce(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", u);
    }), (m, E) => (d(), y("div", null, [
      x(m.$slots, "navigation", {
        isActive: l,
        setActive: q
      }, () => [
        $(" Fill in navigation content here ")
      ]),
      x(m.$slots, "content", { isActive: l }, () => [
        $(" Fill in content here")
      ])
    ]));
  }
}, Is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ws
}, Symbol.toStringTag, { value: "Module" }));
class Z {
  constructor(e = {}) {
    c(this, "state", new C());
    c(this, "result", k([]));
    c(this, "value", k(null));
    c(this, "timeout", null);
    c(this, "options", {
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
    return new Z(e);
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
const As = {
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
      search: Z.create()
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
function Ns(s, e, t, r, i, n) {
  const a = g("o-taginput");
  return d(), F(a, W({
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
const Bs = /* @__PURE__ */ S(As, [["render", Ns]]), Us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bs
}, Symbol.toStringTag, { value: "Module" })), Ms = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, zs = { class: "bg-white p-6" }, Ds = /* @__PURE__ */ f("h2", { class: "title" }, "Session expired", -1), Ys = /* @__PURE__ */ f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Js = { class: "buttons" };
function Ks(s, e, t, r, i, n) {
  const a = g("w-button"), o = g("o-modal");
  return d(), F(o, { active: !0 }, {
    default: p(() => [
      f("div", zs, [
        Ds,
        Ys,
        f("div", Js, [
          O(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: p(() => [
              $(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const we = /* @__PURE__ */ S(Ms, [["render", Ks]]), Hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" }));
class or {
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
class ve {
  constructor() {
    c(this, "state", k(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new ve();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class lr {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class ur {
  constructor() {
    c(this, "structure", {});
    c(this, "query", j({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    c(this, "params", j({
      page: 1
    }));
    c(this, "router", null);
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
class cr {
  constructor(e) {
    c(this, "current", k(null));
    c(this, "history", k([]));
    c(this, "flow", []);
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
class Oe {
  constructor(e) {
    c(this, "attributes", j({
      name: null
    }));
    c(this, "callbacks", {});
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
    return new Oe(e);
  }
}
class Qs {
  constructor() {
    c(this, "attributes", j({
      user: null
    }));
    c(this, "state", new C());
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
    this.attributes = j({
      user: null
    }), this.state.reset();
  }
}
const dr = new Qs();
async function hr(s = {}) {
  return (await Q().modal.open({
    component: _e,
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
const Xs = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Gs {
  constructor() {
    c(this, "FORMATS", Xs);
  }
  format(e, t, r = "") {
    return e ? N(e).format(t) : r;
  }
}
const fr = new Gs();
async function Zs(s, e) {
  var n, a, o, l, u, q;
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
  const r = t[(n = s.response) == null ? void 0 : n.status] || t[500], i = Q();
  if (i.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((a = s.response) == null ? void 0 : a.status) === 419) {
    i.modal.open({
      component: ((o = e.components) == null ? void 0 : o.TokenExpired) || we,
      trapFocus: !0,
      closable: !1
    });
    const E = (await h.get("/heartbeat")).data.csrfToken;
    h.defaults.headers.common["X-CSRF-TOKEN"] = E;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && i.modal.open({
    component: ((u = e.components) == null ? void 0 : u.SessionExpired) || Se,
    trapFocus: !0,
    closable: !1
  }), ((q = s.response) == null ? void 0 : q.status) === 422) {
    const m = setInterval(() => {
      const E = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), _ = (V) => {
        const z = V.getBoundingClientRect(), A = window.getComputedStyle(V);
        return z.width > 0 && z.height > 0 && A.display !== "none" && A.visibility !== "hidden" && A.opacity !== "0";
      }, L = Array.from(E).find(_);
      if (L) {
        clearInterval(m);
        let V;
        if (L.classList.contains("o-field__message-danger") ? V = L.closest(".o-field") : L.classList.contains("wyxos-error") && (V = L.closest("label")), V) {
          console.log("Scrolling to element:", V);
          const A = V.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: A, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
function mr(s) {
  Q().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function er(s) {
  h.interceptors.response.use(null, (e) => Zs(e, s));
}
const ie = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": Re, "./components/WyxosButton.vue": Be, "./components/WyxosCollection.vue": Ye, "./components/WyxosConfirm.vue": et, "./components/WyxosDatepicker.vue": it, "./components/WyxosError.vue": ct, "./components/WyxosForm.vue": xt, "./components/WyxosIcon.vue": qt, "./components/WyxosImage.vue": Tt, "./components/WyxosInput.vue": Vt, "./components/WyxosListing.vue": Ut, "./components/WyxosLiveInput.vue": Yt, "./components/WyxosLogout.vue": Qt, "./components/WyxosProgress.vue": ss, "./components/WyxosPrompt.vue": as, "./components/WyxosRemove.vue": gs, "./components/WyxosSelect.vue": Ss, "./components/WyxosSessionExpired.vue": $s, "./components/WyxosSubmit.vue": ks, "./components/WyxosTab.vue": Is, "./components/WyxosTags.vue": Us, "./components/WyxosTokenExpired.vue": Hs }), H = {}, tr = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(Ee, e.oruga), Object.keys(ie).forEach((t) => {
    const r = ie[t];
    if (r && r.default) {
      const i = r.default, n = i.name;
      if (n)
        s.component(n, i), s.component(n.replace("Wyxos", "W"), i), H[n] = i;
      else {
        const a = t.split("/").pop().split(".")[0];
        s.component(a, i), s.component(a.replace("Wyxos", "W"), i), H[a] = i;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, er(e);
}, gr = {
  install: tr,
  ...H
};
export {
  or as FileRequest,
  P as FormBuilder,
  U as Listing,
  C as LoadState,
  ve as Modal,
  lr as Option,
  ur as ResourceList,
  Z as Search,
  cr as Steps,
  Oe as Tab,
  Pe as WyxosAccordion,
  Ne as WyxosButton,
  De as WyxosCollection,
  Ze as WyxosConfirm,
  rt as WyxosDatepicker,
  ut as WyxosError,
  Ot as WyxosForm,
  Ft as WyxosIcon,
  Et as WyxosImage,
  Lt as WyxosInput,
  Bt as WyxosListing,
  Dt as WyxosLiveInput,
  Ht as WyxosLogout,
  ts as WyxosProgress,
  _e as WyxosPrompt,
  ms as WyxosRemove,
  _s as WyxosSelect,
  Se as WyxosSessionExpired,
  Vs as WyxosSubmit,
  Ws as WyxosTab,
  Bs as WyxosTags,
  we as WyxosTokenExpired,
  dr as auth,
  hr as confirm,
  fr as dateRender,
  gr as default,
  Zs as errorHandler,
  mr as success,
  I as useFormErrors
};
//# sourceMappingURL=vision.js.map
