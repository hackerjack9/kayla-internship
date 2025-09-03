import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../home/carouselArrows.css";
import "../../css/styles/skeleton.css"; // <-- add skeleton CSS

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  const calculateTimeLeft = (endTime) => {
    const now = Date.now();
    const distance = new Date(endTime).getTime() - now;

    if (distance <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const initializedItems = res.data.map((item) =>
          item.expiryDate
            ? { ...item, timeLeft: calculateTimeLeft(item.expiryDate) }
            : item
        );
        setItems(initializedItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.expiryDate
            ? { ...item, timeLeft: calculateTimeLeft(item.expiryDate) }
            : item
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <Slider {...settings}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="nft__item">
                  <div className="skeleton skeleton-avatar"></div>
                  <div className="skeleton skeleton-img"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text short"></div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {items.map((item, index) => (
                <div key={index} className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy"
                        src={item.authorImage}
                        alt={item.author}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {item.expiryDate && item.timeLeft && (
                    <div className="de_countdown">
                      {item.timeLeft.hours}h {item.timeLeft.minutes}m{" "}
                      {item.timeLeft.seconds}s
                    </div>
                  )}

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.id}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.id}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
