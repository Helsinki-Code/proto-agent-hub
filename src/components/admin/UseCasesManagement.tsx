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
  Search, 
  TrendingUp,
  Building2,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Save,
  X,
  Star,
  Eye,
  Calendar,
  Target,
  BarChart3,
  Award
} from 'lucide-react';

interface UseCase {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: {
    efficiency: string;
    accuracy: string;
    cost: string;
    roi?: string;
  };
  technologies: string[];
  teamSize: string;
  duration: string;
  timeline: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  featured: boolean;
  published: boolean;
  status: 'draft' | 'review' | 'published' | 'archived';
  category: 'automation' | 'analysis' | 'optimization' | 'integration' | 'strategy';
  tags: string[];
  images: string[];
  createdDate: string;
  updatedDate: string;
  publishedDate?: string;
}

const UseCasesManagement = () => {
  const { toast } = useToast();
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [filteredUseCases, setFilteredUseCases] = useState<UseCase[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUseCase, setEditingUseCase] = useState<UseCase | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample use cases data
  useEffect(() => {
    const sampleUseCases: UseCase[] = [
      {
        id: '1',
        title: 'Automated Loan Processing Revolution',
        clientName: 'SecureBank Financial',
        industry: 'Finance',
        description: 'Complete automation of loan application processing using AI agents for document verification, risk assessment, and approval workflows.',
        challenge: 'Manual loan processing took 14 days on average, with high error rates and inconsistent decision-making across different loan officers.',
        solution: 'Deployed intelligent AI agents to handle document verification, credit scoring, risk assessment, and automated approval for qualifying applications.',
        results: 'Reduced processing time from 14 days to 2 hours for standard applications, improved accuracy to 99.2%, and increased customer satisfaction by 85%.',
        metrics: {
          efficiency: '75% faster processing',
          accuracy: '99.2% accuracy rate',
          cost: '60% cost reduction',
          roi: '340% ROI in first year'
        },
        technologies: ['LangChain', 'Python', 'PostgreSQL', 'FastAPI', 'OCR'],
        teamSize: '4 specialists',
        duration: '3 months',
        timeline: 'Q4 2023 - Q1 2024',
        testimonial: {
          quote: 'The AI loan processing system has transformed our operations. We\'re now processing 5x more applications with better accuracy.',
          author: 'Sarah Johnson',
          position: 'VP of Operations, SecureBank Financial'
        },
        featured: true,
        published: true,
        status: 'published',
        category: 'automation',
        tags: ['Finance', 'Automation', 'Document Processing', 'Risk Assessment'],
        images: ['/case-studies/securebank-dashboard.jpg', '/case-studies/securebank-workflow.jpg'],
        createdDate: '2024-01-15',
        updatedDate: '2024-01-15',
        publishedDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Healthcare Care Coordination AI',
        clientName: 'MedCenter Health System',
        industry: 'Healthcare',
        description: 'AI-powered patient care coordination system that manages appointments, treatment plans, and cross-departmental communication.',
        challenge: 'Poor coordination between departments led to delayed treatments, duplicate tests, and patient dissatisfaction.',
        solution: 'Implemented intelligent agents to coordinate care plans, schedule appointments, track patient progress, and facilitate communication between departments.',
        results: 'Improved patient satisfaction by 72%, reduced duplicate procedures by 85%, and decreased average treatment time by 40%.',
        metrics: {
          efficiency: '50% faster coordination',
          accuracy: '95% patient satisfaction',
          cost: '40% operational savings'
        },
        technologies: ['Node.js', 'React', 'MongoDB', 'WebSocket', 'HL7 FHIR'],
        teamSize: '6 specialists',
        duration: '4 months',
        timeline: 'Q3 2023 - Q4 2023',
        testimonial: {
          quote: 'Our patient care has never been more coordinated. The AI system ensures nothing falls through the cracks.',
          author: 'Dr. Michael Chen',
          position: 'Chief Medical Officer, MedCenter Health System'
        },
        featured: false,
        published: true,
        status: 'published',
        category: 'automation',
        tags: ['Healthcare', 'Coordination', 'Patient Care', 'Communication'],
        images: ['/case-studies/medcenter-interface.jpg'],
        createdDate: '2024-01-10',
        updatedDate: '2024-01-12',
        publishedDate: '2024-01-12'
      },
      {
        id: '3',
        title: 'Retail Dynamic Pricing Engine',
        clientName: 'GlobalMart Retail',
        industry: 'Retail',
        description: 'AI-driven dynamic pricing system that optimizes product prices in real-time based on demand, competition, and inventory levels.',
        challenge: 'Static pricing led to lost revenue opportunities and excess inventory, especially during seasonal fluctuations.',
        solution: 'Built intelligent pricing agents that analyze market conditions, competitor pricing, demand patterns, and inventory levels to optimize prices dynamically.',
        results: 'Increased revenue by 28%, reduced inventory waste by 45%, and improved profit margins by 22% across all product categories.',
        metrics: {
          efficiency: '30% revenue increase',
          accuracy: '85% demand forecast accuracy',
          cost: '25% inventory reduction'
        },
        technologies: ['Python', 'TensorFlow', 'Redis', 'Apache Kafka', 'Elasticsearch'],
        teamSize: '5 specialists',
        duration: '5 months',
        timeline: 'Q2 2023 - Q3 2023',
        featured: false,
        published: false,
        status: 'review',
        category: 'optimization',
        tags: ['Retail', 'Pricing', 'Machine Learning', 'Optimization'],
        images: ['/case-studies/globalmart-dashboard.jpg', '/case-studies/globalmart-analytics.jpg'],
        createdDate: '2024-01-08',
        updatedDate: '2024-01-08'
      }
    ];
    setUseCases(sampleUseCases);
    setFilteredUseCases(sampleUseCases);
  }, []);

  // Filter use cases
  useEffect(() => {
    let filtered = useCases;

    if (searchTerm) {
      filtered = filtered.filter(useCase => 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterIndustry !== 'all') {
      filtered = filtered.filter(useCase => useCase.industry === filterIndustry);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(useCase => useCase.status === filterStatus);
    }

    setFilteredUseCases(filtered);
  }, [useCases, searchTerm, filterIndustry, filterStatus]);

  const industries = ['Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Education', 'Technology'];
  const statuses = ['draft', 'review', 'published', 'archived'];
  const categories = ['automation', 'analysis', 'optimization', 'integration', 'strategy'];

  const handleCreateNew = () => {
    const newUseCase: UseCase = {
      id: Date.now().toString(),
      title: '',
      clientName: '',
      industry: 'Finance',
      description: '',
      challenge: '',
      solution: '',
      results: '',
      metrics: {
        efficiency: '',
        accuracy: '',
        cost: ''
      },
      technologies: [''],
      teamSize: '',
      duration: '',
      timeline: '',
      featured: false,
      published: false,
      status: 'draft',
      category: 'automation',
      tags: [''],
      images: [''],
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };
    setEditingUseCase(newUseCase);
    setIsEditing(true);
  };

  const handleEdit = (useCase: UseCase) => {
    setEditingUseCase({ ...useCase });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingUseCase) return;

    if (!editingUseCase.title || !editingUseCase.clientName || !editingUseCase.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in title, client name, and description before saving.",
        variant: "destructive",
      });
      return;
    }

    if (useCases.find(u => u.id === editingUseCase.id)) {
      setUseCases(useCases.map(u => u.id === editingUseCase.id ? editingUseCase : u));
      toast({
        title: "Use Case Updated! ✨",
        description: `"${editingUseCase.title}" has been saved successfully.`,
      });
    } else {
      setUseCases([editingUseCase, ...useCases]);
      toast({
        title: "New Use Case Created! 🎉",
        description: `"${editingUseCase.title}" has been added to your portfolio.`,
      });
    }

    setIsEditing(false);
    setEditingUseCase(null);
  };

  const handleDelete = (id: string) => {
    const useCase = useCases.find(u => u.id === id);
    setUseCases(useCases.filter(u => u.id !== id));
    toast({
      title: "Use Case Deleted",
      description: `"${useCase?.title}" has been removed from your portfolio.`,
      variant: "destructive",
    });
  };

  const handlePublish = (id: string) => {
    setUseCases(useCases.map(u => 
      u.id === id 
        ? { ...u, status: 'published' as const, published: true, publishedDate: new Date().toISOString().split('T')[0] }
        : u
    ));
    const useCase = useCases.find(u => u.id === id);
    toast({
      title: "Use Case Published! 🚀",
      description: `"${useCase?.title}" is now live on your website.`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation': return 'bg-blue-100 text-blue-700';
      case 'analysis': return 'bg-green-100 text-green-700';
      case 'optimization': return 'bg-purple-100 text-purple-700';
      case 'integration': return 'bg-orange-100 text-orange-700';
      case 'strategy': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'archived': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const publishedCount = useCases.filter(u => u.status === 'published').length;
  const draftCount = useCases.filter(u => u.status === 'draft').length;
  const featuredCount = useCases.filter(u => u.featured).length;

  if (isEditing && editingUseCase) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {useCases.find(u => u.id === editingUseCase.id) ? 'Edit Use Case' : 'Create New Use Case'}
            </h2>
            <p className="text-muted-foreground">
              {useCases.find(u => u.id === editingUseCase.id) ? 'Update your case study details' : 'Add a new success story to your portfolio'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Use Case
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Case Study Title</Label>
                  <Input
                    id="title"
                    value={editingUseCase.title}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, title: e.target.value })}
                    placeholder="Enter case study title..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={editingUseCase.clientName}
                      onChange={(e) => setEditingUseCase({ ...editingUseCase, clientName: e.target.value })}
                      placeholder="Client company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <select
                      id="industry"
                      value={editingUseCase.industry}
                      onChange={(e) => setEditingUseCase({ ...editingUseCase, industry: e.target.value })}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={editingUseCase.description}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, description: e.target.value })}
                    placeholder="Brief overview of the project..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenge, Solution & Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="challenge">Challenge</Label>
                  <Textarea
                    id="challenge"
                    value={editingUseCase.challenge}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, challenge: e.target.value })}
                    placeholder="What problem did the client face?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea
                    id="solution"
                    value={editingUseCase.solution}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, solution: e.target.value })}
                    placeholder="How did you solve it?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="results">Results</Label>
                  <Textarea
                    id="results"
                    value={editingUseCase.results}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, results: e.target.value })}
                    placeholder="What were the outcomes?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="efficiency">Efficiency Improvement</Label>
                    <Input
                      id="efficiency"
                      value={editingUseCase.metrics.efficiency}
                      onChange={(e) => setEditingUseCase({ 
                        ...editingUseCase, 
                        metrics: { ...editingUseCase.metrics, efficiency: e.target.value }
                      })}
                      placeholder="75% faster processing"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accuracy">Accuracy/Quality</Label>
                    <Input
                      id="accuracy"
                      value={editingUseCase.metrics.accuracy}
                      onChange={(e) => setEditingUseCase({ 
                        ...editingUseCase, 
                        metrics: { ...editingUseCase.metrics, accuracy: e.target.value }
                      })}
                      placeholder="99.2% accuracy rate"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cost">Cost Impact</Label>
                    <Input
                      id="cost"
                      value={editingUseCase.metrics.cost}
                      onChange={(e) => setEditingUseCase({ 
                        ...editingUseCase, 
                        metrics: { ...editingUseCase.metrics, cost: e.target.value }
                      })}
                      placeholder="60% cost reduction"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roi">ROI (Optional)</Label>
                    <Input
                      id="roi"
                      value={editingUseCase.metrics.roi || ''}
                      onChange={(e) => setEditingUseCase({ 
                        ...editingUseCase, 
                        metrics: { ...editingUseCase.metrics, roi: e.target.value }
                      })}
                      placeholder="340% ROI in first year"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Section */}
            <Card>
              <CardHeader>
                <CardTitle>Client Testimonial (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="testimonialQuote">Quote</Label>
                  <Textarea
                    id="testimonialQuote"
                    value={editingUseCase.testimonial?.quote || ''}
                    onChange={(e) => setEditingUseCase({ 
                      ...editingUseCase, 
                      testimonial: { 
                        ...editingUseCase.testimonial,
                        quote: e.target.value,
                        author: editingUseCase.testimonial?.author || '',
                        position: editingUseCase.testimonial?.position || ''
                      }
                    })}
                    placeholder="Client testimonial quote..."
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="testimonialAuthor">Author Name</Label>
                    <Input
                      id="testimonialAuthor"
                      value={editingUseCase.testimonial?.author || ''}
                      onChange={(e) => setEditingUseCase({ 
                        ...editingUseCase, 
                        testimonial: { 
                          ...editingUseCase.testimonial,
                          quote: editingUseCase.testimonial?.quote || '',
                          author: e.target.value,
                          position: editingUseCase.testimonial?.position || ''
                        }
                      })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="testimonialPosition">Position</Label>
                    <Input
                      id="testimonialPosition"
                      value={editingUseCase.testimonial?.position || ''}
                      onChange={(e) => setEditingUseCase({ 
                        ...editingUseCase, 
                        testimonial: { 
                          ...editingUseCase.testimonial,
                          quote: editingUseCase.testimonial?.quote || '',
                          author: editingUseCase.testimonial?.author || '',
                          position: e.target.value
                        }
                      })}
                      placeholder="CEO, Company Name"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={editingUseCase.category}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, category: e.target.value as any })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={editingUseCase.status}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, status: e.target.value as any })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      value={editingUseCase.teamSize}
                      onChange={(e) => setEditingUseCase({ ...editingUseCase, teamSize: e.target.value })}
                      placeholder="4 specialists"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={editingUseCase.duration}
                      onChange={(e) => setEditingUseCase({ ...editingUseCase, duration: e.target.value })}
                      placeholder="3 months"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={editingUseCase.timeline}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, timeline: e.target.value })}
                    placeholder="Q4 2023 - Q1 2024"
                  />
                </div>

                <div>
                  <Label>Technologies</Label>
                  <Input
                    value={editingUseCase.technologies.join(', ')}
                    onChange={(e) => setEditingUseCase({ 
                      ...editingUseCase, 
                      technologies: e.target.value.split(',').map(tech => tech.trim()).filter(Boolean)
                    })}
                    placeholder="LangChain, Python, FastAPI"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <Input
                    value={editingUseCase.tags.join(', ')}
                    onChange={(e) => setEditingUseCase({ 
                      ...editingUseCase, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                    placeholder="Finance, Automation, AI"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingUseCase.featured}
                    onChange={(e) => setEditingUseCase({ ...editingUseCase, featured: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Case Study</Label>
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
          <h2 className="text-2xl font-bold">Use Cases Gallery</h2>
          <p className="text-muted-foreground">Manage client success stories and case studies</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Use Case
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-xl font-bold">{useCases.length}</p>
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
              <Star className="w-5 h-5 text-purple-600" />
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
                  placeholder="Search use cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
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
          </div>
        </CardContent>
      </Card>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUseCases.map((useCase) => (
          <Card key={useCase.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(useCase.category)}>
                    {useCase.category}
                  </Badge>
                  <Badge variant="outline">
                    {useCase.industry}
                  </Badge>
                  {useCase.featured && (
                    <Badge className="bg-yellow-100 text-yellow-700">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <Badge className={getStatusColor(useCase.status)}>
                  {useCase.status}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">Client: {useCase.clientName}</p>
              <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="font-medium text-blue-700">{useCase.metrics.efficiency}</div>
                  <div className="text-blue-600">Efficiency</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-medium text-green-700">{useCase.metrics.accuracy}</div>
                  <div className="text-green-600">Accuracy</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="font-medium text-purple-700">{useCase.metrics.cost}</div>
                  <div className="text-purple-600">Cost Impact</div>
                </div>
              </div>

              {/* Project Details */}
              <div className="text-xs text-muted-foreground space-y-1 mb-4">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{useCase.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Team Size:</span>
                  <span>{useCase.teamSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span>{useCase.timeline}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {useCase.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {useCase.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{useCase.technologies.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={() => handleEdit(useCase)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                {useCase.status === 'draft' && (
                  <Button variant="outline" size="sm" onClick={() => handlePublish(useCase.id)}>
                    <Eye className="w-3 h-3 mr-1" />
                    Publish
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(useCase.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUseCases.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No use cases found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterIndustry !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first use case to get started'
              }
            </p>
            {(!searchTerm && filterIndustry === 'all' && filterStatus === 'all') && (
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Use Case
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UseCasesManagement;