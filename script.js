"use strict";

/*
  MENU DATA
  Add, remove, or edit menu cards here without changing the HTML structure.
  Prices remain placeholders until Frany's confirms current menu pricing.
*/
const menuItems = [
  {
    name: "Nigerian Meals",
    description: "A selection of satisfying Nigerian meal options.",
    price: "Price on request",
    image:
      "IMAGES/R,P,C/ofada rice.png",
    alt: "Nigerian-style rice meal",
  },
  {
    name: "Soups & Swallows",
    description: "Comforting soup and swallow choices for a full meal.",
    price: "Price on request",
    image:
      "IMAGES/SWALLOW/efo riro.jpg",
    alt: "Rich soup in a bowl",
  },
  {
    name: "Proteins & Sides",
    description: "Flavorful proteins and sides to pair with your meal.",
    price: "Price on request",
    image:
      "IMAGES/R,P,C/8 chicken.jpg",
    alt: "Grilled chicken dish",
  },
  {
    name: "Frany's Castle Pizza",
    description: "One of the pizza options available on the Frany's menu.",
    price: "Price on request",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    alt: "Freshly made pizza",
  },
];

const menuGrid = document.getElementById("menu-grid");

function renderMenuCards() {
  if (!menuGrid) return;

  menuGrid.innerHTML = menuItems
    .map(
      (item) => `
        <article class="menu-card reveal">
          <img
            src="${item.image}"
            alt="${item.alt}"
            loading="lazy"
          />
          <div class="menu-card-content">
            <div class="menu-card-top">
              <h3>${item.name}</h3>
              <span class="menu-price">${item.price}</span>
            </div>
            <p>${item.description}</p>
            <a class="button button-secondary" href="#contact">Order / Ask Us</a>
          </div>
        </article>
      `
    )
    .join("");
}

renderMenuCards();

/* Mobile Navigation */
const menuToggle = document.querySelector(".menu-toggle");
const navArea = document.querySelector(".nav-area");
const navLinks = document.querySelectorAll(".nav-link");

function closeMobileMenu() {
  menuToggle?.classList.remove("active");
  navArea?.classList.remove("open");
  document.body.classList.remove("menu-open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navArea.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) closeMobileMenu();
});

/* Sticky Header Shadow */
const siteHeader = document.querySelector(".site-header");

window.addEventListener(
  "scroll",
  () => {
    siteHeader?.classList.toggle("scrolled", window.scrollY > 10);
  },
  { passive: true }
);

/* Scroll Reveal Animation */
function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("show"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

setupRevealAnimations();

/* Active Navigation State */
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const linkTarget = link.getAttribute("href").replace("#", "");
          link.classList.toggle("active", linkTarget === currentId);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}

/* Gallery Lightbox */
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryItems = document.querySelectorAll(".gallery-item");

let lastFocusedElement = null;

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imageUrl = item.dataset.image;
    const imageAlt = item.dataset.alt || "";

    if (!lightbox || !lightboxImage || !imageUrl) return;

    lastFocusedElement = item;
    lightboxImage.src = imageUrl;
    lightboxImage.alt = imageAlt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
  }
});

/* Back to Top */
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener(
  "scroll",
  () => {
    backToTopButton?.classList.toggle("visible", window.scrollY > 550);
  },
  { passive: true }
);

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* Footer Year */
const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}