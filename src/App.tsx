import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AgenticBoss from "./pages/AgenticBoss";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import BlogManagement from "./components/admin/BlogManagement";
import PagesManagement from "./components/admin/PagesManagement";
import AnalyticsManagement from "./components/admin/AnalyticsManagement";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WhatIsAgentic from "./pages/WhatIsAgentic";
import UseCases from "./pages/UseCases";
import Chatbots from "./pages/Chatbots";
import Consulting from "./pages/Consulting";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DeveloperGuides from "./pages/DeveloperGuides";
import Resources from "./pages/Resources";
import GetStarted from "./pages/GetStarted";
import WatchDemo from "./pages/WatchDemo";
import ScheduleDemo from "./pages/ScheduleDemo";

// Service Pages
import WorkflowAutomation from "./pages/services/WorkflowAutomation";
import AIStrategy from "./pages/services/AIStrategy";
import LLMIntegration from "./pages/services/LLMIntegration";
import CloudDeployment from "./pages/services/CloudDeployment";
import Training from "./pages/services/Training";

// Use Cases
import AutomatedLoanProcessing from "./pages/use-cases/AutomatedLoanProcessing";
import PatientCareCoordination from "./pages/use-cases/PatientCareCoordination";
import DynamicPricing from "./pages/use-cases/DynamicPricing";
import PredictiveMaintenance from "./pages/use-cases/PredictiveMaintenance";
import ContractAnalysis from "./pages/use-cases/ContractAnalysis";
import TalentMatching from "./pages/use-cases/TalentMatching";
import PersonalizedLearning from "./pages/use-cases/PersonalizedLearning";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/agentic-boss" element={<AgenticBoss />} />
            <Route 
              path="/agentic-boss/*" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="pages" element={<PagesManagement />} />
              <Route path="analytics" element={<AnalyticsManagement />} />
              <Route path="resources" element={<div className="p-8 text-center text-muted-foreground">Resources Management - Coming Soon!</div>} />
              <Route path="services" element={<div className="p-8 text-center text-muted-foreground">Services Management - Coming Soon!</div>} />
              <Route path="use-cases" element={<div className="p-8 text-center text-muted-foreground">Use Cases Management - Coming Soon!</div>} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Public Website Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/what-is-agentic" element={<Layout><WhatIsAgentic /></Layout>} />
            <Route path="/use-cases" element={<Layout><UseCases /></Layout>} />
            <Route path="/chatbots" element={<Layout><Chatbots /></Layout>} />
            <Route path="/consulting" element={<Layout><Consulting /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/developer-guides" element={<Layout><DeveloperGuides /></Layout>} />
            <Route path="/resources" element={<Layout><Resources /></Layout>} />
            <Route path="/get-started" element={<Layout><GetStarted /></Layout>} />
            <Route path="/watch-demo" element={<Layout><WatchDemo /></Layout>} />
            <Route path="/schedule-demo" element={<Layout><ScheduleDemo /></Layout>} />

            {/* Service Pages */}
            <Route path="/services/workflow-automation" element={<Layout><WorkflowAutomation /></Layout>} />
            <Route path="/services/ai-strategy" element={<Layout><AIStrategy /></Layout>} />
            <Route path="/services/llm-integration" element={<Layout><LLMIntegration /></Layout>} />
            <Route path="/services/cloud-deployment" element={<Layout><CloudDeployment /></Layout>} />
            <Route path="/services/training" element={<Layout><Training /></Layout>} />

            {/* Use Case Pages */}
            <Route path="/use-cases/automated-loan-processing" element={<Layout><AutomatedLoanProcessing /></Layout>} />
            <Route path="/use-cases/patient-care-coordination" element={<Layout><PatientCareCoordination /></Layout>} />
            <Route path="/use-cases/dynamic-pricing" element={<Layout><DynamicPricing /></Layout>} />
            <Route path="/use-cases/predictive-maintenance" element={<Layout><PredictiveMaintenance /></Layout>} />
            <Route path="/use-cases/contract-analysis" element={<Layout><ContractAnalysis /></Layout>} />
            <Route path="/use-cases/talent-matching" element={<Layout><TalentMatching /></Layout>} />
            <Route path="/use-cases/personalized-learning" element={<Layout><PersonalizedLearning /></Layout>} />

            {/* 404 Not Found */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
