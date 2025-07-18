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
  Briefcase,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  Save,
  X,
  Star,
  TrendingUp,
  Eye,
  Settings
} from 'lucide-react';

interface ServiceFeature {
  feature: string;
  included: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'automation' | 'strategy' | 'integration' | 'deployment' | 'training';
  pricing: {
    startingPrice: string;
    priceType: 'monthly' | 'project' | 'hourly' | 'custom';
    currency: string;
  };
  features: ServiceFeature[];
  duration: string;
  teamSize: string;
  deliverables: string[];
  technologies: string[];
  clientsServed: number;
  avgRating: number;
  featured: boolean;
  popular: boolean;
  status: 'active' | 'draft' | 'discontinued';
  createdDate: string;
  updatedDate: string;
}

const ServicesManagement = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample services data
  useEffect(() => {
    const sampleServices: Service[] = [
      {
        id: '1',
        title: 'Workflow Automation',
        description: 'Transform your business processes with intelligent automation that learns, adapts, and scales automatically.',
        shortDescription: 'Intelligent process automation with AI agents',
        category: 'automation',
        pricing: {
          startingPrice: '5000',
          priceType: 'monthly',
          currency: 'USD'
        },
        features: [
          { feature: 'Process discovery and mapping', included: true },
          { feature: 'Intelligent document processing', included: true },
          { feature: 'Multi-system integration', included: true },
          { feature: 'Real-time monitoring', included: true },
          { feature: 'Custom AI models', included: false }
        ],
        duration: '2-4 weeks implementation',
        teamSize: '3-5 specialists',
        deliverables: ['Automation strategy', 'Deployed AI agents', 'Training materials', 'Support documentation'],
        technologies: ['LangChain', 'Python', 'REST APIs', 'Docker'],
        clientsServed: 47,
        avgRating: 4.8,
        featured: true,
        popular: true,
        status: 'active',
        createdDate: '2024-01-15',
        updatedDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'LLM Integration',
        description: 'Seamlessly integrate large language models into your existing systems and workflows for enhanced capabilities.',
        shortDescription: 'Professional LLM integration and optimization',
        category: 'integration',
        pricing: {
          startingPrice: '3000',
          priceType: 'monthly',
          currency: 'USD'
        },
        features: [
          { feature: 'Multi-model support (GPT, Claude, Gemini)', included: true },
          { feature: 'Cost optimization strategies', included: true },
          { feature: 'Security and compliance setup', included: true },
          { feature: 'Performance monitoring', included: true },
          { feature: 'Custom fine-tuning', included: false }
        ],
        duration: '1-3 weeks implementation',
        teamSize: '2-4 specialists',
        deliverables: ['Integration architecture', 'API management system', 'Cost optimization tools', 'Monitoring dashboard'],
        technologies: ['OpenAI API', 'Anthropic Claude', 'FastAPI', 'PostgreSQL'],
        clientsServed: 32,
        avgRating: 4.7,
        featured: false,
        popular: true,
        status: 'active',
        createdDate: '2024-01-10',
        updatedDate: '2024-01-12'
      },
      {
        id: '3',
        title: 'AI Strategy Consulting',
        description: 'Develop a comprehensive AI strategy that aligns with your business objectives and growth plans.',
        shortDescription: 'Strategic AI planning and roadmap development',
        category: 'strategy',
        pricing: {
          startingPrice: '10000',
          priceType: 'project',
          currency: 'USD'
        },
        features: [
          { feature: 'AI readiness assessment', included: true },
          { feature: 'Strategic roadmap development', included: true },
          { feature: 'ROI analysis and business case', included: true },
          { feature: 'Change management support', included: true },
          { feature: 'Ongoing consulting retainer', included: false }
        ],
        duration: '4-6 weeks',
        teamSize: '2-3 consultants',
        deliverables: ['Strategy document', 'Implementation roadmap', 'ROI projections', 'Change management plan'],
        technologies: ['Strategic frameworks', 'Business analysis', 'Market research'],
        clientsServed: 28,
        avgRating: 4.9,
        featured: false,
        popular: false,
        status: 'active',
        createdDate: '2024-01-08',
        updatedDate: '2024-01-08'
      }
    ];
    setServices(sampleServices);
    setFilteredServices(sampleServices);
  }, []);

  // Filter services
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(service => service.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(service => service.status === filterStatus);
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, filterCategory, filterStatus]);

  const categories = ['automation', 'strategy', 'integration', 'deployment', 'training'];
  const statuses = ['active', 'draft', 'discontinued'];

  const handleCreateNew = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: '',
      description: '',
      shortDescription: '',
      category: 'automation',
      pricing: {
        startingPrice: '5000',
        priceType: 'monthly',
        currency: 'USD'
      },
      features: [
        { feature: '', included: true }
      ],
      duration: '',
      teamSize: '',
      deliverables: [''],
      technologies: [''],
      clientsServed: 0,
      avgRating: 0,
      featured: false,
      popular: false,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };
    setEditingService(newService);
    setIsEditing(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService({ ...service });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingService) return;

    if (!editingService.title || !editingService.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and description before saving.",
        variant: "destructive",
      });
      return;
    }

    if (services.find(s => s.id === editingService.id)) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      toast({
        title: "Service Updated! ✨",
        description: `"${editingService.title}" has been saved successfully.`,
      });
    } else {
      setServices([editingService, ...services]);
      toast({
        title: "New Service Created! 🎉",
        description: `"${editingService.title}" has been added to your portfolio.`,
      });
    }

    setIsEditing(false);
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    const service = services.find(s => s.id === id);
    setServices(services.filter(s => s.id !== id));
    toast({
      title: "Service Deleted",
      description: `"${service?.title}" has been removed from your portfolio.`,
      variant: "destructive",
    });
  };

  const addFeature = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: [...editingService.features, { feature: '', included: true }]
    });
  };

  const removeFeature = (index: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: editingService.features.filter((_, i) => i !== index)
    });
  };

  const addDeliverable = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      deliverables: [...editingService.deliverables, '']
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation': return 'bg-blue-100 text-blue-700';
      case 'strategy': return 'bg-green-100 text-green-700';
      case 'integration': return 'bg-purple-100 text-purple-700';
      case 'deployment': return 'bg-orange-100 text-orange-700';
      case 'training': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalRevenue = services.reduce((sum, service) => 
    sum + (parseInt(service.pricing.startingPrice) * service.clientsServed), 0
  );
  const activeCount = services.filter(s => s.status === 'active').length;
  const totalClients = services.reduce((sum, service) => sum + service.clientsServed, 0);

  if (isEditing && editingService) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Create New Service'}
            </h2>
            <p className="text-muted-foreground">
              {services.find(s => s.id === editingService.id) ? 'Update your service details' : 'Add a new service to your portfolio'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Service
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    placeholder="Enter service title..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={editingService.shortDescription}
                    onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                    placeholder="Brief one-line description..."
                  />
                </div>

                <div>
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    placeholder="Detailed service description..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={editingService.duration}
                      onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                      placeholder="2-4 weeks implementation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      value={editingService.teamSize}
                      onChange={(e) => setEditingService({ ...editingService, teamSize: e.target.value })}
                      placeholder="3-5 specialists"
                    />
                  </div>
                </div>

                <div>
                  <Label>Technologies</Label>
                  <Input
                    value={editingService.technologies.join(', ')}
                    onChange={(e) => setEditingService({ 
                      ...editingService, 
                      technologies: e.target.value.split(',').map(tech => tech.trim()).filter(Boolean)
                    })}
                    placeholder="LangChain, Python, FastAPI"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features & Deliverables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Service Features</Label>
                  <div className="space-y-2">
                    {editingService.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={feature.feature}
                          onChange={(e) => {
                            const newFeatures = [...editingService.features];
                            newFeatures[index].feature = e.target.value;
                            setEditingService({ ...editingService, features: newFeatures });
                          }}
                          placeholder="Feature description"
                          className="flex-1"
                        />
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={feature.included}
                            onChange={(e) => {
                              const newFeatures = [...editingService.features];
                              newFeatures[index].included = e.target.checked;
                              setEditingService({ ...editingService, features: newFeatures });
                            }}
                          />
                          <span className="text-sm">Included</span>
                        </label>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeFeature(index)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addFeature}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Deliverables</Label>
                  <div className="space-y-2">
                    {editingService.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={deliverable}
                          onChange={(e) => {
                            const newDeliverables = [...editingService.deliverables];
                            newDeliverables[index] = e.target.value;
                            setEditingService({ ...editingService, deliverables: newDeliverables });
                          }}
                          placeholder="Deliverable description"
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setEditingService({
                              ...editingService,
                              deliverables: editingService.deliverables.filter((_, i) => i !== index)
                            });
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addDeliverable}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Deliverable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
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
                    value={editingService.status}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editingService.featured}
                      onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                    />
                    <Label htmlFor="featured">Featured Service</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="popular"
                      checked={editingService.popular}
                      onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                    />
                    <Label htmlFor="popular">Popular Service</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="startingPrice">Starting Price</Label>
                  <Input
                    id="startingPrice"
                    value={editingService.pricing.startingPrice}
                    onChange={(e) => setEditingService({ 
                      ...editingService, 
                      pricing: { ...editingService.pricing, startingPrice: e.target.value }
                    })}
                    placeholder="5000"
                  />
                </div>

                <div>
                  <Label htmlFor="priceType">Price Type</Label>
                  <select
                    id="priceType"
                    value={editingService.pricing.priceType}
                    onChange={(e) => setEditingService({ 
                      ...editingService, 
                      pricing: { ...editingService.pricing, priceType: e.target.value as any }
                    })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="project">Project</option>
                    <option value="hourly">Hourly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={editingService.pricing.currency}
                    onChange={(e) => setEditingService({ 
                      ...editingService, 
                      pricing: { ...editingService.pricing, currency: e.target.value }
                    })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Services Portfolio</h2>
          <p className="text-muted-foreground">Manage your service offerings, pricing, and features</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <p className="text-xl font-bold">{services.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Est. Revenue</p>
                <p className="text-xl font-bold">${(totalRevenue / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Clients Served</p>
                <p className="text-xl font-bold">{totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{activeCount}</p>
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
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
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

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    {service.featured && (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {service.popular && (
                      <Badge className="bg-red-100 text-red-700">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    <Badge className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                    <div>
                      <span className="font-medium">Pricing:</span><br />
                      ${service.pricing.startingPrice}/{service.pricing.priceType}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span><br />
                      {service.duration}
                    </div>
                    <div>
                      <span className="font-medium">Team Size:</span><br />
                      {service.teamSize}
                    </div>
                    <div>
                      <span className="font-medium">Clients:</span><br />
                      {service.clientsServed} served
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Key Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature.included ? '✓' : '✗'} {feature.feature}
                          </Badge>
                        ))}
                        {service.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{service.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Technologies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                  <Badge variant={service.status === 'active' ? 'default' : 'secondary'} className="text-center">
                    {service.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No services found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first service to get started'
              }
            </p>
            {(!searchTerm && filterCategory === 'all' && filterStatus === 'all') && (
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Service
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicesManagement;