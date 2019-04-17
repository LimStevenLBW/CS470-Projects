"use strict";

/*
   Steven Lim and Brian Ashley
   Filename: rb_build.js
*/

   /* Object literal that stores the price of the pizza items */
   const pizzaPrices = {
      size12: 11,
      size14: 13,
      size16: 16,
      thin: 0,
      thick: 0,
      stuffed: 3,
      pan: 2,
      dsauce: 1.5,
      dcheese: 1.5,
      topping: 1.5,
   };


/* Constructor for individual food items */
function cartItem(qty, price) {
   this.qty = qty;
   this.price = price;
}
/* Calculate the cost of each item ordered */
cartItem.prototype.calcItemCost = function () {
   return this.price * this.qty;
};
/* Add the food item to a cart */
cartItem.prototype.addToCart = function (cart) {
   cart.items.push(this);
};
/* Remove a food item from a cart */
cartItem.prototype.removeFromCart = function (cart) {
   for (let i = 0; i < cart.items.length; i++) {
      if (this === cart.items[i]) {
         cart.items.splice(i, 1);
         break;
      }
   }
};

/* Constructor for the class of pizza objects */
function pizza(size, crust, dsauce, dcheese) {
   this.size = size;
   this.crust = crust;
   this.dsauce = dsauce;
   this.dcheese = dcheese;
   this.topping = []
}
/* Pizza and topping inherit from the item class */
pizza.prototype = new cartItem();

/* Method to add a topping to a pizza */
pizza.prototype.addTopping = function (topping) {
   this.topping.push(topping);
};

/* Method to calculate the cost of a pizza item */
pizza.prototype.calcPizzaPrice = function () {

   if (this.size === "12") { this.price = pizzaPrices.size12; }
   else if (this.size === "14") { this.price = pizzaPrices.size14; }
   else if (this.size === "16") { this.price = pizzaPrices.size16; }
 
   if (this.crust === "stuffed") { this.price += pizzaPrices.stuffed; }
   else if (this.crust === "thin") { this.price += pizzaPrices.thin; }
   else if (this.crust === "pan") { this.price += pizzaPrices.pan; }
   else if (this.crust === "thick") { this.price += pizzaPrices.thick; }
  
   if (this.dsauce) { this.price += pizzaPrices.dsauce; }
   if (this.dcheese) { this.price += pizzaPrices.dcheese; }

   for (let i = 0; i < this.topping.length; i++) {
      this.price += (this.topping[i].qty * pizzaPrices.topping);
   }
   return this.price*this.qty;
};

/* Constructor for the class of cart objects */
function cart() {
   this.totalCost = 0;
   this.items = [];
}
/* Method to return the total cost of the items in the cart */
cart.prototype.calcCartTotal = function () {
   let cartTotal = 0;
   //Iterate through the items in the cart, adding their price to the toal
   this.items.forEach(function (item) {
      cartTotal += item.calcItemCost();

   });
   this.totalCost = cartTotal;
   return this.totalCost;
};


/* Constructor for the class of pizza toppings */
function topping(name, side) {
   this.name = name;
   this.side = side;
}
topping.prototype = new cartItem();

