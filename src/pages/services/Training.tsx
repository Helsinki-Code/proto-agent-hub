import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  ArrowRight, 
  Check, 
  Users, 
  Clock, 
  Award,
  BookOpen,
  Target,
  Zap,
  Shield
} from "lucide-react";

const Training = () => {
  const programs = [
    {
      title: "Executive AI Strategy Workshop",
      duration: "2 days",
      audience: "C-level executives and senior leadership",
      description: "Strategic overview of AI transformation for business leaders",
      modules: [
        "AI landscape and market opportunities",
        "Building AI-first organizations",
        "ROI measurement and KPIs",
        "Risk management and governance"
      ],
      format: "In-person or virtual"
    },
    {
      title: "Technical Implementation Bootcamp",
      duration: "5 days",
      audience: "Developers and technical teams",
      description: "Hands-on training for building and deploying agentic AI systems",
      modules: [
        "LangChain and agent frameworks",
        "RAG implementation",
        "Multi-agent orchestration",
        "Production deployment patterns"
      ],
      format: "Hands-on workshops"
    },
    {
      title: "Business Process Automation",
      duration: "3 days",
      audience: "Operations and process managers",
      description: "Practical training for identifying and automating business processes",
      modules: [
        "Process mapping and analysis",
        "Automation opportunity assessment",
        "Change management strategies",
        "Performance monitoring"
      ],
      format: "Interactive workshops"
    },
    {
      title: "AI Ethics and Governance",
      duration: "1 day",
      audience: "All stakeholders",
      description: "Essential training on responsible AI implementation",
      modules: [
        "AI ethics frameworks",
        "Bias detection and mitigation",
        "Regulatory compliance",
        "Governance structures"
      ],
      format: "Seminar format"
    }
  ];

  const certifications = [
    {
      name: "Certified Agentic AI Practitioner",
      level: "Professional",
      duration: "40 hours",
      description: "Comprehensive certification covering agentic AI implementation"
    },
    {
      name: "AI Strategy Leadership Certificate",
      level: "Executive",
      duration: "20 hours",
      description: "Strategic leadership certification for AI transformation"
    },
    {
      name: "Technical AI Specialist",
      level: "Expert",
      duration: "60 hours",
      description: "Advanced technical certification for AI developers"
    }
  ];

  const learningFormats = [
    {
      icon: Users,
      title: "On-Site Training",
      description: "Customized training delivered at your location for your team"
    },
    {
      icon: BookOpen,
      title: "Virtual Workshops",
      description: "Interactive online sessions with real-time collaboration"
    },
    {
      icon: Target,
      title: "Blended Learning",
      description: "Combination of online modules and hands-on workshops"
    },
    {
      icon: Award,
      title: "Certification Programs",
      description: "Structured programs leading to industry-recognized certifications"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Needs Assessment",
      description: "Evaluate your team's current skills and learning objectives"
    },
    {
      step: "02",
      title: "Custom Curriculum",
      description: "Design training program tailored to your specific needs"
    },
    {
      step: "03",
      title: "Interactive Delivery",
      description: "Engage your team with hands-on workshops and real projects"
    },
    {
      step: "04",
      title: "Ongoing Support",
      description: "Provide continued support and advanced learning opportunities"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Training & <span className="text-gradient">Workshops</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              On-site or virtual upskilling programs to help your team master agentic AI technologies. 
              Build internal expertise and drive successful AI adoption.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Explore Programs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                Download Curriculum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Training Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training programs designed for different roles and expertise levels in your organization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{program.title}</h3>
                    <Badge variant="outline">{program.duration}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Target Audience:</strong> {program.audience}
                  </p>
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium text-sm">Key Modules:</h4>
                    {program.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{module}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {program.format}
                    </Badge>
                    <Button className="btn-ghost text-sm">
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

      {/* Learning Formats Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Flexible Learning Formats</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the learning format that best fits your team's schedule and preferences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningFormats.map((format, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <format.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{format.title}</h3>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized certifications that validate your team's expertise in agentic AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                  <Badge variant="secondary" className="mb-3">{cert.level}</Badge>
                  <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">{cert.duration}</span>
                  </div>
                  <Button className="btn-ghost w-full">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
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
              <h2 className="text-3xl font-bold mb-6">Why Invest in AI Training?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Faster Implementation</h3>
                    <p className="text-sm text-muted-foreground">
                      Teams with proper training implement AI solutions 60% faster than those without.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Higher Success Rate</h3>
                    <p className="text-sm text-muted-foreground">
                      Properly trained teams have 85% higher success rates in AI project implementations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Risk Mitigation</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive training reduces implementation risks and costly mistakes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <h3 className="text-xl font-semibold mb-4">Ready to Upskill Your Team?</h3>
              <p className="text-muted-foreground mb-6">
                Invest in your team's future with comprehensive AI training programs.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">Custom curriculum design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">Expert instructors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">Hands-on projects</span>
                </div>
              </div>
              <Button className="btn-primary w-full">
                Schedule Training
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
            <h2 className="text-3xl font-bold mb-4">Training Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our systematic approach ensures effective learning and practical application.
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
            <h2 className="text-3xl font-bold mb-4">Training Investment</h2>
            <p className="text-muted-foreground mb-8">
              Starting at $15,000 per program with customized pricing based on group size and requirements.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <Badge variant="outline" className="mb-4 text-lg px-4 py-2">
                Starting at $15,000/program
              </Badge>
              <p className="text-muted-foreground mb-6">
                Includes curriculum development, expert instruction, materials, and certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Get Training Quote
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

export default Training;