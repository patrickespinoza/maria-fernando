import React from "react";
import { motion } from "framer-motion";

const Regalos = () => {
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
          top-10
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
          amount: 0.08,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-4xl
        "
      >
        {/* Línea decorativa superior */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#EAA624]/60 sm:w-24" />

          <span
            className="
              h-2
              w-2
              rotate-45
              border
              border-[#C85555]
            "
          />

          <span className="h-px w-12 bg-[#EAA624]/60 sm:w-24" />
        </div>

        {/* Contenido principal */}
        <div
          className="
            relative
            mx-auto
            max-w-3xl
            px-5
            py-12
            text-center
            sm:px-12
            sm:py-16
          "
        >
          {/* Esquinas clásicas */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-20
              w-20
              border-l
              border-t
              border-[#EAA624]/60
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              h-20
              w-20
              border-r
              border-t
              border-[#EAA624]/60
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              h-20
              w-20
              border-b
              border-l
              border-[#EAA624]/60
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              right-0
              h-20
              w-20
              border-b
              border-r
              border-[#EAA624]/60
            "
          />

          {/* Texto superior */}
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
            Sugerencia de regalo
          </motion.p>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.08,
            }}
            viewport={{ once: true }}
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
            Lluvia de Sobres
          </motion.h2>

          {/* Separador */}
          <div className="mx-auto my-7 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-[#EAA624]/70 sm:w-20" />

            <span className="h-2 w-2 rotate-45 bg-[#C85555]" />

            <span className="h-px w-14 bg-[#EAA624]/70 sm:w-20" />
          </div>

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            viewport={{ once: true }}
            className="
              relative
              mx-auto
              mt-8
              flex
              h-36
              w-36
              items-center
              justify-center
              sm:h-40
              sm:w-40
            "
          >
            {/* Círculo decorativo */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#EAA624]/35
                bg-white/50
                backdrop-blur-sm
              "
            />

            <div
              className="
                absolute
                inset-3
                rounded-full
                border
                border-[#767B39]/15
              "
            />

            <motion.img
              src="/regalo1.png"
              alt="Lluvia de sobres"
              whileHover={{
                scale: 1.05,
                rotate: 2,
              }}
              transition={{ duration: 0.3 }}
              className="
                relative
                z-10
                h-24
                w-24
                object-contain
                sm:h-28
                sm:w-28
              "
            />
          </motion.div>

          {/* Mensaje */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.22,
            }}
            viewport={{ once: true }}
            className="
              mx-auto
              mt-9
              max-w-2xl
            "
          >
            <p
              className="
                font-playfair
                text-xl
                leading-relaxed
                text-[#403C32]
                sm:text-2xl
              "
            >
              Tu presencia es nuestro mejor regalo.
            </p>

            <p
              className="
                mx-auto
                mt-5
                max-w-xl
                text-base
                leading-8
                text-[#403C32]/75
                sm:text-lg
              "
            >
              Si deseas obsequiarnos un detalle, tendremos disponible una urna
              durante el evento para recibirlo con mucho cariño.
            </p>
          </motion.div>

          {/* Elemento final */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            className="
              mt-10
              font-cursiveDancing
              text-2xl
              text-[#C85555]
              sm:text-3xl
            "
          >
            Gracias por acompañarnos
          </motion.div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#EAA624]/60 sm:w-24" />

          <span
            className="
              h-2
              w-2
              rotate-45
              border
              border-[#767B39]
            "
          />

          <span className="h-px w-12 bg-[#EAA624]/60 sm:w-24" />
        </div>
      </motion.div>
    </section>
  );
};

export default Regalos;