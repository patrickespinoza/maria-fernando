import React from "react";
import { motion } from "framer-motion";

const Vestimenta = ({
  imagen = "/dresscode.png",
  posicionImagen = "center 30%",
  codigo = "Formal",
  nota = "Con tu cariño y compañía este día ya será perfecto. Si deseas sumarte al ambiente de la celebración, te invitamos a vestir de manera elegante.",
}) => {
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
          bottom-10
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
          -right-20
          top-12
          h-64
          w-64
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
        viewport={{ once: true, amount: 0.2 }}
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          overflow-hidden
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-2xl
          rounded-bl-2xl
          border
          border-[#767B39]/20
          bg-white/75
          shadow-[0_25px_70px_rgba(64,60,50,0.14)]
          backdrop-blur-md
        "
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85 }}
            viewport={{ once: true }}
            className="
              relative
              min-h-[420px]
              overflow-hidden
              sm:min-h-[520px]
              lg:min-h-[650px]
            "
          >
            <img
              src={imagen}
              alt="Código de vestimenta"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
              style={{
                objectPosition: posicionImagen,
              }}
            />

            {/* Degradado móvil */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/25
                via-transparent
                to-transparent
                lg:hidden
              "
            />

            {/* Marco interior */}
            <div
              className="
                pointer-events-none
                absolute
                inset-5
                rounded-tl-[3rem]
                rounded-br-[3rem]
                border
                border-white/50
              "
            />

            <div
              className="
                absolute
                bottom-7
                left-7
                rounded-full
                border
                border-white/30
                bg-white/20
                px-5
                py-2
                text-xs
                uppercase
                tracking-[0.3em]
                text-white
                backdrop-blur-md
                lg:hidden
              "
            >
              Dress code
            </div>
          </motion.div>

          {/* Información */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
            viewport={{ once: true }}
            className="
              relative
              flex
              flex-col
              justify-center
              px-7
              py-14
              text-center
              sm:px-12
              sm:py-16
              lg:px-14
              lg:text-left
            "
          >
            {/* Esquina decorativa */}
            <div
              className="
                pointer-events-none
                absolute
                right-6
                top-6
                h-16
                w-16
                rounded-tr-[2rem]
                border-r
                border-t
                border-[#EAA624]/40
              "
            />

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.4em]
                text-[#C85555]
                sm:text-sm
              "
            >
              Nuestro día
            </p>

            <h2
              className="
                mt-5
                font-playfair
                text-4xl
                text-[#767B39]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Código de vestimenta
            </h2>

            <div
              className="
                mx-auto
                my-7
                flex
                items-center
                gap-4
                lg:mx-0
              "
            >
              <div className="h-px w-16 bg-[#EAA624]/70" />

              <span className="h-2 w-2 rotate-45 bg-[#C85555]" />

              <div className="h-px w-16 bg-[#EAA624]/70" />
            </div>

            <p
              className="
                font-cursiveDancing
                text-5xl
                leading-none
                text-[#C85555]
                sm:text-6xl
              "
            >
              {codigo}
            </p>

          
            <div
              className="
                mt-8
                rounded-[1.5rem]
                border
                border-[#767B39]/15
                bg-[#FDF4EF]
                px-6
                py-5
              "
            >
              <p
                className="
                  text-sm
                  italic
                  leading-relaxed
                  text-[#403C32]/70
                  sm:text-base
                "
              >
                {nota}
              </p>
            </div>

            {/* Detalle final */}
            <div
              className="
                mt-9
                flex
                items-center
                justify-center
                gap-3
                lg:justify-start
              "
            >

            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Vestimenta;