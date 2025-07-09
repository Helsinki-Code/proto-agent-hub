import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  ArrowRight, 
  Check, 
  Clock, 
  TrendingUp, 
  Shield,
  FileText,
  Search,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const ContractAnalysis = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Faster Review",
      description: "80% reduction in contract review time"
    },
    {
      icon: Shield,
      title: "Risk Detection",
      description: "Identify potential legal risks automatically"
    },
    {
      icon: TrendingUp,
      title: "Compliance Assurance",
      description: "99% compliance rate with regulations"
    },
    {
      icon: CheckCircle,
      title: "Quality Control",
      description: "Consistent review standards across all contracts"
    }
  ];

  const features = [
    "Automated contract analysis",
    "Risk identification & scoring",
    "Compliance checking",
    "Amendment suggestions",
    "Key term extraction",
    "Obligation tracking",
    "Comparative analysis",
    "Audit trail generation"
  ];

  const metrics = [
    { label: "Faster Review", value: "80%" },
    { label: "Compliance Rate", value: "99%" },
    { label: "Cost Reduction", value: "65%" },
    { label: "Accuracy Rate", value: "99.2%" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Scale className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Contract <span className="text-gradient">Analysis & Review</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI agents automatically review contracts, identify risks, ensure compliance, 
              and suggest modifications with legal precision and unprecedented speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Streamline Legal Review
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                See Analysis Demo
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
            <h2 className="text-3xl font-bold mb-4">Revolutionary Legal Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your legal operations with AI that understands contracts like an experienced attorney.
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
              <h2 className="text-3xl font-bold mb-6">Comprehensive Legal Analysis</h2>
              <p className="text-muted-foreground mb-8">
                Our AI system analyzes contracts with the precision of senior legal counsel, 
                identifying risks, ensuring compliance, and suggesting improvements automatically.
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
              <h3 className="text-xl font-semibold mb-6">AI Analysis Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Document Ingestion</h4>
                    <p className="text-sm text-muted-foreground">AI processes contracts in any format or language</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Search className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Deep Analysis</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive review of terms, obligations, and risks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Risk Assessment</h4>
                    <p className="text-sm text-muted-foreground">Intelligent scoring and recommendation system</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Legal Domain Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized AI models for different types of legal documents
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Commercial Contracts",
                description: "Purchase agreements, service contracts, and partnerships",
                accuracy: "99.1% accuracy"
              },
              {
                title: "Employment Law",
                description: "Employment contracts, NDAs, and compensation agreements",
                accuracy: "98.7% accuracy"
              },
              {
                title: "Real Estate",
                description: "Property agreements, leases, and development contracts",
                accuracy: "99.3% accuracy"
              },
              {
                title: "Intellectual Property",
                description: "Licensing agreements and IP transfer documents",
                accuracy: "98.9% accuracy"
              },
              {
                title: "Regulatory Compliance",
                description: "GDPR, HIPAA, and industry-specific regulations",
                accuracy: "99.5% accuracy"
              },
              {
                title: "M&A Documentation",
                description: "Due diligence and acquisition agreements",
                accuracy: "99.0% accuracy"
              }
            ].map((useCase, index) => (
              <Card key={index} className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{useCase.description}</p>
                  <Badge variant="outline" className="text-primary">
                    {useCase.accuracy}
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
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Legal Operations?</h2>
            <p className="text-muted-foreground mb-8">
              Join leading law firms and corporations who've revolutionized their contract review process.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Start Legal AI Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Contact Legal Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContractAnalysis;