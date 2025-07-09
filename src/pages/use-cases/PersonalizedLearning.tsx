import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  ArrowRight, 
  Check, 
  Clock, 
  TrendingUp, 
  Target,
  Book,
  BarChart3,
  Users,
  Trophy
} from "lucide-react";

const PersonalizedLearning = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Faster Learning",
      description: "40% reduction in learning time"
    },
    {
      icon: Target,
      title: "Better Outcomes",
      description: "95% course completion rate"
    },
    {
      icon: TrendingUp,
      title: "Cost Effective",
      description: "35% operational savings"
    },
    {
      icon: Users,
      title: "Scalable Solution",
      description: "Personalized learning for thousands"
    }
  ];

  const features = [
    "Adaptive learning algorithms",
    "Real-time progress tracking",
    "Personalized content delivery",
    "Performance analytics",
    "Skill gap identification",
    "Learning path optimization",
    "Automated assessments",
    "Engagement monitoring"
  ];

  const metrics = [
    { label: "Faster Learning", value: "40%" },
    { label: "Completion Rate", value: "95%" },
    { label: "Operational Savings", value: "35%" },
    { label: "Student Satisfaction", value: "92%" }
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
              Personalized <span className="text-gradient">Learning Paths</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI agents create customized learning experiences, track progress, and adapt 
              content based on individual student needs for optimal educational outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Transform Education
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                See Learning Demo
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
            <h2 className="text-3xl font-bold mb-4">Revolutionize Learning</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create truly personalized education experiences that adapt to each learner's unique needs and pace.
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
              <h2 className="text-3xl font-bold mb-6">Intelligent Education Platform</h2>
              <p className="text-muted-foreground mb-8">
                Our AI continuously analyzes learning patterns, adapts content difficulty, 
                and provides personalized recommendations to maximize educational success.
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
              <h3 className="text-xl font-semibold mb-6">Adaptive Learning Engine</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Book className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Content Personalization</h4>
                    <p className="text-sm text-muted-foreground">AI tailors content to individual learning styles and pace</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <BarChart3 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Progress Analytics</h4>
                    <p className="text-sm text-muted-foreground">Real-time tracking and predictive performance insights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Trophy className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Achievement Recognition</h4>
                    <p className="text-sm text-muted-foreground">Gamified learning with personalized rewards and milestones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Applications */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Educational Applications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transforming education across different sectors and age groups
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "K-12 Education",
                description: "Personalized curricula that adapt to each student's learning pace",
                outcome: "25% improvement in test scores"
              },
              {
                title: "Higher Education",
                description: "University-level courses with adaptive difficulty and support",
                outcome: "30% higher graduation rates"
              },
              {
                title: "Corporate Training",
                description: "Professional development programs tailored to employee needs",
                outcome: "50% faster skill acquisition"
              },
              {
                title: "Online Learning",
                description: "MOOCs and digital platforms with personalized experiences",
                outcome: "90% completion improvement"
              },
              {
                title: "Special Needs",
                description: "Accessible learning paths for students with diverse needs",
                outcome: "Enhanced inclusion outcomes"
              },
              {
                title: "Language Learning",
                description: "Immersive language acquisition with cultural context",
                outcome: "60% faster fluency"
              }
            ].map((application, index) => (
              <Card key={index} className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{application.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{application.description}</p>
                  <Badge variant="outline" className="text-primary">
                    {application.outcome}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Transforming Education</h2>
              <p className="text-muted-foreground">Real results from our personalized learning platform</p>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-muted-foreground">Students Served</div>
                  <div className="text-sm text-muted-foreground mt-1">across 50+ institutions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Completion Rate</div>
                  <div className="text-sm text-muted-foreground mt-1">vs 65% traditional average</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">40%</div>
                  <div className="text-muted-foreground">Time Savings</div>
                  <div className="text-sm text-muted-foreground mt-1">to achieve learning goals</div>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Personalize Learning?</h2>
            <p className="text-muted-foreground mb-8">
              Create adaptive learning experiences that help every student reach their full potential.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Transform Your Education
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Contact Education Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalizedLearning;