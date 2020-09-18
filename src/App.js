import React from "react";
import Header from "./components/header";
import Pokedex from "./components/pokedex";
import PokemonComparison from "./components/comparison";


function App() {

  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) { 
      yield i;
    }
  };
  
  let range = [...generateSequence(1,15)];
  
  [].forEach.call(range, (pokemon) => {
    const pokemon_api = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
          
    async function requestPokemons() {
      const response = await fetch(pokemon_api);
      const data = await response.json();
       
      console.log(data);
      renderPokemonCard.call(data);
    }
    requestPokemons();
  });

  function renderPokemonCard() {
    const pokemonsList = document.getElementsByClassName("pokedex")[0];
    const pokemonComparison = document.getElementsByClassName("pokemon-comparison")[0];
    const comparisonCounter = document.getElementsByClassName("comparison-counter")[0];
    const comparisonArr = [];
    
    pokemonsList.innerHTML += `<div class="pokemon-card">
                                <div class="pokemon-img" style="background: url(${this.sprites.other.dream_world.front_default}) no-repeat center;"></div>
                                <div class="pokemon-data">
                                  <p> <b>Name:</b> ${this.name} </p>
                                  <p> <b>Type:</b> ${this.types[0].type.name} </p>
                                  <p> <b>Height:</b> ${this.height} </p> 
                                  <p> <b>Weight:</b> ${this.weight} </p>
                                  <p> <b>HP:</b> ${this.stats[0].base_stat} </p>
                                  <p> <b>Defense:</b> ${this.stats[1].base_stat} </p>
                                  <p> <b>Speed:</b> ${this.stats[5].base_stat} </p>
                                </div>
                                <button class="comparison-btn">+</button>
                                <button class="comparison-btn-remove hidden">-</i></button>
                              </div>`;
      
    const comparisonBtnAdd = document.querySelectorAll(".comparison-btn");
    const comparisonBtnRemove = document.querySelectorAll(".comparison-btn-remove");
    const showHideBtn = document.getElementsByClassName("show-hide-btn")[0];
      
    function toggleCardState(appendBlock, oppositeBtn, display) {
      
      Array.from(this).forEach((item, i, arr) => {
        this[i].addEventListener("click", () => {
          
          appendBlock.appendChild(this[i].parentElement);
          oppositeBtn[i].classList.remove("hidden");
          this[i].classList.add("hidden");

          if (this === comparisonBtnAdd) {
            this[i].parentElement.style.display = `inline-${display}`;
            comparisonArr.push(this[i].parentElement);
          } else {
            comparisonArr.pop(this[i].parentElement);
          }
          comparisonCounter.innerHTML = comparisonArr.length;
        });
      });
    };
    
    toggleCardState.apply(comparisonBtnAdd, [pokemonComparison, comparisonBtnRemove, "block"]);
    toggleCardState.apply(comparisonBtnRemove, [pokemonsList, comparisonBtnAdd, "flex"]);

    showHideBtn.addEventListener("click", () => {
      pokemonsList.classList.toggle("pokedex-hidden");       
    });
  };
   
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Pokedex />
        <PokemonComparison />
      </div>  
    </div>
  )
}

export default App;
