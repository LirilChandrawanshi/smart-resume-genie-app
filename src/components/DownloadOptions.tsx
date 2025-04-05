
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Download, Share2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface DownloadOptionsProps {
  resumeData: any;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ resumeData }) => {
  const { toast } = useToast();
  
  const handleDownload = (format: string) => {
    toast({
      title: `Preparing ${format.toUpperCase()} download`,
      description: "Your resume will be downloaded in a few seconds.",
    });
    
    // In a real implementation, this would call an API to generate the file
    setTimeout(() => {
      toast({
        title: `${format.toUpperCase()} Downloaded`,
        description: "Your resume has been downloaded successfully.",
      });
    }, 1500);
  };

  const handleShare = () => {
    toast({
      title: "Share link generated",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Export Resume</span>
        </CardTitle>
        <CardDescription>Download your resume in different formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-resume-primary hover:bg-resume-secondary" onClick={() => handleDownload('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => handleDownload('docx')}>
            <Download className="h-4 w-4 mr-2" />
            DOCX
          </Button>
        </div>
        <Button variant="secondary" className="w-full" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share Link
        </Button>
      </CardContent>
    </Card>
  );
};

export default DownloadOptions;
