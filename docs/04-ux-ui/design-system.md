# Design system

## Estado

Primera implementación del prototipo, no una identidad aprobada. Los tokens y componentes descritos abajo existen en el código; su revisión visual, de accesibilidad con tecnologías de asistencia y con estudiantes sigue pendiente. WCAG 2.2 AA es el objetivo documentado en [accesibilidad](accesibilidad.md), no una conformidad conseguida.

## Tokens implementados

Definidos como variables CSS en `apps/frontend/src/estilos/tokens.css` y expuestos a Tailwind mediante `@theme inline` en `apps/frontend/src/app/globals.css`. Los componentes usan los nombres del tema (`bg-superficie`, `text-tinta`, `border-borde`), no valores literales.

| Grupo | Tokens | Nota |
|---|---|---|
| Superficie y texto | `lienzo`, `superficie`, `superficie-alt`, `tinta`, `tinta-suave`, `borde`, `borde-fuerte` | Con variante para `prefers-color-scheme: dark`. |
| Acción | `accion`, `accion-hover`, `accion-tinta`, `accion-suave` | Un único color de acción; el estado deshabilitado no depende solo de color. |
| Estados | `exito`, `aviso`, `error`, `info` y su fondo | Cada estado se acompaña de palabra y símbolo en `Aviso` y `Etiqueta`. |
| Foco | `foco` | Contorno de 3 px con desplazamiento, aplicado globalmente a `:focus-visible`. |
| Tipografía | `fuente-texto`, `fuente-fuente-historica`, escala `xs`–`3xl`, `linea-lectura`, `ancho-lectura` | Familias del sistema; no se añadió ninguna fuente externa. |
| Forma y espaciado | `radio-sm/md/lg`, `blanco-tactil` (2.75 rem), `sombra-panel` | `blanco-tactil` fija el mínimo de los controles. |
| Movimiento | `duracion-rapida`, `duracion-media`, `curva` | Neutralizado por `prefers-reduced-motion` en `globals.css`. |

Valores de contraste y armonía siguen pendientes de verificación instrumental y de revisión de diseño; los pares texto/fondo se eligieron para superar 4.5:1 pero no se han medido con una herramienta.

## Componentes implementados

Base, en `apps/frontend/src/componentes/base/`: `Boton` (cuatro variantes, dos tamaños, estado ocupado con `aria-busy`), `EnlaceBoton` (enlace real con aspecto de botón), `Panel` y `TituloPanel`, `Aviso` (cuatro tonos con palabra y símbolo), `Etiqueta`, `Cargando`, `RegionAnuncios` (`aria-live="polite"`) y `Dialogo` (modal con foco contenido, cierre con Escape y devolución del foco).

De juego, en `apps/frontend/src/componentes/juego/`: `SelectorGrado` (radios nativos), `MapaEsquematico` y `ListaPuntos` (el dibujo y su alternativa textual equivalente), `TarjetaFuente` (procedencia siempre visible), `DialogoPersonaje`, `OpcionesReto` (radios o casillas, sin texto libre), `PanelFeedback` (toma el foco al aparecer), `PanelAyuda` (muestra el origen de la pista), `MenuPausa`, `HudMision` y `AvisoEjemplo` (rótulo permanente de contenido de ejemplo).

No se introdujo ningún UI kit, librería de componentes ni capa de abstracción adicional. Cada componente se creó para un uso real del flujo implementado.

## Revisión pendiente de cada componente

Probar móvil/escritorio, teclado, foco visible y no cubierto, lector de pantalla, ampliación al 200 %, contraste medido, control táctil y mensajes de error. Registrar versión, decisión visual y criterios pendientes en el PR o la tarea, verificando la página real y no solo el token CSS. Esta revisión no se ha hecho: la verificación registrada hasta ahora es tipos, lint, build y una prueba de humo del flujo.
