import React, { useEffect, useRef } from 'react';

const ResizeObserverWrapper = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new ResizeObserver(() => {
      // Esegui l'aggiornamento in un'animazione frame per evitare loop
      window.requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.display = 'none';
          // Forza un reflow
          void ref.current.offsetHeight;
          ref.current.style.display = '';
        }
      });
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default ResizeObserverWrapper;