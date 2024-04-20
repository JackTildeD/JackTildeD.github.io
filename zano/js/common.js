"use strict";
// javascript

/* --- 80 cols -------------------------------------------------------------- */

const ZANO_ROOT = "/zano";
const IMG_ROOT = "https://jacktilded.github.io/zano/img";
const DEBUG = true;
const GLICHED = "ß#¶ƒ¿Æ%+";

const echo = (x) => {
    if (DEBUG) console.log(x);
};

document.addEventListener("DOMContentLoaded", () => {
    for (const field of document.getElementsByClassName(
        "common-banner__star-field",
    )) {
        if (!document.getElementsByClassName("common-banner__star").length) {
            for (let i = 0; i < 200; i++) {
                const star = document.createElement("div");
                star.classList.add("common-banner__star");
                star.style.marginLeft = `${Math.random() * 98}%`;
                star.style.marginTop = `${Math.random() * 14.8}rem`;
                star.style.animationDuration = `${10 + Math.random() * 5}s`;
                star.style.animationDelay = `${Math.random() * 10}s`;
                field.appendChild(star);
            }
        }
    }
    return;
});

const fadeIn = () => {
    for (const elem of document.getElementsByClassName("fade-in"))
        new IntersectionObserver((entries, observer) =>
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("appear");
                    observer.disconnect();
                } else return;
            }),
        ).observe(elem);
};

document.addEventListener("DOMContentLoaded", fadeIn);

