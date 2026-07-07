import Section from "../common/Section";
import SectionHeading from "../ui/SectionHeading";
import FeatureGrid from "../common/FeatureGrid";

import services from "../../data/services";

import "../../styles/components/services.css";

function Services() {
  return (
    <Section background="light">
      <SectionHeading
        badge="FEATURED SERVICES"
        title="Empowering Maritime Professionals"
        description="Discover the services WEMPA offers to support professional growth, networking, and industry excellence."
      />

      <FeatureGrid items={services} />
    </Section>
  );
}

export default Services;
