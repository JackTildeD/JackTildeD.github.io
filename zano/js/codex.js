"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
function escapeHTML(str){
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
}
let list = document.getElementsByClassName("codex-list");
if (0 < list.length) {
    fetch("/zano/codex.json")
        .then(response => response.json())
        .then(data => data.slice(1, data.length - 1))
        .then(data => {
            list = list[0];
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const pattern = /\d{3,}/g;
                const result = pattern.exec(item);
                if (result) {
                    const li = document.createElement("li");
                    li.innerHTML = "<a href=\"/zano/codex/codex" + result
                        + ".html\">" + escapeHTML(item) + "</a>";
                    list.appendChild(li);
                }
                else {
                    const li = document.createElement("li");
                    li.classList.add("message-header");
                    li.innerHTML = escapeHTML(item);
                    list.appendChild(li);
                }
            }
        });
}
const found = window.location.pathname.match(/[0-9]+/g);
if (0 < document.getElementsByClassName("codex-nav__current").length) {
    document.querySelector(".codex-nav__current").innerHTML
        = parseInt(found);
    let ident = found.pop();
    fetch("/zano/codex.json")
        .then(response => response.json())
        .then(data => data.slice(1, data.length - 1))
        .then(data => data.filter(x => x.startsWith(ident))[0])
        .then(data => data.replace(/^[\d:]*[ ]/g, ""))
        .then(data => {
            document.getElementById("codex-title").innerHTML = escapeHTML(data);
            });
    fetch("/zano/codex.json")
        .then(response => response.json())
        .then(data => data.slice(1, data.length - 1))
        .then(data => data.filter(x => x.match(/\d{3}/g)))
        .then(data => data.map(x => (/\d{3}/g).exec(x)[0]))
        .then(
            data => {
                const index = data.indexOf(ident);
                const first = data[0];
                const previous = data[Math.max(0, index - 1)];
                const next = data[Math.min(data.length - 1, index + 1)];
                const last = data[data.length - 1];
                document.querySelector(".codex-nav--first").href
                    = "/zano/codex/codex" + first + ".html";
                document.querySelector(".codex-nav--previous").href
                    = "/zano/codex/codex" + previous + ".html";
                document.querySelector(".codex-nav--next").href
                    = "/zano/codex/codex" + next + ".html";
                document.querySelector(".codex-nav--last").href
                    = "/zano/codex/codex" + last + ".html";
            }
        );
}