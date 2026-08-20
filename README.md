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


## Sincronización cloud (solo nube)
- Frontend: GitHub Pages.
- Backend: Supabase (`personal_hub_state`).
- Si una cuenta nueva todavía no tiene estado en Supabase, Personal Hub crea allí una estructura inicial vacía; nunca toma una copia financiera del navegador.
- Supabase es la única fuente de datos financieros. Personal Hub no guarda cuentas, tarjetas, movimientos, pendientes, objetivos ni configuraciones financieras en `localStorage`.
- Al abrir o volver a la app se consulta la versión más reciente de la nube; además se comprueba periódicamente mientras está abierta.
- **Exportar JSON** queda solo como respaldo opcional.

> La clave incluida en `index.html` es la **Publishable key** de Supabase. No agregues nunca una Secret key o `service_role` al repositorio.
>
> El navegador puede conservar la **sesión de autenticación de Supabase** para evitar pedir login en cada recarga. Esa sesión no contiene tu información financiera. La PWA también puede cachear archivos estáticos (HTML, JS, iconos), pero no el estado financiero.

## Vista por fecha de corte
- El selector superior usa únicamente la **fecha de corte**.
- Las flechas permiten recorrer la información día por día, incluso entre meses y años.
- Resumen, disponibilidad, P&L, movimientos, cuentas, tarjetas y categorías respetan la fecha de corte.
- En **Disponibilidad** puedes alternar entre **Disponible** (saldo de cuenta / línea libre de tarjeta) y **Deuda** (pago pendiente y deuda total).
- Al cambiar el ciclo de una tarjeta, el ciclo anterior se archiva automáticamente para que el **pago pendiente histórico** pueda reconstruirse en futuros cortes.

## Objetivos y Pendientes
- **Objetivos** permite definir una meta, moneda, fecha objetivo, prioridad y registrar aportes o retiros de avance. Estos aportes son de planificación: no alteran caja ni P&L.
- **Pendientes** controla importes por cobrar de forma puntual o en cuotas mensuales.
- Un pendiente no aumenta la caja hasta que se registra el cobro.
- Al cobrar puedes tratarlo como **Reembolso** (entra a la cuenta y reduce el gasto/inversión de la categoría seleccionada) o como **Ingreso**.
- Los cobros registrados quedan también en **Movimientos** y respetan la fecha de corte histórica.

## Categorías, subcategorías y etiquetas
- El P&L usa una jerarquía **Grupo → Categoría → Subcategoría** para mantener el reporte principal limpio.
- Los movimientos y recurrentes pueden llevar además una **Etiqueta / proyecto** opcional para análisis transversales sin crear categorías nuevas.
- La estructura inicial incluye ingresos, egresos y **Ahorro / Inversión** con subcategorías predefinidas.
- Al actualizar desde una versión anterior, Personal Hub migra automáticamente las categorías conocidas (por ejemplo, `Snacks` pasa a `Alimentación → Snacks` y `Ropa` a `Compras personales → Ropa`) y conserva categorías personalizadas.
- Las subcategorías con historia no se borran al retirarlas desde la edición de una categoría: quedan archivadas para preservar el histórico.

## Indicadores / motor de análisis

La pestaña **Indicadores** permite analizar rangos rápidos (7D, 15D, 30D, 60D, 90D, semana actual, mes actual, YTD, 6M, 12M y Todo) o personalizados, comparar contra el periodo anterior, alternar variables financieras y agrupar la serie en forma diaria, semanal o mensual. La agrupación predeterminada es **Diaria**. En escritorio, el panel **Configurar análisis** queda fijo a la izquierda mientras se revisan ratios, composición, rankings y desgloses. Los datos financieros continúan siendo **solo nube en Supabase**.
