export function initAdvent(posts) {
    // div для всей этой страницы его можно найти в advertisements.html
  const content = document.querySelector(".advent");

//   div для всех постов
  const mainDiv = document.createElement("div");
  mainDiv.className = "posts-wrapper";

  function randomGen() {
    const randomPosts = [...posts];

    for (let i = randomPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomPosts[i], randomPosts[j]] = [randomPosts[j], randomPosts[i]];
    }

    randomPosts.forEach(post => {
        const postDiv = document.createElement("div");

        postDiv.className = "post-wrapper"
      const p = document.createElement("p");
      p.textContent = post.title;
      postDiv.appendChild(p);
      mainDiv.appendChild(postDiv);
    });
  }

  function renderPosts() {
    randomGen();
    content.appendChild(mainDiv);
  }

  renderPosts();
}

