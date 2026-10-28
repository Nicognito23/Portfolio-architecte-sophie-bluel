const gallery = document.querySelector (".gallery");
const filters = document.querySelector(".filters");

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {                                     
        throw new Error("Erreur HTTP " + response.status);  
    }                                                       

    const works = await response.json();
    return works; 
}

async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");

    if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
    }

    const categories = await response.json();
    return categories;
}

async function init() {
    try {                                                                         
        const works = await getWorks();
        displayWorks(works);

        const categories = await getCategories();   
        displayFilters(categories);                    

    } catch (error) {                                                             
        console.error("Impossible de récupérer les travaux :", error);            
        gallery.textContent = "Impossible de charger les projets pour le moment."; 
    }                                                                             
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

function createFilterButton(label) {
    const button = document.createElement("button");
    button.textContent = label;
    return button;
}

function displayFilters(categories) {
    filters.innerHTML = "";

    filters.append(createFilterButton("Tous"));

    for (const category of categories) {
        filters.append(createFilterButton(category.name));
    }
}

init();


