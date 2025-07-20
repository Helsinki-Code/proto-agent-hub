import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase, UseCase, subscribeToTable } from '@/lib/supabase';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Target, 
  Edit, 
  Save, 
  Plus, 
  Search, 
  Star,
  Trash2,
  TrendingUp,
  Building2,
  CheckCircle,
  BarChart3,
  Users,
  DollarSign,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Award,
  Lightbulb
} from 'lucide-react';

const UseCasesManagement = () => {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [newUseCase, setNewUseCase] = useState({
    title: '',
    slug: '',
    industry: '',
    challenge: '',
    solution: '',
    results: {
      cost_reduction: '',
      time_saved: '',
      efficiency_gain: '',
      roi_percentage: '',
      custom_metrics: [] as Array<{metric: string, value: string, description: string}>
    },
    metrics: {
      implementation_time: '',
      team_size: '',
      complexity_level: 'Medium'
    },
    client_name: '',
    client_logo: '',
    featured_image: '',
    tags: [] as string[],
    is_featured: false,
    is_published: true,
    order_index: 0,
  });

  // Industry options - you know what's interesting? I've noticed these are the sectors where AI actually makes the biggest impact
  const industries = [
    'Financial Services',
    'Healthcare',
    'Manufacturing', 
    'Retail & E-commerce',
    'Technology',
    'Insurance',
    'Legal Services',
    'Real Estate',
    'Education',
    'Logistics',
    'Energy',
    'Telecommunications',
    'Government',
    'Non-profit'
  ];

  const complexityLevels = ['Low', 'Medium', 'High', 'Enterprise'];

  // Load use cases on mount
  useEffect(() => {
    loadUseCases();
    
    // Set up real-time subscription - honestly, seeing these success stories update live gives me chills
    const useCasesSubscription = subscribeToTable('use_cases', () => {
      loadUseCases();
    });

    return () => {
      useCasesSubscription.unsubscribe();
    };
  }, []);

  const loadUseCases = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('use_cases')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error loading use cases:', error);
        toast({
          title: "Error Loading Use Cases",
          description: "Failed to load use cases from database.",
          variant: "destructive",
        });
        return;
      }

      setUseCases(data || []);
    } catch (error) {
      console.error('Error loading use cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleCreateUseCase = async () => {
    if (!newUseCase.title || !newUseCase.industry || !newUseCase.challenge) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in title, industry, and challenge description.",
        variant: "destructive",
      });
      return;
    }

    const slug = newUseCase.slug || generateSlug(newUseCase.title);
    
    try {
      // Get the next order index
      const maxOrder = Math.max(...useCases.map(uc => uc.order_index), -1);
      
      const { data, error } = await supabase
        .from('use_cases')
        .insert({
          ...newUseCase,
          slug,
          order_index: maxOrder + 1,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating use case:', error);
        toast({
          title: "Error Creating Use Case",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success Story Added! 🎉",
        description: `"${newUseCase.title}" has been added to your success portfolio.`,
      });

      // Reset form
      setNewUseCase({
        title: '',
        slug: '',
        industry: '',
        challenge: '',
        solution: '',
        results: {
          cost_reduction: '',
          time_saved: '',
          efficiency_gain: '',
          roi_percentage: '',
          custom_metrics: []
        },
        metrics: {
          implementation_time: '',
          team_size: '',
          complexity_level: 'Medium'
        },
        client_name: '',
        client_logo: '',
        featured_image: '',
        tags: [],
        is_featured: false,
        is_published: true,
        order_index: 0,
      });

      setIsEditing(false);
      loadUseCases();
    } catch (error) {
      console.error('Error creating use case:', error);
      toast({
        title: "Error",
        description: "Failed to create use case. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUseCase = async (useCaseId: string, updates: Partial<UseCase>) => {
    try {
      const { error } = await supabase
        .from('use_cases')
        .update(updates)
        .eq('id', useCaseId);

      if (error) {
        console.error('Error updating use case:', error);
        toast({
          title: "Error Updating Use Case",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Use Case Updated! ✅",
        description: "Changes have been saved successfully.",
      });

      loadUseCases();
      setSelectedUseCase(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating use case:', error);
      toast({
        title: "Error",
        description: "Failed to update use case. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUseCase = async (useCaseId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('use_cases')
        .delete()
        .eq('id', useCaseId);

      if (error) {
        console.error('Error deleting use case:', error);
        toast({
          title: "Error Deleting Use Case",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Use Case Deleted",
        description: `"${title}" has been permanently deleted.`,
      });

      loadUseCases();
    } catch (error) {
      console.error('Error deleting use case:', error);
      toast({
        title: "Error",
        description: "Failed to delete use case. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (useCaseId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('use_cases')
        .update({ is_featured: !currentStatus })
        .eq('id', useCaseId);

      if (error) {
        console.error('Error updating featured status:', error);
        return;
      }

      toast({
        title: !currentStatus ? "Use Case Featured! ⭐" : "Removed from Featured",
        description: !currentStatus 
          ? "This success story will now appear in featured sections."
          : "This use case has been removed from featured sections.",
      });

      loadUseCases();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleTogglePublished = async (useCaseId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('use_cases')
        .update({ is_published: !currentStatus })
        .eq('id', useCaseId);

      if (error) {
        console.error('Error updating published status:', error);
        return;
      }

      toast({
        title: !currentStatus ? "Use Case Published! 🚀" : "Use Case Unpublished",
        description: !currentStatus 
          ? "This success story is now visible to visitors."
          : "This use case has been hidden from public view.",
      });

      loadUseCases();
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const handleReorderUseCase = async (useCaseId: string, direction: 'up' | 'down') => {
    const currentIndex = useCases.findIndex(uc => uc.id === useCaseId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= useCases.length) return;

    const currentUseCase = useCases[currentIndex];
    const swapUseCase = useCases[newIndex];

    try {
      // Swap order indices
      await Promise.all([
        supabase
          .from('use_cases')
          .update({ order_index: swapUseCase.order_index })
          .eq('id', currentUseCase.id),
        supabase
          .from('use_cases')
          .update({ order_index: currentUseCase.order_index })
          .eq('id', swapUseCase.id)
      ]);

      loadUseCases();
    } catch (error) {
      console.error('Error reordering use cases:', error);
      toast({
        title: "Error",
        description: "Failed to reorder use cases.",
        variant: "destructive",
      });
    }
  };

  const addCustomMetric = () => {
    const current = selectedUseCase || newUseCase;
    const newMetric = { metric: '', value: '', description: '' };
    
    if (selectedUseCase) {
      setSelectedUseCase({
        ...selectedUseCase,
        results: {
          ...selectedUseCase.results,
          custom_metrics: [...(selectedUseCase.results?.custom_metrics || []), newMetric]
        }
      });
    } else {
      setNewUseCase({
        ...newUseCase,
        results: {
          ...newUseCase.results,
          custom_metrics: [...newUseCase.results.custom_metrics, newMetric]
        }
      });
    }
  };

  const removeCustomMetric = (index: number) => {
    if (selectedUseCase) {
      const metrics = [...(selectedUseCase.results?.custom_metrics || [])];
      metrics.splice(index, 1);
      setSelectedUseCase({
        ...selectedUseCase,
        results: {
          ...selectedUseCase.results,
          custom_metrics: metrics
        }
      });
    } else {
      const metrics = [...newUseCase.results.custom_metrics];
      metrics.splice(index, 1);
      setNewUseCase({
        ...newUseCase,
        results: {
          ...newUseCase.results,
          custom_metrics: metrics
        }
      });
    }
  };

  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.challenge?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = filterIndustry === 'all' || useCase.industry === filterIndustry;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && useCase.is_published) ||
                         (filterStatus === 'unpublished' && !useCase.is_published) ||
                         (filterStatus === 'featured' && useCase.is_featured);
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const getComplexityColor = (level: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'High': 'bg-orange-100 text-orange-700',
      'Enterprise': 'bg-red-100 text-red-700',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Quick function to extract key metrics for the cards
  const getKeyMetrics = (useCase: UseCase) => {
    const results = useCase.results || {};
    return {
      roi: results.roi_percentage ? `${results.roi_percentage}% ROI` : null,
      cost: results.cost_reduction ? `${results.cost_reduction} saved` : null,
      time: results.time_saved ? `${results.time_saved} faster` : null,
      efficiency: results.efficiency_gain ? `${results.efficiency_gain} efficiency` : null
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Use Cases & Success Stories</h1>
          <p className="text-muted-foreground">Showcase real results and build credibility with proven implementations</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Success Story
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">{useCases.length}</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {useCases.filter(uc => uc.is_published).length}
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
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {useCases.filter(uc => uc.is_featured).length}
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
                <p className="text-sm text-muted-foreground">Industries</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(useCases.map(uc => uc.industry).filter(Boolean)).size}
                </p>
              </div>
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg ROI</p>
                <p className="text-2xl font-bold text-blue-600">
                  {useCases.filter(uc => uc.results?.roi_percentage).length > 0 
                    ? Math.round(
                        useCases
                          .filter(uc => uc.results?.roi_percentage)
                          .reduce((sum, uc) => sum + parseInt(uc.results?.roi_percentage || '0'), 0) / 
                        useCases.filter(uc => uc.results?.roi_percentage).length
                      ) + '%'
                    : 'N/A'
                  }
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
                  placeholder="Search by title, industry, challenge, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases List */}
      <div className="grid gap-4">
        {filteredUseCases.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No success stories found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterIndustry !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Start building credibility by documenting your first success story.'
                }
              </p>
              {!searchTerm && filterIndustry === 'all' && filterStatus === 'all' && (
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Success Story
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredUseCases.map((useCase, index) => {
            const metrics = getKeyMetrics(useCase);
            return (
              <Card key={useCase.id} className={`hover:shadow-md transition-shadow ${!useCase.is_published ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{useCase.title}</h3>
                            {useCase.is_featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                            {!useCase.is_published && (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                            {useCase.industry && (
                              <Badge variant="outline">{useCase.industry}</Badge>
                            )}
                            {useCase.metrics?.complexity_level && (
                              <Badge className={getComplexityColor(useCase.metrics.complexity_level)}>
                                {useCase.metrics.complexity_level}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            <span className="font-medium">Challenge:</span> {useCase.challenge}
                          </p>
                        </div>
                        
                        {/* Key Metrics Row */}
                        <div className="flex flex-wrap gap-3 text-sm">
                          {metrics.roi && (
                            <span className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="w-3 h-3" />
                              {metrics.roi}
                            </span>
                          )}
                          {metrics.cost && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <DollarSign className="w-3 h-3" />
                              {metrics.cost}
                            </span>
                          )}
                          {metrics.time && (
                            <span className="flex items-center gap-1 text-purple-600">
                              <Clock className="w-3 h-3" />
                              {metrics.time}
                            </span>
                          )}
                          {useCase.client_name && (
                            <span className="flex items-center gap-1 text-gray-600">
                              <Building2 className="w-3 h-3" />
                              {useCase.client_name}
                            </span>
                          )}
                          <span className="text-gray-500">Order: #{useCase.order_index + 1}</span>
                        </div>
                        
                        {useCase.tags && useCase.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {useCase.tags.slice(0, 4).map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {useCase.tags.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{useCase.tags.length - 4} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 ml-4">
                      {/* Reorder buttons */}
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorderUseCase(useCase.id, 'up')}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorderUseCase(useCase.id, 'down')}
                          disabled={index === filteredUseCases.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Action buttons */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFeatured(useCase.id, useCase.is_featured)}
                        className={useCase.is_featured ? "text-yellow-600" : ""}
                      >
                        <Star className={`w-4 h-4 ${useCase.is_featured ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePublished(useCase.id, useCase.is_published)}
                        className={useCase.is_published ? "text-green-600" : "text-gray-600"}
                      >
                        {useCase.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUseCase(useCase);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUseCase(useCase.id, useCase.title)}
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

      {/* Create/Edit Use Case Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {selectedUseCase ? 'Edit Success Story' : 'Add New Success Story'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Success Story Title *</Label>
                  <Input
                    id="title"
                    value={selectedUseCase ? selectedUseCase.title : newUseCase.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      if (selectedUseCase) {
                        setSelectedUseCase({ ...selectedUseCase, title });
                      } else {
                        setNewUseCase({ ...newUseCase, title, slug: generateSlug(title) });
                      }
                    }}
                    placeholder="e.g., 45% Cost Reduction in Manufacturing Operations"
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <select
                    id="industry"
                    value={selectedUseCase ? selectedUseCase.industry || '' : newUseCase.industry}
                    onChange={(e) => {
                      const industry = e.target.value;
                      if (selectedUseCase) {
                        setSelectedUseCase({ ...selectedUseCase, industry });
                      } else {
                        setNewUseCase({ ...newUseCase, industry });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={selectedUseCase ? selectedUseCase.client_name || '' : newUseCase.client_name}
                    onChange={(e) => {
                      const client_name = e.target.value;
                      if (selectedUseCase) {
                        setSelectedUseCase({ ...selectedUseCase, client_name });
                      } else {
                        setNewUseCase({ ...newUseCase, client_name });
                      }
                    }}
                    placeholder="Company Name (or leave blank for anonymous)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="complexity_level">Project Complexity</Label>
                  <select
                    id="complexity_level"
                    value={selectedUseCase ? selectedUseCase.metrics?.complexity_level || 'Medium' : newUseCase.metrics.complexity_level}
                    onChange={(e) => {
                      const complexity_level = e.target.value;
                      if (selectedUseCase) {
                        setSelectedUseCase({ 
                          ...selectedUseCase, 
                          metrics: { ...selectedUseCase.metrics, complexity_level } 
                        });
                      } else {
                        setNewUseCase({ 
                          ...newUseCase, 
                          metrics: { ...newUseCase.metrics, complexity_level } 
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    {complexityLevels.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Challenge & Solution */}
              <div>
                <Label htmlFor="challenge">Business Challenge *</Label>
                <Textarea
                  id="challenge"
                  value={selectedUseCase ? selectedUseCase.challenge || '' : newUseCase.challenge}
                  onChange={(e) => {
                    const challenge = e.target.value;
                    if (selectedUseCase) {
                      setSelectedUseCase({ ...selectedUseCase, challenge });
                    } else {
                      setNewUseCase({ ...newUseCase, challenge });
                    }
                  }}
                  placeholder="Describe the specific business challenge or pain point the client was facing..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="solution">AI Solution Implemented</Label>
                <Textarea
                  id="solution"
                  value={selectedUseCase ? selectedUseCase.solution || '' : newUseCase.solution}
                  onChange={(e) => {
                    const solution = e.target.value;
                    if (selectedUseCase) {
                      setSelectedUseCase({ ...selectedUseCase, solution });
                    } else {
                      setNewUseCase({ ...newUseCase, solution });
                    }
                  }}
                  placeholder="Explain the AI solution you implemented and how it addressed the challenge..."
                  rows={3}
                />
              </div>
              
              {/* Results & Metrics - This is where the magic happens! */}
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Measurable Results & Impact
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="roi_percentage">ROI Percentage</Label>
                    <Input
                      id="roi_percentage"
                      value={selectedUseCase ? selectedUseCase.results?.roi_percentage || '' : newUseCase.results.roi_percentage}
                      onChange={(e) => {
                        const roi_percentage = e.target.value;
                        if (selectedUseCase) {
                          setSelectedUseCase({ 
                            ...selectedUseCase, 
                            results: { ...selectedUseCase.results, roi_percentage } 
                          });
                        } else {
                          setNewUseCase({ 
                            ...newUseCase, 
                            results: { ...newUseCase.results, roi_percentage } 
                          });
                        }
                      }}
                      placeholder="e.g., 250"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cost_reduction">Cost Reduction</Label>
                    <Input
                      id="cost_reduction"
                      value={selectedUseCase ? selectedUseCase.results?.cost_reduction || '' : newUseCase.results.cost_reduction}
                      onChange={(e) => {
                        const cost_reduction = e.target.value;
                        if (selectedUseCase) {
                          setSelectedUseCase({ 
                            ...selectedUseCase, 
                            results: { ...selectedUseCase.results, cost_reduction } 
                          });
                        } else {
                          setNewUseCase({ 
                            ...newUseCase, 
                            results: { ...newUseCase.results, cost_reduction } 
                          });
                        }
                      }}
                      placeholder="e.g., $150K annually"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time_saved">Time Savings</Label>
                    <Input
                      id="time_saved"
                      value={selectedUseCase ? selectedUseCase.results?.time_saved || '' : newUseCase.results.time_saved}
                      onChange={(e) => {
                        const time_saved = e.target.value;
                        if (selectedUseCase) {
                          setSelectedUseCase({ 
                            ...selectedUseCase, 
                            results: { ...selectedUseCase.results, time_saved } 
                          });
                        } else {
                          setNewUseCase({ 
                            ...newUseCase, 
                            results: { ...newUseCase.results, time_saved } 
                          });
                        }
                      }}
                      placeholder="e.g., 75% faster processing"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="efficiency_gain">Efficiency Improvement</Label>
                    <Input
                      id="efficiency_gain"
                      value={selectedUseCase ? selectedUseCase.results?.efficiency_gain || '' : newUseCase.results.efficiency_gain}
                      onChange={(e) => {
                        const efficiency_gain = e.target.value;
                        if (selectedUseCase) {
                          setSelectedUseCase({ 
                            ...selectedUseCase, 
                            results: { ...selectedUseCase.results, efficiency_gain } 
                          });
                        } else {
                          setNewUseCase({ 
                            ...newUseCase, 
                            results: { ...newUseCase.results, efficiency_gain } 
                          });
                        }
                      }}
                      placeholder="e.g., 3x productivity gain"
                    />
                  </div>
                </div>
                
                {/* Custom Metrics */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Custom Metrics</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addCustomMetric}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add Metric
                    </Button>
                  </div>
                  
                  {(selectedUseCase?.results?.custom_metrics || newUseCase.results.custom_metrics).map((metric, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                      <Input
                        placeholder="Metric name"
                        value={metric.metric}
                        onChange={(e) => {
                          const metrics = [...(selectedUseCase?.results?.custom_metrics || newUseCase.results.custom_metrics)];
                          metrics[index] = { ...metrics[index], metric: e.target.value };
                          if (selectedUseCase) {
                            setSelectedUseCase({ 
                              ...selectedUseCase, 
                              results: { ...selectedUseCase.results, custom_metrics: metrics } 
                            });
                          } else {
                            setNewUseCase({ 
                              ...newUseCase, 
                              results: { ...newUseCase.results, custom_metrics: metrics } 
                            });
                          }
                        }}
                      />
                      <Input
                        placeholder="Value"
                        value={metric.value}
                        onChange={(e) => {
                          const metrics = [...(selectedUseCase?.results?.custom_metrics || newUseCase.results.custom_metrics)];
                          metrics[index] = { ...metrics[index], value: e.target.value };
                          if (selectedUseCase) {
                            setSelectedUseCase({ 
                              ...selectedUseCase, 
                              results: { ...selectedUseCase.results, custom_metrics: metrics } 
                            });
                          } else {
                            setNewUseCase({ 
                              ...newUseCase, 
                              results: { ...newUseCase.results, custom_metrics: metrics } 
                            });
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        <Input
                          placeholder="Description"
                          value={metric.description}
                          onChange={(e) => {
                            const metrics = [...(selectedUseCase?.results?.custom_metrics || newUseCase.results.custom_metrics)];
                            metrics[index] = { ...metrics[index], description: e.target.value };
                            if (selectedUseCase) {
                              setSelectedUseCase({ 
                                ...selectedUseCase, 
                                results: { ...selectedUseCase.results, custom_metrics: metrics } 
                              });
                            } else {
                              setNewUseCase({ 
                                ...newUseCase, 
                                results: { ...newUseCase.results, custom_metrics: metrics } 
                              });
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCustomMetric(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags & Implementation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={selectedUseCase ? selectedUseCase.tags?.join(', ') || '' : newUseCase.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      if (selectedUseCase) {
                        setSelectedUseCase({ ...selectedUseCase, tags });
                      } else {
                        setNewUseCase({ ...newUseCase, tags });
                      }
                    }}
                    placeholder="automation, ml, optimization, process-improvement"
                  />
                </div>
                
                <div>
                  <Label htmlFor="implementation_time">Implementation Time</Label>
                  <Input
                    id="implementation_time"
                    value={selectedUseCase ? selectedUseCase.metrics?.implementation_time || '' : newUseCase.metrics.implementation_time}
                    onChange={(e) => {
                      const implementation_time = e.target.value;
                      if (selectedUseCase) {
                        setSelectedUseCase({ 
                          ...selectedUseCase, 
                          metrics: { ...selectedUseCase.metrics, implementation_time } 
                        });
                      } else {
                        setNewUseCase({ 
                          ...newUseCase, 
                          metrics: { ...newUseCase.metrics, implementation_time } 
                        });
                      }
                    }}
                    placeholder="e.g., 6 weeks, 3 months"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUseCase ? selectedUseCase.is_featured : newUseCase.is_featured}
                    onChange={(e) => {
                      const is_featured = e.target.checked;
                      if (selectedUseCase) {
                        setSelectedUseCase({ ...selectedUseCase, is_featured });
                      } else {
                        setNewUseCase({ ...newUseCase, is_featured });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Featured Success Story</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUseCase ? selectedUseCase.is_published : newUseCase.is_published}
                    onChange={(e) => {
                      const is_published = e.target.checked;
                      if (selectedUseCase) {
                        setSelectedUseCase({ ...selectedUseCase, is_published });
                      } else {
                        setNewUseCase({ ...newUseCase, is_published });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Publish Immediately</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedUseCase(null);
                    setNewUseCase({
                      title: '',
                      slug: '',
                      industry: '',
                      challenge: '',
                      solution: '',
                      results: {
                        cost_reduction: '',
                        time_saved: '',
                        efficiency_gain: '',
                        roi_percentage: '',
                        custom_metrics: []
                      },
                      metrics: {
                        implementation_time: '',
                        team_size: '',
                        complexity_level: 'Medium'
                      },
                      client_name: '',
                      client_logo: '',
                      featured_image: '',
                      tags: [],
                      is_featured: false,
                      is_published: true,
                      order_index: 0,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedUseCase) {
                      handleUpdateUseCase(selectedUseCase.id, selectedUseCase);
                    } else {
                      handleCreateUseCase();
                    }
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {selectedUseCase ? 'Update Success Story' : 'Create Success Story'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UseCasesManagement;