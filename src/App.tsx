
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// جميع صفحات الموقع
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";

// صفحات الدورات والتدريب
import Courses from "./pages/courses/Courses";
import CourseDetails from "./pages/courses/CourseDetails";
import Certifications from "./pages/courses/Certifications";
import LearningPaths from "./pages/courses/LearningPaths";

// صفحات سوق الخدمات
import Marketplace from "./pages/marketplace/Marketplace";
import ServiceDetails from "./pages/marketplace/ServiceDetails";
import Orders from "./pages/marketplace/Orders";

// صفحات المستقلين
import Freelancers from "./pages/freelancers/Freelancers";
import FreelancerProfile from "./pages/freelancers/FreelancerProfile";

// لوحة التحكم - المستقلين
import FreelancerDashboard from "./pages/dashboard/freelancer/Dashboard";
import FreelancerProjects from "./pages/dashboard/freelancer/Projects";
import FreelancerEarnings from "./pages/dashboard/freelancer/Earnings";
import FreelancerReviews from "./pages/dashboard/freelancer/Reviews";
import FreelancerProfile as FreelancerProfileSettings from "./pages/dashboard/freelancer/Profile";
import FreelancerServices from "./pages/dashboard/freelancer/Services";

// لوحة التحكم - أصحاب الأعمال
import ClientDashboard from "./pages/dashboard/client/Dashboard";
import ClientProjects from "./pages/dashboard/client/Projects";
import NewProject from "./pages/dashboard/client/NewProject";
import ClientPayments from "./pages/dashboard/client/Payments";
import ClientProfile from "./pages/dashboard/client/Profile";

// لوحة تحكم الإدارة
import AdminDashboard from "./pages/dashboard/admin/Dashboard";
import AdminUsers from "./pages/dashboard/admin/Users";
import AdminCourses from "./pages/dashboard/admin/Courses";
import AdminMarketplace from "./pages/dashboard/admin/Marketplace";
import AdminFinance from "./pages/dashboard/admin/Finance";
import AdminReviews from "./pages/dashboard/admin/Reviews";
import AdminAnalytics from "./pages/dashboard/admin/Analytics";
import AdminContent from "./pages/dashboard/admin/Content";
import AdminBlog from "./pages/dashboard/admin/Blog";

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* المدونة */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* الدورات والتدريب */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          
          {/* سوق الخدمات */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/service/:id" element={<ServiceDetails />} />
          <Route path="/marketplace/orders" element={<Orders />} />
          
          {/* المستقلين */}
          <Route path="/freelancers" element={<Freelancers />} />
          <Route path="/freelancers/:id" element={<FreelancerProfile />} />
          
          {/* لوحة تحكم المستقلين */}
          <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
          <Route path="/dashboard/freelancer/projects" element={<FreelancerProjects />} />
          <Route path="/dashboard/freelancer/earnings" element={<FreelancerEarnings />} />
          <Route path="/dashboard/freelancer/reviews" element={<FreelancerReviews />} />
          <Route path="/dashboard/freelancer/profile" element={<FreelancerProfileSettings />} />
          <Route path="/dashboard/freelancer/services" element={<FreelancerServices />} />
          
          {/* لوحة تحكم أصحاب الأعمال */}
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/dashboard/client/projects" element={<ClientProjects />} />
          <Route path="/dashboard/client/projects/new" element={<NewProject />} />
          <Route path="/dashboard/client/payments" element={<ClientPayments />} />
          <Route path="/dashboard/client/profile" element={<ClientProfile />} />
          
          {/* لوحة تحكم الإدارة */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/courses" element={<AdminCourses />} />
          <Route path="/dashboard/admin/marketplace" element={<AdminMarketplace />} />
          <Route path="/dashboard/admin/finance" element={<AdminFinance />} />
          <Route path="/dashboard/admin/reviews" element={<AdminReviews />} />
          <Route path="/dashboard/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/dashboard/admin/content" element={<AdminContent />} />
          <Route path="/dashboard/admin/blog" element={<AdminBlog />} />
          
          {/* صفحة 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
