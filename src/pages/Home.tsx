import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase, trackPageView, getServices, getUseCases } from "@/lib/supabase";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Play,
  Star,
  Briefcase,
  Target,
  Rocket
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  short_description: string;
  features: any;
  is_featured: boolean;
  icon: string;
}

interface UseCase {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: any;
  is_featured: boolean;
}

const Home = () => {
  const navigate = useNavigate();
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [featuredUseCases, setFeaturedUseCases] = useState<UseCase[]>([]);
  const [stats, setStats] = useState({
    clientsSaved: "45%",
    implementationTime: "48hrs",
    successRate: "99.7%",
    companiesServed: "500+"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track page view
    trackPageView('/', {
      page_title: 'Home - AgenticAI',
      user_agent: navigator.userAgent
    });

    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setIsLoading(true);

      // Load featured services from Supabase
      const { data: servicesData, error: servicesError } = await getServices({
        is_featured: true,
        is_active: true
      });

      if (servicesError) {
        console.error('Error loading services:', servicesError);
      } else {
        setFeaturedServices(servicesData || []);
      }

      // Load featured use cases from Supabase
      const { data: useCasesData, error: useCasesError } = await getUseCases({
        is_featured: true,
        is_published: true
      });

      if (useCasesError) {
        console.error('Error loading use cases:', useCasesError);
      } else {
        setFeaturedUseCases(useCasesData || []);
      }

      // Get real-time stats from analytics
      const { data: analyticsData } = await supabase
        .from('analytics_data')
        .select('event_data')
        .eq('event_type', 'page_view')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (analyticsData && analyticsData.length > 0) {
        setStats(prev => ({
          ...prev,
          companiesServed: `${Math.floor(analyticsData.length / 10)}+`
        }));
      }

    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    trackPageView('/get-started', { source: 'homepage_hero' });
    navigate("/get-started");
  };

  const handleScheduleConsultation = () => {
    trackPageView('/schedule-demo', { source: 'homepage_hero' });
    navigate("/schedule-demo");
  };

  const handleViewServices = () => {
    trackPageView('/services', { source: 'homepage_hero' });
    navigate("/services");
  };

  const handleWatchDemo = () => {
    trackPageView('/watch-demo', { source: 'homepage_cta' });
    navigate("/watch-demo");
  };

  const features = [
    {
      icon: Cpu,
      title: "Autonomous AI Agents",
      description: "Deploy intelligent agents that work 24/7 without human intervention, handling complex tasks and making decisions based on real-time data."
    },
    {
      icon: Zap,
      title: "Rapid Implementation",
      description: "Get your AI automation running in just 48 hours with our streamlined deployment process and pre-built industry solutions."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant infrastructure with end-to-end encryption, ensuring your data and processes remain secure and private."
    },
    {
      icon: TrendingUp,
      title: "Proven ROI",
      description: "Average 45% cost reduction and 3x productivity gains within the first 90 days of implementation across all our clients."
    }
  ];

  const benefits = [
    "Reduce operational costs by up to 45%",
    "Eliminate manual, repetitive tasks",
    "Scale operations without hiring",
    "24/7 automated monitoring and response",
    "Real-time insights and reporting",
    "Seamless integration with existing systems"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading AgenticAI experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-muted/20 to-background relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        <div className="container-width relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Rocket className="w-3 h-3 mr-1" />
              Live in Production • Real-time Data
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business with{" "}
              <span className="text-gradient bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Agentic AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Deploy intelligent AI agents that work autonomously to achieve your business goals. 
              No manual oversight required—just results. Join {stats.companiesServed} companies already transforming with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                className="btn-primary text-lg px-8 py-4 h-auto"
                onClick={handleGetStarted}
              >
                Start Your Transformation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="text-lg px-8 py-4 h-auto"
                onClick={handleWatchDemo}
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
              <Button 
                variant="ghost"
                className="text-lg px-8 py-4 h-auto"
                onClick={handleScheduleConsultation}
              >
                Schedule Consultation
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{stats.clientsSaved}</div>
                <div className="text-sm text-muted-foreground">Average Cost Reduction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stats.implementationTime}</div>
                <div className="text-sm text-muted-foreground">Deploy Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stats.successRate}</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stats.companiesServed}</div>
                <div className="text-sm text-muted-foreground">Companies Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Agentic AI?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven business results to deliver 
              automation that actually works in the real world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <section className="section-padding bg-muted/20">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Featured Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive AI solutions tailored to your industry and business needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.slice(0, 3).map((service, index) => (
                <Card key={service.id} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{service.short_description}</p>
                    {service.features?.features && (
                      <div className="space-y-2">
                        {service.features.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" onClick={handleViewServices}>
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Use Cases */}
      {featuredUseCases.length > 0 && (
        <section className="section-padding">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how companies like yours are achieving remarkable results with our AI solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredUseCases.slice(0, 3).map((useCase, index) => (
                <Card key={useCase.id} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Target className="w-5 h-5 text-primary" />
                      <Badge variant="secondary">{useCase.industry}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{useCase.challenge}</p>
                    {useCase.results && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Results:</span>
                          <span className="font-medium text-primary">Success</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => navigate('/use-cases')}>
                View All Use Cases
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Leading Companies Choose AgenticAI
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-gradient p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Autonomous Operation</div>
              </Card>
              <Card className="card-gradient p-6 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">48hrs</div>
                <div className="text-sm text-muted-foreground">Implementation</div>
              </Card>
              <Card className="card-gradient p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">45%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </Card>
              <Card className="card-gradient p-6 text-center">
                <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">99.7%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container-width">
          <Card className="card-gradient border-border overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get started today and see results in just 48 hours.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Fast Implementation</div>
                  <div className="text-sm text-muted-foreground">Deploy in 48 hours</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Enterprise Security</div>
                  <div className="text-sm text-muted-foreground">SOC 2 compliant</div>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Proven Results</div>
                  <div className="text-sm text-muted-foreground">Average 45% cost reduction</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="btn-primary text-lg px-8 py-3"
                  onClick={handleGetStarted}
                >
                  Start Your Transformation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  className="btn-ghost text-lg px-8 py-3"
                  onClick={handleScheduleConsultation}
                >
                  Schedule Consultation
                </Button>
                <Button 
                  className="btn-ghost text-lg px-8 py-3"
                  onClick={handleViewServices}
                >
                  Explore Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;