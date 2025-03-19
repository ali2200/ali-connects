
import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../ui/CustomButton';
import BookCard from '../books/BookCard';
import BookCarousel from '../books/BookCarousel';
import { books } from '@/data/BooksData';

const BookPreview = () => {
  return (
    <section className="py-20 bg-gray-50">
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
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        {/* Mobile View - Carousel */}
        <div className="block md:hidden">
          <BookCarousel books={books} />
        </div>
      </div>
    </section>
  );
};

export default BookPreview;
