import Hero from "../../components/home/Hero";
import AboutSection from "../../components/home/AboutSection";
import Statistics from "../../components/home/Statistics";
import CoreValues from "../../components/home/CoreValues";
import WhyJoin from "../../components/home/WhyJoin";
import Services from "../../components/home/Services";
import UpcomingEvents from "../../components/home/upcomingEvents";

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Statistics />
      <CoreValues />
      <WhyJoin />
      <Services />
      <UpcomingEvents/>
    </>
  );
}

export default Home;
