const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");

const savedTheme = localStorage.getItem("resume-theme");
if (savedTheme === "dark") body.classList.add("dark");
updateThemeButton();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("resume-theme", body.classList.contains("dark") ? "dark" : "light");
  updateThemeButton();
});

function updateThemeButton() {
  const isDark = body.classList.contains("dark");
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// Add a privacy-friendly analytics script here when a provider and measurement ID are chosen.
