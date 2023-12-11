var ye = Object.defineProperty;
var be = (s, e, t) => e in s ? ye(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => (be(s, typeof e != "symbol" ? e + "" : e, t), t);
import { resolveComponent as f, openBlock as d, createBlock as w, withCtx as m, renderSlot as q, createTextVNode as x, createCommentVNode as v, toDisplayString as b, createElementBlock as _, normalizeProps as W, guardReactiveProps as I, createElementVNode as h, reactive as O, createVNode as S, normalizeClass as A, mergeProps as T, defineComponent as G, withModifiers as Z, createSlots as _e, renderList as ee, Fragment as te, Teleport as Se, ref as k } from "vue";
import V from "moment";
import p from "axios";
import we, { useProgrammatic as M } from "@oruga-ui/oruga-next";
const y = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, ve = {
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
}, Fe = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Oe(s, e, t, r, i, n) {
  const a = f("o-button");
  return d(), w(a, { disabled: t.loading }, {
    default: m(() => [
      t.loading ? v("", !0) : q(s.$slots, "default", { key: 0 }, () => [
        x("Submit")
      ]),
      t.loading && t.text ? q(s.$slots, "loading", { key: 1 }, () => [
        x(b(t.text), 1)
      ]) : v("", !0),
      t.loading ? (d(), _("i", Fe)) : v("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const xe = /* @__PURE__ */ y(ve, [["render", Oe]]), qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" })), $e = {
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
}, je = /* @__PURE__ */ h("ul", null, [
  /* @__PURE__ */ h("li")
], -1);
function Ce(s, e, t, r, i, n) {
  return q(s.$slots, "default", W(I({ add: n.add, remove: n.remove, items: i.items })), () => [
    je
  ]);
}
const Ee = /* @__PURE__ */ y($e, [["render", Ce]]), Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" }));
class F {
  constructor() {
    u(this, "state", O({
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
    return new F();
  }
}
const Le = {
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
      state: new F()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Pe = { class: "bg-white p-6" }, Ve = { class: "title" }, ke = { class: "mb-6" }, Re = {
  class: "buttons",
  role: "group"
};
function Ae(s, e, t, r, i, n) {
  const a = f("wyxos-button"), o = f("o-modal");
  return d(), w(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      h("section", Pe, [
        h("article", null, [
          h("header", null, [
            h("h3", Ve, b(t.title), 1)
          ]),
          h("p", ke, b(t.message), 1),
          h("footer", Re, [
            S(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: m(() => [
                x(b(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            S(a, {
              class: A([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => n.proceed())
            }, {
              default: m(() => [
                x(b(t.confirmText), 1)
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
const We = /* @__PURE__ */ y(Le, [["render", Ae]]), Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" })), E = O({
  default: []
});
function L() {
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
      if (s) {
        const t = E[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((i) => i.key === s);
        t.splice(r, 1);
        return;
      }
      E[e] = [];
    },
    all(s = "default") {
      return E[s];
    }
  };
}
class C {
  constructor(e = {}) {
    u(this, "errors", null);
    u(this, "errorBag", "default");
    u(this, "model", O({}));
    u(this, "form", O({}));
    u(this, "original", {});
    u(this, "states", {
      load: F.create(),
      submit: F.create()
    });
    u(this, "paths", {
      load: null,
      submit: null
    });
    // Add an abort controller property
    u(this, "abortController", null);
    u(this, "timeout", null);
    return this.errors = L(), this.errors.createBag(this.errorBag), this.setAttributes(e), this.loaded(), new Proxy(this, {
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
    this.errorBag = e || "default", this.errors = L(), this.errors.createBag(this.errorBag);
  }
  setAttributes(e) {
    this.original = e, this.form = O({ ...e });
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
    if (console.log("path", e), e = e || this.paths.submit, !e)
      throw Error("No valid URL defined for submit method.");
    return console.log("formatter", t), this.submitRequest("post", e, { formatter: t, ...r });
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
    console.log("payload", r, n);
    let a;
    return ["get", "delete"].includes(e) ? (i.params = n, a = p[e](t, i)) : a = p[e](t, n, i), a.then((o) => (this.abortController = null, this.clearErrors(), this.submitted(), o.data)).catch((o) => (o.name === "AbortError" ? console.log("Request aborted:", o.message) : (this.submitFailed(), this.errors.set(o, this.errorBag)), Promise.reject(o)));
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(e) {
    this.submitFailed(), this.errors.set(e, this.errorBag);
  }
  async advancedSubmit(e) {
    this.states.submit.loading();
    const { data: t } = await Promise.resolve(e(p, this.form)).catch(
      (r) => {
        throw this.states.submit.failed(), this.errors.set(r, this.errorBag), r;
      }
    );
    return this.states.submit.loaded(), t;
  }
  async load(e = "", { updateLoading: t = !0, updateOriginal: r = !0, ...i } = {}) {
    this.states.load.loading(), console.log("config", i);
    try {
      const { data: n } = await p.get(e || this.paths.load, i);
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
    if (console.log(e), !Array.isArray(e))
      throw new Error("The keys should be an array.");
    Object.keys(this.form).forEach((t) => {
      console.log("key", t, !e.includes(t), this.original[t]), e.includes(t) || (this.form[t] = this.original[t]);
    });
  }
  delay(e = 0, t) {
    clearTimeout(this.timeout), this.timeout = setTimeout(t, e);
  }
}
const Ne = {
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
      type: C,
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
    modelValue(s) {
      this.query = s ? V(s, this.submitFormat)._d : null;
    }
  },
  mounted() {
    this.modelValue && (this.query = V(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? V(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? V(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function Be(s, e, t, r, i, n) {
  var l;
  const a = f("o-datepicker"), o = f("o-field");
  return d(), w(o, T({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      S(a, T({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (c) => i.query = c)
      }, t.options, {
        "date-formatter": n.dateFormatter,
        "onUpdate:modelValue": n.updateQuery
      }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Ue = /* @__PURE__ */ y(Ne, [["render", Be]]), Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ue
}, Symbol.toStringTag, { value: "Module" })), De = G({
  name: "WyxosError",
  props: {
    form: {
      type: C,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: L()
    };
  }
}), ze = { key: 0 }, Ye = { key: 1 };
function Je(s, e, t, r, i, n) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (d(), _("p", ze, b(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (d(), _("p", Ye, b(s.errors.get(s.name).message), 1)) : v("", !0);
}
const He = /* @__PURE__ */ y(De, [["render", Je]]), Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" })), se = "%[a-f0-9]{2}", J = new RegExp("(" + se + ")|([^%]+?)", "gi"), H = new RegExp("(" + se + ")+", "gi");
function N(s, e) {
  try {
    return [decodeURIComponent(s.join(""))];
  } catch {
  }
  if (s.length === 1)
    return s;
  e = e || 1;
  const t = s.slice(0, e), r = s.slice(e);
  return Array.prototype.concat.call([], N(t), N(r));
}
function Qe(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(J) || [];
    for (let t = 1; t < e.length; t++)
      s = N(e, t).join(""), e = s.match(J) || [];
    return s;
  }
}
function Xe(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = H.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = Qe(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = H.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const i of r)
    s = s.replace(new RegExp(i, "g"), e[i]);
  return s;
}
function Ge(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return Xe(s);
  }
}
function re(s, e) {
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
function Ze(s, e) {
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
const et = (s) => s == null, tt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), B = Symbol("encodeFragmentIdentifier");
function st(s) {
  switch (s.arrayFormat) {
    case "index":
      return (e) => (t, r) => {
        const i = t.length;
        return r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
          ...t,
          [g(e, s), "[", i, "]"].join("")
        ] : [
          ...t,
          [g(e, s), "[", g(i, s), "]=", g(r, s)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [g(e, s), "[]"].join("")
      ] : [
        ...t,
        [g(e, s), "[]=", g(r, s)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [g(e, s), ":list="].join("")
      ] : [
        ...t,
        [g(e, s), ":list=", g(r, s)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = s.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (r, i) => i === void 0 || s.skipNull && i === null || s.skipEmptyString && i === "" ? r : (i = i === null ? "" : i, r.length === 0 ? [[g(t, s), e, g(i, s)].join("")] : [[r, g(i, s)].join(s.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        g(e, s)
      ] : [
        ...t,
        [g(e, s), "=", g(r, s)].join("")
      ];
  }
}
function rt(s) {
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
        const n = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !n && j(r, s).includes(s.arrayFormatSeparator);
        r = a ? j(r, s) : r;
        const o = n || a ? r.split(s.arrayFormatSeparator).map((l) => j(l, s)) : r === null ? r : j(r, s);
        i[t] = o;
      };
    case "bracket-separator":
      return (t, r, i) => {
        const n = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !n) {
          i[t] = r && j(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => j(o, s));
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
function ie(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function g(s, e) {
  return e.encode ? e.strict ? tt(s) : encodeURIComponent(s) : s;
}
function j(s, e) {
  return e.decode ? Ge(s) : s;
}
function ne(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? ne(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function ae(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function it(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function K(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function D(s) {
  s = ae(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function z(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, ie(e.arrayFormatSeparator);
  const t = rt(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const n = e.decode ? i.replace(/\+/g, " ") : i;
    let [a, o] = re(n, "=");
    a === void 0 && (a = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : j(o, e), t(j(a, e), o, r);
  }
  for (const [i, n] of Object.entries(r))
    if (typeof n == "object" && n !== null)
      for (const [a, o] of Object.entries(n))
        n[a] = K(o, e);
    else
      r[i] = K(n, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((i, n) => {
    const a = r[n];
    return a && typeof a == "object" && !Array.isArray(a) ? i[n] = ne(a) : i[n] = a, i;
  }, /* @__PURE__ */ Object.create(null));
}
function oe(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, ie(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && et(s[a]) || e.skipEmptyString && s[a] === "", r = st(e), i = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (i[a] = o);
  const n = Object.keys(i);
  return e.sort !== !1 && n.sort(e.sort), n.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? g(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? g(a, e) + "[]" : o.reduce(r(a), []).join("&") : g(a, e) + "=" + g(o, e);
  }).filter((a) => a.length > 0).join("&");
}
function le(s, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = re(s, "#");
  return t === void 0 && (t = s), {
    url: ((i = t == null ? void 0 : t.split("?")) == null ? void 0 : i[0]) ?? "",
    query: z(D(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: j(r, e) } : {}
  };
}
function ue(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [B]: !0,
    ...e
  };
  const t = ae(s.url).split("?")[0] || "", r = D(s.url), i = {
    ...z(r, { sort: !1 }),
    ...s.query
  };
  let n = oe(i, e);
  n && (n = `?${n}`);
  let a = it(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[B] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${n}${a}`;
}
function ce(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [B]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: n } = le(s, t);
  return ue({
    url: r,
    query: Ze(i, e),
    fragmentIdentifier: n
  }, t);
}
function nt(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, n) => !e(i, n);
  return ce(s, r, t);
}
const Q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: nt,
  extract: D,
  parse: z,
  parseUrl: le,
  pick: ce,
  stringify: oe,
  stringifyUrl: ue
}, Symbol.toStringTag, { value: "Module" }));
class R {
  constructor() {
    u(this, "cancelTokenSource", null);
    u(this, "api", null);
    u(this, "baseUrl", null);
    u(this, "structure", null);
    u(this, "options", null);
    u(this, "errors", null);
    u(this, "errorBag", "default");
    u(this, "states", {
      load: F.create(),
      fetch: F.create(),
      filter: F.create()
    });
    u(this, "query", O({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    u(this, "params", O({
      page: 1
    }));
    u(this, "state", O({
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
      pageChange: (e) => this.onPageChange(e)
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
  setUrl(e) {
    return this.baseUrl = e, this;
  }
  static create(e = {}, t = {}) {
    const r = new R();
    return r.errors = L(), r.errors.createBag(this.errorBag), r.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (i) => i
      },
      t
    ), r.setParameters(e), r.options.enableSearchUpdate && r.mergeSearch(), r.baseUrl = t.baseUrl, r.api = p.create(t.axios || {}), r;
  }
  setParameters(e) {
    const t = JSON.parse(JSON.stringify(e));
    this.structure = Object.assign({}, t), this.params = O(e);
  }
  mergeSearch() {
    const e = Q.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    e.page && (e.page = Number(e.page)), Object.assign(this.params, this.structure, e);
  }
  async fetch(e, t) {
    this.states.fetch.loading();
    const r = JSON.parse(JSON.stringify(this.params)), i = e || this.baseUrl;
    try {
      const { data: n } = await this.api.get(i, {
        params: r,
        cancelToken: t
      });
      return this.states.fetch.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), n;
    } catch {
      this.states.fetch.failed();
    }
  }
  async reload(e) {
    const { data: t } = await this.api.get(e || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.params))
    });
    return Object.assign(this.query, t.query, {
      items: t.query.items.map((r) => this.transformItem(r))
    }), t;
  }
  refreshUrl() {
    const e = window.location.href.replace(/\?.*/, ""), t = JSON.parse(JSON.stringify(this.params)), r = Object.fromEntries(
      Object.entries(t).filter(([n, a]) => a != null)
    ), i = e + "?" + Q.stringify(r, { arrayFormat: "bracket" });
    window.history.pushState({}, "", i);
  }
  push(e) {
    this.query.items.push(this.transformItem(e));
  }
  transformItem(e) {
    return this.options.transformItem({
      ...e,
      states: {
        delete: new F(),
        patch: new F()
      }
    });
  }
  async load(e) {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.cancelTokenSource = p.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let t = null;
    try {
      this.states.fetch.loading();
      const r = JSON.parse(JSON.stringify(this.params)), i = e || this.baseUrl, n = await this.api.get(i, {
        params: r,
        cancelToken: this.cancelTokenSource.token
      }).catch((a) => {
        throw this.states.fetch.failed(), a;
      });
      if (this.states.fetch.loaded(), t = n.data, this.states.fetch.loaded(), !t || !t.query || !t.query.items)
        throw this.states.fetch.failed(), Error("Response format is invalid.");
      return Object.assign(this.query, t.query, {
        items: t.query.items.map((a) => this.transformItem(a))
      }), t;
    } catch (r) {
      if (p.isCancel(r))
        this.states.fetch.loaded(), console.error("Request cancelled");
      else
        throw this.states.fetch.failed(), this.errors.set(r, this.errorBag), r;
    }
  }
  onPageChange(e) {
    return this.params.page = e, this.load();
  }
  async patch({ path: e, props: t, payload: r } = {}) {
    const { row: i } = t;
    r = {
      id: i.id,
      ...r
    };
    const { data: n } = await this.api.patch(e || this.baseUrl, r).catch((o) => {
      throw o;
    });
    return n.patch && Object.assign(i, n.patch), (await this.fetch()).query.items.length || (this.params.page--, await this.load()), n;
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
    l || (l = a.states[i] = F.create()), l.loading();
    const { data: c } = await this.api[n](
      e || this.baseUrl,
      r
    ).catch((P) => {
      throw l.failed(), P;
    });
    l.loaded(), c.row && Object.assign(a, c.row);
    const $ = await this.fetch();
    if (this.query.items.splice(o, 1), !$.query.items.length)
      return this.params.page--, await this.load(), c;
    if (this.query.items.length < $.query.items.length) {
      const P = $.query.items[$.query.items.length - 1];
      this.push(P);
    }
    return c;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.states.filter.loading(), this.states.load.loading(), this.cancelTokenSource = p.CancelToken.source(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let e = null;
    try {
      const t = JSON.parse(JSON.stringify(this.params)), r = this.baseUrl;
      e = (await this.api.get(r, {
        params: t,
        cancelToken: this.cancelTokenSource.token
      }).catch((n) => {
        throw this.states.filter.failed(), n;
      })).data;
    } catch (t) {
      if (p.isCancel(t)) {
        console.error("Request cancelled");
        return;
      } else
        throw this.states.filter.failed(), this.states.load.failed(), this.errors.set(t, this.errorBag), t;
    }
    if (this.refreshUrl(), !e || !e.query || !e.query.items)
      throw this.states.filter.failed(), Error("Response format is invalid.");
    Object.assign(this.query, e.query, {
      items: e.query.items.map((t) => this.transformItem(t))
    }), this.states.filter.loaded(), this.states.load.loaded(), this.state.isFilterActive = !1;
  }
  showFilter() {
    this.state.isFilterActive = !0;
  }
  cancelFilter() {
    this.state.isFilterActive = !1;
  }
  async resetFilter(e = "url", t = null) {
    e === "url" ? this.mergeSearch() : e === "initial" && (Object.assign(this.params, this.structure), this.refreshUrl()), this.state.isFilterActive = !1, await this.load(t);
  }
  getError(e) {
    return this.errors.get(e, this.errorBag);
  }
  clearError(e) {
    this.errors.clear(e, this.errorBag);
  }
  get isResettable() {
    return JSON.stringify(this.params) !== JSON.stringify(this.structure);
  }
}
const at = {
  name: "WyxosForm",
  props: {
    form: {
      type: C,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: R,
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
function ot(s, e, t, r, i, n) {
  const a = f("o-loading"), o = f("o-button");
  return t.form.isLoaded ? (d(), _("form", {
    key: 0,
    class: A(t.formClass),
    onSubmit: e[0] || (e[0] = Z((l) => n.handle(), ["prevent"]))
  }, [
    q(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (d(), w(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (d(), w(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: m(() => [
      x(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : v("", !0);
}
const lt = /* @__PURE__ */ y(at, [["render", ot]]), ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lt
}, Symbol.toStringTag, { value: "Module" })), ct = {
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
}, dt = ["width", "height"];
function ht(s, e, t, r, i, n) {
  return d(), _("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, dt);
}
const ft = /* @__PURE__ */ y(ct, [["render", ht]]), mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ft
}, Symbol.toStringTag, { value: "Module" })), gt = {
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
      type: C,
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
      errors: L()
    };
  },
  methods: {
    onInput(s) {
      this.form ? this.form.clearError(this.name) : this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", s);
    },
    getError() {
      return this.name ? this.form ? this.form.getError(this.name) : this.errors.get(this.name) : this.errors.get(this.name);
    }
  }
};
function pt(s, e, t, r, i, n) {
  const a = f("o-input"), o = f("o-field");
  return d(), w(o, T({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: m(() => [
      S(a, {
        readonly: t.readonly,
        class: A(t.inputClass),
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
const yt = /* @__PURE__ */ y(gt, [["render", pt]]), bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yt
}, Symbol.toStringTag, { value: "Module" })), _t = {
  name: "WyxosListing",
  props: {
    listing: {
      type: R,
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
}, St = { key: 0 }, wt = { key: 1 }, vt = { key: 2 };
function Ft(s, e, t, r, i, n) {
  const a = f("o-table");
  return d(), w(a, W(I(n.allPropsAndEvents)), _e({
    empty: m(() => [
      t.listing.isEmpty ? (d(), _("p", St, "No records found.")) : v("", !0),
      t.listing.isSearchEmpty ? (d(), _("p", wt, " No results for your query. Please adjust your search and try again. ")) : v("", !0),
      t.listing.isFailure ? (d(), _("p", vt, " Failure to load the list. Try again or reload the page. ")) : v("", !0)
    ]),
    _: 2
  }, [
    ee(s.$slots, (o, l) => ({
      name: l,
      fn: m((c) => [
        q(s.$slots, l, W(I(c)))
      ])
    }))
  ]), 1040);
}
const Ot = /* @__PURE__ */ y(_t, [["render", Ft]]), xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ot
}, Symbol.toStringTag, { value: "Module" })), qt = {
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
      type: C,
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
      errors: L()
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
function $t(s, e, t, r, i, n) {
  const a = f("o-input"), o = f("o-field");
  return d(), w(o, T({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: m(() => [
      S(a, {
        readonly: t.readonly,
        class: A(t.inputClass),
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
const jt = /* @__PURE__ */ y(qt, [["render", $t]]), Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jt
}, Symbol.toStringTag, { value: "Module" })), Et = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: C.create({
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
}, Tt = { class: "bg-white p-6" }, Lt = /* @__PURE__ */ h("h2", { class: "title" }, "Session Expired", -1), Pt = /* @__PURE__ */ h("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Vt = { class: "buttons" };
function kt(s, e, t, r, i, n) {
  const a = f("wyxos-input"), o = f("w-button"), l = f("o-modal");
  return d(), w(l, { active: !0 }, {
    default: m(() => [
      h("div", Tt, [
        Lt,
        Pt,
        h("form", {
          onSubmit: e[3] || (e[3] = Z((...c) => n.proceed && n.proceed(...c), ["prevent"]))
        }, [
          S(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (c) => r.login.email = c),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          S(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (c) => r.login.password = c),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          h("div", Vt, [
            S(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (c) => n.onLogout())
            }, {
              default: m(() => [
                x(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            S(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: m(() => [
                x(" Login ")
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
const de = /* @__PURE__ */ y(Et, [["render", kt]]), Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de
}, Symbol.toStringTag, { value: "Module" })), At = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, Wt = { class: "bg-white p-6" }, It = /* @__PURE__ */ h("h2", { class: "title" }, "Session expired", -1), Nt = /* @__PURE__ */ h("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Bt = { class: "buttons" };
function Ut(s, e, t, r, i, n) {
  const a = f("w-button"), o = f("o-modal");
  return d(), w(o, { active: !0 }, {
    default: m(() => [
      h("div", Wt, [
        It,
        Nt,
        h("div", Bt, [
          S(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: m(() => [
              x(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const he = /* @__PURE__ */ y(At, [["render", Ut]]), Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: he
}, Symbol.toStringTag, { value: "Module" }));
async function U(s, e) {
  var n, a, o, l, c;
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
  const r = t[(n = s.response) == null ? void 0 : n.status] || t[500], { oruga: i } = M();
  if (i.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((a = s.response) == null ? void 0 : a.status) === 419) {
    i.modal.open({
      component: he,
      trapFocus: !0,
      closable: !1
    });
    const P = (await p.get("/heartbeat")).data.csrfToken;
    p.defaults.headers.common["X-CSRF-TOKEN"] = P;
  }
  return ((o = s.response) == null ? void 0 : o.status) === 401 && i.modal.open({
    component: ((l = e.components) == null ? void 0 : l.SessionExpired) || de,
    trapFocus: !0,
    closable: !1
  }), ((c = s.response) == null ? void 0 : c.status) === 422 && new Promise(($) => setTimeout($, 500)).then(() => {
    const $ = document.querySelector(".o-field__label-danger");
    $ && $.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(s);
}
const Dt = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await p.post(this.path).catch((e) => {
        if (e.response.status === 401) {
          window.location.href = "/";
          return;
        }
        U(e);
      }).catch(U);
      console.log("data", s), window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function zt(s, e, t, r, i, n) {
  return q(s.$slots, "default", { logout: n.logout }, () => [
    h("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => n.logout())
    }, "Sign out")
  ]);
}
const Yt = /* @__PURE__ */ y(Dt, [["render", zt]]), Jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" })), Ht = G({
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
}), Kt = ["value", "max"], Qt = { key: 0 };
function Xt(s, e, t, r, i, n) {
  return d(), _(te, null, [
    h("progress", {
      value: s.value,
      max: s.max
    }, null, 8, Kt),
    s.showValue ? (d(), _("span", Qt, b(s.value) + " / " + b(s.max), 1)) : v("", !0)
  ], 64);
}
const Gt = /* @__PURE__ */ y(Ht, [["render", Xt]]), Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gt
}, Symbol.toStringTag, { value: "Module" })), es = {
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
      state: new F()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, ts = { class: "flex gap-6" };
function ss(s, e, t, r, i, n) {
  const a = f("wyxos-button"), o = f("o-modal");
  return d(), w(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      h("h2", null, b(t.title), 1),
      h("p", null, b(t.message), 1),
      h("div", ts, [
        S(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: m(() => [
            x(b(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        S(a, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => n.proceed())
        }, {
          default: m(() => [
            x(b(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const fe = /* @__PURE__ */ y(es, [["render", ss]]), rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fe
}, Symbol.toStringTag, { value: "Module" })), is = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: R,
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
      destroy: C.create()
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
}, ns = /* @__PURE__ */ h("i", { class: "fas fa-trash" }, null, -1), as = { class: "content p-6" }, os = /* @__PURE__ */ h("h3", { class: "title" }, "Delete", -1), ls = /* @__PURE__ */ h("p", { class: "mb-4" }, " Are you sur you want to delete this record? ", -1), us = { class: "buttons flex gap-6 justify-end" };
function cs(s, e, t, r, i, n) {
  const a = f("o-button"), o = f("w-button"), l = f("o-modal");
  return d(), w(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (c) => n.onRemove())
  }, {
    default: m(() => [
      q(s.$slots, "button", {}, () => [
        ns
      ]),
      i.isVisible ? (d(), w(Se, {
        key: 0,
        to: "body"
      }, [
        S(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (c) => i.isVisible = c)
        }, {
          default: m(() => [
            h("div", as, [
              q(s.$slots, "title", {}, () => [
                os
              ]),
              q(s.$slots, "message", {}, () => [
                ls
              ]),
              h("div", us, [
                S(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (c) => i.isVisible = !1)
                }, {
                  default: m(() => [
                    x("Cancel")
                  ]),
                  _: 1
                }),
                S(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (c) => n.remove())
                }, {
                  default: m(() => [
                    q(s.$slots, "confirm", {}, () => [
                      x("Confirm")
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
const ds = /* @__PURE__ */ y(is, [["render", cs]]), hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ds
}, Symbol.toStringTag, { value: "Module" })), fs = {
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
      type: C,
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
}, ms = ["value"];
function gs(s, e, t, r, i, n) {
  var l;
  const a = f("o-select"), o = f("o-field");
  return d(), w(o, T({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      S(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (c) => n.updateValue(c))
      }, {
        default: m(() => [
          q(s.$slots, "default", {}, () => [
            t.items ? (d(!0), _(te, { key: 0 }, ee(t.items, (c) => (d(), _("option", {
              key: c.value,
              value: c.value
            }, b(c.label), 9, ms))), 128)) : v("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const ps = /* @__PURE__ */ y(fs, [["render", gs]]), ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ps
}, Symbol.toStringTag, { value: "Module" })), bs = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: C,
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
}, _s = { key: 0 }, Ss = { key: 1 }, ws = /* @__PURE__ */ h("i", { class: "fas fa-spinner fa-spin" }, null, -1), vs = { key: 2 }, Fs = { key: 3 };
function Os(s, e, t, r, i, n) {
  const a = f("o-button");
  return d(), w(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: m(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (d(), _("span", _s, b(i.mergedLabels.submit), 1)) : v("", !0),
      t.form.isSubmitting ? (d(), _("span", Ss, [
        x(b(i.mergedLabels.submitting) + " ", 1),
        ws
      ])) : v("", !0),
      t.form.isSubmitted ? (d(), _("span", vs, b(i.mergedLabels.submitted), 1)) : v("", !0),
      t.form.isSubmitFailed ? (d(), _("span", Fs, b(i.mergedLabels.failed), 1)) : v("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const xs = /* @__PURE__ */ y(bs, [["render", Os]]), qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xs
}, Symbol.toStringTag, { value: "Module" }));
class Y {
  constructor(e = {}) {
    u(this, "state", new F());
    u(this, "result", k([]));
    u(this, "value", k(null));
    u(this, "timeout", null);
    u(this, "options", {
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
    return new Y(e);
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
      const r = e || this.options.url, { data: i } = await p.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((n) => {
        throw this.state.failed(), n;
      });
      this.result.value = i.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: i } = await p.post(`${r}/restore`, t || this.options.payload).catch((n) => {
      throw this.state.failed(), n;
    });
    return this.state.loaded(), i;
  }
  reset() {
    this.result.value = [];
  }
}
const $s = {
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
    }
  },
  emits: ["update:modelValue", "update:query"],
  setup() {
    return {
      search: Y.create()
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
    searchTags(s) {
      return this.search.customSearch({
        url: this.path,
        payload: this.payloadFormatter({
          value: s,
          exclude: this.query.map((e) => this.excludeFormatter(e)).filter(Boolean)
        })
      });
    },
    addedTag() {
      this.isInternalChange = !0;
      const s = this.query.map((e) => this.formatter(e));
      this.$emit("update:modelValue", s), this.$emit("update:query", this.query);
    },
    removedTag() {
      this.isInternalChange = !0;
      const s = this.query.map((e) => this.formatter(e));
      this.$emit("update:modelValue", s), this.$emit("update:query", this.query);
    },
    reset() {
      this.isInternalChange = !0, this.query = [], this.$emit("update:modelValue", this.query), this.$emit("update:query", this.query);
    },
    addItem() {
      this.$refs.tagInput.addItem();
    }
  }
};
function js(s, e, t, r, i, n) {
  const a = f("o-inputitems");
  return d(), w(a, T({
    ref: "tagInput",
    modelValue: i.query,
    "onUpdate:modelValue": e[0] || (e[0] = (o) => i.query = o),
    data: r.search.result.value,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (o) => n.addedTag(o)),
    onRemove: e[2] || (e[2] = (o) => n.removedTag(o)),
    onTyping: e[3] || (e[3] = (o) => n.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const Cs = /* @__PURE__ */ y($s, [["render", js]]), Es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cs
}, Symbol.toStringTag, { value: "Module" }));
class Ts {
  constructor() {
    u(this, "attributes", O({
      user: null
    }));
    u(this, "state", new F());
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
    this.loading(), await p.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await p.get("/api/user");
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
    this.attributes = O({
      user: null
    }), this.state.reset();
  }
}
const Bs = new Ts();
async function Us(s = {}) {
  const { oruga: e } = M();
  return (await e.modal.open({
    component: fe,
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
const Ls = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Ps {
  constructor() {
    u(this, "FORMATS", Ls);
  }
  format(e, t, r = "") {
    return e ? V(e).format(t) : r;
  }
}
const Ms = new Ps();
class Ds {
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
class me {
  constructor() {
    u(this, "state", k(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new me();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class zs {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class Ys {
  constructor() {
    u(this, "structure", {});
    u(this, "query", O({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    u(this, "params", O({
      page: 1
    }));
    u(this, "router", null);
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
    const { data: t } = await p.get(e || this.urls.index, {
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
      const { data: l } = await p.delete(e, {
        data: o
      }).catch((c) => {
        throw t.isProcessing = !1, c;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await p.post(e, o).catch((c) => {
        throw t.isProcessing = !1, c;
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
class Js {
  constructor(e) {
    u(this, "current", k(null));
    u(this, "history", k([]));
    u(this, "flow", []);
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
function Hs(s) {
  const { oruga: e } = M();
  e.notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class ge {
  constructor(e) {
    u(this, "attributes", O({
      name: null
    }));
    u(this, "callbacks", {});
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
    return new ge(e);
  }
}
function Vs(s) {
  p.interceptors.response.use(null, (e) => U(e, s));
}
const X = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": qe, "./components/WyxosCollection.vue": Te, "./components/WyxosConfirm.vue": Ie, "./components/WyxosDatepicker.vue": Me, "./components/WyxosError.vue": Ke, "./components/WyxosForm.vue": ut, "./components/WyxosImage.vue": mt, "./components/WyxosInput.vue": bt, "./components/WyxosListing.vue": xt, "./components/WyxosLiveInput.vue": Ct, "./components/WyxosLogout.vue": Jt, "./components/WyxosProgress.vue": Zt, "./components/WyxosPrompt.vue": rs, "./components/WyxosRemove.vue": hs, "./components/WyxosSelect.vue": ys, "./components/WyxosSessionExpired.vue": Rt, "./components/WyxosSubmit.vue": qs, "./components/WyxosTags.vue": Es, "./components/WyxosTokenExpired.vue": Mt }), pe = {}, ks = (s, e = { vision: {}, oruga: {} }) => {
  s.use(we, e.oruga), Object.keys(X).forEach((t) => {
    const r = X[t];
    if (r && r.default) {
      const i = r.default, n = i.name;
      n ? (s.component(n, i), s.component(n.replace("Wyxos", "W"), i), pe[n] = i) : console.error(`Component in '${t}' does not have a name property`);
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Vs(e);
}, Ks = {
  install: ks,
  ...pe
};
export {
  Ds as FileRequest,
  C as FormBuilder,
  R as Listing,
  F as LoadState,
  me as Modal,
  zs as Option,
  Ys as ResourceList,
  Y as Search,
  Js as Steps,
  ge as Tab,
  xe as WyxosButton,
  Ee as WyxosCollection,
  We as WyxosConfirm,
  Ue as WyxosDatepicker,
  He as WyxosError,
  lt as WyxosForm,
  ft as WyxosImage,
  yt as WyxosInput,
  Ot as WyxosListing,
  jt as WyxosLiveInput,
  Yt as WyxosLogout,
  Gt as WyxosProgress,
  fe as WyxosPrompt,
  ds as WyxosRemove,
  ps as WyxosSelect,
  de as WyxosSessionExpired,
  xs as WyxosSubmit,
  Cs as WyxosTags,
  he as WyxosTokenExpired,
  Bs as auth,
  Us as confirm,
  Ms as dateRender,
  Ks as default,
  U as errorHandler,
  Hs as success,
  L as useFormErrors
};
//# sourceMappingURL=vision.js.map
