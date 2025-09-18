import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const target = new Date(expiryDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const formatted =
        (days > 0 ? `${days}d ` : "") +
        `${hours}h ${minutes}m ${seconds}s`;

      setTimeLeft(formatted);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [explore, setExplore] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(API_URL);
        setExplore(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch explore items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    let sorted = [...explore];

    if (value === "price_low_to_high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "price_high_to_low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }

    setFiltered(sorted);
    setVisible(8);
  };

  const loadMore = () => {
    setVisible((prev) => prev + 4);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {filtered.slice(0, visible).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          data-aos="fade-right" data-aos-duration="4000"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            {/* Author */}
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img
                  className="lazy"
                  src={item.authorImage || AuthorImage}
                  alt={item.author}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {/* Countdown */}
            {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

            {/* NFT Preview */}
            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            {/* Info */}
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
        </div>
      ))}

      {visible < filtered.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
