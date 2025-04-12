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
    document.addEventListener("DOMContentLoaded", (() => {
        const sections = document.querySelectorAll(".article-page__title");
        sections.forEach(((section, index) => {
            if (!section.id) {
                const generatedId = `section-${index + 1}`;
                section.id = generatedId;
            }
        }));
        const menuItems = document.querySelectorAll(".sidebar-page__item");
        menuItems.forEach(((item, index) => {
            const anchor = item.querySelector("a");
            if (anchor) {
                const sectionId = sections[index].id;
                anchor.setAttribute("href", `#${sectionId}`);
            }
        }));
        document.querySelectorAll(".sidebar-page__item a").forEach((link => {
            link.addEventListener("click", (function(e) {
                e.preventDefault();
                const targetId = this.getAttribute("href").slice(1);
                const target = document.getElementById(targetId);
                if (target) window.scrollTo({
                    top: target.offsetTop - -50,
                    behavior: "smooth"
                });
            }));
        }));
        const sidebarList = document.querySelector(".sidebar-page__list");
        function updateIndicator() {
            let currentSectionId = "";
            sections.forEach((section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 150) currentSectionId = section.id;
            }));
            menuItems.forEach((item => {
                const anchor = item.querySelector("a");
                const hrefId = anchor.getAttribute("href").slice(1);
                item.classList.remove("_active");
                if (hrefId === currentSectionId) {
                    item.classList.add("_active");
                    const itemRect = item.getBoundingClientRect();
                    const listRect = sidebarList.getBoundingClientRect();
                    const offset = itemRect.top - listRect.top + itemRect.height / 2.5;
                    sidebarList.style.setProperty("--dot-position", `${offset}px`);
                }
            }));
        }
        window.addEventListener("scroll", updateIndicator);
        window.addEventListener("load", updateIndicator);
    }));
    window["FLS"] = true;
})();