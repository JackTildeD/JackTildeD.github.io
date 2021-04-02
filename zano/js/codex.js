"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
const escapeHTML = str => {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
};
for (const elem of document.getElementsByClassName("expand-button")) {
    let next = elem.nextElementSibling;
    while (next) {
        if(next.classList.contains("expanded"))
            next.classList.toggle("expanded");
        next.style.display = "none";
        next = next.nextElementSibling;
    }
    elem.addEventListener("click", function() {
        this.classList.toggle("expanded");
        let next = this.nextElementSibling;
        while (next) {
            next.style.display = 
                this.classList.contains("expanded")? "block": "none";
            next = next.nextElementSibling;
        }
    });
}
fetch("/zano/codex.txt")
    .then(response => response.text())
    .then(data =>
        data.split("\n").filter(x => !x.startsWith("#")).map(x =>
            x.split(",").slice(0, 3).concat(x.split(",").slice(3).join(","))
        ).map(x =>    
            x[0].match(/^\d+/)? {id: x[0], part: x[1], date: x[2], title: x[3]}
                : {id: null, part: x[0], date: null, title: x[3]}
        )
    )
    .then(data => {
        for (const list of document.getElementsByClassName("codex-list"))
            data.forEach(item =>
                item.id?
                    list.innerHTML += "<li><p class=\"codex-list__title\">"
                        + "<a href=\"/zano/codex/codex" + item.id + ".html\">"
                        + escapeHTML(item.title)
                        + "</a><p class=\"codex-list__date\">"
                        + escapeHTML(item.date.replace("/", "\u200B/\u200B"))
                        + "</p><li>"
                    : list.innerHTML += "<li><p class=\"message-header\">"
                        + escapeHTML(item.title) + "</p></li>"
            )
        let id = window.location.pathname.split("/").splice(-1)[0]
            .match(/[0-9]+/g);
        if (id) {
            id = id.slice(-1)[0];
            const pages = data.filter(x => x.id);
            const index = pages.indexOf(pages.find(x => x.id == id));
            const last = pages.length - 1;
            for (
                const cur of document.getElementsByClassName(
                    "codex-title"
                )
            ) cur.innerHTML = pages[index].title;
            for (
                const cur of document.getElementsByClassName(
                    "codex-nav__current"
                )
            ) cur.innerHTML = parseInt(id);
            if (index != last) {
                for (
                    const cur of document.getElementsByClassName(
                        "codex-nav__next"
                    )
                ) {
                    cur.href = "codex" + pages[Math.min(last, index + 1)].id
                        + ".html";
                    cur.classList.toggle("codex-nav--enable");
                }
                for (
                    const cur of document.getElementsByClassName(
                        "codex-nav__last"
                    )
                ) {
                    cur.href = "codex" 
                        + pages[last].id + ".html";
                    cur.className = cur.className.replace(
                        "codex-nav--disable", "codex-nav--enable"
                    );
                }
            }
            if (index != 0) {
                for (
                    const cur of document.getElementsByClassName(
                        "codex-nav__previous"
                    )
                ) {
                    cur.href = "codex" + pages[Math.max(0, index - 1)].id
                        + ".html";
                    cur.className = cur.className.replace(
                        "codex-nav--disable", "codex-nav--enable"
                    );
                }
                for (
                    const cur of document.getElementsByClassName(
                        "codex-nav__first"
                    )
                ) {
                    cur.href = "codex" + pages[0].id + ".html";
                    cur.className = cur.className.replace(
                        "codex-nav--disable", "codex-nav--enable"
                    );
                }
            }
            
        }
    })
    .catch(err => console.log(err));