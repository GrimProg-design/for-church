export function initAdvent() {
    const content = document.querySelector(".advent")

    function renderPage() {
        const btn = document.createElement("button");
        btn.textContent = "click";
        content.appendChild(btn)

        btn.addEventListener("click", () => {
            console.log("hi")
        })
    }

    renderPage()
}