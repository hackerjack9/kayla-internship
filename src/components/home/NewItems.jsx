import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../home/carouselArrows.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        setLoading(false);
      });
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (!item.expiryDate) return item;

          const timeLeft = calculateTimeLeft(item.expiryDate);
          return { ...item, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeLeft = (endTime) => {
    const now = new Date().getTime();
    const distance = new Date(endTime).getTime() - now;

    if (distance <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    return { hours, minutes, seconds };
  };

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

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container text-center">
          <h4>...Loading</h4>
        </div>
      </section>
    );
  }

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

          <Slider {...settings}>
            {items.map((item, index) => (
              <div key={index} className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.author}`}
                  >
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt={item.author}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* Countdown */}
                 {/* Countdown - only show if expiryDate exists */}
                {item.expiryDate && item.timeLeft && (
                  <div className="de_countdown">
                    {item.timeLeft.hours}h {item.timeLeft.minutes}m {item.timeLeft.seconds}s
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                        <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                        <a href="#"><i className="fa fa-envelope fa-lg"></i></a>
                      </div>
                    </div>
                  </div>

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
        </div>
      </div>
    </section>
  );
};

export default NewItems;
