// Load cart from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];s
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// References
let cartContainer = document.getElementById("cart-items");
let totalEl = document.getElementById("total");
let cartCountEl = document.getElementById("cart-count");

// Display cart items
function displayCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty ❤️</p>";
    } else {
        cart.forEach(id => {
            let product = products.find(p => p.id === id);
            if (product) {
                total += product.price;
                cartContainer.innerHTML += `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                        <div>
                            <h4>${product.name}</h4>
                            <p><span class="price">₹${product.price}</span> <span class="old-price">₹${product.oldPrice}</span></p>
                        </div>
                        <button onclick="removeFromCart(${product.id})">Remove</button>
                    </div>
                `;
            }
        });
    }

    totalEl.innerText = total;
    cartCountEl.innerText = cart.length;
}

// Remove single item
 function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("cart-count").innerText = cart.length;
}