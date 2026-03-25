/* ===== DATA ===== */
const products = [
  // Cashews Products
  { id: 1, wt: "200g", name: "Peri Peri Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "peri-peri-cashew.png", desc: "Our best-selling Peri Peri Cashews are roasted to perfection and coated with our secret spicy zest. A burst of flavor in every bite, perfect for snack lovers.", bestseller: false },
  { id: 2, wt: "200g", name: "Cheese Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "cheese-cashew.png", desc: "Classic cheesy goodness on handpicked, premium cashews. Creamy, savory, and incredibly satisfying, a delight for children and cheese fans.", bestseller: false },
  { id: 3, wt: "200g", name: "Pudina Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "pudina-cashew.png", desc: "Refreshing minty freshness combined with the crunch of premium cashews. A delightful cool flavor that's perfect for warm afternoons or as a palate cleanser.", bestseller: true },
  { id: 4, wt: "200g", name: "Cream & Onion Cashew", category: "cashews", tag: "Premium Cashew", price: 320, mrp: 399, img: "cream-onion-cashew.png", desc: "A smooth blend of sour cream and tangy onions perfectly balanced on select premium cashews. An irresistible savory snack.", bestseller: false },
  
  // Alomds Products
  { id: 5, wt: "200g", name: "Tiramisu Almonds", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "tiramisu-almonds.png", desc: "Coffee infused luxury. Premium California almonds roasted and dipped in a silky tiramisu coating. A dessert in a nutshell.", bestseller: true },
  { id: 6, wt: "200g", name: "Paan Almond", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "paan-almond.png", desc: "A traditional Indian delight reinvented. The exotic flavor of sweet paan coated on crunchy almonds. An experience like no other.", bestseller: false },
  { id: 7, wt: "200g", name: "Rose Almonds", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "rose-almonds.png", desc: "The delicate aroma of exotic roses perfectly paired with crunchy almonds. A sweet, elegant, and aromatic snack for refined palates.", bestseller: false },
  { id: 8, wt: "200g", name: "Cadbury Choco Almond", category: "almonds", tag: "Premium Almond", price: 260, mrp: 299, img: "cadbury-chocolate-almonds.png", desc: "A timeless combination. Crunchy roasted almonds coated in the smoothness of Cadbury's milk chocolate. Pure joy.", bestseller: false },
  
  // Choclates Products
  { id: 9, name: "Almond Brittle Box", category: "chocolates", tag: "Chocolate Treat", price: 99, mrp: 149, img: "almond-brittle-box.png", desc: "Our signature treat. Crunchy caramel brittle packed with roasted almonds and a touch of sea salt. A perfect small indulgence.", bestseller: true },
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
    return `
      <div class="product-card">
        <button class="card-add-btn ${inCart ? 'added' : 'not-added'}" onclick="event.stopPropagation(); ${inCart ? '' : `addToCart(${p.id})`}">
          ${inCart ? '<i class="bi bi-check-lg"></i>' : '<i class="bi bi-plus-lg"></i>'}
        </button>
        ${p.bestseller ? '<span class="best-badge">⭐ Best</span>' : ''}
        <div class="card-clickable" onclick="openModal(${p.id})">
          <div class="card-img">
            <img src="images/${p.img}" alt="${p.name}" style="width:100%; height:100%; border-radius:8px; color: white; font-size: 24px; align-items: center; justify-content: center;">
          </div>
          <div class="card-info">
            <h3>${p.name} ${p.wt ? `(${p.wt})` : ''}</h3>
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
          <div class="cart-item-name">${item.name} ${item.wt ? `(${item.wt})` : ''}</div>
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
function openModal(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  currentModalProduct = p;
  const discount = getDiscount(p.price, p.mrp);
  const alreadyInCart = isInCart(p.id);

  document.getElementById("modalTag").textContent = p.tag;
  document.getElementById("modalName").textContent = p.name + (p.wt ? ` (${p.wt})` : '');
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = "₹" + p.price + "/-";
  document.getElementById("modalMrp").textContent = "₹" + p.mrp + "/-";
  document.getElementById("modalDiscount").textContent = discount + "% off";
  // document.getElementById("productModal").classList.add("open");

  document.querySelector(".modal-image").innerHTML = 
  `<img src="images/${p.img}" style="width:100%; height:100%; border-radius:8px;">`;

  const modalAddBtn = document.querySelector(".btn-add-cart");
  if (alreadyInCart) {
    modalAddBtn.textContent = "Already in Cart";
    modalAddBtn.disabled = true;
    modalAddBtn.style.backgroundColor = "#333"; // Grey color
    modalAddBtn.style.color = "#777";
    modalAddBtn.style.cursor = "not-allowed";
  } else {
    modalAddBtn.textContent = "Add to Cart";
    modalAddBtn.disabled = false;
    modalAddBtn.style.backgroundColor = ""; // Original color (CSS se uthayega)
    modalAddBtn.style.color = "";
    modalAddBtn.style.cursor = "pointer";
  }

  document.getElementById("productModal").classList.add("open");
}

function closeModal() {
  document.getElementById("productModal").classList.remove("open");
  currentModalProduct = null;
}

function modalAddToCart() {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id);
    closeModal();
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
    message += `• *${item.name} ${item.wt ? `(${item.wt})` : ''}* x ${item.qty} → ₹${lineTotal}\n`;
    total += lineTotal;
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

