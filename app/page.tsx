import { Contact } from "./components/content/Contact";
import { Hero } from "./components/content/Hero";
import { Process } from "./components/content/Process";
import { Solutions } from "./components/content/Solutions";

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Process />
      <Contact />
    </>
  );
}
