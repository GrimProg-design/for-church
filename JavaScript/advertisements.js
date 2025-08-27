export function initAdvent(posts) {
  // div для всей этой страницы его можно найти в advertisements.html
  const content = document.querySelector(".advent");

  //   div для всех постов
  const mainDiv = document.createElement("div");
  mainDiv.className = "posts-wrapper";

  function generator(post) {
    const a = document.createElement("a");
    const textDiv = document.createElement("div")
    textDiv.className = "text-wrapper-advent"

    a.className = "postLinks";
    a.setAttribute("href", "#");
    a.setAttribute("data-page", `advertisements-${post.id}`)

    const postDiv = document.createElement("div");

    const photoDiv = document.createElement("div");
    const img = document.createElement("img");
    photoDiv.className = "photo-wrapper-advent";
    img.setAttribute("src", post.img);
    img.className = "advent-photo"
    photoDiv.appendChild(img);
    
    postDiv.className = "post-wrapper";
    const p = document.createElement("p");
    textDiv.appendChild(p);
    p.textContent = post.title;
    postDiv.appendChild(textDiv);
    a.appendChild(postDiv);
    mainDiv.appendChild(a);
    postDiv.prepend(photoDiv)
  }

  function search() {
    const search = document.querySelector("#finder");
    const searchPost = [...posts];

    search.addEventListener("input", () => {
      const value = search.value.toLowerCase();
      mainDiv.innerHTML = "";

      const new3 = searchPost.filter((ad) =>
        ad.title.toLowerCase().includes(value)
      );

      new3.forEach((post) => {
        generator(post);
      });

      if(new3.length === 0) {
        const h = document.createElement("h2");
        h.className = "warn"
        h.textContent = "Упс похоже по вашему запросу ничего не найдено 😔"
        mainDiv.appendChild(h)
      }
    });
  }
  search();

  function filterFunc(e) {
    const select = document.querySelector("#filter");
    const value = select.value;
    const filter = [...posts];

    mainDiv.innerHTML = "";

    if (value === "new") {
      const new1 = filter.filter((ad) => ad.age === "new");
      new1.forEach((post) => {
        generator(post);
      });
    } else if (value === "all") {
      randomGen();
    } else if (value === "old") {
      const new2 = filter.filter((ad) => ad.age === "old");
      new2.forEach((post) => {
        generator(post);
      });
    }
  }

  const select = document.querySelector("#filter");
  select.addEventListener("change", filterFunc);

  function randomGen() {
    const randomPosts = [...posts];

    for (let i = randomPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomPosts[i], randomPosts[j]] = [randomPosts[j], randomPosts[i]];
    }

    randomPosts.forEach((post) => {
      generator(post);
    });
  }

  function renderPosts() {
    randomGen();
    content.appendChild(mainDiv);
  }

  renderPosts();
}
