(function () {
  "use strict";
  var toc = document.querySelector("[data-dynamic-toc]");
  if (!toc) return;

  function cleanHref(value) {
    var clean = String(value || "").split("#")[0].split("?")[0];
    return clean.indexOf("./") === 0 ? clean.slice(2) : clean;
  }

  fetch("./content/pages.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Unable to load the reader spine");
      return response.json();
    })
    .then(function (pages) {
      var positions = new Map();
      pages.forEach(function (page, index) {
        positions.set(cleanHref(page.href || page.url || page.file), index + 1);
      });
      toc.querySelectorAll("[data-toc-target]").forEach(function (link) {
        var href = cleanHref(link.getAttribute("href"));
        var position = positions.get(href);
        var pageNumber = link.querySelector("[data-toc-page]");
        var label = link.querySelector(".book-toc-label");
        if (!position || !pageNumber || !label) return;
        pageNumber.textContent = String(position);
        link.dataset.readerPosition = String(position);
        link.setAttribute("aria-label", label.textContent.trim() + ", digital reader page " + position + " of " + pages.length);
      });
      toc.dataset.tocReady = "true";
    })
    .catch(function () {
      toc.dataset.tocReady = "error";
      toc.querySelectorAll("[data-toc-page]").forEach(function (pageNumber) {
        pageNumber.textContent = "?";
      });
    });
})();
