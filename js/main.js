'use strict';
const dishTitle = document.querySelector('.title--dish');
let listHTML = '';
const ingredientsList = document.querySelector('.items-list');


fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
.then(function(response){
  return response.json();
})
.then(function(json) {
  const recipe = json.recipe;
  const ingredients = recipe.ingredients;

  dishTitle.innerHTML = recipe.name;

  for (let i = 0; i < ingredients.length; i++) {

    let item =
      `<li class="item">
        <div class="item--inside">
          <div class="item--input">
            <input type="checkbox" name="item-selected" value="${ingredients[i].price}">
          </div>
          <div class="item--input">
            <input type="text" class="input--quantity" value="">
          </div>
          <div class="item--data">
            <h3 class="title">${ingredients[i].product}</h3>
            <p class="data">${ ingredients[i].brand? `Marca: ${ingredients[i].brand}` : ''}</p>
            <p class="data bold">${ingredients[i].quantity}</p>
          </div>
          <p class="item--price bold">${ingredients[i].price} €</p>
        </div>
      </li>`
    ingredientsList.insertAdjacentHTML('beforeend', item);

    // const itemValue = document.getElementById('item-selected').value;
    // console.log(itemValue);
    // document.getElementById('item-selected').addEventListener('click',sumItemSelected);
  }



})
.catch(function(error){
  console.log(error);
})

function checkAll(e){
  e.preventDefault();
	const items = document.getElementsByName('item-selected');
	for(let i=0; i<items.length; i++){
		if(items[i].type=='checkbox')
		items[i].checked=true;
	}
}

function uncheckAll(e){
  e.preventDefault();
	const items = document.getElementsByName('item-selected');
	for(let i=0; i<items.length; i++){
		if(items[i].type=='checkbox')
		items[i].checked=false;
	}
}

document.querySelector('.check-all').addEventListener('click', checkAll);
document.querySelector('.uncheck-all').addEventListener('click', uncheckAll);
