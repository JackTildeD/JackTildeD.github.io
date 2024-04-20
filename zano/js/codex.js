"use strict";
// javascript

/* --- 80 cols -------------------------------------------------------------- */

let iconSelected = null;

const getGetParam = () => new URLSearchParams(window.location.search).get("g");

const codexNav = async (g) => {
  if (g !== getGetParam()) return;
  for (const elem of document.getElementsByClassName("codex-nav-parent"))
    elem.style.display = g === null ? "none" : "block";
  if (typeof g === "undefined" || g === null || isNaN(parseInt(g))) return;
  const num = parseInt(g);
  const directory = await getDirectory();
  const pages = directory.filter((x) => x.filename);
  const last = Math.max(0, pages.length - 1);
  if (0 <= num && num <= last)
    for (const title of document.getElementsByClassName("codex-title"))
      title.innerHTML = escapeHTML(pages[num].title);
  for (const elem of document.getElementsByClassName("codex-nav--current"))
    elem.innerHTML = escapeHTML(num + 1);
  if (num < last) {
    for (const elem of document.getElementsByClassName("codex-nav--next")) {
      elem.value = encodeURIComponent(Math.min(last, num + 1));
      elem.className = elem.className.replace(
        "codex-nav--disable",
        "codex-nav--enable",
      );
    }
    for (const elem of document.getElementsByClassName("codex-nav--last")) {
      elem.value = encodeURIComponent(last);
      elem.className = elem.className.replace(
        "codex-nav--disable",
        "codex-nav--enable",
      );
    }
  } else {
    for (const elem of document.getElementsByClassName("codex-nav--next")) {
      elem.value = encodeURIComponent(num);
      elem.className = elem.className.replace(
        "codex-nav--enable",
        "codex-nav--disable",
      );
    }
    for (const elem of document.getElementsByClassName("codex-nav--last")) {
      elem.value = encodeURIComponent(num);
      elem.className = elem.className.replace(
        "codex-nav--enable",
        "codex-nav--disable",
      );
    }
  }
  if (0 < num) {
    for (const elem of document.getElementsByClassName("codex-nav--previous")) {
      elem.value = encodeURIComponent(Math.max(0, num - 1));
      elem.className = elem.className.replace(
        "codex-nav--disable",
        "codex-nav--enable",
      );
    }
    for (const elem of document.getElementsByClassName("codex-nav--first")) {
      elem.value = encodeURIComponent(0);
      elem.className = elem.className.replace(
        "codex-nav--disable",
        "codex-nav--enable",
      );
    }
  } else {
    for (const elem of document.getElementsByClassName("codex-nav--previous")) {
      elem.value = encodeURIComponent(num);
      elem.className = elem.className.replace(
        "codex-nav--enable",
        "codex-nav--disable",
      );
    }
    for (const elem of document.getElementsByClassName("codex-nav--first")) {
      elem.value = encodeURIComponent(num);
      elem.className = elem.className.replace(
        "codex-nav--enable",
        "codex-nav--disable",
      );
    }
  }
  return;
};

const codexList = async (g) => {
  if (g !== getGetParam() || g !== null) return;
  for (const title of document.getElementsByClassName("codex-title"))
    title.innerHTML = escapeHTML("The Zevash Codex");
  const directory = await getDirectory();
  let i = 0;
  for (const main of document.getElementsByClassName("codex-main")) {
    const list = directory
      .map((item) =>
        item.filename
          ? `<li>
  <p class="codex-list__title">
    <button class="codex-button" value="${encodeURIComponent(i++)}">
      ${escapeHTML(item.title)}
    </button>
  <p class="codex-list__date">
    ${escapeHTML(item.date)}
  </p>
<li>`
          : `<li>
  <p class="post-header">
    ${escapeHTML(item.title)}
  </p>
</li>`,
      )
      .join("\n");
    main.innerHTML = `<div class="post">
  <ul class="codex-list">
    ${list}
  </ul>
</div>
`;
  }
  return;
};

const codexContent = async (g) => {
  if (isNaN(parseInt(g))) return;
  const directory = await getDirectory();
  const pages = directory.filter((x) => x.filename);
  const last = Math.max(0, pages.length - 1);
  if (g !== getGetParam() || g === null || g < 0 || last < g) return;
  const x = directory.filter((item) => item.filename)[g];
  const y = await getCodex(x.filename);
  const html = parseCodex(y);
  for (const main of document.getElementsByClassName("codex-main")) {
    if (g === getGetParam()) main.innerHTML = html;
  }
  return;
};

const codexButtons = () => {
  for (const elem of document.getElementsByClassName("codex-button")) {
    elem.addEventListener("click", async function () {
      if (this.value !== "") {
        let g = this.value;
        this.value = "";
        history.replaceState(
          null,
          null,
          `${
            window.location.href.split("?")[0].split("#")[0]
          }?g=${encodeURIComponent(g)}#top`,
        );
        await update(g);
      }
    });
  }
  for (const elem of document.getElementsByClassName("codex-nav__link")) {
    elem.addEventListener("click", async function () {
      if (DEBUG) echo(`Click value=${this.value}`);
      if (this.value !== "") {
        let g = this.value;
        this.value = "";
        history.replaceState(
          null,
          null,
          `${
            window.location.href.split("?")[0].split("#")[0]
          }?g=${encodeURIComponent(g)}#top`,
        );
        await update(g);
      }
    });
  }
  return;
};

