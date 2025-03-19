
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const VideoIntro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="heading-md text-gray-900 mb-4">
            تعرف على منصة علي للأعمال
          </h2>
          <p className="subtitle text-gray-600">
            شاهد الفيديو التعريفي لمعرفة كيف يمكن أن تساعدك منصتنا في تطوير عملك وتنمية مهاراتك
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            {/* Glass Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 glass z-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <div className="flex items-center justify-between">
                <button 
                  onClick={togglePlay} 
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
                  aria-label={isPlaying ? "إيقاف الفيديو" : "تشغيل الفيديو"}
                >
                  {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                </button>
                
                <button 
                  onClick={toggleMute} 
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
                  aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
                </button>
              </div>
            </div>
            
            {/* Play Button Overlay */}
            <div 
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
              onClick={togglePlay}
            >
              <div className="bg-ali-blue/80 backdrop-blur-sm rounded-full p-6 cursor-pointer hover:bg-ali-blue transition-colors">
                <Play className="h-12 w-12 text-white" fill="white" />
              </div>
            </div>
            
            {/* Video */}
            <video 
              ref={videoRef}
              className="w-full aspect-video object-cover"
              poster="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
              muted={isMuted}
              loop
              playsInline
              onClick={togglePlay}
            >
              <source src="https://player.vimeo.com/external/449623220.sd.mp4?s=d5feeaa6b96b373a476b9ee0daf8626050c93fc6&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">ما ستجده في منصة علي للأعمال</h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-right">
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <h4 className="font-medium text-ali-blue mb-2">منصة أعمال حرة</h4>
                <p className="text-gray-600 text-sm">تواصل مع أفضل المستقلين وأصحاب الأعمال من جميع أنحاء العالم العربي</p>
              </div>
              
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <h4 className="font-medium text-ali-blue mb-2">دورات تعليمية احترافية</h4>
                <p className="text-gray-600 text-sm">دورات متخصصة في التسويق الرقمي وإدارة الأعمال بشهادات معتمدة</p>
              </div>
              
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <h4 className="font-medium text-ali-blue mb-2">سوق خدمات متكامل</h4>
                <p className="text-gray-600 text-sm">اشتر أو بع خدمات احترافية في مختلف المجالات مع ضمان حقوق الطرفين</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoIntro;