const expandButtons = () => {
    for (const elem of document.getElementsByClassName("expand-next-button")) {
        let next = elem.nextElementSibling;
        if (next) {
            if (next.classList.contains("expanded"))
                next.classList.toggle("expanded");
            next.style.display = "none";
        }
        elem.addEventListener("click", function () {
            this.classList.toggle("expanded");
            let next = this.nextElementSibling;
            if (next)
                next.style.display = this.classList.contains("expanded")
                    ? "block"
                    : "none";
        });
    }
    for (const elem of document.getElementsByClassName(
        "expand-following-button",
    )) {
        let next = elem.nextElementSibling;
        while (next) {
            if (next.classList.contains("expanded"))
                next.classList.toggle("expanded");
            next.style.display = "none";
            next = next.nextElementSibling;
        }
        elem.addEventListener("click", function () {
            this.classList.toggle("expanded");
            let next = this.nextElementSibling;
            while (next) {
                next.style.display = this.classList.contains("expanded")
                    ? "block"
                    : "none";
                next = next.nextElementSibling;
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", expandButtons);

const escapeHTML = (str) => {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
};

const getCodex = async (x) =>
    await (await fetch(`${ZANO_ROOT}/codex/${x}`)).text();

const getDirectory = async () =>
    (await (await fetch("directory.txt")).text())
        .split("\n")
        .filter((x) => !x.startsWith("#"))
        .map((x) =>
            x
                .split("|")
                .slice(0, 3)
                .concat(x.split("|").slice(3).join("|"))
                .map((y) => y.trim()),
        )
        .map((x) =>
            x[0] === ""
                ? { filename: null, part: x[1], date: null, title: x[3] }
                : {
                      filename: x[0],
                      part: parseInt(x[1]),
                      date: x[2],
                      title: x[3],
                  },
        );

const setCookie = (varName, varValue, days) => {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${varName}=${varValue}; ${expires}; path=/`;
    return;
};

const getCookie = (varName) => {
    const name = `${varName}=`;
    const cookieDecoded = decodeURIComponent(document.cookie);
    const varArr = cookieDecoded.split("; ");
    let result = null;
    varArr.forEach((value) => {
        if (value.indexOf(name) === 0) result = value.substring(name.length);
    });
    return result;
};

const deleteCookie = (varName) => {
    document.cookie = `${varName}=; expires=${new Date(0).toUTCString()}; path=/`;
    return;
};

const deleteCookies = () => {
    const allCookies = document.cookie.split(";");
    for (var i = 0; i < allCookies.length; i++)
        document.cookie = `${allCookies[i]}=; expires=${new Date(0).toUTCString()}; path=/`;
    return;
};

const parseCodex = (x) => {
    const regex =
        /(\\{2})|(\\[<>])|(\n?[ \t]*<[^>]*>[ \t]*\n?)|(\n)|([^\\<>\n]+)/gm;
    let groups;
    let output = "";
    let para = false;
    let pre = false;
    while (true) {
        groups = regex.exec(x);
        if (groups) groups = groups.slice(1);
        else break;
        if (groups[0]) {
            // Backslash
            if (!para) {
                para = true;
                output += "<p>";
            }
            output += escapeHTML("\\");
            continue;
        }
        if (groups[1]) {
            // Angle bracket
            if (!para) {
                para = true;
                output += "<p>";
            }
            output += escapeHTML(groups[1][1]);
            continue;
        }
        if (/^\s*</.test(groups[2])) {
            const classes = groups[2]
                .replace(/(^\s*<\s*\S*\s*)|(>.*)|(["'])/gis, "")
                .toLowerCase();
            const src = groups[2]
                .replace(/(^\s*<\s*\S*\s*)|(>.*)|(["'])/gis, "")
                .split(" ")[0]
                .replace("~", IMG_ROOT);
            const additional = classes.replace(/^\s*\S*\s*/gis, "");
            if (/^\s*<\s*NAME\s?/i.test(groups[2])) {
                // Name
                let zano__name = getCookie("zano__name");
                if (zano__name === null || zano__name === "")
                    zano__name = GLICHED;
                output +=
                    '<span class="codex__name">' +
                    `${escapeHTML(zano__name)}` +
                    "</span>";
                continue;
            }
            if (/^\s*<\s*ICON\s?/i.test(groups[2])) {
                // Icon
                // echo(`>${classes}<`);
                let zano__icon = getCookie("zano__icon");
                if (
                    zano__icon !== "User_Icon_1.webp" &&
                    zano__icon !== "User_Icon_2.webp" &&
                    zano__icon !== "User_Icon_3.webp" &&
                    zano__icon !== "User_Icon_4.webp"
                )
                    zano__icon = "User_Static.webp";
                output += `<div class="${
                    classes.split(" ").includes("hexagon-wrap") ||
                    classes.split(" ").includes("hexagonwrap") ||
                    classes.split(" ").includes("no-wrap") ||
                    classes.split(" ").includes("nowrap")
                        ? classes
                        : "default-wrap " + classes
                }"><img src="${IMG_ROOT}/${zano__icon}"></div>`;
                continue;
            }
            if (/^\s*<\s*BLOCK\s?/i.test(groups[2])) {
                // Begin blocks
                output += `<div class="${classes}">`;
                continue;
            }
            if (/^\s*<\s*END\s+BLOCK/i.test(groups[2])) {
                // End block
                if (para) {
                    para = false;
                    output += "</p>";
                }
                output += "</div>";
                continue;
            }
            if (/^\s*<\s*((STYLE)|(INLINE))\s?/i.test(groups[2])) {
                // Begin style
                echo(`a>${groups[2]}<`);
                if (!para) {
                    para = true;
                    output += "<p>";
                }
                const temp = groups[2].split(/[<>]/g);
                output += `${escapeHTML(
                    temp[0],
                )}<span class="${classes}">${escapeHTML(temp.slice(-1)[0])}`;
                continue;
            }
            if (/^\s*<\s*END\s+((STYLE)|(INLINE))/i.test(groups[2])) {
                // End style
                echo(`b>${groups[2]}<`);
                const temp = groups[2].split(/[<>]/g);
                output += `${escapeHTML(temp[0])}</span>${escapeHTML(
                    temp.slice(-1)[0],
                )}`;
                continue;
            }
            if (/^\s*<\s*PRE-?FORMATTED\s?/i.test(groups[2])) {
                // Begin blocks
                pre = true;
                const temp = groups[2].split(/[<>]/g);
                output += `<pre class="${classes}">`;
                continue;
            }
            if (/^\s*<\s*END\s+PRE-?FORMATTED/i.test(groups[2])) {
                // End block
                pre = false;
                const temp = groups[2].split(/[<>]/g);
                output += `</pre>`;
                continue;
            }
            if (/^\s*<\s*IMAGE\s?/i.test(groups[2])) {
                // Image
                if (para) {
                    para = false;
                    output += "</p>";
                }
                output += `<img class="${additional}" src="${src}">`;
                continue;
            }
            if (/^\s*<\s*MODAL\s?/i.test(groups[2])) {
                // Modal
                if (para) {
                    para = false;
                    output += "</p>";
                }
                output += `<img class="modal__target ${additional}" src="${src}">`;
                continue;
            }
            if (/^\s*<\s*LINE-?BREAK\s?/i.test(groups[2])) {
                // Line break
                if (!para) {
                    para = true;
                    output += "<p>";
                }
                output += `<br class="${classes}" />`;
                continue;
            }
            if (/^\s*<\s*HORIZONTAL-?LINE\s?/i.test(groups[2])) {
                // Horizontal line
                if (!para) {
                    para = true;
                    output += "<p>";
                }
                output += `<hr class="${classes}" />`;
                continue;
            }
            continue;
        }
        if (groups[3]) {
            // Newline
            if (!para) {
                para = true;
                output += "<p>";
            }
            if (pre) output += "\n";
            else output += "</p>\n<p>";
        }
        if (groups[4]) {
            // Default
            if (!para) {
                para = true;
                output += "<p>";
            }
            output += escapeHTML(groups[4]);
            para = true;
        }
    }
    if (para) {
        para = false;
        output += "</p>";
    }
    return output.replace(/<p><\/p>/gi, "<p><br /></p>");
};

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const modal_process = () => {
    let modal,
        modal__content = null;
    for (const elem of document.getElementsByClassName("modal")) modal = elem;
    for (const elem of document.getElementsByClassName("modal__content"))
        modal__content = elem;
    if (modal === null || modal__content === null) return;
    for (const elem of document.getElementsByClassName("modal__target")) {
        elem.onclick = function (event) {
            echo(event);
            modal.style.display = "block";
            modal__content.src = this.src;
            if (elem.classList.contains("aliased"))
                modal__content.classList.add("aliased");
            if (elem.classList.contains("anti-aliased"))
                modal__content.classList.add("anti-aliased");
            if (elem.classList.contains("antialiased"))
                modal__content.classList.add("antialiased");
            const style = getComputedStyle(elem);
            echo(modal__content.classList);
        };
    }
    for (const elem of document.getElementsByClassName("modal__close")) {
        elem.onclick = function () {
            modal.style.display = "none";
            modal__content.classList = "modal__content";
        };
    }
    return;
};

window.setInterval(async () => {
    modal_process();
    const zano__name = getCookie("zano__name");
    if (zano__name === null || zano__name === "")
        for (const elem of document.getElementsByClassName("codex__name"))
            elem.textContent = shuffle(GLICHED.split("")).join("");
    else
        for (const elem of document.getElementsByClassName("codex__name"))
            if (elem.textContent !== zano__name)
                elem.textContent = zano__name.normalize("NFC").trim();
    return;
}, 400);

// END OF LINE
