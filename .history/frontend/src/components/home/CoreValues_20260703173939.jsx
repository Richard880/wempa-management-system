import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import FeatureGrid from "../common/FeatureGrid";

import { coreValues } from "../coreValues../data/coreValues";

function CoreValues() {
  return (
    <Section background="white">
      <SectionHeading
        badge="OUR CORE VALUES"
        title="The Principles That Guide WEMPA"
        description="Our core values define who we are and inspire how we serve the maritime community."
      />

      <FeatureGrid items={coreValues} />
    </Section>
  );
}

export default CoreValues;
