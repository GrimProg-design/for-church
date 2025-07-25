document.body.addEventListener("click", async (e) => {
  const link = e.target.closest("a[data-page]");
  if (!link) return;

  e.preventDefault();

  const page = link.dataset.page;
  const content = document.getElementById("content");

  let folder = "";

  if (page.startsWith("kazach-")) {
    folder = "cossacks-archive";
  } else if (page.startsWith("general-")) {
    folder = "news-archive";
  } else if (page.startsWith("news-")) {
    folder = "renovation-archive";
  } else {
    return;
  }

  try {
    const res = await fetch(`pages/archive-pages/${folder}/${page}.html`);
    if (!res.ok) throw new Error(`Файл pages/archive-pages/${folder}/${page}.html не найден`);

    const html = await res.text();
    content.innerHTML = html;
    document.title = `Храм — ${link.textContent.trim()}`;
    history.pushState({ page }, "", `?page=${page}`);
  } catch (err) {
    content.innerHTML = "<p>Ошибка загрузки.</p>";
    console.error(err);
  }
});
