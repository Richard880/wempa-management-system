import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ end, duration = 2000, start = 0 }) {
  const [count, setCount] = useState(start);

  const frame = useRef();
  const started = useRef(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        const startTime = performance.now();

        function animate(time) {
          const progress = Math.min((time - startTime) / duration, 1);

          const current = Math.floor(progress * (end - start) + start);

          setCount(current);

          if (progress < 1) {
            frame.current = requestAnimationFrame(animate);
          }
        }

        frame.current = requestAnimationFrame(animate);
      },
      {
        threshold: 0.4,
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();

      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [end, duration, start]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

export default AnimatedCounter;
