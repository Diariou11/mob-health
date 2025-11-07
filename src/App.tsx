
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import SearchPage from "./pages/SearchPage";
import PatientPage from "./pages/PatientPage";
import EmergencyPage from "./pages/EmergencyPage";
import UssdPage from "./pages/UssdPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import AIDiagnosisPage from "./pages/AIDiagnosisPage";
import AdminDashboard from "./pages/AdminDashboard";
import InstallPWA from "./pages/InstallPWA";
import { MedicalChatbot } from "./components/ai/MedicalChatbot";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/ussd" element={<UssdPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ai-diagnosis" element={<AIDiagnosisPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/install" element={<InstallPWA />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <MedicalChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
