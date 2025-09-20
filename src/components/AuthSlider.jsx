import React from 'react';
import { BookOpen, Target, Users, Award, Clock, Shield } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ThemeToggle from './ThemeToggle';

export default function AuthSlider() {
  // Slider data
  const sliderData = [
    {
      icon: <BookOpen className="w-16 h-16 mx-auto mb-6" />,
      title: "Organize Your Learning",
      description: "Keep all your study materials, notes, and resources in one place. Never lose track of your learning journey again.",
      color: "bg-white dark:bg-black"
    },
    {
      icon: <Target className="w-16 h-16 mx-auto mb-6" />,
      title: "Track Your Progress",
      description: "Set goals and monitor your achievements. See how far you've come and stay motivated to reach new heights.",
      color: "bg-white dark:bg-black"
    },
    {
      icon: <Users className="w-16 h-16 mx-auto mb-6" />,
      title: "Connect & Collaborate",
      description: "Join a community of learners. Share knowledge, ask questions, and learn together with like-minded people.",
      color: "bg-white dark:bg-black"
    },
    {
      icon: <Award className="w-16 h-16 mx-auto mb-6" />,
      title: "Earn Achievements",
      description: "Unlock badges and certificates as you complete courses and reach milestones. Celebrate your learning success.",
      color: "bg-white dark:bg-black"
    },
    {
      icon: <Clock className="w-16 h-16 mx-auto mb-6" />,
      title: "Flexible Learning",
      description: "Learn at your own pace, anytime, anywhere. Access your materials on any device, whenever you need them.",
      color: "bg-white dark:bg-black"
    },
    {
      icon: <Shield className="w-16 h-16 mx-auto mb-6" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. Focus on learning while we keep your information safe.",
      color: "bg-white dark:bg-black"
    }
  ];

  return (
    <div className="hidden md:flex w-3/5 h-screen relative">
      {/* Logo and Theme Toggle in upper corner */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white dark:text-black" />
          </div>
          <span className="text-black dark:text-white font-bold text-xl">SkillNotes</span>
          <ThemeToggle />
        </div>
      </div>
      
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={false}
        loop={true}
        className="w-full h-full"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`w-full h-full ${slide.color} flex items-center justify-center p-8`}>
              <div className="text-center text-black dark:text-white max-w-lg">
                <div className="text-black/90 dark:text-white/90">
                  {slide.icon}
                </div>
                <h1 className="text-4xl font-bold mb-6">{slide.title}</h1>
                <p className="text-xl text-black/90 dark:text-white/90 leading-relaxed">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
