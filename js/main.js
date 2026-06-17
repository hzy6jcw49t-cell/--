(function () {
  const menuButton = document.querySelector(".menu-button");
  const menuDrawer = document.querySelector(".menu-drawer");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuClose = document.querySelector(".menu-close");
  const menuLinks = document.querySelectorAll(".menu-drawer a");
  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openMenu() {
    menuDrawer.classList.add("is-open");
    menuOverlay.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuDrawer.querySelector(focusableSelector)?.focus();
  }

  function closeMenu() {
    menuDrawer.classList.remove("is-open");
    menuOverlay.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
  }

  menuButton?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuDrawer?.classList.contains("is-open")) {
      closeMenu();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerHeight =
        document.querySelector(".site-header")?.offsetHeight || 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const fadeTargets = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    fadeTargets.forEach((element) => observer.observe(element));
  } else {
    fadeTargets.forEach((element) => element.classList.add("is-visible"));
  }
})();
