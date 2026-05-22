import About from "../components/about/about";
import Hero from "../components/hero/hero";
import Highlights from "../components/highlights/highlights";
import Pagewraper from "../components/pagewraper";
import PopularDest from "../components/populardest/populardest";

function Home() {
  return (
     <main>
      <Hero />
      <Highlights/>
      <PopularDest/>
      <About/>
    </main>
  );
}

export default Home;