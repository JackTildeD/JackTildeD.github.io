"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
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
        const pages = data.filter(x => x.id);
        const last = pages.length - 1;
        for (
            const cur of document.getElementsByClassName(
                "landing--fourth"
            )
        )
            cur.getElementsByTagName("a")[0].href = "/zano/codex/codex"
                + pages[last].id + ".html";
        for (
            const cur of document.getElementsByClassName(
                "landing--fith"
            )
        )
            cur.getElementsByTagName("a")[0].href =
                "/zano/codex/codex" + pages[Math.max(0, last - 1)].id + ".html";
        for (
            const cur of document.getElementsByClassName(
                "landing--sixth"
            )
        )
            cur.getElementsByTagName("a")[0].href =
                "/zano/codex/codex" + pages[Math.max(0, last - 2)].id + ".html";
        for (
            const cur of document.getElementsByClassName(
                "landing--seventh"
            )
        )
            cur.getElementsByTagName("a")[0].href = "/zano/codex/codex"
                + pages[0].id + ".html";
    })
    .catch(err => console.log(err));