(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const sections = document.querySelectorAll(".article-page__title");
    const menuItems = document.querySelectorAll(".sidebar-page__item");
    document.querySelector(".sidebar-page__list::before");
    const sidebarList = document.querySelector(".sidebar-page__list");
    function updateIndicator() {
        let currentSectionId = "";
        sections.forEach((section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) currentSectionId = section.getAttribute("id");
        }));
        menuItems.forEach((item => {
            const anchor = item.querySelector("a");
            const hrefId = anchor.getAttribute("href").slice(1);
            if (hrefId === currentSectionId) {
                const itemRect = item.getBoundingClientRect();
                const listRect = sidebarList.getBoundingClientRect();
                const offset = itemRect.top - listRect.top + itemRect.height / 2.5;
                sidebarList.style.setProperty("--dot-position", `${offset}px`);
            }
        }));
    }
    window.addEventListener("scroll", updateIndicator);
    window.addEventListener("load", updateIndicator);
    document.querySelectorAll(".sidebar-page__item a").forEach((link => {
        link.addEventListener("click", (function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (target) window.scrollTo({
                top: target.offsetTop - 50,
                behavior: "smooth"
            });
        }));
    }));
    window["FLS"] = true;
})();