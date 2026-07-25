# Gori Didi - Authentic Indian Products E-Commerce

Landing page + e-commerce store para vender productos indios.

## Features

✅ **Landing page** con hero section y featured products  
✅ **Catálogo dinámico** filtrable por categorías (MODA, TRAJES, ACCESORIOS, TEXTIL, DECORACIÓN)  
✅ **Carrito de compras** con cantidad, subtotales  
✅ **Checkout por WhatsApp** (sin complicaciones de pagos)  
✅ **Admin Panel** - editar productos, nombre negocio, banner  
✅ **Almacenamiento local** - funciona sin backend, datos guardados en localStorage  
✅ **Responsive** - mobile, tablet, desktop  

## Admin Login

**Password por defecto:** `gori2024`

### Funciones Admin
- Cambiar nombre del negocio
- Actualizar banner/tagline
- Agregar nuevos productos
- Eliminar productos
- Editar precios

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

- `index.html` - Archivo único, contiene todo (HTML + CSS + React)

## Personalización

**Colores:**
- Rojo oscuro: `#8b0000` (header, títulos)
- Oro: `#d4af37` (botones, precios)
- Azul: `#003366` (footer)

Reemplaza en el CSS si quieres otros colores.

**Categorías:**
En el Admin Panel, agregar productos en cualquier categoría. Se crean automáticamente.

**Imágenes:**
Reemplaza los emoji `🇮🇳 📦 👗` con URLs de imágenes en el Admin.

## Próximos pasos

- [ ] Integrar imágenes reales (Cloudinary)
- [ ] Agregar SSL certificate
- [ ] Integrar Stripe o Razorpay para cobros
- [ ] Email confirmations
- [ ] Analytics (Vercel Analytics)

---

**Made with ❤️ by Claude**
