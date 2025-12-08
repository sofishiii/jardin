// Parallax simple con mouse
const items = document.querySelectorAll(".parallax-item");

function handleParallax(e) {
  const { innerWidth: w, innerHeight: h } = window;
  const xNorm = (e.clientX / w - 0.5) * 2; // -1 a 1
  const yNorm = (e.clientY / h - 0.5) * 2;

  items.forEach((el) => {
    const depth = Number(el.dataset.depth) || 30;

    // movimiento inverso para que “siga” ligeramente al mouse
    const moveX = -xNorm * depth;
    const moveY = -yNorm * depth;

    el.style.setProperty("--px", `${moveX}px`);
    el.style.setProperty("--py", `${moveY}px`);
  });
}

window.addEventListener("mousemove", handleParallax);
