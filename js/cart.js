let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer = document.getElementById("cart-items");
let totalEl = document.getElementById("total");

function displayCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartContainer.innerHTML = "<p>Your cart is empty ❤️</p>";

    } else {

        cart.forEach((product, index) => {

            let finalPrice = product.discount
                ? Math.round(product.price - (product.price * product.discount / 100))
                : product.price;

            total += finalPrice;

            cartContainer.innerHTML += `
                <div class="cart-item">

                    <img src="${product.image}">

                    <div>
                        <h4>${product.name}</h4>

                        <p>
                            ₹${finalPrice}
                        </p>
                    </div>

                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>
            `;
        });
    }

    totalEl.innerText = total;
}

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let countEl = document.getElementById("cart-count");

    if(countEl){
        countEl.innerText = cart.length;
    }
}

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();
}

// CLEAR
function clearCart() {

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();
}


displayCart();