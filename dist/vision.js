var pe = Object.defineProperty;
var ye = (s, e, t) => e in s ? pe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => (ye(s, typeof e != "symbol" ? e + "" : e, t), t);
import { resolveComponent as f, openBlock as c, createBlock as w, withCtx as m, renderSlot as x, createTextVNode as v, createCommentVNode as O, toDisplayString as b, createElementBlock as _, normalizeProps as I, guardReactiveProps as A, createElementVNode as h, reactive as F, createVNode as S, normalizeClass as W, mergeProps as T, defineComponent as X, nextTick as be, withModifiers as G, createSlots as _e, renderList as Z, Fragment as ee, Teleport as Se, ref as V } from "vue";
import P from "moment";
import p from "axios";
import we, { useProgrammatic as U } from "@oruga-ui/oruga-next";
const y = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, Oe = {
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
}, ve = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function Fe(s, e, t, r, i, n) {
  const a = f("o-button");
  return c(), w(a, { disabled: t.loading }, {
    default: m(() => [
      t.loading ? O("", !0) : x(s.$slots, "default", { key: 0 }, () => [
        v("Submit")
      ]),
      t.loading && t.text ? x(s.$slots, "loading", { key: 1 }, () => [
        v(b(t.text), 1)
      ]) : O("", !0),
      t.loading ? (c(), _("i", ve)) : O("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const xe = /* @__PURE__ */ y(Oe, [["render", Fe]]), qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  return x(s.$slots, "default", I(A({ add: n.add, remove: n.remove, items: i.items })), () => [
    je
  ]);
}
const Ee = /* @__PURE__ */ y($e, [["render", Ce]]), Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" }));
class q {
  constructor() {
    u(this, "state", F({
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
    return new q();
  }
}
const Re = {
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
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Le = { class: "bg-white p-6" }, Pe = { class: "title" }, Ve = { class: "mb-6" }, ke = {
  class: "buttons",
  role: "group"
};
function We(s, e, t, r, i, n) {
  const a = f("wyxos-button"), o = f("o-modal");
  return c(), w(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      h("section", Le, [
        h("article", null, [
          h("header", null, [
            h("h3", Pe, b(t.title), 1)
          ]),
          h("p", Ve, b(t.message), 1),
          h("footer", ke, [
            S(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: m(() => [
                v(b(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            S(a, {
              class: W([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => n.proceed())
            }, {
              default: m(() => [
                v(b(t.confirmText), 1)
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
const Ie = /* @__PURE__ */ y(Re, [["render", We]]), Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), E = F({
  default: []
});
function R() {
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
    u(this, "model", F({}));
    u(this, "form", F({}));
    u(this, "original", {});
    u(this, "states", {
      load: q.create(),
      submit: q.create()
    });
    u(this, "paths", {
      load: null,
      submit: null
    });
    // Add an abort controller property
    u(this, "abortController", null);
    u(this, "timeout", null);
    return this.errors = R(), this.errors.createBag(this.errorBag), this.setAttributes(e), this.loaded(), new Proxy(this, {
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
    this.errorBag = e || "default", this.errors = R(), this.errors.createBag(this.errorBag);
  }
  setAttributes(e) {
    this.original = e, this.form = F({ ...e });
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
    this.clearErrors(), this.states.load.loading();
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
    if (!Array.isArray(e))
      throw new Error("The keys should be an array.");
    Object.keys(this.form).forEach((t) => {
      console.log("key", t, !e.includes(t), this.original[t]), e.includes(t) || (this.form[t] = this.original[t]);
    });
  }
  delay(e = 0, t) {
    clearTimeout(this.timeout), this.timeout = setTimeout(t, e);
  }
}
const Be = {
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
      this.query = s ? P(s, this.submitFormat)._d : null;
    }
  },
  mounted() {
    this.modelValue && (this.query = P(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? P(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? P(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function Ne(s, e, t, r, i, n) {
  var l;
  const a = f("o-datepicker"), o = f("o-field");
  return c(), w(o, T({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      S(a, T({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (d) => i.query = d)
      }, t.options, {
        "date-formatter": n.dateFormatter,
        "onUpdate:modelValue": n.updateQuery
      }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Ue = /* @__PURE__ */ y(Be, [["render", Ne]]), Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ue
}, Symbol.toStringTag, { value: "Module" })), De = X({
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
      errors: R()
    };
  }
}), ze = { key: 0 }, Ye = { key: 1 };
function Je(s, e, t, r, i, n) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (c(), _("p", ze, b(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (c(), _("p", Ye, b(s.errors.get(s.name).message), 1)) : O("", !0);
}
const He = /* @__PURE__ */ y(De, [["render", Je]]), Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" })), te = "%[a-f0-9]{2}", Y = new RegExp("(" + te + ")|([^%]+?)", "gi"), J = new RegExp("(" + te + ")+", "gi");
function B(s, e) {
  try {
    return [decodeURIComponent(s.join(""))];
  } catch {
  }
  if (s.length === 1)
    return s;
  e = e || 1;
  const t = s.slice(0, e), r = s.slice(e);
  return Array.prototype.concat.call([], B(t), B(r));
}
function Qe(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(Y) || [];
    for (let t = 1; t < e.length; t++)
      s = B(e, t).join(""), e = s.match(Y) || [];
    return s;
  }
}
function Xe(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = J.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = Qe(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = J.exec(s);
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
function se(s, e) {
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
const et = (s) => s == null, tt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), N = Symbol("encodeFragmentIdentifier");
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
function re(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function g(s, e) {
  return e.encode ? e.strict ? tt(s) : encodeURIComponent(s) : s;
}
function j(s, e) {
  return e.decode ? Ge(s) : s;
}
function ie(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? ie(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function ne(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function it(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function H(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function M(s) {
  s = ne(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function D(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, re(e.arrayFormatSeparator);
  const t = rt(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const n = e.decode ? i.replace(/\+/g, " ") : i;
    let [a, o] = se(n, "=");
    a === void 0 && (a = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : j(o, e), t(j(a, e), o, r);
  }
  for (const [i, n] of Object.entries(r))
    if (typeof n == "object" && n !== null)
      for (const [a, o] of Object.entries(n))
        n[a] = H(o, e);
    else
      r[i] = H(n, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((i, n) => {
    const a = r[n];
    return a && typeof a == "object" && !Array.isArray(a) ? i[n] = ie(a) : i[n] = a, i;
  }, /* @__PURE__ */ Object.create(null));
}
function ae(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, re(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && et(s[a]) || e.skipEmptyString && s[a] === "", r = st(e), i = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (i[a] = o);
  const n = Object.keys(i);
  return e.sort !== !1 && n.sort(e.sort), n.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? g(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? g(a, e) + "[]" : o.reduce(r(a), []).join("&") : g(a, e) + "=" + g(o, e);
  }).filter((a) => a.length > 0).join("&");
}
function oe(s, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = se(s, "#");
  return t === void 0 && (t = s), {
    url: ((i = t == null ? void 0 : t.split("?")) == null ? void 0 : i[0]) ?? "",
    query: D(M(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: j(r, e) } : {}
  };
}
function le(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [N]: !0,
    ...e
  };
  const t = ne(s.url).split("?")[0] || "", r = M(s.url), i = {
    ...D(r, { sort: !1 }),
    ...s.query
  };
  let n = ae(i, e);
  n && (n = `?${n}`);
  let a = it(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[N] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${n}${a}`;
}
function ue(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [N]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: n } = oe(s, t);
  return le({
    url: r,
    query: Ze(i, e),
    fragmentIdentifier: n
  }, t);
}
function nt(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, n) => !e(i, n);
  return ue(s, r, t);
}
const K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: nt,
  extract: M,
  parse: D,
  parseUrl: oe,
  pick: ue,
  stringify: ae,
  stringifyUrl: le
}, Symbol.toStringTag, { value: "Module" }));
class k {
  constructor() {
    u(this, "cancelTokenSource", null);
    u(this, "api", null);
    u(this, "baseUrl", null);
    u(this, "structure", null);
    u(this, "options", null);
    u(this, "errors", null);
    u(this, "errorBag", "listing");
    u(this, "attributes", F({
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
    const r = new k();
    return r.errors = R(), r.errors.createBag(r.errorBag), r.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (i) => i
      },
      t
    ), r.setParameters(e), r.options.enableSearchUpdate && r.mergeSearch(), r.baseUrl = t.baseUrl, r.api = p.create(t.axios || {}), r;
  }
  setUrl(e) {
    return this.baseUrl = e, this;
  }
  setParameters(e) {
    const t = JSON.parse(JSON.stringify(e));
    this.structure = Object.assign({}, t), this.attributes.params = F(e);
  }
  mergeSearch() {
    const e = K.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    e.page && (e.page = Number(e.page)), Object.assign(this.attributes.params, this.structure, e);
  }
  async fetch(e, t) {
    this.loading();
    const r = JSON.parse(JSON.stringify(this.attributes.params)), i = e || this.baseUrl;
    try {
      const { data: n } = await this.api.get(i, {
        params: r,
        cancelToken: t
      });
      return this.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), n;
    } catch {
      this.failed();
    }
  }
  async reload(e) {
    const { data: t } = await this.api.get(e || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.attributes.params))
    });
    return Object.assign(this.attributes.query, t.query, {
      items: t.query.items.map((r) => this.transformItem(r))
    }), t;
  }
  refreshUrl() {
    const e = window.location.href.replace(/\?.*/, ""), t = JSON.parse(JSON.stringify(this.attributes.params)), r = Object.fromEntries(
      Object.entries(t).filter(([n, a]) => a != null)
    ), i = e + "?" + K.stringify(r, { arrayFormat: "bracket" });
    window.history.pushState({}, "", i);
  }
  push(e) {
    this.attributes.query.items.push(this.transformItem(e));
  }
  transformItem(e) {
    return this.options.transformItem({
      ...e,
      states: {
        delete: new q(),
        patch: new q()
      }
    });
  }
  async load(e) {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.cancelTokenSource = p.CancelToken.source(), this.loading(), this.attributes.query.items = [], this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let t = null;
    try {
      const r = JSON.parse(JSON.stringify(this.attributes.params)), i = e || this.baseUrl;
      if (t = (await this.api.get(i, {
        params: r,
        cancelToken: this.cancelTokenSource.token
      }).catch((a) => {
        throw this.failed(), a;
      })).data, !t || !t.query || !t.query.items)
        throw this.failed(), Error("Response format is invalid.");
      return this.loaded(), Object.assign(this.attributes.query, t.query, {
        items: t.query.items.map((a) => this.transformItem(a))
      }), t;
    } catch (r) {
      if (p.isCancel(r))
        this.loaded(), console.error("Request cancelled");
      else
        throw this.failed(), this.errors.set(r, this.errorBag), r;
    }
  }
  onPageChange(e) {
    return this.attributes.params.page = e, this.load();
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
    return n.patch && Object.assign(i, n.patch), (await this.fetch()).query.items.length || (this.attributes.params.page--, await this.load()), n;
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
    l || (l = a.states[i] = q.create()), l.loading();
    const { data: d } = await this.api[n](
      e || this.baseUrl,
      r
    ).catch((L) => {
      throw l.failed(), L;
    });
    l.loaded(), d.row && Object.assign(a, d.row);
    const $ = await this.fetch();
    if (this.attributes.query.items.splice(o, 1), !$.query.items.length)
      return this.attributes.params.page--, await this.load(), d;
    if (this.attributes.query.items.length < $.query.items.length) {
      const L = $.query.items[$.query.items.length - 1];
      this.push(L);
    }
    return d;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.loading(), this.cancelTokenSource = p.CancelToken.source(), this.attributes.query.items = [], this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let e = null;
    try {
      const t = JSON.parse(JSON.stringify(this.attributes.params)), r = this.baseUrl;
      e = (await this.api.get(r, {
        params: t,
        cancelToken: this.cancelTokenSource.token
      }).catch((n) => {
        throw this.failed(), n;
      })).data;
    } catch (t) {
      if (p.isCancel(t)) {
        console.error("Request cancelled");
        return;
      } else
        throw this.failed(), this.errors.set(t, this.errorBag), t;
    }
    if (this.refreshUrl(), !e || !e.query || !e.query.items)
      throw this.failed(), Error("Response format is invalid.");
    Object.assign(this.attributes.query, e.query, {
      items: e.query.items.map((t) => this.transformItem(t))
    }), await be(), this.loaded(), this.cancelFilter(), this.attributes.state.filter = !1;
  }
  showFilter() {
    this.attributes.state.filter = !0;
  }
  cancelFilter() {
    this.attributes.state.filter = !1;
  }
  async resetFilter(e = "url", t = null) {
    e === "url" ? this.mergeSearch() : e === "initial" && (Object.assign(this.attributes.params, this.structure), this.refreshUrl()), this.attributes.state.filter = !1, await this.load(t);
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
      type: k,
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
  return t.form.isLoaded ? (c(), _("form", {
    key: 0,
    class: W(t.formClass),
    onSubmit: e[0] || (e[0] = G((l) => n.handle(), ["prevent"]))
  }, [
    x(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (c(), w(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (c(), w(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: m(() => [
      v(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : O("", !0);
}
const lt = /* @__PURE__ */ y(at, [["render", ot]]), ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lt
}, Symbol.toStringTag, { value: "Module" })), dt = {
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
}, ct = ["width", "height"];
function ht(s, e, t, r, i, n) {
  return c(), _("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, ct);
}
const ft = /* @__PURE__ */ y(dt, [["render", ht]]), mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
    },
    passwordReveal: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      errors: R()
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
function pt(s, e, t, r, i, n) {
  const a = f("o-input"), o = f("o-field");
  return c(), w(o, T({
    label: t.label,
    class: t.fieldClass
  }, n.getError), {
    default: m(() => [
      S(a, {
        readonly: t.readonly,
        class: W(t.inputClass),
        "root-class": t.inputRootClass,
        name: t.name,
        type: t.type,
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "password-reveal": t.passwordReveal,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => n.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder", "password-reveal"])
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
      type: k,
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
}, St = { key: 0 }, wt = { key: 1 }, Ot = { key: 2 };
function vt(s, e, t, r, i, n) {
  const a = f("o-table");
  return c(), w(a, I(A(n.allPropsAndEvents)), _e({
    empty: m(() => [
      t.listing.isEmpty ? (c(), _("p", St, "No records found.")) : O("", !0),
      t.listing.isSearchEmpty ? (c(), _("p", wt, " No results for your query. Please adjust your search and try again. ")) : O("", !0),
      t.listing.isFailure ? (c(), _("p", Ot, " Failure to load the list. Try again or reload the page. ")) : O("", !0)
    ]),
    _: 2
  }, [
    Z(s.$slots, (o, l) => ({
      name: l,
      fn: m((d) => [
        x(s.$slots, l, I(A(d)))
      ])
    }))
  ]), 1040);
}
const Ft = /* @__PURE__ */ y(_t, [["render", vt]]), xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ft
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
      errors: R()
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
  return c(), w(o, T({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: m(() => [
      S(a, {
        readonly: t.readonly,
        class: W(t.inputClass),
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
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function Tt(s, e, t, r, i, n) {
  return x(s.$slots, "default", { logout: n.logout }, () => [
    h("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => n.logout())
    }, "Sign out")
  ]);
}
const Rt = /* @__PURE__ */ y(Et, [["render", Tt]]), Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rt
}, Symbol.toStringTag, { value: "Module" })), Pt = X({
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
}), Vt = ["value", "max"], kt = { key: 0 };
function Wt(s, e, t, r, i, n) {
  return c(), _(ee, null, [
    h("progress", {
      value: s.value,
      max: s.max
    }, null, 8, Vt),
    s.showValue ? (c(), _("span", kt, b(s.value) + " / " + b(s.max), 1)) : O("", !0)
  ], 64);
}
const It = /* @__PURE__ */ y(Pt, [["render", Wt]]), At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: It
}, Symbol.toStringTag, { value: "Module" })), Bt = {
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
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Nt = { class: "flex gap-6" };
function Ut(s, e, t, r, i, n) {
  const a = f("wyxos-button"), o = f("o-modal");
  return c(), w(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      h("h2", null, b(t.title), 1),
      h("p", null, b(t.message), 1),
      h("div", Nt, [
        S(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: m(() => [
            v(b(t.cancelText), 1)
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
            v(b(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const de = /* @__PURE__ */ y(Bt, [["render", Ut]]), Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de
}, Symbol.toStringTag, { value: "Module" })), Dt = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: k,
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
}, zt = /* @__PURE__ */ h("i", { class: "fas fa-trash" }, null, -1), Yt = { class: "content p-6" }, Jt = /* @__PURE__ */ h("h3", { class: "title" }, "Delete", -1), Ht = /* @__PURE__ */ h("p", { class: "mb-4" }, " Are you sur you want to delete this record? ", -1), Kt = { class: "buttons flex gap-6 justify-end" };
function Qt(s, e, t, r, i, n) {
  const a = f("o-button"), o = f("w-button"), l = f("o-modal");
  return c(), w(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (d) => n.onRemove())
  }, {
    default: m(() => [
      x(s.$slots, "button", {}, () => [
        zt
      ]),
      i.isVisible ? (c(), w(Se, {
        key: 0,
        to: "body"
      }, [
        S(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (d) => i.isVisible = d)
        }, {
          default: m(() => [
            h("div", Yt, [
              x(s.$slots, "title", {}, () => [
                Jt
              ]),
              x(s.$slots, "message", {}, () => [
                Ht
              ]),
              h("div", Kt, [
                S(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (d) => i.isVisible = !1)
                }, {
                  default: m(() => [
                    v("Cancel")
                  ]),
                  _: 1
                }),
                S(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (d) => n.remove())
                }, {
                  default: m(() => [
                    x(s.$slots, "confirm", {}, () => [
                      v("Confirm")
                    ])
                  ]),
                  _: 3
                }, 8, ["loading"])
              ])
            ])
          ]),
          _: 3
        }, 8, ["active"])
      ])) : O("", !0)
    ]),
    _: 3
  });
}
const Xt = /* @__PURE__ */ y(Dt, [["render", Qt]]), Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xt
}, Symbol.toStringTag, { value: "Module" })), Zt = {
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
}, es = ["value"];
function ts(s, e, t, r, i, n) {
  var l;
  const a = f("o-select"), o = f("o-field");
  return c(), w(o, T({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      S(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (d) => n.updateValue(d))
      }, {
        default: m(() => [
          x(s.$slots, "default", {}, () => [
            t.items ? (c(!0), _(ee, { key: 0 }, Z(t.items, (d) => (c(), _("option", {
              key: d.value,
              value: d.value
            }, b(d.label), 9, es))), 128)) : O("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const ss = /* @__PURE__ */ y(Zt, [["render", ts]]), rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ss
}, Symbol.toStringTag, { value: "Module" })), is = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: C.create({
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
}, ns = { class: "bg-white p-6" }, as = /* @__PURE__ */ h("h2", { class: "title" }, "Session Expired", -1), os = /* @__PURE__ */ h("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), ls = { class: "buttons" };
function us(s, e, t, r, i, n) {
  const a = f("wyxos-input"), o = f("w-button"), l = f("o-modal");
  return c(), w(l, { active: !0 }, {
    default: m(() => [
      h("div", ns, [
        as,
        os,
        h("form", {
          onSubmit: e[3] || (e[3] = G((...d) => n.proceed && n.proceed(...d), ["prevent"]))
        }, [
          S(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (d) => r.login.email = d),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          S(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (d) => r.login.password = d),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          h("div", ls, [
            S(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (d) => n.onLogout())
            }, {
              default: m(() => [
                v(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            S(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: m(() => [
                v(" Login ")
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
const ce = /* @__PURE__ */ y(is, [["render", us]]), ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ce
}, Symbol.toStringTag, { value: "Module" })), cs = {
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
}, hs = { key: 0 }, fs = { key: 1 }, ms = /* @__PURE__ */ h("i", { class: "fas fa-spinner fa-spin" }, null, -1), gs = { key: 2 }, ps = { key: 3 };
function ys(s, e, t, r, i, n) {
  const a = f("o-button");
  return c(), w(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: m(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), _("span", hs, b(i.mergedLabels.submit), 1)) : O("", !0),
      t.form.isSubmitting ? (c(), _("span", fs, [
        v(b(i.mergedLabels.submitting) + " ", 1),
        ms
      ])) : O("", !0),
      t.form.isSubmitted ? (c(), _("span", gs, b(i.mergedLabels.submitted), 1)) : O("", !0),
      t.form.isSubmitFailed ? (c(), _("span", ps, b(i.mergedLabels.failed), 1)) : O("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const bs = /* @__PURE__ */ y(cs, [["render", ys]]), _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bs
}, Symbol.toStringTag, { value: "Module" }));
class z {
  constructor(e = {}) {
    u(this, "state", new q());
    u(this, "result", V([]));
    u(this, "value", V(null));
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
    return new z(e);
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
const Ss = {
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
      search: z.create()
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
      this.$emit("update:modelValue", s), this.$emit("update:query", this.query), this.$emit("change");
    },
    removedTag() {
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
      console.log(this.openOnFocus), this.openOnFocus && this.searchTags("");
    }
  }
};
function ws(s, e, t, r, i, n) {
  const a = f("o-inputitems");
  return c(), w(a, T({
    ref: "tagInput",
    modelValue: i.query,
    "onUpdate:modelValue": e[0] || (e[0] = (o) => i.query = o),
    data: r.search.result.value,
    "open-on-focus": t.openOnFocus,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (o) => n.addedTag(o)),
    onRemove: e[2] || (e[2] = (o) => n.removedTag(o)),
    onTyping: e[3] || (e[3] = (o) => n.searchTags(o)),
    onFocus: e[4] || (e[4] = (o) => n.searchTags(""))
  }), null, 16, ["modelValue", "data", "open-on-focus"]);
}
const Os = /* @__PURE__ */ y(Ss, [["render", ws]]), vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Os
}, Symbol.toStringTag, { value: "Module" })), Fs = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, xs = { class: "bg-white p-6" }, qs = /* @__PURE__ */ h("h2", { class: "title" }, "Session expired", -1), $s = /* @__PURE__ */ h("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), js = { class: "buttons" };
function Cs(s, e, t, r, i, n) {
  const a = f("w-button"), o = f("o-modal");
  return c(), w(o, { active: !0 }, {
    default: m(() => [
      h("div", xs, [
        qs,
        $s,
        h("div", js, [
          S(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: m(() => [
              v(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const he = /* @__PURE__ */ y(Fs, [["render", Cs]]), Es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: he
}, Symbol.toStringTag, { value: "Module" }));
class Ts {
  constructor() {
    u(this, "attributes", F({
      user: null
    }));
    u(this, "state", new q());
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
    this.attributes = F({
      user: null
    }), this.state.reset();
  }
}
const Us = new Ts();
async function Ms(s = {}) {
  const { oruga: e } = U();
  return (await e.modal.open({
    component: de,
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
const Rs = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Ls {
  constructor() {
    u(this, "FORMATS", Rs);
  }
  format(e, t, r = "") {
    return e ? P(e).format(t) : r;
  }
}
const Ds = new Ls();
async function Ps(s, e) {
  var n, a, o, l, d;
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
  const r = t[(n = s.response) == null ? void 0 : n.status] || t[500], { oruga: i } = U();
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
    const L = (await p.get("/heartbeat")).data.csrfToken;
    p.defaults.headers.common["X-CSRF-TOKEN"] = L;
  }
  return ((o = s.response) == null ? void 0 : o.status) === 401 && i.modal.open({
    component: ((l = e.components) == null ? void 0 : l.SessionExpired) || ce,
    trapFocus: !0,
    closable: !1
  }), ((d = s.response) == null ? void 0 : d.status) === 422 && new Promise(($) => setTimeout($, 500)).then(() => {
    const $ = document.querySelector(".o-field__label-danger");
    $ && $.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(s);
}
class zs {
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
class fe {
  constructor() {
    u(this, "state", V(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new fe();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class Ys {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class Js {
  constructor() {
    u(this, "structure", {});
    u(this, "query", F({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    u(this, "params", F({
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
      }).catch((d) => {
        throw t.isProcessing = !1, d;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await p.post(e, o).catch((d) => {
        throw t.isProcessing = !1, d;
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
class Hs {
  constructor(e) {
    u(this, "current", V(null));
    u(this, "history", V([]));
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
function Ks(s) {
  const { oruga: e } = U();
  e.notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class me {
  constructor(e) {
    u(this, "attributes", F({
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
    return new me(e);
  }
}
function Vs(s) {
  p.interceptors.response.use(null, (e) => Ps(e, s));
}
const Q = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": qe, "./components/WyxosCollection.vue": Te, "./components/WyxosConfirm.vue": Ae, "./components/WyxosDatepicker.vue": Me, "./components/WyxosError.vue": Ke, "./components/WyxosForm.vue": ut, "./components/WyxosImage.vue": mt, "./components/WyxosInput.vue": bt, "./components/WyxosListing.vue": xt, "./components/WyxosLiveInput.vue": Ct, "./components/WyxosLogout.vue": Lt, "./components/WyxosProgress.vue": At, "./components/WyxosPrompt.vue": Mt, "./components/WyxosRemove.vue": Gt, "./components/WyxosSelect.vue": rs, "./components/WyxosSessionExpired.vue": ds, "./components/WyxosSubmit.vue": _s, "./components/WyxosTags.vue": vs, "./components/WyxosTokenExpired.vue": Es }), ge = {}, ks = (s, e = { vision: {}, oruga: {} }) => {
  s.use(we, e.oruga), Object.keys(Q).forEach((t) => {
    const r = Q[t];
    if (r && r.default) {
      const i = r.default, n = i.name;
      n ? (s.component(n, i), s.component(n.replace("Wyxos", "W"), i), ge[n] = i) : console.error(`Component in '${t}' does not have a name property`);
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Vs(e);
}, Qs = {
  install: ks,
  ...ge
};
export {
  zs as FileRequest,
  C as FormBuilder,
  k as Listing,
  q as LoadState,
  fe as Modal,
  Ys as Option,
  Js as ResourceList,
  z as Search,
  Hs as Steps,
  me as Tab,
  xe as WyxosButton,
  Ee as WyxosCollection,
  Ie as WyxosConfirm,
  Ue as WyxosDatepicker,
  He as WyxosError,
  lt as WyxosForm,
  ft as WyxosImage,
  yt as WyxosInput,
  Ft as WyxosListing,
  jt as WyxosLiveInput,
  Rt as WyxosLogout,
  It as WyxosProgress,
  de as WyxosPrompt,
  Xt as WyxosRemove,
  ss as WyxosSelect,
  ce as WyxosSessionExpired,
  bs as WyxosSubmit,
  Os as WyxosTags,
  he as WyxosTokenExpired,
  Us as auth,
  Ms as confirm,
  Ds as dateRender,
  Qs as default,
  Ps as errorHandler,
  Ks as success,
  R as useFormErrors
};
//# sourceMappingURL=vision.js.map
