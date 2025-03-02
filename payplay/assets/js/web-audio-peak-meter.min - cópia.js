var webAudioPeakMeter = (function () {
  "use strict";
  var t,
    e,
    n,
    o,
    i,
    r,
    l = {
      borderSize: 2,
      fontSize: 9,
      backgroundColor: "gray",
      tickColor: "#ddd",
      gradient: ["red 1%", "#ff0 16%", "lime 45%", "#080 100%"],
      dbRange: 48,
      dbTickSize: 6,
      maskTransition: "0.1s",
    },
    a = !0,
    s = 1,
    d = [],
    c = [],
    p = [],
    f = [],
    u = [],
    y = function (t, e) {
      return Math.log(e) / Math.log(t);
    },
    h = function (t) {
      return 20 * y(10, t);
    },
    x = function (e) {
      for (var n in e) e.hasOwnProperty(n) && (l[n] = e[n]);
      (t = 2 * l.fontSize), (r = 1.5 * l.fontSize + l.borderSize);
    },
    g = function (t, e) {
      var n = t.channelCount,
        o = e.createScriptProcessor(2048, n, n);
      return t.connect(o), o.connect(e.destination), o;
    },
    v = function (t) {
      var o = document.createElement("div");
      return (
        (o.style.position = "relative"),
        (o.style.width = e + "px"),
        (o.style.height = n + "px"),
        (o.style.backgroundColor = l.backgroundColor),
        t.appendChild(o),
        o
      );
    },
    b = function (y, h, g) {
      x(g), (e = y.clientWidth), (n = y.clientHeight);
      var b = v(y);
      e > n && (a = !1),
        (o = n - r - l.borderSize),
        (i = e - t - l.borderSize),
        S(b),
        z(b, i, o, r, t),
        (s = h.channelCount);
      var m = i / s;
      a || (m = o / s);
      var T = t;
      a || (T = r);
      for (var E = 0; E < s; E++)
        k(b, l.borderSize, r, T, !1),
          (d[E] = k(b, m, r, T, l.maskTransition)),
          (c[E] = 0),
          (p[E] = C(b, m, T)),
          (T += m),
          (f[E] = 0),
          (u[E] = "-âˆž");
      (h.onaudioprocess = w),
        b.addEventListener(
          "click",
          function () {
            for (var t = 0; t < s; t++) (c[t] = 0), (u[t] = "-âˆž");
          },
          !1
        ),
        M();
    },
    S = function (e) {
      var n = Math.floor(l.dbRange / l.dbTickSize),
        r = 0;
      if (a)
        for (var s = l.fontSize + l.borderSize, d = 0; d < n; d++) {
          var c = document.createElement("div");
          e.appendChild(c),
            (c.style.width = t + "px"),
            (c.style.textAlign = "right"),
            (c.style.color = l.tickColor),
            (c.style.fontSize = l.fontSize + "px"),
            (c.style.position = "absolute"),
            (c.style.top = s + "px"),
            (c.textContent = r + ""),
            (r -= l.dbTickSize),
            (s += o / n);
        }
      else {
        t = i / n;
        for (var p = 2 * l.fontSize, d = 0; d < n; d++) {
          var c = document.createElement("div");
          e.appendChild(c),
            (c.style.width = t + "px"),
            (c.style.textAlign = "right"),
            (c.style.color = l.tickColor),
            (c.style.fontSize = l.fontSize + "px"),
            (c.style.position = "absolute"),
            (c.style.right = p + "px"),
            (c.textContent = r + ""),
            (r -= l.dbTickSize),
            (p += t);
        }
      }
    },
    z = function (t, e, n, o, i) {
      var r = document.createElement("div");
      if (
        (t.appendChild(r),
        (r.style.width = e + "px"),
        (r.style.height = n + "px"),
        (r.style.position = "absolute"),
        (r.style.top = o + "px"),
        a)
      ) {
        r.style.left = i + "px";
        var s = "linear-gradient(to bottom, " + l.gradient.join(", ") + ")";
      } else {
        r.style.left = l.borderSize + "px";
        var s = "linear-gradient(to left, " + l.gradient.join(", ") + ")";
      }
      return (r.style.backgroundImage = s), r;
    },
    C = function (t, e, n) {
      var o = document.createElement("div");
      return (
        t.appendChild(o),
        (o.style.textAlign = "center"),
        (o.style.color = l.tickColor),
        (o.style.fontSize = l.fontSize + "px"),
        (o.style.position = "absolute"),
        (o.textContent = "-âˆž"),
        a
          ? ((o.style.width = e + "px"),
            (o.style.top = l.borderSize + "px"),
            (o.style.left = n + "px"))
          : ((o.style.width = 2 * l.fontSize + "px"),
            (o.style.right = l.borderSize + "px"),
            (o.style.top = 0.25 * e + n + "px")),
        o
      );
    },
    k = function (t, e, n, r, s) {
      var d = document.createElement("div");
      return (
        t.appendChild(d),
        (d.style.position = "absolute"),
        a
          ? ((d.style.width = e + "px"),
            (d.style.height = o + "px"),
            (d.style.top = n + "px"),
            (d.style.left = r + "px"))
          : ((d.style.width = i + "px"),
            (d.style.height = e + "px"),
            (d.style.top = r + "px"),
            (d.style.right = 2 * l.fontSize + "px")),
        (d.style.backgroundColor = l.backgroundColor),
        s &&
          (a
            ? (d.style.transition = "height " + l.maskTransition)
            : (d.style.transition = "width " + l.maskTransition)),
        d
      );
    },
    m = function (t) {
      var e = a ? o : i;
      if (0 === t) return e;
      var n = l.dbRange * -1,
        r = Math.floor((h(t) * e) / n);
      return r > e ? e : r;
    },
    w = function (t) {
      var e,
        n = t.inputBuffer,
        i = [],
        r = [];
      for (e = 0; e < s; e++) (i[e] = n.getChannelData(e)), (r[e] = 0);
      for (var l = 0; l < n.length; l++)
        for (e = 0; e < s; e++)
          Math.abs(i[e][l]) > r[e] && (r[e] = Math.abs(i[e][l]));
      for (e = 0; e < s; e++)
        (f[e] = m(r[e], o)),
          r[e] > c[e] && ((c[e] = r[e]), (u[e] = h(c[e]).toFixed(1)));
    },
    M = function () {
      for (var t = 0; t < s; t++)
        a
          ? (d[t].style.height = f[t] + "px")
          : (d[t].style.width = f[t] + "px"),
          (p[t].textContent = u[t]);
      window.requestAnimationFrame(M);
    };
  return { createMeterNode: g, createMeter: b };
})();

