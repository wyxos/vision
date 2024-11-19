var Oe = Object.defineProperty;
var xe = (s, e, t) => e in s ? Oe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var c = (s, e, t) => xe(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as V, onMounted as Fe, openBlock as d, createElementBlock as y, renderSlot as x, createCommentVNode as w, reactive as F, createElementVNode as h, normalizeProps as z, guardReactiveProps as Y, resolveComponent as m, createBlock as O, withCtx as g, toDisplayString as S, createVNode as v, createTextVNode as j, normalizeClass as N, mergeProps as L, defineComponent as ne, nextTick as qe, withModifiers as ae, createSlots as $e, renderList as oe, Fragment as le, Teleport as je } from "vue";
import f from "axios";
import B from "moment";
import Ce, { useOruga as Q } from "@oruga-ui/oruga-next";
const Ee = { class: "wyxos-accordion" }, Te = {
  __name: "WyxosAccordion",
  props: {
    active: {
      type: Boolean,
      required: !1
    }
  },
  setup(s) {
    const e = s, t = V(!1), r = () => {
      t.value = !t.value;
    };
    return Fe(() => {
      t.value = e.active;
    }), (i, n) => (d(), y("div", Ee, [
      x(i.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? x(i.$slots, "body", { key: 0 }) : w("", !0)
    ]));
  }
}, Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Te
}, Symbol.toStringTag, { value: "Module" })), E = F({
  default: []
});
function k() {
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
class $ {
  constructor() {
    c(this, "state", F({
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
    return new $();
  }
}
class T {
  constructor(e = {}) {
    c(this, "errors", null);
    c(this, "errorBag", "default");
    c(this, "model", F({}));
    c(this, "form", F({}));
    c(this, "original", {});
    c(this, "states", {
      load: $.create(),
      submit: $.create()
    });
    c(this, "paths", {
      load: null,
      submit: null
    });
    // Add an abort controller property
    c(this, "abortController", null);
    c(this, "timeout", null);
    return this.errors = k(), this.errors.createBag(this.errorBag), this.setAttributes(e), this.loaded(), new Proxy(this, {
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
    this.errorBag = e || "default", this.errors = k(), this.errors.createBag(this.errorBag);
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
  async submitRequest(e, t = null, { formatter: r = null, ...i } = {}) {
    if (t && typeof t != "string")
      throw new Error("Path must be a string");
    if (r !== null && typeof r != "function")
      throw new Error("Formatter must be a function");
    this.abortController && this.abortController.abort(), this.abortController = new AbortController(), i.signal = this.abortController.signal, this.clearErrors(), this.submitting(), await new Promise((o) => setTimeout(o, 1e3));
    const n = r ? r(this.form) : { ...this.form };
    let a;
    return ["get", "delete"].includes(e) ? (i.params = n, a = f[e](t, i)) : a = f[e](t, n, i), a.then((o) => (this.abortController = null, this.clearErrors(), this.submitted(), o.data)).catch((o) => (o.name === "AbortError" ? console.log("Request aborted:", o.message) : (this.submitFailed(), this.errors.set(o, this.errorBag)), Promise.reject(o)));
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag);
  }
  handleSubmissionFailure(e) {
    this.submitFailed(), this.errors.set(e, this.errorBag);
  }
  async advancedSubmit(e) {
    this.states.submit.loading();
    const { data: t } = await Promise.resolve(e(f, this.form)).catch(
      (r) => {
        throw this.states.submit.failed(), this.errors.set(r, this.errorBag), r;
      }
    );
    return this.states.submit.loaded(), t;
  }
  async load(e = "", { updateLoading: t = !0, updateOriginal: r = !0, ...i } = {}) {
    this.clearErrors(), this.states.load.loading();
    try {
      const { data: n } = await f.get(e || this.paths.load, i);
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
const b = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, Re = {
  name: "WyxosButton",
  props: {
    form: {
      type: T,
      default: null
    },
    button: {
      type: String,
      default: "submit"
    }
  }
}, Ve = ["disabled", "type"], Le = { key: 0 }, ke = { key: 1 }, Ie = /* @__PURE__ */ h("i", { class: "fas fa-spinner fa-spin ml-4" }, null, -1);
function We(s, e, t, r, i, n) {
  return d(), y("button", {
    disabled: t.form.isSubmitting,
    type: t.button
  }, [
    x(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? w("", !0) : (d(), y("span", Le, "Submit")),
      t.form.isSubmitting ? (d(), y("span", ke, "Processing")) : w("", !0)
    ]),
    t.form.isSubmitting ? x(s.$slots, "icon", { key: 0 }, () => [
      Ie
    ]) : w("", !0)
  ], 8, Ve);
}
const Ae = /* @__PURE__ */ b(Re, [["render", We]]), Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ae
}, Symbol.toStringTag, { value: "Module" })), Ne = {
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
}, Ue = /* @__PURE__ */ h("ul", null, [
  /* @__PURE__ */ h("li")
], -1);
function Me(s, e, t, r, i, n) {
  return x(s.$slots, "default", z(Y({ add: n.add, remove: n.remove, items: i.items })), () => [
    Ue
  ]);
}
const De = /* @__PURE__ */ b(Ne, [["render", Me]]), ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), Ye = {
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
      state: new $()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Je = { class: "bg-white p-6" }, He = { class: "title" }, Ke = { class: "mb-6" }, Qe = {
  class: "buttons",
  role: "group"
};
function Xe(s, e, t, r, i, n) {
  const a = m("wyxos-button"), o = m("o-modal");
  return d(), O(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      h("section", Je, [
        h("article", null, [
          h("header", null, [
            h("h3", He, S(t.title), 1)
          ]),
          h("p", Ke, S(t.message), 1),
          h("footer", Qe, [
            v(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: g(() => [
                j(S(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            v(a, {
              class: N([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => n.proceed())
            }, {
              default: g(() => [
                j(S(t.confirmText), 1)
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
const Ge = /* @__PURE__ */ b(Ye, [["render", Xe]]), Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" })), et = {
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
        this.query = s ? B(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = B(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? B(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? B(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function tt(s, e, t, r, i, n) {
  var l;
  const a = m("o-datepicker"), o = m("o-field");
  return d(), O(o, L({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      v(a, L({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (u) => i.query = u),
        "date-formatter": n.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": n.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const st = /* @__PURE__ */ b(et, [["render", tt]]), rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: st
}, Symbol.toStringTag, { value: "Module" })), it = ne({
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
      errors: k()
    };
  }
}), nt = {
  key: 0,
  class: "wyxos-error"
}, at = {
  key: 1,
  class: "wyxos-error"
};
function ot(s, e, t, r, i, n) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (d(), y("span", nt, S(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (d(), y("span", at, S(s.errors.get(s.name).message), 1)) : w("", !0);
}
const lt = /* @__PURE__ */ b(it, [["render", ot]]), ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lt
}, Symbol.toStringTag, { value: "Module" })), ue = "%[a-f0-9]{2}", ee = new RegExp("(" + ue + ")|([^%]+?)", "gi"), te = new RegExp("(" + ue + ")+", "gi");
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
function ct(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(ee) || [];
    for (let t = 1; t < e.length; t++)
      s = J(e, t).join(""), e = s.match(ee) || [];
    return s;
  }
}
function dt(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = te.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = ct(t[0]);
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
    return dt(s);
  }
}
function ce(s, e) {
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
function ht(s, e) {
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
const mt = (s) => s == null, gt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), H = Symbol("encodeFragmentIdentifier");
function pt(s) {
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
function yt(s) {
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
        const n = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !n && P(r, s).includes(s.arrayFormatSeparator);
        r = a ? P(r, s) : r;
        const o = n || a ? r.split(s.arrayFormatSeparator).map((l) => P(l, s)) : r === null ? r : P(r, s);
        i[t] = o;
      };
    case "bracket-separator":
      return (t, r, i) => {
        const n = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !n) {
          i[t] = r && P(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => P(o, s));
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
function de(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function p(s, e) {
  return e.encode ? e.strict ? gt(s) : encodeURIComponent(s) : s;
}
function P(s, e) {
  return e.decode ? ft(s) : s;
}
function fe(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? fe(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function he(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function bt(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function se(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function X(s) {
  s = he(s);
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
  }, de(e.arrayFormatSeparator);
  const t = yt(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const n = e.decode ? i.replace(/\+/g, " ") : i;
    let [a, o] = ce(n, "=");
    a === void 0 && (a = n), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : P(o, e), t(P(a, e), o, r);
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
function me(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, de(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && mt(s[a]) || e.skipEmptyString && s[a] === "", r = pt(e), i = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (i[a] = o);
  const n = Object.keys(i);
  return e.sort !== !1 && n.sort(e.sort), n.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? p(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? p(a, e) + "[]" : o.reduce(r(a), []).join("&") : p(a, e) + "=" + p(o, e);
  }).filter((a) => a.length > 0).join("&");
}
function ge(s, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = ce(s, "#");
  return t === void 0 && (t = s), {
    url: ((i = t == null ? void 0 : t.split("?")) == null ? void 0 : i[0]) ?? "",
    query: G(X(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: P(r, e) } : {}
  };
}
function pe(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [H]: !0,
    ...e
  };
  const t = he(s.url).split("?")[0] || "", r = X(s.url), i = {
    ...G(r, { sort: !1 }),
    ...s.query
  };
  let n = me(i, e);
  n && (n = `?${n}`);
  let a = bt(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[H] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${n}${a}`;
}
function ye(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [H]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: n } = ge(s, t);
  return pe({
    url: r,
    query: ht(i, e),
    fragmentIdentifier: n
  }, t);
}
function _t(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, n) => !e(i, n);
  return ye(s, r, t);
}
const re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: _t,
  extract: X,
  parse: G,
  parseUrl: ge,
  pick: ye,
  stringify: me,
  stringifyUrl: pe
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
    c(this, "attributes", F({
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
    return r.errors = k(), r.errors.createBag(r.errorBag), r.options = Object.assign(
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
    this.structure = Object.assign({}, t), this.attributes.params = F(e);
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
    const r = JSON.parse(JSON.stringify(this.attributes.params)), i = e || this.baseUrl, { data: n } = await f.get(i, {
      params: r,
      cancelToken: t
    });
    return n;
  }
  async reload(e) {
    const { data: t } = await f.get(e || this.baseUrl, {
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
        delete: new $(),
        patch: new $()
      }
    });
  }
  async load(e) {
    this.errors.clear(null, this.errorBag), this.globalCancel ? (M && M.cancel(), M = f.CancelToken.source()) : (this.cancelTokenSource && this.cancelTokenSource.cancel(), this.cancelTokenSource = f.CancelToken.source()), this.loading(), this.attributes.query.items = [], this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let t = null;
    try {
      const r = JSON.parse(JSON.stringify(this.attributes.params)), i = e || this.baseUrl;
      if (t = (await f.get(i, {
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
      if (f.isCancel(r))
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
    const { data: n } = await f.patch(e || this.baseUrl, r).catch((o) => {
      throw o;
    });
    return n.patch && Object.assign(i, n.patch), (await this.fetch()).query.items.length || (this.attributes.params.page--, await this.load()), n;
  }
  async destroy(e, { props: t, data: r, config: i, method: n = "delete" }) {
    let a;
    const { index: o, row: l } = t;
    l.isProcessing = !0, n === "delete" ? a = await f.delete(e, i) : n === "post" && (a = await f.post(e, r, i));
    const u = await this.fetch();
    if (u.query.items.find((_) => _.id === l.id))
      return l.isProcessing = !1, a.data;
    this.attributes.query.items.splice(o, 1);
    const C = this.attributes.query.items.map((_) => _.id);
    return u.query.items.filter(
      (_) => !C.includes(_.id)
    ).forEach((_) => this.attributes.query.items.push(_)), a.data;
  }
  async update(e, { props: t, data: r, config: i, method: n = "patch" }) {
    let a;
    const { index: o, row: l } = t;
    l.isProcessing = !0, n === "patch" ? a = await f.patch(e, i) : n === "post" && (a = await f.post(e, r, i));
    const u = await this.fetch(), q = u.query.items.find((_) => _.id === l.id);
    if (q)
      return l.isProcessing = !1, Object.assign(l, q), a.data;
    this.attributes.query.items.splice(o, 1);
    const C = this.attributes.query.items.map((_) => _.id);
    return u.query.items.filter(
      (_) => !C.includes(_.id)
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
    l || (l = a.states[i] = $.create()), l.loading();
    const { data: u } = await f[n](e || this.baseUrl, r).catch(
      (C) => {
        throw l.failed(), C;
      }
    );
    l.loaded(), u.row && Object.assign(a, u.row);
    const q = await this.fetch();
    if (this.attributes.query.items.splice(o, 1), !q.query.items.length)
      return this.attributes.params.page--, await this.load(), u;
    if (this.attributes.query.items.length < q.query.items.length) {
      const C = q.query.items[q.query.items.length - 1];
      this.push(C);
    }
    return u;
  }
  async applyFilter() {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.loading(), this.cancelTokenSource = f.CancelToken.source(), this.attributes.query.items = [], this.attributes.params.page = 1, this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let e = null;
    try {
      const t = JSON.parse(JSON.stringify(this.attributes.params)), r = this.baseUrl;
      e = (await f.get(r, {
        params: t,
        cancelToken: this.cancelTokenSource.token
      }).catch((n) => {
        throw this.failed(), n;
      })).data;
    } catch (t) {
      if (f.isCancel(t)) {
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
const St = {
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
function wt(s, e, t, r, i, n) {
  const a = m("o-loading"), o = m("o-button");
  return t.form.isLoaded ? (d(), y("form", {
    key: 0,
    class: N(t.formClass),
    onSubmit: e[0] || (e[0] = ae((l) => n.handle(), ["prevent"]))
  }, [
    x(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (d(), O(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (d(), O(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: g(() => [
      j(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : w("", !0);
}
const vt = /* @__PURE__ */ b(St, [["render", wt]]), Ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vt
}, Symbol.toStringTag, { value: "Module" })), xt = {
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
      class: N([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, Ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xt
}, Symbol.toStringTag, { value: "Module" })), qt = {
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
}, $t = ["width", "height"];
function jt(s, e, t, r, i, n) {
  return d(), y("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, $t);
}
const Ct = /* @__PURE__ */ b(qt, [["render", jt]]), Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ct
}, Symbol.toStringTag, { value: "Module" })), Tt = {
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
      errors: k()
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
function Pt(s, e, t, r, i, n) {
  const a = m("o-input"), o = m("o-field");
  return d(), O(o, L({
    class: t.fieldClass,
    label: t.label
  }, n.getError), {
    default: g(() => [
      v(a, {
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
const Rt = /* @__PURE__ */ b(Tt, [["render", Pt]]), Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rt
}, Symbol.toStringTag, { value: "Module" })), Lt = {
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
}, kt = { key: 0 }, It = { key: 1 }, Wt = { key: 2 };
function At(s, e, t, r, i, n) {
  const a = m("o-table");
  return d(), O(a, z(Y(n.allPropsAndEvents)), $e({
    empty: g(() => [
      t.listing.isEmpty ? (d(), y("p", kt, "No records found.")) : w("", !0),
      t.listing.isSearchEmpty ? (d(), y("p", It, " No results for your query. Please adjust your search and try again. ")) : w("", !0),
      t.listing.isFailure ? (d(), y("p", Wt, " Failure to load the list. Try again or reload the page. ")) : w("", !0)
    ]),
    _: 2
  }, [
    oe(s.$slots, (o, l) => ({
      name: l,
      fn: g((u) => [
        x(s.$slots, l, z(Y(u)))
      ])
    }))
  ]), 1040);
}
const Bt = /* @__PURE__ */ b(Lt, [["render", At]]), Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bt
}, Symbol.toStringTag, { value: "Module" })), Ut = {
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
      errors: k()
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
function Mt(s, e, t, r, i, n) {
  const a = m("o-input"), o = m("o-field");
  return d(), O(o, L({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: g(() => [
      v(a, {
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
const Dt = /* @__PURE__ */ b(Ut, [["render", Mt]]), zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dt
}, Symbol.toStringTag, { value: "Module" })), Yt = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await f.post(this.path).catch((e) => {
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function Jt(s, e, t, r, i, n) {
  return x(s.$slots, "default", { logout: n.logout }, () => [
    h("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => n.logout())
    }, "Sign out")
  ]);
}
const Ht = /* @__PURE__ */ b(Yt, [["render", Jt]]), Kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ht
}, Symbol.toStringTag, { value: "Module" })), Qt = ne({
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
}), Xt = ["max", "value"], Gt = { key: 0 };
function Zt(s, e, t, r, i, n) {
  return d(), y(le, null, [
    h("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, Xt),
    s.showValue ? (d(), y("span", Gt, S(s.modelValue) + " / " + S(s.max), 1)) : w("", !0)
  ], 64);
}
const es = /* @__PURE__ */ b(Qt, [["render", Zt]]), ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" })), ss = {
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
      state: new $()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, rs = { class: "flex gap-6" };
function is(s, e, t, r, i, n) {
  const a = m("wyxos-button"), o = m("o-modal");
  return d(), O(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      h("h2", null, S(t.title), 1),
      h("p", null, S(t.message), 1),
      h("div", rs, [
        v(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: g(() => [
            j(S(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        v(a, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => n.proceed())
        }, {
          default: g(() => [
            j(S(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const be = /* @__PURE__ */ b(ss, [["render", is]]), ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: be
}, Symbol.toStringTag, { value: "Module" })), as = {
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
}, os = /* @__PURE__ */ h("i", { class: "fas fa-trash" }, null, -1), ls = { class: "content p-6" }, us = /* @__PURE__ */ h("h3", { class: "title" }, "Delete", -1), cs = /* @__PURE__ */ h("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), ds = { class: "buttons flex gap-6 justify-end" };
function fs(s, e, t, r, i, n) {
  const a = m("o-button"), o = m("w-button"), l = m("o-modal");
  return d(), O(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (u) => n.onRemove())
  }, {
    default: g(() => [
      x(s.$slots, "button", {}, () => [
        os
      ]),
      i.isVisible ? (d(), O(je, {
        key: 0,
        to: "body"
      }, [
        v(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (u) => i.isVisible = u)
        }, {
          default: g(() => [
            h("div", ls, [
              x(s.$slots, "title", {}, () => [
                us
              ]),
              x(s.$slots, "message", {}, () => [
                cs
              ]),
              h("div", ds, [
                v(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (u) => i.isVisible = !1)
                }, {
                  default: g(() => [
                    j("Cancel ")
                  ]),
                  _: 1
                }),
                v(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (u) => n.remove())
                }, {
                  default: g(() => [
                    x(s.$slots, "confirm", {}, () => [
                      j("Confirm")
                    ])
                  ]),
                  _: 3
                }, 8, ["loading"])
              ])
            ])
          ]),
          _: 3
        }, 8, ["active"])
      ])) : w("", !0)
    ]),
    _: 3
  });
}
const hs = /* @__PURE__ */ b(as, [["render", fs]]), ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), gs = {
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
}, ps = ["value"];
function ys(s, e, t, r, i, n) {
  var l;
  const a = m("o-select"), o = m("o-field");
  return d(), O(o, L({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      v(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (u) => n.updateValue(u))
      }, {
        default: g(() => [
          x(s.$slots, "default", {}, () => [
            t.items ? (d(!0), y(le, { key: 0 }, oe(t.items, (u) => (d(), y("option", {
              key: u.value,
              value: u.value
            }, S(u.label), 9, ps))), 128)) : w("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const bs = /* @__PURE__ */ b(gs, [["render", ys]]), _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bs
}, Symbol.toStringTag, { value: "Module" })), Ss = {
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
}, ws = { class: "bg-white p-6" }, vs = /* @__PURE__ */ h("h2", { class: "title" }, "Session Expired", -1), Os = /* @__PURE__ */ h("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), xs = { class: "buttons" };
function Fs(s, e, t, r, i, n) {
  const a = m("wyxos-input"), o = m("w-button"), l = m("o-modal");
  return d(), O(l, { active: !0 }, {
    default: g(() => [
      h("div", ws, [
        vs,
        Os,
        h("form", {
          onSubmit: e[3] || (e[3] = ae((...u) => n.proceed && n.proceed(...u), ["prevent"]))
        }, [
          v(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (u) => r.login.email = u),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          v(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (u) => r.login.password = u),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          h("div", xs, [
            v(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (u) => n.onLogout())
            }, {
              default: g(() => [
                j(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            v(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: g(() => [
                j(" Login ")
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
const _e = /* @__PURE__ */ b(Ss, [["render", Fs]]), qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), $s = {
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
}, js = { key: 0 }, Cs = { key: 1 }, Es = /* @__PURE__ */ h("i", { class: "fas fa-spinner fa-spin" }, null, -1), Ts = { key: 2 }, Ps = { key: 3 };
function Rs(s, e, t, r, i, n) {
  const a = m("o-button");
  return d(), O(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: g(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (d(), y("span", js, S(i.mergedLabels.submit), 1)) : w("", !0),
      t.form.isSubmitting ? (d(), y("span", Cs, [
        j(S(i.mergedLabels.submitting) + " ", 1),
        Es
      ])) : w("", !0),
      t.form.isSubmitted ? (d(), y("span", Ts, S(i.mergedLabels.submitted), 1)) : w("", !0),
      t.form.isSubmitFailed ? (d(), y("span", Ps, S(i.mergedLabels.failed), 1)) : w("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Vs = /* @__PURE__ */ b($s, [["render", Rs]]), Ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vs
}, Symbol.toStringTag, { value: "Module" }));
class Z {
  constructor(e = {}) {
    c(this, "state", new $());
    c(this, "result", V([]));
    c(this, "value", V(null));
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
      const r = e || this.options.url, { data: i } = await f.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((n) => {
        throw this.state.failed(), n;
      });
      this.result.value = i.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: i } = await f.post(`${r}/restore`, t || this.options.payload).catch((n) => {
      throw this.state.failed(), n;
    });
    return this.state.loaded(), i;
  }
  reset() {
    this.result.value = [];
  }
}
const ks = {
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
function Is(s, e, t, r, i, n) {
  const a = m("o-taginput");
  return d(), O(a, L({
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
const Ws = /* @__PURE__ */ b(ks, [["render", Is]]), As = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ws
}, Symbol.toStringTag, { value: "Module" })), Bs = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, Ns = { class: "bg-white p-6" }, Us = /* @__PURE__ */ h("h2", { class: "title" }, "Session expired", -1), Ms = /* @__PURE__ */ h("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), Ds = { class: "buttons" };
function zs(s, e, t, r, i, n) {
  const a = m("w-button"), o = m("o-modal");
  return d(), O(o, { active: !0 }, {
    default: g(() => [
      h("div", Ns, [
        Us,
        Ms,
        h("div", Ds, [
          v(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: g(() => [
              j(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const Se = /* @__PURE__ */ b(Bs, [["render", zs]]), Ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se
}, Symbol.toStringTag, { value: "Module" }));
class ir {
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
class we {
  constructor() {
    c(this, "state", V(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new we();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class nr {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class ar {
  constructor() {
    c(this, "structure", {});
    c(this, "query", F({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    c(this, "params", F({
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
    const { data: t } = await f.get(e || this.urls.index, {
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
      const { data: l } = await f.delete(e, {
        data: o
      }).catch((u) => {
        throw t.isProcessing = !1, u;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await f.post(e, o).catch((u) => {
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
class or {
  constructor(e) {
    c(this, "current", V(null));
    c(this, "history", V([]));
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
class ve {
  constructor(e) {
    c(this, "attributes", F({
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
    return new ve(e);
  }
}
class Js {
  constructor() {
    c(this, "attributes", F({
      user: null
    }));
    c(this, "state", new $());
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
    this.loading(), await f.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await f.get("/api/user");
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
const lr = new Js();
async function ur(s = {}) {
  return (await Q().modal.open({
    component: be,
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
const Hs = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Ks {
  constructor() {
    c(this, "FORMATS", Hs);
  }
  format(e, t, r = "") {
    return e ? B(e).format(t) : r;
  }
}
const cr = new Ks();
async function Qs(s, e) {
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
      component: ((o = e.components) == null ? void 0 : o.TokenExpired) || Se,
      trapFocus: !0,
      closable: !1
    });
    const I = (await f.get("/heartbeat")).data.csrfToken;
    f.defaults.headers.common["X-CSRF-TOKEN"] = I;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && i.modal.open({
    component: ((u = e.components) == null ? void 0 : u.SessionExpired) || _e,
    trapFocus: !0,
    closable: !1
  }), ((q = s.response) == null ? void 0 : q.status) === 422) {
    const C = setInterval(() => {
      const I = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), _ = (R) => {
        const D = R.getBoundingClientRect(), A = window.getComputedStyle(R);
        return D.width > 0 && D.height > 0 && A.display !== "none" && A.visibility !== "hidden" && A.opacity !== "0";
      }, W = Array.from(I).find(_);
      if (W) {
        clearInterval(C);
        let R;
        if (W.classList.contains("o-field__message-danger") ? R = W.closest(".o-field") : W.classList.contains("wyxos-error") && (R = W.closest("label")), R) {
          console.log("Scrolling to element:", R);
          const A = R.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: A, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
function dr(s) {
  Q().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function Xs(s) {
  f.interceptors.response.use(null, (e) => Qs(e, s));
}
const ie = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": Pe, "./components/WyxosButton.vue": Be, "./components/WyxosCollection.vue": ze, "./components/WyxosConfirm.vue": Ze, "./components/WyxosDatepicker.vue": rt, "./components/WyxosError.vue": ut, "./components/WyxosForm.vue": Ot, "./components/WyxosIcon.vue": Ft, "./components/WyxosImage.vue": Et, "./components/WyxosInput.vue": Vt, "./components/WyxosListing.vue": Nt, "./components/WyxosLiveInput.vue": zt, "./components/WyxosLogout.vue": Kt, "./components/WyxosProgress.vue": ts, "./components/WyxosPrompt.vue": ns, "./components/WyxosRemove.vue": ms, "./components/WyxosSelect.vue": _s, "./components/WyxosSessionExpired.vue": qs, "./components/WyxosSubmit.vue": Ls, "./components/WyxosTags.vue": As, "./components/WyxosTokenExpired.vue": Ys }), K = {}, Gs = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(Ce, e.oruga), Object.keys(ie).forEach((t) => {
    const r = ie[t];
    if (r && r.default) {
      const i = r.default, n = i.name;
      if (n)
        s.component(n, i), s.component(n.replace("Wyxos", "W"), i), K[n] = i;
      else {
        const a = t.split("/").pop().split(".")[0];
        s.component(a, i), s.component(a.replace("Wyxos", "W"), i), K[a] = i;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Xs(e);
}, fr = {
  install: Gs,
  ...K
};
export {
  ir as FileRequest,
  T as FormBuilder,
  U as Listing,
  $ as LoadState,
  we as Modal,
  nr as Option,
  ar as ResourceList,
  Z as Search,
  or as Steps,
  ve as Tab,
  Te as WyxosAccordion,
  Ae as WyxosButton,
  De as WyxosCollection,
  Ge as WyxosConfirm,
  st as WyxosDatepicker,
  lt as WyxosError,
  vt as WyxosForm,
  xt as WyxosIcon,
  Ct as WyxosImage,
  Rt as WyxosInput,
  Bt as WyxosListing,
  Dt as WyxosLiveInput,
  Ht as WyxosLogout,
  es as WyxosProgress,
  be as WyxosPrompt,
  hs as WyxosRemove,
  bs as WyxosSelect,
  _e as WyxosSessionExpired,
  Vs as WyxosSubmit,
  Ws as WyxosTags,
  Se as WyxosTokenExpired,
  lr as auth,
  ur as confirm,
  cr as dateRender,
  fr as default,
  Qs as errorHandler,
  dr as success,
  k as useFormErrors
};
//# sourceMappingURL=vision.js.map
