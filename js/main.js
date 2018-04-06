'use strict';
var dishTitle = document.querySelector('.title--dish');

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
.then(function(response){
  return response.json();
})
.then(function(json) {
  var recipe = json.recipe;
  dishTitle.innerHTML = recipe.name;
})
