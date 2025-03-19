import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Star, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import '@/styles/rtl.css';

// Mock book data (same as in BookDetail.tsx)
const allBooks = [
  {
    id: 1,
    title: 'أساسيات التسويق الرقمي',
    description: 'كتاب شامل يغطي كافة جوانب التسويق الرقمي من البداية إلى الاحتراف.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
    author: 'د. محمد الحربي',
    rating: 4.8,
    reviews: 182,
    pages: 320,
    price: 29,
    category: 'تسويق رقمي',
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
  },
  {
    id: 5,
    title: 'تطوير تطبيقات الويب الحديثة',
    description: 'دليل شامل لتطوير تطبيقات الويب باستخدام أحدث التقنيات والأطر العملية.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    author: 'م. أحمد الزهراني',
    rating: 4.8,
    reviews: 158,
    pages: 340,
    price: 30,
    category: 'برمجة',
  },
  {
    id: 6,
    title: 'الذكاء الاصطناعي للمبتدئين',
    description: 'مقدمة في عالم الذكاء الاصطناعي وتطبيقاته وكيفية البدء في هذا المجال الواعد.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
    author: 'د. هيثم الشمري',
    rating: 4.7,
    reviews: 120,
    pages: 280,
    price: 28,
    category: 'تقنية',
  },
  {
    id: 7,
    title: 'استراتيجيات ريادة الأعمال',
    description: 'كتاب يشرح أهم الاستراتيجيات لإنشاء وإدارة المشاريع الناشئة بنجاح.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    author: 'أ. سارة المنصور',
    rating: 4.9,
    reviews: 175,
    pages: 310,
    price: 32,
    category: 'إدارة أعمال',
  },
  {
    id: 8,
    title: 'أساسيات تحليل البيانات',
    description: 'دليل عملي لتعلم مهارات تحليل البيانات واستخدام الأدوات الحديثة لاستخراج الرؤى.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    author: 'د. معاذ العتيبي',
    rating: 4.8,
    reviews: 145,
    pages: 290,
    price: 29,
    category: 'تحليل بيانات',
  },
];

// Categories for filtering
const categories = [
  'الكل',
  'برمجة',
  'تسويق رقمي',
  'إدارة أعمال',
  'تصميم',
  'تقنية',
  'تحليل بيانات'
];

const Books = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const booksPerPage = 8;
  
  // Filter books based on category and search query
  const filteredBooks = allBooks.filter(book => {
    const matchesCategory = activeCategory === 'الكل' || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  
  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-bl from-ali-blue to-purple-700 text-white py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">مكتبة الكتب الإلكترونية</h1>
              <p className="text-xl opacity-90 mb-8">
                اكتشف مجموعة واسعة من الكتب في مختلف المجالات لتطوير مهاراتك المهنية
              </p>
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="search"
                  placeholder="ابحث عن كتاب..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-6 pr-12 rounded-full text-gray-900 border-0 shadow-lg focus:ring-2 focus:ring-blue-500"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
          </div>
        </section>
        
        {/* Books Listing */}
        <section className="py-16">
          <div className="container-custom">
            {/* Categories Filter */}
            <div className="mb-10">
              <Tabs defaultValue="الكل" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="w-full max-w-4xl mx-auto flex flex-wrap justify-center bg-white p-1 shadow-sm">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="flex-grow-0 m-1"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeCategory === 'الكل' ? 'جميع الكتب' : `كتب ${activeCategory}`}
              </h2>
              <p className="text-gray-600">
                عرض {filteredBooks.length} كتاب
              </p>
            </div>
            
            {/* Books Grid */}
            {currentBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentBooks.map((book) => (
                  <Link to={`/books/${book.id}`} key={book.id} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img 
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="inline-block bg-white/90 backdrop-blur-sm text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
                            {book.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="mx-1 text-sm font-medium text-gray-900">{book.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({book.reviews} تقييم)</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-ali-blue transition-colors">
                          {book.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {book.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Book className="w-4 h-4 ml-1" />
                            {book.pages} صفحة
                          </div>
                          <div>
                            <span className="text-lg font-bold text-ali-blue">${book.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Book className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد كتب</h3>
                <p className="text-gray-500 mb-6">
                  لم نتمكن من العثور على أي كتب تطابق معايير البحث الخاصة بك
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('الكل');
                  }}
                >
                  عرض جميع الكتب
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredBooks.length > booksPerPage && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => setCurrentPage(index + 1)}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
