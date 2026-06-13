import React, { useEffect, useRef, useState } from 'react';

export default function LazyVideo({
  src,
  className,
  autoPlay,
  loop,
  muted,
  playsInline,
  controls,
  poster = '/uni-3.jpg',
  preload = 'none',
  ...props
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || shouldLoad) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !shouldLoad || !autoPlay) return;

    const playPromise = node.play?.();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [shouldLoad, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      poster={poster}
      preload={preload}
      {...props}
    />
  );
}
