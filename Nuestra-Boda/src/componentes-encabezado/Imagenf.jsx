import React from "react";
import { motion } from "framer-motion";

const SeparadorImagen = ({
  imagen = "/Ifinal.JPEG",
  posicion = "center 78%",
}) => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FDF4EF]
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.08,
        }}
        className="
          relative
          h-[300px]
          w-full
          overflow-hidden
          sm:h-[400px]
          md:h-[520px]
          lg:h-[650px]
        "
      >
        <img
          src={imagen}
          alt="Fotografía de los novios"
          loading="lazy"
          decoding="async"
          className="
            h-full
            w-full
            object-cover
          "
          style={{
            objectPosition: posicion,
          }}
        />
      </motion.div>
    </section>
  );
};

export default SeparadorImagen;