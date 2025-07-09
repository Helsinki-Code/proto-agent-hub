import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  ArrowRight, 
  Check, 
  Brain, 
  TrendingUp, 
  Shield,
  Users,
  Lightbulb,
  BarChart3,
  Zap
} from "lucide-react";

const AIStrategy = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Readiness Assessment",
      description: "Comprehensive evaluation of your organization's AI maturity and readiness",
      deliverables: [
        "Current state analysis",
        "Technology gap assessment",
        "Organizational readiness report",
        "Risk assessment matrix"
      ]
    },
    {
      icon: Target,
      title: "Strategic Roadmap",
      description: "Detailed implementation plan tailored to your business objectives",
      deliverables: [
        "Phased implementation plan",
        "Technology architecture",
        "Timeline and milestones",
        "Resource allocation plan"
      ]
    },
    {
      icon: BarChart3,
      title: "ROI Analysis",
      description: "Detailed financial impact assessment and business case development",
      deliverables: [
        "Cost-benefit analysis",
        "ROI projections",
        "Risk mitigation strategies",
        "Success metrics definition"
      ]
    },
    {
      icon: Users,
      title: "Change Management",
      description: "Organizational transformation and adoption strategy",
      deliverables: [
        "Change readiness assessment",
        "Training program design",
        "Communication strategy",
        "Stakeholder engagement plan"
      ]
    }
  ];

  const packages = [
    {
      name: "Starter Assessment",
      price: "$10,000",
      duration: "2-3 weeks",
      features: [
        "AI readiness assessment",
        "High-level strategic recommendations",
        "Technology landscape overview",
        "Executive summary report"
      ],
      recommended: false
    },
    {
      name: "Comprehensive Strategy",
      price: "$25,000",
      duration: "4-6 weeks",
      features: [
        "Complete readiness assessment",
        "Detailed implementation roadmap",
        "ROI analysis and business case",
        "Change management strategy",
        "Technology architecture design"
      ],
      recommended: true
    },
    {
      name: "Enterprise Program",
      price: "$50,000+",
      duration: "8-12 weeks",
      features: [
        "Multi-departmental assessment",
        "Enterprise-wide transformation plan",
        "Pilot program design",
        "Vendor evaluation and selection",
        "Ongoing strategic support"
      ],
      recommended: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "Deep dive into your business processes, challenges, and objectives"
    },
    {
      step: "02",
      title: "Assessment",
      description: "Comprehensive evaluation of current state and AI readiness"
    },
    {
      step: "03",
      title: "Strategy",
      description: "Development of customized AI strategy and implementation roadmap"
    },
    {
      step: "04",
      title: "Execution",
      description: "Support during implementation with ongoing guidance and optimization"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Target className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              AI Strategy & <span className="text-gradient">Advisory</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive roadmaps and feasibility studies to guide your AI transformation journey. 
              Turn AI potential into strategic advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Start Your Strategy
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                Download Framework
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Strategic Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From initial assessment to full implementation support, we provide end-to-end strategic guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-medium">Key Deliverables:</h4>
                    {service.deliverables.map((deliverable, deliverableIndex) => (
                      <div key={deliverableIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Strategic Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the level of strategic support that matches your organization's needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`card-gradient border-border transition-all duration-300 ${pkg.recommended ? 'glow-primary scale-105' : 'hover:glow-primary'}`}>
                <CardContent className="p-6">
                  {pkg.recommended && (
                    <Badge className="mb-4 bg-primary text-primary-foreground">
                      Recommended
                    </Badge>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground mb-6">{pkg.duration}</p>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={pkg.recommended ? "btn-primary w-full" : "btn-ghost w-full"}>
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Strategic Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures your AI strategy aligns with business objectives.
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

      {/* Why Choose Us Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Strategic Advisory?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Deep Industry Expertise</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team has implemented AI strategies across various industries, understanding unique challenges and opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Proven ROI Framework</h3>
                    <p className="text-sm text-muted-foreground">
                      Our strategic approach has consistently delivered measurable business value for our clients.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Risk-Mitigated Approach</h3>
                    <p className="text-sm text-muted-foreground">
                      We identify and address potential risks early in the strategy development process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-muted-foreground mb-6">
                Let's develop a strategic AI roadmap that drives real business results.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm">Free initial consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm">Dedicated strategy team</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-sm">Actionable recommendations</span>
                </div>
              </div>
              <Button className="btn-primary w-full">
                Schedule Strategy Session
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIStrategy;