"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
for (
    const field of document.getElementsByClassName("common-banner__star-field")
)
    for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.classList.add("common-banner__star");
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