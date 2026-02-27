// Pega o lugar onde vão ficar os bloquinhos cinza (skeleton)
const grid = document.querySelector(".grid");

// Cria 6 bloquinhos cinza pra fingir que está carregando
for (let i = 0; i < 6; i++) {
  const div = document.createElement("div"); // cria um quadradinho
  div.classList.add("detail-item"); // diz que a cor dele é cinza
  grid.appendChild(div); // coloca ele na tela
}

// Essa é a chave que faz conversar com a API
const API_KEY = "94108358";

// Aqui a gente olha a URL pra ver qual filme foi pedido
// Tipo: details.html?id=tt0372784
const params = new URLSearchParams(window.location.search);
const imdbID = params.get("id") || "tt0372784"; // pega só o código do filme (|| "tt0372784" é só para testes)

// Se não tiver código na URL...
if (!imdbID) {
  // Mostra mensagem de erro
  document.body.innerHTML = "<h2>Filme não encontrado</h2>";
} else {
  // Se tiver código, vai buscar o filme
  fetchMovieDetails(imdbID);
}

// Função que vai conversar com a API e pedir os detalhes do filme
async function fetchMovieDetails(id) {
  try {
    // Faz a pergunta pra API usando o código do filme
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
    );

    // Transforma a resposta em JSON (para o JS entender)
    const data = await response.json();

    // Se a API disser que não encontrou o filme...
    if (data.Response === "False") {
      document.body.innerHTML = "<h2>Filme não encontrado</h2>";
      return; // para tudo
    }

    // Se deu certo, manda mostrar na tela
    renderDetails(data);

  } catch (error) {
    // Se deu erro na internet ou algo quebrou
    document.body.innerHTML = "<h2>Erro ao carregar dados</h2>";
  }
}

// Função que pega os dados do filme e coloca na tela
function renderDetails(movie) {

  // Pega a parte da página onde estavam os bloquinhos cinza
  const container = document.querySelector(".details-skeleton");

  // Troca tudo pelos dados reais do filme
  container.innerHTML = `
    <div>
      <img src="${movie.Poster}" style="width:100%; border-radius:8px;">
    </div>

    <div>
      <h1>${movie.Title} (${movie.Year})</h1>
      <p><strong>Gênero:</strong> ${movie.Genre}</p>
      <p><strong>Duração:</strong> ${movie.Runtime}</p>
      <p><strong>Diretor:</strong> ${movie.Director}</p>
      <p><strong>Atores:</strong> ${movie.Actors}</p>

      <div style="margin-top:20px;">
        <h3>Sinopse</h3>
        <p>${movie.Plot}</p>
      </div>
    </div>
  `;
}

// Vai fazer a página de busca já redirecionar automaticamente com o ID (os dados do filme) quando clicar num filme
// window.location.href = `detalhesPage.html?id=${movie.imdbID}`;

// Para testar o fluxo
// console.log(movie.imdbID);

// http://127.0.0.1:5500/detalhesPage.html?id=tt0372784