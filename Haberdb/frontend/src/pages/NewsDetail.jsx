import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Public.css";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/news/public/${id}`)
      .then((res) => setNews(res.data));
  }, [id]);



  return (
    <div className="public-container">
      <h1>{news.title}</h1>
      <p className="date">
        {new Date(news.createdAt).toLocaleDateString("tr-TR")}
      </p>
      <p>{news.content}</p>
    </div>
  );
}

export default NewsDetail;
