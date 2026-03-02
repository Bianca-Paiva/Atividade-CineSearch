/* ==================== CONFIGURAÇÃO INICIAL ==================== */

// Pega os parâmetros da URL
const params = new URLSearchParams(window.location.search);
const imdbID = params.get("id");

// Elementos do DOM
const poster = document.getElementById("poster");
const titulo = document.getElementById("titulo");
const tipo = document.getElementById("tipo");
const ano = document.getElementById("ano");
const detalhesDuracao = document.getElementById("detalhesDuracao");
const textoSinopse = document.getElementById("textoSinopse");
const genero = document.getElementById("genero");
const roterista = document.getElementById("roterista");
const idioma = document.getElementById("idioma");
const bilheteria = document.getElementById("bilheteria");
const diretor = document.getElementById("diretor");
const moviePais = document.getElementById("pais");
const lancamento = document.getElementById("lancamento");
const producao = document.getElementById("producao");
const elenco = document.getElementById("elenco");
const premios = document.getElementById("premios");

// Botão de voltar
const btnVoltar = document.getElementById("resposta-voltar-container");

const chaveApi = "49cfe1b3";

// Se não tiver id, para aqui
if (!imdbID) {
  console.error("ID do filme não encontrado na URL.");
}

/* ==================== FUNÇÃO PRINCIPAL ==================== */

async function carregarDetalhes() {
  try {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${chaveApi}`;
    const response = await fetch(url);
    const dados = await response.json();

    if (dados.Response === "False") {
      console.error("Erro ao buscar detalhes:", dados.Error);
      return;
    }

    // Preenchendo os elementos do DOM
    poster.src = dados.Poster !== "N/A" ? dados.Poster : "./src/image/placeholder.png";
    poster.alt = `Poster de ${dados.Title}`;
    titulo.textContent = dados.Title || "-";
    tipo.textContent = dados.Type || "-";
    ano.textContent = dados.Year || "-";
    detalhesDuracao.textContent = dados.Runtime || "-";
    textoSinopse.textContent = dados.Plot || "-";
    genero.textContent = dados.Genre || "-";
    roterista.textContent = dados.Writer || "-";
    idioma.textContent = dados.Language || "-";
    bilheteria.textContent = dados.BoxOffice || "-";
    diretor.textContent = dados.Director || "-";
    moviePais.textContent = dados.Country || "-";
    lancamento.textContent = dados.Released || "-";
    producao.textContent = dados.Production || "-";
    elenco.textContent = dados.Actors || "-";
    premios.textContent = dados.Awards || "-";

  } catch (erro) {
    console.error("Erro ao carregar detalhes:", erro);
  }
}

/* ==================== BOTÃO VOLTAR ==================== */

btnVoltar.addEventListener("click", () => {
  window.history.back(); // volta pra página anterior
});

/* ==================== EXECUTA AO CARREGAR ==================== */
carregarDetalhes();

