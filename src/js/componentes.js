// ==================== CARREGAR MENU ====================

// Faz uma requisição
fetch("/src/components/menu.html")
    .then((response) => response.text())
    .then((detalhesDuracao) => {
    document.querySelector("#cabecalho").innerHTML = detalhesDuracao;
}).catch((error) => console.error("Erro ao carregar o menu: ", error))

// ========================================