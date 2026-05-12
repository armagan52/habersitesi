import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Public.css";

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news/public/all")
      .then((res) => setNews(res.data));
  }, []);

  return (
    <div className="public-container">
      <h1>Güncel Haberler</h1>

      {news.map((item) => (
        <div key={item._id} className="news-card">
          <h2>{item.title}</h2>
          <p>{item.summary}</p>
          <Link to={`/haber/${item._id}`}>Devamını oku</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
