/**
 * api.js
 * -------
 * Talks to the Java backend (same-origin, so plain fetch() works with no
 * CORS setup) and renders the response into whichever page called it.
 * Each render function re-runs automatically whenever the visitor flips
 * the language pill, via the "meru:langchange" event fired from i18n.js.
 */

const MeruApi = (function () {
  async function getJson(path) {
    const lang = MeruI18n.getLang();
    const separator = path.includes("?") ? "&" : "?";
    const response = await fetch(`${path}${separator}lang=${lang}`);
    if (!response.ok) {
      throw new Error(`Request to ${path} failed with status ${response.status}`);
    }
    return response.json();
  }

  return { getJson };
})();

/* ---------------------------------------------------------------------- */
/* HISTORY PAGE                                                            */
/* ---------------------------------------------------------------------- */

function renderHistory() {
  const container = document.getElementById("history-timeline");
  const status = document.getElementById("history-status");
  if (!container) return;

  status.textContent = MeruI18n.t("history.loading");
  status.classList.remove("d-none", "text-danger");
  container.innerHTML = "";

  MeruApi.getJson("/api/history")
    .then((data) => {
      status.classList.add("d-none");
      container.innerHTML = "";
      data.sections.forEach((section) => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        const paragraphs = section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
        item.innerHTML = `
          <div class="timeline-dot"></div>
          <h3>${escapeHtml(section.title)}</h3>
          ${paragraphs}
        `;
        container.appendChild(item);
      });
    })
    .catch(() => {
      status.textContent = MeruI18n.t("history.error");
      status.classList.remove("d-none");
      status.classList.add("text-danger");
    });
}

/* ---------------------------------------------------------------------- */
/* CULTURE PAGE                                                            */
/* ---------------------------------------------------------------------- */

const CULTURE_ICONS = [
  { icon: "bi-people-fill", bg: "var(--meru-forest)" },
  { icon: "bi-chat-square-text-fill", bg: "var(--meru-rust)" },
  { icon: "bi-tree-fill", bg: "var(--meru-gold)" },
  { icon: "bi-diagram-3-fill", bg: "var(--meru-forest-light)" },
  { icon: "bi-brightness-high-fill", bg: "var(--meru-rust-dark)" },
  { icon: "bi-triangle-fill", bg: "var(--meru-forest)" }
];

function renderCulture() {
  const container = document.getElementById("culture-grid");
  const status = document.getElementById("culture-status");
  if (!container) return;

  status.textContent = MeruI18n.t("culture.loading");
  status.classList.remove("d-none", "text-danger");
  container.innerHTML = "";

  MeruApi.getJson("/api/culture")
    .then((data) => {
      status.classList.add("d-none");
      container.innerHTML = "";
      data.sections.forEach((section, index) => {
        const style = CULTURE_ICONS[index % CULTURE_ICONS.length];
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";
        const paragraphs = section.paragraphs.map((p) => `<p class="mb-0">${escapeHtml(p)}</p>`).join("");
        col.innerHTML = `
          <div class="surface-card culture-card p-4 h-100">
            <div class="card-icon" style="background:${style.bg}">
              <i class="bi ${style.icon}"></i>
            </div>
            <h3>${escapeHtml(section.title)}</h3>
            ${paragraphs}
          </div>
        `;
        container.appendChild(col);
      });
    })
    .catch(() => {
      status.textContent = MeruI18n.t("culture.error");
      status.classList.remove("d-none");
      status.classList.add("text-danger");
    });
}

/* ---------------------------------------------------------------------- */
/* DICTIONARY PAGE                                                         */
/* ---------------------------------------------------------------------- */

let MERU_DICTIONARY_CACHE = [];

function renderDictionary() {
  const grid = document.getElementById("dictionary-grid");
  const status = document.getElementById("dictionary-status");
  const searchInput = document.getElementById("dictionary-search");
  const categorySelect = document.getElementById("dictionary-category");
  if (!grid) return;

  status.textContent = MeruI18n.t("dictionary.loading");
  status.classList.remove("d-none", "text-danger");
  grid.innerHTML = "";

  MeruApi.getJson("/api/dictionary")
    .then((data) => {
      status.classList.add("d-none");
      MERU_DICTIONARY_CACHE = data.words;
      populateCategoryFilter(data.words, categorySelect);
      applyDictionaryFilters();
    })
    .catch(() => {
      status.textContent = MeruI18n.t("dictionary.error");
      status.classList.remove("d-none");
      status.classList.add("text-danger");
    });

  if (searchInput && !searchInput.dataset.bound) {
    searchInput.addEventListener("input", applyDictionaryFilters);
    searchInput.dataset.bound = "true";
  }
  if (categorySelect && !categorySelect.dataset.bound) {
    categorySelect.addEventListener("change", applyDictionaryFilters);
    categorySelect.dataset.bound = "true";
  }
}

function populateCategoryFilter(words, select) {
  if (!select) return;
  const categories = Array.from(new Set(words.map((w) => w.category))).sort();
  const currentValue = select.value;
  select.innerHTML = `<option value="__all__">${MeruI18n.t("dictionary.categoryAll")}</option>`;
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  if (categories.includes(currentValue)) {
    select.value = currentValue;
  }
}

function applyDictionaryFilters() {
  const grid = document.getElementById("dictionary-grid");
  const status = document.getElementById("dictionary-status");
  const countLabel = document.getElementById("dictionary-count");
  const searchInput = document.getElementById("dictionary-search");
  const categorySelect = document.getElementById("dictionary-category");
  if (!grid) return;

  const query = (searchInput && searchInput.value.trim().toLowerCase()) || "";
  const category = (categorySelect && categorySelect.value) || "__all__";

  const filtered = MERU_DICTIONARY_CACHE.filter((word) => {
    const matchesCategory = category === "__all__" || word.category === category;
    const haystack = `${word.term} ${word.meaning} ${word.note}`.toLowerCase();
    const matchesQuery = query === "" || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    status.textContent = MeruI18n.t("dictionary.noResults");
    status.classList.remove("d-none", "text-danger");
  } else {
    status.classList.add("d-none");
  }

  filtered.forEach((word) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="word-card">
        <span class="word-category">${escapeHtml(word.category)}</span>
        <div class="word-term mt-1">${escapeHtml(word.term)}</div>
        <div class="word-meaning">${escapeHtml(word.meaning)}</div>
        <p class="word-note mb-0 mt-2">${escapeHtml(word.note)}</p>
      </div>
    `;
    grid.appendChild(col);
  });

  if (countLabel) {
    countLabel.textContent = `${filtered.length} ${MeruI18n.t("dictionary.resultsCount")}`;
  }
}

/* ---------------------------------------------------------------------- */
/* Shared helpers                                                          */
/* ---------------------------------------------------------------------- */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Re-render API-driven content whenever the language pill changes.
document.addEventListener("meru:langchange", () => {
  renderHistory();
  renderCulture();
  renderDictionary();
});

document.addEventListener("DOMContentLoaded", () => {
  renderHistory();
  renderCulture();
  renderDictionary();
});
