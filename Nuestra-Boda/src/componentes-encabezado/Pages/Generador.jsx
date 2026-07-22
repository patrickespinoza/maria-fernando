import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("");
  const [link, setLink] = useState("");
  const [mensajePersonalizado, setMensajePersonalizado] = useState("");
  const [copiado, setCopiado] = useState("");

  const codificarDatos = (datos) => {
    try {
      const json = JSON.stringify(datos);
      const invertido = json.split("").reverse().join("");

      return btoa(
        unescape(
          encodeURIComponent(invertido)
        )
      );
    } catch (error) {
      console.error("No se pudieron codificar los datos:", error);
      return "";
    }
  };

  const generarLink = () => {
    const nombreLimpio = nombre.trim();
    const cantidadPases = Number(pases);

    if (!nombreLimpio) {
      alert("Escribe el nombre del invitado.");
      return;
    }

    if (
      !Number.isInteger(cantidadPases) ||
      cantidadPases < 1
    ) {
      alert("Escribe una cantidad válida de pases.");
      return;
    }

    const datos = {
      nombre: nombreLimpio,
      pases: cantidadPases,
    };

    const id = codificarDatos(datos);

    if (!id) {
      alert("No se pudo generar el enlace.");
      return;
    }

    const url = `${window.location.origin}/?id=${encodeURIComponent(id)}`;

    setLink(url);
  };

  const mensajePredeterminado = useMemo(() => {
    const nombreLimpio = nombre.trim();
    const cantidadPases = Number(pases);

    if (!nombreLimpio || !cantidadPases) {
      return "";
    }

    const textoPases =
      cantidadPases === 1
        ? "1 lugar"
        : `${cantidadPases} lugares`;

    return `Hola ${nombreLimpio}:

Con mucha alegría queremos invitarte a compartir con nosotros este día tan especial.

Hemos reservado ${textoPases} para ti.

Puedes consultar todos los detalles y confirmar tu asistencia en el siguiente enlace:

${link || "[El enlace aparecerá al generar la invitación]"}

Será un honor contar con tu presencia.`;
  }, [nombre, pases, link]);

  const mensajeWhatsApp =
    mensajePersonalizado || mensajePredeterminado;

  const copiarTexto = async (texto, tipo) => {
    if (!texto) return;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(tipo);

      window.setTimeout(() => {
        setCopiado("");
      }, 1800);
    } catch (error) {
      console.error("No se pudo copiar:", error);
      alert("No se pudo copiar el contenido.");
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setPases("1");
    setLink("");
    setMensajePersonalizado("");
    setCopiado("");
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#FDF4EF]
        px-4
        py-10
        text-[#403C32]
        sm:px-6
        lg:py-16
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="
          mx-auto
          w-full
          max-w-6xl
          overflow-hidden
          border
          border-[#EAA624]/30
          bg-white
          shadow-[0_28px_80px_rgba(64,60,50,0.14)]
          lg:grid
          lg:grid-cols-[0.85fr_1.15fr]
        "
      >
        {/* Fotografía */}
        <section
          className="
            relative
            min-h-[320px]
            overflow-hidden
            sm:min-h-[430px]
            lg:min-h-full
          "
        >
          <img
            src="/Ifinal.JPEG"
            alt="Invitación de boda"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/55
              via-black/10
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              px-7
              pb-8
              text-white
              sm:px-10
              sm:pb-10
            "
          >
            <p
              className="
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-[0.35em]
              "
            >
              Invitación personalizada
            </p>

            <h2
              className="
                font-playfair
                text-3xl
                leading-tight
                sm:text-4xl
              "
            >
              Crea el enlace de cada invitado
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/90">
              Asigna el nombre y la cantidad de pases. El invitado
              recibirá un enlace único con sus datos protegidos.
            </p>
          </div>
        </section>

        {/* Formulario */}
        <section className="relative px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <span
            className="
              pointer-events-none
              absolute
              left-4
              top-4
              h-14
              w-14
              border-l
              border-t
              border-[#EAA624]/50
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              bottom-4
              right-4
              h-14
              w-14
              border-b
              border-r
              border-[#EAA624]/50
            "
          />

          <header className="mb-9 text-center">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#C85555]
              "
            >
              Panel privado
            </p>

            <h1
              className="
                mt-3
                font-playfair
                text-3xl
                text-[#403C32]
                sm:text-4xl
              "
            >
              Generador de invitaciones
            </h1>

            <div className="mx-auto mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#EAA624]/70" />
              <span className="h-2 w-2 rotate-45 bg-[#767B39]" />
              <span className="h-px w-12 bg-[#EAA624]/70" />
            </div>
          </header>

          <div className="space-y-5">
            <label className="block">
              <span
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#403C32]/75
                "
              >
                Nombre del invitado
              </span>

              <input
                type="text"
                placeholder="Ej. Familia Hernández"
                value={nombre}
                onChange={(event) => {
                  setNombre(event.target.value);
                  setLink("");
                  setMensajePersonalizado("");
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#EAA624]/30
                  bg-[#FDF4EF]/55
                  px-4
                  py-3.5
                  outline-none
                  transition
                  placeholder:text-[#403C32]/35
                  focus:border-[#767B39]
                  focus:ring-2
                  focus:ring-[#767B39]/15
                "
              />
            </label>

            <label className="block">
              <span
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#403C32]/75
                "
              >
                Número de pases
              </span>

              <input
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="Ej. 2"
                value={pases}
                onChange={(event) => {
                  const valor = event.target.value;

                  if (
                    valor === "" ||
                    /^\d+$/.test(valor)
                  ) {
                    setPases(valor);
                    setLink("");
                    setMensajePersonalizado("");
                  }
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#EAA624]/30
                  bg-[#FDF4EF]/55
                  px-4
                  py-3.5
                  outline-none
                  transition
                  placeholder:text-[#403C32]/35
                  focus:border-[#767B39]
                  focus:ring-2
                  focus:ring-[#767B39]/15
                "
              />
            </label>

            <button
              type="button"
              onClick={generarLink}
              className="
                w-full
                rounded-full
                bg-[#767B39]
                px-6
                py-3.5
                font-playfair
                text-lg
                text-white
                shadow-[0_14px_35px_rgba(118,123,57,0.25)]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#656A31]
              "
            >
              Generar invitación
            </button>
          </div>

          {link && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-9 space-y-7"
            >
              {/* Enlace */}
              <section>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3
                    className="
                      font-playfair
                      text-xl
                      text-[#403C32]
                    "
                  >
                    Enlace codificado
                  </h3>

                  <span
                    className="
                      rounded-full
                      bg-[#767B39]/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-[#767B39]
                    "
                  >
                    Listo
                  </span>
                </div>

                <div
                  className="
                    break-all
                    rounded-xl
                    border
                    border-[#EAA624]/25
                    bg-[#FDF4EF]/65
                    p-4
                    text-sm
                    leading-6
                    text-[#403C32]/80
                  "
                >
                  {link}
                </div>

                <button
                  type="button"
                  onClick={() => copiarTexto(link, "link")}
                  className="
                    mt-3
                    w-full
                    rounded-full
                    border
                    border-[#767B39]
                    px-6
                    py-3
                    font-semibold
                    text-[#767B39]
                    transition
                    hover:bg-[#767B39]
                    hover:text-white
                  "
                >
                  {copiado === "link"
                    ? "Enlace copiado ✓"
                    : "Copiar enlace"}
                </button>
              </section>

              {/* Mensaje de WhatsApp */}
              <section>
                <h3
                  className="
                    mb-3
                    font-playfair
                    text-xl
                    text-[#403C32]
                  "
                >
                  Mensaje para WhatsApp
                </h3>

                <textarea
                  rows={10}
                  value={mensajeWhatsApp}
                  onChange={(event) =>
                    setMensajePersonalizado(event.target.value)
                  }
                  className="
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-[#EAA624]/25
                    bg-[#FDF4EF]/65
                    p-4
                    text-sm
                    leading-7
                    text-[#403C32]
                    outline-none
                    transition
                    focus:border-[#767B39]
                    focus:ring-2
                    focus:ring-[#767B39]/15
                  "
                />

                <p className="mt-2 text-xs leading-5 text-[#403C32]/55">
                  Puedes editar este mensaje antes de copiarlo.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    copiarTexto(mensajeWhatsApp, "mensaje")
                  }
                  className="
                    mt-4
                    w-full
                    rounded-full
                    bg-[#403C32]
                    px-6
                    py-3.5
                    font-playfair
                    text-lg
                    text-white
                    transition
                    hover:bg-black
                  "
                >
                  {copiado === "mensaje"
                    ? "Mensaje copiado ✓"
                    : "Copiar mensaje de WhatsApp"}
                </button>
              </section>

              <button
                type="button"
                onClick={limpiarFormulario}
                className="
                  w-full
                  py-2
                  text-sm
                  font-semibold
                  text-[#C85555]
                  transition
                  hover:opacity-70
                "
              >
                Crear otra invitación
              </button>
            </motion.div>
          )}
        </section>
      </motion.div>
    </main>
  );
}