import React from "react";
import { motion } from "framer-motion";

const Novios = ({
  novia = "María Concepción Tlalolini Samperio",
  novio = "Fernando Salamanca Martínez",

  padreNovia = "María Concepción Samperio Tepale",
  madreNovia = "José G. Tlalolini Fernández",

  padreNovio = "Cecilia Martínez González",
  madreNovio = "Fernando Salamanca Villegas",
}) => {
  const gruposPadres = [
    {
      titulo: "Padres de la novia",
      padre: padreNovia,
      madre: madreNovia,
    },
    {
      titulo: "Padres del novio",
      padre: padreNovio,
      madre: madreNovio,
    },
  ];

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
          h-64
          w-64
          rounded-full
          bg-[#F7BCB0]/25
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
          bg-[#AADCF2]/20
          blur-3xl
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
          overflow-hidden
          rounded-[2.5rem]
          border
          border-[#767B39]/20
          bg-white/75
          px-6
          py-14
          text-center
          shadow-[0_25px_70px_rgba(64,60,50,0.13)]
          backdrop-blur-md
          sm:px-10
          sm:py-16
          md:px-14
          lg:px-20
        "
      >
        {/* Marco interior */}
        <div
          className="
            pointer-events-none
            absolute
            inset-4
            rounded-[2rem]
            border
            border-[#EAA624]/20
          "
        />

        {/* Esquinas */}
        <div
          className="
            pointer-events-none
            absolute
            left-7
            top-7
            h-16
            w-16
            border-l
            border-t
            border-[#767B39]/35
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-7
            right-7
            h-16
            w-16
            border-b
            border-r
            border-[#767B39]/35
          "
        />

        <div className="relative z-10">
          {/* Encabezado */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 0.9 }}
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
            Con amor y gratitud
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="
              mt-6
              font-playfair
              text-3xl
              leading-tight
              text-[#767B39]
              sm:text-4xl
              md:text-5xl
            "
          >
            Celebramos el comienzo de nuestra historia
          </motion.h2>

          {/* Novios */}
          <div className="mt-12">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25 }}
              viewport={{ once: true }}
              className="
                font-cursiveDancing
                text-6xl
                leading-none
                text-[#C85555]
                sm:text-7xl
                md:text-8xl
              "
            >
              {novia}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              viewport={{ once: true }}
              className="my-4 flex items-center justify-center gap-4"
            >
              <div className="h-px w-12 bg-[#EAA624]/70 sm:w-20" />

              <span
                className="
                  font-playfair
                  text-3xl
                  italic
                  text-[#767B39]
                  sm:text-4xl
                "
              >
                &
              </span>

              <div className="h-px w-12 bg-[#EAA624]/70 sm:w-20" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.45 }}
              viewport={{ once: true }}
              className="
                font-cursiveDancing
                text-6xl
                leading-none
                text-[#C85555]
                sm:text-7xl
                md:text-8xl
              "
            >
              {novio}
            </motion.h1>
          </div>

          {/* Separador */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "7rem" }}
            transition={{ duration: 0.9, delay: 0.55 }}
            viewport={{ once: true }}
            className="
              mx-auto
              mt-12
              h-px
              bg-[#EAA624]
            "
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            viewport={{ once: true }}
            className="
              mt-8
              font-cursiveDancing
              text-3xl
              text-[#403C32]
              sm:text-4xl
            "
          >
            Con la bendición de nuestros padres
          </motion.p>

          {/* Padres */}
          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-4xl
              grid-cols-1
              gap-6
              md:grid-cols-2
            "
          >
            {gruposPadres.map((grupo, index) => (
              <motion.article
                key={grupo.titulo}
                initial={{
                  opacity: 0,
                  x: index === 0 ? -30 : 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.75 + index * 0.15,
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-[#767B39]/15
                  bg-[#FDF4EF]
                  px-6
                  py-8
                  shadow-[0_12px_30px_rgba(64,60,50,0.08)]
                  sm:px-8
                "
              >
                <div
                  className="
                    absolute
                    left-1/2
                    top-0
                    h-1
                    w-20
                    -translate-x-1/2
                    rounded-b-full
                    bg-[#C85555]
                  "
                />

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#767B39]
                  "
                >
                  {grupo.titulo}
                </p>

                <div className="mx-auto my-5 h-px w-12 bg-[#EAA624]/70" />

                <p
                  className="
                    font-playfair
                    text-xl
                    leading-relaxed
                    text-[#403C32]
                    sm:text-2xl
                  "
                >
                  {grupo.padre}
                </p>

                <p
                  className="
                    mt-2
                    font-playfair
                    text-xl
                    leading-relaxed
                    text-[#403C32]
                    sm:text-2xl
                  "
                >
                  {grupo.madre}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Novios;