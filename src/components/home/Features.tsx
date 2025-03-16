
import React from 'react';
import { BookOpen, ShoppingBag, Users, MessageSquare, Award, Shield } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';

const features = [
  {
    title: 'Expert Education',
    description: 'Access high-quality courses, tutorials, and certifications to master digital marketing skills.',
    icon: BookOpen,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    delay: 0,
  },
  {
    title: 'Service Marketplace',
    description: 'Find and purchase marketing services from vetted professionals with secure payments.',
    icon: ShoppingBag,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    delay: 100,
  },
  {
    title: 'Freelancer Network',
    description: 'Connect with skilled marketing experts for your specific business needs.',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    delay: 200,
  },
  {
    title: 'Project Management',
    description: 'Manage your marketing projects with integrated chat, file sharing, and task tracking.',
    icon: MessageSquare,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    delay: 300,
  },
  {
    title: 'Certifications',
    description: 'Earn recognized certificates to showcase your marketing expertise and skills.',
    icon: Award,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    delay: 400,
  },
  {
    title: 'Secure Transactions',
    description: 'Enjoy peace of mind with our escrow payment system and dispute resolution.',
    icon: Shield,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    delay: 500,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-md text-gray-900 mb-4">
            Everything You Need to Succeed in Marketing
          </h2>
          <p className="subtitle text-gray-600">
            Our platform combines education, services, and smart tools to help your 
            business thrive in the digital landscape.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedCard 
              key={index} 
              delay={feature.delay}
              className="h-full flex flex-col"
            >
              <div className={`${feature.bgColor} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5`}>
                <feature.icon className={`${feature.color} w-5 h-5`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
