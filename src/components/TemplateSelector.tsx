import React, { useState } from 'react';
import { Check, Palette, Briefcase, Sparkles, Minimize2, Crown } from 'lucide-react';
import { ResumeTemplate } from '../types/resume';
import { resumeTemplates, getTemplatesByCategory } from '../data/templates';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onTemplateSelect 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Templates', icon: Palette },
    { id: 'executive', label: 'Executive', icon: Crown },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'modern', label: 'Modern', icon: Sparkles },
    { id: 'creative', label: 'Creative', icon: Palette },
    { id: 'minimal', label: 'Minimal', icon: Minimize2 }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? resumeTemplates 
    : getTemplatesByCategory(activeCategory);

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    const IconComponent = categoryData?.icon || Palette;
    return <IconComponent className="h-4 w-4" />;
  };

  const renderTemplatePreview = (template: ResumeTemplate) => {
    const isExecutive = template.layout === 'executive';
    const isSidebar = template.layout === 'sidebar';
    const isCreative = template.layout === 'creative';

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-64">
        {/* Template Layout Preview */}
        {isExecutive ? (
          // Executive Layout
          <div className="h-full flex flex-col">
            <div 
              className="h-16 flex items-center justify-center"
              style={{ backgroundColor: template.colors.primary }}
            >
              <div className="w-8 h-8 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="h-3 bg-gray-800 rounded w-3/4 mx-auto" />
              <div className="h-2 bg-gray-400 rounded w-1/2 mx-auto" />
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="space-y-1">
                  <div className="h-2 rounded w-full" style={{ backgroundColor: template.colors.accent }} />
                  <div className="h-1 bg-gray-300 rounded" />
                  <div className="h-1 bg-gray-300 rounded w-4/5" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded w-full" style={{ backgroundColor: template.colors.accent }} />
                  <div className="h-1 bg-gray-300 rounded" />
                  <div className="h-1 bg-gray-300 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        ) : isSidebar ? (
          // Sidebar Layout
          <div className="h-full flex">
            <div 
              className="w-1/3 p-2 space-y-2"
              style={{ backgroundColor: template.colors.light }}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 mx-auto" />
              <div className="h-2 bg-gray-400 rounded" />
              <div className="space-y-1">
                <div className="h-1.5 rounded" style={{ backgroundColor: template.colors.primary }} />
                <div className="h-1 bg-gray-300 rounded" />
                <div className="h-1 bg-gray-300 rounded w-4/5" />
              </div>
            </div>
            <div className="flex-1 p-2 space-y-2">
              <div className="h-3 bg-gray-800 rounded w-3/4" />
              <div className="h-2 bg-gray-400 rounded w-1/2" />
              <div className="space-y-1">
                <div className="h-2 rounded w-2/3" style={{ backgroundColor: template.colors.primary }} />
                <div className="h-1 bg-gray-300 rounded" />
                <div className="h-1 bg-gray-300 rounded w-5/6" />
              </div>
            </div>
          </div>
        ) : isCreative ? (
          // Creative Layout
          <div className="h-full">
            <div 
              className="h-12 relative"
              style={{ 
                background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.accent})` 
              }}
            >
              <div className="absolute bottom-0 right-4 w-6 h-6 rounded-full bg-white/30" />
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-300" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
              <div className="h-2 bg-gray-400 rounded w-2/3" />
              <div className="grid grid-cols-3 gap-1 mt-3">
                <div className="h-1.5 rounded" style={{ backgroundColor: template.colors.accent }} />
                <div className="h-1.5 rounded" style={{ backgroundColor: template.colors.accent }} />
                <div className="h-1.5 rounded" style={{ backgroundColor: template.colors.accent }} />
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded" />
                <div className="h-1 bg-gray-300 rounded w-4/5" />
              </div>
            </div>
          </div>
        ) : (
          // Traditional/Modern Layout
          <div className="h-full p-3 space-y-2">
            <div 
              className="h-3 border-b-2"
              style={{ borderColor: template.colors.primary }}
            />
            <div className="space-y-1">
              <div className="h-3 bg-gray-800 rounded w-3/4" />
              <div className="h-2 bg-gray-400 rounded w-1/2" />
            </div>
            <div className="flex space-x-2">
              <div className="h-1.5 bg-gray-300 rounded flex-1" />
              <div className="h-1.5 bg-gray-300 rounded flex-1" />
            </div>
            <div className="space-y-1">
              <div 
                className="h-2 rounded w-1/3"
                style={{ backgroundColor: template.colors.primary }}
              />
              <div className="h-1.5 bg-gray-300 rounded" />
              <div className="h-1.5 bg-gray-300 rounded w-4/5" />
            </div>
            <div className="space-y-1">
              <div 
                className="h-2 rounded w-2/5"
                style={{ backgroundColor: template.colors.primary }}
              />
              <div className="h-1.5 bg-gray-400 rounded w-3/4" />
              <div className="h-1 bg-gray-300 rounded" />
              <div className="h-1 bg-gray-300 rounded w-5/6" />
            </div>
            <div className="flex space-x-1">
              <div 
                className="h-1.5 rounded flex-1"
                style={{ backgroundColor: template.colors.accent }}
              />
              <div 
                className="h-1.5 rounded flex-1"
                style={{ backgroundColor: template.colors.accent }}
              />
              <div 
                className="h-1.5 rounded flex-1"
                style={{ backgroundColor: template.colors.accent }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a professional template that matches your style and industry</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`relative cursor-pointer group transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'ring-2 ring-blue-600 ring-offset-2 scale-105'
                : 'hover:shadow-xl hover:scale-105'
            }`}
          >
            {/* Template Preview */}
            {renderTemplatePreview(template)}
            
            {/* Template Info */}
            <div className="mt-4 text-center">
              <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              
              {/* Category and Color Indicators */}
              <div className="flex items-center justify-center mt-3 space-x-3">
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  {getCategoryIcon(template.category)}
                  <span className="capitalize">{template.category}</span>
                </span>
                
                <div className="flex space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.primary }}
                    title="Primary Color"
                  />
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.accent }}
                    title="Accent Color"
                  />
                </div>
              </div>
            </div>
            
            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                <Check className="h-4 w-4" />
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-200 rounded-lg" />
          </div>
        ))}
      </div>
      
      {/* Template Count */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} 
        {activeCategory !== 'all' && ` in ${activeCategory} category`}
      </div>
    </div>
  );
};

export default TemplateSelector;