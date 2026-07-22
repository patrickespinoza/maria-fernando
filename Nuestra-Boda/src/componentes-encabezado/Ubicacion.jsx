import React from "react";
import { motion } from "framer-motion";

const Celebracion = ({
  fecha = "03 Octubre 2026",

  eventoUno = "Ceremonia Civil",
  horaEventoUno = "17:00 Hrs",

  eventoDos = "Recepción",
  horaEventoDos = "18:00 Hrs",

  lugar = "Salón Acrofest",
  direccion = "Allende 514 72760, Santiago Momoxpan, 72760 Santiago Momoxpan, Pue.",

  ubicacion = "https://maps.app.goo.gl/7NAnrFaocAPJeQ4KA?g_st=ic",
}) => {
  const eventos = [
    {
      titulo: eventoUno,
      hora: horaEventoUno,
      
    },
    {
      titulo: eventoDos,
      hora: horaEventoDos,
      
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
      {/* Decoración de fondo */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-16
          h-64
          w-64
          rounded-full
          bg-[#AADCF2]/25
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-10
          h-72
          w-72
          rounded-full
          bg-[#F7BCB0]/25
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
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
          overflow-hidden
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-2xl
          rounded-bl-2xl
          border
          border-[#767B39]/20
          bg-white/75
          px-6
          py-14
          text-center
          shadow-[0_25px_70px_rgba(64,60,50,0.14)]
          backdrop-blur-md
          sm:px-10
          sm:py-16
          md:px-14
        "
      >
        {/* Esquinas decorativas */}
        <div
          className="
            pointer-events-none
            absolute
            left-5
            top-5
            h-16
            w-16
            rounded-tl-[2.5rem]
            border-l
            border-t
            border-[#EAA624]/45
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-5
            right-5
            h-16
            w-16
            rounded-br-[2.5rem]
            border-b
            border-r
            border-[#EAA624]/45
          "
        />

        {/* Encabezado */}
        <p
          className="
            mb-4
            text-xs
            font-semibold
            uppercase
            tracking-[0.4em]
            text-[#C85555]
            sm:text-sm
          "
        >
          Nuestra celebración
        </p>

        <h2
          className="
            font-playfair
            text-4xl
            text-[#767B39]
            sm:text-5xl
            md:text-6xl
          "
        >
          Un mismo lugar, dos momentos especiales
        </h2>

        <div className="mx-auto my-7 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#EAA624]/70 sm:w-20" />

          <div className="h-2 w-2 rotate-45 bg-[#C85555]" />

          <div className="h-px w-12 bg-[#EAA624]/70 sm:w-20" />
        </div>

        <p
          className="
            font-playfair
            text-xl
            tracking-[0.08em]
            text-[#403C32]
            sm:text-2xl
          "
        >
          {fecha}
        </p>

        {/* Eventos */}
        <div
          className="
            mx-auto
            mt-10
            grid
            max-w-3xl
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >
          {eventos.map((evento, index) => (
            <motion.article
              key={`${evento.titulo}-${evento.hora}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-[#767B39]/20
                bg-[#FDF4EF]
                px-6
                py-8
                shadow-[0_14px_35px_rgba(64,60,50,0.09)]
              "
            >


              <p
                className="
                  mb-3
                  text-xs
                  uppercase
                  tracking-[0.32em]
                  text-[#C85555]
                "
              >
                Evento {evento.numero}
              </p>

              <h3
                className="
                  font-playfair
                  text-2xl
                  text-[#767B39]
                  sm:text-3xl
                "
              >
                {evento.titulo}
              </h3>

              <div className="mx-auto my-5 h-px w-12 bg-[#EAA624]/70" />

              <p
                className="
                  font-playfair
                  text-2xl
                  text-[#403C32]
                  sm:text-3xl
                "
              >
                {evento.hora}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Ubicación compartida */}
        <div
          className="
            mx-auto
            mt-12
            max-w-3xl
            border-t
            border-[#767B39]/15
            pt-10
          "
        >
          <p
            className="
              mb-3
              font-cursiveDancing
              text-4xl
              text-[#C85555]
              sm:text-5xl
            "
          >
            Mismo lugar
          </p>

          <h3
            className="
              font-playfair
              text-2xl
              text-[#767B39]
              sm:text-3xl
            "
          >
            {lugar}
          </h3>


          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-relaxed
              text-[#403C32]/75
              sm:text-lg
            "
          >
            {direccion}
          </p>

          <a
            href={ubicacion}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-9
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-[#767B39]
              px-9
              py-4
              font-playfair
              text-base
              tracking-[0.08em]
              text-white
              shadow-[0_15px_35px_rgba(118,123,57,0.28)]
              transition
              duration-300
              hover:-translate-y-1
              hover:bg-[#656A31]
              hover:shadow-[0_20px_40px_rgba(118,123,57,0.33)]
              sm:text-lg
            "
          >
            Ver ubicación
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Celebracion;