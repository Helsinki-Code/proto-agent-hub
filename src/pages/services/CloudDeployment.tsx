import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  ArrowRight, 
  Check, 
  Shield, 
  Zap, 
  BarChart3,
  Settings,
  Globe,
  Lock,
  TrendingUp
} from "lucide-react";

const CloudDeployment = () => {
  const cloudProviders = [
    {
      name: "Microsoft Azure",
      description: "Enterprise-grade AI services with hybrid cloud capabilities",
      services: ["Azure OpenAI", "Cognitive Services", "Machine Learning", "Container Apps"],
      strengths: ["Enterprise integration", "Compliance", "Hybrid cloud"]
    },
    {
      name: "Amazon Web Services",
      description: "Comprehensive AI/ML platform with global infrastructure",
      services: ["SageMaker", "Bedrock", "Lambda", "ECS/EKS"],
      strengths: ["Global reach", "Scalability", "Cost optimization"]
    },
    {
      name: "Google Cloud Platform",
      description: "AI-first platform with cutting-edge machine learning tools",
      services: ["Vertex AI", "Cloud Run", "BigQuery ML", "AutoML"],
      strengths: ["AI innovation", "Data analytics", "Developer tools"]
    }
  ];

  const features = [
    {
      icon: Globe,
      title: "Multi-Cloud Deployment",
      description: "Deploy across multiple cloud providers for redundancy and optimization"
    },
    {
      icon: Zap,
      title: "Auto-Scaling Infrastructure",
      description: "Dynamic scaling based on demand to optimize costs and performance"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security with SOC 2, GDPR, and HIPAA compliance"
    },
    {
      icon: BarChart3,
      title: "Performance Monitoring",
      description: "Real-time monitoring and alerting for optimal performance"
    },
    {
      icon: Settings,
      title: "DevOps Integration",
      description: "CI/CD pipelines and infrastructure as code for automated deployments"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "End-to-end encryption and secure data handling protocols"
    }
  ];

  const architectureComponents = [
    {
      title: "Load Balancer",
      description: "Intelligent traffic distribution across multiple instances"
    },
    {
      title: "Auto-Scaling Groups",
      description: "Dynamic resource allocation based on demand patterns"
    },
    {
      title: "Container Orchestration",
      description: "Kubernetes-based container management for AI workloads"
    },
    {
      title: "Data Pipeline",
      description: "Secure data ingestion and processing workflows"
    },
    {
      title: "Monitoring & Alerts",
      description: "Comprehensive observability and incident response"
    },
    {
      title: "Security Layer",
      description: "Multi-layered security with identity and access management"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Architecture Design",
      description: "Design scalable cloud architecture tailored to your needs"
    },
    {
      step: "02",
      title: "Infrastructure Setup",
      description: "Provision and configure cloud resources with best practices"
    },
    {
      step: "03",
      title: "Application Deployment",
      description: "Deploy your AI applications with automated CI/CD pipelines"
    },
    {
      step: "04",
      title: "Monitoring & Optimization",
      description: "Continuous monitoring and optimization for peak performance"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Cloud className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Cloud AI <span className="text-gradient">Deployment</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Scalable orchestration across Azure, AWS, and GCP with enterprise-grade security. 
              Deploy your AI solutions with confidence and optimal performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Start Deployment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                View Architecture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Multi-Cloud Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deploy and manage AI solutions across all major cloud platforms, optimizing for your specific requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cloudProviders.map((provider, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{provider.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{provider.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-sm">Key Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Strengths:</h4>
                    {provider.strengths.map((strength, strengthIndex) => (
                      <div key={strengthIndex} className="flex items-center space-x-2">
                        <Check className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Deployment Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade features for secure, scalable, and optimized AI deployments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Scalable Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our cloud architecture is designed for high availability, scalability, and security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureComponents.map((component, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{component.title}</h3>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Cloud Deployment?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Proven Scalability</h3>
                    <p className="text-sm text-muted-foreground">
                      Our deployments handle millions of requests with auto-scaling capabilities that grow with your business.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground">
                      SOC 2 Type II compliant with advanced security measures and regular penetration testing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Cost Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Intelligent resource management reduces cloud costs by up to 40% while maintaining performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <h3 className="text-xl font-semibold mb-4">Ready to Deploy?</h3>
              <p className="text-muted-foreground mb-6">
                Let's get your AI solutions deployed with enterprise-grade reliability and security.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">Free architecture assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">24/7 deployment support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">99.9% uptime guarantee</span>
                </div>
              </div>
              <Button className="btn-primary w-full">
                Start Deployment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Deployment Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our systematic approach ensures secure, scalable, and optimized cloud deployments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground mb-8">
              Starting at $7,500/month for comprehensive cloud AI deployment and management.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <Badge variant="outline" className="mb-4 text-lg px-4 py-2">
                Starting at $7,500/month
              </Badge>
              <p className="text-muted-foreground mb-6">
                Includes infrastructure management, security monitoring, and 24/7 support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Get Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudDeployment;