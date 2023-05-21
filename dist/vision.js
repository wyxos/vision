var pn = Object.defineProperty
var _n = (e, t, r) =>
  t in e
    ? pn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (e[t] = r)
var S = (e, t, r) => (_n(e, typeof t != 'symbol' ? t + '' : t, r), r)
import {
  reactive as V,
  ref as Bs,
  resolveComponent as fe,
  openBlock as te,
  createBlock as Ie,
  withCtx as Ne,
  renderSlot as gt,
  createCommentVNode as Ze,
  createElementBlock as wt,
  createTextVNode as et,
  normalizeProps as gn,
  guardReactiveProps as wn,
  createElementVNode as Qe,
  withModifiers as vn,
  createVNode as vt,
  mergeProps as cr,
  toDisplayString as lt
} from 'vue'
function Sn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e
}
var Gs = { exports: {} },
  Er = { exports: {} },
  zs = function (t, r) {
    return function () {
      for (var a = new Array(arguments.length), n = 0; n < a.length; n++)
        a[n] = arguments[n]
      return t.apply(r, a)
    }
  },
  bn = zs,
  Pr = Object.prototype.toString,
  Nr = (function (e) {
    return function (t) {
      var r = Pr.call(t)
      return e[r] || (e[r] = r.slice(8, -1).toLowerCase())
    }
  })(/* @__PURE__ */ Object.create(null))
function De(e) {
  return (
    (e = e.toLowerCase()),
    function (r) {
      return Nr(r) === e
    }
  )
}
function Cr(e) {
  return Array.isArray(e)
}
function St(e) {
  return typeof e > 'u'
}
function On(e) {
  return (
    e !== null &&
    !St(e) &&
    e.constructor !== null &&
    !St(e.constructor) &&
    typeof e.constructor.isBuffer == 'function' &&
    e.constructor.isBuffer(e)
  )
}
var Js = De('ArrayBuffer')
function Dn(e) {
  var t
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Js(e.buffer)),
    t
  )
}
function kn(e) {
  return typeof e == 'string'
}
function Mn(e) {
  return typeof e == 'number'
}
function Zs(e) {
  return e !== null && typeof e == 'object'
}
function ct(e) {
  if (Nr(e) !== 'object') return !1
  var t = Object.getPrototypeOf(e)
  return t === null || t === Object.prototype
}
var xn = De('Date'),
  Rn = De('File'),
  Tn = De('Blob'),
  Fn = De('FileList')
function Ar(e) {
  return Pr.call(e) === '[object Function]'
}
function Yn(e) {
  return Zs(e) && Ar(e.pipe)
}
function En(e) {
  var t = '[object FormData]'
  return (
    e &&
    ((typeof FormData == 'function' && e instanceof FormData) ||
      Pr.call(e) === t ||
      (Ar(e.toString) && e.toString() === t))
  )
}
var Pn = De('URLSearchParams')
function Nn(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '')
}
function Cn() {
  return typeof navigator < 'u' &&
    (navigator.product === 'ReactNative' ||
      navigator.product === 'NativeScript' ||
      navigator.product === 'NS')
    ? !1
    : typeof window < 'u' && typeof document < 'u'
}
function Lr(e, t) {
  if (!(e === null || typeof e > 'u'))
    if ((typeof e != 'object' && (e = [e]), Cr(e)))
      for (var r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e)
    else
      for (var a in e)
        Object.prototype.hasOwnProperty.call(e, a) && t.call(null, e[a], a, e)
}
function mr() {
  var e = {}
  function t(a, n) {
    ct(e[n]) && ct(a)
      ? (e[n] = mr(e[n], a))
      : ct(a)
      ? (e[n] = mr({}, a))
      : Cr(a)
      ? (e[n] = a.slice())
      : (e[n] = a)
  }
  for (var r = 0, s = arguments.length; r < s; r++) Lr(arguments[r], t)
  return e
}
function An(e, t, r) {
  return (
    Lr(t, function (a, n) {
      r && typeof a == 'function' ? (e[n] = bn(a, r)) : (e[n] = a)
    }),
    e
  )
}
function Ln(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e
}
function Un(e, t, r, s) {
  ;(e.prototype = Object.create(t.prototype, s)),
    (e.prototype.constructor = e),
    r && Object.assign(e.prototype, r)
}
function Wn(e, t, r) {
  var s,
    a,
    n,
    i = {}
  t = t || {}
  do {
    for (s = Object.getOwnPropertyNames(e), a = s.length; a-- > 0; )
      (n = s[a]), i[n] || ((t[n] = e[n]), (i[n] = !0))
    e = Object.getPrototypeOf(e)
  } while (e && (!r || r(e, t)) && e !== Object.prototype)
  return t
}
function In(e, t, r) {
  ;(e = String(e)),
    (r === void 0 || r > e.length) && (r = e.length),
    (r -= t.length)
  var s = e.indexOf(t, r)
  return s !== -1 && s === r
}
function qn(e) {
  if (!e) return null
  var t = e.length
  if (St(t)) return null
  for (var r = new Array(t); t-- > 0; ) r[t] = e[t]
  return r
}
var $n = (function (e) {
    return function (t) {
      return e && t instanceof e
    }
  })(typeof Uint8Array < 'u' && Object.getPrototypeOf(Uint8Array)),
  E = {
    isArray: Cr,
    isArrayBuffer: Js,
    isBuffer: On,
    isFormData: En,
    isArrayBufferView: Dn,
    isString: kn,
    isNumber: Mn,
    isObject: Zs,
    isPlainObject: ct,
    isUndefined: St,
    isDate: xn,
    isFile: Rn,
    isBlob: Tn,
    isFunction: Ar,
    isStream: Yn,
    isURLSearchParams: Pn,
    isStandardBrowserEnv: Cn,
    forEach: Lr,
    merge: mr,
    extend: An,
    trim: Nn,
    stripBOM: Ln,
    inherits: Un,
    toFlatObject: Wn,
    kindOf: Nr,
    kindOfTest: De,
    endsWith: In,
    toArray: qn,
    isTypedArray: $n,
    isFileList: Fn
  },
  Te = E
function ms(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
var Qs = function (t, r, s) {
    if (!r) return t
    var a
    if (s) a = s(r)
    else if (Te.isURLSearchParams(r)) a = r.toString()
    else {
      var n = []
      Te.forEach(r, function (u, f) {
        u === null ||
          typeof u > 'u' ||
          (Te.isArray(u) ? (f = f + '[]') : (u = [u]),
          Te.forEach(u, function (w) {
            Te.isDate(w)
              ? (w = w.toISOString())
              : Te.isObject(w) && (w = JSON.stringify(w)),
              n.push(ms(f) + '=' + ms(w))
          }))
      }),
        (a = n.join('&'))
    }
    if (a) {
      var i = t.indexOf('#')
      i !== -1 && (t = t.slice(0, i)),
        (t += (t.indexOf('?') === -1 ? '?' : '&') + a)
    }
    return t
  },
  jn = E
function Rt() {
  this.handlers = []
}
Rt.prototype.use = function (t, r, s) {
  return (
    this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }),
    this.handlers.length - 1
  )
}
Rt.prototype.eject = function (t) {
  this.handlers[t] && (this.handlers[t] = null)
}
Rt.prototype.forEach = function (t) {
  jn.forEach(this.handlers, function (s) {
    s !== null && t(s)
  })
}
var Vn = Rt,
  Hn = E,
  Bn = function (t, r) {
    Hn.forEach(t, function (a, n) {
      n !== r &&
        n.toUpperCase() === r.toUpperCase() &&
        ((t[r] = a), delete t[n])
    })
  },
  Xs = E
function Ue(e, t, r, s, a) {
  Error.call(this),
    (this.message = e),
    (this.name = 'AxiosError'),
    t && (this.code = t),
    r && (this.config = r),
    s && (this.request = s),
    a && (this.response = a)
}
Xs.inherits(Ue, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null
    }
  }
})
var Ks = Ue.prototype,
  ea = {}
;[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
].forEach(function (e) {
  ea[e] = { value: e }
})
Object.defineProperties(Ue, ea)
Object.defineProperty(Ks, 'isAxiosError', { value: !0 })
Ue.from = function (e, t, r, s, a, n) {
  var i = Object.create(Ks)
  return (
    Xs.toFlatObject(e, i, function (u) {
      return u !== Error.prototype
    }),
    Ue.call(i, e.message, t, r, s, a),
    (i.name = e.name),
    n && Object.assign(i, n),
    i
  )
}
var qe = Ue,
  ta = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  z = E
function Gn(e, t) {
  t = t || new FormData()
  var r = []
  function s(n) {
    return n === null
      ? ''
      : z.isDate(n)
      ? n.toISOString()
      : z.isArrayBuffer(n) || z.isTypedArray(n)
      ? typeof Blob == 'function'
        ? new Blob([n])
        : Buffer.from(n)
      : n
  }
  function a(n, i) {
    if (z.isPlainObject(n) || z.isArray(n)) {
      if (r.indexOf(n) !== -1)
        throw Error('Circular reference detected in ' + i)
      r.push(n),
        z.forEach(n, function (u, f) {
          if (!z.isUndefined(u)) {
            var y = i ? i + '.' + f : f,
              w
            if (u && !i && typeof u == 'object') {
              if (z.endsWith(f, '{}')) u = JSON.stringify(u)
              else if (z.endsWith(f, '[]') && (w = z.toArray(u))) {
                w.forEach(function (c) {
                  !z.isUndefined(c) && t.append(y, s(c))
                })
                return
              }
            }
            a(u, y)
          }
        }),
        r.pop()
    } else t.append(i, s(n))
  }
  return a(e), t
}
var ra = Gn,
  zt,
  ys
function zn() {
  if (ys) return zt
  ys = 1
  var e = qe
  return (
    (zt = function (r, s, a) {
      var n = a.config.validateStatus
      !a.status || !n || n(a.status)
        ? r(a)
        : s(
            new e(
              'Request failed with status code ' + a.status,
              [e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][
                Math.floor(a.status / 100) - 4
              ],
              a.config,
              a.request,
              a
            )
          )
    }),
    zt
  )
}
var Jt, ps
function Jn() {
  if (ps) return Jt
  ps = 1
  var e = E
  return (
    (Jt = e.isStandardBrowserEnv()
      ? (function () {
          return {
            write: function (s, a, n, i, o, u) {
              var f = []
              f.push(s + '=' + encodeURIComponent(a)),
                e.isNumber(n) && f.push('expires=' + new Date(n).toGMTString()),
                e.isString(i) && f.push('path=' + i),
                e.isString(o) && f.push('domain=' + o),
                u === !0 && f.push('secure'),
                (document.cookie = f.join('; '))
            },
            read: function (s) {
              var a = document.cookie.match(
                new RegExp('(^|;\\s*)(' + s + ')=([^;]*)')
              )
              return a ? decodeURIComponent(a[3]) : null
            },
            remove: function (s) {
              this.write(s, '', Date.now() - 864e5)
            }
          }
        })()
      : (function () {
          return {
            write: function () {},
            read: function () {
              return null
            },
            remove: function () {}
          }
        })()),
    Jt
  )
}
var Zn = function (t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
  },
  Qn = function (t, r) {
    return r ? t.replace(/\/+$/, '') + '/' + r.replace(/^\/+/, '') : t
  },
  Xn = Zn,
  Kn = Qn,
  sa = function (t, r) {
    return t && !Xn(r) ? Kn(t, r) : r
  },
  Zt,
  _s
function ei() {
  if (_s) return Zt
  _s = 1
  var e = E,
    t = [
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent'
    ]
  return (
    (Zt = function (s) {
      var a = {},
        n,
        i,
        o
      return (
        s &&
          e.forEach(
            s.split(`
`),
            function (f) {
              if (
                ((o = f.indexOf(':')),
                (n = e.trim(f.substr(0, o)).toLowerCase()),
                (i = e.trim(f.substr(o + 1))),
                n)
              ) {
                if (a[n] && t.indexOf(n) >= 0) return
                n === 'set-cookie'
                  ? (a[n] = (a[n] ? a[n] : []).concat([i]))
                  : (a[n] = a[n] ? a[n] + ', ' + i : i)
              }
            }
          ),
        a
      )
    }),
    Zt
  )
}
var Qt, gs
function ti() {
  if (gs) return Qt
  gs = 1
  var e = E
  return (
    (Qt = e.isStandardBrowserEnv()
      ? (function () {
          var r = /(msie|trident)/i.test(navigator.userAgent),
            s = document.createElement('a'),
            a
          function n(i) {
            var o = i
            return (
              r && (s.setAttribute('href', o), (o = s.href)),
              s.setAttribute('href', o),
              {
                href: s.href,
                protocol: s.protocol ? s.protocol.replace(/:$/, '') : '',
                host: s.host,
                search: s.search ? s.search.replace(/^\?/, '') : '',
                hash: s.hash ? s.hash.replace(/^#/, '') : '',
                hostname: s.hostname,
                port: s.port,
                pathname:
                  s.pathname.charAt(0) === '/' ? s.pathname : '/' + s.pathname
              }
            )
          }
          return (
            (a = n(window.location.href)),
            function (o) {
              var u = e.isString(o) ? n(o) : o
              return u.protocol === a.protocol && u.host === a.host
            }
          )
        })()
      : (function () {
          return function () {
            return !0
          }
        })()),
    Qt
  )
}
var Xt, ws
function Tt() {
  if (ws) return Xt
  ws = 1
  var e = qe,
    t = E
  function r(s) {
    e.call(this, s == null ? 'canceled' : s, e.ERR_CANCELED),
      (this.name = 'CanceledError')
  }
  return (
    t.inherits(r, e, {
      __CANCEL__: !0
    }),
    (Xt = r),
    Xt
  )
}
var Kt, vs
function ri() {
  return (
    vs ||
      ((vs = 1),
      (Kt = function (t) {
        var r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t)
        return (r && r[1]) || ''
      })),
    Kt
  )
}
var er, Ss
function bs() {
  if (Ss) return er
  Ss = 1
  var e = E,
    t = zn(),
    r = Jn(),
    s = Qs,
    a = sa,
    n = ei(),
    i = ti(),
    o = ta,
    u = qe,
    f = Tt(),
    y = ri()
  return (
    (er = function (c) {
      return new Promise(function (hn, Me) {
        var Ve = c.data,
          He = c.headers,
          Be = c.responseType,
          xe
        function fs() {
          c.cancelToken && c.cancelToken.unsubscribe(xe),
            c.signal && c.signal.removeEventListener('abort', xe)
        }
        e.isFormData(Ve) &&
          e.isStandardBrowserEnv() &&
          delete He['Content-Type']
        var p = new XMLHttpRequest()
        if (c.auth) {
          var cn = c.auth.username || '',
            mn = c.auth.password
              ? unescape(encodeURIComponent(c.auth.password))
              : ''
          He.Authorization = 'Basic ' + btoa(cn + ':' + mn)
        }
        var Ht = a(c.baseURL, c.url)
        p.open(c.method.toUpperCase(), s(Ht, c.params, c.paramsSerializer), !0),
          (p.timeout = c.timeout)
        function hs() {
          if (!!p) {
            var G =
                'getAllResponseHeaders' in p
                  ? n(p.getAllResponseHeaders())
                  : null,
              Re =
                !Be || Be === 'text' || Be === 'json'
                  ? p.responseText
                  : p.response,
              ve = {
                data: Re,
                status: p.status,
                statusText: p.statusText,
                headers: G,
                config: c,
                request: p
              }
            t(
              function (Gt) {
                hn(Gt), fs()
              },
              function (Gt) {
                Me(Gt), fs()
              },
              ve
            ),
              (p = null)
          }
        }
        if (
          ('onloadend' in p
            ? (p.onloadend = hs)
            : (p.onreadystatechange = function () {
                !p ||
                  p.readyState !== 4 ||
                  (p.status === 0 &&
                    !(p.responseURL && p.responseURL.indexOf('file:') === 0)) ||
                  setTimeout(hs)
              }),
          (p.onabort = function () {
            !p ||
              (Me(new u('Request aborted', u.ECONNABORTED, c, p)), (p = null))
          }),
          (p.onerror = function () {
            Me(new u('Network Error', u.ERR_NETWORK, c, p, p)), (p = null)
          }),
          (p.ontimeout = function () {
            var Re = c.timeout
                ? 'timeout of ' + c.timeout + 'ms exceeded'
                : 'timeout exceeded',
              ve = c.transitional || o
            c.timeoutErrorMessage && (Re = c.timeoutErrorMessage),
              Me(
                new u(
                  Re,
                  ve.clarifyTimeoutError ? u.ETIMEDOUT : u.ECONNABORTED,
                  c,
                  p
                )
              ),
              (p = null)
          }),
          e.isStandardBrowserEnv())
        ) {
          var cs =
            (c.withCredentials || i(Ht)) && c.xsrfCookieName
              ? r.read(c.xsrfCookieName)
              : void 0
          cs && (He[c.xsrfHeaderName] = cs)
        }
        'setRequestHeader' in p &&
          e.forEach(He, function (Re, ve) {
            typeof Ve > 'u' && ve.toLowerCase() === 'content-type'
              ? delete He[ve]
              : p.setRequestHeader(ve, Re)
          }),
          e.isUndefined(c.withCredentials) ||
            (p.withCredentials = !!c.withCredentials),
          Be && Be !== 'json' && (p.responseType = c.responseType),
          typeof c.onDownloadProgress == 'function' &&
            p.addEventListener('progress', c.onDownloadProgress),
          typeof c.onUploadProgress == 'function' &&
            p.upload &&
            p.upload.addEventListener('progress', c.onUploadProgress),
          (c.cancelToken || c.signal) &&
            ((xe = function (G) {
              !p ||
                (Me(!G || (G && G.type) ? new f() : G), p.abort(), (p = null))
            }),
            c.cancelToken && c.cancelToken.subscribe(xe),
            c.signal &&
              (c.signal.aborted
                ? xe()
                : c.signal.addEventListener('abort', xe))),
          Ve || (Ve = null)
        var Bt = y(Ht)
        if (Bt && ['http', 'https', 'file'].indexOf(Bt) === -1) {
          Me(new u('Unsupported protocol ' + Bt + ':', u.ERR_BAD_REQUEST, c))
          return
        }
        p.send(Ve)
      })
    }),
    er
  )
}
var tr, Os
function si() {
  return Os || ((Os = 1), (tr = null)), tr
}
var Y = E,
  Ds = Bn,
  ks = qe,
  ai = ta,
  ni = ra,
  ii = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
function Ms(e, t) {
  !Y.isUndefined(e) &&
    Y.isUndefined(e['Content-Type']) &&
    (e['Content-Type'] = t)
}
function oi() {
  var e
  return (
    (typeof XMLHttpRequest < 'u' ||
      (typeof process < 'u' &&
        Object.prototype.toString.call(process) === '[object process]')) &&
      (e = bs()),
    e
  )
}
function ui(e, t, r) {
  if (Y.isString(e))
    try {
      return (t || JSON.parse)(e), Y.trim(e)
    } catch (s) {
      if (s.name !== 'SyntaxError') throw s
    }
  return (r || JSON.stringify)(e)
}
var Ft = {
  transitional: ai,
  adapter: oi(),
  transformRequest: [
    function (t, r) {
      if (
        (Ds(r, 'Accept'),
        Ds(r, 'Content-Type'),
        Y.isFormData(t) ||
          Y.isArrayBuffer(t) ||
          Y.isBuffer(t) ||
          Y.isStream(t) ||
          Y.isFile(t) ||
          Y.isBlob(t))
      )
        return t
      if (Y.isArrayBufferView(t)) return t.buffer
      if (Y.isURLSearchParams(t))
        return (
          Ms(r, 'application/x-www-form-urlencoded;charset=utf-8'), t.toString()
        )
      var s = Y.isObject(t),
        a = r && r['Content-Type'],
        n
      if ((n = Y.isFileList(t)) || (s && a === 'multipart/form-data')) {
        var i = this.env && this.env.FormData
        return ni(n ? { 'files[]': t } : t, i && new i())
      } else if (s || a === 'application/json')
        return Ms(r, 'application/json'), ui(t)
      return t
    }
  ],
  transformResponse: [
    function (t) {
      var r = this.transitional || Ft.transitional,
        s = r && r.silentJSONParsing,
        a = r && r.forcedJSONParsing,
        n = !s && this.responseType === 'json'
      if (n || (a && Y.isString(t) && t.length))
        try {
          return JSON.parse(t)
        } catch (i) {
          if (n)
            throw i.name === 'SyntaxError'
              ? ks.from(i, ks.ERR_BAD_RESPONSE, this, null, this.response)
              : i
        }
      return t
    }
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: si()
  },
  validateStatus: function (t) {
    return t >= 200 && t < 300
  },
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}
Y.forEach(['delete', 'get', 'head'], function (t) {
  Ft.headers[t] = {}
})
Y.forEach(['post', 'put', 'patch'], function (t) {
  Ft.headers[t] = Y.merge(ii)
})
var Ur = Ft,
  li = E,
  di = Ur,
  fi = function (t, r, s) {
    var a = this || di
    return (
      li.forEach(s, function (i) {
        t = i.call(a, t, r)
      }),
      t
    )
  },
  rr,
  xs
