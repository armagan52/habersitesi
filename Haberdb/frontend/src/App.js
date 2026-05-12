import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* PUBLIC */
import PublicNews from "./pages/PublicNews";
import PublicNewsDetail from "./pages/PublicNewsDetail";

/* AUTH */
import Login from "./pages/Login";

/* PANEL */
import Dashboard from "./pages/Dashboard";
import NewsForm from "./pages/NewsForm";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import Stats from "./pages/Stats"; // 🔥 BU YOKTU / YANLIŞTI

/* GUARD */
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicNews />} />
        <Route path="/news/:id" element={<PublicNewsDetail />} />
        <Route path="/category/:category" element={<PublicNews />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 🔥 İSTATİSTİK SAYFASI */}
        <Route
          path="/dashboard/stats"
          element={
            <PrivateRoute>
              <Stats />
            </PrivateRoute>
          }
        />

        {/* HABER EKLE */}
        <Route
          path="/news/new"
          element={
            <PrivateRoute>
              <NewsForm />
            </PrivateRoute>
          }
        />

        {/* HABER DÜZENLE */}
        <Route
          path="/news/edit/:id"
          element={
            <PrivateRoute>
              <NewsForm />
            </PrivateRoute>
          }
        />

        {/* KULLANICILAR */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/new"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
        

        {/* FALLBACK */}
        <Route path="*" element={<PublicNews />} />
      </Routes>
    </Router>
  );
}

export default App;
