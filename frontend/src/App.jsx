import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Budgeting from "./components/Budgeting";
import ReportsAnalytics from "./components/ReportsAnalytics";
import BudgetingPage from "./components/BudgetingPage";
import GoalsPage from "./components/GoalsPage";
import SettingsPage from "./components/SettingsPage";
import HelpSupportPage from "./components/HelpSupportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgeting" element={<Budgeting />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/budgeting-page" element={<BudgetingPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpSupportPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;