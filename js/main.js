'use strict';
const dishTitle = document.querySelector('.title--dish');
const shippingCostContainer = document.querySelector('.shipping-cost');
let currency;
let shippingCost;
let listHTML = '';
const ingredientsList = document.querySelector('.items-list');
const subtotalContainer = document.querySelector('.subtotal');
let subtotal = 0;
const totalContainer = document.querySelector('.total-price');
let total = 0;
const totalButton = document.querySelector('.price-button');


fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
.then(function(response){
  return response.json();
})
.then(function(json) {
  const recipe = json.recipe;
  const ingredients = recipe.ingredients;
  currency = recipe.currency;
  shippingCost = parseFloat(recipe['shipping-cost']);

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
          <p class="item--price bold" id="item${i}--price">${ingredients[i].price}</p>
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

function calculatePriceItemSelected (e){

  const inputQuantityValue = parseInt(e.target.value);
  const valueParent = e.target.parentElement.parentElement;
  const priceContainer = valueParent.children[3];
  const price = parseFloat(valueParent.children[3].innerHTML);
  const totalItem = (inputQuantityValue * price).toFixed(2);
  console.log(totalItem);
  priceContainer.innerHTML = totalItem;

  recalculateTotal();
}

function setFunctionOnchange (i) {
  let inputQuantity = document.querySelectorAll('input[type=text]');
  console.log(inputQuantity);
  for (var i = 0; i < inputQuantity.length; i++) {
    document.querySelector(`.input-${i}`).addEventListener('change', calculatePriceItemSelected);
  }
}

function recalculateTotal () {
  let linePrices = document.querySelectorAll('.item--price');
  for (var i = 0; i < linePrices.length; i++) {
    subtotal += parseFloat(linePrices[i].innerHTML);

  }
  subtotalContainer.innerHTML = `${subtotal.toFixed(2)} ${currency}`;
  totalContainer.innerHTML = `${(subtotal + shippingCost).toFixed(2)} ${currency}`;
  totalButton.innerHTML = totalContainer.innerHTML;
}
recalculateTotal();
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
