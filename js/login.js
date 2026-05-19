// Manejo del formulario de inicio de sesión
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const errorMessage = document.getElementById('error-message');

// Cargar credenciales guardadas al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    ensureAdminAccount();
    const savedEmail = localStorage.getItem('saved-email');
    const savedRemember = localStorage.getItem('remember-user');
    
    if (savedEmail && savedRemember === 'true') {
        emailInput.value = savedEmail;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
});

// Manejar el envío del formulario
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Limpiar mensaje de error
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Validaciones básicas
    if (!email) {
        showError('Por favor ingresa tu correo electrónico');
        return;
    }
    
    if (!password) {
        showError('Por favor ingresa tu contraseña');
        return;
    }
    
    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Por favor ingresa un correo electrónico válido');
        return;
    }

    const users = getRegisteredUsers();
    if (users.length === 0) {
        showError('No hay cuentas registradas. Crea una cuenta primero.');
        return;
    }

    const matchedUser = users.find(user => user.email === email && user.password === password);
    if (!matchedUser) {
        showError('Correo o contraseña incorrectos.');
        return;
    }

    const role = matchedUser.role || 'user';
    
    // Guardar preferencia de recordar usuario
    if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('saved-email', email);
        localStorage.setItem('remember-user', 'true');
    } else {
        localStorage.removeItem('saved-email');
        localStorage.removeItem('remember-user');
    }
    
    // Simular autenticación exitosa
    // En un proyecto real, esto se enviaría a un servidor
    localStorage.setItem('user-logged-in', 'true');
    localStorage.setItem('user-email', email);
    localStorage.setItem('user-role', role);
    
    // Mostrar mensaje de éxito
    showSuccessMessage('Sesión iniciada correctamente', function() {
        // Redirigir a la página principal después de 1.5 segundos
        setTimeout(function() {
            window.location.href = role === 'admin' ? 'html/admin.html' : '../index.html';
        }, 1500);
    });
});

function ensureAdminAccount() {
    const users = getRegisteredUsers();
    const adminEmail = 'admin@imprenta.com';
    const existingAdmin = users.find(user => user.email === adminEmail);
    if (!existingAdmin) {
        users.push({
            name: 'Administrador',
            email: adminEmail,
            password: 'admin123',
            role: 'admin'
        });
        localStorage.setItem('registered-users', JSON.stringify(users));
    }
}

function getRegisteredUsers() {
    const stored = localStorage.getItem('registered-users');
    try {
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        return [];
    }
}

// Función para mostrar mensajes de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    errorMessage.style.background = '#ffebee';
    errorMessage.style.color = '#d32f2f';
}

// Función para mostrar mensajes de éxito
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
    
    // Limpiar el mensaje después
    setTimeout(function() {
        successDiv.remove();
    }, 3000);
}

// Permitir envío con Enter en el campo de contraseña
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Limpiar mensaje de error cuando el usuario empieza a escribir
emailInput.addEventListener('input', function() {
    if (errorMessage.classList.contains('show')) {
        errorMessage.classList.remove('show');
    }
});

passwordInput.addEventListener('input', function() {
    if (errorMessage.classList.contains('show')) {
        errorMessage.classList.remove('show');
    }
});
