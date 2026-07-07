import PageBanner from "../../components/ui/PageBanner";
import AboutSection from "../../components/home/AboutSection";
import CoreValues from "../../components/home/CoreValues";
import WhyJoin from "../../components/home/WhyJoin";

import banner from "../../assets/banners/about-banner.jpg";

function About() {
  return (
    <>
      <PageBanner
        title="About WEMPA"
        subtitle="Learn about our mission, vision, values and our commitment to advancing maritime professionalism across Western Kenya."
        background={banner}
      />

      <AboutSection />

      <CoreValues />

      <WhyJoin />
    </>
  );
}

export default About;
