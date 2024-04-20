"use strict";
// javascript

/* --- 80 cols -------------------------------------------------------------- */

document.body.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty(
        "--origin",
        `calc(100vw - ${e.x}px) calc(100vh - ${e.y}px)`
    );
});

const indexClick = async (e) => {
    let obj;
    const x = e.clientX;
    const y = e.clientY;
    if (typeof indexClick.directory == "undefined") {
        indexClick.directory = await getDirectory();
        indexClick.pages = indexClick.directory.filter(x => x.filename);
        indexClick.end = Math.max(0, indexClick.pages.length - 1);
    }
    for (const elem of document.getElementsByClassName("landing--second")) {
        obj = elem.getBoundingClientRect();
        if (
            obj.left <= x
            && x <= obj.right
            && obj.top <= y
            && y <= obj.bottom
        )
            window.location.href = `${
                window.location.href.split("/").slice(0, -1).join("/")
            }/about.html`;
    }
    for (const elem of document.getElementsByClassName("landing--third")) {
        obj = elem.getBoundingClientRect();
        if (
            obj.left <= x
            && x <= obj.right
            && obj.top <= y
            && y <= obj.bottom
        )
            window.location.href = `${
                window.location.href.split("/").slice(0, -1).join("/")
            }/codex.html`;
    }
    for (const elem of document.getElementsByClassName("landing--fourth")) {
        obj = elem.getBoundingClientRect();
        if (
            obj.left <= x
            && x <= obj.right
            && obj.top <= y
            && y <= obj.bottom
        )
            window.location.href = `${
                window.location.href.split("/").slice(0, -1).join("/")
            }/codex.html?g=${encodeURIComponent(indexClick.end)}#top`;
    }
    for (const elem of document.getElementsByClassName("landing--fith")) {
        obj = elem.getBoundingClientRect();
        if (
            obj.left <= x
            && x <= obj.right
            && obj.top <= y
            && y <= obj.bottom
        )
            window.location.href = `${
                window.location.href.split("/").slice(0, -1).join("/")
            }/codex.html?g=${
                encodeURIComponent(Math.max(0, indexClick.end - 1))
            }#top`;
    }
    for (const elem of document.getElementsByClassName("landing--sixth")) {
        obj = elem.getBoundingClientRect();
        if (
            obj.left <= x
            && x <= obj.right
            && obj.top <= y
            && y <= obj.bottom
        )
            window.location.href = `${
                window.location.href.split("/").slice(0, -1).join("/")
            }/codex.html?g=${
                encodeURIComponent(Math.max(0, indexClick.end - 2))
            }#top`;
    }
    for (const elem of document.getElementsByClassName("landing--seventh")) {
        obj = elem.getBoundingClientRect();
        if (
            obj.left <= x
            && x <= obj.right
            && obj.top <= y
            && y <= obj.bottom
        )
            window.location.href = `${
                window.location.href.split("/").slice(0, -1).join("/")
            }/codex.html?g=${encodeURIComponent(0)}#top`;
    }
    return;
}

const indexMain = async () => {
    if (typeof indexMain.directory == "undefined") {
        indexMain.directory = await getDirectory();
        indexMain.pages = indexMain.directory.filter(x => x.filename);
        indexMain.end = Math.max(0, indexMain.pages.length - 1);
    }
    for (const body of document.getElementsByTagName("body"))
        body.onclick = async (e) => await indexClick(e);
    for (const elem of document.querySelectorAll(
        ".landing--fourth .cuboid__face--front"
    ))
        elem.style.backgroundImage = `url('${IMG_ROOT}/${
            indexMain.pages[indexMain.end].filename.replace(/\.[^.]*$/, "")
        }.webp')`;
    for (const elem of document.querySelectorAll(
        ".landing--fith .cuboid__face--front"
    ))
        elem.style.backgroundImage = `url('${IMG_ROOT}/${
            indexMain.pages[Math.max(0, indexMain.end - 1)].filename.replace(
                /\.[^.]*$/, ""
            )
        }.webp')`;
    for (const elem of document.querySelectorAll(
        ".landing--sixth .cuboid__face--front"
    ))
        elem.style.backgroundImage = `url('${IMG_ROOT}/${
            indexMain.pages[Math.max(0, indexMain.end - 2)].filename.replace(
                /\.[^.]*$/, ""
            )
        }.webp')`;
    for (const elem of document.querySelectorAll(
        ".landing--seventh .cuboid__face--front"
    ))
        elem.style.backgroundImage = `url('${IMG_ROOT}/${
            indexMain.pages[0].filename.replace(/\.[^.]*$/, "")
        }.webp')`;
    return;
}

document.addEventListener("DOMContentLoaded", indexMain);

