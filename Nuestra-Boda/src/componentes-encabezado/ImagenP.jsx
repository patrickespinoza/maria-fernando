import React from "react";
import { motion } from "framer-motion";

const SeparadorFrase = ({
  imagen = "/Iprincipal.JPEG",
  frase = "Sea cual sea la materia de que estén hechas nuestras almas, la suya y la mía son la misma.",
}) => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FDF4EF]
        px-5
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* Decoración de fondo */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-10
          h-64
          w-64
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
          h-72
          w-72
          rounded-full
          bg-[#C85555]/10
          blur-3xl
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.12,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
        "
      >
        <div
          className="
            grid
            overflow-hidden
            border
            border-[#EAA624]/30
            bg-white/70
            shadow-[0_24px_70px_rgba(64,60,50,0.13)]
            backdrop-blur-md
            lg:grid-cols-2
          "
        >
          {/* Imagen */}
          <div
            className="
              relative
              min-h-[340px]
              overflow-hidden
              sm:min-h-[430px]
              lg:min-h-[580px]
            "
          >
            <motion.img
              src={imagen}
              alt="Mensaje especial"
              loading="lazy"
              initial={{
                scale: 1.06,
              }}
              whileInView={{
                scale: 1,
              }}
              transition={{
                duration: 1.1,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
              }}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            {/* Oscurecimiento sutil */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-[#403C32]/25
                via-transparent
                to-transparent
              "
            />

            {/* Número editorial */}
            <div
              className="
                absolute
                bottom-5
                left-5
                border
                border-white/40
                bg-black/15
                px-4
                py-2
                font-playfair
                text-sm
                tracking-[0.25em]
                text-white
                backdrop-blur-md
              "
            >
              PARA SIEMPRE
            </div>
          </div>

          {/* Frase */}
          <div
            className="
              relative
              flex
              min-h-[400px]
              items-center
              justify-center
              px-7
              py-14
              text-center
              sm:px-12
              sm:py-16
              lg:min-h-[580px]
              lg:px-16
            "
          >
            {/* Esquinas decorativas */}
            <span
              className="
                pointer-events-none
                absolute
                left-4
                top-4
                h-16
                w-16
                border-l
                border-t
                border-[#EAA624]/60
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                right-4
                top-4
                h-16
                w-16
                border-r
                border-t
                border-[#EAA624]/60
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                bottom-4
                left-4
                h-16
                w-16
                border-b
                border-l
                border-[#EAA624]/60
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                bottom-4
                right-4
                h-16
                w-16
                border-b
                border-r
                border-[#EAA624]/60
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="relative max-w-xl"
            >
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
                Nuestra decisión
              </p>

              <div className="mx-auto my-7 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-[#EAA624]/65 sm:w-16" />

                <span className="h-2 w-2 rotate-45 bg-[#767B39]" />

                <span className="h-px w-12 bg-[#EAA624]/65 sm:w-16" />
              </div>

              <p
                className="
                  font-playfair
                  text-2xl
                  leading-[1.7]
                  text-[#403C32]
                  sm:text-3xl
                  lg:text-[2rem]
                "
              >
                “{frase}”
              </p>

              <p
                className="
                  mt-9
                  font-cursiveDancing
                  text-xl
                  text-[#C85555]
                  sm:text-4xl
                "
              >
                Con inmensa alegría, tenemos el honor de invitarte a celebrar nuestra boda por el civil. Tu presencia hará de este día un recuerdo inolvidable.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SeparadorFrase;