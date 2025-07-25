import { initPagination } from "./pagination.js";

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[data-page]");
  const content = document.getElementById("content");

  const homeContent = content.innerHTML;

  async function loadPage(page, title = "") {
    try {
      if (page === "home") {
        content.innerHTML = homeContent;
        document.title = "Храм";
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      let path = "";

      // Корневые архивные страницы
      const archiveRootPages = [
        "renovation-archive",
        "cossacks-archive",
        "archive",
      ];


      if (page.startsWith("education-")) {
        path = `pages/section/education-section/${page}.html`;
      } else if (page.startsWith("decor-")) {
        path = `pages/section/decor-section/${page}.html`;
      } else if (page.startsWith("social-")) {
        path = `pages/section/social-section/${page}.html`;
      }
      
      // Отдельные новости из подпапок архивов
      if (page.startsWith("news-")) {
        path = `pages/archive-pages/renovation-archive/${page}.html`;
      } else if (page.startsWith("kazach-")) {
        path = `pages/archive-pages/cossacks-archive/${page}.html`;
      } else if (page.startsWith("general-")) {
        path = `pages/archive-pages/news-archive/${page}.html`;
      } else if (archiveRootPages.includes(page)) {
        path = `pages/archive-pages/${page}.html`;
      } else {
        path = `pages/${page}.html`;
      }

      const res = await fetch(path);
      if (!res.ok) throw new Error("Страница не найдена");
      const html = await res.text();
      content.innerHTML = html;

      // Пагинация для архивов
      setTimeout(() => {
        if (page === "renovation-archive") {
          const renovationNews = [
            { title: "Первая новость", page: "news-1" },
            { title: "Вторая новость", page: "news-2" },
            { title: "Третья новость", page: "news-3" },
            { title: "Четвертая новость", page: "news-4" },
            { title: "Пятая новость", page: "news-5" },
            { title: "Шестая новость", page: "news-6" },
          ];
          initPagination(
            renovationNews,
            "news-container-renovation",
            "pagination-renovation"
          );
        }

        if (page === "cossacks-archive") {
          const kazachNews = [
            { title: "Казачья новость 1", page: "kazach-1" },
            { title: "Казачья новость 2", page: "kazach-2" },
            { title: "Казачья новость 3", page: "kazach-3" },
          ];
          initPagination(
            kazachNews,
            "news-container-kazach",
            "pagination-kazach"
          );
        }

        if (page === "archive") {
          const generalNews = [
            { title: "Общая новость 1", page: "general-1" },
            { title: "Общая новость 2", page: "general-2" },
            { title: "Общая новость 3", page: "general-3" },
          ];
          initPagination(
            generalNews,
            "news-container-general",
            "pagination-general"
          );
        }
      }, 0);

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
    const title = link.textContent;

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
  const initialLink = [...links].find((l) => l.dataset.page === initialPage);
  const initialTitle = initialLink ? initialLink.textContent : "Главная";
  loadPage(initialPage, initialTitle);
});
