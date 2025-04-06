
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, Briefcase, Filter } from 'lucide-react';
import { fetchJobPosts } from '@/services/jobService';
import { JobPost } from '@/types/jobs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CustomButton from '@/components/ui/CustomButton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = [
  'برمجة وتطوير',
  'تصميم وإبداع',
  'كتابة وترجمة',
  'تسويق وإعلان',
  'دعم فني',
  'مبيعات',
  'تدريس وتدريب',
  'استشارات',
  'أخرى'
];

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<{ min: number, max: number | null }>({ min: 0, max: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const jobsData = await fetchJobPosts();
      setJobs(jobsData);
      setFilteredJobs(jobsData);
      setLoading(false);
    };

    loadJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on search query and selected filters
    let result = [...jobs];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.description.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(job => selectedCategories.includes(job.category));
    }
    
    // Budget filter
    if (budgetRange.min > 0 || budgetRange.max) {
      result = result.filter(job => {
        const jobMaxBudget = job.budget_max || Number.MAX_SAFE_INTEGER;
        const jobMinBudget = job.budget_min || 0;
        
        const maxCheck = budgetRange.max ? jobMinBudget <= budgetRange.max : true;
        const minCheck = jobMaxBudget >= budgetRange.min;
        
        return maxCheck && minCheck;
      });
    }
    
    setFilteredJobs(result);
  }, [searchQuery, selectedCategories, budgetRange, jobs]);

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setBudgetRange({ min: 0, max: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h1 className="heading-lg text-gray-900 mb-4">ابحث عن فرص العمل</h1>
          <p className="subtitle text-gray-600 max-w-2xl mx-auto">
            استعرض الفرص المتاحة وقدم عروضك للحصول على المشاريع التي تناسب مهاراتك
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="w-full md:flex-1 relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مشاريع..."
              className="h-12 pl-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          {/* Filter Button (Mobile) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <CustomButton variant="outline" rightIcon={<Filter className="ml-2 h-5 w-5" />}>
                  تصفية النتائج
                </CustomButton>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw]">
                <SheetHeader>
                  <SheetTitle>تصفية المشاريع</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <h3 className="text-lg font-medium mb-3">التصنيفات</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategoryFilter(category)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm font-medium text-gray-700 mr-2">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">نطاق الميزانية</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">الحد الأدنى</label>
                        <Input 
                          type="number"
                          value={budgetRange.min || ''}
                          onChange={(e) => setBudgetRange({ ...budgetRange, min: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">الحد الأقصى</label>
                        <Input 
                          type="number"
                          value={budgetRange.max || ''}
                          onChange={(e) => setBudgetRange({ ...budgetRange, max: e.target.value ? Number(e.target.value) : null })}
                          placeholder="بلا حدود"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <CustomButton variant="outline" onClick={resetFilters} size="sm">
                      إعادة ضبط
                    </CustomButton>
                    <CustomButton onClick={() => {}} size="sm">
                      تطبيق
                    </CustomButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Post Job Button */}
          <Dialog>
            <DialogTrigger asChild>
              <CustomButton size="lg">
                نشر مشروع جديد
              </CustomButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>نشر مشروع جديد</DialogTitle>
                <DialogDescription>
                  لنشر مشروع جديد، يرجى تسجيل الدخول كصاحب عمل
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-center">
                  يمكنك نشر مشروع جديد والبدء في تلقي العروض من المستقلين المتخصصين في مجالك
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                  <CustomButton onClick={() => navigate('/login')}>
                    تسجيل الدخول
                  </CustomButton>
                  <CustomButton variant="outline" onClick={() => navigate('/register')}>
                    إنشاء حساب
                  </CustomButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Desktop Filter Panel */}
        <div className="hidden md:flex mb-8 bg-white rounded-lg border p-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">التصنيفات:</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.slice(0, 5).map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCategoryFilter(category)}
                >
                  {category}
                </Badge>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Badge variant="outline" className="cursor-pointer">المزيد...</Badge>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>اختر التصنيفات</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {CATEGORIES.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`dialog-category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategoryFilter(category)}
                        />
                        <label htmlFor={`dialog-category-${category}`} className="text-sm font-medium text-gray-700 mr-2">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">الميزانية:</span>
            <div className="flex items-center gap-2">
              <Input 
                type="number"
                className="w-24 h-8"
                value={budgetRange.min || ''}
                onChange={(e) => setBudgetRange({ ...budgetRange, min: Number(e.target.value) })}
                placeholder="الحد الأدنى"
              />
              <span>-</span>
              <Input 
                type="number"
                className="w-24 h-8"
                value={budgetRange.max || ''}
                onChange={(e) => setBudgetRange({ ...budgetRange, max: e.target.value ? Number(e.target.value) : null })}
                placeholder="الحد الأقصى"
              />
            </div>
          </div>
          
          <CustomButton variant="outline" size="sm" onClick={resetFilters}>
            إعادة ضبط
          </CustomButton>
        </div>
        
        {/* Results Stats */}
        <div className="mb-8">
          <p className="text-gray-600">
            تم العثور على <span className="font-semibold text-gray-900">{filteredJobs.length}</span> مشروع
            {filteredJobs.length !== 1 ? 'اً' : ''}
          </p>
        </div>
        
        {/* Job Listings */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="bg-gray-100 h-10"></CardHeader>
                <CardContent className="py-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </CardContent>
                <CardFooter className="bg-gray-50 h-14"></CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="h-full hover:shadow-md transition-shadow" onClick={() => navigate(`/jobs/${job.id}`)}>
                <CardHeader className="py-4 px-6 flex flex-row justify-between items-center bg-gray-50 border-b">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-ali-blue ml-2" />
                    <span className="font-medium text-gray-600">{job.category}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(job.created_at).toLocaleDateString('ar-EG', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{job.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-1 my-3">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-gray-100">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-100">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                  <div className="text-gray-900">
                    <span className="font-semibold">
                      {job.budget_min && job.budget_max
                        ? `$${job.budget_min} - $${job.budget_max}`
                        : job.budget_min
                        ? `بدءاً من $${job.budget_min}`
                        : job.budget_max
                        ? `حتى $${job.budget_max}`
                        : 'الميزانية غير محددة'}
                    </span>
                  </div>
                  <CustomButton size="sm">
                    تقديم عرض
                  </CustomButton>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Briefcase className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لم يتم العثور على أي مشروع</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              لم نتمكن من العثور على مشاريع تطابق معايير البحث الخاصة بك. جرب تعديل المعايير أو العودة لاحقاً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
