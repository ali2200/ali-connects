
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// لوحة التحكم - المستقلين
import FreelancerDashboard from "./pages/dashboard/freelancer/Dashboard";

// لوحة التحكم - أصحاب الأعمال
import ClientDashboard from "./pages/dashboard/client/Dashboard";

const queryClient = new QueryClient();

const App = () => (
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
);

export default App;
