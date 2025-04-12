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
    const sidebarList = document.querySelector(".sidebar-page__list");
    function updateIndicator() {
        let currentIndex = 0;
        sections.forEach(((section, index) => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) currentIndex = index;
        }));
        const activeItem = menuItems[currentIndex];
        if (activeItem) {
            const itemRect = activeItem.getBoundingClientRect();
            const listRect = sidebarList.getBoundingClientRect();
            const offset = itemRect.top - listRect.top + itemRect.height / 2.5;
            sidebarList.style.setProperty("--dot-position", `${offset}px`);
        }
    }
    window.addEventListener("scroll", updateIndicator);
    window.addEventListener("load", updateIndicator);
    document.querySelectorAll(".sidebar-page__item").forEach(((item, index) => {
        item.addEventListener("click", (function(e) {
            e.preventDefault();
            const target = sections[index];
            if (target) window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        }));
    }));
    window["FLS"] = true;
})();