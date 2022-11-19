const colors = {
  bug: '#aabb22',
  dark: '#775544',
  dragon: '#7766ee',
  electric: '#ffcc33',
  fairy: "#ee99ee",
  fighting: '#bb5544',
  fire: '#ff4422',
  flying: '#8899ff',
  ghost: '#6666bb',
  grass: '#77cc55',
  ground: '#ddbb55',
  ice: '#66ccff',
  normal: '#aaaa99',
  poison: '#aa5599',
  psychic: '#ff5599',
  rock: '#bbaa66',
  steel: '#aaaabb',
  water: '#3399ff',
}


// LISTAR POKEMONS INICIAIS
// LISTAR POKEMONS INICIAIS
// LISTAR POKEMONS INICIAIS
// LISTAR POKEMONS INICIAIS
// LISTAR POKEMONS INICIAIS


const fetchPokemon = async (id) => {
  if(id){
    await getPokemon(id, true)
  }
  else{
    for(let i = 1; i <= 151; i++) {
      await getPokemon(i)
    }
  }
}
const getPokemon = async (id, valor) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()
  createPokemonCard(data, valor)
}
fetchPokemon()

function createPokemonCard(pokemon, valor){
  const id = pokemon.id.toString().padStart(3, '0')
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const height = pokemon.height
  const weight = pokemon.weight

  if(!valor){
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('card-item')
    pokemonEl.setAttribute('onclick', 'seeDetails(this)')

    pokemonEl.innerHTML = `
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="" width="150" class="card-img">
    <div class="card-number">${id}</div>
    <div class="card-name">${name}</div>
 
    `

    if(pokemon.types.length == '1'){
      var type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)
      var color1 = colors[pokemon.types[0].type.name]

      const div = document.createElement('div')
      div.setAttribute('class', 'card-type')
      div.innerHTML = `
        <span class="type" style="background-color: ${color1}">${type1}</span>
      `

      pokemonEl.appendChild(div)
    }
    else if(pokemon.types.length == '2'){
      var type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)
      var type2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1)
      var color1 = colors[pokemon.types[0].type.name]
      var color2 = colors[pokemon.types[1].type.name]

      const div = document.createElement('div')
      div.setAttribute('class', 'card-type')
      div.innerHTML = `
        <span class="type" style="background-color: ${color1}">${type1}</span>
        <span class="type" style="background-color: ${color2}">${type2}</span>
      `

      pokemonEl.appendChild(div)
    }

    document.querySelector('.card').appendChild(pokemonEl)

  }
  else{
    if(document.querySelector('.poke-info')){
      document.querySelector('.poke-info').remove()
    }
    const poke_info = document.createElement('div')
    poke_info.classList.add('poke-info')

    poke_info.innerHTML = `
      <button class="btn-close" onclick="aaa(this)"></button>
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="" class="poke-img" width="200">
      <div class="poke-data">
        <h2>Pokemon Data</h2>
        <div class="poke-id">National Dex n°: <span>${id}</span> </div>
        <div class="poke-name">Name: <span>${name}</span>  </div>
        <div class="poke-height">Height: <span> ${height/10} m</span></div>
        <div class="poke-weight">Weight: <span>${weight} kg</span> </div>
      </div>
      <div class="poke-stats">
        <h2>Base Stats</h2>
        <div class="row">
          <div class="stats-name">HP</div>
          <div class="stats-base">${pokemon.stats[0].base_stat}</div>
          <div class="stats-bar" style="background-color: ${pintar(pokemon.stats[0].base_stat)};"></div>
          <div class="stats-min">${Math.floor((pokemon.stats[0].base_stat*2 + 141 - 31))}</div>
          <div class="stats-max">${Math.floor((pokemon.stats[0].base_stat*2 + 141 + 63))}</div>
        </div>
        <div class="row">
          <div class="stats-name">Attack</div>
          <div class="stats-base">${pokemon.stats[1].base_stat}</div>
          <div class="stats-bar" style="background-color: ${pintar(pokemon.stats[1].base_stat)};"></div>
          <div class="stats-min">${Math.floor((pokemon.stats[1].base_stat*2 + 5)*0.9)}</div>
          <div class="stats-max">${Math.floor((pokemon.stats[1].base_stat*2 + 36 + 63)*1.1)}</div>
        </div>
        <div class="row">
          <div class="stats-name">Defense</div>
          <div class="stats-base">${pokemon.stats[2].base_stat}</div>
          <div class="stats-bar" style="background-color: ${pintar(pokemon.stats[2].base_stat)};"></div>
          <div class="stats-min">${Math.floor((pokemon.stats[2].base_stat*2 + 5)*0.9)}</div>
          <div class="stats-max">${Math.floor((pokemon.stats[2].base_stat*2 + 36 + 63)*1.1)}</div>
        </div>
        <div class="row">
          <div class="stats-name">Sp. Attack</div>
          <div class="stats-base">${pokemon.stats[3].base_stat}</div>
          <div class="stats-bar" style="background-color: ${pintar(pokemon.stats[3].base_stat)};"></div>
          <div class="stats-min">${Math.floor((pokemon.stats[3].base_stat*2 + 5)*0.9)}</div>
          <div class="stats-max">${Math.floor((pokemon.stats[3].base_stat*2 + 36 + 63)*1.1)}</div>
        </div>
        <div class="row">
          <div class="stats-name">Sp. Defense</div>
          <div class="stats-base">${pokemon.stats[4].base_stat}</div>
          <div class="stats-bar" style="background-color: ${pintar(pokemon.stats[4].base_stat)};"></div>
          <div class="stats-min">${Math.floor((pokemon.stats[4].base_stat*2 + 5)*0.9)}</div>
          <div class="stats-max">${Math.floor((pokemon.stats[4].base_stat*2 + 36 + 63)*1.1)}</div>
        </div>
        <div class="row">
          <div class="stats-name">Speed</div>
          <div class="stats-base">${pokemon.stats[5].base_stat}</div>
          <div class="stats-bar" style="background-color: ${pintar(pokemon.stats[5].base_stat)};"></div>
          <div class="stats-min">${Math.floor((pokemon.stats[5].base_stat*2 + 5)*0.9)}</div>
          <div class="stats-max">${Math.floor((pokemon.stats[5].base_stat*2 + 36 + 63)*1.1)}</div>
        </div>
      </div>
      `

    if(pokemon.types.length == '1'){
      var type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)
      var color1 = colors[pokemon.types[0].type.name]

      const div = document.createElement('div')
      div.setAttribute('class', 'card-type')
      div.innerHTML = `
        Type: <span class="type" style="background-color: ${color1}">${type1}</span>
      `
      

      document.querySelector('body').appendChild(poke_info)
      document.querySelector('.poke-data').appendChild(div)
    }
    else if(pokemon.types.length == '2'){
      var type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)
      var type2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1)
      var color1 = colors[pokemon.types[0].type.name]
      var color2 = colors[pokemon.types[1].type.name]

      const div = document.createElement('div')
      div.setAttribute('class', 'card-type')
      div.innerHTML = `
        Type: <span class="type" style="background-color: ${color1}">${type1}</span>
        <span class="type" style="background-color: ${color2}">${type2}</span>
      `
      
      document.querySelector('body').appendChild(poke_info)
      document.querySelector('.poke-data').appendChild(div)
    }
    
    
  }
}
const colorsBars = ['#f34444', '#ff7f0f', '#ffdd57', '#a0e515', '#23cd5e','#00c2b8' ]

