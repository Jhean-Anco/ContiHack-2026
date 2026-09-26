# Frontend

## Implementado

Next.js 16 App Router con React 19, TypeScript estricto, alias `@/*`, Tailwind CSS 4. Rutas: `/` (portada), `/jugar` (flujo de misión) y `/salud` (página técnica del scaffold, que consulta `GET ${NEXT_PUBLIC_API_URL}/api/health` y representa estados de API y base de datos). `layout.tsx` fija metadata, `lang="es"`, viewport sin `maximum-scale` y el enlace de salto al contenido.

Organización de `src/` por responsabilidad real:

| Carpeta | Responsabilidad |
|---|---|
| `app/` | Rutas y layout. Las páginas no contienen contenido de juego. |
| `pantallas/` | Composición de cada pantalla del flujo y el orquestador `JuegoMision`. |
| `componentes/base/` | Piezas de interfaz reutilizables sin conocimiento del dominio. |
| `componentes/juego/` | Piezas que presentan contenido de misión recibido del servidor. |
| `flujo/` | `maquinaUI.ts` (navegación de pantallas, paneles y selección) y `useFlujoMision.ts` (peticiones, cancelación y traducción a eventos). |
| `servicios/` | `contratos.ts` (tipos de transporte), `validacion.ts` (estrechamiento de datos externos), `clienteContenido.ts` (puerto HTTP) y `datosProvisionales.ts` (andamio desechable). |
| `estilos/` | Tokens visuales. |

## Frontera con el backend

El cliente consume JSON de Nest y no importa modelos Prisma ni módulos Nest. Toda obtención de contenido, veredictos y pistas pasa por `servicios/clienteContenido.ts`. La interfaz no evalúa respuestas, no calcula XP, no decide feedback, no interpreta mapeos curriculares y no persiste nada: el estado de misión vive en memoria y se reinicia al recargar o salir. El reparto de responsabilidades entre agentes está en [reparto Claude/Codex](../07-agentes/reparto-claude-codex.md).

`clienteContenido.ts` tiene dos implementaciones del mismo puerto: `clienteHttp`, que habla con el API y adapta su forma a los contratos de la interfaz, y `clienteProvisional`, andamio de datos ficticios rotulados para poder construir la interfaz sin catálogo publicado. `NEXT_PUBLIC_CONTENIDO_ORIGEN=http` selecciona el primero. Cuando el catálogo real esté publicado, el andamio y el interruptor se borran.

## Convención para código nuevo

Todo dato externo se estrecha en `servicios/validacion.ts` antes de renderizarse; las interfaces no sustituyen la validación del servidor, que sigue siendo la autoridad. Cada petición maneja carga, error, vacío, cancelación y reintento, y comunica su estado de forma accesible. No hay gestor de estado global, caché, librería de validación runtime, UI kit ni autenticación, y no se añaden sin necesidad y ADR. Tratar `NEXT_PUBLIC_*` como configuración visible al cliente. Cualquier caché futura debe respetar versiones de contenido y no mezclar datos de personas.

## Verificación disponible

En `apps/frontend`: `npm run tipos`, `npm run lint`, `npm run build` y `npm run prueba:humo`. La prueba de humo compila los módulos de flujo y datos con el TypeScript del proyecto y recorre el flujo completo en Node, sin añadir dependencias; no cubre render, teclado ni lectores de pantalla. No hay pruebas de componentes ni runner configurado.
