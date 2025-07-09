import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  ArrowRight, 
  Check, 
  Clock, 
  TrendingUp, 
  Shield,
  Wrench,
  AlertTriangle,
  BarChart3,
  Zap
} from "lucide-react";

const PredictiveMaintenance = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Maximum Uptime",
      description: "Prevent failures before they happen"
    },
    {
      icon: TrendingUp,
      title: "Cost Reduction",
      description: "Lower maintenance costs through optimization"
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Minimize safety risks and downtime"
    },
    {
      icon: Zap,
      title: "Efficiency Boost",
      description: "Optimize performance across all equipment"
    }
  ];

  const features = [
    "Real-time equipment monitoring",
    "Failure prediction algorithms",
    "Automated maintenance scheduling",
    "Resource optimization",
    "Performance analytics",
    "Safety compliance tracking",
    "Cost analysis & reporting",
    "Integration with existing systems"
  ];

  const metrics = [
    { label: "Uptime Improvement", value: "90%" },
    { label: "Failure Prediction", value: "98%" },
    { label: "Maintenance Savings", value: "45%" },
    { label: "Emergency Repairs", value: "75% reduction" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Settings className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Predictive <span className="text-gradient">Maintenance</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Autonomous agents monitor equipment health, predict failures, and schedule 
              maintenance before breakdowns occur, ensuring maximum operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Prevent Downtime Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                See Technology Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section-padding">
        <div className="container-width">
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

      {/* Benefits Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transform Your Maintenance Strategy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Move from reactive to predictive maintenance with AI that knows your equipment better than ever.
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
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Intelligent Equipment Management</h2>
              <p className="text-muted-foreground mb-8">
                Our AI continuously analyzes equipment data to predict failures, optimize performance, 
                and schedule maintenance at the perfect time to minimize disruption and cost.
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
              <h3 className="text-xl font-semibold mb-6">How Prediction Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <BarChart3 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Data Collection</h4>
                    <p className="text-sm text-muted-foreground">Continuous monitoring of equipment sensors and performance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Pattern Recognition</h4>
                    <p className="text-sm text-muted-foreground">AI identifies patterns that precede equipment failures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Wrench className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Proactive Action</h4>
                    <p className="text-sm text-muted-foreground">Automated scheduling and resource allocation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industry Applications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Predictive maintenance transforms operations across industries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing",
                description: "Production line optimization and equipment monitoring",
                savings: "40% reduction in downtime"
              },
              {
                title: "Energy & Utilities",
                description: "Power grid and infrastructure maintenance",
                savings: "60% lower maintenance costs"
              },
              {
                title: "Transportation",
                description: "Fleet management and vehicle maintenance",
                savings: "35% fewer breakdowns"
              }
            ].map((industry, index) => (
              <Card key={index} className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{industry.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{industry.description}</p>
                  <Badge variant="outline" className="text-primary">
                    {industry.savings}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Eliminate Unexpected Downtime?</h2>
            <p className="text-muted-foreground mb-8">
              Transform your maintenance operations with AI that predicts, prevents, and optimizes.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Start Predictive Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Calculate Your Savings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PredictiveMaintenance;