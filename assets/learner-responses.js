(function () {
  var joinedScopes = Array.prototype.slice.call(document.querySelectorAll("[data-response-storage-id]"));
  var scopes = joinedScopes.length ? joinedScopes : Array.prototype.slice.call(document.querySelectorAll("[data-section-id]"));
  scopes.forEach(function (section) {
    var sectionId = section.getAttribute("data-response-storage-id") || section.getAttribute("data-section-id");
    if (!sectionId) return;
    var controls = Array.prototype.slice.call(section.querySelectorAll("[data-response-control]"));
    var storageKey = "adt-learn-english-std2:" + sectionId;
    function values() { return controls.map(function (control) { return control.value; }); }
    function updateStatus() {
      var filled = controls.filter(function (control) { return String(control.value).trim().length > 0; }).length;
      section.querySelectorAll(".response-status").forEach(function (status) {
        status.textContent = filled ? filled + " response" + (filled === 1 ? "" : "s") + " saved in this activity." : "";
      });
      section.dataset.responseComplete = controls.length && filled === controls.length ? "true" : "false";
    }
    try {
      var saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      controls.forEach(function (control, index) { if (typeof saved[index] === "string") control.value = saved[index]; });
    } catch (error) { /* Storage may be unavailable in a restricted SCORM host. */ }
    controls.forEach(function (control) {
      function save() {
        try { localStorage.setItem(storageKey, JSON.stringify(values())); } catch (error) {}
        updateStatus();
        control.dispatchEvent(new CustomEvent("adt-response-updated", { bubbles: true, detail: { sectionId: sectionId } }));
      }
      control.addEventListener("input", save);
      control.addEventListener("change", save);
    });
    updateStatus();
  });
})();
