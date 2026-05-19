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
    const existing = cart.find(item => item.id === product.id && item.color === product.color);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
}

function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const productData = {
    camisa: {
        name: 'Camisas con Estampado',
        price: 150,
        description: 'Camisa de algodón con estampado único y personalización completa.',
        image: '../Imagenes/Camisa.jpeg',
        colors: ['Blanco', 'Negro', 'Azul'],
        features: ['Tela suave 100% algodón', 'Estampado personalizable', 'Disponible en varios talles']
    },
    sudadera: {
        name: 'Sudadera con Estampado',
        price: 500,
        description: 'Sudadera de lana con estampado único y personalización completa.',
        image: '../Imagenes/sudadera.jpeg',
        colors: ['Gris', 'Negro', 'Rojo'],
        features: ['Forro interior abrigado', 'Capucha ajustable', 'Bolsillos frontales']
    },
    gorra: {
        name: 'Gorra con Estampado',
        price: 100,
        description: 'Gorra de algodón con estampado único y personalización completa.',
        image: '../Imagenes/gorra.jpeg',
        colors: ['Blanco', 'Negro', 'Verde'],
        features: ['Visera rígida', 'Ajuste trasero fácil', 'Material ligero']
    },
    bandera: {
        name: 'Bandera',
        price: 200,
        description: 'Bandera con estampado único y personalización completa.',
        image: '../Imagenes/bandera.jpeg',
        colors: ['Rojo', 'Azul', 'Blanco'],
        features: ['Tela resistente', 'Anillos metalicos de refuerzo', 'Impresión de alta calidad']
    },
    chaqueta: {
        name: 'Chaqueta de Mesclilla',
        price: 600,
        description: 'Chaqueta de mezclilla con diseño único y personalización completa.',
        image: '../Imagenes/chaquetamesqui.jpeg',
        colors: ['Azul', 'Negro', 'Celeste'],
        features: ['Costuras reforzadas', 'Bolsillos múltiples', 'Ajuste cómodo']
    },
    almohada: {
        name: 'Almohada',
        price: 100,
        description: 'Almohada de alta calidad con diseño único y personalización completa.',
        image: '../Imagenes/almohada.jpeg',
        colors: ['Blanco', 'Gris', 'Azul'],
        features: ['Relleno suave', 'Funda lavable', 'Soporte ergonómico']
    },
    termo: {
        name: 'Termo',
        price: 80,
        description: 'Termo de acero inoxidable con estampado único y personalización completa.',
        image: '../Imagenes/termo.jpeg',
        colors: ['Negro', 'Plateado', 'Rojo'],
        features: ['Conserva la temperatura', 'Tapa antigoteo', 'Acero inoxidable']
    },
    libreta: {
        name: 'Libreta',
        price: 20,
        description: 'Libreta de calidad con diseño único y personalización completa.',
        image: '../Imagenes/Libreta.jpeg',
        colors: ['Blanco', 'Negro', 'Rosa'],
        features: ['100 páginas', 'Tapa resistente', 'Ideal para notas y dibujos']
    },
    bolsapapel: {
        name: 'Bolsa de Papel',
        price: 35,
        description: 'Bolsa de papel con impresión de tinta personalizada. Perfecta para empaques y regalos con diseño único.',
        image: '../Imagenes/bolsaspapel.jpg',
        colors: ['Blanco', 'Café', 'Kraft'],
        features: ['Papel resistente', 'Impresión de alta calidad', 'Asas reforzadas', 'Ecológico']
    },
    bolsatela: {
        name: 'Bolsa de Tela',
        price: 45,
        description: 'Bolsa tipo tela con impresión personalizada. Reutilizable y ecológica con tu diseño impreso.',
        image: '../Imagenes/bolsastela.jpg',
        colors: ['Blanco', 'Negro', 'Rojo', 'Azul'],
        features: ['100% algodón', 'Reutilizable', 'Asas duraderas', 'Impresión personalizable']
    },
    cartaspresentacion: {
        name: 'Cartas de Presentación',
        price: 25,
        description: 'Cartas pequeñas con información de empresa o persona. Impresión por ambos lados con tu contenido.',
        image: '../Imagenes/cartaspresentacion.jpg',
        colors: ['Blanco', 'Crema', 'Gris claro'],
        features: ['Impresión a doble cara', 'Papel de alta calidad', 'Acabado profesional', 'Tamaño estándar']
    },
    cascos: {
        name: 'Cascos de Construcción',
        price: 120,
        description: 'Cascos de construcción con impresión personalizada. Seguridad con estilo y tu marca visible.',
        image: '../Imagenes/cascos.jpg',
        colors: ['Amarillo', 'Blanco', 'Naranja', 'Rojo'],
        features: ['Material resistente', 'Chinstraps ajustables', 'Impresión duradero', 'Cumple normativas']
    },
    cubrebocas: {
        name: 'Cubrebocas de Tela',
        price: 15,
        description: 'Cubrebocas de tela con diseño personalizado. Cómodos, reutilizables y con tu patrón único.',
        image: '../Imagenes/cubrebocas.jpg',
        colors: ['Blanco', 'Negro', 'Azul', 'Rojo'],
        features: ['Tela 100% algodón', 'Reutilizable y lavable', 'Elásticos ajustables', 'Diseño personalizable']
    },
    mandil: {
        name: 'Mandil de Cocina',
        price: 40,
        description: 'Mandil tipo cocina con diseño o color personalizado. Resistente y funcional para profesionales.',
        image: '../Imagenes/mandil.jpg',
        colors: ['Blanco', 'Negro', 'Rojo', 'Azul'],
        features: ['Bolsillos prácticos', 'Resistente al agua', 'Cuello ajustable', 'Tela duradera']
    },
    mochila: {
        name: 'Mochila',
        price: 65,
        description: 'Mochila de color con diseño impreso personalizado. Perfecta para estudiantes y viajeros.',
        image: '../Imagenes/mochila.jpg',
        colors: ['Negro', 'Azul', 'Rojo', 'Verde'],
        features: ['Compartimentos múltiples', 'Respaldo acolchonado', 'Correas ergonómicas', 'Resistente al agua']
    },
    notasnegocio: {
        name: 'Notas de Negocio',
        price: 18,
        description: 'Notas de papel para cierre de turno y apuntes de trabajadores. Impresión personalizada.',
        image: '../Imagenes/notasnegocios.jpg',
        colors: ['Blanco', 'Amarillo', 'Rosa', 'Azul claro'],
        features: ['Papel de calidad', 'Impresión nítida', 'Fácil de portar', 'Ideal para notas rápidas']
    },
    paraguas: {
        name: 'Paraguas',
        price: 55,
        description: 'Paraguas de color con impresión o diseño personalizado. Combina funcionalidad con tu marca.',
        image: '../Imagenes/paraguas.jpg',
        colors: ['Negro', 'Rojo', 'Azul', 'Verde'],
        features: ['Varillas de acero', 'Tela repelente al agua', 'Mango ergonómico', 'Impresión resistente']
    },
    postit: {
        name: 'Post-it Personalizados',
        price: 12,
        description: 'Papelitos post-it personalizados con tu marca o diseño. Perfectos para oficina y regalos.',
        image: '../Imagenes/postit.jpg',
        colors: ['Amarillo', 'Rosa', 'Azul', 'Verde'],
        features: ['Adhesivo de larga duración', 'Papel de calidad', 'Impresión personalizable', 'Pack de 100']
    },
    pulseras: {
        name: 'Pulseras de Tela',
        price: 20,
        description: 'Pulseras de tela personalizadas con tu diseño. Ideales para eventos, regalos y promociones.',
        image: '../Imagenes/pulseras.jpg',
        colors: ['Rojo', 'Azul', 'Negro', 'Verde'],
        features: ['Tela suave', 'Ajuste regulable', 'Impresión durable', 'Cómoda todo el día']
    },
    tazas: {
        name: 'Tazas Personalizables',
        price: 30,
        description: 'Tazas de colores que puedes personalizar con tu diseño. Regalo perfecto y publicidad corporativa.',
        image: '../Imagenes/tazas.jpg',
        colors: ['Blanco', 'Negro', 'Rojo', 'Azul'],
        features: ['Cerámica de calidad', 'Impresión vitrificada', 'Resistente al horno', 'Capacidad 350ml']
    }
};

