
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User, Tag, ChevronRight, MessageSquare, Share2, Heart } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  
  // في التطبيق الحقيقي، سنقوم بجلب البيانات بناءً على المعرف (slug)
  const post = {
    title: "10 نصائح للنجاح كمستقل في عام 2023",
    excerpt: "تعرف على أهم النصائح التي ستساعدك على تحقيق النجاح في مجال العمل الحر وزيادة دخلك كمستقل في العام الجديد.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "15 أغسطس 2023",
    author: "محمد العتيبي",
    category: "العمل الحر",
    readTime: "5 دقائق",
    content: `
      <p>يشهد سوق العمل الحر نمواً متسارعاً في السنوات الأخيرة، خاصة مع تغير مفاهيم العمل التقليدية واتجاه الكثير من الشركات والمؤسسات نحو توظيف المستقلين لتنفيذ مشاريعهم. ومع هذا النمو، تزداد المنافسة بين المستقلين، مما يجعل تحقيق النجاح في هذا المجال أمراً يتطلب التخطيط والجهد المستمر.</p>
      <p>في هذا المقال، سنستعرض معكم 10 نصائح أساسية للنجاح كمستقل في عام 2023، مع التركيز على كيفية تطوير مهاراتك وزيادة دخلك في سوق العمل الحر.</p>
      <h2>1. حدد تخصصك بدقة</h2>
      <p>أحد أهم أسباب نجاح المستقلين هو التخصص في مجال محدد بدلاً من تقديم خدمات متنوعة في مجالات مختلفة. التخصص يساعدك على:</p>
      <ul>
        <li>بناء خبرة عميقة في مجال معين</li>
        <li>تقديم خدمات ذات جودة أعلى</li>
        <li>رفع قيمة خدماتك وزيادة دخلك</li>
        <li>بناء سمعة قوية في مجال تخصصك</li>
      </ul>
    `,
    tags: ["العمل الحر", "نصائح للمستقلين", "زيادة الدخل", "تطوير المهارات"],
    comments: 8,
    likes: 24,
    shares: 12
  };
  
  return (
    <>
      <Helmet>
        <title>{post.title} | مدونة علي للأعمال</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-4xl mx-auto">
          {/* مسار التنقل */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-blue-600">الرئيسية</a>
            <ChevronRight className="mx-2 h-4 w-4" />
            <a href="/blog" className="hover:text-blue-600">المدونة</a>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-gray-700">{post.title}</span>
          </div>
          
          {/* عنوان المقال */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          {/* معلومات المقال */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
            <span className="flex items-center">
              <User className="h-4 w-4 ml-1" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 ml-1" />
              {post.readTime}
            </span>
            <span className="flex items-center">
              <Tag className="h-4 w-4 ml-1" />
              {post.category}
            </span>
            <span>{post.date}</span>
          </div>
          
          {/* صورة المقال */}
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          
          {/* محتوى المقال */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="prose max-w-none text-gray-800" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </CardContent>
          </Card>
          
          {/* وسوم المقال */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">الوسوم:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <a key={index} href={`/blog/tag/${tag}`} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </a>
              ))}
            </div>
          </div>
          
          {/* تفاعلات المقال */}
          <Card className="mb-12">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes} إعجاب</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments} تعليق</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>مشاركة</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* مقالات ذات صلة */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-0">
                  <a href="/blog/related-post-1">
                    <img 
                      src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="مقال ذو صلة" 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">كيف تكتب عرض مشروع احترافي يضمن لك الفوز بالمشاريع</h3>
                      <p className="text-sm text-gray-500">10 أغسطس 2023 | 7 دقائق للقراءة</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <a href="/blog/related-post-2">
                    <img 
                      src="https://images.unsplash.com/photo-1527689368864-4dbcf45c1168?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="مقال ذو صلة" 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">الذكاء الاصطناعي وتأثيره على مستقبل العمل الحر</h3>
                      <p className="text-sm text-gray-500">5 أغسطس 2023 | 8 دقائق للقراءة</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
