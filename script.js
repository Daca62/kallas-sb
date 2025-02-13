const cartIcon = document.querySelector("#btn-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const company = document.querySelector("#firm-input");

let list = [];
let inputQuantity;

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //Remove item from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("clicked", removeCartItem);
  }

  //Change quantity in cart
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChange);
  }

  //Add item to cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartCLicked);
  }

  document
    .getElementsByClassName("btn-order")[0]
    .addEventListener("click", orderButtonClicked);
}

//Order function
function orderButtonClicked() {
  console.log("list", list);
  let inputQuantity = document.querySelector("#input-quantity");

  // alert("Your Order is Placed.");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  console.log("list", list);
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  submitProduct(list);
  updateTotal();
  list = [];
}

//Remove item from cart
function removeCartItem(e) {
  let buttonClicked = e.target.parentElement;
  details = buttonClicked.querySelector(".detail-box");
  let productTitle = details.children[0].innerText;
  list = list.filter((item) => item.title !== productTitle);
  console.log(list);
  buttonClicked.remove();

  updateTotal();
}

//Change quantity
function quantityChange(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Add item to Cart
function addCartCLicked(e) {
  let button = e.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  let quantity = 1;

  addProductToCart(title, price, productImg, quantity);
  updateTotal();
}

function addProductToCart(title, price, productImg, quantity) {
  let singleProduct = {
    title,
    price: parseInt(price.replace(/[^\d.-]/g, ""), 10),
    quantity: +quantity,
  };

  let matchFound = list.some((obj) => {
    if (obj.title === singleProduct.title) {
      //obj.quantity++;
      return true;
    }
    return false;
  });

  if (!matchFound) {
    list.push(singleProduct);
  }

  console.log("list", list);

  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = document.getElementsByClassName("cart-product-title");

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      console.log(title);

      alert("Item is already in the cart.");
      return;
    }
  }

  let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title" data-title="${title}">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="${quantity}" data-title="${title}" id="input-quantity" class="cart-quantity"  >
                            </div>
                            <div class="cart-remove">X</div>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChange);
  document.querySelectorAll(".cart-quantity").forEach((item) => {
    item.addEventListener("change", (e) => {
      const inputChanged = e.target.dataset.title;
      const currentProduct = list.find(
        (product) => product.title === inputChanged
      );
      currentProduct.quantity = +e.target.value;
      console.log(list);
    });
  });
}

//Update function
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }

  total = total.toFixed(2);

  document.getElementsByClassName("total-price")[0].innerText = "€ " + total;
}

async function submitProduct(list) {
  console.log(list);
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: list, company: company.value }),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    company.value = "";
    console.log("Success:", result);
    //console.log("Firm", company.value);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
