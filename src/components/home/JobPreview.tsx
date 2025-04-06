
import React from 'react';
import { Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';

const featuredJobs = [
  {
    id: 1,
    title: 'تطوير موقع ويب للتجارة الإلكترونية',
    category: 'برمجة وتطوير',
    description: 'نحن نبحث عن مطور خبير لإنشاء موقع متجر إلكتروني متكامل مع نظام إدارة منتجات ودفع إلكتروني.',
    budget: '$1,500 - $3,000',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    posted: '2 أيام',
    proposals: 18,
    urgent: true,
  },
  {
    id: 2,
    title: 'تصميم هوية بصرية كاملة للشركة',
    category: 'تصميم وإبداع',
    description: 'مطلوب مصمم جرافيك لإنشاء هوية بصرية كاملة تشمل الشعار والألوان والخطوط وتطبيقات الهوية.',
    budget: '$800 - $1,200',
    skills: ['تصميم الجرافيك', 'Adobe Illustrator', 'هوية بصرية', 'تصميم الشعار'],
    posted: '3 أيام',
    proposals: 24,
    urgent: false,
  },
  {
    id: 3,
    title: 'إدارة حملات التسويق عبر وسائل التواصل',
    category: 'تسويق وإعلان',
    description: 'نبحث عن خبير في التسويق عبر وسائل التواصل الاجتماعي لإدارة حملات إعلانية وزيادة التفاعل.',
    budget: '$500 - $700 شهرياً',
    skills: ['إدارة وسائل التواصل', 'تسويق المحتوى', 'إعلانات فيسبوك', 'استراتيجية تسويق'],
    posted: '1 يوم',
    proposals: 9,
    urgent: true,
  }
];

const JobPreview: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="heading-md text-gray-900 mb-4">
              فرص عمل متاحة للمستقلين
            </h2>
            <p className="subtitle text-gray-600 max-w-2xl">
              اكتشف أحدث المشاريع المتاحة وقدم عروضك للعمل مع أصحاب الأعمال من مختلف المجالات
            </p>
          </div>
          <Link to="/jobs">
            <CustomButton variant="outline">
              تصفح جميع الوظائف
            </CustomButton>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <Link to={`/jobs/${job.id}`} key={job.id} className="block h-full">
              <AnimatedCard
                delay={index * 150}
                className="h-full cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gray-100 text-gray-800">
                    <Briefcase className="h-3.5 w-3.5 ml-1" />
                    {job.category}
                  </Badge>
                  {job.urgent && (
                    <Badge className="bg-red-100 text-red-800">
                      عاجل
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {job.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="bg-gray-50">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="outline" className="bg-gray-50">
                      +{job.skills.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-ali-blue font-semibold">
                      {job.budget}
                    </div>
                    <div className="text-sm text-gray-500">
                      منذ {job.posted}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                      <span>{job.proposals} عرض</span>
                    </div>
                    <div className="pointer-events-none">
                      <CustomButton size="sm" rightIcon={<ArrowRight className="h-4 w-4 mr-1 rotate-180" />}>
                        تقديم عرض
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link to="/jobs">
            <CustomButton rightIcon={<ArrowRight className="mr-1 rotate-180" />}>
              عرض المزيد من المشاريع
            </CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobPreview;
