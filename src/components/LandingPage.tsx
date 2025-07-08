import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Shield,
  Zap,
  Award,
  FileText,
  Download,
  Palette,
  Camera,
  Sparkles,
  Rocket,
  Heart,
  Globe,
  Target,
  Crown,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { Review } from '../types/resume';
import ThemeToggle from './ThemeToggle';

interface LandingPageProps {
  onGetStarted: () => void;
  reviews: Review[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, reviews }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: Sparkles, color: 'text-yellow-400', delay: '0s', duration: '3s' },
    { icon: Star, color: 'text-pink-400', delay: '0.5s', duration: '4s' },
    { icon: Heart, color: 'text-red-400', delay: '1s', duration: '3.5s' },
    { icon: Crown, color: 'text-purple-400', delay: '1.5s', duration: '4.5s' },
    { icon: Rocket, color: 'text-blue-400', delay: '2s', duration: '3s' },
    { icon: Target, color: 'text-green-400', delay: '2.5s', duration: '4s' },
  ];

  // Load reviews from localStorage
  const [persistentReviews, setPersistentReviews] = useState<Review[]>([]);

  useEffect(() => {
    const savedReviews = localStorage.getItem('kickresume-reviews');
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        setPersistentReviews(parsed);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    }
  }, []);

  // Combine persistent reviews with new reviews
  const allReviews = [...reviews, ...persistentReviews];

  // Default reviews if none exist
  const defaultReviews = [
    {
      id: '1',
      name: "Sarah Chen",
      role: "Software Engineer",
      rating: 5,
      comment: "I got 3 interview calls within a week of using KickResume. The AI suggestions were spot-on and it's completely free!",
      date: new Date().toISOString(),
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: '2',
      name: "Michael Rodriguez",
      role: "Marketing Manager", 
      rating: 5,
      comment: "The templates are beautiful and professional. Landed my dream job at a Fortune 500 company! Can't believe it's free.",
      date: new Date().toISOString(),
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: '3',
      name: "Emily Johnson",
      role: "Recent Graduate",
      rating: 5,
      comment: "As a new grad with no budget, this free tool was a lifesaver. The photo upload feature made my resume stand out!",
      date: new Date().toISOString(),
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  const displayReviews = allReviews.length > 0 ? allReviews.slice(0, 6) : defaultReviews;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-40 w-18 h-18 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Icons */}
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <div
              key={index}
              className={`absolute ${element.color} opacity-30`}
              style={{
                left: `${10 + (index * 15)}%`,
                top: `${20 + (index * 10)}%`,
                animation: `float ${element.duration} ease-in-out infinite`,
                animationDelay: element.delay,
              }}
            >
              <IconComponent className="h-8 w-8" />
            </div>
          );
        })}

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Mouse Follower */}
        <div 
          className="absolute w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-50 pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: 'scale(1.2)',
          }}
        />
      </div>

      {/* Header */}
      <header className={`container mx-auto px-6 py-6 relative z-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-3 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              KickResume
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-bold"
            >
              Get Started Free
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={`container mx-auto px-6 py-20 text-center relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 text-gray-900 px-6 py-3 rounded-full text-lg font-bold inline-block mb-8 animate-bounce shadow-2xl">
            🎉 100% Free Forever - No Hidden Costs!
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            Build Your Dream Resume with
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              AI Magic ✨
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Get hired faster with our completely free AI-powered resume builder. Create stunning, 
            professional resumes with 12+ gorgeous templates - no payment required!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Start Building - Completely Free</span>
              <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group border-3 border-gradient-to-r from-cyan-400 to-blue-400 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 backdrop-blur-sm bg-white/10">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Watch Demo</span>
            </button>
          </div>

          {/* Animated Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-12 text-lg text-gray-300">
            <div className="flex items-center space-x-3 group hover:text-white transition-colors duration-300">
              <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 w-5 text-gray-900" />
              </div>
              <span className="font-semibold">500K+ Users</span>
            </div>
            <div className="flex items-center space-x-3 group hover:text-white transition-colors duration-300">
              <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-gray-900" />
              </div>
              <span className="font-semibold">85% Job Success Rate</span>
            </div>
            <div className="flex items-center space-x-3 group hover:text-white transition-colors duration-300">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-5 w-5 text-gray-900" />
              </div>
              <span className="font-semibold">100% Free & Secure</span>
            </div>
            <div className="flex items-center space-x-3 group hover:text-white transition-colors duration-300">
              <div className="bg-gradient-to-r from-indigo-400 to-purple-400 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Award className="h-5 w-5 text-gray-900" />
              </div>
              <span className="font-semibold">No Watermarks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Everything You Need - 
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Completely Free!
            </span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            Professional-grade features without any cost. No hidden fees, no premium plans, just free tools to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: Zap,
              title: 'AI-Powered Analysis',
              description: 'Our AI analyzes your resume against industry standards and provides personalized recommendations to maximize your chances of getting hired.',
              gradient: 'from-yellow-400 via-orange-400 to-red-400',
              bgGradient: 'from-yellow-500/20 to-orange-500/20'
            },
            {
              icon: Palette,
              title: '12+ Premium Templates',
              description: 'Choose from executive, creative, modern, and professional templates. All designs are ATS-friendly and completely customizable with your photos.',
              gradient: 'from-pink-400 via-purple-400 to-indigo-400',
              bgGradient: 'from-pink-500/20 to-purple-500/20'
            },
            {
              icon: Download,
              title: 'Unlimited Downloads',
              description: 'Export your resume as a perfectly formatted PDF with no watermarks. Download as many versions as you need for different job applications.',
              gradient: 'from-emerald-400 via-cyan-400 to-blue-400',
              bgGradient: 'from-emerald-500/20 to-cyan-500/20'
            },
            {
              icon: Camera,
              title: 'Professional Photos',
              description: 'Upload your professional photo and see it beautifully integrated into any template. Perfect for making a strong first impression.',
              gradient: 'from-violet-400 via-purple-400 to-pink-400',
              bgGradient: 'from-violet-500/20 to-pink-500/20'
            },
            {
              icon: UserCheck,
              title: 'No Registration Required',
              description: 'Start building your resume immediately without creating an account. No email verification, no login hassles - just pure simplicity.',
              gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
              bgGradient: 'from-cyan-500/20 to-blue-500/20'
            },
            {
              icon: Award,
              title: 'ATS Optimization',
              description: 'All templates are designed to pass Applicant Tracking Systems while maintaining a professional and modern appearance.',
              gradient: 'from-green-400 via-emerald-400 to-teal-400',
              bgGradient: 'from-green-500/20 to-emerald-500/20'
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className={`group bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border border-white/20 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-2xl`}>
                  <IconComponent className="h-8 w-8 text-gray-900" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
                
                <div className={`bg-gradient-to-r ${feature.gradient} text-gray-900 px-4 py-2 rounded-full text-sm font-bold inline-block shadow-lg`}>
                  Always Free
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              What Our Users Say
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
              <span className="ml-4 text-2xl font-bold text-white">
                {allReviews.length > 0 ? `${(allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length).toFixed(1)}/5` : '4.9/5'} 
                from {allReviews.length > 0 ? `${allReviews.length}` : '50K+'} reviews
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayReviews.map((review, index) => {
              const gradients = [
                "from-pink-500 to-purple-500",
                "from-cyan-500 to-blue-500", 
                "from-emerald-500 to-teal-500",
                "from-yellow-500 to-orange-500",
                "from-indigo-500 to-purple-500",
                "from-green-500 to-emerald-500"
              ];
              
              return (
                <div 
                  key={review.id} 
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center mb-6 relative z-10">
                    <div className={`w-16 h-16 rounded-full mr-4 p-1 bg-gradient-to-r ${gradients[index % gradients.length]} group-hover:scale-110 transition-transform duration-300`}>
                      <img 
                        src={review.avatar || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`} 
                        alt={review.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {review.name}
                      </h4>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{review.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg mb-6 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                    "{review.comment}"
                  </p>
                  
                  <div className="flex relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Everything You Need to 
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Get Hired
              </span>
            </h2>
            <p className="text-2xl text-gray-300">
              All features included - no premium plans, no hidden costs, no limitations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "AI-powered content suggestions",
              "12+ professional templates with photos",
              "ATS optimization guaranteed",
              "Real-time formatting preview",
              "Export to PDF instantly (no watermarks)",
              "Mobile-friendly builder",
              "Industry-specific keywords detection",
              "Unlimited resume versions",
              "Professional photo integration",
              "No registration or login required",
              "Executive, creative, and modern layouts",
              "Completely free forever"
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-4 group hover:bg-gradient-to-r hover:from-white/10 hover:to-transparent p-4 rounded-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <CheckCircle className="h-6 w-6 text-gray-900" />
                </div>
                <span className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-sm border border-white/20 rounded-3xl p-16 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10"></div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 relative z-10">
              Ready to Land Your 
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Dream Job?
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto relative z-10">
              Join thousands of successful job seekers who've transformed their careers with our completely free resume builder
            </p>
            
            <button 
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto relative z-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Start Building My Resume - FREE Forever</span>
              <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <p className="text-gray-400 mt-6 text-lg relative z-10">
              No registration required • No credit card needed • Always free
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                KickResume
              </span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-300 mb-2">
                © 2025 KickResume. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Designed & Developed by <span className="text-white font-semibold">Samprit</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;