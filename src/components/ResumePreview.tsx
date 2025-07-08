import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { getTemplateById } from '../data/templates';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  onBack: () => void;
  onComplete: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  resumeData, 
  selectedTemplate, 
  onBack, 
  onComplete 
}) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const template = getTemplateById(selectedTemplate);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${resumeData.personalInfo.fullName}_Resume`,
    onAfterPrint: () => {
      onComplete();
    }
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (!template) {
    return <div>Template not found</div>;
  }

  const styles = {
    primary: { color: template.colors.primary },
    secondary: { color: template.colors.secondary },
    accent: { color: template.colors.accent },
    text: { color: template.colors.text },
    background: { backgroundColor: template.colors.background },
    light: { backgroundColor: template.colors.light },
    primaryBg: { backgroundColor: template.colors.primary },
    accentBg: { backgroundColor: template.colors.accent },
    border: { borderColor: template.colors.primary },
    gradient: { 
      background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.accent})` 
    }
  };

  const renderExecutiveLayout = () => (
    <div style={styles.background} className="min-h-screen">
      {/* Header with Photo - Mobile Responsive */}
      <header className="text-center py-8 md:py-12 text-white relative overflow-hidden" style={styles.gradient}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 px-4">
          {resumeData.personalInfo.photo && (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 md:mb-6 border-4 border-white shadow-2xl overflow-hidden">
              <img 
                src={resumeData.personalInfo.photo} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 px-2">
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 md:gap-6 text-sm md:text-lg opacity-90 px-4">
            {resumeData.personalInfo.email && <span className="break-all">{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && resumeData.personalInfo.email && <span className="hidden sm:inline">•</span>}
            {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && (resumeData.personalInfo.email || resumeData.personalInfo.phone) && <span className="hidden sm:inline">•</span>}
            {resumeData.personalInfo.location && <span className="text-center">{resumeData.personalInfo.location}</span>}
          </div>
          {(resumeData.personalInfo.linkedin || resumeData.personalInfo.website) && (
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 md:gap-6 mt-3 md:mt-4 px-4">
              {resumeData.personalInfo.linkedin && (
                <a href={resumeData.personalInfo.linkedin} className="hover:underline opacity-90 break-all text-sm md:text-base">
                  LinkedIn
                </a>
              )}
              {resumeData.personalInfo.website && (
                <a href={resumeData.personalInfo.website} className="hover:underline opacity-90 break-all text-sm md:text-base">
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">
          {/* Summary */}
          {resumeData.summary && (
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
                Executive Summary
              </h2>
              <p className="leading-relaxed text-base md:text-lg" style={styles.text}>
                {resumeData.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center p-2 md:p-3 rounded-lg" style={styles.light}>
                    <span className="font-medium text-sm md:text-lg" style={styles.text}>{skill.name}</span>
                    <span 
                      className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white"
                      style={styles.accentBg}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6 md:space-y-8">
          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
                Professional Experience
              </h2>
              <div className="space-y-4 md:space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 md:pl-6 border-l-4" style={{ borderColor: template.colors.accent }}>
                    <div className="absolute -left-1.5 md:-left-2 top-0 w-3 h-3 md:w-4 md:h-4 rounded-full" style={styles.accentBg}></div>
                    <h3 className="text-lg md:text-xl font-bold" style={styles.text}>{exp.jobTitle}</h3>
                    <div className="text-base md:text-lg font-semibold mb-2" style={styles.primary}>
                      {exp.company} • {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </div>
                    {exp.location && <p className="text-xs md:text-sm mb-2 md:mb-3" style={styles.secondary}>{exp.location}</p>}
                    {exp.description && (
                      <div style={styles.text} className="text-sm md:text-base">
                        {exp.description.split('\n').map((line, index) => (
                          <div key={index} className="mb-1">
                            {line.trim().startsWith('•') ? line : `• ${line}`}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
                Education
              </h2>
              <div className="space-y-3 md:space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="p-3 md:p-4 rounded-lg" style={styles.light}>
                    <h3 className="text-base md:text-lg font-bold" style={styles.text}>{edu.degree}</h3>
                    <div className="font-semibold text-sm md:text-base" style={styles.primary}>
                      {edu.school} • {formatDate(edu.graduationDate)}
                    </div>
                    {edu.location && <p className="text-xs md:text-sm" style={styles.secondary}>{edu.location}</p>}
                    {edu.gpa && <p className="text-xs md:text-sm" style={styles.text}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderSidebarLayout = () => (
    <div className="flex flex-col lg:flex-row min-h-screen" style={styles.background}>
      {/* Sidebar */}
      <div className="w-full lg:w-1/3 p-4 md:p-8" style={styles.light}>
        {/* Photo */}
        {resumeData.personalInfo.photo && (
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 md:mb-6 overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={resumeData.personalInfo.photo} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
            Contact
          </h2>
          <div className="space-y-2 text-xs md:text-sm">
            {resumeData.personalInfo.email && (
              <div style={styles.text} className="break-all">{resumeData.personalInfo.email}</div>
            )}
            {resumeData.personalInfo.phone && (
              <div style={styles.text}>{resumeData.personalInfo.phone}</div>
            )}
            {resumeData.personalInfo.location && (
              <div style={styles.text}>{resumeData.personalInfo.location}</div>
            )}
            {resumeData.personalInfo.linkedin && (
              <div><a href={resumeData.personalInfo.linkedin} style={styles.primary} className="break-all">LinkedIn</a></div>
            )}
            {resumeData.personalInfo.website && (
              <div><a href={resumeData.personalInfo.website} style={styles.primary} className="break-all">Portfolio</a></div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
              Skills
            </h2>
            <div className="space-y-2 md:space-y-3">
              {resumeData.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-xs md:text-sm" style={styles.text}>{skill.name}</span>
                    <span className="text-xs" style={styles.secondary}>{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                    <div 
                      className="h-1.5 md:h-2 rounded-full" 
                      style={{ 
                        backgroundColor: template.colors.accent,
                        width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '60%' : '40%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
              Education
            </h2>
            <div className="space-y-2 md:space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-xs md:text-sm" style={styles.text}>{edu.degree}</h3>
                  <div className="text-xs md:text-sm" style={styles.primary}>{edu.school}</div>
                  <div className="text-xs" style={styles.secondary}>{formatDate(edu.graduationDate)}</div>
                  {edu.gpa && <div className="text-xs" style={styles.text}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={styles.text}>
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="h-1 w-16 md:w-24 mb-4" style={styles.accentBg}></div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
              Professional Summary
            </h2>
            <p className="leading-relaxed text-sm md:text-base" style={styles.text}>
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 pb-2 border-b-2" style={{ ...styles.primary, borderColor: template.colors.accent }}>
              Professional Experience
            </h2>
            <div className="space-y-4 md:space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="text-lg md:text-xl font-semibold" style={styles.text}>{exp.jobTitle}</h3>
                    <span className="font-medium text-sm md:text-base" style={styles.secondary}>
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="text-base md:text-lg font-medium mb-1" style={styles.primary}>
                    {exp.company}
                    {exp.location && <span style={styles.text}> • {exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="mt-2 md:mt-3 text-sm md:text-base" style={styles.text}>
                      {exp.description.split('\n').map((line, index) => (
                        <div key={index} className="mb-1">
                          {line.trim().startsWith('•') ? line : `• ${line}`}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderCreativeLayout = () => (
    <div style={styles.background} className="min-h-screen">
      {/* Creative Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0" style={styles.gradient}></div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 p-6 md:p-12 text-white">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {resumeData.personalInfo.photo && (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform rotate-3">
                <img 
                  src={resumeData.personalInfo.photo} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                {resumeData.personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-sm md:text-lg opacity-90">
                {resumeData.personalInfo.email && <span className="break-all">{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && resumeData.personalInfo.email && <span className="hidden sm:inline">•</span>}
                {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.location && (resumeData.personalInfo.email || resumeData.personalInfo.phone) && <span className="hidden sm:inline">•</span>}
                {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
              </div>
              {(resumeData.personalInfo.linkedin || resumeData.personalInfo.website) && (
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-2 md:gap-4 mt-3 md:mt-4">
                  {resumeData.personalInfo.linkedin && (
                    <a href={resumeData.personalInfo.linkedin} className="hover:underline opacity-90 break-all text-sm md:text-base">
                      LinkedIn
                    </a>
                  )}
                  {resumeData.personalInfo.website && (
                    <a href={resumeData.personalInfo.website} className="hover:underline opacity-90 break-all text-sm md:text-base">
                      Portfolio
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-8 md:mb-12 p-4 md:p-8 rounded-2xl shadow-lg" style={styles.light}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6" style={styles.primary}>
              Creative Vision
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={styles.text}>
              {resumeData.summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" style={styles.primary}>
                Experience Journey
              </h2>
              <div className="space-y-6 md:space-y-8">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div 
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg flex-shrink-0"
                        style={styles.accentBg}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 p-4 md:p-6 rounded-xl shadow-lg" style={styles.light}>
                        <h3 className="text-lg md:text-xl font-bold mb-2" style={styles.text}>{exp.jobTitle}</h3>
                        <div className="text-base md:text-lg font-semibold mb-2" style={styles.primary}>
                          {exp.company}
                        </div>
                        <div className="text-xs md:text-sm mb-2 md:mb-3" style={styles.secondary}>
                          {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                          {exp.location && ` • ${exp.location}`}
                        </div>
                        {exp.description && (
                          <div style={styles.text} className="text-sm md:text-base">
                            {exp.description.split('\n').map((line, index) => (
                              <div key={index} className="mb-1">
                                {line.trim().startsWith('•') ? line : `• ${line}`}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sidebar */}
          <div className="space-y-6 md:space-y-8">
            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <section className="p-4 md:p-6 rounded-xl shadow-lg" style={styles.light}>
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={styles.primary}>
                  Skills Palette
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="p-2 md:p-3 rounded-lg border-l-4" style={{ borderColor: template.colors.accent, backgroundColor: template.colors.background }}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm md:text-base" style={styles.text}>{skill.name}</span>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                          style={styles.accentBg}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <section className="p-4 md:p-6 rounded-xl shadow-lg" style={styles.light}>
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={styles.primary}>
                  Education
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: template.colors.background }}>
                      <h3 className="font-bold text-sm md:text-base" style={styles.text}>{edu.degree}</h3>
                      <div className="font-semibold text-sm md:text-base" style={styles.primary}>{edu.school}</div>
                      <div className="text-xs md:text-sm" style={styles.secondary}>
                        {formatDate(edu.graduationDate)}
                        {edu.location && ` • ${edu.location}`}
                      </div>
                      {edu.gpa && <div className="text-xs md:text-sm" style={styles.text}>GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTraditionalLayout = () => (
    <div className="p-4 md:p-8 print:p-0 print:shadow-none" style={styles.background}>
      {/* Header */}
      <header className="text-center pb-6 md:pb-8 mb-6 md:mb-8" style={{ borderBottom: `3px solid ${template.colors.primary}` }}>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
          {resumeData.personalInfo.photo && (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <img 
                src={resumeData.personalInfo.photo} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={styles.text}>
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start items-center gap-2 md:gap-4 text-sm md:text-base text-gray-600">
              {resumeData.personalInfo.email && (
                <span style={styles.text} className="break-all">{resumeData.personalInfo.email}</span>
              )}
              {resumeData.personalInfo.phone && (
                <>
                  {resumeData.personalInfo.email && <span style={styles.accent} className="hidden sm:inline">•</span>}
                  <span style={styles.text}>{resumeData.personalInfo.phone}</span>
                </>
              )}
              {resumeData.personalInfo.location && (
                <>
                  {(resumeData.personalInfo.email || resumeData.personalInfo.phone) && <span style={styles.accent} className="hidden sm:inline">•</span>}
                  <span style={styles.text}>{resumeData.personalInfo.location}</span>
                </>
              )}
            </div>
            {(resumeData.personalInfo.linkedin || resumeData.personalInfo.website) && (
              <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-2 md:gap-4 mt-2">
                {resumeData.personalInfo.linkedin && (
                  <a 
                    href={resumeData.personalInfo.linkedin} 
                    className="hover:underline break-all text-sm md:text-base"
                    style={styles.primary}
                  >
                    LinkedIn
                  </a>
                )}
                {resumeData.personalInfo.website && (
                  <a 
                    href={resumeData.personalInfo.website} 
                    className="hover:underline break-all text-sm md:text-base"
                    style={styles.primary}
                  >
                    Portfolio
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {resumeData.summary && (
        <section className="mb-6 md:mb-8">
          <h2 
            className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2"
            style={{ ...styles.primary, borderBottom: `2px solid ${template.colors.accent}` }}
          >
            Professional Summary
          </h2>
          <p className="leading-relaxed text-sm md:text-base" style={styles.text}>
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-6 md:mb-8">
          <h2 
            className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2"
            style={{ ...styles.primary, borderBottom: `2px solid ${template.colors.accent}` }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4 md:space-y-6">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-lg md:text-xl font-semibold" style={styles.text}>
                    {exp.jobTitle}
                  </h3>
                  <span className="font-medium text-sm md:text-base" style={styles.secondary}>
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-base md:text-lg font-medium mb-1" style={styles.primary}>
                  {exp.company}
                  {exp.location && <span style={styles.text}> • {exp.location}</span>}
                </div>
                {exp.description && (
                  <div className="mt-2 md:mt-3 text-sm md:text-base" style={styles.text}>
                    {exp.description.split('\n').map((line, index) => (
                      <div key={index} className="mb-1">
                        {line.trim().startsWith('•') ? line : `• ${line}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-6 md:mb-8">
          <h2 
            className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2"
            style={{ ...styles.primary, borderBottom: `2px solid ${template.colors.accent}` }}
          >
            Education
          </h2>
          <div className="space-y-3 md:space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <h3 className="text-base md:text-lg font-semibold" style={styles.text}>
                    {edu.degree}
                  </h3>
                  <span className="font-medium text-sm md:text-base" style={styles.secondary}>
                    {formatDate(edu.graduationDate)}
                  </span>
                </div>
                <div className="font-medium text-sm md:text-base" style={styles.primary}>
                  {edu.school}
                  {edu.location && <span style={styles.text}> • {edu.location}</span>}
                </div>
                {edu.gpa && (
                  <div style={styles.text} className="text-sm md:text-base">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-6 md:mb-8">
          <h2 
            className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2"
            style={{ ...styles.primary, borderBottom: `2px solid ${template.colors.accent}` }}
          >
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center">
                <span className="font-medium text-sm md:text-base" style={styles.text}>{skill.name}</span>
                <span 
                  className="text-xs md:text-sm px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: template.colors.accent + '20', 
                    color: template.colors.primary 
                  }}
                >
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderLayout = () => {
    switch (template.layout) {
      case 'executive':
        return renderExecutiveLayout();
      case 'sidebar':
        return renderSidebarLayout();
      case 'creative':
        return renderCreativeLayout();
      case 'modern':
      case 'traditional':
      default:
        return renderTraditionalLayout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Mobile Responsive */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm md:text-base"
              >
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                <span>Back to Editor</span>
              </button>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">Resume Preview</h1>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                <div 
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={styles.primaryBg}
                />
                <span className="hidden sm:inline">{template.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm md:text-base w-full sm:w-auto"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Container - Mobile Responsive */}
      <div className="container mx-auto px-2 md:px-6 py-4 md:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            {/* Resume Content */}
            <div ref={resumeRef} className="print:shadow-none">
              {renderLayout()}
            </div>
          </div>

          {/* Action Button - Mobile Responsive */}
          <div className="text-center mt-6 md:mt-8 px-4">
            <button
              onClick={handlePrint}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 mx-auto w-full sm:w-auto max-w-sm"
            >
              <Download className="h-4 w-4 md:h-5 md:w-5" />
              <span>Download Your Resume</span>
            </button>
            <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base px-2">
              Your professional resume is ready! Click download to save as PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;