function renderProduct() {
    const id = getProductId();
    const product = productData[id];
    const title = document.getElementById('product-title');
    const image = document.getElementById('product-image');
    const desc = document.getElementById('product-description');
    const price = document.getElementById('product-price');
    const colors = document.getElementById('color-options');
    const features = document.getElementById('product-features');
    const addButton = document.getElementById('add-to-cart');

    if (!product) {
        title.textContent = 'Producto no encontrado';
        desc.textContent = 'Selecciona un producto válido desde la tienda.';
        colors.innerHTML = '';
        price.textContent = '0.00';
        addButton.disabled = true;
        return;
    }

    title.textContent = product.name;
    desc.textContent = product.description;
    price.textContent = product.price.toFixed(2);
    image.src = product.image;
    image.alt = product.name;

    let selectedColor = product.colors[0];
    colors.innerHTML = product.colors.map(color => `
        <button type="button" class="color-option${color === selectedColor ? ' selected' : ''}" data-color="${color}">
            ${color}
        </button>
    `).join('');

    features.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');

    colors.querySelectorAll('.color-option').forEach(button => {
        button.addEventListener('click', () => {
            selectedColor = button.dataset.color;
            colors.querySelectorAll('.color-option').forEach(btn => btn.classList.toggle('selected', btn === button));
        });
    });

    addButton.addEventListener('click', () => {
        addToCart({ id, name: product.name, price: product.price, image: product.image, color: selectedColor });
        addButton.textContent = 'Agregado';
        setTimeout(() => addButton.textContent = 'Agregar al carrito', 800);
    });
}

window.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderProduct();
});
