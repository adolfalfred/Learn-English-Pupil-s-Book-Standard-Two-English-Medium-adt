(function () {
  "use strict";
  var sourceIds = [
    "pg027_sec001-source",
    "pg035_sec001-source",
    "pg051_sec001-source",
    "pg052_sec001-source",
    "pg057_sec001-source",
    "pg059_sec001-source",
    "pg062_sec001-source",
    "pg063_sec001-source",
    "pg065_sec001-source",
    "pg066_sec001-source",
    "pg067_sec001-source"
  ];
  var sources = sourceIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (!sources.length) return;
  var markup = {
    "pg027_n0004": "Act out the following dialogue:",
    "pg035_n0005": "3. Ask and respond to the following questions:",
    "pg051_n0005": 'Example: <span class="source-example-accent">p</span>in-<span class="source-example-accent">t</span>in',
    "pg052_n0003": '3. Pronounce the last sound in each word of the following pairs. Then, read the words aloud. Or finger spell the last letters in each word. Then, sign the words.<br>Example: goa<span class="source-example-accent">t</span>-goa<span class="source-example-accent">l</span><br>(a) bat-bad<br>(b) pod-pot<br>(c) card-cart<br>(d) cup-cub<br>(e) fan-fat<br>(f) nap-nab',
    "pg057_n0010": '1. Pronounce the words <span class="source-example-accent">and</span>, and <span class="source-example-accent">end</span>.',
    "pg057_n0011": '2. Add a sound at the beginning of the following words: <span class="source-example-accent">and</span>, <span class="source-example-accent">end</span>. Make as many correct words as possible.',
    "pg057_n0012": 'Examples of the word <span class="source-example-accent">and</span>',
    "pg057_n0013": 'and- <span class="source-example-accent">h</span>and<br> and- <span class="source-example-accent">l</span>and',
    "pg059_n0002": 'Add appropriate letter sounds <span class="source-exercise-accent">s</span>, <span class="source-exercise-accent">b</span>, <span class="source-exercise-accent">c</span>, <span class="source-exercise-accent">d</span> and <span class="source-exercise-accent">f</span> at the beginning of each word to form correct words.',
    "pg059_n0003": 'Example: top- <span class="source-example-accent">s</span>top',
    "pg059_n0010": 'Example: car-car<span class="source-example-accent">d</span>',
    "pg062_n0005": 'Example: <span class="source-example-accent">b</span>ox- <span class="source-example-accent">f</span>ox',
    "pg062_n0008": 'Example: <span class="source-example-accent">f</span>in- <span class="source-example-accent">p</span>in',
    "pg063_exercise_4_example": '<strong>Example:</strong> <span class="source-exercise-accent">h</span>ug-<span class="source-exercise-accent">t</span>ug',
    "pg065_ref042_n0003": '1. Replace the middle sounds of the words with the letter sound <span class="source-exercise-accent">o</span>. Then, pronounce the new words formed. Or replace the middle letters of the words with the letter <span class="source-exercise-accent">o</span>. Then, sign the new words formed.',
    "pg066_ref042_exercise_5_q2": '2. Replace the vowel sounds of the words with the letter sound <span class="source-exercise-accent">a</span>. Then, pronounce the new words formed. Or replace the vowel letters of the words with the letter <span class="source-exercise-accent">a</span>. Then, sign the new words formed.',
    "pg067_exercise_6_example": 'Example: ba<span class="source-example-accent">t</span>-ba<span class="source-example-accent">n</span>'
  };
  var restoring = false;
  function restoreBookMarkup() {
    if (restoring) return;
    restoring = true;
    Object.keys(markup).forEach(function (dataId) {
      var node = null;
      sources.some(function (source) {
        node = source.querySelector('[data-id="' + dataId + '"]');
        return Boolean(node);
      });
      if (!node || node.querySelector("[data-word-index], .bg-yellow-300")) return;
      if (node.innerHTML !== markup[dataId]) {
        node.innerHTML = markup[dataId];
      }
    });
    restoring = false;
  }
  var queued = false;
  var observer = new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      restoreBookMarkup();
    });
  });
  sources.forEach(function (source) {
    observer.observe(source, { childList: true, subtree: true, characterData: true });
  });
  restoreBookMarkup();
})();
