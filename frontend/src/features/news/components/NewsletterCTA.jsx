// src/components/common/NewsletterCTA.jsx
import  { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaCheckCircle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

// 1. Import core Firestore initialization routines
import { getFirestore, doc, setDoc } from "firebase/firestore";

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const db = getFirestore();

  // 2. Form execution transaction logic
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      // Standardizes input formatting by trimming whitespaces and lowering case string keys
      const normalizedEmail = email.trim().toLowerCase();
      
      // Use email as the document identifier node string token to automatically block duplicates
      const subscriberRef = doc(db, "subscribers", normalizedEmail);

      await setDoc(subscriberRef, {
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
        status: "Active"
      });

      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("Mailing list subscription transaction failure:", err);
      setErrorMsg("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <span className="newsletter-tag">WEMPA NEWSLETTER</span>

              <h2>Get Weekly Maritime Updates</h2>

              <p>
                Subscribe to receive maritime industry news, WEMPA
                announcements, conference updates, training opportunities and
                partnership news directly in your inbox.
              </p>

              <div className="newsletter-social">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FaLinkedinIn />
                </a>

                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>

                <a href="https://x.com" target="_blank" rel="noreferrer">
                  <FaXTwitter />
                </a>
              </div>
            </Col>

            <Col lg={5}>
              <div className="newsletter-card">
                {/* 3. Swap form layout block card gracefully when success evaluates to true */}
                {success ? (
                  <div className="text-center py-4 text-white">
                    <FaCheckCircle className="text-warning display-4 mb-3 d-block mx-auto" />
                    <h4 className="fw-bold mb-2">Awesome!</h4>
                    <p className="small mb-0 opacity-75">
                      You have successfully joined WEMPA's mailing roster matrix channel. Check your inbox soon!
                    </p>
                  </div>
                ) : (
                  <>
                    <FaEnvelope className="newsletter-icon" />

                    <h4>Subscribe</h4>

                    {errorMsg && <Alert variant="danger" className="py-2 small">{errorMsg}</Alert>}

                    <Form onSubmit={handleSubscribe}>
                      <Form.Group className="mb-3">
                        <Form.Control 
                          type="email" 
                          placeholder="Enter your email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={submitting}
                        />
                      </Form.Group>

                      <Button 
                        type="submit" 
                        className="w-100" 
                        disabled={submitting}
                      >
                        {submitting ? "Registering Inbox..." : "Subscribe Now"}
                      </Button>
                    </Form>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}

export default NewsletterCTA;
