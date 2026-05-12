import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "./PublicNews.css";
import HeroSlider from "../components/HeroSlider";


function PublicNews() {
  const [news, setNews] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      api
        .get(`/news/public/category/${category}`)
        .then((res) => setNews(res.data));
    } else {
      api
        .get("/news/public/all")
        .then((res) => setNews(res.data));
    }
  }, [category]);

  return (
    <>
      {/* HEADER */}
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
<HeroSlider />

      {/* CONTENT */}
      <main className="public-container">
        <div className="news-grid">
          {news.map((n) => (
            <div key={n._id} className="news-card">
              {n.image && (
                <img
                  src={n.image}
                  alt={n.title}
                  className="news-image"
                />
              )}

              <div className="news-card-body">
                <span className="news-category">{n.category}</span>
                <h2>{n.title}</h2>
                <p>{n.summary}</p>
              </div>

              <div className="news-card-footer">
                <Link to={`/news/${n._id}`}>Devamını Oku</Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER (SADECE ANASAYFA İÇİN) */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Haber Portalı • Tüm hakları saklıdır</p>
        </div>
      </footer>
    </>
  );
}

export default PublicNews;
