import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({
  intervalo = 4500,
  posiciones = [
    "center center",
    "center center",
    "center 100%",
    "center center",
    "center 100%",
    "center center",
    "center center",
  ],
}) => {
  const images = [
    "/Carrusell01.JPEG",
    "/Carrusel02.JPEG",
    "/Carrusel03.JPEG",
    "/Carrusel04.JPEG",
    "/Carrusel05.JPEG",
    "/Carrusel06.JPEG",
    "/Carrusel07.JPEG",
  ];

  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalo);

    return () => clearInterval(timer);
  }, [intervalo, pausado, images.length]);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const irAImagen = (nuevoIndex) => {
    setIndex(nuevoIndex);
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
      {/* Decoración de fondo */}
      <div
        className="
          pointer-events-none
          absolute
          -left-28
          top-20
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
          bottom-8
          h-72
          w-72
          rounded-full
          bg-[#F7BCB0]/20
          blur-3xl
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.05,
        }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        {/* Encabezado */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#C85555]
              sm:text-sm
            "
          >
            Nuestra historia
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true }}
            className="
              mt-5
              font-playfair
              text-5xl
              text-[#767B39]
              sm:text-6xl
              md:text-7xl
            "
          >
            Momentos
          </motion.h2>

          <div className="mx-auto my-7 flex items-center justify-center gap-4">
            <div className="h-px w-14 bg-[#EAA624]/65 sm:w-20" />

            <span className="h-2 w-2 rotate-45 bg-[#C85555]" />

            <div className="h-px w-14 bg-[#EAA624]/65 sm:w-20" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="
              font-playfair
              text-base
              leading-relaxed
              text-[#403C32]/75
              sm:text-lg
            "
          >
            Cada fotografía guarda un recuerdo que permanecerá para siempre.
          </motion.p>
        </div>

        {/* Área editorial */}
        <div
          className="
            relative
            mx-auto
            max-w-5xl
            px-0
            sm:px-8
            md:px-14
          "
        >
          {/* Línea superior */}
          <div className="mb-7 flex items-center gap-5">
            <span className="h-px flex-1 bg-[#767B39]/20" />

            <span
              className="
                font-playfair
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#767B39]/70
              "
            >
              María & Fernando
            </span>

            <span className="h-px flex-1 bg-[#767B39]/20" />
          </div>

          {/* Marco exterior */}
          <div className="relative mx-auto max-w-4xl p-3 sm:p-4">
            {/* Esquinas clásicas */}
            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                h-16
                w-16
                border-l
                border-t
                border-[#EAA624]/65
                sm:h-20
                sm:w-20
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                h-16
                w-16
                border-r
                border-t
                border-[#EAA624]/65
                sm:h-20
                sm:w-20
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-0
                h-16
                w-16
                border-b
                border-l
                border-[#EAA624]/65
                sm:h-20
                sm:w-20
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                right-0
                h-16
                w-16
                border-b
                border-r
                border-[#EAA624]/65
                sm:h-20
                sm:w-20
              "
            />

            {/* Contenedor principal */}
            <div
              className="
                relative
                overflow-hidden
                border
                border-[#767B39]/15
                bg-[#E8E1D8]
                shadow-[0_20px_60px_rgba(64,60,50,0.12)]
              "
              onMouseEnter={() => setPausado(true)}
              onMouseLeave={() => setPausado(false)}
              onTouchStart={() => setPausado(true)}
              onTouchEnd={() => setPausado(false)}
            >
              {/* Imágenes */}
              <div
                className="
                  relative
                  h-[440px]
                  w-full
                  overflow-hidden
                  sm:h-[570px]
                  md:h-[680px]
                  lg:h-[720px]
                "
              >
                {images.map((imagen, imageIndex) => (
                  <motion.img
                    key={imagen}
                    src={imagen}
                    alt={`Momento ${imageIndex + 1} de María y Fernando`}
                    initial={false}
                    animate={{
                      opacity: index === imageIndex ? 1 : 0,
                      scale: index === imageIndex ? 1 : 1.015,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.65,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 1,
                        ease: "easeOut",
                      },
                    }}
                    loading="eager"
                    decoding="async"
                    draggable="false"
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                    style={{
                      objectPosition:
                        posiciones[imageIndex] || "center center",
                      zIndex: index === imageIndex ? 2 : 1,
                    }}
                  />
                ))}

                {/* Degradado */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-10
                    bg-gradient-to-t
                    from-black/20
                    via-transparent
                    to-transparent
                  "
                />

                {/* Contador */}
                <div
                  className="
                    absolute
                    bottom-5
                    right-5
                    z-20
                    border
                    border-white/35
                    bg-black/15
                    px-4
                    py-2
                    text-xs
                    tracking-[0.25em]
                    text-white
                    backdrop-blur-md
                  "
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </div>
              </div>

              {/* Botón izquierda */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Ver fotografía anterior"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/45
                  bg-[#767B39]/85
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  transition
                  duration-300
                  hover:scale-105
                  hover:bg-[#656A31]
                  sm:left-5
                  sm:h-12
                  sm:w-12
                "
              >
                <FaChevronLeft size={16} />
              </button>

              {/* Botón derecha */}
              <button
                type="button"
                onClick={nextImage}
                aria-label="Ver siguiente fotografía"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/45
                  bg-[#767B39]/85
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  transition
                  duration-300
                  hover:scale-105
                  hover:bg-[#656A31]
                  sm:right-5
                  sm:h-12
                  sm:w-12
                "
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Indicadores */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {images.map((imagen, imageIndex) => (
              <button
                key={`${imagen}-${imageIndex}`}
                type="button"
                onClick={() => irAImagen(imageIndex)}
                aria-label={`Ver fotografía ${imageIndex + 1}`}
                aria-current={
                  index === imageIndex ? "true" : undefined
                }
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                "
              >
                <motion.span
                  animate={{
                    rotate: index === imageIndex ? 45 : 0,
                    scale: index === imageIndex ? 1 : 0.7,
                    backgroundColor:
                      index === imageIndex ? "#C85555" : "#767B39",
                    opacity: index === imageIndex ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.25 }}
                  className="block h-2.5 w-2.5"
                />
              </button>
            ))}
          </div>

          {/* Línea inferior */}
          <div className="mt-8 flex items-center gap-5">
            <span className="h-px flex-1 bg-[#767B39]/20" />

            <span className="h-2 w-2 rotate-45 border border-[#EAA624]" />

            <span className="h-px flex-1 bg-[#767B39]/20" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Carousel;