function aa() {
  return (
    xs ||
      ((xs = 1),
      (rr = function (t) {
        return !!(t && t.__CANCEL__)
      })),
    rr
  )
}
var Rs = E,
  sr = fi,
  hi = aa(),
  ci = Ur,
  mi = Tt()
function ar(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new mi()
}
var yi = function (t) {
    ar(t),
      (t.headers = t.headers || {}),
      (t.data = sr.call(t, t.data, t.headers, t.transformRequest)),
      (t.headers = Rs.merge(
        t.headers.common || {},
        t.headers[t.method] || {},
        t.headers
      )),
      Rs.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function (a) {
          delete t.headers[a]
        }
      )
    var r = t.adapter || ci.adapter
    return r(t).then(
      function (a) {
        return (
          ar(t),
          (a.data = sr.call(t, a.data, a.headers, t.transformResponse)),
          a
        )
      },
      function (a) {
        return (
          hi(a) ||
            (ar(t),
            a &&
              a.response &&
              (a.response.data = sr.call(
                t,
                a.response.data,
                a.response.headers,
                t.transformResponse
              ))),
          Promise.reject(a)
        )
      }
    )
  },
  U = E,
  na = function (t, r) {
    r = r || {}
    var s = {}
    function a(y, w) {
      return U.isPlainObject(y) && U.isPlainObject(w)
        ? U.merge(y, w)
        : U.isPlainObject(w)
        ? U.merge({}, w)
        : U.isArray(w)
        ? w.slice()
        : w
    }
    function n(y) {
      if (U.isUndefined(r[y])) {
        if (!U.isUndefined(t[y])) return a(void 0, t[y])
      } else return a(t[y], r[y])
    }
    function i(y) {
      if (!U.isUndefined(r[y])) return a(void 0, r[y])
    }
    function o(y) {
      if (U.isUndefined(r[y])) {
        if (!U.isUndefined(t[y])) return a(void 0, t[y])
      } else return a(void 0, r[y])
    }
    function u(y) {
      if (y in r) return a(t[y], r[y])
      if (y in t) return a(void 0, t[y])
    }
    var f = {
      url: i,
      method: i,
      data: i,
      baseURL: o,
      transformRequest: o,
      transformResponse: o,
      paramsSerializer: o,
      timeout: o,
      timeoutMessage: o,
      withCredentials: o,
      adapter: o,
      responseType: o,
      xsrfCookieName: o,
      xsrfHeaderName: o,
      onUploadProgress: o,
      onDownloadProgress: o,
      decompress: o,
      maxContentLength: o,
      maxBodyLength: o,
      beforeRedirect: o,
      transport: o,
      httpAgent: o,
      httpsAgent: o,
      cancelToken: o,
      socketPath: o,
      responseEncoding: o,
      validateStatus: u
    }
    return (
      U.forEach(Object.keys(t).concat(Object.keys(r)), function (w) {
        var c = f[w] || n,
          q = c(w)
        ;(U.isUndefined(q) && c !== u) || (s[w] = q)
      }),
      s
    )
  },
  nr,
  Ts
function ia() {
  return (
    Ts ||
      ((Ts = 1),
      (nr = {
        version: '0.27.2'
      })),
    nr
  )
}
var pi = ia().version,
  ye = qe,
  Wr = {}
;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
  function (e, t) {
    Wr[e] = function (s) {
      return typeof s === e || 'a' + (t < 1 ? 'n ' : ' ') + e
    }
  }
)
var Fs = {}
Wr.transitional = function (t, r, s) {
  function a(n, i) {
    return (
      '[Axios v' +
      pi +
      "] Transitional option '" +
      n +
      "'" +
      i +
      (s ? '. ' + s : '')
    )
  }
  return function (n, i, o) {
    if (t === !1)
      throw new ye(
        a(i, ' has been removed' + (r ? ' in ' + r : '')),
        ye.ERR_DEPRECATED
      )
    return (
      r &&
        !Fs[i] &&
        ((Fs[i] = !0),
        console.warn(
          a(
            i,
            ' has been deprecated since v' +
              r +
              ' and will be removed in the near future'
          )
        )),
      t ? t(n, i, o) : !0
    )
  }
}
function _i(e, t, r) {
  if (typeof e != 'object')
    throw new ye('options must be an object', ye.ERR_BAD_OPTION_VALUE)
  for (var s = Object.keys(e), a = s.length; a-- > 0; ) {
    var n = s[a],
      i = t[n]
    if (i) {
      var o = e[n],
        u = o === void 0 || i(o, n, e)
      if (u !== !0)
        throw new ye('option ' + n + ' must be ' + u, ye.ERR_BAD_OPTION_VALUE)
      continue
    }
    if (r !== !0) throw new ye('Unknown option ' + n, ye.ERR_BAD_OPTION)
  }
}
var gi = {
    assertOptions: _i,
    validators: Wr
  },
  oa = E,
  wi = Qs,
  Ys = Vn,
  Es = yi,
  Yt = na,
  vi = sa,
  ua = gi,
  Fe = ua.validators
function We(e) {
  ;(this.defaults = e),
    (this.interceptors = {
      request: new Ys(),
      response: new Ys()
    })
}
We.prototype.request = function (t, r) {
  typeof t == 'string' ? ((r = r || {}), (r.url = t)) : (r = t || {}),
    (r = Yt(this.defaults, r)),
    r.method
      ? (r.method = r.method.toLowerCase())
      : this.defaults.method
      ? (r.method = this.defaults.method.toLowerCase())
      : (r.method = 'get')
  var s = r.transitional
  s !== void 0 &&
    ua.assertOptions(
      s,
      {
        silentJSONParsing: Fe.transitional(Fe.boolean),
        forcedJSONParsing: Fe.transitional(Fe.boolean),
        clarifyTimeoutError: Fe.transitional(Fe.boolean)
      },
      !1
    )
  var a = [],
    n = !0
  this.interceptors.request.forEach(function (q) {
    ;(typeof q.runWhen == 'function' && q.runWhen(r) === !1) ||
      ((n = n && q.synchronous), a.unshift(q.fulfilled, q.rejected))
  })
  var i = []
  this.interceptors.response.forEach(function (q) {
    i.push(q.fulfilled, q.rejected)
  })
  var o
  if (!n) {
    var u = [Es, void 0]
    for (
      Array.prototype.unshift.apply(u, a),
        u = u.concat(i),
        o = Promise.resolve(r);
      u.length;

    )
      o = o.then(u.shift(), u.shift())
    return o
  }
  for (var f = r; a.length; ) {
    var y = a.shift(),
      w = a.shift()
    try {
      f = y(f)
    } catch (c) {
      w(c)
      break
    }
  }
  try {
    o = Es(f)
  } catch (c) {
    return Promise.reject(c)
  }
  for (; i.length; ) o = o.then(i.shift(), i.shift())
  return o
}
We.prototype.getUri = function (t) {
  t = Yt(this.defaults, t)
  var r = vi(t.baseURL, t.url)
  return wi(r, t.params, t.paramsSerializer)
}
oa.forEach(['delete', 'get', 'head', 'options'], function (t) {
  We.prototype[t] = function (r, s) {
    return this.request(
      Yt(s || {}, {
        method: t,
        url: r,
        data: (s || {}).data
      })
    )
  }
})
oa.forEach(['post', 'put', 'patch'], function (t) {
  function r(s) {
    return function (n, i, o) {
      return this.request(
        Yt(o || {}, {
          method: t,
          headers: s
            ? {
                'Content-Type': 'multipart/form-data'
              }
            : {},
          url: n,
          data: i
        })
      )
    }
  }
  ;(We.prototype[t] = r()), (We.prototype[t + 'Form'] = r(!0))
})
var Si = We,
  ir,
  Ps
function bi() {
  if (Ps) return ir
  Ps = 1
  var e = Tt()
  function t(r) {
    if (typeof r != 'function')
      throw new TypeError('executor must be a function.')
    var s
    this.promise = new Promise(function (i) {
      s = i
    })
    var a = this
    this.promise.then(function (n) {
      if (!!a._listeners) {
        var i,
          o = a._listeners.length
        for (i = 0; i < o; i++) a._listeners[i](n)
        a._listeners = null
      }
    }),
      (this.promise.then = function (n) {
        var i,
          o = new Promise(function (u) {
            a.subscribe(u), (i = u)
          }).then(n)
        return (
          (o.cancel = function () {
            a.unsubscribe(i)
          }),
          o
        )
      }),
      r(function (i) {
        a.reason || ((a.reason = new e(i)), s(a.reason))
      })
  }
  return (
    (t.prototype.throwIfRequested = function () {
      if (this.reason) throw this.reason
    }),
    (t.prototype.subscribe = function (s) {
      if (this.reason) {
        s(this.reason)
        return
      }
      this._listeners ? this._listeners.push(s) : (this._listeners = [s])
    }),
    (t.prototype.unsubscribe = function (s) {
      if (!!this._listeners) {
        var a = this._listeners.indexOf(s)
        a !== -1 && this._listeners.splice(a, 1)
      }
    }),
    (t.source = function () {
      var s,
        a = new t(function (i) {
          s = i
        })
      return {
        token: a,
        cancel: s
      }
    }),
    (ir = t),
    ir
  )
}
var or, Ns
function Oi() {
  return (
    Ns ||
      ((Ns = 1),
      (or = function (t) {
        return function (s) {
          return t.apply(null, s)
        }
      })),
    or
  )
}
var ur, Cs
function Di() {
  if (Cs) return ur
  Cs = 1
  var e = E
  return (
    (ur = function (r) {
      return e.isObject(r) && r.isAxiosError === !0
    }),
    ur
  )
}
var As = E,
  ki = zs,
  mt = Si,
  Mi = na,
  xi = Ur
function la(e) {
  var t = new mt(e),
    r = ki(mt.prototype.request, t)
  return (
    As.extend(r, mt.prototype, t),
    As.extend(r, t),
    (r.create = function (a) {
      return la(Mi(e, a))
    }),
    r
  )
}
var L = la(xi)
L.Axios = mt
L.CanceledError = Tt()
L.CancelToken = bi()
L.isCancel = aa()
L.VERSION = ia().version
L.toFormData = ra
L.AxiosError = qe
L.Cancel = L.CanceledError
L.all = function (t) {
  return Promise.all(t)
}
L.spread = Oi()
L.isAxiosError = Di()
Er.exports = L
Er.exports.default = L
;(function (e) {
  e.exports = Er.exports
})(Gs)
const Z = /* @__PURE__ */ Sn(Gs.exports)
class j {
  constructor() {
    S(
      this,
      'state',
      V({
        isLoading: !1,
        isLoaded: !1,
        isFailure: !1
      })
    )
  }
  get isLoading() {
    return this.state.isLoading
  }
  get isLoaded() {
    return this.state.isLoaded
  }
  get isFailure() {
    return this.state.isFailure
  }
  isState(t) {
    return this.state[t]
  }
  loading() {
    Object.assign(this.state, {
      isLoading: !0,
      isLoaded: !1,
      isFailure: !1
    })
  }
  loaded() {
    Object.assign(this.state, {
      isLoading: !1,
      isLoaded: !0,
      isFailure: !1
    })
  }
  failed() {
    Object.assign(this.state, {
      isLoading: !1,
      isLoaded: !1,
      isFailure: !0
    })
  }
  static create() {
    return new j()
  }
}
class Et {
  constructor(t = {}) {
    S(this, 'state', new j())
    S(this, 'result', Bs([]))
    S(this, 'timeout', null)
    S(this, 'options', {
      url: null,
      payload: null,
      field: null
    })
    Object.assign(this.options, t)
  }
  static create(t) {
    return new Et(t)
  }
  search(t) {
    return this.customSearch({ payload: { value: t } })
  }
  async customSearch({ url: t, payload: r }) {
    this.timeout && (this.controller.abort(), clearTimeout(this.timeout)),
      (this.controller = new AbortController()),
      (this.timeout = setTimeout(async () => {
        this.state.loading(), (this.result.value = [])
        const s = t || this.options.url,
          { data: a } = await Z.post(`${s}/search`, r || this.options.payload, {
            signal: this.controller.signal
          }).catch((n) => {
            throw (this.state.failed(), n)
          })
        ;(this.result.value = a.result), this.state.loaded()
      }, 500))
  }
  async restore(t, r) {
    this.state.loading(), (this.result.value = [])
    const s = t || this.options.url,
      { data: a } = await Z.post(
        `${s}/restore`,
        r || this.options.payload
      ).catch((n) => {
        throw (this.state.failed(), n)
      })
    return this.state.loaded(), a
  }
  getConfig() {
    return {
      data: this.result.value,
      field: this.options.field
    }
  }
}
const Ge = V({
  default: []
})
function tt() {
  return {
    createBag(e) {
      Ge[e] = []
    },
    set(e, t = 'default') {
      throw (
        (e.response &&
          e.response.data &&
          e.response.data.errors &&
          (Ge[t] = Object.keys(e.response.data.errors).map((s) => ({
            key: s,
            message: e.response.data.errors[s][0]
          }))),
        e)
      )
    },
    get(e, t = 'default') {
      const r = Ge[t]
      if (!r)
        return {
          message: '',
          variant: ''
        }
      const s = r.find((a) =>
        Array.isArray(e) ? e.includes(a.key) : a.key === e
      )
      return s
        ? {
            message: s.message,
            variant: 'danger'
          }
        : {
            message: '',
            variant: ''
          }
    },
    clear(e, t = 'default') {
      if (e) {
        const r = Ge[t]
        if (!r) {
          console.warn(`Bag ${t} is not defined.`)
          return
        }
        const s = r.findIndex((a) => a.key === e)
        r.splice(s, 1)
        return
      }
      Ge[t] = []
    }
  }
}
class da {
  constructor({
    submitPath: t,
    submitMethod: r = 'post',
    loadPath: s = '',
    bag: a = 'default',
    form: n = {}
  } = {}) {
    S(this, 'loadPath', '')
    S(this, 'submitPath', '')
    S(this, 'submitMethod', 'post')
    S(this, 'errors', null)
    S(this, 'errorBag', '')
    S(this, 'model', V({}))
    S(this, 'form', V({}))
    S(this, 'original', {})
    S(this, 'states', {
      load: new j(),
      submit: new j()
    })
    return (
      (this.submitPath = t),
      (this.submitMethod = r),
      (this.loadPath = s),
      (this.errorBag = a),
      (this.errors = tt()),
      this.errors.createBag(this.errorBag),
      this.setAttributes(n),
      this.states.load.loaded(),
      new Proxy(this, {
        get(i, o, u) {
          return Reflect.has(i, o)
            ? Reflect.get(i, o, u)
            : o in i.form
            ? i.form[o]
            : null
        },
        set(i, o, u, f) {
          return Reflect.has(i, o)
            ? Reflect.set(i, o, u, f)
            : o in i.form
            ? ((i.form[o] = u), !0)
            : null
        }
      })
    )
  }
  get isSubmitting() {
    return this.states.submit.isLoading
  }
  get isSubmitted() {
    return this.states.submit.isLoaded
  }
  get isSubmitFailed() {
    return this.states.submit.isFailure
  }
  get isLoading() {
    return this.states.load.isLoading
  }
  get isLoaded() {
    return this.states.load.isLoaded
  }
  get isFailure() {
    return this.states.load.isFailure
  }
  static create(t) {
    return new this(t)
  }
  setPath(t) {
    this.submitPath = t
  }
  setErrors(t) {
    ;(this.errorBag = t || 'default'),
      (this.errors = tt()),
      this.errors.createBag(this.errorBag)
  }
  setAttributes(t) {
    ;(this.original = JSON.parse(JSON.stringify(this.original))),
      (this.form = V({ ...t }))
  }
  getError(t) {
    return this.errors.get(t, this.errorBag)
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag)
  }
  async submit({
    path: t = this.submitPath,
    formatter: r = null,
    config: s = {}
  } = {}) {
    if (typeof t != 'string') throw new Error('Path must be a string')
    if (r !== null && typeof r != 'function')
      throw new Error('Formatter must be a function')
    if (typeof s != 'object') throw new Error('Config must be an object')
    this.clearErrors(), this.submitting()
    const a = JSON.parse(JSON.stringify(this.form)),
      n = r ? r(this.form) : a
    if (!t) return this.handleSubmissionFailure('No url defined.')
    const i = (s == null ? void 0 : s.method) || this.submitMethod || 'post'
    try {
      const { data: o } = await Z[i](t, n, s)
      return this.clearErrors(), this.submitted(), o
    } catch (o) {
      return this.handleSubmissionFailure(o)
    }
  }
  clearErrors() {
    this.errors.clear(null, this.errorBag)
  }
  handleSubmissionFailure(t) {
    throw (this.submitFailed(), this.errors.set(t, this.errorBag), t)
  }
  async advancedSubmit(t) {
    this.states.submit.loading()
    const { data: r } = await Promise.resolve(t(Z, this.form)).catch((s) => {
      throw (this.states.submit.failed(), this.errors.set(s, this.errorBag), s)
    })
    return this.states.submit.loaded(), r
  }
  async load({ path: t = '', params: r = {} } = {}) {
    this.loading()
    const s = t || this.loadPath
    if (!s)
      throw (
        (this.loadFailed(), Error('Url is not defined for the load method.'))
      )
    const { data: a } = await Z.get(s, {
      params: r
    }).catch((n) => {
      throw (this.loadFailed(), n)
    })
    return (
      Object.assign(this.form, a.form),
      a.model && Object.assign(this.model, a.model),
      this.loaded(),
      a
    )
  }
  loading() {
    this.states.load.loading()
  }
  loaded() {
    this.states.load.loaded()
  }
  loadFailed() {
    this.states.load.failed()
  }
  submitting() {
    this.states.submit.loading()
  }
  submitFailed() {
    this.states.submit.failed()
  }
  submitted() {
    this.states.submit.loaded()
  }
  reset() {
    Object.assign(this.form, this.original)
  }
}
class Ri {
  constructor() {
    S(this, 'structure', {})
    S(
      this,
      'query',
      V({
        items: [],
        perPage: 0,
        total: 0,
        isLoading: !1,
        isLoaded: !1,
        isFilterActive: !1
      })
    )
    S(
      this,
      'params',
      V({
        page: 1
      })
    )
    S(this, 'router', null)
  }
  static create(t, r = {}, s = {}, a) {
    s = Object.assign({ base: '/api/admin', route: `${t}.index` }, s)
    const n = s.base,
      i = {
        route: s.route,
        index: s.index || `${n}/${t}/index`,
        destroy: `${n}/${t}/destroy`
      },
      o = new this()
    return (
      (o.options = s),
      (o.structure = r),
      (o.params = Object.assign(o.params, r)),
      (o.router = a),
      (o.urls = i),
      o
    )
  }
  async fetch(t) {
    ;(this.query.isLoading = !0), (this.query.isLoaded = !1)
    const { data: r } = await Z.get(t || this.urls.index, {
      params: this.params
    }).catch((s) => {
      throw ((this.query.isLoading = !1), s)
    })
    return (
      await this.router.push({ name: this.urls.route, query: this.params }),
      (this.query.isLoading = !1),
      (this.query.isLoaded = !0),
      r
    )
  }
  async load(t) {
    const r = await this.fetch(t)
    return (
      Object.assign(this.query, r.query, {
        items: r.query.items.map((s) => ({
          ...s,
          isProcessing: !1
        }))
      }),
      r
    )
  }
  onPageChange(t) {
    return (this.params.page = t), this.load()
  }
  async action(t, { row: r, index: s, remove: a, method: n }, i = {}) {
    r.isProcessing = !0
    const o = {
      id: r.id,
      ...i
    }
    if (n === 'delete') {
      const { data: u } = await Z.delete(t, {
        data: o
      }).catch((f) => {
        throw ((r.isProcessing = !1), f)
      })
      ;(r.isProcessing = !1), u.row && Object.assign(r, u.row)
    } else {
      const { data: u } = await Z.post(t, o).catch((f) => {
        throw ((r.isProcessing = !1), f)
      })
      ;(r.isProcessing = !1), u.row && Object.assign(r, u.row)
    }
    if (a) {
      const u = await this.fetch()
      if ((this.query.items.splice(s, 1), !u.query.items.length)) {
        this.params.page--, await this.load()
        return
      }
      this.query.items.length < u.query.items.length &&
        this.query.items.push(u.query.items[u.query.items.length - 1])
    }
  }
  destroy(t, r) {
    return this.action(this.urls.destroy, { ...t, remove: !0 }, r)
  }
  async resetFilter(t = null) {
    Object.assign(this.params, this.structure),
      (this.query.isFilterActive = !1),
      await this.load(t)
  }
}
const fa = '%[a-f0-9]{2}',
  Ls = new RegExp('(' + fa + ')|([^%]+?)', 'gi'),
  Us = new RegExp('(' + fa + ')+', 'gi')
