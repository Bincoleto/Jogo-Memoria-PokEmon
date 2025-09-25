
const listaPokemons = []

async function getPokemons(){

  
    for(var i =0; i < 12; i++){
        /* Buscar nome do pokemons de forma aleatoria na api */
        const randomNumber = Math.floor(Math.random() * 800)

        /* Forma de fazer uma requisição via fectch*/
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
        const data = await response.json()
        
        listaPokemons.push({
            nome: data.name,
            img: data.sprites.other.dream_world.front_default

        })
   
    }

    console.log(listaPokemons)
}

getPokemons()