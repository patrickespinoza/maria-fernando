import Carousel from "./componentes-encabezado/carrusel";
import Portada from "./componentes-encabezado/portada";
import Contador from "./componentes-encabezado/Contador";
import Celebracion from "./componentes-encabezado/Ubicacion";
import Dresscode from "./componentes-encabezado/Dresscode";
import Regalos from "./componentes-encabezado/Regalos";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import Musica from "./componentes-encabezado/musica";
import Novios from "./componentes-encabezado/novios";
import ModalFrase from "./componentes-encabezado/ImagenP";
import SeparadorImagen from "./componentes-encabezado/Imagenf";

export default function Intinerario() {
  return (
    <div>
      <Portada />

     <Musica/>

     <Novios/>

     <Celebracion />

     <ModalFrase/>

      <Dresscode />

      <Carousel />

      <Regalos />

      <SeparadorImagen/>

      <Confirmacion />
    </div>
  );
}