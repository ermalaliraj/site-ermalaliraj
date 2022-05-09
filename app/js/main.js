(function () {
    "use strict";

    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    const on = (type, el, listener, all = false) => {
        if (all) {
            select(el, all).forEach((e) => e.addEventListener(type, listener));
        } else {
            select(el, all).addEventListener(type, listener);
        }
    };

    const onScroll = (el, listener) => {
        el.addEventListener("scroll", listener);
    };

    /**
     * NavBar links active state on scroll
     */
    let navBarLinks = select("#navbar .scrollTo", true);
    const navBarLinksActive = () => {
        let position = window.scrollY + 200;
        navBarLinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                navbarlink.classList.add("active");
            } else {
                navbarlink.classList.remove("active");
            }
        });
    };
    window.addEventListener("load", navBarLinksActive);
    onScroll(document, navBarLinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollTo = (el) => {
        let header = select("#header");
        let offset = header.offsetHeight;

        if (!header.classList.contains("header-scrolled")) {
            offset -= 10;
        }

        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos - offset,
            behavior: "smooth",
        });
    };

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select("#header");
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add("header-scrolled");
            } else {
                selectHeader.classList.remove("header-scrolled");
            }
        };
        window.addEventListener("load", headerScrolled);
        onScroll(document, headerScrolled);
    }

    /**
     * Back to top button
     */
    let backToTop = select(".back-to-top");
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 100) {
                backToTop.classList.add("active");
            } else {
                backToTop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBackToTop);
        onScroll(document, toggleBackToTop);
    }

    /**
     * Mobile nav toggle
     */
    on("click", ".mobile-nav-toggle", function (e) {
        select("#navbar").classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    /**
     * Mobile nav dropdowns activate
     */
    on(
        "click",
        ".navbar .dropdown > a",
        function (e) {
            if (select("#navbar").classList.contains("navbar-mobile")) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle("dropdown-active");
            }
        },
        true
    );

    /**
     * Scroll with offset on links with a class name .scrollTo
     */
    on(
        "click",
        ".scrollTo",
        function (e) {
            if (select(this.hash)) {
                e.preventDefault();

                let navbar = select("#navbar");
                if (navbar.classList.contains("navbar-mobile")) {
                    navbar.classList.remove("navbar-mobile");
                    let navbarToggle = select(".mobile-nav-toggle");
                    navbarToggle.classList.toggle("bi-list");
                    navbarToggle.classList.toggle("bi-x");
                }
                scrollTo(this.hash);
            }
        },
        true
    );

    /**
     * Scroll with offset on page load with hash links in the url
     */
    window.addEventListener("load", () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollTo(window.location.hash);
            }
        }
    });

    var swiper = new Swiper(".sliderSwiper", {
        spaceBetween: 0,
        speed: 500,
        centeredSlides: true,
        loop: true,
        slideToClickedSlide: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
        },
    });

    /**
     * Preloader
     */
    let preloader = select("#preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(preloader.remove(), 155000);
            clearTimeout();
        });
    }

    /**
     * Animation on scroll
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }

    window.addEventListener("load", () => {
        aos_init();
    });

    // change div colour
    document.getElementById("service-box-1").onmouseover = function () {
        document.getElementById("service-box-1-heading").style.color = "#484895";
        document.getElementById("service-box-1-heading").style.fontWeight = "900";
    };
    document.getElementById("service-box-1").onmouseout = function () {
        document.getElementById("service-box-1-heading").style.color = "#2c4964";
        document.getElementById("service-box-1-heading").style.fontWeight = "600";
    };

    document.getElementById("service-box-2").onmouseover = function () {
        document.getElementById("service-box-1-heading").style.color = "#484895";
        document.getElementById("service-box-2-heading").style.fontWeight = "900";
    };
    document.getElementById("service-box-2").onmouseout = function () {
        document.getElementById("service-box-2-heading").style.color = "#2c4964";
        document.getElementById("service-box-2-heading").style.fontWeight = "600";
    };

    document.getElementById("service-box-3").onmouseover = function () {
        document.getElementById("service-box-3-heading").style.color = "#484895";
        document.getElementById("service-box-3-heading").style.fontWeight = "900";
    };
    document.getElementById("service-box-3").onmouseout = function () {
        document.getElementById("service-box-3-heading").style.fontWeight = "600";
    };

    document.getElementById("service-box-4").onmouseover = function () {
        document.getElementById("service-box-4-heading").style.color = "#484895";
        document.getElementById("service-box-4-heading").style.fontWeight = "900";
    };
    document.getElementById("service-box-4").onmouseout = function () {
        document.getElementById("service-box-4-heading").style.color = "#2c4964";
        document.getElementById("service-box-4-heading").style.fontWeight = "600";
    };

    document.getElementById("service-box-5").onmouseover = function () {
        document.getElementById("service-box-5-heading").style.color = "#484895";
        document.getElementById("service-box-5-heading").style.fontWeight = "900";
    };
    document.getElementById("service-box-5").onmouseout = function () {
        document.getElementById("service-box-5-heading").style.color = "#2c4964";
        document.getElementById("service-box-5-heading").style.fontWeight = "600";
    };

    document.getElementById("service-box-6").onmouseover = function () {
        document.getElementById("service-box-6-heading").style.color = "#484895";
        document.getElementById("service-box-6-heading").style.fontWeight = "900";
    };
    document.getElementById("service-box-6").onmouseout = function () {
        document.getElementById("service-box-6-heading").style.color = "#2c4964";
        document.getElementById("service-box-6-heading").style.fontWeight = "600";
    };

    document.getElementById("tech-box-1").onmouseover = function () {
        document.getElementById("tech-box-1-heading").style.color = "#009961";
        document.getElementById("tech-box-1-heading").style.fontWeight = "900";
    };
    document.getElementById("tech-box-1").onmouseout = function () {
        document.getElementById("tech-box-1-heading").style.color = "#2c4964";
        document.getElementById("tech-box-1-heading").style.fontWeight = "600";
        document.getElementById("tech-box-1").style.transition = "all ease-in-out 0.3s";
    };

    document.getElementById("tech-box-2").onmouseover = function () {
        document.getElementById("tech-box-2-heading").style.color = "#009961";
        document.getElementById("tech-box-2-heading").style.fontWeight = "900";
    };
    document.getElementById("tech-box-2").onmouseout = function () {
        document.getElementById("tech-box-2-heading").style.color = "#2c4964";
        document.getElementById("tech-box-2-heading").style.fontWeight = "600";
        document.getElementById("tech-box-2").style.transition = "all ease-in-out 0.3s";
    };

    document.getElementById("tech-box-3").onmouseover = function () {
        document.getElementById("tech-box-3-heading").style.color = "#009961";
        document.getElementById("tech-box-3-heading").style.fontWeight = "900";
    };
    document.getElementById("tech-box-3").onmouseout = function () {
        document.getElementById("tech-box-3-heading").style.color = "#2c4964";
        document.getElementById("tech-box-3-heading").style.fontWeight = "600";
        document.getElementById("tech-box-3").style.transition = "all ease-in-out 0.3s";
    };

    document.getElementById("tech-box-4").onmouseover = function () {
        document.getElementById("tech-box-4-heading").style.color = "#009961";
        document.getElementById("tech-box-4-heading").style.fontWeight = "900";
    };
    document.getElementById("tech-box-4").onmouseout = function () {
        document.getElementById("tech-box-4-heading").style.color = "#2c4964";
        document.getElementById("tech-box-4-heading").style.fontWeight = "600";
        document.getElementById("tech-box-4").style.transition = "all ease-in-out 0.3s";
    };

    document.getElementById("tech-box-5").onmouseover = function () {
        document.getElementById("tech-box-5-heading").style.color = "#009961";
        document.getElementById("tech-box-5-heading").style.fontWeight = "900";
    };
    document.getElementById("tech-box-5").onmouseout = function () {
        document.getElementById("tech-box-5-heading").style.color = "#2c4964";
        document.getElementById("tech-box-5-heading").style.fontWeight = "600";
        document.getElementById("tech-box-5").style.transition = "all ease-in-out 0.3s";
    };

    document.getElementById("tech-box-6").onmouseover = function () {
        document.getElementById("tech-box-6-heading").style.color = "#009961";
        document.getElementById("tech-box-6-heading").style.fontWeight = "900";
    };
    document.getElementById("tech-box-6").onmouseout = function () {
        document.getElementById("tech-box-6-heading").style.color = "#2c4964";
        document.getElementById("tech-box-6-heading").style.fontWeight = "600";
        document.getElementById("tech-box-6").style.transition = "all ease-in-out 0.3s";
    };
    document.querySelector(".blue-box-shadow").onmouseover = function () {
        document.querySelector(".blue-box-shadow").style.transition = "all ease-in-out 0.3s";
    };
    document.querySelector(".orange-box-shadow").onmouseover = function () {
        document.querySelector(".orange-box-shadow").style.transition = "all ease-in-out 0.3s";
    };
    document.querySelector(".green-box-shadow").onmouseover = function () {
        document.querySelector(".green-box-shadow").style.transition = "all ease-in-out 0.3s";
    };
    document.querySelector(".red-purple-box-shadow").onmouseover = function () {
        document.querySelector(".red-purple-box-shadow").style.transition = "all ease-in-out 0.3s";
    };
})();
