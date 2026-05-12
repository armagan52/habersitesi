import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Yönlendirme için Link kullanıyoruz
import api from "../services/api"; // Senin api.js dosyan
import "./Dashboard.css";

function Dashboard() {
  const [news, setNews] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  // Haberleri Listeleme
  const fetchNews = async () => {
    try {
      // ✅ URL DOĞRUSU: api.js zaten /api ekliyor, burası sadece /news
      const res = await api.get("/news");
      setNews(res.data);
    } catch (error) {
      console.error("Haberler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Haber Silme
  const deleteNews = async (id) => {
    if (!window.confirm("Bu haberi silmek istediğine emin misin?")) return;
    try {
      // ✅ URL DOĞRUSU: /news/ID
      await api.delete(`/news/${id}`);
      // Sayfayı yenilemeden listeden siliyoruz (Performans için)
      setNews(news.filter((item) => item._id !== id));
      alert("Haber silindi.");
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Haber silinemedi!");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
     <h2>Haber Paneli</h2>

        <Link to="/dashboard">Haberler</Link>
        <Link to="/news/new">Haber Ekle</Link>
         <Link to="./stats">İstatistikler</Link>
         
        {user?.role === "admin" && (
          <Link to="/users">Kullanıcılar</Link>
          
        )}

        <button className="logout-btn" onClick={logout}>
          Çıkış Yap
        </button>
      </aside>

      {/* İÇERİK */}
      <main className="content">
        <h1>Haberler</h1>

        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Başlık</th>
                <th>Kategori</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {news.length > 0 ? (
                news.map((n) => (
                  <tr key={n._id}>
                    <td>{n.title}</td>
                    <td>{n.category}</td>
                    <td>
                      {/* 🔥 İŞTE BURASI: NewsEdit.jsx'e GÖNDEREN KISIM */}
                      <Link 
                        to={`/news/edit/${n._id}`}
                        style={{
                          textDecoration: "none",
                          backgroundColor: "#f39c12", // Turuncu renk
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          marginRight: "10px",
                          fontSize: "14px"
                        }}
                      >
                        Düzenle
                      </Link>

                      <button 
                        onClick={() => deleteNews(n._id)}
                        style={{
                          backgroundColor: "#e74c3c", // Kırmızı renk
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Hiç haber bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default Dashboard;