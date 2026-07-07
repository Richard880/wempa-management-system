import { Container, Accordion } from "react-bootstrap";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";

import { faqs } from "../../data/contactData";

function ContactFAQ() {
  return (
    <section className="contact-faq-section">
      <Container>

        <SectionHeading
          badge="FREQUENTLY ASKED QUESTIONS"
          title="How Can We Help?"
          description="Find answers to some of the most common questions about WEMPA membership, events, partnerships and services."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <Accordion flush className="faq-accordion">

            {faqs.map((faq, index) => (

              <Accordion.Item
                eventKey={String(index)}
                key={faq.id}
              >

                <Accordion.Header>

                  {faq.question}

                </Accordion.Header>

                <Accordion.Body>

                  {faq.answer}

                </Accordion.Body>

              </Accordion.Item>

            ))}

          </Accordion>

        </motion.div>

      </Container>
    </section>
  );
}

export default ContactFAQ;