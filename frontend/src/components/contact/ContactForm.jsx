import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";

function ContactForm() {
  return (
    <motion.div
      className="contact-form-card"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3>Send Us a Message</h3>

      <p>Complete the form below and we'll respond as soon as possible.</p>

      <Form>
        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Control type="text" placeholder="Full Name" />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Control type="email" placeholder="Email Address" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Control type="tel" placeholder="Phone Number" />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Control type="text" placeholder="Subject" />
          </div>
        </div>

        <Form.Group className="mb-4">
          <Form.Control as="textarea" rows={6} placeholder="Your Message" />
        </Form.Group>

        <Button size="lg">Send Message</Button>
      </Form>
    </motion.div>
  );
}

export default ContactForm;
