import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api"; // Senin api.js dosyan
import "./Dashboard.css"; // CSS dosyan

function NewsEdit() {
  const { id } = useParams(); // URL'den ID'yi al
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);

  // Form State'i
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    status: "published",
    image: "",
  });

  // 1. MEVCUT VERİYİ ÇEK (Hata veren yer burasıydı)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // ✅ DÜZELTME: "/api/news" DEĞİL, SADECE "/news"
        // api.js zaten base URL'e /api ekliyor.
        const res = await api.get(`/news/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Haber verisi çekilemedi:", error);
        alert("Haber verisi yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        navigate("/dashboard"); // Hata olursa listeye at
      }
    };

    if (id) fetchNews();
  }, [id, navigate]);

  // Input değişince state güncelle
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Görsel yükleme
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. GÜNCELLEME İŞLEMİ (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // ✅ BURADA DA SADECE /news KULLANIYORUZ
      await api.put(`/news/${id}`, form);
      alert("Haber başarıyla güncellendi! ✅");
      navigate("/dashboard");
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Güncelleme sırasında hata oluştu ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <main className="content">
          <h2>Veriler Yükleniyor...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Panel</h2>
        <Link to="/dashboard">Haberler</Link>
        <Link to="/news/new">Haber Ekle</Link>
        {user?.role === "admin" && <Link to="/users">Kullanıcılar</Link>}
        <button className="logout-btn" onClick={logout}>Çıkış Yap</button>
      </aside>

      <main className="content">
        <div className="news-form-container">
          <h1>Haberi Düzenle</h1>

          <form onSubmit={handleUpdate}>
            <label>Başlık</label>
            <input name="title" value={form.title} onChange={handleChange} required />

            <label>Özet</label>
            <input name="summary" value={form.summary} onChange={handleChange} required />

            <label>İçerik</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows="6" required />

            <label>Kategori</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              <option value="Gündem">Gündem</option>
              <option value="Spor">Spor</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Teknoloji">Teknoloji</option>
              <option value="Magazin">Magazin</option>
            </select>

            <label>Mevcut Görsel</label>
            {form.image && (
              <img src={form.image} alt="News" style={{ width: "150px", display: "block", marginBottom: "10px", borderRadius: "5px" }} />
            )}

            <label>Görseli Değiştir</label>
            <input type="file" accept="image/*" onChange={handleImage} />

            <div style={{marginTop: "20px"}}>
              <button type="submit">Güncelle</button>
              <button 
                type="button" 
                onClick={() => navigate("/dashboard")} 
                style={{marginLeft: "10px", backgroundColor: "#555"}}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NewsEdit;