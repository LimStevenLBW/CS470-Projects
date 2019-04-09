"use strict";

/*
   Filename: rb_build.js
*/

//Self Invoking Function on WINDOW LOAD

(function() {
/**DOM ELEMENT ASSIGNMENTS */
   // Preview image of the pizza 
   let pizzaPreviewBox = document.getElementById("previewBox"); 
   // Summary of the pizza order
   let pizzaSummary =  document.getElementById("pizzaSummary");
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

   let myPizza = {};
   let myCart = {};

   /* Object literal that stores the price of the pizza items */
   let pizzaPrices = {
      size12 : 11,
      size14 : 13,
      size16 : 16,
      thin : 0,
      thick : 0,
      stuffed : 3,
      pan : 2,
      dsauce : 1.5,
      dcheese : 1.5,
      topping: 1.5,
   };

   /* Pizza and topping inherit from the item class */

   pizza.prototype = new cartItem();
   topping.prototype = new cartItem();

  

   cart = {

   };
   
 })();

/* Constructor for the class of pizza objects */
function pizza(size, crust, dsauce, dcheese) {
   this.size = size;
   this.crust = crust;
   this.dsauce = dsauce;   
   this.dcheese = dcheese;
   this.topping = []
}
/* Method to assemble a description based on the properties of the pizza obj */
pizza.prototype.summary = function(){

}
/* Method to add a topping to a pizza */
pizza.prototype.addTopping = function(topping) {
   this.toppings.push(topping);
};
/* Method to calculate the cost of a pizza item */
pizza.prototype.calcPizzaPrice = function() {

   if (this.size === "12")    {      this.price = pizzaPrices.size12;   }
   else if(this.size === "14"){      this.price = pizzaPrices.size14;   }
   else if(this.size === "16"){      this.price = pizzaPrices.size16;   }

   if (this.crust === "stuffed")  {      this.price += pizzaPrices.stuffed;  } 
   else if (this.crust === "thin"){      this.price += pizzaPrices.thin      }
   else if (this.crust === "pan") {      this.price += pizzaPrices.pan;      } 
   else if (this.crust === "thick"){     this.price += pizzaPrices.thick;    }

   if (this.dsauce) {   this.price += pizzaPrices.dsauce;   }  
   if (this.dcheese) {  this.price += pizzaPrices.dcheese;  }

   for (let i = 0; i < this.toppings.length; i++) {
      this.price += (this.toppings[i].qty*pizzaPrices.topping);
   }
   
   return this.price;
};

/* Constructor for the class of cart objects */
function cart() {
   this.totalCost = 0;
   this.items = [];
}
/* Method to return the total cost of the items in the cart */
cart.prototype.calcCartTotal = function() {
   let cartTotal = 0;
   this.items.forEach(function(item) {
      cartTotal += item.calcItemCost;
   });
   this.totalCost = cartTotal;
   return this.totalCost;
};

/* Constructor for individual food items */
function cartItem() {
   this.price;
   this.qty;
}
/* Calculate the cost of each item ordered */
cartItem.prototype.calcItemCost = function() {
   return this.price*this.qty;
};
/* Add the food item to a cart */
cartItem.prototype.addToCart = function(cart) {
   cart.items.push(this);
};
/* Remove a food item from a cart */
cartItem.prototype.removeFromCart = function(cart) {
   for (let i = 0; i < cart.items.length; i++) {
      if (this === cart.items[i]) {
         cart.items.splice(this, 1);
         break;
      }
   }
};

/* Constructor for the class of pizza toppings */
function topping() {
   this.name;
   this.side;
}

/*
//Store the prices of the pizza items
pizzaPrice = {
	size12 = 11;
	size14 = 13;
	.
	.
	.
	topping = 1.5;
}

//Constructor function for the class of cart objects

function cart(){
	this.totalCost = 0;
	this.items = [];
}

//Constructor function for individual food items

function foodItem(){
	this.price;
	this.qty;
}

//Method to calculate the cost of each item ordered

foodItem.prototype.calcItemCost = function()
{
	price * qty
}

//Method to return the cost of the item in the cart

cart.prototype.calcCartTotal = function(){
	this.items For Each(function(item)
	cartTotal += item.calcItemCost();
	return this.cartTotal;
}

//Add the food item to the cart
foodItem.addToCart = function(cart){
	cart.items.oush(this);
}

//Remove a food item from the cart
foodItemRemoveFromTheCart = function(cart){
	carts.items[i] == this;
	cart.items.splice(i,1);
}

//Constructor to create a pizza object
function pizza(){
		size
		crust
		doubleSauce
		doubleCheese
		toppings = []
}

//Constructor to create a topping object
function topping(){
	this.name;
	this.side;
}

//foodItem toppings/pizza

pizza.prototype = new foodItem();
topping.prototype = new topping();


//Method to add topping to a pizza
pizza.addTopping = t(topping)
toppings.push(topping);

//Method to calculate the price of a pizza
pizza.calcPizzaPrice = function(){
	size
	crust
	doubleCheese
	doubleSauce
	toppings(qty)
}

window.addEventListener("load", function()
	var pizzaPreviewBox = document.getElementById("previewBox");
	cartTableBody = document.querySelector("table #cartTable tbody")
	
//Create the event handler to draw the pizza image
	pizzaSizeBox.onChange = drawPizza
	toppingOption[i].onclick = drawPizza;

//Create a shopping cart
	var myCart = new cart();
	addToCartButton.onclick = addPizzaToCart;
	
/Create a function to build a pizza
function buildPizza(newPizza){
	newPizza.qty = ?
	newPizza.size;
	toppings = ?
	
//Add the built pizza to the cart
	addPizzaToCart{
		myPizza = new pizza();
		buildPizza(myPizza);
		myPizza.addToCart(myCart);
		
//Create the shopping cart table


//Function Reset Draw Pizza
	delete method for pizza
	call drawPizza again to redraw item

*/


/*-------------------- Custom Methods --------------------*/

/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function() {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }   
};

/* Method added to the select element to return the value of the selected option */
HTMLSelectElement.prototype.selectedValue = function() {
   var sIndex = this.selectedIndex;
   return this.options[sIndex].value;
};

