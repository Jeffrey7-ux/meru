/**
 * app.js
 * -------
 * Shared behaviour for every page:
 *   - Dark / light theme toggle (persisted in localStorage, respects the
 *     visitor's OS preference on first visit).
 *   - English / Kiswahili language pill toggle (persisted in localStorage).
 *   - Marks the current page's nav link as active.
 *   - Applies translations on load and whenever the language changes.
 *   - Picks a working Mount Meru background photo for the current page,
 *     with a couple of alternates in case one file is ever moved/renamed
 *     on Wikimedia Commons.
 */

// Each page gets its own short list of candidate photos — the first one
// that actually loads is used, so every page keeps a *different* photo
// even if a particular file ever goes missing upstream.
const MERU_PAGE_PHOTOS = {
  "page-home": [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Afternoon%20view%20of%20Mount%20Meru%20in%20Arusha.jpg?width=1920",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Arusha%20Airport%20with%20Mount%20Meru%20back%20ground.jpg?width=1920"
  ],
  "page-history": [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Look%20at%20Mt.%20Meru%20Arusha%20Tanzania.jpg?width=1920",
    "https://commons.wikimedia.org/wiki/Special:FilePath/View%20from%20Mount%20Meru%20Summit%20Tanzania.jpg?width=1920"
  ],
  "page-culture": [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Mt.%20Meru%20View.jpg?width=1920",
    "https://commons.wikimedia.org/wiki/Special:FilePath/A%20view%20of%20mount%20Meru%20From%20forest%20training%20institute%20Olmotonyi%20Arusha%20Tanzania.jpg?width=1920"
  ],
  "page-dictionary": [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20Mount%20Meru.JPEG?width=1920",
    "https://commons.wikimedia.org/wiki/Special:FilePath/View%20of%20Mount%20Meru%20Arusha.jpg?width=1920"
  ]
};

function loadFirstWorkingPhoto(urls, onSuccess) {
  if (!urls || urls.length === 0) return;
  const [first, ...rest] = urls;
  const probe = new Image();
  probe.onload = () => onSuccess(first);
  probe.onerror = () => loadFirstWorkingPhoto(rest, onSuccess);
  probe.src = first;
}

function initPageBackgroundPhoto() {
  const body = document.body;
  const pageClass = Array.from(body.classList).find((c) => c.startsWith("page-"));
  const candidates = MERU_PAGE_PHOTOS[pageClass];
  if (!candidates) return;
  loadFirstWorkingPhoto(candidates, (workingUrl) => {
    body.style.setProperty("--page-photo", `url("${workingUrl}")`);
  });
}

const MeruTheme = (function () {
  const STORAGE_KEY = "meru-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
      }
      const label = btn.querySelector(".theme-label");
      if (label) {
        label.textContent = theme === "dark" ? "Light" : "Dark";
      }
    });
  }

  function toggle() {
    const current = document.documentElement.getAttribute("data-bs-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  function init() {
    applyTheme(getPreferredTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", toggle);
    });
  }

  return { init, applyTheme, getPreferredTheme };
})();

function initLanguageControls() {
  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-lang-value");
      MeruI18n.setLang(value);
      MeruI18n.apply();
    });
  });
}

function markActiveNavLink() {
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".meru-navbar .nav-link[data-page]").forEach((link) => {
    const linkPage = link.getAttribute("data-page").toLowerCase();
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Theme must be applied before first paint ideally; we also do an early
  // inline pass in <head> (see partial script in each page) to avoid flash.
  MeruTheme.init();
  initLanguageControls();
  markActiveNavLink();
  initPageBackgroundPhoto();
  MeruI18n.apply();
});
