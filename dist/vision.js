var Oe = Object.defineProperty;
var $e = (s, e, t) => e in s ? Oe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => $e(s, typeof e != "symbol" ? e + "" : e, t);
import { ref as $, onMounted as ie, openBlock as c, createElementBlock as h, renderSlot as v, createCommentVNode as p, normalizeClass as R, reactive as q, createElementVNode as f, normalizeProps as D, guardReactiveProps as Y, resolveComponent as g, createBlock as O, withCtx as y, toDisplayString as w, createVNode as x, createTextVNode as F, mergeProps as W, defineComponent as ae, nextTick as Fe, withModifiers as oe, withDirectives as Ce, vModelDynamic as qe, createSlots as je, renderList as le, Fragment as ue, Teleport as ke, onUnmounted as Te } from "vue";
import m from "axios";
import I from "moment";
import Ee, { useOruga as Q } from "@oruga-ui/oruga-next";
const Pe = { class: "wyxos-accordion" }, Ve = {
  __name: "WyxosAccordion",
  props: {
    active: {
      type: Boolean,
      required: !1
    }
  },
  setup(s) {
    const e = s, t = $(!1), r = () => {
      t.value = !t.value;
    };
    return ie(() => {
      t.value = e.active;
    }), (n, i) => (c(), h("div", Pe, [
      v(n.$slots, "header", {
        isOpen: t.value,
        toggle: r
      }),
      t.value ? v(n.$slots, "body", { key: 0 }) : p("", !0)
    ]));
  }
}, Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ve
}, Symbol.toStringTag, { value: "Module" }));
class We {
  constructor(e) {
    u(this, "type", "switch");
    u(this, "field", "");
    u(this, "url", "");
    u(this, "processing", $(null));
    u(this, "target", $(null));
    u(this, "error", null);
    this.url = e;
  }
  static create(e) {
    return new this(e);
  }
  async patch(e, t) {
    var r, n;
    this.target.value = e, this.processing.value = e.id, await new Promise((i) => setTimeout(i, 1e3));
    try {
      const i = typeof this.url == "function" ? this.url(e) : this.url;
      return this.processing.value = null, this.target.value = null, await m.patch(i, t);
    } catch (i) {
      this.processing.value = null, this.target.value = null, this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message;
    }
  }
  async delete(e) {
    var t, r;
    this.target.value = e, this.processing.value = e.id, await new Promise((n) => setTimeout(n, 1e3));
    try {
      const n = typeof this.url == "function" ? this.url(e) : this.url;
      return await m.delete(n);
    } catch (n) {
      return this.error = ((r = (t = n.response) == null ? void 0 : t.data) == null ? void 0 : r.message) || n.message, this.processing.value = null, this.target.value = null, n;
    }
  }
  async handle(e, t) {
    var r, n;
    this.target.value = e;
    try {
      this.processing.value = e.id;
      const i = typeof this.url == "function" ? this.url(e) : this.url, a = {
        [this.field]: t
      };
      await new Promise((l) => setTimeout(l, 1e3));
      const o = await m[this._method](i, a);
      this.afterSuccess(e, t, o);
    } catch (i) {
      this.error = ((n = (r = i.response) == null ? void 0 : r.data) == null ? void 0 : n.message) || i.message, this.afterFailure(e, t, i);
    }
    this.processing.value = null, this.target.value = null;
  }
  isProcessing(e) {
    return this.processing.value === e.id;
  }
}
const Re = ["disabled"], Ae = {
  key: 0,
  class: "fas fa-spinner fa-spin"
}, Ie = {
  key: 1,
  class: /* @__PURE__ */ R("fas fa-trash")
}, Ne = {
  __name: "WyxosAction",
  props: {
    action: {
      type: We,
      required: !0
    },
    row: {
      type: Object,
      required: !0
    },
    onComplete: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(s) {
    return (e, t) => (c(), h("button", {
      disabled: s.action.isProcessing(s.row),
      class: "bg-red-500 text-white",
      onClick: t[0] || (t[0] = (r) => s.action.delete(s.row).then(s.onComplete))
    }, [
      s.action.isProcessing(s.row) ? (c(), h("i", Ae)) : (c(), h("i", Ie))
    ], 8, Re));
  }
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), C = q({
  default: []
});
function N() {
  return {
    createBag(s) {
      C[s] || (C[s] = []);
    },
    set(s, e = "default") {
      if (!(s.response && s.response.data && s.response.data.errors))
        throw s;
      C[e] = Object.keys(s.response.data.errors).map((r) => ({
        key: r,
        message: s.response.data.errors[r][0]
      }));
    },
    has(s, e = "default") {
      return C[e].some((t) => t.key === s);
    },
    setOne(s, e, t = "default") {
      const r = C[t];
      if (!r) {
        C[t] = [
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
      const t = C[e];
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
        const t = C[e];
        if (!t) {
          console.warn(`Bag ${e} is not defined.`);
          return;
        }
        const r = t.findIndex((n) => n.key === s);
        r !== -1 && t.splice(r, 1);
        return;
      }
      C[e] = [];
    },
    all(s = "default") {
      return C[s];
    }
  };
}
class j {
  // errorBag = 'default'
  // model = reactive({})
  // form = reactive({})
  // original = {}
  // states = {
  //   load: State.create(),
  //   submit: State.create()
  // }
  //
  // paths = {
  //   load: null,
  //   submit: null
  // }
  //
  // // Add an abort controller property
  // abortSubmitController = null
  //
  // timeout = null
  //
  constructor(e = {}) {
    u(this, "submitUrl", null);
    u(this, "loadUrl", null);
    u(this, "original", {});
    u(this, "form", q({}));
    u(this, "formatCallback", null);
    u(this, "abortSubmitController", null);
    u(this, "abortLoadController", null);
    u(this, "submitState", $(null));
    u(this, "loadState", $(null));
    u(this, "errors", N());
    u(this, "resetAfterSubmitFlag", !1);
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
    return JSON.stringify(this.original) !== JSON.stringify(this.form);
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
  //
  // get isSubmitting() {
  //   return this.states.submit.isLoading
  // }
  //
  // get isSubmitted() {
  //   return this.states.submit.isLoaded
  // }
  //
  // get isSubmitFailed() {
  //   return this.states.submit.isFailure
  // }
  //
  // get isLoading() {
  //   return this.states.load.isLoading
  // }
  //
  // get isLoaded() {
  //   return this.states.load.isLoaded
  // }
  //
  // get isFailure() {
  //   return this.states.load.isFailure
  // }
  submitAt(e) {
    return this.submitUrl = e, this;
  }
  async submit() {
    this.submitting(), this.clearErrors();
    const e = {};
    this.abortSubmitController && this.abortSubmitController.abort(), this.abortSubmitController = new AbortController(), e.signal = this.abortSubmitController.signal, await new Promise((r) => setTimeout(r, 1e3));
    const t = this.formatCallback ? this.formatCallback(this.form) : this.form;
    return m.post(this.submitUrl, t, e).then((r) => (this.submitted(), this.resetAfterSubmitFlag && this.setAttributes(this.original), r.data)).catch((r) => (this.submitFailed(), this.errors.set(r), Promise.reject(r)));
  }
  load() {
    const e = {};
    return this.abortLoadController && this.abortLoadController.abort(), this.abortLoadController = new AbortController(), e.signal = this.abortLoadController.signal, m.get(this.loadUrl, e).then((t) => (t.data.form && this.setAttributes(t.data.form), t.data));
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
  formatter(e) {
    return this.formatCallback = e, this;
  }
  loadFrom(e) {
    return this.loadUrl = e, this;
  }
  //
  // setPaths(paths = {}) {
  //   Object.assign(this.paths, paths)
  //
  //   return this
  // }
  //
  // setLoad(url) {
  //   this.paths.load = url
  //
  //   return this
  // }
  //
  // setSubmit(url) {
  //   this.paths.submit = url
  //
  //   return this
  // }
  //
  // setErrors(bag) {
  //   this.errorBag = bag || 'default'
  //
  //   this.errors = useFormErrors()
  //
  //   this.errors.createBag(this.errorBag)
  // }
  //
  // setAttributes(attributes) {
  //   this.original = attributes
  //   this.form = reactive({ ...attributes })
  // }
  //
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
  //
  // get(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('get', path, { formatter, ...axiosConfig })
  // }
  //
  // post(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('post', path, { formatter, ...axiosConfig })
  // }
  //
  // submit(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   path = path || this.paths.submit
  //
  //   if (!path) {
  //     throw Error('No valid URL defined for submit method.')
  //   }
  //
  //   return this.submitRequest('post', path, { formatter, ...axiosConfig })
  // }
  //
  // delete(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('delete', path, { formatter, ...axiosConfig })
  // }
  //
  // put(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('put', path, { formatter, ...axiosConfig })
  // }
  //
  // patch(path, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('patch', path, { formatter, ...axiosConfig })
  // }
  //
  // async submitRequest(
  //   method,
  //   path = null,
  //   { formatter = null, ...axiosConfig } = {}
  // ) {
  //   // Validate inputs
  //   if (path && typeof path !== 'string')
  //     throw new Error('Path must be a string')
  //   if (formatter !== null && typeof formatter !== 'function')
  //     throw new Error('Formatter must be a function')
  //
  //   // If there's an ongoing request, abort it
  //   if (this.abortSubmitController) {
  //     this.abortSubmitController.abort()
  //   }
  //
  //   // Create a new AbortController
  //   this.abortSubmitController = new AbortController()
  //
  //   // Add the signal to the axios config
  //   axiosConfig.signal = this.abortSubmitController.signal
  //
  //   this.clearErrors()
  //   this.submitting()
  //
  //   // wait 1 second
  //   await new Promise((resolve) => setTimeout(resolve, 1000))
  //
  //   const payload = formatter ? formatter(this.form) : { ...this.form }
  //
  //   let request
  //
  //   if (['get', 'delete'].includes(method)) {
  //     axiosConfig.params = payload
  //     request = axios[method](path, axiosConfig)
  //   } else {
  //     request = axios[method](path, payload, axiosConfig)
  //   }
  //
  //   return request
  //     .then((response) => {
  //       // After a successful request, nullify the abortSubmitController
  //       this.abortSubmitController = null
  //
  //       this.clearErrors()
  //       this.submitted()
  //       // this.states.submit.reset()
  //
  //       return response.data
  //     })
  //     .catch((error) => {
  //       if (error.name === 'AbortError') {
  //         console.log('Request aborted:', error.message)
  //       } else {
  //         this.submitFailed()
  //         this.errors.set(error, this.errorBag)
  //       }
  //       return Promise.reject(error)
  //     })
  // }
  //
  // clearErrors() {
  //   this.errors.clear(null, this.errorBag)
  // }
  //
  // handleSubmissionFailure(error) {
  //   this.submitFailed()
  //   this.errors.set(error, this.errorBag)
  // }
  //
  // async advancedSubmit(callback) {
  //   this.states.submit.loading()
  //
  //   const { data } = await Promise.resolve(callback(axios, this.form)).catch(
  //     (error) => {
  //       this.states.submit.failed()
  //
  //       this.errors.set(error, this.errorBag)
  //
  //       throw error
  //     }
  //   )
  //
  //   this.states.submit.loaded()
  //
  //   return data
  // }
  //
  // async load(
  //   path = '',
  //   { updateLoading = true, updateOriginal = true, ...axiosConfig } = {}
  // ) {
  //   this.clearErrors()
  //
  //   this.states.load.loading()
  //
  //   try {
  //     const { data } = await axios.get(path || this.paths.load, axiosConfig)
  //
  //     if (updateOriginal) {
  //       Object.assign(this.original, data.form)
  //     }
  //
  //     Object.assign(this.form, data.form)
  //
  //     if (data.model) {
  //       Object.assign(this.model, data.model)
  //     }
  //
  //     if (updateLoading) {
  //       this.loaded()
  //     }
  //
  //     return data
  //   } catch (error) {
  //     this.states.load.failed()
  //     throw error
  //   }
  // }
  //
  // loading() {
  //   this.states.load.loading()
  //
  //   return this
  // }
  //
  // loaded() {
  //   this.states.load.loaded()
  //
  //   return this
  // }
  //
  // loadFailed() {
  //   this.states.load.failed()
  //
  //   return this
  // }
  //
  // submitting() {
  //   this.states.submit.loading()
  //
  //   return this
  // }
  //
  // submitFailed() {
  //   this.states.submit.failed()
  //
  //   return this
  // }
  //
  // submitted() {
  //   this.states.submit.loaded()
  //
  //   return this
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
const _ = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, Me = {
  name: "WyxosButton",
  props: {
    form: {
      type: j,
      default: null
    },
    button: {
      type: String,
      default: "submit"
    }
  }
}, Be = ["disabled", "type"], ze = { key: 0 }, De = { key: 1 }, Ye = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin ml-4" }, null, -1);
function Je(s, e, t, r, n, i) {
  return c(), h("button", {
    disabled: t.form.isSubmitting,
    type: t.button
  }, [
    v(s.$slots, "default", {}, () => [
      t.form.isSubmitting ? p("", !0) : (c(), h("span", ze, "Submit")),
      t.form.isSubmitting ? (c(), h("span", De, "Processing")) : p("", !0)
    ]),
    t.form.isSubmitting ? v(s.$slots, "icon", { key: 0 }, () => [
      Ye
    ]) : p("", !0)
  ], 8, Be);
}
const Ke = /* @__PURE__ */ _(Me, [["render", Je]]), He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
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
  return v(s.$slots, "default", D(Y({ add: i.add, remove: i.remove, items: n.items })), () => [
    Xe
  ]);
}
const Ze = /* @__PURE__ */ _(Qe, [["render", Ge]]), et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ze
}, Symbol.toStringTag, { value: "Module" }));
class V {
  constructor() {
    u(this, "state", q({
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
    return new V();
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
      state: new V()
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
  const a = g("wyxos-button"), o = g("o-modal");
  return c(), O(o, {
    active: !0,
    onClose: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: y(() => [
      f("section", st, [
        f("article", null, [
          f("header", null, [
            f("h3", rt, w(t.title), 1)
          ]),
          f("p", nt, w(t.message), 1),
          f("footer", it, [
            x(a, {
              disabled: r.state.isLoading,
              class: "button secondary",
              "native-type": "button",
              onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
            }, {
              default: y(() => [
                F(w(t.cancelText), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            x(a, {
              class: R([{ [t.confirmType]: !0 }, "button"]),
              loading: r.state.isLoading,
              "native-type": "button",
              onClick: e[1] || (e[1] = (l) => i.proceed())
            }, {
              default: y(() => [
                F(w(t.confirmText), 1)
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
const ot = /* @__PURE__ */ _(tt, [["render", at]]), lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
function ct(s, e, t, r, n, i) {
  var l;
  const a = g("o-datepicker"), o = g("o-field");
  return c(), O(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: y(() => [
      x(a, W({
        modelValue: n.query,
        "onUpdate:modelValue": e[0] || (e[0] = (d) => n.query = d),
        "date-formatter": i.dateFormatter,
        "trap-focus": ""
      }, t.options, { "onUpdate:modelValue": i.updateQuery }), null, 16, ["modelValue", "date-formatter", "onUpdate:modelValue"])
    ]),
    _: 1
  }, 16, ["label"]);
}
const dt = /* @__PURE__ */ _(ut, [["render", ct]]), ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dt
}, Symbol.toStringTag, { value: "Module" })), ht = ae({
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
      errors: N()
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
  return (a = s.form) != null && a.getError(s.name).message ? (c(), h("span", mt, w(s.form.getError(s.name).message), 1)) : (o = s.errors.get(s.name)) != null && o.message ? (c(), h("span", gt, w(s.errors.get(s.name).message), 1)) : p("", !0);
}
const yt = /* @__PURE__ */ _(ht, [["render", pt]]), bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yt
}, Symbol.toStringTag, { value: "Module" })), ce = "%[a-f0-9]{2}", ee = new RegExp("(" + ce + ")|([^%]+?)", "gi"), te = new RegExp("(" + ce + ")+", "gi");
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
function _t(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    let e = s.match(ee) || [];
    for (let t = 1; t < e.length; t++)
      s = J(e, t).join(""), e = s.match(ee) || [];
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
      const n = _t(t[0]);
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
function wt(s, e) {
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
const xt = (s) => s == null, Ot = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), K = Symbol("encodeFragmentIdentifier");
function $t(s) {
  switch (s.arrayFormat) {
    case "index":
      return (e) => (t, r) => {
        const n = t.length;
        return r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
          ...t,
          [b(e, s), "[", n, "]"].join("")
        ] : [
          ...t,
          [b(e, s), "[", b(n, s), "]=", b(r, s)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [b(e, s), "[]"].join("")
      ] : [
        ...t,
        [b(e, s), "[]=", b(r, s)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        [b(e, s), ":list="].join("")
      ] : [
        ...t,
        [b(e, s), ":list=", b(r, s)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = s.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (r, n) => n === void 0 || s.skipNull && n === null || s.skipEmptyString && n === "" ? r : (n = n === null ? "" : n, r.length === 0 ? [[b(t, s), e, b(n, s)].join("")] : [[r, b(n, s)].join(s.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, r) => r === void 0 || s.skipNull && r === null || s.skipEmptyString && r === "" ? t : r === null ? [
        ...t,
        b(e, s)
      ] : [
        ...t,
        [b(e, s), "=", b(r, s)].join("")
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
        const i = typeof r == "string" && r.includes(s.arrayFormatSeparator), a = typeof r == "string" && !i && T(r, s).includes(s.arrayFormatSeparator);
        r = a ? T(r, s) : r;
        const o = i || a ? r.split(s.arrayFormatSeparator).map((l) => T(l, s)) : r === null ? r : T(r, s);
        n[t] = o;
      };
    case "bracket-separator":
      return (t, r, n) => {
        const i = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !i) {
          n[t] = r && T(r, s);
          return;
        }
        const a = r === null ? [] : r.split(s.arrayFormatSeparator).map((o) => T(o, s));
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
function b(s, e) {
  return e.encode ? e.strict ? Ot(s) : encodeURIComponent(s) : s;
}
function T(s, e) {
  return e.decode ? vt(s) : s;
}
function he(s) {
  return Array.isArray(s) ? s.sort() : typeof s == "object" ? he(Object.keys(s)).sort((e, t) => Number(e) - Number(t)).map((e) => s[e]) : s;
}
function me(s) {
  const e = s.indexOf("#");
  return e !== -1 && (s = s.slice(0, e)), s;
}
function Ct(s) {
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
    a === void 0 && (a = i), o = o === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? o : T(o, e), t(T(a, e), o, r);
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
  const t = (a) => e.skipNull && xt(s[a]) || e.skipEmptyString && s[a] === "", r = $t(e), n = {};
  for (const [a, o] of Object.entries(s))
    t(a) || (n[a] = o);
  const i = Object.keys(n);
  return e.sort !== !1 && i.sort(e.sort), i.map((a) => {
    const o = s[a];
    return o === void 0 ? "" : o === null ? b(a, e) : Array.isArray(o) ? o.length === 0 && e.arrayFormat === "bracket-separator" ? b(a, e) + "[]" : o.reduce(r(a), []).join("&") : b(a, e) + "=" + b(o, e);
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
    ...e && e.parseFragmentIdentifier && r ? { fragmentIdentifier: T(r, e) } : {}
  };
}
function ye(s, e) {
  e = {
    encode: !0,
    strict: !0,
    [K]: !0,
    ...e
  };
  const t = me(s.url).split("?")[0] || "", r = X(s.url), n = {
    ...G(r, { sort: !1 }),
    ...s.query
  };
  let i = ge(n, e);
  i && (i = `?${i}`);
  let a = Ct(s.url);
  if (s.fragmentIdentifier) {
    const o = new URL(t);
    o.hash = s.fragmentIdentifier, a = e[K] ? o.hash : `#${s.fragmentIdentifier}`;
  }
  return `${t}${i}${a}`;
}
function be(s, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [K]: !1,
    ...t
  };
  const { url: r, query: n, fragmentIdentifier: i } = pe(s, t);
  return ye({
    url: r,
    query: wt(n, e),
    fragmentIdentifier: i
  }, t);
}
function qt(s, e, t) {
  const r = Array.isArray(e) ? (n) => !e.includes(n) : (n, i) => !e(n, i);
  return be(s, r, t);
}
const re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: qt,
  extract: X,
  parse: G,
  parseUrl: pe,
  pick: be,
  stringify: ge,
  stringifyUrl: ye
}, Symbol.toStringTag, { value: "Module" }));
let M = null;
class U {
  constructor() {
    u(this, "cancelTokenSource", null);
    u(this, "api", null);
    u(this, "baseUrl", null);
    u(this, "structure", null);
    u(this, "options", null);
    u(this, "errors", null);
    u(this, "errorBag", "listing");
    u(this, "globalCancel", !0);
    u(this, "attributes", q({
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
          const n = t.split(".");
          if (n.length > 1) {
            let i = e.attributes;
            for (let a = 0; a < n.length; a++)
              i = i[n[a]];
            return i ?? void 0;
          }
          return Reflect.get(e.attributes, t);
        }
      },
      set(e, t, r, n) {
        if (Reflect.has(e, t))
          return Reflect.set(e, t, r, n);
        if (Reflect.has(e.attributes, t)) {
          const i = t.split(".");
          if (i.length > 1) {
            let a = e.form;
            for (let o = 0; o < i.length - 1; o++)
              i[o] in a || (a[i[o]] = {}), a = a[i[o]];
            return a[i[i.length - 1]] === void 0 ? !1 : (a[i[i.length - 1]] = r, !0);
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
      paginated: this.attributes.query.total > this.attributes.query.perPage,
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
    return r.errors = N(), r.errors.createBag(r.errorBag), r.options = Object.assign(
      {
        enableSearchUpdate: !0,
        transformItem: (n) => n
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
    const e = re.parse(window.location.search, {
      arrayFormat: "bracket",
      parseNumbers: !0
    });
    e.page && (e.page = Number(e.page)), Object.assign(this.attributes.params, this.structure, e);
  }
  // Retrieves the list without affecting the load state.
  async fetch(e, t) {
    const r = JSON.parse(JSON.stringify(this.attributes.params)), n = e || this.baseUrl, { data: i } = await m.get(n, {
      params: r,
      cancelToken: t
    });
    return i;
  }
  async reload(e) {
    const { data: t } = await m.get(e || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.attributes.params))
    });
    return Object.assign(this.attributes.query, t.query, {
      items: t.query.items.map((r) => this.transformItem(r))
    }), t;
  }
  refreshUrl() {
    const e = window.location.href.replace(/\?.*/, ""), t = JSON.parse(JSON.stringify(this.attributes.params)), r = Object.fromEntries(
      Object.entries(t).filter(([i, a]) => a != null)
    ), n = e + "?" + re.stringify(r, { arrayFormat: "bracket" });
    if (this.options.router) {
      const i = this.options.router.currentRoute.path;
      this.options.router.push({
        path: i,
        query: { ...this.options.router.currentRoute.query, ...t }
      });
    } else
      window.history.pushState({}, "", n);
  }
  push(e) {
    this.attributes.query.items.push(this.transformItem(e));
  }
  transformItem(e) {
    return this.options.transformItem({
      ...e,
      states: {
        delete: new V(),
        patch: new V()
      }
    });
  }
  async load(e) {
    this.errors.clear(null, this.errorBag), this.globalCancel ? (M && M.cancel(), M = m.CancelToken.source()) : (this.cancelTokenSource && this.cancelTokenSource.cancel(), this.cancelTokenSource = m.CancelToken.source()), this.loading(), this.attributes.query.items = [], this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let t = null;
    try {
      const r = JSON.parse(JSON.stringify(this.attributes.params)), n = e || this.baseUrl;
      if (t = (await m.get(n, {
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
      if (m.isCancel(r))
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
  async applyFilter() {
    this.errors.clear(null, this.errorBag), this.cancelTokenSource && this.cancelTokenSource.cancel(), this.loading(), this.cancelTokenSource = m.CancelToken.source(), this.attributes.query.items = [], this.attributes.params.page = 1, this.attributes.query.total = 0, this.attributes.query.showing = 0;
    let e = null;
    try {
      const t = JSON.parse(JSON.stringify(this.attributes.params)), r = this.baseUrl;
      e = (await m.get(r, {
        params: t,
        cancelToken: this.cancelTokenSource.token
      }).catch((i) => {
        throw this.failed(), i;
      })).data;
    } catch (t) {
      if (m.isCancel(t)) {
        console.error("Request cancelled");
        return;
      } else
        throw this.failed(), this.errors.set(t, this.errorBag), t;
    }
    if (this.refreshUrl(), !e || !e.query || !e.query.items)
      throw this.failed(), Error("Response format is invalid.");
    Object.assign(this.attributes.query, e.query, {
      items: e.query.items.map((t) => this.transformItem(t))
    }), await Fe(), this.loaded(), this.hideFilter();
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
  remove(e) {
    const t = this.attributes.query.items.findIndex(e);
    if (t !== -1)
      return this.attributes.query.items.splice(t, 1), this.reload();
  }
  failed() {
    this.attributes.state.list = "failed";
  }
}
const jt = {
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
function kt(s, e, t, r, n, i) {
  const a = g("o-loading"), o = g("o-button");
  return t.form.isLoaded ? (c(), h("form", {
    key: 0,
    class: R(t.formClass),
    onSubmit: e[0] || (e[0] = oe((l) => i.handle(), ["prevent"]))
  }, [
    v(s.$slots, "default")
  ], 34)) : t.form.isLoading ? (c(), O(a, {
    key: 1,
    active: !0
  })) : t.form.isFailure ? (c(), O(o, {
    key: 2,
    onClick: e[1] || (e[1] = (l) => t.form.load())
  }, {
    default: y(() => [
      F(" Error. Retry or refresh. ")
    ]),
    _: 1
  })) : p("", !0);
}
const Tt = /* @__PURE__ */ _(jt, [["render", kt]]), Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tt
}, Symbol.toStringTag, { value: "Module" })), Pt = {
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
      class: R([`fa-${s.active ? s.on : s.off}`, "fas"])
    }, null, 2));
  }
}, Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pt
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
}, Wt = ["width", "height"];
function Rt(s, e, t, r, n, i) {
  return c(), h("img", {
    ref: "image",
    src: "",
    alt: "",
    width: n.width,
    height: n.height
  }, null, 8, Wt);
}
const At = /* @__PURE__ */ _(Lt, [["render", Rt]]), It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: At
}, Symbol.toStringTag, { value: "Module" })), Nt = { class: "quick-edit" }, Ut = { class: "value" }, Mt = ["type", "readonly"], Bt = /* @__PURE__ */ f("i", { class: "fas fa-pencil-alt" }, null, -1), zt = [
  Bt
], Dt = ["disabled"], Yt = /* @__PURE__ */ f("i", { class: "fas fa-times" }, null, -1), Jt = [
  Yt
], Kt = ["disabled"], Ht = {
  key: 0,
  class: "fas fa-check"
}, Qt = {
  key: 1,
  class: "fas fa-spinner fa-spin"
}, Xt = {
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
    const t = s, r = e, n = $(t.modelValue), i = $(!1), a = () => {
      i.value = !1, n.value = t.modelValue;
    }, o = () => t.update(n.value).then(() => {
      r("update:modelValue", n.value), i.value = !1;
    });
    return (l, d) => (c(), h("div", Nt, [
      i.value ? p("", !0) : v(l.$slots, "value", { key: 0 }, () => [
        f("span", Ut, w(s.modelValue), 1)
      ]),
      i.value ? v(l.$slots, "field", {
        key: 1,
        query: n.value
      }, () => [
        i.value ? Ce((c(), h("input", {
          key: 0,
          "onUpdate:modelValue": d[0] || (d[0] = (k) => n.value = k),
          type: typeof s.modelValue == "number" ? "number" : "text",
          readonly: s.processing
        }, null, 8, Mt)), [
          [qe, n.value]
        ]) : p("", !0)
      ]) : p("", !0),
      v(l.$slots, "actions", {
        enableEdit: i.value,
        onCancel: a,
        onUpdate: o
      }, () => [
        i.value ? p("", !0) : (c(), h("button", {
          key: 0,
          class: "edit",
          onClick: d[1] || (d[1] = (k) => i.value = !0)
        }, zt)),
        i.value ? (c(), h("button", {
          key: 1,
          class: "cancel",
          disabled: s.processing,
          onClick: d[2] || (d[2] = (k) => a())
        }, Jt, 8, Dt)) : p("", !0),
        i.value ? (c(), h("button", {
          key: 2,
          class: "save",
          disabled: s.processing,
          onClick: d[3] || (d[3] = (k) => o())
        }, [
          s.processing ? p("", !0) : (c(), h("i", Ht)),
          s.processing ? (c(), h("i", Qt)) : p("", !0)
        ], 8, Kt)) : p("", !0)
      ])
    ]));
  }
}, Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xt
}, Symbol.toStringTag, { value: "Module" })), Zt = {
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
function es(s, e, t, r, n, i) {
  const a = g("o-input"), o = g("o-field");
  return c(), O(o, W({
    class: t.fieldClass,
    label: t.label
  }, i.getError), {
    default: y(() => [
      x(a, {
        class: R(t.inputClass),
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
const ts = /* @__PURE__ */ _(Zt, [["render", es]]), ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ts
}, Symbol.toStringTag, { value: "Module" })), rs = {
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
}, ns = { key: 0 }, is = { key: 1 }, as = { key: 2 };
function os(s, e, t, r, n, i) {
  const a = g("o-table");
  return c(), O(a, D(Y(i.allPropsAndEvents)), je({
    empty: y(() => [
      t.listing.isEmpty ? (c(), h("p", ns, "No records found.")) : p("", !0),
      t.listing.isSearchEmpty ? (c(), h("p", is, " No results for your query. Please adjust your search and try again. ")) : p("", !0),
      t.listing.isFailure ? (c(), h("p", as, " Failure to load the list. Try again or reload the page. ")) : p("", !0)
    ]),
    _: 2
  }, [
    le(s.$slots, (o, l) => ({
      name: l,
      fn: y((d) => [
        v(s.$slots, l, D(Y(d)))
      ])
    }))
  ]), 1040);
}
const ls = /* @__PURE__ */ _(rs, [["render", os]]), us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ls
}, Symbol.toStringTag, { value: "Module" })), cs = {
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
function ds(s, e, t, r, n, i) {
  const a = g("o-input"), o = g("o-field");
  return c(), O(o, W({
    label: t.label,
    class: t.fieldClass
  }, { ...i.getError() }), {
    default: y(() => [
      x(a, {
        readonly: t.readonly,
        class: R(t.inputClass),
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
const fs = /* @__PURE__ */ _(cs, [["render", ds]]), hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fs
}, Symbol.toStringTag, { value: "Module" })), ms = {
  name: "WyxosLogout",
  props: {
    path: {
      type: String,
      default: "/logout"
    }
  },
  methods: {
    async logout() {
      const { data: s } = await m.post(this.path).catch((e) => {
        throw e.response.status === 401 && (window.location.href = "/"), e;
      });
      window.location.href = (s == null ? void 0 : s.redirect) || "/";
    }
  }
};
function gs(s, e, t, r, n, i) {
  return v(s.$slots, "default", { logout: i.logout }, () => [
    f("button", {
      class: "button is-primary",
      onClick: e[0] || (e[0] = (a) => i.logout())
    }, "Sign out")
  ]);
}
const ps = /* @__PURE__ */ _(ms, [["render", gs]]), ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ps
}, Symbol.toStringTag, { value: "Module" })), bs = ae({
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
}), _s = ["max", "value"], Ss = { key: 0 };
function vs(s, e, t, r, n, i) {
  return c(), h(ue, null, [
    f("progress", {
      max: s.max,
      value: s.modelValue
    }, null, 8, _s),
    s.showValue ? (c(), h("span", Ss, w(s.modelValue) + " / " + w(s.max), 1)) : p("", !0)
  ], 64);
}
const ws = /* @__PURE__ */ _(bs, [["render", vs]]), xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ws
}, Symbol.toStringTag, { value: "Module" })), Os = {
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
      state: new V()
    };
  },
  methods: {
    async proceed() {
      this.callback && (this.state.loading(), await this.callback().catch((s) => {
        throw this.state.failed(), s;
      }), this.state.loaded()), this.$emit("close", { action: !0 });
    }
  }
}, $s = { class: "flex gap-6" };
function Fs(s, e, t, r, n, i) {
  const a = g("wyxos-button"), o = g("o-modal");
  return c(), O(o, {
    active: !0,
    onBlur: e[2] || (e[2] = (l) => s.$emit("close", { action: !1 }))
  }, {
    default: y(() => [
      f("h2", null, w(t.title), 1),
      f("p", null, w(t.message), 1),
      f("div", $s, [
        x(a, {
          disabled: r.state.isLoading,
          class: "button is-danger",
          "native-type": "button",
          onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !1 }))
        }, {
          default: y(() => [
            F(w(t.cancelText), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        x(a, {
          loading: r.state.isLoading,
          class: "button",
          "native-type": "button",
          onClick: e[1] || (e[1] = (l) => i.proceed())
        }, {
          default: y(() => [
            F(w(t.confirmText), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ])
    ]),
    _: 1
  });
}
const _e = /* @__PURE__ */ _(Os, [["render", Fs]]), Cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), qs = {
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
}, js = /* @__PURE__ */ f("i", { class: "fas fa-trash" }, null, -1), ks = { class: "content p-6" }, Ts = /* @__PURE__ */ f("h3", { class: "title" }, "Delete", -1), Es = /* @__PURE__ */ f("p", { class: "mb-4" }, " Are you sure you want to delete this record? ", -1), Ps = { class: "buttons flex gap-6 justify-end" };
function Vs(s, e, t, r, n, i) {
  const a = g("o-button"), o = g("w-button"), l = g("o-modal");
  return c(), O(o, {
    class: "button is-danger",
    onClick: e[3] || (e[3] = (d) => i.onRemove())
  }, {
    default: y(() => [
      v(s.$slots, "button", {}, () => [
        js
      ]),
      n.isVisible ? (c(), O(ke, {
        key: 0,
        to: "body"
      }, [
        x(l, {
          active: n.isVisible,
          "onUpdate:active": e[2] || (e[2] = (d) => n.isVisible = d)
        }, {
          default: y(() => [
            f("div", ks, [
              v(s.$slots, "title", {}, () => [
                Ts
              ]),
              v(s.$slots, "message", {}, () => [
                Es
              ]),
              f("div", Ps, [
                x(a, {
                  class: "button is-secondary",
                  onClick: e[0] || (e[0] = (d) => n.isVisible = !1)
                }, {
                  default: y(() => [
                    F("Cancel ")
                  ]),
                  _: 1
                }),
                x(o, {
                  loading: r.destroy.isSubmitting,
                  class: "button is-danger",
                  onClick: e[1] || (e[1] = (d) => i.remove())
                }, {
                  default: y(() => [
                    v(s.$slots, "confirm", {}, () => [
                      F("Confirm")
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
const Ls = /* @__PURE__ */ _(qs, [["render", Vs]]), Ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, As = ["value"];
function Is(s, e, t, r, n, i) {
  var l;
  const a = g("o-select"), o = g("o-field");
  return c(), O(o, W({ label: t.label }, (l = t.form) == null ? void 0 : l.getError(t.name)), {
    default: y(() => [
      x(a, {
        disabled: t.disabled,
        "model-value": t.modelValue,
        name: t.name,
        placeholder: t.placeholder,
        "root-class": "w-full",
        "select-class": "w-full",
        "onUpdate:modelValue": e[0] || (e[0] = (d) => i.updateValue(d))
      }, {
        default: y(() => [
          v(s.$slots, "default", {}, () => [
            t.items ? (c(!0), h(ue, { key: 0 }, le(t.items, (d) => (c(), h("option", {
              key: d.value,
              value: d.value
            }, w(d.label), 9, As))), 128)) : p("", !0)
          ])
        ]),
        _: 3
      }, 8, ["disabled", "model-value", "name", "placeholder"])
    ]),
    _: 3
  }, 16, ["label"]);
}
const Ns = /* @__PURE__ */ _(Rs, [["render", Is]]), Us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ns
}, Symbol.toStringTag, { value: "Module" })), Ms = {
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
}, Bs = { class: "bg-white p-6" }, zs = /* @__PURE__ */ f("h2", { class: "title" }, "Session Expired", -1), Ds = /* @__PURE__ */ f("p", { class: "mb-6" }, " It looks like you've been away for a bit. For your security, please re-enter your credentials to continue. ", -1), Ys = { class: "buttons" };
function Js(s, e, t, r, n, i) {
  const a = g("wyxos-input"), o = g("w-button"), l = g("o-modal");
  return c(), O(l, { active: !0 }, {
    default: y(() => [
      f("div", Bs, [
        zs,
        Ds,
        f("form", {
          onSubmit: e[3] || (e[3] = oe((...d) => i.proceed && i.proceed(...d), ["prevent"]))
        }, [
          x(a, {
            modelValue: r.login.email,
            "onUpdate:modelValue": e[0] || (e[0] = (d) => r.login.email = d),
            name: "email",
            label: "Email"
          }, null, 8, ["modelValue"]),
          x(a, {
            modelValue: r.login.password,
            "onUpdate:modelValue": e[1] || (e[1] = (d) => r.login.password = d),
            name: "password",
            label: "Password",
            type: "password"
          }, null, 8, ["modelValue"]),
          f("div", Ys, [
            x(o, {
              class: "button is-danger",
              disabled: r.login.isSubmitting,
              onClick: e[2] || (e[2] = (d) => i.onLogout())
            }, {
              default: y(() => [
                F(" Logout ")
              ]),
              _: 1
            }, 8, ["disabled"]),
            x(o, {
              class: "button is-primary",
              "native-type": "submit",
              loading: r.login.isSubmitting
            }, {
              default: y(() => [
                F(" Login ")
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
const Se = /* @__PURE__ */ _(Ms, [["render", Js]]), Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se
}, Symbol.toStringTag, { value: "Module" })), Hs = {
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
}, Qs = { key: 0 }, Xs = { key: 1 }, Gs = /* @__PURE__ */ f("i", { class: "fas fa-spinner fa-spin" }, null, -1), Zs = { key: 2 }, er = { key: 3 };
function tr(s, e, t, r, n, i) {
  const a = g("o-button");
  return c(), O(a, {
    disabled: !!(t.form.isSubmitting || t.form.isSubmitted),
    "native-type": "submit"
  }, {
    default: y(() => [
      !t.form.isSubmitted && !t.form.isSubmitting && !t.form.isSubmitFailed ? (c(), h("span", Qs, w(n.mergedLabels.submit), 1)) : p("", !0),
      t.form.isSubmitting ? (c(), h("span", Xs, [
        F(w(n.mergedLabels.submitting) + " ", 1),
        Gs
      ])) : p("", !0),
      t.form.isSubmitted ? (c(), h("span", Zs, w(n.mergedLabels.submitted), 1)) : p("", !0),
      t.form.isSubmitFailed ? (c(), h("span", er, w(n.mergedLabels.failed), 1)) : p("", !0)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const sr = /* @__PURE__ */ _(Hs, [["render", tr]]), rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sr
}, Symbol.toStringTag, { value: "Module" })), nr = {
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
      const B = window.location.hash.replace("#", ""), P = new URLSearchParams(B);
      P.set(S, E), window.location.hash = P.toString();
    }, a = $(n()[t.hashKey] || t.active), o = $(!1), l = (S) => o.value ? !0 : S === a.value, d = () => {
      o.value = window.innerWidth <= t.responsiveResolution;
    }, k = (S) => {
      a.value = S, r("update:active", S), i(t.hashKey, S);
    };
    return ie(() => {
      window.addEventListener("hashchange", () => {
        const S = n();
        S[t.hashKey] && (a.value = S[t.hashKey]);
      }), d(), window.addEventListener("resize", d);
    }), Te(() => {
      window.removeEventListener("hashchange", () => {
      }), window.removeEventListener("resize", d);
    }), (S, E) => (c(), h("div", null, [
      v(S.$slots, "navigation", {
        isActive: l,
        setActive: k
      }, () => [
        F(" Fill in navigation content here ")
      ]),
      v(S.$slots, "content", { isActive: l }, () => [
        F(" Fill in content here")
      ])
    ]));
  }
}, ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nr
}, Symbol.toStringTag, { value: "Module" }));
class Z {
  constructor(e = {}) {
    u(this, "state", new V());
    u(this, "result", $([]));
    u(this, "value", $(null));
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
      const r = e || this.options.url, { data: n } = await m.post(`${r}/search`, t || this.options.payload, {
        signal: this.controller.signal
      }).catch((i) => {
        throw this.state.failed(), i;
      });
      this.result.value = n.result, this.state.loaded();
    }, 500);
  }
  async restore(e, t) {
    this.state.loading(), this.reset();
    const r = e || this.options.url, { data: n } = await m.post(`${r}/restore`, t || this.options.payload).catch((i) => {
      throw this.state.failed(), i;
    });
    return this.state.loaded(), n;
  }
  reset() {
    this.result.value = [];
  }
}
const ar = {
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
function or(s, e, t, r, n, i) {
  const a = g("o-taginput");
  return c(), O(a, W({
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
const lr = /* @__PURE__ */ _(ar, [["render", or]]), ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lr
}, Symbol.toStringTag, { value: "Module" })), cr = {
  name: "WyxosTokenExpired",
  emits: ["close"],
  methods: {
    async proceed() {
      this.$emit("close", { action: !0 });
    }
  }
}, dr = { class: "bg-white p-6" }, fr = /* @__PURE__ */ f("h2", { class: "title" }, "Session expired", -1), hr = /* @__PURE__ */ f("p", { class: "mb-6" }, " Your tab has been idle for a while. We've refreshed your session for you. If you encountered an error after performing an action, please close this prompt and try again. ", -1), mr = { class: "buttons" };
function gr(s, e, t, r, n, i) {
  const a = g("w-button"), o = g("o-modal");
  return c(), O(o, { active: !0 }, {
    default: y(() => [
      f("div", dr, [
        fr,
        hr,
        f("div", mr, [
          x(a, {
            class: "button is-primary",
            onClick: e[0] || (e[0] = (l) => s.$emit("close", { action: !0 }))
          }, {
            default: y(() => [
              F(" Confirm ")
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const ve = /* @__PURE__ */ _(cr, [["render", gr]]), pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" }));
class yr {
  constructor() {
    u(this, "attributes", q({
      user: null
    }));
    u(this, "state", new V());
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
    this.loading(), await m.get("/sanctum/csrf-cookie").catch((t) => {
      throw this.failed(), t;
    });
    const { data: e } = await m.get("/api/user");
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
const qr = new yr();
async function jr(s = {}) {
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
const br = {
  UK_TIME: "DD/MM/YYYY HH:mm:ss",
  UK: "DD/MM/YYYY",
  DB_TIME: "YYYY-MM-DD HH:mm:ss",
  DB: "YYYY-MM-DD"
};
class _r {
  constructor() {
    u(this, "FORMATS", br);
  }
  format(e, t, r = "") {
    return e ? I(e).format(t) : r;
  }
}
const kr = new _r();
async function Sr(s, e) {
  var i, a, o, l, d, k;
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
      component: ((o = e.components) == null ? void 0 : o.TokenExpired) || ve,
      trapFocus: !0,
      closable: !1
    });
    const E = (await m.get("/heartbeat")).data.csrfToken;
    m.defaults.headers.common["X-CSRF-TOKEN"] = E;
  }
  if (((l = s.response) == null ? void 0 : l.status) === 401 && n.modal.open({
    component: ((d = e.components) == null ? void 0 : d.SessionExpired) || Se,
    trapFocus: !0,
    closable: !1
  }), ((k = s.response) == null ? void 0 : k.status) === 422) {
    const S = setInterval(() => {
      const E = document.querySelectorAll(
        ".o-field__message-danger, .wyxos-error"
      ), B = (L) => {
        const z = L.getBoundingClientRect(), A = window.getComputedStyle(L);
        return z.width > 0 && z.height > 0 && A.display !== "none" && A.visibility !== "hidden" && A.opacity !== "0";
      }, P = Array.from(E).find(B);
      if (P) {
        clearInterval(S);
        let L;
        if (P.classList.contains("o-field__message-danger") ? L = P.closest(".o-field") : P.classList.contains("wyxos-error") && (L = P.closest("label")), L) {
          const A = L.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top: A, behavior: "smooth" });
        } else
          console.error("Could not determine the scroll target.");
      }
    }, 100);
  }
  return Promise.reject(s);
}
class Tr {
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
    u(this, "state", $(!1));
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
class Er {
  static create(e, t = null, r = null) {
    return t = t || e, {
      value: e,
      label: t
    };
  }
}
class Pr {
  constructor() {
    u(this, "structure", {});
    u(this, "query", q({
      items: [],
      perPage: 0,
      total: 0,
      isLoading: !1,
      isLoaded: !1,
      isFilterActive: !1
    }));
    u(this, "params", q({
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
    const { data: t } = await m.get(e || this.urls.index, {
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
      const { data: l } = await m.delete(e, {
        data: o
      }).catch((d) => {
        throw t.isProcessing = !1, d;
      });
      t.isProcessing = !1, l.row && Object.assign(t, l.row);
    } else {
      const { data: l } = await m.post(e, o).catch((d) => {
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
class Vr {
  constructor(e) {
    u(this, "current", $(null));
    u(this, "history", $([]));
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
function Lr(s) {
  Q().notification.open({
    message: s || "Action successful.",
    duration: 2500,
    variant: "success",
    position: "bottom-right",
    closable: !0
  });
}
class xe {
  constructor(e) {
    u(this, "attributes", q({
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
function vr(s) {
  m.interceptors.response.use(null, (e) => Sr(e, s));
}
const ne = /* @__PURE__ */ Object.assign({ "./components/WyxosAccordion.vue": Le, "./components/WyxosAction.vue": Ue, "./components/WyxosButton.vue": He, "./components/WyxosCollection.vue": et, "./components/WyxosConfirm.vue": lt, "./components/WyxosDatepicker.vue": ft, "./components/WyxosError.vue": bt, "./components/WyxosForm.vue": Et, "./components/WyxosIcon.vue": Vt, "./components/WyxosImage.vue": It, "./components/WyxosInlineEdit.vue": Gt, "./components/WyxosInput.vue": ss, "./components/WyxosListing.vue": us, "./components/WyxosLiveInput.vue": hs, "./components/WyxosLogout.vue": ys, "./components/WyxosProgress.vue": xs, "./components/WyxosPrompt.vue": Cs, "./components/WyxosRemove.vue": Ws, "./components/WyxosSelect.vue": Us, "./components/WyxosSessionExpired.vue": Ks, "./components/WyxosSubmit.vue": rr, "./components/WyxosTab.vue": ir, "./components/WyxosTags.vue": ur, "./components/WyxosTokenExpired.vue": pr }), H = {}, wr = (s, e = {}) => {
  e = { vision: {}, oruga: {}, use: { oruga: !0 }, ...e }, e.use.oruga && s.use(Ee, e.oruga), Object.keys(ne).forEach((t) => {
    const r = ne[t];
    if (r && r.default) {
      const n = r.default, i = n.name;
      if (i)
        s.component(i, n), s.component(i.replace("Wyxos", "W"), n), H[i] = n;
      else {
        const a = t.split("/").pop().split(".")[0];
        s.component(a, n), s.component(a.replace("Wyxos", "W"), n), H[a] = n;
      }
    } else
      console.error(`Could not load component from '${t}'`);
  }), s.config.globalProperties.$v = {
    to: (t, r) => ({
      name: t,
      params: r
    })
  }, vr(e);
}, Wr = {
  install: wr,
  ...H
};
export {
  We as Action,
  Tr as FileRequest,
  j as FormBuilder,
  U as Listing,
  V as LoadState,
  we as Modal,
  Er as Option,
  Pr as ResourceList,
  Z as Search,
  Vr as Steps,
  xe as Tab,
  Ve as WyxosAccordion,
  Ne as WyxosAction,
  Ke as WyxosButton,
  Ze as WyxosCollection,
  ot as WyxosConfirm,
  dt as WyxosDatepicker,
  yt as WyxosError,
  Tt as WyxosForm,
  Pt as WyxosIcon,
  At as WyxosImage,
  Xt as WyxosInlineEdit,
  ts as WyxosInput,
  ls as WyxosListing,
  fs as WyxosLiveInput,
  ps as WyxosLogout,
  ws as WyxosProgress,
  _e as WyxosPrompt,
  Ls as WyxosRemove,
  Ns as WyxosSelect,
  Se as WyxosSessionExpired,
  sr as WyxosSubmit,
  nr as WyxosTab,
  lr as WyxosTags,
  ve as WyxosTokenExpired,
  qr as auth,
  jr as confirm,
  kr as dateRender,
  Wr as default,
  Sr as errorHandler,
  Lr as success,
  N as useFormErrors
};
//# sourceMappingURL=vision.js.map
