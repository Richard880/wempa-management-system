import { useEffect, useRef } from "react";

function useAutoSave({
  value,
  enabled = true,
  delay = 800,
  onSave,
}) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onSave?.(value);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [
    value,
    enabled,
    delay,
    onSave,
  ]);
}

export default useAutoSave;