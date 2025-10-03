
async function fetchPokemons(){

    /* Buscar nome do pokemons de forma aleatoria na api */
    const randomNumber = Math.floor(Math.random() * 800)

    /* Forma de fazer uma requisição via fectch*/
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    const data = await response.json()

    return data
}

/* Função responsavel em buscar a imagem do pokemon e validar se existe o link*/
const getPokemons = async () => {
    const listaPokemons = []
    
    while (listaPokemons.length < 7) {
        const date =  await fetchPokemons()

        if(date.sprites.other.dream_world.front_default !== null){
             listaPokemons.push({
                nome: date.name,
                img: date.sprites.other.dream_world.front_default
            })
        }
        // console.log(listaPokemons)
    }

    const listaPokemonsDuplicados = [...listaPokemons, ...listaPokemons]


    return listaPokemonsDuplicados
}


async function buildCards(){

    const pokemon = await getPokemons()
    const area = document.getElementById('renderArea')

    for (let i = 0; i < pokemon.length; i++) {
        const div = document.createElement('div')
        div.className = 'flipped'

        const img = document.createElement('img')

        area.appendChild(div)

        div.addEventListener('click', function() {
            // alert(`${pokemon[i].nome}`)
            div.classList.remove('flipped')
            div.classList.add('card')
            img.src = pokemon[i].img
            div.appendChild(img)
            cartaVirada.push(pokemon[i].nome)
            console.log(cartaVirada)
        })
    }
}

buildCards()

const cartaVirada = []