// Cursor circular que sigue al cursor dentro del frame
const frame = document.querySelector(".frame");
const circle = document.getElementById("cursor-circle");

frame.addEventListener("mousemove", (event) => {
  const rect = frame.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Ajustar posición del círculo (centrado sobre el cursor)
  circle.style.transform = `translate(${x - circle.offsetWidth / 2}px, ${
    y - circle.offsetHeight / 2
  }px)`;
});

// Si el cursor sale del frame, escondemos el círculo
frame.addEventListener("mouseleave", () => {
  circle.style.transform = `translate(-50%, -50%)`;
});
