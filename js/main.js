'use strict';

const dishTitle = document.querySelector('.title--dish');
const shippingCostContainer = document.querySelector('.shipping-cost');
const ingredientsList = document.querySelector('.items-list');
const items = document.getElementsByName('item-selected');
const numItems = document.querySelector('.num-items');
const subtotalContainer = document.querySelector('.subtotal');
const totalContainer = document.querySelector('.total-price');
const totalButton = document.querySelector('.price-button');
let currency;
let shippingCost;
let listHTML = '';
let inputQuantity;
let linePrices;
let totalQuantity;
let price;
let total = 0;


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
  let item = '';
  for (let i = 0; i < ingredients.length; i++) {

    item += buildIngredients(i, ingredients[i]);

    }
    ingredientsList.insertAdjacentHTML('beforeend', item);
    setFunctionsOnchange();

  })
  .catch(function(error){
    console.log(error);
  })

  const buildIngredients = (i, ingredients) =>
    `<li class="item">
    <div class="item--inside">
      <div class="item--input">
        <input type="checkbox" class="input--checkbox input-${i}--checkbox" name="item-selected" value="${ingredients.price}">
        </div>
        <div class="item--input">
          <input type="text" class="input--quantity input-${i}" id="item${i}--quantity" name="input--quantity" value="1">
          </div>
          <div class="item--data">
            <h3 class="title">${ingredients.product}</h3>
            <p class="data">${ ingredients.brand? `Marca: ${ingredients.brand}` : ''}</p>
            <p class="data bold">${ingredients.quantity}</p>
          </div>
          <p class="item--price bold" id="item${i}--price">${ingredients.price}</p>
        </div>
      </li>`;

  function calculatePriceItemSelected (e){
    e.preventDefault();
    const inputQuantityValue = parseInt(e.target.value);
    const valueParent = e.target.parentElement.parentElement;
    const priceContainer = valueParent.children[3];
    price = parseFloat(valueParent.children[0].children[0].value);
    let inputCheck = valueParent.children[0].children[0];
    inputCheck.checked = true;
    const totalItem = (inputQuantityValue * price).toFixed(2);
    priceContainer.innerHTML = totalItem;

    sumItems()
    recalculateTotal();
  }

  function calculatePriceItemChecked (e) {

    items.checked=true;
    const valueParent = e.target.parentElement.parentElement;
    const priceTargetValue = e.target.value;
    const priceContainer = valueParent.children[3];
    let quantity = valueParent.children[1].children[0];
    if (quantity.value == 0) {
      quantity.value = 1;
      quantity.defaultValue = 1;
    }
    else {
      quantity.value = valueParent.children[1].children[0].value;
    }

    const totalItem = (quantity.value * priceTargetValue).toFixed(2);
    priceContainer.innerHTML = totalItem;

    sumItems()
    recalculateTotal();
  }

  function setFunctionsOnchange (i) {
    inputQuantity = document.querySelectorAll('input[type=text]');
    totalQuantity = 0;

    for (var i = 0; i < inputQuantity.length; i++) {
      document.querySelector(`.input-${i}`).addEventListener('change', calculatePriceItemSelected);
      document.querySelector(`.input-${i}--checkbox`).addEventListener('click', calculatePriceItemChecked);

      totalQuantity = inputQuantity[i];
    }
  }

  function sumItems () {
    inputQuantity = document.querySelectorAll('input[type=text]');
    totalQuantity = 0;

    for (var i = 0; i < inputQuantity.length; i++) {
      totalQuantity += parseInt(inputQuantity[i].value);
    }
    numItems.innerHTML = totalQuantity;
  }

  function recalculateTotal () {
    let subtotal = 0;
    linePrices = document.querySelectorAll('.item--price');
    for (var i = 0; i < linePrices.length; i++) {
      subtotal += parseFloat(linePrices[i].innerHTML);
    }
    subtotalContainer.innerHTML = `${subtotal.toFixed(2)} ${currency}`;
    totalContainer.innerHTML = `${(subtotal + shippingCost).toFixed(2)} ${currency}`;
    totalButton.innerHTML = totalContainer.innerHTML;
  }

  function checkAllItems(e){
    e.preventDefault();
    price = document.querySelectorAll('.input--checkbox');
    linePrices = document.querySelectorAll('.item--price');
    inputQuantity = document.querySelectorAll('input[type=text]');
    totalQuantity = 0;

    for (var i = 0; i < linePrices.length; i++) {
      for (var i = 0; i < price.length; i++) {
        linePrices[i].innerHTML = price[i].value;
      }
    }
    for(let i=0; i<items.length; i++){
      items[i].checked=true;
    }
    for (var i = 0; i < inputQuantity.length; i++) {
      inputQuantity[i].defaultValue = 1;
      inputQuantity[i].value = 1;
    }
    numItems.innerHTML = totalQuantity;
    recalculateTotal();
  }

  function uncheckAllItems(e){
    e.preventDefault();
    inputQuantity = document.querySelectorAll('input[type=text]');
    linePrices = document.querySelectorAll('.item--price');
    totalQuantity = 0;

    for(let i=0; i<items.length; i++){
      items[i].checked=false;
    }
    for (var i = 0; i < inputQuantity.length; i++) {
      inputQuantity[i].defaultValue = 0;
      inputQuantity[i].value = 0;
      totalQuantity = 0;
    }
    for (var i = 0; i < linePrices.length; i++) {
      linePrices[i].innerHTML = 0;
    }

    numItems.innerHTML = totalQuantity;
    recalculateTotal();
  }

  document.querySelector('.btn--check-all').addEventListener('click', checkAllItems);
  document.querySelector('.btn--uncheck-all').addEventListener('click', uncheckAllItems);
