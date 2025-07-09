import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  Brain, 
  Workflow, 
  MessageSquare, 
  Target, 
  Zap, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Play,
  Star,
  Users,
  Clock,
  BarChart3
} from "lucide-react";

const Home = () => {
  const useCases = [
    {
      icon: Brain,
      title: "Intelligent Document Processing",
      description: "Automatically extract, analyze, and route documents with context-aware AI agents.",
      metrics: "95% accuracy rate",
      industry: "Finance"
    },
    {
      icon: MessageSquare,
      title: "Customer Service Automation",
      description: "24/7 intelligent support that escalates complex issues to human agents.",
      metrics: "60% reduction in response time",
      industry: "Retail"
    },
    {
      icon: Workflow,
      title: "Supply Chain Optimization",
      description: "Predict demand, optimize inventory, and automate procurement decisions.",
      metrics: "30% cost reduction",
      industry: "Manufacturing"
    },
    {
      icon: Target,
      title: "Fraud Detection & Prevention",
      description: "Real-time transaction monitoring with adaptive risk assessment.",
      metrics: "99.8% detection rate",
      industry: "Banking"
    }
  ];

  const workflowSteps = [
    {
      step: "Plan",
      description: "AI agents analyze objectives and create execution strategies"
    },
    {
      step: "Act",
      description: "Autonomous execution with real-time decision making"
    },
    {
      step: "Learn",
      description: "Continuous improvement through outcome analysis"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, FinanceCore",
      company: "Fortune 500 Financial Services",
      quote: "AgenticAI transformed our document processing workflow, reducing manual work by 80% while improving accuracy.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Head of Operations, RetailMax",
      company: "Leading E-commerce Platform",
      quote: "Their agentic chatbots handle 70% of our customer inquiries autonomously, with higher satisfaction rates.",
      rating: 5
    },
    {
      name: "Dr. Amanda Rodriguez",
      role: "Chief Digital Officer, MedTech Solutions",
      company: "Healthcare Innovation Leader",
      quote: "The AI agents seamlessly integrate with our existing systems and continuously optimize our processes.",
      rating: 5
    }
  ];

  const clientLogos = [
    "TechCorp", "GlobalBank", "MedSystems", "RetailGiant", "ManufacturingPro", "FinanceLeader"
  ];

  const comparisonPoints = [
    {
      traditional: "Rule-based automation",
      agentic: "Intelligent decision making",
      advantage: "Adapts to changing conditions"
    },
    {
      traditional: "Manual oversight required",
      agentic: "Autonomous operation",
      advantage: "Reduces human intervention by 80%"
    },
    {
      traditional: "Fixed workflows",
      agentic: "Self-improving processes",
      advantage: "Continuously optimizes performance"
    },
    {
      traditional: "Limited scalability",
      agentic: "Elastic scaling",
      advantage: "Handles volume spikes automatically"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding min-h-screen flex items-center">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6 bg-primary/10 border-primary/20">
                🤖 Next-Generation AI Solutions
              </Badge>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Transform Your Business with 
                <span className="text-gradient block">Agentic AI</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Deploy intelligent AI agents that work autonomously to achieve your business goals. 
                No manual oversight required—just results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="btn-primary text-lg px-8 py-3">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Deploy in 48 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Enterprise-grade security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card-gradient rounded-lg p-8 glow-intense animate-float">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">AI Agents Deployed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">80%</div>
                    <div className="text-sm text-muted-foreground">Process Automation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">45%</div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
                    <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Intro to Agentic Systems */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Makes AI <span className="text-gradient">Agentic</span>?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlike traditional automation, agentic AI systems can reason, plan, and act independently 
              to achieve complex goals—transforming how businesses operate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.step}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 right-0 w-12 h-0.5 bg-primary/30 transform translate-x-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proven <span className="text-gradient">Use Cases</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how businesses across industries are leveraging agentic AI to drive unprecedented results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:animate-pulse">
                      <useCase.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {useCase.industry}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{useCase.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold text-sm">{useCase.metrics}</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-8">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {clientLogos.map((logo, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto hover:bg-muted/80 transition-colors">
                    <span className="text-muted-foreground font-semibold text-sm">{logo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our <span className="text-gradient">Clients Say</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agentic vs Traditional AI */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose <span className="text-gradient">Agentic AI</span>?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the clear advantages of agentic AI over traditional automation approaches.
            </p>
          </div>
          <div className="card-gradient rounded-lg p-8 glow-primary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Traditional AI</h3>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-primary">Agentic AI</h3>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-primary">Advantage</h3>
              </div>
            </div>
            <div className="space-y-4">
              {comparisonPoints.map((point, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-border/30 last:border-b-0">
                  <div className="text-center md:text-left">
                    <span className="text-muted-foreground">{point.traditional}</span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-primary font-semibold">{point.agentic}</span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-foreground">{point.advantage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="card-gradient rounded-lg p-12 text-center glow-primary">
            <h2 className="text-3xl font-bold mb-4">Stay Ahead of the AI Revolution</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get exclusive insights, case studies, and early access to new agentic AI capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-background/50 border-border"
              />
              <Button className="btn-primary">
                Subscribe Now
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Join 10,000+ AI leaders. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;