function getOrders() {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
}

function getCurrentUserEmail() {
    return localStorage.getItem('user-email') || '';
}

function isLoggedIn() {
    return localStorage.getItem('user-logged-in') === 'true';
}

function findLastOrderForCurrentUser() {
    const orders = getOrders();
    const currentEmail = getCurrentUserEmail();
    const lastOrderId = localStorage.getItem('last-order-id');

    if (lastOrderId) {
        const order = orders.find(order => order.id === lastOrderId && order.userEmail === currentEmail);
        if (order) {
            return order;
        }
    }

    return orders
        .filter(order => order.userEmail === currentEmail)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0] || null;
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

function renderReceipt() {
    if (!isLoggedIn()) {
        window.location.href = 'Formulario.html';
        return;
    }

    const receiptContainer = document.getElementById('receipt-content');
    if (!receiptContainer) {
        return;
    }

    const order = findLastOrderForCurrentUser();
    if (!order) {
        receiptContainer.innerHTML = '<p class="empty-cart">No se encontró ningún pedido reciente. Realiza una compra para ver tu recibo.</p>';
        return;
    }

    const paymentLabel = order.paymentMethod === 'efectivo'
        ? 'Efectivo (Presencial)'
        : order.paymentMethod === 'tarjeta'
            ? 'Tarjeta'
            : order.paymentMethod === 'transferencia'
                ? 'Transferencia'
                : 'No especificado';

    const itemsHtml = order.items.map(item => `
        <div class="cart-item">
            <div class="cart-item-image"><img src="${resolveImagePath(item.image)}" alt="${item.name}"></div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.quantity} x $${formatPrice(item.price)}</p>
                <p>Subtotal: $${formatPrice(item.quantity * item.price)}</p>
            </div>
        </div>
    `).join('');

    receiptContainer.innerHTML = `
        <div class="order-card">
            <h2>Pedido ${order.id}</h2>
            <p><strong>Usuario:</strong> ${order.userEmail}</p>
            <p><strong>Fecha:</strong> ${order.date}</p>
            <p><strong>Forma de pago:</strong> ${paymentLabel}</p>
            <p><strong>Total:</strong> $${formatPrice(order.total)}</p>
            <div class="order-items">
                <h3>Productos</h3>
                ${itemsHtml}
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', function() {
    renderReceipt();
    const continueButton = document.getElementById('continue-shopping');
        if (continueButton) {
            continueButton.addEventListener('click', function() {
                window.location.href = '../index.html';
            });
        }
});
