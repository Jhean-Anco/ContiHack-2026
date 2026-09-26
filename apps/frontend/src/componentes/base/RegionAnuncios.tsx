/**
 * Región de anuncios para lectores de pantalla.
 *
 * Es `polite` a propósito: informa del cambio de pantalla, del feedback y de las
 * pistas sin interrumpir la lectura en curso. Los errores que bloquean usan `Aviso`
 * con `urgente`, no esta región.
 *
 * Límite conocido: si el texto se repite palabra por palabra, el lector puede no
 * volver a anunciarlo. Por eso el feedback también recibe el foco al aparecer
 * (`PanelFeedback`), que es lo que garantiza su lectura en un reintento.
 */
export function RegionAnuncios({ mensaje }: { mensaje: string }) {
  return (
    <p className="solo-lectores" aria-live="polite" aria-atomic="true">
      {mensaje}
    </p>
  );
}
