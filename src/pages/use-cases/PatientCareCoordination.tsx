import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ArrowRight, 
  Check, 
  Clock, 
  TrendingUp, 
  Shield,
  Calendar,
  Stethoscope,
  UserCheck,
  AlertTriangle
} from "lucide-react";

const PatientCareCoordination = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Real-time Coordination",
      description: "Instant communication between all care providers"
    },
    {
      icon: TrendingUp,
      title: "Improved Outcomes",
      description: "Better patient health through coordinated care"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Full privacy and security compliance"
    },
    {
      icon: UserCheck,
      title: "Patient-Centered",
      description: "Puts patient needs at the center of care"
    }
  ];

  const features = [
    "Automated appointment scheduling",
    "Real-time treatment monitoring",
    "Cross-department communication",
    "Emergency response coordination",
    "Care plan optimization",
    "Patient progress tracking",
    "Resource allocation",
    "Compliance monitoring"
  ];

  const metrics = [
    { label: "Faster Coordination", value: "50%" },
    { label: "Patient Satisfaction", value: "95%" },
    { label: "Operational Savings", value: "40%" },
    { label: "Response Time", value: "75% faster" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Patient <span className="text-gradient">Care Coordination</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Intelligent agents coordinate patient care across departments, schedule appointments, 
              and monitor treatment progress for optimal health outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Transform Your Healthcare
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                Schedule Demo
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
            <h2 className="text-3xl font-bold mb-4">Revolutionary Healthcare Coordination</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI agents seamlessly connect all aspects of patient care for better outcomes.
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
              <h2 className="text-3xl font-bold mb-6">Comprehensive Care Management</h2>
              <p className="text-muted-foreground mb-8">
                From appointment scheduling to treatment monitoring, our AI agents ensure 
                every aspect of patient care is coordinated and optimized.
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
              <h3 className="text-xl font-semibold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Smart Scheduling</h4>
                    <p className="text-sm text-muted-foreground">AI optimizes appointments across all departments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Stethoscope className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Treatment Monitoring</h4>
                    <p className="text-sm text-muted-foreground">Real-time tracking of patient progress</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Emergency Response</h4>
                    <p className="text-sm text-muted-foreground">Immediate coordination during critical situations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Patient Care?</h2>
            <p className="text-muted-foreground mb-8">
              Join leading healthcare providers who've transformed their operations with our AI coordination system.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Start Implementation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Contact Healthcare Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientCareCoordination;