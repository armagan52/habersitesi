import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Giriş başarısız");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Haber Paneli</h1>
        <p>Yönetim paneline giriş yap</p>

        <form onSubmit={handleSubmit}>
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            placeholder="kullaniciadi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Şifre</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Giriş Yap</button>
        </form>

        <div className="login-footer">
          © 2025 Haber Yönetim Sistemi
        </div>
      </div>
    </div>
  );
}

export default Login;
