import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  ArrowRight, 
  Check, 
  TrendingUp, 
  Shield, 
  Clock,
  BarChart3,
  Users
} from "lucide-react";

const AutomatedLoanProcessing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Building2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Automated <span className="text-gradient">Loan Processing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI agents automatically process loan applications, verify documents, assess risk, 
              and make approval decisions in real-time with 99.2% accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Request Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                Download Case Study
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-gradient border-border text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">75%</div>
                <div className="text-muted-foreground">Faster Processing</div>
              </CardContent>
            </Card>
            <Card className="card-gradient border-border text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">99.2%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </CardContent>
            </Card>
            <Card className="card-gradient border-border text-center">
              <CardContent className="p-6">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <div className="text-muted-foreground">Cost Reduction</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Document verification",
              "Risk assessment", 
              "Fraud detection",
              "Regulatory compliance"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="w-6 h-6 text-primary" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="card-gradient rounded-lg p-12 text-center glow-primary">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Loan Process?</h2>
            <Button className="btn-primary text-lg px-8 py-3">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutomatedLoanProcessing;