(function () {
  var section = document.querySelector("[data-section-id]");
  if (!section) return;
  var sectionId = section.getAttribute("data-section-id");
  var controls = Array.prototype.slice.call(section.querySelectorAll("[data-response-control]"));
  var storageKey = "adt-learn-english-std2:" + sectionId;
  function values() { return controls.map(function (control) { return control.value; }); }
  function updateStatus() {
    var filled = controls.filter(function (control) { return String(control.value).trim().length > 0; }).length;
    section.querySelectorAll(".response-status").forEach(function (status) {
      status.textContent = filled ? filled + " response" + (filled === 1 ? "" : "s") + " saved on this page." : "";
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
})();
