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
- En **Disponibilidad**, escritorio permite alternar entre **Disponible** (detalle por producto), **Agregado** (total, efectivo y crédito disponible, expresados en PEN) y **Deuda** (pago pendiente y deuda total). El total es efectivo más líneas libres; las monedas se convierten con el tipo de cambio de Configuración.
- En móvil, la vista Disponible agrega una tarjeta de **Disponible total**, sin botón Agregado. Con cinco productos se muestran seis tarjetas en dos columnas.
- En **Movimientos** puedes seleccionar **Todo el mes** o un día específico. Las opciones y los resultados nunca superan la fecha de corte; al cambiar de mes se restablece Todo el mes.
- Al cambiar el ciclo de una tarjeta, el ciclo anterior se archiva automáticamente para que el **pago pendiente histórico** pueda reconstruirse en futuros cortes.

## Objetivos y Pendientes
- **Objetivos** permite definir una meta, moneda, fecha objetivo y prioridad. Puedes registrar aportes manuales o vincular una cuenta y elegir qué porcentaje de su saldo corresponde al objetivo (100% por defecto).
- Al vincular una cuenta, el avance usa ese porcentaje del saldo al corte y se actualiza con sus movimientos. Si las monedas difieren, se aplica el tipo de cambio de Configuración. Un saldo negativo aporta cero al avance.
- Los objetivos vinculados no suman el monto inicial ni los aportes manuales. Ese historial se conserva y vuelve a aplicarse al desvincular la cuenta. Vincular o desvincular no crea movimientos, ni modifica caja o P&L.
- Para vincular BIF: **Objetivos → Editar → Cuenta vinculada → BIF**, elige el porcentaje y guarda en modo Administrador. La vinculación se guarda en el mismo estado de Supabase, sin cambios de esquema.
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

La pestaña **Indicadores** permite analizar rangos rápidos (7D, 15D, 30D, 60D, 90D, semana actual, mes actual, YTD, 6M, 12M y Todo) o personalizados, comparar contra el periodo anterior, alternar variables financieras y agrupar la serie en forma diaria, semanal o mensual. La agrupación predeterminada es **Diaria**. En escritorio, el panel **Configurar análisis** queda fijo a la izquierda, con fechas en paralelo y categorías/productos desplegables. Los indicadores principales se ordenan en tres columnas (dos en móvil); gráficos, ratios y desgloses se adaptan al ancho disponible. Las barras internas de desplazamiento se ocultan conservando el desplazamiento con rueda, gesto o teclado. Los datos financieros continúan siendo **solo nube en Supabase**.

### P&L UX v22
- Despliegue de subcategorías inmediato sin recalcular toda la matriz.
- Importes desktop sin símbolo S/; móvil conserva S/.
- Cabeceras sticky, alineación numérica uniforme y navegación móvil más compacta.

### Actualización v36
- Caché PWA renovada para cargar la nueva interfaz.
- `inline.js` está sincronizado con el script incorporado en `index.html` (la página ejecuta este último).
- Validación local con datos ficticios: escritorio y móvil de 320 a 1440 px, disponibilidad en PEN/USD, filtros de día/mes/corte y objetivos vinculados, conversiones, porcentajes, guardado del formulario e historial manual. Sin errores de JavaScript en estas pruebas. No se accedió a datos financieros reales ni se probó una escritura real en Supabase.
