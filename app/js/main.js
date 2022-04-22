(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
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
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
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
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
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
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
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
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });
  /**
   * Hero Slider
   */
  var swiper = new Swiper(".sliderFeaturedPosts", {
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
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          aos_init();
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfokio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Tech testimonial slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  });

  // change div colour
  document.querySelector(".icon-boxex1").onmouseover = function () {
    // document.querySelector(".headingser").style.bacolor = "red";
    document.querySelector(".headingser1").style.color = "#484895";
    document.querySelector(".headingser1").style.fontWeight = "900";
  };
  document.querySelector(".icon-boxex1").onmouseout = function () {
    // document.querySelector(".headingser").style.bacolor = "#2c4964";
    // document.querySelector(".headingser").style.backgroundColor = "red";
    document.querySelector(".headingser1").style.color = "#2c4964";
    document.querySelector(".headingser1").style.fontWeight = "600";
  };

  document.querySelector(".icon-boxex2").onmouseover = function () {
    // document.querySelector(".headingser").style.bacolor = "red";
    document.querySelector(".headingser2").style.color = "#484895";
    document.querySelector(".headingser2").style.fontWeight = "900";
  };
  document.querySelector(".icon-boxex2").onmouseout = function () {
    // document.querySelector(".headingser").style.bacolor = "#2c4964";
    // document.querySelector(".headingser").style.backgroundColor = "red";
    document.querySelector(".headingser2").style.color = "#2c4964";
    document.querySelector(".headingser2").style.fontWeight = "600";
  };

  document.querySelector(".icon-boxex3").onmouseover = function () {
    // document.querySelector(".headingser").style.bacolor = "red";
    document.querySelector(".headingser3").style.color = "#484895";
    document.querySelector(".headingser3").style.fontWeight = "900";
  };
  document.querySelector(".icon-boxex3").onmouseout = function () {
    // document.querySelector(".headingser").style.bacolor = "#2c4964";
    // document.querySelector(".headingser").style.backgroundColor = "red";
    document.querySelector(".headingser3").style.color = "#2c4964";
    document.querySelector(".headingser3").style.fontWeight = "600";
  };

  document.querySelector(".icon-boxex4").onmouseover = function () {
    // document.querySelector(".headingser").style.bacolor = "red";
    document.querySelector(".headingser4").style.color = "#484895";
    document.querySelector(".headingser4").style.fontWeight = "900";
  };
  document.querySelector(".icon-boxex4").onmouseout = function () {
    // document.querySelector(".headingser").style.bacolor = "#2c4964";
    // document.querySelector(".headingser").style.backgroundColor = "red";
    document.querySelector(".headingser4").style.color = "#2c4964";
    document.querySelector(".headingser4").style.fontWeight = "600";
  };

  document.querySelector(".icon-boxex5").onmouseover = function () {
    // document.querySelector(".headingser").style.bacolor = "red";
    document.querySelector(".headingser5").style.color = "#484895";
    document.querySelector(".headingser5").style.fontWeight = "900";
  };
  document.querySelector(".icon-boxex5").onmouseout = function () {
    // document.querySelector(".headingser").style.bacolor = "#2c4964";
    // document.querySelector(".headingser").style.backgroundColor = "red";
    document.querySelector(".headingser5").style.color = "#2c4964";
    document.querySelector(".headingser5").style.fontWeight = "600";
  };

  document.querySelector(".icon-boxex6").onmouseover = function () {
    // document.querySelector(".headingser").style.bacolor = "red";
    document.querySelector(".headingser6").style.color = "#484895";
    document.querySelector(".headingser6").style.fontWeight = "900";
  };
  document.querySelector(".icon-boxex6").onmouseout = function () {
    // document.querySelector(".headingser").style.bacolor = "#2c4964";
    // document.querySelector(".headingser").style.backgroundColor = "red";
    document.querySelector(".headingser6").style.color = "#2c4964";
    document.querySelector(".headingser6").style.fontWeight = "600";
  };
  // change tech div colour

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

  document.getElementById("icon-boxex1t").onmouseover = function () {
    document.getElementById("headingser1t").style.color = "#009961";
    document.getElementById("headingser1t").style.fontWeight = "900";
  };
  document.getElementById("icon-boxex1t").onmouseout = function () {
    document.getElementById("headingser1t").style.color = "#2c4964";
    document.getElementById("headingser1t").style.fontWeight = "600";
    document.getElementById("icon-boxex1t").style.transition =
      "all ease-in-out 0.3s";
  };

  document.getElementById("icon-boxex2t").onmouseover = function () {
    document.getElementById("headingser2t").style.color = "#009961";
    document.getElementById("headingser2t").style.fontWeight = "900";
  };
  document.getElementById("icon-boxex2t").onmouseout = function () {
    document.getElementById("headingser2t").style.color = "#2c4964";
    document.getElementById("headingser2t").style.fontWeight = "600";
    document.getElementById("icon-boxex2t").style.transition =
      "all ease-in-out 0.3s";
  };

  document.getElementById("icon-boxex3t").onmouseover = function () {
    document.getElementById("headingser3t").style.color = "#009961";
    document.getElementById("headingser3t").style.fontWeight = "900";
  };
  document.getElementById("icon-boxex3t").onmouseout = function () {
    document.getElementById("headingser3t").style.color = "#2c4964";
    document.getElementById("headingser3t").style.fontWeight = "600";
    document.getElementById("icon-boxex3t").style.transition =
      "all ease-in-out 0.3s";
  };

  document.getElementById("icon-boxex4t").onmouseover = function () {
    document.getElementById("headingser4t").style.color = "#009961";
    document.getElementById("headingser4t").style.fontWeight = "900";
  };
  document.getElementById("icon-boxex4t").onmouseout = function () {
    document.getElementById("headingser4t").style.color = "#2c4964";
    document.getElementById("headingser4t").style.fontWeight = "600";
    document.getElementById("icon-boxex4t").style.transition =
      "all ease-in-out 0.3s";
  };

  document.getElementById("icon-boxex5t").onmouseover = function () {
    document.getElementById("headingser5t").style.color = "#009961";
    document.getElementById("headingser5t").style.fontWeight = "900";
  };
  document.getElementById("icon-boxex5t").onmouseout = function () {
    document.getElementById("headingser5t").style.color = "#2c4964";
    document.getElementById("headingser5t").style.fontWeight = "600";
    document.getElementById("icon-boxex5t").style.transition =
      "all ease-in-out 0.3s";
  };

  document.getElementById("icon-boxex6t").onmouseover = function () {
    document.getElementById("headingser6t").style.color = "#009961";
    document.getElementById("headingser6t").style.fontWeight = "900";
  };
  document.getElementById("icon-boxex6t").onmouseout = function () {
    document.getElementById("headingser6t").style.color = "#2c4964";
    document.getElementById("headingser6t").style.fontWeight = "600";
    document.getElementById("icon-boxex6t").style.transition =
      "all ease-in-out 0.3s";
  };
  document.querySelector(".stapp1").onmouseover = function () {
    document.querySelector(".stapp1").style.transition = "all ease-in-out 0.3s";
  };
  document.querySelector(".stapp2").onmouseover = function () {
    document.querySelector(".stapp2").style.transition = "all ease-in-out 0.3s";
  };
  document.querySelector(".stapp3").onmouseover = function () {
    document.querySelector(".stapp3").style.transition = "all ease-in-out 0.3s";
  };
  document.querySelector(".stapp4").onmouseover = function () {
    document.querySelector(".stapp4").style.transition = "all ease-in-out 0.3s";
  };
})();