function yr(e, t) {
  try {
    return [decodeURIComponent(e.join(''))]
  } catch {}
  if (e.length === 1) return e
  t = t || 1
  const r = e.slice(0, t),
    s = e.slice(t)
  return Array.prototype.concat.call([], yr(r), yr(s))
}
function Ti(e) {
  try {
    return decodeURIComponent(e)
  } catch {
    let t = e.match(Ls) || []
    for (let r = 1; r < t.length; r++)
      (e = yr(t, r).join('')), (t = e.match(Ls) || [])
    return e
  }
}
function Fi(e) {
  const t = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  }
  let r = Us.exec(e)
  for (; r; ) {
    try {
      t[r[0]] = decodeURIComponent(r[0])
    } catch {
      const a = Ti(r[0])
      a !== r[0] && (t[r[0]] = a)
    }
    r = Us.exec(e)
  }
  t['%C2'] = '\uFFFD'
  const s = Object.keys(t)
  for (const a of s) e = e.replace(new RegExp(a, 'g'), t[a])
  return e
}
function Yi(e) {
  if (typeof e != 'string')
    throw new TypeError(
      'Expected `encodedURI` to be of type `string`, got `' + typeof e + '`'
    )
  try {
    return decodeURIComponent(e)
  } catch {
    return Fi(e)
  }
}
function ha(e, t) {
  if (!(typeof e == 'string' && typeof t == 'string'))
    throw new TypeError('Expected the arguments to be of type `string`')
  if (e === '' || t === '') return []
  const r = e.indexOf(t)
  return r === -1 ? [] : [e.slice(0, r), e.slice(r + t.length)]
}
function Ei(e, t) {
  const r = {}
  if (Array.isArray(t))
    for (const s of t) {
      const a = Object.getOwnPropertyDescriptor(e, s)
      a != null && a.enumerable && Object.defineProperty(r, s, a)
    }
  else
    for (const s of Reflect.ownKeys(e)) {
      const a = Object.getOwnPropertyDescriptor(e, s)
      if (a.enumerable) {
        const n = e[s]
        t(s, n, e) && Object.defineProperty(r, s, a)
      }
    }
  return r
}
const Pi = (e) => e == null,
  Ni = (e) =>
    encodeURIComponent(e).replace(
      /[!'()*]/g,
      (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`
    ),
  pr = Symbol('encodeFragmentIdentifier')
function Ci(e) {
  switch (e.arrayFormat) {
    case 'index':
      return (t) => (r, s) => {
        const a = r.length
        return s === void 0 ||
          (e.skipNull && s === null) ||
          (e.skipEmptyString && s === '')
          ? r
          : s === null
          ? [...r, [T(t, e), '[', a, ']'].join('')]
          : [...r, [T(t, e), '[', T(a, e), ']=', T(s, e)].join('')]
      }
    case 'bracket':
      return (t) => (r, s) =>
        s === void 0 ||
        (e.skipNull && s === null) ||
        (e.skipEmptyString && s === '')
          ? r
          : s === null
          ? [...r, [T(t, e), '[]'].join('')]
          : [...r, [T(t, e), '[]=', T(s, e)].join('')]
    case 'colon-list-separator':
      return (t) => (r, s) =>
        s === void 0 ||
        (e.skipNull && s === null) ||
        (e.skipEmptyString && s === '')
          ? r
          : s === null
          ? [...r, [T(t, e), ':list='].join('')]
          : [...r, [T(t, e), ':list=', T(s, e)].join('')]
    case 'comma':
    case 'separator':
    case 'bracket-separator': {
      const t = e.arrayFormat === 'bracket-separator' ? '[]=' : '='
      return (r) => (s, a) =>
        a === void 0 ||
        (e.skipNull && a === null) ||
        (e.skipEmptyString && a === '')
          ? s
          : ((a = a === null ? '' : a),
            s.length === 0
              ? [[T(r, e), t, T(a, e)].join('')]
              : [[s, T(a, e)].join(e.arrayFormatSeparator)])
    }
    default:
      return (t) => (r, s) =>
        s === void 0 ||
        (e.skipNull && s === null) ||
        (e.skipEmptyString && s === '')
          ? r
          : s === null
          ? [...r, T(t, e)]
          : [...r, [T(t, e), '=', T(s, e)].join('')]
  }
}
function Ai(e) {
  let t
  switch (e.arrayFormat) {
    case 'index':
      return (r, s, a) => {
        if (((t = /\[(\d*)]$/.exec(r)), (r = r.replace(/\[\d*]$/, '')), !t)) {
          a[r] = s
          return
        }
        a[r] === void 0 && (a[r] = {}), (a[r][t[1]] = s)
      }
    case 'bracket':
      return (r, s, a) => {
        if (((t = /(\[])$/.exec(r)), (r = r.replace(/\[]$/, '')), !t)) {
          a[r] = s
          return
        }
        if (a[r] === void 0) {
          a[r] = [s]
          return
        }
        a[r] = [...a[r], s]
      }
    case 'colon-list-separator':
      return (r, s, a) => {
        if (((t = /(:list)$/.exec(r)), (r = r.replace(/:list$/, '')), !t)) {
          a[r] = s
          return
        }
        if (a[r] === void 0) {
          a[r] = [s]
          return
        }
        a[r] = [...a[r], s]
      }
    case 'comma':
    case 'separator':
      return (r, s, a) => {
        const n = typeof s == 'string' && s.includes(e.arrayFormatSeparator),
          i =
            typeof s == 'string' &&
            !n &&
            oe(s, e).includes(e.arrayFormatSeparator)
        s = i ? oe(s, e) : s
        const o =
          n || i
            ? s.split(e.arrayFormatSeparator).map((u) => oe(u, e))
            : s === null
            ? s
            : oe(s, e)
        a[r] = o
      }
    case 'bracket-separator':
      return (r, s, a) => {
        const n = /(\[])$/.test(r)
        if (((r = r.replace(/\[]$/, '')), !n)) {
          a[r] = s && oe(s, e)
          return
        }
        const i =
          s === null ? [] : s.split(e.arrayFormatSeparator).map((o) => oe(o, e))
        if (a[r] === void 0) {
          a[r] = i
          return
        }
        a[r] = [...a[r], ...i]
      }
    default:
      return (r, s, a) => {
        if (a[r] === void 0) {
          a[r] = s
          return
        }
        a[r] = [...[a[r]].flat(), s]
      }
  }
}
function ca(e) {
  if (typeof e != 'string' || e.length !== 1)
    throw new TypeError('arrayFormatSeparator must be single character string')
}
function T(e, t) {
  return t.encode ? (t.strict ? Ni(e) : encodeURIComponent(e)) : e
}
function oe(e, t) {
  return t.decode ? Yi(e) : e
}
function ma(e) {
  return Array.isArray(e)
    ? e.sort()
    : typeof e == 'object'
    ? ma(Object.keys(e))
        .sort((t, r) => Number(t) - Number(r))
        .map((t) => e[t])
    : e
}
function ya(e) {
  const t = e.indexOf('#')
  return t !== -1 && (e = e.slice(0, t)), e
}
function Li(e) {
  let t = ''
  const r = e.indexOf('#')
  return r !== -1 && (t = e.slice(r)), t
}
function Ws(e, t) {
  return (
    t.parseNumbers &&
    !Number.isNaN(Number(e)) &&
    typeof e == 'string' &&
    e.trim() !== ''
      ? (e = Number(e))
      : t.parseBooleans &&
        e !== null &&
        (e.toLowerCase() === 'true' || e.toLowerCase() === 'false') &&
        (e = e.toLowerCase() === 'true'),
    e
  )
}
function Ir(e) {
  e = ya(e)
  const t = e.indexOf('?')
  return t === -1 ? '' : e.slice(t + 1)
}
function qr(e, t) {
  ;(t = {
    decode: !0,
    sort: !0,
    arrayFormat: 'none',
    arrayFormatSeparator: ',',
    parseNumbers: !1,
    parseBooleans: !1,
    ...t
  }),
    ca(t.arrayFormatSeparator)
  const r = Ai(t),
    s = /* @__PURE__ */ Object.create(null)
  if (typeof e != 'string' || ((e = e.trim().replace(/^[?#&]/, '')), !e))
    return s
  for (const a of e.split('&')) {
    if (a === '') continue
    const n = t.decode ? a.replace(/\+/g, ' ') : a
    let [i, o] = ha(n, '=')
    i === void 0 && (i = n),
      (o =
        o === void 0
          ? null
          : ['comma', 'separator', 'bracket-separator'].includes(t.arrayFormat)
          ? o
          : oe(o, t)),
      r(oe(i, t), o, s)
  }
  for (const [a, n] of Object.entries(s))
    if (typeof n == 'object' && n !== null)
      for (const [i, o] of Object.entries(n)) n[i] = Ws(o, t)
    else s[a] = Ws(n, t)
  return t.sort === !1
    ? s
    : (t.sort === !0
        ? Object.keys(s).sort()
        : Object.keys(s).sort(t.sort)
      ).reduce((a, n) => {
        const i = s[n]
        return (
          Boolean(i) && typeof i == 'object' && !Array.isArray(i)
            ? (a[n] = ma(i))
            : (a[n] = i),
          a
        )
      }, /* @__PURE__ */ Object.create(null))
}
function pa(e, t) {
  if (!e) return ''
  ;(t = {
    encode: !0,
    strict: !0,
    arrayFormat: 'none',
    arrayFormatSeparator: ',',
    ...t
  }),
    ca(t.arrayFormatSeparator)
  const r = (i) =>
      (t.skipNull && Pi(e[i])) || (t.skipEmptyString && e[i] === ''),
    s = Ci(t),
    a = {}
  for (const [i, o] of Object.entries(e)) r(i) || (a[i] = o)
  const n = Object.keys(a)
  return (
    t.sort !== !1 && n.sort(t.sort),
    n
      .map((i) => {
        const o = e[i]
        return o === void 0
          ? ''
          : o === null
          ? T(i, t)
          : Array.isArray(o)
          ? o.length === 0 && t.arrayFormat === 'bracket-separator'
            ? T(i, t) + '[]'
            : o.reduce(s(i), []).join('&')
          : T(i, t) + '=' + T(o, t)
      })
      .filter((i) => i.length > 0)
      .join('&')
  )
}
function _a(e, t) {
  var a, n
  t = {
    decode: !0,
    ...t
  }
  let [r, s] = ha(e, '#')
  return (
    r === void 0 && (r = e),
    {
      url:
        (n = (a = r == null ? void 0 : r.split('?')) == null ? void 0 : a[0]) !=
        null
          ? n
          : '',
      query: qr(Ir(e), t),
      ...(t && t.parseFragmentIdentifier && s
        ? { fragmentIdentifier: oe(s, t) }
        : {})
    }
  )
}
function ga(e, t) {
  t = {
    encode: !0,
    strict: !0,
    [pr]: !0,
    ...t
  }
  const r = ya(e.url).split('?')[0] || '',
    s = Ir(e.url),
    a = {
      ...qr(s, { sort: !1 }),
      ...e.query
    }
  let n = pa(a, t)
  n && (n = `?${n}`)
  let i = Li(e.url)
  if (e.fragmentIdentifier) {
    const o = new URL(r)
    ;(o.hash = e.fragmentIdentifier),
      (i = t[pr] ? o.hash : `#${e.fragmentIdentifier}`)
  }
  return `${r}${n}${i}`
}
function wa(e, t, r) {
  r = {
    parseFragmentIdentifier: !0,
    [pr]: !1,
    ...r
  }
  const { url: s, query: a, fragmentIdentifier: n } = _a(e, r)
  return ga(
    {
      url: s,
      query: Ei(a, t),
      fragmentIdentifier: n
    },
    r
  )
}
function Ui(e, t, r) {
  const s = Array.isArray(t) ? (a) => !t.includes(a) : (a, n) => !t(a, n)
  return wa(e, s, r)
}
const Is = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      extract: Ir,
      parse: qr,
      stringify: pa,
      parseUrl: _a,
      stringifyUrl: ga,
      pick: wa,
      exclude: Ui
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
)
let dt
class $r {
  constructor() {
    S(this, 'api', null)
    S(this, 'baseUrl', null)
    S(this, 'structure', null)
    S(this, 'options', null)
    S(this, 'errors', null)
    S(this, 'errorBag', 'default')
    S(this, 'states', {
      load: j.create(),
      fetch: j.create(),
      filter: j.create()
    })
    S(
      this,
      'query',
      V({
        items: [],
        showing: 0,
        perPage: 0,
        total: 0
      })
    )
    S(
      this,
      'params',
      V({
        page: 1
      })
    )
    S(
      this,
      'state',
      V({
        isFilterActive: !1
      })
    )
  }
  get tableConfig() {
    return {
      data: this.query.items,
      total: this.query.total,
      perPage: this.query.perPage,
      loading: this.isLoading
    }
  }
  get isLoading() {
    return this.states.fetch.isLoading
  }
  get isLoaded() {
    return this.states.fetch.isLoaded
  }
  get isFailure() {
    return this.states.fetch.isFailure
  }
  get isFilterLoading() {
    return this.states.filter.isLoading
  }
  get isFilterActive() {
    return this.state.isFilterActive
  }
  static create(t, r) {
    if (!r) throw Error('Listing options have not been provided.')
    const s = new $r()
    if (!t) throw Error('Structure of search query required.')
    return (
      (s.errors = tt()),
      s.errors.createBag(this.errorBag),
      (s.options = Object.assign(
        {
          enableSearchUpdate: !0,
          transformItem: (a) => a
        },
        r
      )),
      s.setParameters(t),
      s.options.enableSearchUpdate && s.mergeSearch(),
      (s.baseUrl = r.baseUrl),
      (s.api = Z.create(r.axios || {})),
      s
    )
  }
  setParameters(t) {
    const r = JSON.parse(JSON.stringify(t))
    ;(this.structure = Object.assign({}, r)), (this.params = V(t))
  }
  mergeSearch() {
    const t = Is.parse(window.location.search, {
      arrayFormat: 'bracket'
    })
    Object.assign(this.params, this.structure, t)
  }
  async fetch(t, r) {
    this.states.fetch.loading()
    const s = JSON.parse(JSON.stringify(this.params)),
      a = t || this.baseUrl,
      { data: n } = await this.api
        .get(a, {
          params: s,
          cancelToken: r
        })
        .catch((i) => {
          throw (this.states.fetch.failed(), i)
        })
    return (
      this.states.fetch.loaded(),
      this.options.enableSearchUpdate && this.refreshUrl(),
      n
    )
  }
  async reload(t) {
    const { data: r } = await this.api.get(t || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.params))
    })
    return (
      Object.assign(this.query, r.query, {
        items: r.query.items.map((s) => this.transformItem(s))
      }),
      r
    )
  }
  refreshUrl() {
    const t = window.location.href.replace(/\?.*/, ''),
      r = JSON.parse(JSON.stringify(this.params)),
      s = t + '?' + Is.stringify(r, { arrayFormat: 'bracket' })
    window.history.replaceState({}, '', s)
  }
  push(t) {
    this.query.items.push(this.transformItem(t))
  }
  transformItem(t) {
    return this.options.transformItem({
      ...t,
      states: {
        delete: new j(),
        patch: new j()
      }
    })
  }
  async load(t) {
    this.errors.clear(null, this.errorBag),
      dt && dt.cancel(),
      (dt = Z.CancelToken.source()),
      this.states.fetch.loading(),
      (this.query.items = []),
      (this.query.total = 0),
      (this.query.showing = 0)
    let r = null
    try {
      r = await this.fetch(t, dt.token)
    } catch (s) {
      if (Z.isCancel(s)) {
        console.log('Request cancelled')
        return
      } else
        throw (this.states.fetch.failed(), this.errors.set(s, this.errorBag), s)
    }
    if ((this.states.fetch.loaded(), !r || !r.query || !r.query.items))
      throw (this.states.fetch.failed(), Error('Response format is invalid.'))
    return (
      Object.assign(this.query, r.query, {
        items: r.query.items.map((s) => this.transformItem(s))
      }),
      r
    )
  }
  onPageChange(t) {
    return (this.params.page = t), this.load()
  }
  async patch(t) {
    const { path: r, props: s, attributes: a } = t,
      { row: n } = s,
      i = {
        id: n.id,
        ...a
      },
      { data: o } = await this.api.patch(r || this.baseUrl, i).catch((f) => {
        throw f
      })
    return (
      o.patch && Object.assign(n, o.patch),
      (await this.fetch()).query.items.length ||
        (this.params.page--, await this.load()),
      o
    )
  }
  async delete(t) {
    const { path: r, props: s, attributes: a } = t,
      { row: n, index: i } = s,
      o = {
        id: n.id,
        ...a
      }
    n.states.delete.loading()
    const { data: u } = await this.api
      .delete(r || this.baseUrl, {
        data: o
      })
      .catch((y) => {
        throw (n.states.delete.failed(), y)
      })
    n.states.delete.loaded(), u.row && Object.assign(n, u.row)
    const f = await this.fetch()
    if ((this.query.items.splice(i, 1), !f.query.items.length))
      return this.params.page--, await this.load(), u
    if (this.query.items.length < f.query.items.length) {
      const y = f.query.items[f.query.items.length - 1]
      this.push(y)
    }
    return u
  }
  async applyFilter() {
    this.states.filter.loading(),
      await this.load().catch((t) => {
        throw (this.states.filter.failed(), t)
      }),
      this.states.filter.loaded(),
      (this.state.isFilterActive = !1)
  }
  showFilter() {
    this.state.isFilterActive = !0
  }
  cancelFilter() {
    this.state.isFilterActive = !1
  }
  async resetFilter(t = 'url', r = null) {
    t === 'url'
      ? this.mergeSearch()
      : t === 'initial' && Object.assign(this.params, this.structure),
      (this.state.isFilterActive = !1),
      await this.load(r)
  }
  getError(t) {
    return this.errors.get(t, this.errorBag)
  }
  clearError(t) {
    this.errors.clear(t, this.errorBag)
  }
}
const we = (e, t) => {
    const r = e.__vccOpts || e
    for (const [s, a] of t) r[s] = a
    return r
  },
  Wi = {
    name: 'WyxosButton',
    props: {
      loading: {
        default: !1,
        type: Boolean
      }
    }
  },
  Ii = /* @__PURE__ */ et('Submit'),
  qi = /* @__PURE__ */ et('Processing...'),
  $i = {
    key: 2,
    class: 'fas fa-spinner fa-spin'
  }
function ji(e, t, r, s, a, n) {
  const i = fe('o-button')
  return (
    te(),
    Ie(
      i,
      { disabled: r.loading },
      {
        default: Ne(() => [
          r.loading
            ? Ze('', !0)
            : gt(e.$slots, 'default', { key: 0 }, () => [Ii]),
          r.loading
            ? gt(e.$slots, 'loading', { key: 1 }, () => [qi])
            : Ze('', !0),
          r.loading ? (te(), wt('i', $i)) : Ze('', !0)
        ]),
        _: 3
      },
      8,
      ['disabled']
    )
  )
}
const _r = /* @__PURE__ */ we(Wi, [['render', ji]]),
  Vi = {
    name: 'WyxosCollection',
    props: {
      modelValue: {
        required: !0,
        type: Array
      }
    },
    emits: ['update:modelValue'],
    data() {
      return {
        items: []
      }
    },
    mounted() {
      this.items = this.modelValue
    },
    methods: {
      add(e) {
        this.items.push(e), this.$emit('update:modelValue', this.items)
      },
      remove(e) {
        this.items.splice(e, 1), this.$emit('update:modelValue', this.items)
      }
    }
  },
  Hi = /* @__PURE__ */ Qe('ul', null, [/* @__PURE__ */ Qe('li')], -1)
function Bi(e, t, r, s, a, n) {
  return gt(
    e.$slots,
    'default',
    gn(wn({ add: n.add, remove: n.remove, items: a.items })),
    () => [Hi]
  )
}
const gr = /* @__PURE__ */ we(Vi, [['render', Bi]])
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var va
function d() {
  return va.apply(null, arguments)
}
function Gi(e) {
  va = e
}
function Q(e) {
  return (
    e instanceof Array || Object.prototype.toString.call(e) === '[object Array]'
  )
}
function Oe(e) {
  return e != null && Object.prototype.toString.call(e) === '[object Object]'
}
function b(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t)
}
function jr(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0
  var t
  for (t in e) if (b(e, t)) return !1
  return !0
}
function A(e) {
  return e === void 0
}
function he(e) {
  return (
    typeof e == 'number' ||
    Object.prototype.toString.call(e) === '[object Number]'
  )
}
function nt(e) {
  return (
    e instanceof Date || Object.prototype.toString.call(e) === '[object Date]'
  )
}
function Sa(e, t) {
  var r = [],
    s,
    a = e.length
  for (s = 0; s < a; ++s) r.push(t(e[s], s))
  return r
}
function pe(e, t) {
  for (var r in t) b(t, r) && (e[r] = t[r])
  return (
    b(t, 'toString') && (e.toString = t.toString),
    b(t, 'valueOf') && (e.valueOf = t.valueOf),
    e
  )
}
function se(e, t, r, s) {
  return Ha(e, t, r, s, !0).utc()
}
function zi() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  }
}
function _(e) {
  return e._pf == null && (e._pf = zi()), e._pf
}
var wr
Array.prototype.some
  ? (wr = Array.prototype.some)
  : (wr = function (e) {
      var t = Object(this),
        r = t.length >>> 0,
        s
      for (s = 0; s < r; s++) if (s in t && e.call(this, t[s], s, t)) return !0
      return !1
    })
