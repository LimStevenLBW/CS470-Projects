//Self Invoking Function
(function main(){ 
   setupCart();
})();

/*
   setupCart() 
   Sets up the event handlers for the add to order buttons on the web page.
*/    
function setupCart(){
   let items = document.getElementById("items");
   items.addEventListener('click', function (e) {
      if (e.target.nodeName.toLowerCase() == 'input') {
         addItem(e);
      }
  });
}
/*
   Adds the food item associated with the add to order button to the shopping
   cart, tracking of the number of items of each product ordered by the customer.
*/
function addItem(e){
   let counter = 1;
   let order = e.target.nextElementSibling.cloneNode(true); 
   let orderID = order.id;

   //Check for duplicates, if the orderID already exists in the aside
   if(document.querySelector("#cart #" + orderID)){
      //Retrieve the counter amount and increment
      counter = document.querySelector("#" + orderID + " span").innerHTML;
      counter++;
      document.querySelector("#" + orderID + " span").innerHTML = counter;
   }
   else{
      //Add the item as normal
      order.innerHTML += ("<span>" + counter + "</span>");
      document.getElementById("cart").append(order);
   }

}


