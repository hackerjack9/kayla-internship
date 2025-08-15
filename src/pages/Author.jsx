import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Author = () => {
  const { authorID } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.example.com/authors/${authorID}`)
      .then((res) => setAuthor(res.data))
      .catch(console.error);
  }, [authorID]);

  if (!author) return <p>Loading author...</p>;

  return (
    <div>
      <h1>{author.name}</h1>
      <img src={author.image} alt={author.name} width={150} />
      <p>{author.bio}</p>
    </div>
  );
};

export default Author;
