import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  ArrowLeft, 
  Building, 
  User, 
  Target,
  Briefcase,
  Copy,
  Check,
  Wand2
} from 'lucide-react';
import { ResumeData } from '../types/resume';

interface CoverLetterGeneratorProps {
  resumeData: ResumeData;
  onBack: () => void;
}

interface CoverLetterData {
  companyName: string;
  jobTitle: string;
  hiringManagerName: string;
  jobDescription: string;
  whyInterested: string;
  keyAchievement: string;
}

const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({ resumeData, onBack }) => {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    companyName: '',
    jobTitle: '',
    hiringManagerName: '',
    jobDescription: '',
    whyInterested: '',
    keyAchievement: ''
  });
  
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof CoverLetterData, value: string) => {
    setCoverLetterData(prev => ({ ...prev, [field]: value }));
  };

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const letter = `Dear ${coverLetterData.hiringManagerName || 'Hiring Manager'},

I am writing to express my strong interest in the ${coverLetterData.jobTitle} position at ${coverLetterData.companyName}. With my background in ${resumeData.experience[0]?.jobTitle || 'professional experience'} and proven track record of success, I am excited about the opportunity to contribute to your team.

${coverLetterData.whyInterested ? `What particularly draws me to ${coverLetterData.companyName} is ${coverLetterData.whyInterested}. This aligns perfectly with my career goals and values.` : ''}

In my previous role as ${resumeData.experience[0]?.jobTitle || 'a professional'} at ${resumeData.experience[0]?.company || 'my previous company'}, I successfully ${coverLetterData.keyAchievement || 'delivered exceptional results and exceeded performance expectations'}. My experience includes:

${resumeData.experience.slice(0, 2).map(exp => `• ${exp.description.split('\n')[0]?.replace('•', '').trim() || 'Contributed to team success and organizational goals'}`).join('\n')}

My technical skills in ${resumeData.skills.slice(0, 3).map(skill => skill.name).join(', ')} make me well-suited for this role. I am particularly excited about the opportunity to ${coverLetterData.jobDescription ? 'apply my expertise to ' + coverLetterData.jobDescription.toLowerCase() : 'contribute to your team\'s continued success'}.

I would welcome the opportunity to discuss how my experience and passion can contribute to ${coverLetterData.companyName}'s continued success. Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
${resumeData.personalInfo.fullName}

---
Contact Information:
Email: ${resumeData.personalInfo.email}
Phone: ${resumeData.personalInfo.phone}
${resumeData.personalInfo.linkedin ? `LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}`;

    setGeneratedLetter(letter);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadCoverLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.personalInfo.fullName}_Cover_Letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-center space-x-3 md:space-x-6">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 md:p-3 rounded-2xl shadow-2xl">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  AI Cover Letter
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Input Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-8 shadow-2xl">
            <div className="text-center mb-6 md:mb-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wand2 className="h-8 w-8 text-gray-900" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">AI Cover Letter Generator</h2>
              <p className="text-gray-300">Fill in the details to generate a personalized cover letter</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3 flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Company Name *
                </label>
                <input
                  type="text"
                  value={coverLetterData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder="Google, Microsoft, Apple..."
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Job Title *
                </label>
                <input
                  type="text"
                  value={coverLetterData.jobTitle}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder="Software Engineer, Marketing Manager..."
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Hiring Manager Name
                </label>
                <input
                  type="text"
                  value={coverLetterData.hiringManagerName}
                  onChange={(e) => updateField('hiringManagerName', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder="John Smith, Sarah Johnson..."
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Why are you interested in this company?
                </label>
                <textarea
                  value={coverLetterData.whyInterested}
                  onChange={(e) => updateField('whyInterested', e.target.value)}
                  rows={3}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder="their innovative culture, mission, recent achievements..."
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                  Key Achievement to Highlight
                </label>
                <textarea
                  value={coverLetterData.keyAchievement}
                  onChange={(e) => updateField('keyAchievement', e.target.value)}
                  rows={3}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder="increased sales by 40%, led a team of 10, launched a successful product..."
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">
                  Job Description/Requirements
                </label>
                <textarea
                  value={coverLetterData.jobDescription}
                  onChange={(e) => updateField('jobDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder="develop web applications, manage marketing campaigns, analyze data..."
                />
              </div>

              <button
                onClick={generateCoverLetter}
                disabled={!coverLetterData.companyName || !coverLetterData.jobTitle || isGenerating}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate Cover Letter</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Cover Letter */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">Generated Cover Letter</h3>
              {generatedLetter && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={downloadCoverLetter}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            {generatedLetter ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 max-h-96 overflow-y-auto">
                <pre className="text-gray-200 text-sm md:text-base whitespace-pre-wrap font-sans leading-relaxed">
                  {generatedLetter}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12 md:py-16 border-2 border-dashed border-white/30 rounded-xl">
                <div className="bg-gradient-to-r from-gray-400 to-gray-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-900" />
                </div>
                <p className="text-gray-400 text-lg md:text-xl mb-2">No cover letter generated yet</p>
                <p className="text-gray-500 text-sm md:text-base">Fill in the form and click "Generate Cover Letter" to create your personalized cover letter</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center">
            <Sparkles className="h-6 w-6 mr-3 text-yellow-400" />
            Pro Tips for Better Cover Letters
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                Research the company's recent news and achievements
              </p>
              <p className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                Quantify your achievements with specific numbers
              </p>
              <p className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                Match your skills to the job requirements
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                Keep it concise and focused (one page max)
              </p>
              <p className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                Use the hiring manager's name when possible
              </p>
              <p className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                End with a strong call to action
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;