
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <>
      <Helmet>
        <title>عن علي للأعمال | منصة العمل الحر</title>
        <meta name="description" content="تعرف على منصة علي للأعمال - المنصة الرائدة للعمل الحر وتوظيف المستقلين في المملكة العربية السعودية والوطن العربي" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-12 pt-28">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">عن منصة علي للأعمال</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <h2 className="text-2xl font-semibold mb-4">رؤيتنا</h2>
            <p className="text-gray-700 mb-6">
              نسعى لأن نكون المنصة الرائدة للعمل الحر في المملكة العربية السعودية والوطن العربي، من خلال تقديم بيئة عمل متكاملة تجمع بين أصحاب المشاريع والمستقلين المحترفين في جميع المجالات.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">مهمتنا</h2>
            <p className="text-gray-700 mb-6">
              تمكين المواهب العربية من تحقيق النجاح المهني والمالي من خلال توفير فرص عمل حقيقية ودعم متكامل يشمل التدريب والتطوير المستمر، مع ضمان أفضل جودة للخدمات المقدمة لأصحاب المشاريع.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">قيمنا</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 mr-4">
              <li><span className="font-semibold">الجودة:</span> نضمن أعلى معايير الجودة في جميع الخدمات المقدمة على منصتنا.</li>
              <li><span className="font-semibold">الثقة:</span> نبني علاقات طويلة المدى مبنية على الثقة المتبادلة بين جميع أطراف العمل.</li>
              <li><span className="font-semibold">الشفافية:</span> نلتزم بالشفافية الكاملة في جميع التعاملات والرسوم على المنصة.</li>
              <li><span className="font-semibold">الدعم المستمر:</span> نقدم الدعم المستمر لضمان نجاح المستقلين وأصحاب المشاريع.</li>
              <li><span className="font-semibold">التطوير:</span> نؤمن بأهمية التطوير المستمر للمهارات والخدمات.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">قصتنا</h2>
            <p className="text-gray-700 mb-6">
              انطلقت منصة "علي للأعمال" في عام 2023 لتلبية احتياجات سوق العمل الحر المتنامي في المملكة العربية السعودية والوطن العربي. بدأنا بفكرة بسيطة: إنشاء بيئة عمل متكاملة تجمع بين المواهب العربية وأصحاب المشاريع، وتوفر لهم جميع الأدوات اللازمة للنجاح.
            </p>
            <p className="text-gray-700 mb-6">
              اليوم، أصبحت منصة "علي للأعمال" وجهة رئيسية للعمل الحر، حيث تضم آلاف المستقلين المحترفين وأصحاب المشاريع. نفخر بأننا ساهمنا في توفير فرص عمل حقيقية للمواهب العربية، وساعدنا العديد من الشركات والمؤسسات في إنجاز مشاريعهم بأعلى جودة وأقل تكلفة.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">فريق العمل</h2>
            <p className="text-gray-700 mb-6">
              يضم فريق "علي للأعمال" نخبة من الخبراء والمتخصصين في مجالات التقنية والتسويق وخدمة العملاء، يعملون بشغف لتطوير المنصة وتقديم أفضل تجربة للمستخدمين.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">تواصل معنا</h2>
            <p className="text-gray-700">
              نحن دائماً سعداء بالتواصل معكم واستقبال ملاحظاتكم واقتراحاتكم. يمكنكم التواصل معنا من خلال 
              <a href="/contact" className="text-blue-600 hover:text-blue-800 mx-1">صفحة اتصل بنا</a>
              أو مراسلتنا مباشرة على البريد الإلكتروني: 
              <a href="mailto:info@aliworks.sa" className="text-blue-600 hover:text-blue-800 mx-1">info@aliworks.sa</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
