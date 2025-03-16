
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

// البيانات الوهمية للأسئلة الشائعة
const faqData = [
  {
    category: "عام",
    questions: [
      {
        id: "q1",
        question: "ما هي منصة علي للأعمال؟",
        answer: "منصة علي للأعمال هي منصة عربية متخصصة في العمل الحر، تهدف إلى ربط أصحاب المشاريع بالمستقلين المحترفين في مختلف المجالات. توفر المنصة بيئة عمل آمنة وسهلة الاستخدام تضمن حقوق جميع الأطراف."
      },
      {
        id: "q2",
        question: "هل المنصة مجانية الاستخدام؟",
        answer: "التسجيل في المنصة وإنشاء حساب مجاني تماماً. تقوم المنصة باقتطاع عمولة بنسبة 15% من قيمة المشاريع المنجزة، وذلك فقط بعد إتمام المشروع بنجاح وموافقة صاحب العمل على التسليم النهائي."
      },
      {
        id: "q3",
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "تدعم المنصة العديد من طرق الدفع بما في ذلك البطاقات الائتمانية (فيزا، ماستر كارد)، مدى، حساب آبل، وباي بال، بالإضافة إلى التحويل البنكي المباشر للمبالغ الكبيرة."
      }
    ]
  },
  {
    category: "للمستقلين",
    questions: [
      {
        id: "q4",
        question: "كيف يمكنني الانضمام كمستقل؟",
        answer: "يمكنك التسجيل كمستقل من خلال إنشاء حساب جديد واختيار 'مستقل' كنوع الحساب. بعد ذلك، ستحتاج إلى إكمال ملفك الشخصي بإضافة مهاراتك وخبراتك والمجالات التي تعمل بها، وتحميل نماذج من أعمالك السابقة."
      },
      {
        id: "q5",
        question: "متى سأحصل على مستحقاتي المالية؟",
        answer: "بعد اكتمال المشروع وموافقة صاحب العمل على التسليم النهائي، تتم إضافة المبلغ إلى رصيدك في المنصة. يمكنك بعد ذلك طلب سحب الأموال، ويتم تحويلها خلال 3-5 أيام عمل حسب طريقة السحب المختارة."
      },
      {
        id: "q6",
        question: "كيف يمكنني زيادة فرص الحصول على مشاريع؟",
        answer: "يمكنك زيادة فرصك في الحصول على مشاريع من خلال: 1) إكمال ملفك الشخصي بشكل احترافي، 2) عرض نماذج متنوعة من أعمالك السابقة، 3) الحصول على تقييمات إيجابية من العملاء، 4) المشاركة في الدورات التدريبية لتطوير مهاراتك، 5) تقديم عروض مخصصة ومميزة للمشاريع."
      }
    ]
  },
  {
    category: "لأصحاب الأعمال",
    questions: [
      {
        id: "q7",
        question: "كيف يمكنني نشر مشروع؟",
        answer: "يمكنك نشر مشروع جديد من خلال لوحة التحكم الخاصة بك، بالنقر على 'إنشاء مشروع جديد'. ستحتاج إلى تحديد تفاصيل المشروع، والميزانية المتوقعة، والمدة الزمنية، والمهارات المطلوبة. كلما كانت تفاصيل المشروع أكثر وضوحاً، كلما زادت فرص حصولك على عروض مناسبة."
      },
      {
        id: "q8",
        question: "كيف أضمن جودة العمل المقدم؟",
        answer: "تضمن منصة علي للأعمال جودة العمل من خلال عدة آليات: 1) نظام التقييمات والمراجعات للمستقلين، 2) نظام الدفعات المؤمنة الذي يضمن عدم تحويل المبلغ للمستقل إلا بعد موافقتك على العمل، 3) إمكانية طلب تعديلات قبل الموافقة النهائية، 4) دعم فني متخصص للتدخل في حال وجود أي خلاف."
      },
      {
        id: "q9",
        question: "هل يمكنني التواصل مع المستقل خارج المنصة؟",
        answer: "نوصي بشدة بإبقاء جميع المحادثات والاتفاقات والمدفوعات داخل المنصة لضمان حقوق جميع الأطراف. التواصل خارج المنصة لا يوفر الحماية اللازمة ويعرضك لمخاطر محتملة، كما أنه يخالف شروط استخدام المنصة."
      }
    ]
  },
  {
    category: "الدعم الفني",
    questions: [
      {
        id: "q10",
        question: "كيف يمكنني التواصل مع الدعم الفني؟",
        answer: "يمكنك التواصل مع فريق الدعم الفني من خلال: 1) نموذج الاتصال في صفحة 'اتصل بنا'، 2) المحادثة المباشرة المتاحة من الساعة 9 صباحاً حتى 9 مساءً، 3) البريد الإلكتروني support@aliworks.sa، 4) الاتصال المباشر على رقم الدعم الفني المتوفر في صفحة 'اتصل بنا'."
      },
      {
        id: "q11",
        question: "ماذا أفعل إذا واجهت مشكلة في المشروع؟",
        answer: "في حال واجهت أي مشكلة مع المشروع، يمكنك اتباع الخطوات التالية: 1) التواصل مباشرة مع الطرف الآخر ومحاولة حل المشكلة بشكل ودي، 2) استخدام خاصية 'فتح نزاع' من صفحة المشروع إذا لم تتمكن من الوصول إلى حل، 3) سيتدخل فريق الدعم الفني لدراسة المشكلة والمساعدة في حلها بشكل عادل لجميع الأطراف."
      },
      {
        id: "q12",
        question: "هل يمكنني استرداد أموالي إذا لم أكن راضياً عن الخدمة؟",
        answer: "نعم، يمكنك طلب استرداد الأموال في حالات معينة مثل: 1) عدم التزام المستقل بشروط المشروع المتفق عليها، 2) عدم تسليم العمل في الوقت المحدد، 3) وجود اختلاف كبير بين ما تم الاتفاق عليه وما تم تسليمه. يرجى ملاحظة أن طلبات الاسترداد تخضع لمراجعة فريق الدعم الفني وقد تستغرق 3-5 أيام عمل."
      }
    ]
  }
];

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredFaqs(faqData);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = faqData.map(category => {
      const filteredQuestions = category.questions.filter(
        q => q.question.toLowerCase().includes(term) || q.answer.toLowerCase().includes(term)
      );
      return {
        ...category,
        questions: filteredQuestions
      };
    }).filter(category => category.questions.length > 0);
    
    setFilteredFaqs(filtered);
  };
  
  return (
    <>
      <Helmet>
        <title>الأسئلة الشائعة | علي للأعمال</title>
        <meta name="description" content="الإجابات على الأسئلة الشائعة حول منصة علي للأعمال، العمل الحر، والمدفوعات" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-12 pt-28">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">الأسئلة الشائعة</h1>
          
          <Card className="bg-gray-50 p-4 mb-10">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="ابحث عن سؤال..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 ml-2" />
                بحث
              </Button>
            </form>
          </Card>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">لا توجد نتائج تطابق بحثك. يرجى تجربة كلمات مختلفة.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setFilteredFaqs(faqData);
                }}
                className="mt-2"
              >
                العودة لجميع الأسئلة
              </Button>
            </div>
          ) : (
            filteredFaqs.map((category, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
                  {category.questions.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="px-4 text-right hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          )}
          
          <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
            <h2 className="text-xl font-semibold mb-2">لم تجد إجابة لسؤالك؟</h2>
            <p className="text-gray-700 mb-4">
              نحن هنا للمساعدة. يمكنك التواصل معنا مباشرة وسنرد عليك في أقرب وقت ممكن.
            </p>
            <Button asChild>
              <a href="/contact">اتصل بنا</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Faq;
