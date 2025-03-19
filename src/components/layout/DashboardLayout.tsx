
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Briefcase, Book, MessageSquare, Settings, Search, ChevronLeft, LogOut, User, DollarSign, Star, Package, FileText, BarChart2, CreditCard, Upload, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomButton from '@/components/ui/CustomButton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

export type DashboardType = 'freelancer' | 'client' | 'admin' | 'lecturer';

type MenuItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  permissions: DashboardType[];
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: DashboardType;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, type, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  const menuItems: MenuItem[] = [
    { name: 'لوحة التحكم', path: `/dashboard/${type}`, icon: Home, permissions: ['freelancer', 'client', 'admin', 'lecturer'] },
    { name: 'الملف الشخصي', path: `/dashboard/${type}/profile`, icon: User, permissions: ['freelancer', 'client', 'admin', 'lecturer'] },
    
    // المستقلين
    { name: 'المشاريع', path: `/dashboard/freelancer/projects`, icon: Briefcase, permissions: ['freelancer'] },
    { name: 'الخدمات', path: `/dashboard/freelancer/services`, icon: Package, permissions: ['freelancer'] },
    { name: 'الأرباح', path: `/dashboard/freelancer/earnings`, icon: DollarSign, permissions: ['freelancer'] },
    { name: 'التقييمات', path: `/dashboard/freelancer/reviews`, icon: Star, permissions: ['freelancer'] },
    
    // أصحاب الأعمال
    { name: 'مشاريعي', path: `/dashboard/client/projects`, icon: Briefcase, permissions: ['client'] },
    { name: 'إنشاء مشروع جديد', path: `/dashboard/client/projects/new`, icon: FileText, permissions: ['client'] },
    { name: 'المدفوعات', path: `/dashboard/client/payments`, icon: CreditCard, permissions: ['client'] },
    
    // المشرفين
    { name: 'المستخدمين', path: `/dashboard/admin/users`, icon: Users, permissions: ['admin'] },
    { name: 'الدورات', path: `/dashboard/admin/courses`, icon: Book, permissions: ['admin'] },
    { name: 'سوق الخدمات', path: `/dashboard/admin/services`, icon: Package, permissions: ['admin'] },
    { name: 'المدفوعات', path: `/dashboard/admin/finance`, icon: DollarSign, permissions: ['admin'] },
    { name: 'الإحصائيات', path: `/dashboard/admin/stats`, icon: BarChart2, permissions: ['admin'] },
    { name: 'إدارة المحتوى', path: `/dashboard/admin/settings`, icon: Settings, permissions: ['admin'] },
    { name: 'المدونة', path: `/dashboard/admin/blogs`, icon: MessageSquare, permissions: ['admin'] },
    
    // المحاضرين
    { name: 'الدورات', path: `/dashboard/lecturer/courses`, icon: Book, permissions: ['lecturer'] },
    { name: 'رفع دورة جديدة', path: `/dashboard/lecturer/courses/upload`, icon: Upload, permissions: ['lecturer'] },
    { name: 'الكتب', path: `/dashboard/lecturer/books`, icon: BookOpen, permissions: ['lecturer'] },
    { name: 'رفع كتاب جديد', path: `/dashboard/lecturer/books/upload`, icon: Upload, permissions: ['lecturer'] },
    { name: 'الطلاب', path: `/dashboard/lecturer/students`, icon: Users, permissions: ['lecturer'] },
    { name: 'المحاضرات', path: `/dashboard/lecturer/lectures`, icon: FileText, permissions: ['lecturer'] },
    { name: 'الإيرادات', path: `/dashboard/lecturer/earnings`, icon: DollarSign, permissions: ['lecturer'] },
  ];
  
  const filteredMenuItems = menuItems.filter(item => item.permissions.includes(type));
  
  const getLabelByType = () => {
    switch(type) {
      case 'freelancer': return 'لوحة تحكم المستقل';
      case 'client': return 'لوحة تحكم صاحب العمل';
      case 'admin': return 'لوحة تحكم المشرف';
      case 'lecturer': return 'لوحة تحكم المحاضر';
      default: return 'لوحة التحكم';
    }
  };

  const handleLogout = () => {
    toast({
      title: "تم تسجيل الخروج بنجاح",
      description: "نتمنى أن نراك قريبًا مرة أخرى!",
    });
    // في الواقع، هنا ستقوم بمسح بيانات المستخدم من الذاكرة/التخزين
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex flex-col rtl bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-2 md:py-4 border-b sticky top-0 z-30 safe-area-inset">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden mr-2 md:mr-4 text-gray-600 p-2 -ml-2"
              aria-label={mobileOpen ? "إغلاق القائمة الجانبية" : "فتح القائمة الجانبية"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/dashboard/notifications" className="text-gray-600 hover:text-gray-800 relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                3
              </span>
            </Link>
            <div className="relative">
              <button className="flex items-center space-x-2 space-x-reverse focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-ali-blue flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium ml-2 hidden md:block">عبدالله الزهراني</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 relative">
        {/* Sidebar - optimized for mobile and desktop */}
        <aside 
          className={cn(
            "fixed md:sticky md:top-0 right-0 h-[calc(100vh-var(--navbar-height))] md:h-[calc(100vh-var(--navbar-height))] bg-white border-l shadow-md z-30 transition-all duration-300 w-[80%] sm:w-64 md:w-64 safe-area-inset",
            mobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          )}
          style={{
            top: 'var(--navbar-height)',
            height: 'calc(100dvh - var(--navbar-height))'
          }}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold text-lg">{getLabelByType()}</h2>
              <button 
                onClick={() => setMobileOpen(false)}
                className="md:hidden text-gray-500 hover:text-gray-700"
                aria-label="إغلاق القائمة الجانبية"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {filteredMenuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors",
                        location.pathname === item.path && "bg-gray-100 text-ali-blue font-semibold"
                      )}
                    >
                      <item.icon className="h-5 w-5 ml-3 flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <Separator className="my-4" />
              
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-5 w-5 ml-3 flex-shrink-0" />
                    <span>الإعدادات</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-right"
                  >
                    <LogOut className="h-5 w-5 ml-3 flex-shrink-0" />
                    <span>تسجيل الخروج</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        
        {/* Backdrop for mobile sidebar */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden" 
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
