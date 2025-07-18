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
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  Tag,
  Save,
  X,
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  publishedDate: string;
  readTime: string;
  featured: boolean;
  views: number;
}

const BlogManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample blog posts - in real app, this would come from your backend
  useEffect(() => {
    const samplePosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of Agentic AI in Financial Services',
        excerpt: 'How autonomous AI agents are revolutionizing banking, insurance, and investment management with intelligent automation.',
        content: 'Full blog content would go here...',
        author: 'Dr. Sarah Chen',
        category: 'Use Cases',
        tags: ['AI', 'Finance', 'Automation'],
        status: 'published',
        publishedDate: '2024-01-15',
        readTime: '8 min read',
        featured: true,
        views: 1247
      },
      {
        id: '2',
        title: 'Building Your First AI Agent with LangChain',
        excerpt: 'A comprehensive tutorial on creating intelligent agents that can reason, plan, and execute complex tasks autonomously.',
        content: 'Full tutorial content would go here...',
        author: 'Marcus Rodriguez',
        category: 'Tutorials',
        tags: ['LangChain', 'Tutorial', 'Development'],
        status: 'published',
        publishedDate: '2024-01-12',
        readTime: '12 min read',
        featured: false,
        views: 892
      },
      {
        id: '3',
        title: 'Multi-Agent Systems: Orchestrating AI Collaboration',
        excerpt: 'Exploring how multiple AI agents can work together to solve complex business problems more effectively than single agents.',
        content: 'Draft content in progress...',
        author: 'Dr. Emily Watson',
        category: 'AI Research',
        tags: ['Multi-Agent', 'Research', 'Collaboration'],
        status: 'draft',
        publishedDate: '',
        readTime: '6 min read',
        featured: false,
        views: 0
      }
    ];
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
  }, []);

  // Filter posts based on search and filters
  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(post => post.status === filterStatus);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(post => post.category === filterCategory);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, filterStatus, filterCategory]);

  const categories = ['Use Cases', 'Tutorials', 'AI Research', 'Industry Trends'];
  const statuses = ['draft', 'published', 'scheduled'];

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin User',
      category: 'Use Cases',
      tags: [],
      status: 'draft',
      publishedDate: '',
      readTime: '5 min read',
      featured: false,
      views: 0
    };
    setEditingPost(newPost);
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingPost) return;

    if (!editingPost.title || !editingPost.excerpt) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and excerpt before saving.",
        variant: "destructive",
      });
      return;
    }

    if (posts.find(p => p.id === editingPost.id)) {
      // Update existing
      setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p));
      toast({
        title: "Post Updated! ✨",
        description: `"${editingPost.title}" has been saved successfully.`,
      });
    } else {
      // Create new
      setPosts([editingPost, ...posts]);
      toast({
        title: "New Post Created! 🎉",
        description: `"${editingPost.title}" has been added to your blog.`,
      });
    }

    setIsEditing(false);
    setEditingPost(null);
  };

  const handleDelete = (id: string) => {
    const post = posts.find(p => p.id === id);
    setPosts(posts.filter(p => p.id !== id));
    toast({
      title: "Post Deleted",
      description: `"${post?.title}" has been removed from your blog.`,
      variant: "destructive",
    });
  };

  const handlePublish = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id 
        ? { ...p, status: 'published' as const, publishedDate: new Date().toISOString().split('T')[0] }
        : p
    ));
    const post = posts.find(p => p.id === id);
    toast({
      title: "Post Published! 🚀",
      description: `"${post?.title}" is now live on your website.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  if (isEditing && editingPost) {
    return (
      <div className="space-y-6">
        {/* Editor Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {posts.find(p => p.id === editingPost.id) ? 'Edit Post' : 'Create New Post'}
            </h2>
            <p className="text-muted-foreground">
              {posts.find(p => p.id === editingPost.id) ? 'Make changes to your blog post' : 'Write and publish a new blog post'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Post
            </Button>
          </div>
        </div>

        {/* Editor Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    placeholder="Enter your blog post title..."
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    placeholder="Write a compelling excerpt that summarizes your post..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    placeholder="Write your full blog post content here..."
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
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
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => setEditingPost({ 
                      ...editingPost, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                    placeholder="AI, Tutorial, Guide"
                  />
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    placeholder="5 min read"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingPost.featured}
                    onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={editingPost.status}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Manage your blog posts, categories, and content</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-xl font-bold">{posts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-xl font-bold">{publishedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-xl font-bold">{draftCount}</p>
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
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    {post.featured && (
                      <Badge className="bg-yellow-100 text-yellow-700">Featured</Badge>
                    )}
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{post.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    {post.status === 'published' && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.publishedDate}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views} views</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  {post.status === 'draft' && (
                    <Button variant="outline" size="sm" onClick={() => handlePublish(post.id)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first blog post to get started'
              }
            </p>
            {(!searchTerm && filterStatus === 'all' && filterCategory === 'all') && (
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogManagement;