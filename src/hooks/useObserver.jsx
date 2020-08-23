import { useState, useEffect } from '@pika/react';

const useObserver = (rootMargin = '0px', threshold = 0.1) => {
  const [ref, setRef] = useState(null);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin,
      threshold,
    };

    const handleIntersect = ([lastElement], observerElement) => {
      if (lastElement.isIntersecting) {
        setIntersecting(true);
        if (ref) observerElement.unobserve(ref);
      }

      setIntersecting(false);
    };

    // defaults to viewport if no root specified
    const observer = new IntersectionObserver(handleIntersect, options);
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, rootMargin, threshold]);

  return [setRef, intersecting];
};

export default useObserver;
