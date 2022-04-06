const url = "https://pokeapi.co/api/v2/pokemon?limit=54"
//Had to get my buddy Psyduck in on the action here
const main = document.querySelector("main")
const spinner = document.querySelector(".spinner")

document.querySelector("h1").textContent = "Pokedex!"

function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    const titleName = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
    div.innerHTML = `
    <figure>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${titleName}</a></figcaption>
    </figure>
    `
    main.append(div)
}

fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    }).then(responses => {
        responses.forEach(response => {
            spinner.classList.add("hidden")
            addPokemonImage(response)
        })
    })