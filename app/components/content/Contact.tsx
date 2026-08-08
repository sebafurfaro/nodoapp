import Link from "next/link"
import Typography from "../Typography"

export const Contact = () => {
    return(
        <section id="contacto" className="h-screen bg-linear-to-r from-violet-500 to-cyan-500 p-4 flex items-center justify-center">
            <div className="bg-slate-950 rounded-3xl w-full h-full relative p-8">
                <div className="max-w-3xl mx-auto w-full flex flex-col items-center space-y-4">
                <Typography variant="h3" color="white" className="font-google">
                    ¿Tenés una idea?
                </Typography>
                </div>
                <div className="w-full h-auto absolute bottom-0 right-0 flex">
                    

                </div>
            </div>
        </section>
    )
}