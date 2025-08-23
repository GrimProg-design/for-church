import { initPagination } from "./pagination.js";
import { initAdvent } from "./advertisements.js";

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const homeContent = content.innerHTML;

  async function loadPage(page, title = "") {
    try {
      if (page === "home") {
        content.innerHTML = homeContent;
        document.title = "Храм";
        return;
      }

      let path = "";
      let isArchivePage = false;
      let isAdventPage = false;

      const archiveRootPages = ["renovationArchive", "cossacks-archive", "archive"];

      if (page.startsWith("renovation-news")) {
        path = `pages/archive-pages/renovation-archive/${page}.html`;
      } else if (page.startsWith("news-")) {
        path = `news/main-news/${page}.html`;
      } else if (page.startsWith("cossackus-")) {
        path = `news/cossacks-news/${page}.html`;
      } else if (page.startsWith("renovation-")) {
        path = `news/renovation-news/${page}.html`;
      } else if (page.startsWith("kazach-")) {
        path = `pages/archive-pages/cossacks-archive/${page}.html`;
      } else if (page.startsWith("general-")) {
        path = `pages/archive-pages/news-archive/${page}.html`;
      } else if (page.startsWith("decor-")) {
        path = `pages/section/decor-section/${page}.html`;
      } else if (page.startsWith("education-")) {
        path = `pages/section/education-section/${page}.html`
      } else if (page.startsWith("social-")) {
        path = `pages/section/social-section/${page}.html`
      } else if (page.startsWith("support")) {
        path = `pages/${page}.html`
      } else if (page.startsWith("reports-")) {
        path = `pages/${page}.html`
      } else if (archiveRootPages.includes(page)) {
        path = `pages/archive-pages/${page}.html`;
        isArchivePage = true;
      } else {
        path = `pages/${page}.html`;
        if(page.startsWith("advertisements")) {
          isAdventPage = true
        }
      }

      const res = await fetch(path);
      if (!res.ok) throw new Error(`Страница ${path} не найдена`);

      const html = await res.text();
      content.innerHTML = html;


      // пагинация
      if (isArchivePage) {
        if (page === "renovationArchive") {
          const renovationNews = [
            { title: "Первая новость", page: "renovation-news-1" },
            { title: "Вторая новость", page: "renovation-news-2" },
            { title: "Третья новость", page: "renovation-news-3" },
            { title: "Четвертая новость", page: "renovation-news-4" },
            { title: "Пятая новость", page: "renovation-news-5" },
            { title: "Шестая новость", page: "renovation-news-6" },
          ];
          initPagination(renovationNews, "news-container-renovation", "pagination-renovation");
        }

        if (page === "cossacks-archive") {
          const kazachNews = [
            { title: "Казачья новость 1", page: "kazach-1" },
            { title: "Казачья новость 2", page: "kazach-2" },
            { title: "Казачья новость 3", page: "kazach-3" },
          ];
          initPagination(kazachNews, "news-container-kazach", "pagination-kazach");
        }

        if (page === "archive") {
          const generalNews = [
            { title: "Общая новость 1", page: "general-1" },
            { title: "Общая новость 2", page: "general-2" },
            { title: "Общая новость 3", page: "general-3" },
          ];
          initPagination(generalNews, "news-container-general", "pagination-general");
        }
      }


      // Объявления
      if(isAdventPage) {
        const posts = [
          { title: "Объявление 1", id: 1, age: "new" },
          { title: "Объявление 2", id: 2, age: "new" },
          { title: "Объявление 3", id: 3, age: "old" },
          { title: "Объявление 4", id: 4, age: "old" }
        ]
        initAdvent(posts)
      }
      

      document.title = title ? `Храм — ${title}` : "Храм";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      content.innerHTML = "<p>Ошибка загрузки страницы.</p>";
      console.error(err);
    }
  }

  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-page]");
    if (!link) return;

    e.preventDefault();

    const page = link.dataset.page;
    const title = link.textContent.trim();

    history.pushState({ page, title }, `Храм — ${title}`, `?page=${page}`);
    loadPage(page, title);
  });

  window.addEventListener("popstate", (e) => {
    const state = e.state;
    if (state) {
      loadPage(state.page, state.title);
    } else {
      loadPage("home", "Главная");
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const initialPage = urlParams.get("page") || "home";
  const initialTitle = initialPage === "home" ? "Главная" : "";
  loadPage(initialPage, initialTitle);
});