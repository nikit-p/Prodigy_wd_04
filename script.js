/* Declarations */
const body = document.querySelector("body"),
    header = document.querySelector("header"),
    menuOpen = document.querySelector(".fa-bars-staggered"),
    navbarCollapse = document.querySelector(".navbar-collapse"),
    backToTop = document.getElementById("backToTop"),
    smoothScroll = document.querySelectorAll(".nav-items");

menuOpen.onclick = () => {
    navbarCollapse.classList.toggle("show");
    menuOpen.classList.toggle("fa-xmark");
}
/* Active links */
smoothScroll.forEach((e) => {
    e.addEventListener("click", function () {
        removeActive();
        e.classList.add("active");
        navbarCollapse.classList.toggle("show");
        menuOpen.classList.toggle("fa-xmark");
    });
});

function removeActive() {
    smoothScroll.forEach((e) => {
        e.classList.remove("active");
    });
}

/* Back to top arrow scroll */
backToTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* sticky navbar */
window.onscroll = () => {
    if (document.documentElement.scrollTop > 5) {
        header.classList.add("sticky-on-top");
    } else {
        header.classList.remove("sticky-on-top");
    }
}

/* Text Animation effect */
window.onload = function () {
    let elements = document.getElementsByClassName("txt-rotate");
    for (i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute("data-rotate");
        let period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap {border-right: 12px solid #F26921; }"
    document.body.appendChild(css);
};

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 100) || 4000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) {
        delta / 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (that.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 1000;
    }


    setTimeout(function () {
        that.tick();
    }, delta);
};