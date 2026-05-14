console.log("seller.js loaded"); 
 function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

/* =========================
   NOTIFICATION POPUP
========================= */
function showNotification(message) {
  let box = document.createElement("div");
  box.innerText = message;

  box.style.position = "fixed";
  box.style.top = "20px";
  box.style.right = "20px";
  box.style.background = "black";
  box.style.color = "white";
  box.style.padding = "10px 15px";
  box.style.borderRadius = "8px";
  box.style.zIndex = "9999";

  document.body.appendChild(box);

  setTimeout(() => {
    box.remove();
  }, 2000);
}

/* =========================
   ADD PRODUCT
========================= */
function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const discount = document.getElementById("discount").value;
  const image = document.getElementById("image").value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  let products = getProducts();

 products.push({
  name: name.trim(),
  price: parseFloat(price) || 0,
  discount: parseFloat(discount) || 0,
  image: image.trim()
});

  saveProducts(products);

  // clear inputs
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";

  showNotification("✅ Product Added!");
}

/* =========================
   DELETE PRODUCT
========================= */
function deleteProduct(index) {
  let products = getProducts();

  products.splice(index, 1);

  saveProducts(products);

  showNotification("🗑️ Product Deleted!");
}

/* =========================
   EDIT PRODUCT
========================= */
function editProduct(index) {
  let products = getProducts();
  let p = products[index];

  let newName = prompt("Edit Name", p.name);
  let newPrice = prompt("Edit Price", p.price);
  let newImage = prompt("Edit Image URL", p.image);

  if (newName && newPrice && newImage) {
    products[index] = {
      name: newName.trim(),
      price: Number(newPrice),
      image: newImage.trim()
    };

    saveProducts(products);

    showNotification("✏️ Product Updated!");
  }
}

/* =========================
   LOAD PRODUCTS (UI)
========================= */
function loadProducts() {
  let products = getProducts();

  let list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div class="product">
        <img src="${p.image}" width="100%" height="120px" style="object-fit:cover;">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>

        <button onclick="editProduct(${index})">✏️ Edit</button>
        <button onclick="deleteProduct(${index})">🗑️ Delete</button>
      </div>
    `;
  });
}

window.addEventListener("DOMContentLoaded", loadProducts);