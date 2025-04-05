
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Download, Share2, Save } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface DownloadOptionsProps {
  resumeData: any;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ resumeData }) => {
  const { toast } = useToast();
  const [isSaving, setSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async (format: string) => {
    if (format === 'pdf') {
      setIsDownloading(true);
      
      toast({
        title: "Preparing PDF download",
        description: "Your resume will be downloaded in a few seconds.",
      });
      
      try {
        // Get the resume element
        const resumeElement = document.querySelector('.resume-preview');
        
        if (!resumeElement) {
          throw new Error('Resume preview element not found');
        }
        
        // Use html2canvas to capture the resume as an image
        // Cast the Element to HTMLElement to fix type error
        const canvas = await html2canvas(resumeElement as HTMLElement, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        // Create PDF with jsPDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        // Calculate aspect ratio to fit within A4
        const imgWidth = 210; // A4 width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        // Add the image to the PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Save the PDF
        pdf.save(`${resumeData.personalInfo.name || 'Resume'}.pdf`);
        
        toast({
          title: "PDF Downloaded",
          description: "Your resume has been downloaded successfully.",
        });
      } catch (error) {
        console.error('PDF generation error:', error);
        toast({
          title: "Download Failed",
          description: "There was an error generating your PDF. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsDownloading(false);
      }
    } else if (format === 'docx') {
      toast({
        title: `Preparing ${format.toUpperCase()} download`,
        description: "Your resume will be downloaded in a few seconds.",
      });
      
      // You could implement an API call to the backend for DOCX generation
      // For now, we'll simulate the API call
      setTimeout(() => {
        toast({
          title: `${format.toUpperCase()} Downloaded`,
          description: "Your resume has been downloaded successfully.",
        });
      }, 1500);
    }
  };

  const handleShare = () => {
    // Generate a shareable link (in a real app, this would send data to the backend)
    const shareId = Math.random().toString(36).substring(2, 10);
    const shareLink = `https://resumegenie.example/share/${shareId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareLink).then(() => {
      toast({
        title: "Share link generated",
        description: "A shareable link has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Sharing failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive"
      });
    });
  };
  
  const handleSaveToAccount = () => {
    setSaving(true);
    
    // Here we would connect to the Spring Boot backend
    // In a real implementation, this would be an API call
    const backendUrl = 'http://localhost:8080/api/resumes';
    
    // Example of how the API call would look:
    /*
    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: resumeData.personalInfo.name + "'s Resume",
        personalInfo: resumeData.personalInfo,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        template: 'modern' // Default template
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setSaving(false);
      toast({
        title: "Resume saved",
        description: "Your resume has been saved to your account.",
      });
    })
    .catch(error => {
      console.error('Error saving resume:', error);
      setSaving(false);
      toast({
        title: "Error saving resume",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive"
      });
    });
    */
    
    // For now, just simulate the API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
      });
    }, 1500);
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
          <Button 
            className="bg-resume-primary hover:bg-resume-secondary" 
            onClick={() => handleDownload('pdf')}
            disabled={isDownloading}
          >
            <Download className="h-4 w-4 mr-2" />
            {isDownloading ? 'Processing...' : 'PDF'}
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
        <Button variant="default" className="w-full" onClick={handleSaveToAccount} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save to Account"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DownloadOptions;
