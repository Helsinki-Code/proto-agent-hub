import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Search, 
  FileText,
  Video,
  Code,
  Archive,
  BookOpen,
  ExternalLink,
  Upload,
  Save,
  X,
  Star,
  Eye,
  Calendar
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'whitepaper' | 'guide' | 'tool' | 'video' | 'template' | 'research';
  format: string;
  fileSize?: string;
  downloadUrl: string;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  featured: boolean;
  createdDate: string;
  updatedDate: string;
  status: 'active' | 'draft' | 'archived';
}

const ResourcesManagement = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample resources data
  useEffect(() => {
    const sampleResources: Resource[] = [
      {
        id: '1',
        title: 'The Complete Guide to Agentic AI',
        description: 'Comprehensive 50-page guide covering everything from basic concepts to advanced implementation strategies.',
        type: 'whitepaper',
        format: 'PDF',
        fileSize: '15.2 MB',
        downloadUrl: '/resources/complete-guide-agentic-ai.pdf',
        category: 'Implementation',
        tags: ['AI', 'Guide', 'Implementation'],
        downloads: 12500,
        rating: 4.8,
        featured: true,
        createdDate: '2024-01-15',
        updatedDate: '2024-01-15',
        status: 'active'
      },
      {
        id: '2',
        title: 'ROI Calculator for AI Automation',
        description: 'Interactive tool to calculate potential return on investment for AI automation projects.',
        type: 'tool',
        format: 'Web App',
        downloadUrl: '/tools/roi-calculator',
        category: 'Tools',
        tags: ['ROI', 'Calculator', 'Business'],
        downloads: 8200,
        rating: 4.6,
        featured: false,
        createdDate: '2024-01-10',
        updatedDate: '2024-01-12',
        status: 'active'
      },
      {
        id: '3',
        title: 'Multi-Agent Systems Architecture',
        description: 'Technical deep-dive into designing scalable multi-agent architectures for enterprise applications.',
        type: 'guide',
        format: 'PDF',
        fileSize: '8.7 MB',
        downloadUrl: '/resources/multi-agent-architecture.pdf',
        category: 'Technical',
        tags: ['Architecture', 'Multi-Agent', 'Enterprise'],
        downloads: 5400,
        rating: 4.9,
        featured: false,
        createdDate: '2024-01-08',
        updatedDate: '2024-01-08',
        status: 'active'
      }
    ];
    setResources(sampleResources);
    setFilteredResources(sampleResources);
  }, []);

  // Filter resources
  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(resource => resource.type === filterType);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === filterCategory);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, filterType, filterCategory]);

  const resourceTypes = ['whitepaper', 'guide', 'tool', 'video', 'template', 'research'];
  const categories = ['Implementation', 'Technical', 'Tools', 'Business', 'Research'];

  const handleCreateNew = () => {
    const newResource: Resource = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type: 'guide',
      format: 'PDF',
      downloadUrl: '',
      category: 'Implementation',
      tags: [],
      downloads: 0,
      rating: 0,
      featured: false,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    setEditingResource(newResource);
    setIsEditing(true);
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource({ ...resource });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingResource) return;

    if (!editingResource.title || !editingResource.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and description before saving.",
        variant: "destructive",
      });
      return;
    }

    if (resources.find(r => r.id === editingResource.id)) {
      setResources(resources.map(r => r.id === editingResource.id ? editingResource : r));
      toast({
        title: "Resource Updated! ✨",
        description: `"${editingResource.title}" has been saved successfully.`,
      });
    } else {
      setResources([editingResource, ...resources]);
      toast({
        title: "New Resource Created! 🎉",
        description: `"${editingResource.title}" has been added to your library.`,
      });
    }

    setIsEditing(false);
    setEditingResource(null);
  };

  const handleDelete = (id: string) => {
    const resource = resources.find(r => r.id === id);
    setResources(resources.filter(r => r.id !== id));
    toast({
      title: "Resource Deleted",
      description: `"${resource?.title}" has been removed from your library.`,
      variant: "destructive",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whitepaper': return FileText;
      case 'guide': return BookOpen;
      case 'tool': return Code;
      case 'video': return Video;
      case 'template': return Archive;
      case 'research': return Search;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'whitepaper': return 'bg-blue-100 text-blue-700';
      case 'guide': return 'bg-green-100 text-green-700';
      case 'tool': return 'bg-purple-100 text-purple-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'template': return 'bg-orange-100 text-orange-700';
      case 'research': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalDownloads = resources.reduce((sum, resource) => sum + resource.downloads, 0);
  const activeCount = resources.filter(r => r.status === 'active').length;
  const featuredCount = resources.filter(r => r.featured).length;

  if (isEditing && editingResource) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {resources.find(r => r.id === editingResource.id) ? 'Edit Resource' : 'Create New Resource'}
            </h2>
            <p className="text-muted-foreground">
              {resources.find(r => r.id === editingResource.id) ? 'Update your resource details' : 'Add a new resource to your library'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Resource
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingResource.title}
                    onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                    placeholder="Enter resource title..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingResource.description}
                    onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
                    placeholder="Describe what this resource provides..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="downloadUrl">Download URL</Label>
                  <Input
                    id="downloadUrl"
                    value={editingResource.downloadUrl}
                    onChange={(e) => setEditingResource({ ...editingResource, downloadUrl: e.target.value })}
                    placeholder="/resources/filename.pdf"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="format">Format</Label>
                    <Input
                      id="format"
                      value={editingResource.format}
                      onChange={(e) => setEditingResource({ ...editingResource, format: e.target.value })}
                      placeholder="PDF, Video, Web App"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fileSize">File Size</Label>
                    <Input
                      id="fileSize"
                      value={editingResource.fileSize || ''}
                      onChange={(e) => setEditingResource({ ...editingResource, fileSize: e.target.value })}
                      placeholder="15.2 MB (optional)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={editingResource.type}
                    onChange={(e) => setEditingResource({ ...editingResource, type: e.target.value as any })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {resourceTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={editingResource.category}
                    onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={editingResource.tags.join(', ')}
                    onChange={(e) => setEditingResource({ 
                      ...editingResource, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                    placeholder="AI, Guide, Technical"
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={editingResource.status}
                    onChange={(e) => setEditingResource({ ...editingResource, status: e.target.value as any })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingResource.featured}
                    onChange={(e) => setEditingResource({ ...editingResource, featured: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Resource</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resources Library</h2>
          <p className="text-muted-foreground">Manage downloadable resources, guides, and tools</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Resources</p>
                <p className="text-xl font-bold">{resources.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-xl font-bold">{totalDownloads.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-xl font-bold">{featuredCount}</p>
              </div>
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
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Types</option>
              {resourceTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          return (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.type}
                      </Badge>
                      {resource.featured && (
                        <Badge className="ml-2 bg-yellow-100 text-yellow-700">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(resource.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span>{resource.format}</span>
                  </div>
                  {resource.fileSize && (
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{resource.fileSize}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Downloads:</span>
                    <span>{resource.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span>{resource.rating}/5.0</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {resource.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated: {resource.updatedDate}</span>
                    <Badge variant={resource.status === 'active' ? 'default' : 'secondary'}>
                      {resource.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== 'all' || filterCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first resource to get started'
              }
            </p>
            {(!searchTerm && filterType === 'all' && filterCategory === 'all') && (
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Resource
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResourcesManagement;