var Pe = Object.defineProperty;
var qe = (s, e, t) => e in s ? Pe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => qe(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as b, onMounted as ae, openBlock as c, createElementBlock as h, renderSlot as p, createCommentVNode as y, createElementVNode as f, unref as I, createTextVNode as $, toDisplayString as w, reactive as F, normalizeProps as D, guardReactiveProps as Y, resolveComponent as g, createBlock as x, withCtx as m, createVNode as C, normalizeClass as B, mergeProps as W, defineComponent as le, watch as Le, withModifiers as ue, withDirectives as Ve, vModelDynamic as We, createSlots as Ae, renderList as de, Fragment as ce, Teleport as Re, onUnmounted as Ie } from "vue";
import _ from "axios";
import V from "moment";
import { OField as fe, OInput as he, useOruga as me, NotificationProgrammatic as Me, ModalProgrammatic as ee, OButton as Be, ORadio as Ue, OModal as Ne, OTooltip as ze, OTable as De, OTableColumn as Ye, OTabs as Ke, OTabItem as Je, OTaginput as He, ODatepicker as Qe, OSelect as Xe, OIcon as Ge, OUpload as Ze, OCheckbox as et, ONotification as tt, OAutocomplete as st } from "@oruga-ui/oruga-next";
const rt = { class: "wyxos-accordion" }, nt = {
  __name: "WyxosAccordion",
  props: {
    active: {
      type: Boolean,
      required: !1
    }
  },
  setup(s) {
    const e = s, t = b(!1), r = () => {
      t.value = !t.value;
    };
    return ae(() => {
      t.value = e.active;
    }), (n, i) => (c(), h("div", rt, [
      p(n.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? p(n.$slots, "body", { key: 0 }) : y("", !0)
    ]));
  }
}, it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nt
}, Symbol.toStringTag, { value: "Module" })), ot = ["disabled"], at = {
  key: 0,
  class: "fas fa-spinner fa-spin"
}, Q = {
  __name: "WyxosAction",
  props: {
    loading: {
      type: Boolean,
      default: !1
    }
  },
  setup(s) {
    return (e, t) => (c(), h("button", { disabled: s.loading }, [
      s.loading ? (c(), h("i", at)) : p(e.$slots, "default", { key: 1 }, () => [
        t[0] || (t[0] = f("i", { class: "fas fa-trash" }, null, -1))
      ])
    ], 8, ot));
  }
}, lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Q
}, Symbol.toStringTag, { value: "Module" })), ut = { key: 0 }, dt = { key: 1 }, ct = { key: 2 }, ft = {
  __name: "WyxosAsync",
  props: {
    instance: {
      type: Object,
      required: !0
    }
  },
  setup(s) {
    const e = s, { data: t, isLoading: r, isLoaded: n, isError: i } = e.instance;
    return (o, a) => I(r) ? (c(), h("div", ut, [
      p(o.$slots, "loading", {}, () => [
        a[0] || (a[0] = $(" Loading... "))
      ])
    ])) : I(n) ? (c(), h("div", dt, [
      p(o.$slots, "default", { data: I(t) }, () => [
        $(w(I(t)), 1)
      ])
    ])) : I(i) ? (c(), h("div", ct, "Error loading lead.")) : y("", !0);
  }
}, ht = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ft
}, Symbol.toStringTag, { value: "Module" })), E = F({
  default: []
});
function N() {
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
    has(s, e = "default") {
      return E[e].some((t) => t.key === s);
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
      const t = E[e];
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
        const t = E[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((n) => n.key === s);
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
class T {
  constructor(e = {}) {
    u(this, "method", "post");
    u(this, "submitUrl", null);
    u(this, "loadUrl", null);
    u(this, "original", {});
    u(this, "form", F({}));
    u(this, "abortSubmitController", null);
    u(this, "abortLoadController", null);
    u(this, "submitState", b(""));
    u(this, "loadState", b(""));
    u(this, "errors", N());
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
            return a[o[o.length - 1]] = n, !0;
          }
          return Reflect.set(t.form, r, n);
        }
        return Reflect.set(t, r, n, i);
      }
    });
  }
  // get isDirty() {
  //   const deepSort = (obj) => {
  //     if (Array.isArray(obj)) {
  //       return obj.map(deepSort) // Sort each item in the array
  //     } else if (obj && typeof obj === 'object') {
  //       return Object.keys(obj)
  //         .sort() // Sort keys
  //         .reduce((sorted, key) => {
  //           sorted[key] = deepSort(obj[key]) // Recursively sort values
  //           return sorted
  //         }, {})
  //     }
  //     return obj // Return non-object values as is
  //   }
  //
  //   return (
  //     JSON.stringify(deepSort(this.original)) !==
  //     JSON.stringify(deepSort(this.form))
  //   )
  // }
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
    return this.original = JSON.parse(JSON.stringify(e)), Object.keys(e).forEach((t) => {
      this.form[t] = e[t];
    }), this;
  }
  submitAt(e) {
    return this.submitUrl = e, this;
  }
  async submit() {
    this.submitting(), this.clearErrors();
    const e = {};
    this.abortSubmitController && this.abortSubmitController.abort(), this.abortSubmitController = new AbortController(), e.signal = this.abortSubmitController.signal, await new Promise((n) => setTimeout(n, 1e3));
    const t = this.callbacks.formatter ? this.callbacks.formatter(this.form) : this.form, r = this.method;
    return _[r](this.submitUrl, t, e).then((n) => (this.submitted(), this.resetAfterSubmitFlag && this.setAttributes(this.original), this.callbacks.success ? this.callbacks.success(n.data) : n.data)).catch((n) => (this.submitFailed(), this.errors.set(n), this.callbacks.failure ? Promise.reject(this.callbacks.failure(n)) : Promise.reject(n)));
  }
  load() {
    this.loading();
    const e = {};
    return this.abortLoadController && this.abortLoadController.abort(), this.abortLoadController = new AbortController(), e.signal = this.abortLoadController.signal, _.get(this.loadUrl, e).then((t) => (this.loaded(), t.data.form && this.setAttributes(t.data.form), t.data)).catch((t) => (this.loadFailed(), Promise.reject(t)));
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
  reset() {
    return this.setAttributes(this.original), this;
  }
}
const O = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, mt = {
  name: "WyxosButton",
  props: {
    form: {
      type: T,
      default: null
    }
  }
}, gt = ["disabled"], pt = { key: 0 }, yt = { key: 1 };
function bt(s, e, t, r, n, i) {
  return c(), h("button", {
    disabled: t.form.isSubmitting,
    type: "submit"
  }, [
    p(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? y("", !0) : (c(), h("span", pt, "Submit")),
      t.form.isSubmitting ? (c(), h("span", yt, "Processing")) : y("", !0)
    ]),
    t.form.isSubmitting ? p(s.$slots, "icon", { key: 0 }, () => [
      e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin" }, null, -1))
    ]) : y("", !0)
  ], 8, gt);
}
const _t = /* @__PURE__ */ O(mt, [["render", bt]]), vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _t
}, Symbol.toStringTag, { value: "Module" })), St = {
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
function wt(s, e, t, r, n, i) {
  return p(s.$slots, "default", D(Y({ add: i.add, remove: i.remove, items: n.items })), () => [
    e[0] || (e[0] = f("ul", null, [
      f("li")
    ], -1))
  ]);
}
const Ot = /* @__PURE__ */ O(St, [["render", wt]]), xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ot
}, Symbol.toStringTag, { value: "Module" }));
class A {
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
    return new A();
  }
}
const Ct = {
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
}, $t = { class: "bg-white p-6" }, Ft = { class: "title" }, jt = { class: "mb-6" }, kt = {
  class: "buttons",
  role: "group"
};
function Et(s, e, t, r, n, i) {
  const o = g("wyxos-button"), a = g("o-modal");
  return c(), x(a, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      f("section", $t, [
        f("article", null, [
          f("header", null, [
            f("h3", Ft, w(t.title), 1)
          ]),
          f("p", jt, w(t.message), 1),
          f("footer", kt, [
            C(o, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: m(() => [
                $(w(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            C(o, {
              class: B([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => i.proceed())
            }, {
              default: m(() => [
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
const Tt = /* @__PURE__ */ O(Ct, [["render", Et]]), Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tt
}, Symbol.toStringTag, { value: "Module" })), qt = {
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
      default() {
        return "DD/MM/YYYY";
      }
    },
    submitFormat: {
      type: String,
      default() {
        return "YYYY-MM-DD";
      }
    },
    label: {
      type: String,
      default() {
        return null;
      }
    },
    name: {
      type: String,
      default() {
        return null;
      }
    },
    form: {
      type: T,
      default() {
        return null;
      }
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
        this.query = s ? V(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
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
function Lt(s, e, t, r, n, i) {
  var l;
  const o = g("o-datepicker"), a = g("o-field");
  return c(), x(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      C(o, W({
        modelValue: n.query,
        "onUpdate:modelValue": e[0] || (e[0] = (d) => n.query = d),
        formatter: i.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": i.updateQuery }), null, 16, ["modelValue", "formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Vt = /* @__PURE__ */ O(qt, [["render", Lt]]), Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vt
}, Symbol.toStringTag, { value: "Module" }));
class ge {
  constructor(e) {
    u(this, "url", "");
    u(this, "processing", b(null));
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
      return _.get(i, {
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
      return this.processing.value = !1, _.patch(i, e).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
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
      return _.delete(i).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
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
  withKey(e) {
    return this.keyResolver = e, this;
  }
}
const At = {
  __name: "WyxosDeleteButton",
  props: {
    action: {
      type: ge,
      required: !0
    },
    id: {
      type: [String, Number],
      required: !0
    }
  },
  emits: ["done"],
  setup(s, { emit: e }) {
    const t = e;
    return (r, n) => (c(), x(Q, {
      loading: s.action.isProcessing(s.id),
      onClick: n[0] || (n[0] = (i) => s.action.delete({ id: s.id }).then((o) => t("done", o)))
    }, null, 8, ["loading"]));
  }
}, Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: At
}, Symbol.toStringTag, { value: "Module" })), It = le({
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
      errors: N()
    };
  }
}), Mt = {
  key: 0,
  class: "wyxos-error"
}, Bt = {
  key: 1,
  class: "wyxos-error"
};
function Ut(s, e, t, r, n, i) {
  var o, a;
  return (o = s.form) != null && o.getError(s.name).message ? (c(), h("span", Mt, w(s.form.getError(s.name).message), 1)) : (a = s.errors.get(s.name)) != null && a.message ? (c(), h("span", Bt, w(s.errors.get(s.name).message), 1)) : y("", !0);
}
const Nt = /* @__PURE__ */ O(It, [["render", Ut]]), zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nt
}, Symbol.toStringTag, { value: "Module" }));
class te {
  constructor(e) {
    u(this, "visibility", b(!1));
    u(this, "applied", []);
    e = {
      page: 1,
      ...e
    }, this.original = e, this.query = F({
      ...e
    });
  }
  get isVisible() {
    return this.visibility.value;
  }
  get isDirty() {
    return JSON.stringify(this.query) !== JSON.stringify(this.original);
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
      ...this.original
    });
  }
  clear(e, t) {
    e ? this.query[e] = this.original[e] : this.query = F({
      ...this.original
    }), t && t();
  }
  getAppliedQuery() {
    const e = {};
    return this.applied.forEach((t) => {
      e[t.key] = t.rawValue;
    }), e;
  }
  isDefault(e) {
    return this.original[e] === this.query[e];
  }
  getFilledFields() {
    return Object.fromEntries(
      Object.entries(this.query).filter(
        ([e, t]) => t != null && t !== ""
      )
    );
  }
}
const pe = "%[a-f0-9]{2}", se = new RegExp("(" + pe + ")|([^%]+?)", "gi"), re = new RegExp("(" + pe + ")+", "gi");
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
function Dt(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(se) || [];
    for (let t = 1; t < e.length; t++)
      s = K(e, t).join(""), e = s.match(se) || [];
    return s;
  }
}
function Yt(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = re.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const n = Dt(t[0]);
      n !== t[0] && (e[t[0]] = n);
    }
    t = re.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const n of r)
    s = s.replace(new RegExp(n, "g"), e[n]);
  return s;
}
function Kt(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return Yt(s);
  }
}
function ye(s, e) {
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
function Jt(s, e) {
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
const Ht = (s) => s == null, Qt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), J = Symbol("encodeFragmentIdentifier");
function Xt(s) {
  switch (s.arrayFormat) {
    case "index":
      return (e) => (t, r) => {
        const n = t.length;
        return r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
          ...t,
          [v(e, s), "[", n, "]"].join("")
        ] : [
          ...t,
          [v(e, s), "[", v(n, s), "]=", v(r, s)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [v(e, s), "[]"].join("")
      ] : [
        ...t,
        [v(e, s), "[]=", v(r, s)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [v(e, s), ":list="].join("")
      ] : [
        ...t,
        [v(e, s), ":list=", v(r, s)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = s.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (r, n) => n === void 0 || s.skipNull && n === null || s.skipEmptyString && n === "" ? r : (n = n === null ? "" : n, r.length === 0 ? [[v(t, s), e, v(n, s)].join("")] : [[r, v(n, s)].join(s.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        v(e, s)
      ] : [
        ...t,
        [v(e, s), "=", v(r, s)].join("")
      ];
  }
}
function Gt(s) {
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
function be(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function v(s, e) {
  return e.encode ? e.strict ? Qt(s) : encodeURIComponent(s) : s;
}
function q(s, e) {
  return e.decode ? Kt(s) : s;
}
function _e(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? _e(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function ve(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function Zt(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function ne(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function X(s) {
  s = ve(s);
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
  }, be(e.arrayFormatSeparator);
  const t = Gt(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const n of s.split("&")) {
    if (n === "")
      continue;
    const i = e.decode ? n.replace(/\+/g, " ") : n;
    let [o, a] = ye(i, "=");
    o === void 0 && (o = i), a = a === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? a : q(a, e), t(q(o, e), a, r);
  }
  for (const [n, i] of Object.entries(r))
    if (typeof i == "object" && i !== null)
      for (const [o, a] of Object.entries(i))
        i[o] = ne(a, e);
    else
      r[n] = ne(i, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((n, i) => {
    const o = r[i];
    return n[i] = o && typeof o == "object" && !Array.isArray(o) ? _e(o) : o, n;
  }, /* @__PURE__ */ Object.create(null));
}
function Se(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, be(e.arrayFormatSeparator);
  const t = (o) => e.skipNull && Ht(s[o]) || e.skipEmptyString && s[o] === "", r = Xt(e), n = {};
  for (const [o, a] of Object.entries(s))
    t(o) || (n[o] = a);
  const i = Object.keys(n);
  return e.sort !== !1 && i.sort(e.sort), i.map((o) => {
    const a = s[o];
    return a === void 0 ? "" : a === null ? v(o, e) : Array.isArray(a) ? a.length === 0 && e.arrayFormat === "bracket-separator" ? v(o, e) + "[]" : a.reduce(r(o), []).join("&") : v(o, e) + "=" + v(a, e);
  }).filter((o) => o.length > 0).join("&");
}
function we(s, e) {
  var n;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = ye(s, "#");
  return t === void 0 && (t = s), {
    url: ((n = t == null ? void 0 : t.split("?")) == null ? void 0 : n[0]) ?? "",
    query: G(X(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: q(r, e) } : {}
  };
}
function Oe(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [J]: !0,
    ...e
  };
  const t = ve(s.url).split("?")[0] || "", r = X(s.url), n = {
    ...G(r, { sort: !1 }),
    ...s.query
  };
  let i = Se(n, e);
  i && (i = `?${i}`);
  let o = Zt(s.url);
  if (s.fragmentIdentifier) {
    const a = new URL(t);
    a.hash = s.fragmentIdentifier, o = e[J] ? a.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${i}${o}`;
}
function xe(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [J]: !1,
    ...t
  };
  const { url: r, query: n, fragmentIdentifier: i } = we(s, t);
  return Oe({
    url: r,
    query: Jt(n, e),
    fragmentIdentifier: i
  }, t);
}
function es(s, e, t) {
  const r = Array.isArray(e) ? (n) => !e.includes(n) : (n, i) => !e(n, i);
  return xe(s, r, t);
}
const ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: es,
  extract: X,
  parse: G,
  parseUrl: we,
  pick: xe,
  stringify: Se,
  stringifyUrl: Oe
}, Symbol.toStringTag, { value: "Module" }));
class U {
  constructor(e) {
    u(this, "loadUrl", "");
    u(this, "loadingState", b(null));
    u(this, "router", null);
    u(this, "attributes", F({
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    return this.filter = new te(e), new Proxy(this, {
      get(r, n, i) {
        if (Reflect.has(r, n))
          return Reflect.get(r, n, i);
        if (Reflect.has(r.filter.query, n)) {
          const o = n.split(".");
          if (o.length > 1) {
            let a = r.filter.query;
            for (let l = 0; l < o.length; l++)
              a = a[o[l]];
            return a ?? void 0;
          }
          return Reflect.get(r.filter.query, n);
        }
      },
      set(r, n, i, o) {
        if (Reflect.has(r, n))
          return Reflect.set(r, n, i, o);
        if (Reflect.has(r.filter.query, n)) {
          const a = n.split(".");
          if (a.length > 1) {
            let l = r.form;
            for (let d = 0; d < a.length - 1; d++)
              a[d] in l || (l[a[d]] = {}), l = l[a[d]];
            return l[a[a.length - 1]] === void 0 ? !1 : (l[a[a.length - 1]] = i, !0);
          }
          return Reflect.set(r.filter.query, n, i);
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
  get isLoaded() {
    return this.loadingState.value === "loaded";
  }
  get isDirty() {
    return this.filter.isDirty;
  }
  static create(e) {
    return new U(e);
  }
  setFilter(e) {
    return this.filter = new te(e), this;
  }
  search(e = {}) {
    return typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), _.get(this.loadUrl, {
      params: e
    }).then((t) => (t.data.listing && Object.assign(this.attributes, t.data.listing), t.data.filters && (this.filter.applied = t.data.filters), this.router && this.router.push({ query: this.filter.getFilledFields() }), t)).finally(() => {
      this.loaded();
    });
  }
  load(e = {}) {
    const t = ie.parse(window.location.search, {
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
    const t = ie.parse(window.location.search, {
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
    return Le(
      () => e.query,
      () => {
        this.refresh();
      }
    ), this;
  }
  next() {
    return this.filter.query.page += 1, this.search();
  }
  resetSearch() {
    return this.reset(), this.filter.applied = [], this.router ? this.router.push({ query: {} }) : this.load();
  }
}
const ts = {
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
function ss(s, e, t, r, n, i) {
  const o = g("o-loading"), a = g("o-button");
  return t.form.isLoaded ? (c(), h("form", {
    key: 0,
    class: B(t.formClass),
    onSubmit: e[0] || (e[0] = ue((l) => i.handle(), ["prevent"]))
  }, [
    p(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (c(), x(o, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (c(), x(a, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: m(() => e[2] || (e[2] = [
      $(" Error. Retry or refresh. ")
    ])),
    _: 1
  })) : y("", !0);
}
const rs = /* @__PURE__ */ O(ts, [["render", ss]]), ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rs
}, Symbol.toStringTag, { value: "Module" })), is = {
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
      class: B([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: is
}, Symbol.toStringTag, { value: "Module" })), as = {
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
}, ls = ["width", "height"];
function us(s, e, t, r, n, i) {
  return c(), h("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, ls);
}
const ds = /* @__PURE__ */ O(as, [["render", us]]), cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ds
}, Symbol.toStringTag, { value: "Module" })), fs = { class: "quick-edit" }, hs = { class: "value" }, ms = ["readonly", "type"], gs = ["disabled"], ps = ["disabled"], ys = {
  key: 0,
  class: "fas fa-check"
}, bs = {
  key: 1,
  class: "fas fa-spinner fa-spin"
}, _s = {
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
    const t = s, r = e, n = b(t.modelValue), i = b(!1), o = () => {
      i.value = !1, n.value = t.modelValue;
    }, a = () => t.update(n.value).then(() => {
      r("update:modelValue", n.value), i.value = !1;
    });
    return (l, d) => (c(), h("div", fs, [
      i.value ? y("", !0) : p(l.$slots, "value", { key: 0 }, () => [
        f("span", hs, w(s.modelValue), 1)
      ]),
      i.value ? p(l.$slots, "field", {
        key: 1,
        query: n.value
      }, () => [
        Ve(f("input", {
          "onUpdate:modelValue": d[0] || (d[0] = (P) => n.value = P),
          readonly: s.processing,
          type: s.type
        }, null, 8, ms), [
          [We, n.value]
        ])
      ]) : y("", !0),
      p(l.$slots, "actions", {
        enableEdit: i.value,
        onCancel: o,
        onUpdate: a
      }, () => [
        i.value ? y("", !0) : (c(), h("button", {
          key: 0,
          class: "edit",
          onClick: d[1] || (d[1] = (P) => i.value = !0)
        }, d[4] || (d[4] = [
          f("i", { class: "fas fa-pencil-alt" }, null, -1)
        ]))),
        i.value ? (c(), h("button", {
          key: 1,
          disabled: s.processing,
          class: "cancel",
          onClick: d[2] || (d[2] = (P) => o())
        }, d[5] || (d[5] = [
          f("i", { class: "fas fa-times" }, null, -1)
        ]), 8, gs)) : y("", !0),
        i.value ? (c(), h("button", {
          key: 2,
          disabled: s.processing,
          class: "save",
          onClick: d[3] || (d[3] = (P) => a())
        }, [
          s.processing ? y("", !0) : (c(), h("i", ys)),
          s.processing ? (c(), h("i", bs)) : y("", !0)
        ], 8, ps)) : y("", !0)
      ])
    ]));
  }
}, vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _s
}, Symbol.toStringTag, { value: "Module" })), Ss = {
  name: "WyxosInput",
  components: {
    OInput: he,
    OField: fe
  },
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
      default() {
        return !1;
      }
    },
    fieldClass: {
      type: String,
      default() {
        return null;
      }
    },
    inputRootClass: {
      type: String,
      default() {
        return null;
      }
    },
    inputClass: {
      type: String,
      default() {
        return null;
      }
    },
    modelValue: {
      type: [String, Number, null],
      default() {
        return null;
      }
    },
    form: {
      type: T,
      default() {
        return null;
      }
    },
    disabled: {
      type: [Boolean, String],
      default() {
        return null;
      }
    },
    placeholder: {
      type: String,
      default() {
        return null;
      }
    },
    passwordReveal: {
      type: Boolean,
      default() {
        return !1;
      }
    }
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      errors: N()
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
function ws(s, e, t, r, n, i) {
  const o = g("o-input"), a = g("o-field");
  return c(), x(a, W({
    class: t.fieldClass,
    label: t.label
  }, i.getError), {
    default: m(() => [
      C(o, {
        class: B(t.inputClass),
        clearable: t.clearable,
        disabled: t.disabled,
        "model-value": t.modelValue ?? "",
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
const Os = /* @__PURE__ */ O(Ss, [["render", ws]]), xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Os
}, Symbol.toStringTag, { value: "Module" })), Cs = {
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
}, $s = { key: 0 };
function Fs(s, e, t, r, n, i) {
  const o = g("o-table");
  return c(), x(o, D(Y(i.allPropsAndEvents)), Ae({
    empty: m(() => [
      p(s.$slots, "empty", {}, () => [
        t.listing.isEmpty ? (c(), h("p", $s, "No records found.")) : y("", !0)
      ])
    ]),
    _: 2
  }, [
    de(s.$slots, (a, l) => ({
      name: l,
      fn: m((d) => [
        p(s.$slots, l, D(Y(d)))
      ])
    }))
  ]), 1040);
}
const js = /* @__PURE__ */ O(Cs, [["render", Fs]]), ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: js
}, Symbol.toStringTag, { value: "Module" })), Es = {
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
      errors: N()
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
function Ts(s, e, t, r, n, i) {
  const o = g("o-input"), a = g("o-field");
  return c(), x(a, W({
    label: t.label,
    class: t.fieldClass
  }, { ...i.getError() }), {
    default: m(() => [
      C(o, {
        readonly: t.readonly,
        class: B(t.inputClass),
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
const Ps = /* @__PURE__ */ O(Es, [["render", Ts]]), qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ps
}, Symbol.toStringTag, { value: "Module" })), Ls = {
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
function Vs(s, e, t, r, n, i) {
  return p(s.$slots, "default", { logout: i.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (o) => i.logout())
    }, "Sign out")
  ]);
}
const Ws = /* @__PURE__ */ O(Ls, [["render", Vs]]), As = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ws
}, Symbol.toStringTag, { value: "Module" })), Rs = le({
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
}), Is = ["max", "value"], Ms = { key: 0 };
function Bs(s, e, t, r, n, i) {
  return c(), h(ce, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, Is),
    s.showValue ? (c(), h("span", Ms, w(s.modelValue) + " / " + w(s.max), 1)) : y("", !0)
  ], 64);
}
const Us = /* @__PURE__ */ O(Rs, [["render", Bs]]), Ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Us
}, Symbol.toStringTag, { value: "Module" })), zs = {
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
}, Ds = { class: "flex gap-6" };
function Ys(s, e, t, r, n, i) {
  const o = g("wyxos-button"), a = g("o-modal");
  return c(), x(a, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      f("h2", null, w(t.title), 1),
      f("p", null, w(t.message), 1),
      f("div", Ds, [
        C(o, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: m(() => [
            $(w(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        C(o, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => i.proceed())
        }, {
          default: m(() => [
            $(w(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const Ce = /* @__PURE__ */ O(zs, [["render", Ys]]), Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ce
}, Symbol.toStringTag, { value: "Module" })), Js = {
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
}, Hs = { class: "content p-6" }, Qs = { class: "buttons flex gap-6 justify-end" };
function Xs(s, e, t, r, n, i) {
  const o = g("o-button"), a = g("w-button"), l = g("o-modal");
  return c(), x(a, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (d) => i.onRemove())
  }, {
    default: m(() => [
      p(s.$slots, "button", {}, () => [
        e[4] || (e[4] = f("i", { class: "fas fa-trash" }, null, -1))
      ]),
      n.isVisible ? (c(), x(Re, {
        key: 0,
        to: "body"
      }, [
        C(l, {
          active: n.isVisible,
          "onUpdate:active": e[2] || (e[2] = (d) => n.isVisible = d)
        }, {
          default: m(() => [
            f("div", Hs, [
              p(s.$slots, "title", {}, () => [
                e[5] || (e[5] = f("h3", { class: "title" }, "Delete", -1))
              ]),
              p(s.$slots, "message", {}, () => [
                e[6] || (e[6] = f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1))
              ]),
              f("div", Qs, [
                C(o, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (d) => n.isVisible = !1)
                }, {
                  default: m(() => e[7] || (e[7] = [
                    $("Cancel ")
                  ])),
                  _: 1
                }),
                C(a, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (d) => i.remove())
                }, {
                  default: m(() => [
                    p(s.$slots, "confirm", {}, () => [
                      e[8] || (e[8] = $("Confirm"))
                    ])
                  ]),
                  _: 3
                }, 8, ["loading"])
              ])
            ])
          ]),
          _: 3
        }, 8, ["active"])
      ])) : y("", !0)
    ]),
    _: 3
  });
}
const Gs = /* @__PURE__ */ O(Js, [["render", Xs]]), Zs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gs
}, Symbol.toStringTag, { value: "Module" })), er = {
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
}, tr = ["value"];
function sr(s, e, t, r, n, i) {
  var l;
  const o = g("o-select"), a = g("o-field");
  return c(), x(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      C(o, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (d) => i.updateValue(d))
      }, {
        default: m(() => [
          p(s.$slots, "default", {}, () => [
            t.items ? (c(!0), h(ce, { key: 0 }, de(t.items, (d) => (c(), h("option", {
              key: d.value,
              value: d.value
            }, w(d.label), 9, tr))), 128)) : y("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const rr = /* @__PURE__ */ O(er, [["render", sr]]), nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rr
}, Symbol.toStringTag, { value: "Module" })), ir = {
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
}, or = { class: "bg-white p-6" }, ar = { class: "buttons" };
function lr(s, e, t, r, n, i) {
  const o = g("wyxos-input"), a = g("w-button"), l = g("o-modal");
  return c(), x(l, { active: !0 }, {
    default: m(() => [
      f("div", or, [
        e[6] || (e[6] = f("h2", { class: "title" }, "Session Expired", -1)),
        e[7] || (e[7] = f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1)),
        f("form", {
          onSubmit: e[3] || (e[3] = ue((...d) => i.proceed && i.proceed(...d), ["prevent"]))
        }, [
          C(o, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (d) => r.login.email = d),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          C(o, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (d) => r.login.password = d),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", ar, [
            C(a, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (d) => i.onLogout())
            }, {
              default: m(() => e[4] || (e[4] = [
                $(" Logout ")
              ])),
              _: 1
            }, 8, ["disabled"]),
            C(a, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: m(() => e[5] || (e[5] = [
                $(" Login ")
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
const $e = /* @__PURE__ */ O(ir, [["render", lr]]), ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), dr = {
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
}, cr = { key: 0 }, fr = { key: 1 }, hr = { key: 2 }, mr = { key: 3 };
function gr(s, e, t, r, n, i) {
  const o = g("o-button");
  return c(), x(o, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: m(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), h("span", cr, w(n.mergedLabels.submit), 1)) : y("", !0),
      t.form.isSubmitting ? (c(), h("span", fr, [
        $(w(n.mergedLabels.submitting) + " ", 1),
        e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin" }, null, -1))
      ])) : y("", !0),
      t.form.isSubmitted ? (c(), h("span", hr, w(n.mergedLabels.submitted), 1)) : y("", !0),
      t.form.isSubmitFailed ? (c(), h("span", mr, w(n.mergedLabels.failed), 1)) : y("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const pr = /* @__PURE__ */ O(dr, [["render", gr]]), yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pr
}, Symbol.toStringTag, { value: "Module" })), br = {
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
      const S = window.location.hash.replace("#", ""), j = new URLSearchParams(S);
      return Object.fromEntries(j.entries());
    }, i = (S, j) => {
      const L = window.location.hash.replace("#", ""), k = new URLSearchParams(L);
      k.set(S, j), window.location.hash = k.toString();
    }, o = b(n()[t.hashKey] || t.active), a = b(!1), l = (S) => a.value ? !0 : S === o.value, d = () => {
      a.value = window.innerWidth <= t.responsiveResolution;
    }, P = (S) => {
      o.value = S, r("update:active", S), i(t.hashKey, S);
    };
    return ae(() => {
      window.addEventListener("hashchange", () => {
        const S = n();
        S[t.hashKey] && (o.value = S[t.hashKey]);
      }), d(), window.addEventListener("resize", d);
    }), Ie(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", d);
    }), (S, j) => (c(), h("div", null, [
      p(S.$slots, "navigation", {
        isActive: l,
        setActive: P
      }, () => [
        j[0] || (j[0] = $(" Fill in navigation content here "))
      ]),
      p(S.$slots, "content", { isActive: l }, () => [
        j[1] || (j[1] = $(" Fill in content here"))
      ])
    ]));
  }
}, _r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: br
}, Symbol.toStringTag, { value: "Module" }));
class Z {
  constructor(e = {}) {
    u(this, "state", new A());
    u(this, "result", b([]));
    u(this, "value", b(null));
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
const vr = {
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
function Sr(s, e, t, r, n, i) {
  const o = g("o-taginput");
  return c(), x(o, W({
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
const wr = /* @__PURE__ */ O(vr, [["render", Sr]]), Or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wr
}, Symbol.toStringTag, { value: "Module" })), xr = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, Cr = { class: "bg-white p-6" }, $r = { class: "buttons" };
function Fr(s, e, t, r, n, i) {
  const o = g("w-button"), a = g("o-modal");
  return c(), x(a, { active: !0 }, {
    default: m(() => [
      f("div", Cr, [
        e[2] || (e[2] = f("h2", { class: "title" }, "Session expired", -1)),
        e[3] || (e[3] = f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1)),
        f("div", $r, [
          C(o, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: m(() => e[1] || (e[1] = [
              $(" Confirm ")
            ])),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const Fe = /* @__PURE__ */ O(xr, [["render", Fr]]), jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fe
}, Symbol.toStringTag, { value: "Module" })), kr = {
  __name: "WyxosUpdateButton",
  props: {
    action: {
      type: ge,
      required: !0
    },
    id: {
      type: [String, Number],
      required: !0
    },
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["done"],
  setup(s, { emit: e }) {
    const t = e;
    return (r, n) => (c(), x(Q, {
      loading: s.action.isProcessing(s.id),
      onClick: n[0] || (n[0] = (i) => s.action.patch({ id: s.id, ...s.payload }).then((o) => t("done", o)))
    }, {
      default: m(() => [
        p(r.$slots, "default", {}, () => [
          n[1] || (n[1] = f("i", { class: "fas fa-edit" }, null, -1))
        ])
      ]),
      _: 3
    }, 8, ["loading"]));
  }
}, Er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kr
}, Symbol.toStringTag, { value: "Module" }));
class je {
  constructor() {
    u(this, "url", null);
    this.data = b(null), this.isLoaded = b(!1), this.isLoading = b(!1), this.isError = b(!1), this.errorMessage = b(null);
  }
  static create() {
    return new je();
  }
  async load(e, t) {
    this.loading(), typeof e == "object" && (t = e, e = null), e = e || this.url;
    try {
      const r = await _.get(e, t);
      return this.data.value = r.data, this.loaded(), r;
    } catch (r) {
      return this.failed(r), Promise.reject(r);
    }
  }
  loaded() {
    this.isLoaded.value = !0, this.isLoading.value = !1, this.isError.value = !1, this.errorMessage.value = null;
  }
  loading() {
    this.isLoading.value = !0, this.isLoaded.value = !1, this.isError.value = !1, this.errorMessage.value = null;
  }
  failed(e) {
    throw this.isLoading.value = !1, this.isLoaded.value = !1, this.isError.value = !0, this.errorMessage.value = e.message || "An unknown error occurred", e;
  }
  loadFrom(e) {
    return this.url = e, this;
  }
  async refresh(e) {
    e = e || this.url;
    try {
      const t = await _.get(e);
      return this.data.value = t.data, t;
    } catch (t) {
      return this.failed(t), Promise.reject(t);
    }
  }
  reload(e) {
    return this.loading(), this.load(e);
  }
}
class ke {
  constructor(e) {
    u(this, "exclude", null);
    u(this, "inProgress", b(!1));
    u(this, "abortController", null);
    u(this, "onCompleteCallback", null);
    u(this, "onSelectCallback", null);
    u(this, "options", b([]));
    u(this, "minimumCharacters", 0);
    this.path = e;
  }
  static create(e) {
    return new ke(e);
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
const M = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class Tr {
  constructor(e, t) {
    u(this, "value", null);
    u(this, "empty", "");
    u(this, "interval", null);
    this.value = e, this.empty = t;
  }
  static load(e, t = "") {
    return new this(e, t);
  }
  static create() {
    return new this();
  }
  format(e, t = M.UK, r = "") {
    return e ? V(e).format(t) : this.value ? V(this.value).format(t) : r || this.empty;
  }
  render(e = M.UK_TIME, t = "") {
    return this.format(this.value, e, t);
  }
  date(e = M.UK, t = "") {
    return this.format(this.value, e, t);
  }
  time(e = M.UK_TIME, t = "") {
    return this.format(this.value, e, t).split(" ")[1];
  }
  ago() {
    return V(this.value).fromNow();
  }
}
u(Tr, "FORMATS", M);
class Ur {
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
class Ee {
  constructor() {
    u(this, "state", b(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new Ee();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class Nr {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class zr {
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
  async action(e, { row: t, index: r, remove: n, method: i }, o = {}) {
    t.isProcessing = !0;
    const a = {
      id: t.id,
      ...o
    };
    if (i === "delete") {
      const { data: l } = await _.delete(e, {
        data: a
      }).catch((d) => {
        throw t.isProcessing = !1, d;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await _.post(e, a).catch((d) => {
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
class Dr {
  constructor(e) {
    u(this, "current", b(null));
    u(this, "history", b([]));
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
class Te {
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
    return new Te(e);
  }
}
class Pr {
  constructor() {
    u(this, "attributes", F({
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
const Yr = new Pr();
async function Kr(s = {}) {
  return (await me().modal.open({
    component: Ce,
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
async function qr(s, e) {
  var n, i, o, a, l, d;
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
  const r = t[(n = s.response) == null ? void 0 : n.status] || t[500];
  if (Me.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((i = s.response) == null ? void 0 : i.status) === 419) {
    ee.open({
      component: ((o = e.components) == null ? void 0 : o.TokenExpired) || Fe,
      trapFocus: !0,
      closable: !1
    });
    const S = (await _.get("/heartbeat")).data.csrfToken;
    _.defaults.headers.common["X-CSRF-TOKEN"] = S;
  }
  if (((a = s.response) == null ? void 0 : a.status) === 401 && ee.open({
    component: ((l = e.components) == null ? void 0 : l.SessionExpired) || $e,
    trapFocus: !0,
    closable: !1
  }), ((d = s.response) == null ? void 0 : d.status) === 422) {
    const P = setInterval(() => {
      const S = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), j = (k) => {
        const z = k.getBoundingClientRect(), R = window.getComputedStyle(k);
        return z.width > 0 && z.height > 0 && R.display !== "none" && R.visibility !== "hidden" && R.opacity !== "0";
      }, L = Array.from(S).find(j);
      if (L) {
        clearInterval(P);
        let k;
        if (L.classList.contains("o-field__message-danger") ? k = L.closest(".o-field") : L.classList.contains("wyxos-error") && (k = L.closest("label")), k) {
          const R = k.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: R, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
function Jr(s) {
  me().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function Lr(s) {
  _.interceptors.response.use(null, (e) => qr(e, s));
}
const oe = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": it, "./components/WyxosAction.vue": lt, "./components/WyxosAsync.vue": ht, "./components/WyxosButton.vue": vt, "./components/WyxosCollection.vue": xt, "./components/WyxosConfirm.vue": Pt, "./components/WyxosDatepicker.vue": Wt, "./components/WyxosDeleteButton.vue": Rt, "./components/WyxosError.vue": zt, "./components/WyxosForm.vue": ns, "./components/WyxosIcon.vue": os, "./components/WyxosImage.vue": cs, "./components/WyxosInlineEdit.vue": vs, "./components/WyxosInput.vue": xs, "./components/WyxosListing.vue": ks, "./components/WyxosLiveInput.vue": qs, "./components/WyxosLogout.vue": As, "./components/WyxosProgress.vue": Ns, "./components/WyxosPrompt.vue": Ks, "./components/WyxosRemove.vue": Zs, "./components/WyxosSelect.vue": nr, "./components/WyxosSessionExpired.vue": ur, "./components/WyxosSubmit.vue": yr, "./components/WyxosTab.vue": _r, "./components/WyxosTags.vue": Or, "./components/WyxosTokenExpired.vue": jr, "./components/WyxosUpdateButton.vue": Er }), H = {}, Vr = (s, e = {}) => {
  e = { vision: {}, ...e }, s.component("OButton", Be), s.component("OField", fe), s.component("ORadio", Ue), s.component("OModal", Ne), s.component("OTooltip", ze), s.component("OTable", De), s.component("OTableColumn", Ye), s.component("OTabs", Ke), s.component("OTabItem", Je), s.component("OTaginput", He), s.component("ODatepicker", Qe), s.component("OSelect", Xe), s.component("OInput", he), s.component("OIcon", Ge), s.component("OUpload", Ze), s.component("OCheckbox", et), s.component("ONotification", tt), s.component("OAutocomplete", st), Object.keys(oe).forEach((t) => {
    const r = oe[t];
    if (r && r.default) {
      const n = r.default, i = n.name;
      if (i)
        s.component(i, n), s.component(i.replace("Wyxos", "W"), n), H[i] = n;
      else {
        const o = t.split("/").pop().split(".")[0];
        s.component(o, n), s.component(o.replace("Wyxos", "W"), n), H[o] = n;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, Lr(e);
}, Wr = {
  route(s, e, t) {
    return {
      name: s,
      params: e,
      query: t
    };
  }
}, Hr = {
  install: Vr,
  ...H,
  vn: Wr
};
export {
  ge as Action,
  je as AsyncData,
  ke as AutoComplete,
  Tr as DateRender,
  Ur as FileRequest,
  te as Filter,
  T as FormBuilder,
  U as Listing,
  A as LoadState,
  Ee as Modal,
  Nr as Option,
  zr as ResourceList,
  Z as Search,
  Dr as Steps,
  Te as Tab,
  nt as WyxosAccordion,
  Q as WyxosAction,
  ft as WyxosAsync,
  _t as WyxosButton,
  Ot as WyxosCollection,
  Tt as WyxosConfirm,
  Vt as WyxosDatepicker,
  At as WyxosDeleteButton,
  Nt as WyxosError,
  rs as WyxosForm,
  is as WyxosIcon,
  ds as WyxosImage,
  _s as WyxosInlineEdit,
  Os as WyxosInput,
  js as WyxosListing,
  Ps as WyxosLiveInput,
  Ws as WyxosLogout,
  Us as WyxosProgress,
  Ce as WyxosPrompt,
  Gs as WyxosRemove,
  rr as WyxosSelect,
  $e as WyxosSessionExpired,
  pr as WyxosSubmit,
  br as WyxosTab,
  wr as WyxosTags,
  Fe as WyxosTokenExpired,
  kr as WyxosUpdateButton,
  Yr as auth,
  Kr as confirm,
  Hr as default,
  qr as errorHandler,
  Jr as success,
  N as useFormErrors,
  Wr as vn
};
//# sourceMappingURL=vision.js.map
