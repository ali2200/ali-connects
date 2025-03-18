
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Search, Plus, Edit, Trash2, FileText, Eye, Image, Calendar, Tag, CheckCircle, XCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// بيانات تجريبية للمقالات
const mockBlogs = [
  { 
    id: '1', 
    title: 'كيف تبدأ في العمل الحر؟', 
    slug: 'how-to-start-freelancing', 
    author: 'محمد أحمد',
    category: 'العمل الحر',
    tags: ['freelancing', 'tips', 'career'],
    status: 'منشور',
    date: '2023-06-15',
    views: 1250,
    image: '/placeholder.svg',
    excerpt: 'دليل شامل للبدء في العمل الحر وتحقيق النجاح فيه من البداية.'
  },
  { 
    id: '2', 
    title: 'أساسيات تصميم واجهات المستخدم', 
    slug: 'ui-design-basics', 
    author: 'سارة المهندس',
    category: 'تصميم',
    tags: ['ui', 'design', 'web'],
    status: 'منشور',
    date: '2023-07-22',
    views: 980,
    image: '/placeholder.svg',
    excerpt: 'تعرف على أساسيات تصميم واجهات المستخدم وكيفية إنشاء تصاميم جذابة.'
  },
  { 
    id: '3', 
    title: 'مستقبل الذكاء الاصطناعي في التعليم', 
    slug: 'ai-future-in-education', 
    author: 'خالد العتيبي',
    category: 'تكنولوجيا',
    tags: ['ai', 'education', 'future'],
    status: 'مسودة',
    date: '2023-08-05',
    views: 0,
    image: '/placeholder.svg',
    excerpt: 'نظرة على مستقبل الذكاء الاصطناعي في قطاع التعليم والتغييرات المتوقعة.'
  },
  { 
    id: '4', 
    title: 'أفضل 10 منصات للعمل الحر', 
    slug: 'top-10-freelance-platforms', 
    author: 'فاطمة علي',
    category: 'العمل الحر',
    tags: ['platforms', 'freelancing', 'work'],
    status: 'منشور',
    date: '2023-09-10',
    views: 2340,
    image: '/placeholder.svg',
    excerpt: 'استعراض لأفضل 10 منصات للعمل الحر يمكنك استخدامها لبدء مسيرتك المهنية.'
  },
  { 
    id: '5', 
    title: 'نصائح لتحسين الإنتاجية أثناء العمل من المنزل', 
    slug: 'productivity-tips-remote-work', 
    author: 'أحمد محمد',
    category: 'إنتاجية',
    tags: ['productivity', 'remote-work', 'tips'],
    status: 'مراجعة',
    date: '2023-10-18',
    views: 0,
    image: '/placeholder.svg',
    excerpt: 'كيفية زيادة إنتاجيتك والحفاظ على التوازن بين العمل والحياة أثناء العمل عن بعد.'
  },
];

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setBlogs(mockBlogs);
    } else {
      const filtered = mockBlogs.filter(blog => 
        blog.title.includes(e.target.value) || 
        blog.category.includes(e.target.value) ||
        blog.author.includes(e.target.value)
      );
      setBlogs(filtered);
    }
  };
  
  const handleDeleteBlog = (blogId) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      toast({
        title: "تم حذف المقال",
        description: "تم حذف المقال بنجاح",
      });
    }
  };
  
  const handlePublishBlog = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId ? { ...blog, status: 'منشور' } : blog
    ));
    
    toast({
      title: "تم نشر المقال",
      description: "تم نشر المقال بنجاح",
    });
  };
  
  const renderStatus = (status) => {
    switch (status) {
      case 'منشور':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            منشور
          </span>
        );
      case 'مسودة':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
            مسودة
          </span>
        );
      case 'مراجعة':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            مراجعة
          </span>
        );
      default:
        return status;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>إدارة المقالات | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إدارة المقالات">
        <div className="space-y-6">
          {/* رأس الصفحة */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="البحث عن مقال..." 
                className="pr-10" 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مقال جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>إضافة مقال جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عنوان المقال</label>
                    <Input placeholder="أدخل عنوان المقال" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الكاتب</label>
                      <Input placeholder="اسم الكاتب" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">التصنيف</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>العمل الحر</option>
                        <option>تصميم</option>
                        <option>تكنولوجيا</option>
                        <option>إنتاجية</option>
                        <option>ريادة أعمال</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">صورة المقال</label>
                    <div className="flex items-center gap-2">
                      <Input type="file" />
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4 ml-2" />
                        اختيار صورة
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">مقتطف المقال</label>
                    <Textarea placeholder="اكتب مقتطفاً قصيراً للمقال" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">محتوى المقال</label>
                    <Textarea 
                      placeholder="اكتب محتوى المقال هنا..." 
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الكلمات المفتاحية (مفصولة بفواصل)</label>
                    <Input placeholder="مثال: تصميم، ويب، مهارات" />
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline">حفظ كمسودة</Button>
                    <Button>نشر المقال</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* جدول المقالات */}
          <Card>
            <CardHeader>
              <CardTitle>جميع المقالات</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>قائمة بجميع المقالات في المدونة</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الكاتب</TableHead>
                    <TableHead>التصنيف</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المشاهدات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>{blog.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{blog.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {blog.excerpt}
                        </div>
                      </TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 text-gray-500 ml-1" />
                          {blog.category}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 ml-1" />
                          {blog.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-gray-500 ml-1" />
                          {blog.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        {renderStatus(blog.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>تعديل المقال</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">عنوان المقال</label>
                                  <Input defaultValue={blog.title} />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">الكاتب</label>
                                    <Input defaultValue={blog.author} />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">التصنيف</label>
                                    <select 
                                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                      defaultValue={blog.category}
                                    >
                                      <option>العمل الحر</option>
                                      <option>تصميم</option>
                                      <option>تكنولوجيا</option>
                                      <option>إنتاجية</option>
                                      <option>ريادة أعمال</option>
                                    </select>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">صورة المقال</label>
                                  <div className="flex items-center gap-2">
                                    <Input type="file" />
                                    <Button variant="outline" size="sm">
                                      <Image className="h-4 w-4 ml-2" />
                                      اختيار صورة
                                    </Button>
                                  </div>
                                  <div className="h-20 w-32 bg-gray-100 rounded mt-2 overflow-hidden">
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">مقتطف المقال</label>
                                  <Textarea defaultValue={blog.excerpt} />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">محتوى المقال</label>
                                  <Textarea 
                                    defaultValue="محتوى المقال التفصيلي..." 
                                    className="min-h-[200px]"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">الكلمات المفتاحية (مفصولة بفواصل)</label>
                                  <Input defaultValue={blog.tags.join(', ')} />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">الحالة</label>
                                  <select 
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    defaultValue={blog.status}
                                  >
                                    <option>منشور</option>
                                    <option>مسودة</option>
                                    <option>مراجعة</option>
                                  </select>
                                </div>
                                
                                <div className="flex gap-2 justify-end">
                                  <Button variant="outline">حفظ كمسودة</Button>
                                  <Button>تحديث المقال</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteBlog(blog.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                          </Button>
                          
                          {blog.status !== 'منشور' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handlePublishBlog(blog.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminBlogs;
