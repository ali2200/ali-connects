
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookPageFlip from '@/components/books/BookPageFlip';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CustomButton from '@/components/ui/CustomButton';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Book, 
  ShoppingCart, 
  Download,
  User,
  Calendar,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';
import '../../../styles/rtl.css';

// Mock book data for now - would typically come from an API
const books = [
  {
    id: 1,
    title: 'أساسيات التسويق الرقمي',
    description: 'كتاب شامل يغطي كافة جوانب التسويق الرقمي من البداية إلى الاحتراف. يتناول الكتاب استراتيجيات التسويق عبر وسائل التواصل الاجتماعي، وتحسين محركات البحث، والتسويق عبر البريد الإلكتروني، وتحليلات البيانات، وإعلانات الدفع لكل نقرة، وغيرها من الموضوعات الهامة في عالم التسويق الرقمي.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
    author: 'د. محمد الحربي',
    rating: 4.8,
    reviews: 182,
    pages: 320,
    price: 29,
    category: 'تسويق رقمي',
    publishDate: '2023-06-15',
    language: 'العربية',
    isbn: '978-9953-87-614-5',
    publisher: 'دار النشر العربية',
    format: ['PDF', 'EPUB', 'مطبوع'],
    fileSize: '8.5 MB',
    previewPages: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2030&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop'
    ],
    tableOfContents: [
      'الفصل الأول: مقدمة في التسويق الرقمي',
      'الفصل الثاني: استراتيجيات وسائل التواصل الاجتماعي',
      'الفصل الثالث: تحسين محركات البحث (SEO)',
      'الفصل الرابع: التسويق عبر البريد الإلكتروني',
      'الفصل الخامس: إعلانات الدفع لكل نقرة (PPC)',
      'الفصل السادس: التسويق بالمحتوى',
      'الفصل السابع: تحليلات التسويق الرقمي',
      'الفصل الثامن: التسويق عبر الهاتف المحمول',
      'الفصل التاسع: استراتيجيات متقدمة',
      'الفصل العاشر: دراسات حالة وتطبيقات عملية'
    ]
  },
  {
    id: 2,
    title: 'البرمجة بلغة بايثون للمبتدئين',
    description: 'دليل عملي لتعلم لغة بايثون من الصفر مع تطبيقات عملية ومشاريع كاملة.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
    author: 'م. سمير الخالدي',
    rating: 4.7,
    reviews: 156,
    pages: 280,
    price: 25,
    category: 'برمجة',
    publishDate: '2023-03-10',
    language: 'العربية',
    isbn: '978-9953-87-625-8',
    publisher: 'دار الكتب التقنية',
    format: ['PDF', 'مطبوع'],
    fileSize: '6.2 MB',
    previewPages: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2030&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop'
    ],
    tableOfContents: [
      'الفصل الأول: أساسيات البرمجة بلغة بايثون',
      'الفصل الثاني: المتغيرات وأنواع البيانات',
      'الفصل الثالث: هياكل التحكم والحلقات',
      'الفصل الرابع: الدوال والوحدات',
      'الفصل الخامس: التعامل مع الملفات',
      'الفصل السادس: البرمجة كائنية التوجه في بايثون',
      'الفصل السابع: معالجة الاستثناءات والأخطاء',
      'الفصل الثامن: تطوير واجهات المستخدم الرسومية',
      'الفصل التاسع: التعامل مع قواعد البيانات',
      'الفصل العاشر: مشاريع تطبيقية متكاملة'
    ]
  },
  {
    id: 3,
    title: 'التصميم الجرافيكي الاحترافي',
    description: 'كتاب مرجعي للمصممين يشرح أساسيات التصميم وأحدث التقنيات والأدوات.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2030&auto=format&fit=crop',
    author: 'أ. نورة القحطاني',
    rating: 4.9,
    reviews: 210,
    pages: 350,
    price: 32,
    category: 'تصميم',
    publishDate: '2022-11-20',
    language: 'العربية',
    isbn: '978-9953-87-630-2',
    publisher: 'دار الفنون للنشر',
    format: ['PDF', 'EPUB', 'مطبوع'],
    fileSize: '12.4 MB',
    previewPages: [
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2030&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2030&auto=format&fit=crop'
    ],
    tableOfContents: [
      'الفصل الأول: مبادئ التصميم الجرافيكي',
      'الفصل الثاني: نظرية الألوان والتطبيقات',
      'الفصل الثالث: التايبوغرافي وتصميم الخطوط',
      'الفصل الرابع: برامج التصميم الجرافيكي',
      'الفصل الخامس: تصميم الهوية البصرية',
      'الفصل السادس: تصميم المطبوعات',
      'الفصل السابع: التصميم للويب والتطبيقات',
      'الفصل الثامن: الرسوم المتحركة والموشن جرافيك',
      'الفصل التاسع: التصوير والمعالجة الرقمية',
      'الفصل العاشر: إدارة مشاريع التصميم'
    ]
  },
  {
    id: 4,
    title: 'إدارة المشاريع باحترافية',
    description: 'دليل عملي حول أفضل ممارسات إدارة المشاريع وتطبيق المنهجيات الحديثة.',
    image: 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1974&auto=format&fit=crop',
    author: 'د. فيصل العمري',
    rating: 4.6,
    reviews: 135,
    pages: 290,
    price: 27,
    category: 'إدارة أعمال',
    publishDate: '2023-01-05',
    language: 'العربية',
    isbn: '978-9953-87-640-1',
    publisher: 'المكتبة الإدارية',
    format: ['PDF', 'مطبوع'],
    fileSize: '7.8 MB',
    previewPages: [
      'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2030&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1974&auto=format&fit=crop'
    ],
    tableOfContents: [
      'الفصل الأول: مدخل إلى إدارة المشاريع',
      'الفصل الثاني: تخطيط المشاريع',
      'الفصل الثالث: إدارة نطاق المشروع',
      'الفصل الرابع: إدارة الوقت والجدولة',
      'الفصل الخامس: إدارة التكاليف والميزانية',
      'الفصل السادس: إدارة الجودة',
      'الفصل السابع: إدارة الموارد البشرية',
      'الفصل الثامن: إدارة المخاطر',
      'الفصل التاسع: المنهجيات الرشيقة (Agile)',
      'الفصل العاشر: حالات دراسية وتطبيقات عملية'
    ]
  }
];

const BookDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  
  // Find the book with the matching ID
  const book = books.find(book => book.id === Number(id)) || books[0];
  
  const handlePurchase = (format: string) => {
    toast.success(`تم إضافة "${book.title}" بتنسيق ${format} إلى سلة التسوق`);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container-custom">
            <nav>
              <ol className="flex items-center text-sm">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-ali-blue">الرئيسية</Link>
                </li>
                <li className="mx-2 text-gray-400">/</li>
                <li>
                  <Link to="/books" className="text-gray-500 hover:text-ali-blue">الكتب</Link>
                </li>
                <li className="mx-2 text-gray-400">/</li>
                <li className="text-gray-700 font-medium">{book.title}</li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Book Details Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Book Preview */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <BookPageFlip pages={book.previewPages} />
                    <div className="mt-6 text-center text-gray-500 text-sm">
                      هذا عرض محدود لأول 5 صفحات من الكتاب
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Book Info */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-ali-blue/10 text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
                      {book.category}
                    </span>
                    <div className="flex items-center text-yellow-400 mr-4">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="mx-1 text-sm font-medium text-gray-900">{book.rating}</span>
                      <span className="text-xs text-gray-500">({book.reviews} تقييم)</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
                  <p className="text-gray-700 mb-6">{book.description}</p>
                  
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <span className="text-gray-500 text-sm">المؤلف</span>
                        <p className="font-medium text-gray-900">{book.author}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Book className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <span className="text-gray-500 text-sm">عدد الصفحات</span>
                        <p className="font-medium text-gray-900">{book.pages} صفحة</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <span className="text-gray-500 text-sm">تاريخ النشر</span>
                        <p className="font-medium text-gray-900">{book.publishDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Purchase Options */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">خيارات الشراء</h3>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      {book.format.map(format => (
                        <Button
                          key={format}
                          variant={selectedFormat === format ? "default" : "outline"}
                          onClick={() => setSelectedFormat(format)}
                          className="flex items-center gap-2"
                        >
                          {format === 'PDF' && <Download className="w-4 h-4" />}
                          {format === 'EPUB' && <BookOpen className="w-4 h-4" />}
                          {format === 'مطبوع' && <Book className="w-4 h-4" />}
                          {format}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-ali-blue">${book.price}</span>
                        {selectedFormat === 'مطبوع' && (
                          <div className="flex items-center mr-6 bg-gray-100 rounded-lg">
                            <button 
                              onClick={() => handleQuantityChange(quantity - 1)}
                              className="px-3 py-1 text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-medium">{quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(quantity + 1)}
                              className="px-3 py-1 text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 ml-1" />
                        متوفر
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <CustomButton 
                        onClick={() => handlePurchase(selectedFormat)}
                        variant="primary"
                        size="lg"
                        className="flex-1"
                        leftIcon={<ShoppingCart className="w-5 h-5" />}
                      >
                        إضافة للسلة
                      </CustomButton>
                      
                      <CustomButton 
                        onClick={() => toast.success(`تمت مشاركة "${book.title}"`)}
                        variant="outline"
                        size="lg"
                        leftIcon={<Share2 className="w-5 h-5" />}
                      >
                        مشاركة
                      </CustomButton>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Tabs for Additional Information */}
                <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full bg-white border-b mb-6">
                    <TabsTrigger value="overview" className="flex-1">نظرة عامة</TabsTrigger>
                    <TabsTrigger value="toc" className="flex-1">محتويات الكتاب</TabsTrigger>
                    <TabsTrigger value="details" className="flex-1">تفاصيل النشر</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700">
                        {book.description}
                      </p>
                      <p className="text-gray-700 mt-4">
                        يعتبر هذا الكتاب مرجعًا شاملًا لكل من يرغب في تعلم {book.category} من الأساسيات وحتى المستويات المتقدمة.
                        تم تصميم محتوى الكتاب ليناسب جميع المستويات، سواء كنت مبتدئًا تمامًا أو لديك خبرة سابقة في المجال.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="toc" className="mt-0">
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-xl font-semibold mb-4">محتويات الكتاب</h3>
                      <ul className="space-y-2">
                        {book.tableOfContents.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-ali-blue ml-2">{index + 1}.</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-gray-500 text-sm">ISBN</h4>
                          <p className="font-medium">{book.isbn}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-500 text-sm">الناشر</h4>
                          <p className="font-medium">{book.publisher}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-500 text-sm">تاريخ النشر</h4>
                          <p className="font-medium">{book.publishDate}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-gray-500 text-sm">اللغة</h4>
                          <p className="font-medium">{book.language}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-500 text-sm">عدد الصفحات</h4>
                          <p className="font-medium">{book.pages} صفحة</p>
                        </div>
                        <div>
                          <h4 className="text-gray-500 text-sm">حجم الملف (PDF)</h4>
                          <p className="font-medium">{book.fileSize}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
