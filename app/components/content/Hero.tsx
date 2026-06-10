"use client"

import Typography from "../Typography";

export const Hero = () => {
  

  return (
    <section className="relative flex h-screen flex-col justify-center overflow-hidden bg-[#05070a] px-8 text-white md:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,240,255,0.14),_transparent_45%)]" />
      <div className="relative z-10 max-w-5xl">
        <Typography
          variant="h6"
          size="xs"
          color="cyan"
          opacity={100}
          className="mb-4 uppercase tracking-[0.3em] animate-pulse"
        >
          Ingeniería preparada para el futuro
        </Typography>
          <Typography variant="h1" className="font-bold tracking-tight mb-8 text-on-surface uppercase">
            <span className="bg-linear-to-r from-slate-100 to-cyan-500 bg-clip-text text-transparent">Soluciones</span> de <br />
            vanguardia para la <br />
            frontera digital
          </Typography>
        <Typography
          variant="p"
          size="lg"
          color="slate"
          opacity={80}
          className="mb-12 max-w-2xl leading-relaxed"
        >
          Disenamos ecosistemas digitales de alto rendimiento para visionarios.
          Desde el concepto hasta el despliegue, acompanamos durante todo el
          proceso.
        </Typography>
        <div className="flex flex-wrap gap-4">
          <button className="group flex items-center gap-3 border border-[#00f0ff] bg-[#00f0ff]/10 px-8 py-4 text-white transition-all duration-500 hover:bg-[#00f0ff] hover:text-black">
            Explora Nuestro Ecosistema
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </button>
          <button className="border border-white/10 bg-white/5 px-8 py-4 text-white transition-all duration-300 hover:bg-white/10">
            Nuestro Portafolio
          </button>
        </div>
      </div>
    </section>
  );
};
