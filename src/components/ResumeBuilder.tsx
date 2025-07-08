import React, { useState } from 'react';
import { Plus, Trash2, Eye, Download, ArrowLeft, Sparkles, Palette, User, FileText, GraduationCap, Wrench } from 'lucide-react';
import { ResumeData, PersonalInfo, Experience, Education, Skill } from '../types/resume';
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector';
import PhotoUpload from './PhotoUpload';
import ThemeToggle from './ThemeToggle';

interface ResumeBuilderProps {
  onComplete: (resumeData: ResumeData) => void;
  onGenerateCoverLetter?: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onComplete, onGenerateCoverLetter }) => {
  const [activeTab, setActiveTab] = useState('template');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('executive-navy');
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      photo: undefined
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
  });

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string | undefined) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate'
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const tabs = [
    { id: 'template', label: 'Template', icon: Palette },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Wrench },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Sparkles }
  ];

  // Show preview when requested
  if (showPreview) {
    return (
      <ResumePreview 
        resumeData={resumeData} 
        selectedTemplate={selectedTemplate}
        onBack={() => setShowPreview(false)}
        onComplete={() => onComplete(resumeData)}
      />
    );
  }

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

      {/* Header - Mobile Responsive */}
      <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 md:p-3 rounded-2xl shadow-2xl">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  KickResume
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
              <ThemeToggle />
              {onGenerateCoverLetter && (
                <button
                  onClick={onGenerateCoverLetter}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 font-semibold text-sm md:text-base"
                >
                  <FileText className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Cover Letter</span>
                </button>
              )}
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 font-semibold text-sm md:text-base w-full sm:w-auto"
              >
                <Eye className="h-4 w-4 md:h-5 md:w-5" />
                <span>Preview Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar - Mobile Responsive */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 sticky top-8 shadow-2xl">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Sections</h2>
              <nav className="space-y-2 md:space-y-3">
                {tabs.map(tab => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 md:space-x-3 font-semibold text-sm md:text-base ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg transform scale-105'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 md:h-5 md:w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
              
              {/* Quick Preview Button - Mobile Responsive */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/20">
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  <Eye className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Quick Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Mobile Responsive */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-8 shadow-2xl">
              {/* Template Selection Tab */}
              {activeTab === 'template' && (
                <div className="space-y-4 md:space-y-6">
                  <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Choose Your Template</h2>
                    <p className="text-gray-300 text-base md:text-lg">Select a professional template that matches your style and industry</p>
                  </div>
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    onTemplateSelect={setSelectedTemplate}
                  />
                  <div className="text-center mt-6 md:mt-8">
                    <button
                      onClick={() => setShowPreview(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2 mx-auto text-sm md:text-base"
                    >
                      <Eye className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Preview Selected Template</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Personal Info Tab - Mobile Responsive */}
              {activeTab === 'personal' && (
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Personal Information</h2>
                  
                  {/* Photo Upload */}
                  <PhotoUpload
                    photo={resumeData.personalInfo.photo}
                    onPhotoChange={(photo) => updatePersonalInfo('photo', photo)}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                        Website/Portfolio
                      </label>
                      <input
                        type="url"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo('website', e.target.value)}
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Tab - Mobile Responsive */}
              {activeTab === 'summary' && (
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Professional Summary</h2>
                  <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                      Summary
                    </label>
                    <textarea
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={6}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                      placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
                    />
                    <p className="text-gray-400 mt-2 md:mt-3 text-sm md:text-base">
                      2-3 sentences highlighting your experience, skills, and career objectives.
                    </p>
                  </div>
                </div>
              )}

              {/* Experience Tab - Mobile Responsive */}
              {activeTab === 'experience' && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Work Experience</h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 font-semibold text-sm md:text-base w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {resumeData.experience.length === 0 ? (
                    <div className="text-center py-12 md:py-16 border-2 border-dashed border-white/30 rounded-xl">
                      <p className="text-gray-400 text-lg md:text-xl">No work experience added yet</p>
                      <button
                        onClick={addExperience}
                        className="mt-3 md:mt-4 text-cyan-400 hover:text-cyan-300 font-semibold text-sm md:text-base"
                      >
                        Add your first job
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 md:space-y-6">
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="bg-white/5 border border-white/20 rounded-xl p-4 md:p-6 relative backdrop-blur-sm">
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="absolute top-3 md:top-4 right-3 md:right-4 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                Job Title *
                              </label>
                              <input
                                type="text"
                                value={exp.jobTitle}
                                onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="Software Engineer"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                Company *
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="Tech Company Inc."
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                Location
                              </label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="City, State"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                Start Date *
                              </label>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm md:text-base"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                End Date
                              </label>
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                disabled={exp.isCurrentJob}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white disabled:opacity-50 text-sm md:text-base"
                              />
                              <label className="flex items-center mt-1 md:mt-2">
                                <input
                                  type="checkbox"
                                  checked={exp.isCurrentJob}
                                  onChange={(e) => updateExperience(exp.id, 'isCurrentJob', e.target.checked)}
                                  className="mr-2"
                                />
                                <span className="text-xs md:text-sm text-gray-300">Current Job</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                              Job Description
                            </label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              rows={4}
                              className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                              placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver projects on time&#10;• Improved application performance by 40% through code optimization"
                            />
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                              Use bullet points to describe your achievements and responsibilities
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Education Tab - Mobile Responsive */}
              {activeTab === 'education' && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Education</h2>
                    <button
                      onClick={addEducation}
                      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 font-semibold text-sm md:text-base w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Add Education</span>
                    </button>
                  </div>

                  {resumeData.education.length === 0 ? (
                    <div className="text-center py-12 md:py-16 border-2 border-dashed border-white/30 rounded-xl">
                      <p className="text-gray-400 text-lg md:text-xl">No education added yet</p>
                      <button
                        onClick={addEducation}
                        className="mt-3 md:mt-4 text-cyan-400 hover:text-cyan-300 font-semibold text-sm md:text-base"
                      >
                        Add your education
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 md:space-y-6">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="bg-white/5 border border-white/20 rounded-xl p-4 md:p-6 relative backdrop-blur-sm">
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="absolute top-3 md:top-4 right-3 md:right-4 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                Degree *
                              </label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="Bachelor of Science in Computer Science"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                School *
                              </label>
                              <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="University Name"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                Location
                              </label>
                              <input
                                type="text"
                                value={edu.location}
                                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="City, State"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                Graduation Date *
                              </label>
                              <input
                                type="month"
                                value={edu.graduationDate}
                                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm md:text-base"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1 md:mb-2">
                                GPA (Optional)
                              </label>
                              <input
                                type="text"
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="3.8/4.0"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Skills Tab - Mobile Responsive */}
              {activeTab === 'skills' && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Skills</h2>
                    <button
                      onClick={addSkill}
                      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 font-semibold text-sm md:text-base w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  {resumeData.skills.length === 0 ? (
                    <div className="text-center py-12 md:py-16 border-2 border-dashed border-white/30 rounded-xl">
                      <p className="text-gray-400 text-lg md:text-xl">No skills added yet</p>
                      <button
                        onClick={addSkill}
                        className="mt-3 md:mt-4 text-cyan-400 hover:text-cyan-300 font-semibold text-sm md:text-base"
                      >
                        Add your first skill
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="bg-white/5 border border-white/20 rounded-xl p-3 md:p-4 relative backdrop-blur-sm">
                          <button
                            onClick={() => removeSkill(skill.id)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                          </button>
                          
                          <div className="space-y-2 md:space-y-3">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1">
                                Skill Name *
                              </label>
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                                placeholder="JavaScript"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-1">
                                Proficiency Level
                              </label>
                              <select
                                value={skill.level}
                                onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm md:text-base"
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;