function pintar(a){
  if(a >= 150){
    return '#00c2b8'
  }
  else if( a >= 130 ){
    return '#23cd5e'
  }
  else if( a >= 90){
    return '#a0e515'
  }
  else if( a >= 60){
    return '#ffdd57'
  }
  else if( a >= 30){
    return '#ff7f0f'
  }
  else{
    return '#f34444'
  }
  
}
// FILTRO
// FILTRO
// FILTRO
// FILTRO
// FILTRO

function filter(){
  const filterType = document.querySelector('.filter-type')

  for (let index = 0; index < 18; index++) {
    const btnFilter = document.createElement('button')
    btnFilter.innerText = Object.keys(colors)[index].charAt(0).toUpperCase() + Object.keys(colors)[index].slice(1)
    btnFilter.style.backgroundColor = ""+colors[Object.keys(colors)[index]]
    filterType.appendChild(btnFilter)
  }
}
filter()


const btns = document.querySelectorAll('.filter-type button')

btns.forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    if(document.querySelector('.poke-info')){document.querySelector('.poke-info').remove() }
    
    const typeFilter = e.target.innerText
    const cards =  document.querySelectorAll('.card-type')
    cards.forEach((card)=>{
      card.parentNode.style.display = 'block'
      if(typeFilter == 'Restart'){
        return
      }
      if(!(card.innerText.split(' ')[0] == typeFilter || card.innerText.split(' ')[1] == typeFilter) ){
       card.parentNode.style.display = 'none'
      }
      else{
      }
      
    })
  })
})

var filterActived = false


// DETALHES POKEMON
// DETALHES POKEMON
// DETALHES POKEMON
// DETALHES POKEMON
// DETALHES POKEMON

function seeDetails(e){
  var id = Number(e.children[1].innerText)
  fetchPokemon(id)
}

function aaa(valor){
  valor.parentNode.remove()
}