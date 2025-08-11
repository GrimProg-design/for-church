const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const line = document.querySelector(".navigator-line");

function moveLineToElement(element) {
  const rect = element.getBoundingClientRect();
  const containerRect = navMenu.getBoundingClientRect();
  const offsetLeft = rect.left - containerRect.left;

  line.style.width = rect.width + "px";
  line.style.left = offsetLeft + "px";
}

// Наведение
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    moveLineToElement(link);
  });

  link.addEventListener("mouseleave", () => {
    const active = document.querySelector(".nav-menu a.active");
    if (active) moveLineToElement(active);
  });

  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveLineToElement(link);
  });
});

// Стартовая инициализация
window.addEventListener("DOMContentLoaded", () => {
  const active = document.querySelector(".nav-menu a.active");
  if (active) moveLineToElement(active);
});

