var Ee = Object.defineProperty;
var qe = (s, e, t) => e in s ? Ee(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => qe(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as b, onMounted as le, openBlock as d, createElementBlock as h, renderSlot as p, createCommentVNode as y, createElementVNode as f, unref as I, createTextVNode as $, toDisplayString as S, reactive as j, normalizeProps as Y, guardReactiveProps as J, resolveComponent as g, createBlock as O, withCtx as m, createVNode as C, normalizeClass as B, mergeProps as W, defineComponent as ue, watch as Pe, withModifiers as de, withDirectives as Le, vModelDynamic as Ve, createSlots as Te, renderList as ce, Fragment as fe, Teleport as We, onUnmounted as Ae } from "vue";
import _ from "axios";
import T from "moment";
import Re, { useOruga as X } from "@oruga-ui/oruga-next";
const Ie = { class: "wyxos-accordion" }, Me = {
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
    return le(() => {
      t.value = e.active;
    }), (i, n) => (d(), h("div", Ie, [
      p(i.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? p(i.$slots, "body", { key: 0 }) : y("", !0)
    ]));
  }
}, Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), Ne = ["disabled"], Ue = {
  key: 0,
  class: "fas fa-spinner fa-spin"
}, G = {
  __name: "WyxosAction",
  props: {
    loading: {
      type: Boolean,
      default: !1
    }
  },
  setup(s) {
    return (e, t) => (d(), h("button", { disabled: s.loading }, [
      s.loading ? (d(), h("i", Ue)) : p(e.$slots, "default", { key: 1 }, () => [
        t[0] || (t[0] = f("i", { class: "fas fa-trash" }, null, -1))
      ])
    ], 8, Ne));
  }
}, ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: G
}, Symbol.toStringTag, { value: "Module" })), De = { key: 0 }, Ye = { key: 1 }, Je = { key: 2 }, Ke = {
  __name: "WyxosAsync",
  props: {
    instance: {
      type: Object,
      required: !0
    }
  },
  setup(s) {
    const e = s, { data: t, isLoading: r, isLoaded: i, isError: n } = e.instance;
    return (o, a) => I(r) ? (d(), h("div", De, [
      p(o.$slots, "loading", {}, () => [
        a[0] || (a[0] = $(" Loading... "))
      ])
    ])) : I(i) ? (d(), h("div", Ye, [
      p(o.$slots, "default", { data: I(t) }, () => [
        $(S(I(t)), 1)
      ])
    ])) : I(n) ? (d(), h("div", Je, "Error loading lead.")) : y("", !0);
  }
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
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
      const t = k[e];
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
        const t = k[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((i) => i.key === s);
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
class E {
  constructor(e = {}) {
    u(this, "method", "post");
    u(this, "submitUrl", null);
    u(this, "loadUrl", null);
    u(this, "original", {});
    u(this, "form", j({}));
    u(this, "abortSubmitController", null);
    u(this, "abortLoadController", null);
    u(this, "submitState", b(""));
    u(this, "loadState", b(""));
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
      get(t, r, i) {
        if (Reflect.has(t, r))
          return Reflect.get(t, r, i);
        if (Reflect.has(t.form, r)) {
          const n = r.split(".");
          if (n.length > 1) {
            let o = t.form;
            for (let a = 0; a < n.length; a++)
              o = o[n[a]];
            return o ?? void 0;
          }
          return Reflect.get(t.form, r);
        }
      },
      set(t, r, i, n) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, i, n);
        if (Reflect.has(t.form, r)) {
          const o = r.split(".");
          if (o.length > 1) {
            let a = t.form;
            for (let l = 0; l < o.length - 1; l++)
              o[l] in a || (a[o[l]] = {}), a = a[o[l]];
            return a[o[o.length - 1]] = i, !0;
          }
          return Reflect.set(t.form, r, i);
        }
        return Reflect.set(t, r, i, n);
      }
    });
  }
  get isDirty() {
    const e = (t) => Array.isArray(t) ? t.map(e) : t && typeof t == "object" ? Object.keys(t).sort().reduce((r, i) => (r[i] = e(t[i]), r), {}) : t;
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
    this.abortSubmitController && this.abortSubmitController.abort(), this.abortSubmitController = new AbortController(), e.signal = this.abortSubmitController.signal, await new Promise((i) => setTimeout(i, 1e3));
    const t = this.callbacks.formatter ? this.callbacks.formatter(this.form) : this.form, r = this.method;
    return _[r](this.submitUrl, t, e).then((i) => (this.submitted(), this.resetAfterSubmitFlag && this.setAttributes(this.original), this.callbacks.success ? this.callbacks.success(i.data) : i.data)).catch((i) => (this.submitFailed(), this.errors.set(i), this.callbacks.failure ? Promise.reject(this.callbacks.failure(i)) : Promise.reject(i)));
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
const w = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, Qe = {
  name: "WyxosButton",
  props: {
    form: {
      type: E,
      default: null
    }
  }
}, Xe = ["disabled"], Ge = { key: 0 }, Ze = { key: 1 };
function et(s, e, t, r, i, n) {
  return d(), h("button", {
    disabled: t.form.isSubmitting,
    type: "submit"
  }, [
    p(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? y("", !0) : (d(), h("span", Ge, "Submit")),
      t.form.isSubmitting ? (d(), h("span", Ze, "Processing")) : y("", !0)
    ]),
    t.form.isSubmitting ? p(s.$slots, "icon", { key: 0 }, () => [
      e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin" }, null, -1))
    ]) : y("", !0)
  ], 8, Xe);
}
const tt = /* @__PURE__ */ w(Qe, [["render", et]]), st = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tt
}, Symbol.toStringTag, { value: "Module" })), rt = {
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
function it(s, e, t, r, i, n) {
  return p(s.$slots, "default", Y(J({ add: n.add, remove: n.remove, items: i.items })), () => [
    e[0] || (e[0] = f("ul", null, [
      f("li")
    ], -1))
  ]);
}
const nt = /* @__PURE__ */ w(rt, [["render", it]]), ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nt
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
const at = {
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
}, lt = { class: "bg-white p-6" }, ut = { class: "title" }, dt = { class: "mb-6" }, ct = {
  class: "buttons",
  role: "group"
};
function ft(s, e, t, r, i, n) {
  const o = g("wyxos-button"), a = g("o-modal");
  return d(), O(a, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      f("section", lt, [
        f("article", null, [
          f("header", null, [
            f("h3", ut, S(t.title), 1)
          ]),
          f("p", dt, S(t.message), 1),
          f("footer", ct, [
            C(o, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: m(() => [
                $(S(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            C(o, {
              class: B([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => n.proceed())
            }, {
              default: m(() => [
                $(S(t.confirmText), 1)
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
const ht = /* @__PURE__ */ w(at, [["render", ft]]), mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ht
}, Symbol.toStringTag, { value: "Module" })), gt = {
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
      type: E,
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
        this.query = s ? T(s, this.submitFormat)._d : null;
      },
      immediate: !0,
      deep: !0
    }
  },
  mounted() {
    this.modelValue && (this.query = T(this.modelValue, this.submitFormat)._d);
  },
  methods: {
    dateFormatter(s) {
      return s ? T(s).format(this.displayFormat) : null;
    },
    updateQuery() {
      var s;
      this.$emit(
        "update:modelValue",
        this.query ? T(this.query).format(this.submitFormat) : null
      ), (s = this.form) == null || s.clearError(this.name);
    }
  }
};
function pt(s, e, t, r, i, n) {
  var l;
  const o = g("o-datepicker"), a = g("o-field");
  return d(), O(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      C(o, W({
        modelValue: i.query,
        "onUpdate:modelValue": e[0] || (e[0] = (c) => i.query = c),
        formatter: n.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": n.updateQuery }), null, 16, ["modelValue", "formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const yt = /* @__PURE__ */ w(gt, [["render", pt]]), bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yt
}, Symbol.toStringTag, { value: "Module" }));
class he {
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
    var r, i;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.onBeforeCallback && this.onBeforeCallback(e) === !1) {
      this.processing.value = null;
      return;
    }
    try {
      const n = typeof this.url == "function" ? this.url(e) : this.url;
      return _.get(n, {
        params: e
      }).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
    } catch (n) {
      return this.error = ((i = (r = n.response) == null ? void 0 : r.data) == null ? void 0 : i.message) || n.message, this.processing.value = !1, this.onFailCallback ? this.onFailCallback(n) : n;
    }
  }
  async patch(e) {
    var r, i;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.onBeforeCallback && this.onBeforeCallback(e) === !1) {
      this.processing.value = null;
      return;
    }
    try {
      const n = typeof this.url == "function" ? this.url(e) : this.url;
      return console.log(n, e), this.processing.value = !1, _.patch(n, e).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
    } catch (n) {
      this.processing.value = !1, this.error = ((i = (r = n.response) == null ? void 0 : r.data) == null ? void 0 : i.message) || n.message;
    }
  }
  async delete(e) {
    var r, i;
    const t = this.keyResolver ? this.keyResolver(e) : null;
    if (this.processing.value = t || !0, this.onBeforeCallback && this.onBeforeCallback(e) === !1) {
      this.processing.value = !1;
      return;
    }
    try {
      const n = typeof this.url == "function" ? this.url(e) : this.url;
      return _.delete(n).then((o) => (this.processing.value = !1, this.onSuccessCallback && this.onSuccessCallback(o), o));
    } catch (n) {
      return this.error = ((i = (r = n.response) == null ? void 0 : r.data) == null ? void 0 : i.message) || n.message, this.processing.value = !1, n;
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
const _t = {
  __name: "WyxosDeleteButton",
  props: {
    action: {
      type: he,
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
    return (r, i) => (d(), O(G, {
      loading: s.action.isProcessing(s.id),
      onClick: i[0] || (i[0] = (n) => s.action.delete({ id: s.id }).then((o) => t("done", o)))
    }, null, 8, ["loading"]));
  }
}, vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _t
}, Symbol.toStringTag, { value: "Module" })), St = ue({
  name: "WyxosError",
  props: {
    form: {
      type: E,
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
}), wt = {
  key: 0,
  class: "wyxos-error"
}, xt = {
  key: 1,
  class: "wyxos-error"
};
function Ot(s, e, t, r, i, n) {
  var o, a;
  return (o = s.form) != null && o.getError(s.name).message ? (d(), h("span", wt, S(s.form.getError(s.name).message), 1)) : (a = s.errors.get(s.name)) != null && a.message ? (d(), h("span", xt, S(s.errors.get(s.name).message), 1)) : y("", !0);
}
const Ct = /* @__PURE__ */ w(St, [["render", Ot]]), $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ct
}, Symbol.toStringTag, { value: "Module" }));
class se {
  constructor(e) {
    u(this, "visibility", b(!1));
    u(this, "applied", []);
    e = {
      page: 1,
      ...e
    }, this.original = e, this.query = j({
      ...e
    });
  }
  get isVisible() {
    return this.visibility.value;
  }
  get isDirty() {
    return console.log(JSON.stringify(this.query)), console.log(JSON.stringify(this.original)), JSON.stringify(this.query) !== JSON.stringify(this.original);
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
      ...this.original
    });
  }
  clear(e, t) {
    e ? this.query[e] = this.original[e] : this.query = j({
      ...this.original
    }), t && t();
  }
  getAppliedQuery() {
    const e = {};
    return this.applied.forEach((t) => {
      e[t.key] = t.rawValue;
    }), e;
  }
}
const me = "%[a-f0-9]{2}", re = new RegExp("(" + me + ")|([^%]+?)", "gi"), ie = new RegExp("(" + me + ")+", "gi");
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
function Ft(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(re) || [];
    for (let t = 1; t < e.length; t++)
      s = K(e, t).join(""), e = s.match(re) || [];
    return s;
  }
}
function jt(s) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = ie.exec(s);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const i = Ft(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = ie.exec(s);
  }
  e["%C2"] = "�";
  const r = Object.keys(e);
  for (const i of r)
    s = s.replace(new RegExp(i, "g"), e[i]);
  return s;
}
function kt(s) {
  if (typeof s != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof s + "`");
  try {
    return decodeURIComponent(s);
  } catch {
    return jt(s);
  }
}
function ge(s, e) {
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
function Et(s, e) {
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
const qt = (s) => s == null, Pt = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), H = Symbol("encodeFragmentIdentifier");
function Lt(s) {
  switch (s.arrayFormat) {
    case "index":
      return (e) => (t, r) => {
        const i = t.length;
        return r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
          ...t,
          [v(e, s), "[", i, "]"].join("")
        ] : [
          ...t,
          [v(e, s), "[", v(i, s), "]=", v(r, s)].join("")
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
      return (t) => (r, i) => i === void 0 || s.skipNull && i === null || s.skipEmptyString && i === "" ? r : (i = i === null ? "" : i, r.length === 0 ? [[v(t, s), e, v(i, s)].join("")] : [[r, v(i, s)].join(s.arrayFormatSeparator)]);
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
function Vt(s) {
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
        const n = typeof r == "string" && r.includes(s.arrayFormatSeparator), o = typeof r == "string" && !n && P(r, s).includes(s.arrayFormatSeparator);
        r = o ? P(r, s) : r;
        const a = n || o ? r.split(s.arrayFormatSeparator).map((l) => P(l, s)) : r === null ? r : P(r, s);
        i[t] = a;
      };
    case "bracket-separator":
      return (t, r, i) => {
        const n = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !n) {
          i[t] = r && P(r, s);
          return;
        }
        const o = r === null ? [] : r.split(s.arrayFormatSeparator).map((a) => P(a, s));
        if (i[t] === void 0) {
          i[t] = o;
          return;
        }
        i[t] = [...i[t], ...o];
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
function pe(s) {
  if (typeof s != "string" || s.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function v(s, e) {
  return e.encode ? e.strict ? Pt(s) : encodeURIComponent(s) : s;
}
function P(s, e) {
  return e.decode ? kt(s) : s;
}
function ye(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? ye(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function be(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function Tt(s) {
  let e = "";
  const t = s.indexOf("#");
  return t !== -1 && (e = s.slice(t)), e;
}
function ne(s, e) {
  return e.parseNumbers && !Number.isNaN(Number(s)) && typeof s == "string" && s.trim() !== "" ? s = Number(s) : e.parseBooleans && s !== null && (s.toLowerCase() === "true" || s.toLowerCase() === "false") && (s = s.toLowerCase() === "true"), s;
}
function Z(s) {
  s = be(s);
  const e = s.indexOf("?");
  return e === -1 ? "" : s.slice(e + 1);
}
function ee(s, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, pe(e.arrayFormatSeparator);
  const t = Vt(e), r = /* @__PURE__ */ Object.create(null);
  if (typeof s != "string" || (s = s.trim().replace(/^[?#&]/, ""), !s))
    return r;
  for (const i of s.split("&")) {
    if (i === "")
      continue;
    const n = e.decode ? i.replace(/\+/g, " ") : i;
    let [o, a] = ge(n, "=");
    o === void 0 && (o = n), a = a === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? a : P(a, e), t(P(o, e), a, r);
  }
  for (const [i, n] of Object.entries(r))
    if (typeof n == "object" && n !== null)
      for (const [o, a] of Object.entries(n))
        n[o] = ne(a, e);
    else
      r[i] = ne(n, e);
  return e.sort === !1 ? r : (e.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(e.sort)).reduce((i, n) => {
    const o = r[n];
    return i[n] = o && typeof o == "object" && !Array.isArray(o) ? ye(o) : o, i;
  }, /* @__PURE__ */ Object.create(null));
}
function _e(s, e) {
  if (!s)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, pe(e.arrayFormatSeparator);
  const t = (o) => e.skipNull && qt(s[o]) || e.skipEmptyString && s[o] === "", r = Lt(e), i = {};
  for (const [o, a] of Object.entries(s))
    t(o) || (i[o] = a);
  const n = Object.keys(i);
  return e.sort !== !1 && n.sort(e.sort), n.map((o) => {
    const a = s[o];
    return a === void 0 ? "" : a === null ? v(o, e) : Array.isArray(a) ? a.length === 0 && e.arrayFormat === "bracket-separator" ? v(o, e) + "[]" : a.reduce(r(o), []).join("&") : v(o, e) + "=" + v(a, e);
  }).filter((o) => o.length > 0).join("&");
}
function ve(s, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [t, r] = ge(s, "#");
  return t === void 0 && (t = s), {
    url: ((i = t == null ? void 0 : t.split("?")) == null ? void 0 : i[0]) ?? "",
    query: ee(Z(s), e),
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: P(r, e) } : {}
  };
}
function Se(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [H]: !0,
    ...e
  };
  const t = be(s.url).split("?")[0] || "", r = Z(s.url), i = {
    ...ee(r, { sort: !1 }),
    ...s.query
  };
  let n = _e(i, e);
  n && (n = `?${n}`);
  let o = Tt(s.url);
  if (s.fragmentIdentifier) {
    const a = new URL(t);
    a.hash = s.fragmentIdentifier, o = e[H] ? a.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${n}${o}`;
}
function we(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [H]: !1,
    ...t
  };
  const { url: r, query: i, fragmentIdentifier: n } = ve(s, t);
  return Se({
    url: r,
    query: Et(i, e),
    fragmentIdentifier: n
  }, t);
}
function Wt(s, e, t) {
  const r = Array.isArray(e) ? (i) => !e.includes(i) : (i, n) => !e(i, n);
  return we(s, r, t);
}
const oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Wt,
  extract: Z,
  parse: ee,
  parseUrl: ve,
  pick: we,
  stringify: _e,
  stringifyUrl: Se
}, Symbol.toStringTag, { value: "Module" }));
class N {
  constructor(e) {
    u(this, "loadUrl", "");
    u(this, "loadingState", b(null));
    u(this, "router", null);
    u(this, "attributes", j({
      masonry: null,
      pages: [],
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }));
    return this.filter = new se(e), new Proxy(this, {
      get(t, r, i) {
        if (Reflect.has(t, r))
          return Reflect.get(t, r, i);
        if (Reflect.has(t.filter.query, r)) {
          const n = r.split(".");
          if (n.length > 1) {
            let o = t.filter.query;
            for (let a = 0; a < n.length; a++)
              o = o[n[a]];
            return o ?? void 0;
          }
          return Reflect.get(t.filter.query, r);
        }
      },
      set(t, r, i, n) {
        if (Reflect.has(t, r))
          return Reflect.set(t, r, i, n);
        if (Reflect.has(t.filter.query, r)) {
          const o = r.split(".");
          if (o.length > 1) {
            let a = t.form;
            for (let l = 0; l < o.length - 1; l++)
              o[l] in a || (a[o[l]] = {}), a = a[o[l]];
            return a[o[o.length - 1]] === void 0 ? !1 : (a[o[o.length - 1]] = i, !0);
          }
          return Reflect.set(t.filter.query, r, i);
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
    return new N(e);
  }
  masonry(e = 5) {
    return this.attributes.masonry = e, this;
  }
  setFilter(e) {
    return this.filter = new se(e), this;
  }
  search(e = {}) {
    return typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), _.get(this.loadUrl, {
      params: e
    }).then((t) => (t.data.listing && Object.assign(this.attributes, t.data.listing), t.data.filters && (this.filter.applied = t.data.filters), this.router && this.router.replace({ query: this.filter.getAppliedQuery() }), this.attributes.masonry && this.attributes.pages.push({
      page: this.filter.query.page,
      items: JSON.parse(JSON.stringify(this.attributes.items)).map(
        (r, i) => (r.uid = `${this.filter.query.page}-${i}`, r)
      )
    }), t)).finally(() => {
      this.loaded();
    });
  }
  load(e = {}) {
    const t = oe.parse(window.location.search, {
      parseNumbers: !0,
      parseBooleans: !0
    });
    return Object.assign(this.filter.query, t), this.filter.query.page = 1, typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), _.get(this.loadUrl, {
      params: e
    }).then((r) => (r.data.listing && Object.assign(this.attributes, r.data.listing), r.data.filters && (this.filter.applied = r.data.filters), this.attributes.masonry && this.attributes.pages.push({
      page: this.filter.query.page,
      items: JSON.parse(JSON.stringify(this.attributes.items)).map(
        (i, n) => (i.uid = `${this.filter.query.page}-${n}`, i)
      )
    }), r)).finally(() => {
      this.loaded();
    });
  }
  refresh(e) {
    const t = oe.parse(window.location.search, {
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
    return Pe(
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
    return this.filter.reset(), this.filter.applied = [], this.search();
  }
}
const At = {
  name: "WyxosForm",
  props: {
    form: {
      type: E,
      required: !0
    },
    submit: {
      type: [Function, Promise],
      default: null
    },
    listing: {
      type: N,
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
function Rt(s, e, t, r, i, n) {
  const o = g("o-loading"), a = g("o-button");
  return t.form.isLoaded ? (d(), h("form", {
    key: 0,
    class: B(t.formClass),
    onSubmit: e[0] || (e[0] = de((l) => n.handle(), ["prevent"]))
  }, [
    p(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (d(), O(o, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (d(), O(a, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: m(() => e[2] || (e[2] = [
      $(" Error. Retry or refresh. ")
    ])),
    _: 1
  })) : y("", !0);
}
const It = /* @__PURE__ */ w(At, [["render", Rt]]), Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: It
}, Symbol.toStringTag, { value: "Module" })), Bt = {
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
    return (e, t) => (d(), h("i", {
      class: B([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bt
}, Symbol.toStringTag, { value: "Module" })), Ut = {
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
}, zt = ["width", "height"];
function Dt(s, e, t, r, i, n) {
  return d(), h("img", {
    ref: "image",
    src: "",
    alt: "",
    width: i.width,
    height: i.height
  }, null, 8, zt);
}
const Yt = /* @__PURE__ */ w(Ut, [["render", Dt]]), Jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" })), Kt = { class: "quick-edit" }, Ht = { class: "value" }, Qt = ["readonly", "type"], Xt = ["disabled"], Gt = ["disabled"], Zt = {
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
    const t = s, r = e, i = b(t.modelValue), n = b(!1), o = () => {
      n.value = !1, i.value = t.modelValue;
    }, a = () => t.update(i.value).then(() => {
      r("update:modelValue", i.value), n.value = !1;
    });
    return (l, c) => (d(), h("div", Kt, [
      n.value ? y("", !0) : p(l.$slots, "value", { key: 0 }, () => [
        f("span", Ht, S(s.modelValue), 1)
      ]),
      n.value ? p(l.$slots, "field", {
        key: 1,
        query: i.value
      }, () => [
        Le(f("input", {
          "onUpdate:modelValue": c[0] || (c[0] = (q) => i.value = q),
          readonly: s.processing,
          type: s.type
        }, null, 8, Qt), [
          [Ve, i.value]
        ])
      ]) : y("", !0),
      p(l.$slots, "actions", {
        enableEdit: n.value,
        onCancel: o,
        onUpdate: a
      }, () => [
        n.value ? y("", !0) : (d(), h("button", {
          key: 0,
          class: "edit",
          onClick: c[1] || (c[1] = (q) => n.value = !0)
        }, c[4] || (c[4] = [
          f("i", { class: "fas fa-pencil-alt" }, null, -1)
        ]))),
        n.value ? (d(), h("button", {
          key: 1,
          disabled: s.processing,
          class: "cancel",
          onClick: c[2] || (c[2] = (q) => o())
        }, c[5] || (c[5] = [
          f("i", { class: "fas fa-times" }, null, -1)
        ]), 8, Xt)) : y("", !0),
        n.value ? (d(), h("button", {
          key: 2,
          disabled: s.processing,
          class: "save",
          onClick: c[3] || (c[3] = (q) => a())
        }, [
          s.processing ? y("", !0) : (d(), h("i", Zt)),
          s.processing ? (d(), h("i", es)) : y("", !0)
        ], 8, Gt)) : y("", !0)
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
      type: E,
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
function is(s, e, t, r, i, n) {
  const o = g("o-input"), a = g("o-field");
  return d(), O(a, W({
    class: t.fieldClass,
    label: t.label
  }, n.getError), {
    default: m(() => [
      C(o, {
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
const ns = /* @__PURE__ */ w(rs, [["render", is]]), os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ns
}, Symbol.toStringTag, { value: "Module" })), as = {
  name: "WyxosListing",
  props: {
    listing: {
      type: N,
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
}, ls = { key: 0 };
function us(s, e, t, r, i, n) {
  const o = g("o-table");
  return d(), O(o, Y(J(n.allPropsAndEvents)), Te({
    empty: m(() => [
      p(s.$slots, "empty", {}, () => [
        t.listing.isEmpty ? (d(), h("p", ls, "No records found.")) : y("", !0)
      ])
    ]),
    _: 2
  }, [
    ce(s.$slots, (a, l) => ({
      name: l,
      fn: m((c) => [
        p(s.$slots, l, Y(J(c)))
      ])
    }))
  ]), 1040);
}
const ds = /* @__PURE__ */ w(as, [["render", us]]), cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ds
}, Symbol.toStringTag, { value: "Module" })), fs = {
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
      type: E,
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
function hs(s, e, t, r, i, n) {
  const o = g("o-input"), a = g("o-field");
  return d(), O(a, W({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
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
        "onUpdate:modelValue": e[0] || (e[0] = (l) => n.onInput(l))
      }, null, 8, ["readonly", "class", "root-class", "name", "type", "clearable", "disabled", "model-value", "placeholder"])
    ]),
    _: 1
  }, 16, ["label", "class"]);
}
const ms = /* @__PURE__ */ w(fs, [["render", hs]]), gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ms
}, Symbol.toStringTag, { value: "Module" })), ps = {
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
function ys(s, e, t, r, i, n) {
  return p(s.$slots, "default", { logout: n.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (o) => n.logout())
    }, "Sign out")
  ]);
}
const bs = /* @__PURE__ */ w(ps, [["render", ys]]), _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bs
}, Symbol.toStringTag, { value: "Module" })), vs = ue({
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
}), Ss = ["max", "value"], ws = { key: 0 };
function xs(s, e, t, r, i, n) {
  return d(), h(fe, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, Ss),
    s.showValue ? (d(), h("span", ws, S(s.modelValue) + " / " + S(s.max), 1)) : y("", !0)
  ], 64);
}
const Os = /* @__PURE__ */ w(vs, [["render", xs]]), Cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Os
}, Symbol.toStringTag, { value: "Module" })), $s = {
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
}, Fs = { class: "flex gap-6" };
function js(s, e, t, r, i, n) {
  const o = g("wyxos-button"), a = g("o-modal");
  return d(), O(a, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: m(() => [
      f("h2", null, S(t.title), 1),
      f("p", null, S(t.message), 1),
      f("div", Fs, [
        C(o, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: m(() => [
            $(S(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        C(o, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => n.proceed())
        }, {
          default: m(() => [
            $(S(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const xe = /* @__PURE__ */ w($s, [["render", js]]), ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" })), Es = {
  name: "WyxosRemove",
  props: {
    listing: {
      type: N,
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
      destroy: E.create()
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
}, qs = { class: "content p-6" }, Ps = { class: "buttons flex gap-6 justify-end" };
function Ls(s, e, t, r, i, n) {
  const o = g("o-button"), a = g("w-button"), l = g("o-modal");
  return d(), O(a, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (c) => n.onRemove())
  }, {
    default: m(() => [
      p(s.$slots, "button", {}, () => [
        e[4] || (e[4] = f("i", { class: "fas fa-trash" }, null, -1))
      ]),
      i.isVisible ? (d(), O(We, {
        key: 0,
        to: "body"
      }, [
        C(l, {
          active: i.isVisible,
          "onUpdate:active": e[2] || (e[2] = (c) => i.isVisible = c)
        }, {
          default: m(() => [
            f("div", qs, [
              p(s.$slots, "title", {}, () => [
                e[5] || (e[5] = f("h3", { class: "title" }, "Delete", -1))
              ]),
              p(s.$slots, "message", {}, () => [
                e[6] || (e[6] = f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1))
              ]),
              f("div", Ps, [
                C(o, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (c) => i.isVisible = !1)
                }, {
                  default: m(() => e[7] || (e[7] = [
                    $("Cancel ")
                  ])),
                  _: 1
                }),
                C(a, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (c) => n.remove())
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
const Vs = /* @__PURE__ */ w(Es, [["render", Ls]]), Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vs
}, Symbol.toStringTag, { value: "Module" })), Ws = {
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
      type: E,
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
}, As = ["value"];
function Rs(s, e, t, r, i, n) {
  var l;
  const o = g("o-select"), a = g("o-field");
  return d(), O(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: m(() => [
      C(o, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (c) => n.updateValue(c))
      }, {
        default: m(() => [
          p(s.$slots, "default", {}, () => [
            t.items ? (d(!0), h(fe, { key: 0 }, ce(t.items, (c) => (d(), h("option", {
              key: c.value,
              value: c.value
            }, S(c.label), 9, As))), 128)) : y("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Is = /* @__PURE__ */ w(Ws, [["render", Rs]]), Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Is
}, Symbol.toStringTag, { value: "Module" })), Bs = {
  name: "WyxosSessionExpired",
  emits: ["close"],
  setup() {
    return {
      login: E.create({
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
}, Ns = { class: "bg-white p-6" }, Us = { class: "buttons" };
function zs(s, e, t, r, i, n) {
  const o = g("wyxos-input"), a = g("w-button"), l = g("o-modal");
  return d(), O(l, { active: !0 }, {
    default: m(() => [
      f("div", Ns, [
        e[6] || (e[6] = f("h2", { class: "title" }, "Session Expired", -1)),
        e[7] || (e[7] = f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1)),
        f("form", {
          onSubmit: e[3] || (e[3] = de((...c) => n.proceed && n.proceed(...c), ["prevent"]))
        }, [
          C(o, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (c) => r.login.email = c),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          C(o, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (c) => r.login.password = c),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", Us, [
            C(a, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (c) => n.onLogout())
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
const Oe = /* @__PURE__ */ w(Bs, [["render", zs]]), Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" })), Ys = {
  name: "WyxosSubmit",
  props: {
    form: {
      type: E,
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
}, Js = { key: 0 }, Ks = { key: 1 }, Hs = { key: 2 }, Qs = { key: 3 };
function Xs(s, e, t, r, i, n) {
  const o = g("o-button");
  return d(), O(o, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: m(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (d(), h("span", Js, S(i.mergedLabels.submit), 1)) : y("", !0),
      t.form.isSubmitting ? (d(), h("span", Ks, [
        $(S(i.mergedLabels.submitting) + " ", 1),
        e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin" }, null, -1))
      ])) : y("", !0),
      t.form.isSubmitted ? (d(), h("span", Hs, S(i.mergedLabels.submitted), 1)) : y("", !0),
      t.form.isSubmitFailed ? (d(), h("span", Qs, S(i.mergedLabels.failed), 1)) : y("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Gs = /* @__PURE__ */ w(Ys, [["render", Xs]]), Zs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gs
}, Symbol.toStringTag, { value: "Module" })), er = {
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
      const x = window.location.hash.replace("#", ""), F = new URLSearchParams(x);
      return Object.fromEntries(F.entries());
    }, n = (x, F) => {
      const z = window.location.hash.replace("#", ""), L = new URLSearchParams(z);
      L.set(x, F), window.location.hash = L.toString();
    }, o = b(i()[t.hashKey] || t.active), a = b(!1), l = (x) => a.value ? !0 : x === o.value, c = () => {
      a.value = window.innerWidth <= t.responsiveResolution;
    }, q = (x) => {
      o.value = x, r("update:active", x), n(t.hashKey, x);
    };
    return le(() => {
      window.addEventListener("hashchange", () => {
        const x = i();
        x[t.hashKey] && (o.value = x[t.hashKey]);
      }), c(), window.addEventListener("resize", c);
    }), Ae(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", c);
    }), (x, F) => (d(), h("div", null, [
      p(x.$slots, "navigation", {
        isActive: l,
        setActive: q
      }, () => [
        F[0] || (F[0] = $(" Fill in navigation content here "))
      ]),
      p(x.$slots, "content", { isActive: l }, () => [
        F[1] || (F[1] = $(" Fill in content here"))
      ])
    ]));
  }
}, tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: er
}, Symbol.toStringTag, { value: "Module" }));
class te {
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
    return new te(e);
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
      const r = e || this.options.url, { data: i } = await _.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((n) => {
        throw this.state.failed(), n;
      });
      this.result.value = i.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: i } = await _.post(`${r}/restore`, t || this.options.payload).catch((n) => {
      throw this.state.failed(), n;
    });
    return this.state.loaded(), i;
  }
  reset() {
    this.result.value = [];
  }
}
const sr = {
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
      search: te.create()
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
function rr(s, e, t, r, i, n) {
  const o = g("o-taginput");
  return d(), O(o, W({
    ref: "tagInput",
    modelValue: i.query,
    "onUpdate:modelValue": e[0] || (e[0] = (a) => i.query = a),
    data: r.search.result.value,
    "open-on-focus": t.openOnFocus,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (a) => n.onTagAdded(a)),
    onFocus: e[2] || (e[2] = (a) => n.onTagSearch("")),
    onRemove: e[3] || (e[3] = (a) => n.onTagRemoved(a)),
    onTyping: e[4] || (e[4] = (a) => n.onTagSearch(a))
  }), null, 16, ["modelValue", "data", "open-on-focus"]);
}
const ir = /* @__PURE__ */ w(sr, [["render", rr]]), nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ir
}, Symbol.toStringTag, { value: "Module" })), or = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, ar = { class: "bg-white p-6" }, lr = { class: "buttons" };
function ur(s, e, t, r, i, n) {
  const o = g("w-button"), a = g("o-modal");
  return d(), O(a, { active: !0 }, {
    default: m(() => [
      f("div", ar, [
        e[2] || (e[2] = f("h2", { class: "title" }, "Session expired", -1)),
        e[3] || (e[3] = f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1)),
        f("div", lr, [
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
const Ce = /* @__PURE__ */ w(or, [["render", ur]]), dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ce
}, Symbol.toStringTag, { value: "Module" })), cr = {
  __name: "WyxosUpdateButton",
  props: {
    action: {
      type: he,
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
    return (r, i) => (d(), O(G, {
      loading: s.action.isProcessing(s.id),
      onClick: i[0] || (i[0] = (n) => s.action.patch({ id: s.id, ...s.payload }).then((o) => t("done", o)))
    }, {
      default: m(() => [
        p(r.$slots, "default", {}, () => [
          i[1] || (i[1] = f("i", { class: "fas fa-edit" }, null, -1))
        ])
      ]),
      _: 3
    }, 8, ["loading"]));
  }
}, fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cr
}, Symbol.toStringTag, { value: "Module" }));
class $e {
  constructor() {
    u(this, "url", null);
    this.data = b(null), this.isLoaded = b(!1), this.isLoading = b(!1), this.isError = b(!1), this.errorMessage = b(null);
  }
  static create() {
    return new $e();
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
class Fe {
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
    return new Fe(e);
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
    return await new Promise((i) => setTimeout(i, 500)), _.get(this.path, r).then((i) => (this.onCompleteCallback && (this.options.value = this.onCompleteCallback(i)), i)).finally(() => {
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
class hr {
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
    return e ? T(e).format(t) : r || this.empty;
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
    return T(this.value).fromNow();
  }
}
u(hr, "FORMATS", M);
class Or {
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
class je {
  constructor() {
    u(this, "state", b(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new je();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class Cr {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class $r {
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
  static create(e, t = {}, r = {}, i) {
    r = Object.assign(
      { base: "/api/admin", route: `${e}.index` },
      r
    );
    const n = r.base, o = {
      route: r.route,
      index: r.index || `${n}/${e}/index`,
      destroy: `${n}/${e}/destroy`
    }, a = new this();
    return a.options = r, a.structure = t, a.params = Object.assign(a.params, t), a.router = i, a.urls = o, a;
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
  async action(e, { row: t, index: r, remove: i, method: n }, o = {}) {
    t.isProcessing = !0;
    const a = {
      id: t.id,
      ...o
    };
    if (n === "delete") {
      const { data: l } = await _.delete(e, {
        data: a
      }).catch((c) => {
        throw t.isProcessing = !1, c;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await _.post(e, a).catch((c) => {
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
class Fr {
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
class ke {
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
    return new ke(e);
  }
}
class mr {
  constructor() {
    u(this, "attributes", j({
      user: null
    }));
    u(this, "state", new A());
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
    this.attributes = j({
      user: null
    }), this.state.reset();
  }
}
const jr = new mr();
async function kr(s = {}) {
  return (await X().modal.open({
    component: xe,
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
async function gr(s, e) {
  var n, o, a, l, c, q;
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
  const r = t[(n = s.response) == null ? void 0 : n.status] || t[500], i = X();
  if (i.notification.open({
    message: r,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((o = s.response) == null ? void 0 : o.status) === 419) {
    i.modal.open({
      component: ((a = e.components) == null ? void 0 : a.TokenExpired) || Ce,
      trapFocus: !0,
      closable: !1
    });
    const F = (await _.get("/heartbeat")).data.csrfToken;
    _.defaults.headers.common["X-CSRF-TOKEN"] = F;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && i.modal.open({
    component: ((c = e.components) == null ? void 0 : c.SessionExpired) || Oe,
    trapFocus: !0,
    closable: !1
  }), ((q = s.response) == null ? void 0 : q.status) === 422) {
    const x = setInterval(() => {
      const F = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), z = (V) => {
        const D = V.getBoundingClientRect(), R = window.getComputedStyle(V);
        return D.width > 0 && D.height > 0 && R.display !== "none" && R.visibility !== "hidden" && R.opacity !== "0";
      }, L = Array.from(F).find(z);
      if (L) {
        clearInterval(x);
        let V;
        if (L.classList.contains("o-field__message-danger") ? V = L.closest(".o-field") : L.classList.contains("wyxos-error") && (V = L.closest("label")), V) {
          const R = V.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: R, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
function Er(s) {
  X().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function pr(s) {
  _.interceptors.response.use(null, (e) => gr(e, s));
}
const ae = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": Be, "./components/WyxosAction.vue": ze, "./components/WyxosAsync.vue": He, "./components/WyxosButton.vue": st, "./components/WyxosCollection.vue": ot, "./components/WyxosConfirm.vue": mt, "./components/WyxosDatepicker.vue": bt, "./components/WyxosDeleteButton.vue": vt, "./components/WyxosError.vue": $t, "./components/WyxosForm.vue": Mt, "./components/WyxosIcon.vue": Nt, "./components/WyxosImage.vue": Jt, "./components/WyxosInlineEdit.vue": ss, "./components/WyxosInput.vue": os, "./components/WyxosListing.vue": cs, "./components/WyxosLiveInput.vue": gs, "./components/WyxosLogout.vue": _s, "./components/WyxosProgress.vue": Cs, "./components/WyxosPrompt.vue": ks, "./components/WyxosRemove.vue": Ts, "./components/WyxosSelect.vue": Ms, "./components/WyxosSessionExpired.vue": Ds, "./components/WyxosSubmit.vue": Zs, "./components/WyxosTab.vue": tr, "./components/WyxosTags.vue": nr, "./components/WyxosTokenExpired.vue": dr, "./components/WyxosUpdateButton.vue": fr }), Q = {}, yr = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(Re, e.oruga), Object.keys(ae).forEach((t) => {
    const r = ae[t];
    if (r && r.default) {
      const i = r.default, n = i.name;
      if (n)
        s.component(n, i), s.component(n.replace("Wyxos", "W"), i), Q[n] = i;
      else {
        const o = t.split("/").pop().split(".")[0];
        s.component(o, i), s.component(o.replace("Wyxos", "W"), i), Q[o] = i;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, pr(e);
}, br = {
  route(s, e, t) {
    return {
      name: s,
      params: e,
      query: t
    };
  }
}, qr = {
  install: yr,
  ...Q,
  vn: br
};
export {
  he as Action,
  $e as AsyncData,
  Fe as AutoComplete,
  hr as DateRender,
  Or as FileRequest,
  se as Filter,
  E as FormBuilder,
  N as Listing,
  A as LoadState,
  je as Modal,
  Cr as Option,
  $r as ResourceList,
  te as Search,
  Fr as Steps,
  ke as Tab,
  Me as WyxosAccordion,
  G as WyxosAction,
  Ke as WyxosAsync,
  tt as WyxosButton,
  nt as WyxosCollection,
  ht as WyxosConfirm,
  yt as WyxosDatepicker,
  _t as WyxosDeleteButton,
  Ct as WyxosError,
  It as WyxosForm,
  Bt as WyxosIcon,
  Yt as WyxosImage,
  ts as WyxosInlineEdit,
  ns as WyxosInput,
  ds as WyxosListing,
  ms as WyxosLiveInput,
  bs as WyxosLogout,
  Os as WyxosProgress,
  xe as WyxosPrompt,
  Vs as WyxosRemove,
  Is as WyxosSelect,
  Oe as WyxosSessionExpired,
  Gs as WyxosSubmit,
  er as WyxosTab,
  ir as WyxosTags,
  Ce as WyxosTokenExpired,
  cr as WyxosUpdateButton,
  jr as auth,
  kr as confirm,
  qr as default,
  gr as errorHandler,
  Er as success,
  U as useFormErrors,
  br as vn
};
//# sourceMappingURL=vision.js.map
