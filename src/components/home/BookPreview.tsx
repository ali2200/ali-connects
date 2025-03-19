
import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../ui/CustomButton';
import BookCard from '../books/BookCard';
import BookCarousel from '../books/BookCarousel';
import { books } from '@/data/BooksData';

const BookPreview: React.FC = () => {
  // Debug logging to verify data is available
  console.log("Books data in BookPreview:", books ? (books.length ? books.length + " books found" : "Empty array") : "No books data");
  
  // Make sure books data exists before rendering
  const booksData = books || [];
  
  return (
    <section className="py-20 bg-gray-50" id="books-section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="heading-md text-gray-900 mb-4">
              مكتبة الكتب الإلكترونية
            </h2>
            <p className="subtitle text-gray-600 max-w-2xl">
              اكتشف مجموعة متنوعة من الكتب في مختلف المجالات لتطوير مهاراتك وتوسيع آفاق معرفتك.
            </p>
          </div>
          <Link to="/books">
            <CustomButton variant="outline">
              عرض جميع الكتب
            </CustomButton>
          </Link>
        </div>
        
        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {booksData && booksData.length > 0 ? (
            booksData.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div className="col-span-4 text-center py-8">لا توجد كتب متاحة</div>
          )}
        </div>
        
        {/* Mobile View - Carousel */}
        <div className="block md:hidden">
          <BookCarousel books={booksData.slice(0, 4)} />
        </div>
      </div>
    </section>
  );
};

export default BookPreview;
