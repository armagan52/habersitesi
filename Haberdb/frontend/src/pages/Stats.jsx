import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../services/api"; // API servisin
import "./Dashboard.css"; // Sidebar stilleri
import "./Stats.css";     // 🔥 Yeni kart tasarım stilleri

function Stats() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Başlangıç değerleri 0
  const [stats, setStats] = useState({
    totalNews: 0,
    published: 0,
    draft: 0,
    uniqueCategories: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // API'den haberleri çek
      const res = await api.get("/news");
      const allNews = res.data;

      // Hesaplamaları Yap
      const publishedCount = allNews.filter((n) => n.status === "published").length;
      // Eğer status yoksa veya 'draft' ise taslak say
      const draftCount = allNews.filter((n) => n.status === "draft" || !n.status).length;
      
      // Haberlerden kaç farklı kategori olduğunu bul (Bonus Özellik)
      const uniqueCats = [...new Set(allNews.map(n => n.category))].length;

      setStats({
        totalNews: allNews.length,
        published: publishedCount,
        draft: draftCount,
        uniqueCategories: uniqueCats,
      });

    } catch (err) {
      console.error("İstatistik alınamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR (SABİT VE ZIPLAMAZ) --- */}
      <aside className="sidebar">
        <h2>Haber Paneli</h2>
        <NavLink to="/dashboard" end>Haberler</NavLink>
        <NavLink to="/news/new">Haber Ekle</NavLink>
        <NavLink to="/stats">İstatistikler</NavLink>

        {user?.role === "admin" && (
          <NavLink to="/users">Kullanıcılar</NavLink>
        )}

        <button className="logout-btn" onClick={logout}>Çıkış Yap</button>
      </aside>

      {/* --- CONTENT --- */}
      <main className="content">
        <div className="stats-container">
          <h1>İstatistikler</h1>

          {loading ? (
            <p>Veriler Yükleniyor...</p>
          ) : (
            <div className="stats-grid">
              
              {/* Kart 1: Toplam Haber (Mavi) */}
              <div className="stat-card blue">
                <h3>Toplam Haber</h3>
                <span className="number">{stats.totalNews}</span>
              </div>

              {/* Kart 2: Yayınlanan (Yeşil) */}
              <div className="stat-card green">
                <h3>Yayınlanan</h3>
                <span className="number">{stats.published}</span>
              </div>

              {/* Kart 3: Taslak (Turuncu) - Senin 'Draft' verin */}
              <div className="stat-card orange">
                <h3>Taslak / Bekleyen</h3>
                <span className="number">{stats.draft}</span>
              </div>

              {/* Kart 4: Kategori (Mor) - Otomatik Hesaplandı */}
              <div className="stat-card purple">
                <h3>Aktif Kategoriler</h3>
                <span className="number">{stats.uniqueCategories}</span>
              </div>

            </div>
          )}

          {/* Alt Bilgi Alanı */}
          <div className="stats-detail-box">
            <h2>Sistem Durumu</h2>
            <p>
              Veriler anlık olarak veritabanından çekilmiştir.
              <br />
              Şu anda sistemde toplam <strong>{stats.totalNews}</strong> kayıtlı haber bulunmaktadır.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Stats;