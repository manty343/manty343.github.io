document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('user-role');
    if (role !== 'admin') {
        window.location.href = 'Formulario.html';
        return;
    }

    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    renderOrders();
    renderComments();
});

function getOrders() {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function getComments() {
    const stored = localStorage.getItem('comments');
    return stored ? JSON.parse(stored) : [];
}

function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function renderOrders() {
    const orders = getOrders();
    const ordersList = document.getElementById('orders-list');
    const orderCount = document.getElementById('order-count');

    orderCount.textContent = orders.length;

    if (!ordersList) {
        return;
    }

    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="empty-orders">Aún no hay pedidos registrados.</p>';
        return;
    }

    ordersList.innerHTML = orders.map(order => {
        const status = order.status || 'pendiente';
        const itemsHtml = order.items.map(item => `
            <li>
                <strong>${item.name}</strong> — ${item.quantity} x $${item.price.toFixed(2)}
            </li>
        `).join('');

        return `
            <div class="order-card">
                <h2>Pedido ${order.id}</h2>
                <p><strong>Usuario:</strong> ${order.userEmail}</p>
                <p><strong>Fecha:</strong> ${order.date}</p>
                <p><strong>Estado:</strong> <span class="status-chip status-${status}">${formatOrderStatus(status)}</span></p>
                <p><strong>Forma de pago:</strong> ${order.paymentMethod ? order.paymentMethod.replace('efectivo', 'Efectivo (Presencial)').replace('tarjeta', 'Tarjeta').replace('transferencia', 'Transferencia') : 'No especificado'}</p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <div class="order-items">
                    <h3>Productos</h3>
                    <ul>${itemsHtml}</ul>
                </div>
                <div class="order-actions">
                    ${status === 'pendiente' ? `
                        <button class="admin-button action-button complete-order" data-order-id="${order.id}">Finalizar</button>
                        <button class="admin-button action-button cancel-order" data-order-id="${order.id}">Cancelar</button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    attachOrderActionHandlers();
}

function logout() {
    localStorage.removeItem('user-logged-in');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-role');
    window.location.href = 'Formulario.html';
}

function renderComments() {
    const comments = getComments();
    const commentSection = document.getElementById('comments-list-section');
    const commentCount = document.getElementById('comment-count');
    if (commentCount) {
        commentCount.textContent = comments.length;
    }
    if (!commentSection) {
        return;
    }
    if (comments.length === 0) {
        commentSection.innerHTML = '<p class="empty-orders">Aún no hay comentarios registrados.</p>';
        return;
    }
    commentSection.innerHTML = comments.map(comment => `
        <div class="order-card">
            <h2>Comentario ${comment.id}</h2>
            <p><strong>Usuario:</strong> ${comment.userEmail || 'Anónimo'}</p>
            <p><strong>Nombre:</strong> ${comment.name || 'No proporcionado'}</p>
            <p><strong>Fecha:</strong> ${comment.date}</p>
            <div class="order-items">
                <h3>Comentario</h3>
                <p>${comment.text}</p>
            </div>
        </div>
    `).join('');
}

function formatOrderStatus(status) {
    switch (status) {
        case 'cancelado':
            return 'Cancelado';
        case 'finalizado':
            return 'Finalizado';
        default:
            return 'Pendiente';
    }
}

function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return;
    orders[orderIndex].status = status;
    saveOrders(orders);
    renderOrders();
}

function attachOrderActionHandlers() {
    document.querySelectorAll('.complete-order').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            updateOrderStatus(orderId, 'finalizado');
        });
    });
    document.querySelectorAll('.cancel-order').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            updateOrderStatus(orderId, 'cancelado');
        });
    });
}
