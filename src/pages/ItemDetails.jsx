import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNFT = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const foundNFT = response.data.find((item) => item.nftId === Number(id));
        setNft(foundNFT);
      } catch (error) {
        console.error("Error fetching NFT details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium">
        Loading NFT details...
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium text-red-600">
        NFT not found.
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* Image */}
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>

              {/* Info */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nft.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> 100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> 74
                    </div>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. NFT
                    ID: {nft.nftId}, Code: {nft.code}
                  </p>

                  {/* Owner */}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img className="lazy" src={nft.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.authorId}`}>Author #{nft.authorId}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator + Price */}
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img className="lazy" src={nft.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.authorId}`}>Author #{nft.authorId}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="eth" />
                      <span>1.85</span> {/* Example static price */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
