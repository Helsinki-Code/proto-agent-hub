import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Clock,
  Calendar,
  Phone,
  MessageSquare,
  TrendingUp,
  Settings,
  Brain,
  Lightbulb
} from "lucide-react";

const Consulting = () => {
  const differentiators = [
    {
      icon: Brain,
      title: "Deep Domain Expertise",
      description: "Our team combines AI research backgrounds with real-world implementation experience across industries."
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "We build working prototypes in weeks, not months, to validate approaches before full implementation."
    },
    {
      icon: Shield,
      title: "Ongoing Support",
      description: "Continuous optimization and support to ensure your AI solutions evolve with your business needs."
    },
    {
      icon: Target,
      title: "ROI-Focused",
      description: "Every recommendation is backed by clear business value and measurable return on investment."
    }
  ];

  const packages = [
    {
      name: "Basic",
      price: "$10,000",
      duration: "2-4 weeks",
      description: "Perfect for organizations exploring AI possibilities",
      features: [
        "AI readiness assessment",
        "Use case identification",
        "High-level roadmap",
        "Technology recommendations",
        "Executive presentation",
        "30-day follow-up support"
      ],
      recommended: false
    },
    {
      name: "Pro",
      price: "$25,000",
      duration: "4-8 weeks",
      description: "Comprehensive strategy for committed organizations",
      features: [
        "Everything in Basic",
        "Detailed implementation plan",
        "Pilot project design",
        "Team training program",
        "Change management strategy",
        "3-month implementation support",
        "Monthly check-ins"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "8-12 weeks",
      description: "Full-scale transformation for large organizations",
      features: [
        "Everything in Pro",
        "Custom AI solution development",
        "Multi-department coordination",
        "Advanced training workshops",
        "Compliance and security review",
        "6-month ongoing support",
        "Dedicated success manager"
      ],
      recommended: false
    }
  ];

  const processSteps = [
    {
      step: "Discovery",
      icon: Target,
      description: "We analyze your current workflows, identify pain points, and assess AI readiness.",
      deliverables: ["Current state analysis", "Opportunity assessment", "Stakeholder interviews"]
    },
    {
      step: "Strategy",
      icon: Lightbulb,
      description: "We design a comprehensive AI strategy aligned with your business objectives.",
      deliverables: ["Strategic roadmap", "Technology architecture", "Implementation timeline"]
    },
    {
      step: "Pilot",
      icon: Settings,
      description: "We build and deploy a pilot solution to validate the approach and gather feedback.",
      deliverables: ["Working prototype", "Performance metrics", "User feedback analysis"]
    },
    {
      step: "Scale",
      icon: TrendingUp,
      description: "We expand the solution across your organization with full training and support.",
      deliverables: ["Full deployment", "Team training", "Ongoing optimization"]
    }
  ];

  const testimonials = [
    {
      name: "David Chen",
      role: "CTO",
      company: "Manufacturing Corp",
      quote: "Their consulting team helped us identify $2M in annual savings through AI automation. The ROI was clear from day one.",
      image: "/api/placeholder/100/100"
    },
    {
      name: "Sarah Martinez",
      role: "Head of Operations",
      company: "FinanceFlow",
      quote: "The strategic roadmap they provided became our blueprint for digital transformation. We're now 6 months ahead of schedule.",
      image: "/api/placeholder/100/100"
    }
  ];

  const metrics = [
    { value: "200+", label: "Projects Delivered" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "$50M+", label: "Client Savings Generated" },
    { value: "2.5x", label: "Average ROI" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-primary/10 border-primary/20">
              🎯 Strategic AI Consulting
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Transform Your Business with <span className="text-gradient">Expert AI Guidance</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From strategy to implementation, our experts guide you through every step 
              of your AI transformation journey with proven methodologies and measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Schedule Free Consultation
                <Calendar className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                Download AI Readiness Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose <span className="text-gradient">Our Consulting</span>?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine deep technical expertise with proven business acumen to deliver results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <diff.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{diff.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{diff.description}</p>
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
            <h2 className="text-3xl font-bold mb-4">Consulting <span className="text-gradient">Packages</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the right level of engagement for your AI transformation journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`card-gradient border-border transition-all duration-300 ${pkg.recommended ? 'glow-primary ring-2 ring-primary/20' : 'hover:glow-primary'}`}>
                <CardContent className="p-6">
                  {pkg.recommended && (
                    <Badge className="mb-4 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                    <div className="text-sm text-muted-foreground mb-2">{pkg.duration}</div>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
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
            <h2 className="text-3xl font-bold mb-4">Our <span className="text-gradient">Process</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful AI implementation.
            </p>
          </div>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Card className="card-gradient border-border hover:glow-primary transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Step {index + 1}
                          </Badge>
                          <h3 className="text-2xl font-bold">{step.step}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      <div>
                        <h4 className="font-medium mb-3">Key Deliverables:</h4>
                        <div className="space-y-2">
                          {step.deliverables.map((deliverable, delivIndex) => (
                            <div key={delivIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} text-center`}>
                  <div className="text-8xl font-bold text-primary/20 mb-4">{String(index + 1).padStart(2, '0')}</div>
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client <span className="text-gradient">Success Stories</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl text-primary mb-4">"</div>
                  <p className="text-muted-foreground mb-6 italic">{testimonial.quote}</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven <span className="text-gradient">Track Record</span></h2>
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

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="card-gradient rounded-lg p-12 text-center glow-primary">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a free consultation to discuss your specific needs and learn how we can help accelerate your AI transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                <Calendar className="mr-2 w-5 h-5" />
                Book Free Consultation
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                <Phone className="mr-2 w-5 h-5" />
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;