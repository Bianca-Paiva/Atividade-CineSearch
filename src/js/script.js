/* ==================== ELEMENTOS DOM ==================== */
// Elementos do container de pesquisa
const pesquisaContainer = document.getElementById("pesquisa-container");
const pesquisaInput = document.getElementById("pesquisa-input");
const pesquisaBtn = document.getElementById("pesquisa-btn");
const pesquisaAviso = document.getElementById("pesquisa-aviso");

// Elementos do container com cards dos resultados da pesquisa
const respostaContainer = document.getElementById("resposta-container");
const respostaVoltarContainer = document.getElementById(
  "resposta-voltar-container",
);
const respostaTitulo = document.getElementById("resposta-titulo");
const respostaQuantidade = document.getElementById("resposta-quantidade");
// Elemenotos dos cards
const respostaCards = document.getElementsByClassName("card");
const respostaCardImagem = document.getElementsByClassName("card-imagem");
const respostaCardInformacoes =
  document.getElementsByClassName("card-informacoes");
const respostaCardTitulo = document.getElementsByClassName("card-titulo");
const respostaCardAnoCategoria =
  document.getElementsByClassName("card-ano-categoria");
const respostaCardAno = document.getElementsByClassName("card-ano");
const respostaCardCategoria = document.getElementsByClassName("card-categoria");

/* ==================== FUNÇÕES ==================== */

// Evento para remover aviso
function removerPesquisaAviso() {
  // Adiciona um ouvinte de evento para detectar uma tecla pressionada no teclado
  pesquisaInput.addEventListener("keypress", () => {
    // Caso seja pressionado o espaço não oculta o aviso
    if (pesquisaInput.value.trim() !== "") {
      pesquisaAviso.classList.add("oculto");
      return;
    }
  });
}

removerPesquisaAviso();

async function pesquisar() {
  const chaveApi = "49cfe1b3";

  // Verifica se o campo de pesquisa está vazio
  if (pesquisaInput.value === "") {
    pesquisaAviso.classList.remove("oculto");
    return;
  }

  // Tira os espaços do íicio e fim
  const termoDeBusca = pesquisaInput.value.trim();
  // Codifica só o parâmetro
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(termoDeBusca)}&apikey=${chaveApi}`;

  // Bloco para tratar erros
  try {
    // Inicia a requisição de pesquisa
    const response = await fetch(url);
    const dados = await response.json();

    // Verifica se a requisição foi bem sucedida
    if (dados.Response === "True") {
      exibirResultados(dados);
    } else {
      // Altera o display do container da pesquisa e da resposta
      pesquisaContainer.classList.add("oculto");
      respostaContainer.classList.remove("oculto");
      respostaTitulo.textContent = `Nenhum resultado para: ${termoDeBusca}`;
      respostaQuantidade.textContent = "";
      document.getElementById("resposta-container-cards").innerHTML = "";
    }
  } catch (error) {
    console.error("Erro ao pesquisar: ", error);
  }
}

function exibirResultados(dados) {
  // Tira os espaços do íicio e fim
  const termoDeBusca = pesquisaInput.value.trim();

  // Pega o container que contém os cards
  const containerCards = document.getElementById("resposta-container-cards");

  // Limpa os cards anteriores
  containerCards.innerHTML = "";

  // Altera o display do container da pesquisa e da resposta
  respostaContainer.classList.remove("oculto");
  pesquisaContainer.classList.add("oculto");

  // Define os textos do cabeçalho
  respostaTitulo.textContent = `Resultados para: ${termoDeBusca}`;
  respostaQuantidade.textContent = `Encontrados: ${dados.totalResults}`;

  // Cria um card para cada filme ou série encontrado
  dados.Search.forEach((filmeOuSerie) => {
    let limite = 28;
    let titulo = filmeOuSerie.Title;

    if (titulo.length > limite) {
        titulo = titulo.substring(0, limite) + "..."
    }

    const cardHtml = `
            <div class="card" onclick="abrirDetalhes('${filmeOuSerie.imdbID}')">
                <img class="card-imagem" src=" ${filmeOuSerie.Poster}" alt="${filmeOuSerie.Title}" />
                <div class="card-informacoes">
                    <h2 class="card-titulo">${titulo}</h2>
                    <div class="card-ano-categoria">
                        <p class="card-ano">${filmeOuSerie.Year}</p>
                        <p class="card-categoria">${filmeOuSerie.Type}</p>
                    </div>
                </div>
            </div>
        `;

    // Adiciona o card ao container
    containerCards.innerHTML += cardHtml;
  });
}

// Adiciona o evento de clique ao botão de voltar
respostaVoltarContainer.addEventListener("click", () => {
  // Altera o display dos containers
  pesquisaContainer.classList.remove("oculto");
  respostaContainer.classList.add("oculto");

  // Limpar input
  pesquisaInput.value = "";

  // Limpa o aviso
  pesquisaAviso.classList.add("oculto");

  // Coloca o foco no input
  pesquisaInput.focus();
});

// Adiciona o evento de clique ao botão de pesquisa
pesquisaBtn.addEventListener("click", pesquisar);