function Vr(e) {
  if (e._isValid == null) {
    var t = _(e),
      r = wr.call(t.parsedDateParts, function (a) {
        return a != null
      }),
      s =
        !isNaN(e._d.getTime()) &&
        t.overflow < 0 &&
        !t.empty &&
        !t.invalidEra &&
        !t.invalidMonth &&
        !t.invalidWeekday &&
        !t.weekdayMismatch &&
        !t.nullInput &&
        !t.invalidFormat &&
        !t.userInvalidated &&
        (!t.meridiem || (t.meridiem && r))
    if (
      (e._strict &&
        (s =
          s &&
          t.charsLeftOver === 0 &&
          t.unusedTokens.length === 0 &&
          t.bigHour === void 0),
      Object.isFrozen == null || !Object.isFrozen(e))
    )
      e._isValid = s
    else return s
  }
  return e._isValid
}
function Pt(e) {
  var t = se(NaN)
  return e != null ? pe(_(t), e) : (_(t).userInvalidated = !0), t
}
var qs = (d.momentProperties = []),
  lr = !1
function Hr(e, t) {
  var r,
    s,
    a,
    n = qs.length
  if (
    (A(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
    A(t._i) || (e._i = t._i),
    A(t._f) || (e._f = t._f),
    A(t._l) || (e._l = t._l),
    A(t._strict) || (e._strict = t._strict),
    A(t._tzm) || (e._tzm = t._tzm),
    A(t._isUTC) || (e._isUTC = t._isUTC),
    A(t._offset) || (e._offset = t._offset),
    A(t._pf) || (e._pf = _(t)),
    A(t._locale) || (e._locale = t._locale),
    n > 0)
  )
    for (r = 0; r < n; r++) (s = qs[r]), (a = t[s]), A(a) || (e[s] = a)
  return e
}
function it(e) {
  Hr(this, e),
    (this._d = new Date(e._d != null ? e._d.getTime() : NaN)),
    this.isValid() || (this._d = new Date(NaN)),
    lr === !1 && ((lr = !0), d.updateOffset(this), (lr = !1))
}
function X(e) {
  return e instanceof it || (e != null && e._isAMomentObject != null)
}
function ba(e) {
  d.suppressDeprecationWarnings === !1 &&
    typeof console < 'u' &&
    console.warn &&
    console.warn('Deprecation warning: ' + e)
}
function H(e, t) {
  var r = !0
  return pe(function () {
    if ((d.deprecationHandler != null && d.deprecationHandler(null, e), r)) {
      var s = [],
        a,
        n,
        i,
        o = arguments.length
      for (n = 0; n < o; n++) {
        if (((a = ''), typeof arguments[n] == 'object')) {
          a +=
            `
[` +
            n +
            '] '
          for (i in arguments[0])
            b(arguments[0], i) && (a += i + ': ' + arguments[0][i] + ', ')
          a = a.slice(0, -2)
        } else a = arguments[n]
        s.push(a)
      }
      ba(
        e +
          `
Arguments: ` +
          Array.prototype.slice.call(s).join('') +
          `
` +
          new Error().stack
      ),
        (r = !1)
    }
    return t.apply(this, arguments)
  }, t)
}
var $s = {}
function Oa(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t),
    $s[e] || (ba(t), ($s[e] = !0))
}
d.suppressDeprecationWarnings = !1
d.deprecationHandler = null
function ae(e) {
  return (
    (typeof Function < 'u' && e instanceof Function) ||
    Object.prototype.toString.call(e) === '[object Function]'
  )
}
function Ji(e) {
  var t, r
  for (r in e)
    b(e, r) && ((t = e[r]), ae(t) ? (this[r] = t) : (this['_' + r] = t))
  ;(this._config = e),
    (this._dayOfMonthOrdinalParseLenient = new RegExp(
      (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
        '|' +
        /\d{1,2}/.source
    ))
}
function vr(e, t) {
  var r = pe({}, e),
    s
  for (s in t)
    b(t, s) &&
      (Oe(e[s]) && Oe(t[s])
        ? ((r[s] = {}), pe(r[s], e[s]), pe(r[s], t[s]))
        : t[s] != null
        ? (r[s] = t[s])
        : delete r[s])
  for (s in e) b(e, s) && !b(t, s) && Oe(e[s]) && (r[s] = pe({}, r[s]))
  return r
}
function Br(e) {
  e != null && this.set(e)
}
var Sr
Object.keys
  ? (Sr = Object.keys)
  : (Sr = function (e) {
      var t,
        r = []
      for (t in e) b(e, t) && r.push(t)
      return r
    })
var Zi = {
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  nextWeek: 'dddd [at] LT',
  lastDay: '[Yesterday at] LT',
  lastWeek: '[Last] dddd [at] LT',
  sameElse: 'L'
}
function Qi(e, t, r) {
  var s = this._calendar[e] || this._calendar.sameElse
  return ae(s) ? s.call(t, r) : s
}
function re(e, t, r) {
  var s = '' + Math.abs(e),
    a = t - s.length,
    n = e >= 0
  return (
    (n ? (r ? '+' : '') : '-') +
    Math.pow(10, Math.max(0, a)).toString().substr(1) +
    s
  )
}
var Gr =
    /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
  ft = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
  dr = {},
  Ce = {}
function m(e, t, r, s) {
  var a = s
  typeof s == 'string' &&
    (a = function () {
      return this[s]()
    }),
    e && (Ce[e] = a),
    t &&
      (Ce[t[0]] = function () {
        return re(a.apply(this, arguments), t[1], t[2])
      }),
    r &&
      (Ce[r] = function () {
        return this.localeData().ordinal(a.apply(this, arguments), e)
      })
}
function Xi(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, '') : e.replace(/\\/g, '')
}
function Ki(e) {
  var t = e.match(Gr),
    r,
    s
  for (r = 0, s = t.length; r < s; r++)
    Ce[t[r]] ? (t[r] = Ce[t[r]]) : (t[r] = Xi(t[r]))
  return function (a) {
    var n = '',
      i
    for (i = 0; i < s; i++) n += ae(t[i]) ? t[i].call(a, e) : t[i]
    return n
  }
}
function yt(e, t) {
  return e.isValid()
    ? ((t = Da(t, e.localeData())), (dr[t] = dr[t] || Ki(t)), dr[t](e))
    : e.localeData().invalidDate()
}
function Da(e, t) {
  var r = 5
  function s(a) {
    return t.longDateFormat(a) || a
  }
  for (ft.lastIndex = 0; r >= 0 && ft.test(e); )
    (e = e.replace(ft, s)), (ft.lastIndex = 0), (r -= 1)
  return e
}
var eo = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A'
}
function to(e) {
  var t = this._longDateFormat[e],
    r = this._longDateFormat[e.toUpperCase()]
  return t || !r
    ? t
    : ((this._longDateFormat[e] = r
        .match(Gr)
        .map(function (s) {
          return s === 'MMMM' || s === 'MM' || s === 'DD' || s === 'dddd'
            ? s.slice(1)
            : s
        })
        .join('')),
      this._longDateFormat[e])
}
var ro = 'Invalid date'
function so() {
  return this._invalidDate
}
var ao = '%d',
  no = /\d{1,2}/
function io(e) {
  return this._ordinal.replace('%d', e)
}
var oo = {
  future: 'in %s',
  past: '%s ago',
  s: 'a few seconds',
  ss: '%d seconds',
  m: 'a minute',
  mm: '%d minutes',
  h: 'an hour',
  hh: '%d hours',
  d: 'a day',
  dd: '%d days',
  w: 'a week',
  ww: '%d weeks',
  M: 'a month',
  MM: '%d months',
  y: 'a year',
  yy: '%d years'
}
function uo(e, t, r, s) {
  var a = this._relativeTime[r]
  return ae(a) ? a(e, t, r, s) : a.replace(/%d/i, e)
}
function lo(e, t) {
  var r = this._relativeTime[e > 0 ? 'future' : 'past']
  return ae(r) ? r(t) : r.replace(/%s/i, t)
}
var Xe = {}
function N(e, t) {
  var r = e.toLowerCase()
  Xe[r] = Xe[r + 's'] = Xe[t] = e
}
function B(e) {
  return typeof e == 'string' ? Xe[e] || Xe[e.toLowerCase()] : void 0
}
function zr(e) {
  var t = {},
    r,
    s
  for (s in e) b(e, s) && ((r = B(s)), r && (t[r] = e[s]))
  return t
}
var ka = {}
function C(e, t) {
  ka[e] = t
}
function fo(e) {
  var t = [],
    r
  for (r in e) b(e, r) && t.push({ unit: r, priority: ka[r] })
  return (
    t.sort(function (s, a) {
      return s.priority - a.priority
    }),
    t
  )
}
function Nt(e) {
  return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0
}
function $(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
}
function g(e) {
  var t = +e,
    r = 0
  return t !== 0 && isFinite(t) && (r = $(t)), r
}
function $e(e, t) {
  return function (r) {
    return r != null
      ? (Ma(this, e, r), d.updateOffset(this, t), this)
      : bt(this, e)
  }
}
function bt(e, t) {
  return e.isValid() ? e._d['get' + (e._isUTC ? 'UTC' : '') + t]() : NaN
}
function Ma(e, t, r) {
  e.isValid() &&
    !isNaN(r) &&
    (t === 'FullYear' && Nt(e.year()) && e.month() === 1 && e.date() === 29
      ? ((r = g(r)),
        e._d['set' + (e._isUTC ? 'UTC' : '') + t](
          r,
          e.month(),
          It(r, e.month())
        ))
      : e._d['set' + (e._isUTC ? 'UTC' : '') + t](r))
}
function ho(e) {
  return (e = B(e)), ae(this[e]) ? this[e]() : this
}
function co(e, t) {
  if (typeof e == 'object') {
    e = zr(e)
    var r = fo(e),
      s,
      a = r.length
    for (s = 0; s < a; s++) this[r[s].unit](e[r[s].unit])
  } else if (((e = B(e)), ae(this[e]))) return this[e](t)
  return this
}
var xa = /\d/,
  I = /\d\d/,
  Ra = /\d{3}/,
  Jr = /\d{4}/,
  Ct = /[+-]?\d{6}/,
  M = /\d\d?/,
  Ta = /\d\d\d\d?/,
  Fa = /\d\d\d\d\d\d?/,
  At = /\d{1,3}/,
  Zr = /\d{1,4}/,
  Lt = /[+-]?\d{1,6}/,
  je = /\d+/,
  Ut = /[+-]?\d+/,
  mo = /Z|[+-]\d\d:?\d\d/gi,
  Wt = /Z|[+-]\d\d(?::?\d\d)?/gi,
  yo = /[+-]?\d+(\.\d{1,3})?/,
  ot =
    /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
  Ot
