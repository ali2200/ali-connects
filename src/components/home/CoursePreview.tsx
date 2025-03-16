
import React from 'react';
import { Star, Clock, BookOpen } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Social Media Marketing Mastery',
    description: 'Learn to create effective social media strategies and campaigns for business growth.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    reviews: 245,
    duration: '12 hours',
    lessons: 54,
    price: '$99',
    category: 'Social Media',
    delay: 0,
  },
  {
    id: 2,
    title: 'SEO Fundamentals & Strategy',
    description: 'Master search engine optimization techniques to drive organic traffic to your website.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop',
    instructor: 'David Chen',
    rating: 4.8,
    reviews: 189,
    duration: '10 hours',
    lessons: 42,
    price: '$89',
    category: 'SEO',
    delay: 150,
  },
  {
    id: 3,
    title: 'Content Marketing Excellence',
    description: 'Create compelling content that engages your audience and drives conversion.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    instructor: 'Emma Rodriguez',
    rating: 4.7,
    reviews: 163,
    duration: '8 hours',
    lessons: 36,
    price: '$79',
    category: 'Content',
    delay: 300,
  },
];

const CoursePreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="heading-md text-gray-900 mb-4">
              Expand Your Marketing Skills
            </h2>
            <p className="subtitle text-gray-600 max-w-2xl">
              Access expert-led courses and certifications to master the latest digital marketing strategies and tools.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline">
              View All Courses
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <AnimatedCard
              key={course.id}
              delay={course.delay}
              className="h-full flex flex-col overflow-hidden p-0 hover:shadow-card-hover"
              hoverEffect="none"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{course.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({course.reviews} reviews)</span>
                  <div className="ml-auto flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.lessons} lessons
                    </div>
                    <div className="ml-auto">
                      <span className="text-lg font-bold text-ali-blue">{course.price}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">Instructor:</span>
                      <span className="ml-1 text-gray-900 font-medium">{course.instructor}</span>
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <Button size="sm" variant="ghost" className="text-ali-blue hover:bg-ali-blue/10">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursePreview;
