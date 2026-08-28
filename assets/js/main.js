window.GI = (function () {
  var PHONE = "905377881563";

  function wa(message) {
    return "https://wa.me/" + PHONE + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  // Wizard: on button click, read fields via buildMessageFn and open WhatsApp
  function bindWizard(formId, buttonId, buildMessageFn) {
    var form = document.getElementById(formId);
    var btn = document.getElementById(buttonId);
    if (!form || !btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var msg = buildMessageFn(form);
      if (!msg) return;
      window.open(wa(msg), "_blank");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Mobile nav
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
    }

    // Animated counters: <b data-count="5000">0</b>
    var counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          io.unobserve(el);
          var target = parseInt(el.getAttribute("data-count"), 10);
          var start = null;
          function tick(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 1200, 1);
            el.textContent = Math.floor(p * target).toLocaleString("tr-TR") + (p === 1 ? "+" : "");
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(function (c) {
        c.textContent = parseInt(c.getAttribute("data-count"), 10).toLocaleString("tr-TR") + "+";
      });
    }

    // Product filter: buttons [data-filter="all|sifir|ikinciel|aksesuar"], cards [data-cat]
    var filterBtns = document.querySelectorAll("[data-filter]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        document.querySelectorAll("[data-cat]").forEach(function (card) {
          card.style.display = (f === "all" || card.getAttribute("data-cat") === f) ? "" : "none";
        });
      });
    });
  });

  return { wa: wa, bindWizard: bindWizard };
})();