Ot = {}
function h(e, t, r) {
  Ot[e] = ae(t)
    ? t
    : function (s, a) {
        return s && r ? r : t
      }
}
function po(e, t) {
  return b(Ot, e) ? Ot[e](t._strict, t._locale) : new RegExp(_o(e))
}
function _o(e) {
  return W(
    e
      .replace('\\', '')
      .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, r, s, a, n) {
        return r || s || a || n
      })
  )
}
function W(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
var br = {}
function D(e, t) {
  var r,
    s = t,
    a
  for (
    typeof e == 'string' && (e = [e]),
      he(t) &&
        (s = function (n, i) {
          i[t] = g(n)
        }),
      a = e.length,
      r = 0;
    r < a;
    r++
  )
    br[e[r]] = s
}
function ut(e, t) {
  D(e, function (r, s, a, n) {
    ;(a._w = a._w || {}), t(r, a._w, a, n)
  })
}
function go(e, t, r) {
  t != null && b(br, e) && br[e](t, r._a, r, e)
}
var P = 0,
  ue = 1,
  ee = 2,
  F = 3,
  J = 4,
  le = 5,
  be = 6,
  wo = 7,
  vo = 8
function So(e, t) {
  return ((e % t) + t) % t
}
var R
Array.prototype.indexOf
  ? (R = Array.prototype.indexOf)
  : (R = function (e) {
      var t
      for (t = 0; t < this.length; ++t) if (this[t] === e) return t
      return -1
    })
function It(e, t) {
  if (isNaN(e) || isNaN(t)) return NaN
  var r = So(t, 12)
  return (e += (t - r) / 12), r === 1 ? (Nt(e) ? 29 : 28) : 31 - ((r % 7) % 2)
}
m('M', ['MM', 2], 'Mo', function () {
  return this.month() + 1
})
m('MMM', 0, 0, function (e) {
  return this.localeData().monthsShort(this, e)
})
m('MMMM', 0, 0, function (e) {
  return this.localeData().months(this, e)
})
N('month', 'M')
C('month', 8)
h('M', M)
h('MM', M, I)
h('MMM', function (e, t) {
  return t.monthsShortRegex(e)
})
h('MMMM', function (e, t) {
  return t.monthsRegex(e)
})
D(['M', 'MM'], function (e, t) {
  t[ue] = g(e) - 1
})
D(['MMM', 'MMMM'], function (e, t, r, s) {
  var a = r._locale.monthsParse(e, s, r._strict)
  a != null ? (t[ue] = a) : (_(r).invalidMonth = e)
})
var bo =
    'January_February_March_April_May_June_July_August_September_October_November_December'.split(
      '_'
    ),
  Ya = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  Ea = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
  Oo = ot,
  Do = ot
function ko(e, t) {
  return e
    ? Q(this._months)
      ? this._months[e.month()]
      : this._months[
          (this._months.isFormat || Ea).test(t) ? 'format' : 'standalone'
        ][e.month()]
    : Q(this._months)
    ? this._months
    : this._months.standalone
}
function Mo(e, t) {
  return e
    ? Q(this._monthsShort)
      ? this._monthsShort[e.month()]
      : this._monthsShort[Ea.test(t) ? 'format' : 'standalone'][e.month()]
    : Q(this._monthsShort)
    ? this._monthsShort
    : this._monthsShort.standalone
}
function xo(e, t, r) {
  var s,
    a,
    n,
    i = e.toLocaleLowerCase()
  if (!this._monthsParse)
    for (
      this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = [],
        s = 0;
      s < 12;
      ++s
    )
      (n = se([2e3, s])),
        (this._shortMonthsParse[s] = this.monthsShort(
          n,
          ''
        ).toLocaleLowerCase()),
        (this._longMonthsParse[s] = this.months(n, '').toLocaleLowerCase())
  return r
    ? t === 'MMM'
      ? ((a = R.call(this._shortMonthsParse, i)), a !== -1 ? a : null)
      : ((a = R.call(this._longMonthsParse, i)), a !== -1 ? a : null)
    : t === 'MMM'
    ? ((a = R.call(this._shortMonthsParse, i)),
      a !== -1
        ? a
        : ((a = R.call(this._longMonthsParse, i)), a !== -1 ? a : null))
    : ((a = R.call(this._longMonthsParse, i)),
      a !== -1
        ? a
        : ((a = R.call(this._shortMonthsParse, i)), a !== -1 ? a : null))
}
function Ro(e, t, r) {
  var s, a, n
  if (this._monthsParseExact) return xo.call(this, e, t, r)
  for (
    this._monthsParse ||
      ((this._monthsParse = []),
      (this._longMonthsParse = []),
      (this._shortMonthsParse = [])),
      s = 0;
    s < 12;
    s++
  ) {
    if (
      ((a = se([2e3, s])),
      r &&
        !this._longMonthsParse[s] &&
        ((this._longMonthsParse[s] = new RegExp(
          '^' + this.months(a, '').replace('.', '') + '$',
          'i'
        )),
        (this._shortMonthsParse[s] = new RegExp(
          '^' + this.monthsShort(a, '').replace('.', '') + '$',
          'i'
        ))),
      !r &&
        !this._monthsParse[s] &&
        ((n = '^' + this.months(a, '') + '|^' + this.monthsShort(a, '')),
        (this._monthsParse[s] = new RegExp(n.replace('.', ''), 'i'))),
      r && t === 'MMMM' && this._longMonthsParse[s].test(e))
    )
      return s
    if (r && t === 'MMM' && this._shortMonthsParse[s].test(e)) return s
    if (!r && this._monthsParse[s].test(e)) return s
  }
}
function Pa(e, t) {
  var r
  if (!e.isValid()) return e
  if (typeof t == 'string') {
    if (/^\d+$/.test(t)) t = g(t)
    else if (((t = e.localeData().monthsParse(t)), !he(t))) return e
  }
  return (
    (r = Math.min(e.date(), It(e.year(), t))),
    e._d['set' + (e._isUTC ? 'UTC' : '') + 'Month'](t, r),
    e
  )
}
function Na(e) {
  return e != null
    ? (Pa(this, e), d.updateOffset(this, !0), this)
    : bt(this, 'Month')
}
function To() {
  return It(this.year(), this.month())
}
function Fo(e) {
  return this._monthsParseExact
    ? (b(this, '_monthsRegex') || Ca.call(this),
      e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    : (b(this, '_monthsShortRegex') || (this._monthsShortRegex = Oo),
      this._monthsShortStrictRegex && e
        ? this._monthsShortStrictRegex
        : this._monthsShortRegex)
}
function Yo(e) {
  return this._monthsParseExact
    ? (b(this, '_monthsRegex') || Ca.call(this),
      e ? this._monthsStrictRegex : this._monthsRegex)
    : (b(this, '_monthsRegex') || (this._monthsRegex = Do),
      this._monthsStrictRegex && e
        ? this._monthsStrictRegex
        : this._monthsRegex)
}
function Ca() {
  function e(i, o) {
    return o.length - i.length
  }
  var t = [],
    r = [],
    s = [],
    a,
    n
  for (a = 0; a < 12; a++)
    (n = se([2e3, a])),
      t.push(this.monthsShort(n, '')),
      r.push(this.months(n, '')),
      s.push(this.months(n, '')),
      s.push(this.monthsShort(n, ''))
  for (t.sort(e), r.sort(e), s.sort(e), a = 0; a < 12; a++)
    (t[a] = W(t[a])), (r[a] = W(r[a]))
  for (a = 0; a < 24; a++) s[a] = W(s[a])
  ;(this._monthsRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
    (this._monthsShortRegex = this._monthsRegex),
    (this._monthsStrictRegex = new RegExp('^(' + r.join('|') + ')', 'i')),
    (this._monthsShortStrictRegex = new RegExp('^(' + t.join('|') + ')', 'i'))
}
m('Y', 0, 0, function () {
  var e = this.year()
  return e <= 9999 ? re(e, 4) : '+' + e
})
m(0, ['YY', 2], 0, function () {
  return this.year() % 100
})
m(0, ['YYYY', 4], 0, 'year')
m(0, ['YYYYY', 5], 0, 'year')
m(0, ['YYYYYY', 6, !0], 0, 'year')
N('year', 'y')
C('year', 1)
h('Y', Ut)
h('YY', M, I)
h('YYYY', Zr, Jr)
h('YYYYY', Lt, Ct)
h('YYYYYY', Lt, Ct)
D(['YYYYY', 'YYYYYY'], P)
D('YYYY', function (e, t) {
  t[P] = e.length === 2 ? d.parseTwoDigitYear(e) : g(e)
})
D('YY', function (e, t) {
  t[P] = d.parseTwoDigitYear(e)
})
D('Y', function (e, t) {
  t[P] = parseInt(e, 10)
})
function Ke(e) {
  return Nt(e) ? 366 : 365
}
d.parseTwoDigitYear = function (e) {
  return g(e) + (g(e) > 68 ? 1900 : 2e3)
}
var Aa = $e('FullYear', !0)
function Eo() {
  return Nt(this.year())
}
function Po(e, t, r, s, a, n, i) {
  var o
  return (
    e < 100 && e >= 0
      ? ((o = new Date(e + 400, t, r, s, a, n, i)),
        isFinite(o.getFullYear()) && o.setFullYear(e))
      : (o = new Date(e, t, r, s, a, n, i)),
    o
  )
}
function rt(e) {
  var t, r
  return (
    e < 100 && e >= 0
      ? ((r = Array.prototype.slice.call(arguments)),
        (r[0] = e + 400),
        (t = new Date(Date.UTC.apply(null, r))),
        isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
      : (t = new Date(Date.UTC.apply(null, arguments))),
    t
  )
}
function Dt(e, t, r) {
  var s = 7 + t - r,
    a = (7 + rt(e, 0, s).getUTCDay() - t) % 7
  return -a + s - 1
}
function La(e, t, r, s, a) {
  var n = (7 + r - s) % 7,
    i = Dt(e, s, a),
    o = 1 + 7 * (t - 1) + n + i,
    u,
    f
  return (
    o <= 0
      ? ((u = e - 1), (f = Ke(u) + o))
      : o > Ke(e)
      ? ((u = e + 1), (f = o - Ke(e)))
      : ((u = e), (f = o)),
    {
      year: u,
      dayOfYear: f
    }
  )
}
function st(e, t, r) {
  var s = Dt(e.year(), t, r),
    a = Math.floor((e.dayOfYear() - s - 1) / 7) + 1,
    n,
    i
  return (
    a < 1
      ? ((i = e.year() - 1), (n = a + de(i, t, r)))
      : a > de(e.year(), t, r)
      ? ((n = a - de(e.year(), t, r)), (i = e.year() + 1))
      : ((i = e.year()), (n = a)),
    {
      week: n,
      year: i
    }
  )
}
function de(e, t, r) {
  var s = Dt(e, t, r),
    a = Dt(e + 1, t, r)
  return (Ke(e) - s + a) / 7
}
m('w', ['ww', 2], 'wo', 'week')
m('W', ['WW', 2], 'Wo', 'isoWeek')
N('week', 'w')
N('isoWeek', 'W')
C('week', 5)
C('isoWeek', 5)
h('w', M)
h('ww', M, I)
h('W', M)
h('WW', M, I)
ut(['w', 'ww', 'W', 'WW'], function (e, t, r, s) {
  t[s.substr(0, 1)] = g(e)
})
function No(e) {
  return st(e, this._week.dow, this._week.doy).week
}
var Co = {
  dow: 0,
  doy: 6
}
function Ao() {
  return this._week.dow
}
function Lo() {
  return this._week.doy
}
function Uo(e) {
  var t = this.localeData().week(this)
  return e == null ? t : this.add((e - t) * 7, 'd')
}
function Wo(e) {
  var t = st(this, 1, 4).week
  return e == null ? t : this.add((e - t) * 7, 'd')
}
m('d', 0, 'do', 'day')
m('dd', 0, 0, function (e) {
  return this.localeData().weekdaysMin(this, e)
})
m('ddd', 0, 0, function (e) {
  return this.localeData().weekdaysShort(this, e)
})
m('dddd', 0, 0, function (e) {
  return this.localeData().weekdays(this, e)
})
m('e', 0, 0, 'weekday')
m('E', 0, 0, 'isoWeekday')
N('day', 'd')
N('weekday', 'e')
N('isoWeekday', 'E')
C('day', 11)
C('weekday', 11)
C('isoWeekday', 11)
h('d', M)
h('e', M)
h('E', M)
h('dd', function (e, t) {
  return t.weekdaysMinRegex(e)
})
h('ddd', function (e, t) {
  return t.weekdaysShortRegex(e)
})
h('dddd', function (e, t) {
  return t.weekdaysRegex(e)
})
ut(['dd', 'ddd', 'dddd'], function (e, t, r, s) {
  var a = r._locale.weekdaysParse(e, s, r._strict)
  a != null ? (t.d = a) : (_(r).invalidWeekday = e)
})
ut(['d', 'e', 'E'], function (e, t, r, s) {
  t[s] = g(e)
})
function Io(e, t) {
  return typeof e != 'string'
    ? e
    : isNaN(e)
    ? ((e = t.weekdaysParse(e)), typeof e == 'number' ? e : null)
    : parseInt(e, 10)
}
function qo(e, t) {
  return typeof e == 'string'
    ? t.weekdaysParse(e) % 7 || 7
    : isNaN(e)
    ? null
    : e
}
function Qr(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t))
}
var $o = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  Ua = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  jo = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  Vo = ot,
  Ho = ot,
  Bo = ot
function Go(e, t) {
  var r = Q(this._weekdays)
    ? this._weekdays
    : this._weekdays[
        e && e !== !0 && this._weekdays.isFormat.test(t)
          ? 'format'
          : 'standalone'
      ]
  return e === !0 ? Qr(r, this._week.dow) : e ? r[e.day()] : r
}
function zo(e) {
  return e === !0
    ? Qr(this._weekdaysShort, this._week.dow)
    : e
    ? this._weekdaysShort[e.day()]
    : this._weekdaysShort
}
function Jo(e) {
  return e === !0
    ? Qr(this._weekdaysMin, this._week.dow)
    : e
    ? this._weekdaysMin[e.day()]
    : this._weekdaysMin
}
function Zo(e, t, r) {
  var s,
    a,
    n,
    i = e.toLocaleLowerCase()
  if (!this._weekdaysParse)
    for (
      this._weekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._minWeekdaysParse = [],
        s = 0;
      s < 7;
      ++s
    )
      (n = se([2e3, 1]).day(s)),
        (this._minWeekdaysParse[s] = this.weekdaysMin(
          n,
          ''
        ).toLocaleLowerCase()),
        (this._shortWeekdaysParse[s] = this.weekdaysShort(
          n,
          ''
        ).toLocaleLowerCase()),
        (this._weekdaysParse[s] = this.weekdays(n, '').toLocaleLowerCase())
  return r
    ? t === 'dddd'
      ? ((a = R.call(this._weekdaysParse, i)), a !== -1 ? a : null)
      : t === 'ddd'
      ? ((a = R.call(this._shortWeekdaysParse, i)), a !== -1 ? a : null)
      : ((a = R.call(this._minWeekdaysParse, i)), a !== -1 ? a : null)
    : t === 'dddd'
    ? ((a = R.call(this._weekdaysParse, i)),
      a !== -1 || ((a = R.call(this._shortWeekdaysParse, i)), a !== -1)
        ? a
        : ((a = R.call(this._minWeekdaysParse, i)), a !== -1 ? a : null))
    : t === 'ddd'
    ? ((a = R.call(this._shortWeekdaysParse, i)),
      a !== -1 || ((a = R.call(this._weekdaysParse, i)), a !== -1)
        ? a
        : ((a = R.call(this._minWeekdaysParse, i)), a !== -1 ? a : null))
    : ((a = R.call(this._minWeekdaysParse, i)),
      a !== -1 || ((a = R.call(this._weekdaysParse, i)), a !== -1)
        ? a
        : ((a = R.call(this._shortWeekdaysParse, i)), a !== -1 ? a : null))
}
function Qo(e, t, r) {
  var s, a, n
  if (this._weekdaysParseExact) return Zo.call(this, e, t, r)
  for (
    this._weekdaysParse ||
      ((this._weekdaysParse = []),
      (this._minWeekdaysParse = []),
      (this._shortWeekdaysParse = []),
      (this._fullWeekdaysParse = [])),
      s = 0;
    s < 7;
    s++
  ) {
    if (
      ((a = se([2e3, 1]).day(s)),
      r &&
        !this._fullWeekdaysParse[s] &&
        ((this._fullWeekdaysParse[s] = new RegExp(
          '^' + this.weekdays(a, '').replace('.', '\\.?') + '$',
          'i'
        )),
        (this._shortWeekdaysParse[s] = new RegExp(
          '^' + this.weekdaysShort(a, '').replace('.', '\\.?') + '$',
          'i'
        )),
        (this._minWeekdaysParse[s] = new RegExp(
          '^' + this.weekdaysMin(a, '').replace('.', '\\.?') + '$',
          'i'
        ))),
      this._weekdaysParse[s] ||
        ((n =
          '^' +
          this.weekdays(a, '') +
          '|^' +
          this.weekdaysShort(a, '') +
          '|^' +
          this.weekdaysMin(a, '')),
        (this._weekdaysParse[s] = new RegExp(n.replace('.', ''), 'i'))),
      r && t === 'dddd' && this._fullWeekdaysParse[s].test(e))
    )
      return s
    if (r && t === 'ddd' && this._shortWeekdaysParse[s].test(e)) return s
    if (r && t === 'dd' && this._minWeekdaysParse[s].test(e)) return s
    if (!r && this._weekdaysParse[s].test(e)) return s
  }
}
function Xo(e) {
  if (!this.isValid()) return e != null ? this : NaN
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay()
  return e != null ? ((e = Io(e, this.localeData())), this.add(e - t, 'd')) : t
}
function Ko(e) {
  if (!this.isValid()) return e != null ? this : NaN
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7
  return e == null ? t : this.add(e - t, 'd')
}
function eu(e) {
  if (!this.isValid()) return e != null ? this : NaN
  if (e != null) {
    var t = qo(e, this.localeData())
    return this.day(this.day() % 7 ? t : t - 7)
  } else return this.day() || 7
}
function tu(e) {
  return this._weekdaysParseExact
    ? (b(this, '_weekdaysRegex') || Xr.call(this),
      e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    : (b(this, '_weekdaysRegex') || (this._weekdaysRegex = Vo),
      this._weekdaysStrictRegex && e
        ? this._weekdaysStrictRegex
        : this._weekdaysRegex)
}
function ru(e) {
  return this._weekdaysParseExact
    ? (b(this, '_weekdaysRegex') || Xr.call(this),
      e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    : (b(this, '_weekdaysShortRegex') || (this._weekdaysShortRegex = Ho),
      this._weekdaysShortStrictRegex && e
        ? this._weekdaysShortStrictRegex
        : this._weekdaysShortRegex)
}
function su(e) {
  return this._weekdaysParseExact
    ? (b(this, '_weekdaysRegex') || Xr.call(this),
      e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    : (b(this, '_weekdaysMinRegex') || (this._weekdaysMinRegex = Bo),
      this._weekdaysMinStrictRegex && e
        ? this._weekdaysMinStrictRegex
        : this._weekdaysMinRegex)
}
function Xr() {
  function e(y, w) {
    return w.length - y.length
  }
  var t = [],
    r = [],
    s = [],
    a = [],
    n,
    i,
    o,
    u,
    f
  for (n = 0; n < 7; n++)
    (i = se([2e3, 1]).day(n)),
      (o = W(this.weekdaysMin(i, ''))),
      (u = W(this.weekdaysShort(i, ''))),
      (f = W(this.weekdays(i, ''))),
      t.push(o),
      r.push(u),
      s.push(f),
      a.push(o),
      a.push(u),
      a.push(f)
  t.sort(e),
    r.sort(e),
    s.sort(e),
    a.sort(e),
    (this._weekdaysRegex = new RegExp('^(' + a.join('|') + ')', 'i')),
    (this._weekdaysShortRegex = this._weekdaysRegex),
    (this._weekdaysMinRegex = this._weekdaysRegex),
    (this._weekdaysStrictRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
    (this._weekdaysShortStrictRegex = new RegExp(
      '^(' + r.join('|') + ')',
      'i'
    )),
    (this._weekdaysMinStrictRegex = new RegExp('^(' + t.join('|') + ')', 'i'))
}
function Kr() {
  return this.hours() % 12 || 12
}
function au() {
  return this.hours() || 24
}
m('H', ['HH', 2], 0, 'hour')
m('h', ['hh', 2], 0, Kr)
m('k', ['kk', 2], 0, au)
m('hmm', 0, 0, function () {
  return '' + Kr.apply(this) + re(this.minutes(), 2)
})
m('hmmss', 0, 0, function () {
  return '' + Kr.apply(this) + re(this.minutes(), 2) + re(this.seconds(), 2)
})
m('Hmm', 0, 0, function () {
  return '' + this.hours() + re(this.minutes(), 2)
})
m('Hmmss', 0, 0, function () {
  return '' + this.hours() + re(this.minutes(), 2) + re(this.seconds(), 2)
})
function Wa(e, t) {
  m(e, 0, 0, function () {
    return this.localeData().meridiem(this.hours(), this.minutes(), t)
  })
}
Wa('a', !0)
Wa('A', !1)
N('hour', 'h')
C('hour', 13)
function Ia(e, t) {
  return t._meridiemParse
}
h('a', Ia)
h('A', Ia)
h('H', M)
h('h', M)
h('k', M)
h('HH', M, I)
h('hh', M, I)
h('kk', M, I)
h('hmm', Ta)
h('hmmss', Fa)
h('Hmm', Ta)
h('Hmmss', Fa)
D(['H', 'HH'], F)
D(['k', 'kk'], function (e, t, r) {
  var s = g(e)
  t[F] = s === 24 ? 0 : s
})
D(['a', 'A'], function (e, t, r) {
  ;(r._isPm = r._locale.isPM(e)), (r._meridiem = e)
})
D(['h', 'hh'], function (e, t, r) {
  ;(t[F] = g(e)), (_(r).bigHour = !0)
})
D('hmm', function (e, t, r) {
  var s = e.length - 2
  ;(t[F] = g(e.substr(0, s))), (t[J] = g(e.substr(s))), (_(r).bigHour = !0)
})
D('hmmss', function (e, t, r) {
  var s = e.length - 4,
    a = e.length - 2
  ;(t[F] = g(e.substr(0, s))),
    (t[J] = g(e.substr(s, 2))),
    (t[le] = g(e.substr(a))),
    (_(r).bigHour = !0)
})
D('Hmm', function (e, t, r) {
  var s = e.length - 2
  ;(t[F] = g(e.substr(0, s))), (t[J] = g(e.substr(s)))
})
D('Hmmss', function (e, t, r) {
  var s = e.length - 4,
    a = e.length - 2
  ;(t[F] = g(e.substr(0, s))),
    (t[J] = g(e.substr(s, 2))),
    (t[le] = g(e.substr(a)))
})
function nu(e) {
  return (e + '').toLowerCase().charAt(0) === 'p'
}
var iu = /[ap]\.?m?\.?/i,
  ou = $e('Hours', !0)
function uu(e, t, r) {
  return e > 11 ? (r ? 'pm' : 'PM') : r ? 'am' : 'AM'
}
var qa = {
    calendar: Zi,
    longDateFormat: eo,
    invalidDate: ro,
    ordinal: ao,
    dayOfMonthOrdinalParse: no,
    relativeTime: oo,
    months: bo,
    monthsShort: Ya,
    week: Co,
    weekdays: $o,
    weekdaysMin: jo,
    weekdaysShort: Ua,
    meridiemParse: iu
  },
  x = {},
  ze = {},
  at
function lu(e, t) {
  var r,
    s = Math.min(e.length, t.length)
  for (r = 0; r < s; r += 1) if (e[r] !== t[r]) return r
  return s
}
function js(e) {
  return e && e.toLowerCase().replace('_', '-')
}
function du(e) {
  for (var t = 0, r, s, a, n; t < e.length; ) {
    for (
      n = js(e[t]).split('-'),
        r = n.length,
        s = js(e[t + 1]),
        s = s ? s.split('-') : null;
      r > 0;

    ) {
      if (((a = qt(n.slice(0, r).join('-'))), a)) return a
      if (s && s.length >= r && lu(n, s) >= r - 1) break
      r--
    }
    t++
  }
  return at
}
function fu(e) {
  return e.match('^[^/\\\\]*$') != null
}
function qt(e) {
  var t = null,
    r
  if (
    x[e] === void 0 &&
    typeof module < 'u' &&
    module &&
    module.exports &&
    fu(e)
  )
    try {
      ;(t = at._abbr), (r = require), r('./locale/' + e), ge(t)
    } catch {
      x[e] = null
    }
  return x[e]
}
function ge(e, t) {
  var r
  return (
    e &&
      (A(t) ? (r = ce(e)) : (r = es(e, t)),
      r
        ? (at = r)
        : typeof console < 'u' &&
          console.warn &&
          console.warn(
            'Locale ' + e + ' not found. Did you forget to load it?'
          )),
    at._abbr
  )
}
function es(e, t) {
  if (t !== null) {
    var r,
      s = qa
    if (((t.abbr = e), x[e] != null))
      Oa(
        'defineLocaleOverride',
        'use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
      ),
        (s = x[e]._config)
    else if (t.parentLocale != null)
      if (x[t.parentLocale] != null) s = x[t.parentLocale]._config
      else if (((r = qt(t.parentLocale)), r != null)) s = r._config
      else
        return (
          ze[t.parentLocale] || (ze[t.parentLocale] = []),
          ze[t.parentLocale].push({
            name: e,
            config: t
          }),
          null
        )
    return (
      (x[e] = new Br(vr(s, t))),
      ze[e] &&
        ze[e].forEach(function (a) {
          es(a.name, a.config)
        }),
      ge(e),
      x[e]
    )
  } else return delete x[e], null
}
function hu(e, t) {
  if (t != null) {
    var r,
      s,
      a = qa
    x[e] != null && x[e].parentLocale != null
      ? x[e].set(vr(x[e]._config, t))
      : ((s = qt(e)),
        s != null && (a = s._config),
        (t = vr(a, t)),
        s == null && (t.abbr = e),
        (r = new Br(t)),
        (r.parentLocale = x[e]),
        (x[e] = r)),
      ge(e)
  } else
    x[e] != null &&
      (x[e].parentLocale != null
        ? ((x[e] = x[e].parentLocale), e === ge() && ge(e))
        : x[e] != null && delete x[e])
  return x[e]
}
function ce(e) {
  var t
  if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e))
    return at
  if (!Q(e)) {
    if (((t = qt(e)), t)) return t
    e = [e]
  }
  return du(e)
}
function cu() {
  return Sr(x)
}
function ts(e) {
  var t,
    r = e._a
  return (
    r &&
      _(e).overflow === -2 &&
      ((t =
        r[ue] < 0 || r[ue] > 11
          ? ue
          : r[ee] < 1 || r[ee] > It(r[P], r[ue])
          ? ee
          : r[F] < 0 ||
            r[F] > 24 ||
            (r[F] === 24 && (r[J] !== 0 || r[le] !== 0 || r[be] !== 0))
          ? F
          : r[J] < 0 || r[J] > 59
          ? J
          : r[le] < 0 || r[le] > 59
          ? le
          : r[be] < 0 || r[be] > 999
          ? be
          : -1),
      _(e)._overflowDayOfYear && (t < P || t > ee) && (t = ee),
      _(e)._overflowWeeks && t === -1 && (t = wo),
      _(e)._overflowWeekday && t === -1 && (t = vo),
      (_(e).overflow = t)),
    e
  )
}
var mu =
    /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  yu =
    /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  pu = /Z|[+-]\d\d(?::?\d\d)?/,
  ht = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, !1],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, !1],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, !1],
    ['YYYYDDD', /\d{7}/],
    ['YYYYMM', /\d{6}/, !1],
    ['YYYY', /\d{4}/, !1]
  ],
  fr = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
  ],
  _u = /^\/?Date\((-?\d+)/i,
  gu =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
  wu = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  }
