export function initAdvent(posts) {
  const content = document.querySelector(".advent");
  const mainDiv = document.createElement("div");
  mainDiv.className = "wrapperDiv";

  function randomGen() {
    const randomPosts = [...posts];

    for (let i = randomPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomPosts[i], randomPosts[j]] = [randomPosts[j], randomPosts[i]];
    }

    randomPosts.forEach(post => {
      const p = document.createElement("p");
      p.textContent = post.title;
      mainDiv.appendChild(p);
    });
  }

  function renderPosts() {
    randomGen();
    content.appendChild(mainDiv);
  }

  renderPosts();
}

