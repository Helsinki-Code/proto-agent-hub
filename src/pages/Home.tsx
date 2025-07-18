import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  Play, 
  Building2, 
  Heart, 
  ShoppingCart, 
  Settings, 
  Scale, 
  Users, 
  Star,
  Quote,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const workflowSteps = [
    {
      step: "Perceive",
      description: "AI agents continuously monitor your business environment, gathering data and understanding context."
    },
    {
      step: "Reason",
      description: "Advanced reasoning capabilities analyze complex situations and determine optimal courses of action."
    },
    {
      step: "Act",
      description: "Autonomous execution of decisions with real-time adaptation and learning from outcomes."
    }
  ];

  const useCases = [
    {
      title: "Automated Loan Processing",
      industry: "Finance",
      description: "AI agents process loan applications end-to-end, from document verification to approval decisions.",
      metrics: "75% faster processing",
      icon: Building2
    },
    {
      title: "Patient Care Coordination",
      industry: "Healthcare", 
      description: "Intelligent agents coordinate patient care across departments and optimize treatment workflows.",
      metrics: "50% better coordination",
      icon: Heart
    },
    {
      title: "Dynamic Pricing Optimization",
      industry: "Retail",
      description: "AI agents continuously optimize pricing based on demand, competition, and market conditions.",
      metrics: "30% revenue increase",
      icon: ShoppingCart
    },
    {
      title: "Predictive Maintenance",
      industry: "Manufacturing",
      description: "Autonomous agents monitor equipment health and predict failures before they occur.",
      metrics: "90% uptime improvement",
      icon: Settings
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp Solutions",
      company: "Leading Software Company",
      quote: "Agentic AI transformed our customer service operations. Our AI agents now handle 85% of inquiries autonomously with 95% satisfaction rates.",
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

  const handleGetStarted = () => {
    navigate("/get-started");
  };

  const handleWatchDemo = () => {
    navigate("/watch-demo");
  };

  const handleScheduleConsultation = () => {
    navigate("/schedule-demo");
  };

  const handleViewUseCases = () => {
    navigate("/use-cases");
  };

  const handleViewServices = () => {
    navigate("/services");
  };

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
                <Button 
                  className="btn-primary text-lg px-8 py-3" 
                  onClick={handleGetStarted}
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  className="btn-ghost text-lg px-8 py-3" 
                  onClick={handleWatchDemo}
                >
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <span className="text-2xl font-bold text-primary-foreground">{index + 1}</span>
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

      {/* Traditional vs Agentic Comparison */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Traditional Automation vs <span className="text-gradient">Agentic AI</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the dramatic difference between old-school automation and intelligent agentic systems.
            </p>
          </div>
          <div className="space-y-6">
            {comparisonPoints.map((point, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="text-center">
                      <h4 className="font-medium text-muted-foreground mb-2">Traditional</h4>
                      <p className="text-lg">{point.traditional}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <ArrowRight className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h4 className="font-medium text-primary mb-2">Agentic AI</h4>
                      <p className="text-lg font-semibold">{point.agentic}</p>
                    </div>
                    <div className="text-center">
                      <Badge className="mb-2 bg-primary text-primary-foreground">Advantage</Badge>
                      <p className="text-sm text-muted-foreground">{point.advantage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proven <span className="text-gradient">Use Cases</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how businesses across industries are leveraging agentic AI to drive unprecedented results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300 group cursor-pointer">
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
          <div className="text-center mt-8">
            <Button 
              className="btn-ghost text-lg px-8 py-3"
              onClick={handleViewUseCases}
            >
              View All Use Cases
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section-padding">
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
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our <span className="text-gradient">Clients Say</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container-width">
          <Card className="card-gradient border-border glow-primary">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join hundreds of companies already using agentic AI to revolutionize their operations. 
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