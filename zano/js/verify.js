"use strict";
// javascript

/* --- 80 cols -------------------------------------------------------------- */

const analyze = (x) =>
  [
    x.match(/</g),
    x.match(/>/g),
    x.match(/<\s*DIV[^>]*>/gim),
    x.match(/<\s*\/\s*DIV[^>]*>/gim),
    x.match(/<\s*SPAN[^>]*>/gim),
    x.match(/<\s*\/\s*SPAN[^>]*>/gim),
    x.match(/<\s*PRE[^>]*>/gim),
    x.match(/<\s*\/\s*PRE[^>]*>/gim),
  ].map((x) => (x ? x.length : 0));

const update = () => {
  fadeIn();
  expandButtons();
  return;
};

document.addEventListener("DOMContentLoaded", () => {
  for (const elem of document.getElementsByClassName("text-input"))
    elem.value = `Use this page to help write codex pages.
Press the example button to see an example to study.
Note: please encode your text files with UTF-8.
Note: to use "\\", "<", or ">" in your document replace them with ${""}"\\\\", "\\<", or "\\>".
Note: you can use Unicode chacacters!
Enter text...`;
});

for (const elem of document.getElementsByClassName("button-example")) {
  elem.addEventListener("click", async () => {
    const example = await getCodex("example.txt");
    for (const main of document.getElementsByClassName("text-input"))
      main.value = example;
  });
}

for (const elem of document.getElementsByClassName("button-verify"))
  elem.addEventListener("click", () => {
    let html, info;
    for (const elem of document.getElementsByClassName("text-input")) {
      const t1 = performance.now();
      html = parseCodex(elem.value);
      const t2 = performance.now();
      info = analyze(html)
        .concat(html.length)
        .concat(Math.abs(t2 - t1));
    }
    if (html) {
      for (const elem of document.getElementsByClassName("verify-info__list"))
        elem.innerHTML = `<ul>
  <li>
    Opening angle brakets: ${info[0]} ${info[0] == info[1] ? "OK" : "MISMATCH"}
  </li>
  <li>
    Closing angle brakets: ${info[1]} ${info[0] == info[1] ? "OK" : "MISMATCH"}
  </li>
  <li>
    Opening block (div) tags: ${info[2]} ${
      info[2] == info[3] ? "OK" : "MISMATCH"
    }
  </li>
  <li>
    Closing block (div) tags: ${info[3]} ${
      info[2] == info[3] ? "OK" : "MISMATCH"
    }
  </li>
  <li>
    Opening style (span) tags: ${info[4]} ${
      info[4] == info[5] ? "OK" : "MISMATCH"
    }
  </li>
  <li>
    Closing style (span) tags: ${info[5]} ${
      info[4] == info[5] ? "OK" : "MISMATCH"
    }
  </li>
  <li>
    Opening preformatted (pre) tags: ${info[6]} ${
      info[6] == info[7] ? "OK" : "MISMATCH"
    }
  </li>
  <li>
    Closing preformatted (pre) tags: ${info[7]} ${
      info[6] == info[7] ? "OK" : "MISMATCH"
    }
  </li>
  <li>
    Length: ${info[8]} code units (UTF-16)
  </li>
  <li>
    Parse time: ${info[9]} ms ${
      info[9] < 50 ? "OK" : info[9] < 500 ? "???" : "SLOW"
    }
  </li>
</ul>`;
      for (const elem of document.getElementsByClassName("verify-output"))
        elem.innerHTML = html;
    }
    update();
  });

// END OF LINE
