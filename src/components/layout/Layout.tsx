import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { trackPageView } from "@/lib/supabase";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    const trackView = async () => {
      try {
        await trackPageView(location.pathname, {
          page_title: document.title,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        // Silently fail - don't break the app for analytics
        console.warn('Analytics tracking failed:', error);
      }
    };

    // Small delay to ensure page has loaded
    const timer = setTimeout(trackView, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Update page title based on route
  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case '/': return 'AgenticAI - Transform Your Business with Intelligent Automation';
        case '/about': return 'About Us - AgenticAI';
        case '/services': return 'Our Services - AgenticAI';
        case '/what-is-agentic': return 'What is Agentic AI? - AgenticAI';
        case '/use-cases': return 'Use Cases & Success Stories - AgenticAI';
        case '/blog': return 'Blog & Insights - AgenticAI';
        case '/contact': return 'Contact Us - AgenticAI';
        case '/resources': return 'Resources & Downloads - AgenticAI';
        case '/get-started': return 'Get Started - AgenticAI';
        case '/schedule-demo': return 'Schedule Demo - AgenticAI';
        case '/watch-demo': return 'Watch Demo - AgenticAI';
        default: 
          // Try to create a nice title from the path
          const segments = location.pathname.split('/').filter(Boolean);
          const lastSegment = segments[segments.length - 1];
          const title = lastSegment
            ? lastSegment.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')
            : 'Page';
          return `${title} - AgenticAI`;
      }
    };

    document.title = getPageTitle();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;