function $a(e) {
  var t,
    r,
    s = e._i,
    a = mu.exec(s) || yu.exec(s),
    n,
    i,
    o,
    u,
    f = ht.length,
    y = fr.length
  if (a) {
    for (_(e).iso = !0, t = 0, r = f; t < r; t++)
      if (ht[t][1].exec(a[1])) {
        ;(i = ht[t][0]), (n = ht[t][2] !== !1)
        break
      }
    if (i == null) {
      e._isValid = !1
      return
    }
    if (a[3]) {
      for (t = 0, r = y; t < r; t++)
        if (fr[t][1].exec(a[3])) {
          o = (a[2] || ' ') + fr[t][0]
          break
        }
      if (o == null) {
        e._isValid = !1
        return
      }
    }
    if (!n && o != null) {
      e._isValid = !1
      return
    }
    if (a[4])
      if (pu.exec(a[4])) u = 'Z'
      else {
        e._isValid = !1
        return
      }
    ;(e._f = i + (o || '') + (u || '')), ss(e)
  } else e._isValid = !1
}
function vu(e, t, r, s, a, n) {
  var i = [
    Su(e),
    Ya.indexOf(t),
    parseInt(r, 10),
    parseInt(s, 10),
    parseInt(a, 10)
  ]
  return n && i.push(parseInt(n, 10)), i
}
function Su(e) {
  var t = parseInt(e, 10)
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t
}
function bu(e) {
  return e
    .replace(/\([^()]*\)|[\n\t]/g, ' ')
    .replace(/(\s\s+)/g, ' ')
    .replace(/^\s\s*/, '')
    .replace(/\s\s*$/, '')
}
function Ou(e, t, r) {
  if (e) {
    var s = Ua.indexOf(e),
      a = new Date(t[0], t[1], t[2]).getDay()
    if (s !== a) return (_(r).weekdayMismatch = !0), (r._isValid = !1), !1
  }
  return !0
}
function Du(e, t, r) {
  if (e) return wu[e]
  if (t) return 0
  var s = parseInt(r, 10),
    a = s % 100,
    n = (s - a) / 100
  return n * 60 + a
}
function ja(e) {
  var t = gu.exec(bu(e._i)),
    r
  if (t) {
    if (((r = vu(t[4], t[3], t[2], t[5], t[6], t[7])), !Ou(t[1], r, e))) return
    ;(e._a = r),
      (e._tzm = Du(t[8], t[9], t[10])),
      (e._d = rt.apply(null, e._a)),
      e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
      (_(e).rfc2822 = !0)
  } else e._isValid = !1
}
function ku(e) {
  var t = _u.exec(e._i)
  if (t !== null) {
    e._d = new Date(+t[1])
    return
  }
  if (($a(e), e._isValid === !1)) delete e._isValid
  else return
  if ((ja(e), e._isValid === !1)) delete e._isValid
  else return
  e._strict ? (e._isValid = !1) : d.createFromInputFallback(e)
}
d.createFromInputFallback = H(
  'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
  function (e) {
    e._d = new Date(e._i + (e._useUTC ? ' UTC' : ''))
  }
)
function Ee(e, t, r) {
  return e != null ? e : t != null ? t : r
}
function Mu(e) {
  var t = new Date(d.now())
  return e._useUTC
    ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]
    : [t.getFullYear(), t.getMonth(), t.getDate()]
}
function rs(e) {
  var t,
    r,
    s = [],
    a,
    n,
    i
  if (!e._d) {
    for (
      a = Mu(e),
        e._w && e._a[ee] == null && e._a[ue] == null && xu(e),
        e._dayOfYear != null &&
          ((i = Ee(e._a[P], a[P])),
          (e._dayOfYear > Ke(i) || e._dayOfYear === 0) &&
            (_(e)._overflowDayOfYear = !0),
          (r = rt(i, 0, e._dayOfYear)),
          (e._a[ue] = r.getUTCMonth()),
          (e._a[ee] = r.getUTCDate())),
        t = 0;
      t < 3 && e._a[t] == null;
      ++t
    )
      e._a[t] = s[t] = a[t]
    for (; t < 7; t++)
      e._a[t] = s[t] = e._a[t] == null ? (t === 2 ? 1 : 0) : e._a[t]
    e._a[F] === 24 &&
      e._a[J] === 0 &&
      e._a[le] === 0 &&
      e._a[be] === 0 &&
      ((e._nextDay = !0), (e._a[F] = 0)),
      (e._d = (e._useUTC ? rt : Po).apply(null, s)),
      (n = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
      e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
      e._nextDay && (e._a[F] = 24),
      e._w && typeof e._w.d < 'u' && e._w.d !== n && (_(e).weekdayMismatch = !0)
  }
}
function xu(e) {
  var t, r, s, a, n, i, o, u, f
  ;(t = e._w),
    t.GG != null || t.W != null || t.E != null
      ? ((n = 1),
        (i = 4),
        (r = Ee(t.GG, e._a[P], st(k(), 1, 4).year)),
        (s = Ee(t.W, 1)),
        (a = Ee(t.E, 1)),
        (a < 1 || a > 7) && (u = !0))
      : ((n = e._locale._week.dow),
        (i = e._locale._week.doy),
        (f = st(k(), n, i)),
        (r = Ee(t.gg, e._a[P], f.year)),
        (s = Ee(t.w, f.week)),
        t.d != null
          ? ((a = t.d), (a < 0 || a > 6) && (u = !0))
          : t.e != null
          ? ((a = t.e + n), (t.e < 0 || t.e > 6) && (u = !0))
          : (a = n)),
    s < 1 || s > de(r, n, i)
      ? (_(e)._overflowWeeks = !0)
      : u != null
      ? (_(e)._overflowWeekday = !0)
      : ((o = La(r, s, a, n, i)),
        (e._a[P] = o.year),
        (e._dayOfYear = o.dayOfYear))
}
d.ISO_8601 = function () {}
d.RFC_2822 = function () {}
function ss(e) {
  if (e._f === d.ISO_8601) {
    $a(e)
    return
  }
  if (e._f === d.RFC_2822) {
    ja(e)
    return
  }
  ;(e._a = []), (_(e).empty = !0)
  var t = '' + e._i,
    r,
    s,
    a,
    n,
    i,
    o = t.length,
    u = 0,
    f,
    y
  for (a = Da(e._f, e._locale).match(Gr) || [], y = a.length, r = 0; r < y; r++)
    (n = a[r]),
      (s = (t.match(po(n, e)) || [])[0]),
      s &&
        ((i = t.substr(0, t.indexOf(s))),
        i.length > 0 && _(e).unusedInput.push(i),
        (t = t.slice(t.indexOf(s) + s.length)),
        (u += s.length)),
      Ce[n]
        ? (s ? (_(e).empty = !1) : _(e).unusedTokens.push(n), go(n, s, e))
        : e._strict && !s && _(e).unusedTokens.push(n)
  ;(_(e).charsLeftOver = o - u),
    t.length > 0 && _(e).unusedInput.push(t),
    e._a[F] <= 12 &&
      _(e).bigHour === !0 &&
      e._a[F] > 0 &&
      (_(e).bigHour = void 0),
    (_(e).parsedDateParts = e._a.slice(0)),
    (_(e).meridiem = e._meridiem),
    (e._a[F] = Ru(e._locale, e._a[F], e._meridiem)),
    (f = _(e).era),
    f !== null && (e._a[P] = e._locale.erasConvertYear(f, e._a[P])),
    rs(e),
    ts(e)
}
function Ru(e, t, r) {
  var s
  return r == null
    ? t
    : e.meridiemHour != null
    ? e.meridiemHour(t, r)
    : (e.isPM != null &&
        ((s = e.isPM(r)), s && t < 12 && (t += 12), !s && t === 12 && (t = 0)),
      t)
}
function Tu(e) {
  var t,
    r,
    s,
    a,
    n,
    i,
    o = !1,
    u = e._f.length
  if (u === 0) {
    ;(_(e).invalidFormat = !0), (e._d = new Date(NaN))
    return
  }
  for (a = 0; a < u; a++)
    (n = 0),
      (i = !1),
      (t = Hr({}, e)),
      e._useUTC != null && (t._useUTC = e._useUTC),
      (t._f = e._f[a]),
      ss(t),
      Vr(t) && (i = !0),
      (n += _(t).charsLeftOver),
      (n += _(t).unusedTokens.length * 10),
      (_(t).score = n),
      o
        ? n < s && ((s = n), (r = t))
        : (s == null || n < s || i) && ((s = n), (r = t), i && (o = !0))
  pe(e, r || t)
}
function Fu(e) {
  if (!e._d) {
    var t = zr(e._i),
      r = t.day === void 0 ? t.date : t.day
    ;(e._a = Sa(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function (s) {
        return s && parseInt(s, 10)
      }
    )),
      rs(e)
  }
}
function Yu(e) {
  var t = new it(ts(Va(e)))
  return t._nextDay && (t.add(1, 'd'), (t._nextDay = void 0)), t
}
function Va(e) {
  var t = e._i,
    r = e._f
  return (
    (e._locale = e._locale || ce(e._l)),
    t === null || (r === void 0 && t === '')
      ? Pt({ nullInput: !0 })
      : (typeof t == 'string' && (e._i = t = e._locale.preparse(t)),
        X(t)
          ? new it(ts(t))
          : (nt(t) ? (e._d = t) : Q(r) ? Tu(e) : r ? ss(e) : Eu(e),
            Vr(e) || (e._d = null),
            e))
  )
}
function Eu(e) {
  var t = e._i
  A(t)
    ? (e._d = new Date(d.now()))
    : nt(t)
    ? (e._d = new Date(t.valueOf()))
    : typeof t == 'string'
    ? ku(e)
    : Q(t)
    ? ((e._a = Sa(t.slice(0), function (r) {
        return parseInt(r, 10)
      })),
      rs(e))
    : Oe(t)
    ? Fu(e)
    : he(t)
    ? (e._d = new Date(t))
    : d.createFromInputFallback(e)
}
function Ha(e, t, r, s, a) {
  var n = {}
  return (
    (t === !0 || t === !1) && ((s = t), (t = void 0)),
    (r === !0 || r === !1) && ((s = r), (r = void 0)),
    ((Oe(e) && jr(e)) || (Q(e) && e.length === 0)) && (e = void 0),
    (n._isAMomentObject = !0),
    (n._useUTC = n._isUTC = a),
    (n._l = r),
    (n._i = e),
    (n._f = t),
    (n._strict = s),
    Yu(n)
  )
}
function k(e, t, r, s) {
  return Ha(e, t, r, s, !1)
}
var Pu = H(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
      var e = k.apply(null, arguments)
      return this.isValid() && e.isValid() ? (e < this ? this : e) : Pt()
    }
  ),
  Nu = H(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
      var e = k.apply(null, arguments)
      return this.isValid() && e.isValid() ? (e > this ? this : e) : Pt()
    }
  )
function Ba(e, t) {
  var r, s
  if ((t.length === 1 && Q(t[0]) && (t = t[0]), !t.length)) return k()
  for (r = t[0], s = 1; s < t.length; ++s)
    (!t[s].isValid() || t[s][e](r)) && (r = t[s])
  return r
}
function Cu() {
  var e = [].slice.call(arguments, 0)
  return Ba('isBefore', e)
}
function Au() {
  var e = [].slice.call(arguments, 0)
  return Ba('isAfter', e)
}
var Lu = function () {
    return Date.now ? Date.now() : +new Date()
  },
  Je = [
    'year',
    'quarter',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond'
  ]
function Uu(e) {
  var t,
    r = !1,
    s,
    a = Je.length
  for (t in e)
    if (b(e, t) && !(R.call(Je, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1
  for (s = 0; s < a; ++s)
    if (e[Je[s]]) {
      if (r) return !1
      parseFloat(e[Je[s]]) !== g(e[Je[s]]) && (r = !0)
    }
  return !0
}
function Wu() {
  return this._isValid
}
function Iu() {
  return K(NaN)
}
function $t(e) {
  var t = zr(e),
    r = t.year || 0,
    s = t.quarter || 0,
    a = t.month || 0,
    n = t.week || t.isoWeek || 0,
    i = t.day || 0,
    o = t.hour || 0,
    u = t.minute || 0,
    f = t.second || 0,
    y = t.millisecond || 0
  ;(this._isValid = Uu(t)),
    (this._milliseconds = +y + f * 1e3 + u * 6e4 + o * 1e3 * 60 * 60),
    (this._days = +i + n * 7),
    (this._months = +a + s * 3 + r * 12),
    (this._data = {}),
    (this._locale = ce()),
    this._bubble()
}
function pt(e) {
  return e instanceof $t
}
function Or(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e)
}
function qu(e, t, r) {
  var s = Math.min(e.length, t.length),
    a = Math.abs(e.length - t.length),
    n = 0,
    i
  for (i = 0; i < s; i++)
    ((r && e[i] !== t[i]) || (!r && g(e[i]) !== g(t[i]))) && n++
  return n + a
}
function Ga(e, t) {
  m(e, 0, 0, function () {
    var r = this.utcOffset(),
      s = '+'
    return (
      r < 0 && ((r = -r), (s = '-')),
      s + re(~~(r / 60), 2) + t + re(~~r % 60, 2)
    )
  })
}
Ga('Z', ':')
Ga('ZZ', '')
h('Z', Wt)
h('ZZ', Wt)
D(['Z', 'ZZ'], function (e, t, r) {
  ;(r._useUTC = !0), (r._tzm = as(Wt, e))
})
var $u = /([\+\-]|\d\d)/gi
function as(e, t) {
  var r = (t || '').match(e),
    s,
    a,
    n
  return r === null
    ? null
    : ((s = r[r.length - 1] || []),
      (a = (s + '').match($u) || ['-', 0, 0]),
      (n = +(a[1] * 60) + g(a[2])),
      n === 0 ? 0 : a[0] === '+' ? n : -n)
}
function ns(e, t) {
  var r, s
  return t._isUTC
    ? ((r = t.clone()),
      (s = (X(e) || nt(e) ? e.valueOf() : k(e).valueOf()) - r.valueOf()),
      r._d.setTime(r._d.valueOf() + s),
      d.updateOffset(r, !1),
      r)
    : k(e).local()
}
function Dr(e) {
  return -Math.round(e._d.getTimezoneOffset())
}
d.updateOffset = function () {}
function ju(e, t, r) {
  var s = this._offset || 0,
    a
  if (!this.isValid()) return e != null ? this : NaN
  if (e != null) {
    if (typeof e == 'string') {
      if (((e = as(Wt, e)), e === null)) return this
    } else Math.abs(e) < 16 && !r && (e = e * 60)
    return (
      !this._isUTC && t && (a = Dr(this)),
      (this._offset = e),
      (this._isUTC = !0),
      a != null && this.add(a, 'm'),
      s !== e &&
        (!t || this._changeInProgress
          ? Za(this, K(e - s, 'm'), 1, !1)
          : this._changeInProgress ||
            ((this._changeInProgress = !0),
            d.updateOffset(this, !0),
            (this._changeInProgress = null))),
      this
    )
  } else return this._isUTC ? s : Dr(this)
}
function Vu(e, t) {
  return e != null
    ? (typeof e != 'string' && (e = -e), this.utcOffset(e, t), this)
    : -this.utcOffset()
}
function Hu(e) {
  return this.utcOffset(0, e)
}
function Bu(e) {
  return (
    this._isUTC &&
      (this.utcOffset(0, e),
      (this._isUTC = !1),
      e && this.subtract(Dr(this), 'm')),
    this
  )
}
function Gu() {
  if (this._tzm != null) this.utcOffset(this._tzm, !1, !0)
  else if (typeof this._i == 'string') {
    var e = as(mo, this._i)
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0)
  }
  return this
}
function zu(e) {
  return this.isValid()
    ? ((e = e ? k(e).utcOffset() : 0), (this.utcOffset() - e) % 60 === 0)
    : !1
}
function Ju() {
  return (
    this.utcOffset() > this.clone().month(0).utcOffset() ||
    this.utcOffset() > this.clone().month(5).utcOffset()
  )
}
function Zu() {
  if (!A(this._isDSTShifted)) return this._isDSTShifted
  var e = {},
    t
  return (
    Hr(e, this),
    (e = Va(e)),
    e._a
      ? ((t = e._isUTC ? se(e._a) : k(e._a)),
        (this._isDSTShifted = this.isValid() && qu(e._a, t.toArray()) > 0))
      : (this._isDSTShifted = !1),
    this._isDSTShifted
  )
}
function Qu() {
  return this.isValid() ? !this._isUTC : !1
}
function Xu() {
  return this.isValid() ? this._isUTC : !1
}
function za() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1
}
var Ku = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
  el =
    /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/
function K(e, t) {
  var r = e,
    s = null,
    a,
    n,
    i
  return (
    pt(e)
      ? (r = {
          ms: e._milliseconds,
          d: e._days,
          M: e._months
        })
      : he(e) || !isNaN(+e)
      ? ((r = {}), t ? (r[t] = +e) : (r.milliseconds = +e))
      : (s = Ku.exec(e))
      ? ((a = s[1] === '-' ? -1 : 1),
        (r = {
          y: 0,
          d: g(s[ee]) * a,
          h: g(s[F]) * a,
          m: g(s[J]) * a,
          s: g(s[le]) * a,
          ms: g(Or(s[be] * 1e3)) * a
        }))
      : (s = el.exec(e))
      ? ((a = s[1] === '-' ? -1 : 1),
        (r = {
          y: Se(s[2], a),
          M: Se(s[3], a),
          w: Se(s[4], a),
          d: Se(s[5], a),
          h: Se(s[6], a),
          m: Se(s[7], a),
          s: Se(s[8], a)
        }))
      : r == null
      ? (r = {})
      : typeof r == 'object' &&
        ('from' in r || 'to' in r) &&
        ((i = tl(k(r.from), k(r.to))),
        (r = {}),
        (r.ms = i.milliseconds),
        (r.M = i.months)),
    (n = new $t(r)),
    pt(e) && b(e, '_locale') && (n._locale = e._locale),
    pt(e) && b(e, '_isValid') && (n._isValid = e._isValid),
    n
  )
}
K.fn = $t.prototype
K.invalid = Iu
function Se(e, t) {
  var r = e && parseFloat(e.replace(',', '.'))
  return (isNaN(r) ? 0 : r) * t
}
function Vs(e, t) {
  var r = {}
  return (
    (r.months = t.month() - e.month() + (t.year() - e.year()) * 12),
    e.clone().add(r.months, 'M').isAfter(t) && --r.months,
    (r.milliseconds = +t - +e.clone().add(r.months, 'M')),
    r
  )
}
function tl(e, t) {
  var r
  return e.isValid() && t.isValid()
    ? ((t = ns(t, e)),
      e.isBefore(t)
        ? (r = Vs(e, t))
        : ((r = Vs(t, e)),
          (r.milliseconds = -r.milliseconds),
          (r.months = -r.months)),
      r)
    : { milliseconds: 0, months: 0 }
}
function Ja(e, t) {
  return function (r, s) {
    var a, n
    return (
      s !== null &&
        !isNaN(+s) &&
        (Oa(
          t,
          'moment().' +
            t +
            '(period, number) is deprecated. Please use moment().' +
            t +
            '(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
        ),
        (n = r),
        (r = s),
        (s = n)),
      (a = K(r, s)),
      Za(this, a, e),
      this
    )
  }
}
function Za(e, t, r, s) {
  var a = t._milliseconds,
    n = Or(t._days),
    i = Or(t._months)
  !e.isValid() ||
    ((s = s == null ? !0 : s),
    i && Pa(e, bt(e, 'Month') + i * r),
    n && Ma(e, 'Date', bt(e, 'Date') + n * r),
    a && e._d.setTime(e._d.valueOf() + a * r),
    s && d.updateOffset(e, n || i))
}
var rl = Ja(1, 'add'),
  sl = Ja(-1, 'subtract')
