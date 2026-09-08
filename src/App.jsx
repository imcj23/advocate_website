import { BrowserRouter as Router,Routes, Route } from "react-router";
import Landingpage from "./Page/Landingpage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
    </Router>
  )
}