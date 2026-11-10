// Adresse de base de l'API : à modifier à un seul endroit si elle change
const API_URL = "http://localhost:5678/api";

// Appelle l'API et renvoie la réponse en JSON ; lève une erreur si la réponse n'est pas ok
async function fetchData(endpoint, options) {
    const response = await fetch(API_URL + endpoint, options);

    // fetch ne signale pas les erreurs 404/500 : on vérifie nous-mêmes
    if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
    }

    return response.json();
}