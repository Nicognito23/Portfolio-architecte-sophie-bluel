// Éléments de la page où l'on ajoute les projets et les boutons de filtre
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Tous les travaux reçus de l'API, gardés en mémoire pour le filtrage
let allWorks = [];

// Valeur de categoryId qui signifie "afficher tous les travaux"
const ALL_CATEGORIES = 0;

// Récupère les travaux depuis l'API et renvoie le tableau
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");

    // fetch ne signale pas les erreurs 404/500 : on vérifie nous-mêmes
    if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
    }

    const works = await response.json();
    return works;
}

// Récupère les catégories depuis l'API et renvoie le tableau
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");

    if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
    }

    const categories = await response.json();
    return categories;
}

// Lance le chargement : travaux puis catégories, chacun avec sa gestion d'erreur
async function init() {
    try {
        allWorks = await getWorks();
        displayWorks(allWorks);
    } catch (error) {
        console.error("Impossible de récupérer les travaux :", error);
        gallery.textContent = "Impossible de charger les projets pour le moment.";
    }

    try {
        const categories = await getCategories();
        displayFilters(categories);
    } catch (error) {
        console.error("Impossible de récupérer les catégories :", error);
        filters.textContent = "Impossible de charger les filtres pour le moment.";
    }
}

// Fabrique la figure (image + titre) d'UN projet
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

// Vide la galerie puis y affiche une figure par projet
function displayWorks(works) {
    gallery.innerHTML = "";

    for (const work of works) {
        gallery.append(createWorkElement(work));
    }
}

// Fabrique UN bouton de filtre : au clic, il applique le filtre de sa catégorie
function createFilterButton(label, categoryId) {
    const button = document.createElement("button");
    button.textContent = label;

    button.addEventListener("click", () => applyFilter(button, categoryId));

    return button;
}

// Affiche le bouton "Tous" (sélectionné) puis un bouton par catégorie
function displayFilters(categories) {
    filters.innerHTML = "";

    const allButton = createFilterButton("Tous", ALL_CATEGORIES);
    allButton.classList.add("active");
    filters.append(allButton);

    for (const category of categories) {
        filters.append(createFilterButton(category.name, category.id));
    }
}

// Applique le filtre : met en évidence le bouton cliqué et affiche les bons travaux
function applyFilter(clickedButton, categoryId) {
    // Le bouton "active" change : on l'enlève partout, puis on le met sur le bouton cliqué
    for (const button of filters.querySelectorAll("button")) {
        button.classList.remove("active");
    }
    clickedButton.classList.add("active");

    // Affichage : tous les travaux, ou seulement ceux de la catégorie choisie
    if (categoryId === ALL_CATEGORIES) {
        displayWorks(allWorks);
    } else {
        displayWorks(allWorks.filter(work => work.categoryId === categoryId));
    }
}

init();