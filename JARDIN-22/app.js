const items = document.querySelectorAll(".item");
const preview = document.getElementById("preview");

items.forEach(item => {
    item.addEventListener("mouseenter", () => {
        const color = item.getAttribute("data-color");
        preview.style.background = color;
        preview.style.opacity = 1;
    });

    item.addEventListener("mouseleave", () => {
        preview.style.opacity = 0;
    });
});
