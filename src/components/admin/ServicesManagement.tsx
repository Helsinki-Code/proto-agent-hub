import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase, Service, subscribeToTable } from '@/lib/supabase';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Briefcase, 
  Edit, 
  Save, 
  Plus, 
  Search, 
  Star,
  Trash2,
  DollarSign,
  Settings,
  TrendingUp,
  Users,
  Zap,
  Shield,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Package
} from 'lucide-react';

const ServicesManagement = () => {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [newService, setNewService] = useState({
    name: '',
    slug: '',
    short_description: '',
    full_description: '',
    features: { features: [] as string[], benefits: [] as string[] },
    pricing: { 
      type: 'custom', 
      starting_price: '', 
      currency: 'USD',
      billing_cycle: 'monthly',
      includes: [] as string[]
    },
    icon: 'Briefcase',
    category: '',
    is_featured: false,
    is_active: true,
    order_index: 0,
    meta_title: '',
    meta_description: '',
  });

  const serviceCategories = [
    'Automation',
    'Consulting', 
    'Development',
    'Integration',
    'Training',
    'Support',
    'Custom'
  ];

  const iconOptions = [
    'Briefcase', 'Zap', 'Shield', 'Settings', 'TrendingUp', 
    'Users', 'Package', 'Cpu', 'Database', 'Globe'
  ];

  const pricingTypes = [
    { value: 'custom', label: 'Custom Quote' },
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'project', label: 'Project-Based' }
  ];

  // Load services on mount
  useEffect(() => {
    loadServices();
    
    // Set up real-time subscription
    const servicesSubscription = subscribeToTable('services', () => {
      loadServices();
    });

    return () => {
      servicesSubscription.unsubscribe();
    };
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error loading services:', error);
        toast({
          title: "Error Loading Services",
          description: "Failed to load services from database.",
          variant: "destructive",
        });
        return;
      }

      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleCreateService = async () => {
    if (!newService.name || !newService.short_description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in service name and short description.",
        variant: "destructive",
      });
      return;
    }

    const slug = newService.slug || generateSlug(newService.name);
    
    try {
      // Get the next order index
      const maxOrder = Math.max(...services.map(s => s.order_index), -1);
      
      const { data, error } = await supabase
        .from('services')
        .insert({
          ...newService,
          slug,
          order_index: maxOrder + 1,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating service:', error);
        toast({
          title: "Error Creating Service",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Service Created! 🎉",
        description: `"${newService.name}" has been added to your service portfolio.`,
      });

      // Reset form
      setNewService({
        name: '',
        slug: '',
        short_description: '',
        full_description: '',
        features: { features: [], benefits: [] },
        pricing: { 
          type: 'custom', 
          starting_price: '', 
          currency: 'USD',
          billing_cycle: 'monthly',
          includes: []
        },
        icon: 'Briefcase',
        category: '',
        is_featured: false,
        is_active: true,
        order_index: 0,
        meta_title: '',
        meta_description: '',
      });

      setIsEditing(false);
      loadServices();
    } catch (error) {
      console.error('Error creating service:', error);
      toast({
        title: "Error",
        description: "Failed to create service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateService = async (serviceId: string, updates: Partial<Service>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', serviceId);

      if (error) {
        console.error('Error updating service:', error);
        toast({
          title: "Error Updating Service",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Service Updated! ✅",
        description: "Changes have been saved successfully.",
      });

      loadServices();
      setSelectedService(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (serviceId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) {
        console.error('Error deleting service:', error);
        toast({
          title: "Error Deleting Service",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Service Deleted",
        description: `"${name}" has been permanently deleted.`,
      });

      loadServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (serviceId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_featured: !currentStatus })
        .eq('id', serviceId);

      if (error) {
        console.error('Error updating featured status:', error);
        return;
      }

      toast({
        title: !currentStatus ? "Service Featured! ⭐" : "Removed from Featured",
        description: !currentStatus 
          ? "This service will now appear in featured sections."
          : "This service has been removed from featured sections.",
      });

      loadServices();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleToggleActive = async (serviceId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !currentStatus })
        .eq('id', serviceId);

      if (error) {
        console.error('Error updating active status:', error);
        return;
      }

      toast({
        title: !currentStatus ? "Service Activated! ✅" : "Service Deactivated",
        description: !currentStatus 
          ? "This service is now visible to visitors."
          : "This service has been hidden from public view.",
      });

      loadServices();
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  const handleReorderService = async (serviceId: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === serviceId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= services.length) return;

    const currentService = services[currentIndex];
    const swapService = services[newIndex];

    try {
      // Swap order indices
      await Promise.all([
        supabase
          .from('services')
          .update({ order_index: swapService.order_index })
          .eq('id', currentService.id),
        supabase
          .from('services')
          .update({ order_index: currentService.order_index })
          .eq('id', swapService.id)
      ]);

      loadServices();
    } catch (error) {
      console.error('Error reordering services:', error);
      toast({
        title: "Error",
        description: "Failed to reorder services.",
        variant: "destructive",
      });
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && service.is_active) ||
                         (filterStatus === 'inactive' && !service.is_active);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatPrice = (pricing: any) => {
    if (!pricing || pricing.type === 'custom') return 'Custom Quote';
    if (pricing.starting_price) {
      return `${pricing.currency} ${pricing.starting_price}${pricing.billing_cycle ? `/${pricing.billing_cycle}` : ''}`;
    }
    return 'Contact for Pricing';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading services management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Manage your service offerings and pricing strategies</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.is_active).length}
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
                  {services.filter(s => s.is_featured).length}
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
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(services.map(s => s.category).filter(Boolean)).size}
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
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
                  placeholder="Search services by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                {serviceCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid gap-4">
        {filteredServices.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No services found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by adding your first service offering.'
                }
              </p>
              {!searchTerm && filterCategory === 'all' && filterStatus === 'all' && (
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Service
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredServices.map((service, index) => (
            <Card key={service.id} className={`hover:shadow-md transition-shadow ${!service.is_active ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                          {service.is_featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                          {!service.is_active && (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                          {service.category && (
                            <Badge variant="outline">{service.category}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {service.short_description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {formatPrice(service.pricing)}
                        </span>
                        <span>Order: #{service.order_index + 1}</span>
                        {service.features?.features && (
                          <span>{service.features.features.length} features</span>
                        )}
                      </div>
                      
                      {service.features?.features && service.features.features.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {service.features.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {service.features.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{service.features.features.length - 3} more
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
                        onClick={() => handleReorderService(service.id, 'up')}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReorderService(service.id, 'down')}
                        disabled={index === filteredServices.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    {/* Action buttons */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFeatured(service.id, service.is_featured)}
                      className={service.is_featured ? "text-yellow-600" : ""}
                    >
                      <Star className={`w-4 h-4 ${service.is_featured ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(service.id, service.is_active)}
                      className={service.is_active ? "text-green-600" : "text-gray-600"}
                    >
                      {service.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedService(service);
                        setIsEditing(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteService(service.id, service.name)}
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

      {/* Create/Edit Service Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {selectedService ? 'Edit Service' : 'Add New Service'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={selectedService ? selectedService.name : newService.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      if (selectedService) {
                        setSelectedService({ ...selectedService, name });
                      } else {
                        setNewService({ ...newService, name, slug: generateSlug(name) });
                      }
                    }}
                    placeholder="Enter service name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={selectedService ? selectedService.slug : newService.slug}
                    onChange={(e) => {
                      const slug = e.target.value;
                      if (selectedService) {
                        setSelectedService({ ...selectedService, slug });
                      } else {
                        setNewService({ ...newService, slug });
                      }
                    }}
                    placeholder="service-url-slug"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="short_description">Short Description *</Label>
                <Textarea
                  id="short_description"
                  value={selectedService ? selectedService.short_description || '' : newService.short_description}
                  onChange={(e) => {
                    const short_description = e.target.value;
                    if (selectedService) {
                      setSelectedService({ ...selectedService, short_description });
                    } else {
                      setNewService({ ...newService, short_description });
                    }
                  }}
                  placeholder="Brief description that appears in service cards"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="full_description">Full Description</Label>
                <Textarea
                  id="full_description"
                  value={selectedService ? selectedService.full_description || '' : newService.full_description}
                  onChange={(e) => {
                    const full_description = e.target.value;
                    if (selectedService) {
                      setSelectedService({ ...selectedService, full_description });
                    } else {
                      setNewService({ ...newService, full_description });
                    }
                  }}
                  placeholder="Detailed description for the service page"
                  rows={4}
                />
              </div>
              
              {/* Features & Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    value={selectedService ? selectedService.features?.features?.join('\n') || '' : newService.features.features.join('\n')}
                    onChange={(e) => {
                      const features = e.target.value.split('\n').filter(f => f.trim());
                      if (selectedService) {
                        setSelectedService({ 
                          ...selectedService, 
                          features: { ...selectedService.features, features } 
                        });
                      } else {
                        setNewService({ 
                          ...newService, 
                          features: { ...newService.features, features } 
                        });
                      }
                    }}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    rows={5}
                  />
                </div>
                
                <div>
                  <Label htmlFor="benefits">Benefits (one per line)</Label>
                  <Textarea
                    id="benefits"
                    value={selectedService ? selectedService.features?.benefits?.join('\n') || '' : newService.features.benefits.join('\n')}
                    onChange={(e) => {
                      const benefits = e.target.value.split('\n').filter(b => b.trim());
                      if (selectedService) {
                        setSelectedService({ 
                          ...selectedService, 
                          features: { ...selectedService.features, benefits } 
                        });
                      } else {
                        setNewService({ 
                          ...newService, 
                          features: { ...newService.features, benefits } 
                        });
                      }
                    }}
                    placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                    rows={5}
                  />
                </div>
              </div>
              
              {/* Pricing & Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pricing_type">Pricing Type</Label>
                  <select
                    id="pricing_type"
                    value={selectedService ? selectedService.pricing?.type || 'custom' : newService.pricing.type}
                    onChange={(e) => {
                      const type = e.target.value;
                      if (selectedService) {
                        setSelectedService({ 
                          ...selectedService, 
                          pricing: { ...selectedService.pricing, type } 
                        });
                      } else {
                        setNewService({ 
                          ...newService, 
                          pricing: { ...newService.pricing, type } 
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    {pricingTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="starting_price">Starting Price</Label>
                  <Input
                    id="starting_price"
                    value={selectedService ? selectedService.pricing?.starting_price || '' : newService.pricing.starting_price}
                    onChange={(e) => {
                      const starting_price = e.target.value;
                      if (selectedService) {
                        setSelectedService({ 
                          ...selectedService, 
                          pricing: { ...selectedService.pricing, starting_price } 
                        });
                      } else {
                        setNewService({ 
                          ...newService, 
                          pricing: { ...newService.pricing, starting_price } 
                        });
                      }
                    }}
                    placeholder="5000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={selectedService ? selectedService.category || '' : newService.category}
                    onChange={(e) => {
                      const category = e.target.value;
                      if (selectedService) {
                        setSelectedService({ ...selectedService, category });
                      } else {
                        setNewService({ ...newService, category });
                      }
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="">Select Category</option>
                    {serviceCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Meta & Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                  <Input
                    id="meta_title"
                    value={selectedService ? selectedService.meta_title || '' : newService.meta_title}
                    onChange={(e) => {
                      const meta_title = e.target.value;
                      if (selectedService) {
                        setSelectedService({ ...selectedService, meta_title });
                      } else {
                        setNewService({ ...newService, meta_title });
                      }
                    }}
                    placeholder="SEO-optimized title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                  <Input
                    id="meta_description"
                    value={selectedService ? selectedService.meta_description || '' : newService.meta_description}
                    onChange={(e) => {
                      const meta_description = e.target.value;
                      if (selectedService) {
                        setSelectedService({ ...selectedService, meta_description });
                      } else {
                        setNewService({ ...newService, meta_description });
                      }
                    }}
                    placeholder="SEO meta description"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedService ? selectedService.is_featured : newService.is_featured}
                    onChange={(e) => {
                      const is_featured = e.target.checked;
                      if (selectedService) {
                        setSelectedService({ ...selectedService, is_featured });
                      } else {
                        setNewService({ ...newService, is_featured });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Featured Service</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedService ? selectedService.is_active : newService.is_active}
                    onChange={(e) => {
                      const is_active = e.target.checked;
                      if (selectedService) {
                        setSelectedService({ ...selectedService, is_active });
                      } else {
                        setNewService({ ...newService, is_active });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Active & Visible</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedService(null);
                    setNewService({
                      name: '',
                      slug: '',
                      short_description: '',
                      full_description: '',
                      features: { features: [], benefits: [] },
                      pricing: { 
                        type: 'custom', 
                        starting_price: '', 
                        currency: 'USD',
                        billing_cycle: 'monthly',
                        includes: []
                      },
                      icon: 'Briefcase',
                      category: '',
                      is_featured: false,
                      is_active: true,
                      order_index: 0,
                      meta_title: '',
                      meta_description: '',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedService) {
                      handleUpdateService(selectedService.id, selectedService);
                    } else {
                      handleCreateService();
                    }
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {selectedService ? 'Update Service' : 'Create Service'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;