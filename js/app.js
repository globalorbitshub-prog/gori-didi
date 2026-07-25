const heroDefaults = {
    en: { title: 'Authentic Indian Products', sub: 'Discover the beauty and craftsmanship of India with our curated collection' },
    es: { title: 'Productos Indios Auténticos', sub: 'Descubre la belleza y artesanía de India con nuestra colección seleccionada' }
};

let lang = 'en';
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let prods = JSON.parse(localStorage.getItem('prods') || '[]');
let biz = JSON.parse(localStorage.getItem('biz') || '{}');

function esc(str) {
    return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function switchLang(l) {
    lang = l;
    document.documentElement.lang = l;
    updateTexts();
    renderHero();
}

// Elements carry both data-en and data-es directly; no separate dictionary to keep in sync.
function updateTexts() {
    document.querySelectorAll('[data-en]').forEach(el => {
        const val = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en');
        el.textContent = val;
    });
}

function renderHero() {
    const def = heroDefaults[lang] || heroDefaults.en;
    document.getElementById('heroTitle').textContent = biz.heroTitle || def.title;
    document.getElementById('heroSub').textContent = biz.heroSub || def.sub;
}

function renderBrand() {
    const name = biz.name || 'Gori Didi';
    document.getElementById('brandName').textContent = name;
    document.getElementById('footerBrand').textContent = name;
    document.getElementById('footerBrand2').textContent = name;
    document.getElementById('logoFallback').textContent = name.slice(0, 2).toUpperCase();
}

function renderWhatsappLink() {
    const num = (biz.whatsapp || '').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent('Hi! I have a question about your products.');
    document.getElementById('footerWhatsapp').href = `https://wa.me/${num}?text=${msg}`;
}

function toggleNav() {
    const nav = document.getElementById('navMain');
    const btn = document.getElementById('navToggle');
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
}

function closeNav() {
    document.getElementById('navMain').classList.remove('open');
    document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
}

if (!prods.length) {
    prods = [
        { id: 1, name: 'Kurtis Women', cat: 'MODA', price: 35, emoji: '👗', img: '' },
        { id: 2, name: 'Silk Scarves', cat: 'ACCESORIOS', price: 25, emoji: '🧣', img: '' },
        { id: 3, name: 'Bollywood Saree', cat: 'TRAJES', price: 65, emoji: '👚', img: '' },
        { id: 4, name: 'Brass Decorations', cat: 'DECORACIÓN', price: 45, emoji: '🏛️', img: '' },
        { id: 5, name: 'Cotton Cushion', cat: 'TEXTIL', price: 30, emoji: '🛋️', img: '' },
        { id: 6, name: 'Bindi Set', cat: 'ACCESORIOS', price: 12, emoji: '✨', img: '' },
    ];
    localStorage.setItem('prods', JSON.stringify(prods));
}

function showPage(p) {
    closeNav();
    document.querySelectorAll('.page').forEach(x => x.classList.add('hidden'));
    document.getElementById(p).classList.remove('hidden');
    if (p === 'landing') renderFeatured();
    if (p === 'catalog') { renderCats(); renderCatalog('ALL'); }
    if (p === 'cart') renderCart();
}

function handleImgErr(el, emoji) {
    el.parentElement.textContent = emoji || '📦';
}

function productImgHtml(p) {
    if (p.img) {
        return `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" onerror="handleImgErr(this, '${esc(p.emoji || '📦')}')">`;
    }
    return esc(p.emoji || '📦');
}

function productCardsHtml(list) {
    return list.map(p => `
        <div class="card">
            <div class="card-img">${productImgHtml(p)}</div>
            <div class="card-body">
                <div class="card-category">${esc(p.cat)}</div>
                <div class="card-title">${esc(p.name)}</div>
                <div class="card-price">$${p.price.toFixed(2)}</div>
                <button class="btn btn-primary btn-small card-btn" onclick="addCart(${p.id})" data-en="Add to Cart" data-es="Agregar al Carrito"></button>
            </div>
        </div>
    `).join('');
}

function renderFeatured() {
    document.getElementById('featuredGrid').innerHTML = productCardsHtml(prods.slice(0, 3));
    updateTexts();
}

function renderCatalog(cat = 'ALL') {
    const list = cat === 'ALL' ? prods : prods.filter(p => p.cat === cat);
    document.getElementById('catalogGrid').innerHTML = productCardsHtml(list);
    updateTexts();
}

function renderCats() {
    const cats = ['ALL', ...new Set(prods.map(p => p.cat))];
    const html = cats.map(c => `<button class="cat-btn ${c === 'ALL' ? 'active' : ''}" onclick="filterCat(this, '${esc(c)}')">${esc(c)}</button>`).join('');
    document.getElementById('catsContainer').innerHTML = html;
}

function filterCat(btn, c) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCatalog(c);
}

function cartQty() {
    return cart.reduce((s, p) => s + p.qty, 0);
}

function updateCartBadge() {
    document.getElementById('cartCount').textContent = cartQty();
}

