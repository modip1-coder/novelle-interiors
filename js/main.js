const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const savedTheme = localStorage.getItem("novelle-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav ? nav.classList.toggle("open") : false;
    if (header) {
      header.classList.toggle("nav-open", Boolean(isOpen));
    }
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });
}

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      if (header) {
        header.classList.remove("nav-open");
      }
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("novelle-theme", nextTheme);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const testimonials = Array.from(document.querySelectorAll(".testimonial"));
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
let activeTestimonial = 0;

const showTestimonial = (index) => {
  if (!testimonials.length) return;
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((item, itemIndex) => {
    item.classList.toggle("active", itemIndex === activeTestimonial);
  });
};

if (prevButton) {
  prevButton.addEventListener("click", () => showTestimonial(activeTestimonial - 1));
}

if (nextButton) {
  nextButton.addEventListener("click", () => showTestimonial(activeTestimonial + 1));
}

if (testimonials.length) {
  window.setInterval(() => showTestimonial(activeTestimonial + 1), 7000);
}

const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    portfolioItems.forEach((item) => {
      item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

document.querySelectorAll(".portfolio-thumb").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".portfolio-item");
    if (item) {
      item.classList.toggle("expanded");
    }
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button[type='submit']");
    if (!button) return;
    const originalText = button.textContent;
    button.textContent = "Inquiry Sent";
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 2400);
  });
}
