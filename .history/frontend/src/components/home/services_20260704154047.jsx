import Section from "../common/Section";
import SectionHeading from "../ui/SectionHeading";
import FeatureGrid from "../common/FeatureGrid";

import services from "../../data/services";

import "../../styles/services.css";

function Services() {
  return (
    <Section background="light">
      <SectionHeading
        badge="OUR SERVICES"
        title="Professional Maritime Services"
        description="Supporting maritime professionals through membership, training, career development, networking and advocacy."
      />

      <FeatureGrid items={services} />
    </Section>
  );
}

export default Services;
