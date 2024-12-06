var Oe = Object.defineProperty;
var $e = (s, e, t) => e in s ? Oe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => $e(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as O, onMounted as ie, openBlock as d, createElementBlock as m, renderSlot as v, createCommentVNode as g, normalizeClass as L, reactive as j, createElementVNode as f, normalizeProps as D, guardReactiveProps as Y, resolveComponent as h, createBlock as $, withCtx as p, toDisplayString as S, createVNode as x, createTextVNode as F, mergeProps as W, defineComponent as ae, watch as Fe, withModifiers as oe, withDirectives as Ce, vModelDynamic as je, createSlots as ke, renderList as le, Fragment as ue, Teleport as qe, onUnmounted as Pe } from "vue";
import w from "axios";
import I from "moment";
import Ee, { useOruga as Q } from "@oruga-ui/oruga-next";
const Ve = { class: "wyxos-accordion" }, Te = {
  __name: "WyxosAccordion",
  props: {
    active: {
      type: Boolean,
      required: !1
    }
  },
  setup(s) {
    const e = s, t = O(!1), r = () => {
      t.value = !t.value;
    };
    return ie(() => {
      t.value = e.active;
    }), (n, i) => (d(), m("div", Ve, [
      v(n.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? v(n.$slots, "body", { key: 0 }) : g("", !0)
    ]));
  }
}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Te
}, Symbol.toStringTag, { value: "Module" }));
class Le {
  constructor(e) {
    u(this, "type", "switch");
    u(this, "field", "");
    u(this, "url", "");
    u(this, "processing", O(null));
    u(this, "target", O(null));
    u(this, "beforeCallback", null);
    u(this, "afterCallback", null);
    u(this, "error", null);
    this.url = e;
  }
  static create(e) {
    return new this(e);
  }
  async patch(e, t) {
    var r, n;
    if (this.target.value = e, this.processing.value = e.id, this.beforeCallback && this.beforeCallback(e, t) === !1) {
      this.processing.value = null, this.target.value = null;
      return;
    }
    await new Promise((i) => setTimeout(i, 1e3));
    try {
      const i = typeof this.url == "function" ? this.url(e) : this.url;
      return this.processing.value = null, this.target.value = null, await w.patch(i, t).then((a) => (this.processing.value = null, this.target.value = null, this.afterCallback && this.afterCallback(a), a));
    } catch (i) {
      this.processing.value = null, this.target.value = null, this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message;
    }
  }
  async delete(e) {
    var t, r;
    if (this.target.value = e, this.processing.value = e.id, this.beforeCallback && this.beforeCallback(e) === !1) {
      this.processing.value = null, this.target.value = null;
      return;
    }
    await new Promise((n) => setTimeout(n, 1e3));
    try {
      const n = typeof this.url == "function" ? this.url(e) : this.url;
      return w.delete(n).then((i) => (this.processing.value = null, this.target.value = null, this.afterCallback && this.afterCallback(i), i));
    } catch (n) {
      return this.error = ((r = (t = n.response) == null ? void 0 : t.data) == null ? void 0 : r.message) || n.message, this.processing.value = null, this.target.value = null, n;
    }
  }
  before(e) {
    return this.beforeCallback = e, this;
  }
  after(e) {
    return this.afterCallback = e, this;
  }
  isProcessing(e) {
    return this.processing.value === e.id;
  }
}
const Ae = ["disabled"], Re = {
  key: 0,
  class: "fas fa-spinner fa-spin"
}, Ie = {
  key: 1,
  class: /* @__PURE__ */ L("fas fa-trash")
}, Me = {
  __name: "WyxosAction",
  props: {
    action: {
      type: Le,
      required: !0
    },
    row: {
      type: Object,
      required: !0
    }
  },
  setup(s) {
    return (e, t) => (d(), m("button", {
      disabled: s.action.isProcessing(s.row),
      class: "bg-red-500 text-white",
      onClick: t[0] || (t[0] = (r) => s.action.delete(s.row))
    }, [
      s.action.isProcessing(s.row) ? (d(), m("i", Re)) : (d(), m("i", Ie))
    ], 8, Ae));
  }
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), k = j({
  default: []
});
function U() {
  return {
    createBag(s) {
      k[s] || (k[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      k[e] = Object.keys(s.response.data.errors).map((r) => ({
        key: r,
        message: s.response.data.errors[r][0]
      }));
    },
    has(s, e = "default") {
      return k[e].some((t) => t.key === s);
    },
    setOne(s, e, t = "default") {
      const r = k[t];
      if (!r) {
        k[t] = [
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
      const t = k[e];
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
        const t = k[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((n) => n.key === s);
        r !== -1 && t.splice(r, 1);
        return;
      }
      k[e] = [];
    },
    all(s = "default") {
      return k[s];
    }
  };
}
class q {
  constructor(e = {}) {
    u(this, "submitUrl", null);
    u(this, "loadUrl", null);
    u(this, "original", {});
    u(this, "form", j({}));
    u(this, "abortSubmitController", null);
    u(this, "abortLoadController", null);
    u(this, "submitState", O(""));
    u(this, "loadState", O(""));
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
    return w.post(this.submitUrl, t, e).then((r) => (this.submitted(), this.resetAfterSubmitFlag && this.setAttributes(this.original), this.callbacks.success ? this.callbacks.success(r.data) : r.data)).catch((r) => (this.submitFailed(), this.errors.set(r), Promise.reject(r)));
  }
  load() {
    this.loading();
    const e = {};
    return this.abortLoadController && this.abortLoadController.abort(), this.abortLoadController = new AbortController(), e.signal = this.abortLoadController.signal, w.get(this.loadUrl, e).then((t) => (this.loaded(), t.data.form && this.setAttributes(t.data.form), t.data)).catch((t) => (this.loadFailed(), Promise.reject(t)));
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
const b = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, Ne = {
  name: "WyxosButton",
  props: {
    form: {
      type: q,
      default: null
    },
    button: {
      type: String,
      default: "submit"
    }
  }
}, ze = ["disabled", "type"], Be = { key: 0 }, De = { key: 1 };
function Ye(s, e, t, r, n, i) {
  return d(), m("button", {
    disabled: t.form.isSubmitting,
    type: t.button
  }, [
    v(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? g("", !0) : (d(), m("span", Be, "Submit")),
      t.form.isSubmitting ? (d(), m("span", De, "Processing")) : g("", !0)
    ]),
    t.form.isSubmitting ? v(s.$slots, "icon", { key: 0 }, () => [
      e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin ml-4" }, null, -1))
    ]) : g("", !0)
  ], 8, ze);
}
const Ke = /* @__PURE__ */ b(Ne, [["render", Ye]]), He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
}, Symbol.toStringTag, { value: "Module" })), Je = {
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
};
function Qe(s, e, t, r, n, i) {
  return v(s.$slots, "default", D(Y({ add: i.add, remove: i.remove, items: n.items })), () => [
    e[0] || (e[0] = f("ul", null, [
      f("li")
    ], -1))
  ]);
}
const Xe = /* @__PURE__ */ b(Je, [["render", Qe]]), Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xe
}, Symbol.toStringTag, { value: "Module" }));
class A {
  constructor() {
    u(this, "state", j({
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
    return new A();
  }
}
const Ze = {
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
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, et = { class: "bg-white p-6" }, tt = { class: "title" }, st = { class: "mb-6" }, rt = {
  class: "buttons",
  role: "group"
};
function nt(s, e, t, r, n, i) {
  const a = h("wyxos-button"), o = h("o-modal");
  return d(), $(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("section", et, [
        f("article", null, [
          f("header", null, [
            f("h3", tt, S(t.title), 1)
          ]),
          f("p", st, S(t.message), 1),
          f("footer", rt, [
            x(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: p(() => [
                F(S(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            x(a, {
              class: L([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => i.proceed())
            }, {
              default: p(() => [
                F(S(t.confirmText), 1)
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
const it = /* @__PURE__ */ b(Ze, [["render", nt]]), at = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: it
}, Symbol.toStringTag, { value: "Module" })), ot = {
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
      type: q,
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
        this.query = s ? I(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = I(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? I(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? I(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function lt(s, e, t, r, n, i) {
  var l;
  const a = h("o-datepicker"), o = h("o-field");
  return d(), $(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      x(a, W({
        modelValue: n.query,
        "onUpdate:modelValue": e[0] || (e[0] = (c) => n.query = c),
        "date-formatter": i.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": i.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const ut = /* @__PURE__ */ b(ot, [["render", lt]]), dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ut
}, Symbol.toStringTag, { value: "Module" })), ct = ae({
  name: "WyxosError",
  props: {
    form: {
      type: q,
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
}), ft = {
  key: 0,
  class: "wyxos-error"
}, mt = {
  key: 1,
  class: "wyxos-error"
};
function ht(s, e, t, r, n, i) {
  var a, o;
  return (a = s.form) != null && a.getError(s.name).message ? (d(), m("span", ft, S(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (d(), m("span", mt, S(s.errors.get(s.name).message), 1)) : g("", !0);
}
const gt = /* @__PURE__ */ b(ct, [["render", ht]]), pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gt
}, Symbol.toStringTag, { value: "Module" }));
class yt {
  constructor(e) {
    u(this, "visibility", O(!1));
    u(this, "applied", {});
    this.original = e, this.query = j({
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
    this.query = j({
      page: 1,
      perPage: 10,
      ...this.original
    });
  }
  clear(e, t) {
    e ? this.query[e] = this.original[e] : this.query = j({
      page: 1,
      perPage: 10,
      ...this.original
    }), t && t();
  }
}
const de = "%[a-f0-9]{2}", ee = new RegExp("(" + de + ")|([^%]+?)", "gi"), te = new RegExp("(" + de + ")+", "gi");
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
function bt(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(ee) || [];
    for (let t = 1; t < e.length; t++)
      s = K(e, t).join(""), e = s.match(ee) || [];
    return s;
  }
}
function _t(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = te.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const n = bt(t[0]);
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
function vt(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return _t(s);
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
function St(s, e) {
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
const wt = (s) => s == null, xt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), H = Symbol("encodeFragmentIdentifier");
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
function $t(s) {
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
        const i = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !i && E(r, s).includes(s.arrayFormatSeparator);
        r = a ? E(r, s) : r;
        const o = i || a ? r.split(s.arrayFormatSeparator).map((l) => E(l, s)) : r === null ? r : E(r, s);
        n[t] = o;
      };
    case "bracket-separator":
      return (t, r, n) => {
        const i = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !i) {
          n[t] = r && E(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => E(o, s));
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
  return e.encode ? e.strict ? xt(s) : encodeURIComponent(s) : s;
}
function E(s, e) {
  return e.decode ? vt(s) : s;
}
function me(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? me(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function he(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function Ft(s) {
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
  }, fe(e.arrayFormatSeparator);
  const t = $t(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const n of s.split("&")) {
    if (n === "")
      continue;
    const i = e.decode ? n.replace(/\+/g, " ") : n;
    let [a, o] = ce(i, "=");
    a === void 0 && (a = i), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : E(o, e), t(E(a, e), o, r);
  }
  for (const [n, i] of Object.entries(r))
    if (typeof i == "object" && i !== null)
      for (const [a, o] of Object.entries(i))
        i[a] = se(o, e);
    else
      r[n] = se(i, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((n, i) => {
    const a = r[i];
    return n[i] = a && typeof a == "object" && !Array.isArray(a) ? me(a) : a, n;
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
  const t = (a) => e.skipNull && wt(s[a]) || e.skipEmptyString && s[a] === "", r = Ot(e), n = {};
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
  let [t, r] = ce(s, "#");
  return t === void 0 && (t = s), {
    url: ((n = t == null ? void 0 : t.split("?")) == null ? void 0 : n[0]) ?? "",
    query: G(X(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: E(r, e) } : {}
  };
}
function ye(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [H]: !0,
    ...e
  };
  const t = he(s.url).split("?")[0] || "", r = X(s.url), n = {
    ...G(r, { sort: !1 }),
    ...s.query
  };
  let i = ge(n, e);
  i && (i = `?${i}`);
  let a = Ft(s.url);
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
    query: St(n, e),
    fragmentIdentifier: i
  }, t);
}
function Ct(s, e, t) {
  const r = Array.isArray(e) ? (n) => !e.includes(n) : (n, i) => !e(n, i);
  return be(s, r, t);
}
const re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Ct,
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
    u(this, "loadingState", O(null));
    u(this, "router", null);
    u(this, "attributes", j({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    return this.filter = new yt(e), new Proxy(this, {
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
    return typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), w.get(this.loadUrl, {
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
    return Object.assign(this.filter.query, t), this.filter.query.page = 1, typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), w.get(this.loadUrl, {
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
    return Object.assign(this.filter.query, t), typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), w.get(this.loadUrl, {
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
const jt = {
  name: "WyxosForm",
  props: {
    form: {
      type: q,
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
function kt(s, e, t, r, n, i) {
  const a = h("o-loading"), o = h("o-button");
  return t.form.isLoaded ? (d(), m("form", {
    key: 0,
    class: L(t.formClass),
    onSubmit: e[0] || (e[0] = oe((l) => i.handle(), ["prevent"]))
  }, [
    v(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (d(), $(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (d(), $(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: p(() => e[2] || (e[2] = [
      F(" Error. Retry or refresh. ")
    ])),
    _: 1
  })) : g("", !0);
}
const qt = /* @__PURE__ */ b(jt, [["render", kt]]), Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qt
}, Symbol.toStringTag, { value: "Module" })), Et = {
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
    return (e, t) => (d(), m("i", {
      class: L([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" })), Tt = {
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
}, Wt = ["width", "height"];
function Lt(s, e, t, r, n, i) {
  return d(), m("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, Wt);
}
const At = /* @__PURE__ */ b(Tt, [["render", Lt]]), Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: At
}, Symbol.toStringTag, { value: "Module" })), It = { class: "quick-edit" }, Mt = { class: "value" }, Ut = ["type", "readonly"], Nt = ["disabled"], zt = ["disabled"], Bt = {
  key: 0,
  class: "fas fa-check"
}, Dt = {
  key: 1,
  class: "fas fa-spinner fa-spin"
}, Yt = {
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
    const t = s, r = e, n = O(t.modelValue), i = O(!1), a = () => {
      i.value = !1, n.value = t.modelValue;
    }, o = () => t.update(n.value).then(() => {
      r("update:modelValue", n.value), i.value = !1;
    });
    return (l, c) => (d(), m("div", It, [
      i.value ? g("", !0) : v(l.$slots, "value", { key: 0 }, () => [
        f("span", Mt, S(s.modelValue), 1)
      ]),
      i.value ? v(l.$slots, "field", {
        key: 1,
        query: n.value
      }, () => [
        i.value ? Ce((d(), m("input", {
          key: 0,
          "onUpdate:modelValue": c[0] || (c[0] = (P) => n.value = P),
          type: typeof s.modelValue == "number" ? "number" : "text",
          readonly: s.processing
        }, null, 8, Ut)), [
          [je, n.value]
        ]) : g("", !0)
      ]) : g("", !0),
      v(l.$slots, "actions", {
        enableEdit: i.value,
        onCancel: a,
        onUpdate: o
      }, () => [
        i.value ? g("", !0) : (d(), m("button", {
          key: 0,
          class: "edit",
          onClick: c[1] || (c[1] = (P) => i.value = !0)
        }, c[4] || (c[4] = [
          f("i", { class: "fas fa-pencil-alt" }, null, -1)
        ]))),
        i.value ? (d(), m("button", {
          key: 1,
          class: "cancel",
          disabled: s.processing,
          onClick: c[2] || (c[2] = (P) => a())
        }, c[5] || (c[5] = [
          f("i", { class: "fas fa-times" }, null, -1)
        ]), 8, Nt)) : g("", !0),
        i.value ? (d(), m("button", {
          key: 2,
          class: "save",
          disabled: s.processing,
          onClick: c[3] || (c[3] = (P) => o())
        }, [
          s.processing ? g("", !0) : (d(), m("i", Bt)),
          s.processing ? (d(), m("i", Dt)) : g("", !0)
        ], 8, zt)) : g("", !0)
      ])
    ]));
  }
}, Kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" })), Ht = {
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
      type: q,
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
function Jt(s, e, t, r, n, i) {
  const a = h("o-input"), o = h("o-field");
  return d(), $(o, W({
    class: t.fieldClass,
    label: t.label
  }, i.getError), {
    default: p(() => [
      x(a, {
        class: L(t.inputClass),
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
const Qt = /* @__PURE__ */ b(Ht, [["render", Jt]]), Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qt
}, Symbol.toStringTag, { value: "Module" })), Gt = {
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
}, Zt = { key: 0 }, es = { key: 1 }, ts = { key: 2 };
function ss(s, e, t, r, n, i) {
  const a = h("o-table");
  return d(), $(a, D(Y(i.allPropsAndEvents)), ke({
    empty: p(() => [
      t.listing.isEmpty ? (d(), m("p", Zt, "No records found.")) : g("", !0),
      t.listing.isSearchEmpty ? (d(), m("p", es, " No results for your query. Please adjust your search and try again. ")) : g("", !0),
      t.listing.isFailure ? (d(), m("p", ts, " Failure to load the list. Try again or reload the page. ")) : g("", !0)
    ]),
    _: 2
  }, [
    le(s.$slots, (o, l) => ({
      name: l,
      fn: p((c) => [
        v(s.$slots, l, D(Y(c)))
      ])
    }))
  ]), 1040);
}
const rs = /* @__PURE__ */ b(Gt, [["render", ss]]), ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rs
}, Symbol.toStringTag, { value: "Module" })), is = {
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
      type: q,
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
function as(s, e, t, r, n, i) {
  const a = h("o-input"), o = h("o-field");
  return d(), $(o, W({
    label: t.label,
    class: t.fieldClass
  }, { ...i.getError() }), {
    default: p(() => [
      x(a, {
        readonly: t.readonly,
        class: L(t.inputClass),
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
const os = /* @__PURE__ */ b(is, [["render", as]]), ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: os
}, Symbol.toStringTag, { value: "Module" })), us = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await w.post(this.path).catch((e) => {
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function ds(s, e, t, r, n, i) {
  return v(s.$slots, "default", { logout: i.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => i.logout())
    }, "Sign out")
  ]);
}
const cs = /* @__PURE__ */ b(us, [["render", ds]]), fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cs
}, Symbol.toStringTag, { value: "Module" })), ms = ae({
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
}), hs = ["max", "value"], gs = { key: 0 };
function ps(s, e, t, r, n, i) {
  return d(), m(ue, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, hs),
    s.showValue ? (d(), m("span", gs, S(s.modelValue) + " / " + S(s.max), 1)) : g("", !0)
  ], 64);
}
const ys = /* @__PURE__ */ b(ms, [["render", ps]]), bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ys
}, Symbol.toStringTag, { value: "Module" })), _s = {
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
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, vs = { class: "flex gap-6" };
function Ss(s, e, t, r, n, i) {
  const a = h("wyxos-button"), o = h("o-modal");
  return d(), $(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("h2", null, S(t.title), 1),
      f("p", null, S(t.message), 1),
      f("div", vs, [
        x(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: p(() => [
            F(S(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        x(a, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => i.proceed())
        }, {
          default: p(() => [
            F(S(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const _e = /* @__PURE__ */ b(_s, [["render", Ss]]), ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), xs = {
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
      destroy: q.create()
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
}, Os = { class: "content p-6" }, $s = { class: "buttons flex gap-6 justify-end" };
function Fs(s, e, t, r, n, i) {
  const a = h("o-button"), o = h("w-button"), l = h("o-modal");
  return d(), $(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (c) => i.onRemove())
  }, {
    default: p(() => [
      v(s.$slots, "button", {}, () => [
        e[4] || (e[4] = f("i", { class: "fas fa-trash" }, null, -1))
      ]),
      n.isVisible ? (d(), $(qe, {
        key: 0,
        to: "body"
      }, [
        x(l, {
          active: n.isVisible,
          "onUpdate:active": e[2] || (e[2] = (c) => n.isVisible = c)
        }, {
          default: p(() => [
            f("div", Os, [
              v(s.$slots, "title", {}, () => [
                e[5] || (e[5] = f("h3", { class: "title" }, "Delete", -1))
              ]),
              v(s.$slots, "message", {}, () => [
                e[6] || (e[6] = f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1))
              ]),
              f("div", $s, [
                x(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (c) => n.isVisible = !1)
                }, {
                  default: p(() => e[7] || (e[7] = [
                    F("Cancel ")
                  ])),
                  _: 1
                }),
                x(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (c) => i.remove())
                }, {
                  default: p(() => [
                    v(s.$slots, "confirm", {}, () => [
                      e[8] || (e[8] = F("Confirm"))
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
const Cs = /* @__PURE__ */ b(xs, [["render", Fs]]), js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cs
}, Symbol.toStringTag, { value: "Module" })), ks = {
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
      type: q,
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
}, qs = ["value"];
function Ps(s, e, t, r, n, i) {
  var l;
  const a = h("o-select"), o = h("o-field");
  return d(), $(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      x(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (c) => i.updateValue(c))
      }, {
        default: p(() => [
          v(s.$slots, "default", {}, () => [
            t.items ? (d(!0), m(ue, { key: 0 }, le(t.items, (c) => (d(), m("option", {
              key: c.value,
              value: c.value
            }, S(c.label), 9, qs))), 128)) : g("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Es = /* @__PURE__ */ b(ks, [["render", Ps]]), Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Es
}, Symbol.toStringTag, { value: "Module" })), Ts = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: q.create({
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
}, Ws = { class: "bg-white p-6" }, Ls = { class: "buttons" };
function As(s, e, t, r, n, i) {
  const a = h("wyxos-input"), o = h("w-button"), l = h("o-modal");
  return d(), $(l, { active: !0 }, {
    default: p(() => [
      f("div", Ws, [
        e[6] || (e[6] = f("h2", { class: "title" }, "Session Expired", -1)),
        e[7] || (e[7] = f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1)),
        f("form", {
          onSubmit: e[3] || (e[3] = oe((...c) => i.proceed && i.proceed(...c), ["prevent"]))
        }, [
          x(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (c) => r.login.email = c),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          x(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (c) => r.login.password = c),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", Ls, [
            x(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (c) => i.onLogout())
            }, {
              default: p(() => e[4] || (e[4] = [
                F(" Logout ")
              ])),
              _: 1
            }, 8, ["disabled"]),
            x(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: p(() => e[5] || (e[5] = [
                F(" Login ")
              ])),
              _: 1
            }, 8, ["loading"])
          ])
        ], 32)
      ])
    ]),
    _: 1
  });
}
const ve = /* @__PURE__ */ b(Ts, [["render", As]]), Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" })), Is = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: q,
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
}, Ms = { key: 0 }, Us = { key: 1 }, Ns = { key: 2 }, zs = { key: 3 };
function Bs(s, e, t, r, n, i) {
  const a = h("o-button");
  return d(), $(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: p(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (d(), m("span", Ms, S(n.mergedLabels.submit), 1)) : g("", !0),
      t.form.isSubmitting ? (d(), m("span", Us, [
        F(S(n.mergedLabels.submitting) + " ", 1),
        e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin" }, null, -1))
      ])) : g("", !0),
      t.form.isSubmitted ? (d(), m("span", Ns, S(n.mergedLabels.submitted), 1)) : g("", !0),
      t.form.isSubmitFailed ? (d(), m("span", zs, S(n.mergedLabels.failed), 1)) : g("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Ds = /* @__PURE__ */ b(Is, [["render", Bs]]), Ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ds
}, Symbol.toStringTag, { value: "Module" })), Ks = {
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
      const _ = window.location.hash.replace("#", ""), C = new URLSearchParams(_);
      return Object.fromEntries(C.entries());
    }, i = (_, C) => {
      const N = window.location.hash.replace("#", ""), V = new URLSearchParams(N);
      V.set(_, C), window.location.hash = V.toString();
    }, a = O(n()[t.hashKey] || t.active), o = O(!1), l = (_) => o.value ? !0 : _ === a.value, c = () => {
      o.value = window.innerWidth <= t.responsiveResolution;
    }, P = (_) => {
      a.value = _, r("update:active", _), i(t.hashKey, _);
    };
    return ie(() => {
      window.addEventListener("hashchange", () => {
        const _ = n();
        _[t.hashKey] && (a.value = _[t.hashKey]);
      }), c(), window.addEventListener("resize", c);
    }), Pe(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", c);
    }), (_, C) => (d(), m("div", null, [
      v(_.$slots, "navigation", {
        isActive: l,
        setActive: P
      }, () => [
        C[0] || (C[0] = F(" Fill in navigation content here "))
      ]),
      v(_.$slots, "content", { isActive: l }, () => [
        C[1] || (C[1] = F(" Fill in content here"))
      ])
    ]));
  }
}, Hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ks
}, Symbol.toStringTag, { value: "Module" }));
class Z {
  constructor(e = {}) {
    u(this, "state", new A());
    u(this, "result", O([]));
    u(this, "value", O(null));
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
      const r = e || this.options.url, { data: n } = await w.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = n.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: n } = await w.post(`${r}/restore`, t || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), n;
  }
  reset() {
    this.result.value = [];
  }
}
const Js = {
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
function Qs(s, e, t, r, n, i) {
  const a = h("o-taginput");
  return d(), $(a, W({
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
const Xs = /* @__PURE__ */ b(Js, [["render", Qs]]), Gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xs
}, Symbol.toStringTag, { value: "Module" })), Zs = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, er = { class: "bg-white p-6" }, tr = { class: "buttons" };
function sr(s, e, t, r, n, i) {
  const a = h("w-button"), o = h("o-modal");
  return d(), $(o, { active: !0 }, {
    default: p(() => [
      f("div", er, [
        e[2] || (e[2] = f("h2", { class: "title" }, "Session expired", -1)),
        e[3] || (e[3] = f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1)),
        f("div", tr, [
          x(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: p(() => e[1] || (e[1] = [
              F(" Confirm ")
            ])),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const Se = /* @__PURE__ */ b(Zs, [["render", sr]]), rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se
}, Symbol.toStringTag, { value: "Module" })), B = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class nr {
  constructor(e, t) {
    u(this, "date", null);
    u(this, "empty", "");
    this.date = e, this.empty = t;
  }
  static load(e, t = "") {
    return new this(e, t);
  }
  format(e, t = B.UK, r = "") {
    return e ? I(e).format(t) : r || this.empty;
  }
  render(e = B.UK, t = "") {
    return this.format(this.date, e, t);
  }
}
u(nr, "FORMATS", B);
class hr {
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
    u(this, "state", O(!1));
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
class gr {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class pr {
  constructor() {
    u(this, "structure", {});
    u(this, "query", j({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    u(this, "params", j({
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
    const { data: t } = await w.get(e || this.urls.index, {
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
      const { data: l } = await w.delete(e, {
        data: o
      }).catch((c) => {
        throw t.isProcessing = !1, c;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await w.post(e, o).catch((c) => {
        throw t.isProcessing = !1, c;
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
class yr {
  constructor(e) {
    u(this, "current", O(null));
    u(this, "history", O([]));
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
class xe {
  constructor(e) {
    u(this, "attributes", j({
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
    return new xe(e);
  }
}
class ir {
  constructor() {
    u(this, "attributes", j({
      user: null
    }));
    u(this, "state", new A());
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
    this.loading(), await w.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await w.get("/api/user");
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
const br = new ir();
async function _r(s = {}) {
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
async function ar(s, e) {
  var i, a, o, l, c, P;
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
    const C = (await w.get("/heartbeat")).data.csrfToken;
    w.defaults.headers.common["X-CSRF-TOKEN"] = C;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && n.modal.open({
    component: ((c = e.components) == null ? void 0 : c.SessionExpired) || ve,
    trapFocus: !0,
    closable: !1
  }), ((P = s.response) == null ? void 0 : P.status) === 422) {
    const _ = setInterval(() => {
      const C = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), N = (T) => {
        const z = T.getBoundingClientRect(), R = window.getComputedStyle(T);
        return z.width > 0 && z.height > 0 && R.display !== "none" && R.visibility !== "hidden" && R.opacity !== "0";
      }, V = Array.from(C).find(N);
      if (V) {
        clearInterval(_);
        let T;
        if (V.classList.contains("o-field__message-danger") ? T = V.closest(".o-field") : V.classList.contains("wyxos-error") && (T = V.closest("label")), T) {
          const R = T.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: R, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
function vr(s) {
  Q().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function or(s) {
  w.interceptors.response.use(null, (e) => ar(e, s));
}
const ne = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": We, "./components/WyxosAction.vue": Ue, "./components/WyxosButton.vue": He, "./components/WyxosCollection.vue": Ge, "./components/WyxosConfirm.vue": at, "./components/WyxosDatepicker.vue": dt, "./components/WyxosError.vue": pt, "./components/WyxosForm.vue": Pt, "./components/WyxosIcon.vue": Vt, "./components/WyxosImage.vue": Rt, "./components/WyxosInlineEdit.vue": Kt, "./components/WyxosInput.vue": Xt, "./components/WyxosListing.vue": ns, "./components/WyxosLiveInput.vue": ls, "./components/WyxosLogout.vue": fs, "./components/WyxosProgress.vue": bs, "./components/WyxosPrompt.vue": ws, "./components/WyxosRemove.vue": js, "./components/WyxosSelect.vue": Vs, "./components/WyxosSessionExpired.vue": Rs, "./components/WyxosSubmit.vue": Ys, "./components/WyxosTab.vue": Hs, "./components/WyxosTags.vue": Gs, "./components/WyxosTokenExpired.vue": rr }), J = {}, lr = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(Ee, e.oruga), Object.keys(ne).forEach((t) => {
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
  }, or(e);
}, Sr = {
  install: lr,
  ...J
};
export {
  Le as Action,
  nr as DateRender,
  hr as FileRequest,
  q as FormBuilder,
  M as Listing,
  A as LoadState,
  we as Modal,
  gr as Option,
  pr as ResourceList,
  Z as Search,
  yr as Steps,
  xe as Tab,
  Te as WyxosAccordion,
  Me as WyxosAction,
  Ke as WyxosButton,
  Xe as WyxosCollection,
  it as WyxosConfirm,
  ut as WyxosDatepicker,
  gt as WyxosError,
  qt as WyxosForm,
  Et as WyxosIcon,
  At as WyxosImage,
  Yt as WyxosInlineEdit,
  Qt as WyxosInput,
  rs as WyxosListing,
  os as WyxosLiveInput,
  cs as WyxosLogout,
  ys as WyxosProgress,
  _e as WyxosPrompt,
  Cs as WyxosRemove,
  Es as WyxosSelect,
  ve as WyxosSessionExpired,
  Ds as WyxosSubmit,
  Ks as WyxosTab,
  Xs as WyxosTags,
  Se as WyxosTokenExpired,
  br as auth,
  _r as confirm,
  Sr as default,
  ar as errorHandler,
  vr as success,
  U as useFormErrors
};
//# sourceMappingURL=vision.js.map
