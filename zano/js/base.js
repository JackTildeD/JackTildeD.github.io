"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
const include = () => {
    document.querySelectorAll(".include").forEach(
        x => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", x.id, true);
            xhr.onreadystatechange = function() {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return;
                x.innerHTML = this.responseText;
                return;
            };
            xhr.send();
        }
    );
}
include();
const appearOnScroll = new IntersectionObserver(
    entries => {
        entries.forEach(
            entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                else {
                    entry.target.classList.add("appear");
                }
            }
        );
    }
);
document.querySelectorAll(".fade-in").forEach(
    fader => {
        appearOnScroll.observe(fader);
    }
);