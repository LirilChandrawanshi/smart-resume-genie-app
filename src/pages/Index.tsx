
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import AiSuggestions from '@/components/AiSuggestions';
import DownloadOptions from '@/components/DownloadOptions';
import TemplateSelector from '@/components/TemplateSelector';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showPreview, setShowPreview] = useState(!isMobile);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  
  const initialResumeData = {
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [
      { id: '1', title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
    ],
    education: [
      { id: '1', degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }
    ],
    skills: [
      { id: '1', name: '', level: '80' }
    ]
  };
  
  const [resumeData, setResumeData] = useState(initialResumeData);

  const handleUpdateResume = (data: any) => {
    setResumeData(data);
  };

  const handleApplySuggestion = (field: string, value: string) => {
    if (field === 'summary') {
      setResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: value
        }
      });
    } else if (field === 'newSkill') {
      setResumeData({
        ...resumeData,
        skills: [
          ...resumeData.skills,
          { id: `skill-${Date.now()}`, name: value, level: '80' }
        ]
      });
    } else if (field.startsWith('experience-')) {
      const parts = field.split('-');
      const expIndex = parseInt(parts[1]);
      
      const updatedExperience = [...resumeData.experience];
      if (parts[2] === 'description') {
        updatedExperience[expIndex] = {
          ...updatedExperience[expIndex],
          description: value
        };
      }
      
      setResumeData({
        ...resumeData,
        experience: updatedExperience
      });
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-resume-accent rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-resume-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Smart Resume Builder</h1>
          <p className="text-muted-foreground max-w-xl">
            Create a professional resume in minutes with our AI-powered resume builder. Get tailored suggestions to help your resume stand out.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Form & Tools */}
          <div className={`w-full ${showPreview ? 'lg:w-1/2' : 'lg:w-2/3'} space-y-6 animate-fade-in`}>
            <div className="flex justify-end mb-2 lg:hidden">
              <Button variant="outline" size="sm" onClick={togglePreview} className="flex items-center gap-1">
                {showPreview ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span>Hide Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span>Show Preview</span>
                  </>
                )}
              </Button>
            </div>
            
            <ResumeForm onUpdateResume={handleUpdateResume} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AiSuggestions resumeData={resumeData} onApplySuggestion={handleApplySuggestion} />
              <div className="space-y-6">
                <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
                <DownloadOptions resumeData={resumeData} />
              </div>
            </div>
          </div>
          
          {/* Right Column: Preview */}
          {(showPreview || !isMobile) && (
            <div className={`w-full ${showPreview ? 'lg:w-1/2' : 'lg:w-1/3'} animate-fade-in`}>
              <div className="sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Resume Preview</h2>
                  <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-1" onClick={togglePreview}>
                    {showPreview ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        <span className="hidden md:inline">Hide Preview</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        <span className="hidden md:inline">Expand Preview</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
