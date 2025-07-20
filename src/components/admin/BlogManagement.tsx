import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase, BlogPost, BlogCategory, subscribeToTable } from '@/lib/supabase';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  FileText, 
  Edit, 
  Save, 
  Plus, 
  Search, 
  Eye,
  Trash2,
  Calendar,
  Tag,
  TrendingUp,
  Users,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';

const BlogManagement = () => {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    category_id: '',
    tags: [] as string[],
    meta_title: '',
    meta_description: '',
  });

  // Load posts and categories on mount
  useEffect(() => {
    loadBlogData();
    
    // Set up real-time subscriptions
    const postsSubscription = subscribeToTable('blog_posts', () => {
      loadBlogData();
    });

    const categoriesSubscription = subscribeToTable('blog_categories', () => {
      loadCategories();
    });

    return () => {
      postsSubscription.unsubscribe();
      categoriesSubscription.unsubscribe();
    };
  }, []);

  const loadBlogData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([loadPosts(), loadCategories()]);
    } catch (error) {
      console.error('Error loading blog data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load blog posts and categories.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        author:admin_users(username, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading posts:', error);
      return;
    }

    setPosts(data || []);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error loading categories:', error);
      return;
    }

    setCategories(data || []);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in title and content.",
        variant: "destructive",
      });
      return;
    }

    const slug = newPost.slug || generateSlug(newPost.title);
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...newPost,
          slug,
          author_id: user?.id,
          reading_time: Math.ceil(newPost.content.split(' ').length / 200), // Estimate reading time
          published_at: newPost.status === 'published' ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast({
          title: "Error Creating Post",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Post Created! 🎉",
        description: `"${newPost.title}" has been created successfully.`,
      });

      // Reset form
      setNewPost({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        status: 'draft',
        category_id: '',
        tags: [],
        meta_title: '',
        meta_description: '',
      });

      setIsEditing(false);
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePost = async (postId: string, updates: Partial<BlogPost>) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          published_at: updates.status === 'published' && !selectedPost?.published_at 
            ? new Date().toISOString() 
            : selectedPost?.published_at,
        })
        .eq('id', postId);

      if (error) {
        console.error('Error updating post:', error);
        toast({
          title: "Error Updating Post",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Post Updated! ✅",
        description: "Changes have been saved successfully.",
      });

      loadPosts();
      setSelectedPost(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (postId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Error deleting post:', error);
        toast({
          title: "Error Deleting Post",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Post Deleted",
        description: `"${title}" has been permanently deleted.`,
      });

      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category_id === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
          <p className="text-muted-foreground">Loading blog management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage blog posts in real-time</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {posts.filter(p => p.status === 'published').length}
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
                  {posts.filter(p => p.status === 'draft').length}
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
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">
                  {posts.reduce((sum, post) => sum + post.views_count, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
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
                  placeholder="Search posts by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by creating your first blog post.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && filterCategory === 'all' && (
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      {post.category && (
                        <Badge variant="outline" style={{ borderColor: post.category.color || '#ccc' }}>
                          {post.category.name}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {post.author?.username || 'Unknown'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views_count} views
                      </span>
                      {post.reading_time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.reading_time} min read
                        </span>
                      )}
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPost(post);
                        setIsEditing(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id, post.title)}
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

      {/* Create/Edit Post Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={selectedPost ? selectedPost.title : newPost.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      if (selectedPost) {
                        setSelectedPost({ ...selectedPost, title });
                      } else {
                        setNewPost({ ...newPost, title, slug: generateSlug(title) });
                      }
                    }}
                    placeholder="Enter post title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={selectedPost ? selectedPost.slug : newPost.slug}
                    onChange={(e) => {
                      const slug = e.target.value;
                      if (selectedPost) {
                        setSelectedPost({ ...selectedPost, slug });
                      } else {
                        setNewPost({ ...newPost, slug });
                      }
                    }}
                    placeholder="post-slug"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={selectedPost ? selectedPost.excerpt || '' : newPost.excerpt}
                  onChange={(e) => {
                    const excerpt = e.target.value;
                    if (selectedPost) {
                      setSelectedPost({ ...selectedPost, excerpt });
                    } else {
                      setNewPost({ ...newPost, excerpt });
                    }
                  }}
                  placeholder="Brief description of the post"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={selectedPost ? selectedPost.content : newPost.content}
                  onChange={(e) => {
                    const content = e.target.value;
                    if (selectedPost) {
                      setSelectedPost({ ...selectedPost, content });
                    } else {
                      setNewPost({ ...newPost, content });
                    }
                  }}
                  placeholder="Write your post content here..."
                  rows={10}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={selectedPost ? selectedPost.status : newPost.status}
                    onChange={(e) => {
                      const status = e.target.value as 'draft' | 'published' | 'archived';
                      if (selectedPost) {
                        setSelectedPost({ ...selectedPost, status });
                      } else {
                        setNewPost({ ...newPost, status });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={selectedPost ? selectedPost.category_id || '' : newPost.category_id}
                    onChange={(e) => {
                      const category_id = e.target.value;
                      if (selectedPost) {
                        setSelectedPost({ ...selectedPost, category_id });
                      } else {
                        setNewPost({ ...newPost, category_id });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={selectedPost ? selectedPost.tags?.join(', ') || '' : newPost.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      if (selectedPost) {
                        setSelectedPost({ ...selectedPost, tags });
                      } else {
                        setNewPost({ ...newPost, tags });
                      }
                    }}
                    placeholder="ai, automation, technology"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedPost(null);
                    setNewPost({
                      title: '',
                      slug: '',
                      content: '',
                      excerpt: '',
                      status: 'draft',
                      category_id: '',
                      tags: [],
                      meta_title: '',
                      meta_description: '',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedPost) {
                      handleUpdatePost(selectedPost.id, selectedPost);
                    } else {
                      handleCreatePost();
                    }
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {selectedPost ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;