const changeIconOpacities = (x) => {
  for (const elem of document.getElementsByClassName("icon-picture"))
    elem.style.opacity = 0.5;
  x.style.opacity = 1;
  return;
};

const handleIconSelectionHTML = async (g) => {
  if (g !== getGetParam()) return;
  const zano__icon = getCookie("zano__icon");
  const zano__name = getCookie("zano__name");
  for (const elem of document.getElementsByClassName("revoke-cookies"))
    if (isNaN(parseInt(g)))
      if (
        !(
          zano__icon !== "User_Icon_1.webp" &&
          zano__icon !== "User_Icon_2.webp" &&
          zano__icon !== "User_Icon_3.webp" &&
          zano__icon !== "User_Icon_4.webp" &&
          (typeof zano__name === "undefined" ||
            zano__name === null ||
            zano__name.trim() === "")
        )
      )
        elem.innerHTML = `<div class="post">
  <button class="revoke-button" type="button">
     Delete my Data
  </button>
</div>`;
      else elem.innerHTML = "";
    else elem.innerHTML = "";
  for (const elem of document.getElementsByClassName("name-and-icon-select"))
    if (isNaN(parseInt(g)))
      if (
        (zano__icon !== "User_Icon_1.webp" &&
          zano__icon !== "User_Icon_2.webp" &&
          zano__icon !== "User_Icon_3.webp" &&
          zano__icon !== "User_Icon_4.webp") ||
        typeof zano__name === "undefined" ||
        zano__name === null ||
        zano__name.trim() === ""
      )
        elem.innerHTML = `<div class="post">
  <div class="flex">
    <img
      class="icon-one icon-picture"
      src="https://jacktilded.github.io/zano/img/User_Icon_1.webp"
    />
    <img
      class="icon-two icon-picture"
      src="https://jacktilded.github.io/zano/img/User_Icon_2.webp"
    />
    <img
      class="icon-three icon-picture"
      src="https://jacktilded.github.io/zano/img/User_Icon_3.webp"
    />
    <img
      class="icon-four icon-picture"
      src="https://jacktilded.github.io/zano/img/User_Icon_4.webp" 
    />
  </div>
  <p class="input-name-before">
    Name: Lieutenant
  </p>
  <input class="input-name" type="name">
  <p>
    This site use cookies to store data on your device. This is required to provide personalized content. You can revoke your selection at the bottom of the page.
  </p>
  <button class="agree-button" type="button">
    Save and Consent to Cookies
  </button>
</div>
`;
      else elem.innerHTML = "";
    else elem.innerHTML = "";
  return;
};

const handleIconSelection = async () => {
  for (const elem of document.getElementsByClassName("icon-one")) {
    if (getCookie("zano__icon") === "User_Icon_1.webp")
      changeIconOpacities(elem);
    elem.addEventListener("click", function (x) {
      changeIconOpacities(this);
      iconSelected = "User_Icon_1.webp";
      return;
    });
  }
  for (const elem of document.getElementsByClassName("icon-two")) {
    if (getCookie("zano__icon") === "User_Icon_2.webp")
      changeIconOpacities(elem);
    elem.addEventListener("click", function (x) {
      changeIconOpacities(this);
      iconSelected = "User_Icon_2.webp";
      return;
    });
  }
  for (const elem of document.getElementsByClassName("icon-three")) {
    if (getCookie("zano__icon") === "User_Icon_3.webp")
      changeIconOpacities(elem);
    elem.addEventListener("click", function (x) {
      changeIconOpacities(this);
      iconSelected = "User_Icon_3.webp";
      return;
    });
  }
  for (const elem of document.getElementsByClassName("icon-four")) {
    if (getCookie("zano__icon") === "User_Icon_4.webp")
      changeIconOpacities(elem);
    elem.addEventListener("click", function (x) {
      changeIconOpacities(this);
      iconSelected = "User_Icon_4.webp";
      return;
    });
  }
  for (const elem of document.getElementsByClassName("agree-button")) {
    elem.addEventListener("click", function (x) {
      if (
        iconSelected === "User_Icon_1.webp" ||
        iconSelected === "User_Icon_2.webp" ||
        iconSelected === "User_Icon_3.webp" ||
        iconSelected === "User_Icon_4.webp"
      )
        setCookie("zano__icon", iconSelected, 18250);
      for (const elem2 of document.getElementsByClassName("input-name"))
        if (elem2.value.trim() !== "")
          setCookie("zano__name", elem2.value.normalize("NFC").trim(), 18250);
      update();
      return;
    });
  }
  for (const elem of document.getElementsByClassName("revoke-button")) {
    elem.addEventListener("click", function (x) {
      deleteCookies();
      update();
      return;
    });
  }
};

const update = async (g) => {
  g = typeof g === "undefined" ? getGetParam() : g;
  if (false && DEBUG) console.log(`Called with g=${g}`);
  await codexNav(g);
  await codexList(g);
  await codexContent(g);
  await codexButtons();
  await handleIconSelectionHTML(g);
  await handleIconSelection();
  fadeIn();
  expandButtons();
  return;
};

document.addEventListener("DOMContentLoaded", async () => await update());

// END OF LINE
