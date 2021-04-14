"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
const stars = () => {
    for (
        const field of document.getElementsByClassName(
            "common-banner__star-field"
        )
    )
        for (let i = 0; i < 200; i++) {
            const star = document.createElement("div");
            star.classList.add("common-banner__star");
            star.style.marginLeft = `${Math.random() * 98}%`;
            star.style.marginTop = `${Math.random() * 14.8}rem`;
            star.style.animationDuration = `${10 + Math.random() * 5}s`;
            star.style.animationDelay = `${Math.random() * 10}s`;
            field.appendChild(star);
        }
    return;
}
stars();
/*
const appearOnScroll
    = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) { return; }
            else { entry.target.classList.add("appear"); }
        });
    });
document.querySelectorAll(".fade-in").forEach(fader => {
    appearOnScroll.observe(fader);
});
*/
const fadeIn = () => {
    for (const elem of document.getElementsByClassName("fade-in"))
        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting)
                    entry.target.classList.add("appear");
                else
                    return;
            })
        }).observe(elem)
    }
fadeIn();
const expandButtons = () => {
    for (const elem of document.getElementsByClassName("expand-next-button")) {
        let next = elem.nextElementSibling;
        if (next) {
            if(next.classList.contains("expanded"))
                next.classList.toggle("expanded");
            next.style.display = "none";
        }
        elem.addEventListener("click", function() {
            this.classList.toggle("expanded");
            let next = this.nextElementSibling;
            if (next)
                next.style.display = 
                    this.classList.contains("expanded")? "block": "none";
        });
    }
    for (
        const elem of document.getElementsByClassName("expand-following-button")
    ) {
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
}
expandButtons();
const root = "/zano"
const escapeHTML = str => {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
};
const getCodex = async x => await (await fetch(`codex/${x}`)).text();
const getDirectory = async () => 
    (await (await fetch("directory.txt")).text()).split("\n").filter(
        x => !x.startsWith("#")
    ).map(x =>
        x.split("|").slice(0, 3).concat(x.split("|").slice(3).join("|")).map(
            y => y.trim()
        )
    ).map(x =>    
        x[0] === "" ? {id: null, part: x[1], date: null, title: x[3]}
            : {id: x[0], part: parseInt(x[1]), date: x[2], title: x[3]}
    );
const parseCodex = x => {
    const regex
        = /(\\{2})|(\\[<>])|(\n?[ \t]*<[^>]*>[ \t]*\n?)|(\n)|([^\\<>\n]+)/gm;
    let groups;
    let output = "";
    let para = false;
    let pre = false;
    while (true) {
        groups = regex.exec(x);
        if (groups)
            groups = groups.slice(1);
        else
            break;
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
            const classes
                = groups[2].replace(
                    /(.*<\s*\S+\s*)|(>.*)/gis, "\""
                ).toLowerCase();
            if ((/^\s*<\s*BLOCK\s?/i).test(groups[2])) {
                // Begin blocks
                output += `<div${
                    2 < classes.length ? " class=" + classes: ""
                }>`;
                continue;
            }
            if ((/^\s*<\s*END\s+BLOCK/i).test(groups[2])) {
                // End block
                if (para) {
                    para = false;
                    output += "</p>";
                }
                output += "</div>"
                continue;
            }
            if ((/^\s*<\s*STYLE\s?/i).test(groups[2])) {
                // Begin style
                if (!para) {
                    para = true;
                    output += "<p>";
                }
                const temp = groups[2].split(/[<>]/g);
                output += `${escapeHTML(temp[0])}<span${
                    2 < classes.length ? " class=" + classes: ""
                }>${escapeHTML(temp.slice(-1)[0])}`;
                continue;
            }
            if ((/^\s*< *END +STYLE/i).test(groups[2])) {
                // End style
                const temp = groups[2].split(/[<>]/g);
                output += `${escapeHTML(temp[0])}</span>${
                    escapeHTML(temp.slice(-1)[0])
                }`;
                continue;
            }
            if ((/^\s*<\s*PREFORMATTED\s?/i).test(groups[2])) {
                // Begin blocks
                pre = true;
                console.log("here1");
                const temp = groups[2].split(/[<>]/g);
                output += `${escapeHTML(temp[0])}<pre${
                    2 < classes.length ? " class=" + classes: ""
                }>${escapeHTML(temp.slice(-1)[0])}`;
                continue;
            }
            if ((/^\s*<\s*END\s+PREFORMATTED/i).test(groups[2])) {
                // End block
                pre = false;
                const temp = groups[2].split(/[<>]/g);
                output += `${escapeHTML(temp[0])}</pre>${
                    escapeHTML(temp.slice(-1)[0])
                }`;
                continue;
            }
            if ((/^\s*< *IMAGE ?/i).test(groups[2])) {
                // Image
                if (para) {
                    para = false;
                    output += "</p>";
                }
                output += `<img src=${
                    groups[2].replace(/(.*<\s*IMAGE\s*)|(>.*)/gis, "\"")
                }>`;
                continue;
            }
            if ((/^\s*<\s*LINE-BREAK\s?/i).test(groups[2])) {
                // Line break
                if (!para) {
                    para = true;
                    output += "<p>";
                }
                output += "<br />"
                continue;
            }
            if ((/^\s*<\s*HORIZONTAL-LINE\s?/i).test(groups[2])) {
                // Horizontal line
                if (!para) {
                    para = true;
                    output += "<p>";
                }
                output += "<hr />"
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
            if (pre) {
                output += "\n";
            }
            else {
                output += "</p>\n<p>";
            }
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
    return output.replace(/<p><\/p>/ig, "<p><br /></p>");
}

