import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase, Resource, subscribeToTable } from '@/lib/supabase';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  BookOpen, 
  Download, 
  Edit, 
  Save, 
  Plus, 
  Search, 
  Star,
  Trash2,
  Calendar,
  TrendingUp,
  FileText,
  Image,
  File,
  ExternalLink,
  Upload,
  Eye,
  Filter
} from 'lucide-react';

const ResourcesManagement = () => {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'guide' as 'ebook' | 'whitepaper' | 'guide' | 'template' | 'case_study',
    file_url: '',
    file_size: 0,
    file_type: '',
    thumbnail_url: '',
    category: '',
    tags: [] as string[],
    is_featured: false,
    is_public: true,
  });

  const resourceTypes = [
    { value: 'ebook', label: 'eBook', icon: BookOpen },
    { value: 'whitepaper', label: 'Whitepaper', icon: FileText },
    { value: 'guide', label: 'Guide', icon: BookOpen },
    { value: 'template', label: 'Template', icon: File },
    { value: 'case_study', label: 'Case Study', icon: TrendingUp },
  ];

  const categories = [
    'Implementation',
    'Strategy',
    'Tools',
    'Research',
    'Training',
    'Technical',
    'Business',
    'Marketing'
  ];

  // Load resources on mount
  useEffect(() => {
    loadResources();
    
    // Set up real-time subscription
    const resourcesSubscription = subscribeToTable('resources', () => {
      loadResources();
    });

    return () => {
      resourcesSubscription.unsubscribe();
    };
  }, []);

  const loadResources = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select(`
          *,
          author:admin_users(username, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading resources:', error);
        toast({
          title: "Error Loading Resources",
          description: "Failed to load resources from database.",
          variant: "destructive",
        });
        return;
      }

      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResource = async () => {
    if (!newResource.title || !newResource.description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in title and description.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('resources')
        .insert({
          ...newResource,
          author_id: user?.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating resource:', error);
        toast({
          title: "Error Creating Resource",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Resource Created! 🎉",
        description: `"${newResource.title}" has been added to your resource library.`,
      });

      // Reset form
      setNewResource({
        title: '',
        description: '',
        type: 'guide',
        file_url: '',
        file_size: 0,
        file_type: '',
        thumbnail_url: '',
        category: '',
        tags: [],
        is_featured: false,
        is_public: true,
      });

      setIsEditing(false);
      loadResources();
    } catch (error) {
      console.error('Error creating resource:', error);
      toast({
        title: "Error",
        description: "Failed to create resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateResource = async (resourceId: string, updates: Partial<Resource>) => {
    try {
      const { error } = await supabase
        .from('resources')
        .update(updates)
        .eq('id', resourceId);

      if (error) {
        console.error('Error updating resource:', error);
        toast({
          title: "Error Updating Resource",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Resource Updated! ✅",
        description: "Changes have been saved successfully.",
      });

      loadResources();
      setSelectedResource(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating resource:', error);
      toast({
        title: "Error",
        description: "Failed to update resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteResource = async (resourceId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceId);

      if (error) {
        console.error('Error deleting resource:', error);
        toast({
          title: "Error Deleting Resource",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Resource Deleted",
        description: `"${title}" has been permanently deleted.`,
      });

      loadResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (resourceId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('resources')
        .update({ is_featured: !currentStatus })
        .eq('id', resourceId);

      if (error) {
        console.error('Error updating featured status:', error);
        return;
      }

      toast({
        title: !currentStatus ? "Resource Featured! ⭐" : "Removed from Featured",
        description: !currentStatus 
          ? "This resource will now appear in featured sections."
          : "This resource has been removed from featured sections.",
      });

      loadResources();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || resource.type === filterType;
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    const typeData = resourceTypes.find(t => t.value === type);
    return typeData ? typeData.icon : File;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'ebook': 'bg-blue-100 text-blue-700',
      'whitepaper': 'bg-purple-100 text-purple-700',
      'guide': 'bg-green-100 text-green-700',
      'template': 'bg-orange-100 text-orange-700',
      'case_study': 'bg-red-100 text-red-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resources management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resources Management</h1>
          <p className="text-muted-foreground">Manage downloadable resources and lead magnets</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Resources</p>
                <p className="text-2xl font-bold">{resources.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {resources.filter(r => r.is_featured).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Public</p>
                <p className="text-2xl font-bold text-green-600">
                  {resources.filter(r => r.is_public).length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold text-blue-600">
                  {resources.reduce((sum, resource) => sum + resource.download_count, 0)}
                </p>
              </div>
              <Download className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(resources.map(r => r.category).filter(Boolean)).size}
                </p>
              </div>
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Types</option>
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid gap-4">
        {filteredResources.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterType !== 'all' || filterCategory !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by adding your first resource.'
                }
              </p>
              {!searchTerm && filterType === 'all' && filterCategory === 'all' && (
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Resource
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{resource.title}</h3>
                            {resource.is_featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                            {!resource.is_public && (
                              <Badge variant="secondary">Private</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(resource.type)}>
                              {resourceTypes.find(t => t.value === resource.type)?.label || resource.type}
                            </Badge>
                            {resource.category && (
                              <Badge variant="outline">{resource.category}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(resource.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {resource.download_count} downloads
                        </span>
                        {resource.file_size > 0 && (
                          <span className="flex items-center gap-1">
                            <File className="w-3 h-3" />
                            {formatFileSize(resource.file_size)}
                          </span>
                        )}
                        {resource.author && (
                          <span>By {resource.author.username}</span>
                        )}
                      </div>
                      
                      {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {resource.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{resource.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFeatured(resource.id, resource.is_featured)}
                        className={resource.is_featured ? "text-yellow-600" : ""}
                      >
                        <Star className={`w-4 h-4 ${resource.is_featured ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedResource(resource);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {resource.file_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(resource.file_url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteResource(resource.id, resource.title)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Create/Edit Resource Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {selectedResource ? 'Edit Resource' : 'Add New Resource'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={selectedResource ? selectedResource.title : newResource.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, title });
                      } else {
                        setNewResource({ ...newResource, title });
                      }
                    }}
                    placeholder="Enter resource title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={selectedResource ? selectedResource.type : newResource.type}
                    onChange={(e) => {
                      const type = e.target.value as typeof newResource.type;
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, type });
                      } else {
                        setNewResource({ ...newResource, type });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    {resourceTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={selectedResource ? selectedResource.description || '' : newResource.description}
                  onChange={(e) => {
                    const description = e.target.value;
                    if (selectedResource) {
                      setSelectedResource({ ...selectedResource, description });
                    } else {
                      setNewResource({ ...newResource, description });
                    }
                  }}
                  placeholder="Describe what this resource contains and its benefits"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="file_url">File URL</Label>
                  <Input
                    id="file_url"
                    value={selectedResource ? selectedResource.file_url || '' : newResource.file_url}
                    onChange={(e) => {
                      const file_url = e.target.value;
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, file_url });
                      } else {
                        setNewResource({ ...newResource, file_url });
                      }
                    }}
                    placeholder="https://example.com/file.pdf"
                  />
                </div>
                
                <div>
                  <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                  <Input
                    id="thumbnail_url"
                    value={selectedResource ? selectedResource.thumbnail_url || '' : newResource.thumbnail_url}
                    onChange={(e) => {
                      const thumbnail_url = e.target.value;
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, thumbnail_url });
                      } else {
                        setNewResource({ ...newResource, thumbnail_url });
                      }
                    }}
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={selectedResource ? selectedResource.category || '' : newResource.category}
                    onChange={(e) => {
                      const category = e.target.value;
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, category });
                      } else {
                        setNewResource({ ...newResource, category });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={selectedResource ? selectedResource.tags?.join(', ') || '' : newResource.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, tags });
                      } else {
                        setNewResource({ ...newResource, tags });
                      }
                    }}
                    placeholder="ai, automation, guide"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedResource ? selectedResource.is_featured : newResource.is_featured}
                    onChange={(e) => {
                      const is_featured = e.target.checked;
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, is_featured });
                      } else {
                        setNewResource({ ...newResource, is_featured });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Featured Resource</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedResource ? selectedResource.is_public : newResource.is_public}
                    onChange={(e) => {
                      const is_public = e.target.checked;
                      if (selectedResource) {
                        setSelectedResource({ ...selectedResource, is_public });
                      } else {
                        setNewResource({ ...newResource, is_public });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Public Resource</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedResource(null);
                    setNewResource({
                      title: '',
                      description: '',
                      type: 'guide',
                      file_url: '',
                      file_size: 0,
                      file_type: '',
                      thumbnail_url: '',
                      category: '',
                      tags: [],
                      is_featured: false,
                      is_public: true,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedResource) {
                      handleUpdateResource(selectedResource.id, selectedResource);
                    } else {
                      handleCreateResource();
                    }
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {selectedResource ? 'Update Resource' : 'Create Resource'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResourcesManagement;