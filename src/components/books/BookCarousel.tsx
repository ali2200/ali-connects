
import React from 'react';
import { BookData } from './BookCard';
import BookCard from './BookCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface BookCarouselProps {
  books: BookData[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  console.log("Books in carousel:", books ? books.length : 'No books data');
  
  if (!books || books.length === 0) {
    return <div className="text-center py-4">لا توجد كتب متاحة</div>;
  }
  
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {books.map((book) => (
          <CarouselItem key={book.id} className="basis-full sm:basis-1/2">
            <div className="h-full">
              <BookCard book={book} fullView={false} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="static transform-none mx-2" />
        <CarouselNext className="static transform-none mx-2" />
      </div>
    </Carousel>
  );
};

export default BookCarousel;
