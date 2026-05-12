import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import "./PublicNewsDetail.css";

function PublicNewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    api.get(`/news/public/${id}`).then((res) => {
      setNews(res.data);
    });
  }, [id]);

  if (!news) return null;

  return (
    <>
      <header className="public-header">
        <div className="container">
          <h1>Haber Portalı</h1>

          <nav className="nav">
            <Link to="/">Anasayfa</Link>
            <Link to="/category/Gündem">Gündem</Link>
            <Link to="/category/Spor">Spor</Link>
            <Link to="/category/Ekonomi">Ekonomi</Link>
            <Link to="/category/Teknoloji">Teknoloji</Link>
            <Link to="/category/Magazin">Magazin</Link>
          </nav>

          <Link to="/login">Editör Girişi</Link>
        </div>
      </header>

      <div className="detail-container">
        <span className="news-category center">
          {news.category}
        </span>

        <h1>{news.title}</h1>

        {news.image && (
          <img
            src={news.image}
            alt=""
            className="detail-image"
          />
        )}

        <div className="detail-content">
          {news.content}
        </div>
      </div>

      <footer className="footer">
        © 2025 Haber Portalı
      </footer>
    </>
  );
}

export default PublicNewsDetail;
