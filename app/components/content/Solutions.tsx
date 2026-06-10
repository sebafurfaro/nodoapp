import { CodeIcon, PaletteIcon, PanelsTopLeft, SquareStack } from "lucide-react"
import Typography from "../Typography"
import { SpotlightCard } from "../ui/SpotlightCard"

export const Solutions = () => {

    const solutions = [
        {
            title: "Desarrollo a medida",
            description: "Creamos soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente, utilizando las últimas tecnologías y metodologías ágiles.",
            image: <CodeIcon className="w-6 h-6" />,
            position: "md:col-span-7",
            color: "cyan"
        },
        {
            title: "Diseño de interfaces",
            description: "Diseñamos interfaces de usuario intuitivas y atractivas que mejoran la experiencia del usuario y aumentan la satisfacción del cliente.",
            image: <PaletteIcon className="w-6 h-6" />,
            position: "md:col-span-5",
            color: "violet"
        },
        {
            title: "Desarrollo a Web",
            description: "Implementamos soluciones web escalables y seguras que permiten a nuestros clientes llegar a una audiencia global y mejorar su presencia en línea.",
            image: <PanelsTopLeft className="w-6 h-6" />,
            position: "md:col-span-5",
            color: "rose"
        },
        {
            title: "Registro de Marcas",
            description: "Ofrecemos el servicio de asesoria y gestión de registro de marcas para proteger la identidad de tu negocio y asegurar que tu marca esté legalmente protegida en el mercado.",
            image: <SquareStack className="w-6 h-6" />,
            position: "md:col-span-7",
            color: "amber"
        }
    ]

    return(
        <section id="soluciones" className="h-screen flex flex-col items-center justify-center gap-8">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-8 text-center">
                <Typography variant="h3" color="white">Nuestras soluciones</Typography>
                <Typography variant="p" color="white">Ofrecemos un conjunto de soluciones innovadoras para satisfacer las necesidades de nuestros clientes. Los acompañamos desde la idea inicial hasta el despliegue de la solución. </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-5xl mx-auto">
                {solutions.map((solution, index) => (
                    <SpotlightCard
                        key={index}
                        className={`col-span-1 ${solution.position} p-6`}
                        contentClassName="flex flex-col items-start gap-4"
                        spotlightTone={solution.color as "cyan" | "violet" | "rose" | "amber"}
                        spotlightRadius={280}
                        spotlightOpacity={0.2}
                    >
                        <div className="rounded-lg border border-white/30 p-4 flex items-center justify-center w-fit h-fit">
                            {solution.image}
                        </div>
                        <Typography variant="h5" color="white">{solution.title}</Typography>
                        <Typography variant="p" color="white">{solution.description}</Typography>
                    </SpotlightCard>
                ))}
            </div>
        </section>
    )
}
