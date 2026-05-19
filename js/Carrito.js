function getCart() {
    const stored = localStorage.getItem('shoppingCart');
    return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function formatPrice(value) {
    return value.toFixed(2);
}

function resolveImagePath(image) {
    if (!image) return '';
    if (image.startsWith('../') || image.startsWith('/') || image.startsWith('http')) {
        return image;
    }
    return '../' + image.replace(/^\.\//, '');
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items');
    const totalCount = document.getElementById('cart-total-count');
    const totalPrice = document.getElementById('cart-total-price');

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
        totalCount.textContent = '0';
        totalPrice.textContent = '0.00';
        return;
    }

    let count = 0;
    let sum = 0;

    cart.forEach((item, index) => {
        count += item.quantity;
        sum += item.quantity * item.price;

        const itemCard = document.createElement('div');
        itemCard.className = 'cart-item';
        itemCard.innerHTML = `
            <div class="cart-item-image">
                <img src="${resolveImagePath(item.image)}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.quantity} x $${formatPrice(item.price)}</p>
                <p>Subtotal: $${formatPrice(item.quantity * item.price)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="btn-cart remove-item" data-index="${index}">Eliminar</button>
            </div>
        `;

        container.appendChild(itemCard);
    });

    totalCount.textContent = count;
    totalPrice.textContent = formatPrice(sum);
    attachRemoveItemHandlers();
}

function attachRemoveItemHandlers() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index, 10);
            const cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            renderCart();
        });
    });
}

function clearCart() {
    saveCart([]);
    renderCart();
}

function getOrders() {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function isLoggedIn() {
    return localStorage.getItem('user-logged-in') === 'true';
}

function getCurrentUserEmail() {
    return localStorage.getItem('user-email') || '';
}

function checkoutCart() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar el pedido.');
        return;
    }

    if (!isLoggedIn()) {
        const goLogin = confirm('Debes iniciar sesión para completar la compra. ¿Quieres iniciar sesión ahora?');
        if (goLogin) {
            window.location.href = 'Formulario.html';
        }
        return;
    }

    const paymentMethodSelect = document.getElementById('payment-method');
    const paymentMethod = paymentMethodSelect ? paymentMethodSelect.value : 'efectivo';
    if (!paymentMethod) {
        alert('Selecciona una forma de pago antes de finalizar el pedido.');
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.quantity * item.price;
    });

    const orders = getOrders();
    const newOrder = {
        id: 'ORD' + Date.now(),
        userEmail: getCurrentUserEmail(),
        date: new Date().toLocaleString(),
        total: total,
        paymentMethod: paymentMethod,
        status: 'pendiente',
        items: cart
    };
    orders.push(newOrder);
    saveOrders(orders);
    localStorage.setItem('last-order-id', newOrder.id);
    saveCart([]);
    renderCart();
    alert('Pedido registrado correctamente.');
    window.location.href = 'receipt.html';
}

window.addEventListener('DOMContentLoaded', function() {
    renderCart();
    const clearButton = document.getElementById('clear-cart');
    if (clearButton) {
        clearButton.addEventListener('click', clearCart);
    }
    const checkoutButton = document.getElementById('checkout-cart');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkoutCart);
    }
});
