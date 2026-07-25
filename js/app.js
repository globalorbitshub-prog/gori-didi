const heroDefaults = {
    en: { title: 'Authentic Indian Products', sub: 'Discover the beauty and craftsmanship of India with our curated collection' },
    es: { title: 'Productos Indios Auténticos', sub: 'Descubre la belleza y artesanía de India con nuestra colección seleccionada' }
};

const storyDefaults = {
    en: {
        p1: 'Gori Didi started with a backpack, a camera and a deep love for India - crossing swinging footbridges in Himachal, bargaining for bangles in crowded bazaars, and riding camels into the Jaisalmer desert.',
        p2: 'Every product we sell is chosen from those same markets and artisans, so you can bring a piece of that journey home.'
    },
    es: {
        p1: 'Gori Didi nació con una mochila, una cámara y un amor profundo por India - cruzando puentes colgantes en Himachal, regateando pulseras en bazares llenos de vida y montando camellos en el desierto de Jaisalmer.',
        p2: 'Cada producto que vendemos se elige de esos mismos mercados y artesanos, para que puedas llevarte a casa un pedazo de ese viaje.'
    }
};

const socialDefaults = {
    instagram: 'https://www.instagram.com/gorididifromindia/',
    facebook: 'https://www.facebook.com/gorididifromindia/'
};

const ADMIN_HASH = '#gd-admin-2026';

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
    renderStory();
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

function renderStory() {
    const def = storyDefaults[lang] || storyDefaults.en;
    document.getElementById('storyP1').textContent = biz.storyP1 || def.p1;
    document.getElementById('storyP2').textContent = biz.storyP2 || def.p2;
}

function renderBrand() {
    const name = biz.name || 'Gori Didi';
    document.getElementById('footerBrand2').textContent = name;
    document.getElementById('logoFallback').textContent = name.slice(0, 2).toUpperCase();
    document.title = `${name} - Authentic Indian Products`;
}

function renderContact() {
    const email = biz.contactEmail || '';
    const phone = biz.contactPhone || '';
    const ig = biz.instagram || socialDefaults.instagram;
    const fb = biz.facebook || socialDefaults.facebook;
    const num = (biz.whatsapp || '').replace(/[^0-9]/g, '');
    const waMsg = encodeURIComponent('Hi! I have a question about your products.');
    const waHref = `https://wa.me/${num}?text=${waMsg}`;

    const emailLink = document.getElementById('contactEmailLink');
    if (email) {
        emailLink.href = `mailto:${email}`;
        document.getElementById('contactEmailText').textContent = email;
        emailLink.classList.remove('hidden');
    } else {
        emailLink.classList.add('hidden');
    }

    const phoneLink = document.getElementById('contactPhoneLink');
    if (phone) {
        phoneLink.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
        document.getElementById('contactPhoneText').textContent = phone;
        phoneLink.classList.remove('hidden');
    } else {
        phoneLink.classList.add('hidden');
    }

    document.getElementById('contactWaLink').href = waHref;
    document.querySelectorAll('.js-instagram').forEach(a => a.href = ig);
    document.querySelectorAll('.js-facebook').forEach(a => a.href = fb);
    document.getElementById('footerWhatsapp').href = waHref;

    const footerEmail = document.getElementById('footerEmail');
    if (email) {
        footerEmail.href = `mailto:${email}`;
        footerEmail.textContent = email;
        footerEmail.classList.remove('hidden');
    } else {
        footerEmail.classList.add('hidden');
    }
}

function openContact() {
    renderContact();
    document.getElementById('contactModal').classList.remove('hidden');
}

function closeContact() {
    document.getElementById('contactModal').classList.add('hidden');
}

function toggleNav() {
    const navEl = document.getElementById('navMain');
    const btn = document.getElementById('navToggle');
    const open = navEl.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
}

function closeNav() {
    document.getElementById('navMain').classList.remove('open');
    document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
}

// Public nav actions leave the secret admin URL if it's currently set, so
// browsing away from /#gd-admin-2026 doesn't leave it reopening on refresh.
function nav(page) {
    if (location.hash === ADMIN_HASH) {
        history.replaceState(null, '', location.pathname + location.search);
    }
    showPage(page);
}

function checkAdminHash() {
    if (location.hash === ADMIN_HASH) showPage('admin');
}
window.addEventListener('hashchange', checkAdminHash);

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
    initReveal();
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
        <div class="card reveal">
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
        document.getElementById('bizWhatsapp').value = biz.whatsapp || '';
        document.getElementById('contactEmail').value = biz.contactEmail || '';
        document.getElementById('contactPhone').value = biz.contactPhone || '';
        document.getElementById('instagramIn').value = biz.instagram || socialDefaults.instagram;
        document.getElementById('facebookIn').value = biz.facebook || socialDefaults.facebook;
        document.getElementById('heroTit').value = biz.heroTitle || '';
        document.getElementById('heroSubIn').value = biz.heroSub || '';
        document.getElementById('storyP1In').value = biz.storyP1 || '';
        document.getElementById('storyP2In').value = biz.storyP2 || '';
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
        whatsapp: document.getElementById('bizWhatsapp').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value,
        instagram: document.getElementById('instagramIn').value,
        facebook: document.getElementById('facebookIn').value,
        heroTitle: document.getElementById('heroTit').value,
        heroSub: document.getElementById('heroSubIn').value,
        storyP1: document.getElementById('storyP1In').value,
        storyP2: document.getElementById('storyP2In').value
    };
    localStorage.setItem('biz', JSON.stringify(biz));
    renderBrand();
    renderHero();
    renderStory();
    renderContact();
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

let revealObserver;
function initReveal() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal-visible'));
        return;
    }
    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
    }
    document.querySelectorAll('.reveal:not(.reveal-visible)').forEach(el => revealObserver.observe(el));
}

document.getElementById('year').textContent = new Date().getFullYear();
updateCartBadge();
renderBrand();
renderHero();
renderStory();
renderContact();
initHeroBackdrop();
showPage('landing');
checkAdminHash();
updateTexts();
