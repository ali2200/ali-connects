
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
import FreelancerProfile from "./pages/dashboard/freelancer/Profile";
import FreelancerProjects from "./pages/dashboard/freelancer/Projects";
import FreelancerServices from "./pages/dashboard/freelancer/Services";
import FreelancerEarnings from "./pages/dashboard/freelancer/Earnings";
import FreelancerReviews from "./pages/dashboard/freelancer/Reviews";
import MyProposals from "./pages/dashboard/freelancer/MyProposals";

// لوحة التحكم - أصحاب الأعمال
import ClientDashboard from "./pages/dashboard/client/Dashboard";
import ClientProfile from "./pages/dashboard/client/Profile";
import ClientProjects from "./pages/dashboard/client/Projects";
import ClientNewProject from "./pages/dashboard/client/NewProject";
import ClientPayments from "./pages/dashboard/client/Payments";
import ManageJobs from "./pages/dashboard/client/ManageJobs";
import PostJob from "./pages/dashboard/client/PostJob";

// لوحة التحكم - المحاضرين
import LecturerDashboard from "./pages/dashboard/lecturer/Dashboard";
import LecturerProfile from "./pages/dashboard/lecturer/Profile";
import LecturerCourses from "./pages/dashboard/lecturer/Courses";
import LecturerCourseUpload from "./pages/dashboard/lecturer/CourseUpload";
import LecturerBooks from "./pages/dashboard/lecturer/Books";
import LecturerBookUpload from "./pages/dashboard/lecturer/BookUpload";
import LecturerStudents from "./pages/dashboard/lecturer/Students";
import LecturerLectures from "./pages/dashboard/lecturer/Lectures";
import LecturerEarnings from "./pages/dashboard/lecturer/Earnings";

// لوحة تحكم المشرف - Admin Dashboard
import AdminDashboard from "./pages/dashboard/admin/Dashboard";
import AdminUsers from "./pages/dashboard/admin/Users";
import AdminCourses from "./pages/dashboard/admin/Courses";
import AdminServices from "./pages/dashboard/admin/Services";
import AdminBlogs from "./pages/dashboard/admin/Blogs";
import AdminSettings from "./pages/dashboard/admin/Settings";
import AdminFinance from "./pages/dashboard/admin/Finance";
import AdminStats from "./pages/dashboard/admin/Stats";

// إدارة المحتوى - Content Management
import HomePageContent from "./pages/dashboard/admin/content/HomePage";
import AboutPageContent from "./pages/dashboard/admin/content/AboutPage";

// الإشعارات المشتركة
import Notifications from "./pages/dashboard/shared/Notifications";
import Settings from "./pages/Settings";

// صفحات أساسية
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// سوق الخدمات
import Marketplace from "./pages/marketplace/Marketplace";
import ServiceDetail from "./pages/marketplace/ServiceDetail";

// صفحات الدورات
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail";
import LearningPaths from "./pages/LearningPaths";
import Certifications from "./pages/Certifications";

// صفحة المستقلين
import Freelancers from "./pages/Freelancers";

// صفحات الكتب
import Books from "./pages/books/Books";
import BookDetail from "./pages/books/BookDetail";

// صفحات الوظائف
import Jobs from "./pages/jobs/Jobs";
import JobDetail from "./pages/jobs/JobDetail";

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
            <Route path="/settings" element={<Settings />} />
            
            {/* صفحات الدورات والتعليم */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/certifications" element={<Certifications />} />
            
            {/* صفحات الكتب */}
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            
            {/* سوق الخدمات */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<ServiceDetail />} />
            
            {/* صفحة المستقلين */}
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/freelancers/:id" element={<FreelancerProfile />} />
            
            {/* صفحات الوظائف */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            
            {/* الإشعارات المشتركة */}
            <Route path="/dashboard/notifications" element={<Notifications />} />
            
            {/* لوحة تحكم المستقلين */}
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            <Route path="/dashboard/freelancer/profile" element={<FreelancerProfile />} />
            <Route path="/dashboard/freelancer/projects" element={<FreelancerProjects />} />
            <Route path="/dashboard/freelancer/projects/:id" element={<FreelancerProjects />} />
            <Route path="/dashboard/freelancer/services" element={<FreelancerServices />} />
            <Route path="/dashboard/freelancer/earnings" element={<FreelancerEarnings />} />
            <Route path="/dashboard/freelancer/reviews" element={<FreelancerReviews />} />
            <Route path="/dashboard/freelancer/proposals" element={<MyProposals />} />
            
            {/* لوحة تحكم أصحاب الأعمال */}
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/client/profile" element={<ClientProfile />} />
            <Route path="/dashboard/client/projects" element={<ClientProjects />} />
            <Route path="/dashboard/client/projects/:id" element={<ClientProjects />} />
            <Route path="/dashboard/client/projects/new" element={<ClientNewProject />} />
            <Route path="/dashboard/client/payments" element={<ClientPayments />} />
            <Route path="/dashboard/client/manage-jobs" element={<ManageJobs />} />
            <Route path="/dashboard/client/post-job" element={<PostJob />} />
            
            {/* لوحة تحكم المحاضرين */}
            <Route path="/dashboard/lecturer" element={<LecturerDashboard />} />
            <Route path="/dashboard/lecturer/profile" element={<LecturerProfile />} />
            <Route path="/dashboard/lecturer/courses" element={<LecturerCourses />} />
            <Route path="/dashboard/lecturer/courses/upload" element={<LecturerCourseUpload />} />
            <Route path="/dashboard/lecturer/books" element={<LecturerBooks />} />
            <Route path="/dashboard/lecturer/books/upload" element={<LecturerBookUpload />} />
            <Route path="/dashboard/lecturer/students" element={<LecturerStudents />} />
            <Route path="/dashboard/lecturer/lectures" element={<LecturerLectures />} />
            <Route path="/dashboard/lecturer/earnings" element={<LecturerEarnings />} />
            
            {/* لوحة تحكم المشرف - Admin Dashboard */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/courses" element={<AdminCourses />} />
            <Route path="/dashboard/admin/services" element={<AdminServices />} />
            <Route path="/dashboard/admin/blogs" element={<AdminBlogs />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />
            <Route path="/dashboard/admin/finance" element={<AdminFinance />} />
            <Route path="/dashboard/admin/stats" element={<AdminStats />} />
            
            {/* إدارة المحتوى - Content Management */}
            <Route path="/dashboard/admin/content/home" element={<HomePageContent />} />
            <Route path="/dashboard/admin/content/about" element={<AboutPageContent />} />
            
            {/* صفحة 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
