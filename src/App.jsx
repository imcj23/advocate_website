import { BrowserRouter as Router,Routes, Route } from "react-router";
import Landingpage from "./Page/Landingpage";
import About from './Page/About'
import Profile from './Page/Profile'
import Practice from "./Page/Practice";
import Contact from "./Page/Contact";
import Insight from "./Page/Insight";

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
      </Routes>
    </Router>
  )
}