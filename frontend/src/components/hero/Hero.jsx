// src/components/hero/Hero.jsx
import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollIndicator from "./ScrollIndicator/ScrollIndicator.jsx";

import heroShip from "../../assets/hero/heroShip.jfif";
import heroData from "../../data/heroData"; 

import { useEvents } from "../../features/events/hooks/useEvents";
import { useNews } from "../../features/news/hooks/useNews";

import "./hero.css";

function Hero() {
  const { events, loading: eventsLoading } = useEvents();
  const { news, loading: newsLoading } = useNews();
  const [slideIndex, setSlideIndex] = useState(0);

  const loading = eventsLoading || newsLoading;

  // 1. TEXT SLICER GUARD: Protects layout boundaries from long descriptions
  const limitContentText = (text, characterLimit = 160) => {
    if (!text) return "";
    if (text.length <= characterLimit) return text;
    return `${text.substring(0, characterLimit).trim()}...`;
  };

  // 2. COMPILE ALL FEATURED CONTENT INTO A SLIDING ARRAY
  const heroSlides = useMemo(() => {
    if (loading) return [];

    const compiledSlides = [];

    // Capture all items marked with isFeatured true
    const activeEvents = events?.filter((e) => e.isFeatured === true) || [];
    const activeNews = news?.filter((n) => n.isFeatured === true) || [];

    // Map Events into formal slide structures
    activeEvents.forEach((item) => {
      compiledSlides.push({
        id: `event-${item.id}`,
        type: "event",
        badge: `🔥 FEATURED EVENT: ${item.category || "CONFERENCE"}`,
        title: item.title,
        description: limitContentText(item.description || "Join us for this special WEMPA community initiative."),
        image: item.poster?.posterUrl || heroShip,
        primaryButton: { text: "Register Now", link: `/register-event/${item.id}` },
        secondaryButton: { text: "View All Events", link: "/events" },
      });
    });

    // Map News into formal slide structures
    activeNews.forEach((item) => {
      compiledSlides.push({
        id: `news-${item.id}`,
        type: "news",
        badge: `📰 FEATURED ANNOUNCEMENT: ${item.category || "NEWS"}`,
        title: item.title,
        description: limitContentText(item.excerpt || item.content || "Read full coverage."),
        image: item.poster?.posterUrl || heroShip,
        primaryButton: { text: "Read Full Story", link: `/news/${item.id}` },
        secondaryButton: { text: "Browse News Feed", link: "/news" },
      });
    });

    // Always inject the default brand message as a foundational backup slide
       // Always inject the default brand message as a foundational backup slide
    compiledSlides.push({
      id: "default-brand-slide",
      type: "brand",
      badge: heroData.badge || "KENYA'S LEADING MARITIME ASSOCIATION",
      title: heroData.title || "Connecting Maritime Professionals Across Kenya",
      
      // 👇 FIX CHANGED HERE: Change item?.description to heroData?.description
      description: limitContentText(heroData?.description || "Promoting professionalism, innovation, collaboration and sustainable maritime development across Kenya.", 180),
      
      image: heroShip,
      primaryButton: {
        text: typeof heroData.primaryButton === "string" ? heroData.primaryButton : "Become a Member",
        link: "/register", 
      },
      secondaryButton: {
        text: typeof heroData.secondaryButton === "string" ? heroData.secondaryButton : "Learn More",
        link: "/about",
      },
    });

    

    return compiledSlides;
  }, [events, news, loading]);

  // 3. SLIDE ROTATION TIMER LOOP
  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const bannerRotationTimer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 7000); // Cross-fades items evenly every 7 seconds

    return () => clearInterval(bannerRotationTimer);
  }, [heroSlides]);

  if (loading) {
    return (
      <section className="hero-section-premium loading-state-hero">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3 small text-muted">Synchronizing core landing metrics...</span>
      </section>
    );
  }

  const currentActiveSlide = heroSlides[slideIndex] || heroSlides[0];
  const statsList = heroData.stats || [];

  return (
    <section className="hero-section-premium">
      
      {/* 🌊 DYNAMIC REALISM BACKDROP LAYERS (Now scales with active slide shifts) */}
      <div className="hero-backdrop-pane" key={currentActiveSlide.id}>
        <img 
          src={currentActiveSlide.image} 
          alt="Premium Corporate Vessel Backdrop" 
          className="hero-backdrop-img slider-fade-animation"
          onError={(e) => { e.currentTarget.src = heroShip; }}
        />
        <div className="hero-atmosphere-gradient" />
      </div>

      <Container className="hero-interactive-container">
        
        {/* Floating Side Info Badge (Right Panel preserved precisely from your theme) */}
        <div className="floating-team-metric-card">
          <i className="bi bi-people-fill" />
          <div className="team-metric-text">
            <span>More than</span>
            <strong>1,200 Officers</strong>
            <span>work together with us</span>
          </div>
        </div>

        {/* Dynamic Slide Tracker Dots (Indicates multi-item horizontal paths are ready) */}
        {heroSlides.length > 1 && (
          <div className="hero-slider-pagination-track">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSlideIndex(idx)}
                className={`hero-slider-dot ${idx === slideIndex ? "hero-slider-dot-active" : ""}`}
                aria-label={`Jump directly to featured slide index allocation ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Text Track Render Blocks */}
        <Row className="hero-core-content-align">
          <Col lg={7} xl={6} className="hero-left-text-track" key={currentActiveSlide.id}>
            <span className="premium-orange-badge slider-text-fade">{currentActiveSlide.badge}</span>
            <h1 className="premium-headline-title slider-text-fade">{currentActiveSlide.title}</h1>
            <p className="premium-description-subtitle slider-text-fade">{currentActiveSlide.description}</p>
            
            <div className="premium-action-cluster slider-text-fade">
              <a href={currentActiveSlide.primaryButton.link} className="btn-premium-orange">
                <span>{currentActiveSlide.primaryButton.text}</span>
                <i className="bi bi-arrow-right-short" />
              </a>
              <a href={currentActiveSlide.secondaryButton.link} className="btn-premium-blur">
                <span>{currentActiveSlide.secondaryButton.text}</span>
                <i className="bi bi-arrow-right-short" />
              </a>
            </div>
          </Col>
        </Row>

        {/* 📊 FLOATING GRID METRICS PANELS FRAME (Bottom Bar preserved precisely) */}
        <div className="hero-bottom-dashboard-grid">
          <div className="metrics-loop-row">
            {statsList.slice(0, 3).map((stat, index) => {
              const metricValue = stat.value || "0+";
              const metricLabel = stat.label || "Metric";

              let dynamicIcon = "bookmark-fill";
              if (index === 0) dynamicIcon = "people-fill";      
              if (index === 1) dynamicIcon = "calendar-event";   
              if (index === 2) dynamicIcon = "handshake";        

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

          {/* Large Floating Rating Card */}
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
