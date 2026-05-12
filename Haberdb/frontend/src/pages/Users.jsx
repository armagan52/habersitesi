import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Kullanıcı silinsin mi?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Haber Paneli</h2>
        <Link to="/dashboard">Haberler</Link>
        <Link to="/news/new">Haber Ekle</Link>
        <Link to="/users">Kullanıcılar</Link>
        <Link to="/users/new">+ Kullanıcı Ekle</Link>
      </aside>

      <main className="content">
        <h1>Kullanıcılar</h1>

        <table>
          <thead>
            <tr>
              <th>Kullanıcı</th>
              <th>Rol</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <Link to={`/users/edit/${u._id}`}>Düzenle</Link>
                  <button onClick={() => deleteUser(u._id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Users;
