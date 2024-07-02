(window._iconfont_svg_string_ = '<svg><symbol id="code-copy" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></symbol><symbol id="fail-cross" viewBox="0 0 1024 1024"><path d="M851.416 217.84l-45.256-45.248L512 466.744l-294.152-294.16-45.256 45.256L466.744 512l-294.152 294.16 45.248 45.256L512 557.256l294.16 294.16 45.256-45.256L557.256 512z"></path></symbol><symbol id="logo-github" viewBox="0 0 1024 1024"><path d="M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z"></path></symbol><symbol id="success-hook" viewBox="0 0 16 16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></symbol></svg>'),
(function (a) {
  var t = (t = document.getElementsByTagName("script"))[t.length - 1],
    e = t.getAttribute("data-injectcss"),
    t = t.getAttribute("data-disable-injectsvg");
  if (!t) {
    var i,
      n,
      l,
      c,
      o,
      h = function (t, e) {
        e.parentNode.insertBefore(t, e);
      };
    if (e && !a.__iconfont__svg__cssinject__) {
      a.__iconfont__svg__cssinject__ = !0;
      try {
        document.write(
          "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
        );
      } catch (t) {
        console && console.log(t);
      }
    }
    (i = function () {
      var t,
        e = document.createElement("div");
      (e.innerHTML = a._iconfont_svg_string_),
        (e = e.getElementsByTagName("svg")[0]) &&
          (e.setAttribute("aria-hidden", "true"),
          (e.style.position = "absolute"),
          (e.style.width = 0),
          (e.style.height = 0),
          (e.style.overflow = "hidden"),
          (e = e),
          (t = document.body).firstChild
            ? h(e, t.firstChild)
            : t.appendChild(e));
    }),
      document.addEventListener
        ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
          ? setTimeout(i, 0)
          : ((n = function () {
              document.removeEventListener("DOMContentLoaded", n, !1), i();
            }),
            document.addEventListener("DOMContentLoaded", n, !1))
        : document.attachEvent &&
          ((l = i),
          (c = a.document),
          (o = !1),
          s(),
          (c.onreadystatechange = function () {
            "complete" == c.readyState &&
              ((c.onreadystatechange = null), d());
          }));
  }
  function d() {
    o || ((o = !0), l());
  }
  function s() {
    try {
      c.documentElement.doScroll("left");
    } catch (t) {
      return void setTimeout(s, 50);
    }
    d();
  }
})(window);
