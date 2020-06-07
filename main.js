const pokemonPromises = []
function getPokemons(){

    for(let id = 1; id <= 150; id++)
        pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then( res => res.json())) 
    
    Promise.all(pokemonPromises)
        .then( pokemons => {
            
            const ListItems = pokemons.reduce((item, pokemon) => {
                let types = pokemon.types.map( i => i.type.name);
                item += `<li>
                            <p class="xp">${pokemon.base_experience} XP</p>
                            <h1>${pokemon.name}</h1>
                            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
                            <div>`
                
                            for(type of types)
                                item += `<span class="${type}"><p>${type}</p></span>`
                item += `</div>
                        </li>`;
                
                return item;
            }, "");
            document.getElementById("list").innerHTML = ListItems;
        })
    
}

getPokemons();