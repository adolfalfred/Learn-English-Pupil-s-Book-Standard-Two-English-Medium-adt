(function () {
  "use strict";
  var closeFlag = "adt-close-restored-navigation";

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest('[role="dialog"] li button');
    var mainMenu = document.querySelector('button[aria-label="Main Menu"][aria-pressed="true"]');
    if (button && mainMenu) {
      sessionStorage.setItem(closeFlag, "1");
    }
  }, true);

  if (sessionStorage.getItem(closeFlag) !== "1") return;
  sessionStorage.removeItem(closeFlag);

  var observer;
  var timeout;
  function finish() {
    if (observer) observer.disconnect();
    if (timeout) clearTimeout(timeout);
  }
  function dismissRestoredNavigation() {
    var mainMenu = document.querySelector('button[aria-label="Main Menu"][aria-pressed="true"]');
    var dialog = document.querySelector('[role="dialog"]');
    if (!mainMenu || !dialog) return;
    document.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      which: 27,
      bubbles: true,
      cancelable: true
    }));
    finish();
  }

  observer = new MutationObserver(dismissRestoredNavigation);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["aria-pressed", "role"]
  });
  timeout = setTimeout(finish, 5000);
  dismissRestoredNavigation();
})();