window.addEventListener("load", function() {
   /**DOM ELEMENT ASSIGNMENTS */

   // Preview image of the pizza 
   let pizzaPreviewBox = document.getElementById("previewBox");
   // Summary of the pizza order
   let pizzaSummary = document.getElementById("pizzaSummary");
   // Pizza size selection list
   let pizzaSizeBox = document.getElementById("pizzaSize");
   // Pizza crust selection list
   let pizzaCrustBox = document.getElementById("pizzaCrust");
   // Pizza double sauce checkbox
   let pizzaDoubleSauceBox = document.getElementById("doubleSauce");
   // Pizza double cheese checkbox
   let pizzaDoubleCheeseBox = document.getElementById("doubleCheese");
   // Pizza topping option buttons
   let toppingOptions = document.getElementsByClassName("topping");
   // Pizza quantity selection list
   let pizzaQuantityBox = document.getElementById("pizzaQuantity");
   // Add to cart button
   let addToCartButton = document.getElementById("addToCart");
   // Order table displaying the items in the shopping cart
   let cartTableBody = document.getElementById("cartTable");
   // Shopping cart total box
   let cartTotalBox = document.getElementById("cartTotal");

   //Create a shopping cart
   let myCart = new cart();

   // Event handlers to draw the pizza image, assign to the drawPizza function obj
   pizzaSizeBox.onchange = drawPizza;
   pizzaCrustBox.onchange = drawPizza;
   pizzaDoubleSauceBox.onclick = drawPizza;
   pizzaDoubleCheeseBox.onclick = drawPizza;
   pizzaQuantityBox.onchange = drawPizza;
   for (let i = 0; i < toppingOptions.length; i++) {
      toppingOptions[i].onclick = drawPizza;
   }
   //Assign the addPizzaToCart function obj to the add to cart button
   addToCartButton.onclick = addPizzaToCart;

   // Function to build the pizza, acquires the selected values from the user
   function buildPizza(newPizza) {
      newPizza.qty = pizzaQuantityBox.value;
      newPizza.size = pizzaSizeBox.value;
      newPizza.crust = pizzaCrustBox.value;
      newPizza.dsauce = pizzaDoubleSauceBox.checked;
      newPizza.dcheese = pizzaDoubleCheeseBox.checked;
      //Fill the pizza's list of toppings
      let checkedToppings = document.querySelectorAll("input.topping:checked");
      for (let i = 0; i < checkedToppings.length; i++) {
         if (checkedToppings[i].value !== "none") {
            let myTopping = new topping();
            myTopping.name = checkedToppings[i].name;
            myTopping.side = checkedToppings[i].value;
            //The price of toppings are halved when only added to one side
            if (checkedToppings[i].value === "full") {
               myTopping.qty = 1;
            }
            else {
               myTopping.qty = 0.5;
            }
            newPizza.topping.push(myTopping);
         }
      }
   }

   // Function to add the built pizza to the shopping cart
   function addPizzaToCart() {
      //Create a new pizza, initialize its variables, and then add it to the cart
      let myPizza = new pizza();
      buildPizza(myPizza);
      myPizza.addToCart(myCart);
      //Begin assembling a table element for the new item
      let newItemRow = document.createElement("tr");
      cartTableBody.appendChild(newItemRow);

      let summaryCell = document.createElement("td");
      summaryCell.textContent = pizzaSummary.textContent;
      newItemRow.appendChild(summaryCell);

      let qtyCell = document.createElement("td");
      qtyCell.textContent = myPizza.qty;
      newItemRow.appendChild(qtyCell);
      //Calculate the price and display
      let priceCell = document.createElement("td");
      priceCell.textContent = myPizza.calcPizzaPrice().toLocaleString('en-US', {style: "currency", currency: "USD"});

      newItemRow.append(priceCell);
      //Create a remove button
      let removeCell = document.createElement("td");
      let removeButton = document.createElement("input");
      removeButton.value = "X";
      removeButton.type = "button";
      removeCell.append(removeButton);
      newItemRow.append(removeCell);
      //Calculate the total value
      cartTotalBox.value = myCart.calcCartTotal().toLocaleString('en-US', {style: "currency", currency: "USD"});
      //Assign the anonymous function for removing an item
      removeButton.onclick = function () {
         myPizza.removeFromCart(myCart);
         cartTableBody.removeChild(newItemRow);
         cartTotalBox.value = myCart.calcCartTotal().toLocaleString('en-US', {style: "currency", currency: "USD"});
      };

      resetDrawPizza();
   }

   //Draws toppings and additives to the pizza preview image
   function drawPizza() {
      pizzaPreviewBox.removeChildren;
      let pizzaDescription = "";
      pizzaDescription += pizzaSizeBox.selectedValue() + '" pizza, ';
      pizzaDescription += pizzaCrustBox.selectedValue();

      let sauceImg = document.createElement("img");
      let cheeseImg = document.createElement("img");
      let doubleSauceElement = document.getElementById("doubleSaucePreview");
      let doubleCheeseElement = document.getElementById("doubleCheesePreview");
      //Handles Cheese and Sauce options, allowing it to be displayed and also removing it when the option is unchecked
      if (pizzaDoubleSauceBox.checked) {
         //Only append if the image isn't there
         if(!doubleSauceElement){
            sauceImg.id = "doubleSaucePreview";
            sauceImg.src = "rb_doublesauce.png";
            pizzaPreviewBox.appendChild(sauceImg);
         }
         //Add description regardless whenever checked
         pizzaDescription += ", double sauce";
      }
      else if(!pizzaDoubleSauceBox.checked && doubleSauceElement){
         pizzaPreviewBox.removeChild(doubleSauceElement);
      }

      if (pizzaDoubleCheeseBox.checked) {
         if(!doubleCheeseElement){
            cheeseImg.id = "doubleCheesePreview";
            cheeseImg.src = "rb_doublecheese.png";
            pizzaPreviewBox.appendChild(cheeseImg);
         }
         pizzaDescription += ", double cheese";
      }
      else if (!pizzaDoubleCheeseBox.checked && doubleCheeseElement){
         pizzaPreviewBox.removeChild(doubleCheeseElement);
      }
      //Handles toppings display and removal
      let checkedToppings = document.querySelectorAll("input.topping:checked");
      for (let i = 0; i < checkedToppings.length; i++) {
         let toppingImage = document.createElement('img');
         let removableNode = document.getElementById("" + checkedToppings[i].name + "Preview");
         if (checkedToppings[i].value !== "none") {

            pizzaDescription += ", " + checkedToppings[i].name + "(" + checkedToppings[i].value + ")";
            toppingImage.id = checkedToppings[i].name + "Preview";
            toppingImage.src = "./rb_" + checkedToppings[i].name + ".png";
            //If the item already exists, remove it
            if (removableNode)
               pizzaPreviewBox.removeChild(removableNode);
            //Create the image
            pizzaPreviewBox.appendChild(toppingImage);
         
            //Clip it on either the left or right depending on the value
            if (checkedToppings[i].value === "left") {
               toppingImage.style.clip = "rect(0px, 150px, 300px, 0px)";
            }
            else if (checkedToppings[i].value === "right") {
               toppingImage.style.clip = "rect(0px, 300px, 300px, 150px)";
            }
         }
         else if (removableNode){
               pizzaPreviewBox.removeChild(removableNode);
         }

         //Update the summary
         pizzaSummary.textContent = pizzaDescription;
      }
   }

   // Function to reset the pizza drawing 
   function resetDrawPizza() {
      // Object collection of all topping option buttons with a value of 'none'
      let noTopping = document.querySelectorAll("input.topping[value='none']");
      pizzaSizeBox.selectedIndex = 1;
      pizzaCrustBox.selectedIndex = 0;
      pizzaDoubleSauceBox.checked = false;
      pizzaDoubleCheeseBox.checked = false;

      for (let i = 0; i < noTopping.length; i++) {
         noTopping[i].checked = true;
      }
      pizzaSummary.textContent = "";
      pizzaPreviewBox.removeChildren();
      drawPizza();
      pizzaQuantityBox.selectedIndex = 0;
   }
});

/*-------------------- Custom Methods --------------------*/

/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function () {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }
};

/* Method added to the select element to return the value of the selected option */
HTMLSelectElement.prototype.selectedValue = function () {
   var sIndex = this.selectedIndex;
   return this.options[sIndex].value;
};