function Qa(e) {
  return typeof e == 'string' || e instanceof String
}
function al(e) {
  return (
    X(e) ||
    nt(e) ||
    Qa(e) ||
    he(e) ||
    il(e) ||
    nl(e) ||
    e === null ||
    e === void 0
  )
}
function nl(e) {
  var t = Oe(e) && !jr(e),
    r = !1,
    s = [
      'years',
      'year',
      'y',
      'months',
      'month',
      'M',
      'days',
      'day',
      'd',
      'dates',
      'date',
      'D',
      'hours',
      'hour',
      'h',
      'minutes',
      'minute',
      'm',
      'seconds',
      'second',
      's',
      'milliseconds',
      'millisecond',
      'ms'
    ],
    a,
    n,
    i = s.length
  for (a = 0; a < i; a += 1) (n = s[a]), (r = r || b(e, n))
  return t && r
}
function il(e) {
  var t = Q(e),
    r = !1
  return (
    t &&
      (r =
        e.filter(function (s) {
          return !he(s) && Qa(e)
        }).length === 0),
    t && r
  )
}
function ol(e) {
  var t = Oe(e) && !jr(e),
    r = !1,
    s = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'],
    a,
    n
  for (a = 0; a < s.length; a += 1) (n = s[a]), (r = r || b(e, n))
  return t && r
}
function ul(e, t) {
  var r = e.diff(t, 'days', !0)
  return r < -6
    ? 'sameElse'
    : r < -1
    ? 'lastWeek'
    : r < 0
    ? 'lastDay'
    : r < 1
    ? 'sameDay'
    : r < 2
    ? 'nextDay'
    : r < 7
    ? 'nextWeek'
    : 'sameElse'
}
function ll(e, t) {
  arguments.length === 1 &&
    (arguments[0]
      ? al(arguments[0])
        ? ((e = arguments[0]), (t = void 0))
        : ol(arguments[0]) && ((t = arguments[0]), (e = void 0))
      : ((e = void 0), (t = void 0)))
  var r = e || k(),
    s = ns(r, this).startOf('day'),
    a = d.calendarFormat(this, s) || 'sameElse',
    n = t && (ae(t[a]) ? t[a].call(this, r) : t[a])
  return this.format(n || this.localeData().calendar(a, this, k(r)))
}
function dl() {
  return new it(this)
}
function fl(e, t) {
  var r = X(e) ? e : k(e)
  return this.isValid() && r.isValid()
    ? ((t = B(t) || 'millisecond'),
      t === 'millisecond'
        ? this.valueOf() > r.valueOf()
        : r.valueOf() < this.clone().startOf(t).valueOf())
    : !1
}
function hl(e, t) {
  var r = X(e) ? e : k(e)
  return this.isValid() && r.isValid()
    ? ((t = B(t) || 'millisecond'),
      t === 'millisecond'
        ? this.valueOf() < r.valueOf()
        : this.clone().endOf(t).valueOf() < r.valueOf())
    : !1
}
function cl(e, t, r, s) {
  var a = X(e) ? e : k(e),
    n = X(t) ? t : k(t)
  return this.isValid() && a.isValid() && n.isValid()
    ? ((s = s || '()'),
      (s[0] === '(' ? this.isAfter(a, r) : !this.isBefore(a, r)) &&
        (s[1] === ')' ? this.isBefore(n, r) : !this.isAfter(n, r)))
    : !1
}
function ml(e, t) {
  var r = X(e) ? e : k(e),
    s
  return this.isValid() && r.isValid()
    ? ((t = B(t) || 'millisecond'),
      t === 'millisecond'
        ? this.valueOf() === r.valueOf()
        : ((s = r.valueOf()),
          this.clone().startOf(t).valueOf() <= s &&
            s <= this.clone().endOf(t).valueOf()))
    : !1
}
function yl(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t)
}
function pl(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t)
}
function _l(e, t, r) {
  var s, a, n
  if (!this.isValid()) return NaN
  if (((s = ns(e, this)), !s.isValid())) return NaN
  switch (((a = (s.utcOffset() - this.utcOffset()) * 6e4), (t = B(t)), t)) {
    case 'year':
      n = _t(this, s) / 12
      break
    case 'month':
      n = _t(this, s)
      break
    case 'quarter':
      n = _t(this, s) / 3
      break
    case 'second':
      n = (this - s) / 1e3
      break
    case 'minute':
      n = (this - s) / 6e4
      break
    case 'hour':
      n = (this - s) / 36e5
      break
    case 'day':
      n = (this - s - a) / 864e5
      break
    case 'week':
      n = (this - s - a) / 6048e5
      break
    default:
      n = this - s
  }
  return r ? n : $(n)
}
function _t(e, t) {
  if (e.date() < t.date()) return -_t(t, e)
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()),
    s = e.clone().add(r, 'months'),
    a,
    n
  return (
    t - s < 0
      ? ((a = e.clone().add(r - 1, 'months')), (n = (t - s) / (s - a)))
      : ((a = e.clone().add(r + 1, 'months')), (n = (t - s) / (a - s))),
    -(r + n) || 0
  )
}
d.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ'
d.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]'
function gl() {
  return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')
}
function wl(e) {
  if (!this.isValid()) return null
  var t = e !== !0,
    r = t ? this.clone().utc() : this
  return r.year() < 0 || r.year() > 9999
    ? yt(
        r,
        t ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
      )
    : ae(Date.prototype.toISOString)
    ? t
      ? this.toDate().toISOString()
      : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
          .toISOString()
          .replace('Z', yt(r, 'Z'))
    : yt(r, t ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ')
}
function vl() {
  if (!this.isValid()) return 'moment.invalid(/* ' + this._i + ' */)'
  var e = 'moment',
    t = '',
    r,
    s,
    a,
    n
  return (
    this.isLocal() ||
      ((e = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone'),
      (t = 'Z')),
    (r = '[' + e + '("]'),
    (s = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY'),
    (a = '-MM-DD[T]HH:mm:ss.SSS'),
    (n = t + '[")]'),
    this.format(r + s + a + n)
  )
}
function Sl(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat)
  var t = yt(this, e)
  return this.localeData().postformat(t)
}
function bl(e, t) {
  return this.isValid() && ((X(e) && e.isValid()) || k(e).isValid())
    ? K({ to: this, from: e }).locale(this.locale()).humanize(!t)
    : this.localeData().invalidDate()
}
function Ol(e) {
  return this.from(k(), e)
}
function Dl(e, t) {
  return this.isValid() && ((X(e) && e.isValid()) || k(e).isValid())
    ? K({ from: this, to: e }).locale(this.locale()).humanize(!t)
    : this.localeData().invalidDate()
}
function kl(e) {
  return this.to(k(), e)
}
function Xa(e) {
  var t
  return e === void 0
    ? this._locale._abbr
    : ((t = ce(e)), t != null && (this._locale = t), this)
}
var Ka = H(
  'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
  function (e) {
    return e === void 0 ? this.localeData() : this.locale(e)
  }
)
function en() {
  return this._locale
}
var kt = 1e3,
  Ae = 60 * kt,
  Mt = 60 * Ae,
  tn = (365 * 400 + 97) * 24 * Mt
function Le(e, t) {
  return ((e % t) + t) % t
}
function rn(e, t, r) {
  return e < 100 && e >= 0
    ? new Date(e + 400, t, r) - tn
    : new Date(e, t, r).valueOf()
}
function sn(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - tn : Date.UTC(e, t, r)
}
function Ml(e) {
  var t, r
  if (((e = B(e)), e === void 0 || e === 'millisecond' || !this.isValid()))
    return this
  switch (((r = this._isUTC ? sn : rn), e)) {
    case 'year':
      t = r(this.year(), 0, 1)
      break
    case 'quarter':
      t = r(this.year(), this.month() - (this.month() % 3), 1)
      break
    case 'month':
      t = r(this.year(), this.month(), 1)
      break
    case 'week':
      t = r(this.year(), this.month(), this.date() - this.weekday())
      break
    case 'isoWeek':
      t = r(this.year(), this.month(), this.date() - (this.isoWeekday() - 1))
      break
    case 'day':
    case 'date':
      t = r(this.year(), this.month(), this.date())
      break
    case 'hour':
      ;(t = this._d.valueOf()),
        (t -= Le(t + (this._isUTC ? 0 : this.utcOffset() * Ae), Mt))
      break
    case 'minute':
      ;(t = this._d.valueOf()), (t -= Le(t, Ae))
      break
    case 'second':
      ;(t = this._d.valueOf()), (t -= Le(t, kt))
      break
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this
}
function xl(e) {
  var t, r
  if (((e = B(e)), e === void 0 || e === 'millisecond' || !this.isValid()))
    return this
  switch (((r = this._isUTC ? sn : rn), e)) {
    case 'year':
      t = r(this.year() + 1, 0, 1) - 1
      break
    case 'quarter':
      t = r(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1
      break
    case 'month':
      t = r(this.year(), this.month() + 1, 1) - 1
      break
    case 'week':
      t = r(this.year(), this.month(), this.date() - this.weekday() + 7) - 1
      break
    case 'isoWeek':
      t =
        r(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1) + 7
        ) - 1
      break
    case 'day':
    case 'date':
      t = r(this.year(), this.month(), this.date() + 1) - 1
      break
    case 'hour':
      ;(t = this._d.valueOf()),
        (t += Mt - Le(t + (this._isUTC ? 0 : this.utcOffset() * Ae), Mt) - 1)
      break
    case 'minute':
      ;(t = this._d.valueOf()), (t += Ae - Le(t, Ae) - 1)
      break
    case 'second':
      ;(t = this._d.valueOf()), (t += kt - Le(t, kt) - 1)
      break
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this
}
function Rl() {
  return this._d.valueOf() - (this._offset || 0) * 6e4
}
function Tl() {
  return Math.floor(this.valueOf() / 1e3)
}
function Fl() {
  return new Date(this.valueOf())
}
function Yl() {
  var e = this
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ]
}
function El() {
  var e = this
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  }
}
function Pl() {
  return this.isValid() ? this.toISOString() : null
}
function Nl() {
  return Vr(this)
}
function Cl() {
  return pe({}, _(this))
}
function Al() {
  return _(this).overflow
}
function Ll() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  }
}
m('N', 0, 0, 'eraAbbr')
m('NN', 0, 0, 'eraAbbr')
m('NNN', 0, 0, 'eraAbbr')
m('NNNN', 0, 0, 'eraName')
m('NNNNN', 0, 0, 'eraNarrow')
m('y', ['y', 1], 'yo', 'eraYear')
m('y', ['yy', 2], 0, 'eraYear')
m('y', ['yyy', 3], 0, 'eraYear')
m('y', ['yyyy', 4], 0, 'eraYear')
h('N', is)
h('NN', is)
h('NNN', is)
h('NNNN', zl)
h('NNNNN', Jl)
D(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (e, t, r, s) {
  var a = r._locale.erasParse(e, s, r._strict)
  a ? (_(r).era = a) : (_(r).invalidEra = e)
})
h('y', je)
h('yy', je)
h('yyy', je)
h('yyyy', je)
h('yo', Zl)
D(['y', 'yy', 'yyy', 'yyyy'], P)
D(['yo'], function (e, t, r, s) {
  var a
  r._locale._eraYearOrdinalRegex &&
    (a = e.match(r._locale._eraYearOrdinalRegex)),
    r._locale.eraYearOrdinalParse
      ? (t[P] = r._locale.eraYearOrdinalParse(e, a))
      : (t[P] = parseInt(e, 10))
})
function Ul(e, t) {
  var r,
    s,
    a,
    n = this._eras || ce('en')._eras
  for (r = 0, s = n.length; r < s; ++r) {
    switch (typeof n[r].since) {
      case 'string':
        ;(a = d(n[r].since).startOf('day')), (n[r].since = a.valueOf())
        break
    }
    switch (typeof n[r].until) {
      case 'undefined':
        n[r].until = 1 / 0
        break
      case 'string':
        ;(a = d(n[r].until).startOf('day').valueOf()),
          (n[r].until = a.valueOf())
        break
    }
  }
  return n
}
function Wl(e, t, r) {
  var s,
    a,
    n = this.eras(),
    i,
    o,
    u
  for (e = e.toUpperCase(), s = 0, a = n.length; s < a; ++s)
    if (
      ((i = n[s].name.toUpperCase()),
      (o = n[s].abbr.toUpperCase()),
      (u = n[s].narrow.toUpperCase()),
      r)
    )
      switch (t) {
        case 'N':
        case 'NN':
        case 'NNN':
          if (o === e) return n[s]
          break
        case 'NNNN':
          if (i === e) return n[s]
          break
        case 'NNNNN':
          if (u === e) return n[s]
          break
      }
    else if ([i, o, u].indexOf(e) >= 0) return n[s]
}
function Il(e, t) {
  var r = e.since <= e.until ? 1 : -1
  return t === void 0
    ? d(e.since).year()
    : d(e.since).year() + (t - e.offset) * r
}
function ql() {
  var e,
    t,
    r,
    s = this.localeData().eras()
  for (e = 0, t = s.length; e < t; ++e)
    if (
      ((r = this.clone().startOf('day').valueOf()),
      (s[e].since <= r && r <= s[e].until) ||
        (s[e].until <= r && r <= s[e].since))
    )
      return s[e].name
  return ''
}
function $l() {
  var e,
    t,
    r,
    s = this.localeData().eras()
  for (e = 0, t = s.length; e < t; ++e)
    if (
      ((r = this.clone().startOf('day').valueOf()),
      (s[e].since <= r && r <= s[e].until) ||
        (s[e].until <= r && r <= s[e].since))
    )
      return s[e].narrow
  return ''
}
function jl() {
  var e,
    t,
    r,
    s = this.localeData().eras()
  for (e = 0, t = s.length; e < t; ++e)
    if (
      ((r = this.clone().startOf('day').valueOf()),
      (s[e].since <= r && r <= s[e].until) ||
        (s[e].until <= r && r <= s[e].since))
    )
      return s[e].abbr
  return ''
}
function Vl() {
  var e,
    t,
    r,
    s,
    a = this.localeData().eras()
  for (e = 0, t = a.length; e < t; ++e)
    if (
      ((r = a[e].since <= a[e].until ? 1 : -1),
      (s = this.clone().startOf('day').valueOf()),
      (a[e].since <= s && s <= a[e].until) ||
        (a[e].until <= s && s <= a[e].since))
    )
      return (this.year() - d(a[e].since).year()) * r + a[e].offset
  return this.year()
}
function Hl(e) {
  return (
    b(this, '_erasNameRegex') || os.call(this),
    e ? this._erasNameRegex : this._erasRegex
  )
}
function Bl(e) {
  return (
    b(this, '_erasAbbrRegex') || os.call(this),
    e ? this._erasAbbrRegex : this._erasRegex
  )
}
function Gl(e) {
  return (
    b(this, '_erasNarrowRegex') || os.call(this),
    e ? this._erasNarrowRegex : this._erasRegex
  )
}
function is(e, t) {
  return t.erasAbbrRegex(e)
}
function zl(e, t) {
  return t.erasNameRegex(e)
}
function Jl(e, t) {
  return t.erasNarrowRegex(e)
}
function Zl(e, t) {
  return t._eraYearOrdinalRegex || je
}
function os() {
  var e = [],
    t = [],
    r = [],
    s = [],
    a,
    n,
    i = this.eras()
  for (a = 0, n = i.length; a < n; ++a)
    t.push(W(i[a].name)),
      e.push(W(i[a].abbr)),
      r.push(W(i[a].narrow)),
      s.push(W(i[a].name)),
      s.push(W(i[a].abbr)),
      s.push(W(i[a].narrow))
  ;(this._erasRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
    (this._erasNameRegex = new RegExp('^(' + t.join('|') + ')', 'i')),
    (this._erasAbbrRegex = new RegExp('^(' + e.join('|') + ')', 'i')),
    (this._erasNarrowRegex = new RegExp('^(' + r.join('|') + ')', 'i'))
}
m(0, ['gg', 2], 0, function () {
  return this.weekYear() % 100
})
m(0, ['GG', 2], 0, function () {
  return this.isoWeekYear() % 100
})
function jt(e, t) {
  m(0, [e, e.length], 0, t)
}
jt('gggg', 'weekYear')
jt('ggggg', 'weekYear')
jt('GGGG', 'isoWeekYear')
jt('GGGGG', 'isoWeekYear')
N('weekYear', 'gg')
N('isoWeekYear', 'GG')
C('weekYear', 1)
C('isoWeekYear', 1)
h('G', Ut)
h('g', Ut)
h('GG', M, I)
h('gg', M, I)
h('GGGG', Zr, Jr)
h('gggg', Zr, Jr)
h('GGGGG', Lt, Ct)
h('ggggg', Lt, Ct)
ut(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (e, t, r, s) {
  t[s.substr(0, 2)] = g(e)
})
ut(['gg', 'GG'], function (e, t, r, s) {
  t[s] = d.parseTwoDigitYear(e)
})
function Ql(e) {
  return an.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  )
}
function Xl(e) {
  return an.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
}
function Kl() {
  return de(this.year(), 1, 4)
}
function ed() {
  return de(this.isoWeekYear(), 1, 4)
}
function td() {
  var e = this.localeData()._week
  return de(this.year(), e.dow, e.doy)
}
function rd() {
  var e = this.localeData()._week
  return de(this.weekYear(), e.dow, e.doy)
}
function an(e, t, r, s, a) {
  var n
  return e == null
    ? st(this, s, a).year
    : ((n = de(e, s, a)), t > n && (t = n), sd.call(this, e, t, r, s, a))
}
function sd(e, t, r, s, a) {
  var n = La(e, t, r, s, a),
    i = rt(n.year, 0, n.dayOfYear)
  return (
    this.year(i.getUTCFullYear()),
    this.month(i.getUTCMonth()),
    this.date(i.getUTCDate()),
    this
  )
}
m('Q', 0, 'Qo', 'quarter')
N('quarter', 'Q')
C('quarter', 7)
h('Q', xa)
D('Q', function (e, t) {
  t[ue] = (g(e) - 1) * 3
})
function ad(e) {
  return e == null
    ? Math.ceil((this.month() + 1) / 3)
    : this.month((e - 1) * 3 + (this.month() % 3))
}
m('D', ['DD', 2], 'Do', 'date')
N('date', 'D')
C('date', 9)
h('D', M)
h('DD', M, I)
h('Do', function (e, t) {
  return e
    ? t._dayOfMonthOrdinalParse || t._ordinalParse
    : t._dayOfMonthOrdinalParseLenient
})
D(['D', 'DD'], ee)
D('Do', function (e, t) {
  t[ee] = g(e.match(M)[0])
})
var nn = $e('Date', !0)
m('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear')
N('dayOfYear', 'DDD')
C('dayOfYear', 4)
h('DDD', At)
h('DDDD', Ra)
D(['DDD', 'DDDD'], function (e, t, r) {
  r._dayOfYear = g(e)
})
function nd(e) {
  var t =
    Math.round(
      (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
    ) + 1
  return e == null ? t : this.add(e - t, 'd')
}
m('m', ['mm', 2], 0, 'minute')
N('minute', 'm')
C('minute', 14)
h('m', M)
h('mm', M, I)
D(['m', 'mm'], J)
var id = $e('Minutes', !1)
m('s', ['ss', 2], 0, 'second')
N('second', 's')
C('second', 15)
h('s', M)
h('ss', M, I)
D(['s', 'ss'], le)
var od = $e('Seconds', !1)
m('S', 0, 0, function () {
  return ~~(this.millisecond() / 100)
})
m(0, ['SS', 2], 0, function () {
  return ~~(this.millisecond() / 10)
})
m(0, ['SSS', 3], 0, 'millisecond')
m(0, ['SSSS', 4], 0, function () {
  return this.millisecond() * 10
})
m(0, ['SSSSS', 5], 0, function () {
  return this.millisecond() * 100
})
m(0, ['SSSSSS', 6], 0, function () {
  return this.millisecond() * 1e3
})
m(0, ['SSSSSSS', 7], 0, function () {
  return this.millisecond() * 1e4
})
m(0, ['SSSSSSSS', 8], 0, function () {
  return this.millisecond() * 1e5
})
m(0, ['SSSSSSSSS', 9], 0, function () {
  return this.millisecond() * 1e6
})
N('millisecond', 'ms')
C('millisecond', 16)
h('S', At, xa)
h('SS', At, I)
h('SSS', At, Ra)
var _e, on
for (_e = 'SSSS'; _e.length <= 9; _e += 'S') h(_e, je)
function ud(e, t) {
  t[be] = g(('0.' + e) * 1e3)
}
for (_e = 'S'; _e.length <= 9; _e += 'S') D(_e, ud)
on = $e('Milliseconds', !1)
m('z', 0, 0, 'zoneAbbr')
m('zz', 0, 0, 'zoneName')
function ld() {
  return this._isUTC ? 'UTC' : ''
}
function dd() {
  return this._isUTC ? 'Coordinated Universal Time' : ''
}
var l = it.prototype
l.add = rl
l.calendar = ll
l.clone = dl
l.diff = _l
l.endOf = xl
l.format = Sl
l.from = bl
l.fromNow = Ol
l.to = Dl
l.toNow = kl
l.get = ho
l.invalidAt = Al
l.isAfter = fl
l.isBefore = hl
l.isBetween = cl
l.isSame = ml
l.isSameOrAfter = yl
l.isSameOrBefore = pl
l.isValid = Nl
l.lang = Ka
l.locale = Xa
l.localeData = en
l.max = Nu
l.min = Pu
l.parsingFlags = Cl
l.set = co
l.startOf = Ml
l.subtract = sl
l.toArray = Yl
l.toObject = El
l.toDate = Fl
l.toISOString = wl
l.inspect = vl
typeof Symbol < 'u' &&
  Symbol.for != null &&
  (l[Symbol.for('nodejs.util.inspect.custom')] = function () {
    return 'Moment<' + this.format() + '>'
  })
l.toJSON = Pl
l.toString = gl
l.unix = Tl
l.valueOf = Rl
l.creationData = Ll
l.eraName = ql
l.eraNarrow = $l
l.eraAbbr = jl
l.eraYear = Vl
l.year = Aa
l.isLeapYear = Eo
l.weekYear = Ql
l.isoWeekYear = Xl
l.quarter = l.quarters = ad
l.month = Na
l.daysInMonth = To
l.week = l.weeks = Uo
l.isoWeek = l.isoWeeks = Wo
l.weeksInYear = td
l.weeksInWeekYear = rd
l.isoWeeksInYear = Kl
l.isoWeeksInISOWeekYear = ed
l.date = nn
l.day = l.days = Xo
l.weekday = Ko
l.isoWeekday = eu
l.dayOfYear = nd
l.hour = l.hours = ou
l.minute = l.minutes = id
l.second = l.seconds = od
l.millisecond = l.milliseconds = on
l.utcOffset = ju
l.utc = Hu
l.local = Bu
l.parseZone = Gu
l.hasAlignedHourOffset = zu
l.isDST = Ju
l.isLocal = Qu
l.isUtcOffset = Xu
l.isUtc = za
l.isUTC = za
l.zoneAbbr = ld
l.zoneName = dd
l.dates = H('dates accessor is deprecated. Use date instead.', nn)
l.months = H('months accessor is deprecated. Use month instead', Na)
l.years = H('years accessor is deprecated. Use year instead', Aa)
l.zone = H(
  'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
  Vu
)
l.isDSTShifted = H(
  'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
  Zu
)
function fd(e) {
  return k(e * 1e3)
}
function hd() {
  return k.apply(null, arguments).parseZone()
}
function un(e) {
  return e
}
var O = Br.prototype
O.calendar = Qi
O.longDateFormat = to
O.invalidDate = so
O.ordinal = io
O.preparse = un
O.postformat = un
O.relativeTime = uo
O.pastFuture = lo
O.set = Ji
O.eras = Ul
O.erasParse = Wl
O.erasConvertYear = Il
O.erasAbbrRegex = Bl
O.erasNameRegex = Hl
O.erasNarrowRegex = Gl
O.months = ko
O.monthsShort = Mo
O.monthsParse = Ro
O.monthsRegex = Yo
O.monthsShortRegex = Fo
O.week = No
O.firstDayOfYear = Lo
O.firstDayOfWeek = Ao
O.weekdays = Go
O.weekdaysMin = Jo
O.weekdaysShort = zo
O.weekdaysParse = Qo
O.weekdaysRegex = tu
O.weekdaysShortRegex = ru
O.weekdaysMinRegex = su
O.isPM = nu
O.meridiem = uu
function xt(e, t, r, s) {
  var a = ce(),
    n = se().set(s, t)
  return a[r](n, e)
}
function ln(e, t, r) {
  if ((he(e) && ((t = e), (e = void 0)), (e = e || ''), t != null))
    return xt(e, t, r, 'month')
  var s,
    a = []
  for (s = 0; s < 12; s++) a[s] = xt(e, s, r, 'month')
  return a
}
function us(e, t, r, s) {
  typeof e == 'boolean'
    ? (he(t) && ((r = t), (t = void 0)), (t = t || ''))
    : ((t = e),
      (r = t),
      (e = !1),
      he(t) && ((r = t), (t = void 0)),
      (t = t || ''))
  var a = ce(),
    n = e ? a._week.dow : 0,
    i,
    o = []
  if (r != null) return xt(t, (r + n) % 7, s, 'day')
  for (i = 0; i < 7; i++) o[i] = xt(t, (i + n) % 7, s, 'day')
  return o
}
function cd(e, t) {
  return ln(e, t, 'months')
}
function md(e, t) {
  return ln(e, t, 'monthsShort')
}
function yd(e, t, r) {
  return us(e, t, r, 'weekdays')
}
function pd(e, t, r) {
  return us(e, t, r, 'weekdaysShort')
}
function _d(e, t, r) {
  return us(e, t, r, 'weekdaysMin')
}
ge('en', {
  eras: [
    {
      since: '0001-01-01',
      until: 1 / 0,
      offset: 1,
      name: 'Anno Domini',
      narrow: 'AD',
      abbr: 'AD'
    },
    {
      since: '0000-12-31',
      until: -1 / 0,
      offset: 1,
      name: 'Before Christ',
      narrow: 'BC',
      abbr: 'BC'
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function (e) {
    var t = e % 10,
      r =
        g((e % 100) / 10) === 1
          ? 'th'
          : t === 1
          ? 'st'
          : t === 2
          ? 'nd'
          : t === 3
          ? 'rd'
          : 'th'
    return e + r
  }
})
d.lang = H('moment.lang is deprecated. Use moment.locale instead.', ge)
d.langData = H(
  'moment.langData is deprecated. Use moment.localeData instead.',
  ce
)
var ne = Math.abs
function gd() {
  var e = this._data
  return (
    (this._milliseconds = ne(this._milliseconds)),
    (this._days = ne(this._days)),
    (this._months = ne(this._months)),
    (e.milliseconds = ne(e.milliseconds)),
    (e.seconds = ne(e.seconds)),
    (e.minutes = ne(e.minutes)),
    (e.hours = ne(e.hours)),
    (e.months = ne(e.months)),
    (e.years = ne(e.years)),
    this
  )
}
function dn(e, t, r, s) {
  var a = K(t, r)
  return (
    (e._milliseconds += s * a._milliseconds),
    (e._days += s * a._days),
    (e._months += s * a._months),
    e._bubble()
  )
}
function wd(e, t) {
  return dn(this, e, t, 1)
}
function vd(e, t) {
  return dn(this, e, t, -1)
}
function Hs(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e)
}
function Sd() {
  var e = this._milliseconds,
    t = this._days,
    r = this._months,
    s = this._data,
    a,
    n,
    i,
    o,
    u
  return (
    (e >= 0 && t >= 0 && r >= 0) ||
      (e <= 0 && t <= 0 && r <= 0) ||
      ((e += Hs(kr(r) + t) * 864e5), (t = 0), (r = 0)),
    (s.milliseconds = e % 1e3),
    (a = $(e / 1e3)),
    (s.seconds = a % 60),
    (n = $(a / 60)),
    (s.minutes = n % 60),
    (i = $(n / 60)),
    (s.hours = i % 24),
    (t += $(i / 24)),
    (u = $(fn(t))),
    (r += u),
    (t -= Hs(kr(u))),
    (o = $(r / 12)),
    (r %= 12),
    (s.days = t),
    (s.months = r),
    (s.years = o),
    this
  )
}
function fn(e) {
  return (e * 4800) / 146097
}
function kr(e) {
  return (e * 146097) / 4800
}
function bd(e) {
  if (!this.isValid()) return NaN
  var t,
    r,
    s = this._milliseconds
  if (((e = B(e)), e === 'month' || e === 'quarter' || e === 'year'))
    switch (((t = this._days + s / 864e5), (r = this._months + fn(t)), e)) {
      case 'month':
        return r
      case 'quarter':
        return r / 3
      case 'year':
        return r / 12
    }
  else
    switch (((t = this._days + Math.round(kr(this._months))), e)) {
      case 'week':
        return t / 7 + s / 6048e5
      case 'day':
        return t + s / 864e5
      case 'hour':
        return t * 24 + s / 36e5
      case 'minute':
        return t * 1440 + s / 6e4
      case 'second':
        return t * 86400 + s / 1e3
      case 'millisecond':
        return Math.floor(t * 864e5) + s
      default:
        throw new Error('Unknown unit ' + e)
    }
}
function Od() {
  return this.isValid()
    ? this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        g(this._months / 12) * 31536e6
    : NaN
}
function me(e) {
  return function () {
    return this.as(e)
  }
}
var Dd = me('ms'),
  kd = me('s'),
  Md = me('m'),
  xd = me('h'),
  Rd = me('d'),
  Td = me('w'),
  Fd = me('M'),
  Yd = me('Q'),
  Ed = me('y')
function Pd() {
  return K(this)
}
function Nd(e) {
  return (e = B(e)), this.isValid() ? this[e + 's']() : NaN
}
function ke(e) {
  return function () {
    return this.isValid() ? this._data[e] : NaN
  }
}
var Cd = ke('milliseconds'),
  Ad = ke('seconds'),
  Ld = ke('minutes'),
  Ud = ke('hours'),
  Wd = ke('days'),
  Id = ke('months'),
  qd = ke('years')
function $d() {
  return $(this.days() / 7)
}
var ie = Math.round,
  Pe = {
    ss: 44,
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    w: null,
    M: 11
  }
function jd(e, t, r, s, a) {
  return a.relativeTime(t || 1, !!r, e, s)
}
function Vd(e, t, r, s) {
  var a = K(e).abs(),
    n = ie(a.as('s')),
    i = ie(a.as('m')),
    o = ie(a.as('h')),
    u = ie(a.as('d')),
    f = ie(a.as('M')),
    y = ie(a.as('w')),
    w = ie(a.as('y')),
    c =
      (n <= r.ss && ['s', n]) ||
      (n < r.s && ['ss', n]) ||
      (i <= 1 && ['m']) ||
      (i < r.m && ['mm', i]) ||
      (o <= 1 && ['h']) ||
      (o < r.h && ['hh', o]) ||
      (u <= 1 && ['d']) ||
      (u < r.d && ['dd', u])
  return (
    r.w != null && (c = c || (y <= 1 && ['w']) || (y < r.w && ['ww', y])),
    (c = c ||
      (f <= 1 && ['M']) ||
      (f < r.M && ['MM', f]) ||
      (w <= 1 && ['y']) || ['yy', w]),
    (c[2] = t),
    (c[3] = +e > 0),
    (c[4] = s),
    jd.apply(null, c)
  )
}
function Hd(e) {
  return e === void 0 ? ie : typeof e == 'function' ? ((ie = e), !0) : !1
}
function Bd(e, t) {
  return Pe[e] === void 0
    ? !1
    : t === void 0
    ? Pe[e]
    : ((Pe[e] = t), e === 's' && (Pe.ss = t - 1), !0)
}
function Gd(e, t) {
  if (!this.isValid()) return this.localeData().invalidDate()
  var r = !1,
    s = Pe,
    a,
    n
  return (
    typeof e == 'object' && ((t = e), (e = !1)),
    typeof e == 'boolean' && (r = e),
    typeof t == 'object' &&
      ((s = Object.assign({}, Pe, t)),
      t.s != null && t.ss == null && (s.ss = t.s - 1)),
    (a = this.localeData()),
    (n = Vd(this, !r, s, a)),
    r && (n = a.pastFuture(+this, n)),
    a.postformat(n)
  )
}
var hr = Math.abs
function Ye(e) {
  return (e > 0) - (e < 0) || +e
}
function Vt() {
  if (!this.isValid()) return this.localeData().invalidDate()
  var e = hr(this._milliseconds) / 1e3,
    t = hr(this._days),
    r = hr(this._months),
    s,
    a,
    n,
    i,
    o = this.asSeconds(),
    u,
    f,
    y,
    w
  return o
    ? ((s = $(e / 60)),
      (a = $(s / 60)),
      (e %= 60),
      (s %= 60),
      (n = $(r / 12)),
      (r %= 12),
      (i = e ? e.toFixed(3).replace(/\.?0+$/, '') : ''),
      (u = o < 0 ? '-' : ''),
      (f = Ye(this._months) !== Ye(o) ? '-' : ''),
      (y = Ye(this._days) !== Ye(o) ? '-' : ''),
      (w = Ye(this._milliseconds) !== Ye(o) ? '-' : ''),
      u +
        'P' +
        (n ? f + n + 'Y' : '') +
        (r ? f + r + 'M' : '') +
        (t ? y + t + 'D' : '') +
        (a || s || e ? 'T' : '') +
        (a ? w + a + 'H' : '') +
        (s ? w + s + 'M' : '') +
        (e ? w + i + 'S' : ''))
    : 'P0D'
}
var v = $t.prototype
v.isValid = Wu
v.abs = gd
v.add = wd
v.subtract = vd
v.as = bd
v.asMilliseconds = Dd
v.asSeconds = kd
v.asMinutes = Md
v.asHours = xd
v.asDays = Rd
v.asWeeks = Td
v.asMonths = Fd
v.asQuarters = Yd
v.asYears = Ed
v.valueOf = Od
v._bubble = Sd
v.clone = Pd
v.get = Nd
v.milliseconds = Cd
v.seconds = Ad
v.minutes = Ld
v.hours = Ud
v.days = Wd
v.weeks = $d
v.months = Id
v.years = qd
v.humanize = Gd
v.toISOString = Vt
v.toString = Vt
v.toJSON = Vt
v.locale = Xa
v.localeData = en
v.toIsoString = H(
  'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
  Vt
)
v.lang = Ka
m('X', 0, 0, 'unix')
m('x', 0, 0, 'valueOf')
h('x', Ut)
h('X', yo)
D('X', function (e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3)
})
D('x', function (e, t, r) {
  r._d = new Date(g(e))
})
//! moment.js
d.version = '2.29.4'
Gi(k)
d.fn = l
d.min = Cu
d.max = Au
d.now = Lu
d.utc = se
d.unix = fd
d.months = cd
d.isDate = nt
d.locale = ge
d.invalid = Pt
d.duration = K
d.isMoment = X
d.weekdays = yd
d.parseZone = hd
d.localeData = ce
d.isDuration = pt
d.monthsShort = md
d.weekdaysMin = _d
d.defineLocale = es
d.updateLocale = hu
d.locales = cu
d.weekdaysShort = pd
d.normalizeUnits = B
d.relativeTimeRounding = Hd
d.relativeTimeThreshold = Bd
d.calendarFormat = ul
d.prototype = l
d.HTML5_FMT = {
  DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
  DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
  DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  TIME_SECONDS: 'HH:mm:ss',
  TIME_MS: 'HH:mm:ss.SSS',
  WEEK: 'GGGG-[W]WW',
  MONTH: 'YYYY-MM'
}
const zd = {
  name: 'WyxosDatepicker',
  props: {
    modelValue: {
      required: !0,
      type: [null, String]
    },
    displayFormat: {
      type: String,
      default: 'DD/MM/YYYY'
    },
    submitFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      query: null
    }
  },
  watch: {
    modelValue(e) {
      this.query = e ? d(e, this.submitFormat)._d : null
    }
  },
  mounted() {
    this.modelValue && (this.query = d(this.modelValue, this.submitFormat)._d)
  },
  methods: {
    dateFormatter(e) {
      return e ? d(e).format(this.displayFormat) : null
    },
    updateQuery() {
      this.$emit(
        'update:modelValue',
        this.query ? d(this.query).format(this.submitFormat) : null
      )
    }
  }
}
function Jd(e, t, r, s, a, n) {
  const i = fe('o-datepicker')
  return (
    te(),
    Ie(
      i,
      {
        modelValue: a.query,
        'onUpdate:modelValue': [
          t[0] || (t[0] = (o) => (a.query = o)),
          n.updateQuery
        ],
        'date-formatter': n.dateFormatter
      },
      null,
      8,
      ['modelValue', 'date-formatter', 'onUpdate:modelValue']
    )
  )
}
const Mr = /* @__PURE__ */ we(zd, [['render', Jd]]),
  Zd = {
    name: 'WyxosForm',
    props: {
      form: {
        type: da,
        required: !0
      }
    },
    emits: ['submit']
  },
  Qd = /* @__PURE__ */ et(' An error occurred. Try again? ')
