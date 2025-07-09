import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ArrowRight, 
  Check, 
  Clock, 
  TrendingUp, 
  Target,
  UserCheck,
  Search,
  Brain,
  Calendar
} from "lucide-react";

const TalentMatching = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Faster Hiring",
      description: "70% reduction in time-to-hire"
    },
    {
      icon: Target,
      title: "Better Matches",
      description: "90% improvement in candidate-role fit"
    },
    {
      icon: TrendingUp,
      title: "Cost Savings",
      description: "50% reduction in recruiting costs"
    },
    {
      icon: UserCheck,
      title: "Quality Assurance",
      description: "Consistent screening standards"
    }
  ];

  const features = [
    "AI-powered candidate screening",
    "Skill-role matching algorithms",
    "Automated interview scheduling",
    "Performance prediction models",
    "Bias reduction technology",
    "Cultural fit assessment",
    "Reference checking automation",
    "Onboarding optimization"
  ];

  const metrics = [
    { label: "Faster Hiring", value: "70%" },
    { label: "Match Quality", value: "90%" },
    { label: "Recruiting Savings", value: "50%" },
    { label: "Retention Rate", value: "85%" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Intelligent <span className="text-gradient">Talent Matching</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Smart agents match candidates to positions, conduct initial screenings, and optimize 
              hiring processes for perfect talent acquisition every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Revolutionize Hiring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                See Matching Demo
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
            <h2 className="text-3xl font-bold mb-4">Transform Your Hiring Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Move beyond traditional recruiting with AI that understands both skills and culture fit.
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
              <h2 className="text-3xl font-bold mb-6">Complete Talent Acquisition</h2>
              <p className="text-muted-foreground mb-8">
                Our AI system handles every aspect of recruiting, from initial screening to 
                final selection, ensuring you find the perfect candidate every time.
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
              <h3 className="text-xl font-semibold mb-6">AI Matching Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Search className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Intelligent Sourcing</h4>
                    <p className="text-sm text-muted-foreground">AI scans multiple platforms to find qualified candidates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Brain className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Smart Matching</h4>
                    <p className="text-sm text-muted-foreground">Advanced algorithms assess skills, experience, and fit</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Automated Scheduling</h4>
                    <p className="text-sm text-muted-foreground">Seamless interview coordination and follow-up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Hiring Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how companies transformed their talent acquisition
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                company: "Tech Startup",
                challenge: "Scaling engineering team rapidly",
                result: "Hired 50 engineers in 3 months",
                improvement: "300% faster hiring"
              },
              {
                company: "Financial Services",
                challenge: "Finding specialized compliance roles",
                result: "95% candidate-role match rate",
                improvement: "60% cost reduction"
              },
              {
                company: "Healthcare Provider",
                challenge: "Reducing healthcare worker turnover",
                result: "Improved retention by 40%",
                improvement: "Better cultural fit"
              }
            ].map((story, index) => (
              <Card key={index} className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{story.company}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{story.challenge}</p>
                  <p className="text-sm font-medium mb-3">{story.result}</p>
                  <Badge variant="outline" className="text-primary">
                    {story.improvement}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Breakdown */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced AI Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-gradient border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Bias Reduction</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI actively works to eliminate unconscious bias in hiring decisions, 
                  focusing purely on qualifications and fit.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Blind resume screening</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Diverse candidate sourcing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Objective skill assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="card-gradient border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Predict candidate success and long-term retention using 
                  advanced machine learning models.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Performance prediction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Retention likelihood</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Growth potential assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Perfect Talent?</h2>
            <p className="text-muted-foreground mb-8">
              Transform your hiring process with AI that finds the right people for the right roles.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Start Hiring Smarter
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Book HR Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentMatching;