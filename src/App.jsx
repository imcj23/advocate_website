import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router";
import Landingpage from "./Page/public/Landingpage";
import About from "./Page/public/About";
import Profile from "./Page/public/Profile";
import Practice from "./Page/public/Practice";
import Insight from "./Page/public/Insight";
import Contact from "./Page/public/Contact";

// page admin
import Login from "./Page/admin/Login";
import Dashboard from "./Page/admin/Dashboard";
import PracticeAdmin from "./Page/admin/Practice";

// Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/practice"
          element={
            <ProtectedRoute>
              <PracticeAdmin />
            </ProtectedRoute>
          }
        />
        {/*
        <Route
          path="/admin/advocate"
          element={
            <ProtectedRoute>
              <Advocate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/article"
          element={
            <ProtectedRoute>
              <Article />
            </ProtectedRoute>
          }
        />
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
