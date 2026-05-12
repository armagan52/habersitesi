import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";
import "./NewsForm.css";

function NewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    status: "published",
    image: "",
  });

  // 🔹 EDIT MODE: HABERİ ÇEK
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      api
        .get(`/news/${id}`)   // ✅ DOĞRU (api.js /api ekliyor)
        .then((res) => {
          setForm(res.data);
        })
        .catch(() => {
          alert("Haber verisi yüklenemedi");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/news/${id}`, form); // ✅
        alert("Haber güncellendi");
      } else {
        await api.post("/news", form);      // ✅
        alert("Haber eklendi");
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("İşlem başarısız");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) return <p style={{ padding: 20 }}>Yükleniyor...</p>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Haber Paneli</h2>
        <Link to="/dashboard">Haberler</Link>
        <Link to="/news/new">Haber Ekle</Link>

        {user?.role === "admin" && <Link to="/users">Kullanıcılar</Link>}

        <button className="logout-btn" onClick={logout}>
          Çıkış Yap
        </button>
      </aside>

      <main className="content">
        <div className="news-form-container">
          <h1>{isEdit ? "Haber Düzenle" : "Haber Ekle"}</h1>

          <form onSubmit={handleSubmit}>
            <label>Başlık</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label>Özet</label>
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required
            />

            <label>İçerik</label>
            <textarea
              name="content"
              rows="6"
              value={form.content}
              onChange={handleChange}
              required
            />

            <label>Kategori</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Kategori Seç</option>
              <option value="Gündem">Gündem</option>
              <option value="Spor">Spor</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Teknoloji">Teknoloji</option>
              <option value="Magazin">Magazin</option>
            </select>

            <label>Görsel URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />

            <label>Durum</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="published">Yayınlandı</option>
              <option value="draft">Taslak</option>
            </select>

            <button type="submit">
              {isEdit ? "Güncelle" : "Kaydet"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NewsForm;
