var Ce = Object.defineProperty;
var Oe = (s, e, t) => e in s ? Ce(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => Oe(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as x, onMounted as ie, openBlock as c, createElementBlock as h, renderSlot as b, createCommentVNode as g, createElementVNode as f, reactive as F, normalizeProps as D, guardReactiveProps as Y, resolveComponent as m, createBlock as C, withCtx as p, toDisplayString as w, createVNode as $, createTextVNode as O, normalizeClass as I, mergeProps as W, defineComponent as ae, watch as Fe, withModifiers as oe, withDirectives as je, vModelDynamic as ke, createSlots as Ee, renderList as le, Fragment as ue, Teleport as Pe, onUnmounted as qe } from "vue";
import _ from "axios";
import R from "moment";
import Ve, { useOruga as Q } from "@oruga-ui/oruga-next";
const Te = { class: "wyxos-accordion" }, We = {
  __name: "WyxosAccordion",
  props: {
    active: {
      type: Boolean,
      required: !1
    }
  },
  setup(s) {
    const e = s, t = x(!1), r = () => {
      t.value = !t.value;
    };
    return ie(() => {
      t.value = e.active;
    }), (n, i) => (c(), h("div", Te, [
      b(n.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? b(n.$slots, "body", { key: 0 }) : g("", !0)
    ]));
  }
}, Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" })), Ae = ["disabled"], Re = {
  key: 0,
  class: "fas fa-spinner fa-spin"
}, Ie = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), Me = {
  __name: "WyxosAction",
  props: {
    loading: {
      type: Boolean,
      default: !1
    }
  },
  setup(s) {
    return (e, t) => (c(), h("button", { disabled: s.loading }, [
      s.loading ? (c(), h("i", Re)) : b(e.$slots, "icon", { key: 1 }, () => [
        Ie
      ])
    ], 8, Ae));
  }
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), j = F({
  default: []
});
function U() {
  return {
    createBag(s) {
      j[s] || (j[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      j[e] = Object.keys(s.response.data.errors).map((r) => ({
        key: r,
        message: s.response.data.errors[r][0]
      }));
    },
    has(s, e = "default") {
      return j[e].some((t) => t.key === s);
    },
    setOne(s, e, t = "default") {
      const r = j[t];
      if (!r) {
        j[t] = [
          {
            key: s,
            message: e
          }
        ];
        return;
      }
      const n = r.findIndex((i) => i.key === s);
      if (n !== -1) {
        r[n].message = e;
        return;
      }
      r.push({
        key: s,
        message: e
      });
    },
    get(s, e = "default") {
      const t = j[e];
      if (!t)
        return {
          message: "",
          variant: ""
        };
      const r = t.find(
        (n) => Array.isArray(s) ? s.includes(n.key) : n.key === s
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
        const t = j[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((n) => n.key === s);
        r !== -1 && t.splice(r, 1);
        return;
      }
      j[e] = [];
    },
    all(s = "default") {
      return j[s];
    }
  };
}
class k {
  constructor(e = {}) {
    u(this, "submitUrl", null);
    u(this, "loadUrl", null);
    u(this, "original", {});
    u(this, "form", F({}));
    u(this, "abortSubmitController", null);
    u(this, "abortLoadController", null);
    u(this, "submitState", x(""));
    u(this, "loadState", x(""));
    u(this, "errors", U());
    u(this, "resetAfterSubmitFlag", !1);
    u(this, "callbacks", {
      submit: null,
      load: null,
      success: null,
      failure: null,
      formatter: null
    });
    return this.setAttributes(e), new Proxy(this, {
      get(t, r, n) {
        if (Reflect.has(t, r))
          return Reflect.get(t, r, n);
        if (Reflect.has(t.form, r)) {
          const i = r.split(".");
          if (i.length > 1) {
            let a = t.form;
            for (let o = 0; o < i.length; o++)
              a = a[i[o]];
            return a ?? void 0;
          }
          return Reflect.get(t.form, r);
        }
      },
      set(t, r, n, i) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, n, i);
        if (Reflect.has(t.form, r)) {
          const a = r.split(".");
          if (a.length > 1) {
            let o = t.form;
            for (let l = 0; l < a.length - 1; l++)
              a[l] in o || (o[a[l]] = {}), o = o[a[l]];
            return o[a[a.length - 1]] === void 0 ? !1 : (o[a[a.length - 1]] = n, !0);
          }
          return Reflect.set(t.form, r, n);
        }
        return !1;
      }
    });
  }
  get isDirty() {
    const e = (t) => Array.isArray(t) ? t.map(e) : t && typeof t == "object" ? Object.keys(t).sort().reduce((r, n) => (r[n] = e(t[n]), r), {}) : t;
    return JSON.stringify(e(this.original)) !== JSON.stringify(e(this.form));
  }
  get isSubmitting() {
    return this.submitState.value === "loading";
  }
  get isSubmitted() {
    return this.submitState.value === "loaded";
  }
  get isSubmitFailed() {
    return this.submitState.value === "failed";
  }
  //
  static create(e) {
    return new this(e);
  }
  resetAfterSubmit(e = !0) {
    return this.resetAfterSubmitFlag = e, this;
  }
  setAttributes(e) {
    return this.original = e, Object.assign(this.form, this.original), this;
  }
  submitAt(e) {
    return this.submitUrl = e, this;
  }
  async submit() {
    this.submitting(), this.clearErrors();
    const e = {};
    this.abortSubmitController && this.abortSubmitController.abort(), this.abortSubmitController = new AbortController(), e.signal = this.abortSubmitController.signal, await new Promise((r) => setTimeout(r, 1e3));
    const t = this.callbacks.formatter ? this.callbacks.formatter(this.form) : this.form;
    return _.post(this.submitUrl, t, e).then((r) => (this.submitted(), this.resetAfterSubmitFlag && this.setAttributes(this.original), this.callbacks.success ? this.callbacks.success(r.data) : r.data)).catch((r) => (this.submitFailed(), this.errors.set(r), Promise.reject(r)));
  }
  load() {
    this.loading();
    const e = {};
    return this.abortLoadController && this.abortLoadController.abort(), this.abortLoadController = new AbortController(), e.signal = this.abortLoadController.signal, _.get(this.loadUrl, e).then((t) => (this.loaded(), t.data.form && this.setAttributes(t.data.form), t.data)).catch((t) => (this.loadFailed(), Promise.reject(t)));
  }
  submitting() {
    this.submitState.value = "loading";
  }
  submitted() {
    this.submitState.value = "loaded";
  }
  submitFailed() {
    this.submitState.value = "failed";
  }
  loading() {
    this.loadState.value = "loading";
  }
  loaded() {
    this.loadState.value = "loaded";
  }
  loadFailed() {
    this.loadState.value = "failed";
  }
  formatter(e) {
    return this.callbacks.formatter = e, this;
  }
  loadFrom(e) {
    return this.loadUrl = e, this;
  }
  getError(e) {
    return this.errors.get(e);
  }
  hasError(e) {
    return this.errors.has(e);
  }
  clearError(e) {
    this.errors.clear(e);
  }
  clearErrors() {
    this.errors.clear();
  }
  getErrors() {
    return this.errors.all();
  }
  onSuccess(e) {
    return this.callbacks.success = e, this;
  }
  onFailure(e) {
    return this.callbacks.failure = e, this;
  }
  //
  // clearErrors() {
  //   this.errors.clear(null, this.errorBag)
  // }
  //
  // reset() {
  //   Object.assign(this.form, this.original)
  // }
  //
  // resetOnly(keys) {
  //   // Ensure keys is an array
  //   if (!Array.isArray(keys)) {
  //     throw new Error('The keys should be an array.')
  //   }
  //
  //   // Loop through the keys and reset only those
  //   keys.forEach((key) => {
  //     if (Object.prototype.hasOwnProperty.call(this.original, key)) {
  //       this.form[key] = this.original[key]
  //     }
  //   })
  // }
  //
  // resetExcept(keys) {
  //   // Ensure keys is an array
  //   if (!Array.isArray(keys)) {
  //     throw new Error('The keys should be an array.')
  //   }
  //
  //   // Assign the new form object back to the reactive form
  //   Object.keys(this.form).forEach((key) => {
  //     console.log('key', key, !keys.includes(key), this.original[key])
  //     if (!keys.includes(key)) {
  //       this.form[key] = this.original[key]
  //     }
  //   })
  // }
  //
  // delay(timeout = 0, callback) {
  //   clearTimeout(this.timeout)
  //
  //   this.timeout = setTimeout(callback, timeout)
  // }
  //
  toJson() {
    return JSON.parse(JSON.stringify(this.form));
  }
}
const v = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, Ne = {
  name: "WyxosButton",
  props: {
    form: {
      type: k,
      default: null
    },
    button: {
      type: String,
      default: "submit"
    }
  }
}, Be = ["disabled", "type"], ze = { key: 0 }, De = { key: 1 }, Ye = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin ml-4" }, null, -1);
function Ke(s, e, t, r, n, i) {
  return c(), h("button", {
    disabled: t.form.isSubmitting,
    type: t.button
  }, [
    b(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? g("", !0) : (c(), h("span", ze, "Submit")),
      t.form.isSubmitting ? (c(), h("span", De, "Processing")) : g("", !0)
    ]),
    t.form.isSubmitting ? b(s.$slots, "icon", { key: 0 }, () => [
      Ye
    ]) : g("", !0)
  ], 8, Be);
}
const He = /* @__PURE__ */ v(Ne, [["render", Ke]]), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" })), Qe = {
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
}, Xe = /* @__PURE__ */ f("ul", null, [
  /* @__PURE__ */ f("li")
], -1);
function Ge(s, e, t, r, n, i) {
  return b(s.$slots, "default", D(Y({ add: i.add, remove: i.remove, items: n.items })), () => [
    Xe
  ]);
}
const Ze = /* @__PURE__ */ v(Qe, [["render", Ge]]), et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ze
}, Symbol.toStringTag, { value: "Module" }));
class L {
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
    return new L();
  }
}
const tt = {
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
      state: new L()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, st = { class: "bg-white p-6" }, rt = { class: "title" }, nt = { class: "mb-6" }, it = {
  class: "buttons",
  role: "group"
};
function at(s, e, t, r, n, i) {
  const a = m("wyxos-button"), o = m("o-modal");
  return c(), C(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("section", st, [
        f("article", null, [
          f("header", null, [
            f("h3", rt, w(t.title), 1)
          ]),
          f("p", nt, w(t.message), 1),
          f("footer", it, [
            $(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: p(() => [
                O(w(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            $(a, {
              class: I([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => i.proceed())
            }, {
              default: p(() => [
                O(w(t.confirmText), 1)
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
const ot = /* @__PURE__ */ v(tt, [["render", at]]), lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ot
}, Symbol.toStringTag, { value: "Module" })), ut = {
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
      type: k,
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
        this.query = s ? R(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
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
function ct(s, e, t, r, n, i) {
  var l;
  const a = m("o-datepicker"), o = m("o-field");
  return c(), C(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      $(a, W({
        modelValue: n.query,
        "onUpdate:modelValue": e[0] || (e[0] = (d) => n.query = d),
        "date-formatter": i.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": i.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const dt = /* @__PURE__ */ v(ut, [["render", ct]]), ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dt
}, Symbol.toStringTag, { value: "Module" })), ht = ae({
  name: "WyxosError",
  props: {
    form: {
      type: k,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: U()
    };
  }
}), mt = {
  key: 0,
  class: "wyxos-error"
}, gt = {
  key: 1,
  class: "wyxos-error"
};
function pt(s, e, t, r, n, i) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (c(), h("span", mt, w(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (c(), h("span", gt, w(s.errors.get(s.name).message), 1)) : g("", !0);
}
const yt = /* @__PURE__ */ v(ht, [["render", pt]]), bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yt
}, Symbol.toStringTag, { value: "Module" }));
class _t {
  constructor(e) {
    u(this, "visibility", x(!1));
    u(this, "applied", {});
    this.original = e, this.query = F({
      page: 1,
      perPage: 10,
      ...e
    });
  }
  get isVisible() {
    return this.visibility.value;
  }
  show() {
    this.visibility.value = !0;
  }
  hide() {
    this.visibility.value = !1;
  }
  toggle() {
    this.visibility.value = !this.visibility.value;
  }
  render() {
    return this.applied;
  }
  reset() {
    this.query = F({
      page: 1,
      perPage: 10,
      ...this.original
    });
  }
  clear(e, t) {
    e ? this.query[e] = this.original[e] : this.query = F({
      page: 1,
      perPage: 10,
      ...this.original
    }), t && t();
  }
}
const ce = "%[a-f0-9]{2}", ee = new RegExp("(" + ce + ")|([^%]+?)", "gi"), te = new RegExp("(" + ce + ")+", "gi");
function K(s, e) {
  try {
    return [decodeURIComponent(s.join(""))];
  } catch {
  }
  if (s.length === 1)
    return s;
  e = e || 1;
  const t = s.slice(0, e), r = s.slice(e);
  return Array.prototype.concat.call([], K(t), K(r));
}
function vt(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(ee) || [];
    for (let t = 1; t < e.length; t++)
      s = K(e, t).join(""), e = s.match(ee) || [];
    return s;
  }
}
function St(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = te.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const n = vt(t[0]);
      n !== t[0] && (e[t[0]] = n);
    }
    t = te.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const n of r)
    s = s.replace(new RegExp(n, "g"), e[n]);
  return s;
}
function wt(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return St(s);
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
function xt(s, e) {
  const t = {};
  if (Array.isArray(e))
    for (const r of e) {
      const n = Object.getOwnPropertyDescriptor(s, r);
      n != null && n.enumerable && Object.defineProperty(t, r, n);
    }
  else
    for (const r of Reflect.ownKeys(s)) {
      const n = Object.getOwnPropertyDescriptor(s, r);
      if (n.enumerable) {
        const i = s[r];
        e(r, i, s) && Object.defineProperty(t, r, n);
      }
    }
  return t;
}
const $t = (s) => s == null, Ct = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), H = Symbol("encodeFragmentIdentifier");
function Ot(s) {
  switch (s.arrayFormat) {
    case "index":
      return (e) => (t, r) => {
        const n = t.length;
        return r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
          ...t,
          [y(e, s), "[", n, "]"].join("")
        ] : [
          ...t,
          [y(e, s), "[", y(n, s), "]=", y(r, s)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [y(e, s), "[]"].join("")
      ] : [
        ...t,
        [y(e, s), "[]=", y(r, s)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [y(e, s), ":list="].join("")
      ] : [
        ...t,
        [y(e, s), ":list=", y(r, s)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = s.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (r, n) => n === void 0 || s.skipNull && n === null || s.skipEmptyString && n === "" ? r : (n = n === null ? "" : n, r.length === 0 ? [[y(t, s), e, y(n, s)].join("")] : [[r, y(n, s)].join(s.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        y(e, s)
      ] : [
        ...t,
        [y(e, s), "=", y(r, s)].join("")
      ];
  }
}
function Ft(s) {
  let e;
  switch (s.arrayFormat) {
    case "index":
      return (t, r, n) => {
        if (e = /\[(\d*)]$/.exec(t), t = t.replace(/\[\d*]$/, ""), !e) {
          n[t] = r;
          return;
        }
        n[t] === void 0 && (n[t] = {}), n[t][e[1]] = r;
      };
    case "bracket":
      return (t, r, n) => {
        if (e = /(\[])$/.exec(t), t = t.replace(/\[]$/, ""), !e) {
          n[t] = r;
          return;
        }
        if (n[t] === void 0) {
          n[t] = [r];
          return;
        }
        n[t] = [...n[t], r];
      };
    case "colon-list-separator":
      return (t, r, n) => {
        if (e = /(:list)$/.exec(t), t = t.replace(/:list$/, ""), !e) {
          n[t] = r;
          return;
        }
        if (n[t] === void 0) {
          n[t] = [r];
          return;
        }
        n[t] = [...n[t], r];
      };
    case "comma":
    case "separator":
      return (t, r, n) => {
        const i = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !i && P(r, s).includes(s.arrayFormatSeparator);
        r = a ? P(r, s) : r;
        const o = i || a ? r.split(s.arrayFormatSeparator).map((l) => P(l, s)) : r === null ? r : P(r, s);
        n[t] = o;
      };
    case "bracket-separator":
      return (t, r, n) => {
        const i = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !i) {
          n[t] = r && P(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => P(o, s));
        if (n[t] === void 0) {
          n[t] = a;
          return;
        }
        n[t] = [...n[t], ...a];
      };
    default:
      return (t, r, n) => {
        if (n[t] === void 0) {
          n[t] = r;
          return;
        }
        n[t] = [...[n[t]].flat(), r];
      };
  }
}
function fe(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function y(s, e) {
  return e.encode ? e.strict ? Ct(s) : encodeURIComponent(s) : s;
}
function P(s, e) {
  return e.decode ? wt(s) : s;
}
function he(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? he(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function me(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function jt(s) {
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
  }, fe(e.arrayFormatSeparator);
  const t = Ft(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const n of s.split("&")) {
    if (n === "")
      continue;
    const i = e.decode ? n.replace(/\+/g, " ") : n;
    let [a, o] = de(i, "=");
    a === void 0 && (a = i), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : P(o, e), t(P(a, e), o, r);
  }
  for (const [n, i] of Object.entries(r))
    if (typeof i == "object" && i !== null)
      for (const [a, o] of Object.entries(i))
        i[a] = se(o, e);
    else
      r[n] = se(i, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((n, i) => {
    const a = r[i];
    return n[i] = a && typeof a == "object" && !Array.isArray(a) ? he(a) : a, n;
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
  }, fe(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && $t(s[a]) || e.skipEmptyString && s[a] === "", r = Ot(e), n = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (n[a] = o);
  const i = Object.keys(n);
  return e.sort !== !1 && i.sort(e.sort), i.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? y(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? y(a, e) + "[]" : o.reduce(r(a), []).join("&") : y(a, e) + "=" + y(o, e);
  }).filter((a) => a.length > 0).join("&");
}
function pe(s, e) {
  var n;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = de(s, "#");
  return t === void 0 && (t = s), {
    url: ((n = t == null ? void 0 : t.split("?")) == null ? void 0 : n[0]) ?? "",
    query: G(X(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: P(r, e) } : {}
  };
}
function ye(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [H]: !0,
    ...e
  };
  const t = me(s.url).split("?")[0] || "", r = X(s.url), n = {
    ...G(r, { sort: !1 }),
    ...s.query
  };
  let i = ge(n, e);
  i && (i = `?${i}`);
  let a = jt(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[H] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${i}${a}`;
}
function be(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [H]: !1,
    ...t
  };
  const { url: r, query: n, fragmentIdentifier: i } = pe(s, t);
  return ye({
    url: r,
    query: xt(n, e),
    fragmentIdentifier: i
  }, t);
}
function kt(s, e, t) {
  const r = Array.isArray(e) ? (n) => !e.includes(n) : (n, i) => !e(n, i);
  return be(s, r, t);
}
const re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: kt,
  extract: X,
  parse: G,
  parseUrl: pe,
  pick: be,
  stringify: ge,
  stringifyUrl: ye
}, Symbol.toStringTag, { value: "Module" }));
class M {
  constructor(e) {
    u(this, "loadUrl", "");
    u(this, "loadingState", x(null));
    u(this, "router", null);
    u(this, "attributes", F({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    return this.filter = new _t(e), new Proxy(this, {
      get(t, r, n) {
        if (Reflect.has(t, r))
          return Reflect.get(t, r, n);
        if (Reflect.has(t.filter.query, r)) {
          const i = r.split(".");
          if (i.length > 1) {
            let a = t.filter.query;
            for (let o = 0; o < i.length; o++)
              a = a[i[o]];
            return a ?? void 0;
          }
          return Reflect.get(t.filter.query, r);
        }
      },
      set(t, r, n, i) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, n, i);
        if (Reflect.has(t.filter.query, r)) {
          const a = r.split(".");
          if (a.length > 1) {
            let o = t.form;
            for (let l = 0; l < a.length - 1; l++)
              a[l] in o || (o[a[l]] = {}), o = o[a[l]];
            return o[a[a.length - 1]] === void 0 ? !1 : (o[a[a.length - 1]] = n, !0);
          }
          return Reflect.set(t.filter.query, r, n);
        }
        return !1;
      }
    });
  }
  get config() {
    return {
      data: this.attributes.items,
      total: this.attributes.total,
      currentPage: this.filter.query.page,
      perPage: this.filter.query.perPage,
      loading: this.isLoading,
      paginated: this.attributes.total > this.attributes.perPage,
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
    return this.loadingState.value === "loading";
  }
  static create(e) {
    return new M(e);
  }
  search(e = {}) {
    return typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), _.get(this.loadUrl, {
      params: e
    }).then((t) => (t.data.listing && Object.assign(this.attributes, t.data.listing), t.data.filters && (this.filter.applied = t.data.filters), this.router && this.router.push({ query: this.filter.query }), t)).finally(() => {
      this.loaded();
    });
  }
  load(e = {}) {
    const t = re.parse(window.location.search, {
      parseNumbers: !0,
      parseBooleans: !0
    });
    return Object.assign(this.filter.query, t), this.filter.query.page = 1, typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), _.get(this.loadUrl, {
      params: e
    }).then((r) => (r.data.listing && Object.assign(this.attributes, r.data.listing), r.data.filters && (this.filter.applied = r.data.filters), r)).finally(() => {
      this.loaded();
    });
  }
  refresh(e) {
    const t = re.parse(window.location.search, {
      parseNumbers: !0,
      parseBooleans: !0
    });
    return Object.assign(this.filter.query, t), typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), _.get(this.loadUrl, {
      params: e
    }).then((r) => (r.data.listing && Object.assign(this.attributes, r.data.listing), r.data.filters && (this.filter.applied = r.data.filters), r)).finally(() => {
      this.loaded();
    });
  }
  loading() {
    this.loadingState.value = "loading";
  }
  loaded() {
    this.loadingState.value = "loaded";
  }
  onPageChange(e) {
    return this.filter.query.page = e, this.search();
  }
  loadFrom(e) {
    return this.loadUrl = e, this;
  }
  reset() {
    return this.filter.reset(), this.search();
  }
  clear(e) {
    return this.filter.clear(e), this.search();
  }
  enableRouterSync(e) {
    return this.router = e, this;
  }
  syncOnRouteChange(e) {
    return Fe(
      () => e.query,
      () => {
        this.refresh();
      }
    ), this;
  }
}
const Et = {
  name: "WyxosForm",
  props: {
    form: {
      type: k,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: M,
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
function Pt(s, e, t, r, n, i) {
  const a = m("o-loading"), o = m("o-button");
  return t.form.isLoaded ? (c(), h("form", {
    key: 0,
    class: I(t.formClass),
    onSubmit: e[0] || (e[0] = oe((l) => i.handle(), ["prevent"]))
  }, [
    b(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (c(), C(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (c(), C(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: p(() => [
      O(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : g("", !0);
}
const qt = /* @__PURE__ */ v(Et, [["render", Pt]]), Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qt
}, Symbol.toStringTag, { value: "Module" })), Tt = {
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
    return (e, t) => (c(), h("i", {
      class: I([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tt
}, Symbol.toStringTag, { value: "Module" })), Lt = {
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
}, At = ["width", "height"];
function Rt(s, e, t, r, n, i) {
  return c(), h("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, At);
}
const It = /* @__PURE__ */ v(Lt, [["render", Rt]]), Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: It
}, Symbol.toStringTag, { value: "Module" })), Ut = { class: "quick-edit" }, Nt = { class: "value" }, Bt = ["type", "readonly"], zt = /* @__PURE__ */ f("i", { class: "fas fa-pencil-alt" }, null, -1), Dt = [
  zt
], Yt = ["disabled"], Kt = /* @__PURE__ */ f("i", { class: "fas fa-times" }, null, -1), Ht = [
  Kt
], Jt = ["disabled"], Qt = {
  key: 0,
  class: "fas fa-check"
}, Xt = {
  key: 1,
  class: "fas fa-spinner fa-spin"
}, Gt = {
  __name: "WyxosInlineEdit",
  props: {
    modelValue: {
      type: [String, Number, null],
      required: !0
    },
    update: {
      type: Function,
      required: !0
    },
    processing: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(s, { emit: e }) {
    const t = s, r = e, n = x(t.modelValue), i = x(!1), a = () => {
      i.value = !1, n.value = t.modelValue;
    }, o = () => t.update(n.value).then(() => {
      r("update:modelValue", n.value), i.value = !1;
    });
    return (l, d) => (c(), h("div", Ut, [
      i.value ? g("", !0) : b(l.$slots, "value", { key: 0 }, () => [
        f("span", Nt, w(s.modelValue), 1)
      ]),
      i.value ? b(l.$slots, "field", {
        key: 1,
        query: n.value
      }, () => [
        i.value ? je((c(), h("input", {
          key: 0,
          "onUpdate:modelValue": d[0] || (d[0] = (E) => n.value = E),
          type: typeof s.modelValue == "number" ? "number" : "text",
          readonly: s.processing
        }, null, 8, Bt)), [
          [ke, n.value]
        ]) : g("", !0)
      ]) : g("", !0),
      b(l.$slots, "actions", {
        enableEdit: i.value,
        onCancel: a,
        onUpdate: o
      }, () => [
        i.value ? g("", !0) : (c(), h("button", {
          key: 0,
          class: "edit",
          onClick: d[1] || (d[1] = (E) => i.value = !0)
        }, Dt)),
        i.value ? (c(), h("button", {
          key: 1,
          class: "cancel",
          disabled: s.processing,
          onClick: d[2] || (d[2] = (E) => a())
        }, Ht, 8, Yt)) : g("", !0),
        i.value ? (c(), h("button", {
          key: 2,
          class: "save",
          disabled: s.processing,
          onClick: d[3] || (d[3] = (E) => o())
        }, [
          s.processing ? g("", !0) : (c(), h("i", Qt)),
          s.processing ? (c(), h("i", Xt)) : g("", !0)
        ], 8, Jt)) : g("", !0)
      ])
    ]));
  }
}, Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gt
}, Symbol.toStringTag, { value: "Module" })), es = {
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
      type: k,
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
      errors: U()
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
function ts(s, e, t, r, n, i) {
  const a = m("o-input"), o = m("o-field");
  return c(), C(o, W({
    class: t.fieldClass,
    label: t.label
  }, i.getError), {
    default: p(() => [
      $(a, {
        class: I(t.inputClass),
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        "password-reveal": t.passwordReveal,
        placeholder: t.placeholder,
        readonly: t.readonly,
        "root-class": t.inputRootClass,
        type: t.type,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => i.onInput(l))
      }, null, 8, ["class", "clearable", "disabled", "model-value", "name", "password-reveal", "placeholder", "readonly", "root-class", "type"])
    ]),
    _: 1
  }, 16, ["class", "label"]);
}
const ss = /* @__PURE__ */ v(es, [["render", ts]]), rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ss
}, Symbol.toStringTag, { value: "Module" })), ns = {
  name: "WyxosListing",
  props: {
    listing: {
      type: M,
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
}, is = { key: 0 }, as = { key: 1 }, os = { key: 2 };
function ls(s, e, t, r, n, i) {
  const a = m("o-table");
  return c(), C(a, D(Y(i.allPropsAndEvents)), Ee({
    empty: p(() => [
      t.listing.isEmpty ? (c(), h("p", is, "No records found.")) : g("", !0),
      t.listing.isSearchEmpty ? (c(), h("p", as, " No results for your query. Please adjust your search and try again. ")) : g("", !0),
      t.listing.isFailure ? (c(), h("p", os, " Failure to load the list. Try again or reload the page. ")) : g("", !0)
    ]),
    _: 2
  }, [
    le(s.$slots, (o, l) => ({
      name: l,
      fn: p((d) => [
        b(s.$slots, l, D(Y(d)))
      ])
    }))
  ]), 1040);
}
const us = /* @__PURE__ */ v(ns, [["render", ls]]), cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: us
}, Symbol.toStringTag, { value: "Module" })), ds = {
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
      type: k,
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
      errors: U()
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
function fs(s, e, t, r, n, i) {
  const a = m("o-input"), o = m("o-field");
  return c(), C(o, W({
    label: t.label,
    class: t.fieldClass
  }, { ...i.getError() }), {
    default: p(() => [
      $(a, {
        readonly: t.readonly,
        class: I(t.inputClass),
        "root-class": t.inputRootClass,
        name: t.name,
        type: t.type,
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (l) => i.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const hs = /* @__PURE__ */ v(ds, [["render", fs]]), ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), gs = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await _.post(this.path).catch((e) => {
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function ps(s, e, t, r, n, i) {
  return b(s.$slots, "default", { logout: i.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => i.logout())
    }, "Sign out")
  ]);
}
const ys = /* @__PURE__ */ v(gs, [["render", ps]]), bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ys
}, Symbol.toStringTag, { value: "Module" })), _s = ae({
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
}), vs = ["max", "value"], Ss = { key: 0 };
function ws(s, e, t, r, n, i) {
  return c(), h(ue, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, vs),
    s.showValue ? (c(), h("span", Ss, w(s.modelValue) + " / " + w(s.max), 1)) : g("", !0)
  ], 64);
}
const xs = /* @__PURE__ */ v(_s, [["render", ws]]), $s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xs
}, Symbol.toStringTag, { value: "Module" })), Cs = {
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
      state: new L()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, Os = { class: "flex gap-6" };
function Fs(s, e, t, r, n, i) {
  const a = m("wyxos-button"), o = m("o-modal");
  return c(), C(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("h2", null, w(t.title), 1),
      f("p", null, w(t.message), 1),
      f("div", Os, [
        $(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: p(() => [
            O(w(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        $(a, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => i.proceed())
        }, {
          default: p(() => [
            O(w(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const _e = /* @__PURE__ */ v(Cs, [["render", Fs]]), js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), ks = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: M,
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
      destroy: k.create()
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
}, Es = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), Ps = { class: "content p-6" }, qs = /* @__PURE__ */ f("h3", { class: "title" }, "Delete", -1), Vs = /* @__PURE__ */ f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), Ts = { class: "buttons flex gap-6 justify-end" };
function Ws(s, e, t, r, n, i) {
  const a = m("o-button"), o = m("w-button"), l = m("o-modal");
  return c(), C(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (d) => i.onRemove())
  }, {
    default: p(() => [
      b(s.$slots, "button", {}, () => [
        Es
      ]),
      n.isVisible ? (c(), C(Pe, {
        key: 0,
        to: "body"
      }, [
        $(l, {
          active: n.isVisible,
          "onUpdate:active": e[2] || (e[2] = (d) => n.isVisible = d)
        }, {
          default: p(() => [
            f("div", Ps, [
              b(s.$slots, "title", {}, () => [
                qs
              ]),
              b(s.$slots, "message", {}, () => [
                Vs
              ]),
              f("div", Ts, [
                $(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (d) => n.isVisible = !1)
                }, {
                  default: p(() => [
                    O("Cancel ")
                  ]),
                  _: 1
                }),
                $(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (d) => i.remove())
                }, {
                  default: p(() => [
                    b(s.$slots, "confirm", {}, () => [
                      O("Confirm")
                    ])
                  ]),
                  _: 3
                }, 8, ["loading"])
              ])
            ])
          ]),
          _: 3
        }, 8, ["active"])
      ])) : g("", !0)
    ]),
    _: 3
  });
}
const Ls = /* @__PURE__ */ v(ks, [["render", Ws]]), As = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ls
}, Symbol.toStringTag, { value: "Module" })), Rs = {
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
      type: k,
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
}, Is = ["value"];
function Ms(s, e, t, r, n, i) {
  var l;
  const a = m("o-select"), o = m("o-field");
  return c(), C(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      $(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (d) => i.updateValue(d))
      }, {
        default: p(() => [
          b(s.$slots, "default", {}, () => [
            t.items ? (c(!0), h(ue, { key: 0 }, le(t.items, (d) => (c(), h("option", {
              key: d.value,
              value: d.value
            }, w(d.label), 9, Is))), 128)) : g("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Us = /* @__PURE__ */ v(Rs, [["render", Ms]]), Ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Us
}, Symbol.toStringTag, { value: "Module" })), Bs = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: k.create({
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
}, zs = { class: "bg-white p-6" }, Ds = /* @__PURE__ */ f("h2", { class: "title" }, "Session Expired", -1), Ys = /* @__PURE__ */ f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Ks = { class: "buttons" };
function Hs(s, e, t, r, n, i) {
  const a = m("wyxos-input"), o = m("w-button"), l = m("o-modal");
  return c(), C(l, { active: !0 }, {
    default: p(() => [
      f("div", zs, [
        Ds,
        Ys,
        f("form", {
          onSubmit: e[3] || (e[3] = oe((...d) => i.proceed && i.proceed(...d), ["prevent"]))
        }, [
          $(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (d) => r.login.email = d),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          $(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (d) => r.login.password = d),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", Ks, [
            $(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (d) => i.onLogout())
            }, {
              default: p(() => [
                O(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            $(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: p(() => [
                O(" Login ")
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
const ve = /* @__PURE__ */ v(Bs, [["render", Hs]]), Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" })), Qs = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: k,
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
}, Xs = { key: 0 }, Gs = { key: 1 }, Zs = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin" }, null, -1), er = { key: 2 }, tr = { key: 3 };
function sr(s, e, t, r, n, i) {
  const a = m("o-button");
  return c(), C(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: p(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), h("span", Xs, w(n.mergedLabels.submit), 1)) : g("", !0),
      t.form.isSubmitting ? (c(), h("span", Gs, [
        O(w(n.mergedLabels.submitting) + " ", 1),
        Zs
      ])) : g("", !0),
      t.form.isSubmitted ? (c(), h("span", er, w(n.mergedLabels.submitted), 1)) : g("", !0),
      t.form.isSubmitFailed ? (c(), h("span", tr, w(n.mergedLabels.failed), 1)) : g("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const rr = /* @__PURE__ */ v(Qs, [["render", sr]]), nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rr
}, Symbol.toStringTag, { value: "Module" })), ir = {
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
    const t = s, r = e, n = () => {
      const S = window.location.hash.replace("#", ""), q = new URLSearchParams(S);
      return Object.fromEntries(q.entries());
    }, i = (S, q) => {
      const N = window.location.hash.replace("#", ""), V = new URLSearchParams(N);
      V.set(S, q), window.location.hash = V.toString();
    }, a = x(n()[t.hashKey] || t.active), o = x(!1), l = (S) => o.value ? !0 : S === a.value, d = () => {
      o.value = window.innerWidth <= t.responsiveResolution;
    }, E = (S) => {
      a.value = S, r("update:active", S), i(t.hashKey, S);
    };
    return ie(() => {
      window.addEventListener("hashchange", () => {
        const S = n();
        S[t.hashKey] && (a.value = S[t.hashKey]);
      }), d(), window.addEventListener("resize", d);
    }), qe(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", d);
    }), (S, q) => (c(), h("div", null, [
      b(S.$slots, "navigation", {
        isActive: l,
        setActive: E
      }, () => [
        O(" Fill in navigation content here ")
      ]),
      b(S.$slots, "content", { isActive: l }, () => [
        O(" Fill in content here")
      ])
    ]));
  }
}, ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ir
}, Symbol.toStringTag, { value: "Module" }));
class Z {
  constructor(e = {}) {
    u(this, "state", new L());
    u(this, "result", x([]));
    u(this, "value", x(null));
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
      const r = e || this.options.url, { data: n } = await _.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = n.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: n } = await _.post(`${r}/restore`, t || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), n;
  }
  reset() {
    this.result.value = [];
  }
}
const or = {
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
      this.openOnFocus && this.onTagSearch("");
    }
  }
};
function lr(s, e, t, r, n, i) {
  const a = m("o-taginput");
  return c(), C(a, W({
    ref: "tagInput",
    modelValue: n.query,
    "onUpdate:modelValue": e[0] || (e[0] = (o) => n.query = o),
    data: r.search.result.value,
    "open-on-focus": t.openOnFocus,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (o) => i.onTagAdded(o)),
    onFocus: e[2] || (e[2] = (o) => i.onTagSearch("")),
    onRemove: e[3] || (e[3] = (o) => i.onTagRemoved(o)),
    onTyping: e[4] || (e[4] = (o) => i.onTagSearch(o))
  }), null, 16, ["modelValue", "data", "open-on-focus"]);
}
const ur = /* @__PURE__ */ v(or, [["render", lr]]), cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ur
}, Symbol.toStringTag, { value: "Module" })), dr = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, fr = { class: "bg-white p-6" }, hr = /* @__PURE__ */ f("h2", { class: "title" }, "Session expired", -1), mr = /* @__PURE__ */ f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), gr = { class: "buttons" };
function pr(s, e, t, r, n, i) {
  const a = m("w-button"), o = m("o-modal");
  return c(), C(o, { active: !0 }, {
    default: p(() => [
      f("div", fr, [
        hr,
        mr,
        f("div", gr, [
          $(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: p(() => [
              O(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const Se = /* @__PURE__ */ v(dr, [["render", pr]]), yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se
}, Symbol.toStringTag, { value: "Module" }));
class jr {
  constructor(e) {
    u(this, "url", "");
    u(this, "processing", x(null));
    u(this, "beforeCallback", null);
    u(this, "afterCallback", null);
    u(this, "error", null);
    this.url = e;
  }
  static create(e) {
    return new this(e);
  }
  async patch(e) {
    var r, n;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.beforeCallback && this.beforeCallback(e) === !1) {
      this.processing.value = null;
      return;
    }
    try {
      const i = typeof this.url == "function" ? this.url(e) : this.url;
      return this.processing.value = !1, _.patch(i, e).then((a) => (this.processing.value = !1, this.afterCallback && this.afterCallback(a), a));
    } catch (i) {
      this.processing.value = !1, this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message;
    }
  }
  async delete(e) {
    var r, n;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.beforeCallback && this.beforeCallback(e) === !1) {
      this.processing.value = !1;
      return;
    }
    try {
      const i = typeof this.url == "function" ? this.url(e) : this.url;
      return _.delete(i).then((a) => (this.processing.value = !1, this.afterCallback && this.afterCallback(a), a));
    } catch (i) {
      return this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message, this.processing.value = !1, i;
    }
  }
  before(e) {
    return this.beforeCallback = e, this;
  }
  after(e) {
    return this.afterCallback = e, this;
  }
  isProcessing(e) {
    return this.processing.value === e;
  }
  setKeyResolver(e) {
    return this.keyResolver = e, this;
  }
}
class br {
  constructor() {
    u(this, "attributes", F({
      user: null
    }));
    u(this, "state", new L());
    return new Proxy(this, {
      get(e, t, r) {
        return Reflect.has(e, t) ? Reflect.get(e, t, r) : t in e.attributes ? e.attributes[t] : null;
      },
      set(e, t, r, n) {
        return !Reflect.has(e, t) && !(t in e.attributes) ? (Reflect.set(e, t, r, n), !0) : t in e.attributes ? (e.attributes[t] = r, !0) : Reflect.set(e, t, r, n);
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
    this.loading(), await _.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await _.get("/api/user");
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
const kr = new br();
class we {
  constructor(e) {
    u(this, "exclude", null);
    u(this, "inProgress", x(!1));
    u(this, "abortController", null);
    u(this, "onCompleteCallback", null);
    u(this, "onSelectCallback", null);
    u(this, "options", x([]));
    u(this, "minimumCharacters", 0);
    this.path = e;
  }
  static create(e) {
    return new we(e);
  }
  toExclude(e) {
    return this.exclude = e, this;
  }
  async search(e) {
    if (e && this.minimumCharacters && e.length < this.minimumCharacters) {
      this.options.value = [];
      return;
    }
    this.abortController && this.abortController.abort(), this.inProgress.value = !0, this.abortController = new AbortController();
    const t = { query: e };
    typeof this.exclude == "function" && (t.exclude = this.exclude());
    const r = {
      params: t,
      signal: this.abortController.signal
      // Attach the signal to Axios config
    };
    return await new Promise((n) => setTimeout(n, 500)), _.get(this.path, r).then((n) => (this.onCompleteCallback && (this.options.value = this.onCompleteCallback(n)), n)).finally(() => {
      this.inProgress.value = !1;
    });
  }
  onSelected(e) {
    this.onSelectCallback(e);
  }
  onSelect(e) {
    return this.onSelectCallback = e, this;
  }
  setOptions(e) {
    return this.onCompleteCallback = e, this;
  }
}
async function Er(s = {}) {
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
const z = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class _r {
  constructor(e, t) {
    u(this, "date", null);
    u(this, "empty", "");
    this.date = e, this.empty = t;
  }
  static load(e, t = "") {
    return new this(e, t);
  }
  format(e, t = z.UK, r = "") {
    return e ? R(e).format(t) : r || this.empty;
  }
  render(e = z.UK, t = "") {
    return this.format(this.date, e, t);
  }
}
u(_r, "FORMATS", z);
async function vr(s, e) {
  var i, a, o, l, d, E;
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
  const r = t[(i = s.response) == null ? void 0 : i.status] || t[500], n = Q();
  if (n.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((a = s.response) == null ? void 0 : a.status) === 419) {
    n.modal.open({
      component: ((o = e.components) == null ? void 0 : o.TokenExpired) || Se,
      trapFocus: !0,
      closable: !1
    });
    const q = (await _.get("/heartbeat")).data.csrfToken;
    _.defaults.headers.common["X-CSRF-TOKEN"] = q;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && n.modal.open({
    component: ((d = e.components) == null ? void 0 : d.SessionExpired) || ve,
    trapFocus: !0,
    closable: !1
  }), ((E = s.response) == null ? void 0 : E.status) === 422) {
    const S = setInterval(() => {
      const q = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), N = (T) => {
        const B = T.getBoundingClientRect(), A = window.getComputedStyle(T);
        return B.width > 0 && B.height > 0 && A.display !== "none" && A.visibility !== "hidden" && A.opacity !== "0";
      }, V = Array.from(q).find(N);
      if (V) {
        clearInterval(S);
        let T;
        if (V.classList.contains("o-field__message-danger") ? T = V.closest(".o-field") : V.classList.contains("wyxos-error") && (T = V.closest("label")), T) {
          const A = T.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: A, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
class Pr {
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
class xe {
  constructor() {
    u(this, "state", x(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new xe();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class qr {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class Vr {
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
  static create(e, t = {}, r = {}, n) {
    r = Object.assign(
      { base: "/api/admin", route: `${e}.index` },
      r
    );
    const i = r.base, a = {
      route: r.route,
      index: r.index || `${i}/${e}/index`,
      destroy: `${i}/${e}/destroy`
    }, o = new this();
    return o.options = r, o.structure = t, o.params = Object.assign(o.params, t), o.router = n, o.urls = a, o;
  }
  async fetch(e) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: t } = await _.get(e || this.urls.index, {
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
  async action(e, { row: t, index: r, remove: n, method: i }, a = {}) {
    t.isProcessing = !0;
    const o = {
      id: t.id,
      ...a
    };
    if (i === "delete") {
      const { data: l } = await _.delete(e, {
        data: o
      }).catch((d) => {
        throw t.isProcessing = !1, d;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await _.post(e, o).catch((d) => {
        throw t.isProcessing = !1, d;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    }
    if (n) {
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
class Tr {
  constructor(e) {
    u(this, "current", x(null));
    u(this, "history", x([]));
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
function Wr(s) {
  Q().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class $e {
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
    return new $e(e);
  }
}
function Sr(s) {
  _.interceptors.response.use(null, (e) => vr(e, s));
}
const ne = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": Le, "./components/WyxosAction.vue": Ue, "./components/WyxosButton.vue": Je, "./components/WyxosCollection.vue": et, "./components/WyxosConfirm.vue": lt, "./components/WyxosDatepicker.vue": ft, "./components/WyxosError.vue": bt, "./components/WyxosForm.vue": Vt, "./components/WyxosIcon.vue": Wt, "./components/WyxosImage.vue": Mt, "./components/WyxosInlineEdit.vue": Zt, "./components/WyxosInput.vue": rs, "./components/WyxosListing.vue": cs, "./components/WyxosLiveInput.vue": ms, "./components/WyxosLogout.vue": bs, "./components/WyxosProgress.vue": $s, "./components/WyxosPrompt.vue": js, "./components/WyxosRemove.vue": As, "./components/WyxosSelect.vue": Ns, "./components/WyxosSessionExpired.vue": Js, "./components/WyxosSubmit.vue": nr, "./components/WyxosTab.vue": ar, "./components/WyxosTags.vue": cr, "./components/WyxosTokenExpired.vue": yr }), J = {}, wr = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(Ve, e.oruga), Object.keys(ne).forEach((t) => {
    const r = ne[t];
    if (r && r.default) {
      const n = r.default, i = n.name;
      if (i)
        s.component(i, n), s.component(i.replace("Wyxos", "W"), n), J[i] = n;
      else {
        const a = t.split("/").pop().split(".")[0];
        s.component(a, n), s.component(a.replace("Wyxos", "W"), n), J[a] = n;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Sr(e);
}, Lr = {
  install: wr,
  ...J
};
export {
  jr as Action,
  we as AutoComplete,
  _r as DateRender,
  Pr as FileRequest,
  _t as Filter,
  k as FormBuilder,
  M as Listing,
  L as LoadState,
  xe as Modal,
  qr as Option,
  Vr as ResourceList,
  Z as Search,
  Tr as Steps,
  $e as Tab,
  We as WyxosAccordion,
  Me as WyxosAction,
  He as WyxosButton,
  Ze as WyxosCollection,
  ot as WyxosConfirm,
  dt as WyxosDatepicker,
  yt as WyxosError,
  qt as WyxosForm,
  Tt as WyxosIcon,
  It as WyxosImage,
  Gt as WyxosInlineEdit,
  ss as WyxosInput,
  us as WyxosListing,
  hs as WyxosLiveInput,
  ys as WyxosLogout,
  xs as WyxosProgress,
  _e as WyxosPrompt,
  Ls as WyxosRemove,
  Us as WyxosSelect,
  ve as WyxosSessionExpired,
  rr as WyxosSubmit,
  ir as WyxosTab,
  ur as WyxosTags,
  Se as WyxosTokenExpired,
  kr as auth,
  Er as confirm,
  Lr as default,
  vr as errorHandler,
  Wr as success,
  U as useFormErrors
};
//# sourceMappingURL=vision.js.map
