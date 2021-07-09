let iconSelected = null;

const changeIconOpacities = (x) => {
    for (const elem of document.getElementsByClassName("icon-picture")) {
        elem.style.opacity = 1;
    }
    x.style.opacity = 0.5;
}

for (const elem of document.getElementsByClassName("icon-one")) {
    elem.addEventListener("click", function (x) {
        changeIconOpacities(this);
        iconSelected = 1;
    });
}

for (const elem of document.getElementsByClassName("icon-two")) {
    elem.addEventListener("click", function (x) {
        changeIconOpacities(this);
        iconSelected = 2;
    });
}

for (const elem of document.getElementsByClassName("icon-three")) {
    elem.addEventListener("click", function (x) {
        changeIconOpacities(this);
        iconSelected = 3;
    });
}

for (const elem of document.getElementsByClassName("icon-four")) {
    elem.addEventListener("click", function (x) {
        changeIconOpacities(this);
        iconSelected = 4;
    });
}


