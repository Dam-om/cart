if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  let delbtn = document.getElementsByClassName("delbtn");
  for (let i = 0; i < delbtn.length; i++) {
    let btn = delbtn[i];
    btn.addEventListener("click", removeitem);
  }
  let quantityChange = document.getElementsByClassName("cartqinput");
  for (let i = 0; i < quantityChange.length; i++) {
    let quantityC = quantityChange[i];
    quantityC.addEventListener("change", changeQuantity);
  }
  let addItem = document.getElementsByClassName("addItems");
  for (let i = 0; i < addItem.length; i++) {
    addItems = addItem[i];
    addItems.addEventListener("click", addCartItem);
  }
  let pBtn = document.getElementsByClassName("purchase")[0];
  pBtn.addEventListener("click", purchase);
}

function removeitem(event) {
  let btnclick = event.target;
  btnclick.parentElement.parentElement.remove();
  updateCartTotal();
}
function addCartItem(event) {
  let button = event.target;
  let buttonClk = button.parentElement;
  let image = buttonClk.getElementsByClassName("contImg")[0].src;
  let names = buttonClk.getElementsByClassName("itemName")[0].innerText;
  let price = buttonClk.getElementsByClassName("itemPrice")[0].innerText;
  addToCart(names, price, image);
  updateCartTotal();
}
function addToCart(names, price, image) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-rowa");
  cartRow.classList.add("cart-row");
  let cartItem = document.getElementsByClassName("cartitems")[0];
  let cartOnly = cartItem.getElementsByClassName("cartitemname");
  for (let i = 0; i < cartOnly.length; i++) {
    if (cartOnly[i].innerText === names) {
      alert("You Have Already Selected This Item");
      return;
    }
  }
  cartRowContent = ` 
          <div class="cartlist cart-c">
            <img src="${image}" class="cartimage" />
            <span class="cartitemname">${names}</span>
          </div>
          <span class="cartlist cartp">${price}</span>
          <div class="cartlist cartq">
            <input class="cartqinput" type="number" value="1" />
            <button class="addItem delbtn" type="button">REMOVE</button>
          </div>
        </div>`;
  cartRow.innerHTML = cartRowContent;

  cartItem.append(cartRow);
  let btt = document.getElementsByClassName("delbtn");
  for (let i = 0; i < btt.length; i++) {
    let bbt = btt[i];
    bbt.addEventListener("click", removeitem);
  }
  let x = document.getElementsByClassName("cartqinput");
  for (let i = 0; i < x.length; i++) {
    let y = x[i];
    y.addEventListener("change", changeQuantity);
  }
}
function changeQuantity(event) {
  let cQ = event.target;
  if (isNaN(cQ.value) || cQ.value <= 0) {
    cQ.value = 1;
  }
  updateCartTotal();
}
function updateCartTotal() {
  let cartRows = document.getElementsByClassName("cart-rowa");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cartp")[0];
    let quantityElement = cartRow.getElementsByClassName("cartqinput")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cartTotalprice")[0].innerText = "$" + total;
}
function purchase() {
  alert("Thanks for your Patronage");
  let cI = document.getElementsByClassName("cartitems")[0];
  while (cI.hasChildNodes()) {
    cI.removeChild(cI.firstChild);
  }
  updateCartTotal();
}
