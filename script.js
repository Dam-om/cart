if ( document.readyState == "loading"){document.addEventListener("DOMContentLoaded" , ready);}
else{ready();}
function ready(){
let del = document.getElementsByClassName("delbtn");
for (let i = 0; i < del.length; i++) {
  btt = del[i];
  btt.addEventListener("click", deletebtn);
}
let quantity = document.getElementsByClassName("cartqinput");
for (let i = 0; i < quantity.length; i++) {
  quant = quantity[i];
  quant.addEventListener("change", quantityChange);
}
let cartItem = document.getElementsByClassName("cartItems")[0];
let addBtn = document.getElementsByClassName("addItems");
for (let i = 0; i < addBtn.length; i++) {
  addBtt = addBtn[i];
  addBtt.addEventListener("click", addItems);
}
let purchaseBtn = document.getElementsByClassName("purchase")[0];
purchaseBtn.addEventListener("click", purchaseItem);
}
function addItems(event) {
  let addBtt = event.target;
  let items = addBtt.parentElement;
  let names = items.getElementsByClassName("itemName")[0].innerText;
  let image = items.getElementsByClassName("contImg")[0].src;
  let price = items.getElementsByClassName("itemPrice")[0].innerText;
  addItemsCart(names, price, image);
  updateCartTotal();
} 
function addItemsCart(names, price, image) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  cartRow.classList.add("cart-rowa");
  cartRow.innerHTML = `(
      <div class="cartlist cart-c">
        <img src="${image}" class="cartimage" />
        <span class="cartitemname"> ${names}</span>
      </div>
      <span class="cartlist cartp">${price}</span>
      <div class="cartlist cartq">
        <input class="cartqinput" type="number" value="1" />
        <button class="addItem delbtn" type="button">
          REMOVE
        </button>
      </div>
  
  )`;
  let oldRow = document.getElementsByClassName("cartitems")[0];
  let cartName = oldRow.getElementsByClassName("cartitemname");
  for (let i = 0; i < cartName.length; i++) {
    if (cartName[i].innerText == names) {
      alert("Already Selected This Item !!!");
      return;
    }
  }
  oldRow.append(cartRow);
  cartRow
    .getElementsByClassName("delbtn")[0]
    .addEventListener("click", deletebtn);
  cartRow
    .getElementsByClassName("cartqinput")[0]
    .addEventListener("change", quantityChange);
}
function deletebtn(event) {
  let btt = event.target;
  btt.parentElement.parentElement.remove();
  updateCartTotal();
}
let total;
function updateCartTotal() {
  total = 0;
  let cartRow = document.getElementsByClassName("cart-rowa");
  for (let i = 0; i < cartRow.length; i++) {
    let cartRows = cartRow[i];
    let priceElement = cartRows.getElementsByClassName("cartp")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantityElement = cartRows.getElementsByClassName("cartqinput")[0];
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  let totalPrice = document.getElementsByClassName("cartTotalprice")[0];
  totalPrice.innerText = "$" + " " + total;
}
function purchaseItem() {
  if (total == undefined) {
    total = `0`;
  }
  alert(`Purchase Complete 
  Total Price = ${"$" + " " + total}
  `);
  let oldRow = document.getElementsByClassName("cartitems")[0];
  while (oldRow.hasChildNodes()) {
    oldRow.removeChild(oldRow.firstChild);
  }
  updateCartTotal();
}
function quantityChange(event) {
  let quant = event.target;
  let q = quant.value;
  if (q <= 0 || isNaN(q)) {
    quant.value = 1;
  }
  updateCartTotal();
}
