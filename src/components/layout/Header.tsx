import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase, trackPageView } from "@/lib/supabase";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Zap,
  Target,
  Users,
  BookOpen,
  MessageSquare,
  Phone,
  Globe,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredResources, setFeaturedResources] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Load featured content for dropdowns
  useEffect(() => {
    const loadFeaturedContent = async () => {
      try {
        // Get featured services
        const { data: services } = await supabase
          .from('services')
          .select('name, slug, short_description, icon')
          .eq('is_featured', true)
          .eq('is_active', true)
          .order('order_index')
          .limit(4);

        // Get featured resources
        const { data: resources } = await supabase
          .from('resources')
          .select('title, type, description, category')
          .eq('is_featured', true)
          .eq('is_public', true)
          .limit(4);

        setFeaturedServices(services || []);
        setFeaturedResources(resources || []);
      } catch (error) {
        console.error('Error loading featured content:', error);
      }
    };

    loadFeaturedContent();
  }, []);

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
  }, [location.pathname]);

  const navigation = [
    { 
      name: "Home", 
      href: "/",
      description: "Transform your business with AI"
    },
    { 
      name: "About", 
      href: "/about",
      description: "Learn about our mission and team"
    },
    { 
      name: "What is Agentic AI?", 
      href: "/what-is-agentic",
      description: "Understanding autonomous AI systems"
    },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      description: "Comprehensive AI solutions"
    },
    { 
      name: "Use Cases", 
      href: "/use-cases",
      description: "Real success stories and implementations"
    },
    {
      name: "Resources",
      href: "/resources", 
      hasDropdown: true,
      description: "Guides, tools and insights"
    },
    { 
      name: "Blog", 
      href: "/blog",
      description: "Latest insights and industry trends"
    },
    { 
      name: "Contact", 
      href: "/contact",
      description: "Get in touch with our experts"
    },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  const handleNavClick = async (href: string, name: string) => {
    await trackPageView(href, { 
      source: 'header_navigation',
      nav_item: name,
      timestamp: new Date().toISOString()
    });
    navigate(href);
  };

  const handleGetStarted = async () => {
    await trackPageView('/get-started', { 
      source: 'header_cta',
      button: 'get_started',
      timestamp: new Date().toISOString()
    });
    navigate("/get-started");
  };

  const handleScheduleDemo = async () => {
    await trackPageView('/schedule-demo', { 
      source: 'header_cta',
      button: 'schedule_demo',
      timestamp: new Date().toISOString()
    });
    navigate("/schedule-demo");
  };

  const getServiceIcon = (iconName: string) => {
    const icons = {
      'Zap': Zap,
      'Target': Target,
      'Users': Users,
      'Shield': Shield,
      'TrendingUp': TrendingUp,
      'Globe': Globe
    };
    return icons[iconName as keyof typeof icons] || Zap;
  };

  const getResourceIcon = (type: string) => {
    const icons = {
      'ebook': BookOpen,
      'whitepaper': BookOpen,
      'guide': BookOpen,
      'template': Target,
      'case_study': TrendingUp
    };
    return icons[type as keyof typeof icons] || BookOpen;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm" 
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      )}
    >
      <div className="container-width">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => handleNavClick('/', 'Logo')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                AgenticAI
              </span>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  <Sparkles className="w-2 h-2 mr-1" />
                  Live
                </Badge>
                <Badge variant="outline" className="text-xs px-1 py-0">
                  v3.0
                </Badge>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (item.name === "Services") setIsServicesOpen(true);
                      if (item.name === "Resources") setIsResourcesOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (item.name === "Services") setIsServicesOpen(false);
                      if (item.name === "Resources") setIsResourcesOpen(false);
                    }}
                  >
                    <button
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      )}
                      onClick={() => handleNavClick(item.href, item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {/* Services Dropdown */}
                    {item.name === "Services" && isServicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl p-6 z-50">
                        <div className="mb-4">
                          <h3 className="font-semibold text-sm mb-1">Featured Services</h3>
                          <p className="text-xs text-muted-foreground">AI solutions that drive results</p>
                        </div>
                        <div className="space-y-3 mb-4">
                          {featuredServices.slice(0, 3).map((service: any, index) => {
                            const ServiceIcon = getServiceIcon(service.icon);
                            return (
                              <Link
                                key={index}
                                to={`/services/${service.slug}`}
                                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                                onClick={() => handleNavClick(`/services/${service.slug}`, service.name)}
                              >
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <ServiceIcon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{service.name}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {service.short_description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <Link
                          to="/services"
                          className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
                          onClick={() => handleNavClick('/services', 'View All Services')}
                        >
                          View all services
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </div>
                    )}

                    {/* Resources Dropdown */}
                    {item.name === "Resources" && isResourcesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl p-6 z-50">
                        <div className="mb-4">
                          <h3 className="font-semibold text-sm mb-1">Knowledge Hub</h3>
                          <p className="text-xs text-muted-foreground">Free resources to accelerate your AI journey</p>
                        </div>
                        <div className="space-y-3 mb-4">
                          {featuredResources.slice(0, 3).map((resource: any, index) => {
                            const ResourceIcon = getResourceIcon(resource.type);
                            return (
                              <div
                                key={index}
                                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                              >
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                  <ResourceIcon className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{resource.title}</p>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {resource.type}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {resource.category}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <Link
                          to="/resources"
                          className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
                          onClick={() => handleNavClick('/resources', 'Browse All Resources')}
                        >
                          Browse all resources
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    )}
                    onClick={() => handleNavClick(item.href, item.name)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleScheduleDemo}
              className="text-muted-foreground hover:text-primary"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Demo
            </Button>
            <Button 
              size="sm"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                    onClick={() => handleNavClick(item.href, item.name)}
                  >
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </div>
                    </div>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-4 pt-4 space-y-2 border-t border-border">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={handleScheduleDemo}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Demo
                </Button>
                <Button 
                  className="w-full justify-center bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
                  onClick={handleGetStarted}
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Mobile Trust Indicators */}
              <div className="px-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                    48hr Setup
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-blue-500" />
                    SOC 2 Compliant
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-purple-500" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;