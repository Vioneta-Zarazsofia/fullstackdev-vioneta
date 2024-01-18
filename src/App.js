import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Stories from "./pages/Story";
import AddingStory from "./pages/AddStory";
import AddingChapter from "./pages/AddChapter";
import EditingStory from "./pages/EditStory";
import EditingChapter from "./pages/EditChapter";
import ShowingStory from "./pages/ShowStory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/story" element={<Stories />} />
        <Route path="/story/add" element={<AddingStory />} />
        <Route path="/story/:id" element={<ShowingStory />} />
        <Route path="/story/edit/:id" element={<EditingStory />} />
        <Route path="/story/add/chapter" element={<AddingChapter />} />
        <Route path="/story/add/chapter/:id" element={<EditingChapter />} />
        <Route path="/story/edit/:id/chapter/:id" element={<EditingChapter />} />
      </Routes>
    </Router>
  );
}

export default App;
