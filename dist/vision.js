var ne = Object.defineProperty;
var re = (s, e, t) => e in s ? ne(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => re(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as x, onMounted as H, openBlock as d, createElementBlock as m, renderSlot as _, createCommentVNode as g, normalizeClass as F, reactive as k, createElementVNode as f, normalizeProps as U, guardReactiveProps as Y, resolveComponent as h, createBlock as $, withCtx as p, toDisplayString as v, createVNode as w, createTextVNode as O, mergeProps as W, defineComponent as Q, withModifiers as X, withDirectives as ae, vModelDynamic as le, createSlots as ue, renderList as G, Fragment as Z, Teleport as de, onUnmounted as ce } from "vue";
import S from "axios";
import A from "moment";
import fe, { useOruga as N } from "@oruga-ui/oruga-next";
const me = { class: "wyxos-accordion" }, he = {
  __name: "WyxosAccordion",
  props: {
    active: {
      type: Boolean,
      required: !1
    }
  },
  setup(s) {
    const e = s, t = x(!1), i = () => {
      t.value = !t.value;
    };
    return H(() => {
      t.value = e.active;
    }), (o, n) => (d(), m("div", me, [
      _(o.$slots, "header", {
        isOpen: t.value,
        toggle: i
      }),
      t.value ? _(o.$slots, "body", { key: 0 }) : g("", !0)
    ]));
  }
}, ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: he
}, Symbol.toStringTag, { value: "Module" }));
class pe {
  constructor(e) {
    u(this, "type", "switch");
    u(this, "field", "");
    u(this, "url", "");
    u(this, "processing", x(null));
    u(this, "target", x(null));
    u(this, "beforeCallback", null);
    u(this, "afterCallback", null);
    u(this, "error", null);
    this.url = e;
  }
  static create(e) {
    return new this(e);
  }
  async patch(e, t) {
    var i, o;
    if (this.target.value = e, this.processing.value = e.id, this.beforeCallback && this.beforeCallback(e, t) === !1) {
      this.processing.value = null, this.target.value = null;
      return;
    }
    await new Promise((n) => setTimeout(n, 1e3));
    try {
      const n = typeof this.url == "function" ? this.url(e) : this.url;
      return this.processing.value = null, this.target.value = null, await S.patch(n, t).then((r) => (this.processing.value = null, this.target.value = null, this.afterCallback && this.afterCallback(r), r));
    } catch (n) {
      this.processing.value = null, this.target.value = null, this.error = ((o = (i = n.response) == null ? void 0 : i.data) == null ? void 0 : o.message) || n.message;
    }
  }
  async delete(e) {
    var t, i;
    if (this.target.value = e, this.processing.value = e.id, this.beforeCallback && this.beforeCallback(e) === !1) {
      this.processing.value = null, this.target.value = null;
      return;
    }
    await new Promise((o) => setTimeout(o, 1e3));
    try {
      const o = typeof this.url == "function" ? this.url(e) : this.url;
      return S.delete(o).then((n) => (this.processing.value = null, this.target.value = null, this.afterCallback && this.afterCallback(n), n));
    } catch (o) {
      return this.error = ((i = (t = o.response) == null ? void 0 : t.data) == null ? void 0 : i.message) || o.message, this.processing.value = null, this.target.value = null, o;
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
const ye = ["disabled"], be = {
  key: 0,
  class: "fas fa-spinner fa-spin"
}, _e = {
  key: 1,
  class: /* @__PURE__ */ F("fas fa-trash")
}, ve = {
  __name: "WyxosAction",
  props: {
    action: {
      type: pe,
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
      onClick: t[0] || (t[0] = (i) => s.action.delete(s.row))
    }, [
      s.action.isProcessing(s.row) ? (d(), m("i", be)) : (d(), m("i", _e))
    ], 8, ye));
  }
}, Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" })), j = k({
  default: []
});
function M() {
  return {
    createBag(s) {
      j[s] || (j[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      j[e] = Object.keys(s.response.data.errors).map((i) => ({
        key: i,
        message: s.response.data.errors[i][0]
      }));
    },
    has(s, e = "default") {
      return j[e].some((t) => t.key === s);
    },
    setOne(s, e, t = "default") {
      const i = j[t];
      if (!i) {
        j[t] = [
          {
            key: s,
            message: e
          }
        ];
        return;
      }
      const o = i.findIndex((n) => n.key === s);
      if (o !== -1) {
        i[o].message = e;
        return;
      }
      i.push({
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
      const i = t.find(
        (o) => Array.isArray(s) ? s.includes(o.key) : o.key === s
      );
      return i ? {
        message: i.message,
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
        const i = t.findIndex((o) => o.key === s);
        i !== -1 && t.splice(i, 1);
        return;
      }
      j[e] = [];
    },
    all(s = "default") {
      return j[s];
    }
  };
}
class q {
  constructor(e = {}) {
    u(this, "submitUrl", null);
    u(this, "loadUrl", null);
    u(this, "original", {});
    u(this, "form", k({}));
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
      get(t, i, o) {
        if (Reflect.has(t, i))
          return Reflect.get(t, i, o);
        if (Reflect.has(t.form, i)) {
          const n = i.split(".");
          if (n.length > 1) {
            let r = t.form;
            for (let a = 0; a < n.length; a++)
              r = r[n[a]];
            return r ?? void 0;
          }
          return Reflect.get(t.form, i);
        }
      },
      set(t, i, o, n) {
        if (Reflect.has(t, i))
          return Reflect.set(t, i, o, n);
        if (Reflect.has(t.form, i)) {
          const r = i.split(".");
          if (r.length > 1) {
            let a = t.form;
            for (let l = 0; l < r.length - 1; l++)
              r[l] in a || (a[r[l]] = {}), a = a[r[l]];
            return a[r[r.length - 1]] === void 0 ? !1 : (a[r[r.length - 1]] = o, !0);
          }
          return Reflect.set(t.form, i, o);
        }
        return !1;
      }
    });
  }
  get isDirty() {
    const e = (t) => Array.isArray(t) ? t.map(e) : t && typeof t == "object" ? Object.keys(t).sort().reduce((i, o) => (i[o] = e(t[o]), i), {}) : t;
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
    this.abortSubmitController && this.abortSubmitController.abort(), this.abortSubmitController = new AbortController(), e.signal = this.abortSubmitController.signal, await new Promise((i) => setTimeout(i, 1e3));
    const t = this.callbacks.formatter ? this.callbacks.formatter(this.form) : this.form;
    return S.post(this.submitUrl, t, e).then((i) => (this.submitted(), this.resetAfterSubmitFlag && this.setAttributes(this.original), this.callbacks.success ? this.callbacks.success(i.data) : i.data)).catch((i) => (this.submitFailed(), this.errors.set(i), Promise.reject(i)));
  }
  load() {
    this.loading();
    const e = {};
    return this.abortLoadController && this.abortLoadController.abort(), this.abortLoadController = new AbortController(), e.signal = this.abortLoadController.signal, S.get(this.loadUrl, e).then((t) => (this.loaded(), t.data.form && this.setAttributes(t.data.form), t.data)).catch((t) => (this.loadFailed(), Promise.reject(t)));
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
const y = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [i, o] of e)
    t[i] = o;
  return t;
}, we = {
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
}, xe = ["disabled", "type"], $e = { key: 0 }, Oe = { key: 1 };
function Ce(s, e, t, i, o, n) {
  return d(), m("button", {
    disabled: t.form.isSubmitting,
    type: t.button
  }, [
    _(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? g("", !0) : (d(), m("span", $e, "Submit")),
      t.form.isSubmitting ? (d(), m("span", Oe, "Processing")) : g("", !0)
    ]),
    t.form.isSubmitting ? _(s.$slots, "icon", { key: 0 }, () => [
      e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin ml-4" }, null, -1))
    ]) : g("", !0)
  ], 8, xe);
}
const ke = /* @__PURE__ */ y(we, [["render", Ce]]), je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" })), qe = {
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
function Pe(s, e, t, i, o, n) {
  return _(s.$slots, "default", U(Y({ add: n.add, remove: n.remove, items: o.items })), () => [
    e[0] || (e[0] = f("ul", null, [
      f("li")
    ], -1))
  ]);
}
const Ve = /* @__PURE__ */ y(qe, [["render", Pe]]), Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ve
}, Symbol.toStringTag, { value: "Module" }));
class L {
  constructor() {
    u(this, "state", k({
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
const We = {
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
}, Fe = { class: "bg-white p-6" }, Le = { class: "title" }, Ee = { class: "mb-6" }, Ae = {
  class: "buttons",
  role: "group"
};
function Re(s, e, t, i, o, n) {
  const r = h("wyxos-button"), a = h("o-modal");
  return d(), $(a, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("section", Fe, [
        f("article", null, [
          f("header", null, [
            f("h3", Le, v(t.title), 1)
          ]),
          f("p", Ee, v(t.message), 1),
          f("footer", Ae, [
            w(r, {
              disabled: i.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: p(() => [
                O(v(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            w(r, {
              class: F([{ [t.confirmType]: !0 }, "button"]),
              loading: i.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => n.proceed())
            }, {
              default: p(() => [
                O(v(t.confirmText), 1)
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
const Me = /* @__PURE__ */ y(We, [["render", Re]]), Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), ze = {
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
function Be(s, e, t, i, o, n) {
  var l;
  const r = h("o-datepicker"), a = h("o-field");
  return d(), $(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      w(r, W({
        modelValue: o.query,
        "onUpdate:modelValue": e[0] || (e[0] = (c) => o.query = c),
        "date-formatter": n.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": n.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const Ue = /* @__PURE__ */ y(ze, [["render", Be]]), Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ue
}, Symbol.toStringTag, { value: "Module" })), De = Q({
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
      errors: M()
    };
  }
}), Ne = {
  key: 0,
  class: "wyxos-error"
}, Ke = {
  key: 1,
  class: "wyxos-error"
};
function Je(s, e, t, i, o, n) {
  var r, a;
  return (r = s.form) != null && r.getError(s.name).message ? (d(), m("span", Ne, v(s.form.getError(s.name).message), 1)) : (a = s.errors.get(s.name)) != null && a.message ? (d(), m("span", Ke, v(s.errors.get(s.name).message), 1)) : g("", !0);
}
const He = /* @__PURE__ */ y(De, [["render", Je]]), Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" }));
class Xe {
  constructor(e) {
    u(this, "labels", {});
    u(this, "applied", {});
    this.original = e, this.query = k({
      page: 1,
      perPage: 10,
      ...e
    });
  }
  displayAs(e) {
    return this.labels = e, this;
  }
  apply() {
    this.applied = Object.assign({}, this.query);
  }
  render() {
  }
  reset() {
    this.query = k({
      page: 1,
      perPage: 10,
      ...this.original
    });
  }
}
class R {
  constructor(e) {
    u(this, "loadUrl", "");
    u(this, "loadingState", x(null));
    u(this, "attributes", k({
      listing: {
        items: [],
        showing: 0,
        perPage: 0,
        total: 0
      }
    }));
    return this.filter = new Xe(e), new Proxy(this, {
      get(t, i, o) {
        if (Reflect.has(t, i))
          return Reflect.get(t, i, o);
        if (Reflect.has(t.filter.query, i)) {
          const n = i.split(".");
          if (n.length > 1) {
            let r = t.filter.query;
            for (let a = 0; a < n.length; a++)
              r = r[n[a]];
            return r ?? void 0;
          }
          return Reflect.get(t.filter.query, i);
        }
      },
      set(t, i, o, n) {
        if (Reflect.has(t, i))
          return Reflect.set(t, i, o, n);
        if (Reflect.has(t.filter.query, i)) {
          const r = i.split(".");
          if (r.length > 1) {
            let a = t.form;
            for (let l = 0; l < r.length - 1; l++)
              r[l] in a || (a[r[l]] = {}), a = a[r[l]];
            return a[r[r.length - 1]] === void 0 ? !1 : (a[r[r.length - 1]] = o, !0);
          }
          return Reflect.set(t.filter.query, i, o);
        }
        return !1;
      }
    });
  }
  get config() {
    return {
      data: this.attributes.listing.items,
      total: this.attributes.listing.total,
      currentPage: this.filter.query.page,
      perPage: this.filter.query.perPage,
      loading: this.isLoading,
      paginated: this.attributes.listing.total > this.attributes.listing.perPage,
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
    return new R(e);
  }
  search(e = {}) {
    return typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), S.get(this.loadUrl, {
      params: e
    }).then((t) => (Object.assign(this.attributes, t.data), this.filter.apply(), t)).finally(() => {
      this.loadingState.value = "loaded";
    });
  }
  load(e = {}) {
    return this.filter.query.page = 1, typeof e == "function" ? e = Object.assign({}, this.filter.query, e(this.filter.query)) : e = Object.assign({}, this.filter.query, e), this.loading(), S.get(this.loadUrl, {
      params: e
    }).then((t) => (Object.assign(this.attributes, t.data), t)).finally(() => {
      this.loadingState.value = "loaded";
    });
  }
  loading() {
    this.loadingState.value = "loading";
  }
  onPageChange(e) {
    return this.filter.query.page = e, this.search();
  }
  loadFrom(e) {
    return this.loadUrl = e, this;
  }
}
const Ge = {
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
function Ze(s, e, t, i, o, n) {
  const r = h("o-loading"), a = h("o-button");
  return t.form.isLoaded ? (d(), m("form", {
    key: 0,
    class: F(t.formClass),
    onSubmit: e[0] || (e[0] = X((l) => n.handle(), ["prevent"]))
  }, [
    _(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (d(), $(r, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (d(), $(a, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: p(() => e[2] || (e[2] = [
      O(" Error. Retry or refresh. ")
    ])),
    _: 1
  })) : g("", !0);
}
const et = /* @__PURE__ */ y(Ge, [["render", Ze]]), tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), st = {
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
      class: F([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: st
}, Symbol.toStringTag, { value: "Module" })), ot = {
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
}, nt = ["width", "height"];
function rt(s, e, t, i, o, n) {
  return d(), m("img", {
    ref: "image",
    src: "",
    alt: "",
    width: o.width,
    height: o.height
  }, null, 8, nt);
}
const at = /* @__PURE__ */ y(ot, [["render", rt]]), lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: at
}, Symbol.toStringTag, { value: "Module" })), ut = { class: "quick-edit" }, dt = { class: "value" }, ct = ["type", "readonly"], ft = ["disabled"], mt = ["disabled"], ht = {
  key: 0,
  class: "fas fa-check"
}, gt = {
  key: 1,
  class: "fas fa-spinner fa-spin"
}, pt = {
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
    const t = s, i = e, o = x(t.modelValue), n = x(!1), r = () => {
      n.value = !1, o.value = t.modelValue;
    }, a = () => t.update(o.value).then(() => {
      i("update:modelValue", o.value), n.value = !1;
    });
    return (l, c) => (d(), m("div", ut, [
      n.value ? g("", !0) : _(l.$slots, "value", { key: 0 }, () => [
        f("span", dt, v(s.modelValue), 1)
      ]),
      n.value ? _(l.$slots, "field", {
        key: 1,
        query: o.value
      }, () => [
        n.value ? ae((d(), m("input", {
          key: 0,
          "onUpdate:modelValue": c[0] || (c[0] = (P) => o.value = P),
          type: typeof s.modelValue == "number" ? "number" : "text",
          readonly: s.processing
        }, null, 8, ct)), [
          [le, o.value]
        ]) : g("", !0)
      ]) : g("", !0),
      _(l.$slots, "actions", {
        enableEdit: n.value,
        onCancel: r,
        onUpdate: a
      }, () => [
        n.value ? g("", !0) : (d(), m("button", {
          key: 0,
          class: "edit",
          onClick: c[1] || (c[1] = (P) => n.value = !0)
        }, c[4] || (c[4] = [
          f("i", { class: "fas fa-pencil-alt" }, null, -1)
        ]))),
        n.value ? (d(), m("button", {
          key: 1,
          class: "cancel",
          disabled: s.processing,
          onClick: c[2] || (c[2] = (P) => r())
        }, c[5] || (c[5] = [
          f("i", { class: "fas fa-times" }, null, -1)
        ]), 8, ft)) : g("", !0),
        n.value ? (d(), m("button", {
          key: 2,
          class: "save",
          disabled: s.processing,
          onClick: c[3] || (c[3] = (P) => a())
        }, [
          s.processing ? g("", !0) : (d(), m("i", ht)),
          s.processing ? (d(), m("i", gt)) : g("", !0)
        ], 8, mt)) : g("", !0)
      ])
    ]));
  }
}, yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
function _t(s, e, t, i, o, n) {
  const r = h("o-input"), a = h("o-field");
  return d(), $(a, W({
    class: t.fieldClass,
    label: t.label
  }, n.getError), {
    default: p(() => [
      w(r, {
        class: F(t.inputClass),
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
const vt = /* @__PURE__ */ y(bt, [["render", _t]]), St = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vt
}, Symbol.toStringTag, { value: "Module" })), wt = {
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
}, xt = { key: 0 }, $t = { key: 1 }, Ot = { key: 2 };
function Ct(s, e, t, i, o, n) {
  const r = h("o-table");
  return d(), $(r, U(Y(n.allPropsAndEvents)), ue({
    empty: p(() => [
      t.listing.isEmpty ? (d(), m("p", xt, "No records found.")) : g("", !0),
      t.listing.isSearchEmpty ? (d(), m("p", $t, " No results for your query. Please adjust your search and try again. ")) : g("", !0),
      t.listing.isFailure ? (d(), m("p", Ot, " Failure to load the list. Try again or reload the page. ")) : g("", !0)
    ]),
    _: 2
  }, [
    G(s.$slots, (a, l) => ({
      name: l,
      fn: p((c) => [
        _(s.$slots, l, U(Y(c)))
      ])
    }))
  ]), 1040);
}
const kt = /* @__PURE__ */ y(wt, [["render", Ct]]), jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kt
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
function Pt(s, e, t, i, o, n) {
  const r = h("o-input"), a = h("o-field");
  return d(), $(a, W({
    label: t.label,
    class: t.fieldClass
  }, { ...n.getError() }), {
    default: p(() => [
      w(r, {
        readonly: t.readonly,
        class: F(t.inputClass),
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
const Vt = /* @__PURE__ */ y(qt, [["render", Pt]]), Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vt
}, Symbol.toStringTag, { value: "Module" })), Wt = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await S.post(this.path).catch((e) => {
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function Ft(s, e, t, i, o, n) {
  return _(s.$slots, "default", { logout: n.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (r) => n.logout())
    }, "Sign out")
  ]);
}
const Lt = /* @__PURE__ */ y(Wt, [["render", Ft]]), Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lt
}, Symbol.toStringTag, { value: "Module" })), At = Q({
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
}), Rt = ["max", "value"], Mt = { key: 0 };
function It(s, e, t, i, o, n) {
  return d(), m(Z, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, Rt),
    s.showValue ? (d(), m("span", Mt, v(s.modelValue) + " / " + v(s.max), 1)) : g("", !0)
  ], 64);
}
const zt = /* @__PURE__ */ y(At, [["render", It]]), Bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zt
}, Symbol.toStringTag, { value: "Module" })), Ut = {
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
}, Yt = { class: "flex gap-6" };
function Dt(s, e, t, i, o, n) {
  const r = h("wyxos-button"), a = h("o-modal");
  return d(), $(a, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: p(() => [
      f("h2", null, v(t.title), 1),
      f("p", null, v(t.message), 1),
      f("div", Yt, [
        w(r, {
          disabled: i.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: p(() => [
            O(v(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        w(r, {
          loading: i.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => n.proceed())
        }, {
          default: p(() => [
            O(v(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const ee = /* @__PURE__ */ y(Ut, [["render", Dt]]), Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ee
}, Symbol.toStringTag, { value: "Module" })), Kt = {
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
}, Jt = { class: "content p-6" }, Ht = { class: "buttons flex gap-6 justify-end" };
function Qt(s, e, t, i, o, n) {
  const r = h("o-button"), a = h("w-button"), l = h("o-modal");
  return d(), $(a, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (c) => n.onRemove())
  }, {
    default: p(() => [
      _(s.$slots, "button", {}, () => [
        e[4] || (e[4] = f("i", { class: "fas fa-trash" }, null, -1))
      ]),
      o.isVisible ? (d(), $(de, {
        key: 0,
        to: "body"
      }, [
        w(l, {
          active: o.isVisible,
          "onUpdate:active": e[2] || (e[2] = (c) => o.isVisible = c)
        }, {
          default: p(() => [
            f("div", Jt, [
              _(s.$slots, "title", {}, () => [
                e[5] || (e[5] = f("h3", { class: "title" }, "Delete", -1))
              ]),
              _(s.$slots, "message", {}, () => [
                e[6] || (e[6] = f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1))
              ]),
              f("div", Ht, [
                w(r, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (c) => o.isVisible = !1)
                }, {
                  default: p(() => e[7] || (e[7] = [
                    O("Cancel ")
                  ])),
                  _: 1
                }),
                w(a, {
                  loading: i.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (c) => n.remove())
                }, {
                  default: p(() => [
                    _(s.$slots, "confirm", {}, () => [
                      e[8] || (e[8] = O("Confirm"))
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
const Xt = /* @__PURE__ */ y(Kt, [["render", Qt]]), Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, es = ["value"];
function ts(s, e, t, i, o, n) {
  var l;
  const r = h("o-select"), a = h("o-field");
  return d(), $(a, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: p(() => [
      w(r, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (c) => n.updateValue(c))
      }, {
        default: p(() => [
          _(s.$slots, "default", {}, () => [
            t.items ? (d(!0), m(Z, { key: 0 }, G(t.items, (c) => (d(), m("option", {
              key: c.value,
              value: c.value
            }, v(c.label), 9, es))), 128)) : g("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const ss = /* @__PURE__ */ y(Zt, [["render", ts]]), is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ss
}, Symbol.toStringTag, { value: "Module" })), os = {
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
}, ns = { class: "bg-white p-6" }, rs = { class: "buttons" };
function as(s, e, t, i, o, n) {
  const r = h("wyxos-input"), a = h("w-button"), l = h("o-modal");
  return d(), $(l, { active: !0 }, {
    default: p(() => [
      f("div", ns, [
        e[6] || (e[6] = f("h2", { class: "title" }, "Session Expired", -1)),
        e[7] || (e[7] = f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1)),
        f("form", {
          onSubmit: e[3] || (e[3] = X((...c) => n.proceed && n.proceed(...c), ["prevent"]))
        }, [
          w(r, {
            modelValue: i.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (c) => i.login.email = c),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          w(r, {
            modelValue: i.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (c) => i.login.password = c),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", rs, [
            w(a, {
              class: "button is-danger",
              disabled: i.login.isSubmitting,
              onClick: e[2] || (e[2] = (c) => n.onLogout())
            }, {
              default: p(() => e[4] || (e[4] = [
                O(" Logout ")
              ])),
              _: 1
            }, 8, ["disabled"]),
            w(a, {
              class: "button is-primary",
              "native-type": "submit",
              loading: i.login.isSubmitting
            }, {
              default: p(() => e[5] || (e[5] = [
                O(" Login ")
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
const te = /* @__PURE__ */ y(os, [["render", as]]), ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: te
}, Symbol.toStringTag, { value: "Module" })), us = {
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
}, ds = { key: 0 }, cs = { key: 1 }, fs = { key: 2 }, ms = { key: 3 };
function hs(s, e, t, i, o, n) {
  const r = h("o-button");
  return d(), $(r, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: p(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (d(), m("span", ds, v(o.mergedLabels.submit), 1)) : g("", !0),
      t.form.isSubmitting ? (d(), m("span", cs, [
        O(v(o.mergedLabels.submitting) + " ", 1),
        e[0] || (e[0] = f("i", { class: "fas fa-spinner fa-spin" }, null, -1))
      ])) : g("", !0),
      t.form.isSubmitted ? (d(), m("span", fs, v(o.mergedLabels.submitted), 1)) : g("", !0),
      t.form.isSubmitFailed ? (d(), m("span", ms, v(o.mergedLabels.failed), 1)) : g("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const gs = /* @__PURE__ */ y(us, [["render", hs]]), ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gs
}, Symbol.toStringTag, { value: "Module" })), ys = {
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
    const t = s, i = e, o = () => {
      const b = window.location.hash.replace("#", ""), C = new URLSearchParams(b);
      return Object.fromEntries(C.entries());
    }, n = (b, C) => {
      const I = window.location.hash.replace("#", ""), V = new URLSearchParams(I);
      V.set(b, C), window.location.hash = V.toString();
    }, r = x(o()[t.hashKey] || t.active), a = x(!1), l = (b) => a.value ? !0 : b === r.value, c = () => {
      a.value = window.innerWidth <= t.responsiveResolution;
    }, P = (b) => {
      r.value = b, i("update:active", b), n(t.hashKey, b);
    };
    return H(() => {
      window.addEventListener("hashchange", () => {
        const b = o();
        b[t.hashKey] && (r.value = b[t.hashKey]);
      }), c(), window.addEventListener("resize", c);
    }), ce(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", c);
    }), (b, C) => (d(), m("div", null, [
      _(b.$slots, "navigation", {
        isActive: l,
        setActive: P
      }, () => [
        C[0] || (C[0] = O(" Fill in navigation content here "))
      ]),
      _(b.$slots, "content", { isActive: l }, () => [
        C[1] || (C[1] = O(" Fill in content here"))
      ])
    ]));
  }
}, bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ys
}, Symbol.toStringTag, { value: "Module" }));
class K {
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
    return new K(e);
  }
  getEvents({ searchPayloadFormatter: e = null } = {}) {
    return {
      "update:model-value": (t) => (this.value.value = t, this.search(e))
    };
  }
  search(e) {
    const t = { value: this.value.value }, i = e ? e(t) : t;
    return this.customSearch({ payload: i });
  }
  async customSearch({ url: e, payload: t }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)), this.controller = new AbortController(), this.timeout = setTimeout(async () => {
      this.state.loading(), this.reset();
      const i = e || this.options.url, { data: o } = await S.post(`${i}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((n) => {
        throw this.state.failed(), n;
      });
      this.result.value = o.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const i = e || this.options.url, { data: o } = await S.post(`${i}/restore`, t || this.options.payload).catch((n) => {
      throw this.state.failed(), n;
    });
    return this.state.loaded(), o;
  }
  reset() {
    this.result.value = [];
  }
}
const _s = {
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
      search: K.create()
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
function vs(s, e, t, i, o, n) {
  const r = h("o-taginput");
  return d(), $(r, W({
    ref: "tagInput",
    modelValue: o.query,
    "onUpdate:modelValue": e[0] || (e[0] = (a) => o.query = a),
    data: i.search.result.value,
    "open-on-focus": t.openOnFocus,
    "allow-autocomplete": ""
  }, s.$attrs, {
    onAdd: e[1] || (e[1] = (a) => n.onTagAdded(a)),
    onFocus: e[2] || (e[2] = (a) => n.onTagSearch("")),
    onRemove: e[3] || (e[3] = (a) => n.onTagRemoved(a)),
    onTyping: e[4] || (e[4] = (a) => n.onTagSearch(a))
  }), null, 16, ["modelValue", "data", "open-on-focus"]);
}
const Ss = /* @__PURE__ */ y(_s, [["render", vs]]), ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ss
}, Symbol.toStringTag, { value: "Module" })), xs = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, $s = { class: "bg-white p-6" }, Os = { class: "buttons" };
function Cs(s, e, t, i, o, n) {
  const r = h("w-button"), a = h("o-modal");
  return d(), $(a, { active: !0 }, {
    default: p(() => [
      f("div", $s, [
        e[2] || (e[2] = f("h2", { class: "title" }, "Session expired", -1)),
        e[3] || (e[3] = f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1)),
        f("div", Os, [
          w(r, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: p(() => e[1] || (e[1] = [
              O(" Confirm ")
            ])),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const se = /* @__PURE__ */ y(xs, [["render", Cs]]), ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: se
}, Symbol.toStringTag, { value: "Module" })), B = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class js {
  constructor(e, t) {
    u(this, "date", null);
    u(this, "empty", "");
    this.date = e, this.empty = t;
  }
  static load(e, t = "") {
    return new this(e, t);
  }
  format(e, t = B.UK, i = "") {
    return e ? A(e).format(t) : i || this.empty;
  }
  render(e = B.UK, t = "") {
    return this.format(this.date, e, t);
  }
}
u(js, "FORMATS", B);
class Rs {
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
class ie {
  constructor() {
    u(this, "state", x(!1));
  }
  get isVisible() {
    return this.state;
  }
  static create() {
    return new ie();
  }
  show() {
    this.state = !0;
  }
  hide() {
    this.state = !1;
  }
}
class Ms {
  static create(e, t = null, i = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class Is {
  constructor() {
    u(this, "structure", {});
    u(this, "query", k({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    u(this, "params", k({
      page: 1
    }));
    u(this, "router", null);
  }
  static create(e, t = {}, i = {}, o) {
    i = Object.assign(
      { base: "/api/admin", route: `${e}.index` },
      i
    );
    const n = i.base, r = {
      route: i.route,
      index: i.index || `${n}/${e}/index`,
      destroy: `${n}/${e}/destroy`
    }, a = new this();
    return a.options = i, a.structure = t, a.params = Object.assign(a.params, t), a.router = o, a.urls = r, a;
  }
  async fetch(e) {
    this.query.isLoading = !0, this.query.isLoaded = !1;
    const { data: t } = await S.get(e || this.urls.index, {
      params: this.params
    }).catch((i) => {
      throw this.query.isLoading = !1, i;
    });
    return await this.router.push({ name: this.urls.route, query: this.params }), this.query.isLoading = !1, this.query.isLoaded = !0, t;
  }
  async load(e) {
    const t = await this.fetch(e);
    return Object.assign(this.query, t.query, {
      items: t.query.items.map((i) => ({
        ...i,
        isProcessing: !1
      }))
    }), t;
  }
  onPageChange(e) {
    return this.params.page = e, this.load();
  }
  async action(e, { row: t, index: i, remove: o, method: n }, r = {}) {
    t.isProcessing = !0;
    const a = {
      id: t.id,
      ...r
    };
    if (n === "delete") {
      const { data: l } = await S.delete(e, {
        data: a
      }).catch((c) => {
        throw t.isProcessing = !1, c;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await S.post(e, a).catch((c) => {
        throw t.isProcessing = !1, c;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    }
    if (o) {
      const l = await this.fetch();
      if (this.query.items.splice(i, 1), !l.query.items.length) {
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
class zs {
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
    const e = this.flow.findIndex((i) => i === this.getCurrent()), t = this.flow[e + 1];
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
class oe {
  constructor(e) {
    u(this, "attributes", k({
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
    return new oe(e);
  }
}
class qs {
  constructor() {
    u(this, "attributes", k({
      user: null
    }));
    u(this, "state", new L());
    return new Proxy(this, {
      get(e, t, i) {
        return Reflect.has(e, t) ? Reflect.get(e, t, i) : t in e.attributes ? e.attributes[t] : null;
      },
      set(e, t, i, o) {
        return !Reflect.has(e, t) && !(t in e.attributes) ? (Reflect.set(e, t, i, o), !0) : t in e.attributes ? (e.attributes[t] = i, !0) : Reflect.set(e, t, i, o);
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
    this.loading(), await S.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await S.get("/api/user");
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
    this.attributes = k({
      user: null
    }), this.state.reset();
  }
}
const Bs = new qs();
async function Us(s = {}) {
  return (await N().modal.open({
    component: ee,
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
async function Ps(s, e) {
  var n, r, a, l, c, P;
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
  const i = t[(n = s.response) == null ? void 0 : n.status] || t[500], o = N();
  if (o.notification.open({
    message: i,
    duration: 1e3 * 5,
    variant: "danger",
    position: "bottom-right",
    closable: !0
  }), ((r = s.response) == null ? void 0 : r.status) === 419) {
    o.modal.open({
      component: ((a = e.components) == null ? void 0 : a.TokenExpired) || se,
      trapFocus: !0,
      closable: !1
    });
    const C = (await S.get("/heartbeat")).data.csrfToken;
    S.defaults.headers.common["X-CSRF-TOKEN"] = C;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && o.modal.open({
    component: ((c = e.components) == null ? void 0 : c.SessionExpired) || te,
    trapFocus: !0,
    closable: !1
  }), ((P = s.response) == null ? void 0 : P.status) === 422) {
    const b = setInterval(() => {
      const C = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), I = (T) => {
        const z = T.getBoundingClientRect(), E = window.getComputedStyle(T);
        return z.width > 0 && z.height > 0 && E.display !== "none" && E.visibility !== "hidden" && E.opacity !== "0";
      }, V = Array.from(C).find(I);
      if (V) {
        clearInterval(b);
        let T;
        if (V.classList.contains("o-field__message-danger") ? T = V.closest(".o-field") : V.classList.contains("wyxos-error") && (T = V.closest("label")), T) {
          const E = T.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: E, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
function Ys(s) {
  N().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
function Vs(s) {
  S.interceptors.response.use(null, (e) => Ps(e, s));
}
const J = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": ge, "./components/WyxosAction.vue": Se, "./components/WyxosButton.vue": je, "./components/WyxosCollection.vue": Te, "./components/WyxosConfirm.vue": Ie, "./components/WyxosDatepicker.vue": Ye, "./components/WyxosError.vue": Qe, "./components/WyxosForm.vue": tt, "./components/WyxosIcon.vue": it, "./components/WyxosImage.vue": lt, "./components/WyxosInlineEdit.vue": yt, "./components/WyxosInput.vue": St, "./components/WyxosListing.vue": jt, "./components/WyxosLiveInput.vue": Tt, "./components/WyxosLogout.vue": Et, "./components/WyxosProgress.vue": Bt, "./components/WyxosPrompt.vue": Nt, "./components/WyxosRemove.vue": Gt, "./components/WyxosSelect.vue": is, "./components/WyxosSessionExpired.vue": ls, "./components/WyxosSubmit.vue": ps, "./components/WyxosTab.vue": bs, "./components/WyxosTags.vue": ws, "./components/WyxosTokenExpired.vue": ks }), D = {}, Ts = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(fe, e.oruga), Object.keys(J).forEach((t) => {
    const i = J[t];
    if (i && i.default) {
      const o = i.default, n = o.name;
      if (n)
        s.component(n, o), s.component(n.replace("Wyxos", "W"), o), D[n] = o;
      else {
        const r = t.split("/").pop().split(".")[0];
        s.component(r, o), s.component(r.replace("Wyxos", "W"), o), D[r] = o;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, i) => ({
      name: t,
      params: i
    })
  }, Vs(e);
}, Ds = {
  install: Ts,
  ...D
};
export {
  pe as Action,
  js as DateRender,
  Rs as FileRequest,
  q as FormBuilder,
  R as Listing,
  L as LoadState,
  ie as Modal,
  Ms as Option,
  Is as ResourceList,
  K as Search,
  zs as Steps,
  oe as Tab,
  he as WyxosAccordion,
  ve as WyxosAction,
  ke as WyxosButton,
  Ve as WyxosCollection,
  Me as WyxosConfirm,
  Ue as WyxosDatepicker,
  He as WyxosError,
  et as WyxosForm,
  st as WyxosIcon,
  at as WyxosImage,
  pt as WyxosInlineEdit,
  vt as WyxosInput,
  kt as WyxosListing,
  Vt as WyxosLiveInput,
  Lt as WyxosLogout,
  zt as WyxosProgress,
  ee as WyxosPrompt,
  Xt as WyxosRemove,
  ss as WyxosSelect,
  te as WyxosSessionExpired,
  gs as WyxosSubmit,
  ys as WyxosTab,
  Ss as WyxosTags,
  se as WyxosTokenExpired,
  Bs as auth,
  Us as confirm,
  Ds as default,
  Ps as errorHandler,
  Ys as success,
  M as useFormErrors
};
//# sourceMappingURL=vision.js.map
