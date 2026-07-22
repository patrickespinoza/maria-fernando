import React, { useEffect, useRef, useState } from "react";

export default function Musica() {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [audioHabilitado, setAudioHabilitado] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    const manejarReproduccion = () => setReproduciendo(true);
    const manejarPausa = () => setReproduciendo(false);

    audio.addEventListener("play", manejarReproduccion);
    audio.addEventListener("pause", manejarPausa);

    return () => {
      audio.removeEventListener("play", manejarReproduccion);
      audio.removeEventListener("pause", manejarPausa);
    };
  }, []);

  const activarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      setCargando(true);

      await audio.play();

      setAudioHabilitado(true);
      setMostrarModal(false);
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);
    } finally {
      setCargando(false);
    }
  };

  const continuarSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
    }

    setAudioHabilitado(false);
    setMostrarModal(false);
  };

  const alternarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setAudioHabilitado(true);
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("No se pudo cambiar el estado del audio:", error);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/musica.mp3" type="audio/mpeg" />
        Tu navegador no admite reproducción de audio.
      </audio>

      {/* Ventana inicial */}
      {mostrarModal && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black/55
            px-5
            backdrop-blur-sm
          "
        >
          <div
            className="
              relative
              w-full max-w-md
              overflow-hidden
              rounded-[2rem]
              border border-[#EAA624]/30
              bg-[#FDF4EF]
              px-7 py-10
              text-center
              shadow-[0_25px_80px_rgba(0,0,0,0.35)]
              sm:px-10
            "
          >
            {/* Detalles decorativos */}
            <div className="absolute left-6 top-6 h-14 w-14 rounded-tl-[1.5rem] border-l border-t border-[#767B39]/35" />

            <div className="absolute bottom-6 right-6 h-14 w-14 rounded-br-[1.5rem] border-b border-r border-[#767B39]/35" />

            <div
              className="
                mx-auto mb-6
                flex h-16 w-16
                items-center justify-center
                rounded-full
                border border-[#EAA624]/35
                bg-white/70
                text-[#767B39]
                shadow-sm
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <path
                  d="M9 18V5l10-2v13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="6"
                  cy="18"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <circle
                  cx="16"
                  cy="16"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <p
              className="
                mb-3
                text-xs
                uppercase
                tracking-[0.4em]
                text-[#C85555]
              "
            >
              Una experiencia especial
            </p>

            <h2
              className="
                font-playfair
                text-3xl
                text-[#767B39]
                sm:text-4xl
              "
            >
              ¿Deseas escuchar nuestra canción?
            </h2>

            <div className="mx-auto my-6 h-px w-20 bg-[#EAA624]/70" />

            <p
              className="
                mx-auto mb-8
                max-w-sm
                font-playfair
                text-base
                leading-relaxed
                text-[#403C32]/80
              "
            >
              Hemos elegido una melodía especial para acompañarte durante
              nuestro recorrido.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={activarMusica}
                disabled={cargando}
                className="
                  w-full
                  rounded-full
                  bg-[#767B39]
                  px-6 py-4
                  font-playfair
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-white
                  shadow-lg
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#656a31]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {cargando ? "Iniciando..." : "Sí, escuchar música"}
              </button>

              <button
                type="button"
                onClick={continuarSinMusica}
                className="
                  w-full
                  rounded-full
                  border border-[#C85555]/45
                  bg-transparent
                  px-6 py-4
                  font-playfair
                  text-sm
                  uppercase
                  tracking-[0.18em]
                  text-[#C85555]
                  transition
                  duration-300
                  hover:bg-[#C85555]
                  hover:text-white
                "
              >
                Continuar sin música
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      {!mostrarModal && audioHabilitado && (
        <button
          type="button"
          onClick={alternarMusica}
          aria-label={
            reproduciendo ? "Pausar música" : "Reproducir música"
          }
          title={reproduciendo ? "Pausar música" : "Reproducir música"}
          className="
            fixed bottom-6 right-5 z-[9998]
            flex h-14 w-14
            items-center justify-center
            rounded-full
            border border-[#EAA624]/40
            bg-[#767B39]
            text-white
            shadow-[0_10px_30px_rgba(64,60,50,0.3)]
            transition
            duration-300
            hover:scale-105
            hover:bg-[#656a31]
            sm:bottom-8 sm:right-8
          "
        >
          {reproduciendo ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M9 6v12M15 6v12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="ml-0.5 h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M8 5.5v13l10-6.5L8 5.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {reproduciendo && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#767B39]/30" />
          )}
        </button>
      )}
    </>
  );
}