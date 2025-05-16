import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import AgeGroupsPage from './pages/AgeGroupsPage';
import MythsPage from './pages/MythsPage';
import ResearchPage from './pages/ResearchPage';
import AskPage from './pages/AskPage';

function App() {
  return (
    <Router basename="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/age-groups" element={<AgeGroupsPage />} />
        <Route path="/myths" element={<MythsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/ask" element={<AskPage />} />
      </Routes>
    </Router>
  );
}

export default App;