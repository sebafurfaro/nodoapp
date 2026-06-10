import { Contact } from "./components/content/Contact";
import { Ecosystem } from "./components/content/Ecosystem";
import { Hero } from "./components/content/Hero";
import { Solutions } from "./components/content/Solutions";

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Ecosystem />
      <Contact />
    </>
  );
}
