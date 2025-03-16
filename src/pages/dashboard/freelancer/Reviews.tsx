
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';

const FreelancerReviews = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <>
      <Helmet>
        <title>التقييمات | لوحة تحكم المستقل</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="التقييمات">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">التقييمات</h1>
          </div>
          
          {/* ملخص التقييمات */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* متوسط التقييم */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-blue-600">4.8</div>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= 4.8 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-500 mt-2">من 47 تقييم</div>
                </div>
                
                {/* توزيع التقييمات */}
                <div className="col-span-2">
                  <h3 className="font-medium mb-4">توزيع التقييمات</h3>
                  <div className="space-y-3">
                    {[
                      { stars: 5, count: 32, percentage: 68 },
                      { stars: 4, count: 10, percentage: 21 },
                      { stars: 3, count: 3, percentage: 6 },
                      { stars: 2, count: 2, percentage: 4 },
                      { stars: 1, count: 0, percentage: 0 }
                    ].map(rating => (
                      <div key={rating.stars} className="flex items-center gap-4">
                        <div className="flex items-center w-20">
                          <span className="ml-1">{rating.stars}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                        <Progress value={rating.percentage} className="h-2 flex-1" />
                        <div className="w-12 text-right text-gray-500">
                          {rating.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* قائمة التقييمات */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="positive">إيجابية</TabsTrigger>
              <TabsTrigger value="neutral">محايدة</TabsTrigger>
              <TabsTrigger value="negative">سلبية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-4">
              <ReviewsList 
                reviews={[
                  { 
                    id: '1',
                    client: { name: 'أحمد محمد', image: 'https://i.pravatar.cc/150?img=10' },
                    rating: 5,
                    content: 'عمل رائع جداً، تفاني في الالتزام بالمواعيد وتقديم أفضل النتائج. سأتعامل معه مرة أخرى بكل تأكيد.',
                    date: '2023-12-05',
                    project: 'تصميم موقع إلكتروني',
                    reply: 'شكراً جزيلاً لك على تقييمك الإيجابي، سعيد بأن العمل نال إعجابك وأتطلع للتعاون معك في مشاريع أخرى.'
                  },
                  { 
                    id: '2',
                    client: { name: 'سارة أحمد', image: 'https://i.pravatar.cc/150?img=5' },
                    rating: 4,
                    content: 'عمل جيد جداً، التزام بالوقت والتعليمات. هناك بعض التعديلات البسيطة التي أخذت وقتاً لتنفيذها.',
                    date: '2023-11-20',
                    project: 'تطوير تطبيق موبايل',
                    reply: null
                  },
                  { 
                    id: '3',
                    client: { name: 'خالد العلي', image: 'https://i.pravatar.cc/150?img=12' },
                    rating: 3,
                    content: 'مستوى متوسط في التنفيذ، كان هناك بعض التأخير في التسليم لكن الجودة مقبولة بشكل عام.',
                    date: '2023-10-15',
                    project: 'تصميم هوية بصرية',
                    reply: 'أشكر تقييمك ومرورك الكريم. أعتذر عن التأخير في التسليم، وسأحرص على تحسين الأداء في المشاريع القادمة.'
                  },
                  { 
                    id: '4',
                    client: { name: 'محمد القاسم', image: 'https://i.pravatar.cc/150?img=15' },
                    rating: 5,
                    content: 'تعاون ممتاز وتفهم كامل لمتطلبات المشروع، النتيجة كانت أفضل مما توقعت.',
                    date: '2023-09-28',
                    project: 'تصميم لوجو',
                    reply: null
                  }
                ]}
              />
            </TabsContent>
            
            <TabsContent value="positive" className="mt-4 space-y-4">
              <ReviewsList 
                reviews={[
                  { 
                    id: '1',
                    client: { name: 'أحمد محمد', image: 'https://i.pravatar.cc/150?img=10' },
                    rating: 5,
                    content: 'عمل رائع جداً، تفاني في الالتزام بالمواعيد وتقديم أفضل النتائج. سأتعامل معه مرة أخرى بكل تأكيد.',
                    date: '2023-12-05',
                    project: 'تصميم موقع إلكتروني',
                    reply: 'شكراً جزيلاً لك على تقييمك الإيجابي، سعيد بأن العمل نال إعجابك وأتطلع للتعاون معك في مشاريع أخرى.'
                  },
                  { 
                    id: '4',
                    client: { name: 'محمد القاسم', image: 'https://i.pravatar.cc/150?img=15' },
                    rating: 5,
                    content: 'تعاون ممتاز وتفهم كامل لمتطلبات المشروع، النتيجة كانت أفضل مما توقعت.',
                    date: '2023-09-28',
                    project: 'تصميم لوجو',
                    reply: null
                  }
                ]}
              />
            </TabsContent>
            
            <TabsContent value="neutral" className="mt-4 space-y-4">
              <ReviewsList 
                reviews={[
                  { 
                    id: '2',
                    client: { name: 'سارة أحمد', image: 'https://i.pravatar.cc/150?img=5' },
                    rating: 4,
                    content: 'عمل جيد جداً، التزام بالوقت والتعليمات. هناك بعض التعديلات البسيطة التي أخذت وقتاً لتنفيذها.',
                    date: '2023-11-20',
                    project: 'تطوير تطبيق موبايل',
                    reply: null
                  },
                  { 
                    id: '3',
                    client: { name: 'خالد العلي', image: 'https://i.pravatar.cc/150?img=12' },
                    rating: 3,
                    content: 'مستوى متوسط في التنفيذ، كان هناك بعض التأخير في التسليم لكن الجودة مقبولة بشكل عام.',
                    date: '2023-10-15',
                    project: 'تصميم هوية بصرية',
                    reply: 'أشكر تقييمك ومرورك الكريم. أعتذر عن التأخير في التسليم، وسأحرص على تحسين الأداء في المشاريع القادمة.'
                  }
                ]}
              />
            </TabsContent>
            
            <TabsContent value="negative" className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">لا توجد تقييمات سلبية</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

// مكون عرض التقييمات
interface Review {
  id: string;
  client: {
    name: string;
    image: string;
  };
  rating: number;
  content: string;
  date: string;
  project: string;
  reply: string | null;
}

const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  const { toast } = useState();
  
  const handleAddReply = (id: string, reply: string) => {
    toast({
      title: "تم إضافة الرد",
      description: "تم إضافة ردك على التقييم بنجاح",
    });
  };
  
  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">لا توجد تقييمات في هذه الفئة</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <Card key={review.id}>
          <CardContent className="p-5">
            <div className="space-y-4">
              {/* معلومات العميل والتقييم */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.client.image} alt={review.client.name} />
                    <AvatarFallback>{review.client.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.client.name}</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 ml-2">{review.project}</span>
                      <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* محتوى التقييم */}
              <div>
                <p className="text-gray-700">{review.content}</p>
              </div>
              
              {/* الرد على التقييم */}
              {review.reply ? (
                <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">ردك على التقييم</span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.reply}</p>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="ml-1 h-4 w-4" />
                    الرد على التقييم
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FreelancerReviews;
