import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import ContactForm from "./ContactForm";
import SectionHeading from "../ui/SectionHeading";

import { contactInfo } from "../../data/contactData";

function ContactInfo() {
  return (
    <section className="contact-section">
      <Container>

        <SectionHeading
          badge="GET IN TOUCH"
          title="We're Here to Help"
          description="Whether you have questions about membership, events, partnerships or training, our team is ready to assist you."
        />

        <Row className="g-5 align-items-start">

          <Col lg={5}>

            {contactInfo.map((item) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.id}
                  className="contact-info-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >

                  <div className="contact-icon">
                    <Icon />
                  </div>

                  <div>

                    <h5>{item.title}</h5>

                    <p>{item.value}</p>

                  </div>

                </motion.div>

              );

            })}

          </Col>

          <Col lg={7}>
            <ContactForm />
          </Col>

        </Row>

      </Container>
    </section>
  );
}

export default ContactInfo;