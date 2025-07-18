import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Globe, 
  Edit, 
  Save, 
  Search, 
  Eye,
  Settings,
  FileText,
  Image,
  Link,
  Tag,
  TrendingUp,
  Users,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface PageSection {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'image' | 'link' | 'list';
  value: string | string[];
  label: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
}

interface Page {
  id: string;
  name: string;
  slug: string;
  title: string;
  metaDescription: string;
  lastModified: string;
  status: 'live' | 'draft' | 'needs-review';
  views: number;
  sections: PageSection[];
  seoScore: number;
  mobileOptimized: boolean;
  loadTime: number;
}

const PagesManagement = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Initialize with sample pages
  useEffect(() => {
    const samplePages: Page[] = [
      {
        id: '1',
        name: 'Homepage',
        slug: '/',
        title: 'AgenticAI - Transform Your Business with Intelligent Automation',
        metaDescription: 'Deploy intelligent AI agents that work autonomously to achieve your business goals. Enterprise-grade automation solutions.',
        lastModified: '2024-01-15T10:30:00Z',
        status: 'live',
        views: 15420,
        seoScore: 92,
        mobileOptimized: true,
        loadTime: 1.2,
        sections: [
          {
            id: 'hero-title',
            name: 'hero-title',
            type: 'text',
            value: 'Transform Your Business with Agentic AI',
            label: 'Hero Title',
            placeholder: 'Enter compelling headline',
            maxLength: 100,
            required: true
          },
          {
            id: 'hero-subtitle',
            name: 'hero-subtitle',
            type: 'textarea',
            value: 'Deploy intelligent AI agents that work autonomously to achieve your business goals. No manual oversight required—just results.',
            label: 'Hero Subtitle',
            placeholder: 'Supporting text that explains your value proposition',
            maxLength: 300
          },
          {
            id: 'hero-cta-primary',
            name: 'hero-cta-primary',
            type: 'text',
            value: 'Get Started Today',
            label: 'Primary CTA Button Text',
            maxLength: 30
          },
          {
            id: 'hero-cta-secondary',
            name: 'hero-cta-secondary',
            type: 'text',
            value: 'Watch Demo',
            label: 'Secondary CTA Button Text',
            maxLength: 30
          },
          {
            id: 'trust-indicators',
            name: 'trust-indicators',
            type: 'list',
            value: ['Deploy in 48 hours', 'Enterprise-grade security', '24/7 support'],
            label: 'Trust Indicators',
            placeholder: 'Add trust building elements'
          }
        ]
      },
      {
        id: '2',
        name: 'About Us',
        slug: '/about',
        title: 'About AgenticAI - Leading AI Automation Experts',
        metaDescription: 'Learn about our mission to democratize AI automation and help businesses achieve unprecedented efficiency with intelligent agents.',
        lastModified: '2024-01-12T14:22:00Z',
        status: 'live',
        views: 3240,
        seoScore: 88,
        mobileOptimized: true,
        loadTime: 0.9,
        sections: [
          {
            id: 'about-intro',
            name: 'about-intro',
            type: 'textarea',
            value: 'We are pioneers in agentic AI technology, helping businesses transform their operations through intelligent automation that thinks, learns, and acts autonomously.',
            label: 'Introduction Paragraph',
            maxLength: 500
          },
          {
            id: 'mission-statement',
            name: 'mission-statement',
            type: 'textarea',
            value: 'Our mission is to democratize AI automation and help businesses of all sizes achieve unprecedented efficiency through intelligent agent technology.',
            label: 'Mission Statement',
            maxLength: 300
          },
          {
            id: 'team-size',
            name: 'team-size',
            type: 'text',
            value: '50+ AI specialists',
            label: 'Team Size',
            maxLength: 50
          }
        ]
      },
      {
        id: '3',
        name: 'Services Overview',
        slug: '/services',
        title: 'AI Automation Services - Enterprise Solutions',
        metaDescription: 'Comprehensive AI automation services including workflow automation, chatbots, LLM integration, and cloud deployment solutions.',
        lastModified: '2024-01-10T09:15:00Z',
        status: 'needs-review',
        views: 8930,
        seoScore: 85,
        mobileOptimized: false,
        loadTime: 1.8,
        sections: [
          {
            id: 'services-intro',
            name: 'services-intro',
            type: 'textarea',
            value: 'From strategy to implementation, we provide end-to-end agentic AI services that transform how your business operates.',
            label: 'Services Introduction',
            maxLength: 300
          },
          {
            id: 'consultation-cta',
            name: 'consultation-cta',
            type: 'text',
            value: 'Schedule Consultation',
            label: 'Consultation CTA Text',
            maxLength: 30
          }
        ]
      },
      {
        id: '4',
        name: 'Contact Us',
        slug: '/contact',
        title: 'Contact AgenticAI - Get Started Today',
        metaDescription: 'Ready to transform your business with AI automation? Contact our experts for a personalized consultation and implementation strategy.',
        lastModified: '2024-01-08T16:45:00Z',
        status: 'draft',
        views: 1240,
        seoScore: 76,
        mobileOptimized: true,
        loadTime: 1.1,
        sections: [
          {
            id: 'contact-heading',
            name: 'contact-heading',
            type: 'text',
            value: 'Ready to Get Started?',
            label: 'Contact Page Heading',
            maxLength: 80
          },
          {
            id: 'contact-description',
            name: 'contact-description',
            type: 'textarea',
            value: 'Join hundreds of companies already transforming their operations with our AI agents.',
            label: 'Contact Description',
            maxLength: 200
          },
          {
            id: 'office-address',
            name: 'office-address',
            type: 'textarea',
            value: 'Turnbridge Wells, Kent, UK',
            label: 'Office Address',
            maxLength: 150
          },
          {
            id: 'contact-email',
            name: 'contact-email',
            type: 'text',
            value: 'info@agentic-ai.ltd',
            label: 'Contact Email',
            maxLength: 50
          },
          {
            id: 'phone-number',
            name: 'phone-number',
            type: 'text',
            value: '07771970567',
            label: 'Phone Number',
            maxLength: 20
          }
        ]
      }
    ];
    setPages(samplePages);
    setSelectedPage(samplePages[0]);
  }, []);

  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveChanges = () => {
    if (!selectedPage) return;

    setPages(pages.map(p => 
      p.id === selectedPage.id 
        ? { ...selectedPage, lastModified: new Date().toISOString(), status: 'needs-review' as const }
        : p
    ));

    toast({
      title: "Changes Saved! ✨",
      description: `"${selectedPage.name}" has been updated successfully.`,
    });

    setIsEditing(false);
  };

  const handlePublishPage = (pageId: string) => {
    setPages(pages.map(p => 
      p.id === pageId 
        ? { ...p, status: 'live' as const, lastModified: new Date().toISOString() }
        : p
    ));

    const page = pages.find(p => p.id === pageId);
    toast({
      title: "Page Published! 🚀",
      description: `"${page?.name}" is now live on your website.`,
    });
  };

  const updateSectionValue = (sectionId: string, value: string | string[]) => {
    if (!selectedPage) return;

    setSelectedPage({
      ...selectedPage,
      sections: selectedPage.sections.map(section =>
        section.id === sectionId ? { ...section, value } : section
      )
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'needs-review': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDeviceIcon = (mode: string) => {
    switch (mode) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
  };

  const totalViews = pages.reduce((sum, page) => sum + page.views, 0);
  const livePages = pages.filter(p => p.status === 'live').length;
  const avgSeoScore = Math.round(pages.reduce((sum, page) => sum + page.seoScore, 0) / pages.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Page Content Management</h2>
          <p className="text-muted-foreground">Edit page content, SEO settings, and manage site copy</p>
        </div>
        <div className="flex space-x-2">
          {selectedPage && selectedPage.status !== 'live' && (
            <Button 
              variant="outline" 
              onClick={() => handlePublishPage(selectedPage.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Publish Page
            </Button>
          )}
          {isEditing && (
            <Button onClick={handleSaveChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Pages</p>
                <p className="text-xl font-bold">{pages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Live Pages</p>
                <p className="text-xl font-bold">{livePages}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg SEO Score</p>
                <p className={`text-xl font-bold ${getSeoScoreColor(avgSeoScore)}`}>{avgSeoScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Site Pages
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    onClick={() => {
                      setSelectedPage(page);
                      setIsEditing(false);
                    }}
                    className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 border-l-4 ${
                      selectedPage?.id === page.id 
                        ? 'bg-muted border-l-primary' 
                        : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{page.name}</h4>
                      <Badge className={`text-xs ${getStatusColor(page.status)}`}>
                        {page.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{page.slug}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{page.views.toLocaleString()} views</span>
                      <span className={getSeoScoreColor(page.seoScore)}>
                        SEO: {page.seoScore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Page Editor */}
        <div className="lg:col-span-3">
          {selectedPage ? (
            <div className="space-y-6">
              {/* Page Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Edit className="w-5 h-5 mr-2" />
                        {selectedPage.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedPage.slug} • Last modified: {new Date(selectedPage.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(selectedPage.status)}>
                        {selectedPage.status}
                      </Badge>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Editing' : 'Edit Page'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Page Meta Information */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO & Meta Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="page-title">Page Title</Label>
                    <Input
                      id="page-title"
                      value={selectedPage.title}
                      onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter page title..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedPage.title.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={selectedPage.metaDescription}
                      onChange={(e) => setSelectedPage({ ...selectedPage, metaDescription: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter meta description..."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedPage.metaDescription.length}/160 characters
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${selectedPage.seoScore >= 90 ? 'bg-green-500' : selectedPage.seoScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm">SEO Score: {selectedPage.seoScore}/100</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${selectedPage.mobileOptimized ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm">Mobile: {selectedPage.mobileOptimized ? 'Optimized' : 'Needs Work'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${selectedPage.loadTime <= 1.5 ? 'bg-green-500' : selectedPage.loadTime <= 2.5 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm">Load: {selectedPage.loadTime}s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Page Content Sections */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Page Content</CardTitle>
                    <div className="flex space-x-1">
                      {['desktop', 'tablet', 'mobile'].map((mode) => {
                        const Icon = getDeviceIcon(mode);
                        return (
                          <Button
                            key={mode}
                            variant={previewMode === mode ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPreviewMode(mode as any)}
                          >
                            <Icon className="w-4 h-4" />
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedPage.sections.map((section) => (
                    <div key={section.id} className="space-y-2">
                      <Label htmlFor={section.id}>
                        {section.label}
                        {section.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      
                      {section.type === 'text' && (
                        <div>
                          <Input
                            id={section.id}
                            value={section.value as string}
                            onChange={(e) => updateSectionValue(section.id, e.target.value)}
                            placeholder={section.placeholder}
                            disabled={!isEditing}
                            maxLength={section.maxLength}
                          />
                          {section.maxLength && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {(section.value as string).length}/{section.maxLength} characters
                            </p>
                          )}
                        </div>
                      )}

                      {section.type === 'textarea' && (
                        <div>
                          <Textarea
                            id={section.id}
                            value={section.value as string}
                            onChange={(e) => updateSectionValue(section.id, e.target.value)}
                            placeholder={section.placeholder}
                            disabled={!isEditing}
                            rows={4}
                            maxLength={section.maxLength}
                          />
                          {section.maxLength && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {(section.value as string).length}/{section.maxLength} characters
                            </p>
                          )}
                        </div>
                      )}

                      {section.type === 'list' && (
                        <div>
                          <Textarea
                            id={section.id}
                            value={(section.value as string[]).join('\n')}
                            onChange={(e) => updateSectionValue(section.id, e.target.value.split('\n').filter(Boolean))}
                            placeholder={section.placeholder || "Enter one item per line"}
                            disabled={!isEditing}
                            rows={3}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            One item per line • {(section.value as string[]).length} items
                          </p>
                        </div>
                      )}

                      {/* Live Preview for some sections */}
                      {(section.id === 'hero-title' || section.id === 'hero-subtitle') && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-lg border-l-4 border-blue-500">
                          <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                          <div className={section.id === 'hero-title' ? 'text-lg font-bold' : 'text-sm text-muted-foreground'}>
                            {section.value || section.placeholder}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Page Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Page Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{selectedPage.views.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className={`text-2xl font-bold ${getSeoScoreColor(selectedPage.seoScore)}`}>
                        {selectedPage.seoScore}%
                      </p>
                      <p className="text-sm text-muted-foreground">SEO Score</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className={`text-2xl font-bold ${selectedPage.loadTime <= 1.5 ? 'text-green-600' : 'text-orange-600'}`}>
                        {selectedPage.loadTime}s
                      </p>
                      <p className="text-sm text-muted-foreground">Load Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Page to Edit</h3>
                <p className="text-muted-foreground">
                  Choose a page from the list to start editing content and SEO settings.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagesManagement;