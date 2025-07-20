import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase, PageContent, subscribeToTable } from '@/lib/supabase';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
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
  Tablet,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Shield,
  BarChart3,
  Plus,
  Trash2,
  Copy
} from 'lucide-react';

interface PageSection {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'html' | 'image' | 'link' | 'list' | 'json';
  value: string | string[] | object;
  label: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  description?: string;
}

interface PageData {
  id: string;
  page_name: string;
  page_slug: string;
  content: {
    sections: PageSection[];
    meta: {
      title: string;
      description: string;
      keywords: string[];
      og_image?: string;
      canonical_url?: string;
    };
    settings: {
      is_published: boolean;
      last_modified: string;
      template?: string;
      custom_css?: string;
      custom_js?: string;
    };
  };
  meta_title?: string;
  meta_description?: string;
  seo_keywords?: string[];
  is_published: boolean;
  last_modified_by: string;
  created_at: string;
  updated_at: string;
}

const PagesManagement = () => {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');

  // Pre-defined page templates that most businesses need
  const pageTemplates = [
    {
      name: 'Homepage',
      slug: 'home',
      template: 'homepage',
      sections: [
        { id: 'hero-title', name: 'hero-title', type: 'text', value: '', label: 'Hero Title', required: true },
        { id: 'hero-subtitle', name: 'hero-subtitle', type: 'textarea', value: '', label: 'Hero Subtitle' },
        { id: 'hero-cta', name: 'hero-cta', type: 'text', value: '', label: 'CTA Button Text' },
        { id: 'features', name: 'features', type: 'json', value: [], label: 'Key Features' },
        { id: 'testimonials', name: 'testimonials', type: 'json', value: [], label: 'Customer Testimonials' }
      ]
    },
    {
      name: 'About Us',
      slug: 'about',
      template: 'standard',
      sections: [
        { id: 'company-story', name: 'company-story', type: 'textarea', value: '', label: 'Company Story' },
        { id: 'mission', name: 'mission', type: 'textarea', value: '', label: 'Mission Statement' },
        { id: 'team-section', name: 'team-section', type: 'json', value: [], label: 'Team Members' },
        { id: 'values', name: 'values', type: 'list', value: [], label: 'Company Values' }
      ]
    },
    {
      name: 'Contact',
      slug: 'contact',
      template: 'contact',
      sections: [
        { id: 'contact-intro', name: 'contact-intro', type: 'textarea', value: '', label: 'Contact Introduction' },
        { id: 'office-address', name: 'office-address', type: 'textarea', value: '', label: 'Office Address' },
        { id: 'phone', name: 'phone', type: 'text', value: '', label: 'Phone Number' },
        { id: 'email', name: 'email', type: 'text', value: '', label: 'Email Address' },
        { id: 'hours', name: 'hours', type: 'textarea', value: '', label: 'Business Hours' }
      ]
    }
  ];

  useEffect(() => {
    loadPages();
    
    // Real-time updates
    const pagesSubscription = subscribeToTable('pages_content', () => {
      loadPages();
    });

    return () => {
      pagesSubscription.unsubscribe();
    };
  }, []);

  const loadPages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('pages_content')
        .select(`
          *,
          last_modified_user:admin_users(username, email)
        `)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error loading pages:', error);
        toast({
          title: "Error Loading Pages",
          description: "Failed to load page content from database.",
          variant: "destructive",
        });
        return;
      }

      setPages(data || []);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPageFromTemplate = async (template: any) => {
    try {
      const pageData = {
        page_name: template.name,
        page_slug: template.slug,
        content: {
          sections: template.sections,
          meta: {
            title: `${template.name} - AgenticAI`,
            description: `${template.name} page for AgenticAI`,
            keywords: ['ai', 'automation', 'agentic'],
          },
          settings: {
            is_published: false,
            last_modified: new Date().toISOString(),
            template: template.template
          }
        },
        meta_title: `${template.name} - AgenticAI`,
        meta_description: `${template.name} page for AgenticAI`,
        seo_keywords: ['ai', 'automation', 'agentic'],
        is_published: false,
        last_modified_by: user?.id || ''
      };

      const { data, error } = await supabase
        .from('pages_content')
        .insert(pageData)
        .select()
        .single();

      if (error) {
        console.error('Error creating page:', error);
        toast({
          title: "Error Creating Page",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Page Created! 🎉",
        description: `${template.name} page has been created successfully.`,
      });

      loadPages();
    } catch (error) {
      console.error('Error creating page from template:', error);
    }
  };

  const handleSavePage = async () => {
    if (!selectedPage) return;

    try {
      const { error } = await supabase
        .from('pages_content')
        .update({
          ...selectedPage,
          last_modified_by: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPage.id);

      if (error) {
        console.error('Error saving page:', error);
        toast({
          title: "Error Saving Page",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Page Saved! ✅",
        description: "All changes have been saved successfully.",
      });

      loadPages();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleDeletePage = async (pageId: string, pageName: string) => {
    if (!confirm(`Are you sure you want to delete "${pageName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('pages_content')
        .delete()
        .eq('id', pageId);

      if (error) {
        console.error('Error deleting page:', error);
        toast({
          title: "Error Deleting Page",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Page Deleted",
        description: `"${pageName}" has been permanently deleted.`,
      });

      loadPages();
      if (selectedPage?.id === pageId) {
        setSelectedPage(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const togglePagePublished = async (pageId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('pages_content')
        .update({ 
          is_published: !currentStatus,
          last_modified_by: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId);

      if (error) {
        console.error('Error updating page status:', error);
        return;
      }

      toast({
        title: !currentStatus ? "Page Published! 🚀" : "Page Unpublished",
        description: !currentStatus 
          ? "This page is now live on your website."
          : "This page has been hidden from public view.",
      });

      loadPages();
    } catch (error) {
      console.error('Error toggling page status:', error);
    }
  };

  const addSection = () => {
    if (!selectedPage) return;

    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      name: `section-${Date.now()}`,
      type: 'text',
      value: '',
      label: 'New Section',
      description: 'Add content for this section'
    };

    setSelectedPage({
      ...selectedPage,
      content: {
        ...selectedPage.content,
        sections: [...selectedPage.content.sections, newSection]
      }
    });
  };

  const removeSection = (sectionId: string) => {
    if (!selectedPage) return;

    setSelectedPage({
      ...selectedPage,
      content: {
        ...selectedPage.content,
        sections: selectedPage.content.sections.filter(s => s.id !== sectionId)
      }
    });
  };

  const updateSection = (sectionId: string, field: string, value: any) => {
    if (!selectedPage) return;

    setSelectedPage({
      ...selectedPage,
      content: {
        ...selectedPage.content,
        sections: selectedPage.content.sections.map(section =>
          section.id === sectionId ? { ...section, [field]: value } : section
        )
      }
    });
  };

  const filteredPages = pages.filter(page =>
    page.page_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.page_slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isPublished: boolean) => {
    return isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  };

  const getPreviewIcon = () => {
    switch (previewMode) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Page Content Management</h1>
          <p className="text-muted-foreground">Manage static pages, SEO, and site content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Custom Page
          </Button>
          <div className="relative group">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              From Template
            </Button>
            <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {pageTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => createPageFromTemplate(template)}
                  className="w-full text-left p-2 rounded hover:bg-muted transition-colors"
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-muted-foreground">/{template.slug}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pages</p>
                <p className="text-2xl font-bold">{pages.length}</p>
              </div>
              <Globe className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {pages.filter(p => p.is_published).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pages.filter(p => !p.is_published).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SEO Score</p>
                <p className="text-2xl font-bold text-blue-600">92%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pages by name or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <div className="grid gap-4">
        {filteredPages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No pages found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms.'
                  : 'Get started by creating your first page.'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Page
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{page.page_name}</h3>
                      <Badge className={getStatusColor(page.is_published)}>
                        {page.is_published ? 'Published' : 'Draft'}
                      </Badge>
                      <Badge variant="outline">
                        /{page.page_slug}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {page.meta_description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Modified {new Date(page.updated_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {page.content.sections?.length || 0} sections
                      </span>
                      {page.meta_title && (
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          SEO optimized
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePagePublished(page.id, page.is_published)}
                      className={page.is_published ? "text-green-600" : "text-yellow-600"}
                    >
                      {page.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPage(page);
                        setIsEditing(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/${page.page_slug}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePage(page.id, page.page_name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Page Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {selectedPage ? `Edit ${selectedPage.page_name}` : 'Create New Page'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-lg">
                  {(['desktop', 'tablet', 'mobile'] as const).map((mode) => {
                    const Icon = mode === 'desktop' ? Monitor : mode === 'tablet' ? Tablet : Smartphone;
                    return (
                      <button
                        key={mode}
                        onClick={() => setPreviewMode(mode)}
                        className={`p-2 ${previewMode === mode ? 'bg-primary text-white' : 'hover:bg-muted'}`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
                <Button variant="outline" onClick={() => { setIsEditing(false); setSelectedPage(null); }}>
                  Cancel
                </Button>
                <Button onClick={handleSavePage}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Page
                </Button>
              </div>
            </CardHeader>
            
            <div className="flex h-[calc(90vh-8rem)]">
              {/* Editor Sidebar */}
              <div className="w-1/2 border-r overflow-y-auto">
                <div className="p-6">
                  {/* Tab Navigation */}
                  <div className="flex border-b mb-6">
                    {[
                      { id: 'content', label: 'Content', icon: FileText },
                      { id: 'seo', label: 'SEO', icon: Tag },
                      { id: 'settings', label: 'Settings', icon: Settings }
                    ].map((tab) => {
                      const TabIcon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                            activeTab === tab.id 
                              ? 'border-primary text-primary' 
                              : 'border-transparent text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <TabIcon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Content Tab */}
                  {activeTab === 'content' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Page Sections</h3>
                        <Button size="sm" onClick={addSection}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add Section
                        </Button>
                      </div>
                      
                      {selectedPage?.content.sections.map((section, index) => (
                        <Card key={section.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Input
                                value={section.label}
                                onChange={(e) => updateSection(section.id, 'label', e.target.value)}
                                className="font-medium"
                                placeholder="Section label"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSection(section.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <select
                              value={section.type}
                              onChange={(e) => updateSection(section.id, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md bg-background"
                            >
                              <option value="text">Text</option>
                              <option value="textarea">Textarea</option>
                              <option value="html">HTML</option>
                              <option value="image">Image URL</option>
                              <option value="link">Link</option>
                              <option value="list">List</option>
                              <option value="json">JSON Data</option>
                            </select>
                            
                            {section.type === 'textarea' || section.type === 'html' ? (
                              <Textarea
                                value={section.value as string}
                                onChange={(e) => updateSection(section.id, 'value', e.target.value)}
                                placeholder={section.placeholder || `Enter ${section.label}`}
                                rows={4}
                              />
                            ) : section.type === 'list' ? (
                              <Textarea
                                value={(section.value as string[])?.join('\n') || ''}
                                onChange={(e) => updateSection(section.id, 'value', e.target.value.split('\n').filter(Boolean))}
                                placeholder="One item per line"
                                rows={3}
                              />
                            ) : section.type === 'json' ? (
                              <Textarea
                                value={typeof section.value === 'object' ? JSON.stringify(section.value, null, 2) : section.value as string}
                                onChange={(e) => {
                                  try {
                                    const parsed = JSON.parse(e.target.value);
                                    updateSection(section.id, 'value', parsed);
                                  } catch {
                                    updateSection(section.id, 'value', e.target.value);
                                  }
                                }}
                                placeholder="Enter valid JSON"
                                rows={6}
                              />
                            ) : (
                              <Input
                                value={section.value as string}
                                onChange={(e) => updateSection(section.id, 'value', e.target.value)}
                                placeholder={section.placeholder || `Enter ${section.label}`}
                              />
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* SEO Tab */}
                  {activeTab === 'seo' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">SEO Settings</h3>
                      
                      <div>
                        <Label>Meta Title</Label>
                        <Input
                          value={selectedPage?.meta_title || ''}
                          onChange={(e) => setSelectedPage(prev => prev ? {...prev, meta_title: e.target.value} : null)}
                          placeholder="Page title for search engines"
                        />
                      </div>
                      
                      <div>
                        <Label>Meta Description</Label>
                        <Textarea
                          value={selectedPage?.meta_description || ''}
                          onChange={(e) => setSelectedPage(prev => prev ? {...prev, meta_description: e.target.value} : null)}
                          placeholder="Brief description for search results"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label>Keywords (comma separated)</Label>
                        <Input
                          value={selectedPage?.seo_keywords?.join(', ') || ''}
                          onChange={(e) => setSelectedPage(prev => prev ? {
                            ...prev, 
                            seo_keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                          } : null)}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === 'settings' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Page Settings</h3>
                      
                      <div>
                        <Label>Page Name</Label>
                        <Input
                          value={selectedPage?.page_name || ''}
                          onChange={(e) => setSelectedPage(prev => prev ? {...prev, page_name: e.target.value} : null)}
                          placeholder="Internal page name"
                        />
                      </div>
                      
                      <div>
                        <Label>URL Slug</Label>
                        <Input
                          value={selectedPage?.page_slug || ''}
                          onChange={(e) => setSelectedPage(prev => prev ? {...prev, page_slug: e.target.value} : null)}
                          placeholder="url-slug"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPage?.is_published || false}
                          onChange={(e) => setSelectedPage(prev => prev ? {...prev, is_published: e.target.checked} : null)}
                          className="rounded"
                        />
                        <Label>Published (visible to public)</Label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Panel */}
              <div className="w-1/2 bg-muted/20">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`transition-all duration-300 ${
                      previewMode === 'mobile' ? 'w-80' : 
                      previewMode === 'tablet' ? 'w-96' : 
                      'w-full'
                    }`}>
                      <div className="bg-white border border-border rounded-lg shadow-lg min-h-96 p-6">
                        <div className="text-center text-muted-foreground">
                          <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                          <p className="text-sm">
                            Your page content will appear here based on the sections you create.
                          </p>
                          
                          {selectedPage?.content.sections.length > 0 && (
                            <div className="mt-6 space-y-4 text-left">
                              {selectedPage.content.sections.map((section) => (
                                <div key={section.id} className="border-l-4 border-primary pl-4">
                                  <h4 className="font-medium text-sm text-primary">{section.label}</h4>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {section.type === 'list' && Array.isArray(section.value) 
                                      ? (section.value as string[]).join(', ')
                                      : section.type === 'json' && typeof section.value === 'object'
                                      ? JSON.stringify(section.value).substring(0, 100) + '...'
                                      : String(section.value || '').substring(0, 100) + (String(section.value || '').length > 100 ? '...' : '')
                                    }
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PagesManagement;