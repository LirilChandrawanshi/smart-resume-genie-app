
import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-resume-primary p-1 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 8H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 11H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 15H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 15H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold">ResumeGenie</h1>
          </div>
          <nav className="flex items-center gap-4">
            {!isMobile && (
              <>
                <Button variant="ghost" size="sm">Templates</Button>
                <Button variant="ghost" size="sm">Pricing</Button>
                <Button variant="ghost" size="sm">About</Button>
              </>
            )}
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
              <SunIcon className="h-4 w-4" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 ResumeGenie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
