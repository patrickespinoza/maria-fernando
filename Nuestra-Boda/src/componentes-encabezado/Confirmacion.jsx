import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const Confirmacion = () => {
  // =====================================================
  // CONFIGURACIÓN
  // =====================================================

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxTMDozwzzH1EZmkHpUj1-mFydvfNZ0ZCKQPZsbcOkPaHJimfxEADlcoPVVsPm2Jj0AVg/exec";

  // Escribe el número con código de país, sin +, espacios ni guiones.
  // Ejemplo México: 5215512345678
  const NUMERO_WHATSAPP = "522221745910";

  // =====================================================
  // ESTADOS
  // =====================================================

  const [nombreInvitado, setNombreInvitado] = useState("");
  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");

  const [pasesAsignados, setPasesAsignados] = useState(0);
  const [datosDesdeGenerador, setDatosDesdeGenerador] =
    useState(false);

  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // =====================================================
  // DECODIFICAR URL CIFRADA
  // =====================================================
  /*
    Este lector funciona con un generador que crea el ID así:

    const datos = {
      nombre: "Familia Pérez",
      pases: 4,
    };

    const json = JSON.stringify(datos);
    const invertido = json.split("").reverse().join("");
    const id = btoa(unescape(encodeURIComponent(invertido)));

    URL:
    https://tudominio.com/?id=EL_ID_GENERADO
  */

  const decodificarId = (id) => {
    try {
      const idNormalizado = id
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const paddingNecesario =
        (4 - (idNormalizado.length % 4)) % 4;

      const idConPadding =
        idNormalizado + "=".repeat(paddingNecesario);

      const base64Decodificado = decodeURIComponent(
        escape(window.atob(idConPadding))
      );

      const jsonOriginal = base64Decodificado
        .split("")
        .reverse()
        .join("");

      const datos = JSON.parse(jsonOriginal);

      return datos;
    } catch (error) {
      console.error("No se pudo descifrar el ID:", error);
      return null;
    }
  };

  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (id) {
      const datos = decodificarId(id);

      if (datos) {
        const nombre =
          datos.nombre ||
          datos.invitado ||
          datos.nombreInvitado ||
          "";

        const pases = Number(
          datos.pases ||
            datos.invitados ||
            datos.numeroPases ||
            0
        );

        if (nombre) {
          setNombreInvitado(nombre);
          setDatosDesdeGenerador(true);
        }

        if (Number.isFinite(pases) && pases > 0) {
          setPasesAsignados(Math.floor(pases));
        }

        return;
      }

      setError(
        "El enlace de invitación no es válido o está incompleto."
      );
      return;
    }

    // Compatibilidad opcional con enlaces sin cifrar:
    // ?nombre=Familia%20Pérez&pases=4

    const nombreURL = parametros.get("nombre");
    const pasesURL = Number(parametros.get("pases"));

    if (nombreURL) {
      setNombreInvitado(nombreURL);
      setDatosDesdeGenerador(true);
    }

    if (Number.isFinite(pasesURL) && pasesURL > 0) {
      setPasesAsignados(Math.floor(pasesURL));
    }
  }, []);

  // =====================================================
  // OPCIONES DE PASES
  // =====================================================

  const opcionesInvitados = useMemo(() => {
    if (pasesAsignados <= 0) return [];

    return Array.from(
      { length: pasesAsignados },
      (_, index) => index + 1
    );
  }, [pasesAsignados]);

  // =====================================================
  // SELECCIONAR ASISTENCIA
  // =====================================================

  const seleccionarAsistencia = (respuesta) => {
    setAsistencia(respuesta);
    setError("");
    setEnviado(false);

    if (respuesta === "No podré asistir") {
      setInvitados("0");
      return;
    }

    if (
      respuesta === "Sí asistiré" &&
      pasesAsignados === 1
    ) {
      setInvitados("1");
    }

    if (
      respuesta === "Sí asistiré" &&
      invitados === "0"
    ) {
      setInvitados("");
    }
  };

  // =====================================================
  // CONSTRUIR MENSAJE PARA WHATSAPP
  // =====================================================

  const construirMensajeWhatsApp = () => {
    const cantidad =
      asistencia === "Sí asistiré"
        ? invitados || "Sin especificar"
        : "0";

    const mensaje = [
      "Hola, deseo confirmar mi asistencia.",
      "",
      `Nombre: ${nombreInvitado.trim()}`,
      `Asistencia: ${asistencia}`,
      `Número de asistentes: ${cantidad}`,
      mensajeInvitado.trim()
        ? `Mensaje: ${mensajeInvitado.trim()}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    return mensaje;
  };

  // =====================================================
  // VALIDACIÓN
  // =====================================================

  const validarFormulario = () => {
    if (!nombreInvitado.trim()) {
      return "Escribe el nombre del invitado.";
    }

    if (!asistencia) {
      return "Selecciona si podrás asistir.";
    }

    if (
      asistencia === "Sí asistiré" &&
      (!invitados || Number(invitados) < 1)
    ) {
      return "Selecciona cuántas personas asistirán.";
    }

    if (
      pasesAsignados > 0 &&
      Number(invitados) > pasesAsignados
    ) {
      return `Esta invitación tiene un máximo de ${pasesAsignados} ${
        pasesAsignados === 1 ? "pase" : "pases"
      }.`;
    }

    return "";
  };

  // =====================================================
  // ENVIAR A EXCEL Y DESPUÉS ABRIR WHATSAPP
  // =====================================================

  const enviarConfirmacion = async () => {
    // Segunda protección contra clics repetidos
    if (enviando) return;

    const errorValidacion = validarFormulario();

    if (errorValidacion) {
      setError(errorValidacion);
      setEnviado(false);
      return;
    }

    setError("");
    setEnviado(false);
    setEnviando(true);

    const cantidadConfirmada =
      asistencia === "Sí asistiré"
        ? Number(invitados)
        : 0;

    const data = {
      nombre: nombreInvitado.trim(),
      asistencia,
      invitados: cantidadConfirmada,
      mensaje: mensajeInvitado.trim(),
      pasesAsignados,
      fecha: new Date().toLocaleString("es-MX"),
    };

    try {
      /*
        Se utiliza text/plain para evitar solicitudes OPTIONS
        innecesarias con Google Apps Script.
      */

      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      setEnviado(true);

      const mensajeWhatsApp =
        construirMensajeWhatsApp();

      const enlaceWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;

      /*
        Se abre WhatsApp después de guardar en Excel.
        Cambia "_blank" por "_self" si deseas que abra
        WhatsApp en la misma pestaña.
      */

      window.open(
        enlaceWhatsApp,
        "_blank",
        "noopener,noreferrer"
      );

      // Se conservan el nombre y los pases del generador.
      setMensajeInvitado("");
      setAsistencia("");
      setInvitados("");

      window.setTimeout(() => {
        setEnviado(false);
      }, 5000);
    } catch (error) {
      console.error("Error al enviar la confirmación:", error);

      setError(
        "No fue posible guardar la confirmación. Revisa tu conexión e intenta nuevamente."
      );
    } finally {
      // El botón se habilita nuevamente al terminar.
      setEnviando(false);
    }
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FDF4EF]
        px-5
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* Decoraciones de fondo */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-16
          h-72
          w-72
          rounded-full
          bg-[#AADCF2]/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-0
          h-80
          w-80
          rounded-full
          bg-[#C85555]/10
          blur-3xl
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.05,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-3xl
        "
      >
        {/* Marco clásico */}
        <div
          className="
            relative
            border
            border-[#EAA624]/30
            bg-white/70
            px-6
            py-12
            shadow-[0_24px_70px_rgba(64,60,50,0.12)]
            backdrop-blur-md
            sm:px-12
            sm:py-16
            md:px-16
          "
        >
          {/* Esquinas decorativas */}
          <span
            className="
              pointer-events-none
              absolute
              left-3
              top-3
              h-16
              w-16
              border-l
              border-t
              border-[#EAA624]/75
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              right-3
              top-3
              h-16
              w-16
              border-r
              border-t
              border-[#EAA624]/75
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              bottom-3
              left-3
              h-16
              w-16
              border-b
              border-l
              border-[#EAA624]/75
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              bottom-3
              right-3
              h-16
              w-16
              border-b
              border-r
              border-[#EAA624]/75
            "
          />

          {/* Encabezado */}
          <div className="relative text-center">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#C85555]
                sm:text-sm
              "
            >
              RSVP
            </p>

            <h2
              className="
                mt-5
                font-playfair
                text-4xl
                leading-tight
                text-[#767B39]
                sm:text-5xl
                md:text-6xl
              "
            >
              Confirmar asistencia
            </h2>

            <div className="mx-auto my-7 flex items-center justify-center gap-4">
              <span className="h-px w-14 bg-[#EAA624]/70 sm:w-20" />

              <span className="h-2 w-2 rotate-45 bg-[#C85555]" />

              <span className="h-px w-14 bg-[#EAA624]/70 sm:w-20" />
            </div>

            <p
              className="
                mx-auto
                max-w-xl
                font-playfair
                text-lg
                leading-8
                text-[#403C32]/80
              "
            >
              Por favor confirma tu asistencia. Nos encantará
              compartir este día tan especial contigo.
            </p>

            {pasesAsignados > 0 && (
              <div
                className="
                  mx-auto
                  mt-6
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#767B39]/20
                  bg-[#767B39]/5
                  px-5
                  py-2.5
                  text-sm
                  text-[#403C32]/75
                "
              >
                Se reservaron{" "}
                <strong className="mx-1 text-[#767B39]">
                  {pasesAsignados}
                </strong>{" "}
                {pasesAsignados === 1
                  ? "lugar"
                  : "lugares"}
              </div>
            )}
          </div>

          {/* Formulario */}
          <div className="relative mt-10 space-y-5">
            <div>
              <label
                htmlFor="nombreInvitado"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#403C32]/75
                "
              >
                Nombre del invitado
              </label>

              <input
                id="nombreInvitado"
                type="text"
                placeholder="Nombre y apellido"
                value={nombreInvitado}
                onChange={(event) =>
                  setNombreInvitado(event.target.value)
                }
                readOnly={datosDesdeGenerador}
                disabled={enviando}
                className={`
                  w-full
                  rounded-2xl
                  border
                  px-5
                  py-4
                  text-[#403C32]
                  outline-none
                  transition
                  placeholder:text-[#403C32]/40
                  focus:border-[#767B39]/55
                  focus:ring-2
                  focus:ring-[#767B39]/15
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  ${
                    datosDesdeGenerador
                      ? "border-[#767B39]/20 bg-[#767B39]/5 cursor-not-allowed"
                      : "border-[#767B39]/20 bg-white/85"
                  }
                `}
              />

              {datosDesdeGenerador && (
                <p className="mt-2 text-xs text-[#403C32]/55">
                  Nombre asignado mediante el enlace de invitación.
                </p>
              )}
            </div>

            {/* Asistencia */}
            <div>
              <p
                className="
                  mb-3
                  text-sm
                  font-medium
                  text-[#403C32]/75
                "
              >
                ¿Podrás acompañarnos?
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={enviando}
                  onClick={() =>
                    seleccionarAsistencia("Sí asistiré")
                  }
                  className={`
                    rounded-2xl
                    border
                    py-4
                    font-playfair
                    transition
                    duration-300
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${
                      asistencia === "Sí asistiré"
                        ? "border-[#767B39] bg-[#767B39] text-white shadow-md"
                        : "border-[#767B39]/25 bg-white/75 text-[#403C32] hover:border-[#767B39]/50 hover:bg-white"
                    }
                  `}
                >
                  Sí asistiré
                </button>

                <button
                  type="button"
                  disabled={enviando}
                  onClick={() =>
                    seleccionarAsistencia(
                      "No podré asistir"
                    )
                  }
                  className={`
                    rounded-2xl
                    border
                    py-4
                    font-playfair
                    transition
                    duration-300
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${
                      asistencia === "No podré asistir"
                        ? "border-[#C85555] bg-[#C85555] text-white shadow-md"
                        : "border-[#C85555]/25 bg-white/75 text-[#403C32] hover:border-[#C85555]/50 hover:bg-white"
                    }
                  `}
                >
                  No podré asistir
                </button>
              </div>
            </div>

            {/* Cantidad de asistentes */}
            {asistencia === "Sí asistiré" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="invitados"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#403C32]/75
                  "
                >
                  Número de personas que asistirán
                </label>

                {pasesAsignados > 0 ? (
                  <select
                    id="invitados"
                    value={invitados}
                    disabled={enviando}
                    onChange={(event) =>
                      setInvitados(event.target.value)
                    }
                    className="
                      w-full
                      appearance-none
                      rounded-2xl
                      border
                      border-[#767B39]/20
                      bg-white/85
                      px-5
                      py-4
                      text-[#403C32]
                      outline-none
                      transition
                      focus:border-[#767B39]/55
                      focus:ring-2
                      focus:ring-[#767B39]/15
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <option value="">
                      Selecciona una cantidad
                    </option>

                    {opcionesInvitados.map((cantidad) => (
                      <option
                        key={cantidad}
                        value={cantidad}
                      >
                        {cantidad}{" "}
                        {cantidad === 1
                          ? "persona"
                          : "personas"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="invitados"
                    type="number"
                    min="1"
                    value={invitados}
                    disabled={enviando}
                    placeholder="Número de personas"
                    onChange={(event) =>
                      setInvitados(event.target.value)
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#767B39]/20
                      bg-white/85
                      px-5
                      py-4
                      text-[#403C32]
                      outline-none
                      transition
                      placeholder:text-[#403C32]/40
                      focus:border-[#767B39]/55
                      focus:ring-2
                      focus:ring-[#767B39]/15
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                )}
              </motion.div>
            )}

            {/* Mensaje */}
            <div>
              <label
                htmlFor="mensajeInvitado"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#403C32]/75
                "
              >
                Mensaje para los novios
                <span className="ml-1 text-[#403C32]/45">
                  (opcional)
                </span>
              </label>

              <textarea
                id="mensajeInvitado"
                value={mensajeInvitado}
                disabled={enviando}
                onChange={(event) =>
                  setMensajeInvitado(event.target.value)
                }
                placeholder="Escribe un mensaje especial"
                rows={4}
                className="
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-[#767B39]/20
                  bg-white/85
                  px-5
                  py-4
                  text-[#403C32]
                  outline-none
                  transition
                  placeholder:text-[#403C32]/40
                  focus:border-[#767B39]/55
                  focus:ring-2
                  focus:ring-[#767B39]/15
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="
                  rounded-xl
                  border
                  border-[#C85555]/30
                  bg-[#C85555]/10
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-[#8E3D3D]
                "
              >
                {error}
              </motion.p>
            )}

            {/* Confirmación */}
            {enviado && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="
                  rounded-xl
                  border
                  border-[#767B39]/30
                  bg-[#767B39]/10
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-[#5E632E]
                "
              >
                Confirmación guardada correctamente. Se abrió
                WhatsApp para completar el envío.
              </motion.p>
            )}

            {/* Botón */}
            <button
              type="button"
              onClick={enviarConfirmacion}
              disabled={enviando}
              aria-busy={enviando}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#767B39]
                px-6
                py-4
                font-playfair
                text-lg
                text-white
                shadow-[0_16px_35px_rgba(118,123,57,0.28)]
                transition
                duration-300
                hover:bg-[#656A31]
                hover:shadow-[0_18px_40px_rgba(118,123,57,0.35)]
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:bg-[#767B39]
              "
            >
              {enviando && (
                <span
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-white/35
                    border-t-white
                  "
                />
              )}

              {enviando
                ? "Guardando confirmación..."
                : "Confirmar Asistencia"}
            </button>

            <p
              className="
                text-center
                text-xs
                leading-5
                text-[#403C32]/50
              "
            >
              Tu respuesta se guardará y después se abrirá
              WhatsApp con los datos de tu confirmación.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Confirmacion;