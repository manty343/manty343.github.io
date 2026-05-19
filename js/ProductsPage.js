function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

function getCart() {
    const stored = localStorage.getItem('shoppingCart');
    return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
}

function initCartButtons() {
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;
            if (!name || isNaN(price)) return;
            addToCart({ name, price, image });
            this.textContent = '✅';
            setTimeout(() => { this.textContent = '🛒'; }, 800);
        });
    });
}

function initProductView() {
    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.dataset.id;
            if (!id) return;
            window.location.href = `Product.html?id=${encodeURIComponent(id)}`;
        });
    });
}

function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    if (!searchInput) return;
    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const title = product.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = product.querySelector('.description')?.textContent.toLowerCase() || '';
            const matches = title.includes(query) || description.includes(query);
            product.style.display = query === '' || matches ? '' : 'none';
        });
    });
}

function initAccountLinks() {
    const isLoggedIn = localStorage.getItem('user-logged-in') === 'true';
    const accountLink = document.getElementById('billing-link');
    const target = isLoggedIn ? 'receipt.html' : 'Formulario.html';
    if (accountLink) {
        accountLink.href = target;
    }
}

window.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    initCartButtons();
    initProductView();
    initProductSearch();
    initAccountLinks();
});
