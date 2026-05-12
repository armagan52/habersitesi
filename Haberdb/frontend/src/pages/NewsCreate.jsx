import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import newsService from "../services/newsService";
import "./NewsForm.css";

function NewsCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    status: "draft"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newsService.create(form);
    navigate("/news");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        <h1>Haber Ekle</h1>

        <form className="news-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Başlık"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="summary"
            placeholder="Özet"
            value={form.summary}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Haber İçeriği"
            rows="6"
            value={form.content}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Kategori"
            value={form.category}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
          </select>

          <button type="submit">Kaydet</button>
        </form>
      </div>
    </div>
  );
}

export default NewsCreate;
