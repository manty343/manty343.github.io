const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const errorMessage = document.getElementById('error-message');

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    hideError();

    if (!name) {
        showError('Por favor ingresa tu nombre completo');
        return;
    }

    if (!email) {
        showError('Por favor ingresa tu correo electrónico');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Por favor ingresa un correo electrónico válido');
        return;
    }

    if (!password || !confirmPassword) {
        showError('Por favor ingresa y confirma tu contraseña');
        return;
    }

    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden');
        return;
    }

    const users = getRegisteredUsers();
    if (users.some(user => user.email === email)) {
        showError('Ya existe una cuenta con ese correo');
        return;
    }

    users.push({ name, email, password, role: 'user' });
    localStorage.setItem('registered-users', JSON.stringify(users));

    showSuccessMessage('Cuenta creada correctamente. Redirigiendo al inicio de sesión...', function() {
        setTimeout(function() {
            window.location.href = 'Formulario.html';
        }, 1500);
    });
});

function getRegisteredUsers() {
    const stored = localStorage.getItem('registered-users');
    try {
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        return [];
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    errorMessage.style.background = '#ffebee';
    errorMessage.style.color = '#d32f2f';
}

function hideError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

function showSuccessMessage(message, callback) {
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message show';
    successDiv.style.background = '#e8f5e9';
    successDiv.style.color = '#2e7d32';
    successDiv.textContent = message;
    errorMessage.parentNode.insertBefore(successDiv, errorMessage);

    if (callback) {
        setTimeout(callback, 1500);
    }

    setTimeout(function() {
        successDiv.remove();
    }, 3000);
}
