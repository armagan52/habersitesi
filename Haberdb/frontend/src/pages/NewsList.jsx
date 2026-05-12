import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchNews = async () => {
    try {
      const res = await api.get("/news");
      setNews(res.data);
    } catch (err) {
      console.error("Haberler çekilemedi:", err);
      alert("Haberler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Bu haberi silmek istiyor musun?")) return;

    try {
      await api.delete(`/news/${id}`);
      setNews(news.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
      alert("Silme işlemi başarısız");
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

        {user?.role === "admin" && (
          <Link to="/users">Kullanıcılar</Link>
        )}

        <button className="logout-btn" onClick={logout}>
          Çıkış Yap
        </button>
      </aside>

      {/* CONTENT */}
      <main className="content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Haberler</h1>

          <button
            onClick={() => navigate("/news/new")}
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            + Yeni Haber
          </button>
        </div>

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
                news.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                      <Link
                        to={`/news/edit/${item._id}`}
                        style={{
                          marginRight: "10px",
                          backgroundColor: "#f59e0b",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          textDecoration: "none",
                          fontSize: "14px"
                        }}
                      >
                        Düzenle
                      </Link>

                      <button
                        onClick={() => deleteNews(item._id)}
                        style={{
                          backgroundColor: "#dc2626",
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
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Hiç haber yok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default NewsList;
