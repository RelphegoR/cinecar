// Shows Turkish or English: ?lang=en in the address, then the visitor's earlier choice, then the browser language.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("cinecar-lang"); } catch (e) {}
  var param = new URLSearchParams(location.search).get("lang");
  var browser = (navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  var lang = param === "tr" || param === "en" ? param : (stored || browser);
  function apply(next) {
    lang = next;
    root.setAttribute("data-lang", next);
    root.setAttribute("lang", next);
    try { localStorage.setItem("cinecar-lang", next); } catch (e) {}
    var titles = { tr: root.getAttribute("data-title-tr"), en: root.getAttribute("data-title-en") };
    if (titles[next]) document.title = titles[next];
  }
  apply(lang);
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-switch").forEach(function (button) {
      button.addEventListener("click", function () { apply(lang === "tr" ? "en" : "tr"); });
    });
    document.querySelectorAll("[data-copy]").forEach(function (button) {
      button.addEventListener("click", function () {
        var text = button.getAttribute("data-copy");
        var label = button.textContent;
        function done(message) { button.textContent = message; setTimeout(function () { button.textContent = label; }, 1600); }
        try {
          navigator.clipboard.writeText(text).then(function () { done(lang === "tr" ? "Kopyalandı" : "Copied"); }, function () { done(text); });
        } catch (e) { done(text); }
      });
    });
  });
})();
