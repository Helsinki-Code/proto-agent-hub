import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Workflow, 
  ArrowRight, 
  Check, 
  Clock, 
  TrendingUp, 
  Shield,
  Settings,
  Zap,
  Users,
  Target
} from "lucide-react";

const WorkflowAutomation = () => {
  const benefits = [
    {
      icon: Clock,
      title: "24/7 Autonomous Operation",
      description: "AI agents work continuously without human intervention"
    },
    {
      icon: TrendingUp,
      title: "Adaptive Learning",
      description: "Systems improve performance based on historical data"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in compliance and security protocols"
    },
    {
      icon: Settings,
      title: "Custom Integration",
      description: "Seamless connection with existing systems"
    }
  ];

  const features = [
    "Multi-agent orchestration",
    "Real-time decision making",
    "Adaptive process optimization",
    "Custom workflow design",
    "Exception handling",
    "Performance monitoring",
    "Audit trails",
    "Scalable architecture"
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We analyze your current workflows and identify automation opportunities."
    },
    {
      step: "02",
      title: "Agent Design",
      description: "Custom AI agents are designed for your specific business processes."
    },
    {
      step: "03",
      title: "Integration & Testing",
      description: "Seamless integration with your existing systems and comprehensive testing."
    },
    {
      step: "04",
      title: "Deployment & Monitoring",
      description: "Full deployment with ongoing monitoring and optimization."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Workflow className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Agentic <span className="text-gradient">Workflow Automation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              End-to-end pipeline creation that works autonomously to achieve your business objectives. 
              Our AI agents don't just follow scripts—they think, adapt, and optimize.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Start Your Automation Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Agentic Automation?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional automation follows rigid rules. Agentic automation adapts, learns, and improves over time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Comprehensive Feature Set</h2>
              <p className="text-muted-foreground mb-8">
                Our workflow automation platform includes everything you need to build, deploy, 
                and manage autonomous AI agents that handle complex business processes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Transform your business processes with intelligent automation that thinks and adapts.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm">Quick 2-week pilot implementation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm">Dedicated implementation team</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-sm">Guaranteed ROI within 6 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Implementation Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to deployment, we guide you through every step of your automation journey.
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
            <h2 className="text-3xl font-bold mb-4">Investment & ROI</h2>
            <p className="text-muted-foreground mb-8">
              Starting at $5,000/month for comprehensive workflow automation solutions.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <Badge variant="outline" className="mb-4 text-lg px-4 py-2">
                Starting at $5,000/month
              </Badge>
              <p className="text-muted-foreground mb-6">
                Custom pricing based on complexity and scale. Most clients see ROI within 3-6 months.
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

export default WorkflowAutomation;