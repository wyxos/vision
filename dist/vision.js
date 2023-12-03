var be = Object.defineProperty;
var _e = (s, e, t) => e in s ? be(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => (_e(s, typeof e != "symbol" ? e + "" : e, t), t);
import { resolveComponent as f, openBlock as c, createBlock as v, withCtx as m, renderSlot as q, createTextVNode as x, createCommentVNode as _, toDisplayString as b, createElementBlock as S, normalizeProps as I, guardReactiveProps as N, createElementVNode as h, reactive as O, createVNode as w, normalizeClass as W, mergeProps as V, defineComponent as ee, Fragment as D, withModifiers as te, createSlots as Se, renderList as se, Teleport as we, ref as k } from "vue";
import R from "moment";
import p from "axios";
import ve, { useProgrammatic as z } from "@oruga-ui/oruga-next";
const y = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, Fe = {
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
}, Oe = {
  key: 2,
  class: "fas fa-spinner fa-spin"
};
function xe(s, e, t, r, i, a) {
  const n = f("o-button");
  return c(), v(n, { disabled: t.loading }, {
    default: m(() => [
      t.loading ? _("", !0) : q(s.$slots, "default", { key: 0 }, () => [
        x("Submit")
      ]),
      t.loading && t.text ? q(s.$slots, "loading", { key: 1 }, () => [
        x(b(t.text), 1)
      ]) : _("", !0),
      t.loading ? (c(), S("i", Oe)) : _("", !0)
    ]),
    _: 3
  }, 8, ["disabled"]);
}
const qe = /* @__PURE__ */ y(Fe, [["render", xe]]), $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qe
}, Symbol.toStringTag, { value: "Module" })), je = {
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
}, Ce = /* @__PURE__ */ h("ul", null, [
  /* @__PURE__ */ h("li")
], -1);
function Ee(s, e, t, r, i, a) {
  return q(s.$slots, "default", I(N({ add: a.add, remove: a.remove, items: i.items })), () => [
    Ce
  ]);
}
const Le = /* @__PURE__ */ y(je, [["render", Ee]]), Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Le
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
const Pe = {
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
}, Te = { class: "bg-white p-6" }, Re = { class: "title" }, ke = { class: "mb-6" }, Ae = {
  class: "buttons",
  role: "group"
};
function We(s, e, t, r, i, a) {
  const n = f("wyxos-button"), o = f("o-modal");
  return c(), v(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      h("section", Te, [
        h("article", null, [
          h("header", null, [
            h("h3", Re, b(t.title), 1)
          ]),
          h("p", ke, b(t.message), 1),
          h("footer", Ae, [
            w(n, {
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
            w(n, {
              class: W([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => a.proceed())
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
const Ie = /* @__PURE__ */ y(Pe, [["render", We]]), Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), L = O({
  default: []
});
function P() {
  return {
    createBag(s) {
      L[s] || (L[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      L[e] = Object.keys(s.response.data.errors).map((r) => ({
        key: r,
        message: s.response.data.errors[r][0]
      }));
    },
    get(s, e = "default") {
      const t = L[e];
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
        const t = L[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((i) => i.key === s);
        t.splice(r, 1);
        return;
      }
      L[e] = [];
    },
    all(s = "default") {
      return L[s];
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
    return this.errors = P(), this.errors.createBag(this.errorBag), this.setAttributes(e), this.loaded(), new Proxy(this, {
      get(t, r, i) {
        if (Reflect.has(t, r))
          return Reflect.get(t, r, i);
        if (Reflect.has(t.form, r)) {
          const a = r.split(".");
          if (a.length > 1) {
            let n = t.form;
            for (let o = 0; o < a.length; o++)
              n = n[a[o]];
            return n ?? void 0;
          }
          return Reflect.get(t.form, r);
        }
      },
      set(t, r, i, a) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, i, a);
        if (Reflect.has(t.form, r)) {
          const n = r.split(".");
          if (n.length > 1) {
            let o = t.form;
            for (let l = 0; l < n.length - 1; l++)
              n[l] in o || (o[n[l]] = {}), o = o[n[l]];
            return o[n[n.length - 1]] === void 0 ? !1 : (o[n[n.length - 1]] = i, !0);
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
    this.errorBag = e || "default", this.errors = P(), this.errors.createBag(this.errorBag);
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
    const a = r ? r(this.form) : { ...this.form };
    let n;
    return ["get", "delete"].includes(e) ? (i.params = a, n = p[e](t, i)) : n = p[e](t, a, i), n.then((o) => (this.abortController = null, this.clearErrors(), this.submitted(), this.states.submit.reset(), o.data)).catch((o) => (o.name === "AbortError" ? console.log("Request aborted:", o.message) : (this.submitFailed(), this.errors.set(o, this.errorBag)), Promise.reject(o)));
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
    this.states.load.loading();
    try {
      const { data: a } = await p.get(e || this.paths.load, i);
      return r && Object.assign(this.original, a.form), Object.assign(this.form, a.form), a.model && Object.assign(this.model, a.model), t && this.loaded(), a;
    } catch (a) {
      throw this.states.load.failed(), a;
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
      this.query = s ? R(s, this.submitFormat)._d : null;
    }
  },
  mounted() {
    this.modelValue && (this.query = R(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? R(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? R(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function Ue(s, e, t, r, i, a) {
  var l;
  const n = f("o-datepicker"), o = f("o-field");
  return c(), v(o, V({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      w(n, V({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (d) => i.query = d)
      }, t.options, {
        "date-formatter": a.dateFormatter,
        "onUpdate:modelValue": a.updateQuery
      }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Me = /* @__PURE__ */ y(Be, [["render", Ue]]), De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), ze = ee({
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
      errors: P()
    };
  }
}), Ye = { key: 0 }, Je = { key: 1 };
function He(s, e, t, r, i, a) {
  var n, o;
  return (n = s.form) != null && n.getError(s.name).message ? (c(), S("p", Ye, b(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (c(), S("p", Je, b(s.errors.get(s.name).message), 1)) : _("", !0);
}
const Ke = /* @__PURE__ */ y(ze, [["render", He]]), Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
}, Symbol.toStringTag, { value: "Module" })), re = "%[a-f0-9]{2}", K = new RegExp("(" + re + ")|([^%]+?)", "gi"), Q = new RegExp("(" + re + ")+", "gi");
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
function Xe(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(K) || [];
    for (let t = 1; t < e.length; t++)
      s = B(e, t).join(""), e = s.match(K) || [];
    return s;
  }
}
function Ge(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = Q.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = Xe(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = Q.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const i of r)
    s = s.replace(new RegExp(i, "g"), e[i]);
  return s;
}
function Ze(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return Ge(s);
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
function et(s, e) {
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
        const a = s[r];
        e(r, a, s) && Object.defineProperty(t, r, i);
      }
    }
  return t;
}
const tt = (s) => s == null, st = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), U = Symbol("encodeFragmentIdentifier");
function rt(s) {
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
function it(s) {
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
        const a = typeof r == "string" && r.includes(s.arrayFormatSeparator), n = typeof r == "string" && !a && j(r, s).includes(s.arrayFormatSeparator);
        r = n ? j(r, s) : r;
        const o = a || n ? r.split(s.arrayFormatSeparator).map((l) => j(l, s)) : r === null ? r : j(r, s);
        i[t] = o;
      };
    case "bracket-separator":
      return (t, r, i) => {
        const a = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !a) {
          i[t] = r && j(r, s);
          return;
        }
        const n = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => j(o, s));
        if (i[t] === void 0) {
          i[t] = n;
          return;
        }
        i[t] = [...i[t], ...n];
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
function ae(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function g(s, e) {
  return e.encode ? e.strict ? st(s) : encodeURIComponent(s) : s;
}
function j(s, e) {
  return e.decode ? Ze(s) : s;
}
function ne(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? ne(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function oe(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function at(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function X(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function Y(s) {
  s = oe(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function J(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, ae(e.arrayFormatSeparator);
  const t = it(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const a = e.decode ? i.replace(/\+/g, " ") : i;
    let [n, o] = ie(a, "=");
    n === void 0 && (n = a), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : j(o, e), t(j(n, e), o, r);
  }
  for (const [i, a] of Object.entries(r))
    if (typeof a == "object" && a !== null)
      for (const [n, o] of Object.entries(a))
        a[n] = X(o, e);
    else
      r[i] = X(a, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((i, a) => {
    const n = r[a];
    return n && typeof n == "object" && !Array.isArray(n) ? i[a] = ne(n) : i[a] = n, i;
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
  }, ae(e.arrayFormatSeparator);
  const t = (n) => e.skipNull && tt(s[n]) || e.skipEmptyString && s[n] === "", r = rt(e), i = {};
  for (const [n, o] of Object.entries(s))
    t(n) || (i[n] = o);
  const a = Object.keys(i);
  return e.sort !== !1 && a.sort(e.sort), a.map((n) => {
    const o = s[n];
    return o === void 0 ? "" : o === null ? g(n, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? g(n, e) + "[]" : o.reduce(r(n), []).join("&") : g(n, e) + "=" + g(o, e);
  }).filter((n) => n.length > 0).join("&");
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
    query: J(Y(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: j(r, e) } : {}
  };
}
function de(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [U]: !0,
    ...e
  };
  const t = oe(s.url).split("?")[0] || "", r = Y(s.url), i = {
    ...J(r, { sort: !1 }),
    ...s.query
  };
  let a = le(i, e);
  a && (a = `?${a}`);
  let n = at(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, n = e[U] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${a}${n}`;
}
function ce(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [U]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: a } = ue(s, t);
  return de({
    url: r,
    query: et(i, e),
    fragmentIdentifier: a
  }, t);
}
function nt(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, a) => !e(i, a);
  return ce(s, r, t);
}
const G = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: nt,
  extract: Y,
  parse: J,
  parseUrl: ue,
  pick: ce,
  stringify: le,
  stringifyUrl: de
}, Symbol.toStringTag, { value: "Module" }));
let E;
class A {
  constructor() {
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
    const r = new A();
    return r.errors = P(), r.errors.createBag(this.errorBag), r.options = Object.assign(
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
    const e = G.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    e.page && (e.page = Number(e.page)), Object.assign(this.params, this.structure, e);
  }
  async fetch(e, t) {
    this.states.fetch.loading();
    const r = JSON.parse(JSON.stringify(this.params)), i = e || this.baseUrl;
    try {
      const { data: a } = await this.api.get(i, {
        params: r,
        cancelToken: t
      });
      return this.states.fetch.loaded(), this.options.enableSearchUpdate && this.refreshUrl(), a;
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
      Object.entries(t).filter(([a, n]) => n != null)
    ), i = e + "?" + G.stringify(r, { arrayFormat: "bracket" });
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
    this.errors.clear(null, this.errorBag), E && E.cancel(), E = p.CancelToken.source(), this.states.fetch.loading(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let t = null;
    try {
      this.states.fetch.loading();
      const r = JSON.parse(JSON.stringify(this.params)), i = e || this.baseUrl, a = await this.api.get(i, {
        params: r,
        cancelToken: E.token
      }).catch((n) => {
        throw this.states.fetch.failed(), n;
      });
      if (this.states.fetch.loaded(), t = a.data, this.states.fetch.loaded(), !t || !t.query || !t.query.items)
        throw this.states.fetch.failed(), Error("Response format is invalid.");
      return Object.assign(this.query, t.query, {
        items: t.query.items.map((n) => this.transformItem(n))
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
    const { data: a } = await this.api.patch(e || this.baseUrl, r).catch((o) => {
      throw o;
    });
    return a.patch && Object.assign(i, a.patch), (await this.fetch()).query.items.length || (this.params.page--, await this.load()), a;
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
  async processRowAndRefreshList({ path: e, props: t, payload: r, state: i, method: a } = {}) {
    const { row: n, index: o } = t;
    r = {
      id: n.id,
      ...r
    };
    let l = n.states[i];
    l || (l = n.states[i] = F.create()), l.loading();
    const { data: d } = await this.api[a](
      e || this.baseUrl,
      r
    ).catch((T) => {
      throw l.failed(), T;
    });
    l.loaded(), d.row && Object.assign(n, d.row);
    const $ = await this.fetch();
    if (this.query.items.splice(o, 1), !$.query.items.length)
      return this.params.page--, await this.load(), d;
    if (this.query.items.length < $.query.items.length) {
      const T = $.query.items[$.query.items.length - 1];
      this.push(T);
    }
    return d;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), E && E.cancel(), this.states.filter.loading(), this.states.load.loading(), E = p.CancelToken.source(), this.query.items = [], this.query.total = 0, this.query.showing = 0;
    let e = null;
    try {
      const t = JSON.parse(JSON.stringify(this.params)), r = this.baseUrl;
      e = (await this.api.get(r, {
        params: t,
        cancelToken: E.token
      }).catch((a) => {
        throw this.states.filter.failed(), a;
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
const ot = {
  name: "WyxosForm",
  props: {
    form: {
      type: C,
      required: !0
    },
    submit: {
      type: Function,
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
function lt(s, e, t, r, i, a) {
  const n = f("o-loading"), o = f("o-button");
  return c(), S(D, null, [
    t.form.isLoaded ? (c(), S("form", {
      key: 0,
      class: W(t.formClass),
      onSubmit: e[0] || (e[0] = te((l) => a.handle(), ["prevent"]))
    }, [
      q(s.$slots, "default")
    ], 34)) : _("", !0),
    t.form.isLoading ? (c(), v(n, {
      key: 1,
      active: !0
    })) : _("", !0),
    t.form.isFailure ? (c(), v(o, {
      key: 2,
      onClick: e[1] || (e[1] = (l) => t.form.load())
    }, {
      default: m(() => [
        x(" Error. Retry or refresh. ")
      ]),
      _: 1
    })) : _("", !0)
  ], 64);
}
const ut = /* @__PURE__ */ y(ot, [["render", lt]]), dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ut
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
}, ht = ["width", "height"];
function ft(s, e, t, r, i, a) {
  return c(), S("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, ht);
}
const mt = /* @__PURE__ */ y(ct, [["render", ft]]), gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" })), pt = {
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
      errors: P()
    };
  },
  methods: {
    onInput(s) {
      this.form ? this.form.clearError(this.name) : this.errors.clear(this.name, this.bag), this.$emit("update:modelValue", s);
    },
    getError() {
      if (this.name)
        return this.form ? this.form.getError(this.name) : this.errors.get(this.name);
    }
  }
};
function yt(s, e, t, r, i, a) {
  const n = f("o-input"), o = f("o-field");
  return c(), v(o, V({
    label: t.label,
    class: t.fieldClass
  }, { ...a.getError() }), {
    default: m(() => [
      w(n, {
        readonly: t.readonly,
        class: W(t.inputClass),
        "root-class": t.inputRootClass,
        name: t.name,
        type: t.type,
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => a.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const bt = /* @__PURE__ */ y(pt, [["render", yt]]), _t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bt
}, Symbol.toStringTag, { value: "Module" })), St = {
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
}, wt = { key: 0 }, vt = { key: 1 }, Ft = { key: 2 };
function Ot(s, e, t, r, i, a) {
  const n = f("o-table");
  return c(), v(n, I(N(a.allPropsAndEvents)), Se({
    empty: m(() => [
      t.listing.isEmpty ? (c(), S("p", wt, "No records found.")) : _("", !0),
      t.listing.isSearchEmpty ? (c(), S("p", vt, " No results for your query. Please adjust your search and try again. ")) : _("", !0),
      t.listing.isFailure ? (c(), S("p", Ft, " Failure to load the list. Try again or reload the page. ")) : _("", !0)
    ]),
    _: 2
  }, [
    se(s.$slots, (o, l) => ({
      name: l,
      fn: m((d) => [
        q(s.$slots, l, I(N(d)))
      ])
    }))
  ]), 1040);
}
const xt = /* @__PURE__ */ y(St, [["render", Ot]]), qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xt
}, Symbol.toStringTag, { value: "Module" })), $t = {
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
      errors: P()
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
function jt(s, e, t, r, i, a) {
  const n = f("o-input"), o = f("o-field");
  return c(), v(o, V({
    label: t.label,
    class: t.fieldClass
  }, { ...a.getError() }), {
    default: m(() => [
      w(n, {
        readonly: t.readonly,
        class: W(t.inputClass),
        "root-class": t.inputRootClass,
        name: t.name,
        type: t.type,
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => a.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const Ct = /* @__PURE__ */ y($t, [["render", jt]]), Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ct
}, Symbol.toStringTag, { value: "Module" })), Lt = {
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
}, Vt = { class: "bg-white p-6" }, Pt = /* @__PURE__ */ h("h2", { class: "title" }, "Session Expired", -1), Tt = /* @__PURE__ */ h("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Rt = { class: "buttons" };
function kt(s, e, t, r, i, a) {
  const n = f("wyxos-input"), o = f("w-button"), l = f("o-modal");
  return c(), v(l, { active: !0 }, {
    default: m(() => [
      h("div", Vt, [
        Pt,
        Tt,
        h("form", {
          onSubmit: e[3] || (e[3] = te((...d) => a.proceed && a.proceed(...d), ["prevent"]))
        }, [
          w(n, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (d) => r.login.email = d),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          w(n, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (d) => r.login.password = d),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          h("div", Rt, [
            w(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (d) => a.onLogout())
            }, {
              default: m(() => [
                x(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            w(o, {
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
const he = /* @__PURE__ */ y(Lt, [["render", kt]]), At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: he
}, Symbol.toStringTag, { value: "Module" })), Wt = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, It = { class: "bg-white p-6" }, Nt = /* @__PURE__ */ h("h2", { class: "title" }, "Session expired", -1), Bt = /* @__PURE__ */ h("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Ut = { class: "buttons" };
function Mt(s, e, t, r, i, a) {
  const n = f("w-button"), o = f("o-modal");
  return c(), v(o, { active: !0 }, {
    default: m(() => [
      h("div", It, [
        Nt,
        Bt,
        h("div", Ut, [
          w(n, {
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
const fe = /* @__PURE__ */ y(Wt, [["render", Mt]]), Dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fe
}, Symbol.toStringTag, { value: "Module" }));
async function M(s, e) {
  var a, n, o, l, d;
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
  const r = t[(a = s.response) == null ? void 0 : a.status] || t[500], { oruga: i } = z();
  if (i.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((n = s.response) == null ? void 0 : n.status) === 419) {
    i.modal.open({
      component: fe,
      trapFocus: !0,
      closable: !1
    });
    const T = (await p.get("/heartbeat")).data.csrfToken;
    p.defaults.headers.common["X-CSRF-TOKEN"] = T;
  }
  return ((o = s.response) == null ? void 0 : o.status) === 401 && i.modal.open({
    component: ((l = e.components) == null ? void 0 : l.SessionExpired) || he,
    trapFocus: !0,
    closable: !1
  }), ((d = s.response) == null ? void 0 : d.status) === 422 && new Promise(($) => setTimeout($, 500)).then(() => {
    const $ = document.querySelector(".o-field__label-danger");
    $ && $.scrollIntoView({ behavior: "smooth" });
  }), Promise.reject(s);
}
const zt = {
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
        M(e);
      }).catch(M);
      console.log("data", s), window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function Yt(s, e, t, r, i, a) {
  return q(s.$slots, "default", { logout: a.logout }, () => [
    h("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (n) => a.logout())
    }, "Sign out")
  ]);
}
const Jt = /* @__PURE__ */ y(zt, [["render", Yt]]), Ht = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jt
}, Symbol.toStringTag, { value: "Module" })), Kt = ee({
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
}), Qt = ["value", "max"], Xt = { key: 0 };
function Gt(s, e, t, r, i, a) {
  return c(), S(D, null, [
    h("progress", {
      value: s.value,
      max: s.max
    }, null, 8, Qt),
    s.showValue ? (c(), S("span", Xt, b(s.value) + " / " + b(s.max), 1)) : _("", !0)
  ], 64);
}
const Zt = /* @__PURE__ */ y(Kt, [["render", Gt]]), es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zt
}, Symbol.toStringTag, { value: "Module" })), ts = {
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
}, ss = { class: "flex gap-6" };
function rs(s, e, t, r, i, a) {
  const n = f("wyxos-button"), o = f("o-modal");
  return c(), v(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      h("h2", null, b(t.title), 1),
      h("p", null, b(t.message), 1),
      h("div", ss, [
        w(n, {
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
        w(n, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => a.proceed())
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
const me = /* @__PURE__ */ y(ts, [["render", rs]]), is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: me
}, Symbol.toStringTag, { value: "Module" })), as = {
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
}, ns = /* @__PURE__ */ h("i", { class: "fas fa-trash" }, null, -1), os = { class: "content p-6" }, ls = /* @__PURE__ */ h("h3", { class: "title" }, "Delete", -1), us = /* @__PURE__ */ h("p", { class: "mb-4" }, "Are you sur you want to delete this record?", -1), ds = { class: "buttons flex gap-6 justify-end" };
function cs(s, e, t, r, i, a) {
  const n = f("o-button"), o = f("w-button"), l = f("o-modal");
  return c(), v(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (d) => a.onRemove())
  }, {
    default: m(() => [
      q(s.$slots, "button", {}, () => [
        ns
      ]),
      i.isVisible ? (c(), v(we, {
        key: 0,
        to: "body"
      }, [
        w(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (d) => i.isVisible = d)
        }, {
          default: m(() => [
            h("div", os, [
              q(s.$slots, "title", {}, () => [
                ls
              ]),
              q(s.$slots, "message", {}, () => [
                us
              ]),
              h("div", ds, [
                w(n, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (d) => i.isVisible = !1)
                }, {
                  default: m(() => [
                    x("Cancel")
                  ]),
                  _: 1
                }),
                w(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (d) => a.remove())
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
      ])) : _("", !0)
    ]),
    _: 3
  });
}
const hs = /* @__PURE__ */ y(as, [["render", cs]]), fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), ms = {
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
}, gs = ["value"];
function ps(s, e, t, r, i, a) {
  var l;
  const n = f("o-select"), o = f("o-field");
  return c(), v(o, V({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      w(n, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (d) => a.updateValue(d))
      }, {
        default: m(() => [
          q(s.$slots, "default", {}, () => [
            t.items ? (c(!0), S(D, { key: 0 }, se(t.items, (d) => (c(), S("option", {
              key: d.value,
              value: d.value
            }, b(d.label), 9, gs))), 128)) : _("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const ys = /* @__PURE__ */ y(ms, [["render", ps]]), bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ys
}, Symbol.toStringTag, { value: "Module" })), _s = {
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
}, Ss = { key: 0 }, ws = { key: 1 }, vs = /* @__PURE__ */ h("i", { class: "fas fa-spinner fa-spin" }, null, -1), Fs = { key: 2 }, Os = { key: 3 };
function xs(s, e, t, r, i, a) {
  const n = f("o-button");
  return c(), v(n, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: m(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), S("span", Ss, b(i.mergedLabels.submit), 1)) : _("", !0),
      t.form.isSubmitting ? (c(), S("span", ws, [
        x(b(i.mergedLabels.submitting) + " ", 1),
        vs
      ])) : _("", !0),
      t.form.isSubmitted ? (c(), S("span", Fs, b(i.mergedLabels.submitted), 1)) : _("", !0),
      t.form.isSubmitFailed ? (c(), S("span", Os, b(i.mergedLabels.failed), 1)) : _("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const qs = /* @__PURE__ */ y(_s, [["render", xs]]), $s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qs
}, Symbol.toStringTag, { value: "Module" }));
class H {
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
    return new H(e);
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
      }).catch((a) => {
        throw this.state.failed(), a;
      });
      this.result.value = i.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: i } = await p.post(`${r}/restore`, t || this.options.payload).catch((a) => {
      throw this.state.failed(), a;
    });
    return this.state.loaded(), i;
  }
  reset() {
    this.result.value = [];
  }
}
const js = {
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
      search: H.create()
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
function Cs(s, e, t, r, i, a) {
  const n = f("o-inputitems");
  return c(), v(n, V({
    ref: "tagInput",
    modelValue: i.query,
    "onUpdate:modelValue": e[0] || (e[0] = (o) => i.query = o),
    data: r.search.result.value,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (o) => a.addedTag(o)),
    onRemove: e[2] || (e[2] = (o) => a.removedTag(o)),
    onTyping: e[3] || (e[3] = (o) => a.searchTags(o))
  }), null, 16, ["modelValue", "data"]);
}
const Es = /* @__PURE__ */ y(js, [["render", Cs]]), Ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Es
}, Symbol.toStringTag, { value: "Module" }));
class Vs {
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
const Us = new Vs();
async function Ms(s = {}) {
  const { oruga: e } = z();
  return (await e.modal.open({
    component: me,
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
const Ps = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Ts {
  constructor() {
    u(this, "FORMATS", Ps);
  }
  format(e, t, r = "") {
    return e ? R(e).format(t) : r;
  }
}
const Ds = new Ts();
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
    u(this, "state", k(!1));
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
    const a = r.base, n = {
      route: r.route,
      index: r.index || `${a}/${e}/index`,
      destroy: `${a}/${e}/destroy`
    }, o = new this();
    return o.options = r, o.structure = t, o.params = Object.assign(o.params, t), o.router = i, o.urls = n, o;
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
  async action(e, { row: t, index: r, remove: i, method: a }, n = {}) {
    t.isProcessing = !0;
    const o = {
      id: t.id,
      ...n
    };
    if (a === "delete") {
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
function Ks(s) {
  const { oruga: e } = z();
  e.notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class pe {
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
    return new pe(e);
  }
}
function Rs(s) {
  p.interceptors.response.use(null, (e) => M(e, s));
}
const Z = /* @__PURE__ */ Object.assign({ "./components/WyxosButton.vue": $e, "./components/WyxosCollection.vue": Ve, "./components/WyxosConfirm.vue": Ne, "./components/WyxosDatepicker.vue": De, "./components/WyxosError.vue": Qe, "./components/WyxosForm.vue": dt, "./components/WyxosImage.vue": gt, "./components/WyxosInput.vue": _t, "./components/WyxosListing.vue": qt, "./components/WyxosLiveInput.vue": Et, "./components/WyxosLogout.vue": Ht, "./components/WyxosProgress.vue": es, "./components/WyxosPrompt.vue": is, "./components/WyxosRemove.vue": fs, "./components/WyxosSelect.vue": bs, "./components/WyxosSessionExpired.vue": At, "./components/WyxosSubmit.vue": $s, "./components/WyxosTags.vue": Ls, "./components/WyxosTokenExpired.vue": Dt }), ye = {}, ks = (s, e = { vision: {}, oruga: {} }) => {
  s.use(ve, e.oruga), Object.keys(Z).forEach((t) => {
    const r = Z[t];
    if (r && r.default) {
      const i = r.default, a = i.name;
      a ? (s.component(a, i), s.component(a.replace("Wyxos", "W"), i), ye[a] = i) : console.error(`Component in '${t}' does not have a name property`);
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Rs(e);
}, Qs = {
  install: ks,
  ...ye
};
export {
  zs as FileRequest,
  C as FormBuilder,
  A as Listing,
  F as LoadState,
  ge as Modal,
  Ys as Option,
  Js as ResourceList,
  H as Search,
  Hs as Steps,
  pe as Tab,
  qe as WyxosButton,
  Le as WyxosCollection,
  Ie as WyxosConfirm,
  Me as WyxosDatepicker,
  Ke as WyxosError,
  ut as WyxosForm,
  mt as WyxosImage,
  bt as WyxosInput,
  xt as WyxosListing,
  Ct as WyxosLiveInput,
  Jt as WyxosLogout,
  Zt as WyxosProgress,
  me as WyxosPrompt,
  hs as WyxosRemove,
  ys as WyxosSelect,
  he as WyxosSessionExpired,
  qs as WyxosSubmit,
  Es as WyxosTags,
  fe as WyxosTokenExpired,
  Us as auth,
  Ms as confirm,
  Ds as dateRender,
  Qs as default,
  M as errorHandler,
  Ks as success,
  P as useFormErrors
};
//# sourceMappingURL=vision.js.map
