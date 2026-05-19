function getComments() {
    const stored = localStorage.getItem('comments');
    return stored ? JSON.parse(stored) : [];
}

function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function getCurrentUserEmail() {
    return localStorage.getItem('user-email') || 'Anónimo';
}

function addComment() {
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');
    const successMessage = document.getElementById('comment-success');

    if (!textInput || !textInput.value.trim()) {
        alert('Por favor, escribe tu comentario antes de enviar.');
        return;
    }

    const comment = {
        id: 'COM' + Date.now(),
        userEmail: getCurrentUserEmail(),
        name: nameInput ? nameInput.value.trim() : '',
        text: textInput.value.trim(),
        date: new Date().toLocaleString()
    };

    const comments = getComments();
    comments.unshift(comment);
    saveComments(comments);
    textInput.value = '';
    if (nameInput) {
        nameInput.value = '';
    }
    renderComments();

    if (successMessage) {
        successMessage.textContent = 'Comentario enviado correctamente. Gracias por tu opinión.';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 4000);
    }
}

function renderComments() {
    const comments = getComments();
    const list = document.getElementById('comment-list');
    if (!list) return;

    if (comments.length === 0) {
        list.innerHTML = '<p class="empty-cart">Aún no hay comentarios.</p>';
        return;
    }

    list.innerHTML = comments.map(comment => `
        <div class="order-card">
            <h3>${comment.name || 'Anónimo'}</h3>
            <p><strong>Usuario:</strong> ${comment.userEmail || 'Anónimo'}</p>
            <p><strong>Fecha:</strong> ${comment.date}</p>
            <div class="order-items">
                <p>${comment.text}</p>
            </div>
        </div>
    `).join('');
}

window.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('submit-comment');
    if (button) {
        button.addEventListener('click', addComment);
    }
    renderComments();
});
