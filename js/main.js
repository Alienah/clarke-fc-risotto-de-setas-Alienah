'use strict';
const dishTitle = document.querySelector('.title--dish');
const shippingCostContainer = document.querySelector('.shipping-cost');
let listHTML = '';
const ingredientsList = document.querySelector('.items-list');


fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
.then(function(response){
  return response.json();
})
.then(function(json) {
  const recipe = json.recipe;
  const ingredients = recipe.ingredients;
  const currency = recipe.currency;
  const shippingCost = parseFloat(recipe['shipping-cost']);

  dishTitle.innerHTML = recipe.name;
  shippingCostContainer.innerHTML = `${shippingCost.toFixed(2)}  ${currency}`;



  for (let i = 0; i < ingredients.length; i++) {

    let item =
      `<li class="item">
        <div class="item--inside">
          <div class="item--input">
            <input type="checkbox" name="item-selected" value="${ingredients[i].price}">
          </div>
          <div class="item--input">
            <input type="text" class="input--quantity input-${i}" id="item${i}--quantity" name="input--quantity" value="1">
          </div>
          <div class="item--data">
            <h3 class="title">${ingredients[i].product}</h3>
            <p class="data">${ ingredients[i].brand? `Marca: ${ingredients[i].brand}` : ''}</p>
            <p class="data bold">${ingredients[i].quantity}</p>
          </div>
          <p class="item--price bold" id="item${i}--price">${ingredients[i].price} €</p>
        </div>
      </li>`
    ingredientsList.insertAdjacentHTML('beforeend', item);


    // const itemValue = document.getElementById('item-selected').value;
    // console.log(itemValue);
    // document.getElementById('item-selected').addEventListener('click',sumItemSelected);
  }

  setFunctionOnchange();

})
.catch(function(error){
  console.log(error);
})

// function calculateValueItem (e){
//
//   const inputQuantityValue = e.target.value;
//   const idInput = e.target.getAttribute('id');
//   // const price = document.getElementById(`item${i}--price`);
//   // const totalItem = inputQuantityValue * price;
//   console.log(idInput);
// }
//
// function setFunctionOnchange (i) {
// let inputQuantity = document.querySelectorAll('input[type=text]');
// console.log(inputQuantity);
// for (var i = 0; i < inputQuantity.length; i++) {
//
//   document.querySelector(`.input-${i}`).addEventListener('change', calculateValueItem);
// }
// }

function checkAllItems(e){
  e.preventDefault();
	const items = document.getElementsByName('item-selected');
	for(let i=0; i<items.length; i++){
		items[i].checked=true;
	}
}

function uncheckAllItems(e){
  e.preventDefault();
	const items = document.getElementsByName('item-selected');
	for(let i=0; i<items.length; i++){
		items[i].checked=false;
	}
}

document.querySelector('.btn--check-all').addEventListener('click', checkAllItems);
document.querySelector('.btn--uncheck-all').addEventListener('click', uncheckAllItems);
