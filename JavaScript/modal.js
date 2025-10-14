import { holidayInfo } from "./holidays.js";

export function initCalendarModal() {
  const modalHTML = `
    <div class="modal" id="calendar-modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h3 id="modal-title"></h3>
        <p id="modal-description"></p>
      </div>
    </div>
  `;

  if (!document.getElementById("calendar-modal")) {
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  const modal = document.getElementById("calendar-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const modalClose = document.querySelector(".modal-close");

  document.addEventListener("click", (e) => {
    const day = e.target.closest(".calendar-day[data-day]");
    if (!day) return;

    const dayNumber = day.dataset.day;
    const info = holidayInfo[dayNumber];

    modalTitle.textContent = info ? info.title : `День ${dayNumber}`;
    modalDesc.textContent = info
      ? info.description
      : "Информация о празднике пока отсутствует.";

    modal.style.display = "flex";
  });

  modalClose.addEventListener("click", () => (modal.style.display = "none"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });
}

