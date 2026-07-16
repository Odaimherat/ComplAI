import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref and adds the
 * `is-visible` class (see .reveal in index.css) the first time the element
 * scrolls into view. Respects prefers-reduced-motion implicitly since the
 * CSS transition duration is zeroed out by the media query either way.
 */
export function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
