var _e = Object.defineProperty;
var Se = (s, e, t) => e in s ? _e(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var d = (s, e, t) => (Se(s, typeof e != "symbol" ? e + "" : e, t), t);
import { resolveComponent as m, openBlock as c, createBlock as w, withCtx as g, renderSlot as $, createTextVNode as x, createCommentVNode as v, toDisplayString as b, createElementBlock as _, normalizeProps as B, guardReactiveProps as N, createElementVNode as f, reactive as q, createVNode as S, normalizeClass as A, mergeProps as R, defineComponent as Z, nextTick as we, withModifiers as ee, createSlots as Oe, renderList as te, Fragment as se, Teleport as ve, ref as k } from "vue";
import L from "moment";
import h from "axios";
import Fe, { useProgrammatic as D } from "@oruga-ui/oruga-next";
const y = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, xe = {
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
}, qe = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function $e(s, e, t, r, i, n) {
  const a = m("o-button");
  return c(), w(a, { disabled: t.loading }, {
    default: g(() => [
      t.loading ? v("", !0) : $(s.$slots, "default", { key: 0 }, () => [
        x("Submit")
      ]),
      t.loading && t.text ? $(s.$slots, "loading", { key: 1 }, () => [
        x(b(t.text), 1)
      ]) : v("", !0),
      t.loading ? (c(), _("i", qe)) : v("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const je = /* @__PURE__ */ y(xe, [["render", $e]]), Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: je
}, Symbol.toStringTag, { value: "Module" })), Ee = {
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
}, Te = /* @__PURE__ */ f("ul", null, [
  /* @__PURE__ */ f("li")
], -1);
function Pe(s, e, t, r, i, n) {
  return $(s.$slots, "default", B(N({ add: n.add, remove: n.remove, items: i.items })), () => [
    Te
  ]);
}
const Re = /* @__PURE__ */ y(Ee, [["render", Pe]]), Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Re
}, Symbol.toStringTag, { value: "Module" }));
class j {
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
    return new j();
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
      state: new j()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, ke = { class: "bg-white p-6" }, Ie = { class: "title" }, We = { class: "mb-6" }, Ae = {
  class: "buttons",
  role: "group"
};
function Be(s, e, t, r, i, n) {
  const a = m("wyxos-button"), o = m("o-modal");
  return c(), w(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      f("section", ke, [
        f("article", null, [
          f("header", null, [
            f("h3", Ie, b(t.title), 1)
          ]),
          f("p", We, b(t.message), 1),
          f("footer", Ae, [
            S(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: g(() => [
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
              default: g(() => [
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
const Ne = /* @__PURE__ */ y(Le, [["render", Be]]), Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), P = q({
  default: []
});
function V() {
  return {
    createBag(s) {
      P[s] || (P[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      P[e] = Object.keys(s.response.data.errors).map((r) => ({
        key: r,
        message: s.response.data.errors[r][0]
      }));
    },
    get(s, e = "default") {
      const t = P[e];
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
        const t = P[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((i) => i.key === s);
        t.splice(r, 1);
        return;
      }
      P[e] = [];
    },
    all(s = "default") {
      return P[s];
    }
  };
}
class T {
  constructor(e = {}) {
    d(this, "errors", null);
    d(this, "errorBag", "default");
    d(this, "model", q({}));
    d(this, "form", q({}));
    d(this, "original", {});
    d(this, "states", {
      load: j.create(),
      submit: j.create()
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
}
const Me = {
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
      type: T,
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
    modelValue: {
      handler(s) {
        this.query = s ? L(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = L(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? L(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? L(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function De(s, e, t, r, i, n) {
  var l;
  const a = m("o-datepicker"), o = m("o-field");
  return c(), w(o, R({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      S(a, R({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (u) => i.query = u),
        "date-formatter": n.dateFormatter
      }, t.options, { "onUpdate:modelValue": n.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const ze = /* @__PURE__ */ y(Me, [["render", De]]), Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ze
}, Symbol.toStringTag, { value: "Module" })), Je = Z({
  name: "WyxosError",
  props: {
    form: {
      type: T,
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
}), He = { key: 0 }, Ke = { key: 1 };
function Qe(s, e, t, r, i, n) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (c(), _("p", He, b(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (c(), _("p", Ke, b(s.errors.get(s.name).message), 1)) : v("", !0);
}
const Xe = /* @__PURE__ */ y(Je, [["render", Qe]]), Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xe
}, Symbol.toStringTag, { value: "Module" })), re = "%[a-f0-9]{2}", H = new RegExp("(" + re + ")|([^%]+?)", "gi"), K = new RegExp("(" + re + ")+", "gi");
function U(s, e) {
  try {
    return [decodeURIComponent(s.join(""))];
  } catch {
  }
  if (s.length === 1)
    return s;
  e = e || 1;
  const t = s.slice(0, e), r = s.slice(e);
  return Array.prototype.concat.call([], U(t), U(r));
}
function Ze(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(H) || [];
    for (let t = 1; t < e.length; t++)
      s = U(e, t).join(""), e = s.match(H) || [];
    return s;
  }
}
function et(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = K.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = Ze(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = K.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const i of r)
    s = s.replace(new RegExp(i, "g"), e[i]);
  return s;
}
function tt(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return et(s);
  }
}
function ie(s, e) {
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
function st(s, e) {
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
const rt = (s) => s == null, it = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), M = Symbol("encodeFragmentIdentifier");
function nt(s) {
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
function at(s) {
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
        const n = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !n && E(r, s).includes(s.arrayFormatSeparator);
        r = a ? E(r, s) : r;
        const o = n || a ? r.split(s.arrayFormatSeparator).map((l) => E(l, s)) : r === null ? r : E(r, s);
        i[t] = o;
      };
    case "bracket-separator":
      return (t, r, i) => {
        const n = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !n) {
          i[t] = r && E(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => E(o, s));
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
function ne(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function p(s, e) {
  return e.encode ? e.strict ? it(s) : encodeURIComponent(s) : s;
}
function E(s, e) {
  return e.decode ? tt(s) : s;
}
function ae(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? ae(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function oe(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function ot(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function Q(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function z(s) {
  s = oe(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function Y(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, ne(e.arrayFormatSeparator);
  const t = at(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const n = e.decode ? i.replace(/\+/g, " ") : i;
    let [a, o] = ie(n, "=");
    a === void 0 && (a = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : E(o, e), t(E(a, e), o, r);
  }
  for (const [i, n] of Object.entries(r))
    if (typeof n == "object" && n !== null)
      for (const [a, o] of Object.entries(n))
        n[a] = Q(o, e);
    else
      r[i] = Q(n, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((i, n) => {
    const a = r[n];
    return a && typeof a == "object" && !Array.isArray(a) ? i[n] = ae(a) : i[n] = a, i;
  }, /* @__PURE__ */ Object.create(null));
}
function le(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, ne(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && rt(s[a]) || e.skipEmptyString && s[a] === "", r = nt(e), i = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (i[a] = o);
  const n = Object.keys(i);
  return e.sort !== !1 && n.sort(e.sort), n.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? p(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? p(a, e) + "[]" : o.reduce(r(a), []).join("&") : p(a, e) + "=" + p(o, e);
  }).filter((a) => a.length > 0).join("&");
}
function ue(s, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = ie(s, "#");
  return t === void 0 && (t = s), {
    url: ((i = t == null ? void 0 : t.split("?")) == null ? void 0 : i[0]) ?? "",
    query: Y(z(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: E(r, e) } : {}
  };
}
function de(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [M]: !0,
    ...e
  };
  const t = oe(s.url).split("?")[0] || "", r = z(s.url), i = {
    ...Y(r, { sort: !1 }),
    ...s.query
  };
  let n = le(i, e);
  n && (n = `?${n}`);
  let a = ot(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[M] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${n}${a}`;
}
function ce(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [M]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: n } = ue(s, t);
  return de({
    url: r,
    query: st(i, e),
    fragmentIdentifier: n
  }, t);
}
function lt(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, n) => !e(i, n);
  return ce(s, r, t);
}
const X = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: lt,
  extract: z,
  parse: Y,
  parseUrl: ue,
  pick: ce,
  stringify: le,
  stringifyUrl: de
}, Symbol.toStringTag, { value: "Module" }));
let W = null;
class I {
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
    const r = new I();
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
    const e = X.parse(window.location.search, {
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
    ), i = e + "?" + X.stringify(r, { arrayFormat: "bracket" });
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
        delete: new j(),
        patch: new j()
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
    if (u.query.items.find((O) => O.id === l.id))
      return l.isProcessing = !1, a.data;
    this.attributes.query.items.splice(o, 1);
    const C = this.attributes.query.items.map((O) => O.id);
    return u.query.items.filter(
      (O) => !C.includes(O.id)
    ).forEach((O) => this.attributes.query.items.push(O)), a.data;
  }
  async update(e, { props: t, data: r, config: i, method: n = "patch" }) {
    let a;
    const { index: o, row: l } = t;
    l.isProcessing = !0, n === "patch" ? a = await h.patch(e, i) : n === "post" && (a = await h.post(e, r, i));
    const u = await this.fetch(), F = u.query.items.find((O) => O.id === l.id);
    if (F)
      return l.isProcessing = !1, Object.assign(l, F), a.data;
    this.attributes.query.items.splice(o, 1);
    const C = this.attributes.query.items.map((O) => O.id);
    return u.query.items.filter(
      (O) => !C.includes(O.id)
    ).forEach((O) => this.attributes.query.items.push(O)), a.data;
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
    l || (l = a.states[i] = j.create()), l.loading();
    const { data: u } = await h[n](e || this.baseUrl, r).catch(
      (C) => {
        throw l.failed(), C;
      }
    );
    l.loaded(), u.row && Object.assign(a, u.row);
    const F = await this.fetch();
    if (this.attributes.query.items.splice(o, 1), !F.query.items.length)
      return this.attributes.params.page--, await this.load(), u;
    if (this.attributes.query.items.length < F.query.items.length) {
      const C = F.query.items[F.query.items.length - 1];
      this.push(C);
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
    }), await we(), this.loaded(), this.hideFilter();
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
const ut = {
  name: "WyxosForm",
  props: {
    form: {
      type: T,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: I,
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
function dt(s, e, t, r, i, n) {
  const a = m("o-loading"), o = m("o-button");
  return t.form.isLoaded ? (c(), _("form", {
    key: 0,
    class: A(t.formClass),
    onSubmit: e[0] || (e[0] = ee((l) => n.handle(), ["prevent"]))
  }, [
    $(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (c(), w(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (c(), w(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: g(() => [
      x(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : v("", !0);
}
const ct = /* @__PURE__ */ y(ut, [["render", dt]]), ht = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ct
}, Symbol.toStringTag, { value: "Module" })), ft = {
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
}, mt = ["width", "height"];
function gt(s, e, t, r, i, n) {
  return c(), _("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, mt);
}
const pt = /* @__PURE__ */ y(ft, [["render", gt]]), yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pt
}, Symbol.toStringTag, { value: "Module" })), bt = {
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
      type: T,
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
function _t(s, e, t, r, i, n) {
  const a = m("o-input"), o = m("o-field");
  return c(), w(o, R({
    class: t.fieldClass,
    label: t.label
  }, n.getError), {
    default: g(() => [
      S(a, {
        class: A(t.inputClass),
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
const St = /* @__PURE__ */ y(bt, [["render", _t]]), wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: St
}, Symbol.toStringTag, { value: "Module" })), Ot = {
  name: "WyxosListing",
  props: {
    listing: {
      type: I,
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
}, vt = { key: 0 }, Ft = { key: 1 }, xt = { key: 2 };
function qt(s, e, t, r, i, n) {
  const a = m("o-table");
  return c(), w(a, B(N(n.allPropsAndEvents)), Oe({
    empty: g(() => [
      t.listing.isEmpty ? (c(), _("p", vt, "No records found.")) : v("", !0),
      t.listing.isSearchEmpty ? (c(), _("p", Ft, " No results for your query. Please adjust your search and try again. ")) : v("", !0),
      t.listing.isFailure ? (c(), _("p", xt, " Failure to load the list. Try again or reload the page. ")) : v("", !0)
    ]),
    _: 2
  }, [
    te(s.$slots, (o, l) => ({
      name: l,
      fn: g((u) => [
        $(s.$slots, l, B(N(u)))
      ])
    }))
  ]), 1040);
}
const $t = /* @__PURE__ */ y(Ot, [["render", qt]]), jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $t
}, Symbol.toStringTag, { value: "Module" })), Ct = {
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
      type: T,
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
function Et(s, e, t, r, i, n) {
  const a = m("o-input"), o = m("o-field");
  return c(), w(o, R({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: g(() => [
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
const Tt = /* @__PURE__ */ y(Ct, [["render", Et]]), Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tt
}, Symbol.toStringTag, { value: "Module" })), Rt = {
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
function Vt(s, e, t, r, i, n) {
  return $(s.$slots, "default", { logout: n.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => n.logout())
    }, "Sign out")
  ]);
}
const Lt = /* @__PURE__ */ y(Rt, [["render", Vt]]), kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lt
}, Symbol.toStringTag, { value: "Module" })), It = Z({
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
}), Wt = ["value", "max"], At = { key: 0 };
function Bt(s, e, t, r, i, n) {
  return c(), _(se, null, [
    f("progress", {
      value: s.value,
      max: s.max
    }, null, 8, Wt),
    s.showValue ? (c(), _("span", At, b(s.value) + " / " + b(s.max), 1)) : v("", !0)
  ], 64);
}
const Nt = /* @__PURE__ */ y(It, [["render", Bt]]), Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nt
}, Symbol.toStringTag, { value: "Module" })), Mt = {
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
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Dt = { class: "flex gap-6" };
function zt(s, e, t, r, i, n) {
  const a = m("wyxos-button"), o = m("o-modal");
  return c(), w(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      f("h2", null, b(t.title), 1),
      f("p", null, b(t.message), 1),
      f("div", Dt, [
        S(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: g(() => [
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
          default: g(() => [
            x(b(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const he = /* @__PURE__ */ y(Mt, [["render", zt]]), Yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: he
}, Symbol.toStringTag, { value: "Module" })), Jt = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: I,
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
      destroy: T.create()
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
}, Ht = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), Kt = { class: "content p-6" }, Qt = /* @__PURE__ */ f("h3", { class: "title" }, "Delete", -1), Xt = /* @__PURE__ */ f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), Gt = { class: "buttons flex gap-6 justify-end" };
function Zt(s, e, t, r, i, n) {
  const a = m("o-button"), o = m("w-button"), l = m("o-modal");
  return c(), w(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (u) => n.onRemove())
  }, {
    default: g(() => [
      $(s.$slots, "button", {}, () => [
        Ht
      ]),
      i.isVisible ? (c(), w(ve, {
        key: 0,
        to: "body"
      }, [
        S(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (u) => i.isVisible = u)
        }, {
          default: g(() => [
            f("div", Kt, [
              $(s.$slots, "title", {}, () => [
                Qt
              ]),
              $(s.$slots, "message", {}, () => [
                Xt
              ]),
              f("div", Gt, [
                S(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (u) => i.isVisible = !1)
                }, {
                  default: g(() => [
                    x("Cancel ")
                  ]),
                  _: 1
                }),
                S(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (u) => n.remove())
                }, {
                  default: g(() => [
                    $(s.$slots, "confirm", {}, () => [
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
const es = /* @__PURE__ */ y(Jt, [["render", Zt]]), ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" })), ss = {
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
      type: T,
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
}, rs = ["value"];
function is(s, e, t, r, i, n) {
  var l;
  const a = m("o-select"), o = m("o-field");
  return c(), w(o, R({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      S(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (u) => n.updateValue(u))
      }, {
        default: g(() => [
          $(s.$slots, "default", {}, () => [
            t.items ? (c(!0), _(se, { key: 0 }, te(t.items, (u) => (c(), _("option", {
              key: u.value,
              value: u.value
            }, b(u.label), 9, rs))), 128)) : v("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const ns = /* @__PURE__ */ y(ss, [["render", is]]), as = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ns
}, Symbol.toStringTag, { value: "Module" })), os = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: T.create({
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
}, ls = { class: "bg-white p-6" }, us = /* @__PURE__ */ f("h2", { class: "title" }, "Session Expired", -1), ds = /* @__PURE__ */ f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), cs = { class: "buttons" };
function hs(s, e, t, r, i, n) {
  const a = m("wyxos-input"), o = m("w-button"), l = m("o-modal");
  return c(), w(l, { active: !0 }, {
    default: g(() => [
      f("div", ls, [
        us,
        ds,
        f("form", {
          onSubmit: e[3] || (e[3] = ee((...u) => n.proceed && n.proceed(...u), ["prevent"]))
        }, [
          S(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (u) => r.login.email = u),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          S(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (u) => r.login.password = u),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", cs, [
            S(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (u) => n.onLogout())
            }, {
              default: g(() => [
                x(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            S(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: g(() => [
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
const fe = /* @__PURE__ */ y(os, [["render", hs]]), fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fe
}, Symbol.toStringTag, { value: "Module" })), ms = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: T,
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
}, gs = { key: 0 }, ps = { key: 1 }, ys = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin" }, null, -1), bs = { key: 2 }, _s = { key: 3 };
function Ss(s, e, t, r, i, n) {
  const a = m("o-button");
  return c(), w(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: g(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), _("span", gs, b(i.mergedLabels.submit), 1)) : v("", !0),
      t.form.isSubmitting ? (c(), _("span", ps, [
        x(b(i.mergedLabels.submitting) + " ", 1),
        ys
      ])) : v("", !0),
      t.form.isSubmitted ? (c(), _("span", bs, b(i.mergedLabels.submitted), 1)) : v("", !0),
      t.form.isSubmitFailed ? (c(), _("span", _s, b(i.mergedLabels.failed), 1)) : v("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const ws = /* @__PURE__ */ y(ms, [["render", Ss]]), Os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ws
}, Symbol.toStringTag, { value: "Module" }));
class J {
  constructor(e = {}) {
    d(this, "state", new j());
    d(this, "result", k([]));
    d(this, "value", k(null));
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
    return new J(e);
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
const vs = {
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
      search: J.create()
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
function Fs(s, e, t, r, i, n) {
  const a = m("o-inputitems");
  return c(), w(a, R({
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
const xs = /* @__PURE__ */ y(vs, [["render", Fs]]), qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xs
}, Symbol.toStringTag, { value: "Module" })), $s = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, js = { class: "bg-white p-6" }, Cs = /* @__PURE__ */ f("h2", { class: "title" }, "Session expired", -1), Es = /* @__PURE__ */ f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Ts = { class: "buttons" };
function Ps(s, e, t, r, i, n) {
  const a = m("w-button"), o = m("o-modal");
  return c(), w(o, { active: !0 }, {
    default: g(() => [
      f("div", js, [
        Cs,
        Es,
        f("div", Ts, [
          S(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: g(() => [
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
const me = /* @__PURE__ */ y($s, [["render", Ps]]), Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: me
}, Symbol.toStringTag, { value: "Module" }));
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
class ge {
  constructor() {
    d(this, "state", k(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new ge();
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
class Hs {
  constructor(e) {
    d(this, "current", k(null));
    d(this, "history", k([]));
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
class pe {
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
    return new pe(e);
  }
}
class Vs {
  constructor() {
    d(this, "attributes", q({
      user: null
    }));
    d(this, "state", new j());
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
const Ks = new Vs();
async function Qs(s = {}) {
  const { oruga: e } = D();
  return (await e.modal.open({
    component: he,
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
class ks {
  constructor() {
    d(this, "FORMATS", Ls);
  }
  format(e, t, r = "") {
    return e ? L(e).format(t) : r;
  }
}
const Xs = new ks();
async function Is(s, e) {
  var n, a, o, l, u;
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
  const r = t[(n = s.response) == null ? void 0 : n.status] || t[500], { oruga: i } = D();
  if (i.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((a = s.response) == null ? void 0 : a.status) === 419) {
    i.modal.open({
      component: me,
      trapFocus: !0,
      closable: !1
    });
    const C = (await h.get("/heartbeat")).data.csrfToken;
    h.defaults.headers.common["X-CSRF-TOKEN"] = C;
  }
  return ((o = s.response) == null ? void 0 : o.status) === 401 && i.modal.open({
    component: ((l = e.components) == null ? void 0 : l.SessionExpired) || fe,
    trapFocus: !0,
    closable: !1
  }), ((u = s.response) == null ? void 0 : u.status) === 422 && new Promise((F) => setTimeout(F, 500)).then(() => {
    const F = document.querySelector(".o-field__label-danger");
    F && F.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(s);
}
function Gs(s) {
  const { oruga: e } = D();
  e.notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function Ws(s) {
  h.interceptors.response.use(null, (e) => Is(e, s));
}
const G = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": Ce, "./components/WyxosCollection.vue": Ve, "./components/WyxosConfirm.vue": Ue, "./components/WyxosDatepicker.vue": Ye, "./components/WyxosError.vue": Ge, "./components/WyxosForm.vue": ht, "./components/WyxosImage.vue": yt, "./components/WyxosInput.vue": wt, "./components/WyxosListing.vue": jt, "./components/WyxosLiveInput.vue": Pt, "./components/WyxosLogout.vue": kt, "./components/WyxosProgress.vue": Ut, "./components/WyxosPrompt.vue": Yt, "./components/WyxosRemove.vue": ts, "./components/WyxosSelect.vue": as, "./components/WyxosSessionExpired.vue": fs, "./components/WyxosSubmit.vue": Os, "./components/WyxosTags.vue": qs, "./components/WyxosTokenExpired.vue": Rs }), ye = {}, As = (s, e = { vision: {}, oruga: {} }) => {
  s.use(Fe, e.oruga), Object.keys(G).forEach((t) => {
    const r = G[t];
    if (r && r.default) {
      const i = r.default, n = i.name;
      n ? (s.component(n, i), s.component(n.replace("Wyxos", "W"), i), ye[n] = i) : console.error(`Component in '${t}' does not have a name property`);
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Ws(e);
}, Zs = {
  install: As,
  ...ye
};
export {
  zs as FileRequest,
  T as FormBuilder,
  I as Listing,
  j as LoadState,
  ge as Modal,
  Ys as Option,
  Js as ResourceList,
  J as Search,
  Hs as Steps,
  pe as Tab,
  je as WyxosButton,
  Re as WyxosCollection,
  Ne as WyxosConfirm,
  ze as WyxosDatepicker,
  Xe as WyxosError,
  ct as WyxosForm,
  pt as WyxosImage,
  St as WyxosInput,
  $t as WyxosListing,
  Tt as WyxosLiveInput,
  Lt as WyxosLogout,
  Nt as WyxosProgress,
  he as WyxosPrompt,
  es as WyxosRemove,
  ns as WyxosSelect,
  fe as WyxosSessionExpired,
  ws as WyxosSubmit,
  xs as WyxosTags,
  me as WyxosTokenExpired,
  Ks as auth,
  Qs as confirm,
  Xs as dateRender,
  Zs as default,
  Is as errorHandler,
  Gs as success,
  V as useFormErrors
};
//# sourceMappingURL=vision.js.map
