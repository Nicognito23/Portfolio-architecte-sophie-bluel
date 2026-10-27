const gallery = document.querySelector (".gallery");

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works; 
}

async function init() {
    const works = await getWorks();
    displayWorks(works);
}

function createWorkElement(work) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.append(img, figcaption);
    return figure;
}

function displayWorks(works) {
    gallery.innerHTML = "";

    for (const work of works) {
        gallery.append(createWorkElement(work));
    }
}

init();


