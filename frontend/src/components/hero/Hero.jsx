// src/components/hero/Hero.jsx
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import heroShip from "../../assets/hero/heroShip.jfif";
import heroData from "../../data/heroData"; // Your original data template fallback
import ScrollIndicator from "./ScrollIndicator";
import WaveDivider from "./WaveDivider";

// Import your live events data hook
import { useEvents } from "../../features/events/hooks/useEvents";

import "../../styles/components/hero.css";

function Hero() {
  const { events, loading } = useEvents();

  // Find if there's currently an event marked as featured by the admin
  const featuredEvent = !loading ? events.find((e) => e.isFeatured === true) : null;

  /* 
   * Construct a dynamic payload that matches your precise data contract.
   * If a featured event is found, swap text but reuse or adapt button objects.
   */
  const activeHeroData = featuredEvent
    ? {
        badge: "✨ Featured Highlight",
        title: featuredEvent.title,
        description: featuredEvent.description || "Join us for this special WEMPA community event.",
        
        // Dynamic primary action button directing users straight to details page
        primaryButton: {
          text: "View Event Details",
          link: "/events",
        },
        
        // Preserve your original template's secondary button (e.g., "Join Us" or "Contact")
        secondaryButton: heroData.secondaryButton || {
          text: "Learn More",
          link: "/about",
        },

        // Preserve your existing homepage metrics/stats counter elements
        stats: heroData.stats || [],
      }
    : heroData;

  // Use the uploaded poster URL if it exists; otherwise fall back to the static ship image
  const activeHeroImage = featuredEvent?.poster?.posterUrl || heroShip;

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6}>
            {/* Feed the fully compatible mapping data object downwards */}
            <HeroContent data={activeHeroData} />
          </Col>

          <Col lg={6}>
            <motion.div
              className="hero-image"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <img 
                src={activeHeroImage} 
                alt={featuredEvent ? featuredEvent.title : "Hero Ship"} 
                className="hero-img" 
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
      <ScrollIndicator />
      <WaveDivider />
    </section>
  );
}

export default Hero;
