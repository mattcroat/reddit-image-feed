import { useState, useEffect } from 'preact/hooks';

const useObserver = (target, rootMargin = '0px', threshold = 0.1) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin,
      threshold,
    };

    const handleIntersect = (entries, observerElement) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('intersecting');
          setIntersecting(true);

          if (target.current) observerElement.unobserve(target.current);
        }
      });
    };

    // defaults to viewport if no root specified
    const observer = new IntersectionObserver(handleIntersect, options);
    if (target.current) observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
    };
  });

  return [intersecting];
};

export default useObserver;
