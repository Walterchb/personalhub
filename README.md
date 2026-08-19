# Personal Hub

Web app de control financiero personal lista para desplegar en GitHub Pages, con autenticación y sincronización automática en Supabase.

## Publicar en GitHub Pages
1. Descomprime este ZIP.
2. Sube **todos los archivos y carpetas** al raíz de tu repositorio.
3. En GitHub: **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige `main` y `/ (root)`.
6. Guarda y espera a que GitHub publique la URL.

## Instalar en el celular
### iPhone / iPad
Abre la URL publicada en Safari → Compartir → **Añadir a pantalla de inicio**.

### Android
Abre la URL en Chrome → menú → **Instalar aplicación** o **Añadir a pantalla de inicio**.

La app incluye manifest, Service Worker, Apple Touch Icon e iconos PWA de 192 y 512 px.

## Archivos principales
- `index.html`: aplicación.
- `manifest.webmanifest`: configuración PWA.
- `sw.js`: soporte offline básico.
- `assets/logo.svg`: logo para fondo claro.
- `assets/logo-white.svg`: logo para fondo oscuro.
- `assets/logo-mark.svg`: isotipo.
- `icons/`: iconos de instalación.


## Sincronización cloud
- Frontend: GitHub Pages.
- Backend: Supabase (`personal_hub_state`).
- El primer inicio de sesión, si la nube está vacía, sube automáticamente los datos existentes de este navegador.
- Después, cada cambio se guarda en Supabase y se conserva una copia local como caché.
- Al abrir o volver a la app se consulta la versión más reciente de la nube; además se comprueba periódicamente mientras está abierta.
- **Exportar JSON** queda solo como respaldo opcional.

> La clave incluida en `index.html` es la **Publishable key** de Supabase. No agregues nunca una Secret key o `service_role` al repositorio.

## Vista por fecha de corte
- El selector superior permite elegir **mes** y **día de corte**.
- Las flechas junto al día permiten recorrer la información día por día, incluso entre meses.
- Resumen, disponibilidad, P&L, movimientos, cuentas, tarjetas y categorías respetan la fecha de corte.
- En **Disponibilidad** puedes alternar entre **Disponible** (saldo de cuenta / línea libre de tarjeta) y **Deuda** (pago pendiente y deuda total).
- Al cambiar el ciclo de una tarjeta, el ciclo anterior se archiva automáticamente para que el **pago pendiente histórico** pueda reconstruirse en futuros cortes.
