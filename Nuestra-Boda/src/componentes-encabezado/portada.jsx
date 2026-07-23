import React from "react";

export default function Portada() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Imagen */}
      <img
        src="/Portada.JPEG"
        alt="Maria y Fernando"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
       
        "
        style={{
          objectPosition: "center 15%",
        }}
      />

      {/* Oscurecer ligeramente la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Contenido */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-20 px-6">

        <div className="text-center">

          <h1
            className="
              font-cursiveDancing
              text-white
              text-6xl
              sm:text-7xl
              md:text-8xl
              leading-none
              drop-shadow-2xl
            "
          >
            Coni & Fer
          </h1>

          <div className="w-24 h-px bg-white/70 mx-auto my-7"></div>

          <p className="font-playfair text-white uppercase tracking-[0.22em] text-lg sm:text-xl">
            03 · Octubre · 2026
          </p>

        </div>

      </div>

    </section>
  );
}
