import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Settings, 
  ArrowRight, 
  Check, 
  Bot, 
  Brain, 
  Zap,
  Cloud,
  GraduationCap,
  MessageSquare
} from "lucide-react";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Settings,
      title: "Workflow Automation",
      description: "Transform your business processes with intelligent automation that learns, adapts, and scales.",
      features: [
        "Process discovery and mapping",
        "Intelligent document processing",
        "Multi-system integration",
        "Real-time monitoring and optimization"
      ],
      pricing: "Starting at $5,000/month",
      route: "/services/workflow-automation"
    },
    {
      icon: MessageSquare,
      title: "AI Chatbots & Virtual Assistants", 
      description: "Deploy intelligent conversational agents that provide 24/7 customer support and engagement.",
      features: [
        "Natural language understanding",
        "Multi-channel deployment",
        "CRM integration",
        "Performance analytics"
      ],
      pricing: "Starting at $2,000/month",
      route: "/chatbots"
    },
    {
      icon: Brain,
      title: "LLM Integration",
      description: "Seamlessly integrate large language models into your existing systems and workflows.",
      features: [
        "Multi-model support (GPT, Claude, Gemini)",
        "Cost optimization",
        "Security and compliance",
        "Custom fine-tuning"
      ],
      pricing: "Starting at $3,000/month",
      route: "/services/llm-integration"
    },
    {
      icon: Zap,
      title: "AI Strategy Consulting",
      description: "Develop a comprehensive AI strategy that aligns with your business objectives and growth plans.",
      features: [
        "AI readiness assessment",
        "Strategic roadmap development",
        "ROI analysis and business case",
        "Change management support"
      ],
      pricing: "Starting at $10,000/project",
      route: "/services/ai-strategy"
    },
    {
      icon: Cloud,
      title: "Cloud Deployment & Scaling",
      description: "Deploy and scale your AI solutions with enterprise-grade cloud infrastructure.",
      features: [
        "Multi-cloud deployment",
        "Auto-scaling infrastructure",
        "Security and compliance",
        "24/7 monitoring and support"
      ],
      pricing: "Starting at $7,500/month",
      route: "/services/cloud-deployment"
    },
    {
      icon: GraduationCap,
      title: "Training & Enablement",
      description: "Upskill your team with comprehensive AI training programs and certifications.",
      features: [
        "Custom curriculum design",
        "Hands-on workshops",
        "Certification programs",
        "Ongoing support"
      ],
      pricing: "Starting at $15,000/program",
      route: "/services/training"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "We analyze your current workflows and identify automation opportunities."
    },
    {
      step: "02",
      title: "Strategy",
      description: "We design a comprehensive AI strategy tailored to your business goals."
    },
    {
      step: "03",
      title: "Pilot",
      description: "We build and deploy a pilot solution to validate the approach."
    },
    {
      step: "04",
      title: "Scale",
      description: "We expand the solution across your organization with full support."
    }
  ];

  const handleScheduleConsultation = () => {
    navigate("/schedule-demo");
  };

  const handleStartJourney = () => {
    navigate("/get-started");
  };

  const handleViewCaseStudies = () => {
    navigate("/use-cases");
  };

  const handleServiceNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Comprehensive <span className="text-gradient">AI Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From strategy to implementation, we provide end-to-end agentic AI services 
              that transform how your business operates.
            </p>
            <Button 
              className="btn-primary text-lg px-8 py-3"
              onClick={handleScheduleConsultation}
            >
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:animate-pulse">
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <Badge variant="outline" className="mb-4">
                      {service.pricing}
                    </Badge>
                    <Button 
                      className="btn-ghost w-full" 
                      onClick={() => handleServiceNavigation(service.route)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful AI implementation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="card-gradient rounded-lg p-12 text-center glow-primary">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our agentic AI solutions can revolutionize your operations 
              and drive unprecedented efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-primary text-lg px-8 py-3"
                onClick={handleStartJourney}
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                className="btn-ghost text-lg px-8 py-3"
                onClick={handleViewCaseStudies}
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;