const circle = document.getElementById("circle");

circle.addEventListener("click", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const padding = 60; // margen para que el círculo no se salga
  const screenWidth = window.innerWidth - padding;
  const screenHeight = window.innerHeight - padding;

  let newX, newY, distance;

  do {
    newX = Math.random() * screenWidth;
    newY = Math.random() * screenHeight;

    const dx = newX - mouseX;
    const dy = newY - mouseY;
    distance = Math.sqrt(dx * dx + dy * dy);
  } while (distance < 200); //lejos del clic

  // hacia la nueva posición
  gsap.to(circle, {
    duration: 1,
    x: newX - window.innerWidth / 2,
    y: newY - window.innerHeight / 2,
    ease: "power2.out"
  });
});
