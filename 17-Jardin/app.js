// Efecto simple de parallax al mover el mouse
const imgs = document.querySelectorAll(".img");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  imgs.forEach((img, i) => {
    img.style.transform = `translate(${x * (i + 1)}px, ${y * (i + 1)}px) scale(1)`;
  });
});

// Hover dinámico del botón
const btn = document.querySelector(".cta-btn");
btn.addEventListener("mouseenter", () => {
  btn.style.letterSpacing = "0.15em";
});
btn.addEventListener("mouseleave", () => {
  btn.style.letterSpacing = "0.05em";
});