var webAudioPeakMeter2 = (function () {
  "use strict";
  var t,
    e,
    n,
    o,
    i,
    r,
    l = {
      borderSize: 2,
      fontSize: 9,
      backgroundColor: "gray",
      tickColor: "#ddd",
      gradient: ["red 1%", "#ff0 16%", "lime 45%", "#080 100%"],
      dbRange: 48,
      dbTickSize: 6,
      maskTransition: "0.1s",
    },
    a = !0,
    s = 1,
    d = [],
    c = [],
    p = [],
    f = [],
    u = [],
    y = function (t, e) {
      return Math.log(e) / Math.log(t);
    },
    h = function (t) {
      return 20 * y(10, t);
    },
    x = function (e) {
      for (var n in e) e.hasOwnProperty(n) && (l[n] = e[n]);
      (t = 2 * l.fontSize), (r = 1.5 * l.fontSize + l.borderSize);
    },
    g = function (t, e) {
      var n = t.channelCount,
        o = e.createScriptProcessor(2048, n, n);
      return t.connect(o), o.connect(e.destination), o;
    },
    v = function (t) {
      var o = document.createElement("div");
      return (
        (o.style.position = "relative"),
        (o.style.width = e + "px"),
        (o.style.height = n + "px"),
        (o.style.backgroundColor = l.backgroundColor),
        t.appendChild(o),
        o
      );
    },
    b = function (y, h, g) {
      x(g), (e = y.clientWidth), (n = y.clientHeight);
      var b = v(y);
      e > n && (a = !1),
        (o = n - r - l.borderSize),
        (i = e - t - l.borderSize),
        S(b),
        z(b, i, o, r, t),
        (s = h.channelCount);
      var m = i / s;
      a || (m = o / s);
      var T = t;
      a || (T = r);
      for (var E = 0; E < s; E++)
        k(b, l.borderSize, r, T, !1),
          (d[E] = k(b, m, r, T, l.maskTransition)),
          (c[E] = 0),
          (p[E] = C(b, m, T)),
          (T += m),
          (f[E] = 0),
          (u[E] = "-âˆž");
      (h.onaudioprocess = w),
        b.addEventListener(
          "click",
          function () {
            for (var t = 0; t < s; t++) (c[t] = 0), (u[t] = "-âˆž");
          },
          !1
        ),
        M();
    },
    S = function (e) {
      var n = Math.floor(l.dbRange / l.dbTickSize),
        r = 0;
      if (a)
        for (var s = l.fontSize + l.borderSize, d = 0; d < n; d++) {
          var c = document.createElement("div");
          e.appendChild(c),
            (c.style.width = t + "px"),
            (c.style.textAlign = "right"),
            (c.style.color = l.tickColor),
            (c.style.fontSize = l.fontSize + "px"),
            (c.style.position = "absolute"),
            (c.style.top = s + "px"),
            (c.textContent = r + ""),
            (r -= l.dbTickSize),
            (s += o / n);
        }
      else {
        t = i / n;
        for (var p = 2 * l.fontSize, d = 0; d < n; d++) {
          var c = document.createElement("div");
          e.appendChild(c),
            (c.style.width = t + "px"),
            (c.style.textAlign = "right"),
            (c.style.color = l.tickColor),
            (c.style.fontSize = l.fontSize + "px"),
            (c.style.position = "absolute"),
            (c.style.right = p + "px"),
            (c.textContent = r + ""),
            (r -= l.dbTickSize),
            (p += t);
        }
      }
    },
    z = function (t, e, n, o, i) {
      var r = document.createElement("div");
      if (
        (t.appendChild(r),
        (r.style.width = e + "px"),
        (r.style.height = n + "px"),
        (r.style.position = "absolute"),
        (r.style.top = o + "px"),
        a)
      ) {
        r.style.left = i + "px";
        var s = "linear-gradient(to bottom, " + l.gradient.join(", ") + ")";
      } else {
        r.style.left = l.borderSize + "px";
        var s = "linear-gradient(to left, " + l.gradient.join(", ") + ")";
      }
      return (r.style.backgroundImage = s), r;
    },
    C = function (t, e, n) {
      var o = document.createElement("div");
      return (
        t.appendChild(o),
        (o.style.textAlign = "center"),
        (o.style.color = l.tickColor),
        (o.style.fontSize = l.fontSize + "px"),
        (o.style.position = "absolute"),
        (o.textContent = "-âˆž"),
        a
          ? ((o.style.width = e + "px"),
            (o.style.top = l.borderSize + "px"),
            (o.style.left = n + "px"))
          : ((o.style.width = 2 * l.fontSize + "px"),
            (o.style.right = l.borderSize + "px"),
            (o.style.top = 0.25 * e + n + "px")),
        o
      );
    },
    k = function (t, e, n, r, s) {
      var d = document.createElement("div");
      return (
        t.appendChild(d),
        (d.style.position = "absolute"),
        a
          ? ((d.style.width = e + "px"),
            (d.style.height = o + "px"),
            (d.style.top = n + "px"),
            (d.style.left = r + "px"))
          : ((d.style.width = i + "px"),
            (d.style.height = e + "px"),
            (d.style.top = r + "px"),
            (d.style.right = 2 * l.fontSize + "px")),
        (d.style.backgroundColor = l.backgroundColor),
        s &&
          (a
            ? (d.style.transition = "height " + l.maskTransition)
            : (d.style.transition = "width " + l.maskTransition)),
        d
      );
    },
    m = function (t) {
      var e = a ? o : i;
      if (0 === t) return e;
      var n = l.dbRange * -1,
        r = Math.floor((h(t) * e) / n);
      return r > e ? e : r;
    },
    w = function (t) {
      var e,
        n = t.inputBuffer,
        i = [],
        r = [];
      for (e = 0; e < s; e++) (i[e] = n.getChannelData(e)), (r[e] = 0);
      for (var l = 0; l < n.length; l++)
        for (e = 0; e < s; e++)
          Math.abs(i[e][l]) > r[e] && (r[e] = Math.abs(i[e][l]));
      for (e = 0; e < s; e++)
        (f[e] = m(r[e], o)),
          r[e] > c[e] && ((c[e] = r[e]), (u[e] = h(c[e]).toFixed(1)));
    },
    M = function () {
      for (var t = 0; t < s; t++)
        a
          ? (d[t].style.height = f[t] + "px")
          : (d[t].style.width = f[t] + "px"),
          (p[t].textContent = u[t]);
      window.requestAnimationFrame(M);
    };
  return { createMeterNode: g, createMeter: b };
})();
