import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams(); // get :nftId from URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nftId) return;

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching NFT details:", err);
        setLoading(false);
      });
  }, [nftId]);

  if (loading) {
    return <div>Loading NFT details...</div>;
  }

  if (!item) {
    return <div>No NFT details found.</div>;
  }

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        {/* NFT image */}
        <div className="col-lg-6">
          <img
            src={item.nftImage}
            alt={item.title}
            className="img-fluid"
            style={{ borderRadius: "16px" }}
          />
        </div>

        {/* NFT info */}
        <div className="col-lg-6">
          <h2>{item.title}</h2>
          <p>{item.description}</p>

          <div className="item-details-meta">
            <p>
              <strong>Price:</strong> {item.price} ETH
            </p>
            <p>
              <strong>Likes:</strong> {item.likes} ❤️
            </p>
            <p>
              <strong>Author:</strong>{" "}
              <Link to={`/author/${item.authorId}`}>
                {item.authorName}
              </Link>
            </p>
          </div>

          <button className="btn-main">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
