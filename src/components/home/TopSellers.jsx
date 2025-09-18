import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setSellers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch top sellers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5" data-aos="fade-in-up" data-aos-duration="3000">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center"  data-aos="fade-in-up" data-aos-duration="1000">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                // Placeholder skeletons while loading
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div className="lazy pp-author skeleton"></div>
                    </div>
                    <div className="author_list_info">
                      <span className="skeleton skeleton-text">Loading...</span>
                      <span className="skeleton skeleton-text-small">---</span>
                    </div>
                  </li>
                ))
              ) : (
                sellers.map((seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
