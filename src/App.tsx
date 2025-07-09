import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/what-is-agentic" element={<WhatIsAgentic />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/chatbots" element={<Chatbots />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developer-guides" element={<DeveloperGuides />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/watch-demo" element={<WatchDemo />} />
            <Route path="/schedule-demo" element={<ScheduleDemo />} />
            
            {/* Service Pages */}
            <Route path="/services/workflow-automation" element={<WorkflowAutomation />} />
            <Route path="/services/ai-strategy" element={<AIStrategy />} />
            <Route path="/services/llm-integration" element={<LLMIntegration />} />
            <Route path="/services/cloud-deployment" element={<CloudDeployment />} />
            <Route path="/services/training" element={<Training />} />
            
            {/* Use Case Pages */}
            <Route path="/use-cases/automated-loan-processing" element={<AutomatedLoanProcessing />} />
            <Route path="/use-cases/patient-care-coordination" element={<PatientCareCoordination />} />
            <Route path="/use-cases/dynamic-pricing" element={<DynamicPricing />} />
            <Route path="/use-cases/predictive-maintenance" element={<PredictiveMaintenance />} />
            <Route path="/use-cases/contract-analysis" element={<ContractAnalysis />} />
            <Route path="/use-cases/talent-matching" element={<TalentMatching />} />
            <Route path="/use-cases/personalized-learning" element={<PersonalizedLearning />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
