import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  ArrowRight, 
  Check, 
  Zap, 
  Shield, 
  BarChart3,
  Settings,
  Cloud,
  Code,
  Monitor
} from "lucide-react";

const LLMIntegration = () => {
  const models = [
    {
      name: "OpenAI GPT-4",
      description: "Advanced language model for complex reasoning and generation",
      use_cases: ["Content generation", "Code assistance", "Complex reasoning"],
      pricing: "Usage-based"
    },
    {
      name: "Anthropic Claude",
      description: "Constitutional AI with strong safety and helpfulness",
      use_cases: ["Document analysis", "Safe AI applications", "Research assistance"],
      pricing: "Usage-based"
    },
    {
      name: "Google Gemini",
      description: "Multimodal AI for text, code, and image understanding",
      use_cases: ["Multimodal applications", "Code generation", "Data analysis"],
      pricing: "Usage-based"
    },
    {
      name: "Custom Fine-tuned",
      description: "Domain-specific models tailored to your exact requirements",
      use_cases: ["Industry-specific tasks", "Proprietary knowledge", "Specialized workflows"],
      pricing: "Custom"
    }
  ];

  const features = [
    {
      icon: Code,
      title: "API Management",
      description: "Centralized API key management and request routing"
    },
    {
      icon: BarChart3,
      title: "Cost Optimization",
      description: "Intelligent model selection and usage optimization"
    },
    {
      icon: Monitor,
      title: "Performance Monitoring",
      description: "Real-time performance tracking and alerting"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security and compliance features"
    },
    {
      icon: Cloud,
      title: "Scalable Infrastructure",
      description: "Auto-scaling infrastructure for high availability"
    },
    {
      icon: Settings,
      title: "Custom Configurations",
      description: "Tailored model configurations for specific use cases"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Assessment",
      description: "Evaluate your use cases and select optimal models"
    },
    {
      step: "02",
      title: "Architecture",
      description: "Design scalable integration architecture"
    },
    {
      step: "03",
      title: "Implementation",
      description: "Deploy and configure LLM integrations"
    },
    {
      step: "04",
      title: "Optimization",
      description: "Monitor, optimize, and scale your implementations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              LLM & Foundation Model <span className="text-gradient">Integration</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Plug-and-play integration with leading AI models including OpenAI, Claude, and Gemini. 
              Harness the power of multiple LLMs with optimized performance and cost efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Explore Integrations
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Models Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Foundation Models</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We integrate with the industry's leading LLMs, optimizing for your specific use cases and requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((model, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{model.name}</h3>
                    <Badge variant="outline">{model.pricing}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">{model.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Ideal Use Cases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.use_cases.map((use_case, useIndex) => (
                        <Badge key={useIndex} variant="secondary" className="text-xs">
                          {use_case}
                        </Badge>
                      ))}
                    </div>
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
            <h2 className="text-3xl font-bold mb-4">Integration Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive integration platform provides everything you need to deploy and manage LLMs at scale.
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

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Our LLM Integration?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Rapid Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Get up and running with LLM integrations in days, not months, with our pre-built connectors and templates.
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
                      Intelligent routing and caching reduce costs by up to 70% while maintaining performance.
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
                      Built-in security features including data encryption, audit trails, and compliance monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <h3 className="text-xl font-semibold mb-4">Ready to Integrate?</h3>
              <p className="text-muted-foreground mb-6">
                Start leveraging the power of multiple LLMs with our seamless integration platform.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">Free technical consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">Proof of concept development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">24/7 technical support</span>
                </div>
              </div>
              <Button className="btn-primary w-full">
                Start Integration
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integration Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proven methodology ensures smooth integration with minimal disruption to your existing systems.
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
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Flexible Pricing</h2>
            <p className="text-muted-foreground mb-8">
              Starting at $3,000/month for comprehensive LLM integration and management.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <Badge variant="outline" className="mb-4 text-lg px-4 py-2">
                Starting at $3,000/month
              </Badge>
              <p className="text-muted-foreground mb-6">
                Includes API management, cost optimization, monitoring, and 24/7 support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Get Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LLMIntegration;