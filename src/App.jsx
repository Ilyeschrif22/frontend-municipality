import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import CitizenDashboard from "./pages/citizen/CitizenDashboard"
import NewRequestPage from "./pages/citizen/NewRequestPage"
import AgentDashboard from "./pages/agent/AgentDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/new-request" element={<NewRequestPage />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
