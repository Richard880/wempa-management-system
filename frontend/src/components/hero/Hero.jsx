// src/components/hero/Hero.jsx
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import heroShip from "../../assets/hero/heroShip.jfif";
import heroData from "../../data/heroData"; 
import ScrollIndicator from "./ScrollIndicator";
import WaveDivider from "./WaveDivider";

// Import your dynamic live data engine hooks
import { useEvents } from "../../features/events/hooks/useEvents";
import { useNews } from "../../features/news/hooks/useNews";

import "../../styles/components/hero.css";

function Hero() {
  const { events, loading: eventsLoading } = useEvents();
  const { news, loading: newsLoading } = useNews();

  const loading = eventsLoading || newsLoading;

  // Isolate active featured entries flagged by administrators
  const featuredEvent = !loading ? events.find((e) => e.isFeatured === true) : null;
  const featuredArticle = !loading ? news.find((n) => n.isFeatured === true) : null;

  let activeHeroData = null;
  let activeHeroImage = heroShip;

  // 1. Priority One: Live Dynamic Featured Event
  if (featuredEvent) {
    activeHeroData = {
      badge: `🔥 FEATURED EVENT: ${featuredEvent.category || "CONFERENCE"}`,
      title: featuredEvent.title,
      description: featuredEvent.description || "Join us for this special WEMPA community initiative.",
      primaryButton: {
        text: "Register Now",
        link: `/register-event/${featuredEvent.id}`,
      },
      secondaryButton: {
        text: "View All Events",
        link: "/events",
      },
      stats: heroData.stats || [],
    };
    activeHeroImage = featuredEvent.poster?.posterUrl || heroShip;
  } 
  // 2. Priority Two: Live Dynamic Featured News Article
  else if (featuredArticle) {
    activeHeroData = {
      badge: `📰 FEATURED ANNOUNCEMENT: ${featuredArticle.category || "NEWS"}`,
      title: featuredArticle.title,
      description: featuredArticle.excerpt || 
        (featuredArticle.content ? `${featuredArticle.content.substring(0, 160)}...` : "Read full coverage regarding this media brief."),
      primaryButton: {
        text: "Read Full Story",
        link: `/news/${featuredArticle.id}`,
      },
      secondaryButton: {
        text: "Browse News Feed",
        link: "/news",
      },
      stats: heroData.stats || [],
    };
    activeHeroImage = featuredArticle.poster?.posterUrl || heroShip;
  } 
  // 3. Fallback Solution: Reshapes raw strings safely into structured objects
  else {
    activeHeroData = {
      badge: heroData.badge,
      title: heroData.title,
      description: heroData.description,
      
      // 🟢 Converts the flat text string parameters into standard component objects
      primaryButton: {
        text: typeof heroData.primaryButton === "string" ? heroData.primaryButton : "Become a Member",
        link: "/register", // Standard portal route link target
      },
      secondaryButton: {
        text: typeof heroData.secondaryButton === "string" ? heroData.secondaryButton : "Learn More",
        link: "/about",
      },
      stats: heroData.stats || [],
    };
    activeHeroImage = heroShip;
  }

  if (loading) {
    return (
      <section className="hero-section bg-dark text-white-50 d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary mb-2" role="status" />
        <span className="ms-2 small">Synchronizing core landing metrics...</span>
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6}>
            {/* Feeds a safely normalized data schema down to children components */}
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
                alt={featuredEvent ? featuredEvent.title : featuredArticle ? featuredArticle.title : "Hero Ship"} 
                className="hero-img" 
                onError={(e) => { e.target.src = heroShip; }}
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
