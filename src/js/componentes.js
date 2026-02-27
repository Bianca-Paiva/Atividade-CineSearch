// ==================== CARREGAR MENU ====================

// Faz uma requisição
fetch("/src/components/menu.html")
    .then((response) => response.text())
    .then((data) => {
    document.querySelector("#cabecalho").innerHTML = data;
}).catch((error) => console.error("Erro ao carregar o menu: ", error))

// ========================================