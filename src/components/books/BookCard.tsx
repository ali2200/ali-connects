
import React from 'react';
import { Star, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCard from '../ui/AnimatedCard';
import CustomButton from '../ui/CustomButton';

export interface BookData {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  rating: number;
  reviews: number;
  pages: number;
  price: string;
  category: string;
  delay: number;
}

interface BookCardProps {
  book: BookData;
  fullView?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, fullView = true }) => {
  console.log("Rendering BookCard for:", book.title);
  
  return (
    <Link to={`/books/${book.id}`} className="block h-full">
      <AnimatedCard
        key={book.id}
        delay={book.delay}
        className="h-full flex flex-col overflow-hidden p-0 hover:shadow-card-hover cursor-pointer"
        hoverEffect="none"
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <img 
            src={book.image} 
            alt={book.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop";
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="inline-block bg-white/90 backdrop-blur-sm text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
              {book.category}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          {fullView && (
            <div className="flex items-center mb-3">
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="mx-1 text-sm font-medium text-gray-900">{book.rating}</span>
              </div>
              <span className="text-xs text-gray-500">({book.reviews} تقييم)</span>
            </div>
          )}
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>
          
          <div className="mt-auto">
            {fullView ? (
              <div className="flex items-center mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <Book className="w-4 h-4 ml-1" />
                  {book.pages} صفحة
                </div>
                <div className="mr-auto">
                  <span className="text-lg font-bold text-ali-blue">{book.price}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="mx-1 text-sm font-medium text-gray-900">{book.rating}</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-ali-blue">{book.price}</span>
                </div>
              </div>
            )}
            
            {fullView ? (
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-500">المؤلف:</span>
                  <span className="mr-1 text-gray-900 font-medium">{book.author}</span>
                </div>
                {/* The button is just for visual indication - the entire card is clickable */}
                <div className="pointer-events-none">
                  <CustomButton 
                    size="sm" 
                    variant="ghost" 
                    className="text-ali-blue hover:bg-ali-blue/10"
                  >
                    عرض الكتاب
                  </CustomButton>
                </div>
              </div>
            ) : (
              <div className="w-full pointer-events-none">
                <CustomButton 
                  size="sm" 
                  className="w-full"
                >
                  عرض الكتاب
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </AnimatedCard>
    </Link>
  );
};

export default BookCard;
