
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
    
    while (listaPokemons.length < 9) {
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
    listaPokemonsDuplicados.sort(() => Math.random()- 0.5)


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
            div.classList.add('card', 'no-click')
            img.src = pokemon[i].img
            div.appendChild(img)
            cartaVirada.push({
                pokemon: pokemon[i].nome,
                elementoHtml: div,
                imagem: img
            })
            console.log(cartaVirada)
            verificarCard(area)
        })
    }
}

buildCards()

function verificarCard(area){

    if(cartaVirada.length === 2){
        area.classList.add('no-click')
        if(cartaVirada[0].pokemon !== cartaVirada[1].pokemon){

            setTimeout(() => {
                cartaVirada[0].elementoHtml.classList.remove('card')
                cartaVirada[0].elementoHtml.classList.add('flipped')
                //Forma 1 de usar com o removeChild, porem pode gera erro no navegador.
                cartaVirada[0].elementoHtml.removeChild(cartaVirada[0].imagem)
                cartaVirada[0].elementoHtml.classList.remove('no-click')

                cartaVirada[1].elementoHtml.classList.remove('card')
                cartaVirada[1].elementoHtml.classList.add('flipped')
                // Forma 2 de usar, evita erro no navegador.
                // Essa forma na minha opinião foi a melhor forma de remover o elemento.
                cartaVirada[1].imagem.remove()
                cartaVirada[1].elementoHtml.classList.remove('no-click')
                area.classList.remove('no-click')

                cartaVirada.length = 0
                console.log('Esta repetido')
            }, 1000);
            
        }else{
            cartaVirada.length = 0
            area.classList.remove('no-click')
        }
    }

}

const cartaVirada = []