function Xd(e, t, r, s, a, n) {
  const i = fe('o-loading'),
    o = fe('o-button')
  return (
    te(),
    wt('div', null, [
      r.form.isLoaded
        ? (te(),
          wt(
            'form',
            {
              key: 0,
              class: 'form',
              onSubmit:
                t[0] || (t[0] = vn((u) => e.$emit('submit'), ['prevent']))
            },
            [gt(e.$slots, 'default')],
            32
          ))
        : Ze('', !0),
      vt(
        i,
        {
          active: r.form.isLoading
        },
        null,
        8,
        ['active']
      ),
      r.form.isFailure
        ? (te(),
          Ie(
            o,
            {
              key: 1,
              onClick: t[1] || (t[1] = (u) => r.form.load())
            },
            {
              default: Ne(() => [Qd]),
              _: 1
            }
          ))
        : Ze('', !0)
    ])
  )
}
const xr = /* @__PURE__ */ we(Zd, [['render', Xd]]),
  Kd = {
    name: 'WyxosImage',
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
    emits: ['loaded'],
    data() {
      return {
        instance: null,
        width: 0,
        height: 0
      }
    },
    mounted() {
      this.loadImage()
    },
    unmounted() {
      this.instance.onload = null
    },
    methods: {
      loadImage() {
        return typeof this.src == 'object' ? this.loadFile() : this.loadPath()
      },
      loadFile() {
        ;(this.instance = new FileReader()),
          (this.instance.onload = (e) => {
            const t = e.target.result
            ;(this.$refs.image.src = t),
              (this.width = this.resize ? this.resize.width : t.width),
              (this.height = this.resize ? this.resize.height : t.height),
              this.$emit('loaded')
          }),
          this.instance.readAsDataURL(this.src)
      },
      loadPath() {
        ;(this.instance = new Image()),
          (this.instance.onload = () => {
            ;(this.$refs.image.src = this.src),
              (this.width = this.resize
                ? this.resize.width
                : this.instance.width),
              (this.height = this.resize
                ? this.resize.height
                : this.instance.height),
              this.$emit('loaded')
          }),
          (this.instance.src = this.src)
      }
    }
  },
  ef = ['width', 'height']
function tf(e, t, r, s, a, n) {
  return (
    te(),
    wt(
      'img',
      {
        ref: 'image',
        src: '',
        alt: '',
        width: a.width,
        height: a.height
      },
      null,
      8,
      ef
    )
  )
}
const Rr = /* @__PURE__ */ we(Kd, [['render', tf]]),
  rf = {
    name: 'WyxosInput',
    props: {
      label: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        required: !0
      },
      bag: {
        type: String,
        default: () => 'default'
      }
    },
    setup() {
      return {
        errors: tt()
      }
    },
    computed: {
      fieldAttrs() {
        const e = this.$attrs,
          t = {}
        return (
          Object.keys(e).forEach((r) => {
            ;/^field-/.test(r) && (t[r.replace(/^field-/, '')] = e[r])
          }),
          t
        )
      },
      inputAttrs() {
        const e = this.$attrs,
          t = {}
        return (
          Object.keys(e).forEach((r) => {
            ;/^field-/.test(r) || (t[r] = e[r])
          }),
          t
        )
      }
    }
  }
function sf(e, t, r, s, a, n) {
  const i = fe('o-input'),
    o = fe('o-field')
  return (
    te(),
    Ie(
      o,
      cr(
        { label: r.label },
        { ...s.errors.get(r.name, r.bag), ...n.fieldAttrs }
      ),
      {
        default: Ne(() => [
          vt(
            i,
            cr(n.inputAttrs, {
              onFocus: t[0] || (t[0] = (u) => s.errors.clear(r.name, r.bag))
            }),
            null,
            16
          )
        ]),
        _: 1
      },
      16,
      ['label']
    )
  )
}
const Tr = /* @__PURE__ */ we(rf, [['render', sf]]),
  af = {
    name: 'WyxosTags',
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
        default: (e) => e
      },
      payloadFormatter: {
        type: Function,
        default: (e) => e
      }
    },
    emits: ['update:modelValue', 'update:query'],
    setup() {
      return {
        search: Et.create()
      }
    },
    data() {
      return {
        query: [],
        isInternalChange: !1
      }
    },
    watch: {
      modelValue: {
        handler: async function (e, t) {
          this.isInternalChange
            ? (this.isInternalChange = !1)
            : JSON.stringify(e) !== JSON.stringify(t) && this.restore()
        },
        deep: !0,
        immediate: !1
      }
    },
    async mounted() {
      this.restore()
    },
    methods: {
      async restore() {
        if (this.modelValue && this.modelValue.length) {
          this.isInternalChange = !0
          const { result: e } = await this.search.restore(
            this.path,
            this.restoreFormatter({
              values: this.modelValue
            })
          )
          ;(this.query = e),
            this.$emit(
              'update:modelValue',
              this.query.map((t) => this.formatter(t))
            ),
            this.$emit('update:query', this.query)
        }
      },
      searchTags(e) {
        return this.search.customSearch({
          url: this.path,
          payload: this.payloadFormatter({
            value: e,
            exclude: this.query
              .map((t) => this.excludeFormatter(t))
              .filter(Boolean)
          })
        })
      },
      addedTag() {
        this.isInternalChange = !0
        const e = this.query.map((t) => this.formatter(t))
        this.$emit('update:modelValue', e),
          this.$emit('update:query', this.query)
      },
      removedTag() {
        this.isInternalChange = !0
        const e = this.query.map((t) => this.formatter(t))
        this.$emit('update:modelValue', e),
          this.$emit('update:query', this.query)
      },
      reset() {
        ;(this.isInternalChange = !0),
          (this.query = []),
          this.$emit('update:modelValue', this.query),
          this.$emit('update:query', this.query)
      },
      addItem() {
        this.$refs.tagInput.addItem()
      }
    }
  }
function nf(e, t, r, s, a, n) {
  const i = fe('o-inputitems')
  return (
    te(),
    Ie(
      i,
      cr(
        {
          ref: 'tagInput',
          modelValue: a.query,
          'onUpdate:modelValue': t[0] || (t[0] = (o) => (a.query = o)),
          data: s.search.result.value,
          'allow-autocomplete': ''
        },
        e.$attrs,
        {
          onAdd: t[1] || (t[1] = (o) => n.addedTag(o)),
          onRemove: t[2] || (t[2] = (o) => n.removedTag(o)),
          onTyping: t[3] || (t[3] = (o) => n.searchTags(o))
        }
      ),
      null,
      16,
      ['modelValue', 'data']
    )
  )
}
const Fr = /* @__PURE__ */ we(af, [['render', nf]]),
  of = {
    name: 'WyxosPrompt',
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
    emits: ['close'],
    setup() {
      return {
        state: new j()
      }
    },
    methods: {
      async proceed() {
        this.callback &&
          (this.state.loading(),
          await this.callback().catch((e) => {
            throw (this.state.failed(), e)
          }),
          this.state.loaded()),
          this.$emit('close', { action: !0 })
      }
    }
  },
  uf = { class: 'button-group' }
function lf(e, t, r, s, a, n) {
  const i = fe('wyxos-button'),
    o = fe('o-modal')
  return (
    te(),
    Ie(
      o,
      { active: !0 },
      {
        default: Ne(() => [
          Qe('h2', null, lt(r.title), 1),
          Qe('p', null, lt(r.message), 1),
          Qe('div', uf, [
            vt(
              i,
              {
                disabled: s.state.isLoading,
                'native-type': 'button',
                onClick:
                  t[0] || (t[0] = (u) => e.$emit('close', { action: !1 }))
              },
              {
                default: Ne(() => [et(lt(r.cancelText), 1)]),
                _: 1
              },
              8,
              ['disabled']
            ),
            vt(
              i,
              {
                loading: s.state.isLoading,
                'native-type': 'button',
                onClick: t[1] || (t[1] = (u) => n.proceed())
              },
              {
                default: Ne(() => [et(lt(r.confirmText), 1)]),
                _: 1
              },
              8,
              ['loading']
            )
          ])
        ]),
        _: 1
      }
    )
  )
}
const Yr = /* @__PURE__ */ we(of, [['render', lf]])
class ls {
  constructor() {
    S(this, 'state', Bs(!1))
  }
  show() {
    this.state.value = !0
  }
  get isVisible() {
    return this.state.value
  }
  hide() {
    this.state.value = !1
  }
  static create() {
    return new ls()
  }
}
class ds {
  constructor(t) {
    S(
      this,
      'attributes',
      V({
        name: null
      })
    )
    S(this, 'callbacks', {})
    this.attributes.name = t
  }
  is(t) {
    return this.attributes.name === t
  }
  onChange(t) {
    this.callbacks = t
  }
  activeClass(t, r) {
    return {
      class: this.is(t) ? r : []
    }
  }
  set(t) {
    ;(this.attributes.name = t), this.callbacks[t] && this.callbacks[t]()
  }
  assign(t) {
    Object.assign(this, t)
  }
  static create(t) {
    return new ds(t)
  }
}
const df = (e) => {
    e.component(_r.name, _r),
      e.component(gr.name, gr),
      e.component(Mr.name, Mr),
      e.component(xr.name, xr),
      e.component(Rr.name, Rr),
      e.component(Tr.name, Tr),
      e.component(Yr.name, Yr),
      e.component(Fr.name, Fr)
  },
  cf = {
    Search: Et,
    FormBuilder: da,
    ResourceList: Ri,
    Listing: $r,
    LoadState: j,
    Modal: ls,
    Tab: ds,
    useFormErrors: tt,
    WyxosButton: _r,
    WyxosCollection: gr,
    WyxosDatepicker: Mr,
    WyxosForm: xr,
    WyxosImage: Rr,
    WyxosInput: Tr,
    WyxosTags: Fr,
    WyxosPrompt: Yr,
    install: df
  }
export {
  da as FormBuilder,
  $r as Listing,
  j as LoadState,
  ls as Modal,
  Ri as ResourceList,
  Et as Search,
  ds as Tab,
  _r as WyxosButton,
  gr as WyxosCollection,
  Mr as WyxosDatepicker,
  xr as WyxosForm,
  Rr as WyxosImage,
  Tr as WyxosInput,
  Yr as WyxosPrompt,
  Fr as WyxosTags,
  cf as default,
  df as install,
  tt as useFormErrors
}
