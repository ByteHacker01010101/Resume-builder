import React, { useState, useRef } from 'react';
import { 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Download,
  FileText,
  Award,
  Users,
  TrendingUp,
  Send,
  MessageSquare,
  Heart,
  Sparkles,
  Camera,
  Upload,
  X,
  User
} from 'lucide-react';
import { Review } from '../types/resume';
import ThemeToggle from './ThemeToggle';

interface ThankYouPageProps {
  onStartOver: () => void;
  onAddReview: (review: Review) => void;
  onGenerateCoverLetter?: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onStartOver, onAddReview, onGenerateCoverLetter }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: '',
    photo: undefined as string | undefined
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setReviewData(prev => ({ ...prev, photo: e.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setReviewData(prev => ({ ...prev, photo: undefined }));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitReview = async () => {
    if (!reviewData.name || !reviewData.comment) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewData.name,
      role: reviewData.role || 'Professional',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString(),
      avatar: reviewData.photo || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
    };
    
    // Save to localStorage for persistence
    const existingReviews = localStorage.getItem('kickresume-reviews');
    let reviews: Review[] = [];
    
    if (existingReviews) {
      try {
        reviews = JSON.parse(existingReviews);
      } catch (error) {
        console.error('Error parsing existing reviews:', error);
      }
    }
    
    reviews.unshift(newReview); // Add to beginning
    localStorage.setItem('kickresume-reviews', JSON.stringify(reviews));
    
    onAddReview(newReview);
    setIsSubmitting(false);
    setReviewSubmitted(true);
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-500">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-40 w-18 h-18 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Success Section */}
      <section className="container mx-auto px-6 py-16 text-center relative z-10">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
            <CheckCircle className="h-14 w-14 text-gray-900" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8">
            Congratulations! 🎉
          </h1>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Your professional resume has been successfully created and downloaded. You're one step closer to landing your dream job!
          </p>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 mb-16 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">What happens next?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                {
                  step: "1",
                  title: "Customize Further",
                  description: "Tailor your resume for specific job applications",
                  gradient: "from-pink-400 to-purple-400"
                },
                {
                  step: "2",
                  title: "Apply to Jobs",
                  description: "Start applying to positions that match your skills",
                  gradient: "from-cyan-400 to-blue-400"
                },
                {
                  step: "3",
                  title: "Land Interviews",
                  description: "Get noticed by employers and secure interviews",
                  gradient: "from-emerald-400 to-teal-400"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className={`bg-gradient-to-r ${item.gradient} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <span className="text-gray-900 font-black text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 mb-16 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-2xl mr-4">
                <Star className="h-8 w-8 text-gray-900" />
              </div>
              <h2 className="text-3xl font-bold text-white">Share Your Experience</h2>
            </div>
            
            <p className="text-xl text-gray-300 mb-8">
              Help others by sharing your experience with KickResume!
            </p>

            {!showReviewForm && !reviewSubmitted ? (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto"
              >
                <MessageSquare className="h-6 w-6" />
                <span>Write a Review</span>
              </button>
            ) : reviewSubmitted ? (
              <div className="text-center">
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-300">Your review has been submitted and will help others discover KickResume.</p>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                {/* Photo Upload Section */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-300 mb-3">
                    Your Photo (Optional)
                  </label>
                  
                  <div className="flex items-center space-x-4">
                    {/* Photo Preview */}
                    <div className="relative">
                      {reviewData.photo ? (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <img 
                            src={reviewData.photo} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Upload Area */}
                    <div className="flex-1">
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 cursor-pointer ${
                          dragActive 
                            ? 'border-purple-400 bg-purple-500/20' 
                            : 'border-white/30 hover:border-purple-400 hover:bg-purple-500/10'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={openFileDialog}
                      >
                        <div className="space-y-2">
                          <Camera className="h-6 w-6 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              Upload your photo
                            </p>
                            <p className="text-xs text-gray-400">
                              Drag and drop or click to browse
                            </p>
                          </div>
                        </div>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-300 mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={reviewData.name}
                      onChange={(e) => setReviewData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-300 mb-3">
                      Your Role
                    </label>
                    <input
                      type="text"
                      value={reviewData.role}
                      onChange={(e) => setReviewData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-300 mb-3">
                    Rating
                  </label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                        className={`transition-all duration-300 transform hover:scale-110 ${
                          star <= reviewData.rating 
                            ? 'text-yellow-400' 
                            : 'text-gray-500'
                        }`}
                      >
                        <Star className="h-8 w-8 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-300 mb-3">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Share your experience with KickResume..."
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 py-3 border-2 border-white/30 text-gray-300 rounded-xl font-semibold hover:border-white/50 hover:text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    disabled={!reviewData.name || !reviewData.comment || isSubmitting}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-6">
              Trusted by 
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Professionals Worldwide
              </span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Users,
                value: "500K+",
                label: "Resumes Created",
                gradient: "from-blue-400 to-purple-400"
              },
              {
                icon: TrendingUp,
                value: "85%",
                label: "Job Success Rate",
                gradient: "from-emerald-400 to-cyan-400"
              },
              {
                icon: Award,
                value: "4.9/5",
                label: "User Rating",
                gradient: "from-yellow-400 to-orange-400"
              }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="group">
                  <div className={`bg-gradient-to-r ${stat.gradient} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-2xl`}>
                    <IconComponent className="h-10 w-10 text-gray-900" />
                  </div>
                  <div className="text-4xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {stat.value}
                  </div>
                  <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-sm border border-white/20 rounded-3xl p-16 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">
              Ready to Create Another Resume?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto relative z-10">
              Build multiple versions for different job applications. All features remain completely free!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              {onGenerateCoverLetter && (
                <button 
                  onClick={onGenerateCoverLetter}
                  className="group bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <FileText className="h-6 w-6 relative z-10" />
                  <span className="relative z-10">Generate Cover Letter</span>
                </button>
              )}
              <button 
                onClick={onStartOver}
                className="group bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <Sparkles className="h-6 w-6 relative z-10" />
                <span className="relative z-10">Create Another Resume</span>
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <FileText className="h-6 w-6" />
                <span>Start Fresh</span>
              </button>
            </div>
            <p className="text-gray-400 mt-6 text-lg relative z-10">
              Always free • No limits • No watermarks
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
    </div>
  );
};

export default ThankYouPage;