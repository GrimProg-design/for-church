export function initPagination(newsData, containerId, paginationId) {
  const itemsPerPage = 4;
  const container = document.getElementById(containerId);
  const pagination = document.getElementById(paginationId);

  if (!container || !pagination) return;

  let currentPage = 1;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  function renderPage(pageNumber) {
    container.innerHTML = "";
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = newsData.slice(start, end);

    currentItems.forEach(({ title, page }) => {
      const article = document.createElement("article");
      const link = document.createElement("a");
      link.href = "#";
      link.className = "fours-menu-link";
      link.textContent = title;
      link.dataset.page = page;
      article.appendChild(link);
      container.appendChild(article);
    });

    renderPagination(pageNumber);
  }

  function renderPagination(activePage) {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === activePage) btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });

      pagination.appendChild(btn);
    }
  }

  renderPage(currentPage);
}