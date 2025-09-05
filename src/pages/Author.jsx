import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../author/AuthorItems";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching author for ID:", id);

        // Call API through proxy (/api) to avoid CORS
        const authorRes = await axios.get(`/api/authors?author=${id}`);
        const nftsRes = await axios.get(`/api/authors-nfts?author=${id}`);

        if (!authorRes.data || Object.keys(authorRes.data).length === 0) {
          setError("Author not found");
        } else {
          setAuthor(authorRes.data);
          setNfts(nftsRes.data || []);
        }
      } catch (err) {
        console.error("Error fetching author data:", err);
        setError("Author not found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading author...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="author-page">
      <div className="author-header">
        <img src={author.authorImage} alt={author.authorName} />
        <h2>{author.authorName}</h2>
      </div>

      {nfts.length > 0 ? (
        <AuthorItems nfts={nfts} />
      ) : (
        <p>No NFTs found for this author.</p>
      )}
    </div>
  );
};

export default Author;
