/**
 * i18n.js
 * --------
 * Holds every piece of *static* UI copy (navbar, footer, buttons, page
 * headers, etc.) in English and Kiswahili, and applies whichever one the
 * visitor has chosen to every element on the current page.
 *
 * Content that comes from the Java backend (history/culture paragraphs,
 * dictionary words) is translated server-side instead — see api.js.
 *
 * Usage in HTML:
 *   <span data-i18n="nav.home">Home</span>
 *   <input data-i18n-placeholder="dictionary.searchPlaceholder">
 */

const MERU_TRANSLATIONS = {
  en: {
    "meta.title": "Meru Heritage",
    "nav.home": "Home",
    "nav.history": "History",
    "nav.culture": "Culture",
    "nav.dictionary": "Dictionary",
    "nav.theme": "Toggle dark mode",
    "nav.lang": "Switch language",

    "footer.tagline": "A community resource celebrating the history, culture and language of the Meru people of Mount Meru, Arusha.",
    "footer.explore": "Explore",
    "footer.about": "About this project",
    "footer.aboutText": "Built as an open, growing archive. Spotted something to correct or add? This is a starting point — community knowledge makes it richer.",
    "footer.rights": "Meru Heritage. A cultural knowledge-sharing project.",

    "home.badge": "Arusha, Tanzania · Mount Meru",
    "home.heroEyebrow": "Wameru · Varwa · Rwa",
    "home.heroTitle": "The Meru People of Mount Meru",
    "home.heroSubtitle": "Discover the history, traditions and language of the Wameru — a Bantu community who have farmed the fertile slopes of Mount Meru in Arusha for centuries.",
    "home.ctaHistory": "Explore History",
    "home.ctaDictionary": "Browse Dictionary",
    "home.statPopulation": "Approx. population",
    "home.statPopulationValue": "~200,000",
    "home.statMountain": "Home mountain",
    "home.statMountainValue": "Mount Meru, 4,566 m",
    "home.statLanguage": "Native language",
    "home.statLanguageValue": "Kimeru (Kirwa)",
    "home.statRegion": "Region",
    "home.statRegionValue": "Arusha, Tanzania",

    "home.sectionEyebrow": "Start exploring",
    "home.sectionTitle": "Three ways into Meru heritage",
    "home.sectionSubtitle": "Each page stands on its own, but they're built to be read together — history explains why the culture looks the way it does, and the dictionary gives you the words for it.",

    "home.cardHistoryTitle": "History",
    "home.cardHistoryText": "From migration onto Mount Meru's slopes to colonial-era upheaval and the founding of modern Meru District.",
    "home.cardCultureTitle": "Culture",
    "home.cardCultureText": "Language, farming life, social organisation, belief systems, and the mountain that shapes it all.",
    "home.cardDictionaryTitle": "Dictionary",
    "home.cardDictionaryText": "A searchable Kiswahili–English glossary of words and terms rooted in Meru community life.",
    "home.cardCta": "Learn more",

    "home.quoteText": "\u201cVarwa\u201d — those who climb. A name the Meru people sometimes use for themselves, honouring the mountain slopes they call home.",
    "home.quoteSource": "— Kimeru self-designation",

    "history.badge": "History",
    "history.heroTitle": "From the Slopes of Mount Meru",
    "history.heroSubtitle": "A timeline of migration, leadership, colonisation and nationhood — told in the Meru people's own homeland.",
    "history.introEyebrow": "Timeline",
    "history.introTitle": "How the story unfolds",
    "history.loading": "Loading the Meru historical timeline…",
    "history.error": "We couldn't load the history content. Please make sure the Meru backend server is running, then refresh this page.",

    "culture.badge": "Culture",
    "culture.heroTitle": "Life, Land and Language",
    "culture.heroSubtitle": "The customs, farming traditions, beliefs and social fabric that define everyday Meru life.",
    "culture.introEyebrow": "Living culture",
    "culture.introTitle": "What shapes Meru identity today",
    "culture.loading": "Gathering cultural notes…",
    "culture.error": "We couldn't load the culture content. Please make sure the Meru backend server is running, then refresh this page.",

    "dictionary.badge": "Dictionary",
    "dictionary.heroTitle": "Kiswahili–English Glossary",
    "dictionary.heroSubtitle": "Terms commonly used to describe Meru farming life, traditions and community structure — a living glossary we hope fluent Kimeru (Kirwa) speakers will help expand.",
    "dictionary.searchPlaceholder": "Search a word or meaning…",
    "dictionary.categoryAll": "All categories",
    "dictionary.resultsCount": "words found",
    "dictionary.loading": "Loading the dictionary…",
    "dictionary.error": "We couldn't load the dictionary. Please make sure the Meru backend server is running, then refresh this page.",
    "dictionary.noResults": "No words match your search. Try a different term.",
    "dictionary.note": "Note",
    "dictionary.contributeTitle": "Help grow this dictionary",
    "dictionary.contributeText": "This glossary currently features Kiswahili terms tied to Meru traditions. Kimeru (Kirwa) is the community's own Bantu language — native speakers are warmly invited to contribute authentic Kimeru entries."
  },

  sw: {
    "meta.title": "Urithi wa Wameru",
    "nav.home": "Nyumbani",
    "nav.history": "Historia",
    "nav.culture": "Utamaduni",
    "nav.dictionary": "Kamusi",
    "nav.theme": "Badilisha mwonekano",
    "nav.lang": "Badilisha lugha",

    "footer.tagline": "Rasilimali ya jamii inayoenzi historia, utamaduni na lugha ya Wameru wa Mlima Meru, Arusha.",
    "footer.explore": "Chunguza",
    "footer.about": "Kuhusu mradi huu",
    "footer.aboutText": "Umejengwa kama kumbukumbu huru inayokua. Umeona jambo la kurekebisha au kuongeza? Huu ni mwanzo tu — maarifa ya jamii ndiyo yatakayouboresha zaidi.",
    "footer.rights": "Urithi wa Wameru. Mradi wa kushiriki maarifa ya kitamaduni.",

    "home.badge": "Arusha, Tanzania · Mlima Meru",
    "home.heroEyebrow": "Wameru · Varwa · Rwa",
    "home.heroTitle": "Wameru wa Mlima Meru",
    "home.heroSubtitle": "Gundua historia, mila na lugha ya Wameru — jamii ya Kibantu iliyolima miteremko yenye rutuba ya Mlima Meru, Arusha, kwa karne nyingi.",
    "home.ctaHistory": "Angalia Historia",
    "home.ctaDictionary": "Fungua Kamusi",
    "home.statPopulation": "Idadi ya watu (takriban)",
    "home.statPopulationValue": "~200,000",
    "home.statMountain": "Mlima wa asili",
    "home.statMountainValue": "Mlima Meru, mita 4,566",
    "home.statLanguage": "Lugha ya asili",
    "home.statLanguageValue": "Kimeru (Kirwa)",
    "home.statRegion": "Mkoa",
    "home.statRegionValue": "Arusha, Tanzania",

    "home.sectionEyebrow": "Anza kuchunguza",
    "home.sectionTitle": "Njia tatu za kuelewa urithi wa Wameru",
    "home.sectionSubtitle": "Kila ukurasa unasimama peke yake, lakini vimeundwa kusomwa pamoja — historia inaeleza kwa nini utamaduni upo hivyo, na kamusi inakupa maneno ya kuueleza.",

    "home.cardHistoryTitle": "Historia",
    "home.cardHistoryText": "Kutoka uhamiaji kwenye miteremko ya Mlima Meru hadi misukosuko ya kikoloni na kuanzishwa kwa Wilaya ya Meru ya sasa.",
    "home.cardCultureTitle": "Utamaduni",
    "home.cardCultureText": "Lugha, maisha ya kilimo, mfumo wa kijamii, imani, na mlima unaosimamia yote hayo.",
    "home.cardDictionaryTitle": "Kamusi",
    "home.cardDictionaryText": "Kamusi ya maneno ya Kiswahili–Kiingereza yenye mizizi katika maisha ya jamii ya Wameru.",
    "home.cardCta": "Soma zaidi",

    "home.quoteText": "\u201cVarwa\u201d — wale wanaopanda. Jina ambalo Wameru hujiita wenyewe, likienzi miteremko ya mlima wanamoishi.",
    "home.quoteSource": "— Kujiita kwa Kimeru",

    "history.badge": "Historia",
    "history.heroTitle": "Kutoka Miteremko ya Mlima Meru",
    "history.heroSubtitle": "Mfululizo wa matukio ya uhamiaji, uongozi, ukoloni na taifa — yaliyosimuliwa katika ardhi ya asili ya Wameru.",
    "history.introEyebrow": "Mfululizo wa Matukio",
    "history.introTitle": "Simulizi inavyokwenda",
    "history.loading": "Inapakia mfululizo wa historia ya Wameru…",
    "history.error": "Imeshindikana kupakia historia. Hakikisha seva ya nyuma (backend) ya Meru inaendesha, kisha pakia upya ukurasa huu.",

    "culture.badge": "Utamaduni",
    "culture.heroTitle": "Maisha, Ardhi na Lugha",
    "culture.heroSubtitle": "Desturi, mila za kilimo, imani na muundo wa kijamii unaotambulisha maisha ya kila siku ya Wameru.",
    "culture.introEyebrow": "Utamaduni ulio hai",
    "culture.introTitle": "Kinachotambulisha Wameru leo",
    "culture.loading": "Inakusanya maelezo ya kiutamaduni…",
    "culture.error": "Imeshindikana kupakia utamaduni. Hakikisha seva ya nyuma (backend) ya Meru inaendesha, kisha pakia upya ukurasa huu.",

    "dictionary.badge": "Kamusi",
    "dictionary.heroTitle": "Kamusi ya Kiswahili–Kiingereza",
    "dictionary.heroSubtitle": "Maneno yanayotumika sana kuelezea maisha ya kilimo, mila na muundo wa jamii ya Wameru — kamusi hai tunayotarajia wazungumzaji wa Kimeru (Kirwa) watatusaidia kuiongezea.",
    "dictionary.searchPlaceholder": "Tafuta neno au maana…",
    "dictionary.categoryAll": "Makundi yote",
    "dictionary.resultsCount": "maneno yamepatikana",
    "dictionary.loading": "Inapakia kamusi…",
    "dictionary.error": "Imeshindikana kupakia kamusi. Hakikisha seva ya nyuma (backend) ya Meru inaendesha, kisha pakia upya ukurasa huu.",
    "dictionary.noResults": "Hakuna neno linalolingana na utafutaji wako. Jaribu neno lingine.",
    "dictionary.note": "Maelezo",
    "dictionary.contributeTitle": "Saidia kukuza kamusi hii",
    "dictionary.contributeText": "Kamusi hii kwa sasa ina maneno ya Kiswahili yanayohusiana na mila za Wameru. Kimeru (Kirwa) ni lugha ya asili ya jamii hii — wazungumzaji wazawa wanakaribishwa kuchangia maneno halisi ya Kimeru."
  }
};

const MeruI18n = (function () {
  const STORAGE_KEY = "meru-lang";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "en";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function t(key) {
    const lang = getLang();
    return (MERU_TRANSLATIONS[lang] && MERU_TRANSLATIONS[lang][key]) || MERU_TRANSLATIONS.en[key] || key;
  }

  function apply() {
    const lang = getLang();
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      el.setAttribute("aria-label", t(key));
    });

    // Keep the two language-pill buttons visually in sync, if present.
    document.querySelectorAll(".lang-option").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-value") === lang);
    });

    document.dispatchEvent(new CustomEvent("meru:langchange", { detail: { lang } }));
  }

  return { getLang, setLang, t, apply };
})();
