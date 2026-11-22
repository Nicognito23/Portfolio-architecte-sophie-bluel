// Éléments de la page : le formulaire et l'emplacement du message d'erreur
const loginForm = document.querySelector("#login-form");
const loginError = document.querySelector(".error");

// Envoie l'e-mail et le mot de passe à l'API ; renvoie { userId, token } si c'est correct
function login(email, password) {
    return fetchData("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
}

// Au submit : appelle l'API, puis connecte l'utilisateur ou affiche l'erreur
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginError.textContent = "";

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const data = await login(email, password);
        localStorage.setItem("token", data.token);
        window.location.href = "./index.html";
    } catch (error) {
        console.error("Connexion impossible :", error);
        loginError.textContent = "E-mail ou mot de passe incorrect.";
    }
});
