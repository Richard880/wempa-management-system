import { Container, Accordion } from "react-bootstrap";

import SectionHeading from "../ui/SectionHeading";
import { membershipFAQs } from "../../data/membershipData";

function MembershipFAQ() {
  return (
    <section className="membership-faq">
      <Container>
        <SectionHeading
          badge="FREQUENTLY ASKED QUESTIONS"
          title="Have Questions?"
          description="Find answers to the most common questions about WEMPA membership."
        />

        <Accordion flush>
          {membershipFAQs.map((faq) => (
            <Accordion.Item eventKey={faq.id.toString()} key={faq.id}>
              <Accordion.Header>{faq.question}</Accordion.Header>

              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

export default MembershipFAQ;
