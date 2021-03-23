"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
const stars = () => {
    if (document.querySelector(".star")) {
        return;
    }
    const field = document.querySelector(".common-header__star-field");
    if (!field) {
        return;
    }
    for(let i = 0; i < 200; i++) {
        const star = document.createElement("i");
        star.classList.add("star");
        star.style.marginLeft
            = (Math.random() * 98) + "%";
        star.style.marginTop
            = (Math.random() * 14.8) + "rem";
        star.style.animationDuration
            = (10 + Math.random() * 5) + "s";
        star.style.animationDelay
            = (Math.random() * 10) + "s"
        field.appendChild(star);
    }
    return;
}
const include = () => {
    document.querySelectorAll(".include").forEach(
        x => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", x.id, true);
            xhr.onreadystatechange = function() {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return;
                x.innerHTML = this.responseText;
                stars();
                return;
            };
            xhr.send();
        }
    );
}
include();