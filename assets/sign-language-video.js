(function () {
  "use strict";

  var HANDLE_SELECTOR = '[role="button"][aria-label="Drag sign language video"]';
  var enhancedHandles = new WeakSet();
  var scheduled = false;

  function viewportSize() {
    var viewport = window.visualViewport;
    return {
      width: viewport ? viewport.width : window.innerWidth,
      height: viewport ? viewport.height : window.innerHeight
    };
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(value, maximum));
  }

  function movePlayer(player, x, y) {
    var size = viewportSize();
    var width = player.offsetWidth;
    var height = player.offsetHeight;
    var nextX = clamp(x, 0, Math.max(0, size.width - width));
    var nextY = clamp(y, 0, Math.max(0, size.height - height));

    player.style.left = nextX + "px";
    player.style.top = nextY + "px";
    player.style.right = "auto";
    player.style.bottom = "auto";
  }

  function keepPlayerOnScreen(player) {
    window.requestAnimationFrame(function () {
      if (!player.isConnected) return;
      var rect = player.getBoundingClientRect();
      var size = viewportSize();
      var fullyVisible =
        rect.left >= 0 &&
        rect.top >= 0 &&
        rect.right <= size.width &&
        rect.bottom <= size.height;

      if (!fullyVisible) movePlayer(player, rect.left, rect.top);
    });
  }

  function enhanceHandle(handle) {
    if (enhancedHandles.has(handle)) return;
    var player = handle.parentElement;
    if (!player || !player.querySelector("video")) return;

    enhancedHandles.add(handle);
    handle.setAttribute("data-sign-language-drag-handle", "");
    player.setAttribute("data-sign-language-player", "");

    var drag = null;

    handle.addEventListener(
      "touchstart",
      function (event) {
        if (event.touches.length !== 1) return;
        var touch = event.touches[0];
        var rect = player.getBoundingClientRect();
        drag = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
        player.setAttribute("data-sign-language-dragging", "");
        event.preventDefault();
      },
      { passive: false }
    );

    handle.addEventListener(
      "touchmove",
      function (event) {
        if (!drag || event.touches.length !== 1) return;
        var touch = event.touches[0];
        movePlayer(player, touch.clientX - drag.x, touch.clientY - drag.y);
        event.preventDefault();
      },
      { passive: false }
    );

    function finishTouch(event) {
      if (!drag) return;
      var touch = event.changedTouches && event.changedTouches[0];
      if (touch) movePlayer(player, touch.clientX - drag.x, touch.clientY - drag.y);
      drag = null;
      player.removeAttribute("data-sign-language-dragging");
      event.preventDefault();
    }

    handle.addEventListener("touchend", finishTouch, { passive: false });
    handle.addEventListener("touchcancel", finishTouch, { passive: false });

    var video = player.querySelector("video");
    if (video) video.addEventListener("loadedmetadata", function () { keepPlayerOnScreen(player); });
    keepPlayerOnScreen(player);
  }

  function install() {
    scheduled = false;
    var handles = document.querySelectorAll(HANDLE_SELECTOR);
    Array.prototype.forEach.call(handles, enhanceHandle);
    Array.prototype.forEach.call(handles, function (handle) {
      if (handle.parentElement) keepPlayerOnScreen(handle.parentElement);
    });
  }

  function scheduleInstall() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(install);
  }

  var observer = new MutationObserver(scheduleInstall);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("resize", scheduleInstall);
  window.addEventListener("orientationchange", scheduleInstall);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", scheduleInstall);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleInstall, { once: true });
  } else {
    scheduleInstall();
  }
})();
