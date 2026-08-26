// src/components/hero/Hero.jsx
import { Container, Row, Col } from "react-bootstrap";
import ScrollIndicator from "./ScrollIndicator/ScrollIndicator.jsx";

import heroShip from "../../assets/hero/heroShip.jfif";
import heroData from "../../data/heroData"; 

// Import your dynamic live data engine hooks
import { useEvents } from "../../features/events/hooks/useEvents";
import { useNews } from "../../features/news/hooks/useNews";

import "./hero.css";

function Hero() {
  const { events, loading: eventsLoading } = useEvents();
  const { news, loading: newsLoading } = useNews();

  const loading = eventsLoading || newsLoading;

  const featuredEvent = !loading ? events.find((e) => e.isFeatured === true) : null;
  const featuredArticle = !loading ? news.find((n) => n.isFeatured === true) : null;

  let activeHeroData = null;
  let activeHeroImage = heroShip;

  if (featuredEvent) {
    activeHeroData = {
      badge: `🔥 FEATURED EVENT: ${featuredEvent.category || "CONFERENCE"}`,
      title: featuredEvent.title,
      description: featuredEvent.description || "Join us for this special WEMPA community initiative.",
      primaryButton: { text: "Register Now", link: `/register-event/${featuredEvent.id}` },
      secondaryButton: { text: "View All Events", link: "/events" },
      stats: heroData.stats || [],
    };
    activeHeroImage = featuredEvent.poster?.posterUrl || heroShip;
  } 
  else if (featuredArticle) {
    activeHeroData = {
      badge: `📰 FEATURED ANNOUNCEMENT: ${featuredArticle.category || "NEWS"}`,
      title: featuredArticle.title,
      description: featuredArticle.excerpt || (featuredArticle.content ? `${featuredArticle.content.substring(0, 160)}...` : "Read full coverage."),
      primaryButton: { text: "Read Full Story", link: `/news/${featuredArticle.id}` },
      secondaryButton: { text: "Browse News Feed", link: "/news" },
      stats: heroData.stats || [],
    };
    activeHeroImage = featuredArticle.poster?.posterUrl || heroShip;
  } 
  else {
    activeHeroData = {
      badge: heroData.badge || "KENYA'S LEADING MARITIME ASSOCIATION",
      title: heroData.title || "Connecting Maritime Professionals Across Kenya",
      description: heroData.description || "Promoting professionalism, innovation, collaboration and sustainable maritime development across Kenya.",
      primaryButton: {
        text: typeof heroData.primaryButton === "string" ? heroData.primaryButton : "Become a Member",
        link: "/register", 
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
      <section className="hero-section-premium loading-state-hero">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3 small text-muted">Synchronizing core landing metrics...</span>
      </section>
    );
  }

  return (
    <section className="hero-section-premium">
      
      {/* 🌊 FULL-BLEED REALISM BACKDROP LAYERS */}
      <div className="hero-backdrop-pane">
        <img 
          src={activeHeroImage} 
          alt="Premium Corporate Vessel Backdrop" 
          className="hero-backdrop-img"
          onError={(e) => { e.target.src = heroShip; }}
        />
        <div className="hero-atmosphere-gradient" />
      </div>

      <Container className="hero-interactive-container">
        
        {/* Floating Side Info Badge (Right Panel from the picture design) */}
        <div className="floating-team-metric-card">
          <i className="bi bi-people-fill" />
          <div className="team-metric-text">
            <span>More than</span>
            <strong>1,200 Officers</strong>
            <span>work together with us</span>
          </div>
        </div>

        <Row className="hero-core-content-align">
          <Col lg={7} xl={6} className="hero-left-text-track">
            <span className="premium-orange-badge">{activeHeroData.badge}</span>
            <h1 className="premium-headline-title">{activeHeroData.title}</h1>
            <p className="premium-description-subtitle">{activeHeroData.description}</p>
            
            <div className="premium-action-cluster">
              <a href={activeHeroData.primaryButton.link} className="btn-premium-orange">
                <span>{activeHeroData.primaryButton.text}</span>
                <i className="bi bi-arrow-right-short" />
              </a>
              <a href={activeHeroData.secondaryButton.link} className="btn-premium-blur">
                <span>{activeHeroData.secondaryButton.text}</span>
                <i className="bi bi-arrow-right-short" />
              </a>
            </div>
          </Col>
        </Row>

        {/* 📊 FLOATING GRID METRICS PANELS FRAME (Bottom Bar) */}
        <div className="hero-bottom-dashboard-grid">
          <div className="metrics-loop-row">
            {activeHeroData.stats.slice(0, 3).map((stat, index) => {
              const metricValue = stat.value || "0+";
              const metricLabel = stat.label || "Metric";

              let dynamicIcon = "bookmark-fill";
              if (index === 0) dynamicIcon = "people-fill";      // For "Members"
              if (index === 1) dynamicIcon = "calendar-event";   // For "Events"
              if (index === 2) dynamicIcon = "handshake";        // For "Partners"
              if (index === 3) dynamicIcon = "clock-history";    // For "Years" fallback

              return (
                <div key={index} className="translucent-metric-plate">
                  <div className="metric-icon-bubble">
                    <i className={`bi bi-${dynamicIcon}`} />
                  </div>
                  <div className="metric-plate-text">
                    <h3>{metricValue}</h3>
                    <p>{metricLabel}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Large Floating Rating Card (Right-Side Showcase) */}
          <div className="floating-rating-showcase-plate">
            <div className="rating-stars-badge">
              <i className="bi bi-star-fill" style={{ color: '#0f172a' }} />
              <span>4.9</span>
            </div>
            <div className="rating-subtext">
              <h4>Employer Trust Index</h4>
              <p>Based on 560+ verified portal filings</p>
            </div>
          </div>
        </div>

      </Container>

      <ScrollIndicator />
    </section>
  );
}

export default Hero;
