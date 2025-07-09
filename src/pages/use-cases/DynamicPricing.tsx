import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  ArrowRight, 
  Check, 
  TrendingUp, 
  BarChart3, 
  Zap,
  Target,
  DollarSign,
  Package,
  Users
} from "lucide-react";

const DynamicPricing = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Revenue Optimization",
      description: "Maximize profits with intelligent pricing strategies"
    },
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "Real-time competitor and demand analysis"
    },
    {
      icon: Zap,
      title: "Instant Adjustments",
      description: "Prices update automatically based on conditions"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Personalized pricing for different customer segments"
    }
  ];

  const features = [
    "Real-time price optimization",
    "Demand forecasting algorithms",
    "Competitor price monitoring",
    "Inventory-based pricing",
    "Customer segmentation",
    "Seasonal trend analysis",
    "A/B testing framework",
    "ROI tracking & analytics"
  ];

  const metrics = [
    { label: "Revenue Increase", value: "30%" },
    { label: "Forecast Accuracy", value: "85%" },
    { label: "Inventory Reduction", value: "25%" },
    { label: "Margin Improvement", value: "18%" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <ShoppingCart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Dynamic <span className="text-gradient">Pricing & Inventory</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI agents continuously optimize pricing and inventory levels based on demand, 
              competition, and market conditions to maximize revenue and minimize waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Optimize Your Revenue
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                See Live Demo
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
            <h2 className="text-3xl font-bold mb-4">Intelligent Retail Optimization</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your pricing strategy with AI that learns, adapts, and optimizes in real-time.
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
              <h2 className="text-3xl font-bold mb-6">Complete Revenue Optimization</h2>
              <p className="text-muted-foreground mb-8">
                Our AI system analyzes hundreds of variables to determine optimal pricing 
                and inventory levels, ensuring maximum profitability while meeting customer demand.
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
              <h3 className="text-xl font-semibold mb-6">AI-Powered Insights</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Smart Pricing</h4>
                    <p className="text-sm text-muted-foreground">Dynamic prices based on demand and competition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Package className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Inventory Intelligence</h4>
                    <p className="text-sm text-muted-foreground">Optimal stock levels to prevent waste and stockouts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Customer Insights</h4>
                    <p className="text-sm text-muted-foreground">Behavioral analysis for targeted pricing strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Real Results</h2>
              <p className="text-muted-foreground">How a major retailer transformed their business</p>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">€2.1M</div>
                  <div className="text-muted-foreground">Additional Revenue</div>
                  <div className="text-sm text-muted-foreground mt-1">in first quarter</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">45%</div>
                  <div className="text-muted-foreground">Waste Reduction</div>
                  <div className="text-sm text-muted-foreground mt-1">through better forecasting</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">92%</div>
                  <div className="text-muted-foreground">Price Optimization</div>
                  <div className="text-sm text-muted-foreground mt-1">accuracy rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Maximize Your Revenue?</h2>
            <p className="text-muted-foreground mb-8">
              Join the retail revolution with AI-powered pricing and inventory optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Start Optimization
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                Request ROI Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicPricing;