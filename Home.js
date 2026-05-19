function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

let currentIndex = 0;
function getSlides() {
    return document.getElementById('slides');
}

function showSlide(index) {
    const slides = getSlides();
    if (!slides) return;
    const total = slides.children.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;
    slides.style.transform = 'translateX(' + (-100 * index) + '%)';
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

window.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    setInterval(function() {
        nextSlide();
    }, 4500);
    initCartButtons();
    updateCartCount();
    initProductSearch();
    initAccountLinks();
    initProductView();
    initAdminSidebarLink();
});

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
    const buttons = document.querySelectorAll('.btn-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;
            if (!name || !price) return;
            addToCart({ name, price, image });
            this.textContent = '✅';
            setTimeout(() => { this.textContent = '🛒'; }, 800);
        });
    });
}

function initProductView() {
    const buttons = document.querySelectorAll('.btn-view');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            if (!id) return;
                window.location.href = `html/Product.html?id=${encodeURIComponent(id)}`;
        });
    });
}

function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    if (!searchInput) return;
    searchInput.addEventListener('input', function() {
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

function initAdminSidebarLink() {
    const role = localStorage.getItem('user-role');
    const sidebarList = document.querySelector('#sidebar ul');
    if (!sidebarList) return;

    const existingAdminItem = sidebarList.querySelector('.admin-link');
    if (role === 'admin') {
        if (!existingAdminItem) {
                const adminItem = document.createElement('li');
                adminItem.className = 'admin-link';
                adminItem.innerHTML = '<a href="html/admin.html">Panel Admin</a>';
            sidebarList.appendChild(adminItem);
        }
    } else if (existingAdminItem) {
        existingAdminItem.remove();
    }
}

function initAccountLinks() {
    const isLoggedIn = localStorage.getItem('user-logged-in') === 'true';
    const accountLink = document.getElementById('account-link');
    const billingLink = document.getElementById('billing-link');
        const target = isLoggedIn ? 'html/receipt.html' : 'html/Formulario.html';
    if (accountLink) {
        accountLink.href = target;
    }
    if (billingLink) {
        billingLink.href = target;
    }
}