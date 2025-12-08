// Seleccionamos todos los elementos que deben reaccionar al hover
const hoverTargets = document.querySelectorAll(".hover-target");

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("hover-active");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("hover-active");
  });
});
