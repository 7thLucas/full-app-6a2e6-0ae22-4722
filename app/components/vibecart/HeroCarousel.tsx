import { useEffect, useState, useCallback } from "react";
import type { THeroBanner } from "~/modules/configurables/src/constants/configurables.default";

interface HeroCarouselProps {
  banners: THeroBanner[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ banners, autoPlayInterval = 3500 }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 450);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    goToSlide((activeIndex + 1) % banners.length);
  }, [activeIndex, banners.length, goToSlide]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [goNext, autoPlayInterval, banners.length]);

  if (!banners || banners.length === 0) return null;

  const banner = banners[activeIndex];

  return (
    <section className="relative overflow-hidden mx-4 rounded-2xl" style={{ minHeight: 200 }}>
      {/* Slide */}
      <div
        key={activeIndex}
        className="relative flex items-end overflow-hidden rounded-2xl vc-slide-in"
        style={{
          minHeight: 200,
          background: banner.bgColor || "#1a1f5e",
        }}
      >
        {/* Background image */}
        {banner.imageUrl && (
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
            loading="eager"
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,40,0.92) 0%, rgba(10,10,40,0.45) 50%, rgba(10,10,40,0.1) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-5 w-full">
          {banner.badgeText && (
            <span
              className="inline-block px-2.5 py-1 rounded-full text-white text-[10px] font-extrabold uppercase tracking-widest mb-2"
              style={{ background: "var(--vc-sale)" }}
            >
              {banner.badgeText}
            </span>
          )}
          <h2
            className="text-white text-3xl font-extrabold leading-tight mb-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
          >
            {banner.title}
          </h2>
          {banner.subtitle && (
            <p className="text-white/80 text-sm mb-3">{banner.subtitle}</p>
          )}
          {banner.ctaText && (
            <button
              className="px-5 py-2 rounded-full text-white text-sm font-bold vc-btn-press transition-transform active:scale-95"
              style={{ background: "var(--vc-accent)" }}
            >
              {banner.ctaText}
            </button>
          )}
        </div>
      </div>

      {/* Pagination dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 right-4 flex gap-1.5 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="transition-all duration-300"
              style={{
                width: idx === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: idx === activeIndex ? "#fff" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
