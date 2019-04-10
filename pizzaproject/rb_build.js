"use strict";

/*
   Filename: rb_build.js
*/



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

/* Object literal that stores the price of the pizza items */
let pizzaPrices = {
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

//Create a shopping cart
let myCart = new cart();

/* Constructor for the class of pizza objects */
function pizza(size, crust, dsauce, dcheese) {
   this.size = size;
   this.crust = crust;
   this.dsauce = dsauce;
   this.dcheese = dcheese;
   this.topping = []
}

/* Method to add a topping to a pizza */
pizza.prototype.addTopping = function (topping) {
   this.toppings.push(topping);
};

/* Method to calculate the cost of a pizza item */
pizza.prototype.calcPizzaPrice = function () {

   if (this.size === "12") { this.price = pizzaPrices.size12; }
   else if (this.size === "14") { this.price = pizzaPrices.size14; }
   else if (this.size === "16") { this.price = pizzaPrices.size16; }

   if (this.crust === "stuffed") { this.price += pizzaPrices.stuffed; }
   else if (this.crust === "thin") { this.price += pizzaPrices.thin }
   else if (this.crust === "pan") { this.price += pizzaPrices.pan; }
   else if (this.crust === "thick") { this.price += pizzaPrices.thick; }

   if (this.dsauce) { this.price += pizzaPrices.dsauce; }
   if (this.dcheese) { this.price += pizzaPrices.dcheese; }

   for (let i = 0; i < this.toppings.length; i++) {
      this.price += (this.toppings[i].qty * pizzaPrices.topping);
   }

   return this.price;
};

/* Constructor for the class of cart objects */
function cart() {
   this.totalCost = 0;
   this.items = [];
}
/* Method to return the total cost of the items in the cart */
cart.prototype.calcCartTotal = function () {
   let cartTotal = 0;
   this.items.forEach(function (item) {
      cartTotal += item.calcItemCost;
   });
   this.totalCost = cartTotal;
   return this.totalCost;
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
         cart.items.splice(this, 1);
         break;
      }
   }
};

/* Constructor for the class of pizza toppings */
function topping(name, side) {
   this.name = name;
   this.side = side;
}


// Function to build the pizza, acquires the selected values from the user
function buildPizza(newPizza) {
   newPizza.qty = pizzaQuantityBox.value;
   newPizza.size = pizzaSizeBox.selectedValue;
   newPizza.crust = pizzaCrustBox.selectedValue;
   newPizza.dsauce = pizzaDoubleSauceBox.selectedValue;
   newPizza.dcheese = pizzaDoubleCheeseBox.selectedValue;

   let checkedToppings = document.querySelectorAll("input.topping:checked");
   for (let i = 0; i < checkedToppings.length; i++) {
      if (checkedToppings[i].value !== "none") {
         let myTopping = new topping();
         myTopping.name = checkedToppings[i].parentNode.firstChild.value;
         myTopping.side = checkedToppings[i].value;

         if (checkedToppings[i].value === "full") {
            //   x = 1;
         }
         else {
            //    x = 0.5;
         }
         newPizza.topping.push(myTopping);
      }

   }

}


/* Pizza and topping inherit from the item class */
pizza.prototype = new cartItem();
topping.prototype = new cartItem();

// Event handlers to draw the pizza image
pizzaSizeBox.onchange = drawPizza;
pizzaCrustBox.onchange = drawPizza;
pizzaDoubleSauceBox.onclick = drawPizza;
pizzaDoubleCheeseBox.onclick = drawPizza;
pizzaQuantityBox.onchange = drawPizza;
for (let i = 0; i < toppingOptions.length; i++) {
   toppingOptions[i].onclick = drawPizza;
}

addToCartButton.onclick = addPizzaToCart;

// Function to add the built pizza to the shopping cart
function addPizzaToCart() {
   let myPizza = new pizza();
   buildPizza(myPizza);
   myPizza.addToCart(myCart);

   let newItemRow = document.createElement("tr");
   cartTableBody.appendChild(newItemRow);

   let summaryCell = document.createElement("td");
   summaryCell.textContent = pizzaSummary.textContent;
   newItemRow.appendChild(summaryCell);

   let qtyCell = document.createElement("td");
   qtyCell.textContent = myPizza.qty;
   newItemRow.appendChild(qtyCell);

   let priceCell = document.createElement("td");
   priceCell.textContent = 4;

   newItemRow.append(priceCell);

   let removeCell = document.createElement("td");
   let removeButton = document.createElement("input");
   removeButton.value = "X";
   removeButton.type = "button";
   removeCell.textContent = removeButton;
   newItemRow.append(removeCell);

   cartTotalBox.value = myCart.calcCartTotal;

   console.log(myCart);

   removeButton.onclick = function () {
      myPizza.removeFromCart(myCart);
      cartTableBody.removeChild(newItemRow);
      cartTotalBox.value = myCart.calcCartTotal;
      console.log(myCart);
   };

   resetDrawPizza();
}

function drawPizza() {
   pizzaPreviewBox.removeChildren;
   let pizzaDescription = "";

   pizzaDescription += pizzaSizeBox.selectedValue() + '" pizza ';
   pizzaDescription += pizzaCrustBox.selectedValue() + ", ";
   if (pizzaDoubleSauceBox.checked) {
      let sauceImg = document.createElement("img");
      sauceImg.src = "rb_doublesauce.png";
      pizzaPreviewBox.appendChild(sauceImg);
      pizzaDescription += "double sauce, ";
   }
   if (pizzaDoubleCheeseBox.checked) {
      let cheeseImg = document.createElement("img");
      cheeseImg.src = "rb_doublecheese.png";
      pizzaPreviewBox.appendChild(cheeseImg);
      pizzaDescription += "double cheese, ";

   }

   let checkedToppings = document.querySelectorAll("input.topping:checked");
   for (let i = 0; i < checkedToppings.length; i++) {
      let toppingImage = document.createElement('img');
      let removableNode = document.getElementById("" + checkedToppings[i].name + "Preview");
      if (checkedToppings[i].value !== "none") {
         console.log("hello");
         pizzaDescription += checkedToppings[i].name + "(" + checkedToppings[i].value + "), ";
         toppingImage.id = "" + checkedToppings[i].name + "Preview";
         toppingImage.src = "./rb_" + checkedToppings[i].name + ".png";

         if (removableNode)
            pizzaPreviewBox.removeChild(removableNode);

         pizzaPreviewBox.appendChild(toppingImage);


         if (checkedToppings[i].value === "left") {
            toppingImage.style.clip = "rect(0px, 150px, 300px, 0px)";
         }
         else if (checkedToppings[i].value === "right") {
            toppingImage.style.clip = "rect(0px, 300px, 300px, 150px)";
         }
      }
      else {
         if (removableNode)
            pizzaPreviewBox.removeChild(removableNode);
      }


      pizzaSummary.textContent = pizzaDescription;
   }
}

// Function to reset the pizza drawing 
function resetDrawPizza() {
   // Object collection of all topping option buttons with a value of 'none'
   var noTopping = document.querySelectorAll("input.topping[value='none']");

   pizzaSizeBox.selectedIndex = 0;
   pizzaCrustBox.selectedIndex = 0;
   pizzaDoubleSauceBox.checked = false;
   pizzaDoubleCheeseBox.checked = false;

   for (var i = 0; i < noTopping.length; i++) {
      noTopping[i].checked = false;
   }
   pizzaSummary.textContent = "";
   pizzaPreviewBox.removeChildren;
   pizzaQuantityBox.selectedIndex = 0;
}


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
