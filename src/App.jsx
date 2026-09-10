import { BrowserRouter as Router,Routes, Route } from "react-router";
import Landingpage from "./Page/Landingpage";
import About from './Page/About'
import Profile from './Page/Profile'
import Practice from "./Page/Practice";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </Router>
  )
}