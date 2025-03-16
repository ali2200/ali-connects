
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// لوحة التحكم - المستقلين
import FreelancerDashboard from "./pages/dashboard/freelancer/Dashboard";

// لوحة التحكم - أصحاب الأعمال
import ClientDashboard from "./pages/dashboard/client/Dashboard";

// صفحات أساسية
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// سوق الخدمات
import Marketplace from "./pages/marketplace/Marketplace";

// صفحات الدورات
import Courses from "./pages/courses/Courses";
import LearningPaths from "./pages/LearningPaths";
import Certifications from "./pages/Certifications";

// صفحة المستقلين
import Freelancers from "./pages/Freelancers";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* الصفحة الرئيسية والصفحات العامة */}
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* صفحات الدورات والتعليم */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/certifications" element={<Certifications />} />
            
            {/* سوق الخدمات */}
            <Route path="/marketplace" element={<Marketplace />} />
            
            {/* صفحة المستقلين */}
            <Route path="/freelancers" element={<Freelancers />} />
            
            {/* لوحة تحكم المستقلين */}
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            
            {/* لوحة تحكم أصحاب الأعمال */}
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            
            {/* صفحة 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
