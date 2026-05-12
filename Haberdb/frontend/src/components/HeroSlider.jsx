import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./HeroSlider.css";

function HeroSlider() {
  const [news, setNews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get("/news/public/all").then((res) => {
      setNews(res.data.slice(0, 5)); // ilk 5 haber
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [news]);

  if (!news.length) return null;

  const current = news[index];

  return (
    <div className="hero-slider">
      <img src={current.image} alt={current.title} />

      <div className="hero-overlay">
        <span className="hero-category">{current.category}</span>
        <h2>{current.title}</h2>
        <p>{current.summary}</p>

        <Link to={`/news/${current._id}`} className="hero-btn">
          Devamını Oku
        </Link>
      </div>

      <button
        className="hero-arrow left"
        onClick={() =>
          setIndex((index - 1 + news.length) % news.length)
        }
      >
        ‹
      </button>

      <button
        className="hero-arrow right"
        onClick={() =>
          setIndex((index + 1) % news.length)
        }
      >
        ›
      </button>
    </div>
  );
}

export default HeroSlider;
