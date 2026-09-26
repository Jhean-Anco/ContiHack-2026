/**
 * Prueba de humo del flujo de interfaz.
 *
 * Comprueba la navegación de la misión, la variante por grado y el rechazo de
 * contenido mal formado, sin depender de un runner ni de paquetes nuevos: se compila
 * con el TypeScript del proyecto y se ejecuta con Node.
 *
 *   npm run prueba:humo
 *
 * No cubre render, teclado, lector de pantalla ni contraste: eso requiere revisión
 * manual y, más adelante, el runner de pruebas que documenta docs/08-calidad.
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const datos = require("../.humo-build/servicios/datosProvisionales.js");
const val = require("../.humo-build/servicios/validacion.js");
const maquina = require("../.humo-build/flujo/maquinaUI.js");

let fallos = 0;
const comprobar = (etiqueta, condicion) => {
  console.log(`${condicion ? "ok   " : "FALLA"} ${etiqueta}`);
  if (!condicion) fallos += 1;
};

// El manifiesto y las cinco variantes pasan el validador de la interfaz.
val.leerManifiesto(datos.manifiestoProvisional());
for (const grado of [1, 2, 3, 4, 5]) {
  const mision = val.leerMision(datos.misionProvisional(grado));
  comprobar(
    `grado ${grado}: dos retos conectados y variante propia`,
    mision.retos.length === 2 && mision.grado === grado,
  );
}

// Recorrido completo de entrada a cierre, con un intento fallido y un reintento.
let estado = maquina.estadoInicial;
const paso = (evento) => {
  estado = maquina.reducir(estado, evento);
};

paso({ tipo: "comenzar" });
comprobar("la entrada lleva a la selección de grado", estado.paso === "grado");

paso({ tipo: "confirmarGrado" });
comprobar(
  "sin grado marcado no avanza y explica por qué",
  estado.paso === "grado" && estado.mensajeError !== null,
);

paso({ tipo: "marcarGrado", grado: 3 });
paso({ tipo: "confirmarGrado" });
comprobar("con grado marcado avanza a instrucciones", estado.paso === "instrucciones");

paso({ tipo: "cargaIniciada" });
paso({ tipo: "cargaLista", mision: val.leerMision(datos.misionProvisional(3)) });
comprobar("la misión queda cargada", estado.carga === "listo" && estado.mision !== null);

paso({ tipo: "irA", paso: "mapa" });
paso({ tipo: "irA", paso: "contexto" });
paso({ tipo: "irA", paso: "reto" });
comprobar(
  "el primer reto es el de fuentes",
  estado.paso === "reto" && maquina.retoActual(estado).tipo === "fuentes",
);

paso({ tipo: "marcarOpcion", id: "opcion-fuentes-a", multiple: false });
let veredicto = datos.veredictoProvisional({
  misionId: datos.ID_MISION_EJEMPLO,
  retoId: "reto-fuentes",
  grado: 3,
  opcionesSeleccionadas: estado.seleccion,
});
comprobar(
  "una opción sin respaldo no se presenta como evidencia",
  veredicto.resultado === "evidencia_insuficiente",
);
paso({ tipo: "veredictoRecibido", veredicto: val.leerVeredicto(veredicto) });
comprobar(
  "el feedback aparece y no otorga recompensa",
  estado.paso === "feedback" && estado.xpJuego === 0,
);

const ayudasAntes = maquina.ayudasRestantes(estado);
paso({
  tipo: "ayudaRecibida",
  ayuda: val.leerAyuda(
    datos.ayudaProvisional({
      misionId: datos.ID_MISION_EJEMPLO,
      retoId: "reto-fuentes",
      grado: 3,
      ayudasConsumidas: 0,
      opcionesSeleccionadas: [],
    }),
  ),
});
comprobar(
  "la pista descuenta del cupo de ese reto",
  maquina.ayudasRestantes(estado) === ayudasAntes - 1,
);

paso({ tipo: "cerrarPanel" });
paso({ tipo: "reintentar" });
paso({ tipo: "marcarOpcion", id: "opcion-fuentes-b", multiple: false });
veredicto = datos.veredictoProvisional({
  misionId: datos.ID_MISION_EJEMPLO,
  retoId: "reto-fuentes",
  grado: 3,
  opcionesSeleccionadas: estado.seleccion,
});
paso({ tipo: "veredictoRecibido", veredicto: val.leerVeredicto(veredicto) });
comprobar(
  "la opción respaldada da evidencia y suma puntos de juego",
  veredicto.resultado === "con_evidencia" && estado.xpJuego === 10,
);

paso({ tipo: "continuar" });
comprobar(
  "pasa al reto de ruta con la selección limpia",
  estado.paso === "reto" &&
    maquina.retoActual(estado).tipo === "ruta" &&
    estado.seleccion.length === 0,
);

paso({ tipo: "marcarOpcion", id: "ruta-2", multiple: false });
veredicto = datos.veredictoProvisional({
  misionId: datos.ID_MISION_EJEMPLO,
  retoId: "reto-ruta",
  grado: 3,
  opcionesSeleccionadas: estado.seleccion,
});
paso({ tipo: "veredictoRecibido", veredicto: val.leerVeredicto(veredicto) });
paso({ tipo: "continuar" });
comprobar("después del último reto llega el cierre", estado.paso === "cierre");

paso({ tipo: "reiniciar" });
comprobar(
  "reiniciar borra grado, misión y recompensa",
  estado.paso === "entrada" &&
    estado.gradoMarcado === null &&
    estado.mision === null &&
    estado.xpJuego === 0,
);

// El validador rechaza lo que no puede renderizar en lugar de mostrarlo a medias.
let rechazaMision = false;
try {
  val.leerMision({ id: "x" });
} catch (error) {
  rechazaMision = error instanceof val.ErrorContenido;
}
comprobar("una misión incompleta se rechaza", rechazaMision);

let rechazaOrigen = false;
try {
  val.leerAyuda({ retoId: "a", tipo: "pista", texto: "t", origen: "otro" });
} catch {
  rechazaOrigen = true;
}
comprobar("un origen de pista desconocido se rechaza", rechazaOrigen);

console.log(fallos === 0 ? "\nTodas las comprobaciones pasaron." : `\n${fallos} comprobaciones fallaron.`);
process.exit(fallos === 0 ? 0 : 1);
