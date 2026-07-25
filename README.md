# Gori Didi - Authentic Indian Products E-Commerce

Landing page + e-commerce store para vender productos indios.

## Features

✅ **Landing page** con hero section, sección "Our Story" y featured products
✅ **Catálogo dinámico** filtrable por categorías (MODA, TRAJES, ACCESORIOS, TEXTIL, DECORACIÓN)
✅ **Carrito de compras** con cantidad, subtotales
✅ **Checkout por WhatsApp** (sin complicaciones de pagos, número configurable desde el Admin)
✅ **Admin Panel** - editar productos (con imagen), nombre del negocio, hero y número de WhatsApp
✅ **Bilingüe** (EN/ES) - cada texto se traduce vía atributos `data-en`/`data-es`, sin diccionario duplicado
✅ **Almacenamiento local** - funciona sin backend, datos guardados en localStorage
✅ **Responsive** - mobile (con menú hamburguesa), tablet, desktop

## Admin Login

**Password por defecto:** `gori2024`

> Esto es una protección solo de cara al cliente (client-side). El usuario/contraseña
> vive en el JavaScript del navegador, así que cualquiera puede verlo con "Ver código
> fuente". Para un panel de administración real, se necesita un backend con autenticación.

### Funciones Admin
- Cambiar nombre del negocio, hero title/subtitle y número de WhatsApp
- Agregar nuevos productos (con imagen opcional por URL)
- Eliminar productos

## Deploy

Este proyecto está hosteado en Vercel. Cualquier cambio en `main` branch se deploya automáticamente.

### Primeros pasos

```bash
# Clonar
git clone https://github.com/TU-USUARIO/gori-didi.git
cd gori-didi

# Hacer cambios
# Luego:
git add .
git commit -m "Descripción de cambios"
git push origin main
```

Vercel auto-deploy en segundos.

## Estructura

```
index.html      - Markup de la página (HTML)
css/style.css    - Todos los estilos
js/app.js        - Toda la lógica (carrito, catálogo, admin, i18n)
gori-logo-300.png, 3.jpg, 4.jpg, 5.jpg, 6.jpg - Logo y fotos reales (ver ASSETS.md)
```

## Imágenes

Ver [`ASSETS.md`](ASSETS.md) para qué foto va en cada lugar de la página. Si un
archivo falta, la página usa un placeholder automáticamente - nada se rompe.

## Personalización

**Colores** (en `css/style.css`, sección `:root`):
- Rojo: `--primary: #a42f36` (header, títulos, botones)
- Oro: `--accent: #d4af37` (botones, precios)

**Categorías:**
En el Admin Panel, agregar productos en cualquier categoría. Se crean automáticamente.

**Imágenes de producto:**
En el Admin Panel, pegar una URL de imagen al agregar un producto. Si se deja vacío,
se usa un emoji de referencia.

## Próximos pasos

- [ ] Autenticación real de Admin (backend)
- [ ] Integrar imágenes reales de producto (Cloudinary o similar)
- [ ] Integrar Stripe o Razorpay para cobros
- [ ] Email confirmations
- [ ] Analytics (Vercel Analytics)

---

**Made with ❤️ by Claude**
