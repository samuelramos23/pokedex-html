const x = [];
let offset = 0;
const limit = 21;
let isLoading = false;

function carregarMaisPokemons() {
  if (isLoading) return;

  isLoading = true;

  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const listPokemons = data.results;

      Promise.all(listPokemons.map(element => {
        return fetch(element.url)
          .then(response => response.json());
      }))
      .then(pokemons => {
        pokemons.forEach(pokemon => {
          console.log(pokemon);
          desenharCarta(pokemon);
          x.push(pokemon);
        });

        isLoading = false;
      });

      offset += limit;
    });
}

function verificarScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight - 20) {
    carregarMaisPokemons();
  }
}

window.addEventListener('scroll', verificarScroll);

const sectionConteudos = document.querySelector('.container');

    function desenharCarta(pokemon) {
      // Card
      let carta = document.createElement('div');
      carta.setAttribute('class', 'card');
      sectionConteudos.appendChild(carta);

      // ID Pokemon
      let tituloContent = document.createElement('div');
      tituloContent.setAttribute('class', 'content');
      carta.appendChild(tituloContent);
      let idPokemon = document.createElement('span');
      idPokemon.setAttribute('class', 'id');
      tituloContent.appendChild(idPokemon);
      idPokemon.textContent = `ID ${pokemon.id}`;

      // Style Pokemon
      let tituloCon = document.createElement('div');
      tituloCon.setAttribute('class', 'content');
      carta.appendChild(tituloCon);
      let stylePokemon = document.createElement('span');
      stylePokemon.setAttribute('class', 'type');
      tituloCon.appendChild(stylePokemon);
      stylePokemon.textContent = pokemon.types[0].type.name;

      // Style Pokemon
      let tituloCon2 = document.createElement('div');
      tituloCon2.setAttribute('class', 'content');
      carta.appendChild(tituloCon2);
      let stylePokemon2 = document.createElement('span');
      stylePokemon2.setAttribute('class', 'type2');
      tituloCon2.appendChild(stylePokemon2);
      if (pokemon.types.length > 1) {
        stylePokemon2.textContent = pokemon.types[1].type.name;
      } else {
        stylePokemon2.textContent = null;
      }

      // Imagem dentro do card
      let imagem = document.createElement('div');
      carta.appendChild(imagem);
      imagem.setAttribute('class', 'img');
      imagem.setAttribute('id', pokemon.name);
      document.getElementById(pokemon.name).style.backgroundImage = `url(${pokemon.sprites.front_default})`;

      // Nome do Pokemon
      let nomeLutador = document.createElement('span');
      nomeLutador.setAttribute('class', 'name');
      imagem.appendChild(nomeLutador);
      nomeLutador.textContent = pokemon.name;
    }

carregarMaisPokemons();