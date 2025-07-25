document.body.addEventListener("click", async (e) => {
  const link = e.target.closest(".fours-menu-link");

  if (link) {
    e.preventDefault();

    let folder = "";

    const page = link.dataset.page;

    if (page.startsWith("education-")) {
      folder = "education-section";
    } else if (page.startsWith("decor-")) {
      folder = "decor-section";
    } else if (page.startsWith("social-")) {
      folder = "social-section";
    } else {
    }

    try {
      const response = await fetch(`/pages/section/${folder}/${page}.html`);
      if (!response.ok) throw new Error("Ошибка загрузки");

      const html = await response.text();
      document.querySelector("#content").innerHTML = html;
    } catch (error) {
      console.error("Ошибка загрузки страницы:", error);
      document.querySelector("#content").innerHTML =
        "<p>Ошибка загрузки контента</p>";
    }
  }
});
