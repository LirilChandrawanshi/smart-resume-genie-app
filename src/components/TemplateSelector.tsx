
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2 } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    color: 'bg-blue-500'
  },
  {
    id: 'classic',
    name: 'Classic',
    color: 'bg-gray-700'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    color: 'bg-indigo-500'
  },
  {
    id: 'creative',
    name: 'Creative',
    color: 'bg-purple-500'
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Choose Template</h3>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                selectedTemplate === template.id ? 'border-resume-primary' : 'border-transparent'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex flex-col h-28">
                <div className={`${template.color} h-8`}></div>
                <div className="bg-white p-2 flex-1">
                  <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded mb-3"></div>
                  <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
                  <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
                  <div className="w-2/3 h-1 bg-gray-100 rounded"></div>
                </div>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-1 right-1">
                  <CheckCircle2 className="h-5 w-5 text-resume-primary" />
                </div>
              )}
              <div className="text-center text-xs py-1 bg-gray-50 border-t">
                {template.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
