import Hero from "../../components/sections/Hero";
import AboutSection from "../../components/sections/AboutSection";
import CoreValues from "../../components/sections/CoreValues";
import WhyJoin from "../../components/sections/WhyJoin";
import Statistics from "../../components/sections/statistics";

function Home() {
  return (
    <>
      <Hero />

      <AboutSection />
      <CoreValues />
      <WhyJoin />
      
    </>
  );
}

export default Home;
