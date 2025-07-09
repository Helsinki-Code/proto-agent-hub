import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Bot, 
  Zap, 
  Shield, 
  Globe, 
  Database,
  ArrowRight,
  Play,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Settings,
  Brain
} from "lucide-react";

const Chatbots = () => {
  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock intelligent support without breaks or downtime"
    },
    {
      icon: Brain,
      title: "Context-Aware Logic",
      description: "Remembers conversation history and understands complex queries"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Communicate in 40+ languages with native-level fluency"
    },
    {
      icon: Database,
      title: "System Integration",
      description: "Seamless connection to your existing CRM, ERP, and databases"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC2 compliant with end-to-end encryption and data protection"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed insights into customer interactions and satisfaction"
    }
  ];

  const techStack = [
    { name: "LangChain", description: "Agent orchestration framework" },
    { name: "RAG", description: "Retrieval-Augmented Generation" },
    { name: "Vector DB", description: "Semantic search and memory" },
    { name: "OpenAI GPT-4", description: "Large language model" },
    { name: "Custom Tools", description: "Business-specific integrations" },
    { name: "API Gateway", description: "Secure communication layer" }
  ];

  const useCases = [
    {
      title: "Customer Support",
      description: "Handle inquiries, troubleshoot issues, and escalate complex cases",
      benefits: ["70% reduction in response time", "24/7 availability", "Consistent service quality"]
    },
    {
      title: "Sales Assistant",
      description: "Qualify leads, provide product information, and schedule demos",
      benefits: ["40% increase in conversions", "Automated lead scoring", "Reduced sales cycle"]
    },
    {
      title: "Internal Help Desk",
      description: "Employee support for IT, HR, and operational questions",
      benefits: ["60% fewer support tickets", "Instant policy answers", "Improved productivity"]
    },
    {
      title: "E-commerce Guide",
      description: "Product recommendations, order tracking, and checkout assistance",
      benefits: ["25% increase in AOV", "Reduced cart abandonment", "Enhanced UX"]
    }
  ];

  const metrics = [
    { value: "90%", label: "Query Resolution Rate" },
    { value: "2.3s", label: "Average Response Time" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "60%", label: "Cost Reduction" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6 bg-primary/10 border-primary/20">
                🤖 Intelligent Conversational AI
              </Badge>
              <h1 className="text-5xl font-bold mb-6">
                Next-Generation <span className="text-gradient">AI Chatbots</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Deploy intelligent conversational agents that understand context, remember conversations, 
                and integrate seamlessly with your business systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="btn-primary text-lg px-8 py-3">
                  Try Live Demo
                  <Play className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 bg-muted/20 rounded-lg p-3">
                    <p className="text-sm">Hi! How can I help you today?</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 justify-end">
                  <div className="flex-1 bg-primary/10 rounded-lg p-3">
                    <p className="text-sm">I need help with my order status</p>
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 bg-muted/20 rounded-lg p-3">
                    <p className="text-sm">I can help you track your order. Let me pull up your information...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our <span className="text-gradient">Chatbots</span>?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge AI technology and designed for enterprise-scale deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by <span className="text-gradient">Advanced Technology</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our chatbots leverage the latest AI frameworks and tools for maximum performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular <span className="text-gradient">Use Cases</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how businesses are using our chatbots to transform customer interactions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6">{useCase.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Benefits:</h4>
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven <span className="text-gradient">Performance</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real metrics from our deployed chatbot solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Quote */}
      <section className="section-padding">
        <div className="container-width">
          <Card className="card-gradient border-border glow-primary">
            <CardContent className="p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="text-6xl text-primary mb-6">"</div>
                <blockquote className="text-xl text-muted-foreground mb-6 italic">
                  The AgenticAI chatbot has revolutionized our customer service. It handles 70% of our inquiries 
                  autonomously while maintaining higher satisfaction rates than our previous human-only approach.
                </blockquote>
                <div className="text-center">
                  <div className="text-lg font-semibold">Jennifer Martinez</div>
                  <div className="text-primary">Head of Customer Experience</div>
                  <div className="text-sm text-muted-foreground">TechCorp Solutions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Deploy Your AI Chatbot?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get started with a custom chatbot solution tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Schedule Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chatbots;