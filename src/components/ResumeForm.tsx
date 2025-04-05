
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { PlusCircle, Trash2, BriefcaseIcon, GraduationCapIcon, AwardIcon, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-4 py-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

interface ResumeFormProps {
  onUpdateResume: (data: any) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onUpdateResume }) => {
  const [resumeData, setResumeData] = useState({
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
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value
      }
    });
    onUpdateResume({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value
      }
    });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    const updatedData = {
      ...resumeData,
      experience: updatedExperience
    };
    
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    const updatedData = {
      ...resumeData,
      education: updatedEducation
    };
    
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    
    const updatedData = {
      ...resumeData,
      skills: updatedSkills
    };
    
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const addExperience = () => {
    const updatedData = {
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { 
          id: `exp-${Date.now()}`, 
          title: '', 
          company: '', 
          location: '', 
          startDate: '', 
          endDate: '', 
          description: '' 
        }
      ]
    };
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const addEducation = () => {
    const updatedData = {
      ...resumeData,
      education: [
        ...resumeData.education,
        { 
          id: `edu-${Date.now()}`, 
          degree: '', 
          school: '', 
          location: '', 
          startDate: '', 
          endDate: '', 
          description: '' 
        }
      ]
    };
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const addSkill = () => {
    const updatedData = {
      ...resumeData,
      skills: [
        ...resumeData.skills,
        { id: `skill-${Date.now()}`, name: '', level: '50' }
      ]
    };
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const removeExperience = (index: number) => {
    if (resumeData.experience.length === 1) return;
    
    const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
    const updatedData = {
      ...resumeData,
      experience: updatedExperience
    };
    
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const removeEducation = (index: number) => {
    if (resumeData.education.length === 1) return;
    
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    const updatedData = {
      ...resumeData,
      education: updatedEducation
    };
    
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  const removeSkill = (index: number) => {
    if (resumeData.skills.length === 1) return;
    
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    const updatedData = {
      ...resumeData,
      skills: updatedSkills
    };
    
    setResumeData(updatedData);
    onUpdateResume(updatedData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resume Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCapIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <AwardIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4 animate-fade-in">
            <FormSection title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    value={resumeData.personalInfo.name}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="Senior Software Engineer" 
                    value={resumeData.personalInfo.title}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="johndoe@example.com" 
                    value={resumeData.personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="(123) 456-7890" 
                    value={resumeData.personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    placeholder="New York, NY" 
                    value={resumeData.personalInfo.location}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea 
                    id="summary" 
                    name="summary" 
                    placeholder="Write a short professional summary..." 
                    rows={4}
                    value={resumeData.personalInfo.summary}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
            </FormSection>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-6 animate-fade-in">
            <FormSection title="Work Experience">
              {resumeData.experience.map((exp, index) => (
                <Card key={exp.id} className="relative">
                  <CardContent className="pt-6">
                    {resumeData.experience.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2" 
                        onClick={() => removeExperience(index)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
                        <Input 
                          id={`exp-title-${index}`} 
                          placeholder="Software Engineer" 
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-company-${index}`}>Company</Label>
                        <Input 
                          id={`exp-company-${index}`} 
                          placeholder="Acme Inc." 
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-location-${index}`}>Location</Label>
                        <Input 
                          id={`exp-location-${index}`} 
                          placeholder="San Francisco, CA" 
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                          <Input 
                            id={`exp-start-${index}`} 
                            placeholder="Jan 2020" 
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                          <Input 
                            id={`exp-end-${index}`} 
                            placeholder="Present" 
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`exp-desc-${index}`}>Description</Label>
                        <Textarea 
                          id={`exp-desc-${index}`} 
                          placeholder="Describe your responsibilities and achievements..." 
                          rows={3}
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" onClick={addExperience}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </FormSection>
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6 animate-fade-in">
            <FormSection title="Education">
              {resumeData.education.map((edu, index) => (
                <Card key={edu.id} className="relative">
                  <CardContent className="pt-6">
                    {resumeData.education.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2" 
                        onClick={() => removeEducation(index)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                        <Input 
                          id={`edu-degree-${index}`} 
                          placeholder="Bachelor of Science in Computer Science" 
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-school-${index}`}>School</Label>
                        <Input 
                          id={`edu-school-${index}`} 
                          placeholder="Stanford University" 
                          value={edu.school}
                          onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-location-${index}`}>Location</Label>
                        <Input 
                          id={`edu-location-${index}`} 
                          placeholder="Stanford, CA" 
                          value={edu.location}
                          onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                          <Input 
                            id={`edu-start-${index}`} 
                            placeholder="Sep 2016" 
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                          <Input 
                            id={`edu-end-${index}`} 
                            placeholder="May 2020" 
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`edu-desc-${index}`}>Description</Label>
                        <Textarea 
                          id={`edu-desc-${index}`} 
                          placeholder="Relevant coursework, achievements, activities..." 
                          rows={3}
                          value={edu.description}
                          onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" onClick={addEducation}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </FormSection>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-6 animate-fade-in">
            <FormSection title="Skills">
              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={skill.id} className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input 
                        placeholder="Skill (e.g., JavaScript)" 
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                      />
                    </div>
                    {resumeData.skills.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={addSkill}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </FormSection>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
