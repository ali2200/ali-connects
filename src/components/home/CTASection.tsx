
import React from 'react';
import { ArrowRight } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-ali-blue to-ali-purple opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="heading-md mb-6">
            هل أنت جاهز لتحويل التسويق الخاص بك؟
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            انضم إلى علي للأعمال اليوم وتواصل مع أفضل المواهب التسويقية، واحصل على تعليم من الخبراء، 
            واستفد من المساعد الذكي لدينا لتنمية عملك.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <CustomButton 
                size="lg" 
                variant="glass" 
                className="bg-white bg-opacity-20 text-white border-white/30 hover:bg-white/30"
                rightIcon={<ArrowRight className="mr-1 rotate-180" />}
              >
                ابدأ مجاناً
              </CustomButton>
            </Link>
            <Link to="/contact">
              <CustomButton size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                اتصل بالمبيعات
              </CustomButton>
            </Link>
          </div>
          
          <p className="mt-8 text-sm opacity-80">
            لا حاجة لبطاقة ائتمان. ابدأ بحساب مجاني وقم بالترقية في أي وقت.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
