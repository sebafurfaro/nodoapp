"use client"

import { CodeIcon, PaletteIcon, PanelsTopLeft, SquareStack } from "lucide-react"
import Typography from "../Typography"
import MagicBento from "./MagicBento"

export const Solutions = () => {

    const solutions = [
        {
            title: "Desarrollo a medida",
            description: "Creamos soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente, utilizando las últimas tecnologías y metodologías ágiles.",
            image: <CodeIcon className="w-10 h-10" />,
            position: "md:col-span-5",
            color: "cyan"
        },
        {
            title: "Diseño de interfaces",
            description: "Diseñamos interfaces de usuario intuitivas y atractivas que mejoran la experiencia del usuario y aumentan la satisfacción del cliente.",
            image: <PaletteIcon className="w-10 h-10" />,
            position: "md:col-span-4 md:col-start-6",
            color: "violet"
        },
        {
            title: "Desarrollo a Web",
            description: "Implementamos soluciones web escalables y seguras que permiten a nuestros clientes llegar a una audiencia global y mejorar su presencia en línea.",
            image: <PanelsTopLeft className="w-10 h-10" />,
            position: "md:col-span-3 md:row-start-2",
            color: "rose"
        },
        {
            title: "Registro de Marcas",
            description: "Ofrecemos el servicio de asesoria y gestión de registro de marcas para proteger la identidad de tu negocio y asegurar que tu marca esté legalmente protegida en el mercado.",
            image: <SquareStack className="w-10 h-10" />,
            position: "md:col-span-3 md:row-start-2 md:col-start-4",
            color: "amber"
        },
        {
            title: "Asesoría para creación de marca",
            description: "Brindamos asesoría estratégica para la creación de marcas sólidas y coherentes, ayudando a nuestros clientes a definir su identidad y posicionamiento en el mercado.",
            image: <SquareStack className="w-10 h-10" />,
            position: "md:col-span-3 md:row-start-2 md:col-start-7",
            color: "amber"
        }
    ]

    return(
        <section id="soluciones" className="min-h-screen flex flex-col items-center justify-center gap-8 relative py-40 bg-slate-950">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-8 text-center">
                <Typography variant="h2" color="white">Nuestras <span className="font-gochi bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">soluciones</span></Typography>
                <Typography variant="p" color="white">Ofrecemos un conjunto de soluciones innovadoras para satisfacer las necesidades de nuestros clientes. Los acompañamos desde la idea inicial hasta el despliegue de la solución. </Typography>
            </div>
            <MagicBento
                cards={solutions}
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={210}
                particleCount={12}
                glowColor="132, 0, 255"
            />
        </section>
    )
}
