import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";           
import "slick-carousel/slick/slick-theme.css";   

import { NFTs } from "../data/nfts";              
import NFTCard from "./NFTCard";                   
import "./carousel.css";                          

import SkeletonCard from "./UI/SkeletonCard";     
import "./UI/skeleton.css";                        

const NextArrow = ({ className, style, onClick }) => (
  <button
    className={className}
    onClick={onClick}
    aria-label="next"
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <span className="arrow-icon">›</span>
  </button>
);

const PrevArrow = ({ className, style, onClick }) => (
  <button
    className={className}
    onClick={onClick}
    aria-label="prev"
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <span className="arrow-icon">‹</span>
  </button>
);

export default function NFTCarousel() {

  const items = useMemo(() => NFTs.slice(0, 6), []);

 
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const MIN = 300;                        
    const t0 = performance.now();


    const urls = items.flatMap(i => [i.nftImage, i.authorImage]).filter(Boolean);


    if (!urls.length) {
      const wait = Math.max(0, MIN - (performance.now() - t0));
      const id = setTimeout(() => setLoading(false), wait);
      return () => clearTimeout(id);
    }

    let alive = true;                    
    let loaded = 0;
    const timers = [];

    const finish = () => {
      const wait = Math.max(0, MIN - (performance.now() - t0));
      const id = setTimeout(() => { if (alive) setLoading(false); }, wait);
      timers.push(id);
    };

  
    urls.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded === urls.length) finish();
      };
    });

   
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [items]);

 
  const settings = {
    arrows: true,           
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,       
    slidesToScroll: 1,
    autoplay: true,       
    autoplaySpeed: 2500,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, 
      { breakpoint: 640,  settings: { slidesToShow: 1 } } 
    ]
  };

 
  return (
    <div className="carousel-wrap" aria-busy={loading}>
      {loading ? (
       
        <div className="skeleton-grid">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id}>
              <NFTCard item={item} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}