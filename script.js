const products = [
    { name: "Peri Peri", category: "cashews", tag: "Cashew", price: 320, mrp: 399, img: "peri-peri-cashew.png", bestseller: false },
    { name: "Cheese", category: "cashews", tag: "Cashew", price: 320, mrp: 399, img: "cheese-cashew.png", bestseller: false },
    { name: "Pudina", category: "cashews", tag: "Cashew", price: 320, mrp: 399, img: "pudina-cashew.png", bestseller: true },
    { name: "Cream & Onion", category: "cashews", tag: "Cashew", price: 320, mrp: 399, img: "cream-onion-cashew.png", bestseller: false },
    { name: "Tiramisu", category: "almonds", tag: "Almond", price: 260, mrp: 299, img: "tiramisu-almonds.png", bestseller: true },
    { name: "Paan", category: "almonds", tag: "Almond", price: 260, mrp: 299, img: "paan-almond.png", bestseller: false },
    { name: "Rose", category: "almonds", tag: "Almond", price: 260, mrp: 299, img: "rose-almonds.png", bestseller: false },
    { name: "Cadbury Chocolate", category: "almonds", tag: "Almond", price: 260, mrp: 299, img: "cadbury-chocolate-almonds.png", bestseller: false },
    { name: "Almond Brittle", category: "chocolates", tag: "Chocolate", price: 99, mrp: 149, img: "almond-brittle-box.png", bestseller: true }
    // { 
    //     name: "Royal Festive Box", 
    //     category: "hampers", 
    //     tag: "Assorted Dry Fruits", 
    //     price: 1200, 
    //     mrp: 1500, 
    //     img: "rose-almonds.png", 
    //     bestseller: true 
];

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('productContainer');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function displayProducts(filter = 'all') {
        container.innerHTML = ""; 

        // 1. List ko filter karna
        const filteredList = products.filter(p => {
            if (filter === 'all') return true;
            if (filter === 'bestseller') return p.bestseller;
            return p.category === filter;
        });

        // 2. Agar Hamper section khali hai ya koi bhi filter khali hai toh Coming Soon dikhao
        if (filteredList.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div style="border: 1px dashed #d4af37; padding: 40px 20px; border-radius: 15px; background: rgba(212, 175, 55, 0.05);">
                        <h2 style="font-family: 'Lora', serif; color: #d4af37; font-style: italic; font-weight: 700;">Coming Soon</h2>
                        <p style="color: #aaa; font-size: 0.85rem; letter-spacing: 1px;">Something premium is being crafted for you.</p>
                    </div>
                </div>`;
            return;
        }

        // 3. Loop chalakar products generate karna
        filteredList.forEach(p => {
            const productHTML = `
                <div class="col-6">
                    <div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="images/${p.img}" alt="${p.name}" class="product-img" onerror="this.src='images/icon_logo.png'">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${p.name}</h3>
                            <span class="product-tag">${p.tag} ${p.bestseller ? '| ⭐' : ''}</span>
                            <div class="product-price-box">
                                <span class="selling-price">₹ ${p.price}/-</span>
                                <span class="mrp-price">₹ ${p.mrp}/-</span>
                            </div>
                        </div>
                    </div>
                </div>`;
            container.innerHTML += productHTML;
        });
    }

    // Filter Buttons logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayProducts(this.getAttribute('data-filter'));
        });
    });

    displayProducts('all');
});
