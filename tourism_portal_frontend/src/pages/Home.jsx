import About from "../components/about/about";
import Hero from "../components/hero/hero";
import Highlights from "../components/highlights/highlights";
import PopularDest from "../components/populardest/populardest";

function Home() {
  return (
    <div>
      <Hero />
      <Highlights/>
      <PopularDest/>
      <About/>
    </div>
  );
}

export default Home;