function addCart(id) {
    const p = prods.find(x => x.id === id);
    if (!p) return;
    const ex = cart.find(x => x.id === id);
    if (ex) ex.qty++; else cart.push({ ...p, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function renderCart() {
    if (!cart.length) {
        document.getElementById('cartView').innerHTML = `<div class="empty-state"><div class="empty-state-icon">🛒</div><p data-en="Cart is empty" data-es="Carrito vacío"></p></div>`;
        updateTexts();
        return;
    }
    const tot = cart.reduce((s, p) => s + (p.price * p.qty), 0);
    const html = `
        ${cart.map(p => `
            <div class="cart-item">
                <div class="cart-item-img">${productImgHtml(p)}</div>
                <div class="cart-item-details">
                    <div>${esc(p.name)}</div>
                    <div class="cart-item-category">${esc(p.cat)}</div>
                    <div class="qty-control">
                        <input type="number" value="${p.qty}" min="1" step="1" onchange="updateQty(${p.id}, this.value)">
                        <button onclick="rmCart(${p.id})" data-en="Remove" data-es="Eliminar"></button>
                    </div>
                </div>
                <div class="cart-price">$${(p.price * p.qty).toFixed(2)}</div>
            </div>
        `).join('')}
        <div class="cart-summary">
            <div class="cart-total"><span data-en="Total" data-es="Total"></span>: $${tot.toFixed(2)}</div>
            <button class="btn btn-primary" onclick="checkoutWA()" style="width:100%" data-en="Checkout via WhatsApp" data-es="Comprar por WhatsApp"></button>
        </div>
    `;
    document.getElementById('cartView').innerHTML = html;
    updateTexts();
}

function updateQty(id, q) {
    const it = cart.find(p => p.id === id);
    if (it) it.qty = Math.max(1, parseInt(q) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function rmCart(id) {
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function checkoutWA() {
    if (!cart.length) return;
    const tot = cart.reduce((s, p) => s + (p.price * p.qty), 0);
    const its = cart.map(p => `${p.name} x${p.qty} - $${(p.price * p.qty).toFixed(2)}`).join('\n');
    const msg = `Hello! I'd like to order:\n\n${its}\n\nTotal: $${tot.toFixed(2)}`;
    const num = (biz.whatsapp || '').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`);
}

function adminLogin() {
    const e = document.getElementById('email').value;
    const p = document.getElementById('pwd').value;
    if (e === 'oscar@gorididi.com' && p === 'gori2024') {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        document.getElementById('bizName').value = biz.name || '';
        document.getElementById('heroTit').value = biz.heroTitle || '';
        document.getElementById('heroSubIn').value = biz.heroSub || '';
        document.getElementById('bizWhatsapp').value = biz.whatsapp || '';
        renderProds();
    } else {
        alert('Invalid credentials');
    }
}

function adminLogout() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('email').value = '';
    document.getElementById('pwd').value = '';
}

function saveBiz() {
    biz = {
        name: document.getElementById('bizName').value,
        heroTitle: document.getElementById('heroTit').value,
        heroSub: document.getElementById('heroSubIn').value,
        whatsapp: document.getElementById('bizWhatsapp').value
    };
    localStorage.setItem('biz', JSON.stringify(biz));
    renderBrand();
    renderHero();
    renderWhatsappLink();
    alert('Saved!');
}

function addProd() {
    const nm = document.getElementById('prodName').value.trim();
    const ct = document.getElementById('prodCat').value;
    const pr = parseFloat(document.getElementById('prodPrice').value);
    const img = document.getElementById('prodImg').value.trim();
    if (nm && pr >= 0) {
        prods.push({ id: Date.now(), name: nm, cat: ct, price: pr, emoji: '📦', img });
        localStorage.setItem('prods', JSON.stringify(prods));
        document.getElementById('prodName').value = '';
        document.getElementById('prodPrice').value = '';
        document.getElementById('prodImg').value = '';
        renderProds();
    }
}

function renderProds() {
    const html = prods.map(p => `
        <div class="product-item">
            <div class="product-info">
                <div class="product-name"><span class="prod-icon">${productImgHtml(p)}</span> ${esc(p.name)}</div>
                <div class="product-meta">${esc(p.cat)} - $${p.price.toFixed(2)}</div>
            </div>
            <button class="btn-delete" onclick="delProd(${p.id})" data-en="Delete" data-es="Borrar"></button>
        </div>
    `).join('');
    document.getElementById('prodsList').innerHTML = html;
    updateTexts();
}

function delProd(id) {
    prods = prods.filter(p => p.id !== id);
    localStorage.setItem('prods', JSON.stringify(prods));
    renderProds();
}

function initHeroBackdrop() {
    // url() inside a custom property resolves relative to the stylesheet that
    // consumes it (css/style.css), not this script - hence the root-relative path.
    const path = '6.jpg';
    const img = new Image();
    img.onload = () => document.getElementById('hero').style.setProperty('--hero-bg', `url('/${path}')`);
    img.src = path;
}

document.getElementById('year').textContent = new Date().getFullYear();
updateCartBadge();
renderBrand();
renderHero();
renderWhatsappLink();
initHeroBackdrop();
showPage('landing');
updateTexts();
