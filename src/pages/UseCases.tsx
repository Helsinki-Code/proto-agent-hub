import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Heart, 
  ShoppingCart, 
  Settings, 
  Scale, 
  Users, 
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Clock,
  Shield,
  BarChart3
} from "lucide-react";

const UseCases = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const industries = [
    { name: "All", icon: Settings },
    { name: "Finance", icon: Building2 },
    { name: "Healthcare", icon: Heart },
    { name: "Retail", icon: ShoppingCart },
    { name: "Engineering", icon: Settings },
    { name: "Legal", icon: Scale },
    { name: "HR", icon: Users },
    { name: "Education", icon: GraduationCap }
  ];

  const useCases = [
    {
      title: "Automated Loan Processing",
      industry: "Finance",
      description: "AI agents automatically process loan applications, verify documents, assess risk, and make approval decisions in real-time.",
      metrics: {
        efficiency: "75% faster processing",
        accuracy: "99.2% accuracy rate",
        cost: "60% cost reduction"
      },
      features: [
        "Document verification",
        "Risk assessment", 
        "Fraud detection",
        "Regulatory compliance"
      ],
      icon: Building2,
      route: "/use-cases/automated-loan-processing"
    },
    {
      title: "Patient Care Coordination",
      industry: "Healthcare", 
      description: "Intelligent agents coordinate patient care across departments, schedule appointments, and monitor treatment progress.",
      metrics: {
        efficiency: "50% faster coordination",
        accuracy: "95% patient satisfaction",
        cost: "40% operational savings"
      },
      features: [
        "Appointment scheduling",
        "Treatment monitoring",
        "Care coordination", 
        "Emergency response"
      ],
      icon: Heart,
      route: "/use-cases/patient-care-coordination"
    },
    {
      title: "Dynamic Pricing & Inventory",
      industry: "Retail",
      description: "AI agents continuously optimize pricing and inventory levels based on demand, competition, and market conditions.",
      metrics: {
        efficiency: "30% revenue increase",
        accuracy: "85% demand forecast accuracy", 
        cost: "25% inventory reduction"
      },
      features: [
        "Price optimization",
        "Demand forecasting",
        "Inventory management",
        "Competitor analysis"
      ],
      icon: ShoppingCart,
      route: "/use-cases/dynamic-pricing"
    },
    {
      title: "Predictive Maintenance",
      industry: "Engineering",
      description: "Autonomous agents monitor equipment health, predict failures, and schedule maintenance before breakdowns occur.",
      metrics: {
        efficiency: "90% uptime improvement",
        accuracy: "98% failure prediction",
        cost: "45% maintenance savings"
      },
      features: [
        "Equipment monitoring",
        "Failure prediction",
        "Maintenance scheduling",
        "Resource optimization"
      ],
      icon: Settings,
      route: "/use-cases/predictive-maintenance"
    },
    {
      title: "Contract Analysis & Review",
      industry: "Legal",
      description: "AI agents automatically review contracts, identify risks, ensure compliance, and suggest modifications.",
      metrics: {
        efficiency: "80% faster review",
        accuracy: "99% compliance rate",
        cost: "65% cost reduction"
      },
      features: [
        "Contract analysis",
        "Risk identification",
        "Compliance checking",
        "Amendment suggestions"
      ],
      icon: Scale,
      route: "/use-cases/contract-analysis"
    },
    {
      title: "Intelligent Talent Matching",
      industry: "HR",
      description: "Smart agents match candidates to positions, conduct initial screenings, and optimize hiring processes.",
      metrics: {
        efficiency: "70% faster hiring",
        accuracy: "90% match quality",
        cost: "50% recruiting savings"
      },
      features: [
        "Candidate screening",
        "Skill matching",
        "Interview scheduling",
        "Performance prediction"
      ],
      icon: Users,
      route: "/use-cases/talent-matching"
    },
    {
      title: "Personalized Learning Paths",
      industry: "Education",
      description: "AI agents create customized learning experiences, track progress, and adapt content based on student needs.",
      metrics: {
        efficiency: "40% faster learning",
        accuracy: "95% completion rate",
        cost: "35% operational savings"
      },
      features: [
        "Learning personalization",
        "Progress tracking",
        "Content adaptation",
        "Performance analytics"
      ],
      icon: GraduationCap,
      route: "/use-cases/personalized-learning"
    }
  ];

  const filteredUseCases = activeTab === "All" 
    ? useCases 
    : useCases.filter(useCase => useCase.industry === activeTab);

  const handleScheduleConsultation = () => {
    navigate("/schedule-demo");
  };

  const handleViewAllCaseStudies = () => {
    // For now, this could scroll to top of page or navigate to a comprehensive case studies page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    navigate("/get-started");
  };

  const handleCaseStudyNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Real-World <span className="text-gradient">Use Cases</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover how businesses across industries are leveraging agentic AI 
              to achieve measurable results and transform their operations.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Filters */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Filter by Industry</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <button
                key={industry.name}
                onClick={() => setActiveTab(industry.name)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === industry.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <industry.icon className="w-4 h-4" />
                <span>{industry.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUseCases.map((useCase, index) => (
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
                  
                  <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{useCase.description}</p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm">Efficiency</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{useCase.metrics.efficiency}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm">Accuracy</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{useCase.metrics.accuracy}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-sm">Cost Impact</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{useCase.metrics.cost}</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-medium">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {useCase.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      className="btn-primary flex-1 text-sm"
                      onClick={() => handleCaseStudyNavigation(useCase.route)}
                    >
                      See Case Study
                    </Button>
                    <Button 
                      className="btn-ghost flex-1 text-sm"
                      onClick={handleGetStarted}
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven <span className="text-gradient">Results</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aggregate results across all our agentic AI implementations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">AI Agents Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">65%</div>
              <div className="text-muted-foreground">Average Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">80%</div>
              <div className="text-muted-foreground">Process Automation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.2%</div>
              <div className="text-muted-foreground">Average Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="card-gradient rounded-lg p-12 text-center glow-primary">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Industry?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the growing number of businesses using agentic AI to achieve unprecedented results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-primary text-lg px-8 py-3"
                onClick={handleScheduleConsultation}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                className="btn-ghost text-lg px-8 py-3"
                onClick={handleViewAllCaseStudies}
              >
                View All Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;