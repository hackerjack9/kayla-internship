import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ nfts }) => {
  if (!nfts || nfts.length === 0) {
    return <p>No NFTs found for this author.</p>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nfts.map((nft) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={nft.id}
            >
              <div className="nft__item">
                {/* Author avatar */}
                <div className="author_list_pp">
                  <Link to={`/author/${nft.authorId}`}>
                    <img
                      className="lazy"
                      src={nft.authorImage}
                      alt={nft.authorName}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* NFT Image */}
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${nft.id}`}>
                    <img
                      src={nft.image}
                      className="lazy nft__item_preview"
                      alt={nft.title}
                    />
                  </Link>
                </div>

                {/* NFT Info */}
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.id}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
