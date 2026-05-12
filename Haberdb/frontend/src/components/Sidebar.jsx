import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Haber Panel</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/stats">İstatistikler</Link>
        <Link to="/news">Haberler</Link>
        <Link to="/news/create">Haber Ekle</Link>
        <Link to="/users">Kullanıcılar</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
