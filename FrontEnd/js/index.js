const gallery = document.querySelector (".gallery");

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {                                     
        throw new Error("Erreur HTTP " + response.status);  
    }                                                       

    const works = await response.json();
    return works; 
}

async function init() {
    try {                                                                         
        const works = await getWorks();
        displayWorks(works);
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

init();


