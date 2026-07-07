import Hero from "../../components/sections/Hero";
import AboutSection from "../../components/sections/AboutSection";
import CoreValues from "../../components/sections/CoreValues";
import WhyJoin from "../../components/sections/WhyJoin";
import Statistics from "../../components/sections/statistics";

function Home() {
  return (
    <>
      <Home>
        <Hero />

        <AboutSection />

        <Statistics />

        <CoreValues />

        <WhyJoin />

        <EventsPreview />

        <NewsPreview />

        <Partners />

        <CallToAction />
      </Home>
    </>
  );
}

export default Home;
