
// =====================================
// 1. ELEMENTOS DO MENU
// =====================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// =====================================
// 2. ABRIR E FECHAR O MENU
// =====================================
function closeMenu() {
  navLinks.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");

  menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fechar o menu após selecionar uma seção.
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Fechar o menu ao pressionar Escape.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// =====================================
// 3. ATUALIZAR O ANO DO RODAPÉ
// =====================================
const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

// =====================================
// 4. DESTAQUE DA SEÇÃO ATUAL
// =====================================
const sections = document.querySelectorAll("main section[id]");

const pageLinks = navLinks.querySelectorAll('a[href^="#"]');

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        pageLinks.forEach(link => {
          const matches =
            link.getAttribute("href") === "#" + entry.target.id;

          link.classList.toggle("active", matches);

          if (matches) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  sections.forEach(section => observer.observe(section));
}