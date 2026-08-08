"use client"

import { Tabs } from "@heroui/react"
import { useSyncExternalStore } from "react"
import Typography from "../Typography"
import { ChartNetwork, CirclePile, Cog, Lightbulb } from "lucide-react"

const desktopQuery = "(min-width: 768px)"

const subscribeToDesktopQuery = (callback: () => void) => {
    const mediaQuery = window.matchMedia(desktopQuery)
    mediaQuery.addEventListener("change", callback)

    return () => mediaQuery.removeEventListener("change", callback)
}

const getDesktopSnapshot = () => window.matchMedia(desktopQuery).matches
const getServerSnapshot = () => false

const iconSize = 40

const processSteps = [
    {
        id: "discovery",
        number: "01",
        label: "Conocimiento",
        title: "Entendemos la idea y el contexto",
        description: "Relevamos objetivos, usuarios, oportunidades y restricciones para definir una dirección clara para el producto.",
        color: {
            border: "border-cyan-400/20",
            active: "aria-selected:border-cyan-400 aria-selected:bg-cyan-400/10 aria-selected:text-cyan-400",
            hover: "hover:bg-cyan-400/10",
            text: "text-cyan-400",
            panel: "border-cyan-400",
        },
        back: <Lightbulb className={`w-${iconSize} h-${iconSize} text-cyan-400`} />
    },
    {
        id: "strategy",
        number: "02",
        label: "Estrategia",
        title: "Diseñamos una hoja de ruta",
        description: "Convertimos los hallazgos en prioridades, alcance y decisiones concretas que alinean negocio, diseño y tecnología.",
        color: {
            border: "border-violet-400/20",
            active: "aria-selected:border-violet-400 aria-selected:bg-violet-400/10 aria-selected:text-violet-400",
            hover: "hover:bg-violet-400/10",
            text: "text-violet-400",
            panel: "border-violet-400",
        },
        back: <CirclePile className={`w-${iconSize} h-${iconSize} text-violet-400`} />
    },
    {
        id: "development",
        number: "03",
        label: "Desarrollo",
        title: "Construimos el producto",
        description: "Implementamos la solución de forma iterativa, validando cada etapa para asegurar calidad, rendimiento y escalabilidad.",
        color: {
            border: "border-rose-400/20",
            active: "aria-selected:border-rose-400 aria-selected:bg-rose-400/10 aria-selected:text-rose-400",
            hover: "hover:bg-rose-400/10",
            text: "text-rose-400",
            panel: "border-rose-400",
        },
        back: <Cog className={`w-${iconSize} h-${iconSize} text-rose-400`} />
    },
    {
        id: "evolution",
        number: "04",
        label: "Evolución",
        title: "Medimos y mejoramos",
        description: "Analizamos el comportamiento del producto y continuamos optimizándolo según datos, aprendizaje y nuevos objetivos.",
        color: {
            border: "border-amber-400/20",
            active: "aria-selected:border-amber-400 aria-selected:bg-amber-400/10 aria-selected:text-amber-400",
            hover: "hover:bg-amber-400/10",
            text: "text-amber-400",
            panel: "border-amber-400",
        },
        back: <ChartNetwork className={`w-${iconSize} h-${iconSize} text-amber-400`} />
    },
]

export const Process = () => {
    const isDesktop = useSyncExternalStore(
        subscribeToDesktopQuery,
        getDesktopSnapshot,
        getServerSnapshot,
    )

    return(
        <section id="process" className="min-h-screen flex items-center relative py-40 bg-slate-950">
            <div className="relative z-10 w-full max-w-5xl mx-auto px-10 md:px-4 space-y-16">
                <Typography variant="h1" color="white" className="text-left md:text-center font-google">
                    Transformamos una <span className="font-gochi bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">idea</span>, en un <span className="font-gochi bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">producto digital</span> de alto rendimiento
                </Typography>

                <Tabs
                    className="mt-10 w-full flex! flex-col! items-stretch gap-8 md:flex-row! md:gap-16"
                    defaultSelectedKey={processSteps[0].id}
                    orientation={isDesktop ? "vertical" : "horizontal"}
                >
                    <Tabs.ListContainer className="w-full md:w-72 md:shrink-0">
                        <Tabs.List aria-label="Etapas de nuestro proceso" className="w-full gap-4 md:space-y-4">
                            {processSteps.map((step) => (
                                <Tabs.Tab
                                    key={step.id}
                                    id={step.id}
                                    className={`w-auto shrink-0 justify-start gap-4 rounded-2xl border px-4 py-4 text-left transition-colors space-x-2 md:w-full ${step.color.border} ${step.color.active} ${step.color.hover}`}
                                >
                                    <span className={`font-mono text-[13px] ${step.color.text}`}>
                                        {step.number}.
                                    </span>
                                    <span className="font-google tracking-wide">{step.label}</span>
                                    <Tabs.Indicator />
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs.ListContainer>

                    {processSteps.map((step) => (
                        <Tabs.Panel
                            key={step.id}
                            id={step.id}
                            className={`overflow-hidden space-y-4 min-h-64 min-w-0 flex-1 rounded-2xl border-2 px-2 py-6 md:px-8 relative ${step.color.panel} bg-slate-800/60 backdrop-blur-2xl`}
                        >
                            <div className="absolute z-0 w-40 h-40 opacity-30" style={{ top: "-1.2rem", right: "-1.2rem" }}>
                                {step.back}
                            </div>
                            <div className="space-y-5 md:max-w-2xl">
                                <Typography variant="h3" color="white" className="font-google mb-4">
                                    {step.title}
                                </Typography>
                                <Typography
                                    variant="p"
                                    color="white"
                                    className="max-w-lg leading-relaxed"
                                >
                                    {step.description}
                                </Typography>
                            </div>
                        </Tabs.Panel>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
