# 🌸 DECO — Regalería & Cotillón

Tienda online de souvenirs, cotillón, papelería y regalería.  
Desarrollada en **React 18** con estilos CSS puro (sin frameworks externos).

---

## 📁 Estructura del proyecto

```
deco-tienda/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx       ← Barra de navegación + categorías
│   │   │   └── Navbar.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx         ← Sección principal de bienvenida
│   │   │   └── Hero.css
│   │   ├── ProductGrid/
│   │   │   ├── ProductGrid.jsx  ← Grilla de productos filtrada
│   │   │   └── ProductGrid.css
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.jsx  ← Card individual (clickeable → modal)
│   │   │   └── ProductCard.css
│   │   ├── ProductModal/
│   │   │   ├── ProductModal.jsx ← Modal con galería de fotos
│   │   │   └── ProductModal.css
│   │   ├── Cart/
│   │   │   ├── Cart.jsx         ← Panel lateral del carrito + WhatsApp
│   │   │   └── Cart.css
│   │   ├── Toast/
│   │   │   ├── Toast.jsx        ← Notificación al agregar producto
│   │   │   └── Toast.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── data/
│   │   └── products.js          ← ⭐ Catálogo de productos (editá aquí)
│   ├── styles/
│   │   └── global.css           ← Variables CSS y estilos base
│   ├── App.jsx                  ← Componente raíz con todo el estado
│   └── index.jsx                ← Punto de entrada
├── package.json
└── README.md
```

---

## 🚀 Cómo correr el proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### 3. Build para producción
```bash
npm run build
```

---

## ✏️ Cómo personalizar

### Agregar / editar productos
Editá el archivo `src/data/products.js`.  
Cada producto tiene esta estructura:

```js
{
  id: 1,                          // número único
  name: 'Nombre del producto',
  cat: 'souvenirs',               // categoría (ver CATEGORIES)
  catLabel: 'Souvenirs',          // nombre visible
  icon: '🌸',                    // emoji (se muestra si no hay fotos)
  price: 850,                     // precio en pesos
  desc: 'Descripción breve.',
  bg: 'bg-souvenirs',             // clase de fondo (ver ProductCard.css)
  badge: 'Nuevo',                 // opcional: etiqueta sobre la imagen
  photos: [                       // array de URLs de fotos reales
    '/images/producto1-foto1.jpg',
    '/images/producto1-foto2.jpg',
  ],
}
```

### Reemplazar fotos placeholder
1. Poné tus imágenes en `public/images/`
2. En `products.js`, reemplazá las URLs de `placehold.co` por `/images/tu-foto.jpg`

### Cambiar el número de WhatsApp
En `src/components/Cart/Cart.jsx`, línea 9:
```js
const WA_NUMBER = '5491100000000'; // ← reemplazá con el número real
```
Formato: código de país + número, sin espacios ni `+`.  
Ejemplo Argentina: `5491155667788`

### Cambiar colores
Editá las variables en `src/styles/global.css` (sección `:root`).

---

## 📦 Tecnologías
- React 18
- CSS Modules (archivos `.css` por componente)
- Sin librerías de UI externas
- WhatsApp Web API para pedidos

---

## 📸 Fotos en el modal
El modal de detalle soporta múltiples fotos por producto:
- **Flecha ‹ ›** para navegar entre fotos
- **Miniaturas** clickeables debajo de la imagen principal
- **Teclado**: ← → para navegar, Escape para cerrar
