export function initAdvent(posts) {
    const content = document.querySelector(".advent")

    const mainDiv = document.createElement("div");
    mainDiv.className = "wrapperDiv";

    function renderPage() {

        for(let i = 0; i < posts.length; i++) {
            const text = document.createElement("p")
            let mainTitle = posts[i].title;
            text.textContent = mainTitle;
            mainDiv.appendChild(text);
            content.appendChild(mainDiv)
        }

    }

    renderPage()
}