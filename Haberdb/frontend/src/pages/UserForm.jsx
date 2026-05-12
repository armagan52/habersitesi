import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";
import "./NewsForm.css";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "editor",
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/users/${id}`).then((res) => {
        setForm({
          username: res.data.username,
          password: "",
          role: res.data.role,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 BOŞ ŞİFREYİ BACKEND'E GÖNDERME
    const payload = {
      username: form.username,
      role: form.role,
    };

    if (form.password && form.password.trim() !== "") {
      payload.password = form.password;
    }

    if (isEdit) {
      await api.put(`/users/${id}`, payload);
    } else {
      await api.post("/users", payload);
    }

    navigate("/users");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Haber Paneli</h2>

        <Link to="/dashboard">Haberler</Link>
        <Link to="/news/new">Haber Ekle</Link>
        <Link to="/users">Kullanıcılar</Link>
        <Link to="/users/new">+ Kullanıcı Ekle</Link>

        <button className="logout-btn" onClick={logout}>
          Çıkış Yap
        </button>
      </aside>

      {/* CONTENT */}
      <main className="content">
        <div className="news-form-container">
          <h1>{isEdit ? "Kullanıcı Düzenle" : "Kullanıcı Ekle"}</h1>

          <form onSubmit={handleSubmit}>
            <label>Kullanıcı Adı</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <label>
              Şifre {isEdit && "(Boş bırakırsan değişmez)"}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <label>Rol</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>

            <button type="submit">Kaydet</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UserForm;
