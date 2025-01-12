var Oe = Object.defineProperty;
var Fe = (s, e, t) => e in s ? Oe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => Fe(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as x, onMounted as oe, openBlock as c, createElementBlock as h, renderSlot as _, createCommentVNode as p, createElementVNode as f, reactive as F, normalizeProps as D, guardReactiveProps as Y, resolveComponent as m, createBlock as C, withCtx as g, toDisplayString as w, createVNode as $, createTextVNode as O, normalizeClass as I, mergeProps as W, defineComponent as ae, watch as ke, withModifiers as le, withDirectives as je, vModelDynamic as Pe, createSlots as qe, renderList as ue, Fragment as ce, Teleport as Ee, onUnmounted as Ve } from "vue";
import b from "axios";
import A from "moment";
import Te, { useOruga as Q } from "@oruga-ui/oruga-next";
const We = { class: "wyxos-accordion" }, Le = {
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
    return oe(() => {
      t.value = e.active;
    }), (n, i) => (c(), h("div", We, [
      _(n.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? _(n.$slots, "body", { key: 0 }) : p("", !0)
    ]));
  }
}, Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Le
}, Symbol.toStringTag, { value: "Module" })), Ae = ["disabled"], Ie = {
  key: 0,
  class: "fas fa-spinner fa-spin"
}, Be = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), X = {
  __name: "WyxosAction",
  props: {
    loading: {
      type: Boolean,
      default: !1
    }
  },
  setup(s) {
    return (e, t) => (c(), h("button", { disabled: s.loading }, [
      s.loading ? (c(), h("i", Ie)) : _(e.$slots, "default", { key: 1 }, () => [
        Be
      ])
    ], 8, Ae));
  }
}, Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: X
}, Symbol.toStringTag, { value: "Module" })), k = F({
  default: []
});
function M() {
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
class j {
  constructor(e = {}) {
    u(this, "method", "post");
    u(this, "submitUrl", null);
    u(this, "loadUrl", null);
    u(this, "original", {});
    u(this, "form", F({}));
    u(this, "abortSubmitController", null);
    u(this, "abortLoadController", null);
    u(this, "submitState", x(""));
    u(this, "loadState", x(""));
    u(this, "errors", M());
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
            let o = t.form;
            for (let a = 0; a < i.length; a++)
              o = o[i[a]];
            return o ?? void 0;
          }
          return Reflect.get(t.form, r);
        }
      },
      set(t, r, n, i) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, n, i);
        if (Reflect.has(t.form, r)) {
          const o = r.split(".");
          if (o.length > 1) {
            let a = t.form;
            for (let l = 0; l < o.length - 1; l++)
              o[l] in a || (a[o[l]] = {}), a = a[o[l]];
            return a[o[o.length - 1]] === void 0 ? !1 : (a[o[o.length - 1]] = n, !0);
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
  get isLoading() {
    return this.loadState.value === "loading";
  }
  get isLoaded() {
    return this.loadState.value === "loaded";
  }
  get isLoadFailed() {
    return this.loadState.value === "failed";
  }
  //
  static create(e) {
    return new this(e);
  }
  isPost() {
    return this.method = "post", this;
  }
  isPatch() {
    return this.method = "patch", this;
  }
  isPut() {
    return this.method = "put", this;
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
    this.abortSubmitController && this.abortSubmitController.abort(), this.abortSubmitController = new AbortController(), e.signal = this.abortSubmitController.signal, await new Promise((n) => setTimeout(n, 1e3));
    const t = this.callbacks.formatter ? this.callbacks.formatter(this.form) : this.form, r = this.method;
    return b[r](this.submitUrl, t, e).then((n) => (this.submitted(), this.resetAfterSubmitFlag && this.setAttributes(this.original), this.callbacks.success ? this.callbacks.success(n.data) : n.data)).catch((n) => (this.submitFailed(), this.errors.set(n), this.callbacks.failure ? this.callbacks.failure(n) : Promise.reject(n)));
  }
  load() {
    this.loading();
    const e = {};
    return this.abortLoadController && this.abortLoadController.abort(), this.abortLoadController = new AbortController(), e.signal = this.abortLoadController.signal, b.get(this.loadUrl, e).then((t) => (this.loaded(), t.data.form && this.setAttributes(t.data.form), t.data)).catch((t) => (this.loadFailed(), Promise.reject(t)));
  }
  submitting() {
    return this.submitState.value = "loading", this;
  }
  submitted() {
    return this.submitState.value = "loaded", this;
  }
  submitFailed() {
    return this.submitState.value = "failed", this;
  }
  loading() {
    return this.loadState.value = "loading", this;
  }
  loaded() {
    return this.loadState.value = "loaded", this;
  }
  loadFailed() {
    return this.loadState.value = "failed", this;
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
  onFail(e) {
    return this.callbacks.failure = e, this;
  }
  toJson() {
    return JSON.parse(JSON.stringify(this.form));
  }
}
const v = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, Ue = {
  name: "WyxosButton",
  props: {
    form: {
      type: j,
      default: null
    }
  }
}, Ne = ["disabled"], ze = { key: 0 }, De = { key: 1 }, Ye = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin ml-4" }, null, -1);
function Ke(s, e, t, r, n, i) {
  return c(), h("button", {
    disabled: t.form.isSubmitting,
    type: "submit"
  }, [
    _(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? p("", !0) : (c(), h("span", ze, "Submit")),
      t.form.isSubmitting ? (c(), h("span", De, "Processing")) : p("", !0)
    ]),
    t.form.isSubmitting ? _(s.$slots, "icon", { key: 0 }, () => [
      Ye
    ]) : p("", !0)
  ], 8, Ne);
}
const He = /* @__PURE__ */ v(Ue, [["render", Ke]]), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  return _(s.$slots, "default", D(Y({ add: i.add, remove: i.remove, items: n.items })), () => [
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
function ot(s, e, t, r, n, i) {
  const o = m("wyxos-button"), a = m("o-modal");
  return c(), C(a, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      f("section", st, [
        f("article", null, [
          f("header", null, [
            f("h3", rt, w(t.title), 1)
          ]),
          f("p", nt, w(t.message), 1),
          f("footer", it, [
            $(o, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: g(() => [
                O(w(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            $(o, {
              class: I([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => i.proceed())
            }, {
              default: g(() => [
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
const at = /* @__PURE__ */ v(tt, [["render", ot]]), lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: at
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
      type: j,
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
        this.query = s ? A(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = A(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? A(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? A(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function ct(s, e, t, r, n, i) {
  var l;
  const o = m("o-datepicker"), a = m("o-field");
  return c(), C(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      $(o, W({
        modelValue: n.query,
        "onUpdate:modelValue": e[0] || (e[0] = (d) => n.query = d),
        formatter: i.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": i.updateQuery }), null, 16, ["modelValue", "formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const dt = /* @__PURE__ */ v(ut, [["render", ct]]), ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dt
}, Symbol.toStringTag, { value: "Module" }));
class ht {
  constructor(e) {
    u(this, "url", "");
    u(this, "processing", x(null));
    u(this, "onBeforeCallback", null);
    u(this, "onSuccessCallback", null);
    u(this, "error", null);
    this.url = e;
  }
  static create(e) {
    return new this(e);
  }
  async get(e) {
    var r, n;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.onBeforeCallback && this.onBeforeCallback(e) === !1) {
      this.processing.value = null;
      return;
    }
    try {
      const i = typeof this.url == "function" ? this.url(e) : this.url;
      return b.get(i, {
        params: e
      }).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
    } catch (i) {
      return this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message, this.processing.value = !1, this.onFailCallback ? this.onFailCallback(i) : i;
    }
  }
  async patch(e) {
    var r, n;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.onBeforeCallback && this.onBeforeCallback(e) === !1) {
      this.processing.value = null;
      return;
    }
    try {
      const i = typeof this.url == "function" ? this.url(e) : this.url;
      return this.processing.value = !1, b.patch(i, e).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
    } catch (i) {
      this.processing.value = !1, this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message;
    }
  }
  async delete(e) {
    var r, n;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.onBeforeCallback && this.onBeforeCallback(e) === !1) {
      this.processing.value = !1;
      return;
    }
    try {
      const i = typeof this.url == "function" ? this.url(e) : this.url;
      return b.delete(i).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
    } catch (i) {
      return this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message, this.processing.value = !1, i;
    }
  }
  onBefore(e) {
    return this.onBeforeCallback = e, this;
  }
  onSuccess(e) {
    return this.onSuccessCallback = e, this;
  }
  onFail(e) {
    return this.onFailCallback = e, this;
  }
  isProcessing(e) {
    return this.processing.value === e;
  }
  setKeyResolver(e) {
    return this.keyResolver = e, this;
  }
}
const mt = {
  __name: "WyxosDeleteButton",
  props: {
    action: {
      type: ht,
      required: !0
    },
    id: {
      type: [String, Number],
      required: !0
    }
  },
  setup(s) {
    return (e, t) => (c(), C(X, {
      loading: s.action.isProcessing(s.id),
      onClick: t[0] || (t[0] = (r) => s.action.delete({ id: s.id }).then((n) => e.$emit("done", n)))
    }, null, 8, ["loading"]));
  }
}, gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" })), pt = ae({
  name: "WyxosError",
  props: {
    form: {
      type: j,
      default: null
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup() {
    return {
      errors: M()
    };
  }
}), yt = {
  key: 0,
  class: "wyxos-error"
}, bt = {
  key: 1,
  class: "wyxos-error"
};
function _t(s, e, t, r, n, i) {
  var o, a;
  return (o = s.form) != null && o.getError(s.name).message ? (c(), h("span", yt, w(s.form.getError(s.name).message), 1)) : (a = s.errors.get(s.name)) != null && a.message ? (c(), h("span", bt, w(s.errors.get(s.name).message), 1)) : p("", !0);
}
const vt = /* @__PURE__ */ v(pt, [["render", _t]]), St = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vt
}, Symbol.toStringTag, { value: "Module" }));
class wt {
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
const de = "%[a-f0-9]{2}", te = new RegExp("(" + de + ")|([^%]+?)", "gi"), se = new RegExp("(" + de + ")+", "gi");
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
function xt(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(te) || [];
    for (let t = 1; t < e.length; t++)
      s = K(e, t).join(""), e = s.match(te) || [];
    return s;
  }
}
function Ct(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = se.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const n = xt(t[0]);
      n !== t[0] && (e[t[0]] = n);
    }
    t = se.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const n of r)
    s = s.replace(new RegExp(n, "g"), e[n]);
  return s;
}
function $t(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return Ct(s);
  }
}
function fe(s, e) {
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
function Ot(s, e) {
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
const Ft = (s) => s == null, kt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), H = Symbol("encodeFragmentIdentifier");
function jt(s) {
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
function Pt(s) {
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
        const i = typeof r == "string" && r.includes(s.arrayFormatSeparator), o = typeof r == "string" && !i && q(r, s).includes(s.arrayFormatSeparator);
        r = o ? q(r, s) : r;
        const a = i || o ? r.split(s.arrayFormatSeparator).map((l) => q(l, s)) : r === null ? r : q(r, s);
        n[t] = a;
      };
    case "bracket-separator":
      return (t, r, n) => {
        const i = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !i) {
          n[t] = r && q(r, s);
          return;
        }
        const o = r === null ? [] : r.split(s.arrayFormatSeparator).map((a) => q(a, s));
        if (n[t] === void 0) {
          n[t] = o;
          return;
        }
        n[t] = [...n[t], ...o];
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
function he(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function y(s, e) {
  return e.encode ? e.strict ? kt(s) : encodeURIComponent(s) : s;
}
function q(s, e) {
  return e.decode ? $t(s) : s;
}
function me(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? me(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function ge(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function qt(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function re(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function G(s) {
  s = ge(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function Z(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, he(e.arrayFormatSeparator);
  const t = Pt(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const n of s.split("&")) {
    if (n === "")
      continue;
    const i = e.decode ? n.replace(/\+/g, " ") : n;
    let [o, a] = fe(i, "=");
    o === void 0 && (o = i), a = a === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? a : q(a, e), t(q(o, e), a, r);
  }
  for (const [n, i] of Object.entries(r))
    if (typeof i == "object" && i !== null)
      for (const [o, a] of Object.entries(i))
        i[o] = re(a, e);
    else
      r[n] = re(i, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((n, i) => {
    const o = r[i];
    return n[i] = o && typeof o == "object" && !Array.isArray(o) ? me(o) : o, n;
  }, /* @__PURE__ */ Object.create(null));
}
function pe(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, he(e.arrayFormatSeparator);
  const t = (o) => e.skipNull && Ft(s[o]) || e.skipEmptyString && s[o] === "", r = jt(e), n = {};
  for (const [o, a] of Object.entries(s))
    t(o) || (n[o] = a);
  const i = Object.keys(n);
  return e.sort !== !1 && i.sort(e.sort), i.map((o) => {
    const a = s[o];
    return a === void 0 ? "" : a === null ? y(o, e) : Array.isArray(a) ? a.length === 0 && e.arrayFormat === "bracket-separator" ? y(o, e) + "[]" : a.reduce(r(o), []).join("&") : y(o, e) + "=" + y(a, e);
  }).filter((o) => o.length > 0).join("&");
}
function ye(s, e) {
  var n;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = fe(s, "#");
  return t === void 0 && (t = s), {
    url: ((n = t == null ? void 0 : t.split("?")) == null ? void 0 : n[0]) ?? "",
    query: Z(G(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: q(r, e) } : {}
  };
}
function be(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [H]: !0,
    ...e
  };
  const t = ge(s.url).split("?")[0] || "", r = G(s.url), n = {
    ...Z(r, { sort: !1 }),
    ...s.query
  };
  let i = pe(n, e);
  i && (i = `?${i}`);
  let o = qt(s.url);
  if (s.fragmentIdentifier) {
    const a = new URL(t);
    a.hash = s.fragmentIdentifier, o = e[H] ? a.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${i}${o}`;
}
function _e(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [H]: !1,
    ...t
  };
  const { url: r, query: n, fragmentIdentifier: i } = ye(s, t);
  return be({
    url: r,
    query: Ot(n, e),
    fragmentIdentifier: i
  }, t);
}
function Et(s, e, t) {
  const r = Array.isArray(e) ? (n) => !e.includes(n) : (n, i) => !e(n, i);
  return _e(s, r, t);
}
const ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Et,
  extract: G,
  parse: Z,
  parseUrl: ye,
  pick: _e,
  stringify: pe,
  stringifyUrl: be
}, Symbol.toStringTag, { value: "Module" }));
class B {
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
    return this.filter = new wt(e), new Proxy(this, {
      get(t, r, n) {
        if (Reflect.has(t, r))
          return Reflect.get(t, r, n);
        if (Reflect.has(t.filter.query, r)) {
          const i = r.split(".");
          if (i.length > 1) {
            let o = t.filter.query;
            for (let a = 0; a < i.length; a++)
              o = o[i[a]];
            return o ?? void 0;
          }
          return Reflect.get(t.filter.query, r);
        }
      },
      set(t, r, n, i) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, n, i);
        if (Reflect.has(t.filter.query, r)) {
          const o = r.split(".");
          if (o.length > 1) {
            let a = t.form;
            for (let l = 0; l < o.length - 1; l++)
              o[l] in a || (a[o[l]] = {}), a = a[o[l]];
            return a[o[o.length - 1]] === void 0 ? !1 : (a[o[o.length - 1]] = n, !0);
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
    return new B(e);
  }
  search(e = {}) {
    return typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), b.get(this.loadUrl, {
      params: e
    }).then((t) => (t.data.listing && Object.assign(this.attributes, t.data.listing), t.data.filters && (this.filter.applied = t.data.filters), this.router && this.router.push({ query: this.filter.query }), t)).finally(() => {
      this.loaded();
    });
  }
  load(e = {}) {
    const t = ne.parse(window.location.search, {
      parseNumbers: !0,
      parseBooleans: !0
    });
    return Object.assign(this.filter.query, t), this.filter.query.page = 1, typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), b.get(this.loadUrl, {
      params: e
    }).then((r) => (r.data.listing && Object.assign(this.attributes, r.data.listing), r.data.filters && (this.filter.applied = r.data.filters), r)).finally(() => {
      this.loaded();
    });
  }
  refresh(e) {
    const t = ne.parse(window.location.search, {
      parseNumbers: !0,
      parseBooleans: !0
    });
    return Object.assign(this.filter.query, t), typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), b.get(this.loadUrl, {
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
    return ke(
      () => e.query,
      () => {
        this.refresh();
      }
    ), this;
  }
}
const Vt = {
  name: "WyxosForm",
  props: {
    form: {
      type: j,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: B,
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
function Tt(s, e, t, r, n, i) {
  const o = m("o-loading"), a = m("o-button");
  return t.form.isLoaded ? (c(), h("form", {
    key: 0,
    class: I(t.formClass),
    onSubmit: e[0] || (e[0] = le((l) => i.handle(), ["prevent"]))
  }, [
    _(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (c(), C(o, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (c(), C(a, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: g(() => [
      O(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : p("", !0);
}
const Wt = /* @__PURE__ */ v(Vt, [["render", Tt]]), Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wt
}, Symbol.toStringTag, { value: "Module" })), Rt = {
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
}, At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rt
}, Symbol.toStringTag, { value: "Module" })), It = {
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
}, Bt = ["width", "height"];
function Mt(s, e, t, r, n, i) {
  return c(), h("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, Bt);
}
const Ut = /* @__PURE__ */ v(It, [["render", Mt]]), Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ut
}, Symbol.toStringTag, { value: "Module" })), zt = { class: "quick-edit" }, Dt = { class: "value" }, Yt = ["readonly", "type"], Kt = /* @__PURE__ */ f("i", { class: "fas fa-pencil-alt" }, null, -1), Ht = [
  Kt
], Jt = ["disabled"], Qt = /* @__PURE__ */ f("i", { class: "fas fa-times" }, null, -1), Xt = [
  Qt
], Gt = ["disabled"], Zt = {
  key: 0,
  class: "fas fa-check"
}, es = {
  key: 1,
  class: "fas fa-spinner fa-spin"
}, ts = {
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
    },
    type: {
      type: String,
      default: "text"
    }
  },
  emits: ["update:modelValue"],
  setup(s, { emit: e }) {
    const t = s, r = e, n = x(t.modelValue), i = x(!1), o = () => {
      i.value = !1, n.value = t.modelValue;
    }, a = () => t.update(n.value).then(() => {
      r("update:modelValue", n.value), i.value = !1;
    });
    return (l, d) => (c(), h("div", zt, [
      i.value ? p("", !0) : _(l.$slots, "value", { key: 0 }, () => [
        f("span", Dt, w(s.modelValue), 1)
      ]),
      i.value ? _(l.$slots, "field", {
        key: 1,
        query: n.value
      }, () => [
        je(f("input", {
          "onUpdate:modelValue": d[0] || (d[0] = (P) => n.value = P),
          readonly: s.processing,
          type: s.type
        }, null, 8, Yt), [
          [Pe, n.value]
        ])
      ]) : p("", !0),
      _(l.$slots, "actions", {
        enableEdit: i.value,
        onCancel: o,
        onUpdate: a
      }, () => [
        i.value ? p("", !0) : (c(), h("button", {
          key: 0,
          class: "edit",
          onClick: d[1] || (d[1] = (P) => i.value = !0)
        }, Ht)),
        i.value ? (c(), h("button", {
          key: 1,
          disabled: s.processing,
          class: "cancel",
          onClick: d[2] || (d[2] = (P) => o())
        }, Xt, 8, Jt)) : p("", !0),
        i.value ? (c(), h("button", {
          key: 2,
          disabled: s.processing,
          class: "save",
          onClick: d[3] || (d[3] = (P) => a())
        }, [
          s.processing ? p("", !0) : (c(), h("i", Zt)),
          s.processing ? (c(), h("i", es)) : p("", !0)
        ], 8, Gt)) : p("", !0)
      ])
    ]));
  }
}, ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ts
}, Symbol.toStringTag, { value: "Module" })), rs = {
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
      type: j,
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
      errors: M()
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
function ns(s, e, t, r, n, i) {
  const o = m("o-input"), a = m("o-field");
  return c(), C(a, W({
    class: t.fieldClass,
    label: t.label
  }, i.getError), {
    default: g(() => [
      $(o, {
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
const is = /* @__PURE__ */ v(rs, [["render", ns]]), os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: is
}, Symbol.toStringTag, { value: "Module" })), as = {
  name: "WyxosListing",
  props: {
    listing: {
      type: B,
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
}, ls = { key: 0 }, us = { key: 1 }, cs = { key: 2 };
function ds(s, e, t, r, n, i) {
  const o = m("o-table");
  return c(), C(o, D(Y(i.allPropsAndEvents)), qe({
    empty: g(() => [
      t.listing.isEmpty ? (c(), h("p", ls, "No records found.")) : p("", !0),
      t.listing.isSearchEmpty ? (c(), h("p", us, " No results for your query. Please adjust your search and try again. ")) : p("", !0),
      t.listing.isFailure ? (c(), h("p", cs, " Failure to load the list. Try again or reload the page. ")) : p("", !0)
    ]),
    _: 2
  }, [
    ue(s.$slots, (a, l) => ({
      name: l,
      fn: g((d) => [
        _(s.$slots, l, D(Y(d)))
      ])
    }))
  ]), 1040);
}
const fs = /* @__PURE__ */ v(as, [["render", ds]]), hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fs
}, Symbol.toStringTag, { value: "Module" })), ms = {
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
      type: j,
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
      errors: M()
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
function gs(s, e, t, r, n, i) {
  const o = m("o-input"), a = m("o-field");
  return c(), C(a, W({
    label: t.label,
    class: t.fieldClass
  }, { ...i.getError() }), {
    default: g(() => [
      $(o, {
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
const ps = /* @__PURE__ */ v(ms, [["render", gs]]), ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ps
}, Symbol.toStringTag, { value: "Module" })), bs = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await b.post(this.path).catch((e) => {
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function _s(s, e, t, r, n, i) {
  return _(s.$slots, "default", { logout: i.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (o) => i.logout())
    }, "Sign out")
  ]);
}
const vs = /* @__PURE__ */ v(bs, [["render", _s]]), Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vs
}, Symbol.toStringTag, { value: "Module" })), ws = ae({
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
}), xs = ["max", "value"], Cs = { key: 0 };
function $s(s, e, t, r, n, i) {
  return c(), h(ce, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, xs),
    s.showValue ? (c(), h("span", Cs, w(s.modelValue) + " / " + w(s.max), 1)) : p("", !0)
  ], 64);
}
const Os = /* @__PURE__ */ v(ws, [["render", $s]]), Fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Os
}, Symbol.toStringTag, { value: "Module" })), ks = {
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
}, js = { class: "flex gap-6" };
function Ps(s, e, t, r, n, i) {
  const o = m("wyxos-button"), a = m("o-modal");
  return c(), C(a, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: g(() => [
      f("h2", null, w(t.title), 1),
      f("p", null, w(t.message), 1),
      f("div", js, [
        $(o, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: g(() => [
            O(w(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        $(o, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => i.proceed())
        }, {
          default: g(() => [
            O(w(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const ve = /* @__PURE__ */ v(ks, [["render", Ps]]), qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" })), Es = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: B,
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
      destroy: j.create()
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
}, Vs = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), Ts = { class: "content p-6" }, Ws = /* @__PURE__ */ f("h3", { class: "title" }, "Delete", -1), Ls = /* @__PURE__ */ f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), Rs = { class: "buttons flex gap-6 justify-end" };
function As(s, e, t, r, n, i) {
  const o = m("o-button"), a = m("w-button"), l = m("o-modal");
  return c(), C(a, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (d) => i.onRemove())
  }, {
    default: g(() => [
      _(s.$slots, "button", {}, () => [
        Vs
      ]),
      n.isVisible ? (c(), C(Ee, {
        key: 0,
        to: "body"
      }, [
        $(l, {
          active: n.isVisible,
          "onUpdate:active": e[2] || (e[2] = (d) => n.isVisible = d)
        }, {
          default: g(() => [
            f("div", Ts, [
              _(s.$slots, "title", {}, () => [
                Ws
              ]),
              _(s.$slots, "message", {}, () => [
                Ls
              ]),
              f("div", Rs, [
                $(o, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (d) => n.isVisible = !1)
                }, {
                  default: g(() => [
                    O("Cancel ")
                  ]),
                  _: 1
                }),
                $(a, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (d) => i.remove())
                }, {
                  default: g(() => [
                    _(s.$slots, "confirm", {}, () => [
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
      ])) : p("", !0)
    ]),
    _: 3
  });
}
const Is = /* @__PURE__ */ v(Es, [["render", As]]), Bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Is
}, Symbol.toStringTag, { value: "Module" })), Ms = {
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
      type: j,
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
}, Us = ["value"];
function Ns(s, e, t, r, n, i) {
  var l;
  const o = m("o-select"), a = m("o-field");
  return c(), C(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: g(() => [
      $(o, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (d) => i.updateValue(d))
      }, {
        default: g(() => [
          _(s.$slots, "default", {}, () => [
            t.items ? (c(!0), h(ce, { key: 0 }, ue(t.items, (d) => (c(), h("option", {
              key: d.value,
              value: d.value
            }, w(d.label), 9, Us))), 128)) : p("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const zs = /* @__PURE__ */ v(Ms, [["render", Ns]]), Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zs
}, Symbol.toStringTag, { value: "Module" })), Ys = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: j.create({
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
}, Ks = { class: "bg-white p-6" }, Hs = /* @__PURE__ */ f("h2", { class: "title" }, "Session Expired", -1), Js = /* @__PURE__ */ f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Qs = { class: "buttons" };
function Xs(s, e, t, r, n, i) {
  const o = m("wyxos-input"), a = m("w-button"), l = m("o-modal");
  return c(), C(l, { active: !0 }, {
    default: g(() => [
      f("div", Ks, [
        Hs,
        Js,
        f("form", {
          onSubmit: e[3] || (e[3] = le((...d) => i.proceed && i.proceed(...d), ["prevent"]))
        }, [
          $(o, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (d) => r.login.email = d),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          $(o, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (d) => r.login.password = d),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", Qs, [
            $(a, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (d) => i.onLogout())
            }, {
              default: g(() => [
                O(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            $(a, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: g(() => [
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
const Se = /* @__PURE__ */ v(Ys, [["render", Xs]]), Gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se
}, Symbol.toStringTag, { value: "Module" })), Zs = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: j,
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
}, er = { key: 0 }, tr = { key: 1 }, sr = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin" }, null, -1), rr = { key: 2 }, nr = { key: 3 };
function ir(s, e, t, r, n, i) {
  const o = m("o-button");
  return c(), C(o, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: g(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), h("span", er, w(n.mergedLabels.submit), 1)) : p("", !0),
      t.form.isSubmitting ? (c(), h("span", tr, [
        O(w(n.mergedLabels.submitting) + " ", 1),
        sr
      ])) : p("", !0),
      t.form.isSubmitted ? (c(), h("span", rr, w(n.mergedLabels.submitted), 1)) : p("", !0),
      t.form.isSubmitFailed ? (c(), h("span", nr, w(n.mergedLabels.failed), 1)) : p("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const or = /* @__PURE__ */ v(Zs, [["render", ir]]), ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: or
}, Symbol.toStringTag, { value: "Module" })), lr = {
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
      const S = window.location.hash.replace("#", ""), E = new URLSearchParams(S);
      return Object.fromEntries(E.entries());
    }, i = (S, E) => {
      const U = window.location.hash.replace("#", ""), V = new URLSearchParams(U);
      V.set(S, E), window.location.hash = V.toString();
    }, o = x(n()[t.hashKey] || t.active), a = x(!1), l = (S) => a.value ? !0 : S === o.value, d = () => {
      a.value = window.innerWidth <= t.responsiveResolution;
    }, P = (S) => {
      o.value = S, r("update:active", S), i(t.hashKey, S);
    };
    return oe(() => {
      window.addEventListener("hashchange", () => {
        const S = n();
        S[t.hashKey] && (o.value = S[t.hashKey]);
      }), d(), window.addEventListener("resize", d);
    }), Ve(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", d);
    }), (S, E) => (c(), h("div", null, [
      _(S.$slots, "navigation", {
        isActive: l,
        setActive: P
      }, () => [
        O(" Fill in navigation content here ")
      ]),
      _(S.$slots, "content", { isActive: l }, () => [
        O(" Fill in content here")
      ])
    ]));
  }
}, ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lr
}, Symbol.toStringTag, { value: "Module" }));
class ee {
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
    return new ee(e);
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
      const r = e || this.options.url, { data: n } = await b.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = n.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: n } = await b.post(`${r}/restore`, t || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), n;
  }
  reset() {
    this.result.value = [];
  }
}
const cr = {
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
      search: ee.create()
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
function dr(s, e, t, r, n, i) {
  const o = m("o-taginput");
  return c(), C(o, W({
    ref: "tagInput",
    modelValue: n.query,
    "onUpdate:modelValue": e[0] || (e[0] = (a) => n.query = a),
    data: r.search.result.value,
    "open-on-focus": t.openOnFocus,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (a) => i.onTagAdded(a)),
    onFocus: e[2] || (e[2] = (a) => i.onTagSearch("")),
    onRemove: e[3] || (e[3] = (a) => i.onTagRemoved(a)),
    onTyping: e[4] || (e[4] = (a) => i.onTagSearch(a))
  }), null, 16, ["modelValue", "data", "open-on-focus"]);
}
const fr = /* @__PURE__ */ v(cr, [["render", dr]]), hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fr
}, Symbol.toStringTag, { value: "Module" })), mr = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, gr = { class: "bg-white p-6" }, pr = /* @__PURE__ */ f("h2", { class: "title" }, "Session expired", -1), yr = /* @__PURE__ */ f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), br = { class: "buttons" };
function _r(s, e, t, r, n, i) {
  const o = m("w-button"), a = m("o-modal");
  return c(), C(a, { active: !0 }, {
    default: g(() => [
      f("div", gr, [
        pr,
        yr,
        f("div", br, [
          $(o, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: g(() => [
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
const we = /* @__PURE__ */ v(mr, [["render", _r]]), vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), Sr = {
  __name: "WyxosUpdateButton",
  props: {
    action: {
      type: Object,
      required: !0
    },
    id: {
      type: [String, Number],
      required: !0
    }
  },
  setup(s) {
    return (e, t) => (c(), C(X, {
      loading: s.action.isProcessing(s.id),
      onClick: t[0] || (t[0] = (r) => s.action.patch())
    }, null, 8, ["loading"]));
  }
}, wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sr
}, Symbol.toStringTag, { value: "Module" }));
class xr {
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
    this.loading(), await b.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await b.get("/api/user");
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
const Tr = new xr();
class xe {
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
    return new xe(e);
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
    return await new Promise((n) => setTimeout(n, 500)), b.get(this.path, r).then((n) => (this.onCompleteCallback && (this.options.value = this.onCompleteCallback(n)), n)).finally(() => {
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
async function Wr(s = {}) {
  return (await Q().modal.open({
    component: ve,
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
class Cr {
  constructor(e, t) {
    u(this, "date", null);
    u(this, "empty", "");
    this.date = e, this.empty = t;
  }
  static load(e, t = "") {
    return new this(e, t);
  }
  format(e, t = z.UK, r = "") {
    return e ? A(e).format(t) : r || this.empty;
  }
  render(e = z.UK, t = "") {
    return this.format(this.date, e, t);
  }
}
u(Cr, "FORMATS", z);
async function $r(s, e) {
  var i, o, a, l, d, P;
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
  }), ((o = s.response) == null ? void 0 : o.status) === 419) {
    n.modal.open({
      component: ((a = e.components) == null ? void 0 : a.TokenExpired) || we,
      trapFocus: !0,
      closable: !1
    });
    const E = (await b.get("/heartbeat")).data.csrfToken;
    b.defaults.headers.common["X-CSRF-TOKEN"] = E;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && n.modal.open({
    component: ((d = e.components) == null ? void 0 : d.SessionExpired) || Se,
    trapFocus: !0,
    closable: !1
  }), ((P = s.response) == null ? void 0 : P.status) === 422) {
    const S = setInterval(() => {
      const E = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), U = (T) => {
        const N = T.getBoundingClientRect(), R = window.getComputedStyle(T);
        return N.width > 0 && N.height > 0 && R.display !== "none" && R.visibility !== "hidden" && R.opacity !== "0";
      }, V = Array.from(E).find(U);
      if (V) {
        clearInterval(S);
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
class Lr {
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
class Ce {
  constructor() {
    u(this, "state", x(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new Ce();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class Rr {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class Ar {
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
    const i = r.base, o = {
      route: r.route,
      index: r.index || `${i}/${e}/index`,
      destroy: `${i}/${e}/destroy`
    }, a = new this();
    return a.options = r, a.structure = t, a.params = Object.assign(a.params, t), a.router = n, a.urls = o, a;
  }
  async fetch(e) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: t } = await b.get(e || this.urls.index, {
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
  async action(e, { row: t, index: r, remove: n, method: i }, o = {}) {
    t.isProcessing = !0;
    const a = {
      id: t.id,
      ...o
    };
    if (i === "delete") {
      const { data: l } = await b.delete(e, {
        data: a
      }).catch((d) => {
        throw t.isProcessing = !1, d;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await b.post(e, a).catch((d) => {
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
class Ir {
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
function Br(s) {
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
function Or(s) {
  b.interceptors.response.use(null, (e) => $r(e, s));
}
const ie = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": Re, "./components/WyxosAction.vue": Me, "./components/WyxosButton.vue": Je, "./components/WyxosCollection.vue": et, "./components/WyxosConfirm.vue": lt, "./components/WyxosDatepicker.vue": ft, "./components/WyxosDeleteButton.vue": gt, "./components/WyxosError.vue": St, "./components/WyxosForm.vue": Lt, "./components/WyxosIcon.vue": At, "./components/WyxosImage.vue": Nt, "./components/WyxosInlineEdit.vue": ss, "./components/WyxosInput.vue": os, "./components/WyxosListing.vue": hs, "./components/WyxosLiveInput.vue": ys, "./components/WyxosLogout.vue": Ss, "./components/WyxosProgress.vue": Fs, "./components/WyxosPrompt.vue": qs, "./components/WyxosRemove.vue": Bs, "./components/WyxosSelect.vue": Ds, "./components/WyxosSessionExpired.vue": Gs, "./components/WyxosSubmit.vue": ar, "./components/WyxosTab.vue": ur, "./components/WyxosTags.vue": hr, "./components/WyxosTokenExpired.vue": vr, "./components/WyxosUpdateButton.vue": wr }), J = {}, Fr = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(Te, e.oruga), Object.keys(ie).forEach((t) => {
    const r = ie[t];
    if (r && r.default) {
      const n = r.default, i = n.name;
      if (i)
        s.component(i, n), s.component(i.replace("Wyxos", "W"), n), J[i] = n;
      else {
        const o = t.split("/").pop().split(".")[0];
        s.component(o, n), s.component(o.replace("Wyxos", "W"), n), J[o] = n;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Or(e);
}, kr = {
  route(s, e, t) {
    return {
      name: s,
      params: e,
      query: t
    };
  }
}, Mr = {
  install: Fr,
  ...J,
  vn: kr
};
export {
  ht as Action,
  xe as AutoComplete,
  Cr as DateRender,
  Lr as FileRequest,
  wt as Filter,
  j as FormBuilder,
  B as Listing,
  L as LoadState,
  Ce as Modal,
  Rr as Option,
  Ar as ResourceList,
  ee as Search,
  Ir as Steps,
  $e as Tab,
  Le as WyxosAccordion,
  X as WyxosAction,
  He as WyxosButton,
  Ze as WyxosCollection,
  at as WyxosConfirm,
  dt as WyxosDatepicker,
  mt as WyxosDeleteButton,
  vt as WyxosError,
  Wt as WyxosForm,
  Rt as WyxosIcon,
  Ut as WyxosImage,
  ts as WyxosInlineEdit,
  is as WyxosInput,
  fs as WyxosListing,
  ps as WyxosLiveInput,
  vs as WyxosLogout,
  Os as WyxosProgress,
  ve as WyxosPrompt,
  Is as WyxosRemove,
  zs as WyxosSelect,
  Se as WyxosSessionExpired,
  or as WyxosSubmit,
  lr as WyxosTab,
  fr as WyxosTags,
  we as WyxosTokenExpired,
  Sr as WyxosUpdateButton,
  Tr as auth,
  Wr as confirm,
  Mr as default,
  $r as errorHandler,
  Br as success,
  M as useFormErrors,
  kr as vn
};
//# sourceMappingURL=vision.js.map
