(function () {
  "use strict";
  var source = document.getElementById("content");
  if (!source) return;
  var markup = {
    "pg028_n0005": 'Example: <span class="source-example-accent">p</span>in – <span class="source-example-accent">ti</span>n',
    "pg029_n0003": '3. Pronounce the first sound in each word. Then, read the words aloud or finger spell the first letters in each word then sign the words<br>Example: goa<span class="source-example-accent">t</span>-goa<span class="source-example-accent">l</span><br>(a) bat-bad<br>(b) pod-pot<br>(c) card-cart<br>(d) cup-cub<br>(e) fan-fat<br>(f) nap-nab',
    "pg051_n0005": 'Example: <span class="source-example-accent">p</span>in-<span class="source-example-accent">t</span>in',
    "pg052_n0003": '3. Pronounce the last sound in each word of the following pairs. Then, read the words aloud. Or finger spell the last letters in each word. Then, sign the words.<br>Example: goa<span class="source-example-accent">t</span>-goa<span class="source-example-accent">l</span><br>(a) bat-bad<br>(b) pod-pot<br>(c) card-cart<br>(d) cup-cub<br>(e) fan-fat<br>(f) nap-nab',
    "pg058_n0006": '2. Add a sound at the beginning of the following words: <span class="source-example-accent">and</span>, <span class="source-example-accent">end</span>. Or fingerspell additional letters at the beginning of the following words: <span class="source-example-accent">and</span>, <span class="source-example-accent">end</span>. Make as many correct words as possible.',
    "pg058_n0008": '<span class="source-example-line">and- <span class="source-example-accent">h</span>and</span><br><span class="source-example-line">end- <span class="source-example-accent">s</span>end</span>',
    "pg059_n0003": 'Example: top-<span class="source-example-accent">s</span>top',
    "pg059_ref036_n0002": 'Add appropriate letter sounds <span class="source-exercise-accent">s</span>, <span class="source-exercise-accent">b</span>, <span class="source-exercise-accent">c</span>, <span class="source-exercise-accent">d</span>, <span class="source-exercise-accent">f</span> and <span class="source-exercise-accent">t</span> at the beginning of each word to form correct words. Or add appropriate letters <span class="source-exercise-accent">s</span>, <span class="source-exercise-accent">b</span>, <span class="source-exercise-accent">c</span>, <span class="source-exercise-accent">d</span>, <span class="source-exercise-accent">f</span> and <span class="source-exercise-accent">t</span> at the beginning of each word and sign the correct words.',
    "pg059_n0010": 'Example: car-car<span class="source-example-accent">d</span>',
    "pg062_n0005": 'Example: <span class="source-example-accent">b</span>ox-<span class="source-example-accent">f</span>ox',
    "pg062_n0008": 'Example: <span class="source-example-accent">f</span>in-<span class="source-example-accent">p</span>in',
    "pg063_ref040_exercise_4_example": '<strong>Example:</strong> <span class="source-exercise-accent">h</span>ug-<span class="source-exercise-accent">t</span>ug',
    "pg065_ref042_n0003": '1. Replace the middle sounds of the words with the letter sound <span class="source-exercise-accent">o</span>. Then, pronounce the new words formed. Or replace the middle letters of the words with the letter <span class="source-exercise-accent">o</span>. Then, sign the new words formed.',
    "pg066_ref042_exercise_5_q2": '2. Replace the vowel sounds of the words with the letter sound <span class="source-exercise-accent">a</span>. Then, pronounce the new words formed. Or replace the vowel letters of the words with the letter <span class="source-exercise-accent">a</span>. Then, sign the new words formed.',
    "pg057_n0010": '1. Pronounce or sign the words <span class="source-example-accent">and</span>, and <span class="source-example-accent">end</span>.',
    "pg057_n0011": '2. Add a sound at the beginning of the following words: <span class="source-example-accent">and</span> , <span class="source-example-accent">end</span>. Or<br> fingerspell additional letters at the beginning of the following words: <span class="source-example-accent">and</span>, <span class="source-example-accent">end</span>. Make as many correct words as possible.',
    "pg057_n0012": 'Examples of the word <span class="source-example-accent">and</span>',
    "pg057_n0013": 'and- <span class="source-example-accent">h</span>and<br> and- <span class="source-example-accent">l</span>and',
    "pg035_n0008": 'Example: top- <span class="source-example-accent">s</span>top',
    "pg059_n0002": 'Add appropriate letter sounds <span class="source-exercise-accent">s</span>, <span class="source-exercise-accent">b</span>, <span class="source-exercise-accent">c</span>, <span class="source-exercise-accent">d</span> and <span class="source-exercise-accent">f</span> at the beginning of each word to form correct words. Or add appropriate letters, <span class="source-exercise-accent">b</span>, <span class="source-exercise-accent">c</span>, <span class="source-exercise-accent">d</span> and <span class="source-exercise-accent">f</span> at the beginning of each word to sign correct words',
    "pg059_n0019": 'Example: car-car<span class="source-example-accent">d</span>',
    "pg038_n0005": 'Example: <span class="source-example-accent">b</span>ox-<span class="source-example-accent">f</span>ox',
    "pg039_n0007": 'Example: <span class="source-example-accent">f</span>in-<span class="source-example-accent">p</span>in',
    "pg063_exercise_4_example": '<strong>Example:</strong> <span class="source-exercise-accent">h</span>ug-<span class="source-exercise-accent">t</span>ug',
    "pg044_n0003": 'Example: ba<span class="source-example-accent">t</span>-ba<span class="source-example-accent">n</span>',
    "pg065_exercise_5_q2": '2. Replace the vowel sounds of the words with the letter sound <span class="source-exercise-accent">a</span>. Then, pronounce the new words formed. Or replace the vowel letters of the words with the letter <span class="source-exercise-accent">a</span>. Then, sign the new words formed.'
  };
  var restoring = false;
  function restoreBookMarkup() {
    if (restoring) return;
    restoring = true;
    Object.keys(markup).forEach(function (dataId) {
      var node = source.querySelector('[data-id="' + dataId + '"]');
      if (!node || node.querySelector("[data-word-index], .bg-yellow-300")) return;
      if (!node.querySelector(".source-example-accent, .source-exercise-accent")) {
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
  observer.observe(source, { childList: true, subtree: true, characterData: true });
  restoreBookMarkup();
})();
