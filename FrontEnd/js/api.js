// Adresse de base de l'API : à modifier à un seul endroit si elle change
const API_URL = "http://localhost:5678/api";

/**
 * Appelle l'API et renvoie la réponse décodée en JSON.
 * @param {string} endpoint - Route de l'API, par exemple "/works".
 * @param {RequestInit} [options] - Options de fetch (method, headers, body...). Un GET si omis.
 * @returns {Promise<any>} Les données JSON de la réponse.
 * @throws {Error} Si la réponse n'est pas ok ; le code HTTP est dans error.status.
 */
async function fetchData(endpoint, options = {}) {
    const response = await fetch(API_URL + endpoint, options);

    // fetch ne signale pas les erreurs 404/500 : on vérifie nous-mêmes
    if (!response.ok) {
        const error = new Error("Erreur HTTP " + response.status);
        error.status = response.status;
        throw error;
    }

    return response.json();
}