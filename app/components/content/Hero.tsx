"use client"

import Typography from "../Typography";
import MoltenMetal from "./MoltenMetal";

export const Hero = () => {
  

  return (
    <section className="relative flex h-screen flex-col justify-center overflow-hidden bg-[#05070a] px-8 text-white md:px-16">
      <div className="pointer-events-none absolute inset-0">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={false}
          mouseStrength={0.3}
          opacity={1}
        />
      </div>
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
          <Typography variant="h1" className="font-bold font-google tracking-tight mb-8 text-on-surface">
            <span className="font-gochi bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">Soluciones de vanguardia</span> para la frontera digital
          </Typography>
        <Typography
          variant="p"
          size="lg"
          color="white"
          opacity={80}
          className="mb-12 max-w-2xl leading-relaxed font-google"
        >
          Diseñamos ecosistemas digitales de alto rendimiento para visionarios.
          Desde el concepto hasta el despliegue, acompañamos durante todo el
          proceso.
        </Typography>
        <div className="flex flex-wrap gap-4 font-google">
          <button className="group flex items-center gap-3 border border-[#00f0ff] bg-[#00f0ff]/10 px-8 py-4 text-white transition-all duration-500 hover:bg-[#00f0ff] hover:text-black">
            Explora Nuestro Proceso
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
