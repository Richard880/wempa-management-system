import styles from "./ScrollIndicator.module.css";

function ScrollIndicator() {
  const handleScrollPastHero = () => {
    // Smoothly shifts focus downward by exactly one full view screen window metric
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <button 
      type="button" 
      className={styles.scrollIndicator} 
      onClick={handleScrollPastHero}
      aria-label="Scroll down to main content"
    >
      {/* 🟢 Computer Mouse track frame housing mirroring the pixel design image asset */}
      <div className={styles.mouseFrame}>
        <div className={styles.mouseWheel} />
      </div>
      <span className={styles.scrollText}>Scroll</span>
    </button>
  );
}

export default ScrollIndicator;
