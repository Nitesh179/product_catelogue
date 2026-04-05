/* ===== DATA ===== */
const products = [
  // Cashews Products
  { id: 1, wt: "200g", outofstock:false, name: "Peri Peri Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "peri-peri-cashew.png", desc: "Our best-selling Peri Peri Cashews are roasted to perfection and coated with our secret spicy zest. A burst of flavor in every bite, perfect for snack lovers.", bestseller: false },
  { id: 2, wt: "200g", outofstock:false, name: "Cheese Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "cheese-cashew.png", desc: "Classic cheesy goodness on handpicked, premium cashews. Creamy, savory, and incredibly satisfying, a delight for children and cheese fans.", bestseller: false },
  { id: 3, wt: "200g", outofstock:false, name: "Pudina Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "pudina-cashew.png", desc: "Refreshing minty freshness combined with the crunch of premium cashews. A delightful cool flavor that's perfect for warm afternoons or as a palate cleanser.", bestseller: true },
  { id: 4, wt: "200g", outofstock:false, name: "Cream & Onion Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "cream-onion-cashew.png", desc: "A smooth blend of sour cream and tangy onions perfectly balanced on select premium cashews. An irresistible savory snack.", bestseller: false },
  
  // Alomds Products
  { id: 5, wt: "200g", outofstock:false, name: "Tiramisu Almonds", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "tiramisu-almonds.png", desc: "Coffee infused luxury. Premium California almonds roasted and dipped in a silky tiramisu coating. A dessert in a nutshell.", bestseller: true },
  { id: 6, wt: "200g", outofstock:false, name: "Paan Almond", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "paan-almond.png", desc: "A traditional Indian delight reinvented. The exotic flavor of sweet paan coated on crunchy almonds. An experience like no other.", bestseller: false },
  { id: 7, wt: "200g", outofstock:false, name: "Rose Almonds", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "rose-almonds.png", desc: "The delicate aroma of exotic roses perfectly paired with crunchy almonds. A sweet, elegant, and aromatic snack for refined palates.", bestseller: false },
  { id: 8, wt: "200g", outofstock:false, name: "Cadbury Choco Almond", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "cadbury-chocolate-almonds.png", desc: "A timeless combination. Crunchy roasted almonds coated in the smoothness of Cadbury's milk chocolate. Pure joy.", bestseller: false },
  
  // Choclates Products
  { id: 9, outofstock:false, name: "Almond Brittle Box", category: "chocolates", tag: "Chocolate Treat", price: 99, mrp: 149, img: "almond-brittle-box.png", desc: "Our signature treat. Crunchy caramel brittle packed with roasted almonds and a touch of caremil. A perfect small indulgence.", bestseller: true },
  { id: 10, outofstock:false, name: "Almond Florentine", category: "chocolates", tag: "Premium Chocolate", price: 140, mrp: 199, img: "almond-florentine.png", desc: "Rich dark chocolate squares filled with a crunchy, caramelized almond center. Elegantly wrapped in gold foil for a luxurious treat.", bestseller: false },
  { id: 11, outofstock:false, name: "Coffee Almond Brittle", category: "chocolates", tag: "Coffee Lover", price: 99, mrp: 149, img: "coffee-almond-brittle.png", desc: "A bold twist on our classic. Crunchy roasted almond brittle infused with rich, aromatic coffee and coated in premium chocolate.", bestseller: true },
  { id: 12, outofstock:true, name: "Rose Almond Brittle", category: "chocolates", tag: "Floral Indulgence", price: 99, mrp: 149, img: "rose-almond-brittle.png", desc: "An elegant fusion of flavors. Crisp roasted almond chocolate brittle delicately flavored and garnished with aromatic dried rose petals.", bestseller: false }

];

const categories = [
  { key: "all", label: "📃 All" },
  { key: "bestseller", label: "⭐ Best Sellers" },
  { key: "hampers", label: "🎁 Gift Hampers" },
  { key: "cashews", label: "🌶️ Cashews" },
  { key: "almonds", label: "🍩 Almonds" },
  { key: "chocolates", label: "🍫 Chocolates" },
];

/* ===== STATE ===== */
let cart = [];
let activeCategory = "all";
let currentModalProduct = null;

/* ===== HELPERS ===== */
function isInCart(id) {
  return cart.some(item => item.id === id);
}

function getDiscount(price, mrp) {
  return Math.round(((mrp - price) / mrp) * 100);
}

/* ===== RENDER CATEGORIES ===== */
function renderCategories() {
  const bar = document.getElementById("categoryBar");
  bar.innerHTML = categories.map(cat =>
    `<button class="cat-btn ${activeCategory === cat.key ? 'active' : ''}" onclick="setCategory('${cat.key}')">${cat.label}</button>`
  ).join("");
}

function setCategory(key) {
  activeCategory = key;
  renderCategories();
  renderProducts();
}

/* ===== RENDER PRODUCTS ===== */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  let filtered;

  if (activeCategory === "all") filtered = products;
  else if (activeCategory === "bestseller") filtered = products.filter(p => p.bestseller);
  else filtered = products.filter(p => p.category === activeCategory);

if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="coming-soon">
        <div class="coming-soon-inner">
          <h2>Coming Soon</h2>
          <p>We are crafting something special for you.</p>
        </div>
      </div>
      <div class="custom-hamper-box">
          <h3>🎁 Customize Your Hamper</h3>
          <p class="text-secondary ">Tailored precisely to your budget and choice</p>
          <div class="hamper-form">
              <input type="number" id="hBudget" placeholder="Approx Budget (₹)">
              <input type="number" id="hQty" placeholder="Quantity (How many hampers?)">
              <textarea id="hDetails" placeholder="Details (e.g. Mix of Cashews & Almonds)"></textarea>
              <button class="btn-hamper-wa" onclick="sendHamperEnquiry()">
                  <i class="bi bi-whatsapp"></i> Send Requirement
              </button>
          </div>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const inCart = isInCart(p.id);
    const discount = getDiscount(p.price, p.mrp);
    const isOOS = p.outofstock === true; // Check if out of stock

return `
      <div class="product-card ${isOOS ? 'oos-card' : ''}">
        <button class="card-add-btn ${isOOS ? 'oos-btn' : (inCart ? 'added' : 'not-added')}" 
          ${isOOS ? 'disabled' : ''} 
          onclick="event.stopPropagation(); ${!inCart && !isOOS ? `addToCart(${p.id})` : ''}">
          ${isOOS ? '<i class="bi bi-slash-circle"></i>' : (inCart ? '<i class="bi bi-check-lg"></i>' : '<i class="bi bi-plus-lg"></i>')}
        </button>
        
        ${isOOS ? '<span class="oos-badge">Out of Stock</span>' : (p.bestseller ? '<span class="best-badge">⭐ Best</span>' : '')}
        
        <div class="card-clickable" onclick="openProductPage(${p.id})">
          <div class="card-img">
            <img src="images/${p.img}" alt="${p.name}">
          </div>
          <div class="card-info">
            <h3>${p.name}</h3>
            <span class="card-tag">${p.tag}</span>
            <div class="card-price-row">
              <span class="card-price">₹${p.price}</span>
              <span class="card-mrp">₹${p.mrp}</span>
              <span class="card-discount">${discount}%</span>
            </div>
          </div>
        </div>
      </div>`;
  }).join("");
}

/* ===== CART LOGIC ===== */
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  renderProducts();
}


function removeFromCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing && existing.qty > 1) {
    existing.qty--;
  } else {
    cart = cart.filter(item => item.id !== id);
  }
  updateCartUI();
  renderProducts();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const badge = document.getElementById("cartBadge");
  badge.textContent = totalCount;
  badge.classList.toggle("hidden", totalCount === 0);

  document.getElementById("cartTotal").textContent = "₹ " + totalAmount;
  document.getElementById("btnWhatsapp").disabled = cart.length === 0;

  const itemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-left">
        <div class="cart-item-img">
        <img src="images/${item.img}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">
        </div>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹ ${item.price} × ${item.qty}</div>
        </div>
      </div>
      <div class="cart-item-controls">
        <span class="qty-count">${item.qty}</span> <div style="display: flex; gap: 8px;">
            <button class="qty-btn minus" onclick="removeFromCart(${item.id})"><i class="bi bi-dash"></i></button>
            <button class="qty-btn plus" onclick="addToCart(${item.id})"><i class="bi bi-plus"></i></button>
        </div>
      </div>
    </div>
  `).join("");
}

/* ===== CART OVERLAY ===== */
function toggleCart() {
  document.getElementById("cartOverlay").classList.toggle("open");
}

/* ===== PRODUCT MODAL ===== */
function openProductPage(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  currentModalProduct = p;
  
  const discount = getDiscount(p.price, p.mrp);
  const alreadyInCart = isInCart(p.id);
  const isOOS = p.outofstock === true;

  // Inject text data (Weight is already removed from name here)
  document.getElementById("ppTag").textContent = p.tag;
  document.getElementById("ppName").textContent = p.name; 
  document.getElementById("ppDesc").textContent = p.desc;
  document.getElementById("ppPrice").textContent = "₹" + p.price;
  document.getElementById("ppMrp").textContent = "₹" + p.mrp;
  document.getElementById("ppDiscount").textContent = discount + "% off";

  // Hide weight selector for Chocolates
  const weightSelector = document.getElementById("ppWeightSelector");
  if (p.category === "chocolates") {
    weightSelector.style.display = "none";
  } else {
    weightSelector.style.display = "flex";
  }

  // Inject image
  document.querySelector(".pp-image-container").innerHTML = 
  `<img src="images/${p.img}" alt="${p.name}">`;

  // Manage Add to Cart button state
  const addBtn = document.querySelector(".pp-add-btn");
  if (isOOS) {
    addBtn.textContent = "Out of Stock";
    addBtn.disabled = true;
  } else if (alreadyInCart) {
    addBtn.textContent = "Already in Cart";
    addBtn.disabled = true;
  } else {
    addBtn.textContent = "Add to Cart";
    addBtn.disabled = false;
  }

  // Slide the page in
  document.getElementById("productPageWrapper").classList.add("open");
}

function closeProductPage() {
  document.getElementById("productPageWrapper").classList.remove("open");
  currentModalProduct = null;
}

function ppAddToCart() {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id);
    closeProductPage();
  }
}

/* ===== WHATSAPP ORDER ===== */
function placeOrder() {
  if (cart.length === 0) return;

  // Sirf standard emojis use kiye hain jo har phone par dikhte hain
  let message = "📦 *NEW ORDER RECEIVED*\n";
  message += "━━━━━━━━━━━━━━━━━━━\n\n";
  message += "🛒 *Items Detail:*\n";
  
  let total = 0;
  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    // Bullet point ke liye simple dot ya dash use karein
    message += `• *${item.name}* ${item.wt ? `(${item.wt})` : ''} x ${item.qty} → ₹${lineTotal}\n`;    total += lineTotal;
  });

  message += "\n━━━━━━━━━━━━━━━━━━━\n";
  message += `💰 *Total Bill: ₹${total}/-*`;

  const phoneNumber = "919202540083"; 
  window.open("https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message), "_blank");

  // Clear data from cart after placing order
  cart = []; 
  updateCartUI();
  renderProducts();
  toggleCart();
}
 
function sendHamperEnquiry() {
    const budget = document.getElementById('hBudget').value;
    const qty = document.getElementById('hQty').value;
    const details = document.getElementById('hDetails').value;

    if(!budget || !qty) {
        alert("Please enter Budget and Quantity!");
        return;
    }

    // Icons fixed for WhatsApp
    let message = "🎁 *CUSTOM HAMPER ENQUIRY*\n";
    message += "━━━━━━━━━━━━━━━━━━━\n\n";
    message += `💰 *Budget:* ₹${budget}\n`;
    message += `🔢 *Quantity:* ${qty} Nos\n`;
    message += `📝 *Details:* ${details || 'Not specified'}\n\n`;
    message += "━━━━━━━━━━━━━━━━━━━\n";
    message += "Please let me know the best options.";

    window.open("https://wa.me/919202540083?text=" + encodeURIComponent(message), "_blank");
}



document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  updateCartUI();
});

