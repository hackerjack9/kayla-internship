import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems") // your API endpoint
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Slider {...settings}>
      {items.map((nft) => (
        <div key={nft.id} className="nft-card" style={{ position: "relative" }}>
          {/* Top-left clickable avatar */}
          <Link to={`/author/${nft.authorID}`}>
            <img
              src={nft.authorImage}
              alt={nft.authorName}
              className="author-avatar"
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "2px solid white",
                zIndex: 2
              }}
            />
          </Link>

          {/* NFT image */}
          <img
            src={nft.image}
            alt={nft.title}
            style={{
              width: "100%",
              borderRadius: "10px",
              objectFit: "cover"
            }}
          />

          {/* NFT title */}
          <h3 style={{ marginTop: "10px" }}>{nft.title}</h3>
          <p>{nft.price} ETH</p>
        </div>
      ))}
    </Slider>
  );
};

export default NewItems;
